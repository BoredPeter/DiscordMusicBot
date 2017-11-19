const MusicPlayer = require('../MusicPlayer');

let musicPlayer = new MusicPlayer();

module.exports = {
    handler: function (args, msg, client, state) {

        if(args && args.length === 1) {
            let url = args[0];
            let voiceChannels = msg.guild.channels.filter(channel => channel.type === 'voice' && channel.members.size > 0);
            let targetChannel = voiceChannels.find(vc => vc.members.find('id', msg.author.id));
            if(targetChannel) {
                targetChannel.join().then((connection) => {
                    musicPlayer.playSong(url, connection);
                    state.voiceConnection = connection;
                    state.joinedChannel = targetChannel;
                    console.log('Voice channel join successful.');
                    try {



                        // state.dispatcher = connection.playFile('./EP1Fixed.mp3');
                        console.log('Playing youtube');
                        return state.stream;
                    } catch (ex) {
                        console.error(ex);
                    }

                }).catch(console.error);
            } else {
                // msg.reply('You must be in a voice channel to use me');
            }
        } else {
            // msg.reply('Please specify a url');
        }
    }
}