# Review 360 — dce9ac86 — spell.c SPE_CHAIN_LIGHTNING BFS zhitm (D-1400)

## Metadata
- Full / short hash: `dce9ac86cff26ae25ff80a7d77d2465d5898b321` / `dce9ac86`
- Parent: `64d4d089` (D-1399). This file audits **this SHA only** (fifth of nine `js/` commits since review **355**). Archive **Addressed:** D-1400 `dce9ac86` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 23:11:39 +0200
- D-id: **D-1400**
- Stats: 10 files, +305 / −33 — `js/spell.js` +221 / −14 (`cast_chain_lightning` + propagate); `js/zap.js` +4 / −2 (export `zhitm` / `resists_elec`).
- Claims to close: Open `spell.c` `spelleffects` SPE_CHAIN_LIGHTNING (named from D-1399). Not cure. `reviews/loop-2026-08-15/` has no unpaid chain Must-fix.
- JS / map: `spell.js` `cast_chain_lightning` / `propagate_chain_lightning`; callee `zap.js` `zhitm`. `c-js-map/turns.md`. seffects / peffects / `defended` / zhitm bonus still named.
- Prior reviews this SHA claims to close: **359** named CHAIN after CURE_BLINDNESS.

## Intent vs deliverable

Git subject promises: “Match C spell.c spelleffects SPE_CHAIN_LIGHTNING so the spell actually BFS-spreads via cast_chain_lightning/zhitm, instead of printing Nothing happens.”

C `spell.c` `:1588–1590`: `cast_chain_lightning();` then TIME. Body `:1002–1100`: queue init `Hallucination ? rn2_on_display_rng(6) : (AD_ELEC-1)` **before** the swallow TODO return; `tmp_at(DISP_BEAM)`; eight `propagate` from hero at strength 2; BFS layers; per cell `zhitm(mon, BZ_U_SPELL(AD_ELEC-1), 2, &unused)` then xkilled / “You shock %s%s” / resists + `wakeup(mon, FALSE)` with `forcefight++`. Strength 0 continues skip; else `--`, forward propagate, maybe `u.uen--`, `DIR_LEFT` then `DIR_RIGHT2` diagonals.

`propagate` `:951–1000`: pass-by-value step `xdir/ydir`; tail≥100 return; `CHAIN_LIGHTNING_POS`; peaceful return; `!resists_elec && !defended` → strength 3 else if mon strength 0; `!mon && !strength` return; unique (x,y); enqueue; `tmp_at(DISP_CHANGE, zapdir_to_glyph)`.

Macros `:914–925`: LIMIT 100; TYP = `SPACE_POS` (typ>DOOR=23) or POOL/MOAT/DRAWBRIDGE_UP/LAVAPOOL, **not** WATER/LAVAWALL; POS = isok && (TYP || unlocked door). `BZ_U_SPELL(5)=15` → `zaptype%10=ZT_LIGHTNING`.

Old JS: other-otyp `Nothing happens.`; `zhitm` file-private.

The diff **does** port the queue, terrain, peaceful skip, BFS, zhitm/xkilled/wakeup, extra Pw, swallow TODO, and export `zhitm`/`resists_elec`. It does **not** port `defended(mon, AD_ELEC)` (commented in both propagate and zhitm). Named. zhitm LIGHTNING still skips `spell_damage_bonus` / `shieldeff` / `nd>2` blind (nd=2 so C skips blind too).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| SPE_CHAIN_LIGHTNING arm | C `:1588–1590`, **wired** | |
| `cast_chain_lightning` | C `:1002–1100`, **wired** | |
| `propagate_chain_lightning` | C `:951–1000`, **wired** | pass-by-value copy |
| `zhitm` | C `:4238–4398`, **imported live** | LIGHTNING `d(nd,6)` + `rn2(3)` destroy; bonus named |
| `resists_elec` | C, **imported live** | zap.js export |
| `wakeup` | C `mon.c`, **imported live** | via_attack false |
| `xkilled` | C, **imported live** | dynamic uhitm.js |
| `exclam_chain` | C `zap.c` `exclam`, **clone matching** | zap.js helper unexported |
| `DIR_LEFT` / `DIR_RIGHT2` / `BZ_U_SPELL` | C `hack.h`, **clone matching** | |
| `CHAIN_LIGHTNING_*` | C `:914–925`, **wired** | |
| `defended(mon, AD_ELEC)` | C `:975`, **named omit** | |
| zhitm `spell_damage_bonus` / `shieldeff` | C `:4344–4386`, **named omit** | INT add, no extra die |
| swallow engulfer | C `:1009–1011`, **named omit** | TODO matches C |
| seffects / peffects | C, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** per hostile hit `d(2,6)` then `rn2(3)` (`destroy_items`); `resist()` may half. Display: Hallu `rn2_on_display_rng(6)` even when swallowed (C inits clq first). No `rnd(50)` (nd=2).

## C ↔ JS fidelity

Dispatch after energy. Swallow: display rng already rolled, silent return. Match `:1005–1012`. Empty room: eight POS checks, delays, `DISP_END`, TIME. Match.

Propagate: step then LIMIT/POS/peaceful/resist-str/unique/enqueue/draw. JS copies zap (C pass-by-value). WATER not in TYP (`DOOR=23`, WATER=18 not SPACE_POS). Closed/locked doors fail POS; open/broken doors pass. Pool/moat/drawbridge-up/lava extra. Match `:919–925` + `:958–999`.

