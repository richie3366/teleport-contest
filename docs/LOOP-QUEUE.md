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

- [ ] `steal.c` `remove_worn_item` armor `*_off` / `unpunish` / `setnotworn` pointer-walk (named from sit take_gold D-1049).
- [ ] `sit.c` `rndcurse` `shieldeff` (named omit). Not update_inventory / hcolor.
- [ ] `makemon.c` `m_initweap` `ptr.msound` for MS_GUARDIAN / MS_PRIEST (still mndx after D-1079). Not peace_minded.
- [ ] `dbridge.c` `is_pool` / `is_moat` DRAWBRIDGE_UP + `DB_MOAT` (named from D-1077). Not `is_lava`.
- [ ] `teleport.c` `goodpos` must call `is_pool()` / `is_lava()` not `IS_POOL` / `IS_LAVA` macros (named from D-1077 review 38).
- [ ] `makemon.c` S_ORC / S_ELF / unicorn mlet peace override after `m_initweap` (named omit on makemon row).
- [ ] `dogmove.c` pal/target tests must compare numeric `ptr.msound` not string `'MS_LEADER'` (named from D-1053 review 14).
- [ ] `makemon.c` `m_initweap` MS_NEMESIS mitem `ptr.msound` not `urole.neminum` (named). Not S_ORC peace.
- [ ] `potion.c` `split_mon` trap rust / `minliquid` / uhitm AD_COLD callers (named from D-1078). Not sit clone_mon.
- [ ] `fountain.c` `dryup` wizard yn (named). Not angry_guards.
- [ ] `mon.c` `kill_eggs` after genocide (named from sit D-1034). Not seffects SCR_GENOCIDE.
- [ ] `read.c` `seffects` SCR_GENOCIDE (named from sit). Not kill_eggs.

## Parked (do not pop)

- D-0006 seed1800 pet movement — needs C state/candidate capture.
