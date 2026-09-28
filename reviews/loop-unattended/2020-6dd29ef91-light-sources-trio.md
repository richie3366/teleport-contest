# Review 2020 — 6dd29ef91 — light.c wiz_light_sources trio

Metadata: SHA `6dd29ef91`, D-3060, js/light.js (+128/−~6) +
js/getline.js (+11) + scripts/light-sources.test.mjs (+136, committed).
Three-function single-C-file cluster. Per-function blocks below; SHA
verdict is the worst of them.

## Intent vs deliverable

Subject promises "wiz_light_sources + maybe_write_ls +
obj_move_light_source". Diff actually adds all three exports in C
order, the #lightsources EXT_CMDS runner, four import edges/consts,
and a committed 7-case harness. Matches promise.

## Inventory

- `maybe_write_ls` (new export js/light.js:441, sync) — C
  light.c:570–603 (staticfn; exported for future wiring + test).
- `obj_move_light_source` (new export js/light.js:552, sync) — C
  light.c:705–715.
- `wiz_light_sources_lines` (new export js/light.js:580, sync) + async
  `wiz_light_sources` (js/light.js:607) — C light.c:934–975.
- Wiring: EXT_CMDS 'lightsources' runner (js/getline.js, dynamic
  import — cycle-safe).
- No deleted symbols, no clone→import re-points.

## C ↔ JS fidelity

`maybe_write_ls` vs C `:570–603`: null-id arm (`impossible` +
continue) ✓ (`!ls` sparse guard JS-only, disclosed); LS_OBJECT
`!obj_is_local` ✓ via live js/mkobj.js:1090; LS_MONSTER
`!mon_is_local` with the light.c:373 macro `(mon)->mx > 0` (verified
by sed — correctly NOT timeout.c's, D-1708) ✓; default arm
(is_global=0 + impossible) ✓; `is_global ^ (range == RANGE_LEVEL)`
select ✓; count + conditional write ✓; returns count ✓.
(NHFILE,range,bool)→(range,callback) adaptation follows the
maybe_write_timer precedent, disclosed. Sync like C; impossible arms
`void` fire-and-forget per the write_ls precedent. Verdict: exact
body. C callers save_light_sources `:434` count / `:436` write pass
(verified by sed, with `discard_flashes()` first per `:427–432` as
the D-log claims) are NOT rewired — JS save path keeps its peel +
snapshots. This is NAMED with C cites and a behavioral rationale
(C discards flashes first; JS snapshots keep a null-id skip), not
silent — allowed per the callers-table rule. No Must-fix.

`obj_move_light_source` vs C `:705–715`: retarget loop (`ls.id ===
src`, identity = C pointer equality) ✓; `src.lamplit = 0` /
`dest.lamplit = 1` ✓, no null guards — faithful (C NONNULLARG12).
Zero C call sites (only extern.h:1422 decl, verified) — exported
unwired ✓. Verdict: exact.

`wiz_light_sources` vs C `:934–975`: WIN_ERR arm `:945` collapses
(named — no JS alloc-failure layer) ✓; header `%2d,%2d` via padStart
✓; blank ✓; `gl.light_base` NULL test → length (named, array
precedent) ✓; header rows verbatim ✓; row format `  %2d,%2d   %2d
0x%04x  %s  %s` spacing reproduced exactly ✓; flags via
`>>>0 … padStart(4,'0')` — matches C `%04x` even for negatives (full
width, min 4) ✓; typeWord nests in C `:955–966` order
(obj/mon-local/you-youmonst/`<m>`/`???`) ✓ with `=== game.youmonst`
for `== &gy.youmonst` ✓; null-LS_MONSTER-id `<m>` named (dead in
practice — only flashes null, and flashes are LS_OBJECT) ✓;
display/destroy collapse into the awaited menu ✓ (precedent);
ECMD_OK both arms ✓; wiz gate renders cmd.c:157 `unavailcmd`
verbatim ✓ (matches the timeout.js in-function-gate precedent).
C caller cmd.c:1756–1757 table (IFBURIED|AUTOCOMPLETE|WIZMODECMD,
verified by sed) → JS EXT_CMDS entry (name/wiz/autocomplete) ✓
wired. Callees: pline, show_nhw_menu_text (js/pager.js:597 ASYNC,
awaited), fmt_ptr — all LIVE. Verdict: exact.

sym.mjs: `obj_is_local js/mkobj.js:1090 sync`,
`show_nhw_menu_text js/pager.js:597 ASYNC`. Nothing deleted or
re-pointed.

## Hallucinations / overclaim

None. Every collapse (WIN_ERR, NULL→length, `<m>`, save-path
non-rewire) is named with C line cites I re-verified. The
"mon_is_local (mx > 0), not timeout.c" claim verified at light.c:373.

## Density

Three whole light.c functions + wiring + harness, ~139 `js/`
insertions. Same-C-file growth per §2b, each with Ledger entry (all
`ported`) and Verify line. Right-sized.

## Verification

Re-measured all three (`--base 6dd29ef91~1 --reach-all`): 0 blocked
+ 24/24 smoke REACH-OK each — matches the D-log, honestly vacuous
(rows cited 0 blocks). Re-ran the harness: `node --test
scripts/light-sources.test.mjs` → 7 pass / 0 fail. Banned-pattern
grep: clean outside CURRENT boilerplate. No seed/step/coordinate
reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
