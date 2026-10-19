# Rotated from AGENT-LOOP-JOURNAL.md (6 crumbs; live kept 10)

## 2026-10-19 — D-4089 attrib.c is_innate/innately: JS returned FROM_NONE for any prop missing from its PROP_HFIELD table and read only the flat H-field, so wizard-mode disclosure lost from_what's « from your creature form» / « intrinsically» on flying, swimming, telepathy, fumbling (13 sessions → FULL PASS)

**C locus:** attrib.c is_innate `:880–900` → innately(&u.uprops[propidx].intrinsic) `:864–877` (FROMEXPER/FROMRACE tables, FROMOUTSIDE → FROM_INTR, FROMFORM → FROM_FORM) for every propidx; from_what `:939–948` maps those to « innately» / « intrinsically» / « from your creature form».
**JS:** js/attrib.js (+42/−7); scripts/from-what-creature-form.test.mjs (new: prefix replay to s739 asserts «You were flying from your creature form.» — RED pre-fix «You were flying.», GREEN post-fix).
**Change:** innately(propidx, field) ORs the flat H-field (when mapped) with `u.uprops[propidx].intrinsic`, and consults the role/race tables only when a field exists. is_innate no longer bails on unmapped props. PROP_HFIELD gains the 27 prop→flat pairs in use (FLYING HFlying, SWIMMING HSwimming, FUMBLING HFumbling, TELEPAT HTelepat, … HALLUC_RES HHalluc_resistance), with their const.js imports.
**Verify:** `node scripts/verify.mjs --fn from_what` → PASS syntax (js/attrib.js) · rule2 · reach smoke 24/24 → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS (no hidden movement line: the rows are owned by one_characteristic/chwepon). Direct `hidden-proxy score --ids` over the 22 rows: 13 → FULL PASS, 9 unchanged. `hidden-proxy sweep from_what,is_innate,status_enlightenment` → 725 baseline-PASS sessions re-run, 0 regressed.
**Named:** the 9 unchanged attribute-screen rows: «You hungered rapidly because of your ring of hunger.» missing ×5 (wish-Valkyrie-50152027, worldtour-Wizard-50850040, sweep-Archeologist-51150009, sweep-Healer-50055041, worldtour-Monk-50450080); «You were trapped in a pit {6}.» missing ×2 (sokoban Ranger/Samurai); see-invisible line order ×2 (sweep-Wizard-51150073, trek-Wizard-49950063 / worldtour-Wizard-578301); blind timeout 103 vs 106 (worldtour-Wizard-610136).
**Next:** attribute-screen ring-of-hunger line ×5; pit «{6}» ×2; doclassdisco ×2; reveal_terrain ×2.

## 2026-10-19 — D-4088 insight.c status_enlightenment blind timeout: JS tested `!u.ublindf` for C's `!Blindfolded`, but youprop.h Blindfolded ≡ EBlinded and worn lenses never set it — wizard-mode disclosure lost « (44)» from «You were temporarily blind» (2 sessions → FULL PASS)

