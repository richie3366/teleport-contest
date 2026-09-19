# Review 1476 — 7b5fbce5 — dothrow.c gem_accept whole body (D-2517)

Metadata: SHA `7b5fbce5`, `js/dothrow.js` (+105 L) + `thitmonst` caller wiring. Coverage MISSING → live. NN 1476.

## Intent vs deliverable

Subject promises whole-body `gem_accept` (`:2309–2382`) closing the `thitmonst` unicorn-catch else-arm deferral. Diff actually adds `export async function gem_accept` plus the one-line caller change (`return await gem_accept(mon, obj)`). Matches the promise; named: none.

## Inventory

New JS: `gem_accept` (async for `check_shop_obj`/`tele_restrict`/`rloc`); local `sgn` clone; same-edge import words (`has_oname`/`RLOC_MSG`, `tele_restrict`/`rloc`). Changed: `thitmonst` else-arm. No symbols deleted or re-pointed.

Import-edge detail: `has_oname`/`RLOC_MSG` join the existing const edge (the file already imports neighboring words from `./const.js`); `tele_restrict`/`rloc` join the existing teleport edge (`goodpos, rloc_to` on the same line). `GEMSTONE` is a file-local const already at scope, and `Monnam`/`change_luck`/`Blind`/`rn2` are established imports — zero new module edges, only words on live ones. `check_shop_obj` is the sole dynamic import, following the file's shk-call precedent.
RNG audit: the three draws (`rn2(7)` identified, `rn2(3)` guessed, `rn2(3)` unknown) each fire only in the non-buddy gem sub-arm, in C order, after the `is_buddy`/`is_gem` gates — no draw is added, removed, or reordered versus C, and the pacify writes (`mpeaceful`/`mavenge`) precede all draws on both sides.
Scope note: the sole C caller is `thitmonst :2097`, and the diff wires exactly that site plus its header comment. The other deferred items named on `thitmonst` (iron ball / boulder hit, potionhit, …) are untouched — correctly, since this row was only ever the gem arm.

## C ↔ JS fidelity

Checked against pinned C `dothrow.c:2308–2382` (`csym` range), branch by branch:

- Gates `:2320–2321` buddy/gem ✓. Message fragments + `Strcpy` pacify (`mpeaceful=1`, `mavenge=0`) `:2323–2324` ✓.
- Identified arm: +5 buddy / `rn2(7)−3` else / non-gem `nogood` → `goto nopick` (as `nopick` flag) ✓. Guessed arm (`has_oname || oc_uname`): +2 / `rn2(3)−1` / nopick ✓. Unknown arm: +1 / `rn2(3)−1` / non-gem `noluck` falls through to accept ✓. RNG call-for-call (draws only in the non-buddy gem arms).
- Accept `:2373–2377`: `ushops[0]/unpaid` → `check_shop_obj(..., TRUE)` (dynamic shk import, file precedent) + sync `mpickobj` (`sym`: `js/makemon.js:2149 sync` — un-awaited call correct) + `ret = true` ✓.
- `nopick:` `:2379–2381`: `!Blind → pline(buf)` (`pline1`→`pline` per apply.js precedent), `!tele_restrict → rloc(RLOC_MSG)` ✓.
- Caller: sole C caller `thitmonst :2097 return gem_accept(mon, obj)` → JS `return await gem_accept(mon, obj)` — exact, and the stale `thitmonst` header comment updated in the same diff ✓.
- `sgn` clone: `sym` reports 18 pre-existing local clones and warns against #19 — but C `sgn` is a `global.h` macro with no canonical export, and the clone is exact (`(x>0)-(x<0)`); repo-wide precedent, not drift. No other clones; no stubs; no FORCE/DIAG/coords/seeds.

## Evidence detail

Required `sym` outputs: `sgn — NOT EXPORTED, 18 LOCAL CLONES in 18 files (… js/dothrow.js:460 …)`; `mpickobj — js/makemon.js:2149 sync` (the un-awaited call in the accept block is correct).

C caller (`dothrow.c:2090–2098`): tame → "catches and drops" + `return 0`; else "catches" + `return gem_accept(mon, obj)`. JS `thitmonst` previously printed "catches" then `return false` with luck/mpickobj deferred; now `return await gem_accept(mon, obj)` — the C return value propagates (1 when taken → truthy consumed, 0 when nopick). The stale header comment ("gem_accept luck/mpickobj deferred") is updated in the same diff to credit D-2517.

`ushops` gate: C `*u.ushops` dereferences the first char of the shops string; JS `(u.ushops && u.ushops[0])` is the same truthiness. `pline1` → `pline` follows the apply.js precedent for C `pline1` (buf holds `Monnam` + fixed fragments; no format verbs are introduced by the port). `tele_restrict`/`rloc` are async in JS and both awaited; C sync → async is confined to those three callees (`check_shop_obj`, `tele_restrict`, `rloc`).

## Hallucinations / overclaim

None. "0 blocked" presented as a coverage gap with the vacuous note; the `/tmp/probe` values (luck +5/+2/+1, `rn2` residues) match the C arms re-checked above.

## Density

Right-sized: one 75-line C function + its caller wire, one module.

## Verification

- Re-ran `hidden-proxy.mjs verify gem_accept --base 7b5fbce5~1 --reach-all`: 0 blocked (vacuous, correctly labeled) + fixed smoke 24/24 PASS, 0 regressed → REACH-OK. Matches the D-log.
- D-log cites green 2/2, strict ×2, cohort 7/7.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
