# Review 1218 — 62c6ea9f — buzzmu real zap path (D-2252)

Metadata: SHA `62c6ea9f` (D-2252). Queue row `muse.c` buzzmu real
zap path, named D-2233, no corpus block. js/ +68/−14 (mcastu
+29/−10, mthrowu +25, zap +11/−3, const +2, music +1/−1).

## Intent vs deliverable

Subject promises `lined_up && rn2(3)` → `nomul` + zap pline +
`buzz(BZ_M_SPELL)`, plus `rnd_hallublast` and `flash_str`
nohallu. Diff adds exactly that. Promise kept.

## Inventory

Changed: `buzzmu` (full C body); `flash_str(fltyp, nohallu=true)`
hallu arm; music.js horn site now passes `false`. New:
`rnd_hallublast` + 96-entry `HALLUBLASTS`; `BZ_M_SPELL`.
`sym.mjs`:

```text
lined_up         js/mthrowu.js:381   sync
rnd_hallublast   js/mthrowu.js:155   sync
flash_str        js/zap.js:824   sync
buzz             js/zap.js:2338   ASYNC — await required
BZ_M_SPELL       js/const.js:425   sync
m_seenres        js/mondata.js:679   sync
cursetxt         NOT EXPORTED — 1 LOCAL in mcastu.js:796
nomul            js/hack.js:1012   sync
cvt_adtyp_to_mseenres js/mondata.js:624   sync
```

`cursetxt` is C same-file (mcastu.c), not clone #2. `--can` at
HEAD ALREADY (D-log's SAFE is the in-SHA new names). Callee
closure — all LIVE: `BZ_VALID_ADTYP` (const.js ≡ hack.h:1474,
AD_MAGM..AD_SPC2 = 1..10), `m_seenres`, `cvt_adtyp_to_mseenres`,
`cursetxt`, `lined_up` → `m_lined_up` (mux/concealment is the
next Open, shipped D-2257 — not a stub here), `rn2`, `nomul`,
`canseemon`, `pline_mon`, `flash_str`, `BZ_OFS_AD`/`BZ_M_SPELL`,
`buzz`. `rnd_hallublast` is `ROLL_FROM` ≡ `HALLUBLASTS[rn2(len)]`.

## C ↔ JS fidelity

- `buzzmu` vs `mcastu.c:988–1012`: invalid adtyp silent miss (no
  RNG); `mcan || m_seenres` → `cursetxt` + miss; `lined_up(mtmp)
  && rn2(3)` short-circuit (no `rn2(3)` unless lined up);
  `nomul(0)`; `canseemon` → `"%s zaps you with a %s!"` with
  `flash_str(BZ_OFS_AD(adtyp), false)`; `game._buzzer = mtmp`
  (JS name for `gb.buzzer`, what `find_offensive` already
  reads); `buzz(BZ_M_SPELL(BZ_OFS_AD(adtyp)), damn, mx, my,
  Math.sign(_tbx), Math.sign(_tby))` ≡ C `sgn(gt.tbx/tby)`
  (`linedup` writes `game._tbx/_tby`); clear buzzer; `M_ATTK_HIT`.
  `BZ_M_SPELL` is `-10 - bztyp` (hack.h:1486). `BZ_OFS_AD` JS
  `adtyp-1` ≡ C `abs(adtyp-AD_MAGM)%10` on the valid 1..10
  range this function reaches.
- `rnd_hallublast` vs `:51–55`: table 96/96 byte-identical to
  `mthrowu.c:31–48` (probed this audit).
- `flash_str` vs `zap.c:6428–6445`: `Hallucination && !nohallu`
  → `"blast of "+rnd_hallublast()`; else `flash_types[zaptype]`.
  Default `nohallu=true` keeps one-arg dobuzz/zhitu sites from
  drawing hallu `rn2` before C's message guard — named OMIT,
  not a stub in the buzzmu arm. music.js horn now matches C
  `FALSE`.

## Hallucinations / overclaim

None. Hidden is labeled vacuous, NOT a PASS. `_buzzer` vs
`game.buzzer` (breath/timeout) is named pre-existing drift, not
widened. "Match C" is the full buzzmu body with live callees.

## Density

+68 for the 25-line C body + 5-line helper + 17-line table.
In-band.

## Verification

Audit re-ran the corpus claim itself:

```text
verify buzzmu: baseline 62c6ea9f~1 — 0 session(s) blocked
(0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed, exactly as labeled. Green 2/2 + strict ×2
+ cohort 7/7 + full 44/44 pasted. Diff grep: no FORCE/DIAG/seed/
coordinates. Rule #2 clean (re-run here, repo-wide).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
