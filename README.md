# CSV to VCF Converter

A cross-platform application that converts CSV contact files to industry-standard vCard (.vcf) format. Works 100% offline with complete privacy - your data never leaves your device.

## 🖥️ Available Platforms

- **🐧 Linux Desktop** - AppImage (works on all Linux distros)
- **📱 Android Mobile** - APK (coming soon)

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

**Coming Soon!** The Android APK will be available for download.

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

- **Node.js** (v18 or higher)
- **npm**
- **Linux** (for AppImage building)
- **Android Studio** (for Android APK building)

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

**Need help?** 
- **Linux:** Click **Help** menu in the app for detailed instructions
- **Android:** See [ANDROID-SETUP.md](ANDROID-SETUP.md) for build instructions
- **General:** Check [INSTALLATION-GUIDE.md](INSTALLATION-GUIDE.md)
