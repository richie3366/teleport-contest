# Review 2171 — 1eadda2ce — uhitm ×4 (cold/stun/slee/hmon)

SHA `1eadda2ce`, D-3211; 2026-10-01; `js/uhitm.js` (+54/−),
`js/mhitm.js`, `js/mhitu.js`. Four-function same-C-file cluster
(uhitm.c). Closes no prior review.

## Metadata

- Subject: "`uhitm.c` ×4: mhitm_ad_cold defended+seesu, hmon
  anger_guards tail, mhitm_ad_stun uhitm arm, mhitm_ad_slee
  defended/shieldeff (D-3211)".
- Promises: wire live exports in C order (cold defended disjunct +
  seesu pair, hmon snapshot + angry_guards tail, new
  damageum_ad_stun + AD_STUN dispatch, async sleep_slee_mm with
  defended/shieldeff); no new module edges.

## Intent vs deliverable

Kept for all four. Diff delivers each arm exactly as promised, all
new names on pre-existing edges (defended/shieldeff/monstseesu
already imported at each use site; stagger/is_watch/angry_guards
added to live edges), and the mhitm_ad_stun comment-only update.
No unrelated JS.

## Inventory — mhitm_ad_cold

Changed: `damageum_ad_cold` disjunct uncommented → live
(`js/uhitm.js:2539`); `mhitm_ad_cold_u` seesu pair
(`js/mhitu.js:933–940`). No new imports (all pre-existing).

```text
defended         js/mondata.js:163   sync (un-awaited ✓)
monstseesu       js/mondata.js:1052  sync (un-awaited ✓)
monstunseesu     js/mondata.js:1063  sync (un-awaited ✓)
```

All LIVE, no clones, no STUBs. Deleted/re-pointed: none.

## C ↔ JS fidelity — mhitm_ad_cold

C `uhitm.c:2625–2681` (csym range). uhitm `:2641`:
`resists_cold || defended(AD_COLD)` → shieldeff → pline_The →
golemeffects → damage=0 → `+= destroy_items(orig)` — JS
`damageum_ad_cold` (post-image read whole) matches in C order ✓
(golemeffects_mm at :2644 pre-existing). mhitu `:2654–2667`:
hitmsg → mgc_negated gate → frost pline → Cold_resistance:
pline_The + monstseesu + damage=0 / else monstunseesu →
`m_lev > rn2(20)` destroy — JS `_u` matches, seesu calls in the
right branches ✓. mhitm `:2672` disjunct confirmed live at
`js/mhitm.js:1292` ✓. RNG: defended/seesu burn none; draw order
unchanged. Verdict: ACCEPT.

## Inventory — hmon

Changed: `hmon` (`js/uhitm.js:2211`) gains the snapshot const +
tail. New imports: `angry_guards` (mon.js), `is_watch`
(monsters.js) on existing edges.

```text
angry_guards     js/mon.js:1690   ASYNC — await required (awaited ✓)
is_watch         js/monsters.js:933   sync
```

All LIVE. No shadowing (`anger_guards` snapshot vs `angry_guards`
import differ). Deleted/re-pointed: none.

## C ↔ JS fidelity — hmon

C `uhitm.c:818–834` (csym range, 17 lines): snapshot
`mpeaceful && (ispriest || isshk || is_watch(data))` before
hmon_hitmon ✓ exact; priest smite unchanged ✓; `angry_guards(!!Deaf)`
on the snapshot ✓ (async-await preserves order); result returned
✓. The inline Deaf disjunct (`H||E||roleplay||base`) is
character-identical to the house idiom (apply.js:3270, do.js:471,
display.js:6191) ✓. JS callers match the D-log (uhitm.js:3069,
ball.js:927, dothrow ×4); do.c:223 stays map-named ✓. RNG: no new
draws on the path (angry_guards is message/wake). Verdict: ACCEPT.

## Inventory — mhitm_ad_stun (uhitm arm)

