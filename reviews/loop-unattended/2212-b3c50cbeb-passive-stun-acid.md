# Review 2212 — b3c50cbeb — passive AD_STUN + passive_obj AD_ACID

Metadata: SHA `b3c50cbeb71b11933e787bcae7daa825ecd4a8e2` (D-3251, 2026-10-02).
js/ delta +13/−11 in `js/uhitm.js` only. No `sym.mjs` re-point output
required (no symbol deleted or re-pointed; both callees newly imported —
outputs pasted in Inventory).

Intent vs deliverable: subject promises "`passive` AD_STUN +
`passive_obj` AD_ACID live calls". The diff delivers exactly that: two
arm completions, each replacing a `deferred` comment with a live call.
It also promises "4 stale left Open" — prose-only stale verdicts
(abuse_dog, seffect_magic_mapping, enhance_weapon_skill,
trapeffect_landmine); rows stayed Open, no archive. Honest framing:
ledger stays `partial`/`partial`, not sold as whole functions.

Inventory (per function):

- `passive` (AD_STUN arm): `js/uhitm.js:3419`. Old:
  `if (!u.Stunned) { u.Stunned = tmp|0 }` (wrong field, no message).
  New: `if (!hero_Stunned()) await make_stunned(tmp|0, true)` via
  dynamic `potion.js` import (file convention, zero static-edge change).
- `passive_obj` (AD_ACID arm): `js/uhitm.js:3171`. Old: live `!rn2(6)`
  guard with deferred body. New: `await erode_obj(obj, null,
  ERODE_CORRODE, EF_GREASE)` via dynamic `trap.js` import.
- `sym.mjs` outputs: `make_stunned  js/potion.js:928  ASYNC — await
  required`; `erode_obj  js/trap.js:4474  ASYNC — await required`.
  Both awaited at the call sites. No clones, no stubs, no re-points.

**C ↔ JS fidelity**

- `passive` AD_STUN — C `uhitm.c:6085–6088`
  (`passive` defined `uhitm.c:5864–6125`, `int` at :5864):
  `case AD_STUN: if (!Stunned) make_stunned((long) tmp, TRUE); break;`
  JS matches call-for-call: no RNG in the arm, guard-then-call order
  exact, `tmp|0` ≡ `(long) tmp`. Guard nuance: C `Stunned` ≡ `HStun`
  (`youprop.h:81`); JS `hero_Stunned()` (`js/uhitm.js:1494`) also ORs
  `uprops[STUNNED].intrinsic`. STUNNED is timeout-only in C (nothing
  sets the intrinsic), so the extra disjunct is unreachable-conservative,
  and it fires in the same direction C does (skip when stunned). Not a
  C-wrong — observation only.
- `passive_obj` AD_ACID — C `uhitm.c:6126–6195`, arm at :6164–6168:
  `if (!rn2(6)) (void) erode_obj(obj, NULL, ERODE_CORRODE,
  EF_GREASE);` — no `mcan` gate. JS is identical: pre-existing `rn2(6)`
  guard untouched (draw order preserved), same callee/args, no added
  gate. Correctly distinguished from the AD_CORR arm's `mcan` gate.
- Callers: C `passive` callers (`--callers`: dokick.c ×7, uhitm.c
  715/789/810/5827/5829) — dokick sites stay NAMED (pre-existing doc
  :3203), hitum-family wiring pre-existing and proven by the two movers.
  `passive_obj` runs via the live `passive` AD_ACID path (:3288),
  proven by the engulf PASS. Single-arm completion; function stays
  partial — correctly declared.
- Banned-pattern grep on the js/ hunks: no FORCE/DIAG/getRngLog/seed/
  fastforward/coordinates. Rule #2: `imports.mjs --rulecheck` →
  "Rule #2 clean" across scored `js/`.

Hallucinations / overclaim: none in the port claims. One stale-verdict
miss: D-3251 prose calls `seffect_magic_mapping` "whole in JS
(brief-verified)", but at this SHA `js/read.js:344` still ran
`vision_recalc(1)` + `newsym` per converted SDOOR with the Rogue
`unblock_point` NAMED — and D-3258 later proved those two calls have no
C counterpart (`read.c:2128–2129` is `unblock_point` only). The stale
call was wrong in prose, but harmless: no ledger change, row stayed
Open, D-3258 shipped the arm. The abuse_dog stale call is confirmed
correct by D-3253 (body whole; writer was `hmon_hitmon`'s floor).

Density (§2b): +13/−11 — far under the ~80 floor, and two single arms,
not whole functions. D-log invokes picker exhaustion (coverage
generator 0 rows, corpus queue fully tagged) with the
D-3245/D-3248/D-3249/D-3250 exception precedent, all ACCEPTed. The arms
are not sold as functions (ledger partial, Named omissions list the
rest: AD_RUST/AD_ENCH/tail, PLYS/dokick). Consistent with precedent;
the very next SHAs (D-3256: full `passive`+`passive_obj` bodies) retire
the residual. ACCEPT on density with the exception noted, not a pass
for the pattern in general.

Verification: re-measured at HEAD (recordings pinned, baseline =
parent `b3c50cbeb~1`):

- `verify passive,passive_obj --base b3c50cbeb~1 --reach-all` →
  `verify passive: 1 PASS, 0 moved past, 0 unchanged, 0 worse →
  PROGRESS` (scen-engulf-Samurai-94392: PASS);
  `reach passive: 247 run: 247 PASS, 0 regressed → REACH-OK` (full
  reach — exceeds the D-log's 80-sample; its suggested `--reach-all`
  follow-up is now done, clean);
  `verify passive_obj: no corpus session is blocked` (vacuous —
  D-log never claimed a passive_obj block, honest);
  `reach passive_obj: 7 run: 7 PASS → REACH-OK`.
- `verify make_stunned --base b3c50cbeb~1` → ride-94407
  `moved → dochug at step 171 (was 159)` → PROGRESS; smoke 24/24
  REACH-OK. Both D-log movers confirmed, zero REGRESSED.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
