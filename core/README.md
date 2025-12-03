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
pip-compile ./requirements.in --output-file=./requirements.txt
```

## Install All Dependencies
```bash
pip install -r ./requirements.txt
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
pip-compile ./requirements.in --output-file=./requirements.txt
# pip
pip freeze > ./requirements.txt
```

## Check Which Packages Can Be Upgraded
```bash
# pip-tools
pip-compile --upgrade ./requirements.in --output-file=./requirements.txt
# pip
pip list --outdated
```

## Install or Synchronize Dependencies
```bash
pip-sync ./requirements.txt
```

## Check the Latest Available Version of a Specific Package
```bash
pip install `<package-name>`==
```

## Upgrade a Specific Package
```bash
pip install --upgrade `<package-name>`
```

## Deactivate the Virtual Environment
```bash
deactivate
```
