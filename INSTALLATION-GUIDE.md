# Installation Guide - CSV to VCF Converter

## 🎯 Two Ways to Use the App

### Option 1: Portable Mode (No Installation)
Just run the AppImage directly - no installation needed!

```bash
# Make it executable (first time only)
chmod +x "release/CSV to VCF Converter-1.0.0.AppImage"

# Run it
./release/CSV\ to\ VCF\ Converter-1.0.0.AppImage
```

Or simply **double-click** the AppImage file in your file manager!

---

### Option 2: Install to System (Recommended)
Install the app to your system menu for easy access.

```bash
# Run the installation script
./install.sh
```

**What this does:**
- ✅ Copies AppImage to `~/.local/bin/`
- ✅ Creates menu entry in Applications
- ✅ Adds icon to system icons
- ✅ Makes app searchable in your launcher
- ✅ Allows pinning to favorites/dock

**After installation, you can:**
- Search for "CSV to VCF" in your app launcher
- Find it in Utilities or Office category
- Pin it to your favorites
- Create desktop shortcuts
- Right-click for quick actions

---

## 📋 Installation Steps (Detailed)

### Step 1: Build the AppImage (if not already built)
```bash
npm install
npm run package
```

### Step 2: Run the installer
```bash
chmod +x install.sh
./install.sh
```

### Step 3: Find the app
- Press **Super/Windows key**
- Type "**CSV**" or "**VCF**"
- Click the app icon

---

## 🗑️ Uninstallation

To remove the app from your system:

```bash
./uninstall.sh
```

This removes:
- AppImage from `~/.local/bin/`
- Desktop entry from applications menu
- Icon from system icons

---

## 📁 Installation Locations

After running `install.sh`, files are placed at:

| Item | Location |
|------|----------|
| AppImage | `~/.local/bin/CSV to VCF Converter-1.0.0.AppImage` |
| Desktop Entry | `~/.local/share/applications/csv-to-vcf-converter.desktop` |
| Icon | `~/.local/share/icons/hicolor/scalable/apps/csv-to-vcf-converter.svg` |

---

## 🎨 Desktop Integration Features

Once installed, the app integrates with your desktop environment:

### GNOME (Ubuntu, Fedora)
- Shows in Activities overview
- Searchable by name and keywords
- Can pin to dash/favorites
- Shows in app grid

### KDE Plasma
- Shows in Application Launcher
- Searchable in KRunner
- Can add to panel or desktop
- Shows in Kickoff menu

### XFCE, MATE, Cinnamon
- Shows in application menu
- Searchable in menu search
- Can add to panel
- Can create desktop launcher

---

## 🔧 Troubleshooting

### Issue: "Command not found" after installation
**Solution:** Restart your session or run:
```bash
export PATH="$HOME/.local/bin:$PATH"
```

### Issue: App doesn't show in menu
**Solution:** Update desktop database:
```bash
update-desktop-database ~/.local/share/applications/
```

### Issue: Icon doesn't show
**Solution:** Update icon cache:
```bash
gtk-update-icon-cache ~/.local/share/icons/hicolor/
```

### Issue: Permission denied
**Solution:** Make scripts executable:
```bash
chmod +x install.sh uninstall.sh
```

---

## 🚀 For Distribution

When sharing with users, provide:
1. The AppImage file from `release/` folder
2. The `install.sh` script
3. The `uninstall.sh` script
4. This guide (INSTALLATION-GUIDE.md)

Users can choose:
- **Quick use:** Just run the AppImage
- **Full install:** Run `install.sh` for menu integration

---

## ✨ What's New in This Version

- ✅ **Double-click to run** - No terminal commands needed!
- ✅ **No sandbox errors** - Works out of the box
- ✅ **System integration** - Install to application menu
- ✅ **Professional appearance** - Icon, desktop entry, categories
- ✅ **Easy uninstall** - Clean removal with one command

---

## 📝 Notes

- Installation is **per-user** (no sudo/root required)
- Files go to `~/.local/` (user directory)
- Safe to install/uninstall multiple times
- Doesn't interfere with system packages
- Portable - can still run AppImage directly without installing

---

## 🎉 Enjoy!

Your CSV to VCF Converter is now a first-class Linux application!
