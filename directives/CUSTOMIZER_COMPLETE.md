# Interactive Merch Builder - Mil Apparel Customizer

## ✨ Features Implemented

### 🎨 Core Functionality
- **Full Canvas-Based Design System**: Real-time product preview with draggable layers
- **Multi-Product Support**: Hoodie, T-Shirt, Long Sleeve, Tank Top
- **360° Product Views**: Front, Back, Left, Right
- **Layer Management**: Add, edit, delete, duplicate, and reorder design layers
- **Undo/Redo System**: Full history tracking with keyboard shortcuts
- **Zoom Controls**: Adjustable canvas zoom (50% - 300%)

### 🖼️ Design Tools
1. **Text Tool**
   - Custom text input
   - Font size control (12-96px)
   - Color picker
   - Rotation control
   - Opacity adjustment
   - Alignment options

2. **Image Upload**
   - Drag-and-drop file upload
   - Position and scale images
   - Rotation and opacity controls
   - Layer visibility toggle

3. **Military Graphics Library**
   - Pre-made insignias, patches, badges
   - Searchable and filterable
   - Branch-specific graphics
   - One-click add to canvas

4. **Design Templates**
   - Pre-built military designs
   - Quick-start templates
   - Category-based organization

### 🎛️ Control Panel
- **Product Customization**
  - Type selector (4 product types)
  - Color picker (7 military colors)
  - Size selector (XS - 3XL)
  
- **Layer Properties**
  - Position (drag on canvas)
  - Size and rotation
  - Opacity and visibility
  - Lock/unlock layers
  - Z-index ordering

- **Actions**
  - Duplicate layers
  - Delete layers
  - Clear entire design
  - Save/Export design

### 💾 Export & Save
- **Export Design**: Download as JSON
- **Save Progress**: Browser localStorage
- **Add to Cart**: Direct integration

## 📁 File Structure

```
app/customize/
  └── page.tsx              # Main customizer page

components/customize/
  ├── ProductPreview.tsx    # Canvas-based 3D preview
  ├── TemplateLibrary.tsx   # Left sidebar (graphics/templates)
  ├── ControlPanel.tsx      # Right sidebar (controls)
  └── builder/
      └── Toolbar.tsx       # Top toolbar

context/
  └── CustomizerContext.tsx # Global state management

types/
  └── customizer.ts         # TypeScript definitions

public/images/
  ├── mockups/              # Product mockup images
  └── graphics/             # Military graphics library
```

## 🚀 Usage

Navigate to `/customize` to access the interactive builder.

### Keyboard Shortcuts
- `Ctrl/Cmd + Z`: Undo
- `Ctrl/Cmd + Y`: Redo
- `Delete`: Remove selected layer
- `Ctrl/Cmd + D`: Duplicate selected layer

### Design Workflow
1. Select a product type (Hoodie, T-Shirt, etc.)
2. Choose a color and size
3. Add elements:
   - Click "Add Text" or "Add Image"
   - Or drag graphics from the left library
4. Customize each layer:
   - Drag to reposition
   - Use controls to adjust properties
5. Save or export your design
6. Add to cart when ready

## 🎨 Customization Options

### Product Colors
- White
- Black
- Gray
- Navy
- OD Green
- Coyote Brown
- Scarlet

### Graphics Categories
- Insignias
- Patches
- Badges
- Emblems
- Icons

### Military Branches
- Army
- Navy
- Air Force
- Marines
- Coast Guard

## 🔧 Technical Details

### State Management
- React Context API for global state
- History tracking with linear undo/redo
- Layer-based rendering system

### Canvas Rendering
- HTML5 Canvas API
- Real-time layer composition
- Color tinting for product customization
- Transform (translate, rotate, scale)

### Performance
- Optimized re-rendering with useMemo
- Efficient layer sorting
- Lazy image loading

## 📝 Future Enhancements
- [ ] 3D product rotation (Three.js integration)
- [ ] Advanced text effects (gradients, outlines, shadows)
- [ ] More military graphics and templates
- [ ] Team/unit customization presets
- [ ] Live collaboration mode
- [ ] AR preview on mobile devices
- [ ] Export to high-res PNG/PDF

## 🎯 Inspired By
Design inspiration from [WebsoftYou's Interactive Merch Builder](https://dribbble.com/shots/26593556-Interactive-Merch-Builder) on Dribbble.

---

**Built for Mil Apparel** - Premium Military Identity Apparel
