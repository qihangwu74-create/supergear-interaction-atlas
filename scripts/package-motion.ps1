$ErrorActionPreference='Stop'
$motionRoot=Split-Path -Parent $PSScriptRoot
$motionDist=Join-Path $motionRoot 'dist'
$motionZip=Join-Path $motionDist 'motion-kit.zip'
Add-Type -AssemblyName System.IO.Compression
$motionStream=[IO.File]::Open($motionZip,[IO.FileMode]::Create)
$motionArchive=[IO.Compression.ZipArchive]::new($motionStream,[IO.Compression.ZipArchiveMode]::Create)
try {
 $motionFiles=@('motion-lab.html','vendor/three-0.160.0.min.js','vendor/THREE-LICENSE.txt')
 $motionFiles+=@(Get-ChildItem -LiteralPath (Join-Path $motionDist 'motion') -File | ForEach-Object { 'motion/'+$_.Name })
 foreach($motionRelative in $motionFiles){
  $motionEntry=$motionArchive.CreateEntry($motionRelative,[IO.Compression.CompressionLevel]::Optimal)
  $motionDest=$motionEntry.Open()
  $motionBytes=[IO.File]::ReadAllBytes((Join-Path $motionDist $motionRelative))
  $motionDest.Write($motionBytes,0,$motionBytes.Length)
  $motionDest.Dispose()
 }
} finally { $motionArchive.Dispose();$motionStream.Dispose() }
$motionRead=[IO.Compression.ZipFile]::OpenRead($motionZip)
try { foreach($motionEntry in $motionRead.Entries){
 $motionLocal=[IO.File]::ReadAllBytes((Join-Path $motionDist $motionEntry.FullName))
 $motionMem=[IO.MemoryStream]::new();$motionInput=$motionEntry.Open();$motionInput.CopyTo($motionMem);$motionInput.Dispose()
 if([Convert]::ToBase64String($motionMem.ToArray()) -ne [Convert]::ToBase64String($motionLocal)){throw "Mismatch: $($motionEntry.FullName)"}
 $motionMem.Dispose()
}; Write-Output ("ZIP verified: "+$motionRead.Entries.Count+" entries") } finally {$motionRead.Dispose()}
Get-Item -LiteralPath $motionZip | Select-Object Name,Length
