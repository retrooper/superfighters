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
.0............0.
.0.0000000000.0.
.0.0666666060.0.
.0.0666660600.0.
.0.0666606060.0.
.0.0666060660.0.
.0.0660606660.0.
.0.0606066660.0.
.0.0060666660.0.
.0.0606666660.0.
.0.0000000000.0.
.0............0.
.00000000000000.
................`]
)

setSolids([])

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
...............
...............`
]

setMap(levels[level])

setPushables({
  [ rightFacingPlayer ]: [],
  [ leftFacingPlayer ]: []
})

let jumping = false

onInput("w", () => {
  let playerY = getFirst(player).y
  let playerX = getFirst(player).x
  let distanceToGround = height() - Math.abs(playerY) - 1
  let isOnGround = distanceToGround === 0  
  if (!jumping && isOnGround) {
    getFirst(player).y -= 1
    jumping = true

    var intervalId = setInterval(() => {
      let lastPlayerY = getFirst(player).y

      let playerY = getFirst(player).y
      let playerX = getFirst(player).x
      let distanceToGround = height() - Math.abs(playerY) - 1
      let isOnGround = distanceToGround === 0
      if (!isOnGround) {
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
    let distanceToGround = height() - Math.abs(playerY) - 1
    //TODO For combat
    //getFirst(player).y -= distanceToGround
    getFirst(player).y += distanceToGround
  }
}, 50)

afterInput(() => {
  console.log("after input")
})
