const superAgent = require('superagent');

module.exports.process = function process(intentData, registry, cb) {
    const portNumber = null;

    const service = registry.get('twitter');
    if (!service) {
        return cb(false, 'No service available');
    }
    superAgent.get(`http://${service.ip}:${service.port}/${intentData.message_subject[0].value}`, (err, res) => {
        console.log(res.body);
        cb(null, res.body);
    });
}