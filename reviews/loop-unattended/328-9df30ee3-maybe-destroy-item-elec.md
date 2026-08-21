# Review 328 — 9df30ee3 — zap.c maybe_destroy_item AD_ELEC (D-1368)

## Metadata
- Full / short hash: `9df30ee3aa90f143567f75b251777e227cc213f6` / `9df30ee3`
- Parent: `463e151d` (D-1367). This file audits **this SHA only** (second of four `js/` commits since review **326**). Archive **Addressed:** D-1368 `9df30ee3` already has the short hash (filled by D-1369).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 14:27:37 +0200
- D-id: **D-1368**
- Stats: 11 files, +236 / −93 — `js/zap.js` +206 / −93 (`destroyable` + AD_ELEC body + `recharge_elec_ring`).
- Claims to close: Open `zap.c` `maybe_destroy_item` AD_ELEC (named from D-1355 / reviews **317** / **326**). Not zapyourself lightning. `reviews/loop-2026-08-15/` has no unpaid elec-destroy Must-fix.
- JS / map: `zap.js` `maybe_destroy_item` / `destroyable` / `recharge_elec_ring`; callers `destroy_items` (WAN_LIGHTNING, `zhitu`/`zhitm` elec). `c-js-map/turns.md` + `debt.md`. Full `read.c` recharge / `inventory_resistance_check` still named.
- Prior reviews this SHA claims to close: **317** named AD_ELEC `return 0` before `rn2(3)`. **326** queued it after lightdamage. **324**’s Antimagic Must-fix shipped on the parent SHA.

## Intent vs deliverable

Git subject promises: “Match C zap.c maybe_destroy_item so electricity actually shatters wands and dusts rings (or recharges charged rings), instead of returning 0 before rn2(3).”

C `destroyable` (`zap.c:5637–5644`): ring/wand class; `otyp != RIN_SHOCK_RESISTANCE && otyp != WAN_LIGHTNING`. C `maybe_destroy_item` (`:5858–5879`): `xresist = (oclass != RING && (u_carry ? Shock_resistance : resists_elec(carrier)))`; worn non-metallic `uarmg` or shock-ring `skip`; charged `oc_charged && rn2(3)` → `chargeit`; else ring dindx 5 dmg 0; wand dindx 6 `rnd(10)`. Then (`:5887–5953`) `recharge(obj,0)` or the shared `rn2(3)` cnt / pline / `Ring_gone` / `useup` / `You("aren't hurt!")` vs `losehp`.

C `Shock_resistance` is `youprop.h:42–44` `uprops[SHOCK_RES]` H||E. `confer_oc_oprop` does **not** mirror `EShock_resistance` (only Blind/Fast/Telepat/Stealth/Levitation flats). Worn `RIN_SHOCK_RESISTANCE` writes `uprops[SHOCK_RES].extrinsic` only.

Old JS: AD_ELEC `else return 0`; destroyable `return true` after class check.

The diff **does** immune otyps, gloves skip, chargeit RING `recharge(0)`, wand `rnd(10)`, worn `Ring_gone`/`setnotworn` (also for fire/cold that C already had). It does **not** port full `read.c` wand/tool/blessed recharge. Named. It **does** call local `Shock_resistance()`, which is **not** C’s macro.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `destroyable` AD_ELEC | C `:5637–5644`, **wired** | immune shock-ring / lightning wand |
| AD_ELEC arm | C `:5858–5879`, **wired** | skip / chargeit / dust / wand `rnd(10)` |
| `recharge_elec_ring` | C `read.c:801–833` `curse_bless==0`, **clone** | RING only; wand/tool/blessed named |
| `Ring_gone` / `Ring_off` / `Ring_on` / `setworn` | C `do_wear.c`, **imported live** | not zap clones |
| `setnotworn` | C `do.c`, **imported live** | dynamic `do.js` |
| `otyp_is_charged` | C `objects[].oc_charged`, **imported live** | six `spec=1` rings match `objects.h` |
| `is_metallic` | C `objclass.h`, **imported live** | `mkobj.js` IRON..MITHRIL |
| `Yname2_destroy` / `Yobjnam2_destroy` | C `objnam.c:2378–2384` / `:2280–2286`, **thin clones** | chargeit strings; destroy path still `Your ${xname}` |
| `maybe_half_phys` | C `Maybe_Half_Phys`, **imported live** | `hack.js`; H\|\|E only |
| `Shock_resistance()` | C `youprop.h:42–44`, **clone that diverges** | sticky `u.Shock\|\|H\|\|E` only — **no uprops** |
| `resists_elec` | C, **local live** | `mon_resists_bit` MR_ELEC |
| `inventory_resistance_check` | C `:5816–5817`, **named omit** | never early-out |
| full `recharge` wand/tool/blessed | C `read.c`, **named omit** | chargeit is RING `s=1` only |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** charged-ring `rn2(3)` then maybe `rn2(7)` explode; wand `rnd(10)` then the shared `rn2(3)` cnt loop (C burns `rnd(10)` even when cnt==0). Shock-ring skip: no `rn2(3)`.

