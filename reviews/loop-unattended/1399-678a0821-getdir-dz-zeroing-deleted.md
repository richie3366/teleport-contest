# Review 1399 — 678a0821 — lock.js getdir caller dz-zeroing deleted (D-2440)

- Commit: `678a0821` — "`lock.js` getdir caller dz-zeroing deleted (up/down restored) (D-2440)."
- Files: `js/lock.js` only (+4/−4: comment + deleted block); docs + map + queue pop.
- D-log: D-2440. Closes review 1393 item 1 (Must-fix, stamped **Addressed:** D-2440 `678a0821` in this commit).
- Prior review: `1393-1d21e3be-getdir-whole-body.md` (QUALITY-RISK).

## Intent vs deliverable

Subject promises the one-block delete review 1393 prescribed: remove
`if (!applied) { u.dz = 0; }` so `</>` keep dz=±1 and return true.
Diff delivers exactly that plus a 3-line comment citing `movecmd`
semantics and D-1387. Promise kept, nothing else touched.

## Inventory

Changed JS: `getdir` (`js/lock.js:605–705`) — block delete only.
No new function, no new import, no symbol deleted or re-pointed;
required `sym.mjs` delete/re-point check vacuous. `apply_dirsym`,
compass/self/mouse/quit/help/confdir arms byte-identical.

## C ↔ JS fidelity

C locus via csym: `movecmd cmd.c:3868–3898` (31 lines), `getdir
cmd.c:3956–4119` (164 lines). Branch-by-branch confirm:

- C `movecmd` success arm sets `u.dx/u.dy/u.dz` from xdir/ydir/zdir
  and `return !u.dz` — up/down (`zdir[8/9]=∓1`) return 0 while
  **keeping** dz. Failure arm zeroes only dz, returns 0.
- JS `apply_dirsym` (`js/lock.js:129–164`) mirrors it arm-for-arm:
  code=0 → dz=0/false; `d` in 0..9 writes dx/dy/dz, returns `!dz`;
  numpad arm; fallthrough dz=0/false. Verified by reading the body.
- Caller now: `is_mov = applied && !dz`; up/down skip the
  `!is_mov && !dz` invalid arm, skip `dxdy_moveok`, reach the tail
  `if (!dz) confdir(false); return true` — matches C
  (`!is_mov && !u.dz` gate, then tail return 1). The D-1387 property
  holds: every true-failure exit already zeroed dz inside
  `apply_dirsym`, so the deleted caller block was pure C-wrong.
- Review 1393 item 2 (num_pad `'5'` self disjunct, no C counterpart)
  is carried as named debt in the D-log, not fixed here — acceptable:
  session-unreachable, next `cmd.c`/`lock.js` iter owns it.

Banned-pattern grep on the `js/` hunk (`FORCE|DIAG|getRngLog|
fastforward|seed|gx ===`): zero hits.

## Hallucinations / overclaim

None. "Compass/self/mouse/quit/help/confdir arms untouched" is true
(hunk touches only the movecmd-call block). The Verify bullet's
`score --ids → all 3 PASS` claim re-checked below — confirmed.

## Density

One Must-fix item, alone, one 4-line block. Breadth-phase Must-fix
rule satisfied (no second file, no second row).

## Verification

D-log: `verify.mjs --fn getdir` → PASS (syntax · rule2 · hidden note
· smoke 24/24 · green · strict · cohort). My re-run on this SHA:

- `hidden-proxy.mjs verify getdir --base 678a0821~1 --reach-all` →
  "0 session(s) blocked on it (0 at baseline, 0 in the working
  scoreboard)" + "smoke getdir: no RNG-tagged reach; fixed smoke
  spread (24 run): 24 PASS, 0 regressed → REACH-OK". Vacuous on
  corpus blocks (as the D-log honestly notes — the 3 flips are owned
  by exercise/distfleeck/could_untrap), REACH-OK on smoke.
- `.cache/hidden/scores.json` at HEAD: `scen-death-Wizard-92187`,
  `scen-kit-Archeologist-92190`, `scen-normal-Archeologist-92012`
  all `passed=True`, owner/step null; corpus aggregate back to
  **495/540 (91.7%)**. The 1d21e3be regression is closed, no new
  flip (no other row names this SHA as owner).
- Global `imports.mjs --rulecheck`: Rule #2 clean.

## Actionable C-wrongs

None. The shipped C-wrong (dz zeroing) is the fix itself; the one
remaining nit (num_pad `'5'`) is named debt for the next
`cmd.c`/`lock.js` iter, session-unreachable.

Verdict: **ACCEPT**
