# Quick Start Guide - 360° Asset Creation

## 🚀 Ready to Create Your Assets?

Follow these steps to create production-ready 360° turntable frames.

---

## Step 1: Install Software ⚙️

### Blender
```
Download: https://www.blender.org/download/
Version: 3.6 or later
```

### WebP Converter (cwebp)
```
Download: https://developers.google.com/speed/webp/download
Add to PATH or place cwebp.exe in project root
```

**Verify installation:**
```powershell
blender --version
cwebp -version
```

---

## Step 2: Open Blender Guide 📖

Open the comprehensive guide:
```
docs/BLENDER_360_GUIDE.md
```

This contains:
- Complete setup instructions
- Python automation scripts
- Material setup
- Lighting configuration
- Rendering workflow

---

## Step 3: Create Your First Product (Hoodie) 🎨

### 3a. Set Up Blender Project

1. Open Blender
2. Delete default objects (A → X → Delete)
3. Import or create hoodie model
4. Save as `mil-apparel-360.blend`

### 3b. Run Setup Scripts

Copy and run each Python script from the Blender guide:

1. **Turntable Animation** (Part 4)
2. **Studio Lighting** (Part 2)
3. **Shading Material** (Part 3)
4. **Mask Material** (Part 3)

### 3c. Test Render

```python
# In Blender, set frame to 0
bpy.context.scene.frame_current = 0

# Test render shading layer
bpy.ops.render.render(write_still=True)
```

Verify the render looks like the reference images in the implementation plan.

### 3d. Render Full Sequence

Run the automated render script (Part 5):

```python
PRODUCT_NAME = "Hoodie"
RENDER_SHADING = True
RENDER_MASK = True

# Run the full script...
```

**⏱️ Expected time:** 20-40 minutes

---

## Step 4: Post-Process Frames 🔄

### 4a. Convert PNG → WebP

```powershell
cd mill-apparel
.\scripts\convert_to_webp.ps1
```

### 4b. Create Preview Images

```powershell
.\scripts\create_previews.ps1
```

---

## Step 5: Test in Browser 🌐

1. **Start dev server** (if not running):
   ```powershell
   npm run dev
   ```

2. **Navigate to customizer**:
   ```
   http://localhost:3000/customize
   ```

3. **Verify new system activated**:
   - Check dev counter (bottom-left)
   - Should show: `Frame X/36 | Shading: Y | Mask: Z`
   - Should NOT show: "Legacy" badge

4. **Test color changes**:
   - Switch between white and black
   - Verify lighting is preserved
   - Colors should apply realistically

5. **Test rotation**:
   - Drag to rotate
   - Should be smooth with all 36 frames

---

## Step 6: Repeat for Other Products 🔁

Once hoodie works, repeat Steps 3-5 for:

- [ ] T-Shirt (change `PRODUCT_NAME = "TShirt"`)
- [ ] Longsleeve (change `PRODUCT_NAME = "Longsleeve"`)
- [ ] Tank (change `PRODUCT_NAME = "Tank"`)

---

## 🆘 Need Help?

### Quick Troubleshooting

**Renders are too dark:**
```python
# Increase light energy
key_light.data.energy = 800  # Default was 500
```

**Mask has shadows:**
```python
# Verify emission shader, disable all lights
```

**File sizes too large:**
```powershell
# Reduce WebP quality
cwebp -q 75 input.png -o output.webp
```

**Animation doesn't rotate 360°:**
```python
# Check keyframes and interpolation
for fcurve in obj.animation_data.action.fcurves:
    for keyframe in fcurve.keyframe_points:
        keyframe.interpolation = 'LINEAR'
```

### Full Documentation

- **Complete Guide**: `docs/BLENDER_360_GUIDE.md`
- **Implementation Plan**: Review artifact in conversation
- **Visual References**: Check implementation plan for example images

---

## ✅ Success Checklist

Before moving on, verify:

- [ ] All 36 shading frames rendered
- [ ] All 36 mask frames rendered
- [ ] Frames converted to WebP (< 200KB each)
- [ ] Preview.webp created
- [ ] Files in correct directory (`/public/360/{product}/{layer}/`)
- [ ] Browser shows compositing system (not "Legacy")
- [ ] Color changes work with preserved lighting
- [ ] Rotation is smooth across all frames

---

## ⏱️ Time Budget

| Task | Estimated Time |
|------|----------------|
| First-time setup | 30-60 min |
| Hoodie (learning) | 40-60 min |
| TShirt | 20-30 min |
| Longsleeve | 20-30 min |
| Tank | 20-30 min |
| **Total** | **2.5-3.5 hours** |

---

## 🎯 Expected Result

After completion, you'll have:

✅ **288 production-ready frames** (4 products × 2 layers × 36 frames)
✅ **Unlimited color support** via runtime compositing
✅ **Realistic lighting** preserved from shading layer
✅ **Smooth 360° rotation** in the customizer
✅ **Fast loading** with optimized WebP files
✅ **Professional product viewer** ready for production

---

**Ready? Start with Step 1! 🚀**
