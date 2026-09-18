# Review 1414 — 4cff7e98 — dog_move missing arms (D-2455)

Metadata: SHA `4cff7e98`, `js/dogmove.js` (+460/−110) + `monmove.js`
(+68: `undesirable_disp`, `should_displace`, 2 one-word exports) +
3 one-word exports (`perceives`, `mon_reflects`, `Is_qstart`) + a
focused `scripts/dogmove-displace.test.mjs` (4/4). Coverage PARTIAL →
live. D-log: D-2455.

## Intent vs deliverable

Promise: port the omitted arms — `dog_hunger`/`dog_starve`,
`should_displace`/ALLOW_MDISP/`undesirable_disp`, `pet_ranged_attk`
body, `score_targ` RNG order + missing arms, gaze/petrify guards,
bhitpos/notonhead, trap `whimper`, `m_digweapon_check`, leash/
guardian gates, j==1 `goto newdogpos`, cnt==0 fall-through,
cursemsg, leashed goodpos kludge. Diff ships all of them. One C file
family, no second subsystem.

## Inventory

- New local (C-staticfn posture, correct): `dog_starve`, `dog_hunger`,
  restarted `score_targ`, full-body `pet_ranged_attk`.
- New LIVE in C-locus module: `undesirable_disp`, `should_displace`
  (`monmove.js`). One-word exports of live bodies only.
- No deleted symbols (MMOVE_NOMOVES import drop is safe — the token
  occurs nowhere in `dogmove.c` dog_move; C falls through to MOVED).

## C ↔ JS fidelity

Sampled every new body against pinned C:
- `dog_starve` (`:347–358`) / `dog_hunger` (`:360–394`): leash-slack
  / starves / Hallu-feel + `mondied`; non-eater push, /3 weaken +
  confuse + beg/feel + `stop_occupation`, DOG_STARVE gate — exact
  (`Math.trunc` = C `/3` on positives; `mhp<1` = DEADMONSTER here).
- `score_targ` (`:737–835`): confuse/`rn2(3)`/`Is_qstart` gate first,
  align/faith, −5000 quest-friendly + angelic arms, adjacency (hero
  sentinel ≡ youmonst mx/my), tame/hero −3000, friends −3000, +10
  hostile, AT_NONE −1000, lichen −25, vampshifter `rn2` mid-stream,
  stronger-foe penalty, beefiest bonus, `rnd(5)` fuzz, confuse tail
  −1000 — RNG draws in C order. Exact.
- `pet_ranged_attk` (`:889–967`): hungry `rn2(5)`, youmonst
  `mattacku`-counts-as-move, bhitpos/notonhead + `mcansee`/`haseyes`
  retaliation with `rn2(4)`, MISS→NOTHING else DONE, forced
  `domonnoise` — exact.
- Melee guards (`:1130–1151`, `:1157–1169`): floating-eye
  (incl. `perceives` + `mon_reflects`) / cube / petrify arms with the
  FIXME double-continue preserved (net-identical), bhitpos/notonhead,
  return-attack with `monnear` — exact. `best_target` is sync, so the
  un-awaited guard call is correct (checked — would be a C-wrong
  otherwise).
- `dog_move` head (`:1005–1042`): non-pet `impossible`, hunger
  pre-empt, `j==2||mon_offmap`, j==1 `goto newdogpos` via
  `invent_ate` flag (tail incl. kludge runs) — exact.
- Displace (`monmove.c :2277–2312`, `:1070–1104`; call sites
  `dogmove.c :1080`, `:1172`): both helpers and both call positions
  match, `rn2(40)` in place.
- newdogpos cursemsg (`:1294–1312`): hero_memory+glyph gate, vobj
  top, `distant_name`, vtense-locomotion, flyer over/onto — exact.
  Leashed kludge (`:1322–1350`, additive dirtocoord) + MMOVE_MOVED
  fall-through — exact.
- `mon_reflects` (async JS clone of sync `muse.c` fn) awaited at all
  new call sites; `Is_qstart` sync export. `--can` posture per D-log
  (ALREADY/SAFE); spot-checked exports live.

## Hallucinations / overclaim

None. The omission list in the subject matches the diff arm-for-arm;
debt items are pre-existing shapes or own-row clones, explicitly named.

## Density

One C function + its staticfn siblings, ~530 insertions across the
family: at the top of the breadth band but a single cluster, same
file family. Acceptable.

## Verification

- `hidden-proxy verify dog_move --base 4cff7e98~1 --reach-all`
  (re-run): 0 blocked both sides (vacuous, as stated); **reach
  325/325 PASS, 0 regressed → REACH-OK** — full-corpus reach on a
  hot function, the strongest signal in this batch. Matches.
- Focused displace test 4/4 committed alongside. Diff grep: no
  FORCE/DIAG/seed/coordinate logic.

## Actionable C-wrongs

None. Every sampled arm matches C in order, RNG, and message text.

Verdict: **ACCEPT**
