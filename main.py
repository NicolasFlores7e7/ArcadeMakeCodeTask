class ActionKind(Enum):
    Idle = 0
    Attacking = 1

def on_a_pressed():
    global is_atacking
    is_atacking = True
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

is_atacking = False
scene.set_background_color(1)
reaper = sprites.create(assets.image("""
    ReaperIdle1
"""), SpriteKind.player)
idling = animation.create_animation(ActionKind.Idle, 75)
attacking = animation.create_animation(ActionKind.Attacking, 30)
is_atacking = False
idling.add_animation_frame(assets.image("""
    ReaperIdle1
"""))
idling.add_animation_frame(assets.image("""
    ReaperIdle2
"""))
idling.add_animation_frame(assets.image("""
    ReaperIdle3
"""))
idling.add_animation_frame(assets.image("""
    ReaperIdle4
"""))
attacking.add_animation_frame(assets.image("""
    ReaperAttack1
"""))
attacking.add_animation_frame(assets.image("""
    ReaperAttack2
"""))
attacking.add_animation_frame(assets.image("""
    ReaperAttack3
"""))
attacking.add_animation_frame(assets.image("""
    ReaperAttack4
"""))
attacking.add_animation_frame(assets.image("""
    ReaperAttack5
"""))
attacking.add_animation_frame(assets.image("""
    ReaperAttack6
"""))
attacking.add_animation_frame(assets.image("""
    ReaperAttack7
"""))
animation.attach_animation(reaper, idling)
animation.attach_animation(reaper, attacking)
animation.set_action(reaper, ActionKind.Idle)

def on_update_interval():
    global is_atacking
    if is_atacking:
        animation.set_action(reaper, ActionKind.Attacking)
    else:
        animation.set_action(reaper, ActionKind.Idle)
    is_atacking = False
game.on_update_interval(100, on_update_interval)
