# Mill Apparel - Site Pages & Features

## Site Structure

```
Home
├── Shop
│   ├── All Products
│   ├── By Branch (Army, Navy, Air Force, Marines, Coast Guard)
│   └── By Role/Specialty (EOD, Infantry, Aviation, Medical, MP, SF, Engineering, Intel)
├── Collections
│   ├── Gift Collections (Retirement, Promotion, PCS)
│   ├── New Arrivals
│   └── Best Sellers
├── Customize
│   └── Customization Wizard
├── Gifts
│   └── Gift Guide & Bundles
└── Policies
    ├── About Us
    ├── Shipping & Returns
    ├── Privacy Policy
    └── FAQ
```

## Page-by-Page Requirements

### 1. Home Page

**Goal**: High conversion, clear value prop, easy navigation to key sections

**Hero Section**:
- Large lifestyle image showing products in use
- Bold headline: "Premium Apparel for Those Who Serve"
- Subheading: Brief value prop (2-3 words)
- Primary CTA: "Shop Now" → All Products
- Secondary CTA: "Customize Your Gear" → Customization

**Shop by Branch**:
- 5 cards with branch emblems/imagery
- Clean hover effects
- Direct links to filtered collections

**Shop by Role/Specialty**:
- 8 cards with role-specific imagery
- Grid layout (4 columns desktop, 2 mobile)
- Clear labels

**Featured Products**:
- Best Sellers carousel or grid
- 4-6 products
- Product cards with quick view

**Gift Collections**:
- 3 prominent cards for gift occasions
- Emotional copy ("Honor Their Service", "Celebrate the Milestone")
- Visual differentiation

**Trust Signals**:
- Quality guarantee
- Fast shipping
- Secure checkout
- Customer reviews snippet

**Footer**:
- Links to all main pages
- Social media
- Newsletter signup
- Contact info

### 2. Shop Page (All Products)

**Goal**: Easy filtering, quick product discovery, smooth add-to-cart

**Features**:
- **Filters** (sidebar on desktop, drawer on mobile):
  - By Branch
  - By Role/Specialty
  - By Product Type
  - By Price Range
  - Customizable Only
  - In Stock Only
  - New / Best Sellers

- **Sorting**:
  - Featured
  - Price: Low to High
  - Price: High to Low
  - Newest
  - Best Selling

- **Product Grid**:
  - 3-4 columns (desktop)
  - 2 columns (tablet)
  - 1-2 columns (mobile)
  - Lazy loading
  - Quick Add to Cart on hover

- **Pagination or Infinite Scroll**:
  - Show 24 products per page
  - Clear load more or pagination

### 3. Product Detail Page (PDP)

**Goal**: Clear product info, easy customization, quick purchase decision

**Layout**:
- Left: Product images (gallery with zoom)
- Right: Product details

**Product Details Section**:
- Product name (H1)
- Price (large, bold)
- Star rating + review count
- Badges (New, Best Seller, Customizable)
- Brief description
- Variant selectors (Size, Color)
- Quantity selector
- Add to Cart button (prominent)
- "Customize This Item" button (if applicable)

**Additional Info** (tabs or accordion):
- Full Description
- Material & Care
- Sizing Guide
- Shipping & Returns
- Reviews

**Upsells**:
- "Complete the Look" - related accessories
- "Customers Also Bought"
- Bundle options

**Trust Elements**:
- Secure checkout badge
- Return policy snippet
- Quality guarantee

### 4. Customization Page/Wizard

**Goal**: Simple, guided customization flow with live preview and clear pricing

**Steps**:

**Step 1: Select Base Product**
- Show customizable products
- Clear indication of base price

**Step 2: Choose Customization Options**
- Unit Text (optional, +$5)
  - Text input
  - Character limit
  - Preview update
- Name (optional, +$3)
  - Text input
  - Character limit
- Number (optional, +$2)
  - Number input
- Dates (optional, +$3)
  - Date picker or text input
- Color Options (if available, +$4)
  - Color swatches

