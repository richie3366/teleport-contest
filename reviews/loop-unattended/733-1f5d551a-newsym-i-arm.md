# Review 733 — 1f5d551a — display.c newsym I-arm lev->glyph (D-1774)

## Metadata
- Full / short hash: `1f5d551afe6d1a3b5fbf3f8642f49161a571bc8b` / `1f5d551a`
- Parent: `3bebe475` (docs retarget; JS parent of behavior is `c206da54` D-1773). Sixth of ten `js/` commits this audit. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 13:35:45 +0200
- D-id: **D-1774**
- Stats: `js/display.js` +32/−10; `js/cmd.js` +11/−4; `js/uhitm.js` +20/−5; `js/mhitm.js` +4/−4. Total `js/` insertions **67** <250. Band **150–350**.
- Claims to close: seed0014 @43789 fight_empty-on-corpse (misdiagnosed as eatcorpse rot). Not findone flash. Not usteed `ridden_mon_to_glyph`. Review **726** QUALITY-RISK was gbuf `disp_glyph`; D-1767 stamped memory paints; this SHA splits **memory I** vs **gbuf I**.
- JS / map: `display.js` `memory_glyph_is_invisible`; `cmd.js` fight_empty; `uhitm.js` atk_done. `c-js-map/turns.md`.
- Archive **Addressed:** D-1774 `1f5d551a`.

## Intent vs deliverable

Git subject promises: Match C `display.c` `newsym` so remembered I uses `lev->glyph`, not leftover gbuf, instead of `fight_empty` punching the corpse tile after an unseen kill.

`node scripts/csym.mjs newsym` → `display.c:916–1099`. I-arm `:1032–1033` `glyph_is_invisible(lev->glyph)`. `unmap_invisible` `:387–396`. `mon.c` `mondead` `:3170`. `hack.c` fight_empty `:2242–2245` `glyph_is_invisible(glyph)` (`glyph_at`); `:2813` `unmap_invisible` after empty **returns**. `uhitm.c` `do_attack` atk_done `:577–580`.

Parent: `glyph_is_invisible(loc)` ORed `disp_glyph===GLYPH_INVISIBLE` with sticky `.invisible`. `mondead` `unmap_object(show=0)` clears **memory** I and leaves gbuf I; `newsym` then re-`map_invisible`. Walking the corpse tile looked like remembered I → `fight_empty` → eat never ran (seed0014 @43789). The diff **does** add `memory_glyph_is_invisible` (`remembered_glyph.glyph === GLYPH_INVISIBLE`), switch newsym / unmap_invisible / show_mon_or_warn / feel_location / mon_overrides_region / mondead clones to memory, use `glyph_is_invisible_id(disp_glyph)` for fight_empty and `attack_checks`, call `unmap_invisible` on the no-monster move path, and plant atk_done I only on living unseen forcefight. It **does not** rewrite leftover hybrid `glyph_is_invisible(loc)` callers in trap/potion/zap/apply/getpos. Named as “prefer memory vs id at C-cited sites.”

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `memory_glyph_is_invisible` | LIVE new | `lev->glyph` stand-in |
| `glyph_is_invisible_id` | LIVE already | gbuf / `glyph_at` |
| `glyph_is_invisible(loc)` | CLONE hybrid leftover | still ORs memory + disp + `.invisible` |
| `newsym` I-arm | LIVE repaired | memory only |
| `unmap_invisible` | LIVE repaired | memory + `isok` |
| `mondead` (mhitm + uhitm clones) | LIVE repaired | memory |
| fight_empty gate | LIVE repaired | `glyph_at` id |
| `do_attack` atk_done | LIVE new | `:577–580` |
| `ridden_mon_to_glyph` | OMIT named | |
| findone flash | OMIT named | later D-1775 |

`node scripts/sym.mjs`:

```
memory_glyph_is_invisible js/display.js:1095   sync
glyph_is_invisible js/display.js:1104   sync
glyph_is_invisible_id js/display.js:649   sync
unmap_invisible  js/display.js:1172   sync
newsym           js/display.js:4387   sync
map_invisible    js/display.js:1066   sync
unmap_object     js/display.js:1131   sync
do_attack        js/uhitm.js:2785   ASYNC — await required
```

`--can cmd.js display.js unmap_invisible`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**. No new RNG.

## C ↔ JS fidelity

**`newsym` cansee I-arm (`:1032–1033`).** After visible/warning monsters fail: `else if (glyph_is_invisible(lev->glyph)) map_invisible`. JS now `memory_glyph_is_invisible(loc)`. Stale gbuf I after `unmap_object` no longer takes this arm; `_map_location` can show the corpse. **Match C’s lev->glyph.** This is the seed0014 Keep.

**`unmap_invisible` (`:390–396`).** `isok && glyph_is_invisible(levl.glyph)` then `unmap_object`+`newsym`. Parent used hybrid loc helper (gbuf I would unmap). JS memory + `isok`. **Match.**

**fight_empty (`hack.c:2242–2245`).** `glyph_is_invisible(glyph)` where `glyph` is `glyph_at` (gbuf), **not** lev->glyph. JS `glyph_is_invisible_id(destLoc?.disp_glyph)`. **Match the other predicate.** Using memory here would skip fighting a shown I. Using gbuf in newsym was the bug.

