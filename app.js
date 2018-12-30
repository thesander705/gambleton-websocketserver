const http = require('http');
const fs = require('fs');
const request = require('request');
const API_SERVER = 'http://localhost:8080';

// Loading the index file . html displayed to the client
const server = http.createServer(function (req, res) {
    fs.readFile('./index.html', 'utf-8', function (error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});
const io = require('socket.io').listen(server);

// Loading socket.io

// When a client connects, we note it in the console
io.sockets.on('connection', function (socket) {
    console.log('A client is connected!');

    socket.emit("client-connected", "client connected");


    socket.on('post-userByAuthToken', function (m) {
        postRequest("/userByAuthToken", m, socket, 'post-userByAuthToken');
    });

    socket.on('post-bets', function (m) {
        postRequestMessageAllSocketClients("/bets", m, 'post-bets');
    });
});

function postRequest(path, body, socket, event) {
    request.post(
        API_SERVER + path,
        { json: body },
        function (error, response, body) {
            if (!error) {
                socket.emit(event, body);
            }else{
                socket.emit(event, error);
            }
        }
    );
}function

postRequestMessageAllSocketClients(path, body, event) {
    request.post(
        API_SERVER + path,
        { json: body },
        function (error, response, body) {
            if (!error) {
                io.sockets.emit(event, body);
            }else{
                io.sockets.emit(event, error);
            }
        }
    );
}


server.listen(3000);