# Review 1407 — 38249822 — vault.c gd_move whole body (D-2448)

- Commit: `38249822` — "`vault.c` gd_move whole body in C order (coverage PARTIAL → live) (D-2448)."
- Files: `js/vault.js` (+642/−~210 restart), `js/mon.js` (+39:
  `mpickgold` + gd_move caller), `js/objects.js` (+2 GOLD), comment
  retires in shk/teleport; docs + map + queue pop. +537/−212.
- D-log: D-2448. Queue row popped: gd_move PARTIAL (C 313 L).

## Intent vs deliverable

Subject promises whole `gd_move` (`vault.c:888–1201`) in C order.
Diff delivers the full arm chain, three staticfn helpers, the
`mpickgold` callee, and a new caller wiring. Promise kept.

## Inventory

New/changed JS: `gd_move` (`js/vault.js:1030–1377`), `gd_mv_monaway`
(`:879`), `gd_pick_corridor_gold` (`:901`), `gd_letknow` (`:978`),
`restore_fakecorr0` (`:1001`), `mpickgold` (`js/mon.js:1587`),
`GOLD=15` (`js/objects.js:122`), mon.js:2918 caller. No symbol
deleted. Required `sym.mjs` output (paste): `mpickgold
js/mon.js:1587 ASYNC` (all three vault call sites await ✓);
`SetVoice js/sndprocs.js:50 sync`. `in_fcorridor`/`wallify_vault`/
`find_guard_dest` are vault-local C-staticfn ports (pre-existing,
not exports — correct layer). New edges all extend pre-existing
ones (`--can` vault→mon ALREADY; mon→vault ALREADY — the cycle is
old, runtime-only calls into hoisted declarations, no TDZ read).

## C ↔ JS fidelity

C loci via csym: `gd_move :887–1201` (315 lines), `gd_mv_monaway`
`:734–750` (via sed), `gd_pick_corridor_gold :752–833`,
`gd_letknow :869–886`, `mpickgold mon.c:1826–1843`,
`doormask flags rm.h` (`#define doormask flags` verified). Walked
every arm against C:

- Exact: off-level, dead/mx/gddone cleanup, both-out wallify,
  hostile rloc/wallify/clear_fcorr/letknow/−1 arms, teleported
  reject, witness consume/destroy scold, follow-me warncnt==3
  (hidden-gold wording, I-repeat/upstart, dropgoldcnt),
  warn-knave ==7 (mnexto NOMSG + fakecorr[0] restore + recalc +
  del_engr + newsym), fainted/`multi>=0` warncnt++, teleported-gold
  rloc+restore+letknow, Well-begone + cleanup, fcend>1
  corridor-disappears + demand-6/So-be-it (Deaf/Blind
  noit_Monnam/noit_mhis arms), gold scan (fcbeg break),
  pick-corridor-gold → warncnt=5, Move-along `!rn2(10)` with the
  uswallow/sticks gate at C position (the function's only own RNG
  draw — call-for-call ✓), look-around (hor&vert, fcorridor skip,
  ACCESSIBLE→newpos inline with gddone→cleanup), dig loop
  (DOOR/redirect/`dy=0`/IS_ROOM with the `del_engr_at(ex,ey)`
  quirk preserved), STONE→CORR, proceed (unblock/cansee-newsym,
  fakecorr append, `fi===FCSIZ` throw ≡ panic), stuck
  find_guard_dest retry (Monnam vs noit_ distinction kept),
  newpos (monaway, ogx/ogy, remove/place, mpickgold + canspotmon
  pline else newsym-new, restfakecorr, return 1).
- Helpers exact: monaway (Deaf/SetVoice/rloc ERR|MSG/MON_AT≡m_at/
  limbo/recalc), corridor-gold (under_u impossible, dist2-hero
  enexto ×10 with tie-break, move/extract/minv/newsym, in-place
  and third-spot arms, calm infix, move-back), letknow
  (whistle/shouting vs approaching/confronted).
- `restore_fakecorr0`: C writes `.flags` directly, but
  `doormask IS flags` (union) while JS cells split the slots — the
  IS_DOOR split is the correct adaptation, typ-first order kept.
- `mpickgold` exact (g_at, oc_material, extract+minv, `verbose &&
  !isgd` pline_mon GOLD-vs-money, newsym); `GOLD=15` ≡
  objclass.h:28 ✓.
- Caller closure (all 3 C sites): mon.c:1236 → mon.js:2918 NEW
  (gate exact: isgd/!mx/!MIGRATING/moves>mlstmv ✓, on the
  pre-existing mon↔vault edge); monmove.c:1808 + vault.c:276
  pre-wired ✓.
- Banned-pattern grep: zero hits.

Nits (not C-wrongs): the named omits are honest and map-bound
(debugpline1 log; in-bounds defensives; clear_fcorr
Punished/uball arm — pre-existing occupant path).

## Hallucinations / overclaim

None. "m_at ≡ MON_AT" verified (both are the occupancy test).
"throw ≡ panic" is the honest JS idiom (a JS throw anywhere is
Must-fix-grade, but this mirrors C's genuine panic, unreachable
by C's own argument). No dispatch/callee split: all callees LIVE.

## Density

One C function + its staticfns + callee + caller, 5 files,
+537/−212. Within cap; whole-body claim holds throughout.

## Verification

D-log: `verify.mjs --fn gd_move` → PASS (syntax 5 files · rule2 ·
hidden note · smoke 24/24 · green · strict · cohort · full 44/44).
My re-run on this SHA:

- `hidden-proxy.mjs verify gd_move --base 38249822~1 --reach-all`
  → "0 session(s) blocked on it (0 at baseline, 0 in the working
  scoreboard)" + "smoke gd_move: no RNG-tagged reach; fixed smoke
  spread (24 run): 24 PASS, 0 regressed → REACH-OK". Vacuous but
  honestly logged; no REGRESSED session.
- Global `imports.mjs --rulecheck`: Rule #2 clean.
- Full-corpus re-score at HEAD (this audit): 495/540 unchanged, but
  already-FAIL `scen-tour-Healer-92093` moves rngM 22950→23239 at the
  same step-36 screen block — downstream RNG realignment from this
  port, same divergence point, not a fix and not a regression.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
