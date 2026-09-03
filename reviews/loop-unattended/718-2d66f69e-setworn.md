# Review 718 — 2d66f69e — worn.c setworn oc_oprop / w_blocks / W_WEP gate (D-1757)

## Metadata
- Full / short hash: `2d66f69e837338408c3e1c9738c9ec8797529c6a` / `2d66f69e`
- Parent: `d07fc56a` (D-1756). This file audits **this SHA only** (ninth of nine `js/` commits since review **709**). Archive **Addressed:** D-1757 `2d66f69e`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 03:31:27 +0200
- D-id: **D-1757**
- Stats: `js/do_wear.js` +112/−114; `js/wield.js` +9/−74; `js/mondata.js` +30/−1; `js/worn.js` +21/−6; `js/do.js` +11/−23. Total `js/` insertions **183** <250. Band **150–350**.
- Claims to close: Open `setworn` `oc_oprop` after D-1756. Not `cancel_doff`. Not rewrite `confer_oc_oprop`. `reviews/loop-2026-08-15/` has no unpaid setworn Must-fix.
- JS / map: `do_wear.js` `setworn`; `worn.js` `w_blocks`; `wield.js` `setuwep`; `mondata.js` `monstunseesu_prop`. `c-js-map/turns.md`.
- Prior: **705** `possibly_unwield`; parent `setworn` if-else slots, no W_WEP.

## Intent vs deliverable

Git subject promises: `oc_oprop` conferral walks `worn[]` with `w_blocks` blocked bits, SWAPWEP/QUIVER skip, and the W_WEP weapon-class gate (`setuwep` calls `setworn`) instead of armor-only `confer_oc_oprop` after D-1756.

`node scripts/csym.mjs setworn` → `worn.c:72–145`. `--callers setworn`: 76 refs including `wield.c:106` `setuwep`, `:278` quiver, `:287` swap. `w_blocks` `:38–44`. `setuwep` `wield.c:99–135`. `cvt_prop_to_mseenres` `mondata.c:1539–1554`. `monstunseesu_prop` `monst.h:94`.

```88:131:nethack-c/upstream/src/worn.c
                    if (wp->w_mask & ~(W_SWAPWEP | W_QUIVER)) {
                        p = objects[oobj->otyp].oc_oprop;
                        u.uprops[p].extrinsic &= ~wp->w_mask;
                        monstunseesu_prop(p);
                        if ((p = w_blocks(oobj, mask)) != 0)
                            u.uprops[p].blocked &= ~wp->w_mask;
                        if (oobj->oartifact)
                            set_artifact_intrinsic(oobj, 0, mask);
                    }
                    ...
                    if (wp->w_mask & ~(W_SWAPWEP | W_QUIVER)) {
                        if (obj->oclass == WEAPON_CLASS || is_weptool(obj)
                            || mask != W_WEP) {
                            p = objects[obj->otyp].oc_oprop;
                            u.uprops[p].extrinsic |= wp->w_mask;
                            if ((p = w_blocks(obj, mask)) != 0)
                                u.uprops[p].blocked |= wp->w_mask;
                        }
                        if (obj->oartifact)
                            set_artifact_intrinsic(obj, 1, mask);
                    }
```

Parent: if-else slots (no `uwep`/`uswapwep`/`uquiver`); `confer_oc_oprop` armor/accessory only; `setuwep` inlined pointer+artifact; `w_blocks` mummy-only in worn.js + `w_blocks_hero` clone in do.js. The diff **does** `WORN[]` walk including weapons, SWAPWEP/QUIVER skip, weapon-class gate, `w_blocks` three arms + B* flats, `monstunseesu_prop` on remove, skin `I_SPECIAL`, nudist/tux, `setuwep`/`setuswapwep`/`setuqwep` → `setworn`, retire `w_blocks_hero`. It **does not** rewrite `confer_oc_oprop` (Playbook). It **does not** add `cancel_doff`. Named (`NOT FOUND`). It **does not** port Ogresmasher/Sunsword in `setuwep`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `setworn` `:72–145` | LIVE repaired | worn[] + skip + gate + blocks + skin |
| `confer_oc_oprop` | LIVE kept | still the oc_oprop extrinsic helper; not rewritten |
| `w_blocks` `:38–44` | LIVE export | wrapping INVIS / cornuthaum CLAIRVOYANT / Eyes BLINDED |
| `w_blocks_hero` | deleted clone | NOT FOUND |
| `setuwep` `:99–135` | LIVE repaired | `setworn(obj, W_WEP)` then unweapon |
| `setuswapwep` / `setuqwep` | LIVE | `setworn` only (no oc_oprop — skip) |
| `cvt_prop_to_mseenres` | LIVE | mondata.js |
| `monstunseesu_prop` | LIVE | wrapper |
| `cancel_doff` | OMIT named | NOT FOUND |
| Ogresmasher / Sunsword | OMIT named | setuwep after setworn |

