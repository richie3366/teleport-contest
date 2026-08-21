# Review 307 — 2a5e72e0 — zap.c dozap killer_xname (D-1345)

## Metadata
- Full / short hash: `2a5e72e0156273d6f43d64919c5d615daf1b7c1b` / `2a5e72e0`
- Parent: `5195acee` (D-1344). This file audits **this SHA only**. Archive **Addressed:** D-1345 lacked the short hash; this review commit fills `2a5e72e0`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 07:06:38 +0200
- D-id: **D-1345**
- Stats: 14 files, +98 / −37 — `js/zap.js` +12 / −3; comment-only dokick/dothrow/eat/objnam.
- Claims to close: Open `zap.c` zapyourself `killer_xname` (remaining; named from D-1344). Not dothrow. `reviews/loop-2026-08-15/` has no unpaid dozap Must-fix.
- JS / map: `js/zap.js` `dozap`; `uhim` from `roles.js`; `killer_xname` from D-1335; `c-js-map/turns.md` + `debt.md`. dothrow `:1747` / pickup / wield remaining; `zapyourself` WAN_LIGHTNING / WAN_MAGIC_MISSILE; `backfire` body still named.
- Prior reviews this SHA claims to close: D-1344 follow-up queued this Open row; **297** named zap after dokick `killer_xname`.

## Intent vs deliverable

Git subject promises: “Match C zap.c dozap so a self-zap death is named with killer_xname and uhim() on the tombstone, instead of storing a bare xname.”

C `dozap` (`zap.c:2627–2683`); self-zap arm `:2657–2663`:

```
    } else if (need_dir && !u.dx && !u.dy && !u.dz) {
        if ((damage = zapyourself(obj, TRUE)) != 0) {
            Sprintf(buf, "zapped %sself with %s",
                    uhim(), killer_xname(obj));
            losehp(Maybe_Half_Phys(damage), buf, NO_KILLER_PREFIX);
        }
```

C `uhim()` is `genders[flags.female ? 1 : 0].him` (`you.h:315`) — **not** `u.female` / `Ugender`. Callee `zapyourself` (`:2705+`) returns damage; killer is formatted in `dozap`. WAN_FIRE/COLD/STRIKING return `d(12,6)` / `d(2,12)`. WAN_LIGHTNING `:2730–2746` also returns damage — JS `zapyourself` still has no that case (named). WAN_DEATH dies **inside** `zapyourself` (`shot %sself with a death ray`), not this `losehp`.

Old JS: `` `zapped ${game.u?.female ? 'her' : 'him'}self with ${xname(obj)}` ``.

