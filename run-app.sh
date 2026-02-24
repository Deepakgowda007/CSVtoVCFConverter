#!/bin/bash
# Wrapper script to run CSV to VCF Converter AppImage
# This sets the necessary environment variables for compatibility

export ELECTRON_DISABLE_SANDBOX=1
export ELECTRON_NO_SANDBOX=1

# Find the AppImage in the release directory
APPIMAGE="./release/CSV to VCF Converter-1.0.0.AppImage"

if [ ! -f "$APPIMAGE" ]; then
    echo "Error: AppImage not found at $APPIMAGE"
    echo "Please build it first with: npm run package"
    exit 1
fi

# Make it executable if not already
chmod +x "$APPIMAGE"

# Run the AppImage
"$APPIMAGE" "$@"
