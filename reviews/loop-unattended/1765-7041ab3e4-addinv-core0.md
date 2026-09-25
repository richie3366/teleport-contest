# Review 1765 — 7041ab3e4 — addinv_core0 (D-2806)

- SHA: `7041ab3e4` (coverage; insert / merge / quiver)
- Files: `js/u_init.js` (`addinv_core0`, wrappers), `js/invent.js` (`hold_another_object`), `js/dothrow.js` (`addinv_before_throw`), `js/do.js` (tutorial `where`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on this SHA: "Rule #2 clean".
- `imports.mjs --can u_init.js shk.js picked_container` → `ALREADY`. Same for `invent.js update_inventory`.

## Intent vs deliverable

Subject promises one `addinv_core0` in C order, `addinv` / `addinv_before` as the `TRUE` wrappers, throw-return through `addinv_before` without clearing `how_lost` first, and tutorial enter setting `where` to `OBJ_FREE`. The diff does that. `mergable` is no longer imported; merge goes through `merged`.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `addinv_core0` | C body, async export | `invent.c:1056–1148` |
| `addinv` / `addinv_before` | wrappers | `:1151–1165` |
| `picked_container` | imported, sync | `shk.js:2958` |
| `merged` | imported | `mkobj.js:2794` |
| `mergable` | import removed; still the export `merged` calls | not a second merge |
| `carry_obj_effects` / `setuqwep` | imported | live |
| `hold_another_object` | three `addinv_core0(..., false)` sites | `invent.c:1249` / `:1255` / `:1273` |

`csym --callers addinv_core0`: `invent.c:1154` `addinv` → `u_init.js:1153`; `:1164` `addinv_before` → `:1161`; `:1249` fumbling, `:1255` wished corpse, `:1273` stay path → `invent.js`. `:13` is the prototype. Throw-return calls `addinv_before`, which is what `dothrow.c:1886` does.

`sym.mjs` (deleted `mergable` import; new `picked_container` / `update_inventory` edges):

```
addinv_core0     js/u_init.js:1043   ASYNC — await required
addinv           js/u_init.js:1153   ASYNC — await required
addinv_before    js/u_init.js:1161   ASYNC — await required
picked_container js/shk.js:2958   sync
merged           js/mkobj.js:2794   sync
mergable         js/mkobj.js:2684   sync
invlet_constant  js/invent.js:8493   sync
update_inventory js/invent.js:4566   sync
carry_obj_effects js/mkobj.js:1457   sync
setuqwep         js/wield.js:321   sync
```

## C ↔ JS fidelity

Free / exploding (`invent.c:1064–1067`): `where != OBJ_FREE` panics. `OBJ_FREE` is 0, so an unset `where` passes, matching a zeroed C object. `LOST_EXPLODING` returns null. JS throws the panic string and returns null.

`no_charge = 0`, then `picked_container` when `Has_contents` (`:1071–1074`). `how_lost == LOST_THROWN` is sampled, then `how_lost = LOST_NONE`, then `addinv_core1`. `merged` therefore sees `LOST_NONE`. JS `:1055–1068` matches. Loot-reset (`:1077–1080`) matches.

`other_obj` (`:1087–1096`): insert only when some earlier link's `nobj` is `other_obj`. The head has no predecessor. JS `indexOf > 0` then `splice` is that predecessor on the array pack, then `where = OBJ_INVENT` and the `added` tail. No `assigninvlet` on this path. C `goto added` is the same skip.

Quiver merge (`:1101–1106`) before the pack walk. `merged` may replace `uquiver`; JS writes `game.u.uquiver` back. Null survivor panics with `saved_otyp`. Pack merge (`:1108–1114`) replaces `inv[i]` when `merged` replaces the slot, then `added`. Fresh insert (`:1116–1126`): `assigninvlet`, head when `invlet_constant` or the pack was empty, `reorder_invent` only when letters are constant, otherwise append, then `where = OBJ_INVENT`. Coins are not forced to the head. That matches C; the previous `unshift` for coins does not.

Thrown quiver (`:1128–1140`) runs only on the fresh path. `flags.pickup_thrown` defaults On (`optlist.h:579`). JS `!== false` is that default when the flag was never stored. Not Mjollnir, not aklys, `throwing_weapon || is_ammo`, then `setuqwep`. `added` (`:1142–1147`): `pickup_prev = 1`, `addinv_core2`, `carry_obj_effects`, `update_inventory` only when the flag is true. JS also adds the incoming coin quantity to `game._goldCount`. C has no such field. D-2806 names it. `addinv_core1` only sets `botl` for coins, so this is the one cache bump.

`hold_another_object`: artifact samples crysknife / erosion / `Upolyd` before `touch_artifact` (`:1220–1222`). Fail extracts and `dropy`. Poly-off extracts and `dropy`. Success restores the crysknife fields (`:1240–1243`). Fumbling sets `nomerge` and calls `addinv_core0(..., FALSE)`. Wished fatal corpse (`:1251–1256`) clears `wishedfor` and uses `FALSE`. The stay path uses `FALSE` and calls `update_inventory` itself (`:1289`, `invent.js:8396`). `u_safe_from_fatal_corpse` (`pickup.c:273–281`) is a pure predicate. C evaluates it before `wishedfor`; JS checks `wishedfor` first. No `rn2`. Both drop only when the corpse is wished and unsafe.

`return_throw_to_inv` (`dothrow.c:1885–1887`) sets `nomerge` around `addinv_before` and does not clear `how_lost`. `addinv_before_throw` no longer assigns `LOST_NONE` before the call, so the quiver sample still sees `LOST_THROWN`. The wrapper still forces `nomerge` when `oldslot` is missing; C's comment at `:1885` is that case.

Tutorial enter sets `where = OBJ_FREE` after `setnotworn`. `freeinv` does that before the object sits off the pack. `freeinv_core` and `freeinv`'s `update_inventory` stay the named omit.

## Hallucinations / overclaim

The subject says `how_lost` is cleared before `addinv_core1` so `merged` sees `LOST_NONE`. The sample is the line above the clear (`u_init.js:1061–1062`). That is `:1074–1075`.

The first verify's `seed8243-samurai-tutorial` throw is described as fixed in this SHA by the `where` assignment. The re-run below does not regress.

## Density

The function is the whole `addinv_core0`, including the `other_obj` insert, both merges, the fresh link, and the quiver fill. Named leftovers (`set_moreluck`, worn-object `merged`, `nobj` rebuild, tutorial `freeinv_core`) are in the D-log and the map, not silent arms of this body.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify addinv_core0 --base 7041ab3e4~1 --reach-all`.

```
verify addinv_core0: baseline 7041ab3e4~1 (scoreboard at b5e93433b) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke addinv_core0: no RNG-tagged reach; fixed smoke spread (12 run, 3.1s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks. D-2806's green, strict, cohort, and full 44/44 were not re-run here.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
