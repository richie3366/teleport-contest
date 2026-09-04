# Review 773 — fa5f3acc — invent.c getobj in_doagain / GETOBJ ranks / sortloot INVLET (D-1804)

## Metadata
- Full / short hash: `fa5f3acc64aa10faf5b506dbd10c988be266e643` / `fa5f3acc`
- Parent: `248e8d60` (D-1803 AWD). Map-driven Open.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 03:57:47 +0200
- D-id: **D-1804**
- Stats: `js/invent.js` +139/−172; `js/const.js` +7/−4; `js/apply.js` +3/−3. Net `js/` insertions **149** ≤250. Band **80–350**.
- Claims to close: Open `invent.c` `getobj` remaining — `in_doagain` `readchar`, `hack.h` GETOBJ ranks, `sortloot` INVLET prompt/filter. Not `display_pickinv` body.
- JS / map: `invent.js` `getobj` / `getobj_filter_prompt`; `const.js` signed ranks; `apply.js` grease `GETOBJ_EXCLUDE_INACCESS=-1`. `c-js-map/turns.md`. Archive **Addressed:** D-1804 `fa5f3acc`.

## Intent vs deliverable

Git subject promises: Match C `invent.c` `getobj` so `in_doagain` uses `readchar` (not yn), GETOBJ ranks are the signed `hack.h` enum, and candidate lets come from `sortloot(SORTLOOT_INVLET)` / `invletter_value` rather than invent order + `charCodeAt`.

`node scripts/csym.mjs getobj` → `invent.c:1751–2089`. `compactify` `:1626–1660`. `invletter_value` `:390–399`. `hack.h` `getobj_callback_returns` `:510–538`. C `in_doagain` `:1921–1922`. Filter loop `:1832–1917`.

The diff **does** retarget `js/const.js` (EXCLUDE=0/SELECTABLE=4/NONINVENT=5 → −3/−2/−1/0/1/2), collect lets via `sortloot`+`obj_ok` switch, branch `in_doagain` to `nhgetch`, and make `#adjust` call live `getobj`. Subject is delivered for the live `getobj` path.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `getobj` | LIVE repaired | remaining filter + in_doagain |
| `getobj_filter_prompt` | LIVE local | C `:1832–1917`; do **not** write #2 |
| `getobj_readchar` | CLONE of `readchar` | `nhgetch` only; `readchar_core` **OMIT named** |
| `invletter_value` | LIVE local | `$`=1, a–z, A–Z, `#`; do **not** write #2 |
| `sortloot` | LIVE | INVLET compare already there; now used here |
| `compactify_invlets` | LIVE | when suggested>5 |
| `getobj_adjust` | LIVE | `getobj('adjust', …)` not a second prompt |
| GETOBJ ranks | LIVE | `hack.h` signed |
| `display_pickinv` body | OMIT named | not this cluster |
| getobj_* clones (wield/do/potion/apply/write) | OMIT named | local prompt loops remain |

`node scripts/sym.mjs`:

```
getobj                 js/invent.js:6882   ASYNC
getobj_filter_prompt   NOT EXPORTED — 1 LOCAL (invent.js:6718)
getobj_readchar        NOT EXPORTED — 1 LOCAL (invent.js:6803)
compactify_invlets     js/invent.js:6292   sync
invletter_value        NOT EXPORTED — 1 LOCAL (invent.js:1043)
getobj_adjust          NOT EXPORTED — 1 LOCAL (invent.js:7079)
GETOBJ_EXCLUDE         js/const.js:2194
GETOBJ_EXCLUDE_INACCESS js/const.js:2196
```

`--can invent.js const.js GETOBJ_EXCLUDE` / `cmd.js yn_function` / `apply.js invent.js getobj`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed-in-control-flow: **none**. Rule #2 **clean**.

## C ↔ JS fidelity

**Ranks (`hack.h:510–538`).** Parent: EXCLUDE=0, INACCESS=3, SELECTABLE=4, NONINVENT=5. C: −3/−2/−1/0 then DOWNPLAY=1 SUGGEST=2. Gold gate is `obj_ok <= GETOBJ_EXCLUDE`; silly_thing is `== GETOBJ_EXCLUDE`. JS now matches. apply.js local `GETOBJ_EXCLUDE_INACCESS` 3→−1 so `grease_ok` through live `getobj` is not `impossible("bad return")`. **That was a C-wrong; it is gone on the live path.**

**Filter (`:1831–1914`).** `obj_ok(NULL)`: SUGGEST → allownone + prompt `"- "` prefix; DOWNPLAY/INACCESS/SELECTABLE → allownone + HANDS in altlets; NONINVENT → `forceprompt=FALSE`, `inaccess++`. Then `reassign` if `!invlet_constant`. `sortloot(&invent, SORTLOOT_INVLET)`. Per object: INACCESS increments inaccess; EXCLUDE/SELECTABLE drop; DOWNPLAY → altlets + forceprompt; SUGGEST stays in lets; NONINVENT/`default` → `impossible`. Compactify when suggested>5. Empty + !forceprompt + !allownone → `"You don't have anything %sto %s."` **Match.** Prompt uses compact `buf`; `?` menu uses uncompacted `lets` (`rawLets`). **Match.**

**`invletter_value` (`:390–399`).** `$` first, a–z +2, A–Z +28, `#`=54, else 55. JS uses `charCodeAt` **inside** that ranking, not as the sort key. **Match.**

**`in_doagain` (`:1921–1936`).** C `readchar()` vs yn vs force_invmenu `?`/`*`. JS `getobj_readchar` → `nhgetch` (same as `getdir_read_dirsym`). `readchar_core` fuzzer / queue / ALTMETA / click **OMIT named**. force_invmenu: `(*lets \|\| *altlets) ? '?' : '*'` ≡ `getobj_force_invmenu_ch(rawLets, altLets)`.

**`#adjust`.** C `getobj("adjust", …, GETOBJ_PROMPT|GETOBJ_ALLOWCNT)`. JS `getobj_adjust` now calls live `getobj` (parent painted `_pending_message` + extra `nhgetch`).

**Callee closure.** `sortloot`/`compactify`/`silly_thing`/`yn_function`/`cmdq` LIVE. `display_pickinv` body **OMIT named**. `readchar` remainder **OMIT named**. No STUB in a shipped live arm. wield.js still has inverted local ranks (SUGGEST=1/EXCLUDE=3) **inside its named getobj clone**, not on live `getobj`.

## Hallucinations / overclaim

Subject is **true for live `getobj`**. Do **not** stamp “Match C `display_pickinv`” or “Match C `readchar_core`.” Do **not** add `invletter_value` clone #2. Do **not** treat wield/do/potion local loops as closed.

## Density

§2b: one C function’s remaining filter + the rank enum those `obj_ok` callbacks return. +149. Did **not** glue `display_pickinv`. Right size.

## Verification

D-log: green + named cohort. save-oracle skip. Public-unhit for `in_doagain` `readchar` vs yn. This audit: `csym` `:1751–2089` vs HEAD `js/invent.js:6882–6974` + filter `:6718–6796`; ranks vs `hack.h:510–538`. Rule #2 clean.

## Actionable C-wrongs

None for Must-fix. Named: `display_pickinv` body; getobj_* clones (wield ranks still inverted **inside** the clone); `readchar_core` fuzzer/queue/ALTMETA.

Verdict: **ACCEPT-WITH-DEBT**
