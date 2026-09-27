# Review 1881 — b88b8599f — cant_wield_corpse (D-2922)

- SHA: `b88b8599f` (coverage; `wield.c` `cant_wield_corpse`)
- Files: `js/wield.js` only (local function, `ready_weapon`, `can_twoweapon`)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunks. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs`:

```
cant_wield_corpse NOT EXPORTED — 1 local js/wield.js:515
touch_petrifies  js/monsters.js:453   sync
corpse_xname     js/objnam.js:1224   sync
killer_xname     js/objnam.js:1377   sync
instapetrify     js/trap.js:3551   ASYNC — await required
body_part_latebound js/objnam.js:2591   sync
```

C `cant_wield_corpse` is `staticfn`. One local is that function. `instapetrify` is awaited. The `trap.js` import is dynamic because `trap.js` already imports `wield.js`.

## Intent vs deliverable

Subject promises the bare-hand cockatrice check: gloves, non-corpse, non-petrifying corpse, or stone resistance return false; otherwise the `You` line and `instapetrify`, then true. `ready_weapon` and `can_twoweapon` call it. The diff does that.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `cant_wield_corpse` | file-local async `wield.js:515` | `wield.c:137–153` |
| `touch_petrifies` | live `monsters.js:453` | `mondata.h:200–201` |
| `corpse_xname` / `killer_xname` | live `objnam.js` | the two name calls |
| `instapetrify` | live `trap.js:3551` | `wield.c:151` |
| `ready_weapon` caller | `wield.js:568` | `wield.c:183` |
| `can_twoweapon` caller | `wield.js:1247` | `wield.c:794` |

## C ↔ JS fidelity

No RNG. Return false when `uarmg`, or `otyp != CORPSE`, or `!touch_petrifies(&mons[corpsenm])`, or `Stone_resistance`. `touch_petrifies` is cockatrice or chickatrice by `mndx`. Otherwise `You("wield %s in your bare %s.", corpse_xname(obj, NULL, CXN_PFX_THE), makeplural(body_part(HAND)))`, then `instapetrify("wielding <killer_xname> bare-handed")`, then true. `body_part(HAND)` is `body_part_latebound`. `You` prefixes `"You "`.

`Stone_resistance` in C is `HStone_resistance || EStone_resistance` (`youprop.h:63–65`), the `uprops[STONE_RES]` intrinsic and extrinsic. JS also treats `u.HStone_resistance`, `u.EStone_resistance`, and `u.Stone_resistance` as that resistance. The subject names those flats.

`wield.c:55` is the prototype. `ready_weapon` (`:183`): if the corpse arm returns true, `res = ECMD_TIME` and the weapon is not wielded. The function's botl test is at `:270–271`, after every arm: `had_wep != (uwep != 0)` and `condtests[bl_bareh].enabled`. JS returns 1 from the corpse arm and sets `flags.botl` on the `had_wep` change only. The `condtests` gate is the named difference; the success path's same test is at `wield.js:633`. `can_twoweapon` (`:794`): the corpse arm is an empty else-if, then the function returns false. It does not fall into the Glib / cursed arm. JS matches. `wield.c:55` is not a call.

## Hallucinations / overclaim

The subject says no arm of `cant_wield_corpse` is omitted. The four early returns, the message, and `instapetrify` are the whole body. The `condtests[bl_bareh]` gate, `arti_speak`, the literal `hand` in the empty-hands twoweapon line, and `xname` on the artifact-resist line are named and sit in the callers. Not a dispatch with a stubbed petrify.

## Density

One 15-line C function and both C callers. `instapetrify` is live. No stub arm.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify cant_wield_corpse --base b88b8599f~1 --reach-all`.

```
verify cant_wield_corpse: baseline b88b8599f~1 (scoreboard at 34f7d154e, 2026-09-27T01:53:50.868Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify cant_wield_corpse: no corpus session is blocked on it at b88b8599f~1 — a vacuous verify is NOT a corpus PASS. …
smoke cant_wield_corpse: no RNG-tagged reach; fixed smoke spread (12 run, 4.0s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line (full suite skipped: one file).

## Actionable C-wrongs

None. Gloves, a non-corpse, a non-petrifying corpse, and stone resistance return false; the bare-hand line and `instapetrify` run otherwise, matching `wield.c:142–152`.

Verdict: **ACCEPT**
