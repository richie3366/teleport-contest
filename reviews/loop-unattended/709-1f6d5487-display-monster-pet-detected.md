# Review 709 — 1f6d5487 — display.c display_monster pet/detected glyphs (D-1748)

## Metadata
- Full / short hash: `1f6d54877a381c0797799cefc2a6722b89841952` / `1f6d5487`
- Parent: `a85a8aac` (D-1747). This file audits **this SHA only** (ninth of nine `js/` commits since review **700**). Archive **Addressed:** D-1748 `1f6d5487`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 00:36:48 +0200
- D-id: **D-1748**
- Stats: `js/display.js` +120/−31. Total `js/` insertions **120** <250. Band **150–350**.
- Claims to close: Open `display_monster` pet/detected glyphs after D-1747 / reviews **698** / **700** / **706** / **708**. Not integer `GLYPH_*_OFF`. Not `detect.c` `map_monst`. `reviews/loop-2026-08-15/` has no unpaid pet-glyph Must-fix.
- JS / map: `display.js` real-monster arm + tty helpers. `c-js-map/turns.md`.
- Prior: **708** named this omit; **706** named pet/detected ids.

## Intent vs deliverable

Git subject promises: tame `!Hallu` pets use `pet_to_glyph` (worm tails skip `what_mon`) and DETECTED uses `detected_mon_to_glyph` inverse instead of always `mon_glyph` plus `mtame` attr after D-1747.

`node scripts/csym.mjs display_monster` → `display.c:513–622`. `--callers display_monster`: cansee `:1027`; !cansee `:1053`. `pet_to_glyph` callers: `display.c:603`; `detect.c:127`. `detected_mon_to_glyph`: `:610`; `detect.c:125`. `petnum_to_glyph`: `:601`; `worm.c:512`. `detected_monnum_to_glyph`: `:606`; `worm.c:510`. Macros `display.h:554–565` / `:639–650`. `what_mon` `display.h:197`. `newsym_rn2` `display.h:209` ≡ `rn2_on_display_rng`. `tty_print_glyph` `wintty.c:3927–3936`.

```599:618:nethack-c/upstream/src/display.c
        if (mon->mtame && !Hallucination) {
            if (worm_tail)
                num = petnum_to_glyph(PM_LONG_WORM_TAIL, mgendercode);
            else
                num = pet_to_glyph(mon, rn2_on_display_rng);
        } else if (sightflags == DETECTED) {
            if (worm_tail)
                num = detected_monnum_to_glyph(what_mon(PM_LONG_WORM_TAIL,
                                                        rn2_on_display_rng),
                                               mgendercode);
            else
                num = detected_mon_to_glyph(mon, rn2_on_display_rng);
        } else {
            if (worm_tail)
                num = monnum_to_glyph(what_mon(PM_LONG_WORM_TAIL,
                                               rn2_on_display_rng),
                                      mgendercode);
            else
                num = mon_to_glyph(mon, rn2_on_display_rng);
```

Parent: `worm_tail ? worm_tail_glyph() : mon_glyph` then `mon_map_attr(mtame)`. Hallu pets kept pet hilite; DETECTED never got MG_DETECT inverse. The diff **does** ship the three-way arm, tty `kind` tags, `glyph_tty_attr` from kind (pet hilite wins; else detect inverse), `petnum_to_glyph` with no `what_mon`, and M_AP_NOTHING `mon_to_glyph` (C `:539–540`, not worm_tail). It **does not** emit integer `GLYPH_*_OFF` or wire `detect.c` `map_monst` / `ridden_mon_to_glyph`. Named. `mon_glyph` now wraps `mon_to_glyph` (same file; not a deleted clone to restore).

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `display_monster` `:587–618` | LIVE repaired | three-way; `show_mon_or_warn` already D-1747 |
| `pet_to_glyph` | LIVE (tty) | `what_mon` + `kind:'pet'` |
| `detected_mon_to_glyph` | LIVE (tty) | `what_mon` + `kind:'detect'` |
| `petnum_to_glyph` | LIVE (tty) | **no** `what_mon`; voids `gnd` |
| `detected_monnum_to_glyph` | LIVE (tty) | after caller `what_mon` |
| `mon_to_glyph` | LIVE (tty) | `what_mon` + `kind:'mon'` |
| `glyph_from_mnum` | LIVE helper | mlet + `mcolors` ≡ `pet_color`/`mon_color` |
| `glyph_tty_attr` | LIVE clone | `wintty.c:3927–3936` MG_PET then MG_DETECT |
| `worm_tail_glyph` | LIVE local | else-arm `what_mon(PM_LONG_WORM_TAIL)` |
| `mon_glyph` | LIVE wrapper | re-point to `mon_to_glyph` |
| `Hallucination()` | LIVE | youprop, not sticky `u.Hallucination` |
| `what_mon` | LIVE | `display.h:197` |
| integer `GLYPH_*_OFF` | OMIT named | |
| `detect.c` `map_monst` | OMIT named | still `mon_glyph` |
| `ridden_mon_to_glyph` | OMIT named | |
| `worm.c` `detect_wsegs` kinds | leftover | `show_wseg_detect_glyph` still `mon_map_attr` |
| `feel_location` `is_worm_tail` | OMIT named | |

`node scripts/sym.mjs`:

