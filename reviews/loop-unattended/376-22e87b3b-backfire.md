# Review 376 — 22e87b3b — zap.c backfire (D-1416)

## Metadata
- Full / short hash: `22e87b3b7438cc15749af75bd3a713635b6aa7a3` / `22e87b3b`
- Parent: `081c5c6a` (D-1415). This file audits **this SHA only** (third of nine `js/` commits since review **373**). Archive **Addressed:** D-1416 `22e87b3b` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-22 18:37:28 +0200
- D-id: **D-1416**
- Stats: 10 files, +135 / −29 — `js/zap.js` +49 / −5 (`backfire` + `useupall_invent` + `dozap` gate).
- Claims to close: Open `zap.c` `backfire` (named from D-1415 / reviews **307** / **370**). Not zapyourself. `reviews/loop-2026-08-15/` has no unpaid backfire Must-fix.
- JS / map: `zap.js` `backfire` / `dozap`. Callees `do.js` `setnotworn`, `invent.js` `freeinv_core`, `hack.js` `losehp` / `maybe_half_phys`. `c-js-map/turns.md` + `debt.md`. spe<0 dust / `obfree` contents still named.
- Prior reviews this SHA claims to close: **307** / **370** named the explode body after the cursed `rn2(100)` gate.

## Intent vs deliverable

Git subject promises: “Match C zap.c backfire so a cursed wand that rolls rn2(100)==0 explodes via d(spe+2,6) and useupall, instead of only exercising STR.”

C `zap.c` `backfire` `:2605–2614`:

```
    otmp->in_use = TRUE;
    pline("%s suddenly explodes!", The(xname(otmp)));
    dmg = d(otmp->spe + 2, 6);
    losehp(Maybe_Half_Phys(dmg), "exploding wand", KILLED_BY_AN);
    useupall(otmp);
```

Caller `dozap` `:2647–2652`: after `zappable` (which decrements `spe`), `cursed && !rn2(WAND_BACKFIRE_CHANCE)` (`hack.h:1410` **100**) → `backfire` then `exercise(A_STR, FALSE)` then `ECMD_TIME` (skip trailing `update_inventory`). `losehp` fatal is `done()` **noreturn**, so C never `useupall`s or exercises on death. Callee `invent.c` `useupall` `:1312–1317`: `setnotworn` + `freeinv` + `obfree` (contents too).

Old JS: the cursed gate was live; body only `exercise(A_STR,false); return 1`.

The diff **does** explode (`in_use`, `The(xname)` pline, `d(spe+2,6)`, `maybe_half_phys` `losehp` `"exploding wand"` `KILLED_BY_AN`), skip `useupall` on JS fatal (`finish_losehp_done`), else `useupall_invent`, then exercise iff survived. It **does not** port spe<0 dust `useupall`. Named. `useupall_invent` is a **clone** of `useupall` that omits `obfree` contents/oextra.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `backfire` | C `:2605–2614`, **wired** | was exercise-only |
| `dozap` cursed gate | C `:2647–2652`, **already live** | now calls body |
| `d(spe+2,6)` | C, **imported live** | after `zappable` spe-- |
| `Maybe_Half_Phys` / `losehp` | C, **imported live** | `maybe_half_phys` |
| `The(xname)` pline | C, **imported live** | `" suddenly explodes!"` |
| `in_use` | C, **wired** | before losehp |
| `exercise(A_STR,FALSE)` | C, **imported live** | after survive |
| `WAND_BACKFIRE_CHANCE` | C 100, **const live** | `rn2` only if cursed |
| `useupall_invent` | C `useupall`, **clone** | setnotworn + splice + `freeinv_core`; no `obfree` |
| `setnotworn` / `freeinv_core` | C callees, **imported live** | |
| `obfree` contents | C `:1316`, **named omit** | wand usually empty |
| spe<0 dust | C `dozap`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** cursed `rn2(100)` was already burned; this SHA newly burns `d(spe+2,6)` (each d6 is `rn2(6)+1`) and Half_phys does **not** roll. Survive `exercise(A_STR,FALSE)` may `rn2`. Uncursed never calls `rn2(100)`.

## C ↔ JS fidelity

Gate order matches `:2645–2652`: `!zappable` nothing_happens; else cursed `!rn2(100)` backfire; else dir. `zappable` decrements `spe` **before** `d(spe+2,6)` — a spe-5 wand that backfires is `d(6,6)` after the decrement, not `d(7,6)`. Canary claimed that. Match.

