# Review 164 — dfed1743 — do.c `revive_mon` / `zombify_mon` (D-1202)

## Metadata
- Full / short hash: `dfed1743170fd5dadf31987376b80caf2288afe2` / `dfed1743`
- Parent: `4ffc2264` (D-1201). This file audits **this SHA only**. Archive row **Addressed:** D-1202 `dfed1743` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 05:55:21 +0200
- D-id: **D-1202**
- Stats: 14 files, +299 / −60 — `js/timeout.js` +89; `js/mkobj.js` +44/−11; `js/do.js` +40/−9; `js/mon.js` +37; `js/monsters.js` +5.
- Claims to close: Open queue `timeout.c` REVIVE/ZOMBIFY (named from D-1191 / review **153**). Not `run_timers` call site. `reviews/loop-2026-08-15/` has no unpaid REVIVE Must-fix.
- JS / map: `timeout.js` callbacks; `mkobj.js` dispatch + `start_corpse_timeout` zombify arm + `obj_has_timer`; `mon.js` `zombie_form`; `do.js` buried pit; `monsters.js` `is_displacer`. `c-js-map/data.md`. `gz.zombify` setters, MINVENT/CONTAINED, invent `rot_corpse` still named.
- Prior reviews this SHA claims to close: **153** “do not stamp Match C `revive_mon`”; Open row after D-1201.

## Intent vs deliverable

Git subject promises: “Match C do.c revive_mon/zombify_mon so REVIVE_MON/ZOMBIFY_MON timers revive (or rot) instead of no-op.”

Old JS `run_timers` popped those actions with a comment and no callee. `start_corpse_timeout` skipped the `gz.zombify` arm. `revive_corpse` had no `OBJ_BURIED` pit/claw. C table `timeout.c:1982–1983` lists `revive_mon` / `zombify_mon`; bodies `do.c:2251–2315`; `zombie_form` `mon.c:386–413`; buried claw `do.c:2217–2234`; producer `mkobj.c:1425–1428`.

The diff **does** port both callbacks, dispatch them, add `zombie_form`, the zombify `rn1(15,5)` arm, `obj_has_timer`, Rider/displacer bump `rloc(RLOC_NOMSG)`, and buried zombie pit + `fill_pit`. It does **not** set `game.zombify` at `make_corpse` / mhitm, nor MINVENT/CONTAINED revive messages, nor invent `rot_corpse` worn plines. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `revive_mon` | C callee, **new** | `do.c:2251–2295` |
| `zombify_mon` | C callee, **new** | `do.c:2299–2315` |
| `run_timers` REVIVE/ZOMBIFY arms | C table, **new** | C `timeout.c:1982–1983`; JS `mkobj.js:998–1003` after HATCH |
| `zombie_form` | C callee, **new** | `mon.c:386–413` |
| `obj_has_timer` | C callee, **new** | `timeout.c:2404–2409` via list walk ≡ `peek_timer != 0` |
| `start_corpse_timeout` zombify arm | C site, **new** | `mkobj.c:1425–1428` `rn1(15,5)` |
| `revive_corpse` `OBJ_BURIED` | C site, **new** | `do.c:2217–2234` |
| `is_displacer` | C macro, **new** | `mondata.h:156`; generated `mflags3` has `0x700` on Death/Pestilence/Famine/displacer beast |
| `is_reviver` in buried `is_zomb` | **inlined clone** | `mondata.h:170` rider \|\| `S_TROLL` — matches C, not a stale rider-only |
| `fill_pit` | C callee, **imported** | `trap.c:4010–4019`; JS `dig.js` thin (D-1121 `flooreffects("settle")` named) |
| `revive` / `rloc` / `rot_corpse` / `set_corpsenm` / `maketrap` | C callees, **imported** | not stubs |
| `gz.zombify` at make_corpse/mhitm | C producer, **named omit** | Open rows already |
| MINVENT / CONTAINED / Adjmonnam / Soundeffect | C, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. `Monnam` is imported in `timeout.js` (not a missing-import crash on the displacer path).

**RNG (call-for-call on the new arms):**

