# Review 41 — 0a4a5df3 — `u_entered_shop` deserted / angry / Invis / doorway (D-1080)

## Metadata
- Full / short hash: `0a4a5df3eb8e053f6b8a9f074d2dc3dcd157d8b4` / `0a4a5df3`
- Parent: `d7d679c1` (D-1079; review **40**). JS-touching since last `reviews/loop-unattended/` file: D-1078, D-1079, **this SHA**. This file audits **this SHA only**. Docs-only companion: this audit’s cadence **#1375** score refresh (same iteration).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 13:44:31 +0200
- D-id: **D-1080**
- Stats: 11 files, +321 / −75 — `js/shk.js` +249 / −~40 (`deserted_shop`, `empty_shops`, Invis/angry/surcharge/robbed, doorway `dochug`, `carrying` walks `game.invent`). Live JS is that function family, not a new file.
- Claims to close: Open queue `shk.c` `u_entered_shop` deserted / angry / Invis / pickaxe doorway (named D-0307). Stamped **Addressed:** D-1080 on the archive row **without** the short hash (chicken-egg). This review commit fills `0a4a5df3`. `reviews/loop-2026-08-15/` has no open shop-welcome Must-fix.
- JS / map: `shk.js` `u_entered_shop` / `deserted_shop` / `carrying`. `c-js-map/data.md` and `absent.md` name D-1080; SetVoice / Soundeffect / Hallu shkname still named.
- Prior reviews this SHA claims to close: D-0307 leftover named omit (deserted/angry/Invis/doorway), not a written-review Must-fix.

## Intent vs deliverable

Git subject promises: “Match C u_entered_shop so deserted, angry, Invis, and doorway-block arms run.” Body: JS was silently clearing `ushops` and skipping those welcomes plus pickaxe/steed/Fast extra `dochug`; C emits them from `shk.c` after the peaceful Hello path.

The queue line was that remaining envelope after D-0307’s peaceful Welcome, not `shk_move` Fast+floor pickaxe, not `pick_pick`, not unpaid leave verbalize.

The diff **does** that envelope: `deserted_shop` counts floor mons (`sensemon` / `canseemon` + `M_AP_NOTHING|MONSTER`) then Blind-forces “untended”; `empty_shops` latch; null-keeper path also requires `in_rooms` change; `!inhishop` deserted without C `bill_p` poison (named); Invis early return; ANGRY / surcharge / robbed / Hello `visitct++`; doorway pick-axe/mattock count-not-quan, steed `y_monnam`, Fast+`sobj_at` silent extra `dochug`. `carrying()` walks `game.invent` (JS analog of C `gi.invent` nobj) instead of empty `game.u.invent`.

It does **not** port SetVoice / Soundeffect robbed mutter / Hallu `shkname`. Named. It does **not** set `bill_p = (bill_x *)-1000` on `!inhishop`. Named. `shk_move` Fast + floor pickaxe stays named (different function). `record_achievement(ACH_SHOP)` was already present (header “ACH_SHOP mapseen” is mapseen, not this call).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `deserted_shop` | C body, **new** | `shk.c:723–747` |
| `u_entered_shop` remaining arms | C body, **retouched** | `shk.c:751–917` |
| `empty_shops` | C `static char[5]` analog | module `let` string; `includes` vs `strchr` |
| `hero_invis` | **clone** of `youprop.h` `Invis` | extra sticky `u.Invis` if H/E unset (same shape as `display.js` `hero_Invis`) |
| `hero_blind` | **clone** of `youprop.h` `Blind` | `(H\|\|E)&&!B` — matches C macro |
| `hero_blind_telepat` | **clone** of `Blind_telepat` | extra `\|\| u.Blind_telepat` vs C `HTelepat\|\|ETelepat` |
| `hero_detect_monsters` | **clone** of `Detect_monsters` | extra sticky `u.Detect_monsters` vs C `H\|\|E` |
| `hero_deaf` | **clone** of `Deaf` | extra sticky `u.Deaf`; C is `H\|\|E\|\|uroleplay.deaf` |
| `sobj_at_shk` | **clone** of `mkobj.c` `sobj_at` | `objects_at` + `nexthere` |
| `carrying` / `count_otyp_from` | **clone** of `invent.c` `carrying` + nobj walk | invent array analog; not quan |
| `in_rooms` | C callee, **imported** | `hack.js`; string `!==` vs C static-buf **pointer** compare |
| `inside_shop` | C callee, local | doorway vs teleported-in |
| `dochug` | C callee, **dynamic import** | `monmove.js:1676` — real body, not a stub |
| `mbodypart` / `y_monnam` / `makeknown` / `Fast` | C callees | surcharge EYE; steed; mattock ID; `attrib.js` Fast |
| `ANGRYTEXTS` | C `angrytexts[]` | `quite upset` / `ticked off` / `furious`; `rn2(3)` = `ROLL_FROM` |
| SetVoice / Soundeffect / Hallu shkname | C other, **named omit** | audio / appearance |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the `js/shk.js` hunk: no trace-index gates, no recorded coordinates, no `fastforward` burns. `PICK_AXE` / `DWARVISH_MATTOCK` are `objectNames.indexOf`, not seed-shaped otyps. Contest Rule #2: no Node builtins. `dochug` extra move can consume RNG; path public-unhit.

