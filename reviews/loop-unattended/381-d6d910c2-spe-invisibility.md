# Review 381 — d6d910c2 — spell.c spelleffects SPE_INVISIBILITY peffects (D-1421)

## Metadata
- Full / short hash: `d6d910c205c248d9e7a05939deb2fc4a067b6bf1` / `d6d910c2`
- Parent: `9ab114b4` (D-1420). This file audits **this SHA only** (eighth of nine `js/` commits since review **373**). Archive **Addressed:** D-1421 `d6d910c2` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-24 23:18:38 +0200
- D-id: **D-1421**
- Stats: 12 files, +292 / −44 — `js/potion.js` +109; `js/timeout.js` +61; `js/spell.js` +14.
- Claims to close: Open `spell.c` `spelleffects` SPE_INVISIBILITY peffects (named from D-1420). Not WAN_SPEED_MONSTER. `reviews/loop-2026-08-15/` has no unpaid invisibility Must-fix.
- JS / map: `spell.js` `spelleffects`; `potion.js` `peffect_invisibility`; `timeout.js` INVIS expiry. `c-js-map/turns.md`. Remaining peffects / potionhit / mix / amulet drain still named.
- Prior reviews this SHA claims to close: **380** named INVISIBILITY and warned **must not** skilled-bless.

## Intent vs deliverable

Git subject promises: “Match C spell.c spelleffects SPE_INVISIBILITY so casting that spell applies peffect_invisibility (timeout / wrapping / cursed aggravate) instead of printing Nothing happens.”

C `spell.c` `:1534–1546`: HASTE/DETECT_TREASURE/DETECT_MONSTERS/LEVITATION/RESTORE_ABILITY skilled-bless then `FALLTHROUGH`; **SPE_INVISIBILITY is the FALLTHROUGH label** — `(void) peffects(pseudo)` with **no** `pseudo->blessed = 1`. Callee `potion.c` `peffects` `:1352–1354` → `peffect_invisibility` `:811–838`: spell + `BInvis` + mummy wrapping → `You_feel("rather itchy under %s.", yname(uarmc))` return; else `Invis||Blind||BInvis` → `potion_nothing++` else `self_invis_message()`. Blessed `!rn2(HInvis?15:30)` → `HInvis |= FROMOUTSIDE` else `incr_itimeout(&HInvis, d(6-3*bcsign,100)+100)`. `newsym`. Cursed: presence pline, `aggravate()`, `HInvis &= ~FROMOUTSIDE`. `timeout.c` `:759–767`: `newsym`; if `!Invis && !BInvis && !Blind` You no-longer-invisible / can-no-longer-see-through-yourself; `stop_occupation()`.

Old JS: SPE_INVISIBILITY still other-otyp `Nothing happens.`; INVIS TIMEOUT expired silently.

The diff **does** add a **separate** `else if (SPE_INVISIBILITY)` that calls `peffects` **without** setting `pseudo.blessed`. That is the keep-path review **380** demanded. It ports wrapping itch, timeout/`FROMOUTSIDE`, cursed `aggravate`, and expiry You. It **does not** port remaining peffects or potionhit/mix. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `spelleffects` SPE_INVISIBILITY | C `:1544–1546`, **wired** | FALLTHROUGH peffects; **no** skilled bless |
| `peffect_invisibility` | C `:811–838`, **wired** | |
| wrapping itch | C `:815–818`, **wired** | `yname(uarmc)` live (`objnam.js`) |
| `self_invis_message` | C `potion.c`, **imported live** | `trap.js` |
| `incr_itimeout` HInvis / `FROMOUTSIDE` | C, **wired** | `d(6-3*bcsign,100)+100` |
| `rn2(15\|30)` perm | C `:825–826`, **imported live** | blessed only |
| `aggravate` | C `wizard.c`, **imported live** | cursed; W-tower named |
| `newsym` | C, **imported live** | after timeout and on expiry |
| INVIS expiry You | C `:759–767`, **wired** | `stop_occupation` live |
| `Invis()` / `BInvis()` | C `youprop.h`, **clone** | wrapping stand-in for omitted `w_blocks` |
| remaining peffects | C, **named omit** | this SHA |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** unblessed `d(6-3*bcsign,100)+100` (uncursed 106–700; cursed 109–1000; blessed timeout arm 103–400); blessed `rn2(15 or 30)` for `FROMOUTSIDE`. Public fortress never casts this.

## C ↔ JS fidelity

**Skilled bless:** C puts INVISIBILITY **after** `FALLTHROUGH` so skilled does **not** bless the pseudo. JS does **not** add SPE_INVISIBILITY to the `role_skill >= P_SKILLED` list; it is a sibling `else if` that only `await peffects(pseudo)`. Match `:1544–1546`. HASTE_SELF in the previous arm still blesses. Match. This is the branch that would have been a Must-fix if the porter had glued invisibility onto the bless group.

Wrapping: `oclass === SPBOOK_CLASS && BInvis() && uarmc.otyp === MUMMY_WRAPPING` → itchy `yname` return, **no** timeout. Match `:815–818`. `BInvis()` ORs `uprops[INVIS].blocked` and a worn-wrapping stand-in because `setworn` still names `w_blocks`. Keep-path wrapping still itches.