New: `damageum_ad_stun` (`js/uhitm.js:2558`, same-file local) +
AD_STUN dispatch arm (`:2846`). New import: `stagger` (mhitm.js →
export, body unchanged); makeplural pre-existing (uhitm.js:102).

```text
stagger          js/mhitm.js:1131  sync (un-awaited ✓)
makeplural       js/objnam.js:2237  sync
damageum_ad_phys js/uhitm.js:2270  sync local (same-file call ✓)
```

All LIVE, no clones, no STUBs.

## C ↔ JS fidelity — mhitm_ad_stun uhitm arm

C `:4393–4402`: `!Blind` "%s %s for a moment." (Monnam +
makeplural(stagger(pd,"stagger"))) → mstun=1 → mhitm_ad_phys →
`if (mhm->done) return`. JS: Blind_that pline with identical
template ✓ (`Blind_that` is the file's pre-existing uhitm-arm
idiom, also used by cold); unconditional `mstun = 1` ✓; sync
`damageum_ad_phys` (JSDoc'd hero→mon arm; the mhitm.js phys local
is the mhitm arm — comment verified by reading both) ✓. The
omitted `if (mhm->done) return` is equivalent, not a gap: the
dispatch is an else-if chain and JS `damageum` checks `mhm.done`
immediately after it (`js/uhitm.js:3010`, read — matches C
damageum `:4854–4858` order). Dispatch placement between SLOW and
SAMU is cosmetic (C `switch :4786` has no fallthrough). RNG: none
in the arm. Verdict: ACCEPT.

## Inventory — mhitm_ad_slee (sleep path)

Changed: `sleep_slee_mm` → async + defended/shieldeff
(`js/mhitm.js:1411`); 3 call sites awaited (`:1461`, `:1471–1472`
— the complete caller set, grepped). defended/shieldeff
pre-existing imports (mhitm.js:15/:12).

```text
shieldeff        js/display.js:4756  ASYNC — await required (awaited ✓)
```

All LIVE, no clones, no STUBs.

## C ↔ JS fidelity — sleep_monst how=-1 path

C `mhitm.c:1223–1245`: how=-1 skips the mimic arm ✓ (JS never had
it); `resists_sleep || defended(AD_SLEE) || (how>=0 && …)` →
shieldeff, fall to `return 0` ✓ — JS returns 0 after an awaited
shieldeff ✓; else-if mcanmove: meal break (house meating=0,
pre-existing, JSDoc'd) + amt += mfrozen (unchanged) ✓. Call counts
preserved (1 uhitm + 2 mhitm `rnd(10)`), awaits add no draws.
`slept_slee_mm` sticks/meal notes stay map-named, pre-existing ✓.
Verdict: ACCEPT.

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate
gates (`NODIAG` const-name hits only). Rule #2 clean
(iteration-wide rulecheck).

## Hallucinations / overclaim

None. "No new module edges", the phys-arm routing note, and the
done-check equivalence note all verified against post-image code.

## Density

Four whole C functions of one C file (uhitm.c; slee via its
mhitm.c callee path), ~90 js insertions, no Must-fix bundled.
Per-function Ledger and Verify lines present.

- Ledger: mhitm_ad_cold split — ACCEPT.
- Ledger: hmon ported — ACCEPT.
- Ledger: mhitm_ad_stun split — ACCEPT.
- Ledger: mhitm_ad_slee split — ACCEPT.

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
reach mhitm_ad_cold: 11 baseline-PASS session(s) reach it (11 run, 3.3s): 11 PASS, 0 regressed → REACH-OK
verify hmon: 0 session(s) blocked; smoke (24 run, 13.0s): 24 PASS, 0 regressed → REACH-OK
reach mhitm_ad_stun: 4 baseline-PASS session(s) reach it (4 run, 1.6s): 4 PASS, 0 regressed → REACH-OK
reach mhitm_ad_slee: 1 baseline-PASS session(s) reach it (1 run, 1.6s): 1 PASS, 0 regressed → REACH-OK
```

Matches the D-log per-function lines (11/24/4/1, vacuity stated
for hmon). No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