## C ↔ JS fidelity

`destroyable` immune otyps match `:5641–5644`. Gloves: C uses global `uarmg` even for a monster carrier — JS `game.u?.uarmg` is that oddity, not a silent hero/mon swap. `otyp_is_charged` lists exactly C `RING(..., spec=1)`: adornment / gain str / con / accuracy / damage / protection (`objects.h:741–757`). Uncharged rings dust (dindx 5, dmg 0). Wands `rnd(10)` then cnt. Chargeit `recharge(obj,0)` → uncursed `s=1`: `spe > rn2(7) || spe <= -5` explode (`Yobjnam2` pulsate + `otense` explode, `Ring_gone`, `rnd(3*abs(spe))`, `Maybe_Half_Phys`); else clockwise spin, `Ring_off` / `spe+=1` / `setworn`+`Ring_on`. JS `recharge_elec_ring` matches that RING envelope. Wand/tool/blessed stay named.

`Ring_gone`/`setnotworn` now run for **all** destroy types when `owornmask` — C `:5919–5924` already did. That is a fix of a previous named omit, not a new C-wrong.

`Shock_resistance()` in this file:

```
function Shock_resistance() {
    const u = game.u || {};
    return !!(u.Shock_resistance || u.HShock_resistance || u.EShock_resistance);
}
```

invent.js `hero_Shock_resistance` also ORs `uprops[SHOCK_RES].intrinsic||extrinsic`. This clone does not. A hero wearing a ring of shock resistance (`confer_oc_oprop` mask on `uprops` only; `EShock_resistance` still 0) is Shock_resistance in C and **not** here. A wand then `rnd(10)` explodes: C prints `"You aren't hurt!"` and burns **zero** HP; JS `losehp(rnd(10))`. That is a **C-wrong** on the keep-path this SHA newly wired (`:5859–5860` / `:5939–5940`), not a named omit of sparkle. The **ring itself** is immune (`destroyable` + skip) — the miss is **other** exploding wands while conferral shock is on.

D-1367 just taught this file the D-1089 shape for Antimagic. This SHA shipped the sibling clone unfixed. Review **317** accepted the same helper on WAN_LIGHTNING HP; that does not make conferral-miss legal on a **new** AD_ELEC `xresist` split the D-log stamps as “Shock aren't-hurt.”

Hallucination check: “Match C `maybe_destroy_item`” while **`recharge_elec_ring` is a RING-only clone** is **not** a dispatch-stub lie — chargeit calls a live RING `curse_bless==0` body, not `return 0`. “Shock aren't hurt” while **`Shock_resistance()` misses conferral** **is** an overclaim on **worn shock-ring + exploding wand HP**. Do **not** stamp “Match C `youprop.h` Shock_resistance.” Do **not** stamp “Match C `read.c` recharge wand/tool.” Do **not** stamp “Match C `inventory_resistance_check`.”

## Hallucinations / overclaim

Subject says electricity shatters wands and dusts (or recharges) rings instead of returning 0 before `rn2(3)`. **True for the destroy/chargeit/skip split** (immune otyps, leather gloves, six charged rings, wand `rnd(10)`). **False for conferral shock resistance skipping exploding-wand HP.** D-log “Shock aren't-hurt” does not name the sticky clone. Stamping **Addressed:** D-1368 for deleting `else return 0` is fair for the default-0 lie. It is **not** fair for “Match C bounce-style xresist.” Do **not** treat fortress PASS as `"Your wand breaks apart and explodes!"` or `"You aren't hurt!"`.

## Density

