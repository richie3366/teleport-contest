# Review 2915 — cb680e202 — nomul stops clearing nomovemsg, clears multireasonbuf

- SHA: `cb680e202` (cliffs-head lesshungry writer:
  invented message clear)
- D-entry: D-4077; Ledger: hack.c (`nomul ported`)
- `js/` diff: `js/hack.js` +10/−9 (restart-in-effect
  on the 17-line body, signature unchanged); new
  `scripts/nomul-nomovemsg-meal.test.mjs`

## Intent vs deliverable

Promise: delete the spurious `game.nomovemsg =
null` (no C counterpart — it ate lesshungry's
"finally finished" across any intervening nomul(0))
and add the C-arm's `multireasonbuf` clear; 3/3
FULL PASS. The diff is exactly that swap plus
per-line C cites. Promise = diff.

## Inventory

- `nomul` (hack.js:1690–1704): guard/botl/
  u-inits/multi/reason+buf/end_running/cmdq, each
  line C-cited. C: hack.c :4160–4173.
- No import changes, no new edges, no new helpers.

No deleted symbols, no re-pointed clones — step-3
paste not triggered.

## C ↔ JS fidelity

Confirmed against pinned C, line-for-line:

- :4163–4164 early return `multi < nval` ✓
- :4165 `disp.botl |= (multi >= 0)` ✓ (JS
  `flags.botl` shape disclosed as pre-existing
  house convention)
- :4166 uinvulnerable=FALSE ✓; :4167 usleep=0 ✓
  (fall_asleep restamp order preserved)
- :4168 multi=nval ✓
- :4169–4170 `if (nval==0) multi_reason=NULL,
  multireasonbuf[0]='\0'` ✓ — JS now null + `''`
  (`multireasonbuf` is a live field: end.js
  :455/:1534–1541 reads/writes it)
- :4171 end_running(TRUE) ✓; :4172
  cmdq_clear(CQ_CANNED) ✓
- The deleted `game.nomovemsg = null` has no
  counterpart in the 14-line C body (verified —
  the word appears nowhere in it). The legitimate
  nomovemsg protocol (unmul :1810–1812) is the
  consumer, untouched.
- Mechanism complete: both sides print
  lesshungry's «hard time» at F−1 (nomovemsg set),
  «finally finished» appears nowhere in any JS
  replay (silent loss), and the F−1 turns carry a
  nomul(0) (dosearch door-find / mattacku melee).
  No-RNG function — value-only fix, no keystream
  risk.

## Hallucinations / overclaim

None. nomul vacuity (0 blocked) stated as
writer-note. The flags.botl-vs-disp.botl shape is
kept and disclosed, not smuggled as C-exact.

## Density

Cliffs-head writer, 3/3 blocked sessions → PASS.
One `Ledger:` entry. Whole function (all 8 C
statements, C order). Full 44/44 in-commit
(hack.js shared). No unreached work.

## Verification

Re-measure (`--base cb680e202~1 --no-reach`):

```text
verify lesshungry: 3 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-extcmd-Ranger-51257062 / scen-sweep-Archeologist-50055004 / scen-sweep-Monk-620073: PASS
verify nomul: no corpus session is blocked (vacuous, disclosed)
```

Exact match. No FORCE/DIAG/seed/coords in the
`js/` hunks. Rule #2 clean (window rulecheck).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