```
pet_to_glyph     js/display.js:350   sync
detected_mon_to_glyph js/display.js:358   sync
petnum_to_glyph  js/display.js:369   sync
detected_monnum_to_glyph js/display.js:378   sync
mon_to_glyph     js/display.js:342   sync
glyph_tty_attr   NOT EXPORTED — 1 LOCAL  js/display.js:197
mon_glyph        js/display.js:951   sync
display_monster  NOT EXPORTED — 1 LOCAL  js/display.js:1179
what_mon         js/display.js:945   sync
Hallucination    js/display.js:454   sync  (+ do_name export; 8 local clones — do NOT add #9)
```

No cross-module clone→import. Helpers live in `display.js`. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: none. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**. Do **not** add `pet_to_glyph` #2. Do **not** add another `Hallucination`.

## C ↔ JS fidelity

**Tame gate (`:599`).** C `mtame && !Hallucination` (youprop). JS `mon.mtame && !Hallucination()`. Hallu pets fall through — no MG_PET. Parent `mon_map_attr(mtame)` hilited them. **Match.**

**Pet tail (`:601`).** C `petnum_to_glyph(PM_LONG_WORM_TAIL, mgendercode)` — **no** `what_mon`. JS `petnum_to_glyph(PM_LONG_WORM_TAIL, mgendercode)` → `glyph_from_mnum(mnum)` with `kind:'pet'`. No display rng. **Match the skip.** `gnd` only selects `GLYPH_PET_*_OFF` in C; tty mlet ignores it (`void gnd`). Named integer offsets.

**Pet body (`:603`).** C `pet_to_glyph(mon, rn2_on_display_rng)` → `what_mon(monsndx, rng)`. JS same rng. Non-Hallu `what_mon` returns mndx with **zero** rng burns. **Match.**

**DETECTED (`:604–610`).** After the tame fail. Tail: `what_mon(PM_LONG_WORM_TAIL, rng)` then `detected_monnum_to_glyph` (no second `what_mon`). Body: `detected_mon_to_glyph` → one `what_mon`. JS the same. **Match call-for-call.** Tame `!Hallu` never takes this arm (no detected-pet glyphs). **Match.**

**Else (`:611–617`).** Tail `what_mon` + `monnum_to_glyph`; body `mon_to_glyph`. JS `worm_tail_glyph` / `mon_to_glyph`. **Match.**

**M_AP_NOTHING (`:539–540`).** C `mon_to_glyph(mon, newsym_rn2)` — not worm_tail. Parent used `worm_tail_glyph` here. This SHA matches C. `newsym_rn2` ≡ `rn2_on_display_rng` (`display.h:209`).

**tty attr (`:3927–3936`).** C: `(MG_PET && hilite_pet)` → `wc2_petattr`; else `(MG_DETECT|…) && use_inverse` → `ATR_INVERSE`; else wizmgender female. JS `glyph_tty_attr(kind)`: pet then detect then `wizmgender_inverse`. Does not read live `mtame`. **Match that order.** `pet_color` ≡ `mon_color` (`display.c:2686–2688`); JS one `mcolors` table.

**Callee closure (real-monster arm).** LIVE: `pet_to_glyph`, `petnum_to_glyph`, `detected_mon_to_glyph`, `detected_monnum_to_glyph`, `mon_to_glyph`, `what_mon`, `Hallucination`, `show_mon_or_warn`, `glyph_tty_attr`. OMIT named: integer `GLYPH_*_OFF`; `map_monst`; `ridden_mon_to_glyph`; `feel_location` tail. STUB: **none** in this arm. Not “dispatch ported, callee stubbed.” `map_monst` is a **different** C caller, named, not a stub inside `display_monster`.

## Hallucinations / overclaim

Subject “tame !Hallu pet_to_glyph; tails skip what_mon; DETECTED inverse”: **true**. D-log “Hallu tame no pet attr; tame prefers pet”: **true**. Do **not** stamp “Match C integer `GLYPH_PET_*_OFF`.” Do **not** stamp “Match C `detect.c` `map_monst`” (still `mon_glyph`; C `:125–128` three-way). Do **not** stamp “Match C `ridden_mon_to_glyph`.” Do **not** stamp “Match C `worm.c` `detect_wsegs`” (`show_wseg_detect_glyph` still `mon_map_attr`). Do **not** stamp “Match C `feel_location` `is_worm_tail`.” Journal “fortress held” is not a public MG_DETECT screen. Public pet/detect attr **thin**; canary was node 25/25 + seed0004 pony + seed0383 hallu. Admit public-unhit for DETECTED inverse.

## Density

§2b: C three-way arm + the tty macros/`tty_print_glyph` that make the kinds visible. +120. Did not glue `map_monst` / `feel_location`. Did **not** reopen D-1747 I-unmap. M_AP_NOTHING `mon_to_glyph` is the same glyph family.

## Verification

D-log: save-oracle skip (untagged `display.c:display_monster`); node 25/25 (kinds; petnum no Hallu rng; tame inverse; Hallu tame no pet attr; DETECTED inverse; tame prefers pet; `use_inverse`/hilite_pet off; !cansee Detect); green+strict seed8000/0900; CURRENT cohort **9**/9 + strict (seed0004 pony + seed0383 hallu). Rule #2 clean. DETECTED inverse **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (the real-monster arm matches C branch order and rng; integer ids / `map_monst` are named). Named: `GLYPH_*_OFF`; `detect.c` `map_monst`; `ridden_mon_to_glyph`; `worm.c` `detect_wsegs` kinds; `feel_location` `is_worm_tail`; make_blinded `Sting_effects(-1)`. Do **not** add `pet_to_glyph` #2. Do **not** `what_mon` on tame tails. Do **not** hilite Hallu pets from live `mtame`. Do **not** restore `mon_map_attr` on this arm. Do **not** re-port D-1747.

Verdict: **ACCEPT-WITH-DEBT**
