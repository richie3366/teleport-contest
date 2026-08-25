# Loop work queue

Unattended **port** iterations pop the **first unchecked** item, preferring
**Must-fix** over Open. Do not combine items. Do not invent a substitute.
Live file is **unchecked-only**. Done rows live in
`docs/archive/LOOP-QUEUE-DONE.md`.

**Keep 8–12 open `- [ ]` rows** (`check-hot-docs.mjs` reports the count). If Must-fix+Open drops below **8**
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

- [ ] `artifact.c` `invoke_healing` first `You_feel("better.")` gate must use C `Blinded` as 0/1 (`HBlinded && !BBlinded`, `youprop.h:92`) vs `ucreamed`, not the full `HBlinded` word (`artifact.c :1787`). Keep the second `BlindedTimeout` gate. Not ENERGY. Source: reviews/loop-unattended/449-00d5d4d6-arti-invoke-remaining.md
- [ ] `artifact.c` `invoke_untrap` is on the live cost+switch list while `trap.js` `untrap` always returns 0 (`void force`; door/floor disarm deferred). Either port C `untrap(TRUE,0,0,NULL)` success (`:1838–1845`) or keep UNTRAP named (no cost) until the callee can return true. Source: reviews/loop-unattended/449-00d5d4d6-arti-invoke-remaining.md

## Open (map-driven, after Must-fix is empty)

- [ ] `potion.c` `potion_dip` poison-coat / healing unpoison (named). Not unicorn mix.
- [ ] `potion.c` `potion_dip` oil/lamp (named). Not poison-coat.
- [ ] `potion.c` `potion_dip` `poly_obj`/`obj_unpolyable` (named). Not mixtype.
- [ ] `potion.c` `dip_into` (named). Not dodip.
- [ ] `potion.c` `H2Opotion_dip` useeit `ublindf && Blindfolded_only` (named). Not mix.
- [ ] `artifact.c` `doinvoke` TAMING / CHARGE_OBJ / CREATE_PORTAL / BANISH (named). Not HEALING/storm.
- [ ] `mklev.c` minetn-6 load_special (named). Not minetn-1.
- [ ] `mklev.c` minetn-7 load_special (named). Not minetn-6.
- [ ] `dog.c` `mon_arrive` `MIGR_LEFTOVERS` DF_ALL (named). Not stolen_booty.
- [ ] `makemon.c` gnome candle `begin_burn` after `!mpickobj` (named). Not add_to_minv.
- [ ] `makemon.c` `throws_rocks` Sokoban first-try (named). Not gnome candle.

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
