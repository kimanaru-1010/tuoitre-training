# Windows: nen thumbnail va tao anh chia se tam bang typography cua thuong hieu.
# Khong can cai them thu vien. Website da bao gom anh, khong can chay khi deploy.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$imageRoot = [IO.Path]::GetFullPath((Join-Path $projectRoot 'assets\images'))
$jpegCodec = [Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$jpegOptions = New-Object Drawing.Imaging.EncoderParameters(1)
$jpegOptions.Param[0] = New-Object Drawing.Imaging.EncoderParameter([Drawing.Imaging.Encoder]::Quality, [long]82)
foreach ($file in Get-ChildItem -LiteralPath $imageRoot -Filter '*.jpg' -File) {
    $targetPath = [IO.Path]::GetFullPath($file.FullName)
    if (-not $targetPath.StartsWith($imageRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Image is outside assets/images.' }
    $sourceStream = New-Object IO.MemoryStream(,[IO.File]::ReadAllBytes($targetPath))
    try { $sourceImage = [Drawing.Image]::FromStream($sourceStream) }
    catch { $sourceStream.Dispose(); Write-Output ($file.Name + ': kept original format (use Pillow to convert WebP).'); continue }
    $ratio = [Math]::Min(1, [Math]::Min(1100 / $sourceImage.Width, 750 / $sourceImage.Height))
    $picture = New-Object Drawing.Bitmap([int]($sourceImage.Width * $ratio), [int]($sourceImage.Height * $ratio))
    $canvas = [Drawing.Graphics]::FromImage($picture)
    $canvas.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $canvas.DrawImage($sourceImage, 0, 0, $picture.Width, $picture.Height)
    $outputStream = New-Object IO.MemoryStream
    $picture.Save($outputStream, $jpegCodec, $jpegOptions)
    [IO.File]::WriteAllBytes($targetPath, $outputStream.ToArray())
    $canvas.Dispose(); $picture.Dispose(); $sourceImage.Dispose(); $sourceStream.Dispose(); $outputStream.Dispose()
    Write-Output ($file.Name + ': ' + (Get-Item -LiteralPath $targetPath).Length + ' bytes')
}
$jpegOptions.Dispose()

$share = New-Object Drawing.Bitmap(1200, 630)
$shareCanvas = [Drawing.Graphics]::FromImage($share)
$shareCanvas.Clear([Drawing.Color]::White)
$shareCanvas.TextRenderingHint = [Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$brandRed = New-Object Drawing.SolidBrush([Drawing.ColorTranslator]::FromHtml('#d71920'))
$brandBlack = New-Object Drawing.SolidBrush([Drawing.ColorTranslator]::FromHtml('#191919'))
$brandGray = New-Object Drawing.SolidBrush([Drawing.ColorTranslator]::FromHtml('#616161'))
$shareCanvas.FillRectangle($brandRed, 0, 0, 1200, 10)
$wordmarkFont = New-Object Drawing.Font('Arial', 46, ([Drawing.FontStyle]::Bold -bor [Drawing.FontStyle]::Italic), [Drawing.GraphicsUnit]::Pixel)
$labelFont = New-Object Drawing.Font('Arial', 21, [Drawing.FontStyle]::Bold, [Drawing.GraphicsUnit]::Pixel)
$headlineFont = New-Object Drawing.Font('Arial', 54, [Drawing.FontStyle]::Bold, [Drawing.GraphicsUnit]::Pixel)
$subheadlineFont = New-Object Drawing.Font('Arial', 40, [Drawing.FontStyle]::Bold, [Drawing.GraphicsUnit]::Pixel)
# Unicode code points hoat dong ca tren Windows PowerShell 5.1.
$shareCanvas.DrawString("TU$([char]0x1ED4)I TR$([char]0x1EBA)", $wordmarkFont, $brandRed, 64, 55)
$shareCanvas.DrawString("TRUNG T$([char]0x00C2)M $([char]0x0110)$([char]0x00C0)O T$([char]0x1EA0)O", $labelFont, $brandBlack, 66, 125)
$line1 = "K$([char]0x1EBF)t n$([char]0x1ED1)i tri th$([char]0x1EE9)c"
$line2 = "b$([char]0x00E1)o ch$([char]0x00ED) hi$([char]0x1EC7)n $([char]0x0111)$([char]0x1EA1)i"
$line3 = "& n$([char]0x0103)ng l$([char]0x1EF1)c truy$([char]0x1EC1)n th$([char]0x00F4)ng th$([char]0x1EF1)c chi$([char]0x1EBF)n"
$shareCanvas.DrawString($line1, $headlineFont, $brandBlack, 62, 215)
$shareCanvas.DrawString($line2, $headlineFont, $brandBlack, 62, 282)
$shareCanvas.DrawString($line3, $subheadlineFont, $brandRed, 64, 378)
$shareCanvas.FillRectangle($brandRed, 66, 497, 80, 5)
$shareCanvas.DrawString("B$([char]0x00C1)O TU$([char]0x1ED4)I TR$([char]0x1EBA)", $labelFont, $brandGray, 66, 535)
$share.Save((Join-Path $imageRoot 'social-preview.png'), [Drawing.Imaging.ImageFormat]::Png)
$shareCanvas.Dispose(); $share.Dispose(); $brandRed.Dispose(); $brandBlack.Dispose(); $brandGray.Dispose()
$wordmarkFont.Dispose(); $labelFont.Dispose(); $headlineFont.Dispose(); $subheadlineFont.Dispose()
Write-Output 'Created social-preview.png (1200 x 630).'
