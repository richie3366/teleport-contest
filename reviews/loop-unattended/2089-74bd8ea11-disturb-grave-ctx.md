# Review 2089 — 74bd8ea11 — disturb_grave + ctx_init + engr verify-whole

- SHA: `74bd8ea11` (D-3129)
- Subject: "`engrave.c` disturb_grave whole + doengrave_ctx_init gaps + engr_at/del_engr_at verify-whole (coverage)"
- js/ insertions: ~55 in js/engrave.js (1 file)
- Prior index: 2088; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: restart `disturb_grave` whole, wire the doengrave
:1019 grave arm, complete `doengrave_ctx_init`, verify
`engr_at`/`del_engr_at` whole with full caller maps and no
code change.

Diff actually adds: the restarted disturb_grave, the grave
arm block, the ctx_init completions, and header/import
updates. Matches the promise. No new helpers.

## Inventory (per function)

- `disturb_grave` (js/engrave.js:1702, async export,
  restarted) — C engrave.c:1706–1721 (csym range). Whole.
- doengrave grave arm (js/engrave.js:1497–1513, NEW) — C
  :1019–1031. Caller wiring for the :1028 site.
- `doengrave_ctx_init` (js/engrave.js:838, module-local =
  C staticfn, completed) — C :544–579. Whole struct now.
- `engr_at` (js/engrave.js:123) + `del_engr_at` (:301) —
  C :230–241 / :460–467; bodies + maps verified, no code
  change.

Callees all LIVE: impossible/You (display.js), makemon,
exercise, is_animal/is_whirly, del_engr. Const swap
MM_NOMSG→NO_MM_FLAGS + ECMD_OK (=0x00, same value as the
old 0, C-exact name). Nothing deleted or re-pointed.

```text
engr_at          js/engrave.js:123   sync + 2 clones (display.js:2175, teleport.js:172)
del_engr_at      js/engrave.js:301   sync
disturb_grave    js/engrave.js:1702   ASYNC
doengrave_ctx_init  js/engrave.js:838  module-local (C staticfn, not drift)
```

## C ↔ JS fidelity

`disturb_grave`, arm by arm: non-grave impossible with
`(%d)` + typ ≡ :1711–1713 (JS impossible substitutes %d —
display.js:8490 verified; `?? 0` guards C-unreachable null);
disturbed impossible text byte-equal ≡ :1714–1716; `You`
(not pline) + `horizontal = 1` + unguarded
`makemon(mons(PM_GHOUL), x, y, NO_MM_FLAGS)` + exercise WIS
false ≡ :1717–1720 (PM_GHOUL guard correctly dropped — C
has none). disturbed≡horizontal confirmed at dokick.c:1118
("clear 'horizontal'"). No RNG either side.

Grave arm: IS_GRAVE gate, hands→smudge-You (text byte-equal
to :1020–1021), `!horizontal`→disturb_grave, doengr_exit
mirror (`disprefresh`→newsym, return ret) ≡ C's exit label
(read in full). Position exact: after the (omitted, header-
named) altar arm, before `doengrave_sfx_item` ≡ :1033.
`is_hands_stylus` ≡ `== &hands_obj`: the sentinel itself
carries `_hands`/otyp -1 (weapon.js:87), de.otmp comes from
getobj, and the disjuncts match only the hands selection.

Callers: dokick.c:1107→js/dokick.js:652 with identical
guards (IS_GRAVE, Levitation, rn2(4), !horizontal &&
!rn2(2) — read both sides); engrave.c:1028→:1508 (new).
Both C callers guard out the impossible arms, as claimed.

`doengrave_ctx_init`: flags/ptext, ECMD_OK, DUST, oetype,
otmp null, oep, all 5 bufs, writer null, oetype-from-oep,
demon/vampire blood (pre-existing), jello
`uswallow && edata && !(animal||whirly)` ≡ :576–577 (the
`edata &&` guards C-unreachable null ustuck), frosted ≡
:578. everb/eloc kept as JS-only prompt words, named with
the :1187 cite. Sole caller :968→:1465 verified.

`engr_at`/`del_engr_at`: canonical bodies exact; both
clones byte-identical walks with cycle comments; del_engr
null-guards so make_grave's `del_engr(engr_at(x,y))` inline
≡ del_engr_at. Caller maps sampled at the risky shapes:
setmangry strict inline (mon.js:1433–1445), make_grave
inline, trap.js:953 unearth path — all hold; the 2 JS-only
display reads are named. (25+32 sites mapped in the D-log;
direct-call sites mechanical, inlines all sampled.)

Diff grep: no FORCE/DIAG/getRngLog/seed/coordinates.

## Hallucinations / overclaim

None. "Both C callers guard out the impossible arms" is
true and verified — the impossibles are still correct to
ship (C body). The no-code-change pair is genuinely
verified, not asserted: bodies, clones, and every risky
inline re-checked here.

## Density

One C file, 4 functions (2 verify-whole), ~55 ins — below
the floor with the unless-clause holding (head row + only
same-file mates; closure closed; D-3127/3128 precedent).
Per-function: disturb_grave ACCEPT; ctx_init ACCEPT;
engr_at ACCEPT; del_engr_at ACCEPT.

## Verification

Re-measured (`--base 74bd8ea11~1 --reach-all`, all four one
call + one confirm): 0 blocked at baseline and working
tree each, vacuous notes, smoke 24/24 → REACH-OK ×4.
Matches the D-log; no REGRESSED session. Gates per D-log:
syntax 1 file, rule2, green 2/2, strict ×2, cohort 7/7
(full skipped — engrave.js unshared, plausible).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
