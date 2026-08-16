# Review 47 — 89a97acc — `remove_worn_item` armor `*_off` / `unpunish` / `setnotworn` (D-1086)

## Metadata
- Full / short hash: `89a97acc2a24bf8bb2f612ef1eab0e8107246d53` / `89a97acc`
- Parent: `08ba0363` (loop-observer; no `js/`). JS-touching since last `reviews/loop-unattended/` file: D-1085, **this SHA**, D-1087, D-1088. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 15:32:53 +0200
- D-id: **D-1086**
- Stats: 13 files, +180 / −115 — `js/steal.js` +94 / −~40; `js/sit.js` −28 local clone + dynamic import; `js/do_wear.js` export `Armor_off` / `Shirt_off`.
- Claims to close: Open queue `steal.c` `remove_worn_item` armor `*_off` / `unpunish` / `setnotworn` (named from sit take_gold D-1049 / review **10**). Stamped **Addressed:** D-1086 `89a97acc` on the archive row (filled by D-1087). `reviews/loop-2026-08-15/` D-1034 risk 3 was gold unwear (D-1049); this is the leftover armor envelope.
- JS / map: `steal.js` `remove_worn_item`; `sit.js` `take_gold`; `c-js-map/data.md` sit row names D-1086. `Amulet_off` / `Ring_gone` / `Blindf_off` still setworn.
- Prior reviews this SHA claims to close: **10** named omit armor `*_off` / `setnotworn` / `unpunish`. Review **43** forbade pulling steal.c into the Flying Must-fix (D-1085 already shipped).

## Intent vs deliverable

Git subject promises: “Match C steal.c remove_worn_item so stolen armor runs *_off, leftover bits use setnotworn, and unchain calls unpunish.”

The queue line was those three C pieces. Not `Amulet_off`. Not `donning`/`cancel_don`. Not unifying `do_wear.js` / `steed.js` / `dokick.js` local clones.

The diff **does** the claimed envelope: delete sit’s gold-shaped clone; export steal.c `remove_worn_item(obj, unchain_ball)`; W_ARMOR dispatches imported `Armor_off` … `Shirt_off` in C order; leftover `owornmask` → `setnotworn`; `W_BALL|W_CHAIN` + unchain → `unpunish`; W_WEAPONS still `*gone`. `worn_item_removal` passes TRUE; steal leftover weapons FALSE; `take_gold` dynamic-imports and awaits FALSE.

It does **not** port `Amulet_off` / `Ring_gone` / `Blindf_off` (still `setworn`). Named. It does **not** set `in_use` or `skinback`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `remove_worn_item` | C body, **ported** to steal.js | `steal.c:213–290`; was sit clone + steal `setworn` clone |
| `Armor_off` / `Cloak_off` / `Boots_off` / `Gloves_off` / `Helmet_off` / `Shield_off` / `Shirt_off` | C callees, **imported** | `do_wear.js`; Armor/Shirt newly exported; bodies still partial |
| `uwepgone` / `uswapwepgone` / `uqwepgone` | C callees, **imported** | `wield.js` |
| `setnotworn` | C callee, **dynamic-imported** | `do.js:413`; pointer-walk (D-1020) |
| `unpunish` | C callee, **dynamic-imported** | `read.js:766` |
| `setworn(null, W_AMUL/RING/TOOL)` | **clone** of accessory `*_off` | named omit of `Amulet_off` / `Ring_gone` / `Blindf_off` |
| sit `take_gold` | C caller, **retouched** | `sit.c:23`; dynamic import (hack→eat cycle) |
| do_wear.js / steed.js / dokick.js `remove_worn_item*` | **other clones** | not this SHA |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. Zero RNG in the helper (callees may burn; fedora luck / DSM are not RNG).

## Constitution / playbook

Grep of the `js/steal.js` / `js/sit.js` / `js/do_wear.js` hunks: no trace-index gates, no recorded coordinates, no `fastforward` burns. Dynamic `import('./steal.js')` / `import('./read.js')` / `import('./do.js')` are ESM, not Node `fs`. Contest Rule #2: no Node builtins.

## C ↔ JS fidelity

### Dispatch order — `steal.c:219–285`

C:

