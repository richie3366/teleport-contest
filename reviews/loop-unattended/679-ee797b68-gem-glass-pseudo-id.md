# Review 679 — ee797b68 — shk.c get_cost gem glass pseudo-ID (D-1718)

## Metadata
- Full / short hash: `ee797b68caf44933876755bd132d4482aee2fc6f` / `ee797b68`
- Parent: `ed4800ed` (D-1717). This file audits **this SHA only** (second of nine `js/` commits since review **677**). Archive **Addressed:** D-1718 `ee797b68`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 07:48:19 +0200
- D-id: **D-1718**
- Stats: `js/shk.js` +65/−5. Total `js/` insertions **65** <250. Band **150–350**. C switch is ~45 lines — density floor does not apply.
- Claims to close: Open gem glass pseudo-ID after D-1717 / review **678**. Not `arti_cost`. Not Hallu currency. `reviews/loop-2026-08-15/` has no unpaid glass-price Must-fix.
- JS / map: `shk.js` `get_cost`. `c-js-map/turns.md`.
- Prior: **652** / **677** / **678** named this table.

## Intent vs deliverable

Git subject promises: unidentified shop glass uses the `ubirthday` color table `oc_cost`, instead of `tmp=5` after D-1717.

`node scripts/csym.mjs get_cost` → `shk.c:2876–2988`. Glass arm `:2897–2941`. `--callers get_cost`: bill/contained/stolen/charge sites in `shk.c` (12). `oid_price_adjustment` `:2862–2873`. `FIRST_GLASS_GEM` `objects.h:1574` (`WORTHLESS_WHITE_GLASS` after `LAST_REAL_GEM` JADE `:1571`). `getprice` `:4318–4358` (glass `oc_cost` 0).

```2897:2941:nethack-c/upstream/src/shk.c
        if (obj->oclass == GEM_CLASS
            && objects[obj->otyp].oc_material == GLASS) {
            int i;
            boolean pseudorand =
                (((int) ubirthday % obj->otyp) >= obj->otyp / 2);

            switch (obj->otyp - FIRST_GLASS_GEM) {
            case 0: /* white */
                i = pseudorand ? DIAMOND : OPAL;
                break;
            /* cases 1–8: blue…violet — same pairs as JS */
            default:
                impossible("bad glass gem %d?", obj->otyp);
                i = STRANGE_OBJECT;
                break;
            }
            tmp = (long) objects[i].oc_cost;
        } else if (oid_price_adjustment(obj, obj->o_id) > 0) {
```

Parent: glass branch empty (`// … deferred; keep tmp`); `getprice` 0 → `tmp=5`. The diff **does** the 9-color switch + `objects[i].oc_cost`. It **does not** change `getprice` `arti_cost`. Named. It **does not** port `set_cost` gemstone/glass **buy** table (`:3169`). Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `get_cost` glass arm | LIVE repaired | cases 0–8 + default |
| `FIRST_GLASS_GEM` | CLONE local | `LAST_REAL_GEM+1` ≡ C MARKER |
| `DIAMOND`…`FLUORITE` | CLONE local otyps | `objectNames.indexOf`; table already exports some |
| `oid_price_adjustment` | LIVE local | already skips glass |
| `getprice` | LIVE local | glass `oc_cost` 0 → tmp 5 then overwritten |
| `objects()` | LIVE import | `objects.js:72` |
| `GLASS` | CLONE local | 19 ≡ `materials.h` |
| `impossible` | LIVE import | ASYNC; default arm **not** awaited |
| `arti_cost` | OMIT named | `getprice` still table `oc_cost` this SHA |
| `set_cost` gem buy table | OMIT named | `:3169` |

`node scripts/sym.mjs`:

```
get_cost         NOT EXPORTED — 1 LOCAL js/shk.js:2966
oid_price_adjustment NOT EXPORTED — 1 LOCAL js/shk.js:770
getprice         NOT EXPORTED — 1 LOCAL js/shk.js:2927
LAST_REAL_GEM    js/generated/objects_data.js:17   sync
DIAMOND          js/generated/objects_data.js:8   sync
SAPPHIRE         js/generated/objects_data.js:21   sync
AQUAMARINE       js/generated/objects_data.js:5   sync
EMERALD          js/generated/objects_data.js:9   sync
FLUORITE         js/generated/objects_data.js:12   sync
arti_cost        js/artifact.js:391   sync   (imported next SHA)
impossible       js/display.js:5018   ASYNC
objects          js/objects.js:72   sync
FIRST_GLASS_GEM  local const shk.js:141 (not an export)
```

No clone→import re-point (`LAST_REAL_GEM` already imported; gem otyps are new locals from `objectNames`, not a stolen `get_cost` from another file). `--can` N/A (no new module edge). Do **not** add `get_cost` #2. Do **not** add `DIAMOND` as a second local if importing the generated const later. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Gate.** C `!dknown \|\| !oc_name_known` then `GEM_CLASS && oc_material==GLASS`. JS the same (`GLASS` 19). Identified glass skips the table. **Match `:2896–2899`.** `oid_price_adjustment` `:2866–2868` already excludes that glass arm so there is **no** 4/3 stack on worthless glass. JS `:773–775` the same. **Match.**

