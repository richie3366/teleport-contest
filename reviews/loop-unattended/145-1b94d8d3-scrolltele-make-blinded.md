# Review 145 — 1b94d8d3 — teleport.c `scrolltele` `make_blinded` (D-1184)

## Metadata
- Full / short hash: `1b94d8d3527a20454446e73c5dcb8decc3241bf6` / `1b94d8d3`
- Parent: `d2512b22` (D-1183). This file audits **this SHA only**. Archive row **Addressed:** D-1184 lacked the short hash; this review commit fills `1b94d8d3`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 22:40:18 +0200
- D-id: **D-1184**
- Stats: 10 files, +110 / −37 — `js/teleport.js` +21 / −10 (`Blinded()` + `make_blinded(0,false)`).
- Claims to close: Open queue `teleport.c` `scrolltele` make_blinded (named). Not W-tower amulet. Map omit from D-0407 / D-1183. `reviews/loop-2026-08-15/` has no open `make_blinded` Must-fix.
- JS / map: `teleport.js` `scrolltele`; callee `do.js` `make_blinded` (`potion.c`). `c-js-map/turns.md` `teleport.c` / `potion.c`. W-tower Override yn; unconscious; steed whobuf still named.
- Prior reviews this SHA claims to close: D-1183 next-port; D-0407 named `make_blinded` clear.

## Intent vs deliverable

Git subject promises: “Match C teleport.c scrolltele so a non-Blinded teleport calls make_blinded(0, FALSE) after noteleport, instead of leaving Eyes leftover TIMEOUT uncleared.”

Old JS after the noteleport return had `// make_blinded(0, FALSE) deferred` then the amulet `!rn2(3)` gate. C `:861–863` is `if (!Blinded) make_blinded(0L, FALSE)` **before** `u.uhave.amulet \|\| On_W_tower_level`. `youprop.h` `Blinded` ≡ `HBlinded && !BBlinded` (not `Blind`, not Blindfold `EBlinded`). Eyes leftover TIMEOUT lives in `HBlinded` while artifact lenses set `BBlinded`, so `Blinded` is false and the call **clears TIMEOUT** without curing current sight.

The diff **does** add a local `Blinded()` and `await make_blinded(0, false)` via dynamic `do.js` import (do.js already imports `enexto` — cycle). It does **not** add `On_W_tower_level` to the amulet gate or `y_n("Override?")`. Named. Pre-existing wizard “treat as accept” on that gate is **not** this SHA.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `scrolltele` `!Blinded` call | C, **new** | `teleport.c:861–863` after noteleport return |
| `Blinded()` | C macro, **new local clone** | `youprop.h:92` `HBlinded && !BBlinded` |
| `make_blinded` | C callee, **imported** | `potion.c:261–331` via `do.js` export; talk=FALSE |
| `set_itimeout` probe | C inside callee | JS `set_itimeout_HBlinded` TIMEOUT field only |
| amulet / W-tower `rn2(3)` | C next, **partial named** | JS still `uhave.amulet` only; Override yn named |
| `tele()` | C caller | `scrolltele(NULL)` already |
| `seffects` SCR_TELEPORTATION | C caller | already `scrolltele` (D-0407) |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Dynamic `import('./do.js')` is ESM, not Node `fs`. Rule #2 clean.

**New RNG on this path:** none in `make_blinded(0, FALSE)` (talk off; toggle has no dice). The following amulet `!rn2(3)` is pre-existing and **after** this call — C same order. Path **public-unhit** unless Eyes leftover TIMEOUT on a teleport.

Grep of this SHA’s `js/` hunks: no banned gates.

## Constitution / playbook

Grep of the JS hunks: no trace-index gates. Do not use `Blind` (`H\|\|E`) for this gate — Blindfold-only would skip the clear or timeout/FROMFORM would be cured. Do not `make_blinded(1, …)` (C probe uses 1L internally; the **call** is `0L`). Do not pull Override yn into a line that said “Not W-tower amulet.”

## C ↔ JS fidelity

### Call site vs `:849–865`

