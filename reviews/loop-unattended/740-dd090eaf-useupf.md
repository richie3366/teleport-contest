# Review 740 — dd090eaf — invent.c useupf + eat.c carried hybrid (D-1771)

## Metadata
- Full / short hash: `dd090eafa239dc82e93d9bec12d478a6328ad99f` / `dd090eaf`
- Parent: `1fbbe0c0` (D-1770). **Re-audit** of the SHA previously filed as review **730** (ACCEPT-WITH-DEBT). Independent pinned-C walk.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 07:46:09 +0200
- D-id: **D-1771**
- Stats: `js/invent.js` +32/−6; `js/eat.js` +19/−59; apply/engrave/fountain/pray/zap import retargets. Total `js/` insertions **60** ≤250. Band **150–350**.
- Claims to close: Open eat.js invent+floor hybrid after D-1735. Not shop `addtobill`. Not zap `useupf` clone. Review **696** / **688** named eat hybrid.
- JS / map: `invent.js` `useupf`; `eat.js` carried ternary. `c-js-map/turns.md`.
- Archive **Addressed:** D-1771 `dd090eaf`.

## Intent vs deliverable

Git subject promises: Match C `invent.c` `useupf` so `eat.c` carried food uses invent-only `useup` vs floor `useupf`+`hideunder`, instead of the eat.js invent+floor hybrid after D-1735.

`node scripts/csym.mjs useupf` → `invent.c:4762–4783`. `--callers useupf`: eat.c `:570`/`:1521`/`:1921`/`:1965`/`:2107`/`:2428`/`:2485` plus apply/do/hack/pickup/pray/sit/zap. `useup` → `invent.c:1320–1333`. `hideunder` → `mon.c:4723–4802`. `carried` → `obj.h:332` `where==OBJ_INVENT`.

```4762:4783:nethack-c/upstream/src/invent.c
void
useupf(struct obj *obj, long numused)
{
    boolean at_u = u_at(obj->ox, obj->oy);
    if (obj->quan > numused)
        otmp = splitobj(obj, numused);
    else
        otmp = obj;
    if (!svc.context.mon_moving && costly_spot(otmp->ox, otmp->oy)) {
        /* addtobill vs stolen_value */
    }
    delobj(otmp);
    if (at_u && u.uundetected && hides_under(gy.youmonst.data))
        (void) hideunder(&gy.youmonst);
}
```

Parent: eat.js exported hybrid `useup` (invent decrement **or** floor `splitobj`+`delobj`) and a `useupf` without `hideunder`. The diff **does** export invent `useupf` (at_u snapshot, split, `delobj`, `hideunder`), replace eat sites with `carried()?useup:useupf`, retarget imports, and tighten `carried`. It **does not** port the shop bill arm. Named. It **does not** port `fprefx` pyrolisk. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `useupf` | LIVE new (partial) | split + `delobj` + `hideunder`; shop arm OMIT |
| `useup` | LIVE import | invent.js; eat hybrid **deleted** |
| `useupall` | LIVE | coin `eatspecial` |
| `delobj` / `splitobj` | LIVE | mkobj D-1756 |
| `u_at` / `hides_under` | LIVE | |
| `hideunder` | LIVE import | mon.js subset |
| `carried` | CLONE repaired | eat.js; `where` then invent[] |
| eat.c ternaries | LIVE repaired | `done_eating`, tin, two `eatcorpse`, `eatspecial` |
| `fprefx` pyrolisk `:2107` | OMIT named | JS `fprefx` has no EGG explode |
| zap.js `useupf` | CLONE leftover | split+`delobj` only |
| shop `addtobill`/`stolen_value` | OMIT named | inside `useupf` |

`node scripts/sym.mjs` (eat exports deleted → invent import):

