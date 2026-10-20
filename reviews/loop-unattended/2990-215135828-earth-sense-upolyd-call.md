# Review 2990 — 215135828 — earth_sense calls `Upolyd(u)`

- SHA: `215135828` (cliff; owner earth_sense, 1 row)
- D-entry: D-4150; Ledger: earth_sense ported
- `js/` diff: js/cmd.js +1/−1

## Intent vs deliverable

Promise: dungeon.c earth_sense returns early `if (u.usteed || Flying ||
Levitation || Upolyd)` (`:1554`), where Upolyd is the you.h macro
`u.umonnum != u.umonster`. JS tested the bare imported function
`Upolyd`, which is always truthy, so earth_sense never ran and dwarves
never sensed buried objects. Diff: `Upolyd` → `Upolyd(u)`. The promise
matches the diff.

## Inventory

- `earth_sense` — cmd.js:6628–6649; C dungeon.c:1546–1565; sole C caller
  u_on_newpos `:1609`.
- Callee `Upolyd` — const.js:3201 (`export function Upolyd(player)`).

## C ↔ JS fidelity

Walked the whole body against C, now that it runs for the first time:

```c
if (!Race_if(PM_DWARF)) return;
if (u.usteed || Flying || Levitation || Upolyd) return;
if (levl[u.ux][u.uy].typ != CORR && levl[u.ux][u.uy].typ != ROOM) return;
for (otmp = svl.level.buriedobjlist; otmp; otmp = otmp->nobj)
    if (u_at(otmp->ox, otmp->oy)) {
        You("sense something below your %s.", makeplural(body_part(FOOT)));
        return;
    }
```

JS: `urace.mnum !== PM_DWARF` → return. The fixed guard. `typ !== CORR
&& typ !== ROOM` → return. Then a search of buriedobjlist (array form
via `some`, or a linked `nobj` walk) for an object at `(u.ux, u.uy)`,
which prints the same You() line once. The bodies agree arm for arm. No
RNG on either side.

## Hallucinations / overclaim

The D-log Named line is **false**: "js/do.js:3539 has the same bare
`Upolyd &&` … behavior-neutral". do.js:3538 declares a local boolean
`const Upolyd = (u.umonnum | 0) !== (u.umonster | 0);`, which shadows
the import, so do.js:3539 is a correct macro read, not a bare function
reference. The claim is harmless (it asked for no change), but it names
a bug that is not there.

A sweep for the same family (`Upolyd` neither called nor shadowed) finds
one real site, in a different form: apply.js:800 use_mirror's self-look
tests `u.Upolyd`. `grep` shows **zero writes** to `u.Upolyd` in js/
(potion.js:2344's comment already says so). So C's `else if (Upolyd)
You("look like %s.", an(pmname(...)))` (apply.c use_mirror, arm 6 of the
self-look chain) is dead in JS. A polymorphed hero who applies a mirror
to themselves gets «You look as <visage> as ever.». The 3 corpus rows
owned by use_mirror (apply.c:1041, options sessions) are misattributed
«You see your kitten.» toplines, not this arm. Unreached.

## Density

A one-token fix on the owner, which brought a never-executed function
to life. The D-log's extra sweep (673 PASS, 0 regressed; 750 «dwarvish»
archived sessions PASS) was the right precaution.

## Verification

```text
verify earth_sense (--base 215135828~1): scen-sweep-Archeologist-620069 PASS → PROGRESS
```

Exact match with the D-log (1386/1386).

## Actionable C-wrongs

1. apply.c use_mirror self-look: `u.Upolyd` (phantom, zero writers) →
   `Upolyd(u)` so the «You look like %s.» arm can fire. Unreached →
   ledger use_mirror `partial` (this audit sets it, with the omit). It
   rides with the next apply.c cliff, not Must-fix.

Verdict: **ACCEPT-WITH-DEBT**