```
    if (donning(obj)) cancel_don();
    if (!obj->owornmask) return;
    oldinuse = obj->in_use; obj->in_use = 1;
    if (obj->owornmask & W_ARMOR) {
        if (obj == uskin) { impossible; skinback(TRUE); }
        if (obj == uarm) Armor_off();
        else if (obj == uarmc) Cloak_off();
        else if (obj == uarmf) Boots_off();
        else if (obj == uarmg) Gloves_off();
        else if (obj == uarmh) Helmet_off();
        else if (obj == uarms) Shield_off();
        else if (obj == uarmu) Shirt_off();
        else setworn(NULL, obj->owornmask & W_ARMOR);
    } else if (W_AMUL) Amulet_off();
    else if (W_RING) Ring_gone(obj);
    else if (W_TOOL) Blindf_off(obj);
    else if (W_WEAPONS) { uwepgone / uswapwepgone / uqwepgone }
    if (owornmask & (W_BALL|W_CHAIN)) { if (unchain_ball) unpunish(); }
    else if (obj->owornmask) setnotworn(obj);
    obj->in_use = oldinuse;
```

JS `steal.js:133–179`: skip donning / `in_use`; keep `!owornmask` return; W_ARMOR slot order matches (`uarm` / `uarmc` / `uarmf` / `uarmg` / `uarmh` / `uarms` / `uarmu` / else `setworn`); uskin `if` is empty (named); accessory arms are `setworn`; weapons `*gone`; then ball/chain vs leftover `setnotworn`. Await only the async `*_off` (Armor / Cloak / Boots). Match for the claimed armor / leftover / unpunish envelope.

### Armor callees — real, partial

C `Armor_off` (`do_wear.c:909–930`): takeoff.mask, `setworn(NULL, W_ARM)`, cancelled_don, arti_light `end_burn`, `dragon_armor_handling(otmp, FALSE, TRUE)`.

JS `Armor_off` (`do_wear.js:552–558`): `clear_worn(W_ARM)` (= `setworn(null, W_ARM)`) then `dragon_armor_handling`. Missing takeoff.mask / cancelled_don / arti_light — **pre-existing on the callee**, named on do_wear. Dispatching to it is still more C than the old steal `setworn(null, W_ARM)` (DSM extrinsics now run). `Helmet_off` fedora luck (`do_wear.js:561–568`) is the live Archeologist path the D-log canary used. `Gloves_off` / `Shield_off` / `Shirt_off` are `clear_worn` only — equivalent to old setworn for confer, thinner than C `Gloves_off` FUMBLE/power. Named on those bodies, not a new diverging clone of the **dispatch**.

`setworn(null, bit)` `clearOne` clears `owornmask` (`do_wear.js:415–421`). After a successful `*_off`, leftover `else if (obj.owornmask)` is skipped like C. Stale pointer (slot no longer points at obj) is the leftover `setnotworn` pointer-walk — C catchall. Match.

C `setnotworn` (`worn.c`) walks `worn[]` by **pointer**, not by `owornmask` bits (D-1020). JS `do.js:413–443` walks `WORN_SLOTS`; clears only slots that currently point at `obj`; leaves leftover bits when the object is not in the slot (tutorial restore). That is the catchall C uses when `*_off` / `*gone` left a bit. The old sit clone did `obj.owornmask = 0` without clearing `u.uquiver`. Gold quiver is why review **10** existed; armor leftover is why this SHA exists.

Steal delay-armor (`steal.c:552`): `remove_worn_item(otmp, TRUE)` after `nomul(-armordelay)`. JS `steal.js:331` same TRUE. Not a second helper.

### `unpunish` / callers

C `worn_item_removal` → `remove_worn_item(obj, TRUE)` (`steal.c:333`). Steal ball/chain: `worn_item_removal` then, if still `W_WEAPONS`, `remove_worn_item(otmp, FALSE)` (`steal.c:575–583`). JS `steal.js:121` TRUE; `348` FALSE. `take_gold` FALSE (`sit.c:23`). Match.

C `unpunish` destroys the chain and clears the ball slot. JS `read.js:766–772` does that. Named omit: delobj newsym polish. Not the queue line.

### `take_gold` — review **10** clone retired

