# Review 338 — 12953730 — spell.c skilled SPE_FIREBALL scatter (D-1378)

## Metadata
- Full / short hash: `12953730f3e89c73b1e79e5b458107379591cdde` / `12953730`
- Parent: `e785f5bb` (D-1377). This file audits **this SHA only** (last of four `js/` commits since review **334**). Archive **Addressed:** D-1378 lacked the short hash; this review commit fills `12953730`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 16:54:22 +0200
- D-id: **D-1378**
- Stats: 11 files, +307 / −37 — `js/spell.js` +200 / −12 (throwspell cluster + scatter); `js/zap.js` +37 / −7 (`spell_damage_bonus` export).
- Claims to close: Open `spell.c` skilled SPE_FIREBALL scatter (named from D-1365 / review **325**). Not zapyourself explode. `reviews/loop-2026-08-15/` has no unpaid scatter Must-fix.
- JS / map: `spell.js` `spelleffects` / `throwspell`; `zap.js` `spell_damage_bonus`. `c-js-map/turns.md` + `debt.md`. Unskilled FALLTHROUGH weffects already Open.
- Prior reviews this SHA claims to close: **325** named skilled scatter (`rnd(8)+1`, olet 0) after self-explode. D-1377 follow-up named this Open.

## Intent vs deliverable

Git subject promises: “Match C spell.c skilled fireball scatter so a skilled fireball actually throwspell-aims and explodes rnd(8)+1 times with olet 0, instead of printing Nothing happens.”

C `spell.c` `spelleffects` `:1419–1454`: SPE_FIREBALL/CONE, `role_skill >= P_SKILLED`, `throwspell()`, then `n = rnd(8)+1` loop: `(0,0,0)` → `zapyourself(pseudo,TRUE)` + maybe `losehp`; else `explode(dx,dy, otyp-SPE_MAGIC_MISSILE+10, spell_damage_bonus(ulevel/2+1), 0, EXPL_FIERY|FROSTY)`; then `dx,dy = cc + rnd(3)-2` with bounce to center on `!isok` / `!cansee` / STWALL / swallow. Unskilled **FALLTHROUGH** to weffects (`:1453–1454`). `throwspell` `:1655–1701`. `spell_damage_bonus` `zap.c:3479–3502`. Objects: SPE_MAGIC_MISSILE=367, FIREBALL=368, CONE=369 → types 11 and 12 (`ZT_SPELL` fire/cold).

Old JS: healing/teleport arms only; other otyps including skilled fireball printed `Nothing happens.`

The diff **does** port throwspell (water / getpos / distmin / swallow / lock-on / `walk_path`) and the skilled scatter with olet **0** and live `explode` / `spell_damage_bonus`. It does **not** FALLTHROUGH unskilled to weffects — it still prints `Nothing happens.` Named, and already the next-but-one Open row. Hallucination check below.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| skilled scatter | C `:1421–1451`, **wired** | `rnd(8)+1`; olet 0 |
| `throwspell` | C `:1655–1701`, **wired** | |
| `spell_aim_step` | C `:1607–1615`, **wired** | ZAP_POS / open door |
| `can_center_spell_location` | C `:1619–1624`, **wired** | distmin≤10, cansee, !STWALL |
| `display_spell_target_positions` | C `:1627–1651`, **wired + glyph clone** | `$` / HI_ZAP stand-in; getvalid live |
| `spell_damage_bonus` | C `:3479–3502`, **wired export** | Int then level; zhitm still named |
| `explode` | C `explode.c`, **imported live** | olet 0 skips Role_switch |
| `zapyourself` | C zap.c, **imported live** | FIREBALL D-1365; CONE grouped with WAN_COLD |
| `walk_path` | C dothrow.c, **imported live** | mutates dest |
| `getpos` / `getpos_sethilite` | C getpos.c, **imported live** | |
| `clear_nhwindow_message` | C WIN_MESSAGE, **imported live** | |
| unskilled FALLTHROUGH weffects | C `:1453–1454`, **named omit** | still Nothing happens; already Open |
| zhitm `spell_damage_bonus` | C zap.c, **named omit** | helper lives; caller still skipped |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `rnd(8)+1` then per boom `rnd(3)`/`rnd(3)` plus explode internals plus bonus (no extra die). `throwspell` itself is getpos, no wrapper die. Energy/`mksobj` RNG already ran in `spelleffects` before the switch (C same).

## C ↔ JS fidelity

Energy is spent and WIS exercised **before** the otyp switch in both (JS `:1344–1346`). Failed throwspell still spent the spell. Match.

`throwspell`: uinwater joke; waterlevel sun; “Where do you want to cast the spell?”; getpos force + hilite; ESC → 0; `clear_nhwindow` autodescribe; `distmin>10` “The spell dissipates…” (`pline_The`); swallow “The spell is cut short!” + `exercise(A_WIS,false)` + dx=dy=0 + return 1; unseen/STWALL lock-on fail return 0; else `walk_path` then `u.dx,u.dy = cc`. Match `:1660–1701`. JS `Your mind fails…` is C `Your(...)`. Glyph hilite is a **clone** `{ch:'$', color:HI_ZAP}` of `cmap_to_glyph(S_goodpos)` — D-log names it; `can_center_spell_location` is the live getvalid so targeting is not a fake map.

