# Review 02 — eb3469ae — thitmonst weapon hit-vs-miss (D-1041)

## Metadata
- Full / short hash: `eb3469ae4ab475a014058d5d356b939675c73e73` / `eb3469ae`
- Parent: `da0fabe3` (docs stamp of D-1040)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-15 21:05:00 +0200
- D-id: **D-1041**
- Stats: 14 files, +382 / −77 — `js/dothrow.js` +288, `js/uhitm.js` +32, `js/apply.js` +8
- Claims to close: D-1022 **risk 4** (pole/grapple `thitmonst` always `tmiss`). Stamped **Addressed** in this commit (`reviews/loop-2026-08-15/D-1022-7f952620-whip-grapple-pole.md`).
- JS / map: `js/dothrow.js`, `js/uhitm.js` (`passive_obj` export + APPLIED first-hit / thrown hit pline); turns/debt/absent; cadence still #1305

## Intent vs deliverable

Git subject promises: “Match C thitmonst weapon hit-vs-miss so pole/grapple apply no longer always tmiss.”

The previous `thitmonst` computed `dieroll = rnd(20)` then **skipped** the WEAPON/weptool/GEM arm and fell through to pie / food / else-`tmiss`. A pole “hit” never rolled tmp against that d20, never called `hmon`, never did APPLIED-miss `wakeup`.

The diff **does** port that envelope: tmp (Luck/DEX/`distmin`/bow gloves/`omon_adj`/elf-orc), unicorn gem intercept **before** dieroll, weapon/weptool/GEM kicked/ammo/thrown/applied bonuses, `tmp >= dieroll` → `hmon` + `exercise` + mulch + `passive_obj`, else `tmiss` + APPLIED `wakeup`. Pole/grapple `uwep` is `HMON_APPLIED`. That always-`tmiss` C-wrong is gone.

It also adds a swarm of **local clones** (`Luck`, `is_weptool`, `is_axe`, `is_spear`, `is_blade`, `is_sword`, `uslinging`, `throwing_weapon`, `omon_adj`, `helpless_thit`, `special_obj_hits_leader`) and calls two **partial C callees** (`find_mac`, `should_mulch_missile`) as if they were the C functions. D-log lists `find_mac` in the tmp formula and does **not** name the worn-armor peel or the mulch `rnl` vs `rn2` bug. That is the overclaim.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `Luck` | clone of `you.h:464` | `uluck + moreluck` — matches the macro |
| `is_weptool` | clone of `obj.h:249` | TOOL && `oc_skill != P_NONE`, **plus** name fallback (PICK_AXE / GRAPPLING_HOOK / UNICORN_HORN / AKLYS / BULLWHIP). `weapon.js` already has the C macro without names. Object table has `oc_skill` for those weptools (`P_FLAIL` on the hook) — fallback is dead for them; AKLYS/BULLWHIP are WEAPON_CLASS so the TOOL gate excludes them |
| `is_axe` / `is_spear` / `is_blade` / `is_sword` | clones of `obj.h` | match |
| `uslinging` | clone of wield/hack | `uwep` skill `P_SLING` |
| `throwing_weapon` | clone of `dothrow.c:1430–1438` | missile/spear/pierce-blade/hammer/aklys — match |
| `omon_adj` | clone of C `omon_adj` | size/sleep/immobile + `!rn2(10)` unfreeze when `mon_notices` — RNG order matches; `hitval` is a C callee |
| `helpless_thit` | clone of `monst.h` `helpless` | `msleeping \|\| !mcanmove` |
| `special_obj_hits_leader` | clone of `dothrow.c:1969–1972` | **diverges** (see fidelity) |
| `thitmonst` | C function, expanded | `dothrow.c:2011–2304` |
| `find_mac` | imported C callee | **partial** — `mhitm.js` comment “no worn armor peel yet” |
| `weapon_hit_bonus` / `hitval` / `spec_abon` / `should_mulch_missile` / `exercise` / `hmon` / `passive_obj` | C callees | `should_mulch` and `passive_obj` and `find_mac` are incomplete |
| `hmon` first_weapon_hit / msg_hit | retouched C function | APPLIED first-hit; thrown-style pline |

