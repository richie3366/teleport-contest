# Review 133 — e7c5c8ac — teleport.c `rloc` steed `tele()` then TRUE (D-1172)

## Metadata
- Full / short hash: `e7c5c8aca5221d20f08d7130fe9703db82e0b75d` / `e7c5c8ac`
- Parent: `822498d3` (D-1171). This file audits **this SHA only**. The fix stamped **Addressed:** D-1172 without the short hash; this review commit fills `e7c5c8ac`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 19:14:32 +0200
- D-id: **D-1172**
- Stats: 10 files, +109 / −36 — `js/teleport.js` +10 / −1 (`rloc` steed arm).
- Claims to close: Open queue `teleport.c` `rloc` steed `tele()` (named). Not Wizard stair. Review **83** named `teleport.c:1808–1810` (`return false`). `reviews/loop-2026-08-15/` has no open rloc-steed Must-fix.
- JS / map: `teleport.js` `rloc`; callee `tele` → `scrolltele(null)` (D-0407 / D-1153). `c-js-map/turns.md` `teleport.c`. `mnexto` `control_mon_tele`, vanish-msg, `RLOC_ERR` still named. `scrolltele` `make_blinded` / W-tower half of amulet gate / steed whobuf still named on the callee.
- Prior reviews this SHA claims to close: **83** named omit; D-1171 next-port.

## Intent vs deliverable

Git subject promises: “Match C teleport.c rloc so relocating the hero's steed runs tele() and reports success, instead of returning false and leaving the rider unmoved.”

Old JS `rloc(usteed)` was `return false` with a comment that `tele()` was deferred (review **83**). C `:1808–1811`, **before** the Wizard stair `iswiz && mx` arm (D-1122): `if (mtmp == u.usteed) { tele(); return TRUE; }`. Callers that branch on `rloc` success (`minliquid` lava/pool, `u_teleport_mon`, …) took the failure path and never moved the rider with the mount. `teleport_pet` steed FALSE (`:790–791`) is a **different** locus and stays false.

The diff **does** `await tele(); return true` on pointer identity with `u.usteed`. It does **not** port Wizard stair, `mnexto` `control_mon_tele(..., FALSE)`, vanish-msg, or `RLOC_ERR` `impossible()`. Named. It does **not** rewrite `scrolltele` internals (`make_blinded` / `On_W_tower_level` half of the amulet gate / steed whobuf) — those stay named on the callee, as they were for vault_tele’s `tele()` (review **114**).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `rloc` steed arm | C body, **rewritten** | `teleport.c:1808–1811`; was `return false` |
| `tele` | C callee, **imported** | `:842–845` → `scrolltele(NULL)` |
| `scrolltele` / `safe_teleds` / `teleds` | C callees, **imported** | real; `make_blinded` / W-tower yn **named** on scrolltele |
| `teleds` usteed `mx/my` | C `u_on_newpos`, **pre-existing** | `teleport.js:1416–1418`; `dungeon.c:1584–1585` |
| Wizard stair `iswiz && mx` | C arm, **untouched** | D-1122; after steed |
| `teleport_pet` steed FALSE | C body, **untouched** | `:790–791` / `teleport.js:2108` |
| `mnexto` `control_mon_tele` | C caller, **named omit** | `mon.c:3974–3978`; `via_rloc` FALSE |
| vanish-msg / `RLOC_ERR` | C body, **named omit** | Open |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** `tele()` → `scrolltele` (`noteleport` pline no RNG; amulet `!rn2(3)`; else `safe_teleds` 40× `rnd(COLNO-1)` / `rn2(ROWNO)` + candy). That is C. Previously JS burned **no** RNG and returned false. Path **public-unhit** on riding `rloc(usteed)` (seed0103/0104 ride sessions do not `rloc` the pony). Cadence fortress is not a steed-rloc proof.

