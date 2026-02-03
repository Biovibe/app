# 🚀 BioVibe Quick Start Guide

**Your app is ready to build! Here's what to do next:**

---

## ✅ What's Done

- ✅ Build system configured
- ✅ Android project created
- ✅ Capacitor plugins installed
- ✅ Service worker for offline support
- ✅ Theme system configured
- ✅ All web assets built

---

## 📱 Test Your App NOW

### Option 1: Open in Android Studio (Recommended)

```bash
npm run android
```

This will:
1. Open Android Studio
2. Load your BioVibe project
3. Click the green ▶️ "Run" button
4. Select a device or emulator
5. Your app will install and launch!

### Option 2: Test in Web Browser First

```bash
npm start
```

Then open: http://localhost:3000/main

---

## 🎯 Your Next Steps

### 1️⃣ Test on Android Emulator

In Android Studio:
1. Tools > Device Manager
2. Create a device (Pixel 5 or newer)
3. Click ▶️ Run
4. Your app launches! 🎉

### 2️⃣ Test on Real Android Device

1. Enable Developer Mode on your phone:
   - Go to Settings > About Phone
   - Tap "Build Number" 7 times
2. Enable USB Debugging in Developer Options
3. Connect phone via USB
4. Trust computer on phone
5. In Android Studio, select your device
6. Click Run

### 3️⃣ Customize Your App

**Change App Name:**
- Edit `android/app/src/main/res/values/strings.xml`
- Change `<string name="app_name">BioVibe</string>`

**Change App ID:**
- Edit `capacitor.config.ts`
- Change `appId: 'com.biovibe.app'` to your domain

**Change Colors:**
- Edit `android/app/src/main/res/values/colors.xml`

**Update Icons:**
```bash
npx @capacitor/assets generate
```

### 4️⃣ Build for Release

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete instructions on:
- Creating app signing keys
- Building release APK/AAB
- Publishing to Google Play Store

---

## 🔄 Making Changes

When you edit HTML/CSS/JS files:

```bash
# Rebuild and sync
npm run build
npm run cap:sync

# Or use the shortcut
npm run android
```

---

## 📂 Important Files

| File | Purpose |
|------|---------|
| `capacitor.config.ts` | App configuration |
| `build.js` | Build script |
| `www/` | Built app files (don't edit directly) |
| `android/` | Native Android project |
| `public/` | Static assets (images, CSS) |

---

## 🐛 Troubleshooting

### "Android Studio not opening"
- Make sure Android Studio is installed
- Download from: https://developer.android.com/studio

### "Build failed in Android Studio"
1. File > Sync Project with Gradle Files
2. Build > Clean Project
3. Build > Rebuild Project

### "Changes not showing"
```bash
npm run build
npm run cap:sync
```
Then rebuild in Android Studio

### "App crashes on launch"
- Check Android Studio Logcat for errors
- Make sure all assets copied correctly
- Try: Build > Clean Project

---

## 💡 Pro Tips

1. **Use Live Reload** (for faster development):
   - Start web server: `npm start`
   - Get your local IP (ipconfig on Windows)
   - Edit `capacitor.config.ts`:
   ```typescript
   server: {
     url: 'http://YOUR_IP:3000',
     cleartext: true
   }
   ```
   - Sync: `npm run cap:sync`
   - Run app - changes reload automatically!

2. **Debug in Chrome:**
   - Open `chrome://inspect` in Chrome
   - Select your device
   - Click "Inspect" - full Chrome DevTools!

3. **Test Different Screen Sizes:**
   - Create multiple emulators
   - Phone, tablet, different Android versions

---

## 🎉 You're Ready!

Your BioVibe app is fully set up and ready to test!

**Next Command:**
```bash
npm run android
```

Then click ▶️ Run in Android Studio!

---

## 📚 Need More Help?

- [MOBILE_SETUP.md](MOBILE_SETUP.md) - Detailed setup instructions
- [DEPLOYMENT.md](DEPLOYMENT.md) - Publishing to app stores
- [README.md](README.md) - Full documentation

---

**Happy Building! 🚀**


