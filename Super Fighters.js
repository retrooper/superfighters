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
const bedrock = "B"
const ladder = "c"
const fireParticle = "f"
const bullet = "m"
const heart = "h"
const sky = "s"

let player = rightFacingPlayer

let happySound = tune`
193.5483870967742: B5~193.5483870967742,
6000`

let explosionSound = tune`
500: A5^500,
15500`

let victoryMusic = tune`
333.3333333333333: G5~333.3333333333333,
333.3333333333333: B5~333.3333333333333,
333.3333333333333: G5~333.3333333333333,
666.6666666666666,
333.3333333333333: D5~333.3333333333333,
333.3333333333333: F5~333.3333333333333,
333.3333333333333: D5~333.3333333333333,
666.6666666666666,
333.3333333333333: G5~333.3333333333333,
333.3333333333333: B5~333.3333333333333,
333.3333333333333: G5~333.3333333333333,
666.6666666666666,
333.3333333333333: D5~333.3333333333333,
333.3333333333333: F5~333.3333333333333,
333.3333333333333: D5~333.3333333333333,
666.6666666666666,
333.3333333333333: G5~333.3333333333333,
333.3333333333333: B5~333.3333333333333,
333.3333333333333: G5~333.3333333333333,
666.6666666666666,
333.3333333333333: D5~333.3333333333333,
333.3333333333333: F5~333.3333333333333,
333.3333333333333: D5~333.3333333333333,
1333.3333333333333` 

let gameMusic = tune`
258.62068965517244: G4~258.62068965517244,
258.62068965517244: B4~258.62068965517244,
258.62068965517244: D5~258.62068965517244,
1293.1034482758623,
258.62068965517244: D5~258.62068965517244,
258.62068965517244: E5~258.62068965517244,
258.62068965517244: G5~258.62068965517244,
1293.1034482758623,
258.62068965517244: G4~258.62068965517244,
258.62068965517244: B4~258.62068965517244,
258.62068965517244: D5~258.62068965517244,
1293.1034482758623,
258.62068965517244: D5^258.62068965517244,
258.62068965517244: E5^258.62068965517244,
258.62068965517244: G5^258.62068965517244,
258.62068965517244: D5~258.62068965517244,
1034.4827586206898`

const playback = playTune(gameMusic, Infinity)

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
0000000000000000
0..............0
0.HHHHHHHHHHHH.0
0.H0000000000H.0
0.H0999999090H.0
0.H0999990900H.0
0.H0999909090H.0
0.H0999090990H.0
0.H0990909990H.0
0.H0909099990H.0
0.H0090999990H.0
0.H0909999990H.0
0.H0000000000H.0
0.HHHHHHHHHHHH.0
0..............0
0000000000000000`],
  [bedrock, bitmap`
0000LLLL00LLL000
000LL000LLLLL100
0LLLLLLLLLLLL110
LLLLLLLLLLLLLL0L
LL00LLLLL00LL0LL
L0LLLLLLLLL00LLL
LLLLLLLLLLL0LLLL
LLLLLLLLLL0LLLLL
LLLLL0LLL0LLL0LL
LLL00LLL0LLLL0LL
LL0LLLLLLLLL0LLL
00LLLLLLLLLLLLLL
0LLLLLLL000LLLLL
LLLLL000LLLLLLLL
00LLLLLLLLLLLLL0
000LLLLLLLLLL000`],
    [ladder, bitmap`
