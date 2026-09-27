# Review 1877 — 270a11ee8 — fix_ghostly_obj and sanitize_name (D-2918)

- SHA: `270a11ee8` (coverage; `bones.c` `fix_ghostly_obj`, same-file `sanitize_name` and `set_ghostly_objlist`, `options.c` `petname_optfn`)
- Files: `js/bones.js`, `js/end.js` (`savebones`), `js/pickup.js`, `js/options.js`, `js/mklev.js` (`fruitadd_orc`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunks. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs`:

```
fix_ghostly_obj  js/bones.js:149   ASYNC — await required
sanitize_name    js/bones.js:99   sync
set_ghostly_objlist js/bones.js:129   sync
petname_optfn    NOT EXPORTED — 1 local js/options.js:5311
You              js/display.js:7672   ASYNC — await required
the              js/objnam.js:1741   sync
xname            js/objnam.js:984   sync
```

`petname_optfn` is `staticfn`. One local is that function. `imports.mjs --can` for `pickup.js` / `end.js` / `options.js` / `mklev.js` → `bones.js`: ALREADY.

## Intent vs deliverable

Subject promises `fix_ghostly_obj` in C order, `sanitize_name` keeping an 8-bit character unless tty is stripping, `set_ghostly_objlist` on the savebones chains, and `petname_optfn` on the cat / dog / horse rows. The diff does that. The two inline 7-bit masks in `fruitadd_bones` and `fruitadd_orc` now call `sanitize_name`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `fix_ghostly_obj` | async export `bones.js:149` | `bones.c:796–815` (`csym` span `:793–815` includes the comment) |
| `sanitize_name` | export `bones.js:99` | `bones.c:198–220` |
| `set_ghostly_objlist` | export `bones.js:129` | `bones.c:783–790` |
| `petname_optfn` | file-local `options.js:5311` | `options.c:847–874` |
| `optfn_catname` / `dog` / `horse` | file-local wrappers | `options.c:1249`, `:1563`, `:1897` |
| pickup caller | `pickup.js:1586` | `pickup.c:1884–1885` |
| savebones callers | `end.js:1636`, `:1698–1701` | `bones.c:455`, `:542`, `:555`, `:557` |

## C ↔ JS fidelity

`fix_ghostly_obj`: return when `!obj->ghostly`. Switch `BOW`, `ELVEN_BOW`, `ORCISH_BOW`, `YUMI`, `BOOMERANG` calls `You("make adjustments to %s to suit your %s hand.", the(xname(obj)), URIGHTY ? "right" : "left")`. `URIGHTY` is `u.uhandedness == RIGHT_HANDED` (`you.h:564`, `RIGHT_HANDED` is `0x00` at `you.h:441`). `default` is empty. Then `ghostly = 0`. `You` is `vpline("You " + fmt, ...args)`. No RNG. The only call is `pickup.c:1885` inside `if (obj->ghostly)`, after `pickup_prinv` and before clearing `mrg_to_wielded`. JS does that. `extern.h:258` only declares it.

`sanitize_name`: `strip_8th_bit` is `WINDOWPORT(tty) && !iflags.wc_eight_bit_input`. `windowport_tty()` returns true. Default `wc_eight_bit_input` unset means strip. Each byte: stop at NUL; `c = byte & 0177`; if `c < ' '` or DEL, store `.`; else if `c != byte` and stripping, store `_`; else leave the byte. JS walks code units the same way. Callers: `resetobjs` (`bones.c:80`), `getbones` (`:718`), `sanitize_engravings` (`engrave.c:1503`), `petname_optfn` (`options.c:867`), `optfn_fruit` (`:1749`), `fruitadd` else (`:8260` → `fruitadd_bones` and `fruitadd_orc`).

`set_ghostly_objlist` sets `ghostly = 1` and follows `nobj` only. An array (JS `invent` / `minvent`) marks each element and does not follow `nobj`. A head object uses the `nobj` loop. Contents (`cobj`) are not walked in C either. `savebones` calls it on `invent` before the arise/drop (`bones.c:455`), then on each `fmon` minvent (`:542`), `fobj` (`:555`), and `buriedobjlist` (`:557`). The `resetobjs(..., FALSE)` calls beside those three stay named; the ghostly walk is present.

`petname_optfn`: `do_init` empty. `do_set` returns `OPTN_ERR` when `op` is the empty sentinel and not negated; negation / `"none"` / `"(none)"` clears; `nmcpy` to `PL_PSIZ` then `sanitize_name`; the three idx values on the rows (`29` cat, `46` dog, `77` horse) write `game.catname` / `dogname` / `horsename`, which `makedog` reads. Any other idx writes nothing (C's `failsafe`). `get_val` of an empty name is `"(none)"`; `get_cnf_val` is `"none"`. The dispatcher passes `allopt[i].idx` (`options.js:8622`, `:8689`).

## Hallucinations / overclaim

The subject says no arm of `fix_ghostly_obj` or `sanitize_name` is omitted. The switch and the byte walk match. "Does not walk `cobj`" is what `bones.c:783–790` does, not a dropped arm. `resetobjs(FALSE)` on the three chains and the extra `init_fruit_chain` `sanitize_name` are named and are outside those two bodies.

## Density

Two functions in `bones.c` plus the static marker and the options caller that was a null `optfn`. No stub in the bow switch or the sanitize loop. `You`, `the`, and `xname` are live.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify fix_ghostly_obj --base 270a11ee8~1 --reach-all`.

```
verify fix_ghostly_obj: baseline 270a11ee8~1 (scoreboard at d179e940b, 2026-09-27T01:04:48.937Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify fix_ghostly_obj: no corpus session is blocked on it at 270a11ee8~1 — a vacuous verify is NOT a corpus PASS. …
smoke fix_ghostly_obj: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44/44 are the port's own verify line.

## Actionable C-wrongs

None. The ghostly return, the five weapon types, the handedness line, and the 7-bit / 8-bit sanitize arms match `bones.c:800–814` and `bones.c:201–218`.

Verdict: **ACCEPT**
