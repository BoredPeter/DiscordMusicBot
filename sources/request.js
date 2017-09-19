const request = require('request');

module.exports = {
    name: 'request',
    getStream: (url) => {
        return request(url);
    }
}