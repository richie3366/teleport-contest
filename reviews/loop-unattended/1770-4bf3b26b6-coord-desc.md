# Review 1770 — 4bf3b26b6 — coord_desc compass and autodescribe (D-2811)

- SHA: `4bf3b26b6` (coverage PARTIAL; the pager clone)
- Files: `js/pager.js` (clone deleted), `js/getpos.js` autodescribe (`:1339`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on this SHA: "Rule #2 clean".
- `imports.mjs --can pager.js display.js coord_desc` → `ALREADY`. Same for `getpos.js`.

## Intent vs deliverable

Subject promises the pager-local `coord_desc` is gone, lists call the `display.js` export, the `y < 10` space is only `look_all`'s kitten, and getpos autodescribe appends ` ${coord_desc}` when the mode is not `GPCOORDS_NONE`. The diff does that. It does not edit `display.js`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `coord_desc` | imported `display.js:7530`, sync | `getpos.c:595–635` |
| `dxdy_to_dist_descr` | same file, called by the export | `getpos.c:557–589` |
| `xytodir` / `directionname` | imported via that helper (`const.js:245` / `:268`) | `cmd.c:3846–3855` / `:4312–4323` |
| `look_coord_prefix` | file-local formatter | `pager.c` `%s` / `%8s` / `%12s` |
| pager `coord_desc` | deleted | was the `(here)` clone |

`csym --callers coord_desc`: `getpos.c:651` → `getpos.js:1339`; `:702` → `getpos.js:975`; `mon.c:5086` → `makemon.js:1312`; `pager.c:2032` → `pager.js:2217`; `:2043` → `:2229` via `look_coord_prefix`; `:2125` → `:2314`; `:2214` → `:2411`; `pline.c:180` → `display.js:7658`. `extern.h:1150` is the declaration.

`sym.mjs` (clone deleted, call re-pointed at the existing export):

```
coord_desc       js/display.js:7530   sync
dxdy_to_dist_descr js/display.js:7500   sync
look_coord_prefix NOT EXPORTED — 1 LOCAL at js/pager.js:345
xytodir          js/const.js:245   sync
directionname    js/const.js:268   sync
```

## C ↔ JS fidelity

`coord_desc` (`getpos.c:600–633`): unknown `cmode` leaves the buffer empty. MAP is `<%d,%d>` with no trailing space (`:612–615`). SCREEN is `[%02d,%02d]` of `y+2, x` when `ROWNO-1+2 < 100` and `COLNO-1 < 100` (`:625–631`). COMPASS and COMFULL are `(dxdy_to_dist_descr(x-ux, y-uy, cmode == COMFULL))` (`:604–610`). The export (`display.js:7530–7550`) is that switch. `GPCOORDS_*` are `'n'/'m'/'c'/'f'/'s'` (`const.js:1203–1207`), so `'n'` hits `default` and returns `''`.

`dxdy_to_dist_descr`: `!dx && !dy` → `here`; else `xytodir != -1` → `directionname` (west…up, `"invalid"` out of range); else counted `n/s` then `w/e`, comma only when both axes are set, `abs` clamped at 9999, long words only when `fulldir`. JS `:7500–7523` is that order. `directionname`'s ten strings match `cmd.c:4316–4318`.

The deleted pager clone returned `(here)` for COMPASS and `'f'`, and it appended the `y < 10` space inside MAP. Callers now get the export.

`look_all` kitten is after `coord_desc`, and only there (`pager.c:2052–2053`). `look_coord_prefix(..., true)` adds the space, then SCREEN `"%s  "`, MAP `"%8s  "` (`padStart(8)`), else `"%12s  "`. Traps (`:2122–2125`) and engravings (`:2211–2214`) pass `false`, so they do not kitten. Engravings keep one space after the glyph (`"%s "`); traps and `/m` keep two (`"%s  "`). The header (`:2031–2033`) uses bare `coord_desc` when `cmode != COMPASS` — the old `.replace(/ $/, '')` was only there to undo the clone's kitten, and it is gone. `look_getpos_cmode` still maps `'n'` to MAP (`pager.c:2024–2025`).

Autodescribe (`getpos.c:651–658`): space plus `tmpbuf` only when `coord_desc` wrote something, then `" (invalid target)"` then `" (no travel path)"`. JS `:1337–1341` appends ` ${coords}` only when `coord_desc` returns a non-empty string, then `auto_describe_suffix` in that suffix order. `GPCOORDS_NONE` stays a bare firstmatch.

`getpos_menu` (`:702–705`), `wiz_force_cham_form` (`mon.c:5086–5088`, NONE → MAP), and `vpline` (`pline.c:180–182`, NONE → COMFULL) already called the export. Those cmode gates match.

## Hallucinations / overclaim

The subject does not say `auto_describe_text` grew price or altar text. The D-log's caller lines match the sites above. Compass is the export's `dxdy_to_dist_descr`, not a leftover `(here)`.

## Density

Wiring an existing 40-line function through its C callers. The body was already in `display.js`. Not an arm sold as a new port. The named autodescribe gaps (firstmatch-only text, `brief_at` when `terrainmode` is off) stay named; the token is now on that brief too, which is what `getpos.c:651` does once a description exists.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify coord_desc --base 4bf3b26b6~1 --reach-all`.

```
verify coord_desc: baseline 4bf3b26b6~1 (scoreboard at 7041ab3e4) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke coord_desc: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note, not a false PASS. D-2811's green 2/2, strict ×2, and cohort 7/7 were not re-run here.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
