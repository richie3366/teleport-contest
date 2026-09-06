# Review 868 — 3ef6abec — polyself.c domonability arms (D-1898)

Metadata: SHA `3ef6abec`, D-1898. Files: `js/polyself.js`
(+295/−10: dispatch reorder + `dospit/doremove/dosummon/dopoly/
domindblast` + local `mdistu`), `js/pray.js` (`export` on
`Punished`). Next index 868.

Intent vs deliverable: subject promises C-order `#monster`
dispatch plus five arms. The diff delivers the 15-arm dispatch
in exact C order plus all five callees — but `domindblast`
carries two behavior blocks with no C source (see C-wrong 1).
Otherwise promise ≡ diff.

Inventory: 5 new exported arms + local `mdistu`. Callee closure:
12 `--can` checks, all ALREADY (lock, getline, dothrow, were,
read, sit, fountain, wizard, mon, uhitm, mkobj, pray, hacklib —
no new edge). `sym.mjs`: `unpunish` read.js:1647 sync
(un-awaited ✓), `aggravate` wizard.js:167 sync (un-awaited ✓),
`Punished` pray.js:195 sync (local→export re-point, body
unchanged — output pasted). `mdistu` matches the C macro
(`hack.h:1532` `distu(mx,my)` ≡ `dist2(ux,uy,mx,my)`, and JS
`dist2` ≡ `hacklib.c:672–678` per review 866) — a verified
CLONE, though the 7th copy where no export exists to import
(debt note, not a C-wrong).

**C ↔ JS fidelity**: dispatch ≡ `cmd.c:889–949` arm-for-arm
(hide/web `yn_function` prompt with `hidespinchars`, q/ESC →
ECMD_OK ahead of every arm ✓; gaze/hide/web/steed correctly
route to the unchanged reflexive/normal tail — no behavior delta
where C is not yet ported; deferred arms named in the D-log and
`turns.md`) ✓. `dospit` ≡ `polyself.c:1449–1478` (getdir→CANCEL,
AT_SPIT/AD_ANY=-1, BLND/DRST→venom else ACID with the
`impossible` fallthrough, spe=1, `throwit`) ✓. `doremove` ≡
`:1480–1494` (Punished→unpunish, buried-ball `surface` arm)
✓. `dosummon` ≡ `:1623–1639` (uen−10+botl, WIS, tame
`were_summon`) ✓. `dopoly` ≡ `:1876–1890` (pointer-compare as
reference compare, transform+newsym) ✓. `domindblast` core loop
≡ `:1893–1938` (uen gate, `rnd(15)`, peaceful/mindless gates,
telepathy/`rn2(2)`/`rn2(10)` with `u_sen` short-circuit,
wakeup-before-blast hostility rule, mhp−=dmg→`killed`, nmon
snapshot) ✓ — PLUS the blocks below, which are not in those 46
C lines.

Hallucinations / overclaim: the D-log presents the gaze blocks
as part of the faithful port ("floating-eye `nomul` freeze +
`multi_reason`, Medusa killer+`done(STONING)`"). They are not in
C `domindblast`. The code comments cite "`passive()` in
uhitm.c" consistency and "too weird" — a self-documented
invention, not a C `if`.

Density: one dispatch family — right-sized.

Verification: gates PASS; re-measured myself (`--base
3ef6abec~1`): 0 blocked on `domindblast` and `domonability` at
baseline and HEAD — vacuous as stated, no corpus contradiction.
No banned patterns. Verification is green; this verdict rests
solely on C-wrong 1, which no gate covers (no corpus session
poly'd into a mind flayer near a floating eye/Medusa).

**Actionable C-wrongs**:

1. `domindblast` invented gaze-retaliation blocks — delete both
   in one port iter. After the per-monster blast, JS freezes the
   hero (`nomul`, floating eye) and stones the hero
   (`done(STONING)`, Medusa) where C `:1893–1938` does neither —
   C never calls `passive()` from `domindblast`; gaze
   retaliation fires on melee only. The Medusa block has no
   Blind/stone-resistance gate at all, so even a blind hero is
   stoned. Fix: delete the two blocks (the `mhp<1 continue` guard
   line goes with them); `passive()` already owns this behavior
   on its real trigger path.

Verdict: **QUALITY-RISK**
