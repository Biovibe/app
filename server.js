// const express = require('express');
// const app = express();
// const path = require('path');
const http = require('http');


// This line of code creates the web server and puts it into a variable called server:
const server = http.createServer();

// A function that will handle responding to requests made by the browser
function respondToRequestFromBrowser(request, response) {
    const fs = require('fs')
    // This is how we are responding to the browser
    if (request.url === "/eeg"){
        const html = fs.readFileSync('eeg.html', 'utf-8'); 
        response.end(html);
    } else if (request.url.endsWith(".png")){
        const png = fs.readFileSync(request.url.replace("/", ""));
        response.end(png);
    } else if (request.url === "/home"){
        const html = fs.readFileSync('home.html', 'utf-8');
        response.end(html);
    } else if (request.url === "/user"){
        const html = fs.readFileSync('user.html', 'utf-8');
        response.end(html);
    } else if (request.url === "/phone"){
        const html = fs.readFileSync('phone.html', 'utf-8');
        response.end(html);
    } else if (request.url === "/lotus"){
        const html = fs.readFileSync('lotus.html', 'utf-8');
        response.end(html);
    } else if (request.url === "/calendar"){
        const html = fs.readFileSync('calendar.html', 'utf-8');
        response.end(html);
    } else if (request.url === "/destress"){
        const html = fs.readFileSync('Destress.html', 'utf-8'); 
        response.end(html);
    } else if (request.url === "/journal"){
            const html = fs.readFileSync('Journal.html', 'utf-8'); 
            response.end(html);
    } else if (request.url === "/profile"){
            const html = fs.readFileSync('Profile.html', 'utf-8'); 
            response.end(html);
    } else if (request.url === "/journal1"){
            const html = fs.readFileSync('journal1.html', 'utf-8'); 
            response.end(html);
    } else {
        response.end('ERROR');
    }
console.log(request.url)
}

server.on('request', respondToRequestFromBrowser);
server.listen(3000);

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
// })