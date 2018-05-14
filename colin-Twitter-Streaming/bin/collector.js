const server = require('express')();
const twitter = require('twitter');
var fs = require('fs');

var twit = new twitter({
    consumer_key: 'uJIZ3f3dOLFViEhCdwkzbN6aO',
    consumer_secret: 'dAvGqDTq5YlrlDlm4Xwbe58EXfgI83c62pHERnqsFBOt8WZYtc',
    access_token_key: '2291974040-yCtNUVgPhB07TUj3dMEZQiM76S9HBfT0FmvWnUJ',
    access_token_secret: 'yhfqK3QgoNWcEHoyp90PnV0TvccsHJoY4gOLsLW6jiQEs'
});

server.listen(8080, () => {
    console.log('listening on port 8080');
    twit.stream('statuses/filter', { 'track': 'kanye' }, function (stream) {
        stream.on('data', function (data) {
            console.log(data);
            var jsonData = JSON.stringify(data.text);
            fs.writeFile("./kanyeTweets.txt", jsonData, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
        });
    });
});