# Review 11 — 4e55ff2f — pickup_object telekinesis (D-1050)

## Metadata
- Full / short hash: `4e55ff2fe6659ee7ab19a4516e4568e10059273c` / `4e55ff2f`
- Parent: `bf265dfc` (reviews 09/10; queued this Must-fix)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 00:57:19 +0200
- D-id: **D-1050**
- Stats: 12 files, +433 / −74 — `js/pickup.js` +351 / −19, `js/invent.js` +9
- Claims to close: D-1022 **risk 6** (`pickup_object` did `void telekinesis`). Stamped **Addressed:** D-1050 `4e55ff2f` on that review in the same SHA.
- JS / map: `pickup.js` + `invent.js` `max_capacity`; `c-js-map/turns.md` pickup/invent rows. Cadence still **#1320** **44**/44 (this review is not a score refresh).

## Intent vs deliverable

Git subject promises: “Match C pickup_object telekinesis so whip pull-in silently refuses extra encumbrance and skips corpse-touch.”

D-1022 risk 6: C whip `pickup_object(otmp, 1L, TRUE)` (`apply.c:3052`) vs grapple `FALSE` (`apply.c:3820`). JS discarded the boolean. The flag must (1) skip cockatrice touch, (2) change rider/scare verbs, (3) make `lift_object` return 0 with no ynq when encumbrance would rise.

The diff **does** thread `remotely = !!telekinesis` through corpse / scare / `lift_object` / `carry_count` verbs, port floor `carry_count` + `lift_object`, and add `hack.c` `max_capacity`.

It does **not** port Sokoban boulder HAND wrap, LOADSTONE/giant-boulder weight override, container `delta_cwt`, shop `no_charge` `merge_choice`, `fix_ghostly_obj`, or Death/Pestilence revive suffixes. D-log names those. The subject does not claim `out_container` (still always-lifts).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `pickup_object` | C function, retouched | `pickup.c:1803–1888`; flag no longer voided |
| `lift_object` | C function, new in JS | `pickup.c:1705–1795`; floor path; Sokoban/LOADSTONE named omit |
| `carry_count` | C function, new in JS | `pickup.c:1570–1701`; container NULL only |
| `fatal_corpse_mistake` | C function (static) | `pickup.c:285–299` |
| `rider_corpse_revival` | C function | `pickup.c:302–313` + cloned `revive_corpse` floor plines |
| `u_safe_from_fatal_corpse` | C function | `pickup.c:273–281` |
| `max_capacity` | C callee, new export | `hack.c:4391–4396` in `invent.js` |
| `GOLD_WT` / `GOLD_CAPACITY` | C macros | `pickup.c:60–62` |
| `money_cnt_invent` | **clone** of `hack.c:4514` `money_cnt` | **sums** all COIN_CLASS; C returns the **first** gold stack |
| `merge_choice_invent` | **clone** of `invent.c:775–810` | shop `no_charge` / `inhishop` named omit |
| `otense_pickup` | **clone** of `otense` | `are` / `turn` only |
| `flags_pickup_burden` | adapter | default `MOD_ENCUMBER` ≡ C `initoptions_init` (`options.c:7207`) |
| `Stone_resistance_hero` | clone of `youprop.h:63–65` | H \|\| E; extra flat `u.Stone_resistance` OR is the JS mirror other files already use |
| `inv_cnt` | imported C callee | `steal.js` (C `hack.c:4496`; GOLD_SYM vs COIN_CLASS — pre-existing) |
| `yn_function` | imported C callee | `getline.js`; C `ynq` ≡ `yn_function(..., 'q', TRUE)` (`hack.h:1330`) |
| `touch_artifact` | imported, still partial | blast deferred; refuse-0 arm is live |
| `revive` | imported C callee | `zap.js`; C `rider` calls `revive_corpse` → `revive` |
| `polymon` / `instapetrify` / `trycall` / `exercise` | imported C callees | dynamic `polyself` / `trap` / `do_name` / `attrib` |
| `ysimple_name` | pre-existing clone | engulfer worn message |
| Sokoban / LOADSTONE override / `useupf` shop / `out_container` | named omit | not this subject |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates in the JS hunk. `J_DIAG` is jump trajectory in apply, not this SHA. Rule #2 clean. Frozen contracts untouched.

