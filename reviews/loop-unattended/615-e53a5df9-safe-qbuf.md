# Review 615 — e53a5df9 — objnam.c safe_qbuf / pickup prompts (D-1654)

## Metadata
- Full / short hash: `e53a5df99ce25c885199445558e35d735c503b03` / `e53a5df9`
- Parent: `7e407046` (D-1653). This file audits **this SHA only** (seventh of nine `js/` commits since review **608**). Archive **Addressed:** D-1654 `e53a5df9`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 13:35:37 +0200
- D-id: **D-1654**
- Stats: `js/objnam.js` +83/−1, `js/pickup.js` +20/−7, `js/const.js` +2/−0. Band **150–350** (`js/` insertions **105** <250; id >454).
- Claims to close: Open pickup.c `safe_qbuf` after D-0881/D-1620. Not floor `query_classes` (D-1620). Not Death tribute (D-1653). `reviews/loop-2026-08-15/` has no unpaid safe_qbuf Must-fix.
- JS / map: `objnam.js` `safe_qbuf`; four `pickup.js` sites. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: map named concatenating `doname`.

## Intent vs deliverable

Git subject promises: Pick up / Continue? / Do what with / tip prompts fit QBUFSZ via `short_oname` lastR, instead of concatenating `doname` after D-0881.

Pinned C `objnam.c` `safe_qbuf` `:5623–5698` (`node scripts/csym.mjs safe_qbuf` misses the prototype; read that range). `--callers safe_qbuf`: 32 refs including `pickup.c:852/:1774/:3077/:3081/:3607`. Callees `short_oname` `:2008–2085`; `Yname2` `:2377–2384`; `ysimple_name` `:2390–2398`; `ansimpleoname` `:2445–2470`. `global.h` `QBUFSZ` 128.

```5670:5694:nethack-c/upstream/src/objnam.c
    if (len + len_lastR + len_qsfx > lenlimit) {
        if (len < lenlimit) {
            strncpy(&qbuf[len], lastR, lenlimit - len);
            ...
        }
    } else {
        len += len_qsfx;
        bufp = short_oname(obj, func, altfunc, lenlimit - len);
        if (len + strlen(bufp) <= lenlimit)
            Strcat(qbuf, bufp);
        else
            Strcat(qbuf, lastR);
        if (qsuffix) Strcat(qbuf, qsuffix);
    }
```

Old JS: `Pick up ${doname}?` / lifting Continue? / `Do what with ${yname}?` / tip doname. The diff **does** `safe_qbuf` + `Yname2`/`ysimple_name`/`Ysimple_name2` + `something`, and the four pickup sites. It **does not** port lift `"removing"` vs `"lifting"`, or apply/do_name/eat/invent/lock/mhitu/shk/trap callers. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `safe_qbuf` | C `:5623–5698`, **LIVE this SHA** | dest unused; qprefix is the start |
| `short_oname` | C `:2008–2085`, **LIVE** | |
| `Yname2` | C `:2377–2384`, **LIVE this SHA** | do/music/timeout clones — **do not add #4** |
| `ysimple_name` | C `:2390–2398`, **LIVE this SHA** | attrib + pickup clones — **do not add #3** |
| `Ysimple_name2` | C, **LIVE this SHA** | do_name + pickup clones |
| `ansimpleoname` | C `:2445–2470`, **LIVE** | |
| `yname` | C objnam, **LIVE** | used as `yname_objnam`; pickup clone remains |
| `something` | C decl.h, **LIVE this SHA** | const.js |
| `QBUFSZ` | C 128, **LIVE** | const.js 128 |
| pickup `yname`/`ysimple_name` | **CLONE** leftover | not used for these four prompts |
| lift `"removing"` | C `:1773`, **OMIT named** | JS always `"lifting"` |
| other-file `safe_qbuf` | C apply/…, **OMIT named** | |

`node scripts/csym.mjs short_oname` → `:2008-2085`. `Yname2` → `:2377-2384`. `ysimple_name` → `:2390-2398`. `ansimpleoname` → `:2445-2470`. `--callers safe_qbuf`: includes the four pickup sites.

RNG: none in `safe_qbuf`. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
safe_qbuf        js/objnam.js:2105   sync
short_oname      js/objnam.js:2021   sync
Yname2           js/objnam.js:1949   sync
             !! ALSO 3 LOCAL CLONE(S) — js/do.js:410  js/music.js:284  js/timeout.js:662
