# Review 576 — 6a08939b — invent.c consume_obj_charge known update_inventory (D-1615)

## Metadata
- Full / short hash: `6a08939bb212bfceee476e761519692aacb1914f` / `6a08939b`
- Parent: `68c0f298` (D-1614). This file audits **this SHA only** (fourth of nine `js/` commits since review **572**). Archive **Addressed:** D-1615 `6a08939b`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 02:52:31 +0200
- D-id: **D-1615**
- Stats: `js/invent.js` +8/−3, `js/apply.js` +3/−2. Band **150–350** (js/ insertions **11**; C is **11** lines).
- Claims to close: Open `consume_obj_charge` known `update_inventory` after D-1047 / D-1600 / D-1603. Not InvInUse. Not `#perminv`. `reviews/loop-2026-08-15/` D-1023 risk 3 unpaid was **Addressed:** D-1047; this is the leftover known-redraw omit, not that Must-fix.
- JS / map: `invent.js` `consume_obj_charge`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **08** named `update_inventory` perm_invent redraw; **561** named `consume_obj_charge` `update_inventory`.

## Intent vs deliverable

Git subject promises: a known charged tool calls `update_inventory` after `spe--`, instead of leaving perm_invent on a stale charge count.

Pinned C `invent.c` `consume_obj_charge` `:1336–1346` (`NONNULLARG1`). Callee `update_inventory` `:2782–2809` (D-1126 tty → `sync_perminvent`). Unpaid `check_unpaid` is D-1047. `--callers consume_obj_charge`: apply `:92`/`:1254`/`:2221`/`:2619`/`:2631`; detect `:1255`/`:1292`/`:1332`; makemon `:2575`; mkobj `:2866`; music `:590`/`:613`/`:660`/`:693`; pickup `:3662`; trap `:5649`.

```1336:1346:nethack-c/upstream/src/invent.c
void
consume_obj_charge(
    struct obj *obj,
    boolean maybe_unpaid)
{
    if (maybe_unpaid)
        check_unpaid(obj);
    obj->spe -= 1;
    if (obj->known)
        update_inventory();
}
```

Old JS (after D-1047): `check_unpaid` then `spe--` with comment “perm_invent redraw deferred.”

The diff **does** `if (obj.known) update_inventory()` after `spe--`. Apply comment only names the empty-can trailing call. It **does not** port pickup tip-spill `:3662`, trap `disarm_squeaky_board` `:5649`, use_grease trailing `update_inventory` `:2652`, tty WIN_INVEN paint, `#perminv`, or `optfn_perminv_mode`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `consume_obj_charge` | C `:1336–1346`, **LIVE this SHA** | known arm only; unpaid D-1047 |
| `update_inventory` | C `:2782–2809`, **LIVE** | sync; D-1126 |
| `sync_perminvent` | C tty, **LIVE** | D-1600 helpers; writers D-1603 |
| `check_unpaid` | C shk, **LIVE** | D-1047; dynamic import |
| apply/detect/music/mkobj callers | C, **LIVE** | already `await consume_obj_charge` |
| pickup tip-spill `:3662` | C, **OMIT named** | not in `js/pickup.js` |
| trap squeaky `:5649` | C, **OMIT named** | not in `js/trap.js` |
| use_grease `:2652` trailing | C `update_inventory`, **OMIT named** | empty-can; not this fn |
| tty WIN_INVEN / `#perminv` | **OMIT named** | |

`node scripts/csym.mjs consume_obj_charge` → `:1336-1346`. `--callers` as above.

RNG: none in this function. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names (this SHA does not delete a clone):

```
consume_obj_charge js/invent.js:2655   ASYNC — await required
update_inventory js/invent.js:2634   sync
check_unpaid     js/shk.js:2894   ASYNC — await required
sync_perminvent  js/invent.js:2565   sync
```

No import re-point. `update_inventory` is same-file, sync — not awaiting it is C (`void`). Do **not** add `consume_obj_charge` #2. Do **not** `import` invent→shk at top level (existing dynamic import).

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Order. `maybe_unpaid` → `check_unpaid`; then `spe -= 1`; then `if (known) update_inventory()`. JS same (`spe | 0` then `-1`). **Match `:1341–1345`.** Extra JS `if (!obj) return` is not C (`NONNULLARG1`); it does not skip a live caller.

`!known`. C skips redraw so the secret charge stays off perm_invent. JS `if (obj.known)`. **Match `:1344`.**

`update_inventory`. C returns if `!in_moveloop` or `suppress_map_output`, then `suppress_price=0` around `win_update_inventory(0)`. JS `:2634–2642` `sync_perminvent`. **Match the callee already shipped.** This SHA only wires the missing call. Default perm_invent Off: C still calls the windowproc; TTY no-ops the window. JS `sync_perminvent` already gates. Not a new stub.

Callee closure (known arm). LIVE: `update_inventory`, `sync_perminvent`. STUB: none. OMIT named: pickup/trap callers, grease trailing, WIN_INVEN paint. The **function body** may ship; unwired callers stay Open. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject known tools refresh perm_invent via `update_inventory` after `spe--`: **true of the shared helper.** D-log “unpaid is D-1047; InvInUse D-1600; writers D-1603”: **true.** Do **not** stamp “Match C pickup tip-spill `consume_obj_charge` (`:3662`).” Do **not** stamp “Match C trap `disarm_squeaky_board` (`:5649`).” Do **not** stamp “Match C use_grease trailing `update_inventory` (`:2652`).” Do **not** stamp “Match C tty WIN_INVEN two-column paint / `#perminv`.” Public suite default perm_invent Off does not show a stale charge window.

## Density

One 11-line C function; +11 JS. Playbook “unless C is that small” applies. Did not glue pickup/trap callers. §2b OK.

## Branch-by-branch confirm

1. `maybe_unpaid` true: `check_unpaid` then `spe--`. **Match** (D-1047).
2. `maybe_unpaid` false: skip unpaid, still `spe--`. **Match.**
3. `known`: `update_inventory`. **Match this SHA.**
4. `!known`: no redraw. **Match.**
5. pickup `:3662` / trap `:5649`. **Named** (callers absent).
6. grease empty-can `:2652`. **Named.**

## Callers / RNG ledger

Wired (already): apply camera/grease/tinning/bell, detect, music, mkobj horn, bag tip `!tipping`. Unwired C: pickup `:3662`, trap `:5649`. makemon `:2575` is the bag path (JS apply `:5400`). No RNG in the helper. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not restore the “redraw deferred” comment as design. Do not await sync `update_inventory`. Do not skip `!known`. InvInUse is D-1600. Writers are D-1603.

## Verification

D-log private canary **8**/8; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for a visible perm_invent charge change (contest rc default Off; no session toggles it). Fortress apply of an unknown wand/tool does not prove the `known` arm. pickup/trap callers unhit.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): pickup tip-spill `consume_obj_charge` (`pickup.c:3662`); trap `disarm_squeaky_board` (`trap.c:5649`); use_grease trailing `update_inventory` (`apply.c:2652`); tty WIN_INVEN paint / `#perminv` / `optfn_perminv_mode`. Do not add a local `spe--` clone in apply. Do not call `update_inventory` when `!known`.

Verdict: **ACCEPT-WITH-DEBT**