`node scripts/sym.mjs`:

```
setworn          js/do_wear.js:497   sync
w_blocks         js/worn.js:225   sync
confer_oc_oprop  js/do_wear.js:300   sync
setuwep          js/wield.js:255   sync
setuswapwep      js/wield.js:277   sync
setuqwep         js/wield.js:284   sync
monstunseesu_prop js/mondata.js:534   sync
cvt_prop_to_mseenres js/mondata.js:516   sync
cancel_doff      NOT FOUND
w_blocks_hero    NOT FOUND
```

Re-point: `w_blocks_hero` → import `w_blocks`; `setuwep` inline → `setworn`. `node scripts/imports.mjs --can wield.js do_wear.js setworn` / `do_wear.js worn.js w_blocks` / `do_wear.js mondata.js monstunseesu_prop` / `do.js worn.js w_blocks`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Skin (`:79–82`).** `(mask & (W_ARM\|I_SPECIAL)) == (W_ARM\|I_SPECIAL)` → `uskin = obj`, no confer. JS `u.uskin`. **Match.** Canary I_SPECIAL.

**worn[] walk.** C `for (wp = worn; wp->w_mask; wp++)` if `wp->w_mask & mask`. JS `WORN` table includes W_WEP/SWAPWEP/QUIVER/BALL/CHAIN (parent skipped weapons). **Match the slots.** `impossible` if oobj lacks the bit. **Match.**

**Twoweapon (`:86–87`).** If twoweap and oobj has W_WEP|W_SWAPWEP → `set_twoweap(FALSE)`. JS the same. **Match.** Parent `setuwep` had a copy; now one site.

**Remove oc_oprop (`:88–105`).** Skip SWAPWEP/QUIVER. `p = oc_oprop`; extrinsic `&= ~mask`; `monstunseesu_prop(p)`; `w_blocks` then blocked `&= ~`; artifact off. JS `confer_oc_oprop(false)` (Playbook: keep that helper) then `monstunseesu_prop(oc_oprop)` then `apply_w_blocks` off. **Match order.** `p` is not reused after w_blocks overwrites it in C; JS uses two names. **Match.**

**Wear gate (`:119–131`).** Skip SWAP/QUIVER. Confer **only if** `WEAPON_CLASS \|\| is_weptool \|\| mask != W_WEP`. Wielded ring: mask==W_WEP, not weapon/weptool → **no** oc_oprop. Armor `mask != W_WEP` → confer. Weapon in W_WEP → confer. JS `is_weptool` LIVE wield.js. **Match.** Canary wield-ring no confer / wield-weapon confer. Artifact still runs inside the skip-if, **outside** the class gate (wielded artifact ring still gets `set_artifact_intrinsic`). JS the same. **Match C `:129–130`.**

**`w_blocks` (`:38–44`).** Mummy wrapping + W_ARMC → INVIS; cornuthaum + W_ARMH + !wizard → CLAIRVOYANT; Eyes + W_TOOL → BLINDED; else 0. JS export. `Role_if(PM_WIZARD)` ≡ `urole.mnum`. Parent worn.js mummy-only; do.js had the full clone. **One body.** Canary wrapping / tourist vs wizard cornuthaum / Eyes. `apply_w_blocks` also writes `BBlinded`/`BInvis`/`BClairvoyant` flats because JS Blind clones read those — C only `uprops[].blocked`. Mirror, not a second C function.

