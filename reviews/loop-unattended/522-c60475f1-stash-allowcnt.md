# Review 522 — c60475f1 — pickup.c stash getobj ALLOWCNT (D-1561)

## Metadata
- Full / short hash: `c60475f1d47c8cebddaa5f0ea890ad3b5eb946a1` / `c60475f1`
- Parent: `67d0c50c` (D-1560). This file audits **this SHA only** (fourth of nine `js/` commits since review **518**). Archive **Addressed:** D-1561 `c60475f1`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 05:01:29 +0200
- D-id: **D-1561**
- Stats: `js/pickup.js` +230 / −23, `js/wield.js` +14 / −0. Band 150–350 (js/ insertions **244**).
- Claims to close: Open stash ALLOWCNT after D-1559/D-1560. Not CMDQ_INT. Not `'r'` reversed. `reviews/loop-2026-08-15/` has no unpaid stash Must-fix.
- JS / map: `pickup.js` `stash_ok` / `ck_bag` / `getobj_stash` / `in_container`; `wield.js` `weldmsg`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **520** / **521** named stash.

## Intent vs deliverable

Git subject promises: container `'s'` splits a counted item via `stash_ok` and unsplits on `in_container` refuse instead of ignoring the stash menu choice.

Pinned C `pickup.c` `use_container` stash_one `:3174–3185`. `stash_ok` `:2956–2969` (static; `csym --callers` only proto `:39` — the call is a function pointer at `:3176`). `ck_bag` `:2719–2723`. `in_container` `:2557–2712`. `weldmsg` `wield.c:1060–1074`. `unsplitobj` on refuse `:3183`. Menu `'s'` `in_or_out_menu` / `stash_one = (c == 's')` `:3134`.

```3174:3185:nethack-c/upstream/src/pickup.c
    } else if (stash_one) {
        /* put one item into container */
        if ((otmp = getobj("stash", stash_ok,
                           GETOBJ_PROMPT | GETOBJ_ALLOWCNT)) != 0) {
            if (in_container(otmp)) {
                used = 1;
            } else {
                (void) unsplitobj(otmp);
            }
        }
    }
```

```2956:2969:nethack-c/upstream/src/pickup.c
stash_ok(struct obj *obj)
{
    if (!obj)
        return GETOBJ_EXCLUDE;
    if (!ck_bag(obj))
        return GETOBJ_EXCLUDE_SELECTABLE;
    return GETOBJ_SUGGEST;
}
```

Old JS: `'s'` fell through; `in_container` rejected all `owornmask` and skipped C early-outs.

The diff **does** port `stash_ok`/`ck_bag`, `getobj_stash` ALLOWCNT (canned INT/KEY + pickinv `&ctmp`), C `in_container` refusals + uwep/`weldmsg`/unwield, refuse → `unsplitobj`, and export `weldmsg`. It **does not** port `'r'` reversed, `traditional_loot`, `snuff_lit`, shop `sellobj`, icebox age, mbag explosion. Named. **No RNG** except pre-existing pickup `rn2` unused here. `losehp(d(6,6))` is inside named mbag.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `stash_ok` | C `:2956–2969` static, **CLONE local this SHA** | C home pickup.c |
| `ck_bag` | C `:2719–2723`, **LIVE this SHA** | export |
| `getobj_stash` | C getobj `"stash"`, **LIVE this SHA** | ALLOWCNT clone |
| `in_container` early-outs | C `:2564–2622`, **LIVE this SHA** | was blanket `owornmask` |
| `weldmsg` | C `:1060–1074`, **LIVE this SHA** | wield.js export |
| `setuwep` / swap / quiver | C `:2594–2609`, **LIVE** | |
| `fatal_corpse_mistake` | C, **LIVE** | local pickup |
| `freeinv` | C, **LIVE** | invent export D-1560 |
| `unsplitobj` on refuse | C `:3183`, **LIVE this SHA** | |
| `snuff_lit` / `sellobj` / icebox / mbag | C `:2626–2694`, **OMIT named** | |
| `'r'` reversed / `traditional_loot` | C, **OMIT named** | |

`node scripts/csym.mjs stash_ok` → `pickup.c:2956-2969`. `--callers stash_ok`: proto only (pointer at `:3176`). `csym.mjs ck_bag` → `:2719-2723`. `--callers`: stash_ok `:2963`. `csym.mjs weldmsg` → `wield.c:1060-1074`. `--callers` include pickup `in_container` `:2596`. No `rn2`/`rnd` in stash_ok / ck_bag / weldmsg / the refuse chain.

`node scripts/sym.mjs` on new / exported names:

```
stash_ok         NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/pickup.js:1499
             => Do NOT write clone #2.
ck_bag           js/pickup.js:1490   sync
in_container     NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/pickup.js:1602
getobj_stash     NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/pickup.js:1535
weldmsg          js/wield.js:179   ASYNC — await required
unsplitobj       js/mkobj.js:418   sync
freeinv          js/invent.js:3671   sync
             !! ALSO 3 LOCAL CLONE(S) … dothrow.js steal.js steed.js
fatal_corpse_mistake NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/pickup.js:434
```

