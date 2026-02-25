# Android APK Build Setup

## 🎯 Current Status

✅ Capacitor installed and configured
✅ Android project created
✅ Web app built and synced
❌ Android SDK needed to build APK

## 📦 What You Need

To build Android APK, you need:
1. **Android SDK** (Software Development Kit)
2. **Java JDK** (Java Development Kit)

## 🚀 Option 1: Install Android Studio (Recommended - Easiest)

### Step 1: Download Android Studio
```bash
# Visit: https://developer.android.com/studio
# Or use snap:
sudo snap install android-studio --classic
```

### Step 2: Run Android Studio
```bash
android-studio
```

### Step 3: Complete Setup Wizard
- Accept licenses
- Install Android SDK
- Install Android SDK Platform-Tools
- Install Android SDK Build-Tools

### Step 4: Set Environment Variables
Add to `~/.bashrc` or `~/.profile`:
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Then reload:
```bash
source ~/.bashrc
```

### Step 5: Build APK
```bash
npm run android:build
```

APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🚀 Option 2: Command Line Tools Only (Advanced)

### Step 1: Install Java JDK
```bash
sudo apt install openjdk-17-jdk
```

### Step 2: Download Android Command Line Tools
```bash
mkdir -p ~/Android/cmdline-tools
cd ~/Android/cmdline-tools
wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
unzip commandlinetools-linux-11076708_latest.zip
mv cmdline-tools latest
```

### Step 3: Set Environment Variables
```bash
export ANDROID_HOME=$HOME/Android
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Step 4: Install SDK Components
```bash
sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
sdkmanager --licenses
```

### Step 5: Build APK
```bash
npm run android:build
```

---

## 📱 After Building

### Debug APK (for testing)
Location: `android/app/build/outputs/apk/debug/app-debug.apk`
- Larger file size
- Not optimized
- Good for testing

### Release APK (for distribution)
```bash
npm run android:release
```
Location: `android/app/build/outputs/apk/release/app-release-unsigned.apk`
- Smaller file size
- Optimized
- Needs signing for Play Store

---

## 🔧 Troubleshooting

### Error: SDK location not found
**Solution:** Set ANDROID_HOME environment variable

### Error: Java not found
**Solution:** Install Java JDK 17
```bash
sudo apt install openjdk-17-jdk
```

### Error: License not accepted
**Solution:** Accept licenses
```bash
sdkmanager --licenses
```

---

## 📊 File Sizes (Estimated)

- Debug APK: ~50-60 MB
- Release APK: ~30-40 MB
- After optimization: ~20-30 MB

---

## 🎯 Next Steps

1. Install Android Studio (easiest) or Command Line Tools
2. Set up environment variables
3. Build the APK
4. Test on Android device or emulator
5. Make UI adjustments for mobile
6. Build release version

---

## 💡 Quick Test

After setup, verify with:
```bash
echo $ANDROID_HOME
which adb
sdkmanager --list
```

All should return valid paths/output.
