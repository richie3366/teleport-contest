# Review 112 — 6bdf4d49 — switch_terrain classify_terrain (D-1151)

## Metadata
- Full / short hash: `6bdf4d496db0bb020211354e691f9cfc950e2f8c` / `6bdf4d49`
- Parent: `505df513` (D-1150). This file audits **this SHA only**. Archive row **Addressed:** D-1151 `6bdf4d49` was filled by D-1152.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 09:46:27 +0200
- D-id: **D-1151**
- Stats: 13 files, +200 / −26 — `js/hack.js` +77 / −4 (`classify_terrain` + `switch_terrain` call); `js/const.js` xFLOOR…xWATERWALL; `js/options.js` bag `flags.terrainstatus`.
- Claims to close: Open queue `hack.c` `classify_terrain` (named from switch_terrain). Not invocation. Review **90** named omit. `reviews/loop-2026-08-15/` has no open classify Must-fix.
- JS / map: `hack.js` `classify_terrain` / `switch_terrain`; `const.js` rm.h extras; `options.js` DOSET bag. `c-js-map/turns.md` hack. botl `terrain_descr[]` paint, `options.c` `opt_terrainstatus` classify, `end_running` / `u_on_newpos` MAX_TYPE, `spoteffects` / `set_uinwater` / `dissolve_bars` callers still named.
- Prior reviews this SHA claims to close: **90** named `flags.terrainstatus` arm; D-1150 next-port.

## Intent vs deliverable

Git subject promises: “Match C hack.c classify_terrain so switch_terrain with flags.terrainstatus remaps lastseentyp into iflags.terrain_typ.”

Old JS `switch_terrain` ended after Lev/Fly FROMOUTSIDE xor + botl; comment named `classify_terrain` deferred. C `hack.c:3215–3216` is `if (flags.terrainstatus) classify_terrain();`. C `classify_terrain` (`:3090–3172` — journal’s 3131–3214 cited the MOAT arm through `switch_terrain` botl; the function body is `:3090–3172`) reads `svl.lastseentyp[u.ux][u.uy]`, remaps Underwater / arboreal STONE / ROOM·CORR floor vs earth / door open·shut / DRAWBRIDGE_UP under-typ / Medusa sea / Juiblex swamp / WATER→xWATERWALL, then if `typ != iflags.terrain_typ` stores it and requests `disp.botl` iff `flags.terrainstatus && !context.run`.

The diff **does** port that function, the `rm.h` x* indices, the `switch_terrain` call, and the option bag (`optlist.h:750–751` `&flags.terrainstatus`, was wrongly `iflags`). It does **not** paint `botl.c` `terrain_descr[]`. Named. It does **not** wire `end_running` MAX_TYPE reset, `u_on_newpos`, `spoteffects`, `set_uinwater`, `dissolve_bars`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `classify_terrain` | C callee, **new** | `hack.c:3090–3172` |
| `switch_terrain` tail call | C body, **new** | `hack.c:3215–3216` |
| `xFLOOR`…`xWATERWALL` | C enum, **new** | `rm.h:100–107`; after `MATCH_WALL=38` |
| `Underwater` | C youprop, **clone** | `youprop.h:279` ≡ `u.uinwater` |
| `db_under_typ` | C callee, **imported** | D-1103; same file |
| `Is_earthlevel` / Medusa / Juiblex / waterlevel | C macros, **imported** | `const.js` |
| `D_ISOPEN` / `D_CLOSED\|LOCKED\|TRAPPED` | C bits, **imported** | `rm.h:235–239` |
| `flags.terrainstatus` bag | C optlist, **fixed** | was `iflags`; C `flag.h:67` |
| `terrain_descr[]` botl paint | C consumer, **named omit** | no JS table |
| `end_running` MAX_TYPE | C caller, **named omit** | `hack.c:4138–4143` |
| `update_lastseentyp` DRAWBRIDGE_UP under-typ | C writer, **named omit** | `dungeon.c:2932–2933`; JS still stores `typ` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Option default Off (`optlist` Off; not in `DOSET_BOOL_DEFAULT_ON`). Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** none. Path **public-unhit** (`terrainstatus` default Off; even On, botl does not yet print the string).

