# Review 682 — 48ddbfc8 — cmd.c getdir yn_function then clear_nhwindow (D-1721)

## Metadata
- Full / short hash: `48ddbfc8aecb1423f09a537a79cc50dcad9fbe5c` / `48ddbfc8`
- Parent: `7381e463` (D-1720). This file audits **this SHA only** (fifth of nine `js/` commits since review **677**). Archive **Addressed:** D-1721 `48ddbfc8`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 08:19:53 +0200
- D-id: **D-1721**
- Stats: `js/lock.js` +18/−18; `js/dothrow.js` +10/−41; `js/zap.js` +14/−16; `js/dig.js` +13/−10; `js/getline.js` +2. Total `js/` insertions **57** <250. Band **150–350**.
- Claims to close: Open getdir `yn_function` after D-1706 / review **667**. Not CQ_REPEAT. Not `yn_function_menu`. Constitution: do **not** add trailing `confdir` to shared `getdir`. `reviews/loop-2026-08-15/` has no unpaid getdir-yn Must-fix.
- JS / map: `lock.js` `getdir`; throw/zap/dig clones. `c-js-map/turns.md`.
- Prior: **667** named `getdir` still paint+`nhgetch`.

## Intent vs deliverable

Git subject promises: interactive prompt uses `yn_function(NULL, '\0', FALSE)` then `clear_nhwindow`, instead of `_pending_message` + `nhgetch`.

`node scripts/csym.mjs getdir` → `cmd.c:3956–4119`. Interactive `:3987–4011`. `--callers yn_function` include that site. `yn_function` `:5470–5583`. `clear_nhwindow(WIN_MESSAGE)` `:4011`.

```3987:4011:nethack-c/upstream/src/cmd.c
        dirsym = yn_function((s && *s != '^') ? s : "In what direction?",
                             (char *) 0, '\0', FALSE);
        /* fuzzer arm omitted */
    }
    /* remove the prompt string so caller won't have to */
    clear_nhwindow(WIN_MESSAGE);

    if (redraw_cmd(dirsym)) { /* ^R */
        docrt_flags(docrtRefresh); /* redraw */
        goto retry;
    }
    if (!gi.in_doagain)
        cmdq_add_key(CQ_REPEAT, dirsym);
```

Parent: lock/throw/zap/dig painted `_pending_message` and `nhgetch`. Unused dothrow local `getdir`. The diff **does** `yn_function(query, null, '\0', false)` then `clear_nhwindow_message` on all four; `^` query gate; deletes the dead dothrow clone. It **does not** `cmdq_add_key(CQ_REPEAT, dirsym)` after the prompt (`yn_function` 4th FALSE also skips its own REPEAT). Named. It **does not** add trailing `confdir(FALSE)` to `lock.js` `getdir`. Banned / named (zap clone still confdirs locally).

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `getdir` interactive | LIVE repaired | lock.js; cmdq DIR/KEY kept |
| `getdir_cmdassist` | CLONE repaired | throw help_dir loop |
| `getdir_zap` | CLONE repaired | local `confdir(false)` |
| `dig_getdir` | CLONE repaired | `.` self; **not** SELF2 `s` |
| `yn_function` | LIVE import | `getline.js:1441`; 4th FALSE |
| `tty_yn_function` | LIVE | null resp → `query + ' '` |
| `clear_nhwindow_message` | LIVE import | WIN_MESSAGE analogue |
| dothrow `getdir` | deleted | unused clone |
| `cmdq_add_key(CQ_REPEAT)` | OMIT named | C `:4013–4014` |
| mouse `_` getpos | OMIT named | C `:4024–4094` |
| trailing `confdir` in lock.js | OMIT named / banned | C `:4116–4117` |
| `yn_function_menu` | OMIT named | |
| `help_dir` in shared getdir | OMIT named | throw clone has it |

`node scripts/sym.mjs`:

```
getdir           js/lock.js:335   ASYNC
getdir_cmdassist js/dothrow.js:2468   ASYNC
getdir_zap       NOT EXPORTED — 1 LOCAL js/zap.js:2322
dig_getdir       NOT EXPORTED — 1 LOCAL js/dig.js:2062
yn_function      js/getline.js:1441   ASYNC
clear_nhwindow_message js/display.js:1829   sync
confdir          js/hack.js:1725   sync
cmdq_add_key     js/invent.js:6318   sync  (+ 3 locals — IMPORT)
```

