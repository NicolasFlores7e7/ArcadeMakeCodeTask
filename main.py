class ActionKind(Enum):
    Walking = 0
    Idle = 1
    Jumping = 2
    attacking = 3

def on_a_pressed():
    global is_atacking
    is_atacking = True
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_left_pressed():
    global is_walking_backwards
    is_walking_backwards = True
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

is_walking_backwards = False
is_atacking = False
scene.set_background_color(1)
reaper = sprites.create(assets.image("""
    ReaperIdle1
"""), SpriteKind.player)
reaper.set_position(23, 95)
reaper.set_scale(0.8, ScaleAnchor.MIDDLE)
idling = animation.create_animation(ActionKind.Idle, 75)
attacking2 = animation.create_animation(ActionKind.attacking, 30)
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
attacking2.add_animation_frame(assets.image("""
    ReaperAttack1
"""))
attacking2.add_animation_frame(assets.image("""
    ReaperAttack2
"""))
attacking2.add_animation_frame(assets.image("""
    ReaperAttack3
"""))
attacking2.add_animation_frame(assets.image("""
    ReaperAttack4
"""))
attacking2.add_animation_frame(assets.image("""
    ReaperAttack5
"""))
attacking2.add_animation_frame(assets.image("""
    ReaperAttack6
"""))
attacking2.add_animation_frame(assets.image("""
    ReaperAttack7
"""))
animation.attach_animation(reaper, idling)
animation.attach_animation(reaper, attacking2)
animation.set_action(reaper, ActionKind.Idle)