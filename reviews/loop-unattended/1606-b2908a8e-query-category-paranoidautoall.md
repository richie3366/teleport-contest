# Review 1606 — b2908a8e — pickup.c query_category ParanoidAutoAll arms (D-2647)

**Metadata:** SHA `b2908a8e`, `pickup.c` `query_category`, D-2647. JS:
`js/pickup.js` (+77/−28: CHOOSE_ALL hint arm + post-menu confirm
block). No prior review claimed closed.

## Intent vs deliverable

Subject promises: the ParanoidAutoAll `verify_All` flip (`:1326`),
once-only A_first/A_second hint counters (`decl.h:167–168`), the
post-menu `paranoid_ynq` confirm (`:1455–1493`), and the lone-'A'
rejection as `else if` (`:1495–1501`). Diff delivers all four. Promise
matches deliverable.

## Inventory

- `query_category`: `let verify_All = false :1246`; CHOOSE_ALL hint
  selection with `game.A_first_hint` / `game.A_second_hint` counters;
  post-menu `verify_All` confirm block (findIndex first 'A',
  y-honor / n+splice / n+convert-to-ALL_TYPES_SELECTED / else-cancel);
  lone-'A' rejection demoted to `else if`. Doc comment updated.
- Imports joined to pre-existing edges only (`PARANOID_CONFIRM` /
  `PARANOID_AUTOALL` → const.js; `paranoid_ynq` → getline.js).
  No deleted symbol, no clone→import re-point.

## C ↔ JS fidelity

C locus `pickup.c:1225–1508` (284 L) read here; key arms `:1316–1345`
and `:1450–1508` quoted above. No RNG either side. Arm-by-arm confirm:

- `:1326` `verify_All = (how == PICK_ANY) && ParanoidAutoAll` ≡ JS
  verbatim ✓.
- Hint counters: C `if (!ga.A_first_hint++ || iflags.cmdassist)` ≡ JS
  `if (!(game.A_first_hint | 0) || cmdassist !== false)` + increment
  (`| 0` covers the `decl.c:193` zero-init for a fresh game object) ✓;
  `else if (show_a)` second-hint shape exact ✓; `add_menu_str` ⇒
  non-selectable row ≡ menu-arch convention ✓.
- Post-menu `:1455–1493`: `n > 0` gate subsumed by JS's early
  `!picked.length` return ✓; first-'A' scan (`findIndex` ≡ the
  `break`-from-for) ✓; `ParanoidConfirm` bit → `paranoid_ynq`
  (awaited — `sym.mjs`: async export js/getline.js:1318, await
  required ✓); y-honor / n+splice-when->1 / n+convert-lone-'A' (gated
  on ALL_TYPES) / quit-ESC-cancel ≡ C's switch+FALLTHROUGH,
  including the fallthrough case (n==1, no ALL_TYPES → cancel) ✓.
- `:1495–1501` lone-'A' rejection as `else if` with the
  `!verify_All` subsumed by the branch shape ✓ + `pline` text kept.
- `cmdassist !== false` matches the file's pre-existing convention
  for the default-true flag — no new semantics.
- Callees LIVE: `paranoid_ynq` (getline.js:1318 async),
  `PARANOID_CONFIRM`/`PARANOID_AUTOALL` (const.js:1191 exports).
  No STUB in a live arm. OMITs (menu_loot clone arms, assert,
  debugpline0, alloc/free≡GC, PICK_NONE path) named with C cites.

## Hallucinations / overclaim

None. No "Match C" dispatch-over-stub; the callee (`paranoid_ynq`)
is a live import, awaited.

## Density

Breadth phase: 77 insertions closing a four-arm gap in one live
function — right-sized, single subsystem.

## Verification

D-log Verify bullet claims PASS + smoke REACH-OK. Re-measured here:
`hidden-proxy.mjs verify query_category --base b2908a8e~1
--reach-all` → 0 blocked both sides (vacuous note quoted verbatim,
correctly labeled) + smoke 24/24 REACH-OK, no REGRESSED. Claim true.
Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates/fastforward.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
