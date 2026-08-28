# Review 528 — b2827fe2 — pickup.c use_container 'r' reversed (D-1567)

## Metadata
- Full / short hash: `b2827fe2ac9a22f3c56455b2086e2c5cdf3c2b84` / `b2827fe2`
- Parent: `a70f8d5b` (audit #1960). This file audits **this SHA only** (first of nine `js/` commits since review **527**). Archive **Addressed:** D-1567 `b2827fe2`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 06:59:31 +0200
- D-id: **D-1567**
- Stats: `js/pickup.js` +120 / −17. Band 150–350 (js/ insertions **120**).
- Claims to close: Open `'r'` reversed put-in then take-out after D-1561 stash. Not stash. `reviews/loop-2026-08-15/` has no unpaid reversed-loot Must-fix.
- JS / map: `pickup.js` `use_container` / `explain_container_prompt` / `use_container_traditional_prompt`; `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **527** named `'r'` reversed.

## Intent vs deliverable

Git subject promises: `'r'` puts items in then takes them out (`loot_in_first`), including TRADITIONAL `yn_function` help, instead of treating reversed loot as a no-op.

Pinned C `pickup.c` `use_container` `:2971–3226`. Callers: apply.c `:4277` (`held`, last); pickup.c `do_loot_cont` `:2161` (`cindex < ccount` → `more_containers`). Prompt loop `:3075–3127`. Action flags `:3132–3135`. First-out `:3138–3156`. Put-in / stash `:3167–3186`. Mbag-null `:3187–3189`. Reversed take-out `:3191–3206`. Help `:2910–2940`. `yn_function` 4th arg TRUE is `cmd.c:5470–5583`. `in_or_out_menu` body `:3396–3477` (`csym` misses the split signature; `--callers` hits proto `:47` and call `:3091`; body follows `menu_loot` `:3264–3394`). `traditional_loot` `:3229–3261`. Default `flags.menu_style = MENU_FULL` `options.c:7258`.

```3132:3141:nethack-c/upstream/src/pickup.c
    loot_out = (c == 'o' || c == 'b' || c == 'r');
    loot_in = (c == 'i' || c == 'b' || c == 'r');
    loot_in_first = (c == 'r'); /* both, reversed */
    stash_one = (c == 's');

    /* out-only or out before in */
    if (loot_out && !loot_in_first) {
```

```3187:3206:nethack-c/upstream/src/pickup.c
    if (!gc.current_container)
        loot_out = FALSE;

    /* out after in */
    if (loot_out && loot_in_first) {
        if (!Has_contents(gc.current_container)) {
            pline1(emptymsg);
            if (!gc.current_container->cknown)
                used = 1;
            gc.current_container->cknown = 1;
        } else {
```

Old JS: `loot_out = o|b`; `loot_in = i|b`; comment named `'r'` omit; always `in_or_out_menu` (FULL). Menu already mapped lootabc `'d'` → `'r'`.

The diff **does** set `loot_in_first`, skip first take-out when reversed, put-in, null `loot_out` if `_current_container` gone, then reversed take-out; TRADITIONAL/COMBINATION `pbuf`/`xbuf` + `'?'` → `explain_container_prompt`; default unset `menu_style` to `MENU_FULL` (0 is TRADITIONAL). It **does not** port `traditional_loot` askchain, `in_or_out_menu` `more_containers` `'n'`, `yn_function` `addcmdq`, mbag explosion body, chest trap, Confusion `reverse_loot`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `use_container` `'r'` / `loot_in_first` | C `:3132–3206`, **LIVE this SHA** | put-in then take-out |
| `explain_container_prompt` | C `:2910–2940` static, **LIVE** at C home | skip `" n "` unless `more_containers` |
| `use_container_traditional_prompt` | **CLONE** of inline `:3097–3115` | not a C function; pbuf/xbuf + ESC extras |
| `yn_function` | C `:5470`, **LIVE** import | 4th `addcmdq=TRUE` **OMIT named** |
| `in_or_out_menu` `'r'`/`'d'` | C `:3396–3477`, **LIVE** pre-existing | this SHA only comments the mapping |
| `in_or_out_menu` `'n'` / `more_containers` | **OMIT named** | JS never passes 6th C arg; `do_loot_cont` still `use_container(cobj)` |
| `traditional_loot` | C `:3229–3261`, **OMIT named** | TRADITIONAL loot still `menu_loot_*` |
| `menu_loot` put-in/take-out | **LIVE unchanged** | COMBINATION: C yn then `menu_loot` — match |
| `MENU_FULL` default | C `options.c:7258`, **LIVE** | `?? MENU_FULL` so 0 is not TRADITIONAL |
| `show_nhw_menu_text` | **LIVE** import (was dynamic) | NHW_TEXT help via existing overlay helper |
| chest trap / BoT / mbag explosion body / icebox / `sellobj` / `reverse_loot` | **OMIT named** | |
| `container_contents` | **LIVE unchanged** | dropped inner dynamic `pager`/`objnam` imports |

`node scripts/csym.mjs use_container` → `pickup.c:2971-3226`. `--callers`: apply `:4277`; pickup `:2161`. `explain_container_prompt` → `:2910-2940` (only `use_container:3118`). `yn_function` → `cmd.c:5470-5583`. `traditional_loot` → `:3229-3261`.

RNG: this SHA adds **no** `rn2`/`rnd`/`rn1`/`d`. Loot menus keep pre-existing pickup RNG.

`node scripts/sym.mjs` on new / re-pointed names:

```
explain_container_prompt NOT EXPORTED — 1 LOCAL in js/pickup.js:1109
  => Do NOT write clone #2. C is static in pickup.c — one local is the home.
use_container_traditional_prompt NOT EXPORTED — 1 LOCAL in js/pickup.js:1139
use_container    js/pickup.js:2094   ASYNC
show_nhw_menu_text js/pager.js:408   ASYNC
yn_function      js/getline.js:854   ASYNC
in_or_out_menu   NOT EXPORTED — 1 LOCAL in js/pickup.js:1197
MENU_TRADITIONAL js/const.js:1740
MENU_COMBINATION js/const.js:1741
MENU_FULL        js/const.js:1742
```

`node scripts/imports.mjs --can pickup.js pager.js show_nhw_menu_text`: ALREADY statically imports (this SHA added the edge; it was dynamic). `--can pickup.js getline.js yn_function`: ALREADY. `pager.js` does **not** import `pickup.js`. Cycle-alone is not a blocker; no top-level TDZ read of `show_nhw_menu_text`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates in this SHA’s `js/`. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`'r'` flags. `loot_out`/`loot_in` include `'r'`; `loot_in_first = (c === 'r')`; `stash_one` unchanged. **Match `:3132–3135`.** lootabc `'d'` already returned `'r'` — this SHA **reaches** that arm.

First-out. `loot_out && !loot_in_first` then empty pline/`cknown`/`ECMD_TIME` else `menu_loot` take-out; recalculate `inokay`. **Match `:3138–3156`** except TRADITIONAL → `traditional_loot` (**OMIT named**). `'r'` skips this block. **Match.**

Put-in then mbag gate. loot_in / stash (D-1561) then `if (!current_container) loot_out = false`. **Match `:3187–3189`.** Explosion **body** still named.

Reversed take-out. `loot_out && loot_in_first`: empty uses `used = 1` (`ECMD_TIME` is `0x01`) and `cknown`; else take-out. JS binds `cont = _current_container` after the null gate. **Match `:3191–3206`.**

containerdone. `used && current_container` → `cknown`. **Match `:3209–3216` skip-if-null.** C also `update_inventory()` here — pre-existing omit, not this SHA’s `'r'` claim.

MENU style. C PARTIAL|FULL → `in_or_out_menu`; else yn. JS `use_menu = !(TRADITIONAL || COMBINATION)` so PARTIAL(3) and FULL(2) use the menu. Unset → FULL, not 0. **Match `:3084–3116` + `:7258`.** Empty `!inokay && !outmaybe` → `'b'`. **Match `:3086–3088`.**

TRADITIONAL pbuf. `:o` / `i` / `b` / `rs` / space / `n` / `q` / ` or ?` vs xbuf extras + `\033`. **Match `:3097–3114`.** `cmdassist !== false` ≡ C default On when unset. `yn_function` strips shown-after-ESC but still `resp.includes` extras — hidden `'o'`/`'n'` still accepted, as C intends.

`'?'` / `':'`. Help then continue; look sets TIME if `!cknown`. **Match `:3117–3126`.** Help text rows including skip `" n "` **Match `:2910–2936`.** Windowing is existing `show_nhw_menu_text` (overlay) vs C `NHW_TEXT`; strings match.

Callee closure (`'r'` FULL/PARTIAL arm, contest default). LIVE: flags, `Has_contents`, `menu_loot_*`, `in_or_out_menu` `'r'`, mbag-null, `cknown`. OMIT named: `traditional_loot`; more_containers `'n'`; `addcmdq`; explosion body; chest trap; `reverse_loot`. CLONE: pbuf builder (inline C). STUB: **none** on the default FULL path. COMBINATION: C yn then `menu_loot` — JS matches. TRADITIONAL loot method is the named omit, not a silent stub inside a claimed-live arm. Not “dispatch ported, callee stubbed” for `'r'` under FULL.

## Hallucinations / overclaim

Subject `'r'` put-in then take-out + TRADITIONAL yn help: **true**. D-log “not stash”: **true**. Do **not** stamp “Match C `traditional_loot`.” Do **not** stamp “Match C `in_or_out_menu` Next/`more_containers`.” Do **not** stamp “Match C `yn_function` `addcmdq`.” Do **not** stamp “Match C `do_loot_cont` third arg.” `do_loot_cont` still `use_container(cobj)` so `more_containers` stays false — named, not this SHA’s lie. This is **not** “dispatch ported, callee stubbed” on the FULL `'r'` path: take-out/put-in callees are LIVE.

## Density

One C function’s remaining `'r'` order + the yn/help the TRADITIONAL/COMBINATION prompt needs. +120 JS. Did not glue eat/read/zap NOFLAGS or askchain. §2b OK.

## Branch-by-branch confirm

1. FULL + `'r'` + contents: skip first-out; put-in; take-out. **Match.**
2. FULL + `'r'` + empty bag: skip first-out; put-in; empty reversed-out `used=1`. **Match.**
3. FULL + `'b'`: first-out then put-in; no reversed-out. **Match.**
4. FULL + `'o'` / `'i'` / `'s'`: unchanged vs D-1561. **Match.**
5. FULL + empty + `!inokay` + `!outmaybe`: `'b'` without menu. **Match.**
6. `'?'`: help, loop. **Match.**
7. `'q'`/`'n'`: abort before flags. **Match** (`'n'` still never offered on FULL — named).
8. COMBINATION: yn prompt then `menu_loot`. **Match C** (`traditional_loot` only if TRADITIONAL).
9. TRADITIONAL: yn prompt LIVE; loot via `menu_loot_*` not `askchain`. **Named omit.**
10. Mbag null after put-in: skip reversed-out. **Match** (explosion body named).

## Callers / RNG ledger

C apply held; `#loot` `do_loot_cont` may pass `more_containers`. JS apply path can pass the third arg; floor `#loot` does not. No new RNG. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Static `pager` import replaces a dynamic import; not a cycle dodge.

## Verification

D-log canary **24**/24 (C/JS locus + order; `'b'` empty no take-out after; `'r'` empty round-trip; contents skip first take-out; lootabc `'d'`; TRADITIONAL yn `'r'` + `'?'`; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict. Public `#loot` is usually FULL `'o'`/`'i'`/`'b'` — **admit `'r'` / TRADITIONAL / `'?'` public-unhit.**

## Actionable C-wrongs

None for Must-fix. Named: `traditional_loot` askchain; `in_or_out_menu` more_containers `'n'` (and `do_loot_cont` third arg); `yn_function` addcmdq; mbag explosion body; chest trap; Confusion `reverse_loot`; eat/read/zap/tin NOFLAGS (next Open at the time). Do not add `explain_container_prompt` #2. Do not treat `?? MENU_FULL` as a seed gate — TRADITIONAL is 0.

Verdict: **ACCEPT-WITH-DEBT**
