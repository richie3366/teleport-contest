# Review 428 — 1003ab88 — zap.c bhito boxlock WAN_OPENING/WAN_LOCKING (D-1467)

## Metadata
- Full / short hash: `1003ab88326910cecc3f5daf29558b97b9feee0b` / `1003ab88`
- Parent: `aed86b60` (audit #1850, reviews **419–427**). This file audits **this SHA only** (first of nine `js/` commits since review **427**). Archive **Addressed:** D-1467 `1003ab88` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 12:11:41 +0200
- D-id: **D-1467**
- Stats: 12 files, +124 / −34 — `js/zap.js` +27 / −7; `js/lock.js` comment (+3); `js/spell.js` comments (+3 / −2).
- Claims to close: Open `zap.c` `bhito` boxlock WAN_OPENING/WAN_LOCKING (named from D-1466 / review **427**). Not doorlock. `reviews/loop-2026-08-15/` has no unpaid boxlock Must-fix.
- JS / map: `zap.js` `bhito`; callee `lock.js` `boxlock` already live for `boxlock_invent` (D-1434 / D-0981). `c-js-map/turns.md`. uchain `unpunish` / poly-arm `reset_pick` named.
- Prior reviews this SHA claims to close: **427** next Open was boxlock after STONE updown; **422** named `bhito` boxlock after OPENING doorlock; **414** named floor boxlock after updown OPENING.

## Intent vs deliverable

Git subject promises: “Match C zap.c bhito boxlock WAN_OPENING/WAN_LOCKING so a floor chest Klunk/Klick instead of skipping boxlock.”

C `zap.c` `bhito` `:2393–2403`: WAN_OPENING / SPE_KNOCK / WAN_LOCKING / SPE_WIZARD_LOCK fall through. `Is_box(obj)` (`obj.h:338` LARGE_BOX or CHEST) → `res = boxlock(obj, otmp)` else `res = 0`; `if (res) learn_it = TRUE` then the function epilogue `:2421–2422` `learnwand`. Callers: `bhitpile` `:2434` (and `bhit` `:4045–4047` when `fhito`); `zap_updown` down epilogue `:3384`. C `lock.c` `boxlock` `:1056–1098`: unlocked → Klunk `olocked=1` `obroken=0` Wizard `lknown`; locked opening → Klick unlock; already-locked locking is a no-op (`res` stays 0); unlocked opening silently clears `obroken`. POLY/SPE_POLYMORPH only `reset_pick` if `gx.xlock.box == obj`.

Old JS: those four otyps hit `bhito` `default` `res=0`. `boxlock` already lived for self-zap `boxlock_invent`. IMMEDIATE OPENING/LOCKING already reached `bhit`/`bhitpile` (D-1450 / D-1452).

The diff **does** import live `boxlock` and add the four-otyp arm with `learn_it` iff Klunk/Klick. It **does not** change `boxlock` bodies (`lock.js` comment only). It **does not** add uchain `unpunish` (`:2183–2188`) or poly-arm `boxlock` (`:2203–2204`). Named. It **does not** add `bhit` doorlock LOCKING. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `bhito` OPENING/KNOCK/LOCKING/WIZARD_LOCK | C `:2393–2403`, **wired this SHA** | |
| `boxlock` | C `lock.c` `:1056–1098`, **imported live** | not a clone this SHA |
| `Is_box` | C `obj.h:338`, **imported live** (`const.js`) | LARGE_BOX/CHEST |
| `learnwand` | C `:123–151`, **imported live** | SPBOOK skip |
| `bhitpile` / `bhit` `fhito` | C `:2434` / `:4045`, **pre-existing** | now reaches boxlock |
| `zap_updown` down `bhitpile` | C `:3384`, **pre-existing** | |
| `boxlock` Soundeffect | C `:1064` / `:1078`, **named omit** | pre-existing |
| `bhito` uchain `unpunish` | C `:2183–2188`, **named omit** | JS still `return 0` for uball/uchain |
| poly-arm `boxlock` `reset_pick` | C `:2203–2204`, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. Grep `FORCE` is `SPE_FORCE_BOLT` in comments. **New gameplay RNG:** none (`boxlock` has no `rn2`/`rnd`). Public fortress does not zap opening/locking at a floor box.

## C ↔ JS fidelity

`bhito` switch now matches C’s combined case list. `Is_box` from `const.js` is `otyp === 214 \|\| 215` (LARGE_BOX/CHEST) — same predicate as `obj.h:338`. Non-box (dagger, sack) → `res=0`, no `learn_it`. Match.

`res = (await boxlock(obj, otmp)) ? 1 : 0` then `if (res) learn_it = true` then `learnwand(otmp)`. C `boxlock` returns 0/1; JS boolean coerced. Match. Fake SPBOOK still skips `makeknown` inside `learnwand` (`:133`). Match.

Callee `boxlock` (pre-existing, not rewritten): unlocked locking → Klunk + `olocked=1` `obroken=0` + Wizard `lknown`; already-locked locking → no-op `res` false; locked opening → Klick unlock + Wizard `lknown`; unlocked opening → silent `obroken=0` and `res` false. Branch order matches `:1061–1088`. No dice. `Role_if(PM_WIZARD)` for `lknown` matches. **Callee is not a stub.** Hallucination check: “Match C boxlock” while **`lock.js` `boxlock` is live** is **not** a dispatch-stub lie.

JS `bhito` still `if (obj === uball \|\| obj === uchain) return 0` **before** the switch. C `:2181–2188` treats uball as `res=0` then **uchain OPENING/KNOCK** as `learn_it=TRUE; unpunish()`. A punished hero zapping knock at the iron ball/chain therefore still skips `unpunish` in JS. That is the named omit, not a silent contradiction introduced as “Match C.” Floor chests never take that arm.

Poly `bhito` still skips `if (Is_box(obj)) boxlock` before `obj_shudders` (`:2203–2204`). Interrupted `#force` on a chest then poly-zap would resume the pick in JS. Named.

`Soundeffect(se_klunk/se_klick)` is absent in the live callee. Named / audio-only; not a Must-fix for Klunk/Klick `pline` + `olocked`.

C `default` is `impossible(...)`; JS `default: res=0`. Pre-existing; these four otyps are no longer in that default.

## Hallucinations / overclaim

Subject says a floor chest Klunk/Klick instead of skipping boxlock. **True** for `Is_box` floor objects on lateral `bhitpile` and down `zap_updown` `bhitpile`. **False until named** for uchain `unpunish`, poly-arm `reset_pick`, `bhit` doorlock LOCKING, `Soundeffect`. Stamping **Addressed:** D-1467 for the **four-otyp `bhito` arm + live `boxlock`** is fair. Do **not** stamp “Match C `unpunish` on uchain.” Do **not** stamp “Match C poly-arm `boxlock`.” Do **not** treat fortress PASS as a chest zap.

`spell.js` comments retag KNOCK/LOCK as D-1467. Comment-only. Honest.

## Density

One `bhito` switch cluster (four C-fallthrough otyps) plus an import of an already-live callee. ~15 lines of real JS. Playbook §2b: tight caller/callee envelope, not a half-of-`zap.c` dump. Did not glue doorlock LOCKING or uchain. Acceptable.

## Branch-by-branch confirm

1. Floor CHEST unlocked + WAN_LOCKING: Klunk, `olocked=1`, `obroken=0`, `learn_it`, `learnwand`. Match `:1063–1072` + `:2401–2402`.
2. Same + SPE_WIZARD_LOCK: same `boxlock`; SPBOOK skips `makeknown`. Match.
3. Floor CHEST locked + WAN_OPENING: Klick, `olocked=0`, learn. Match `:1077–1085`.
4. Same + SPE_KNOCK: Klick; SPBOOK skip makeknown. Match.
5. Already-locked + locking: no-op, `res=0`, no learn. Match `:1073`.
6. Unlocked + opening: silent `obroken=0`, `res=0`, no learn. Match `:1086–1087`.
7. Non-box floor object: `res=0`. Match `:2399–2400`.
8. Wizard vs Tourist `lknown` 1 vs 0. Match `:1068–1071` / `:1082–1085`.
9. Down `zap_updown` still `bhitpile(bhito)` so a chest underfoot is hit. Match `:3384`.
10. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Plain ESM. No hardcoded chest coordinates. `boxlock` is not a glyph stand-in.

## Verification

Journal: private canary **22**/22 (C/JS grep; Rule #2; Klunk lock + Tourist `lknown=0`; Klick unlock + learnwand; SPE_WIZARD_LOCK/SPE_KNOCK skip makeknown; already-locked no-op; silent `obroken` fix; dagger/sack `res=0`; Wizard `lknown=1`; self-hit; `weffects` east + down `bhitpile`; doorlock LOCKING still named); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a session zaps opening/locking at a floor box. I did not re-run the private canary. This audit cadence: full `sessions` at HEAD after all nine SHAs.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The four-otyp arm matches `:2393–2403`. `boxlock` is a C callee, not a diverging clone. uchain / poly-arm / Soundeffect / doorlock LOCKING are **named** omits.

Named omits (map / Open, not Must-fix):

1. `bhito` uchain WAN_OPENING/SPE_KNOCK `unpunish` + `learn_it` — Open already after later SHAs
2. poly-arm `Is_box` `boxlock` `reset_pick` — Open already
3. `bhit` doorlock WAN_LOCKING/SPE_WIZARD_LOCK — shipped later as D-1475
4. `Soundeffect` klunk/klick

Do not Must-fix “dispatch is a stub.” Do not Must-fix “learnwand should fire on already-locked.” Do not Must-fix bags as boxes (`Is_box` is CHEST/LARGE_BOX only).

## Callers / RNG ledger

C callers: `bhitpile` → `bhito`; `bhit` when `fhito`; `zap_updown` down. Flavor/lock arm: no dice. Public fortress does not hit the new arm.

`boxlock` POLY arm is only reached from `bhito` poly (named omit), not from this OPENING/LOCKING case.

Verdict: **ACCEPT-WITH-DEBT**
