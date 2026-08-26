# Review 513 — 4383ae0a — obj.h is_plural Eyes + undiscovered_artifact (D-1552)

## Metadata
- Full / short hash: `4383ae0a63af0796ec18cb318d4fbdbea8cb2f6a` / `4383ae0a`
- Parent: `73321d0c` (D-1551). This file audits **this SHA only** (fourth of nine `js/` commits since review **509**). Archive **Addressed:** D-1552 `4383ae0a`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 13:02:17 +0200
- D-id: **D-1552**
- Stats: 9 JS files, +77 / −83 (`objnam.js` +37, `artifact.js` +20, `invent.js` +9, `iactions.js` +6; detect/do/dokick/dothrow/music clone deletes). Band 150–350 (js/ insertions **77**).
- Claims to close: Open Eyes `is_plural` (named from D-1537 / D-1551). Not #altdip. `reviews/loop-2026-08-15/` has no unpaid is_plural Must-fix.
- JS / map: `objnam.js` `is_plural`/`otense`; `artifact.js` `undiscovered_artifact`; `invent.js` identify; `iactions.js`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: named omit after D-1537 / review **498**.

## Intent vs deliverable

Git subject promises: discovered Eyes of the Overworld are plural via `undiscovered_artifact`, not `quan==1` always singular.

Pinned C `obj.h` `is_plural` `:421–426`. Callee `artifact.c` `undiscovered_artifact` `:1130–1143`. Callers `objnam.c` `otense` `:2540`; `not_fully_identified` `:1804`; `obj_is_pname` `:337–339`; `invent.c` `fully_identify_obj` `:2640–2641`; `iactions.c` `item_naming_classification` `:63–75`.

```421:426:nethack-c/upstream/include/obj.h
#define is_plural(o) \
    ((o)->quan != 1L                                                    \
     || ((o)->oartifact == ART_EYES_OF_THE_OVERWORLD                    \
         && !undiscovered_artifact(ART_EYES_OF_THE_OVERWORLD)))
```

```1137:1142:nethack-c/upstream/src/artifact.c
    for (i = 0; i < NROFARTIFACTS; i++)
        if (artidisco[i] == m)
            return FALSE;
        else if (artidisco[i] == 0)
            break;
    return TRUE;
```

Old JS: `otense` / local `is_plural` were `quan !== 1`; `not_fully_identified` skipped the artidisco gate; `fully_identify_obj` skipped `discover_artifact`; `obj_is_pname` used known/dknown/bknown; iactions always “this specific”.

The diff **does** port `undiscovered_artifact`, `is_plural` Eyes arm, `otense` via `is_plural`, identify → `discover_artifact`, `obj_is_pname` → full `not_fully_identified` (late-bind), iactions `the_unique_obj`/`is_plural`, and **deletes** quan-only clones in detect/do/dokick/dothrow/music/artifact/iactions. It **does not** port `learn_egg_type`, `discover_artifact` `impossible`, save/rest artidisco, remaining uniquely named `otense_*` clones, `do_wear.js` `obj_is_pname` clone. Named (learn_egg) or leftover clones.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `is_plural` | C `obj.h:421`, **LIVE this SHA** | |
| `undiscovered_artifact` | C `:1130`, **LIVE this SHA** | late-bind into objnam |
| `otense` export | C `:2530`, **LIVE this SHA** | |
| `not_fully_identified` artidisco | C `:1804`, **LIVE this SHA** | invent.js |
| `fully_identify_obj` `discover_artifact` | C `:2640`, **LIVE this SHA** | |
| `obj_is_pname` | C `:332`, **LIVE this SHA** | `has_oname` |
| iactions naming | C `:60–75`, **LIVE this SHA** | |
| detect/do/dokick/dothrow/music `otense`/`is_plural` | **deleted** → import | |
| artifact local `otense` | **deleted** → import | |
| `do_wear.js` `obj_is_pname` | C `:332`, **CLONE leftover** | still subset |
| `otense_stone` / `_pot` / `_zap` / … | C `otense`, **CLONE leftover** | cycle-named |
| `learn_egg_type` | C `:2645–2646`, **OMIT named** | |
| save/rest artidisco | C, **OMIT named** | |

`node scripts/csym.mjs undiscovered_artifact --sig` → `artifact.c:1130-1143`. `--callers`: `objnam.c:1804`; `obj.h:426`. `otense --sig` → `:2530-2546`. `not_fully_identified --sig` → `:1786-1819`. `obj_is_pname --sig` → `:332-342`. `fully_identify_obj --sig` → `invent.c:2636-2647`. `the_unique_obj --sig` → `:1105-1117`.

`node scripts/sym.mjs is_plural otense undiscovered_artifact discover_artifact not_fully_identified obj_is_pname the_unique_obj has_oname fully_identify_obj`:

```
is_plural        js/objnam.js:1656   sync
otense           js/objnam.js:1667   sync
undiscovered_artifact js/artifact.js:351   sync
discover_artifact js/artifact.js:331   sync
not_fully_identified js/invent.js:748   sync
obj_is_pname     js/objnam.js:1838   sync
             !! ALSO 1 LOCAL CLONE(S)  js/do_wear.js:159
the_unique_obj   js/objnam.js:1816   sync
has_oname        js/const.js:2947   sync
fully_identify_obj js/invent.js:789   sync
             !! ALSO 1 LOCAL CLONE(S)  js/steed.js:247
```

