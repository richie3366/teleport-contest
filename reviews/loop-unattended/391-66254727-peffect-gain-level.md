# Review 391 — 66254727 — potion.c peffect_gain_level (D-1431)

## Metadata
- Full / short hash: `66254727949f978218dfa07d1b8d1baee0c47bad` / `66254727`
- Parent: `3e742468` (D-1430). This file audits **this SHA only** (ninth of nine `js/` commits since review **382**). Archive **Addressed:** D-1431 was **missing** the short hash; this review iter fills `66254727`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 01:41:43 +0200
- D-id: **D-1431**
- Stats: 10 files, +244 / −25 — `js/potion.js` +149 / −1.
- Claims to close: Open `potion.c` `peffect_gain_level` (named from D-1430). Not blindness. `reviews/loop-2026-08-15/` has no unpaid gain-level Must-fix.
- JS / map: `potion.js` `peffect_gain_level` / `Can_rise_up`; callees `exper.js` `pluslvl` / `rndexp`; `dungeon.js` `get_level`; `do.js` `goto_level`. `c-js-map/turns.md` + `debt.md`. Blindness / potionhit still named.
- Prior reviews this SHA claims to close: **390** follow-up named gain level.

## Intent vs deliverable

Git subject promises: “Match C potion.c peffect_gain_level so quaffing a potion of gain level raises XP (or cursed-rises / uneasy) instead of doing nothing.”

C `potion.c` `peffect_gain_level` `:1083–1116`:

```
    if (otmp->cursed) {
        boolean on_lvl_1 = (ledger_no(&u.uz) == 1);
        gp.potion_unkn++;
        if (on_lvl_1 ? u.uhave.amulet : Can_rise_up(u.ux, u.uy, &u.uz)) {
            ...
            if (on_lvl_1) assign_level(&newlevel, &earth_level);
            else { get_level(&newlevel, depth(&u.uz)-1);
                   if (on_level(&newlevel, &u.uz)) { pline("It tasted bad."); return; } }
            You("rise up, through the %s!", ceiling(u.ux, u.uy));
            goto_level(&newlevel, FALSE, FALSE, FALSE);
        } else You("have an uneasy feeling.");
        return;
    }
    pluslvl(FALSE);
    if (otmp->blessed) u.uexp = rndexp(TRUE);
```

Callee `dungeon.c` `Can_rise_up` `:1674–1687`: false in endgame / sokoban / (wiz1 **and** `In_W_tower`); else `dlevel>1` or (`entry_lev==1` && ledger≠1 && special-up stair). `peffects` `:1392–1393` → `return -1`.

Old JS: default “not implemented”.

The diff **does** add the helper, local dungeon clones (`ledger_no` / `Can_rise_up` / tower rect), and wire POT_GAIN_LEVEL. It **does not** port blindness or vault/temple `ceiling()` labels. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `peffect_gain_level` | C `:1083–1116`, **wired** | |
| `ledger_no` / `on_level` / `assign_level` | C `dungeon.c`, **clones matching C** | also exist in `do.js` / `dungeon.js` |
| `Can_rise_up` | C `:1674–1687`, **clone matching C** | |
| `In_W_tower` / `On_W_tower_level` | C `:1914–1937`, **clones** | `dungeon.js` already exports them |
| `stairway_find_special_dir` | C `stairs.c:99–108`, **clone** | same as `mklev.js` |
| `pluslvl` / `rndexp` | C `exper.c`, **imported live** | Upolyd hp named on pluslvl |
| `get_level` | C `dungeon.c:537+`, **imported live** | |
| `goto_level` | C `do.c`, **imported live** | not a stub |
| `ceiling_at` | C `dungeon.c:1714–1746`, **pre-existing clone** | vault/temple/shop named |
| `In_endgame` / `In_sokoban` | C, **imported live** | |
| `peffect_blindness` | C sibling, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** uncursed/blessed `pluslvl` → `newhp`/`newpw` dice; blessed extra `rndexp` `rn2`. Cursed rise/uneasy has **no** new potion dice (`get_level` is arithmetic). Public fortress never quaffs this.

## C ↔ JS fidelity

Cursed: `potion_unkn++` then `ledger_no==1 ? uhaves.amulet : Can_rise_up`. Match `:1086–1090` (JS ORs `uhave.amulet` / `uhave_amulet` dual-store). Ledger-1 + amulet → `earth_level`. Else `get_level(depth-1)`; same `dnum/dlevel` → `"It tasted bad."` return (still useup via peffects `-1`). Else `"You rise up, through the …!"` + `goto_level(..., false,false,false)`. Else uneasy. Uncursed/blessed never take that arm: `pluslvl(false)` then blessed `uexp = rndexp(true)`. Match `:1111–1115`.

