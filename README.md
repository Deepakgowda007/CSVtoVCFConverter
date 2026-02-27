# CSV to VCF Converter

A cross-platform application that converts CSV contact files to industry-standard vCard (.vcf) format. Works 100% offline with complete privacy - your data never leaves your device.

## 🖥️ Available Platforms

- **🐧 Linux Desktop** - AppImage (works on all Linux distros)
- **📱 Android Mobile** - APK available now! [Download from Releases](https://github.com/Deepakgowda007/CSVtoVCFConverter/releases)

## ✨ Features

- 🔒 **100% Offline & Secure** - No internet required
- 📁 **Import CSV files** with contact data
- ✏️ **Edit contacts** in an intuitive interface
- 💾 **Export options** - Single VCF file or Multiple VCF files (zipped)
- 👁️ **Preview contacts** before conversion
- 🖥️ **Desktop app** - Installs to your application menu (Linux)
- 📱 **Mobile app** - Touch-optimized interface (Android)
- 🌐 **Cross-platform** - Same features on all devices

---

## 🐧 Linux Desktop Installation

### Quick Start (For Users)

#### Option 1: Install to Application Menu (Recommended)

This will add the app to your system menu so you can use it anytime like any other app.

**Step 1: Clone and build**
```bash
git clone https://github.com/Deepakgowda007/CSVtoVCFConverter.git
cd CSVtoVCFConverter
npm install
npm run package
```

**Step 2: Install to system**
```bash
./install.sh
```

**That's it!** Now you can:
- Press **Super/Windows key** and type "**CSV**"
- Find it in your application menu under **Utilities** or **Office**
- Click to launch anytime
- Pin it to favorites/dock

#### Option 2: Run Portable (No Installation)

Just run the AppImage file directly:
```bash
./release/CSV\ to\ VCF\ Converter-1.0.0.AppImage
```

### Uninstall

To remove the app from your system:
```bash
./uninstall.sh
```

---

## 📱 Android Mobile Installation

### For Users

**Download the APK:**
1. Go to [Releases](https://github.com/Deepakgowda007/CSVtoVCFConverter/releases)
2. Download `CSV-to-VCF-Converter-v1.0.0-android.apk`
3. Enable "Install from unknown sources" in Android Settings
4. Tap the APK file to install
5. Open the app and start converting!

**Requirements:**
- Android 5.0 (Lollipop) or higher
- ~5 MB storage space

**Features:**
- Touch-optimized interface
- Works on all screen sizes
- Respects notches and navigation bars
- Saves files to Documents folder
- 100% offline

### For Developers

To build the Android APK yourself:

1. **Install Android Studio** (see [ANDROID-SETUP.md](ANDROID-SETUP.md))
2. **Build the APK:**
   ```bash
   npm install
   npm run android:build
   ```
3. **Find APK at:** `android/app/build/outputs/apk/debug/app-debug.apk`
4. **Install on your Android device**

For detailed Android setup instructions, see [ANDROID-SETUP.md](ANDROID-SETUP.md).

---

## 📖 How to Use

1. **Import CSV** - Click "Import CSV" button and select your CSV file
2. **Edit Contacts** - Review and edit contacts (First Name and Phone are required)
3. **Choose Format** - Select Single File (.vcf) or Multiple Files (.zip)
4. **Convert** - Click "Convert to VCF" button
5. **Download** - Click "Download" to save your VCF file(s)

## 📱 Where to Use Your VCF Files

After converting, you can import your VCF files to:

- **iPhone/iPad**: Open VCF file → Tap "Add All Contacts"
- **Android**: Open Contacts app → Import from file → Select VCF
- **Gmail**: Google Contacts → Import → Choose VCF file
- **Outlook**: File → Open & Export → Import/Export → vCard
- **WhatsApp**: Import VCF to phone contacts, then sync with WhatsApp
- **Any Device**: VCF is universally supported!

---

## 💻 For Developers

### Project Structure

```
├── components/          # React components (shared)
├── services/           # VCF generation logic (shared)
├── electron/           # Electron main process (Linux desktop)
├── android/            # Android project (Capacitor)
├── packaging/          # AppImage packaging files (Linux)
├── App.tsx             # Desktop UI
├── AppMobile.tsx       # Mobile UI
├── AppResponsive.tsx   # Responsive wrapper
├── install.sh          # Linux installation script
└── uninstall.sh        # Linux uninstallation script
```

### Development Commands

**Web Development:**
```bash
npm run dev          # Run Vite dev server
npm run build        # Build web app
```

**Linux Desktop:**
```bash
npm run package      # Build AppImage for Linux
```

**Android Mobile:**
```bash
npm run android:build    # Build debug APK
npm run android:release  # Build release APK
npm run android:open     # Open in Android Studio
```

### Requirements

- **Node.js v22 or higher** (REQUIRED - v18 will NOT work)
- **npm** (comes with Node.js)
- **Linux** (for AppImage building)
- **Android Studio** (for Android APK building)

### Installing/Updating Node.js

If you have an older Node.js version, update it:

**Option 1: Using nvm (Recommended)**
```bash
# Install nvm if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js v22
nvm install 22
nvm use 22
nvm alias default 22
```

**Option 2: Direct Download**
- Visit [nodejs.org](https://nodejs.org/)
- Download Node.js v22 LTS or Current
- Install and restart your terminal

**Check your version:**
```bash
node --version  # Should show v22.x.x or higher
```

---

## 🛠️ Technology Stack

- **Frontend:** React + TypeScript
- **Build Tool:** Vite
- **Desktop:** Electron (Linux AppImage)
- **Mobile:** Capacitor (Android)
- **Styling:** Tailwind CSS
- **File Format:** vCard 3.0

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

## 🌟 About

Built as part of [VibeCodeForGood](https://vibecodeforgood-18492.web.app/) initiative by [Deepak Gowda](https://github.com/Deepakgowda007).

---

## 🔧 Troubleshooting

### Build Fails with "Unsupported engine" Error

**Problem:** You see errors like:
```
npm WARN EBADENGINE required: { node: '>=22.0.0' }
npm WARN EBADENGINE current: { node: 'v18.19.1' }
```

**Solution:** Your Node.js version is too old. Update to Node.js v22+:
```bash
# Check current version
node --version

# If less than v22, update using nvm:
nvm install 22
nvm use 22

# Or download from nodejs.org
```

### Build Fails with "require() of ES Module" Error

**Problem:** Vite build fails with ES Module import errors.

**Solution:** This happens with Node.js v18 or older. Update to Node.js v22+.

### Nested Directory Structure

**Problem:** You cloned into nested folders like `CSVtoVCFConverter/CSVtoVCFConverter/CSVtoVCFConverter/`

**Solution:** 
```bash
# Remove the nested folders
cd ~
rm -rf CSVtoVCFConverter

# Clone fresh into a clean directory
git clone https://github.com/Deepakgowda007/CSVtoVCFConverter.git
cd CSVtoVCFConverter
npm install
npm run package
```

### AppImage Won't Run

**Problem:** Double-clicking AppImage does nothing.

**Solution:**
```bash
# Make it executable
chmod +x release/CSV\ to\ VCF\ Converter-1.0.0.AppImage

# Run it
./release/CSV\ to\ VCF\ Converter-1.0.0.AppImage
```

---

**Need help?** 
- **Linux:** Click **Help** menu in the app for detailed instructions
- **Android:** See [ANDROID-SETUP.md](ANDROID-SETUP.md) for build instructions
- **General:** Check [INSTALLATION-GUIDE.md](INSTALLATION-GUIDE.md)
