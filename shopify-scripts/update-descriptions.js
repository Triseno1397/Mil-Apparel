import { shopifyREST, delay } from './shopify-client.js';

// Product description templates based on product type
const generateDescription = (product) => {
  const name = product.title.toLowerCase();
  const type = (product.product_type || '').toLowerCase();

  // Determine branch for personalization
  let branch = '';
  if (name.includes('army') || name.includes('ranger')) branch = 'Army';
  else if (name.includes('navy') || name.includes('anchor')) branch = 'Navy';
  else if (name.includes('air force') || name.includes('wings')) branch = 'Air Force';
  else if (name.includes('marine') || name.includes('usmc') || name.includes('devil dog')) branch = 'Marines';
  else if (name.includes('coast guard')) branch = 'Coast Guard';
  else if (name.includes('veteran') || name.includes('patriot') || name.includes('american')) branch = 'American';

  // Generate hook based on product
  const hooks = {
    'army': 'Built for those who answer the call. Army pride, every day.',
    'navy': 'For the sailors who keep the seas free. Honor your service.',
    'air force': 'Rise above. Gear for those who dominate the skies.',
    'marines': 'Semper Fi. Gear forged for the few and the proud.',
    'coast guard': 'Always ready. Gear for those who guard our shores.',
    'veteran': 'You served. You earned this. Wear it proud.',
    'american': 'American made. American pride. No compromise.',
    'patriot': 'Stand for something. Red, white, and bold.',
  };

  const hook = hooks[branch.toLowerCase()] || 'Premium gear for those who serve and those who stand with them.';

  // T-Shirt template
  if (name.includes('t-shirt') || name.includes('tee') || type.includes('t-shirt')) {
    return `
<p><strong>${hook}</strong></p>

<ul>
  <li>Relaxed military fit, pre-shrunk for lasting shape</li>
  <li>100% heavyweight ring-spun cotton, built to outlast deployment</li>
  <li>Bold ${branch || 'military'} graphics screen-printed to resist fading</li>
</ul>

<p><strong>Perfect for:</strong> Active duty, veterans, military families, and the perfect gift for anyone who's served.</p>

<p>🚚 Free shipping over $50 | 30-day returns | Veteran-owned & operated</p>
    `.trim();
  }

  // Hoodie template
  if (name.includes('hoodie') || name.includes('sweatshirt') || type.includes('hoodie')) {
    return `
<p><strong>${hook}</strong></p>

<ul>
  <li>Heavyweight cotton-poly blend for warmth without the bulk</li>
  <li>Double-lined hood with reinforced drawcord</li>
  <li>Front pouch pocket with reinforced seams</li>
  <li>${branch || 'Military'} design that won't crack or fade</li>
</ul>

<p><strong>Perfect for:</strong> Active duty, veterans, military families, and the perfect gift for anyone who's served.</p>

<p>🚚 Free shipping over $50 | 30-day returns | Veteran-owned & operated</p>
    `.trim();
  }

  // Long sleeve template
  if (name.includes('long sleeve')) {
    return `
<p><strong>${hook}</strong></p>

<ul>
  <li>Relaxed fit with ribbed cuffs for lasting comfort</li>
  <li>100% heavyweight ring-spun cotton, pre-shrunk</li>
  <li>Double-needle hem for durability</li>
  <li>Bold ${branch || 'military'} graphics built to last</li>
</ul>

<p><strong>Perfect for:</strong> Active duty, veterans, military families, and the perfect gift for anyone who's served.</p>

<p>🚚 Free shipping over $50 | 30-day returns | Veteran-owned & operated</p>
    `.trim();
  }

  // Cap/Hat template
  if (name.includes('cap') || name.includes('hat') || type.includes('cap')) {
    return `
<p><strong>${hook}</strong></p>

<ul>
  <li>Unstructured low-profile design for all-day comfort</li>
  <li>100% cotton twill construction</li>
  <li>Adjustable strap with brass buckle</li>
  <li>Precision embroidered ${branch || 'military'} design</li>
</ul>

<p><strong>Perfect for:</strong> Active duty, veterans, military families, and the perfect gift for anyone who's served.</p>

<p>🚚 Free shipping over $50 | 30-day returns | Veteran-owned & operated</p>
    `.trim();
  }

  // Backpack template
  if (name.includes('backpack') || name.includes('bag')) {
    return `
<p><strong>Mission-ready gear. Built to go the distance.</strong></p>

<ul>
  <li>Heavy-duty 600D polyester with water-resistant coating</li>
  <li>MOLLE webbing for modular attachments</li>
  <li>Multiple compartments for organized carry</li>
  <li>Padded shoulder straps for all-day comfort</li>
</ul>

<p><strong>Perfect for:</strong> Active duty, veterans, tactical enthusiasts, and anyone who demands gear that performs.</p>

<p>🚚 Free shipping over $50 | 30-day returns | Veteran-owned & operated</p>
    `.trim();
  }

  // Patch template
  if (name.includes('patch')) {
    return `
<p><strong>Wear your service on your sleeve. Literally.</strong></p>

<ul>
  <li>High-quality embroidered design with precision stitching</li>
  <li>Hook backing for easy attachment</li>
  <li>Durable construction built for tactical use</li>
  <li>Perfect for jackets, bags, and tactical gear</li>
</ul>

<p><strong>Perfect for:</strong> Active duty, veterans, military families, and the perfect gift for anyone who's served.</p>

<p>🚚 Free shipping over $50 | 30-day returns | Veteran-owned & operated</p>
    `.trim();
  }

  // Challenge coin template
  if (name.includes('coin') || name.includes('challenge')) {
    return `
<p><strong>Tradition. Honor. Brotherhood. The challenge coin lives on.</strong></p>

<ul>
  <li>Die-cast zinc alloy with premium enamel finish</li>
  <li>2-inch diameter with detailed military branch designs</li>
  <li>Premium velvet display case included</li>
  <li>Collectible quality you'll be proud to display</li>
</ul>

<p><strong>Perfect for:</strong> Active duty, veterans, collectors, and the perfect gift for anyone who's served.</p>

<p>🚚 Free shipping over $50 | 30-day returns | Veteran-owned & operated</p>
    `.trim();
  }

  // Water bottle template
  if (name.includes('bottle') || name.includes('water')) {
    return `
<p><strong>Stay hydrated. Stay mission-ready.</strong></p>

<ul>
  <li>32oz capacity, 18/8 stainless steel construction</li>
  <li>Double-wall vacuum insulation - cold 24hrs, hot 12hrs</li>
  <li>Leak-proof cap with carry loop</li>
  <li>Laser-engraved ${branch || 'military'} design that won't fade</li>
</ul>

<p><strong>Perfect for:</strong> Active duty, veterans, outdoor enthusiasts, and anyone who demands quality gear.</p>

<p>🚚 Free shipping over $50 | 30-day returns | Veteran-owned & operated</p>
    `.trim();
  }

  // Bandana template
  if (name.includes('bandana')) {
    return `
<p><strong>American pride. Worn with purpose.</strong></p>

<ul>
  <li>100% soft cotton for all-day comfort</li>
  <li>22" x 22" versatile size</li>
  <li>Colorfast printing that won't fade</li>
  <li>Machine washable for easy care</li>
</ul>

<p><strong>Perfect for:</strong> Active duty, veterans, patriots, and anyone who wears their pride.</p>

<p>🚚 Free shipping over $50 | 30-day returns | Veteran-owned & operated</p>
    `.trim();
  }

  // Generic template for anything else
  return `
<p><strong>${hook}</strong></p>

<ul>
  <li>Premium quality construction built to last</li>
  <li>Thoughtfully designed for those who serve</li>
  <li>Bold ${branch || 'military'} styling that stands out</li>
</ul>

<p><strong>Perfect for:</strong> Active duty, veterans, military families, and the perfect gift for anyone who's served.</p>

<p>🚚 Free shipping over $50 | 30-day returns | Veteran-owned & operated</p>
  `.trim();
};

export async function updateDescriptions() {
  console.log('\n=== PHASE 4: Updating Product Descriptions ===\n');

  // Get all products
  const response = await shopifyREST('/products.json?limit=250');
  const products = response.products || [];

  console.log(`Found ${products.length} products to update\n`);

  let updated = 0;
  let failed = 0;

  for (const product of products) {
    try {
      const newDescription = generateDescription(product);

      await shopifyREST(`/products/${product.id}.json`, 'PUT', {
        product: {
          id: product.id,
          body_html: newDescription
        }
      });

      console.log(`✅ ${product.title}`);
      updated++;
      await delay(300);
    } catch (error) {
      console.error(`❌ Failed: ${product.title} - ${error.message}`);
      failed++;
    }
  }

  console.log('\n--- Description Update Summary ---');
  console.log(`Updated: ${updated}`);
  console.log(`Failed: ${failed}`);

  return { updated, failed };
}

// Run if called directly
if (process.argv[1].includes('update-descriptions')) {
  updateDescriptions()
    .then(() => console.log('\nDone!'))
    .catch(console.error);
}
