#!/bin/bash

# This script sets up the test environment for the Parroty VSCode extension.
# It creates a Python virtual environment and installs the required dependencies.

# Exit immediately if a command exits with a non-zero status.
set -e

# The directory of this script.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# The backend directory.
BACKEND_DIR="$SCRIPT_DIR/backend"

# The virtual environment directory.
VENV_DIR="$BACKEND_DIR/.venv"

# Create the virtual environment if it doesn't exist.
if [ ! -d "$VENV_DIR" ]; then
  echo "Creating Python virtual environment at $VENV_DIR..."
  python3 -m venv "$VENV_DIR"
fi

# Activate the virtual environment and install dependencies.
echo "Installing dependencies from requirements.txt..."
source "$VENV_DIR/bin/activate"
pip install -r "$BACKEND_DIR/requirements.txt"

echo "Setup complete."
echo ""
echo "Note: The extension will automatically use the virtual environment."
echo "Make sure to set your Gemini API key in VS Code settings:"
echo "  1. Open VS Code Settings (Cmd + , on Mac; Ctrl + , on Windows/Linux)"
echo "  2. Search for 'Parroty'"
echo "  3. Enter your Gemini API key"
