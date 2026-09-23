# Review 1713 — a4348216d — mdamagem touch-petrify head (D-2754)

Metadata: commit `a4348216d`, D-2754, closes review 1701 item 2. `js/mhitm.js`: new `attk_protection`, and the head of `mdamagem`. The row cited 0 corpus blocks. No prior review of this SHA.

## Intent vs deliverable

Subject promises the touch-petrify head after the opening `d()` and before the adtyp dispatch, calling `attk_protection` then `mon_to_stone` or `monstone(magr)`, with the unseen-tame `You(brief_feeling, …)` line. The diff adds `attk_protection` (`:4203–4231`) and the `if` at `:4248–4276`. The `let damage = d(...)` line was already the first statement (parent `4bd644114`); this commit only comments it. The adtyp arms are untouched.

## Inventory

New JS: `export function attk_protection`. Changed JS: `mdamagem`. No symbol deleted or re-pointed.

```text
attk_protection  js/mhitm.js:4203   sync
touch_petrifies  js/monsters.js:453   sync
resists_ston     js/monsters.js:689   sync
poly_when_stoned js/monsters.js:676   sync
mon_to_stone     js/mhitm.js:3133   ASYNC — await required
monstone         js/mhitm.js:3249   ASYNC — await required
deadmonster      NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mhitm.js:778
canspotmon       js/display.js:1327   sync
pline_mon        js/display.js:7562   ASYNC — await required
You              js/display.js:7617   ASYNC — await required
Monnam           js/do_name.js:1223   sync
```

`mon_to_stone`, `pline_mon`, `monstone`, and `You` are awaited. `attk_protection` is sync and called bare. No new module edge (`touch_petrifies` / `resists_ston` / `poly_when_stoned` were already imported). `deadmonster` is the file-local clone of `DEADMONSTER`.

## C ↔ JS fidelity

C `mdamagem` is `mhitm.c:1015–1119`. C `attk_protection` is `mhitm.c:1473–1512`.

`attk_protection` switch, same groups, same results:

- `AT_NONE`, `AT_SPIT`, `AT_EXPL`, `AT_BOOM`, `AT_GAZE`, `AT_BREA`, `AT_MAGC` → `~0` (C `~0L`). JS `~0` is -1. Both compares in the head are `=== 0` and `!== ~0`, so the width does not matter. A `~0` protector fails the `if` and the attacker is not petrified.
- `AT_CLAW`, `AT_TUCH`, `AT_WEAP` → `W_ARMG`.
- `AT_KICK` → `W_ARMF`. `AT_BUTT` → `W_ARMH`. `AT_HUGS` → `W_ARMC | W_ARMG` (both bits required).
- `AT_BITE`, `AT_STNG`, `AT_ENGL`, `AT_TENT`, default → `0` (no worn defense; the `if` is true).

Head, after `mhm.damage = d(damn, damd)` (`:1025`). JS rolls that same `d()` then enters the `if`. An early return still burns the dice and skips adtyping. No second roll was added.

- Gate: `touch_petrifies(pd) || (adtyp == AD_DGST && pd == &mons[PM_MEDUSA])`, then `!resists_ston(magr)`. `touch_petrifies` is `mondata.h:200` cockatrice or chickatrice. JS uses `mndx` (`monsters.js:453`). `AD_DGST` is `monattk.h:68` value 26, and `PM_MEDUSA` is `monsterNames.indexOf` (`mhitm.js:244`). `resists_ston` is `monst.h:279` `Resists_Elem(mon, STONE_RES)`. Live JS (`monsters.js:689–694`) is `mresists | mextrinsics | mintrinsics` masked with `MR_STONE`. C `Resists_Elem` (`mondata.c:127–197`) also returns true for an artifact weapon `defends` and for worn/carried `oc_oprop`. That loop is the callee comment's named omit, repeated in this D-log. Intrinsic stone resistance still blocks the head.
- `protector = attk_protection(aatyp)`, `wornitems = misc_worn_check`, `mwep` ORs `W_ARMG`. Unprotected when `protector == 0` or (`protector != ~0` and the worn mask does not cover every protector bit). JS `:4253–4256` is that test.
- `poly_when_stoned(pa)` (`mondata.c:79–86`: golem, not already a stone golem, stone golem not `G_GENOD` `0x02`). JS passes `game.mvitals` and uses `0x02`. Then `mon_to_stone` and `return M_ATTK_HIT`. No `monstone` on that arm.
- Else `gv.vis && canspotmon(magr)` → `pline_mon(..., "%s turns to stone!", Monnam)`. `_mm_vis` is set in `mattackm` (`mhitm.js:5724`) to the same formula as `mhitm.c:358` before `hitmm` / `gazemm` / `gulpmm` / `explmm` call `mdamagem`. `pline_mon` is `vpline` of that format (`display.js:7562`).
- `monstone(magr)` always, then `!DEADMONSTER` → `M_ATTK_HIT`. `DEADMONSTER` is `monst.h:214` `mhp < 1`. The local clone (`mhitm.js:778`) is `!m || (mhp != null && mhp < 1)`. After `monstone`, `mhp` is a number. A null monster does not reach this line.
- Else `mtame && !vis` → `You(brief_feeling, "peculiarly sad")`. `brief_feeling` is `mhitm.c:9–10` `"have a %s feeling for a moment, then it passes."`. JS `You` prefixes `You ` (`display.js:7617`) and passes `'peculiarly sad'`. Then `return M_ATTK_AGR_DIED` on both the tame and the untame path.

Callers of `mdamagem` (`csym --callers`): `mhitm.c:731` `hitmm` → `js/mhitm.js:5318`; `:802` `gazemm` → `:5611`; `:910` `gulpmm` → `:5488`; `:989` `explmm` → `:5645`. The other hits are the decl and comments. `attk_protection` callers: `:1035` wired; `mhitu.c:2484` and `uhitm.c:5936` still have the deferral comments (`mhitu.js:3306`, `uhitm.js:2791`). The D-log names those two. They are not silent, and they are not this head.

## Hallucinations / overclaim

The subject does not say the per-adtyp tail was restarted. The map sentence lists `!resists_ston(magr)` without repeating the worn/artifact omit; the D-log does name it. D-2742's `do_stone_mon` mis-count is corrected: `monstone` at `:4265` is `mhitm.c:1050`, and `do_stone_mon` stays `uhitm.c:3963`. No FORCE, DIAG, `getRngLog`, seed, coordinate, or `fastforward` in the hunk. Rule #2 clean.

## Density

One 24-line head plus the 40-line helper it calls. The tail stays the split dispatch this commit did not claim. Right size for the missing caller.

## Verification

Re-measured (`--base a4348216d~1 --reach-all`). Parent scoreboard blob is stamped `937267d19`. Row cited 0 blocks. The reach set is 124, and all 124 ran.

```text
verify mdamagem: baseline a4348216d~1 (scoreboard at 937267d19, 2026-09-23T10:01:15.555Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify mdamagem: no corpus session is blocked on it at a4348216d~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
reach mdamagem: 124 baseline-PASS session(s) reach it (124 run, 22.7s): 124 PASS, 0 regressed → REACH-OK
```

0 REGRESSED. The 0-block note matches the row. The 124-session line is the D-log's reach claim, re-run, not a smoke sample. Green/strict/cohort are the D-log's `verify.mjs` bullet.

## Actionable C-wrongs

None. Worn/artifact `STONE_RES` and the two `attk_protection` callers stay the named deferrals.

Verdict: **ACCEPT**
