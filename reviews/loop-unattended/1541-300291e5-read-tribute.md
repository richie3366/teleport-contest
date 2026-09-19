# Review 1541 — 300291e5 — files.c read_tribute (D-2582)

## Metadata

- SHA: `300291e5`
- D-id: D-2582. Next index: 1541.
- Files:
  - `js/files.js` (+124/−91: `read_tribute` restart with `:line`
    cites).
  - `scripts/read-tribute.test.mjs` (new pin, 4/4).
- C locus:
  - `nethack-c/upstream/src/files.c:3473–3645` (`read_tribute`).
  - `nethack-c/upstream/src/files.c:3647–3653` (`Death_quote`,
    unchanged caller).
  - Both `csym.mjs` ranges, read in full this iteration.

## Intent vs deliverable

Subject promises: a re-citation restart of the review-594 ACCEPT body
— C-order switch, live `strip_newline`, kept `linect`, C-exact
`bufsz − 1` cap — plus a pin test. Diff delivers that; behavior
changes are confined to the two named deltas (newline strip, cap).
Promise matches deliverable.

## Inventory

- Restarted: `read_tribute` (export retained, signature unchanged).
- New import: live `strip_newline` (pager.js) replacing the hand-rolled
  `split('\n')` + pop-trailing-empty + trailing-`\r` cut.
- Callees: `strip_newline` (live), `choose_passage`, `mungspaces`,
  `putmsghistory`, `show_nhw_menu_text` (all pre-existing).
- File-local `tribute_ncmpi` / `tribute_copynchars` / `tribute_atoi`
  retained and map-named (review-594 debt, not new clones).
- No deleted symbols.

## C ↔ JS fidelity

Walked against C `:3473–3645` (read the whole body here):

- Mandatories (`:3493–3496`) + `dlb_fopen` embed (`:3502`). Match.
- `linect++` + `strip_newline` (`:3531–3532`) + `switch (line[0])`
  with `%` / `#` / default (`:3533`). Match.
- `%section` / `%title` / `%passage` / `%e` arms with the `(` / `)`
  guards, scope/match flags, and scope-decrement order
  (`:3535–3588`). Match — including the `*p1++ = '\0'`-then-mungspaces
  sequencing (`:3544–3546`) and the no-`(` / no-`)` skip (scope and
  flags untouched, both sides).
- `targetpassage = !tp ? choose_passage : tp <= passagecnt ? tp : 0`
  (`:3553–3556`, `tp = tribpassage|0`). Match.
- `%e`-foundpassage goto → cleanup flag (`:3581–3582`). Match.
- Multi-line putstr/lastline accumulation (`:3599–3603`). Match.
- One-line `copynchars(line, bufsz − 1)` + goto (`:3605–3607`). Match.
- Cleanup `foundpassage && lastline` gate = C `tribwin != WIN_ERR` +
  `*lastline` (`:3619–3623`): window creation is deferred to
  `show_nhw_menu_text`, so the conjunction is the exact translation
  of the two C gates. Match.
- Attribution strchr/strrchr/`; passage #N]`/putmsghistory/grasped
  (`:3629–3636`), including the has-`[`-but-no-`]` fallthrough (skip
  rewrite, still record history). Match.
- Bad-translation tail (`:3640–3642`) + return (`:3644`). Match.

The two behavior deltas both move toward C (verified, not trusted):

1. Split keeping `\n` (`split(/(?<=\n)/)`) + live `strip_newline` runs
   C `:3532` exactly per chunk. The old code additionally stripped a
   lone trailing `\r` that C keeps — old over-stripped, new matches.
   (C's BUFSZ-chunking vs JS whole lines is pre-existing embed
   behavior, unchanged.)
2. Cap `(bufsz|0) − 1` with the `left > 0` copy loop in
   `tribute_copynchars` (= C `n > 0`: negative copies nothing),
   replacing the old BUFSZ fallback that widened the `:3606` arm.
   Match.

Omits named with ground (none claimed live):

- dlb open/read/close → Rule #2 `TRIBUTE_TEXT` embed.
- `debugpline3`/`debugpline1` compiled out (`linect` kept for the
  message).
- WIN_ERR-create arm infallible (`:3638` destroy owned by
  `show_nhw_menu_text`).
- `Death_quote` untouched and consistent (passage 0 → `choose_passage`;
  covered by the pin).

## Hallucinations / overclaim

None.

## Density

~124 `js/` insertions for a 173-line C function restart + pin — right
size (§2b; the 450 ceiling for >250 insertions not needed).

## Verification

- D-log claims VERIFY PASS (coverage row, 0 blocked at baseline).
- Re-ran here (required):
  - `hidden-proxy verify read_tribute --base 300291e5~1 --reach-all`
  - → 0 blocked both sides (vacuous note, expected)
  - → smoke 24/24 REACH-OK.
- New pin `scripts/read-tribute.test.mjs` runs clean here too (4/4
  per subject: `Death_quote` fills the one-line buffer; unknown title
  leaves it empty; null mandatories return FALSE; passage 9999 past
  the count cannot match).
- No RNG in the function.
- Diff grep: no FORCE/DIAG/seed/coordinate/`fastforward` content.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
