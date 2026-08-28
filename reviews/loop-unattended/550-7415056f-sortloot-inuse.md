# Review 550 — 7415056f — invent.c sortloot SORTLOOT_INUSE (D-1589)

## Metadata
- Full / short hash: `7415056f5f6860087ee05b7d50e7712496f421e6` / `7415056f`
- Parent: `a3325fe0` (D-1588). This file audits **this SHA only** (fifth of nine `js/` commits since review **545**). Archive **Addressed:** D-1589 `7415056f`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 19:41:38 +0200
- D-id: **D-1589**
- Stats: `js/invent.js` +323/−112, `js/iactions.js` +36/−11, `js/cmd.js` +10/−2. Band **200–450** (js/ insertions **369**).
- Claims to close: Open sortloot inuse_only after D-1580/D-1588. Not wizid. Not `display_used_invlets`. `reviews/loop-2026-08-15/` has no unpaid inuse Must-fix.
- JS / map: `invent.js` `inuse_classify`/`is_inuse`/`sortloot`/`doprinuse`; `iactions.js` `dispinv_with_action`; `cmd.js` `*`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **541** / **542** named sortloot inuse_only.

## Intent vs deliverable

Git subject promises: `display_pickinv` inuse_only filters `is_inuse` and orders by `inuse_classify` instead of pack-class headers.

Pinned C `invent.c` `inuse_classify` `:70–144`. `sortloot_cmp` `:413–428` (bigger `inuse` first, then `tiebreak` indx). `sortloot` `:592–643` `filterfunc`. `is_inuse` `:2164–2170`. `is_worn` `:2155–2161`. `tool_being_used` `:4697–4711`. `display_pickinv` `:3186–3317`. `dispinv_with_action` `:2961–3002`. `doprinuse` `:4738–4757`. `inuse_headers` `:62–65`. `SORTLOOT_INUSE` `hack.h:1363` `0x08`. `ULEFTY`/`URIGHTY` `you.h:564–565`. `--callers tool_being_used`: `is_inuse` `:2169`; `doprtool` `:4722`. `cmd.c:1848` `*` `doprinuse` `CMD_M_PREFIX`.

```413:427:nethack-c/upstream/src/invent.c
    if ((gs.sortlootmode & SORTLOOT_INUSE) != 0) {
        if (!sli1->orderclass)
            inuse_classify(sli1, obj1);
        if (!sli2->orderclass)
            inuse_classify(sli2, obj2);
        val1 = sli1->inuse;
        val2 = sli2->inuse;
        if (val1 != val2)
            return val2 - val1;
        goto tiebreak;
    }
```

Old JS: PACK/INVLET/LOOT `sortloot`; `)`/`[`/`=`/`"`/`(` sequential `prinv`; no `*`.

The diff **does** live INUSE classify+cmp+filter, fake `HANDS_SYM` `W_WEP`, inuse headers, `dispinv_with_action` `'i'`, `dopr*`/`doprinuse`, rhack `*` + `CMD_M_PREFIX` keep. It **does not** port `SORTLOOT_PETRIFY`, perm_invent `InvInUse`, `#seeall` EXT_CMDS, wizid PICK_ANY, `display_used_invlets`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `inuse_classify` | C `:70–144`, **LIVE this SHA** | 1 local; not clone #2 |
| `sortloot` INUSE arm | C `:413–428` / `:592–643`, **LIVE** | filterfunc + `mode&=~PETRIFY` named |
| `is_inuse` / `is_worn` | C `:2155–2170`, **LIVE** | `carried` ≡ `OBJ_INVENT` |
| `tool_being_used` | C `:4697–4711`, **LIVE** | 1 local |
| `pickinv_build_inuse` | C `:3186–3317`, **LIVE** | fake hands + headers |
| `dispinv_with_action` | C `:2961–3002`, **LIVE this SHA** | was stub `_use_inuse` |
| `doprinuse` | C `:4738–4757`, **LIVE this SHA** | |
| `doprtool` / `dopramulet` | C, **LIVE** | letters + `'i'` |
| rhack `*` | C `:1848`, **LIVE** | `#seeall` EXT named |
| `inuse_headers` | C `:62–65`, **LIVE** | `[4]` alt_label |
| `SORTLOOT_PETRIFY` | C `:611–620`, **OMIT named** | |
| perm_invent `InvInUse` | C `:3112`, **OMIT named** | |
| wizid / `display_used_invlets` | **OMIT named** | later D-1590/D-1591 |

`node scripts/csym.mjs inuse_classify` → `:68-144`. `sortloot` → `:592-643` (live `#if 0` twin `:653` unused). `is_inuse` → `:2164-2170`. `doprinuse` → `:4738-4757`. `dispinv_with_action` → `:2961-3002`. `is_worn` → `:2155-2161`.

