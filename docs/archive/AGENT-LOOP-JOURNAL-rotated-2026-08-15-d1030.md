# Rotated from AGENT-LOOP-JOURNAL.md (#1299 / D-1030)

## 2026-07-23 17:13 — D-1015 tutorial setnotworn extrinsics

**Objective:** seed0009 Scr 72/73 (user-reported; was HEAD FAIL).
**C locus:** `nhlua.c` `nhl_gamestate(false)` `setnotworn` +
`worn.c` extrinsic clear.
**Change:** tutorial invent stash via real `setnotworn`→`setworn`
(clear STEALTH `EStealth` from elven cloak) — D-1015.
**Score:** **44**/44 Scr **11405**/11405 RNG **100%** speed
`33+0.27/turn`.
**Verified:** seed0009 PASS; green+strict; cohort 9/9; full
`sessions` 44/44. Rule #2: no fs.
**Next:** absent.md thin (scroll/vault/potions); or whip/grapple/
jelly/use_pole; or pleased pat_on_head gifts.
**Blocked:** none.

## 2026-08-15 13:50 — D-1020 setnotworn pointer-walk + leave-tutorial

**Objective:** C-wrong Keep — D-1015 `setnotworn` used
`setworn(null, owornmask)`; leave-tutorial invent restore absent.
**C locus:** `worn.c` `setnotworn` pointer-equal `worn[]`;
`nhlua.c` `nhl_gamestate(true)` useupall/`addinv_nomerge`/`setworn`;
`do.c` `tutorial(FALSE)`.
**Change:** pointer-walk + confer/w_blocks/artifact; stash prepend +
`_lastinvnr=51`; leave restores invent+re-wear; apply.js shares
export. Rule #2: no fs.
**Score:** last full `sessions` still **D-1015** 44/44 (cadence @#1290).
**Verified:** green+strict PASS; tutorial/wear cohort **11**/11
(seed0009 Scr **73**/73); private node (stash-flag no-op vs real
slot clears EStealth). Leave path likely **unhit** by public traces.
**Next:** apply.js whip/grapple/jelly/`use_pole`.
**Blocked:** none.
