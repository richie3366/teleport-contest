# Review 298 — a7ac5e52 — mon.c maybe_mnexto + dokick evade (D-1336)

## Metadata
- Full / short hash: `a7ac5e521e4f168f23d1c20317635103bcfc4e9a` / `a7ac5e52`
- Parent: `31d32cad` (D-1335). This file audits **this SHA only**. Archive **Addressed:** D-1336 `a7ac5e52` already has the short hash (filled by D-1337).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 04:34:46 +0200
- D-id: **D-1336**
- Stats: 10 files, +143 / −46 — `js/mon.js` +28 / −1; `js/dokick.js` +44 / −11.
- Claims to close: Open `dokick.c` `maybe_mnexto` evade (named from D-1310 / review **294**). Not `kickstr`. `reviews/loop-2026-08-15/` has no unpaid evade Must-fix.
- JS / map: `mon.js` `maybe_mnexto`; caller `dokick.js` `kick_monster` else of block; `c-js-map/turns.md`. `abuse_dog` / martial knockback / `kickstr` still named.
- Prior reviews this SHA claims to close: **294** named `maybe_mnexto` after kickdmg `special_dmgval`; **272** named it after poly AT_KICK.

## Intent vs deliverable

Git subject promises: “Match C mon.c maybe_mnexto so a kick the monster nimbly evades actually relocates and returns, instead of falling through to kickdmg.”

C `maybe_mnexto` (`mon.c:3998–4017`):

```
    boolean diagok = !NODIAG(ptr - mons);
    int tryct = 20;
    do {
        if (!enexto(&mm, u.ux, u.uy, ptr))
            return;
        if (couldsee(mm.x, mm.y)
            && (diagok || mm.x == mtmp->mx || mm.y == mtmp->my)) {
            rloc_to(mtmp, mm.x, mm.y);  /* not rloc_to_flag; no montelecontrol */
            return;
        }
    } while (--tryct > 0);
```

Caller `dokick.c` `kick_monster` `:267–285` else of the block arm (`:262–266`): if `mx/my` changed, `unmap_invisible` then teleports/floats/swoops/slides/jumps + easily/nimbly evade pline + `passive` return. Stay-put falls through to `kickdmg`. `NODIAG` is `hack.h:1414` `(monnum)==PM_GRID_BUG` only.

Old JS: comment `maybe_mnexto evade body deferred — mon stays put → fall through` after the block `if`; `void is_floater` / `can_teleport` / `M1_SLITHY` placeholders.

The diff **does** port `maybe_mnexto` with live `enexto` + `couldsee` + `rloc_to`, and wires the else-arm. It does **not** port `abuse_dog` / `monflee` / martial knockback / `wake_nearby` / `u_wipe_engr` / shop watchman / `kickstr`. Named. Block path already returned. Poly AT_KICK already returned (D-1310).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `maybe_mnexto` | C `:3998–4017`, **wired** | new export |
| `enexto` | C `teleport.c`, **imported live** | `teleport.js:649` |
| `couldsee` | C vision, **imported live** | dest must be accessible |
| `NODIAG` | C `hack.h:1414`, **clone** | local `mon.js` `PM_GRID_BUG` only |
| `rloc_to` | C `teleport.c`, **imported live** | not `rloc_to_flag`; no `control_mon_tele` |
| `kick_monster` else | C `:267–285`, **wired** | was fallthrough |
| `unmap_invisible` | C, **imported live** | `display.js:454` |
| `noteleport_level` | C, **imported live** | verb `"teleports"` gate |
| `can_teleport` / `is_floater` / `is_flyer` / `nolimbs` / `slithy` | C `mondata`, **imported live** | verb chain |
| `passive` | C, **imported live** | evade return |
| `abuse_dog` / martial knockback | C `kickdmg`, **named omit** | |
| `kickstr` | C `:793`, **named omit** | |
| `mnearto` overcrowding | C, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** up to 20 `enexto` tries (each may roll). C same. Previously JS skipped those rolls and always `kickdmg`’d. Public-unhit unless a session’s kick evade gates fire **and** relocate.

## C ↔ JS fidelity

`maybe_mnexto` is a **C callee**, not a no-op. `enexto(mm, u.ux, u.uy, ptr)` mutates `mm`; failed `enexto` returns immediately (does not burn remaining tries). `couldsee` dest; grid-bug `diagok || mm.x==mx || mm.y==my` (`NODIAG(ptr.mndx)` — `mons()` stamps `mndx`; C `ptr - mons` is the same index; `PM_GRID_BUG` is 116). Success calls `rloc_to(mtmp, mm.x, mm.y)` which actually zeros the old cell, sets `mx/my`, `newsym`, `set_apparxy`. That is **not** `mnexto`’s `rloc_to_flag` + `control_mon_tele`. C comment `[this doesn't honor montelecontrol]` matches the JS skip.

