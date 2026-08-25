# Review 469 — be542317 — polyself.c body_part HEAD/HAND aliases (D-1508)

## Metadata
- Full / short hash: `be5423174604995400b8e10e58eea895d31c10fe` / `be542317`
- Parent: `a4a370f4` (D-1507). This file audits **this SHA only** (fifth of nine `js/` commits since review **464**). Archive **Addressed:** D-1508 `be542317`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 00:35:54 +0200
- D-id: **D-1508**
- Stats: 11 files, +135 / −69 — `js/mcastu.js` +5 / −15, `js/pickup.js` +24 / −11. Band 150–350.
- Claims to close: Open `body_part_head` / `body_part_hand` (named from D-1496 / review **457**). Not EYE/FOOT leftovers. `reviews/loop-2026-08-15/` has no unpaid psi-bolt Must-fix.
- JS / map: `mcastu.js` `mcast_psi_bolt`; `pickup.js` `u_handsy` / `able_to_loot` / `lift_object`. `c-js-map/turns.md` / `data.md`.
- Prior reviews this SHA claims to close: **457** named those two clones.

## Intent vs deliverable

Git subject promises: psi-bolt and loot/Sokoban messages use the poly anatomy table instead of hardcoded head/hand clones.

Pinned C `polyself.c` `body_part` `:2143–2146` = `mbodypart(&youmonst, part)`. Callers: `mcastu.c` `mcast_psi_bolt` `:612–619` `body_part(HEAD)`; `pickup.c` `u_handsy` `:2948–2949` `body_part(HAND)`; `able_to_loot` `:2063–2065` freehand loot; `lift_object` `:1713–1716` `BOULDER && Sokoban` (`rm.h:538` `Sokoban` ≡ `level.flags.sokoban_rules`, **not** `In_sokoban`). `hack.h` `HAND=6` `HEAD=8`.

Old JS: `body_part_head` fungus/jelly subset else `"head"` (sphere HEAD would stay `"head"`); `body_part_hand` always `"hand"`. Review **457** left both named.

The diff **does** delete those clones. mcastu imports LIVE `body_part(HEAD)` from `polyself.js`. pickup cannot import polyself (`polyself.js` → `do.js` → `pickup.js`); it uses existing `body_part_latebound(HAND)` (same seam as wield / D-1496). It **does** wire Sokoban boulder refuse and `able_to_loot` freehand. It **does not** port `mcast_blind_you` EYE or `observe_quantum_cat` FOOT. Named. It **does not** touch `steed.js`’s second local `u_handsy` (still `"You have no free hand."`). Pre-existing clone #2; not this envelope.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `body_part` | C `:2143–2146`, **LIVE** | mcastu import |
| `body_part_latebound` | JS seam, **verified CLONE of `body_part` once bound** | pickup / wield |
| `body_part_head` | clone, **deleted** | `sym` NOT FOUND |
| `body_part_hand` | clone, **deleted** | `sym` NOT FOUND |
| `HEAD` / `HAND` | C enum, **LIVE** | 8 / 6 |
| `mcast_psi_bolt` | C `:600–620`, **LIVE this SHA** | HEAD strings |
| `u_handsy` pickup | C `:2942–2953`, **LIVE this SHA** | |
| `able_to_loot` freehand | C `:2063–2066`, **LIVE this SHA** | |
| `lift_object` Sokoban | C `:1713–1716`, **LIVE this SHA** | |
| `mcast_blind_you` EYE | C `:736`, **OMIT named** | no JS function |
| `observe_quantum_cat` FOOT | C, **OMIT named** | |
| `steed.js` `u_handsy` | C same function, **CLONE leftover** | not this SHA |

`node scripts/sym.mjs body_part body_part_latebound body_part_head body_part_hand set_body_part HEAD HAND mcast_psi_bolt u_handsy able_to_loot lift_object`:

```
body_part        js/polyself.js:352   sync
body_part_latebound js/objnam.js:1663   sync
body_part_head   NOT FOUND in js/**
body_part_hand   NOT FOUND in js/**
set_body_part    js/objnam.js:1654   sync
HEAD             js/const.js:426   export const
HAND             js/const.js:424   export const
mcast_psi_bolt   NOT EXPORTED — 1 LOCAL js/mcastu.js:175
u_handsy         NOT EXPORTED — 2 LOCAL js/pickup.js:1703  js/steed.js:175
able_to_loot     NOT EXPORTED — 1 LOCAL js/pickup.js:1939
lift_object      NOT EXPORTED — 1 LOCAL js/pickup.js:515
```

Deleted clones are gone. Exactly one exported `body_part`. No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG.**

## C ↔ JS fidelity

Psi-bolt. C `:612–619`: `dmg<=5` slight `%sache`; `<=10` brain on fire; `<=20` `%s suddenly aches painfully`; else very painfully. JS the same with `body_part(HEAD)`. **Match.** Old clone missed sphere `"body"` / dog still `"head"` (HEAD is head on dog). Fungus `"cap area"` now live. **This SHA matches C** for those tables. `shieldeff` / `monstseesu` still deferred (pre-existing comment).

