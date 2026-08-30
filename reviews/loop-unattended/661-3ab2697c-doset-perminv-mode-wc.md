# Review 661 — 3ab2697c — options.c doset CompOpt perminv_mode + wc skip (D-1700)

## Metadata
- Full / short hash: `3ab2697c1170d4a1a2ecb292556e78a0d6b81c63` / `3ab2697c`
- Parent: `2dc13393` (docs; JS parent `736b74ec` D-1699). This file audits **this SHA only** (eighth of fifteen `js/` commits since review **653**). Archive **Addressed:** D-1700 `3ab2697c`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-30 03:35:21 +0200
- D-id: **D-1700**
- Stats: `js/options.js` +146/−15. Total `js/` insertions **146** <250. Band **150–350**.
- Claims to close: Open mO `perminv_mode` compound row. Not `optfn_perminv_mode` OPTIONS= (already live). Not wizmgender. `reviews/loop-2026-08-15/` has no unpaid doset Must-fix.
- JS / map: `options.js` `doset` / `wc_supported`. `c-js-map/startup.md`.
- Prior reviews: D-1661 named letter fortress; **622** related optfn.

## Intent vs deliverable

Git subject promises: `perminv_mode` is a CompOpt row gated by `wc_supported`, instead of omitting it as a letter fortress after D-1661. Body: contest tty lacks `WC_PERM_INVENT`, so the row stays hidden and seed0007 letters do not shift.

`node scripts/csym.mjs wc_supported` → `options.c:9911–9921`. `--callers` include `doset` `:8871` / `:8847` / `:8888`. `doset` CompOpt loop `:8865–8877`. `doset_add_menu` `:9016–9065`. `wc_options[]` `:9787–9822`. `optfn_perminv_mode` get_val `:3114–3132`. `tty_procs.wincap` `wintty.c:98–110` (`!TTY_PERM_INVENT`).

```8867:8877:nethack-c/upstream/src/options.c
        for (i = 0; (name = allopt[i].name) != 0; i++) {
            if (allopt[i].opttyp != CompOpt) continue;
            if ((int) allopt[i].setwhere == pass) {
                if ((is_wc_option(name) && !wc_supported(name))
                    || (is_wc2_option(name) && !wc2_supported(name)))
                    continue;
                doset_add_menu(...);
            }
        }
```

```9787:9793:nethack-c/upstream/src/options.c
    { "perm_invent", WC_PERM_INVENT },
    { "perminv_mode", WC_PERM_INVENT }, /* shares WC_PERM_INVENT */
```

Parent: hardcoded compounds **without** `perminv_mode`; handler already wired. The diff **does** C-order CompOpt row (`get_val` + handler) after `paranoid_confirmation` / before `petattr`; `doset_add_menu`; `wc_options` table matching C; `is_wc_option`/`wc_supported`; skip on bools and compounds; contest tty wincap `WC_COLOR|HILITE_PET|INVERSE|EIGHT_BIT_IN` so `!WC_PERM_INVENT` hides the row. It **does not** walk live `allopt[]`. Named. It **does not** port `wc2_supported` skip. Named. It **does not** port `optfn_boolean` perm_invent `can_set`. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `wc_options[]` | LIVE table | C `:9787–9821` including shared `WC_PERM_INVENT` |
| `is_wc_option` / `wc_supported` | LIVE | same-file statics |
| `tty_procs_wincap` | LIVE | `!TTY_PERM_INVENT` |
| `doset_add_menu` | LIVE subset | indexoffset 0 non-selectable |
| `optfn_perminv_mode` get_val | LIVE | already exported; display helper |
| `allopt[]` CompOpt walk | CLONE | hardcoded `compounds[]` |
| `wc2_supported` | OMIT named | |
| perm_invent `can_set` | OMIT named | |

`node scripts/sym.mjs`:

```
doset            js/options.js:2099   ASYNC — await required
wc_supported     NOT EXPORTED — 1 LOCAL js/options.js:514
is_wc_option     NOT EXPORTED — 1 LOCAL js/options.js:506
doset_add_menu   NOT EXPORTED — 1 LOCAL js/options.js:1958
optfn_perminv_mode js/options.js:609   sync
```