## Constitution / playbook

Grep of the four JS hunks: no trace-index gates. Do not restore the `iflags.terrainstatus` bag. Do not paint a fake status glyph from a recorded screen. Do not call `float_down` when `switch_terrain` blocks (unchanged D-1129). `#if 0` wall-collapse to `VWALL` is not C — do not port it.

## C ↔ JS fidelity

### `switch_terrain` call

C `hack.c:3212–3216`: Lev/Fly xor → `disp.botl`; then `if (flags.terrainstatus) classify_terrain();`. JS `:1524–1530` same xor onto `flags.botl`/`disp.botl`, then `if (game.flags?.terrainstatus) classify_terrain();`. Option Off: helper never runs. Match. Pre-existing `if (!lev) return` at the top of JS `switch_terrain` would skip classify on a missing cell; C `levl[][]` always exists after `isok`. Edge, not the Open miss.

### Read lastseentyp, not `lev->typ`

C `:3092–3093`: `lev = &levl[u.ux][u.uy]; typ = svl.lastseentyp[u.ux][u.uy]; /* lev->typ */`. The comment is a wish; the read is lastseentyp. JS `game.lastseentyp?.[ux]?.[uy] | 0`. Buffer is `[COLNO][ROWNO]` (`dungeon.js` `ensure_lastseentyp`), same `[x][y]` as `update_lastseentyp`. Missing buffer → `0` ≡ STONE ≡ C BSS. Match.

### Underwater then switch

C `:3102–3162` / JS `:1432–1464`:

| typ | C | JS |
|-----|---|-----|
| `u.uinwater` | `xSUBMERGED`; skip switch | **same** (`youprop.h` Underwater ≡ `uinwater`, not sticky `u.Underwater`) |
| STONE | arboreal → TREE | **same** (`level.flags.arboreal`) |
| CORR / ROOM | earth → `xGROUND` else `xFLOOR` | **same** (`Is_earthlevel(u.uz)`) |
| DOOR | `D_ISOPEN` → `xOPENDOOR`; CLOSED\|LOCKED\|TRAPPED → `xSHUTDOOR`; else doorway | **same** (`lev.doormask`) |
| DRAWBRIDGE_UP | `db_under_typ`; STONE\|ROOM → `xGROUND` | **same** body |
| MOAT | Medusa `xSEA`; Juiblex `xSWAMP` | **same** |
| WATER | `!Is_waterlevel` → `xWATERWALL` | **same** |
| default (ICE, POOL, LAVAPOOL, …) | keep typ | **same** |
| `#if 0` walls → VWALL | not compiled | **not ported** (correct) |

`db_under_typ` (`hack.js:795–806`, D-1103): `mask & DB_UNDER` → ICE / LAVAPOOL / MOAT else STONE. `DB_MOAT` is 0. Match C `dbridge.c`.

### Store + botl request

C `:3165–3170`: `if (typ != iflags.terrain_typ) { iflags.terrain_typ = typ; if (flags.terrainstatus && !svc.context.run) disp.botl = TRUE; }`. JS `| 0` so `undefined` ≡ BSS 0. Sets `iflags.terrain_typ`, then `flags.botl` **and** `disp.botl` (JS botl has two flags; extra `flags.botl` is the existing pattern). Run suppresses the request. Same-typ skip: no botl. Match.

### Option bag

C `optlist.h` `NHOPTB(terrainstatus, …, &flags.terrainstatus, … Off)`. Old JS wrote `iflags.terrainstatus`. This SHA writes `flags.terrainstatus`. Classify reads `flags`. That is a C-faithful bag fix, not a seed gate. Default still Off.

### lastseentyp DRAWBRIDGE_UP encoding (named, not this Must-fix)

C `dungeon.c:2932–2933` `update_lastseentyp` stores `db_under_typ` for DRAWBRIDGE_UP, **not** DRAWBRIDGE_UP. JS `update_lastseentyp` still stores `loc.typ` (comment: under-typ deferred). Consequence: C classify’s DRAWBRIDGE_UP arm is mostly dead after a mapped update (lastseentyp already ICE/MOAT/LAVAPOOL/STONE); JS arm is live and remaps to xGROUND for floor-under. That is the **writer** omit in `dungeon.js`, not a mis-port of the classify switch. Do not Must-fix classify to paper over lastseentyp. Map / later Open.

