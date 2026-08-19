# Review 218 — 03e8b10c — trap.c launch_obj LANDMINE/PIT (D-1256)

## Metadata
- Full / short hash: `03e8b10c1ac26e049d415da2b55bb987ed931aae` / `03e8b10c`
- Parent: `25a81ff1` (D-1255). This file audits **this SHA only**. Archive row **Addressed:** D-1256 `03e8b10c` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 04:56:38 +0200
- D-id: **D-1256**
- Stats: 12 files, +170 / −69 — `js/trap.js` +111 / −43; comments `js/display.js` / `js/explode.js`.
- Claims to close: Open `trap.c` landmine·pit mid-roll (named from D-1237 / review **199**). Not rolling-boulder TELEP. `reviews/loop-2026-08-15/` has no unpaid launch Must-fix.
- JS / map: `trap.js` `launch_obj`; `c-js-map/turns.md` / `data.md`. `down_gate` / boulder-chain / post-switch `flooreffects` still named.
- Prior reviews this SHA claims to close: **199** named omit mid-roll landmine/pit.

## Intent vs deliverable

Git subject promises: “Match C trap.c launch_obj LANDMINE/PIT so a rolling boulder that hits a landmine KAABLAMMs and fractures (or fills a pit and stops), instead of rolling through to rest.”

C `launch_obj` (`trap.c:3436–3507`): ROLL + boulder + `t_at` switch. LANDMINE (`:3437–3459`): `rn2(10)>2` then `set_msg_xy` if cansee, `pline("KAABLAMM!!!%s")`, `deltrap`, `del_engr_at`, `place_object`, `otrapped=0`, `fracture_rock`, `scatter(..., MAY_DESTROY|MAY_HIT|MAY_FRACTURE|VIS_EFFECTS, NULL)`, `newsym`, `used_up`. Miss (`rn2<=2`) `break`s the case; boulder keeps rolling. TELEP/LEVEL_TELEP unchanged (D-1237). PIT/SPIKED_PIT/HOLE/TRAPDOOR (`:3489–3501`): rest cell, `flooreffects(..., "fall")`, `dist=-1`. Then `if (used_up || dist==-1) break`. `down_gate` **before** this switch (`:3424–3430`) named. Post-switch `flooreffects` (`:3509`) named.

Old JS: TELEP/LEVEL_TELEP only; landmine/pit comment “still named”; boulder continued to `place_object` at rest.

The diff **does** the LANDMINE and pit-family arms and keeps TELEP in the `else`. It does **not** call `down_gate` / `launch_drop_spot` / post-switch `flooreffects`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| LANDMINE arm | C `:3437–3459`, **new** | `rn2(10)>2` |
| `set_msg_xy` | C `pline.c`, **imported live** | D-1215 consume |
| `pline` KAABLAMM | C, **imported live** | extra sentence iff cansee |
| `deltrap` / `del_engr_at` | C, **imported live** | |
| `place_object` | C, **imported live** | before fracture |
| `fracture_rock` | C `zap.c`, **imported live** | `dig.js`; boulder→ROCK `rn1(60,7)` |
| `scatter` | C `explode.c`, **imported live** | flight + MAY_HIT; FRACTURE/DESTROY named |
| pit family | C `:3489–3501`, **new** | `dist=-1` |
| `flooreffects` | C `do.c:187–269`, **imported live** | boulder+pit fill; hmon named |
| TELEP / LEVEL_TELEP | C `:3460–3488`, **already live** | D-1237; moved into `else` |
| `down_gate` / `ship_object` | C `:3424–3430`, **named omit** | |
| `launch_drop_spot` | C after used_up, **named omit** | |
| post-switch `flooreffects` | C `:3509`, **named omit** | |
| boulder-on-boulder | C `:3514`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Dynamic `import('./dig.js')` / `import('./do.js')` is ESM cycle breaking, not Node `fs`. Rule #2 clean. **New RNG:** LANDMINE `rn2(10)`; `fracture_rock` `rn1(60,7)`; `scatter` `rnd` split + `rn2(N_DIRS)` + range `rnd`. Pit arm has no extra RNG beyond live `flooreffects`.

## C ↔ JS fidelity

Pinned C LANDMINE (`trap.c:3437–3458`):

```
                case LANDMINE:
                    if (rn2(10) > 2) {
                        if (cansee(x, y))
                            set_msg_xy(x, y);
                        pline("KAABLAMM!!!%s",
                              cansee(x, y)
                               ? "  The rolling boulder triggers a land mine."
                               : "");
                        deltrap(t);
                        ...
                        fracture_rock(singleobj);
                        (void) scatter(x, y, 4,
                                       MAY_DESTROY | MAY_HIT | MAY_FRACTURE
                                           | VIS_EFFECTS,
                                       (struct obj *) 0);
```

