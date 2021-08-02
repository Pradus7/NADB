const cabinetPrice = {
    "ply": 280,
    "chip": 200,
}

const doorPrice = {
    "chip": 200,
    "osb": 800,
    "aluminum": 800,
}

module.exports = {
    commands: 'price',
    expectedArgs: '<height> <total width> <depth> <number of separate cabinets> <cabinet type> <door type> <has top>',
    minArgs: 5,
    maxArgs: 7,
    callback: (message, args, text) => {
        const height = Number(args[0])/1000
        const width = Number(args[1])/1000
        const depth = Number(args[2])/1000
        const numUnits = Number(args[3])
        const hasTop = (args[6] === 'undefined') ? false : (args[6] === 'true')
        
        // validate height width and depth
        if (isNaN(height) || isNaN(width) || isNaN(depth) || isNaN(numUnits)) {
            message.reply('Invalid number format!')
            return
        }

        if (depth > 1.2) {
            message.reply('Invalid depth!')
            return
        }

        // validate cabinet type
        if (!args[4].toLowerCase() in cabinetPrice) {
            message.reply('Invalid cabinet type, please use ply or chip')
            return
        }

        // validate door type
        if (!args[5].toLowerCase() in doorPrice) {
            message.reply('Invalid door type, please use ply, chip, OSB or aluminum')
            return
        }

        // door price
        const totalDoorPrice = height * width * doorPrice[args[5]]

        // cabinet price
        const sidePanels = numUnits * 2
        const flatPanels = hasTop || height > 2.4 ? numUnits * 4 : numUnits * 2
        const backPanelPrice = height * width * cabinetPrice[args[4]]
        const sidePanelPrice = (depth > 0.6) ? sidePanels * height * 1.2 * cabinetPrice[args[4]] : sidePanels * height * depth * cabinetPrice[args[4]]
        const flatPanelPrice = (depth > 0.6) ? flatPanels * width * 1.2 * cabinetPrice[args[4]] : flatPanels * width * depth * cabinetPrice[args[4]]

        const totalCabinetPrice = backPanelPrice + sidePanelPrice + flatPanelPrice

        message.reply(`Unit price is:\nDoor panel price: ${Math.floor(totalDoorPrice)} DHS\nCabinet price: ${Math.floor(totalCabinetPrice)} DHS\nTotal price: ${Math.floor(totalDoorPrice + totalCabinetPrice)} DHS`)
    }
}