# Mill Apparel - Build Checklist

## Overview

Build the Mill Apparel e-commerce website in phases following CRO-first principles, maintaining premium aesthetic, and keeping data centralized for easy updates.

## Priority Order (Per Master Router)
1. CRO + user experience
2. Brand tone (premium, respectful, modern)
3. Visual style (clean/bold)
4. Engineering preferences

---

## ✅ Phase 0: Directives & Planning (COMPLETED)

- [x] Create brand guidelines directive
- [x] Create design system directive
- [x] Create product data structure directive
- [x] Create pages & features directive
- [x] Create technical specifications directive
- [x] Create build checklist
- [x] Review and validate all directives

---

## 🎯 Phase 1: Global Layout + Home (IN PROGRESS)

### 1.1 Project Setup
- [ ] Initialize Next.js project with App Router
- [ ] Install and configure Tailwind CSS
- [ ] Set up TypeScript configuration
- [ ] Create project folder structure (per technical spec)
- [ ] Install dependencies (Heroicons/Lucide)
- [ ] Configure Tailwind with design system tokens
- [ ] Set up global CSS and fonts (Inter + Space Grotesk)

### 1.2 Design System Foundation
- [ ] Create `components/ui/Button.tsx` (primary, secondary, ghost)
- [ ] Create `components/ui/Badge.tsx` (New, Best Seller, Customizable)
- [ ] Create `components/ui/Input.tsx`
- [ ] Create `components/ui/Card.tsx`
- [ ] Create `components/ui/Modal.tsx`
- [ ] Create reusable icon components

### 1.3 Global Layout Components
- [ ] Create `components/layout/Header.tsx`
  - Logo
  - Primary nav links (Shop, Collections, Customize, Gifts)
  - Search icon
  - Cart icon with count badge
  - Mobile-responsive
- [ ] Create `components/layout/MobileMenu.tsx`
  - Hamburger menu
  - Drawer navigation
  - Close functionality
- [ ] Create `components/layout/Footer.tsx`
  - Navigation links
  - Social media icons
  - Newsletter signup
  - Payment/security badges
- [ ] Create root layout (`app/layout.tsx`)
  - Metadata configuration
  - Font loading
  - Cart Context Provider

### 1.4 Cart Functionality
- [ ] Create `context/CartContext.tsx`
  - Add to cart
  - Remove from cart
  - Update quantity
  - Calculate totals
  - LocalStorage persistence
- [ ] Create `components/cart/CartDrawer.tsx`
  - Slide-in drawer
  - Cart items list
  - Subtotal
  - Checkout CTA
- [ ] Create `components/cart/CartItem.tsx`
  - Product thumbnail
  - Quantity adjuster
  - Remove button
  - Price display

### 1.5 Seed Data Configuration
- [ ] Create `config/products.json` (24 products)
  - 8 T-shirts
  - 6 Hoodies
  - 4 Caps
  - 2 Patches
  - 2 Mugs
  - 2 Wallets
  - Mark 8 as customizable
  - Mark 5 as best sellers
  - Mark 4 as new
- [ ] Create `config/collections.json`
  - 5 Branch collections (Army, Navy, Air Force, Marines, Coast Guard)
  - 8 Role/Specialty collections
  - 3 Gift collections
- [ ] Create `config/faqs.json` (12 FAQs)
- [ ] Create `config/site.json` (site-wide settings)
- [ ] Create type definitions (`types/product.ts`, `types/cart.ts`)

### 1.6 Utility Functions
- [ ] Create `lib/products.ts`
  - getProducts()
  - getProductById()
  - filterProducts()
  - sortProducts()
- [ ] Create `lib/utils.ts`
  - formatPrice()
  - cn() for className merging
  - Other helpers

### 1.7 Home Page Components
- [ ] Create `components/home/HeroSection.tsx`
  - Hero image
  - Bold headline
  - Subheading
  - Primary & secondary CTAs
- [ ] Create `components/home/ShopByBranch.tsx`
  - 5 branch cards with imagery
  - Hover effects
  - Links to filtered collections
- [ ] Create `components/home/ShopByRole.tsx`
  - 8 role/specialty cards
  - Grid layout (responsive)
  - Clear labels
