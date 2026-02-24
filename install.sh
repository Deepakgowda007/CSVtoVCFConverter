#!/bin/bash
# Installation script for CSV to VCF Converter
# This script installs the AppImage and creates menu entries

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="CSV to VCF Converter"
APPIMAGE_NAME="CSV to VCF Converter-1.0.0.AppImage"
DESKTOP_FILE_NAME="csv-to-vcf-converter.desktop"
ICON_NAME="csv-to-vcf-converter.svg"

# Installation directories
INSTALL_DIR="$HOME/.local/bin"
APPLICATIONS_DIR="$HOME/.local/share/applications"
ICONS_DIR="$HOME/.local/share/icons/hicolor/scalable/apps"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  CSV to VCF Converter - Installer${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if AppImage exists
if [ ! -f "release/$APPIMAGE_NAME" ]; then
    echo -e "${RED}Error: AppImage not found at release/$APPIMAGE_NAME${NC}"
    echo -e "${YELLOW}Please build the AppImage first with: npm run package${NC}"
    exit 1
fi

# Check if icon exists
if [ ! -f "packaging/debian/usr/share/icons/hicolor/scalable/apps/$ICON_NAME" ]; then
    echo -e "${RED}Error: Icon not found${NC}"
    exit 1
fi

echo -e "${YELLOW}This will install:${NC}"
echo -e "  • AppImage to: ${GREEN}$INSTALL_DIR${NC}"
echo -e "  • Desktop entry to: ${GREEN}$APPLICATIONS_DIR${NC}"
echo -e "  • Icon to: ${GREEN}$ICONS_DIR${NC}"
echo ""
read -p "Continue with installation? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Installation cancelled.${NC}"
    exit 0
fi

echo ""
echo -e "${BLUE}[1/5]${NC} Creating directories..."
mkdir -p "$INSTALL_DIR"
mkdir -p "$APPLICATIONS_DIR"
mkdir -p "$ICONS_DIR"

echo -e "${BLUE}[2/5]${NC} Copying AppImage..."
cp "release/$APPIMAGE_NAME" "$INSTALL_DIR/"
chmod +x "$INSTALL_DIR/$APPIMAGE_NAME"

echo -e "${BLUE}[3/5]${NC} Copying icon..."
cp "packaging/debian/usr/share/icons/hicolor/scalable/apps/$ICON_NAME" "$ICONS_DIR/"

echo -e "${BLUE}[4/5]${NC} Creating desktop entry..."
cat > "$APPLICATIONS_DIR/$DESKTOP_FILE_NAME" << EOF
[Desktop Entry]
Version=1.0
Type=Application
Name=$APP_NAME
Comment=Convert CSV contacts to VCF format - 100% Offline
Exec=env ELECTRON_DISABLE_SANDBOX=1 "$INSTALL_DIR/$APPIMAGE_NAME" %U
Icon=$ICONS_DIR/$ICON_NAME
Terminal=false
Categories=Utility;Office;ContactManagement;
Keywords=csv;vcf;vcard;contacts;converter;offline;
StartupNotify=true
EOF

chmod +x "$APPLICATIONS_DIR/$DESKTOP_FILE_NAME"

echo -e "${BLUE}[5/5]${NC} Updating desktop database..."
if command -v update-desktop-database &> /dev/null; then
    update-desktop-database "$APPLICATIONS_DIR" 2>/dev/null || true
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Installation Complete! ✓${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}You can now:${NC}"
echo -e "  • Search for '${GREEN}CSV to VCF${NC}' in your application menu"
echo -e "  • Find it under ${GREEN}Utilities${NC} or ${GREEN}Office${NC} category"
echo -e "  • Pin it to your favorites/dock"
echo -e "  • Run from terminal: ${GREEN}$INSTALL_DIR/$APPIMAGE_NAME${NC}"
echo ""
echo -e "${BLUE}To uninstall, run: ${GREEN}./uninstall.sh${NC}"
echo ""
