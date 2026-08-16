# Review 81 — acfb0167 — `tele_trap` Antimagic wrenching (D-1120)

## Metadata
- Full / short hash: `acfb0167e8633f48c610b533a41fd2819eb438f6` / `acfb0167`
- Parent: `26560ccf` (D-1119). This file audits **this SHA only**. The fix stamped **Addressed:** D-1120 without the short hash; this review commit fills `acfb0167`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 00:41:04 +0200
- D-id: **D-1120**
- Stats: 11 files, +159 / −81 — `js/teleport.js` +65 / −22 (export `tele_trap`, drop `tele_trap_once_vault`); `js/trap.js` +7 / −14 (`trapeffect_telep_trap` seetrap then `tele_trap`).
- Claims to close: Open queue `teleport.c` `tele_trap` Antimagic wrenching pline (named). Not vault_tele. Review **80** named that next. `reviews/loop-2026-08-15/` has no open tele_trap Must-fix.
- JS / map: `teleport.js` `tele_trap`; `trap.js` `trapeffect_telep_trap`. `c-js-map/turns.md` teleport + trap. teledest / `tele()` still named.
- Prior reviews this SHA claims to close: none as Must-fix. Named Open after D-1119.

## Intent vs deliverable

Git subject promises: “Match C teleport.c tele_trap so magic resistance wrenches with You_feel/shieldeff instead of silently deleting a once-TELEP.”

Old JS split the C function: `trapeffect_telep_trap` **`deltrap` + `newsym` first** on `trap.once`, then `tele_trap_once_vault`, which silent-returned on `u.Antimagic \|\| u.HAntimagic \|\| u.EAntimagic` or `noteleport_level` (no `You_feel`, no `shieldeff`, no `In_endgame`). A worn cloak-of-MR lives in `uprops[ANTIMAGIC]` (D-1089 confer), so H\|\|E flats alone missed it. C `teleport.c:1502–1511` wrenches **before** `next_to_u` / once, and only `deltrap`s a once trap after `next_to_u` succeeds.

The diff **does** export `tele_trap(trap)` with that order, Antimagic `shieldeff` then `You_feel("a wrenching sensation.")`, uprops confer, `in_tele_trap` guard, and once: `next_to_u` then `deltrap`+`vault_tele`. `trapeffect` is seetrap then `tele_trap`. It does **not** port `teledest` / `tele()`. Named. Non-once, non-wrenching traps still fall off the end.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `tele_trap` | C function, **rewritten** | `teleport.c:1492–1535`; replaces `tele_trap_once_vault` |
| `in_tele_trap` | C static, **new** | `teleport.c:1497–1501` / `:1534` |
| `In_endgame` | C macro, **imported** | `const.js` dnum ≡ astral |
| `Antimagic()` | C macro, **clone** | `youprop.h:55–57` H\|\|E via flats + `uprops[ANTIMAGIC]` |
| `noteleport_level` | C callee, **imported** | pre-existing; covetous bypass |
| `shieldeff` | C callee, **imported** | `display.js:1819–1830`; sparkle loop, not a no-op |
| `You_feel` | C callee, **imported** | wrenching string |
| `next_to_u` | C callee, **imported** | `apply.js`; dynamic (cycle); once arm |
| `deltrap` / `newsym` / `vault_tele` | C callees, **imported** | once arm after `next_to_u` |
| `trapeffect_telep_trap` hero | C body, **rewritten** | `trap.c:2075–2078`; was deltrap-first |
| teledest / `tele()` | C arms, **named omit** | `teleport.c:1512–1532` |
| `tele_trap_once_vault` | JS helper, **deleted** | no remaining callers |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. **No new RNG** on the wrenching arm (`Antimagic` / `In_endgame` / `noteleport_level` are predicates; `shieldeff` is display). `next_to_u` walks `fmon` with no `rn2`. `vault_tele` still burns its own `somexyspace` RNG when the once path runs — same as before, now **after** the wrenching gate.

## Constitution / playbook

