const { prefix } = require('../config.json')

const validatePermissions = (permissions) => {
    const validPermissions = [
        'ADMINISTRATOR',
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ]

    for (const permission of permissions) {
        if (!validPermissions.includes(permission)) {
            throw new Error(`Unknown permission! ${permission}`)
        }
    }
}

const allCommands = {}

module.exports = (commandOptions) => {
    let {
        commands,
        permissions = [],
    } = commandOptions

    if (typeof commands === 'string') commands = [commands]

    console.log(`Registering command "${commands[0]}"`)

    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }

        validatePermissions(permissions)
    }

    for (const command of commands) {
        allCommands[command] = {
            ...commandOptions,
            commands,
            permissions
        }
    }
}

module.exports.listen = (client) => {
    client.on('message', message => {
        const { member, content, guild } = message

        const args = content.split(/\s+/)

        //remove first index since that is a command call
        const name = args.shift().toLowerCase()

        if (name.startsWith(prefix)) {
            const alias = name.replace(prefix, '')
            const command = allCommands[alias]
            if (!command) return

            const {
                permissions,
                permissionError = "Insufficient permissions",
                requiredRoles = [],
                minArgs = 0,
                maxArgs = null,
                expectedArgs = '',
                callback,
            } = command

            for (const permission of permissions) {
                if (!member.hasPermission(permission)) {
                    message.reply(permissionError)
                    return
                }
            }

            for (const requiredRole of requiredRoles) {
                const role = guild.roles.cache.find(role => role.name === requiredRole)


                if (!role || member.roles.cache.has(role.id)) {
                    message.reply(`${requiredRole} role is required!`)
                    return
                }
            }

            if (args.length < minArgs || (!maxArgs && args.length > maxArgs)) {
                message.reply(`Incorrect syntax!\n\n${prefix}${alias} ${expectedArgs}`)
                return
            }

            console.log(`Running command "${alias}"`)

            callback(message, args, args.join(' '))
        }
    })
}