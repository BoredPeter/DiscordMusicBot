

module.exports = {
    handler: function (args, msg, client, state) {
        if(state.voiceConnection && args[0]) {
            let streamOptions = { volume: state.volume || 1, seek: parseInt(args[0]) || 0 };
            // state.dispatcher = state.voiceConnection.playStream(state.stream, streamOptions);
        }
    }
}