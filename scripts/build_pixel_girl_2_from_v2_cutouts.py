from __future__ import annotations

import json
import shutil
from pathlib import Path
from typing import Dict, List, Tuple

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "\u4eba\u7269\u7d20\u6750" / "\u4eba\u7269\u7d20\u6750\u7248\u672c2_\u62a0\u56fe"
MANIFEST_PATH = SOURCE_DIR / "cutout_manifest.json"
OUTPUT_DIR = ROOT / "assets" / "pets" / "pixel-girl-2"

CELL_W = 192
CELL_H = 208
COLS = 12
BOTTOM_MARGIN = 5
INNER_PADDING = 10

ROW_SPECS: List[Tuple[str, str]] = [
    ("idle", "stand"),
    ("running-right", "walk-right"),
    ("running-left", "walk-left"),
    ("waving", "wave"),
    ("jumping", "jump"),
    ("dragged", "slide"),
    ("sleepy", "sleep"),
    ("running", "run"),
]


def durations(frame_count: int, value: int, final: int | None = None) -> List[int]:
    result = [value] * frame_count
    if final is not None and result:
        result[-1] = final
    return result


def load_cutout_manifest() -> Dict[str, object]:
    return json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))


def load_action_frames(cutout_manifest: Dict[str, object], action: str) -> List[Dict[str, object]]:
    action_manifest = cutout_manifest["actions"][action]
    frames = []
    for frame_manifest in action_manifest["frames"]:
        frame_path = SOURCE_DIR / frame_manifest["file"]
        frame = Image.open(frame_path).convert("RGBA")
        frames.append(
            {
                "image": frame,
                "source_box": tuple(frame_manifest["sourceBox"]),
                "path": frame_path,
            },
        )
    return frames


def fit_action_frames(frames: List[Dict[str, object]]) -> List[Image.Image]:
    boxes = [frame["source_box"] for frame in frames]
    max_width = max(frame["image"].width for frame in frames)
    ground_y = max(box[3] for box in boxes)
    max_height_from_ground = max(ground_y - box[1] for box in boxes)
    scale = min(
        (CELL_W - INNER_PADDING) / max_width,
        (CELL_H - INNER_PADDING) / max_height_from_ground,
    )

    cells = []
    for frame in frames:
        image = frame["image"]
        box = frame["source_box"]
        width = max(1, round(image.width * scale))
        height = max(1, round(image.height * scale))
        resized = image.resize((width, height), Image.NEAREST)
        cell = Image.new("RGBA", (CELL_W, CELL_H), (0, 0, 0, 0))
        lift = max(0, ground_y - box[3])
        x = (CELL_W - width) // 2
        y = CELL_H - height - BOTTOM_MARGIN - round(lift * scale)
        cell.alpha_composite(resized, (x, y))
        cells.append(cell)
    return cells


def checkerboard(size: Tuple[int, int], block: int = 8) -> Image.Image:
    image = Image.new("RGBA", size, (245, 245, 245, 255))
    pixels = image.load()
    for y in range(size[1]):
        for x in range(size[0]):
            if (x // block + y // block) % 2:
                pixels[x, y] = (220, 220, 220, 255)
    return image


def build_pet_manifest(row_frame_counts: Dict[str, int]) -> Dict[str, object]:
    return {
        "id": "pixel-girl-2",
        "displayName": "Pixel Girl 2",
        "description": "A polished second pixel-art desktop pet built from version 2 action frames.",
        "spritesheet": "spritesheet.png",
        "spritesheetPath": "spritesheet.png",
        "grid": {"columns": COLS, "rows": len(ROW_SPECS)},
        "cell": {"width": CELL_W, "height": CELL_H},
        "source": {
            "cutoutManifest": str(MANIFEST_PATH),
            "sourceSet": "\u4eba\u7269\u7d20\u6750\u7248\u672c2",
        },
        "actions": [
            {"label": "站立", "state": "idle"},
            {"label": "向右走", "state": "running-right"},
            {"label": "向左走", "state": "running-left"},
            {"label": "打招呼", "state": "waving"},
            {"label": "跳跃", "state": "jumping"},
            {"label": "滑行", "state": "dragged"},
            {"label": "睡觉", "state": "sleepy"},
            {"label": "跑步", "state": "running"},
        ],
        "states": {
            "idle": {
                "row": 0,
                "frames": row_frame_counts["idle"],
                "durations": durations(row_frame_counts["idle"], 260),
                "loop": True,
            },
            "running-right": {
                "row": 1,
                "frames": row_frame_counts["running-right"],
                "durations": durations(row_frame_counts["running-right"], 120),
                "loop": True,
                "walk": 54,
            },
            "running-left": {
                "row": 2,
                "frames": row_frame_counts["running-left"],
                "durations": durations(row_frame_counts["running-left"], 120),
                "loop": True,
                "walk": -54,
            },
            "waving": {
                "row": 3,
                "frames": row_frame_counts["waving"],
                "durations": durations(row_frame_counts["waving"], 140, 300),
                "loop": False,
            },
            "jumping": {
                "row": 4,
                "frames": row_frame_counts["jumping"],
                "durations": durations(row_frame_counts["jumping"], 135, 280),
                "loop": False,
            },
            "dragged": {
                "row": 5,
                "frames": row_frame_counts["dragged"],
                "durations": durations(row_frame_counts["dragged"], 130),
                "loop": True,
            },
            "sleepy": {
                "row": 6,
                "frames": row_frame_counts["sleepy"],
                "durations": durations(row_frame_counts["sleepy"], 280),
                "loop": True,
            },
            "running": {
                "row": 7,
                "frames": row_frame_counts["running"],
                "durations": durations(row_frame_counts["running"], 115),
                "loop": True,
            },
        },
    }


def main() -> None:
    cutout_manifest = load_cutout_manifest()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    frames_dir = OUTPUT_DIR / "frames"
    if frames_dir.exists():
        shutil.rmtree(frames_dir)
    frames_dir.mkdir()

    atlas = Image.new("RGBA", (CELL_W * COLS, CELL_H * len(ROW_SPECS)), (0, 0, 0, 0))
    preview = checkerboard((CELL_W * COLS, CELL_H * len(ROW_SPECS)))
    row_frame_counts: Dict[str, int] = {}

    for row_index, (state, action) in enumerate(ROW_SPECS):
        source_frames = load_action_frames(cutout_manifest, action)
        cells = fit_action_frames(source_frames)
        row_frame_counts[state] = len(cells)
        for col_index, cell in enumerate(cells):
            position = (col_index * CELL_W, row_index * CELL_H)
            atlas.alpha_composite(cell, position)
            preview.alpha_composite(cell, position)
            cell.save(frames_dir / f"{row_index:02d}_{state}_{col_index:02d}.png")

    atlas.save(OUTPUT_DIR / "spritesheet.png")
    preview.resize((preview.width // 2, preview.height // 2), Image.NEAREST).save(OUTPUT_DIR / "preview.png")
    manifest = build_pet_manifest(row_frame_counts)
    (OUTPUT_DIR / "pet.json").write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    print(OUTPUT_DIR)
    print(f"spritesheet: {atlas.width}x{atlas.height}")
    for state, count in row_frame_counts.items():
        print(f"{state}: {count} frames")


if __name__ == "__main__":
    main()
