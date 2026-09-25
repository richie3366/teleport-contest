# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-25 — D-2789 `coloratt.c` basic_menu_colors whole-body port

**C locus:** `nethack-c/upstream/src/coloratt.c:530–580` `basic_menu_colors`. load_colors saves `iflags.use_menu_color` and `gm.menu_colorings`, forces menucolors on, and either reuses `gc.color_colorings` or builds it once: clear the list, walk `colornames[]` until the null name, skip black/white/`NO_COLOR`, `Sprintf` the pattern, `add_menu_coloring_parsed` with `ATR_NONE`, then keep that list. The restore arm writes the saved flag and list back.
**JS:** `js/options.js` `REGEX_ID :433`, `basic_menu_colors :3413`.
**Change:** restart of `basic_menu_colors` in C order with `:line` cites. `REGEX_ID` is `"posixregex"` (`posixregex.c:52`; unix `Makefile.src:229` links that object, pmatchregex is commented out). The compare is an ASCII case-fold of that constant against `"pmatchregex"` (`!strcmpi`).
**Verify:** `node scripts/verify.mjs --fn basic_menu_colors` → PASS syntax (1 changed js file: js/options.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** none on this function. `MENU_COLORNAMES` is `colornames[]` through the null-name sentinel; aliases after it are not visited, matching the `break`.
**Next:** next Open — coverage row (`options.c` optfn_petattr).

## 2026-09-25 — D-2788 `options.c` optfn_disclose whole-body port

**C locus:** `nethack-c/upstream/src/options.c:1442–1560` `optfn_disclose` (NHOPTC, optlist.h `:284`). do_init → optn_ok. do_set → `string_for_opt` (`:6665`); a value plus negation is `bad_negation` + optn_err; empty / `all` / `none` fills every `flags.end_disclose[]` slot (`!` or `none` → `DISCLOSE_NO_WITHOUT_PROMPT`, else `DISCLOSE_PROMPT_DEFAULT_YES`); otherwise a prefix walk (`k`→`v`, `d`→`o`, special prefixes coerced off `v`/`g`). get_val and get_cnf_val append mode+letter via `strkitten` (`hacklib.c:275`). do_handler → `handler_disclose` (`:5674–5777`).
**JS:** `js/options.js` `optfn_disclose :264`, `handler_disclose :353`. `js/hacklib.js` `strkitten :171`. allopt `optfn` idx 45 `:5742`.
**Change:** `optfn_disclose` and `handler_disclose` in `js/options.js` in C order with `:line` cites. Unspecified categories stay as they are (`'n'` when the string is missing, matching `initoptions` `:7210–7211`). `strkitten` is the one live export in `js/hacklib.js`. do_handler is async because the menus await input, split into `doset_optfn_do_handler` the way `optfn_msg_window` is.
**Verify:** `node scripts/verify.mjs --fn optfn_disclose` → PASS syntax (2 changed js files: js/hacklib.js js/options.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** `config_error_add` and `bad_negation` sinks (no-op). `handler_disclose` `n > 1` second pick (`:5769–5770`) folded into `select_menu_pick_one`.
**Next:** next Open — coverage row (`coloratt.c` basic_menu_colors).

## 2026-09-25 — D-2787 caller cite `rcfile()` is `js/cfgfiles.js:966`

**Change:** the divergence-log caller line pointed at `:964` (`set_ignore_errors_on_unmatched`). `rcfile()` is `:966`. No `js/` change. Queue row already archived; not popped.
**Verify:** `node scripts/verify.mjs --fn rcfile_interface_options` → PASS syntax 0 · PASS rule2 · note hidden (queue row cited callers 0, not N corpus blocks) · PASS reach 24/24 REACH-OK · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full · VERIFY: PASS.
**Next:** next Open — coverage row (`options.c` optfn_disclose).

## 2026-09-25 — D-2787 `cfgfiles.c` rcfile_interface_options whole-body port (rc parser)

**C locus:** `nethack-c/upstream/src/cfgfiles.c:1960–1976` `rcfile_interface_options`. Same commit: `rcfile :1892–1957`, `read_config_file :1623–1647`, `parse_conf_file :1843–1860` (VFS text), `parse_conf_buf :1692–1807`, `parse_conf_str :1809–1837`, `cnf_parser_init/done`, `parse_config_line :1388–1438`, `config_error_init :1469–1490`, `config_error_nextline :1492–1512`, `config_erradd :1543–1589`, `config_error_done :1591–1621`, heed/disregard config lines `:1978–1995`, and `options.c` `allopt_array_init :7404–7433` plus heed/disregard options `:10182–10211`.
**JS:** `js/cfgfiles.js` `config_error_init :217`, `config_error_done :291`, `parse_config_line :686`, `parse_conf_str :827`, `read_config_file :881`, `rcfile :899`, `rcfile_interface_options :956`. `js/options.js` `heed_all_options :6087`, `allopt_array_init :6113` (disregard/heed-this sit beside heed-all).
**Change:** the sequence and the parser in `js/cfgfiles.js` in C order, UNIX `fopen_config_file` via `vfsReadFile`, `config_line_stmt` table with live handlers for OPTIONS/NAME/ROLE/pet names/MSGTYPE/MENUCOLOR/HILITE_STATUS/SYMBOLS/ROGUESYMBOLS/WIZKIT and the transcribed sysconf validators. Heed/disregard and `allopt_array_init` live in `js/options.js`. Not called from startup (`initoptions_init` / `initoptions_finish` are not JS functions).
**Verify:** `node scripts/verify.mjs --fn rcfile_interface_options` → PASS syntax (2 changed js files: js/cfgfiles.js js/options.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** `initoptions_init` / `initoptions_finish` (startup does not call `rcfile`). `nhlua.c:669`.
**Next:** next Open — coverage row (`options.c` optfn_disclose).

## 2026-09-25 — D-2786 `options.c` optfn_gender whole-body port (gender/race/role/alignment)

**C locus:** `nethack-c/upstream/src/options.c:1777–1812` `optfn_gender` (NHOPTC, optlist.h `:132`). Same envelope: `optfn_alignment` `:885–919`, `optfn_race` `:3507–3542`, `optfn_role` `:3589–3624`. do_init → optn_ok. do_set → `parse_role_opt` (`:7904–8016`); `*op == '!'` keeps the filter; else `str2*` into `flags.init*`, unknown → `config_error_add` + optn_err. Gender also sets `flags.female`. Race stores `gp.pl_race = *op`. Role `nmcpy`s `pl_character`. Then `saveoptstr` of `rolestring` (`:72–73`). get_val is `rolestring`; get_cnf_val is `get_cnf_role_opt` (`:8019–8033`) or the literal `"none"`.
**JS:** `js/options.js` `rolestring :3863`, `opt2roleopt :3876`, `getoptstr :3894`, `saveoptstr :3918`, `get_cnf_role_opt :3936`, `parse_role_opt :3963`, `optfn_gender :4047`, `optfn_race :4086`, `optfn_role :4126`, `optfn_alignment :4164`. `js/player_selection.js` `clearrolefilter :79`, `setrolefilter :94`, `rolefilterstring :120`. allopt `optfn` idx 3–6 `:5479–5485`.
**Change:** the four optfns plus `parse_role_opt`, `saveoptstr`, `getoptstr`, `opt2roleopt`, `get_cnf_role_opt`, and `rolestring` in `js/options.js`, in C order with `:line` cites. `rolefilterstring` and the existing filter mutators are exported from `js/player_selection.js` (one `rfilter`, not a second clone). `string_for_env_opt` / `mungspaces` / `str2*` / `config_error_add` / `nmcpy` are the live exports.
**Verify:** `node scripts/verify.mjs --fn optfn_gender` → PASS syntax (2 changed js files: js/options.js js/player_selection.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** `config_error_add` message text (existing no-op sink). `complain_about_duplicate` message text (existing no-op). roleoptvals save/restore (`options.c` freeroleoptvals / save-file pair) is not a callee of these optfns.
**Next:** next Open — coverage row (`cfgfiles.c` rcfile_interface_options).

## 2026-09-25 — D-2785 `options.c` optfn_soundlib whole-body port (soundlib option live)

**C locus:** `nethack-c/upstream/src/options.c:3824–3860` (staticfn; NHOPTC wires `&optfn_soundlib`, optlist.h `:693`, has_handler No, negateok No, set_gameview). do_init → optn_ok. do_set: `string_for_env_opt` (config only); empty → optn_err; else `get_soundlib_name` (unused buf), `soundlib_id_from_opt`, store the id, `assign_soundlib` rewrites `gc.chosen_soundlib` from the table. get_val and get_cnf_val Sprintf the active library name. Any other req → optn_ok. Callees `sounds.c:1797–1805`, `:1863–1880`, `:1882–1895`. Contest `soundlib_choices` is nosound only (`:1726–1776`, no `SND_LIB_*`).
**JS:** `js/options.js` `assign_soundlib :3685`, `get_soundlib_name :3701`, `soundlib_id_from_opt :3722`, `optfn_soundlib :3748`. allopt row `optfn: optfn_soundlib` `:5375`.
**Change:** restart as `optfn_soundlib` in C order with `:line` cites. `string_for_env_opt` is the existing options.js local (not cloned). The three sounds.c callees and the nosound-only table live in `js/options.js` because `js/sounds.js` already imports this module.
**Verify:** `node scripts/verify.mjs --fn optfn_soundlib` → PASS syntax (1 changed js file: js/options.js) · PASS rule2 · note hidden (no corpus session blocked at baseline) · PASS reach (no RNG-tagged reach; smoke 24/24, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 · VERIFY: PASS.
**Named:** `activate_chosen_soundlib` (`sounds.c:1778–1795`; already named at `allmain.c:703` — chosen id is not switched into `active_soundlib`). unixmain `assign_soundlib` compiled out. `#if 0` `choose_soundlib`.
**Next:** next Open — coverage row (`optfn_gender`).
