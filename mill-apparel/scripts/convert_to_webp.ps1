# 360° Frame Conversion - PNG to WebP
# Run this after Blender renders all PNG frames

Write-Host "=" * 60
Write-Host "Converting 360° Frames: PNG → WebP"
Write-Host "=" * 60

$products = @("hoodie", "tshirt", "longsleeve", "tank")
$layers = @("shading", "mask")
$totalConverted = 0
$totalSkipped = 0

foreach ($product in $products) {
    foreach ($layer in $layers) {
        $path = "public/360/$product/$layer"
        
        if (Test-Path $path) {
            Write-Host "`n📁 Processing: $product/$layer" -ForegroundColor Cyan
            
            $pngFiles = Get-ChildItem "$path/*.png" -ErrorAction SilentlyContinue
            
            if ($pngFiles.Count -eq 0) {
                Write-Host "   ⏭️  No PNG files found, skipping..." -ForegroundColor Yellow
                $totalSkipped++
                continue
            }
            
            $count = 0
            foreach ($file in $pngFiles) {
                $webpPath = $file.FullName -replace '\.png$', '.webp'
                
                # Convert to WebP (85% quality)
                & cwebp -q 85 $file.FullName -o $webpPath 2>&1 | Out-Null
                
                if ($LASTEXITCODE -eq 0) {
                    # Delete original PNG
                    Remove-Item $file.FullName
                    $count++
                    $totalConverted++
                }
                else {
                    Write-Host "   ❌ Failed to convert: $($file.Name)" -ForegroundColor Red
                }
            }
            
            Write-Host "   ✅ Converted $count frames" -ForegroundColor Green
        }
        else {
            Write-Host "`n⚠️  Path not found: $path" -ForegroundColor Yellow
            $totalSkipped++
        }
    }
}

Write-Host "`n" + "=" * 60
Write-Host "✅ Conversion complete!" -ForegroundColor Green
Write-Host "   Total frames converted: $totalConverted" -ForegroundColor Cyan
Write-Host "   Paths skipped: $totalSkipped" -ForegroundColor Yellow
Write-Host "=" * 60
Write-Host "`n💡 Next step: Create preview images with create_previews.ps1"
