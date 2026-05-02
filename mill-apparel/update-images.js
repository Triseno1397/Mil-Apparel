const fs = require('fs');

const products = JSON.parse(fs.readFileSync('./config/products.json', 'utf8'));

products.forEach(product => {
    product.images = [`/images/products/${product.id}.png`];
});

fs.writeFileSync('./config/products.json', JSON.stringify(products, null, 4));

console.log(`Updated ${products.length} products to use AI-generated images`);
