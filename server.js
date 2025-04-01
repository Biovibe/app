// http is a library of code built into NodeJS that handles communication with any browser that is sending it commands
let heartbeat = 0
const http = require('http');

// This line of code creates the web server and puts it into a variable called server:
const server = http.createServer();

// A function that will handle responding to requests made by the browser
function respondToRequestFromBrowser(request, response) {
    const fs = require('fs')
    // This is how we are responding to the browser
    if (request.url === "/my_model/model.json"){
        const html = fs.readFileSync('my_model/model.json', 'utf-8'); 
        response.end(html);
    }
    else if (request.url === "/my_model/metadata.json"){
        const html = fs.readFileSync('my_model/metadata.json', 'utf-8'); 
        response.end(html);
    }
    else if (request.url === "/my_model/weights.bin"){
        const html = fs.readFileSync('my_model/weights.bin', 'utf-8'); 
        response.end(html);
    }
    else if (request.url === "/ai"){
        const html = fs.readFileSync('ai.html', 'utf-8'); 
        response.end(html);
    }
    else if (request.url === "/eeg"){
        const html = fs.readFileSync('eeg.html', 'utf-8'); 
        response.end(html);
    }
    else if (request.url === "/heartrate"){
        const bpm = heartbeat;
        console.log('SERVER BPM: ' + bpm)
        response.end(bpm + '')
    }
    //load beats per minute webpage ^^^
    else {
        response.end('ERROR');
    }

}

// This tells the server what to send the browser when the browser sends a request:
server.on('request', respondToRequestFromBrowser)

// This tells our server to listen to commands coming in from port 3000.  
server.listen(3000);

//fix weights.bin


// var rpio = require('rpio');

// rpio.spiBegin();
// rpio.spiChipSelect(0);                  
// rpio.spiSetCSPolarity(0, rpio.LOW);    
// rpio.spiSetClockDivider(128);
// rpio.spiSetDataMode(3);

// var outBytes = Buffer.from([0x01, 0x80, 0x00]);
// var inBytes = Buffer.alloc(3);
// var out;
// var i = 0;

// setInterval(() => {
//         rpio.spiTransfer(outBytes, inBytes, outBytes.length);
//         out = inBytes[1] << 8;
//         out |= inBytes[2];
//         heartbeat = calculateBpm(out);
//         // if (i++ > 100) {
//         //         rpio.spiEnd();
//         //         setTimeout(process.exit, 1);
//         // }
// }, 100)

// var previous = 0;
// var start = new Date();
// var end = 0;
// var bpm = 0;
// var time = 0;

// function calculateBpm(out){
//     if (out > 750 && previous < 750) {
//         end = new Date();
//         time  = end - start;
//         start = end;
//         bpm = 60 / (time / 1000);
//         console.log(parseInt(bpm));
//     }
//     previous = out;
//     return parseInt(bpm);
// }




// /*
// 1. Get number
// 2. Check if number goes over 750 and check number before if 
// function was going up or down
// 3. Divide by 10 
// */