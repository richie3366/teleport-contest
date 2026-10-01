# Review 2162 — a5f89dd93 — savebones whole-body completion

SHA `a5f89dd93`, D-3202; 2026-10-01; `js/end.js` restart (+231/−~90)
+ `js/bones.js` resetobjs export / write_bonesfile trim. Single-function
cluster (bones.c savebones). Closes no prior review.

**Addressed:** D-3209 `6b304d1a2`

## Metadata

- Subject: "`bones.c` savebones whole-body completion (make_bones
  head, arise/else-if control flow, ebones, fmon/ftrap/fobj loops,
  hero-zero, memclear, wizard_bones)".
- Promises: C-order restart (clear_bypasses head, make_bones gates,
  live iter_mons, single if/else-if/else, ebones record, fmon/ftrap/
  fobj loops, hero-zero, memclear, wizard_bones) + trimmed
  write_bonesfile.

## Intent vs deliverable

Kept except one introduced C-wrong (below). Diff delivers the full
restart in C order with all named VFS omits legitimate, and the
bones.js trim/export as promised. But the "duplicated inline loop →
live iter_mons" swap drops splice-safety the old code had: C iter_mons
caches `mtmp2` before the callback, JS `iter_mons` iterates the live
array, and `remove_mon_from_bones` splices via mongone — a qualifying
monster following a removed one is skipped and wrongly kept on the
bones level.

## Inventory — savebones

Restarted `savebones` (js/end.js:1647, same name/signature); new
imports: clear_bypasses (worn.js), unleash_all (apply.js), unpunish
(read.js), dismount_steed (steed.js), newebones (restore.js), Punished
(pray.js), iter_mons (mon.js, existing edge), obj_attach_mid (mkobj.js),
resetobjs (bones.js), roles/races (roles.js), EBONES/NUM_ROLES/
NUM_RACES/M_SEEN_NOTHING/unhideable_trap/DISMOUNT_BONES (const.js).
Dropped: mon_offmap import (predicate moved into iter_mons).
`js/bones.js`: resetobjs local→export (1 word); write_bonesfile trim
(memclear/untame/resetobjs moved out to savebones, savefruitchn hoist).
Deleted: the inline snapshot loop (re-pointed to iter_mons):

```text
unleash_all   js/apply.js:1548   sync (un-awaited ✓)
unpunish      js/read.js:1937    sync (un-awaited ✓)
dismount_steed js/steed.js:877   ASYNC — await required (awaited ✓)
newebones     js/restore.js:87   sync ✓
Punished      js/pray.js:246     sync ✓
clear_bypasses js/worn.js:1191   sync ✓
iter_mons     js/mon.js:2973     ASYNC — await required (awaited ✓)
obj_attach_mid js/mkobj.js:4317  sync ✓
unhideable_trap js/const.js:2567 sync ✓
```

All LIVE, no clones, no STUBs. Spot edge check: end←apply is ALREADY
(a second import statement on a pre-existing module edge — safer than
the "new edge" wording suggests). No cycle-forced clone claimed.

## C ↔ JS fidelity — savebones

