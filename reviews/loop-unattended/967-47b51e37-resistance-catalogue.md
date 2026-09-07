# Review 967 — 47b51e37 — resistance catalogue + misc tail (D-1997)

Metadata: SHA `47b51e37`, D-1997, Open-row port (`insight.c`
enlightenment family, page-order portion). js/ touches 2 files,
+311/−14 (`js/invent.js` +310/−17 incl. both builders,
`js/attrib.js` +15). `c-js-map/startup.md` updated for the named
omits. No stamp owed (corpus-queued row, per D-log).

## Intent vs deliverable

Subject promises: port the unported `attributes_enlightenment` arms
after Antimagic/Sleep/Poison (Fire→uedibility catalogue) plus the
Luck→death tail (moreluck/luckstone/ugangr), fixing two recorded
first-diffs (Valkyrie-92176 Cold arm, Priest-92056 god-anger arm).
Diff actually adds: six `hero_*_resistance` predicates, `AD_COLD/
AD_DISN/AD_ACID` constants + extended local `adtyp_to_prop`,
`enl_temp_resist`, `o`-wrapper param on
`item_resistance_message_lines`, the full resistance block in both
builders, moreluck/luckstone/ugangr tail in both builders, six
`PROP_HFIELD` rows + const imports. Promise == diff; no unrelated
subsystem.

## Inventory

- New JS functions (all `js/invent.js`, all local/non-exported):
  `hero_Cold/Disint/Acid/Drain/Sick/Stone_resistance`,
  `enl_temp_resist`; extended: `adtyp_to_prop`, `item_resistance_message_lines`.
- Changed call sites: `enlightenment()` final builder + `^X` overlay
  builder (resistance block + tail each); `js/attrib.js` `PROP_HFIELD`.
- Deleted/re-pointed symbols: none (pure additions + one signature
  default `o = (t) => t`, backwards-compatible).

## C ↔ JS fidelity

C loci (ranges from `csym.mjs`/pinned reads): `attributes_enlightenment`
`insight.c:1486–2005` (resistance run `Fire/item-fire :1525–1527`,
`Cold/item-cold`, `Sleep`, `Disint/item-disn`, `Shock/item-elec`,
`Poison`, `Acid+temp/item-acid :1542–1548`, `Drain`, `Sick`, `Stone+temp`,
`Halluc`, `uedibility :1562–1563`); tail `moreluck :1919–1922`,
`luckstone :1923–1929`, `ugangr :1931–1936`; `temp_resist`
`eat.c:450–469`; `adtyp_to_prop` `zap.c:5653–5671`.

- Branch order: both builders emit Invulnerable, Antimagic,
  Fire/item-fire, Cold/item-cold, Sleep, Disint/item-disn,
  Shock/item-elec, Poison, Acid(+temp)/item-acid, Drain, Sick,
  Stone(+temp), Halluc, uedibility — exact C order, each arm with a
  `:line` citation. Sleep/Shock/Poison/Halluc pre-existed and stay in
  place. No RNG in this envelope (pure disclosure text) — nothing to
  walk call-for-call.
- `adtyp_to_prop` clone matches C case-for-case (COLD→COLD_RES,
  FIRE→FIRE_RES, ELEC→SHOCK_RES, ACID→ACID_RES, DISN→DISINT_RES,
  default 0); `AD_FIRE=2/AD_COLD=3/AD_DISN=5/AD_ELEC=6/AD_ACID=8`
  match `monattk.h`. Verified CLONE.
- `enl_temp_resist` matches C `temp_resist` predicate-for-predicate
  (timeout-only intrinsic, `~TIMEOUT` clear, no extrinsic, no blocked).
  Verified CLONE.
- `hero_*` six predicates follow the file's existing
  flat-`H`/`E`+`uprops` idiom (same shape as live `hero_Fire/Shock`
  siblings). CLONEs of the `youprop.h` H||E macros, matched here.
- Tenses: final builder uses `you_are/you_have` closures
  (`final ? were/had : are/have`), luckstone `final ? 'did' : 'does'`
  (C `enl_msg(…,"does","did",…)`), ugangr `final ? ' was' : ' is'`
  (C `enl_msg(u_gname()," is"," was",…)`); overlay builder fixes
  present tense (`'does'`, `' is'`). Thresholds `>6 extremely / >3
  very / wizard count` match C in both builders.
- `u_gname(game.urole, atype)` follows the established JS binding
  (same call shape at invent.js:5122/5731, pray.js); C takes no args
  but the adaptation pre-exists and is used consistently.
- Callee closure: `from_what`/`stone_luck` LIVE (same-edge
  `./attrib.js` static import, no new edge); `carrying` LIVE via
  `await import('./hack.js')` (file's 6th such lazy import;
  `carrying` hoisted per `sym.mjs`, `--can` IN-SCC but dynamic =
  no TDZ read); `u_gname` LIVE (`roles.js:835` sync). Sick
  `|| defended(AD_DISE)` named OMIT with predicate comment (no
  `defended` export in `js/`). Every shipped arm's callees are
  LIVE, OMIT, or verified CLONE — may ship.

Required `sym.mjs` outputs (no delete/re-point in this diff, so
informational): `stone_luck js/attrib.js:642 sync`;
`carrying js/hack.js:2513 sync (+3 unrelated local clones untouched)`;
`u_gname js/roles.js:835 sync`; `adtyp_to_prop`/`enl_temp_resist`/
`hero_Cold_resistance` local-only singletons added here (no clone #2).

## Hallucinations / overclaim

None. "Exact C order in BOTH builders" verified true line-by-line;
"no new module edge" true (attrib same-edge; hack dynamic-only).
D-log marks the `enlightenment` NO MOVEMENT and
`status_enlightenment` vacuous rows as NOT claimed — honest.

## Density

~325 insertions, one C locus family + its tail, two already-coupled
builders. Right-sized per §2b (one switch envelope, related deferrals
retired together). Under the 600 cap.

## Verification

Re-measured myself: `hidden-proxy verify one_characteristic --base
47b51e37~1` → `2 PASS, 3 moved past (3 still one_characteristic at a
later step), 0 unchanged, 0 worse → PROGRESS` (Valkyrie-92176 +
Priest-92056 PASS — the two D-log sessions; the 3 movers advanced 22–44
steps past the Cold/ugangr arms to later `one_characteristic` steps, no
regression). Matches the D-log PROGRESS claim. Grep of the js hunk: no
`FORCE`/`DIAG`/`getRngLog`/seed/coordinate/`fastforward` tokens
(only the commit message mentions gates to deny them). Rule #2 clean
(re-ran `imports.mjs --rulecheck` this iteration).

## Actionable C-wrongs

None. Residuals are all named omits in the map section (Sick
`defended` form arm, vision/appearance/transport/physical/shape
leftovers, `final<2` arms), not Must-fix.

Verdict: **ACCEPT**
