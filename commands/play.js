const request = require('request');
const ytdl = require('ytdl-core');

module.exports = {
    handler: function (args, msg, client, state) {
        if(args && args.length === 1) {
            let url = args[0];
            let voiceChannels = msg.guild.channels.filter(channel => channel.type === 'voice' && channel.members.size > 0);
            let targetChannel = voiceChannels.find(vc => vc.members.find('id', msg.author.id));
            if(targetChannel) {
                targetChannel.join().then((connection) => {
                    state.voiceConnection = connection;
                    state.joinedChannel = targetChannel;
                    console.log('Voice channel join successful.');
                    try {
                        if(url.indexOf('youtube') !== -1 || url.indexOf('youtu.be') !== -1) {
                            state.stream = ytdl(url, {filter : 'audioonly'});
                        } else {
                            state.stream = request(url);
                        }

                        let streamOptions = { volume: state.volume || 1, seek: 25 };
                        state.dispatcher = connection.playStream(state.stream, streamOptions);
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