# Review 717 — d07fc56a — invent.c delobj / delobj_core extract then obfree (D-1756)

## Metadata
- Full / short hash: `d07fc56ad678cbbe9b34e63743a0e53ec80e90c8` / `d07fc56a`
- Parent: `5455d0cb` (D-1755). This file audits **this SHA only** (eighth of nine `js/` commits since review **709**). Archive **Addressed:** D-1756 `d07fc56a`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 03:14:04 +0200
- D-id: **D-1756**
- Stats: `js/mkobj.js` +72/−68; `js/zap.js` +6/−19; `js/shk.js` +2/−1. Total `js/` insertions **80** <250. Band **150–350**.
- Claims to close: Open `delobj` extract-only after D-1743 `dealloc_obj`. Not zap `delete_contents` clone. Not invent Array vs nobj. `reviews/loop-2026-08-15/` has no unpaid delobj Must-fix.
- JS / map: `mkobj.js` `delobj`/`delobj_core`/`extract_nobj`/`container_weight`; `zap.js` revive. `c-js-map/data.md` / `turns.md`.
- Prior: **704** `dealloc_obj`; parent `delobj` still `quan=0`.

## Intent vs deliverable

Git subject promises: extract then `obfree` (floor `maybe_unhide`+`newsym`, Rider force) instead of extract-only `quan=0` after D-1743.

`node scripts/csym.mjs delobj` → `invent.c:1429–1433`. `--callers delobj`: 43 sites. `delobj_core` `:1436–1462` (callers `:1432` FALSE; `zap.c:1113` TRUE). `obj_resists` `zap.c:1457–1473`. `extract_nobj` `mkobj.c:2595–2614`. `container_weight` `:2731–2738`. `maybe_unhide_at` `mon.c:4696–4720`. Revive `zap.c:1106–1127`.

```1436:1461:nethack-c/upstream/src/invent.c
    if (!force && obj_resists(obj, 0, 0)) {
        obj->in_use = 0;
        return;
    }
    update_map = (obj->where == OBJ_FLOOR);
    obj_extract_self(obj);
    if (update_map) {
        maybe_unhide_at(obj->ox, obj->oy);
        newsym(obj->ox, obj->oy);
    }
    obfree(obj, (struct obj *) 0);
```

Parent: name-list Amulet/Book/Candelabrum/Bell (**no Rider**), always `rn2(100)` on the rest, extract, `quan=0` / `OBJ_FREE` **without** `obfree` or floor redraw. Zap revive floor called `delobj` (Rider corpse resists). `obfree_corpse` clone. The diff **does** `delobj_core` + live `obj_resists(0,0)`, floor `maybe_unhide_at`+`newsym`, `obfree`, revive `delobj_core(used,true)` + contained/buried live `obfree`, `extract_nobj`/`container_weight`. It **does not** replace zap `delete_contents` clone. Named. It **does not** walk invent as nobj (`freeinv` still Array). Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `delobj` `:1429–1433` | LIVE | `delobj_core(obj, false)` |
| `delobj_core` `:1436–1462` | LIVE | force skip resist; floor unhide+newsym; `obfree` |
| `obj_resists` `:1457–1473` | LIVE import | dogmove.js; invocation + Rider; else `rn2(100)<ochance` |
| `extract_nobj` `:2595–2614` | LIVE | panic if lost; `where=OBJ_FREE` |
| `container_weight` `:2731–2738` | LIVE | recurse `OBJ_CONTAINED` |
| `obj_extract_self` | LIVE repaired | uses extract_nobj + nested weight |
| `obfree` | LIVE | shk.js D-1743 dealloc |
| `maybe_unhide_at` | LIVE import | async; **not awaited** (comment) |
| `obfree_corpse` | deleted clone | NOT FOUND |
| zap `delete_contents` | OMIT named | zap.js:4692 clone of shk.js |
| invent Array extract | OMIT named | `freeinv` not `extract_nobj` |

`node scripts/sym.mjs`:

```
delobj           js/mkobj.js:2690   sync
delobj_core      js/mkobj.js:2670   sync
extract_nobj     js/mkobj.js:2429   sync
container_weight js/mkobj.js:2451   sync
obj_resists      js/dogmove.js:107   sync
obfree           js/shk.js:3313   sync
maybe_unhide_at  js/monmove.js:1138   ASYNC — await required
obfree_corpse    NOT FOUND
delete_contents  js/shk.js:3296   + LOCAL clone js/zap.js:4692
```

Re-point: inline nobj unlinks → `extract_nobj`; name-list resist → `obj_resists`; `obfree_corpse` → `obfree`. `node scripts/imports.mjs --can mkobj.js dogmove.js obj_resists` / `monmove.js maybe_unhide_at` / `shk.js obfree`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**`delobj`.** One-line wrapper `delobj_core(obj, FALSE)`. JS the same. **Match.**

