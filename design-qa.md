# Design QA: Friend Presence Hub V2 Replica

final result: passed

## Source Visual Truth

- Source visual: `docs/assets/friend-presence-hub-v2.png`
- Implementation screenshot: `docs/assets/qa/friend-presence-hub-replica-pass5.png`
- Viewport: `1487 x 1058`
- State: Friends home screen, Kai selected, five friends loaded, five recent moments, message composer empty.
- Full-view comparison evidence: `docs/assets/qa/friend-presence-hub-qa-comparison-pass5.png`
- Focused composer comparison: `docs/assets/qa/friend-presence-hub-qa-composer-pass5.png`
- Focused recent moments comparison: `docs/assets/qa/friend-presence-hub-qa-recent-pass5.png`
- Invite dialog evidence: `docs/assets/qa/friend-presence-hub-invite-dialog.png`
- Empty first-run evidence: `docs/assets/qa/friend-presence-hub-empty-state.png`

## Findings

- No actionable P0/P1/P2 findings remain for the selected screen.

## Fidelity Surfaces

- Fonts and typography: hierarchy, sizes, weights, wrapping, and composer/count text now match the selected reference closely. Minor P3 variance remains from browser/Electron font rendering versus the generated image.
- Spacing and layout rhythm: sidebar width, content origin, friend directory, hero, recent moments, and composer rows align to the selected `1487 x 1058` reference. The page no longer needs vertical scrolling in the target state.
- Colors and visual tokens: warm dark neutral, coral action, green presence, amber away state, borders, and card backgrounds match the reference direction.
- Image quality and asset fidelity: all visible portraits, companion sprites, and hero-room art are raster assets derived from the selected prototype image. Navigation, action, brand, and quick-message icons are now SVG assets placed in `src/preferences/assets/friend-hub/` so thin strokes stay crisp and uncropped.
- Copy and content: the default home screen now matches the reference copy structure: Friends, Add by Invite, Recent moments, Send a quick note, empty composer placeholder, `0/140`, and quick-note presets.

## Patches Made Since Previous QA

- Rebuilt the default preferences home screen into the selected Friends Hub composition.
- Cropped and wired prototype assets for friend portraits, desktop companion sprites, and hero background, then replaced fragile screenshot-cut UI icons with stable SVG icon assets.
- Matched the reference shell dimensions: `1487 x 1058` preferences window, `263px` sidebar, `333px` friend directory, and `224 / 520 / 230` right-panel row structure.
- Fixed the composer empty state so it no longer pre-fills a Chinese default message; the composer starts with placeholder text and `0/140`.
- Moved recent moments upward to match the reference vertical rhythm.
- Fixed quick-message buttons so icons render as real image assets and remain on one row.
- Kept existing actions wired to real handlers: search/filter, friend selection, quick message fill, send, invite, quiet boundary, and navigation.
- Added a real Add by Invite dialog with two functional paths: generate/copy your invite code and paste a friend's invite code.
- Added a first-run empty friend state that guides users toward adding one real person instead of showing a blank list.
- Disabled the composer, quick replies, and Send action when no friend is connected, with visible disabled styling.

## Interaction Checks

- `npm run lint` passed.
- DOM ID audit passed: no duplicate IDs and no missing `document.getElementById(...)` targets.
- Browser interaction check passed with clean mocked data:
  - Searching `Mina` filters the friend list.
  - Clicking `Take a good break.` fills the composer and updates `18/140`.
  - Clicking `Send` inserts the outgoing message at the top of recent moments.
  - Sidebar navigation switches to Messages and back to Friends.
- Invite dialog check passed:
  - Top `Add by Invite` and bottom `Invite a friend` open the same dialog.
  - Short invite codes keep `Add Friend` disabled and show inline guidance.
  - Valid-length invite codes enable `Add Friend`.
  - `Generate` updates the displayed invite code.
  - `Escape` closes the dialog without closing the preferences window.
- Empty first-run check passed:
  - No-friend state shows a guided action card.
  - The empty-state `Add by Invite` CTA opens the same dialog.
  - Composer, quick replies, and Send are disabled until a friend exists.

