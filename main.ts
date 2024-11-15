class ActionKind {
    static Walking: number
    private ___Walking_is_set: boolean
    private ___Walking: number
    get Walking(): number {
        return this.___Walking_is_set ? this.___Walking : ActionKind.Walking
    }
    set Walking(value: number) {
        this.___Walking_is_set = true
        this.___Walking = value
    }
    
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
    
    static Jumping: number
    private ___Jumping_is_set: boolean
    private ___Jumping: number
    get Jumping(): number {
        return this.___Jumping_is_set ? this.___Jumping : ActionKind.Jumping
    }
    set Jumping(value: number) {
        this.___Jumping_is_set = true
        this.___Jumping = value
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
        ActionKind.Walking = 0
        ActionKind.Idle = 1
        ActionKind.Jumping = 2
        ActionKind.Attacking = 3
    }
    
}

ActionKind.__initActionKind()

controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    
    is_atacking = true
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    
    is_walking_backwards = true
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    
    is_walking_forward = true
})
let is_walking_backwards = false
let is_walking_forward = false
let is_atacking = false
scene.setBackgroundColor(1)
let reaper = sprites.create(assets.image`
    ReaperIdle1
`, SpriteKind.Player)
let idling = animation.createAnimation(ActionKind.Idle, 75)
let attacking = animation.createAnimation(ActionKind.Attacking, 30)
is_atacking = false
is_walking_forward = false
is_walking_backwards = false
idling.addAnimationFrame(assets.image`
    ReaperIdle1
`)
idling.addAnimationFrame(assets.image`
    ReaperIdle2
`)
idling.addAnimationFrame(assets.image`
    ReaperIdle3
`)
idling.addAnimationFrame(assets.image`
    ReaperIdle4
`)
attacking.addAnimationFrame(assets.image`
    ReaperAttack1
`)
attacking.addAnimationFrame(assets.image`
    ReaperAttack2
`)
attacking.addAnimationFrame(assets.image`
    ReaperAttack3
`)
attacking.addAnimationFrame(assets.image`
    ReaperAttack4
`)
attacking.addAnimationFrame(assets.image`
    ReaperAttack5
`)
attacking.addAnimationFrame(assets.image`
    ReaperAttack6
`)
attacking.addAnimationFrame(assets.image`
    ReaperAttack7
`)
animation.attachAnimation(reaper, idling)
animation.attachAnimation(reaper, attacking)
game.onUpdateInterval(100, function on_update_interval() {
    
    if (is_atacking) {
        animation.setAction(reaper, ActionKind.Attacking)
    } else {
        animation.setAction(reaper, ActionKind.Idle)
    }
    
    is_atacking = false
    if (is_walking_forward) {
        controller.moveSprite(reaper, 150, 0)
    }
    
    if (is_walking_backwards) {
        controller.moveSprite(reaper, 150, 0)
    }
    
    is_walking_forward = false
    is_walking_backwards = false
})
