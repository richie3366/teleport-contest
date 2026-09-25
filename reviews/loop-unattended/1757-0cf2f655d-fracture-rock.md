# Review 1757 — 0cf2f655d — fracture_rock (D-2798)

- SHA: `0cf2f655d` (`zap.c` fracture_rock, D-2798)
- Files: `js/dig.js` (+79), `js/monmove.js` (+61), plus caller awaits in
  `dothrow.js`, `explode.js`, `mklev.js`, `mon.js`, `shk.js`, `trap.js`,
  `vault.js`, `zap.js`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean" (this audit).
- New import names sit on edges that already exist (`imports.mjs --can`:
  ALREADY for `dig.js`→`dothrow.js` `breakobj`, `dig.js`→`shk.js`
  `billable`, `mon.js`→`monmove.js` `m_can_break_boulder`,
  `vault.js`→`dig.js` `fracture_rock`, `zap.js`→`dig.js` `fracture_rock`).
  Calls are inside functions, not at module top level.

## Intent vs deliverable

Subject promises `fracture_rock` in C order (shop `breakobj` before the
type change, Sokoban guilt while `otyp` is still `BOULDER`,
`dealloc_oextra`, floor restack, `vision_recalc` only when the cell no
longer blocks) plus `m_break_boulder` / `m_can_break_boulder` and
`ALLOW_ROCK` for boulder-breakers. Diff does that. `invault` shatters
the guard's boulders. `poly_obj` updates the boulder block bit.
`move_special` breaks a boulder and returns. Shop-anger billing and
`m_move_aggress` stay named.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `fracture_rock` | C body | `zap.c:5536–5578` |
| `breakobj` | imported | boulder/statue sets `fracture` and skips `delobj` (`dothrow.js:1455–1501`) |
| `billable` / `get_obj_location` | imported | live |
| `sokoban_guilt` | imported | `trap.c:7037–7055` |
| `dealloc_oextra` | imported | `mkobj.c:95–111` |
| `m_can_break_boulder` | C body | `monmove.c:132–139` |
| `m_break_boulder` | C body | `monmove.c:142–173` |
| `mon_allowflags` rock lines | C | `mon.c:2092–2095` |
| `move_special` rock arm | C | `priest.c:105–107` |
| `invault` boulder loop | C | `vault.c:423–441` |
| `poly_obj` floor boulder | C | `zap.c:1952–1962` |
| `You_see` | imported, plain arm | Unaware prefix named |

`csym --callers fracture_rock`: `dig.c:457`, `explode.c:783`,
`mklev.c:2537`, `monmove.c:171`, `trap.c:3449`, `vault.c:435`,
`zap.c:1959`, `:2286`, `:5603`. JS awaits at `dig.js:1923` and `:2338`,
`explode.js:914`, `mklev.js:19867`, `monmove.js:1838`, `trap.js:2593`,
`vault.js:730`, `zap.js:5249` and `:5489` (striking: see / hear, then
fracture). `m_break_boulder` callers: `monmove.c:2043` (`m_move`
`:2154`) and `priest.c:106` (`shk.js` `move_special`).

`sym.mjs`:

```
fracture_rock      js/dig.js:1846     ASYNC
m_break_boulder    js/monmove.js:1817 ASYNC
m_can_break_boulder js/monmove.js:1804 sync
breakobj           js/dothrow.js:1402 ASYNC
billable           js/shk.js:3625     sync
get_obj_location   js/timeout.js:1514 sync
dealloc_oextra     js/mkobj.js:3825   sync
sokoban_guilt      js/trap.js:1544    sync
does_block         js/vision.js:158   sync
bill_dummy_object  js/shk.js:1190     ASYNC
reset_faint        js/eat.js:503      ASYNC
You_see            js/display.js:7666 ASYNC
```

## C ↔ JS fidelity

