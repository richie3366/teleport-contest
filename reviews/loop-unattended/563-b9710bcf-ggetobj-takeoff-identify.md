# Review 563 — b9710bcf — invent.c ggetobj takeoff/identify (D-1602)

## Metadata
- Full / short hash: `b9710bcfa698b660ea27e68f9138c4918a20c2ad` / `b9710bcf`
- Parent: `fd0ada3f` (D-1601). This file audits **this SHA only** (ninth of nine `js/` commits since review **554**). Archive **Addressed:** D-1602 — fill short hash `b9710bcf` (was missing).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 23:36:01 +0200
- D-id: **D-1602**
- Stats: `js/invent.js` +246/−13, `js/do_wear.js` +149/−9, `js/pickup.js` +33/−19, `js/shk.js` +1/−12. Band **150–350**; js/ insertions **429** so ceiling **450**.
- Claims to close: Open ggetobj takeoff/identify after D-1581. Not `take_off` occupation. Not `menu_remarm`. Not ggetobj drop. `reviews/loop-2026-08-15/` has no unpaid ggetobj Must-fix.
- JS / map: `invent.js` `ggetobj`; `pickup.js` `askchain`; `do_wear.js` `select_off` / `doddoremarm`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **542** / **551** / **553** named TRADITIONAL ggetobj identify / takeoff.

## Intent vs deliverable

Git subject promises: traditional takeoff and identify walk the pack through `askchain` instead of only the full menu path.

Pinned C `invent.c` `ggetobj` `:2199–2369`. `taking_off` `:1671–1675`. `askchain` `:2376–2541` (takeoff `is_worn`, ident `not_fully_identified`, yn `ynaq` when takeoff/ident, ident `'q'` `cnt=-1`, skip `"That was all."` when takeoff). `identify_pack` `:2734–2742`. `do_wear.c` `doddoremarm` `:3021–3057`; `select_off` `:2694–2821`. `--callers ggetobj`: drop `:936`/`:1027` (named); takeoff `:3038`/`:3116`; identify `:2736`.

```2734:2742:nethack-c/upstream/src/invent.c
        if (flags.menu_style == MENU_TRADITIONAL)
            do {
                n = ggetobj("identify", identify, id_limit, FALSE, ...);
                if (n < 0) break;
            } while ((id_limit -= n) > 0);
        if (n == 0 || n < -1)
            menu_identify(id_limit);
```

Old JS: `askchain` loot-only; `doddoremarm` ECMD_OK when worn; `identify_pack` always `menu_identify`; shk local `count_unpaid`.

The diff **does** live `ggetobj` getlin/`ilets`/`'i'` peek, takeoff `removeables`, `askchain` takeoff/ident filters, TRADITIONAL `identify_pack` + `doddoremarm`+`select_off` mask bits, `count_unpaid` at invent C home. It **does not** call `take_off()` after mask, `menu_remarm`, ggetobj drop, `better_not_take_that_off`, `clear_bypasses`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `ggetobj` | C `:2199–2369`, **LIVE this SHA** | |
| `taking_off` | C `:1671–1675`, **LIVE this SHA** | |
| `askchain` takeoff/ident | C `:2442–2533`, **LIVE this SHA** | still pickup.js |
| `select_off` | C `:2694–2821`, **LIVE this SHA** (local) | C is `staticfn` |
| `identify` via askchain | C identify_pack, **LIVE** | |
| `count_unpaid` | C `:3525–3538`, **LIVE this SHA** | shk clone deleted |
| `count_buc` + filter | C `:3547–3575`, **LIVE this SHA** | priest `bknown` |
| `collect_obj_classes` | C pickup, **LIVE** | now exported |
| `ckvalidcat` / `ckunpaid` | C `:2135–2146`, **LIVE this SHA** | |
| `display_inventory` `'i'` | C `:2279–2283`, **LIVE** ESC abort | |
| `cursed_check` | C `cursed` `:1892–1917`, **LIVE** | Glib retry named |
| `take_off` occupation | C `:2899–2987`, **OMIT named** | mask set, never consumed |
| `menu_remarm` | C `:3089–3138`, **OMIT named** | |
| ggetobj drop | C `do.c:936`, **OMIT named** | |
| `better_not_take_that_off` | C select_off gloves, **OMIT named** | |
| `clear_bypasses` | C askchain `:2539`, **OMIT named** | |
| `wearing_armor` | C `:2148–2153`, **CLONE ×2** | do_wear + invent |

