# Review 478 — 8bfe0bc8 — makemon.c set_mimic_sym maze/sokoban/in_town (D-1517)

## Metadata
- Full / short hash: `8bfe0bc89953558c342334b819ce50680df29c48` / `8bfe0bc8`
- Parent: `cf3c5701` (D-1516). This file audits **this SHA only** (fifth of nine `js/` commits since review **473**). Archive **Addressed:** D-1517 `8bfe0bc8`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 02:31:50 +0200
- D-id: **D-1517**
- Stats: 9 files, +143 / −32 — `js/makemon.js` +43 / −4. Band 150–350 (js/ insertions 43).
- Claims to close: Open `makemon.c` `set_mimic_sym` maze/sokoban/`in_town` (named from D-1516). Not shop arm (D-0262). `reviews/loop-2026-08-15/` has no unpaid mimic Must-fix.
- JS / map: `makemon.js` `set_mimic_sym` + local `in_town`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: map omit after D-0262 shop; D-1516 named this as next Open.

## Intent vs deliverable

Git subject promises: maze mimics skip the statue roll only when `In_mines && in_town(u.ux,u.uy)`, not on every mines level.

Pinned C `makemon.c` `set_mimic_sym` `:2439–2443`: `is_maze_lev && !(In_mines(&u.uz) && in_town(u.ux, u.uy)) && !In_sokoban(&u.uz) && rn2(2)` then statue. Callee `hack.c` `in_town` `:3564–3585`: `!has_town` → FALSE; walk `svr.rooms` while `hx > 0`; if `nsubrooms > 0` set flag and `inside_room` → TRUE; else after the loop `!has_subrooms`. `mkroom.c` `inside_room` `:678–687`: irregular `!edge && roomno == (croom-rooms)+ROOMOFFSET`; else bbox including walls. Callers: `makemon` S_MIMIC, `mklev` `dosdoor`, `mon.c` restrap, zap heal. **Hero cell**, not mimic cell.

Old JS: `!(In_mines(uz) /* && in_town */)` so **every** mines maze skipped `rn2(2)`. Sokoban already short-circuited.

The diff **does** restore the C conjunct and add a local `in_town` / `inside_room_mimic` (cannot import `hack.js`: hack → trap/mon → makemon). It **does not** port altar Align2amask / door `S_hcdoor` / Protection_from_shape_changers. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `set_mimic_sym` maze arm | C `:2439–2443`, **LIVE this SHA** | |
| `in_town` | C `hack.c:3564`, **CLONE this SHA** | 2nd copy; live export is `hack.js:1968` |
| `inside_room_mimic` | C `mkroom.c:678`, **CLONE this SHA** | 3rd body (mklev + hack `inside_room_town`) |
| `In_mines` / `In_sokoban` | C dungeon.h, **LIVE** | |
| shop `get_shop_item` | C, **LIVE** | D-0262 |
| altar Align2amask MCORPSENM | C, **OMIT named** | |
| door/wall `S_hcdoor` | C `:2429–2438`, **OMIT named** | JS still `appear = 0` |
| `Protection_from_shape_changers` | C `:2401`, **OMIT named** | stubbed false at mklev |

`node scripts/sym.mjs in_town set_mimic_sym inside_room inside_room_mimic inside_room_town In_mines In_sokoban`:

```
in_town          js/hack.js:1968   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/makemon.js:2484
set_mimic_sym    js/makemon.js:2508   sync
inside_room      NOT EXPORTED — 1 LOCAL js/mklev.js:18970
inside_room_mimic NOT EXPORTED — 1 LOCAL js/makemon.js:2470
inside_room_town NOT EXPORTED — 1 LOCAL js/hack.js:1954
In_mines         js/const.js:2999   sync
In_sokoban       js/const.js:3000   sync
```

`sym` says import `hack.js` `in_town`. **Do not.** `CURRENT.md` / Constitution cycle: makemon must not import hack. The clone is the allowed t_at_local pattern, **iff** it matches C.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** statue `rn2(2)` now **fires** on mines maze when the hero is not in town (old JS skipped that roll entirely). Sokoban / mines-town still do not burn it. **Public-unhit** until a mines maze mimic that is not Mine Town (or hero standing outside the town parent).

## C ↔ JS fidelity

Predicate. C `:2439–2441` four conjuncts, `in_town` on **`u.ux,u.uy`**. JS `:2533–2536` the same. **Match.** Short-circuit: `!is_maze_lev` skips all; `In_mines && in_town` skips `!sokoban` and `rn2(2)`; Sokoban skips `rn2(2)`. **Match.** Old `!(In_mines)` was the C-wrong this SHA deletes.