The diff **does** `killer_xname(obj)` + `uhim()` + keep `NO_KILLER_PREFIX`. It does **not** port WAN_LIGHTNING `zapyourself`. Named. It does **not** await `finish_losehp_done` (pre-existing at this site; C `losehp` is noreturn). Comment-only sibling files.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dozap` self-zap `losehp` | C `:2658–2663`, **wired** | |
| `killer_xname` | C `objnam.c:1942–2005`, **imported live** | D-1335 |
| `uhim` | C `you.h:315`, **imported live** | `roles.js` `genders[flags.female]` |
| `zapyourself` | C `:2705+`, **imported live, partial** | FIRE/COLD/STRIKING return dmg; LIGHTNING named |
| `maybe_half_phys` | C `Maybe_Half_Phys`, **imported live** | |
| `NO_KILLER_PREFIX` | C, **imported live** | `const.js` `= 2` |
| `losehp` | C `hack.c`, **imported live** | sync; `_losehp_needs_done` |
| WAN_LIGHTNING self | C `:2730–2746`, **named omit** | default `damage=0` |
| `backfire` body | C `:2647–2652`, **named omit** | still exercise+return |
| throwit `:1747` | C `dothrow.c`, **named omit** | next Open |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none (`killer_xname` / `uhim` have none). `zappable` / cursed `rn2(WAND_BACKFIRE_CHANCE)` unchanged.

## C ↔ JS fidelity

Direction self: `need_dir && !(dx\|\|dy\|\|dz)` after `getdir`. Match `:2657`. `zapyourself(obj, true)` then `if (damage)`. Match. Format `"zapped " + uhim() + "self with " + killer_xname(obj)`. `uhim()` returns `"him"`/`"her"` so the string is `"himself"`/`"herself"`. Match `%sself`. JS `uhim` reads `game.flags?.female`, not `u.female`. That **is** the bug the D-log named (`u.female ≠ flags.female`).

`killer_xname` fully IDs, strips BUC/called-name, adds `an`/`the`. A unknown wand is not `"maple wand"`. Match C. `NO_KILLER_PREFIX` so the tombstone is the buf itself, not `"killed by zapped…"`. Match.

`zapyourself` FIRE/COLD/STRIKING already return the C dice. Those deaths now take the new string. WAN_LIGHTNING falls through `default` → `damage=0` → no `losehp`. Named omit of the **callee arm**, not a stub `dozap` killer. WAN_DEATH still formats inside `zapyourself` with `flags.female` (`shot her/himself with a death ray`) — different C path, not this SHA.

`losehp` without `await finish_losehp_done`: pre-existing at this call (D-0737 covered `zhitu`). Fatal self-zap sets `gameover` + killer then `dozap` still returns `1`. C never returns. Same as the old `xname` site. Not introduced here. Map already names `backfire` / dust.

Hallucination check: “Match C `dozap`” while **WAN_LIGHTNING `zapyourself` is omitted** is an overclaim on lightning self-zap **damage**. The **killer format** in `dozap` matches `:2661–2663`. Callee `killer_xname` is live. `uhim` is live. Do **not** stamp “Match C WAN_LIGHTNING `zapyourself`.” Do **not** stamp “Match C throwit `:1747`.”

## Hallucinations / overclaim

Subject says a self-zap death is named with `killer_xname` and `uhim()` instead of bare `xname`. **True for FIRE/COLD/STRIKING (and any other arm that returns damage).** False for lightning until that arm exists. D-1345 **Not this iter** names it. Stamping **Addressed:** D-1345 for the `dozap` Sprintf is fair. Do **not** treat fortress PASS as a self-zap tombstone.

## Density

One C Sprintf plus its two live callees already in-tree. ~10 lines of JS. Playbook §2b thin, but it is the queued Open row (one remaining zap `killer_xname` site), not an invented peel. Comment-only sibling files. Did not glue throwit `:1747`. Acceptable.

## Branch-by-branch confirm

1. Self-zap, `zapyourself` returns dmg: `"zapped himself with a wand of fire"` (or `herself` via `flags.female`). Match `:2661–2663`.
2. `u.female` set, `flags.female` clear: `uhim()` is `"him"`. Match C; old JS would have used `"her"`.
3. Called-name / BUC: stripped by `killer_xname`. Match.
4. `damage==0` (sleep/heal/poly): no `losehp`. Match `:2658`.
5. WAN_DEATH: still inner `done(DIED)`, not this buf. Match C split.
6. WAN_LIGHTNING: JS dmg 0 (named). C would `losehp` this buf.
7. `NO_KILLER_PREFIX`. Match.
8. **Public-unhit** unless a session dies of self-zap.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `uhim()` is the C macro, not a seed-shaped pronoun. Plain ESM.

## Verification

Journal: private canary **31**/31; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on self-zap death. This audit cadence: full `sessions` at HEAD `2a5e72e0` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.29/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not a tombstone with `"zapped himself with a wand of fire"`.

## Actionable C-wrongs

None for Must-fix. The `dozap` Sprintf matches C `:2661–2663` (`uhim` + `killer_xname` + `NO_KILLER_PREFIX`). WAN_LIGHTNING is a named omit of a `zapyourself` arm, not a stub killer format.

Named omits (map, not Must-fix):

1. `zapyourself` WAN_LIGHTNING / WAN_MAGIC_MISSILE (and other unported otyps)
2. `dothrow.c` throwit `:1747` `killer_xname` (next Open)
3. pickup / wield / invent / mthrowu / `do_wear` remaining `killer_xname`
4. `backfire` body; `lightdamage` `ansimpleoname`

Do not Must-fix “use `u.female` for `uhim`” (C does not). Do not Must-fix “self-zap should be `KILLED_BY`” (C is `NO_KILLER_PREFIX`).

## Callers / RNG ledger

C: `dozap` → `zapyourself` (existing RNG) → `killer_xname` / `uhim` (no RNG) → `losehp`. JS: same order. Public fortress is not that path.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: self-zap `losehp` now uses `uhim()` + `killer_xname`; lightning `zapyourself` and throwit `:1747` stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1345 `2a5e72e0`.