Re-points: paint+`nhgetch` → import `yn_function` (already LIVE; not a new clone). `--can js/lock.js js/getline.js yn_function` / dothrow / dig / zap: **ALREADY**. Used **inside** `getdir*` functions. `tty_yn_function` treats JS `'\0'` as no-def (`def !== '\0'`). Null `resp` skips `[yn]` and the remap-to-def. Do **not** add `getdir_zap` #2. Do **not** add `dig_getdir` #2. Do **not** import `confdir` into `lock.js` `getdir`. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Query (`:3987–3988`).** C `(s && *s != '^') ? s : "In what direction?"`. JS `(prompt && prompt.charAt(0) !== '^') ? prompt : 'In what direction?'` on all four sites. **Match.** `^` is a `help_dir` marker, not painted text.

**`yn_function` (`:5470` + tty).** C NULL resp, `'\0'` def, FALSE addcmdq. JS `yn_function(query, null, '\0', false)`. FALSE: do **not** pop canned inside `yn_function` (getdir already popped DIR/KEY). Null resp: `tty_yn_function` paints `query + ' '` (no `[yn]`), one key, no invalid-retry remap. **Match the getdir call.** D-1706 already recorded REPEAT only when addcmdq TRUE — getdir’s **separate** `cmdq_add_key(CQ_REPEAT)` is still missing. Named Open.

**`clear_nhwindow` (`:4011`).** C always after the interactive `yn_function` (cmdq `goto got_dirsym` skips both). JS `clear_nhwindow_message()` after `yn_function`; cmdq path still returns before the prompt. Clears `_pending_message` / topline. **Match the “caller won’t have to” prompt strip.** Not a leftover FORCE.

**`^R`.** C `redraw_cmd` → `docrt` → retry. JS lock.js `key===18` `continue`. Throw/zap/dig clones do **not** retry `^R`. Clone drift, pre-existing, not this peel’s claimed arm.

**Callee closure (interactive getdir).** LIVE: `yn_function`, `tty_yn_function`, `clear_nhwindow_message`. CLONE: `getdir_cmdassist` / `getdir_zap` / `dig_getdir` (prompt path matched here). OMIT named: CQ_REPEAT, mouse, lock.js `confdir`, fuzzer, `input_state`, `dxdy_moveok`, `yn_function_menu`. STUB in the **prompt** arm: **none**. Not “dispatch ported, callee stubbed.”

**Trailing `confdir`.** C `:4116–4117` `if (!u.dz) confdir(FALSE)` on **every** successful getdir. Zap clone still calls it (`zap.js:2345`). Shared `lock.js` `getdir` does **not** — comment: `use_whip` already confdirs; adding it would double confuse-whip. CURRENT / constitution ban. Do **not** stamp “Match C getdir confdir” for lock.js.

**Dead clone.** dothrow local `getdir` removed. Throw uses `getdir_cmdassist`. **Match the “one interactive getdir” intent** without merging help_dir into lock.js.

## Hallucinations / overclaim

Subject “interactive prompt uses yn_function(NULL,'\\0',FALSE) then clear_nhwindow instead of paint+nhgetch”: **true** on the four sites. D-log “Keep … zap local confdir. Delete unused dothrow clone”: **true**. Do **not** stamp “Match C `cmdq_add_key(CQ_REPEAT)` `:4014`.” Do **not** stamp “Match C trailing `confdir` in `lock.js`.” Do **not** stamp “Match C `dig_getdir` SELF2 `s`.” Journal “fortress held” is not a getdir-keystroke proof. Public throw/zap/open **are** hit for the prompt path.

## Density

§2b: one C `getdir` interactive envelope + the three clones that still painted. Same `cmd.c:getdir`. +57. Did not glue CQ_REPEAT / mouse / `cant_go_back`. Did **not** add `confdir` to shared `getdir`.

## Verification

D-log / journal: save-oracle skip (untagged `cmd.c:getdir`); focused seed1800 throw + seed2200 zap; green+strict; CURRENT cohort **9**/9 + strict. Public getdir **is** hit. CQ_REPEAT / mouse / lock.js confdir **public-unhit** as omits. Admit that.

## Actionable C-wrongs

None for Must-fix (the Open prompt matches C; REPEAT/mouse/confdir are named). Named: `getdir` `cmdq_add_key(CQ_REPEAT)` (`cmd.c:4013–4014`); mouse `_` `getpos` (`:4024–4094`); `help_dir` in shared getdir (`:4098–4106`); `dxdy_moveok`; `input_state`; `yn_function_menu`; `dig_getdir` SELF2 `s`; `cant_go_back` FREEING (next). Do **not** add `getdir` #2. Do **not** add `getdir_zap` #2. Do **not** add trailing `confdir` to `lock.js` `getdir`. Do **not** pass `addcmdq=true` from getdir (would double-pop). Do **not** restore `_pending_message`+`nhgetch`. Do **not** paint `^` as the query. Do **not** restore the dead dothrow `getdir`.

Verdict: **ACCEPT-WITH-DEBT**