ysimple_name     js/objnam.js:2003   sync
             !! ALSO 2 LOCAL CLONE(S) — js/attrib.js:826  js/pickup.js:155
Ysimple_name2    js/objnam.js:2011   sync
             !! ALSO 2 LOCAL CLONE(S) — js/do_name.js:199  js/pickup.js:162
ansimpleoname    js/objnam.js:1978   sync
yname            js/objnam.js:1936   sync
             !! ALSO 4 LOCAL CLONE(S) — js/lock.js:134  js/music.js:146  js/pickup.js:145  js/uhitm.js:2802
upstart          js/hacklib.js:119   sync
             !! ALSO 8 LOCAL CLONE(S)
doname           js/objnam.js:2147   sync
something        js/const.js:409   sync   export const
```

`--can pickup.js objnam.js safe_qbuf`: ALREADY. `--can objnam.js hacklib.js upstart`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** add `yname` #5 in pickup. Do **not** add `upstart` #9.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`safe_qbuf` length. `lenlimit = QBUFSZ-1` (127). Prefix: C `qbuf==qprefix` keep dest (nul at `lenlimit`); else strncpy prefix; else empty. JS starts from `qprefix` (first arg unused). dest==qprefix analogue: lift passes the same string as both. **Match `:5655–5668`.** Overrun: lastR then suffix sliced to limit. **Match `:5670–5681`.** Else: `len += len_qsfx`; `short_oname(..., lenlimit-len)`; if `len+strlen(bufp)<=lenlimit` name else lastR; then suffix. **Match `:5682–5694`.** `impossible()` diagnostics **OMIT named**; C continues after them.

`Yname2`. C `highc(*s)` on `yname`. JS `upstart(yname)` (`highc` first char). **Match `:2377–2384`.** `ysimple_name`: C `shk_your` + `minimal_xname`. JS `shk_your` + `simpleonames` (named stand-in). **Match the shape.**

Pickup `:852`. `safe_qbuf(..., "Pick up ", "?", doname, ansimpleoname, something)`. **Match.** `:1774` dest==qprefix `".  Continue?"` doname/ansimpleoname/something. JS always `"lifting "` in the prefix — C `!container ? "lifting" : "removing"`. **Not Match `"removing"`.** Named. `:3076–3082` empty `Yname2`/`Ysimple_name2`/`"This"` vs `"Do what with "` yname/ysimple/`"it"`. **Match those two calls** via objnam exports, not pickup’s local yname clone. `:3607` tip `"There is "` / `" here, tip it?"` / `"container"`. **Match.**

Callee closure (four pickup arms). LIVE: `safe_qbuf`, `short_oname`, `doname`, `ansimpleoname`, `Yname2`, `yname`, `ysimple_name`, `Ysimple_name2`, `something`. CLONE: pickup local yname unused here. OMIT named: `"removing"`; other-file callers. STUB: **none**. Combined-arm ships. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject four pickup prompts via lastR: **true.** D-log dest unused / qprefix start: **true.** Do **not** stamp “Match C lift `removing`.” Do **not** stamp “Match C apply/eat/invent/lock `safe_qbuf`.” Do **not** stamp “Match C pickup local `yname` retired.” Public Pick up is **role-hit** on tourist loot; long-name lastR is **public-unhit**.

## Density

+105: C `safe_qbuf` 76 + three tiny name helpers + four call sites. §2b one `safe_qbuf` family. Did not glue apply.c. Above a one-`if` peel.

## Verification

Wired: QBUFSZ 128; four pickup sites; lastR something/it/This/container. Unwired C: `"removing"`; other files. Conf: no `rn2`. No seed gate.

D-log private canary fit/lastR; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for lastR truncation. Fortress does not prove a 127-char prompt.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): lift container `"removing"` (`pickup.c:1773`); apply/do_name/eat/invent/lock/mhitu/shk/trap `safe_qbuf`; pickup/attrib/lock `yname` clones. Do **not** add `yname` #5. Do **not** add `Yname2` #4. Do **not** re-port Death tribute (D-1653). Do **not** re-port floor `query_classes` (D-1620).

Verdict: **ACCEPT-WITH-DEBT**
