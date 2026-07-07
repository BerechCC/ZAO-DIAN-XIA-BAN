$ErrorActionPreference = "SilentlyContinue"

$project = Split-Path -Parent $MyInvocation.MyCommand.Path
$pidFile = Join-Path $project "server.pid"

if (Test-Path -LiteralPath $pidFile) {
  $serverPid = Get-Content -LiteralPath $pidFile -Raw
  Stop-Process -Id ([int]$serverPid) -Force
  Remove-Item -LiteralPath $pidFile -Force
}

$connections = Get-NetTCPConnection -LocalPort 8019 -State Listen -ErrorAction SilentlyContinue
foreach ($connection in $connections) {
  Stop-Process -Id $connection.OwningProcess -Force
}

Write-Host "本地工作台服务已停止。"
