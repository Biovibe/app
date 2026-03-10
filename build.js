/**
 * Build script for BioVibe - Generates static HTML files for Capacitor
 * This converts server-rendered pages to static files for the mobile app
 */

const fs = require('fs');
const path = require('path');

// Output directory for the static build
const BUILD_DIR = 'www';

// User data defaults (can be overwritten by the app at runtime)
const userData = {
    name: 'BioVibe User',
    joinDate: new Date().toISOString().split('T')[0],
    theme: 'purple'
};

console.log('🚀 Building BioVibe for mobile...\n');

// Create build directory
if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR, { recursive: true });
}

// Theme definitions
const themes = {
    purple: {
        mountain1Start: '#311b92',
        mountain1End: '#512da8',
        mountain2Start: '#512da8', 
        mountain2End: '#673ab7',
        mountain3Start: '#673ab7',
        mountain3End: '#7986cb',
        overlay: 'linear-gradient(45deg, rgba(156, 39, 176, 0.3) 0%, rgba(103, 58, 183, 0.2) 50%, rgba(63, 81, 181, 0.1) 100%)'
    },
    green: {
        mountain1Start: '#0d4f0c',
        mountain1End: '#1b5e20',
        mountain2Start: '#1b5e20',
        mountain2End: '#2e7d32',
        mountain3Start: '#2e7d32',
        mountain3End: '#4caf50',
        overlay: 'linear-gradient(45deg, rgba(27, 94, 32, 0.3) 0%, rgba(46, 125, 50, 0.2) 50%, rgba(56, 142, 60, 0.1) 100%)'
    },
    blue: {
        mountain1Start: '#0a3d91',
        mountain1End: '#0d47a1',
        mountain2Start: '#0d47a1',
        mountain2End: '#1565c0',
        mountain3Start: '#1565c0',
        mountain3End: '#1976d2',
        overlay: 'linear-gradient(45deg, rgba(13, 71, 161, 0.3) 0%, rgba(21, 101, 192, 0.2) 50%, rgba(25, 118, 210, 0.1) 100%)'
    },
    red: {
        mountain1Start: '#8e0000',
        mountain1End: '#b71c1c',
        mountain2Start: '#b71c1c',
        mountain2End: '#c62828',
        mountain3Start: '#c62828',
        mountain3End: '#d32f2f',
        overlay: 'linear-gradient(45deg, rgba(183, 28, 28, 0.3) 0%, rgba(198, 40, 40, 0.2) 50%, rgba(211, 47, 47, 0.1) 100%)'
    }
};

const themeVariables = {
    purple: {
        lightColor: '#e6e6fa',
        mediumColor: '#d8bfd8', 
        primaryColor: '#9370db',
        darkColor: '#3e2741',
        lightBackground: '#f8f9ff',
        bodyBackground: '#9370db'
    },
    green: {
        lightColor: '#e8f5e8',
        mediumColor: '#c8e6c9',
        primaryColor: '#4caf50', 
        darkColor: '#1b5e20',
        lightBackground: '#f1f8e9',
        bodyBackground: '#4caf50'
    },
    blue: {
        lightColor: '#e3f2fd',
        mediumColor: '#bbdefb',
        primaryColor: '#2196f3',
        darkColor: '#0d47a1', 
        lightBackground: '#f3f9ff',
        bodyBackground: '#2196f3'
    },
    red: {
        lightColor: '#fce4ec',
        mediumColor: '#f8bbd9',
        primaryColor: '#e91e63',
        darkColor: '#b71c1c',
        lightBackground: '#fff8f8',
        bodyBackground: '#e91e63'
    }
};

function getThemeVariables(theme) {
    return themeVariables[theme] || themeVariables.purple;
}

