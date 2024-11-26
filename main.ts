enum ActionKind {
    Walking,
    Idle,
    Jumping,
    Attacking
}
namespace SpriteKind {
    export const diamond = SpriteKind.create()
    export const ghostSpawner = SpriteKind.create()
    export const Portal = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`ReaperAttack`, reaper, 50, 0)
    projectile.setScale(0.8, ScaleAnchor.Middle)
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Portal, function (sprite, otherSprite) {
    if (enemiesLeftInt == 0 && diamondsCounterInt == totalDiamonds) {
        game.gameOver(true)
    } else {
        reaper.sayText("Aún no")
    }
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
    reaper.sayText("Diamantito!", 500, false)
    RefreshText()
    sprites.destroy(otherSprite)
})
function PortalCreator () {
    for (let value of tiles.getTilesByType(assets.tile`myTile4`)) {
        portal = sprites.create(assets.image`Portal7`, SpriteKind.Portal)
        tiles.placeOnTile(portal, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        PortalAnimator()
    }
}
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
    reaper.sayText("FANTASMAA!!!!", 500, false)
    GhostController()
})
function ScreenText () {
    enemiesLeftText = textsprite.create("Test")
    enemiesLeftText.setBorder(1, 0, 1)
    enemiesLeftText.setOutline(1, 15)
    enemiesLeftText.setIcon(assets.image`EnemiesIcon`)
    enemiesLeftText.setFlag(SpriteFlag.RelativeToCamera, true)
    enemiesLeftText.setPosition(130, 11)
    lifeText = textsprite.create("Test")
    lifeText.setBorder(1, 0, 1)
    lifeText.setOutline(1, 15)
    lifeText.setIcon(assets.image`LifeIcon`)
    lifeText.setFlag(SpriteFlag.RelativeToCamera, true)
    lifeText.setPosition(30, 11)
    diamondsText = textsprite.create("Test")
    diamondsText.setBorder(1, 0, 1)
    diamondsText.setOutline(1, 15)
    diamondsText.setIcon(assets.image`DiamondIcon`)
    diamondsText.setFlag(SpriteFlag.RelativeToCamera, true)
    diamondsText.setPosition(80, 11)
}
function PortalAnimator () {
    portalAnim = animation.createAnimation(ActionKind.Walking, 60)
    portalAnim.addAnimationFrame(assets.image`Portal1`)
    portalAnim.addAnimationFrame(assets.image`Portal2`)
    portalAnim.addAnimationFrame(assets.image`Portal3`)
    portalAnim.addAnimationFrame(assets.image`Portal4`)
    portalAnim.addAnimationFrame(assets.image`Portal5`)
    portalAnim.addAnimationFrame(assets.image`Portal6`)
    portalAnim.addAnimationFrame(assets.image`Portal7`)
    animation.attachAnimation(portal, portalAnim)
    animation.setAction(portal, ActionKind.Walking)
}
function createCoins () {
    for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
        diamondSprite = sprites.create(assets.image`Diamond1`, SpriteKind.diamond)
        totalDiamonds += 1
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
        ghostSpawnPoint = sprites.create(assets.image`GhostSpawner`, SpriteKind.ghostSpawner)
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
let portalAnim: animation.Animation = null
let ghost: Sprite = null
let ghostIdle: animation.Animation = null
let diamondSprite: Sprite = null
let diamondIdle: animation.Animation = null
let lifeText: TextSprite = null
let diamondsText: TextSprite = null
let enemiesLeftText: TextSprite = null
let portal: Sprite = null
let attacking: animation.Animation = null
let idling: animation.Animation = null
let totalDiamonds = 0
let diamondsCounterInt = 0
let enemiesLeftInt = 0
let projectile: Sprite = null
let reaper: Sprite = null
let lifeInt = 0
scene.setBackgroundColor(1)
scene.setBackgroundImage(assets.image`Bg`)
tiles.setCurrentTilemap(tilemap`level`)
lifeInt = 99
PlayerController()
scene.cameraFollowSprite(reaper)
createCoins()
GhostSpawner()
PortalCreator()
ScreenText()
RefreshText()
game.showLongText("Elimina a todos los enemigos y consigue todos los diamantes!", DialogLayout.Bottom)
game.onUpdate(function () {
    if (reaper.vx < 0) {
        reaper.setImage(assets.image`ReaperIdle1`)
        reaper.image.flipX()
    }
})
game.onUpdateInterval(100, function () {
    if (lifeInt == 0) {
        game.gameOver(false)
    }
})
