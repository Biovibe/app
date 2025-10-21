const express = require('express');
const app = express();
const path = require('path');

const fs = require('fs');

// Store user data (in production, use a database)
let userData = {
    name: 'Joe Schmoe',
    joinDate: '2020-03-25',
    theme: 'purple'
};
// This line of code creates the web server and puts it into a variable called server:

// A function that will handle responding to requests made by the browser
function respondToRequestFromBrowser(request, response) {
    // This is how we are responding to the browser
    if (request.url === "/eeg"){
        const html = fs.readFileSync('eeg.html', 'utf-8'); 
        response.end(html);
    } else if (request.url.endsWith(".png")){
        const png = fs.readFileSync(request.url.replace("/", ""));
        response.end(png);
    } else if (request.url.endsWith(".svg")){
        const svg = fs.readFileSync(request.url.replace("/", ""), 'utf-8');
        response.setHeader("Content-Type", "image/svg+xml")
        response.end(svg);
    // } else if (request.url === "/home"){
    //     const home = makepage("Home", "home.html");
    //     response.end(home);
    // } else if (request.url === "/user"){
    //     const user = makepage("User", "user.html");
    //     response.end(user);
    // } else if (request.url === "/phone"){
    //     const phone = makepage("Phone", "phone.html");
    //     response.end(phone);
    // } else if (request.url === "/lotus"){
    //     const lotus = makepage("Lotus", "lotus.html");
    //     response.end(lotus);
    } else if (request.url === "/relax"){
    const calendar = makepage("Relax", "relax.html");
        response.end(calendar);
    } else if (request.url === "/myStress"){
        const destress = makemystress("My stress", "myStress.html");
        response.end(destress);
    } else if (request.url === "/journal"){
        const journal = makejournal("Journal", "Journal.html");
        response.end(journal);
    } else if (request.url === "/aboutMe"){
        const profile = makeaboutme("About me", "aboutMe.html");
        response.end(profile);
    } else if (request.url === "/main"){
        const profile = makepage("Main", "main.html");
        response.end(profile);
    } else if (request.url === "/template.css"){
        const css = fs.readFileSync('template.css', 'utf-8');
response.end(css);
    } else {
        response.end('ERROR');
    }
console.log(request.url)
}

app.use(express.static('public'))
app.use(express.json())