C `bones.c:402–625` (csym range). Probe `:411–428`: close_nhfile named
✓; wizard yn Replace with all three early returns + fall-through to
make_bones on delete-ok ✓; compress on every return path named ✓.
make_bones `:431–445`: unleash_all ✓, Punished-gated unpunish ✓,
usteed-gated dismount_steed(DISMOUNT_BONES) ✓, iter_mons + dmonsfree
✓ (modulo the splice finding below), forget_engravings ✓, fruit-fid
negation ✓, set_ghostly(invent) ✓. Arise if/else-if/else `:457–505`:
single chain over an outer mtmp — the old double-drop fixed ✓; arise
arm complete (in_mklev, makemon NO_MINVENT, !mtmp → drop + NON_PM +
return, give_u_to_m_resistances, christen, newsym, drop, mummy wrap,
m_dowear) in C order with RNG order preserved ✓; statue arm
(mtmp = null) ✓; ghost arm + obj_attach_mid ✓. Shared tail `:506–540`:
m_lev/mhp/female/msleeping ✓; newebones (JS restore.js:87 verified
C-exact incl. parentmid) ✓; role/race `i <= NUM_*` loops with the
overrun slot guarded (both sides miss → keep 0 on reachable inputs)
✓; deathlevel/luck-without-moreluck/Role_switch-mnum
(you.h:248 ≡ urole.mnum ✓)/female/demigod/crowned ✓;
oldalign `{type, record}` drops `abuse` — the align struct has three
fields (align.h:10–14), but no C code reads any oldalign field (the
record is only copied/serialized/freed), so this is dead data, noted
not queued. fmon loop `:541–551` ✓ (ghostly + resetobjs(FALSE) +
mlstmv=0 + untame + M_SEEN_NOTHING, comment-verbatim). ftrap loop
`:552–555` ✓. fobj/buried `:556–559` ✓ (array-or-chain kept).
Hero-zero `:561–562` before the cemetery with frpx/frpy from ux0/uy0
✓ (C order now, was value-equal but misplaced). Memclear `:563–572`
moved verbatim into C position ✓ (the x=0 column inclusion is
pre-existing from the write_bonesfile copy — C starts at x=1; moved
unchanged, unqueued). Cemetery `:574–594`: who/how/when/frpx/bonesknown/
prepend ✓. wizard_bones `:595–599` ✓. File tail `:600–625`:
WRITING + store_version + VFS savelev (creat/errno/VMS/commit/binary
arms all legitimately named — VFS creat cannot fail, writes atomic,
no post compression) ✓; write_bonesfile keeps C's savefruitchn →
update_mlstmv → savelev order ✓. Callers: end.c:1365 → js/end.js:1243
done() ✓ (bones.c/shk.c refs are comments); no other JS callers.
RNG: no new draws; makemon/drop ordering preserved.

THE C-WRONG — removal-skip: C `mon.c:4527–4540` caches
`mtmp2 = mtmp->nmon` before each callback (splice-safe). JS
`mon.js:2973–2978` iterates the live `game.fmon` array whose JSDoc
claims "no nmon unlink hazard" — false for arrays: `mongone`
(js/mon.js:3650 `list.splice(i, 1)`) shifts the next element into the
consumed index and `for..of` skips it. The OLD savebones loop
snapshotted (`[...(game.fmon || [])]`); this SHA replaced it with the
unsafe shared helper. Trigger: two mongone-qualifying monsters
adjacent in fmon order at bones time (wiz/Medusa/nemesis-voice/
leader-voice/Vlad/displaced-Oracle, js/end.js:1624) — the second is
skipped and wrongly persists on the bones level (dmonsfree only frees
mhp<1, so the live skip survives). Rare trigger, large effect (a kept
Medusa/Vlad for the next hero), deterministic given level content.
Verdict on the function: QUALITY-RISK via this arm.

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate gates.
Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

"Live iter_mons" is live but NOT equivalent: the swap is sold as a
dedup ("duplicated live iter_mons inline") while dropping the
snapshot the old code had and C requires. The iter_mons JSDoc's "no
nmon unlink hazard" rationale is the enabling falsehood. Everything
else ("C order", "full EBONES record", edge SAFE claims) verified.

## Density

One whole C function (224 lines) restarted in C order, +231 js
insertions, same-file closure holding nothing more Open (per D-log),
no Must-fix bundled. Per-function Ledger (partial, omits in note) and
Verify lines present.

- Ledger: savebones partial — QUALITY-RISK (removal-skip arm).

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
verify savebones: baseline a5f89dd93~1 (scoreboard at 6e06fa8e7) — 0 session(s) blocked on it (0 at baseline, 0 working)
smoke savebones: no RNG-tagged reach; fixed smoke spread (24 run, 10.7s): 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log (0 blocked, smoke 24/24, green/strict/cohort).
No REGRESSED session; vacuity stated plainly. The smoke spread cannot
cover the removal-skip (needs two adjacent qualifying mons at bones
time — message/RNG-silent path).

## Actionable C-wrongs

1. savebones removal-skip via iter_mons (above): make `iter_mons`
   splice-safe (cache-next per C `mon.c:4527–4540`, or snapshot) and
   correct its JSDoc, or re-snapshot the savebones call. One port
   iter. Falsifier: bones save with two adjacent qualifying mons —
   both must leave. Queueable below.

Verdict: **QUALITY-RISK**
