# Review 209 — 4dfec66a — monmove.c postmov IRONBARS (D-1247)

## Metadata
- Full / short hash: `4dfec66a7056024afcf34b348876d403c455d5d3` / `4dfec66a`
- Parent: `2cce0dc8` (D-1246). This file audits **this SHA only**. Archive row **Addressed:** D-1247 `4dfec66a` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 02:21:19 +0200
- D-id: **D-1247**
- Stats: 9 files, +156 / −71 — `js/monmove.js` +65 / −8.
- Claims to close: Open `monmove.c` postmov iron bars (named from D-1246 / D-1238 / D-1227 / review **200** / **208**). Not bee_eat. `reviews/loop-2026-08-15/` has no unpaid bars Must-fix.
- JS / map: `monmove.js` `postmov` else-if; `hack.js` `dissolve_bars` (already live); `c-js-map/turns.md`. ALLOW_BARS rust / `switch_terrain` / `mon_yells` / `gelcube_digests` still named.
- Prior reviews this SHA claims to close: **200** / **189** named omit iron bars; D-1246 follow-up.

## Intent vs deliverable

Git subject promises: “Match C monmove.c postmov iron bars so a rust/corr/metallivorous monster that has stepped onto bars eats through them (or Norep-passes through/between), instead of leaving the bars untouched.”

C `postmov` (`monmove.c:1624–1640`) is the `else if (levl[mx][my].typ == IRONBARS)` of the door arm (`:1520–1522` `IS_DOOR && !passes_walls && !can_tunnel`). Eat unless `wall_info & W_NONDIGGABLE` when `dmgtype(ptr, AD_RUST) || dmgtype(ptr, AD_CORR) || metallivorous(ptr)`: `canseemon` `pline_mon` eats; `dissolve_bars`; **return `MMOVE_DONE`**. Else `flags.verbose && canseemon` `Norep` through/between (`passes_walls` ? through : between). `dissolve_bars` (`:2170–2178`): typ DOOR if `edge==1` else ROOM if special/`in_rooms` else CORR; flags 0; `newsym`; `u_at` → `switch_terrain`.

Old JS: `// IRONBARS deferred` after engulf/`newsym`, so tunnelers still burned `mdig_tunnel` `rnd(12)` on a bars cell and eaters never dissolved.

The diff **does** the else-if on the door `if`, eat + `dissolve_bars` + return DONE, and verbose `Norep` pass. It does **not** pull ALLOW_BARS rust in `mon_allowflags`, `switch_terrain`, `meatmetal`, or `mon_yells`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `postmov` IRONBARS else-if | C `:1624–1640`, **new** | attached to door `if`, not after `newsym` |
| `dmgtype` | C `mondata.c:712–715` via `AT_ANY`, **clone** | any `mattk[].adtyp`; same as `mhitm.js` |
| `AD_RUST` / `AD_CORR` | C `monattk.h` 24 / 42 | local consts; same as `uhitm.js` |
| `metallivorous` | C `mondata.h`, **imported live** | `M1_METALLIVORE` |
| `W_NONDIGGABLE` | C `rm.h` 0x08, **imported** | `wall_info\|flags` = JS `rm_wall_info` |
| `dissolve_bars` | C `:2170–2178`, **imported live** | `hack.js`; `switch_terrain` named inside |
| `pline_mon` eat | C `:1631–1633`, **imported live** | `display_canseemon`, not local stub |
| `Norep` pass | C `:1636–1640`, **imported live** | not `pline_mon` |
| `locomotion` / `makeplural` | C `mondata.c` / `objnam.c`, **already local / imported** | `"pass"` → `"passes"` |
| `passes_walls` | C `mondata.h`, **already in file** | through vs between |
| ALLOW_BARS rust / `switch_terrain` / `meatmetal` | C other sites, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG** on this arm. Returning `MMOVE_DONE` **skips** `mdig_tunnel`’s `rnd(12)`.

## C ↔ JS fidelity

Pinned C (`monmove.c:1624–1640`):

```
        } else if (levl[mtmp->mx][mtmp->my].typ == IRONBARS) {
            if (!(levl[mtmp->mx][mtmp->my].wall_info & W_NONDIGGABLE)
                && (dmgtype(ptr, AD_RUST) || dmgtype(ptr, AD_CORR)
                    || metallivorous(ptr))) {
                if (canseemon(mtmp))
                    pline_mon(mtmp, "%s eats through the iron bars.",
                              Monnam(mtmp));
                dissolve_bars(mtmp->mx, mtmp->my);
                return MMOVE_DONE;
            } else if (flags.verbose && canseemon(mtmp))
                Norep("%s %s %s the iron bars.", Monnam(mtmp),
                      makeplural(locomotion(ptr, "pass")),
                      passes_walls(ptr) ? "through" : "between");
        }
```