Hostile `!resists_elec`: strength 3 (C also requires `!defended`). Shock-resist mon: strength 0 still enqueued so zhitm can show resist. Match except artifact `defended`.

BFS: snapshot `delay_tail`; copy dequeue; `notonhead` vs leftover `bhitpos` (C `gb.bhitpos` — chain does not set it; both use stale global). `zhitm(..., 15, 2)`: `d(2,6)`; skip bonus (C would INT-adjust, **no extra die**); resist zeros tmp but still `rn2(3)` destroy; `resist()` half; subtract mhp. Dead → `xkilled(XKILL_GIVEMSG)`; else shock+exclam; unseen head `map_invisible`. 0 dmg + canseemon → resists. Alive → `forcefight++` `wakeup(false)` `--`. Match `:1035–1070` except bonus/shieldeff/defended.

Then `if (!strength) continue`; `--`; forward; if strength<2 zero else maybe `uen--`; DIR_LEFT; DIR_RIGHT2 (`(dir+2)%8` from the already-left dir, i.e. original+1). Match `:1078–1092`.

Hallucination check: “Match C `zhitm`” while **the LIGHTNING arm is live `d`/`rn2`/`resist`**, not a 0-damage stub. It is **not** a full C `zhitm` (bonus/shieldeff/defended named). Do **not** stamp “Match C `defended`.” Do **not** stamp “Match C swallow engulfer.” Do **not** stamp “Match C SPE_CREATE_MONSTER.”

## Hallucinations / overclaim

Subject says the spell BFS-spreads via `cast_chain_lightning`/`zhitm` instead of `Nothing happens.` **True on the keep-path** (queue, terrain, peaceful skip, zhitm, wakeup, extra Pw, TIME). **True that swallowed is still a no-op after display rng.** **False until named for `defended` / bonus / shieldeff / engulfer.** D-log “empty TIME; swallow silent; peaceful skip; hostile dmg+Pw; shock-resist pline; closed-door/WATER block; open-door/POOL hit; hallu display rng” are the right falsifiers. Stamping **Addressed:** D-1400 for `:1588–1590` + `:951–1100` is fair. Do **not** treat fortress PASS as chain lightning.

## Density

One C function pair (propagate + cast) plus the `spelleffects` case that calls it. ~221 lines of JS — high end of §2b, still one locus family. Did not glue CREATE_MONSTER. Did not rewrite `confer_oc_oprop`.

## Branch-by-branch confirm

1. Empty: 8-dir POS, delays, END, TIME. Match.
2. Swallow: hallu/display rng then return; no zhitm. Match TODO.
3. Peaceful/tame adjacent: propagate return; no zhitm. Match.
4. Hostile: `d(2,6)` + maybe destroy; shock/xkilled; wakeup; strength 3 chain. Match keep-path minus INT bonus.
5. Shock-resist: zhitm 0 + resists pline; no further spread. Match minus shieldeff.
6. WATER / closed door: no enqueue. Match.
7. Open door / POOL: POS hit. Match.
8. Hallu: `rn2_on_display_rng(6)` beam. Match.
9. CREATE_MONSTER still other-otyp at this SHA. Named.
10. **Public-unhit** until a session casts chain lightning.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `AD_ELEC=6` and LIMIT 100 are C. Display rng is C’s hallu beam, not a seed index. Plain ESM. Dynamic `xkilled` import is in-process.

## Verification

Journal: private canary **21**/21 (C/JS grep; empty TIME; swallow silent; peaceful skip; hostile dmg+Pw; shock-resist pline; closed-door/WATER block; open-door/POOL hit; hallu display rng; CREATE_MONSTER still omit; CURE_BLINDNESS / FORCE_BOLT / JUMPING regression; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. Fortress PASS is not chain lightning.

## Actionable C-wrongs

None for Must-fix on **this** SHA. BFS/terrain/zhitm keep-path match `:951–1100`. Remaining gaps are named zhitm/defended omits, not a fake callee.

Named omits (map / already-Open, not Must-fix):

1. `defended(mon, AD_ELEC)` in propagate (`:975`) and zhitm
2. zhitm `spell_damage_bonus` (INT add, no extra `rn2`) / `shieldeff` / Knight questart double
3. zhitm `nd>2` `rnd(50)` blind (C skips at nd=2)
4. swallow engulfer damage (C TODO)
5. seffects / peffects / CREATE_MONSTER (next SHA)
6. `obfree(pseudo)`

Do not Must-fix “burn `rnd(50)` at nd=2” (C `nd>2`). Do not Must-fix “hit peacefuls” (C returns). Do not Must-fix “WATER is SPACE_POS” (WATER=18 < DOOR=23). Do not Must-fix “skip display rng when swallowed” (C inits clq first).

## Callers / RNG ledger

C per hit: `d(2,6)` then `rn2(3)`; optional `resist`. JS same. Bonus is not a die. Hallu display rng is not ISAAC gameplay. Public fortress never casts this envelope.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: SPE_CHAIN_LIGHTNING now BFS-spreads through live `zhitm` with C’s terrain/peaceful/Pw rules; `defended` and zhitm bonus stay named.
- Must-fix stays empty for this SHA; archive **Addressed:** D-1400 `dce9ac86` already stamped.