- [ ] Create `components/home/FeaturedProducts.tsx`
  - Showcase 4-6 best sellers
  - Product cards
  - Quick view/add to cart
- [ ] Create `components/home/GiftCollections.tsx`
  - 3 gift occasion cards
  - Emotional copy
  - Visual differentiation
- [ ] Create `components/home/TrustSignals.tsx`
  - Quality guarantee
  - Fast shipping
  - Secure checkout
  - Customer testimonials/reviews

### 1.8 Shared Product Components
- [ ] Create `components/product/ProductCard.tsx`
  - Product image
  - Name, price
  - Badges (New, Best Seller, Customizable)
  - Hover effects
  - Quick add to cart
- [ ] Create `components/shared/CollectionCard.tsx`
  - Collection image/banner
  - Name and description
  - Link to collection page

### 1.9 Home Page Assembly
- [ ] Create `app/page.tsx` (Home page)
  - Import and compose all home sections
  - Proper spacing and layout
  - Responsive design
- [ ] Add placeholder images (generate with AI tool)
  - Hero lifestyle image
  - Branch emblems/imagery (5)
  - Role/specialty images (8)
  - Product images (24 total)

### 1.10 Phase 1 QA
- [ ] **Mobile Responsiveness**
  - Test on mobile viewport (375px, 414px)
  - Check all sections adapt properly
  - Touch targets min 44x44px
- [ ] **Navigation**
  - Header sticky behavior
  - Mobile menu opens/closes
  - All links work
  - Cart drawer functions
- [ ] **Cart Functionality**
  - Add to cart works
  - Cart count updates
  - Remove from cart
  - Quantity adjustments
  - Subtotal calculates correctly
  - LocalStorage persists
- [ ] **Accessibility**
  - Semantic HTML
  - ARIA labels where needed
  - Keyboard navigation
  - Focus indicators
  - Alt text for images
  - Heading hierarchy
- [ ] **Performance**
  - Lighthouse score > 90
  - Images optimized
  - No layout shift
  - Fast initial load
- [ ] **Visual QA**
  - Design system consistency
  - Typography correct
  - Colors match palette
  - Spacing consistent
  - Premium aesthetic maintained

---

## 📦 Phase 2: Shop & Collections Pages

### 2.1 Shop Page (All Products)
- [ ] Create `app/shop/page.tsx`
- [ ] Create `components/shared/FilterSidebar.tsx`
  - Branch filters
  - Role filters
  - Product type filters
  - Price range
  - In-stock only
  - Customizable only
- [ ] Create `components/product/ProductGrid.tsx`
  - Responsive grid
  - Lazy loading
  - Empty state
- [ ] Create sorting dropdown
  - Featured, Price (low/high), Newest, Best Selling
- [ ] Implement filter + sort logic
- [ ] Add pagination or infinite scroll

### 2.2 Filtered Shop Pages
- [ ] Create `app/shop/[category]/page.tsx`
  - Dynamic routing for branches/roles
  - Pre-filtered product display
  - Maintain filter/sort functionality

### 2.3 Collections Pages
- [ ] Create `app/collections/page.tsx` (all collections)
- [ ] Create `app/collections/[slug]/page.tsx` (individual)
  - Retirement Gifts
  - Promotion Gifts
  - PCS Gifts
  - New Arrivals
  - Best Sellers
- [ ] Add collection hero banners
- [ ] Gift-specific features (messaging, wrapping)

### 2.4 Phase 2 QA
- [ ] Mobile responsiveness
- [ ] Filter functionality
- [ ] Sort functionality
- [ ] Navigation between pages
- [ ] Performance check
- [ ] Accessibility audit

---

## 🛍️ Phase 3: Product Detail Page (PDP)

### 3.1 PDP Layout
- [ ] Create `app/shop/product/[id]/page.tsx`
- [ ] Create `components/product/ProductGallery.tsx`
  - Image carousel
  - Zoom functionality
  - Thumbnail navigation
- [ ] Create `components/product/ProductInfo.tsx`
  - Name, price, rating
  - Badges
  - Description
  - Variant selectors (size, color)
  - Quantity selector
  - Add to cart button
  - Customize button (if applicable)

