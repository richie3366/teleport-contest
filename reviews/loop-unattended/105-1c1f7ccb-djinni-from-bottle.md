# Review 105 — 1c1f7ccb — djinni_from_bottle mongrantswish (D-1144)

## Metadata
- Full / short hash: `1c1f7ccbb69ffbfe11c02b23ed0a30a34ff960cc` / `1c1f7ccb`
- Parent: `bb8585ec` (D-1143). This file audits **this SHA only**. The fix stamped **Addressed:** D-1144 without the short hash; this review commit fills `1c1f7ccb`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 07:14:10 +0200
- D-id: **D-1144**
- Stats: 13 files, +198 / −52 — `js/potion.js` +93 / −8 (`djinni_from_bottle`); `js/apply.js` +15 / −4 (MAGIC_LAMP `#rub` wire); `js/fountain.js` comment only.
- Claims to close: Open queue `potion.c` `djinni_from_bottle` `mongrantswish` (named). Not bottle chance RNG. Review **97** named the djinni caller; **96** next after hcolor. `reviews/loop-2026-08-15/` has no open djinni Must-fix.
- JS / map: `potion.js` `djinni_from_bottle`; `apply.js` `dorub`; existing `fountain.js` `mongrantswish` (D-1136). `c-js-map/turns.md` potion + apply; `data.md` fountain. dodrink smoky `POTION_OCCUPANT_CHANCE`, `ghost_from_bottle`, muse.c monster-quaff, SetVoice, full `mongone` still named.
- Prior reviews this SHA claims to close: **97** named omit `djinni_from_bottle`; D-1143 next-port.

## Intent vs deliverable

Git subject promises: “Match C potion.c djinni_from_bottle so a MAGIC_LAMP #rub releases a djinni (wish/tame/peace/vanish/hostile) after the OIL_LAMP transform, instead of transforming the lamp with no occupant.”

Old JS `dorub` MAGIC_LAMP `spe>0 && !rn2(3)` set `OIL_LAMP` / `spe=0` / `age=rn1(500,1000)` / `makeknown` and skipped C `check_unpaid_usage`, `begin_burn` if lamplit, `djinni_from_bottle`, `update_inventory`. C `apply.c:1816–1831` transforms **before** the djinni (bones: a wish-artifact blast must not leave a MAGIC_LAMP). C `potion.c:2815–2868`: `makemon(PM_DJINNI, ux, uy, MM_NOMSG)`; empty pline if fail; Blind cloud/`a_monnam` vs smell/`Something`; `chance=rn2(5)` then blessed `(4)?rnd(4):0` / cursed `(0)?rn2(4):4`; SetVoice; switch wish `mongrantswish(&mtmp)` / `tamedog(NULL,FALSE)` / peace `set_malign` / vanish `mongone` / hostile `set_malign`.

The diff **does** that MAGIC_LAMP order and ports `djinni_from_bottle`. It does **not** wire dodrink smoky `objdescr_is(..., "smoky") && !rn2(POTION_OCCUPANT_CHANCE(born))` (`potion.c:607–612`). Named. SetVoice named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `djinni_from_bottle` | C callee, **new** | `potion.c:2815–2868` |
| `dorub` MAGIC_LAMP success | C body, **rewritten** | `apply.c:1818–1831` |
| `makemon(..., MM_NOMSG)` | C callee, **imported** | sync `makemon.js` |
| `mongrantswish` | C callee, **imported** | D-1136 hide; D-0472 `mongone` subset |
| `tamedog(mtmp, null, false)` | C callee, **imported** | `dog.js`; givemsg FALSE |
| `set_malign` | C callee, **imported** | peace / hostile arms |
| `mongone` | C callee, **imported** | vanish arm; still D-0472 subset |
| `begin_burn` / `check_unpaid_usage` / `update_inventory` | C callees, **imported** | real |
| `Blind()` | C youprop, **clone** | H\|\|E && !B plus `uroleplay.blind` |
| `verbalize` / `a_monnam` / `Monnam` / `canspotmon` | C callees, **imported** | real |
| SetVoice | C call, **named omit** | soundlib |
| dodrink smoky occupant | C caller, **named omit** | `potion.c:607–612` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** MAGIC_LAMP success now `check_unpaid_usage` (maybe `rn2(3)` Hey/Ahem) + `rn1(500,1000)` (already there) + `makemon` + `rn2(5)` + maybe `rnd(4)` / `rn2(4)`. Fail path still `rn2(2)` smoke. seed0108 `#rub` still matches **without** extra `rn2(5)` — that session never takes `spe>0 && !rn2(3)`. Path **public-unhit** on djinni release.

