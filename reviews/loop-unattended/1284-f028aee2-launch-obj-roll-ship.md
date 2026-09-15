# Review 1284 — f028aee2 — trap.c launch_obj ROLL-path ship arms + ship_object worn/unhide residuals (D-2318)

Metadata: SHA `f028aee2`, D-2318, C-fidelity residuals (row cited 0 blocks). Method: `git show` full `js/` hunks (`js/trap.js` +62/−8 approx, `js/dokick.js` +36/−22 approx; 114+/44− overall); C `launch_obj trap.c:3259-3575` (`csym.mjs` range + direct reads `:3423-3430`, `:3508-3532`), `ship_object dokick.c:1638-1766` (`csym.mjs` range + direct reads `:1686-1693`, `:1714-1716`); `sym.mjs` on remove_worn_item / maybe_unhide_at / flooreffects / down_gate / sobj_at / wake_nearto (required — local clone `remove_worn_item_ship` deleted in favor of the export, outputs pasted below); grep proving the clone + orphaned `wield.js` import are fully gone; `imports.mjs --can trap.js sndprocs.js` + `--rulecheck`; added-lines banned-pattern grep; `hidden-proxy verify ship_object --base f028aee2~1` re-run.

## Intent vs deliverable

Subject promises: ROLL gate-drop pre-block, post-switch `flooreffects "fall"`, boulder-on-boulder chain in `launch_obj`; `ship_object` full `remove_worn_item` via live export (clone deleted) + nodrop-impact `maybe_unhide_at`. Diff delivers exactly that with stated import mechanics. Promise kept.

## Inventory

- `launch_obj` ROLL: `down_gate(x,y) !== MIGR_NOWHERE → ship_object → used_up + launch_drop_spot(null,0,0) + break` pre-block (dynamic `dokick.js` import, file convention — no static `dokick.js` edge exists in `trap.js`, verified by grep); post-switch `flooreffects(singleobj,x,y,'fall')` used_up path (dynamic `do.js` import; static `do.js` edge already exists so harmless); boulder chain (`sobj_at` guard, hits/motion `bmsg`, `se_loud_crash` + cansee-gated `You_hear`, `obj_extract_self` + otrapped pass-off + `place_object` + swap + `wake_nearto(x,y,10*10)`).
- `ship_object`: `remove_worn_item_ship` clone + its `wield.js` (`setuwep/setuqwep/setuswapwep`) import deleted; owornmask arm → dynamic `steal.js remove_worn_item(otmp,true)`; nodrop-impact arm += `await maybe_unhide_at(x,y)` (joins existing `monmove.js` import).
- Static import joins only: `Soundeffect`, `se_loud_crash`, `MIGR_NOWHERE`, `maybe_unhide_at`.

## C ↔ JS fidelity

Pre-block vs C `:3423-3430` (`down_gate != -1 → ship_object → used_up + launch_drop_spot(0,0,0) + break`): order, predicates, and tail identical; `MIGR_NOWHERE = (-1)` (`const.js:1103`) makes `!== MIGR_NOWHERE` exact ✓. Placement is C-ordered (first statement of the `style==ROLL` block, after the ohitmon/u_at arms — confirmed against both bodies) and `break` exits the same `while` loop ✓.

Post-switch vs C `:3508-3513` (`flooreffects(singleobj,x,y,"fall")` → used_up + drop-spot clear + break): identical, and correctly positioned after the trap-switch's `used_up||dist==-1` break ✓.

Boulder chain vs C `:3514-3532`, token-for-token: `otyp==BOULDER && sobj_at(BOULDER,x,y)` guard order preserved via the ternary short-circuit (no `sobj_at` call for non-boulders) ✓; default `bmsg` motion vs `!isok||!dist||IS_OBSTRUCTED` hits ✓ (`ftyp` pre-read is OOB-safe: `at()` → `?? 0`, and `!isok` short-circuits first exactly as C's `||` does); draw-free `Soundeffect(se_loud_crash,80)` before `You_hear("a loud crash%s!")` with the `cansee?...:""` in the template ✓; `obj_extract_self` + otrapped pass-off + `singleobj.otrapped=0` + `place_object` + `singleobj=otmp2` + `wake_nearto(x,y,10*10)` ✓ (C's trailing `otmp2=NULL` unneeded — block-scoped `const`).

`ship_object` vs C: nodrop arm `:1688-1693` (`impact → impact_drop + maybe_unhide_at → return FALSE`) now exact ✓; worn arm `:1714-1716` (`owornmask → remove_worn_item(otmp,TRUE)`) now exact, placed before `breaktest` as in C ✓. The deleted clone only cleared uwep/uquiver/uswapwep — every armor/ring/amulet/tool/ball-chain path was a live C-wrong, so deletion (D-1849: import the export) is the fix, not a regression. Grep confirms zero remaining references and no other `wield.js` users in `dokick.js` (import removal safe).

Callee closure: `down_gate js/dokick.js:1707` sync, `flooreffects js/do.js:678` ASYNC awaited, `remove_worn_item js/steal.js:245` ASYNC awaited (dynamic — no static edge, `breaktest` precedent), `maybe_unhide_at js/monmove.js:1246` ASYNC awaited, `sobj_at js/mkobj.js:2201` sync, `Soundeffect` no-op sync. Required `sym.mjs` output:

```text
remove_worn_item js/steal.js:245   ASYNC — await required
             !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
               js/do_wear.js:611  js/steed.js:220
```

(the `do_wear`/`steed` clones predate this SHA and are untouched — observation only). `wake_nearto` at the new call site resolves to the file-local sync clone (`trap.js:1105`, zombies/wake_msg-narrowed — the CURRENT-landmarks D-2313 residual), not the ASYNC canonical (`mon.js:1266`); no floating async, and the call passes C-identical args, so no new divergence — but the arm ships on a CLONE callee whose residual is named at its definition + CURRENT landmarks, not in this commit's Named list. Acceptable (pre-existing, out of envelope), recorded here for the paper trail. `You_hear` likewise the file's standing local clone, awaited ✓. No STUB in a live arm. Named omits (closed_door crash, STWALL Thump, LAUNCH_UNSEEN msgs, scatter MAY_*, curs_on_u, shop polish) each name an owning future row.

RNG walk: no `rn2/rnd/rn1/d` in any added line; enclosed draws (`ship_object` billing, `flooreffects`, `wake_nearto` none) fire in C order.

## Hallucinations / overclaim

None. "No corpus divergence" + vacuous-explicit hidden note, pasted-tail honesty line, and both `--can` claims re-check clean (`--can trap.js sndprocs.js`: ALREADY — new-at-this-SHA, no cycle; `--rulecheck`: clean). Dynamic-import convention claims verified by grep (no static `dokick.js` edge; `do.js` static edge pre-exists).

## Density

Largest of the three in this audit (~70 js insertions across a 317-line C function + 129-line C callee, combined-arm with callee closure met). One envelope, one falsifier family. Good.

## Verification

D-log: `verify --fn ship_object` syntax/rule2/green 2/2/strict ×2/cohort 7/7 PASS with vacuous-honest hidden note, final verify after last `js/` edit. Re-measured by this review:

```text
verify ship_object: baseline f028aee2~1 (scoreboard at 775e5959) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches — no `--base` debt (row cited 0). Added-lines grep: no FORCE/DIAG/`getRngLog`/`fastforward`/seed-gates/coords. Full-44 cadence run follows at iteration end.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