`fracture_rock`: `by_you` is `!context.mon_moving`. A null object
returns; C's argument is non-null. When `by_you`, `get_obj_location`
with flags 0, then `costly_spot`. `billable` fills `shkHolder.shkp`.
The message is `You("fracture %s %s.", s_suffix(shkname), xname)` and
then `breakobj(obj, x, y, true, false)`. Boulder and statue set
`fracture` and do not `delobj`, so the object is still there for the
type change. `sokoban_guilt` runs while `otyp` is `BOULDER` (`:5555`).
Then `otyp = ROCK`, `oclass = GEM_CLASS`, one `rn1(60, 7)`, `weight`,
`dknown = bknown = rknown = 0`, `known` from `oc_uses_known`,
`dealloc_oextra`. Floor: `obj_extract_self` ( `remove_object` keeps
`ox`/`oy`; `otyp` is already `ROCK`, so the boulder `recalc_block_point`
inside extract does not run). `place_object` puts the rocks back.
`vision_recalc(0)` only when `!does_block`. `newsym` when `cansee`.
No other RNG in this function.

`m_can_break_boulder`: rider, or `!mspec_used` and (`isshk` or
`ispriest` or `msound == MS_LEADER`). `mon_allowflags` ORs `ALLOW_ROCK`
for `throws_rocks` or that predicate, and `ALLOW_ROCK|ALLOW_WALL` for
`passes_walls`. Matches `:2092–2095`.

`m_break_boulder`: the gate and `sobj_at(BOULDER)` short-circuit, so a
rider who cannot break does not roll. A non-rider mutters only when
`!hero_Deaf()` and `mdistu < 16` (`canspotmon` sets the message
coordinate), then always `mspec_used += rn1(20, 10)`. `hero_Deaf` also
reads `u.Deaf`; C `Deaf` is `HDeaf || EDeaf || u.uroleplay.deaf`
(`youprop.h:125`). `u.Deaf` is an extra sticky. See / "The boulder
falls apart.", then `bill_dummy_object` only when `unpaid`, then
`fracture_rock`. `m_move` (`:2042–2044`) and `move_special`
(`priest.c:105–107`) both return after the call. `ALLOW_M` stays the
named `m_move_aggress` omit.

`invault`: `reset_faint`, then every boulder on the guard's square,
name taken from the first, `You_see` when `!Blind()` else `You_hear`.
`You_hear` drops the line when deaf and uses the dream prefix when
unaware (`hack.js:176–182`). `You_see` is the plain "You see " arm.
The subject names the missing Unaware dream prefix.

`poly_obj`: `ox`/`oy` start at 0 (`zap.c:1705`) and take
`get_obj_location` only when it returns a point. A boulder that stops
being a boulder unblocks when `!does_block`. A non-boulder that becomes
a boulder in `is_pool || is_lava` (`is_pool_or_lava`, `dbridge.c:76–83`)
is fractured, then `block_point` when the cell still blocks. The shop
anger bill at `:1965–1986` stays named.

## Hallucinations / overclaim

The shop arm, guilt, `dealloc_oextra`, and the `does_block` gate are
in the new body. The striking caller already had the see/hear lines;
this SHA only awaits. `poly_obj`'s shop bill and `move_special`'s
attack arm are named, not claimed done.

## Density

`fracture_rock` is 43 lines. The same commit also ships the 32-line
breaker, its 8-line predicate, the allow-flag arm, the priest return,
the vault loop, and the `poly_obj` block test. Those are the C callers
and the two helpers the subject names. The two named tails are not
silent stubs inside a live arm.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify fracture_rock --base
0cf2f655d~1 --reach-all`. Parent board is the 12-row file (stamp
field `84dbed10c`):

```
verify fracture_rock: baseline 0cf2f655d~1 (scoreboard at 84dbed10c, 2026-09-25T19:48:27.148Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify fracture_rock: no corpus session is blocked on it at 0cf2f655d~1 — a vacuous verify is NOT a corpus PASS. …
smoke fracture_rock: no RNG-tagged reach; fixed smoke spread (12 run, 4.4s): 12 PASS, 0 regressed → REACH-OK
```

0 blocks cited. No REGRESSED session. D-log "smoke 12/12" is that board.
Full 44/44 in the D-log is the public runner, not this corpus file.

## Actionable C-wrongs

None. Shop-anger billing, `m_move_aggress`, and the `You_see` Unaware
prefix stay named omits.

Verdict: **ACCEPT**
