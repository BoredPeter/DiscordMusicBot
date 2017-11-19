const play = require('./play');
const volume = require('./volume');
const stop = require('./stop');
const pause = require('./pause');
const seek = require('./seek');
const next = require('./next');
const resume = require('./resume');
const ytSearch = require('./ytSearch');

module.exports = {
    '!play': play,
    '!yt': ytSearch,
    '!volume': volume,
    '!stop': stop,
    '!seek': seek,
    '!next': next,
    '!pause': pause,
    '!resume': resume
}