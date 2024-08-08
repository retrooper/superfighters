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
const rightPunchingPlayer = "r"
const leftPunchingPlayer = "n"

const npcFacingRight = "P"
const npcFacingLeft = "L"

const box = "b"
const ladder = "c"
const fireParticle = "f"

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
.....0CCCC00....
.....2002000....
.....00C00C0....
..0000CCCC0000..
..000000000000..
..000222220000..
..000200200000..
..000200000000..
..000000000000..
..CCC000000CCC..
.....00000......
....000000......
...00...000.....
...00....00.....
..000...000.....`],
  [rightPunchingPlayer, bitmap`
.....000000.....
....00CCCC00....
....00030030....
....0C00C00.....
..000CCCCC00000.
..00000000000000
..00002222200CCC
..0000020000.CCC
..0CC0000000....
..0CC0000000....
..000000000.....
.....000000.....
.....0000000....
.....00...00....
.....00...00....
.....000..000...`],
  [leftPunchingPlayer, bitmap`
.....000000.....
.....0CCCC00....
.....3003000....
.....00C00C0....
CC0000CCCCC0....
CC000000000000..
CC0002222200000.
.....0002000000.
.....0000000CC0.
.....0000000CC0.
.....000000.00..
.....000000.....
.....000000.....
......00.000....
......00..000...
.....000...00...`],
  [npcFacingRight, bitmap`
....00000000....
....05555550....
....05555550....
....05225220....
000055555550....
055555555550....
055555555550000.
055000055555550.
055555055555550.
055555055555550.
000000055555550.
......055500000.
.....0555500....
.....0555550....
....05555550....
...0055555500...`],
  [npcFacingLeft, bitmap`
....00000000....
....05555550....
....05555550....
....022522500...
....055555550...
00000555555500..
055505555555500.
055555555005550.
005555555055550.
..0055555055500.
...00555505000..
....00555050....
....0055550.....
....0555550.....
....05555550....
...0055555500...`],
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
................`],
    [ladder, bitmap`
...L........L...
...L........L...
...L........L...
...LLLLLLLLLL...
...L11111111L...
...L........L...
...L........L...
...L........L...
...LLLLLLLLLL...
...L11111111L...
...L........L...
...L........L...
...L........L...
...LLLLLLLLLL...
...L11111111L...
...L........L...`],
  [fireParticle, bitmap`
..9....99....9..
....999999......
...99966699.....
..9966626699....
..9662266669....
..9996662669....
.996696662699...
.996269662669.99
..96622966699..9
..9666669969....
..99966666999...
...999966699....
.6..9999999.....
..6...9969......
...6....9.......
......6.........`]
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
.............cb
.............c.
.......LPbbb.c.`
]

setMap(levels[level])

setPushables({
  [ rightFacingPlayer ]: [],
  [ leftFacingPlayer ]: [],
  [box]: []
})

let jumping = false

function playerDistanceToGround(player) {

    let playerY = getFirst(player).y
    let playerX = getFirst(player).x
    let distanceToGround = 0

    // Check tiles below the player
    for (let i = playerY + 1; i < height(); i++) {
        const tiles = getTile(playerX, i)
        if (tiles.length != 0) {
           for (let tile in tiles) {
             if (tile.type != leftFacingPlayer && 
              tile.type != rightFacingPlayer) 
               return distanceToGround = i - playerY - 1
             }
          }
        }

    return height() - playerY - 1
}

function playerIsOnGround(player) {
    return playerDistanceToGround(player) == 0
}

onInput("l", () => {
  let particleX = getFirst(player).x + 1
  let particleY = getFirst(player).y
  if (getFirst(player).type == rightFacingPlayer) {
        getFirst(player).type = rightPunchingPlayer
        player = rightPunchingPlayer
      //Check sprite next to the player
      let neighboringTiles = getTile(particleX, particleY)
      for (let tile in neighboringTiles) {
        if (tile.type != rightFacingPlayer && tile.type != leftFacingPlayer) {
          //Destroy block next to them
          clearTile(particleX, particleY)
          //Add particle
          addSprite(particleX, particleY, fireParticle)
          var tempInterval = setInterval(() => {
            //Destroy particle later
            getTile(particleX, particleY).forEach(sprite => {
              if (sprite.type == fireParticle) {
                sprite.remove()
              }
            });
            clearInterval(tempInterval)
          }, 100);
          break
        }
      }
      
  }
  var intervalId = setInterval(() => {
    if (getFirst(player).type == rightPunchingPlayer) {
      getFirst(player).type = rightFacingPlayer
      player = rightFacingPlayer
    }
    clearInterval(intervalId)
  }, 200)

})

onInput("j", () => {
  let particleX = getFirst(player).x - 1
  let particleY = getFirst(player).y
  if (getFirst(player).type == leftFacingPlayer) {
        getFirst(player).type = leftPunchingPlayer
        player = leftPunchingPlayer
      //Check sprite next to the player
      let neighboringTiles = getTile(particleX, particleY)
      for (let tile in neighboringTiles) {
        if (tile.type != rightFacingPlayer && tile.type != leftFacingPlayer) {
          //Destroy block next to them
          clearTile(particleX, particleY)
          //Add particle
          addSprite(particleX, particleY, fireParticle)
          var tempInterval = setInterval(() => {
            //Destroy particle later
            getTile(particleX, particleY).forEach(sprite => {
              if (sprite.type == fireParticle) {
                sprite.remove()
              }
            });
            clearInterval(tempInterval)
          }, 100);
          break
        }
      }
      
  }
  var intervalId = setInterval(() => {
    if (getFirst(player).type == leftPunchingPlayer) {
      getFirst(player).type = leftFacingPlayer
      player = leftFacingPlayer
    }
    clearInterval(intervalId)
  }, 200)

})

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
    }, 200)
  }
})

let lastLeftMovement = Date.now()
let lastRightMovement = Date.now()


const movementDelay = 150

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
    if (getFirst(player).type != rightFacingPlayer) {
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
    let onGround = playerIsOnGround(player)
    if (!onGround) {
      getFirst(player).y += 1
    }
    //let distanceToGround = playerDistanceToGround(player)
    //TODO For combat
    //getFirst(player).y -= distanceToGround
    //getFirst(player).y += distanceToGround
  }
}, 30)

function npcShootBullet(let npc, let player) {
  
}

afterInput(() => {
    // Process NPCs
  getAll().forEach(entity => {
      if (entity.type != npcFacingLeft && entity.type != npcFacingRight)
        return
      let playerX = getFirst(player).x
      let playerY = getFirst(player).y

      let entityX = entity.x
      let entityY = entity.y
      //distance = sqrt(x^2 + y^2)
      let xDelta = playerX - entityX
      let yDelta = playerY - entityY
      let distanceSq = xDelta * xDelta + yDelta * yDelta
      let distance = Math.sqrt(distanceSq)

      if (distance < 7) {
          //Make the NPC face the player
          if (xDelta <= 0) {
              entity.type = npcFacingLeft
          }
          else {
              entity.type = npcFacingRight
          }
          npcShootBullet(entity, player)
      }
  });
    //console.log(allNpcs)
})
