# Review 2403 — 1efb999a9 — lspo montype rewire

## Metadata

- SHA: `1efb999a9` (2026-10-05) — D-3482.
- Subject: Open head: impossible + migrate_to_level audits + lspo_object
  montype→get_table_str_opt rewire (sp_lev.c:3673 String-coercion gap).
- Diff: `js/mklev.js` (+26/−14 in `lspo_object_apply_montype`), new
  `scripts/lspo-montype.test.mjs` (52 lines), docs/ledger/scoreboard.
- Review mode: ≤10-function SHA — whole Method per function. Batch manifest
  was 1 partial (`migrate_to_level`); the rewire rides the Open head per the
  D-3467…D-3480 precedent. No prior review claimed closed.

## Intent vs deliverable (promise vs diff)

Promises: (a) `impossible` + `migrate_to_level` re-audited whole, no JS
change; (b) montype site restarted through the live helper (C :3673) read
after the corpse-family id gate; (c) `if (montype != null)` for C's :3675
pointer test (`""` enters and errors); (d) pm resolution restructured to C
:3701–3704 (hit assigns, else `nhl_error('Unknown montype')`); (e) behavior
delta is exactly the C conversion.

The diff actually adds: the helper call with C comment, the `!= null`
gate, the `mndx` restructure (mkclass arm, pmnames-scan fallback for
single-char non-letters, scan arm, assign-or-throw tail); deletes the
`String()` coercion and the `!== ''` skip. No import change. Delivered =
promised.

## Inventory

| JS symbol | Kind | C locus | Status |
|---|---|---|---|
| `lspo_object_apply_montype` (:22595–22648) | C arm wiring (split of `lspo_object`) | sp_lev.c:3667–3705 | whole |
| `get_table_str_opt` (dungeon.js:388, unchanged) | LIVE import (edge mklev.js:150) | nhlua.c:1053–1076 | whole (pre-existing) |
| `mkclass` (makemon.js:922) | LIVE import | makemon.c | whole (pre-existing) |
| `lspo_object_montype_mndx` (:22576) | local split of C's inline scan loop | sp_lev.c:3690–3698 | whole (pre-existing) |
| `monclass_letter_to_mlet` (:21747) | local clone of `def_char_to_monclass` | drawing.c:107–116 | whole modulo inherited gaps (pre-existing) |
| `nhl_error` (:22663) | local clone (no lua_State line suffix) | nhlua.c:198–218 | whole (pre-existing) |
| `impossible` (display.js:8970) | `audited`, no JS change | pline.c:583–634 | re-verified below |
| `migrate_to_level` (teleport.js:2816) | `audited`, no JS change | dog.c:886–932 | re-verified below |

## C ↔ JS fidelity

C arm (sp_lev.c:3667–3705, read at the cited range): corpse-family gate
:3667–3669; montype read :3673; pointer test :3675; spinach/empty arms
:3676–3684; single-char class-letter mkclass :3685–3688 else pmnames scan
:3690–3698; assign-or-error :3701–3704.

Branch-by-branch confirm:

- Gate — JS :22596–22600 tests `tmp.id|0` against the same five ids. OK.
- `:3673` read — JS :22606 calls the live helper with `(tmp, 'montype',
  null)`. `tmp` is the `{...o}` spread at the caller's table gate
  (:23037–23039), so `lua_field` ≡ `tmp.montype`; nil/string/function/else
  classifications match C's `lua_type` arms (dungeon.js:225–256 read). The
  helper body (dungeon.js:388–427 read) ports C :1053–1076 arm-for-arm:
  string/nil → optstring, function pcalled (zero-arg; a throw is C's
  NHLpa_panic handler) with number→lua_number2str conversion, else
  nhl_error; `if (ret)` pointer test is `!= null`. OK.
- Read order — normalize (id, C :3652) runs at :23038 before apply_montype
  at :23039, so a function montype pcalls after the id read like C. OK.
- `:3675` pointer test — `montype != null`: `""` enters and errors (it
  matches no permonst), nil skips. Exactly C. OK.
- Spinach/empty (:3676–3684) — TIN spinach/empty + EGG empty → corpsenm
  NON_PM, spe 1 iff spinach, nonpmobj set. Order and predicates match. OK.
- Class letter (:3685–3688) — single-char + truthy mlet → `mkclass(mlet,
  G_NOGEN|G_IGNORE)`; falsy mlet falls into the pmnames scan, matching C's
  `&& def_char_to_monclass != MAXMCLASSES` gate falling to the else. OK.
- Scan (:3690–3698) — `lspo_object_montype_mndx` lowercases both sides over
  NEUTRAL/MALE/FEMALE slots; the NEUTRAL truthiness guard only differs from
  C where C would strcmpi-crash, so it is equivalent on valid data. OK.
