# Review 1215 — 8a595f61 — splev create_monster M_AP_MONSTER arm (D-2249)

Metadata: SHA `8a595f61` (D-2249). Queue row `sp_lev.c`
special-level shapeshifter fixup (second `select_newcham_form`
caller), no corpus block. js/ mklev.js +142/−? (new fixup +
plumbing + imports) and makemon.js +4/−2 (one-word export).

## Intent vs deliverable

Subject promises the M_AP_MONSTER appear_as fixup
(`sp_lev.c:2002–2123`) as a same-file local with dormant
`opts.appear/appear_as` plumbing, FURNITURE/OBJECT left
named, plus the `mgender_from_permonst` export. Diff adds
exactly that. Promise kept.

## Inventory

New: `splev_create_monster_appear_fixup` (module-local —
correct shape for C's same-file `create_monster` body, not
a clone). Changed: `splev_create_monster` (opts plumbing +
pre-female-clobber call), map comment (MONSTER live,
FURNITURE/OBJECT still named with the hand-rolled live
paths cited). Re-pointed: `mgender_from_permonst` local →
export — `sym.mjs`:

```text
mgender_from_permonst js/makemon.js:1438   sync
```

Single definition, no clone #2. Callee closure for the
shipped arm — all LIVE: `select_newcham_form`,
`name_to_mon`, `validvamp` (writes back via `{ mndx }`,
matching its `(mon, mndx_p, monclass)` signature),
`is_vampshifter`, `mgender_from_permonst`,
`set_mon_data`, `emits_light`/`new_light_source`/
`del_light_source`, `monst_to_any`, `does_block`/
`block_point`, `impossible`. New names join ALREADY edges
(`--can` re-run here: light.js, hack.js both ALREADY — no
new edge, no TDZ question). FURNITURE/OBJECT callees are
OMIT (map-named in-commit with C cites), not STUB.

## C ↔ JS fidelity

- Gate vs `:2002–2006`: C `appear_as.str` defaults NULL
(`:3228`) so `if (!appear_as) return` is exact; mimic /
cham-shifter-MONSTER / `Protection_from_shape_changers`
gate matches (flat `u.*` disjunct is the house-wide
fallback idiom, cf. monmove/display/do_wear/cmd).
- MONSTER vs `:2063–2112`: `random` strcmpi → reroll via
the new caller, else `name_to_mon(str, {gender:NEUTRAL})`
(C `= NEUTRAL` init); `NON_PM`/vampshifter-`validvamp`
→ impossible with the 4-kind nested ternary in C order;
pointer-identity `&mons[mndx] == data` as index compare
(`mons()` is fresh per call — probe-caught, cited);
self → NOTHING/0; mimic/Wizard → MONSTER wear; else
`mgender_from_permonst` + gender box + `set_mon_data` +
light swap (arg order verbatim) + perminvis via
`pm_invisible` (macro is exactly STALKER||BLACK_LIGHT,
`mondata.h:192–193`). RNG order kept: fixup runs before
the `:2125` female clobber like C.
- `select_newcham_form` is sync but returns a Promise on
the wizard path (makemon.js:1402–1408) — thenable→NON_PM
is a real, named handling, not dead code.
- NOTHING/default impossibles verbatim; trailing
`does_block` uses placement coords (boulder re-placement
deferred with the OBJECT arm, so `mx/my` ≡ C `x/y`).

## Hallucinations / overclaim

None. "Live but dormant" is structural (early return on
`''`; no caller passes the opts), and hidden is labeled
vacuous, NOT a PASS.

## Density

~146 insertions for one C switch arm + 4 sub-arms with
per-arm cites. In-band.

## Verification

Audit re-ran the corpus claim itself:

```text
verify select_newcham_form: baseline 8a595f61~1 — 0 session(s)
blocked (0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed, exactly as labeled. Green 2/2 +
strict ×2 + cohort 7/7 + full 44/44 pasted. Diff grep: no
FORCE/DIAG/seed/coordinates. Rule #2 clean (re-run here,
repo-wide).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
