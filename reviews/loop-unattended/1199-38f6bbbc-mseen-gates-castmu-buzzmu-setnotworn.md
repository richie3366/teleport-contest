# Review 1199 — 38f6bbbc — M_SEEN gates: castmu/buzzmu/setnotworn

Metadata: SHA `38f6bbbc` (D-2233). Queue row `muse.c` M_SEEN gates, no
corpus block. js/ mcastu.js +9/−3, do.js +3/−1.

## Intent vs deliverable

Subject promises three genuine live-arm gaps: `castmu` missing the
`m_seenres` disjunct, `buzzmu` missing the whole `mcan || m_seenres` →
`cursetxt` + MISS gate, `setnotworn` never calling `monstunseesu_prop`.
Diff delivers exactly those three arms on pre-existing import edges
(mondata names only). Promise kept.

## Inventory

Changed: `castmu` condition, `buzzmu` gate, `setnotworn` body. No new
functions. `sym.mjs` confirms all callees LIVE:

```text
m_seenres        js/mondata.js:679   sync
monstunseesu_prop js/mondata.js:660   sync
```

`m_seenres` returns boolean (`!== 0`, NOTES scar respected);
`cvt_adtyp_to_mseenres` (mondata.js:624) maps AD_SPEL/CLRC to the
M_SEEN_NOTHING default — so the new disjunct is a proven no-op there, as
the code comment states. OMIT (named): `buzzmu` lined_up `rn2(3)`+buzz
path, `m_canseeu` `#if 0` arms, MUSE_SCR_FIRE `#if 0`,
`setnotworn` update_inventory, standalone `mon_avoiding_this_attack`.

## C ↔ JS fidelity

castmu vs `mcastu.c:176–179`:

```c
if (mtmp->mcan || mtmp->mspec_used || !ml
    || m_seenres(mtmp, cvt_adtyp_to_mseenres(mattk->adtyp))) {
```

JS adds the fourth disjunct in the same position with the same operand.
`m_seenres` is draw-free, so short-circuit placement is behavior-safe;
`cursetxt(mtmp, is_undirected_spell(spellnum))` + M_ATTK_MISS unchanged.

buzzmu vs `mcastu.c:992–999`: range check first, then the gate, then the
(real, still-deferred) buzz path. `BZ_VALID_ADTYP` ≡ `AD_MAGM..AD_SPC2`
(`hack.h:1474`); JS locals are AD_MAGM=1/AD_SPC2=10 with the same
comparison direction — exact. `cursetxt(mtmp, FALSE)` + M_ATTK_MISS exact.
Order matches C, so no behavioral reorder.

setnotworn vs `worn.c:162–175`: C calls `monstunseesu_prop(p)` with
`p = objects[obj->otyp].oc_oprop` after the extrinsic clear and before
the owornmask clear, inside the slot-match loop. JS calls
`monstunseesu_prop(game.objects?.[obj.otyp]?.oc_oprop | 0)` after
`confer_oc_oprop(obj, mask, false)` and before the owornmask clear —
same adjacency. One obj cannot occupy two slots, so per-iteration vs
single-call placement is equivalent.

No RNG touched anywhere in the three arms (all gates draw-free).

## Hallucinations / overclaim

None. D-log marks hidden verify vacuous with the reason (0 blocks) and
keeps every remaining omit in map/header. No dispatch-with-stubbed-callee
shape: every callee reached is LIVE.

## Density

Tiny diff, but C is that small: three one-line gates, one family, one
handoff. The §2b carve-out ("unless C is that small") applies.

## Verification

Audit re-ran the corpus claim itself:

```text
verify castmu: baseline 38f6bbbc~1 — 0 session(s) blocked on it
(0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed, exactly as labeled. Green 2/2 + strict ×2 + cohort
7/7 + full 44/44 pasted in D-log. Diff grep: no FORCE/DIAG/`getRngLog`/
seed/fastforward/coordinates. Rule #2 clean (re-run here, repo-wide).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
