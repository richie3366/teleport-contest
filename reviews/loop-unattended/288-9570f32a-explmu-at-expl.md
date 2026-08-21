# Review 288 — 9570f32a — mhitu.c explmu + mattacku AT_EXPL (D-1326)

## Metadata
- Full / short hash: `9570f32ae4de7ccd169069049a3d661a48f5fa14` / `9570f32a`
- Parent: `7fcaa15e` (reviews **284–287** + cadence **#1680**). This file audits **this SHA only**. Archive **Addressed:** D-1326 `9570f32a` already has the short hash (filled by D-1327).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 01:43:38 +0200
- D-id: **D-1326**
- Stats: 9 files, +251 / −25 — `js/mhitu.js` +181 / −~8.
- Claims to close: Open `mhitu.c` explmu (named from D-1309 / reviews **271** / **287**). Not AT_HUGS. `reviews/loop-2026-08-15/` has no unpaid explmu Must-fix.
- JS / map: `mhitu.js` `explmu` / `mattacku` `AT_EXPL`; `c-js-map/turns.md`. `defended` / `resists_blnd_by_arti` / gazemu / AT_HUGS / mhitm explmm still named at this SHA (later SHAs in this batch).
- Prior reviews this SHA claims to close: **271** named explmu after AT_TENT melee; **287** named it as next Open after dokick snuff.

## Intent vs deliverable

Git subject promises: “Match C mhitu.c explmu so an adjacent AT_EXPL monster actually explodes (hitmsg / thin air, elemental mon_explodes, BLND/HALU, mondead, wake_nearto 7*7) instead of falling out of mattacku.”

C `mattacku` (`mhitu.c:839–842`):

```
        case AT_EXPL: /* automatic hit if next to, and aimed at you */
            if (!range2)
                sum[i] = explmu(mtmp, mattk, foundyou);
            break;
```

C `explmu` (`:1591–1664`): `mcan` → `M_ATTK_MISS` **before** `d()`; `tmp = d(damn,damd)`; `not_affected = defended(mtmp, adtyp)` (the **exploder**); `!ufound` thin-air / `is_waterwall(mux,muy)` empty-water else `hitmsg`; switch AD_COLD/FIRE/ELEC → `mon_explodes` then `!DEADMONSTER` keeps agr; AD_BLND `resists_blnd(&youmonst)` then `mon_visible || (rnd(tmp /= 2) > u.ulevel)` (short-circuit skips the halve+`rnd`); AD_HALU `|= Blind || black-light/violet-fungus/dmgtype(AD_STUN)` then kaleidoscope / `mondead` before `make_hallucinated`; default `impossible`; `not_affected` You-seem-unaffected + `ugolemeffects`; `kill_agr && !DEADMONSTER` → `mondead`; `wake_nearto(..., 7*7)`; return miss vs `M_ATTK_AGR_DIED`.

Old JS: `mattacku` had no `AT_EXPL` arm (fell through default). No `explmu`.

The diff **does** export `explmu`, wire `case AT_EXPL` when `!range2`, and call live `mon_explodes` / `make_hallucinated` / `mondead` / `wake_nearto`. It does **not** port `defended(mtmp, adtyp)` (hard `not_affected = false`). Named. It does **not** port gazemu / AT_HUGS / explmm.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `explmu` | C `:1591–1664`, **new** | exported; C is `staticfn` |
| `mattacku` `AT_EXPL` | C `:839–842`, **wired** | `!range2` only |
| `d(damn,damd)` | C `:1603`, **imported live** | after `mcan` miss |
| `defended(mtmp, adtyp)` | C `:1604`, **named omit** | always false; no RNG; spheres/lights never qualify |
| `is_waterwall` | C `dbridge.c:38–40`, **clone** | `IS_WATERWALL(level.at(mux,muy).typ)`; OOB typ undefined → false ≡ `!isok` |
| `hitmsg` AT_EXPL | C `:1612` + `:29–81`, **pre-existing live** | `"explodes"` |
| `mon_explodes` | C `explode.c`, **imported live** | not a stub |
| `resists_blnd_you` | C `mondata.c:248–272`, **clone** | Blind / Unaware / `dmgtype_fromattack` BLND+EXPL/GAZE; `resists_blnd_by_arti` named |
| `Unaware_explmu` | C `youprop.h` Unaware, **clone** | `multi<0 && (usleep\|\|u.Unaware)`; full `unconscious`/`is_fainted` named |
| `ugolemeffects` | C `polyself.c:2160–2187`, **clone** | flesh+ELEC `(dam+5)/6`; iron+FIRE `dam`; not imported from `polyself.js` |
| `make_hallucinated` | C `potion.c`, **imported live** | |
| `mondead` | C, **imported live** | sync `mhitm.js` (no await needed) |
| `wake_nearto` | C `mon.c:4402`, **imported live** | `7*7` |
| `dmgtype` / `dmgtype_fromattack` | C `mondata.c`, **clone** | walk `mattk[]` |
| gazemu / AT_HUGS / explmm | C later cases / mhitm, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG on the AT_EXPL path:** `d(damn,damd)` always after `!mcan`; AD_BLND invisible path `rnd(tmp/2)`; AD_HALU `make_hallucinated` may RNG; elemental `mon_explodes` rolls its own `d()` (live callee). Cancelled exploder: **no** `d()` (return before). `defended` would have been no RNG.

## C ↔ JS fidelity

Call order is `mcan` miss → `d()` → (skip `defended`) → thin-air/`hitmsg` → switch → optional unaffected/`ugolemeffects` → `mondead` if `kill_agr` → `wake_nearto(7*7)` → return `mhp>=1 ? MISS : AGR_DIED`. That is C `:1600–1663` except the named `defended` assignment. `DEADMONSTER` ≡ `mhp < 1`.

AD_BLND short-circuit matches C `:1627`: `mon_visible(mtmp) || (rnd(tmp = trunc(tmp/2)) > ulevel)` — when visible, `tmp` stays the full `d()` and `rnd` is not burned. Invisible: half then `rnd`. `make_blinded(tmp, false)` uses that `tmp`. `flags.verbose !== false` is C `flags.verbose` (JS default On).

AD_HALU: `mondead` **before** `make_hallucinated(HHallucination + tmp, false, 0)` matches C `:1644–1648` (“avoid hallucinating the black light as it dies”). `kill_agr = false` after that `mondead`. `chg` drives freaked-out vs seem-unaffected.

Elemental: `await mon_explodes` then `mhp>=1` → `kill_agr=false` (lifesave). Callee is `explode.js` `mon_explodes` (D-0968 envelope), not a glyph stand-in. Default unknown adtyp: C `impossible`; JS silent `break`. Not a gameplay C-wrong.

`ugolemeffects` clone matches C heal math and the “Strangely, you feel better” + `exercise(A_STR, true)` pline. Only runs when `not_affected` — with `defended` omitted that is BLND-resist / HALU-resist, not artifact/dragon-scale on the **sphere**. Named.

This is **not** “Match C `defended`.” The subject’s adjacent-explode dispatch **is** live `explmu`, not a stub. Hallucination check for “Match C dispatch, callee is a stub” is clean for `mon_explodes` / `make_hallucinated` / `wake_nearto`.

## Hallucinations / overclaim

Subject + D-1326 say an adjacent AT_EXPL monster actually explodes instead of falling out of `mattacku`. **The case label plus `explmu` body are the hunk.** Stamping **Addressed:** D-1326 is fair. Do **not** stamp “Match C `defended(mtmp, adtyp)`.” Do **not** stamp “Match C `resists_blnd_by_arti` (Sunsword).” Do **not** stamp “Match C gazemu / AT_HUGS.” Do **not** treat fortress PASS as a yellow-light blast pline.

## Density

One C function plus its one `mattacku` caller. ~90 executable JS lines + four small clones that C inlines as callees of this body (`Unaware`, `dmgtype_fromattack`, `resists_blnd` you-arm, `ugolemeffects`). AT_HUGS / gazemu correctly not glued. Right size (§2b).

## Branch-by-branch confirm

1. `mcan`: return `M_ATTK_MISS` before `d()`. Match `:1600–1601`.
2. `range2`: skip `explmu`. Match `:840`.
3. `!ufound` + waterwall typ: “empty water”. Match `:1606–1610` + `IS_WATERWALL`.
4. `!ufound` + ordinary: “thin air”. Match.
5. `ufound`: `hitmsg` “explodes”. Match `:1612`.
6. AD_COLD/FIRE/ELEC: `mon_explodes`; live agr if `mhp>=1`. Match `:1616–1622`.
7. AD_BLND visible: no `rnd`; full `tmp` blindness. Match short-circuit `:1627`.
8. AD_BLND invisible: `tmp/=2` then `rnd(tmp) > ulevel`. Match.
9. AD_HALU resist (Blind / black light / violet fungus / stun-dmgtype): skip kaleidoscope. Match `:1637–1639`.
10. AD_HALU hit: kaleidoscope unless already Hallu; `mondead` then `make_hallucinated`. Match `:1640–1649`.
11. `not_affected`: unaffected pline + `ugolemeffects`. Match `:1656–1658`.
12. `defended` on the exploder. Still omitted. Named.
13. **Public-unhit** unless a session stands next to a sphere/light.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `IS_WATERWALL` is the rm.h macro, not a recorded cell. Plain ESM. Dynamic imports not used here.

## Verification

Journal: private canary **29**/29; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on AT_EXPL. Cadence this audit: full `sessions` at HEAD `a7a5a835` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.84). I did not re-run the private canary. Fortress PASS is not evidence a sphere exploded.

## Actionable C-wrongs

None for Must-fix. `mcan`→`d()`→hitmsg/thin-air→elemental/`BLND`/`HALU`→`mondead`→`wake_nearto(7*7)` matches C `:1591–1664` / `:839–842`. `mon_explodes` is not a stub.

Named omits (map, not Must-fix):

1. `defended(mtmp, adtyp)` (`:1604`)
2. `resists_blnd_by_arti` (Sunsword)
3. full `Unaware` (`unconscious` / `is_fainted`)
4. gazemu / AT_HUGS / mhitm explmm (later SHAs / still named)

Do not Must-fix “export `explmu`” (this SHA). Do not Must-fix silent `impossible` default. Do not Must-fix AT_HUGS (next SHA).

## Callers / RNG ledger

C: `mattacku` adjacent AT_EXPL → `explmu`. JS: same. `d()` is new on this path; cancelled exploder still burns nothing. Public fortress is not evidence `d(damn,damd)` or `wake_nearto(49)` fired.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: adjacent AT_EXPL now runs live `explmu` (thin-air/`mon_explodes`/BLND short-circuit/HALU `mondead`/`wake_nearto`); `defended` stays named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1326 `9570f32a` already filled by the next port commit.
