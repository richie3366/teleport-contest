# Review 1137 — d316606c — mkmaze.c movebubbles/mv_bubble water cons deposit (D-2171)

Metadata: SHA `d316606c`, js/ +194/−58 (`mklev.js` pickup + deposit,
`mon.js` 1-word export, 3 one-word awaits in `allmain.js`/`do.js`) +
map row. D-log D-2171. Subject promises: arrival bubbles never
deposited; C eel mnearto→goodpos rn2(13) had no JS counterpart
(1 session moved past).

Intent vs deliverable: promise matches diff. Actually adds: full
water pickup loop (obj/mon/hero/trap cons + water_pos paint +
block_point), `adx`/`ady` displacement hoist, paint unblock/block,
deposit between paint and boing, async propagation
(movebubbles/mv_bubble_move/restore_waterlevel). No scope creep — one
C locus family plus mechanical awaits.

Inventory: no new named functions (`mv_bubble_move` reworked, still
module-private); one export widened (`elemental_clog`,
`js/mon.js:1574` ASYNC — a real function newly imported, not a clone
re-point; `sym.mjs` confirms the single definition). Callee closure,
all LIVE: `mnearto` → `js/mon.js:1759` ASYNC (awaited), `mnexto`
(same edge), `elemental_clog` (same edge), `remove_worm` →
`js/worm.js:137` sync, `block_point`/`unblock_point` →
`js/vision.js:403` (no reverse edge vision→mklev), `newsym` /
`impossible` (existing display edge), `u_at` / `CONS_*` /
`MON_BUBBLEMOVE` (existing const edge), `place_object` /
`obj_extract_self` / `stackobj` (already imported). D-log syntax PASS
proves the new names resolve. No deleted symbols.

**C ↔ JS fidelity**: confirm against pinned C (`movebubbles
:1537–1685`, `mv_bubble :1951–2107` via `csym.mjs`, both read whole).

- Pickup order per cell OBJ→MON→HERO→TRAP with prepend (`unshift`)
  reproduces C's `cons->next` chain head order exactly, and cell
  iteration (i/x outer, j/y inner) matches — so the deposit RNG
  order (mnearto draws) is preserved across the whole turn.
- `MON_AT` → `m_at` is equivalent: JS heads live on fmon, not the
  grid (verified — `m_at` scans fmon mx/my, segs on
  `_level_monsters`; `mon.js:1400–1416`), so mx/my=0 ≡ C's
  `remove_monster` macro (clears `level.monsters[][]`); worm segs go
  through `remove_worm` on both sides, and only in the worm branch
  like C. `ox=oy=0` + head-first chain rebuild match C verbatim.
- Deposit: `cons->x += dx` rides the clamped/bounced `adx`/`ady`
  exactly like C's in-place params (water always takes the move
  branch on both sides, so the air-skip divergence cannot arise);
  OBJ place+stack, MON mnearto-else-elemental_clog (incl. the C
  comment's rationale), HERO m_at-before/u_on_newpos/newsym-old/
  mnexto, TRAP tx/ty, `b.cons = null` ≡ `b->cons = 0` — all between
  paint and boing, C order, so boing's `rn2(20)`/`rn2(5)` still draw
  last.
- CONS_HERO inline `uundetected = 0` + steed-follow ports C
  `dungeon.c u_on_newpos` same-level core (read at HEAD: ux/uy,
  cliparound, uundetected=0, steed shares location, same-level
  see_nearby, earth_sense) atop the 3-line local `u_on_newpos`
  clone; see_nearby/earth_sense named-deferred, cliparound
  repo-deferred. Punished ball + `vision_recalc(2)` named.
- Trivia omitted (defensive only): `if (b->cons) panic` at pickup
  head, `default: impossible(unknown contents)` in deposit;
  bounds-clamp plines predate this commit. No invented RNG anywhere.

One miss in new code: `js/save.js:747` calls the newly-async
`restore_waterlevel` without `await` (import `save.js:23`;
enclosing `try_restore_save` is async, so the fix is one word). The
D-log's "the restore_waterlevel caller (do.js getlev)" overlooks
this second caller. Sync-complete today — the ini path carries no
cons so no await fires — hence zero behavioral effect, but any
future await on that path races `restore_mapseenchn` /
`rebuildObjectsAt`. Actionable below.

Hallucinations / overclaim: none. D-log discloses the same-step
re-attribution (goodpos@131 → collect_coords@131) with prefix
evidence (+23 draws incl. the eel rn2(13) and full enexto rings)
rather than claiming PASS, and names the residual's suspect family
(sp_lev flip/extends) while forbidding re-pops of goodpos/
movebubbles for it.

Density: ~194 insertions for ~290 lines of C water arms — single
cluster, within ceiling.

Verification: re-measured `hidden-proxy.mjs verify goodpos --base
d316606c~1` → baseline 1 blocked, `0 PASS, 1 moved past (same-step
re-attribution), 0 unchanged, 0 worse → PROGRESS`. Matches the
D-log; the disclosed prefix growth keeps it non-vacuous (a same-step
owner change with +23 matched draws is progress, not noise).
`rulecheck` clean (re-run this iteration); zero banned-pattern hits.

**Actionable C-wrongs**:

1. `js/save.js:747` — add the missing `await` on
   `restore_waterlevel(info.waterlevel)` (async since this commit;
   enclosing function already async). One word, no C citation
   needed beyond this review.

Verdict: **ACCEPT-WITH-DEBT**
