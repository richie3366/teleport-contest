# Review 320 — fbfc72d9 — dokick.c dokick wake_nearby (D-1358)

## Metadata
- Full / short hash: `fbfc72d9af16f7cd746479a69d30d688815509c3` / `fbfc72d9`
- Parent: `0be5135b` (D-1357). This file audits **this SHA only** (last of four `js/` commits since review **316**). Archive **Addressed:** D-1358 lacked the short hash; this review commit fills `fbfc72d9`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 11:44:52 +0200
- D-id: **D-1358**
- Stats: 9 files, +88 / −27 — `js/dokick.js` +11 / −3 (import + one call).
- Claims to close: Open `dokick.c` `wake_nearby` caller (C `:1383` after maybe_kick; callee live; named from D-1350 / reviews **312** / **316** chain). Not knockback. `reviews/loop-2026-08-15/` has no unpaid wake Must-fix.
- JS / map: `dokick.js` `dokick`; callee `mon.js` `wake_nearby` (D-1007) → `wake_nearto_core`; `c-js-map/turns.md`. `u_wipe_engr(2)` still named (next Open). trap/lock/timeout/dig local `wake_nearby` no-ops stay other files.
- Prior reviews this SHA claims to close: **312** named `dokick()` `:1383` as a different function from martial knockback; D-1350 **Not this iter**.

## Intent vs deliverable

Git subject promises: “Match C dokick.c dokick so a kick actually wakes nearby sleepers (wake_nearby after maybe_kick), instead of leaving them asleep through kick_monster.”

C `dokick` (`dokick.c:1372–1388`):

```
    mtmp = isok(x, y) ? m_at(x, y) : 0;
    if (mtmp) {
        oldglyph = glyph_at(x, y);
        if (!maybe_kick_monster(mtmp, x, y))
            return (svc.context.move ? ECMD_TIME : ECMD_OK);
    }

    wake_nearby(FALSE);
    u_wipe_engr(2);

    if (!isok(x, y)) {
        gm.maploc = &gn.nowhere;
        kick_ouch(x, y, "");
        return ECMD_TIME;
    }
```

C callee `wake_nearby` (`mon.c:4367–4370`) → `wake_nearto_core(u.ux, u.uy, u.ulevel * 20, petcall)` (`:4374–4398`): `DEADMONSTER` skip; `dist2 < radius`; `wake_msg`; clear `msleeping`; `!G_UNIQ` clear `STRAT_WAITMASK`; `petcall` whistletime only if `!mon_moving`.

Old JS: comment stub after maybe_kick; `kick_monster` still saw `msleeping` (evade `!msleeping` gate).

