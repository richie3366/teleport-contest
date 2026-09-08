# Review 1025 — df50c05e — readobjnam spe/corpsenm writer + oname PL_PSIZ (D-2055)

Metadata: SHA `df50c05e`, D-2055, Open-row port
(queue owner `readobjnam`, RNG-first, 3 sessions).
js/ touches 2 files: `readobjnam.js` (+158/−3),
`do_name.js` (import swap + const delete). No
stamp owed.

## Intent vs deliverable

Subject promises: full C spe switch in exact C
order before the recharged hunk, full corpsenm
writer per otyp, PL_PSIZ 32→63 in oname. Diff
actually adds all three (3 hunks: imports,
consts, one body insert). Promise ≡ diff.

## Inventory

- Changed JS: `readobjnam` (`js/readobjnam.js:
  1037+`); `oname` path (`js/do_name.js`) drops
  the shadowing `const PL_PSIZ = 32` for the
  `const.js:959` 63 (C `global.h:404`; both
  `name_from_player` and `oname` are PL_PSIZ
  sites — the 32-shadow truncated 37-char
  artifact wishes so `artifact_exists` never
  matched, exactly Priest-92136's symptom ✓).
- `sym.mjs`: `set_corpsenm js/mkobj.js:1342
  sync`, `mons js/monsters.js:201 sync`,
  `G_UNIQ monsters.js:73`, `CORPSTAT_RANDOM
  const.js:1839`, `genus/dead_species/
  can_be_hatched js/mon.js:385/601/569 sync`,
  `counter_were js/were.js:120 sync` — all LIVE.
  `MS_GUARDIAN=38` file-local matches C
  `monflag.h:53` ✓.
- No symbol deleted or re-pointed (`sym.mjs` run
  on the removed local: nothing imported it —
  it shadowed).

## C ↔ JS fidelity

C locus `objnam.c:5119-5370` (spe switch head
`:5123-5191`, corpsenm writer `:5193-5259`,
deny check `:5373-5381` read directly).
Arm-by-arm confirm:

- TIN (0 + EMPTY/SPINACH contents),
  TOWEL wetness, KEY/CHEST/BOX/BALL/CHAIN retain,
  SCR_MAIL + venoms spe=1, WAN_WISHING
  non-wizard `rn2(10)?-1:0` else fallthrough to
  `d.spe` — all verbatim, C order kept ✓.
- STATUE/FIGURINE/CORPSE gender: `!P→RANDOM`,
  neuter-forces-NEUTER, mgend-honor unless
  conflict, RANDOM→male/female/`rn2(2)`,
  `ishistoric` STATUE-only HISTORIC bit ✓
  (`:5151-5166` line-for-line; `:5163` rn2(2)
  is two blocked sessions' first draw ✓).
- SLIME_MOLD: C sets `spe=d.ftype` then
  FALLTHROUGH; JS breaks (retains mksobj spe).
  Justified deferral, disclosed twice
  (in-comment + map): `d.ftype` is never parsed
  by the JS preparse (reads C-default
  current_fruit), so a literal port would write
  garbage; mksobj spe is the sane retain. OMIT
  with C citation, not a wrong.
- Corpsenm writer: LONG_WORM_TAIL remap,
  were→human `counter_were` with the FIGURINE
  carve-out, TIN (`dead_species`/uniq/nocorpse/
  cnutrit), CORPSE (`set_corpsenm` + guardian
  `genus`), EGG (`can_be_hatched`), FIGURINE
  (uniq/human/were/MAIL_DAEMON), STATUE direct,
  SCALE_MAIL untouched in its hunk ✓ — every arm
  matches `:5195-5259`.
- Wish-prefix fields (`tin of`/`of`, mgend,
  ishistoric, wetness, ftype, contents, zombify)
  read C-defaults: the preparse never sets them,
  so both sessions' corpse wishes take the same
  branches as C-without-prefixes. Disclosed ✓.

Debt (pre-existing deny check, `readobjnam.js:
1224-1228`, untouched by this diff — hence debt,
not a Must-fix): C `:5373` denies when
`is_quest_artifact(otmp) || (oartifact &&
rn2(nartifact_exist())>1)`; JS lacks the first
disjunct, so a non-wizard quest-artifact wish
draws one extra `rn2` in JS (and can grant what
C denies). Wizard-mode draws are identical, as
stated. Map-named with C citation + future-row
promise (turns.md, this commit) — a named omit
by the rules. Same-family note for that row:
the deny path also never ported C's
`artifact_exists(...,FALSE)` bookkeeping or the
"For a moment, you feel … but it disappears!"
pline (`:5375-5380`, absent since D-0064) —
worth folding into the same future row.

Callee closure: every new callee LIVE and
correctly awaited-or-sync; SLIME ftype /
zombify timer / delete_contents are in-comment +
map-named omits.

## Hallucinations / overclaim

None. The wish-mode draw parity ("identical
draws in wizard mode") is precisely scoped, and
the non-wizard divergence is disclosed rather
than buried.

## Density

+161/−... across one function + one const fix;
the const fix IS the third session's cause
(truncation), not padding. >250-insertion
ceiling not triggered. Right-sized cluster.

## Verification

- Diff-hunk grep: zero FORCE/DIAG/getRngLog/
  seed/fastforward hits in code.
- Re-measured `hidden-proxy verify readobjnam
  --base df50c05e~1`: `0 PASS, 3 moved past,
  0 unchanged, 0 worse → PROGRESS` (92148 →
  inuse_classify@241 was 59; 92136 →
  dump_artifact_info@126 was 125; 91119 →
  goodpos@67 was 59) — matches the D-log
  owner-for-owner, step-for-step.
- Green 2/2 + strict ×2, cohort 7/7 per pasted
  `verify.mjs` tail.

## Actionable C-wrongs

1. (Debt, map-named — no Must-fix) Deny-check
   `is_quest_artifact` short-circuit + deny
   pline/bookkeeping: one-export +
   one-disjunct port, queueable in one iter;
   extend the turns.md row when popping.

Verdict: **ACCEPT-WITH-DEBT**
