# Review 662 — f7a10b6f — options.c optfn_boolean wizmgender (D-1701)

## Metadata
- Full / short hash: `f7a10b6fe700627e1a44f6075720b650a79dd04d` / `f7a10b6f`
- Parent: `3ab2697c` (D-1700). Ninth of fifteen `js/` commits since **653**. Archive **Addressed:** D-1701 `f7a10b6f`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 03:48:19 +0200
- D-id: **D-1701**
- Stats: `js/options.js` +83/−8; `js/display.js` +32/−6; `js/objnam.js` +25/−0. Total `js/` insertions **140** <250. Band **150–350**.
- Claims to close: Open `wizmgender` glyph-reset after D-1669 wizweight-only. Not full `reset_glyphmap`. `reviews/loop-2026-08-15/` has no unpaid wizmgender Must-fix.
- JS / map: `options.js` `optfn_boolean_do_set` / `reset_needed_visuals`; `display.js` `wizmgender_inverse`; `objnam.js` `append_wizmgender_suffix`. `c-js-map/startup.md`.
- Prior: **661** D-1700 named this row; D-1669 wizweight.

## Intent vs deliverable

Git subject promises: toggling sets glyph-reset/redraw and tty/doname show female gender, instead of omitting the set_wizonly option after D-1669.

`node scripts/csym.mjs optfn_boolean` → `options.c:5191–5449`. After-change `:5376–5385`. `reset_needed_visuals` `:8979–9014`; `--callers` `doset` `:8973`, `doset_simple` `:8727`. Doname `objnam.c:1549–1559`. `tty_print_glyph` `wintty.c:3930–3936`. `optlist.h` NHOPTB `&iflags.wizmgender` set_wizonly.

```5376:5385:nethack-c/upstream/src/options.c
        case opt_wizmgender:
        case opt_showrace:
        case opt_use_inverse:
        case opt_hilite_pile:
        case opt_perm_invent:
        case opt_ascii_map:
        case opt_tiled_map:
            go.opt_need_redraw = TRUE;
            go.opt_need_glyph_reset = TRUE;
            break;
```

```1549:1558:nethack-c/upstream/src/objnam.c
    if ((obj->otyp == STATUE || obj->otyp == CORPSE || obj->otyp == FIGURINE)
        && wizard && iflags.wizmgender) {
        int cgend = (obj->spe & CORPSTAT_GENDER),
            mgend = ((cgend == CORPSTAT_MALE) ? MALE
                     : (cgend == CORPSTAT_FEMALE) ? FEMALE
                       : NEUTRAL);
        ConcatF1(bp, 0, " (%s)",
                 (cgend != CORPSTAT_RANDOM) ? genders[mgend].adj
                                            : "unspecified gender");
    }
```

Parent: no `iflags.wizmgender`; showrace wrongly `botl`; no MG_FEMALE inverse; no doname suffix. The diff **does** set_wizonly mO row (allopt order before wizweight); OPTIONS= → `iflags`; after-change both flags for the C seven names; `reset_needed_visuals` subset `check_gold_symbol` + `docrt`; tty inverse; doname suffix. It **does not** call `reset_glyphmap(gm_optionchange)` or `reglyph_darkroom`. Named. It **does not** port `opt_color` / customcolors / menucolors after-change. Named. It **does not** port MG_DETECT / BW_*. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `optfn_boolean` after-change glyph-reset | LIVE | seven names match `:5376–5385` |
| `reset_needed_visuals` | LIVE subset | `check_gold_symbol` + `docrt`; no `reset_glyphmap` |
| `append_wizmgender_suffix` | LIVE | `doname` after class / before W_WEP |
| `wizmgender_inverse` / `obj_map_attr` / `mon_map_attr` / `hero_map_attr` | LIVE subset | tty `MG_FEMALE` arm; pets still earlier `MG_PET` |
| `reset_glyphmap` / `reglyph_darkroom` | OMIT named | CURRENT ban on full glyph table |
| MG_DETECT / BW_* | OMIT named | |

`node scripts/sym.mjs`:

```
optfn_boolean_do_set js/options.js:2030   sync
reset_needed_visuals NOT EXPORTED — 1 LOCAL js/options.js:2069
append_wizmgender_suffix js/objnam.js:2132   sync
wizmgender_inverse NOT EXPORTED — 1 LOCAL js/display.js:138
check_gold_symbol js/display.js:1990   sync
```

No clone → import. Do **not** add `reset_needed_visuals` #2. Do **not** add `append_wizmgender_suffix` #2. FORCE/DIAG/`getRngLog`/`fastforward`: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**After-change flags.** C in-game (`!opt_initial`) sets both `opt_need_redraw` and `opt_need_glyph_reset` for those seven. JS `OPT_GLYPH_RESET` is the same seven; `optfn_boolean_do_set` and `simple_bool_toggle` both mark them. `showrace` is **not** in C’s `disp.botl` list (`:5345–5351` is score/vers/exp/time only). Removing `showrace` from the JS `botl` setter is a C-fix, not a skip. **Match `:5376–5385`.** `opt_hilite_pet` is a different C arm (`:5310` redraw only); not this Set.

