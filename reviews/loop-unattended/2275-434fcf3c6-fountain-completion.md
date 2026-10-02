# Review 2275 — 434fcf3c6 — fountain completion septet

Metadata: SHA `434fcf3c638e7773c58f89c803a201ca6031e52f`
(D-3319, 2026-10-02). `js/fountain.js` (4 set_levltyp rewires
+ 4 deletions + 3 import adds + 3 prunes + doc),
`js/do.js:2796` (comment). `scripts/fountain-rewire.test.mjs`
(new, 9 subtests). Cluster of 7, one C file.

Intent vs deliverable: subject promises live set_levltyp
rewires + 3 clone deletions + the money_cnt first-stack fix.
The diff rewires all four sites plus the helper to the live
export, deletes `money_cnt`/`a_monnam`/`fingers_or_gloves` (+
orphaned `gloves_simple_name`) for live imports, and retires
the deferral comments. Delivers what it promises; the rewire
additionally fixes a genuine C-wrong (summing money_cnt).

Inventory (per function):

- `dipfountain` — Excalibur site rewired to live set_levltyp;
  case 28 now uses first-stack money_cnt.
- `dryup` — :231 site rewired; retained local get_iter_mons.
- `breaksink` — :586 site rewired.
- `gush` — :152 site rewired; set_levltyp omit retired.
- `wash_hands` — uses live fingers_or_gloves (no body delta).
- `drinksink` — case 3 uses live a_monnam (no body delta).
- `dipsink` — stale-complete, no `js/` change (read whole).
- Helper `dipsink_set_levltyp` — incremental analog replaced
  by a thin alias over the live export (covers polymorph_sink
  4× + teleport_sink, pre-existing D-2527 shape).

Required `sym.mjs` output (deleted/re-pointed symbols):

```text
money_cnt        js/shk.js:4767   sync
             !! ALSO 3 LOCAL CLONE(S) in 3 files — IMPORT the export
               js/end.js:458  js/monmove.js:743  js/sit.js:1084
a_monnam         js/do_name.js:1221   sync
             !! ALSO 3 LOCAL CLONE(S) — js/hack.js:300 js/music.js:266 js/trap.js:247
fingers_or_gloves js/do_wear.js:3981   sync
             !! ALSO 1 LOCAL CLONE — js/eat.js:2720
gloves_simple_name js/objnam.js:1381   sync
set_levltyp      js/trap.js:881   sync
```