Caller: after the shared evade gates (`!rn2(clumsy?3:4)` and mcansee / !mtrapped / !thick / not eel / haseyes / mcanmove / !stun/conf/sleep / mmove>=12), `!nohands && !rn2(martial?5:3)` still blocks and returns. **Else** `maybe_mnexto`; if `mon.mx!==x \|\| mon.my!==y`, unmap + verb pline + `passive` return. Stay-put (`enexto` fail, 20× `!couldsee`, or grid-bug diagonal reject) falls through to `kickdmg`. Verb order is `can_teleport&&!noteleport_level` → floater → flyer → `nolimbs||slithy` → jumps; clumsy easily vs nimbly. Match `:271–281`. `nolimbs`/`slithy` replace the old `M1_SLITHY` void — C uses those predicates, not the raw flag.

Hallucination check for “Match C dispatch, callee is a stub” is clean: `enexto` and `rloc_to` are live. This is **not** “Match C `abuse_dog`.” The subject’s relocate-and-return claim is the else-arm.

Pre-existing evade **gates** (`S_EEL` as JS mlet string, Levitation wild-miss, poly AT_KICK) are not this SHA. Do not Must-fix them here.

## Hallucinations / overclaim

Subject + D-1336 say a kick “the monster nimbly evades” actually relocates and returns instead of falling through to `kickdmg`. **The helper plus the else-arm are the hunk.** Stamping **Addressed:** D-1336 is fair. Do **not** stamp “Match C `abuse_dog` / martial knockback.” Do **not** stamp “Match C `kickstr`.” Do **not** stamp “Match C `mnexto` `rloc_to_flag` / montelecontrol.” Do **not** treat fortress PASS (including seed0060 kick) as proof a jackal jumped — that session can PASS while the evade gates never fire.

## Density

One C function plus its one queued caller arm. ~28 lines in `mon.js` + the else-arm in `dokick.js`. Playbook §2b tight cluster. Did not glue `splash_lit` or `kickstr`. Acceptable size.

## Branch-by-branch confirm

1. Evade gates fire, `enexto`+`couldsee` succeed, monster moves: unmap, verb, `passive`, return — **no** `kickdmg`. Match `:267–283`.
2. `enexto` fails: return from helper, `mx` unchanged, `kickdmg`. Match `:4007–4008`.
3. 20 tries, never `couldsee`: stay, `kickdmg`. Match `:4016`.
4. Grid bug: diagonal dest rejected; same row/col allowed. Match `:4010–4011`.
5. `can_teleport && !noteleport_level` → `"teleports"`; else floater/flyer/slides/jumps. Match `:272–280`.
6. Block arm (`!nohands && !rn2`): unchanged return. Match `:262–266`.
7. Stay-put after `maybe_mnexto`: `kickdmg` (now with D-1332 `special_dmgval`). Match fallthrough `:287`.
8. `abuse_dog` / knockback / `kickstr`. Still omitted. Named.
9. **Public-unhit** unless a later audit score says a kick evade relocated.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `rloc_to` is the existing teleport helper, not a coordinate hardcode. Plain ESM.

## Verification

Journal: private canary **17**/17; green+strict seed8000/0900; cohort **7**/7 + seed0060 kick + strict 1500/1800/0012/0004/0007/2200/0383/0060. **Public-unhit** on relocate. Cadence this audit: full `sessions` at HEAD `2bd70a77` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `36+0.30/turn` (R² 0.84). I did not re-run the private canary. seed0060 PASS is not evidence `maybe_mnexto` moved a monster (new `enexto` RNG would FAIL the session if this path had been live and wrong).

## Actionable C-wrongs

None for Must-fix. 20× `enexto`+`couldsee`+`NODIAG` then `rloc_to`, and the kick else-arm, match C `:3998–4017` / `:267–285`. Callees are live.

Named omits (map, not Must-fix):

1. `abuse_dog` / `monflee`
2. martial knockback
3. `kickstr`
4. `wake_nearby` / `u_wipe_engr` / shop-town watchman
5. `mnearto` overcrowding / OPTIONS `montelecontrol` (C `maybe_mnexto` does not honor it)

Do not Must-fix “use `rloc_to_flag` here” (C `maybe_mnexto` does not). Do not Must-fix “always `kickdmg` after evade” (that was the bug).

## Callers / RNG ledger

C: `kick_monster` else → `maybe_mnexto` → up to 20 `enexto`. JS: same. Public fortress is not evidence those `enexto` rolls ran.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: kick evade now relocates via `maybe_mnexto` and returns; `abuse_dog` / knockback / `kickstr` stay named.
- Must-fix stays empty for this SHA.
