# Review 631 — 6453e043 — do_name.c do_oname artifact_name slip (D-1670)

## Metadata
- Full / short hash: `6453e043ec3980b7219fb00d15885173969537e1` / `6453e043`
- Parent: `1de9cec2` (D-1669). This file audits **this SHA only** (fifth of nine `js/` commits since review **626**). Archive **Addressed:** D-1670 `6453e043`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 17:50:56 +0200
- D-id: **D-1670**
- Stats: `js/artifact.js` +48/−1, `js/do_name.js` +42/−12, `js/rng.js` +5/−0. Band **150–350** (`js/` insertions **95** <250; id >454).
- Claims to close: Open `do_oname` artifact_name slip / `restrict_name` / `wipeout_text` after D-1660. Not wield `restrict_name`. Not `oname` via_naming livelog. `reviews/loop-2026-08-15/` has no unpaid do_oname Must-fix.
- JS / map: `do_name.js` `do_oname`; `artifact.js` `restrict_name`; `rng.js` `rnd_on_display_rng`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **621** named slip after `'o'` getobj. Not **630**.

## Intent vs deliverable

Git subject promises: naming a restricted artifact scuffs the canonical string with `wipeout_text`, instead of writing the typed name after D-1660.

Pinned C `do_oname` `:289–369` (`node scripts/csym.mjs do_oname`). `--callers`: prototype `:12`; `docallcmd` `:569`. `restrict_name` `:574–623` (`--callers` `:331`, `wield.c:993`). `artifact_name` `:328–353`. `exist_artifact` `:355–366`. `wipeout_text` `:119–183`. `rnd_on_display_rng` `:167–171`. `obj_shuffle_range` `:268–318`.

```330:357:nethack-c/upstream/src/do_name.c
    if ((aname = artifact_name(buf, &objtyp, TRUE)) != 0
        && (restrict_name(obj, aname) || exist_artifact(obj->otyp, aname))) {
        Strcpy(buf, aname);
        Strcpy(bufcpy, buf);
        bufp = !strncmpi(buf, "the ", 4) ? (buf + 4) : buf;
        do {
            wipeout_text(bufp, rnd_on_display_rng(2), (unsigned) 0);
        } while (!strcmp(buf, bufcpy));
        pline("While engraving, your %s slips.", body_part(HAND));
        display_nhwindow(WIN_MESSAGE, FALSE);
        You("engrave: \"%s\".", buf);
        u.uconduct.literate++;
    } else if (obj->otyp == objtyp) {
        Strcpy(buf, aname);
    }
```

Old JS: comment “slip deferred”; `oname` got the typed string. The diff **does** LIVE `artifact_name(..., true)`, new `restrict_name`, `exist_artifact`, display-rng `wipeout_text` loop, HAND pline, `flush_topl_more`, literate++, else canonical `otyp==objtyp`, `is_plural`+`safe_qbuf`. It **does not** wire `wield.c:993` or `oname` via_naming livelog. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `do_oname` | C `:289–369`, **LIVE this SHA** | local; **do not add #2** |
| `restrict_name` | C `:574–623`, **LIVE this SHA** | export; wield still named |
| `artifact_name` | C `:328–353`, **LIVE** | fuzzy TRUE; local `fuzzymatch` clone — **do not add #3** |
| `exist_artifact` | C `:355–366`, **LIVE** | |
| `wipeout_text` | C `:119–183`, **LIVE** | seed 0 → `rn2` inside |
| `rnd_on_display_rng` | C `:167–171`, **LIVE this SHA** | `rn2_on_display_rng(x)+1` |
| `obj_shuffle_range` | C `:268–318`, **LIVE** | imported |
| `safe_qbuf` / `is_plural` | C prompt `:303–305`, **LIVE** | D-1654 |
| `body_part_latebound(HAND)` | C `body_part(HAND)`, **CLONE** | approved latebound |
| `oname` VIA_NAMING | C `:367`, **LIVE** call | livelog named |
| wield `restrict_name` | C `wield.c:993`, **OMIT named** | |

`node scripts/csym.mjs do_oname` → `:289-369`. `restrict_name` → `:574-623`. `artifact_name` → `:328-353`. `exist_artifact` → `:355-366`. `wipeout_text` → `:119-183`. `rnd_on_display_rng` → `:167-171`. `obj_shuffle_range` → `:268-318`. `--callers do_oname`: `:569`. `--callers restrict_name`: `:331`, `wield.c:993`. `--callers artifact_name`: includes `:330`.

RNG (slip arm, call-for-call): `rnd_on_display_rng(2)` is **display** `rn2_on_display_rng(2)+1` → 1 or 2; then `wipeout_text(..., 0)` uses **normal** `rn2(lth)` / `rn2(4)` / maybe `rn2(ln)` per C seed-0. Loop retries display+normal if the scuff missed (spaces). No `rn2` in `restrict_name` / `artifact_name`. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
restrict_name    js/artifact.js:803   sync
artifact_name    js/artifact.js:699   sync
wipeout_text     js/engrave.js:205   sync
rnd_on_display_rng js/rng.js:51   sync
exist_artifact   js/artifact.js:787   sync
oname            js/do_name.js:989   sync
do_oname         NOT EXPORTED — 1 LOCAL js/do_name.js:249
             => Do NOT write clone #2.
