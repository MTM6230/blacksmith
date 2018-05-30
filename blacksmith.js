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
