# Review 582 — 5f2c5f4d — invent.c adjust_split GC_ECHOFIRST|CONDHIST (D-1621)

## Metadata
- Full / short hash: `5f2c5f4d3576f6a555913ed38fed8062ff0865b1` / `5f2c5f4d`
- Parent: `e05d9c97` (audit of D-1612–D-1620). This file audits **this SHA only** (first of nine `js/` commits since review **581**). Archive **Addressed:** D-1621 `5f2c5f4d`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 04:41:46 +0200
- D-id: **D-1621**
- Stats: `js/invent.js` +166/−42, `js/iactions.js` +10/−1, `js/u_init.js` +1/−1. Band **150–350** (js/ insertions **178**).
- Claims to close: Open `invent.c` `adjust_split` after D-1613. Not get_count body. Not `menu_remarm`. `reviews/loop-2026-08-15/` has no unpaid adjust_split Must-fix.
- JS / map: `invent.js` `adjust_split` / `doorganize_core`; `iactions.js` `IA_ADJUST_STACK`; `u_init.js` `assigninvlet` export. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **574** named `adjust_split` `:5031` `GC_ECHOFIRST|GC_CONDHIST`.

## Intent vs deliverable

Git subject promises: itemactions `'I'` / `#altadjust` uses `get_count` `GC_ECHOFIRST|GC_CONDHIST` then `splitobj`+`doorganize_core`, instead of leaving those flags with no caller after D-1613.

Pinned C `invent.c` `adjust_split` `:5007–5065` (`node scripts/csym.mjs adjust_split`). Callee `doorganize_core` `:5067–5286` (`--callers doorganize_core`: `:5003` `#adjust`, `:5064` this return). `get_count` `:5009–5090` is D-1613; this caller `:5031`. `hack.h` `:1385–1388` `GC_SAVEHIST=1` / `GC_CONDHIST=2` / `GC_ECHOFIRST=4`. `iactions.c` `itemactions_pushkeys` `:194–197` (`--callers cmdq_add_ec` includes `:196`). `--callers adjust_split`: **0** (extcmd function pointer, not a C identifier use). `digit` `hacklib.c` `:61–65`. `assigninvlet` `:693–732`, bumped caller `:5271`. `inv_cnt` `hack.c` `:4495–4507`. `doorganize` `:4980–5004`.

```5007:5041:nethack-c/upstream/src/invent.c
int
adjust_split(void)
{
    struct obj *obj;
    cmdcount_nht splitamount = 0L;
    char let, dig = '\0';

    obj = getobj("split", adjust_ok, GETOBJ_NOFLAGS);
    if (!obj || obj->quan < 2L || obj->otyp == GOLD_PIECE)
        return ECMD_FAIL;

    if (obj->quan == 2L) {
        splitamount = 1L;
    } else {
        dig = yn_function("Split off how many?", (char *) 0, '\0', TRUE);
        if (!digit(dig)) {
            pline1(Never_mind);
            return ECMD_CANCEL;
        }
        let = get_count(NULL, dig, 0L, &splitamount,
                        GC_ECHOFIRST | GC_CONDHIST);
        if (!let || let == '\033' || !strchr(quitchars, let)) {
            pline1(Never_mind);
            return ECMD_CANCEL;
        }
    }
```

Old JS (D-1613): `get_count` flags live for parse/getobj; `adjust_split` absent; `doorganize_core` did not detect nobj splits so cancel dropped the child. IA_ADJUST_STACK already sat on the itemactions menu (`'I'`) with pushkeys falling through `default`.

