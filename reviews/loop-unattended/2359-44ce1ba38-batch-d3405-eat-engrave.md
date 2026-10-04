# Review 2359 — 44ce1ba38 — batch D-3405 eat/engrave/botl/cfgfiles (100 fns)

- SHA: `44ce1ba38` (batch @198b7a2a7, D-3405). Files: js/eat.js +242/-,
  js/engrave.js, js/display.js, js/cfgfiles.js, js/apply.js, js/allmain.js,
  js/cmd.js, js/options.js, js/earlyarg.js; ledger botl/cfgfiles/eat/engrave/
  hacklib/mondata; +1 focused test. No js/ edits by this review.
- Method: fixed sample — hot-11 (all rows with rng>0 or out>0, hottest
  first), random-4, audited-3, Left-open 0 (nothing to check). True manifest
  re-derived from the commit's own ledger diff (100 `+` rows), not the live
  DB: `d` is append-history, but both sets diffed IDENTICAL, so DB sampling
  is valid for this SHA (also re-verified identical for D-3401..D-3404 —
  prior reviews' populations stand, incl. the D-3402 101-row overage).
- Picker reproduction at base (`ledger.mjs batch` in worktree @198b7a2a7):
  MANIFEST-EXACT (100/100, `diff` empty).

## Intent vs deliverable

Promise: "100 whole C functions (open 0 · partial 28 · recheck 72)"
across hacklib(6)/eat(14)/botl(25)/engrave(9)/mondata(6)/cfgfiles(40);
named-omission arms ported (touchfood/cpostfx/eatcorpse/doeat/doengrave/
switch_symbols/PANICTRACE/set_configfile_name…); one live divergence
closed (doengrave ECMD_FAIL vs `E` truthiness dispatcher, Barbarian-94037
step 102 rng → PASS); "all 100 note-no-block", sweep REACH-OK.
Delivers: exactly that, plus two unmanifested items — `switch_symbols`
(new export, disclosed in prose but no ledger row touch) and an in-file
`the_unique_pm` clone in eat.js ("name clash noted"). Diff statuses:
ported 62 · partial 17 · split 21 · open 0. The message's "partial 28 ·
recheck 72" split does not match the diff's 62/17/21 vocabulary (counts
sum to 100 both ways; "0 left open" holds — doc nit only).

## Inventory (sampled; full manifest = 100 diff rows, /tmp/d3405-diff.txt)

Hot-11: floorfood eat.c:3578-3731, config_erradd cfgfiles.c:1544-1589,
config_error_done cfgfiles.c:1592-1621, cpostfx eat.c:1129-1328,
consume_tin eat.c:1528-1699, eatcorpse eat.c:1855-2018, doeat_nonfood
eat.c:2734-2813, doeat eat.c:2817-3084, make_engr_at engrave.c:408-457,
doengrave_sfx_item engrave.c:742-892, doengrave engrave.c:956-1263.
Random-4: query_conditions botl.c:3108-3138, name_to_monplus
mondata.c:893-1085, save_engravings engrave.c:1550-1580, status_finish
botl.c:1722-1756. Audited-3: config_erradd, config_error_done,
name_to_monplus (notes "audited D-3405: whole vs C"). Helpers: curs_on_u,
trycall, sellobj_state, strncmpi, mon_nam, altar_wrath, livelog_printf
(all import extensions, `--can` ALREADY — no new edges); COST_BITE,
SELL_* consts; PM_TIGER index.

## C ↔ JS fidelity

EVERY added hunk below was walked against pinned C (csym ranges cited).

- touchfood (manifest, ported): `costly_alteration(otmp, COST_BITE)`
  before oeaten (:371) + DONTSELL/dropy/NORMAL bracket (:378-381) +
  OBJ_FREE≈deleted — exact. Ledger row partial→ported, omit retired ✓.
- cpostfx: first-mimic `if (!polyselfs++)` livelog (:1199-1202) exact
  incl. post-incr idiom; curs_on_u + display_nhwindow→more() named ✓.
  Doc paste error (set_mimic_blocking) fixed ✓.
