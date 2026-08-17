# Review 149 — 77ead396 — hack.c `avoid_trap_andor_region` ParanoidTrap (D-1187)

## Metadata
- Full / short hash: `77ead3967a89e4b2d6e8d23e5a67a6d776c9ed27` / `77ead396`
- Parent: `4dd396cc` (D-1186). This file audits **this SHA only**. Archive row **Addressed:** D-1187 `77ead396` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-18 00:09:07 +0200
- D-id: **D-1187**
- Stats: 12 files, +401 / −52 — `js/hack.js` +130 (`avoid_trap_andor_region` + clones); `js/trap.js` +153 (`into_vs_onto` + `immune_to_trap`); `js/cmd.js` +9 (call after `u_rooted`).
- Claims to close: Must-fix human canary seed8243 `"Really step into that magic portal?"` yn (after D-1186 `g`). Review **146** / D-1186 next-port. `reviews/loop-2026-08-15/` has no unpaid ParanoidTrap Must-fix.
- JS / map: `hack.js` `avoid_trap_andor_region`; `trap.js` helpers; `cmd.js` `domove`. `c-js-map/turns.md` `hack.c`. Full `test_move` Passes_walls/squeeze, FIRE invent-burn, POLY `resists_magm`, hero `domagicportal` still named. Next canary miss after this SHA was activate/ATSTAIRS (D-1188).
- Prior reviews this SHA claims to close: D-1186 next-port portal yn.

## Intent vs deliverable

Git subject promises: “Match C hack.c avoid_trap_andor_region so a ParanoidTrap step onto a seen magic portal asks yn before occupying the cell.”

Old JS: `domove` went rooted → `trapmove` → occupy. The canary `y` was eaten as a vi-move. C `domove_core` `:2825–2828` calls `avoid_trap_andor_region` after `u_rooted` before `u.utrap`.

The diff **does** add that call and the C function: gas-region arm then tseen-trap arm, `paranoid_query(ParanoidConfirm, qbuf)`, `nomul(0)` + `move=0` on no. Default `paranoia_bits` include `PARANOID_TRAP` and omit `PARANOID_CONFIRM`, so the query is yn (not getlin `"yes"`). It **does** port `into_vs_onto` and a whole `immune_to_trap` switch so MAGIC_PORTAL hero is `TRAP_NOT_IMMUNE` (still asks). It does **not** pull `domagicportal`. Silent `TEST_MOVE` is a **subset** (named).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `avoid_trap_andor_region` | C callee, **new** | `hack.c:2515–2581` |
| `domove_core` call | C, **new** | `:2825–2828`; JS after `u_rooted` |
| `into_vs_onto` | C callee, **new** | `trap.c:5375–5388` — match |
| `immune_to_trap` | C callee, **new clone** | `trap.c:2783–2934`; MAGIC_PORTAL hero live; other arms named-partial |
| `paranoid_query` | C callee, **imported** | `getline.js` / `cmd.c` |
| `t_at` / `trapname` / `Hallucination` / `rnd` | C callees, **imported** | Hallu `rnd(TRAPNUM-1)` new die |
| `test_move_viable` | **clone** of `test_move(TEST_MOVE)` | subset; named Passes_walls/ooze/chew/squeeze |
| `Blind_prop` | C macro clone | `youprop.h:103` `(H\|\|E)&&!B` — no sticky |
| `Stunned_prop` / `Confusion_prop` | C macro **diverging clones** | C `Stunned≡HStun`, `Confusion≡HConfusion`; JS ORs sticky |
| `visible_region_at_xy` / `reg_damg` | C clones | `region.c:651–728`; rects vs `inside_region` |
| `upstart_word` | C `upstart` clone | gas prompt only |
| `u_locomotion` | C, **pre-existing** | sticky Lev/Fly; poly `locomotion()` named |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. `FORCEBUNGLE` in the trap import list is a C trap-flag name, not a FORCE gate. Rule #2 clean.

**New RNG on this path:** `rnd(TRAPNUM-1)` only when Hallucinating on the trap arm (`hack.c:2565`). Portal canary is not Hallu. Path **public-unhit** unless a session walks onto a tseen non-CLEARLY-immune trap.

Grep of this SHA’s `js/` hunks: no banned gates.

## C ↔ JS fidelity

### Call site vs `hack.c:2820–2831`

C after `u_rooted()`, `if (ParanoidTrap) if (avoid_trap_andor_region(x,y)) return;` then `u.utrap` / `trapmove`.

JS `cmd.js:1727–1731`: same order, `paranoia_bits & PARANOID_TRAP`, `avoid_trap_andor_region(newx,newy)`. `u.dx`/`u.dy` are set at `domove` `:1637–1638` before this (C `set_move_cmd` same). Match.

### Outer gates vs `:2527–2564`

