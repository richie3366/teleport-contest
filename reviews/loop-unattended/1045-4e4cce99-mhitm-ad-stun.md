# Review 1045 — 4e4cce99 — mhitm_ad_stun mhitu arm (D-2075)

## Metadata

- SHA: `4e4cce99` — `uhitm.c mhitm_ad_stun mhitu arm never ported: second consecutive Pestilence touch fell into mhitm_adtyping_u default, so JS drew knockback rn2(3) where C drew the rn2(4) stun roll (queue owner mhitm_ad_stun) (D-2075).`
- JS diff: `js/mhitu.js` +25/−1 (new `mhitm_ad_stun_u`, `case AD_STUN`, doc), `js/mhitm.js` doc-only 4-line touch (named omit retired → points at the live arm).
- Docs: D-2075 D-log/D-index/CURRENT/NOTES/queue/turns.md map.
- Next index: 1045.

## Intent vs deliverable

Subject promises: the Pestilence second-touch mhitu arm now stuns
(`!mcan && !rn2(4)` → `make_stunned` + damage halved) instead of the
knockback default. Diff actually adds exactly that handler + dispatch
case. Promise == diff.

## Inventory

- New file-local fn: `mhitm_ad_stun_u` (mhitu.js; mirrors the
  CORR/SAMU `_u` shape).
- Changed: `case AD_STUN` in `mhitm_adtyping_u` (+ doc-list row);
  mhitm.js doc retires the «mhitu you-as-def» named omit.
- No new imports: `make_stunned` (`js/potion.js:843` async, awaited),
  `hitmsg`, `rn2`, `TIMEOUT` (mhitu.js:13) all already imported. No
  new edge, no TDZ.
- No deleted symbols. Diff grep: no `FORCE`/`DIAG`/seed/step reads, no
  `fastforward`, no coordinates.

## C ↔ JS fidelity

C mhitu arm (`uhitm.c:4406–4411`, via `csym.mjs`): `hitmsg(magr,
mattk); if (!magr->mcan && !rn2(4)) { make_stunned((HStun & TIMEOUT)
+ (long) mhm->damage, TRUE); mhm->damage /= 2; }` — notably NO mcan
early-return (unlike the mhitm arm `:4414–4416`, live since D-1396)
and hitmsg unconditional.

JS is verbatim: `await hitmsg` always; `if (!(mtmp.mcan | 0) &&
!rn2(4))` (mtmp is the attacker, correct operand); `await
make_stunned(((game.u?.HStun | 0) & TIMEOUT) + (mhm.damage | 0),
true)` — the `:3264` gaze-arm `HStun` idiom; `mhm.damage =
Math.trunc((mhm.damage | 0) / 2)` — C `/= 2` on a non-negative long
truncates, `Math.trunc` is the same. Leftover kept on both miss
paths, unlike the default zero. RNG call-for-call (single rn2(4)).
Branch-by-branch confirm.

Named omits precise: uhitm arm (`:4394–4402`, `!Blind` stagger +
`mhitm_ad_phys`) stays map-named; mhitm arm already live (D-1396).
The getmattk AD_STUN swap-in (mhitu.c:337–347) cited as the reach
path.

## Hallucinations / overclaim

None. «No mcan gate, unlike the mhitm arm» verified true against
both C arms.

## Density

25 insertions for one 6-line C arm + dispatch — C is that small.
Same sibling-arm cadence as 1041/1044. Acceptable.

## Verification

D-log Verify bullet: `verify --fn mhitm_ad_stun` → `1 PASS, 1 moved
past` (Archeologist-91127 PASS; Barbarian-91118 92→disclose@110) +
green + strict + cohort. Re-measured myself:
`hidden-proxy.mjs verify mhitm_ad_stun --base 4e4cce99~1` → `1 PASS,
1 moved past, 0 unchanged, 0 worse → PROGRESS`, both rows identical
to the claim. No WORSE, no vacuous check.

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
