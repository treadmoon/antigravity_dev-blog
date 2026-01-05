#!/usr/bin/env pwsh
#!/usr/bin/env pwsh
# scripts\make_ppt.ps1
# 在仓库根目录运行：powershell -ExecutionPolicy Bypass -File .\scripts\make_ppt.ps1

param(
  [string]$VenvPath = ".venv",
  [string]$Requirements = "requirements.txt",
  [string]$Generator = "scripts\generate_ppt.py",
  [string]$Author = "",
  [string]$Company = "",
  [string]$Output = "docs/project_presentation.pptx"
)

try {
  $ErrorActionPreference = "Stop"

  if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "Python not found; please install Python." -ForegroundColor Red
    exit 1
  }

  if (-not (Test-Path $VenvPath)) {
    python -m venv $VenvPath
  }

  Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force

  $venvPython = Join-Path $VenvPath "Scripts\python.exe"
  if (Test-Path $venvPython) {
    & $venvPython -m pip install --upgrade pip
    if (Test-Path $Requirements) {
      & $venvPython -m pip install -r $Requirements
    } else {
      & $venvPython -m pip install python-pptx
    }
  } else {
    Write-Host "Virtual env python not found, falling back to system python" -ForegroundColor Yellow
    python -m pip install --upgrade pip
    if (Test-Path $Requirements) {
      python -m pip install -r $Requirements
    } else {
      python -m pip install python-pptx
    }
  }

  if (-not (Test-Path "docs")) { New-Item -ItemType Directory -Path "docs" | Out-Null }

  $args = @()
  if ($Output) { $args += "--output"; $args += $Output }
  if ($Author) { $args += "--author"; $args += $Author }
  if ($Company) { $args += "--company"; $args += $Company }

  if (Test-Path $venvPython) {
    & $venvPython $Generator @args
  } else {
    & python $Generator @args
  }

  Write-Host "Done: if successful, file is at docs/project_presentation.pptx" -ForegroundColor Green
} catch {
  Write-Host ("Error: {0}" -f $_.Exception.Message) -ForegroundColor Red
  exit 1
}
