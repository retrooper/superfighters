/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Super Fighters
@author: retrooper
@tags: []
@addedOn: 2024-00-00
*/

const rightFacingPlayer = "p"
const leftFacingPlayer = "l"
const box = "b"

let player = rightFacingPlayer

setLegend(
  [ rightFacingPlayer, bitmap`
.....000000.....
....00CCCC00....
....00020020....
....0C00C00.....
..0000CCCC0000..
..000000000000..
..000022222000..
..000002002000..
..000CC0002CC0..
..000CC0000CC0..
...00000000000..
......00000.....
......000000....
.....000...00...
.....00....00...
.....000...000..` ],
  [leftFacingPlayer, bitmap`
.....000000.....
....00CCCC00....
....02002000....
.....00C00C0....
..0000CCCC0000..
..000000000000..
..000222220000..
..000200200000..
..0CC2000CC000..
..0CC0000CC000..
..00000000000...
.....00000......
....000000......
...00...000.....
...00....00.....
..000...000.....`],
  [box, bitmap`
................
.00000000000000.
.0HHHHHHHHHHHH0.
.0H0000000000H0.
.0H0999999090H0.
.0H0999990900H0.
.0H0999909090H0.
.0H0999090990H0.
.0H0990909990H0.
.0H0909099990H0.
.0H0090999990H0.
.0H0909999990H0.
.0H0000000000H0.
.0HHHHHHHHHHHH0.
.00000000000000.
................`]
)

setSolids([rightFacingPlayer, leftFacingPlayer, box])

let level = 0
const levels = [
  map`
...............
...............
...............
...............
...............
p..............
...............
.............b.
............bb.`
]

setMap(levels[level])

setPushables({
  [ rightFacingPlayer ]: [],
  [ leftFacingPlayer ]: [],
  [box]: []
})

let jumping = false


/*
function playerDistanceToGround(player) {
  let playerY = getFirst(player).y
  let playerX = getFirst(player).x
  let distanceToGround = 0
  for (let i = playerY + 1; i >= 0; i--) {
    tiles = getTile(playerX, i)
    if (tiles.length != 0) {
      for (let tile in tiles) {
         if (tile.type != "p" && 
            tile.type != "l") {
           console.log("dist: " + (height() - i - 1))
          return height() - i - 1
        }
      }
    }
  }
  return height() - playerY - 1
}*/

function playerDistanceToGround(player) {

    let playerY = getFirst(player).y
    let playerX = getFirst(player).x
    let distanceToGround = 0

    // Check tiles below the player
    for (let i = playerY + 1; i < height(); i++) {
        const tiles = getTile(playerX, i)
        if (tiles.length != 0) {
           for (let tile in tiles) {
             if (tile.type != "p" && 
              tile.type != "l") 
               return distanceToGround = i - playerY - 1
             }
          }
        }

    return height() - playerY - 1
}

function playerIsOnGround(player) {
    return playerDistanceToGround(player) == 0
}

onInput("w", () => {
  let playerY = getFirst(player).y
  let playerX = getFirst(player).x
  let distanceToGround = playerDistanceToGround(player)
  let onGround = playerIsOnGround(player)
  if (!jumping && onGround) {
    getFirst(player).y -= 1
    jumping = true

    var intervalId = setInterval(() => {
      let lastPlayerY = getFirst(player).y

      let playerY = getFirst(player).y
      let playerX = getFirst(player).x
      let distanceToGround = playerDistanceToGround(player)
      let onGround = playerIsOnGround(player)
      if (!onGround) {
        // Push them up
        getFirst(player).y = lastPlayerY
      }
      clearInterval(intervalId)
      jumping = false
    }, 300)
  }
})

let lastLeftMovement = Date.now()
let lastRightMovement = Date.now()


const movementDelay = 220

onInput("a", () => {
  let currentTime = Date.now()
  if ((currentTime - lastLeftMovement) >= movementDelay) { 
    lastLeftMovement = currentTime

    if (getFirst(player).type != "l") {
        getFirst(player).type = leftFacingPlayer
        player = leftFacingPlayer
    }
    getFirst(player).x -= 1
  }
})


onInput("d", () => {
  let currentTime = Date.now()
  if ((currentTime - lastRightMovement) >= movementDelay) { 
    lastRightMovement = currentTime
    if (getFirst(player).type != "p") {
      getFirst(player).type = rightFacingPlayer
      player = rightFacingPlayer
    }
    getFirst(player).x += 1
  }
})

setInterval(() => {
  if (!jumping) {
    //getFirst(player).y += 1
    let playerY = getFirst(player).y
    let playerX = getFirst(player).x
    let distanceToGround = playerDistanceToGround(player)
    //TODO For combat
    //getFirst(player).y -= distanceToGround
    getFirst(player).y += distanceToGround
  }
}, 50)

afterInput(() => {
})
