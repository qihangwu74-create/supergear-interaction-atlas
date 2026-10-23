$ErrorActionPreference='Stop'
$taskRoot=Split-Path $PSScriptRoot -Parent
$bundleRoot=Join-Path $taskRoot 'model-work/portable-kit'
New-Item -ItemType Directory -Path (Join-Path $bundleRoot 'dist'),(Join-Path $bundleRoot 'scripts') -Force | Out-Null
Copy-Item -LiteralPath (Join-Path $taskRoot 'dist/road-glide') -Destination (Join-Path $bundleRoot 'dist') -Recurse -Force
Copy-Item -LiteralPath (Join-Path $taskRoot 'dist/studio') -Destination (Join-Path $bundleRoot 'dist') -Recurse -Force
Copy-Item -LiteralPath (Join-Path $taskRoot 'dist/studio.html') -Destination (Join-Path $bundleRoot 'dist/studio.html') -Force
Copy-Item -LiteralPath (Join-Path $taskRoot 'scripts/serve-road.cjs') -Destination (Join-Path $bundleRoot 'scripts/serve-road.cjs') -Force
Copy-Item -LiteralPath (Join-Path $taskRoot 'dist/qa-industrial.html'),(Join-Path $taskRoot 'dist/qa-industrial.js'),(Join-Path $taskRoot 'dist/qa-industrial-mobile.html') -Destination (Join-Path $bundleRoot 'dist') -Force
Copy-Item -LiteralPath (Join-Path $taskRoot 'dist/qa-narrative.html'),(Join-Path $taskRoot 'dist/qa-narrative.js') -Destination (Join-Path $bundleRoot 'dist') -Force
@'
启动方法：先安装 Node.js LTS，再在本目录打开终端，运行 node scripts/serve-road.cjs
浏览器打开 http://127.0.0.1:4173/studio.html
三维入口 http://127.0.0.1:4173/road-glide/
六章引导叙事 + 11 种工业工具 http://127.0.0.1:4173/road-glide/industrial.html
人工任务验证 http://127.0.0.1:4173/road-glide/study.html
叙事回归 http://127.0.0.1:4173/qa-narrative.html
浏览器回归 http://127.0.0.1:4173/qa-industrial.html
请保留目录结构。使用 HTTP 服务，不保证直接双击 HTML 可运行。
模型与第三方依赖许可见各目录；原始制作源文件未包含。
完整素材库返回链接仅在完整 GitHub 仓库中存在。
'@ | Set-Content -LiteralPath (Join-Path $bundleRoot 'START-HERE.txt') -Encoding utf8
Compress-Archive -Path (Join-Path $bundleRoot '*') -DestinationPath (Join-Path $taskRoot 'dist/road-glide-kit.zip') -Force
Get-Item -LiteralPath (Join-Path $taskRoot 'dist/road-glide-kit.zip') | Select-Object Name,Length
