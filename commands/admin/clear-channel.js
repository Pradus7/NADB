module.exports = {
    commands: ['cc', 'clearchannel'],
    permissionError: 'Administrator Role Required',
    minArgs: 0,
    maxArgs: 1,
    callback: (message, args, text) => {
        if (!args) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
                return
            })
        }
        const targetChannel = message.mentions.channels.first()
        if (!targetChannel) {
            message.reply('Missing channel tag!')
            return
        }
        targetChannel.messages.fetch().then((results) => {
            targetChannel.bulkDelete(results)
            return
        })
        
    },
    permissions: ['ADMINISTRATOR'],
    requiredRoles: [],
}