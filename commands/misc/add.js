module.exports = {
    commands: ['add', 'addition'],
    expectedArgs: '<num1> <num2>',
    minArgs: 2,
    maxArgs: 2,
    callback: (message, args, text) => {
        const num1 = Number(args[0])
        const num2 = Number(args[1])

        if(isNaN(num1) || isNaN(num2)) {
            message.reply(`Invalid number format!`)
            return
        }

        message.reply(`${num1} + ${num2} = ${num1+num2}`)
    },
    permissions: [],
    requiredRoles: [],
}