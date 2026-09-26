# Review 1777 — fc6ad8bdf — set_corpsenm (D-2818)

- SHA: `fc6ad8bdf` (coverage; corpse id, eaten rescale, Medusa statues)
- Files: `js/mkobj.js` `set_corpsenm` `:1998`; `js/mklev.js` `fixup_special` Medusa loops `:2393` and `:2408`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on the working tree: "Rule #2 clean".
- `imports.mjs --can mklev.js monsters.js pm_resistance` and `mklev.js mkobj.js set_corpsenm`: both `ALREADY`.

## Intent vs deliverable

Subject promises one `set_corpsenm` in C order: save the old id, stop timers, rescale `oeaten` through a long multiply/divide, then the type switch, plus both Medusa statue retries. The diff replaces the old string-`otyp` body with that switch and fills the two `void tryct` holes in `fixup_special`. `tt_oname` is still absent.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `set_corpsenm` | C body (export indented; see sym) | `mkobj.c:1317–1367` |
| `stop_timer` | same file `:1147` | `timeout.c:2298–2318` returns `timeout - moves` |
| `obj_stop_timers` | same file `:1123` | non-egg clear |
| `dead_species` | imported `mon.js:828` | `mon.c:5585–5605` |
| `pm_resistance` | imported `monsters.js:665` | `mondata.h:14` |
| `poly_when_stoned` | imported `monsters.js:676` | `mondata.c:79–86` |
| `MR_STONE` | imported const | flag bit |
| `figurine_is_carried` | local clone, no longer called here | `obj.h:332–333` inlined instead |

`csym --callers set_corpsenm`: 23 references. Gameplay sites already call the export (`bones`, `zombify_mon`, `mk_tt_object`, `mksobj`, `pickup` housecat, `sit` egg, `sp_lev` statue arms, `uhitm` virtual corpse, both `zap.c` sites). `topten.c:1433` has no JS `tt_oname`. `extern.h:1695` is the declaration.

`sym.mjs`:

```
set_corpsenm     NOT FOUND in js/** (no export, no local function/const).
pm_resistance    js/monsters.js:665   sync
poly_when_stoned js/monsters.js:676   sync
figurine_is_carried NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mkobj.js:1446
stop_timer       js/mkobj.js:1147   sync
MR_STONE         js/monsters.js:98   sync   export const
```

The indexer missed `set_corpsenm` because `export function` is indented at `js/mkobj.js:1998`. It is a real export; `mksobj` calls it at `:2493` and `:2496`.

## C ↔ JS fidelity

`set_corpsenm` (`mkobj.c:1317–1367`). A null object returns (C is `NONNULLARG1`). Then `old_id = corpsenm`. If `timed`, an egg takes `stop_timer(HATCH_EGG, obj)` (C passes `obj_to_any`; JS timers key the object). Any other timed object sets `when = 0` and `obj_stop_timers`. That matches.

Rescale (`:1333–1345`): only `CORPSE` with `oeaten != 0` and unequal `cnutrit`. C writes `(unsigned)((long)oeaten * (long)new / (long)old)`. JS uses `Math.trunc` of that product and `>>> 0`. For the nutrition table's positive values that divide the same way as C long division (100×200/300 → 66, 5×1/2 → 2). JS also skips a missing `mons` row or a zero old `cnutrit`. C would read off the table or divide by zero; the C comment says `old_id` cannot be `NON_PM` and the divisor cannot be zero when `oeaten` is set. Named.

Then `corpsenm = id` and the switch. Corpse: `start_corpse_timeout` then `weight`. Figurine: `corpsenm != NON_PM && !dead_species(..., TRUE) && (carried || mcarried)` then `attach_fig_transform_timeout`, then `weight` either way. `carried` is `where == OBJ_INVENT` (`obj.h:332`); `mcarried` is `OBJ_MINVENT` (`:333`). Egg: same species test, `attach_egg_hatch_timeout(obj, when)`, no `owt`. Default (`:1363–1365`, comment "tin, etc."): `owt = weight(obj)`. The old body only weighed statue and tin; the default now matches C.

`fixup_special` Medusa (`mkmaze.c:651–684`). `rnd(4)` placements, `goodpos`, `mk_tt_object(STATUE)`, then `++tryct2 < 100 && otmp && (poly_when_stoned || pm_resistance MR_STONE)` and `set_corpsenm(otmp, rndmonnum())`. The last statue is `rn2(2) ? mk_tt_object : mkcorpstat(..., CORPSTAT_NONE)`, and only if `otmp` the loop is `MR_STONE` first, then `poly_when_stoned`. JS `:2387–2416` is that order, including which predicate is first, so `rndmonnum` runs only when a retry is required. `poly_when_stoned` (`mondata.c:79–86`) is golem, not stone golem, and not `G_GENOD` (0x02) on the stone golem. JS compares `mlet === 'S_GOLEM'` (the table stores that string) and `mndx`, and the call passes `game.mvitals`. `pm_resistance` is `(mresists & typ) != 0`.

## Hallucinations / overclaim

The subject says both Medusa loops run and `set_corpsenm` rescales before the id store. They do. It names the null object, the zero-divisor skip, the missing `tt_oname`, and `curse` still calling `figurine_is_carried`. Those match the code. `mk_tt_object` (`mklev.js:27076`) burns `rnd(10)` and always takes the empty-scoreboard `rn1` plus `set_corpsenm`. That is the named null branch, not a silent skip of the caller.

## Density

One function, plus the two callers in the same `fixup_special` that were the holes. The cleric/stronghold `else if` arms after Medusa were already separate `if`s and this diff does not touch them.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify set_corpsenm --base fc6ad8bdf~1 --reach-all`.

```
verify set_corpsenm: baseline fc6ad8bdf~1 (scoreboard at c741a9780) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke set_corpsenm: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note, not a false PASS. No `REGRESSED` session. D-2818's green, strict, cohort, and full 44 were not re-run here.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
