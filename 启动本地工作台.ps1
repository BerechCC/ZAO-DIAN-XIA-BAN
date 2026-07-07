$ErrorActionPreference = "Stop"

$project = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 8019
$url = "http://127.0.0.1:$port"
$busy = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue

if (-not $busy) {
  $env:HTTP_PROXY = ""
  $env:HTTPS_PROXY = ""
  $env:ALL_PROXY = ""

  $npm = (Get-Command npm.cmd -ErrorAction SilentlyContinue).Source
  if (-not $npm) {
    $npm = (Get-Command npm -ErrorAction Stop).Source
  }

  if (-not (Test-Path -LiteralPath (Join-Path $project "node_modules"))) {
    Push-Location $project
    try {
      & $npm install --registry=https://registry.npmmirror.com
    } finally {
      Pop-Location
    }
  }

  Push-Location $project
  try {
    & (Get-Command node).Source "scripts\generate-library-index.cjs"
    & $npm run build
  } finally {
    Pop-Location
  }

  $node = (Get-Command node).Source
  $proc = Start-Process -FilePath $node -ArgumentList "local-server.cjs" -WorkingDirectory $project -WindowStyle Hidden -PassThru
  $proc.Id | Set-Content -LiteralPath (Join-Path $project "server.pid") -Encoding ASCII
  Start-Sleep -Seconds 2
}

Start-Process $url
Write-Host "不想加班工作宝：http://127.0.0.1:$port"