Already invisible / Blind / BInvis: `potion_nothing++`, skip `self_invis_message`, still apply timeout/`FROMOUTSIDE`. Match `:820–824`. `self_invis_message` is the live `trap.js` Gee/Far-out body, not a stub.

Dice: `d(n,100)+100` with `n = 6-3*bcsign`. Uncursed bcsign 0 → `d(6,100)+100` = 106–700. Cursed +1 → `d(3,100)+100` = 103–400 wait: bcsign cursed is **−1**, `6-3*(-1)=9` → `d(9,100)+100` = 109–1000. Blessed +1 → `6-3=3` → `d(3,100)+100` = 103–400. Match C `d(6-3*bcsign,100)+100`. Blessed perm: `!rn2(HInvis?15:30)` then `HInvis |= FROMOUTSIDE` **instead of** timeout. Match `:825–828`. Cursed **still** rolls timeout first, then `aggravate` and strip `FROMOUTSIDE`. Match `:830–836`.

`aggravate` (`wizard.js:147`) wakes `fmon` (`msleeping=0`, strategy bits, `!mcanmove && !rn2(5)` unfreeze). Live. Named omit: `In_W_tower` skip.

Expiry: INVIS is **not** `TIMEOUT_DEDICATED`, so the generic `--` loop hits it. `newsym` then `!Invis && !BInvis && !Blind` You strings + `stop_occupation()`. Match `:759–767`. `See_invisible()` here ORs H/E **and** `uprops[SEE_INVIS]` — the expiry message arm, not the 374 `knowninvisible` learnwand clone.

Hallucination check: “Match C peffect_invisibility / timeout” while **`self_invis_message`, `aggravate`, `d`/`rn2`, and expiry You are live** is not a dispatch-stub lie. “Match C skilled-blessed invisibility potion” **would** be — and this SHA does **not** do that. Do **not** stamp “Match C WAN_SPEED_MONSTER.”

## Hallucinations / overclaim

Subject says casting invisibility applies timeout / wrapping / cursed aggravate instead of `Nothing happens.` **True for unskilled and skilled (both unblessed pseudo → 106–700 + self-invis msg, no `FROMOUTSIDE` unless a blessed potion).** **True that mummy wrapping itches and skips timeout.** **True that cursed potions timeout then aggravate and strip perm.** **True that expiry prints the C You pair.** Stamping **Addressed:** D-1421 for `:811–838` + `:1544–1546` + `:759–767` is fair. Do **not** treat fortress PASS as an invisibility cast.

## Density

One C peffect plus the expiry the timeout needs, plus a **split dispatch** so FALLTHROUGH is not silently blessed. ~180 lines of JS. Playbook §2b. Did not glue WAN_SPEED. Right size.

## Branch-by-branch confirm

1. Unskilled spell, not wrapping: timeout 106–700; `self_invis_message`; no `FROMOUTSIDE`. Match.
2. Skilled spell: **still** unblessed; same timeout band; **no** `rn2(15|30)` perm. Match FALLTHROUGH.
3. Wrapping + spell: itchy `yname`; return; no timeout. Match.
4. Already Invis: `potion_nothing`; extend timeout; no self-msg. Match.
5. Blessed potion: `FROMOUTSIDE` or 103–400. Match.
6. Cursed potion: 109–1000 + presence + `aggravate` + strip perm. Match.
7. Expiry: `newsym` + You pair + `stop_occupation`. Match.
8. Skilled HASTE_SELF still blesses (previous arm). Match.
9. Remaining peffects. Named.
10. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. Dice are C `d`/`rn2`, not a recorded index. Plain ESM.

## Verification

Journal: private canary **18**/18 (C/JS grep; Rule #2; NODIR escape; unskilled timeout 106–700 + self-invis msg + no `FROMOUTSIDE`; skilled still no `FROMOUTSIDE`; mummy wrapping itchy + no timeout; uncursed potion; cursed timeout 109–1000 + presence + `aggravate` wake; blessed `FROMOUTSIDE` or 103–400; already-invis extends without self-msg; `nh_timeout` expiry both messages; skilled `SPE_HASTE_SELF` still blesses; `SPE_RESTORE_ABILITY` still not `Nothing happens`); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD (score rewrite at end of this review iter). Fortress PASS is not invisibility.

## Actionable C-wrongs

None for Must-fix on **this** SHA. FALLTHROUGH without skilled bless matches `:1544–1546`. Timeout/`FROMOUTSIDE`/wrapping/cursed `aggravate`/expiry match `:811–838` + `:759–767`.

Named omits (map / Open, not Must-fix):

1. remaining peffects (polymorph / gain energy / acid / gain level / blindness)
2. potionhit / potionbreathe / mix invis
3. amulet drain
4. `aggravate` `In_W_tower` skip
5. `setworn` `w_blocks` (wrapping stand-in in `BInvis()`)

Do not Must-fix “skilled spell should bless” (C FALLTHROUGH does not). Do not Must-fix “wrapping should still timeout” (C returns). Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `spelleffects` SPE_INVISIBILITY; `dopotion` POT_INVISIBILITY. New RNG: duration `d` and blessed `rn2`; cursed `aggravate` may `rn2(5)`. Public fortress does not cast this.

Verdict: **ACCEPT-WITH-DEBT**