**`tmp=5` then overwrite.** C `getprice` of glass is `oc_cost` 0 (`objects.h` gval 0) then `if (!tmp) tmp=5` **before** the glass switch, then `tmp = objects[i].oc_cost`. JS the same order. Identified glass keeps 5. Unidentified uses diamond/opal/… costs (4000/800/…). **Match.**

**`FIRST_GLASS_GEM`.** C `MARKER(LAST_REAL_GEM, JADE)` then next object `WORTHLESS_WHITE_GLASS` then `MARKER(FIRST_GLASS_GEM, …)`. JS `LAST_REAL_GEM` 460 JADE; `FIRST_GLASS_GEM = 461` `WORTHLESS_WHITE_GLASS`. `objectNames` 461–469 are white…violet glass in C order. **Match `objects.h:1571–1590`.**

**`pseudorand`.** C `((int) ubirthday % otyp) >= otyp / 2` (int div). JS `(game.ubirthday | 0) % otyp >= Math.trunc(otyp / 2)`. `u_init` sets `ubirthday = getnow()` (unix seconds; contest `datetime` via `time_from_yyyymmddhhmmss`). 2026 timestamps fit int32; `| 0` ≡ C `(int)` until 2038. **Match `:2903–2904`.** No `rn2`.

**Switch cases 0–8 vs C `:2907–2934` (walked every arm):**

| case | color | `pseudorand` | else |
|---:|---|---|---|
| 0 | white | DIAMOND 4000 | OPAL 800 |
| 1 | blue | SAPPHIRE 3000 | AQUAMARINE 1500 |
| 2 | red | RUBY 3500 | JASPER 500 |
| 3 | yellowish brown | AMBER 1000 | TOPAZ 900 |
| 4 | orange | JACINTH 3250 | AGATE 200 |
| 5 | yellow | CITRINE 1500 | CHRYSOBERYL 700 |
| 6 | black | BLACK_OPAL 2500 | JET 850 |
| 7 | green | EMERALD 2500 | JADE 300 |
| 8 | violet | AMETHYST 600 | FLUORITE 400 |
| default | | `impossible` + `STRANGE_OBJECT` | |

JS `objectNames.indexOf` for those names matches generated otyps (DIAMOND 440, …). `tmp = objects()?.[i]?.oc_cost \| 0` ≡ C `objects[i].oc_cost`. **Match call-for-call.** Default `impossible` is ASYNC and **not** `await`ed here (other `shk.js` sites await). Invalid otyp only — not a live-arm stub.

**After the table.** Tourist/CHA roundoff, `tmp<=0` → 1, artifact `*4`, surcharge `(tmp+2)/3` still run on the gem `tmp`. **Match `:2947–2986`.** No RNG in this function.

**Callee closure (glass arm).** LIVE: `objects()`, `oid_price_adjustment` (else-if, not this arm), `getprice` (pre-overwrite). CLONE: `FIRST_GLASS_GEM`, gem otyp consts, `GLASS`. OMIT named: `arti_cost` in `getprice`; `set_cost` buy table. STUB: **none** in cases 0–8. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “unidentified shop glass uses the ubirthday color table oc_cost instead of tmp=5”: **true**. Identified glass **stays** 5 — D-log says so; do not stamp “Match C identified glass = diamond.” Do **not** stamp “Match C `arti_cost`.” Do **not** stamp “Match C `set_cost` `:3169`.” Journal “fortress held” is not a gem-shop price proof. Public gem buy **may** hit this if a seed bills unidentified glass; otherwise **public-unhit**. Admit that.

## Density

§2b: one `get_cost` arm C already gated. +65. Did not glue `arti_cost` / Hallu currency. Related deferral `oid_price_adjustment` already skipped glass — left alone.

## Verification

D-log / journal: save-oracle skip (untagged `shk.c:get_cost`); private canary **12**/12; green+strict seed8000/0900; focused seed0383/0116; CURRENT cohort **7**/7 + strict. Public shop glass **public-unhit** unless a billed unidentified glass seed exists. Canaries are the table check.

## Actionable C-wrongs

None for Must-fix (the Open switch matches C). Named: `getprice` `arti_cost` (next); Hallu `currency` ROLL_FROM; `set_cost` gemstone/glass buy table (`shk.c:3169`); bill-price reuse FIXME (`:2882–2888`); default-arm `await impossible`. Do **not** add `get_cost` #2. Do **not** add `FIRST_GLASS_GEM` as `LAST_REAL_GEM+2`. Do **not** apply `oid_price_adjustment` 4/3 on glass. Do **not** restore `tmp=5` for unidentified glass. Do **not** use `rn2` here (C is birthday-stable). Do **not** treat identified glass as the table.

Verdict: **ACCEPT-WITH-DEBT**
