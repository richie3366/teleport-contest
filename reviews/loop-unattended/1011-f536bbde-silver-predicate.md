# Review 1011 — f536bbde — ranged silver predicate mon_hates_silver (D-2041)

Metadata: SHA `f536bbde`, D-2041, Must-fix from review 1006
(C-wrong 2). js/ touches 1 file: `uhitm.js` (2 lines).
No stamp owed (Must-fix row archived in-commit).

## Intent vs deliverable

Subject promises: restore the dropped `is_vampshifter`
disjunct by calling live `mon_hates_silver(mon)` in the
ranged silver arm. Diff actually does exactly that (one
import name + one predicate swap + C citation comment).
Promise ≡ diff.

## Inventory

- Changed JS: `hmon` silver predicate, `js/uhitm.js:943`.
- `sym.mjs`: `mon_hates_silver js/monsters.js:832 sync`
  live export; body `!!(is_vampshifter(mon) ||
  hates_silver(mon?.data))` ≡ C verbatim. Import extends
  the pre-existing `./monsters.js` edge — no new edge,
  no cycle question. No symbol deleted or re-pointed.

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/mondata.c:516-520`
(5 lines, via `csym.mjs`): `return (boolean)
(is_vampshifter(mon) || hates_silver(mon->data))`.
Consuming site `uhitm.c:896` (`hmd->material == SILVER
&& mon_hates_silver(mon)`, confirmed in review 1006).
JS now reads `oc_material === SILVER &&
mon_hates_silver(mon)` — both conjuncts C-literal, and
the callee body is an exact port. The dropped-disjunct
gap is closed; the sear `rnd(dmg?20:10)` draw it gates
was already in place.

Sibling-site audit (commit makes specific claims — all
confirmed by grep): `mhitm.js:3650`,
`weapon.js:330/:587/:595/:602/:685` already call
`mon_hates_silver`; remaining `hates_silver(data)` uses
are the `youprop.h Hate_silver` hero macro on
`youmonst.data` (`uhitm.js:776`, `artifact.js:319`,
`dothrow.js:1064`) — C-correct as stated. `hates_silver`
rightly stays imported.

Callee closure: single LIVE callee, no STUB/CLONE/OMIT.
The silver-sear *message* stays named in turns.md —
correct, hmon has no `msg_silver` plumbing (pre-existing
structure, out of unit).

## Hallucinations / overclaim

None. The vampshifter probe (`/tmp/...`, quoted in the
D-log: shifted-doppelganger true/false/true, plain
control false) is the right falsifier for a
zero-corpus-block arm; I did not re-run the throwaway
probe (scratch, not in tree), the committed predicate
swap is self-evidently the cited C.

## Density

Two-line Must-fix, one predicate. Indivisible; §2b allows
Must-fix alone.

## Verification

- Diff-hunk grep: no FORCE/DIAG/getRngLog/seed gates
  (rule2 PASS in verify tail; full `--rulecheck` once
  for the iteration — see review 1017).
- Re-measured `hidden-proxy verify mon_hates_silver
  --base f536bbde~1`: `0 session(s) blocked on it (0 at
  baseline, 0 in the working scoreboard)` — the D-log's
  "vacuous verify is NOT a corpus PASS" is honest.
- Green 2/2 + strict ×2, cohort 7/7 per pasted verify
  tail; public gates carry a zero-block Must-fix.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
