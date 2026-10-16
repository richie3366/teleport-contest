# Working notes (scratchpad)

Not a progress log. Caps: `node scripts/check-hot-docs.mjs` (do not count).

## Active

Parks: `LOOP-QUEUE.md` **Parked**. Live hypotheses only:

- **Capture is truth (D-3963, human 2026-10-14):** fountain-customcolor park (D-3946) void — measured on temp-hook recordings; canonically those ⌠ cells are uncaptured. TEXT col-0 fixed (D-3977 linestart g_putch hook); « ogged »/« altar » unattributed (recall TEXT vs live topline). Never re-record with a modified recorder.
- **Calibration (§10.20):** new family ≤ 60 % on arrival = held-out
  shape; ≥ 85 % = not. Start regime falsified 2026-10-13 (68/68 probe;
  misses = recorder banner artifact).
- **Priest-582706 s1166 flake:** re-record aborts yet reads PASS even pre-D-3930 — not a port fix (see nhl_gamestate).

- **obj_resists (D-2407/2413-15):** steal.c relobj+flooreffects+Knight/Arch/Healer arms; fire-trap/fmon/polyuse/monstone/bury/steal falsified.

- **Eval-order TDZ (D-2349):** no static polyself edge at eval; late-bind setters.
- **Fortress guards** (do not reopen): display_inventory, stock_room engraving, inside_shop clone, level_tele, priestname, Rogue S_ndoor, bigrm-2, getpos, summonmu, lookat, do_statusline1, snapshot, fakewiz, Ice/Boulder, roles[], pickup_checks, doloot_core, themerms, look_here, Bar-goal, castmu, medusa/soko/Wiz, Knight/Rogue lua.
- **distfleeck (D-2420):** dog-pair PASS via phone digits (D-3990); Monk→getpos@307; ghoul/couatl/zapfest-miss writers remain.
- **Shipped writers (do not re-pop):** chwepon (D-3640); read_engr_at (D-3671); magic_map_background (D-3682); gulpmu (D-3863); mbodypart/m_move/mfndpos/searches (D-3906); phone digits (D-3990).
- **nhl_gamestate (D-3885 UNPORTABLE):** Priest-582706 s1166 steed-impossible needs C malloc reuse; recorder flaky there (ASLR). Never a port row (D-3895/D-3905).
- **welcome/Enhanced-blank (D-3944 MEASURED):** C emits 56 UTF-8 glyphs @50059006 s0, nomux records 0 hi-bytes — writer = g_pututf8 hook (contest tooling). JS arm ID'd, moveless until re-record — do not port/replicate.
- **do_screen_description travel (D-3962 FIXED):** flush-timing + never-arrived refuted (temp-C); shipped C0 raw-store + grid-drop + pile-inverse gate — 5/5 moved. Do not re-chase flush/pathing writers.
- **D-3998 class (audit 2837–2843):** `do_loot_cont` bag arm + `doeat_nonfood` poison arm return early on survived-fatal, skipping post-done C (`makeknown`+`abort_looting` :2157-2158, `eatspecial` :2811) — both ledger partial with omits; ship via the generated block, not a hand row.

## Don't re-check (≤15)

- D-1790…D-4008 stand except Must-fix reviews 2145/2149; reviews 2132 and 2136 closed by D-3182/D-3181. Scars: m_seenres boolean, never !== 0; no 2nd genus/accessible/confdir/locomotion/unconscious/free_mgivenname/is_axe/carrying/end_running.
- Full scores need unfiltered `score`. Underwater-idiom sweep (D-3721…) reached no session — no pole-lava row.
- D-1795/D-1816 stand. Scars: sleep rn2(10); no 2nd m_monnam/simple_typename; seed4500 [2]: keep flush_screen(1).
- No stay rebuild / u.Punished / ordinary-pit-farlook rn2(20).
- seed0014 I-glyph/findone-tail (D-1774/1775); H2344/offx 72, g≠Unknown, PREFIXCMD (D-1185/1186/1582).
  ParanoidTrap/domagicportal/undestroyable_trap/mktrap dst/goto_level uz0 D-1187/1188; no rhack raw-ETX (D-1189); never FORCE TRC (76,14)/(77,14) (D-1849).
