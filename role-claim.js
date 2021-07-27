const firstMessage = require('first-message')

module.exports = client => {
    const channelId = '869452662305878057'

    const getEmoji = emojiName => client.emojis.cache.find(emoji => emoji.name === emojiName)

    const emojis = {
        javascript: 'JavaScript',
        python: 'Python'
    }

    const reactions = [

    ]

    let emojiText = 'Get your roles!\n\n'

    for (const key in emojis) {
        const emoji = getEmoji(key)
        reactions.push(emoji)

        const role = emojis[key]
        emojiText += `${emoji} = ${role}\n`
    }

    firstMessage(client, channelId, emojiText, reactions)

    const handleReaction = (reaction, user, add) => {
        if (user.id === '868098278602973185') return

        const emoji = reaction._emoji.name
        const { guild } = reaction.message

        const roleName = emojis[emoji]
        if (!roleName) return

        const role = guild.roles.cache.find(role => role.name === rolename)

        const member = guild.members.cache.find(member => member.id === user.id)

        if (add) {
            member.roles.add(role)
        } else {
            member.roles.remove(role)
        }
    }

    client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === channelId) {
            console.log('add role')
            handleReaciton(reaction, user, true)
        }
    })

    client.on('messageReactionRemove', (reaction, user) => {
        if (reaction.message.channel.id === channelId) {
            console.log('remove role')
            handleReaciton(reaction, user, false)
        }
    })
}