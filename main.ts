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
        reaper.vy = -200
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
    sprites.destroy(otherSprite)
})
function PlayerController () {
    reaper = sprites.create(assets.image`ReaperIdle1`, SpriteKind.Player)
    reaper.setPosition(24, 170)
    reaper.setScale(0.7, ScaleAnchor.Middle)
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
function createCoins () {
    for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
        diamondSprite = sprites.create(assets.image`Diamond1`, SpriteKind.diamond)
        diamondSprite.setScale(0.4, ScaleAnchor.Middle)
        tiles.placeOnTile(diamondSprite, value)
        tiles.setTileAt(value, sprites.dungeon.floorLight5)
        CoinAnimation()
    }
}
function GhostController () {
    ghost = sprites.create(assets.image`GhostIdle10`, SpriteKind.Enemy)
    ghost.setScale(0.7, ScaleAnchor.Middle)
    ghost.setPosition(reaper.x + 80, reaper.y - 80)
    ghost.follow(reaper)
    GhostAnimations()
}
function CountEnemiesLeft () {
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
}
function RefreshTextEnemiesCount () {
    enemiesLeftText.setText(":" + enemiesLeftInt)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    enemiesLeftInt += -1
    RefreshTextEnemiesCount()
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
        tiles.setTileAt(value2, sprites.dungeon.floorLight5)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    enemiesLeftInt += -1
    RefreshTextEnemiesCount()
    sprites.destroy(otherSprite)
})
let ghostSpawnPoint: Sprite = null
let enemiesLeftInt = 0
let enemiesLeftText: TextSprite = null
let ghost: Sprite = null
let ghostIdle: animation.Animation = null
let diamondSprite: Sprite = null
let diamondIdle: animation.Animation = null
let attacking: animation.Animation = null
let idling: animation.Animation = null
let projectile: Sprite = null
let reaper: Sprite = null
scene.setBackgroundColor(1)
tiles.setCurrentTilemap(tilemap`level3`)
PlayerController()
scene.cameraFollowSprite(reaper)
createCoins()
GhostSpawner()
CountEnemiesLeft()
RefreshTextEnemiesCount()
game.onUpdate(function () {
    if (reaper.vx < 0) {
        reaper.setImage(assets.image`ReaperIdle1`)
        reaper.image.flipX()
    }
})
