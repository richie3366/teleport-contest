# Rotated from AGENT-LOOP-JOURNAL.md after #1458 D-1147 rndcolor chest_trap gas

## 2026-08-17 04:45 — #1443 D-1135 hcolor Hallucination drinksink

**Objective:** Open queue — `do_name.c` `hcolor` Hallucination
drinksink synonyms (named). Not hliquid.
**C locus:** `do_name.c` `hcolor` 1460–1466 / `hcolors[]`
1441–1458; `fountain.c` `drinksink` case 4 642–643;
`youprop.h` Hallucination 120.
**Change:** port `hcolors[]` SIZE 74 + `hcolor` in `do_name.js`
(Hallu or NULL pref → `rn2_on_display_rng(SIZE)` only; pref is
not a last choice; gameover does not skip). Wire drinksink case 4
Blind ternary to the shared helper. Did not pull sit/apply/pray/
detect/do/wield/read identity stubs or `rndcolor`. Did not rewrite
`hliquid`. Filled D-1134 archive hash `5f55ceba`. Rotated #1428.
Open 8 after archive (no refill). Rule #2: no fs.
**Score:** fortress unchanged (cadence **#1440** **44**/44; next
@**#1445**).
**Verified:** private canary **110**/110; green+strict seed8000/0900;
cohort **21**/21 (0002 drinksink + 0014 fountain + 0383/0399 Hallu
+ 0006/0007/0106/0108/0360/2200/4500/1500/1800/0004/0009/0012/
0030/0116/0060/0367/0398) + strict 0002/0014/0383/0399/0006/0106/
0108/0360/2200/4500/0030. Path public-unhit on Hallu faucet.
**Next:** Open `fountain.c` `mongrantswish` `tmp_at` glyph hide.
Not dowaterdemon makemon.
**Blocked:** none.
