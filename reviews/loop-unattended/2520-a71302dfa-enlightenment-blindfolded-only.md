# Review 2520 — a71302dfa — enlightenment Blindfolded_only (D-3641)

## Metadata

- SHA: `a71302dfa` (2026-10-08) — cliffs-head writer, D-3641
- D-entry: D-3641 (status_enlightenment Blind adverb)
- js diff: `js/invent.js` +9/−2 (one predicate + C-cite comment)
- Type: cliff (≤10 functions) — whole Method per function + movement re-measure

## Intent vs deliverable

Promise (subject + D-log): scen-impaired-Rogue-94030 step 64 reads «You
were deliberately blind because of your blindfold.» where C reads
«temporarily blind …» (RNG 2364/2364; hero has timed blindness AND a worn
blindfold). C's adverb is `Blindfolded_only ? "deliberately" :
"temporarily"` («timed, possibly combined with blindfold»), but JS tested
worn-BLINDFOLD-otyp — true even with concurrent timed blindness, and false
for towels. 1 corpus PASS.

Diff actually adds: `blindfoldOnly = EBlinded && !(HBlinded && !BBlinded)`
from the flat `u` props, replacing the otyp check. Nothing else in `js/`.

## Inventory

| # | JS change | C locus | Status |
|---|-----------|---------|--------|
| 1 | `js/invent.js:6152` blindfoldOnly predicate | `insight.c:1065` + `youprop.h:92–97` | ports C |

`Ledger:` status_enlightenment split (status_core_lines + enlightenment +
doattributes) — the arm lives in `status_core_lines`; consistent.

## C ↔ JS fidelity

C `insight.c:1059–1067` (Blind arm, reasons «in same order as
from_what»):

```c
(HBlinded & FROMOUTSIDE) != 0L ? "permanently"
: (HBlinded & FROMFORM) ? "innately"
  : Blindfolded_only ? "deliberately"
    /* timed, possibly combined with blindfold */
    : "temporarily");
```

C `youprop.h:92–97`: `Blinded (HBlinded && !BBlinded)`, `Blindfolded
EBlinded`, `Blindfolded_only (Blindfolded && !Blinded)` — i.e.
`EBlinded && !(HBlinded && !BBlinded)`. JS (`js/invent.js:6152–6157`) is
the identical cascade over the identical predicate, read from the same
flat `u.HBlinded/u.EBlinded/u.BBlinded` the file's Blind gate (`:6143`)
already trusts. The old otyp check was wrong in exactly the two claimed
directions: C `:95` says «worn blindfold (**or towel**; lenses don't set
extrinsic)», so towels must read deliberately (old: temporarily), and C's
«timed, possibly combined with blindfold» comment says timed+blindfold
reads temporarily (old: deliberately). Both fixes verified against C, not
just the probe.

Untouched-by-design items (disclosed, map — correctly not Must-fix):

- `:1068` wizard-timeout `!Blindfolded` keeps `!u.ublindf`: the probe
  agrees on both forms (blindfold worn ⇒ no `(N)` suffix either way);
  ublindf⇔EBlinded sync is identified as setworn's domain. Pre-existing
  line, explicitly kept — not a new gap.
- `from_what :962–968` / `pray.c:361` / `potion.c:2461` Blindfolded_only
  sites: other files/arms with no corpus row; the wizard what_gives arm
  already emits the identical suffix text here.

No helper involved (pure predicate); no clone/stub/no-op question. RNG:
none in the arm; draw order untouched.

## Hallucinations / overclaim

None. «Match C» is claimed for one predicate whose C expansion is quoted
and re-verified above; the suffix agreement («because of your blindfold»
both sides via what_gives) correctly scopes the divergence to the adverb
alone. Temp DIAG use is disclosed as removed before verify — the js diff
contains no DIAG (grep hit is the commit message reporting its removal).

## Density

Cliff phase §10.18: one cliff (one_characteristic row), the writer arm
(`insight.c:1065` predicate) shipped whole, one `Ledger:` entry, code +
verify in one handoff. Owner-vs-writer explicit (one_characteristic owner
→ status_enlightenment writer). No foreign-file work, no re-audit.
Right-sized.

## Verification

D-log claims: `verify one_characteristic: 1 PASS` (scen-impaired-
Rogue-94030, RNG 2364/2364, screens 72/72), both functions REACH-OK
(smoke 24/24), green + strict + cohort, full skipped (tool: no shared
file changed). `status_enlightenment` vacuous at baseline (writer, not
owner) — stated, not hidden.

Re-measured:
`node scripts/hidden-proxy.mjs verify status_enlightenment,one_characteristic --base a71302dfa~1 --reach-all`:

- `verify status_enlightenment: no corpus session is blocked on it at a71302dfa~1`
  (vacuous as the D-log says) + `smoke … 24 PASS, 0 regressed → REACH-OK`
- `verify one_characteristic: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
  (scen-impaired-Rogue-94030: PASS)
- `smoke one_characteristic: … 24 PASS, 0 regressed → REACH-OK`

PASS claim reproduces exactly; no REGRESSED. Rule #2 clean globally; diff
grep for FORCE/DIAG/getRngLog/fastforward/coords: 1 hit, inspected —
commit-message text («temp DIAG removed before verify»), zero in code. No
seed/step/coordinate reads. Committed focused test present
(`scripts/status-blind-adverb.test.mjs`).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
