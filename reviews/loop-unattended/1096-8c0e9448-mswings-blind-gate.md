# Review 1096 — 8c0e9448 — mswings !Blind prop gate (D-2130)

Metadata: SHA `8c0e9448`, `js/mhitu.js` +7/−3 only. Queue row
`mhitu.c` mattacku, scen-poly-Rogue-92026 step 163/266, RNG-first at
`mhitu.c:912` (AT_WEAP melee `rnd(20+i)`): C `rnd(20)=9 @ mattacku`
vs JS `rn2(2)=0 @ mswings_verb`. Toplines: C «You feel an unseen
monster! It hits! You stop searching.» vs JS «You feel an unseen
monster! It thrusts its knife. It hits!» (JS prints an extra swing
line). No prior review claimed closed.

## Intent vs deliverable

Subject promises: `mswings` gating on prop-formula Blind instead of
stale flats, silencing the swing for the eyeless-poly hero so the
stream keeps `rnd(20)` instead of drawing `rn2(2)`. Diff actually
adds: exactly that 1-line gate change (`!Blind` flat → `!Blind()`)
plus C-cite comment, and removes the now-unused flat read. Promise
matches diff.

## Inventory

Changed JS: `mswings` (mhitu.js) — one gate. Callee: same-module
`Blind()` (`mhitu.js:620`, hoisted `function` declaration — no TDZ
risk, no import needed), implementing `youprop.h`
`(HBlinded||EBlinded) && !BBlinded` plus the established D-0716
roleplay/ublind mirrors. LIVE, no clone, no stub. Hygiene verified:
the removed `const u = game.u || {}` leaves no dangling reference —
the rest of `mswings` references no `u` (only comments mention it).

## C ↔ JS fidelity

C locus `mhitu.c:129-141` (`csym.mjs mswings`, 13 lines), gate
`:135`: `if (flags.verbose && !Blind && mon_visible(mtmp))`. JS is
now gate-identical (`verbose && !Blind() && mon_visible(mtmp)`).

Mechanism measured, not inferred: a temporary instrumented replay
(deleted after use) showed the divergent call with
`HBlinded=0x10000000` (FROMFORM, conferred by `polyself.c:107`
`PROPSET(BLINDED, !haseyes(mdat))` for eyeless forms), flats clear,
`mon.minvis=false`, `cansee=false` — C Blind true (silent), old JS
gate false (prints + draws). The RNG account balances exactly:
silencing the swing skips `mswings_verb`'s `rn2(2)` (`:115-116`), so
the next draw is the to-hit `rnd(20+i)` at `:912`, matching recorded
C `rnd(20)=9`. `mon_visible` untouched; See props were 0 on both
sides, so no display change — consistent with the entry's claim, and
with `cansee` already using the prop formula at the divergent call.
`Blind_slee` (mhitm mon-vs-mon) untouched, correctly out of scope.

## Hallucinations / overclaim

None. One-line claim, one-line diff, probe-backed. The entry names
what it did not touch (`mon_visible` See_invisible reader,
`Blind_slee`) rather than implying a wider fix.

## Density

+7/−3 for a 13-line C function — the whole envelope. Acceptable.

## Verification

D-log Verify bullet: `verify.mjs --fn mattacku` → PASS syntax +
PASS rule2 + hidden PROGRESS + green 2/2 + strict ×2 + cohort 7/7
(full skipped, no shared file). Re-measured myself:
`hidden-proxy.mjs verify mattacku --base 8c0e9448~1` →
`0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
(Rogue-92026 moved 163 → `do_statusline2`@196). Grep: no
FORCE/DIAG/seed/fastforward/coords. Queue row archived; map updated.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
