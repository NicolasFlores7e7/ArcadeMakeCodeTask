enum ActionKind {
    Walking,
    Idle,
    Jumping,
    Attacking,
    WalkingBackwards,
    Hurt
}
namespace SpriteKind {
    export const Diamond = SpriteKind.create()
    export const GhostSpawner = SpriteKind.create()
    export const Portal = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const Potion = SpriteKind.create()
}
function PotionsSpawner () {
    for (let value of tiles.getTilesByType(assets.tile`potion_tile`)) {
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
        if (facing_direction == 1) {
            if (can_attack) {
                can_attack = false
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
            if (facing_direction == 2) {
                if (can_attack) {
                    can_attack = false
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
    for (let portal_tile of tiles.getTilesByType(assets.tile`portal_tile`)) {
        portal = sprites.create(assets.image`Portal7`, SpriteKind.Portal)
        animation.runImageAnimation(
        portal,
        assets.animation`PortalAnim`,
        100,
        true
        )
        tiles.placeOnTile(portal, portal_tile)
        tiles.setTileAt(portal_tile, assets.tile`transparency16`)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (level == 1) {
        if (reaper.vy == 0) {
            reaper.vy = -225
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.GhostSpawner, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    reaper.sayText("FANTASMAA!!!!", 500, false)
    GhostController()
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava0, function (sprite, location) {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Portal, function (sprite, otherSprite) {
    if (enemies_left_int == 0 && diamonds_int == total_diamonds) {
        for (let player_tp_tile of tiles.getTilesByType(assets.tile`player_tp_tile`)) {
            tiles.placeOnRandomTile(reaper, assets.tile`player_tp_tile`)
            tiles.setTileAt(player_tp_tile, sprites.dungeon.floorLight4)
            game.showLongText("Tu enemigo final esta en la siguiente arena, DERRÓTALO!", DialogLayout.Bottom)
        }
        are_we_on_boss_area = true
        ScreenText()
        RefreshText()
    } else {
        reaper.sayText("Aún no", 500, false)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss, function (sprite, otherSprite) {
    boss_life_int += -1
    RefreshText()
    boss_invulnerable = true
    animation.runImageAnimation(
    boss,
    assets.animation`BossHurtAnim`,
    100,
    false
    )
    if (boss_invulnerable) {
        pause(1000)
        boss_invulnerable = false
    }
    animation.runImageAnimation(
    boss,
    assets.animation`BossIdleAnim`,
    80,
    true
    )
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    facing_direction = 2
    animation.runImageAnimation(
    reaper,
    assets.animation`ReaperIdleReverseAnim`,
    80,
    true
    )
})
function GhostSpawn () {
    for (let ghost_tile of tiles.getTilesByType(assets.tile`ghost_tile`)) {
        ghost_spawn_point = sprites.create(assets.image`GhostSpawnPoint1`, SpriteKind.GhostSpawner)
        ghost_spawn_point.setScale(0.7, ScaleAnchor.Middle)
        enemies_left_int += 1
        tiles.placeOnTile(ghost_spawn_point, ghost_tile)
        tiles.setTileAt(ghost_tile, assets.tile`transparency16`)
        animation.runImageAnimation(
        ghost_spawn_point,
        assets.animation`GhostSpawnPointAnim`,
        200,
        true
        )
    }
}
function RefreshText () {
    life_text.setText(": " + life_int)
    diamond_text.setText(": " + diamonds_int)
    enemies_left_text.setText(": " + enemies_left_int)
    potions_text.setText(": " + potions_int)
    if (are_we_on_boss_area) {
        boss_life_text.setText(": " + boss_life_int)
    }
}
function BossSpawner () {
    for (let boss_spawmn_tile of tiles.getTilesByType(assets.tile`boss_spawn_tile`)) {
        boss = sprites.create(assets.image`BossIdle1`, SpriteKind.Boss)
        boss.ay = 500
        tiles.setTileAt(boss_spawmn_tile, sprites.dungeon.floorLight4)
        tiles.placeOnTile(boss, boss_spawmn_tile)
    }
}
function LevelSelector () {
    if (level == 0) {
        scene.setBackgroundImage(assets.image`GameBGDef`)
        main_menu = miniMenu.createMenuFromArray([miniMenu.createMenuItem("Jugar"), miniMenu.createMenuItem("Historia"), miniMenu.createMenuItem("Controles")])
        main_menu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 75)
        main_menu.setFrame(assets.image`FondoTexto`)
        main_menu.setPosition(120, 85)
        main_menu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Alignment, 0)
        main_menu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Background, 9)
        main_menu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 11)
        main_menu.onButtonPressed(controller.A, function (selection, selected_index) {
            main_menu.close()
            if (selected_index == 0) {
                level = 1
                LevelSelector()
            } else if (selected_index == 1) {
                game.showLongText("En un mundo fracturado por el caos, la barrera entre los vivos y los muertos ha sido rota por " + "Abyzark, el Señor del Caos, un demonio despiadado que busca reclamar tanto el inframundo como el reino de los vivos." + "Los fantasmas errantes, almas perdidas liberadas por Abyzark, " + "ahora vagan sin control, sembrando desorden en su desolación." + "" + "\nEntra en escena Nyxa, la encarnación de la Muerte misma. Armada con su guadaña espectral y habilidades místicas" + "Nyxa debe restaurar el equilibrio enviando a los fantasmas errantes de vuelta al inframundo " + "y enfrentándose a Abyzark en un duelo que decidirá el destino de ambos mundos.", DialogLayout.Full)
                game.reset()
            } else if (selected_index == 2) {
                game.showLongText("Movimiento izquierda: Flecha izquierda - Tecla A\\n" + "Movimiento derecha: Flecha derecha - Tecla B\\n" + "Atacar: B - Tecla Enter\\n" + "Saltar: A - Tecla Espacio\\n" + "Pociones : Flecha abajo - Tecla S", DialogLayout.Full)
                game.reset()
            }
        })
    } else if (level == 1) {
        life_int = 10
        potions_int = 5
        max_potions = potions_int
        max_life = life_int
        boss_life_int = 15
        facing_direction = 1
        are_we_on_boss_area = false
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
        GhostSpawn()
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
    for (let player_spawn_tile of tiles.getTilesByType(assets.tile`player_spawn_tile`)) {
        tiles.placeOnRandomTile(reaper, assets.tile`player_spawn_tile`)
        tiles.setTileAt(player_spawn_tile, assets.tile`transparency16`)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    facing_direction = 1
    animation.runImageAnimation(
    reaper,
    assets.animation`ReaperIdleAnim`,
    80,
    true
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Diamond, function (sprite, otherSprite) {
    diamonds_int += 1
    reaper.sayText("Diamantito!", 500, false)
    RefreshText()
    sprites.destroy(otherSprite)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (level == 1) {
        if (life_int < max_life && potions_int > 0) {
            life_int += 1
            potions_int += -1
            RefreshText()
        }
        if (life_int == max_life) {
            reaper.sayText("Vida llena!", 500, false)
        }
        if (potions_int == 0) {
            reaper.sayText("Sin Pociones!", 500, false)
        }
    }
})
function ScreenText () {
    enemies_left_text = textsprite.create("")
    enemies_left_text.setBorder(1, 0, 1)
    enemies_left_text.setOutline(1, 15)
    enemies_left_text.setIcon(assets.image`EnemiesIcon`)
    enemies_left_text.setFlag(SpriteFlag.RelativeToCamera, true)
    enemies_left_text.setPosition(120, 11)
    life_text = textsprite.create("")
    life_text.setBorder(1, 0, 1)
    life_text.setOutline(1, 15)
    life_text.setIcon(assets.image`LifeIcon`)
    life_text.setFlag(SpriteFlag.RelativeToCamera, true)
    life_text.setPosition(30, 11)
    diamond_text = textsprite.create("")
    diamond_text.setBorder(1, 0, 1)
    diamond_text.setOutline(1, 15)
    diamond_text.setIcon(assets.image`DiamondIcon`)
    diamond_text.setFlag(SpriteFlag.RelativeToCamera, true)
    diamond_text.setPosition(80, 11)
    boss_life_text = textsprite.create("")
    potions_text = textsprite.create("Test")
    potions_text.setBorder(1, 0, 1)
    potions_text.setOutline(1, 15)
    potions_text.setIcon(assets.image`Potion1`)
    potions_text.setFlag(SpriteFlag.RelativeToCamera, true)
    potions_text.setPosition(30, 99)
    if (are_we_on_boss_area) {
        boss_life_text = textsprite.create("")
        boss_life_text.setBorder(1, 0, 1)
        boss_life_text.setOutline(1, 15)
        boss_life_text.setIcon(assets.image`BossLifeIcon`)
        boss_life_text.setFlag(SpriteFlag.RelativeToCamera, true)
        boss_life_text.setPosition(78, 99)
        enemies_left_text.setIcon(assets.image`IconEmpty`)
        diamond_text.setIcon(assets.image`IconEmpty`)
        enemies_left_text = textsprite.create("")
        diamond_text = textsprite.create("")
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
    for (let diamond_tile of tiles.getTilesByType(assets.tile`diamond_tile`)) {
        diamond_sprite = sprites.create(assets.image`Diamond1`, SpriteKind.Diamond)
        diamond_sprite.setScale(0.4, ScaleAnchor.Middle)
        total_diamonds += 1
        animation.runImageAnimation(
        diamond_sprite,
        assets.animation`DiamondAnim`,
        100,
        true
        )
        tiles.placeOnTile(diamond_sprite, diamond_tile)
        tiles.setTileAt(diamond_tile, assets.tile`transparency16`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Potion, function (sprite, otherSprite) {
    if (potions_int < max_potions) {
        potions_int += 1
        sprites.destroy(otherSprite)
        RefreshText()
    } else {
        reaper.sayText("Pociones llenas", 500, false)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    enemies_left_int += -1
    RefreshText()
    sprites.destroy(otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    life_int += -1
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
    life_int += -1
    RefreshText()
    invincible = true
    if (invincible) {
        pause(1000)
        invincible = false
    }
})
let diamond_sprite: Sprite = null
let invincible = false
let ghost: Sprite = null
let max_life = 0
let max_potions = 0
let main_menu: miniMenu.MenuSprite = null
let boss_life_text: TextSprite = null
let potions_int = 0
let potions_text: TextSprite = null
let enemies_left_text: TextSprite = null
let diamond_text: TextSprite = null
let life_int = 0
let life_text: TextSprite = null
let ghost_spawn_point: Sprite = null
let boss: Sprite = null
let boss_invulnerable = false
let boss_life_int = 0
let are_we_on_boss_area = false
let total_diamonds = 0
let diamonds_int = 0
let enemies_left_int = 0
let portal: Sprite = null
let projectile: Sprite = null
let reaper: Sprite = null
let can_attack = false
let facing_direction = 0
let potion: Sprite = null
let level = 0
music.play(music.stringPlayable("E B C5 A B G A F ", 244), music.PlaybackMode.LoopingInBackground)
music.setVolume(20)
level = 0
LevelSelector()
game.onUpdateInterval(1000, function () {
    can_attack = true
})
game.onUpdateInterval(100, function () {
    if (level == 1) {
        if (life_int == 0) {
            game.gameOver(false)
        }
        if (boss_life_int == 0) {
            game.gameOver(true)
        }
    }
})