## C ↔ JS fidelity

### Callers — whip TRUE, grapple FALSE

C `apply.c:3052` (lev/steed/fly wrap of a floor object): `rnl(6) || pickup_object(otmp, 1L, TRUE) < 1` then slips-free. JS `apply.js:3681`: `rnl(6) || (await pickup_object(otmp, 1, true)) < 1`. Same RNG, same TRUE.

C `apply.c:3820` (grapple “object” menu arm): `pickup_object(otmp, 1L, FALSE)`. JS `apply.js:4275`: `pickup_object(otmp, 1, false)`. Same FALSE.

Whip snatch-into-invent (`apply.c:3208–3231`) still uses `hold_another_object`, not `pickup_object`. Out of this SHA. Not a hallucination that whip always goes through telekinesis.

### `pickup_object` — branch order, then the flag

C `pickup.c:1810–1888` order:

1. `quan < count` → `impossible` + return 0
2. `!Blind` `observe_object`
3. `obj == uchain` → 0
4. `OBJ_MINVENT` + `owornmask` + `engulfing_u(ocarry)` → can't pick
5. artifact `!touch_artifact` → 0
6. CORPSE → `fatal_corpse_mistake` \|\| `rider_corpse_revival` → −1
7. else SCR_SCARE_MONSTER → `carry_count(..., FALSE)` even on telekinesis pickup; split; unbless / spe=1 / dust
8. `lift_object(obj, NULL, &count, telekinesis)`; `res <= 0` return
9. gold `disp.botl`; split unless LOADSTONE; `pick_obj`; `mrg_to_wielded` if merged to `uwep`; `pickup_prinv`; clear `mrg_to_wielded`; ghostly; return 1

JS `pickup.js:566–629` after this SHA: same 1–9 except (a) silent return 0 instead of `impossible`, (b) `if (!count) count = quan` for JS callers that pass 0 (`pickup.js:840` autopick), (c) gold also sets `flags.botl`, (d) **no** `fix_ghostly_obj` (named). C menu/autopick fills `quan` (`pickup.c:784–785`, `879–880` `lcount == -1` → `quan`). The 0-fill is an adapter, not a C `count==0` path. Whip/grapple pass `1`. Fine.

Scare `carry_count` **always FALSE** (`pickup.c:1839–1841`): JS comment and `carry_count(obj, count, false, scareWts)` match. Dust verb `raise` vs `pick` (`pickup.c:1854–1856`) uses `remotely`. Match.

C dust uses `useupf(obj, obj->quan)` (`pickup.c:1858`; `invent.c:4763–4783` shop `addtobill`/`stolen_value` then `delobj`). JS `delobj(obj)`. Shop-floor scare dust does not bill. Named on other `useupf` stubs (`eat.js` “shop bill deferred”); this SHA did not name it on the scare arm. Dead for public traces. Map, not Must-fix — the telekinesis **verb** is C; the floor-useup callee is older shop debt.

LOADSTONE never splits (`pickup.c:1876–1877`): JS now skips split too. Previously always split. That is a C fix, not a new omit.

`mrg_to_wielded` (`pickup.c:1881–1886`): JS now sets/clears it. Match. Ghostly still skipped (named).

**No `rn2`/`rnd`/`rn1`/`d` in `pickup_object` itself.** Callee RNG: `touch_artifact` `!rn2(4)` on badalign (pre-existing partial); `revive` bag-of-holding `rn2(40)`; `wipe` not here; ynq is input, not RNG.

### `fatal_corpse_mistake` / `u_safe` — remotely short-circuit

