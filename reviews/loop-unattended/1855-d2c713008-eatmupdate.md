# Review 1855 — d2c713008 — eatmupdate (D-2896)

- SHA: `d2c713008` (coverage; `eat.c` `eatmupdate`)
- Files: `js/eat.js` (export), `js/potion.js` (`make_hallucinated` call)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean". `imports.mjs --can potion.js eat.js eatmupdate` → `ALREADY`.

## Intent vs deliverable

Subject promises one `eatmupdate`: if `nomovemsg` is the mimic buffer, an orange appearance with hallucination off becomes the gold message, and a gold appearance with hallucination on becomes the orange message, then `newsym`. The diff adds that and calls it from `make_hallucinated` when `!Hallucination()`. `sym.mjs`:

```
eatmupdate    js/eat.js:1832   sync
Hallucination js/display.js:1091   sync
              (also js/do_name.js:259 — eat.js imports display.js)
newsym        js/display.js:5104   sync
M_AP_TYPE     js/const.js:3218   sync
```

No symbol was deleted.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `eatmupdate` | export `eat.js:1832` | `eat.c:181–213` |
| `M_AP_TYPE` | live import | `monst.h:73`; `is_obj_mappear` is `:243–244` |
| `Hallucination` | live import | `youprop.h` via `display.js:1091` |
| `newsym` | live import | `eat.c:211` |
| `eatmStrlen` | local | `Strlen` (`global.h:288`) on these ASCII strings |
| `make_hallucinated` | the only caller | `potion.c:418` |

## C ↔ JS fidelity

`csym` body is `eat.c:181–213`. One caller, `potion.c:416–418`, inside `if (changed)` and `if (!Hallucination)`. No RNG.

Return unless `eatmbuf` is set and `nomovemsg` is that same pointer (`:186`). The mimic start stores both as the same string (`eat.js:1963–1966`). `!==` is that pointer test.

`is_obj_mappear(mon, otyp)` is `M_AP_TYPE == M_AP_OBJECT` and `mappearance == otyp`. Orange and `!Hallucination()` sets "You now prefer mimicking yourself." and `GOLD_PIECE`. Gold and `Hallucination()` sets "Your rind escaped intact." and `ORANGE`. `ORANGE_OTYP` / `GOLD_PIECE` are the `objectNames` indices the mimic writer already stores (`eat.js:1970`).

`Strlen(altmsg) > Strlen(eatmbuf)` is the realloc test. Both JS arms assign `eatmbuf = altmsg`. A JS string cannot be overwritten in place, so the `strcpy` arm and the `alloc` arm store the same characters. `nomovemsg` is then that string, which is what `strcpy` returns. `mappearance` becomes `altapp`. `newsym(u.ux, u.uy)` follows.

The only caller passes the `!Hallucination()` gate, so the gold arm does not run from `make_hallucinated`. The arm is still in the function, after the orange test, as in C.

## Hallucinations / overclaim

`alloc` and `free` are the reseat. There is no C heap. `set_mimic_blocking`, `curs_on_u`, and the first-polyself `livelog_printf` stay on `cpostfx`, which this commit does not claim to finish. The subject says the gold arm is not entered by this caller. That matches `potion.c:417`.

## Density

The whole 34-line function and its one caller. The length test does not change the stored text; both arms write `altmsg`.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify eatmupdate --base d2c713008~1 --reach-all`.

```
verify eatmupdate: baseline d2c713008~1 (scoreboard at e4c6400a6) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke eatmupdate: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
