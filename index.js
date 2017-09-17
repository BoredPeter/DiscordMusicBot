const Discord = require('discord.js');
const config = require('./config.json');
const ytdl = require('ytdl-core');
var client = new Discord.Client();

let dispatcher, targetChannel;

client.on('ready', () => {
    // console.log('client data', client);
    let voiceChannels = client.channels.filter(channel => channel.type === 'voice');
    targetChannel = voiceChannels.find('name', config.channelName);
    console.log(voiceChannels.map(channel => channel.name));
    console.log('Target Channel', targetChannel.name);
    if(targetChannel) {
        targetChannel.join().then((connection) => {
            console.log('Voice channel join successful.');
            const stream = ytdl(config.youtubeUrl, {filter : 'audioonly'});
            dispatcher = connection.playStream(stream);
            console.log('Playing youtube');

        }).catch(console.error);
    }
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

    dispatcher.end();
    targetChannel.leave();

    process.exit();

});