.LLLL......LLLL.
.LLLL222LLLLLLL.
.LLLLLLLLLLLL2L.
.L1LL......LL2L.
.L1LL......LL2L.
.L1LLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLL......LLLL.
.LLLL......L2LL.
.LLLLLLLLLLL2LL.
.LLLLLLLLLLL2LL.
.LLLL......L2LL.
.LLLL......LLLL.
.LL2LLLLLLLLLLL.
.LL2LLLLLLLLLLL.
.LL2L......LLLL.`],
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
......6.........`],
  [bullet, bitmap`
................
................
................
................
................
................
................
......96F6......
......F666......
................
................
................
................
................
................
................`],
  [heart, bitmap`
.0000000.0000003
0332283303322280
0388888333888830
0888888338888830
0888888888888830
0888288888888880
0888288888888880
0388828888888880
0388888888888830
0338888888888830
.033888888888330
..03888888883330
..0338888883300.
.H.0388888830H..
....03388830....
H....000000...H.`],
  [sky, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`]
)

setBackground(sky)

setSolids([rightFacingPlayer, leftFacingPlayer, box, bedrock])
// Game data
let level = 0
let jumping = false
let changingLevels = false

// Constants
const startingLives = 5

// Internal variables
let lastParticleSound = Date.now()
let lastLeftMovement = Date.now()
let lastRightMovement = Date.now()
let lastShot = Date.now()
let lives = startingLives

const levels = [
  map`
...............
p......LP......
..b..........cb
..b..........cb
..b..........cb`,
  map`
...............
...............
...............
...............
...............
...............
.............cB
.............cB
p......LP..b.cB`,
  map`
...............
...............
..............B
.........b...BB
.......b...bbBB
p.bbbbbbb....BB`,
  map`
...............
...............
...............
...............
...............
.............P.
.............b.
............bB.
p......LL..b.B.`,
  map`
...............
...............
...............
...............
...............
.............P.
.............b.
p...........bB.
bbbbbbbbbbbbbbb`,
  map`
p..............
bbbbbbbbbbbb.bb
bbbbbbbbbbbb.bb
bbbbbbbbbbbb.bb
bbbbbbbbbbbb.bb
bbbbbbbbbbbb.bb
bbbbbbbbbbbb...
bbbbbbbbbbbbbbb
BBBBBBBBBBBBBBB`,
  map`
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbbbbbbbbb....
p...........bbb
bbbbbbbbbbbbbbb
BBBBBBBBBBBBBBB`,
  map`
bbbbbbbbbbbbbbb
bbbbbbbbbbbb.bb
p...BP.........
BBB.Bbbb..bb.bb
bbB.b....Bbb.bb
bbB...BBBBbbbbb
bbBBBBbbbbbbbbb
bbbbbbbbbbbbbbb
BBBBBBBBBBBBBBB`,
  map`
p..............
bbbbbbbbbbbb.bb
bbbbbbbbbbbb.bb
bbbbbbbbbbbb.bb
bbbbbbbbbbbb.bb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
bbbbbbbbbbbbbbb
BBBBBBBBBBBBBBB`,
  map`
...............
...............
...............
...............
...............
...............
...............
...............
p..............`
]

setMap(levels[level])

setPushables({
  [ rightFacingPlayer ]: [],
  [ leftFacingPlayer ]: [],
  [box]: []
})

function isEntity(type) {
  return isNPC(type) || isPlayer(type)
}

function isNPC(type) {
  return type == npcFacingLeft || type == npcFacingRight
}

function isPlayer(type) {
  return type == leftFacingPlayer || type == rightFacingPlayer ||
  type == leftPunchingPlayer || type == rightPunchingPlayer
}

function distanceToGround(player) {
    let playerY = player.y
    let playerX = player.x
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

function isOnGround(player) {
    return distanceToGround(player) == 0
}

function attackEntity(player, entityX, entityY) {    
  // Check sprite next to the player
  getTile(entityX, entityY).forEach(tile=>{
    // Confirm they are not destroying a player
    if (isPlayer(tile.type)) return
    //If it bedrock, we cannot break it!
    if (tile.type == bedrock) {
      spawnParticle(entityX, entityY, 0)
      addSprite(entityX, entityY, bedrock)
    }
    else {
      // Destroy block next to them
      clearTile(entityX, entityY)
      spawnParticle(entityX, entityY, 0)
    }
    return
  })
}

// particleX: particle position x
// particleY: particle position y
// type: sound type
function spawnParticle(particleX, particleY, type) {
    // Calculate time elapsed since last sound effect
    let currentTime = Date.now()
    if (currentTime - lastParticleSound > 100) {
      lastParticleSound = currentTime

      // Spawn the corresponding particle
      if (type == 0) {
        playTune(explosionSound)
        addSprite(particleX, particleY, fireParticle)
        var tempInterval = setInterval(() => {
        // Destroy particle later
            getTile(particleX, particleY).forEach(sprite => {
              if (sprite.type == fireParticle) {
                sprite.remove()
              }
            });
            clearInterval(tempInterval)
          }, 100);
      }
      else if (type == 1) {
          playTune(happySound)
           addSprite(particleX, particleY, heart)
          var tempInterval = setInterval(() => {
            // Destroy particle later
            getTile(particleX, particleY).forEach(sprite => {
              if (sprite.type == heart) {
                sprite.remove()
              }
            });
            clearInterval(tempInterval)
          }, 100);
      }
    }
}

// Handle right punch
onInput("l", () => {
  if (!player) return
  let particleX = getFirst(player).x + 1
  let particleY = getFirst(player).y
  // Are they facing in the right direction (so they can attack in that direction)
  if (getFirst(player).type == rightFacingPlayer) {
      // Switch to the punching animation
      getFirst(player).type = rightPunchingPlayer
      player = rightPunchingPlayer
      attackEntity(player, particleX, particleY)
  }
  var intervalId = setInterval(() => {
    if (player && getFirst(player).type == rightPunchingPlayer) {
      getFirst(player).type = rightFacingPlayer
      player = rightFacingPlayer
    }
    clearInterval(intervalId)
  }, 200)

})

// Handle left punch
onInput("j", () => {
  if (!player) return
  let particleX = getFirst(player).x - 1
  let particleY = getFirst(player).y
  // Are they facing in the left direction? (to be able to punch left)
  if (getFirst(player).type == leftFacingPlayer) {
      // Switch to the punching animation
      getFirst(player).type = leftPunchingPlayer
      player = leftPunchingPlayer
      attackEntity(player, particleX, particleY)
  }
  var intervalId = setInterval(() => {
    if (getFirst(player).type == leftPunchingPlayer) {
      getFirst(player).type = leftFacingPlayer
      player = leftFacingPlayer
    }
    clearInterval(intervalId)
  }, 200)

})

// Jump functionality
onInput("w", () => {
  if (!player) return
  
  let playerY = getFirst(player).y
  let playerX = getFirst(player).x
  // Is the player on ground (and not jumping)
  let onGround = isOnGround(getFirst(player))
  if (!jumping && onGround) {
    //Increase y
    getFirst(player).y -= 1
    jumping = true

    // Keep them in the air for some time.
    var intervalId = setInterval(() => {
      let lastPlayerY = getFirst(player).y
      let playerY = getFirst(player).y
      let playerX = getFirst(player).x
      let onGround = isOnGround(getFirst(player))
      if (!onGround) {
        // Push them up
        getFirst(player).y = lastPlayerY
      }
      clearInterval(intervalId)
      jumping = false
    }, 300)
  }
})

const movementDelay = 150

onInput("a", () => {
  let currentTime = Date.now()
  if ((currentTime - lastLeftMovement) >= movementDelay) { 
    lastLeftMovement = currentTime

    if (player && getFirst(player).type != "l") {
        getFirst(player).type = leftFacingPlayer
        player = leftFacingPlayer
    }
    // Move to the left direction
    getFirst(player).x -= 1
  }
})


onInput("d", () => {
  let currentTime = Date.now()
  if ((currentTime - lastRightMovement) >= movementDelay) { 
    lastRightMovement = currentTime
    if (player && getFirst(player).type != rightFacingPlayer) {
      getFirst(player).type = rightFacingPlayer
      player = rightFacingPlayer
    }
    // Move to the right direction
    getFirst(player).x += 1
  }
})

setInterval(() => {
  if (!jumping) {
    // Gravity for all living entities!
    getAll().forEach(entity=>{
      if (isEntity(entity.type)) {
        let onGround = isOnGround(entity)
        if (!onGround) {
          // Move downward 
          entity.y += 1
        }
      }
    })
  }
}, 30)

setInterval(() =>{
    // Process entity proximity detection
     getAll().forEach(entity => {
      // Loop over all NPCs
      if (!isNPC(entity.type)) return
       // Calculate distance to the player
      let dist = distance(getFirst(player), entity.x, entity.y)
       // Once the player comes in close proximity, make them look at the player
      if (dist < 7) {
          // Evaluate direction of player using delta x (as it is a 2D game)
          let right = (getFirst(player).x - entity.x) > 0
          if (right) {
            entity.type = npcFacingRight
          }
          else {
            entity.type = npcFacingLeft
          }
          shootBullet(entity, entity.x, entity.y)
          
      }
  });
  
  // Process moving bullets
  getAll().forEach(entity=>{
        //Is the entity a bullet?
        if (entity.type == bullet) {
          // Calculate difference to player
          let xDiff = getFirst(player).x - entity.x
          let removedEntity = false
          //Find all entities in game
          getTile(entity.x, entity.y).forEach(obstacle=>{
            // If the bullet did not hit an NPC (since they are the shooters) 
            // Also check if the obstacle is not the same bullet.
            if (obstacle.type != bullet && !isNPC(obstacle.type)) {
              entity.remove()
              removedEntity = true
              // Spawn the heart particle if it was a player,
              // Spawn the explosion particle otherwise
              spawnParticle(entity.x, entity.y, isPlayer(obstacle.type) ? 1 : 0)
              if (isPlayer(obstacle.type)) {
                  lives--
              }
              return
            }
          })
          if (removedEntity) return

          // Process delta movement to player (bullet movement behavior)
          let yDiff = getFirst(player).y - entity.y
          // Move the bullet toward the player
          entity.x += xDiff > 0 ? 1 : -1

          // Destroy bullets meeting the edge
          if (entity.x == (width() - 1)
              || entity.x == 0) {
              var interval = setInterval(() =>{
                  spawnParticle(entity.x, entity.y, 0)
                  entity.remove()
                clearInterval(interval)
              }, 200)
          }
        }
    })

}, 300)

setInterval(() =>{  
  //Changing levels
  if (player && getFirst(player).x == width() - 1) {
    if (!levels[level + 1]) return
    changingLevels = true
    clearText()
      addText("Loading new level...", {y: 4, color:`4`})
      getAll().forEach(entity=>{
        if (entity.type!=bullet && entity.type!= fireParticle) {
            if (entity.x != 0) {
              entity.x--
              getFirst(player).x++
            }
            if (entity.x == 0) {
              entity.remove()
            }
        }
      })

    }

  if (changingLevels && getAll().length == 1 && level < (levels.length - 1)) {
    //Done changing levels
    level++
    setMap(levels[level])
    changingLevels = false

    if (level == levels.length - 1) {
      playback.end()
      playTune(victoryMusic, Infinity)
    }

    //addText("You win the game!", {y: 3, color`3`})
  }

  if (!changingLevels) {
    clearText()
  }
  if (changingLevels) return
  switch (level) {
    case 0:
      addText("Super Fighters v1", {y: 1, color: `5`})
      break

    case 1:
      addText("Not bad...", {y: 3, color: `4`})
      addText("Can you beat this?", {y: 4, color: `3`})
      break
    case 2:
      addText("It gets harder...", {y:4, color: `3`})
      break
    case 5:
      addText("Go down", {y:2, color:`3`})
      break
    case 6:
      addText("What is next?...", {y:2, color: `5`})
      break
  }

  if (level == levels.length - 1) {
      addText("You win!", {y: 3, color:`4`})
  }

  if (lives <= 0 && !changingLevels) {
     level = 0
      getAll().forEach(entity=>{
        if (entity.type!=rightFacingPlayer && entity.type!= leftFacingPlayer
           && entity.type!=rightPunchingPlayer && entity.type != leftPunchingPlayer) {
            entity.remove()
        }
      })
      setMap(levels[level])
      lives = startingLives
  }
  let text = "Lives: " + lives
  if (level < levels.length - 1) {
    addText(text, {x: width() - 3, y: 5, color:`5`})
  }
  
}, 40)

function distance(player, entityX, entityY) {
  let playerX = player.x
  let playerY = player.y

      //distance = sqrt(x^2 + y^2)
  let xDelta = playerX - entityX
  let yDelta = playerY - entityY
  let distanceSq = xDelta * xDelta + yDelta * yDelta
  return Math.sqrt(distanceSq)
}

function shootBullet(shooter, originX, originY) {
  let currentTime = Date.now()
  if (currentTime - lastShot > 1000) {
    lastShot = currentTime
    if (shooter.type == npcFacingLeft ||
        shooter.type == leftFacingPlayer) {
        addSprite(originX, originY, bullet)
    }
    else if (shooter.type == npcFacingRight ||
             shooter.type == rightFacingPlayer) {
      addSprite(originX, originY, bullet)
    }
  }
}
