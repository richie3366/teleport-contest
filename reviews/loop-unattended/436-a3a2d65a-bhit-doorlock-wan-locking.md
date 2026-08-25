# Review 436 — a3a2d65a — zap.c bhit doorlock WAN_LOCKING/SPE_WIZARD_LOCK (D-1475)

## Metadata
- Full / short hash: `a3a2d65a41ed48f1c7f586f68bd7c6d115aab8d9` / `a3a2d65a`
- Parent: `dfd88d1b` (D-1474). This file audits **this SHA only** (ninth / last of nine `js/` commits since review **427**). Archive **Addressed:** D-1475 was missing `%h`; this audit fills `a3a2d65a`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 13:42:40 +0200
- D-id: **D-1475**
- Stats: 11 files, +203 / −59 — `js/lock.js` +118 / −some; `js/zap.js` +25 / −some; `js/spell.js` comments.
- Claims to close: Open `zap.c` `bhit` doorlock WAN_LOCKING/SPE_WIZARD_LOCK (named from D-1474 / D-1462 / review **422**). Not OPENING. `reviews/loop-2026-08-15/` has no unpaid locking-doorlock Must-fix.
- JS / map: `lock.js` `doorlock` / `obstructed`; `zap.js` `bhit`. `c-js-map/turns.md`. STRIKING doorlock / `mbhit` / uchain named.
- Prior reviews this SHA claims to close: **422** named LOCKING after OPENING doorlock; **428** named doorlock LOCKING after boxlock; **435** Next Open was this row.

## Intent vs deliverable

Git subject promises: “Match C zap.c bhit doorlock WAN_LOCKING/SPE_WIZARD_LOCK so a lateral locking wand or wizard-lock spell locks a door or Rogue-hides a doorway instead of skipping doorlock.”

C `bhit` `:4056–4074`: `ZAPPED_WAND && (IS_DOOR || SDOOR)` then OPENING/**LOCKING**/STRIKING/KNOCK/**WIZARD_LOCK**/FORCE `doorlock`; `learnwand` iff `cansee` (STRIKING `!Deaf` extra is false here). Callee `lock.c` `doorlock` `:1103–1272`: SDOOR LOCKING/default **return FALSE** (`:1127–1130`); else `:1135–1192` Rogue hide as SDOOR `D_NODOOR`; `obstructed(mysterywand)` / `t_at` abort; CLOSED/ISOPEN/BROKEN/NODOOR messages then `D_LOCKED|(doormask&D_TRAPPED)` even when default already-locked `res=FALSE`. `block_point`; picking_at `stop_occupation`+`reset_pick` if `res`. OPENING is D-1462. STRIKING named.

Old JS: `bhit` called `doorlock` only for OPENING/KNOCK; `doorlock` defaulted LOCKING to false.

The diff **does** wire `bhit` LOCKING/WIZARD_LOCK and port the LOCKING/WIZARD_LOCK `doorlock` body + SDOOR no-op + `obstructed(..., quietly)`. It **does not** add STRIKING/FORCE doorlock (SDOOR appear-then-continue, trapped explode, `D_BROKEN` shop `add_damage`). Named. It **does not** add `Soundeffect`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `bhit` doorlock WAN_LOCKING/SPE_WIZARD_LOCK | C `:4056–4074`, **wired this SHA** | |
| `doorlock` LOCKING/WIZARD_LOCK | C `:1135–1192`, **wired this SHA** | SDOOR `:1127–1130` |
| `obstructed` `quietly` | C `lock.c` obstructed, **wired this SHA** | mysterywand skips pline |
| `t_at` / `Is_rogue_level` / `recalc_block_point` | C, **imported live** | `block_point` ≡ recalc |
| `You_hear` | C `pline.c`, **local clone** | Deaf/acoustics; Unaware named |
| `picking_at` / `reset_pick` | C, **imported live** | skipped on `!res` / Rogue early return |
| STRIKING/FORCE `doorlock` | C `:1201–1253`, **named omit** | |
| `Soundeffect` swoosh | C `:1145`, **named omit** | |
| `mbhit` doorlock | C `muse.c`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in the LOCKING arm (`obstructed`/`t_at` are predicates). Public fortress does not zap locking at a door.

## C ↔ JS fidelity

`bhit` now includes WAN_LOCKING/SPE_WIZARD_LOCK next to OPENING/KNOCK. **Not** STRIKING/FORCE. Match the LOCKING subset of `:4057–4063`. `learnwand` iff `cansee` — C’s extra `WAN_STRIKING && !Deaf` is false for these otyps. Match. **Callee is not a stub.** Hallucination check: “Match C doorlock LOCKING” while this SHA **ports** `:1135–1192` is **not** a dispatch-stub lie.

SDOOR `:1127–1130`: LOCKING/WIZARD_LOCK return **false** (no appear). JS. Match. STRIKING would appear then continue — still named (`default` return false).

