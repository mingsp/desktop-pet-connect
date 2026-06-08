from __future__ import annotations

import json
from pathlib import Path
from typing import Dict, List, Tuple

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "\u4eba\u7269\u7d20\u6750"
OUTPUT_DIR = ROOT / "assets" / "pets" / "pixel-girl-2"

CELL_W = 192
CELL_H = 208
COLS = 12
CHARACTER_PADDING = 30
MIN_COMPONENT_PIXELS = 12
FRAME_COMPONENT_PIXELS = 500

ROWS: List[Tuple[str, str, int]] = [
    ("idle", "\u7ad9\u7acb-\u8fde\u7eed\u5e27.png", 12),
    ("running-right", "\u5411\u53f3\u8d70-\u8fde\u7eed\u5e27.png", 11),
    ("running-left", "\u5411\u5de6\u8d70-\u8fde\u7eed\u5e27.png", 12),
    ("waving", "\u62db\u624b-\u8fde\u7eed\u5e27.png", 11),
    ("jumping", "\u8df3-\u8fde\u7eed\u5e27.png", 11),
    ("dragged", "\u6ed1-\u8fde\u7eed\u5e27.png", 9),
    ("sleepy", "\u7761\u89c9-\u8fde\u7eed\u5e27.png", 12),
    ("working", "\u8dd1-\u8fde\u7eed\u5e27.png", 11),
]


def is_green_background(r: int, g: int, b: int) -> bool:
    return g > 90 and g - max(r, b) > 26 and g > r * 1.28 and g > b * 1.28


def remove_green_background(image: Image.Image) -> Image.Image:
    image = image.convert("RGBA")
    pixels = image.load()
    width, height = image.size

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if is_green_background(r, g, b):
                pixels[x, y] = (0, 0, 0, 0)

    return image


def boxes_intersect(a: Tuple[int, int, int, int], b: Tuple[int, int, int, int]) -> bool:
    return a[0] < b[2] and a[2] > b[0] and a[1] < b[3] and a[3] > b[1]


def expand_box(box: Tuple[int, int, int, int], padding: int, width: int, height: int) -> Tuple[int, int, int, int]:
    return (
        max(0, box[0] - padding),
        max(0, box[1] - padding),
        min(width, box[2] + padding),
        min(height, box[3] + padding),
    )


def find_components(alpha: Image.Image) -> List[Dict[str, object]]:
    width, height = alpha.size
    visited = bytearray(width * height)
    pixels = alpha.load()
    components: List[Dict[str, object]] = []

    for y in range(height):
        for x in range(width):
            index = y * width + x
            if visited[index] or pixels[x, y] == 0:
                continue

            stack = [(x, y)]
            visited[index] = 1
            component: List[Tuple[int, int]] = []
            left = right = x
            top = bottom = y

            while stack:
                cx, cy = stack.pop()
                component.append((cx, cy))
                left = min(left, cx)
                right = max(right, cx)
                top = min(top, cy)
                bottom = max(bottom, cy)

                for nx, ny in ((cx - 1, cy), (cx + 1, cy), (cx, cy - 1), (cx, cy + 1)):
                    if nx < 0 or ny < 0 or nx >= width or ny >= height:
                        continue
                    next_index = ny * width + nx
                    if visited[next_index] or pixels[nx, ny] == 0:
                        continue
                    visited[next_index] = 1
                    stack.append((nx, ny))

            components.append(
                {
                    "pixels": component,
                    "area": len(component),
                    "box": (left, top, right + 1, bottom + 1),
                },
            )

    return components


def keep_character_components(image: Image.Image) -> Image.Image:
    alpha = image.getchannel("A")
    width, height = image.size
    components = find_components(alpha)
    if not components:
        return image

    components.sort(key=lambda item: int(item["area"]), reverse=True)
    main_box = components[0]["box"]
    keep_box = expand_box(main_box, CHARACTER_PADDING, width, height)
    clean_alpha = Image.new("L", image.size, 0)
    clean_pixels = clean_alpha.load()
    source_pixels = alpha.load()

    for component in components:
        area = int(component["area"])
        box = component["box"]
        if component is not components[0] and (area < MIN_COMPONENT_PIXELS or not boxes_intersect(box, keep_box)):
            continue
        for x, y in component["pixels"]:
            clean_pixels[x, y] = source_pixels[x, y]

    cleaned = image.copy()
    cleaned.putalpha(clean_alpha)
    return cleaned


def union_box(boxes: List[Tuple[int, int, int, int]]) -> Tuple[int, int, int, int]:
    left = min(box[0] for box in boxes)
    top = min(box[1] for box in boxes)
    right = max(box[2] for box in boxes)
    bottom = max(box[3] for box in boxes)
    return left, top, right, bottom


def component_center_x(component: Dict[str, object]) -> float:
    box = component["box"]
    return (box[0] + box[2]) / 2


