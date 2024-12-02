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
    export const DemonBoss = SpriteKind.create()
}
function DemonAnimations () {
    demonIdle = animation.createAnimation(ActionKind.Idle, 100)
    animation.attachAnimation(demonBoss, demonIdle)
    demonIdle.addAnimationFrame(assets.image`DemonIdle1`)
    demonIdle.addAnimationFrame(assets.image`DemonIdle2`)
    demonIdle.addAnimationFrame(assets.image`DemonIdle3`)
    demonIdle.addAnimationFrame(assets.image`DemonIdle4`)
    demonIdle.addAnimationFrame(assets.image`DemonIdle5`)
    demonIdle.addAnimationFrame(assets.image`DemonIdle6`)
    animation.setAction(demonBoss, ActionKind.Idle)
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`ReaperAttack`, reaper, 50, 0)
    projectile.setScale(0.8, ScaleAnchor.Middle)
    animation.setAction(reaper, ActionKind.Attacking)
    pause(150)
    sprites.destroy(projectile)
    animation.setAction(reaper, ActionKind.Idle)
})
function DemonBossSpawner () {
    for (let value of tiles.getTilesByType(assets.tile`myTile7`)) {
        demonBoss = sprites.create(assets.image`DemonIdle1`, SpriteKind.DemonBoss)
        demonBoss.ay = 500
        tiles.setTileAt(value, assets.tile`transparency16`)
        tiles.placeOnTile(demonBoss, value)
        DemonAnimations()
    }
}
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
        for (let value2 of tiles.getTilesByType(assets.tile`myTile6`)) {
            tiles.placeOnRandomTile(reaper, assets.tile`myTile6`)
            tiles.setTileAt(value2, assets.tile`transparency16`)
            game.gameOver(true)
        }
    } else {
        reaper.sayText("Aún no", 500, false)
        game.showLongText("Tu enemigo final esta en la siguiente arena, DERRÓTALO!", DialogLayout.Bottom)
        for (let value22 of tiles.getTilesByType(assets.tile`myTile6`)) {
            tiles.placeOnRandomTile(reaper, assets.tile`myTile6`)
            tiles.setTileAt(value22, assets.tile`transparency16`)
        }
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
    for (let value3 of tiles.getTilesByType(assets.tile`myTile4`)) {
        portal = sprites.create(assets.image`Portal7`, SpriteKind.Portal)
        tiles.placeOnTile(portal, value3)
        tiles.setTileAt(value3, assets.tile`transparency16`)
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
    reaper.setScale(0.65, ScaleAnchor.Middle)
    reaper.ay = 500
    controller.moveSprite(reaper, 150, 0)
    for (let value4 of tiles.getTilesByType(assets.tile`myTile5`)) {
        tiles.placeOnRandomTile(reaper, assets.tile`myTile5`)
        tiles.setTileAt(value4, assets.tile`transparency16`)
    }
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
    for (let value5 of tiles.getTilesByType(assets.tile`myTile`)) {
        diamondSprite = sprites.create(assets.image`Diamond1`, SpriteKind.diamond)
        totalDiamonds += 1
        diamondSprite.setScale(0.4, ScaleAnchor.Middle)
        tiles.placeOnTile(diamondSprite, value5)
        tiles.setTileAt(value5, assets.tile`transparency16`)
        CoinAnimation()
    }
}
function GhostController () {
    ghost = sprites.create(assets.image`GhostIdle10`, SpriteKind.Enemy)
    ghost.setScale(0.7, ScaleAnchor.Middle)
    ghost.setPosition(reaper.x + 70, reaper.y - 50)
    if (!(invincible)) {
        ghost.follow(reaper)
    }
    GhostAnimations()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    enemiesLeftInt += -1
    RefreshText()
    sprites.destroy(otherSprite)
})
function GhostSpawner () {
    for (let value6 of tiles.getTilesByType(assets.tile`myTile0`)) {
        ghostSpawnPoint = sprites.create(assets.image`GhostSpawner`, SpriteKind.ghostSpawner)
        enemiesLeftInt += 1
        tiles.placeOnTile(ghostSpawnPoint, value6)
        tiles.setTileAt(value6, assets.tile`transparency16`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    lifeInt += -1
    RefreshText()
    reaper.sayText("AU", 200, false)
    ghost.setVelocity(800, 0)
    invincible = true
    if (invincible) {
        ghost.follow(null)
        pause(1000)
        ghost.follow(sprite)
        invincible = false
    }
})
let ghostSpawnPoint: Sprite = null
let invincible = false
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
let demonBoss: Sprite = null
let demonIdle: animation.Animation = null
let reaper: Sprite = null
let lifeInt = 0
let mainMenu: miniMenu.MenuSprite = null
let mainMenuItems: miniMenu.MenuItem[] = []
let level = 0
if (level == 0) {
    mainMenuItems = [
    miniMenu.createMenuItem("Jugar"),
    miniMenu.createMenuItem("Lore"),
    miniMenu.createMenuItem("Controles"),
    miniMenu.createMenuItem("Salir")
    ]
    mainMenu = miniMenu.createMenuFromArray(mainMenuItems)
    mainMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 100)
    mainMenu.setFrame(img`
        ..bbbbbbbbbbbbbbbbbbbb..
        .bd111111111111111111db.
        bd1dbbbbbbbbbbbbbbbbd1db
        b1dbbbbbbbbbbbbbbbbbbd1b
        b1bd1111111111111111db1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1b111111111111111111b1b
        b1bd1111111111111111db1b
        bd1bbbbbbbbbbbbbbbbbb1db
        bbd111111111111111111dbb
        .bbbbbbbbbbbbbbbbbbbbbb.
        ..bbbbbbbbbbbbbbbbbbbb..
        `)
    mainMenu.setPosition(111, 90)
    scene.setBackgroundImage(assets.image`Bg`)
} else {
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
    DemonBossSpawner()
}
game.onUpdate(function () {
    if (level == 1) {
        if (reaper.vx < 0) {
            reaper.setImage(assets.image`ReaperIdle1`)
            reaper.image.flipX()
        }
    }
})
game.onUpdateInterval(100, function () {
    if (level == 1) {
        if (lifeInt == 0) {
            game.gameOver(false)
        }
    }
})