### 3.2 PDP Additional Features
- [ ] Create tabs/accordion for:
  - Full description
  - Material & care
  - Sizing guide
  - Shipping & returns
  - Reviews section
- [ ] Create upsell components
  - "Complete the Look"
  - "Customers Also Bought"
  - Bundle suggestions
- [ ] Add trust elements (badges, guarantees)

### 3.3 Quick View Modal
- [ ] Create `components/product/QuickView.tsx`
  - Triggered from product grid
  - Simplified PDP view
  - Quick add to cart

### 3.4 Phase 3 QA
- [ ] Mobile responsiveness
- [ ] Gallery functionality
- [ ] Variant selection
- [ ] Add to cart from PDP
- [ ] Upsells display correctly
- [ ] Performance
- [ ] Accessibility

---

## 🎨 Phase 4: Customization Wizard

### 4.1 Wizard Structure
- [ ] Create `app/customize/page.tsx`
- [ ] Create `components/customize/CustomizationWizard.tsx`
  - Multi-step wizard with progress indicator
  - Step navigation (back/next)
- [ ] Create `components/customize/CustomizationOptions.tsx`
  - Unit text input (+$5)
  - Name input (+$3)
  - Number input (+$2)
  - Date input (+$3)
  - Color selector (+$4)
  - Real-time price updates
  - Validation

### 4.2 Preview & Finalization
- [ ] Create `components/customize/CustomizationPreview.tsx`
  - Live product preview with customizations
  - Editable preview
- [ ] Create price breakdown display
- [ ] Add to cart with customization data
- [ ] Save for later functionality (optional)

### 4.3 Customization Logic
- [ ] Create `lib/customization.ts`
  - Price calculation
  - Validation rules
  - Character limits
  - Preview data generation
- [ ] Create types (`types/customization.ts`)

### 4.4 Phase 4 QA
- [ ] Mobile responsiveness
- [ ] Wizard navigation
- [ ] Price calculations
- [ ] Preview accuracy
- [ ] Validation works
- [ ] Add to cart with custom data
- [ ] Accessibility

---

## 🎁 Phase 5: Gifts Page

### 5.1 Gift Guide
- [ ] Create `app/gifts/page.tsx`
- [ ] Create gift finder interface
  - By occasion
  - By price range
  - By branch/role
- [ ] Showcase gift bundles with discounts
- [ ] Add gift message option
- [ ] Add gift wrapping toggle

### 5.2 Gift Features Integration
- [ ] Implement gift message in cart
- [ ] Implement gift wrapping add-on
- [ ] Create bundle logic (discount calculation)

### 5.3 Phase 5 QA
- [ ] Gift finder works
- [ ] Bundles display correctly
- [ ] Gift options in cart
- [ ] Mobile responsiveness
- [ ] Accessibility

---

## 📋 Phase 6: Policies & Info Pages

### 6.1 Policy Pages
- [ ] Create `app/policies/shipping/page.tsx`
  - Shipping times and costs
  - Tracking info
  - International shipping
- [ ] Create `app/policies/returns/page.tsx`
  - Return policy (30-day)
  - Exchange process
  - Refund timeline
- [ ] Create `app/policies/privacy/page.tsx`
  - Standard privacy policy
  - Data collection
  - Cookie usage
- [ ] Create `app/policies/faq/page.tsx`
  - Load from config/faqs.json
  - Accordion interface
  - Search functionality
  - 12 FAQs covering all topics

### 6.2 About Us (Optional)
- [ ] Create `app/about/page.tsx` (if needed later)

### 6.3 Phase 6 QA
- [ ] All content displays correctly
- [ ] FAQ accordion works
- [ ] Links from footer work
- [ ] Mobile responsiveness
- [ ] Accessibility

---

## 🔍 Phase 7: Search & Additional Features

### 7.1 Search Functionality
- [ ] Create `components/shared/SearchOverlay.tsx`
  - Search input
  - Autocomplete suggestions
  - Filter by category
  - Recent searches
- [ ] Implement search logic
  - Search products by name, description, tags
  - Search collections
  - Display results

### 7.2 Additional CRO Features
- [ ] Exit intent popup (discount offer)
- [ ] Low stock urgency messaging
- [ ] Recently viewed products
- [ ] Wishlist/favorites (optional)
- [ ] Newsletter signup integration

