# Review 146 — 8c51cfe8 — private seed8243 Samurai tutorial canary (docs)

## Metadata
- Full / short hash: `8c51cfe8a773d12759738ac6c462b9aa9f3fe76d` / `8c51cfe8`
- Parent: `1b94d8d3` (D-1184). Docs-only; no `js/` hunks. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 22:48:26 +0200
- D-id: none (queue + CURRENT primary; not a port)
- Stats: 6 files, +54 / −15 — `CURRENT.md` / `LOOP-QUEUE.md` Must-fix / `NOTES.md` / `private-sessions/README.md` + recipe + session.
- Claims to close: nothing in `reviews/loop-unattended/` or `reviews/loop-2026-08-15/`. Sets the human private canary as Must-fix / primary.
- JS / map: none. Chargen confirm lives in `js/player_selection.js` `confirm_selection` → `invent.js` `paint_corner_nhw_menu` / `nhw_menu_geometry`. C `role.c:2653–2675` `end_menu("Is this ok? …")` + `wintty.c` `tty_end_menu` / `tty_display_nhwindow` NHW_MENU `offx`.

## Intent vs deliverable

Git subject promises: “Queue the seed8243 Samurai tutorial recording as a private C canary so the loop ports chargen menu offx instead of touching the public 44.”

The diff **does** add `private-sessions/seed8243-samurai-tutorial.session.json` + recipe (`OPTIONS=symset:DECgraphics`), a README that forbids `sessions/manifest.json`, and prepends Must-fix / CURRENT primary for `wintty.c` menu `offx` (`Is this ok?` C `\e[72C` vs JS `\e[40C`). It does **not** add the recording to public `sessions/`. It does **not** ALIGN/FORCE. It does **not** edit `js/`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| private session + recipe | recording | seed 8243; not public manifest |
| Must-fix line | queue | human canary, no review stamp |
| `nhw_menu_geometry` | JS, **untouched** | H2344 cap `min(82, cols/2)` → 40 at cols=80 |
| C `tty_display_nhwindow` NHW_MENU `offx` | pinned C | `#ifdef H2344_BROKEN` **false** in this tree; `#else` is `max(10, cols-maxcol-1)` |

No `js/` — no FORCE/fs/seed-in-control-flow in scored code.

## C ↔ JS fidelity (diagnosis only)

This SHA does not claim a C match in `js/`. The queued locus is real: C `role.c` confirm is `select_menu` after `end_menu` with title `Is this ok? [ynaq]`; JS `confirm_selection` paints that menu via `paint_corner_nhw_menu`. First **gameplay** screen miss after banner `built` date is the right cluster (do not elide RC — D-0933).

Pinned `wintty.c:1907–1931`: H2344_BROKEN is **not** `#define`d in `nethack-c/` (only `#ifdef`). JS `nhw_menu_geometry` implements the H2344 formula (`offx = min(min(82, cols/2), cols-maxcol-1)`), which is D-0078 and the public 44 fortress. Non-H2344 `max(10, cols-maxcol-1)` yields 72 when `maxcol==7` (`(end) ` length 6 plus pad). The CSI pair 72 vs 40 is therefore **not** proof that production `offx` should become the constant 72.

Next port must dump C `cw->offx` / `cw->maxcol` at this confirm (item `strlen+2` vs morestr-only; `tty_curs` CUF vs offx; DECgraphics in the recipe) and match **pinned C + contest patches**, not a recorded column. Do not disable D-0078 H2344 to chase this canary (that would be a public FAIL peel). Do not put `\e[72C` or col 72 into `js/` control flow.

Later RNG @2326 `hack.c` `maybe_smudge_engr` vs extra JS `rn2(25)` is a **follow-up** cluster, not this Must-fix.

`reviews/loop-2026-08-15/` has no chargen-`offx` Must-fix. Prior unattended **138–141** did not queue this canary; **#1504** journal still pointed at `kill_genocided`. This SHA is the queue/primary swap only.

## Hallucinations / overclaim

Subject does not say “Match C.” CURRENT/NOTES say first real miss @step 8 chargen `offx`, ignore step 0 `built` date. That framing is fair for a private canary. Overclaim to watch: treating 72 as a hardcoded offx, or blaming `kill_genocided` / banner date.

## Density

Docs + private recording. Right-size for a queue/primary swap. No `js/`.

## Verification

No focused JS gate required (no scored edit). Cadence **#1505** full `sessions` **44**/44 Scr **11405**/11405 RNG **792838**/792838 (100%) speed `33+0.28/turn` (R² 0.87) on commit `8c51cfe8`. Public fortress held. Private canary remains FAIL until the next **port** iter. Not added to `sessions/manifest.json`.

## Actionable C-wrongs

None to prepend. Must-fix **already** holds the human canary (this SHA). Do-nots for that next port (not new queue rows):

1. Do not hardcode offx 72 / `\e[72C` (recorded column).
2. Do not revert D-0078 H2344 to chase seed8243.
3. Do not ALIGN/FORCE or add this file to public `sessions/`.
4. Dump C `offx`/`maxcol` at `Is this ok?` before changing `nhw_menu_geometry`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: the Samurai tutorial recording is queued as a private C canary and Must-fix for chargen NHW_MENU `offx`, without touching scored `js/` or the public 44.
- Must-fix is the existing seed8243 line (no prepend). Next port pops that first. Not `kill_genocided`, not `built` date.
