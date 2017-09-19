const Discord = require('discord.js');
const config = require('./config.json');
const request = require('request');
const _ = require('lodash');
const ytdl = require('ytdl-core');
var client = new Discord.Client();

let dispatcher, joinedChannel, stream;

client.on('message', msg => {
    if(msg.content.startsWith('!play')) {
        let args = msg.content.split(' ').slice(1);
        if(args && args.length === 1) {
            let url = args[0];
            let voiceChannels = msg.guild.channels.filter(channel => channel.type === 'voice' && channel.members.size > 0);
            let targetChannel = voiceChannels.find(vc => vc.members.find('id', msg.author.id));
            if(targetChannel) {
                targetChannel.join().then((connection) => {
                    joinedChannel = targetChannel;
                    console.log('Voice channel join successful.');
                    try {
                        if(url.indexOf('youtube') !== -1 || url.indexOf('youtu.be') !== -1) {
                            stream = ytdl(url, {filter : 'audioonly'});
                        } else {
                            stream = request(url);
                        }
                        dispatcher = connection.playStream(stream);
                        // dispatcher = connection.playFile('./EP1Fixed.mp3');
                        console.log('Playing youtube');
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
    if(msg.content.startsWith('!volume')) {
        let args = msg.content.split(' ').slice(1);
        if(args && args.length === 1) {
            let volume = parseFloat(args[0]);
            if(_.isFinite(volume)) {
                dispatcher.setVolume(volume);
            } else {
                // msg.reply('Volume must be a number');
            }
        } else {
            // msg.reply('Please specify a volume')
        }
    }

    if(msg.content.startsWith('!stop')) {
      if(dispatcher && dispatcher.end) {
          dispatcher.end();
      }
    }

    if(msg.content.startsWith('!pause')) {
        if(dispatcher && dispatcher.pause) {
            dispatcher.pause();
        }
      }

      if(msg.content.startsWith('!resume')) {
        if(dispatcher && dispatcher.resume) {
            dispatcher.resume();
        }
      }

    if (msg.content === '!ping') {
      msg.reply('Pong!');
    }
  });

client.on('ready', () => {
    // console.log('client data', client);
    // let voiceChannels = client.channels.filter(channel => channel.type === 'voice');
    // targetChannel = voiceChannels.find('name', config.channelName);
    // console.log(voiceChannels.map(channel => channel.name));
    // console.log('Target Channel', targetChannel.name);
    // if(targetChannel) {
    //     targetChannel.join().then((connection) => {
    //         console.log('Voice channel join successful.');
    //         // const stream = ytdl(config.youtubeUrl, {filter : 'audioonly'});
    //         const stream = request('https://s102.podbean.com/pb/90c8366a813a6165bcf2e7a8d0b0b1f9/59c05bf2/data3/fs3/988635/uploads/80_full_ep_mixdown.mp3');
    //         dispatcher = connection.playStream(stream);
    //         // dispatcher = connection.playFile('./EP1Fixed.mp3');
    //         dispatcher.setVolume(1);
    //         console.log('Playing youtube');

    //     }).catch(console.error);
    // }
})


client.login(config.user.token)
      .then((value) => {
          console.log('Successfully Logged in!', value);
      })
      .catch((reason) => {
          console.error(reason);
      });


process.on('SIGINT', function() {
    console.log("Caught interrupt signal");

    if(dispatcher) {
        dispatcher.end();
    }
    if(joinedChannel) {
        joinedChannel.leave();
    }

    process.exit();

});