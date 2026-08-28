# Review 547 — 9cdc66f5 — mon.c newcham NC_SHOW_MSG (D-1586)

## Metadata
- Full / short hash: `9cdc66f50ef1f80329de6b8974cd1e4f7669a5f2` / `9cdc66f5`
- Parent: `d5c9430a` (D-1585). This file audits **this SHA only** (second of nine `js/` commits since review **545**). Archive **Addressed:** D-1586 `9cdc66f5`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 18:50:39 +0200
- D-id: **D-1586**
- Stats: `js/makemon.js` +173/−11, `js/hacklib.js` +11, `js/do_name.js` +8, `js/mon.js` +3/−3, `js/mhitm.js` +2/−2, `js/zap.js` +2/−2. Band **150–350** (js/ insertions **199**).
- Claims to close: Open NC_SHOW_MSG after D-1573. Not Protection cancel. Not `m_unleash`. `reviews/loop-2026-08-15/` has no unpaid newcham-msg Must-fix.
- JS / map: `makemon.js` `newcham`/`usmellmon`; `do_name.js` `noname_monnam`; `hacklib.js` `upstart`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **534** named NC_SHOW_MSG `pline_mon`.

## Intent vs deliverable

Git subject promises: a visible shapeshift prints `pline_mon` disappears/appears/turns-into (`usmellmon`/`noname_monnam`/`upstart`) instead of staying silent.

Pinned C `mon.c` `newcham` `:5276–5535`. Msg arm `:5458–5477` after `newsym`. `usmellmon` `:5795–5909`. `do_name.c` `noname_monnam` `:1101–1105`. `hacklib.c` `upstart` `:113–119`. `olfaction` `mondata.c:1506–1518`. `maybe_polyd` `youprop.h:22`. `NC_SHOW_MSG` `hack.h:1463` `0x01`. Callers `--callers newcham` include `decide_to_shapeshift` `:4928`, digest `:1100–1102`, zap `bhitm` `:305`, **`normal_shape` `:4438`**, stone cham `:3825`, genocide `:5665`, muse/trap/uhitm vis.

```5458:5476:nethack-c/upstream/src/mon.c
    if (msg) {
        if (!canspotmon(mtmp)) {
            if (seenorsensed)
                pline_mon(mtmp, "%s disappears!", oldname);
            (void) usmellmon(mdat);
        } else if (!seenorsensed) {
            char *mnm = x_monnam(mtmp, mtmp->mtame ? ARTICLE_YOUR : ARTICLE_A,
                                 (char *) 0, 0, FALSE);
            pline_mon(mtmp, "%s appears!", upstart(mnm));
        } else {
            pline_mon(mtmp, "%s turns into %s!", oldname,
                      noname_monnam(mtmp, ARTICLE_A));
        }
    }
```

Old JS: D-1573 body live; NC_SHOW_MSG commented async. `normal_shape` already passed `NC_SHOW_MSG` into a no-op flag.

The diff **does** live the three plines + `usmellmon`, export `noname_monnam`/`upstart`, await decide_to_shapeshift / digest / zap poly. It **does not** await `normal_shape` (`:4438`). It **does not** port `m_unleash`, ustuck, break-armor, Elbereth, stone-cham SHOW_MSG (`:3825` still flags 0), genocide SHOW_MSG. Named except the live `normal_shape` fire-and-forget.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `newcham` msg arm | C `:5458–5477`, **LIVE this SHA** | `newcham_show_msg` |
| `usmellmon` | C `:5795–5909`, **LIVE this SHA** | in `makemon.js` (newcham home) |
| `noname_monnam` | C `:1101–1105`, **LIVE this SHA** | C home `do_name.js` |
| `upstart` | C `:113–119`, **LIVE this SHA** | C home; 8 clones remain |
| `olfaction` | C `:1506–1518`, **LIVE** | import |
| `pline_mon` / `canspotmon` / `x_monnam` | **LIVE** | |
| `maybe_polyd` orc | C `youprop.h:22`, **CLONE** | inlined `Upolyd ? is_orc : Race_if` |
| `Race_if` | **CLONE** | existing `makemon.js:540`, not #4 |
| `You` / `Something` | **CLONE** | `pline("You…")` / `"Something stinks."` |
| decide / digest / zap poly | C SHOW_MSG, **LIVE await** | |
| `normal_shape` | C `:4438` SHOW_MSG, **live flag, no await** | **C-wrong** |
| stone cham / genocide SHOW_MSG | **OMIT named** | flags 0 / comment |
| `m_unleash` / ustuck / break-armor / Elbereth | **OMIT named** | |