The diff **does** export `adjust_split` (getobj `"split"` `GETOBJ_NOFLAGS`, quan==2 → 1, else yn first digit + `get_count` those flags, `splitobj` + invent[] splice, `doorganize_core(child)`), wire `IA_ADJUST_STACK` via `cmdq_add_ec_entry('altadjust', …)` like `#altdip`, detect nobj `"Split N"` / unsplit on cancel / bump `assigninvlet` + `clear_splitobjs`. It **does not** port `check_invent_gold` / `adjust_gold_ok` / gold skip-yn (`:5143` `!isgold ? yn : GOLD_SYM`), `invlet_constant` truncate (`:5109–5111`), `IA_ADJUST_OBJ` pushkeys (`:191–193` `#adjust`), or typed `#altadjust` (INTERNALCMD `0x40`, Match C skip). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `adjust_split` | C `:5007–5065`, **LIVE this SHA** | export; await |
| `doorganize_core` | C `:5067–5286` staticfn, **LIVE this SHA** nobj path | local; do not export #2 |
| `doorganize` | C `:4980–5004`, **LIVE** | nobj detect now also serves ALLOWCNT |
| `getobj` | C invent getobj, **LIVE** | `"split"` + `adjust_ok` + `GETOBJ_NOFLAGS` |
| `adjust_ok` | C `:4916–4923`, **LIVE** | local; gold EXCLUDE |
| `get_count` | C cmd `:5009–5090`, **LIVE** | D-1613; this is the missing caller |
| `yn_function` | C cmd `:5471`, **LIVE** | 3-arg; C 4th `TRUE` named |
| `digit` | C hacklib `:61–65`, **CLONE** | JS `'0'`–`'9'` |
| `splitobj` | C mkobj, **LIVE** | nobj child; invent[] splice like getobj_split_otmp (D-0924) |
| `unsplitobj` | C mkobj `:554–622`, **LIVE** | cancel / pack-full; C core uses `merged(&splitting,&obj)` |
| `clear_splitobjs` | C mkobj, **LIVE** | after success |
| `assigninvlet` | C invent `:693–732`, **LIVE** | existing `u_init.js`; export, not clone #2 |
| `inv_cnt` | C hack `:4495–4507`, **LIVE** | import `steal.js`; `hack.js` still has clone #2 — do not add #3 |
| `display_used_invlets` | C `:3466–3519`, **LIVE** | D-1591; avoidlet now `splitting ? invlet : 0` |
| `update_inventory` | C, **LIVE** | |
| `itemactions_pushkeys` | C iactions `:139–274`, **LIVE this SHA** `IA_ADJUST_STACK` | `cmdq_add_ec_entry` like altdip |
| `cmdq_add_ec_entry` | C `cmdq_add_ec` lookup, **CLONE** | local iactions; do not write #2 |
| `invent_merged` / `prinv_adjust` / `reorder_invent_adjust` / `invent_obj_name` / `extract_invent` | C `merged` / `prinv` / `reorder_invent` / `ONAME` / `extract_nobj`, **CLONE** | pre-existing doorganize helpers |
| `check_invent_gold` / `adjust_gold_ok` / gold skip-yn | C `:4887–4913` / `:4998` / `:5143`, **OMIT named** | wonky-gold |
| `invlet_constant` truncate | C `:5109–5111`, **OMIT named** | |
| `IA_ADJUST_OBJ` pushkeys | C `:191–193`, **OMIT named** | menu `'i'` still `default` |
| `custompline(SUPPRESS_HISTORY)` | C get_count echo, **OMIT named** | D-1613 |

`node scripts/csym.mjs adjust_split` → `:5007-5065`. `doorganize_core` → `:5067-5286`. `get_count` → `:5009-5090`. `--callers get_count` includes `invent.c:5031`. `--callers cmdq_add_ec` includes `iactions.c:196`. `digit` → `:61-65`. `assigninvlet` → `:693-732` (`--callers` `:5271` bumped). `inv_cnt` → `hack.c:4495-4507`. `check_invent_gold` → `:4887-4913`.

RNG: none in `adjust_split` / `doorganize_core`. No seed gate.

`node scripts/sym.mjs` on new / deleted / re-pointed names:

```
adjust_split     js/invent.js:5933   ASYNC — await required
doorganize_core  NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/invent.js:5772
             => Do NOT write clone #2.
getobj           js/invent.js:5285   ASYNC — await required
splitobj         js/mkobj.js:332   sync
unsplitobj       js/mkobj.js:420   sync
clear_splitobjs  js/mkobj.js:387   sync
get_count        js/cmd.js:1890   ASYNC — await required
yn_function      js/getline.js:1146   ASYNC — await required
assigninvlet     js/u_init.js:824   sync
inv_cnt          js/steal.js:48   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files — IMPORT the export; do NOT add another
               js/hack.js:260
display_used_invlets js/invent.js:5692   ASYNC — await required
update_inventory js/invent.js:2644   sync
cmdq_add_ec_entry NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/iactions.js:44
             => Do NOT write clone #2.
invent_merged    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/invent.js:5619
             => Do NOT write clone #2.
adjust_ok        NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/invent.js:5444
             => Do NOT write clone #2.
itemactions_pushkeys NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/iactions.js:59
             => Do NOT write clone #2.
```

