# Review 640 — 1b08a2d9 — pickup.c choose_tip_container_menu (D-1679)

## Metadata
- Full / short hash: `1b08a2d9f28eb606fc96a037f6e76ee0b9d54883` / `1b08a2d9`
- Parent: `8a8124d1` (D-1678). This file audits **this SHA only** (fifth of nine `js/` commits since review **635**). Archive **Addressed:** D-1679 `1b08a2d9`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 20:18:32 +0200
- D-id: **D-1679**
- Stats: `js/pickup.js` +107/−4. Total `js/` insertions **107** <250. Band **150–350**.
- Claims to close: Open `choose_tip_container_menu` after D-1665 empty `boxes>1`. Not spill/tiphat/statue. Not `tipcontainer_gettarget`. `reviews/loop-2026-08-15/` has no unpaid tip-menu Must-fix.
- JS / map: `pickup.js` `choose_tip_container_menu` + `dotip` wire. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **626** named `choose_tip_container_menu` (empty `boxes>1`).

## Intent vs deliverable

Git subject promises: `#tip` with several floor containers offers a PICK_ONE including the dummy invent row, instead of skipping straight to getobj after D-1665.

Pinned C `choose_tip_container_menu` `:3500–3558` (`node scripts/csym.mjs choose_tip_container_menu`). `--callers`: prototype `:44`; `dotip` `:3598`. `dotip` gate `:3589–3600`.

```3534:3557:nethack-c/upstream/src/pickup.c
    n = select_menu(win, PICK_ONE, &pick_list);
    ...
     * n ==  0 => picked preselected entry, toggling it off;
     * n ==  1 => accepted preselected choice via SPACE or RETURN;
     * n ==  2 => picked something other than preselected entry;
     * n == -1 => cancelled via ESC;
    otmp = (n <= 0) ? NULL : pick_list[0].item.a_obj;
    if (n > 1 && otmp == &dummyobj)
        otmp = pick_list[1].item.a_obj;
    if (otmp && otmp != &dummyobj) {
        tipcontainer(otmp);
        return ECMD_TIME;
    }
    if (n == -1)
        return ECMD_CANCEL;
    return ECMD_OK;
```

Old JS: `boxes>1` comment-only, fell through to invent `getobj`. The diff **does** the floor `Is_container` walk, dummy `"tip something being carried"` preselected, `'i'` unless `i > 'i'-'a'` or `lootabc`, PICK_ONE quirk (ESC / Space / letter), `dotip` `if (res !== ECMD_OK) return res`. It **does not** port MENU_SEARCH, `map_menu_cmd`, multi-page, `tty_nhbell`, spill/tiphat. Named. Empty `game.invent[]` is called out vs C `gi.invent` NULL.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `choose_tip_container_menu` | C `:3500–3558`, **LIVE this SHA** | local; do not export/#2 |
| `dotip` boxes>1 | C `:3595–3600`, **LIVE this SHA** | |
| `tipcontainer` | **LIVE** | not rewritten |
| `objects_at` | **LIVE** | ≡ `level.objects[u.ux][u.uy]` |
| `Is_container` / `doname` | **LIVE** | |
| `paint_corner_nhw_menu` / `dismiss_nhw_menu` | **CLONE** (tty menu stand-in) | pre-existing; named MENU_SEARCH |
| dummy invent row | C `:3526–3534`, **LIVE this SHA** | `MENU_ITEMFLAGS_SELECTED` |
| `getobj("tip")` | **LIVE** | D-1665; reached on `ECMD_OK` |
| spill / tiphat / statue | C `dotip` later, **OMIT named** | |
| MENU_SEARCH / `map_menu_cmd` / `tty_nhbell` | **OMIT named** | |

RNG: none. No seed gate.

`node scripts/sym.mjs` on new / deleted / re-pointed names:

