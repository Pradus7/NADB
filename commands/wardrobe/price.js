module.exports = {
    commands: 'price',
    minArgs: 3,
    maxArgs: 3,
    callback: (message, args, text) => {
        message.channel.messages.fetch().then((results) => {
            message.channel.bulkDelete(results, true)
            return
        })
    },
}