The diff **does** `await wake_nearby(false)` after the maybe_kick keep-path, before `isok` / `kick_monster`. Import is the live `mon.js` export, not a dokick-local no-op. It does **not** call `u_wipe_engr(2)`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dokick` `wake_nearby(FALSE)` | C `:1383`, **wired** | after maybe_kick keep; before wipe/isok/kick_monster |
| `wake_nearby` | C `mon.c:4367–4370`, **imported live** | D-1007; not trap.js/lock.js/dig.js/timeout.js clones |
| `wake_nearto_core` | C `:4374–4398`, **live via callee** | `ulevel*20`; petcall FALSE skips whistletime |
| `maybe_kick_monster` early return | C `:1378–1380`, **pre-existing** | declined peaceful skips wake |
| `u_wipe_engr(2)` | C `:1384`, **named omit** | body D-1051; next Open |
| shop-town watchman | C later, **named omit** | |
| trap/lock/timeout/dig `wake_nearby` | other files, **pre-existing no-op clones** | not this SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none in the caller. Callee has no RNG (`dist2` geometry; `wake_msg` display).

## C ↔ JS fidelity

Call site order matches `:1377–1387` except the omitted wipe: maybe_kick fail returns first; no-monster still wakes; then (wipe named); then `!isok` → `kick_ouch`. JS `wake_nearby(false)` is C `FALSE` (whistle path off). Callee: `wake_nearto_core(ux, uy, ulevel*20, false)` — `!!petcall` so boolean false, not a truthy string. Match `:4369` / `:4388–4389` (`mon_moving \|\| !petcall` → continue, no whistletime).

JS `dokick` still skips C swallow / pit / levitation brace **before** maybe_kick (`dokick.c` earlier). Those remain named no_kick-adjacent omits (D-0786 Open). They do not change this call’s position on the keep-path.

Local `function wake_nearby(_petcall) {}` in `trap.js` / `lock.js` / `timeout.js` / `dig.js` still no-op **those** callers. This SHA does not claim to replace them. Honest in D-1358 **Not this iter**.

Hallucination check: “Match C `dokick`” while **`u_wipe_engr` is omitted** is an overclaim on **engraving smudge**. The **`:1383` call** is live (`mon.js` `wake_nearby`, not a stub that returns immediately). Do **not** stamp “Match C `u_wipe_engr`.” Do **not** stamp “Match C trap.c `wake_nearby`.” Do **not** stamp “Match C `kick_monster` evade” as new logic — evade already existed; this SHA only clears `msleeping` first.

## Hallucinations / overclaim

Subject says a kick wakes nearby sleepers instead of leaving them asleep through `kick_monster`. **True on the keep-path:** `wake_nearby(FALSE)` runs before `kick_monster`, so `msleeping` is already 0 for the evade test. **False until named for `u_wipe_engr`.** False for declined peaceful (C returns before wake — JS same). Stamping **Addressed:** D-1358 for the caller is fair. Do **not** treat fortress PASS — including seed0060 kick — as a `"X wakes up."` line unless that session had a sleeper in `ulevel*20`.

## Density

One C call of an already-live callee. 11 lines of JS. Playbook §2b “one deferred `if` alone” is **thin**, but this was the queued Open row after D-1350, not an invented one-line polish. Did not glue `u_wipe_engr` (different function, already next Open). Acceptable as a fortress map pop; do not make a habit of caller-only peels when a sibling arm is the real cluster.

## Branch-by-branch confirm

1. No monster: still `wake_nearby(false)` then terrain. Match `:1383` (mtmp null skips the `if`, still wakes).
2. Peaceful decline: maybe_kick false, return, **no** wake. Match `:1378–1380`.
3. Kick a sleeper in radius: `wake_msg`, `msleeping=0`, then `kick_monster`. Match callee + caller order.
4. G_UNIQ waiter: `msleeping` clear, waitmask kept. Match `:4386–4387`.
5. Pet, petcall FALSE: no whistletime. Match `:4388–4389`.
6. `DEADMONSTER`: skip. Match `:4379–4380`.
7. `u_wipe_engr`: still absent. Named.
8. trap.js clone: still no-op. Other file.
9. **Public-unhit** unless a session kicks near a sleeper (`wake_msg` / evade `!msleeping`).

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `false` is C `FALSE`, not a recorded coordinate. Plain ESM.

## Verification

Journal: private canary **23**/23; green+strict seed8000/0900; focused seed0060; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on sleeper wake. This audit cadence: full `sessions` at HEAD `fbfc72d9` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.32/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not a wake pline. seed0060 is a kick session; PASS does not prove a sleeper was in radius.

## Actionable C-wrongs

None for Must-fix. The caller matches C `:1383` (`FALSE`, after maybe_keep, before `kick_monster`). Callee is C `wake_nearby`, not a diverging clone. `u_wipe_engr` is a named omit of the **next** line (`:1384`), already the live Open head.

Named omits (map / already-Open, not Must-fix):

1. `u_wipe_engr(2)` (`dokick.c:1384`; body D-1051)
2. shop-town watchman
3. swallow / pit / levitation brace (named from D-0786)
4. trap/lock/timeout/dig local `wake_nearby` no-ops

Do not Must-fix “wake on declined peaceful” (C returns first). Do not Must-fix “petcall TRUE on kick” (C `FALSE`). Do not Must-fix “call `mhurtle`” (not this function).

## Callers / RNG ledger

C: `wake_nearby(FALSE)` no RNG; `u_wipe_engr(2)` RNG only if an engraving exists (named omit). JS: one await, no RNG. Public fortress is not a sleeper-kick.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: `dokick` now calls live `wake_nearby(FALSE)` before `kick_monster`; `u_wipe_engr` stays named.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1358 `fbfc72d9`.
