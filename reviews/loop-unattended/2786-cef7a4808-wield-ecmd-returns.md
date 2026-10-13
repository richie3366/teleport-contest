# Review 2786 — cef7a4808 — wield ECMD_FAIL/CANCEL returns

- **SHA:** `cef7a4808` (Tue 2026-10-13) — js-throw/hang head, canned dofire livelock (D-3933).
- **D-entry:** D-3933. **Ledger:** `dowield`, `doswapweapon`, `ready_weapon` ported.
- **Diff size:** `js/wield.js` +60/−~40 (return arms + docs), `js/cmd.js` +32/−~14 ('w'/'x' tails), new test (3 its). Board: header + 1 row.
- **Method:** cliff commit — whole Method on all 4 touched functions + exhaustive caller audit (the risk of this change class).

## Intent vs deliverable (promise vs diff)

The subject promises: welded-uwep canned `dofire→{doswapweapon,
dowield}→dofire` livelock (worker ETIMEDOUT, moves frozen, queue never
clears) fixed by returning C ECMD_* arm-for-arm so the canned tail's
FAIL arm clears the queue; Samurai-49956004 completes to step-521
mhitm_ad_elec.

The diff actually changes: FAIL arms → ECMD_FAIL (dowield
cantwield/already×2/welded/armor, doswapweapon cantwield/welded,
ready_weapon shield, already_wielded_msg), getobj-cancel →
ECMD_CANCEL, OK/TIME arms → named constants, ready_weapon
passthroughs, and cmd.js 'w'/'x' bit-test tails. Promise and diff
agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | `dowield` 8 return arms (wield.js:800–867) | wield.c:354–457 (csym) | arm-for-arm vs C, verified below |
| 2 | `doswapweapon` 2 FAIL arms + passthrough (:487–519) | wield.c:460–501 (csym) | exact |
| 3 | `ready_weapon` renames + shield FAIL (:576–655) | wield.c:168–273 (csym) | only value delta is shield→FAIL |
| 4 | `already_wielded_msg` → FAIL (:112) | wield.c:381 | exact |
| 5 | cmd.js 'w'/'x' tails (:6015–6035) | cmd.c:3810–3819 | bit-exact shape |

ECMD values JS≡C (OK 0x00, TIME 0x01, CANCEL 0x02, FAIL 0x04;
hack.h:1456–1459). No symbol deleted or re-pointed (same-file values +
tails); no `sym.mjs` re-point output required.

## C ↔ JS fidelity

**dowield, arm for arm** (C read in full): cantwield→FAIL ✓,
getobj-cancel→CANCEL (:375) ✓, wep==uwep→already FAIL ✓,
welded→FAIL+reset_remarm+unsplit ✓, split-child→already FAIL or
finish_splitting ✓, uswapwep→`return doswapweapon()` ✓ (JS :825),
quiver 'q'→OK (:417) ✓, split-fail→OK (no C arm — C splitobj can't
fail here; keeps old 0, conservative) ✓, quiver-decline→OK (:439) ✓,
armor→FAIL (:445) ✓, wielding tail result=ready_weapon passthrough +
pushweapon + untwoweapon ✓. already_wielded_msg matches C :377–381
(incl. the weptool/towel unweapon quirk).

**doswapweapon**: cantwield/welded→FAIL, result=ready_weapon passthrough,
uwep-unchanged restore, twoweap — exact vs C :460–501. **ready_weapon**:
every `return 1/0` rename is value-identical (TIME=1, OK=0); the sole
value delta, shield→FAIL, matches C's `res = ECMD_FAIL` (:186–190).
C's `res |= arti_speak` accumulation vs JS early-TIME returns is
pre-existing structure, bit-identical at every tail. No RNG in any
touched path; the change is return-bit plumbing only.

**Caller audit (exhaustive grep over `js/`)** — every consumer of the
new truthy FAIL=4/CANCEL=2 values:
cmd.js 'w'/'x' NEW tails match C :3810–3819 bit-for-bit (CANCEL|FAIL →
reset(TRUE), else no-TIME → reset(multi<0), TIME → move=1) ✓;
getline EXT_CMDS → doextcmd passthrough → '#' tail bit-tests (cmd.js
verified) ✓; overlay → rhack_dispatch_bound tail bit-tests (verified)
✓; cmdq canned entries (dofire requeue dothrow.js:2780–2784, iactions
IA_WIELD_OBJ/IA_UNWIELD/IA_SWAPWEAPON — all fn refs, no direct value
use) → canned runner tail bit-tests (cmd.js:5506–5510, pre-existing)
✓ — this is the livelock breaker (C reset_cmd_vars :3607–3624 clears
CQ_CANNED+CQ_REPEAT); wield_tool voids the value and decides by state
(:270–272) / ignores (:277) ✓. No missed callers; no boolean or
`? 1 : 0` time-accounting consumer remains.

**Mechanism end-to-end**: old 0 on the welded arm took the OK tail with
multi=0 → reset_cmd_vars(FALSE) → queue never clears → dofire requeues
4 entries per drain → infinite. First FAIL now clears the whole canned
tail. The CDP/bisect forensics are consistent with the code paths.

Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. Rule #2:
clean (this iteration, cited for all 8 SHAs).

## Hallucinations / overclaim

- "0/3 → 3/3": new test file passes 3/3 at HEAD (re-ran). ✓
- "Unit sweep 2044/2093 identical except the new test": stands on the
  D-log's before/after evidence (not re-runnable without a parent
  checkout); public 44/44 at commit + this audit's gates cover health.
- Same-class latents (doquiver/dowieldquiver, dofire's own 0/1) are
  NAMED with falsifiers in the D-entry, different arms/files, no
  session reaching — prescribed handling, not Must-fix. None found.

## Density

Cliff phase (§10.18): parent head was the `js` js-throw row for this
exact session (verified in `cef7a4808~1:docs/LOOP-QUEUE.md`, tagged
"Must-fix, Constitution §10.14"); hand Must-fix empty. One cliff
(owner = the hang itself), three whole functions with ledger rows,
hang→completion + REACH-OK + full 44/44 in one handoff. ✓

## Verification

Re-measured myself (`--base cef7a4808~1 --reach-all`, current code;
comma form accepted):

```
verify dowield: baseline cef7a4808~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke dowield: no RNG-tagged reach; fixed smoke spread (24 run, 21.4s): 24 PASS, 0 regressed → REACH-OK
verify doswapweapon: baseline cef7a4808~1 — 0 session(s) blocked on it
smoke doswapweapon: no RNG-tagged reach; fixed smoke spread (24 run, 21.9s): 24 PASS, 0 regressed → REACH-OK
```

Zero blocked is correct — the D-log explicitly declares the hidden
verify vacuous-by-construction (error-only row, no owner) and evidences
movement by session completion instead. Probe on HEAD: completes, RNG
21216/53062, screens 530/1537, step 521 mhitm_ad_elec, error null —
exactly the D-log's numbers, gecko-zap toplines as quoted. Board diff:
`error: "worker: "` → step/owner/error-null, fullCommit unchanged
(45bdd980f) as claimed. No REGRESSED session.

## Actionable C-wrongs

None. Every return arm matches C, every caller of the new bit values is
audited safe, the livelock mechanism is confirmed end-to-end, and the
probe completion reproduces exactly.

Verdict: **ACCEPT**
