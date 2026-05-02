# Phase 4: Customization Wizard - Implementation Plan

## 🎯 Overview

Build a multi-step customization wizard that allows customers to personalize military apparel with custom text, names, ranks, units, and dates. This feature will be a key revenue driver and brand differentiator.

## 📋 Requirements Summary

### Customization Options & Pricing
- **Name/Call Sign** (+$8) - Personal name or military call sign
- **Rank** (+$5) - Military rank (text input)
- **Unit/Squadron** (+$8) - Unit designation (e.g., "82nd Airborne", "SEAL Team 3")
- **Service Dates** (+$5) - Years of service or specific dates
- **Custom Number** (+$3) - Jersey-style number or badge number

**Total Possible Customization Cost**: Up to $29 additional

### User Experience
- Multi-step wizard with progress indicator
- Live preview showing customizations on product
- Real-time price updates
- Validation and character limits
- Mobile-responsive design
- Option to save/share custom designs

## 🗺️ User Flow

1. **Entry Points**:
   - "Customize This Product" button on PDP (for customizable products)
   - "Customize" link in main navigation
   - Direct link to `/customize`

2. **Step 1: Select Product**
   - Show only customizable products (filtered by `isCustomizable: true`)
   - Product cards with "Customize" button
   - Or skip if coming from PDP

3. **Step 2: Choose Placement**
   - Front chest (left/right/center)
   - Back (upper/center)
   - Sleeve (left/right)
   - Visual placement preview

4. **Step 3: Add Text Options**
   - Name/Call Sign (max 20 chars)
   - Rank (dropdown + custom)
   - Unit/Squadron (max 30 chars)
   - Service Dates (formatted input)
   - Custom Number (max 3 digits)
   
5. **Step 4: Choose Style**
   - Thread color picker
   - Font style (3-4 options: Block, Script, Stencil, Modern)
   - Text size (S/M/L)

6. **Step 5: Review & Add to Cart**
   - Full preview
   - Price breakdown
   - Edit any step
   - Add to cart with customization data
   - Save design for later

## 🏗️ Technical Architecture

### New Files to Create

#### Pages
```
app/customize/page.tsx                  # Main customization landing page
app/customize/[productId]/page.tsx      # Product-specific customization wizard
```

#### Components
```
components/customize/
├── CustomizationWizard.tsx            # Main wizard container with stepper
├── ProductSelector.tsx                # Step 1: Select product to customize
├── PlacementSelector.tsx              # Step 2: Choose placement positions
├── TextOptionsForm.tsx                # Step 3: Text inputs and options
├── StyleSelector.tsx                  # Step 4: Colors, fonts, sizing
├── CustomizationPreview.tsx           # Live preview component
├── PriceBreakdown.tsx                 # Itemized cost display
└── ProgressStepper.tsx                # Visual progress indicator
```

#### Types
```
types/customization.ts                 # Customization data structures
```

#### Utilities
```
lib/customization.ts                   # Price calculation, validation, helpers
```

#### Context (Optional)
```
context/CustomizationContext.tsx       # Wizard state management
```

## 📊 Data Structures

### CustomizationData Interface
```typescript
interface CustomizationData {
  productId: string;
  productName: string;
  basePrice: number;
  
  // Placement
  placements: Placement[];
  
  // Text Options
  name?: string;
  rank?: string;
  unit?: string;
  serviceDates?: string;
  customNumber?: string;
  
  // Style
  threadColor: string;
  fontStyle: 'block' | 'script' | 'stencil' | 'modern';
  textSize: 'small' | 'medium' | 'large';
  
  // Pricing
  customizationCost: number;
  totalPrice: number;
}

interface Placement {
  location: 'front-left' | 'front-center' | 'front-right' | 'back-upper' | 'back-center' | 'sleeve-left' | 'sleeve-right';
  text: string;
  type: 'name' | 'rank' | 'unit' | 'dates' | 'number';
}
```

## 🎨 Design Requirements

