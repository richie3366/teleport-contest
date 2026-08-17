# Review 82 — 803a7f5c — `teleds` `fill_pit` after `u_on_newpos` (D-1121)

## Metadata
- Full / short hash: `803a7f5c3ed196dd79f4500ca37b386ea9698b86` / `803a7f5c`
- Parent: `14a10c08` (review **78–81** + cadence #1425). This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 01:05:36 +0200
- D-id: **D-1121**
- Stats: 10 files, +107 / −39 — `js/teleport.js` +16 / −4 (`teleds` one call after `u_on_newpos`).
- Claims to close: Open queue `teleport.c` `teleds` `fill_pit` (named). Not Punished ball. Review **81** item 3: wire the **call** first; JS `fill_pit` already extract+deltrap+delobj vs C `flooreffects("settle")`. `reviews/loop-2026-08-15/` has no open fill_pit Must-fix.
- JS / map: `teleport.js` `teleds`; `dig.js` `fill_pit` (D-0950, untouched this SHA). `c-js-map/turns.md` teleport + dig. `flooreffects("settle")` settle pline / `delfloortrap` / `useupf` / `bury_objs` still named.
- Prior reviews this SHA claims to close: **81** named omit 3 (`teleds` `fill_pit` after `u_on_newpos`).

## Intent vs deliverable

Git subject promises: “Match C teleport.c teleds so a boulder on a vacated pit or hole runs fill_pit after u_on_newpos.”

Old JS `teleds` set `u.ux0`/`u.uy0`, moved the hero (and steed), then `placebc` / `newsym` / vision. Comment: `// fill_pit(ux0,uy0) deferred`. A boulder sitting on the origin PIT/SPIKED_PIT/HOLE/TRAPDOOR stayed on an open shaft after the hero left. C `teleport.c:523–528` calls `fill_pit(u.ux0, u.uy0)` immediately after `u_on_newpos`, before `placebc`.

The diff **does** that call via dynamic `import('./dig.js')` (static import would cycle teleport → dig → trap → teleport). It does **not** rewrite `fill_pit` to C `flooreffects(otmp, x, y, "settle")`. Named on the hunk header and in the D-log. Review **81** scoped this iter as the call, not a Punished-ball peel and not a `flooreffects` rewrite.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `teleds` after `u_on_newpos` | C body, **rewritten** | `teleport.c:525–528`; was commented skip |
| `fill_pit` | C callee, **imported** | `dig.js:802–811`; D-0950 thin clone, not a no-op |
| `t_at` / `sobj_at(BOULDER)` | C callees, **imported** | gate inside `fill_pit` |
| `is_pit` / `is_hole` | C macros, **imported** | `const.js` ≡ `trap.h:113–114` PIT/SPIKED vs HOLE/TRAPDOOR |
| `obj_extract_self` / `deltrap` / `delobj` / `newsym` | C callees, **imported** | thin body vs `flooreffects` |
| `flooreffects(..., "settle")` | C callee, **named omit** | settle pline, trapped-mon/hero squish, `delfloortrap`, `useupf`, `bury_objs` |
| `switch_terrain` / `update_player_regions` / hideunder | C arms, **named omit** | live Open after this SHA |
| swallow `docrt` / vault_guard / buried-ball | C arms, **named omit** | not this Open line |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. **No new RNG** on the call: `fill_pit` is a predicate + extract/delete. C `flooreffects` boulder+pit common path (no trapped creature) has no `rn2`/`rnd` either; trapped-mon `hmon`/`dmgval` is the named body.

## Constitution / playbook

Grep of the `js/teleport.js` hunk: no trace-index gates. `u.ux0`/`u.uy0` are the live origin cell saved before the move, not a recorded session coordinate. Contest Rule #2: dynamic `import('./dig.js')` is ESM cycle-breaking, not `fs`. One await boundary still `nhgetch` (the `await import` resolves a module, then `fill_pit` is sync). Do not invent a Punished-ball peel to “finish” this SHA.

## C ↔ JS fidelity

### Caller order

C `teleport.c:523–528`:

```
u_on_newpos(nux, nuy); /* set u.<x,y>, usteed-><mx,my>; cliparound() */
fill_pit(u.ux0, u.uy0);
if (ball_active && uchain && uchain->where == OBJ_FREE)
    placebc();
update_player_regions();
```

JS `teleds` `1240–1256`: `u.ux`/`u.uy` then steed `mx`/`my` (the `u_on_newpos` subset already in this function), then `fill_pit(u.ux0, u.uy0)`, then `placebc` when the chain is `OBJ_FREE`. `u.ux0`/`u.uy0` were assigned from `ox`/`oy` **before** the move (`1221–1222`), matching C `u.ux0 = u.ux` at `:490–491`. The call therefore fills the **vacated** cell, not the destination. `update_player_regions` stays named (live Open). Match on the Open line.

`cliparound` / `earth_sense` / `see_nearby_objects` inside C `u_on_newpos` stay named on the existing subset. Swallow `docrt` still sits earlier in C (`:498–504`) and is still deferred in JS — not this call.

### Callers of `teleds`

C `teleds` is the shared hero-place helper: `vault_tele`, `safe_teleds` (scroll / ^T / wand), `tele_to_rnd_pet`, cursed whistle, `tele_trap` teledest (named omit). JS already routes `safe_teleds` / `tele_to_rnd_pet` / `vault_tele` / apply / pray through `await teleds`. This SHA does not add a caller; every existing `teleds` path now runs `fill_pit` on the vacated cell. Guard: C always calls `fill_pit` after `u_on_newpos` with no extra `if`; JS same (the helper no-ops when there is no pit+boulder).

### `fill_pit` gate vs C

C `trap.c:4010–4019`:

```
if ((t = t_at(x, y)) != 0 && (is_pit(t->ttyp) || is_hole(t->ttyp))
    && (otmp = sobj_at(BOULDER, x, y)) != 0) {
    obj_extract_self(otmp);
    (void) flooreffects(otmp, x, y, "settle");
}
```

JS `dig.js:802–811`: `t_at`; return unless `is_pit || is_hole`; `sobj_at(BOULDER)`; `obj_extract_self`; then **`deltrap` + `delobj` + `newsym`**. The gate matches C call-for-call. `BOULDER` is `objectNames.indexOf('BOULDER')`, same otyp the rest of dig uses. Empty origin, TELEP origin, boulder-without-pit, pit-without-boulder: all no-ops, same as C.

### Clone vs stub (hallucination check)

Say it explicitly: this is **not** “Match C dispatch, callee is a no-op stub.” `fill_pit` runs. A boulder on a vacated pit/hole is extracted, the trap is unlinked, the boulder is deleted, `newsym` paints the cell. The pit/hole object is gone. That is the D-0950 helper review **81** told the next port to **call**.

It **is** a **clone that diverges** from C `flooreffects` `do.c:185–269` boulder+pit arm:

| Step | C `flooreffects(..., "settle")` | JS `fill_pit` |
|------|----------------------------------|---------------|
| `boulder_hits_pool` first | yes | **skip** (named; pit is not a pool) |
| trapped mon/hero squish | pline + `hmon`/`losehp` `rnd(15)` | **skip** |
| settle pline / You_hear | “fills a pit” / plugs hole/trapdoor | **silent** |
| trap teardown | `delfloortrap` (also `mtrapped=0`) | `deltrap` only |
| boulder | `useupf(obj, 1)` | `delobj` |
| other objects on the cell | `bury_objs(x, y)` | **leave on floor** |
| `newsym` | yes | yes |

`dig.js` already imports `delfloortrap`. The thin helper does not use it. A monster still `mtrapped` in that pit keeps the flag after the trap object is gone. Other objects that C would bury stay visible. That is a **C-wrong in the helper**, not a miss of the Open **call**. Review **81** named it and forbade turning this iter into a `flooreffects` rewrite. Map debt, not Must-fix this SHA: the subject promised the call, and the call is in C order.

Common path (hero already `reset_utrap`’d, no monster in the pit): C still prints the settle line and buries; JS is silent and does not bury. Public sessions do not hit boulder+pit teleport, so the fortress is not a settle-pline proof.

C `do.c:239–269` after the trapped-creature arm: Blind+`u_at` You_hear CRASH; else `cansee` “The boulder fills a pit” / plugs hole or unseen trapdoor; else You_hear drop. Then `deletedwithboulder:` `delfloortrap` (if the trap survived `hmon`→`fill_pit` recursion), `useupf(obj, 1L)`, `bury_objs`, `newsym`, `res = TRUE`. JS `deltrap` unlinks only (`trap.js:1098–1103`) and does **not** clear a remaining monster’s `mtrapped` (`delfloortrap` `:1172–1190` would). `dig.js` already imports `delfloortrap` and does not use it here. That is the clone gap, recorded as D-0950 / map, not a miss of `teleport.c:526`.

C `fill_pit` has no other callers that this SHA needed to retouch (`trap.c` `fill_pit` is also used from `flooreffects` recursion when a monster dies in a pit — already D-0950). `teleds` is the Open line. Boulder otyp is `BOULDER` from `objects_data`, same as `maybe_dunk_boulders`. `is_pit`/`is_hole` are `const.js` exports matching `trap.h:113–114` (PIT|SPIKED_PIT / HOLE|TRAPDOOR) — not a local trap.js clone.

## Hallucinations / overclaim

D-log / CURRENT / subject say a boulder on a vacated pit or hole **runs `fill_pit` after `u_on_newpos`**. That is the hunk. They name `flooreffects("settle")`. Stamping **Addressed:** D-1121 is fair for the Open **call** line. Hash `803a7f5c` is already on the archive row (filled by D-1122). Do **not** read “Match C teleds fill_pit” as “Match C `flooreffects` settle / `bury_objs`.”

## Density

One call at one C locus. ~16 JS lines. §2b “one deferred `if`” would be waste as a FAIL peel; this was the named Open row review **81** queued, plus the existing helper. Related `switch_terrain` / `update_player_regions` left named — not a second hypothesis. Right size for that queue line.

## Verification

Journal: private canary **22**/22 (PIT/HOLE/SPIKED/TRAPDOOR fill; TELEP skip; origin-not-dest; same-cell; empty move; steed); green+strict seed8000/0900; cohort **24**/24 including 0012 vault + 0360/4500/0373/0367; path **public-unhit** on boulder+pit teleport. Cadence fortress is not a settle-pline proof. This audit’s full `sessions` (cadence **#1430**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression, still not a fill_pit hit.

C read of `teleport.c:448–528`, `trap.c:4010–4019`, `do.c:185–269`, `trap.h:113–114`; JS `teleport.js:1192–1277`, `dig.js:802–811`, `trap.js:1098–1103` / `:1172–1190`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| origin pit+boulder, hero left | `fill_pit` → settle + trap gone | **call runs**; trap/boulder gone; silent; no bury |
| origin hole/trapdoor+boulder | plugs + `delfloortrap` | **deltrap** + `delobj` |
| no boulder / no pit | no-op | **same** |
| dest cell (nux,nuy) | not `fill_pit`’s args | **same** (`ux0,uy0`) |
| `placebc` before fill | (wrong) | **gone** — fill then placebc |
| trapped mon in pit | squish / `mtrapped=0` | **named skip**; `mtrapped` may stick |
| `update_player_regions` | after fill | **named skip** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open call matches `teleport.c:526`. The helper’s `flooreffects` gap was in-scope as named from review **81**.

Named omits / do-nots (map / Open, not Must-fix):

1. `flooreffects(otmp, x, y, "settle")` boulder+pit/hole body (`do.c:187–269`): settle pline, `delfloortrap` (clears `mtrapped`), `useupf`, `bury_objs`. Do not treat D-1121 as a close of that body.
2. `teleds` `switch_terrain` when dest typ ≠ origin (`teleport.c:551–552`). Live Open.
3. `teleds` `update_player_regions` (`teleport.c:529`). Live Open.
4. `teleds` hideunder / mimic / swallow `docrt` / buried-ball / vault_guard. Live Open / named.
5. Do not restore the `// fill_pit deferred` skip. Do not `fill_pit(nux,nuy)`. Do not pull Punished ball into a fill_pit peel. Do not pull `rloc` Wizard stair into this SHA — **Addressed:** D-1122 `5a2f96ca`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- Score: **8 / 10**
- One sentence: `teleds` now calls `fill_pit(u.ux0, u.uy0)` after the `u_on_newpos` subset and before `placebc`, so a boulder on a vacated pit/hole is extracted and the trap deleted, while C `flooreffects("settle")` (settle pline, `delfloortrap`, `bury_objs`) stays the named thin-helper debt.
- Must-fix stays empty for this SHA; next port popped Open `rloc` Wizard stair / `mon_telecontrol`. **Addressed:** D-1122 `5a2f96ca`. Not RLOC_MSG.
