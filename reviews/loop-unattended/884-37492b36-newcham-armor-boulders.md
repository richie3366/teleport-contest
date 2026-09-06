# Review 884 — 37492b36 — mon.c newcham remaining body arms (mon_break_armor, boulders, monst_to_any) (D-1914)

Metadata: SHA `37492b36`, D-1914. Files: `js/worn.js` (+221:
canonical `mon_break_armor` + local `m_lose_armor`),
`js/makemon.js` (+86: boulder/armor/Elbereth chain),
`js/mthrowu.js` (+18: canonical `m_useup`), `js/hack.js` (+11:
`monst_to_any`), `js/do_wear.js` (+5: `cloak_simple_name`
promotion), turns map, queue row archived. Next index 884.

Intent vs deliverable: subject promises the newcham tail
(mon_break_armor, boulders, monst_to_any). The diff delivers
those three plus the two canonical helpers they need, wired
into the possibly_unwield→armor→boulder→Elbereth chain.
Promise ≡ diff.

Inventory: 4 new functions (`mon_break_armor` export,
`m_lose_armor` local, `m_useup` export, `monst_to_any` export),
1 promotion (local→export, body untouched), 0 deletions.

**C ↔ JS fidelity**: `mon_break_armor` walked arm-by-arm
against `worn.c:1177–1335` (160 lines, read in full) —
dragon-merge silent arm, suit/cloak/shirt break destroys with
cracking/ripping sfx + vis/`You_hear` split, artifact-cloak
lose vs rip, sliparm lose incl. whirly-cloak/shirt texts and
`passes_thru_clothes`, gloves + `MON_WEP` weapon tail, shield
clank, horns non-flimsy helm via `surface()`, slithy/centaur
boots slide/pushed, saddle lose-then-pline, `noride` +
DISMOUNT_FELL + touch-petrify `rnl(3)` — all exact, in C
order. Dragon arithmetic verified against live tables:
scales 111–120 / mails 101–110 contiguous, dragons
PM_GRAY 143–152 contiguous, same color order — the
`PM_GRAY_DRAGON + t - GRAY_…` formula reproduces C's
`Dragon_*_to_pm` for all 20 (chromatic correctly out of
range). Callee closure all LIVE or verified CLONE:
`m_lose_armor` matches `worn.c:1039–1051` line-for-line;
`m_useup` matches `mthrowu.c:1161–1170` + `m_useupall`
`:1153–1158` (obfree ≡ GC); `monst_to_any` collapses
`hack.c:88–94` to mtmp, exactly equivalent since
`del_light_source` compares `ls.id === id` (`light.js:76`)
and line 116 already passes mtmp raw; local
breakarm/sliparm/is_flimsy/slithy/WrappingAllowed/has_horns
re-matched to C here (`mondata.c:639–650` spot-read exact).
Boulders match `:5495–5514` incl. polyspot bypass,
extract/flooreffects/place under a DEADMONSTER gate (`mhp≥1`
≡ `mhp<1` exit). Elbereth matches `:5517–5532`
(`mon_moving`, apparxy, onscary+monnear,
`monflee(rn1(9,2),TRUE,TRUE)`). Thunk discipline sound:
template-time values all sync (`Monnam`/`s_suffix`/
`cloak_simple_name`/`surface`/`MON_WEP`/`mhim`/`mhis` —
`sym` sync), async `You_hear`/`pline`/`instapetrify`/
`dismount_steed` all awaited at flush in capture order;
`!pending.length → undefined` keeps the NO_NC_FLAGS boolean
contract. `check_gear_next_turn` runs early (pre-armor vs
C's post-mselftouch) but only ORs `I_SPECIAL` (`mon.c:5913–
5918`) — unobservable, and the `mselftouch` read is a named
omit anyway. New static edges (`worn→trap/mthrowu`,
`mthrowu→worn`) are hoisted-function-only; full-suite load
proves link-safety.

Hallucinations / overclaim: none. Named omits
(`mselftouch`, ustuck, `poly_steed`, satellite locals) are
real map rows, untouched files confirm the "untouched"
claims trivially.

Density: one C family + forced helpers, +361 — large but
single-locus; the >250 ceiling covers it without padding.

Verification: D-log gates PASS (green 2/2 + strict ×2,
cohort 7/7, full 44/44 auto on shared-file change).
Re-measured both: `verify newcham` and `verify
mon_break_armor --base 37492b36~1` → 0 blocked at baseline
and now — vacuous as stated, map-driven row. Diff grep: no
banned patterns. `imports.mjs --rulecheck` → clean (HEAD).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
