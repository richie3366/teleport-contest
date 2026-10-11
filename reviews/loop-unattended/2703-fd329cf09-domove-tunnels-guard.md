# Review 2703 — fd329cf09 — domove tunnels-chain guard (D-3840 Must-fix)

Metadata: SHA `fd329cf09`, D-3840, Must-fix from review 2702
(QUALITY-RISK on D-3839 @53add89a1; ships alone). JS:
`js/cmd.js` (+8/−0: guard + const + comment). Test:
`scripts/autodig-domove-pick.test.mjs` (+2 `it`).

## Intent vs deliverable

Promise: guard domove's autodig arm with the tunnels-match
exclusion so a tunnels&&!needspick polyform that chewed
through rock (still_chewing FALSE) falls past to the live
bump re-read like C's test_move :1037–1048 else-chain, instead
of firing use_pick_axe2 on the stale destTyp; latent C-wrong,
no corpus session reaches it. Diff actually does: `const
chewDat = game.youmonst?.data` + `&& !(chewDat &&
tunnels(chewDat) && !needspick(chewDat))` on the autodig `if`.
Match — the fix review 2702 prescribed, verbatim in effect.

## Inventory

- `domove` (js/cmd.js:6800–6811) — guard added. C:
  `nethack-c/upstream/src/hack.c:1037–1048` (read): `:1037
  else if (tunnels && !needspick)` { `:1040 if (DO_MOVE &&
  still_chewing) return FALSE` }, `:1042 else if
  (autodig && !run && !nopick && uwep && is_pick)` {
  use_pick_axe2; return FALSE }, then flow continues to
  `:1253 return TRUE`. JS gate matches term-for-term.
- `tunnels` (js/monsters.js:590, sync), `needspick`
  (js/monsters.js:593, sync) — LIVE canonical exports,
  already imported (js/cmd.js:63); no new edge, no re-point.

## C ↔ JS fidelity

Branch-by-branch confirm. C's chain is else-if: tunnels-match
+ chew-through (still_chewing FALSE) skips :1042 entirely and
returns TRUE (:1253, "OK, it is a legal place to move"). JS
now evaluates the same predicate on the same datum
(`game.youmonst?.data` ≡ the tunnels block's `ydat` at
cmd.js:6775 — a duplicated const, not a divergence) and falls
past both arms to the live re-read, so the move proceeds with
no dig occupation. No RNG, no prints in the change. The
focused test pins both sides: chew-through → "chew a hole in
the wall.", no "You start digging.", hero (3,17)→(2,17);
control (fresh chew) → "start chewing", hero held. The
pre-fix stash check (exactly the chew-through `it` fails) is
a true falsifier. Ledger slip (not a C-wrong): the commit's
`hack.c.jsonl` edit dropped the real `js/hack.js:test_move`
whole-port site (js/hack.js:457, read — :991–1255 in C order)
from the test_move row; restored with one `ledger.mjs set` in
this audit iteration. (D-3430's absence is by-design D_KEEP=6
trimming, not a drop — adding D-3840 evicted it.)

## Hallucinations / overclaim

None. "Latent, no corpus session reaches it (review-measured)"
repeats review 2702's measurement honestly; the D-log Verify
bullet reports the vacuous hidden line as vacuous and leans on
the focused falsifier + forced full 44/44 instead.

## Density

Cliff-phase: Must-fix, ships alone — correct slot use. One
guard, Ledger `test_move partial` kept, Verify bullet with
falsifier + REACH + green + strict + cohort + full. Reached:
none by design (latent); the Must-fix row cited no blocks, so
there is no session-reaching work to name.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify test_move --base fd329cf09~1` →
`0 session(s) blocked on it (0 at baseline, 0 in the working
scoreboard)` + `no RNG-tagged reach; fixed smoke spread (24
run): 24 PASS, 0 regressed → REACH-OK`. Zero regressed; the
"no session blocked" claim is true, not vacuous-cover.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
