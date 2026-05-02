import { shopifyREST, delay } from './shopify-client.js';

// Personalization is typically handled through:
// 1. Product metafields (for storing config)
// 2. Theme modifications (for displaying fields)
// 3. Line item properties (for capturing customer input)

// Since line item properties are handled at the theme level,
// this script will:
// 1. Add metafields to mark products as personalizable
// 2. Output the Liquid code needed for the theme

const personalizationConfig = {
  fields: [
    {
      name: 'Name',
      key: 'personalization_name',
      label: 'Name or Nickname (optional)',
      maxLength: 20,
      type: 'text'
    },
    {
      name: 'Rank',
      key: 'personalization_rank',
      label: 'Rank (optional)',
      maxLength: 20,
      type: 'text'
    },
    {
      name: 'Unit',
      key: 'personalization_unit',
      label: 'Unit / Branch (optional)',
      maxLength: 30,
      type: 'text'
    }
  ],
  helperText: 'Leave blank to skip personalization. Personalized orders ship in 3–5 business days.'
};

// Products that should have personalization (by type)
const personalizableTypes = ['t-shirt', 'tee', 'hoodie', 'long sleeve', 'sweatshirt'];

export async function addPersonalization() {
  console.log('\n=== PHASE 5: Adding Personalization Fields ===\n');

  // Get all products
  const response = await shopifyREST('/products.json?limit=250');
  const products = response.products || [];

  const personalizable = products.filter(p => {
    const name = p.title.toLowerCase();
    const type = (p.product_type || '').toLowerCase();
    return personalizableTypes.some(pt => name.includes(pt) || type.includes(pt));
  });

  console.log(`Found ${personalizable.length} products eligible for personalization\n`);

  let updated = 0;
  let failed = 0;

  for (const product of personalizable) {
    try {
      // Add metafield to mark product as personalizable
      await shopifyREST(`/products/${product.id}/metafields.json`, 'POST', {
        metafield: {
          namespace: 'mil_apparel',
          key: 'is_personalizable',
          value: 'true',
          type: 'boolean'
        }
      });

      console.log(`✅ Marked as personalizable: ${product.title}`);
      updated++;
      await delay(300);
    } catch (error) {
      // Metafield might already exist
      if (error.message.includes('422') || error.message.includes('already exists')) {
        console.log(`⏭️  Already set: ${product.title}`);
      } else {
        console.error(`❌ Failed: ${product.title} - ${error.message}`);
        failed++;
      }
    }
  }

  console.log('\n--- Personalization Summary ---');
  console.log(`Products marked: ${updated}`);
  console.log(`Failed: ${failed}`);

  // Output theme code
  console.log('\n' + '='.repeat(60));
  console.log('THEME MODIFICATION REQUIRED');
  console.log('='.repeat(60));
  console.log('\nAdd this code to your product form in the Horizon theme:');
  console.log('Location: sections/main-product.liquid or snippets/product-form.liquid\n');

  const liquidCode = `
{% comment %} Mil Apparel Personalization Fields {% endcomment %}
{% if product.metafields.mil_apparel.is_personalizable == true %}
<div class="personalization-fields" style="margin: 1.5rem 0; padding: 1rem; background: #f8f8f8; border-radius: 8px;">
  <h4 style="margin-bottom: 1rem; font-weight: 600;">Personalize It (Optional)</h4>

  <div class="field" style="margin-bottom: 1rem;">
    <label for="personalization-name" style="display: block; margin-bottom: 0.25rem; font-size: 0.875rem;">
      Name or Nickname (optional)
    </label>
    <input
      type="text"
      id="personalization-name"
      name="properties[Name]"
      maxlength="20"
      placeholder="Max 20 characters"
      style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;"
    >
  </div>

  <div class="field" style="margin-bottom: 1rem;">
    <label for="personalization-rank" style="display: block; margin-bottom: 0.25rem; font-size: 0.875rem;">
      Rank (optional)
    </label>
    <input
      type="text"
      id="personalization-rank"
      name="properties[Rank]"
      maxlength="20"
      placeholder="Max 20 characters"
      style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;"
    >
  </div>

  <div class="field" style="margin-bottom: 1rem;">
    <label for="personalization-unit" style="display: block; margin-bottom: 0.25rem; font-size: 0.875rem;">
      Unit / Branch (optional)
    </label>
    <input
      type="text"
      id="personalization-unit"
      name="properties[Unit]"
      maxlength="30"
      placeholder="Max 30 characters"
      style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;"
    >
  </div>

  <p style="font-size: 0.75rem; color: #666; margin: 0;">
    Leave blank to skip personalization. Personalized orders ship in 3–5 business days.
  </p>
</div>
{% endif %}
`;

  console.log(liquidCode);

  console.log('\n' + '='.repeat(60));
  console.log('Place this code BEFORE the Add to Cart button in your product form.');
  console.log('The properties[] inputs will automatically pass to cart line items.');
  console.log('='.repeat(60));

  return { updated, failed, liquidCode };
}

// Export the liquid code
export { personalizationConfig };

// Run if called directly
if (process.argv[1].includes('add-personalization')) {
  addPersonalization()
    .then(() => console.log('\nDone!'))
    .catch(console.error);
}
