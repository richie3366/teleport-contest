# Review 578 — 5c66e2ab — dogmove.c dog_move Conflict lose_guardian_angel (D-1617)

## Metadata
- Full / short hash: `5c66e2ab67d0a12b70f944cf92d79d25b3dfa9a1` / `5c66e2ab`
- Parent: `6d7584b0` (D-1616). This file audits **this SHA only** (sixth of nine `js/` commits since review **572**). Archive **Addressed:** D-1617 `5c66e2ab`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 03:15:51 +0200
- D-id: **D-1617**
- Stats: `js/dogmove.js` +8/−3, comment-only minion/mklev. Band **150–350** (js/ insertions **16**; C arm is **8** lines).
- Claims to close: Open dogmove Conflict `lose_guardian_angel` caller after D-1608 / D-1616. Not `gain_guardian_angel`. Not `dismount_steed`. `reviews/loop-2026-08-15/` has no unpaid dog_move Must-fix.
- JS / map: `dogmove.js` `dog_move`; body `minion.js`. `c-js-map/data.md`.
- Prior reviews this SHA claims to close: **569** named dogmove `:1051`; **577** named the same Open.

## Intent vs deliverable

Git subject promises: a Conflicted isminion guardian calls `lose_guardian_angel` then `MMOVE_DIED`, instead of returning died while the angel stays on the map.

Pinned C `dogmove.c` `dog_move` `:1046–1053` (after `dog_goal`). Callee `minion.c` `lose_guardian_angel` `:467–494` (D-1608). `--callers lose_guardian_angel`: `dogmove.c:1051` (`mtmp`); `minion.c:514` (NULL from `gain_guardian_angel` Conflict). Steed Conflict `dismount_steed(DISMOUNT_THROWN)` is earlier (`:1017–1020`), not this arm.

```1046:1053:nethack-c/upstream/src/dogmove.c
    if (Conflict && !resist_conflict(mtmp)) {
        if (!edog) {
            /* Guardian angel refuses to be conflicted; rather,
             * it disappears, angrily, and sends in some nasties
             */
            lose_guardian_angel(mtmp);
            return MMOVE_DIED; /* current monster is gone */
        }
    }
```

Old JS: `if (!edog) return MMOVE_DIED` with “lose_guardian_angel deferred.” Body already live for the NULL caller.

The diff **does** `await lose_guardian_angel(mtmp)` then `MMOVE_DIED`, import from `minion.js`. It **does not** port `dismount_steed(DISMOUNT_THROWN)`, SetVoice, or `gain_guardian_angel` (already D-1608). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dog_move` Conflict `!edog` | C `:1046–1053`, **LIVE this SHA** | |
| `lose_guardian_angel` | C `:467–494`, **LIVE** | D-1608; this SHA wires the live-`mon` caller |
| `mongone` / `mk_roamer` / `enexto` / `rn1` | C, **LIVE** | inside the callee |
| `hero_conflict` / `resist_conflict` | C `Conflict` / `resist_conflict`, **LIVE** | pre-existing |
| `dismount_steed` DISMOUNT_THROWN | C `:1018`, **OMIT named** | Open row; JS still `return MMOVE_MOVED` |
| SetVoice | C `:478`, **OMIT named** | callee no-op without SND_LIB |
| `gain_guardian_angel` | C `:497`, **LIVE** | D-1608; not this SHA |

`node scripts/csym.mjs dog_move` → `:976-1358` (arm `:1046-1053`). `--callers lose_guardian_angel` as above.

RNG: callee `rn1(3,2)` then up to four `enexto`/`mk_roamer` (D-1608). This SHA newly burns that stream on the **live** `mon` path. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
lose_guardian_angel js/minion.js:422   ASYNC — await required
dog_move         js/dogmove.js:793   ASYNC — await required
hero_conflict    js/mondata.js:80   sync
resist_conflict  js/mondata.js:98   sync
dismount_steed   js/steed.js:651   ASYNC — await required
```

