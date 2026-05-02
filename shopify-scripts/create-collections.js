import { shopifyREST, delay } from './shopify-client.js';

// Collection definitions with rules for automated collections
const collections = [
  // Branch Collections
  { title: 'Army', handle: 'army', tag: 'army', description: 'Premium apparel and gear for Army soldiers and veterans.' },
  { title: 'Navy', handle: 'navy', tag: 'navy', description: 'Quality gear for Navy sailors and veterans.' },
  { title: 'Air Force', handle: 'air-force', tag: 'air-force', description: 'Premium apparel for Air Force airmen and veterans.' },
  { title: 'Marines', handle: 'marines', tag: 'marines', description: 'Gear worthy of the few and the proud.' },
  { title: 'Coast Guard', handle: 'coast-guard', tag: 'coast-guard', description: 'Quality apparel for Coast Guard members and veterans.' },

  // Product Type Collections
  { title: 'T-Shirts', handle: 't-shirts', tag: 'tshirt', description: 'Premium military-themed t-shirts built for comfort and durability.' },
  { title: 'Hoodies', handle: 'hoodies', tag: 'hoodie', description: 'Heavyweight hoodies for those who refuse to compromise on quality.' },
  { title: 'Hats', handle: 'hats', tag: 'hat', description: 'Military caps and headwear designed with pride.' },
  { title: 'Patches', handle: 'patches', tag: 'patch', description: 'Embroidered patches to show your service and support.' },
  { title: 'Accessories', handle: 'accessories', tag: 'accessory', description: 'Military gear and accessories for everyday carry.' },
  { title: 'Gifts', handle: 'gifts', tag: 'gift', description: 'Perfect gifts for active duty, veterans, and military families.' },

  // Specialty Collections
  { title: 'Veteran', handle: 'veteran', tag: 'veteran', description: 'Gear for those who served. Honor your service.' },
  { title: 'Patriot', handle: 'patriot', tag: 'patriot', description: 'Show your American pride with patriotic apparel.' },
];

export async function createCollections() {
  console.log('\n=== PHASE 1: Creating Collections ===\n');
  const created = [];
  const existing = [];
  const failed = [];

  // First, get existing collections to avoid duplicates
  const existingCollections = await shopifyREST('/smart_collections.json');
  const customCollections = await shopifyREST('/custom_collections.json');
  const allExisting = [
    ...existingCollections.smart_collections.map(c => c.handle),
    ...customCollections.custom_collections.map(c => c.handle)
  ];

  for (const collection of collections) {
    try {
      if (allExisting.includes(collection.handle)) {
        console.log(`⏭️  Collection "${collection.title}" already exists, skipping...`);
        existing.push(collection.title);
        continue;
      }

      // Create smart collection with automated rules
      const smartCollection = {
        smart_collection: {
          title: collection.title,
          handle: collection.handle,
          body_html: `<p>${collection.description}</p>`,
          rules: [
            {
              column: 'tag',
              relation: 'equals',
              condition: collection.tag
            }
          ],
          disjunctive: false, // All conditions must match
          published: true,
          sort_order: 'best-selling'
        }
      };

      const result = await shopifyREST('/smart_collections.json', 'POST', smartCollection);
      console.log(`✅ Created collection: ${collection.title}`);
      created.push(collection.title);

      // Rate limiting - avoid hitting API limits
      await delay(500);
    } catch (error) {
      console.error(`❌ Failed to create "${collection.title}": ${error.message}`);
      failed.push(collection.title);
    }
  }

  console.log('\n--- Collections Summary ---');
  console.log(`Created: ${created.length}`);
  console.log(`Already existed: ${existing.length}`);
  console.log(`Failed: ${failed.length}`);

  return { created, existing, failed };
}

// Run if called directly
if (process.argv[1].includes('create-collections')) {
  createCollections()
    .then(() => console.log('\nDone!'))
    .catch(console.error);
}