app.get('/eeg', (req, res) => {
    res.readFileSync('eeg.html', 'utf-8'); 
});
app.get('/png', (req, res) => {
    res.readFileSync(request.url.replace("/", ""));
});
app.get('/svg', (req, res) => {
    res.readFileSync(request.url.replace("/", ""), 'utf-8');
    res.setHeader("Content-Type", "image/svg+xml")
});
app.get('/main', (req, res) => {
    const main = makemain("Main", "main.html");
    res.send(main);
});
app.get('/settings', (req, res) => {
    const settings = makepage("Settings", "settings.html");
    res.send(settings);
});
app.get('/aboutMe', (req, res) => {
    const aboutMe = makeaboutme("About me", "aboutMe.html");
    res.send(aboutMe);
});
app.get('/myStress', (req, res) => {
    const myStress = makemystress("My stress", "myStress.html");
    res.send(myStress);
});
app.get('/relax', (req, res) => {
    const relax = makerelax("Relax", "relax.html");
    res.send(relax);
});
app.get('/journal', (req, res) => {
    const journal = makejournal("Journal", "Journal.html");
    res.send(journal);
});
app.get('/breathing-exercise.html', (req, res) => {
    const breathingExercise = fs.readFileSync('breathing-exercise.html', 'utf-8');
    res.send(breathingExercise);
});
app.get('/template.css', (req, res) => {
    try {
        let css = fs.readFileSync('public/template.css', 'utf-8');
        
        // Apply theme-specific colors to CSS
        const selectedTheme = getThemeVariables(userData.theme);
        
        // Replace CSS variables with theme colors
        css = css.replace(/--light-lavender: #e6e6fa;/, `--light-lavender: ${selectedTheme.lightColor};`);
        css = css.replace(/--greyish-purple: #d8bfd8;/, `--greyish-purple: ${selectedTheme.mediumColor};`);
        css = css.replace(/--purple: #9370db;/, `--purple: ${selectedTheme.primaryColor};`);
        css = css.replace(/--dark-purple: #3e2741;/, `--dark-purple: ${selectedTheme.darkColor};`);
        css = css.replace(/--light-grey: #f8f9ff;/, `--light-grey: ${selectedTheme.lightBackground};`);
        
        res.setHeader('Content-Type', 'text/css');
        res.send(css);
    } catch (error) {
        res.status(500).send('Error loading CSS');
    }
});

// API endpoints for user settings management
app.get('/api/getUserSettings', (req, res) => {
    res.json({ 
        name: userData.name,
        joinDate: userData.joinDate,
        theme: userData.theme
    });
});

app.post('/api/saveUserSettings', (req, res) => {
    const { name, joinDate, theme } = req.body;
    
    if (!name || name.trim() === '') {
        return res.status(400).json({ success: false, error: 'Name is required' });
    }
    
    if (name.length > 50) {
        return res.status(400).json({ success: false, error: 'Name must be 50 characters or less' });
    }
    
    if (!joinDate) {
        return res.status(400).json({ success: false, error: 'Join date is required' });
    }
    
    // Validate join date format and that it's not in the future
    const joinDateObj = new Date(joinDate);
    const today = new Date();
    
    if (isNaN(joinDateObj.getTime())) {
        return res.status(400).json({ success: false, error: 'Invalid join date format' });
    }
    
    if (joinDateObj > today) {
        return res.status(400).json({ success: false, error: 'Join date cannot be in the future' });
    }
    
    // Validate theme
    const validThemes = ['purple', 'green', 'blue', 'red'];
    if (theme && !validThemes.includes(theme)) {
        return res.status(400).json({ success: false, error: 'Invalid theme selected' });
    }
    
    userData.name = name.trim();
    userData.joinDate = joinDate;
    if (theme) {
        userData.theme = theme;
    }
    
    res.json({ 
        success: true, 
        name: userData.name,
        joinDate: userData.joinDate,
        theme: userData.theme
    });
});

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

function makepage(title, content){
    let html = fs.readFileSync('template.html', 'utf-8');
    const header = fs.readFileSync('header.html', 'utf-8').replaceAll("title",title);
    const footer = fs.readFileSync('footer.html', 'utf-8');
    const contentData = fs.readFileSync(content, 'utf-8');
    
    // Apply theme to the page
    html = applyThemeToPage(html, userData.theme);
    
    html = html.replaceAll("paste header here", header);
    html = html.replaceAll("paste footer here", footer);
    html = html.replaceAll("paste title here", title);
    html = html.replaceAll("paste content here", contentData);
    return html;
}   

function makemain(title, content){
    let html = fs.readFileSync('template.html', 'utf-8');
    let mainHeader = fs.readFileSync('mainheader.html', 'utf-8');
    const footer = fs.readFileSync('footer.html', 'utf-8');
    const contentData = fs.readFileSync(content, 'utf-8');
    
    // Apply theme to the page
    html = applyThemeToPage(html, userData.theme);
    
    // Calculate days since join date
    const joinDateObj = new Date(userData.joinDate);
    const today = new Date();
    const diffTime = Math.abs(today - joinDateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Format join date
    const formattedDate = joinDateObj.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: '2-digit'
    });
    
    // Replace the name and stats in the header
    mainHeader = mainHeader.replaceAll('Joe Schmoe', userData.name);
    mainHeader = mainHeader.replaceAll('363 day streak • Joined 3/25/20', 
        `${diffDays} day streak • Joined ${formattedDate}`);
    
    // Apply theme colors
    mainHeader = applyThemeToHeader(mainHeader, userData.theme);
    
    html = html.replaceAll("paste header here", mainHeader);
    html = html.replaceAll("paste footer here", footer);
    html = html.replaceAll("paste title here", title);
    html = html.replaceAll("paste content here", contentData);
    return html;
}

function makemystress(title, content){
    let html = fs.readFileSync('template.html', 'utf-8');
    let mystressHeader = fs.readFileSync('mystressheader.html', 'utf-8');
    const footer = fs.readFileSync('footer.html', 'utf-8');
    const contentData = fs.readFileSync(content, 'utf-8');
    
    // Apply theme to the page
    html = applyThemeToPage(html, userData.theme);
    
    // Apply theme colors to the My Stress header
    mystressHeader = applyThemeToMystressHeader(mystressHeader, userData.theme);
    
    html = html.replaceAll("paste header here", mystressHeader);
    html = html.replaceAll("paste footer here", footer);
    html = html.replaceAll("paste title here", title);
    html = html.replaceAll("paste content here", contentData);
    return html;
}   

function makejournal(title, content){
    let html = fs.readFileSync('template.html', 'utf-8');
    let journalHeader = fs.readFileSync('journalheader.html', 'utf-8');
    const footer = fs.readFileSync('footer.html', 'utf-8');
    const contentData = fs.readFileSync(content, 'utf-8');
    
    // Apply theme to the page
    html = applyThemeToPage(html, userData.theme);
    
    // Apply theme colors to the Journal header
    journalHeader = applyThemeToJournalHeader(journalHeader, userData.theme);
    
    html = html.replaceAll("paste header here", journalHeader);
    html = html.replaceAll("paste footer here", footer);
    html = html.replaceAll("paste title here", title);
    html = html.replaceAll("paste content here", contentData);
    return html;
}   

function makeaboutme(title, content){
    let html = fs.readFileSync('template.html', 'utf-8');
    let aboutMeHeader = fs.readFileSync('aboutMeheader.html', 'utf-8');
    const footer = fs.readFileSync('footer.html', 'utf-8');
    const contentData = fs.readFileSync(content, 'utf-8');
    
    // Apply theme to the page
    html = applyThemeToPage(html, userData.theme);
    
    // Apply theme colors to the About Me header
    aboutMeHeader = applyThemeToAboutMeHeader(aboutMeHeader, userData.theme);
    
    html = html.replaceAll("paste header here", aboutMeHeader);
    html = html.replaceAll("paste footer here", footer);
    html = html.replaceAll("paste title here", title);
    html = html.replaceAll("paste content here", contentData);
    return html;
}

function makerelax(title, content){
    let html = fs.readFileSync('template.html', 'utf-8');
    let relaxHeader = fs.readFileSync('relaxheader.html', 'utf-8');
    const footer = fs.readFileSync('footer.html', 'utf-8');
    const contentData = fs.readFileSync(content, 'utf-8');
    
    // Apply theme to the page
    html = applyThemeToPage(html, userData.theme);
    
    // Apply theme colors to the Relax header
    relaxHeader = applyThemeToRelaxHeader(relaxHeader, userData.theme);
    
    html = html.replaceAll("paste header here", relaxHeader);
    html = html.replaceAll("paste footer here", footer);
    html = html.replaceAll("paste title here", title);
    html = html.replaceAll("paste content here", contentData);
    return html;
}

function applyThemeToHeader(headerHtml, theme) {
    const themes = {
        purple: {
            gradient: 'linear-gradient(180deg, #4a148c 0%, #6a1b9a 25%, #8e24aa 50%, #ab47bc 75%, #ce93d8 100%)',
            mountain1Start: '#311b92',
            mountain1End: '#512da8',
            mountain2Start: '#512da8', 
            mountain2End: '#673ab7',
            mountain3Start: '#673ab7',
            mountain3End: '#7986cb',
            overlay: 'linear-gradient(45deg, rgba(156, 39, 176, 0.3) 0%, rgba(103, 58, 183, 0.2) 50%, rgba(63, 81, 181, 0.1) 100%)'
        },
        green: {
            gradient: 'linear-gradient(180deg, #1b5e20 0%, #2e7d32 25%, #388e3c 50%, #4caf50 75%, #81c784 100%)',
            mountain1Start: '#0d4f0c',
            mountain1End: '#1b5e20',
            mountain2Start: '#1b5e20',
            mountain2End: '#2e7d32',
            mountain3Start: '#2e7d32',
            mountain3End: '#4caf50',
            overlay: 'linear-gradient(45deg, rgba(27, 94, 32, 0.3) 0%, rgba(46, 125, 50, 0.2) 50%, rgba(56, 142, 60, 0.1) 100%)'
        },
        blue: {
            gradient: 'linear-gradient(180deg, #0d47a1 0%, #1565c0 25%, #1976d2 50%, #2196f3 75%, #64b5f6 100%)',
            mountain1Start: '#0a3d91',
            mountain1End: '#0d47a1',
            mountain2Start: '#0d47a1',
            mountain2End: '#1565c0',
            mountain3Start: '#1565c0',
            mountain3End: '#1976d2',
            overlay: 'linear-gradient(45deg, rgba(13, 71, 161, 0.3) 0%, rgba(21, 101, 192, 0.2) 50%, rgba(25, 118, 210, 0.1) 100%)'
        },
        red: {
            gradient: 'linear-gradient(180deg, #b71c1c 0%, #c62828 25%, #d32f2f 50%, #e91e63 75%, #f48fb1 100%)',
            mountain1Start: '#8e0000',
            mountain1End: '#b71c1c',
            mountain2Start: '#b71c1c',
            mountain2End: '#c62828',
            mountain3Start: '#c62828',
            mountain3End: '#d32f2f',
            overlay: 'linear-gradient(45deg, rgba(183, 28, 28, 0.3) 0%, rgba(198, 40, 40, 0.2) 50%, rgba(211, 47, 47, 0.1) 100%)'
        }
    };
    
    const selectedTheme = themes[theme] || themes.purple;
    
    // Replace the main background gradient
    headerHtml = headerHtml.replace(
        /background: linear-gradient\(180deg[^;]+\);/,
        `background: ${selectedTheme.gradient};`
    );
    
    // Replace the overlay gradient
    headerHtml = headerHtml.replace(
        /linear-gradient\(45deg, rgba\([^)]+\)[^;]+\)/,
        selectedTheme.overlay
    );
    
    // Replace mountain gradient colors in the SVG
    headerHtml = headerHtml.replace(
        /stop-color:%23311b92/g, 
        `stop-color:%23${selectedTheme.mountain1Start.substring(1)}`
    );
    headerHtml = headerHtml.replace(
        /stop-color:%23512da8/g, 
        `stop-color:%23${selectedTheme.mountain1End.substring(1)}`
    );
    headerHtml = headerHtml.replace(
        /stop-color:%23673ab7/g, 
        `stop-color:%23${selectedTheme.mountain2End.substring(1)}`
    );
    headerHtml = headerHtml.replace(
        /stop-color:%237986cb/g, 
        `stop-color:%23${selectedTheme.mountain3End.substring(1)}`
    );
    
    // Replace the mountain gradient definitions
    headerHtml = headerHtml.replace(
        /%23512da8;stop-opacity:0\.8/g,
        `%23${selectedTheme.mountain2Start.substring(1)};stop-opacity:0.8`
    );
    headerHtml = headerHtml.replace(
        /%23673ab7;stop-opacity:0\.7/g,
        `%23${selectedTheme.mountain3Start.substring(1)};stop-opacity:0.7`
    );
    
    return headerHtml;
}

function applyThemeToMystressHeader(headerHtml, theme) {
    const themes = {
        purple: {
            gradient: 'linear-gradient(180deg, #4a148c 0%, #6a1b9a 25%, #8e24aa 50%, #ab47bc 75%, #ce93d8 100%)',
            mountain1Start: '#311b92',
            mountain1End: '#512da8',
            mountain2Start: '#512da8', 
            mountain2End: '#673ab7',
            mountain3Start: '#673ab7',
            mountain3End: '#7986cb',
            overlay: 'linear-gradient(45deg, rgba(156, 39, 176, 0.3) 0%, rgba(103, 58, 183, 0.2) 50%, rgba(63, 81, 181, 0.1) 100%)'
        },
        green: {
            gradient: 'linear-gradient(180deg, #1b5e20 0%, #2e7d32 25%, #388e3c 50%, #4caf50 75%, #81c784 100%)',
            mountain1Start: '#0d4f0c',
            mountain1End: '#1b5e20',
            mountain2Start: '#1b5e20',
            mountain2End: '#2e7d32',
            mountain3Start: '#2e7d32',
            mountain3End: '#4caf50',
            overlay: 'linear-gradient(45deg, rgba(27, 94, 32, 0.3) 0%, rgba(46, 125, 50, 0.2) 50%, rgba(56, 142, 60, 0.1) 100%)'
        },
        blue: {
            gradient: 'linear-gradient(180deg, #0d47a1 0%, #1565c0 25%, #1976d2 50%, #2196f3 75%, #64b5f6 100%)',
            mountain1Start: '#0a3d91',
            mountain1End: '#0d47a1',
            mountain2Start: '#0d47a1',
            mountain2End: '#1565c0',
            mountain3Start: '#1565c0',
            mountain3End: '#1976d2',
            overlay: 'linear-gradient(45deg, rgba(13, 71, 161, 0.3) 0%, rgba(21, 101, 192, 0.2) 50%, rgba(25, 118, 210, 0.1) 100%)'
        },
        red: {
            gradient: 'linear-gradient(180deg, #b71c1c 0%, #c62828 25%, #d32f2f 50%, #e91e63 75%, #f48fb1 100%)',
            mountain1Start: '#8e0000',
            mountain1End: '#b71c1c',
            mountain2Start: '#b71c1c',
            mountain2End: '#c62828',
            mountain3Start: '#c62828',
            mountain3End: '#d32f2f',
            overlay: 'linear-gradient(45deg, rgba(183, 28, 28, 0.3) 0%, rgba(198, 40, 40, 0.2) 50%, rgba(211, 47, 47, 0.1) 100%)'
        }
    };
    
    const selectedTheme = themes[theme] || themes.purple;
    
    // Replace the main background gradient
    headerHtml = headerHtml.replace(
        /background: linear-gradient\(180deg[^;]+\);/,
        `background: ${selectedTheme.gradient};`
    );
    
    // Replace the overlay gradient
    headerHtml = headerHtml.replace(
        /linear-gradient\(45deg, rgba\([^)]+\)[^;]+\)/,
        selectedTheme.overlay
    );
    
    // Replace mountain gradient colors in the SVG
    headerHtml = headerHtml.replace(
        /stop-color:%23311b92/g, 
        `stop-color:%23${selectedTheme.mountain1Start.substring(1)}`
    );
    headerHtml = headerHtml.replace(
        /stop-color:%23512da8/g, 
        `stop-color:%23${selectedTheme.mountain1End.substring(1)}`
    );
    headerHtml = headerHtml.replace(
        /stop-color:%23673ab7/g, 
        `stop-color:%23${selectedTheme.mountain2End.substring(1)}`
    );
    headerHtml = headerHtml.replace(
        /stop-color:%237986cb/g, 
        `stop-color:%23${selectedTheme.mountain3End.substring(1)}`
    );
    
    // Replace the mountain gradient definitions
    headerHtml = headerHtml.replace(
        /%23512da8;stop-opacity:0\.8/g,
        `%23${selectedTheme.mountain2Start.substring(1)};stop-opacity:0.8`
    );
    headerHtml = headerHtml.replace(
        /%23673ab7;stop-opacity:0\.7/g,
        `%23${selectedTheme.mountain3Start.substring(1)};stop-opacity:0.7`
    );
    
    return headerHtml;
}

function applyThemeToJournalHeader(headerHtml, theme) {
    const themes = {
        purple: {
            gradient: 'linear-gradient(180deg, #4a148c 0%, #6a1b9a 25%, #8e24aa 50%, #ab47bc 75%, #ce93d8 100%)',
            mountain1Start: '#311b92',
            mountain1End: '#512da8',
            mountain2Start: '#512da8', 
            mountain2End: '#673ab7',
            mountain3Start: '#673ab7',
            mountain3End: '#7986cb',
            overlay: 'linear-gradient(45deg, rgba(156, 39, 176, 0.3) 0%, rgba(103, 58, 183, 0.2) 50%, rgba(63, 81, 181, 0.1) 100%)'
        },
        green: {
            gradient: 'linear-gradient(180deg, #1b5e20 0%, #2e7d32 25%, #388e3c 50%, #4caf50 75%, #81c784 100%)',
            mountain1Start: '#0d4f0c',
            mountain1End: '#1b5e20',
            mountain2Start: '#1b5e20',
            mountain2End: '#2e7d32',
            mountain3Start: '#2e7d32',
            mountain3End: '#4caf50',
            overlay: 'linear-gradient(45deg, rgba(27, 94, 32, 0.3) 0%, rgba(46, 125, 50, 0.2) 50%, rgba(56, 142, 60, 0.1) 100%)'
        },
        blue: {
            gradient: 'linear-gradient(180deg, #0d47a1 0%, #1565c0 25%, #1976d2 50%, #2196f3 75%, #64b5f6 100%)',
            mountain1Start: '#0a3d91',
            mountain1End: '#0d47a1',
            mountain2Start: '#0d47a1',
            mountain2End: '#1565c0',
            mountain3Start: '#1565c0',
            mountain3End: '#1976d2',
            overlay: 'linear-gradient(45deg, rgba(13, 71, 161, 0.3) 0%, rgba(21, 101, 192, 0.2) 50%, rgba(25, 118, 210, 0.1) 100%)'
        },
        red: {
            gradient: 'linear-gradient(180deg, #b71c1c 0%, #c62828 25%, #d32f2f 50%, #e91e63 75%, #f48fb1 100%)',
            mountain1Start: '#8e0000',
            mountain1End: '#b71c1c',
            mountain2Start: '#b71c1c',
            mountain2End: '#c62828',
            mountain3Start: '#c62828',
            mountain3End: '#d32f2f',
            overlay: 'linear-gradient(45deg, rgba(183, 28, 28, 0.3) 0%, rgba(198, 40, 40, 0.2) 50%, rgba(211, 47, 47, 0.1) 100%)'
        }
    };
    
    const selectedTheme = themes[theme] || themes.purple;
    
    // Replace the main background gradient
    headerHtml = headerHtml.replace(
        /background: linear-gradient\(180deg[^;]+\);/,
        `background: ${selectedTheme.gradient};`
    );
    
    // Replace the overlay gradient
    headerHtml = headerHtml.replace(
        /linear-gradient\(45deg, rgba\([^)]+\)[^;]+\)/,
        selectedTheme.overlay
    );
    
    // Replace mountain gradient colors in the SVG
    headerHtml = headerHtml.replace(
        /stop-color:%23311b92/g, 
        `stop-color:%23${selectedTheme.mountain1Start.substring(1)}`
    );
    headerHtml = headerHtml.replace(
        /stop-color:%23512da8/g, 
        `stop-color:%23${selectedTheme.mountain1End.substring(1)}`
    );
    headerHtml = headerHtml.replace(
        /stop-color:%23673ab7/g, 
        `stop-color:%23${selectedTheme.mountain2End.substring(1)}`
    );
    headerHtml = headerHtml.replace(
        /stop-color:%237986cb/g, 
        `stop-color:%23${selectedTheme.mountain3End.substring(1)}`
    );
    
    // Replace the mountain gradient definitions
    headerHtml = headerHtml.replace(
        /%23512da8;stop-opacity:0\.8/g,
        `%23${selectedTheme.mountain2Start.substring(1)};stop-opacity:0.8`
    );
    headerHtml = headerHtml.replace(
        /%23673ab7;stop-opacity:0\.7/g,
        `%23${selectedTheme.mountain3Start.substring(1)};stop-opacity:0.7`
    );
    
    return headerHtml;
}

function applyThemeToAboutMeHeader(headerHtml, theme) {
    const themes = {
        purple: {
            gradient: 'linear-gradient(180deg, #4a148c 0%, #6a1b9a 25%, #8e24aa 50%, #ab47bc 75%, #ce93d8 100%)',
            mountain1Start: '#311b92',
            mountain1End: '#512da8',
            mountain2Start: '#512da8', 
            mountain2End: '#673ab7',
            mountain3Start: '#673ab7',
            mountain3End: '#7986cb',
            overlay: 'linear-gradient(45deg, rgba(156, 39, 176, 0.3) 0%, rgba(103, 58, 183, 0.2) 50%, rgba(63, 81, 181, 0.1) 100%)'
        },
        green: {
            gradient: 'linear-gradient(180deg, #1b5e20 0%, #2e7d32 25%, #388e3c 50%, #4caf50 75%, #81c784 100%)',
            mountain1Start: '#0d4f0c',
            mountain1End: '#1b5e20',
            mountain2Start: '#1b5e20',
            mountain2End: '#2e7d32',
            mountain3Start: '#2e7d32',
            mountain3End: '#4caf50',
            overlay: 'linear-gradient(45deg, rgba(27, 94, 32, 0.3) 0%, rgba(46, 125, 50, 0.2) 50%, rgba(56, 142, 60, 0.1) 100%)'
        },
        blue: {
            gradient: 'linear-gradient(180deg, #0d47a1 0%, #1565c0 25%, #1976d2 50%, #2196f3 75%, #64b5f6 100%)',
            mountain1Start: '#0a3d91',
            mountain1End: '#0d47a1',
            mountain2Start: '#0d47a1',
            mountain2End: '#1565c0',
            mountain3Start: '#1565c0',
            mountain3End: '#1976d2',
            overlay: 'linear-gradient(45deg, rgba(13, 71, 161, 0.3) 0%, rgba(21, 101, 192, 0.2) 50%, rgba(25, 118, 210, 0.1) 100%)'
        },
        red: {
            gradient: 'linear-gradient(180deg, #b71c1c 0%, #c62828 25%, #d32f2f 50%, #e91e63 75%, #f48fb1 100%)',
            mountain1Start: '#8e0000',
            mountain1End: '#b71c1c',
            mountain2Start: '#b71c1c',
            mountain2End: '#c62828',
            mountain3Start: '#c62828',
            mountain3End: '#d32f2f',
            overlay: 'linear-gradient(45deg, rgba(183, 28, 28, 0.3) 0%, rgba(198, 40, 40, 0.2) 50%, rgba(211, 47, 47, 0.1) 100%)'
        }
    };
    
    const selectedTheme = themes[theme] || themes.purple;
    
    // Replace the main background gradient
    headerHtml = headerHtml.replace(
        /background: linear-gradient\(180deg[^;]+\);/,
        `background: ${selectedTheme.gradient};`
    );
    
    // Replace the overlay gradient
    headerHtml = headerHtml.replace(
        /linear-gradient\(45deg, rgba\([^)]+\)[^;]+\)/,
        selectedTheme.overlay
    );
    
    // Replace mountain gradient colors in the SVG
    headerHtml = headerHtml.replace(
        /stop-color:%23311b92/g, 
        `stop-color:%23${selectedTheme.mountain1Start.substring(1)}`
    );
    headerHtml = headerHtml.replace(
        /stop-color:%23512da8/g, 
        `stop-color:%23${selectedTheme.mountain1End.substring(1)}`
    );
    headerHtml = headerHtml.replace(
        /stop-color:%23673ab7/g, 
        `stop-color:%23${selectedTheme.mountain2End.substring(1)}`
    );
    headerHtml = headerHtml.replace(
        /stop-color:%237986cb/g, 
        `stop-color:%23${selectedTheme.mountain3End.substring(1)}`
    );
    
    // Replace the mountain gradient definitions
    headerHtml = headerHtml.replace(
        /%23512da8;stop-opacity:0\.8/g,
        `%23${selectedTheme.mountain2Start.substring(1)};stop-opacity:0.8`
    );
    headerHtml = headerHtml.replace(
        /%23673ab7;stop-opacity:0\.7/g,
        `%23${selectedTheme.mountain3Start.substring(1)};stop-opacity:0.7`
    );
    
    return headerHtml;
}