botl never indexes `terrain_descr[]` in JS (no generated table). `iflags.terrain_typ` is written and compared; the status line does not print “floor”. Subject claimed the remap into `iflags.terrain_typ`, not “botl shows Floor.” Named paint.

## Hallucinations / overclaim

D-log / CURRENT / subject say `switch_terrain` with `flags.terrainstatus` remaps lastseentyp into `iflags.terrain_typ`. **That is the hunk:** new function + the one C call + bag fix. Stamping **Addressed:** D-1151 is fair for the Open **function + switch_terrain wire**. Hash `6bdf4d49` is on the archive row (filled by D-1152). Do **not** stamp it as “Match C botl terrain string” or “Match C `update_lastseentyp` under-typ.” This is **not** “Match C dispatch, callee is a stub”: `classify_terrain` is new C; `db_under_typ` is D-1103. Default Off means public teleds never enter the helper — same as C.

## Density

One C function + its `switch_terrain` tail + the x* constants + the bag that C actually writes. ~90 JS lines. Related deferrals (botl paint, other callers, lastseentyp under-typ) named. Not “finish botl.c.” Right-size §2b.

## Verification

Journal: private canary **32**/32 (ice/pool; ROOM/CORR floor; earth ground; arboreal tree; door open/shut/trapped; drawbridge ice/lava/moat/floor; Medusa sea / Juiblex swamp; WATER wall vs waterlevel; uinwater; sticky Underwater ignore; same-typ no botl; run suppresses botl; option Off skip from switch_terrain; On classifies); green+strict seed8000/0900; cohort **23**/23 including 0007 options + 0012 vault + 0004/0002/0006/0009/0014/0017/0030/0060/0102/0106/0108/0116/0360/0367/0373/0383/0700/1500/1800/2200/4500 + strict 0007/0012/0360/4500/2200/0004/0002/0006/0030. Path **public-unhit** (`terrainstatus` default Off). Cadence #1460 **44**/44 does not turn the option On.

C read of `hack.c:3090–3217`, `:4130–4144`, `rm.h:98–107`, `youprop.h:279`, `optlist.h:750–751`, `dungeon.c:2927–2937`; JS SHA helper + bag. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| option Off | skip classify | **same** |
| ROOM, not earth | xFLOOR + botl if changed && !run | **same** |
| uinwater | xSUBMERGED | **same** |
| mapped DRAWBRIDGE_UP floor | lastseentyp already under-typ | JS lastseentyp still DRAWBRIDGE_UP — **named writer omit** |
| botl string | `terrain_descr[typ]` | **named skip** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open function + `switch_terrain` call match `hack.c:3090–3172` / `:3215–3216`.

Named omits / do-nots (map / Open, not Must-fix):

1. botl `terrain_descr[]` paint (`botl.c`).
2. `update_lastseentyp` DRAWBRIDGE_UP → `db_under_typ` / furniture-mimic `cmap_to_type` (`dungeon.c:2932–2936`).
3. `end_running` / `u_on_newpos` `iflags.terrain_typ = MAX_TYPE` then classify (`hack.c:4138–4143`).
4. `spoteffects` / `set_uinwater` / `dissolve_bars` / `digactualhole` / dothrow / `goto_level` `switch_terrain` callers.
5. `options.c` toggle that classifies immediately.
6. Do not restore the `iflags` bag. Do not port `#if 0` wall collapse. Do not pull `rloc_to` `maybe_unhide_at` into this SHA — **Addressed:** D-1152 `9b5ce7b3`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `switch_terrain` now calls a C-ordered `classify_terrain` that remaps lastseentyp into `iflags.terrain_typ` and requests botl when the option is On and the hero is not running, with botl paint and lastseentyp under-typ still named.
- Must-fix stays empty for this SHA; next port popped Open `rloc_to` `maybe_unhide_at`. **Addressed:** D-1152 `9b5ce7b3`. Not botl strings.
