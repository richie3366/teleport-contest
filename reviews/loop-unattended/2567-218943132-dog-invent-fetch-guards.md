# Review 2567 — 218943132 — dog_invent fetch guards (D-3697)

## Metadata

- SHA: `21894313246bcea6bd9d84e8d9ee9e39679327c2` (2026-10-08, D-3697)
- Scope: ≤10-function cliff-family commit — whole Method on `dog_invent`
- Diff: `js/dogmove.js` +15/−2, new `scripts/doginvent-fetch-guards.test.mjs` (154 lines), ledger `dog_invent` partial → ported
- Prior precedent: review 2566 (D-3695, same family, honest NO MOVEMENT) ACCEPT

## Intent vs deliverable

Subject promises: wire dog_invent's two fetch-gate arms — MAIL_STRUCTURES
mail skip (`:429–431`) + mines/soko prize exclusion (`:432–434`), D-2417
named omits — in C order after the nofetch check; `dog_invent` partial →
ported; parked probe byte-identical. The diff delivers exactly that: two
early-return guards, one import-line widening, one file-local const, one
envelope-comment update, plus a 4-case focused test. No other `js/` touched.
Promise matches deliverable; nothing bundled, nothing missing.

## Inventory

- `dog_invent` (`js/dogmove.js:994–1076`, guards at :1017–1025): two new arms.
  No new JS function, no helper added.
- `SCR_MAIL` (`js/dogmove.js:141`): file-local `objectNames.indexOf` const.
- Imports widened on the pre-existing `mkobj.js` edge: `is_mines_prize`,
  `is_soko_prize` (both LIVE sync exports, `js/mkobj.js:4112/4118`).
- `sym.mjs` output (nothing deleted or re-pointed, so this is the callee check):
  `is_mines_prize js/mkobj.js:4112 sync`, `is_soko_prize js/mkobj.js:4118 sync`
  — single definitions, no clones.
- `imports.mjs --can js/dogmove.js js/mkobj.js is_mines_prize` → ALREADY
  (subject's claim confirmed; no new edge, no cycle question).

## C ↔ JS fidelity

C locus (`csym.mjs dog_invent`): `nethack-c/upstream/src/dogmove.c:399–478`.
Fetch gate verified line-by-line: `:427` obj non-null, `:428` nofetch,
`:429–431` `#ifdef MAIL_STRUCTURES / && obj->otyp != SCR_MAIL / #endif`,
`:432–434` prize comment + `&& !(is_mines_prize(obj) || is_soko_prize(obj))`.

- Order: JS places mail then prizes after the nofetch check, before
  `dogfood` — exactly C's `&&` short-circuit order. Branch-by-branch confirm.
- Mail arm: `MAIL_STRUCTURES` is unconditional (`global.h:430`, confirmed),
  so the `#ifdef` is live. JS `(obj.otyp | 0) === SCR_MAIL → return 0` is the
  guard's contrapositive, correct. House pattern confirmed
  (`mail.js:49`, `eat.js:172` carry the same file-local const).
- Prize arm: C macros are `o_id == achieveo.{mines,soko}_prize_oid`
  (`obj.h:435–436`, confirmed). JS predicates compare `(o.o_id|0)` against
  `game.context?.achieveo?.{mines,soko}_prize_oid|0` — identical semantics
  including the degenerate oid-0 case. LIVE, faithful, no stub.
- RNG call-for-call: neither new arm draws RNG. Rest of body unchanged:
  drop arm `rn2(udist+1) || rn2(apport)` then `rn2(10) < apport` (`:101–102`
  match C `:418–419`); pickup arm `rn2(20) < apport+3`, `rn2(udist) ||
  !rn2(apport)` (`:1037–1038` match C `:447–448`). No keystream shift possible
  from the guards themselves; behavior changes only where C also skips
  (mail/prize underfoot previously mis-fetched).
- Whole-body check for the `ported` flip (C `:399–478` vs JS `:994–1076`):
  entry gate, omx/omy, droppables arm, nofetch (`:138` = BALL/CHAIN/ROCK,
  confirmed), edible/`dog_eat` + `could_reach_item`, carryamt/cursed/reach,
  splitobj, cansee → `distant_name` + verbose pline, extract/newsym/mpickobj,
  AT_WEAP tail (`AT_WEAP = 254`, `monattk.h:28`, confirmed), unconditional
  `check_gear_next_turn`, terminal `return 0` — all present in C order.
- Entry-gate substitution audited, not assumed: C `helpless(mtmp)` =
  `msleeping || !mcanmove` (`monst.h:251`) vs JS `msleeping || mfrozen`.
  C `movemon` returns before `m_move` on `!mcanmove` (`monmove.c:717`), so the
  `!mcanmove` disjunct is unreachable at `dog_invent`; frozen implies
  `mcanmove = 0` (`monmove.c:416`), so JS's `mfrozen` disjunct is likewise
  unreachable-but-harmless. Equivalent in practice; pre-existing D-2417, stands.
- Caller: single C caller `dogmove.c:1032` ← `dog_move`; JS calls
  `dog_invent` at `js/dogmove.js:1359`. Wired.

## Hallucinations / overclaim

None. No "Match C" dispatch-over-stub: both new callees are live and
verified against their C macros. The D-log's "no corpus session blocked on
dog_invent" is the tool's own `note hidden` line, quoted with its
reach line as the tool instructs — not a vacuous PASS claim. The parked-probe
NO MOVEMENT is reported as NO MOVEMENT, with the D-3694/D-3696 reason
restated, not dressed as movement.

## Density

Cliff-phase shape, D-3695 precedent: the cliffs head (`mon_wield_item`,
Priest-94382 step 99) is parked RECORDER-ARTIFACT with six measures showing
no game writer exists; owner whole (D-2460), 10/10 callers wired (D-3695).
This commit ports the head's caller family's last genuine gap (D-2417 named
omits) — not a re-port of the parked symptom owner, not another C file's
work (`js/dogmove.js` only + its test), not a no-op (focused red→green +
`partial → ported`). Each function has its `Ledger:` entry
(`**Ledger:** dog_invent ported`). The `ported` flip is earned: the
whole-body walk above finds every C arm live. Nit (not a C-wrong, not
Must-fix): the ledger note still reads "D-2417 arms stand" though this
commit wires the last two — next port iter folds one `ledger.mjs set` note
refresh into real work.

## Verification

- Focused test: I ran `node --test scripts/doginvent-fetch-guards.test.mjs`
  → 4/4 pass (control picks up, mail + both prizes stay). Design is sound:
  seeded RNG, apport 18, `after=true` at udist 2 so `dog_goal` −2 returns
  before the movement body — the test observes only the invent step.
- Re-measure (`verify dog_invent --base 218943132~1 --reach-all`):
  `verify dog_invent: … 0 session(s) blocked on it` (matches the D-log) and
  `reach dog_invent: 312 baseline-PASS session(s) reach it (312 run):
  312 PASS, 0 regressed → REACH-OK` — full reach, stronger than the D-log's
  80-run spread. Zero regressions.
- Parked probe (`verify mon_wield_item`): `1 unchanged` at step 99, same
  owner, `0 worse → NO MOVEMENT`; smoke 24 PASS → REACH-OK. D-log honest.
- Hygiene: diff greps clean (no FORCE/DIAG/getRngLog/fastforward/seeds/coords);
  `imports.mjs --rulecheck` → Rule #2 clean across scored `js/`.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
