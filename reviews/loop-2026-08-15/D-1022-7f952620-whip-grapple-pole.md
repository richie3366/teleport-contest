# Review — `7f952620` — D-1022 whip / grapple / `use_pole`

## Metadata
- Full / short hash: `7f9526207431d5661fce6967e3e8aa7aa74fbee8` / `7f952620`
- Parent: `68e513ca44fa1fc40293b8312871467e4c38e7d5`
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-15 14:34:03 +0200
- D-id: **D-1022**
- Stats: 11 files, **+1106 / −73** — `js/apply.js` **+1041**
- JS / map / cadence: `js/apply.js`, `js/wield.js` (`is_pole` Snickersnee), `js/uhitm.js` (`force_attack` export); debt/absent; **no** cadence (score still #1290)

## Intent vs deliverable
Git promise: “Match C `use_whip`, `use_grapple`, and `use_pole` doapply dispatch”.

Actual deliverable: all **three** C functions **and** a swarm of local helpers (`getdir_whip`, `kick_steed_apply`, `hurtle_apply`, `glyph_is_poleable_at`, `Amonnam_apply`, `mbodypart_apply`, `surface_apply`, `ceiling_apply`, `u_wipe_engr_apply` no-op, `display_*_positions` no-op). This is no longer a `doapply` dispatch: it finishes whip+pole+grapple in one iter, plus a mini-`steed.c` / mini-`dothrow.c hurtle`.

The `doapply` wiring (BULLWHIP → GRAPPLING_HOOK → `is_pole`) is the only part public traces might someday hit; the bodies are not.

## Disposition (catch-up 2026-08-15)

Reviews bind the next port. Unpaid C-wrongs are in `docs/LOOP-QUEUE.md` **Must-fix**.

| Risk | Status |
|------|--------|
| 1 `getdir_whip` vs C `getdir` | **Addressed:** D-1038 `07434534` (`lock.js` `getdir`) |
| 2 `hurtle_apply` `teleds` | **Addressed:** D-1038 `07434534` (`dothrow.js` `hurtle`/`hurtle_step`) |
| 3 pole targeting live `m_at` vs glyphs | **Addressed:** D-1040 `12458fe9` (C `glyph_at` / `find_poleable_mon`) |
| 4 `thitmonst` hit-vs-miss | **Addressed:** D-1041 `eb3469ae` |
| 5 `yname` / `Amonnam` / `mbodypart` clones | **Addressed:** D-1045 `e8884a53` |
| 6 `pickup_object` ignores `telekinesis` | **Must-fix** |
| 7 `u_wipe_engr` / `tmp_at` no-ops | **Must-fix** |
| 8 density / oil dump | process smell — not a code Must-fix |

## Inventory
| File | Role |
|------|------|
| `js/apply.js` | Massive port + homemade helpers + `doapply` wiring |
| `js/wield.js` | `is_pole`: oclass + `ART_SNICKERSNEE` (C `obj.h`) |
| `js/uhitm.js` | Export `stumble_onto_mimic`; **new** `force_attack` |
| map / D-log / journal | D-1022 Keep’d; next oil/trap/BoT |

## C ↔ JS fidelity

### `doapply` — case order: faithful
C `apply.c:4265`: `BULLWHIP` → `use_whip`; `GRAPPLING_HOOK` → `use_grapple`; `default` `is_pole` → `use_pole(obj, FALSE)` (before pick/axe).

JS `doapply`: same order, `use_pole(obj, false)`, then “Sorry”. `is_pole` does not swallow whip (skill P_WHIP) or the hook. **No dispatch hallucination.**

JS reduces the return to `(res & ECMD_TIME) !== 0` (historical boolean `doapply`). C propagates `ECMD_FAIL` / `ECMD_CANCEL`. For pole “Too far” (`ECMD_FAIL`) neither spends the turn. OK as long as `rhack` does not distinguish FAIL from OK.

### `is_pole` / `force_attack` — faithful
C `obj.h:228`: WEAPON/TOOL + (`P_POLEARMS` \| `P_LANCE` \| `ART_SNICKERSNEE`).

JS `wield.js:94`: same oclass guard (added in this commit) + `is_art(..., ART_SNICKERSNEE)`.

C `uhitm.c:432` `force_attack`: save `forcefight`, set true if `pets_too || !mtame`, `do_attack`, restore, return.

JS `uhitm.js:1319`: copy. Whip passes `false`. **One of the few 1:1 additions.**

### `use_whip` — C graph copied; RNG copied; helpers not
C `apply.c:2955–3271`. JS `use_whip` + `whip_attack`.

**Branches in the same order:** `obj != uwep` wield+cmdq → `getdir` → swallow coords / else `confdir(FALSE)` + `isok` miss → proficient (archeologist, DEX&lt;6 / ≥14, Fumbling, clamp 0..3) → swallow room → Underwater → `dz<0` ceiling bug → water/lavawall splash+`fire_damage` → self/`dz>0` (steed `!rn2(proficient+2)`, pool splash, lev/steed/fly snag `rnl(6)\|\|pickup<1`, else `rnd(2)+dbon+spe` foot) → `(Fumbling\|\|Glib)&&!rn2(5)` dropx → pit yank → `mtmp` whipattack → air/waterlevel → Snap.

**C `goto whipattack`:** extracted as `whip_attack`; C’s `return ECMD_TIME` **before** `wakeup` if `force_attack` succeeds is reproduced (`whip_attack` returns before wakeup; `use_whip` still yields `ECMD_TIME`). Swallow / ceiling **fall through** to `return ECMD_TIME` (no early `ECMD_OK`) — matches C.

**cmdq:** `cmdq_add_ec(doapply)` pushes the **function** + `{typ:'key', key: invlet}` — D-1018 shape, not the broken `{typ:'ec'}` from D-0951.

**Concrete gaps (not named polish):**

1. **`getdir_whip` is not `getdir`.** C `cmd.c:3958`: cmdq DIR/KEY, `yn_function`, `Cmd.dirchars` (numpad), `^R` retry, `CQ_REPEAT`, self keys, mouse `_`. JS: `nhgetch` + `DIR_DX` **hjkl/yubn only** + `.`/`s` + `<>`. Clone of `getdir_self_ok` already in the same file (stethoscope), not C. A whip apply on the numeric keypad **cancels** in JS and works in C. *(D-1038 later replaces these clones with shared `lock.js` `getdir`.)*

2. **C `yname` vs JS `the(xname)`** on wrap/snatch/yank of a monster weapon (`apply.c:3166, 3209, 3182`). C `objnam.c yname` for minvent: monster possessive. JS `the(xname(otmp))`. The `yname` **already** in `apply.js:1073` (`your ${xname}`) is wrong for an opponent’s weapon; they avoided it and substituted something else. D-log names the omit — **wrong screen** as soon as a disarm is visible.

3. **`Amonnam_apply`** capitalizes `mon_nam`. C `Amonnam` = `highc(a_monnam(...))` (indefinite article). Reveal message: not C.

4. **`mbodypart_apply` ignores the monster** (`return body_part(part)` of the hero). C `mbodypart(mtmp, HAND)`: paw / tentacle / etc. “Welded to his hands” is wrong for a dog.

5. **`glyph_is_invisible(loc)`** JS (`display.js`) = `remembered_glyph.invisible`. C: `glyph_is_invisible(levl[rx][ry].glyph)` on the displayed glyph. Same name, **not the same predicate** — reveal arm.

6. **`kick_steed_apply`:** C `steed.c:405` `He = highc(mhe(steed))` then `monverbself(..., "rouse")`. JS `const He = 'It'` always; `"It rouses!"` instead of `"He rouses himself!"`. RNG `!rn2(2)` / `mtame--` / `rnd(MAXULEV/2+5)` / `rn1(20,30)` gallop **are** in the right order — the port is not noise; the strings are hallucinated.

7. **`pickup_object(..., telekinesis)`:** C whip `TRUE`, grapple `FALSE`. JS `pickup.js` does `void telekinesis` — the C boolean is **ignored**.

### `use_pole` / `could_pole_mon` — C skeleton; glyph ≠ glyph
C `apply.c:3370–3563`. `calc_pole_range` 4 / 4 / 5 / 8 + `gp.polearm_range_*`: match.

`could_pole_mon`: `!uwep \|\| !is_pole` → calc → `find_poleable_mon` else live `hitmon` `sensemon` in `[min,max]`. JS `mhp>0` ≈ `!DEADMONSTER`. Structure OK.

`find_poleable_mon` C skips tame/peaceful **only if** `glyph_is_monster(glyph) && m_at`. JS skips every `m_at` tame/peaceful (`confirm !== false`). C `glyph_is_poleable` = monster **glyph** \| invisible glyph \| statue glyph. JS = live `m_at` \| `glyph_is_invisible(loc)` \| `sobj_at(STATUE)`. **getpos / autohit target can diverge** (map memory vs live world).

`display_polearm_positions`: C `tmp_at(DISP_BEAM, S_goodpos)` dx,dy −3..3. JS no-op (named). `getpos_sethilite` is called but does not paint.

Hit: `attack_checks` → `overexertion` → Snickersnee one-shot/`Shkinng!` (Soundeffect omitted, named) → `thitmonst`. Statue trap `activate_statue_trap`. Furniture: C `defsyms[glyph_to_cmap].explanation`; JS **always** `"an unknown obstacle"` except STONE/SCORR (named). Boulder: C `glyph_to_obj==BOULDER && sobj_at`; JS `sobj_at` alone.

`u_wipe_engr(2)` → `u_wipe_engr_apply` **no-op**. Comment “no RNG”: true for the missing wipe, false as soon as an engraving exists (C erases it).

`thitmonst` still comes from partial `dothrow.js` — D-log is honest. A halberd hit is **not** C combat.

### `use_grapple` — menu RNG faithful; hurtle not
C `apply.c:3729–3873`. Swallow / wield `"cast"` / `where_to_hit` / getpos / range without min / Too far→`res` (ECMD_OK, **not** FAIL unlike pole): match.

**Skilled menu:** C `tohit = rn2(5)` **then** inside the `if` `tohit = rn2(4)` **then** `select_menu` and `a_int - 1`. C identifiers: `any.a_int=1` then `++` **before** the first `add_menu` → items 2,3,4 → tohit 1,2,3. JS items `tohit: 1,2,3` + the same double `rn2`. **The choice RNG stream is copied, not invented.** ESC → tohit stays `rn2(4)` on both sides.

JS `select_menu_pick_one`: no C title `"Aim for what?"`; corner overlay vs `NHW_MENU`. Wrong screen, RNG OK.

`tohit==2 \|\| !rn2(2)` then `u_wipe_engr(rnd(2))`: call present, body no-op.

Pull-in: `verysmall && !rn2(4) && enexto(..., u.ux, u.uy, NULL)` then `rloc_to`. JS `pullcc` separate so it does not clobber `cc` — correct (C clobbers `cc` but returns before fallthrough).

**`hurtle_apply` is not `hurtle`.** C `dothrow.c:1078`: Punished `!carried(uball)`; trap message web/lava/floor/ball/`trap`; `nomul(-range)`; `endmultishot`; **`walk_path(..., hurtle_step)`**. JS: single `"the trap"` message; **`teleds(nx,ny)` one step**. `walk_path` is **already imported** in `apply.js` (pre-D-1022) and not wired. Range 1: if the dest cell is a wall / monster, C stops in `hurtle_step`; JS teleports if `isok`. **Physics bug, not cosmetic omit.** D-log says `hurtle_step walk_path` — the word is there; the code still moves **another way**. *(D-1038 later ports `hurtle` via `hurtle_step` in `dothrow.js`.)*

## Constitution / playbook
Grep of the JS diff: no `FORCE` / `DIAG` / `getRngLog` / `fs` / `node:` / `fastforward` / seed in control flow. Rule #2 OK. Frozen intact. `await`: `nhgetch` (getdir/getpos/menu) + existing `pline`. One await boundary respected.

No hardcoded public trace. The `u_wipe_engr` comment “public traces have no engraving here” is **seed reasoning**, not a gate — light smell, not CONSTITUTION-RISK.

## Density (§2b)
**Too big.** Three C families (whip ~320 LOC, pole ~140, grapple ~140) + steed + hurtle + homemade getdir + ~25 helpers. Playbook: one caller/callee family. This is D-0951 replay. An iter of `use_whip` alone (shared getdir, not full kick_steed) would have been §2b.

## Documentation
D-log **does not** say “complete”. Deferred: `thitmonst` hit-vs-miss, S_goodpos, `hurtle_step`, `wipe_engr_at`, non-adjacent untrap, `#if 0` thitu, `artifact_light`, yname possessive. **Honest about named omits.** Undersells the false helpers (`Amonnam`, `mbodypart`, `getdir`, `glyph_is_poleable` live vs glyph).

CURRENT: cluster Keep’d, next oil/trap/BoT. NOTES: falsify **held** (whip direction, pole getpos, `is_pole` Snickersnee, `could_pole_mon` false). The cited private falsifier does **not** cover pit / disarm / hurtle / skilled grapple menu.

## Verification
Journal: green+strict PASS; apply/combat/ride cohort **18/18** (seed0361 Scr 366/366); “private node” partisan/Snickersnee `is_pole`; whip/hook not pole; `could_pole_mon` false without uwep; **public unhit**.

Real proof: fortress **not regressed** + `is_pole` macro. **No** proof that `use_whip` / `use_grapple` / `use_pole` behave like C under input. Calling the git subject “Match C” overclaims dispatch, not the body.

## Risks / debt (priority)
1. `getdir_whip` vs C `getdir` — first real input will break numpad / cmdq / repeat.
2. `hurtle_apply` = `teleds` ≠ `walk_path`+`hurtle_step` — grapple yank.
3. `glyph_is_poleable_at` / `find_poleable_mon` on live objects vs glyphs — pole target.
4. Partial `thitmonst` — a pole hit is not a C hit (combat RNG).
5. Messages: `yname`, `Amonnam`, `mbodypart`, `surface`/`ceiling`, `kick_steed` `He`.
6. `pickup_object` ignores `telekinesis`.
7. `u_wipe_engr` / `tmp_at` no-op — engraving / hilite.
8. Density: 1292 oil/trap/BoT risks the same dump.

## Verdict
- Verdict: **QUALITY-RISK**
- Score: **5 / 10**
- One sentence: the **skeleton** of the three functions (`if` order, `rn2`/`rnl`/`rnd` RNG, D-1018 cmdq, Snickersnee `is_pole`, `force_attack`) is a C copy, not a control hallucination; the **playable surface** (getdir, glyphs, hurtle, names, `thitmonst`) is a net of false or stub helpers, and the public suite has not seen it.

## If only one re-port were kept
Keep `doapply` + `is_pole` + `force_attack`. Redo C `getdir` (one shared copy for stethoscope/whip). Replace `hurtle_apply` with C `hurtle` via already-imported `walk_path`. Do not touch oil/trap/BoT until whip has a private canary (bullwhip + direction; pole `getpos`; hook skilled menu).
