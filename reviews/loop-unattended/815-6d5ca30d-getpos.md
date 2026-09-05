# Review 815 — 6d5ca30d — getpos.c matching[] '/' + AUTODESC '#' (D-1845)

## Metadata
- Full / short hash: `6d5ca30d6244d932401289f9500ebf921df98c9f` / `6d5ca30d`
- Parent: `e3ccc72b` (D-1844). Map-driven Open: 2 corpus unknown-direction vs Can't find / AUTODESC.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-05 05:31:31 +0200
- D-id: **D-1845**
- Stats: `js/getpos.js` +341/−70. `js/` insertions **341** >250. Band **80–450**.
- Claims to close: Open `/` matching + `'#'` AUTODESC. Not leftover WIN_STATUS.
- JS / map: `getpos` / `build_feature_matching` / `find_dungeon_feature`. `c-js-map/turns.md`. Archive **Addressed:** D-1845 `6d5ca30d`.

## Intent vs deliverable

Git subject promises: `feature_match_tags` omitted zap/swallow/expl (`S_rslant` `/`) so k==0; `'#'` never `NHKF_GETPOS_AUTODESC`.

`node scripts/csym.mjs getpos` → `getpos.c:769–1167`. `--callers getpos`: `pager.c:1910` (whatis), plus apply/read/teleport/wizcmds. AUTODESC `:962–970`. matching[] `:1046–1116`. `glyph_to_cmap` at `:1077`.

Parent: SHOWVALID + SELF + `mMoOdDxX` subset; `'#'` unknown-direction. The diff **does** build matching[] from defsyms (including `/`) and handle AUTODESC before matching.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `getpos` AUTODESC / LIMITVIEW / MENU / MOVESKIP | LIVE | before matching |
| `build_feature_matching` | LIVE new | C `:1046–1062` |
| `find_dungeon_feature` | LIVE | two-pass scan |
| `feature_match_tags` | CLONE extra | furniture seenv stand-in |
| `mMoOdDxX` 12 keys incl. aAzZ | LIVE | C `:781–794` |
| pick_chars LOOK_* | LIVE | comma = LOOK_QUICK |
| `getpos_menu` | OMIT named | `sym` NOT FOUND; usemenu still cycles |
| full `gs.showsyms` / cmdq_pop / mouse `c==0` / do_run prefix / `cmd_from_func` note | OMIT named | |

`node scripts/sym.mjs`:

```
getpos           js/getpos.js:940   ASYNC — await required
build_feature_matching  LOCAL :231
find_dungeon_feature     LOCAL :401
getpos_menu      NOT FOUND
glyph_to_cmap    js/display.js:649   sync
```

FORCE/DIAG/`getRngLog`/`fastforward`: **none**. Rule #2: clean.

## C ↔ JS fidelity

**AUTODESC (`:962–970`).** Toggle `iflags.autodescribe`; `"Automatic description %sis %s."` with verbose `"of features under cursor "`; off → `show_goal_msg`; `goto nxtc`. JS same, **before** matching so `'#'` is not tree. **Match.**

**matching[] (`:1046–1062`).** Skip wall/room/corr/door/`S_ndoor`. `c == defsyms[sidx].sym` (also `gs.showsyms` named omit). `'^'` all traps; engroom char also corridor engravings. `DEFSYMS_CH` length 105 = `S_expl_br+1`; `DEFSYMS_CH[S_rslant]` is `'/'` so k>0. **Match the `/` k>0 path.** DEC `{`/`g`/`|`/`` ` ``/`~` extras approximate showsyms (named).

**Scan (`:1064–1116`).** pass 0: past cursor SE; pass 1: NW through cursor. glyph_at cmap matching, then memory glyph, then `~` VS, then seenv `back_to_glyph`. Miss → `"Can't find dungeon feature '%c'."`. JS `find_dungeon_feature` same passes; matching_glyph first. Extra `feature_match_tags` seenv path has no `/` tag, so `/` is matching-only then Can't find. **Match that corpus string.**

**MOVESKIP (`:922–942`).** Toggle `*`; rush skip while glyph equals next and next+1. JS same. **Match that RNG-free skip.**

**pick_chars.** C `. , ; :` → TRADITIONAL / QUICK / ONCE / VERBOSE. Parent comma LOOK_ONCE is gone. **Match.** Restore `u.dx` in `finally`.

**Callee closure.** One `getpos` family. matching / AUTODESC / MOVESKIP / `glyph_to_cmap` LIVE. `getpos_menu` OMIT. Tag scan is a verified furniture CLONE beside matching[], not a STUB in the `/` arm.

## Hallucinations / overclaim

Do **not** stamp `getpos_menu`, GFILTER_AREA, full showsyms, or cmdq_pop. Two moved past (`moverock_core` / `getpos_help`) — not those owners PASS. D-log 0 PASS / 2 moved is true.

## Density

§2b: matching[] + the spkeys that stole `'#'`/`'"'`/`'!'`/`'*'`. +341. Did **not** glue `level_tele`. Right size.

## Verification

This audit: `node scripts/hidden-proxy.mjs verify getpos --base 6d5ca30d~1` → `2 session(s) blocked`. Summary: **`0 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS`** (`explore-seed0360-wizard-world-tour-db38e7fa` → `moverock_core` step 856 was 850; `random-seed0367-priest-quest-tour-01388a3a` → `getpos_help` step 342 was 316). Matches the D-log. Not vacuous.

## Actionable C-wrongs

None that must block the next port. Named stay on the map.

Verdict: **ACCEPT-WITH-DEBT**
