# 360 Asset Creation Guide

## Overview

The production 360 viewer uses a **shading + mask compositing system** to support unlimited colors without re-rendering 3D assets.

## Asset Requirements

### Directory Structure

Create frame sequences in the following structure:

```
public/360/{productType}/
├── shading/          # Lighting and fabric detail (grayscale/neutral)
│   ├── frame_000.webp
│   ├── frame_001.webp
│   └── ... (frame_035.webp)
├── mask/             # Color-tintable mask
│   ├── frame_000.webp
│   ├── frame_001.webp
│   └── ... (frame_035.webp)
└── preview.webp      # Fallback static image (front view)
```

### Frame Specifications

- **Format**: WebP (primary), PNG (fallback)
- **Count**: 36 frames minimum (10° rotation increments)
- **Naming**: `frame_XXX.webp` (zero-padded, 3 digits)
- **Resolution**: Recommended 1024x1024px or higher
- **Background**: Transparent PNG/WebP

### Shading Layer

The shading layer contains **lighting, shadows, and fabric detail** in a neutral color (typically grayscale or warm gray).

**Purpose**: Preserves realistic lighting when colors are applied  

**Creation in Blender**:
1. Set up 360° turntable camera (36 positions, 10° apart)
2. Apply neutral material (gray or warm  gray diffuse)
3. Enable studio lighting setup
4. Render sequence with transparent background
5. Export as `frame_000.webp` through `frame_035.webp`

### Mask Layer

The mask layer is a **pure white silhouette** of the product that will be tinted with user-selected colors.

**Purpose**: Defines which areas receive color tinting

**Creation in Blender**:
1. Use same turntable setup as shading layer
2. Apply `emission` shader with pure white (#FFFFFF)
3. Disable lighting (emission is self-lit)
4. Render sequence with transparent background
5. Export as `frame_000.webp` through `frame_035.webp`

### Fallback Static Preview

A single high-quality front-view image used when frame sequences are unavailable.

**Specifications**:
- **Filename**: `preview.webp`
- **View**: Front-facing (frame_000 equivalent)
- **Quality**: High resolution, production-ready

## Blender Automation Script

```python
import bpy
import os

# Configuration
OUTPUT_DIR = "/path/to/public/360"
PRODUCT_NAME = "hoodie"
FRAME_COUNT = 36
ROTATION_DEGREES = 360

def setup_turntable(obj):
    """Set up 360° rotation animation"""
    obj.rotation_euler = (0, 0, 0)
    obj.keyframe_insert(data_path="rotation_euler", frame=0)
    obj.rotation_euler = (0, 0, radians(ROTATION_DEGREES))
    obj.keyframe_insert(data_path="rotation_euler", frame=FRAME_COUNT)
    
def render_sequence(layer_type):
    """Render shading or mask sequence"""
    scene = bpy.context.scene
    scene.frame_start = 0
    scene.frame_end = FRAME_COUNT - 1
    
    output_path = f"{OUTPUT_DIR}/{PRODUCT_NAME}/{layer_type}/"
    os.makedirs(output_path, exist_ok=True)
    
    scene.render.filepath = f"{output_path}frame_"
    scene.render.image_settings.file_format = 'PNG'  # Convert to webp externally
    
    bpy.ops.render.render(animation=True)
    
# Main execution
product_obj = bpy.data.objects["Product"]  # Replace with your object name
setup_turntable(product_obj)

# Render shading layer
render_sequence("shading")

# Switch to mask material and render
product_obj.active_material = bpy.data.materials["Mask_Material"]
render_sequence("mask")
```

## Post-Processing

### Convert PNG to WebP

```bash
# Batch convert using ImageMagick or cwebp
for file in frame_*.png; do
    cwebp -q 85 "$file" -o "${file%.png}.webp"
done
```

### Optimize File Sizes

- **Target**: < 200KB perframe (webp)
- **Quality**: 80-90 (balance between quality and file size)
- **Tools**: `cwebp`, ImageMagick, Squoosh

## Testing

1. Place frame sequences in `/public/360/{productType}/shading/` and `/public/360/{productType}/mask/`
2. Navigate to `/customize` in the app
3. Verify:
   - All 36 frames load correctly
   - Color changes tint the product properly
   - Rotation is smooth
   - Lighting detail is preserved

## Fallback Behavior

The viewer has three tiers:

1. **Primary**: Shading + mask compositing (new system)
2. **Secondary**: Legacy color folder structure (`/360-frames/{productType}/{color}/`)
3. **Tertiary**: Static preview image (`/360/{productType}/preview.webp`)

If shading/mask frames are missing, the system automatically falls back to the next tier.

## Asset Checklist

- [ ] 36 shading frames rendered and exported as webp
- [ ] 36 mask frames rendered and exported as webp  
- [ ] Fallback preview.webp created
- [ ] All frames properly named (frame_000.webp - frame_035.webp)
- [ ] File sizes optimized (< 200KB each)
- [ ] Transparent backgrounds verified
- [ ] Tested in development environment
