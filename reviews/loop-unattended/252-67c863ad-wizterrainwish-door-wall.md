# Review 252 — 67c863ad — objnam.c wizterrainwish door/wall (D-1290)

## Metadata
- Full / short hash: `67c863ad78458151ca95cdd827295a4fd648bc4d` / `67c863ad`
- Parent: `44b22432` (D-1289). This file audits **this SHA only**. Archive row **Addressed:** D-1290 lacked the short hash; this review commit fills `67c863ad`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 16:45:37 +0200
- D-id: **D-1290**
- Stats: 10 files, +262 / −39 — `js/readobjnam.js` +168 / −~8; comment `js/zap.js`.
- Claims to close: Open `objnam.c` wizterrainwish door/wall (named from D-1279 / reviews **241** / **251**). Not traps. `reviews/loop-2026-08-15/` has no unpaid door/wall Must-fix.
- JS / map: `readobjnam.js` `wizterrainwish` / `set_wallprop_from_str` / `is_wall_wish` / door-state prefixes; live `mklev.js` `fix_wall_spines`; `c-js-map/turns.md`. Secret corridor; drawbridge; lava `pooleffects`; `looted`/`disturbed` preparse named.
- Prior reviews this SHA claims to close: **241** / **251** named omit door/wall after trap loop.

## Intent vs deliverable

Git subject promises: “Match C objnam.c wizterrainwish so a wizard door/wall wish sets doormask or HWALL/VWALL, instead of skipping those arms.”

C door (`objnam.c:3740–3821`) after cloud: suffix `"door"` or `doorless`+`"doorway"`; `secret = suffix "secret door"`; location `DOOR|SDOOR|(IS_WALL && !=DBWALL)|IRONBARS`; rogue forces doorless; `doormask` locked / (doorless||secret) / open / broken / else CLOSED; secret `wall_info |= old & WM_MASK`; trapped cleared if `d->trapped==2` or not (LOCKED|CLOSED) and not secret; else `D_TRAPPED`; pline `upstart(an(dbuf))`; else `"requires door or wall location"`. Wall `:3822–3835`: suffix `"wall"` and (`bp==p-4` or `p[-5]==' '`) so `"swallow"` misses; HWALL unless N/S neighbor `IS_WALL` then VWALL; `flags=0`; `set_wallprop_from_str`; `fix_wall_spines(max(0,ux-1)…min(COLNO,ux+1), min(ROWNO,uy+1))`; `"A wall."`. Helper `:3539–3549` case-sensitive `strstr` `undiggable `|`nondiggable `|`unphaseable `|`nonpasswall `. Preparse `:4038–4065` trapped (wizard-only honor) / untrapped=2 / locked/unlocked/broken/open/closed/doorless. Tree/bars already called `set_wallprop_from_str` (`:3721/:3727`). Secret corridor `:3836–3845` still after wall.

Old JS: trap loop + furniture; door/wall named omit; prefixes stopped at uncursed.

The diff **does** the door/wall arms, `is_wall_wish`, `set_wallprop_from_str` on tree/bars/wall, live `fix_wall_spines`, and the door-state prefix loop. It does **not** port secret corridor, drawbridge under, lava `pooleffects`, water/fire_damage_chain, melting ice, or `looted`/`disturbed` preparse. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| door arm | C `:3740–3821`, **new** | location gate + doormask + rogue + trapped |
| wall arm | C `:3822–3835`, **new** | HWALL/VWALL + spines |
| `is_wall_wish` | C `BSTRCMPI`+space, **clone** | rejects fused `"firewall"` |
| `set_wallprop_from_str` | C `:3539–3549`, **clone** | `includes` ≡ `strstr`; writes `wall_info` and `flags` (JS split overlay) |
| `fix_wall_spines` | C `mkmaze.c:229`, **imported live** | same spine_array; JS does not panic on `x2==COLNO` |
| door-state prefixes | C `:4038–4065`, **new** | in existing `readobjnam` loop |
| tree/bars `set_wallprop_from_str` | C `:3721/:3727`, **wired** | |
| `switch_terrain` postamble | C `:3910`, **pre-existing live** | D-1279; closed door is `blocklev` |
| secret corridor | C `:3836–3845`, **named omit** | still miss |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Dynamic `import('./mklev.js')` is relative ESM. Rule #2 clean. **No new gameplay RNG** (altar `rn2` is D-1279).

## C ↔ JS fidelity

Pinned C door doormask (`objnam.c:3772–3792`):

```
            lev->doormask = d->locked ? D_LOCKED
                            : (d->doorless || secret) ? D_NODOOR
                              : d->open ? D_ISOPEN
                                : d->broken ? D_BROKEN
                                  : D_CLOSED;
            if (secret)
                lev->wall_info |= (old_wall_info & WM_MASK);
            if (d->trapped == 2
                || ((lev->doormask & (D_LOCKED | D_CLOSED)) == 0
                    && !secret))
                d->trapped = 0;
            if (d->trapped)
                lev->doormask |= D_TRAPPED;
```

