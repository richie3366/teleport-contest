# Review 1775 — 5dd7c4a90 — retouch_equipment callers (D-2816)

- SHA: `5dd7c4a90` (coverage; wire the six live callers)
- Files: `js/artifact.js` comment only; `js/attrib.js` `uchangealign`; `js/eat.js` `cpostfx`; `js/mhitu.js` `mhitm_ad_were_u`; `js/polyself.js` `newman`, `rehumanize`, `polymon`
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on this SHA: "Rule #2 clean".
- `imports.mjs --can` `polyself.js` / `attrib.js` / `eat.js` / `mhitu.js` → `artifact.js` `retouch_equipment`: all `ALREADY`. The new `polyself.js` import is used only inside `newman`, `rehumanize`, and `polymon`.

## Intent vs deliverable

Subject promises the existing `retouch_equipment` awaited at the six C call sites, after the state change and before `selftouch` where C has one. `dropflag` 0 from `uchangealign`, 2 from the others. The diff is those six awaits plus a comment. `apply.c:4115` and `zap.c:2149` stay comments.

## Inventory

| Site | Class | C |
|------|-------|---|
| `retouch_equipment` | existing export, async | `artifact.c:2639–2705` |
| `untouchable` | file-local | `artifact.c:2596–2636` |
| `retouch_object` | exported `artifact.js:1497` | `artifact.c:2505–2591` |
| `uchangealign` | await `retouch_equipment(0)` | `attrib.c:1360` |
| `cpostfx` | await `(2)` after `set_ulycn` | `eat.c:1325` |
| `newman` | await `(2)` then `selftouch` | `polyself.c:463–465` |
| `polymon` | await `(2)` then `selftouch` | `polyself.c:1021–1027` |
| `rehumanize` | await `(2)` then `selftouch` | `polyself.c:1415–1417` |
| `mhitm_ad_were_u` | await `(2)` after `set_ulycn` | `uhitm.c:4285` (`mhitm_ad_were` hero-defender arm) |

`csym --callers retouch_equipment` lists those six plus the two comments. No seventh call was left as a silent comment.

`sym.mjs`:

```
retouch_equipment js/artifact.js:1619   ASYNC — await required
untouchable      NOT EXPORTED — local js/artifact.js:1579
retouch_object   js/artifact.js:1497   ASYNC
bypass_obj       js/worn.js:642   sync
                 ALSO 1 LOCAL CLONE js/zap.js:2813
clear_bypasses   js/worn.js:1136   sync
nxt_unbypassed_obj js/worn.js:1085   sync
selftouch        js/trap.js:3458   ASYNC
which_armor      js/worn.js:406   sync
uncurse          js/mkobj.js:663   ASYNC
dismount_steed   js/steed.js:884   ASYNC
```

`untouchable` is the one C `staticfn`. The zap `bypass_obj` clone is not this commit.

## C ↔ JS fidelity

`retouch_equipment` (`artifact.c:2661–2704`), already the body this SHA calls. Nesting starts at 0; the outer entry and the outer exit call `clear_bypasses`. `dropit` is `dropflag > 0` for the weapon pair, then `dropflag == 1` for the invent scan. `twoweap` marks and tests `uswapwep` before `uwep`. A saddle from `which_armor(usteed, W_SADDLE)` is tested with drop false, and a true result `dismount_steed(DISMOUNT_THROWN)`. The invent loop is `nxt_unbypassed_obj`. Lost rings with still-cursed gloves call `uncurse`. Lost gloves call `selftouch("After losing your gloves, you")`. JS awaits those. `bypass_obj` is skipped when `uswapwep` is null; C would dereference. `untouchable(null)` returns false (`beingworn` is false and a non-artifact has no carry or invoke bit). Named.

`uchangealign` (`attrib.c:1358–1360`): after `ualign.record = 0` when the type changed, `retouch_equipment(0)`. That is the end of the function on both sides.

`cpostfx` (`eat.c:1323–1326`): `ismnum(catch_lycanthropy)` then `set_ulycn` then `retouch_equipment(2)`. JS is the last statement of `cpostfx`.

`newman` (`polyself.c:459–465`): `botl`, `see_monsters`, `encumber_msg`, `retouch_equipment(2)`, then `selftouch` when `!uarmg`. JS `newman` `:1068–1073` is that order.

`polymon` (`polyself.c:1016–1027`): `encumber_msg`, then `retouch_equipment(2)`, then gloveless `selftouch`. JS `polymon` `:1736–1741` is that order.

`rehumanize` (`polyself.c:1412–1417`): the flying-steed `You` (when `was_flying && !Flying && usteed`), then `retouch_equipment(2)`, then gloveless `selftouch`. JS `rehumanize` `:1123–1128` is that order.

`mhitm_ad_were` hero-defender arm (`uhitm.c:4276–4285`): `hitmsg`, then `!rn2(4) && ulycn == NON_PM && !Protection_from_shape_changers && !defends(AD_WERE, uwep) && !mhitm_mgc_atk_negated(..., TRUE)`, then feverish, `exercise(A_CON, FALSE)`, `set_ulycn(monsndx(pa))`, `retouch_equipment(2)`. JS `mhitm_ad_were_u` keeps `rn2(4)` before the await. The call sits inside that `if`, after `set_ulycn`.

`apply.c:4115` and `zap.c:2149` are comments in C. They are not call sites.

## Hallucinations / overclaim

The subject says the export is awaited at those six sites. The body was already `artifact.c:2639–2705`; this SHA does not rewrite it. `retouch_object` (`:1497`) is the touch/silver/bane/unwear/drop path, not an early return. Wiring the callers is what the subject claims.

## Density

One function’s callers. The six arms that C actually calls are live. The two comment lines are not missing calls.

## Verification

Re-run on this SHA: `node scripts/hidden-proxy.mjs verify retouch_equipment --base 5dd7c4a90~1 --reach-all`.

```
verify retouch_equipment: baseline 5dd7c4a90~1 (scoreboard at 30a1b86dc) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke retouch_equipment: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. D-2816’s green, strict, and cohort were not re-run here.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
