# Review 2718 — c7e7d049e — poisoned i==0 wail drain (D-3857)

Metadata: SHA `c7e7d049e`, D-3857, cliffs-head `botl.c`
do_statusline1 writer (i==0 arm never drained the deferred
losehp wail). JS: `js/attrib.js` (+8: drain + gameover
return). Test: `scripts/poisoned-wail-drain.test.mjs` (new,
recipe-prefix, pins C s1075 Co:11 pause + s1076 howling/sick
+ s1077 weaker).

## Intent vs deliverable

Promise: Knight-578219@1075 — C's losehp runs maybe_wail
inline (Knight → CwnAnnwn howling overflows the topline, C
pauses pre-drain at Co:11) while JS losehp only sets
_needs_maybe_wail and poisoned's i==0 arm never drained it
(the i>5 arm does), so JS paused one message late at Co:10;
drain finish_maybe_wail() in C order after losehp +
gameover return for rehumanize-newly-dies; session FULL
PASS. Diff actually does that. Match.

## Inventory

- poisoned i==0 survived arm (attrib.js:501): after
  losehp(loss,…): `await finish_maybe_wail()` + `if
  (gameover) return`, before adjattrib. C: attrib.c `:376–
  382` (read): setuhpmax → adjuhploss → losehp `:378` (full
  tail inline) → adjattrib/poisontell `:379–382`. Dynamic
  `./hack.js` import is the third in this function ("already
  used twice" verified at :492/:514) — no new static edge.
- finish_maybe_wail (hack.js:2003, read): showdamage →
  rehumanize → wail-gated — C losehp order (Upolyd arm
  `:4266–4276` + normal arm `:4279–4292`, both read).
- Firing caller uhitm.c:3157 → mhitm.js:2016 (read: rn2(8)
  gate + poisoned(…, 30, false) — C `:3154–3157` shape).

## C ↔ JS fidelity

Order-and-reachability confirm. The drain sits exactly where
C's inline tail runs (between `:378` losehp and `:379`
adjattrib) and mirrors the `:391` i>5-arm idiom in the same
function (read :515–527: wail drain + done drain + return).
The omitted `_losehp_needs_done` drain is provably
unreachable, not assumed: the `:366` guard admits only
uhp>loss, and adjuhploss (attrib.js:361, read) subtracts at
most the setuhpmax-applied cut — uhp−loss' = olduhp−loss ≥ 1
by the guard, C's own arithmetic. The gameover return covers
the only remaining noreturn on this path (Upolyd mh<1 →
rehumanize-newly-dies, C `:4275–4276`). The 14-draw slice
equality + missing-howl screen read is measured; the drain
restores exactly the one paused message.

## Hallucinations / overclaim

None. "Direct fatal unreachable here" is proved above, not
asserted. The do_statusline1 symptom-owner park is respected
(painter untouched). No DIAG/FORCE/seed in code (0 hits).

## Density

Cliff-phase: parent HEAD was do_statusline1 (1 block, first
1075 — verified in bf0c7986d queue); writer identified from
the differing value (Co paint ← CON drain ← wail-miss page
shift), not a painter re-port. Ledger: poisoned ported +
D-3857. Reached: probe FULL PASS.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify do_statusline1 --base c7e7d049e~1
--reach-all` → `1 session(s) blocked on it (1 at baseline, 0
in the working scoreboard)`, Knight-578219 PASS, `1 PASS,
0 moved past, 0 unchanged, 0 worse → PROGRESS`; smoke 24/24
REACH-OK (no RNG-tagged reach). Zero regressed. The
FULL-PASS claim is exactly true.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
