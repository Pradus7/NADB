

module.exports = {
    commands: ['add', 'addition'],
    expectedArgs: '<num1> <num2>',
    permissionError: 'Administrator Role Required',
    minArgs: 2,
    maxArgs: 2,
    callback: (message, args, text) => {
        const num1 = Number(args[0])
        const num2 = Number(args[1])

        if(isNaN(num1)) {
            message.reply(`${arg[0]} is not a valid number!`)
            return
        }

        if(isNaN(num2)) {
            message.reply(`${arg[1]} is not a valid number!`)
            return
        }

        message.reply(`${num1} + ${num2} = ${num1+num2}`)
    },
    permissions: ['ADMINISTRATOR'],
    requiredRoles: [],
}