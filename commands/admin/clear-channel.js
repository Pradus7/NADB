module.exports = {
    commands: ['cc', 'clearchannel'],
    permissionError: 'Administrator Role Required',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, args, text) => {
        message.channel.messages.fetch().then((results) => {
            message.channel.bulkDelete(results)
        })
    },
    permissions: ['ADMINISTRATOR'],
    requiredRoles: [],
}