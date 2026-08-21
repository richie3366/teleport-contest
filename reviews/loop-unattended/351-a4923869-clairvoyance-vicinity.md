# Review 351 — a4923869 — spell.c SPE_CLAIRVOYANCE do_vicinity_map (D-1391)

## Metadata
- Full / short hash: `a4923869dd061c83f2ca47ada46bd586c4554fd7` / `a4923869`
- Parent: `b5b5eb34` (D-1390). This file audits **this SHA only** (fifth of nine `js/` commits since review **346**). Archive **Addressed:** D-1391 `a4923869` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 21:10:04 +0200
- D-id: **D-1391**
- Stats: 11 files, +433 / −141 — `js/detect.js` +213 / −7 (`do_vicinity_map` + unconstrain/glyph helpers); `js/spell.js` +32 / −4 (arm). Journal rotate in the same commit is docs, not this audit.
- Claims to close: Open `spell.c` `spelleffects` SPE_CLAIRVOYANCE (named). Not protection. Review **350** named this next otyp. `reviews/loop-2026-08-15/` has no unpaid clairvoyance Must-fix.
- JS / map: `spell.js` `spelleffects`; `detect.js` `do_vicinity_map` / `show_map_spot`. `c-js-map/turns.md`. JUMPING / allmain `seer_turn` / pet-detected glyphs still named.
- Prior reviews this SHA claims to close: **349**/**350** named CLAIRVOYANCE; **338** named it among other otyps.

## Intent vs deliverable

Git subject promises: “Match C spell.c spelleffects SPE_CLAIRVOYANCE so the spell maps a 9×5 vicinity via do_vicinity_map, instead of printing Nothing happens.”

C `spell.c` `:1572–1580`: `if (!BClairvoyant)` { skilled `pseudo->blessed = 1`; `do_vicinity_map(pseudo);` } `else if (uarmh && uarmh->otyp == CORNUTHAUM)` pointy-hat `body_part(HEAD)`. `BClairvoyant` is `u.uprops[CLAIRVOYANT].blocked` (`youprop.h:181`). NODIR (`objects.h:1346–1348`).

C `detect.c` `do_vicinity_map` `:1448–1585`: `extended = sobj && (sobj->blessed || Clairvoyant)`; `random_farsight = !sobj`. Rectangle `uy-5..uy+6`, `ux-9..ux+10` (col 0 skipped) — D-log’s “9×5” is those offsets, not a 9-by-5 cell box. Swallow `viz_array |= IN_SIGHT`; `EDetect_monsters |= I_SPECIAL`; `unconstrain_map`; nested x/y: `show_map_spot(..., Confusion)`, top object `observe_object` if extended then `map_object`, `covers_objects` → odetected; `m_at` with `mx==zx && my==zy` (skip worm tails): non-extended unconstrained/`!hero_memory` off-hero `!glyph_is_monster(old)` → `map_invisible`, else `map_monst(mtmp, FALSE)`; extended glyph-change `!glyph_is_invisible` → mdetected. `quick_farsight` only when `!sobj`. Then maybe flush + `You sense your surroundings.` + `browse_map`; reconstrain; restore EDetect/viz; second loop replace unseen with `map_invisible` except hero cell and worm-tail glyph; `see_monsters`; `docrt` if browsed.

`show_map_spot` `:1372–1419` already lived (D-0075): `cnf && rn2(7)` skip; `seenv=SVALL`; SCORR→CORR; magic_map_background; furniture/trap/engraving. Oldglyph trap/object restore still deferred.

Old JS: other-otyp `Nothing happens.`; no `do_vicinity_map`; `do_mapping` still stubs unconstrain.

The diff **does** add the spell arm (blocked vs hat vs `do_vicinity_map(pseudo)`) and a real `do_vicinity_map` with unconstrain/reconstrain, rectangle, extended observe, browse, I-replace, `see_monsters`/`docrt`. It does **not** port `seer_turn`, `pet_to_glyph`/`detected_mon_to_glyph`, or integer `glyph_at`. Named. JUMPING still `Nothing happens.`

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| SPE_CLAIRVOYANCE arm | C `:1572–1580`, **wired** | !B then bless+map; else hat |
| `do_vicinity_map` | C `:1448–1585`, **wired** | not a stub |
| `show_map_spot` | C `:1372–1419`, **already live** | `rn2(7)` when conf |
| `unconstrain_map` / `reconstrain_map` | C detect.c, **wired** | this SHA; do_mapping still stubs |
| `browse_map` | C, **already live** | getpos + terrainmode |
| `observe_object` | C `o_init.c`, **imported live** | invent.js |
| `map_object` / `map_invisible` / `see_monsters` / `docrt` | C, **imported live** | |
| `body_part(HEAD)` | C `polyself.c`, **imported live** | HEAD=8 |
| `Clairvoyant()` | C `youprop.h`, **clone** | (H\|\|E)&&!B + uprops |
| `Confusion_detect` | C `Confusion`, **clone** | sticky or HConfusion |
| `covers_objects_detect` | C `covers_objects`, **clone** | pool !uinwater / lava |
| `glyph_at_disp` | C `glyph_at`, **clone** | gbuf disp_* stand-in |
| `map_monst` | C `:122–134`, **clone** | plain `mon_glyph`; no pet/detected/wsegs |
| allmain `seer_turn` | C `allmain.c`, **named omit** | `sobj==null` path unwired |
| JUMPING / CURE / CHAIN | C, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `show_map_spot` `rn2(7)` per cell **only when confused**. Unskilled keep-path (canary “silent SVALL”) does **not** burn that die. `random_farsight` is `!sobj`; the spell always passes `pseudo`, so `quick_farsight` is ignored. Match C `:1546–1547`. `observe_object` skips when Hallucination (invent.js); C same.

## C ↔ JS fidelity

Energy/WIS before the switch. NODIR: no getdir. `use_skill` after. Match.

Blocked: JS `BClairvoyant || uprops[CLAIRVOYANT].blocked` ≡ C `BClairvoyant`. Skilled `pseudo.blessed=true` then `do_vicinity_map(pseudo)` so `extended` is true (blessed) even without intrinsic Clairvoyant. Unskilled unblocked: `extended = Clairvoyant()` only. Cornuthaum + blocked: `body_part(HEAD)` hat line. Blocked without hat: no map, no pline. Match `:1573–1579`.

Rectangle and swallow viz / I_SPECIAL / unconstrain match `:1464–1499` call-for-call. Nested zx/zy then object then monster matches `:1500–1537`. JS `glyph_disp_changed` stands in for `newglyph != oldglyph`; `kind !== 'monster'` for `!glyph_is_monster`. That clone can miss a pet/`I` cell whose `disp_kind` is not `'monster'`. Named, not a stub of the loop.

`map_monst(mtmp, FALSE)` in C picks detected/pet/mon glyphs and skips worm segs (`showtail` false). JS always `mon_glyph` + `show_glyph_cell`. D-log names pet/detected. Clone that diverges on **display**, not on `m_at` / `mx==zx` skip. Do not Must-fix as if the scan skipped monsters.

hero_memory + !unconstrained + !mdetected + !odetected: **no** “You sense…” / browse. Unskilled default dungeon is that silent SVALL path. Match `:1549–1559`. Skilled observe can set mdetected/odetected and browse. `quick_farsight` cannot cancel a spell (`sobj` non-null).

Second loop: skip `u_at`; monster-kind cells; skip long-worm-tail **mnum**; `!mtmp || !canspotmon` → `map_invisible`. C uses `glyph_to_mon(newglyph) != PM_LONG_WORM_TAIL` on the glyph, not `mtmp.mnum`. Named. Then `see_monsters`; `docrt` if refresh. Match `:1565–1584` on the keep-path.

Hallucination check: “Match C `do_vicinity_map`” while **the function is newly implemented and `show_map_spot` / `browse_map` / `observe_object` are live** is not a dispatch-stub lie. Do **not** stamp “Match C `pet_to_glyph`.” Do **not** stamp “Match C integer `glyph_at`.” Do **not** stamp “Match C `seer_turn`.” Do **not** stamp “Match C SPE_JUMPING.”

## Hallucinations / overclaim

Subject says the spell maps a 9×5 vicinity via `do_vicinity_map` instead of `Nothing happens.` **True on the keep-path** when `!BClairvoyant` (silent unskilled `hero_memory`, or skilled observe+browse). **“9×5” means C’s `ux±9/10`, `uy±5/6` window**, not 45 cells. **False until named for random farsight** (`sobj==null` allmain). D-log canary “unskilled 9×5 SVALL silent / unskilled no dknown / skilled observe dknown / BClairvoyant silent / cornuthaum hat / already-Clairvoyant extended” matches the branches. Stamping **Addressed:** D-1391 for `:1572–1580` + `:1448–1585` is fair. Do **not** treat fortress PASS as clairvoyance (public-unhit).

## Density

One C `case` plus the full `do_vicinity_map` callee that case needs (~213 lines). Playbook §2b caller/callee cluster. Did not glue JUMPING. Did not re-port `show_map_spot`. Wiring unconstrain **only** on this path (leaving `do_mapping` stubbed) is in-envelope.

## Branch-by-branch confirm

1. Unskilled, !blocked, hero_memory: `show_map_spot` SVALL; no observe; no browse. Match.
2. Unskilled, already Clairvoyant: `extended` true; observe top object. Match `:1461`.
3. Skilled: `pseudo.blessed`; observe; maybe “You sense…” + browse TER_MON. Match.
4. BClairvoyant, no hat: no map. Match.
5. BClairvoyant + cornuthaum: hat `body_part(HEAD)`. Match.
6. Confused: per-cell `rn2(7)` skip in `show_map_spot`. Match `:1378–1379`.
7. Swallow: unconstrain + viz IN_SIGHT; off-hero unseen → `map_invisible` if !extended. Match.
8. `quick_farsight`: ignored for the spell (`sobj` set). Match.
9. JUMPING: still `Nothing happens.` Named.
10. PROTECTION / FORCE_BOLT unchanged. Match.
11. **Public-unhit** until a session casts clairvoyance.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Rectangle constants are C’s lo/hi, not recorded coordinates. Plain ESM. Dynamic `import('./detect.js')` is in-process.

## Verification

Journal: private canary **15**/15 (C/JS grep; NODIR divination; unskilled 9×5 SVALL silent; unskilled no dknown; skilled observe dknown; BClairvoyant silent; cornuthaum hat; already-Clairvoyant extended; JUMPING still omit; PROTECTION still gain; FORCE_BOLT east; HEALING atme; Rule #2). green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Cadence full `sessions` is at later HEAD; fortress PASS is not clairvoyance.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Dispatch and `do_vicinity_map` keep-path match `:1572–1580` / `:1448–1585`. Remaining glyph/pet/seer gaps are named clones/omits.

Named omits (map / already-Open, not Must-fix):

1. allmain `seer_turn` random farsight (`sobj==null`)
2. `pet_to_glyph` / `detected_mon_to_glyph` / `detect_wsegs` (`map_monst` showtail)
3. integer `glyph_at` / `glyph_to_mon` (disp_* stand-in; worm-tail second loop)
4. `show_map_spot` oldglyph trap/object restore (pre-existing)
5. SPE_JUMPING / CURE_SICKNESS / CURE_BLINDNESS / CHAIN_LIGHTNING
6. `obfree(pseudo)`

Do not Must-fix “always browse on unskilled” (C silent when hero_memory and nothing new). Do not Must-fix “honor `quick_farsight` on the spell” (C ignores it when `sobj`). Do not Must-fix “9-by-5 cells” (C is `ux±9/10`, `uy±5/6`). Do not Must-fix “ubuzz clairvoyance” (C NODIR map).

## Callers / RNG ledger

C unskilled unconfused: no new `rn2` in `do_vicinity_map` itself. JS same. Confused: `rn2(7)` per cell. Spell never takes `random_farsight`. Public fortress never casts this envelope.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: clairvoyance now runs live `do_vicinity_map` on C’s vicinity window (silent unskilled `hero_memory`, skilled observe+browse, blocked hat); pet/detected glyphs and `seer_turn` stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1391 `a4923869` already stamped.
