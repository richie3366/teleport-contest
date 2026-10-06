# Review 2445 — 3393f081f — m_move can_unlock `|| is_rider(ptr)` (D-3562)

**Metadata.** SHA `3393f081f` (2026-10-06, D-3562). Type: **cliff**:
writer port (one missing `can_unlock` clause) for the cliffs head
`monmove.c distfleeck`. `js/` insertions: 3 (`js/monmove.js` +3/−2) +
1 test file (32 lines).

## Intent vs deliverable

Promise: append the deferred `|| is_rider(ptr)` clause to `can_unlock`
in C short-circuit order so the keyless Astral Rider unlocks the locked
door (C «unlock and open») instead of smashing it (JS «crash open» +
`rn2(2)`); Hea-92055 141→PASS; truth-table + census test.

Diff actually adds: exactly that — one clause, one cite comment, the
deferred comment removed. Promise matches diff.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | `m_move` (one clause; body pre-existing) | partial | [monmove.js](/home/debian/dev/teleport-contest/js/monmove.js:2134) | monmove.c:1763–1767 |

Helpers: none added. `is_rider` is a **C callee** already imported
(monmove.js:14 — diff confirms no new edge).

## C ↔ JS fidelity

**The clause:** C monmove.c:1766–1767
`can_unlock = ((can_open && monhaskey(mtmp, TRUE)) || mtmp->iswiz ||
is_rider(ptr))` — read. JS :2134 is now token-identical modulo
`!!mtmp.iswiz` (C field is boolean — equivalent) ✓. Clause position is
last in the `||` chain both sides, so short-circuit order matches ✓.

**The callee:** C `is_rider` mondata.h:161–163 (Death/Famine/Pestilence
pointer triple) — read. Live export monsters.js:946 compares `mndx`
against the same three — equivalent under the mndx-indexed `mons[]`
layout ✓. `sym.mjs is_rider`: live sync export; the subject correctly
used it instead of the pre-existing mkobj.js:1024 local clone (not this
diff, not implicated — noted, not queued).

**The arms it routes between:** C postmov :1548–1600 — amorphous
ooze / `locked && can_unlock` → «unlock and open» :1554–1575 /
`closed && can_open` :1576–1592 / smash `!rn2(2)` :1593–1600 — read.
JS postmov :1755–1799 mirrors all four arms in order with identical
predicates and messages ✓. With `can_unlock` false the Rider fell into
the smash arm drawing :1796 `rn2(2)` — exactly the reported divergence
(C `rn2(5)=1 @ distfleeck` vs JS `rn2(2)=1 @ postmov`) ✓. Mechanism
closed: the fix routes the Rider to the unlock arm, no other behavior
changes (clause can only flip false→true for Riders).

Ledger: `m_move` omit retired the `:1766 is_rider` clause ✓; the
reveal_terrain recheck note is a disclosed one-line stale note inside a
real iteration (D-log Next), not a row ✓.

## Hallucinations / overclaim

None. "Body matches the C macro", "already imported, no new edge",
"census fails on HEAD code" all verified. The symptom evidence (rider
id/mndx 312, door (26,13), keyless inventory with otyp mapping) is
measured /tmp probe output, and the end-to-end movement below cashes it.

## Density

Cliff §10.18: distfleeck confirmed head-row context (D-3561 left
Hea-92055 @141 as the diagnosed next fork; this ships that writer). One
cliff, one clause, own `Ledger:` entry ✓. The NO-MOVEMENT SCOPE claims
are per-session with named JS draws — scope, not omission. The
m_move-owner scope note (Riders Astral-only) is a C-fact, and my
re-measure shows one of those three sessions PASS at HEAD via later
work — scope honesty, not a miss. Per-function verdict ACCEPT → SHA
ACCEPT.

## Verification

- Added-code grep (`^+.*FORCE|DIAG|getRngLog|fastforward|seed|coords`):
  clean.
- Rule #2: `imports.mjs --rulecheck` clean this iteration (all of
  scored `js/`).
- `node --test scripts/mmove-can-unlock-rider.test.mjs`: 2/2 pass.
- Re-measure (mine, `--base 3393f081f~1 --reach-all`, current code):
  `m_move`: **1 PASS, 0 moved, 2 unchanged, 0 worse → PROGRESS** (the
  PASS is descend-Tourist-94007, moved by later SHAs; the 2 unchanged
  are the named sokoban sessions); `reach m_move`: **665/665, 0
  regressed → REACH-OK**; `distfleeck`: **4 PASS, 0 moved, 1 unchanged
  (Wiz-94142@96, the live cliffs row), 0 worse → PROGRESS**;
  `reach distfleeck`: **724/724, 0 regressed → REACH-OK**. Hea-92055
  PASS durable at HEAD — the D-3562 claim holds. No REGRESSED.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
