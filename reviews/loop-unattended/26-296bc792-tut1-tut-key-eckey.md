# Review 26 — 296bc792 — tut-1 `tut_key` / `nh.eckey` via `cmd_from_ecname` (D-1065)

## Metadata
- Full / short hash: `296bc7925ef0e4397d1720e29c373c13eb87b366` / `296bc792`
- Parent: `b3daacc3` (cadence **#1345** docs-only score refresh; Must-fix empty; popped Open tut-1 `tut_key` / eckey)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 06:44:36 +0200
- D-id: **D-1065**
- Stats: 11 files, +241 / −91 — `js/dokeylist.js` +71 (`cmdbinds_live`, `cmd_from_func_ecname`, `cmd_from_ecname`); `js/mklev.js` +115/− (~`tut_key` / `tut_key_help` + every `load_tut1` eckey engraving)
- Claims to close: Open queue tut-1 `tut_key` / eckey only (not nhcore disable / Knight jump). Stamped **Addressed:** D-1065 on the archive row **without** the short hash (chicken-egg). This review commit fills `296bc792`.
- JS / map: `dokeylist.js` `cmd_from_ecname`; `mklev.js` `load_tut1`; `c-js-map/startup.md` still names Knight jump / nhcore / leftover `obfree`. Cadence **#1345** **44**/44 (docs-only `b3daacc3` between review 25 and this SHA).
- JS-touching since last `reviews/loop-unattended/` file: this SHA only. Docs-only since that file: `c964c36d` (review 25), `b3daacc3` (cadence #1345).
- Prior reviews this SHA claims to close: **25** ACCEPT `dc354c44` D-1064 (next was tut_key); **24** ACCEPT `3f376b74` D-1063. `reviews/loop-2026-08-15/` has no open Must-fix on eckey.

## Intent vs deliverable

Git subject promises: “Match C cmd_from_ecname so tut-1 engravings use nh.eckey instead of hardcoded keys.” Body is empty beyond Co-authored-by. D-log: `load_tut1` used hardcoded hjkl / `Ctrl-D` / `:` / `\\` / `#twoweapon` / `Ctrl-T` instead of `dat/tut-1.lua` `tut_key` → `nh.eckey` → `cmd_from_ecname`.

C `cmd.c:3071–3088` is `cmd_from_ecname`: `strcmp` on `extcmdlist[].ef_txt`, then `cmd_from_func(extcmd->ef_funct)`, then `visctrl(key)` or `#name`, or empty if unknown. C `cmd.c:3036–3066` is `cmd_from_func`: walk `gc.Cmd.cmdbinds` (newest-first linked list), skip space then digits/`'-'`+`do_fight` when `!Cmd.num_pad`, return first printable `' '`…`'~'`, else last non-printable, then space last resort. C `nhlua.c:1644–1657` is `nhl_get_cmd_key` (`nh.eckey`): one string arg → `cmd_from_ecname`. C `hacklib.c:469–493` is `visctrl`: `0200` → `M-`, then `<040` → `^` + `(c|0100)`, `0177` → `^?`. C `dat/tut-1.lua:5–27` rewrites `^X` → `Ctrl-X` (stash for caret help) and `M-X` → `Alt-X` (uppercase only). C `tut-1.lua:70–107` / `230–267` / `294` is every `tut_key` / `tut_key_help` site including no-op help at (64,4).

The queue line was tut-1 `tut_key` / eckey. The diff ships `cmd_from_ecname` on default `commands_init` + `reset_commands(!num_pad)` plus BIND overlay, ports the Lua rewrite inside `load_tut1`, and retargets the engraved strings.

It does **not** add a Lua VM or `nhl_get_cmd_key` argc≠1. Named. It does **not** port the Knight `u.role == "Knight"` jump engraving (`tut-1.lua:83–85`). Named, and the queue line excluded it. It does **not** disable nhcore enter/leave callbacks. That remains Open. It does **not** rewire `rhack` to `cmdbind_get` for loot/tip/untrap. Map already names omit full `Cmd.cmdbinds` defaults table.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `cmd_from_ecname` | C function, new JS | `cmd.c:3071–3088`; `nhlua.c:1650` `nh.eckey` |
| `cmd_from_func_ecname` | clone of `cmd_from_func` | matches **extcmd name**, not `ef_funct`; walks **0..255**, not list |
| `cmdbinds_live` | clone of `commands_init` + `reset_commands(!num_pad)` + BIND overlay | rebuilds a 256-slot table each call |
| `build_default_cmdbinds` | pre-existing clone | `cmd.c:2750–2782` + `3461–3473`; `N_DIRS=8` so `><` stay extcmdlist |
| `visctrl` | imported existing C callee | `hacklib.c:469–493`; `dokeylist.js:40–55` (not this SHA) |
| `tut_key` / `tut_key_help` | Lua clones in `load_tut1` | `tut-1.lua:5–27`; not a Lua VM |
| `load_tut1` engraving sites | C `des.engraving` + `tut_key(...)` | every eckey string except Knight jump |
| `EXTCMDLIST` | generated C table | `cmd.c` `extcmdlist[]` via `extcmdlist_data.js` |
| `game.Cmd.binds` | existing parsebindings overlay | D-0897; `parsebindings` lowercases names |
| `rhack` / `try_rc_keybind` | **not this SHA** | still hardcoded + inventory BIND only |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names in control flow. Engraving `(x,y)` are baked `tut-1.lua` coords already used by the previous hardcoded strings, not public-trace gates. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the `js/dokeylist.js` + `js/mklev.js` hunks: no trace-index gates, no recorded coordinates as control flow, no `fastforward` burns. Contest Rule #2: no Node builtins in scored code. Overlay can let hjkl `BIND=` stick when C `initoptions_finish` rebinds dirchars — **named** in the `cmdbinds_live` comment, not a tut-1 default-bind wrong.

## C ↔ JS fidelity

### `cmd_from_ecname` — strcmp, visctrl, `#name`, empty unknown

C `cmd.c:3076–3088`:

```
for (extcmd = extcmdlist; extcmd->ef_txt; ++extcmd)
    if (!strcmp(extcmd->ef_txt, ecname)) {
        char key = cmd_from_func(extcmd->ef_funct);
        if (key) Sprintf(..., visctrl(key));
        else     Sprintf(..., "#%s", ecname);
        return cmdnamebuf;
    }
cmdnamebuf[0] = '\0';
```

JS (`dokeylist.js:266–278`): `===` on `EXTCMDLIST[].txt` (generated from that table; case-sensitive like `strcmp`). Unknown / empty → `''`. Bound → existing `visctrl`. Unbound-but-known → `` `#${ecname}` ``. `nhl_get_cmd_key` argc≠1 returns 0 / no push; JS has no Lua binding. Tut-1 always passes one name. Match for this envelope.

`visctrl` (`hacklib.c:477–492`; JS `dokeylist.js:40–54`):

```
if ((uchar) c & 0200) { ccc[i++] = 'M'; ccc[i++] = '-'; }
c &= 0177;
if (c < 040) { ccc[i++] = '^'; ccc[i++] = c | 0100; }
```

Ctrl-D (`C('d')==4`) is `^D`. `M('l')==236` is `M-l`. `M('T')==212` is `M-T`. `'X'` is `X`. `'>'` is `>`. Match.

### `cmd_from_func` clone — name vs pointer; 0..255 vs newest-first list

C walks `cmdbinds` prepended by `cmdbind_add` (`cmd.c:2151–2153`), so **newer binds first**. Printable (`' '`…`'~'`, 32–126) returns immediately; non-printable overwrites `ret`; space last. Skip digits and `'-'` when `fn==do_fight` and `!num_pad`.

JS `cmd_from_func_ecname` walks `i=0..255`, matches `binds[i].txt === ecname`, same printable / skip-space / skip-digit / fight-`'-'` gates (`ecname === 'fight'` stands in for `fn==do_fight`). Comment names the list-order hole: two non-printables on one command (overview `C('o')` then `M('O')`). C newest-first ends on Ctrl-O (`ret` overwritten). JS index-order ends on `M-O`. **Tut-1 never calls `eckey("overview")`.** Named, not this Open line.

Same clone matches **name**, not `ef_funct`. C `call` and `name` share `docallcmd` (`cmd.c:1687–1688`, `1773–1774`), so `cmd_from_ecname("call")` can return `'N'` after `bind_key('N',"name")`. JS `"call"` stays `'C'`. **Tut-1 never calls those names.** Named.

`BIND=` two printables (seed2600 `v:inventory` plus default `i`): C prepends `v`, returns `v`. JS 0..255 returns `i`. Tut-1 does not `eckey("inventory")`. Named with the dirchar-overwrite omit.

Default tut-1 names after `reset_commands(!num_pad)` (`cmd.c:3346` `sdir="hykulnjb><"`, `hack.h:655` `N_DIRS = N_DIRS_Z-2` so only eight dirs; `><` stay extcmdlist `'<'`/`'>'`):

| `ecname` | surviving bind | visctrl | Lua rewrite |
|----------|----------------|---------|-------------|
| movewest…northwest | `h j k l` / `b u n y` | same letters | none |
| close / search / pickup / … / down / quaff | single printable | `c` `s` `,` … `>` `q` | none |
| kick | `C('d')==4` (`'k'` overwritten by north) | `^D` | `Ctrl-D` |
| untrap | `M('u')==245` (`'u'` overwritten by NE) | `M-u` | none (`[A-Z]` fails) |
| loot | `M('l')==236` (`'l'` overwritten by east) | `M-l` | none |
| tip | `M('T')==212` | `M-T` | `Alt-T` |
| twoweapon | `'X'` (printable beats later `M('2')`) | `X` | none |
| run | `'G'` (`'5'` skipped, `!num_pad`) | `G` | none |
| wait | `'.'` (space not bound; `commands_init` `#if 0`) | `.` | none |
| jump | `M('j')` | `M-j` | **not engraved** (role gate) |

Old hardcoded `:` (look), `\\` (known), `#twoweapon`, `Ctrl-T` (teleport) were **wrong C strings**. New strings match the table. Kick `Ctrl-D` and hjkl were already the C defaults; this SHA does not newly prove those cells.

`num_pad` Off: JS `!!(game.Cmd?.num_pad)` is false when unset; C `reset_commands(TRUE)` sets `Cmd.num_pad = FALSE` (`cmd.c:3362`). Match for contest default. number_pad/phone/swap_yz dir layouts named.

### Lua `tut_key` / `tut_key_help` — Ctrl stash, Alt uppercase-only, second help no-op

C `dat/tut-1.lua:5–19`:

```
local s = nh.eckey(command);
local m = s:match("^^([A-Z])$"); -- ^X is Ctrl-X
if (m ~= nil) then tut_ctrl_key = m; return "Ctrl-" .. m; end
m = s:match("^M%-([A-Z])$"); -- M-X is Alt-X
if (m ~= nil) then tut_alt_key = m; return "Alt-" .. m; end
return s;
```

`s:match("^^([A-Z])$")` is start-anchor + literal `^` + uppercase (Lua `^` is magic only at pattern start). JS `/^\^([A-Z])$/`. `s:match("^M%-([A-Z])$")` ↔ `/^M-([A-Z])$/`. Lowercase `M-l` / `M-u` / `M-j` stay as visctrl. Uppercase `M-T` becomes `Alt-T`. `tut_alt_key` is assigned in C and **never read**; JS omits the dead local. Match.

`commands_init` then `reset_commands` (`cmd.c:2761–2777`, `3461–3473`): number_pad letter binds (`'k'` kick, `'l'` loot, `'u'` untrap, `'j'` jump) are installed, then `sdir[0..7]` overwrite those letters with walk. JS `build_default_cmdbinds` `set()` does the same last-write-wins on a 256-slot array. Movement `ecname`s therefore return hjkl/buny, not the number_pad letter leftovers. Match.

`tut_key("kick")` sets `tut_ctrl_key='D'`. `tut_key_help(6,8)` (`tut-1.lua:107`) writes the caret note and clears. Later tut_key calls before `(64,4)` are not `^X`. `tut_key_help(64,4)` (`tut-1.lua:294`) is a no-op. JS now calls it. Old JS omitted the second call and hardcoded the first note. Match.

Knight gate (`tut-1.lua:83–85`) still absent. Named. seed0009 is not that role path.

### BIND overlay vs `BIND=nothing`

`cmdbinds_live` copies defaults then `game.Cmd.binds` Map. `parsebindings` stores `ext.txt.toLowerCase()` (`options.js:341`); `byTxt` keys are already lowercase. Overlay `if (!name) binds[k]=null` is dead: `"nothing"` **deletes** the Map entry (`options.js:322–324`), so the default bind **remains**. C `bind_key(..., "nothing")` `cmdbind_remove`s. Unhit by tut-1 / contest default RC (no unbind). Named clone gap, not this Open line. seed2600 `BIND=v:inventory` does not change tut-1 eckey names.

## Hallucinations / overclaim

“Match C cmd_from_ecname so tut-1 engravings use nh.eckey” is **true for default `!num_pad` binds, visctrl, Lua Ctrl-/Alt- rewrite, `tut_key_help` after kick and at (64,4), and replacing the hardcoded loot/tip/untrap/twoweapon strings.** It is **not** true that `cmd_from_func` is the C linked-list / `ef_funct` walker, that `rhack` now dispatches `M-l` / `M-T` / `M-u` from `cmdbind_get`, that Knight jump engraved, that number_pad layouts exist, or that a Lua VM runs `tut-1.lua`. The D-log deferred list says those.

This is **not** “Match C dispatch, callee is a stub.” `cmd_from_ecname` + `visctrl` are the C functions; `tut_key` is a Lua clone with matching regex; `cmd_from_func_ecname` is a named clone that agrees on every tut-1 default `ecname` above.

Cadence **#1345** 44/44 does not newly prove loot `M-l` / tip `Alt-T` / untrap `M-u` / twoweapon `X` on scored screens (those cells are past seed0009’s captured prefix; kick/hjkl strings did not change). Journal admits a private eckey table. Fair.

Stamping the Open item **Addressed:** D-1065 is fair for the tut-1 eckey engraving envelope. Fill hash `296bc792` in this commit.

Docs-only `b3daacc3`: Score **44**/44 Scr **11405**/11405 RNG **100%** speed `31+0.27/turn` (R² 0.87). No JS. Not a port claim.

## Density (§2b)

One Open cluster: C’s `tut_key` → `nh.eckey` → `cmd_from_ecname` / `cmd_from_func` / `visctrl` + Lua rewrite + help. Sibling engraving sites shipped with the helper (not a one-string peel). ~71 lines in `dokeylist.js` plus `load_tut1` call-sites. Knight jump and nhcore left named on purpose. Right size. Not “finish `cmd.c` cmdbinds / rhack.” Not another food or levregion peel.

## Verification

Journal: private node kick `Ctrl-D`/`^D`, loot `M-l`, tip `Alt-T`, untrap `M-u`, twoweapon `X`, down `>`, unknown `""`. green+strict PASS; seed0009 **73**/73; cohort **12**/12 (8000/0900/0009/0030/0060/0102/0116/0360/0373/1500/1800/2200). Path: seed0009 hits early hjkl / kick / close strings (unchanged vs old hardcodes). Loot/tip/untrap/twoweapon engravings are **public-unhit**.

This review iter did not re-run sessions (cadence **#1345** already refreshed Score). C read of `cmd.c:2135–2154` `cmdbind_add` / `2662–2728` `bind_key` / `2750–2782` `commands_init` / `3036–3088` `cmd_from_func`+`cmd_from_ecname` / `3343–3476` `reset_commands`, `nhlua.c:1644–1657`, `hacklib.c:469–493`, `hack.h:652–655` `N_DIRS`, `dat/tut-1.lua:1–27`/`70–107`/`230–267`/`294`, `windconf.h`/`global.h` `M()`/`C()`, JS `dokeylist.js:40–55`/`154–279`, `mklev.js:8488–8860`, `options.js:268–344`, `generated/extcmdlist_data.js` kick/loot/tip/twoweapon/untrap keys. Grep of the JS hunks: no `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / seed names in control flow.

## Actionable C-wrongs

None in the tut-1 default-bind eckey engraving envelope this SHA shipped.

Named omits (map, not queue): tut-1 nhcore callback disable (live Open); Knight jump role-gate engraving; `cmd_from_func` list-order vs 0..255 (overview) and `ef_funct` sharing (`call`/`name`); `BIND=nothing` does not clear defaults (`parsebindings` deletes the overlay key); `initoptions_finish` dirchar overwrite vs sticky overlay; number_pad/phone/swap_yz; `rest_on_space`; `rhack` still not `cmdbind_get` for loot/tip/untrap; leftover `obfree`; `update_inventory`.

Do not restore hardcoded tut-1 key strings vs `nh.eckey`/`tut_key`. Do not put trailing `confdir` inside shared `getdir`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: tut-1 engravings now go through `cmd_from_ecname` + visctrl + Lua Ctrl-/Alt- rewrite, so loot is `M-l`, tip `Alt-T`, untrap `M-u`, twoweapon `X`, matching default `!num_pad` binds rather than look/known/extcmd/teleport hardcodes.
