# Mill Apparel - Technical Specifications

## Tech Stack

### Framework
**Next.js 14+** (App Router)

### Styling
**Tailwind CSS**

### State Management
- React Context for cart
- Local state for UI
- (Future: Consider Zustand if state gets complex)

### Data Storage
- **Development**: JSON config files in `/config` directory
- **Production Ready**: Easy migration to headless CMS or database

### Type Safety
**TypeScript** (strongly recommended for production)

## Project Structure

```
mill-apparel/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   ├── shop/
│   │   ├── page.tsx               # All products
│   │   ├── [category]/page.tsx    # Filtered by category
│   │   └── product/[id]/page.tsx  # Product detail
│   ├── collections/
│   │   ├── page.tsx               # All collections
│   │   └── [slug]/page.tsx        # Individual collection
│   ├── customize/
│   │   └── page.tsx               # Customization wizard
│   ├── gifts/
│   │   └── page.tsx               # Gift guide
│   ├── cart/
│   │   └── page.tsx               # Cart page (optional)
│   └── policies/
│       ├── shipping/page.tsx
│       ├── returns/page.tsx
│       ├── privacy/page.tsx
│       └── faq/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── MobileMenu.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── ProductInfo.tsx
│   │   └── QuickView.tsx
│   ├── cart/
│   │   ├── CartDrawer.tsx
│   │   ├── CartItem.tsx
│   │   └── CartSummary.tsx
│   ├── customize/
│   │   ├── CustomizationWizard.tsx
│   │   ├── CustomizationPreview.tsx
│   │   └── CustomizationOptions.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   └── shared/
│       ├── CollectionCard.tsx
│       ├── FilterSidebar.tsx
│       └── SearchOverlay.tsx
├── config/
│   ├── products.json              # Product catalog
│   ├── collections.json           # Collections metadata
│   ├── faqs.json                  # FAQ data
│   └── site.json                  # Site-wide config
├── lib/
│   ├── products.ts                # Product utilities
│   ├── cart.ts                    # Cart logic
│   ├── customization.ts           # Customization helpers
│   └── utils.ts                   # General utilities
├── context/
│   └── CartContext.tsx            # Cart state management
├── types/
│   ├── product.ts                 # Product types
│   ├── cart.ts                    # Cart types
│   └── customization.ts           # Customization types
├── public/
│   ├── images/
│   │   ├── products/              # Product images
│   │   ├── collections/           # Collection banners
│   │   ├── hero/                  # Hero images
│   │   └── logos/                 # Brand assets
│   └── icons/                     # Icon assets
├── styles/
│   └── globals.css                # Global styles + Tailwind
├── tailwind.config.ts             # Tailwind configuration
├── next.config.js                 # Next.js configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Key Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.4.0",
    "heroicons": "^2.0.18" // or lucide-react
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/react": "^18.2.0",
    "@types/node": "^20.0.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

## Component Architecture

### Design System Components (`components/ui/`)
Reusable, atomic components following design system:
- Button (primary, secondary, ghost variants)
- Input (text, number, email)
- Badge (new, best seller, customizable)
- Card (product card, collection card)
- Modal (dialogs, overlays)

### Feature Components (`components/`)
Business logic components:
- Product-related (cards, grids, galleries)
- Cart functionality
- Customization wizard
- Navigation and layout

### Layout Components (`components/layout/`)
Global structure:
- Header with navigation
- Footer
- Mobile menu
- Container wrappers

## Data Management

### Product Data Structure (config/products.json)
```json
[
  {
    "id": "army-infantry-tee",
    "name": "Army Infantry T-Shirt",
    "category": "apparel",
    "type": "tshirt",
    "price": 29.99,
    "description": "Premium cotton tee featuring Army Infantry insignia",
    "images": ["/images/products/army-infantry-tee-1.jpg"],
    "inStock": true,
    "collections": ["army", "infantry"],
    "isNew": false,
    "isBestSeller": true,
    "isCustomizable": true,
    "sizes": ["S", "M", "L", "XL", "2XL"],
    "colors": ["Black", "OD Green", "Gray"],
    "material": "100% cotton",
    "rating": 4.8,
    "reviewCount": 124
  }
]
```

### Cart State Management
Use React Context for cart:
- Add to cart
- Remove from cart
- Update quantity
- Calculate totals
- Persist to localStorage

### Filtering & Sorting Logic
- Filter by branch, role, type, price, in-stock
- Sort by featured, price, newest, best-selling
- Maintain URL params for shareability

## Image Strategy

### Product Images
- Use Next.js Image component for optimization
- Lazy loading
- Responsive srcsets
- WebP format where supported
- Placeholder blur effect

### Folder Structure
```
public/images/
├── products/           # 1000x1000px square
├── collections/        # 1920x600px banners
├── hero/              # 1920x800px lifestyle
└── logos/             # SVG preferred
```

## Styling Approach

### Tailwind Configuration
- Custom colors from design system
- Custom font families
- Spacing scale
- Breakpoints
- Animation utilities

### Component Styling
- Tailwind utility classes (primary approach)
- CSS modules for complex components (if needed)
- No inline styles
- Consistent classname ordering (Prettier plugin)

## Responsive Design

### Breakpoints
- **sm**: 640px (mobile landscape)
- **md**: 768px (tablet)
- **lg**: 1024px (desktop)
- **xl**: 1280px (wide desktop)

### Mobile-First Approach
- Design for mobile first
- Enhance for larger screens
- Touch-friendly interactions
- Optimized images for mobile

## Performance Optimization

### Code Splitting
- Per-route automatic code splitting (Next.js)
- Dynamic imports for heavy components
- Lazy load modals and drawers

### Image Optimization
- Next.js Image component
- WebP with fallbacks
- Responsive images
- Lazy loading
- Blur placeholders

### Caching
- Static generation where possible
- ISR (Incremental Static Regeneration) for product pages
- Browser caching headers

### Bundle Size
- Tree shaking
- Remove unused dependencies
- Analyze bundle with `next/bundle-analyzer`

## SEO Requirements

### Metadata
- Dynamic page titles
- Meta descriptions
- Open Graph tags
- Twitter cards
- Canonical URLs

### Structure
- Semantic HTML
- Heading hierarchy
- Schema.org markup (Product, BreadcrumbList)
- Sitemap generation
- robots.txt

## Accessibility

### Standards
- WCAG AA compliance
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Focus management

### Testing
- Axe DevTools
- Lighthouse accessibility score
- Keyboard-only navigation test
- Screen reader testing

## Development Workflow

### Setup
```bash
npx create-next-app@latest mill-apparel --typescript --tailwind --app
cd mill-apparel
npm install
npm run dev
```

### Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### Git Workflow
- Feature branches
- Meaningful commits
- Pull request reviews (optional for solo)

## Testing Strategy (Future)

### Unit Tests
- Component testing with Jest + React Testing Library
- Utility function tests

### E2E Tests
- Playwright or Cypress
- Critical user flows (add to cart, checkout)

### Visual Regression
- Chromatic or Percy (optional)

## Deployment

### Platform
- **Vercel** (recommended for Next.js)
- **Netlify** (alternative)

### Environment Variables
- API keys (if any)
- Analytics IDs
- Feature flags

### CI/CD
- Automatic deployment on git push
- Preview deployments for branches
- Production deployment on main branch

## Future Enhancements

### Phase 2+
- User accounts & authentication
- Order history
- Wishlist functionality
- Product reviews system
- Email notifications
- Admin panel for product management
- Analytics integration (GA4, Plausible)
- A/B testing framework
- Inventory management integration
- Payment processing (Stripe, Shopify)

## Notes

- Keep config files centralized for easy updates
- Use TypeScript for type safety
- Follow Next.js best practices
- Optimize for Core Web Vitals
- Mobile-first, always
- Test on real devices
- Monitor performance with Lighthouse
