# Review 1464 — a66b03ae — `do_wear.c` Amulet_on whole body (D-2505)

Metadata: SHA `a66b03ae`, `js/do_wear.js` +192/−100, `js/uhitm.js` +1/−1 (export keyword). C `do_wear.c:962–1087` (`Amulet_on`, 126 lines, staticfn). D-log: D-2505.

## Intent vs deliverable

Promise: C-order switch restart — no-op group, breathing, slime cure, change, strangulation, sleep, flying, guarding, yendor no-op, trailing `on_msg` — plus `can_be_strangled` export. Diff delivers every arm with `:line` cites. Promise = deliverable.

## Inventory

- Restarted: `Amulet_on` (js/do_wear.js:2466, module-local like C staticfn).
- New local `amulet_flight_now()` (complete Flying read incl. ridden flyer, blocked-respecting).
- `can_be_strangled` re-pointed local → export (body untouched, pre-existing C-cited).
- `sym.mjs` (required): the re-point target is the same function made export — no clone created or deleted. New import words all resolve to hoisted `export function` decls (`region_danger` region.js:1090; `can_be_strangled` uhitm.js:2859); `--can` reports both edges ALREADY present — no new cycle surface.

## C ↔ JS fidelity

Arm-by-arm against `do_wear.c:962–1087`: no-op group `:972–977` ✓; breathing `:978–995` (mask-out → `region_danger` → restore, `makeknown`+`on_msg`+`You`, `on_msg_done`) ✓; unchanging `:996–999` (`u.Slimed` is the JS-wide mirror read by apply/display/do, so the field read is convention-correct) ✓; change `:1000–1035` (makeknown-on-change, `on_msg` mid-body, `newsym`+botl on sex change, `You` forms per C, `call_it`+`trycall`, disintegrate via `pline_The`, `useup`; `livelog_newform` named log-only) ✓; strangulation `:1036–1046` (`can_be_strangled(youmonst)` + Strangled gate, `Strangled = 6` mirrored to field + uprops intrinsic per the polyself convention that display/apply/eat readers require, both botls, constrict pline) ✓; sleep `:1047–1055` (`rnd(98)+2`, TIMEOUT mask, FROMOUTSIDE preserved — sole RNG call, in order) ✓; flying `:1056–1076` (`float_vs_flight`, masked re-test, makeknown+on_msg+botl+`You` only when new) ✓; guarding `:1077–1080` ✓; yendor `:1081–1083` no-op ✓; trailing `on_msg :1085–1087` ✓.

Callers: C `:1551` (set_wear) ↔ JS:1250; C `:2418` (accessory don chain, same ring/amulet/eyewear comments) ↔ JS:2845 ✓.

Callee closure: `region_danger`, `can_be_strangled`, `make_slimed`, `float_vs_flight`, `is_flyer` LIVE; `Flying_dw` gap untouched as named (the new arm deliberately uses `amulet_flight_now`, not the gap reader). Named omits accurate. The had-guarded extrinsic restores (breathing/flying) vs C's unconditional restore are reasoned and disclosed in-code; they coincide whenever setworn conferred the bit.

## Hallucinations / overclaim

None. "Every other C arm is live" for the named set checks out.

## Density

Whole 126-line C function, two files, ~190 insertions. Breadth-phase right size.

## Verification

Re-ran `hidden-proxy.mjs verify Amulet_on --base a66b03ae~1 --reach-all`: 0 blocked both trees (row cited 0 blocks — vacuous note handled correctly); smoke 24/24 PASS, 0 regressed → REACH-OK. Matches the D-log. Diff grep clean (0 hits). Rule #2 clean globally.

## Actionable C-wrongs

None.

## Evidence appendix

Callers: `csym --callers Amulet_on` → C `:1551` (set_wear: `(void)
Amulet_on(uamul)`) ↔ JS:1250 `await Amulet_on(u.uamul)`; C `:2418`
(accessory don chain, same ring/amulet/eyewear comment ladder) ↔ JS:2845
`else if (amulet) await Amulet_on(obj)` with the identical comment shape —
both wired, no signature change (module-local, `async` for the `on_msg`
plines; C is sync but every caller already awaited).

Prop-mirror convention: `u.Strangled` is read across apply.js:4382,
display.js:5894, do.js:1176, eat.js:2704, insight.js:1413, mondata.js:745 —
so the arm's dual field+uprops write is required, not redundant; the
uprops-intrinsic write covers the `intr(STRANGLED)` readers. Same for
`u.Slimed` (apply/artifact/display/do readers). `can_be_strangled`
exported from uhitm.js:2859 with body untouched; both new import words
(`region_danger` region.js:1090, `can_be_strangled`) are hoisted
`export function` decls, and `--can` reports both edges ALREADY present —
no TDZ surface, no new cycle.

Had-guarded restores (breathing/flying) vs C's unconditional `|= W_AMUL`:
coincide whenever setworn conferred the bit, which is the only reachable
state for a just-donned amulet of that type; the in-code comment discloses
the reasoning rather than hiding it. Dual `game.disp.botl` +
`game.flags.botl` writes mirror the file's existing convention (both flags
are consumed by different paint paths).

Re-run output: `verify Amulet_on: baseline a66b03ae~1 — 0 blocked (0 at
baseline, 0 working)` + `smoke Amulet_on: no RNG-tagged reach; fixed smoke
spread (24 run): 24 PASS, 0 regressed → REACH-OK`. Diff grep for
FORCE/DIAG/getRngLog/fastforward/seed: 0 hits.

Verdict: **ACCEPT**
