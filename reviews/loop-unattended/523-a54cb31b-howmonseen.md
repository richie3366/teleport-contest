# Review 523 — a54cb31b — vision.c howmonseen bitmask (D-1562)

## Metadata
- Full / short hash: `a54cb31b8b4f72625d2a3975f891305820ac8dff` / `a54cb31b`
- Parent: `c60475f1` (D-1561). This file audits **this SHA only** (fifth of nine `js/` commits since review **518**). Archive **Addressed:** D-1562 `a54cb31b`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 05:13:46 +0200
- D-id: **D-1562**
- Stats: `js/pager.js` +70 / −5, `js/vision.js` +49 / −1, `js/apply.js` +9 / −10. Band 150–350 (js/ insertions **128**).
- Claims to close: Open `howmonseen` after D-1548 / review **509**. Not worm_known. `reviews/loop-2026-08-15/` has no unpaid howmonseen Must-fix.
- JS / map: `vision.js` `howmonseen`; `apply.js` `use_mirror`; `pager.js` `howmonseen_look_buf`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **509** named `howmonseen`.

## Intent vs deliverable

Git subject promises: `use_mirror` distinguishes INFRAVIS-only from normal sight and farlook reports `[seen:]` bits instead of treating every visible monster as `MONSEEN_NORMAL`.

Pinned C `vision.c` `howmonseen` `:2151–2186`. Callers `apply.c` `use_mirror` `:1108`; `pager.c` `look_at_monster` `:486` (only when `monbuf` non-NULL). `look_all` `:2002` passes `(char *)0` so it does **not** call `howmonseen`. Bits `vision.h:64–71`. `hack.h` `mdistu` `:1532` ≡ `distu(mx,my)`. `MATCH_WARN_OF_MON` `:1135–1140`. `See_invisible` / `Detect_monsters` `youprop.h:152/:190`.

```2159:2184:nethack-c/upstream/src/vision.c
    if ((mon->wormno ? worm_known(mon) : (cansee(mon->mx, mon->my)
                                          && couldsee(mon->mx, mon->my)))
        && mon_visible(mon) && !mon->minvis)
        how_seen |= MONSEEN_NORMAL;
    if (useemon && mon->minvis)
        how_seen |= MONSEEN_SEEINVIS;
    if ((!mon->minvis || See_invisible) && see_with_infrared(mon))
        how_seen |= MONSEEN_INFRAVIS;
    if (tp_sensemon(mon))
        how_seen |= MONSEEN_TELEPAT;
    if (useemon && xraydist > 0 && mdistu(mon) <= xraydist)
        how_seen |= MONSEEN_XRAYVIS;
    if (Detect_monsters)
        how_seen |= MONSEEN_DETECT;
    if (MATCH_WARN_OF_MON(mon))
        how_seen |= MONSEEN_WARNMON;
```

```1107:1123:nethack-c/upstream/src/apply.c
#define SEENMON (MONSEEN_NORMAL | MONSEEN_SEEINVIS | MONSEEN_INFRAVIS)
    how_seen = vis ? howmonseen(mtmp) : 0;
    ...
    } else if ((how_seen & SEENMON) == MONSEEN_INFRAVIS) {
```

Old JS: `how_seen = vis ? MONSEEN_NORMAL : 0`; pager omitted monbuf.

The diff **does** export `howmonseen`, wire `use_mirror`, and fill lookat `[seen:]`. It **does not** port cutworm/`redraw_worm`, `vision_recalc` xray IN_SIGHT circle, look health/stuck/leashed/trapped/hallu, Medusa `mon_reflects` / nymph steal. Named. `look_all` stays NULL-equivalent (`look_at_monster_buf` only). **No gameplay RNG** in `howmonseen` (Hallu only in WARNMON look text).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `howmonseen` | C `:2151–2186`, **LIVE this SHA** | vision.js |
| `MONSEEN_*` | C `vision.h:65–71`, **LIVE** | const.js; apply dropped locals |
| `canseemon` / `mon_visible` / `see_with_infrared` / `tp_sensemon` / `MATCH_WARN_OF_MON` | C, **LIVE** | display.js |
| `worm_known` | C, **LIVE** | D-1548 |
| `mdistu` | C `hack.h:1532`, **inlined** | no clone function |
| `howmonseen_look_buf` | C `:485–554`, **CLONE** | pager local; C is inline in look_at_monster |
| `use_mirror` `:1108` | C, **LIVE this SHA** | was NORMAL stub |
| lookat `[seen:]` | C pager `:1619`, **LIVE this SHA** | `describe_looked` |
| `look_all` monbuf | C `:2002` NULL, **LIVE unchanged** | no `[seen:]` |
| xray IN_SIGHT circle | C `vision_recalc:631–660`, **OMIT named** | |
| cutworm / Medusa / nymph | **OMIT named** | |

`node scripts/csym.mjs howmonseen` → `vision.c:2151-2186`. `--callers howmonseen`: apply `:1108`; pager `:486`; extern; vision.h. No `rn2`/`rnd` in the function. `use_mirror` later `d`/`rn2` is pre-existing (floating eye), not this SHA.

`node scripts/sym.mjs` on new / re-pointed names (apply deleted local MONSEEN_*):