```
choose_tip_container_menu NOT EXPORTED — 1 LOCAL js/pickup.js:3649
             => Do NOT write clone #2.
tipcontainer     js/pickup.js:3530   ASYNC — await required
dotip            js/pickup.js:3762   ASYNC — await required
dismiss_nhw_menu js/invent.js:2103   ASYNC — await required
objects_at       js/mkobj.js:2276   sync
```

`--can pickup.js invent.js dismiss_nhw_menu`: **ALREADY**. Do **not** stamp “cycle-forced clone.” Do **not** add `choose_tip_container_menu` #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

**Floor rows.** C `level.objects[u.ux][u.uy]` / `Is_container` / `doname` / `add_menu` identifier 0. JS `objects_at(u.ux,u.uy)` then auto `a`…`z`/`A`. **Match `:3518–3525`.** (Caller `cc` is unused in C’s menu; both use hero `u.ux,u.uy`.)

**Dummy invent.** C `if (gi.invent)` blank line + dummy `&dummyobj` + `'i'` iff `i <= 'i'-'a' && !flags.lootabc` else identifier 0 (auto letter) + `MENU_ITEMFLAGS_SELECTED`. JS `hasInvent = !!(invent && invent.length)` — empty **array** is not C’s empty **chain** (named). Selector `'i'` or `''` then auto-assign skipping rows that already have a selector. **Match the `'i'` / lootabc rule.** Preselected `true`.

**PICK_ONE quirk.** C comment `:3540–3545`. JS: ESC → `ECMD_CANCEL` (`n==-1`). Space/Return without toggle → dummy still selected → `n==1` → dummy → `ECMD_OK`. Letter on dummy toggles it off → `n<=0` → `ECMD_OK` (`n==0`). Letter on a floor box toggles it on; dummy stays selected; `pick_list` is floor-first so `[0]` is the box (`n>1` dummy-skip is the C `pick_list[0]==dummy` case when order differs). `tipcontainer` + `ECMD_TIME`. **Match the four `n` outcomes.** Invalid letter: C `nhbell`; JS `continue` (named).

**`dotip`.** C `:3598–3600` `!= ECMD_OK` return, else invent getobj. JS the same. **Match.**

Callee closure. LIVE: `tipcontainer`, `objects_at`, `Is_container`, `doname`, `dotip` getobj on OK. CLONE: corner NHW_MENU (PICK_ONE letters; not `tty_select_menu`). OMIT named: MENU_SEARCH, remaps, bell, spill. STUB: **none** in the live `boxes>1` arm. Combined-arm ships. “Dispatch ported, callee stubbed” is **false**.

## Hallucinations / overclaim

Subject “PICK_ONE including the dummy invent row”: **true** when `invent.length`. D-log “Space/`'i'` dummy skip floor”: **true**. Do **not** stamp “Match C `tty_select_menu` MENU_SEARCH.” Do **not** stamp “empty `invent[]` ≡ `gi.invent` NULL.” Do **not** stamp “Match C spill/tiphat.” Do **not** add `choose_tip_container_menu` export. Private canary (letter TIME / ESC CANCEL / Space and `'i'` dummy) is the right quirk check. Public-unhit (`#tip` multi-box).

## Density

+107: one C staticfn + `dotip` call. §2b. Did not glue spill/tiphat.

## Verification

Wired: `boxes>1` menu; dummy `'i'`; ESC/Space/letter; TIME vs OK vs CANCEL. Unwired C: SEARCH, remaps, bell, empty-chain invent, spill. Conf: no RNG. No seed gate.

Journal: private canary; green+strict seed8000/0900; cohort **9**/9 + strict. Cadence **#2090** at HEAD: **44**/44.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): MENU_SEARCH / `map_menu_cmd` / multi-page / `tty_nhbell`; empty `invent[]` vs `gi.invent`; spill/tiphat/statue; `tipcontainer_gettarget`. Do **not** add `choose_tip_container_menu` #2. Do **not** skip the dummy row. Do **not** treat Space as ESC. Do **not** re-port D-1665 `tip_ok` / getobj.

Verdict: **ACCEPT-WITH-DEBT**
