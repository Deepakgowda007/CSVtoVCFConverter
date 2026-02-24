#!/bin/bash
# Uninstallation script for CSV to VCF Converter

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APPIMAGE_NAME="CSV to VCF Converter-1.0.0.AppImage"
DESKTOP_FILE_NAME="csv-to-vcf-converter.desktop"
ICON_NAME="csv-to-vcf-converter.svg"

# Installation directories
INSTALL_DIR="$HOME/.local/bin"
APPLICATIONS_DIR="$HOME/.local/share/applications"
ICONS_DIR="$HOME/.local/share/icons/hicolor/scalable/apps"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  CSV to VCF Converter - Uninstaller${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

echo -e "${YELLOW}This will remove:${NC}"
echo -e "  • AppImage from: ${RED}$INSTALL_DIR${NC}"
echo -e "  • Desktop entry from: ${RED}$APPLICATIONS_DIR${NC}"
echo -e "  • Icon from: ${RED}$ICONS_DIR${NC}"
echo ""
read -p "Continue with uninstallation? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Uninstallation cancelled.${NC}"
    exit 0
fi

echo ""
echo -e "${BLUE}[1/4]${NC} Removing AppImage..."
rm -f "$INSTALL_DIR/$APPIMAGE_NAME"

echo -e "${BLUE}[2/4]${NC} Removing desktop entry..."
rm -f "$APPLICATIONS_DIR/$DESKTOP_FILE_NAME"

echo -e "${BLUE}[3/4]${NC} Removing icon..."
rm -f "$ICONS_DIR/$ICON_NAME"

echo -e "${BLUE}[4/4]${NC} Updating desktop database..."
if command -v update-desktop-database &> /dev/null; then
    update-desktop-database "$APPLICATIONS_DIR" 2>/dev/null || true
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Uninstallation Complete! ✓${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}CSV to VCF Converter has been removed from your system.${NC}"
echo ""
