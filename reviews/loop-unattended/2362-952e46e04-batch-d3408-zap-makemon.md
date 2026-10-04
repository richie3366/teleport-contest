# Review 2362 — 952e46e04 — batch D-3408 weapon/zap/wizcmds/makemon (100 fns)

- SHA: `952e46e04` (batch @c075fb861, D-3408). Files: js/zap.js (388),
  js/wizcmds.js, js/shk.js, js/weapon.js, js/makemon.js, js/dothrow.js,
  js/getline.js, js/display.js + 19 sweep/micro files; ledger cfgfiles/
  topten/weapon/zap/dothrow/coloratt/dungeon/calendar/wizcmds/makemon/
  mdlib/shk; scoreboard.json. No js/ edits here.
- Method: fixed sample — hot-12, random-4 (wiz_show_stats drawn twice →
  15 unique), audited-3 (omon_adj, m_initgrp, wiz_show_stats, all
  in-sample). True manifest from the commit's ledger diff: 100 `+`
  rows, SETS-IDENTICAL with live DB. Picker reproduction at base
  (worktree @c075fb861): MANIFEST-EXACT (100/100). Diff statuses:
  ported 76 · partial 4 · split 20 · open 0.
- Second-sample obligation (m_initgrp wrong-audited in-sample):
  discharged by FULL partial-population audit — all 4 partial rows +
  makemon/m_initgrp rows checked (beyond any 8-sample).

## Intent vs deliverable

Promise: "100 whole C functions (0 left open)"; zhitm full re-port +
~30 named arms; makemon PROGRESS (94045 + 94346 PASS, 94066 moved
past); "2 rows stay partial with named remainders"; "Named
remainders: …" (3 items).
Delivers: the CODE work is C-exact throughout (see Fidelity) and the
PROGRESS claims verify. The LEDGER work has 4 defects: (1) m_initgrp
row claims "whole vs C" while the message names its remainder
(group-member messages, unrecorded anywhere); (2) makemon row's omit
lists ONLY sanity callees while the message names 3 more remainders
(m_dowear fire-and-forget, group-member messages, dog starting-pet),
none with a row home (m_dowear + makedog rows untouched, ported);
(3) newmextra: partial + EMPTY omit + vacuous "cannot ship" note
(body whole → should be ported); (4) wiz_show_nhuuid: D-3142
paste-error omit ("wiz_telekinesis: none — whole body") re-certified
instead of replaced with the true omit (nhuuid value, documented in
the JS). "2 rows stay partial" is a miscount (4 are: makemon,
sanity_check, newmextra, wiz_show_nhuuid). Unlike D-3407 the
"Stale omits retired" flips ARE row-updated (verified: thitmonst,
breakobj both correctly flipped with live code).

## Inventory (sampled; full manifest /tmp/d3408-diff.txt)

Hot-12: omon_adj dothrow.c:1912-1947, m_initthrow makemon.c:147-158,
obj_shudders zap.c:1475-1497, add_achieveX topten.c:479-488,
wiz_show_stats wizcmds.c:1615-1697, wiz_display_macros
wizcmds.c:1704-1778, mon_invent_chain wizcmds.c:1176-1196, wiz_custom
wizcmds.c:1933-1984, m_initgrp makemon.c:79-145, mhurtle
dothrow.c:1128-1179, thitmonst dothrow.c:2011-2304, breakobj
dothrow.c:2480-2574. Random-4: temperature_shift makemon.c:1640-1648,
wiz_show_stats, cnf_line_HACKDIR cfgfiles.c:637-650, cancel_item
zap.c:1296-1360.

## C ↔ JS fidelity (every new hunk walked vs pinned C)

- zhitm re-port: spell_damage_bonus ×4 (MM/fire/cold/lightning),
  six defended() OR-gates (MAGM/FIRE/COLD/ELEC/DRST/ACID), death-breath
  armor strip via live ootmp + cloak/shirt m_useup (:4320-4338),
  PM_DEATH heal (:4301-4307), nonliving/demon/vampshifter/magm
  (:4308-4312), acid rn2(6)×2 (:4379-4382), lightning tmp=0/blind
  rnd(50)/127-clamp/rn2(3)-destroy (:4348-4363), poison (:4367),
  shieldeff tail + Knight double + resist halve (:4385-4393) — exact.
  SLEEP arm pre-existing (not re-audited).
- bhitm: force-boil seemimic+shieldeff+Boing (:195-200), dbldam
  (:205-207; def :165 no otyp gate; :252/:525 sites pre-existing ✓),
  poly shieldeff_mon (:272-273), locking/opening MIM_REVEAL plines
  (:370-375/:384-386) — exact. flashburn shieldeff+return-TRUE
  (:3075-3078) ✓. zhitu killer death_inflicted_by+strsubst (:4574-4577;
  callee live mcastu.js:421 ✓). dobuzz eleven flash_str FALSE sites ✓
  (counted 11). cancel_item REVIVE_MON→ROT_CORPSE swap (:1346-1355,
  random-4) ✓. bhitpile fill_pit, dozap check_unpaid/spe<0-dust/
  update_inventory (:2642/:2677-2681), destroy_item xresist (3
  conjuncts incl. GLOB ✓)/Book glow/potionbreathe/slime-how,
  makewish retry+NULL-fallback+term_gone/resume_wish (:6339-6366),
  mhurtle NODIAG(monsndx)+minliquid (:1154-1155/:1174-1175, hot-12),
  throw_gold unsplitobj merge-back (:2665-2667) — all exact.
