# Review 972 — 4a48e698 — pick_lock occupied-square arms (D-2002)

Metadata: SHA `4a48e698`, D-2002, Open-row port (`lock.c` pick_lock /
`apply.c` use_pick_axe on an occupied square; row cited 5/553, 6
blocked at baseline). js/ touches 1 file (`js/lock.js`, +59/−1).
`c-js-map/turns.md` updated. No stamp owed (row cites no review).

## Intent vs deliverable

Subject promises: pit gate, visible-monster arm (incl. credit-card
shk/Oracle), door-mimic reveal, !IS_DOOR feel/mapseen + Blind
feel/see + drawbridge message, in exact C order — fixing `I don't
think the kitten would appreciate that.` vs `You see no door
there.` Diff actually adds: exactly those four arms + import
extensions + local `Blind()` + `PM_ORACLE` const. Promise == diff;
`use_pick_axe` digging path (`dig.js`) correctly untouched (owner on
all six sessions is `pick_lock:567`).

## Inventory

- Changed JS function: `pick_lock` direction arm only (container/box
  path and doormask switch untouched).
- New helpers: local `Blind()`, `PM_ORACLE` const. No deleted
  symbols (one pline line replaced) — no `sym.mjs` delete audit
  required; resolutions below informational.
- No STUB added; one named OMIT (`maybe_absorb_item`).

## C ↔ JS fidelity

C locus: `lock.c:547–590` (read verbatim). Arm-by-arm:

- Pit (`:547–550`): `u.utrap && u.utraptype == TT_PIT` →
  `You_cant("reach over the edge of the pit.")` + DID_NOTHING
  (with the `#open`-parity comment). JS identical incl. return. ✓
- Monster (`:552–570`): `m_at && canseemon && !=M_AP_FURNITURE &&
  !=M_AP_OBJECT` → credit-card shk/Oracle `SetVoice(mtmp,0,80,0)` +
  `verbalize` else `pline("I don't think %s would appreciate
  that.", mon_nam)` + LEARNED. JS identical incl. arg order and
  `mtmp.data?.mndx === PM_ORACLE` (C `mtmp->data ==
  &mons[PM_ORACLE]`). ✓ No RNG. ✓
- Mimic (`:571–575`): `is_door_mappear` (`monst.h:240`) →
  `stumble_onto_mimic` + `maybe_absorb_item(mtmp, pick, 50, 10)` +
  LEARNED. JS inlines the macro (FURNITURE + S_hcdoor/S_vcdoor),
  awaits the async callee, and NAMES the absorb omit with its
  50%/10% cite. Note: C's absorb draws RNG when a door-mimic is
  picked — skipping it shifts draws on that sub-path; properly a
  named map omit (corpus never hits it: all six owners are `:567`),
  not silent. ✓
- !IS_DOOR (`:576–590`): `update_mapseen_for` + `feel_location` +
  Blind feel/see + drawbridge `>= 0` message. JS mirrors all four;
  `is_drawbridge_wall` returns int-or-`-1` on both sides (C
  `dbridge.c:136–137`, JS `dbridge.js:132`), so `>= 0` is exact, not
  a boolean trap. ✓
- Callee closure: `mon_nam`/`SetVoice`/`stumble_onto_mimic`/
  `update_mapseen_for`/`is_drawbridge_wall` — all `--can` ALREADY
  (no new edges; D-log's "SAFE" understates it); `verbalize`
  async-awaited, `mon_nam`/`SetVoice`/`feel_location` sync-correct;
  `PM_ORACLE` indexOf idiom matches hack/sounds/uhitm.js.
  `Blind()` is byte-identical to the 29-file idiom (apply.js:951)
  and matches `youprop.h:103` — verified CLONE (a 30th copy of a
  smelly convention, but consistent; consolidating all 30 is not
  this SHA's job). Every shipped arm's callees: LIVE, OMIT, or
  verified CLONE. ✓

## Hallucinations / overclaim

None. "Final verify ran after the last edit" corroborated by my
independent re-run producing identical numbers.

## Density

59 insertions, one C arm family in one function. Right-sized; the
pre-existing doormask switch below was correctly left alone.

## Verification

Re-measured myself: `hidden-proxy verify pick_lock --base
4a48e698~1` → `1 PASS, 5 moved past, 0 unchanged, 0 worse →
PROGRESS`, same 6 sessions → same later owners/steps as the D-log
(92225 use_container@22, 91126 dowield@8, 92102
start_corpse_timeout@39, 92174 do_play_instrument@106, 92039 PASS,
92019 doread@149). Claim holds exactly; plus cited `PASS full
44/44`. Grep of the js hunk: no `FORCE`/`DIAG`/`getRngLog`/seed/
coordinate/`fastforward`. Rule #2 clean (`imports.mjs --rulecheck`
re-ran this iteration).

## Actionable C-wrongs

None in this delta. One pre-existing observation (NOT Must-fix:
line untouched by this SHA, cite-commented, map-named): the !IS_DOOR
`return PICKLOCK_LEARNED_SOMETHING` predates D-2002 (confirmed at
`4a48e698~1:js/lock.js:1004–1007`), while C's DID_NOTHING half is
likelier livelier than the D-log suggests only if `feel_location`
writes glyph/lastseentyp — measurable falsifier: C-side probe of
`door->glyph != oldglyph` on a blind feel at a seen square; if it
never fires, C is DID_NOTHING-always here and the sticky LEARNED
burns a turn (`apply.js:2423` `!= 0 → ECMD_TIME`) — a future Open
row, not this review's debt.

Verdict: **ACCEPT**