```
howmonseen       js/vision.js:884   sync
howmonseen_look_buf NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/pager.js:334
             => Do NOT write clone #2.
canseemon        js/display.js:310   sync
             !! ALSO 5 LOCAL CLONE(S) … dig monmove mthrowu muse trap
worm_known       js/worm.js:288   sync
MATCH_WARN_OF_MON js/display.js:378   sync
tp_sensemon      js/display.js:394   sync
see_with_infrared js/display.js:654   sync
mon_visible      js/display.js:298   sync
```

Do **not** add `howmonseen_look_buf` #2 or `canseemon` #6. `node scripts/imports.mjs --can` vision→display `canseemon`, vision→worm `worm_known`, apply/pager→vision `howmonseen`: ALREADY. Cycle alone is not a blocker; `canseemon` is a hoisted `export function`. No TDZ.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates in this SHA’s `js/` (`J_DIAG` / `FORCEBUNGLE` in apply are C names, not this diff). `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Bits. `0x0001 … 0x0040` match `vision.h:65–71`. Apply `SEENMON` reuses const.js. **Match.**

NORMAL. `wormno ? worm_known : (cansee && couldsee)` + `mon_visible` + `!minvis`. **Not** `canseemon` (that ORs infrared). Astral IN_SIGHT without COULD_SEE is not NORMAL. **Match `:2162–2165`.**

SEEINVIS. `canseemon && minvis`. **Match `:2167–2168`.**

INFRAVIS. `(!minvis \|\| See_invisible) && see_with_infrared`. JS `H\|\|E\|\|u.See_invisible` ≡ C `H\|\|E`. **Match `:2170–2171`.**

TELEPAT / DETECT / WARNMON. `tp_sensemon`; `HDetect\|\|EDetect`; `MATCH_WARN_OF_MON` (obj/polyd mflags2 + species pointer). **Match.**

XRAYVIS. `useemon && xraydist > 0 && dx²+dy² <= xraydist`. **Match `mdistu`.** Does not paint `IN_SIGHT` here. **Do not stamp Match C xray circle.**

`use_mirror`. `vis ? howmonseen : 0`. INFRAVIS-only `(how_seen & SEENMON) == INFRAVIS` now reachable. **Match `:1108/:1123`.** Medusa/nymph still named (later arms).

look monbuf. Skip when 0 or NORMAL-only. Order NORMAL, SEEINVIS, INFRAVIS, TELEPAT, XRAYVIS “astral vision”, DETECT, WARNMON (Hallu “paranoid delusion” else warned of human/elf/orc/demon/`pmname`+`Mgender` ≡ `female?FEMALE:MALE`). Join `", "`. **Match `:485–547`.** Leftover bits: C `impossible`; JS `(%u)` without impossible. Harmless.

look_all. C NULL monbuf. JS `look_all` uses `look_at_monster_buf` only — no `[seen:]`. **Match `:2002`.** `describe_looked` (lookat/getpos) appends ` [seen: …]` — **Match pager `:1619`.**

Callee closure. LIVE: `canseemon`, `worm_known`, `cansee`, `couldsee`, `mon_visible`, `see_with_infrared`, `tp_sensemon`, `MATCH_WARN_OF_MON`, `Hallucination`, `pmname`, `makeplural`. CLONE: `howmonseen_look_buf` (C inline). OMIT named: xray circle, cutworm, Medusa/nymph. STUB: **none**. Arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject INFRAVIS-only + farlook `[seen:]`: **true**. D-log “look_all NULL”: **true** (JS look_all does not call `howmonseen_look_buf`). Do **not** stamp “Match C `vision_recalc` xray IN_SIGHT.” Do **not** stamp “Match C Medusa `mon_reflects`.” Do **not** stamp “Match C `mdistu` export” (inlined). This is **not** “dispatch ported, callee stubbed.”

## Density

One C function + its two live callers. +128 JS. Did not glue cutworm. §2b OK.

## Branch-by-branch confirm

1. Lit visible: NORMAL; mirror not INFRAVIS-only. **Match.**
2. Infrared-only `canseemon`: INFRAVIS, no NORMAL; mirror “too far away to see in the dark.” **Match.**
3. Invisible + see invis: SEEINVIS. **Match.**
4. Detect: DETECT bit even if not NORMAL. **Match.**
5. Eyes `xray_range=3` + `canseemon` in range: XRAYVIS. **Match the bit.** Map glyphs still named-omit circle.
6. Warn Sting orc: WARNMON “warned of orcs.” **Match.**
7. Farlook NORMAL-only: no `[seen:]`. **Match.**
8. Farlook telepathy: `[seen: telepathy]`. **Match.**
9. `#` look_all: no `[seen:]`. **Match NULL monbuf.**

## Callers / RNG ledger

C: mirror after `bhit`; lookat when `monbuf`; not look_all. Public-unhit for INFRAVIS-only mirror / `[seen:]`. No seed gate. **No core RNG** in `howmonseen`.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. `xraydist` is C’s `xray_range²`, not a recorded coordinate.

## Verification

D-log canary **11**/11 (NORMAL/DETECT/SEEINVIS/TELEPAT/XRAYVIS/WARNMON/INFRAVIS-only SEENMON); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** Admit it.

## Actionable C-wrongs

None for Must-fix. Named: `vision_recalc` xray IN_SIGHT; cutworm / `redraw_worm`; look health/stuck/leashed/trapped/hallu; Medusa `mon_reflects` / nymph steal+rloc. Do not add `howmonseen_look_buf` #2. Do not import `mdistu` as a function. Do not put `[seen:]` on `look_all`.

Verdict: **ACCEPT-WITH-DEBT**
