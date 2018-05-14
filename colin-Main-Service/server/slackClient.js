'use strict';
var RtmClient = require('@slack/client').RtmClient;
const CLIENT_EVENT = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENT = require('@slack/client').RTM_EVENTS;

let rtm = null;
let nlp = null;
let registry = null;

function handleOnAuthenticated(rtmStartData) {
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}

function addAuthenticatedHadler(rtm, handler) {
    rtm.on(CLIENT_EVENT.RTM.AUTHENTICATED, handler);
}

function handleOnMessage(message) {
    if (message.text.toLowerCase().includes('colin')) {
        nlp.ask(message.text, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            try {
                if (!res.intent || !res.intent[0] || !res.intent[0].value) {
                    throw new Error("Could not extract intent");
                }
                const intentWorker = require('./intents/' + res.intent[0].value + 'Intents');
                intentWorker.process(res, registry, function (error, response) {
                    if (error) {
                        console.log(error.message);
                        return;
                    }
                    return rtm.sendMessage(response, message.channel);
                })
            } catch (err) {
                console.log(err);
                console.log(res);
                rtm.sendMessage("sorry i did not understand the question", message.channel);
            }
        });
    }
}

module.exports.init = function slackClient(token, logLevel, nlpClient, serviceRegistry) {
    rtm = new RtmClient(token, { logLevel: logLevel });
    nlp = nlpClient;
    registry = serviceRegistry;
    addAuthenticatedHadler(rtm, handleOnAuthenticated);
    rtm.on(RTM_EVENT.MESSAGE, handleOnMessage);
    return rtm;
}

module.exports.addAuthenticatedHadler = addAuthenticatedHadler;