`node scripts/csym.mjs ggetobj` → `:2199-2369`. `select_off` → `:2694-2821`. `doddoremarm` → `:3021-3057`. `taking_off` → `:1671-1675`. `cursed` → `:1892-1917`. `count_buc` → `:3547-3575`. `askchain` is `extern` (body `invent.c:2376-2541`; `csym` name miss is the proto).

RNG: none in ggetobj/askchain control. yn counts are not `rn2`. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names (shk `count_unpaid` local → invent export):

```
ggetobj          js/invent.js:520   ASYNC — await required
taking_off       js/invent.js:466   sync
count_unpaid     js/invent.js:474   sync
count_buc        js/pickup.js:216   sync
collect_obj_classes js/pickup.js:249   sync
askchain         js/pickup.js:2378   ASYNC — await required
select_off       NOT EXPORTED — 1 LOCAL (do_wear.js:1210). Do NOT write clone #2.
doddoremarm      js/do_wear.js:1331   ASYNC — await required
identify_pack    js/invent.js:1554   ASYNC — await required
display_inventory js/invent.js:2203   ASYNC — await required
is_worn          js/invent.js:460   sync
not_fully_identified js/invent.js:1389   sync
cursed_check     js/do_wear.js:205   sync
wearing_armor    NOT EXPORTED — 2 LOCAL (do_wear.js:1195, invent.js:4246). Do NOT write clone #3.
```

`--can invent.js pickup.js askchain`: ALREADY. `--can do_wear.js invent.js ggetobj`: ALREADY. `--can shk.js invent.js count_unpaid`: ALREADY (re-point, not a new cycle). Do **not** add `select_off` #2. Do **not** add `ggetobj` in `do_wear.js`. Do **not** restore shk `count_unpaid`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

ggetobj envelope. Empty invent You have nothing + `ALL_FINISHED`. **Match `:2215–2220`.** `taking_off` → `is_worn`; `"identify"` → `not_fully_identified`. **Match `:2226–2232`.** `ilets` classes + space/`u`/BUCXP/`P`/`a`/`i`/`m` unless combo. **Match `:2234–2258`.** ident zero classes → `-1`. **Match `:2237–2238`.** getlin; ESC 0; `'i'` `display_inventory` ESC abort else re-prompt. **Match `:2261–2283`.** Takeoff `extra_removeables` from weapon slots then Not applicable / noarmor / not wielding / rings / amulet / blindfold. **Match `:2286–2326`.** Parse `a`/`A`/`u`/BUCXP/`m`/class. **Match `:2329–2349`.** `'m'` → `-2`/`-3`. **Match `:2352–2355`.** Else `askchain`. combo+allflag `ALL_FINISHED`. **Match `:2358–2368`.** `ALL_FINISHED=0x01`. **Match.** `MENU_TRADITIONAL=0`. **Match.**

askchain. takeoff skip `!is_worn`; ident skip identified. **Match `:2442–2445`.** yn `ynaq` when takeoff/ident/`quan<2`. **Match `:2478–2479`.** ident `'q'` `cnt=-1`. **Match `:2520–2523`.** `"That was all."` skipped when takeoff; `"No applicable objects."` when `!dud && !cnt`. **Match `:2530–2533`.** `clear_bypasses` still bypass-clear local. Named.

identify_pack. TRADITIONAL do-ggetobj while `id_limit`; `n<0` break; `n==0 \|\| n<-1` `menu_identify`. **Match `:2734–2742`.** Identify callee is live `identify`. Combined-arm may ship.

select_off. Ring stuck / welded / Glib gloves; glove weld/Glib; boot trap/infloor; suit cloak/shirt/bimanual; quiver/swapwep skip curse else `cursed`; then OR mask bits. **Match `:2705–2818`.** `RING_ON_PRIMARY` = ULEFTY ? uleft : uright. **Match `you.h:565–566`.** `better_not_take_that_off`, `gloves_simple_name`, `cloak_simple_name`, `surface()` noun named. Always returns 0. **Match.**