**`unmap_invisible` after empty (`:2810–2813`).** C calls it when `domove_fight_empty` **returns false**, then `u_rooted`. JS fight_empty path `return`s; the `else` of `if (mtmp)` runs `unmap_invisible` on a walk onto an empty cell. **Match the no-monster continuation.** Skipped on successful `do_attack` (C returns from attack). Safemon false-return still skips the else (mtmp truthy) — C skips when displace path; named in the comment.

**`do_attack` atk_done (`:577–580`).** `forcefight && !DEADMONSTER && !canspotmon && !glyph_is_invisible(levl[ux+dx][uy+dy].glyph) && !engulfing_u` → `map_invisible`. JS memory check at `ux+dx, uy+dy`. Killing blow skips (mhp<=0). **Match.** Parent omitted this; forcefight-unseen could fail to plant I.

**`mondead` (`:3170`).** `glyph_is_invisible(levl.glyph)` then `unmap_object` then `newsym`. Both JS clones now memory. **Match.** Combined with newsym, corpse can display.

**Leftover hybrid `glyph_is_invisible(loc)`.** Still true if memory I **or** `disp_glyph===I` **or** `.invisible`. `look_shown_at` / apply / getpos / trap mondead / potion / zap still use it. Those can still treat stale gbuf as I. This SHA cited the FAIL path and switched it. Remaining sites are clone drift, not a silent “all I checks are lev->glyph.” Not Must-fix unless a public FAIL remains (suite 44/44 at this SHA).

**Callee closure.** LIVE: `map_invisible`, `unmap_object`, `newsym`, `glyph_is_invisible_id`. STUB: **none**. Not “dispatch ported, callee stubbed.”

**Why leftover gbuf I broke eat.** `mondead` `unmap_object(..., show=0)` rewrites **memory** (`lev->glyph`) off I and leaves the tty/gbuf cell. Parent `newsym` cansee I-arm used `glyph_is_invisible(loc)` which treated `disp_glyph===I` as memory I and called `map_invisible` again. The next walk onto that cell saw gbuf I, took `fight_empty`, and never `eatcorpse` — so seed0014’s C `rn2(20)` vs JS `rn2(5)` was a **skipped function**, not a rot-age peel. This SHA splits the two predicates the way C does (`lev->glyph` vs `glyph_at`).

**`attack_checks` Wait.** C `!glyph_is_invisible(glyph_at)`. JS now `glyph_is_invisible_id(disp_glyph)`. Using memory here would Wait! after mondead cleared memory I while gbuf still showed I. **Match `glyph_at`.**

## Hallucinations / overclaim

Subject “remembered I uses `lev->glyph`, not leftover gbuf” is true for **newsym / unmap_invisible / mondead / feel / show_mon_or_warn**. D-log “eatcorpse `rn2(20)` vs `rn2(5)` was a misread” is true: eat never ran. Do **not** stamp “Match C findone flash.” Do **not** stamp “every `glyph_is_invisible(loc)` is now lev->glyph.” Journal “fortress held” **is** this SHA’s suite claim (seed0014 recovered) — verify section.

## Density

§2b: one C predicate family (`lev->glyph` vs `glyph_at`) plus the fight_empty / atk_done callers that used the wrong one. +67. Did **not** glue findone. Did **not** invent a rot-age peel (docs parent `3bebe475` had retargeted that; this SHA falsified it).

## Verification

D-log: save-oracle skip (untagged); seed0014 **PASS** 59178/59178 Scr 714/714; green+strict seed8000/0900; cohort **7**/7; full `sessions` **44**/44. Rule #2 clean. The FAIL path **is** public-hit (seed0014). Remaining hybrid callers **public-unhit** beyond that session.

## Actionable C-wrongs

None for Must-fix (cited arms match C; leftover loc helper is named drift). Named: `ridden_mon_to_glyph` usteed; findone flash (next SHA); trap/potion/zap/apply/getpos still hybrid `glyph_is_invisible(loc)`. Do **not** OR `disp_glyph` into `newsym`’s I-arm. Do **not** use memory I for fight_empty (`glyph_at`). Do **not** `map_invisible` on a killing `do_attack`. Do **not** treat seed0014 as eatcorpse `rn2(5)`.

C `display.c:1032` is `glyph_is_invisible(lev->glyph)` after warning-monster fails. C `hack.c:2244` is `glyph_is_invisible(glyph)` with `glyph` from `glyph_at`. C `uhitm.c:577–580` plants I only when forcefight, living, unseen, memory not already I, not engulfing. C `mon.c:3170` unmaps memory I on death **before** `newsym`. Hybrid `glyph_is_invisible(loc)` remaining in trap/potion/zap/apply/getpos/`look_shown_at` can still OR gbuf; those are leftover loc helpers, not the FAIL path.

```387:396:nethack-c/upstream/src/display.c
boolean
unmap_invisible(coordxy x, coordxy y)
{
    if (isok(x,y) && glyph_is_invisible(levl[x][y].glyph)) {
        unmap_object(x, y);
        newsym(x, y);
        return TRUE;
    }
    return FALSE;
}
```

Verdict: **ACCEPT-WITH-DEBT**