C `pickup.c:287–288`: `u_safe_from_fatal_corpse(obj, st_all) || remotely` → FALSE (not fatal). Tests: gloves / not-corpse / `!touch_petrifies` / `Stone_resistance` (`youprop.h:65` `H \|\| E`). JS `st_gloves|st_corpse|st_petrifies|st_resists` same bits, same any-test-enough. Whip TRUE never petrifies. Grapple FALSE does. That is the Must-fix.

Poly-to-stone-golem then `display_nhwindow(WIN_MESSAGE, FALSE)` (`pickup.c:290–292`): JS `polymon` + `flush_topl_more`. Same `--More--` idea. `poly_when_stoned(data, mvitals)` matches C’s `G_GENOD` check.

Message: C `corpse_xname(..., CXN_SINGULAR|CXN_ARTICLE)` + `instapetrify(killer_xname)`. JS `an(cxname_singular)` + `instapetrify(cxname_singular)`. Killer-string polish named elsewhere. Live petrify path is grapple/hand, not whip TRUE.

### `rider_corpse_revival` — remotely still revives

C `pickup.c:305–312`: rider corpse → pline acquisition vs touch → `revive_corpse` → `exercise(A_WIS, FALSE)` → TRUE.

C `revive_corpse` (`do.c:2150–2179`) already prints floor “rises from the dead” / “disappears” (Death/Pestilence/Famine suffixes; chewed `Adjmonnam`). JS calls `zap.js` `revive` (no those plines) then **clones** the OBJ_FLOOR arm without the suffixes. Named. `apply.js` already has a `revive_corpse` helper with the same clone; this SHA inlined another copy instead of importing it. Process smell, same messages as the apply clone. Remotely still revives. Match for the Must-fix.

### `carry_count` — floor, gold macros, verbs

C `GOLD_WT(n) = ((n)+50)/100`; `GOLD_CAPACITY(w,n) = (w)*-100 - ((n)+50) - 1` (`pickup.c:60–62`). JS `Math.trunc` / the same formula. Match.

C `max_capacity`: `inv_weight() - 2*gw.wc` (`hack.c:4391–4396`). JS `inv_weight() - 2*(game._weight_cap || weight_cap())`. `inv_weight` already stores `_weight_cap`. Match.

C `money_cnt` returns the **first** `COIN_CLASS` quan (`hack.c:4514–4518`). JS sums every coin stack. Gold merges in `addinv`; live path is one stack. Clone that would diverge only if invent held two unmerged gold objects. Not Must-fix.

Floor `!container`: no `delta_cwt`. Early `wt < 0` return `count`. Gold `GOLD_CAPACITY` arm; non-gold `qq = 1..count` weight loop; singleton `qq = 0`. Partial: `You can only acquire|lift one|some of the X lying here.` Zero: `There is|are X here, but you cannot acquire|lift any more` (or empty-invent “too heavy”). JS floor strings match. Container “in the bag” / verb `carry` named omit — `pickup_object` always `container NULL` like C (`pickup.c:1869`).

**No RNG in `carry_count`.**

### `lift_object` — telekinesis silent refuse

C `pickup.c:1713–1794`:

1. Sokoban boulder → HAND wrap, −1 **(JS omits — named)**
2. LOADSTONE or giant-boulder → lift regardless if slot/`merge_choice`/`carrying`; else “too much stuff” **(JS omits — named)**
3. `carry_count` → count < 1 → result −1
4. non-coin + `inv_cnt(FALSE) >= invlet_basic` + `!merge_choice` → knapsack; optional `(except gold)` if `nxtobj` GOLD **(JS omits the parenthetical)**
5. else result 1; `prev = max(near_capacity(), flags.pickup_burden)`; `next = calc_capacity(new-old)`; if `next > prev`: telekinesis → **result 0**; else ynq Continue? with overload/near/moderate/slight prefix; q→−1 n→0 y→1; `clear_nhwindow(WIN_MESSAGE)`
6. scare + result≤0 + !container → `spe = 0`

