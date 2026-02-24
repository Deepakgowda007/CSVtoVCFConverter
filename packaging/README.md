# Building AppImage for Linux

This guide explains how to create an AppImage that works on any Linux distribution.

## What is AppImage?

AppImage is a universal packaging format for Linux applications that:
- Works on all major Linux distributions (Ubuntu, Fedora, Debian, Arch, etc.)
- Requires no installation - just download and run
- Is completely self-contained with all dependencies
- Doesn't require root/sudo permissions
- Works regardless of the Linux version

## Prerequisites

- Node.js (v18 or higher)
- npm

## Build Steps

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the AppImage:
   ```bash
   npm run package
   ```

3. The AppImage will be created in the `release/` directory:
   ```
   release/CSV-to-VCF-Converter-1.0.0.AppImage
   ```

## Using the AppImage

1. Make it executable:
   ```bash
   chmod +x CSV-to-VCF-Converter-1.0.0.AppImage
   ```

2. Run it:
   ```bash
   ./CSV-to-VCF-Converter-1.0.0.AppImage
   ```

That's it! The app will run on any Linux distribution without any additional setup.

## Distribution

You can distribute the `.AppImage` file to users. They just need to:
1. Download the file
2. Make it executable (`chmod +x`)
3. Double-click or run from terminal

No installation, no dependencies, no hassle!

## Technical Details

The AppImage is built using:
- Electron for the desktop wrapper
- Vite for building the React frontend
- electron-builder for packaging

The build process:
1. Vite builds the React app into static files
2. Electron wraps these files in a desktop application
3. electron-builder packages everything into an AppImage

## Troubleshooting

If the AppImage doesn't run:
- Ensure it's executable: `chmod +x *.AppImage`
- Check if FUSE is installed: `sudo apt install fuse libfuse2` (Ubuntu/Debian)
- Try running from terminal to see error messages

## Building on Older Systems

For maximum compatibility, build on an older Linux distribution (like Ubuntu 20.04 LTS). Newer systems are backwards compatible, but not vice versa.
