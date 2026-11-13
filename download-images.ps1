# Downloads the photos, logos and certificates from the current WordPress site
# into this website's assets folder. Run ONCE, BEFORE you switch off WordPress.
#
# Windows: right-click this file > "Run with PowerShell"
#   (or open PowerShell in this folder and run:  powershell -ExecutionPolicy Bypass -File .\download-images.ps1)

$base = "https://avion.com.ng/wp-content/uploads"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$img  = Join-Path $here "assets\img"
$vid  = Join-Path $here "assets\video"
New-Item -ItemType Directory -Force -Path $img, $vid | Out-Null

$files = @{
  "avion-logo.png"                     = "2022/11/cropped-Avion-Logo.png"
  "hero-team.jpg"                      = "2025/07/Tech-team-e1752156325779.jpg"
  "team-meeting.jpg"                   = "2025/07/WhatsApp-Image-2025-07-03-at-12.46.33-PM-e1751543424645.jpeg"
  "cta-background.jpg"                 = "2025/07/pexels-leeloothefirst-7873574-scaled-e1752747318562.jpg"
  "service-project-management.jpg"     = "2025/07/Tech-team-e1752156325779.jpg"
  "service-ict.jpg"                    = "2025/07/pexels-cytonn-955405-scaled.jpg"
  "service-education.jpg"              = "2025/07/pexels-roman-odintsov-11025060-scaled.jpg"
  "service-business-consulting.jpg"    = "2025/07/WhatsApp-Image-2025-07-03-at-12.46.33-PM-e1751543424645.jpeg"
  "service-monitoring-evaluation.jpg"  = "2025/07/pexels-asphotograpy-95916-scaled.jpg"
  "service-construction.jpg"           = "2025/07/WhatsApp-Image-2025-07-03-at-12.53.35-PM-e1751543730817.jpeg"
  "feature-it-consulting.jpg"          = "2022/12/x-IgUR1iX0mqM-unsplash-1.jpg"
  "feature-construction.jpg"           = "2022/12/bruce-mars-GzumspFznSE-unsplash-1.jpg"
  "partner-nepc.png"                   = "2023/02/logo-NEPC-left-res2-1.png"
  "partner-tetfund.png"                = "2025/07/tetfund.png"
  "partner-nbrri.png"                  = "2025/07/nbrri.png"
  "partner-smedan.png"                 = "2025/07/Small-Medium-Enterprises-Development-Agency-of-Nigeria-SMEDAN.png"
  "partner-pole-global-marketing.jpg"  = "2025/07/IMG-20250709-WA0245.jpg"
  "partner-oak-homes.png"              = "2023/02/download-1.png"
  "partner-rocklane.jpeg"              = "2023/02/WhatsApp-Image-2023-01-30-at-9.27.35-AM.jpeg"
  "cert-firs-tcc.jpg"                  = "2025/07/tinywow_AVION-Certifications_82410601_1.jpg"
  "cert-nitda.jpg"                     = "2025/07/tinywow_AVION-Certifications_82410601_2.jpg"
  "cert-pencom.jpg"                    = "2025/07/tinywow_AVION-Certifications_82410601_3.jpg"
  "cert-itf.jpg"                       = "2025/07/tinywow_AVION-Certifications_82410601_4-e1752676208759-1024x724.jpg"
  "cert-nsitf.jpg"                     = "2025/07/tinywow_AVION-Certifications_82410601_5.jpg"
  "cert-bpp.jpg"                       = "2025/07/tinywow_AVION-Certifications_82410601_6-e1752674482794-1024x724.jpg"
  "cert-globe-motors.jpg"              = "2025/07/tinywow_AVION-Certifications_82410601_7.jpg"
  "cert-scuml.jpg"                     = "2025/07/tinywow_AVION-Certifications_82410601_8-e1752673783888-1024x711.jpg"
  "cert-ndpc.jpg"                      = "2025/07/tinywow_AVION-Certifications_82410601_9-e1752673645402-1024x724.jpg"
  "cert-cpn.jpg"                       = "2025/07/tinywow_AVION-Certifications_82410601_10.jpg"
}

foreach ($name in $files.Keys) {
  $dest = Join-Path $img $name
  # Never overwrite: the certificate images in assets\img have had sensitive details blurred
  if (Test-Path $dest) { Write-Host "SKIP $name (already exists)"; continue }
  try {
    Invoke-WebRequest -Uri "$base/$($files[$name])" -OutFile $dest -UseBasicParsing
    Write-Host "OK   $name"
  } catch { Write-Host "FAIL $name  ($($files[$name]))" -ForegroundColor Red }
}

try {
  Invoke-WebRequest -Uri "$base/2025/07/WhatsApp-Video-2025-07-17-at-11.31.03-AM.mp4" -OutFile (Join-Path $vid "avion-at-work.mp4") -UseBasicParsing
  Write-Host "OK   avion-at-work.mp4"
} catch { Write-Host "FAIL avion-at-work.mp4" -ForegroundColor Red }

Write-Host "`nDone. Check assets\img and assets\video, then upload the whole folder to your host."