function applyThemeToPage(html, theme) {
    const selectedTheme = getThemeVariables(theme);
    
    const themeCSS = `
    <style>
    :root {
        --light-lavender: ${selectedTheme.lightColor};
        --greyish-purple: ${selectedTheme.mediumColor};
        --purple: ${selectedTheme.primaryColor};
        --white: #ffffff;
        --light-grey: ${selectedTheme.lightBackground};
        --dark-grey: #666666;
        --black: #000000;
        --dark-purple: ${selectedTheme.darkColor};
        --primary-gradient: linear-gradient(135deg, ${selectedTheme.lightColor} 0%, ${selectedTheme.mediumColor} 50%, ${selectedTheme.primaryColor} 100%);
        --secondary-gradient: linear-gradient(135deg, ${selectedTheme.mediumColor} 0%, ${selectedTheme.lightColor} 100%);
        --accent-gradient: linear-gradient(135deg, ${selectedTheme.primaryColor} 0%, ${selectedTheme.lightColor} 100%);
    }
    
    body {
        background-color: ${selectedTheme.bodyBackground} !important;
    }
    
    main {
        background-color: ${selectedTheme.lightColor} !important;
    }
    
    .settings-button, .save-button {
        background: linear-gradient(135deg, ${selectedTheme.primaryColor}, ${selectedTheme.darkColor}) !important;
    }
    
    .settings-button:hover, .save-button:hover {
        background: linear-gradient(135deg, ${selectedTheme.darkColor}, ${selectedTheme.primaryColor}) !important;
    }
    
    .section-title, .page-title {
        color: ${selectedTheme.primaryColor} !important;
    }
    
    .theme-option.selected {
        border-color: ${selectedTheme.primaryColor} !important;
        background: ${selectedTheme.lightColor} !important;
    }
    
    .setting-input:focus {
        border-color: ${selectedTheme.primaryColor} !important;
        box-shadow: 0 0 0 3px ${selectedTheme.primaryColor}33 !important;
    }
    
    #Relax, #myStress, #Journal, #aboutMe {
        color: ${selectedTheme.primaryColor} !important;
    }
    
    #Home {
        background-color: ${selectedTheme.lightColor} !important;
    }
    </style>`;
    
    html = html.replace('</head>', themeCSS + '\n</head>');
    return html;
}

function applyThemeToHeader(headerHtml, theme) {
    const selectedTheme = themes[theme] || themes.purple;
    
    headerHtml = headerHtml.replace(
        /background: linear-gradient\(180deg[^;]+\);/,
        `background: ${selectedTheme.gradient};`
    );
    
    headerHtml = headerHtml.replace(
        /linear-gradient\(45deg, rgba\([^)]+\)[^;]+\)/,
        selectedTheme.overlay
    );
    
    headerHtml = headerHtml.replace(/stop-color:%23311b92/g, `stop-color:%23${selectedTheme.mountain1Start.substring(1)}`);
    headerHtml = headerHtml.replace(/stop-color:%23512da8/g, `stop-color:%23${selectedTheme.mountain1End.substring(1)}`);
    headerHtml = headerHtml.replace(/stop-color:%23673ab7/g, `stop-color:%23${selectedTheme.mountain2End.substring(1)}`);
    headerHtml = headerHtml.replace(/stop-color:%237986cb/g, `stop-color:%23${selectedTheme.mountain3End.substring(1)}`);
    headerHtml = headerHtml.replace(/%23512da8;stop-opacity:0\.8/g, `%23${selectedTheme.mountain2Start.substring(1)};stop-opacity:0.8`);
    headerHtml = headerHtml.replace(/%23673ab7;stop-opacity:0\.7/g, `%23${selectedTheme.mountain3Start.substring(1)};stop-opacity:0.7`);
    
    return headerHtml;
}

// Page builders
function buildPage(title, contentFile, headerFile = 'header.html') {
    let html = fs.readFileSync('template.html', 'utf-8');
    let header = fs.readFileSync(headerFile, 'utf-8').replace(/title/g, title);
    const footer = fs.readFileSync('footer.html', 'utf-8');
    const content = fs.readFileSync(contentFile, 'utf-8');
    
    // Apply theme to header if it has theme-specific styles
    header = applyThemeToHeader(header, userData.theme);
    
    html = applyThemeToPage(html, userData.theme);
    
    // Convert server routes to static file links
    html = html.replace(/href="\/main"/g, 'href="index.html"');
    html = html.replace(/href="\/relax"/g, 'href="relax.html"');
    html = html.replace(/href="\/myStress"/g, 'href="myStress.html"');
    html = html.replace(/href="\/journal"/g, 'href="journal.html"');
    html = html.replace(/href="\/aboutMe"/g, 'href="aboutMe.html"');
    html = html.replace(/href="\/settings"/g, 'href="settings.html"');
    
    html = html.replace("paste header here", header);
    html = html.replace("paste footer here", footer);
    html = html.replace("paste title here", title);
    html = html.replace("paste content here", content);
    
    // Add Capacitor script for native features
    html = html.replace('</body>', `
    <!-- Capacitor -->
    <script src="capacitor.js"></script>
    <script src="capacitor-app.js"></script>
</body>`);
    
    return html;
}