JS: `if (ttyp === LANDMINE) { if (rn2(10) > 2) { ... } } else { TELEP / pit }`. Miss does **not** fall into TELEP/PIT (C `break`s the case). Match. `set_msg_xy` then one `pline` with the extra sentence iff `cansee`. `fracture_rock` is live (otyp=ROCK, `rn1(60,7)`, `place_object`). `scatter(null)` peels the pile, flies with `MAY_HIT` (`MAY_HITMON|MAY_HITYOU` in JS encoding — dokick’s same constants; C’s numeric bits differ, JS scatter checks JS bits). `MAY_FRACTURE` would 9/10-break *other* boulders/statues at the cell after this boulder is already ROCK — named omit, not a no-op `fracture_rock`. `MAY_DESTROY` glass/egg/`!rn2(10)` named. `VIS_EFFECTS` tmp_at named. Landing `flooreffects` inside scatter named (JS always `place_object`). This is **not** “Match C dispatch, callee is a stub”: rocks leave the cell via live scatter flight + `ohitmon`/`thitu` when MAY_HIT.

Pit family: `xRest,yRest = x,y`; `flooreffects(singleobj, xRest, yRest, 'fall')`; `dist = -1`. JS `is_pit`/`is_hole` cover PIT/SPIKED_PIT/HOLE/TRAPDOOR. Live `flooreffects` fills (deltrap, `delobj` boulder, `bury_objs`). C `hmon`/`mondied` when a monster is trapped in the pit is named in the helper (survivor can leave the boulder intact; JS always consumes). Empty-pit fill matches. `dist=-1` stops the roll even if `flooreffects` returned false — C same.

TELEP stays in the `else` of LANDMINE so LEVEL_TELEP `random_teleport_level` is not burned on a landmine cell. Match C switch.

## Hallucinations / overclaim

Subject + D-1256 say a rolling boulder KAABLAMMs and fractures or fills a pit and stops instead of rolling through. **`rn2(10)` + live `fracture_rock`/`scatter`/`flooreffects` + `dist=-1` are the hunk.** Stamping **Addressed:** D-1256 is fair. Do **not** stamp “Match C `down_gate`/`ship_object`” or “Match C scatter `MAY_FRACTURE`/`MAY_DESTROY`” or “Match C flooreffects hmon vs trapped mon.” `launch_drop_spot(NULL,0,0)` after used_up is still named bones tracking, not a fake KAABLAMM.

## Density

One `launch_obj` switch family C actually runs mid-roll (LANDMINE + pit), TELEP left in the sibling `else`. ~70 JS lines in one function. Right size. Did not glue `gelcube_digests`.

## Branch-by-branch confirm

1. LANDMINE, `rn2>2`, cansee: `set_msg_xy`, KAABLAMM + extra sentence, deltrap, fracture, scatter, used_up, break. Match.
2. LANDMINE, `rn2>2`, !cansee: KAABLAMM without extra; no `set_msg_xy`. Match.
3. LANDMINE, `rn2<=2`: no used_up, not pit/TELEP, keep rolling. Match.
4. PIT empty: `flooreffects` fill, `dist=-1`, break. Match.
5. SPIKED_PIT / HOLE / TRAPDOOR: same family. Match.
6. TELEP: still `pline_xy` / `rloco` (D-1237). Match.
7. LEVEL_TELEP same-level: skip disappears (D-1237). Match.
8. No trap / not boulder: skip the block. Match.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `set_msg_xy(x,y)` is C’s a11y loc, not a session coordinate. Plain ESM.

## Verification

Journal: private canary **23**/23 (C arms; JS KAABLAMM + fracture + deltrap; miss continues; accessiblemsg prefix; Blind KAABLAMM no extra; pit fill + You_hear; SPIKED/HOLE/TRAPDOOR stop; TELEP regression); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a rolling boulder crosses a landmine or pit. Cadence this audit: full `sessions` at HEAD `466adf3e` **44**/44.

## Actionable C-wrongs

None for Must-fix. LANDMINE goes through live `fracture_rock` + scatter flight; pit goes through live `flooreffects` fill. Scatter’s extra MAY_FRACTURE/DESTROY bits and pit-hmon are named helper tails, not a switch arm that still `place_object`s at rest.

Named omits (map, not Must-fix):

1. `down_gate` / `ship_object` before the trap switch (`trap.c:3424–3430`)
2. scatter `MAY_FRACTURE` / `MAY_DESTROY` / `VIS_EFFECTS` / landing `flooreffects`
3. `flooreffects` hmon/mondied when a monster is trapped in the pit
4. post-switch `flooreffects`; boulder-on-boulder chain; `launch_drop_spot`

Do not Must-fix “JS MAY_HIT bit layout vs C 0x02/0x04.” Do not Must-fix “dynamic import of `dig.js`.”

## Callers / RNG ledger

C: rolling-boulder trap `launch_obj(BOULDER, ..., ROLL)`. JS same. RNG: `rn2(10)` then maybe `rn1`/`scatter` rnds. Public fortress is not evidence a landmine fired.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: a rolling boulder that hits a landmine now KAABLAMMs and `fracture_rock`s (or fills a pit and stops); `down_gate` and scatter MAY_FRACTURE stay named.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1256 `03e8b10c`.
