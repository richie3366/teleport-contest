# Review 473 — 79744185 — region.c any_visible_region + allmain (D-1512)

## Metadata
- Full / short hash: `797441852d0f0c048c600a09f273e1a543f796f1` / `79744185`
- Parent: `85c341a7` (D-1511). This file audits **this SHA only** (ninth of nine `js/` commits since review **464**). Archive **Addressed:** D-1512 was missing the short hash; this audit fills `79744185`. HEAD of this audit window.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-26 01:19:12 +0200
- D-id: **D-1512**
- Stats: 10 files, +122 / −38 — `js/region.js` +22 / −3, `js/allmain.js` +5 / −4. Band 150–350.
- Claims to close: Open `display.c` `any_visible_region` (named from D-1493 / review **454**). C lives in `region.c`. Not Hallu/Warn_of_mon. `reviews/loop-2026-08-15/` has no unpaid gas-cloud Must-fix.
- JS / map: `region.js` `any_visible_region`; `allmain.js` once-per-input. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **454** named `any_visible_region` after Warn_of_mon.

## Intent vs deliverable

Git subject promises: once-per-input `see_monsters` also refreshes when a visible gas cloud is on the level, not only when telepat or Warning is on.

Pinned C `region.c` `any_visible_region` `:658–670`: `for (i = 0; i < svn.n_regions; i++)` skip `!visible || ttl == -2L`, else `TRUE`; else `FALSE`. Same skip as `visible_region_at` `:722–724` and `reg_damg` `:653`. Caller `allmain.c` `:454–468`: `if (!context.mv || Blind)` then Hallu → four callees; `else if (Unblind_telepat || Warning || Warn_of_mon || any_visible_region())` → `see_monsters`. Second C caller `timeout.c` `wiz_timeout_queue` `:2112` → `visible_region_summary` (named). `display.c` `show_region` `:732–735` paints `reg->glyph` (named).

Old JS: Hallu / Warn_of_mon wired (D-1493); comment named the omit.

The diff **does** export that scan and OR it last in the else-if. Hallu arm unchanged. It **does not** port `visible_region_summary` or `show_region`. Named (`sym` NOT FOUND). Queue said `display.c`; C is `region.c`. Honest.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `any_visible_region` | C `:660–669`, **LIVE this SHA** | skip matches `visible_region_at` |
| allmain else-if OR | C `:462–468`, **LIVE this SHA** | last term; short-circuit |
| `see_monsters` | C display.c, **LIVE** | D-1493 |
| `Warn_of_mon` / `Warning` / Unblind_telepat | C youprop.h, **LIVE** | D-1493 |
| `visible_region_at` | C `:717–728`, **already live** | same skip |
| `visible_region_summary` | C `:674`, **OMIT named** | **NOT FOUND** |
| `show_region` | C `:732`, **OMIT named** | **NOT FOUND** |
| worm `see_wsegs` / SPFX_WARN | C, **OMIT named** | D-1493 leftovers |

`node scripts/sym.mjs any_visible_region visible_region_at see_monsters Warn_of_mon visible_region_summary show_region`:

```
any_visible_region js/region.js:95   sync
visible_region_at js/region.js:78   sync
see_monsters     js/display.js:2873   sync
Warn_of_mon      js/display.js:307   sync
visible_region_summary NOT FOUND in js/**
show_region      NOT FOUND in js/**
```

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none (`see_monsters` Hallu path unchanged). **Public-unhit** until a non-Hallu input with a live cloud and no telepat/Warning/Warn_of_mon.

## C ↔ JS fidelity

Pinned scan (C `ttl == -2L`; JS `=== -2` — expire_gas_cloud already writes that sentinel):

```660:669:nethack-c/upstream/src/region.c
any_visible_region(void)
{
    int i;

    for (i = 0; i < svn.n_regions; i++) {
        if (!gr.regions[i]->visible || gr.regions[i]->ttl == -2L)
            continue;
        return TRUE;
    }
    return FALSE;
}
```

