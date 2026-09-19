# Review 1518 — da30a4b6 — mklev.c dosdoor (D-2559)

## Metadata

- SHA: `da30a4b6`
- D-id: D-2559. Next index: 1518.
- Files: `js/mklev.js` (+117/−~60: restarted
  `dosdoor`, file-local `alloc_doors`, re-ported
  `add_door`, `in_rooms` import join + stub
  deletion).
- C locus: `nethack-c/upstream/src/mklev.c:614–676`
  (`dosdoor`, 63 L; `csym.mjs` range) plus
  `add_door` `:573–612` and `alloc_doors`
  `:555–571` (both read directly), callers
  `:776`, `:780`, `:1802`.

## Intent vs deliverable

Subject promises: the whole door-creation body
in C order with the shop-door callee fixed and
all 3 C callers wired. Diff delivers exactly
that — and the headline fix is real: the old
code called a local `in_rooms(x, y, 0)` stub
that always returned `[]`, so `shdoor` was
permanently false; it now joins the live
`hack.js` export with `SHOPBASE`. RNG order
untouched (was already C-ordered). Promise
matches deliverable.

## Inventory

- Restarted: `dosdoor(x, y, aroom, type)`
  (sync), `add_door` (sync); new file-local
  `alloc_doors()` (C staticfn stays local).
- Callees, all LIVE: `in_rooms` (`js/hack.js:1596`,
  `goodtype` covers `SHOPBASE`-or-greater per C),
  `makemon`/`mkclass`/`set_mimic_sym`,
  `Is_rogue_level`, file-local
  `level_difficulty` wrapper (unchanged),
  `SHOPBASE`/`NO_MM_FLAGS` (already imported).
- Re-point audit (`sym.mjs`, required):
  `in_rooms` → single export `js/hack.js:1596`
  sync; local stub deleted, no second clone in
  mklev.js. Output pasted in-session. Clean.

## C ↔ JS fidelity

`dosdoor` vs C `:614–676`, arm by arm:
`:617` shop-gate ✓; `:619–620` wall coerce ✓;
`:623–633` `rn2(3)`/`rn2(5)`/`rn2(6)` open/
locked/closed + `rn2(25)` trap gate (open- and
shop-door exclusions intact) ✓; `:636–642`
shipped-`#else` arm (STUPID uncompiled ✓);
`:646–648` Rogue `D_NODOOR` before the mimic
check ✓; `:650–660` trapped-mimic (`diff ≥ 9`,
`rn2(5)`, triple-`G_GONE` De Morgan intact,
`NO_MM_FLAGS`) ✓; `:662` `newsym` stays
commented-out like C ✓; `:663–670` SDOOR
(`shdoor || !rn2(5)` short-circuit preserves
the no-draw-on-shdoor order; `diff ≥ 4` +
`rn2(20)` trap) ✓; end `doormask = flags` sync
(union per `rm.h:213`; nothing reads the cell
mid-body) ✓; `:673` `add_door` ✓.

`add_door` vs C `:573–612`: `alloc_doors()`
first ✓ (JS ensure-only; arrays self-grow and
the dup loop guards holes); doorct-gated dup
scan ≡ C's `if (doorct)` guard ✓; fdoor/doorct
bump ✓; shift loop bounds ✓; the
rooms+subrooms fdoor fixup folded into one loop
over `level.rooms` (pre-existing
`add_subroom` invariant, unchanged shape —
only the non-C `hx` guard dropped) ✓;
`doorindex++`-before-store per `:607–609` ✓.

Callers: `:776` SDOOR and `:780`
`rn2(5)?SDOOR:DOOR` wired with the `rn2(7)` /
IRONBARS envelope intact (`mklev.js:28504/28508`
vs C `:776–786`, verified in-session);
`:1802` `dodoor` same-file ✓.

## Hallucinations / overclaim

None. "Every arm and callee live or ported"
holds; the two named items (`newsym`
commented-out in C itself, uncompiled STUPID
arm) are accurate citations, not relabeled
stubs.

## Density

One 63-line C function + 2 helpers, one file,
~117 insertions. Right-sized per §2b.

## Verification

- D-log: `verify.mjs --fn dosdoor --reach-all`
  → PASS.
- Re-run here: `hidden-proxy.mjs verify dosdoor
  --base da30a4b6~1 --reach-all` → 0 blocked
  both trees + **reach 497 baseline-PASS
  sessions, 497 PASS, 0 regressed → REACH-OK**.
  Strongest re-run of this batch so far. Matches.
- `imports.mjs --rulecheck`: clean (re-run this
  iteration). Diff grep: 0 hits for FORCE/DIAG/
  getRngLog/fastforward/coordinates.

## Actionable C-wrongs

None. Branch order, RNG positions, caller
gates, and the stub→import re-point all check
out against pinned C.

Verdict: **ACCEPT**
