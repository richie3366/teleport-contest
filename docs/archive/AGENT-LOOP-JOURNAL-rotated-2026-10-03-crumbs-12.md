# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-03 — D-3380 `potion.c` dip_hands_ok + peffect_see_invisible reveal tail

**C locus:** - `dip_hands_ok`: nethack-c/upstream/src/potion.c:2229–2237 (!obj + Glib + can_reach_floor(FALSE) → GETOBJ_SUGGEST, else dip_ok). Sole C caller dodip :2279 (at_here ? dip_hands_ok : dip_ok); the NULL verdict is consumed by C getobj invent.c:1832 (SUGGEST lists `- ` in the prompt, DOWNPLAY accepts unlisted) and invent.c:1792 (cmdq HANDS_SYM).
**JS:** - `dip_hands_ok`: js/potion.js:2640 (doc :2634–2639).
**Change:** new `dip_hands_ok(obj)` in C order (Glib()/can_reach_floor already live in-file/imported; GETOBJ_SUGGEST on the const edge); getobj_dip selects `at_here ? dip_hands_ok : dip_ok` once (C :2279), takes the NULL verdict before the loop (C invent.c:1832), and renders the C `- ` prompt prefix (`-` alone when no letters, C :1835–1836/:1905); the `-` key comment now cites C :1955–1958 (allownone under SUGGEST or DOWNPLAY alike). peffect captures `msg` at the top (C :843, before make_blinded clears Blind) and runs the tail in C order (set_mimic_blocking joins the existing vision edge — `imports.mjs --can` ALREADY; see_monsters/newsym/You pre-imported; Invis/See_invisible/Blind local; potion_unkn module let).
**Verify:** - `dip_hands_ok`: hidden note (0 blocked at baseline — normal for coverage) · REACH-OK (no RNG-tagged reach; fixed smoke spread 24 run, 24 PASS, 0 regressed).
**Named:** - `dip_hands_ok`: none in-body — whole C body live. (Pre-existing getobj_dip gap, out of row scope: no cmdq path, so C invent.c:1790–1794 HANDS_SYM verdict has no JS site; cmdq_pop_getobj_key takes obj_ok generically.)
**Next:** potion.c holds no further Open rows; next cluster is the next queue row (different C file, ships as its own cluster).

## 2026-10-03 — D-3379 `attrib.c` poison_strdmg killer path (4-arg restart, 4 call sites wired)

