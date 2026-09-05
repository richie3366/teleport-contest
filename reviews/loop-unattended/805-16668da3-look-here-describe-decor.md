# Review 805 — 16668da3 — pickup.c describe_decor + invent.c look_here There() (D-1835)

## Metadata
- Full / short hash: `16668da3afdfa1d423b80c44b4eaebb0fb116a33` / `16668da3`
- Parent: `68aa6457` (D-1834). Map-driven Open: 5 corpus blocks attributed to `describe_decor`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-05 01:44:19 +0200
- D-id: **D-1835**
- Stats: `js/pickup.js` +106/−31; `invent.js` +21/−2; `region.js` +9; `timeout.js` +6/−2; `zap.js` +4/−3; `trap.js` +1/−1. `js/` insertions **147** ≤250. Band **80–350**.
- Claims to close: pit/dart “There is a … here.” before the object list. Not leftover WIN_STATUS.
- JS / map: `look_here` seen-trap/region; `describe_decor` / `force_decor` / `deferred_decor`. `c-js-map/turns.md`. Archive **Addressed:** D-1835 `16668da3`.

## Intent vs deliverable

Git subject promises: proxy matched `describe_decor`’s `"There is %s here."` literal; C actually prints that from `look_here` seen-trap/region `There()`. Also port `describe_decor` body.

`node scripts/csym.mjs look_here` → `invent.c:4102–4315`. Seen trap/region `:4162–4177`. `--callers look_here`: `invent.c:4327`, `pickup.c:452,1114`. `There` `pline.c:424–433` (`YouMessage` `"There "` + line). `describe_decor` `pickup.c:351–426`. `--callers describe_decor`: `pickup.c:331,345,437,706,713`. `force_decor` / `deferred_decor` / `back_on_ground`.

The diff **does** both: `look_here` plines `There is … here.` before objects; `describe_decor` matches the C body (Fumbling defer, door/water skip, verbose, ICE Norep, `back_on_ground`).

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `look_here` trap/region | LIVE | `There()` via `pline` |
| `visible_region_at` / `reg_damg` / `trapname` / `an` | LIVE callees | |
| `describe_decor` | LIVE repaired | |
| `force_decor` / `deferred_decor` | LIVE new | |
| `back_on_ground` | LIVE callee | now exported |
| `ice_descr` / Blind ice `force_decor` / unconscious pickup | OMIT named | |
| `dfeature_at` ice/pool/lava/throne/drawbridge | OMIT named | |

`node scripts/sym.mjs`:

```
look_here        js/invent.js:5942   ASYNC
describe_decor   js/pickup.js:845    ASYNC
force_decor      js/pickup.js:804    ASYNC
deferred_decor   js/pickup.js:823    ASYNC
There            NOT EXPORTED — 1 LOCAL do.js:435  (this SHA inlines the call)
visible_region_at js/region.js:90   sync
reg_damg         js/region.js:82   sync
trapname         js/trap.js:1492   sync
back_on_ground   js/trap.js:2435   ASYNC
```

FORCE/DIAG/`getRngLog`/`fastforward`: **none**. Rule #2: clean.

## C ↔ JS fidelity

**`look_here` `:4162–4177`.** `!skip_objects`: `visible_region_at` → `"a poison gas|vapor cloud"`; `t_at` only if `tseen`; if either, `There("is %s%s%s here.", regbuf, " and ", an(trapname))`. JS `pline(\`There is ${regbuf}… here.\`)` ≡ `There()` (`:424–433`). **Match.** Blind ice `force_decor` named.

**`describe_decor` `:351–426`.** Fumbling TIMEOUT==1 → `deferred_decor(TRUE)` return FALSE. Skip open door/doorway; waterhere + prev ICE from pool clears dfeature. Same-typ non-furniture → FALSE. Else verbose `"There is %s here."` / `upstart`; ICE+mention_decor `Norep`; else `back_on_ground` after pool/lava/ice unless `PLNMSG_BACK_ON_GROUND`. `prev_decor = mention_decor ? ltyp : STONE`. **Match those branches.** `ice_descr` TODO in C is named.

**Callee closure.** `look_here` + `describe_decor` are one pickup/look family. Callees LIVE. Named OMITs only. No STUB in the shipped There() arm.

## Hallucinations / overclaim

Do **not** stamp `ice_descr`, full `dfeature_at`, Blind ice, or unconscious `pickup`. The D-log correctly says the corpus string is `look_here` `There()`, not a `describe_decor` hit — they still ported both.

## Density

§2b: the attributed `describe_decor` row plus the real `look_here` printer. +147. Right size.

## Verification

This audit, `js/` at `16668da3`: `node scripts/hidden-proxy.mjs verify describe_decor --base 16668da3~1` → `5 session(s) blocked`. Summary: **`5 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS`**. Matches the D-log (four `explore-seed0015` pit + `explore-seed1500` dart). Not vacuous.

## Actionable C-wrongs

None that must block the next port. Named stay on the map.

Verdict: **ACCEPT-WITH-DEBT**
