# CSV to VCF Converter

A simple desktop application that converts CSV contact files to industry-standard vCard (.vcf) format. Works 100% offline with complete privacy - your data never leaves your computer.

## ✨ Features

- 🔒 **100% Offline & Secure** - No internet required
- 📁 **Import CSV files** with contact data
- ✏️ **Edit contacts** in an intuitive table interface
- 💾 **Export options** - Single VCF file or Multiple VCF files (zipped)
- 👁️ **Preview contacts** before conversion
- 🖥️ **Desktop app** - Installs to your application menu
- 🐧 **Works on all Linux** - Ubuntu, Fedora, Debian, Arch, and more

## 🚀 Quick Start (For Users)

### Option 1: Install to Application Menu (Recommended)

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

### Option 2: Run Portable (No Installation)

Just run the AppImage file directly:
```bash
./release/CSV\ to\ VCF\ Converter-1.0.0.AppImage
```

## 📖 How to Use

1. **Import CSV** - Click "Import CSV" button and select your CSV file
2. **Edit Contacts** - Review and edit contacts in the table (First Name and Phone are required)
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

## 🗑️ Uninstall

To remove the app from your system:
```bash
./uninstall.sh
```

## 💻 For Developers

### Run in Development Mode
```bash
npm install
npm run dev
```

### Build AppImage
```bash
npm run package
```

The AppImage will be created in the `release/` folder.

### Project Structure
```
├── components/          # React components
├── services/           # VCF generation logic
├── electron/           # Electron main process
├── packaging/          # AppImage packaging files
├── install.sh          # Installation script
└── uninstall.sh        # Uninstallation script
```

## 🛠️ Requirements

- **Node.js** (v18 or higher)
- **npm**
- **Linux** (for AppImage)

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

## 🌟 About

Built as part of [VibeCodeForGood](https://vibecodeforgood-18492.web.app/) initiative by [Deepak Gowda](https://github.com/Deepakgowda007).

---

**Need help?** Click **Help** menu in the app for detailed instructions on how to use CSV to VCF converter and where to import your VCF files.
