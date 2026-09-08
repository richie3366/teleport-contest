# Review 1038 — 37fe9ecd — bones.c savebones remove_mon_from_bones (D-2068)

## Metadata

- SHA: `37fe9ecd` — `bones.c savebones skipped remove_mon_from_bones, so Medusa's 2× obj_resists draws never ran before the LEAVESTATUE statue (D-2068).`
- JS diff: `js/end.js` +79/−2 (2 new file-local fns, savebones loop, import extensions, 2 consts).
- Docs: D-2068 D-log/D-index/CURRENT/NOTES/queue/turns.md map.
- Next index: 1038.

## Intent vs deliverable

Subject promises: run C's `iter_mons(remove_mon_from_bones)` +
`dmonsfree()` in `savebones` so Medusa is `mongone`d (2×
`rn2(100)`@obj_resists via `mdrop_special_objs`) before the
LEAVESTATUE statue arm. Diff actually adds: file-local
`remove_mon_from_bones` + `fixuporacle`, the snapshot loop +
`dmonsfree()` call in `savebones`, and import extensions only.
Promise == diff.

## Inventory

- New CLONEs (file-local, oracle/bones-only callers): `fixuporacle`
  (js/end.js), `remove_mon_from_bones` (js/end.js).
- Changed: `savebones` (loop + `dmonsfree()`); header comment updated
  (omission list shrinks correctly).
- New consts: `PM_MEDUSA/PM_ORACLE/PM_VLAD` via `monsterNames.indexOf`,
  `MS_LEADER 36`/`MS_NEMESIS 37` local.
- Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads,
  no `fastforward`, no hardcoded coordinates.

## C ↔ JS fidelity

C `remove_mon_from_bones` (`bones.c:388–399`, via `csym.mjs`):
`iswiz || Medusa || MS_NEMESIS || MS_LEADER || is_Vlad || (ORACLE &&
!fixuporacle)` → `mongone`. JS matches predicate-for-predicate,
including `is_Vlad` as data-or-cham (monst.h:222: `mptr ==
&mons[VLAD] || cham == VLAD` — JS `mndx === PM_VLAD || cham ===
PM_VLAD`). MS values confirmed in C (`monflag.h:51–52`: 36/37),
matching makemon.js:668-669 and the new locals.

C `fixuporacle` (`bones.c:306–352`, via `csym.mjs`), branch-by-branch:
`!Is_oracle_level → FALSE` ✓; `mpeaceful = 1` ✓; DELPHI roomno gate
→ TRUE ✓; `orig_rtype` scan with `ridx = SIZE` not-found form (JS
`ridx = rooms.length`, identical) ✓; `o_ridx != ridx && ridx < SIZE`
move via centre `(lx+hx)/2` (`|0` truncation == C int division for
non-negative coords) ✓; re-read roomno after `rloc_to` ✓; `ridx ==
o_ridx → rtype = DELPHI` (+ harmless `rooms[ridx]` guard) ✓; `return
TRUE` ✓.

C `iter_mons` (`mon.c:4527–4539`, read directly): skips
`DEADMONSTER(mhp<1) || mon_offmap` with `mtmp2=mtmp->nmon` snapshot.
JS `[...(game.fmon||[])]` + `(mhp|0)<1` + `mon_offmap` skips =
verbatim, splice-safe.

Callee closure (all LIVE, all pre-existing edges extended — no new
module edge): `mongone` (mon.js:2876 async, awaited), `dmonsfree`
(mon.js:2778), `mon_offmap` (monmove.js:151), `enexto`/`rloc_to`
(teleport.js:655/750, `imports.mjs --can js/end.js js/teleport.js
enexto` → ALREADY), `Is_oracle_level` (const.js:3230),
`DELPHI/ROOMOFFSET` consts. No STUB in a live arm. Named omits
(unleash_all/unpunish/dismount, forget_engravings, ebones, compress,
etc.) are pre-existing savebones defers, untouched and still listed.

## Hallucinations / overclaim

None. «Cycle-safe per `imports.mjs --can`» re-verified true. The D-log
openly notes `verify savebones` is vacuous (owner still `obj_resists`
until rescore) instead of presenting it as a corpus PASS — the honest
form the method demands, with the real signal (`verify obj_resists` →
Valkyrie PASS) quoted separately.

## Density

79 insertions: two C functions + wiring + consts in one module, one
locus family. Right-sized.

## Verification

D-log bullets: `verify obj_resists` → 1 PASS / 0 moved / 2 unchanged;
`verify savebones` → vacuous-note + green/strict/cohort. Re-measured
myself: `hidden-proxy.mjs verify obj_resists --base 37fe9ecd~1` → `1
PASS, 0 moved past, 2 unchanged, 0 worse → PROGRESS` (Valkyrie-92074
PASS; Samurai-92032@59 + Wizard-92219@115 unchanged — the parked
fire-trap/cube-paradox writers, correctly not claimed). Claim
reproduces exactly. `skip full` justified (end.js change is additive
file-local + loop; no shared-module signature change).

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
