# Review 537 — 7131dc25 — region.c add_region / remove_region / expire per-cell block (D-1576)

## Metadata
- Full / short hash: `7131dc25a836bda84e970b305963a67ccdf56e69` / `7131dc25`
- Parent: `8f057c25` (audit 528–536 QUALITY-RISK on D-1574). This file audits **this SHA only** (first of nine `js/` commits since review **536**). Archive **Addressed:** D-1576 `7131dc25`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 09:32:02 +0200
- D-id: **D-1576**
- Stats: `js/region.js` +122 / −46. Band 150–350 (js/ insertions **76**).
- Claims to close: Must-fix review **535** (one-corner `recalc_block_point` after D-1574 broke seed4500). Not `nv_range`. Not `mimic_light_blocking`. `reviews/loop-2026-08-15/` has no unpaid region Must-fix.
- JS / map: `region.js` `add_region`/`make_gas_cloud`/`remove_region`/`expire_gas_cloud`; `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **535** Actionable #1 (QUALITY-RISK). Review file already stamped `**Addressed:** D-1576 7131dc25`.

## Intent vs deliverable

Git subject promises: every visible gas cell runs `block_point`, and remove/expire unblocks per cell instead of one-corner `recalc` after D-1574.

Pinned C `region.c` `add_region` `:283–338` (push; bounding-box scan; `m_at` + `add_mon_to_reg`; `if (reg->visible)` `block_point` every inside cell then `cansee` `newsym` on the box; hero_inside). `make_gas_cloud` `:1180–1205` (`add_region` after tags). `remove_region` `:343–386` (drop before newsym; `ttl=-2L`; two-pass `!does_block` `unblock_point` then `newsym`; pass 1 `u.uinwater=0`; Blind skip pass 2; `free_region`). `expire_gas_cloud` `:1045–1087` (thick `damage>=5` half + `ttl=2` FALSE; thin two-pass then TRUE). `visible_region_at` skips `ttl==-2`.

```326:338:nethack-c/upstream/src/region.c
            if (reg->visible) {
                if (is_inside)
                    block_point(i, j);
                if (cansee(i, j))
                    newsym(i, j);
            }
        }
    /* Check for player now... */
    if (inside_region(reg, u.ux, u.uy))
        set_hero_inside(reg);
    else
        clear_hero_inside(reg);
}
```

```375:385:nethack-c/upstream/src/region.c
                        if (pass == 1) {
                            if (!does_block(x, y, &levl[x][y]))
                                unblock_point(x, y);
                        } else { /* pass==2 */
                            if (cansee(x, y))
                                newsym(x, y);
                        }
```

Old JS: `make_gas_cloud` pushed + `m_at` scan then `recalc_block_point(rects[0])`; `remove_region` same one-corner; `expire_gas_cloud` pass 1 was an empty comment. After D-1574 that corner-only fill/dig was the seed4500 FAIL (RNG 88490/108275).

The diff **does** add live `add_region`, move hero_inside into it, per-cell `block_point`/`unblock_point`, two-pass `newsym` / dissipation counts, pass-1 `uinwater=0`. It **does not** port `free_region` teardown, `create_force_field` (`#if 0` C `:1028`), or `display.c` `mimic_light_blocking`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `add_region` | C `:283–338`, **LIVE this SHA** | one local; C realloc → JS `push` |
| `make_gas_cloud` → `add_region` | C `:1195`, **LIVE this SHA** | was inline + one-corner |
| `remove_region` two-pass | C `:343–386`, **LIVE this SHA** | `ttl=-2`; splice vs C swap-last (pre-existing) |
| `expire_gas_cloud` pass 1 | C `:1071–1072`, **LIVE this SHA** | was empty comment |
| `block_point` / `unblock_point` / `does_block` | **LIVE** D-1557/D-1574 | imported |
| `newsym` / `cansee` | **LIVE** | imported this SHA for add/remove |
| `m_at_xy` | **CLONE** of `m_at` | body-matched; `--can` SAFE (not TDZ) |
| `region_bounding_box` | **CLONE** of `reg->bounding_box` | union of `rects` |
| `visible_region_at` `ttl===-2` | **LIVE** pre-existing | |
| `free_region` | **OMIT named** | C `:385`; JS GC |
| `create_force_field` | **OMIT named** | C `#if 0` |
| `mimic_light_blocking` | **OMIT named** | still `recalc` |

