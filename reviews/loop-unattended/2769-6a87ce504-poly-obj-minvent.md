# Review 2769 — 6a87ce504 — poly_obj minvent/contained swap + whole-body arms

- SHA: `6a87ce504` (D-3916)
- Scope: `js/mkobj.js` +44/−4 (callee), `js/zap.js` +216/−~130
  (writer, mostly reindent), 1 test, ledger `mkobj.c.jsonl` + `zap.c.jsonl`
- Method: cliff commit (1 C function family + its callee); full Method
  per function + re-measure

## Intent vs deliverable

Promise: cliffs-head `monmove.c` dochug (Samurai-587214 s1045,
rng-first) is downstream of a silent-state writer: the tame dwarf's
iron shoes vanished at s1033 (o_id census: exactly one delta, zero RNG)
through mintrap→trapeffect_poly_trap→poly_obj→delobj→obfree — the
minvent arm deleted instead of polymorphing to KICKING_BOOTS, so C's
`!wearing_iron_shoes` gate (measured via temp C dump: trap scanned,
never used, polyuse 0) held in C but not JS, and JS took a
MUSE_POLY_TRAP cham at s1045. Claimed: probe PASS.

Diff actually adds: (mkobj) `replace_object` OBJ_CONTAINED +
OBJ_MINVENT predecessor-splice arms, FREE/exotic else documented;
(zap) poly_obj: boulder `sokoban_guilt`, SCR_MAIL arm, leash transfer
(+`o_unleash` import), spestudied degrade (+`MAX_SPELL_STUDY`), gem
backfire, unconditional `replace_object` + unconditional billing in C
order with the INVENT/FLOOR/billing bodies reindented unchanged
(`-w` diff: 49+/15−) and the orphan minvent/contained
delobj-early-return else removed. Plus LEASH const + test.

## Inventory

- `replace_object` (js/mkobj.js:3679): C mkobj.c:640–679 (`csym`
  range). Changed: 2 arms + else.
- `poly_obj` (js/zap.js:5398): C zap.c:1701–1989 (`csym` range).
  Changed: 5 arms + tail restructure.
- New imports: `sokoban_guilt` (trap.js, pre-existing module edge),
  `o_unleash` (apply.js — `imports.mjs --can`: ALREADY, no new edge),
  `MAX_SPELL_STUDY` (const.js). No symbols deleted or re-pointed.

## C ↔ JS fidelity

`replace_object`: JS sets `otmp.where` first (:643 ✓), and the new
CONTAINED/MINVENT arms reproduce C's net swap (otmp takes obj's slot
via predecessor relink = C's splice-then-`extract_nobj`; obj detached).
FREE no-op ✓; exotic default → documented OBJ_FREE fallback instead of
C's `panic` (unreachable for valid callers, named in the D-log —
acceptable house shape). Arm-for-arm mapping unambiguous
(ocontainer/cobj vs ocarry/minvent).

`poly_obj`, new arms vs C, in C order: boulder guilt at top (:1710–
1711 ✓, before the STRANGE branch); SCR_MAIL after invlet (:1746–1753
✓, `MAIL_STRUCTURES` confirmed defined at global.h:430); leash
transfer before Has_contents (:1814–1823 ✓, comment + clear-before-
delobj shape exact); SPBOOK degrade after the SPE_POLYMORPH reroll
(:1871–1880 ✓, `> MAX` → BLANK + `rn2(spestudied)`); GEM backfire
(:1883–1890 ✓ — `rnd(4)` unconditionally drawn as C's right operand,
`Math.trunc` = C long `/2`). Tail: ox/oy via pre-existing
`get_obj_location(obj, BURIED_TOO|CONTAINED_TOO)` (C :1900 ✓, now
serving minvent/contained billing too), unconditional `replace_object`
(C :1903 ✓), INVENT/FLOOR/billing bodies byte-identical modulo indent
(`-w`), common `delobj(obj); return otmp` (C :1987–1988 ✓). Callee
closure: `sokoban_guilt` LIVE (js/trap.js:1722, conduct+luck, no
RNG/print — C trap.c:7037–7055 ✓); `o_unleash` LIVE
(js/apply.js:1503, fmon scan + mleashed/leashmon clears +
update_inventory — C apply.c:710–722 ✓), correctly the export rather
than the eat.js clone. RNG call-for-call: only the two C draws added.

Cite drift (not a C-wrong, one line): the new JS comments cite
`replace_object` arms ~5 lines high (CONTAINED is :653–658 not
:658–663; MINVENT :659–664 not :665–669; function :640–679 not
:641–680), and poly_obj :1701 not :1702. The implemented arms are the
right ones; cites are housekeeping, explicitly not queue evidence.

## Hallucinations / overclaim

None. "poly_obj now whole" is earned: every former named omit in the
old doc comment (guilt/egg-leash/gem/spestudied/boulder-block) now has
its C arm, and the orphan else is gone. The deep causal chain
(shoes→gate→cham) is measured at every link (o_id census, DIAG stack,
temp C dump, truncation validated RNG-exact) — not theorized.

## Density

Cliff-phase: dochug was the head at the parent (844401f85 block: 1
block, RNG lost 46620, s1045 — verified in the parent tree). Owner
stands, writer (whole C function + its callee's missing arms) ported in
one handoff with code + ledger + test + verify. `Ledger: poly_obj
ported; replace_object ported` (ledger files in the diff). Not a no-op,
not unreached (probe PASS).

## Verification

Re-measured myself (`verify dochug,poly_obj --base 6a87ce504~1
--reach-all`):

- `verify dochug: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`
  (587214 PASS)
- `reach dochug: 848/848 PASS, 0 regressed → REACH-OK` (full spread —
  stronger than the D-log's 80-sample); `smoke poly_obj: 24/24 →
  REACH-OK` (poly_obj blocks no session — disclosed writer-only)
- Zero `worse`/REGRESSED. Matches the D-log Verify bullet exactly.

Grep of added lines: only the two legitimate C RNG draws; no
FORCE/DIAG/getRngLog/fastforward/seed. Rule #2 clean (iteration-wide
`imports.mjs --rulecheck`). Temp C dump + JS DIAG both reverted per the
log (no residue in the diff). New test red pre-fix on the exact s1033
deletion, 1/1 post-fix per the log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