function buildMainPage() {
    let html = fs.readFileSync('template.html', 'utf-8');
    let mainHeader = fs.readFileSync('mainheader.html', 'utf-8');
    const footer = fs.readFileSync('footer.html', 'utf-8');
    const content = fs.readFileSync('main.html', 'utf-8');
    
    // Calculate days since join date
    const joinDateObj = new Date(userData.joinDate);
    const today = new Date();
    const diffTime = Math.abs(today - joinDateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const formattedDate = joinDateObj.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: '2-digit'
    });
    
    mainHeader = mainHeader.replace(/Joe Schmoe/g, userData.name);
    mainHeader = mainHeader.replace(/363 day streak • Joined 3\/25\/20/, 
        `${diffDays} day streak • Joined ${formattedDate}`);
    
    mainHeader = applyThemeToHeader(mainHeader, userData.theme);
    html = applyThemeToPage(html, userData.theme);
    
    // Convert routes to static files
    html = html.replace(/href="\/main"/g, 'href="index.html"');
    html = html.replace(/href="\/relax"/g, 'href="relax.html"');
    html = html.replace(/href="\/myStress"/g, 'href="myStress.html"');
    html = html.replace(/href="\/journal"/g, 'href="journal.html"');
    html = html.replace(/href="\/aboutMe"/g, 'href="aboutMe.html"');
    html = html.replace(/href="\/settings"/g, 'href="settings.html"');
    
    // Also fix settings redirect in JavaScript
    let processedContent = content.replace(/window\.location\.href='\/settings'/g, "window.location.href='settings.html'");
    processedContent = processedContent.replace(/window\.location\.href = 'myStress\.html'/g, "window.location.href = 'myStress.html'");
    
    html = html.replace("paste header here", mainHeader);
    html = html.replace("paste footer here", footer);
    html = html.replace("paste title here", "Main");
    html = html.replace("paste content here", processedContent);
    
    html = html.replace('</body>', `
    <!-- Capacitor -->
    <script src="capacitor.js"></script>
    <script src="capacitor-app.js"></script>
</body>`);
    
    return html;
}

// Pages to build
const pages = [
    { output: 'index.html', builder: buildMainPage },
    { output: 'relax.html', title: 'Relax', content: 'relax.html', header: 'relaxheader.html' },
    { output: 'myStress.html', title: 'My Stress', content: 'myStress.html', header: 'mystressheader.html' },
    { output: 'journal.html', title: 'Journal', content: 'Journal.html', header: 'journalheader.html' },
    { output: 'aboutMe.html', title: 'About Me', content: 'aboutMe.html', header: 'aboutMeheader.html' },
    { output: 'settings.html', title: 'Settings', content: 'settings.html', header: 'settingsheader.html' },
];

// Build all pages
console.log('📄 Building pages...');
pages.forEach(page => {
    try {
        let html;
        if (page.builder) {
            html = page.builder();
        } else {
            html = buildPage(page.title, page.content, page.header);
        }
        
        // Fix any remaining server routes in the content
        html = html.replace(/href="\/main"/g, 'href="index.html"');
        html = html.replace(/href="\/relax"/g, 'href="relax.html"');
        html = html.replace(/href="\/myStress"/g, 'href="myStress.html"');
        html = html.replace(/href="\/journal"/g, 'href="journal.html"');
        html = html.replace(/href="\/aboutMe"/g, 'href="aboutMe.html"');
        html = html.replace(/href="\/settings"/g, 'href="settings.html"');
        html = html.replace(/window\.location\.href='\/settings'/g, "window.location.href='settings.html'");
        
        fs.writeFileSync(path.join(BUILD_DIR, page.output), html);
        console.log(`   ✅ ${page.output}`);
    } catch (err) {
        console.log(`   ❌ ${page.output}: ${err.message}`);
    }
});

// Copy breathing exercise
try {
    const breathingHtml = fs.readFileSync('breathing-exercise.html', 'utf-8');
    fs.writeFileSync(path.join(BUILD_DIR, 'breathing-exercise.html'), breathingHtml);
    console.log('   ✅ breathing-exercise.html');
} catch (err) {
    console.log('   ⚠️ breathing-exercise.html not found, skipping');
}

// Copy static assets
console.log('\n📁 Copying assets...');

// Copy CSS
try {
    const css = fs.readFileSync('public/template.css', 'utf-8');
    fs.writeFileSync(path.join(BUILD_DIR, 'template.css'), css);
    console.log('   ✅ template.css');
} catch (err) {
    console.log(`   ❌ template.css: ${err.message}`);
}

// Copy images and assets from public folder
const publicFiles = fs.readdirSync('public');
publicFiles.forEach(file => {
    if (file !== 'template.css') {
        try {
            fs.copyFileSync(path.join('public', file), path.join(BUILD_DIR, file));
            console.log(`   ✅ ${file}`);
        } catch (err) {
            console.log(`   ❌ ${file}: ${err.message}`);
        }
    }
});