`node scripts/csym.mjs add_region` → `:283-338`. `--callers`: proto `:29`; `create_force_field` `:1028` (`#if 0`); `make_gas_cloud` `:1195`. `remove_region` → `:343-386`; `--callers`: proto `:30`; `run_regions` `:429`; `:887`; `:1396`. `expire_gas_cloud` → `:1045-1087`; `--callers`: proto `:18` (callback table). `make_gas_cloud` → `:1180-1205`; `--callers`: proto `:43`; create `:1307` / selection `:1334`. `block_point` `--callers` includes `region.c:328`.

RNG: **none** in add/remove/expire vision loops. Thick-cloud half is integer `/2`. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
add_region       NOT EXPORTED — 1 LOCAL in js/region.js:435
  => Do NOT write clone #2.
remove_region    NOT EXPORTED — 1 LOCAL in js/region.js:505
expire_gas_cloud NOT EXPORTED — 1 LOCAL in js/region.js:736
make_gas_cloud   NOT EXPORTED — 1 LOCAL in js/region.js:465
block_point      js/vision.js:379   sync
unblock_point    js/vision.js:389   sync
does_block       js/vision.js:134   sync
newsym           js/display.js:2822   sync
m_at             js/mon.js:1230   sync
  !! ALSO 4 LOCAL CLONE(S) — dig/shknam/teleport/uhitm
  => Do NOT write clone #5. region.js already has m_at_xy.