- No D-0480 tty_map_color re-apply (D-0483); no skipped spaces/space runs >4 (D-0931); no FORCE shk satdoor/onlineu (D-0376), linedup/FlipX (#1092), _pending_message restore (D-0929), HEAVY_IRON_BALL owt!=0 (#1194). Judge keeps RC (D-0933); §1.2 frozen; no public-LB chase.
- No memcpy gi worn/ball (D-1035) / setnotworn←owornmask (D-1020) / delobj tut loot / off-level timers (D-1037) / dropped msounds[] (D-1053) / tut-1 keys (D-1065) / skipped tutorial() (D-1066). No skip D-1067…D-4008.
- No monmove→sit sticks import / confer_oc_oprop rewrite / emin delete / make_happy_shk stub (D-1540) / bones→options fruitadd (D-1541); no reset_glyphmap/notice_all_mons/savelev-freeing/lspo_reset_level; no wield/pickup→polyself body_part, static end←dog, makemon→hack/artifact/minion. No re-port D-1682…D-4008 outside queued reviews 2145/2149.
- D-2409/2410/2418/2419/2421/2422/2423/2424/2427/2428 stand (shipped writers: rloc, mail-daemon, glyph, BoH, mk_bubble, can_fog, m_move; falsified: mtrack, occupants — detail in D-logs).
- D-3733: C-crash sessions 95244@507 + 95230@278 (C SIGABRTs ledger_to_dnum(-1) same step/path as the JS throw) — do not re-port mlevel_tele_trap/migrate/ledger; tooling Next in D-3733.

## Landmarks (≤15)

<!-- landmarks:begin -->
- D-4008: js/trap.js feeltrap now calls the live map_trap(trap, 1) between tseen and newsym, in C order; map_trap added to the existing display.js import (impor Named: none — feeltrap is 3 C statements, all live; both callees live (map_trap js/display.js:238
- D-4007: js/dig.js only — Blind() takes the D-0716 house shape verbatim (uroleplay.blind birth gate + live H/E minus B; cf. shk.js/do_wear.js). Named: (1) other sticky-Blind readers — ball.js:273, detect.js:137, allmain/cmd/apply inline `u.B
- D-4006: js/display.js only — lastCol + lastRow extend past spaces with (attr & 0x7), mirroring the firstCol rule (D-0129); space-run CUF extended to trailing  Named: (1) mid-row inv/uline runs >4 stay literal — no session evidence C compresses them; (2) tr
- D-4005: kludge spiral calls the live `dirtocoord(cc, j)` in both loops (added to the existing const.js import — no new edge; removed the now-unused xdir/ydir  Named: none in this unit — the kludge arms are now C-exact (assigning spiral, both rings, stay fa
- D-4004: js/invent.js (+10/-1): capture `touched`, then `if (game.program_state?.gameover) return obj;` before the refuse/form-change arms (D-4001 idiom) — a f Named: none new — hold_another_object stays ported (guard only; standing doc omit perm_invent WIN
- D-4003: js/teleport.js only — in migrate_to_level, when tolev===-1 (reachable only via to-nowhere dst: every other caller passes ledger_no of a valid level ≥  Named: (1) hero domagicportal on a to-nowhere portal (teleport.js:2583 schedule_goto {-1,-1}): C 
- D-4002: js/timeout.js only — deleted the shadowing dynamic import (replaced with a 2-line NB comment citing the static invent.js:54 import); the :2591 call no Named: none new — hatch_egg stays ported (body untouched; standing doc omits SetVoice-before-Glee
- D-4001: js/mthrowu.js only — after the dobuzz try/finally, `if (game.program_state?.gameover) return M_ATTK_HIT;` before nomul(0) (C runs neither on the fatal Named: none new.
- D-4000: (1) drain idiom in the else arm (needs_done → finish_losehp_done + gameover return; else finish_maybe_wail), monstunseesu after on survival (C order;  Named: (1) Amulet_on hadMB guard kept: equivalent to C's unconditional restore whenever confer wr
- D-3999: the gate now reads the C-exact union `!!((u.HDeaf|0) || (u.EDeaf|0) || u.uroleplay?.deaf || u.Deaf)` (cuss shape, same file — no new edge); the doc om Named: none new — resurrect stays ported (whole-body audit vs C :715–780: fresh/migrating arms, W
- D-3998: after `finish_losehp_done()`, return 1 only when `gameover` is still set (real death via really_done); survived → fall through like C (no maybe_wail — Named: none new — eatcorpse stays ported (full-body audit vs C :1855–2018: conduct/rotted/tainted
- D-3997: js/cmd.js only. (1) Deleted the house `end_running` from `rhack_unknown_command` — C `:3833–3841` verbatim (retires D-3953 omission 1's run-stop claus Named: (1) the 7 unchanged sessions keep own causes under the same symptom owner (next iterations
- D-3996: none (measurement). Named: the fix itself (TBD by the measure); OSC class unportable (below); stale-T trio needs the 
- D-3995: `js/do_wear.js` only. (1) Blind() takes the D-0716 house shape verbatim (cf. shk.js Blind): uroleplay.blind birth-blind gate + live `((HBlinded||EBlin Named: none in-body (Blindf_off body already whole; this ships its Blind gate).
- D-3994: pray.js Antimagic() → D-1089 uprops shape; sit.js rndcurse You() not You_feel (9 PASS + 2 moved). Named: zap/spell/trap Antimagic clones + other You/You_feel swaps ship only with session evidence.
<!-- landmarks:end -->