function applyThemeToRelaxHeader(headerHtml, theme) {
    const themes = {
        purple: {
            gradient: 'linear-gradient(180deg, #4a148c 0%, #6a1b9a 25%, #8e24aa 50%, #ab47bc 75%, #ce93d8 100%)',
            mountain1Start: '#311b92',
            mountain1End: '#512da8',
            mountain2Start: '#512da8', 
            mountain2End: '#673ab7',
            mountain3Start: '#673ab7',
            mountain3End: '#7986cb',
            overlay: 'linear-gradient(45deg, rgba(156, 39, 176, 0.3) 0%, rgba(103, 58, 183, 0.2) 50%, rgba(63, 81, 181, 0.1) 100%)'
        },
        green: {
            gradient: 'linear-gradient(180deg, #1b5e20 0%, #2e7d32 25%, #388e3c 50%, #4caf50 75%, #81c784 100%)',
            mountain1Start: '#0d4f0c',
            mountain1End: '#1b5e20',
            mountain2Start: '#1b5e20',
            mountain2End: '#2e7d32',
            mountain3Start: '#2e7d32',
            mountain3End: '#4caf50',
            overlay: 'linear-gradient(45deg, rgba(27, 94, 32, 0.3) 0%, rgba(46, 125, 50, 0.2) 50%, rgba(56, 142, 60, 0.1) 100%)'
        },
        blue: {
            gradient: 'linear-gradient(180deg, #0d47a1 0%, #1565c0 25%, #1976d2 50%, #2196f3 75%, #64b5f6 100%)',
            mountain1Start: '#0a3d91',
            mountain1End: '#0d47a1',
            mountain2Start: '#0d47a1',
            mountain2End: '#1565c0',
            mountain3Start: '#1565c0',
            mountain3End: '#1976d2',
            overlay: 'linear-gradient(45deg, rgba(13, 71, 161, 0.3) 0%, rgba(21, 101, 192, 0.2) 50%, rgba(25, 118, 210, 0.1) 100%)'
        },
        red: {
            gradient: 'linear-gradient(180deg, #b71c1c 0%, #c62828 25%, #d32f2f 50%, #e91e63 75%, #f48fb1 100%)',
            mountain1Start: '#8e0000',
            mountain1End: '#b71c1c',
            mountain2Start: '#b71c1c',
            mountain2End: '#c62828',
            mountain3Start: '#c62828',
            mountain3End: '#d32f2f',
            overlay: 'linear-gradient(45deg, rgba(183, 28, 28, 0.3) 0%, rgba(198, 40, 40, 0.2) 50%, rgba(211, 47, 47, 0.1) 100%)'
        }
    };
    
    const selectedTheme = themes[theme] || themes.purple;
    
    // Replace the main background gradient
    headerHtml = headerHtml.replace(
        /background: linear-gradient\(180deg[^;]+\);/,
        `background: ${selectedTheme.gradient};`
    );
    
    // Replace the overlay gradient
    headerHtml = headerHtml.replace(
        /linear-gradient\(45deg, rgba\([^)]+\)[^;]+\)/,
        selectedTheme.overlay
    );
    
    // Replace mountain gradient colors in the SVG
    headerHtml = headerHtml.replace(
        /stop-color:%23311b92/g, 
        `stop-color:%23${selectedTheme.mountain1Start.substring(1)}`
    );
    headerHtml = headerHtml.replace(
        /stop-color:%23512da8/g, 
        `stop-color:%23${selectedTheme.mountain1End.substring(1)}`
    );
    headerHtml = headerHtml.replace(
        /stop-color:%23673ab7/g, 
        `stop-color:%23${selectedTheme.mountain2End.substring(1)}`
    );
    headerHtml = headerHtml.replace(
        /stop-color:%237986cb/g, 
        `stop-color:%23${selectedTheme.mountain3End.substring(1)}`
    );
    
    // Replace the mountain gradient definitions
    headerHtml = headerHtml.replace(
        /%23512da8;stop-opacity:0\.8/g,
        `%23${selectedTheme.mountain2Start.substring(1)};stop-opacity:0.8`
    );
    headerHtml = headerHtml.replace(
        /%23673ab7;stop-opacity:0\.7/g,
        `%23${selectedTheme.mountain3Start.substring(1)};stop-opacity:0.7`
    );
    
    return headerHtml;
}

function applyThemeToPage(html, theme) {
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
    
    const selectedTheme = themeVariables[theme] || themeVariables.purple;
    
    // Create theme-specific CSS variables
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
    
    /* Settings button theme colors */
    .settings-button, .save-button {
        background: linear-gradient(135deg, ${selectedTheme.primaryColor}, ${selectedTheme.darkColor}) !important;
    }
    
    .settings-button:hover, .save-button:hover {
        background: linear-gradient(135deg, ${selectedTheme.darkColor}, ${selectedTheme.primaryColor}) !important;
    }
    
    /* Theme-specific accent colors */
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
    
    /* Navigation colors */
    #Relax, #myStress, #Journal, #aboutMe {
        color: ${selectedTheme.primaryColor} !important;
    }
    
    #Home {
        background-color: ${selectedTheme.lightColor} !important;
    }
    </style>`;
    
    // Insert theme CSS before the closing </head> tag
    html = html.replace('</head>', themeCSS + '\n</head>');
    
    return html;
}

function getThemeVariables(theme) {
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
    
    return themeVariables[theme] || themeVariables.purple;
}