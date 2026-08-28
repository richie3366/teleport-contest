# Review 560 — 95ad0f11 — invent.c SORTLOOT_PETRIFY (D-1599)

## Metadata
- Full / short hash: `95ad0f11cbb84c7d4e8aa5f4afa89de54e269db7` / `95ad0f11`
- Parent: `9a4cbd04` (D-1598). This file audits **this SHA only** (sixth of nine `js/` commits since review **554**). Archive **Addressed:** D-1599 `95ad0f11`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 22:43:54 +0200
- D-id: **D-1599**
- Stats: `js/invent.js` +84/−9, `js/pickup.js` +22/−13. Band **150–350** (js/ insertions **106**).
- Claims to close: Open `SORTLOOT_PETRIFY` after D-1589. Not eat.c feel. Not doloot Blind. `reviews/loop-2026-08-15/` has no unpaid petrify-loot Must-fix.
- JS / map: `invent.js` `sortloot` / `will_feel_cockatrice` / `feel_cockatrice` / `look_here`; `pickup.js` `query_objlist_pickup`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **550** named `SORTLOOT_PETRIFY`.

## Intent vs deliverable

Git subject promises: a petrifying corpse stays in the sorted loot list when a class filter rejects food, and Blind `look_here`/pickup feel it.

Pinned C `invent.c` `sortloot` `:611–620`. `will_feel_cockatrice` `:4333–4340`. `feel_cockatrice` `:4342–4361`. `look_here` skip `:4265–4276` / single `:4284–4285` / multi `:4300–4311`. `pickup.c` `query_objlist` `:1084–1116` (`FEEL_COCKATRICE` → `SORTLOOT_PETRIFY` + abort `look_here(0, LOOKHERE_NOFLAGS)`). Pickup `,` `:774–775` always ORs FEEL. `hack.h:1364` `SORTLOOT_PETRIFY 0x20`. `hack.h:64–65` `CXN_PFX_THE=4` `CXN_ARTICLE=8`. `youprop.h:65` Stone_resistance H\|\|E. `--callers will_feel`: eat `:3688`; look_here; pickup `:1112`/`:2229`. `--callers feel`: eat; look_here three; pickup doloot `:2230`; pray `:1985`.

```611:621:nethack-c/upstream/src/invent.c
    augment_filter = (mode & SORTLOOT_PETRIFY) ? TRUE : FALSE;
    mode &= ~SORTLOOT_PETRIFY; /* remove flag, leaving mode */
    ...
        if (filterfunc && !(*filterfunc)(o)
            && (!augment_filter || o->otyp != CORPSE
                || !touch_petrifies(&mons[o->corpsenm])))
            continue;
```

Old JS: `sortloot` dropped any filter reject; no feel helpers; look_here never felt; pickup never aborted `,` into `look_here(0)`.

The diff **does** strip PETRIFY before cmp, keep cockatrice CORPSE past filterfunc, live feel helpers, three look_here floor arms, pickup FEEL abort. It **does not** port eat.c, doloot `:2223–2234`, pray `force_touch`, engulfer stomach `:4151`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `sortloot` PETRIFY | C `:611–620`, **LIVE this SHA** | `0x20` |
| `will_feel_cockatrice` | C `:4333–4340`, **LIVE this SHA** | |
| `feel_cockatrice` | C `:4342–4361`, **LIVE this SHA** | |
| `look_here` skip/single/multi | C `:4265–4311`, **LIVE** | |
| pickup `,` FEEL abort | C `:1111–1116`, **LIVE** | |
| `touch_petrifies` | C mondata, **LIVE** | import |
| `corpse_xname` / `killer_xname` | **LIVE** | C homes |
| `instapetrify` | **LIVE** | dynamic import; `--can` SAFE |
| `poly_when_stoned` | **LIVE** | + mvitals G_GENOD |
| `Blind` invent.js | C youprop + roleplay, **CLONE** | not zap sticky |
| eat.c feel | C `:3688`, **OMIT named** | |
| doloot Blind !uarmg | C `:2223–2234`, **OMIT named** | |
| pray `force_touch` | C `:1985`, **OMIT named** | |
| engulfer minvent feel | C `:4151`, **OMIT named** | |

`node scripts/csym.mjs will_feel_cockatrice` → `:4333-4340`. `feel_cockatrice` → `:4342-4361`. `sortloot` PETRIFY in `:592–643`.

