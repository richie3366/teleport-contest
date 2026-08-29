# Review 628 — 0cc9e178 — pray.c dosacrifice ECMD_TIME after floorfood pick (D-1667)

## Metadata
- Full / short hash: `0cc9e1780c2d9c6360c02bfdbcb1db915107f9ab` / `0cc9e178`
- Parent: `3c77e49a` (D-1666). This file audits **this SHA only** (second of nine `js/` commits since review **626**). Archive **Addressed:** D-1667 `0cc9e178`. Review **626** already stamped.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 17:18:33 +0200
- D-id: **D-1667**
- Stats: `js/pray.js` +17/−10. Band **150–350** (`js/` insertions **17** <250; id >454). Must-fix, not an Open peel.
- Claims to close: Must-fix review **626** Actionable #1 (QUALITY-RISK). Not `offer_corpse` / `offer_too_soon` / `offer_real_amulet` / `offer_fake_amulet`. Not remaining pushkeys. `reviews/loop-2026-08-15/` has no unpaid ECMD_TIME Must-fix.
- JS / map: `pray.js` `dosacrifice` returns. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **626** Actionable #1. File already stamped `**Addressed:** D-1667 0cc9e178`.

## Intent vs deliverable

Git subject promises: a successful floorfood pick of CORPSE / Yendor / fake returns `ECMD_TIME`, instead of `ECMD_OK` with no turn after D-1665.

Pinned C `dosacrifice` `:1853–1896` (`node scripts/csym.mjs dosacrifice`). `--callers`: `cmd.c:72` prototype (command table / iactions queue, not a C call expr). `offer_too_soon` `:1478–1498`. `offer_real_amulet` `:1526–1589`. `offer_fake_amulet` `:1601–1627`. `offer_corpse` `:1958–2120` (`--callers` `:1890`).

```1872:1895:nethack-c/upstream/src/pray.c
    if (!otmp)
        return ECMD_OK;

    if (otmp->otyp == AMULET_OF_YENDOR) {
        if (!highaltar) {
            offer_too_soon(altaralign);
            return ECMD_TIME;
        } else {
            offer_real_amulet(otmp, altaralign);
            /*NOTREACHED*/
        }
    }
    if (otmp->otyp == FAKE_AMULET_OF_YENDOR) {
        offer_fake_amulet(otmp, highaltar, altaralign);
        return ECMD_TIME;
    }
    if (otmp->otyp == CORPSE) {
        offer_corpse(otmp, highaltar, altaralign);
        return ECMD_TIME;
    }
    pline1(nothing_happens);
    return ECMD_TIME;
```

Old JS after D-1665: one combined `if` for those three otyps **`return ECMD_OK`**. `nothing_happens` already returned TIME. The diff **does** split the three arms and **`return ECMD_TIME`** on each, matching C’s three-`if` layout for the **command result**. It **does not** port `offer_*` (Must-fix said not to). Empty pick stays `ECMD_OK`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dosacrifice` | C `:1853–1896`, **LIVE this SHA** (ECMD) | export async; bodies of offer still named |
| `floorfood` | C eat.c, **LIVE** | D-1665; not rewritten |
| `on_altar` | C `#define` `:105`, **CLONE** | local `pray.js:190`; **do not add #2** |
| `ECMD_TIME` / `ECMD_OK` | C flag.h, **LIVE** | imported |
| `nothing_happens` | C decl, **LIVE** | imported; fallthrough already TIME |
| `AMULET_OF_YENDOR` / `FAKE_*` / `CORPSE` | C objects, **CLONE** | local `objectNames.indexOf` |
| `offer_too_soon` | C `:1478–1498`, **OMIT named** | `sym.mjs` NOT FOUND |
| `offer_real_amulet` | C `:1526–1589`, **OMIT named** | NOTREACHED after call in C |
| `offer_fake_amulet` | C `:1601–1627`, **OMIT named** | |
| `offer_corpse` | C `:1958–2120`, **OMIT named** | `--callers` `:1890` only |

`node scripts/csym.mjs dosacrifice` → `:1853-1896`. `offer_corpse` → `:1958-2120`. `offer_too_soon` → `:1478-1498`. `offer_real_amulet` → `:1526-1589`. `offer_fake_amulet` → `:1601-1627`. `--callers dosacrifice`: `cmd.c:72`. `--callers offer_corpse`: `:1890`.

RNG: none in these return arms. `offer_corpse` has Hallu plines / `change_luck` — not this SHA. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names (no clone deleted; return values re-pointed):