JS `for (const reg of game.regions || [])` with the same `continue` then `return true`. **Match.** First hit, not a count. Empty / all-invisible / all-expiring → FALSE. ttl **0** (due next turn) and ttl **−1** (forever) still TRUE. **Match C `-2L` only.** Dense-array convention matches live `visible_region_at`.

allmain. Nested `Hallucination` then else-if four or-terms. JS `:976–988` Hallu four callees; else `Unblind_telepat || Warning(u) || Warn_of_mon() || any_visible_region()`. **Match `:454–468`.** Short-circuit: telepat/Warning/Warn_of_mon skips the region walk. **Match.** Hallu arm does **not** extra-call `any_visible_region` (already `see_monsters`). **Match.** `!context.mv || Blind` gate unchanged.

`see_monsters` is LIVE, not a stub. This OR does not paint cloud glyphs. C `display.c` `_map_location` `:470–471` is `if (show && !Blind && visible_region_at)` then `show_region` (glyph overlay). Named omit. The C comment at `:463–466` is walking-away unmap of a monster seen beside a cloud. `timeout.c` `:2112–2113` is the `#timeout` listing, not this OR.

Callee closure (else-if arm). LIVE: `any_visible_region`, `see_monsters`, `Warn_of_mon`, `Warning`, Unblind_telepat. OMIT named: summary / `show_region` / `see_wsegs`. STUB: none. **Arm may ship.**

## Hallucinations / overclaim

Subject gas-cloud `see_monsters` refresh: **true** for the once-per-input else-if. **False until named** for wizard `#timeout` Visible-regions listing and for cmap overlay via `show_region`. Stamping **Addressed:** D-1512 for **`:658–670` + `:462–468`** is fair. Do **not** stamp “Match C `show_region`.” Do **not** stamp “Match C `display.c` `any_visible_region`” (wrong file; C is `region.c`). Do **not** treat fortress PASS as a gas-cloud walk-away. This is **not** “dispatch ported, callee stubbed.”

## Density

One C function (11 lines) plus the one allmain conjunct that named it. ~27 JS. Playbook §2b (C is that small). Did not glue SPFX_WARN. Acceptable.

## Branch-by-branch confirm

1. No regions: FALSE, else-if needs telepat/Warning/Warn_of_mon. **Match.**
2. Invisible or ttl −2 only: FALSE. **Match `:665`.**
3. First live `visible && ttl != -2`: TRUE. **Match.**
4. ttl 0 / −1 live: TRUE. **Match.**
5. Skip-then-hit in array order: **Match.**
6. Hallu: objects/traps/`swallowed`; no extra region scan. **Match.**
7. Telepat true: short-circuit, no scan. **Match.**
8. `wiz_timeout_queue` still unnamed. Named.
9. `show_region` still unnamed. Named.
10. **Public-unhit** of the new OR.

## Callers / RNG ledger

C: `allmain.c` `:467` (wired); `timeout.c` `:2112` (named). JS: allmain only. No `rn2` in the scan. `show_region` is not a caller of `any_visible_region`; it is a `visible_region_at` overlay.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE.

## Verification

D-log: private canary **23**/23 (empty / invisible / ttl−2 / live / ttl 0 / ttl −1 / skip-then-hit / not geometry; C/JS grep; allmain OR; timeout named; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** of a live cloud without telepat/Warning/Warn_of_mon. seed0383 Hallu is not this OR.

## Actionable C-wrongs

None that belong on Must-fix. The scan and allmain OR match C branch-for-branch.

Remaining named (map / Open): timeout `visible_region_summary`; display `show_region`; worm `see_wsegs`; SPFX_WARN conferral / MATCH_WARN (next Open). Do not Must-fix “queue said `display.c`.” Do not Must-fix “should call `any_visible_region` in the Hallu arm.”

Verdict: **ACCEPT-WITH-DEBT**
