# Review 2952 — 05281fb52 — gv.vis gets its hmonas and mdisplacem writers

- SHA: `05281fb52` (cliff, board owner `mhitm_mgc_atk_negated`, 3 rows)
- D-entry: D-4112; Ledger: mhitm_mgc_atk_negated ported; hmonas ported;
  mdisplacem ported
- `js/` diff: `js/mhitm.js` +6/−1, `js/uhitm.js` +5/−1

## Intent vs deliverable

Promise: C has four `gv.vis` writers, but JS `_mm_vis` had one
(mattackm). hmonas never set it, so the poly'd hero's mhitm_ad_* arms
read whatever the last monster-vs-monster fight left. That made
mhitm_mgc_atk_negated's verbose «<mon> avoids harm.» disappear. Diff:
mhitm.js exports `set_mm_vis`. hmonas sets it at entry and resets it at
exit, and mdisplacem writes `_mm_vis = vis`. Promise = diff.

## Inventory

- `set_mm_vis` — mhitm.js:384 (setter for the module-private global).
- `hmonas` — uhitm.js:4239 / :4483; C uhitm.c :5433–5434, :5856.
- `mdisplacem` — mhitm.js:2277; C mhitm.c :222.
- `mattackm` writer unchanged — mhitm.js:6302; C mhitm.c :358.

## C ↔ JS fidelity

```c
gv.vis = (canspotmon(magr) && canspotmon(mdef));      /* mhitm.c :222 */
gv.vis = ((cansee(magr->mx, magr->my) && canspotmon(magr)) …  /* :358 */
/* not used here but umpteen mhitm_ad_xxxx() need this */
gv.vis = (canseemon(mon) || m_next2u(mon));            /* uhitm.c :5434 */
gv.vis = FALSE; /* reset */                            /* uhitm.c :5856 */
```

`grep 'gv\.vis = '` over pinned src/ finds exactly these four. JS now
writes `_mm_vis` at the same four places (mhitm.js:2277, :6302,
uhitm.js:4239, :4483), with the same predicates: `canseemon || m_next2u`
for hmonas, and `canspotmon && canspotmon` for mdisplacem. The hmonas set
comes before the attack loop and the reset after it, as in C. JS has a
`program_state.gameover` early return at :4463 that skips the reset. The
D-log names it: C's done path does not return into hmonas, so nothing
reads the stale value. No RNG.

## Hallucinations / overclaim

None. hmonas's own baseline block (Caveman-610084 s559, «A newt
suddenly appears close by!») is parked MISATTRIBUTED and is unchanged.
The D-log says so.

## Density

The missing writers of one global, all in one commit. Small and exact.

## Verification

```text
verify mhitm_mgc_atk_negated (--base 05281fb52~1): 3 blocked
  scen-extcmd-Ranger-51257077: PASS
  scen-poly-Rogue-50558008: PASS
  scen-worldtour-Wizard-620020: PASS
verify mhitm_mgc_atk_negated: 3 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify hmonas: 1 blocked, still hmonas at step 559 (parked) → NO MOVEMENT
verify mdisplacem: 0 blocked
```

Exact match with the D-log. Full public 44/44 on HEAD.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
