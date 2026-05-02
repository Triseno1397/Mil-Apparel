const fs = require('fs');

const products = JSON.parse(fs.readFileSync('./config/products.json', 'utf8'));

// Map product IDs to branches based on naming convention
const branchMapping = {
    'army': ['army-infantry-tee', 'army-sf-tee', 'army-mp-hoodie', 'army-aviation-cap', 'army-mug', 'army-wallet'],
    'navy': ['navy-aviation-hoodie', 'navy-tee', 'navy-intelligence-tee', 'navy-cap', 'navy-mug'],
    'air-force': ['air-force-medical-tee', 'air-force-engineering-tee', 'air-force-tee', 'air-force-cap'],
    'marines': ['marines-eod-tee', 'marines-infantry-hoodie', 'marines-medical-hoodie', 'marines-cap', 'marines-tee', 'marines-wallet'],
    'coast-guard': ['coast-guard-hoodie']
};

// Flatten to lookup
const productToBranch = {};
for (const [branch, productIds] of Object.entries(branchMapping)) {
    productIds.forEach(id => {
        productToBranch[id] = branch;
    });
}

// Special products (patches, gifts) can be cross-branch or have no specific branch
const specialProducts = ['eod-patch', 'sf-patch'];

products.forEach(product => {
    // Assign branch field
    if (productToBranch[product.id]) {
        product.branch = productToBranch[product.id];
    } else if (specialProducts.includes(product.id)) {
        product.branch = 'specialty'; // Cross-branch items
    } else {
        console.warn(`Warning: No branch assigned for product: ${product.id}`);
        product.branch = 'other';
    }

    // Keep only the matching branch collection + specialty collections
    // Remove redundant branch from collections array (we now use the branch field)
    const branchCollections = ['army', 'navy', 'air-force', 'marines', 'coast-guard'];
    product.collections = product.collections.filter(c => !branchCollections.includes(c));
});

fs.writeFileSync('./config/products.json', JSON.stringify(products, null, 4));

console.log(`✅ Updated ${products.length} products with branch field`);
console.log(`✅ Removed branch duplicates from collections arrays`);