- `start_corpse_timeout`: still burns `rnz(rot_adjust)` **before** the rider/troll/zombify overrides (C `:1406–1413` then `:1415–1428`). Zombify then **replaces** `when` with `rn1(15,5)` — C same, not an extra die on top of `rnz` in the sense of a second rot age; the `rnz` still happens. Match.
- `revive_mon` fail: `is_rider && rn2(99)` then `rider_revival_time(body, TRUE)` (`rn2(3)` loop minturn..66) else `d(5,50) - (moves - age)` clamp ≥1. Order matches `:2281–2290`. `obj_has_timer` gates the `You_feel` and the requeue like C `:2285` / `:2292`.
- Displacer bump: `rloc(..., RLOC_NOMSG)` only when `is_displacer && OBJ_FLOOR && get_obj_location(0) && m_at && stasis_until < moves`. No extra die in the wrapper.
- `zombify_mon`: no RNG of its own; `set_corpsenm` → `start_corpse_timeout` may `rnz` for the leftover ROT timer (C same). `zombie_form` of an already-zombie is `NON_PM` so the zombify arm does not re-queue ZOMBIFY.

Grep of this SHA’s `js/` hunks: no banned gates.

## C ↔ JS fidelity

### Dispatch vs `timeout.c:1979–1983` / `run_timers`

C indexes `timeout_funcs[func_index]` (`timeout.c:1982–1983` `revive_mon` / `zombify_mon`). JS `run_timers` lives in `mkobj.js` (D-0405 / D-1191): after `HATCH_EGG`, `else if (REVIVE_MON && curr.obj)` dynamic-imports `timeout.js` `revive_mon`, then `ZOMBIFY_MON` → `zombify_mon`, passing `curr.obj` and `curr.timeout`. JS (`mkobj.js:998–1003`):

```
        } else if (curr.action === REVIVE_MON && curr.obj) {
            const { revive_mon } = await import('./timeout.js');
            await revive_mon(curr.obj, curr.timeout | 0);
        } else if (curr.action === ZOMBIFY_MON && curr.obj) {
            const { zombify_mon } = await import('./timeout.js');
            await zombify_mon(curr.obj, curr.timeout | 0);
```

The timer node is already unlinked and `obj.timed` decremented — same as C `run_timers`. **Not a no-op.** Pre-D-1202 the arms were empty after pop (review **153** said so). Filling them is the Open row. The **callees** are `timeout.js:1168` / `:1224`; do not confuse the table (C `timeout.c`) with the JS dispatcher (`mkobj.js`).

### `revive_mon` vs `do.c:2258–2294`

C: displacer + floor + `get_obj_location(..., 0)` + `m_at` + `stasis_until < moves` → snapshot `canseemon`/`Monnam` → `rloc(RLOC_NOMSG)` → vanish / appear / teleport (`dist2 > 2`). Then `if (!revive_corpse(body))` rider retry or rot.

JS (`timeout.js:1168–1214`): same guards (`get_obj_location(body, 0)` is the hatch/burn helper: floor/invent/minvent, not BURIED without `BURIED_TOO` — C passes `0`, so buried displacer skip matches). `rloc` / `revive_corpse` are imported live functions. **Branch order matches.** `stasis_until` unset is 0, so `< moves` is true after turn 0 like BSS C.

Fail path: `obj_has_timer` walks `TIMER_OBJECT` + obj + action. C `peek_timer != 0`. Live JS timeouts are `moves+when` and not 0. Equivalent.

### `zombify_mon` vs `do.c:2299–2315`

C: `zombie_form` → if `zmon != NON_PM && !(mvitals[zmon].mvflags & G_GENOD)` then free omid/omonst, `set_corpsenm`, `revive_mon`; else `rot_corpse`. JS same, with `has_omid`/`free_omid` / `has_omonst`/`free_omonst` imported. Short-circuit: JS reads `mvitals[zmon]` before the `if`; `NON_PM` is −1 so `mvitals[-1]` is undefined → `mv=0`, then `zmon !== NON_PM` fails. Outcome matches C’s `&&` short-circuit.

`rot_corpse` is `mkobj.js` floor extract + `newsym`; invent/minvent worn plines still named (C `dig.c:2146`). Genocide/fail rot of a **floor** corpse matches the live envelope. Worn-invent rot is map debt, not a fake `rot_corpse`.