**Nudist / tux (`:133–137`).** Armor worn → `uroleplay.nudist = FALSE`. `tux_penalty = uarm && monk && spelarmr`. JS the same. **Match.**

**botl / `update_inventory` / `recalc_telepat_range` (`:139–144`).** weaponstatus+W_WEP or armorstatus+W_ARMOR → botl. JS `disp.botl`. Then `update_inventory`; `recalc_telepat_range`. **Match.** Still **no** `find_ac` (D-0810).

**`setuwep` (`:99–135`).** `if (obj == uwep) return` (do not clobber `unweapon`); `setworn(obj, W_WEP)`; Ogresmasher botl / Sunsword `end_burn` named; `unweapon` from launcher/ammo/missile/pole/weptool. JS the call + unweapon. Parent also cleared quiver/swap if the same object — **C `setworn(W_WEP)` does not**. This SHA **drops** that extra clear. **Match C**, do not restore the parent juggle. Named: Snickersnee pole / wet-towel `unweapon` exceptions still missing vs C `:132–134` (pre-existing formula).

**`setuswapwep` / `setuqwep`.** C one-line `setworn`. JS the same. oc_oprop skipped. **Match.**

**`cvt_prop_to_mseenres`.** Nine cases + default NOTHING. JS switch. **Match.** `monstunseesu_prop` → `monstunseesu`. LIVE.

**`cancel_doff`.** C on every remove. JS comment only. NOT FOUND. Named.

**`setnotworn`.** Still walks slots + `confer_oc_oprop` + imported `w_blocks` + new B* flats. C `setnotworn` is not `setworn`. This SHA did **not** add `monstunseesu_prop` there. Named. Do **not** treat that as this Open.

**Callee closure (`setworn` + `setuwep`).** LIVE: `confer_oc_oprop` (kept), `w_blocks`, `monstunseesu_prop`, `set_artifact_intrinsic`, `set_twoweap`, `is_weptool`, `update_inventory`, `recalc_telepat_range`. OMIT named: `cancel_doff`; Ogresmasher/Sunsword. STUB: **none**. Not “dispatch ported, callee stubbed.” Did **not** rewrite `confer_oc_oprop`.

**RNG.** `setworn` burns none. **Match.**

## Hallucinations / overclaim

Subject “worn[] + w_blocks + SWAP/QUIVER skip + W_WEP gate; setuwep calls setworn”: **true**. D-log “did not rewrite confer_oc_oprop”: **true**. Do **not** stamp “Match C `cancel_doff`.” Do **not** stamp “Match C Ogresmasher/Sunsword `setuwep`.” Do **not** stamp “Match C `setnotworn` `monstunseesu_prop`.” Do **not** stamp “Match C Snickersnee/wet-towel unweapon.” Journal “fortress held” is not a wield-Sting confer screen. Cohort **9**/9 this SHA. Weapon confer **public-unhit**. Admit that.

## Density

§2b: `setworn` + the three wield setters that C implements as `setworn`. +183. Related `w_blocks` one body + `monstunseesu_prop`. Did **not** glue `cancel_doff`. Did **not** rewrite `confer_oc_oprop`. Did **not** reopen D-1756 `delobj`.

## Verification

D-log: save-oracle skip (untagged `worn.c:setworn`); node 32/32 (wrapping INVIS; cornuthaum tourist vs wizard; Eyes BLINDED; ring regen; SWAPWEP/QUIVER skip; wield-ring no confer; wield-weapon confer; skin I_SPECIAL; nudist; monk tux); green+strict seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean. Wield-weapon `oc_oprop` **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (`setworn` walk/skip/gate/`w_blocks`/`setuwep` match C; remaining named). Named: `cancel_doff`; Ogresmasher/Sunsword; `setnotworn` `monstunseesu_prop`; Snickersnee/wet-towel `unweapon`. Do **not** restore `w_blocks_hero`. Do **not** confer oc_oprop on SWAPWEP/QUIVER. Do **not** confer a wielded potion/ring (`mask==W_WEP` gate). Do **not** rewrite `confer_oc_oprop`. Do **not** `setuwep` inline the slot again. Do **not** re-port D-1756.

Verdict: **ACCEPT-WITH-DEBT**
