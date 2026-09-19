# Review 1480 — 8d4ef240 — pager.c look_engrs whole body (D-2521)

## Metadata

- SHA: `8d4ef240624569b6715f67966a0f03b49b404903`
- D-id: D-2521. Next index: 1480.
- Files: `js/pager.js` only (143 diff lines, one function restart + 2 import names).
- C locus: `nethack-c/upstream/src/pager.c:2142–2228` (`look_engrs`, staticfn, 87 L).

## Intent vs deliverable

Subject promises: whole `look_engrs` body in C order (coverage PARTIAL → live),
plus one real cohort divergence the restart exposed and fixed (seed2200 screen@103,
MAP `%8s` pad broken by the local `coord_desc` y<10 kitten space).

Diff actually adds: restarted `look_engrs` (`js/pager.js:2358`) with `:line`
cites; `strsubst` added to the existing `./hacklib.js` import; `IS_GRAVE`
added to the existing const import. No new cross-module edge, no new file,
no stub. Promise matches deliverable.

## Inventory

- Changed: `look_engrs` (restart, async file-local — correct home: C declares
  it `staticfn`, both C callers `:1878/:1881` are same-file `dowhatis` arms).
- Added imports only: `strsubst`, `IS_GRAVE` (both appended to existing import
  lines — same-edge words, no TDZ surface).
- Untouched: callers, `rendered_glyph_char`, `glyph_showsym_code`,
  `look_getpos_cmode` (all pre-existing in-file helpers).

## C ↔ JS fidelity

C range cited as `pager.c:2142–2228` (`csym.mjs` body print). Branch walk:

- `:2155` region: JS `look_region_nearby(region, nearby)` holder idiom —
  `look_region_nearby` LIVE (`js/pager.js:1015` sync). Old code called
  `look_region`; the restart uses the C-named function. Confirm.
- `:2160–2161` seenv gate, `:2166–2168` `engr_at` + null skip: verbatim.
  `engr_at` imported (`js/pager.js:64` ← `js/engrave.js:128`); the two local
  clones `sym.mjs` reports live in other files, not this one. Confirm.
- `:2169` headstone: `IS_GRAVE(svl.lastseentyp[x][y])` → JS
  `IS_GRAVE(game.lastseentyp?.[x]?.[y] | 0)`. Confirm.
- `:2170–2171` prefix + `add_quoted_engraving(x, y, lookbuf, TRUE)` →
  holder `{s}` + `add_quoted_engraving(x, y, quoted, true)` (LIVE,
  `js/pager.js:1175` sync), force-TRUE kept. Confirm.
- `:2174–2180` strsubst rewrites: all four strings verbatim, headstone/else
  branch order kept. `strsubst` LIVE (`js/hacklib.js:278`). Confirm.
- `:2182–2183` `glyph_at` + cmap/`SYM_NOTHING`: verbatim; both LIVE
  (`js/display.js:816/:836/:690`, const `js/const.js:2820`). Confirm.
- `:2184` shown predicate: C `is_cmap_engraving(sym) || sym == S_grave`;
  `is_cmap_engraving` is `sym.h:108` ≡ `(i)==S_engroom || (i)==S_engrcorr`,
  so the JS triple `S_engroom || S_engrcorr || S_grave` is exactly C.
  Inlined CLONE, verified here. Confirm.
- `:2185–2186` shown arm (`++count`, keep glyph): JS keeps live glyph and
  renders via `rendered_glyph_char` (pre-existing file-local encglyph idiom,
  `js/pager.js:1346`). Confirm.
- `:2187–2193` covered arm: `", obscured by %s", encglyph(glyph)` of the live
  glyph, then re-point `cmap_to_glyph(S_grave)` /
  `engraving_to_glyph(e) = cmap_to_glyph(engraving_to_defsym(e))`
  (`display.h:633–634`; `engrave.h:47–48` ≡ `levl[engr_x][engr_y].typ==CORR ?
  S_engrcorr : S_engroom`). JS prints `rendered_glyph_char(x, y)` then
  re-points with exactly that CORR test on `e.engr_x/e.engr_y`. Inlined
  CLONE, verified here. Confirm.
- `:2210–2214` coord prefix: C MAP arm (`getpos.c:613`) is
  `Sprintf(outbuf, "<%d,%d>", x, y)` — bare `<x,y>`. The JS MAP-raw choice
  is therefore C-faithful, and bypassing the local helper's y<10 kitten
  space is a fix, not a deviation (it repaired seed2200 screen@103).
  SCREEN/COMPASS keep the helper; compass-full `(here)` text stays a named
  deferral (pre-existing, same as `look_all` D-2508). Confirm with that omit.
- `:2215` `"%s ", encglyph(glyph)`: shown arm renders live char; covered arm
  renders the re-pointed glyph via `glyph_showsym_code & 0xFF`
  (pre-existing `js/pager.js:1314`). tty-char equivalent. Confirm.
- `:2216–2218` BUFSZ guard → `slice`; `:2218–2219` Strcat+putmixed → push;
  `:2200–2208` upstart header + `"    "` separator: kept, order kept.
  `upstart` already imported. Confirm.
- `:2223–2227` display vs `pline("No engravings…")`: kept, including the
  `nearby ? " nearby" : ""` tail. `show_text_pages(lines, {moreAtEnd:true})`
  is the D-2508 `display_nhwindow(win, TRUE)` idiom (LIVE `js/pager.js:250`
  async, awaited). Confirm.
- Callers: `dowhatis` `case 'e'` → `look_engrs(true)` (`:2737`),
  `case 'E'` → `look_engrs(false)` (`:2740`) — exactly C `:1878/:1881`.
  Both arms wired. Confirm.

No RNG in C body; none in JS. Noomap: `eos` inline, NHW_TEXT idiom — named.

## Hallucinations / overclaim

None. "Match C" is claimed for the body and the body matches; the callee
`engraving_to_glyph`/`is_cmap_engraving` inlines are macro-exact, not stubs.
The cohort-fix story (MAP pad) checks out against C `getpos.c:613`.

## Density

One whole C function (87 L C → ~105 L JS), one module, map + verify in the
same handoff. Right-sized per §2b. No second subsystem.

## Verification

- D-log: syntax · rule2 · hidden note (0 blocked) · reach smoke 24/24 ·
  green 2/2 · strict ×2 · cohort 7/7 (seed2200 fixed) → VERIFY: PASS.
- Re-run here: `hidden-proxy.mjs verify look_engrs --base 8d4ef240~1
  --reach-all` → 0 blocked at baseline and working tree (vacuous note, no
  queue row cited blocks — honestly reported as such) + smoke 24 PASS,
  0 regressed → REACH-OK. Matches the D-log line for line.
- `imports.mjs --rulecheck`: Rule #2 clean (whole `js/`).
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/RNG calls.

## Actionable C-wrongs

None. No Must-fix, no CURRENT change.

Verdict: **ACCEPT**
