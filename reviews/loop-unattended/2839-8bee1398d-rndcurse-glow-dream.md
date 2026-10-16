# Review 2839 — 8bee1398d — rndcurse glow gate + dream prefix

## Metadata

- SHA: `8bee1398d4f1d57e30d22d5916ed5bfd3390b741` (D-3994)
- Cliff: `sit.c` rndcurse, 11 blocks, two shapes under one owner
- js/ diff: `js/pray.js` 15 lines (Antimagic gate), `js/sit.js` 12
  lines (You vs You_feel); new `scripts/rndcurse-aura-glow-dream.test.mjs`
- Method: full per-function (≤10-function cliff commit)

## Intent vs deliverable

Promise: (A) 6 sessions show an extra `A black glow surrounds
you.` line because pray.js `Antimagic()` reads only flats while C
reads uprops — worn MR skips the glow in C (`pray.c:754-756`).
(B) 5 sessions show `You dream that you feel…` because sit.js
rndcurse calls `You_feel` where C calls `You`. Fix both; 9 PASS +
2 moved.

Diff actually: pray.js `Antimagic()` ORs in
`uprops[ANTIMAGIC].intrinsic/extrinsic` (D-1089 shape);
`ANTIMAGIC` added to the existing const.js import. Both rndcurse
arms switch `You_feel('a malignant aura…')` to `You('feel a
malignant aura…')`; `You` added to the existing display.js
import. Promise == diff.

## Inventory

- `Antimagic` (`js/pray.js:240`, C `youprop.h:55-57`): flats OR
  uprops. Clone brought to the canonical shape (not re-pointed to
  an import — no symbol deleted/re-pointed, so no `sym.mjs`
  paste required).
- `rndcurse` (`js/sit.js:274`, C `sit.c:568-638` via `csym.mjs`):
  two call fixes, bodies otherwise untouched.

## C ↔ JS fidelity

Glow shape. C `angrygods` (`pray.c:703-784` via `csym.mjs`)
case 4/5 (`:754-756` read): `if (!Blind && !Antimagic)
pline("%s glow surrounds you.", An(hcolor(NH_BLACK)))` ✓, then
`if (rn2(2) || !attrcurse()) rndcurse()`. C `Antimagic ≡
u.uprops[ANTIMAGIC].intrinsic || .extrinsic` (`youprop.h:55-57`
read) — single storage, no flats. JS now reads flats OR uprops:
the uprops disjunct is the C-exact term; the flats are the
pre-existing D-1089 house superset (accepted before, unchanged
here). The D-log's C-side proof is tight: Healer/Rogue drew
`rnd(3)` at `sit.c:593` — verified that `:593` is exactly the
`cnt = rnd(6/((!!Antimagic)+(!!Half_spell_damage)+1))` line, so
divisor sum 2 means exactly one of Anti/Half true in C, with
Blind ruled out by sighted maps.

Dream shape. C `rndcurse` calls `You(mal_aura, …)` in both arms
(`:577`, `:585` read; `mal_aura` at `:574` ✓). C `You`
(`pline.c:366-374` read) is a plain `"You "` prefix; C
`You_feel` (`:387-400` read) dream-prefixes iff Unaware. JS now
emits `You('feel a malignant aura surround …')` — char-identical
to C's expansion in both arms. No RNG touched (message-only
port); branch order untouched.

Caller table (D-log): rndcurse's 5 C callers pre-wired in JS,
angrygods' 5 pre-wired, the fixed helper's sole JS caller the
glow gate — change is internal to both functions, no rewiring
needed. `You` is the canonical display.js export, already
imported by sit.js's neighbors; both import edits extend
existing lists (no new edge).

Diff grep: no `FORCE`/`DIAG`/`fastforward`/seed/coordinate reads.
Rule #2: iteration-wide `imports.mjs --rulecheck` clean (see
review 2838).

## Hallucinations / overclaim

None. "Exactly like C" is earned for both arms (format string
and prefix verified). The D-log does not overclaim the flats:
it names the remaining flats-only clones (zap/spell/trap,
Half_spell_damage) as session-gated future work with a
falsifier each — the honest shape for a clone family.

## Density

Cliff phase §10.18: one cliff (rndcurse head), two shapes, both
moved to zero no-movement; code + ledger + verify + focused test
in one handoff. The moved sessions' new owners are named as
later iterations, not claimed. Right-sized.

## Verification

Re-measured on HEAD, baseline parent:

- `hidden-proxy.mjs verify rndcurse,angrygods --base 8bee1398d~1 --no-reach`
- `verify rndcurse: 9 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS`
- The 9 PASS are the exact ship-time sessions; the 2 moved land
  on the exact ship-time owners and steps (`nh_timeout@799`
  was 362, `one_characteristic@822` was 324).
- `verify angrygods: no corpus session is blocked` — expected
  (writer, not owner); D-log says so.

Ship-time reach 78/78 + 37/37, green, strict, cohort 7/7
corroborate; full-44 correctly skipped (no shared file).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
