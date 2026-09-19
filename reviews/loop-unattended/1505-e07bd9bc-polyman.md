# Review 1505 — e07bd9bc — polyself.c polyman (D-2546)

## Metadata

- SHA: `e07bd9bc`
- D-id: D-2546. Next index: 1505.
- Files: `js/polyself.js` (+93/−26ish: restart).
- C locus: `nethack-c/upstream/src/polyself.c:199–268`
  (`polyman`, staticfn, 70 L); `:2264–2269` (`ugenocided`, 6 L).

## Intent vs deliverable

Subject promises: whole `polyman` in C order (PARTIAL → live),
7 missing arms + same-file `ugenocided`, both C callers wired.
Diff actually adds: mimic-stop, ugenocided block, See_invis
toggle, twoweapon drop, pit-timer reset, strangling,
pool/lava spoteffects, `find_ac`, the `urgent_pline(fmt, arg)`
passthrough, and exported `ugenocided`. Promise matches
deliverable. RNG 1 (`rn1(6, 2)` pit reset) — call-for-call.

## Inventory

- Changed: `polyman` file-local restart (`js/polyself.js:837`
  — `sym.mjs` single local; C is `staticfn`, so file-local is
  correct).
- New: `ugenocided()` exported sync (`js/polyself.js:821`,
  single hit).
- Changed: three import lines extended (end.js, vision.js,
  const.js) — all pre-existing edges, no new module links.
- No deleted or re-pointed symbols → no clone→import audit needed.

## C ↔ JS fidelity

C `:199–268` vs JS, in order: `:200–201` sticking read on the
CURRENT form before set_uasmon (comment says so); `:202`
was_mimicking via `M_AP_TYPE()` (const.js:3211 ≡ monst.h:73);
`:203–204` was_blind/had_see_invis pre-set_uasmon; `:206–211`
Upolyd restore (macurr/mamax bundles, umonnum, female);
`:212` set_uasmon; `:214–217` mh/mhmax/mtimedone zero,
`skinback(false)`, uundetected zero; `:220–221` sticking →
uunstick; `:222` find_ac (was missing — added); `:223–227`
mimic stop (`multi < 0` → `unmul("")`, m_ap_type/mappearance
cleared); `:229` newsym; `:231` urgent_pline passthrough
(`(fmt, ...args)` variadic confirmed at display.js:7920 — the
old `%s`-replace shim correctly removed); `:234–247`
ugenocided block (delayed POLYMORPH killer → killer struct or
KILLED_BY/self-genocide, dealloc, `done(GENOCIDED)`); `:249`
XOR-toggle (`!==` ≡ `^` on booleans) → set_mimic_blocking;
`:252` twoweap gate → untwoweapon; `:255` pit gate →
`set_utrap(rn1(6, 2), TT_PIT)`; `:258` eyeless revert
(pre-existing shape); `:261` check_strangling(true); `:263`
Levitation/stuck/pool-or-lava → spoteffects(true); `:266`
see_monsters. Confirm across the whole body.

`ugenocided` ≡ C `:2264–2269` (urole/urace mnum G_GENOD on
game.mvitals; `G_GENOD = 0x02` live, const.js:746). Nit
(comment-only): JSDoc cites `:2265–2270`, csym ends at `:2269`.

Callee closure: `find_delayed_killer`/`dealloc_killer`
(end.js:1902/1911, sync), `set_mimic_blocking`
(vision.js:146), `untwoweapon`/`could_twoweap` (wield.js),
`find_ac`, `unmul`, `spoteffects`, `check_strangling`
(pre-existing file-local, wired with C's `TRUE` arg),
`M_AP_TYPE`, `G_GENOD`, `GENOCIDED`, `POLYMORPH` — all LIVE.
No clones, no stubs, no named omits ("none in this body"
holds). Callers: both same-file C sites wired —
polyself.js:1012 (newman `:443`) and :1052 (rehumanize
`:1395`). Confirm.

Note on the See_invisible/Blind readings: C macros are bare
`H||E` (youprop.h:103/152; no sticky, no Blocked term); JS
adds the file's sticky flats (`u.See_invisible`,
`uroleplay.blind`). Both toggle reads use the identical
expression with only `set_uasmon()` between them, so the
observable (toggle → set_mimic_blocking) matches C unless
set_uasmon itself mutates the sticky flats — accepted as the
file-established idiom, not a Must-fix.

## Hallucinations / overclaim

None. "Every arm and callee live or ported" verified arm by
arm above.

## Density

One 70-line C function + 6-line sibling restarted, one file.
Right-sized per §2b.

## Verification

- D-log: syntax (1 file) · rule2 · hidden 0 blocked · smoke
  24/24 REACH-OK · green 2/2 + strict ×2 · cohort 7/7 · full
  skipped (no shared file changed) → VERIFY: PASS.
- Re-run here: `hidden-proxy.mjs verify polyman --base
  e07bd9bc~1 --reach-all` → 0 blocked both trees (vacuous,
  honestly reported) + smoke 24 PASS, 0 regressed → REACH-OK.
  Matches.
- `imports.mjs --rulecheck`: clean. Diff grep: 0 hits for
  FORCE/DIAG/getRngLog/fastforward/seed names.

## Actionable C-wrongs

None. No Must-fix, no CURRENT change.

Verdict: **ACCEPT**
