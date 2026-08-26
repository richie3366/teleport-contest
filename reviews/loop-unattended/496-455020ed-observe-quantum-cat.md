# Review 496 — 455020ed — pickup.c observe_quantum_cat FOOT (D-1535)

## Metadata
- Full / short hash: `455020ede8b4a2215145ad5cbeba4ccf54008de5` / `455020ed`
- Parent: `289573bc` (D-1534). This file audits **this SHA only** (fifth of nine `js/` commits since review **491**). Archive **Addressed:** D-1535 `455020ed`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 06:55:05 +0200
- D-id: **D-1535**
- Stats: 12 files, +306 / −79 — `js/pickup.js` +180 / −20, `js/end.js` +76 / −24, `js/objnam.js` +8 / −2. Band **200–450** (js/ insertions **264**).
- Claims to close: Open `pickup.c` `observe_quantum_cat` FOOT (named from D-1534 / D-1508). Not HEAD. `reviews/loop-2026-08-15/` has no unpaid quantum-cat Must-fix.
- JS / map: `pickup.js` + `end.js` disclose + `objnam.js` latebound FOOT. `c-js-map/data.md` + `turns.md`.
- Prior reviews this SHA claims to close: none unpaid.

## Intent vs deliverable

Git subject promises: opening a SchroedingersBox uses `body_part(FOOT)` and collapses live/dead.

Pinned C `pickup.c` `observe_quantum_cat` `:2826–2896`; callers `use_container` `:3020–3025` TRUE,TRUE; `tipcontainer_checks` `:4034–4045` TRUE,TRUE; `end.c` `:1266–1275` FALSE,FALSE; `container_contents` `:1619–1653` live-cat line. `obj.h:340` `LARGE_BOX && spe==1`. `hack.h` `FOOT=5`. `something` is `c_something` (“something”).

```2844:2857:nethack-c/upstream/src/pickup.c
    if (itsalive) {
        if (makecat)
            livecat = makemon(&mons[PM_HOUSECAT], box->ox, box->oy,
                              NO_MINVENT | MM_ADJACENTOK | MM_NOMSG);
        if (livecat) {
            livecat->mpeaceful = 1;
            set_malign(livecat);
            if (givemsg) {
                if (!canspotmon(livecat))
                    You("think %s brushed your %s.", something,
                        body_part(FOOT));
                else
                    pline("%s inside the box is still alive!",
                          Monnam(livecat));
```

Old JS: named omit; loot emptymsg never `"now "`; disclose never `Schroedinger's cat!`.

The diff **does** add `observe_quantum_cat`, wire loot/tip/disclose, FOOT via `body_part_latebound` (no pickup→polyself), humanoid unset `"foot"`. It **does not** port muse loot, escape/ascend companion HP, cursed-mbag `"now "`, or shop `Shk_Your`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `observe_quantum_cat` | C `:2826`, **LIVE this SHA** | |
| `SchroedingersBox` | C macro, **LIVE** pickup + **CLONE** end.js | zap.js already cloned |
| `rn2(2)` | C `:2832`, **LIVE** | |
| `get_obj_location` flags 0 | C `zap.c:654`, **CLONE** `get_obj_location_quantum` | timeout.js LIVE but pickup→trap→timeout→do→pickup |
| `makemon` HOUSECAT | C `:2846`, **LIVE** | |
| `body_part(FOOT)` | C `polyself.c`, **CLONE** latebound | cycle vs polyself |
| `christen_monst` / `oname` / `set_corpsenm` | C, **LIVE** | |
| `more_experienced` / `newexplevel` | C, **LIVE** | 10/20 vs 20/10 |
| `Hallucination` / `rndmonnam` | C dead pline, **LIVE** | display Hallucination |
| `Shk_Your` tip | C `:4041`, **OMIT named** | Your/The stand-in |
| muse / escape HP | C, **OMIT named** | |

`node scripts/sym.mjs observe_quantum_cat SchroedingersBox body_part_latebound get_obj_location makemon set_malign canspotmon christen_monst set_corpsenm oname more_experienced newexplevel rndmonnam Hallucination`:

```
observe_quantum_cat js/pickup.js:1767   ASYNC — await required
SchroedingersBox js/pickup.js:136   sync
             !! ALSO 2 LOCAL CLONE(S) … js/end.js:363  js/zap.js:3521
body_part_latebound js/objnam.js:1705   sync
get_obj_location js/timeout.js:628   sync
             !! ALSO 1 LOCAL CLONE(S) … js/shk.js:527
makemon          js/makemon.js:2076   sync
set_malign       js/makemon.js:492   sync
canspotmon       js/display.js:527   sync
christen_monst   js/do_name.js:324   sync
set_corpsenm     js/mkobj.js:1139   sync
oname            js/do_name.js:673   sync
more_experienced js/exper.js:246   sync
newexplevel      js/exper.js:269   ASYNC — await required
rndmonnam        js/do_name.js:206   sync
Hallucination    js/display.js:320   sync
```

