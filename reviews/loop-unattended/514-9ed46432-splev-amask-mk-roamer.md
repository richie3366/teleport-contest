# Review 514 — 9ed46432 — sp_lev.c splev_create_monster amask + mk_roamer (D-1553)

## Metadata
- Full / short hash: `9ed46432b1de7de1b48edcf8f0a25f55caf16f8f` / `9ed46432`
- Parent: `4383ae0a` (D-1552). This file audits **this SHA only** (fifth of nine `js/` commits since review **509**). Archive **Addressed:** D-1553 `9ed46432`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 13:14:52 +0200
- D-id: **D-1553**
- Stats: `js/mklev.js` +87 / −116. Band 150–350 (js/ insertions **87**).
- Claims to close: Open generic `splev_create_monster` RANDOM-only (named from D-1531 / review **492**). Not `mk_mplayer`. `reviews/loop-2026-08-15/` has no unpaid amask Must-fix.
- JS / map: `mklev.js` `sp_amask_to_amask` / `splev_create_monster` / room wrappers. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **492** named generic `induced_align(80)`+`makemon`.

## Intent vs deliverable

Git subject promises: `splev_create_monster` uses `sp_amask_to_amask` and `mk_roamer` when align is not RANDOM, instead of always `induced_align`+`makemon`.

Pinned C `sp_lev.c` `noncoalignment` `:1851–1860`; `sp_amask_to_amask` `:1907–1922`; `create_monster` spawn `:1983–1988` and post `:2125–2132`. Callee `priest.c` `mk_roamer` `:724–751`. Producer `get_table_align`.

```1912:1920:nethack-c/upstream/src/sp_lev.c
    if (sp_amask == AM_SPLEV_CO)
        amask = Align2amask(u.ualignbase[A_ORIGINAL]);
    else if (sp_amask == AM_SPLEV_NONCO)
        amask = Align2amask(noncoalignment(u.ualignbase[A_ORIGINAL]));
    else if (sp_amask == AM_SPLEV_RANDOM)
        amask = induced_align(80);
    else
        amask = sp_amask & AM_MASK;
```

```1983:1988:nethack-c/upstream/src/sp_lev.c
    if (m->sp_amask != AM_SPLEV_RANDOM)
        mtmp = mk_roamer(pm, Amask2align(amask), x, y, m->peaceful);
    else if (PM_ARCHEOLOGIST <= m->id && m->id <= PM_WIZARD)
        mtmp = mk_mplayer(pm, x, y, FALSE);
    else
        mtmp = makemon(pm, x, y, m->mm_flags);
```

Old JS: generic path always `induced_align(80)` then `makemon(..., 0)`; `splev_room_monster` / `_at` cloned that; Pri-loca/sanctum inlined `mk_roamer_splev` (D-1531).

The diff **does** port `sp_amask_to_amask` + `noncoalignment`, dispatch non-RANDOM → `mk_roamer_splev`, RANDOM → `makemon(mm_flags)`, peaceful `> BOOL_RANDOM` then `set_malign`, fold room helpers into wrappers, and retarget Pri-loca/sanctum noalign through the dispatcher (`rx`/`ry` + `splev_xstart`). It **does not** port `mk_mplayer`, `appear_as`, christen, invent, G_UNIQ extinct. Named. It does **not** stub `mk_mplayer` in the mk_roamer arm.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `sp_amask_to_amask` | C `:1907`, **LIVE this SHA** | local |
| `noncoalignment` | C `:1851`, **LIVE this SHA** | `rn2(2)` |
| `splev_create_monster` spawn | C `:1983–1988`, **LIVE this SHA** | |
| `mk_roamer_splev` | C `mk_roamer` `:724`, **CLONE** | cycle vs priest.js; verified |
| `makemon` RANDOM arm | C `:1988`, **LIVE** | `mm_flags` |
| `mk_mplayer` | C `:1985–1986`, **OMIT named** | NOT FOUND; RANDOM role-id stays `makemon` |
| `splev_room_monster` / `_at` | C same fn, **LIVE this SHA** | wrappers, not clones |
| `get_location_coord` | C, **LIVE** | packed origin + rx/ry |
| `appear_as` / christen / invent | C `:1994–2123`, **OMIT named** | |
| G_UNIQ extinct / G_GONE | C `:1950–1953`, **OMIT named** | |
| `reset_hostility` | C `:755`, **OMIT named** | |

`node scripts/csym.mjs` `sp_amask_to_amask` is a `staticfn` inside `sp_lev.c` (body cited above). `--callers create_monster` not required: one definition. `mk_roamer --sig` → `priest.c:724-751`.

`node scripts/sym.mjs mk_roamer mk_mplayer sp_amask_to_amask splev_create_monster noncoalignment induced_align Amask2align mk_roamer_splev`:

```
mk_roamer        NOT FOUND in js/**
mk_mplayer       NOT FOUND in js/**
sp_amask_to_amask NOT EXPORTED — 1 LOCAL js/mklev.js:11173
splev_create_monster js/mklev.js:11194   sync
noncoalignment   NOT EXPORTED — 1 LOCAL js/mklev.js:11162
induced_align    NOT EXPORTED — 1 LOCAL js/mklev.js:17176
Amask2align      js/const.js:188   sync
mk_roamer_splev  NOT EXPORTED — 1 LOCAL js/mklev.js:14882
             => Do NOT write clone #2
```

**Re-point:** `splev_room_monster` / `_at` **deleted** duplicate spawn → call `splev_create_monster`. Pri-loca/sanctum inlines **deleted** → dispatcher with `sp_amask: AM_NONE`. Do **not** add `mk_roamer` export (priest cycle; Keep local clone). Do **not** add a `mk_mplayer` stub.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean. **RNG:** `noncoalignment` `rn2(2)`; RANDOM still `induced_align(80)`; non-RANDOM **does not** burn that 80.