obj_shuffle_range js/o_init.js:173   sync
is_plural        js/objnam.js:1668   sync
safe_qbuf        js/objnam.js:2088   sync
body_part_latebound js/objnam.js:1748   sync
fuzzymatch       js/hacklib.js:173   sync
             !! ALSO 2 LOCAL CLONES — artifact.js readobjnam.js
             => Do NOT add clone #3.
```

`--can do_name.js artifact.js restrict_name`: ALREADY. `--can do_name.js engrave.js wipeout_text`: ALREADY. `--can do_name.js rng.js rnd_on_display_rng`: ALREADY. `--can artifact.js o_init.js obj_shuffle_range`: ALREADY (this SHA added the static import; call is inside `restrict_name`, not a top-level TDZ read). Do **not** stamp “cycle-forced clone.” Do **not** add `fuzzymatch` #3. Do **not** add `do_oname` #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Prompt. C `is_plural` then `safe_qbuf(..., xname, simpleonames, "item")`. JS the same (replaces `quan!==1`+raw `xname`). **Match `:303–305`.** Novel / oartifact resist unchanged. **Match `:297–327`.**

Slip predicate. C `artifact_name(buf, &objtyp, TRUE)` then `restrict_name(obj, aname) || exist_artifact(obj->otyp, aname)`. JS `typOut` / `true` / the same or. **Match `:330–331`.** `artifact_name` fuzzy vs `strcmpi` when `!fuzzy` is pre-existing LIVE.

`restrict_name`. C empty → FALSE; `strncmpi` `"the "` +4; `sametype[otyp]`; undiscovered `OBJ_DESCR` + shuffle pool + same-class walk from `bases[ocls]`; artilist+1 until `!a->otyp`; strip `"the "`; `strcmp`; return `(SPFX_NOGEN|SPFX_RESTR) || quan>1`. JS `NUM_OBJECTS` array, `objectDescrs[oc_descr_idx]`, imported `obj_shuffle_range`, `game.bases`, `aname===n`. **Match `:574–623` branch order.** C stops on `a->otyp==0`; JS walks `list.length` and `continue`s missing/`!sametype`. Sentinel `otyp` 0 is not sametype unless naming type 0. **Match the strcmp/spfx result.** Wield caller still named.

Scuff. C copies canonical `aname` into `buf`, skips `"the "` for the **in-place** `wipeout_text` of the rest, `seed=0`. JS `buf=aname` then `slice(0,prefix)+wipeout_text(slice(prefix), rnd_on_display_rng(2), 0)` (strings are immutable; result is the same concatenation). **Match `:333–351`.** `rnd_on_display_rng` is exactly C `:167–171`. Inner `wipeout_text` `rn2` is LIVE engrave, not this SHA.

Pline / literate. C HAND, `display_nhwindow(WIN_MESSAGE,FALSE)`, engrave quote, `u.uconduct.literate++`. JS `body_part_latebound(HAND)`, `flush_topl_more`, same You-text, increment. **Match the messages and conduct.** Window wait is the established JS More analogue, not a second `wipeout_text`.

Else canonical. C `obj->otyp==objtyp` then `buf=aname` (Sting/Orcrist). JS the same. **Match `:358–365`.** Then `oname(..., ONAME_VIA_NAMING|ONAME_KNOW_ARTI)`. **Match the call.** Livelog inside `oname` named.

Callee closure (slip + canonical arms). LIVE: `artifact_name`, `restrict_name`, `exist_artifact`, `wipeout_text`, `rnd_on_display_rng`, `obj_shuffle_range`, `safe_qbuf`, `is_plural`, `oname`. CLONE: `"the "` prefixi; `body_part_latebound`. OMIT named: wield `restrict_name`; `oname` via_naming livelog. STUB: **none**. Combined-arm ships. “Dispatch ported, callee stubbed” is **false**.

## Hallucinations / overclaim

Subject restricted name → `wipeout_text` scuff: **true** for the slip arm. D-log `restrict_name` OBJ_DESCR+shuffle: **true**. Do **not** stamp “Match C `oname` via_naming livelog.” Do **not** stamp “Match C `wield.c` `restrict_name` faint-glow.” Do **not** add `fuzzymatch` #3. Do **not** stamp “Match C `body_part` import from polyself.” Public-unhit for naming Sting/Orcrist; fortress does not prove the display-rng scuff.

## Density

+95: `do_oname` slip + `restrict_name` + `rnd_on_display_rng`. §2b one naming cluster. Did not glue remaining pushkeys or wield.

## Verification

Wired: slip predicate; `"the "` skip; `rnd_on_display_rng(2)` then `rn2` inside wipeout; canonical else; `safe_qbuf`. Unwired C: wield; oname livelog. Conf: display stream for **cnt only**. No seed gate.

D-log private canary; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for artifact naming. Fortress 44/44 does not hit the slip.

## Actionable C-wrongs

None. Named (map, not Must-fix): `wield.c:993` `restrict_name`; `oname` via_naming livelog; `docallcmd` `#if 0` EXCLUDE; `'i'` `getobj_name` clone. Do **not** add `do_oname` #2. Do **not** add `fuzzymatch` #3. Do **not** re-port `'o'` getobj (D-1660). Do **not** re-port `safe_qbuf` (D-1654).

Verdict: **ACCEPT-WITH-DEBT**