All four re-points land on live sync exports; the fountain
clones are gone. Remaining clones elsewhere are out of scope
(the D-log queues rows for the money_cnt twins; the rest are
other functions' rows). `--can` on both ostensibly-new edges
(shk, do_wear) reports ALREADY — no new edges at all, hence no
TDZ question.

**C ↔ JS fidelity** (per function):

Shared target `set_levltyp` (mkmaze.c:76–121) vs js/trap.js:881:
isok+range guards ✓, CAN_OVERWRITE gate ✓ (JS names the
wizard-only debug-flag omit), typ write ✓, IS_LAVA→lit ✓,
was_ice melt arms ✓, fountain/sink rescan replaced by the
identical >0-guarded incremental discipline the deleted code
used (≡ C's rescan while counts stay consistent — disclosed).
C call sites ignore the return; JS does too ✓. Site-adjacent
lines match C exactly: gush :152–153, dryup :231–233, dipfountain
:442–443, breaksink :586–589. Two pre-existing shared-export
gaps noted, both unobservable at these sites (oldtyp ∈
{ROOM,FOUNTAIN,SINK}, always isok): `was_ice` narrows C is_ice
(DB_ICE drawbridge arm) and the EXTRA_SANITY_CHECKS impossible
(config.h:637 defines it) is omitted — D-1280 shape, not this
SHA's scope.

- `dipfountain` (fountain.c:393–554, read whole): Excalibur gate
  &&-order incl. rn2 position ✓; deny arm (mist, curse,
  spe>-6&&!rn2(3), oerodeproof, exercise, livelog) ✓; grant arm
  (oname VIA_DIP|KNOW_ARTI, discover, bless, oeroded×2,
  oerodeproof, exercise, livelog) ✓; update_inventory → live
  set_levltyp → flags=0 → newsym → angry_guards → return ✓;
  hands/uarmg dispatch ✓; er gate with short-circuited rn2(2) ✓;
  rnd(30) cases 16–29 verified arm-for-arm (17–20 glow/uncurse,
  24 LOOTED-gate + FALLTHROUGH, 28 first-stack gold loss with
  denomination rounding ≡ C :504–524, 29 surface-scaled mkgold,
  default er-gated nothing) ✓; tail update_inventory + dryup ✓.
  The extra `looted=0` (C :443 clears flags only) is disclosed
  pre-existing, dormant on ROOM ✓. Case 28's money_cnt now
  returns the first stack per hack.c:4513–4522 (live shk.js:4767
  verified: array + nobj arms both first-match) — the old
  summing clone was the C-wrong; fixed ✓. Confirm.
- `dryup` (fountain.c:200–239, read whole): IS_FOUNTAIN &&
  (!rn2(3)||WARNED) gate, town-warn + trickle + return, wizard
  y_n, cloud-glyph skip, live set_levltyp + flags + blessedftn,
  newsym, isyou&&in_town angry_guards(FALSE) ✓. Retained
  get_iter_mons: monmove.js:216 doc literally keeps copies "for
  callers whose callback prints" — watchman_warn_fountain
  plines/verbalizes, so the async local is project policy, not
  drift ✓. Confirm.
- `breaksink` (fountain.c:580–591): gate → live set_levltyp →
  looted/blessedftn/SET_FOUNTAIN_LOOTED → newsym ✓. Confirm.
- `gush` (fountain.c:133–161, staticfn → module-local ✓): guard
  disjunction in C order incl. rn2 position ✓, delfloortrap ✓,
  `!(poolcnt.n++)` pline ≡ C post-increment ✓, live set_levltyp
  + flags=0 ✓, del_engr, water_damage_chain(TRUE),
  m_at→minliquid else newsym ✓. Confirm.
- `wash_hands` (fountain.c:557–577): hands-const-first order,
  was_glib, You-wash, Glib→make_glib(0)+slippery via the live
  fingers_or_gloves(TRUE) (≡ do_wear.c:59–65, verified; the
  latebound body_part is the same function, TDZ-safe) ✓,
  water_damage(uarmg,null,TRUE), ER_GREASED hack ✓. Confirm.
- `drinksink` (fountain.c:594–712, read whole): Levitation gate,
  rn2(20) cases 0–13 + 19/fallthrough/default verified
  arm-for-arm — case 3 now uses live a_monnam (≡ do_name.c:
  1151–1156 ARTICLE_A + SUPPRESS_SADDLE, verified; strictly
  more faithful than the deleted naive clone), case 4 faucet
  retry + observe + quan++ + fromsink + dopotion, case 7
  short-circuit, case 10 Unchanging double-skip, 11/12
  Soundeffect empty per the sndprocs.h:272 proof (D-3318
  precedent, re-verified: no SND_LIB_* defined) ✓. Confirm.
- `dipsink` (fountain.c:715–801, read whole, no delta):
  breaksink lottery + slippery, hands→wash_hands, tap arm,
  pour pline, otyp switch incl. ACID 3-arm/try_call dance,
  OBJECT_DETECTION FALLTHROUGH, vapor default with
  breathless||haseyes gate, try_call&&dknown→trycall, useup ✓.
  Confirm.

Hallucinations / overclaim: none. "Identical typ write +
counts" for the helper is accurate (same discipline as the
deleted analog, verified in the diff); the rescan-vs-incremental
equivalence condition is stated, not hidden. The test-fix note
(unspotted a_monnam fixture "it") discloses a test-side
correction rather than burying it.

Density: 7 whole functions, one C file — within §10.17. Net
negative diff (deletions exceed adds); density is fine. Each
function has its own `Ledger:` entry (7× ported) and Verify
line. All seven confirm.

Verification: D-log claims 7× vacuous note + mixed real/smoke
REACH (dipfountain 14/14, dryup 42/42, gush 24/24, drinksink 6/6;
3 smokes), gates incl. full 44/44, focused 9/9. Re-measured in
one call: `hidden-proxy.mjs verify <all seven> --base
434fcf3c6~1 --reach-all` → every function "0 blocked (0 at
baseline, 0 in working)" + explicit vacuous note; reach lines
14/14, 42/42, 24/24, 6/6 PASS 0 regressed and 3× smoke 24/24 —
exact match to the D-log. I ran the new test: 9 pass, 0 fail.
Pruned-import check by hand: zero remaining FINGER/IS_SINK/
objectNameStrs references in fountain.js. Diff grep: no
FORCE/DIAG/getRngLog/seed/fastforward/coordinates. Rule #2
iteration-wide clean.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