Grep of this SHA’s `js/` hunks: no `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names in control flow, or recorded coordinates.

## Constitution / playbook

Grep of the JS hunks: no trace-index gates. Do not `return false` for steed. Do not take Wizard stairs when `mtmp === usteed` (steed is first). Do not confuse `teleport_pet` FALSE with this arm. Do not pull `mnexto` telecontrol into this peel. Do not hardcode a ride session coordinate.

## C ↔ JS fidelity

### Arm vs `teleport.c:1808–1811`

C, at the top of `rloc` after locals, **before** `iswiz && mx`:

```
if (mtmp == u.usteed) {
    tele();
    return TRUE;
}
```

JS (`teleport.js:1146–1152`): null-guard first (JS-only; C would NPE on `mtmp->iswiz` if NULL — no live NULL caller); then `mtmp === game.u?.usteed` → `await tele(); return true`. Pointer identity matches C. `usteed` is the `fmon` object (`steed.js` mount). Match.

TRUE even when `tele()` does not move: C `scrolltele` noteleport (`:854–859`) plines mysterious force and `return`s; `rloc` still returns TRUE. JS `scrolltele` same pline (`:1586–1589`) then `tele` returns; `rloc` still `true`. Callers must not treat that as “place failed.” Match. Canary: noteleport TRUE + no 50× rnd + hero/steed stay.

Wizard stair stays **after** this arm. `iswiz && mx` cannot run for the steed. Riding the Wizard is not a real case; the order still matches C. Arriving Wizard `mx==0` is not a steed. Ordinary mons still 50-try then candy (D-1122). Match.

### Callee vs `teleport.c:842–915`

`tele()` is `scrolltele(NULL)`. JS `tele` (`:1634–1636`) awaits that. **Not a stub.** Review **114** already accepted vault_tele’s else `tele()` through the same function.

Named internals (pre-existing on `scrolltele`, restated in D-1172 “Not this iter”):

1. `make_blinded(0, FALSE)` when `!Blinded` (`:862–863`) — JS comment deferred. No RNG; vision polish.
2. Amulet **or** `On_W_tower_level` `!rn2(3)` (`:865`). JS amulet only (`:1593`) — W-tower half named. Wizard Override yn named (JS treats wizard as accept).
3. Steed whobuf `"you and %s"` (`:880–882`) — JS `"Where do you want to be teleported?"`.
4. `unconscious()` controlled fail (`:874–876`).

Those are **named callee omits**, not a miss of the `rloc` dispatch. Same standard as review **114**. Do not Must-fix W-tower onto this steed wire — it is already on the `scrolltele` map row. A future `scrolltele` cluster owns it.

`teleds` after a successful place copies `usteed.mx/my` from `u.ux/uy` (`teleport.js:1416–1418` / `dungeon.c:1584–1585`). The rider moves with the mount when `tele()` actually places. This SHA does not touch `teleds`; it only reaches it. Match C `u_on_newpos`.

### `teleport_pet` is not this arm

C `:790–791` `if (mtmp == u.usteed) return FALSE` — migrate/leash gate, not `rloc`. JS `:2108` unchanged. Canary: `teleport_pet` still FALSE. Do not “fix” that to `tele()`.

`u_teleport_mon` may `rloc(mtmp, RLOC_MSG)` (`:1672`). If `mtmp` is the steed, C now `tele()`+TRUE; old JS false. That is the Open item’s observable. Priest-in-temple resist still runs **before** `rloc` (`:1655–1659`) — a temple priest is not `usteed`.

`scrolltele` order when `rloc` reaches it (steed, `scroll==null`): `noteleport_level(&youmonst) && !wizard` → force pline, return (rloc still TRUE); `make_blinded` named skip; `(amulet || W-tower) && !rn2(3)` → disoriented, maybe return; Teleport_control / wizard `getpos` / `teleok` / `teleds`; else `safe_teleds`. JS matches noteleport, amulet-only `rn2(3)`, control `getpos`, `safe_teleds`. W-tower without the Amulet skips the `rn2(3)` (named). Wizard Override yn skipped (named). Uncontrolled steed teleport therefore burns `safe_teleds` 40× `rnd`/`rn2` like C, instead of the old JS **zero** RNG + false. That is the C prefix this SHA adds, not a trace-shaped extra.

`minliquid` lava/pool may `rloc` a drowning steed. Failure used to leave the rider in lava while C `tele()`’d the pair (or TRUE-failed noteleport and still reported success so the caller did not take a “couldn’t relocate” death arm). This SHA closes that dispatch. `teleds` already copies steed coords; drowning follow-up (`spoteffects` / `lava_effects`) is the existing teleds envelope, not a new clone.

D-1122 Wizard stair remains `goodpos` not `rloc_pos_ok`, and only when `iswiz && mx` after this arm. An ordinary ridden pony is not `iswiz`. Do not route steed through stairs.

## Hallucinations / overclaim

D-log / CURRENT / subject say `rloc(usteed)` runs `tele()` and reports success instead of returning false and leaving the rider unmoved. **That is the hunk:** four lines at C’s first arm. Stamping **Addressed:** D-1172 is fair for the Open **steed** line. Fill hash `e7c5c8ac` in this commit. Do **not** stamp it as “Match C `scrolltele` `make_blinded`” or “Match C W-tower `rn2(3)`” or “Match C `mnexto` telecontrol.” This is **not** “Match C dispatch, callee is a stub”: `tele` / `scrolltele` / `safe_teleds` / `teleds` are live (partial named internals, same as vault_tele).

## Density

One C `if` at the top of `rloc`. ~8 JS lines. Thin vs §2b; queue said “Not Wizard stair” (D-1122 already shipped). Review **83** named this exact omit. Correct split. Not QUALITY-RISK for thinness.

## Verification

Journal: private canary **33**/33 (C `{ tele(); return TRUE }` before iswiz; `teleport_pet` FALSE other locus; JS await tele then true; no `return false` for steed; Wizard stair kept for non-steed; noteleport TRUE + no 50× rnd + stay + mysterious-force; ordinary still rnd; iswiz steed not stairs; `teleport_pet` still FALSE; thenable; no fs/FORCE); green+strict seed8000/0900; cohort **41**/41 + strict including 0103/0104 ride sessions (those do not `rloc` the pony). Path **public-unhit** on riding `rloc(usteed)`.

C read of `teleport.c:1799–1895` (`:1808–1811`), `:842–915`, `:786–810`, `dungeon.c:1584–1585`, `mon.c:3970–3982`; JS SHA `rloc` + existing `tele` / `scrolltele` / `teleds` / `teleport_pet`. Hunk grepped FORCE/fs/seed. This audit’s full `sessions` (cadence **#1490**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — ordinary `rloc` 50-try unchanged; ride sessions still do not hit this arm.

| Case | C | JS after |
|------|---|---------|
| `rloc(usteed)` | `tele(); return TRUE` | **same** |
| noteleport | force pline; TRUE; stay | **same** |
| before `iswiz` stair | yes | **same** |
| ordinary mon | 50-try + candy | **same** |
| `teleport_pet(usteed)` | FALSE | **untouched** |
| `mnexto` telecontrol | `via_rloc` FALSE | **named omit** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open steed arm matches `teleport.c:1808–1811`. Callee is real `tele`/`scrolltele`.

Named omits / do-nots (map / Open, not Must-fix):

1. `mnexto` `control_mon_tele(..., FALSE)` (`mon.c:3974–3978`). Open next.
2. telemsg “vanishes and reappears” / ustuck-together. Open.
3. `RLOC_ERR` `impossible()` (`:1886–1887`). Open.
4. `scrolltele` `make_blinded` / W-tower `On_W_tower_level` / steed whobuf / Override yn. Map on `scrolltele` (not this dispatch).
5. Do not restore `return false` for steed. Do not take Wizard stairs for `usteed`. Do not change `teleport_pet`. Do not pull `mnexto` into this SHA.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `rloc(usteed)` now calls real `tele()` and returns true even if the hero does not move, matching C `:1808–1811` before the Wizard stair arm, while `mnexto` telecontrol and `scrolltele` polish stay named.
- Must-fix stays empty for this SHA; next port pops Open `mon.c` `mnexto` `control_mon_tele`. This review fills archive hash `e7c5c8ac`. Not Wizard stair, not `teleport_pet`.
