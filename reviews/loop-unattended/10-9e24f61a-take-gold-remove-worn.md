# Review 10 — 9e24f61a — take_gold remove_worn_item (D-1049)

## Metadata
- Full / short hash: `9e24f61ac17c3f808947f4b97daf519035816e46` / `9e24f61a`
- Parent: `e395bb74` (D-1048)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 00:07:06 +0200
- D-id: **D-1049**
- Stats: 11 files, +127 / −48 — `js/sit.js` +45 / −8
- Claims to close: D-1034 **risk 3** (`take_gold` spliced invent + `delobj` with no unwear). Stamped **Addressed:** D-1049 on that review **without** the short hash (chicken-egg). This review commit fills `9e24f61a`.
- JS / map: `sit.js` only; `c-js-map/data.md` sit row; cadence **#1320** **44**/44 (this review iter)

## Intent vs deliverable

Git subject promises: “Match C take_gold remove_worn_item so quivered gold is unworn before delobj.”

D-1034 risk 3: C `sit.c:14–33` walks invent, and for each `COIN_CLASS` calls `remove_worn_item(otmp, FALSE)` then `delobj`. JS spliced `game.invent[]` then `delobj`. Gold is a legal quiver/wield/swapwep object (`pickup.c:2379–2381` “gold might be quivered”; `shk.c:172–173` `remove_worn_item(ygold, FALSE) /* quiver */`). Leaving `u.uquiver` / `uwep` / `uswapwep` pointing at a `delobj`’d coin is C-wrong.

The diff **does** call a local `remove_worn_item(otmp, false)` before the existing splice+`delobj`, and implements the C `W_WEAPONS` arm with imported `uwepgone` / `uswapwepgone` / `uqwepgone`.

It does **not** port `donning`/`cancel_don`, `in_use`, armor `*_off`, `Amulet_off` / `Ring_gone` / `Blindf_off`, `unpunish`, or `setnotworn`’s `worn[]` pointer walk. D-log and the helper comment name those. COIN_CLASS never occupies those slots. The subject does not claim a full `steal.c` port.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `take_gold` | C function, retouched | `sit.c:14–33`; unwear then delete; also `spell.c:149` cursed-book case 3 |
| `remove_worn_item` (sit.js) | **clone** of `steal.c:213–290` | gold-shaped; not an import of steal.js |
| `uwepgone` / `uswapwepgone` / `uqwepgone` | imported C callees | `wield.js` → C `wield.c:873–902` |
| `setuwep` / `setuqwep` | callees of `*gone` | clear slot pointer + `owornmask` bit |
| steal.js `remove_worn_item_steal` | **other clone** | uses `setu*wep` not `*gone`; not this SHA |
| do_wear.js `remove_worn_item` | **other clone** | weapon bits only; not this SHA |
| invent splice + `delobj` | pre-existing | `obj_extract_self` still omits `OBJ_INVENT` (D-0924) |
| armor `*_off` / `unpunish` / `setnotworn` | named no-op / omit | dead for COIN; comment cites steal.c |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates in the JS hunk. Rule #2 clean. Frozen contracts untouched.

## C ↔ JS fidelity

### `take_gold` — call order, no RNG in the helper

C `sit.c:14–33`:

```
for (otmp = gi.invent; otmp; otmp = nobj) {
    nobj = otmp->nobj;
    if (otmp->oclass == COIN_CLASS) {
        lost_money = 1;
        remove_worn_item(otmp, FALSE);
        delobj(otmp);
    }
}
```

JS `sit.js:179–198`: snapshot `[...invent]`, skip non-coins, `remove_worn_item(otmp, false)`, `invent.splice`, `delobj(otmp)`. Messages (`You_feel` strange sensation / `You notice you have no gold!`) and `disp.botl` unchanged.

C `delobj` → `obj_extract_self` pulls `OBJ_INVENT`. JS `delobj` (`mkobj.js:2157`) still does not splice invent, so the explicit splice **must** stay. That is older extract debt, not a new lie about unwear. Snapshot-then-splice matches C’s `nobj = otmp->nobj` before delete. **No RNG in `take_gold` itself** (`delobj` still burns `rn2(100)` for `obj_resists(0,0)` like C; pre-existing).

