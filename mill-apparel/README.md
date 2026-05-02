# Mill Apparel - Premium Military Apparel E-Commerce

Premium online store for military identity and lifestyle apparel. Built with Next.js, Tailwind CSS, and modern e-commerce best practices.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📋 Project Overview

Mill Apparel is a premium e-commerce platform featuring:
- **Military Branch Collections**: Army, Navy, Air Force, Marines, Coast Guard
- **Role/Specialty Collections**: EOD, Infantry, Aviation, Medical, MP, SF, Engineering, Intelligence
- **Customizable Products**: Personalize gear with unit text, names, numbers, dates
- **Gift Collections**: Curated selections for Retirement, Promotion, PCS occasions

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **State Management**: React Context API
- **Icons**: Lucide React
- **Fonts**: Inter + Space Grotesk (via next/font)

## 📁 Project Structure

```
mill-apparel/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                # Design system components
│   ├── layout/            # Header, Footer, etc.
│   ├── product/           # Product-related components
│   ├── cart/              # Cart components
│   ├── home/              # Home page sections
│   └── shared/            # Shared components
├── config/                # Configuration & seed data (JSON)
│   ├── products.json      # Product catalog (24 products)
│   ├── collections.json   # Collections metadata (16 collections)
│   ├── faqs.json         # FAQ content (12 FAQs)
│   └── site.json         # Site-wide settings
├── context/               # React Context providers
├── lib/                   # Utility functions
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## 🎨 Design System

### Colors
- **Dark**: `#0A0A0A` - Primary text and headers
- **Military Olive**: `#4A5240` - Primary CTA and accents
- **Gold**: `#D4AF37` - Premium highlights and badges
- **White**: `#FFFFFF` - Background
- **Gray BG**: `#F5F5F5` - Secondary background

### Typography
- **Primary Font**: Inter (body text, UI)
- **Display Font**: Space Grotesk (headings, bold statements)

### Components
All components follow the design system and are located in `components/ui/`:
- Button (primary, secondary, ghost)
- Badge (new, bestseller, customizable, sale, lowstock)
- Card, Input, Modal (to be added)

## 🛒 Features

### ✅ Implemented (Phase 1)
- Responsive header with navigation
- Shopping cart with localStorage persistence
- Product catalog with 24 products
- Home page with hero, collections, and trust signals
- Mobile-responsive design
- TypeScript type safety

### 🚧 Coming Soon (Phase 2+)
- Shop page with filters and sorting
- Product detail pages
- Customization wizard
- Gift guide and bundles
- Search functionality
- User accounts
- Checkout process

## 📦 Data Management

All product and content data is stored in JSON files in the `/config` directory for easy updates:

- **products.json**: Product catalog (name, price, images, collections, etc.)
- **collections.json**: Collection metadata (branches, roles, gifts)
- **faqs.json**: Frequently asked questions
- **site.json**: Site-wide settings (navigation, social links, etc.)

### Updating Products

Edit `config/products.json`:

```json
{
  "id": "army-infantry-tee",
  "name": "Army Infantry T-Shirt",
  "price": 29.99,
  "inStock": true,
  "isBestSeller": true,
  "isCustomizable": true,
  ...
}
```

## 🎯 Development Guidelines

### Adding a New Page
1. Create page file in `app/[page-name]/page.tsx`
2. Use existing components from `components/`
3. Follow mobile-first design approach
4. Implement TypeScript types

### Creating a Component
1. Place in appropriate `components/` subfolder
2. Use TypeScript for props interface
3. Follow design system (colors, fonts, spacing)
4. Make it responsive
5. Add proper accessibility attributes

### Styling Guidelines
- Use Tailwind utility classes
- Reference design system CSS variables
- Mobile-first responsive design
- Consistent spacing (Tailwind scale)

## 🔍 Key Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📖 Documentation

- [Build Checklist](../directives/mill_apparel_build_checklist.md)
- [Brand Guidelines](../directives/mill_apparel_brand.md)
- [Design System](../directives/mill_apparel_design_system.md)
- [Technical Specs](../directives/mill_apparel_technical.md)
- [Phase 1 Complete](../directives/PHASE_1_COMPLETE.md)

## 🎨 Design Principles

1. **Clean & Bold**: Generous whitespace, bold typography
2. **Premium Feel**: Quality over quantity
3. **Respectful**: Honor military service authentically
4. **Modern**: Contemporary, not dated
5. **Mobile-First**: Optimized for all devices

## 🚀 Deployment

This project is built for deployment on Vercel (recommended) or Netlify.

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push

## 📝 License

All rights reserved - Mill Apparel

## 🤝 Support

For questions or support, contact: support@millapparel.com

---

**Built with ❤️ using Next.js and Tailwind CSS**
