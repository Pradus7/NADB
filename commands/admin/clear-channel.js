module.exports = {
    commands: ['cc', 'clearchannel'],
    permissionError: 'Administrator Role Required',
    minArgs: 0,
    maxArgs: 1,
    callback: (message, args, text) => {
        message.channel.messages.fetch().then((results) => {
            message.channel.bulkDelete(results, true)
            return
        })
    },
    permissions: ['ADMINISTRATOR'],
    requiredRoles: [],
}