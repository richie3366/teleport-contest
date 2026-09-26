# Review 1815 — 2c0c6d7ee — pre_mm_attack (D-2856)

- SHA: `2c0c6d7ee` (coverage; `mhitm.c` `pre_mm_attack`)
- Files: `js/mhitm.js` (+44/−8)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, seed name, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises one `pre_mm_attack`: defender then attacker, `seemimic` when `M_AP_TYPE` is set, otherwise clear `mundetected`, even when the hero cannot see the fight. `showit` is set only on a reveal while `_mm_vis` is true. A visible fight then `map_invisible`s an unspottable monster or `newsym`s a revealed spottable one. The diff replaces the early `if (!_mm_vis) return` plus the two `map_invisible` calls with that body. No new helper.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `pre_mm_attack` | local `mhitm.js:4022` (C is `staticfn`) | `mhitm.c:40–72` |
| `seemimic` | LIVE `mon.js:1178` (sync, already `newsym`s) | `mon.c` |
| `M_AP_TYPE` | LIVE `const.js:3218` | `monst.h` mask |
| `canspotmon` / `map_invisible` / `newsym` | LIVE `display.js` | the `gv.vis` block |
| `_mm_vis` | module flag `mhitm.js:5937` | `mattackm` `gv.vis` at `mhitm.c:358–359` |

`sym.mjs` (nothing deleted or re-pointed):

```
pre_mm_attack    NOT EXPORTED — 1 LOCAL: js/mhitm.js:4022
seemimic         js/mon.js:1178   sync
canspotmon       js/display.js:1366   sync
map_invisible    js/display.js:1374   sync
newsym           js/display.js:5104   sync
M_AP_TYPE        js/const.js:3218   sync
```

## C ↔ JS fidelity

`csym` body is `mhitm.c:40–72`. Calls: `missmm` at `:81` and `hitmm` at `:657`. `:745` is a comment in `gazemm`, not a call. JS calls the function from `missmm` (`mhitm.js:4060`) and `hitmm` (`:5463`).

Defender first, then attacker. `M_AP_TYPE` true calls `seemimic` and sets `showit` when `_mm_vis` is set. Otherwise a set `mundetected` is cleared and `showit` is set the same way. `showit = showit || !!_mm_vis` is C's `showit |= gv.vis` (0/1). No `rn2`.

When `_mm_vis` is set, the attacker is drawn before the defender: `!canspotmon` → `map_invisible(mx, my)`, else if `showit` → `newsym`. A fight with nothing concealed leaves `showit` false, so a spottable monster is not redrawn. An invisible fight still unhides both and skips the map block, because the unhide `if`s are outside `if (_mm_vis)`. `seemimic` (`mon.js:1178–1193`) clears `m_ap_type`, unblocks a light-blocking disguise, and `newsym`s. The later `newsym` is the second draw C does when `showit` is set.

`_mm_vis` is `mattackm`'s visibility (`mhitm.c:358–359`): `cansee && canspotmon` on either monster. The displacement function's `gv.vis` (`:222`, both must be spottable) is a different flag. `pre_mm_attack` runs from `hitmm` / `missmm` under the `mattackm` flag. No RNG.

## Hallucinations / overclaim

The subject says a fight the hero cannot see still unhides both. The unhide arms sit above `if (_mm_vis)`. It names `gazemm`'s own `seemimic` and unconditional `mundetected = 0` (`mhitm.c:746–748`), and `mattackm` clearing the defender's `mundetected` before `gv.vis` (`js/mhitm.js:5925–5927`, C `:327–351`). Those are outside this function. "Match C" is the body and the two real callers.

## Density

The whole 33-line body and both C callers. Under the 200-line floor because C is that small. `gazemm` stays the named duplicate, not a third caller.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify pre_mm_attack --base 2c0c6d7ee~1 --reach-all`.

```
verify pre_mm_attack: baseline 2c0c6d7ee~1 (scoreboard at ddddc6312) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke pre_mm_attack: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. Green and cohort were not re-run in this audit.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
