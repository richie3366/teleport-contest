# Review 1736 — b7046f564 — color distance/spec parsers (D-2777)

- SHA: `b7046f564` (`coloratt.c` closest_color + color_distance + alt_color_spec + color_attr_parse_str, D-2777)
- Files: `js/options.js` (+256/−0), docs
- Queue rows: Open coverage (MISSING), 0 corpus blocks cited
- Banned grep: 0 hits. `imports.mjs --rulecheck`: "Rule #2 clean" (re-run this audit).

## Intent vs deliverable

Subject promises four whole-body ports + table. Diff delivers:
`color_256_definitions` (240 entries), `hexdd`, `color_distance`,
`closest_color`, `alt_color_spec`, `color_attr_parse_str`, and one
added import (`ATR_NONE` from terminal.js — an existing edge). All
four bodies verified whole below.

## Inventory

| JS symbol | Class | C (csym range) |
|-----------|-------|----------------|
| `color_256_definitions` (new, local) | C table | `coloratt.c:885–970` |
| `hexdd` (new, local) | C table | `decl.c:74` |
| `color_distance` (new, export) | C body | `coloratt.c:978–994` |
| `closest_color` (new, export) | C body | `coloratt.c:996–1021` |
| `alt_color_spec` (new, export) | C body | `coloratt.c:1110–1165` |
| `color_attr_parse_str` (new, export) | C body | `coloratt.c:260–301` |

Nothing deleted or re-pointed. Callees LIVE: `match_str2clr` /
`match_str2attr` (botl.js imports), `ATR_NONE=0` (terminal.js, matches
`wintype.h:128`), `BUFSZ`/`CLR_MAX`/`NO_COLOR` (existing imports).

## C ↔ JS fidelity

- Table: script-compared all 240 C `{index,value}` pairs against JS —
  identical. `hexdd` string byte-identical to `decl.c:74` ✓.
- `color_distance`: `>>>` ⟺ uint32_t shifts ✓, `| 0` on the
  non-negative mean ⟺ C int division ✓, `>> 8` on non-negative terms
  ✓ (max term 49.8M, exact in doubles; return < 2^31).
- `closest_color`: exact-match break + redmean scan with strict `<`
  (first-closest wins) ✓, `0x7fffffff` = INT_MAX ✓, null-box guard
  ⟺ pointer checks ✓, out-box writes ✓.
- `alt_color_spec`: `&&`-chains end in `!!`/comparison so the escape
  flags are boolean, not last-operands ✓; `#`/bare/decimal/single
  arms in C order ✓; index-walk `p` ⟺ `cp` ✓; no-else skip with
  counting ✓; `dcount > dlimit → -1` ✓; hex `(dp-hexdd)/2` ⟺
  `indexOf >> 1` (first-occurrence both; `f`→15, `F`→15, `0`→0
  re-checked) ✓. Empty-string arm: C reads `str[1]` past the NUL
  (UB — the comment's "OOB" is that read, not the well-defined
  `strchr(dec,NUL)`); JS returns −1, documented ✓.
- `color_attr_parse_str`: BUFSZ−1 slice ✓, first-`&` split with
  `*amp=NUL` semantics ✓, FIXME retry-swapped arm verbatim ✓,
  attr-before-color single-token order ✓, `ca` written only on
  success ✓.
- Guards: `alt_color_spec` sits inside `#ifdef CHANGE_COLOR`
  `:1033–1166`, defined only in amiconf.h:165 (unixconf silent), so
  leaving it unwired matches contest C ✓; the `:232` guard ends at
  `:234`, so `color_attr_parse_str` compiles ✓. No RNG.

## Hallucinations / overclaim

None. The "xterm formula" cross-check claim is consistent with the
script-verified identical table.

## Density

~200 behavior lines (half table) for four C functions: in range.
Named omits (three callers, second table reader, `""` edge) are in
the map in this commit.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify closest_color --base
b7046f564~1 --reach-all`: 0 blocked + vacuous note (expected) +
smoke 24/24 REACH-OK. Matches the D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
