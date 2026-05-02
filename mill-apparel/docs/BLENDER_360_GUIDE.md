# Blender 360° Turntable - Complete Setup Guide

## Overview

This guide walks you through creating production-ready 360° frame sequences for the Mil Apparel customizer using Blender.

**What you'll create:**
- 2 sequences per product (shading + mask)
- 36 frames per sequence (10° rotation increments)
- WebP format, optimized for web (<200KB each)
- 4 products = 288 total frames

---

## Prerequisites

### Software
- **Blender 3.6+** (Download: https://www.blender.org/download/)
- **cwebp** for WebP conversion (Download: https://developers.google.com/speed/webp/download)

### Optional
- Product 3D models (OBJ/FBX format)
- If you don't have models, we'll use Blender primitives as placeholders

---

## Part 1: Blender Project Setup

### Step 1: Create New Project

1. Open Blender
2. Delete default cube, camera, and light (Select all with `A`, then `X` → Delete)
3. Save as `mil-apparel-360.blend`

### Step 2: Import or Create Product Models

**Option A: Using 3D Models (Recommended)**
```
File → Import → FBX/OBJ
- Import hoodie.fbx
- Import tshirt.fbx  
- Import longsleeve.fbx
- Import tank.fbx
```

**Option B: Using Primitives (Quick Start)**
```python
# Run this in Blender's Python console
import bpy

# Create simple hoodie placeholder
bpy.ops.mesh.primitive_cube_add(size=2, location=(0, 0, 1))
bpy.context.object.name = "Hoodie"

# Create tshirt placeholder
bpy.ops.mesh.primitive_cube_add(size=1.8, location=(0, 0, 0.9))
bpy.context.object.name = "TShirt"

# Create longsleeve placeholder  
bpy.ops.mesh.primitive_cube_add(size=1.9, location=(0, 0, 0.95))
bpy.context.object.name = "Longsleeve"

# Create tank placeholder
bpy.ops.mesh.primitive_cube_add(size=1.6, location=(0, 0, 0.8))
bpy.context.object.name = "Tank"
```

### Step 3: Set Up Turntable Camera

1. Add camera: `Shift+A` → Camera
2. Position camera:
   - Location: X=0, Y=-8, Z=2
   - Rotation: X=80°, Y=0°, Z=0°
3. Frame the product in camera view (`Numpad 0`)

### Step 4: Create Turntable Animation

**Run this Python script in Blender:**

```python
import bpy
import math

# Configuration
PRODUCT_NAME = "Hoodie"  # Change for each product
FRAME_COUNT = 36
ROTATION_DEGREES = 360

# Get the product object
obj = bpy.data.objects[PRODUCT_NAME]

# Clear existing animation
obj.animation_data_clear()

# Set up rotation animation
obj.rotation_euler = (0, 0, 0)
obj.keyframe_insert(data_path="rotation_euler", frame=0)

obj.rotation_euler = (0, 0, math.radians(ROTATION_DEGREES))
obj.keyframe_insert(data_path="rotation_euler", frame=FRAME_COUNT)

# Set linear interpolation (no easing)
for fcurve in obj.animation_data.action.fcurves:
    for keyframe in fcurve.keyframe_points:
        keyframe.interpolation = 'LINEAR'

# Update scene settings
scene = bpy.context.scene
scene.frame_start = 0
scene.frame_end = FRAME_COUNT - 1
scene.frame_current = 0

print(f"✓ Turntable animation created for {PRODUCT_NAME}")
```

---

## Part 2: Lighting Setup

### For Shading Layer (3-Point Studio Lighting)

```python
import bpy

# Clear existing lights
for light in bpy.data.lights:
    bpy.data.lights.remove(light)

# Key Light (main light, front-left)
bpy.ops.object.light_add(type='AREA', location=(5, -5, 5))
key_light = bpy.context.object
key_light.data.energy = 500
key_light.data.size = 3
key_light.name = "Key_Light"

# Fill Light (softer, front-right)
bpy.ops.object.light_add(type='AREA', location=(-3, -4, 3))
fill_light = bpy.context.object
fill_light.data.energy = 250
fill_light.data.size = 4
fill_light.name = "Fill_Light"

# Rim Light (background highlight)
bpy.ops.object.light_add(type='AREA', location=(0, 5, 4))
rim_light = bpy.context.object
rim_light.data.energy = 300
rim_light.data.size = 2.5
rim_light.name = "Rim_Light"

print("✓ Studio lighting created")
```

---

## Part 3: Material Setup

### Shading Material (Neutral Gray with Detail)

```python
import bpy

def create_shading_material(product_name):
    # Create material
    mat = bpy.data.materials.new(name=f"{product_name}_Shading")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    
    # Clear default nodes
    nodes.clear()
    
    # Add Principled BSDF
    bsdf = nodes.new('ShaderNodeBsdfPrincipled')
    bsdf.location = (0, 0)
    bsdf.inputs['Base Color'].default_value = (0.5, 0.5, 0.5, 1)  # Neutral gray
    bsdf.inputs['Roughness'].default_value = 0.7  # Fabric-like
    
    # Add Material Output
    output = nodes.new('ShaderNodeOutputMaterial')
    output.location = (300, 0)
    
    # Link
    links.new(bsdf.outputs['BSDF'], output.inputs['Surface'])
    
    return mat

# Apply to product
product = bpy.data.objects["Hoodie"]  # Change for each product
mat = create_shading_material("Hoodie")
product.data.materials.clear()
product.data.materials.append(mat)

print("✓ Shading material created")
```

### Mask Material (Pure White Emission)

```python
import bpy

def create_mask_material(product_name):
    # Create material
    mat = bpy.data.materials.new(name=f"{product_name}_Mask")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    
    # Clear default nodes
    nodes.clear()
    
    # Add Emission shader
    emission = nodes.new('ShaderNodeEmission')
    emission.location = (0, 0)
    emission.inputs['Color'].default_value = (1, 1, 1, 1)  # Pure white
    emission.inputs['Strength'].default_value = 1.0
    
    # Add Material Output
    output = nodes.new('ShaderNodeOutputMaterial')
    output.location = (300, 0)
    
    # Link
    links.new(emission.outputs['Emission'], output.inputs['Surface'])
    
    return mat

# Apply to product
product = bpy.data.objects["Hoodie"]
mat = create_mask_material("Hoodie")
product.data.materials.clear()
product.data.materials.append(mat)

print("✓ Mask material created")
```

---

## Part 4: Render Settings

### Configure Render Properties

```python
import bpy

scene = bpy.context.scene

# Output settings
scene.render.resolution_x = 1024
scene.render.resolution_y = 1024
scene.render.resolution_percentage = 100

# Film settings (transparency)
scene.render.film_transparent = True

# Engine settings
scene.render.engine = 'CYCLES'  # or 'EEVEE' for faster renders
scene.cycles.samples = 128  # Lower for testing, 256+ for production

# Output format
scene.render.image_settings.file_format = 'PNG'
scene.render.image_settings.color_mode = 'RGBA'
scene.render.image_settings.compression = 15

print("✓ Render settings configured")
```

---

## Part 5: Automated Rendering Script

### Complete Render Script

Save this as `render_360.py` and run in Blender:

```python
import bpy
import os
import math

# ============ CONFIGURATION ============
PRODUCT_NAME = "Hoodie"  # Change for each product
OUTPUT_DIR = "C:/Users/trist/Mil Apparel/mill-apparel/public/360"
FRAME_COUNT = 36
ROTATION_DEGREES = 360
RENDER_SHADING = True
RENDER_MASK = True
# =======================================

def setup_turntable(obj):
    """Set up 360° rotation animation"""
    obj.animation_data_clear()
    obj.rotation_euler = (0, 0, 0)
    obj.keyframe_insert(data_path="rotation_euler", frame=0)
    obj.rotation_euler = (0, 0, math.radians(ROTATION_DEGREES))
    obj.keyframe_insert(data_path="rotation_euler", frame=FRAME_COUNT)
    
    for fcurve in obj.animation_data.action.fcurves:
        for keyframe in fcurve.keyframe_points:
            keyframe.interpolation = 'LINEAR'

def render_sequence(product_obj, layer_type, material):
    """Render frame sequence"""
    scene = bpy.context.scene
    scene.frame_start = 0
    scene.frame_end = FRAME_COUNT - 1
    
    # Apply material
    product_obj.data.materials.clear()
    product_obj.data.materials.append(material)
    
    # Set output path
    product_lower = PRODUCT_NAME.lower()
    output_path = os.path.join(OUTPUT_DIR, product_lower, layer_type)
    os.makedirs(output_path, exist_ok=True)
    
    # Render each frame
    for frame in range(FRAME_COUNT):
        scene.frame_set(frame)
        filename = f"frame_{str(frame).zfill(3)}.png"
        filepath = os.path.join(output_path, filename)
        scene.render.filepath = filepath
        bpy.ops.render.render(write_still=True)
        print(f"✓ Rendered {layer_type} frame {frame}/{FRAME_COUNT-1}")
    
    print(f"✓✓ {layer_type.upper()} sequence complete!")

# Main execution
print("=" * 50)
print(f"Starting 360° render for {PRODUCT_NAME}")
print("=" * 50)

product_obj = bpy.data.objects[PRODUCT_NAME]
setup_turntable(product_obj)

if RENDER_SHADING:
    # Create and apply shading material
    shading_mat = bpy.data.materials.get(f"{PRODUCT_NAME}_Shading")
    if not shading_mat:
        # Create if doesn't exist (use the function from Part 3)
        print("Creating shading material...")
    render_sequence(product_obj, "shading", shading_mat)

if RENDER_MASK:
    # Create and apply mask material
    mask_mat = bpy.data.materials.get(f"{PRODUCT_NAME}_Mask")
    if not mask_mat:
        print("Creating mask material...")
    render_sequence(product_obj, "mask", mask_mat)

print("=" * 50)
print(f"✓✓✓ ALL RENDERS COMPLETE FOR {PRODUCT_NAME}!")
print("=" * 50)
```

---

## Part 6: Post-Processing

### Convert PNG to WebP

Create `convert_to_webp.ps1` in the project root:

```powershell
# Convert all PNGs to WebP
$products = @("hoodie", "tshirt", "longsleeve", "tank")
$layers = @("shading", "mask")

foreach ($product in $products) {
    foreach ($layer in $layers) {
        $path = "public/360/$product/$layer"
        if (Test-Path $path) {
            Write-Host "Converting $product/$layer frames..."
            Get-ChildItem "$path/*.png" | ForEach-Object {
                $webpPath = $_.FullName -replace '\.png$', '.webp'
                & cwebp -q 85 $_.FullName -o $webpPath
                Remove-Item $_.FullName  # Delete PNG after conversion
            }
        }
    }
}

Write-Host "✓ All frames converted to WebP!"
```

Run: `.\convert_to_webp.ps1`

---

## Part 7: Quick Start Checklist

### For Each Product:

1. **Set up model** in Blender
2. **Apply shading material** and render sequence (36 frames)
3. **Apply mask material** and render sequence (36 frames)
4. **Convert to WebP** using the script
5. **Copy frame_000.webp** to `preview.webp`
6. **Test in browser** at http://localhost:3000/customize

### Repeat for:
- [ ] Hoodie
- [ ] T-Shirt
- [ ] Longsleeve
- [ ] Tank

---

## Troubleshooting

### Issue: Frames are too large (>200KB)
**Solution:** Reduce WebP quality: `cwebp -q 75` or lower resolution in Blender

### Issue: Lighting looks flat
**Solution:** Increase key light energy, adjust light positions

### Issue: Mask has shadows/gradients
**Solution:** Verify emission shader, disable all lighting for mask renders

### Issue: Animation doesn't rotate full 360°
**Solution:** Check keyframes are at frame 0 and frame 36, interpolation is LINEAR

---

## Time Estimates

- **Setup (first time):** 30-60 minutes
- **Per product (both sequences):** 20-40 minutes render time
- **Post-processing:** 5-10 minutes per product
- **Total for all 4 products:** 2-3 hours

---

## Next Steps After Rendering

Once you have the frames:

1. Place in `/public/360/{product}/shading/` and `/public/360/{product}/mask/`
2. Navigate to http://localhost:3000/customize
3. The system will automatically detect the new assets
4. Test color changes to verify compositing works
5. Test all 4 products and multiple colors

The "Legacy" badge should disappear, replaced with real-time color compositing! 🎉
