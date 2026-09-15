# Review 1327 — 719c1a6a — doeat Strangled/uedibility/artifact/rust arms (D-2361)

Metadata: SHA `719c1a6a`, `js/eat.js` only (+152). No new modules; import
extends all join pre-existing edges (`y_n` getline, `set_bknown` mkobj,
`Tobjnam` objnam, `W_RING/NOSE` const, `freeinv` invent, `welded` wield,
`surface` sit, `retouch_object`/`touch_artifact` artifact,
`remove_worn_item` steal). D-log: D-2361, map-named row, 0 blocked.

## Intent vs deliverable

Subject promises four latent C-wrongs in otherwise-live `doeat`:
Strangled gate, blessed food-detection (`edibility_prompts`),
carried→`retouch_object` else `touch_artifact` blast gate, poly
rust-monster rustproofed-metal arm. Diff adds exactly those four in C
position plus the file-local async `edibility_prompts`. Matches.

## Inventory

- `edibility_prompts(otmp)` — new file-local async (C `staticfn`, so
  local is correct; not a clone).
- `doeat` — Strangled head, uedibility block, artifact-blast arm,
  rustproof arm. No other function touched.

## C ↔ JS fidelity

`edibility_prompts` vs C `eat.c:2626–2731` (body re-read above):
cadaver/EGG/TIN/GLOB gate, stoneorslime (petrify + green-slime
override), worst-case rotted `(moves-age)/10` ±2, then the 11-prompt
chain tainted → stone/slime → tainted-resistant → rotten → poisonous →
sleep-apple → monk → acidic → rustproof → vegan → vegetarian with
verbatim messages and `Eat it/one anyway?` suffix. Return `1/2/0`
matches. `y_n(buf)` ≡ `yn_function(buf, ynchars, 'n', TRUE)` verbatim
(`js/getline.js:1531`). Branch-by-branch confirm.

`doeat` vs C `:2826–2912` (body re-read): Strangled first returning
ECMD_OK=0 ✓; `uedibility` block with `Your nose stops tingling...`
(via `Your`-equivalent pline + `body_part(NOSE)`), flag cleared,
`res==1 → return 0` ✓; artifact arm `carried ? retouch_object(&otmp,
FALSE) : touch_artifact(otmp, &youmonst)` → TIME=1 on failure, in C
position after the wornmask arm ✓ (by-value `otmp0` vs C `&otmp` is the
disclosed "retouch thinness", pre-existing); rust arm: `rknown`,
quan>1 split (`!carried → splitobj(quan-1)` else take `splitobj(1)`,
null-guarded), Ulch pline, `oerodeproof = 0`, `make_stunned((HStun &
TIMEOUT) + rn2(10))`, welded/cursed-ring spit-out vs surface spit +
remove_worn/freeinv/dropy/stackobj, `return 1` ✓. Order
artifact → rust → slow-digestion matches C. Confirm.

Callee closure: `retouch_object` (`artifact.js:1343` ASYNC),
`touch_artifact` (`:1268` ASYNC), `remove_worn_item` (`steal.js:245`
ASYNC) — all awaited LIVE imports. `sym.mjs` notes 2 pre-existing local
clones of `remove_worn_item` (do_wear/steed); this commit correctly
imports the export rather than adding a third. `--can eat.js →
artifact.js` ALREADY. Confirm.

## Hallucinations / overclaim

None. Named omits listed (slow-digestion dknown→trycall, worn wording,
COIN pre-check, livelog conducts, retouch thinness).

## Density

~152 insertions, one C function + its static helper — right-sized.

## Verification

- Added-line banned grep: clean.
- Re-measured: `verify doeat --base 719c1a6a~1` → `0 blocked (0 at
  baseline, 0 working)` — vacuous as disclosed; row cited 0 blocks.
  Confirm.
- Green/strict/cohort per D-log `verify.mjs --fn doeat` → VERIFY: PASS
  (quoted; tree has since moved).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
