// const express = require('express');
// const app = express();
// const path = require('path');
const http = require('http');

const fs = require('fs');
// This line of code creates the web server and puts it into a variable called server:
const server = http.createServer();

// A function that will handle responding to requests made by the browser
function respondToRequestFromBrowser(request, response) {
    // This is how we are responding to the browser
    if (request.url === "/eeg"){
        const html = fs.readFileSync('eeg.html', 'utf-8'); 
        response.end(html);
    } else if (request.url.endsWith(".png")){
        const png = fs.readFileSync(request.url.replace("/", ""));
        response.end(png);
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
    } else if (request.url === "/calendar"){
        const calendar = makepage("Calendar", "calendar.html");
        response.end(calendar);
    } else if (request.url === "/destress"){
        const destress = makepage("Destress", "destress.html");
        response.end(destress);
    } else if (request.url === "/journal"){
        const journal = makepage("Journal", "journal.html");
        response.end(journal);
    } else if (request.url === "/profile"){
        const profile = makepage("Profile", "profile.html");
        response.end(profile);
    } else if (request.url === "/data"){
        const profile = makepage("Data", "data.html");
        response.end(profile);
    } else if (request.url === "/template.css"){
        const css = fs.readFileSync('template.css', 'utf-8');
response.end(css);
    } else {
        response.end('ERROR');
    }
console.log(request.url)
}

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'home.html'));
// });

// app.get('/calendar', (req, res) => {
//     res.sendFile(path.join(__dirname, 'calendar.html'));
// });

// app.get('/journal', (req, res) => {
//     res.sendFile(path.join(__dirname, 'journal.html'));
// });

// app.get('/phone', (req, res) => {
//     res.sendFile(path.join(__dirname, 'phone.html'));
// });

// app.get('/lotus', (req, res) => {
//     res.sendFile(path.join(__dirname, 'lotus.html'));
// });
server.on('request', respondToRequestFromBrowser)
server.listen(3000);

function makepage(title, content){
    let html = fs.readFileSync('template.html', 'utf-8');
    const footer = fs.readFileSync('footer.html', 'utf-8');
    const contentData = fs.readFileSync(content, 'utf-8');
    html = html.replaceAll("paste footer here", footer);
    html = html.replaceAll("paste title here", title);
    html = html.replaceAll("paste content here", contentData);
    return html;
}