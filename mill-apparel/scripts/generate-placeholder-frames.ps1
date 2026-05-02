# PowerShell script to create placeholder frames by duplicating hero frame
# This is a temporary solution until Blender renders are ready

$products = @('hoodie', 'tshirt')
$colors = @('white')
$frameCount = 36

foreach ($product in $products) {
    foreach ($color in $colors) {
        $dir = "public\360-frames\$product\$color"
        $heroFrame = "$dir\frame_000.png"
        
        if (Test-Path $heroFrame) {
            Write-Host "Creating placeholder frames for $product/$color..."
            for ($i = 1; $i -lt $frameCount; $i++) {
                $frameName = "frame_{0:D3}.png" -f $i
                $destPath = "$dir\$frameName"
                Copy-Item $heroFrame -Destination $destPath -Force
                Write-Host "  Created $frameName"
            }
            Write-Host "Created $frameCount frames for $product/$color`n"
        } else {
            Write-Host "Hero frame not found for $product/$color - skipping`n"
        }
    }
}

Write-Host "`nPlaceholder frame generation complete!"
Write-Host "Note: These are temporary placeholders. Replace with Blender-rendered frames for rotation effect."
