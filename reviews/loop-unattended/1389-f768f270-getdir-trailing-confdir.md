# Review 1389 — f768f270 — getdir trailing confdir centralized (D-2430)

- SHA: `f768f270`, D-2430 (Open row: Samurai-92239 step 96 RNG fork;
  writer = step-95 `getdir` tail draw JS never made). JS files:
  `js/lock.js` (tail in `getdir` at both exits), `js/zap.js`
  (`getdir_zap` → pass-through), `js/apply.js` + `js/dig.js`
  (comments only + kept true self-calls). Test:
  `scripts/getdir-confdir.test.mjs` (3 its).
- Prior reviews closed: none (writer row from D-2420 measure).

## Intent vs deliverable

Subject promises: tail `if (!u.dz) confdir(FALSE)` in C order at
both `getdir` exits; remove the now-double `getdir_zap`/`doclose`
compensations; keep the true C self-calls (`use_whip`,
pick-axe); stethoscope `:379` stays named-deferred. Diff delivers
all of it. Promise == diff.

## Inventory

| JS symbol | Kind | Status |
|---|---|---|
| `getdir` self exit (`js/lock.js:557`) | changed branch | LIVE — C `cmd.c:4023–4025` + tail `:4115–4116` |
| `getdir` normal exit (`js/lock.js:600`) | changed branch | LIVE — C `:4115–4116` verbatim |
| `getdir_zap` (`js/zap.js`) | compensation removed | LIVE — C `zap.c` has no `confdir` (grep confirms) |
| `doclose` tail (`js/lock.js`) | compensation removed | LIVE — C `lock.c` has no `confdir` (grep confirms) |
| `use_whip` / `use_pick_axe2` self-calls | kept | LIVE — C `apply.c:2980` / `dig.c:1193` |
| stethoscope `:379` self-call | not ported | OMIT — pre-existing deferral, comment updated to note the getdir half is now live |
| `confdir` (`js/hack.js:1902`, sync) | C callee | LIVE — canonical export; `lock.js` already imported it (no new edge); `zap.js` import removal is safe (only comments reference it post-commit) |

No local-clone re-points; nothing for `sym.mjs` beyond the
canonical listing above.

## C ↔ JS fidelity

C tail is a single exit sequence (`cmd.c:4115–4116`, read
directly): `if (!u.dz) confdir(FALSE); return 1;` — reached by
every success path including SELF (which zeroes dx/dy/dz at
`:4023–4025`, so the tail fires). JS mirrors both: self arm sets
`u.dx = u.dy = u.dz = 0` then the tail call, normal exit the tail
call. C's `return 0` exits (bad key, `!dxdy_moveok`) skip the
tail; JS returns false there without it. Confirmed exit-by-exit.

Draw-count parity per caller (the dangerous half of a
centralization):

- zap: C tail 1 + C self-calls 0 = 1; JS now 1 (was 2 — the
  compensation double-drew on every confused zap). Fix correct.
- close: C tail 1 + 0 = 1; JS now 1 (was 2). Fix correct.
- whip: C tail 1 + `:2980` else-branch self-call 1 = 2; JS keeps
  both (getdir tail + `apply.js:3145` in the non-swallow else,
  matching C's `else { confdir… }`). Correct.
- pick-axe: C tail 1 + `dig.c:1193` `u.dz == 0` self-call 1 = 2;
  JS keeps both (`dig.js:2513` in the `dz===0` branch). Correct.
- stethoscope: C tail 1 + `:379` 1 = 2; JS draws 1 — the `:379`
  half stays explicitly named-deferred (comment cites it with the
  D-number). Documented debt, not a silent half.

## Hallucinations / overclaim

None. The D-log's "C zap.c has no self-call" / "C lock.c has
none" are grep-verifiable facts (verified above), and the kept
self-calls cite exact C lines whose branch context I confirmed.

## Density

~15 net JS lines + 3 test its for a 7-session owner's writer arm
with four-caller draw-parity analysis — dense and right-sized.

## Verification

D-log claims `verify distfleeck` → 1 PASS + 1 moved past
(Samurai-92239 PASS; Rogue-92030 → `mksobj_init`@82) + green +
cohort + manual full 44/44 (script skipped full: no
script-defined shared file — stated honestly). Re-measured
myself at the parent baseline:

`verify distfleeck --base f768f270~1` → `1 PASS, 2 moved past, 4
unchanged, 0 worse → PROGRESS` — Samurai-92239 PASS and
Rogue-92030 → `mksobj_init`@82 both reproduce exactly; the extra
mover (Tourist-92061 → `doread`@17) reflects later-tree progress
(D-2431), strictly better, no contradiction and no WORSE. Claim
holds. New test at HEAD: `node --test
scripts/getdir-confdir.test.mjs` → 3 pass / 0 fail (re-ran
myself). Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed
gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