recalc_block_point js/vision.js:399   sync  (retired at these three sites)
free_region      NOT FOUND in js/**
```

`--can region.js vision.js block_point` / `unblock_point` / `does_block`: ALREADY imported. `--can region.js display.js newsym`: ALREADY. `--can region.js mon.js m_at`: **SAFE** (hoisted function; 83-module SCC is not a TDZ). The file comment “avoid mon.js cycle” is **not** a cycle-forced keep. Clone body equals exported `m_at` (`level_mon_at` then fmon skip steed/dead/OFFMAP). Verified CLONE for this SHA’s scan, not a Must-fix divergence.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in the `js/` hunk. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

`add_region`. Push; box scan; `!isok` continue; inside → `m_at` + `add_mon_to_reg`; if visible, inside → `block_point(i,j)` **and** `cansee` → `newsym` even for non-inside box cells; then hero_inside. C `#if 0` worm-tail skip omitted (C leaves tails in). JS box is `region_bounding_box` (union of `rects`) not a stored `bounding_box` field — same envelope C writes at create. **Match `:304–338` except alloc.** `make_gas_cloud` now tags then `add_region` then envelop. **Match `:1188–1204`.** Extra JS `create_region` defaults in `make_gas_cloud` are pre-existing, not this SHA’s miss.

`remove_region`. Drop from the list first; `ttl=-2` so `visible_region_at` skips; if visible, Blind? 1 : 2 passes; pass 1 `uinwater=0` then `!does_block` → `unblock_point`; pass 2 `cansee` → `newsym`; restore `uinwater`. **Match `:354–384`.** `does_block(x,y, game.level.at)` vs C `&levl[x][y]`; JS `does_block` already `lev ?? level.at`. **Match the C call.** `free_region` named. Splice vs C swap-with-last is pre-existing order drift, not introduced here.

`expire_gas_cloud`. `damage>=5` half + `ttl=2` return false. **Match `:1056–1061`.** Thin: two-pass; pass 1 `!does_block` `unblock_point` **while still listed**; pass 2 `!uswallow` then `u_at` `gas_cloud_diss_within` else `cansee` increment `gas_cloud_diss_seen`. **Match `:1067–1084`.** Pass 1 is a **C no-op** while gas is still visible (`does_block` return 2); real unblock is `remove_region` after `ttl=-2`. That is C, not a leftover empty comment.

Callee closure (claimed add/remove/expire arms). LIVE: `block_point`, `unblock_point`, `does_block`, `cansee`, `newsym`, `inside_region`, `add_mon_to_reg`, `set_hero_inside`/`clear_hero_inside`, `u_at`, `Blind`. CLONE verified: `m_at_xy` ≡ `m_at`. OMIT named: `free_region`. STUB: **none**. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject per-cell `block_point` / remove-expire `unblock_point` instead of one-corner recalc: **true.** D-log seed4500 108275/108275 + 1814/1814: **this SHA’s claimed recovery of the review-535 FAIL** — do not treat leftover cadence 43/44 at `d13bf416` as this SHA. Do **not** stamp “Match C `free_region`.” Do **not** stamp “Match C `mimic_light_blocking`.” Do **not** stamp “Match C every `unblock_point` site” (dokick/lock/zap/dig still `recalc_block_point` stand-ins; those C sites are mixed `block_point`/`unblock_point`/`recalc` — named elsewhere, not this Must-fix). Do **not** stamp “`m_at_xy` is cycle-forced”; `--can` is SAFE.

## Density

Must-fix **535** alone. One C `region.c` family. +76 JS. Did not glue `nv_range` / `mk_mplayer`. §2b OK.

## Branch-by-branch confirm

1. Visible 3-cell gas, not only corner: `block_point` each inside cell. **Match.**
2. Visible box cell outside `inside_region`: no `block_point`; `cansee` still `newsym`. **Match.**
3. Invisible region: no `block_point`/`newsym`. **Match.**
4. `!isok` cell: continue before occupancy/vision. **Match.**
5. Monster inside: `add_mon_to_reg`. **Match** (via `m_at_xy` clone).
6. Hero dest inside: `set_hero_inside` else clear. **Match.**
7. Remove visible, not Blind: pass 1 `uinwater=0` + per-cell unblock; pass 2 `newsym`. **Match.**
8. Remove Blind: one pass, no `newsym`. **Match.**
9. Closed-door under a gas cell: `does_block` 1 → no unblock. **Match.**
10. Thick cloud `damage>=5`: half, `ttl=2`, keep. **Match.**
11. Thin expire pass 1 while listed: `does_block` still 2 → no-op; `remove_region` unblocks. **Match.**
12. Thin expire pass 2: `u_at` vs `cansee` counts. **Match.**

## Callers / RNG ledger

C `add_region`: `make_gas_cloud` only in live C (`create_force_field` `#if 0`). JS `make_gas_cloud` is the live caller. `remove_region` from `run_regions` after expire TRUE. **No core RNG.** No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Retired `recalc_block_point` at the three Must-fix sites. `add_region` is the C function at its home (one local). Do not add clone #2. Do not import `m_at` this review iter (no `js/` edits); next port may drop `m_at_xy` because `--can` is SAFE — that is cleanup, not a C-wrong family.

## Verification

D-log private canary **20**/20 (locus; 3-cell non-corner block/unblock; `m_at` scan; closed-door no-unblock; thick-cloud keep; Blind pass 1; Rule #2); seed4500 **108275/108275** + **1814/1814**; green+strict seed8000/0900; cohort **7**/7 + strict; full `sessions` **44**/44 (port iter). Public-unhit: `create_force_field`, See_invisible mimic `block_point`.

## Actionable C-wrongs

None for Must-fix. Named: `free_region`; `create_force_field` `#if 0`; `mimic_light_blocking` See_invisible still `recalc`; numeric cmap glyphs; other C `block_point`/`unblock_point` sites still on `recalc_block_point`. Do not revert D-1574 `dig_point`/`seemimic`. Do not restore global `vision_reset` as `recalc`. Do not add `m_at` clone #5 in `region.js`.

Verdict: **ACCEPT-WITH-DEBT**
