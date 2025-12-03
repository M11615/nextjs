# Python Environment Setup Guide

## Create a Virtual Environment
```bash
# Windows
python -m venv ./.venv

# Linux / macOS
python3 -m venv ./.venv
```

## Activate the Virtual Environment
```bash
# Windows
./.venv/Scripts/Activate.ps1

# Linux / macOS
source ./.venv/bin/activate
```

## Deactivate the Virtual Environment
```bash
deactivate
```

## Upgrade pip
```bash
python -m pip install --upgrade pip
```

## Install pip-tools (for dependency compilation)
```bash
pip install pip-tools
```

## Compile requirements.txt from requirements.in
```bash
pip-compile --output-file=./requirements.txt ./requirements.in
```

## Install All Dependencies
```bash
# Windows
pip install -r ./requirements.txt

# Linux / macOS
TMPDIR=~/tmp pip install -r ./requirements.txt
```

## Install or Synchronize Dependencies
```bash
# Windows
pip-sync ./requirements.txt

# Linux / macOS
TMPDIR=~/tmp pip-sync ./requirements.txt
```

## Install a Specific Dependency
```bash
pip install `<package-name>`
```

## Remove a Specific Dependency
```bash
pip uninstall `<package-name>`
```

## Refresh requirements.txt
```bash
# pip-tools
pip-compile --output-file=./requirements.txt ./requirements.in

# pip
pip freeze > ./requirements.txt
```

## Pre-build Dependencies as Wheels (for faster installation in Docker or production environments)
```bash
# Windows
pip wheel -w ./.wheelhouse -r ./requirements.txt

# Linux / macOS
TMPDIR=~/tmp pip wheel -w ./.wheelhouse -r ./requirements.txt
```

## Check Which Packages Can Be Upgraded
```bash
# pip-tools
pip-compile --upgrade --output-file=./requirements.txt ./requirements.in

# pip
pip list --outdated
```

## Check the Latest Available Version of a Specific Package
```bash
pip search `<package-name>`
pip show `<package-name>`
```

## Upgrade a Specific Package
```bash
pip install --upgrade `<package-name>`
```
