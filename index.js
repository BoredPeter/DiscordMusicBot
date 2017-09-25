const Discord = require('discord.js');
const config = require('./config.json');
const _ = require('lodash');
const commands = require('./commands');
var client = new Discord.Client();

let state = {

};

client.on('message', msg => {
    let args = msg.content.split(' ');
    if(commands.hasOwnProperty(args[0])) {
        commands[args[0]].handler(args.slice(1), msg, client, state);
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
    //         state.dispatcher = connection.playStream(stream);
    //         // state.dispatcher = connection.playFile('./EP1Fixed.mp3');
    //         state.dispatcher.setVolume(1);
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

    if(state.dispatcher) {
        state.dispatcher.end();
    }
    if(state.joinedChannel) {
        state.joinedChannel.leave();
    }

    process.exit();

});