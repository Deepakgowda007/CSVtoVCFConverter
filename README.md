# CSV to VCF Converter

A simple desktop application that converts CSV contact files to industry-standard vCard (.vcf) format. The tool provides an intuitive drag-and-drop interface with fixed CSV header mapping, vCard 3.0 output, and complete offline processing to ensure data privacy.

## Features

- 100% Offline & Secure - No internet required
- Import CSV files with contact data
- Edit contacts in an intuitive table interface
- Export as single VCF file or multiple VCF files (zipped)
- Preview contacts before conversion
- Fully privacy-focused - all processing happens locally

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Building AppImage for Linux

See [packaging/README.md](packaging/README.md) for instructions on creating an AppImage that works on any Linux distribution.
