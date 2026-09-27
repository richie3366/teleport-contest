# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-09-27 — D-2963 `quest_info` reports a bad typ, then returns 0

**C locus:** `nethack-c/upstream/src/questpgr.c:31–46` `quest_info`. `switch (typ)`: 0 returns `gu.urole.questarti`; `MS_LEADER` / `MS_NEMESIS` / `MS_GUARDIAN` return `ldrnum` / `neminum` / `guardnum` (`short`, `you.h:193–202`). `default` calls `impossible("quest_info(%d)", typ)`, then `return 0`.
**JS:** `js/questpgr.js` `quest_info` `:42`. Case 0 `:45–46`. Leader `:47–48`. Nemesis `:49–50`. Guardian `:51–52`. Default `:53–54`. Return 0 `:56`.
**Change:** One exported `quest_info` keeps that C order. A missing field reads as 0. `impossible` is started and not awaited.
**Verify:** `node scripts/verify.mjs --fn quest_info` → PASS syntax (5 changed js file(s): js/makemon.js js/mon.js js/questpgr.js js/read.js js/trap.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · PASS full 44/44 (shared file changed) · VERIFY: PASS.
**Named:** No arm of the switch is omitted. `impossible` is not awaited, so its `--More--` does not block the caller.
**Next:** `dbridge.c` `e_jumps` (next Open — coverage row).

## 2026-09-27 — D-2962 `get_rnd_text` keeps the line after the pad loop

**C locus:** `nethack-c/upstream/src/rumors.c:499–526` `get_rnd_text`. `dlb_fopen` then `buf[0] = '\0'`. On success, one `dlb_fgets` skips the "don't edit" comment, `dlb_fseek`/`dlb_ftell` set `starttxt`, `get_rnd_line` (`:419–494`) draws with `endpos` 0, then `dlb_fclose`. On failure, `couldnt_open_file`. `get_rnd_line` seeks with `rng((int) filechunksize)` up to ten times, accepts a rest whose `strlen` is at most `padlength + 1` (newline counted), and after the loop always `fgets` the next line, wrapping to `startpos` when `ftell >= endpos` or that `fgets` fails. Newline strip, `xcrypt`, then `unpadline` only when `padlength` is non-zero.
**JS:** `js/rumors.js` `unpadline` `:51`. `embed_fgets` `:66`. `get_rnd_line` `:87`. Seek loop `:95–103`. Post-loop read `:105–112`. `rnd_text_embed` `:128`. `get_rnd_text` `:137`. Success `:140–145`. Failure `:147–148`. `couldnt_open_file` `:276`. `getrumor` call `:200`.
**Change:** One exported `get_rnd_text` keeps that C order on the Rule #2 embeds. `rnd_text_embed` is `dlb_fopen`. The extractor already consumed the comment, so `starttxt` is 0 and `endpos` 0 is EOF.
**Verify:** `node scripts/verify.mjs --fn get_rnd_text` → PASS syntax (3 changed js file(s): js/do_name.js js/engrave.js js/rumors.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed; pass --full to force) · VERIFY: PASS.
**Named:** No arm of the seek loop or the failed-file report is omitted. `dlb_fopen`, `dlb_fgets`, `dlb_fseek`, `dlb_ftell`, and `dlb_fclose` are the embeds (ledger by-design).
**Next:** `questpgr.c` `quest_info` (next Open — coverage row).

## 2026-09-27 — process take (human-authorised): port ledger

**Change:** per-function status moves to `docs/ledger/<file>.c.jsonl` (`docs/LEDGER.md`), seeded from DONE rows, full-range index citations, Stale lines and the Do-not set (415 ported, 223 partial, 305 by-design, 4385 unknown). The LOOP-QUEUE coverage block is generated (`ledger.mjs rows --write`); 159 Refill paragraphs and 231 Stale lines archived (232 kB → 26 kB). Handoff = D-entry `- **Ledger:**` bullet (finish applies it, fail-closed when `js/` changed); stale = `ledger.mjs set <fn> ported --note "stale: …"`. `c-js-map/*.md` frozen. Constitution §10.8/§10.15/§10.17, runbook §2/§4/§5, playbook, prompts, rules updated.
**Verify:** `node --test scripts/ledger.test.mjs scripts/port-did-park.test.mjs`; `ledger.mjs check`; `check-hot-docs.mjs`; `finish-iteration.mjs --dry-run`; green gate.
**Next:** measure token medians and stale rate after 10 loop iterations (baseline 3.1–3.6 M/iteration, 2 of 3 recent iterations parked stale rows).

## 2026-09-27 — D-2961 `remove_timer` unlinks the first matching timer

**C locus:** `nethack-c/upstream/src/timeout.c:2483–2502` `remove_timer`. The walk starts at `*base` with `prev` null. A hit is `func_index` then `arg.a_void` (`&&` does not read `a_void` on a miss). `prev->next = curr->next`, or `*base = curr->next` when the hit is the head. The node is returned with `next` still set. A miss returns null. No free, memset, or cleanup. Sole caller `stop_timer` (`:2305`) passes `&gt.timer_base`.
**JS:** `js/mkobj.js` `remove_timer` `:1235`. Match `:1240–1242`. Unlink `:1244–1246`. Return `:1249`. `timer_element_a_void` `:1210`. `timer_arg_a_void` `:1222`. `stop_timer` call `:1264`. Head write `:1265`.
**Change:** One file-local `remove_timer` keeps that C order. `a_void` is the object, the monster, or the packed long (`obj_to_any` is the object). `stop_timer` passes `{ head }` and writes the head back.
**Verify:** `node scripts/verify.mjs --fn remove_timer` → PASS syntax (1 changed js file: js/mkobj.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.3s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed; pass --full to force) · VERIFY: PASS.
**Named:** No arm of the match or the unlink is omitted. `stop_timer` returns 0 for a falsy arg, so a packed long of 0 never reaches `remove_timer`.
**Next:** `display.c` `set_corn` (next Open — coverage row). Six coverage rows remain after the two Stale parks and this archive, below the floor of 8. `--rows 500` head is the never-re-pop Stale set (not pasted). Save/restore/files, sanity, and `hops —` were not pasted. Three later gameplay rows are appended (`quest_info`, `unmakemon`, `e_jumps`). Queue is 9.

## 2026-09-27 — D-2960 `Shirt_off` clears the takeoff bit, then the shirt

**C locus:** `nethack-c/upstream/src/do_wear.c:778–794` `Shirt_off`. `takeoff.mask &= ~W_ARMU` is first. Hawaiian shirt and T-shirt break. The default calls `impossible("Unknown type of %s (%d)", "shirt", otyp)`. Then `setworn(NULL, W_ARMU)`.
**JS:** `js/do_wear.js` `Shirt_off` `:1158`. Mask `:1161`. Switch `:1169`. `setworn` `:1178`. Awaited from `armoroff` `:1893`, `do_takeoff` `:2369`, `wornarm_destroyed` `:4027`, and `js/steal.js:323`. Delay arm assigns `afternmv` at `:1876`.
**Change:** One exported `Shirt_off` keeps that C order. The previous body only called `clear_worn`.
**Verify:** `node scripts/verify.mjs --fn Shirt_off` → PASS syntax (2 changed js file(s): js/do_wear.js js/steal.js) · PASS rule2 · note hidden (no corpus session blocked on it at baseline; the queue row cited 0 blocks) · PASS reach (no RNG-tagged reach; fixed smoke spread 12 run, 3.2s: 12 PASS, 0 regressed → REACH-OK) · PASS green 2/2 · PASS strict ×2 · PASS cohort 7/7 · skip full (no shared file changed; pass --full to force) · VERIFY: PASS.
**Named:** No arm of the switch is omitted. A null `uarmu` returns 0 after the mask clear and skips `setworn`; C would dereference.
**Next:** `getpos.c` `getpos_toggle_hilite_state` (next Open — coverage row). Nine coverage rows remain after this archive, above the floor of 8, so nothing was refilled.

## 2026-09-27 — Audit 1910–1918 accepts D-2951…D-2959

Nine JS commits since `1a25073d1`, oldest first. All **ACCEPT**: `hliquid` timeout gate, `tty_putstr` `WIN_NOSTOP` clear plus the two message bits, `add_mon_to_reg`, `redist_attr`, `is_flammable`, `mon_animal_list`, `tmiss`, `yname`, `In_W_tower`. No Must-fix. Public `sessions` on `1021345f2`: 44/44, screens 11,405/11,405, RNG 792,838/792,838, speed `251+1.55/turn` (R² 0.765). Held-out still 12/44. Private corpus 12/12 (the 614/940 set is still absent). Next remains `Shirt_off`.
