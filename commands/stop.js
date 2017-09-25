

module.exports = {
    handler: function (args, msg, client, state) {
        if(state.dispatcher && state.dispatcher.end) {
            state.dispatcher.end();
        }
    }
}