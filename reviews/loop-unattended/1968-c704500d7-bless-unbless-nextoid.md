# Review 1968 — c704500d7 — mkobj.c bless/unbless/nextoid (D-3008)

Metadata: SHA `c704500d7`, D-3008, three-function `mkobj.c`
cluster (two restarts + one new export + clone retirement).
Stat: `js/mkobj.js` +73/−49ish (restarts + nextoid),
`js/shk.js` ±14 (export flip + bill_dummy wiring),
`js/mklev.js` −9/+2 (clone deleted, canonical import). No
prior review file on disk. Cluster commit → Method per
function below.

## Intent vs deliverable

Subject promises whole-body bless/unbless restarts (COIN
guard, bag weight, figurine stop, price-matched o_id) and
retiring the mklev `unbless` clone. Diff actually does
that plus the `nextoid` export with both C callers wired.
Promise and diff match.

## Inventory (per function)

- `bless` (RESTART, exported async, `js/mkobj.js:680`):
  full C order.
- `unbless` (RESTART, exported async, `:705`): full C
  order.
- `nextoid` (NEW, exported sync, `:438`): price-matched
  o_id search (C staticfn → exported because the second
  caller lives in shk.js).
- Deleted: file-local `unbless` clone in `js/mklev.js`
  (cleared `blessed` only) → canonical import.
- Flipped: `oid_price_adjustment` local→exported
  (`js/shk.js:1093`, RNG-free).
- Rewired: `splitobj :466` (C `:469`) and
  `bill_dummy_object` (`js/shk.js:1310`, C `:725`) to
  `nextoid`.

## C ↔ JS fidelity (per function)

`bless`, `csym` `mkobj.c:1744–1764` (21 lines, read whole
with the JS body): COIN early return `:1749–1750` ✓ (new);
radius-before-flip `:1751–1752` ✓ (restart moves the read
above the BUC write — the old order was the C-wrong);
`cursed=0/blessed=1 :1753–1754` as booleans (curse idiom)
✓; carried-luck → set_moreluck / else BAG weight / else
timed-FIGURINE `stop_timer(FIG_TRANSFORM,
obj_to_any(otmp)) :1755–1760` ✓ (else-if chain exact,
`obj_to_any` identity per hack.js:212); lamplit tail
`:1761–1762` ✓. `carried()` ≡ `where==OBJ_INVENT`
(obj.h:332) ✓. No RNG in C, none added. Verdict: OK.

`unbless`, `csym` `mkobj.c:1766–1780` (15 lines, read whole
with the JS body): radius `:1770–1771` ✓; blessed=false,
cursed untouched `:1772` ✓ (the deleted clone's only
behavior, now with the arms it dropped); luck/weight
`:1773–1776` ✓ (no figurine arm in C — correctly absent);
lamplit tail `:1777–1778` ✓. Verdict: OK.

`nextoid`, `csym` `mkobj.c:534–551` (18 lines, read whole):
`oid = ident-1` with U32 wrap ✓ (`>>>0`; the `||1`
guards undefined — ident==0 is unreachable since ident
starts at 1 and only grows); `olddif` from old o_id ✓;
do/while with skip-0-on-wrap ✓ and `--trylimit >= 0`
from 256 (≤257 tries, exact) ✓; `ident = oid` then
`next_ident()` (the single rnd(2)) then `return oid` ✓;
search itself RNG-free (`oid_price_adjustment` draws no
RNG) ✓. Both C callers wired: `:469` splitobj,
`:725` bill_dummy_object ✓. Verdict: OK.

Clone resolution (required `sym.mjs`, pasted): `unbless`
now exactly one export (`js/mkobj.js:705 ASYNC`) — the
mklev clone is gone from the tree; `oid_price_adjustment`
exactly one definition (`js/shk.js:1093 sync`); `nextoid`
(`js/mkobj.js:438 sync`). No second copy anywhere.
D-log states all other import edges were already ALREADY;
the mklev hunk shows the clone replaced by a name on an
existing import line. Callee closure: every callee LIVE
(arti_light_radius, confers_luck, set_moreluck, weight,
stop_timer, obj_to_any, maybe_adjust_light, next_ident).

Named: `bless` end.c caller block unported (not a body
arm — caller-side, correctly not Must-fix here).

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed hits.
Rule #2 clean (re-verified 1963).

## Hallucinations / overclaim

None. "Restarted whole in C order" verified arm-by-arm
above, including the radius-before-flip reorder that was
the point of the restart. No dispatch-over-stub.

## Density

One-C-file cluster, 3 functions, ~+100 net lines with a
clone retirement — inside the §2b envelope.
Per-function verdicts: all three OK. SHA verdict: OK.

## Verification

D-log: `verify.mjs --fn bless,unbless,nextoid` → syntax
(3 files) · rule2 · 3× note hidden + REACH-OK (smoke 24
each) · green 2/2 · strict ×2 · cohort 7/7 · full 44/44
· VERIFY: PASS. Re-measured here
(`--base c704500d7~1 --reach-all`, all three): each
reports 0 blocked at baseline and in the working
scoreboard with `fixed smoke spread (24 run): 24 PASS,
0 regressed → REACH-OK` (all three pairs observed
in-session). Honest vacuous notes for coverage rows.
Zero REGRESSED. No seed/step/coordinate/RNG-index reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
