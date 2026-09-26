# Review 1851 — e24078a71 — unicodeval_to_utf8str (D-2892)

- SHA: `e24078a71` (coverage; `hacklib.c` `unicodeval_to_utf8str`)
- Files: `js/hacklib.js` (one export, 42 lines)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one encoder: `bufsz < 5` returns 0 without a write; otherwise a leading NUL, then the 1-, 2-, 3-, or 4-byte form, with surrogates and values past U+10FFFF returning 0 after that leading NUL. The diff adds that function and nothing else in `js/`. `sym.mjs`:

```
unicodeval_to_utf8str js/hacklib.js:582   sync
```

No symbol was deleted or re-pointed. No callees.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `unicodeval_to_utf8str` | export `hacklib.js:582` | `hacklib.c:882–919` |

## C ↔ JS fidelity

`csym` body is `hacklib.c:882–919`. Call sites: `glyphs.c:70` and `glyphs.c:1292`. No RNG.

`uval` is `uval | 0` (`int`). `bufsz` is `bufsz >>> 0` (`size_t`). `n < 5` returns 0 before any store (`:887–888`).

The next store is `buffer[0] = 0` (`*b = '\0'` at `:897`). A negative `uval` is `< 0x80`, so it takes the one-byte arm. `buffer[i++] = uval & 0xff` is the `uint8` truncation of that `int` (`-1` stores `0xff`).

Two bytes when `uval < 0x800`: `192 + (uval / 64)` and `128 + (uval % 64)`. Three bytes: `224 + uval / 4096`, `128 + (uval / 64) % 64`, `128 + uval % 64`. Four bytes: `240 + uval / 262144` and the three continuation bytes. C `/` and `%` associate left to right, and both only run for `uval >= 0x80`, so toward-zero `int` division and JS `(uval / N) | 0` match. Each sum is masked with `& 0xff`. The values that reach those arms fit in 8 bits (two-byte lead max 223, four-byte lead max 244).

The surrogate test is `uval - 0xd800u < 0x800` (`:903`). Usual arithmetic conversions make that unsigned. JS is `(((uval >>> 0) - 0xd800) >>> 0) < 0x800`. `0xD800` through `0xDFFF` return 0. `0xD7FF` underflows to a value that is not `< 0x800` and falls through to the three-byte arm. A reject here, and the `else` past `0x10FFFF`, return 0 after the leading NUL and do not write the trailing NUL. Success writes `buffer[i] = 0` and returns 1 (`:917–918`).

## Hallucinations / overclaim

`glyphs.c:70` is inside `to_custom_symset_entry_callback`, and that call is compiled: `config.h:368` defines `ENHANCED_SYMBOLS`. The commit names that callback, `unicode_val` (`utf8map.c:18–34`), and `add_custom_urep_entry` (`utf8map.c:148–207`) as the unported writer. Nothing in `js/` calls the new export. `glyphs.c:1292` is `to_unicode_callback`, which sits under `#ifdef TEST_GLYPHNAMES` (`glyphs.c:1239`). That macro is not defined in this tree, so the call is compiled out. The subject says so.

## Density

The whole 39-line function. No arm left as a stub. The one compiled caller is a named omit, not a silent miss inside this body.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify unicodeval_to_utf8str --base e24078a71~1 --reach-all`.

```
verify unicodeval_to_utf8str: baseline e24078a71~1 (scoreboard at 149143cd5) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke unicodeval_to_utf8str: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The encoder does not run on the public sessions.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
