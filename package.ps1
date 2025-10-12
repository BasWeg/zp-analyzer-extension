#
# Package Script - Creates a ZIP file for Chrome Web Store
# Automatically reads version from manifest.json
#

param(
    [string]$Version = ""  # Optional override, will use manifest version if not provided
)

# Read version from manifest.json if not provided
if ([string]::IsNullOrEmpty($Version)) {
    if (Test-Path -Path "./src/manifest.json") {
        try {
            $manifest = Get-Content "./src/manifest.json" | ConvertFrom-Json
            $Version = $manifest.version
            Write-Output "Using version from manifest.json: $Version"
        } catch {
            Write-Output "Error reading manifest.json: $($_.Exception.Message)"
            Write-Output "Please provide version as parameter: -Version '1.0.0'"
            exit 1
        }
    } else {
        Write-Output "manifest.json not found in ./src/ directory"
        Write-Output "Please provide version as parameter: -Version '1.0.0'"
        exit 1
    }
}

Write-Output "Packaging Zwift Analyzer Extension v$Version..."
Write-Output ""

# Ensure we have a built extension
if (!(Test-Path -Path "./dist")) {
    Write-Output "No dist folder found. Running production build first..."
    & .\build-simple.ps1
    Write-Output ""
}

# Create package directory
$packageDir = "./package"
if (Test-Path -Path $packageDir) {
    Remove-Item -Path $packageDir -Recurse -Force
}
New-Item -ItemType Directory -Path $packageDir | Out-Null

# Create ZIP file name
$zipName = "zwift-analyzer-v$Version.zip"
$zipPath = "$packageDir/$zipName"

# Create ZIP file
Write-Output "Creating package: $zipName"

try {
    # Create a new ZIP file with standard compression
    $zipStream = [System.IO.File]::Create((Join-Path (Get-Location) $zipPath))
    $archive = [System.IO.Compression.ZipArchive]::new($zipStream, [System.IO.Compression.ZipArchiveMode]::Create)
    
    # Get all files from dist directory
    $distPath = Resolve-Path "./dist"
    $files = Get-ChildItem -Path $distPath -Recurse -File
    
    foreach ($file in $files) {
        # Calculate relative path for ZIP entry
        $relativePath = $file.FullName.Substring($distPath.Path.Length + 1)
        $relativePath = $relativePath.Replace('\', '/')  # Use forward slashes for ZIP standard
        
        Write-Output "Adding: $relativePath"
        
        # Create ZIP entry with standard deflate compression
        $entry = $archive.CreateEntry($relativePath, [System.IO.Compression.CompressionLevel]::Optimal)
        
        # Copy file content to ZIP entry
        $entryStream = $entry.Open()
        $fileStream = [System.IO.File]::OpenRead($file.FullName)
        $fileStream.CopyTo($entryStream)
        $fileStream.Close()
        $entryStream.Close()
    }
    
    # Close archive and stream
    $archive.Dispose()
    $zipStream.Close()
    
    Write-Output "ZIP created using standard .NET compression"
    
} catch {
    Write-Output "Error creating ZIP: $($_.Exception.Message)"
    exit 1
}

# Get file size
$zipSize = [math]::Round((Get-Item $zipPath).length / 1024, 1)

Write-Output ""
Write-Output "Package created successfully!"
Write-Output "- File: $zipPath"
Write-Output "- Size: $zipSize KB"
Write-Output ""
Write-Output "Ready for Chrome Web Store upload!"