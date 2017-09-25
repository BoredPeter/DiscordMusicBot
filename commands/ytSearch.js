const play = require('./play');
const _ = require('lodash');
const config = require('../config.json');

var search = require('youtube-search');

const opts = {
 maxResults: 10,
 key: config.youtubeApiKey
};



module.exports = {
    handler: function (args, msg, client, state) {
        if(args && args.length > 0) {
            let searchTerm = args.join(' ');
            console.log('Searching for ', searchTerm);
            search(searchTerm, opts, function(err, results) {
                if(err) return console.error(err);
                console.log('Results: ', results);
                let video = _.find(results, {kind: 'youtube#video'});
                if(video) {
                    play.handler([video.link], msg, client, state);
                }
            });
        }
    }
}