- Assign-or-error (:3701–3704) — hit assigns corpsenm; miss throws via the
  local `nhl_error` unless nonpmobj (unreachable there — the spinach arm
  skips this else). Exactly C. OK.
- Caller census — literal montype values in tree: '@' (class letter,
  unchanged path) + nine multi-char strings + themerms role pool (all
  multi-char, sampled names present in monsters_data.js); no single-char
  non-letter, so the newly-throwing arms are unreachable in-tree. No
  in-tree behavior change, as claimed.
- Inherited corner (pre-existing, not this SHA's): `monclass_letter_to_mlet`
  lacks C's 'I'/':'/'~'/']' classes and maps ' ' to S_HUMAN where C maps it
  to S_GHOST (defsym.h:300–360 read). Single-char montypes in that set
  would scan-and-throw (or misclassify ' ') where C mkclasses. Unreachable
  in-tree; helper predates this SHA and is shared by four other sites. Debt
  note only.

`impossible` audit — JS display.js:8970 vs C pline.c:583–634: recursion
panic :591–592 (throw, before the latch), vsnprintf chop :595–597
(`slice(0, BUFSZ-1)`), paniclog :598 Rule #2, fuzzer panic :599–600,
URGENT pline :602–604, sanity early-return :606–610,
disorder/report/support :612–619 (support `!= null` pointer test),
CRASHREPORT :621–631 Rule #2, latch reset. Audit true.

`migrate_to_level` audit — JS teleport.js:2816 vs C dog.c:886–932: leash
:898–901 (mtame--, message floated, FALSE arm sync), mon_leave :904,
relmon sync mirror :906 (fmon-absent impossible, onmap/m_at, mtrapped=0,
guarded :2703 unstuck, worm/grid clear, mundetected, seemimic, fill_pit
inline core, newsym, polearm forget, fmon splice, migrating_mons unshift +
nmon link, MON_MIGRATING), destination encode :908–927 (xyflags depth bit
+ In_W_tower bit, wormno=numSegs, mlstmv, mtrack[2]/[1]/[0], mux/muy,
mx=my=0), light tail :928–931 (`emits_light` → `vision_recalc(0)`). The
remaining omit (guard-true unstuck float: swallowed placebc/docrt +
mspec_used rnd(2) late) is genuine — sync callers exist (mkmaze.c:744,
dog.c:875 among 20 C call sites), so the level-gen path cannot await.
Ledger keeps `partial` + the full float omit; `audited` means re-verified
modulo that standing omit. Audit true.

Required `sym.mjs` output (diff re-points the montype read to the import):

```text
get_table_str_opt js/dungeon.js:388   sync
mkclass          js/makemon.js:922   sync
nhl_error        NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:22663
```

No symbol deleted; no import change (edge at mklev.js:150 predates).

## Hallucinations / overclaim

None. Every conversion claim (pcall, throw-on-direct-nonstring, `""`
enters-and-errors, unknown-name throw) matches the C arms read above, and
the "no in-tree behavior change" claim is backed by a census this review
re-ran (literals + role pool + data presence). Corpus framing is the
correct vacuous note.

Ledger hygiene note (not a C-wrong): D-3482's finish replaced the
`get_table_str_opt` row's impossible paste with the narrowed 9-caller omit
but clipped it mid-word at the 300 cap ("…wired D-34…"). The full text
survives in the D-entry Named bullet, and D-3483 (already shipped)
restored it whole. No queue item.

## Density

Breadth-phase small SHA: manifest (1 partial) covered by the
`migrate_to_level` `audited` declaration; impossible audit + :3673 rewire
ride the Open head per precedent. Per-function verdicts:

- montype call-site rewire — whole :3673 port, order fixed, :3704 arm
  added, census clean. OK.
- `migrate_to_level` `audited` — body really whole modulo the standing
  float omit. OK.
- `impossible` `audited` — body really whole modulo named Rule #2 omits. OK.
- No `Left open:`, no bundled Must-fix (Must-fix ×7 deferred per declared
  override, still queued).

Banned-pattern grep on the `js/` hunk: 0 hits. Rule #2 clean
(`imports.mjs --rulecheck`: no bare/node specifiers or fs calls in `js/`).

## Verification

- D-log: `verify.mjs --fn impossible,get_table_str_opt,migrate_to_level` →
  syntax/rule2 PASS, 3× hidden note (none blocked), 3× REACH-OK (smoke
  24/24), green 2/2, strict ×2, cohort 7/7, full 44/44; node:test 6/6.
- Audit re-measure (`hidden-proxy.mjs verify
  impossible,get_table_str_opt,migrate_to_level --base 1efb999a9~1
  --reach-all`): 0 blocked all three functions (vacuous, correctly
  labeled); smoke 24 PASS / 0 regressed → REACH-OK each. No REGRESSED
  session. Matches the D-log.
- `node --test scripts/lspo-montype.test.mjs`: 6/6 pass on this tree.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
