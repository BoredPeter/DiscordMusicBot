const _ = require('lodash');

module.exports = {
    handler: function (args, msg, client, state) {
        if(msg.author.id === '168562692376756224') { //hank
            return;
        }
        if(args && args.length === 1) {
            let volume = parseFloat(args[0]);
            if(_.isFinite(volume)) {
                state.dispatcher.setVolume(volume);
                state.volume = volume;
            } else {
                // msg.reply('Volume must be a number');
            }
        } else {
            // msg.reply('Please specify a volume')
        }
    }
}