## C ↔ JS fidelity

### `deserted_shop` — count, Blind, strings; zero RNG

C `shk.c:723–747`: room `&svr.rooms[*enterstring - ROOMOFFSET]`; for each cell skip `u_at`; `m_at` → `++n`; `sensemon || ((M_AP_NOTHING || M_AP_MONSTER) && canseemon)` → `++m`; `if (Blind && !(Blind_telepat || Detect_monsters)) ++n`; pline seems-to-be vs is, deserted vs untended.

JS `273–300`: same loops; `M_AP_TYPE` from `const.js` returns `m_ap_type` **without** C `M_AP_TYPMASK` (`monst.h:69–73`). This port stores type in the low field (pre-existing helper). Mimic-as-object increments `n` not `m` — matches C. `hero_blind` is C `Blind`. `hero_blind_telepat` / `hero_detect_monsters` OR sticky flags C does not have: if only sticky telepat/detect is set, JS skips the Blind `++n` and C does not → more specific “is untended” vs C “seems to be”. Same youprop-clone class as `display.js`. Named, not a missing arm. No `rn2` in this function. Match for the C control structure.

### Null keeper / `!inhishop` — latch + `in_rooms`

C `762–781`: no `shkp`: `!strchr(empty_shops, *enterstring) && (in_rooms(ux,uy,SHOPBASE) != in_rooms(ux0,uy0,SHOPBASE))` then `deserted_shop`; `Strcpy(empty_shops, u.ushops)`; `ushops[0]=0`. `!inhishop`: poison `bill_p`, deserted if not already in latch, same copy/clear. **No** `in_rooms` test on the `!inhishop` path.

JS `316–334`: same split (`in_rooms` only on null keeper). `bill_p` poison named omit. `empty_shops.includes(charAt(0))` vs `strchr`. `empty_shops = u.ushops` vs `Strcpy` into `char[5]` (C truncates at 4+NUL; JS copies the whole string). Analog for normal `ushops` length.

**C-wrong family (named, not Must-fix):** C `in_rooms` returns a pointer into a **static** `buf[5]` (`hack.c:3498–3559`). Two sequential calls overwrite the same buffer; `p1 != p2` compares **pointers** (how far `--ptr` walked), not shop-letter identity. Two one-letter shops (A vs B) both return `&buf[3]` → C **skips** deserted; JS string `!==` **fires**. Corridor (empty, `&buf[4]`) vs shop (one letter, `&buf[3]`) differs in both — the public empty-shop walk-in matches. Adjacent empty shops are the diverge. Faithful next peel would compare returned-string **length** (C pointer distance), not identity. Do **not** steal eat.c for this.

### Invis / angry / surcharge / robbed / Hello — RNG only Deaf-angry `rn2(3)`

C `799–853`: `Invis` → sense pline; `!Deaf && !muteshk` verbalize else stands-firm; **return** (no doorway). Else `ANGRY` / `surcharge` / `robbed` / Hello. Hello `visitct++` in **both** hearing and Deaf branches. Angry Deaf: `ROLL_FROM(angrytexts)` = `angrytexts[rn2(3)]`. Robbed hearing does **not** check `muteshk`. `muteshk || following` returns before all of this (no doorway either).

JS `350–413`: `hero_invis` / `hero_deaf` / `ANGRY` / `eshkp.surcharge` / `robbed` / else Hello. Strings match (including `pline_The` → `"The atmosphere at …"`). `visitct++` only in Hello, both arms. `ANGRYTEXTS` is C’s three strings; `rn2(ANGRYTEXTS.length)` is `ROLL_FROM`. SetVoice skipped (named). Invis **returns** before doorway — D-log canary “Invis+pick no leave-outside” is C.

`hero_invis` (`235–239`): C `Invis` is `((HInvis||EInvis)&&!BInvis)` (`youprop.h:198`) with **no** sticky `u.Invis`. JS: if sticky `u.Invis` and H/E unset, **return true even when `BInvis`**. Cloak path writes `EInvis` → second line matches C. Sticky-only leftover without H/E over-accepts vs C (and ignores block). Same helper as `display.js:1845–1848` / `trap.js:3412–3413`. After D-1070 this is a known youprop-clone class. Peeling `shk.js` alone would split Invis from display. Named; do not Must-fix a shk-only sticky delete this next iter.