No new `FORCE` / `DIAG` / `getRngLog` / `fs` / `node:` / seed gates. `FORCEBUNGLE` is a pre-existing trap flag in this file, not this hunk.

## C ↔ JS fidelity

### tmp + dieroll — call-for-call until `find_mac`

C `dothrow.c:2036–2152` (no RNG except `omon_adj`’s optional `rn2(10)`, then unicorn, then leader, then `dieroll = rnd(20)`):

```
tmp = -1 + Luck + find_mac(mon) + u.uhitinc + maybe_polyd(youmonst.mlevel, u.ulevel)
DEX 4/6/8/14 steps
disttmp = 3 - distmin(...); clamp -4
bow gloves: power -2, fumble -3, leather/dex 0
tmp += omon_adj(mon, obj, TRUE)    // may rn2(10)
elf vs orc +1
engulfing +1000
unicorn GEM intercept (before dieroll)
leader intercept if hmode != APPLIED
dieroll = rnd(20)
```

JS `dothrow.js:472–535` copies that order, including DEX steps, dist clamp, glove switch (unknown glove types: C `impossible`, JS silent — no RNG), `omon_adj(..., true)`, `maybe_polyd` via `Upolyd`, guaranteed_hit +1000, unicorn before dieroll, leader before dieroll, then `rnd(20)`.

**`find_mac` is not C.** C `worn.c:717–735` starts from `mon->data->ac` then walks `minvent` where `owornmask & misc_worn_check`, subtracting `ARM_BONUS(obj)` (and a flat −2 for AMULET_OF_GUARDING), then caps `AC_MAX`. JS `mhitm.js:534–538` returns **base `data.ac` only**. An orc in a helmet is easier to pole/throw-hit in JS than in C. D-log lists `find_mac` as part of the ported tmp. That is **Match C tmp while the callee is a stub**.

### Weapon / weptool / GEM arm — structure matches; mulch RNG does not

C `dothrow.c:2154–2231`:

```
if WEAPON || is_weptool || GEM:
  KICKED: tmp -= ammo?5:3
  else if ammo:
    no launcher: -4
    else: spe - greatest_erosion(uwep) + weapon_hit_bonus(uwep) + spec_abon + elf/samurai bow
  else: // thrown non-ammo or applied pole/grapnel
    boomerang +4 / throwing_weapon +2 / obj==thrownobj -2
    weapon_hit_bonus(obj)
  if tmp >= dieroll:
    APPLIED: weaphit++
    hmon(...); cutworm deferred; exercise(A_DEX)
    wasthrown && !thrownobj: return 1
    should_mulch_missile: check_shop_obj; obfree; return 1
    passive_obj
  else:
    tmiss(TRUE); APPLIED wakeup
```

JS copies the kicked/ammo/applied split. Applied pole that is not a throwing-weapon does **not** take the −2 (C `obj == gt.thrownobj` is false for `uwep`; JS `hmode === HMON_THROWN` is false for APPLIED). Good.

`greatest_erosion` is inlined as `Math.max(oeroded, oeroded2)` — same as `obj.h:126–128`.

**`should_mulch_missile` now runs on every surviving weapon hit** (it did not, while the arm was skipped). C `dothrow.c:1992`:

```
if (obj->blessed && (svc.context.mon_moving ? !rn2(3) : !rnl(4)))
    broken = FALSE;
```

JS `weapon.js:190–192` uses `!rn2(4)` on the hero path. `rnl` is luck-biased (`js/rng.js:77–91`) and **logs a different stream**. Blessed ammo/missile hits consume the wrong RNG word and a different break chance. Polearms/grapples are not ammo/missiles so they skip this roll — the Must-fix was pole combat, but this commit **enabled the whole WEAPON/weptool/GEM arm**, including throws. Public traces are unhit; the first blessed-dart hit will diverge.