```
useupf           js/invent.js:4002   sync
             !! ALSO 1 LOCAL CLONE(S)
               js/zap.js:829
useup            js/invent.js:3983   sync
             !! ALSO 4 LOCAL CLONE(S)
               js/detect.js:207  js/potion.js:411  js/read.js:185  js/spell.js:564
useupall         js/invent.js:3970   sync
delobj           js/mkobj.js:2691   sync
splitobj         js/mkobj.js:345   sync
hideunder        js/mon.js:2863   sync
             !! ALSO 1 LOCAL CLONE(S)
               js/monmove.js:1081
hides_under      js/monsters.js:347   sync
u_at             js/const.js:3138   sync
carried          js/eat.js:1960   sync
             !! ALSO 3 LOCAL CLONE(S)
               js/artifact.js:1110  js/ball.js:43  js/timeout.js:618
```

`--can invent.js mon.js hideunder`: **ALREADY**. `--can eat.js invent.js useupf`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**. No new RNG in `useupf` (shop `stolen_value` would have been the next RNG; it is named-off).

## C ↔ JS fidelity

**`useup` (`:1325–1332`).** Unchanged invent export: `quan>1` → decrement else `useupall`. Eat no longer overlays a floor arm. **Match.** Hybrid deletion is the Keep.

**`useupf` keep path.** Snapshot `u_at(ox,oy)` **before** split (C comment: `burn_floor_objects` reuses the remainder pointer). `quan > numused` → `splitobj`; else the same obj; `delobj`; if `at_u && uundetected && hides_under(youmonst.data)` then `hideunder`. JS the same. **Match those statements.**

**Shop arm (`:4775–4780`).** C: `!mon_moving && costly_spot` then `addtobill` if hero’s room else `stolen_value`. JS skips the whole `if`. Named. Floor-eat in a shop will not bill. Map debt, not Must-fix — this SHA did not claim that arm.

**`hideunder` callee.** mon.js export is a real body. Named omits on **that** helper exist; it is not a no-op. LIVE enough for this call.

**Eat callers.** C `done_eating` `:548–570`: `in_use=TRUE` then carried ternary. JS now sets `piece.in_use = true` then the ternary. **Match.** `use_up_tin` both arms were hybrid `useup`; now `carried?useup:useupf(tin,1)` matching `:1518–1521`. Two `eatcorpse` sites match `:1918–1921` and `:1962–1965`. `eatspecial` coins `:2425–2428` and tail `:2478–2485`. **Match the shipped sites.** `fprefx` pyrolisk EGG `:2103–2108` is **absent**. Named.

**`carried`.** C is `obj->where == OBJ_INVENT`. JS now returns true on that field **or** invent[] membership. Honest stand-in for addinv omitting `where`. Not Must-fix.

**Callee closure (`useupf` keep + eat ternaries).** LIVE: `splitobj`, `delobj`, `hideunder`, `hides_under`, `u_at`, `useup`, `useupall`, `carried`. OMIT named: shop bill; pyrolisk `useupf`; zap clone. STUB: **none** on the eat arms.

## Hallucinations / overclaim

Subject “invent-only `useup` vs floor `useupf`+`hideunder`” is true for the eat sites this SHA edited. “Match C `useupf`” is **true for split/`delobj`/`hideunder`**, false for the shop `if` — and the D-log **says** that. Review **730** holds. Do **not** stamp “Match C floor-eat shop bill.” Do **not** stamp “Match C `fprefx` pyrolisk.” Do **not** stamp “Match C zap `useupf`.”

## Density

§2b: invent `useupf` + the eat.c caller family that was the hybrid. +60, eat net shrinkage. Did **not** glue zap clone / detect useup / shop bill / pyrolisk explode.

## Verification

D-log: save-oracle skip (untagged `invent.c:useupf`); green+strict seed8000/0900; CURRENT cohort **7**/7 + strict (incl. seed1800 eat-throw). Rule #2 clean. Floor `useupf`+`hideunder` **public-unhit**. Admit that. This re-audit re-reads pinned C against the hunks.

## Actionable C-wrongs

None for Must-fix (eat hybrid retired; keep path matches C; shop/pyrolisk/zap named). Named: `useupf` shop `addtobill`/`stolen_value`; zap.js `useupf` clone; detect/potion/read/spell `useup`; `fprefx` pyrolisk. Do **not** restore eat hybrid `useup`. Do **not** write `useupf` clone #3. Do **not** snapshot `at_u` **after** `splitobj`. Do **not** call invent `useup` on a floor object.

Verdict: **ACCEPT-WITH-DEBT**
