# Review 1029 — 0a8386e7 — mhitu AD_HEAL + AD_PEST (D-2059)

**SHA:** `0a8386e7` · **D-id:** D-2059 · **Files:** `js/mhitu.js`
only (~115 insertions)

## Intent vs deliverable

Subject promises: "nurse hitmsg + Pestilence reach-out/diseasemu
(queue owner use_pole, misattributed)". Three screen-first
polearm-thrust sessions, RNG fully matched (nurse 3975/3975
positional), monster same-turn counterattack message missing in JS:

- scen-genesis-Archeologist-91127 step 62: C «You miss
  Pestilence.--More--» vs JS «You miss Pestilence.».
- scen-genesis-Barbarian-91118 step 87: same pair.
- scen-wish-Rogue-91138 step 158: C «You miss the nurse. The nurse
  hits!» vs JS «You miss the nurse.».

Diff actually adds: file-local `diseasemu`, `mhitm_ad_pest_u`,
`mhitm_ad_heal_u` + two dispatch cases. Promise matches diff.
No unrelated edits.

## Inventory

| JS function | Change |
|---|---|
| `diseasemu` (mhitu.js) | NEW file-local clone of `mhitu.c` body |
| `mhitm_ad_pest_u` (mhitu.js) | NEW, wired as `AD_PEST` |
| `mhitm_ad_heal_u` (mhitu.js) | NEW, wired as `AD_HEAL` |
| `mhitm_adtyping_u` (mhitu.js) | +2 cases |

## C ↔ JS fidelity

**`diseasemu` — confirms** against `mhitu.c:1032–1043` (12-line
`csym` body quoted in full): resistance → `You_feel("a slight
illness.")`, FALSE; else `make_sick(Sick ? Sick/3+1 :
rn1(ACURR(A_CON),20), mdat->pmnames[NEUTRAL], TRUE,
SICK_NONVOMITABLE)`, TRUE. JS matches, with two representation
notes that check out: (1) `(u.Sick|0) & TIMEOUT` — C `Sick` is
`u.uprops[SICK].intrinsic` (`youprop.h:108`), a plain timeout set
via `set_itimeout` (already ≤ TIMEOUT; vomit-type lives separately
in `u.usick_type`), so the mask is defensive but value-identical;
`Math.trunc(s/3)+1` is exact for s ≤ 0xFFFFFF. (2) The resistance
predicate inlines `hero_Sick_resistance` verbatim (H||E flat +
`uprops[SICK_RES]`), carrying its already-recorded named
`defended(AD_DISE)` omission (`invent.js:4652–4661`) — no new
divergence; inlining was forced since that helper is not exported.
`'a Rider'` fallback is unreachable in practice (Pestilence mdat
always resolves) and RNG-free.

**`mhitm_ad_pest_u` — confirms** against `uhitm.c:3807–3834`.
C mhitu arm (`:3819–3824`): `pline_mon` reach-out, `diseasemu(pa)`,
"plus the normal damage" (not zeroed). JS: same pline text, passes
`mtmp?.data` (= `pa`), leaves `mhm.damage` untouched. No `hitmsg`
— correct, C goes straight to `pline_mon` like FAMN. The uhitm arm
is correctly *not* ported (C `:3815–3819` says it cannot happen);
mhitm arm correctly left in `mhitm.js` (AD_DISE damage).

**`mhitm_ad_heal_u` — confirms branch-by-branch** against
`uhitm.c:4295–4385` (91 lines read in full): mcan/poly-petrify →
`hitmsg` (`:4312–4315`); naked gate with the exact 7-slot armor
list and WEAPON_CLASS/`is_weptool` oclass check (`:4317–4319`,
matching `sounds.c` MS_NURSE per comment); heal text
(`:4323–4324`); Upolyd `mh` vs `uhp` variants with `rnd(7)` →
`rn2(7)` → cap (`5*ulevel+d(2*ulevel,10)`, `uhppeak`) → `rn2(13)`
goaway, clamp (`:4325–4344`); `rn2(3)` STR then CON exercise
(`:4345–4348`); Sick cure (`:4349–4350`); botl (`:4351`);
`rn2(13)` mongone/DIED else `rn2(33)` rloc+monflee/HIT|DIED else
damage 0 (`:4352–4367`); armored Healer-role 5th-move verbalize
with `SetVoice` else damage 0, armored others `hitmsg`
(`:4368–4377`). RNG call-for-call in C order. `Role_if(PM_HEALER)`
→ `urole.mnum` compare and `!Deaf && !(moves % 5)` are the standard
JS idioms.

Callee closure: `mongone` (mon.js:2876 async, awaited),
`make_sick` (potion.js:912 async, awaited), `is_weptool`
(wield.js:110 — imported export, correctly *not* a tenth local
clone), `Upolyd`, `WEAPON_CLASS`, `SICK_*`, `PM_HEALER`,
`pmnames` — all LIVE on pre-existing edges. Dispatch "exact C
order" is cosmetic (switch order is semantically void, and C's
full `mhitm_adtyping` order differs trivially), but wiring is by
value and correct. No stub in any live arm.

## Hallucinations / overclaim

None. Misattribution stated (`use_pole` untouched, already
faithful). Later owner `mhitm_ad_stun` and remaining `mhitm_ad_*`
arms stay named.

## Density

~115 insertions, one envelope (mhitu heal/pest). Right-sized.

## Verification

Re-measured myself:

```text
node scripts/hidden-proxy.mjs verify use_pole --base 0a8386e7~1
verify use_pole: 1 PASS, 2 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-genesis-Archeologist-91127: moved → mhitm_ad_stun at step 67 (was 62)
  scen-genesis-Barbarian-91118: moved → mhitm_ad_stun at step 92 (was 87)
  scen-wish-Rogue-91138: PASS
```

Identical to the D-log. `imports.mjs --rulecheck` clean at HEAD;
diff grep: no FORCE/DIAG/RNG-log/seed/coordinate gates.

Observation (not a wrong, pre-existing, unreachable): JS
`make_sick`'s cure branch has a `|| SICK_ALL` fallback that would
cure when `usick_type` is 0 where C's `type & u.usick_type` would
not — but C and JS always set `usick_type` alongside `Sick`, so
the state is unreachable from this call path. Flagging only so a
future `make_sick` edit does not lean on it.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