`--can invent.js u_init.js assigninvlet`: `ALREADY: invent.js already statically imports u_init.js.` `--can invent.js steal.js inv_cnt`: already imports. `--can invent.js mkobj.js unsplitobj`: already imports. `--can iactions.js invent.js adjust_split`: `ALREADY: iactions.js already statically imports invent.js` (the SHA still uses dynamic `await import` like `#altdip`; not a top-level TDZ). Do **not** stamp “cycle-forced clone.” Do **not** add `doorganize_core` / `adjust_split` / `cmdq_add_ec_entry` / `invent_merged` #2. Do not add `inv_cnt` #3 in `invent.js`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`getobj("split", adjust_ok, GETOBJ_NOFLAGS)`. JS same three args. `adjust_ok` gold EXCLUDE. **Match `:4916–4923` + `:5015`.** Fail `!obj \|\| quan<2 \|\| GOLD_PIECE` → `ECMD_FAIL`. **Match `:5016–5017`.**

quan==2 → `splitamount=1` without yn. **Match `:5019–5020`.** Else yn `"Split off how many?"` then `digit` `'0'`–`'9'` (`hacklib.c:61–65`) else Never_mind `ECMD_CANCEL`. **Match `:5022–5026`.** C 4th yn arg `TRUE` (record); JS 3-arg. Pre-existing getline omit, not a new stub.

`get_count(NULL, dig, 0L, &splitamount, GC_ECHOFIRST\|GC_CONDHIST)`. JS `null, dig, 0, box, GC_ECHOFIRST\|GC_CONDHIST`. `get_count_inkey_code` accepts the yn string. maxcount `0` skips clamp (`maxcount > 0`). **Match `:5031–5035` + `hack.h:1385–1388`.** Terminator: `!let \|\| ESC \|\| !quitchars`. JS `!let_ \|\| '\\x1b' \|\| !QUITCHARS.includes` (`' \\r\\n\\x1b'`). ESC is in quitchars; the extra `=== ESC` treats it as cancel not accept. **Match `:5036–5040`.** Range `splitamount<1 \|\| >= quan` with the two Amount plines. **Match `:5043–5052`.**

`splitobj` then `doorganize_core(obj)` on the **child**. C threads child on nobj (= invent). JS splitobj sets `obj.nobj=child` but does not invent[]-insert (D-0924); this SHA splices after parent like `getobj_split_otmp` and sets `where=OBJ_INVENT`. **Match the C list position; array splice is the JS stand-in, not a stub.**

`doorganize_core` splitting: walk until `otmp.nobj==obj`; set splitting only if same invlet, then break. JS `nobj===obj && invlet===` then break (does not break on nobj-only). After `splitobj` invlets match; the missed C `break` on mismatched invlet is unreachable on this arm. **Match `:5089–5096` for this caller.** Prompt `"Split %ld"` with **child** quan vs `"Adjust letter"`. **Match `:5137–5142`.** `display_used_invlets(splitting ? obj->invlet : 0)`. **Match `:5144–5150`.** Quitchars or (splitting && same invlet) → noadjust. **Match `:5151–5161`.** Gold `'$'` into non-coin → ever_mind + noadjust. **Match `:5162–5167`.** `isgold` skip-yn (`:5143`) still always yn. Named wonky-gold.

noadjust: C `merged(&splitting, &obj)` then Never_mind unless ever_mind. JS `unsplitobj(obj)` (`mkobj.c:554–622`; C core does not call it — `--callers unsplitobj` has no invent.c doorganize_core). `unsplitobj` is the dedicated split undo and itself `merged`s parent+child via objsplit oids. Cancel runs **before** `extract_invent`. Pack-full runs after extract; JS `extract_invent` now unlinks nobj like `extract_nobj`, and `unsplitobj` still finds the parent via oid. **Verified CLONE of C’s undo using a LIVE C callee.** Not “dispatch stubbed.”

adj_type Collecting / Moving / Splitting. **Match `:5178–5181`.** Occupied dest: non-split swap invlets; splitting strip name / `invent_merged` / pack-full `inv_cnt(false)>=INVLET_BASIC` / else bump. **Match `:5205–5239` for the control flow.** C `merged` vs JS `invent_merged` (quan add + extract) is the **pre-existing** doorganize clone, now reused on the new split-merge arm — not a new stub. C `Your("pack is too full.")`; JS that sentence. **Match `:5234`.** Bump: `assigninvlet` + unshift + reorder + `prinv("Moving:")`. **Match `:5266–5280`.** `clear_splitobjs` + `update_inventory`. **Match `:5281–5284`.**

