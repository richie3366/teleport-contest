# Review 219 — 466adf3e — monmove.c gelcube_digests (D-1257)

## Metadata
- Full / short hash: `466adf3e224b234820a8f4df5e71e056fb810355` / `466adf3e`
- Parent: `03e8b10c` (D-1256). This file audits **this SHA only**. Archive row **Addressed:** D-1257 lacked the short hash; this review commit fills `466adf3e`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-19 05:11:24 +0200
- D-id: **D-1257**
- Stats: 15 files, +301 / −159 — `js/monmove.js` +50 / −8; `js/worn.js` +34; `js/mon.js` +18; `js/mkobj.js` +12; `js/dogmove.js` −local stub.
- Claims to close: Open `monmove.c` `gelcube_digests` (named from D-1246 / review **208**). Not `mon_yells`. `reviews/loop-2026-08-15/` has no unpaid cube Must-fix.
- JS / map: `monmove.js` `gelcube_digests` / `dochug`; `worn.js` `extract_from_minvent`; `mon.js` `m_consume_obj`; `c-js-map/turns.md` / `debt.md`. `meatobj` / meatbox / poly still named.
- Prior reviews this SHA claims to close: **208** named omit `gelcube_digests` after `bee_eat_jelly`.

## Intent vs deliverable

Git subject promises: “Match C monmove.c gelcube_digests so a gelatinous cube with organic (non-artifact, non-prize) inventory spends a turn digesting it, instead of moving with the object still in minvent.”

C `gelcube_digests` (`monmove.c:422–445`): if `meating` or no minvent, `-1`; walk `nobj` for first `is_organic && !oartifact && !is_mines_prize && !is_soko_prize`; `meating = eaten_stat(meating, otmp)`; `extract_from_minvent(mtmp, otmp, TRUE, TRUE)`; `m_consume_obj`; return 0. Caller `dochug` (`:876–878`) after `bee_eat_jelly`, before `want_move`. Prize macros `obj.h:435–436`. `m_consume_obj` (`mon.c:1392–1453`) heals non-pet by `oc_weight` then meatbox/uball/poly/`delobj` — tails named. `meatobj` floor engulf (`mon.c:1533`) named.

Old JS: named omit after D-1246; cube took a full movement turn with minvent intact. `dogmove.js` had a local `m_consume_obj` that only `delobj`.

The diff **does** the body, `dochug` gate, prize helpers, `extract_from_minvent`, and a shared `m_consume_obj` heal+`delobj`. It does **not** port `meatobj` or the consume tails. Named. `mpickstuff` prize skip stays unwired (helpers live).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `gelcube_digests` | C `:422–445`, **new** | returns 0 / −1 |
| `dochug` cube gate | C `:876–878`, **wired** | after bee, before want_move |
| `is_organic` | C `objclass.h`, **imported live** | `mat <= WOOD` |
| `is_mines_prize` / `is_soko_prize` | C `obj.h:435–436`, **new** | `o_id == achieveo.*_oid` |
| `eaten_stat` | C `eat.c:3788–3804`, **imported live** | 0 → 1 |
| `extract_from_minvent` | C `worn.c:1377–1417`, **new** | artifact_light / `obj_no_longer_held` named |
| `update_mon_extrinsics` | C `worn.c`, **imported live** | worn path |
| `obj_extract_self` | C, **imported live** | |
| `m_consume_obj` | C `:1392–1453`, **new** (replaces dogmove stub) | heal+`delobj`; meatbox/poly named |
| `healmon` / `delobj` | C, **imported live** | |
| `meatobj` | C `:1533`, **named omit** | floor engulf |
| mpickstuff prize skip | C, **named omit** | helpers unwired |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **No new RNG in `gelcube_digests`.** `delobj` still rolls `obj_resists(0,0)` (pre-existing). `eaten_stat` has no `rn2`. `m_move` already decrements `meating` (`monmove.c:314–316` / JS `:1575`).

## C ↔ JS fidelity

Pinned C (`monmove.c:424–444`):

```
    if (mtmp->meating || !mtmp->minvent)
        return -1;
    while (otmp) {
        if (is_organic(otmp) && !otmp->oartifact
            && !is_mines_prize(otmp) && !is_soko_prize(otmp))
            break;
        otmp = otmp->nobj;
    }
    if (!otmp)
        return -1;
    mtmp->meating = eaten_stat(mtmp->meating, otmp);
    extract_from_minvent(mtmp, otmp, TRUE, TRUE);
    m_consume_obj(mtmp, otmp);
    return 0;
```