`spell.c:149` `take_gold()` (cursed book case 3) now unworn too, because it imports the same function. C uses one `take_gold`. Match.

### Clone vs C `remove_worn_item`

C `steal.c:213–290` order:

1. `if (donning(obj)) cancel_don();`
2. `if (!obj->owornmask) return;`
3. `oldinuse = obj->in_use; obj->in_use = 1;`
4. `if (W_ARMOR)` `Armor_off` / `Cloak_off` / … else `W_AMUL` `Amulet_off` else `W_RING` `Ring_gone` else `W_TOOL` `Blindf_off` else `W_WEAPONS` `uwepgone` / `uswapwepgone` / `uqwepgone`
5. `if (W_BALL|W_CHAIN) { if (unchain_ball) unpunish(); } else if (obj->owornmask) setnotworn(obj);`
6. restore `in_use`

JS `sit.js:152–172`: skip 1 and 3; keep 2; **only** the `W_WEAPONS` arm of 4; 5 is `unchain_ball` empty block then `obj.owornmask = 0` instead of `setnotworn`.

Classification: this is a **clone**, not a C callee. `steal.js` is not imported. The comment says “sit cannot import steal.js (hack→eat cycle).” That cycle is real **and already present**: `sit.js` → `hack.js` → `eat.js` → `sit.js` (`attrcurse`). `steal.js` also imports `hack.js`. A static `sit` → `steal` import would lengthen the same cycle. A **dynamic** import inside `take_gold` (the pattern case 10 already uses for `read.js`) would have avoided a fourth clone. They did not take it.

That is process smell, not a live-path C-wrong, because the gold path does not need armor `*_off`. What the clone **does** call on the live path are the real `*gone` exports. Exporting a `*gone`-based helper from `wield.js` (already imported) would also have avoided a sit-local clone without touching steal.js. They inlined instead. Still one cluster.

### W_WEAPONS arm — branch-by-branch, then `*gone`

C `steal.c:270–276`:

```
} else if (obj->owornmask & W_WEAPONS) {
    if (obj == uwep) uwepgone();
    if (obj == uswapwep) uswapwepgone();
    if (obj == uquiver) uqwepgone();
}
```

JS: same three pointer tests, same three callees, not `else if` between slots (a coin is one slot). `W_WEAPONS` is `W_WEP|W_SWAPWEP|W_QUIVER` in both (`prop.h:113`; `const.js:2239`).

C `uqwepgone` (`wield.c:897–902`): `if (uquiver) { setworn(NULL, W_QUIVER); update_inventory(); }`. JS `uqwepgone` → `setuqwep(null)`: clears `old.owornmask & ~W_QUIVER` and `u.uquiver = null`. `update_inventory` named omit on `*gone` since before this SHA. `uwepgone` also sets `gu.unweapon = true` like C (`wield.c:882`; `wield.js:282`). Match for slot clearing.

After `*gone`, C `obj->owornmask` has the weapon bit cleared, so the catchall `else if (obj->owornmask) setnotworn(obj)` does **not** run for a normal quivered coin. JS catchall `obj.owornmask = 0` is likewise skipped when the bit is already clear. Dead for the Must-fix path.

If `owornmask` is stale (bit set, slot pointer is another object): C skips `*gone` (pointer mismatch) then `setnotworn` walks `worn[]` by **pointer** and only clears slots that actually point at `obj`. JS zeros `obj.owornmask` and leaves the other object in `u.uquiver`. Same outcome for the stale coin (mask cleared, live quiver untouched). Not a gold-path C-wrong.

`unchain_ball` is `false` (`FALSE`). C would not `unpunish` even if the object were ball/chain. Gold is not. The empty `if (unchain_ball)` is honest.

C `setworn((struct obj *) 0, W_QUIVER)` also `update_inventory` and `recalc_telepat_range` (`worn.c` tail). JS `setuqwep(null)` does not. Gold confers no telepat. Display omit named on `*gone` already. Not introduced here.

Three JS clones of this C function, so this SHA is not “the” port:

