# Loop work queue

Unattended **port** iterations pop the **first unchecked** item, preferring
**Must-fix** over Open. Do not combine items. Do not invent a substitute.
Live file is **unchecked-only**. Done rows live in
`docs/archive/LOOP-QUEUE-DONE.md`.

**Keep 8–12 open `- [ ]` rows.** If Must-fix+Open drops below **8**
(including after you archive this iter’s item), **refill Open** in the
**same commit** up to **12**. Sources: named omits in the subsystem
`docs/c-js-map/*.md` row you are in (prefer `data.md` / `debt.md`, then
`absent.md`). One C function/family per line; cite C file + function.
Do not duplicate live or archived rows. Do not invent FAIL peels. Do
not enqueue parked D-0006.

## Must-fix (from reviews) — pop first

Written reviews are not theater. Each item is a Keep’d **C-wrong** (JS
contradicts C, not a named omit). After shipping: stamp the cited review
`**Addressed:** D-NNNN` (D-id only), mark the queue line `- [x]`, then
run `node scripts/archive-loop-queue-done.mjs` **in this same commit**.
Do **not** leave `- [x]` in this file. Do **not** put this commit’s hash
in the same SHA (chicken-egg), amend, or make a stamp-only follow-up.
The **next** real commit fills the short hash on the review (and on the
archive row) from `git log -1 --format=%h` of the fix.

Review iterations **prepend** new Keep’d C-wrongs here (not under Open).

## Open (map-driven, after Must-fix is empty)

- [ ] `teleport.c` `vault_tele` `tele()` fallback (named). Not teleds.
- [ ] `mkmaze.c` `inv_pos` / VIBRATING_SQUARE (named from invocation_pos). Not teleds.
- [ ] `region.c` `expire_gas_cloud` dissipation plines (named). Not inside_gas HP.
- [ ] `mklev.c` `fumaroles` `clear_heros_fault` / Norep whoosh (named). Not expire dissipation.
- [ ] `hack.c` walk `in_out_region` (named). Not teleds.
- [ ] `region.c` `create_gas_cloud_selection` (named). Not BFS create.
- [ ] `mon.c` `m_poisongas_ok` mfndpos vamp/eel/breath (named). Not inside_f.
- [ ] `teleport.c` `rloc_to` `set_apparxy` (named). Not vanish-msg.
- [ ] `teleport.c` `rloc_to` `update_monster_region` (named). Not set_apparxy.
- [ ] `teleport.c` `rloc_to` shk `make_angry_shk` (named). Not vanish-msg.
- [ ] `teleport.c` `rloc_to` minvent shop bill (named). Not shk-home.
- [ ] `teleport.c` `rloc_to` trapped `mintrap` (named). Not occupation.

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