C `scrolltele`: noteleport pline + maybe `learnscroll` + return; **then** `if (!Blinded) make_blinded(0L, FALSE)`; **then** `(u.uhave.amulet \|\| On_W_tower_level(&u.uz)) && !rn2(3)`. JS: same noteleport return; then `if (!Blinded()) await make_blinded(0, false)`; then `(uhave.amulet) && !rn2(3)` without W-tower (named). Order vs amulet RNG **matches**. Wizard Override is a later named omit on that gate, not this insert.

### `Blinded` vs `youprop.h:92–103`

```
#define Blinded (HBlinded && !BBlinded)
#define Blind   ((HBlinded || EBlinded) && !BBlinded)
#define Blindfolded EBlinded
```

JS `Blinded()`: `!!(u.HBlinded | 0) && !(u.BBlinded | 0)`. No `EBlinded`, no sticky `u.Blind`. Blindfold-only (`EBlinded`, `HBlinded==0`) → `Blinded` false → **does** call `make_blinded(0)` — C same (no leftover TIMEOUT to clear). Timeout/FROMFORM in `HBlinded` without `BBlinded` → `Blinded` true → **skip** — C same (“don’t show trap if Sorry…” / do not cure). Eyes: `BBlinded` from lenses → `Blinded` false even with leftover TIMEOUT → call clears TIMEOUT. Match the D-log Eyes leftover story.

`do.js` `Blind()` is the other macro (used **inside** `make_blinded` to probe sight). Correct split.

Do not fold `uroleplay.blind` into `Blinded()` — C `PermaBlind` is `HBlinded & FROMOUTSIDE` (`youprop.h:94`), already inside `HBlinded`, so `Blinded` is true and the call is skipped (must not cure OPTIONS:blind). JS `HBlinded` carries that bit when confer/timeout write it. Local `Blinded()` does not read `u.Blind` sticky — wipe/make_blinded already taught that sticky is a lie (D-0716).

### Callee vs `potion.c:261–331`

JS `make_blinded` is not a stub: probe `!Blind` / `set_itimeout` 1-or-0 / restore old / talk branches / `set_itimeout(xtime)` / toggle `vision_recalc(0)` + `learn_unseen_invent` on XOR. Named omits inside the callee (Eyes talk strings, Punished `set_bc`, Hallu talk, Blindfolded itch, Sting `see_monsters`) do **not** fire at `talk=FALSE`. `Unaware` forcing `talk=FALSE` is redundant here. `xtime=0` clears TIMEOUT via `set_itimeout_HBlinded(0)` (`(HBlinded & ~TIMEOUT) | 0`). Match this caller.

Local stubs in `trap.js` / `apply.js` / `spell.js` / `mhitu.js` are **not** this import. Hallucination check: dispatch is `scrolltele`; callee is the real `do.js` export.

C probe: `old = BlindedTimeout`; `u_could_see = !Blind`; `set_itimeout(&HBlinded, xtime ? 1L : 0L)`; `can_see_now = !Blind`; restore `old`. For `xtime==0` the probe sets TIMEOUT to 0, so `can_see_now` is “sight if leftover timeout were cleared.” Eyes `BBlinded`: `Blind` stays false both sides; XOR is 0; no `toggle_blindness`; final `set_itimeout(0)` still clears TIMEOUT. JS `set_itimeout_HBlinded(xtime ? 1 : 0)` then restore `BlindedTimeout()` then `set_itimeout_HBlinded(0)` — same. Talk=FALSE skips “You can see again.” / darkness cloud / Eyes brighten. Match this caller.

`tele()` is `scrolltele(null)` (`:1713–1715`). Intrinsic / `#teleport` / vault fallback / steed `rloc` (D-1172) all hit this insert. Scroll path `seffects` SCR_TELEPORTATION already called `scrolltele(scroll)` (D-0407). One site, all those callers. Density is the C function’s first post-noteleport statement, not a new subsystem.

