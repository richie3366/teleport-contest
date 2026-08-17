# Review 154 — cf9eb066 — allmain.c newgame wizkit `obj_delivery(FALSE)` (D-1192)

## Metadata
- Full / short hash: `cf9eb066aca2e82d2fb243158a29ced2bd8ee35b` / `cf9eb066`
- Parent: `cc7d0ef5` (D-1191). This file audits **this SHA only**. Archive row **Addressed:** D-1192 lacked the short hash; this review commit fills `cf9eb066`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 00:54:13 +0200
- D-id: **D-1192**
- Stats: 13 files, +273 / −44 — `js/files.js` **new** +140; `js/allmain.js` +10; `js/options.js` +8 (`WIZKIT=`); `js/dokick.js` comment.
- Claims to close: Open queue `allmain.c` `newgame` wizkit `obj_delivery(FALSE)` (named from D-1177 / review **138**). Not `deliver_obj_to_mon`. `reviews/loop-2026-08-15/` has no unpaid wizkit Must-fix.
- JS / map: `files.js` `read_wizkit`; `allmain.js` `newgame`; `options.js` `parseNethackrc`; callee `dokick.js` `obj_delivery` (D-1177). `c-js-map/turns.md`. `deliver_obj_to_mon`, getenv/HOME, `wish_history`, `config_error` UI, `init_artifacts`, newgame `notice_mon_off` still named.
- Prior reviews this SHA claims to close: **138** named omit of the newgame FALSE caller.

## Intent vs deliverable

Git subject promises: “Match C allmain.c newgame wizkit obj_delivery(FALSE) so overflow WIZKIT items land at the hero.”

Old JS `newgame` went from `u_init_skills_discoveries` to `flags.legacy` without the wizard kit finish. C `if (wizard) { read_wizkit(); obj_delivery(FALSE); }` so overflow kit items (`MIGR_WITH_HERO|NOBREAK|NOSCATTER` at dnum 0 / dlevel 1) land at the hero. Fitting items `addinv` inside `wizkit_addinv`.

