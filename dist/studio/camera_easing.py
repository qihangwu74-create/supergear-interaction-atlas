"""Original Atlas example; not rendered in this delivery. Requires Manim Community."""
from manim import *

class CameraEasing(Scene):
    def construct(self):
        self.camera.background_color = '#101712'
        title = Text('Camera travel: linear vs smooth', font_size=30).to_edge(UP)
        tracks = VGroup(Line(LEFT*5, RIGHT*5).shift(UP), Line(LEFT*5, RIGHT*5).shift(DOWN))
        tracks.set_color('#627655')
        linear = Dot(tracks[0].get_start(), color='#d8e866')
        eased = Dot(tracks[1].get_start(), color='#aecdd2')
        labels = VGroup(Text('LINEAR', font_size=18).next_to(tracks[0], UP),Text('SMOOTH',font_size=18).next_to(tracks[1], DOWN))
        self.add(title, tracks, labels, linear, eased)
        self.play(MoveAlongPath(linear, tracks[0], rate_func=linear_rate),MoveAlongPath(eased, tracks[1], rate_func=smooth),run_time=3)
        self.wait(1)

def linear_rate(t):
    return t