C `stash_ok` / `in_container` are static in pickup.c — locals are the C home. Do **not** add clone #2. Do **not** add `freeinv` #4. `node scripts/imports.mjs --can` pickup → wield `weldmsg`, invent `freeinv`, mkobj `unsplitobj`: ALREADY (weldmsg is a new import on an existing edge). No new TDZ.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates in this SHA’s `js/` (pickup `FORCE` is the named UNTRAP comment). `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`ck_bag`. `current_container && obj !== container` → 1/0. **Match `:2721–2722`.** JS `game._current_container`.

`stash_ok`. null → EXCLUDE (no `-`). `!ck_bag` → EXCLUDE_SELECTABLE (bag not in prompt; typed letter still returns it). Else SUGGEST. **Match `:2958–2968`.**

`getobj_stash`. ALLOWCNT + canned + pickinv `&ctmp`. GETOBJ_PROMPT: empty SUGGEST (only the bag) still `[*]`. Gold `$`. `stash_ok === EXCLUDE` → silly_thing; EXCLUDE_SELECTABLE does **not** silly — bag letter reaches `in_container` topology refuse. **Match getobj + `:2570–2572`.** Hands not passed to `getobj_from_cmdq`. **Match.**

`use_container`. `stash_one = (c === 's')`. `!inokay` stash/put-in empty pline. `loot_in` menu vs `else if (stash_one)` getobj. Success `used=1`; else `unsplitobj`. **Match `:3157–3185`.** `'r'` / traditional still named. `inokay` recomputed after take-out. **Match C after loot_out.**

`in_container` order: no container; uball/uchain kidding; self topology; `W_ARMOR|W_ACCESSORY` Norep refrigerate/stash (not all `owornmask` — W_WEP proceeds); cursed loadstone; quest four; leash+`leashmon`; uwep welded `weldmsg` else `setuwep(0)` and abort if `uwep` still set; uswap; quiver; `fatal_corpse_mistake`; ICE_BOX/`Is_box`/BOULDER/big statue. **Match `:2564–2622`.** Then `freeinv`; skip snuff/sell/ice/mbag (**named**); put `doname` into `the(xname(cont))`; `add_to_container`; `bot`; return container?1:-1. **Match the put arm minus named callees.**

`weldmsg`. `body_part_latebound(HAND)` (contest latebound, not wield→polyself); bimanual plural; zero `owornmask`; `Yobjnam2(obj,'are')`; restore mask. **Match `:1060–1074`.** Local `Yobjnam2` in wield.js. `dowield` still uses the old hardcoded weld pline (not this SHA).

Callee closure (`'s'` stash arm). LIVE: `stash_ok`, `ck_bag`, `getobj_*`, `in_container` refusals, `weldmsg`, `setuwep`/`setuswapwep`/`setuqwep`, `fatal_corpse_mistake`, `freeinv`, `unsplitobj`, `add_to_container`, `Is_box`, `bigmonst`. OMIT named: snuff, sellobj, icebox, mbag, `'r'`, traditional. STUB: **none**. Arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject `'s'` + `stash_ok` + unsplit on refuse: **true**. D-log “do not rewrite `confer_oc_oprop`”: N/A. Do **not** stamp “Match C `'r'` reversed.” Do **not** stamp “Match C `mbag_explodes` / `snuff_lit` / `sellobj`.” Do **not** stamp “Match C `traditional_loot`.” Do **not** stamp “Match C `dowield` `weldmsg`” (pickup is the new caller). This is **not** “dispatch ported, callee stubbed.”

## Density

One C stash_one envelope: callback + getobj + in_container refusals + unsplit. +244 JS. Did not glue `'r'`. §2b OK.

## Branch-by-branch confirm

1. `'s'` + letter: getobj + `in_container` + used. **Match.**
2. `'s'` + `3a` ALLOWCNT: split then stash or unsplit on refuse. **Match.**
3. Type the bag’s letter: EXCLUDE_SELECTABLE, topology refuse, unsplit. **Match.**
4. Worn armor: Norep, no freeinv. **Match.** Wielded unwelded: `setuwep(0)` then put. **Match.**
5. Welded uwep: `weldmsg`, 0, unsplit. **Match.**
6. Cursed loadstone / Yendor / leash: refuse. **Match.**
7. Box/boulder/big statue: cannot fit. **Match.**
8. Wand into BoH: C may explode; JS puts. **Named.**
9. `'r'`: still not reversed. **Named.**

## Callers / RNG ledger

C: `use_container` when `in_or_out_menu` returns `'s'` (lootabc `'e'` maps to stash). Public-unhit for counted stash. No seed gate. **No core RNG** on this path (mbag `d(6,6)` named).

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. `body_part_latebound` is the Keep’d import split, not a cycle dodge.

## Verification

D-log canary **26**/26 (C stash_ok/getobj/unsplit; ck_bag ranks; canned INT+KEY split; `'s'`+`3a` stash split; self/worn/Yendor/loadstone refuse; uwep unwield+put); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** Admit it.

## Actionable C-wrongs

None for Must-fix. Named: `'r'` reversed put-in then take-out; `traditional_loot`; `snuff_lit`; shop `sellobj`; icebox age/timers; mbag explosion; more_containers `'n'`. Do not add `stash_ok` / `in_container` clone #2. Do not glue `'r'` to this arm.

Verdict: **ACCEPT-WITH-DEBT**
