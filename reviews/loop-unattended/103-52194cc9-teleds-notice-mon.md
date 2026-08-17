# Review 103 — 52194cc9 — teleds notice_mon_off / notice_all_mons (D-1142)

## Metadata
- Full / short hash: `52194cc96fe0660b2b614305b77d369a41770b8d` / `52194cc9`
- Parent: `4d71520e` (D-1141). This file audits **this SHA only**. Archive row **Addressed:** D-1142 `52194cc9` was filled by D-1143.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 06:49:22 +0200
- D-id: **D-1142**
- Stats: 10 files, +227 / −20 — `js/hack.js` +127 / −1 (`a11y` + `notice_mon` / `notice_all_mons`); `js/teleport.js` +25 / −8 (off before `vision_recalc`, on + catch-up after invocation).
- Claims to close: Open queue `teleport.c` `teleds` `notice_mon_off` / `notice_all_mons` (named). Not invocation. Review **102** / **101** named this wrap. `reviews/loop-2026-08-15/` has no open notice_mon Must-fix.
- JS / map: `hack.js` `notice_mon_off`/`on`/`notice_mon`/`notice_all_mons`; `teleport.js` `teleds`. `c-js-map/turns.md` teleport + hack. `vision.c` `vision_recalc` caller, `goto_level` / `newgame` / mapping / wizcmds / save / `postmov`, optlist `spot_monsters` → `a11y.mon_notices` still named.
- Prior reviews this SHA claims to close: **101** named omit 4; **102** next-port.

## Intent vs deliverable

Git subject promises: “Match C teleport.c teleds so vision_recalc is wrapped with notice_mon_off/on and catch-up notice_all_mons(TRUE) after invocation_message (distu-sorted You see/notice), instead of skipping the a11y notice wrap.”

C `teleport.c:539–541, 570–571`: `nomul(0); notice_mon_off(); vision_recalc(0);` … materialize / `switch_terrain` / vault / `spoteffects` / `invocation_message` … `notice_mon_on(); notice_all_mons(TRUE);`. C `flag.h:233–237` increments `a11y.mon_notices_blocked`; `hack.c:1708–1783` emits You see/notice once per `mspotted` when `a11y.mon_notices && !blocked`, hiders-as-furniture/object skipped, `qsort` by `distu`.

The diff **does** that wrap and ports the three helpers. Default `mon_notices` Off matches C optlist `opt_in` Off. It does **not** make `vision.c` `vision_recalc` call `notice_all_mons(TRUE)` — so the off around JS `vision_recalc` suppresses nothing today; the catch-up is the live deliverable. Named. It does **not** wire `options.js` `spot_monsters` (still `flags.spot_monsters`) onto `a11y.mon_notices` (C `optlist.h:708–710` `&a11y.mon_notices`). Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `teleds` off / on / catch-up | C body, **new** | `teleport.c:540, 570–571` |
| `notice_mon_off` / `notice_mon_on` | C macros, **new** | `flag.h:233–237`; clamp at 0; `impossible` named |
| `a11y_state` | C `struct accessibility_data`, **new** | default all false |
| `notice_mon` | C callee, **new** | `hack.c:1708–1731` |
| `notice_all_mons` | C callee, **new** | `hack.c:1744–1783` |
| `notice_mons_cmp` / `notice_distu` | C callees, **new** | squared `distu`; JS `sort` is stable |
| `set_msg_xy` | C callee, **clone** | writes `a11y.msg_loc`; pline consume named |
| `canspotmon` / `canseemon` / `x_monnam` | C callees, **imported** | real |
| `vision.c` `notice_all_mons` | C caller, **named omit** | JS `vision_recalc` still silent |
| `spot_monsters` option | C optlist, **named omit** | JS writes `flags.spot_monsters` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** none. `x_monnam` may Hallu-roll only if notices fire; default Off so public logs unchanged. Path **public-unhit** on `spot_monsters`.

## Constitution / playbook

Grep of the two JS hunks: no trace-index gates. Contest Rule #2: in-process ESM; `await pline` is the existing display boundary. Do not claim `vision_recalc` now emits notices. Do not treat default-Off catch-up as a public-suite behavior change. Do not pull `postmov` / `goto_level` callers into this SHA.

