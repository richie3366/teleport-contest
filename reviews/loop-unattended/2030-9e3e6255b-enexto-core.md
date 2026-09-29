# Review 2030 — 9e3e6255b — enexto_core null-mdat arm + 3 verified-complete

Metadata: SHA `9e3e6255b`, D-3070, js/teleport.js (+15/−3). Cluster:
`enexto_core` (changed) + `tele_jump_ok`, `dotelecmd`,
`m_blocks_teleporting` (brief-verified complete, no code) — one C file.
`enexto`/`enexto_gpflags` examined, honestly left Open.

## Intent vs deliverable

Promise: port enexto_core's dropped `:231–237` head (null-mdat
default + set_mon_data) and retire three same-file rows verified
complete. Diff adds exactly the head + import + cites; no other JS
touched. Kept.

## Inventory

- `enexto_core` (js/teleport.js:631, exported sync): null-mdat
  default, zeromonst-literal + live `set_mon_data`, two cite
  comments. Only changed function.
- `set_mon_data` import (mondata.js): edge already existed
  (`imports.mjs --can` → ALREADY, no new edge); call-time use only.
- No clones, no stubs, no deleted symbols.

## C ↔ JS fidelity (per function)

`enexto_core` — C teleport.c:218–276 live body (NEW_ENEXTO
`#define`d at :7, `#ifdef` at :216; the :280–376 `#else` is
uncompiled as claimed): null-mdat → `&mons[u.umonster]` ≡
`mons(game.u?.umonster)` ✓ (live path confirmed: makemon.c:1168
gate lets NULL ptr reach :1180/:1196 under rndmongen); zeromonst
+ set_mon_data ✓ (`set_mon_data` verified safe on the fresh
literal — reads default to 0, sets data+mnum); GP_ALLOW_XY no-mask
note :227–229 ✓; fail arm cc=(xx,yy) + FALSE ✓ (cc set
pre-attempt, kept lines). debugpline0/4 named (D_DEBUG-only).
Callers: all 7 C sites map to the D-log JS lines, spot-confirmed
(:3219/:3220/:3244, :671/:672/:677/:678). No RNG in the head.
Confirm.

`tele_jump_ok` (no code) — C :385–417 vs js/teleport.js:979: the
two inside↔outside FALSE arms ≡ `in1 !== in2` on the exact
`within_bounded_area` macro expansion (dungeon.h:144–145 read) —
pure-predicate merge, no behavior delta. Both C callers wired
(:440→:1420, :1628→:1057). Confirm.

`dotelecmd` (no code) — C :919–1031 vs js/teleport.js:2186 + menu
helper, arm-by-arm: non-wizard dotele(FALSE)→ECMD ✓; H/E save ✓;
!menu_requested fast path ✓; tports n/s/t/w with verbatim
menudescs + w-preselected ✓; PICK_ONE resolution (2-pick
non-preselected rule, toggle-off→'w', ESC→ECMD_OK) emulated via
the single-keystroke menu with equivalent outcomes, disclosed ✓;
n/s/t/w switch incl. I_SPECIAL + HIDE/ADD ✓; restore + reverse
`tport_spell(added+hidden)` ✓ (JS's `tport_spell`-loaded guard ≡
C's non-NOOP condition). `select_menu` by-design gap disclosed.
Confirm.

`m_blocks_teleporting` (no code) — C :20–26 vs :845: identical
predicate; uncalled both sides verified (C: prototype only;
JS: def only). Confirm.

## Hallucinations / overclaim

None. Notably honest: enexto/enexto_gpflags "bodies ≡ C" but LEFT
Open for want of a 58-site wiring pass — the exact opposite of an
arm-only overclaim.

## Density

1 changed + 3 verified-complete functions, one C file, ≤10 —
§2b-shaped. Per-function: all ACCEPT. `Ledger:` 4 ported rows
(jsonl in-stat); each has its own Verify line in the D-log.

## Verification

Re-measured `hidden-proxy verify
enexto_core,enexto,enexto_gpflags,tele_jump_ok,dotelecmd,m_blocks_teleporting
--base 9e3e6255b~1 --reach-all`: all six 0-blocked (correctly
labelled vacuous) + smoke 24 PASS, 0 regressed → REACH-OK each.
Ban-grep clean; rulecheck clean (see 2024). Confirm.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