| Case | C | JS after |
|------|---|---------|
| noteleport, !wizard | return, no `make_blinded` | **same** |
| `!Blinded`, leftover TIMEOUT | `make_blinded(0,FALSE)` clears | **same** |
| Blinded timeout/FROMFORM | skip, not cured | **same** |
| Blindfold-only | call (no-op on TIMEOUT) | **same** |
| Eyes `BBlinded` + leftover H | call, TIMEOUT cleared, still see | **same** predicate |
| after call, amulet `rn2(3)` | C includes W-tower | **named skip** W-tower half |

### JS as shipped (`teleport.js:1641–1676`) vs `potion.c:261–331`

Local `Blinded()`: `!!(u.HBlinded|0) && !(u.BBlinded|0)`. Call:

```
if (!Blinded()) {
    const { make_blinded } = await import('./do.js');
    await make_blinded(0, false);
}
```

Dynamic import is the do.js ↔ enexto cycle, not `fs`. `make_blinded` (`do.js:2288–2315`) is the C probe: `old = BlindedTimeout`; `u_could_see = !Blind()`; `set_itimeout_HBlinded(xtime ? 1 : 0)`; `can_see_now = !Blind()`; restore `old`; talk branches; `set_itimeout_HBlinded(xtime)`; XOR `toggle_blindness` (`vision_recalc(0)` + `learn_unseen_invent`). Talk=FALSE skips Hallu “Far out” / “Oh, bummer”, Eyes brighten/dim, Blindfolded itch/twitch, Punished `set_bc`, Sting `see_monsters`. C `Unaware` forces `talk=FALSE` (`:274–275`) — redundant here because the caller already passes FALSE.

C `old && !xtime` talk arm (`:284–297`) is the Eyes leftover-TIMEOUT case **with talk**. This caller is FALSE, so JS omitting that talk string is correct. The TIMEOUT clear is the final `set_itimeout(&HBlinded, 0)` (`:326`), which JS does.

Amulet gate after this SHA is still `(uhave.amulet) && !rn2(3)` then wizard “treat as accept” (no `y_n("Override?")`, no `On_W_tower_level`). That skip is **pre-existing** (D-0407 / map), not introduced here. C consumes `rn2(3)` even on W-tower without the amulet; JS does not — named RNG hole on that later Open row, **after** this call so this insert does not steal or add a die.

`tele()` is `scrolltele(null)` (`teleport.c:1713–1715`). Steed `rloc` D-1172 `await tele(); return true` therefore also hits `make_blinded`. Scroll `seffects` SCR_TELEPORTATION already called `scrolltele(scroll)` (D-0407). One site.

Local `make_blinded` in `trap.js:3453`, `apply.js:958`, `spell.js:280`, `mhitu.js:410` remain **other-module clones**. This SHA’s dynamic import is `do.js:2288` only. Do not Must-fix those stubs onto a `scrolltele` peel.

Prior map omit from D-0407 / review **141** next-port after ustuck. `reviews/loop-2026-08-15/` has no unpaid `scrolltele` `make_blinded` Must-fix. Journal “fortress held” does not skip this audit.

C callers of `scrolltele`: `tele()` (`:842–845`) with NULL; `read.c:2027` `seffects` SCR_TELEPORTATION with the scroll. `dotele` goes through `tele()`. Vault / steed / `#teleport` therefore all hit `:861–863` after a successful noteleport check. Wizard on a noteleport level **skips** the early return (`!wizard` is false) and **does** call `make_blinded` — JS `flags.debug \|\| flags.wizard` same. RNG call-for-call: this insert adds **none**; next statement is C `!rn2(3)` on the amulet/W-tower gate (JS amulet-only, named). Do not insert a die before `make_blinded`.

C `make_blinded` talk=FALSE with `xtime==0`: Unaware forces talk FALSE (already FALSE); regain-sight talk skipped; `old && !xtime` Eyes/Blindfolded/strange_feeling talk skipped; lose-sight talk skipped; `!old && xtime` skipped because xtime is 0; `set_itimeout(0)` always; XOR `toggle_blindness` only if probe `Blind` flipped. Eyes leftover TIMEOUT: `Blind` is already false (`BBlinded`); probe `set_itimeout(0)` keeps `Blind` false; XOR 0; TIMEOUT still cleared. Timeout/FROMFORM without B: `Blinded` true → **this caller never enters** `make_blinded`. Blindfold-only: `HBlinded==0` so TIMEOUT already 0; call is a no-op clear. Match.