Mulch success: C `obfree` + `check_shop_obj`; JS `quan=0` / `OBJ_FREE`. D-log names `check_shop_obj` on mulch. Object lifetime is a named omit, not a second queue family.

`cutworm` named omit. `passive_obj` is a real function that still burns `rn2(6)` on AD_FIRE/ACID then **skips** `erode_obj` — partial callee, named in `uhitm.js`, not claimed complete.

### Pie / venom / food after the weapon return

C never reaches pie/potion/food if the object was WEAPON/weptool/GEM — the `if` is exclusive. JS now `return false` at the end of that arm (`dothrow.js:590`). Before this commit, a dagger fell through to pie (false) then food then `tmiss` **without** the tmp-vs-d20 hit path. The extra `return` is what makes the C `if/else if` chain hold.

Pie/egg/venom (`dothrow.c:2256–2260`): `guaranteed_hit || ACURR(A_DEX) > rnd(25)` then `hmon` return 1. JS used to pass `HMON_THROWN` always; this commit passes `hmode`. A kicked cream pie now reaches `hmon` as `HMON_KICKED`. That is a C fix, not a regression. Potion arm still deferred: a thrown potion that fails the DEX gate falls through; one that would pass still does not call `potionhit` — named omit. Food `tamedog` / fail `tmiss(FALSE)` unchanged.

`passive_obj` (`uhitm.js:817–860`): C callee, exported so `thitmonst` can call it. Burns `rn2(6)` on AD_FIRE/ACID then skips `erode_obj`. Hitting a rust monster with a pole now consumes that `rn2` (C does too) without the erode side effect. Named omit, not a Must-fix family.

### Unicorn / leader — control flow copied; clones incomplete

Unicorn GEM before dieroll: helpless `tmiss(FALSE)` return 0; tame catch-and-drop return 0; else catch then `gem_accept`. JS prints the catch and **returns false without `mpickobj` / luck**. Named omit (`gem_accept`). Helpless/tame returns match C (caller places the gem).

Leader: C `hmode != HMON_APPLIED && special_obj_hits_leader`. Macro `dothrow.c:1969–1972`:

```
(is_quest_artifact(obj) || objects[].oc_unique
 || (FAKE_AMULET_OF_YENDOR && !known))
 && mon->m_id == quest_status.leader_m_id
```

JS `dothrow.js:445–452`:

```
qart = obj.oartifact && obj.oartifact === game.u?.questarti
```

`questarti` lives on **`game.urole`**, not `game.u` (see `u_init.js` / `detect.js` `is_quest_artifact`). `game.u.questarti` is unset. Quest artifacts that are not `oc_unique` never take this intercept; they fall into the **weapon hit-vs-miss arm**. C never rolls tmp-vs-d20 against the leader for those objects (`hmode != APPLIED`). The body (catch / `finish_quest` / `addinv`) is named-deferred; the **predicate clone is a C-wrong**, not a named omit.

Pole/grapple are APPLIED so they skip this arm on both sides. The clone still ships in the function this commit claimed to match.

### `hmon` APPLIED — first-hit gate and hit pline

C `uhitm.c:1764` stores `hmd.thrown = thrown` as the **HMON enum**. `hmon_hitmon_msg_hit` `uhitm.c:1646–1647`: `if (hmd->thrown) hit(mshot_xname(obj), ...)`. `HMON_MELEE` is 0; APPLIED is 3 (truthy). Pole hits use the projectile `hit()` line, not “You hit”. JS `else if (thrown)` with `HMON_APPLIED === 3` matches that boolean use of the enum.

C `zap.c:3556–3567` `hit()`: verbose name if `flags.verbose && (cansee(bhitpos) \|\| canspotmon \|\| engulfing_u)`. JS omits `engulfing_u`. `use_pole` returns before combat when swallowed, so pole is safe; thrown-while-swallowed is a named omit. `mshot_xname` named omit (`xname`).

