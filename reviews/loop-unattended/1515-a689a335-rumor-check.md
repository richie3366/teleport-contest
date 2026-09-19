# Review 1515 — a689a335 — rumors.c rumor_check (D-2556)

## Metadata

- SHA: `a689a335`
- D-id: D-2556. Next index: 1515.
- Files: `js/rumors.js` (+176: `couldnt_open_file`,
  `fmt6d`/`fmt6x`, `splitEmbedLines`, `others_check`,
  `rumor_check` + 4 generated/const/display imports),
  `js/wizcmds.js` (+14: `wiz_rumor_check`),
  `js/getline.js` (+10: `wizrumorcheck` EXT_CMDS entry).
- C locus: `nethack-c/upstream/src/rumors.c:194–302`
  (`rumor_check`, 109 L; `csym.mjs` range, cited as
  that range). Helpers: `others_check` `:308–408`
  (staticfn, found by grep — `csym.mjs` has no entry
  under that name), `couldnt_open_file` `:769–782`,
  `init_rumors` `:84–107`.

## Intent vs deliverable

Subject promises: the whole wizard-verify body in C
order over Rule #2 embeds with `#wizrumorcheck` wired.
Diff delivers exactly that: `rumor_check` +
both C staticfns kept file-local (`mkinvpos`
precedent), the one C caller (`wizcmds.c:1104`)
wired through a gated `wiz_rumor_check` plus the
EXT_CMDS entry with C's flags. Promise matches
deliverable. No RNG in C; none added (the only
`rn2`/`rnd` hit in the diff is the pre-existing
`rng.js` import line).

## Inventory

- New: `rumor_check()` (exported async),
  `others_check(ftype, fname, buf, lines)`
  (file-local sync), `couldnt_open_file(filename)`
  (file-local sync), `fmt6d`/`fmt6x`,
  `splitEmbedLines` (file-local), `wiz_rumor_check()`
  (exported async), one EXT_CMDS entry.
- Callees, all LIVE: `xcrypt` (file-local
  `js/rumors.js:33`, pre-existing), `pline` /
  `impossible` / `flush_topl_more` (display.js),
  `show_text_pages` (pager.js).
- No deleted or re-pointed symbols → no
  clone→import audit (`sym.mjs`: `rumor_check`
  `js/rumors.js:306` ASYNC, `wiz_rumor_check`
  `js/wizcmds.js:518` ASYNC, `others_check` local-only
  single clone — the port itself).

## C ↔ JS fidelity

`rumor_check` vs C `:194–302`, in order:

- `:204` open gate `(size >= 0) ? fopen : 0` →
  `(game.true_rumor_size ?? 0) >= 0`; fopen always
  succeeds under embed (getrumor D-2513 precedent) ✓.
- `:209–214` first-use `init_rumors` (`:84–107`:
  skip comment, parse header, `end = start + size`,
  contiguity assert) → sizes from buffer lengths,
  `true_rumor_start = 0`, `true_end = start + size`,
  `false_start = true_end` — assert preserved,
  header parse at build time (extract-rumors.py),
  all map-named ✓.
- `:215` window create → shared `lines[]`; `:228–237`
  T/F stat lines via `%06ld (%06lx)`-equal helpers
  (values small non-negative; hex via unsigned
  semantics holds) ✓.
- `:246–276` first/last true + first/last false:
  C seeks + `fgets` + last-line-crossing-`end` loop →
  embed split head/tail with padding kept (C never
  unpadlines here) ✓. START numbers are
  section-relative (no "don't edit" + header bytes
  in the embed) — disclosed in the D-log and map ✓.
- `:278` fclose no-op ✓; `:279–285` `no_rumors`
  pline + `display_nhwindow(WIN_MESSAGE,TRUE)` →
  `pline` + `flush_topl_more` (allmain.js:1173
  precedent) ✓, still falling through to the three
  `others_check` calls (`:292–298`, also in the
  no-rumors case) ✓; `:300–303` show-once →
  `show_text_pages` iff `lines.length > 0` ✓.
- First-open-failed `:287–290` (`couldnt_open_file`
  + `size = -1`) unreachable under embed —
  map-named, and `couldnt_open_file` itself is still
  ported live (`:769–782`: suppress/restore
  `something_worth_saving` + `debug_fuzzer` gate;
  `impossible` floats un-awaited per getrumor) ✓.

`others_check` vs C `:308–408`: `''` + ftype pushes
(`:329–330`) ✓; entry counting from the first
non-comment line (embed starts past the `#` header
by extractor design — map-named) ✓; `(no second
entry)` / `(only two entries)` / ` ...` + last
(`entrycount > 3`, already-decrypted `xbuf`) arms
exact ✓. Nit (not queueable): the two
first-line-missing messages (`can't read` vs `is
empty`) are merged into one string in an arm that
cannot fire (non-empty constant buffers).

Callers: the sole C caller `wiz_rumor_check`
(`wizcmds.c:1101–1106`, body = call + `ECMD_OK`)
wired with the sibling wizard gate; `cmd.c:1988`
`IFBURIED|AUTOCOMPLETE|WIZMODECMD` mirrored as
`wiz:true, autocomplete:true` ✓.

## Hallucinations / overclaim

None. "Whole body" holds — every arm is live or
map-named, and the named arms are genuinely
unreachable (constant non-empty embeds), not live
paths relabeled. No dispatch-with-stubbed-callee:
both staticfns are ported in-commit.

## Density

One 109-line C function + 2 small staticfns +
caller wiring, three files, ~200 insertions.
Right-sized per §2b.

## Verification

- D-log: `verify.mjs --fn rumor_check` → PASS,
  honestly framed as wizard-only / 0-blocked.
- Re-run here: `hidden-proxy.mjs verify rumor_check
  --base a689a335~1 --reach-all` → 0 blocked both
  trees (vacuous, honestly reported) + smoke
  24 PASS, 0 regressed → REACH-OK. Matches.
- `imports.mjs --rulecheck`: clean (re-run this
  iteration). Diff grep: no FORCE/DIAG/getRngLog/
  fastforward/seed gates or hardcoded coordinates.

## Actionable C-wrongs

None. Branch order, counting arms, caller wiring,
and the embed-framing omissions all check out
against pinned C.

Verdict: **ACCEPT**