## C ↔ JS fidelity

### `teleds` wrap order

C after `see_monsters()`:

```
gv.vision_full_recalc = 1;
nomul(0);
notice_mon_off();
vision_recalc(0);
/* materialize, switch_terrain, vault, spoteffects, invocation_message */
notice_mon_on();
notice_all_mons(TRUE);
```

JS `teleport.js:1320–1364`: `vision_full_recalc=1; nomul(0); notice_mon_off(); vision_recalc(0);` then materialize … `await invocation_message(); notice_mon_on(); await notice_all_mons(true);`. Call-for-call on the Open **wrap**. Say it explicitly: **JS `vision_recalc` still does not call `notice_all_mons`.** C’s off exists to mute that caller until after invocation. JS off is a no-op suppressor until that caller is ported; catch-up still matches C’s post-invocation `notice_all_mons(TRUE)`.

### `notice_mon`

C `hack.c:1710–1730`: gate `a11y.mon_notices && !mon_notices_blocked`; `spot = canspotmon && !(is_hider && (mundetected || M_AP_FURNITURE || M_AP_OBJECT))`; if `spot && !mspotted && !DEADMONSTER` → set spotted, `set_msg_xy`, `You("%s %s.", canseemon ? "see" : "notice", x_monnam(...))`; else if `!spot` clear `mspotted`.

JS `hack.js:1583–1607`: same gate, same hider conjunct, `mhp>=1` for `DEADMONSTER`, same article (`ARTICLE_YOUR` / `ARTICLE_A` / `ARTICLE_NONE`), peaceful adj iff `mpeaceful && !mtame`, `SUPPRESS_SADDLE` iff `has_mgivenname`, last `x_monnam` arg `false`. Match the Open **body**. `set_msg_xy` is stored; `accessiblemsg` pline consume of `msg_loc` stays named.

### `notice_all_mons`

C first loop: count `canspotmon`, `else if (reset) mspotted=FALSE`; `if (!cnt) return` (reset already applied). Second loop: `!canspotmon` always clears spotted; else fill `arr`. `qsort` `distu` then `notice_mon` each.

JS: same two walks over `game.fmon[]`, same reset-on-unspotted-even-when-cnt==0, same second-loop clear. `arr.sort(notice_mons_cmp)` is **stable**; C `qsort` is not. Equal-`distu` order can differ. Named. Not a miss of nearer-first.

Blocked or `!mon_notices`: both return before counting. Nested off (block==2) then one on still blocked — match. Extra `notice_mon_on` clamps at 0 (`impossible` diagnostic named).

### Option field

C `optlist.h:708–710` binds `spot_monsters` to `&a11y.mon_notices`. JS `options.js:1271` still `{ obj: 'flags', key: 'spot_monsters' }`. A player who sets the option in C gets notices; JS would set `flags.spot_monsters` and still no-op `notice_all_mons`. Default Off matches C `opt_in` Off, so the public recorder path is unchanged. Named omit of **wiring**, not a stub of `notice_all_mons`.

JS wrap (HEAD `teleport.js:1320–1364`):

```
game.vision_full_recalc = 1;
nomul(0);
notice_mon_off();
vision_recalc(0);
/* materialize / switch_terrain / vault / spoteffects */
await invocation_message();
notice_mon_on();
await notice_all_mons(true);
```

`notice_mon_on` is sync (counter only). `notice_all_mons` awaits each `notice_mon` pline. C both are `void`. `--More--` nesting on a long catch-up is why JS awaits; one gameplay `nhgetch` boundary remains `nhgetch`.

`notice_mon` article ternary matches C’s nested `mtame ? ARTICLE_YOUR : (!has_mgivenname && !type_is_pname) ? ARTICLE_A : ARTICLE_NONE`. Peaceful adjective is the string `"peaceful"` or C `0` / JS `null` — `x_monnam` treats both as none. `DEADMONSTER` is `mhp < 1` in this port (no separate `mstate` bit here).

Other C callers still named: `vision.c` after recalc, `do.c` `goto_level`, `allmain.c` `newgame`, `read.c` mapping wrap, `wizcmds.c`, `save.c`, `monmove.c` `postmov`. Porting those without the option pointer would still no-op at default Off.

