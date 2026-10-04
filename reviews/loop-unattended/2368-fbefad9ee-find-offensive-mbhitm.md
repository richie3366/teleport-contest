# Review 2368 — fbefad9ee — find_offensive + mbhitm arms; topl_putsym split (D-3420)

- SHA: `fbefad9ee` — "Open head: muse.c find_offensive + mbhitm arms whole; topl_putsym split; impossible audit (D-3420)."
- D-entry: D-3420. Diff: js/muse.js only (+66/−~20); ledger muse/pline/topl; journal + index + queue + scoreboard header.
- Scope: 4 functions (find_offensive, mbhitm, topl_putsym, impossible) — whole Method per function.
- `sym.mjs`: nothing deleted or re-pointed this SHA (import extensions +
  two consts only) — no paste obligation. New import targets all resolve
  to single live homes (hit/miss mthrowu.js:810/:795 async,
  in_your_sanctuary priest.js:457, dmgtype monsters.js:565,
  resists_magm mondata.js:374, find_mac worn.js:237, cancel_monst
  zap.js:3772 async, shieldeff display.js:4951 async, seemimic mon.js:1171).

## Intent vs deliverable

Promise: sanctuary + AD_HEAL gates in find_offensive; seemimic /
shieldeff+sound / stop_occupation / magm-mac-hit-resist-miss /
cancellation arms in mbhitm, all via live exports; topl_putsym as a
3-way split with every arm homed; impossible re-audit standing.

Diff actually adds: the two find_offensive gates; the mbhitm arms in C
order; import extensions (display/mon/mthrowu/priest/monsters/mondata/
const/worn/zap/seffects) + `AD_HEAL`/`WAN_CANCELLATION`/
`SPE_CANCELLATION` consts. No other file touched. Promise == deliverable.

## Inventory

```text
find_offensive | ported  | js/muse.js:633              | C muse.c:1421-1594
mbhitm         | ported  | js/muse.js:793 (local, C staticfn) | C muse.c:1596-1703 (csym)
topl_putsym    | split   | js/display.js:show_topl + js/getline.js:topl_wrap_echo + js/getline.js:yn_collect_number | C win/tty/topl.c:304-344 (csym)
impossible     | audited | js/display.js:8881          | C pline.c:583-634
```

4/4 Ledger entries present; Left open none (true).

## C ↔ JS fidelity

`find_offensive` WHOLE. New arms ≡ C :1431-1437 exactly
(`in_your_sanctuary(mtmp, 0, 0)`; `dmgtype(data, AD_HEAL)` +
8-slot naked test; `data` = mtmp.data; AD_HEAL=27 verified at
monattk.h:69). Pre-existing scan walked arm-by-arm vs C :1440-1594:
all 19 nomore arms in order with exact predicates (sleep multi>=0,
horn can_blow, M_SEEN_* flags, teleport `!tc` + scary/choke/pile/
stairs disjuncts, SCR_EARTH 8-gate chain, CAMERA blind/resist/light/
range/spe/rn2(6)); RNG short-circuit positions exact (`!rn2(10)`,
`!rn2(6)` drawn only after all prior gates fail); `#if 0` SCR_FIRE
correctly absent; `tc` ≡ C Teleport_control (H||E; the extra
`u.Teleport_control` disjunct is dead — zero writes repo-wide).
Callees: m_use_undead_turning is a real same-file body (C staticfn,
ledger ported D-2634); hero_behind_chokepoint/mon_has_friends/
mon_likes_objpile_at same-file staticfns; mon_knows_traps/stairway_at
imported. `resists_blnd_you` reduction (Blind||Unaware vs C's full
youmonst body) is the review-336-accepted named omit (helper-doc-named;
live whole export now exists at mondata.js:451 — retirement is a sweep
candidate, not this SHA's C-wrong). Callers: C has exactly 2
(mhitu.c:758, monmove.c:948 per `--callers`) — both wired
(mhitu.js:4070, monmove.js:2845). `ported` correct.

`mbhitm` WHOLE. Every new arm ≡ C :1602-1672: seemimic gate
(`m_ap_type`, WAN_UNDEAD_TURNING exclusion); Antimagic shieldeff +
`Soundeffect(se_boing, 40)` + Boing order-exact (se_boing=18 verified
in generated data); `stop_occupation()` + `nomul(0)` (:1635);
resists_magm → shieldeff/Boing; `rnd(20) < 10 + find_mac` →
`d(2,12)` → `hit('wand', mtmp, exclam(tmp))` →
`resist(mtmp, otmp.oclass, tmp, TELL)` (TELL=1 ≡ hack.h:45) else
`miss('wand', mtmp)` — RNG call-for-call; cancellation
`cancel_monst(sub, otmp, false, true, false)` ≡ C :1671 with the
`game.youmonst` substitution (sole-caller null-mtmp contract verified:
exactly 2 call sites, both in mbhit, null⟺hits_you; cancel_monst
detects the hero via `=== game.youmonst`). Pre-existing arms verified
too (TELEPORT priest/rloc, UNDEAD_TURNING wake/bypasses/resist,
STRIKING learnit tail, hits-you half-damage/gameover idiom). Reveal
tail: the `mtmp &&` hero-skip is PROVED faithful — youmonst.minvis
and youmonst.mundetected are never assigned in C (grep-clean; both
=1 sites target real monsters), so mon_visible(&youmonst)≡TRUE and C
never paints there either (cansee gate and canseemon key on the same
square). mbhit call sites :2525/:2637/:1079 match C :864/:978/:1884
shape. `ported` correct. Nit: `hit()`'s doc caller list omits mbhitm.

`topl_putsym` split COVERED, every arm: null-window panic N/A
(ensure_message_win always creates); `\b` → yn echo-slice + repaint,
and removetopl (topl.c:358, the only `putsyms("\b…")` site; other
putsyms strings are messages/digits/defmorestr, none containing \b)
is called only from tty_yn_function digit handling — single-erase
slices one char, abort repaints the bare prompt ≡ removetopl(n_len);
`\n`/default CO-1 wrap tracked identically in show_topl's char loop
and topl_wrap_echo (col=0/row++ then col++ ≡ C's recurse-then-bump);
`putchar` → grid paint (Rule #2); WIN32CON arms compiled out
(referenced only under sys/windows build files); cw->curx/cury sync
tail → show_topl final assignment. `split` correct.

`impossible` identical to the 2363-verified body (fbefad9ee touches
only muse.js; 2367 diffed it byte-identical). `audited` stands.

## Hallucinations / overclaim

None. "New priest.js edge" is accurate (line 30 is muse.js's only
priest import; hoisted fn, runtime-only calls — `--can` ALREADY now).
"No new generated tables" true (indexOf consts resolve to the claimed
423/402). "Sole caller passes null mtmp" verified (2 sites).
"Removetopl is the only \b driver" verified in C. No dispatch rides a
stub — all 10 new import targets are the verified live exports.

## Density

Four-function iter, no manifest (coverage rows, operator override).
Per-function verdicts: find_offensive ACCEPT; mbhitm ACCEPT;
topl_putsym ACCEPT; impossible ACCEPT. Per-function Ledger entries +
Verify line present. SHA verdict = all-whole.

## Verification

- Re-measured all 4 fns in one call (`--base fbefad9ee~1
  --reach-all`): 0 blocked everywhere (vacuous, as D-logged) +
  mbhitm reach 14/14 PASS, others smoke 24/24 → REACH-OK ×4.
  0 regressed, 0 worse. Matches the D-log exactly.
- `imports.mjs --rulecheck`: Rule #2 clean (this iteration).
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate gates.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
