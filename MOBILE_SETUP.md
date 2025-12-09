# BioVibe Mobile App Setup Guide 📱

This guide will help you build BioVibe as a native mobile app for iOS and Android.

## Prerequisites

### For Android Development:
- [Android Studio](https://developer.android.com/studio) (free)
- Java JDK 17+ (comes with Android Studio)
- Android SDK (installed via Android Studio)

### For iOS Development (Mac only):
- macOS computer
- [Xcode](https://apps.apple.com/app/xcode/id497799835) (free from App Store)
- Apple Developer account (free for testing, $99/year for App Store)

---

## Quick Start

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Build the Web Assets
```bash
npm run build
```

### Step 3: Add Mobile Platforms

**For Android:**
```bash
npm run cap:add:android
```

**For iOS (Mac only):**
```bash
npm run cap:add:ios
```

### Step 4: Open in IDE

**Android (Android Studio):**
```bash
npm run cap:open:android
```

**iOS (Xcode):**
```bash
npm run cap:open:ios
```

### Step 5: Build & Run
- In Android Studio: Click the green "Run" button
- In Xcode: Click the "Play" button

---

## One-Command Build

After initial setup, you can use these shortcuts:

```bash
# Build and open Android project
npm run android

# Build and open iOS project  
npm run ios
```

---

## App Icons & Splash Screens

### Creating App Icons

You need icons in multiple sizes. Use your `biovibe7.png` as the source.

**Recommended tool:** [capacitor-assets](https://github.com/ionic-team/capacitor-assets)

```bash
npx @capacitor/assets generate --iconBackgroundColor '#9370db' --splashBackgroundColor '#9370db'
```

Or manually create:
- **Android:** Place icons in `android/app/src/main/res/mipmap-*` folders
- **iOS:** Use Xcode's Asset Catalog

### Required Icon Sizes

| Platform | Size | File |
|----------|------|------|
| Android | 48x48 | mipmap-mdpi/ic_launcher.png |
| Android | 72x72 | mipmap-hdpi/ic_launcher.png |
| Android | 96x96 | mipmap-xhdpi/ic_launcher.png |
| Android | 144x144 | mipmap-xxhdpi/ic_launcher.png |
| Android | 192x192 | mipmap-xxxhdpi/ic_launcher.png |
| iOS | 1024x1024 | AppIcon.appiconset |

---

## Common Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Build web assets to `www/` folder |
| `npm run cap:sync` | Sync web assets to native projects |
| `npm run cap:copy` | Copy web assets (faster than sync) |
| `npm run android` | Full build + open Android Studio |
| `npm run ios` | Full build + open Xcode |

---

## Testing on Devices

### Android
1. Enable Developer Options on your phone
2. Enable USB Debugging
3. Connect phone via USB
4. Select your device in Android Studio
5. Click Run

### iOS
1. Connect iPhone to Mac
2. Trust the computer on iPhone
3. Select your device in Xcode
4. Click Run

---

## Publishing to App Stores

### Google Play Store
1. In Android Studio: Build > Generate Signed Bundle/APK
2. Create a keystore (keep it safe!)
3. Build a release AAB file
4. Upload to [Google Play Console](https://play.google.com/console)

### Apple App Store
1. In Xcode: Product > Archive
2. Upload to App Store Connect
3. Submit for review in [App Store Connect](https://appstoreconnect.apple.com)

---

## Troubleshooting

### "capacitor.config.ts not found"
Run `npm install` first.

### Android build fails
- Make sure Android Studio is installed
- Install required SDK versions (Android 13/API 33+)
- Accept all license agreements

### iOS build fails
- Make sure Xcode is updated
- Run `pod install` in the `ios/App` folder
- Check your Apple Developer signing settings

### Changes not showing
```bash
npm run build
npm run cap:sync
```

---

## Project Structure

```
biovibe/
├── www/                    # Built web assets (generated)
├── android/                # Android native project (generated)
├── ios/                    # iOS native project (generated)
├── build.js                # Build script
├── capacitor.config.ts     # Capacitor configuration
├── service-worker.js       # Offline support
├── server.js               # Web server (not used in mobile)
└── public/                 # Static assets
```

---

## Need Help?

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Studio Guide](https://developer.android.com/studio/intro)
- [Xcode Guide](https://developer.apple.com/xcode/)

Happy building! 🚀


