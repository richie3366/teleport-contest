# Review 1392 — acf54d66 — newcham whole body in C order (D-2433)

- Commit: `acf54d66` — "`mon.c` newcham whole body in C order (coverage THIN → live) (D-2433)."
- Files: `js/makemon.js` only (+209/−74 in effect); docs + map + queue pop.
- D-log: D-2433. Queue row popped: `mon.c` newcham THIN (C 254 L / JS 84 L,
  dead callees now live).

## Intent vs deliverable

Subject promises the whole `newcham` body in C order; message is candid
that most arms already lived in split helpers and the real gap was the
ustuck `:5413–5450` + W_ARMG `mselftouch` `:5486–5488` omissions plus
vampire-cham/check_gear running before SHOW_MSG against C order. Diff
actually adds: `AT_ENGL = 11` const, `newcham_light_invis` (split),
`newcham_ustuck` (new), `newcham_worm_newsym` (split), re-chained
`newcham_after_unleash`, `l_oldname` threading (removes `void l_oldname`),
5 new import edges. Promise matches deliverable.

## Inventory

New/changed JS: `newcham_light_invis`, `newcham_ustuck`,
`newcham_worm_newsym`, `newcham_after_unleash`, `newcham` (threads
`l_oldname`), `newcham_apply_form` call sites. No symbol deleted or
re-pointed; required `sym.mjs` delete/re-point check vacuous. Ran
`sym.mjs` on all 7 newly imported symbols anyway (below).

## C ↔ JS fidelity

C locus `nethack-c/upstream/src/mon.c:5276–5535` (csym range), order
region `:5399–5532` verified call-for-call:

- Light/invis/hideunder (`:5399–5412`) split verbatim into
  `newcham_light_invis` ✓.
- Ustuck `:5413–5450`: `u.ustuck == mtmp` gate ✓; swallowed +
  `!attacktype(mdat, AT_ENGL)` → noisy break-out (`You`, `mhp = 1`,
  `expels`, SHOW_MSG consumed via `msg = FALSE` → `{consumed:true}`) vs
  silent `expels` for noncorporeal/whirly/amorphous/S_LIGHT ✓;
  `expels(mtmp, olddata, FALSE)` unconditional in both sub-arms ✓;
  msgtrail vampshifter/`digests`/empty triple ✓; AT_ENGL-kept form →
  `swallowed(0)` repaint ✓; grab release `(!sticks(mdat) &&
  !sticks(youmonst)) || unsolid(mdat) → unstuck(mtmp)` — exact,
  including `unstuck` (not `uunstick`) per C's sequencing comment ✓.
- Worm `mdat == &mons[PM_LONG_WORM]` → `mndx === pm('LONG_WORM')`
  (D-2259 precedent) + `rn2(5)` + newsym ✓.
- SHOW_MSG now after newsym and skipped when consumed
  (`if (msg && !consumed)`) ✓; vampire cham after the pline ✓ (`!pfsc`
  mapping pre-existing, unchanged); `possibly_unwield` `:5484` →
  `mon_break_armor` `:5485` → `!(misc_worn_check & W_ARMG) →
  mselftouch(prefix, !mon_moving)` `:5486–5488` → `check_gear_next_turn`
  `:5489` → boulders → `poly_steed` → Elbereth/monflee — C order exact ✓.
- `l_oldname` now computed unconditionally per C ("we need this one
  whether msg is true or not"), same `SUPPRESS_SADDLE` gate ✓.
- RNG: `rn2(5)` worm only; order preserved.

Helper classification (all `sym.mjs`, LIVE unless noted):

- `expels` mhitu.js:1699 ASYNC awaited ✓, `unstuck` mhitu.js:1672 ASYNC
  awaited ✓, `digests` mhitu.js:1105 sync ✓, `mselftouch` trap.js:1197
  ASYNC promise-chained ✓, `You` zap.js:859 ASYNC awaited ✓,
  `swallowed` display.js:5075 sync ✓.
- `sticks` ← `engrave.js:361`: CORRECT choice. It carries the C-locus
  doc (`mondata.c sticks`, STCK || (WRAP && !ENGL) || HUGS) and warns off
  `monmove.js` sticks (mis-numbered AT_HUGS/AT_ENGL). `sym.mjs` reports
  `sticks: js/engrave.js:361 sync / js/monmove.js:1664 sync — multiple
  exports — import the C-locus one`; this commit imports the C-locus one.
- `AT_ENGL = 11` local: verified against pinned
  `nethack-c/upstream/include/monattk.h:21` (`#define AT_ENGL 11` —
  3.7 numbering, not classic 9). Matches `monmove.js:153` precedent.
- `attacktype` used is the pre-existing makemon.js:2688 local
  (`mondata.h attacktype` doc), untouched by this commit.
- Banned-pattern grep on added lines: zero hits. D-1648 sync-boolean
  contract preserved (null | {consumed} | Promise fan-out).

## Hallucinations / overclaim

None. "No DIAG/FORCE/seed logic; Rule #2 clean" verified true.
"Named: none inside the function" accurate; caller-function gaps
(vamp_shift, engulfer-digest, D-2249 fixup) disclosed as staying named.

## Density

One C function, one JS module, +209/−74 net. Whole-body claim holds:
every arm of `:5399–5532` is live in the new chain; the pre-`:5399`
regions (rider/shapechanger gates, oldname/l_oldname, random-form retry)
were already live and are untouched.

## Verification

D-log: `verify.mjs --fn newcham` → syntax · rule2 · hidden note (0
blocked) · REACH smoke 24/24 · green 2/2 · strict ×2 · cohort 7/7 ·
full 44/44 · PASS. Independent re-measure on this SHA:

- `hidden-proxy.mjs verify newcham --base acf54d66~1 --reach-all` →
  `0 session(s) blocked` (vacuous, as logged) +
  `smoke newcham: no RNG-tagged reach; fixed smoke spread (24 run,
  5.2s): 24 PASS, 0 regressed → REACH-OK`. Confirms the D-log.

Nit (not a C-wrong): the `newcham_ustuck` doc phrase "or the new form
is unsolid-proof" reads backwards against its own code — the code
(`|| unsolid(mdat)` → release) matches C. Comment-only.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
