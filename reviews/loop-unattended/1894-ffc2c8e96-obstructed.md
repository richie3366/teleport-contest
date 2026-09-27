# Review 1894 — ffc2c8e96 — obstructed (D-2935)

- SHA: `ffc2c8e96` (coverage; `lock.c` `obstructed`)
- Files: `js/lock.js` replaces the hardcoded "Something blocks" strings. Object mimics fall through to the object sentence. A spottable worm tail is named. An unspottable monster calls `map_invisible`.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` diff. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (the new imports; `obstructed` stays file-local because C is `staticfn`):

```
obstructed       NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/lock.js:995
Some_Monnam      js/do_name.js:1289   sync
s_suffix         js/do_name.js:391   sync
             !! ALSO 5 LOCAL CLONE(S) in 5 files — IMPORT the export; do NOT add another
               js/explode.js:136  js/minion.js:84  js/mthrowu.js:188  js/questpgr.js:636  js/shk.js:235
canspotmon       js/display.js:1366   sync
map_invisible    js/display.js:1374   sync
Something        js/const.js:542   sync   export const
```

`imports.mjs --can js/lock.js js/do_name.js Some_Monnam` → `ALREADY`. `--can js/lock.js js/display.js map_invisible` and `canspotmon` → `ALREADY`. This SHA did not add another `s_suffix`.

## Intent vs deliverable

Subject promises one file-local async `obstructed` in C order: object mimic uses the object sentence, a worm whose head is elsewhere is "<name>'s tail", and an unseen monster is remembered. The diff is that. `quietly` still skips both plines and does not skip `map_invisible`.

## Inventory

| JS | Class | C |
|----|-------|---|
| `obstructed` | file-local async `lock.js:1003` | `lock.c:925–953` |
| `Some_Monnam` | live sync `do_name.js:1289` | `do_name.c:1092–1098` |
| `s_suffix` | live `do_name.js:391` | `hacklib.c:345–359` |
| `canspotmon` | live `display.js:1366` | `display.h:129` |
| `map_invisible` | live `display.js:1374` | `display.c:377–385` |
| `Something` | live const | `decl.c` `c_Something` |
| `objects_at` | live `mkobj.js:3366` | `rm.h:500` `OBJ_AT` |

## C ↔ JS fidelity

`lock.c:928–951`: `m_at`. If the monster is not a furniture mimic and is not an object mimic, and `!quietly`: `Some_Monnam`; if the head is not on this square and `canspotmon`, `s_suffix` plus `" tail"`; `pline("%s blocks the way!")`. Then if `!canspotmon`, `map_invisible`, and return true. An object mimic `goto objhere`. `objhere` and `OBJ_AT` pline `"%s's in the way."` unless `quietly`, and return true. Otherwise false.

JS sets `objhere` and falls out of the monster `if`, which is the goto. `objhere || objects` short-circuits, so an object mimic does not also require a floor object. Furniture mimics skip the monster arm and use `OBJ_AT` only. `quietly` wraps both plines and not `map_invisible`. `Some_Monnam` and `s_suffix` are sync, so the name is a string before `pline`. `s_suffix` returns a new string; C `strcat`s into its static buffer. The tail phrase is the same characters.

`map_invisible` (`display.c:379–384`) does nothing when `x == u.ux && y == u.uy`. JS returns on that square. Named in the commit, and it matches this predicate.

Callers: `lock.c:13` prototype. `lock.c:1023` `doclose` with `FALSE` → `obstructed_close` `lock.js:1036`, called at `:1109`. `lock.c:1148` and `:1160` `doorlock` with `mysterywand` → `lock.js:1552` and `:1567`. No call from a site C never calls from.

## Hallucinations / overclaim

The subject says no arm of `obstructed` is omitted. The furniture-mimic fall-through, the object-mimic goto, the worm-tail `strcat`, the unseen `map_invisible`, and the `OBJ_AT` sentence are present. `doclose`'s portcullis, drawbridge, and steed arms stay named on `doclose`. `doorlock`'s `Soundeffect` stays named on `doorlock`. Neither is an arm of `obstructed`.

## Density

The coverage row asked for `obstructed`. The whole static body shipped, and the three call sites pass `FALSE` or `mysterywand` as C does. Not an arm peel.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify obstructed --base ffc2c8e96~1 --reach-all`.

```
verify obstructed: baseline ffc2c8e96~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify obstructed: no corpus session is blocked on it at ffc2c8e96~1 — a vacuous verify is NOT a corpus PASS. …
smoke obstructed: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort, and the skipped full suite, are the port's own verify line (one file, `lock.js`).

## Actionable C-wrongs

None. A spottable monster is named, a worm tail is "X's tail", and an unseen blocker is remembered.

Verdict: **ACCEPT**
