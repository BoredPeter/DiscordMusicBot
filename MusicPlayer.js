const request = require('request');
const ytdl = require('ytdl-core');
const youtubedl = require('youtube-dl');

let instance = null;

module.exports = class MusicPlayer {

    constructor(client) {
        if(!instance) {
            instance = this;
        }

        this.client = client;
        this.playing = false;
        this.volume = 0.25;
        this.queue = [];

        return instance;
    }

    playSong(url, voiceConnection) {
        if(voiceConnection) {
            this.voiceConnection = voiceConnection;
        }
        if(!this.voiceConnection) {
            return false;
        }
        if(!this.playing) {
            this.stream = youtubedl(url, ['--format=bestaudio/best']);
            // this.stream.on('info', function(info) {
            //     console.log('Download started', info);
            //     console.log('filename: ' + info.filename);
            //     console.log('size: ' + info.size);
            //   });

            // this.stream.on('data', function(data) {
            //     console.log('Download data', data);
            // });

            // this.stream.on('next', function (url) {
            //     console.log('next', url);
            // });


            this.dispatcher = this.voiceConnection.playStream(this.stream, {volume: this.volume});
            this.playing = true;
            // this.dispatcher.on('time', () => {
            //     console.log('time', arguments);
            // });

            let that = this;

            this.dispatcher.on('end', (url) => {
                that.playing = false;
                if(that.queue.length > 0) {
                    let nextSong = that.queue.shift();
                    that.playSong(nextSong);
                }
            });

            // this.dispatcher.on('error', () => {
            //     console.log('error', arguments);
            // });
        } else {
            this.queue.push(url);
        }
    }

    setVolume(volume) {
        if(this.dispatcher) {
            this.dispatcher.setVolume(volume);
        }
    }

    resume() {
        if(this.dispatcher) {
            this.dispatcher.resume()
        }
    }

    next() {
        if(this.dispatcher) {
            this.dispatcher.end();
        }
    }

    stop() {
        if(this.dispatcher) {
            this.queue = [];
            this.dispatcher.end();
        }
    }

    pause() {
        if(this.dispatcher) {
            this.dispatcher.pause()
        }
    }

}