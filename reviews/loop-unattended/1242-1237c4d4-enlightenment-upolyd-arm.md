# Review 1242 — 1237c4d4 — enlightenment Upolyd arm + set_uasmon INFRAVISION

- SHA: `1237c4d4` — "`insight.c` attributes_enlightenment Upolyd
  foreign-shape arm + `polyself.c` set_uasmon INFRAVISION FROMFORM (D-2276)"
- D-log: D-2276. Queue row: `insight.c` attributes_enlightenment Upolyd
  foreign-shape arm (2 corpus blocks under recorded owner chwepon).
- Character: corpus-moving port (2 row sessions + 1 bonus PASS).

## Intent vs deliverable

Subject promises: the Upolyd foreign-shape arm verbatim in C position in
both builders plus the INFRAVISION PROPSET in `set_uasmon` with the race
fallback gated on `!Upolyd`. Diff actually adds exactly those three hunks
plus the `monsterNames` import widening. Promise matches diff exactly.

## Inventory

- Changed JS: `enlightenment` final builder (`js/invent.js:5688-5703`);
  `doattributes` MAGIC builder (`js/invent.js:6513-6527`); `set_uasmon`
  (`js/polyself.js:678-680`); infravision fallback gates (`:5570`,
  `:6381`); `PM_GREEN_SLIME` const via `monsterNames.indexOf` (same pattern
  as eat/end.js — generated table exports no such const).
- No `sym.mjs` paste owed: no symbol deleted or re-pointed
  (`infravision`/`INFRAVISION` join existing static imports; `monsterNames`
  widens an existing generated import; the dynamic `monsters.js` import
  mirrors the pre-existing fallback pattern).
- No new module edges (all names join existing static imports) — confirmed
  by inspection of the import hunks; nothing to `--can`.

## C ↔ JS fidelity

C loci: `attributes_enlightenment` `insight.c:1486-2005`, shape-change arms
`:1834-1894` (read directly); `set_uasmon` PROPSET `polyself.c:92`.

- Final builder: `Upolyd && umonnum != (ulycn ?? NON_PM)` with the
  GAMEOVERDEAD slime exclusion ≡ C `Upolyd && u.umonnum != u.ulycn &&
  !(final == ENL_GAMEOVERDEAD && u.umonnum == PM_GREEN_SLIME &&
  !Unchanging)`. `?? NON_PM` covers JS-undefined only (C `ulycn` is NON_PM
  when absent). `u.Unchanging||H||E` ≡ C `Unchanging` (`youprop.h:372`
  `HUnchanging || EUnchanging`; flat `u.Unchanging` is the documented house
  idiom, timeout.js:133, used identically in eat/allmain/hack/fountain). ✓
- vampshifted cham branch, `flags.female` (in-scope `female` local, D-2208),
  wizard `(mtimedone)` (`wiz`/`wizard` locals confirmed in both builders),
  `you_are`/`"are"` by final, position after Polymorph_control before the
  `ismnum(ulycn)` were-form — C order verbatim. The MAGIC builder omits the
  slime exclusion (statically dead at final==0), noted in the comment. ✓
- `lays_eggs` between the arm and were-form stays deferred and named; the
  Unchanging/Polymorph blocked-shape arms stay deferred and named. ✓
- `set_uasmon`: `propset_fromform(INFRAVISION, 'HInfravision',
  infravision(Upolyd(u) ? mdat : mons(race)))` ≡ C `:92`
  `PROPSET(INFRAVISION, infravision(Upolyd ? mdat : &mons[urace.mnum]))`
  verbatim, in C PROPSET position (before TELEPORT). `propset_fromform`
  sets/clears the FROMFORM bit on intrinsic + H-field (≡ C PROPSET). ✓
- Fallback gates: C disclosure tests `Infravision` ≡ `H||E`
  (`youprop.h:186`) with no race read — JS now matches by skipping the race
  fallback when poly'd (else a poly'd elf/orc keeps a row C clears) while
  `set_uasmon` supplies the form bit. ✓ No RNG in any arm.

No C-wrong. The remaining `set_uasmon` PROPSETs and MAGIC-builder
were-form/Hate_silver are named and pre-existing.

## Hallucinations / overclaim

None — and this is the commit where overclaim would matter most. Every
corpus claim checks out (see Verification).

## Density

~66 insertions for one disclosure arm × two builders plus one PROPSET line,
one falsifier (poly'd disclosure rows). Right-sized.

## Verification

- Re-measured: `node scripts/hidden-proxy.mjs verify chwepon --base
  6106e47d` → "2 session(s) blocked on it (2 at baseline, 0 in the working
  scoreboard): scen-poly-Monk-92213 PASS, scen-poly-Samurai-91106 PASS → 2
  PASS, 0 worse → PROGRESS". The D-log's PROGRESS claim is TRUE.
- Bonus claim: the committed `hidden-corpus/scoreboard.json` delta shows
  exactly 3 `passed false→true` flips (the 2 row sessions +
  scen-intrinsic-Caveman-92138) and 0 `true→false` flips — "REGRESSED:
  none" confirmed from the artifact, not just the prose.
- Diff-hunk grep clean; `imports.mjs --rulecheck` clean (re-run review
  1239). D-log cites green 2/2 + strict ×2 + cohort 7/7 + hand full 44/44;
  the end-of-iteration cadence run re-covers the fortress.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