**C locus:** - `poison_strdmg`: nethack-c/upstream/src/attrib.c:274–278 (losestr + losehp with the shared knam/k_format). C callers: eat.c:1932 (eatcorpse poisonous corpse/glob), eat.c:2798 (eataccessory opoisoned weapon, xname), fountain.c:307 (contaminated water, KILLED_BY), spell.c:164 (contact-poisoned spellbook).
**JS:** - `poison_strdmg`: js/eat.js:1389 (doc :1383–1388).
**Change:** restart as 4-arg canonical `await losestr(strloss, knam, k_format)` then `losehp(dmg, knam, k_format)` in C order; the losehp call is skipped once gameover is set (C losestr's frailty damage done(DIED)s = noreturn, so C never reaches the second call; JS losestr returns after finish_losehp_done instead). losestr joins the existing attrib edge (`imports.mjs --can` ALREADY, no new edge). All 4 sites pass C knam/k_format; the two eat.js sites adopt the neighboring acidic/cadaver-arm idiom (fatal → finish_losehp_done + return 1; else finish_maybe_wail); spell.js/fountain.js pass args only per file precedent (neither file handles _losehp_needs_done anywhere; the gameover-flag path carries death — seed0030 deaths green).
**Verify:** - `poison_strdmg`: hidden note (0 blocked at baseline — normal for coverage) · REACH-OK (no RNG-tagged reach; fixed smoke spread 24 run, 24 PASS, 0 regressed).
**Named:** - `poison_strdmg`: none remaining — ledger omits (knam/k_format killer params, Upolyd mh cut, losehp routing) now live. (Pre-existing, out of row scope: losestr/losehp keep their own ledger omits — rehumanize/showdamage in losehp.)
**Next:** attrib.c holds no further Open rows; refill appends same-file poisoned/is_innate missing-arm rows (brief-verified this iteration) as future clusters. Queue 5→7 — sources exhausted (coverage 0 rows; hidden-proxy queue 0 eligible as-is; parks name no confirmed writer).

## 2026-10-03 — D-3378 `apply.c` use_cream_pie COST_SPLAT tail + doapply BANANA arm

**C locus:** - `use_cream_pie`: nethack-c/upstream/src/apply.c:3568–3603, tail :3599–3602 (`costly_alteration(obj, COST_SPLAT)`; obj_extract_self; delobj; ECMD_OK). Sole C caller :4259 (doapply CREAM_PIE).
**JS:** - `use_cream_pie`: js/apply.js:1084 (doc :1078–1083; tail :1133–1137).
**Change:** tail now `await costly_alteration(pie, COST_SPLAT)` in C order after setnotworn (C :3598 comment cited verbatim; import pre-existing js/apply.js:102; COST_SPLAT=12 joins the const edge :34, ALTERATION_VERBS[12]='splatter' js/shk.js:1338); local freeinv_pie deleted, canonical obj_extract_self (pre-imported :74) in C position — INVENT arm + tail ≡ the clone (splice + nobj/nexthere null + where=FREE) plus C's pickup_prev=0; delobj/return unchanged. Non-unpaid invent pie: costly_alteration returns before any message/RNG (js/shk.js:2464-2465), so the common path is behavior-identical. BANANA arm js/apply.js:2789-2793: hallu → exact C string + ECMD_TIME; else falls through the if-chain default (is_pole/is_pick/is_axe all false for food → Sorry + ECMD_FAIL), matching C's FALLTHROUGH.
**Verify:** - `use_cream_pie`: hidden note (0 blocked at baseline — normal for coverage) · REACH-OK (no RNG-tagged reach; fixed smoke spread 24 run, 24 PASS, 0 regressed).
**Named:** - `use_cream_pie`: none remaining — ledger omit (COST_SPLAT tail) now live. (Pre-existing, out of row scope: can_blnd_cream_self subset, review debt 1563; splitobj-null stack edge in doc note.)
**Next:** apply.c holds no further Open rows; no follow-up (next queue row is a different C file, ships as its own cluster).

## 2026-10-03 — D-3377 `artifact.c` glow_color hcolor wrap (both C call sites)

**C locus:** - `glow_color`: nethack-c/upstream/src/artifact.c:2427–2433 (artilist[arti].acolor → clr2colorname → hcolor). C callers: artifact.c:2491 (Sting_effects) + objnam.c:1605 (doname W_WEP warn_obj glow). C hcolor: do_name.c:1460–1466 ((Hallucination || !pref) → display-rng hcolors[] else pref — JS do_name.js:347 matches exactly).
**JS:** - `glow_color`: js/artifact.js:891 (doc :885–890; inline twin js/objnam.js:2697).
**Change:** `return hcolor(clr2colorname(colornum))` in glow_color (hcolor already imported js/artifact.js:119 — no import change); doname_glow_color wraps the same canonical import (name added to the existing do_name edge js/objnam.js:64; `imports.mjs --can` ALREADY ×2, hoisted function, no new edge, no TDZ — no fifth hcolor clone). Non-Hallu is identity, so only Hallu Sting/doname-glow paths change (display stream, positionally untagged). Stale omit comments retired at both sites.
**Verify:** - `glow_color`: hidden note (0 blocked at baseline — normal for coverage) · REACH-OK (no RNG-tagged reach; fixed smoke spread 24 run, 24 PASS, 0 regressed).
**Named:** - `glow_color`: none remaining — ledger partial omit (missing hcolor wrap) now live at both call sites.
**Next:** artifact.c holds no further Open rows; no follow-up (next queue row is a different C file, ships as its own cluster).

## 2026-10-03 — D-3376 `mthrowu.c` m_throw misfire pline + dknown arms, breathwep_name Hallucination arm

**C locus:** - `m_throw`: nethack-c/upstream/src/mthrowu.c:619–620 (`!canseemon(mon)` → clear_dknown(singleobj)) + :622–631 (cursed/greased rn2(7) misfire: canseemon+verbose pline — is_ammo "misfires" else Tobjnam "slips as ... throws it" — then dx/dy rn2(3)-1 re-roll, (0,0) drops at launch). C callers: mthrowu.c:300 + :1055 + muse.c:2020.
**JS:** - `m_throw`: js/mthrowu.js:1153 (arms :1173–1190; doc :1146–1150).
**Change:** m_throw: `if (!canseemon(mon)) clear_dknown(singleobj)` after owornmask=0 (C `:619–620`; mkobj import extended, edge ALREADY); misfire block now renders the verbose canseemon pline before the re-roll (C `:622–631`; in-file canseemon/Tobjnam clones, Monnam+mon_nam already imported, is_ammo added to the wield import, edge ALREADY; RNG order unchanged — rn2(7) gate then plines then rn2(3)×2). breathwep_name: `if (game.u?.Hallucination) return rnd_hallublast()` (in-file export js/mthrowu.js:167; game.u?.Hallucination idiom per :1405), plain row kept with its index guard.
**Verify:** - `m_throw`: hidden note (0 blocked at baseline — normal for coverage) · REACH-OK (45 baseline-PASS sessions reach it, 45 run, 45 PASS, 0 regressed).
**Named:** - `m_throw`: none remaining — ledger D-2399 omits (misfire pline, clear_dknown) now live.
**Next:** mthrowu.c holds no further Open rows; no follow-up.

## 2026-10-03 — D-3375 `save.c` tricked_fileremoved whole port (vanished-file guard) + goto_level wiring

**C locus:** - `tricked_fileremoved`: nethack-c/upstream/src/save.c:336–347 — `!nhfp` (C `:339`): pline1(whynot) `:340` + pline "Probably someone removed it." `:341` + Strcpy svk.killer.name `:342` + done(TRICKED) `:343`, return TRUE `:344`; live handle returns FALSE `:346`. C callers: savestateinlock save.c:377 + goto_level do.c:1705.
**JS:** - `tricked_fileremoved`: js/save.js:530; wired site js/do.js:1994–2009.
**Change:** whole C body in C order at C-home js/save.js:530 — `export async function tricked_fileremoved(nhfp, whynot)`: pline1 renders as pline (js/apply.js:3152 precedent), killer write onto `game.killer` (end.js shape; object ensured like end.js:1118), `await done(TRICKED)` (save.js→end.js edge SAFE, `imports.mjs --can`; save.js→display.js ALREADY). Wired the do.c:1705 site in goto_level (js/do.js:1994–2009): errbuf `{ s }` holder through open_levelfile, TRUE branch renders C `:1706–1708` sys/share error() as pline + nh_terminate(EXIT_FAILURE) (earlyarg.js errorNoReturn precedent) + return — reached only in wizard mode, unreachable in JS since LFILE_EXISTS ⟹ openable. Updated the stale do.js comment + map data.md:113.
**Verify:** - `tricked_fileremoved`: hidden note (0 blocked at baseline — normal for coverage) · REACH-OK (no RNG-tagged reach; fixed smoke spread 24 run, 24 PASS, 0 regressed).
**Named:** - `tricked_fileremoved`: none in-body — whole C body live (pline1→pline rendering; error() belongs to the caller's :1707 site, rendered there, not to this body). C save.c:377 caller unwired (enclosing savestateinlock unported).
**Next:** same-file `free_dungeons` is FREE_ALL_MEMORY-only (declare by-design when the ledger sweep reaches it, no port); savestateinlock wiring ships with that function.