`set_corpsenm` (`mkobj.c:1318–1352`) stops timers then `start_corpse_timeout`. C rescale of `oeaten` when `cnutrit` changes (`:1336–1345`) is **missing** in JS `set_corpsenm`. This SHA newly calls that function from `zombify_mon`. Partly-eaten human→human-zombie HP/nutrition would diverge. Map / later peel — not a stub of `zombify_mon` itself.

### `zombie_form` vs `mon.c:386–413`

Switch on `mlet` (JS strings `S_ZOMBIE` / `S_KOBOLD` / … match this port’s `mlets[]`). `S_GIANT`: Ettin via `mndx === pm('ETTIN')` — C is `pm == &mons[PM_ETTIN]`; JS `mons()` allocates a new object so pointer equality would be wrong; **mndx is the faithful stand-in.** `S_HUMAN`/`S_KOP`: `is_elf` else human zombie. `S_HUMANOID`: dwarf else `break` (does **not** fall into gnome — C `else break`). Default `NON_PM`. **Every arm matches.** `pm('KOBOLD_ZOMBIE')` is `monsterNames.indexOf('PM_KOBOLD_ZOMBIE')`.

### Buried `revive_corpse` vs `do.c:2127–2234`

C `is_zomb = (mlet == S_ZOMBIE || (where == OBJ_BURIED && is_reviver(...)))` with `is_reviver` = rider \|\| troll. JS inlines the same. After `revive`, `OBJ_BURIED && is_zomb`: `maketrap(PIT)`, `tseen` if `cansee`, `Amonnam`/`Something` claw pline, `newsym`, else `mdistu < 25` → `You_hear("scratching noises.")`, then `fill_pit`. JS uses `dist2(mx,my,ux,uy) < 25` ≡ `mdistu`. `Soundeffect(se_scratching)` named. `maketrap` is sync. `fill_pit` early-outs without a boulder — C `trap.c:4015–4016` same, so claw-out without a boulder is a no-op fill in **both** trees. When a boulder **is** present, JS `deltrap`+`delobj` vs C `flooreffects(..., "settle")` (D-1121). Named pre-existing callee, not a new no-op.

C `OBJ_BURIED && !is_zomb` FALLTHROUGH `impossible`. JS still silent. Named sibling of MINVENT/CONTAINED.

`revive` (`zap.js`) already had buried extract (D-0964). This SHA is the **message/pit** half after a successful `revive`.

### Producer vs `mkobj.c:1425–1428`

`else if (game.zombify && zombie_form(ptr) !== MON_NON_PM && !body.norevive)`. `MON_NON_PM` aliases `NON_PM` (−1). `game.zombify` is never set in this SHA (named). Troll/Rider still get `REVIVE_MON` without it — those timers now **fire**. ZOMBIFY timers only if something else queues them (Lua bury comment in `mklev.js`, or a future setter). Honest: “timers revive instead of no-op” is true for queued REVIVE/ZOMBIFY; it is not “Match C `make_corpse` `gz.zombify`.”

| Case | C | JS after |
|------|---|---------|
| REVIVE due | `revive_mon` | **same call** |
| ZOMBIFY due | `zombify_mon` | **same call** |
| Rider bump occupant | `is_displacer` + `rloc` | **same** (`mflags3` bit live) |
| Rider fail | `rn2(99)` retry / rot | **same** |
| zombify producer | `gz.zombify` at corpse | **named unset** |
| buried claw | pit + fill_pit | **same call**; settle named |

## Constitution / playbook

No FORCE / getRngLog / seed-shaped troll revive. Rule #2: dynamic import `do.js` / `teleport.js` / `dig.js` / `mon.js` to break cycles; no `fs`. Frozen untouched. Do not invent `game.zombify = true` to “exercise” the arm.

## Hallucinations / overclaim