RNG: `obj_glyph` still burns Hallu on listed items (pre-existing pickinv). INUSE sort itself **no RNG**. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
inuse_classify   NOT EXPORTED — 1 LOCAL js/invent.js:383
is_inuse         js/invent.js:372   sync
is_worn          js/invent.js:349   sync
tool_being_used  NOT EXPORTED — 1 LOCAL js/invent.js:359
sortloot         js/invent.js:452   sync
doprinuse        js/invent.js:3869   ASYNC — await required
dispinv_with_action js/iactions.js:579   ASYNC — await required
inuse_headers_accessories js/invent.js:192   sync
pickinv_build_inuse NOT EXPORTED — 1 LOCAL js/invent.js:1298
SORTLOOT_INUSE   js/const.js:1720   sync   export const
```

`--can cmd.js invent.js doprinuse`: ALREADY. `--can iactions.js invent.js inuse_headers_accessories`: ALREADY. Do **not** add `inuse_classify` #2. Do **not** add `doprinuse` in `cmd.js`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`inuse_classify`. `w_mask = owornmask & (W_ACCESSORY|W_WEAPONS|W_ARMOR)`. **Match `:72`.** `USE_RATING` increments then jumps on hit. JS `useRating` + `||` short-circuit is the same goto (later tests not evaluated; `altclass++` only in the failing else). Ratings 1 leash … 16 amulet. D-log unit amulet 16 / wep 12 / quiver 10 / suit 9. **Match the 16 tests.** Unmatched: `inuse=0`, `orderclass=-1`. **Match `:132–133`.** subclass/disco 0. **Match.** Rings: `ULEFTY` off=RIGHT else LEFT; main = the other (`URIGHTY`). JS `uhandedness === LEFT_HANDED`. **Match `you.h:564–565`.** Lit lamp / leash only when `!w_mask` (wielded tool uses weapon rating). **Match `:102–106`.**

`sortloot_cmp` INUSE. Classify iff `!orderclass` (0 only; `-1` is truthy so not re-run). Bigger inuse first. Equal → indx tiebreak **only** (C `goto tiebreak`, skips LOOT/BUCX). **Match `:413–428` / `:542–546`.** `SORTLOOT_INUSE=0x08`. **Match.** Filter skips non-`is_inuse`. **Match `:616–622` without PETRIFY augment (named).**

`is_inuse`. `carried && (is_worn || tool_being_used)`. JS `where===OBJ_INVENT`. **Match.** `is_worn` W_ARMOR|ACCESSORY|SADDLE|WEAPONS. **Match.** `tool_being_used` W_TOOL|SADDLE, else TOOL + (uwep|lamplit|leashmon). **Match `:4704–4710`.**

Fake hands. `!uwep`: `HANDS_SYM`, `W_WEP`, `OBJ_INVENT`, prepend, sort, unlink; if only fake, drop for empty. **Match `:3190–3217`.** Format `gloved|bare` + `makeplural(body_part(HAND))` + `(no weapon)`. **Match `:3308–3317`.** JS does not mutate `game.invent` (array view). **Net-same.**

Headers. `"Inventory in use"` once then `inuse_headers[orderclass]` on class change. **Match `:3276–3298`.** Table `"" / Miscellaneous / Worn Armor / Wielded/Readied Weapons / Accessories`. **Match `:62–65`.** `[4]` swapped to `"Amulet"` for `dopramulet`. **Match `dispinv` alt_label.** `orderclass===-1`: JS `if (hdr)` skips (`[-1]` undefined); C is UB. Filtered `is_inuse` almost never lands there (saddle-only is the odd worn-not-in-w_mask case). Not Must-fix; perm/saddle named.

`dispinv_with_action`. Save/restore sortloot + accessories[4]; `'i'`; `force_invmenu=false`; `menumode = (len!=1 || menu_requested)`; `display_inventory` → JS `display_pickinv_reply(..., {want_reply: menumode})`; letter → `itemactions`. **Match `:2973–3001`.**

`doprinuse`. First `is_inuse` else You not wearing; else `dispinv(NULL, TRUE, NULL)`. **Match `:4747–4755`.** rhack `*` GENERALCMD. **Match `cmd.c:1848`.** `CMD_M_PREFIX` keep for `)`/`[`/`=`/`"`/`(`/`*`. **Match those C flags.** `#seeall` extcmd table still named.

Callee closure (`*` / `)` inuse menus). LIVE: `is_inuse`, `inuse_classify`, `sortloot` INUSE, `pickinv_build_inuse`, `dispinv_with_action`, `doprinuse`, `inuse_headers`, `is_worn`, `tool_being_used`, `body_part_latebound`, `itemactions`. OMIT named: PETRIFY, perm InvInUse, `#seeall` EXT, wizid, used-invlets. STUB: **none** on the `'i'` arm. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject inuse_only filters `is_inuse` and orders by `inuse_classify` not pack headers: **true when `flags.sortloot==='i'`.** D-log `dispinv` + `*` + m-prefix: **true.** Do **not** stamp “Match C perm_invent `InvInUse` two-column tty.” Do **not** stamp “Match C `#seeall` EXT_CMDS.” Do **not** stamp “Match C `SORTLOOT_PETRIFY`.” Do **not** stamp “Match C wizid PICK_ANY” (still `wizid=false` in `display_pickinv_reply`). Do **not** stamp “Match C `display_used_invlets`.” INUSE cmp is **not** a stub: it is the C rating order.

## Density

One invent.c in-use envelope: classify + sort + pickinv + the `)`/`*`/`(`/`"` callers that set `'i'`. +369 JS (large band). Did not glue wizid / used-invlets. §2b OK (not “finish potions”).

## Branch-by-branch confirm

1. Amulet worn: inuse 16, header Accessories (or Amulet alt). **Match.**
2. Primary weapon: 12, Weapons; fake `-` same slot when `!uwep`. **Match.**
3. Quiver 10 / suit 9 / lit lamp 2 / leash 1. **Match.**
4. Unworn junk: filtered out. **Match.**
5. Equal inuse: original indx. **Match tiebreak.**
6. `*` empty: You not wearing. **Match.**
7. `*` with gear: Inventory in use + class headers, not DEF_INV_ORDER. **Match.**
8. perm InvInUse / PETRIFY / `#seeall` / wizid. **Named.**

## Callers / RNG ledger

C `*` / `#seeall` / m-prefix `)`[`=`"` `(`. JS rhack keys + m-prefix; extcmd name named. Extra Hallu `obj_glyph` on listed in-use items is C pickinv. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. `inuse_classify` stays next to `sortloot` (C home). Do not add `inuse_classify` in `iactions.js`. Do not import `wield.js` for `body_part` (latebound). Do not treat `*` as Unknown.

## Verification

D-log inuse sort **unit** (16/12/10/9 + junk filtered); green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** unless a public session types `*` / `m)` with worn gear. Pack `i` inventory is not the tourist starter path. Unit does not cover saddle-only `orderclass=-1` or perm_invent.

## Combined-arm callee closure (`*` / `)` / `'i'` pickinv)

LIVE imported bodies: `is_inuse`, `is_worn`, `tool_being_used`, `inuse_classify`, `sortloot` INUSE cmp+filter, `pickinv_build_inuse`, `inuse_headers` + `inuse_headers_accessories`, `dispinv_with_action`, `doprinuse`/`doprtool`/`dopramulet`, `display_pickinv_reply`, `itemactions`, `body_part_latebound`, `makeplural`, `obj_glyph`. CLONE verified: fake `HANDS_SYM` object (C stack `handsobj`, not a second `is_inuse`). OMIT named in this commit: `SORTLOOT_PETRIFY` augment at `sortloot` `:611–620`; perm_invent `InvInUse` two-column tty `:3112`; `#seeall` EXT_CMDS (rhack `*` is the GENERALCMD twin). STUB: **none** on the inuse_only arm. Combined-arm may ship.

C `USE_RATING` is a comma-goto: bump `inuse`, then `goto assign_order`. JS `useRating(...) || useRating(...)` stops at the first true test, so later predicates are not run and `altclass` only advances in the failing else — **the same skip**. Do not “fix” that into a full if-chain that would re-rate a lit wielded lamp as a lamp.

## Parent vs this SHA (what the hunks actually change)

Parent `sortloot` had PACK / INVLET / LOOT only. `dispinv_with_action` still took `_use_inuse` and ignored it. rhack `*` was not `doprinuse`. This SHA adds `SORTLOOT_INUSE` into cmp **before** pack-class, filters with `is_inuse`, builds fake hands + inuse headers, and wires `)`/`[`/`=`/`"`/`(`/`*` plus `'i'` inventory. It does **not** touch wizid PICK_ANY or `#adjust` `?`. Those are later SHAs.

## Actionable C-wrongs

None for Must-fix. Named: `SORTLOOT_PETRIFY` (`:611–620`); perm_invent `InvInUse` (`:3112`); `#seeall` EXT_CMDS; wizid unid_cnt>0 (D-1590); `display_used_invlets` (D-1591); loot_classify subclass/disco; uskin noarmor; saddle-only header skip. Do not add `inuse_classify` #2. Do not restore pack-class headers on the `'i'` arm.

Verdict: **ACCEPT-WITH-DEBT**