C first_weapon_hit `uhitm.c:1835–1844`: `WEAPON_CLASS \|\| is_weptool(obj)` and `HMON_MELEE \|\| HMON_APPLIED`. JS added APPLIED (good) but kept `oc_skill != null`. `P_NONE` is 0, and `0 != null` is true, so a TOOL with `oc_skill == P_NONE` would log first-weapon-hit in JS and not in C. Polearms are WEAPON_CLASS so the pole path is fine. The edited condition is still not `is_weptool`. Map, not Must-fix (does not change pole tmp/d20).

## Hallucinations / overclaim

“Match C thitmonst weapon hit-vs-miss” is **true for the branch envelope and for stopping always-`tmiss`**. It is **false** as a claim that tmp is C `find_mac`, that mulch is C `rnl`, or that the leader predicate is C `is_quest_artifact`. This is the playbook case: Match C **function** while **callees / clones** stub or diverge.

D-log deferred list is honest about gem_accept, leader **body**, ball/boulder, potionhit, swallow vanish, cutworm, shop mulch, mshot. It undersells `find_mac` armor, `rnl` vs `rn2`, and `u.questarti`.

Stamping D-1022 risk 4 **Addressed** is fair for always-`tmiss`. It is not fair to treat tmp vs armored monsters as done.

## Density (§2b)

One C function (`thitmonst` weapon arm) plus the `hmon` APPLIED message/first-hit that the arm now reaches. ~250 lines. Right size. Related clones in the same file are the envelope, not a second subsystem. Too small would have been APPLIED-only without thrown/kicked; they ported the whole `if` C uses. That is correct §2b. The quality issue is callee fidelity, not dump width.

## Verification

Journal: green+strict PASS; throw/kick/combat cohort **10**/10 (seed0361 Scr 366/366; seed1800 throw; seed0060 kick); private node **10**/10 (AC hit/miss; APPLIED wakeup; frozen `rn2(10)` before dieroll; pie DEX; armor skip; hook weptool). Public **unhit**. Private AC tests that do not dress the monster in `minvent` armor cannot see the `find_mac` peel. Cohort throw that never hits a blessed missile cannot see `rnl`. Fortress holding is not proof of this body — admitted, but the private suite also missed the diverging callees.

## Actionable C-wrongs

1. **`find_mac` must walk monster `minvent` worn `ARM_BONUS` / amulet of guarding and cap `AC_MAX` like C `worn.c:717–735`.** Today thitmonst tmp uses base `data.ac` only. One port iter: that function, then re-run throw/combat cohort. Source: `reviews/loop-unattended/02-eb3469ae-thitmonst-hit-vs-miss.md`.
   **Addressed:** D-1042 `19e907f5`.

2. **`should_mulch_missile` hero blessed save must be `!rnl(4)` not `!rn2(4)` like C `dothrow.c:1992`.** Now live on every surviving ammo/missile hit from this envelope. `rnl` already exists in `js/rng.js`. Source: same review.
   **Addressed:** D-1043 `d3fac215`.

3. **`special_obj_hits_leader` must use C `is_quest_artifact` (`oartifact == urole.questarti`), not `game.u.questarti`.** Unique/`oc_unique` still gates; quest artifacts that are not `oc_unique` currently fall into weapon hit-vs-miss against the leader. Source: same review.
   **Addressed:** D-1044.

Named omits (map, not Must-fix): `gem_accept` luck/`mpickobj`; leader catch/`finish_quest`/`addinv` body; iron ball/boulder hit-vs-miss; `potionhit`; swallow vanish body; `cutworm`; `check_shop_obj`/`obfree` on mulch; `mshot_xname`; `hit()` `engulfing_u`; `passive_obj` `erode_obj`; first_weapon_hit `is_weptool` vs `oc_skill != null`.

## Verdict

- Verdict: **QUALITY-RISK**
- Score: **6 / 10**
- One sentence: the WEAPON/weptool/GEM arm is a real C copy (order, `omon_adj` `rn2(10)`, APPLIED `weaphit`/`wakeup`, `hmon` call) so poles no longer always `tmiss`, but tmp still uses stub `find_mac`, mulch burns `rn2` instead of `rnl`, and the new leader clone looks at the wrong `questarti` field.
