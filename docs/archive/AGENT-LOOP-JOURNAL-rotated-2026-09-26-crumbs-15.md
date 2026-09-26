# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-26 — D-2883 `does_block` counts an underwater moat; `vision_reset` selects cs0

**C locus:** `nethack-c/upstream/src/vision.c:153–202` `does_block` and `vision.c:211–265` `vision_reset`. Callees: `is_moat` (`dbridge.c:100`), `m_at` (`rm.h:516` `level.monsters`), `objects` nexthere, `is_lightblocker_mappear`, `visible_region_at`, `See_invisible` (`youprop.h:152`), `IS_OBSTRUCTED`. No RNG. `#ifdef DEBUG` `seethru` is not compiled.
**JS:** `js/vision.js` `hero_see_invisible` `:131`, `does_block` `:171`, moat `:187`, boulder `:193`, `m_at` `:199`, gas `:206`, `vision_reset` `:217`, cs0 `:218`, zero planes `:222`, dig `:238`, flags `:269`. `js/mklev.js` `flip_level` `:19133`. `js/dig.js` unblock `:2412`.
**Change:** One `does_block` in that C order: obstructed terrain, tree, closed door, then cloud / water-wall / lava-wall / (`uinwater` and `is_moat`), then the boulder chain, then `m_at` with `hero_see_invisible`, then gas returning 2. One `vision_reset`: `viz_array` is `cs_buf0`, both planes are zeroed, row bounds point at `cs_rmin0` / `cs_rmax0`, the dig uses `!!(IS_OBSTRUCTED || does_block)`, then `vision_inited` and `vision_full_recalc = 1`. `flip_level` calls it after `fix_wall_spines`.
**Verify:** `node scripts/verify.mjs --fn does_block` → PASS syntax (3 changed js files: js/dig.js js/mklev.js js/vision.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** `#ifdef DEBUG` `seethru` in `does_block` and the `block_point` call at `vision.c:873` are compiled out. `wizcmds.c` `levl_sanity_check` (`:1453`, `does_block` vs `get_viz_clear`) is not in JS.
**Next:** `pray.c` `give_spell` (next Open — coverage row). Eight Open — coverage rows remain after archive, at the floor of 8, so nothing was refilled.

## 2026-09-26 — D-2882 `trapeffect_vibrating_square` marks the square and names the vibration

**C locus:** `nethack-c/upstream/src/trap.c:2725–2764` `trapeffect_vibrating_square`. Callees: `feeltrap` (`trap.c`, live `js/trap.js`), `canseemon` (file-local), `cansee` (`vision.js`), `Blind` (file-local), `seetrap`, `mon_nam`, `nolimbs` (`monsters.js`), `m_in_air` (`mon.c:2130–2135`), `s_suffix`, `eos` (`hacklib.c:194`), `makeplural`, `mbodypart` (`FOOT`), `strsubst`, `You_see`, `mdistu` (`dist2` ≤ `2 * 2`). No RNG.
**JS:** `js/trap.js` `m_in_air` `:1140`, `trapeffect_vibrating_square` `:5821`, hero `feeltrap` `:5823`, in-sight `:5826`, `seetrap` `:5830`, feet `:5840`, `You_see` `:5847` and `:5855`. Selector case `:5911`.
**Change:** One `trapeffect_vibrating_square` in that C order. The hero only `feeltrap`s. A monster computes in-sight before `cansee`; `see_it && !Blind` calls `seetrap`, then either `You_see` "beneath" the name (nolimbs or `m_in_air`) or the possessive plural foot with `"rear "` removed from the foot text only, or the nearby/distance ground line.
**Verify:** `node scripts/verify.mjs --fn trapeffect_vibrating_square` → PASS syntax (1 changed js file: js/trap.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed) · VERIFY: PASS.
**Named:** `You_see` still omits the Unaware "You dream that you see" prefix and the Blind "You sense" prefix (`js/display.js` `You_see`; this caller already requires `!Blind`, so the sense prefix cannot run). `eos` / `Strcpy` / `strcat` are one JS string, not a `BUFSZ` buffer.
**Next:** `vision.c` `does_block` (next Open — coverage row). Ten Open — coverage rows remain after archive, above the floor of 8, so nothing was refilled.

## 2026-09-26 — D-2881 `get_table_int_or_random` treats "random" as the default

**C locus:** `nethack-c/upstream/src/sp_lev.c:3407–3437` `get_table_int_or_random`. Callees: `lua_getfield`, `lua_type`, `lua_pop`, `lua_isnumber`, `lua_tostring`, `strcmpi` (`strncmpi` with `n = -1`, `global.h:113`), `Sprintf`, `eos` (`hacklib.c:194`), `Strcat`, `nhl_error` (`nhlua.c:198`), `luaL_optinteger`. No RNG.
**JS:** `js/mklev.js` `lua_isnumber_unpacked` `:21865`, `lua_tostring_unpacked` `:21880`, `get_table_int_or_random` `:21902`, nil `:21907`, `"random"` `:21912`, error `:21917`, integer `:21921`. Callers: `spe` `:21931`, `quantity` `:21941`.
**Change:** One `get_table_int_or_random` in that C order. Nil returns `rndval`. A non-number whose `lua_tostring` is `"random"` (`lspo_strcmpi`) returns `rndval` and does not roll.
**Verify:** `node scripts/verify.mjs --fn get_table_int_or_random` → PASS syntax (1 changed js file: js/mklev.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (auto: shared file changed) · VERIFY: PASS.
**Named:** `lua_pop` has no stack in the unpacked loader. `Sprintf`, `eos`, and `Strcat` are one JS string (not capped at `BUFSZ`).
**Next:** `trap.c` `trapeffect_vibrating_square` (next Open — coverage row). Eleven Open — coverage rows remain after archive, above the floor of 8, so nothing was refilled.

## 2026-09-26 — D-2880 `proc_wizkit_line` records the buffer `readobjnam` left

**C locus:** `nethack-c/upstream/src/files.c:2562–2581` `proc_wizkit_line`. `readobjnam(buf)` (`objnam.c:4909`) runs `mungspaces(bp)` at `:4919`, then writes through that same pointer (`Strcpy`, `*p = 0`, `strsubst`). `d->bp += n` only moves the cursor, so the prefix stays in `buf`. `wish_history_add(buf)` is `:2572`, before `wizkit_addinv`. `makewish` records `bufcpy` copied before `readobjnam` (`zap.c:6359`).
**JS:** `js/readobjnam.js` `cbufAdvance` `:148`, `cbufReplace` `:153`, `publishWishbuf` `:173`, `ret` `:1393`, `_cbuf` `:1418`, `Strcpy` of `makesingular` `:1601`, `Strcat` `" mail"` `:1242`. `js/files.js` `proc_wizkit_line` `:144`, `wish_history_add` `:154`.
**Change:** `readobjnam` keeps the caller's character buffer (`_cbuf` + cursor `_boff`). Pointer advances leave the prefix. `Strcpy`, a NUL cut, `strsubst`, and `Strcat` replace the tail at the cursor.
**Verify:** `node scripts/verify.mjs --fn readobjnam --reach-all` → PASS syntax (2 changed js files: js/files.js js/readobjnam.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (those files are not in the shared-file set) · VERIFY: PASS.
**Named:** `config_error_add` (`files.c:2577`) on a bad wizkit line. In-place arms still absent from the JS body, so they do not rewrite `_cbuf`: `named` / `called` / `labeled` NULs (`objnam.c:4253–4279`); `*(d->bp+2) = 'a'` on `"grey spell"` and the `armour` squeeze (`:4469–4476`); `pair of` / `pairs of` / `set of` pointer walks (`:4324–4334`).
**Next:** `sp_lev.c` `get_table_int_or_random` (next Open — coverage row). Twelve Open — coverage rows remain, at the band ceiling, so nothing was refilled.

## 2026-09-26 — audit 1830–1838 (D-2871–D-2879)

Reviewed the nine `js/` commits since `bde9dd8fa`. Eight ACCEPT. One QUALITY-RISK: `1832` `wish_history_add` records the wizkit line before `readobjnam` rewrites `buf` (`files.c:2568–2573`). That row is Must-fix and Next cluster. Public `sessions` on `539f2fe06`: 44/44, screens 11,405/11,405, RNG 792,838/792,838, speed `234+1.67/turn` (R² 0.788). Held-out still 12/44 (6,273/11,265 pts, RNG 29.7 %, screens 55.7 %). `.cache/hidden/sessions` absent, so 614/940 was not re-measured. No `js/` edits.

## 2026-09-26 — D-2879 `do_osshock` bills the destroyed piece; `bhitpile` restacks boulders

**C locus:** `nethack-c/upstream/src/zap.c:1637–1674` `do_osshock`. Callees: `rn2`, `rnd`, `splitobj` (`mkobj.c:457`, live `js/mkobj.js:418`, including `splitbill` when unpaid), `costly_spot` (`shk.c:889`), `addtobill` (`shk.c:4168`), `stolen_value` (`shk.c:3131`), `delobj` (`invent.c:1429`). `MAIL_STRUCTURES` is defined (`global.h:430`). `Luck` is `u.uluck + u.moreluck` (`you.h:464`). `LARGEST_INT` is 32767 (`global.h:135`). Same file: `bhitpile` (`zap.c:2428–2506`) callee `recreate_pile_at` (`mkobj.c:2371–2388`).
**JS:** `js/zap.js` `do_osshock` `:4911`, mail `:4914`, Luck roll `:4920–4926`, split `:4932–4941`, bill Promise `:4945–4953`, `delobj` `:4955`. Caller `bhito` `:5496`. `js/mkobj.js` `recreate_pile_at` `:2686`. `js/zap.js` `bhitpile` restack `:5856–5864`.
**Change:** One `do_osshock` in that C order. `SCR_MAIL` returns first. The material roll uses `Luck()`.
**Verify:** `node scripts/verify.mjs --fn do_osshock` → PASS syntax (2 changed js files: js/mkobj.js js/zap.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.2s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (those files are not in the shared-file set) · VERIFY: PASS.
**Named:** `fill_pit` (`trap.c:4010–4019`, call `zap.c:2499`). Live `js/dig.js:922` extracts the boulder, `deltrap`s, and `delobj`s.
**Next:** `sp_lev.c` `get_table_int_or_random` (next Open — coverage row). Three Stale parks. Refill below the band of 8.
