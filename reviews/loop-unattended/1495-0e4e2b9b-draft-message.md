# Review 1495 — 0e4e2b9b — dig.c draft_message (D-2536)

## Metadata

- SHA: `0e4e2b9b`
- D-id: D-2536. Next index: 1495.
- Files: `js/dig.js` (+51/−8, restart + export), `js/zap.js`
  (two caller wires + doc updates).
- C locus: `nethack-c/upstream/src/dig.c:1502–1544`
  (`draft_message`, 43 L).

## Intent vs deliverable

Subject promises: whole `draft_message` in C order (THIN → live)
+ both `zap.c` caller wires (`:5408`, `:3746`). Diff actually
adds: exported `draft_message` with both hallu arms, the
`zap_over_floor` inline→call swap, and the `zap_map`
`else if (Is_rogue_level)` call. Promise matches deliverable.

## Inventory

- Changed: `draft_message` (local → exported async —
  `sym.mjs` single hit `js/dig.js:238`, ASYNC; awaited at both
  zap sites).
- Changed: zap imports gain `draft_message` on the existing
  static dig.js edge (`--can`: ALREADY per D-log; specifier
  extension visible in the hunk).
- Doc-only: zap header + `zap_map` comments retire the
  draft_message omit lines.
- No symbol deleted or re-pointed; no clone→import paste owed.

## C ↔ JS fidelity

`csym.mjs` body `:1502–1544` vs JS, in order:

- `:1513–1514` unexpected + plain → `You_feel('an unexpected
  draft.')`. Confirm.
- `:1515–1523` unexpected + hallu → 4-F when ANY of the six
  ACURR attrs < 6, else 1-A. JS tests all six via live
  `acurr` (new A_INT/A_DEX/A_CON/A_CHA words on the existing
  attrib.js edge). Confirm.
- `:1526–1528` plain → `You_feel('a draft.')`. Confirm.
- `:1529–1542` plain + hallu: `draft_reaction[0..3]`,
  `dridx = rn1(2, 1 − sgn(type))` widened by
  `rn1(3, sgn(type) − 1)` when `record < STRIDENT`.
  `sgn` verified (`js/dig.js:1544`, truncates exactly like C);
  `STRIDENT = 4` verified (`dig.c:1499`, from pray.c).
  Range walk: L 0..1, N 1..2, C 2..3; widened L +0..2, N
  −1..1, C −2..0 — union always 0..3, index in-bounds as C
  comments. RNG call-for-call (unconditional `rn1(2,…)` first,
  gated `rn1(3,…)` second). Confirm.
- Caller 1 (`zap.c:5398–5408`, read in C): SDOOR convert +
  newsym, `see_it → pline` / `else if Is_rogue_level →
  draft_message(FALSE)`. JS hunk shows the identical
  `else if (Is_rogue_level(...))` slot, inline plain message
  replaced by the full call (hallu now handled — strictly more
  faithful). Confirm.
- Caller 2 (`zap.c:3738–3746`, read in C): `cansee → pline` /
  `else if Is_rogue_level → draft_message(FALSE)`. JS
  identical. Confirm. (dig.c `:1443`/`:1451` in-file callers
  already called the local; now served by the export.)
- `Hallucination()` note: the module-local helper ORs H/HH/EH
  without the `youprop.h:120` resistance conjunct — disclosed
  in the D-log as pre-existing (`js/dig.js:1897/1911`
  convention), not introduced here. Out of scope; correctly
  not sold as new fidelity.

Callee closure: `You_feel`, `acurr`, `rn1`, `sgn`,
`STRIDENT` all live/file-local. Omits: none in this body. No
STUB in any live arm.

## Hallucinations / overclaim

None. "None in this body" holds; the one known deviation in
the call path is disclosed with locus.

## Density

One 43-line C function + two one-line caller wires, two files
on existing edges. Small C, complete handoff per §2b.

## Verification

- D-log: syntax (2 changed) · rule2 · hidden note (0 blocked)
  · smoke 24/24 · green 2/2 · strict ×2 · cohort 7/7 · full
  skipped (no shared file changed) → VERIFY: PASS.
- Re-run here: `hidden-proxy.mjs verify draft_message
  --base 0e4e2b9b~1 --reach-all` → 0 blocked both trees
  (vacuous note, honestly reported) + smoke 24 PASS,
  0 regressed → REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate
  logic (sole FORCE hit is a pre-existing `SPE_FORCE_BOLT`
  comment).

## Actionable C-wrongs

None. No Must-fix, no CURRENT change.

Verdict: **ACCEPT**