**Re-point:** detect/do/dokick/dothrow/music/artifact/iactions **deleted** local `otense`/`is_plural` → `objnam.js` export. artifact **deleted** local `otense` → import. Do **not** add `obj_is_pname` clone #2 (`do_wear.js` already has one). Late-bind `set_undiscovered_artifact` / `set_not_fully_identified` because artifact→objnam and invent→objnam already exist (avoid objnam→artifact / objnam→invent TDZ). `node scripts/imports.mjs --can` not required for a new static import of those; the late-bind is the cycle dodge.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean. **No core RNG** (C none).

## C ↔ JS fidelity

`is_plural`. `(quan ?? 0) !== 1` ≡ C `quan != 1L` (including quan 0). Eyes: `oartifact === ART_EYES_OF_THE_OVERWORLD` (generated **26**, same 1-based artilist as C) **and** `!undiscovered_artifact(ART_EYES…)` — the callee is called with the **constant**, not `o.oartifact`, **Match `:425–426`.** Undiscovered Eyes stay singular (“a pair of lenses named …”). **Match the comment.** `!o` → false (C would deref).

`undiscovered_artifact`. Scan `artidisco[i]===m` → false; empty 0 → break true; missing array → true. **Match `:1137–1142`.** `discover_artifact` still omits `impossible` when the table is full. **Named.**

`otense`. `!is_plural` → `vtense(null, verb)` else the plural verb. **Match `:2540–2545`.** dokick’s old thin 3sg clone is gone — kick messages now use real `vtense`. **Match.**

`not_fully_identified`. Coin false; known/dknown/bknown/oc_name_known; container cknown/lknown; **then** `oartifact && undiscovered_artifact(oartifact)`. **Match `:1804–1805`.** MAIL SCR_MAIL bknown skip still JS-shaped. **Named.**

`fully_identify_obj`. `discover_artifact` when `oartifact`. **Match `:2640–2641`.** `learn_egg_type` still commented. **Named.**

`obj_is_pname`. `has_oname` not raw `oextra.oname`. Gameover/override skip the ID gate. Else full `not_fully_identified` (artidisco included). **Match `:335–340`.** Default late-bind before invent loads is the old subset — invent registers at import.

iactions. `the` / `this specific` / `this stack of`; call type `the()` vs `makeplural`. **Match `:63–75`.** `the_unique_obj` already LIVE.

Callee closure (Eyes arm). LIVE: `is_plural`, `undiscovered_artifact`, `otense`, `discover_artifact`, `not_fully_identified`. CLONE: late-bind wrappers (verified they **are** the C functions once modules load). OMIT named: `learn_egg_type`. STUB: none in the Eyes/`otense` export arm. Remaining `otense_*` clones are **other files**, not a stub inside this arm. The arm may ship.

## Hallucinations / overclaim

Subject discovered Eyes plural: **true** of the export and of every caller that now imports `otense`/`is_plural`. Stamping **Addressed:** D-1552 is fair. Do **not** stamp “Match C `learn_egg_type`.” Do **not** stamp “Match C save/rest artidisco.” D-log “Clones retired” **overclaims**: apply/dig/mthrowu/potion/pickup/mkobj/zap still have uniquely named `otense_*`; `potion.js` `is_plural_dip`; `do_wear.js` `obj_is_pname` still known/dknown/bknown. This is **not** “dispatch ported, callee stubbed” — `undiscovered_artifact` is LIVE. Late-bind default TRUE (undiscovered) is C-empty-artidisco, not a stub that zeros Eyes.

## Density

+77 JS: macro + callee + identify producer + iactions + clone retirement in the files that had bare `otense`/`is_plural`. Did not glue SEARCH conferral. §2b OK.

## Branch-by-branch confirm

1. quan≠1: plural. **Match.**
2. quan==1, not Eyes: singular `vtense`. **Match.**
3. Eyes, empty artidisco: singular. **Match.**
4. Eyes, `discover_artifact(26)` then `is_plural`: true. **Match.**
5. Identify artifact: artidisco written; later `not_fully_identified` false on that gate. **Match.**
6. iactions unique: “the”; stack: “this stack of”; else “this specific”. **Match.**
7. do_wear clone pname: still subset. **Leftover clone.**

## Callers / RNG ledger

C: any `otense`/`is_plural`/`not_fully_identified`. JS export path plus leftover clones. Public-unhit until a session IDs Eyes. No seed gate. No new `rn2`.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Late-bind is cycle dodge, not filesystem. Default `_undiscovered_artifact = (_m) => true` is not a seed gate.

## Verification

D-log canary **31**/31 (macro; undiscovered vs discovered Eyes; otense; identify writes artidisco; iactions strings; clone grep; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit.** Admit it.

## Actionable C-wrongs

None for Must-fix. Named: `learn_egg_type`; `discover_artifact` full-table `impossible`; save/rest artidisco; MAIL `SCR_MAIL` bknown; leftover `otense_*` / `is_plural_dip` / `do_wear` `obj_is_pname` clones (do **not** add clone #2 under those export names). Other INTERNALCMD / pray gift disco already live for Excalibur.

Verdict: **ACCEPT-WITH-DEBT**