`notice_mons_cmp` subtracts squared `distu` (dx²+dy²), same as C `hack.h` `distu`. Worm tails are not on `fmon` as separate `DEADMONSTER` entries here; C also walks `fmon` only. `a11y_state()` lazy-inits if missing so a test harness without `game.a11y` does not throw; C’s struct is always in BSS.

Grep of this SHA’s `js/` hunks: no `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward` writes, seed names in control flow, or recorded coordinates. `ARTICLE_*` / `SUPPRESS_SADDLE` come from `const.js`, not a seed table.

## Hallucinations / overclaim

D-log / CURRENT / subject say `vision_recalc` is wrapped with off/on and catch-up `notice_all_mons(TRUE)` after invocation, distu-sorted You see/notice. The wrap and helpers are the hunk. They **name** other callers and option wiring. Stamping **Addressed:** D-1142 is fair for the Open **teleds envelope + helpers**. Hash `52194cc9` is on the archive row (filled by D-1143). Do **not** stamp it as “Match C `vision_recalc` notices” or “`spot_monsters` now drives `a11y`.” This is **not** “Match C dispatch, callee is a stub”: `notice_mon` / `notice_all_mons` are real; they no-op when `mon_notices` is Off, which is also C’s default.

## Density

`teleds` wrap plus the C `notice_mon` / `notice_all_mons` / block macros. ~130 JS lines. One a11y family. Related deferrals (vision_recalc caller, option pointer) named in that envelope. Not “finish flag.h.”

## Verification

Journal: private canary **48**/48 (wrap order; default-off no-op; nested block; extra on clamp; Detect_monsters notice vs cansee see; already-mspotted; hider mundetected/furniture/object; dead skip; reset TRUE/FALSE cnt0; distu nearer-first; tame your; peaceful; named; mixed reset=FALSE); green+strict seed8000/0900; cohort **24**/24 including 0012 vault + 0367 Pri ^T + 0004 scroll + 0009 swim + 0360/0373/4500/2200 + strict 0012/0367/0004/0360/4500/2200/0030/0009/0002. Path **public-unhit** on `spot_monsters`. This audit’s full `sessions` (cadence **#1455**) **44**/44 Scr **11405**/11405 RNG **792838**/792838 — no regression.

C read of `teleport.c:529–572`, `flag.h:220–237`, `hack.c:1708–1783`, `optlist.h:708–710`; JS `hack.js:1523–1643`, `teleport.js:1320–1364`, `options.js:1271`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| default Off | wrap no-ops | **same** |
| Off around vision_recalc | mutes vision’s catch-up | **vacuous** (vision still silent) |
| on + `notice_all_mons(TRUE)` | distu You see/notice | **same** when `mon_notices` |
| hider furniture/object | not spot | **same** |
| `spot_monsters` option | `&a11y.mon_notices` | **named `flags` miss** |

## Actionable C-wrongs

None that Must-fix this next iter. The Open wrap + helpers match `teleport.c:540,570–571` / `hack.c:1708–1783`. Option pointer and `vision_recalc` caller are named map debt, not a silent stub of `notice_all_mons`.

Named omits / do-nots (map / Open, not Must-fix):

1. `vision.c:856` `notice_all_mons(TRUE)` inside `vision_recalc`. JS recalc still silent; teleds off is then load-bearing.
2. `options.js` `spot_monsters` → `a11y.mon_notices` (C `optlist.h:709`).
3. `goto_level` / `newgame` / `seffect_magic_mapping` / wizcmds / save / `postmov` `notice_mon`.
4. `accessiblemsg` consume of `set_msg_xy`; `mon_movement` / `glyph_updates`.
5. Do not restore the missing wrap. Do not invent `mon_notices=true` for public seeds. Do not pull enter_msg into this SHA — **Addressed:** D-1143 `bb8585ec`.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- Score: **7 / 10**
- One sentence: `teleds` now offs before `vision_recalc` and catch-up `notice_all_mons(TRUE)` after invocation with a real distu-sorted `notice_mon`, while JS `vision_recalc` still never notices and `spot_monsters` still writes `flags` not `a11y`.
- Must-fix stays empty for this SHA; next port popped Open `in_out_region` enter_msg / leave_msg. **Addressed:** D-1143 `bb8585ec`. Not option wiring.
