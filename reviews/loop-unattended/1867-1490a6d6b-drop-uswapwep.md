# Review 1867 — 1490a6d6b — drop_uswapwep (D-2908)

- SHA: `1490a6d6b` (coverage; `wield.c` `drop_uswapwep`)
- Files: `js/wield.js` only
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck` (this tree): "Rule #2 clean: no bare/node specifiers or fs calls in js/." `--can js/wield.js js/objnam.js Yobjnam2` is ALREADY. `--can js/wield.js js/do.js dropx` is IN-SCC, VERDICT SAFE (hoisted `dropx`; the function still dynamic-imports it).
- `sym.mjs` on the names the messages now call:

```
Yobjnam2         js/objnam.js:2801   sync
             !! ALSO 2 LOCAL CLONE(S) in 2 files — IMPORT the export; do NOT add another
               js/sit.js:231  js/wield.js:1240
yobjnam          js/objnam.js:2791   sync
otense           js/objnam.js:2487   sync
dropx            js/do.js:2532   ASYNC — await required
body_part_latebound js/objnam.js:2580   sync
```

`drop_uswapwep` calls `objnam_Yobjnam2`, the export. The file-local at `wield.js:1240` is not on this path.

## Intent vs deliverable

Subject promises one async `drop_uswapwep`: `body_part(HAND)` via the late-bound seam, `Yobjnam2` on the slip and evade lines, `Your` plus `yobjnam(obj, null)` on the already-twoweap line, then `dropx`. The diff replaces the hardcoded `"left hand"` and the three `xname` sentences with that. The early `if (!obj) return` is gone.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `drop_uswapwep` | async export `wield.js:1143` | `wield.c:807–831` |
| `body_part_latebound` | live `objnam.js:2580` | `body_part` once `polyself.js:629` has called `set_body_part` |
| `Yobjnam2` | live export `objnam.js:2801` | `objnam.c:2279–2286` (`highc` of `yobjnam`) |
| `yobjnam` | live `objnam.js:2791` | `objnam.c:2261–2276` |
| `otense` | live `objnam.js:2487` | `objnam.c:2530–2546` |
| `Your` / `pline` | live `display.js` | prefix then `vpline` `%s` |
| `dropx` | live `do.js:2532` | `do.c:783–796` |
| local `Yobjnam2` | clone `wield.js:1240`, not called here | always `"Your "` + `xname` + `vtense` |
| `can_twoweapon` | `wield.js:1211` | `wield.c:800` |
| `curse` | `mkobj.js:614` | `mkobj.c:1801` |
| `hmonas` | `uhitm.js:4241` | `uhitm.c:5843` |

## C ↔ JS fidelity

`csym` body is `wield.c:807–831`. No RNG. `makeplural(body_part(HAND))` is the comment at `:814–817`, not a call. `Sprintf(left_hand, "left %s", body_part(HAND))` is `` `left ${body_part_latebound(HAND)}` ``. Unset, the seam returns `"hand"` (humanoid). `polyself.js` installs the real `body_part` at load.

`obj` is `uswapwep` with no null test. C dereferences it. The three callers already require the object: `can_twoweapon` has passed the empty-hand return; `curse` tests `otmp == uswapwep && u.twoweap`; `hmonas` tests `uswapwep && weapon == uswapwep && cursed`.

`!obj->cursed` is the Glib attempt: `pline("%s from your %s!", Yobjnam2(obj, "slip"), left_hand)`. `else if (!u.twoweap)` is the cursed attempt: `Yobjnam2(obj, "evade")`, `otense(obj, "drop")`, `left_hand`. `else` is already two-weaponing: `Your("%s spasms and drops %s!", left_hand, yobjnam(obj, (char *) 0))`. Then `dropx(obj)`.

`pline` and `Your` go through `vpline_expand`, so the `%s` slots are the verb phrase and the hand, not literal percent signs. `Your` prefixes `"Your "`. `yobjnam(obj, null)` skips the verb (`aobjnam` appends `otense` only when `verb` is set) and still applies `shk_your` unless the carried proper-name artifact gate says not to. `otense` returns `vtense(null, verb)` when `!is_plural`, else the plural verb unchanged (`objnam.c:2540–2545`).

`Yobjnam2` the export is `upstart(yobjnam(...))`, which is `*s = highc(*s)`. The local clone at `:1240` is a different sentence (`"Your "` + `xname` + `vtense`) and is what `weldmsg` (`:204`) and `chwepon` still call. This function does not.

`dropx` is `freeinv`, then `ship_object` / altar `doaltarobj` unless swallowed, then `dropy`. The dynamic import is because `do.js` already imports `wield.js`. The binding is a hoisted function, so the cycle is not a top-level TDZ read.

## Hallucinations / overclaim

The subject says no arm is omitted and that the local `Yobjnam2` stays for `weldmsg` and `chwepon`. Both are true: the three message arms plus `dropx` are the whole body, and the clone is still the one those other functions call. It does not claim the clone was deleted.

## Density

One function. All three C callers already invoked it; they still do, and they await. Callees on the live arms are the exports, not the local name clone.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify drop_uswapwep --base 1490a6d6b~1 --reach-all`.

```
verify drop_uswapwep: baseline 1490a6d6b~1 (scoreboard at cb7ff4a26, 2026-09-26T23:15:17.644Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify drop_uswapwep: no corpus session is blocked on it at 1490a6d6b~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
smoke drop_uswapwep: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line.

## Actionable C-wrongs

None. The left-hand `Sprintf`, the three message arms, and `dropx` match `wield.c:818–830`.

Verdict: **ACCEPT**
