# Review 1599 — 01b46bc9 — read.c seffect_destroy_armor whole-body port (D-2640)

**Metadata:** SHA `01b46bc9`, `read.c` `seffect_destroy_armor`, D-2640.
JS: `js/read.js` (+96/−48: restart + same-file
`disintegrate_cursed_armor`), `js/objnam.js` (+26: `actualoname`),
`js/do_wear.js` (2 comment-only wiring notes); new
`scripts/seffect-destroy-armor.test.mjs` (+98: 4 new + 2 pre-existing,
not scored). Map line updated (`c-js-map/turns.md:747`).
No prior review claimed closed.

## Intent vs deliverable

Subject promises: restart in C order — confused erodeproof swap via
p_glow2 + COST_DEGRD, cursed vibrate via Yobjnam2 + adj_abon +
make_stunned, blessed gets_choice arm (name-reveal, getobj pick,
disintegrate_cursed_armor), new actualoname import. Diff delivers
all of it; no new import edges (4 extended lines). Promise matches
deliverable.

## Inventory

- `seffect_destroy_armor` (read.js, async export) — restarted.
- `disintegrate_cursed_armor` (read.js, async, C staticfn) — new
  same-file port.
- `actualoname` (`js/objnam.js:2829`, sync per `sym.mjs`-visible
  export) — new C-home export.
- do_wear.js: comment-only (any_worn_armor_ok / count_worn_armor
  caller-wiring notes flipped deferred→live). No behavior.
- No deleted symbol, no local→import re-point.

## C ↔ JS fidelity

C loci `read.c:1323–1396` (74 L) + `:1293–1321`
disintegrate_cursed_armor (29 L) + `objnam.c:2488–2498`
actualoname (11 L) + `minimal_xname` `:1038–1091` (all read here).
Arm-by-arm confirm:

- Confused `:1333–1352`: bones-itch + `*sobjp=0` + STR/CON
  exercise + return-null (useup ran inside strange_feeling) ✓;
  erodeproof save/zero-for-messages/p_glow2/restore+COST_DEGRD/
  set-new ✓ (`costly_alteration` live shk.js:148; `p_glow2`
  pre-existing file-local read.js:743). Scroll survives ⇐ sobj ✓.
- Cursed `:1355–1371`: `pline("%s.", Yobjnam2)` ✓; spe≥−6 → −1 +
  `adj_abon(otmp,−1)` ✓; `make_stunned((HStun&TIMEOUT)+rn1(10,10),
  TRUE)` ✓ (TIMEOUT const imported); else-if
  `disintegrate_arm(otmp)` → known + sobj ✓; vibrate path falls to
  final `return sobj` (scroll survives) like C ✓.
- Uncursed `:1372–1395`: gets_choice gate
  (`otmp && sobj && blessed && count>1`) ✓; `!oc_name_known` →
  `pline("This is %s!", an(actualoname(sobj)))` ✓;
  `getobj("destroy", any_worn_armor_ok, GETOBJ_PROMPT)` +
  SUGGEST-check ✓; disintegrate → known+sobj ✓; blessed →
  disintegrate_cursed_armor ✓; `!destroy_arm()` → skin-itch +
  null ✓; else known ✓.
- `disintegrate_cursed_armor`: uarm→uarmu C order, empty→FALSE,
  `rn2(idx)` pick, TRUE/FALSE tail — exact.
- `actualoname` vs C override_ID + minimal_xname: suppress
  oc_uname ✓, force oc_name_known + dknown with save/restore ✓,
  singular bknown-0 xname ✓, verbatim "uncursed " strip ✓. The
  BUC worry was checked and unfounded: JS xname keys its
  blessed/cursed/uncursed prefix off `bknown` (objnam.js:3217),
  and the copy forces `bknown: 0` — exactly C's zeroobj shape —
  so blessed/cursed scrolls cannot leak a BUC prefix either side;
  the strip is equally (in)active in both. Bareobj-subset deltas
  (corpsenm/known/owt/AMULET, SLIME spe, distant_name) are dead
  arms for the scroll use-case and named at the export + D-log +
  map line — legitimate named omits, not stubs.
- RNG walk call-for-call: some_armor internals (pre-existing) →
  `rn1(10,10)` stun → getobj (user) → `rn2(idx)` pick. Same gates,
  same order as C ✓.
- Confusion gate `HConfusion || Confusion-flag`: C `Confusion` ≡
  HConfusion (D-1048); the OR'd JS screw flag is the sibling-seffect
  convention (read.js:294/:343 do_mapping path) and errs toward C's
  outcome in the only state where it is set ✓.
- Callee closure: every callee live (do_wear trio + adj_abon +
  disintegrate_arm/destroy_arm, objnam trio, potion make_stunned,
  shk costly_alteration, invent getobj, file-locals p_glow2 +
  strange_feeling_scroll — the latter a pre-existing clone of live
  detect.js strange_feeling, named with its own future row).
- Caller closure: seffect dispatch (staticfn, unchanged shape);
  actualoname's second C caller pray.c:878 (crowning livelog) was
  already wired pre-commit via the inline override_ID idiom
  (pray.js:1730–1740, xname under override with save/restore) —
  not touched here, no unwired caller remains. (Future
  consolidation toward `actualoname()` is hygiene, not fidelity —
  the two differ subtly in BUC edges, so no row.)

## Hallucinations / overclaim

D-log claims 6/6 test (2 pre-existing + 4 new) — verified here
(`node --test` → 6 pass, 0 fail). Per-arm `:line` cites all check
against the read bodies. No dispatch-vs-stub overclaim.

## Density

74-line C function + 29-line staticfn + 11-line helper across 3
modules (~122 JS insertions + 98-line test). One function family.
Right-sized.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff added-lines grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward`.
- Re-measured: `hidden-proxy.mjs verify seffect_destroy_armor
  --base 01b46bc9~1 --reach-all` → `0 session(s) blocked`
  (vacuous-note path, honestly labeled — coverage row, no corpus
  owner) + `smoke 24/24 PASS, 0 regressed → REACH-OK`. Both summary
  lines cited; no REGRESSED session. Matches the D-log's bullet.

## Actionable C-wrongs

None. All three arms plus both helpers match C; kept approximations
are named, not silent.

Verdict: **ACCEPT**