`Fast()` from `attrib.js` is `(HFast||EFast)` plus `uprops[FAST]` intrinsic/extrinsic. C `Fast` is `HFast||EFast` only (`youprop.h:376`). Pre-existing shared helper, not a new diverging clone invented here. Doorway Fast+floor pickaxe uses it. Named with the youprop bag.

### Doorway — pick / mattock / steed / Fast `sobj_at` + `dochug`

C `854–915`: only if `!inside_shop(u.ux,u.uy)`. `not_upset = !surcharge`. `carrying(PICK_AXE)` / `DWARVISH_MATTOCK`. Both → `"digging tool"` cnt=2. Pick only: walk `nobj` counting further `PICK_AXE` slots (not `quan`). Mattock only: same + `!Blind` `makeknown`. Else steed `y_monnam`. Else `Fast && (sobj_at(PICK_AXE)||sobj_at(MATTOCK))` (silent). `should_block` → `dochug(shkp)`.

JS `415–469`: `inside_shop` returns `NO_ROOM` on edge (doorway) like C `shk.c` / `hack.c` analog. `count_otyp_from` starts after `indexOf(first)` — C starts at `pick->nobj`, not including the first slot twice; `cnt` starts at 1. Match while `first` is in `game.invent`. `carrying` now walks `game.invent` (C `gi.invent`). Old `game.u.invent` was the wrong chain — that fix is C, not a new wrong. `plur(cnt)` is C `hacklib.c` `"s"` when `n!==1`. `sobj_at_shk` is floor `nexthere`. `dochug` is `monmove.js` C body (WAITFORU, disturb, `rn2` recovery, `rloc`, movement) — **not** a stub. Extra shk turn is C. Match for the claimed doorway envelope.

`mbodypart(shkp, EYE)` via `polyself.js` is a real C callee (surcharge verbalize). `y_monnam` imported from `do_name.js`. Classify: C callees, not sit-style name clones.

### Visitct / customer / muteshk (pre-existing, still C)

C `787–797`: if `(!visitct || *customer) && strncmpi(customer, plname, PL_NSIZ)` then reset visitct/following, copy name, `pacify_shk(TRUE)`. JS `340–348`: `(!visitct || cust) && cust.toLowerCase() !== plname.toLowerCase().slice(0, 32)` — analog of `strncmpi` / `PL_NSIZ`. First visit (`visitct==0`) pacifies even with empty customer. This SHA did not invent that gate; it still runs before muteshk/Invis. `muteshk || following` returns **before** Invis and **before** doorway — C `796–797`. An angry following shk does not extra-`dochug` on the threshold. Match.

