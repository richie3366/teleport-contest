# Review 1570 — a51e30dc — mon.c vamp_stone whole-body port (D-2611)

**Metadata:** SHA `a51e30dc`, `mon.c` `vamp_stone`, D-2611.
JS: `js/mhitm.js` (+96/−40 net: import lines + body restart + doc comment).
New: `scripts/vamp-stone.test.mjs` (3 its, unscored).

## Intent vs deliverable

Subject promises: whole-body restart in C order — buf-before-transform,
`set_mon_min_mhpmax`, `expels`, door `enexto`+`rloc_to`, lapidifying/rise
plines, `NC_SHOW_MSG` on the sandestin arm — fixing two faked semantics
(`mhpmax=max(10)`, sandestin `newcham(...,0)`). Diff actually adds: the
restarted `vamp_stone` body with per-arm `:line` cites, 7 extended import
lines, and the removed `void amorphous; void is_flyer;` suppressors (now
really used). Promise matches deliverable.

## Inventory

- `vamp_stone(mtmp)` (`js/mhitm.js`, export kept, still async) — full C-order
  restart: vampshifter gate, buf, mcanmove/mfrozen, min-hpmax, expels,
  door-rloc, lapidifying pline, `NO_NC_FLAGS` newcham, cham fixup, rise
  pline, unconditional newsym, sandestin arm, `return true` tail.
- `set_mon_min_mhpmax(mon, minimum_mhpmax)` — **pre-existing** file-local
  (`js/mhitm.js:3178`), not added here; newly *used* by both arms.
- No deleted export, no local→import re-point in this diff.

## C ↔ JS fidelity

C locus `mon.c:3765–3830` (66 L, via `node scripts/csym.mjs vamp_stone`;
callers `mon.c:3295`, `trap.c:3866` via `--callers`). Full C body read
here. Branch-by-branch confirm:

- Gate `:3769–3775`: `mndx >= LOW_PM && mndx != monsndx(data) && !GENOD` —
  JS identical, and correctly replaces the old `mtmp.data?.mndx` read with
  `monsndx(mtmp.data)` per C.
- Buf `:3779–3786` built **before** transformation from snapshot `x/y`
  (`coordxy x = mtmp->mx, y = mtmp->my`) with `x_monnam(ARTICLE_NONE,
  SUPPRESS_SADDLE|SUPPRESS_HALLUCINATION|SUPPRESS_INVISIBLE|SUPPRESS_IT,
  FALSE)` + amorphous "coalesces on the" / flyer "drops to the" /
  "writhes on the" + `surface(x, y)` — JS identical including the
  snapshot-const + 3-way ternary order.
- `mcanmove=1/mfrozen=0`, `set_mon_min_mhpmax(mtmp,10)`, `mhp=mhpmax` —
  JS identical. Clone verified: local body floors at `m_lev+1` then at the
  caller minimum, matching C `mon.c:2806–2823` (via `csym.mjs`, range
  printed by the tool). C declares it `staticfn`, so a JS file-local is
  scope-faithful, not drift — verified CLONE, no action.
- `engulfing_u → expels(mtmp, data, FALSE)` — JS `await expels(...)`;
  `expels` is async (`js/mhitu.js:1683` per `sym.mjs`), await required
  and present.
- Amorphous `closed_door → enexto(&new_xy, mx, my, &mons[mndx]) →
  rloc_to` — JS `enexto(new_xy, mtmp.mx, mtmp.my, mons(mndx))` then
  `await rloc_to(...)`; `enexto` is sync (`js/teleport.js:657`), so the
  bare call is correct.
- `canspotmon → pline_mon("%s!", buf) + display_nhwindow(WIN_MESSAGE,
  FALSE)` — JS ``pline_mon(mtmp, `${buf}!`)`` + `await flush_topl_more()`
  (async per `sym.mjs`, awaited). The `flush_topl_more`-for-`display_nhwindow`
  reading is the house idiom (trap.js:1987 cited); no JS export exists.
- `(void) newcham(mtmp, &mons[mndx], NO_NC_FLAGS)`; `data == &mons[mndx]
  → cham = NON_PM else cham = mndx` — JS `await newcham(mons(mndx),
  NO_NC_FLAGS)` (D-1648 await idiom kept) + `monsndx`-compared fixup.
- Rise pline `:3809–3813` over **post-rloc** `surface(mtmp->mx, mtmp->my)`
  — JS reads `mtmp.mx/my` after the `rloc_to`, correct per C order.
- `newsym` unconditional in both arms (`:3814`, `:3827`); sandestin arm
  with `NC_SHOW_MSG` (`:3825`) — the two faked semantics are repaired.
- Tail `return TRUE` kept as `return true`.

RNG: C body draws nothing (`rn2`/`rnd`/`rn1`/`d` absent); JS adds none.
Callers: both C call sites are wired in JS — `js/mhitm.js:3114`
(`mon_to_stone` ← `mon.c:3295`) and `js/trap.js:3386` (← `trap.c:3866`,
contexts re-read here; both `if (!vamp_stone(...)) return;`).

Callee closure: all LIVE — `is_vampshifter`/`amorphous`/`is_flyer`/
`engulfing_u` already imported (`js/mhitm.js:40,108–109`); `enexto`/
`rloc_to` (teleport.js), `Amonnam` (do_name.js, export confirmed),
`monsndx` (mondata.js), `surface` (sit.js), `flush_topl_more`
(display.js), `ARTICLE_NONE`/`SUPPRESS_*` (const.js). No stub, no silent
omit; "Named: none new" is accurate.

## Hallucinations / overclaim

No dispatch/stub split. The "coverage gap, not corpus divergence" framing
is accurate (0 blocked, re-measured below). The `:3134` cite in the D-log
for the min-hpmax helper is off — `csym.mjs` places `set_mon_min_mhpmax`
at `mon.c:2806–2823` — but the doc comment on the clone itself cites
`:2806–2823` correctly, so this is a message typo, not a code wrong. Not
queued (cosmetic, single digit).

## Density

One C function (66 L), one JS module. Right-sized; same-file caller
wiring needed nothing (both call sites pre-wired).

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: no `FORCE`/`DIAG`/`getRngLog`/`fastforward`/RNG/seed/step reads
  in the `js/` hunks (sole `seed[0-9]` hit is the message's green-gate line).
- Re-measured: `hidden-proxy.mjs verify vamp_stone --base a51e30dc~1
  --reach-all` → `0 session(s) blocked` at baseline and working tree
  (vacuous-note path, correctly framed — RNG-0 function) + `smoke 24/24
  PASS, 0 regressed → REACH-OK`. Both summary lines cited; matches D-log.
- `scripts/vamp-stone.test.mjs` → pass 3, fail 0 (re-run here).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
