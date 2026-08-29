# Review 630 — 1de9cec2 — options.c optfn_boolean wizweight after-change (D-1669)

## Metadata
- Full / short hash: `1de9cec291cae71ac8bdc20d31d9faa5fcb7a166` / `1de9cec2`
- Parent: `81f571d0` (D-1668). This file audits **this SHA only** (fourth of nine `js/` commits since review **626**). Archive **Addressed:** D-1669 `1de9cec2`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 17:40:51 +0200
- D-id: **D-1669**
- Stats: `js/objnam.js` +20/−2, `js/options.js` +33/−6, `js/shk.js` +15/−7. Band **150–350** (`js/` insertions **68** <250; id >454).
- Claims to close: Open `optfn_boolean` wizweight after-change after D-1655 / D-1668. Not wizmgender. Not `optfn_boolean` perm_invent `can_set`. `reviews/loop-2026-08-15/` has no unpaid wizweight Must-fix.
- JS / map: `options.js` doset / OPTIONS= / `optfn_boolean_do_set`; `objnam.js` `append_wizweight_suffix` / `paydoname`; `shk.js` `doname_with_price`. `c-js-map/startup.md`.
- Prior reviews this SHA claims to close: **616** named wizweight after-change; **622** named that omit. Not **627** InvOptOn.

## Intent vs deliverable

Git subject promises: wizard wizweight after-change reassigns inventory and doname prints aum, instead of omitting the set_wizonly option after D-1655.

Pinned C `optfn_boolean` `:5191–5449` (`node scripts/csym.mjs optfn_boolean`; `--callers` empty — table). After-change `opt_wizweight` `:5353–5361`. doset skip `set_wizonly && !wizard` `:8842–8843`. `optlist.h:893–895` NHOPTB wizweight `set_wizonly` `&iflags.wizweight`. `doname_base` `:1695–1709`. `doname_with_price` `:1761–1764`. `paydoname` `:2318–2328`.

```5353:5361:nethack-c/upstream/src/options.c
        case opt_fixinv:
        case opt_price_quotes:
        case opt_sortpack:
        case opt_implicit_uncursed:
        case opt_wizweight:
            if (!flags.invlet_constant)
                reassign();
            update_inventory();
            break;
```

```1697:1702:nethack-c/upstream/src/objnam.c
    if (wizard && iflags.wizweight) {
        if (with_price && bp_eos[-1] == ')')
            ConcatF1(bp, 1, ", %u aum)", obj->owt);
        else
            ConcatF1(bp, 0, " (%u aum)", obj->owt);
```

Old JS: after-change comment named wizweight omit; unknown OPTIONS= bools hit `flags`; doname had no aum. The diff **does** `DOSET_BOOL_ADDR.wizweight` → `iflags`; wizard-only mO append; OPTIONS= colon/`!`; `optfn_boolean_do_set` fifth case; `append_wizweight_suffix`; paydoname save/restore; `doname_with_price` with_price merge. It **does not** port `opt_wizmgender` glyph-reset (`:5376`), remaining after-change arms, or paydoname Has_contents rewrite. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `opt_wizweight` after-change | C `:5353–5361`, **LIVE this SHA** | same arm as fixinv |
| NHOPTB wizweight | C `optlist.h:893–895`, **LIVE this SHA** | `set_wizonly` |
| `doset` skip `!wizard` | C `:8842–8843`, **LIVE this SHA** | `flags.debug` |
| OPTIONS= `wizweight` | C `optfn_boolean` do_set, **LIVE this SHA** | `iflags` not `flags` |
| `append_wizweight_suffix` | C `doname_base` `:1695–1709`, **CLONE** | new export; not a C name |
| `doname` | C `:1754–1756` flags 0, **LIVE** | `with_price` false |
| `doname_with_price` | C `:1761–1764`, **LIVE this SHA** | suppress then with_price true |
| `paydoname` | C `:2312–2328`, **LIVE this SHA** | save/restore Off |
| `reassign` / `update_inventory` / `invlet_constant` | C invent, **LIVE** | already imported |
| `opt_wizmgender` | C `:5376`, **OMIT named** | |
| paydoname Has_contents | C `:2320–2341`, **OMIT named** | |
| `doname_vague_quan` aum | C `:1768–1782`, **OMIT named** | pager stand-in |

`node scripts/csym.mjs optfn_boolean` → `:5191-5449`. `--callers optfn_boolean`: 0 (optlist). `paydoname` body is `:2312–2348` (read; csym not required for the save/restore cited above). `doname_with_price` `:1761-1764`.