`inside_shop` (`shk.js:497–505`): `roomno < ROOMOFFSET || loc.edge || !IS_SHOP` → `NO_ROOM`. Doorway cells are typically `edge`, so `!inside_shop` is true and the block arms run. Teleport into the shop interior: `inside_shop` truthy → skip block (“can't do anything about blocking if teleported in”). C same comment at `shk.c:854`.

`ANGRY(shkp)` is `!mpeaceful` (`shk.js:117–119`). C `ANGRY(mon)` is that. Deaf angry still rolls `rn2(3)` even when `muteshk` (the else of `!Deaf && !muteshk`). Hearing angry does not roll. Match. Robbed hearing: mutter without `muteshk` check (C `833`: `if (!Deaf)` only). JS `if (!deaf)`. Match.

### `carrying` nobj vs array

C `invent.c:1495–1504` walks `gi.invent` via `nobj`. JS invent is an array (`game.invent`). The old helper walked `game.u?.invent` (usually unset) so pickaxe doorway never saw a carried pick. Switching to `game.invent` is the C analog already used everywhere else in `shk.js` (`money_cnt`, unpaid). `count_otyp_from` does not use `quan`: a stack of 5 pick-axes is one slot, `cnt=1`, `plur` → `"pick-axe"` not `"pick-axes"`. C same (the while walks further **objects**, not quantity). Both tools → `cnt=2` and `"digging tool"` regardless of stacks. Match.

## Hallucinations / overclaim

“Match C u_entered_shop so deserted, angry, Invis, and doorway-block arms run” is **true for those arms and for `deserted_shop`.** `dochug` is not a stub. `carrying` is not a no-op. This is **not** “Match C dispatch, callee is a stub.”

It is **not** true that `hero_invis` is exactly C `youprop.h` `Invis` (sticky + BInvis hole), that null-keeper `in_rooms !==` is C’s static-buf pointer compare, or that SetVoice/Soundeffect/Hallu shkname run.

Stamping **Addressed:** D-1080 is fair for the Open line. Fill hash `0a4a5df3` in this commit.

## Density (§2b)

One Open cluster: the rest of C `u_entered_shop` + `deserted_shop` as the queue named them together. ~250 executable lines — upper end of 50–300, but it is one C function family, not “finish `shk.c`” and not four unrelated peels. `shk_move` Fast left named on purpose.

## Verification

Journal: private canary 17 cases (deserted/latch/Blind-untended; peaceful `visitct++`; Invis+pick no leave-outside; angry/Deaf `rn2`; surcharge eye; robbed; pick-axe/pick-axes; Fast floor silent; muteshk/following skip; `!inhishop` deserted); green+strict seed8000/0900; cohort **41**/41 (incl. 0030/0116/0361/1150) + strict 0030/0116/0361/0014/4500/0360/2200. New arms **public-unhit** except peaceful welcome (D-0307). Cadence **#1375** **44**/44 Scr **11405**/11405 RNG **100%** speed `32+0.27/turn` (R² 0.87) after this SHA.

C read of `shk.c:139–141`/`723–917`, `youprop.h:103`/`125`/`156`/`190`/`198`/`376`, `hack.c:3498–3559`, `invent.c:1495–1504`, `hack.h` `ROLL_FROM`, `monst.h` `M_AP_TYPE`; JS `shk.js:232–470`/`781–788`/`2685–2705`, `hack.js:621–669`, `attrib.js:746–751`, `monmove.js:1676+`, `display.js:1845–1848`; hunk grepped FORCE/fs/seed.

Private canary vs C (journal):

| Path | C | JS after |
|------|---|---------|
| empty shop, first enter, corridor→shop | `deserted_shop` once | **once** (latch) |
| same empty shop again | latch skip | **skip** |
| Blind, no telepat/detect, one visible mon | “seems to be untended” (`++n`) | **same** if H/E Blind |
| peaceful first Hello | `visitct` 0→1, no “again” | **same** |
| Invis + pick in doorway | sense + verbalize; **no** leave-outside | **return before block** |
| angry + Deaf | `rn2(3)` angrytexts | **`rn2(3)`** |
| surcharge hearing | `mbodypart` EYE | **dynamic import** |
| pick + mattock | “digging tool” cnt=2 | **same** |
| Fast + floor pick, no wielded | silent `dochug` | **`dochug` real** |
| `muteshk` / `following` | no dialog, no doorway | **early return** |

Public 0116/0030/0361 exercise tended shops (D-0307 Hello), not deserted/Invis/pickaxe `dochug`. Admit **public-unhit** for the new arms.

`empty_shops` is module-level, so it persists across entries like C `static`. A new game / level change does not reset it unless `u.ushops` copy overwrites it on the empty path. C’s static also survives until overwritten. Not a per-level leak that this SHA invented. `u.ushops = ''` after the copy matches `ushops[0]='\0'`.

`hero_blind` does **not** OR `uroleplay.blind` / `u.ublind` (display.js `hero_Blind` does). C `Blind` macro also does not; roleplay blind is expected to set `HBlinded` at init. Closer to C than display. Keep it.

## Actionable C-wrongs

None that Must-fix this next iter (do not steal eat.c `cprefx`). Remaining clone debt, queueable later as Open / a youprop cluster, not a one-file sticky peel:

1. **`hero_invis` / `hero_blind_telepat` / `hero_detect_monsters` / `hero_deaf` sticky ORs** vs C `youprop.h` (Invis sticky ignores `BInvis`). Same class as `display.js` `hero_Invis`. If peeled, take display+trap+shk together; do **not** shk-only.
2. **Null-keeper `in_rooms !==`** is JS string identity; C compares static-buf pointers (length). Corridor→empty shop matches; shop-letter identity does not.
3. SetVoice / Soundeffect / Hallu shkname; `bill_p` poison; `shk_move` Fast + floor pickaxe; `pick_pick`.

Do not restore silent `ushops=''` on missing keeper. Do not skip Invis return before doorway. Do not walk `game.u.invent` in `carrying`. Do not count `quan` for pick-axe plur. Do not put trailing `confdir` inside shared `getdir`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- Score: **7.5 / 10**
- One sentence: deserted / Invis / angry / surcharge / robbed / pickaxe-steed-Fast doorway `dochug` now run like `shk.c`, while youprop helpers still OR sticky flags and null-keeper `in_rooms` is string identity rather than C’s static-buf pointer compare.
- Must-fix stays empty; next port pops Open `eat.c` `cprefx` `revive_corpse` after rider lifesave.