JS: `} else if (loc && loc.typ === IRONBARS)` on the same `loc = level.at(mtmp.mx, mtmp.my)` as the door arm (dest after the step). Eat predicate ORs `wall_info|flags` then `W_NONDIGGABLE` — C uses `wall_info` only; JS map cells store that bit in either field (`zap.js` `rm_wall_info` is the same OR). Not a recorded-coordinate gate.

`dmgtype`: C `dmgtype_fromattack(ptr, dtyp, AT_ANY)` any slot whose `adtyp` matches. JS walks `ptr.mattk` for `adtyp`. Empty slots are `adtyp==0`, not 24/42. Rust monster `AT_TUCH`/`AT_NONE` `AD_RUST`, gray ooze `AD_CORR`, xorn/mole `metallivorous` without those adtyps. Match.

Eat uses `display_canseemon` (live `display.h` `canseemon`: `cansee||infrared` + `mon_visible`), **not** the local door stub at `monmove.js:961–965`. That is the C function. Pass uses the same, plus `Norep` (repeat-suppress), not `pline_mon`. `flags.verbose !== false` treats missing flags as on (C default). `locomotion(ptr, 'pass')` then `makeplural` fakes the verb. `passes_walls` → through else between. Match.

`return MMOVE_DONE` is inside `if (mmoved === MMOVE_MOVED)` and **exits `postmov`**. C same: skips `mdig_tunnel`, engulf/`newsym`, shared `mpickstuff`, `maybe_spin_web`, and `hides_under`. The Norep arm does **not** return; it falls through to dig / newsym / pickup. Match.

`dissolve_bars` is the live `hack.js` export (DOOR/ROOM/CORR + `newsym`). `u_at` `switch_terrain` is still a comment inside that callee. Named D-0937 / this map row, not a no-op dissolve.

Exporting `postmov` is mechanical (no new caller). `AD_RUST=24` / `AD_CORR=42` match `nethack-c/upstream/include/monattk.h:66,84`.

## Hallucinations / overclaim

Subject + D-1247 say eaters dissolve bars and return DONE (skip `rnd(12)`), others Norep-pass. **The else-if + live `dissolve_bars` + `Norep` are the hunk.** Stamping **Addressed:** D-1247 is fair. This is **not** “Match C dispatch, callee is a stub.” Do **not** stamp “Match C `switch_terrain` after bars” or “Match C ALLOW_BARS rust/corr/metallivore in `mon_allowflags`” or “Match C `meatmetal`.” `dmgtype` is a clone of C `mondata.c:712–715`, not a hardcoded rust-monster mndx list.

## Density

One `else if` on an already-ported door arm, plus a five-line `dmgtype` clone C uses at that site. ~40 JS lines. Right size (small, not a glue of `mon_yells`). Did not pull `gelcube_digests`.

## Branch-by-branch confirm

1. Rust monster, diggable bars, seen: eat pline, dissolve, return DONE, no `rnd(12)`, no pickup. Match.
2. Gray ooze / pudding `AD_CORR`: same eat path. Match.
3. Xorn / rock mole `metallivorous`, no rust/corr adtyp: eat. Match.
4. `W_NONDIGGABLE`: skip eat; if verbose+seen, Norep pass; may still `mdig_tunnel` if `can_tunnel`. Match C (nondiggable fails the eat `if`, Norep `else if`).
5. Fog / ghost `passes_walls`: Norep “through”. Match.
6. Jackal: Norep “between”. Match.
7. Unseen or `verbose==false`: no Norep; still no eat unless eater. Match.
8. Eater + unseen: dissolve, no pline, return DONE. Match.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `wall_info|flags` is the JS rm encoding, not a glyph coordinate. Plain ESM.

## Verification

Journal: private canary **24**/24 (C else-if; rust/ooze/pudding/mole/xorn eat; fog/ghost/jackal Norep; nondiggable; MMOVE_DONE skip; unseen; !verbose; rnd(12) skip vs burn; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a bars-eater or bars-passer `postmov`s onto IRONBARS. Cadence this audit: full `sessions` after D-1249.

## Actionable C-wrongs

None for Must-fix. Else-if through live `dissolve_bars` / `Norep` / `metallivorous`. `dmgtype` clone matches C `AT_ANY`. Local `canseemon` stub is **not** what the eat/pass arms call.

Named omits (map, not Must-fix):

1. `dissolve_bars` `switch_terrain` when hero stands on the cell
2. ALLOW_BARS rust/corr/metallivore in `mon_allowflags`
3. `meatmetal`; `mon_yells`; `gelcube_digests`

Do not Must-fix “JS ORs `flags` into `wall_info`.” Do not pull AT_HUGS.

## Callers / RNG ledger

C: `postmov` after a successful step. JS `m_move` → `postmov` same. Eat/pass: no RNG. Public fortress is not evidence a rust monster ate bars.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: dest IRONBARS now eats-and-DONE or Norep-passes like C; `switch_terrain` and ALLOW_BARS rust stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1247 `4dfec66a`.