RNG: none in these arms. `instapetrify` / life-save RNGs are the callee. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
will_feel_cockatrice js/invent.js:758   sync
feel_cockatrice  js/invent.js:774   ASYNC — await required
sortloot         js/invent.js:801   sync
SORTLOOT_PETRIFY js/const.js:1740   sync   export const
look_here        js/invent.js:4437   ASYNC — await required
instapetrify     js/trap.js:2696   ASYNC — await required
corpse_xname     js/objnam.js:886   sync
killer_xname     js/objnam.js:1004   sync
touch_petrifies  js/monsters.js:420   sync
```

`--can pickup.js invent.js will_feel_cockatrice`: ALREADY. `--can invent.js trap.js instapetrify`: IN-SCC, `instapetrify` hoisted, **VERDICT SAFE**. Dynamic import is not a clone. Do **not** add `feel_cockatrice` in `pickup.js`. Do **not** add Blind #29.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

sortloot. `augment_filter = mode & PETRIFY`; `mode &= ~PETRIFY` so cmp is not a petrify class. Keep when filter rejects iff CORPSE && `touch_petrifies`. **Match `:611–620`.** `0x20`. **Match `hack.h:1364`.** Pickup `,` always ORs PETRIFY. **Match `:775`/`:1084`.** Count-N path in C has no FEEL; JS count-N named (does not use this helper).

will_feel. `(Blind \|\| force_touch) && !uarmg && !Stone_resistance && CORPSE && touch_petrifies`. **Match `:4333–4340`.** invent `Blind()` is youprop H\|\|E && !B plus roleplay. Stone_resistance JS is sticky \|\| H \|\| E; C is H\|\|E (`youprop.h:65`). Dual-store, not a new clone.

feel. `corpse_xname(..., CXN_PFX_THE)`; poly-when-stoned You/bare hands else fatal pline; `instapetrify("touching "+killer_xname+" bare-handed")`. **Match `:4347–4360`.** `CXN_PFX_THE=4`. **Match.**

look_here. skip_objects: first will_feel CORPSE, Including/They're/It's + `CXN_ARTICLE` + unfortunately unless poly, feel, break. **Match `:4265–4276`.** Single: `feel` if CORPSE (helper re-checks will_feel). **Match `:4284–4285`.** Multi: `doname...` then break, feel after the window. **Match `:4300–4311`.** JS `felt_obj` is the C for-loop `otmp` after break. Engulfer `:4151` skipped. Named.

pickup menu. During ranked walk, FEEL CORPSE → `look_here(0, LOOKHERE_NOFLAGS)` return `[]` (no menu). **Match `:1111–1116`.** Query itself does not `feel_cockatrice`; look_here does. **Match.** `if (!allow(obj)) continue` after the feel check so a filter-rejected cockatrice still aborts. **Match C calling allow in sortloot then will_feel on the kept list.**

Callee closure (PETRIFY + feel). LIVE: `touch_petrifies`, `corpse_xname`, `killer_xname`, `instapetrify`, `poly_when_stoned`, `look_here`. CLONE verified: invent `Blind()`. OMIT named: eat/doloot/pray/engulfer. STUB: **none**. Combined-arm may ship.

## Hallucinations / overclaim

Subject filter keep + Blind look_here/pickup feel: **true on the `,` menu and floor look_here.** D-log “PETRIFY is not a sort class”: **true** (`mode &= ~`). Do **not** stamp “Match C eat.c feel.” Do **not** stamp “Match C doloot Blind !uarmg before containers.” Do **not** stamp “Match C pray `force_touch`.” Do **not** stamp “Match C engulfer stomach.” Public suite is rarely Blind on a cockatrice corpse.

## Density

One `sortloot` flag + the C feel helpers + the two C sites that use FEEL on the floor. +106 JS. Did not glue eat/doloot. §2b OK.

## Branch-by-branch confirm

1. Filter rejects food, PETRIFY, cockatrice CORPSE kept. **Match.**
2. PETRIFY stripped before cmp. **Match.**
3. Blind !gloves !stoneres CORPSE: will_feel. **Match.**
4. look_here skip/single/multi. **Match.**
5. `,` abort to look_here(0). **Match.**
6. eat / doloot / pray / swallow. **Named.**

## Callers / RNG ledger

Wired: `sortloot` callers that pass PETRIFY (pickup `,` only); look_here; feel. eat/pray/doloot unhit. No extra `rn2`. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Dynamic `instapetrify` is SAFE, not cycle-forced clone. Do not add `will_feel` in `pickup.js`. Do not treat PETRIFY as `sortloot_cmp` class.

## Verification

D-log private canary **23**/23; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for Blind cockatrice. A seeing-hero canary does not falsify will_feel. doloot unhit.

## Actionable C-wrongs

None for Must-fix. Named: eat.c `:3688`; doloot `:2223–2234`; pray `:1985` `force_touch`; engulfer `:4151`; count-N query without FEEL. Do not feel in `query_objlist` itself. Do not leave PETRIFY in `sortloot_cmp` mode.

Verdict: **ACCEPT-WITH-DEBT**
