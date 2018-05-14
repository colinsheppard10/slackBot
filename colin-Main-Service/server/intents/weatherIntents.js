const superAgent = require('superagent');

module.exports.process = function process(intentData, registry, cb) {
    const portNumber = null;

    const service = registry.get('weather');
    if (!service) {
        return cb(false, 'No service available');
    }
    superAgent.get(`http://${service.ip}:${service.port}`, (err, res) => {
        console.log(res.body.result);
        cb(null, res.body.result);
    });
}