`node scripts/csym.mjs newcham` → `:5276-5535`. `usmellmon` → `:5795-5909` (`--callers`: newcham `:5465`; wizcmds `#wizsmell`). `noname_monnam` → `:1101-1105` (newcham `:5474`; ustuck `:5421` named). `upstart` → `:113-119`. `normal_shape` `--callers`: `rescham` `iter_mons`; `restore_cham` `:4653`; `zap.c:3199`.

RNG: `l_oldname` `x_monnam` always (Hallu `rndmonnam`) even when ustuck named. **Match C consume.** No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
usmellmon        js/makemon.js:1132   ASYNC — await required
noname_monnam    js/do_name.js:625   sync
upstart          js/hacklib.js:107   sync
             !! ALSO 8 LOCAL CLONE(S) in 8 files — IMPORT the export; do NOT add another
               js/apply.js:1725  js/do_name.js:783  js/monmove.js:163  js/mthrowu.js:238
               js/pickup.js:190  js/read.js:1437  …and 2 more (trap.js / readobjnam.js)
newcham          js/makemon.js:1274   sync
olfaction        js/monsters.js:668   sync
is_orc           js/monsters.js:555   sync
NC_SHOW_MSG      js/const.js:1759   sync   export const
pline_mon        js/display.js:4404   ASYNC — await required
canspotmon       js/display.js:551   sync
x_monnam         js/do_name.js:520   sync
highc            js/hacklib.js:94   sync
maybe_polyd      NOT FOUND
Race_if          NOT EXPORTED — 3 LOCAL CLONE(S) (dig / dothrow / makemon)
```

`--can makemon.js hacklib.js upstart`: ALREADY. `--can makemon.js do_name.js noname_monnam`: ALREADY. `--can mon.js makemon.js newcham`: ALREADY. Parent had no `upstart` export; this is not clone #9. Do **not** add another.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Msg capture. `seenorsensed = canspotmon` at entry; `oldname` tame YOUR else THE + `SUPPRESS_SADDLE` + `upstart`/`highc`; `l_oldname` always (named-saddle suppress). **Match `:5285–5319`.** `msg` bit `0x01`. **Match.**

Three arms after `newsym`. `!canspotmon` now: disappears if `seenorsensed`, then `usmellmon(mdat)`. **Match `:5461–5465`.** `!seenorsensed`: `upstart(x_monnam` YOUR/A `) appears!`. **Match `:5466–5470`.** Else `oldname turns into noname_monnam ARTICLE_A`. **Match `:5471–5475`.** `noname_monnam` = `x_monnam(..., SUPPRESS_NAME)`. **Match `:1101–1105`.**

`usmellmon`. `!olfaction` false. **Match `:5802–5804`.** mndx switch (rothe/minotaur bovine; cave/barb/neanderthal odor; devil/balrog/princes break; were/owlbear den; steam; green slime `Something stinks.`; fungus mushrooms; unicorns/jellyfish break; default nonspecific). **Match case list.** mlet S_DOG/DRAGON/FUNGUS/UNICORN pony-vs-strong/ZOMBIE/EEL/ORC `maybe_polyd`. **Match `:5871–5906`.** `You("…")` as `pline("You …")` is the port’s usual You stand-in, not a silent stub.

Vampire cham + `check_gear` **before** awaiting More (C prints first `:5478–5489`). Cham is unused by the pline; gear is next-turn. Not the Must-fix.

**`normal_shape` C-wrong.** C `:4435–4443` awaits a sync `newcham(..., NC_SHOW_MSG)` then `cham=NON_PM`, restore `mcan`, `newsym`. JS `:902` drops the Promise, then mutates `cham`/`mcan`/`newsym` **before** `pline_mon` More. Callers: `rescham` `:4623` `iter_mons`; `restore_cham` `:4653`; zap cancel `:3199` (then clay-golem pline). JS zap `:3384–3386` is async and still does not wait. C prints shapeshift **then** clay; JS can print clay **then** the late shapeshift. Enabling the flag on a sync caller is not a named omit.

Callee closure (SHOW_MSG arm). LIVE: `canspotmon`, `pline_mon`, `usmellmon`, `x_monnam`, `noname_monnam`, `upstart`, `olfaction`. CLONE verified: `maybe_polyd` orc; `You`/`Something` literals. OMIT named: ustuck swallow text, `m_unleash`, break-armor. STUB: **none** inside `newcham_show_msg`. Combined-arm may ship **for awaited callers**. `normal_shape` is a live SHOW_MSG site with a dropped Promise — that site should have been async or its own Open row. “Dispatch ported, caller not awaited.”

## Hallucinations / overclaim

Subject visible shapeshift prints the three plines: **true for `decide_to_shapeshift`, digest `mdamagem`, zap `bhitm` poly.** **False as a complete Match C of every C `NC_SHOW_MSG` site** — `normal_shape` is live and unordered; stone-cham / genocide / muse / trap still omit the flag. D-log “await at decide / digest / zap poly”: **true and an admission** that `normal_shape` was left sync. Do **not** stamp “Match C `rescham`/`restore_cham`/`zap` cancel shapeshift pline order.” Do **not** stamp “retired 8 `upstart` clones.” Do **not** stamp “Match C `m_unleash`.” Do **not** stamp “Match C `#wizsmell`.” `newcham` remaining `export function` (sync) that returns a Promise iff SHOW_MSG is the footgun.

