# Review 1048 — 620d57b0 — spelleffects_check amulet + suffix (D-2078)

## Metadata

- SHA: `620d57b0` — `spell.c spelleffects_check dropped the energy-message yet/anymore suffix and the Amulet drain arm: level-1 Priest drew «...cast that spell.» where C draws «...cast that spell yet.» (queue owner spelleffects_check) (D-2078).`
- JS diff: `js/spell.js` +29/−3 (amulet-drain arm, yet/anymore suffix, doc).
- Docs: D-2078 D-log/D-index/CURRENT/NOTES/queue/turns.md map.
- Next index: 1048.

## Intent vs deliverable

Subject promises: the Amulet drain arm (You_feel + rnd drain + turn
burn) before the energy check, plus the yet/anymore message suffix.
Diff actually adds both in C order. Promise == diff.

## Inventory

- Changed: one function (`spelleffects_check` mid-body).
- No new imports: `You_feel` (spell.js:124), `rnd`, `ECMD_TIME`
  already imported. No new edge, no TDZ.
- No deleted symbols. Diff grep: no `FORCE`/`DIAG`/seed/step reads, no
  `fastforward`, no coordinates. The single RNG call (`rnd(2 *
  energy)`) sits exactly in the new arm.

## C ↔ JS fidelity

C (`spell.c:1290–1319`, read directly): `if (u.uhave.amulet &&
u.uen >= *energy)` → `You_feel(amulet draining)` + `u.uen -=
rnd(2*energy)` + clamp-at-0 + `botl=TRUE` + `*res=ECMD_TIME`
(`:1290–1303`); then `if (*energy > u.uen)` → `You("...spell%s.",
(uen<uenmax)?"" : (energy>uenpeak)?" yet":" anymore")` (`:1305–1319`).

JS mirrors order and predicates: the dual-field gate
`(uhave?.amulet || uhave_amulet)` is the established
eat.js/teleport.js split-brain idiom, `(uen ?? 0) >= energy` matches;
`max(0, uen - rnd(2*energy))` ≡ C subtract-then-clamp; `botl=true`;
`res = ECMD_TIME` lands correctly (`res` is the returned local —
the energy-fail `return { abort: true, res, energy }` preserves it
exactly as C preserves `*res`). Suffix ternary is token-identical to
C, and `uenpeak` is genuinely maintained (u_init sets it; exper,
eat, mhitu, potion, trap update it — verified by read), so the
yet/anymore fork is live, not a constant. RNG call-for-call.
Branch-by-branch confirm.

Named: none new — the amulet arm retires a named omission; the rest
of `spelleffects_check` (hunger/STR/capacity above, hungr below) is
pre-existing live code.

## Hallucinations / overclaim

None. «Drain consumes a turn even when the spell then fails»
verified against both the C comment (`:1302`) and the JS `res`
plumbing.

## Density

29 insertions for one C arm + one message fork. Right-sized (C is
that small).

## Verification

D-log Verify bullet: `verify --fn spelleffects_check` → moves on
both blocked sessions. Re-measured myself: `hidden-proxy.mjs verify
spelleffects_check --base 620d57b0~1` → `1 PASS, 1 moved past, 0
unchanged, 0 worse → PROGRESS` (Priest-92113 PASS; Priest-92122
22→monster_detect@129, strictly later). No WORSE, no vacuous check.

## Actionable C-wrongs

None.

## Verdict

Verdict: **ACCEPT**
