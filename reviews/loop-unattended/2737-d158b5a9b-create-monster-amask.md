# Review 2737 — d158b5a9b — create_monster amask order (D-3877)

## Metadata

- SHA: `d158b5a9b` (cliff-head writer port)
- D-entry: D-3877; Ledger: `create_monster split
  js=mklev.js:splev_create_monster+mklev.js:l_create_monster`
- js diff: `js/mklev.js` (~12-line reorder + cites)
- Type: cliff writer port, ≤10 functions → full Method on each.

## Intent vs deliverable (promise vs diff)

Subject promises: JS ran the extinct-unique return before the amask
burn, so an extinct astral Pestilence skipped `induced_align` at
Barbarian-582708 s385; reorder to C order moves 385→472.

The diff actually adds: exactly the reorder — the extinct/G_GONE
block moves from before `sp_amask_to_amask` to after it, guarded by
`if (pm)`; `find_montype_gender` stays first. Promise == deliverable.

## Inventory

- `splev_create_monster` (`js/mklev.js:22163`, sync) — order-only
  change; signature, return contract, and all other arms untouched.
- Classification: no helper added/removed — pure intra-function
  reorder of two existing blocks. `sp_amask_to_amask`
  (`js/mklev.js:22126`) is a **C callee** (live, unchanged); its
  `AM_SPLEV_RANDOM → induced_align(80)` arm is the draw at issue.
  `l_create_monster` (`:23664`) delegates spawn to
  `splev_create_monster` (4 call sites in `:23668–23697`) — covered
  by the same reorder, as claimed. No symbol deleted or re-pointed,
  so no `sym.mjs` paste is required.

## C ↔ JS fidelity

C locus, read from pinned C: `create_monster` body
`sp_lev.c:1924–2187` (`csym.mjs` range). The order at `:1943–1953`:

```
amask = sp_amask_to_amask(m->sp_amask);      /* :1943 */
if (!class) { ... } else if (m->id != NON_PM) {
    pm = &mons[m->id];
    g_mvflags = ...;
    if ((pm->geno & G_UNIQ) && (g_mvflags & G_EXTINCT)) return;  /* :1950 */
    if (g_mvflags & G_GONE) pm = 0;                              /* :1952 */
} else { pm = mkclass(...); }
```

Walked call-for-call against the new JS:

- amask first, then checks — now matches C exactly. The old JS
  returned null for an extinct unique before the burn; C always
  burns `:1943` first. The one-missing-draw anatomy
  (JS[22331+] == C[22332+]) fits precisely.
- `if (pm)` guard is equivalent to the old nesting: `pm` inits null
  (`:22175`) and is set only in the named-id branch, so the guard
  runs the checks exactly when the old code did — and correctly
  skips them on class-letter/random paths, matching C (the checks
  live only in the `m->id != NON_PM` branch, not the class branch).
  Class/random paths are byte-identical in RNG footprint.
- `find_montype_gender` staying first matches C's effective draw
  order: the gender parse happens in the Lua binding
  (`lspo_monster` `:3343`) before `create_monster` is entered, so
  gender-then-amask is C order. `[22329]` gender matched both sides
  pre-fix, confirming the parse position was already right.
- `induced_align(80)` for `AM_SPLEV_RANDOM` matches astral.lua:113
  Pestilence (default align → RANDOM).

## Hallucinations / overclaim

None. The D-log labels the `create_monster` hidden line `note` (0
blocked, "NOT a corpus PASS") and claims movement only on
`induced_align`. The named-omission parenthetical (inline level-
loader bodies never check extinct — latent inverted gap, no
session) is honest scoping, not a smuggled defect. No cheat
markers in the hunk; Rule #2 clean (review 2735 scan).

## Density

Cliff-head writer port with movement — right density. Owner
`induced_align` already whole per D-1861 (briefed, not re-ported);
deliverable is the writer. `Ledger: create_monster split` names
both JS bodies. Pinning test
(`scripts/splev-extinct-amask.test.mjs`, extinct Pestilence →
null with exactly `[rn2(2), rn2(3)]`) re-ran green this audit.
One cliff, code + ledger + verify in one handoff.

## Verification

Re-measured by this audit
(`verify induced_align,create_monster --base d158b5a9b~1 --reach-all`):

- `verify induced_align`: 0 PASS, 1 moved past, 0 worse → PROGRESS
  (Barbarian-582708: 385 → disintegrate_arm@472 — exactly the
  ship-time landing; the later D-3878 SHA concerns a different
  session, so no further drift).
- `reach induced_align`: 444/444 PASS → REACH-OK (full spread;
  stronger than ship-time 80/80).
- `verify create_monster`: 0 blocked — vacuous, as stated.
- `reach create_monster`: 28/28 PASS → REACH-OK.

No REGRESSED session. Ship-time full 44/44 also noted (shared file
changed — correct gate).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