## Density

One `newcham` SHOW_MSG envelope + the C callees that arm reaches (`usmellmon`, `noname_monnam`, `upstart`). +199 JS. Did not glue `m_unleash`. §2b OK. Did glue a live SHOW_MSG caller without making it async — quality, not size.

## Branch-by-branch confirm

1. `NO_NC_FLAGS`: boolean return, no pline. **Match** (keeps `makemon` `if (newcham())` honest).
2. SHOW_MSG + still spotted: turns into. **Match** when awaited.
3. SHOW_MSG + now unseen: disappears + smell. **Match** when awaited.
4. SHOW_MSG + now seen: appears. **Match** when awaited.
5. `usmellmon` orc poly vs race. **Match `maybe_polyd`.**
6. `normal_shape` SHOW_MSG sequenced before `cham=NON_PM`. **Mismatch.**
7. `m_unleash` / ustuck / armor / Elbereth. **Named.**

## Callers / RNG ledger

Awaited: `mon.js:767`, `mhitm.js:2232–2234`, `zap.js:3777–3779`. Live un-awaited: `mon.js:902`. Flags 0: makemon vlad, trap, mklev, uhitm vamp, mhitm stone (comment deferred), zap figurine VIA only. Extra Hallu `x_monnam` for `l_oldname` **is C**. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. `upstart` / `noname_monnam` at C homes. Do not add `upstart` #9 or `ing_suffix` #3. Do not wrap `wildmiss` as `pline_mon`. Do not put `usmellmon` clone #2 in `mon.js`.

## Verification

D-log private canary **17**/17; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for SHOW_MSG text unless a public session shapeshifts in view. Canary that never calls `normal_shape` does not falsify the Promise drop. Zap-cancel + PfSC restore unhit.

## Actionable C-wrongs

1. Make `normal_shape` (and `rescham` / `restore_cham` / zap cancel `:3199`) **async and `await newcham(..., NC_SHOW_MSG)`** so C `:4438–4443` order holds: shapeshift pline/More finish, then `cham=NON_PM`, `mcan` restore, `newsym`, then clay-golem pline. Do not pass 0 here (that would un-print C’s message). Do not leave a dropped Promise on a live SHOW_MSG site.

Named (not Must-fix): mhitm stone `:3825`; genocide `:5665`; muse/trap/uhitm vis SHOW_MSG; `m_unleash`; ustuck `expels`; break-armor; Elbereth `monflee`; 8 `upstart` clones; `#wizsmell`.

Verdict: **QUALITY-RISK**

**Addressed:** D-1594 `dc1d6d94`
