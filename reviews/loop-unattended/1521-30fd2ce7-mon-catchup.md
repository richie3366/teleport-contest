# Review 1521 — 30fd2ce7 — dog.c mon_catchup_elapsed_time (D-2562)

## Metadata

- SHA: `30fd2ce7`
- D-id: D-2562. Next index: 1521.
- Files: `js/dog.js` (+84/−~30: restarted
  `mon_catchup_elapsed_time`,
  `carnivorous`/`herbivorous`/`healmon` import
  joins), `js/do.js` / `js/dog.js` /
  `js/wizard.js` (one-word `await` each at the
  three call sites).
- C locus: `nethack-c/upstream/src/dog.c:626–724`
  (99 L; `csym.mjs` range). Callers: `dog.c:495`,
  `restore.c:1213`, `wizard.c:738`.

## Intent vs deliverable

Subject promises: the whole 95-line body in C
order with all 3 C callers awaiting. Diff
delivers exactly that, replacing three
previously-thin arms with C-exact logic
(`finish_meating` was `meating = 0`, the
tameness chain had extra `wilder > 0` guards,
heal was an inline clamp). Promise matches
deliverable. RNG (`rn2(imv+1)` ×3,
`rn2(wilder)`) in C positions.

## Inventory

- Restarted: `mon_catchup_elapsed_time(mtmp,
  nmv)` (now exported async — for awaited
  `impossible`/`m_unleash`).
- Callees, all LIVE: `finish_meating`
  (dogmove.js), `m_unleash` (apply.js),
  `healmon` (`mon.js:2289`, `(mtmp, amt,
  overheal)` — call-compatible),
  `carnivorous`/`herbivorous` (monsters.js),
  `impossible`, `regenerates`, `EDOG`
  (`dog.js:619` idiom).
- No deleted symbols → no clone→import audit
  (the three import joins add no second
  definition — verified no local
  `healmon`/`carnivorous`/`herbivorous` in
  dog.js; syntax PASS confirms).

## C ↔ JS fidelity

Body vs C `:626–724`, in order:

- `:632–640` devel guards: `nmv < 0` → loud
  throw (`panic` unported own-row, lev_json.js
  precedent), `nmv == 0` → awaited
  `impossible`, then falls through to the
  `LARGEST_INT` paranoia like C ✓ (all three C
  callers guard positive, so the arms are
  unreachable — correctly shaped, not dropped).
- `:645–659` blind/frozen/fleet → 1-or-decrement
  ✓; `:662–667` trapped/conf/stun
  `rn2(imv+1)` vs 20/25/5 (`40/2` etc. evaluate
  identically) ✓.
- `:670–675` `imv > meating → finish_meating`
  (was the `= 0` shortcut) ✓; `:676–679`
  mspec ✓.
- `:682–690` tameness chain now C-exact —
  `wilder = (imv+75)/150` trunc, three arms in
  order, chained `mtame = mpeaceful = 0` ✓.
  (`rn2(0)` unreachable: first arm catches
  `wilder == 0` since `mtame ≥ 1`.)
- `:694–702` hungry-wild: tame + non-minion +
  carni/herbi, `moves > hungrytime+500 &&
  mhp<3 || moves > hungrytime+750` ✓
  (`?.` guard only fires where C would deref
  a missing edog — impossible for tames).
- `:704–709` leash impossible + `m_unleash(mtmp,
  false)` ✓; `:712–714` non-regen `imv/20`
  trunc (`Math.trunc` ≡ C int `/=`) then live
  `healmon` ✓; `:715–723` tail ≡
  `set_mon_lastmove` (`dog.c:287`, one-line
  `mlstmv = moves` — inline is exact) ✓.
- Callers: all three await in the same commit
  (previously un-awaited sync calls — the
  async conversion is complete, no fire-and-
  forget left) ✓.

## Hallucinations / overclaim

None. "Every arm and callee live" holds; the
`panic` loud-throw is disclosed with its
precedent and end.js row.

## Density

One 99-line C function + 3 one-word caller
fixes, three files, ~90 insertions.
Right-sized per §2b.

## Verification

- D-log: `verify.mjs --fn
  mon_catchup_elapsed_time` → PASS, honestly
  framed as off-level path / 0-blocked.
- Re-run here: `hidden-proxy.mjs verify
  mon_catchup_elapsed_time --base 30fd2ce7~1
  --reach-all` → 0 blocked both trees
  (vacuous, honestly reported) + smoke 24
  PASS, 0 regressed → REACH-OK. Matches.
- `imports.mjs --rulecheck`: clean (re-run this
  iteration). Diff grep: 0 hits for FORCE/DIAG/
  getRngLog/fastforward.

## Actionable C-wrongs

None. Branch order, RNG positions, caller
conversion, and the import-only wiring all
check out against pinned C.

Verdict: **ACCEPT**
