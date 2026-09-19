# Review 1497 — 1c1e08cc — files.c set_savefile_name (D-2538)

## Metadata

- SHA: `1c1e08cc`
- D-id: D-2538. Next index: 1497.
- Files: `js/save.js` (+102/−6, restart + 2 caller rewires).
- C locus: `nethack-c/upstream/src/files.c:1019–1123`
  (`set_savefile_name`, 105 L).

## Intent vs deliverable

Subject promises: whole `set_savefile_name` in C order (THIN →
live), UNIX arm ported, both JS save sites wired. Diff actually
adds: `regularize_save_suffix`, restarted `set_savefile_name`,
SAVESIZE consts, and the dosave0/`try_restore_save` rewires.
Promise matches deliverable. No RNG in C; none added.

## Inventory

- Changed: `set_savefile_name(plname)` → 
  `set_savefile_name(regularize_it)` (exported sync —
  `sym.mjs` single hit `js/save.js:88`).
- New: `regularize_save_suffix` (file-local), SAVESIZE family
  (+`PL_NSIZ` const word on the existing edge).
- Changed: dosave0 + try_restore_save preset `set_savefile_name(1)`
  then read `game.SAVEF`.
- Signature-change audit (required): `grep set_savefile_name js/`
  shows NO other-file callers — the only two call sites are the
  rewired ones; `scripts/`+`frozen/` have zero refs. No straggler
  passing a name string. Confirm.

## C ↔ JS fidelity

`csym.mjs` body `:1019–1123` vs JS, in order:

- `:1022–1025` null `postappend`/`sfindicator` decls → JS
  null consts (VMS-only `";1"` never assigned on UNIX).
  Confirm.
- `:1030–1034` VMS arm / `:1036–1053` WIN32 arm (incl.
  `fname_encode` — no JS counterpart by design) / `:1059–1064`
  MSDOS / `:1065–1085` MICRO+AMIGA — all named compiled-out
  with loci. Correct: none of VMS/WIN32/MSDOS/MICRO/AMIGA is
  defined for the contest targets.
- `:1054–1057` UNIX arm live: `save/<plname>`, regoffset 5,
  spot 2. `getuid()` digits folded out — named Rule #2
  adaptation (no POSIX identity in dual-runtime ESM;
  single-user VFS); old JS was `save/<name>` too, so no path
  behavior changes. regoffset 5 still skips exactly `save/`
  (C digits sit after the slash and are digit-unaffected by
  regularize anyway). Confirm with the one named adaptation.
- `:1086–1087` regularize applies to the post-regoffset suffix
  only — the `save/` slash survives (old JS stripped slashes
  from the whole name; new code preserves the prefix per C).
  `regularize` body verified against `unixunix.c`
  (`.`, `/`, ` ` → `_`; SYSV 14-char arm needs
  LINUX/__APPLE__ undefined → compiled out on contest
  targets). JS regex equivalent. Confirm.
- `:1088–1115` indicator-1 / SAVE_EXTENSION / indicator-2 /
  postappend arms: live null/empty-guarded no-ops keeping C
  short-circuit (`overflow` stays 0). SAVE_EXTENSION `""`
  verified (`fnamesiz.h:45–46` default); the `(0)`-bracket
  dead-code shape mirrored. Confirm.
- `:1116–1122` `impossible` overflow arm compiled out —
  `NH_DEVEL_STATUS == NH_STATUS_RELEASED` verified
  (`patchlevel.h:33`), consistent with the D-2530/D-2535
  RELEASED resolutions. Named, not ported. Confirm.
- SAVESIZE = 32 + 12 + 1 + 8 = 53: `PL_NSIZ = 32` verified
  (`js/const.js:968`); SAVEX/extension/index lengths per the
  cited fnamesiz arms. Guards cover appends only, so long
  names pass through like C's unbounded base `Sprintf`.
  Confirm.
- Callers: `dosave0` preset-then-`game.SAVEF` (C save
  аналогуе) and `try_restore_save` preset-then-VFS-read
  (`restore_saved_game :1276` analogue, `TRUE` ≡ 1) both
  match. Unported recover/selectsaved counterparts
  (`check_panic_save`/`recover_savefile`/`get_saved_games`)
  named, not silent. C returns void; JS returns SAVEF as a
  convenience — disclosed, harmless (callers use `game.SAVEF`).

Callee closure: everything file-local or const words; omits
(uid digits, fname_encode, 5 platform arms, SYSV truncation,
RELEASED impossible, unported caller counterparts) each named
with locus/reason. No STUB in any live arm.

## Hallucinations / overclaim

None. The uid-drop is the one place the port knowingly differs
from C, and it is disclosed twice (message + comment + map),
with the no-behavior-change justification (old JS agreed).

## Density

One 105-line C function + two caller rewires, one file.
Right-sized per §2b.

## Verification

- D-log: syntax (1 changed) · rule2 · hidden note (0 blocked)
  · smoke 24/24 · green 2/2 · strict ×2 · cohort 7/7 · full
  skipped (no shared file changed) → VERIFY: PASS, plus the
  /tmp probe (`Hero`→`save/Hero`, dotted-name regularize
  TRUE/FALSE split, 200-char passthrough — consistent with
  the code read above).
- Re-run here: `hidden-proxy.mjs verify set_savefile_name
  --base 1c1e08cc~1 --reach-all` → 0 blocked both trees
  (vacuous note, honestly reported) + smoke 24 PASS,
  0 regressed → REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate
  logic.

## Actionable C-wrongs

None. No Must-fix, no CURRENT change.

Verdict: **ACCEPT**
