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
    } else {
        response.end('ERROR');
    }
console.log(request.url)
}

// This tells the server what to send the browser when the browser sends a request:
server.on('request', respondToRequestFromBrowser)

// This tells our server to listen to commands coming in from port 3000.  
server.listen(3000);