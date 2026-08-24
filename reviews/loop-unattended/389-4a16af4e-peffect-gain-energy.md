# Review 389 — 4a16af4e — potion.c peffect_gain_energy (D-1429)

## Metadata
- Full / short hash: `4a16af4e4bef21091c7ecbc9009de916fc97c69c` / `4a16af4e`
- Parent: `19c24f62` (D-1428). This file audits **this SHA only** (seventh of nine `js/` commits since review **382**). Archive **Addressed:** D-1429 `4a16af4e` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 01:20:23 +0200
- D-id: **D-1429**
- Stats: 10 files, +235 / −126 — `js/potion.js` +45 / −1 (docs/journal the rest).
- Claims to close: Open `potion.c` `peffect_gain_energy` (named from D-1428). Not acid. `reviews/loop-2026-08-15/` has no unpaid gain-energy Must-fix.
- JS / map: `potion.js` `peffect_gain_energy` / `peffects`. `c-js-map/turns.md`. potionhit / mix / remaining peffects still named.
- Prior reviews this SHA claims to close: **388** follow-up named gain energy.

## Intent vs deliverable

Git subject promises: “Match C potion.c peffect_gain_energy so quaffing a potion of gain energy adjusts Pw (and max/peak) instead of doing nothing.”

C `potion.c` `peffect_gain_energy` `:1224–1257`:

```
    if (otmp->cursed)
        You_feel("lackluster.");
    else
        pline("Magical energies course through your body.");
    num = d(otmp->blessed ? 3 : !otmp->cursed ? 2 : 1, 6);
    if (otmp->cursed)
        num = -num;
    u.uenmax += num;
    if (u.uenmax > u.uenpeak)
        u.uenpeak = u.uenmax;
    else if (u.uenmax <= 0)
        u.uenmax = 0;
    u.uen += 3 * num;
    if (u.uen > u.uenmax)
        u.uen = u.uenmax;
    else if (u.uen <= 0)
        u.uen = 0;
    disp.botl = TRUE;
    exercise(A_WIS, TRUE);
```

`peffects` `:1408–1409` then `return -1`. No `rn2` besides `d()`. potionhit has no GAIN_ENERGY arm.

Old JS: default “not implemented”, no useup.

The diff **does** add the helper and wire the case (`return -1`). It **does not** port acid / potionhit. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `peffect_gain_energy` | C `:1224–1257`, **wired** | no extra helpers |
| `d(n,6)` | C `rnd.c`, **imported live** | blessed 3 / uncursed 2 / cursed 1 |
| `You_feel` / `pline` | C, **wired** | |
| `exercise(A_WIS, TRUE)` | C, **imported live** | |
| `disp.botl` | C `:1255`, **wired** | JS also `flags.botl` dual-store |
| potionhit / mix | C, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `d(1..3, 6)` then `exercise` may `rn2(19)`. Public fortress never quaffs this.

## C ↔ JS fidelity

Message then `d(...)` then cursed negate then max/peak then `uen += 3*num` clamp then botl then WIS exercise. Match `:1228–1256` call-for-call. Ternary `blessed?3:!cursed?2:1` is C’s (blessed cursed is still 3 before negate — a blessed-cursed potion is not a NetHack object; uncursed is 2). Peak rises only when `uenmax > uenpeak`; cursed drain does **not** lower peak; `uenmax <= 0` zeros max only. Current energy clamps to `[0, uenmax]` after the `3*num` add (so cursed current drops three times as fast as max). Match.

JS writes `game.disp.botl` **and** `game.flags.botl`. C is `disp.botl` only. Extra status-dirty bit is dual-storage, not a Pw-math miss. `exercise(A_WIS, true)` is the live attrib export.

Hallucination check: “Match C Pw max/peak/current” while the body is the `:1224–1257` arithmetic (no stub callee) is **not** a dispatch-stub lie. There is no callee. “Match C potionhit gain energy” **would** be. Do **not** stamp “Match C `peffect_acid`.”

## Hallucinations / overclaim

Subject says quaffing adjusts Pw (and max/peak) instead of doing nothing. **True:** uncursed `d(2,6)` max + `3*num` current; blessed `d(3,6)`; cursed lackluster subtract + floor 0 + peak kept; useup via `-1`. **False until named for potionhit/mix/acid.** Stamping **Addressed:** D-1429 for `:1224–1257` is fair. Do **not** treat fortress PASS as a gain-energy quaff.

## Density

One peffect, ~35 lines. Playbook §2b one C function. Did not glue acid. Right size.

## Branch-by-branch confirm

1. Uncursed at-max: max += `d(2,6)`; current clamped to new max; peak rises. Match.
2. Uncursed below-max: current += `3*num` then clamp. Match.
3. Blessed: `d(3,6)`. Match.
4. Cursed: lackluster; `num` negated; peak unchanged; max/current floor 0. Match.
5. `exercise(A_WIS, TRUE)` always. Match.
6. Acid still default at this SHA. Named.
7. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dice are C `d()`, not a recorded Pw delta. Plain ESM.

## Verification

Journal: private canary **12**/12 (C/JS grep; uncursed at-max += d(2,6); below-max current += 3*num; blessed d(3,6); cursed lackluster subtract + peak kept; cursed floor clamp 0; acid still not-implemented; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD. Fortress PASS is not a gain-energy quaff.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Arithmetic / messages / `d()` / peak / clamp / WIS match `:1224–1257`. No clone that contradicts C.

Named omits (map / Open, not Must-fix):

1. remaining peffects (acid / gain level / blindness / sleeping)
2. potionhit / potionbreathe / mix / dipsink POT_GAIN_ENERGY

Do not Must-fix “cursed should lower uenpeak” (C keeps peak). Do not Must-fix “blessed-cursed should be 3 then negate” (not a real beatitude). Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `dopotion` → `peffects`. New RNG: `d(n,6)` + possible WIS `exercise` `rn2`. Public fortress does not quaff this.

Verdict: **ACCEPT-WITH-DEBT**