Grep of the `js/teleport.js` + `js/trap.js` hunks: no trace-index gates. `u.ux,u.uy` in `shieldeff` is the live hero cell. Contest Rule #2: no Node builtins. Dynamic `import('./apply.js')` / `import('./trap.js')` is ESM cycle-breaking, not `fs`. `shieldeff` uses `nh_delay_output` already used by rndcurse (D-1087); not a new input boundary. Do not rewrite other `Antimagic()` clones this peel.

## C ↔ JS fidelity

### trapeffect — caller order

C `trap.c:2075–2084`:

```
if (mtmp == &gy.youmonst) {
    seetrap(trap);
    tele_trap(trap);
} else {
    ...
}
return Trap_Effect_Finished;
```

JS `3712–3716`: `seetrap` then `await tele_trap(trap)` then Finished. Old JS `deltrap`’d once traps **before** the vault helper, so Antimagic could not save the trap and never printed wrenching. That order is **gone**. Match.

### tele_trap wrenching and once

C `teleport.c:1492–1535`:

```
static boolean in_tele_trap = FALSE;
if (in_tele_trap) return;
in_tele_trap = TRUE;
if (In_endgame(&u.uz) || Antimagic || noteleport_level(&gy.youmonst)) {
    if (Antimagic)
        shieldeff(u.ux, u.uy);
    You_feel("a wrenching sensation.");
} else if (!next_to_u()) {
    You1(shudder_for_moment);
} else if (trap->once) {
    deltrap(trap);
    newsym(u.ux, u.uy);
    vault_tele();
} else if (isok(trap->teledest.x, trap->teledest.y)) {
    ...
} else
    tele();
in_tele_trap = FALSE;
```

JS `1705–1732`: module-level `in_tele_trap`; early return; try/finally always clears (C clears at the function end; JS finally is equivalent if `vault_tele` throws). Wrenching: `In_endgame(u.uz) \|\| Antimagic() \|\| noteleport_level(youmonst)`; if Antimagic then `shieldeff` then `You_feel`. **C evaluates Antimagic twice** (OR, then shieldeff) — no RNG in the macro; JS two function calls, same.

Once: JS nests `next_to_u` **inside** `trap.once`. C lifts `!next_to_u` to a sibling `else if` that also gates teledest/`tele()`. For a **once** trap the observable is the same: wrenching first; else `next_to_u` fail → shudder and **no** `deltrap`; else `deltrap`+`newsym`+`vault_tele`. For a **non-once** trap without wrenching, C runs `next_to_u` then teledest/`tele()`; JS no-ops. That is the named teledest/`tele()` omit, not a silent once-delete. When a later iter ports `tele()`, it must lift `next_to_u` to C’s `else if`, not leave it inside `once`.

`You1(shudder_for_moment)` ≡ `pline('You shudder for a moment.')`. Match.

### Antimagic clone vs confer

C `youprop.h:55–57`: `Antimagic` ≡ `HAntimagic \|\| EAntimagic` ≡ `uprops[ANTIMAGIC]`. `confer_oc_oprop` writes cloak-of-MR / gray DSM to `uprops` only (D-1089). JS includes sticky `u.Antimagic` / H / E **and** uprops intrinsic/extrinsic. Old vault helper’s H\|\|E flats missed confer. Including uprops is the C macro. Same clone shape as `sit.js` / `zap.js`; do not merge them this peel.

`In_endgame` without Antimagic: wrench, no `shieldeff`. `noteleport_level` without Antimagic: same. JS matches. Covetous still bypasses `level.flags.noteleport` inside `noteleport_level` (pre-existing). Wizard tower / Vlad can therefore still take the once/`tele()` path when the level flag is set — C same.

`tele_trap_once_vault` is gone; grep of `js/` has no leftover callers. `mtele_trap` for monsters is untouched (C `trapeffect` else branch). Fixed-dest monster displace stays named on that monster path.

`vault_tele` body is not this Open line (already D-0373 subset). Recursion guard exists because C `teleds` → `spoteffects` → `dotrap` on a dest TELEP. Named `tele()` would need that guard too; JS already wraps the whole function. `shieldeff` when `flags.sparkle === false` returns immediately — C `if (!flags.sparkle) return`. Missing JS field ≡ On, same as rndcurse.