RNG: none. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
append_wizweight_suffix js/objnam.js:2130   sync
optfn_boolean_do_set js/options.js:1858   sync
doname           js/objnam.js:2144   sync
doname_with_price js/shk.js:2680   sync
paydoname        js/objnam.js:2525   sync
update_inventory js/invent.js:3523   sync
reassign         js/invent.js:5727   sync
invlet_constant  js/invent.js:5716   sync
```

`--can options.js invent.js update_inventory`: ALREADY. `--can options.js invent.js reassign`: ALREADY. `--can shk.js objnam.js append_wizweight_suffix`: ALREADY (new named import on an existing edge). Do **not** stamp “cycle-forced clone.” Do **not** add `append_wizweight_suffix` #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

After-change. C groups five optidx including `opt_wizweight`; only when `!go.opt_initial` (`:5336–5338` return). JS `if (initial) return` then the same five names; `!invlet_constant()` then `reassign()`; `update_inventory()`. **Match `:5353–5361`.** Not Match the rest of the 259-line `optfn_boolean` switch.

doset. C `set_wizonly && !wizard` skip (`:8842–8843`). JS `doset_bool_mod_list` appends `'wizweight'` only when `game.flags.debug`. Appends after `whatis_moveskip` so tourist mO letters stay. C’s table order puts wizweight after wizmgender, not after whatis_moveskip. **Match the skip.** Not Match wizard mO letter vs full `allopt`. Named analogue (letter fortress). Other `set_wizonly` bools (menu_tab_sep, sanity_check, …) still absent. Pre-existing; this row was wizweight only.

OPTIONS=. Colon `wizweight:true` uses `optfn_boolean_word` (true/yes/on/1). Bare `!wizweight` is the no-colon branch `value=!negated`. Colon `!wizweight:…` `continue` matches C “negated boolean should not have a parameter”. Writes `result.iflags.wizweight`. **Match addr `&iflags.wizweight`.** Config still applies when not wizard (C `set_wizonly` is the mO skip, not parse). **Match.**

doname aum. C `wizard && iflags.wizweight`; JS `flags.debug && iflags.wizweight`. `ConcatF1` delta 1 overwrites the last `)` (`Snprintf(bp_eos-1, …, ", %u aum)")`). JS `slice(0,-1)+\`, ${owt} aum)\``. Extra form `" (%u aum)"`. **Match `:1697–1702`.** `doname` passes `with_price` false so unpaid `(…)` does **not** merge — C `doname_base(..., 0)`. **Match.**

`doname_with_price`. C one `doname_base` with `DONAME_WITH_PRICE` so shop suffix then wizweight sees the last `)`. JS cannot: `doname` would add extra aum first. Suppress `wizweight` around `doname`, restore, then `append_wizweight_suffix(..., true)`. Unpaid / for-sale / `(no charge)` ending `)` merge. **Match the with_price test.** Analogue, not a second C function.

`paydoname`. C save, `iflags.wizweight=FALSE`, `doname_base(obj,0)`, restore (`:2318–2328`). JS the same around `doname`. **Match the save/restore.** Has_contents `cknown` / `"an unpaid "` rewrite still named.

Callee closure. LIVE: `optfn_boolean_do_set` wizweight case, `reassign`, `update_inventory`, `invlet_constant`, `doname`/`doname_with_price`/`paydoname`. CLONE: `append_wizweight_suffix` matched to `:1695–1709`. OMIT named: wizmgender, remaining after-change, Has_contents paydoname, `doname_vague_quan`. STUB: **none** in the live wizweight arm. Combined-arm ships. “Dispatch ported, callee stubbed” is **false**.

## Hallucinations / overclaim

Subject after-change reassign + doname aum: **true** (canary extra vs merge; paydoname suppresses). D-log “set_wizonly mO row when `flags.debug`”: **true**. Do **not** stamp “Match C `optfn_boolean`” as the whole function. Do **not** stamp “Match C `opt_wizmgender`.” Do **not** stamp “Match C wizard mO letter index vs `allopt`.” Do **not** stamp “Match C `doname_vague_quan` aum.” Do **not** stamp “Match C paydoname Has_contents.” Public-unhit for wizard mO; fortress tourist does not toggle wizweight.

## Density

+68: one `opt_wizweight` cluster (doset + OPTIONS= + after-change + doname suffix + paydoname). Above the Open ~40 floor. Did not glue remaining pushkeys or wizmgender.

## Verification

Wired: OPTIONS= iflags; extra vs `)` merge; paydoname Off; after-change `update_inventory`. Unwired C: wizmgender; vague_quan; Has_contents. Conf: no RNG. No seed gate.

D-log private canary; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for wizard `wizweight`. Fortress 44/44 does not prove mO toggle.

## Actionable C-wrongs

None. Named (map, not Must-fix): `opt_wizmgender` `:5376` glyph-reset; remaining `optfn_boolean` after-change arms; paydoname Has_contents rewrite; `doname_vague_quan` aum; other `set_wizonly` bools not in JS doset. Do **not** re-port `invlet_constant`/`reassign` (D-1655). Do **not** re-port `can_set_perm_invent` (D-1666). Do **not** add `append_wizweight_suffix` #2.

Verdict: **ACCEPT-WITH-DEBT**