## Hallucinations / overclaim

D-log / CURRENT / subject say a non-Blinded teleport calls `make_blinded(0, FALSE)` after noteleport so Eyes leftover TIMEOUT is not left uncleared. **That is the hunk:** C `:861–863` plus `Blinded` not `Blind`. Stamping **Addressed:** D-1184 is fair for the Open **make_blinded** line. Fill hash `1b94d8d3` in this commit. Do **not** stamp it as “Match C W-tower Override yn” or “Match C `toggle_blindness` Sting” or “Match C `On_W_tower_level` on the amulet gate.” This is **not** “Match C dispatch, callee is a stub”: `do.js` `make_blinded` is the `potion.c` body used at talk=FALSE.

### Clone classification (this SHA)

- `scrolltele` `!Blinded` call — C branch, new.
- `Blinded()` — C macro clone (`youprop.h:92`), local to `teleport.js`.
- `make_blinded` — C callee imported from `do.js` (`potion.c:261–331`).
- `set_itimeout_HBlinded` — C TIMEOUT field helper inside that callee (pre-existing).
- `Blind()` inside `make_blinded` — C `Blind` macro, not this gate.
- trap/apply/spell/mhitu `make_blinded` — other-module clones, **not** this import.
- amulet/`On_W_tower` `rn2(3)` + `y_n("Override?")` — not this SHA; named Open.
- No no-op helper added.

## Density

One C `if` plus the `Blinded` clone the gate requires. ~15 JS lines. Thin vs §2b, but it is the named D-0407 hole immediately after noteleport, not an unrelated subsystem. Did not pull Override yn. Not QUALITY-RISK.

## Verification

Journal: private canary **52**/52 (order; Blinded≠Blind; 0,FALSE not 1L; noteleport before; timeout/FROMFORM kept; Eyes leftover TIMEOUT cleared; Blindfold uses Blinded; wizard still calls; amulet after); green+strict seed8000/0900; cohort **12**/12 + strict 1500/0012/0360/4500/2200/0014/0004. Path **public-unhit** unless Eyes leftover timeout on teleport. Cadence **#1505** **44**/44 is the fortress check, not an Eyes-teleport canary.

Grep of `git show 1b94d8d3 -- js/`: no FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/`fastforward`/seed names/hardcoded coordinates. Dynamic `import('./do.js')` is ESM, not a Node builtin. `Blinded()` reads live `HBlinded`/`BBlinded`, not a recorded timeout.

C read of `teleport.c:849–915`, `youprop.h:90–103`, `potion.c:261–364` `make_blinded` / `toggle_blindness`. JS SHA `scrolltele` / `Blinded()` / `do.js` `make_blinded`. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` Scr **11405**/11405 RNG **792838**/792838 (100%). Speed `33+0.28/turn` (R² 0.87) on `8c51cfe8`.

## Actionable C-wrongs

None that Must-fix this next iter. The Open `!Blinded` call matches `:861–863`. Callee is live at talk=FALSE. Not a stub.

Named omits / do-nots (map / Open, not Must-fix):

1. W-tower half of amulet gate + wizard `y_n("Override?")` (`:865–870`). Open.
2. unconscious controlled fail; steed `whobuf` (`:874–882`).
3. `make_blinded` Eyes/Punished/Hallu/Sting talk arms (callee named; silent at FALSE).
4. Do not gate on `Blind`. Do not `make_blinded(1)`. Do not pull Override yn into this SHA. Next port is human canary seed8243 `offx`, not `kill_genocided`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `scrolltele` after noteleport now calls C’s `make_blinded(0, FALSE)` when `Blinded` (`HBlinded && !BBlinded`) is false, clearing Eyes leftover TIMEOUT without curing timeout/FROMFORM blindness, while W-tower Override yn stays named.
- Must-fix stays empty for this SHA; next work is the already-queued human canary, not another teleport peel. **Addressed:** D-1184 `1b94d8d3`. Not Override, not `kill_genocided`.