C `sit.c:14–33`: for each `COIN_CLASS`, `remove_worn_item(otmp, FALSE)` then `delobj`. JS now awaits the steal.c export then splice+`delobj` (extract still omits `OBJ_INVENT` — D-0924). Gold hits W_WEAPONS `*gone`. Armor `*_off` is dead for `COIN_CLASS`; the point of the import is one C function, not a fourth clone. Review **10** asked for that dynamic import. Shipped.

## Hallucinations / overclaim

“Match C steal.c remove_worn_item so stolen armor runs *_off …” is **true for W_ARMOR dispatch, leftover `setnotworn`, and unchain `unpunish`.** It is **not** true that accessory arms are C `Amulet_off` / `Ring_gone` / `Blindf_off`. Those are still `setworn` stand-ins. The subject and the map name them. This is **not** “Match C dispatch, callee is a stub” for **armor** — `Helmet_off` / `Armor_off` are the real (partial) functions. It **is** “Match C dispatch, callee is setworn” for amulet/ring/blindfold. Named omit, not a silent stub claim.

Stamping **Addressed:** D-1086 `89a97acc` is fair for the Open line. It is **not** fair to retire `Amulet_off`. Hash is on the archive row (filled by `d5038ac7`).

## Density (§2b)

One Open cluster: C `steal.c:213–290` armor / leftover / unpunish, plus the sit caller that owned a clone. ~80 executable lines in steal + sit import. Two modules that already had to share this function. Not “finish do_wear.c `*_off`.” Not unifying every other-file clone. Right size. Accessory `*_off` left named on purpose.

## Verification

Journal: private canary **24**/24 (fedora luck; DSM `EDrain_resistance`; cloak/boots/gloves/shield/shirt; stale quiver pointer-walk; live quiver/`unweapon` `*gone`; unpunish TRUE vs FALSE; take_gold quiver splice); green+strict seed8000/0900; sit cohort **4**/4 + 1500/1800/0017/0360/2200 **9**/9 + sit strict. Path **public-unhit** for armor theft. Cadence **#1385** **44**/44.

C read of `steal.c:213–290`/`333`/`570–583`, `sit.c:14–33`, `do_wear.c:909–930`, `worn.c` `setnotworn`, `read.c` `unpunish`; JS `steal.js:133–179`/`328–349`, `sit.js:246–255`, `do_wear.js:552–638`, `do.js:413–443`. Hunk grepped FORCE/fs/seed.

Private canary vs C (journal):

| Path | C | JS after D-1086 |
|------|---|-----------------|
| fedora `Helmet_off` | Archeologist luck −1 | **luck** |
| gray/yellow DSM `Armor_off` | `dragon_armor_handling` | **DSM** |
| leftover quiver pointer | `setnotworn` walk | **walk** |
| unchain TRUE | `unpunish` | **unpunish** |
| take_gold FALSE | no unpunish; `*gone` | **same** |

## Actionable C-wrongs

None that Must-fix this next iter. The claimed armor / leftover / unpunish envelope matches `steal.c`.

Named omits / do-nots (map / Open, not Must-fix):

1. `Amulet_off` / `Ring_gone` / `Blindf_off` still `setworn` (flying-amulet descent / ring attrib / blindfold vision). Do not pull into `is_pool`.
2. `donning`/`cancel_don`; `in_use` (yellow DSM `emergency_disrobe`); uskin `skinback`.
3. Other-file clones (`do_wear.js:528`, `steed.js`, `dokick.js` `remove_worn_item_ship`) still weapon-thin.
4. `*_off` internal named omits (mummy wrapping, SPEED boots, helm telepathy, arti_light).

Do not restore sit’s gold-shaped clone. Do not `owornmask=0` instead of `setnotworn`. Do not `setuwep(null)` instead of `*gone`. Do not skip `unpunish` when `unchain_ball` is TRUE.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- Score: **8 / 10**
- One sentence: steal.c `remove_worn_item` now dispatches real armor `*_off`, leftover `setnotworn`, and `unpunish`, and sit `take_gold` calls that function; accessory arms remain `setworn` stand-ins named on the map.
- Must-fix stays empty for this SHA; next Must-fix from this bundle is sit `Antimagic` uprops (review **48**), not another steal peel.
