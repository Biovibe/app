import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.biovibe.app',
  appName: 'BioVibe',
  webDir: 'www',
  
  // Server configuration (for development)
  server: {
    // Uncomment below for live reload during development
    // url: 'http://YOUR_LOCAL_IP:3000',
    // cleartext: true
  },
  
  // iOS specific configuration
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#9370db',
    preferredContentMode: 'mobile'
  },
  
  // Android specific configuration  
  android: {
    backgroundColor: '#9370db',
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true // Disable in production
  },
  
  // Plugins configuration
  plugins: {
    // Splash Screen
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#9370db',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    },
    
    // Status Bar
    StatusBar: {
      backgroundColor: '#9370db',
      style: 'LIGHT',
      overlaysWebView: false
    },
    
    // Keyboard
    Keyboard: {
      resize: 'body',
      resizeOnFullScreen: true
    },
    
    // Local Notifications (for reminders)
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#9370db',
      sound: 'beep.wav'
    }
  }
};

export default config;