C gas arm: `ParanoidTrap && !Blind && !Stunned && !Confusion && !Hallucination && (!nopick || run) && visible_region_at(dest) && (no oldreg \|\| newDmg>0 && oldDmg==0) && test_move(TEST_MOVE)`.

C trap arm: `ParanoidTrap && !Stunned && !Confusion && (!nopick || run) && t_at && tseen && test_move(TEST_MOVE) && (immune != CLEARLY \|\| Hallucination)`. **Blind does not skip the trap arm** (C same — you can still confirm a known `^`).

JS `wouldAsk = !nopick || running` with `running = !!(context.run)` — C `context.run` is the same nonzero test. Match.

`Blind_prop` matches `youprop.h:103`. `Hallucination()` is the pre-existing `do_name.js` helper (sticky `u.Hallucination` OR `HHallucination` without resist) — not introduced here.

**C-wrong family:** `Stunned_prop` is `(HStun) || u.Stunned`; `Confusion_prop` is `(HConfusion) || u.Confusion`. C `youprop.h:81,84` is `Stunned ≡ HStun`, `Confusion ≡ HConfusion` only. This SHA’s D-1188 sibling correctly used `!(u.HStun)` for stunmsg. If sticky is set after TIMEOUT cleared, JS would **skip** the yn while C would ask. Canary hero is not stunned/confused (yn fired). Named here as a clone diverge, not Must-fix (do not steal `visctrl`).

### Trap prompt vs `:2565–2575`

C: `traptype = Hallucination ? rnd(TRAPNUM-1) : trap->ttyp`; `into = into_vs_onto(traptype)`; `Snprintf("Really %s %s that %s?", u_locomotion("step"), into?"into":"onto", defsyms[trap_to_defsym(traptype)].explanation)`.

JS: same `rnd`/`ttyp`; `into_vs_onto`; ``Really ${u_locomotion('step')} ${into} that ${trapname(traptype)}?``. `TRAP_EXPLANATIONS[MAGIC_PORTAL]` is `'magic portal'`, which is the cmap explanation C uses for that ttyp. Canary string matches. Hallu `trapname(rnd)` vs `defsyms[trap_to_defsym(rnd)]` is unhit; tables are the same names for the live trap enum.

`into_vs_onto` switch is BEAR_TRAP / PIT / SPIKED_PIT / HOLE / TELEP_TRAP / LEVEL_TELEP / MAGIC_PORTAL / WEB → true. C `:5377–5388` identical. MAGIC_PORTAL → “into”. Match.

`paranoid_query(ParanoidConfirm, qbuf)`: imported, not a stub. Default bits → `paranoid_ynq` else-arm → `yn_function(..., 'yn', 'n')`. C comment `:2571–2574` same. On no: `nomul(0); context.move=0; return TRUE`. JS same.

### `immune_to_trap` vs `:2783–2934` (youmonst / this caller)

`avoid_trap` always passes `&gy.youmonst`. Only hero arms affect the yn.

| ttyp | C youmonst | JS after | yn effect |
|------|------------|----------|-----------|
| MAGIC_PORTAL | `!is_you` CLEARLY else **NOT_IMMUNE** `:2920–2925` | **same** | **asks** |
| VIBRATING_SQUARE | CLEARLY | **same** | skip |
| ARROW/DART/ROCK | NOT | **same** | asks |
| pit/hole + Sokoban | NOT | **same** | asks |
| pit/hole + Lev/Fly | CLEARLY (`Levitation\|\|Flying`) | `hero_Levitation\|\|hero_Flying` (H\|\|E, !B; Flying includes steed) | skip — **match macros** |
| SLP_GAS + Sleep_res | HIDDEN | H\|\|E **or sticky** | still asks (HIDDEN≠CLEARLY) |
| TELEP/LEVEL + Amulet | CLEARLY via `mon_has_amulet` | walks `mon.minvent` only (youmonst.minvent ≠ `gi.invent`) | **would ask** — named in comment |
| POLY + Antimagic | HIDDEN (`resists_magm`) | `Antimagic_prop` HIDDEN | still asks |
| FIRE + Fire_res | invent-burn walk; else HIDDEN | skip walk → HIDDEN | still asks (named) |
| ANTI_MAGIC + Antimagic | NOT (still asks!) | **same** | asks |
| STATUE | NOT for you | **same** | asks |

MAGIC_PORTAL hero is the Open/Must-fix arm and **matches**. Monster-only ANTI_MAGIC / POLY `resists_magm` CLEARLY are unused by this caller.

`immune_to_trap(null)` C `impossible` + NOT; JS NOT without `impossible`. Not this peel’s caller.

### `test_move_viable` vs `hack.c:991–1136` TEST_MOVE

C always `context.door_opened = FALSE`. Then `!isok` → FALSE; `IS_OBSTRUCTED \|\| IRONBARS` → FALSE unless Passes_walls/chew/autodig (those are **DO_MOVE** messages; TEST_MOVE still returns FALSE when the exception does not apply). Closed door → FALSE (unless Passes_walls/ooze). Diagonal into non-doorless door → FALSE.

