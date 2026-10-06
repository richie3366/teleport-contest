# Review 2454 — 6cbd3abd7 — postmov/mb_trapped `!Deaf` macro gates (D-3572)

**Metadata.** SHA `6cbd3abd7` (2026-10-06, D-3572). Type: **cliff**:
writer port for the cliffs head `music.c do_improvisation`. `js/`
insertions: 4 (`js/monmove.js` +4/−4) + 1 test file (65 lines).

## Intent vs deliverable

Promise: the four unseen-door "You hear …" arms (mb_trapped ×1,
postmov ×3) read raw `u.Deaf` instead of the C `Deaf` macro; all four
gates → `!hero_Deaf()`; message text/ordering untouched; probe
Samurai-94217 step 27 → 228.

Diff actually adds: four one-line gate swaps with C-cite comments.
Promise matches diff.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | mb_trapped (1 gate) | ported | [monmove.js](/home/debian/dev/teleport-contest/js/monmove.js:1320) | monmove.c:59 |
| 2 | postmov (3 gates; tracked under m_move) | partial (omit stands) | [monmove.js](/home/debian/dev/teleport-contest/js/monmove.js:1774) | monmove.c:1571, :1588, :1613 |

Helpers: none. `hero_Deaf` is the live in-module export
(`sym.mjs`: `js/monmove.js:1197 sync`); the 3 clones it flags
(dbridge/invent/mhitu) are pre-existing, untouched, out of unit.

## C ↔ JS fidelity

**All four gates confirmed.** C read: `:59 else if (!Deaf)`,
`:1571 / :1588 / :1613 else if (!Deaf)` ✓ — same `verbose → canseeit →
!Deaf` ladder shape as the JS arms. Macro (`csym --macro Deaf`,
youprop.h:125): `#define Deaf (HDeaf || EDeaf || u.uroleplay.deaf)` ✓ —
matches the commit's "(HDeaf|EDeaf|roleplay)" cite.

**`hero_Deaf` ≡ macro.** JS (monmove.js:1197–1201, read):
`HDeaf || EDeaf || uroleplay?.deaf || u.Deaf`. The extra `u.Deaf`
disjunct is dead: two writer searches (`\.Deaf\s*=` and quoted
`'Deaf'` forms over `js/`) find zero writers — only a comment in
mail.js ✓. No behavior change from the dead arm.

**Mechanism fits:** the probe is a drum turn (hero deaf via timeout
property, not the never-written `u.Deaf` flag), so JS played the heard
message C suppresses; RNG matched through the turn, message-only
divergence — exactly what a gate swap moves.

## Hallucinations / overclaim

None. The `You_hear`-vs-`pline` shape gap is disclosed as Named (1)
and ledgered on `m_move`'s omit (read the row) rather than Must-fix —
correct: it is a pre-existing shape, not a C-wrong this unit
introduced. Named (2) (other files' raw reads left alone) respects the
one-cliff rule.

## Density

Cliff §10.18: head writer, one gate family, own `Ledger:` touches
(mb_trapped + m_move gain D-3572; no `postmov` ledger row exists —
m_move carries it per the D-3566 precedent; symptom owner
do_improvisation correctly untouched). Per-function verdicts ACCEPT ×2
→ SHA ACCEPT.

## Verification

- Added-code grep: clean (gate swaps + cites only).
- Rule #2: clean this iteration (see 2453).
- Re-measure (mine): `verify do_improvisation --base 6cbd3abd7~1
  --reach-all` → **0 PASS, 1 moved, 0 worse** (Samurai-94217 27 →
  l_obj_register@228) + reach 10/10 REACH-OK — the D-log's numbers
  exactly.
- Full `sessions` 44/44 claimed in-ship; re-covered by this audit's
  end-iteration gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