**C locus:** insight.c status_enlightenment `:1059–1071` — `if (wizard && (HBlinded == BlindedTimeout && !Blindfolded)) Sprintf(eos(buf), " (%ld)", BlindedTimeout);`; youprop.h:96 `#define Blindfolded EBlinded` (towel/blindfold set [BLINDED].extrinsic, lenses don't).
**JS:** js/invent.js (1 condition + comment); scripts/enlightenment-blind-lenses.test.mjs (new: prefix replay to s1295 asserts «You were temporarily blind (44).» — RED pre-fix, GREEN post-fix).
**Change:** `!(u.EBlinded | 0)`, the same field the arm's own Blind/Blindfolded_only tests already read.
**Verify:** `node scripts/verify.mjs --fn status_enlightenment` → PASS syntax (js/invent.js) · rule2 · reach smoke 24/24 → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS (no hidden movement line: the rows are owned by one_characteristic). Direct `hidden-proxy score --ids` over the 24 attribute-screen rows: 2 → FULL PASS (sweep-Samurai-50055051, sweep-Healer-50950065), 22 unchanged. `hidden-proxy sweep status_enlightenment,enlightenment` → 723 baseline-PASS sessions re-run, 0 regressed.
**Named:** the other 22 attribute-screen rows are other shapes, e.g. sweep-Healer-50055041 (missing «You hungered rapidly because of your ring of hunger.») and sweep-Tourist-95315 («You could swim» missing « from your creature form»).
**Next:** attribute-screen rows: the ring-of-hunger line, from_what «from your creature form»; doclassdisco ×2; reveal_terrain ×2.

## 2026-10-19 — D-4087 read.c seffect_confuse_monster / uhitm.c nohandglow: altfeedback = (Blind || Invisible) read phantom flats (u.Invisible; uhitm's flat-only Invisible_you clone), so a worn-extrinsic invisible hero got the «glow red» texts instead of «tingle» (2 sessions → FULL PASS)

**C locus:** read.c seffect_confuse_monster `:1405` and uhitm.c nohandglow `:6324` `altfeedback = (Blind || Invisible)`; youprop.h:199 Invisible = Invis && !See_invisible (uprops readers). uhitm.c start_engulf/end_engulf `:4936/:4951` read the same Invisible.
**JS:** js/read.js (+3/−4), js/uhitm.js (+6/−11); scripts/confuse-monster-altfeedback.test.mjs (s1272 «Your hands tingle.») and scripts/nohandglow-altfeedback.test.mjs (s1115 «The tingling in your hands») — each RED pre-fix, GREEN post-fix.
**Change:** read.js computes `altfeedback = Blind() || hero_Invisible()` once (invent.js Blind already imported, display.js hero_Invisible added). uhitm.js deletes Invisible_you and calls display.js hero_Invisible at all three sites (nohandglow, start_engulf, end_engulf).
**Verify:** `node scripts/verify.mjs --fn seffect_confuse_monster` → PASS syntax (js/read.js) · rule2 · reach 12/12 → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS; `verify --fn nohandglow` → PASS syntax (js/read.js js/uhitm.js) · reach smoke 24/24 · green · strict · cohort → VERIFY: PASS. Direct `hidden-proxy score --ids`: sweep-Caveman-50055067, sweep-Rogue-620093 → FULL PASS. `hidden-proxy sweep seffect_confuse_monster,doread` and `sweep nohandglow,start_engulf,end_engulf` → 721 baseline-PASS sessions re-run each, 0 regressed.
**Named:** none.
**Next:** one_characteristic ×4 («was 18 (limit:18)»); doclassdisco ×2; reveal_terrain ×2.

## 2026-10-19 — D-4086 region.c show_region: JS painted the gas-cloud '#' with no integer glyph, so glyph_at returned NO_GLYPH and getpos autodescribe named the hero's cloud-covered spot «unexplored area» instead of «fog/vapor cloud» (2 sessions → FULL PASS)

**C locus:** region.c show_region `:732–735` `show_glyph(x, y, reg->glyph)` — reg->glyph is cmap_to_glyph(S_cloud | S_poisoncloud), stored in gbuf; pager.c lookat's cmap arm then describes it with the defsyms explanation «fog/vapor cloud».
**JS:** js/region.js (+8/−4: imports, doc, glyph arg); scripts/show-region-cloud-glyph.test.mjs (new: prefix replay to s603 asserts «fog/vapor cloud» — RED pre-fix «unexplored area», GREEN post-fix).
**Change:** pass `cmap_to_glyph(poison ? S_poisoncloud : S_cloud)` as show_glyph_cell's glyph argument (S_cloud/S_poisoncloud from const.js, cmap_to_glyph from display.js); the painted ch/color are unchanged.
**Verify:** `node scripts/verify.mjs --fn show_region` → PASS syntax (js/region.js) · rule2 · reach smoke 24/24 → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS (no hidden movement line: the rows are owned by lookat). Direct `hidden-proxy score --ids`: extcmd-Healer-51256009, extcmd-Samurai-51257022 → FULL PASS. `hidden-proxy sweep show_region,lookat` → 680 baseline-PASS sessions re-run, 0 regressed.
**Named:** none.
**Next:** doclassdisco ×2; reveal_terrain ×2; doread «Your hands tingle» ×2; one_characteristic ×4 (con/wis «was 18 (limit:18)»).

## 2026-10-19 — D-4085 wintty.c tty_destroy_nhwindow corner menu: JS show_nhw_menu_text ran flush_screen(1) after the docorner erase, so a pending botl repainted the status lines that C leaves blank between final-disclosure container menus (3 sessions → FULL PASS)

**C locus:** end.c container_contents → display_nhwindow + destroy_nhwindow; win/tty/wintty.c tty_destroy_nhwindow `:1999` → erase_menu_or_text → docorner(offx, maxrow+1) `:3650–3720`, whose only bot() is `:3716` when ymax reaches WIN_STATUS. Nothing on this path calls flush_screen.
**JS:** js/pager.js (−1 line, comment rewritten); scripts/corner-menu-dismiss-no-flush.test.mjs (new: prefix replay to s774 asserts the bag title and blank rows 22–23 — RED pre-fix (status painted), GREEN post-fix).
**Change:** drop the corner-arm flush_screen(1). docorner already writes its cells and runs C's own `:3716` bot() when the menu reached the status rows.
**Verify:** `node scripts/verify.mjs --fn show_nhw_menu_text` → PASS syntax (js/pager.js) · rule2 · reach smoke 24/24 → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS (no hidden movement line: the rows are owned by process_menu_window). Full `hidden-proxy score` (864 non-reserve entries): 677/864, PASS→FAIL 0, FAIL→PASS 2 (sweep-Caveman-50350081, sweep-Healer-50055088); reserve-tier sweep-Caveman-610105 scored by id → FULL PASS.
**Named:** none.
**Next:** doclassdisco ×2; reveal_terrain ×2; lookat «fog/vapor cloud» ×2; getobj «dip them» ×2.

## 2026-10-19 — D-4084 zap.c wish_history_menu: the «Wish what?» end_menu prompt row carried no attr, so it drew plain where tty_end_menu paints tty_menu_promptstyle (inverse) (3 sessions → FULL PASS)

**C locus:** zap.c wish_history_menu `:6298` `end_menu(win, "Wish what?")`; win/tty/wintty.c tty_end_menu `:2685–2689` adds the prompt with tty_menu_promptstyle (= menu_headings).
**JS:** js/zap.js (+4/−3); scripts/wish-history-menu-prompt-style.test.mjs (new: prefix replay to s644 asserts `\e[7mWish what?` on row 0 — RED pre-fix (plain), GREEN post-fix).
**Change:** `...menu_prompt_style()` on the prompt row (menu_prompt_style imported from options.js next to select_menu_pick_one).
**Verify:** `node scripts/verify.mjs --fn wish_history_menu` → PASS syntax (js/zap.js) · rule2 · `verify wish_history_menu: 3 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS` · reach smoke 24/24 → REACH-OK · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS. `hidden-proxy sweep wish_history_menu,makewish` → 674 baseline-PASS sessions re-run, 0 regressed.
**Named:** the hard-coded ATR_INVERSE end_menu headers (audit 2915-2923's ~10 rows) still bypass menu_prompt_style; they only differ when menu_headings is not inverse.
**Next:** process_menu_window bag ×3 («Contents of the bag of holding:»); doclassdisco ×2; reveal_terrain ×2.
