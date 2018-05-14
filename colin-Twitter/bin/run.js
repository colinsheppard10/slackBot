const http = require('http');
const superAgent = require('superAgent');
const express = require('express');
var fs = require('fs');
var readline = require('readline');

const exServer = express();

const server = http.createServer(exServer);

server.listen();
server.on('listening', function () {
    console.log('running on port ' + server.address().port);
    // announce ip address and port to main app
    superAgent.put(`http://127.0.0.1:3000/service/twitter/${server.address().port}`, function (err, res) {
    });
})

exServer.get('/', function (req, res) {
    lineReader = readline.createInterface({
        input: fs.createReadStream('./bin/kanyeTweets.txt')
    });

    lineReader.on('line', function (line) {
        console.log('Line from file:', line);
        res.json({ result: line });
    });
})

