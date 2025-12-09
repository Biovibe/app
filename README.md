# BioVibe - Wellness Companion App 🧘‍♀️

<div align="center">
  <img src="public/biovibe7.png" alt="BioVibe Logo" width="200"/>
  
  **Your personal wellness companion for stress management and mindfulness**
</div>

---

## 🌟 Features

- **Stress Monitoring** - Track and visualize your stress levels with real-time data
- **Relaxation Exercises** - Guided breathing exercises and meditation
- **Journal** - Document your wellness journey
- **EEG Integration** - Connect with biofeedback devices
- **Customizable Themes** - Purple, Green, Blue, and Red color schemes
- **Daily Streaks** - Stay motivated with streak tracking
- **Mood Tracking** - Log how you're feeling each day
- **Reminders** - Set wellness reminders throughout the day

---

## 📱 Available As

- ✅ **Web App** - Run locally with Node.js
- ✅ **Android App** - Native mobile app
- ✅ **iOS App** - Native mobile app (Mac required)
- ✅ **PWA** - Installable web app

---

## 🚀 Quick Start

### Web Version

```bash
# Install dependencies
npm install

# Start the server
npm start

# Open browser to http://localhost:3000/main
```

### Mobile Version

See [MOBILE_SETUP.md](MOBILE_SETUP.md) for detailed instructions.

**Quick build:**
```bash
# Install dependencies
npm install

# Build web assets
npm run build

# Add platform (first time only)
npm run cap:add:android

# Build and open Android Studio
npm run android
```

---

## 📁 Project Structure

```
biovibe/
├── public/              # Static assets (images, CSS, manifest)
├── www/                 # Built web app (generated)
├── android/             # Android native project (generated)
├── ios/                 # iOS native project (generated)
│
├── server.js            # Express server for web version
├── build.js             # Build script for mobile
├── capacitor.config.ts  # Capacitor configuration
├── service-worker.js    # Offline support
│
├── template.html        # Base HTML template
├── footer.html          # Navigation footer
├── main.html            # Dashboard content
├── relax.html           # Relaxation exercises
├── myStress.html        # Stress monitoring
├── Journal.html         # Journal entries
├── aboutMe.html         # Profile information
├── settings.html        # App settings
│
└── *header.html         # Page-specific headers
```

---

## 🎨 Themes

BioVibe supports four beautiful color themes:

| Theme | Primary Color | Use Case |
|-------|---------------|----------|
| **Purple** 💜 | `#9370db` | Default calming theme |
| **Green** 💚 | `#4caf50` | Nature & growth |
| **Blue** 💙 | `#2196f3` | Tranquility & peace |
| **Red** ❤️ | `#e91e63` | Energy & vitality |

Change themes in Settings!

---

## 🛠️ Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start web server on port 3000 |
| `npm run build` | Build static files for mobile |
| `npm run android` | Build and open Android Studio |
| `npm run ios` | Build and open Xcode (Mac only) |
| `npm run cap:sync` | Sync changes to native projects |

### Building for Production

**Web:**
```bash
# The web version runs from server.js
npm start
```

**Mobile:**
```bash
# Build web assets
npm run build

# Sync to native projects
npm run cap:sync

# Open in IDE and build release version
npm run android  # or npm run ios
```

---

## 📲 App Store Deployment

### Android (Google Play)

1. Open Android Studio
2. Build > Generate Signed Bundle/APK
3. Create/use a keystore
4. Build release AAB
5. Upload to Google Play Console

### iOS (App Store)

1. Open Xcode
2. Product > Archive
3. Distribute App
4. Upload to App Store Connect
5. Submit for review

See [MOBILE_SETUP.md](MOBILE_SETUP.md) for detailed instructions.

---

## 🔧 Configuration

### Update App Info

Edit `capacitor.config.ts`:

```typescript
const config: CapacitorConfig = {
  appId: 'com.biovibe.app',      // Change for your app
  appName: 'BioVibe',             // App display name
  webDir: 'www',
  // ...
};
```

### Update Themes

Edit `build.js` to customize theme colors in the `themes` and `themeVariables` objects.

---

## 🌐 Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🤝 Contributing

This is a personal wellness app. Feel free to fork and customize for your needs!

---

## 📄 License

See [LICENSE](LICENSE) file for details.

---

## 💡 Tips

- **First time?** Start with `npm install && npm run build`
- **Made changes?** Run `npm run build && npm run cap:sync`
- **Testing on device?** Use `npm run android` or `npm run ios`
- **Need help?** Check [MOBILE_SETUP.md](MOBILE_SETUP.md)

---

## 🙏 Acknowledgments

Built with:
- [Express](https://expressjs.com/) - Web framework
- [Capacitor](https://capacitorjs.com/) - Native mobile runtime
- Love and care for mental wellness 💜

---

<div align="center">
  <strong>Stay calm. Stay mindful. Join the vibe. 🌿</strong>
</div>
