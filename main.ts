enum ActionKind {
    Walking,
    Idle,
    Jumping,
    Attacking
}
namespace SpriteKind {
    export const diamond = SpriteKind.create()
    export const ghostSpawner = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        fffff...........
        ...dffff........
        ....ddfff.......
        ......dffff.....
        .......dffff....
        ........fffff...
        ........dffff...
        .........dffff..
        ..........fffff.
        ..........fffff.
        ..........dffff.
        ...........fffff
        ...........dffff
        ...........dffff
        ...........dffff
        ...........dffff
        ...........fffff
        ..........dffff.
        ..........dffff.
        ..........fffff.
        .........dffff..
        ........dffff...
        ........fffff...
        .......dffff....
        ......dffff.....
        ....ddfff.......
        ...dffff........
        fffff...........
        `, reaper, 200, 0)
    projectile.setScale(2.2, ScaleAnchor.Middle)
    animation.setAction(reaper, ActionKind.Attacking)
    pause(150)
    sprites.destroy(projectile)
    animation.setAction(reaper, ActionKind.Idle)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (reaper.vy == 0) {
        reaper.vy = -225
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava0, function (sprite, location) {
    game.gameOver(false)
})
function PlayerAnimations () {
    idling = animation.createAnimation(ActionKind.Idle, 100)
    attacking = animation.createAnimation(ActionKind.Attacking, 5)
    idling.addAnimationFrame(assets.image`ReaperIdle1`)
    idling.addAnimationFrame(assets.image`ReaperIdle2`)
    idling.addAnimationFrame(assets.image`ReaperIdle3`)
    idling.addAnimationFrame(assets.image`ReaperIdle4`)
    attacking.addAnimationFrame(assets.image`ReaperAttack1`)
    attacking.addAnimationFrame(assets.image`ReaperAttack2`)
    attacking.addAnimationFrame(assets.image`ReaperAttack3`)
    attacking.addAnimationFrame(assets.image`ReaperAttack4`)
    attacking.addAnimationFrame(assets.image`ReaperAttack5`)
    attacking.addAnimationFrame(assets.image`ReaperAttack6`)
    attacking.addAnimationFrame(assets.image`ReaperAttack7`)
    animation.attachAnimation(reaper, idling)
    animation.attachAnimation(reaper, attacking)
    animation.setAction(reaper, ActionKind.Idle)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.diamond, function (sprite, otherSprite) {
    diamondsCounterInt += 1
    RefreshText()
    sprites.destroy(otherSprite)
})
function RefreshText () {
    enemiesLeftText.setText(": " + enemiesLeftInt)
    diamondsText.setText(": " + diamondsCounterInt)
    lifeText.setText(": " + lifeInt)
}
function PlayerController () {
    reaper = sprites.create(assets.image`ReaperIdle1`, SpriteKind.Player)
    reaper.setPosition(27, 170)
    reaper.setScale(0.65, ScaleAnchor.Middle)
    reaper.ay = 500
    controller.moveSprite(reaper, 150, 0)
    PlayerAnimations()
}
function CoinAnimation () {
    diamondIdle = animation.createAnimation(ActionKind.Idle, 100)
    diamondIdle.addAnimationFrame(assets.image`Diamond1`)
    diamondIdle.addAnimationFrame(assets.image`Diamond2`)
    diamondIdle.addAnimationFrame(assets.image`Diamond3`)
    diamondIdle.addAnimationFrame(assets.image`Diamond4`)
    animation.attachAnimation(diamondSprite, diamondIdle)
    animation.setAction(diamondSprite, ActionKind.Idle)
}
function GhostAnimations () {
    ghostIdle = animation.createAnimation(ActionKind.Idle, 100)
    ghostIdle.addAnimationFrame(assets.image`GhostIdle1`)
    ghostIdle.addAnimationFrame(assets.image`GhostIdle2`)
    ghostIdle.addAnimationFrame(assets.image`GhostIdle3`)
    ghostIdle.addAnimationFrame(assets.image`GhostIdle4`)
    ghostIdle.addAnimationFrame(assets.image`GhostIdle5`)
    ghostIdle.addAnimationFrame(assets.image`GhostIdle6`)
    ghostIdle.addAnimationFrame(assets.image`GhostIdle7`)
    ghostIdle.addAnimationFrame(assets.image`GhostIdle8`)
    ghostIdle.addAnimationFrame(assets.image`GhostIdle9`)
    ghostIdle.addAnimationFrame(assets.image`GhostIdle10`)
    animation.attachAnimation(ghost, ghostIdle)
    animation.setAction(ghost, ActionKind.Idle)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.ghostSpawner, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    GhostController()
})
function ScreenText () {
    enemiesLeftText = textsprite.create("Test")
    enemiesLeftText.setBorder(1, 0, 1)
    enemiesLeftText.setOutline(1, 15)
    enemiesLeftText.setIcon(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 4 . . e f . . . . . . . 
        . . . . . . 4 f e e . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . 1 . 4 f e e . . . . . . 
        . . . . 1 e e e e e e . . . . . 
        . . . . . e f e e e e . . . . . 
        . . . . . f e f f e f . . . . . 
        . . . . . e e e f f . . . . . . 
        . . . . . e e e 7 f . . . . . . 
        . . . . . . f e . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    enemiesLeftText.setFlag(SpriteFlag.RelativeToCamera, true)
    enemiesLeftText.setPosition(130, 11)
    lifeText = textsprite.create("Test")
    lifeText.setBorder(1, 0, 1)
    lifeText.setOutline(1, 15)
    lifeText.setIcon(img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        .......22...22......
        ......2322.2222.....
        ......232222222.....
        ......222222222.....
        .......22222b2......
        ........222b2.......
        .........222........
        ..........2.........
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        `)
    lifeText.setFlag(SpriteFlag.RelativeToCamera, true)
    lifeText.setPosition(30, 11)
    diamondsText = textsprite.create("Test")
    diamondsText.setBorder(1, 0, 1)
    diamondsText.setOutline(1, 15)
    diamondsText.setIcon(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . f . . . . . . . 
        . . . . . . . e 3 . . . . . . . 
        . . . . . . . e e f . . . . . . 
        . . . . . . e e e 3 . . . . . . 
        . . . . . . e e e 3 f . . . . . 
        . . . . . e 2 e e 3 3 . . . . . 
        . . . . . 2 2 e e f f . . . . . 
        . . . . . . e 2 e f f . . . . . 
        . . . . . . e 2 e e . . . . . . 
        . . . . . . . 2 e f . . . . . . 
        . . . . . . . 2 e . . . . . . . 
        . . . . . . . . f . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    diamondsText.setFlag(SpriteFlag.RelativeToCamera, true)
    diamondsText.setPosition(80, 11)
}
function createCoins () {
    for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
        diamondSprite = sprites.create(assets.image`Diamond1`, SpriteKind.diamond)
        diamondSprite.setScale(0.4, ScaleAnchor.Middle)
        tiles.placeOnTile(diamondSprite, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        CoinAnimation()
    }
}
function GhostController () {
    ghost = sprites.create(assets.image`GhostIdle10`, SpriteKind.Enemy)
    ghost.setScale(0.7, ScaleAnchor.Middle)
    ghost.setPosition(reaper.x + 70, reaper.y - 50)
    ghost.follow(reaper)
    GhostAnimations()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    enemiesLeftInt += -1
    RefreshText()
    sprites.destroy(otherSprite)
})
function GhostSpawner () {
    for (let value2 of tiles.getTilesByType(assets.tile`myTile0`)) {
        ghostSpawnPoint = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 4 4 4 . . . . . . 
            . . . . 4 4 4 5 5 4 4 4 . . . . 
            . . . 3 3 3 3 4 4 4 4 4 4 . . . 
            . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
            . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
            . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
            . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
            . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
            . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
            . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
            . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
            . . . 4 2 2 2 2 2 2 2 2 4 . . . 
            . . . . 4 4 2 2 2 2 4 4 . . . . 
            . . . . . . 4 4 4 4 . . . . . . 
            . . . . . . . . . . 3 . . . . . 
            `, SpriteKind.ghostSpawner)
        enemiesLeftInt += 1
        tiles.placeOnTile(ghostSpawnPoint, value2)
        tiles.setTileAt(value2, assets.tile`transparency16`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    enemiesLeftInt += -1
    lifeInt += -1
    RefreshText()
    sprites.destroy(otherSprite)
})
let ghostSpawnPoint: Sprite = null
let ghost: Sprite = null
let ghostIdle: animation.Animation = null
let diamondSprite: Sprite = null
let diamondIdle: animation.Animation = null
let lifeText: TextSprite = null
let diamondsText: TextSprite = null
let enemiesLeftInt = 0
let enemiesLeftText: TextSprite = null
let diamondsCounterInt = 0
let attacking: animation.Animation = null
let idling: animation.Animation = null
let projectile: Sprite = null
let reaper: Sprite = null
let lifeInt = 0
scene.setBackgroundColor(1)
scene.setBackgroundImage(img`
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccc6c6ccc66ccccccccccccccccccccccccccccccccccc66ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccc66ccc666cccccccccccccccccccccccccccccccccc66cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    ccccccccccccccccccccc66cccc666cccccccccccccccccccccccccccccc6ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccc6666cccccccccccccccccccccccccccc666cccccccccccccccccccccccccccccc66666ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc6
    6ccccccccccccccccccccccc666666ccccccccccccccccccccccccccc66666ccccccccccccccccccccccccc6666666666cccccccccccccccccccccc6cccccccccccccccccccccccccccccccc6ccccc66
    6cccccccccccccc6ccccc666666666c66666ccccccccccccccccccccc666666cccccccccccccc66c66ccc6666666666666ccccccccccccccccccc666cccccccccccccccccccccccccccccccc6ccccc66
    66ccccccccccc6666ccc6666666666c666666c6cccccccccccc66cccc666666ccccccccccccc66666cccc66666666666666c666c66cccc6cccc6666666cccccccccccccccccccccccc666c6c6ccccc66
    66ccccccccc666666ccc6666666666c66666666cccccccccccc66cccc666666cccccccccccc666666cccc66666666666666c666666ccccccccc6666666cccccccccccc6cccccccccc6666c6c6ccccc66
    66cccccccccc66666ccc6666666666c66666666666cccc6ccccc6cccc666666cccccccccccc66666cccc666666666666666c6666666ccccccccc666666ccccccccccc6666c6ccccc66666c6c6ccccc66
    66cccccccccc6666cccc6666666666c66666666666666c66cccccccc6666666cccccccccccc66666cccc666666666666666c66666666cccccccc666666ccccccccccc6666ccccccc66666c6c6ccccccc
    ccccccccccc666cccccc6666666666c66666666666666666cccccccc666666cccccccccccc666cccccc6666666666666666c66666666cc66ccccccccccccccccccccc66ccccccccc66666cccc66ccccc
    ccccccccccc66ccccccc6666666666c666666666666666666cccccc6666666cccccccccccc6cccccccc6666666666666666cc6666666c6666cccccccccccccccccccccccccccccc6666666ccc66ccccc
    ccccccccccc6cccccccc6666666666c666666666666666666cccccc6666666cccccccccccccccccccc666666666666666666c666666c66666cccccccccccccccccccccccccccccc6666666cc6666cccc
    cccccccccccccccccc666666666666c6666666c6666666666ccccc6666666cccccccccccccccccccc66666666666666666666cc666cc66666ccccccccccccccccccccccccccccc666666666c66666c6c
    ccccccccccccccc66666666666666666666666c66666666666ccccc666666ccccccccccccccccc666666666666666666666666cccc6666666666cccccccccccccccccccccccc66666666666c66666666
    66cccccccccccc66666666666666666c66666cc66666666666ccccc666666ccccccccccccccc666666666666666666666666666666666666666666cccccccccccccccccccc666666666666666666c666
    66ccccccccccc666666666666666666ccc66cc6666666666666cccccc666cccccccccccccc666666666666666666666666666666666666666666666ccccccccccccccccc6666666666666666c666c666
    66ccccccccccccc6666666666666666cccccc66666666666666ccccccccccccccccccccc6666666666666666666666666666666666666666666666666ccccccccccccc6666666666666666666ccc6666
    66cccccccccccccc66666666666666666cc6666666666666666ccccccccccccccccccccc6666666666666666666666666666666666666666666666666cccccccccccc666666666666666666666666666
    66ccccccccccc66c666666666666666666666666666666666666cccccccccccccccccccc6666666666666666666666666666666666666666666666666ccccccccccc6666666666666666666666666666
    66cccccccccccc66666666666666666666666666666666666666cccccccccccccccccccc6666666666666666666666666666666666666666666666666ccccccccccc6666666666666666666666666666
    66cccccccccccc6b6666666666666666666666666666666666666cccccccccccccccccc66666666666666666666666666666666666666666666666666ccccccccccc6666666666666666666666666666
    bbcccccccccc6bcdb6666666666666666666666666666666666666ccccccccccccccccccc666666666666666666666666666666666666666666666666ccccccccccc6666666666666666666666666666
    dd6cccccccccbdbd966666666666666666666666666666666666666cccccccccccccccccc666666666666666666666666666666666666666666666666ccccccccccc666666666666666666666666666b
    ddbcccccccccbddd9666666666666666666666666666666666666bb696ccccccccccccc6b6bb6666666666666666666666bb666666666666666666666ccccccccccc66666666666666666666666666bd
    ddbcccccccccbdddd6666666666666b66666666666666b666666dbd66666cccccccccccccbddb666666666666666666bbdbb666b666666666666b6666ccccccccccc6b66b666666666666666666bbddd
    ddbcccccccccbddddb666666666666d66666666666bbbdb66666dddbb666cccccccccccccbdddbb6666666666666bbb99ddb666bb66666666666ddbb6ccccccccccc6b66bb6666666666666666bbdddd
    dddccccccccc6ddddb666666666666dbb6666bbbbdbddd966666dddbb666ccccccccccccbddddddb666666bbbbb99dddddddb666666666666666bdddbccccccccccccb66bb66666666666666669bdddd
    dddccccccccccddddb666666666666dbb9666bbbddbddd966666ddddb666cccccccccccc6ddddddd66666bddddddddddddddb6666666666666669dddbcccccccccccc6666666666666666666666bdddd
    dddccccccccccdddbb666666666666db6b6666bdddd9ddd66666bddddb66ccccccccccccdddddddd666669dddddddddddddd9666666666666666dddddcccccccccccc6666b6666666666b666666ddddd
    dddbcccccccccbddb6666666666666bdd66666ddddddddd666666ddddd66ccccccccccccddddddb9666669ddddd9d9ddddddd666666666666666dddddcccccccccccc6666d6666666666db9666bddddd
    dddbccccccccccddd6666666666666bdd66669dddddddddb66666ddddd66ccccccccccccbdddddb6666666ddddddbdddddddd66666666666666bdddddcccccccccccc666bd9666666666bd9666dddddd
    ddddccccccccccbddb6666666666666ddb666bdddddddddd66666ddddd66cccccccccccc6dddddb666666bdddddddddddddddb6666666666666bdddddccccccccccccc66bd96666666666bb666dddddd
    ddddccccccccccbdd66666666666666ddb666ddddddddddd666669dddd66ccccccccccccbddddbb666666ddddddddddddddddb6666666666666bdddddccccccccccccc66bd9666666666b6666bdddddd
    ddddbcccccccccbdd66666666666666ddb666ddddddddddd666669dddb66cccccccccccccddddddb666666dddddddddddddddb6666666666666bdddddccccccccccccc66bdd666666666bb666bdddddd
    ddddbccccccccccd966666666666666bdb666ddddddddddd666669ddddbb6ccccccccccccdddddd666666ddddddddddddddddb6666666666666bdddddbcccccccccccc66bdd6666666666b666ddddddd
    dddddccccccccccb6666666666666666b666bddddddddddd66666b9ddd9d6ccccccccccccbdddd9666666ddddddddddddddddd6666666666666bdddddbcccccccccccc669bd6666666666666bddddddd
    ddddd6cccccccccc666666666666666b6666bddddddddddb666666bddddd6cccccccccccc6dddd9666666ddddddddddddddddb6666666666666bdddbbbcccccccccccc66b9d6666666666666dddddddd
    dddddbcccccccccc66666666666666666666ddddddddddd6666666dddddd6cccccccccccccddd6b66666bdddddddddddddddd66666666666666ddd6ccccccccccccccc666bd666666666666bdddddddd
    dddddbccccccccccc666666666666666666bdddddddddd966666666dddddccccccccccccccbdd9666666bddddddddddddddddb6666666666666dddbccccccccccccccc666bd666666666666ddddddddd
    dddddbccccccccccc666666666666666666ddddddddddd666666666dddddccccccccccccccbdb6666666bdddddddddddddddd66666666666666ddddb6ccccccccccccc66bbd6666666666666dddddddd
    ddddddccccccccccc66666666666666666bddddddddddb66666666dddddd6ccccccccccccc6dbb666666bddddddddddddddd96666666666666b9dddbbbcccccccccccc66d9d6666666666669bddddddd
    ddddddcccccccccccc6666666666666666bdddddddddd6666666bb9ddbbd6ccccccccccccccdd6666666bddddddddddddddb6666666666666666bdd6cccccccccccccc6bddd66666666666bddddddddd
    ddddddbccccccccccc6666666666666666ddddddddddd6666666dddddb6666cccccccccccccb966666669ddddddddddddddd666666666666666bdddd6ccccccccccccc6bddd66666666666bddddddddd
    ddddddbcccccccccccc6b6666666666666bdddddddddb6666666dddddbb666ccccccccccccccdb6666669dddddddddddddddb6666666666666669dddb6cccccccccccc6dddd66666666666bddddddddd
    dddddddcccccccccccc6d66666666666666dddddddddb666666bddddd6ccccccccccccccccccb6666666ddddddddddddddddb66666666666666bddddcccccccccccccc6dddd66666666666bddddddddd
    dddbbddcccccccccccc6cccc66666666666ddddddddd6666666dddddb6ccccccccccccccccccc6666666dddddddddddddddd66666666666666dbdddddbccccccccccccbdddd66666666666bddddddddd
    ddddbdd6ccccccccccccccccc6666666666ddddddddd6666666ddddddbccccccccccccccccccc6666666ddddddd9dddddddd66666666666666dddddddbccccccccccccbdddd66666666666bddddddddd
    dbdd6d96ccccccccccccccccc666666666bddddddddd666666669ddddb666cccccccccccccccc6666666dddddddbdddddddd6666666666666bdddddddbccccccccccccbddd966666666666bddddddddd
    dbbdbddbcccccccccccccc66c666666666bdddddddd966666669bddddbb6cccccccccccccccccc66666bbddddddbdd9ddddd66666666666669dddddddccccccccccccc6dddb666666666666bdddddddd
    dbdd6ddbccccccccccccccccc6666666666dddddddd96666666bdddddbbccccccccccccccccccc66666bbbbddddbdbbddbdb66666666666669dddddddcccccccccccccbddb666666666666bddddddddd
    dbd9bdd6ccccccccccccccccc6666666666bdb9ddddb66666666d6bbddbcccccccccccccccccccc666666bddddb6ddbdd9bb6666666666666ddddddddcccccccccccccccbb666666666666bddddddddd
    dbbb9b966cccccccccccccccc6666666666bddbbdbb6666666b9bb66bdbcc6ccccccccccccccccc6666bbbbddddbd9bddd666666666666666dddddddbccccccccccccccc6b666666666666bddddddddd
    dbbbd9666cccccccccccccc6c666666666666dbbdd666666666b6666bd6c6cccccccccccccccccc6666666bdddd9bbddd6666666666666666dddddddbccccccccccccc6dbb666666666666bddddddddd
    ddbbbb666cccccccccccccc6666666666666bdb9db6666666666666666666ccccccccccccccccccc66666bdbddddbbbddb666666666666666dddddddbccccccccccccc6bbb6666666666666bdddbbddd
    dbb666666ccccccccccccccc6666666666666666b66666666666666666666ccccccccccccccccccc666666bbdd99bbddb6666666666666666dddddddcccccccccccccccc6666666666666666dbb6bd9d
    bb66666666cccccccccccccc66666666666666666666666666666666666666c6ccccccccccccccccc66c666bd6b66bbbb6666666666666666ddddbb6ccccccccccccccccc666666666666666ddb66dd6
    666666666ccccccccccccccc666666666666c6666666666666666666666666c6ccccccccccccccccc6cc6666b66666bb66666666666666666ddbbb66cccccccccccccc66c66666666666666666666bb6
    6666666cccccccccccccccccc66666666666c66666666666666666666666666cccccccccccccccccccc66666666666666666666666666666666b666ccccccccccccccc66666666666666666666666666
    6666666cccccccccccccccccc66666666666cc6666666666666666666666666cccccccccccccccccccc666666666666666666666666666666669b66cccccccccccccccc6666666666666666666666666
    6666666666ccccccccccccccc66666666666c66666666666666666666666666ccccccccccccccccccc666666666666666666666666666666666666ccccccccccccccc6c6666666666666666666666666
    66666666ccccccccccccccccc66666666666cc6666c66666666666666666666ccccccccccccccccccc666666666666666666666666666666666666ccccccccccccccc6c666666666666cccccc6666666
    6666666cccccccccccccccccc666666666666c6666c66666666666666666666cccccccccccccccccccc6666666666666666666666666666666666cccccccccccccccc66666666666666cccccc6666666
    66666666ccccccccccccccccc66666666666cc666cc66666666666666666666ccccccccccccccccccccc666666666666666666666666666666666ccccccccccccccc666666666666666ccccccc666666
    666666666ccccccccccccccccc66666666666c6666c6666666666666666666ccccccccccccccccccccccc66666666666666666666666666666666ccccccccccccccc666666666666666666cc6c666666
    66666666cccccccccccccccccc66666666666c6666c6666666666666666666ccccccccccccccccccccccc6666666666666666666666666666666cccccccccccccccc666666666666666666c666666666
    6666666666cccccccccccccccc66666666666cc66cc6666666666666666666ccccccccccccccccccccc6c6666666666666666666666666666666cccccccccccccccc666666666666666cccc666666666
    6666666666cccccccccccccccccc666666666cc66cc6666666666666666666ccccccccccccccccccccc6c6666666666666666666666666666666ccccccccccccccc6666666666666666cccc666666666
    6666666666cccccccccccccccccc6666666666c66cc666666666666666666cccccccccccccccccccccc666666666666666cccccc666666666666ccccccccccccccc6666666666666666cccc666666666
    666666666ccccccccccccccccccc6666666666c66c6666666666666666666cccccccccccccccccccccccc666666666666cccccccc6666666666cccccccccccccccc6666666666666666c6ccc66666666
    666666666ccccccccccccccccccc6666c66666c66c6666666666666666666cccccccccccccccccccccccc666666666666cccccccc6666666666cccccccccccccccc66666666cc6666666cccc66666666
    6666666666cccccccccccccccccc6ccc6cc666cc6cc6666666666666666ccccccccccccccccccccccccc6666666666666ccccc6cc6666666666cccccccccccccccc66666666cc6666666cc6666666666
    666666666ccccccccccccccccccccccccc6666c66cc6666666666666666ccccccccccccccccccccccccc6666666666666ccccc66666c66666c6cccccccccccccccc66666666ccc6666ccc666c6666666
    6c6666c6cccccccccccccccccccccccccc6c6cc66c666c66666666666c6ccccccccccccccccccccccccc66666666666666cccccc66ccc66cccccccccccccccccccc66666666cc6666ccccc66cc6c6c66
    cc6cccc6cccccccccccccccccccccccccccccccc6ccccc666666666c6ccccccccccccccccccccccccccc66666666666666ccccccc666cc6cccccccccccccccccccc66666666cc6666ccccc6c6c6ccc6c
    ccc6ccccccccccccccccccccccccccccccccccccccccc66666c6666c6ccccccccccccccccccccccccccc66666666666666cc6ccc6666ccccccccccccccccccccccc66c6666ccc6666cc6cccc6ccccccc
    cccccccccccccccccccccccccccccccccccccccccccc6ccc6cc66c6ccccccccccccccccccccccccccccc6666666666666666ccccccccccccccccccccccccccccccc6cc6666cc66666cc6cccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccc6cccccccccccccccccccccccccccccccc66666cc66666666ccccccccccccccccccccccccccccccc66c6666ccc6666ccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccc66ccccccccccccccccccccccccccccccc6cc66c666666666ccccccccccccccccccccccccccccccc66ccc66ccc6666ccccccccccccccc
    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc6c6666666cc66666cccccccccccccccccccccccc66cc6c6cc666ccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc6cc6c6666ccccccccccccccccccccccccccccc6cccc6ccc66ccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc666cccc6666ccccccccccccccccccccccccccccc66ccccccc6cccccccccccccccccc
    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc66cccc6666ccccccccccccccccccccccccccccccccccccc6ccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc6ccccc666ccccccccccccccccccccccccccccc6ccccccc6ccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc6ccccccccccccccccccc
    ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc6cccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
    `)
tiles.setCurrentTilemap(tilemap`level`)
lifeInt = 5
PlayerController()
scene.cameraFollowSprite(reaper)
createCoins()
GhostSpawner()
ScreenText()
RefreshText()
game.onUpdate(function () {
    if (reaper.vx < 0) {
        reaper.setImage(assets.image`ReaperIdle1`)
        reaper.image.flipX()
    }
})
