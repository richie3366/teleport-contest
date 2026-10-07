# Review 2469 — b1ef85d1b — mklev whole re-port, no blanket recount (D-3587)

**Metadata.** SHA `b1ef85d1b` (2026-10-07, D-3587). Type: **cliff**:
writer port for the cliffs head `botl.c do_statusline1`. `js/`
insertions: 39 (`js/mklev.js` +39/−21) + committed test.

## Intent vs deliverable

Promise: C's mkfount double count (recount + `++` = 2 for one
fountain cell) is upstream behavior the footer reads, but a
JS-only blanket recount in mklev collapsed it to 1; mklev is
re-ported whole in C order with no recount, the :6484 count moves
into load_special_proto, and a stale mksink comment is corrected.
4 fountain-footer sessions →PASS.

Diff actually adds: the re-ported mklev + deleted helper, the
`if (ok) count_level_features()`, the comment fix. Promise matches
diff. No symbols deleted besides the dead helper (zero remaining
references) or re-pointed.

## Inventory

| # | Function | Status | JS | C range |
|---|----------|--------|----|---------|
| 1 | mklev (whole, no recount) | ported | [mklev.js](/home/debian/dev/teleport-contest/js/mklev.js:2935) | mklev.c:1576–1593 |
| 2 | load_special_proto :6484 count | split (load_special row) | [mklev.js](/home/debian/dev/teleport-contest/js/mklev.js:3285) | sp_lev.c:6454–6502 |
| 3 | mksink comment (code untouched) | ported | [mklev.js](/home/debian/dev/teleport-contest/js/mklev.js:34169) | mklev.c:2316–2329 |

Helpers: none added. `count_level_features` is the live
same-module sync export (`sym.mjs`: `js/mklev.js:1149`); no new
edge, so no `sym.mjs` re-point output is required.

## C ↔ JS fidelity

**mklev is now C-whole.** `csym mklev` → mklev.c:1576–1593:
reseed×2, init_mapseen, getbones gate, in_mklev, makelevel,
level_finalize_topology, reseed×2 — no recount anywhere ✓. JS
follows in order; finalize (mklev.js:34689, read) resets
in_mklev after mineralize like C :1551 (read, exact line) ✓.
Reseed no-ops: rnd.c:289–294 gate on has_strong_rngseed (read),
ledger row already by-design ✓ — named, not omitted.

**The double count is real upstream behavior.** `csym mkfount` →
mklev.c:2284–2300: `set_levltyp(FOUNTAIN)` then `nfountains++` ✓;
set_levltyp mkmaze.c:77–121 recounts on fountain/sink-ness change
(:106–108, read) ✓ — so one cell counts 2 in C. JS reproduces
both halves (trap.js:883–886 gate, mklev.js:34134 `++`, both
read) ✓. mksink's corrected comment matches its code
(set_levltyp + `nsinks++`, read) ✓.

**The :6484 relocation is value-equal — verified, not trusted.**
C order (sp_lev.c:6460–6500, read): count :6484, then solidify,
fixup_special, premap_detect. JS counts after the inline tails.
All three post-count ops are fountain/sink-typ-neutral:
solidify_map (sp_lev.c:314–323, read) writes wall_info on STWALL
only, no typ write; fixup_special (mkmaze.c:569–704) has zero typ
writes in-range and typ-neutral callees (setup_waterlevel converts
STONE cells only); premap_detect (detect.c:2133–2159, read) writes
memory/seenv only ✓. Per-level epilogues run inside the body
(e.g. soko_load_epilogue wallify→flip→solidify→fixup→premap,
read), so the count lands after them as claimed ✓. No RNG in any
touched arm (pure scans + flag writes).

## Hallucinations / overclaim

None. The in-ship `--base 0fcddf3d7` (grandparent) is disclosed
with the D-3586 session correctly attributed, not claimed.

## Density

Cliff §10.18: cliffs-head writer, one function whole + one
epilogue count + one comment, own `Ledger:` touch (mklev +
load_special rows gain D-3587). Per-function verdicts ACCEPT ×3
→ SHA ACCEPT.

## Verification

- Added-code grep: only hit is the commit message text — code
  clean.
- Rule #2: clean this iteration (see 2462).
- Committed test `mklev-fountain-count.test.mjs`: 4/4 PASS now
  (pre-fix 3/4 wiring-pin FAIL claimed in-ship).
- Re-measure (mine): `verify do_statusline1,mklev --base
  b1ef85d1b~1 --reach-all` → do_statusline1 **5 PASS, 1 moved
  past, 1 unchanged, 0 worse** (the 4 fountain-footer PASS are
  this SHA's; Healer-94271 PASS + Archeo-94051 8→44 owner-null
  are cumulative via later D-3588; Tourist-94111@23 unchanged) +
  smoke 24/24 REACH-OK; mklev vacuous (0 blocked) + smoke
  REACH-OK.
- Full `sessions` 44/44 claimed in-ship, re-covered by this audit's
  gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
