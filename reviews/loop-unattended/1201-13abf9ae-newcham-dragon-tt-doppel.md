# Review 1201 — 13abf9ae — newcham NON_PM dragon arm + tt_doppel RECORD

Metadata: SHA `13abf9ae` (D-2235). Queue row `mon.c` newcham wizard arms,
no corpus block. js/ makemon.js +73/−? (dragon arm, classmon, RECORD
branch, three import names on ALREADY edges).

## Intent vs deliverable

Subject promises the NON_PM dragon-armor ordinary arm and the RECORD
`tt_doppel` body, with wizard `mon_polycontrol` staying named (async
`getlin` through sync select + unported callees — sound reason).
`which_armor` is the pre-existing LIVE import (worn.js:403, already at
makemon.js:11), not another clone. Promise kept.

## Inventory

New: `classmon` (module-local — correct, C `topten.c:1355` is staticfn
with one caller). Changed: `select_newcham_form` NON_PM arm, `tt_doppel`
RECORD branch. `sym.mjs` output adjudicated here:

```text
Is_dragon_scales NOT EXPORTED — 1 LOCAL CLONE: js/makemon.js:431
Is_dragon_mail   NOT EXPORTED — 2 LOCAL CLONES: js/artifact.js:2141, js/makemon.js:435
which_armor      js/worn.js:403 sync (+2 unrelated pre-existing locals)
classmon         NOT EXPORTED — 1 LOCAL CLONE: js/makemon.js:1073
```

The makemon `Is_dragon_*` pair are verified CLONEs (matched to C below),
not drift — but they are the 2nd/3rd copy of the same 3-liner in js/
(artifact.js:2141, do_wear.js consts). Consolidation debt, not a C-wrong:
no canonical export exists to import, and the arm needs the
scales-vs-mail branch (an `Is_dragon_armor` import alone would not
serve). `roles`/`impossible` join ALREADY edges (no new module edge).

## C ↔ JS fidelity

NON_PM arm vs `mon.c:5198–5207`: `which_armor(mon, W_ARM)`,
scales-then-mail order, `Dragon_scales_to_pm` =
`&mons[PM_GRAY_DRAGON + otyp − GRAY_DRAGON_SCALES]` (`obj.h:353–356`).
JS `pm('GRAY_DRAGON') + (otyp − base)` is exact index arithmetic on the
same generated table — no contiguity assumption beyond C's own. No-match
falls through to the random arm both sides. Clones vs `obj.h:347–351`:
range checks identical to the macros.

classmon vs `topten.c:1355–1375`: ROLESZ 3-byte compare ≡ `slice(0,3)`
compare for all real inputs (NUL-pad mismatch behaves the same — a short
`plch` never equals a 3-char filecode on either side); `mnum != NON_PM ?
mnum : HUMAN`; legacy exact `"E"` → RANGER; else impossible +
HUMAN_MUMMY. `roles[].filecode`/`mnum` fields verified present
(roles.js). Exact.

tt_doppel vs `topten.c:1444–1464`: `rn2(13)` first (footprint preserved;
RECORD arm unreachable while `get_rnd_toptenentry` is null, same as C
with empty RECORD), plgend F/M, `classmon`, canseemon-gated christen —
C order, with the Kes comment carried.

## Hallucinations / overclaim

None. sym.mjs clone warnings are real duplication but C-matched; the
D-log does not claim imports it didn't add.

## Density

One family, one module, code + map + verify. Right-sized.

## Verification

Audit re-ran the corpus claim itself:

```text
verify tt_doppel: baseline 13abf9ae~1 — 0 session(s) blocked on it
(0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed, exactly as labeled. Green/cohort/full gates pasted
in D-log. Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/
coordinates. Rule #2 clean (re-run here, repo-wide).

## Actionable C-wrongs

None. (Debt, not queueable: consolidate the three `Is_dragon_*` copies
behind one export when a touching iter has reason to.)

Verdict: **ACCEPT**