`Can_rise_up`: special-dir stair **first** (C always calls `stairway_find_special_dir(FALSE)` even when unused). False if endgame / sokoban / (`Is_wiz1_level` && `In_W_tower`). Then `dlevel>1` or (`entry_lev==1` && ledger≠1 && `stway && stway.up`). Match `:1676–1686`. `Is_wiz1_level` is `Lassigned && on_level` ≡ `dungeon.h` `Lcheck`. `In_W_tower` is `On_W_tower_level` then `dndest` rect (nlx==0 → false; C `impossible` named). `stairway_find_special_dir(false)` is `tolev.dnum != uz.dnum && up != FALSE` ≡ JS `!!s.up !== false`. Match `stairs.c:99–108`.

`pluslvl` / `rndexp` / `get_level` / `goto_level` are live C ports, not no-ops. `goto_level` has named Gehennom/quest debt; cursed Dlvl1-amulet **does** call it. `ceiling_at` returns `"ceiling"` / `"sky"` / `"rock cavern"`; C vault/temple/shop/water/fire/quest/Underwater strings named.

Local clones duplicate `dungeon.js` `On_W_tower_level` / `In_W_tower` (potion.js could import; dungeon.js does not import potion.js). The potion copies include `Lassigned` (closer to `Lcheck` than `dungeon.js`’s unguarded dnum/dlevel compare). They do **not** contradict C `:1674–1687`. Duplicate-not-import is density debt, not a keep-path C-wrong.

Hallucination check: “Match C `pluslvl` / `goto_level` / `Can_rise_up`” while **those three are live or a matching clone** is not a dispatch-stub lie. “Match C `ceiling()` vault label” **would** be. “Match C `peffect_blindness`” **would** be. Do **not** stamp “Match C `pluslvl` Upolyd `mh`.”

## Hallucinations / overclaim

Subject says quaffing raises XP, or cursed-rises / uneasy, instead of doing nothing. **True:** uncursed `pluslvl` Welcome-next; blessed `rndexp(TRUE)` mid-band; cursed ledger1 no-amulet uneasy; sokoban/endgame/wiz1-tower uneasy; same-level `get_level` tasted-bad; ledger1+amulet rise pline. **False until named for blindness and ceiling room-types.** Stamping **Addressed:** D-1431 for `:1083–1116` is fair. This review fills archive hash `66254727`. Do **not** treat fortress PASS as a gain-level quaff.

## Density

One peffect plus the dungeon predicate that cursed rise needs. ~140 lines including clones already in `dungeon.js`/`mklev.js`. Playbook §2b caller/callee cluster; the extra clones are wide-but-related, not a second subsystem. Did not glue blindness. Acceptable size.

## Branch-by-branch confirm

1. Uncursed: `pluslvl(false)`; no `rndexp`. Match.
2. Blessed: then `uexp = rndexp(true)` (`rn2`). Match.
3. Cursed ledger 1, no amulet: uneasy; `potion_unkn`. Match.
4. Cursed ledger 1 + amulet: rise through ceiling; `goto_level(earth)`. Match keep-path.
5. Cursed sokoban / endgame / wiz1-inside-tower: `Can_rise_up` false; uneasy. Match.
6. Cursed `dlevel>1`: `get_level(depth-1)`; same-level tasted-bad. Match.
7. Branch `entry_lev==1` special-up: `Can_rise_up` can be true. Match `:1683–1686`.
8. Blindness still default. Named.
9. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No recorded coordinates in control flow (`dndest` rect is C tower geometry). Plain ESM. Dynamic `import('./dungeon.js')` / `do.js` are cycle breaks, not stubs.

## Verification

Journal: private canary **15**/15 (C/JS grep; uncursed pluslvl Welcome 11 + newuexp(10); blessed rndexp rn2(10000); cursed ledger1 uneasy; sokoban / endgame / wiz1-tower Can_rise_up false uneasy; branch dlevel1 special-up “It tasted bad”; ledger1 amulet rise pline; blindness still not-implemented; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `66254727` (score rewrite at end of this review iter). Fortress PASS is not a gain-level quaff.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Cursed rise/uneasy / `Can_rise_up` / `pluslvl` / blessed `rndexp` match `:1083–1116` + `:1674–1687`. Callees are live; dungeon clones match C.

Named omits (map / Open, not Must-fix):

1. `peffect_blindness` / sleeping / gain ability / hallucination
2. `ceiling()` vault/temple/shop/water/fire/quest/Underwater
3. `pluslvl` Upolyd `monhp_per_lvl`
4. potionhit / mix POT_GAIN_LEVEL
5. import `dungeon.js` `In_W_tower` instead of a second clone (map, not Must-fix)

Do not Must-fix “cursed should pluslvl” (C returns). Do not Must-fix “tasted-bad should skip useup” (C still `-1`). Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `dopotion` → `peffects`. New RNG on the unblessed/blessed arms only (`pluslvl` hp/pw; blessed `rndexp` `rn2`). Public fortress does not quaff this.

Verdict: **ACCEPT-WITH-DEBT**
