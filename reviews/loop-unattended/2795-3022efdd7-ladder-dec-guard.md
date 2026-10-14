# Review 2795 — 3022efdd7 — LADDER dec guard in the loaded arm (Must-fix)

- **SHA:** `3022efdd7` (Wed 2026-10-14) — Must-fix regression (D-3943).
- **D-entry:** D-3943. **Ledger:** `display.c` row touched.
- **Diff size:** `js/display.js` +8/−0 (guard + cite), +1 test.
- **Method:** cliff Must-fix (≤10 fns) — whole Method on the guard.

## Intent vs deliverable (promise vs diff)

The subject promises: D-3941's loaded arm rendered DEC 0xf9/0xfa as
dec:true `y/z` → terminal `≤`, breaking 2 RNG-synced fortress
sessions; forcing dec:false on DEC y/z renders (mirroring the LADDER
base arm) heals both to FULL PASS.

The diff adds exactly that guard. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | y/z dec:false guard (display.js:4966) | map_glyphinfo :2653–2655; g_putch :3739–3790; frozen DEC_MAP (13 entries, no y/z) | whole vs the measured spec |
| 2 | symset-loader +1 test (ladders flat, walls mapped) | — | passes (14/14 at HEAD, ran) |

No helper, no import change, no symbol deleted or re-pointed. The
`rendered.dec` read is same-function data flow.

## C ↔ JS fidelity

Mechanism verified end to end. C sends 0xf9 in a DEC span
(graph_on + `y`); the frozen comparison maps dec cells through a
13-entry DEC_MAP (`l q k x m j t u w v n a ~` — no y/z), so C's cell
compares as raw `y`. JS bakes dec-y to `≤` via terminal
DEC_TO_UNICODE. I proved the pre-guard path directly:
`symset_render_char(0xf9, H_DEC)` → `{ch:'y', dec:true}` — the guard
is exactly what flips it, mirroring the LADDER base arm
(display.js:4464, same cite). IBM 0xfa already renders dec:false
(verified) — untouched, correct.

Completeness audit (whole dat/symbols): every 0xF9/0xFA S_ value —
DECgraphics ladders (guarded), AmigaFont S_sw_bc/br under H_UNK
(guarded — reachable via persistent swallow glyphs, so this arm
matters), IBM-family S_room/ndoor/ice/bridges (dec:false by
handling) — resolves correctly. Frozen/terminal maps agree on all 13
shared entries; the bake site already excludes `` ` `` `g` `|` `o`
`s` `{`. The ov-arm and darkroom-arm "untouched" claims hold: ov
keeps pre-D-3941 dec behavior (no session regressed there), and no
S_ line targets X_nothing while S_room sources never yield guarded
chars under DEC-ish handling (verified by scan).

One residual, documented as an observation (no row — unreached):
AmigaFont S_explode1 (alias of S_expl_tl, 0xE6, H_UNK) renders
`{ch:'f', dec:true}`, and `f` is baked to `°` (not in the bake
exclusions, not in the frozen map, not in the guard). It fires only
on transient explosion frames under AmigaFont; no corpus session
reaches it (12 AmigaFont sessions: 2 FULL PASS, 10 blocked early on
other owners). A one-char guard extension if a session ever names it.

Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. Rule #2:
clean (iteration-wide, SHA 2790).

## Hallucinations / overclaim

None. "Heals both Must-fix sessions + the latent AmigaFont case" —
both sessions verified FULL PASS below with the D-log's exact
counts; the AmigaFont S_sw claim verified in dat/symbols (no
Handling line → H_UNK, persistent swallow glyphs).

## Density

Must-fix discipline (§10.18): parent Must-fix held exactly the one
LADDER regression row (verified in `3022efdd7~1:docs/LOOP-QUEUE.md`);
this commit popped it and shipped alone (guard + test only). The row
is archived with `**Addressed:** D-3943` (hash filled by this review
commit per the rule). ✓

## Verification

Re-measured myself on current code:

```
scen-sweep-Ranger-95303: PASS (1593/1593 scr, 56465/56465 rng)
scen-sweep-Barbarian-582719: PASS (1230/1230 scr, 74270/74270 rng)
smoke map_glyphinfo: 24 PASS, 0 regressed → REACH-OK
```

Both FULL PASS with the D-log's exact counts; the `verify
map_glyphinfo` vacuous-note is disclosed in the D-log (regression
rows don't attribute to `--fn`). No REGRESSED session.

## Actionable C-wrongs

None live. The guard is complete for every reached byte; the `f`
residual is unreached (observation above, no queue row — it would be
busywork with no session to move).

Verdict: **ACCEPT**