JS copies the ternary, secret `WM_MASK`, trapped=2 / open-state clear, then `D_TRAPPED`. Rogue zeroes lock/open/broken and sets doorless. Location gate matches `:3752–3754` (DBWALL rejected; IRONBARS ok; ROOM is badterrain). `closed_door` reads `doormask`; D-1279 postamble `switch_terrain` uses that — open door unblocks leftover BLev; closed/locked stays `blocklev`. This is **not** “Match C dispatch, callee is a stub”: `fix_wall_spines` is the live mkmaze walker (spine_array VWALL/HWALL/corners identical to C `:243–246`).

Wall: isolated HWALL; N or S `IS_WALL` → VWALL; `flags=0` + `wall_info=0` then `set_wallprop_from_str` (C `flags=0` overlays wall_info then `|=`). Fused suffix: `"wall of lava"` still the earlier lava arm; `"firewall"` fails `p[-5]==' '`. Match `:3822–3823`.

JS `lev.flags = lev.doormask` after secret `wall_info |=` splits C’s overlay (`doormask`/`wall_info` both `#define` to `flags`, `rm.h:213–215`). Door readers use `doormask`; wall-info readers OR `wall_info|flags` (`hack.js` / `zap.js`). Secret `WM_MASK` lives on `wall_info`. Pre-existing split, not a doormask ternary miss. `d.unlocked` is parsed and unused in the ternary — C same (`unlocked` only sets `closed`).

Prefixes: `"trapped "` sets 0 then wizard 1; `"untrapped "` sets 2; lock/open/broken/doorless mutually clear as C comma-operator. That makes `"trapped door"` strip to `"door"` so the trap loop no longer hits `TRAPPED_DOOR` (D-1289 named this). `looted `/`disturbed ` still absent — fountain `d.looted` stays 0. Named.

## Hallucinations / overclaim

Subject + D-1290 say a wizard door/wall wish sets doormask or HWALL/VWALL. **The two arms + prefixes + live spines are the hunk.** Stamping **Addressed:** D-1290 is fair. Do **not** stamp “Match C secret corridor.” Do **not** stamp “Match C drawbridge under / `pooleffects`.” Do **not** stamp “Match C `looted` prefix.” Do **not** stamp “Match C `rm.flags` overlay bit-identity.”

## Density

Remaining door/wall envelope of `wizterrainwish` plus the preparse those arms need, plus the C helper already required on tree/bars. ~168 JS lines. Did not glue SCORR. Right size.

## Branch-by-branch confirm

1. `"door"` on HWALL: typ DOOR, `D_CLOSED`, madeterrain, `switch_terrain` blocklev. Match else CLOSED.
2. `"locked door"`: `D_LOCKED`. Match first ternary arm.
3. `"open door"`: `D_ISOPEN`; leftover BLev can clear. Match.
4. `"broken door"` / `"doorless doorway"`: `D_BROKEN` / `D_NODOOR` + doorway text. Match.
5. `"secret door"`: SDOOR, `D_NODOOR`, `WM_MASK` restore. Match.
6. `"trapped closed door"`: prefix trapped=1; CLOSED eligible; `D_TRAPPED`. Match.
7. `"trapped open door"`: trapped cleared (`!(LOCKED|CLOSED)`). Match `:3786–3790`.
8. `"door"` on ROOM: `"Door requires door or wall location."` `badterrain`. Match.
9. `"door"` on DBWALL: reject. On IRONBARS: ok. Match.
10. Rogue: doorless even if locked prefix. Match `:3761–3766`.
11. Isolated `"wall"`: HWALL + `fix_wall_spines` + `"A wall."`. Match.
12. N-neighbor wall: VWALL. Match `:3826–3828`.
13. `"undiggable wall"`: `W_NONDIGGABLE`. `"firewall"` miss. `"wall of lava"` still lava. Secret corridor still miss. Public-unhit unless a wizard wishes door/wall.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM.

## Verification

Journal: private canary **30**/30; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a wizard wishes door/wall. Cadence this audit: full `sessions` at HEAD `67c863ad` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.85). I did not re-run the private canary.

## Actionable C-wrongs

None for Must-fix. Location gate, doormask order, rogue, trapped eligibility, wall neighbor/HWALL, live `fix_wall_spines`, and `set_wallprop_from_str` needles match C `:3740–3835` / `:3539–3549` / `:4038–4065`.

Named omits (map, not Must-fix):

1. Secret corridor (`CORR`→`SCORR`)
2. Drawbridge under; lava `pooleffects`; water/fire_damage_chain; melting ice / `ice_descr`
3. `looted`/`disturbed` preparse
4. JS `flags`/`doormask`/`wall_info` split vs C overlay (pre-existing; door readers use `doormask`)

Do not Must-fix “`is_wall_wish` clone.” Do not Must-fix “`unlocked` unused in ternary.” Do not wrap `mhitu.c` `wildmiss` as `pline_mon` (C `:206` is `set_msg_xy` then `pline`; Open must say that).

## Callers / RNG ledger

C: `readobjnam` wiztrap ← `makewish`. JS: `readobjnam_wish`. No new positional RNG. Public fortress is not evidence a wizard replaced a wall with a locked door.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: door/wall wishes now set C’s doormask or HWALL/VWALL via live `fix_wall_spines`; secret corridor stays named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1290 `67c863ad`.