**`obj_resists(0,0)` (`:1457–1473`).** Invocation four + Rider corpse → TRUE **without** `rn2`. Else `rn2(100) < (oartifact ? achance : ochance)` with both chances 0 → never. Parent name-list skipped Rider and skipped `rn2` on specials (C also skips `rn2` on specials) but **did** `rn2(100)` on ordinary. LIVE helper **Match C**, including Rider. Canary Amulet/Rider resist no `rn2`; force Rider.

**`force` (`zap.c:1112–1113`).** Floor revive `delobj_core(corpse, TRUE)` so Rider corpses go away + `newsym`. Parent `delobj` left Riders. JS `delobj_core(used, true)`. **Match the Open.**

**Extract then map then `obfree`.** Snapshot `update_map` **before** extract (coords stay valid). Floor: `maybe_unhide_at` then `newsym`. Then `obfree(obj, NULL)` (contents too). Parent `quan=0` left timers/lights/contents. **Match C.** `obfree` LIVE (D-1743 `dealloc_obj` queue).

**CONTAINED / BURIED zombie revive (`:1118–1127`).** extract + `obfree`, not `delobj_core` (not floor). JS deleted `obfree_corpse` (`quan=0` + drop oextra). **Match.** `obfree_corpse` NOT FOUND.

**`extract_nobj`.** Walk nobj; unlink; panic “object lost”; `where=OBJ_FREE`; `nobj=NULL`. JS `throw` analogue. **Match.** MINVENT/CONTAINED/MIGRATING/BURIED/ONBILL now share it. Floor still `remove_object`; invent `freeinv`. **Match C split.**

**`container_weight`.** `owt = weight(object)` then recurse while contained. Parent only `cont.owt = weight(cont)` once (nested bag stale). **Match C nested.**

**`maybe_unhide_at` (`:4696–4720`).** C sync: `m_at` or `youmonst`; if undetected hides_under and (no OBJ_AT or trap or !can_hide_under) → `hideunder`. JS LIVE but **async** (`You_see`). `delobj_core` does **not** `await` (comment: empty-pile unhide). `newsym`/`obfree` can run before hideunder pline. youmonst arm named. Not a stub: the function is imported. Debt: fire-and-forget async vs C sync. Do **not** Must-fix unless hideunder `--More--` desyncs a session; named youmonst already.

**RNG.** Resist ordinary: one `rn2(100)`. Specials/Rider: **none**. Force: **none**. `obfree` may rng inside (pre-existing). **Match those burns.** Parent always `rn2(100)` even when… wait parent skipped `rn2` on the four names then `rn2` on others. Rider was ordinary in parent → extra `rn2` then still extracted (`quan=0`). This SHA Rider returns before `rn2` and **keeps** the corpse unless force. **That is a real RNG+object fix**, not a comment.

**Callee closure (`delobj` / revive floor).** LIVE: `obj_resists`, `obj_extract_self`, `extract_nobj`, `container_weight`, `maybe_unhide_at`, `newsym`, `obfree`. OMIT named: zap `delete_contents` clone; invent Array; youmonst unhide polish. STUB: **none**. Not “dispatch ported, callee stubbed.” `obfree` is LIVE, not `quan=0`.

## Hallucinations / overclaim

Subject “extract then obfree, floor unhide+newsym, Rider force”: **true**. D-log “no Rider in name-list”: **true**. Do **not** stamp “Match C zap `delete_contents`.” Do **not** stamp “Match C invent nobj `extract_nobj`.” Do **not** stamp “Match C awaited `maybe_unhide_at`.” Journal “fortress held” is not a Rider-revive floor. Cohort **7**/7. **Public-unhit** for force Rider. Admit that.

## Density

§2b: `delobj`/`delobj_core` + `extract_nobj`/`container_weight` the extract path uses + revive force/`obfree`. +80. Related delete `obfree_corpse`. Did **not** glue zap `delete_contents` / eat useup hybrid. Did **not** reopen D-1755 Sting.

## Verification

D-log: save-oracle skip (untagged `mkobj.c:delobj`); node 18/18 (DELETED queue; Amulet/Rider resist no rn2; force Rider; extract_nobj unlink+lost panic; floor unlink); green+strict seed8000/0900; CURRENT cohort **7**/7 + strict. Rule #2 clean. Rider-revive **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (`delobj_core`+`obfree`+Rider force match C; remaining named). Named: zap.js `delete_contents` clone; invent Array vs nobj; `maybe_unhide_at` youmonst; await on async unhide. Do **not** restore `quan=0`. Do **not** restore `obfree_corpse`. Do **not** name-list resist (misses Rider). Do **not** `delobj` floor revive (use force). Do **not** add `extract_nobj` clone #2. Do **not** re-port D-1743 `dealloc_obj`.

Verdict: **ACCEPT-WITH-DEBT**
