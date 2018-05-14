const http = require('http');
const superAgent = require('superAgent');
const express = require('express');
const twitter = require('twitter');
var twit = new twitter({
    consumer_key: 'uJIZ3f3dOLFViEhCdwkzbN6aO',
    consumer_secret: 'dAvGqDTq5YlrlDlm4Xwbe58EXfgI83c62pHERnqsFBOt8WZYtc',
    access_token_key: '2291974040-yCtNUVgPhB07TUj3dMEZQiM76S9HBfT0FmvWnUJ',
    access_token_secret: 'yhfqK3QgoNWcEHoyp90PnV0TvccsHJoY4gOLsLW6jiQEs'
});

const exServer = express();

const server = http.createServer(exServer);

server.listen();
server.on('listening', function () {
    console.log('running on port ' + server.address().port);
    // announce ip address and port to main app
    superAgent.put(`http://127.0.0.1:3000/service/twitter/${server.address().port}`, function (err, res) {
    });
})

exServer.get('/:subject', function (req, res) {
    twit.get('search/tweets', { q: req.params.subject }, function (error, tweets, response) {
        console.log(tweets.statuses[0].text);
        res.json(tweets.statuses[0].text);
    });
})
