# Review 2631 — 702b46212 — fprefx stale_egg threshold (D-3765)

Metadata. SHA `702b46212` (2026-10-10), D-3765, parent
`a50db7286` (audit). js diff: `js/eat.js` +2/−1 (import
name + gate constant + comment) +
`scripts/fprefx-stale-egg.test.mjs` (new, 2 its).
Ledger: `fprefx` ported (D-3765 prepended; c-range
unchanged). Works its parent queue's cliffs head
(`eat.c` fprefx, 1 blocked: 95408 — verified head of
the parent queue @8e94854e9, RNG lost 33641).

## Intent vs deliverable

Promise (subject + D-log): 95408@611 kind=rng —
C `d(10,4)=21 @ fprefx` («Ugh. Rotten egg.») vs JS
`rn2(5)=0 @ distfleeck` («delicious»): JS skipped the
stale arm's draw because its gate was `> 2*400`
(threshold 800, D-2159 doubled the wrong constant).
Fix: gate reads `2 * MAX_EGG_HATCH_TIME` (= 400).

Diff actually adds exactly the constant swap plus the
import name. Promise and diff match. No new module
edge (const.js already imported).

## Inventory

Changed JS (1 gate):

- fprefx EGG stale arm — `js/eat.js:1404–1407`
  (`> 2 * MAX_EGG_HATCH_TIME`, comment cites
  obj.h:315–317).
  C: `eat.c:2110` (`else if (stale_egg(otmp))` —
  csym range `eat.c:2098–2217` read) + macro
  `obj.h:315–317` (`MAX_EGG_HATCH_TIME 200`,
  `stale_egg ≡ (moves-age) > 2*200` — header read).

## C ↔ JS fidelity

**Gate C-exact.** C threshold is a 400-move gap; JS
now computes exactly that (`2 * 200`, live export
verified `js/const.js:1364` = 200). Surrounding arm
matches C order: pyrolisk guard → stale → feedback
flag (JS goto-stand-in, pre-existing), `d(10,4)` +
`(Vomiting & TIMEOUT)` vomit call identical to C
`:2113–2115`. Caller `doeat` `:3038` → `js/eat.js`
already wired, unchanged (D-log cites; untouched by
this diff).

**Callees:** none touched (constant import only).
No symbol deleted or re-pointed, so no sym.mjs paste
is owed. Sibling-inlines claim checked: dogmove.js
uses the same live export, uhitm.js inlines `2*200`
— both C-exact, correctly left untouched.

**Test.** Exported doeat, carried egg: gap 10 →
delicious, gap 500 (strictly between C 400 and old
800) → Rotten. Shape is authentic (pre-fix stale
prints delicious = probe symptom).

## Hallucinations / overclaim

None. Diff grep (FORCE / DIAG / getRngLog /
fastforward / seed / coords): zero hits. Rule #2
scan (`imports.mjs --rulecheck`, whole scored js/):
clean. No dispatch-vs-callee gap — the fix is the
gate itself.

## Density

Cliff-phase §2b: parent head fprefx, shipped whole
(owner already whole per D-2159, read once; this arm
was the open one). One cliff, one C locus
(`eat.c:2110` + `obj.h:315–317`), no bundling. Full
44 skipped with the eat.js-not-shared precedent —
consistent with prior ACCEPTs.

## Verification

D-log Verify: `verify.mjs --fn fprefx` → 1 PASS
(95408), reach 1/1; green/strict/cohort PASS.
VERIFY: PASS.

Re-measured by this audit (`verify fprefx --base
702b46212~1 --reach-all`):

```text
verify fprefx: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-chain-Archeologist-95408: PASS
reach fprefx: 1 baseline-PASS session(s) reach it (1 run, 1.2s): 1 PASS, 0 regressed → REACH-OK
```

PASS + REACH-OK; matches the D-log exactly. No
vacuous check (row cited 1; that session itemized).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