`in_town` clone vs C `:3564–3585`. `!has_town` FALSE. **Match.** C walks `&svr.rooms[0]` while `hx > 0` (stops at the `hx=-1` sentinel; does **not** index `gs.subrooms`). JS copies **hack.js**: `n = nroom + nsubroom`, `continue` on `!sroom || hx<=0`, then `nsubrooms>0` → `inside_room`. Packed `rooms[0..nroom-1]` + sentinel at `nroom` (C layout, `MAXNROFROOMS=40`, subrooms live at 41+) means those extra `nsubroom` indices are holes, skipped. Parent rooms with `nsubrooms>0` still run `inside_room`. **Match C on packed rooms** (Mine Town). `continue` vs C `hx>0` stop would diverge on a **hole in the middle** of `rooms[]`; C mkroom does not leave those. Clone body matches the live `hack.js` export line-for-line (bbox / irregular `roomnoidx+ROOMOFFSET`). **Verified CLONE**, not a stub.

`inside_room_mimic` vs C `:678–687`. Irregular `!edge && roomno === roomnoidx+ROOMOFFSET`; else `lx-1..hx+1`, `ly-1..hy+1`. **Match.** C pointer index `croom-rooms` is `roomnoidx` for parent rooms. in_town only passes parents (`nsubrooms>0`). **Match that caller.**

Callee closure (maze statue arm). LIVE: `In_mines`, `In_sokoban`, `rn2`. CLONE: `in_town` / `inside_room` matched to C here. OMIT named: altar / `S_hcdoor` / Protection. STUB: none in this arm. **Arm may ship.** Not “dispatch ported, callee stubbed.” `Protection_from_shape_changers` at C `:2401` is still false at mklev in JS; that omit is **not** a STUB inside the maze conjuncts this SHA claimed. **Match the claimed four conjuncts only.**

## Hallucinations / overclaim

Subject skip statue only when mines **and** town (hero cell): **true**. D-log ordinary maze 41/39 statue/boulder over 80; mines !town same; mines town+hero-in-parent 0 statue; hero-outside 41/39: **true of that canary**, not a public mines-maze session. Stamping **Addressed:** D-1517 for **`:2439–2443` + `in_town(u.ux,u.uy)`** is fair. Do **not** stamp “Match C altar Align2amask.” Do **not** stamp “imported `hack.js` `in_town`.” Do **not** treat fortress PASS as a mines-maze mimic (public-unhit). This is **not** “dispatch ported, callee stubbed.”

## Density

+43 JS: predicate + cycle clone of `in_town`/`inside_room`. Playbook §2b. Did not glue dprince. Acceptable. Third `inside_room` body is cycle cost, not a new subsystem.

## Branch-by-branch confirm

1. Ordinary maze, not mines/sokoban: `rn2(2)` statue vs fallthrough boulder. **Match.**
2. Sokoban maze: no `rn2(2)`. **Match (already).**
3. Mines, `has_town`, hero inside parent: skip statue, no `rn2`. **Match. Old JS skipped all mines.**
4. Mines, `has_town`, hero **outside** parent: `rn2(2)` like ordinary maze. **Match. Old JS skipped.**
5. Mines, no town (`!has_town`): `in_town` FALSE → statue roll. **Match.**
6. `in_town` uses `u.ux,u.uy`, not `mtmp.mx,my`. **Match.**
7. Altar / door glyphs / Protection. **Named omit.**
8. **Public-unhit** until a mines maze mimic off Mine Town.

## Callers / RNG ledger

C: `makemon` S_MIMIC → `set_mimic_sym`. JS the same. Mines-not-town now consumes one `rn2(2)` that old JS skipped. No seed gate.

C `in_town` is also called from `hack.c` shop/town messages; this SHA’s clone is only for `set_mimic_sym`. Live `hack.js` export stays the shop path. **Do not write clone #3.** Hero cell (`u.ux,u.uy`) is intentional C, not a mimic-cell bug.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE. Cycle clone is documented, not a Rule #2 hit.

## Verification

D-log: private canary **15**/15 (ordinary maze 41/39; sokoban 0 statue 0 maze rn2; mines !town 41/39; mines town+hero-in-parent 0; mines town+hero-outside 41/39; hero cell not mimic cell); green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** until a mines maze mimic that is not Mine Town. Cohort is shared-startup. Honest.

## Actionable C-wrongs

None at the claimed predicate. Remaining **named** (map / Open): altar Align2amask `MCORPSENM`; door/wall `S_hcdoor`; Protection_from_shape_changers early-out. Do not Must-fix “import `hack.js` `in_town`” (cycle; clone matches C on packed town rooms). Do not Must-fix “JS `continue` vs C sentinel stop” without a hole-in-`rooms[]` falsifier.

Verdict: **ACCEPT-WITH-DEBT**
