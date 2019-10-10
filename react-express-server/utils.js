/* eslint-disable semi */

function random(n) {
  return Math.floor(Math.random() * n)
}

function randomD(n) {
  return random(n) + 1
}

function randomRolls(n, s) {
  let rolls = []
  for (let i = 0; i < n; i++){
    rolls.push(randomD(s))
  }
  return rolls
}

module.exports.random = random
module.exports.randomD = randomD
module.exports.randomRolls = randomRolls