## C ↔ JS fidelity

`sp_amask_to_amask`. CO → `Align2amask(ualignbase.original)` (JS object, C `A_ORIGINAL` index — same value). NONCO → `noncoalignment` then mask. RANDOM → `induced_align(80)`. Else `sp_amask & AM_MASK`. **Match `:1912–1919`.** `AM_NONE` (0) & mask = 0; `Amask2align(0)` is `A_NONE`. **Match Pri-loca lua.**

`noncoalignment`. `k=rn2(2)`; `!alignment` → ±1; else `-alignment` or 0. **Match `:1856–1859`.**

Spawn arms (callee closure):

1. **`sp_amask != RANDOM` → `mk_roamer`.** LIVE clone `mk_roamer_splev`: `rloc` occupant, `makemon(MM_ADJACENTOK|MM_EMIN|MM_NOMSG)`, `min_align`, renegade `coaligned && !peaceful`, `isminion`, `mon_learns_traps(-1)`, `mpeaceful`, `msleeping=0`, `set_malign`. **Match `:735–748`.** Peaceful `BOOL_RANDOM` (−1) is truthy in JS and C `boolean`. STUB: none. **Arm may ship.**

2. **`mk_mplayer` role-id.** OMIT named. JS RANDOM role-id uses `makemon`. Not a stub inside arm 1. CURRENT Keep: do not stub `mk_mplayer` in a live arm — they did not.

3. **`makemon(mm_flags)`.** LIVE. Default `mm_flags` 0 when omitted. **Match callers that never set it.**

Post. `female` still named-id vs class-letter (D-0873). `peaceful > BOOL_RANDOM` then `set_malign` — **Match `:2126–2129`** (generic path previously skipped `set_malign`). `asleep` / `waiting` partial. **Named** the rest.

Coords. `get_location_coord` without croom: `splev_xstart+rx`. Pri-loca `rx:20,ry:7` ≡ old `mx+20,my+7`. Sanctum `placeNoalignCleric(rx,ry)` ≡ old `mx+rx`. **Match packed origin.** Humidity ignored on packed coords — **pre-existing named.**

Callee closure (non-RANDOM arm). LIVE: `sp_amask_to_amask`, `Amask2align`, `makemon`. CLONE: `mk_roamer_splev` verified. OMIT: `mk_mplayer` (other arm), appear_as, G_UNIQ. STUB: **none.** Combined-arm rule: the shipped mk_roamer arm may ship.

## Hallucinations / overclaim

Subject non-RANDOM `mk_roamer`: **true** of the dispatcher and of Pri-loca/sanctum. Stamping **Addressed:** D-1553 is fair for **492’s** generic omit. Do **not** stamp “Match C `mk_mplayer`.” Do **not** stamp “Match C `appear_as`.” Packed fills that still call `splev_create_monster` **without** `sp_amask` stay RANDOM (induced_align+makemon) — only Pri-loca/sanctum pass `AM_NONE`. That is producer wiring, not a stubbed callee. This is **not** “dispatch ported, callee stubbed”: `mk_roamer_splev` is a verified clone; `mk_mplayer` is a **named omitted arm**, not an early-return inside mk_roamer.

## Density

+87 JS: one C `create_monster` spawn envelope + room clones folded + two packed producers. Did not glue `mhidden_description`. §2b OK.

## Branch-by-branch confirm

1. `AM_NONE`, peaceful 0: `mk_roamer`, `min_align=A_NONE`, hostile, `isminion`. **Match.**
2. Default opts (RANDOM): `induced_align(80)` then `makemon`. **Match.**
3. CO lawful original: `Align2amask` lawful, then mk_roamer. **Match** if a caller passes `AM_SPLEV_CO` (none packed yet).
4. NONCO: `rn2(2)` then mk_roamer. **Match the helper.**
5. Room wrapper: same dispatch, `inside_room` bail. **Match `:1980–1981`.**
6. Role-id RANDOM: `makemon` not `mk_mplayer`. **Named.**
7. seed0367 Pri-loca: still AM_NONE via dispatcher. **Match D-1531 path.**

## Callers / RNG ledger

C: every lua `des.monster`. JS: generic + room + Pri-loca/sanctum noalign. Public: seed0367 / 0360 / priest 0501/0106. No seed gate in `js/`. NONCO is the new core `rn2`.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. `mk_roamer_splev` stays local (mklev→priest cycle). `node scripts/imports.mjs --can` not needed: no new priest import.

## Verification

D-log canary **22**/22 (AM_NONE `A_NONE` isminion; RANDOM not A_NONE-forced; CO; NONCO `rn2(2)`; croom wrapper; Rule #2); seed0367 **FULL** 50125/50125 Scr 324/324 + strict; seed0360 FULL; priest 0501/0106; green+strict; cohort **7**/7. seed0367 is **public-hit** for Pri-loca; generic CO/NONCO still **public-unhit** unless a session lua uses those masks.

## Actionable C-wrongs

None for Must-fix. Named: `mk_mplayer` role-id; `appear_as` / christen / invent DEFAULT/CUSTOM; G_UNIQ extinct / G_GONE; cancelled/revived/avenge/stun/conf/invis/blind/para/flee; waiting vampshifted `newcham`; `m_lev_adj`; other packed fills that never pass `sp_amask`; `reset_hostility`. Do **not** add `mk_roamer` clone #2 under that name.

Verdict: **ACCEPT-WITH-DEBT**
