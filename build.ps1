#
# Advanced Build Script for Zwift Analyzer Extension
# Builds optimized extension from src to dist
#

param(
    [Parameter()]
    [ValidateSet("development", "production")]
    [string]$BuildType = "production"
)

Write-Output "Building Zwift Analyzer Extension..."
Write-Output "Build Type: $BuildType"
Write-Output ""

# Clean and create dist directory
if (Test-Path -Path "./dist") {
    Remove-Item -Path "./dist" -Recurse -Force
    Write-Output "Cleaned existing dist directory"
}
New-Item -ItemType Directory -Path "./dist" | Out-Null

# Copy static files
Write-Output "Copying static files..."
$staticFiles = @("manifest.json", "popup.html", "popup.css")
foreach ($file in $staticFiles) {
    if (Test-Path -Path "./src/$file") {
        Copy-Item "./src/$file" "./dist/$file" -Force
        Write-Output "- Copied $file"
    }
}

# Copy images directory
if (Test-Path -Path "./src/images") {
    Copy-Item "./src/images" "./dist/images" -Recurse -Force
    Write-Output "- Copied images directory"
}

# Configure terser options based on build type
if ($BuildType -eq "production") {
    $terserOptions = "-m -c drop_console=true,dead_code=true,keep_fnames=false,keep_classnames=false"
    Write-Output ""
    Write-Output "Production build: Optimizing for size and performance"
} else {
    $terserOptions = "-m -c drop_console=false,dead_code=false,keep_fnames=true,keep_classnames=true"
    Write-Output ""
    Write-Output "Development build: Preserving debug information"
}

# Minify JavaScript files
Write-Output ""
Write-Output "Processing JavaScript files..."
$totalSizeIn = 0
$totalSizeOut = 0

# Files to exclude from minification (preserve licenses)
$excludeFromMinification = @("echarts.js", "ecStat.js")

Get-ChildItem "./src" -Filter "*.js" | ForEach-Object {
    $in_file = "./src/" + $_.Name
    $out_file = "./dist/" + $_.Name
    
    Write-Output "Processing $($_.Name)..."
    
    # Check if this file should be excluded from minification
    if ($excludeFromMinification -contains $_.Name) {
        # Just copy the file without minification to preserve licenses
        Copy-Item $in_file $out_file -Force
        Write-Output "  COPIED (preserving license) $($_.Name)"
    } else {
        # Execute terser command for minification
        $cmd = "terser `"$in_file`" $terserOptions --timings --output `"$out_file`""
        Invoke-Expression $cmd
    }
    
    if ($LASTEXITCODE -eq 0 -or $excludeFromMinification -contains $_.Name) {
        $file_size_in = (Get-Item $in_file).length
        $file_size_out = (Get-Item $out_file).length
        
        if ($file_size_in -gt 0) {
            $compression_ratio = [math]::Round((1 - ($file_size_out / $file_size_in)) * 100, 1)
        } else {
            $compression_ratio = 0
        }
        
        $totalSizeIn += $file_size_in
        $totalSizeOut += $file_size_out

        if ($excludeFromMinification -contains $_.Name) {
            Write-Output "  OK $file_size_in -> $file_size_out bytes (license preserved)"
        } else {
            Write-Output "  OK $file_size_in -> $file_size_out bytes ($compression_ratio% smaller)"
        }
    } else {
        Write-Output "  ERROR processing $($_.Name)"
        exit 1
    }
}

# Summary
if ($totalSizeIn -gt 0) {
    $totalCompressionRatio = [math]::Round((1 - ($totalSizeOut / $totalSizeIn)) * 100, 1)
} else {
    $totalCompressionRatio = 0
}

Write-Output ""
Write-Output "Build Summary:"
Write-Output "- Total input size:  $([math]::Round($totalSizeIn / 1024, 1)) KB"
Write-Output "- Total output size: $([math]::Round($totalSizeOut / 1024, 1)) KB"
Write-Output "- Total compression: $totalCompressionRatio%"
Write-Output ""
Write-Output "Build complete! Extension ready in ./dist folder"
Write-Output "  Load ./dist in Chrome Developer Mode to test the extension"