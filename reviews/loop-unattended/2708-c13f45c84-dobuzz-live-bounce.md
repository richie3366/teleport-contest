# Review 2708 — c13f45c84 — dobuzz live-cell bounce (D-3847)

Metadata: SHA `c13f45c84`, D-3847, cliffs-head `monmove.c`
distfleeck writer (owner C-whole, parked SYMPTOM per the row
tag; prevEntry names dobuzz). JS: `js/zap.js` (+14/−15: two
re-reads + shim deletion + doc). Test:
`scripts/dobuzz-sdoor-bounce.test.mjs` (new, 1 `it`).

## Intent vs deliverable

Promise: Healer-578216@668 — both beams strike a secret door;
C's zap_over_floor converts SDOOR→DOOR and the beam ends,
JS's bounce check tests the stale iteration-start typ and
bounces, plus a leftover shim re-prints the absorb; re-read
the live cell at the bounce test + bchance, delete the shim;
session moves 669→1431. Diff actually does exactly that. Match.

## Inventory

- `dobuzz` (js/zap.js:2718, :2734) — live re-reads. C:
  `:4998 !ZAP_POS(levl[sx][sy].typ)` and `:5003 bchance`
  (read) both index the LIVE levl array — after zap_over_floor
  (:4858) already rewrote it. ZAP_POS ≡ typ≥POOL(16)
  (rm.h:127); SDOOR=14 < 16, DOOR=23 (rm.h, read) — the stale
  14 bounced, the live 23 stops. JS `game.level?.at?.(sx,
  sy)?.typ` is the same live read. (Two re-read consts where
  one would do — harmless: no typ mutation between them.)
- Deleted shim (was js/zap.js:2490–2495): pline absorb +
  `range += -1000`. C has NO block between zap_over_floor
  (:4858) and `mon = m_at` (:4861, read) — pure duplicate.
  zap_over_floor owns both: SDOOR→DOOR (:5398–5399),
  rangemod=−1000 (:5416), absorb message :5459 / vibrations
  :5462 (all read); JS zof mirrors each (SDOOR convert,
  rangemod=−1000 at zap.js:1298, see_it-gated absorb at :1342,
  vibrations :1348 — all read). Deletion is a pure fix.

## C ↔ JS fidelity

Branch-for-branch confirm. With the live read, the SDOOR case
now flows: zof converts + prints reveal + absorb (range −1000
→ −993) → `:4998` ZAP_POS(DOOR) true, `closed_door && range>=0`
false → no bounce — C's path exactly. The focused test pins
absorb-once + the melee follow-up + distfleeck (not bounce_dir)
as the post-beam draw. No new imports; no deleted exports.

## Hallucinations / overclaim

None. The "1 unchanged" session is reported with its own
writer named (escape_from_sticky_mon), not hidden; the
D-log Next assigns it its own pop.

## Density

Cliff-phase: head writer correct (C rn2(5)@distfleeck vs JS
rn2(75)@bounce_dir names the beam). One unit, Ledger `dobuzz
ported` + D-3847, Verify bullet with movement + both-spread
REACH + green + strict + cohort + forced full 44/44. Reached:
probe moved 669→1431.

## Verification

js-hunk grep: 0 hits. Rule #2 clean (iteration-wide run).
Re-measure (mine): `verify distfleeck --base c13f45c84~1` →
`2 session(s) blocked on it (2 at baseline, 1 in the working
scoreboard)`, `scen-sweep-Healer-578216: moved →
name_to_monplus at step 1431 (was 669)`,
`scen-sweep-Valkyrie-578204: still distfleeck at step 895`,
`0 PASS, 1 moved past, 1 unchanged, 0 worse → PROGRESS`;
reach 80/80 REACH-OK (spread of 1102). Zero regressed. The
movement claim is exactly true, including the unchanged row.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
