# 360 Asset Directory

This directory contains frame sequences for the production 360 product viewer.

## Structure

```
360/
├── {productType}/
│   ├── shading/          # Lighting and fabric detail frames
│   │   ├── frame_000.webp
│   │   ├── frame_001.webp
│   │   └── ... (frame_035.webp)
│   ├── mask/             # Color-tintable mask frames
│   │   ├── frame_000.webp
│   │   ├── frame_001.webp
│   │   └── ... (frame_035.webp)
│   └── preview.webp      # Fallback static image
```

## Product Types

- `hoodie`
- `tshirt`
- `longsleeve`
- `tank`

## Asset Creation

See `/docs/360-asset-guide.md` for detailed instructions on creating frame sequences using Blender.

## Fallback Behavior

The viewer automatically falls back through three tiers:

1. **Shading + Mask Compositing** (preferred) - Requires both `shading/` and `mask/` folders
2. **Legacy Color Folders** - Uses `/360-frames/{productType}/{color}/`  
3. **Static Preview** - Uses `preview.webp` as last resort

## Current Status

⚠️ **Assets needed**: This directory currently contains empty placeholder folders. Real frame sequences must be created using 3D rendering software.

To enable the new compositing system, populate the `shading/` and `mask/` directories with 36 frames each.

Until then, the viewer will fall back to the legacy `/360-frames/` structure.