| Site | What it calls on W_WEAPONS | Used by take_gold? |
|------|----------------------------|--------------------|
| `sit.js` `remove_worn_item` (this SHA) | `uwepgone` / `uswapwepgone` / `uqwepgone` | **yes** |
| `steal.js` `remove_worn_item_steal` | `setuwep` / `setuswapwep` / `setuqwep` | no |
| `do_wear.js` `remove_worn_item` | clear bits + slot pointers | no |

C `take_gold` uses steal.c, which uses `*gone`. The sit clone is the closest of the three for this caller. steal.js still diverges on `unweapon` / artifact_light; out of scope.

`pickup.c:2379–2381` is the C comment that gold can be quivered and that `freeinv` expects the caller to unwear first. `take_gold` is the same contract. JS `pickup_object` still `void telekinesis` (next Must-fix) and does not grow a gold-quiver path here.

### What would be a C-wrong (and is not this path)

If this helper were later used for armor, skipping `Armor_off` / `setnotworn` pointer-walk **would** be a C-wrong (extrinsics, `uskin`, `cancel_doff`). The map already says those arms are named. Only `take_gold` calls this function. Do not treat the clone as a general `steal.c` replacement.

`remove_worn_item_steal` in `steal.js` still uses `setuwep(null)` not `uwepgone` (misses `unweapon` / artifact_light). This SHA did **not** fix that clone. Not in the subject. Not Must-fix from D-1034 risk 3.

## Hallucinations / overclaim

“Match C take_gold remove_worn_item so quivered gold is unworn before delobj” is **true for the caller and for the W_WEAPONS `*gone` arm.** This is **not** “Match C dispatch, callee is a stub.” The callee is a gold-shaped **clone** that invokes the real `*gone` functions. It is **not** “Match C `steal.c` `remove_worn_item` in full.”

Stamping D-1034 risk 3 **Addressed** is fair for unwear-before-`delobj` on coins. It is not fair to retire armor `*_off` / `setnotworn` debt. The hash was missing on the review and on `LOOP-QUEUE-DONE.md`; fill `9e24f61a` in this commit.

Cadence **#1320** 44/44 does not prove quivered gold on a throne. Journal admits public **unhit**. Private 20/20 (quiver/wield/swap clear; sword `uwep` kept; no-gold strange-sensation) is the right falsifier.

## Density (§2b)

One Must-fix: C `take_gold`’s unwear-before-delete, plus the one `W_WEAPONS` arm gold can hit. ~40 lines. Right size for a queued C-wrong. Not “finish steal.c.” Armor arms left named on purpose. The extra local clone (vs dynamic import of steal.js, or exporting `*gone`-based unwear from `wield.js`) is the only density smell — still one locus family.

## Verification

Journal: green+strict PASS; sit cohort **4**/4 (seed0106 Scr **267**/267; seed0107 **98**/98; seed0108 **303**/303; seed4500 **1814**/1814). Private node **20**/20. Path **unhit**. This review’s cadence **#1320** full `sessions` **44**/44 Scr **11405**/11405 RNG **792838**/792838 (100%) speed `31+0.26/turn` (R² 0.871). Adequate: fortress plus private slot checks. `cursed_book` `take_gold` is also unhit on the public set.

## Actionable C-wrongs

None that belong on Must-fix from **this** SHA. D-1034 risk 3 (no `remove_worn_item` before `delobj`) is actually closed on the gold path.

Named omits (map, not queue): `donning`/`cancel_don`; `in_use`; armor `*_off` / `Amulet_off` / `Ring_gone` / `Blindf_off`; `unpunish`; `setnotworn` pointer-walk; invent splice vs `obj_extract_self(OBJ_INVENT)`; `*gone` `update_inventory` / `uwepgone` artifact_light. Remaining Must-fix: `pickup_object` telekinesis (D-1022 risk 6), `u_wipe_engr`/`tmp_at`, cursed-lamp `make_glib`, `cry_sound` `msound`, `get_obj_location` flags.

Do not restore invent-splice-only `take_gold`. Do not call sit’s `remove_worn_item` for armor. Do not pop tut-1 while Must-fix is open.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `take_gold` now calls unwear then `delobj` like `sit.c:23–24`, and quivered gold hits real `uqwepgone`; the helper is a gold-shaped steal.c clone, not the full function.