### 7.3 Phase 7 QA
- [ ] Search works correctly
- [ ] CRO features trigger appropriately
- [ ] No intrusive popups on mobile
- [ ] Performance impact minimal

---

## 🚀 Phase 8: Final QA & Polish

### 8.1 Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### 8.2 Device Testing
- [ ] iPhone (multiple sizes)
- [ ] Android phones
- [ ] Tablets
- [ ] Desktop (various resolutions)

### 8.3 Performance Optimization
- [ ] Run Lighthouse audit (all pages)
- [ ] Optimize images
- [ ] Code splitting verification
- [ ] Bundle size check
- [ ] Core Web Vitals passing

### 8.4 Accessibility Audit
- [ ] Axe DevTools scan (all pages)
- [ ] Keyboard navigation test
- [ ] Screen reader test (NVDA/VoiceOver)
- [ ] Color contrast check
- [ ] ARIA labels review

### 8.5 SEO Setup
- [ ] Meta titles and descriptions (all pages)
- [ ] Open Graph tags
- [ ] Twitter cards
- [ ] Sitemap generation
- [ ] robots.txt
- [ ] Schema markup (Product, BreadcrumbList)

### 8.6 Content Review
- [ ] Proofread all copy
- [ ] Check brand voice consistency
- [ ] Verify all links work
- [ ] Test all CTAs
- [ ] Verify pricing display
- [ ] Check product data accuracy

### 8.7 User Flow Testing
- [ ] Browse products → add to cart → checkout
- [ ] Customize product → preview → add to cart
- [ ] Use filters → find product → purchase
- [ ] Gift flow → add message → purchase
- [ ] Search → find product → purchase
- [ ] Mobile checkout flow

### 8.8 Error Handling
- [ ] 404 page
- [ ] Empty cart state
- [ ] Empty search results
- [ ] Out of stock handling
- [ ] Form validation errors
- [ ] Network error handling

---

## 📝 Phase 9: Documentation & Handoff

### 9.1 Documentation
- [ ] Create comprehensive README.md
  - Project overview
  - Setup instructions
  - Running locally
  - Building for production
  - Deployment guide
- [ ] Document config file structure
- [ ] Create content update guide
  - How to add/edit products
  - How to manage collections
  - How to update FAQs
- [ ] Document component library
- [ ] Create deployment checklist

### 9.2 Config Files Validation
- [ ] Verify all products in config/products.json
- [ ] Verify all collections in config/collections.json
- [ ] Verify all FAQs in config/faqs.json
- [ ] Verify site settings in config/site.json

### 9.3 Production Preparation
- [ ] Environment variables documented
- [ ] Build successfully completes
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] All pages render correctly

---

## 🎉 Phase 10: Deployment

### 10.1 Deployment Setup
- [ ] Set up Vercel/Netlify project
- [ ] Configure environment variables
- [ ] Set up custom domain (if applicable)
- [ ] Configure redirects
- [ ] Set up analytics (optional)

### 10.2 Post-Deployment Verification
- [ ] All pages load correctly
- [ ] Images load properly
- [ ] Navigation works
- [ ] Cart functionality works
- [ ] Forms submit correctly
- [ ] Performance is good
- [ ] No broken links

### 10.3 Monitoring Setup (Optional)
- [ ] Set up error tracking (Sentry)
- [ ] Set up analytics (GA4, Plausible)
- [ ] Set up uptime monitoring

---

## 📊 Success Metrics

### Performance Targets
- Lighthouse Performance: > 90
- Lighthouse Accessibility: 100
- Lighthouse Best Practices: 100
- Lighthouse SEO: > 95
- Time to Interactive: < 3s
- First Contentful Paint: < 1.5s

### Quality Targets
- Zero TypeScript errors
- Zero console errors
- WCAG AA compliance
- Mobile-friendly (Google test)
- All browsers supported

### Business Metrics (Future)
- Conversion rate
- Average order value
- Cart abandonment rate
- Customization adoption rate
- Gift bundle uptake

---

## Notes

- Follow directives strictly
- Prioritize CRO and UX
- Maintain premium aesthetic
- Keep data centralized and swappable
- Test frequently on mobile
- Run QA after each phase
- Document as you build
