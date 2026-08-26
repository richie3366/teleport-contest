# Review 494 — 9d2ba80e — sp_lev.c create_object o->lit begin_burn (D-1533)

## Metadata
- Full / short hash: `9d2ba80e5f6e99128aeeb0c9d0230cf596ab2cd4` / `9d2ba80e`
- Parent: `81e04089` (D-1532). This file audits **this SHA only** (third of nine `js/` commits since review **491**). Archive **Addressed:** D-1533 `9d2ba80e`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 06:24:29 +0200
- D-id: **D-1533**
- Stats: 9 files, +111 / −45 — `js/mklev.js` +13 / −4. Band 150–350 (js/ insertions 13).
- Claims to close: Open `sp_lev.c` `create_object` `o->lit` (named from D-1532 / D-1519). Not mktrap_victim. `reviews/loop-2026-08-15/` has no unpaid lit-object Must-fix.
- JS / map: `mklev.js` `create_object` / `l_create_object`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: none unpaid.

## Intent vs deliverable

Git subject promises: a lua lit object begins burning after `stackobj`, not a named omit that left lamps unlit.

Pinned C `sp_lev.c` `create_object` `:2422–2438`; producer `lspo_object` `:3640` `tmpobj.lit = get_table_boolean_opt(L, "lit", 0)`. Callee `timeout.c` `begin_burn` `:1712`. Only production lua: `themerms.lua:208` `des.object({ id = "oil lamp", lit = true })`. Tests: `test_des.lua:170`. Distinct from D-1519 `mktrap_victim` (`!levl[x][y].lit` after `place_object`).

```2422:2426:nethack-c/upstream/src/sp_lev.c
    if (!(o->containment & SP_OBJ_CONTENT)) {
        stackobj(otmp);

        if (o->lit)
            begin_burn(otmp, FALSE);
```

Old JS: `stackobj` then return; comment named `lit begin_burn`. `begin_burn` already imported (D-1519).

The diff **does** call `begin_burn(otmp, false)` after `stackobj` when `o.lit`, and defaults `l_create_object` `tmp.lit == null` → 0. It **does not** port `o->buried` `bury_an_obj` (same C block; **LIVE** `dig.js` but async vs sync `create_object`). Named. It **does not** fill themerms Light source. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `o->lit` after `stackobj` | C `:2425–2426`, **LIVE this SHA** | inside `!SP_OBJ_CONTENT` |
| `begin_burn` | C `timeout.c:1712`, **LIVE** | `timeout.js:698`; already imported |
| `stackobj` | C `mkobj.c`, **LIVE** | `mkobj.js:1807` |
| `l_create_object` lit default 0 | C `:3640`, **LIVE this SHA** | |
| `bury_an_obj` | C `:2428–2436`, **OMIT named** | LIVE async `dig.js:375`; not called |
| themerms Light source fill | C lua `:208`, **OMIT named** | only production `lit=true` |

`node scripts/sym.mjs create_object begin_burn stackobj l_create_object bury_an_obj`:

```
create_object    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mklev.js:11320
begin_burn       js/timeout.js:698   sync
stackobj         js/mkobj.js:1807   sync
l_create_object  js/mklev.js:11516   sync
bury_an_obj      js/dig.js:375   ASYNC — await required
```

No symbol deleted. `begin_burn` is not a stub: MAGIC_LAMP / POT_OIL / lantern / OIL_LAMP / candles / `start_timer` match C `:1712+`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG** (`begin_burn` timers, not `rn2`).

## C ↔ JS fidelity

Gate. Same `!(containment & SP_OBJ_CONTENT)` as `stackobj`. Content objects skip light. **Match `:2422`.** `o.lit` is the lua field, **not** `levl[x][y].lit`. **Match; not D-1519.**

Call. `begin_burn(otmp, FALSE)`. JS `false`. **Match.** `begin_burn` early-out when `age==0` and not MAGIC_LAMP/artifact_light: **match C `:1718–1719`.** Oil lamp / tallow take the OIL_LAMP / TALLOW_CANDLE arms.

Default. C writes 0 when lua omits `lit`. JS `tmp.lit == null → 0`. `lit:false` stays false (not null). Packed `create_object` without a `lit` key: `o.lit` undefined is falsy. **Match the default.**

Order vs bury. C lights then maybe `bury_an_obj`. JS lights and returns. Buried+lit would stay on the floor in JS. **Named omit**, not a clone of bury.

Callee closure. LIVE: `stackobj`, `begin_burn`. OMIT named: `bury_an_obj`, themerms fill. STUB: none. **The lit arm may ship.**

## Hallucinations / overclaim

Subject lua lit object begins burning after `stackobj`: **true of the C `if`.** **False as “themerms now drops a burning lamp”** — that fill is still named; no packed loader passes `lit` yet (D-log public-unhit). This is **not** “dispatch ported, callee stubbed.” Stamping **Addressed:** D-1533 for **`:2425–2426` + `:3640`** is fair. Do **not** stamp “Match C themerms Light source.” Do **not** stamp “Match C `bury_an_obj`.” Do **not** gate on tile.lit.

## Density

+13 JS: C is two statements plus a default. §2b “unless C is that small” applies. Did not glue EYE / FOOT.

## Branch-by-branch confirm

1. Floor object `lit` truthy: `stackobj` then `begin_burn(..., false)`. **Match.**
2. `lit` omitted / 0 / false: no `begin_burn`. **Match.**
3. `SP_OBJ_CONTENT`: skip stack and burn. **Match.**
4. Lit tile, `o.lit` false: no burn (unlike D-1519). **Match this locus.**
5. Buried: still unnamed. **Named omit.**
6. themerms oil lamp: C would take this arm; JS fill not ported. **Named.**

## Callers / RNG ledger

C: every `create_object` with `o->lit`. JS: `create_object` + table default. Public suite does not pass `lit`. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE.

## Verification

D-log canary **12**/12 (oil lamp `lit:true` on a **lit** tile; omitted lit; tallow; CONTENT skip; Rule #2); green+strict; cohort **7**/7. **Public-unhit** (no loader passes `lit`). Admit it.

## Actionable C-wrongs

None for Must-fix. Named: themerms Light source fill; `bury_an_obj`.

Verdict: **ACCEPT-WITH-DEBT**
