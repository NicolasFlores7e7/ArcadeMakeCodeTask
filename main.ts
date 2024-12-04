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
    export const Potion = SpriteKind.create()
}
function PotionsSpawner () {
    for (let value of tiles.getTilesByType(assets.tile`myTile8`)) {
        potion = sprites.create(assets.image`Potion1`, SpriteKind.Potion)
        animation.runImageAnimation(
        potion,
        assets.animation`PotionAnim`,
        100,
        true
        )
        tiles.placeOnTile(potion, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (level == 1) {
        if (facingDirection == 1) {
            if (canAttack) {
                canAttack = false
                animation.runImageAnimation(
                reaper,
                assets.animation`ReaperAttackAnim`,
                80,
                false
                )
                projectile = sprites.createProjectileFromSprite(assets.image`ReaperAttack`, reaper, 70, 0)
                projectile.setScale(0.8, ScaleAnchor.Middle)
                pause(150)
                sprites.destroy(projectile)
                animation.runImageAnimation(
                reaper,
                assets.animation`ReaperIdleAnim`,
                80,
                true
                )
            }
        } else {
            if (facingDirection == 2) {
                if (canAttack) {
                    canAttack = false
                    animation.runImageAnimation(
                    reaper,
                    assets.animation`ReaperReverseAttackAnim`,
                    80,
                    false
                    )
                    projectile = sprites.createProjectileFromSprite(assets.image`ReaperAttack`, reaper, -50, 0)
                    projectile.setScale(0.8, ScaleAnchor.Middle)
                    projectile.setImage(assets.image`ReaperAttack`)
                    projectile.image.flipX()
                    pause(150)
                    sprites.destroy(projectile)
                    animation.runImageAnimation(
                    reaper,
                    assets.animation`ReaperIdleReverseAnim`,
                    100,
                    false
                    )
                }
            }
        }
    }
})
function PortalSpawner () {
    for (let value4 of tiles.getTilesByType(assets.tile`myTile4`)) {
        portal = sprites.create(assets.image`Portal7`, SpriteKind.Portal)
        animation.runImageAnimation(
        portal,
        assets.animation`PortalAnim`,
        100,
        true
        )
        tiles.placeOnTile(portal, value4)
        tiles.setTileAt(value4, assets.tile`transparency16`)
    }
}
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
            game.showLongText("Tu enemigo final esta en la siguiente arena, DERRÓTALO!", DialogLayout.Bottom)
        }
        areWeInBossArea = true
        ScreenText()
        RefreshText()
    } else {
        reaper.sayText("Aún no", 500, false)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss, function (sprite, otherSprite) {
    bossLifeInt += -1
    RefreshText()
    bossInvulnerable = true
    animation.runImageAnimation(
    boss,
    assets.animation`BossHurtAnim`,
    100,
    false
    )
    if (bossInvulnerable) {
        pause(1000)
        bossInvulnerable = false
    }
    animation.runImageAnimation(
    boss,
    assets.animation`BossIdleAnim`,
    80,
    true
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.diamond, function (sprite, otherSprite) {
    diamondsCounterInt += 1
    reaper.sayText("Diamantito!", 500, false)
    RefreshText()
    sprites.destroy(otherSprite)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    facingDirection = 2
    animation.runImageAnimation(
    reaper,
    assets.animation`ReaperIdleReverseAnim`,
    80,
    true
    )
})
function RefreshText () {
    lifeText.setText(": " + lifeInt)
    diamondsText.setText(": " + diamondsCounterInt)
    enemiesLeftText.setText(": " + enemiesLeftInt)
    potionsText.setText(": " + potionsInt)
    if (areWeInBossArea) {
        bossLifeText.setText(": " + bossLifeInt)
    }
}
function BossSpawner () {
    for (let value5 of tiles.getTilesByType(assets.tile`myTile7`)) {
        boss = sprites.create(assets.image`BossIdle1`, SpriteKind.Boss)
        boss.ay = 500
        tiles.setTileAt(value5, sprites.dungeon.floorLight4)
        tiles.placeOnTile(boss, value5)
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
        lifeInt = 10
        potionsInt = 5
        maxPotions = potionsInt
        maxLife = lifeInt
        bossLifeInt = 15
        facingDirection = 1
        areWeInBossArea = false
        scene.setBackgroundColor(1)
        scene.setBackgroundImage(assets.image`GameBG`)
        tiles.setCurrentTilemap(tilemap`level`)
        PlayerController()
        scene.cameraFollowSprite(reaper)
        animation.runImageAnimation(
        reaper,
        assets.animation`ReaperIdleAnim`,
        80,
        true
        )
        DiamondSpawner()
        GhostSpawner()
        PortalSpawner()
        ScreenText()
        PotionsSpawner()
        RefreshText()
        BossSpawner()
        animation.runImageAnimation(
        boss,
        assets.animation`BossIdleAnim`,
        80,
        true
        )
    }
}
function PlayerController () {
    reaper = sprites.create(assets.image`ReaperIdle1`, SpriteKind.Player)
    reaper.setScale(0.65, ScaleAnchor.Middle)
    reaper.ay = 500
    controller.moveSprite(reaper, 150, 0)
    for (let value52 of tiles.getTilesByType(assets.tile`myTile5`)) {
        tiles.placeOnRandomTile(reaper, assets.tile`myTile5`)
        tiles.setTileAt(value52, assets.tile`transparency16`)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    facingDirection = 1
    animation.runImageAnimation(
    reaper,
    assets.animation`ReaperIdleAnim`,
    80,
    true
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ghostSpawner, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    reaper.sayText("FANTASMAA!!!!", 500, false)
    GhostController()
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (level == 1) {
        if (lifeInt < maxLife && potionsInt > 0) {
            lifeInt += 1
            potionsInt += -1
            RefreshText()
        }
        if (lifeInt == maxLife) {
            reaper.sayText("Vida llena!", 500, false)
        }
        if (potionsInt == 0) {
            reaper.sayText("Sin Pociones!", 500, false)
        }
    }
})
function ScreenText () {
    enemiesLeftText = textsprite.create("")
    enemiesLeftText.setBorder(1, 0, 1)
    enemiesLeftText.setOutline(1, 15)
    enemiesLeftText.setIcon(assets.image`EnemiesIcon`)
    enemiesLeftText.setFlag(SpriteFlag.RelativeToCamera, true)
    enemiesLeftText.setPosition(120, 11)
    lifeText = textsprite.create("")
    lifeText.setBorder(1, 0, 1)
    lifeText.setOutline(1, 15)
    lifeText.setIcon(assets.image`LifeIcon`)
    lifeText.setFlag(SpriteFlag.RelativeToCamera, true)
    lifeText.setPosition(30, 11)
    diamondsText = textsprite.create("")
    diamondsText.setBorder(1, 0, 1)
    diamondsText.setOutline(1, 15)
    diamondsText.setIcon(assets.image`DiamondIcon`)
    diamondsText.setFlag(SpriteFlag.RelativeToCamera, true)
    diamondsText.setPosition(80, 11)
    bossLifeText = textsprite.create("")
    potionsText = textsprite.create("Test")
    potionsText.setBorder(1, 0, 1)
    potionsText.setOutline(1, 15)
    potionsText.setIcon(assets.image`Potion1`)
    potionsText.setFlag(SpriteFlag.RelativeToCamera, true)
    potionsText.setPosition(30, 99)
    if (areWeInBossArea) {
        bossLifeText = textsprite.create("")
        bossLifeText.setBorder(1, 0, 1)
        bossLifeText.setOutline(1, 15)
        bossLifeText.setIcon(assets.image`BossLifeIcon`)
        bossLifeText.setFlag(SpriteFlag.RelativeToCamera, true)
        bossLifeText.setPosition(78, 99)
        enemiesLeftText.setIcon(assets.image`IconEmpty`)
        diamondsText.setIcon(assets.image`IconEmpty`)
        enemiesLeftText = textsprite.create("")
        diamondsText = textsprite.create("")
    }
}
function GhostController () {
    ghost = sprites.create(assets.image`GhostIdle10`, SpriteKind.Enemy)
    ghost.setScale(0.7, ScaleAnchor.Middle)
    ghost.setPosition(reaper.x + 50, reaper.y - 40)
    animation.runImageAnimation(
    ghost,
    assets.animation`GhostIdleAnim`,
    100,
    true
    )
    if (!(invincible)) {
        ghost.follow(reaper)
    }
}
function DiamondSpawner () {
    for (let value6 of tiles.getTilesByType(assets.tile`myTile`)) {
        diamondSprite = sprites.create(assets.image`Diamond1`, SpriteKind.diamond)
        diamondSprite.setScale(0.4, ScaleAnchor.Middle)
        totalDiamonds += 1
        animation.runImageAnimation(
        diamondSprite,
        assets.animation`DiamondAnim`,
        100,
        true
        )
        tiles.placeOnTile(diamondSprite, value6)
        tiles.setTileAt(value6, assets.tile`transparency16`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Potion, function (sprite, otherSprite) {
    if (potionsInt < maxPotions) {
        potionsInt += 1
        sprites.destroy(otherSprite)
        RefreshText()
    } else {
        reaper.sayText("Pociones llenas", 500, false)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    enemiesLeftInt += -1
    RefreshText()
    sprites.destroy(otherSprite)
})
function GhostSpawner () {
    for (let value7 of tiles.getTilesByType(assets.tile`myTile0`)) {
        ghostSpawnPoint = sprites.create(assets.image`GhostSpawnPoint2`, SpriteKind.ghostSpawner)
        ghostSpawnPoint.setScale(0.7, ScaleAnchor.Middle)
        enemiesLeftInt += 1
        tiles.placeOnTile(ghostSpawnPoint, value7)
        tiles.setTileAt(value7, assets.tile`transparency16`)
        animation.runImageAnimation(
        ghostSpawnPoint,
        assets.animation`GhostSpawnPointAnim`,
        200,
        true
        )
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
let diamondSprite: Sprite = null
let invincible = false
let ghost: Sprite = null
let maxLife = 0
let maxPotions = 0
let mainMenu: miniMenu.MenuSprite = null
let bossLifeText: TextSprite = null
let potionsInt = 0
let potionsText: TextSprite = null
let enemiesLeftText: TextSprite = null
let diamondsText: TextSprite = null
let lifeInt = 0
let lifeText: TextSprite = null
let boss: Sprite = null
let bossInvulnerable = false
let bossLifeInt = 0
let areWeInBossArea = false
let totalDiamonds = 0
let diamondsCounterInt = 0
let enemiesLeftInt = 0
let portal: Sprite = null
let projectile: Sprite = null
let reaper: Sprite = null
let canAttack = false
let facingDirection = 0
let potion: Sprite = null
let level = 0
music.play(music.stringPlayable("E B C5 A B G A F ", 244), music.PlaybackMode.LoopingInBackground)
music.setVolume(20)
level = 0
LevelSelector()
game.onUpdateInterval(1000, function () {
    canAttack = true
})
game.onUpdateInterval(100, function () {
    if (level == 1) {
        if (lifeInt == 0) {
            game.gameOver(false)
        }
        if (bossLifeInt == 0) {
            game.gameOver(true)
        }
    }
})
