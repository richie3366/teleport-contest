# Rotated journal crumbs — 2026-08-15 #1302

Moved from `docs/AGENT-LOOP-JOURNAL.md` (keep live tail ≤15).

## 2026-08-15 13:35 — D-1019 sellobj BSS sell_response / robbed

**Objective:** C-wrong Keep — D-0994 defaulted `sell_response` to
`'a'` (auto-sell) and subtracted `offer` from `robbed`.
**C locus:** `shk.c` `sellobj`/`sellobj_state`; BSS `'\0'` queries;
`robbed -= (offer<0)` then clear; `nyaq` not stored.
**Change:** BSS `null`; robbed C precedence; nyaq local; credit
`ynaq` default `'y'`. Rule #2: no fs.
**Score:** last full `sessions` still **D-1015** 44/44 (cadence @#1290).
**Verified:** green+strict PASS; shop/throw cohort **12**/12;
private node (BSS null; robbed 100+gold 50 → 0). Robbed / first-sale
query likely **unhit** by public traces.
**Next:** D-1020 `setnotworn` pointer-walk + leave-tutorial.
**Blocked:** none.

## 2026-08-15 13:24 — D-1018 use_pick_axe cmdq wield re-apply

**Objective:** C-wrong Keep — D-0951 queued `{typ:'ec'}` after
wield; `getobj_apply` ignored CMDQ_KEY; canned boolean TIME
did not set `context.move`.
**C locus:** `dig.c` `use_pick_axe` `cmdq_add_ec(doapply)` +
`cmdq_add_key(invlet)`; `cmd.c` rhack `(res & ECMD_TIME)`;
`invent.c` getobj CMDQ_KEY.
**Change:** queue `doapply` fn + charCode KEY; getobj_apply pops
KEY (SUGGEST|DOWNPLAY); rhack canned TIME/CANCEL bits.
Rule #2: no fs.
**Score:** last full `sessions` still **D-1015** 44/44 (cadence @#1290).
**Verified:** green+strict PASS; apply/cmdq/dig cohort **15**/15;
private node falsifier (queue shape + canned getobj + TIME bit).
Wield-reapply path likely **unhit** by public traces.
**Next:** D-1019 `sellobj` default `'a'` / `robbed`.
**Blocked:** none.