`u_handsy`. C `nohands` → `"You have no hands!"` (**not** `body_part`); `!freehand` → `"You have no free %s."` `body_part(HAND)`. JS the same via latebound. **Match pickup.c.** Unset latebound fallback `'hand'` is the null-data humanoid arm, same as D-1496 wield.

`able_to_loot` freehand. C `:2063–2065` only when `looting`. JS `if (looting && !freehand())` + the C pline. **Match that arm.** Still named: usteed `rider_cant_reach`; Underwater tip `(is_pool && (looting || !Underwater))`; `hliquid`. JS pool test is `looting`-only, so tip-from-water still diverges. Named, not this HEAD/HAND claim.

Sokoban boulder. C `:1713–1716` **before** LOADSTONE override. JS same order: boulder+Sokoban `return -1` then `carry_count`. Macro is `sokoban_rules`, not dungeon `In_sokoban`. JS `game.level?.flags?.sokoban_rules || game.Sokoban`. Primary term **Match `rm.h:538`.** `game.Sokoban` is a restore alias (`do.js` getlev sync). Extra OR is not `In_sokoban`. LOADSTONE/giant-boulder weight still named after this gate.

Latebound vs import. mcastu→polyself is acyclic. pickup→polyself would cycle. `set_body_part(body_part)` at polyself load (D-1496) makes latebound the same function at runtime. **Verified CLONE of the C callee**, not a `"hand"` stub once bound.

Callee closure. LIVE: `body_part` (mcastu). CLONE: latebound (pickup, bound). OMIT named: EYE/FOOT. STUB: none in the claimed sites. **Arm may ship.** steed `u_handsy` remains a diverging clone of the **same** C function; out of this SHA’s files.

## Hallucinations / overclaim

Subject psi-bolt and loot/Sokoban use the poly table: **true** at the four sites this SHA edited. D-log “polyself→do→pickup cycle; no pickup→polyself”: **true**. Stamping **Addressed:** D-1508 for **HEAD psi-bolt + HAND u_handsy/loot/Sokoban boulder** is fair. Do **not** stamp “Match C `mcast_blind_you` EYE.” Do **not** stamp “Match C `observe_quantum_cat` FOOT.” Do **not** stamp “Match C `steed.c` saddle `u_handsy`.” Do **not** treat fortress PASS as a poly `"paw"` loot line. seed4500 focused is a regression check, not a poly proof.

This is **not** “dispatch ported, callee stubbed.” The tables were already LIVE.

## Density

Two callers of one C function (HEAD + HAND cluster). ~29 JS insertions, net clone deletion. Playbook §2b. Did not glue acid dip. Acceptable.

## Branch-by-branch confirm

1. Human `body_part(HEAD)` → `"head"`; fungus `"cap area"`; jelly `"cerebral area"`. **Match** (clone #1 gone).
2. Sphere HEAD `"body"` (old clone said `"head"`). **This SHA.**
3. `u_handsy` nohands still `"no hands!"`. **Match C comment.**
4. `u_handsy` `!freehand` uses `body_part(HAND)` (`"paw"` if dog). **Match.**
5. `able_to_loot` looting + `!freehand`. **Match `:2063`.** Tip skips that arm. **Match.**
6. Sokoban boulder HAND wrap, return -1, before LOADSTONE. **Match `:1713`.**
7. `body_part_head` / `body_part_hand` **NOT FOUND**.
8. `mcast_blind_you` EYE / quantum FOOT. **Named omit.**
9. **Public-unhit** unless a session polys and prints those lines.

## Callers / RNG ledger

No dice. String tables only.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE. Latebound is not a seed string.

## Verification

D-log: `sym.mjs` clones gone; canary **9**/9 (human/lichen/jelly/blob/pudding/dog HEAD·HAND); green+strict seed8000/0900; focused seed4500 **108275**/108275 Scr **1814**; cohort **7**/7 + strict. **Public-unhit** for poly nouns. seed4500 is a **regression** check (pickup/loot strings), not a dog `"paw"` proof.

## Actionable C-wrongs

None that belong on Must-fix. The cited clones are deleted; callees are LIVE or a bound latebound.

Remaining named (map / Open): `mcast_blind_you` `body_part(EYE)`; `observe_quantum_cat` FOOT; LOADSTONE/giant-boulder weight; able_to_loot Underwater/`hliquid`/steed reach. Pre-existing `steed.js` `u_handsy` still hardcodes `"hand"` (`sym` clone #2) — name it when touching steed; do not Must-fix it as this SHA’s miss (files were mcastu+pickup). Do not Must-fix “pickup should import polyself.js.” Do not Must-fix “`|| game.Sokoban` must die this iter” (flags term is C; alias is getlev sync).

Verdict: **ACCEPT-WITH-DEBT**
