# Review 1174 — 5112743c — innategend saved gender when poly'd (D-2208)

Metadata: SHA `5112743c`, `js/invent.js` only (two hunks, both
builders), D-2208. Queue row `enlightenment` (scen-poly-Monk-92213
step 108/119: identical toplines, row 4 C «... level 1 male human
Monk.» vs JS «... female ...». Screen-only, 0 blocked RNG).

Intent vs deliverable: subject promises role/rank/gender reading
saved `u.mfemale` when poly'd. Diff actually adds
`innateFemale = Upolyd(u) ? !!u.mfemale : female` in `enlightenment`
and `doattributes`, re-pointing role/rank/gender/innategend at it.
Promise == diff.

Inventory: two edited builders, one new local each. No new imports
(`Upolyd` already file-live at `js/invent.js:271`), no helpers, no
stubs. Both menu titles build from the same `${role}` variable
(`js/invent.js:5200,5996`), so the `:398` title expression is fixed
through the same re-pointing — confirmed by grep, not assumed.

**C ↔ JS fidelity**: exact confirm vs `insight.c:470–479` and the
title `:394–401` (bodies read):

```c
/* note that if poly'd, we need to use u.mfemale instead of flags.female
   to access hero's saved gender-as-human/elf/&c rather than current */
innategend = (Upolyd ? u.mfemale : flags.female) ? 1 : 0;
role_titl = (innategend && gu.urole.name.f) ? gu.urole.name.f
                                            : gu.urole.name.m;
rank_titl = rank_of(u.ulevel, Role_switch, innategend);
```

JS is the same expression in the house `Ugender` idiom (cf.
display/polyself/do_name per message): role title follows
innateFemale, `rank_of(ulevel, mnum, innateFemale)` matches
`:479`. Saved-gender source verified live: `u.mfemale` is maintained
in `js/polyself.js:654,1099` (toggle on form change + save). Equally
important is what the diff does NOT re-point: the Upolyd form arm
(`:490–508`, "here we always use current gender, not saved role
gender" at `:496`) keeps `flags.female` — the message's claim
checked against C `:496–506` (`genders[flags.female ...]`,
`pmname(..., flags.female ? FEMALE : MALE)`), and the diff leaves
those lines untouched. Non-poly behavior is bit-identical
(innateFemale ≡ female when `!Upolyd`), so all non-poly disclosure
sessions are provably unaffected. No RNG either side of this path.

Hallucinations / overclaim: none. No callee, no stub, no deferred
arm smuggled in. The Named list (difgend/difalgn temp-align arms,
overlay background arms) is map debt with a stated falsifier
(`ualignbase` untracked), correctly kept out of Must-fix. No
FORCE/DIAG/seed reads.

Density: 6-line C locus mirrored in two builders — minimal; small
because C is that small.

Verification: D-log Verify bullet shows hidden PROGRESS
(108→chwepon@109) + green 2/2 + strict + cohort 7/7. Re-measured
myself:

```text
verify enlightenment: baseline 5112743c~1 — 1 session(s) blocked
  scen-poly-Monk-92213: moved → chwepon at step 109 (was 108)
0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
```

Strictly later step, different owner, nothing worse — not vacuous
(the baseline had the session blocked at 108). The residual owner
(chwepon@109) is already the Open head row; no duplicate enqueue.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
