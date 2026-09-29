# Review 2086 — eeb30e858 — artifact abil/what_gives/arti_immune

- SHA: `eeb30e858` (D-3126)
- Subject: "`artifact.c` abil_to_adtyp whole-body + what_gives completion + arti_immune (coverage)"
- js/ insertions: ~98 (js/artifact.js)
- Prior index: 2085; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: port MISSING `abil_to_adtyp` + `arti_immune` whole,
complete PARTIAL `what_gives` (dtyp/cspfx/spfx/Sunsword/
warntype arms, ungated tables), + 2 stale declares.

Diff actually adds: the 2 new functions and the what_gives
rewrite in C order. Matches the promise.

## Inventory

Per function (3 code + 2 stale):

- `abil_to_adtyp` (js/artifact.js:3242, local) — C
  :2319–2341 (csym range). Live: whole body (7-row table in
  C order, 0 default). Local is correct (C staticfn).
- `what_gives` (js/artifact.js:3290, export) — C :2375–2424.
  Live: whole body, rewritten in C order.
- `arti_immune` (js/artifact.js:1462, export) — C :977–990.
  Live: whole body. No C callers (0 csym refs) — unwired
  export for parity, ranged_attk precedent.
- `bane_applies` (js/artifact.js:1517, local) — stale; body
  verified ≡ C :992–1005 (DBONUS mask + struct copy).
- `abil_to_spfx` (js/artifact.js:3256, local) — stale; all 12
  rows verified in C :2343–2370 order + 0 default.

Helpers: none added. `artilist()[0]` ≡ `&artilist[
ART_NONARTIFACT]` verified (C:13 dummy #0; artilist.h:83
first entry is the NONARTIFACT basename ⇒ index 0) — the
file's 5× idiom. WARN_OF_MON/BLND_RES/AD_*/W_* consts
pre-existing; `game.context.warntype.obj` matches the live
warntype_info shape. Nothing deleted or re-pointed.

## C ↔ JS fidelity

`what_gives`, walked arm by arm against C :2375–2424:
wornmask + twoweap (:2382–2388) identical; dtyp/spfx tables
now UNGATED (:2389–2391) — the old wield-bits gate on
needSpfx and the `!bits` early return are both gone, which
fixes two real C-wrongs (C scans unconditionally; with
bits=0 a carried cspfx artifact still matches). Invent scan,
warntype guard folded into the artifact condition (:2394–
2395 — gated artifacts fall to the wornmask else exactly
like C), dtyp cary/defn (:2399–2404, incl. the `~(W_ART|
W_ARTI)` worn test), spfx cspfx-then-spfx (:2405–2412, bare
owornmask test like C), Sunsword (:2413–2416), wornmask else
(:2418–2421), null tail. All exact. No RNG either side.

Callers: abil_to_adtyp :2389 → needDtyp (new); what_gives
attrib.c:958 → js/attrib.js:1211 from_what (pre-wired,
wizard-gated ✓ matches C's `wizard &&` gate); arti_immune
none (parity export); stale callers per D-log table.

Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates. Rule #2
clean (iteration-wide).

## Hallucinations / overclaim

None. "Wizard-^X display path, no RNG" accurate; "0 blocked
×5" framed as notes.

## Density

5-function one-C-file cluster (artifact.c), ≤10, no Must-fix
bundled, per-function Ledger + Verify lines, ~98 insertions.
Per-function verdicts: all five ACCEPT. SHA: ACCEPT.

## Verification

Re-measured (`--base eeb30e858~1 --reach-all`, all 5 in one
call): 0 blocked at baseline and working tree each, vacuous
notes, smoke 24/24 → REACH-OK ×5. Matches the D-log; no
REGRESSED session. Shared gates per D-log: syntax 1 file,
rule2, green 2/2, strict ×2, cohort 7/7 (full skipped — no
shared file).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
