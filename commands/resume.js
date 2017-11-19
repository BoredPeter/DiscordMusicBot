const MusicPlayer = require('../MusicPlayer');

let musicPlayer = new MusicPlayer();

module.exports = {
    handler: function (args, msg, client, state) {
        musicPlayer.resume();
    }
}