JS: clear `door_opened`; `!isok` / no loc / obstructed / IRONBARS / `closed_door` / diagonal door or from-door `!doorless` → FALSE; else TRUE. **More FALSE than C** when Passes_walls would make TEST_MOVE TRUE (skip yn, then later walk through). **More TRUE than C** when squeeze/`worm_cross`/`block_door` would make TEST_MOVE FALSE (extra yn). Named. Portal canary is an orthogonal step onto a walkable `^` — both TRUE.

### Gas arm vs `:2527–2549`

C `upstart(qbuf)` on `"%s into that %s cloud?"`. JS `upstart_word` on the same template. `reg_damg` C: `(!visible \|\| ttl==-2) ? 0 : arg.a_int`. JS: same visible/ttl then `reg.arg|0`. `visible_region_at` C uses `inside_region`; JS walks `reg.rects` lx/hx/ly/hy. Clone; gas **public-unhit**.

## Hallucinations / overclaim

D-log / CURRENT / subject say ParanoidTrap asks `"Really step into that magic portal?"` before occupy. **That is the hunk:** call site + MAGIC_PORTAL `into` + `trapname` + `immune` NOT_IMMUNE + yn. Stamping **Addressed:** D-1187 is fair. This is **not** “Match C dispatch, callee is a stub”: `paranoid_query`, `t_at`, `feel`-less confirm, and the MAGIC_PORTAL `immune` arm are live. Do **not** stamp “Match C `test_move`” or “Match C `immune_to_trap` every arm” or “Match C `domagicportal`.”

`Stunned_prop`/`Confusion_prop` sticky OR is an un-named clone diverge (C-wrong family, not a named omit). Not Must-fix this iter — canary asked; next work is `visctrl`.

### Clone classification (this SHA)

- `avoid_trap_andor_region` — C function, new.
- `into_vs_onto` — C callee, match.
- `immune_to_trap` — C callee; portal/youmonst match; other arms named-partial.
- `test_move_viable` — clone subset, named.
- `Blind_prop` — C macro, match.
- `Stunned_prop` / `Confusion_prop` — **diverging** youprop clones.
- region / `upstart` — local clones (cycle avoidance).
- `paranoid_query` — imported C callee, not a stub.

## Density

One C function plus the two helpers the trap arm requires (`into_vs_onto`, `immune_to_trap` whole switch). ~280 JS lines — upper §2b, but “whole practical switch” is the playbook’s right size, not “finish traps.” Did not pull `domagicportal`. Not QUALITY-RISK for width.

## Verification

Journal: private canary Scr **107→108**/129 (yn matches; leftover yn vs C activate); green+strict seed8000/0900; cohort **42**/42 (CURRENT shared + 0014/0383/0399/4500/2600 + green) + strict 1500/0700/0009/0361/0015/0012. Path **public-unhit** unless tseen trap. Cadence **#1510** **44**/44 is the fortress check, not a portal-yn canary.

Grep of `git show 77ead396 -- js/`: no FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/`fastforward`/seed names/hardcoded coordinates.

C read of `hack.c:991–1136`, `:1817–1828`, `:2515–2581`, `:2820–2841`; `trap.c:2783–2934`, `:5375–5388`; `youprop.h:81–103`; `region.c:651–728`. JS SHA `avoid_trap_andor_region` / `immune_to_trap` / `into_vs_onto` / `cmd.js` call.

## Actionable C-wrongs

None that Must-fix this next iter (do not preempt `visctrl`). Portal yn matches `:2565–2575` + `:2920–2925`.

Named omits / clone debt (map, not Must-fix):

1. `Stunned`/`Confusion` must be `HStun`/`HConfusion` only (`youprop.h:81,84`) — drop sticky OR in `Stunned_prop`/`Confusion_prop`.
2. TELEP/LEVEL_TELEP hero Amulet via `mon_has_amulet` / `gi.invent` (named in comment).
3. Full `test_move` Passes_walls / squeeze / `block_door` (named).
4. FIRE invent-burn walk; POLY monster `resists_magm` (named; yn-harmless for youmonst).
5. Do not pull `domagicportal` into this SHA — **Addressed:** D-1188 `c58efd08`. Next Must-fix is rhack `visctrl`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- Score: **7 / 10**
- One sentence: a ParanoidTrap step onto a tseen MAGIC_PORTAL now asks C’s `Really step into that magic portal?` via live `paranoid_query` / `into_vs_onto` / hero `TRAP_NOT_IMMUNE`, while `Stunned`/`Confusion` sticky ORs and the `test_move` subset stay clone debt.
- Must-fix stays `visctrl` (already queued); do not prepend the sticky youprop peel. Archive hash `77ead396`. Not activate, not `kill_genocided`.