JS walks `nobj` with the same four predicates. `is_organic` is `oc_material <= WOOD`. Prize: `(o.o_id\|0) === (achieveo.mines_prize_oid\|0)`. `next_ident` starts at 1; unset prize oid 0 does not match live objects. Artifact skip is `!oartifact`. `eaten_stat(0, untouched)` is 1 (C `base<1 ? 1`). `extract_from_minvent(..., true, true)`: `obj_extract_self`, clear `owornmask`, `update_mon_extrinsics` if alive, `misc_worn_check &= ~`, `check_gear_next_turn`; W_WEP clears `mw` + `NEED_WEAPON` (C `mwepgone` inlined; light polish named). `artifact_light` `end_burn` named — this walker already skips `oartifact`. `obj_no_longer_held` (crysknife) named; crysknife is not organic.

`dochug`: `(mdat.mndx\|0) === PM_GELATINOUS_CUBE` (C `mdat == &mons[PM_GELATINOUS_CUBE]`; `mons()` allocates). After bee, before `want_move`. `cres >= 0` return — cube spends the turn. Match.

`m_consume_obj`: C heals non-pet `mhp < mhpmax` by `oc_weight` **then** meatbox / uball / poly / `delobj` / `newcham` / `grow_up` / `mon_givit`. JS heals then `delobj`. For a typical organic non-container (food, leather, wood) the claimed effect is the object gone and HP up. Container/corpse extras are named tails of **this** callee, like review **213**’s `resists_blnd` extra-resist, not a digest that leaves minvent intact. Pet `dog_eat` now shares the export: `mtame` skips heal, still `delobj` — same as the old stub.

## Hallucinations / overclaim

Subject + D-1257 say a cube with digestible minvent spends a turn digesting instead of moving with the object still in inventory. **`gelcube_digests` + live extract + `delobj` + `dochug` return 0 are the hunk.** Stamping **Addressed:** D-1257 is fair. This is **not** “Match C dispatch, callee is a stub”: `extract_from_minvent` unlinks minvent; `healmon`/`delobj` run. Do **not** stamp “Match C `meatobj` floor engulf” or “Match C `m_consume_obj` meatbox/poly/`mon_givit`.” Prize helpers existing but unwired in `mpickstuff` is named, not a cube that ignores `is_mines_prize` on the digest walk.

## Density

One C function plus the two callees it actually calls (`extract_from_minvent`, `m_consume_obj`) and the `dochug` site after bee. ~50 + ~25 + ~15 JS lines. Two modules that already share minvent. Right size. Did not glue ALLOW_BARS.

## Branch-by-branch confirm

1. Cube, organic non-artifact minvent, `!meating`: eat first, `meating=1`, extract, heal if wounded, `delobj`, `dochug` return 0. Match the claimed slot.
2. `meating` already set: −1, cube may move. Match (`m_move` still counts down).
3. Empty minvent: −1. Match.
4. Only metallic / glass: walk to end, −1. Match.
5. Artifact first, organic second: skip artifact, eat second. Match.
6. Prize oid matches: skip. Match.
7. Pet cube (if `dochug` ran): heal skipped, still `delobj`. Match consume’s `ispet`.
8. Worn organic: extrinsics off + gear check. Match the shipped worn core.
9. Killer bee still first. Match C order.
10. Floor objects underfoot: not this function (`meatobj` named). Match the skip.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Prize compares `o_id` to achieveo, not a recorded coordinate. Plain ESM.

## Verification

Journal: private canary **40**/40 (C body+caller; JS organic eat / metal skip / artifact / prizes / heal / pet skip / worn extract / dochug return; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a cube `dochug`s with digestible minvent. Cadence this audit: full `sessions` at HEAD `466adf3e` **44**/44 Scr **11405**/11405 RNG **100%**.

## Actionable C-wrongs

None for Must-fix. Digest removes the object and spends the turn through live extract/`delobj`. `m_consume_obj` tails and `meatobj` are named omits of extra effects, not a wrapper that still returns −1 with minvent intact.

Named omits (map, not Must-fix):

1. `meatobj` floor engulf (`mon.c:1533`)
2. `m_consume_obj` meatbox / uball / poly / slime / grow / stone / carrot / mimic / pyrolisk / `mon_givit`
3. `extract_from_minvent` `artifact_light` `end_burn` / `obj_no_longer_held`
4. `mpickstuff` / `m_search_items` prize skip (helpers live, unwired)
5. ALLOW_BARS rust/corr/metallivore (next Open)

Do not Must-fix “JS mndx vs `&mons[PM_GELATINOUS_CUBE]`.” Do not Must-fix “mwepgone inlined to `mw=null`.”

## Callers / RNG ledger

C: only `dochug`. JS same. No RNG in the new function. Public fortress is not evidence a cube digested.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: a gelatinous cube now spends a turn extracting and deleting the first digestible minvent object; `meatobj` / meatbox / poly stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1257 `466adf3e`.
