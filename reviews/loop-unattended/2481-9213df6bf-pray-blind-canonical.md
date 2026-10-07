# Review 2481 — 9213df6bf — pray Blind canonical (D-3600)

**Metadata.** SHA `9213df6bf` (2026-10-07, D-3600). Type: **cliff**:
writer fix for the cliffs head `mhitu.c mattacku` (3 corpus
blocks; parked PRESENCE-ONLY — writer deliverable). The shimmer
is written by `dopray`'s `!Blind` gate, which read a local clone
blind to FROMFORM. `js/` insertions: 3 (`js/pray.js` +3/−4) +
new test.

## Intent vs deliverable

Promise: delete the pray.js `Blind` clone (`u.Blind||u.ublind`
flats), import canonical invent.js `Blind`
(`(HBlinded||EBlinded)&&!BBlinded`, youprop.h:103); all ~20
pray.js reads go canonical; engulf-Ranger moves past mattacku.

Diff actually adds: one import name + the deletion + comment.
Promise matches diff.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | dopray p_type==3 shimmer gate (Blind re-point) | ported | [pray.js](/home/debian/dev/teleport-contest/js/pray.js:2055) | pray.c:2265–2270 + youprop.h:103 |

Helpers: none added. Clone deleted (see sym output below).

## C ↔ JS fidelity

**C gate confirmed.** pray.c:2265–2270 (read): `if (p_type == 3
&& !Inhell) { if (!Blind) You("are surrounded by a shimmering
light."); u.uinvulnerable = TRUE; }` ✓. `csym dopray` →
pray.c:2198–2273 ✓. `#define Blind ((HBlinded || EBlinded) &&
!BBlinded)` (youprop.h:103, re-read) ✓ — a FROMFORM HBlinded
hero IS Blind in C, so C suppresses the shimmer.

**JS gate now mirrors C.** [pray.js](/home/debian/dev/teleport-contest/js/pray.js:2055)
`p_type===3 && !Inhell()` → `!Blind()` → shimmer →
`uinvulnerable=true` — same order, same arms ✓. Canonical
[invent.js](/home/debian/dev/teleport-contest/js/invent.js:368)
`Blind()` reads `(HBlinded||EBlinded)&&!BBlinded` (+ a
pre-existing uroleplay arm, out of this SHA's scope) ✓. The old
clone could never see FROMFORM (flats only) — the exact
divergence (eyeless-jelly hero, HBlinded=0x10000000 both sides).

`sym.mjs Blind` (required paste): `Blind js/invent.js:368 sync
!! ALSO 30 LOCAL CLONE(S) in 30 files` — and `grep -o
js/pray.js` on that output is empty: the pray.js clone is gone,
no local `Blind` definition remains (only the untouched
Blindfolded/BlindedTimeout/BlindedProp siblings). Parent
pray.js:79 already imported from invent.js → no new edge ✓.

## Hallucinations / overclaim

None. "dopray body verified whole by reading vs C :2199–2273"
is a reading claim consistent with the gate re-read here; the
sibling-locals and other-files-clones scoping is explicit, not
swept.

## Density

Cliff §10.18: parent queue head is mattacku (3 blocks, RNG 590 —
re-read from `9213df6bf~1:docs/LOOP-QUEUE.md`), tag parked
PRESENCE-ONLY → writer deliverable is exactly what shipped. One
cliff, own `Ledger:` touch (D-3600 on dopray), movement on the
named probe with the other two honestly held as other-writer.
Per-function verdict ACCEPT → SHA ACCEPT.

## Verification

- Added-code grep: clean (import + deletion + comment).
- Rule #2: `imports.mjs --rulecheck` clean (run this iteration).
- Committed test `pray-blind-shimmer.test.mjs`: PASS now.
- Re-measure (mine): `verify mattacku --base 9213df6bf~1
  --reach-all` → **0 PASS, 1 moved past, 2 unchanged, 0
  worse** (engulf-Ranger-94312 → look_here@122; the two held
  sessions show matching weapon-wield topline divergences, a
  different writer) + reach 415/415 REACH-OK. Matches the D-log
  exactly. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
