# Review 620 — f88e0665 — dungeon.c print_mapseen cemetery bones list (D-1659)

## Metadata
- Full / short hash: `f88e06651f22c216f2ae68207ddacca1b4fdb976` / `f88e0665`
- Parent: `2ec50652` (D-1658). This file audits **this SHA only** (third of nine `js/` commits since review **617**). Archive **Addressed:** D-1659 `f88e0665`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 15:05:33 +0200
- D-id: **D-1659**
- Stats: `js/dungeon.js` +98/−18, `js/end.js` +13/−9. `js/` **111** insertions. Band **150–350** (id >454).
- Claims to close: Open cemetery bones list after D-1658. Not altar-god. Not knox/drawbridge.
- JS / map: `dungeon.js` `recalc_mapseen` / `mapseen_cemetery_lines`; `end.js` `savebones`. `c-js-map/startup.md`.
- Prior reviews this SHA claims to close: **611** / **619** named cemetery `:3696–3727`. `reviews/loop-2026-08-15/` has no unpaid cemetery Must-fix.

## Intent vs deliverable

Git subject promises: `#overview` lists known cemetery bones with C kncnt punctuation, instead of only a dead-hero you-line after D-1658.

Pinned C `print_mapseen` cemetery `:3696–3726` (`node scripts/csym.mjs print_mapseen` → `:3515–3728`). `recalc_mapseen` `:3074–3261`, clone `:3240–3260`, `knownbones=0` `:3113`. `interest_mapseen` `:2879–2923` (`final_resting_place && (knownbones || wizard)` `:2919–2920`). `--callers interest_mapseen`: `:3359`. `savebones` `bones.c:402–625`, cemetery attach `:572–581`. `--callers savebones`: `end.c:1365`. `strsubst` `hacklib.c:534–551` (first `strstr` only). `formatkiller` `topten.c:89–162`. PREFIX `"      "` `:3485`. TAB `"   "` `:3479`.

```3696:3724:nethack-c/upstream/src/dungeon.c
    if (mptr->final_resting_place || final > 0) {
        ...
        int kncnt = !died_here ? 0 : 1;
        for (bp = mptr->final_resting_place; bp; bp = bp->next)
            if (bp->bonesknown || wizard || final > 0)
                ++kncnt;
        if (kncnt) {
            Sprintf(buf, "%s%s", PREFIX, "Final resting place for");
            ...
            if (died_here) {
                formatkiller(tmpbuf, sizeof tmpbuf, how, TRUE);
                (void) strsubst(tmpbuf, " himself", " yourself");
                ...
                Snprintf(buf, ..., "%s%syou, %s%c", PREFIX, TAB,
                         tmpbuf, --kncnt ? ',' : '.');
```

```3240:3260:nethack-c/upstream/src/dungeon.c
    if (svl.level.bonesinfo && !mptr->final_resting_place) {
        ... clone chain ...
    }
    for (bp = mptr->final_resting_place; bp; bp = bp->next)
        if (svl.lastseentyp[bp->frpx][bp->frpy]) {
            bp->bonesknown = TRUE;
            mptr->flags.knownbones = 1;
        }
```

Old JS: `why>0 && onHere` always printed a you-line with **global** `/g` strsubst and `'.'`; no `final_resting_place` clone; `savebones` `frpx: u.ux0 | u.ux` bitwise OR; empty `how`. The diff **does** clone once, `lastseentyp[frpx][frpy]` → `bonesknown`, kncnt `,`/`.`, `died_here` only `why===2`, first-only replace, `formatkiller` into cemetery.how, death-cell `frpx`/`frpy`. It **does not** zero `u.ux`/`lastseentyp`, persist cemetery JSON, or fill `yyyymmddhhmmss` `when[]`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mapseen_cemetery_lines` | C `:3696–3726`, **LIVE this SHA** | export; PREFIX/TAB match `:3485`/`:3479` |
| `clone_cemetery_chain` | C `:3240–3251` loop, **CLONE** | do **not** add #2 |
| `recalc_mapseen` cemetery | C `:3113`/`:3240–3260`, **LIVE this SHA** | |
| `interest_mapseen` bones | C `:2919–2920`, **LIVE** (comment this SHA) | |
| `savebones` cemetery | C `:572–581`, **LIVE this SHA** how/frpx | still partial bones |
| `formatkiller` | C `:89–162`, **LIVE** | `incl_helpless` still `void` |
| `strsubst` | C `:534–551`, **LIVE** in hacklib | cemetery uses first-only `.replace` — do **not** add dungeon clone #2 |
| knox/castle `count_feat` | **OMIT named** | |
| `save_mapseen` cemetery JSON | **OMIT named** | |
| `yyyymmddhhmmss` `when[]` | C `:579`, **OMIT named** | print does not show `when` |
| ux/uy zero + lastseentyp wipe | C `:553–564`, **OMIT named** | |

`node scripts/csym.mjs print_mapseen` → `:3515-3728`. `recalc_mapseen` → `:3074-3261`. `interest_mapseen` → `:2879-2923`. `savebones` → `bones.c:402-625`. `strsubst` → `hacklib.c:534-551`. `formatkiller` → `topten.c:89-162`. `--callers print_mapseen`: `:3361`. `--callers recalc_mapseen`: `cmd.c:1109`, `do.c:1625`, `dungeon.c:3288`/`:3316`. `--callers savebones`: `end.c:1365`.

RNG: none in cemetery listing / clone / kncnt. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
clone_cemetery_chain NOT EXPORTED — 1 LOCAL js/dungeon.js:995
             => Do NOT write clone #2.
mapseen_cemetery_lines js/dungeon.js:1369   sync
recalc_mapseen   js/dungeon.js:1021   sync
interest_mapseen NOT EXPORTED — 1 LOCAL js/dungeon.js:885
             => Do NOT write clone #2.
savebones        NOT EXPORTED — 1 LOCAL js/end.js:866
             => Do NOT write clone #2.
formatkiller     js/end.js:220   sync
strsubst         js/hacklib.js:234   sync
```

