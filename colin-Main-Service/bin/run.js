'use strict'

const service = require('../server/service');
const http = require('http');
const slackClient = require('../server/slackClient')
const server = http.createServer(service);

const witToken = 'MNP62HZWR4DOT7ER2SL5A7JAYIJM2YST';
const witClient = require('../server/witClient')(witToken);

const slackToken = 'xoxb-202999420963-362770001236-Ni23DimeVPca6FZC6Wp67VQA';
const slackLogLevel = 'verbose';

const serviceRegistry = service.get(`serviceRegistry`);
const rtm = slackClient.init(slackToken, slackLogLevel, witClient, serviceRegistry);
rtm.start();

slackClient.addAuthenticatedHadler(rtm, () => server.listen(3000));

server.on('listening', function () {
    console.log(`Colin is listening on ${server.address().port} in ${service.get('env')} mode.`);
});