## Module Polish QA: 2026-06-09

- Evidence screenshots:
  - Home after icon cleanup: `docs/assets/qa/ui-polish-home-clean-icons.png`
  - Create Companion: `docs/assets/qa/ui-polish-create-companion.png`
  - Invites: `docs/assets/qa/ui-polish-invites.png`
  - Messages: `docs/assets/qa/ui-polish-messages.png`
  - Privacy: `docs/assets/qa/ui-polish-privacy.png`
  - Settings: `docs/assets/qa/ui-polish-settings.png`
- Checks passed:
  - UI icons no longer carry dark opaque background blocks in the sidebar, search, invite, settings, and send controls.
  - Invites summary updates server state, friend count, and invite-code state from config.
  - Invite-code input disables Add for empty or short codes and enables it for valid-length codes.
  - Messages current-object card updates from selected friend data.
  - Empty message composers disable Send; typed content enables Send.
  - Privacy summary updates status, incoming permission, and quiet state live.
  - Settings opens as a real module from the sidebar and exposes a visible Save action.

## Relationship Boundary QA: 2026-06-09

- Evidence screenshot:
  - Privacy boundary polish: `docs/assets/qa/privacy-boundary-polish.png`
- Checks passed:
  - Privacy summary now includes online visibility alongside status, incoming permission, and quiet mode.
  - Hide online, per-friend mute, delete relationship, and block relationship are visible in one coherent boundary-management module.
  - Delete and Block actions use a distinct but restrained danger zone treatment, with real buttons, focus states, disabled states, and confirmation prompts.
  - Protocol smoke test passed: hidden presence appears offline to friends; deleted relationships cannot continue messaging; blocked users cannot continue messaging.

## Icon Crop QA: 2026-06-09

- Evidence screenshots:
  - Before cleanup: `docs/assets/qa/icon-crop-audit-before.png`
  - Final crop audit: `docs/assets/qa/icon-crop-audit-final.png`
  - Page render check: `docs/assets/qa/icon-polish-page-check.png`
  - SVG replacement render check: `docs/assets/qa/icon-svg-page-check.png`
- Checks passed:
  - The first PNG cleanup removed screenshot/card background blocks, but manual review found some thin strokes could be damaged by threshold cleanup.
  - Final UI icon rendering now uses `lucide-static` SVG assets for `brand-mark`, `chip-*`, and `icon-*`, with a native `24 x 24` viewBox and complete strokes.
  - Sidebar icons, search icon, invite icon, quick-message icons, and send icon render as complete vector shapes with no half-cropped or edge-clipped strokes.
  - The Windows `.ico` source remains a packaged application icon asset; live in-app controls no longer depend on the cleaned PNG icon canvases.

## Startup Home QA: 2026-06-09

- Evidence screenshot:
  - Startup home polish check: `docs/assets/qa/startup-home-polish-check.png`
  - Commercial home polish check: `docs/assets/qa/commercial-home-polish-check.png`
- Checks passed:
  - Normal EXE launch now opens the Friends Hub preferences window by default, with opt-out flags reserved for background startup.
  - The home screen has a visible next-step action strip instead of hiding connection setup behind advanced preferences.
  - The hero area exposes Create look and Import actions as real buttons connected to companion creation/import flows.
  - The quick-note composer gives live guidance and supports Ctrl+Enter sending.
  - Static layout QA at `1487 x 1058` shows no obvious clipped icons, overlapped controls, or crowded primary actions.
  - Default first paint no longer presents a fake online friend; it uses a neutral waiting state until real configuration data loads.
  - Friends and Recent moments have designed empty states, so the home page still feels complete before the user adds their first person.

## Open Questions

- The browser QA capture does not include the native Electron titlebar and outer window frame visible in the selected prototype; the actual Electron preferences window provides that runtime chrome.
- Remaining tiny text-rendering differences are P3 polish caused by generated-image antialiasing versus live browser text.

## Implementation Checklist

- Continue with product functionality on top of this Friends Hub surface.
- Use this screen as the new default direction for future friend connection, invite, DIY companion, and message work.