The diff **does** add VFS `read_wizkit` (Rule #2: no `fs` / getenv / HOME fopen), parse top-level `WIZKIT=` in `parseNethackrc`, and wire the wizard pair after skills. It **does** use the existing `obj_delivery(false)` (D-1177). It does **not** pull `deliver_obj_to_mon`, `wish_history_add`, `config_error` UI, `option_help` WIZKIT, `init_artifacts`, or newgame `notice_mon_off`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `newgame` wizard pair | C site, **new** | `allmain.c:826–829` |
| `read_wizkit` | C callee, **new** | `files.c:2584–2601` |
| `fopen_wizkit_file` | C callee, **clone** | VFS `vfsReadFile`; getenv/HOME/`access` named |
| `parse_wizkit_text` | **clone** of `parse_conf_buf` | comments / `\` join; CHOOSE/sections named |
| `proc_wizkit_line` | C callee, **new** | `files.c:2562–2581` |
| `wizkit_addinv` | C callee, **new** | `files.c:2537–2559` |
| `merge_choice` | C callee, **clone** | shop-floor arm named (wizkit objs are `OBJ_FREE`) |
| `obj_delivery(FALSE)` | C callee, **imported** | `dokick.js` D-1177; not a stub |
| `observe_object` / `addinv` / `add_to_migration` / `inv_cnt` / `readobjnam` | C, **imported** | live |
| `cnf_line_WIZKIT` | C, **clone** | `/^WIZKIT=(.+)/i` — no `:` / spaces-around-`=` |
| `program_state.wizkit_wishing` | C flag, **set only** | C `pline.c:172` / `objnam.c:4976` / `:5064` never read in JS |
| `deliver_obj_to_mon` | C sibling, **named omit** | Open |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. `vfsReadFile` is frozen `storage.js` VFS. Rule #2 clean.

**New RNG on this path:** `readobjnam` / `mksobj` / `addinv` only when wizard + a VFS kit file exists. Public sessions have no `WIZKIT=` — **public-unhit**. Private canary **18**/18 (parse / !wizard / missing VFS / dagger addinv / overflow flags + FALSE at hero).

Grep of this SHA’s `js/` hunks: no banned gates.

## C ↔ JS fidelity

### Call site vs `allmain.c:824–833`

C after `u_init_skills_discoveries()`:

```
if (wizard) {
    read_wizkit();
    obj_delivery(FALSE); /* finish wizkit */
}
if (flags.legacy) { … }
```

`wizard` is `#define wizard flags.debug` (`flag.h`). JS (`allmain.js:653–659`): `if (g.flags?.debug || g.flags?.wizard)` then `await read_wizkit()` / `await obj_delivery(false)` then legacy. Extra `flags.wizard` is the established D-0576 alias; `playmode:debug` sets `flags.debug` (`options.js:398`). Not a new C-wrong. Hero is already on upstairs (`u_on_upstairs` at C `:808` / JS `:631`) before this pair — C `wizkit_addinv`’s “isn’t in position yet” comment is stale in C too; overflow still migrates then FALSE-delivers at `u.ux,u.uy`.

`obj_delivery(false)` XOR (`dokick.c:1792–1793` / review **138**): `near_hero==false` delivers only `MIGR_WITH_HERO`. Overflow dest `ox=0, oy=1` matches newgame `u.uz` `{dnum:0,dlevel:1}` (`allmain.js:611`). **Callee is live, not a stub.**

### `read_wizkit` vs `files.c:2584–2601`

C: `if (!wizard || !(fp = fopen_wizkit_file())) return`; `wizkit_wishing=1`; `config_error_init`; `parse_conf_file(fp, proc_wizkit_line)`; fclose; `config_error_done`; `wizkit_wishing=0`.

JS: `wizard_mode()` then `fopen_wizkit_file()` (string or null); set the flag; collect lines then `await proc_wizkit_line` each; clear the flag. `config_error_init/done` named. **Order matches** the C wrapper.

`fopen_wizkit_file` (`:2465–2532`): C `getenv("WIZKIT")` may overwrite `gw.wizkit`; empty name → NULL; then `fopen` / HOME / `fqname`. JS reads `game.wizkit || game._parsed_rc?.wizkit` (jsmain stores `parseNethackrc` on `_parsed_rc`); `vfsReadFile` miss ≡ ENOENT → null. Named omit of getenv/HOME is the Rule #2 adaptation, not a clone lie.

### `wizkit_addinv` / `proc_wizkit_line` vs `:2537–2581`

C `wizkit_addinv`: skip null/`hands_obj`; `observe_object`; cleric `bknown=1`; if not gold and `inv_cnt(FALSE) >= invlet_basic` and `!merge_choice(invent, obj)` → `add_to_migration`, `ox=0`, `oy=1`, `owornmask = WITH_HERO|NOBREAK|NOSCATTER`; else `addinv`.

JS: same skip (`hands_obj` / `HANDS_OBJ` / `_hands` sentinels); `observe_object`; `Role_if(PM_CLERIC)` via `urole.mnum` (C priest role **is** `PM_CLERIC` — `role.c:289`); `inv_cnt(false) >= 52`; `merge_choice`; same migration fields. `INVLET_BASIC` / `WIZKIT_MAX` are 52 / 128 (`hack.h`). `inv_cnt(false)` skips `COIN_CLASS`; C `hack.c:4496–2507` skips `invlet == GOLD_SYM`. Equivalent for gold. Shop-floor `merge_choice` arm named — kit objects are `OBJ_FREE`.

C `proc_wizkit_line`: clamp `BUFSZ`; `readobjnam`; if otmp and not `hands_obj` → `wish_history_add` + `wizkit_addinv`; else `config_error_add`. JS clamp; `readobjnam`; skip `NOTHING_OBJ` / hands; no `wish_history` / `config_error`. Named. Return value is unused by `read_wizkit`.

`observe_object` (`o_init.c:442–451`): `dknown` + `discover_object(..., FALSE, TRUE)` when `otyp >= FIRST_OBJECT && !Hallucination`. JS (`invent.js:685–689`) skips Hallucination then always discovers — FIRST_OBJECT skip is pre-existing named, not this SHA.

### `parse_wizkit_text` vs `cfgfiles.c:1693–1807`

Per-line: strip CR; trailing `\` continuation; trim trailing then leading space; ignore empty / `#`; join with one space; `more || (ignore && !buf)` → keep accumulating; else `proc`. That subset **matches** C’s ignore/merge/morelines tests (CHOOSE / `[section]` / line-too-long named).

**Clone diverge (not the claimed overflow path):** C `cnf_parser_done` (`:1677–1684`) **frees** leftover `parser->buf` without calling `proc`. JS `if (buf) proc(buf)` **processes** a file that ends on a continued line. JS is more generous. Actionable debt, not Must-fix.

### `WIZKIT=` vs `cfgfiles.c:1214–1218` / `:1401–1432`

C `parse_config_line` `mungspaces`s, `find_optparam` accepts `=` **or** `:`, skips one space after the separator, `match_varname(..., "WIZKIT", 6)`, `strncpy(gw.wizkit, bufp, WIZKIT_MAX-1)`. JS `/^WIZKIT=(.+)/i` then `.trim().slice(0, WIZKIT_MAX-1)`. `WIZKIT=file` matches. `WIZKIT = file` and `WIZKIT:file` match C and **miss** JS. Contest / canary used `WIZKIT=` without spaces. Clone diverge; not Must-fix.

### `wizkit_wishing` consumers

C sets the flag so callees change behavior:

- `pline.c:172–173` — **return** (no messages during kit parse).
- `objnam.c:4976` — skip `wizterrainwish`.
- `objnam.c:5064` — glob weight limit without Override yn.
- `questpgr.c:462` — `skip_pager`.

JS **only assigns** the flag (`files.js:133–139`). Nothing reads it. `addinv` can still `pline('You learn more about your items by comparing them.')` on a discovery merge; C would swallow that. JS `readobjnam` has no terrain-wish / glob-yn arms, so those two C gates are moot today. The pline suppress is a **real C-wrong family** on the kit envelope, not a named omit. Claimed overflow landing does not depend on it. ACCEPT-WITH-DEBT, not Must-fix (do not steal `deliver_obj_to_mon`).

| Case | C | JS after |
|------|---|---------|
| !wizard | no read | **same** (`debug\|\|wizard`) |
| empty / missing file | return | **same** (VFS null) |
| fitting item | `addinv` | **same** |
| overflow | migrate 0,1 WITH_HERO\|… then FALSE at hero | **same** |
| gold | always `addinv` | **same** |
| cleric | `bknown=1` | **same** (`PM_CLERIC`) |
| `WIZKIT=file` | `gw.wizkit` | **`_parsed_rc.wizkit`** |
| `WIZKIT =` / `:` | C accepts | **miss** |
| leftover `\` at EOF | drop | **JS proc** |
| pline during kit | suppressed | **flag unread** |

## Hallucinations / overclaim

D-log / CURRENT / subject say overflow WIZKIT items land at the hero via newgame `read_wizkit` + `obj_delivery(FALSE)`. **That pair is the hunk.** Stamping **Addressed:** D-1192 is fair; fill hash `cf9eb066` in this commit. This is **not** “Match C dispatch, callee is a stub”: `obj_delivery`, `readobjnam`, `addinv`, `add_to_migration` are imported real functions. Do **not** stamp “Match C `pline` wizkit suppress” or “Match C `parse_conf_file` CHOOSE” or “Match C `deliver_obj_to_mon`.”

`program_state.wizkit_wishing = 1` around parse looks like C and is **not** wired to `pline` / `readobjnam`. Say so: the assignment is cargo-cult until a consumer exists. Not a stub of `obj_delivery`.

### Clone classification (this SHA)

- `read_wizkit` / `proc_wizkit_line` / `wizkit_addinv` — C functions, new.
- `fopen_wizkit_file` — C function, VFS clone (named getenv/HOME).
- `parse_wizkit_text` — `parse_conf_buf` clone (EOF leftover diverge).
- `merge_choice` — C function clone (shop arm named).
- `WIZKIT=` regex — `cnf_line_WIZKIT` clone (`=`-only).
- `obj_delivery` — C callee imported, live.
- `wizkit_wishing` — C flag set; **no-op** without consumers.

## Density

One C cluster: newgame wizard pair + the `files.c` envelope that makes FALSE delivery have something to place. ~140 lines of new `files.js` plus an `OPTIONS`-adjacent `WIZKIT=` line. Right-size §2b; not “finish files.c.” Did not pull `deliver_obj_to_mon`.

## Verification

Journal: private canary **18**/18 (WIZKIT= parse; !wizard; missing VFS; dagger addinv; overflow flags + FALSE at hero; source order); green+strict seed8000/0900; cohort **23**/23 including wizard debug 0006/0108/0116/0360/0373/0398/2200/4500/5002/5006 + strict lengths. Public-unhit unless a wizard session has `WIZKIT=` in VFS. Cadence **#1515** full `sessions` **44**/44 Scr **11405**/11405 RNG **792838**/792838 (100%) speed `32+0.27/turn` (R² 0.875) on this SHA — fortress held.

Grep of `git show cf9eb066 -- js/`: no FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/`fastforward`/seed names/hardcoded coordinates.

C read of `allmain.c:824–833`, `files.c:2465–2601`, `cfgfiles.c:1214–1218` / `:1693–1807` / `:1401–1432`, `invent.c:775–810`, `hack.c:4496–2507`, `pline.c:172–173`, `objnam.c:4976` / `:5064`, `dokick.c` `obj_delivery` XOR. JS SHA `files.js` / `allmain.js` / `options.js` / existing `obj_delivery`.

## Actionable C-wrongs

None that Must-fix this next iter (do not steal Open `deliver_obj_to_mon`). Claimed overflow landing matches `:826–829` + `:2547–2558`.

C-wrong family remaining (map / later peel, not new Must-fix prepends):

1. Wire `program_state.wizkit_wishing` into `pline` (C `pline.c:172–173` early return) so kit `addinv` / `readobjnam` messages do not appear. Optional same peel: `objnam.c:4976` terrain skip / `:5064` glob yn if those arms are ported.
2. `WIZKIT = file` / `WIZKIT:file` like `find_optparam` + `mungspaces` (`cfgfiles.c:1401–1420`).
3. Do not `proc` a leftover continued line at EOF — C `cnf_parser_done` frees without calling `proc`.

Named omits / do-nots:

4. `deliver_obj_to_mon` (next Open). getenv / HOME / `access`. `wish_history_add`. `config_error` UI. CHOOSE / `[section]`. `init_artifacts`. newgame `notice_mon_off`.
5. Do not import `fs` / `getenv` to “match” `fopen_wizkit_file`. Do not revert D-1192. Do not hardcode a recorded kit list.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- Score: **7 / 10**
- One sentence: wizard `newgame` now runs C’s `read_wizkit` + `obj_delivery(FALSE)` so overflow kit items land at the hero; `wizkit_wishing` is assigned but unread, and the `WIZKIT=` / `parse_conf_buf` clones miss colon/spaces and C’s EOF drop.
- Must-fix stays empty for this SHA; fill **Addressed:** D-1192 `cf9eb066`. Next port is already Open `deliver_obj_to_mon`. Not getenv, not `notice_mon_off`.
