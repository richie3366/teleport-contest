# Review 1938 — 68cdee2bb — itemactions_pushkeys (D-2979)

- SHA: `68cdee2bb` (Must-fix from review 1935; `IA_QUAFF_OBJ` prefix plus `IA_NONE` / `default`)
- Files: `js/iactions.js` (`+11/−2`)
- Queue row: review 1935 item 1, 0 corpus blocks cited
- Banned grep: the hunk adds an import, two cases, and one `cmdq_add_ec`. No `FORCE`, `DIAG`, `getRngLog`, seed name, coordinate, or `fastforward`. Rule #2 on this tree: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (symbols the diff newly calls; the `impossible` import is a re-point onto the existing export):

```
do_reqmenu       js/cmd.js:583   ASYNC — await required
dodrink          js/potion.js:2308   ASYNC — await required
impossible       js/display.js:8333   ASYNC — await required
```

`imports.mjs --can js/iactions.js js/display.js impossible` and `--can js/iactions.js js/cmd.js do_reqmenu` both print `ALREADY`.

## Intent vs deliverable

Subject: quaff from the item menu queued `dodrink` and the invlet only, so a fountain or sink was still offered. Unknown actions were silent, and `IA_NONE` fell into that default.

The diff imports `impossible`, adds `case IA_NONE: break`, queues `do_reqmenu` before `dodrink` in `IA_QUAFF_OBJ`, and makes `default` `await impossible('Unknown item action %d', act)`. The other cases are untouched.

## Inventory

| JS | Class | C |
|----|-------|---|
| `itemactions_pushkeys` | file-local async | `iactions.c:139–274` staticfn |
| `do_reqmenu` | imported `cmd.js:583` | `cmd.c:1574–1586` |
| `dodrink` | imported `potion.js:2308` | `cmd.c:1809–1810` `ef_funct` |
| `impossible` | imported `display.js:8333` | `pline.c` (the `default` callee) |

## C ↔ JS fidelity

No `rn2`. C is one switch. `default` (`:144–145`) is `impossible("Unknown item action %d", act)` then break. `IA_NONE` (`:146–147`) breaks. `IA_QUAFF_OBJ` (`:207–212`) is `cmdq_add_ec(CQ_CANNED, do_reqmenu)`, then `dodrink`, then `otmp->invlet`. The only call is `itemactions_pushkeys(otmp, act)` at `iactions.c:707` after `select_menu`. `iactions.c:11` is the prototype.

JS signature is `(act, otmp)`. Both callers pass that order (`iactions.js:894` menu search, `:905` letter). The body uses `act` as the switch and `otmp.invlet` as the key.

`"quaff"` is `dodrink` with `CMD_M_PREFIX` only (`cmd.c:1809–1810`). Generated flags 128. `"reqmenu"` is `do_reqmenu` with `PREFIXCMD` (`cmd.c:1829–1830`). Generated flags 512. `const.js` has `CMD_M_PREFIX = 0x0080` and `PREFIXCMD = 0x0200`. `FUNCT_TXT` keys both (`cmd.js:1694`, `:1736`) with the same exports the dynamic import returns, so `cmdq_add_ec` stores those rows without a caller tab. Eat and tip still pass a `reqmenu` tab; lookup wins, so the extra tab is unused. Quaff matches C by omitting it.

`impossible` (`display.js:8333`) replaces `%d` from the rest args, so the message is `Unknown item action ` plus `act`, then returns. C `impossible` also returns after the urgent line. `IA_NONE` is 0 (`iactions.c:14`, `iactions.js:265`); without that case, act 0 would now hit `impossible`.

The other arms are the same queue shape as C, not this diff: unwield ternary then `HANDS_SYM` (`'-'`, `hack.h:577`); apply, dip (`dip_into`), name `'i'`/`'o'`, drop, eat (`do_reqmenu` then `doeat`), engrave, fire (no key), adjust, altadjust, sacrifice, buy, quiver, read, rub, throw, `ia_dotakeoff`, tip (`do_reqmenu` then `dotip`), invoke, wield, wear, swap (no key), twoweapon (no key), zap, whatis `'i'` then invlet. Enum values 0–27 match `iactions.c:13–42`. `IA_NAME_OBJ` falls through into `IA_NAME_OTYP` in both. Those callees are dynamic imports of the real functions, and the alternate commands are in `FUNCT_TXT` (`altdip`, `altadjust`, `altunwield`, `alttakeoff`).

## Hallucinations / overclaim

The subject describes the three arms this diff edits. "No arm omitted" matches the switch: every C case is present and queues the C function, not a stub. Ledger `ported` matches that. The argument swap is named in the comment and both call sites use it.

## Density

Eleven lines close the one Must-fix family. The rest of the switch was already the C cases. Below the breadth line-count because this iteration is that queued C-wrong.

## Verification

```
verify itemactions_pushkeys: baseline 68cdee2bb~1 (scoreboard at 516c184a8, 2026-09-27T16:12:21.056Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify itemactions_pushkeys: no corpus session is blocked on it at 68cdee2bb~1 — a vacuous verify is NOT a corpus PASS. ...
smoke itemactions_pushkeys: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks. D-2979 records green 2/2, strict ×2, cohort 7/7, skip full. This re-run shows no `REGRESSED` session.

## Actionable C-wrongs

None. Review 1935's missing `do_reqmenu` is the quaff arm above.

Verdict: **ACCEPT**