## Constitution / playbook

Grep of the three JS hunks: no trace-index gates. Contest Rule #2: in-process ESM. Do not transform after the djinni (C bones comment). Do not wire dodrink occupant RNG in this SHA (would consume `rn2(13+2*born)` on every smoky quaff). Do not treat `tamedog` failing `is_demon` as this peel — PM_DJINNI `mflags2` is `M2_NOPOLY|M2_STALK|M2_COLLECT`, **not** `M2_DEMON` (`monsters.h:3188–3194`).

## C ↔ JS fidelity

### MAGIC_LAMP `#rub`

C `apply.c:1816–1831` after `uwep` is the lamp:

```
check_unpaid_usage(uwep, TRUE);
uwep->otyp = OIL_LAMP;
uwep->spe = 0;
uwep->age = rn1(500, 1000);
if (uwep->lamplit) begin_burn(uwep, TRUE);
djinni_from_bottle(uwep);
makeknown(MAGIC_LAMP);
update_inventory();
```

JS `apply.js:5523–5533`: same order on `obj` after `obj === u.uwep`. `makeknown(MAGIC_LAMP)` is the **old** type (match). `begin_burn` is `timeout.js` OIL_LAMP age timer (`already_lit` true). `check_unpaid_usage` / `update_inventory` are real (perm_invent Off no-op, D-1126). Fail `else if (rn2(2))` smoke still uses sticky `u.Blind` — **pre-existing**, not this hunk.

### `djinni_from_bottle` chance remap

C `potion.c:2833–2838`: `chance = rn2(5)` then blessed `(chance==4) ? rnd(4) : 0` else cursed `(chance==0) ? rn2(4) : 4`. JS identical. `rng.js` `rnd(x)` is **1..x**, `rn2` is **0..x-1**, matching C `rnd.c`. Blessed 80% wish (0) / 5% each other; cursed 80% hostile (4); uncursed 20% each. Match call-for-call.

Empty `makemon`: `"It turns out to be empty."` then return — no `rn2(5)`. Match.

### Blind plines

C `!Blind`: cloud + `a_monnam` emerges, `Monnam` speaks. C Blind: `You("smell acrid fumes.")` + `pline("%s speaks.", Something)`. `Something` is `c_common_strings.c_Something` (literal), not Hallu `rndmonnam`. JS hardcoded `"Something speaks."` matches. JS `Blind()` is `(H||E)&&!B` plus `uroleplay.blind` short-circuit (Eyes + PermaBlind would smell in JS and see in C). Named youprop clone; public-unhit.

### switch arms

| chance | C | JS |
|--------|---|-----|
| 0 | verbalize wish; `mongrantswish(&mtmp)` | **same**; JS helper takes the object, not `**`; caller does not use `mtmp` after (C `*monp=0` unused) |
| 1 | verbalize; `tamedog(mtmp, NULL, FALSE)` | **same** `givemsg=false`; `initedog` tames (djinni not `is_demon`) |
| 2 | verbalize; `mpeaceful=TRUE`; `set_malign` | **same** |
| 3 | verbalize; `canspotmon` vanish pline; `mongone` | **same** |
| default | verbalize; `mpeaceful=FALSE`; `set_malign` | **same** |

`mongrantswish` is D-1136: gbuf `disp_*` `tmp_at(DISP_ALWAYS)` around `makewish`, D-0472 splice+newsym not full `mdrop_special_objs`/`m_detach`. Named on that helper since review **97**. Wish arm is **not** a stub of `djinni_from_bottle`.

`tamedog` JS still omits C `is_demon && !is_demon(youmonst)` / `is_covetous` (map on `dog.js`). Djinni has no `M2_DEMON`, so case 1 **does** tame. Do not Must-fix a demon gate this peel does not need.

SetVoice `SetVoice(mtmp, 0, 80, 0)` before switch: named soundlib omit, no RNG.

JS remap + switch (HEAD `potion.js:972–1007`):

```
let chance = rn2(5);
if (obj?.blessed) chance = (chance === 4) ? rnd(4) : 0;
else if (obj?.cursed) chance = (chance === 0) ? rn2(4) : 4;
switch (chance) {
case 0: await verbalize('I am in your debt.  I will grant one wish!');
        await mongrantswish(mtmp); break;
case 1: await verbalize('Thank you for freeing me!');
        await tamedog(mtmp, null, false); break;
/* 2 peace set_malign; 3 vanish mongone; default hostile */
}
```

Double spaces in the verbalize strings match C. `verbalize` wraps in quotes (`display.js:3462–3464`) like C `pline.c` verbalize. `obj?.blessed` / `obj?.cursed` — C always has `obj` from the lamp/bottle; a null `obj` would skip remap (uncursed 20% table). `#rub` passes the transformed lamp.

