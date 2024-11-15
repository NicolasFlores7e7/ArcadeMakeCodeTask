class ActionKind(Enum):
    Walking = 0
    Idle = 1
    Jumping = 2
    Attacking = 3

def on_a_pressed():
    global is_atacking
    is_atacking = True
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_left_pressed():
    global is_walking_backwards
    is_walking_backwards = True
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_right_pressed():
    global is_walking_forward
    is_walking_forward = True
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

is_walking_backwards = False
is_walking_forward = False
is_atacking = False
scene.set_background_color(1)
reaper = sprites.create(assets.image("""
    ReaperIdle1
"""), SpriteKind.player)
idling = animation.create_animation(ActionKind.Idle, 75)
attacking = animation.create_animation(ActionKind.Attacking, 30)
is_atacking = False
is_walking_forward = False
is_walking_backwards = False
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

def on_update_interval():
    global is_atacking, is_walking_forward, is_walking_backwards
    if is_atacking:
        animation.set_action(reaper, ActionKind.Attacking)
    else:
        animation.set_action(reaper, ActionKind.Idle)
    is_atacking = False
    if is_walking_forward:
        controller.move_sprite(reaper, 150, 0)
    if is_walking_backwards:
        controller.move_sprite(reaper, 150, 0)
    is_walking_forward = False
    is_walking_backwards = False
game.on_update_interval(100, on_update_interval)
