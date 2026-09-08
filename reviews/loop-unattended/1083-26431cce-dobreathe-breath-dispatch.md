# Review 1083 — 26431cce — dobreathe uen drain + getdir + breath dispatch

Metadata: SHA `26431cce`, D-2117, `js/polyself.js` + `js/const.js`
(~33 js/ insertions). No prior review claims this SHA.

Intent vs deliverable: the subject promises a full C-order `dobreathe`
port — energy cost before the prompt (cancelled breath still costs 15),
live `getdir`, `attacktype_fordmg` AT_BREA/AD_ANY dispatch to
`ubreatheu` / `ubuzz(BZ_U_BREATH(...))`, with `BZ_U_BREATH` added to
`js/const.js` beside the existing BZ macros. The diff delivers exactly
that: one extended function, one new macro, two import extensions.
No additional arms or files.

Inventory: one extended function (`dobreathe`); one new const macro
(`BZ_U_BREATH`); zero new helpers, zero deleted symbols (no `sym.mjs`
deletion output required — nothing deleted or re-pointed).

**C ↔ JS fidelity**: C `dobreathe`
(`nethack-c/upstream/src/polyself.c:1420–1447`, 28 lines), branch by
branch:

- `Strangled` → `You_cant("breathe.  Sorry.")`, `ECMD_OK` ✓ (pre-existed,
  unchanged; JS `pline("You can't breathe.  Sorry.")` matches).
- `u.uen < 15` → refuse pline, `ECMD_OK` ✓ (pre-existed, unchanged).
- `u.uen -= 15; disp.botl = TRUE;` ✓ — JS drains before `getdir`, so a
  cancelled breath still costs 15 (C `:1433–1434` order ✓). JS also sets
  `game.flags.botl`; that is the file's standard dual-state idiom
  (`disp.botl` is also set), not a C divergence.
- `if (!getdir(NULL)) return ECMD_CANCEL;` ✓ — live `lock.js` async
  `getdir`, awaited, `ECMD_CANCEL` on falsy.
- `attacktype_fordmg(youmonst.data, AT_BREA, AD_ANY)` ✓ — live
  `uhitm.js` export (already imported at polyself.js:17), `AD_ANY=-1`
  per `monattk.h:41` ✓.
- `!mattk → impossible("bad breath attack?")` ✓; `!dx&&!dy&&!dz →
  ubreatheu(mattk)` else `ubuzz(BZ_U_BREATH(BZ_OFS_AD(adtyp)), damn)` ✓
  — both callees LIVE (`zap.js:2034` / `zap.js:2275`, async, awaited).
- `BZ_U_BREATH(bztyp) = 20+(bztyp)` matches `hack.h:1484` verbatim;
  `BZ_OFS_AD` pre-existing at const.js:417 ✓. Final `ECMD_TIME` ✓.

Callee closure: `getdir` LIVE, `attacktype_fordmg` LIVE,
`ubuzz`/`ubreatheu` LIVE, `pline`/`impossible` LIVE. No clones, no
stubs, no new omissions. RNG: none in C body; none added. Caller is
`cmd.c:903` (`return dobreathe()`); return-value contract
(OK/CANCEL/TIME) preserved.

Hallucinations / overclaim: none. The subject's "dosummon botl idiom"
and "`--can` cycle-safe" claims check out — both import targets were
already static edges (`ALREADY` on both `--can` probes), so no new
cycle at all. The "none new" named-omission line is accurate: the
Strangled and `uen<15` arms pre-existed and are unchanged.

Density: ~33 insertions for a 28-line C function, one locus, one
module (+2-line macro beside its siblings). Right-sized per §2b.

Verification: D-log Verify bullet claims `verify.mjs --fn getdir` →
PROGRESS (Healer-92109 115 → `stairs_description`@208), green 2/2,
strict ×2, cohort 7/7. Re-measured independently:
`hidden-proxy.mjs verify getdir --base 26431cce~1` →
`0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS`
(scen-poly-Healer-92109 moved → stairs_description at step 208).
Matches exactly — not vacuous (moved-past, not a renamed PASS).
`imports.mjs --rulecheck` → Rule #2 clean. No FORCE/DIAG/seed/coordinate
reads in the diff.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