`--can dungeon.js end.js formatkiller`: IN-SCC, `formatkiller` hoisted SAFE (`show_overview` already dynamic-imports `end.js`). `--can end.js dungeon.js mapseen_cemetery_lines`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** add `clone_cemetery_chain` #2. Do **not** add `strsubst` #2 in dungeon (import `hacklib.js` if replacing `.replace`).

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Clone. C `bonesinfo && !final_resting_place` then struct-copy the chain so overview does not need the level in memory (`:3240–3251`). JS `clone_cemetery_chain` copies `who`/`how`/`when`/`frpx`/`frpy`/`bonesknown`. **Match the once-clone guard.** JSON save/load of that chain is **not** this SHA. Named.

`bonesknown`. C `knownbones=0` at `:3113` then lastseentyp at death cell sets `bonesknown` + `knownbones`. JS zeros then the same loop. **Match `:3256–3260`.** Unseen death cell: non-wizard `#overview` has kncnt 0 unless `why>0`. **Match.**

Print. C `final_resting_place || final>0`; `died_here = final==2 && on_level`; kncnt; header without period; you-line only if `died_here`; `--kncnt` chooses `,` vs `.`; then cemetery `who, how`. JS same (`why===2`, not old `why>0`). **Match `:3696–3726`.** Old global `/g` replace is gone; four first-only `.replace` match four `strsubst` (`:534–551`). **Match.** Disclosure `show_overview(how>=PANICKED ? 1 : 2)` already matched C; `died_here` is now actually gated. **Match.**

`savebones`. C `ux0=ux` then `ux=uy=0` then wipe lastseentyp then `formatkiller`/`yyyymmddhhmmss`/`frpx=ux0`. JS captures `frpx`/`frpy` from live `ux`/`uy`, sets `ux0`/`uy0`, fills `how` via LIVE `formatkiller(how, true)`, leaves `when` empty. Coordinates **match C `frpx=ux0`**. Zeroing and `when[]` **named.** Old `ux0 | ux` bitwise OR is gone. **Match the claimed frpx bug.** `incl_helpless` in JS `formatkiller` is still `void` — C cemetery.how can append `", while helpless"`. Pre-existing stub, now wired into bones `how`. Named, not a silent empty `how`.

Callee closure (cemetery arm). LIVE: `formatkiller`, `on_level`, `recalc_mapseen`, `interest_mapseen` bones test. CLONE: `clone_cemetery_chain` matched to `:3240–3251`; first-only replace matched to `strsubst`. OMIT named: lastseentyp wipe; `yyyymmddhhmmss`; cemetery JSON; knox/castle; valley/sanctum auto-flags. STUB in the listing arm: **none** (you-line + who/how + kncnt all live). Combined-arm ships. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject kncnt list vs you-only: **true.** D-log clone + lastseentyp `bonesknown`: **true.** Do **not** stamp “Match C `savebones` ux=0 lastseentyp wipe.” Do **not** stamp “Match C `yyyymmddhhmmss`.” Do **not** stamp “Match C `formatkiller` helpless.” Do **not** stamp “Match C `save_mapseen` cemetery JSON.” Do **not** re-port altar-god (D-1658). Public `#overview` cemetery lines are **public-unhit** unless a session loads bones and sees the death cell.

## Density

+111: C cemetery ~30 + clone ~20 + savebones attach ~15. §2b one `print_mapseen` cemetery family + the `savebones` fields that feed it. Did not glue knox/JSON. Above a one-`if` peel.

## Verification

Wired: clone-once; lastseentyp → knownbones; kncnt punct; `why===2` you-line; first-only strsubst; `formatkiller` how; frpx from death x/y. Unwired C: ux wipe; when[]; JSON; helpless. Conf: no RNG. No seed gate.

D-log private canary clone/bonesknown/kncnt/died_here/wizard; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for a bones who/how line. Fortress `#overview` without `final_resting_place` does not prove `:3696`.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `save_mapseen`/`load_mapseen` cemetery JSON; `yyyymmddhhmmss` `when[]`; `savebones` ux/uy zero + lastseentyp wipe; `formatkiller` `incl_helpless`; knox/drawbridge castle; valley/sanctum/oracle/Blind bigroom. Do **not** add `clone_cemetery_chain` #2. Do **not** add `strsubst` #2 in dungeon. Do **not** re-port altar-god (D-1658). Do **not** re-port `dooverview` (D-1650).

Verdict: **ACCEPT-WITH-DEBT**
