enum ActionKind {
    Walking,
    Idle,
    Jumping,
    Attacking,
    WalkingBackwards,
    Hurt
}
namespace SpriteKind {
    export const diamond = SpriteKind.create()
    export const ghostSpawner = SpriteKind.create()
    export const Portal = SpriteKind.create()
    export const Boss = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (level == 1) {
        if (facingDirection == 1) {
            projectile = sprites.createProjectileFromSprite(assets.image`ReaperAttack`, reaper, 50, 0)
            projectile.setScale(0.8, ScaleAnchor.Middle)
            animation.setAction(reaper, ActionKind.Attacking)
            pause(150)
            sprites.destroy(projectile)
            animation.setAction(reaper, ActionKind.Idle)
        } else {
            if (facingDirection == 2) {
                projectile = sprites.createProjectileFromSprite(assets.image`ReaperAttack`, reaper, -50, 0)
                projectile.setScale(0.8, ScaleAnchor.Middle)
                projectile.setImage(assets.image`ReaperAttack`)
                projectile.image.flipX()
                animation.setAction(reaper, ActionKind.Attacking)
                pause(150)
                sprites.destroy(projectile)
                animation.setAction(reaper, ActionKind.WalkingBackwards)
            }
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (level == 1) {
        if (reaper.vy == 0) {
            reaper.vy = -225
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava0, function (sprite, location) {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Portal, function (sprite, otherSprite) {
    if (enemiesLeftInt == 0 && diamondsCounterInt == totalDiamonds) {
        for (let value2 of tiles.getTilesByType(assets.tile`myTile6`)) {
            tiles.placeOnRandomTile(reaper, assets.tile`myTile6`)
            tiles.setTileAt(value2, sprites.dungeon.floorLight4)
            game.gameOver(true)
        }
    } else {
        reaper.sayText("Aún no", 500, false)
        game.showLongText("Tu enemigo final esta en la siguiente arena, DERRÓTALO!", DialogLayout.Bottom)
        for (let value3 of tiles.getTilesByType(assets.tile`myTile6`)) {
            tiles.placeOnRandomTile(reaper, assets.tile`myTile6`)
            tiles.setTileAt(value3, assets.tile`transparency16`)
        }
    }
})
function PlayerAnimations () {
    idling = animation.createAnimation(ActionKind.Idle, 100)
    idlingReverse = animation.createAnimation(ActionKind.WalkingBackwards, 100)
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
    idlingReverse.addAnimationFrame(assets.image`ReaperIdleInvert1`)
    idlingReverse.addAnimationFrame(assets.image`ReaperIdleInvert2`)
    idlingReverse.addAnimationFrame(assets.image`ReaperIdleInvert3`)
    idlingReverse.addAnimationFrame(assets.image`ReaperIdleInvert4`)
    animation.attachAnimation(reaper, idling)
    animation.attachAnimation(reaper, idlingReverse)
    animation.attachAnimation(reaper, attacking)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss, function (sprite, otherSprite) {
    bossInvulnerable = true
    if (bossInvulnerable) {
        animation.setAction(boss, ActionKind.Hurt)
        pause(1000)
        bossInvulnerable = false
    }
    animation.setAction(boss, ActionKind.Idle)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.diamond, function (sprite, otherSprite) {
    diamondsCounterInt += 1
    reaper.sayText("Diamantito!", 500, false)
    RefreshText()
    sprites.destroy(otherSprite)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    facingDirection = 2
})
function PortalCreator () {
    for (let value4 of tiles.getTilesByType(assets.tile`myTile4`)) {
        portal = sprites.create(assets.image`Portal7`, SpriteKind.Portal)
        tiles.placeOnTile(portal, value4)
        tiles.setTileAt(value4, assets.tile`transparency16`)
        PortalAnimator()
    }
}
function RefreshText () {
    enemiesLeftText.setText(": " + enemiesLeftInt)
    diamondsText.setText(": " + diamondsCounterInt)
    lifeText.setText(": " + lifeInt)
}
function BossSpawner () {
    for (let value of tiles.getTilesByType(assets.tile`myTile7`)) {
        boss = sprites.create(assets.image`BossIdle1`, SpriteKind.Boss)
        boss.ay = 500
        tiles.setTileAt(value, sprites.dungeon.floorLight4)
        tiles.placeOnTile(boss, value)
        BossAnimations()
    }
}
function LevelSelector () {
    if (level == 0) {
        scene.setBackgroundImage(assets.image`GameBGDef`)
        mainMenu = miniMenu.createMenuFromArray([miniMenu.createMenuItem("Jugar"), miniMenu.createMenuItem("Historia"), miniMenu.createMenuItem("Controles")])
        mainMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 75)
        mainMenu.setFrame(assets.image`FondoTexto`)
        mainMenu.setPosition(120, 85)
        mainMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Alignment, 0)
        mainMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Background, 9)
        mainMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 11)
        mainMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
            mainMenu.close()
            if (selectedIndex == 0) {
                level = 1
                LevelSelector()
            } else if (selectedIndex == 1) {
                game.showLongText("En un mundo fracturado por el caos, la barrera entre los vivos y los muertos ha sido rota por " + "Abyzark, el Señor del Caos, un demonio despiadado que busca reclamar tanto el inframundo como el reino de los vivos." + "Los fantasmas errantes, almas perdidas liberadas por Abyzark, " + "ahora vagan sin control, sembrando desorden en su desolación." + "" + "\nEntra en escena Nyxa, la encarnación de la Muerte misma. Armada con su guadaña espectral y habilidades místicas" + "Nyxa debe restaurar el equilibrio enviando a los fantasmas errantes de vuelta al inframundo " + "y enfrentándose a Abyzark en un duelo que decidirá el destino de ambos mundos.", DialogLayout.Full)
                game.reset()
            } else if (selectedIndex == 2) {
                game.showLongText("Movimiento : crucetas\\n" + "Atacar: B\\n" + "Saltar: A", DialogLayout.Full)
                game.reset()
            }
        })
    } else if (level == 1) {
        lifeInt = 99
        facingDirection = 1
        scene.setBackgroundColor(1)
        scene.setBackgroundImage(assets.image`GameBG`)
        tiles.setCurrentTilemap(tilemap`level`)
        PlayerController()
        scene.cameraFollowSprite(reaper)
        createCoins()
        GhostSpawner()
        PortalCreator()
        ScreenText()
        RefreshText()
        BossSpawner()
    }
}
function PlayerController () {
    reaper = sprites.create(assets.image`ReaperIdle1`, SpriteKind.Player)
    reaper.setScale(0.65, ScaleAnchor.Middle)
    reaper.ay = 500
    controller.moveSprite(reaper, 150, 0)
    for (let value5 of tiles.getTilesByType(assets.tile`myTile5`)) {
        tiles.placeOnRandomTile(reaper, assets.tile`myTile5`)
        tiles.setTileAt(value5, assets.tile`transparency16`)
    }
    PlayerAnimations()
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    facingDirection = 1
})
function CoinAnimation () {
    diamondIdle = animation.createAnimation(ActionKind.Idle, 100)
    diamondIdle.addAnimationFrame(assets.image`Diamond1`)
    diamondIdle.addAnimationFrame(assets.image`Diamond2`)
    diamondIdle.addAnimationFrame(assets.image`Diamond3`)
    diamondIdle.addAnimationFrame(assets.image`Diamond4`)
    animation.attachAnimation(diamondSprite, diamondIdle)
    animation.setAction(diamondSprite, ActionKind.Idle)
}
function BossAnimations () {
    bossIdle = animation.createAnimation(ActionKind.Idle, 100)
    animation.attachAnimation(boss, bossIdle)
    bossIdle.addAnimationFrame(assets.image`BossIdle1`)
    bossIdle.addAnimationFrame(assets.image`BossIdle2`)
    bossIdle.addAnimationFrame(assets.image`BossIdle3`)
    bossIdle.addAnimationFrame(assets.image`BossIdle4`)
    bossIdle.addAnimationFrame(assets.image`BossIdle5`)
    bossIdle.addAnimationFrame(assets.image`BossIdle6`)
    bossIdle.addAnimationFrame(assets.image`BossIdle7`)
    bossIdle.addAnimationFrame(assets.image`BossIdle8`)
    bossAttack = animation.createAnimation(ActionKind.Attacking, 100)
    animation.attachAnimation(boss, bossAttack)
    bossAttack.addAnimationFrame(assets.image`BossAttack1`)
    bossAttack.addAnimationFrame(assets.image`BossAttack2`)
    bossAttack.addAnimationFrame(assets.image`BossAttack3`)
    bossAttack.addAnimationFrame(assets.image`BossAttack4`)
    bossAttack.addAnimationFrame(assets.image`BossAttack5`)
    bossAttack.addAnimationFrame(assets.image`BossAttack6`)
    bossAttack.addAnimationFrame(assets.image`BossAttack7`)
    bossAttack.addAnimationFrame(assets.image`BossAttack8`)
    bossAttack.addAnimationFrame(assets.image`BossAttack9`)
    bossAttack.addAnimationFrame(assets.image`BossAttack10`)
    bossHurt = animation.createAnimation(ActionKind.Hurt, 100)
    animation.attachAnimation(boss, bossHurt)
    bossHurt.addAnimationFrame(assets.image`BossHurt1`)
    bossHurt.addAnimationFrame(assets.image`BossHurt2`)
    bossHurt.addAnimationFrame(assets.image`BossHurt3`)
    animation.setAction(boss, ActionKind.Idle)
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
    for (let value6 of tiles.getTilesByType(assets.tile`myTile`)) {
        diamondSprite = sprites.create(assets.image`Diamond1`, SpriteKind.diamond)
        totalDiamonds += 1
        diamondSprite.setScale(0.4, ScaleAnchor.Middle)
        tiles.placeOnTile(diamondSprite, value6)
        tiles.setTileAt(value6, assets.tile`transparency16`)
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
function AnimatorController () {
    if (facingDirection == 1) {
        animation.setAction(reaper, ActionKind.Idle)
    }
    if (facingDirection == 2) {
        animation.setAction(reaper, ActionKind.WalkingBackwards)
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    enemiesLeftInt += -1
    RefreshText()
    sprites.destroy(otherSprite)
})
function GhostSpawner () {
    for (let value7 of tiles.getTilesByType(assets.tile`myTile0`)) {
        ghostSpawnPoint = sprites.create(assets.image`GhostSpawner`, SpriteKind.ghostSpawner)
        enemiesLeftInt += 1
        tiles.placeOnTile(ghostSpawnPoint, value7)
        tiles.setTileAt(value7, assets.tile`transparency16`)
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    lifeInt += -1
    RefreshText()
    invincible = true
    if (invincible) {
        pause(1000)
        invincible = false
    }
})
let ghostSpawnPoint: Sprite = null
let invincible = false
let portalAnim: animation.Animation = null
let ghost: Sprite = null
let ghostIdle: animation.Animation = null
let bossHurt: animation.Animation = null
let bossAttack: animation.Animation = null
let bossIdle: animation.Animation = null
let diamondSprite: Sprite = null
let diamondIdle: animation.Animation = null
let mainMenu: miniMenu.MenuSprite = null
let lifeInt = 0
let lifeText: TextSprite = null
let diamondsText: TextSprite = null
let enemiesLeftText: TextSprite = null
let portal: Sprite = null
let boss: Sprite = null
let bossInvulnerable = false
let attacking: animation.Animation = null
let idlingReverse: animation.Animation = null
let idling: animation.Animation = null
let totalDiamonds = 0
let diamondsCounterInt = 0
let enemiesLeftInt = 0
let reaper: Sprite = null
let projectile: Sprite = null
let facingDirection = 0
let level = 0
let imports = sprites.create(assets.image`BossHurt3`, SpriteKind.Enemy)
level = 1
LevelSelector()
game.onUpdate(function () {
    AnimatorController()
})
game.onUpdateInterval(100, function () {
    if (level == 1) {
        if (lifeInt == 0) {
            game.gameOver(false)
        }
    }
})
