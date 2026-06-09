# Desktop Pet Connect

A Windows desktop companion app built with Electron. The product direction is
relationship-centered: users can turn a real friend, partner, or loved one into
a personalized desktop presence, exchange invite codes, see online status, and
send lightweight real-time messages through the companion.

## What Is Included

- Electron desktop runtime in `src/`
- Pet Connect WebSocket/HTTP server in `server/`
- Built-in companion assets in `assets/`
- Packaging and asset helper scripts in `scripts/`
- Product and design planning docs in `docs/`
- Legacy Python prototype in `pet_runtime.py`

`node_modules/`, generated build output, local data, logs, environment files,
and private deployment notes are intentionally ignored.

## Run The Desktop App

```powershell
npm install
npm start
```

Or double-click:

```text
run_electron.bat
```

## Run Pet Connect Locally

```powershell
npm install
npm run start:pet-connect
```

The local service defaults to port `8787`.

## Run The Legacy Python Prototype

```powershell
pip install -r requirements.txt
python pet_runtime.py --scale 1
```

## Useful Commands

```powershell
npm run lint
npm run build:portable
npm run build:win
```

The lint command currently performs JavaScript syntax checks across the Electron
runtime, preferences UI, import preview, and Pet Connect server.

Build output is written to `release/`. Use `npm run build:portable` for the
first friend-test executable, or `npm run build:win` when you need both the
installer and portable build.

## Companion Package Contract

A companion package is a folder containing:

- `pet.json`
- a transparent PNG spritesheet
- optional preview and frame assets

The manifest defines the grid, frame size, FPS, and animation rows. Imported
packages are previewed and validated before switching.

## Product Notes

The project is moving away from a generic animal-pet concept and toward a DIY
relationship companion product. Current priorities are:

- simple relationship home experience
- custom companion import and binding
- real invite-code friend connection
- real-time short messages through a WebSocket server
- lightweight privacy and quiet-mode controls

See `docs/product-blueprint.md`, `docs/pet-connect.md`, and
`docs/project-roadmap.md` for the broader plan. See
`docs/friend-test-deployment.md` for the current Windows friend-test checklist.
