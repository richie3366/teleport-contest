# Review 1769 — 302f02151 — petattr italic and blink (D-2810)

- SHA: `302f02151` (Must-fix from review 1758)
- Files: `js/display.js` `petattr_to_tty` (`:308`)
- Queue row: review 1758 C-wrong, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on this SHA: "Rule #2 clean".
- No symbol was deleted or re-pointed. `ATR_BOLD` / `ATR_UNDERLINE` / `ATR_INVERSE` stay the frozen `terminal.js` bits (2 / 4 / 1).

## Intent vs deliverable

Subject promises the ANSI-default `s_atr2str` results: italic and underline return terminal underline, blink falls through to terminal bold, dim and none stay 0, inverse stays terminal inverse, and an unset field still stands in for wintype inverse. The diff replaces the helper's switch and nothing else.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `petattr_to_tty` | file-local clone of `s_atr2str` for the ANSI default tty | no C function of this name; `termcap.c:1339–1376` |
| `mon_map_attr` | caller `:334` | `wintty.c:3928` `term_start_attr(iflags.wc2_petattr)` |
| `glyph_tty_attr` | caller `:347` | same pet site; detect/female stay other arms |

`csym --callers s_atr2str`: declaration `:18`, a comment on `term_attr_fixup` `:1409`, and the only call `term_start_attr` `:1434`. `csym --callers term_start_attr`: the pet site is `wintty.c:3928`. `:3935` is `ATR_INVERSE` for detect/pile/gender. `:1186`, `:1318`, `:1807`, `:2338`, `:2350`, `:4959–4969`, `:5170` are menu or status. Those are not `wc2_petattr`.

`sym.mjs`:

```
petattr_to_tty   NOT EXPORTED — 1 LOCAL at js/display.js:308
ATR_BOLD         js/terminal.js:27   sync   export const
ATR_UNDERLINE    js/terminal.js:28   sync   export const
ATR_INVERSE      js/terminal.js:26   sync   export const
```

The "LOCAL" line is this one helper, not a second copy.

## C ↔ JS fidelity

`wintype.h:128–134`: none 0, bold 1, dim 2, italic 3, underline 4, blink 5, inverse 7. `s_atr2str` (`termcap.c:1339–1376`) returns a capability string or `nulstr`. `term_start_attr` (`:1430–1438`) does nothing when `attr` is 0, and `xputs` only when the string is non-empty.

The ANSI default block (`termcap.c:157–159`, inside `ANSI_DEFAULT`) sets `nh_HI`, `nh_US`, and `MR`. `ZH`, `MB`, `MD`, and `MH` are the null statics at `:46–47`; that block does not assign them. Under those pointers:

| wintype | C | JS `:308` |
|--------:|---|-----------|
| 3 italic | `ZH` null, fall through; `n != ATR_BLINK`; `nh_US` set → underline (`:1343–1356`) | `n !== 5` → `ATR_UNDERLINE` |
| 4 underline | same `nh_US` arm | `ATR_UNDERLINE` |
| 5 blink | `MB` null, so the blink arm does not return; fall through; `MD` null; `nh_HI` set → bold (`:1349–1364`) | skips the underline return, falls through to `ATR_BOLD` |
| 1 bold | `MD` null, `nh_HI` set → bold (`:1359–1364`); `break` | `ATR_BOLD` |
| 7 inverse | `MR` set → inverse (`:1366–1368`) | `ATR_INVERSE` |
| 2 dim | `MH` null, `break`, `nulstr` (`:1370–1375`); no fall through | 0 |
| 0 / other | `nulstr` | 0 |

`petattr_to_tty(null)` returns terminal inverse before the switch. `initoptions` `:7264` still has no JS function; the null stand-in is that assignment (`ATR_INVERSE`, and `MR` is set, so the paint is the inverse bit). A stored 0 stays 0.

The helper hardcodes those eight capability results. It does not read `ZH`/`MB`/`MD`/`MH`. On this tty they are null and `nh_US` / `nh_HI` / `MR` are set, which is the table above. `term_attr_fixup` (`:1411–1428`) is a different function and is not this helper.

## Hallucinations / overclaim

The subject says italic paints underline and blink paints bold. That matches `s_atr2str` on the ANSI default, which is what review 1758 required. It does not claim `s_atr2str` is exported or that every `term_start_attr` site was rewired. Those stays match the caller list.

## Density

One helper. The Must-fix was this map, not a coverage row.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify optfn_petattr --base 302f02151~1 --reach-all`. `petattr_to_tty` is not a C symbol; `optfn_petattr` is the D-log function, and it draws no RNG.

```
verify optfn_petattr: baseline 302f02151~1 (scoreboard at 7041ab3e4) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke optfn_petattr: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note, not a false PASS. D-2810's green, strict, cohort, and full 44/44 were not re-run here.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