def component_image(source: Image.Image, component: Dict[str, object]) -> Image.Image:
    box = component["box"]
    crop = source.crop(box)
    mask = Image.new("L", crop.size, 0)
    mask_pixels = mask.load()
    alpha_pixels = source.getchannel("A").load()

    for x, y in component["pixels"]:
        mask_pixels[x - box[0], y - box[1]] = alpha_pixels[x, y]

    crop.putalpha(mask)
    return crop


def extract_row(strip_path: Path, frame_count: int) -> List[Image.Image]:
    strip = remove_green_background(Image.open(strip_path).convert("RGBA"))
    components = [
        component
        for component in find_components(strip.getchannel("A"))
        if int(component["area"]) >= FRAME_COMPONENT_PIXELS
    ]
    components.sort(key=component_center_x)
    selected = components[:frame_count]

    if len(selected) != frame_count:
        raise ValueError(f"{strip_path.name}: expected {frame_count} frames, found {len(selected)}")

    if not selected:
        return [Image.new("RGBA", (CELL_W, CELL_H), (0, 0, 0, 0)) for _ in range(frame_count)]

    boxes = [component["box"] for component in selected]
    row_w = max(box[2] - box[0] for box in boxes) + 4
    ground_y = max(box[3] for box in boxes)
    row_h = max(ground_y - box[1] for box in boxes) + 4
    scale = min((CELL_W - 10) / row_w, (CELL_H - 10) / row_h)

    frames: List[Image.Image] = []
    for component in selected:
        box = component["box"]
        cropped = component_image(strip, component)
        scaled_w = max(1, round(cropped.width * scale))
        scaled_h = max(1, round(cropped.height * scale))
        resized = cropped.resize((scaled_w, scaled_h), Image.NEAREST)
        cell = Image.new("RGBA", (CELL_W, CELL_H), (0, 0, 0, 0))
        lift = max(0, ground_y - box[3])
        x = (CELL_W - scaled_w) // 2
        y = CELL_H - scaled_h - 5 - round(lift * scale)
        cell.alpha_composite(resized, (x, y))
        frames.append(cell)

    return frames


def durations(frame_count: int, value: int, final: int | None = None) -> List[int]:
    result = [value] * frame_count
    if final is not None:
        result[-1] = final
    return result


def build_manifest() -> Dict[str, object]:
    return {
        "id": "pixel-girl-2",
        "displayName": "Pixel Girl 2",
        "description": "A second polished pixel-art desktop pet with richer action strips.",
        "spritesheet": "spritesheet.png",
        "spritesheetPath": "spritesheet.png",
        "grid": {"columns": COLS, "rows": len(ROWS)},
        "cell": {"width": CELL_W, "height": CELL_H},
        "states": {
            "idle": {"row": 0, "frames": 12, "durations": durations(12, 230), "loop": True},
            "running-right": {
                "row": 1,
                "frames": 11,
                "durations": durations(11, 105),
                "loop": True,
                "walk": 56,
            },
            "running-left": {
                "row": 2,
                "frames": 12,
                "durations": durations(12, 105),
                "loop": True,
                "walk": -56,
            },
            "waving": {"row": 3, "frames": 11, "durations": durations(11, 115, 230), "loop": False},
            "jumping": {"row": 4, "frames": 11, "durations": durations(11, 115, 230), "loop": False},
            "failed": {"row": 5, "frames": 9, "durations": durations(9, 120, 240), "loop": False},
            "dragged": {"row": 5, "frames": 9, "durations": durations(9, 115), "loop": True},
            "waiting": {"row": 6, "frames": 12, "durations": durations(12, 250), "loop": True},
            "sleepy": {"row": 6, "frames": 12, "durations": durations(12, 250), "loop": True},
            "running": {"row": 7, "frames": 11, "durations": durations(11, 105), "loop": True},
            "working": {"row": 7, "frames": 11, "durations": durations(11, 105), "loop": True},
            "review": {"row": 7, "frames": 11, "durations": durations(11, 115, 230), "loop": False},
        },
    }


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    frames_dir = OUTPUT_DIR / "frames"
    frames_dir.mkdir(exist_ok=True)

    atlas = Image.new("RGBA", (CELL_W * COLS, CELL_H * len(ROWS)), (0, 0, 0, 0))
    for row_index, (state, filename, frame_count) in enumerate(ROWS):
        row_frames = extract_row(SOURCE_DIR / filename, frame_count)
        for col_index, frame in enumerate(row_frames):
            atlas.alpha_composite(frame, (col_index * CELL_W, row_index * CELL_H))
            frame.save(frames_dir / f"{row_index:02d}_{state}_{col_index:02d}.png")

    atlas.save(OUTPUT_DIR / "spritesheet.png")

    preview = atlas.resize((atlas.width // 2, atlas.height // 2), Image.NEAREST)
    preview.save(OUTPUT_DIR / "preview.png")

    manifest = build_manifest()
    (OUTPUT_DIR / "pet.json").write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    print(OUTPUT_DIR)
    print(f"spritesheet: {atlas.size[0]}x{atlas.size[1]}")


if __name__ == "__main__":
    main()
