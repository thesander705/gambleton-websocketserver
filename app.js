const http = require('http');
const fs = require('fs');

// Loading the index file . html displayed to the client
const server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});
const io = require('socket.io').listen(server);

// Loading socket.io

// When a client connects, we note it in the console
io.sockets.on('connection', function (socket) {
    console.log('A client is connected!');
});


server.listen(3000);