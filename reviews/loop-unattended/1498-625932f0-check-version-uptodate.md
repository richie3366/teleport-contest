# Review 1498 — 625932f0 — version.c check_version + uptodate (D-2539)

## Metadata

- SHA: `625932f0`
- D-id: D-2539. Next index: 1498.
- Files: `js/files.js` (+312/−6ish), `js/version.js` (+24).
  Insertions >250 raise the ceiling to 450 only — this review stays tight.
- C locus: `nethack-c/upstream/src/version.c:373–423`
  (`check_version`, 51 L), `:762–823` (`compare_critical_bytes`,
  62 L), `:712–746` (`uptodate`, 35 L), `:839–856` (`validate`,
  18 L); `nethack-c/upstream/src/hacklib.c:999–1013`
  (`what_datamodel_is_this`, 15 L).

## Intent vs deliverable

Subject promises: whole `check_version` + `uptodate` bodies in C
order (MISSING → live), plus compare/what_datamodel/critical_sizes
ported, head row mhitm_ad_slim STALE-split. Diff actually adds:
`NOMAKEDEFS_*` consts, 80-row `CRITICAL_SIZES`, module `CSCBUF`,
exported `check_version` / `compare_critical_bytes` / `uptodate` /
`validate` in files.js, exported `what_datamodel_is_this` in
version.js. Promise matches deliverable. No RNG in C; none added
(the sole `rn2` grep hit is the pre-existing import context line).

## Inventory

- New: `check_version` (`js/files.js:870`, async), 
  `compare_critical_bytes` (`js/files.js:922`, sync),
  `uptodate` (`js/files.js:977`, async), `validate`
  (`js/files.js:1020`, async) — `sym.mjs` one hit each, no clones.
- New: `what_datamodel_is_this` (`js/version.js:173`, sync).
- New data: `CRITICAL_SIZES` (80 rows), `CSCBUF`, `NOMAKEDEFS_*`.
- No deleted or re-pointed symbols → no clone→import audit needed.

## C ↔ JS fidelity

`check_version` (`:373–423`) vs JS, in order: `:380–386`
null-filename arm live (impossible kept — EXTRA_SANITY_CHECKS
defined, config.h:637); `:388–390` SFCTOOL strip + caller-struct
mutation kept (`game.converted_savefile_loaded`, mutates the passed
object like C); `:397` `!=` incarnation gate (VERSION_COMPATIBILITY
undefined, patchlevel.h:62); `:401–404` complain arm keeps the
`WIN_MESSAGE != WIN_ERR` flush gate (`game.WIN_MESSAGE = 10` live,
allmain.js:193); `:409–412` feature/sanity gate with the
UTD_SKIP_SANITY1 shape; `:415–417` complaint arm keeps C's
asymmetry (unconditional flush, no WIN_ERR gate). Confirm.

`compare_critical_bytes` (`:762–823`): count gate, uchar loop from
1, six-way datamodel ladder, `{ value }` holder for `int *` — all
in C order. The two Sfi feed loops (`:771` count, `:779–781` fill)
are named omits (no binary NHFILE read layer; JSON VFS), so
`file_csc_count` is a constant 0 and `CSCBUF` stays zeroed —
disclosed in the JSDoc. Consequence, stated here so no later iter
is surprised: with zeroed CSCBUF the loop always mismatches at
i=1 (short=2), so this function can never return SF_UPTODATE until
a feed exists. Not a C-wrong today: `validate` has no live JS
caller (bones/files/restore counterparts all named), so the dead
feed poisons nothing reachable. Confirm with the named-omits.

`uptodate` (`:712–746`): SFCTOOL-extern arm compiled out (named);
`verbose = name ? TRUE : FALSE` pointer shape kept (`!= null`);
compare call, raw_printf named omit (display.js:7749), Sfi feeds
named omits, check_version gate, flag-gated wait_synch arm kept as
a check (`:739` condition live, `:740` call named — winprocs.h:140
→ tty_wait_synch has no live port). `indicator`
write-never-read kept as `void`. Confirm.

`validate` (`:839–856`): flag assembly `:848–853` live
(`nhfp.structlevel/fieldlevel` exist on the JS handle,
files.js:553/578); SFCTOOL-quiet arm named compiled out. Confirm.

Data tables, verified against pinned C here (not trusted from the
message): `dm[]` (hacklib.c:971–979) rows 1–4 match
DATAMODEL_TABLE entry-for-entry (sizes, names, platforms), so the
JS loop-from-0 over a rows-1–4-only table ≡ C loop-from-1 —
the "first draft kept i=1" fix is correct. `critical_sizes`
(version.c:546–664): 80 rows counted (1 + 22 + 47 + 10 spares),
names and order match; you_LO/HI 200/10 = 2760 & 0xFF / >>8.
Per-entry byte sizes are gcc-measured (/tmp probe, not committed)
with D-2530 cross-checks — trusted, not re-derived; all fit the
`(uchar)` cast. Callers: uptodate's sole caller validate wired;
validate's C callers (bones/files/restore/sfctool) all named
with locus/reason. No STUB in any live arm.

## Hallucinations / overclaim

None. The "whole body" claim holds with the Sfi/raw_printf/
wait_synch feeds as named omits, each with locus + reason + the
no-live-caller guard. The zeroed-CSCBUF consequence is disclosed
in-code; the always-SF_OUTDATED downstream follows from the same
named omits.

## Density

One C function family (save-validation: 4 functions + 1 helper +
2 tables), two files already linked. Right-sized per §2b.

## Verification

- D-log: syntax (2 changed) · rule2 · hidden note (0 blocked) ·
  smoke 24/24 · green 2/2 · strict ×2 · cohort 7/7 · full skipped
  (no shared file changed) → VERIFY: PASS, plus /tmp 17/17 probe.
- Re-run here: `hidden-proxy.mjs verify check_version --base
  625932f0~1 --reach-all` → 0 blocked both trees (vacuous note,
  honestly reported) + smoke 24 PASS, 0 regressed → REACH-OK;
  same for `uptodate`. Matches.
- `imports.mjs --rulecheck`: clean (this SHA's check; re-run per
  SHA below as required).
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate
  logic.

## Actionable C-wrongs

None. No Must-fix, no CURRENT change.

Verdict: **ACCEPT**
