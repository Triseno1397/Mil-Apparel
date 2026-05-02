# Create preview.webp fallback images
# Copies frame_000.webp as preview.webp for each product

Write-Host "=" * 60
Write-Host "Creating Preview Fallback Images"
Write-Host "=" * 60

$products = @("hoodie", "tshirt", "longsleeve", "tank")
$created = 0
$failed = 0

foreach ($product in $products) {
    $sourcePath = "public/360/$product/shading/frame_000.webp"
    $destPath = "public/360/$product/preview.webp"
    
    if (Test-Path $sourcePath) {
        try {
            Copy-Item $sourcePath $destPath -Force
            Write-Host "✅ Created: $product/preview.webp" -ForegroundColor Green
            $created++
        }
        catch {
            Write-Host "❌ Failed: $product/preview.webp - $_" -ForegroundColor Red
            $failed++
        }
    }
    else {
        Write-Host "⚠️  Source not found: $sourcePath" -ForegroundColor Yellow
        $failed++
    }
}

Write-Host "`n" + "=" * 60
Write-Host "Preview images created: $created" -ForegroundColor Cyan
Write-Host "Failed: $failed" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "Gray" })
Write-Host "=" * 60

if ($created -eq 4) {
    Write-Host "`n🎉 All preview images ready!" -ForegroundColor Green
    Write-Host "💡 Next step: Test in browser at http://localhost:3000/customize"
}