Pline / `in_use` / dice / killer string / `KILLED_BY_AN` match `:2609–2612`. `maybe_half_phys` is C `Maybe_Half_Phys` (`trunc((dmg+1)/2)` when H/E Half_physical_damage). Live.

Fatal: JS `_losehp_needs_done` / `gameover` → `finish_losehp_done` and **no** `useupall` / **no** STR exercise / `dozap` returns 1. C `done()` does not return to `useupall` or `exercise`. Match the noreturn cut. Survive: `useupall_invent` then `exercise(A_STR,false)` then time. Match.

`useupall_invent` is a **clone**. C `useupall` always `obfree`s (nested bags, `oextra`). JS `setnotworn` (clears `uwep` if wielded) + invent splice + `freeinv_core` + `quan=0` `where=OBJ_FREE`. For a typical wand with no `cobj`, keep-path inventory removal matches. Nested contents / timers / `oextra` would leak vs C. Named. Unpaid shop billing inside `freeinv_core` is whatever that helper already does — not newly faked. Do **not** treat this clone as a live `invent.c` `useupall` import.

Hallucination check: “Match C `backfire` explode + `d(spe+2,6)` + `useupall`” while **`d`/`losehp`/`The`/`xname` are live** is not a dispatch-stub lie. “Match C `obfree` contents” **would** be. The D-log names `obfree`. Do **not** stamp “Match C spe<0 dust.” Do **not** stamp “uncursed still `rn2(100)`.”

## Hallucinations / overclaim

Subject says a cursed wand that rolls `rn2(100)==0` explodes via `d(spe+2,6)` and `useupall` instead of only exercising STR. **True on the survive keep-path** (HP, wand gone, STR exercise, wielded cleared). **True that fatal skips useupall** (C noreturn). **False until named for `obfree` contents and spe<0 dust.** Stamping **Addressed:** D-1416 for `:2605–2614` + `:2647–2652` is fair. Do **not** treat fortress PASS as a 1/100 cursed-wand explode.

## Density

One C function plus the `dozap` gate that already existed and the `useupall` callee the body needs. ~45 lines of JS. Playbook §2b. Did not glue dust / wrest pline. Right size. A fourth local `useupall_*` clone is ugly but named; Must-fix would be a keep-path billing/contents lie, which a wand does not hit.

## Branch-by-branch confirm

1. Uncursed: no `rn2(100)`; no explode. Match.
2. Cursed `rn2!=0`: no explode; continue dir/weffects. Match.
3. Cursed `rn2==0`, survive: explode pline, `d(spe+2,6)` after spe--, HP, wand gone, STR exercise, return time. Match.
4. Fatal losehp: no useupall, no exercise. Match noreturn.
5. Wielded wand: `setnotworn` clears `uwep`. Match `useupall`.
6. Half_phys: `trunc((d+1)/2)`, no extra roll. Match.
7. spe<0 dust. Named.
8. **Public-unhit** unless a session zaps a cursed wand and rolls 0.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Chance is C’s 100, not a recorded index. Plain ESM. `useupall_invent` is a clone, not ALIGN.

## Verification

Journal: private canary **16**/16 (C/JS grep; cursed `rn2(100)=0` explode + `d(6,6)` after spe-- + HP + gone + STR `rn2(2)`; wielded `uwep` cleared; Half_phys; uncursed no `rn2(100)`; cursed `rn2!=0` no explode; stack; dust still named; Rule #2). green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD (score rewrite at end of this review iter). Fortress PASS is not a cursed-wand backfire.

## Actionable C-wrongs

None for Must-fix on **this** SHA. Explode/dice/losehp/exercise match `:2605–2652`; `obfree` is a named clone omit, not a wand keep-path lie.

Named omits (map / Open, not Must-fix):

1. `invent.c` `obfree` contents/oextra from `useupall`
2. `dozap` spe<0 dust `useupall`
3. wrest pline / `check_capacity` / `check_unpaid`
4. remaining `killer_xname` callers (already named)

Do not Must-fix “fatal should still useupall” (C noreturn). Do not Must-fix “uncursed should roll `rn2(100)`” (C short-circuits). Do not Must-fix “dispatch is a stub” (`d`/`losehp` are live).

## Callers / RNG ledger

C callers: `dozap` only (engrave/muse have their own `rn2(100)` gates). New dice: `d(spe+2,6)` on the explode arm; STR exercise `rn2` typical. Public fortress does not need a 1/100 cursed zap.

Verdict: **ACCEPT-WITH-DEBT**
