enum ActionKind {
    Walking,
    Idle,
    Jumping,
    attacking
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (reaper.vy == 0) {
        reaper.vy = -200
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava0, function (sprite, location) {
    game.gameOver(false)
})
let reaper: Sprite = null
scene.setBackgroundColor(1)
tiles.setCurrentTilemap(tilemap`level3`)
reaper = sprites.create(assets.image`ReaperIdle1`, SpriteKind.Player)
reaper.setPosition(24, 155)
reaper.setScale(0.7, ScaleAnchor.Middle)
reaper.ay = 500
scene.cameraFollowSprite(reaper)
controller.moveSprite(reaper, 150, 0)
let idling = animation.createAnimation(ActionKind.Idle, 75)
let attacking = animation.createAnimation(ActionKind.attacking, 30)
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
