# Review 1980 — 1cc7d605d — wiz_display_macros whole + extcmd entry

Metadata: SHA `1cc7d605d` (D-3020). Scored diff: `js/wizcmds.js` (+81) +
`js/getline.js` (+10 EXT_CMDS entry). Subject promises: new
`wiz_display_macros` whole in C order + runnable `wizdispmacros` EXT_CMDS
entry (the name-table entry at getline.js:349 had no path).

## Intent vs deliverable

Promise: the display-macro range validator whole (cmap/monster/object
arms), NHW_TEXT via the `wiz_show_stats` page idiom, caller wired via
EXT_CMDS with wiz + autocomplete + lazy import.
Diff actually adds exactly that. Promise kept.

## Inventory

- `wiz_display_macros` (wizcmds.js:1527, exported async — C
  `wizcmds.c:1704–1778` global): whole body.
- EXT_CMDS `wizdispmacros` (getline.js:851): wiz + autocomplete + lazy
  `wizcmds.js` import, matching the neighbor idiom.

## C ↔ JS fidelity

### Body — verdict: exact-C, ACCEPT

Against `wizcmds.c:1704–1778` (csym range), arm-for-arm in C order:
static header + `no_glyph`/`max_glyph`/`defsyms_size` setup → `for glyph
< MAX_GLYPH` → cmap arm (NO_GLYPH check with `test === no_glyph`,
zap-range `S_vbeam..S_rslant`, IndexOk bounds) → monster arm
(`< 0 || >= NUMMONS`) → object arm (`< 0 || > NUM_OBJECTS` — the
asymmetric `>` kept per C) → `!trouble` clean line → NHW_TEXT show +
ECMD_OK.

The `IndexOk` inline verified, not trusted. C (`hack.h:1498`):

```c
#define IndexOk(idx, array) \
    ((idx) >= 0 && (idx) < SIZE(array))
```

`SIZE(defsyms)` = `MAXPCHARS+1` (`drawing.c:64`
`defsyms[MAXPCHARS + 1]`); JS `defsyms_size = MAXPCHARS + 1` with the same
predicate, and the size printed in the message like C (`defsyms[${size}]`
≡ `defsyms[%d]`). The `!trouble++` header-once shape kept at all three
sites. All four message texts match C modulo `%d`→`${}`:

```c
"glyph_is_cmap() / glyph_to_cmap(glyph=%d)"
" sync failure, returned NO_GLYPH (%d)"
```

`NO_GLYPH === MAX_GLYPH` equivalence noted with a code cite
(display.js:229). NHW_TEXT delivery via `show_text_pages` (the same-file
`wiz_show_stats` idiom): collect-then-page, wait inside — a sound window
analogue with no live-state effect either way (diagnostic command). RNG:
none in C, none added. Confirm.

### Callee closure — all LIVE, verdict: ACCEPT

Required `sym.mjs` outputs:

```text
glyph_is_cmap    js/display.js:888   sync
glyph_to_cmap    js/display.js:742   sync
glyph_to_mon     js/display.js:965   sync
glyph_to_obj     js/display.js:951   sync
show_text_pages  js/pager.js:260   ASYNC — await required
wiz_display_macros js/wizcmds.js:1527   ASYNC — await required
```

`glyph_is_cmap_zap`/`glyph_is_object`/`glyph_is_monster`/`NO_GLYPH`/
`MAX_GLYPH`/`MAXPCHARS` join the same existing display.js edge;
`NUMMONS` the same monsters.js edge; `S_vbeam`/`S_rslant` the same
const.js edge; `NUM_OBJECTS` the same objects.js edge. No new static
edges, no clones, no stubs. `show_text_pages` awaited.
Caller: C `cmd.c:1956–1958` extcmdlist `IFBURIED|AUTOCOMPLETE|WIZMODECMD`
→ entry carries wiz + autocomplete + lazy run (IFBURIED unmodeled —
consistent with every neighbor entry, house idiom, not a gap).

## Hallucinations / overclaim

None. "Named: none" accurate. Headless probe (`rc = 0`, clean row
`No display macro issues detected.`) corroborates the self-consistency
claim without touching corpus state. Diff grep: no banned patterns.

## Density

Breadth-phase: one whole function (75 C lines) + its caller entry, ~91
insertions. Compliant.

## Verification

Re-measured (`hidden-proxy.mjs verify wiz_display_macros
--base 1cc7d605d~1 --reach-all`):

```text
verify wiz_display_macros: 0 session(s) blocked at baseline (vacuous, honest)
smoke wiz_display_macros: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero REGRESSED. Matches D-log.

## Actionable C-wrongs

None.

Ledger: `wiz_display_macros` ported, REACH-OK via smoke.
Verify lines: hidden vacuous (honest) + smoke + green/cohort per D-log,
re-run confirms.

Verdict: **ACCEPT**