- eatcorpse: slimeable/stoneable predicates (:1861-1867) exact;
  unvegan/unvegetarian livelogs (:1870-1883) exact incl. `!ll_conduct`
  gate and increment-inside-violated_vegetarian (:1378) preserved;
  mild-ill `!Sick_resistance` (:1939, youprop.h:69-70 H||E||defended —
  fixes old `!(H||E)`); chicken `(Stone_resistance||Hallu)` (:1971-1973,
  fixes old H-only); taste line (:2000-2004) exact incl. `the ` strip,
  pname/unique prefix, tiger gr-r-reat. BUT the new prefix calls the
  in-file `the_unique_pm` clone — see C-wrong 1.
- use_up_tin: tin/o_id-only clear (:1522-1523) exact.
- consume_tin: spinach first-food livelog (:1670-1671) + Fixed_abil
  Popeye/Olive/Bluto (:1682-1684) exact.
- doeat_nonfood: MAIL zero-nutrition (:2757-2761, MAIL_STRUCTURES live
  global.h:430 ✓) + three conduct arms (:2766-2785) exact.
- doeat: ring trycall (:2915-2916), resume arm (:2923-2951, incl.
  one_bite_left computed pre-touchfood, canchoke/o_id/piece order),
  food+FLESH+egg/milk conduct (:2962-3022) — all exact.
- doengrave_sfx_item: ECMD_FAIL (:840), impossible (:887) exact.
  doengrave: ECMD_FAIL (:965), ECMD_CANCEL (:978-981), jello (:998-1002),
  altar (:1013-1018), grave fixup (:1037-1047), literate livelog
  (:1212-1216, signature gate present) — exact.
- cmd.js `E` arm: `(res & ECMD_TIME)` bitmask (OK=0/TIME=1/CANCEL=2/
  FAIL=4, const.js:1962-1965) — old truthiness took a turn on FAIL.
  Matches `#` path; Barbarian-94037 end-to-end + new regression test ✓.
- use_candle: two-stage safe_qbuf + strstri ` to\033` strip
  (apply.c:1407-1416) exact; strstri returns tail-from-match ✓.
  allmain reset_eat wiring (allmain.c:504-508) exact.
- timebot: suppress gate + unconditional dual-store clear (botl.c:285/
  :293) exact. switch_symbols TRUE arm (symbols.c:257-260) exact;
  FALSE arm = entry handling/nocolor reset + defaults (via
  init_primary_symbols→clear_symsetentry :183/:332-335); restriction
  bits primary/rogue not reset — JS symset model lacks the fields
  (model-level, and FALSE arm currently dead: wired callers pass TRUE
  only). See C-wrong 2 for the ledger side.
- PANICTRACE range checks: CRASHREPORT→PANICTRACE live on __linux__
  (config.h:250-251/:275-276 ✓), LIBC live (global.h:449 ✓); messages
  exact. set_configfile_name BUFSZ-1 slice (:216-217) exact.
  cnf SYMBOLS/ROGUESYMBOLS wiring (:1194/:1205) exact.
- Audited rows re-verified whole: config_erradd/done (trunc/punct/
  lua-prepend/origline/lineno/tag + no_sound addend, USER_SOUNDS off ✓),
  name_to_monplus (plural fixes, 61-row ALT_NAMES complete through
  erinyes, alt-prefix then longest-pmnames, title fallback,
  remainder/gender) ✓, stat_hunger_indx (STATUS_HILITES live ✓),
  make_engr_at (sizing/prepend/Elbereth/time/type) ✓, query_conditions
  (menu fold, OR-accumulate, >>>0) ✓, status_finish (hook + both
  mirrors + threshold chains) ✓, save_engravings (JSON-arch, Sfo/Sfi
  omit + GC; remembered-unskip micro-omit JS-documented, unobservable).
- floorfood (ported, pre-existing): dispatcher 0/1/2 + impossible
  (:3717-3719) ✓; eat-helper skipfloor gate, beartrap arm
  (deltrap/reset_utrap/mksobj/check_capacity/dropy/returns), bars arm
  verified exact; tin (:3688-3702) + sacrifice helpers cover ranges.

## Hallucinations / overclaim

- "use_candle … no new edges" ✓ true (`--can` ALREADY everywhere).
  "mon_nam/altar_wrath/livelog_printf edges (all --can SAFE)" ✓ (all
  ALREADY). No dispatch-ported-callee-stubbed shape in this batch.
- "switch_symbols port" disclosed in prose — but shipped with NO ledger
  row update while the row claims by-design unported (C-wrong 2).
- "name clash noted" for the_unique_pm understates a divergent clone
  (C-wrong 1). `sym.mjs` output pasted below per Method §3.
