# Mill Apparel - Product Data Structure

## Collections

### Branch Collections (5)
1. **Army**
2. **Navy**
3. **Air Force**
4. **Marines**
5. **Coast Guard**

### Role/Specialty Collections (8)
1. **EOD** (Explosive Ordnance Disposal)
2. **Infantry**
3. **Aviation**
4. **Medical**
5. **Military Police**
6. **Special Forces**
7. **Engineering**
8. **Intelligence**

### Gift Collections (3)
1. **Retirement Gifts** - Commemorative items for those completing their service
2. **Promotion Gifts** - Celebrate rank advancement
3. **PCS Gifts** - Permanent Change of Station farewell/welcome items

## Product Categories

### Apparel
- T-Shirts
- Hoodies

### Accessories
- Caps
- Patches
- Mugs
- Wallets

## Product Attributes

### Required Fields
- `id`: Unique identifier
- `name`: Product name
- `category`: apparel | accessories
- `type`: tshirt | hoodie | cap | patch | mug | wallet
- `price`: Base price in USD
- `description`: Product description
- `images`: Array of image URLs
- `inStock`: boolean
- `collections`: Array of collection IDs

### Optional Fields
- `isNew`: boolean (show "New" badge)
- `isBestSeller`: boolean (show "Best Seller" badge)
- `isCustomizable`: boolean (allow customization)
- `customizationOptions`: Object (if customizable)
- `sizes`: Array of available sizes (for apparel)
- `colors`: Array of available colors
- `material`: Product material description
- `rating`: Average customer rating (1-5)
- `reviewCount`: Number of reviews

## Customization Options

### Available Customizations
- **Unit Text**: Custom text line (e.g., "2nd Battalion", "USS Enterprise")
- **Name**: Personal name
- **Number**: Service number or custom number
- **Dates**: Service dates or significant dates
- **Colors**: Color variations (where applicable)

### Customization Pricing
- Unit Text: +$5
- Name: +$3
- Number: +$2
- Dates: +$3
- Color Upgrade: +$4

### Customization Rules
- Max characters per field
- Allowed character sets
- Preview generation
- Price calculation based on selected options

## Sample Product Count

**Total**: 24 products

**By Category**:
- T-Shirts: 8 products
- Hoodies: 6 products
- Caps: 4 products
- Patches: 2 products
- Mugs: 2 products
- Wallets: 2 products

**Distribution**:
- Preset designs: 16 products
- Customizable: 8 products
- Best Sellers: 5 products
- New arrivals: 4 products

## Bundle/Upsell Sets

### Gift Bundles
1. **Welcome Aboard Bundle**: T-shirt + Cap + Mug (10% off)
2. **Veteran's Pride Pack**: Hoodie + Patch + Wallet (15% off)
3. **Unit Pride Set**: T-shirt + Patch + Mug (12% off)

### Upsell Recommendations
- "Complete the look" - matching accessories
- "Customers also bought" - cross-category suggestions
- "Customize this item" - upgrade to customization
- "Add a gift message" - for gift purchases

## Inventory States

- **In Stock**: Available for immediate purchase
- **Low Stock**: < 10 items remaining (show urgency)
- **Out of Stock**: Not currently available (notify when available)
- **Pre-Order**: Available for advance purchase

## SEO & Metadata

### Product Name Format
`[Role/Branch] [Product Type]` (e.g., "Army Infantry T-Shirt", "Navy Aviation Hoodie")

### Description Best Practices
- Lead with key features
- Include material and fit information
- Mention customization availability
- Use military terminology correctly
- Include care instructions

### Tags
- Branch name
- Role/specialty name
- Product type
- Features (customizable, new, best seller)
- Material
- Fit type

## Variant Structure

For products with multiple options (size, color):

```json
{
  "variants": [
    {
      "id": "variant-1",
      "size": "M",
      "color": "Black",
      "sku": "ARMY-INF-TEE-BLK-M",
      "price": 29.99,
      "inStock": true,
      "quantity": 45
    }
  ]
}
```

## Image Requirements

### Product Images
- Main image: Front view on model or flat lay
- Image 2: Back view (if applicable)
- Image 3: Detail shot (stitching, patch, custom area)
- Image 4: Lifestyle shot (in use)
- Image 5: Size/fit reference

### Image Specs
- Format: JPG or WebP
- Dimensions: 1000x1000px minimum
- Aspect ratio: 1:1 (square)
- Background: White or subtle gradient
- File size: < 200KB (optimized)

## Notes

- Keep product data in centralized config file for easy updates
- Use consistent naming conventions
- Maintain data validation for required fields
- Support future expansion (new branches, roles, products)
- Enable easy filtering and sorting
