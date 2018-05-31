/**
 * randomInt:
 * Returns a random positive integer from min to max
 * @Parameters: min - the smallest possible number, max - largest possible number
 * @Return: Int
 * @Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
const randomInt = function (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * The settings object keeps track of all the exchange rates
 * for the game.
 */
const settings = {
  fireWood: 1,
  oreCost: 3,
  woodCost: 1,
  swordOre: 2,
  swordWood: 1,
  axeOre: 1,
  axeWood: 2,
  swordPriceMin: 5,
  swordPriceMax: 10,
  axePriceMin: 4,
  axePriceMax: 8
}

/**
 * Create a game status object to keep track of items:
 * - gold: number
 * - ore: number
 * - swords: number
 * - axes: number
 * - fire: boolean
 */
const blacksmith = {
  gold: 10,
  ore: 0,
  wood: 0,
  swords: 0,
  axes: 0,
  fire: false
}

/**
 * Buy Command
 * Take a single string of the item to buy
 * A purchase can only be made if:
 * - The fire is not burning
 * - The blacksmith has enough gold to buy the desired item
 * - The item is a valid item too purchase
 * Return a message explaining the transaction that occurred
 */
function buy (item) {
  if (blacksmith.fire === false) {
    if (item === 'ore' && blacksmith.gold >= settings.oreCost) {
      blacksmith.ore++
      blacksmith.gold -= settings.oreCost
      return `You have purchased 1 piece of ore.`
    } else if (item === 'wood' && blacksmith.gold >= settings.woodCost) {
      blacksmith.wood++
      blacksmith.gold -= settings.woodCost
      return `You have purchased 1 piece of wood`
    } else {
      return `You cannot purchase a ${item}.`
    }
  } else {
    return `You must put out the fire.`
  }
}

/**
 * Fire Command
 * Used to start and stop a fire
 * A fire will be started if:
 * - The fire is not burning
 * - If the blacksmith has enough wood
 * A fire will be stopped if:
 * - The fire is burning
 * Return a message explaining the status of the fire
 */
function fire () {
  if (blacksmith.fire) {
    blacksmith.fire = false
    return `You have put out the fire.`
  } else if (blacksmith.wood > settings.fireWood) {
    blacksmith.wood -= settings.fireWood
    blacksmith.fire = true
    return `You have started the fire.`
  } else {
    return `You do not have enough wood.`
  }
}

/**
 * Make Command
 * Takes a single string of the weapon to make
 * A weapon will be made if:
 * - The fire is burning
 * - There is enough resources to make the weapon
 * - The blacksmith knows how to make the weapon
 * Returns a message explaining what happened
 */
function make (item) {
  if (blacksmith.fire) {
    if (item === 'sword' && blacksmith.ore >= settings.swordOre && blacksmith.wood >= settings.swordWood) {
      blacksmith.wood -= settings.swordWood
      blacksmith.ore -= settings.swordOre
      blacksmith.swords++
      return `You have made 1 sword`
    } else if (item === 'axe' && blacksmith.ore >= settings.axeOre && blacksmith.wood >= settings.axeWood) {
      blacksmith.wood -= settings.axeWood
      blacksmith.ore -= settings.axeOre
      blacksmith.axes++
      return `You have made 1 axe`
    } else {
      return `You cannot make a ${item}.`
    }
  } else {
    return `You must start the fire.`
  }
}

/**
 * Sell Command
 * Takes a single string of the weapon to sell
 * A weapon will be sold if:
 * - The fire is not burning
 * - The blacksmith has the item to sell
 * The amount of gold received will be randomly chosen from a range.
 * Returns a message explaining what happened
 */
function sell (item) {
  if (!blacksmith.fire) {
    if (item === 'sword' && blacksmith.swords > 0) {
      blacksmith.swords--
      const price = randomInt(settings.swordPriceMin, settings.swordPriceMax)
      blacksmith.gold += price
      return `You have sold 1 ${item} for ${price} pieces of gold.`
    } else if (item === 'axe' && blacksmith.axes > 0) {
      blacksmith.axes--
      const price = randomInt(settings.axePriceMin, settings.axePriceMax)
      blacksmith.gold += price
      return `You have sold 1 ${item} for ${price} pieces of gold.`
    } else {
      return `You do not have a ${item}.`
    }
  } else {
    return `You must put out the fire.`
  }
}

/**
 * Inventory Command
 * Returns the blacksmith's current inventory
 * Create an array to hold response
 * Loop over the the game status object
 * - output each item and the quanity
 * - check for fire and change the message to be:
 *    if fire true:
 *      - fire is burning
 *    else:
 *      - fire is not burning
 * Return the array as a string
 */
function inventory () {
  const response = []
  response.push(`INVENTORY:\n`)
  for (const item in blacksmith) {
    if (item === 'fire') {
      if (blacksmith[item]) {
        response.push(`The fire is burning.`)
      } else {
        response.push(`The fire is not burning.`)
      }
    } else {
      response.push(`${item}: ${blacksmith[item]}\n`)
    }
  }
  return response.join('')
}

/**
 * Help Command
 * Returns the instruction on how to play the game.
 */
function help () {
  return `INSTRUCTIONS:\nBlacksmith is a simple text base game. As a blacksmith you convert ore and wood into swords and axes. You buy your resources using gold and sell your weapons for gold. \n\nCOMMANDS:\n- buy(item)\n- make(item)\n- sell(item)\n- fire()\n- inventory()\n- help()`
}

// Log the help() function
console.log(help())
