import { shopifyREST, delay } from './shopify-client.js';

// Tag mapping rules based on product names and types
const tagRules = {
  // Branch tags - check product name
  branches: [
    { keywords: ['army', 'ranger'], tag: 'army' },
    { keywords: ['navy', 'anchor', 'sailor'], tag: 'navy' },
    { keywords: ['air force', 'airforce', 'wings'], tag: 'air-force' },
    { keywords: ['marine', 'usmc', 'devil dog', 'semper fi'], tag: 'marines' },
    { keywords: ['coast guard', 'coastguard'], tag: 'coast-guard' },
  ],

  // Product type tags
  types: [
    { keywords: ['t-shirt', 'tshirt', 'tee'], tag: 'tshirt' },
    { keywords: ['hoodie', 'sweatshirt'], tag: 'hoodie' },
    { keywords: ['cap', 'hat', 'beanie'], tag: 'hat' },
    { keywords: ['patch', 'emblem'], tag: 'patch' },
    { keywords: ['long sleeve'], tag: 'tshirt' }, // Long sleeves are apparel
    { keywords: ['backpack', 'bag', 'water bottle', 'bottle', 'bandana', 'coin', 'drinkware', 'mug'], tag: 'accessory' },
  ],

  // Specialty tags
  specialty: [
    { keywords: ['veteran', 'vet'], tag: 'veteran' },
    { keywords: ['patriot', 'american flag', 'usa', 'patriotic'], tag: 'patriot' },
    { keywords: ['gift', 'collection', 'set', 'coin'], tag: 'gift' },
  ],
};

function determineTags(product) {
  const name = product.title.toLowerCase();
  const type = (product.product_type || '').toLowerCase();
  const existingTags = product.tags ? product.tags.split(', ').map(t => t.toLowerCase().trim()) : [];
  const newTags = new Set(existingTags);

  // Check branch keywords
  for (const rule of tagRules.branches) {
    if (rule.keywords.some(kw => name.includes(kw))) {
      newTags.add(rule.tag);
    }
  }

  // Check product type keywords
  for (const rule of tagRules.types) {
    if (rule.keywords.some(kw => name.includes(kw) || type.includes(kw))) {
      newTags.add(rule.tag);
    }
  }

  // Check specialty keywords
  for (const rule of tagRules.specialty) {
    if (rule.keywords.some(kw => name.includes(kw))) {
      newTags.add(rule.tag);
    }
  }

  return Array.from(newTags).join(', ');
}

export async function tagProducts() {
  console.log('\n=== PHASE 1: Tagging Products ===\n');

  // Get all products
  let allProducts = [];
  let nextPageUrl = '/products.json?limit=250';

  while (nextPageUrl) {
    const response = await shopifyREST(nextPageUrl);
    allProducts = allProducts.concat(response.products);

    // Check for pagination
    nextPageUrl = null; // Simplified - handle pagination if needed
  }

  console.log(`Found ${allProducts.length} products to process\n`);

  let updated = 0;
  let unchanged = 0;
  let failed = 0;

  for (const product of allProducts) {
    try {
      const currentTags = product.tags || '';
      const newTags = determineTags(product);

      // Only update if tags have changed
      if (currentTags.toLowerCase() !== newTags.toLowerCase()) {
        await shopifyREST(`/products/${product.id}.json`, 'PUT', {
          product: {
            id: product.id,
            tags: newTags
          }
        });

        console.log(`✅ ${product.title}`);
        console.log(`   Old: ${currentTags || '(none)'}`);
        console.log(`   New: ${newTags}`);
        updated++;
        await delay(300);
      } else {
        console.log(`⏭️  ${product.title} - tags already correct`);
        unchanged++;
      }
    } catch (error) {
      console.error(`❌ Failed to tag "${product.title}": ${error.message}`);
      failed++;
    }
  }

  console.log('\n--- Tagging Summary ---');
  console.log(`Updated: ${updated}`);
  console.log(`Unchanged: ${unchanged}`);
  console.log(`Failed: ${failed}`);

  return { updated, unchanged, failed };
}

// Run if called directly
if (process.argv[1].includes('tag-products')) {
  tagProducts()
    .then(() => console.log('\nDone!'))
    .catch(console.error);
}
