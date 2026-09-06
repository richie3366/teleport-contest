# Review 895 — 7571aee9 — explode remaining arms (D-1925)

Metadata: SHA `7571aee9`, D-1925. Files: `js/explode.js`
(+155/−23: mdef credit, grab arms, hallu renames, Invulnerable,
monstsee, TRAP killer, fatal It/The, impossible diagnostics).
Map-driven Open row, 0 corpus blocks cited. Next index 895.

Intent vs deliverable: subject promises mdef credit, grab
double-damage, hallu renames, Invulnerable, monstsee, TRAP killer
wording, fatal It/The, and impossible diagnostics. The diff
delivers all eight arms in C order; nothing else. Promise ≡ diff.

Inventory: two file-local helpers — `Invulnerable()` (macro
reader; `youprop.h:73` confirms intrinsic-only, exact) and
`next2u()` (4th repo copy, but `mon.js:877` is file-local so not
importable without touching another module; bodies identical and
C-exact — clone debt, not a C-wrong). `sticks` correctly takes the
`engrave.js:345` export (`sym.mjs sticks` shows two exports; the
engrave one is the C-shaped `mondata.c` port with a documented
do-not-use-monmove note — verified, not a mis-pick). All other
callees LIVE (`sym.mjs uhim` → `js/roles.js:710 sync`,
`rndmonnam` → `js/do_name.js:287 sync`, plus
`strstri`/`dist2`/`monstseesu`/`monstunseesu`/
`cvt_adtyp_to_mseenres`); every new edge ALREADY exists per
`--can` (engrave, roles, mondata, hacklib — no new cycle). No
stub, no new omit (Underwater/Unaware, golemeffects,
rehumanize-fatal, resists_magm scan, Role_switch tail — all named
at pre-existing docs).

**C ↔ JS fidelity** (`explode.c:199-696`, read directly since
`csym` has no `explode` definition): expltype-negation + mdef
(`:264-269`), grab setup with grabxy-zero init (`:275-284`),
killer copy + `do_hallu` gate (`:298-305`), `abs(type)%10` switch
with impossible+return default (`:306-352`; the old silent-MAGM
fixed), per-target 20-try + hero unbounded renames (ASCII A-Z
check ≡ C `lowc` semantics for `rndmonnam` output), monster
`grabbed`×2 in position (`:543-544`), mdef NOMSG/NOCONDUCT arm
with its own message (`:562-576`), verbose + `last_msg`
(`:595-603`), `Invulnerable → damu=0` before the PHYS/ACID
else-if (`:608-610`), hero `grabbing`×2 off `grabxy` not `ustuck`
(`:624`), monstsee pair — `monst.h:92` shows the `_ad` macros
expand to exactly the shipped calls — TRAP `in a` + own-blast
`uhim/uhis` (`:651-660`), fatal It/The on `last_msg`
(`:668-672`), `!str_is_hallu` as the faithful value-semantics
adaptation of C's `str != hallu_buf` pointer check. RNG order
preserved (rename draws at C positions; probe confirms the hero
loop terminates on real display-RNG draws). Tower/fireball `===`
vs C `strcmpi` is equivalent (only lowercase adstr literals reach
that arm). The probe is a true falsifier (grabbing×2 exactly once
via `mh`, CAUGHT stamps, bad-type early return) with honest
harness notes.

Hallucinations / overclaim: none. No corpus claim; probe limits
labeled as harness fixes, not port fixes.

Density: 178 lines, one function envelope — a single locus,
justified per §2b.

Verification: re-measured `hidden-proxy verify explode --base
7571aee9~1` → `0 session(s) blocked on it (0 at baseline, 0 in the
working scoreboard)` — vacuous as stated, nothing owed.
`imports.mjs --rulecheck` → Rule #2 clean (HEAD). D-log gates:
green 2/2 + strict ×2, cohort 7/7. Diff grep: no FORCE/DIAG/seed/
coordinate patterns.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