D-log / CURRENT / subject say REVIVE/ZOMBIFY timers revive or rot instead of no-op. **Dispatch + both callbacks + `zombie_form` + buried pit + zombify queue arm are the hunk.** Stamping **Addressed:** D-1202 is fair. This is **not** “Match C dispatch, callee is a stub”: `revive` / `rloc` / `zombie_form` / `rot_corpse` / `maketrap` are live. Do **not** stamp “Match C `gz.zombify` at `make_corpse`” or “Match C `revive_corpse` MINVENT” or “Match C `fill_pit` `flooreffects`.” Say so: without the setter, the new `rn1(15,5)` arm is dead; troll/Rider REVIVE is not.

Public-unhit unless a REVIVE/ZOMBIFY timer expires. Fortress PASS does not prove claw-out.

### Clone classification (this SHA)

- `revive_mon` / `zombify_mon` / `zombie_form` / `obj_has_timer` / `is_displacer` — C callees, new.
- Buried `is_zomb` rider\|\|troll — C `is_reviver` inlined, matches `mondata.h:170`.
- `fill_pit` — imported thin C callee (settle named).
- No no-op dispatch.

## Density

One timeout family: table pair + `zombie_form` + producer arm + buried success messages. ~215 lines across five files that already call each other. High end of §2b, not “finish `mon.c`.” Did not glue `#levelchange` or `eatspecial`. Related Open rows (`zombie_maker`, mhitm zombify, `disturb_buried_zombies`) correctly left for later.

## Verification

Journal: `zombie_form` + `is_displacer` unit map; green+strict seed8000/0900; cohort **16**/16 + strict lengths (fresh process). Public-unhit unless a REVIVE/ZOMBIFY timer expires. This audit’s full `sessions` `__RESULTS_JSON__` at `dbd3a08b`: **44**/44 Scr **11405**/11405 RNG **792838**/792838 (100%) speed `32+0.27/turn` (R² 0.868) does not expire those timers on the fortress.

Grep of `git show dfed1743 -- js/`: no FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/seed names/hardcoded coordinates.

C read of `do.c:2111–2315`, `mon.c:386–413`, `mkobj.c:1389–1432` / `:1318–1352`, `timeout.c:1976–1983` / `:2404–2409`, `trap.c:4010–4019`, `mondata.h:156` / `:170`, `monflag.h:175`. JS SHA: `mkobj.js` `run_timers` `:998–1003` + `start_corpse_timeout` zombify + `set_corpsenm` (no `oeaten` rescale); `timeout.js` `revive_mon`/`zombify_mon`; `mon.js` `zombie_form` `:578`. Generated `mflags3s[311..313]` and `[39]` are `1792` (`INFRAVISION|INFRAVISIBLE|DISPLACES`).

## Actionable C-wrongs

None that Must-fix this next iter (do not steal Open `scrolltele` unconscious or the already-queued `gz.zombify` setters).

C-wrong family remaining (map / later peel, not new Must-fix prepends):

1. `set_corpsenm` must rescale `oeaten` when `cnutrit` changes (`mkobj.c:1336–1345`) before `zombify_mon`’s `set_corpsenm`+`revive_mon`.
2. `fill_pit` must `flooreffects(otmp, x, y, "settle")` after extract (`trap.c:4017–4018`), not `deltrap`+`delobj` (D-1121; only when a boulder shares the new pit).
3. `revive_corpse` MINVENT/CONTAINED + buried `!is_zomb` `impossible` + `Adjmonnam` bite-covered + `Soundeffect`.

Named omits / do-nots:

4. `mon.c` `zombie_maker` + `gz.zombify` at `make_corpse` (live Open). mhitm monkilled zombify (live Open). `disturb_buried_zombies` (live Open). invent `rot_corpse` worn plines (live Open).
5. Do not skip D-1202. Do not set `game.zombify` without the C make_corpse/mhitm sites. Do not FORCE a troll revive from a seed.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- Score: **7.5 / 10**
- One sentence: due REVIVE/ZOMBIFY timers now run C’s `revive_mon`/`zombify_mon` (including Rider bump and buried pit); `gz.zombify` producers, `set_corpsenm` `oeaten` rescale, and `fill_pit` settle stay named, not Must-fix.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1202 `dfed1743`. Next port in this window popped Open `#levelchange`. Not `run_timers` call site, not `make_corpse`.