Scatter: first explode at the getpos cell (dx/dy are **coordinates**, not a dir; hero-cell targeting is explode-at-ux-uy, **not** zapyourself). zapyourself only when swallow left (0,0,0). Then `rnd(3)-2` scatter with bounce. `n=rnd(8)+1` is 2..9 iterations. Match `:1425–1450`.

`explode` type `otyp - SPE_MAGIC_MISSILE + 10`: fireball 11 → `abs%10==1` AD_FIRE; cone 12 → AD_COLD. olet **0** ≠ `WAND_CLASS`, so no Cleric/Monk/Wizard `/5` or Healer/Knight `/2`. That is the D-1365 vs D-1378 distinction review **325** already drew. `spell_damage_bonus(ulevel/2+1)`: Int≤9 shave (never below 1 if dmg>1, leave 0); ≤13 or ulevel<5 none; ≤18 +1; ≤24 or ulevel<14 +2; else +3. Match `:3484–3499`. zhitm still comments the helper as named — honest.

Unskilled: C FALLTHROUGH `weffects`/`getdir`. JS `Nothing happens.` Named. Already Open. Do **not** call this SHA a complete `SPE_FIREBALL` port.

Hallucination check: “Match C **skilled** fireball scatter” while **`explode` / `throwspell` / `spell_damage_bonus` are live** is not a dispatch-stub lie. The subject does **not** claim unskilled weffects. Do **not** stamp “Match C zhitm bonus.” Do **not** stamp “Match C `cmap_to_glyph(S_goodpos)`.”

## Hallucinations / overclaim

Subject says a skilled fireball throwspell-aims and explodes `rnd(8)+1` times with olet 0 instead of `Nothing happens.` **True when `P_SKILL(attack) >= P_SKILLED` and throwspell returns 1.** **False for Basic/Unskilled** (still `Nothing happens.`; C would zap). D-log “Not this iter” is honest. Stamping **Addressed:** D-1378 for `:1419–1451` + throwspell + bonus is fair. Do **not** treat fortress PASS — including seed0501 priest-cast — as a skilled fireball (that session is not this envelope unless P_SKILLED).

## Density

One C case plus its getpos helper cluster plus the zap bonus the explode line calls. ~200 lines. Playbook §2b right size (not “finish spells”). Did not glue FORCE_BOLT / CREATE_FAMILIAR (later Open). Did not re-open D-1377.

## Branch-by-branch confirm

1. Unskilled / Basic FIREBALL: Nothing happens. Named. No `rnd(8)`. Match-the-omit.
2. Skilled, uinwater: joke; no explode. Match.
3. Skilled, waterlevel: sun pline; no explode. Match.
4. getpos ESC: return 0; energy already spent. Match.
5. distmin>10: dissipates; 0. Match.
6. Swallow: cut short; dx=dy=0; scatter zapyourself. Match.
7. STWALL / unseen lock-on: fail; 0. Match.
8. Aimed cell: `n=rnd(8)+1` explode olet 0 type 11/12 + bonus; scatter `rnd(3)-2`; bounce. Match.
9. Hero cell (not swallow): explode at ux,uy, **not** zapyourself. Match C storing coordinates in dx/dy.
10. CONE: EXPL_FROSTY + type 12. Match.
11. Int 25 / XL≥14: +3 on `ulevel/2+1`. Match.
12. Int≤9: shave, floor 1 if dmg>1. Match.
13. zhitm still no bonus. Named.
14. HEALING arm unchanged. Match.
15. **Public-unhit** until a session casts skilled fireball/cone.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `10` in `otyp - SPE_MAGIC_MISSILE + 10` is C’s ZT_SPELL offset, not a recorded damage. `dist=10` is C throwspell range. Plain ESM. `await explode` is in-process.

## Verification

Journal: private canary **23**/23 (C/JS grep; bonus Int/level; unskilled no rnd(8); water/ESC/dist/STWALL; skilled olet 0 + mon HP; CONE; HEALING regression; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on skilled scatter. This audit cadence: full `sessions` at HEAD `12953730` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `38+0.31/turn` (R² 0.84). I did not re-run the private canary. Fortress PASS including seed0501 is not a skilled fireball.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The skilled path matches `:1421–1451` and throwspell call-for-call; `explode` is the real function with olet 0. Unskilled FALLTHROUGH is a named omit **already Open**.

Named omits (map / already-Open, not Must-fix):

1. `spell.c` unskilled SPE_FIREBALL/CONE FALLTHROUGH weffects — **already Open**
2. zhitm / buzz `spell_damage_bonus`
3. `cmap_to_glyph(S_goodpos)` ( `$` stand-in; getvalid live)
4. other `spelleffects` otyps (FORCE_BOLT / CREATE_FAMILIAR / PROTECTION / CLAIRVOYANCE — later Open)

Do not Must-fix “olet WAND_CLASS like D-1365” (C scatter is 0). Do not Must-fix “zapyourself when aiming at the hero cell” (C explodes at ux,uy). Do not Must-fix “`rnd(8)` without +1” (C is `rnd(8)+1`). Do not Must-fix “skip bonus when Fire_resistance” (C still computes; explode masks).

## Callers / RNG ledger

C skilled: `rnd(8)+1` then per hit explode RNG + two `rnd(3)`. JS same when `P_SKILLED`. Public fortress never takes that branch.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: skilled fireball/cone now throwspell-aims and `rnd(8)+1`-explodes with olet 0 and live Int/level bonus; unskilled weffects stay named Open.
- Must-fix stays empty for this SHA; this review commit fills archive **Addressed:** D-1378 `12953730`.
