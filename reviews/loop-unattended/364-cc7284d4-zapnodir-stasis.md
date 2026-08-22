# Review 364 — cc7284d4 — zap.c zapnodir WAN_STASIS (D-1404)

## Metadata
- Full / short hash: `cc7284d49c926792e7df06e5de2c9672f0977a79` / `cc7284d4`
- Parent: `d9134735` (D-1403). This file audits **this SHA only** (ninth of nine `js/` commits since review **355**). Archive **Addressed:** D-1404 lacked the short hash; this review commit fills `cc7284d4`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-22 01:55:18 +0200
- D-id: **D-1404**
- Stats: 9 files, +111 / −31 — `js/zap.js` +18 / −4 (`WAN_STASIS` const + zapnodir arm).
- Claims to close: Open `zap.c` `zapnodir` WAN_STASIS (named from D-1380 / review **355**). Not enlightenment. `reviews/loop-2026-08-15/` has no unpaid stasis Must-fix.
- JS / map: `zap.js` `zapnodir`. Field `rm.h` `stasis_until` (`js` `game.level.flags`). Live consumers `teleport.js` `noteleport_level` / `u_teleport_mon`, `apply.js` `magic_whistled`, `timeout.js` `revive_mon`. `c-js-map/turns.md`. SPE_DETECT_UNSEEN / potion peffect / artifact invoke / #timeout display still named.
- Prior reviews this SHA claims to close: **340** / **355** named STASIS after wishing / enlightenment.

## Intent vs deliverable

Git subject promises: “Match C zap.c zapnodir WAN_STASIS so zapping that wand sets silent stasis_until (longest duration), instead of remaining a no-op.”

C `zap.c` `zapnodir` `:2559–2568`:

```
    case WAN_STASIS: {
        long tmp_until = svm.moves + (long) rn1(21, 10);
        /* no immediately obvious effect, and no message … keep the longest */
        if (tmp_until > svl.level.flags.stasis_until)
            svl.level.flags.stasis_until = tmp_until;
        break;
    }
```

`known` is initialized FALSE (`:2541`) and this arm never assigns it, so `:2595–2601` does not `learnwand` / `more_experienced`. `rn1(21,10)` is `rn2(21)+10` (`hack.h:1535`) → 10..30. Field `rm.h:470`. Wand is NODIR (`objects.h:1460–1461`). Caller `weffects` `:3453–3454` already live. Broken-wand apply (`apply.c:3991–3994`) is `nothing_else_happens`, not this arm. Engrave `doengrave_sfx_item_WAN` `:590–597` is a **second** caller of `zapnodir`.

Old JS: zapnodir default skip after D-1395 enlightenment.

The diff **does** add `WAN_STASIS` and the silent max-duration arm, leaving `known` false. It does **not** port SPE_DETECT_UNSEEN (C shares SECRET_DOOR `findit`). Named. It does **not** add `wiz_timeout_queue` “Level is no-teleport for N turns” (`timeout.c:2115–2122`). Named. D-log “engrave NODIR already calls zapnodir” is **false in JS** (`engrave.js` has no `zapnodir`); that is a docs overclaim, not a live engraving path.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| WAN_STASIS arm | C `:2559–2568`, **wired** | silent; known stays FALSE |
| `rn1(21,10)` | C `hack.h:1535`, **imported live** | rng.js `rn2(x)+y` |
| `stasis_until` field | C `rm.h:470`, **wired** | mklev zeros; save copies `level_flags` |
| `weffects` NODIR | C `:3453–3454`, **already live** | oc_dir === NODIR (confirmed 1) |
| `learnwand` / XP | C `:2595–2601`, **already live** | gated off because known FALSE |
| `noteleport_level` | C `teleport.c:43–44`, **already live** | even covetous |
| `u_teleport_mon` | C `:2269–2273`, **already live** | |
| `magic_whistled` | C `apply.c:530–531`, **already live** | |
| displacer `revive_mon` | C `do.c:2262`, **already live** | `< moves` bump |
| SPE_DETECT_UNSEEN | C `:2552–2558`, **named omit** | already Open |
| `doengrave_sfx_item_WAN` | C `engrave.c:590–597`, **named omit** | JS engrave never calls zapnodir |
| `wiz_timeout_queue` line | C `timeout.c:2115–2122`, **named omit** | |
| potion / artifact | **named omit** | not this wand |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** one `rn1(21,10)` ≡ one `rn2(21)` per zap. Public fortress never zaps this wand, so the extra die is public-unhit.

## C ↔ JS fidelity

`tmp_until = (game.moves|0) + rn1(21,10)`; keep if `tmp_until > (stasis_until|0)`. Match `:2560–2566` (`>` not `>=`; equal duration does not rewrite). No pline. `known` stays false so no discover/XP. Match. `!dknown` still sets the field (C never gates on dknown here). Second zap with a **shorter** roll leaves the longer deadline. Match the comment.

