# PowerShell script to set up all missing 360-frame assets
# This creates complete frame sets for all product types and colors

$frameCount = 36
$baseDir = "public\360-frames"

# Define all product/color combinations needed
$configs = @(
    @{product = 'tshirt'; color = 'white'; source = 'C:\Users\trist\.gemini\antigravity\brain\deca3a25-6ae9-4a07-88fe-63e5d4221569\white_tshirt_hero_1768101669073.png' },
    @{product = 'tshirt'; color = 'black'; source = 'C:\Users\trist\.gemini\antigravity\brain\deca3a25-6ae9-4a07-88fe-63e5d4221569\black_tshirt_hero_1768101732558.png' },
    @{product = 'longsleeve'; color = 'white'; source = 'C:\Users\trist\.gemini\antigravity\brain\deca3a25-6ae9-4a07-88fe-63e5d4221569\white_longsleeve_hero_1768101681786.png' },
    @{product = 'longsleeve'; color = 'black'; source = 'C:\Users\trist\.gemini\antigravity\brain\deca3a25-6ae9-4a07-88fe-63e5d4221569\black_longsleeve_hero_1768101744893.png' },
    @{product = 'tank'; color = 'white'; source = 'C:\Users\trist\.gemini\antigravity\brain\deca3a25-6ae9-4a07-88fe-63e5d4221569\white_tank_hero_1768101695276.png' },
    @{product = 'tank'; color = 'black'; source = 'C:\Users\trist\.gemini\antigravity\brain\deca3a25-6ae9-4a07-88fe-63e5d4221569\black_tank_hero_1768101757267.png' },
    @{product = 'hoodie'; color = 'black'; source = 'C:\Users\trist\.gemini\antigravity\brain\deca3a25-6ae9-4a07-88fe-63e5d4221569\black_hoodie_hero_1768101708460.png' }
)

Write-Host "Setting up 360-frame assets..." -ForegroundColor Cyan
Write-Host ""

foreach ($config in $configs) {
    $product = $config.product
    $color = $config.color
    $sourcePath = $config.source
    
    $targetDir = "$baseDir\$product\$color"
    
    # Create directory if it doesn't exist
    if (!(Test-Path $targetDir)) {
        New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
        Write-Host "Created directory: $targetDir" -ForegroundColor Green
    }
    
    # Check if source file exists
    if (!(Test-Path $sourcePath)) {
        Write-Host "Source file not found: $sourcePath" -ForegroundColor Red
        continue
    }
    
    Write-Host "Processing $product/$color..." -ForegroundColor Yellow
    
    # Create all 36 frames (frame_000.png to frame_035.png)
    for ($i = 0; $i -lt $frameCount; $i++) {
        $frameName = "frame_{0:D3}.png" -f $i
        $destPath = "$targetDir\$frameName"
        
        Copy-Item $sourcePath -Destination $destPath -Force
        
        if ($i % 9 -eq 0) {
            Write-Host "  Created frames 0-$i..." -ForegroundColor Gray
        }
    }
    
    Write-Host "  Created $frameCount frames for $product/$color" -ForegroundColor Green
    Write-Host ""
}

Write-Host "Frame setup complete!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Summary of available products:" -ForegroundColor Cyan
Write-Host "  Hoodie: white (existing), black (new)" -ForegroundColor White
Write-Host "  T-Shirt: white, black" -ForegroundColor White
Write-Host "  Long Sleeve: white, black" -ForegroundColor White
Write-Host "  Tank: white, black" -ForegroundColor White
Write-Host ""
Write-Host "Note: These are placeholder frames (duplicates)." -ForegroundColor Yellow
Write-Host "Replace with real 360 renders for rotation effect." -ForegroundColor Yellow
