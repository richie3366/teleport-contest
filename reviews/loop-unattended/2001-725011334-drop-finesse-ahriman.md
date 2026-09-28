# Review 2001 — 725011334 — do.c drop whole + finesse_ahriman port

Metadata: SHA `725011334`, D-3041, js/do.js (+80/−~30) + js/artifact.js (+50).

## Intent vs deliverable

Subject promises "`do.c` drop whole + `finesse_ahriman` port". Diff
actually adds: restarted `drop`, new `finesse_ahriman` export, import
extensions riding existing edges (W_ART/STOMACH consts, yobjnam, s_suffix
from canonical do_name.js per D-2268, weldmsg, mbodypart,
finesse_ahriman). Matches promise.

## Inventory

- `drop` (restarted export) — C do.c:713–780 (csym range; commit cites
  :714–780, same body).
- `finesse_ahriman` (new sync export) — C artifact.c:2235–2260.

## C ↔ JS fidelity

`drop` arm-by-arm vs C: null :716–717 ✓; canletgo :718–719 ✓; corpse
fatal-touch :720–721 ✓; unwield + welded→weldmsg :722–728 ✓ (async
`weldmsg` awaited — sym: js/wield.js:203 ASYNC; comment notes the arm is
unreachable while canletgo rejects welded uwep first, same as C);
quiver/swap clear :729–734 ✓; swallowed verbose block :736–751 with the
`mon_nam`-before-`doname` order (s_suffix buffer reuse :741), digests →
`s_suffix + mbodypart(STOMACH)` :743–746, unpaid → yobjnam :748,
`You("drop %s into %s.")` :750 ✓; ring-over-sink dosinkring :753–757 ✓;
levitating arm :758–772 with levhack probe :762, `ELevitation = W_ART`
:764–765 (flat + uprops slot per set_spfx_extrinsic convention),
ungated verbose :766–767, freeinv :768 (via `freeinv_drop` core),
hitfloor :769 (pre-existing dynamic-import pattern), float_down :770–771
(awaited, ASYNC per sym js/trap.js:3297) ✓; altar-gated verbose :774–775
✓; how_lost + dropx :777–779 ✓. No RNG in C; none added. C order kept
with per-arm cites.

`finesse_ahriman` vs C :2235–2260: guard `!Levitation || non-artifact ||
inv_prop != LEVITATION || !(ELevitation & W_ARTI)` with `||`
short-circuit :2244–2246 ✓; save struct :2254 → saves slot triple +
H/E flats (dual-store analogue — C's H/ELevitation macros live inside
the same struct JS splits, so saving both stores is the faithful
mapping); clear masks :2255–2256 ✓; `result = !Levitation` :2257 ✓;
full restore incl. `blocked` :2258 ✓. Sync (no pline/input on path) ✓.
Sole C caller drop :762 wired in this commit ✓.

Callee closure: all LIVE (canletgo, dosinkring, freeinv_drop, hitfloor,
float_down, dropx, You/doname/yobjnam/s_suffix/mbodypart, Levitation,
get_artifact). No clones added (s_suffix taken from canonical export
despite 5 pre-existing clones elsewhere — correct choice), no stubs, no
omits. Diff grep: no FORCE/DIAG/RNG-log/fastforward output.

## Hallucinations / overclaim

None. "Every arm ported, every callee live" verified arm-by-arm above.

## Density

2 functions, caller/callee closure across two files (do.c + artifact.c
callee) — within §2b. Ledger entries for both. OK.

## Verification

D-log cites verify.mjs → PASS + REACH-OK ×2 + green/strict/cohort + full
44/44. Re-measured: `hidden-proxy.mjs verify drop,finesse_ahriman --base
725011334~1 --reach-all` → 0 blocked at baseline (vacuous, expected —
D-log says so), smoke 24/24 PASS each → REACH-OK, no regressions.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
