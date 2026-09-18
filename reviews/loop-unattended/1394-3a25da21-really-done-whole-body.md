# Review 1394 — 3a25da21 — really_done whole body in C order (D-2435)

- Commit: `3a25da21` — "`end.c` really_done whole body in C order (coverage THIN → live) (D-2435)."
- Files: `js/end.js` only (+117/−38 eff.); docs + map + queue pop.
- D-log: D-2435. Queue row popped: `end.c` really_done THIN (C 460 L / JS 189 L).

## Intent vs deliverable

Subject promises the portable remainder of `really_done` in C order:
achievements, `finish_paybill`-before-grave+score reorder, grave
epitaph/emptygrave, ascension bonus, `_done_money` site, killer suffix.
Diff delivers exactly that, plus the NOCORPSE-on-`umonnum` fix (old code
read race-mnum when poly'd; C reads `u.umonnum`). Promise matches
deliverable.

## Inventory

Changed JS: `really_done` only (plus import/const additions). No symbol
deleted or re-pointed (`finish_paybill` local pre-existed; only its call
site moved). Required `sym.mjs` delete/re-point check vacuous; ran it on
the new callees anyway (below).

## C ↔ JS fidelity

C locus `end.c:1130–1590` (csym), verified region by region:

- Achievements `:1173–1183`: `uachieved[0] || !beginner` gate, blind/nudist
  via uroleplay, ASCENDED→UWIN last, before first-move pline ✓ exact.
- `finish_paybill` moved to post-disclosure/pre-grave+score with the
  `bones_ok && taken` gate ✓ (C comment rationale preserved: it moves
  invent gold / drops invent).
- Grave `:1300–1319`: `bones_ok && arise == NON_PM &&
  !(mvitals[umonnum] & G_NOCORPSE)` ✓ (NOCORPSE now on `u.umonnum` per C —
  old race-mnum read fixed); `mnum = !Upolyd ? race.mnum : umonnum` ✓;
  `"plname, " + formatkiller(how, TRUE)` epitaph via live same-file
  `formatkiller` ✓ (replaces the fixed `"killed"` stub);
  `emptygrave = 1` → JS `.flags = 1`, the established encoding
  (`dig.js:1884` "C emptygrave ≡ flags", cleared via `flags = 0` in
  dig/dokick) ✓; `was_already_grave` gate ✓.
- Score `:1321–1349`: pre-existing umoney/hidden-gold/tithe/depth arms
  untouched ✓; ascension gate `align.type == alignbase[A_ORIGINAL]` on the
  `{current,original}` JS shape ✓; `current == original ? urexp :
  trunc(urexp/2)` with `Math.trunc` for `/2L` ✓; `nowrap_add` ✓.
- `corpse = null` after `savebones` with C's invalid-pointer comment ✓;
  `gd.done_money = umoney` at the post-savebones site ✓.
- Suffix `:1400–1411`: append semantics (`Strcat` → template append) ✓;
  Amulet / ESCAPED-astral-disgrace / fake-Amulet order ✓ via live
  `carrying` + `Is_astralevel` + `uhave.amulet`.
- Helper classification, all LIVE: `carrying` hack.js:2969 sync ✓ (canonical
  import; dog/quest/shk clones pre-existing, untouched),
  `record_achievement` insight.js:336 sync, called plainly, gameover-quiet
  ✓, `formatkiller` end.js:494 sync same-file ✓, `make_grave`
  engrave.js:223 sync ✓, `finish_paybill` end.js:1229 (C staticfn, same-file
  — `sym.mjs` "clone #2" flag is the port itself). New edges join existing
  ones (`record_achievement` ALREADY; `carrying` IN-SCC hoisted, call-time
  use — no TDZ read). `FAKE_AMULET_OF_YENDOR` follows the file's
  `indexOf` const convention. Banned-pattern grep on added lines: 0 hits.
- Named omits (map-kept): dumplog family (D-1776 retired), livelog/logfile,
  signals/windowing, sound lib, pre-existing cleanup gaps. Complete and
  honest; platform-only or previously named.

## Hallucinations / overclaim

None. "0 blocked at baseline" + "hidden note" framing is honest;
scoreboard timestamp churn explicitly reverted. No dispatch-vs-callee
gap (all new callees live).

## Density

One C function, one module, +117/−38. The C:JS line ratio stays wide
only because C carries platform/windowing/dumplog arms, all named.
Every portable arm is now live.

## Verification

D-log: `verify.mjs --fn really_done` → syntax · rule2 · hidden note ·
smoke 24/24 · green 2/2 · strict ×2 · cohort 7/7 · PASS. Independent
re-measure on this SHA:

- `hidden-proxy.mjs verify really_done --base 3a25da21~1 --reach-all` →
  `0 session(s) blocked` (vacuous, as logged) +
  `smoke really_done: no RNG-tagged reach; fixed smoke spread (24 run,
  3.4s): 24 PASS, 0 regressed → REACH-OK`. Confirms the D-log. (Deaths
  in sessions exercise the DIED path end-to-end through these gates.)

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
