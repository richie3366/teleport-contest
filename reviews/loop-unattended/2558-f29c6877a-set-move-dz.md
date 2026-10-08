# Review 2558 — f29c6877a — set_move_cmd dz seeding (D-3683)

- SHA: `f29c6877a672b7b0fa4ffad04e540c13447dcf14`
- Subject: next-live-head `cmd.c` set_move_cmd: rhack walk/run/rush arms never wrote `u.dz`, stale getdir dz tripped climb_pit (scen-dig pit pair 44→PASS) (D-3683)
- D-entry: D-3683. Type: next-live-head (owner-null, pit pair + 1 latent).
- Diff size: `js/cmd.js` +16/-14 (3 arm tops + 3 deleted redundant blocks); + test; ledger D-tag.

## Intent vs deliverable

Promise: seed `u.dz/dx/dy` at the top of the three rhack
movement arms in C order (`:1389–1391`, dz=0 planar), so the
`:1396–1399` guard and later readers (climb_pit `:4218`)
see fresh dz; delete the three later dx/dy-only seed blocks
as redundant. Pit pair → PASS.

Diff actually does: exactly that. No new imports.
`domove`/travel/mv-replay untouched. No DIAG/FORCE/seed
reads.

## Inventory

| JS site | Change | C locus |
|---|---|---|
| walk arm (`js/cmd.js:5607`) | `dz=0/dx/dy` at arm top; guard reads fresh `!mu.dz` | `cmd.c:1389–1399` |
| forcefight arm (`:5683`) | same seeding | same |
| rush arm (`:5706`) | same seeding | same |
| 3 later blocks | dx/dy-only seeds deleted | (redundant with the tops) |

No symbols deleted or re-pointed (`sym.mjs` check N/A).
`dxdy_moveok` (the only reader between old and new seed
points) sees identical dx/dy; the only delta is dz
freshness — the intended fix.

## C ↔ JS fidelity

- `csym`: `cmd.c:1386–1400`. `:1389–1391`
  `u.dz=zdir[dir]; u.dx=xdir[dir]; u.dy=ydir[dir]` ✓;
  `:1395` travel clears ✓ (JS keeps them after the seeds);
  `:1396–1399` `if (!domove_attempting && !u.dz)` ✓ (JS
  guard now reads the fresh dz, always-true for planar
  like C).
- `mu.dz = 0` is exact, not approximate: `decl.c:79`
  `zdir = {0×8, 1, -1}` (planar first), and all three arms
  take planar keys only (`isMovementKey`: `hjklyubn`;
  rush/forcefight: lowercased `low` into planar `DIR_DX/DY`).
  `</>` never reach these arms in C or JS.
- Diagnosis chain verified: `trap.c:4218`
  `else if (u.dz || flags.verbose)` gates the "still in a
  pit" Norep — stale `dz=-1` (step-43 `<` getdir) with
  `!verbose` rc prints in JS where C (fresh dz=0) stays
  silent. RNG flat both sides (message paint is RNG-neutral).
- "C domove never writes dz": `csym domove` contains no `dz`
  ✓. Other C dz writers (`:3893/:3896 getdir-return,
  `:4023/:4058/:4070` getdir self/mouse paths) are
  getdir-local, untouched, and identical both sides.
- Pre-existing `nopick`/`menu_requested` (`:1393–1394`)
  staying in domove is disclosed, not smuggled; no
  interaction with the guard order claimed.

## Hallucinations / overclaim

None. The +1 full-rescore rider (Monk-91117) is explicitly
attributed to D-3682 latency with a two-way stash control,
not claimed as this fix's movement — and mechanism
corroborates it: the pre-fix row is RNG-flat (23948/23948)
with empty toplines both sides, which excludes both dz
effect classes (message gate → topline; run/behavior →
RNG). Rule #2 clean (iteration `--rulecheck`).

## Density

Next-live-head pop (Must-fix empty, head maxed
recorder-artifact, coverage empty, batch dry). One C
function prefix, own `Ledger:` entry. Right-sized.

## Verification

D-log claim: test 0/2 → 2/2; targeted rescore 926→928 (pit
pair), full rescore →929 (+1 Monk latent, controlled); 0
regressed; `verify` vacuous-hidden (owner-null) + REACH-OK +
green/strict/cohort + explicit full 44/44.

Audit re-measure: git scoreboard diff
`f29c6877a~1 → f29c6877a` shows exactly 3 changed rows —
Samurai-94155 44→PASS (8493/8493 + 236/236),
Archeologist-94035 44→PASS (6776/6776 + 99/99), Monk-91117
96→PASS (23948/23948 + 162/162) — PASS 926→929, zero other
rows (0 regressed, non-vacuous). `verify set_move_cmd
--base f29c6877a~1 --reach-all` reproduces 0-blocked +
REACH-OK (24/24). Claim reproduced exactly.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
