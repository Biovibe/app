# BioVibe - Deployment Guide 🚀

This guide covers deploying BioVibe to various platforms.

---

## 📱 Android Deployment

### Prerequisites
- Android Studio installed
- Java JDK 17+
- Google Play Console account ($25 one-time fee)

### Step 1: Prepare Release Build

1. Open Android Studio:
```bash
npm run android
```

2. Update version in `android/app/build.gradle`:
```gradle
android {
    defaultConfig {
        versionCode 1        // Increment for each release
        versionName "1.0.0"  // User-facing version
    }
}
```

### Step 2: Generate Signing Key

First time only:
```bash
cd android
keytool -genkey -v -keystore biovibe-release.keystore -alias biovibe -keyalg RSA -keysize 2048 -validity 10000
```

**⚠️ IMPORTANT:** 
- Store keystore file safely (you can't regenerate it!)
- Remember your password
- Back it up securely

### Step 3: Configure Signing

Create `android/key.properties`:
```properties
storePassword=YOUR_KEYSTORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=biovibe
storeFile=biovibe-release.keystore
```

Add to `.gitignore`:
```
android/key.properties
android/*.keystore
```

Update `android/app/build.gradle`:
```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

### Step 4: Build Release AAB

In Android Studio:
1. Build > Generate Signed Bundle/APK
2. Select "Android App Bundle"
3. Choose your keystore
4. Build Release
5. Find AAB in `android/app/release/`

Or via command line:
```bash
cd android
./gradlew bundleRelease
```

### Step 5: Upload to Google Play

1. Go to [Google Play Console](https://play.google.com/console)
2. Create new app
3. Fill in store listing details
4. Upload AAB file
5. Complete content rating questionnaire
6. Set pricing (free/paid)
7. Submit for review

**Average review time:** 3-7 days

---

## 🍎 iOS Deployment

### Prerequisites
- Mac computer
- Xcode 14+
- Apple Developer Account ($99/year)

### Step 1: Configure Bundle ID

1. Open Xcode:
```bash
npm run ios
```

2. Select project > General
3. Set Bundle Identifier: `com.biovibe.app` (must be unique)

### Step 2: Configure Signing

1. In Xcode, select your project
2. Go to "Signing & Capabilities"
3. Select your team (Apple Developer account)
4. Enable "Automatically manage signing"

### Step 3: Update Version

In `ios/App/App.xcodeproj`:
- Version: `1.0.0`
- Build: `1`

### Step 4: Create Archive

1. In Xcode: Product > Scheme > Edit Scheme
2. Set Build Configuration to "Release"
3. Product > Archive
4. Wait for archive to complete

### Step 5: Upload to App Store Connect

1. In Organizer, select your archive
2. Click "Distribute App"
3. Choose "App Store Connect"
4. Upload
5. Wait for processing (10-30 minutes)

### Step 6: Submit for Review

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Complete app information
3. Add screenshots (required sizes):
   - 6.7" Display (iPhone 14 Pro Max)
   - 5.5" Display (iPhone 8 Plus)
4. Submit for review

**Average review time:** 1-3 days

---

## 🌐 Web Deployment

### Option 1: Traditional Hosting

Deploy to any Node.js hosting:

**Heroku:**
```bash
# Create Procfile
echo "web: node server.js" > Procfile

# Deploy
heroku create biovibe
git push heroku main
```

**DigitalOcean / AWS / Azure:**
1. Set up Node.js server
2. Upload files
3. Run `npm install`
4. Start with `npm start`
5. Use PM2 for process management:
```bash
npm install -g pm2
pm2 start server.js --name biovibe
pm2 save
pm2 startup
```

### Option 2: Static Hosting (Netlify/Vercel)

Convert to static site:

1. Build static files:
```bash
npm run build
```

2. Deploy `www/` folder to:
   - [Netlify](https://netlify.com)
   - [Vercel](https://vercel.com)
   - [GitHub Pages](https://pages.github.com)
   - [Cloudflare Pages](https://pages.cloudflare.com)

**Note:** User settings won't persist without a backend database.

---

## 📦 App Store Assets

### Screenshots Required

**Android:**
- Phone: 1080x1920px (minimum)
- Tablet (optional): 1536x2048px
- Minimum: 2 screenshots

**iOS:**
- iPhone 6.7": 1290x2796px
- iPhone 5.5": 1242x2208px
- iPad Pro 12.9": 2048x2732px (if supporting iPad)
- Minimum: 3-5 screenshots

### App Icons

**Already provided:** `public/biovibe7.png`

Generate all sizes:
```bash
npx @capacitor/assets generate
```

Or use online tool: [MakeAppIcon.com](https://makeappicon.com)

### Feature Graphic (Android)

Size: 1024x500px
Shows in Play Store header

### App Preview Video (Optional)

- Length: 15-30 seconds
- Shows key features
- Upload to YouTube (unlisted)

---

## 📝 Store Listing Template

### App Name
BioVibe - Wellness Companion

### Short Description (80 chars)
Your personal wellness companion for stress management and mindfulness.

### Full Description

```
🧘‍♀️ BioVibe - Your Wellness Companion

Take control of your mental wellness with BioVibe, the all-in-one app for stress management and mindfulness.

✨ KEY FEATURES:

📊 Stress Monitoring
Track and visualize your stress levels with real-time data and insights.

🌬️ Guided Relaxation
Breathing exercises and meditation sessions to help you unwind.

📓 Digital Journal
Document your wellness journey and track your progress.

🎨 Personalized Themes
Choose from beautiful color themes that match your mood.

🔥 Daily Streaks
Stay motivated with streak tracking and reminders.

😊 Mood Tracking
Log how you're feeling and identify patterns over time.

🧠 Biofeedback Integration
Connect with EEG devices for advanced stress monitoring.

💜 WHY BIOVIBE?

- Clean, intuitive interface
- Works offline
- Privacy-focused (data stored locally)
- Regular updates
- No ads, no tracking

Join thousands of users improving their mental wellness with BioVibe.

Download now and start your journey to a calmer, more mindful you! 🌿
```

### Categories

**Android:** Health & Fitness
**iOS:** Health & Fitness

### Content Rating

- Suitable for everyone (E)
- No mature content
- No violence
- No ads

### Keywords (iOS)

wellness, stress, meditation, mindfulness, mental health, breathing, journal, mood tracker, biofeedback, relaxation

---

## 🔐 Privacy & Security

### Privacy Policy (Required)

Create a simple privacy policy. Template:

```
Privacy Policy for BioVibe

Data Storage:
All user data is stored locally on your device.
We do not collect, transmit, or store any personal information on external servers.

Data Types Stored Locally:
- User profile information
- Journal entries
- Stress monitoring data
- App preferences

Third-Party Services:
None. BioVibe does not use analytics, advertising, or tracking services.

Data Security:
Your data is protected by your device's security features.

Contact:
[Your email]

Last updated: [Date]
```

Host on: GitHub Pages, Google Docs (public), or your website

---

## 📊 Post-Launch

### Monitoring

- Check app store reviews daily (first week)
- Monitor crash reports
- Track downloads

### Updates

**Android:**
```bash
# Increment versionCode and versionName
npm run build
npm run cap:sync
# Build new AAB and upload
```

**iOS:**
```bash
# Increment version/build number
npm run build
npm run cap:sync
# Archive and upload in Xcode
```

### Marketing

- Share on social media
- Ask friends for reviews
- Post in wellness communities
- Create demo video
- Write blog post

---

## 🐛 Common Issues

### "App not signed"
- Make sure you created and configured the keystore

### "Version conflict"
- Increment version code/number for each upload

### "Missing permissions"
- Check `AndroidManifest.xml` or `Info.plist`

### "Review rejection"
- Read rejection reason carefully
- Fix issues and resubmit
- Common issues: missing privacy policy, broken features

---

## ✅ Pre-Launch Checklist

- [ ] Test on multiple devices
- [ ] Update version numbers
- [ ] All features working
- [ ] Privacy policy created and linked
- [ ] Screenshots prepared
- [ ] App description written
- [ ] Icons generated
- [ ] Signing configured
- [ ] Test release build
- [ ] Beta test with friends

---

## 🆘 Support

- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [App Store Connect Help](https://developer.apple.com/support/app-store-connect/)
- [Capacitor Documentation](https://capacitorjs.com/docs)

---

**Good luck with your launch! 🎉**

