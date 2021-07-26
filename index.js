const Discord = require('discord.js')
require('dotenv').config()

const client = new Discord.Client()

const command = require('./command')
const firstMessage = require('./first-message')
const privateMessage = require('./private-message')

client.on('ready', () => {
    console.log(`Bot ${client.user.tag} is now ready!`)

    command(client, ['ping', 'test'], (message) => {
        message.channel.send('Pong!')
    })

    command(client, 'servers', (message) => {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(
                `${guild.name} has a total of ${guild.memberCount} members`
            )
        })
    })

    command(client, ['cc', 'clearchannel'], (message) => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        }
    })

    command(client, 'status', (message) => {
        const content = message.content.replace('!status', '')

        client.user.setPresence({
            activity: { 
                name: content,
                type: 2
            }
        })
    })

    command(client, 'serverinfo', (message) => {
        const { guild } = message
        const { name, region, memberCount, owner, iconURL } = guild

        const embed = new Discord.MessageEmbed()
            .setTitle(`Server info for ${name}`)
            .setThumbnail(iconURL)
            .addFields(
                {
                    name: 'Region',
                    value: region,
                }, {
                    name: 'Members',
                    value: memberCount,
                }, {
                    name: 'Owner',
                    value: owner.user.tag,
                }
            )
        
        message.channel.send(embed)
    })

    // firstMessage(client, '868110974337577031', ':(', ['🔥', '💧'])

    privateMessage(client, 'ping', 'pong')

})


client.login(process.env.TOKEN)


// channel creation
async function demoChannelCreation(message) {
    const name = 'new channel name'

    message.guild.channels.create(
        name,
        {
            type: 'text'    // 'voice' for a new voice channel
        }
    ).then((channel) => {
        console.log(channel)
        const categoryId = 'some category id from discord'
        channel.setParent(categoryId)
        // channel.setUserLimit(10)
    })
}

async function demoEmbed(message) {
    const img = 'image url'

    const embed = new Discord.MessageEmbed()
        .setTitle('Embed Title')
        .setURL('https://google.com')
        .setAuthor(message.author.username)
        // .setImage(img)
        // .setThumbnail(img)
        // .setFooter('this is a footer', img)  // img is optional in a footer
        // .setColor('#FFFFFF')
        .addFields(
            {
                name: 'Field name1',
                value: 'THIS IS A FIELD :)',
                inline: true
            },
            {
                name: 'Field name2',
                value: 'THIS IS A FIELD :)',
                inline: true
            },
            {
                name: 'Field name3',
                value: 'THIS IS A FIELD :)',
                inline: true
            },
            {
                name: 'Field name4',
                value: 'THIS IS A FIELD :)',
                inline: false
            },
            {
                name: 'Field name5',
                value: 'THIS IS A FIELD :)',
                inline: true
            },
            {
                name: 'Field name6',
                value: 'THIS IS A FIELD :)',
                inline: true
            }
        )
    
    message.channel.send(embed)
}
