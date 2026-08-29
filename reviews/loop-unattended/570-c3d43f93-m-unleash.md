# Review 570 — c3d43f93 — apply.c m_unleash / mon.c m_detach (D-1609)

## Metadata
- Full / short hash: `c3d43f935866005361aee56ea4c1627eb6fc8f93` / `c3d43f93`
- Parent: `43209cfb` (D-1608). This file audits **this SHA only** (seventh of nine `js/` commits since review **563**). Archive **Addressed:** D-1609 `c3d43f93`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 01:31:58 +0200
- D-id: **D-1609**
- Stats: `js/apply.js` +23/−6, `js/dogmove.js` +8/−3, `js/mhitm.js` +12/−7, `js/trap.js` +3, `js/uhitm.js` +3. Band **150–350** (js/ insertions **49**).
- Claims to close: Open `m_unleash` after D-1608. Not newcham mleashed. Not keepdogs. Not grow_up leash. `reviews/loop-2026-08-15/` has no unpaid m_unleash Must-fix.
- JS / map: `apply.js` `m_unleash` / `o_unleash`; `mhitm.js`/`trap.js`/`uhitm.js` `mondead`; `dogmove.js` ALLOW_U. `c-js-map/turns.md` / `data.md`.
- Prior reviews this SHA claims to close: **547** / **555** named `m_unleash` inside `newcham`.

## Intent vs deliverable

Git subject promises: death and ALLOW_U leash-break clear the attached leash and perm_invent like C.

Pinned C `apply.c` `m_unleash` `:725–742`. `o_unleash` `:710–722`. `get_mleash` `:879+`. `m_detach` `:2741–2742`. `dogmove.c` ALLOW_U `:1281–1284`. `explmm` `:993–1004`. `use_leash` `:859`/`:871`. `mleashed_next2u` `:908`. `--callers m_unleash`: m_detach `:2742`; dogmove `:1284`/`:1529`; dog.c keepdogs/grow_up; newcham `:5389`; apply `:973`; steed; teleport.

```725:742:nethack-c/upstream/src/apply.c
void
m_unleash(struct monst *mtmp, boolean feedback)
{
    ...
    if (feedback) {
        if (canseemon(mtmp))
            pline_mon(mtmp, "%s pulls free of %s leash!", ...);
        else
            Your("leash falls slack.");
    }
    if ((otmp = get_mleash(mtmp)) != 0) {
        otmp->leashmon = 0;
        update_inventory();
    }
    mtmp->mleashed = 0;
}
```

Old JS: `pline` not `pline_mon`; no `update_inventory`; `mondead` skipped unleash; ALLOW_U cleared `mleashed` only.

The diff **does** `pline_mon` + inventory on the live body, FALSE from all three `mondead` clones, ALLOW_U `pline_mon` then `m_unleash(FALSE)`, explmm slack after mondead (no second leashmon walk), and sibling attach/detach/`o_unleash`/`mleashed_next2u` inventory. It **does not** wire newcham `:5387–5394`, dogmove mimic `:1525–1529`, keepdogs, grow_up, steed, or teleport. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `m_unleash` | C `:725–742`, **LIVE this SHA** | FALSE path has no await |
| `o_unleash` inventory | C `:721`, **LIVE this SHA** | eat.js still has a local clone |
| `get_mleash` | C `:879`, **LIVE** | |
| `pline_mon` | C display, **LIVE** | |
| `update_inventory` | C invent, **LIVE** | default Off no-op |
| `mondead` → FALSE | C `m_detach` `:2741–2742`, **LIVE this SHA** | all 3 JS clones |
| explmm slack after | C `:1001–1004`, **LIVE this SHA** | |
| dogmove ALLOW_U | C `:1281–1284`, **LIVE this SHA** | `mhis` vs female/his |
| use_leash attach/remove | C `:859`/`:871`, **LIVE this SHA** | |
| `mleashed_next2u` | C `:908`, **LIVE this SHA** | |
| newcham `m_unleash(TRUE)` | C `:5387–5394`, **OMIT named** | |
| dogmove mimic slack | C `:1525–1529`, **OMIT named** | |
| keepdogs / grow_up / steed / teleport | **OMIT named** | |
| Hallu `mhis` | C `mhis(mtmp)`, **OMIT named** | |
| eat.js `o_unleash` | **CLONE leftover** | do not add #3 |

`node scripts/csym.mjs m_unleash` → `:725-742`. `o_unleash` → `:710-722`. `--callers` as above. `m_detach` unleash is `:2741–2742`.

