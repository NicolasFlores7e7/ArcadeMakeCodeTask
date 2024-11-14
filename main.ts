controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    is_atacking = true
})
let is_atacking = false
class ActionKind {
    static Idle: number
    private ___Idle_is_set: boolean
    private ___Idle: number
    get Idle(): number {
        return this.___Idle_is_set ? this.___Idle : ActionKind.Idle
    }
    set Idle(value: number) {
        this.___Idle_is_set = true
        this.___Idle = value
    }
    
    static Attacking: number
    private ___Attacking_is_set: boolean
    private ___Attacking: number
    get Attacking(): number {
        return this.___Attacking_is_set ? this.___Attacking : ActionKind.Attacking
    }
    set Attacking(value: number) {
        this.___Attacking_is_set = true
        this.___Attacking = value
    }
    
    public static __initActionKind() {
        ActionKind.Idle = 0
        ActionKind.Attacking = 1
    }
    
}
ActionKind.__initActionKind()
scene.setBackgroundColor(1)
let reaper = sprites.create(assets.image`ReaperIdle1`, SpriteKind.Player)
let idling = animation.createAnimation(ActionKind.Idle, 75)
let attacking = animation.createAnimation(ActionKind.Attacking, 30)
is_atacking = false
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
game.onUpdateInterval(100, function () {
    if (is_atacking) {
        animation.setAction(reaper, ActionKind.Attacking)
    } else {
        animation.setAction(reaper, ActionKind.Idle)
    }
    is_atacking = false
})