`tamedog(..., false)` skips the `"seems more amiable"` pline (`dog.c:1169–1173` when `givemsg && !mpeaceful && canspotmon`). Fresh makemon djinni is typically hostile until this call; C would print that then tame. JS `tamedog` already skips that pline (`dog.js:360–363` “canspotmon deferred”). Named on `tamedog`, not a miss of the Open `djinni_from_bottle` **dispatch**. Case 1 still `initedog` / `mtame`.

dodrink (`potion.js:1089`) still “milky/smoky occupant paths deferred (no RNG when descr unmatched)” — so a smoky potion does **not** consume `rn2(13+2*born)`. Named; public suite has no smoky quaff that would desync.

## Hallucinations / overclaim

D-log / CURRENT / subject say MAGIC_LAMP `#rub` releases a djinni (wish/tame/peace/vanish/hostile) after the OIL_LAMP transform, instead of transforming with no occupant. That is the hunk: unpaid, transform, `begin_burn`, `djinni_from_bottle`, `makeknown`, `update_inventory`, plus the chance remap + switch. They **name** dodrink smoky occupant chance. Stamping **Addressed:** D-1144 is fair for the Open **function + MAGIC_LAMP caller**. Fill hash `1c1f7ccb` in this commit. Do **not** stamp it as “smoky potions now spawn djinn” or “Match C full `mongone`.” This is **not** “Match C dispatch, callee is a stub”: `djinni_from_bottle` is new C; `mongrantswish` / `tamedog` / `makemon` / `begin_burn` are real callees.

## Density

C `djinni_from_bottle` plus its MAGIC_LAMP `#rub` caller (transform-before-release). ~90 JS lines. One family. Related deferral (dodrink occupant) named, not a second hypothesis. Not “finish potion.c.”

## Verification

Journal: private canary **33**/33 (source order; BUC remap spec; MAGIC_LAMP transform-before-djinni; dodrink occupant still deferred; empty occupied makemon); green+strict seed8000/0900; cohort **24**/24 including 0108 `#rub` magic lamp + 0105 lamp + 0006 demon + 0014 fountain + 0002 drinksink + 0007 snakes + 2200/4500/0360/0030 + strict 8000/0900/0108/0006/0014/0002/0105/2200/4500/0360/0030/0004. Path **public-unhit** on djinni release. This audit’s full `sessions` (cadence **#1455**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — 0108 still full RNG (no extra `rn2(5)`).

C read of `potion.c:601–614, 2794–2868`, `apply.c:1816–1842`, `dog.c:1143–1259`, `monsters.h:3188–3194`, `youprop.h:103`; JS `potion.js:940–1008`, `apply.js:5522–5539`, `fountain.js:537–565`, `dog.js:341–432`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| MAGIC_LAMP spe>0 !rn2(3) | transform then djinni | **same** |
| blessed rn2 0–3 / 4 | wish / rnd(4) | **same** |
| wish | `mongrantswish` hide+makewish | **same** (full mongone named) |
| tame | `tamedog` NULL FALSE | **same** (djinni not M2_DEMON) |
| dodrink smoky | occupant `rn2` then djinni | **named skip** (no extra rn2) |

## Actionable C-wrongs

None that Must-fix this next iter. The Open function + MAGIC_LAMP wire match `potion.c:2815–2868` / `apply.c:1818–1831`. `mongrantswish` and `tamedog` are real C callees.

Named omits / do-nots (map / Open, not Must-fix):

1. dodrink smoky / milky `POTION_OCCUPANT_CHANCE` (`potion.c:601–612`). Not this peel.
2. SetVoice; muse.c smoky monster-quaff; `ghost_from_bottle`.
3. Full `mongone` (`mdrop_special_objs` / `discard_minvent` / `m_detach`) — D-0472 / review **97**.
4. `Blind()` `uroleplay.blind` vs C `!BBlinded`. Map, not this Must-fix.
5. Do not transform after the djinni. Do not consume occupant `rn2` on unmatched descr. Do not restore the lamp-only `#rub`. Next Open: `fountain.c` Excalibur `:441` `update_inventory`. Not artidisco save.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: MAGIC_LAMP `#rub` now transforms to OIL_LAMP then runs a real `djinni_from_bottle` (BUC `rn2(5)` remap, wish/`tamedog`/peace/vanish/hostile) matching C, while dodrink smoky occupant chance stays a named skip.
- Must-fix stays empty for this SHA; next port pops Open `fountain.c` Excalibur `:441` `update_inventory`. Not artidisco save.
