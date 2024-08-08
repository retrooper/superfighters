/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Super Fighters
@author: retrooper
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"

setLegend(
  [ player, bitmap`
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
.....000...000..` ]
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
  [ player ]: []
})

onInput("w", () => {
  let playerY = getFirst(player).y
  let playerX = getFirst(player).x
  let distanceToGround = height() - Math.abs(playerY) - 1
  if (distanceToGround === 0) {
      getFirst(player).y -= 1
      setTimeout()
  }
})

onInput("s", () => {
  //getFirst(player).y += 1
})

setTimeout(() => {
  
}, 200)

setInterval(() => {
  //getFirst(player).y += 1
  let playerY = getFirst(player).y
  let playerX = getFirst(player).x
  let distanceToGround = height() - Math.abs(playerY) - 1
  //TODO For combat
  //getFirst(player).y -= distanceToGround
  getFirst(player).y += distanceToGround
}, 500)

afterInput(() => {
  interval = setInterval(() -> {
    
  }, 20)

  
})