### shieldeff is not a stub

`display.c` `shieldeff`: if `flags.sparkle` and `cansee`, loop `SHIELD_COUNT` glyphs + delay, then `newsym`. JS `1819–1830` is that loop. Wrenching with Antimagic therefore flashes then `You_feel`. Not a comment pretending to match C.

Say it explicitly: this is **not** “Match C dispatch, callee is a stub” for the **wrenching** claim. `trapeffect` calls `tele_trap`. `shieldeff` and `vault_tele` are real. The **else** teledest/`tele()` arms **are** still no-ops — named, not the Open line. Do not read “Match C tele_trap” as “hero TELEP always `tele()`s.”

## Hallucinations / overclaim

D-log / subject say magic resistance wrenches with `You_feel`/`shieldeff` instead of silently deleting a once-TELEP. That is the hunk: wrenching first, `deltrap` only on the once arm after `next_to_u`. They name teledest/`tele()`. Stamping **Addressed:** D-1120 is fair for the Open wrenching line. Fill hash `acfb0167` in this commit.

## Density

One C function plus its `trapeffect` caller. ~70 JS lines. `tele()` / teledest / `teleds` `fill_pit` left named — not a second hypothesis.

## Verification

Journal: private canary **34**/34 (H/E/sticky/uprops confer; noteleport/stasis/endgame; non-once AM; once deltrap-after-next_to_u; covetous bypass; recursion guard); green+strict seed8000/0900; cohort **24**/24 including 0012 vault + 0360/4500/0373/0367; path **public-unhit** on AM TELEP. Cadence fortress is not an Antimagic-TELEP proof. This audit’s full `sessions` (cadence **#1425**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression, still not an AM TELEP hit.

C read of `teleport.c:1492–1535`, `youprop.h:55–57`, `trap.c:2070–2084`, `hack.h` Antimagic; JS `teleport.js:269–277` / `1705–1732`, `trap.js:3712–3716`, `display.js:1819–1830`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| Antimagic (uprops confer) | `shieldeff` + wrench; trap stays | **same** |
| In_endgame / noteleport, no AM | wrench, no sparkle | **same** |
| once + `next_to_u` | `deltrap` + `vault_tele` | **same** |
| once + `!next_to_u` | shudder; trap stays | **same** |
| deltrap before AM | (old JS) | **gone** |
| silent AM return | (old JS) | **gone** |
| non-once, no wrench | teledest / `tele()` | **named no-op** |
| recursion from dest trap | `in_tele_trap` return | **same** |

## Actionable C-wrongs

None that Must-fix this next iter. Wrenching and once match `teleport.c:1502–1511`; caller matches `trap.c:2075–2078`.

Named omits / do-nots (map / Open, not Must-fix):

1. `else if (isok(teledest))` displace + `teleds(TELEDS_TELEPORT)` (`teleport.c:1512–1530`).
2. `else tele()` (`teleport.c:1531–1532`). When ported, lift `next_to_u` to C’s sibling `else if` — do not keep it nested in `once`.
3. `teleds` `fill_pit(u.ux0,u.uy0)` after `u_on_newpos` (`teleport.c:526`). Live Open. JS `fill_pit` already exists (`dig.js` / `trap.c:4010–4019`) as extract+deltrap+delobj vs C `flooreffects(..., "settle")` — wire the **call** first; do not invent a Punished-ball peel.
4. Do not restore `tele_trap_once_vault` silent AM. Do not `deltrap` before wrenching. Do not Antimagic-gate on H\|\|E flats only. Do not skip `shieldeff` when Antimagic.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: hero TELEP now wrenches with `shieldeff`+`You_feel` (uprops confer) and only `deltrap`s a once trap after `next_to_u`, instead of silently deleting then returning, while teledest/`tele()` stay named.
- Must-fix stays empty for this SHA; next port pops Open `teleport.c` `teleds` `fill_pit`. Not Punished ball.
