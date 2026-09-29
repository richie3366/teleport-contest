# Review 2079 — 4e2ac5b98 — botl status-hilite query closure

- SHA: `4e2ac5b98` (D-3119)
- Subject: "botl.c status-hilite query closure: 3 menu ports + `splitsubfields` overflow fix (coverage cluster)"
- js/ insertions: ~130 (js/botl.js only)
- Prior index: 2078; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: port 3 MISSING menu-query functions whole
(`query_arrayvalue`, `query_conditions`,
`status_hilite_menu_choose_field`) over the shipped menu fold,
fix the `splitsubfields` overflow boundary, plus 2 stale declares
in the same iteration.

Diff actually adds: the 3 async exports in C order, the
splitsubfields cut-count fix with corrected cites, and 2 ledger
stale sets (uhitm.c/dbridge.c). Also fills the `c1be7a049` short
hash on the 2070 `**Addressed:**` line — the required next-commit
stamp, not scope creep. Matches the promise.

## Inventory

Per function (cluster of 4):

- `query_arrayvalue` (js/botl.js:3182, async export) — C
  botl.c:2746–2781 (csym range). Live: whole body.
- `query_conditions` (js/botl.js:3216, async export) — C
  :3108–3138. Live: whole body.
- `status_hilite_menu_choose_field` (js/botl.js:3252, async
  export) — C :3671–3704. Live: whole body incl. the
  SCORE_ON_BOTL-off skip arm.
- `splitsubfields` (js/botl.js:1707, local) — C :2686–2727.
  Live: overflow test moved to the pre-pop cut count.

Helpers: none added, none deleted, nothing re-pointed (no
`sym.mjs` re-point check required). New exports are unique,
async, single-definition (sym.mjs: one site each, no clones).
Callees are all in-file or dynamic-import precedent:
`select_menu_pick_one/pick_any` (dynamic options.js edge —
mirrors the in-file precedent at :1348/:3426, no new static
edge), `hiliteMenuRows`, `blstatFldName` (in-file local :3075),
`conditions` (live table :1153, `.mask`/`.text[0]` shape
verified), `game.gb.blstats` thresholds (live shape from
init_blstats :181–186).

## C ↔ JS fidelity

`query_arrayvalue`: ret=arrmin−1 (:2752), adj (:2756), loop
skipping NULL (:2763–2764 — JS `== null` skips null/undefined
but shows `""`, exactly C's pointer test), a_int=i+adj, menu
fold, res>0 → a_int−adj (:2776). Verbatim. No RNG either side.

`query_conditions`: 0UL init, rows over SIZE(conditions) with
mask/text[0], PICK_ANY, OR-accumulate (:3133–3134), `>>> 0`
unsigned-long return. The consume pattern (`Array.isArray ?
length : 0`, "cancel and finish-empty are both <= 0") is textually
identical to the shipped precedent at :3429. Verbatim.

`status_hilite_menu_choose_field`: BL_FLUSH init, MAXBLSTATS
loop, a_int=i+1, decode −1 (:3700). The `#ifndef SCORE_ON_BOTL`
skip (:3684–3688) is live: the define is commented out at
config.h:627 in **both** upstream and recorder trees and no patch
defines it — verified, not trusted. The thresholds read matches
the live `game.gb.blstats[0][BL_SCORE].thresholds` shape.

`splitsubfields`: the fix is a genuine fidelity repair. C's
`while (*c && sf < maxsf)` stores one segment **per separator**,
so `sf >= maxsf − 1` at :2716 counts separators cut; the old JS
tested post-pop `parts.length`, failing inputs C accepts (cap−2
cuts + trailing content → C returns cap−1; old JS returned
null). Traced both sides on trailing-separator, empty-segment,
leading-separator, and early-exit (sf==maxsf) cases — identical
outcomes, including `cuts >= cap−1 → null` for the
cap−1-cuts-with-trailing-separator case. Cites corrected too:
old `:2714-2715` pointed at `c++; }`; the overflow test is
:2716–2717, trailing store :2718–2719, else :2720–2723 — all
verified against the csym body.

Callers: the 3 menu functions' only C callers sit inside
`status_hilite_menu_add` (:4135/:4148/:4161/:4199, :4113, :3905),
which sym.mjs confirms is NOT FOUND in js/ — the named caller
omission is real, stated per-function in the D-log. splitsubfields'
3 C sites are all wired (:3034→:1916, :3215→:2064 with
`conditions.length` ≡ SIZE, :3292→:2107).

Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates. Rule #2
clean (iteration-wide).

## Hallucinations / overclaim

None. "Menu/config paths, no RNG" is accurate; the D-log claims
"0 blocked ×4" (vacuous, honestly framed) plus REACH-OK, not a
corpus PASS. The commit-message Named line abbreviates to one
function but the D-log entry names all three caller omissions.

## Density

4-function one-C-file cluster, ≤10, no Must-fix bundled,
per-function Ledger + C-locus/Caller/Verify/Named sub-bullets.
130 js/ insertions: under the 200 target but above the ~80 floor,
and the D-log notes all botl.c Open rows are now shipped (closure
complete). Per-function verdicts: all four ACCEPT. SHA: ACCEPT.

## Verification

Re-measured (`--base 4e2ac5b98~1 --reach-all`, all 4 in one
call): 0 blocked at baseline and working tree each, vacuous
notes printed, smoke 24/24 → REACH-OK ×4. Matches the D-log; no
REGRESSED session. Shared gates per D-log: syntax, rule2, green
2/2, strict ×2, cohort 7/7.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
