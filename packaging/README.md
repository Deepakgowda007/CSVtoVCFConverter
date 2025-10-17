# Packaging for Debian/Ubuntu (.deb)

This directory contains the necessary files to package the CSV to VCF Converter as a `.deb` file for Debian-based Linux distributions like Ubuntu.

## File Structure

- `debian/DEBIAN/control`: Contains metadata about the package (name, version, description).
- `debian/usr/bin/csv-to-vcf-converter`: The executable launcher script that will be placed in the user's PATH.
- `debian/usr/share/applications/csv-to-vcf-converter.desktop`: The desktop entry file. This allows the application to appear in the system's application menu.
- `debian/usr/share/icons/hicolor/scalable/apps/csv-to-vcf-converter.svg`: The application icon.

## Build Process

To build the `.deb` package, you would typically follow these steps:

1.  **Bundle the application**: First, bundle the web application with a framework like Electron or Tauri to produce a native executable and its assets. Let's assume this process results in a directory named `dist` containing the executable (`app`) and all web assets.

2.  **Prepare the packaging directory**: Create a temporary directory for packaging, for example `build_dir`.

3.  **Copy application files**:
    ```bash
    # Create the installation directory structure
    mkdir -p build_dir/opt/csv-to-vcf-converter

    # Copy the bundled app into it
    cp -r /path/to/your/dist/* build_dir/opt/csv-to-vcf-converter/
    ```

4.  **Copy the Debian control files**:
    ```bash
    # Copy the debian directory structure from this `packaging` folder
    cp -r debian/* build_dir/
    ```
    The final structure inside `build_dir` should look like:
    ```
    .
    ├── DEBIAN
    │   └── control
    ├── opt
    │   └── csv-to-vcf-converter
    │       ├── app (executable)
    │       └── ... (other assets)
    └── usr
        ├── bin
        │   └── csv-to-vcf-converter
        └── share
            ├── applications
            │   └── csv-to-vcf-converter.desktop
            └── icons
                └── hicolor
                    └── scalable
                        └── apps
                            └── csv-to-vcf-converter.svg
    ```
5.  **Set correct permissions**:
    ```bash
    chmod 0755 build_dir/DEBIAN/control
    chmod 0755 build_dir/usr/bin/csv-to-vcf-converter
    ```

6.  **Build the package**:
    ```bash
    dpkg-deb --build build_dir
    ```
    This will create `build_dir.deb`, which can be installed on any Debian-based system.
