# Review 1758 — 7a4911ae6 — petattr_to_tty (D-2799)

- SHA: `7a4911ae6` (Must-fix from review 1751; paint map for `wc2_petattr`)
- Files: `js/display.js` (+40/− a few in `petattr_to_tty` only)
- Queue row: review 1751 Must-fix, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk (`FORCE` / `DIAG` / `getRngLog` / seed names / `fastforward` / coordinates). `imports.mjs --rulecheck` on this SHA: "Rule #2 clean".
- No symbol was deleted or re-pointed from a local clone to an import. New names are bit constants already imported from frozen `terminal.js`.

## Intent vs deliverable

Subject promises a wintype→terminal map: none → 0, bold → terminal `ATR_BOLD` (2), underline → `ATR_UNDERLINE` (4), inverse → `ATR_INVERSE` (1); dim, italic, and blink return 0; an unset field still paints inverse. The diff does that and nothing else. `optfn_petattr` / `handler_petattr` are untouched.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `petattr_to_tty` | local paint clone of `s_atr2str` | no C function of this name; `termcap.c:1339–1376` |
| `ATR_BOLD` / `ATR_UNDERLINE` / `ATR_INVERSE` | frozen bit constants | `terminal.js:26–28` (2 / 4 / 1) |
| `mon_map_attr` / `glyph_tty_attr` | existing callers | `wintty.c:3928` |

`csym --callers term_start_attr`: the pet site is `wintty.c:3928` `term_start_attr(iflags.wc2_petattr)`. `:3935` is `ATR_INVERSE` for detect/pile/gender, not `wc2_petattr`. `:1186`, `:1318`, `:1807`, `:2338`, `:2350`, `:4959–4969`, `:5170` are menu or status attrs. JS pet paint: `mon_map_attr` at `display.js:618` and `:1350`; `glyph_tty_attr` at `:1911`, `:1974`, and `detect.js:1221`.

`sym.mjs` (this tree; `display.js` is unchanged after this SHA):

```
petattr_to_tty   NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/display.js:311
ATR_BOLD         js/terminal.js:27   sync   export const
ATR_UNDERLINE    js/terminal.js:28   sync   export const
ATR_INVERSE      js/terminal.js:26   sync   export const
```

## C ↔ JS fidelity

`wintype.h:128–134`: `ATR_NONE` 0, `ATR_BOLD` 1, `ATR_DIM` 2, `ATR_ITALIC` 3, `ATR_ULINE` 4, `ATR_BLINK` 5, `ATR_INVERSE` 7. `options.c:3163` stores `match_str2attr`'s enum in `iflags.wc2_petattr`. `initoptions:7264` assigns `ATR_INVERSE` unconditionally; that function is still not in JS. `petattr_to_tty(null)` returns terminal inverse, and `undefined == null`, so a missing field matches the init value. A stored 0 is `ATR_NONE`: `term_start_attr` (`termcap.c:1430–1438`) skips the call when `attr` is 0. The old helper painted 0 as inverse. That collision is fixed.

`s_atr2str` (`termcap.c:1339–1376`) is the paint. On the ANSI default tty (`termcap.c:157–159`) `nh_HI`, `nh_US`, and `MR` are set; `ZH`, `MB`, `MH`, and `MD` stay null (`:46–47`).

| wintype | C `s_atr2str` | JS |
|--------:|---------------|----|
| 0 none | no start (`:1433` `if (attr)`) | 0 |
| 1 bold | `nh_HI` (`:1363–1364`) | terminal bold 2 |
| 2 dim | `MH` null → `nulstr` (`:1370–1374`) | 0 |
| 3 italic | `ZH` null, `n != ATR_BLINK`, `nh_US` set → underline (`:1343–1356`) | 0 |
| 4 underline | `nh_US` (`:1354–1356`) | terminal underline 4 |
| 5 blink | `MB` null, fall through, `MD` null, `nh_HI` set → bold (`:1349–1364`) | 0 |
| 7 inverse | `MR` (`:1366–1368`) | terminal inverse 1 |

None, bold, dim, underline, and inverse match. Italic and blink do not. The clone returns 0 in `default`. C substitutes underline and bold precisely because italic and blink capabilities are absent.

## Hallucinations / overclaim

The subject describes the diff: those three enums return 0 so the raw integers are not passed through. That part is true, and it closes review 1751's bit-alias (bold 1 painting inverse, dim 2 painting bold).

The D-log named-omission sentence is not true of C: "This terminal has no italic or blink bit, so those enums paint as 0." Empty `ZH` / `MB` is why `s_atr2str` falls through, not why it emits nothing. The map records the fallthrough as named and then does not apply it. A divergent clone of `s_atr2str` is a C-wrong, not an omit. No "Match C" claim on a stubbed dispatch of `optfn_petattr`; that body was not in this diff.

## Density

One helper, well under 40 insertions. Right size for this Must-fix. Not an arm-only port of a coverage row.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify optfn_petattr --base 7a4911ae6~1 --reach-all` on this SHA (worktree; pinned C submodule linked). `optfn_petattr` draws no RNG, so reach is the smoke spread:

```
verify optfn_petattr: baseline 7a4911ae6~1 (scoreboard at 0cf2f655d, 2026-09-25T20:29:49.553Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify optfn_petattr: no corpus session is blocked on it at 7a4911ae6~1 — a vacuous verify is NOT a corpus PASS. …
smoke optfn_petattr: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The Must-fix cited 0 blocks. D-log's "no corpus session blocked" and "smoke 12/12, 0 regressed" match this re-run. No `REGRESSED` session. The italic/blink gap is not on that smoke path (default pet attr is inverse).

## Actionable C-wrongs

1. `js/display.js` `petattr_to_tty`: wintype `ATR_ITALIC` (3) must follow `s_atr2str` (`termcap.c:1343–1356`) onto terminal underline, and `ATR_BLINK` (5) must fall through to terminal bold (`:1349–1364`). Returning 0 for both drops the fallback. Dim stays 0 (`:1370–1374`, `MH` null, no fallthrough).

Verdict: **QUALITY-RISK**
