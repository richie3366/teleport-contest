# Review 1493 — 1bfac98a — getpos.c getpos_menu (D-2534)

## Metadata

- SHA: `1bfac98a`
- D-id: D-2534. Next index: 1493.
- Files: `js/getpos.js` (+91, new export + 2 import words),
  `js/cmd.js` (+27/−8, two caller wires).
- C locus: `nethack-c/upstream/src/getpos.c:664–725` (`getpos_menu`,
  62 L).

## Intent vs deliverable

Subject promises: whole `getpos_menu` in C order (MISSING → live)
+ both C caller wires (`cmd.c:5326`, `getpos.c:1019`). Diff actually
adds: exported async `getpos_menu` (`js/getpos.js:944`), the
dotravel `menu_requested` arm, and the mMoOdDxX `getloc_usemenu`
arm. Promise matches deliverable. No RNG in C; none added.

## Inventory

- New: `getpos_menu(ccp, gloc)` (exported async — `sym.mjs`
  single hit `js/getpos.js:944`, ASYNC; awaited at both call
  sites).
- Changed: dotravel menu arm, getpos mMoOdDxX usemenu arm.
- New imports extend existing edges only (`You`/`coord_desc`
  display, `ATR_INVERSE` terminal, `an` objnam, `select_menu_pick_one`
  options — all pre-existing specifiers per the diff hunks).
- No symbol deleted or re-pointed; no clone→import paste owed.

## C ↔ JS fidelity

`csym.mjs` body `:664–725` vs JS, in order:

- `:677` `gather_locs(&garr, &gcount, gloc)` → file-local
  `gather_locs(gloc)` (`js/getpos.js:911`; C-side static, so
  file-local is the right shape). Hero-first invariant holds:
  hero (distu 0, unique minimum) sorts to `arr[0]` under the
  `cmp_coord_distu` sort. Confirm.
- `:679–685` `gcount < 2` (always includes hero) → `You('cannot
  %s %s.', see/detect, descr[0])`, FALSE; free = GC no-op.
  `GLOC_DESCR[gloc][0]`/`[1]` shapes verified (`:1028–1036`).
  Confirm.
- `:687–692` window setup + skip index 0. `a_int = i + 1`
  carried on the item. Confirm.
- `:693–706` per-spot `firstmatch='unknown'`, `do_screen_description`
  gate (sync `js/pager.js:1381` — unawaited call correct),
  `coord_desc` suffix (sync `js/display.js:7408` — unawaited
  correct), `"firstmatch[ coords]"` row, ATR_NONE/NO_COLOR
  equivalents. Confirm.
- `:710–716` title `"Pick <an(descr[1])><filtertxt>< travel>"` —
  JS template matches all three slots; PICK_ONE via the
  established `select_menu_pick_one` helper (async `:2085`,
  awaited; title-ATR_INVERSE + blank header rows per the
  there_cmd_menu convention — named window-layer mapping).
  Confirm.
- `:717–722` `pick_cnt > 0 → ccp = garr[a_int − 1]`, boolean
  return; cancel leaves `ccp` untouched (JS returns false
  before the write). `idx = a_int − 1` exact. Confirm.
- Caller 1 (`cmd.c:5321–5341`, read in C): GFILTER_VIEW
  override with save/restore either way, decline →
  travelmode-off + ECMD_OK, ESC path → ECMD_CANCEL. JS
  identical including the OK-vs-CANCEL distinction. Confirm.
- Caller 2 (`getpos.c:1016–1022`, read in C): usemenu →
  `getpos_menu(&tmpcrd)` pick replaces cursor, cancel keeps it
  (`goto nxtc` ≡ `continue`). JS identical. Confirm.

Callee closure: all LIVE/sync-or-awaited (`gather_locs`,
`do_screen_description`, `coord_desc`, `an` sync `:2254`,
`select_menu_pick_one` async). Omits (window layer, `free`)
named with the mapping. No STUB in any live arm.

## Hallucinations / overclaim

None. "Both C callers wired" verified against both C sites, not
just asserted.

## Density

One 62-line C function + two small caller arms, two files on
existing edges. Right-sized per §2b (C is small; the callers
make the handoff).

## Verification

- D-log: syntax (2 changed) · rule2 · hidden note (0 blocked) ·
  smoke 24/24 · green 2/2 · strict ×2 · cohort 7/7 · full skipped
  (no shared file changed) → VERIFY: PASS.
- Re-run here: `hidden-proxy.mjs verify getpos_menu
  --base 1bfac98a~1 --reach-all` → 0 blocked both trees (vacuous
  note, honestly reported) + smoke 24 PASS, 0 regressed →
  REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate
  logic.
- Observations (pre-existing, not this SHA): `sym.mjs coord_desc`
  notes a second local clone at `js/pager.js:335` beside the
  imported `js/display.js:7408` export — predates this diff,
  untouched; not queued. JS `gather_locs` distance-sorts where C
  appends in scan order — menu display order only (readback is
  index-consistent); the sorter predates this diff; not queued.

## Actionable C-wrongs

None. No Must-fix, no CURRENT change.

Verdict: **ACCEPT**