`--can dogmove.js minion.js lose_guardian_angel`: ALREADY (new static import this SHA; function-body await only). Do **not** stamp “cycle-forced clone.” Do **not** add `lose_guardian_angel` #2. Do **not** inline `mongone` in `dogmove.js`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Predicate. After `dog_goal`; `Conflict && !resist_conflict`; `!edog` (guardian `isminion`, no `EDOG`). JS `hero_conflict() && !resist_conflict(mtmp)` then `!edog`. **Match `:1046–1052`.** `edog` present: fall through to `mfndpos` (Conflicted ordinary pet). **Match** (the `if (!edog)` is the only body).

Callee live-`mon`. `canspotmon` → `!Deaf` rebuke+verbalize else vanish; then `mongone`; then `rn1(3,2)` hostile `mk_roamer`. JS `:422–445`. **Match `:474–493`.** SetVoice named. Extra JS `u.Deaf` in the Deaf test is pre-existing D-1608 sticky, not this SHA.

Return. `MMOVE_DIED` because `mongone` removed `mtmp`. **Match `:1052`.** Old JS returned DIED with the angel still on `fmon`. That was the C-wrong this SHA deletes.

Callee closure (`!edog` arm). LIVE: `lose_guardian_angel`, `mongone`, `enexto`, `mk_roamer`, `rn1`, `verbalize`/`pline`. OMIT named: SetVoice. STUB: none. Arm may ship. Not “dispatch ported, callee stubbed.”

Steed. C `:1017–1020` `dismount_steed(DISMOUNT_THROWN)` then `MMOVE_MOVED`. JS still comments deferred and returns MOVED (may consume `rnd(20)`). **Named**, not this envelope.

## Hallucinations / overclaim

Subject Conflicted guardian vanishes and sends nasties: **true** (`await lose_guardian_angel(mtmp)`). D-log “body already live; this is the caller”: **true.** Do **not** stamp “Match C `dismount_steed(DISMOUNT_THROWN)` (`:1018`).” Do **not** stamp “Match C `gain_guardian_angel`” (already D-1608). Do **not** stamp “Match C SetVoice.” Public suite has no Astral guardian pet; seed0004 Conflict exercises the **edog** fallthrough, not this arm.

## Density

One 8-line C arm + live callee already shipped. +16 JS. Did not glue steed dismount. §2b OK (C that small).

## Branch-by-branch confirm

1. Conflict + resist: skip the arm. **Match.**
2. Conflict + `!resist` + edog: fall through. **Match.**
3. Conflict + `!resist` + `!edog`: lose then DIED. **Match this SHA.**
4. `lose_guardian_angel(null)` from gain. **Already D-1608.**
5. Steed DISMOUNT_THROWN. **Named.**

## Callers / RNG ledger

Wired: `dog_move` only for live `mtmp`. NULL caller remains `gain_guardian_angel`. New RNG on this path: `rn1(3,2)` + `enexto`/`mk_roamer` per spawn. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not return `MMOVE_DIED` without `lose_guardian_angel` for `!edog`. Do not `tamedog` the replacements. Do not glue `dismount_steed` into this arm. `reset_hostility` is D-1616. `m_unleash` is D-1609.

## Verification

D-log private canary **17**/17; green+strict seed8000/0900; cohort **7**/7 + strict (incl. seed0004 Conflict). **Public-unhit** for an isminion guardian under Conflict (Astral pet). seed0004 proves Conflict+edog still PASSes, not the `!edog` arm. Steed DISMOUNT_THROWN unhit.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `dismount_steed(DISMOUNT_THROWN)` (`dogmove.c:1018`); SetVoice in the callee; Hear_again occupation afternmv. Do not add `lose_guardian_angel` in `dogmove.js`. Do not skip `mongone` on the live `mon` path.

Verdict: **ACCEPT-WITH-DEBT**
