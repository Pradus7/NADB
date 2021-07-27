const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const client = new Discord.Client()
require('dotenv').config()

const config = require('./config.json')

client.on('ready', async () => {
    console.log(`Bot ${client.user.tag} is now online!`)

    const basefile = 'command-base.js'
    const commandBase = require(`./commands/${basefile}`)

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if(stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== basefile) {
                const option = require(path.join(__dirname, dir, file))
                commandBase(client, option)
            }
        }
    }

    readCommands('commands')

})

client.login(process.env.TOKEN)