One C function plus `destroyable` and the RING `recharge(0)` callee C already uses. ~200 lines of JS. Playbook §2b caller/callee cluster. Did not glue WAN_MAKE_INVISIBLE (next Open). Right size. The thin Antimagic Must-fix on the parent SHA does not excuse shipping another sticky youprop clone on this arm’s HP split.

## Branch-by-branch confirm

1. Non-ring/non-wand: `destroyable` false; never enters. Match `:5638–5639`.
2. `RIN_SHOCK` / `WAN_LIGHTNING`: destroyable false. Match `:5642–5643`.
3. Worn uncharged ring + leather `uarmg`: skip; no `rn2(3)`. Match `:5864–5867`.
4. Worn ring + metallic gauntlets: no skip; charged `rn2(3)` or dust. Match.
5. Charged ring `rn2(3)` true: chargeit; no cnt loop. Match `:5868–5870`.
6. Chargeit explode `spe > rn2(7)`: pulsate/explode; `Ring_gone`; `rnd(3*|spe|)`. Match `:807–814`.
7. Chargeit survive: clockwise; `spe+1` off-then-on. Match `:815–827`.
8. Uncharged ring: dindx 5 dust; dmg 0; cnt `rn2(3)`. Match `:5872–5873`.
9. Wand: `rnd(10)` then cnt; explode pline; Shock xresist → aren't-hurt **iff** the predicate matches. **Cloak/ring conferral: C-wrong.**
10. AD_COLD regression: still `rnd(4)` + freeze. Restructure kept the arm.
11. `inventory_resistance_check`: still never. Named.
12. **Public-unhit** unless a session elec-destroys rings/wands.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `RIN_SHOCK_RESISTANCE` is an object token. Dynamic `import('./do.js')` `setnotworn` is cycle avoidance, not Node `fs`. Plain ESM. The Shock miss is a **clone**, not a trace index.

## Verification

Journal: private canary **22**/22 (C/JS grep; shock/lightning immune no `rn2(3)`; wand `rnd(10)`+explode/survive; Shock aren't-hurt; uncharged ring; leather-glove skip; metallic gauntlets roll; charged `rn2(7)`; AD_COLD regression; MAKE_INVISIBLE still default; Rule #2). The “Shock aren't-hurt” case almost certainly set a sticky bit — it would **not** have caught conferral `uprops[SHOCK_RES]`. green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on elec destroy. This audit cadence: full `sessions` at HEAD `90eca343` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.30/turn` (R² 0.84). I did not re-run the private canary. Fortress PASS is not a wand-shatter.

## Actionable C-wrongs

1. `zap.js` `maybe_destroy_item` AD_ELEC `Shock_resistance()` must read `youprop.h` `uprops[SHOCK_RES]` intrinsic||extrinsic (invent.js `hero_Shock_resistance` / D-1089 shape), not sticky `u.Shock_resistance||H||E` only. Worn ring of shock resistance currently still takes exploding-wand `rnd(10)` HP instead of `"You aren't hurt!"`. Same helper already gates `zapyourself` WAN_LIGHTNING. Fix the helper once. Do **not** rewrite `confer_oc_oprop`. Source: this review.

Named omits (map / already-Open, not Must-fix):

1. `inventory_resistance_check` early return
2. full `read.c` recharge wand/tool/blessed/cursed (`s!=1`)
3. Book-of-Dead glow (pre-existing `return 0`)
4. `Yname2` on the destroy pline (still `Your ${xname}`; chargeit clone is close)
5. WAN_MAKE_INVISIBLE (shipped next SHA as D-1369)

Do not Must-fix “skip `rnd(10)` when Shock_resistance” (C still rolls; xresist only skips HP). Do not Must-fix “chargeit `RIN_SHOCK`” (C skip++ first). Do not Must-fix “use monster gloves for minvent rings” (C uses hero `uarmg`). Do not Must-fix “one `recharge` import from `read.js`” (cycle; RING `s=1` body matches).

## Callers / RNG ledger

C: wand `rnd(10)` then cnt `rn2(3)`; charged ring `rn2(3)` then maybe `rn2(7)`. JS same on those paths. Conferral shock still takes `losehp` after the wand rolls. Public fortress never elec-destroys.

## Verdict

- Verdict: **QUALITY-RISK**
- One sentence: rings/wands now destroy or RING-recharge, but exploding-wand HP uses a sticky Shock clone that misses conferral `uprops[SHOCK_RES]`.
- Must-fix prepends that Shock predicate; next port ships it before Open `u_wipe_engr`.
