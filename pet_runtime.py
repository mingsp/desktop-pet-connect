from __future__ import annotations

import argparse
import random
import sys
import tkinter as tk
from pathlib import Path
from tkinter import Menu, messagebox
from typing import Dict, List, Tuple

from PIL import Image, ImageTk


CELL_WIDTH = 192
CELL_HEIGHT = 208
COLS = 8
ROWS = 9
KEY_COLOR = "#00ff00"
KEY_RGB = (0, 255, 0)


StateSpec = Tuple[int, int, List[int]]


STATES: Dict[str, StateSpec] = {
    "idle": (0, 6, [900, 420, 420, 520, 520, 1100]),
    "running-right": (1, 8, [120, 120, 120, 120, 120, 120, 120, 220]),
    "running-left": (2, 8, [120, 120, 120, 120, 120, 120, 120, 220]),
    "waving": (3, 4, [140, 140, 140, 280]),
    "jumping": (4, 5, [140, 140, 140, 140, 280]),
    "failed": (5, 8, [140, 140, 140, 140, 140, 140, 140, 240]),
    "waiting": (6, 6, [150, 150, 150, 150, 150, 260]),
    "running": (7, 6, [120, 120, 120, 120, 120, 220]),
    "review": (8, 6, [150, 150, 150, 150, 150, 280]),
}


ONE_SHOT_STATES = {"waving", "jumping", "failed", "review"}
WALK_STATES = {"running-left", "running-right"}


