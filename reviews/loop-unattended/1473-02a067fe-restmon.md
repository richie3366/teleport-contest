# Review 1473 — 02a067fe — restore.c restmon whole body (D-2514)

Metadata: SHA `02a067fe`, new `js/restore.js` (208 L) + `js/lev_json.js` wiring. Coverage MISSING → live. NN 1473.

## Intent vs deliverable

Subject promises whole-body `restmon` (`:307–373`) plus `newmextra`/`new_mgivenname`/`newebones`/relative-time helpers, wiring both C callers. Diff actually adds exactly that: `new/restore.js` with six exports, and `lev_json.js` calls `restmon` from `deserMon` (chain, `:393`) and `deserObjChain` (OMONST, `:209–210`). Matches the promise. The `restmon_edog` import is dropped from `lev_json.js` (function itself stays live at `js/makemon.js:307`).

## Inventory

New JS: `newmextra`, `new_mgivenname`, `newebones`, `moves_to_relative_time`, `relative_time_to_moves`, `restmon` (all `js/restore.js`, sync per `sym`). Changed: two call sites in `js/lev_json.js`. Required `sym` output: `restmon_edog — js/makemon.js:307 sync` (still defined, only the import re-pointed); `restmon — js/restore.js:134 sync`.

## C ↔ JS fidelity

Checked against pinned C `restore.c:306–373` (`csym` range) plus `do_name.c:31–57`:

- `:311` base read → blob already on `mtmp` (JSON analogue, named); `:313–314` `nmon = null` ✓; `:316` null-mextra early return (no length words read) ✓; `:317` fresh `newmextra()` (mcorpsenm NON_PM) ✓.
- mgivenname `:320–325`: presence gate + `new_mgivenname(len+1)` + blob copy mirrors C's buflen-then-alloc-then-`Sfi_char`; `new_mgivenname` lth-nonzero/zero arms match C `:36–46` (ensure-mextra/drop-old vs drop-old-keep-mextra). ✓
- egd/epri/eshk/emin/ebones arms: presence gate → `new*` + `Object.assign` = C `Sfi_int` gate + `new*` + `Sfi_*` struct fill, in C order. `newebones` zeros + `parentmid = m_id` match `bones.c:818–830` (saved blob overwrites after, as C's struct read does). ✓
- edog `:351–361`: rebuild + `ogoal` int-coerce + `apport <= 0 → 1` sanity (`:358–360`) ✓; the `relative_time_to_moves` pair is skipped with a named wire-format reason — verified the save side (`js/makemon.js:304,337,341` `savemon_edog`) stores absolute times, so the round-trip is consistent, not a silent drop. `mtmp.edog` mirror kept for dog readers; stale top-level `edog` deleted when the blob has none. ✓
- mcorpsenm `:369–371`: unconditional read → number-gated copy, NON_PM default for pre-port JSON (named). ✓

Aliasing note: `saved` is aliased before `mtmp.mextra = newmextra()`, and every `dst` is freshly allocated by its `new*` call before `Object.assign(dst, saved.*)` — so no old/new mextra aliasing. When `mtmp.mextra` starts null, JS returns after only `nmon = null`, matching C (no length words read in that case).

Callee closure: `newegd/newepri/neweshk/newemin/newedog` all LIVE imports from `makemon.js`; Sfi_* named (JSON analogue, Rule #2). Callers: both C sites (`:210`, `:393`) wired in `lev_json.js`. No clones, no stubs, no FORCE/DIAG/coords/seeds. `imports.mjs --rulecheck` clean (re-ran this iteration).

## Evidence detail

Required `sym` outputs (re-point check): `restmon_edog — js/makemon.js:307 sync` (function retained, only the `lev_json.js` import re-pointed to `restmon`); `restmon — js/restore.js:134 sync`.

`new_mgivenname` vs C `do_name.c:31–47`: nonzero lth → `!mextra ? newmextra : free_mgivenname` then `alloc(lth)`; zero lth → drop name, keep mextra. JS: nonzero → `!mextra ? newmextra : delete name keys`, placeholder `''` overwritten by the blob copy next (mirrors `Sfi_char :324`); zero → delete name keys, keep mextra. C `free_mgivenname` frees only when `has_mgivenname`; JS deletes only when non-null — same guard. The lth passed is `saved.mgivenname.length + 1`, matching C's NUL-inclusive buflen convention.

`newebones` vs C `bones.c:818–830`: ensure mextra, alloc-if-absent, zero, `parentmid = m_id`. JS builds the zeroed struct with `parentmid: m_id | 0`, then `Object.assign(dst, saved.ebones)` overwrites — the same order as C's alloc-then-`Sfi_ebones` fill, so a stale `parentmid` cannot survive.

Save-side consistency for the skipped `relative_time_to_moves` pair: `savemon_edog` (`js/makemon.js:304,337,341`) stores `droptime`/`hungrytime` absolute (`edog.droptime | 0`, no relativization; `game.moves` restores before monsters). So restore-side add-back would corrupt; skipping is the correct round-trip, and `relative_time_to_moves` stays a live export for any future relativizing wire. `moves_to_relative_time` (save direction, `save.c:868–869` analogue) is likewise exported but unused — a helper, not a stub in a live arm.

## Hallucinations / overclaim

None. "0 blocked" presented with the vacuous note; the queue-refill line names its rows verbatim.

## Density

Right-sized: one C function family (restmon + its small alloc helpers), one new module + two call-site wires.

## Verification

- Re-ran `hidden-proxy.mjs verify restmon --base 02a067fe~1 --reach-all`: 0 blocked (vacuous, correctly labeled) + fixed smoke 24/24 PASS, 0 regressed → REACH-OK. Matches the D-log.
- D-log cites green 2/2, strict ×2, cohort 7/7 — consistent with a save/restore path the corpus never blocks on.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