Consumers already compare `stasis_until >= moves` (teleport / whistle) and `stasis_until < moves` (displacer bump). Those are live C ports, not stubs. `noteleport_level` uses `?? -1` when the field is missing (C’s 0L); with mklev init `stasis_until=0` both fail the `>= moves` test for ordinary `moves>=1`. Not a C-wrong of this arm.

JS save spreads `level.flags` as absolute `stasis_until` (`save.js` `level_flags`). C `save_adjust_levelflags` / `rest_adjust_levelflags` convert relative to `moves`. Absolute round-trip is correct **if** `moves` restores with the same payload; it is not C’s on-disk encoding. Named difference of save format, not a zapnodir clone.

Hallucination check: “Match C `zapnodir` WAN_STASIS” while **the arm writes the live `level.flags.stasis_until` field** and consumers already read it is not a dispatch-stub lie. Do **not** stamp “Match C SPE_DETECT_UNSEEN.” Do **not** stamp “Match C engrave wand sfx” (JS never calls `zapnodir` from `doengrave`). Do **not** stamp “Match C #timeout stasis line.” Do **not** stamp “Match C broken-wand stasis effect” (C is `nothing_else_happens`; JS apply already matches that other locus).

## Hallucinations / overclaim

Subject says zapping that wand sets silent longest `stasis_until` instead of a no-op. **True on the keep-path** for a charged NODIR zap (`weffects` → `zapnodir`). **True that `known` stays FALSE.** **False until named for engraving / #timeout display / SPE_DETECT_UNSEEN.** D-log “dknown silent no makeknown/XP + rn2(21) duration; !dknown still sets until; keep longest; replace shorter; `noteleport_level` including covetous” are the right falsifiers. Stamping **Addressed:** D-1404 for `:2559–2568` is fair. The D-log sentence “engrave NODIR already calls zapnodir” overclaims JS. Do **not** treat fortress PASS as a wand of stasis.

## Density

One NODIR `case` plus the `WAN_STASIS` const. ~22 lines of JS. Playbook §2b right size (sibling of D-1395, not glued into enlightenment). Did not glue SPE_DETECT_UNSEEN (Open). Did not rewrite `noteleport_level`.

## Branch-by-branch confirm

1. dknown unseen type: `rn1(21,10)` sets until; no pline; no learnwand/XP. Match.
2. !dknown: same field write; still no learnwand. Match.
3. already `oc_name_known`: still silent; no extra XP. Match.
4. second zap longer roll: until grows. Match `>`.
5. second zap shorter roll: until kept. Match.
6. LIGHT / CREATE / WISH / ENLIGHTENMENT arms unchanged. Match D-1366/D-1379/D-1380/D-1395.
7. SPE_DETECT_UNSEEN: still default skip. Named (already Open).
8. **Public-unhit** until a session zaps WAN_STASIS.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Duration is `rn1(21,10)`, not a recorded constant. Plain ESM.

## Verification

Journal: private canary **15**/15 (C/JS grep; NODIR; dknown silent no makeknown/XP + rn2(21) duration; !dknown still sets until; keep longest; replace shorter; `noteleport_level` including covetous; LIGHT/CREATE/WISH/ENLIGHTENMENT regression; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `cc7284d4` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `39+0.31/turn` (R² 0.85). Fortress PASS is not a wand of stasis.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The arm matches `:2559–2568` call-for-call (one `rn1`, max duration, silent, `known` FALSE). Remaining gaps are named omits / a D-log overclaim about engrave.

Named omits (map / already-Open, not Must-fix):

1. `zap.c` `zapnodir` SPE_DETECT_UNSEEN (already Open)
2. `engrave.c` `doengrave_sfx_item_WAN` NODIR → `zapnodir` (JS engrave never calls it)
3. `timeout.c` `wiz_timeout_queue` stasis line
4. potion.c `peffect_enlightenment`; artifact invoke

Do not Must-fix “learnwand when dknown” (C keeps known FALSE so the wand stays undiscovered). Do not Must-fix “pline so the player can tell NODIR types apart” (C comment forbids it). Do not Must-fix “sum durations instead of max” (C keeps longest). Do not Must-fix “broken wand should set stasis” (C `nothing_else_happens`). Do not Must-fix “`?? -1` in `noteleport_level`” (pre-existing; mklev zeros the field).

## Callers / RNG ledger

C this arm: one `rn1(21,10)` = one `rn2(21)`. JS same. No trailing `learnwand` `rn2(19)` because `known` is FALSE. Public fortress never needs this die. `weffects` still `exercise(A_WIS)` before the switch (C `:3436`) — pre-existing, not this SHA.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: NODIR stasis now writes live `stasis_until` as C’s silent max `moves+rn1(21,10)` without `learnwand`; SPE_DETECT_UNSEEN and engrave/`#timeout` stay named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1404 `cc7284d4`.