`IA_ADJUST_STACK`: C `cmdq_add_ec(CQ_CANNED, adjust_split)` + invlet. JS `cmdq_add_ec_entry('altadjust', adjust_split)` + `cmdq_add_key(invlet)`. extcmd `flags: 64` = `INTERNALCMD`. Typed `#altadjust` skipped. **Match `:194–197` + INTERNALCMD.** `IA_ADJUST_OBJ` (`:191–193`) still `default`. Named. Menu `'I'` was already offered; this SHA fills the previously silent pushkeys arm.

Callee closure (`adjust_split` arm). LIVE: `getobj`, `adjust_ok`, `yn_function`, `get_count`, `splitobj`, `doorganize_core`, `unsplitobj`, `clear_splitobjs`, `assigninvlet`, `inv_cnt`, `display_used_invlets`, `update_inventory`. CLONE: `digit`, `cmdq_add_ec_entry`, `invent_merged` / `extract_invent` / `prinv_adjust` / `reorder_invent_adjust` / invent[] splice. OMIT named: wonky-gold / `check_invent_gold` / `invlet_constant` / `IA_ADJUST_OBJ` / yn 4th / `custompline`. STUB: none. The arm may ship. Not “Match C dispatch, callee is a stub.”

## Hallucinations / overclaim

Subject `'I'` / `#altadjust` uses `get_count` those flags then `splitobj`+`doorganize_core`: **true for itemactions `'I'`.** Canned INTERNALCMD `#altadjust` is how C spells that; the player cannot type `#altadjust`. D-log nobj `"Split N"` / unsplit / bump: **true.** Do **not** stamp “Match C `check_invent_gold` / `adjust_gold_ok` (`:4998`).” Do **not** stamp “Match C gold skip-yn (`:5143`).” Do **not** stamp “Match C `invlet_constant` truncate (`:5109–5111`).” Do **not** stamp “Match C `IA_ADJUST_OBJ` `doorganize` (`:191–193`).” Do **not** stamp “Match C `doorganize_core` `merged` vs `unsplitobj` as the same C call” (JS uses the live unsplit helper; C inlines `merged`). Do **not** stamp “Match C `get_count` body / parse `GC_NOFLAGS`” (D-1613). Fortress `'I'` is unhit.

## Density

+178 in `invent.js` + the one iactions arm + export: C `adjust_split` plus the `doorganize_core` nobj envelope that cancel/bump required. §2b one locus family. Did not glue get_count body, `menu_remarm`, or `com_pager_core`. Not a one-bullet peel.

## Branch-by-branch confirm

1. getobj `"split"` / quan<2 / gold → `ECMD_FAIL`. **Match.**
2. quan==2 → 1; else yn `digit` else Never_mind. **Match; yn 4th named.**
3. `get_count` flags + quitchars/ESC. **Match this SHA.**
4. Amount range plines. **Match.**
5. splitobj child + core `"Split N"` / avoidlet / same-slot quit. **Match.**
6. unsplit cancel / pack-full / bump assigninvlet. **Match control flow.**
7. gold skip-yn / `invlet_constant` / `IA_ADJUST_OBJ`. **Named.**

## Callers / RNG ledger

Wired: `itemactions_pushkeys` `IA_ADJUST_STACK` → canned `altadjust` + invlet answers getobj. `doorganize` ALLOWCNT now sees nobj (related callee, not a second Open). Unwired C: typed `#altadjust` (INTERNALCMD, Match C); `IA_ADJUST_OBJ`. Conf: no `rn2`/`rnd` in this envelope. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not add `adjust_split` in `iactions.js`. Do not add `inv_cnt` in `invent.js`. Do not default `invlet_constant` or invent gold stacks to “prove” wonky-gold on public traces. Do not import `fs`.

## Verification

D-log private canary **12**/12; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for itemactions `'I'` / `#altadjust` / nobj `"Split N"` / pack-full bump. Fortress `#adjust` without a count does not prove `GC_ECHOFIRST|GC_CONDHIST`. wonky-gold / `check_invent_gold` unhit.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `check_invent_gold` + `adjust_gold_ok` + gold skip-yn (`invent.c:4887–4913` / `:4998` / `:5143`); `invlet_constant` truncate (`:5109–5111`); `IA_ADJUST_OBJ` pushkeys (`iactions.c:191–193`); yn 4th `TRUE` / `custompline(SUPPRESS_HISTORY)` echo (D-1613). Do not glue those into get_count. Do not add `doorganize_core` #2. Do not re-port `get_count`. Do not add `inv_cnt` #3.

Verdict: **ACCEPT-WITH-DEBT**
