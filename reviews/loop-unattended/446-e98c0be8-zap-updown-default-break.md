# Review 446 — e98c0be8 — zap.c zap_updown default break into down bhitpile+zap_map (D-1485)

## Metadata
- Full / short hash: `e98c0be83ba6f97b606a2b56169e84c8ff6bb126` / `e98c0be8`
- Parent: `7b7e2dfa` (audit #1870, reviews **437–445**). This file audits **this SHA only** (first of nine `js/` commits since review **445**). Archive **Addressed:** D-1485 `e98c0be8` already has the short hash (filled in this port commit). Review **437** already stamps `**Addressed:** D-1485 e98c0be8`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 16:51:16 +0200
- D-id: **D-1485**
- Stats: 11 files, +89 / −37 — `js/zap.js` +18 / −12 (comments plus two live lines: `return false` → `break`). Docs/queue/journal/map dominate.
- Claims to close: Must-fix from review **437** — `zap.c` `zap_updown` `default` must `break` into the shared down `bhitpile`+`zap_map` epilogue (C `:3378–3389`). Not probing. Not lateral `bhit`. `reviews/loop-2026-08-15/` has no unpaid zap_updown Must-fix.
- JS / map: `zap.js` `zap_updown`; callees `bhitpile` / `zap_map` / `maybe_explode_trap` already live (D-1476). `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **437** QUALITY-RISK (the only Must-fix that iteration). **445** named potion_dip next, not this.

## Intent vs deliverable

Git subject promises: “Match C zap.c zap_updown default so an unmounted downward POLY/cancel/invis/tele zap hits bhitpile+zap_map instead of returning before the shared epilogue.”

Pinned C `zap_updown` switch ends:

```3378:3389:nethack-c/upstream/src/zap.c
    default:
        break;
    }

    if (u.dz > 0) {
        /* zapping downward */
        (void) bhitpile(obj, bhito, x, y, u.dz);

        /* note: engraving handling that used to be here has been moved
           to zap_map() */
        if (!map_zapped)
            zap_map(x, y, obj);
```

Caller `weffects` `:3440–3446`: IMMEDIATE, not swallowed, `u.dz` → `disclose = zap_updown(obj)`. Riding-down those otyps take `zap_steed` first (`:3437–3439`) and skip `zap_updown` when `steedhit`. PROBING is a named case that `return TRUE` before the epilogue (`:3262`). OPENING/STRIKING/LOCKING/STONE already `break`.

Old JS after D-1466: `default: return false` so unmounted down POLY/cancel/invis/tele never reached D-1476’s `zap_map` arms. Review **437** named that as the production hole. This SHA’s live hunk is exactly that `return false` → `break`. Comment-only updates on `weffects` / file banners.

The diff **does** open the shared epilogue for every default IMMEDIATE otyp, not only the four in the subject (SLOW/SPEED/HEALING/DRAIN/TURN_UNDEAD also fall here in C). The diff **does not** port lateral `zap_map` `:3685–3717` or `bhit` `:3919–3924`. Named at this SHA (later D-1489). It **does not** add `map_zapped`; probing still returns early so the flag is dead in both trees.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `zap_updown` `default` | C `:3378–3379`, **wired this SHA** | `break`, not `return false` |
| down epilogue `bhitpile`+`zap_map` | C `:3382–3389`, **already live** | reached now |
| up hideunder `bhito` | C `:3391–3407`, **already live** | default otyps reach it now |
| `weffects` → `zap_updown` | C `:3445–3446`, **unchanged caller** | |
| `zap_map` / `maybe_explode_trap` | C `:3594–3683`, **C callee already live (D-1476)** | not a stub |
| `bhitpile` / `bhito` | C, **imported live** | floor items on down |
| `rloc_engr` / `del_engr` / `random_engraving` | C `engrave.c`, **imported live** | D-1476 |
| `zap_steed` riding-down | C `:3087–3140`, **unchanged** | still skips `zap_updown` |
| lateral `zap_map` / `bhit` `:3921` | C `:3685–3717`, **named omit at this SHA** | |
| `force_decor` / Rogue `draft_message` / VS `the` | C probing tail, **named omit** | pre-existing D-1444 |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates in the `js/` hunk. Grep `FORCE` is `SPE_FORCE_BOLT`. Rule #2 clean. **New gameplay RNG in this SHA:** none. Dice live in the already-ported `zap_map` arms (`d(3,6)` explode; poly `random_engraving`; STONE/STRIKING `d(2,4)`; `rloc_engr` `rn1`/`rn2`) which this SHA **reaches**. Public fortress does not zap those otyps down at an engraving or magical trap.

## C ↔ JS fidelity

At this SHA:

```
    default:
        /* C zap.c :3378–3379 — break into shared down bhitpile
         * + zap_map / up hideunder (D-1485). */
        break;
    }

    /* C zap.c :3382–3408 — PROBING already returned. */
    if (dz > 0) {
        await bhitpile(obj, bhito, x, y, dz);
        await zap_map(x, y, obj);
    } else if (dz < 0) {
```

Branch order matches C. `default` does not set `disclose`; `return disclose` is still false unless the up-hideunder arm hits. `weffects` therefore does not `learnwand` from disclose; `zap_map` may `learnwand` internally when `learn.v` (cancel trap). Same split as C.

JS always calls `zap_map` on down. C uses `if (!map_zapped)`. `map_zapped` is initialized FALSE and the only writer is a commented probing line (`:3249`) because probing returns first. Equivalent.

Switch cases match C’s named set: PROBING (early return); OPENING/KNOCK; STRIKING/FORCE + LOCKING/WIZARD_LOCK; STONE_TO_FLESH; else default. JS folds striking+locking into one `case` with a `striking` boolean — that is D-1456/D-1465, not this SHA — and still `break`s into the same epilogue.

Callee `zap_map` at this SHA already has `maybe_explode_trap` then the down engraving switch (POLY rewrite, CANCEL/INVIS `del_engr`, TELE `rloc_engr`, STONE ENGRAVE wipe, STRIKING wipe, default no-op). **`explode` / `deltrap` / `rloc_engr` are not stubs.** Hallucination check: “Match C” for this **dispatch** while the **callee is live D-1476** is **not** a dispatch-stub lie. Review **437**’s hole was the caller, not a fake `zap_map`.

Lateral `else if (!u.dz)` is still an empty comment at this SHA (`/* C :3685–3717 — lateral drawbridge named */`). This SHA does not claim it. `bhit` still does not call `zap_map`. Named.

Riding-down POLY/cancel/invis/tele: `weffects` `:3437–3439` / JS `zap_steed` already returns `steedhit` for those otyps (D-1455/D-1470/D-1471/D-1473). Both trees skip `zap_updown`. Unmounted is the path this SHA opens.

Up (`dz<0`) default now reaches hideunder `bhito` of the cover object. Previously `return false` skipped it. That is C `:3391–3407`, not just the down promise. Pre-existing `objects_at` vs C `level.objects[ux][uy]` top-of-pile is not introduced here.

## Hallucinations / overclaim

Subject says an unmounted downward POLY/cancel/invis/tele zap hits `bhitpile`+`zap_map` instead of returning. **True.** D-log “callee `zap_map` already D-1476” is **true**; this SHA is the missing `break`. Stamping **Addressed:** D-1485 for the **caller** is fair. Do **not** stamp “Match C lateral drawbridge `zap_map`” (still named here). Do **not** treat fortress PASS as a down-zap at Elbereth or MAGIC_TRAP. Do **not** claim riding-down cancel now `del_engr`s the floor (C `zap_steed` still skips). The subject names four otyps; C default is **all other IMMEDIATE** otyps — JS now matches that wider set. That is more than the subject, not less.

Private canary **22**/22 lists weffects unmounted down cancel `del_engr`, poly rewrite, tele `rloc_engr`, portal tseen+learnwand, MAGIC_TRAP explode. Those assertions are the production path **after** this SHA, unlike **437**’s helper-only canary. I did not re-run it.

## Density

Must-fix pop: two live JS lines plus comments. Playbook §2b “one deferred `if` alone” is waste for a green map-driven peel; **this was the written Must-fix**, so the small envelope is the right size. Did not glue lateral drawbridge. Acceptable.

## Branch-by-branch confirm

1. Unmounted down WAN_CANCELLATION + floor engraving: C `del_engr` via epilogue. JS now reaches it. **Match `:3658–3661`.**
2. Unmounted down WAN/SPE_POLYMORPH: C rewrite. JS reaches. **Match `:3652–3657`.**
3. Unmounted down WAN_TELEPORTATION / SPE_TELEPORT_AWAY: C `rloc_engr`. JS reaches. **Match `:3663–3666`.**
4. Unmounted down WAN_MAKE_INVISIBLE: C `del_engr`. JS reaches. **Match `:3658–3661`.** SPE_INVISIBILITY is not in C’s switch.
5. Unmounted down cancel + MAGIC_PORTAL: C shield+tseen+learnwand. JS reaches `maybe_explode_trap`. **Match `:3604–3610`.**
6. Unmounted down cancel + MAGIC_TRAP: C explode+deltrap. JS reaches. **Match `:3611–3620`.**
7. Unmounted down cancel + PIT: C no-op. JS reaches no-op. **Match.**
8. HEADSTONE: skipped inside `zap_map`. **Match if reached** (now reached).
9. Down STONE / STRIKING / OPENING / LOCKING: already `break` before this SHA. Unchanged.
10. PROBING: still early `return true`. Unchanged. **Match `:3262`.**
11. Riding-down those otyps: `zap_steed`, skip `zap_updown`. Unchanged. **Match `:3437–3439`.**
12. Up default + hiding under an object: C `bhito` then `hideunder`. JS now reaches. **Match `:3397–3406`.**
13. Down WAN_SLOW_MONSTER (also default): C `bhitpile` then `zap_map` engraving default no-op. JS now does the same. **Match.** Not in the subject; not a miss.
14. Lateral `bhit` still no `zap_map`. Named at this SHA.
15. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. No hardcoded engraving coordinates. `SPE_FORCE_BOLT` in comments is the C spell name.

## Verification

Journal: private canary **22**/22 (C/JS grep; Rule #2; weffects unmounted down cancel/invis `del_engr`; poly rewrite; tele `rloc_engr`; SPE skip makeknown; portal tseen+learnwand; MAGIC_TRAP explode+deltrap; PIT no-op; HEADSTONE skip; STONE smoother; striking DUST wipe; up/lateral skip; riding-down `zap_steed`; probing/OPENING regression); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None for this SHA’s Must-fix. The **437** hole is closed.

Named omits (map / Open, not Must-fix; still true **at this SHA**):

1. `zap_map` lateral drawbridge / `bhit` `:3921` — Open then; later D-1489
2. `force_decor` ice/furniture; Rogue `draft_message`; Invocation_lev VS `the`

Do not Must-fix “`zap_map` body is a stub” (D-1476 already matched). Do not Must-fix “STONE/STRIKING never reached the epilogue” (those cases already `break`). Do not Must-fix “riding-down cancel should `del_engr`.” Do not Must-fix “lateral drawbridge should have shipped in this SHA.”

## Callers / RNG ledger

C caller: `weffects` IMMEDIATE `u.dz` (and not swallowed; not a successful `zap_steed`). JS same. New dice: none in the two-line hunk; the reached `zap_map` arms keep D-1476’s dice. Public fortress does not hit them.

Verdict: **ACCEPT**
