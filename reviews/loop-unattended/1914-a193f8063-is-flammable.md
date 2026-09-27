# Review 1914 — a193f8063 — is_flammable (D-2955)

- SHA: `a193f8063` (coverage; `mkobj.c` `is_flammable`, plus the lava splash that called it)
- Files: `js/mkobj.js` rewrites the export. `js/objnam.js` keeps a same-body `is_flammable_obj`. `js/dothrow.js` requires `!is_flammable` on the lava splash.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunks. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `dothrow.js` re-points the lava test onto the export. `objnam.js` keeps the clone. `sym.mjs`:

```
is_flammable     js/mkobj.js:799   sync
Is_candle        js/timeout.js:1519   sync
is_flammable_obj NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/objnam.js:218
```

`imports.mjs --can js/dothrow.js js/mkobj.js is_flammable` → `ALREADY`. `--can js/objnam.js js/mkobj.js is_flammable` → `IN-SCC` and `VERDICT: SAFE` (the name is a hoisted function). The commit records a load that threw `ReferenceError: Cannot access '_body_part' before initialization` when that edge was added, then removed the import. `--can` does not name `_body_part`.

## Intent vs deliverable

Subject promises one exported `is_flammable` in C order: `Is_candle`, then `oc_oprop == FIRE_RES` or `WAN_FIRE`, then wood-or-softer (not liquid) or plastic. The diff is that body, the `objnam` copy, and the `dothrow` lava conjunct. No RNG.

## Inventory

| JS | Class | C |
|----|-------|---|
| `is_flammable` | live sync `mkobj.js:799` | `mkobj.c:2269–2286` |
| `Is_candle` | live `timeout.js:1519` | `obj.h:382–383` |
| `is_flammable_obj` | clone `objnam.js:218`, same tests | `objnam.c:1187` |
| `Is_candle_obj` | clone `:194` | same macro, by object name |
| `FIRE_RES` | `const.js` `1` | `prop.h:15` |
| `WOOD` / `LIQUID` / `PLASTIC` | `8` / `1` / `18` | `objclass.h:14,21,31` |

## C ↔ JS fidelity

`mkobj.c:2273–2285`. `otyp` and `objects[otyp].oc_material` are read first. `Is_candle` returns false. Then `oc_oprop == FIRE_RES` or `otyp == WAN_FIRE` returns false. Else `(omat <= WOOD && omat != LIQUID) || omat == PLASTIC`. JS `:800–814` is that order. `Is_candle` is `otyp == TALLOW_CANDLE || otyp == WAX_CANDLE`. `objs()` is `game.objects` (`mkobj.js:235`). A missing row throws on `oc.oc_material`; C would also index a bad `otyp`.

The clone (`:218–232`) uses the same three tests. `Is_candle_obj` compares `objectNames[otyp]` to the two candle names. `MAT_*` matches the enum. A missing row is material 0 and property 0, so the material test is true (`0 <= WOOD` and not liquid). The commit names that. A present row matches the export, and `objs()` is the same table.

`dothrow.c:1794–1801`. `!Deaf && !Underwater`, then pool or (lava and `!is_flammable`), then `Soundeffect` and `Splash!` / `Plop!` from `weight > WT_SPLASH_THRESHOLD`. JS `:2546–2551` adds the flammable conjunct and still skips `Soundeffect` (named, already absent). Other live callers already import the export: `do_wear.js:3435`, `eat.js:1092`, `mkobj.js:875`, `mthrowu.js:1135`, `readobjnam.js:1930` (`objnam.c:5274`), `trap.js:1786` and `:4399`, `zap.js:5145`. `trap.c:4487` is inside a comment. `objnam.c:1187` is the clone at `objnam.js:289`.

## Hallucinations / overclaim

The subject says no arm of `is_flammable` is omitted. The candle return, the resistance/wand return, and the material return are present. It also says the `objnam` copy is the same body because the static import threw. The body matches. `--can` still prints `SAFE` for `is_flammable` itself; the measured throw was `_body_part`, which that verdict does not mention. The three `FIRE_RES` types being non-flammable either way is a data note, not a skipped arm.

## Density

The coverage row asked for `is_flammable`. The 18-line body shipped. The lava conjunct is the caller that had the test commented out. The clone is the one caller that cannot import. Not an arm peel.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify is_flammable --base a193f8063~1 --reach-all`.

```
verify is_flammable: baseline a193f8063~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify is_flammable: no corpus session is blocked on it at a193f8063~1 — a vacuous verify is NOT a corpus PASS. …
smoke is_flammable: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty blocked-line is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line. It also records that the import attempt failed every session before the clone was put back. Full suite was skipped because none of the three files is on the shared-file list.

## Actionable C-wrongs

None. The clone matches the three returns. The missing-row true result and the absent splash sound are named.

Verdict: **ACCEPT**
