

module.exports = {
    handler: function (args, msg, client, state) {
        if(state.dispatcher && state.dispatcher.resume) {
            state.dispatcher.resume();
        }
    }
}