// Copy root-level images
const rootImages = ['calendar.png', 'home.png', 'lotus.png', 'phone.png', 'user.png'];
rootImages.forEach(img => {
    try {
        if (fs.existsSync(img)) {
            fs.copyFileSync(img, path.join(BUILD_DIR, img));
            console.log(`   ✅ ${img}`);
        }
    } catch (err) {
        console.log(`   ⚠️ ${img}: ${err.message}`);
    }
});

// Create Capacitor app script for native features
const capacitorAppScript = `
/**
 * BioVibe - Capacitor Native App Integration
 * Handles native device features like status bar, back button, etc.
 */

// Wait for Capacitor to be ready
document.addEventListener('DOMContentLoaded', async () => {
    // Check if running in Capacitor
    if (typeof Capacitor !== 'undefined' && Capacitor.isNativePlatform()) {
        console.log('🚀 Running in native app mode');
        
        // Initialize native features
        initializeNativeApp();
    } else {
        console.log('🌐 Running in web mode');
    }
});

async function initializeNativeApp() {
    try {
        // Import Capacitor plugins
        const { StatusBar, Style } = await import('@capacitor/status-bar');
        const { App } = await import('@capacitor/app');
        const { SplashScreen } = await import('@capacitor/splash-screen');
        
        // Configure status bar
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor({ color: '#9370db' });
        
        // Handle back button on Android
        App.addListener('backButton', ({ canGoBack }) => {
            if (canGoBack) {
                window.history.back();
            } else {
                // Ask to exit app if on main page
                if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                    App.exitApp();
                } else {
                    window.location.href = 'index.html';
                }
            }
        });
        
        // Hide splash screen after app loads
        await SplashScreen.hide();
        
        console.log('✅ Native features initialized');
    } catch (error) {
        console.log('ℹ️ Some native features not available:', error.message);
    }
}

// Theme manager for native app
window.BioVibeApp = {
    // Get current theme from localStorage
    getTheme: () => localStorage.getItem('biovibe_theme') || 'purple',
    
    // Set theme and update status bar
    setTheme: async (theme) => {
        localStorage.setItem('biovibe_theme', theme);
        
        const themeColors = {
            purple: '#9370db',
            green: '#4caf50',
            blue: '#2196f3',
            red: '#e91e63'
        };
        
        if (typeof Capacitor !== 'undefined' && Capacitor.isNativePlatform()) {
            try {
                const { StatusBar } = await import('@capacitor/status-bar');
                await StatusBar.setBackgroundColor({ color: themeColors[theme] || themeColors.purple });
            } catch (e) {
                console.log('Could not update status bar color');
            }
        }
    },
    
    // User data management
    getUserData: () => {
        const data = localStorage.getItem('biovibe_user');
        return data ? JSON.parse(data) : {
            name: 'BioVibe User',
            joinDate: new Date().toISOString().split('T')[0],
            theme: 'purple'
        };
    },
    
    setUserData: (data) => {
        localStorage.setItem('biovibe_user', JSON.stringify(data));
    }
};
`;

fs.writeFileSync(path.join(BUILD_DIR, 'capacitor-app.js'), capacitorAppScript);
console.log('   ✅ capacitor-app.js');

// Create a placeholder capacitor.js (will be replaced by Capacitor build)
fs.writeFileSync(path.join(BUILD_DIR, 'capacitor.js'), '// Capacitor runtime - replaced during native build');
console.log('   ✅ capacitor.js (placeholder)');

// Update manifest for mobile
const manifest = {
    "name": "BioVibe - Wellness Companion",
    "short_name": "BioVibe",
    "description": "Your wellness companion for stress management and mindfulness. Join the vibe.",
    "start_url": "index.html",
    "display": "standalone",
    "background_color": "#9370db",
    "theme_color": "#9370db",
    "orientation": "portrait",
    "scope": "./",
    "prefer_related_applications": false,
    "icons": [
        {
            "src": "biovibe7.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any maskable"
        }
    ]
};

fs.writeFileSync(path.join(BUILD_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('   ✅ manifest.json');

// Copy service worker for offline support
try {
    const sw = fs.readFileSync('service-worker.js', 'utf-8');
    fs.writeFileSync(path.join(BUILD_DIR, 'service-worker.js'), sw);
    console.log('   ✅ service-worker.js');
} catch (err) {
    console.log('   ⚠️ service-worker.js not found, skipping');
}

console.log('\n✨ Build complete! Output in ./' + BUILD_DIR + '/');
console.log('\n📱 Next steps:');
console.log('   1. Run: npm install');
console.log('   2. Run: npm run build');
console.log('   3. Run: npm run cap:add:android (for Android)');
console.log('   4. Run: npm run cap:add:ios (for iOS - requires Mac)');
console.log('   5. Run: npm run android or npm run ios to open in IDE');