### Visual Style
- Consistent with Phases 1-3 (military olive, premium feel)
- Clean, step-by-step progression
- Large, visual preview that updates in real-time
- Mobile-first responsive design
- Clear pricing transparency

### Key Components
- **Progress Stepper**: Shows current step (1/5, 2/5, etc.)
- **Live Preview**: Product image with overlay showing customization placement
- **Option Cards**: Selectable cards for fonts, placements, etc.
- **Price Badge**: Floating or sticky price that updates live

## ✅ Validation Rules

### Character Limits
- Name/Call Sign: 2-20 characters
- Rank: 2-15 characters
- Unit/Squadron: 5-30 characters
- Service Dates: Valid date format
- Custom Number: 1-3 digits

### Required Fields
- At least ONE customization option must be selected
- Product must be selected
- At least ONE placement must be chosen

### Pricing Logic
```typescript
const calculateCustomizationCost = (data: CustomizationData): number => {
  let cost = 0;
  
  if (data.name) cost += 8;
  if (data.rank) cost += 5;
  if (data.unit) cost += 8;
  if (data.serviceDates) cost += 5;
  if (data.customNumber) cost += 3;
  
  // Style premium (optional)
  if (data.fontStyle === 'script') cost += 2;
  
  return cost;
};
```

## 🔗 Integration Points

### Cart Integration
- Add customization data to cart item
- Display customization details in cart drawer
- Show customization summary in checkout
- Prevent editing customization after adding to cart (or allow with warning)

### Product Detail Page
- Show "Customize This Product" button for customizable items
- Link directly to customization wizard with product pre-selected

### Navigation
- Add `/customize` to main navigation
- Breadcrumb: Home > Customize > [Product Name]

## 🧪 Testing Checklist

### Functionality
- [ ] All steps navigate forward/backward
- [ ] Preview updates in real-time
- [ ] Price calculates correctly
- [ ] Validation works on all fields
- [ ] Add to cart includes customization data
- [ ] Mobile responsive on all steps
- [ ] Character limits enforced
- [ ] At least one option required

### Visual
- [ ] Consistent design system
- [ ] Clear visual hierarchy
- [ ] Accessible color contrasts
- [ ] Touch-friendly on mobile
- [ ] Preview is clear and legible

### Edge Cases
- [ ] No product selected
- [ ] No customizations entered
- [ ] Maximum customizations selected
- [ ] Invalid characters in inputs
- [ ] Very long text entries
- [ ] Browser back button behavior

## 📅 Build Order (Phases)

### Phase 4A: Foundation (Day 1)
1. Create types and data structures
2. Create customization utility functions
3. Build basic wizard container with stepper
4. Implement step navigation

### Phase 4B: Product Selection (Day 1-2)
5. Build product selector step
6. Filter customizable products
7. Create product cards for selection

### Phase 4C: Core Customization (Day 2-3)
8. Build text options form
9. Implement validation logic
10. Create placement selector
11. Build style selector

### Phase 4D: Preview & Pricing (Day 3-4)
12. Create live preview component
13. Implement price calculation
14. Build price breakdown display
15. Add real-time updates

### Phase 4E: Cart Integration (Day 4)
16. Integrate with CartContext
17. Update cart to handle customization data
18. Update cart drawer to show customizations
19. Test full flow

### Phase 4F: Polish (Day 5)
20. Add mobile responsiveness
21. Implement "save for later" feature
22. Add transitions and animations
23. Final QA and testing

## 🎯 Success Metrics

- [ ] Customization wizard completes without errors
- [ ] All 8 customizable products work in wizard
- [ ] Price calculation is accurate
- [ ] Preview shows customizations correctly
- [ ] Mobile experience is smooth
- [ ] Customized products add to cart correctly
- [ ] No TypeScript errors
- [ ] Lighthouse performance > 85

## 📝 Notes

- Use existing design system (Button, Badge, Input components)
- Keep customization data in component state (no global context needed initially)
- Preview can be simple text overlay on product image (no complex rendering)
- Consider adding "popular customizations" or templates later
- Future: Allow uploading custom unit patches/insignia

---

**Ready to build Phase 4!** 🚀
