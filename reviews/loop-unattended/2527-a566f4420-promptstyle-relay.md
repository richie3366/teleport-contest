# Review 2527 — a566f4420 — adjust_menu_promptstyle relay + live doset styles (D-3648)

- SHA: `a566f4420` (2026-10-08) — cliffs-head `doset` writer
- D-entry: D-3648; Ledger: `adjust_menu_promptstyle` by-design→ported,
  `handler_menu_headings`/`doset`/`init_sound_disp_gamewindows` D-3648
  appended (doset omit records the ~70 remaining sites)
- js diff: `js/options.js` (slot + relay + 2 readers + 2 relay sites +
  non-selectable color thread + doset prompt/3 headings),
  `js/allmain.js` (newgame relay wired, import extended); new
  `scripts/menu-promptstyle-relay.test.mjs`
- Type: cliff (≤10 functions → whole Method per function)

## Intent vs deliverable

Promise: the session picked light-blue + inverse in menu_headings but JS
never relayed the pick into the promptstyle snapshot, so the doset prompt
painted NO_COLOR inverse instead of light-blue inverse. Port the relay
whole, wire all three C relay sites, thread caller color through
non-selectable mappings, and read live styles in the doset prompt +
headings. Moves Caveman-94011 65→77.

Diff actually adds all five parts, nothing else. Promise = deliverable.

## Inventory

| JS function | Status | C range |
|---|---|---|
| `adjust_menu_promptstyle` (new) | whole port | windows.c:1768–1777 |
| `menu_prompt_style` / `menu_heading_style` (new) | cell-domain readers | wintty.c:2685–2689 / windows.c:1815–1828 |
| `handler_menu_headings` | `:5790` relay wired (was named omission) | options.c:5779–5792 |
| `reset_needed_visuals` | `:9004` flag arm wired (was named omission) | options.c:9003–9004 |
| `init_sound_disp_gamewindows` | `:728` newgame relay wired | allmain.c:727–728 |
| `doset` prompt + 3 headings | live style reads | options.c doset + cites above |
| pick_one/pick_any non-selectable map | `color: it.color ?? NO_COLOR` | tty stored item |

## C ↔ JS fidelity

Every cite verified in pinned C:

- Relay body (`windows.c:1768–1777` via csym; comment cites :1769–1778,
  off-by-one on the signature line only): copy color+attr into the
  request, `ctrl_nhwindow(set_menu_promptstyle)`, clear
  `go.opt_need_promptstyle`. JS follows in C order; the tty ctrl case
  (`wintty.c:2905`) ignores the window and copies the snapshot, so the
  JS slot write is the faithful collapse. Fallbacks (NO_COLOR/inverse)
  match the initoptions default (`options.c:7188–7189`, verified).
- All three relay sites confirmed: handler `:5790` (unconditional — JS
  matches, relay outside the `gotca` if), visuals flag arm `:9003–9004`,
  newgame `:727–728` (JS keeps the WIN_ERR check).
- Prompt paint reads the snapshot (`wintty.c:2685–2689` — no gameover
  gate; JS `menu_prompt_style` has none either). Headings read live
  `iflags.menu_headings` with gameover suppression (`windows.c:1815–1828`,
  verified); JS `menu_heading_style` gates on live
  `game.program_state.gameover` (a real flag: set in end.js/hack.js/save.js).
- Slot default {NO_COLOR, inverse}: C's raw static is {NO_COLOR, NONE}
  (`wintty.c:2640`) but the newgame relay (always taken) snapshots the
  initoptions default before any menu can paint, so inverse is the only
  C-observable default. Sound.
- Non-selectable color thread is null-safe (no pre-existing row carries a
  color → NO_COLOR default, painters unchanged for old rows). allmain.js
  only extends its existing options.js import; the call runs inside
  function body, so no top-level TDZ concern.

RNG: none (3438/3438 matched). No clones/stubs/re-points; `sym.mjs` shows
a single `adjust_menu_promptstyle` def.

Named omissions (all disclosed with falsifiers): ~70 remaining hardcoded
sites (mechanical follow-ups, no session evidence), invent.js heading
helper, selectable-row caller color. The doset ledger `omit` records them.

## Hallucinations / overclaim

None. "Whole port" is accurate (10-line C function, all statements).
"All three C relay sites wired" verified — `csym --callers` equivalents
checked by reading each site. The vacuous writer legs are disclosed
("writers unblocked at baseline, expected").

## Density

Cliff phase: owner `doset` was the cliffs head; the writer (promptstyle
relay, a named omission since D-3645) shipped whole with all call sites —
exactly the "writer the divergence names" play. One cliff, one C family
(menu paint), Ledger entries per function. Movement + REACH-OK
re-measured below. Not a no-op.

## Verification

Rule #2: iteration-wide clean. Diff grep: only the commit message plus a
`fastforward` *context* line (pre-existing import, not added) — no new
trace logic. Committed test ran green here (2/2).

Re-measure (this audit):
`hidden-proxy.mjs verify
doset,handler_menu_headings,adjust_menu_promptstyle
--base a566f4420~1 --reach-all` →

- `verify doset: 1 PASS … → PROGRESS` (Caveman-94011: PASS)
  + REACH-OK (smoke 24/24)
- handler_menu_headings / adjust_menu_promptstyle: vacuous (disclosed)
  + REACH-OK ×2

Stronger than ship-time (65→77): D-3649 completes the chain to PASS on
current code. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