`get_obj_location_quantum` is a new flags-0 clone in pickup (not a second timeout body). No symbol deleted. Latebound FOOT is not a new `body_part`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New RNG:** one `!rn2(2)` per collapse. Public-unhit.

## C ↔ JS fidelity

Coin. `itsalive = !rn2(2)` then live vs dead. **Match `:2832`.** `get_obj_location` flags 0: INVENT→u.ux,uy; FLOOR ox,oy; MINVENT if `ocarry.mx`; else no write. Clone **match `zap.c:657–675`** (no BURIED/CONTAINED at flags 0).

Live + `makecat`. `makemon(PM_HOUSECAT, ox, oy, NO_MINVENT|MM_ADJACENTOK|MM_NOMSG)`; peaceful; `set_malign`. **Match.** `!canspotmon` → `You think something brushed your ${FOOT}.` C `something` is the common string “something”. **Match the sentence.** Visible: `Monnam` still alive. **Match.** `christen_monst` `"Schroedinger's Cat"`; extract corpse; `owt`; `spe=0`; XP 10/20 if `!mon_moving`. **Match.** `makecat` FALSE: `livecat` stays 0, **spe left set**. **Match disclose.**

Dead. `spe=0`; givemsg `The ${Hallucination?rndmonnam:housecat} inside the box is dead!` **match `pline_The`.** `deadcat.age=moves`; `set_corpsenm(HOUSECAT)`; `oname(..., ONAME_NO_FLAGS)`; XP 20/10. **Match `:2874–2892`.** Corpse extract uses `quan=0`/`OBJ_FREE` instead of `obfree` — same dealloc pattern as other JS extract paths, not a stub of the collapse.

FOOT. `body_part_latebound(FOOT)`: if polyself installed, real `mbodypart(&youmonst)` (poly dog “rear paw”); else humanoid `"foot"`. **Match C `body_part` when the hook is set; unset fallback matches null-data humanoid.** `FOOT=5` **match `hack.h`.** No pickup→polyself import. **Match the cycle ban.**

Callers. `use_container`: observe TRUE,TRUE before inokay; emptymsg `"now "` when `quantum_cat`. **Match `:3020–3045` except cursed-mbag `"now "` named.** `tipcontainer`: observe then empty→Your/The box now empty + return; dead falls through to spill. **Match `:4034–4045` spill vs empty; `Shk_Your` shop prefix named.** Disclose: first box FALSE,FALSE; later boxes `spe=0`. **Match `:1266–1275`.** `container_contents` live line when `SchroedingersBox` still set. **Match `:1625–1653`.** Pickup loot look-inside also has that line; after TRUE,TRUE collapse `spe` is never 1, so it is unreachable there.

Callee closure. LIVE: `rn2`, `makemon`, `set_malign`, `canspotmon`, `christen_monst`, `set_corpsenm`, `oname`, `more_experienced`, `newexplevel`, `Hallucination`, `rndmonnam`. CLONE: location flags-0, latebound FOOT, end `SchroedingersBox` macro. OMIT named: `Shk_Your`, muse, escape HP. STUB: none in the collapse arm. **The function may ship.**

## Hallucinations / overclaim

Subject FOOT + collapse: **true of `:2826–2896` + the three C callers.** D-log “Live-unseen uses FOOT”: **true of `!canspotmon`.** This is **not** “dispatch ported, callee stubbed.” Stamping **Addressed:** D-1535 is fair. Do **not** stamp “Match C `Shk_Your`.” Do **not** stamp “Match C muse loot.” Do **not** stamp “Match C escape companion HP.” Do **not** import pickup→polyself for FOOT.

## Density

+264 JS: one C function plus its three C callers + disclose line. §2b cluster, under the 450 cap. Did not glue `S_hcdoor`.

## Branch-by-branch confirm

1. Live, makecat, unseen: FOOT brush, spe 0, XP 10/20. **Match.**
2. Live, makecat, seen: Monnam alive. **Match.**
3. Live, !makecat: no mon, spe stays 1. **Match.**
4. Dead, givemsg: housecat / hallu rndmonnam; corpse named; XP 20/10. **Match.**
5. `makemon` fail: no spe clear on live arm. **Match `if (livecat)`.**
6. Loot `"now empty"` after quantum. **Match.**
7. Tip live: empty return; dead: spill. **Match.**
8. Disclose two boxes: first coin, second forced dead. **Match.**

## Callers / RNG ledger

C: loot, tip, disclose, muse (named). JS: first three. One `rn2(2)` per collapse. Public-unhit. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE.

## Verification

D-log canary **16**/16 (makecat FALSE spe; Blind FOOT; poly paw; christen; Rule #2); green+strict; seed4500 FULL; cohort **7**/7. **Public-unhit.** Admit it.

## Actionable C-wrongs

None for Must-fix. Named: muse; escape HP; `Shk_Your`; cursed-mbag `"now "`.

Verdict: **ACCEPT-WITH-DEBT**