JS: 3–6 on the floor path. `flags_pickup_burden` uses numeric `flags.pickup_burden` or `MOD_ENCUMBER`. C default is stressed (`options.c:7207`). JS options table still stores the string `'stressed'`; `typeof v === 'number'` fails → MOD. Same default. A parsed-numeric option would work; a live string `'unencumbered'` would still clamp to MOD. Options parser debt, not this Must-fix.

C `ynq` = `yn_function(query, ynqchars, 'q', TRUE)` (`hack.h:1330`). JS `yn_function(qbuf, 'ynq', 'q')`. Default **q** matches. Fourth arg (save in do-again) is JS-wide omit.

Telekinesis TRUE + `next > prev` → 0, no prompt, object stays on floor. That is D-1022 risk 6. Grapple FALSE prompts. Match.

JS returns −1 immediately when `carry_count < 1`, so scare `spe = 0` on a failed second `carry_count` is skipped. Scare already ran its own `carry_count` successfully before `lift_object`. Dead.

`invlet_basic = 52` (`hack.h:584`). JS `INVLET_BASIC = 52`. `inv_cnt(false)` imported. Match for slot math if gold uses COIN_CLASS (JS) vs GOLD_SYM invlet (C) — gold is both.

## Hallucinations / overclaim

“Match C pickup_object telekinesis so whip pull-in silently refuses extra encumbrance and skips corpse-touch” is **true for the flag and for the floor lift/carry envelope.** This is **not** “Match C dispatch, callee is a stub.” `lift_object` / `carry_count` / `fatal_corpse_mistake` are real ports, not `void` leftovers.

It is **not** “Match C `lift_object` in full.” Sokoban / LOADSTONE override still contradict C on those objects. Stamping D-1022 risk 6 **Addressed** is fair for the boolean. Risk 7 is D-1051 (next SHA).

Cadence **#1320** 44/44 does not prove a whip wrap or skilled grapple snag. Journal admits public **unhit**. Private “light TRUE lifts; heavy TRUE refuses; cockatrice TRUE no petrify” is the right falsifier.

## Density (§2b)

One Must-fix: honor `telekinesis` in the C callee family (`pickup_object` + `lift_object` + `carry_count` + corpse/scare). `js/pickup.js` **+351** sits on the fat side of 50–300, but it is one locus family, not “finish pickup.c” (container/`out_container` left named). Not a one-`if` peel. Extra local clones (`money_cnt` sum, `merge_choice` without shop, second `revive_corpse` floor arm) are the density smell — still one cluster.

## Verification

Journal: green+strict PASS; apply/pickup cohort **10**/10 (seed0361 Scr **366**/366; seed2200 **230**/230; seed0012 **308**/308). Private node: light TRUE lifts; heavy TRUE refuses and leaves floor; cockatrice TRUE skips petrify. Path **unhit**. Fortress unchanged (cadence still **#1320**). Adequate: fortress plus private flag checks. Public traces never wrap a floor object with a bullwhip.

## Actionable C-wrongs

None that belong on Must-fix from **this** SHA. D-1022 risk 6 (`void telekinesis`) is actually closed on whip TRUE / grapple FALSE.

Named omits (map, not queue): Sokoban boulder HAND wrap; LOADSTONE/giant-boulder always-lift; knapsack `(except gold)`; shop `merge_choice` `no_charge`; scare dust `useupf` billing; `fix_ghostly_obj`; Death/Pestilence/Famine revive suffixes; `out_container` still always-lifts; `money_cnt` first-stack vs sum; ynq do-again bit.

Do not restore `void telekinesis`. Do not pop tut-1 while Must-fix is open. Remaining Must-fix below this review is cursed-lamp `make_glib` `HGlib|EGlib`, then `cry_sound` `msound`, `get_obj_location` flags.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: whip TRUE now silent-refuses extra encumbrance and skips corpse-touch like `pickup.c:1761–1762` / `287–288`, and grapple FALSE still ynqs; Sokoban/LOADSTONE override stays a named `lift_object` hole, not a voided flag.
