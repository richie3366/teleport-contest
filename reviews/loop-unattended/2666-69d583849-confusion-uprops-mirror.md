# Review 2666 — 69d583849 — wiz_intrinsic writer: CONFUSION slot mirror

Metadata: SHA `69d583849`, D-3802, cliff row-2 `wizcmds.c` wiz_intrinsic writer
(@3b2e6a541; row-1 randomize_gem_colors skipped per D-3767 SYMPTOM park +
D-3768 [measure], falsifier live-checked). JS: `js/timeout.js` (+13),
`js/potion.js` (+9/−0). Test: `scripts/confusion-uprops-mirror.test.mjs`.

## Intent vs deliverable

Promise (subject + D-log): CONFUSION flat wore off while
uprops[CONFUSION] kept the timeout, so `#wizintrinsic`'s oldtimeout
fallback read showed a stale `[N]`; both CONFUSION writers now keep the
slot ≡ the flat. Movement claimed: 3 PASS, 2 moved.
Diff actually adds: slot-ensure + `itimeout(xtime)` mirror in
`make_confused`; `next & TIMEOUT` mirror + set-to-1 mirror in the
`nh_timeout` CONFUSION dedicated arm; `CONFUSION` added to potion.js's
existing const.js import. No other JS. Promise matches deliverable.

## Inventory

- `make_confused` (js/potion.js:926) — changed: slot mirror added. C
  `potion.c:88–104` (csym range).
- `nh_timeout` CONFUSION arm (js/timeout.js:1104) — changed: slot mirror
  added. C `timeout.c:730–735` (case CONFUSION).
- No new helpers, no deleted symbols, no re-pointed imports (CONFUSION
  joins an existing edge; `git show` hunk potion.js:137–140).

## C ↔ JS fidelity

C ground truth: `youprop.h:83` — `HConfusion ≡
u.uprops[CONFUSION].intrinsic`, single storage. `make_confused`
(potion.c:88–104): `old=HConfusion`; `Unaware→talk=FALSE`; `!xtime &&
old && talk` → "less trippy/confused"; botl on edge; `set_itimeout`.
JS walks the same order: old → Unaware → You_feel (hallu via
`u.Hallucination||u.HHallucination`) → botl → flat write + slot write
with the same `itimeout(xtime)` value. No RNG in the C body; none added.
Case CONFUSION (timeout.c:730–735): `set_itimeout(&HConfusion,1)`;
`make_confused(0,TRUE)`; `if (!Confusion) stop_occupation()`. JS arm:
on TIMEOUT expiry writes set-to-1 to flat AND slot, awaits
`make_confused(0,true)`, stops on `!HConfusion && !Confusion` — the
BLINDED-arm house shape, correct. Countdown mirror (`next & TIMEOUT`
into slot, non-TIMEOUT bits preserved) keeps dual storage ≡ as C's
single storage requires.
Callers: 32 C `make_confused` sites (`--callers`); change is
behavior-only inside both bodies, signatures kept — all inherit the
aliased-slot write with identical gates. `sym.mjs make_confused` →
`js/potion.js:926 ASYNC`. No clone/re-point to audit.
Gap: none. Branch-by-branch confirm on both writers.

## Hallucinations / overclaim

None. D-log says "slot ≡ flat in the house shapes" — the diff does
exactly that (make_deaf shape in make_confused, BLINDED-arm shape in
nh_timeout). No "Match C" claim on any dispatch; owner wiz_intrinsic
explicitly not re-ported (D-1998 arms live; writer is the port).

## Density

Cliff-phase: owner-vs-writer correct — RNG fully matched on every probe
(34799/34799…), only the menu's uprops-fallback read diverged, and the
/tmp prefix probe measured flats 0 vs slot 5. Whole-function: both
writers ported whole vs cited C ranges; no arm-only sale. Ledger: both
functions get entries (`nh_timeout ported; make_confused ported`).
Named omits (STUNNED/FUMBLING/FAST/WOUNDED_LEGS arms, read/trap/sit
transients) are named with the no-block rationale, not silent stubs.
Verify bullet shows movement + REACH-OK ×3 + green + strict + cohort +
full 44/44. Row-2 with row-1 void-barred matches the documented cliff
discipline. Not unreached work: 5 sessions named, all moved.

## Verification

Banned-token grep over the js diff: clean (no FORCE/DIAG/getRngLog/
seed/coords). Rule #2: `imports.mjs --rulecheck` → clean across scored
`js/` (this iteration).
Re-measure (mine, HEAD code, baseline parent):
`hidden-proxy.mjs verify wiz_intrinsic --base 69d583849~1 --reach-all`
→ `3 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS`
(95305/95319/95326 PASS; 95327 → display_minventory@1315 was 994; 95323
→ do_statusline2@1297 was 1082) and `reach: 7/7 PASS → REACH-OK`.
D-log named getobj@1230 / peffect_sickness@1163 — my steps are strictly
later because HEAD includes D-3803/D-3804; consistent, zero regressed.
Claim confirmed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