class DesktopPet:
    def __init__(self, root: tk.Tk, spritesheet_path: Path, scale: float) -> None:
        self.root = root
        self.spritesheet_path = spritesheet_path
        self.scale = scale
        self.state = "idle"
        self.frame_index = 0
        self.drag_offset_x = 0
        self.drag_offset_y = 0
        self.is_dragging = False
        self.walk_ticks_left = 0
        self.walk_speed = 8
        self.behavior_after_id = None
        self.animation_after_id = None
        self.topmost = True

        self.frames = self._load_frames()
        self.root.overrideredirect(True)
        self.root.attributes("-topmost", self.topmost)
        self.root.configure(bg=KEY_COLOR)
        self._enable_transparent_color()

        self.label = tk.Label(root, bg=KEY_COLOR, bd=0, highlightthickness=0)
        self.label.pack()
        self.label.bind("<ButtonPress-1>", self._start_drag)
        self.label.bind("<B1-Motion>", self._drag)
        self.label.bind("<ButtonRelease-1>", self._stop_drag)
        self.label.bind("<Button-3>", self._show_menu)

        self.menu = self._build_menu()
        self._place_initially()
        self._render_current_frame()
        self._schedule_next_frame()
        self._schedule_behavior()

    def _enable_transparent_color(self) -> None:
        try:
            self.root.wm_attributes("-transparentcolor", KEY_COLOR)
        except tk.TclError:
            # Windows supports transparentcolor. Other platforms can still run
            # the preview with a key-colored rectangular background.
            pass

    def _load_frames(self) -> Dict[str, List[ImageTk.PhotoImage]]:
        atlas = Image.open(self.spritesheet_path).convert("RGBA")
        expected_size = (CELL_WIDTH * COLS, CELL_HEIGHT * ROWS)
        if atlas.size != expected_size:
            raise ValueError(
                f"spritesheet must be {expected_size[0]}x{expected_size[1]}, got {atlas.size[0]}x{atlas.size[1]}"
            )

        width = max(1, int(CELL_WIDTH * self.scale))
        height = max(1, int(CELL_HEIGHT * self.scale))
        frames: Dict[str, List[ImageTk.PhotoImage]] = {}

        for state, (row, frame_count, _) in STATES.items():
            row_frames: List[ImageTk.PhotoImage] = []
            for col in range(frame_count):
                cell = atlas.crop(
                    (
                        col * CELL_WIDTH,
                        row * CELL_HEIGHT,
                        (col + 1) * CELL_WIDTH,
                        (row + 1) * CELL_HEIGHT,
                    )
                )
                keyed = self._composite_on_key_color(cell)
                if self.scale != 1:
                    keyed = keyed.resize((width, height), Image.NEAREST)
                row_frames.append(ImageTk.PhotoImage(keyed))
            frames[state] = row_frames

        return frames

    def _composite_on_key_color(self, image: Image.Image) -> Image.Image:
        alpha = image.getchannel("A")
        solid = Image.new("RGBA", image.size, KEY_RGB + (255,))
        solid.paste(image, (0, 0), alpha)

        # Force fully transparent source pixels back to the exact key color so
        # Tk can punch the desktop window shape out cleanly.
        transparent = alpha.point(lambda value: 255 if value < 16 else 0)
        key_layer = Image.new("RGBA", image.size, KEY_RGB + (255,))
        solid.paste(key_layer, (0, 0), transparent)
        return solid

    def _build_menu(self) -> Menu:
        menu = Menu(self.root, tearoff=False)
        menu.add_command(label="Idle", command=lambda: self.set_state("idle"))
        menu.add_command(label="Wave", command=lambda: self.set_state("waving"))
        menu.add_command(label="Jump", command=lambda: self.set_state("jumping"))
        menu.add_command(label="Review", command=lambda: self.set_state("review"))
        menu.add_command(label="Waiting", command=lambda: self.set_state("waiting"))
        menu.add_command(label="Failed", command=lambda: self.set_state("failed"))
        menu.add_separator()
        menu.add_command(label="Walk Left", command=lambda: self._start_walk("running-left"))
        menu.add_command(label="Walk Right", command=lambda: self._start_walk("running-right"))
        menu.add_separator()

        scale_menu = Menu(menu, tearoff=False)
        for value in (0.75, 1.0, 1.25, 1.5, 2.0):
            scale_menu.add_command(label=f"{value:g}x", command=lambda v=value: self._restart_with_scale(v))
        menu.add_cascade(label="Scale", menu=scale_menu)

        menu.add_command(label="Toggle Always On Top", command=self._toggle_topmost)
        menu.add_separator()
        menu.add_command(label="Quit", command=self.root.destroy)
        return menu

    def _place_initially(self) -> None:
        self.root.update_idletasks()
        screen_width = self.root.winfo_screenwidth()
        screen_height = self.root.winfo_screenheight()
        pet_width = int(CELL_WIDTH * self.scale)
        pet_height = int(CELL_HEIGHT * self.scale)
        x = max(0, screen_width - pet_width - 80)
        y = max(0, screen_height - pet_height - 120)
        self.root.geometry(f"{pet_width}x{pet_height}+{x}+{y}")

    def _render_current_frame(self) -> None:
        frames = self.frames[self.state]
        self.label.configure(image=frames[self.frame_index % len(frames)])
        self.label.image = frames[self.frame_index % len(frames)]

    def _schedule_next_frame(self) -> None:
        _, _, durations = STATES[self.state]
        delay = durations[self.frame_index % len(durations)]
        self.animation_after_id = self.root.after(delay, self._advance_frame)

    def _advance_frame(self) -> None:
        frame_count = len(self.frames[self.state])
        self.frame_index += 1
        completed_loop = self.frame_index >= frame_count

        if completed_loop:
            if self.state in ONE_SHOT_STATES:
                self.set_state("idle")
                return
            self.frame_index = 0

        if self.state in WALK_STATES and not self.is_dragging:
            if self._step_walk_changed_state():
                return

        self._render_current_frame()
        self._schedule_next_frame()

    def _schedule_behavior(self) -> None:
        if self.behavior_after_id is not None:
            self.root.after_cancel(self.behavior_after_id)
        self.behavior_after_id = self.root.after(random.randint(2400, 5200), self._choose_behavior)

    def _choose_behavior(self) -> None:
        if self.is_dragging:
            self._schedule_behavior()
            return

        choice = random.choices(
            ["idle", "waving", "jumping", "waiting", "review", "failed", "walk-left", "walk-right"],
            weights=[22, 16, 10, 14, 12, 5, 11, 11],
            k=1,
        )[0]

        if choice == "walk-left":
            self._start_walk("running-left")
        elif choice == "walk-right":
            self._start_walk("running-right")
        else:
            self.set_state(choice)

        self._schedule_behavior()

    def set_state(self, state: str) -> None:
        if state not in STATES:
            return
        self.state = state
        self.frame_index = 0
        if state not in WALK_STATES:
            self.walk_ticks_left = 0
        if self.animation_after_id is not None:
            self.root.after_cancel(self.animation_after_id)
        self._render_current_frame()
        self._schedule_next_frame()

    def _start_walk(self, state: str) -> None:
        self.walk_ticks_left = random.randint(18, 42)
        self.set_state(state)

    def _step_walk_changed_state(self) -> bool:
        x = self.root.winfo_x()
        y = self.root.winfo_y()
        pet_width = int(CELL_WIDTH * self.scale)
        screen_width = self.root.winfo_screenwidth()
        dx = -self.walk_speed if self.state == "running-left" else self.walk_speed
        next_x = x + dx

        if next_x <= 0:
            next_x = 0
            self._start_walk("running-right")
            return True
        if next_x + pet_width >= screen_width:
            next_x = screen_width - pet_width
            self._start_walk("running-left")
            return True

        self.root.geometry(f"+{next_x}+{y}")
        self.walk_ticks_left -= 1
        if self.walk_ticks_left <= 0:
            self.set_state("idle")
            return True
        return False

    def _start_drag(self, event: tk.Event) -> None:
        self.is_dragging = True
        self.drag_offset_x = event.x
        self.drag_offset_y = event.y

    def _drag(self, event: tk.Event) -> None:
        x = self.root.winfo_pointerx() - self.drag_offset_x
        y = self.root.winfo_pointery() - self.drag_offset_y
        self.root.geometry(f"+{x}+{y}")

    def _stop_drag(self, _event: tk.Event) -> None:
        self.is_dragging = False

    def _show_menu(self, event: tk.Event) -> None:
        self.menu.tk_popup(event.x_root, event.y_root)

    def _toggle_topmost(self) -> None:
        self.topmost = not self.topmost
        self.root.attributes("-topmost", self.topmost)

    def _restart_with_scale(self, scale: float) -> None:
        python = sys.executable
        script = Path(__file__).resolve()
        args = [python, str(script), "--spritesheet", str(self.spritesheet_path), "--scale", str(scale)]
        try:
            import subprocess

            subprocess.Popen(args, cwd=str(script.parent))
            self.root.destroy()
        except OSError as exc:
            messagebox.showerror("Desktop Pet", f"Could not restart pet: {exc}")


def parse_args() -> argparse.Namespace:
    default_spritesheet = Path(__file__).resolve().parent / "assets" / "pixel-girl-spritesheet.png"
    parser = argparse.ArgumentParser(description="A small transparent Windows desktop pet.")
    parser.add_argument("--spritesheet", type=Path, default=default_spritesheet)
    parser.add_argument("--scale", type=float, default=1.0)
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    spritesheet = args.spritesheet.resolve()
    if not spritesheet.exists():
        raise FileNotFoundError(f"spritesheet not found: {spritesheet}")

    root = tk.Tk()
    root.title("Desktop Pet")
    DesktopPet(root, spritesheet, max(0.25, args.scale))
    root.mainloop()


if __name__ == "__main__":
    main()
