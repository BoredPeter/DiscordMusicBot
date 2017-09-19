const ytdl = require('ytdl-core');



module.exports = {
    name: 'yt',
    getStream: (url) => {
        return ytdl(url, {filter : 'audioonly'});
    }
}