```
dosacrifice      js/pray.js:1473   ASYNC — await required
floorfood        js/eat.js:3390   ASYNC — await required
offer_corpse     NOT FOUND in js/**
             This index includes js/generated/. Do not add a local clone.
offer_too_soon   NOT FOUND in js/**
offer_real_amulet NOT FOUND in js/**
offer_fake_amulet NOT FOUND in js/**
ECMD_TIME        js/const.js:1787   sync   export const
ECMD_OK          js/const.js:1786   sync   export const
nothing_happens  js/const.js:413   sync   export const
on_altar         NOT EXPORTED — 1 LOCAL js/pray.js:190
             => Do NOT write clone #2.
```

`--can pray.js eat.js floorfood`: ALREADY. Do **not** stamp “cycle-forced clone.” Do **not** invent `offer_corpse` / `offer_too_soon` / `offer_real_amulet` / `offer_fake_amulet` clones.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Empty pick. C `if (!otmp) return ECMD_OK`. JS `if (!otmp) return ECMD_OK`. **Match `:1872–1873`.** Altar / swallow / Confusion / Stunned still `ECMD_OK`. **Match `:1860–1867`.**

Yendor. C `!highaltar` → `offer_too_soon` then TIME; else `offer_real_amulet` then NOTREACHED (that function `done()`s). JS `return ECMD_TIME` with the two callees named in a comment. **Match the command result.** Not Match the `highaltar` split or the amulet bodies. Named. JS still does not compute `highaltar = (levl[u.ux][u.uy].altarmask & AM_SANCTUM)` (`:1868`) because only `offer_*` read it.

Fake. C `offer_fake_amulet` then TIME. JS TIME, callee named. **Match ECMD `:1884–1887`.** Fake unknown-on-low-altar calls `offer_too_soon` inside the omitted body.

Corpse. C `offer_corpse` then TIME even when that function `return`s early (`value==0` `nothing_happens`, rider revival, race). The **outer** `dosacrifice` still TIME. JS TIME without calling the body. **Match `:1889–1892` ECMD.** Not Match consume / luck / gnostic. Named.

Fallthrough. C `pline1(nothing_happens); return ECMD_TIME`. JS already `await pline(nothing_happens); return ECMD_TIME`. **Unchanged. Match `:1894–1895`.**

Callee closure (this SHA’s three arms). LIVE: `floorfood`, `ECMD_TIME`/`ECMD_OK`, `pline`/`nothing_happens`, otyp constants. CLONE: `on_altar`. OMIT named in this commit (map + D-log + comments): all four `offer_*`. STUB: **none** for the Must-fix identifier (the return). Combined-arm: **626** called the wrong ECMD a C-wrong and the missing bodies a named omit. After this SHA the ECMD is LIVE and the bodies stay OMIT. “Dispatch ported, callee stubbed” is **false for ECMD**; it remains **true for `offer_corpse` as a named Open**, not a new Must-fix.

## Hallucinations / overclaim

Subject “successful floorfood pick … returns ECMD_TIME”: **true** for the three otyps. D-log “Did not port `offer_corpse` / `offer_too_soon` / `offer_real_amulet` / `offer_fake_amulet`”: **true** (`sym.mjs` NOT FOUND). Do **not** stamp “Match C `#offer`.” Do **not** stamp “Match C `offer_corpse`.” Do **not** stamp “Match C `highaltar` / `a_align`.” Do **not** stamp “Match C `nothing_happens` as new this SHA” (it was already TIME). Public-unhit (no itemactions O in sessions). Fortress does not prove a turn was spent after canned invlet.

## Density

+17: Must-fix ECMD after **626**. One function, three returns. Did not glue `offer_corpse` or remaining pushkeys. Below §2b’s Open ~80 floor; Must-fix may be that small.

## Verification

Wired: canned corpse/Yendor/fake → TIME; miss → OK. Unwired C: `offer_*` bodies; `highaltar` mask. Conf: no extra `rn2`. No seed gate.

D-log private canary; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for `#offer` / itemactions O. Fortress 44/44 does not hit sacrifice.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `offer_corpse` `:1958–2120`; `offer_too_soon`; `offer_real_amulet`; `offer_fake_amulet`; remaining pushkeys unwield/name/eat/engrave/buy/two-weapon; `choose_tip_container_menu`; tip spill/tiphat. Do **not** invent `offer_*` clones. Do **not** add `on_altar` #2. Do **not** restore `getobj_invoke`. Do **not** re-port offer/tip/invoke pushkeys (D-1665).

Verdict: **ACCEPT-WITH-DEBT**
