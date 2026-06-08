from __future__ import annotations

import json
from pathlib import Path
from typing import Dict, List, Tuple

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "\u4eba\u7269\u7d20\u6750" / "\u4eba\u7269\u7d20\u6750\u7248\u672c2"
OUTPUT_DIR = ROOT / "\u4eba\u7269\u7d20\u6750" / "\u4eba\u7269\u7d20\u6750\u7248\u672c2_\u62a0\u56fe"

MIN_COMPONENT_PIXELS = 500
PREVIEW_CELL_W = 192
PREVIEW_CELL_H = 208

ACTION_FILES: Dict[str, str] = {
    "stand": "\u7ad9.png",
    "walk-right": "\u53f3\u8d70.png",
    "walk-left": "\u5de6\u8d70.png",
    "wave": "\u62db\u624b.png",
    "jump": "\u8df3.png",
    "slide": "\u6ed1.png",
    "sleep": "\u7761\u89c9.png",
    "run": "\u8dd1.png",
}


def is_green_background(r: int, g: int, b: int) -> bool:
    return g > 90 and g - max(r, b) > 26 and g > r * 1.28 and g > b * 1.28


def remove_green_background(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    pixels = rgba.load()
    width, height = rgba.size

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if is_green_background(r, g, b):
                pixels[x, y] = (0, 0, 0, 0)

    return rgba


def find_components(alpha: Image.Image) -> List[Dict[str, object]]:
    width, height = alpha.size
    pixels = alpha.load()
    visited = bytearray(width * height)
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
                    "area": len(component),
                    "box": (left, top, right + 1, bottom + 1),
                    "pixels": component,
                },
            )

    components = [item for item in components if int(item["area"]) >= MIN_COMPONENT_PIXELS]
    components.sort(key=lambda item: (item["box"][0] + item["box"][2]) / 2)
    return components


def crop_component(strip: Image.Image, component: Dict[str, object]) -> Image.Image:
    box = component["box"]
    crop = strip.crop(box)
    mask = Image.new("L", crop.size, 0)
    mask_pixels = mask.load()
    alpha_pixels = strip.getchannel("A").load()

    for x, y in component["pixels"]:
        mask_pixels[x - box[0], y - box[1]] = alpha_pixels[x, y]

    crop.putalpha(mask)
    return crop


def render_preview_cell(frame: Image.Image) -> Image.Image:
    cell = Image.new("RGBA", (PREVIEW_CELL_W, PREVIEW_CELL_H), (0, 0, 0, 0))
    scale = min((PREVIEW_CELL_W - 10) / frame.width, (PREVIEW_CELL_H - 10) / frame.height)
    width = max(1, round(frame.width * scale))
    height = max(1, round(frame.height * scale))
    resized = frame.resize((width, height), Image.NEAREST)
    cell.alpha_composite(resized, ((PREVIEW_CELL_W - width) // 2, PREVIEW_CELL_H - height - 5))
    return cell


def checkerboard(size: Tuple[int, int], block: int = 16) -> Image.Image:
    image = Image.new("RGBA", size, (245, 245, 245, 255))
    pixels = image.load()
    for y in range(size[1]):
        for x in range(size[0]):
            if (x // block + y // block) % 2:
                pixels[x, y] = (220, 220, 220, 255)
    return image


def process_action(action: str, filename: str, manifest: Dict[str, object]) -> List[Image.Image]:
    source_path = SOURCE_DIR / filename
    strip = remove_green_background(Image.open(source_path))
    components = find_components(strip.getchannel("A"))

    strips_dir = OUTPUT_DIR / "transparent_strips"
    frames_dir = OUTPUT_DIR / "frames" / action
    strips_dir.mkdir(parents=True, exist_ok=True)
    frames_dir.mkdir(parents=True, exist_ok=True)

    strip.save(strips_dir / filename)

    frame_records = []
    preview_frames = []
    for index, component in enumerate(components):
        frame = crop_component(strip, component)
        output_name = f"{action}_{index:02d}.png"
        frame.save(frames_dir / output_name)
        preview_frames.append(render_preview_cell(frame))
        box = component["box"]
        frame_records.append(
            {
                "index": index,
                "file": f"frames/{action}/{output_name}",
                "sourceBox": list(box),
                "size": [frame.width, frame.height],
                "visiblePixels": int(component["area"]),
            },
        )

    manifest["actions"][action] = {
        "source": filename,
        "transparentStrip": f"transparent_strips/{filename}",
        "frameCount": len(components),
        "frames": frame_records,
    }
    return preview_frames


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest: Dict[str, object] = {
        "sourceDir": str(SOURCE_DIR),
        "outputDir": str(OUTPUT_DIR),
        "background": "green screen removed to alpha",
        "actions": {},
    }

    preview_rows: List[List[Image.Image]] = []
    for action, filename in ACTION_FILES.items():
        preview_rows.append(process_action(action, filename, manifest))

    max_cols = max(len(row) for row in preview_rows)
    preview = checkerboard((max_cols * PREVIEW_CELL_W, len(preview_rows) * PREVIEW_CELL_H))
    for row_index, row in enumerate(preview_rows):
        for col_index, cell in enumerate(row):
            preview.alpha_composite(cell, (col_index * PREVIEW_CELL_W, row_index * PREVIEW_CELL_H))

    preview.save(OUTPUT_DIR / "preview_cutouts.png")
    (OUTPUT_DIR / "cutout_manifest.json").write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    print(OUTPUT_DIR)
    for action, details in manifest["actions"].items():
        print(f"{action}: {details['frameCount']} frames")


if __name__ == "__main__":
    main()
