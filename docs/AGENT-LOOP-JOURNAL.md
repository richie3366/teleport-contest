# Agent loop journal

Append-only crumbs for `scripts/agent-port-loop.sh` iterations.
Each agent process should add a short dated entry **at the top** (after
this header) before exiting. Keep entries tight; detailed hypothesis
lives in `NOTES.md` / `CURRENT.md`.
The next agent reads **only this file** (latest ~10 entries), not the
archive under `docs/archive/`. Do not copy crumbs by hand. Overflow is
`node scripts/rotate-journal.mjs` (or `check-hot-docs.mjs --fix`).
## 2026-10-01 — D-3214 `uhitm.c` ×5: blnd vision_clears, were uhitm row, slow defended ×3, samu/pet stale splits

**C locus:** - `mhitm_ad_blnd`: `nethack-c/upstream/src/uhitm.c:2958–3012` whole — the gap was only the mhitu `:2982–2983` `Your1(vision_clears)` arm (uhitm+mhitm arms live in `mhitm.js:850`).
**JS:** `js/mhitu.js:85` (`defended` import), `:764–774` (`mhitm_ad_blnd_u` arm), `:2734–2741` (`mhitm_ad_slow_u` gate); `js/mhitm.js:1374–1383` (`mhitm_ad_slow` gate); `js/uhitm.js:68` (`AD_WERE` import), `:2505–2515` (`damageum_ad_slow` gate), `:2960–2967` (AD_WERE row).
**Change:** fill the blnd stub with the established 8-site `pline('Your vision clears.')` idiom (`Your1` is the `Your("%s",·)` macro, `hack.h:1027`; `vision_clears` the `decl.h:40` common string); add the AD_WERE row routing to same-file `damageum_ad_phys` like the AD_PHYS row (C's `if done return` is end-of-function dead; the mhitm.js phys local is the mhitm arm — D-3211); wire live `defended(·, AD_SLOW)` after `negated` in all three slow homes (cold D-3211 precedent; mhitu passes `game.youmonst` before `hitmsg`); `defended` joins mhitu.js's existing mondata edge, `AD_WERE` uhitm.js's existing mhitm edge (both `--can` ALREADY, names only).
**Verify:** `node scripts/verify.mjs --fn mhitm_ad_blnd,mhitm_ad_were,mhitm_ad_slow,mhitm_ad_samu,hmon_hitmon_pet` → PASS syntax (3 files) · PASS rule2 · hidden none-blocked ×5 · green 2/2 · strict ×2 · cohort 7/7 · full skipped (no shared file) · VERIFY: PASS; plus full `sessions` 44/44 (RNG 792,838/792,838 scr-equivalent, speed `327+1.63/turn`).
**Named:** - `mhitm_ad_blnd`: none — all three arms live; `Your1`/`vision_clears` are a macro + common string (no JS symbols needed).
**Next:** uhitm.c remainder Open is campaign-scale (hmonas 284, drin 133, adtyping 39-case dispatch verification) or partials blocked on other functions' named gaps (nohandglow/stck/drst/dren/conf/pest/deth/ston omits name hit()/stagger/golemeffects); queue head moves to Gloves_off.
## 2026-10-01 — D-3213 `pickup.c` ×2: doloot_core single-walk cache, able_to_loot reachability arms

**C locus:** - `doloot_core`: `nethack-c/upstream/src/pickup.c:2178–2346` whole (check_capacity; nohands; Confusion rn2(6)&&reverse_loot / rn2(2); menu_requested goto lootmon; lootcont count/able_to_loot/blind-cockatrice/PICK_ANY multi/single walk/grave; lootmon direction/underfoot/dz/m_at/loot_mon/Confusion||Stunned/!looted_mon arms).
**JS:** `js/pickup.js:45` (import), `:4334–4378` (`loot_floor_containers` walk cache), `:4731–4769` (`able_to_loot`).
**Change:** cache `nobj` before `do_loot_cont` in the single walk; restart `able_to_loot` in C order wiring the live `rider_cant_reach` (steed.js), `cant_reach_floor` (engrave.js, added to the existing static edge — `--can` ALREADY), and static `nolimbs` (monsters.js, already imported) exports; pool arm is now `(looting || !u.uinwater)` per C (Underwater ≡ u.uinwater).
**Verify:** `node scripts/verify.mjs --fn doloot_core,able_to_loot` → PASS syntax (1 file) · PASS rule2 · hidden none-blocked ×2 · reach REACH-OK ×2 (fixed smoke spread 24/24 PASS each) · green 2/2 · strict ×2 · cohort 7/7 · full skipped (no shared file) · VERIFY: PASS.
**Named:** - `doloot_core`: none in the body — PICK_ANY extras (invert/pages/>26 accelerators) are `select_menu` menu-machinery (by-design, same standing as D-3199).
**Next:** callee closure holds no more Open rows (`check_capacity` body whole, no change; `mon_beside`/`get_adjacent_loc`/`ceiling` declared ported; pline-family THIN is hot display machinery, out of scope); same-file `pickup.c` remainder measures ok.
## 2026-10-01 — D-3212 `zap.c` ×2: resist clone dlev+TELL completion, do_osshock stale hoist

**C locus:** - `resist`: `nethack-c/upstream/src/zap.c:6099–6158` whole (mplayer Conflict early return; WAND12/TOOL10/WEAPON10/SCROLL9/POTION6/RING5/ulevel alev; dlev clamp + mplayer-ulevel; `rn2(100+alev-dlev) < mr`; TELL `shieldeff_mon` + halve; HP apply + `m_using`?`monkilled(AD_RBRE)`:`killed`).
**JS:** `js/music.js:167` (arm), `js/pray.js:2852` (arm) + `:2896–2900` (shield), `js/mhitm.js:582` (arm) + `:634–636` (shield), `js/zap.js:3850` (`shieldeff_mon` export) + `:5012` (`do_osshock` top-level).
**Change:** mplayer dlev arm in all 3 clones (`is_mplayer` via existing monsters.js edges — mhitm already imported it); TELL `shieldeff_mon` at both async TELL sites (export from zap.js — body verified exact vs `mon.c:6056–6064` — via existing zap.js edges in pray/mhitm; names on existing edges only, both hoisted functions, so no new cycle/TDZ — `--can` skipped); hoist `do_osshock` to top level (byte-identical body, zero closure vars — pure visibility move so sym/ledger/measure resolve it).
**Verify:** `node scripts/verify.mjs --fn resist,do_osshock` → PASS syntax (4 files) · PASS rule2 · hidden none-blocked ×2 · green 2/2 · strict ×2 · cohort 7/7 · full skipped (no shared file) · VERIFY: PASS.
**Named:** - `resist`: caller-side only — mbhitm STRIKING vs-monster arm (`muse.c:1632–1644`: resists_magm/Boing/hit/resist/miss all absent from the `js/muse.js:827` RNG stub; owns its row); potionhit confusion/blindness/acid arms (`potion.c:1780/1824/1871`; `js/potion.js:28` D-1472). Body whole in all five JS incarnations (canonical + 4 sync clones).
**Next:** next Open — coverage row (`weapon.c` possibly_unwield PARTIAL); bhitpile restack+fill_pit rides its own ledger row.
## 2026-10-01 — D-3211 `uhitm.c` ×4: mhitm_ad_cold defended+seesu, hmon anger_guards tail, mhitm_ad_stun uhitm arm, mhitm_ad_slee defended/shieldeff

**C locus:** - `mhitm_ad_cold`: `uhitm.c:2626–2681` whole (uhitm `:2633–2652`, mhitu `:2654–2663`, mhitm `:2665–2680`).
**JS:** `js/uhitm.js` (cold disjunct, hmon tail, stun arm + dispatch, 3 import names), `js/mhitu.js` (cold seesu pair), `js/mhitm.js` (`stagger` export, async `sleep_slee_mm` + awaits).
**Change:** wire the live exports in C order — `defended(mdef, AD_COLD)` disjunct (`uhitm.c:2641`); `monstseesu(M_SEEN_COLD)` / `monstunseesu` else-branch (`:2660` / `:2663`); pre-`hmon_hitmon` anger snapshot + `angry_guards(!!Deaf)` tail (house inline Deaf disjunct); new `damageum_ad_stun` (`Blind_that` stagger pline via the now-exported mhitm.js `stagger` + house `makeplural`, `mstun=1`, sync `damageum_ad_phys` — the mhitm.js phys local is the mhitm arm) + AD_STUN dispatch; `sleep_slee_mm` async with `defended(AD_SLEE)` + `shieldeff` + 0 (`mhitm.c:1232–1234`), 3 call sites awaited. No new module edges (`imports.mjs --can` ALREADY ×2; names added to existing uhitm→mon/monsters/mhitm edges).
**Verify:** `node scripts/verify.mjs --fn mhitm_ad_cold,hmon,mhitm_ad_stun,mhitm_ad_slee` → PASS syntax (3 files) · PASS rule2 · hidden none-blocked ×4 · green 2/2 · strict ×2 · cohort 7/7 · full skipped (no shared file) · VERIFY: PASS.
**Named:** - `mhitm_ad_cold`: none — all three arms whole, every callee live.
**Next:** next Open — coverage row (`zap.c` resist PARTIAL).
## 2026-10-01 — D-3210 `hacklib.c` s_suffix suffixed-clone completion (review 2160: drop `|| endsWith('S')` ×4 + zap 4-arm rewrite)

**C locus:** `nethack-c/upstream/src/hacklib.c:344–359` whole — Strcpy + strcmpi it→+s / you→+r / trailing-'s'→+' / else→+'s, in order (static-buf aliasing needs no JS counterpart — fresh strings are safe).
**JS:** `js/eat.js:3392–3400`, `js/mhitm.js:5814–5822`, `js/dothrow.js:872–880`, `js/potion.js:3010–3018`, `js/zap.js:2688–2696` (sole edits; 5 files) + `scripts/s_suffix_clones.test.mjs` (new).
**Change:** the 4 one-line clones drop the `|| endsWith('S')` disjunct (comment now cites the lowercase-only C predicate); zap restarted as the C-exact 4-arm body (toLowerCase strcmpi it/you; lowercase-`endsWith('s')` only; `String(s ?? '')` input), deleting the falsy passthrough and the z/x/ch/sh arm. Fix in place, zero new module edges (D-3200 precedent); every caller keeps its callee; behavior changes only where JS≠C, so baseline-PASS sessions cannot newly diverge.
**Verify:** `node scripts/verify.mjs --fn s_suffix` → VERIFY: PASS (ran after the last js/ edit). Tail pasted verbatim:
**Named:** - `s_suffix`: none in the body — all 11 homes now C-exact (D-3200's caller-level omits files.c:3215 SYSCF / nhlua.c:888 / insight.c:1137 stand unchanged).
**Next:** breadth queue continues (Must-fix row leaves via archive; s_suffix split now covers all 11 homes).
## 2026-10-01 — D-3209 `mon.c` iter_mons splice-safety (review 2162 savebones removal-skip)

**C locus:** - `iter_mons`: `nethack-c/upstream/src/mon.c:4526–4538` whole — `for (mtmp = fmon; mtmp; mtmp = mtmp2)` with `mtmp2 = mtmp->nmon` cached before the DEADMONSTER/mon_offmap skip and the `(*vfunc)(mtmp)` call.
**JS:** `js/mon.js:2968–2980`; 1 js file.
**Change:** walk `[...(game.fmon || [])]` — the snapshot is C's mtmp2 chain (C-created mons prepend to fmon and are likewise unvisited mid-walk, so the snapshot matches C for both removal and insertion); DEADMONSTER (`mhp < 1`) + `mon_offmap` checks stay at visit time against live refs. JSDoc corrected to cite the unlink hazard and the snapshot. No new module edges; export name/signature unchanged.
**Verify:** `node scripts/verify.mjs --fn iter_mons` → VERIFY: PASS (ran after the last js/ edit). Tail pasted verbatim:
**Named:** - `iter_mons`: none — whole 13-line C body live.
**Next:** next Must-fix row (`s_suffix` suffixed clones, review 2160).
## 2026-10-01 — D-3208 `attrib.c` from_what negative INVIS + CLAIRVOYANT arms (review 2165 finding 2)

**C locus:** - `from_what`: `nethack-c/upstream/src/attrib.c:986–995` whole — `case INVIS: if (uprops[INVIS].blocked & W_ARMC) Sprintf(buf, because_of, ysimple_name(uarmc))` (mummy wrapping); `case CLAIRVOYANT: if (wizard && (uprops[CLAIRVOYANT].blocked & W_ARMH)) Sprintf(buf, because_of, ysimple_name(uarmh))` (cornuthaum). BLINDED arm (`:979–983`) untouched.
**JS:** `js/attrib.js:1225–1254` (negative block), imports `:37–38,44–45`; 1 js file.
**Change:** the two `if` arms in C switch order after the BLINDED arm. Blocked masks read the JS dual store (flat `BInvis`/`BClairvoyant` mirror OR `uprops[].blocked` — `apply_w_blocks` in `js/do_wear.js:620–637` writes both, and every live reader in `js/do_wear.js:869`/`js/invent.js:6687/6755` ORs them); the tested slot bit (`W_ARMC`/`W_ARMH`) and the `ysimple_name(uarmc/uarmh)` suffix are C-exact, as is the inner `wizard &&` on CLAIRVOYANT (vacuous under the outer wizard gate, ported as written). No new module edges — `INVIS`/`CLAIRVOYANT`/`W_ARMC`/`W_ARMH` join the existing static `./const.js` import; `ysimple_name` already imported.
**Verify:** `node scripts/verify.mjs --fn from_what` → VERIFY: PASS (ran after the last js/ edit). Tail pasted verbatim:
**Named:** - `from_what`: none added — birth blind/deaf + Blindfolded_only/cream stay named in the JSDoc (pre-existing, positive-propidx arms outside this Must-fix).
**Next:** next Must-fix row (`savebones` removal-skip via `iter_mons`, review 2162).
## 2026-10-01 — D-3207 `insight.c` enlightenment() pray else-arm (review 2165 finding 1)

**C locus:** - `attributes_enlightenment`: `nethack-c/upstream/src/insight.c:1937–1955` else-arm whole — `if (!final)` suppression (death can change can_pray(); C comment), `can_pray(FALSE)` → "[not ]safely pray", wizard `ublesscnt` suffix, `you_can(buf, "")`; the `#if 0` "could have safely prayed" wording stays unported (compiled out).
**JS:** `js/invent.js:7208–7232` (god-anger block + pray else); 1 js file.
**Change:** `else { if (!final) { … } }` in C nesting: inline `await import('./pray.js')` (reuses the live invent→pray edge from `:7539`, no new module edge), `can_pray(false)` → "[not ]safely pray", wizard `ublesscnt` suffix, `enlght_line_txt(You_, 'can ', …)` (verb fixed — the gate pins present tense, matching the overlay). Dead on this builder today (`enlightenment()` routes !final to `doattributes()` at `:6335–6340`, so `final` is always truthy below) — ported as written for the whole-body claim; zero behavior change. Potion/zap in-progress path (`js/potion.js:1998`, `js/zap.js:2787` ← C potion.c:710/zap.c:2529) already shows the line via the overlay builder.
**Verify:** `node scripts/verify.mjs --fn attributes_enlightenment` → VERIFY: PASS (ran after the last js/ edit). Tail pasted verbatim:
**Named:** - `attributes_enlightenment`: none added — the `#if 0` pray wording is compiled out of C (pre-existing, same as D-3205).
**Next:** next Must-fix row (`from_what` negative INVIS + CLAIRVOYANT, review 2165 finding 2).
## 2026-10-01 — Audit 2158–2166 (9 SHAs D-3198–D-3206; 5 ACCEPT / 1 DEBT / 3 QUALITY-RISK; 4 Must-fix)

**Reviews:** 2158 checkfile/findtravelpath ACCEPT; 2159 pickup/use_container ACCEPT; 2160 s_suffix QUALITY-RISK (5 suffixed clones keep the S-arm, zap the full old shape — ledger split closed early); 2161 accessory_or_armor_on ACCEPT; 2162 savebones QUALITY-RISK (snapshot loop → live `iter_mons` drops splice-safety; mongone skip); 2163 roguename ACCEPT (reach 21/21); 2164 com_pager_core ACCEPT (PROGRESS, scen-quest-Arch-94096 → dog_goal same step); 2165 enlightenment QUALITY-RISK (pray else-arm overlay-only, reachable via potion/zap final=0; from_what negative INVIS/CLAIRVOYANT stubbed); 2166 mkshop ACCEPT-WITH-DEBT (SHOPTYPE="" corner: C general-store + :173 truthy vs JS random + falsy; wizard+empty-env only, fix in review).
**Must-fix (first-unchecked order):** attributes pray else-arm (2165), from_what negatives (2165), iter_mons removal-skip (2162), s_suffix clones (2160). Next cluster set to pray.
**Gates:** sessions 44/44 (RNG 792,838/792,838, Scr 11,405/11,405, 333+1.62 R² 0.77); fortress 665/953 (+11, 0 lost, full:true 09:30Z); held-out 13/44, 7,019 pts (+136), screens 62.3 %. Hot sum ok after trim; ledger snapshot + 5 seeded samples clean (sql/brief subcommands unavailable — node:sqlite missing — sampled via jsonl + show).
## 2026-10-01 — D-3206 `mkroom.c` mkshop SHOPTYPE dispatch live (retires the D-2569 Rule #2 omit)

**C locus:** - `mkshop`: `nethack-c/upstream/src/mkroom.c:95–216` whole — this iteration ports the `:101–155` wizard SHOPTYPE block (endpoint `:103`, single-char dispatch `:104–153`: 8 mkzoo arms, mktemple on `_`, mkswamp on `}`, shtypes def_oc_syms match → gottype, g/G general, v/V veggy food, else i=-1); gottype walk, light loop, rnd(100) pick, rtype/topologize/needfill shipped D-2569, untouched.
**JS:** `js/mklev.js:28559` `mkshop` (doc `:28540–28558`, SHOPTYPE block `:28565–28601`); `nh_getenv` import `:105` (new edge — `imports.mjs --can mklev.js mail.js nh_getenv` VERDICT SAFE, hoisted function); `def_oc_syms` joins the existing objects.js import `:96–103` (no new edge); `:173` doorct comment updated (wizard&&ep arm now live when SHOPTYPE set). Map: `docs/c-js-map/data.md` SHOPTYPE omits retired (fqname precedent note, Izchak line, pick_room line).
**Change:** `ep` is now the live `nh_getenv('SHOPTYPE')` call under the existing `wizard` gate; the ten single-char arms ported in C order with C's early returns (incl. `t`/`T`/`\` → COURT); the shtypes symb loop reads `def_oc_syms[symb].sym` with a `matched` flag for C's `goto gottype` (skips the g/v arms); g/G → 0, v/V → FODDERSHOP−SHOPBASE, else −1. Empty-string env yields `undefined`, matching nothing like C `'\0'`.
**Verify:** - `mkshop`: `node scripts/verify.mjs --fn mkshop` → PASS (syntax 1 file js/mklev.js; rule2; hidden note no session blocked; reach 58 baseline-PASS reach, 58 run, 68.9s, 58 PASS, 0 regressed → REACH-OK; green 2/2; strict ×2; cohort 7/7; full 44/44 auto on shared-file change).
**Named:** - `mkshop`: none — every arm live, every callee live (`nh_getenv` mail.js, `mkzoo`/`mktemple`/`mkswamp` file-locals, `def_oc_syms` objects.js).
**Next:** next Open — coverage row (`uhitm.c` mhitm_ad_cold head once this ships).
## 2026-10-01 — D-3205 `insight.c` status_enlightenment + attributes_enlightenment + enlght_combatinc whole (split-completion cluster)

**C locus:** - `status_enlightenment`: `nethack-c/upstream/src/insight.c:940–1266` whole — Riding/steedname hoist `:946–956`, Riding+youtoo `:975–980`, Lev/Fly `:982–988`, Underwater `:989–1000`, Punished dead-impossible `:1081–1084`, saddle `:1132–1140`, Wounded_legs bp+steed `:1141–1171`, Glib `:1172–1176`, tux `:1252–1258`, nudist `:1260–1263` (Stoned→Deaf, utrap, held, Fumbling→encumbrance pre-existing).
**JS:** `js/invent.js` +928/−86 (16 const imports; enlght_combatinc; status_core_lines arms; both builders' attributes arms); 1 js file, under the 1500/15 caps.
**Change:** `js/invent.js` only, no new module edges (16 consts join the existing static `./const.js` import; per-arm dynamic imports reuse live edges — `imports.mjs --can` SAFE ×3 for the worn/dungeon/potion edges). New local `enlght_combatinc` (C order, string return — callers hold no BUFSZ). status_core_lines: Riding/steedname/youtoo hoisted to C position; Riding line, Levitation (canonical mhitu.js macros + youprop.h Lev_at_will bit-exact) / Flying with youtoo, Underwater→uinwater(dead in C too)→walking_on_water chain; Punished dead-impossible; saddle via live which_armor/s_suffix/simpleonames; Wounded_legs via body_part/mbodypart/makeplural + wizard-steed arm; Glib intrinsic-only + fingers_or_gloves. Both builders: hofe titles, Warn obj/polyd/species + Undead_warning, Clairvoyant + blocked strsubst arm, Detect_monsters + umconf, Adornment, blocked-Stealth + Aggravate + Conflict, Teleportation (^X), BLev/BFly (dual-store save/clear/restore), clinger, Slow_digestion, uhitinc (+tux interplay) + udaminc + spellprot via enlght_combatinc, Half-gas, lays_eggs, were-form (^X), Free_action + Fixed_abil (extrinsic-only), fruit (files.c debugcore element match on sysopt.debugfiles), umortality case-0 impossible (final); C-wrong fixes: overlay pray gated under !ugangr (C else arm), final nudist arm, overlay N_times import (replaces the inline clone).
**Verify:** `node scripts/verify.mjs --fn status_enlightenment,attributes_enlightenment,enlght_combatinc` → VERIFY: PASS (ran after the last js/ edit). Tail pasted verbatim:
**Named:** - `status_enlightenment`: none — every arm live, including the three dead-in-C arms.
**Next:** next Open — coverage row (insight.c enlightenment pair exhausted; overlay misc bones `encountered N` arm belongs to a future C enlightenment() row, not these functions).
## 2026-10-01 — D-3204 `questpgr.c` com_pager_core guardtalk role arrays (blocked quest session unblocked)

**C locus:** - `com_pager_core`: `nethack-c/upstream/src/questpgr.c:468–621` whole (body unchanged this iteration) + `dat/quest.lua` guardtalk_after/guardtalk_before string arrays × 13 filecodes (Arc anchor `:290–302`, two 5-string arrays; every role verified array-shaped with ≥2 strings by the extractor).
**JS:** `js/generated/quest_guardtalk.js:1–193` (new) + `js/questpgr.js:27,624–629,1108` + `js/quest.js:554–560`; +72/−19 tracked per `git diff --stat` plus the 193-line generated file.
**Change:** `scripts/extract-quest-nemesis.py` generalized (ARRAY_KEYS incl. the guardtalk pair, GUARD_KEYS extraction, Arc Lash-LaRue anchor asserts) writing new `js/generated/quest_guardtalk.js` (QUEST_GUARDTALK, 13 roles × 2 arrays; the nemesis output regenerates byte-identical). `js/questpgr.js:27` imports it, `:624–629` adds both QUEST_ROLE_TEXT keys so the first filecode lookup hits (one shuffle + rn2(nelems) pick, C order); doc omit updated. `js/quest.js:554–560` comment corrected.
**Verify:** `node scripts/verify.mjs --fn com_pager_core` → VERIFY: PASS. Tail pasted verbatim:
**Named:** - `com_pager_core`: impossible() text on all miss arms (pre-existing — embedded tables cannot fail to load, and a JS miss covers unported role bodies where C shows text); other unextracted role bodies still miss (hasamulet, posthanks, leader_next, leader_last, gotit, encourage, badlevel — same double-shuffle shape when a live caller hits them, future extraction rows); lua VM init/load/teardown (by-design, no VM); TEST_PATTERN (lua self-test only); convert_arg catalogue D-1649 / pronoun D-1634 shipped, untouched.
**Next:** next Open — coverage row (questpgr.c exhausted).
## 2026-10-01 — D-3203 `do_name.c` roguename ROGUEOPTS arm + mon_nam_too/docallcmd stale (3-function cluster)

**C locus:** - `roguename`: `nethack-c/upstream/src/do_name.c:1424–1439` whole — ROGUEOPTS `name=` scan with `,` truncation `:1428–1437`, rn2 fallback `:1438–1439`.
**JS:** `js/do_name.js:622–642` (roguename + mail.js import) + `js/mail.js:482–496` (nh_getenv export + gate + BUFSZ import); +26/−7 js/ per `git diff --stat`.
**Change:** roguename restarted in C order keeping name/signature: live `nh_getenv('ROGUEOPTS')` import from mail.js (no clone #2), per-position `startsWith('name=', i)` scan (= C `strncmp` loop), first-`,` slice (= C NUL-truncate), then the unchanged rn2 fallback. mail.js nh_getenv exported with the C `strlen <= BUFSZ/2` gate (`options.c:6847–6856`). New do_name→mail edge is call-time-lazy inside the existing 102-module SCC (imports.mjs --can CHECK: hoisted function declaration, no top-level read — probe + green confirm load).
**Verify:** `node scripts/verify.mjs --fn roguename,mon_nam_too,docallcmd` → VERIFY: PASS. Tail pasted verbatim:
**Named:** - `roguename`: none in the body — C's NUL-write into the env string has no later reader, so the slice is the same prefix.
**Next:** next Open — coverage row (do_name.c exhausted).