- resists_magm: zap stub DELETED → live mondata.js:374 export ✓
  (`sym.mjs` paste below; mhitm.js:568 local predates — debt, not
  this SHA). can_touch_safely: 1-word export, body whole (4 gates
  exact — old "stub" comment was stale), oselect gate wired
  (:490-491) ✓. uwep_skill_type rewires: old inlines identical to
  export (no behavior change) ✓. Is_special boneid letter
  (files.c:801) ✓. shk trio (alter_cost :3251, contained_cost
  :2840-2841, candle halve :4351-4353) ✓. wiz unavailcmd ×5 +
  encumber_msg + notice_mon bracket + +N parse: CODE matches C
  pattern; CITATIONS wrong on all five (:254/:289/:301/:195/:1064
  vs actual :42/:212/:404/:197/:168 — nit batch, code verified).
  wiz_polyself gate removal correct (C :567-572 has no gate).
- makemon PROGRESS fix: makemon_appear_msg exact (:1476-1500 +
  :1502-1504 dochugw; next2u≡du≤2 ✓); sweep uniform across 17
  callers (captured mon + same flags); sync→async conversions
  (maybe_generate_rnd_mon/clonewiz/resurrect) — every caller
  awaited (resurrect has two, both ✓). prevmsg_set_prompt (new
  display.js export + 3 wirings): C-confirmed (getline.c:67
  custompline "%s ", topl.c:420/425) — principled mirror, not a
  hack; session-evidenced ✓.
- Sampled audits (bodies): omon_adj, m_initthrow, obj_shudders
  (3/2→1 trunc ✓), add_achieveX, wiz_show_stats (all chains +
  totals), wiz_display_macros (sections in order),
  mon_invent_chain, wiz_custom (incl. #if-0 pick loop skipped),
  m_initgrp (body C-exact; HP-UX blocks ifdef'd out ✓ — ROW
  flagged, not body), temperature_shift, cnf_line_HACKDIR
  (UNIX ⇒ nhUse fold ✓, neither ifdef defined), thitmonst
  (structure + rnd(20)/2×rnd(25) exact; tmiss→live miss verified),
  breakobj (fracture cascade async+awaited verified).

## Hallucinations / overclaim

- Verification claims TRUE (see below). "Stale omits retired" TRUE
  and ROW-UPDATED (the D-3407 failure mode absent here — spot
  checks pass). "eleven flash_str" counted ✓. "single awaited
  callers" loose (resurrect: two, both awaited ✓).
- Ledger overclaims: "2 rows stay partial" (4 are); m_initgrp
  "whole vs C" vs message-named remainder; makemon omit missing 3
  message-named remainders; newmextra vacuous note; wiz_show_nhuuid
  paste-error re-certified. Code-side: wizcmds citation batch wrong
  (code right). No dispatch/callee-stub shape; net clones: -1
  (resists_magm stub deleted).

## Density

Per-function verdicts: omon_adj ACCEPT; m_initthrow ACCEPT;
obj_shudders ACCEPT; add_achieveX ACCEPT; wiz_show_stats ACCEPT;
wiz_display_macros ACCEPT; mon_invent_chain ACCEPT; wiz_custom
ACCEPT; m_initgrp QUALITY-RISK (row claims whole; group-message
remainder message-only); mhurtle ACCEPT; thitmonst ACCEPT;
breakobj ACCEPT; temperature_shift ACCEPT; cnf_line_HACKDIR
ACCEPT; cancel_item ACCEPT. SHA verdict = QUALITY-RISK.
Batch conformance: exactly 100 rows, manifest == picker
(MANIFEST-EXACT), 0 Left open by status; fails on ledger truth
(4 rows), not counts. No non-manifest js function (makemon sweep
+ fixes ride ported rows / new helper, disclosed).

## Verification

- D-log: makemon PROGRESS (2 PASS + 1 moved past), sweep 715/0,
  all gates green, 8 per-file checkpoints. Scoreboard confirms:
  94045 passed, 94346 passed, 94066 yn_function@181 (was 50).
- Re-measured on all 15 unique samples + makemon in one call
  (`--base 952e46e04~1 --reach-all`, /tmp/verify-3408.txt): 16/16
  REACH-OK, 0 regressed, no WORSE. makemon: "2 PASS, 1 moved past,
  0 unchanged, 0 worse → PROGRESS" (94346/94045 PASS, 94066
  50→181) + reach 712/712 PASS — genuine (D-1831 pattern absent).
  m_initgrp reach 164/164 PASS.
- `imports.mjs --rulecheck`: clean ✓. Diff grep: only NODIAG (C
  macro) hits — clean ✓. All import extensions `--can` ALREADY
  (spot-checked zap/shk/weapon edges; no new-edge claims made).
- `sym.mjs resists_magm` (required paste — diff deletes the zap
  local): `resists_magm  js/mondata.js:374  sync / !! ALSO 1 LOCAL
  CLONE(S) … js/mhitm.js:568` — zap stub gone ✓; mhitm local
  pre-exists (debt note, not this SHA).

## Actionable C-wrongs

1. D-3408 ledger remainder homes (4 rows) — message-named remainders
   missing from the map + 2 mis-certified partials: m_initgrp row →
   partial + omit "mid-game group-member appear-Noreps unemitted
   (sync m_initgrp cannot await makemon_appear_msg; cascade through
   makemon/mklev out of scope)"; makemon row omit += "m_dowear
   called fire-and-forget (:1445; sync level gen, no await)" +
   "starting-pet in_mklev observable-match (dog.js)" + pointer
   "group-member messages live in m_initgrp row"; newmextra row →
   ported (body whole, drop vacuous note); wiz_show_nhuuid row omit
   := "svn.nhuuid value itself unported (platform startup; JS
   reports nhuuid-missing)" replacing the wiz_telekinesis paste
   error. Fix (one iter, ledger-only + verify): `ledger.mjs set` ×4,
   re-run `hidden-proxy verify` on the 4. **Addressed:** D-3409

Verdict: **QUALITY-RISK**