Rogue `:1137–1158`: vis dustcloud in “older, more primitive doorway”; else `You_hear("a swoosh.")` (`Soundeffect` named). `obstructed(..., mysterywand)` then vis dissipates + false. Else `block_point`, `typ=SDOOR`, `doormask=D_NODOOR`, “The doorway vanishes!”, `newsym`, return true. JS `recalc_block_point` is this port’s `block_point`. Match strings (`dustcloud` / `quickly_dissipates` constants).

Non-Rogue: `obstructed` abort (no message if mysterywand). `t_at` dustcloud dissipates, false. Then mask `& ~D_TRAPPED`: CLOSED “locks”; ISOPEN “swings shut, and locks”; BROKEN “reassembles and locks”; NODOOR assemble; **default `res=FALSE`**. Then **always** `D_LOCKED | (doormask & D_TRAPPED)` + `newsym`. Already-locked: no pline (`msg` null), `res` false, mask stays locked. Match D-log.

`if (msg && cansee) pline`. `if (res && picking_at) stop_occupation; reset_pick`. Rogue/SDOOR early returns skip picking_at. Match `:1258–1272`. LOCKING never sets loudness (OPENING didn’t either). Named.

`You_hear`: Deaf / `flags.acoustics===false` skip. Same clone as `zap.js`. Unaware/Underwater named.

## Hallucinations / overclaim

Subject says a lateral locking wand or wizard-lock spell locks a door or Rogue-hides a doorway instead of skipping doorlock. **True:** closed lock + learnwand; SPE skip makeknown; trapped keeps `D_TRAPPED`; already-locked no-op `res`; SDOOR no-op; open/broken/nodoor messages; trap-in-doorway dissipates; Rogue hide; obstructed abort. **False until named** for STRIKING doorlock, `Soundeffect`, `mbhit`, uchain. Stamping **Addressed:** D-1475 for **bhit wire + LOCKING `doorlock` body** is fair. Do **not** stamp “Match C doorlock STRIKING.” Do **not** treat fortress PASS as a door lock zap.

## Density

One `doorlock` otyp pair plus the `bhit` caller C actually uses. ~90 lines of real JS. Playbook §2b. Did not glue STRIKING explode. Acceptable.

## Branch-by-branch confirm

1. Lateral WAN_LOCKING + CLOSED door: “The door locks!”, `D_LOCKED`, `learnwand` if cansee. Match `:1172–1190` / `:4064–4066`.
2. SPE_WIZARD_LOCK: same body; SPBOOK skip makeknown. Match.
3. Trapped closed: keeps `D_TRAPPED`. Match `:1190`.
4. Already `D_LOCKED`: `res=false`, no msg. Match `:1185–1186`.
5. SDOOR LOCKING: false, no appear. Match `:1127–1130`.
6. D_ISOPEN / D_BROKEN / D_NODOOR messages. Match `:1175–1183`.
7. `t_at` in doorway: dissipates, false. Match `:1164–1168`.
8. Rogue: hide as SDOOR `D_NODOOR`. Match `:1137–1158`.
9. Obstructed: abort; mysterywand skips pline. Match `:1148` / `:1160`.
10. OPENING still unlocks (D-1462). Unchanged.
11. STRIKING still skips `doorlock`. Named.
12. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. No hardcoded door coordinates. `mysterywand` is `WAND_CLASS && !dknown`, not a seed name.

## Verification

Journal: private canary **21**/21 (C/JS grep; closed lock+learnwand; SPE_WIZARD_LOCK SPBOOK skip makeknown; trapped keeps D_TRAPPED; already-locked no-op; SDOOR no-op; D_ISOPEN shut+lock; D_BROKEN reassemble; D_NODOOR assemble; trap-in-doorway dissipates; Rogue hide SDOOR; obstructed abort; OPENING regression; STRIKING named; bhit skips STONE; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session zaps locking at a door. I did not re-run the private canary. This audit cadence: full `sessions` at HEAD `a3a2d65a`.

## Actionable C-wrongs

None for Must-fix on **this** SHA. SDOOR no-op, Rogue hide, obstructed/`t_at`, lock-shut messages, already-locked `res=false` with `D_LOCKED` assign, and `bhit` learnwand match. `doorlock` is a C callee, not a glyph stand-in.

Named omits (map / Open, not Must-fix):

1. `bhit` doorlock WAN_STRIKING/SPE_FORCE_BOLT — Open already
2. `muse.c` `mbhit` doorlock — Open already
3. `Soundeffect` swoosh; loudness `wake_nearto` / shop `add_damage` (LOCKING does not set loudness)
4. `bhito` uchain / poly-arm `reset_pick`; `zap_map` engraving

Do not Must-fix “dispatch is a stub.” Do not Must-fix “SDOOR LOCKING should appear.” Do not Must-fix “already-locked should skip the `D_LOCKED` assign” (C still assigns). Do not Must-fix “STRIKING should have shipped in this SHA.”

## Callers / RNG ledger

C callers: `bhit` ZAPPED_WAND on door/SDOOR. LOCKING arm: no dice. Public fortress does not hit the new arm.

This SHA is HEAD. Archive D-1475 `%h` filled in this review commit.

Verdict: **ACCEPT-WITH-DEBT**
