# Mill Apparel - Design System

## Visual Inspiration

**Reference**: [Ski Apparel Store Concept](https://dribbble.com/shots/26782526-Ski-Apparel-Store-Concept-Clean-Bold-UI)

## Design Keywords

- Clean
- Bold typography
- Lots of whitespace
- Premium product photography
- Refined product cards
- Modern filters
- Minimal color palette

## Color Palette

### Primary Colors
- **Dark**: `#0A0A0A` (near-black for text/headers)
- **White**: `#FFFFFF` (backgrounds, cards)
- **Gray**: `#F5F5F5` (secondary backgrounds)

### Accent Colors
- **Military Olive**: `#4A5240` (subtle military nod, CTAs)
- **Gold Accent**: `#D4AF37` (premium highlights, badges)
- **Charcoal**: `#2D2D2D` (secondary text)
- **Light Gray**: `#E5E5E5` (borders, dividers)

### Semantic Colors
- **Success**: `#22C55E` (in stock, success states)
- **Warning**: `#F59E0B` (low stock)
- **Error**: `#EF4444` (out of stock, errors)

## Typography

### Font Family
Use **Inter** or **Space Grotesk** from Google Fonts for modern, clean look.

**Primary**: Inter (body, UI)  
**Display**: Space Grotesk (headings, bold statements)

### Type Scale
- **Hero**: 3.5rem / 56px (landing headlines)
- **H1**: 2.5rem / 40px (page titles)
- **H2**: 2rem / 32px (section headers)
- **H3**: 1.5rem / 24px (card titles)
- **Body**: 1rem / 16px (default text)
- **Small**: 0.875rem / 14px (captions, labels)
- **Tiny**: 0.75rem / 12px (badges, metadata)

### Font Weights
- Regular: 400 (body text)
- Medium: 500 (emphasis)
- Semibold: 600 (subheadings)
- Bold: 700 (headings, CTAs)

## Spacing System

Use Tailwind's default spacing scale (4px base):
- **Micro**: 0.5rem / 8px
- **Small**: 1rem / 16px
- **Medium**: 1.5rem / 24px
- **Large**: 2rem / 32px
- **XLarge**: 3rem / 48px
- **XXLarge**: 4rem / 64px

## Component Styles

### Product Cards
- Clean white background
- Subtle shadow on hover
- High-quality product image (square ratio)
- Clear product name
- Prominent price
- Badge overlay for "New", "Best Seller", "Customizable"
- Quick add to cart button (appears on hover)

### Buttons
**Primary CTA**:
- Background: Military Olive or Dark
- Text: White
- Bold font weight
- Padding: 0.75rem 1.5rem
- Rounded corners: 0.375rem (6px)
- Hover: Slight darkening + scale

**Secondary**:
- Border: 2px solid Dark
- Background: White
- Text: Dark
- Same padding/border radius

**Ghost**:
- Text only with underline on hover
- Minimal padding

### Navigation
- Sticky header
- Clean white background with subtle shadow
- Bold logo (left)
- Primary links (center): Shop, Collections, Customize, Gifts
- Cart + Search (right)
- Mobile: Hamburger menu

### Filters & Sorting
- Clean sidebar (desktop) or drawer (mobile)
- Clear checkboxes
- Minimal borders
- "Apply" and "Clear" actions

### Input Fields
- Border: 1px solid Light Gray
- Focus: Border becomes Dark
- Padding: 0.75rem 1rem
- Border radius: 0.375rem (6px)
- Label above field

## Layout Principles

### Grid System
- Desktop: 12-column grid
- Tablet: 8-column grid
- Mobile: 4-column grid
- Container max-width: 1280px

### Whitespace
- Generous padding between sections (4rem / 64px)
- Comfortable line height (1.6-1.8)
- Don't crowd elements
- Let products breathe

### Product Photography
- Square aspect ratio (1:1) for consistency
- Clean white or subtle gradient backgrounds
- High resolution
- Show product details clearly
- Lifestyle shots for hero sections

## Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Wide: > 1280px

## Accessibility

- WCAG AA contrast ratios minimum
- Focus states on all interactive elements
- Semantic HTML
- Alt text for all images
- Keyboard navigation support

## Animation & Micro-interactions

- Subtle hover effects (scale 1.02, shadow lift)
- Smooth transitions (200-300ms)
- Loading states for async actions
- Success confirmations (cart add, form submit)
- No gratuitous animations

## Icons

Use **Heroicons** or **Lucide Icons** for consistency:
- Outline style for UI elements
- Solid style for filled states
- 24px default size
- Inherit color from parent

## Image Guidelines

### Product Images
- 1000x1000px minimum
- Square aspect ratio
- White or subtle background
- Consistent lighting
- Show front view as primary

### Hero Images
- 1920x800px (desktop)
- Mobile: 800x600px
- High quality
- Lifestyle shots showing products in use
- Clear focal point

## Best Practices

1. **Consistency**: Use design tokens from this system
2. **Performance**: Optimize images, lazy load
3. **Mobile-first**: Design for mobile, enhance for desktop
4. **Clarity**: Clear hierarchy, obvious CTAs
5. **Premium feel**: Quality imagery, generous whitespace, refined typography