- Mid-batch triage narrative (Barbarian-94037 rng@105 → clean-HEAD
  replay PASS vs worktree FAIL → bitmask + test) is session-evidenced
  cause-fix handling ✓. "Stale omits retired" list accurate; each named
  row's diff confirms the retire.

## Density

Per-function verdicts (SHA verdict = worst): floorfood ACCEPT;
config_erradd ACCEPT; config_error_done ACCEPT; cpostfx ACCEPT;
consume_tin ACCEPT; eatcorpse QUALITY-RISK (C-wrong 1 — taste line +
  tin-name line ride the divergent clone); doeat_nonfood ACCEPT; doeat
ACCEPT; make_engr_at ACCEPT; doengrave_sfx_item ACCEPT; doengrave
ACCEPT; query_conditions ACCEPT; name_to_monplus ACCEPT;
save_engravings ACCEPT; status_finish ACCEPT. No second sample: the one
wrong `ported` (eatcorpse) is wrong via a helper clone, and the clone
is fully characterized (3 dead arms, 2 call sites) — a second sample of
8 cannot change the verdict or the fix.
Batch conformance: exactly 100 ledger rows (no count violation), 0
Left open, manifest == picker output (MANIFEST-EXACT). Non-manifest js:
switch_symbols (new fn, C-wrong 2) + the_unique_pm (clone, C-wrong 1);
all other touches are manifest-row improvements or call-site wiring of
already-ported fns (use_candle: row ported/seeded, untouched by diff ✓).

## Verification

- D-log: `verify.mjs --fn <100>` PASS; "all 100 note-no-block"; sweep
  714 re-run, 0 regressed; green/strict/cohort/full PASS; focused test
  1/1. Re-measured on all 15 sampled fns in one call:
  `hidden-proxy verify <15> --base 44ce1ba38~1 --reach-all`
  (/tmp/verify-3405.txt): every fn "0 session(s) blocked" (vacuous
  verify, consistent with note-no-block — no false PASS claim);
  reach doengrave 45/45, eatcorpse 39/39, doeat 26/26, make_engr_at 2/2,
  sfx_item 2/2 PASS; 10 smokes 24/24 PASS. 15/15 REACH-OK, 0 regressed,
  no WORSE. Claim holds.
- `imports.mjs --rulecheck`: "Rule #2 clean" ✓. Diff grep: no FORCE/
  DIAG/getRngLog/fastforward/seed-in-flow/hardcoded coords.
- `sym.mjs the_unique_pm` (required paste — diff adds a clone of a
  live export):
  `the_unique_pm  js/objnam.js:2784  sync / !! ALSO 1 LOCAL CLONE(S)
  in 1 files — IMPORT the export; do NOT add another / js/eat.js:2741`
- `imports.mjs --can eat.js objnam.js the_unique_pm`: "ALREADY: eat.js
  already statically imports objnam.js. No new edge needed." — no
  cycle/TDZ excuse exists for the clone.

## Actionable C-wrongs

1. eat.js:2741 `the_unique_pm` DIVERGENT CLONE of live export
   objnam.js:2784 (C objnam.c:1120-1140). Clone compares
   `ptr === mons(PM_HIGH_CLERIC / PM_LONG_WORM_TAIL /
   PM_WIZARD_OF_YENDOR)`; `mons()` (monsters.js:227) returns a FRESH
   object literal per call, so all three exception arms are dead
   (always-false) — same family as the queued mons()-identity Must-fix.
   Canonical uses `(ptr.mndx|0)` compares. Observable: High Priest
   corpse taste line prints "The …" where C prints "This …"
   (eatcorpse :2000-2004 arm); second call site eat.js:3833 (tin
   which=2). Fix (one iter): delete the clone, extend the existing
   objnam.js import (ALREADY-imported, no new edge). **Addressed:** D-3412
2. `switch_symbols` shipped live (display.js export + wired in both cnf
   handlers, cfgfiles.c:1194/:1205) with NO ledger update: row still
   `{"status":"by-design","note":"seed: no scored analogue (file)"}` —
   now false on both counts. Fix (one iter): row → partial with omit
   map (FALSE-arm options.c callers unported; clear_symsetentry
   desc/purge/glyphmap + restriction-bits tail; graphics-mode callbacks
   null in contest tty), js ref + D-tag.

Verdict: **QUALITY-RISK**
