# Desktop Pet Product Plan

Business and creative product ideas are tracked in
[`docs/product-blueprint.md`](./product-blueprint.md). This file stays focused
on runtime direction, implementation priorities, and asset pipeline decisions.
Pet package details live in [`docs/pet-library.md`](./pet-library.md), and Pet
Connect lives in [`docs/pet-connect.md`](./pet-connect.md).

## Runtime Direction

Use Electron for the first production-quality Windows runtime:

- Transparent frameless window.
- Always-on-top mode.
- GPU-composited CSS spritesheet playback.
- Manifest-driven pet loading.
- Right-click menu for actions, scale, pin, and quit.
- Later: tray menu, auto-start, pet library, updater, crash reporting.

The current Python/Tkinter runtime is kept only as a prototype reference.

## Asset Format

The runtime now loads a pet package:

```text
assets/pets/<pet-id>/
├── pet.json
└── spritesheet.png
```

The first package uses the Codex-compatible atlas:

```text
1536 x 1872
8 columns x 9 rows
192 x 208 per cell
transparent background
```

For our own product format, we should keep the manifest flexible enough to support
larger atlases and more frames per action.

## Why The Current Animation Still Feels Limited

The current pet was created from 9 separate images. Each row needs 4-8 frames, so
the prototype repeats or lightly offsets the same source image. That proves the
runtime path, but it cannot produce genuinely smooth motion.

For production quality, each action should be generated as a coherent strip:

- idle: 8-12 frames
- walk left/right: 10-16 frames
- wave: 8-12 frames
- jump: 10-14 frames
- failed/waiting/review: 8-12 frames

Codex compatibility can still export to 8 columns x 9 rows, but our native format
should allow richer frame counts.

## Generation Pipeline

1. User uploads 1-2 clear character photos.
2. Generate a canonical cute pixel-art base character.
3. Generate one strip per action using the base character, action prompt, and
   layout guide.
4. Remove chroma-key background or alpha-clean transparent output.
5. Segment frames, center the character, normalize scale, and trim artifacts.
6. Run QA checks for empty frames, edge clipping, identity drift, and jitter.
7. Compose `spritesheet.png` and write `pet.json`.
8. Preview animations before export.

## UX Quality Bar

- No visible rectangular background.
- Dragging must track the cursor immediately.
- Animation should run while other desktop work continues.
- Menu actions must respond without restarting the app.
- Generated pets should include a contact sheet and preview before installation.
- Users should be able to import, rename, delete, and switch pets without touching
  files manually.

## BongoCat-Inspired UX Notes

The BongoCat project is a useful reference for desktop-pet ergonomics:

- Keep the pet inside the current monitor by default.
- Normalize behavior across mixed-DPI monitors.
- Provide calm window controls: always-on-top, size, opacity, hide/show, and quit.
- Prefer user/input-driven reactions over frequent autonomous movement.
- Keep taskbar noise low for the pet window.
- Keep model support open so users can import or create custom characters.

Implemented in our Electron prototype:

- System tray recovery menu.
- Show/hide pet.
- Custom pet name with a small rename window.
- Preferences window with profile, interaction, weather, role, and behavior tabs.
- Optional name tag under the pet.
- Always-on-top toggle.
- Click-through toggle.
- Taskbar visibility toggle.
- Scale and opacity menus.
- Pet package switching, custom folder import, and custom pet folder opening.
- Import preview with baseline package validation before activation.
- Hover-hide and input-reaction controls.
- Keep-in-screen behavior.
- Mixed-DPI size normalization.
- Quiet autonomous movement with a small roam radius.
- Settings persistence.

Next candidates:

- Pet profile fields: birthday, personality, favorite actions, and user notes.
- Add per-action frame preview and clearer validation diagnostics.
- Import/export pet package as `.petpack`.
- Input-driven reactions for mouse clicks, keyboard activity, and app state.
- Temporary pass-through mode.
- Global shortcuts for show/hide and pass-through.
- Pet Connect: friend list, real-time pet messages, online status, and privacy controls.
- Autostart and update flow.