doddoremarm. Continue-if-busy (occupation deferred); empty worn pline; TRADITIONAL `ggetobj("take off", select_off)`; if mask set `disrobing` vs `disarming` via `mask & ~W_WEAPONS`. **Match `:3026–3050` except `take_off()` / `set_occupation`.** Those callees are **named omits**, not silent stubs claimed live. Default `MENU_FULL` still skips ggetobj (C then `menu_remarm`, also named). Combo caller `:3116` (`ggetobj` TRUE + `ALL_FINISHED`) is that same named `menu_remarm` peel. Public `'A'` unhit.

`mx` 0: C `--mx == 0` never fires on the first item (`mx` becomes `-1`); JS same, so identify/takeoff are unlimited unless `identify_pack` passes `id_limit`. **Match.** Combo omits `'m'` from `ilets`. **Match `:2257–2258`.**

`count_unpaid` / `count_buc` priest coins. **Match `:3525–3575`.** shk now imports the invent export (C home). Re-point, not a second body. C `count_buc` walks `nobj`; JS `walk_obj_list` covers invent Array and nobj.

Callee closure (TRADITIONAL identify). LIVE: `ggetobj`, `askchain`, `identify`, `not_fully_identified`, `getlin`, `yn_function`. STUB: **none**. Takeoff TRADITIONAL: LIVE walk/`select_off`; OMIT named `take_off`. Combined-arm may ship **as a walk**, not as armor coming off. Not a silent “Match C `take_off`.”

## Hallucinations / overclaim

Subject askchain instead of only FULL menu: **true when `menu_style==TRADITIONAL`.** Identify actually IDs items. Takeoff **sets `takeoff.mask` and returns**; C then `take_off()`. D-log names that. Do **not** stamp “Match C `take_off` occupation / `do_takeoff`.” Do **not** stamp “Match C `menu_remarm`.” Do **not** stamp “Match C ggetobj drop (`do.c:936`).” Do **not** stamp “Match C `better_not_take_that_off`.” Do **not** stamp “Match C `clear_bypasses`.” Public suite is not MENU_TRADITIONAL `'A'` / limited-id.

## Density

One `ggetobj` envelope + the two C callers in the Open line + the askchain arms those callers need. +429 JS. Did not glue drop/`menu_remarm`/`take_off`. §2b OK (ceiling 450).

## Branch-by-branch confirm

1. TRADITIONAL identify: getlin → askchain → `identify`. **Match.**
2. ident `'q'` → `-1` stop. **Match.**
3. Takeoff skip `"That was all."` **Match.**
4. Takeoff `is_worn` filter + `select_off` mask. **Match.**
5. `take_off()` after mask. **Named.**
6. drop / `menu_remarm` / FULL `'A'`. **Named.**

## Callers / RNG ledger

Wired: `identify_pack`, `doddoremarm`. Unwired: `do.c` drop; `menu_remarm` combo ggetobj `:3116`. No extra `rn2`. No seed gate.

C `fn` for takeoff is `select_off` (always 0) so askchain `cnt` stays 0 unless identify; ident `'q'` still forces `-1`. **Match.**

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. `count_unpaid` re-point to invent is the C home — do not restore the shk clone. Do not add `select_off` #2. Do not add `wearing_armor` #3 (this SHA added a second local; import invent’s if a third site appears). Do not call `take_off` from a seed.

## Verification

D-log private canary **17**/17; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for TRADITIONAL `'A'` / limited identify. A FULL-menu session does not falsify ggetobj. `take_off` unhit (named).

## Actionable C-wrongs

None for Must-fix. Named: `take_off` `:2899` + continue `set_occupation`; `menu_remarm`; ggetobj drop; `better_not_take_that_off`; `gloves_simple_name` / `cloak_simple_name` / `surface`; Glib `cursed` retry; `clear_bypasses`; combo `ggetobj` `:3116`. Do not add `select_off` in `invent.js`. Do not treat mask-without-`take_off` as a finished `'A'`.

Verdict: **ACCEPT-WITH-DEBT**
