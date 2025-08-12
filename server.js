const express = require('express');
const app = express();
const path = require('path');

const fs = require('fs');
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
        const destress = makepage("My stress", "myStress.html");
        response.end(destress);
    } else if (request.url === "/journal"){
        const journal = makepage("Journal", "journal.html");
        response.end(journal);
    } else if (request.url === "/aboutMe"){
        const profile = makepage("About me", "aboutMe.html");
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
    const main = makepage("Main", "main.html");
    res.send(main);
});
app.get('/aboutMe', (req, res) => {
    const aboutMe = makepage("About me", "aboutMe.html");
    res.send(aboutMe);
});
app.get('/myStress', (req, res) => {
    const myStress = makepage("My stress", "myStress.html");
    res.send(myStress);
});
app.get('/relax', (req, res) => {
    const relax = makepage("Relax", "relax.html");
    res.send(relax);
});
app.get('/journal', (req, res) => {
    const journal = makepage("Journal", "journal.html");
    res.send(journal);
});
app.get('/template.css', (req, res) => {
    res.readFileSync('template.css', 'utf-8')});

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

function makepage(title, content){
    let html = fs.readFileSync('template.html', 'utf-8');
    const footer = fs.readFileSync('footer.html', 'utf-8');
    const contentData = fs.readFileSync(content, 'utf-8');
    html = html.replaceAll("paste footer here", footer);
    html = html.replaceAll("paste title here", title);
    html = html.replaceAll("paste content here", contentData);
    return html;
}