RNG: none in `m_unleash`. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names:

```
m_unleash        js/apply.js:1461   ASYNC — await required
o_unleash        js/apply.js:1439   sync
             !! ALSO 1 LOCAL CLONE (eat.js:2159) — IMPORT the export; Do NOT add #3
get_mleash       js/apply.js:1424   sync
pline_mon        js/display.js:4589   ASYNC — await required
update_inventory js/invent.js:2632   sync
```

`--can dogmove.js apply.js m_unleash`: ALREADY. Same for `mhitm.js` / `trap.js` / `uhitm.js`. Do **not** stamp “cycle-forced clone.” Do **not** add `m_unleash` #2. Do **not** add `o_unleash` #3. FALSE callers may omit await (no `await` in that arm).

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Body. Feedback: `canseemon` → `pline_mon` “pulls free”; else slack. Then `get_mleash` → `leashmon=0` + `update_inventory`; then `mleashed=0`. **Match `:730–741`.** FALSE skips pline so sync `mondead` can call it without await. **Match.** SetVoice named (pline_mon is set_msg_xy + pline).

`o_unleash`. Always `update_inventory` after clearing. **Match `:721`.** eat.js clone still local. Named leftover.

`m_detach`. All three JS `mondead` clones call `m_unleash(mtmp, false)` when `mleashed`. **Match `:2741–2742`.** There is no fourth `mondead`.

explmm. Snapshot `was_leashed`; `mondead` (now unleashes FALSE, no slack); then “Your leash falls slack.” Removed the extra leashmon walk (that would have raced the FALSE clear). **Match `:993–1004`.**

ALLOW_U. `pline_mon` “breaks loose” then `m_unleash(FALSE)` then `mattacku`. **Match `:1281–1287`.** Pronoun is `female ? her : his`, not `mhis`. Named Hallu.

use_leash / next2u. Inventory on attach, cursed-stuck skip, remove, and slack snap. **Match `:859`/`:871`/`:908`.**

Callee closure (death + ALLOW_U arms). LIVE: `m_unleash`, `get_mleash`, `pline_mon`, `update_inventory`. OMIT named: newcham TRUE / mimic `:1529` / keepdogs. STUB: none in those arms. Combined-arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject death and ALLOW_U clear leash + perm_invent: **true** (Off still no-ops `update_inventory`). D-log “three mondead clones”: **true.** Do **not** stamp “Match C newcham `:5389` TRUE / leashable `update_inventory`.” Do **not** stamp “Match C dogmove mimic `:1529`.” Do **not** stamp “Match C keepdogs / grow_up / steed / teleport.” Do **not** stamp “Match C Hallu `mhis`.” Do **not** stamp “retired eat.js `o_unleash` clone.” Public leash deaths are rare.

## Density

One `m_unleash` envelope plus C death/ALLOW_U callers and sibling inventory. +49 JS. Did not glue newcham. §2b OK.

## Branch-by-branch confirm

1. TRUE + canseemon: `pline_mon` pulls free, inventory, `mleashed=0`. **Match.**
2. TRUE + unseen: slack, inventory. **Match.**
3. FALSE from mondead: no pline, still inventory. **Match.**
4. explmm slack after that FALSE. **Match.**
5. ALLOW_U breaks-loose then FALSE. **Match** (pronoun named).
6. newcham / mimic `:1529` / keepdogs. **Named.**

## Callers / RNG ledger

Wired: mhitm/trap/uhitm `mondead`; dogmove ALLOW_U; apply leash ops. Unwired C callers named. No RNG. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Do not add `m_unleash` #2. Do not add `o_unleash` #3. Do not restore explmm’s second leashmon walk. Do not await FALSE from sync `mondead`. Do not wrap `wildmiss` as `pline_mon`. Do not glue newcham in this Open.

## Verification

D-log private canary **22**/22; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for leashed pet death / ALLOW_U break. Fortress does not prove `leashmon=0`. newcham / keepdogs unhit.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): newcham `mleashed` `m_unleash(TRUE)` / `update_inventory` (`mon.c:5387–5394`); dogmove mimic `:1525–1529`; keepdogs / grow_up (`dog.c`); steed; teleport `:805`; Hallu `mhis`; eat.js `o_unleash` clone; `unleash_all` bones. Do not add `m_unleash` #2. `gain_guardian_angel` is D-1608.

Verdict: **ACCEPT-WITH-DEBT**
