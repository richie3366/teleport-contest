# Review 1711 — 937267d19 — pool reveal reads u.uinwater (D-2752)

Metadata: commit `937267d19`, D-2752, closes review 1706 Must-fix. `js/uhitm.js` `attack_checks` only. The row cited 0 corpus blocks. No prior review of this SHA.

## Intent vs deliverable

Subject promises the hiding-monster pool test uses `u.uinwater` (`youprop.h` `Underwater`) instead of `u.Underwater`, with the same `Blind ||` short-circuit, and no new import. The diff is that one condition plus a comment. `u.Underwater` is gone from the arm.

## Inventory

Changed JS: the `else if` at `js/uhitm.js:4249`. No function added or deleted. No symbol re-pointed.

```text
Underwater       NOT EXPORTED — but 2 LOCAL CLONE(S) in 2 file(s):
               js/lock.js:968  js/sit.js:150
is_pool          js/hack.js:1941   sync
attack_checks    js/uhitm.js:4167   ASYNC — await required
```

Both clones are `!!(game.u?.uinwater)` (`lock.js:968`, `sit.js:150`). This site does not call them. It reads `uH.uinwater` where `uH = game.u || {}` (`:4236`). That is the macro, not a third clone. `is_pool` was already imported (review 1706). No new edge, so no `--can` for a new target. `is_pool` is sync and runs only on the right of `||`.

## C ↔ JS fidelity

C `attack_checks` is `uhitm.c:188–327` (`csym`). The hiding block is `:268–297`. This commit touches `:289` only.

`:285–295` after `mundetected` is cleared, `newsym`, and the invisible-glyph `seemimic` return:

- `:285` `!Blind && Hallucination` → the tame/wild pline. JS `:4243` uses the local `Blind` and `Hallucination()`. Unchanged.
- `:289` `Blind || (is_pool(mtmp->mx, mtmp->my) && !Underwater)` → `Wait!  There's a hidden monster there!`. `Underwater` is `youprop.h:279` `(u.uinwater)`, and `uinwater` is the one-bit field at `you.h:431`. JS `:4249` is `Blind || (is_pool(mtmp.mx, mtmp.my) && !(uH.uinwater | 0))`. `!(n | 0)` is false only when the field is nonzero, which is the bit. `||` still skips `is_pool` when `Blind` is true, and skips the field when `is_pool` is false.
- `:291` else if the pile top is non-null → `hiding under` with `an(lmonbuf)` or `something`. JS `:4251–4256` is that else, and `objects_at` is the pile top. No object: both sides fall through with no pline.
- `:295` `return TRUE`. JS `:4257` `return true`.

No RNG on the arm.

The local `Blind` at `:4186–4188` is still `u.Blind || u.ublind || ((HBlinded || EBlinded) && !BBlinded)`. C `Blind` is only the macro (`youprop.h:103`). `u.ublind` is written only `false` (`do.js:3161`). `u.Blind` is assigned from exported `Blind()` at the end of `make_blinded` (`do.js:3160`). The macro is disjoined, so a stale-false cache still follows C; a stale-true cache (macro false, `u.Blind` still set) would skip `is_pool`. Review 1706 marked that const checked and queued only `u.Underwater`. This commit does not widen it. Not a second Must-fix.

Callers (`csym --callers`): `apply.c:3493`, `:3835`, `:3845`, `dokick.c:138`, `uhitm.c:521`. Comments at `dokick.c:1412`, `uhitm.c:516`, `:572–573`. JS: `apply.js:3831`, `:4006`, `:4016`, `dokick.js:829`, `uhitm.js:4382`. `dokick.js:1737` is the comment. No new caller.

## Hallucinations / overclaim

"Same short-circuit as C" matches the `||` / `&&` shape and the field. It does not rewrite the local `Blind`. The D-log says that the rest of the body stays D-2747. No FORCE, DIAG, `getRngLog`, seed, coordinate, or `fastforward` in the hunk. Rule #2 clean.

## Density

One field in the condition review 1706 already isolated. Right size for the Must-fix.

## Verification

Re-measured (`--base 937267d19~1 --reach-all`). Parent scoreboard blob is stamped `14f1ff816`. Row cited 0 blocks.

```text
verify attack_checks: baseline 937267d19~1 (scoreboard at 14f1ff816, 2026-09-23T09:42:03.293Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify attack_checks: no corpus session is blocked on it at 937267d19~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
smoke attack_checks: no RNG-tagged reach; fixed smoke spread (24 run, 3.0s): 24 PASS, 0 regressed → REACH-OK
```

0 REGRESSED. No corpus session is RNG-tagged for `attack_checks`, so this is the smoke line, and the 0-block note matches the row. The pool arm is not what those 24 run. Green/strict/cohort are the D-log's `verify.mjs` bullet.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