**Step 3: Preview**
- Live rendering of customized product
- All customizations visible
- Editable (step back)

**Step 4: Finalize**
- Total price breakdown (base + all add-ons)
- Add to Cart
- Save for Later option

**Features**:
- Progress indicator (Step 1 of 4)
- Back/Next buttons
- Clear pricing updates
- Validation (required fields, character limits)
- Mobile-friendly

### 5. Collections Pages

**Retirement Gifts**:
- Curated products appropriate for retirement
- Gift bundles
- Gift message option
- Emotional copy

**Promotion Gifts**:
- Products celebrating rank advancement
- Congratulatory messaging
- Quick gift wrap option

**PCS Gifts**:
- Farewell/welcome items
- Unit pride products
- Bundle deals

**Each Collection**:
- Hero image/banner
- Collection description
- Filtered product grid
- Gift-specific features (wrapping, messages)

### 6. Gifts Page (Gift Guide)

**Goal**: Make gift buying effortless

**Features**:
- Gift finder by occasion
- Gift bundles with discounts
- Gift message add-on
- Gift wrapping option
- Pre-curated sets

**Layout**:
- By Occasion (Retirement, Promotion, PCS, Birthday, Holiday)
- By Price Range
- Gift bundles showcase
- "Not sure? Gift card" CTA

### 7. Policies & Info Pages

**About Us** (optional for now, can add later):
- Brand story
- Mission
- Quality commitment

**Shipping & Returns**:
- Shipping times and costs
- Return policy (30-day, conditions)
- Exchange process
- International shipping (if applicable)

**Privacy Policy**:
- Standard privacy policy
- Data collection
- Cookie usage

**FAQ**:
- 12 FAQs covering:
  - Ordering & Customization
  - Shipping & Delivery
  - Returns & Exchanges
  - Product Care
  - Gift Options
  - Account & Payment

## Global Features

### Navigation (Header)
- Logo (left)
- Primary links: Shop, Collections, Customize, Gifts
- Search icon
- Cart icon with count badge
- Mobile: Hamburger menu

### Cart (Sidebar Drawer)
- Product thumbnail + name
- Variant info (size, color, customizations)
- Quantity adjuster
- Remove item
- Subtotal
- "Continue Shopping" and "Checkout" buttons
- Upsell: "You might also like..."

### Search
- Overlay or dedicated page
- Autocomplete suggestions
- Filter by category
- Recent searches

### Footer
- Navigation links
- Social media icons
- Newsletter signup
- Contact email
- Payment icons
- Security badges

## CRO (Conversion Rate Optimization) Features

1. **Sticky Add to Cart**: On PDP scroll
2. **Exit Intent Popup**: Discount offer for cart abandonment
3. **Low Stock Urgency**: "Only 3 left!" messaging
4. **Trust Badges**: Throughout site (secure checkout, money-back guarantee)
5. **Social Proof**: Customer reviews, ratings
6. **Upsells & Cross-sells**: Relevant product recommendations
7. **Bundle Discounts**: "Save 15% when you buy together"
8. **Quick View**: Product preview from grid without leaving page
9. **Wishlist/Favorites**: Save for later
10. **Recently Viewed**: Help users find products they browsed

## Mobile Optimization

- Touch-friendly buttons (min 44x44px)
- Simplified navigation
- Fast load times
- Mobile-optimized images
- Easy cart access
- One-handed usability
- Mobile checkout optimization

## Accessibility Requirements

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus indicators
- Alt text for images
- Color contrast compliance (WCAG AA)
- Screen reader friendly

## Performance Targets

- Time to Interactive: < 3s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms
- Image optimization: WebP format, lazy loading
- Code splitting: Per-route bundles
- Caching strategy

## Notes

- Prioritize mobile experience (60%+ traffic)
- Keep checkout flow simple (minimize steps)
- Make customization intuitive (not intimidating)
- Gift features should be obvious
- Maintain premium aesthetic throughout
- Fast, responsive interactions