**`reset_needed_visuals`.** C `:8982–9001`: if glyph-reset → `reset_glyphmap`; if redraw (or custom*) → `check_gold_symbol` + `reglyph_darkroom` then `docrt`; then `bot()` if `disp.botl`; clear flags. JS: if redraw → `check_gold_symbol` + `docrt`; clear both flags. Wizmgender always sets both flags together, so the missing `reset_glyphmap` is the named omit, not a dead flag. `doset` `:8973` and `doset_simple` after picks **Match** caller sites. `bot()` / `flush_screen` on simple is a subset (simple still `flush_screen(1)` when redraw). Named: full glyph table, darkroom, `bot()`.

**Doname.** C after the class `switch`, before W_WEP. JS after ball/chain (end of that switch) before W_WEP. STATUE/CORPSE/FIGURINE + wizard + `iflags.wizmgender`. `spe & CORPSTAT_GENDER`; RANDOM (0) → `"unspecified gender"`; else `male`/`female`/`neuter`. **Match `:1549–1559`.** `genders[].adj` is a string clone (`male`/`female`/`neuter`); same English. Only `doname`, not every `xname` path — C is `doname_base`.

**Tty inverse.** C `wintty.c:3928–3936`: `MG_PET` + `hilite_pet` first (petattr); else `(MG_OBJPILE && hilite_pile) || (MG_FEMALE && wizard && wizmgender) || MG_DETECT|BW_*` and `use_inverse` → `ATR_INVERSE`. JS: tame+hilite → petattr; else `wizmgender_inverse(mtmp.female)`. Hero: `Upolyd ? u.mfemale : flags.female` (`display.h` Ugender). Objects: STATUE + `CORPSTAT_FEMALE` only. C map glyphs: `MG_FEMALE` on female statue / female monster / pet-fem / detect-fem / ridden-fem (`display.c:2788`, `:2828`, `:2996`, `:3019`, `:3042`, `:3057`). Corpses are `MG_CORPSE` **without** `MG_FEMALE` (`:3010`) — map inverse is not for corpses; doname still suffixes. **Match the live tty arms this peel claimed.** Pile vs female: JS if-else still inverse if either C term is true. Named: MG_DETECT / BW_*; ridden-fem if the port never draws ridden glyphs that way.

Callee closure (wizmgender after-change). LIVE: `optfn_boolean_do_set`, `docrt`, `check_gold_symbol`, `append_wizmgender_suffix`. CLONE: gender adjectives. OMIT named: `reset_glyphmap`, `reglyph_darkroom`. STUB: **none**. Combined-arm ships.

**`doset` / `doset_simple` callers.** C `reset_needed_visuals` at `:8973` (full) and `:8727` / `:9294`. JS `doset` after picks; `doset_simple` each loop then `flush_screen(1)` when redraw. C `doset_simple` does not always `flush_screen` itself — `docrt` inside reset does. Extra JS flush is the tty port’s screen push. **Match the flag consume.**

**OPTIONS=.** C `optfn_boolean` `do_set` writes `iflags.wizmgender`. JS `parse_iflags_wizmgender` on OPTIONS= and on the bare-name bool. **Match set_wizonly storage.** mO row only when `flags.debug` (`doset_bool_mod_list`). C `set_wizonly` skipped when `!wizard` (`:8842–8843`). **Match.**

## Hallucinations / overclaim

Subject “glyph-reset/redraw and tty/doname show female gender”: **true** for flags, doname, and the MG_FEMALE inverse subset. Do **not** stamp “Match C `reset_glyphmap`.” Do **not** stamp “Match C `reglyph_darkroom`.” Do **not** stamp “Match C full `tty_print_glyph` special.” Do **not** restore `showrace` `botl`. Do **not** re-port D-1669 wizweight. Do **not** enable wizmgender on non-wizard mO (C `set_wizonly`).

## Density

§2b: one option’s after-change + the two C consumers (tty + doname) that make the flag visible. Related. +140.

## Verification

D-log: OPTIONS=/do_set/doname canary; save-oracle skip; green+strict seed8000/0900; cohort 9/9 including seed0007 302/302, seed2200 230/230. Wizard mO / doname gender is **public-unhit** on tourist sessions. Admit that. Letters for earlier bools stay put (appended after `whatis_moveskip`).

## Actionable C-wrongs

None for Must-fix. Named: `reset_glyphmap(gm_optionchange)`; `reglyph_darkroom`; remaining after-change (`opt_color`, customcolors, menucolors, `bot()`); MG_DETECT / BW_*; perm_invent `can_set`. Do **not** add `reset_needed_visuals` #2. Do **not** add `append_wizmgender_suffix` #2. Do **not** re-port D-1669. Do **not** put wizmgender in the `botl` list.

Verdict: **ACCEPT-WITH-DEBT**
