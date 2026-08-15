# Unattended loop reviews

Written by review iterations (`scripts/agent-port-loop.review.prompt.md`).
English. One file per JS-touching commit (or a tight SHA group).
QUALITY-RISK / REJECT must prepend `docs/LOOP-QUEUE.md` **Must-fix**
in the same iteration (commit + push). The next port pops that first.

Catch-up of `reviews/loop-2026-08-15/` (unpaid C-wrongs) lives in
`LOOP-QUEUE.md` Must-fix until those rows are checked off.

| File | Commit | D-id | Verdict |
|------|--------|------|---------|
| [01-12458fe9-pole-glyph-targeting.md](./01-12458fe9-pole-glyph-targeting.md) | `12458fe9` | D-1040 pole `glyph_at` | **ACCEPT-WITH-DEBT** |
| [02-eb3469ae-thitmonst-hit-vs-miss.md](./02-eb3469ae-thitmonst-hit-vs-miss.md) | `eb3469ae` | D-1041 `thitmonst` hit-vs-miss | **QUALITY-RISK** |
| [03-19e907f5-find-mac-arm-bonus.md](./03-19e907f5-find-mac-arm-bonus.md) | `19e907f5` | D-1042 `find_mac` ARM_BONUS | **ACCEPT** |
| [04-d3fac215-mulch-rnl.md](./04-d3fac215-mulch-rnl.md) | `d3fac215` | D-1043 mulch hero `rnl(4)` | **ACCEPT** |
| [05-d9febc3c-leader-questarti.md](./05-d9febc3c-leader-questarti.md) | `d9febc3c` | D-1044 `urole.questarti` | **ACCEPT** |
| [06-e8884a53-whip-yname-amonnam.md](./06-e8884a53-whip-yname-amonnam.md) | `e8884a53` | D-1045 `yname`/`Amonnam`/`mbodypart` | **ACCEPT** |
| [07-3371ddf0-light-cocktail-optr.md](./07-3371ddf0-light-cocktail-optr.md) | `3371ddf0` | D-1046 `light_cocktail` `**optr` | **ACCEPT** |
| [08-2ca2ccd7-consume-obj-charge.md](./08-2ca2ccd7-consume-obj-charge.md) | `2ca2ccd7` | D-1047 `consume_obj_charge` unpaid | **ACCEPT** |
| [09-e395bb74-vlad-hconfusion-only.md](./09-e395bb74-vlad-hconfusion-only.md) | `e395bb74` | D-1048 Vlad case 10 `HConfusion` only | **ACCEPT** |
| [10-9e24f61a-take-gold-remove-worn.md](./10-9e24f61a-take-gold-remove-worn.md) | `9e24f61a` | D-1049 `take_gold` `remove_worn_item` | **ACCEPT** |
| [11-4e55ff2f-pickup-telekinesis.md](./11-4e55ff2f-pickup-telekinesis.md) | `4e55ff2f` | D-1050 `pickup_object` telekinesis | **ACCEPT** |
| [12-7e389050-wipe-engr-tmp-at.md](./12-7e389050-wipe-engr-tmp-at.md) | `7e389050` | D-1051 `u_wipe_engr` / S_goodpos `tmp_at` | **ACCEPT** |
| [13-1710bd41-glib-timeout.md](./13-1710bd41-glib-timeout.md) | `1710bd41` | D-1052 cursed-lamp `Glib` TIMEOUT | **ACCEPT** |
| [14-178d60f2-msound-cry.md](./14-178d60f2-msound-cry.md) | `178d60f2` | D-1053 `cry_sound` `msound` | **ACCEPT** |
