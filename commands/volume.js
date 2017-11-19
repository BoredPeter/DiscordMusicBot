const _ = require('lodash');

const MusicPlayer = require('../MusicPlayer');

let musicPlayer = new MusicPlayer();

module.exports = {
    handler: function (args, msg, client, state) {
        if(msg.author.id === '168562692376756224') { //hank
            return;
        }
        if(args && args.length === 1) {
            let volume = parseFloat(args[0]);
            if(_.isFinite(volume)) {
                musicPlayer.setVolume(volume);
            } else {
                // msg.reply('Volume must be a number');
            }
        } else {
            // msg.reply('Please specify a volume')
        }
    }
}