No clone → import. Do **not** add `wc_supported` #2. Do **not** add `doset_add_menu` #2. FORCE/DIAG/`getRngLog`/`fastforward`: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Table / skip.** C `wc_options[]` names and bits including `perminv_mode` sharing `WC_PERM_INVENT`. JS the same 32 rows. `wc_supported`: `wincap & bit`. Default wincap is contest tty (`wintty.c:110` without `TTY_PERM_INVENT`). **Match `:9911–9921` and `:98–110`.** `perminv_mode` is a wc option ⇒ skipped. seed0007 letters **Match** the fortress D-1661 was protecting, now for C’s reason.

**CompOpt row.** C walks `allopt` CompOpt `set_in_game`. JS inserts `{ name: 'perminv_mode', get_val, handler: true }` in the hardcoded list at the C position (after paranoid, before petattr). `doset_add_menu` uses `get_val()` not a stale string. Handler already `optfn_perminv_mode`. **Match the row C would add if wincap had the bit.** Contest path never shows it. **Match.**

**`doset_add_menu`.** C `:9038–1044` `optfn(..., get_val)` then format; `indexoffset==0` ⇒ `any.a_int=0` non-selectable. JS `indexoffset===0` indent, `selectable: false`. **Match the menu identity.** Full fmtstr/idx named.

**Bool skip.** C `:8847` same wc skip on BoolOpt. JS now skips `DOSET_BOOL_NONMOD` / mod list. `perm_invent` is a wc option too — also hidden on contest tty. C the same.

Callee closure (perminv CompOpt arm). LIVE: `wc_supported`, `is_wc_option`, `optfn_perminv_mode`, `doset_add_menu`. CLONE: `compounds[]` vs `allopt`. OMIT named: `wc2_supported`; `can_set`; PREFIXES. STUB: **none** — the row is real, just skipped. Combined-arm ships. Not “dispatch stubbed.”

**BoolOpt skip sites.** C also skips at `:8523` (doset_simple-ish), `:8589`, `:8847` (full doset BoolOpt), `:8871` CompOpt, `:8888` OthrOpt, `:9485` parse. JS `doset_skip_unsupported` on nonmod bools, mod bools, and compounds. It does **not** yet skip wc2 (`petattr` is in the contest list anyway). `perm_invent` bool is a wc option — hidden on contest tty like C. **Match those doset loops.** `windowprocs_wincap` reads `game.windowprocs.wincap` if present; default contest tty. A test that stuffed `WC_PERM_INVENT` into `windowprocs` would **show** the row — that is C, not a seed0007 special case.

**`optfn_perminv_mode` get_val.** C `:3117` `perminv_modes[iflags.perminv_mode][2]` then Off suffix when `!perm_invent`. JS already had that helper; this SHA only **displays** it on the CompOpt row. Handler `do_handler` was live. **Match get_val**, not a new optfn.

**Letter fortress.** D-1661 omitted the row so pickup_types letters stayed put. C never shows the row on contest tty, so letters **Match** without a seed-named skip. Do **not** insert the row without `wc_supported`.

**`is_wc_option`.** C `strcmp` on `wc_options[].wc_name`. JS `===`. Table order **Match** `:9787–9821` including `use_inverse` → `WC_INVERSE`. **Match.** No RNG.

## Hallucinations / overclaim

Subject “CompOpt row gated by wc_supported”: **true.** “instead of omitting as letter fortress”: **true** — the row exists in the list; skip is C’s wincap, not a seed0007 special case. Do **not** stamp “Match C `allopt[]` walk.” Do **not** stamp “Match C `wc2_supported`.” Do **not** stamp “Match C perm_invent `can_set`.” Do **not** set `WC_PERM_INVENT` on contest tty (would shift seed0007). Do **not** re-port D-1661 pickup_types letters.

## Density

§2b: one `doset` CompOpt + the wc skip that makes it C-faithful. Related. +146.

## Verification

D-log: save-oracle probe skip; green+strict seed8000/0900; cohort 9/9 including **seed0007 302/302**. Public mO **is** hit. The new row is **public-unhit** (hidden). That is the C contest path. seed0007 letters unchanged.
Contest tty `!WC_PERM_INVENT`.

## Actionable C-wrongs

None for Must-fix. Named: `wc2_supported` skip (`petattr`/`statushilites`); perm_invent `can_set`; full `allopt[]`; PREFIXES; wizmgender (D-1701). Do **not** add `wc_supported` #2. Do **not** add `wc_options` #2. Do **not** enable `TTY_PERM_INVENT` to “show the row.” Do **not** re-port D-1661. No RNG in `wc_supported`.

Verdict: **ACCEPT-WITH-DEBT**
