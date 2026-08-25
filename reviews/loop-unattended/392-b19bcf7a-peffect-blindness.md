# Review 392 — b19bcf7a — potion.c peffect_blindness (D-1432)

## Metadata
- Full / short hash: `b19bcf7a1eeb808f97b5270f7e4c7bfd7834bb9a` / `b19bcf7a`
- Parent: `e4876568` (review D-1423–D-1431). This file audits **this SHA only** (first of nine `js/` commits since review **391**). Archive **Addressed:** D-1432 `b19bcf7a` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 02:09:19 +0200
- D-id: **D-1432**
- Stats: 10 files, +133 / −22 — `js/potion.js` +43 / −1.
- Claims to close: Open `potion.c` `peffect_blindness` (named from D-1431 / review **391**). Not sleeping. `reviews/loop-2026-08-15/` has no unpaid blindness Must-fix.
- JS / map: `potion.js` `peffect_blindness` / `BlindedTimeout`; callee `do.js` `make_blinded`. `c-js-map/turns.md` + `debt.md`. Sleeping / potionhit still named at this SHA.
- Prior reviews this SHA claims to close: **391** follow-up named blindness.

## Intent vs deliverable

Git subject promises: “Match C potion.c peffect_blindness so quaffing a potion of blindness blinds (or peculiar-when-already-blind) instead of doing nothing.”

C `potion.c` `peffect_blindness` `:1073–1080`:

```
    if (Blind || ((HBlinded || EBlinded) && BBlinded))
        gp.potion_nothing++;
    make_blinded(itimeout_incr(BlindedTimeout,
                               rn1(200, 250 - 125 * bcsign(otmp))),
                 (boolean) !Blind);
```

`Blind` is `youprop.h:103` `((HBlinded || EBlinded) && !BBlinded)`. `BlindedTimeout` is `HBlinded & TIMEOUT` (`:93`). `peffects` `:1389–1390` then falls through to `:1424` `return -1`. `dopotion` `:624–640`: `retval >= 0` early-return; `potion_nothing` → peculiar/normal + `potion_unkn++`; then `makeknown` / `trycall` / `useup`.

Old JS: `peffects` default “not implemented”, return 0, no useup.

The diff **does** add `BlindedTimeout`, `peffect_blindness`, and the `POT_BLINDNESS` `return -1` arm. It **does not** port sleeping / gain ability / hallucination. Named. It **does not** retouch `make_blinded` Eyes / Hallu / Unaware / Punished / Sting arms (already named on `do.js`).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `peffect_blindness` | C `:1073–1080`, **wired** | |
| `BlindedTimeout` | C `youprop.h:93`, **clone matching C** | `(u.HBlinded\|0) & TIMEOUT` |
| `Blind()` | C `youprop.h:103`, **pre-existing clone** | extra `uroleplay.blind` (PermaBlind lives as `HBlinded & FROMOUTSIDE` in C) |
| `itimeout` / `itimeout_incr` | C `potion.c:56–71`, **pre-existing matching** | |
| `bcsign` | C `obj.h`, **imported live** (`rumors.js`) | blessed 1 / cursed −1 / else 0 |
| `rn1` | C `hack.h:1535` `rn2(x)+(y)`, **imported live** | |
| `make_blinded` | C `potion.c:261–331`, **imported live subset** | cloud / see-again / timeout / `vision_recalc`; Eyes talk / Unaware / Hallu / Punished `set_bc` / `Sting_effects` named |
| `peffects` POT_BLINDNESS | C `:1389–1390` + `:1424` `-1`, **wired** | |
| `peffect_sleeping` | C sibling, **named omit at this SHA** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** one `rn1(200, 250-125*bcsign)` = `rn2(200)` then add. Public fortress never quaffs this.

## C ↔ JS fidelity

JS:

```
    if (Blind() || ((HBlinded || EBlinded) && BBlinded)) {
        potion_nothing++;
    }
    await make_blinded(
        itimeout_incr(BlindedTimeout(), rn1(200, 250 - 125 * bcsign(otmp))),
        !Blind(),
    );
```

Branch 1 — already Blind (timed, blindfold, or both, Eyes **not** blocking): `potion_nothing++`. `dopotion` then peculiar (or hallu “normal”). Talk arg is `!Blind()` = false, so `make_blinded` does not print a second cloud. Timeout still extends. Match `:1075–1079`.

Branch 2 — Eyes override: Blind is false (`!BBlinded` fails) but `(H\|\|E) && B` is true → `potion_nothing++` and talk true. C `make_blinded` probe: `u_could_see` true, `set_itimeout(xtime?1:0)` still `!Blind` because BBlinded, so `can_see_now` true — not a sight toggle. C then takes `!old && xtime` Eyes-dim talk (`:310–323`). JS `make_blinded` **omits** that arm (named on `do.js` and in D-1432). Timeout still applied. Keep-path (no Eyes) is not this branch.

Branch 3 — sighted, no Eyes: no `potion_nothing`. `rn1` then `make_blinded(..., true)`. C losing-sight talk is Hallu “Oh, bummer…” else `"A cloud of darkness falls upon you."` (`:300–306`). JS prints only the non-Hallu cloud (Hallu variant named). Then `set_itimeout(&HBlinded, xtime)`. JS `set_itimeout_HBlinded` writes `u.HBlinded` **and** `uprops[BLINDED].intrinsic` TIMEOUT bits. Match keep-path timeout.

`itimeout_incr`: `(old & TIMEOUT) + incr`, then `itimeout` clamp `>= TIMEOUT → TIMEOUT`, `< 1 → 0`. JS copy matches `:56–71`. `TIMEOUT` is `0x00FFFFFF` (`const.js` ≡ `prop.h:135`).

Duration: `rn2(200) + (250 - 125*bcsign)` → uncursed 250..449, blessed 125..324, cursed 375..574. C arg eval: first arg (including `rn1`) then `!Blind`. `itimeout_incr` does not mutate `HBlinded`, so the talk snapshot is pre-timeout Blind. JS does the same.

`peffects` returns `-1` so `dopotion` does not early-return (`retval >= 0`). C `:1424` same. Already-blind peculiar is `dopotion` `:627–631`, not inside the helper — JS already had that. Useup happens.

Callee `make_blinded` is **not** a stub: it probes Blind, sets TIMEOUT, prints cloud/see-again, `vision_recalc(0)`, `learn_unseen_invent` on regain. It is a **subset**: Unaware does not force `talk=FALSE`; Hallu talk strings missing; Eyes dim/brighten and blindfold itch/twitch missing; Punished `set_bc(0)` missing; `toggle_blindness` Sting / Blind_telepat / Infravision `see_monsters` missing. Those are named omits on the callee, not a dispatch-to-no-op lie.

`Blind()` adds `uroleplay.blind` before the C macro. C PermaBlind is `HBlinded & FROMOUTSIDE`, not the Blind macro. If JS permablind sets `uroleplay.blind` **without** `HBlinded`, JS would `potion_nothing++` and silence talk while C would not. Typical permablind sets FROMOUTSIDE. Pre-existing clone, not a new keep-path contradiction on this SHA.

## Hallucinations / overclaim

Subject says quaffing blinds, or peculiar-when-already-blind, instead of doing nothing. **True** on the keep-path: sighted → cloud + TIMEOUT add; already Blind → peculiar + timeout add, no second cloud; Eyes still seeing + peculiar; dknown `makeknown` when not `potion_unkn`; useup via `-1`. **False until named** for potionhit / potionbreathe / mix / dipsink POT_BLINDNESS, remaining peffects at this SHA, and Eyes/Hallu/Unaware/Punished talk inside `make_blinded`. Stamping **Addressed:** D-1432 for `:1073–1080` is fair. Do **not** stamp “Match C `make_blinded` Eyes-dim / Hallu bummer / `set_bc`.” Do **not** treat fortress PASS as a blindness quaff.

This is **not** “Match C dispatch while the callee is a stub.” `do.js` `make_blinded` is live.

## Density

One peffect plus a one-line `BlindedTimeout` clone. ~40 lines of JS. Playbook §2b right size. Did not glue sleeping. Acceptable.

## Branch-by-branch confirm

1. Sighted uncursed: `rn2(200)+250` → 250..449; cloud; no peculiar. Match.
2. Blessed: `+125` → 125..324. Match.
3. Cursed: `+375` → 375..574. Match.
4. Already HBlinded timeout, no Eyes: peculiar; talk false; timeout adds. Match.
5. EBlinded blindfold: Blind true; peculiar; timeout adds. Match.
6. BBlinded + H (Eyes): peculiar; still seeing; C Eyes-dim talk **named omit** in callee; timeout adds. Match `potion_nothing` / timeout; not the Eyes pline.
7. `peffects` `-1` → useup. Match `:1424` / `:639`.
8. Sleeping / gain ability still default at this SHA. Named.
9. **Public-unhit.**

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No recorded coordinates. Plain ESM. Dynamic `import('./do.js')` is a cycle break, not a stub.

## Verification

Journal: private canary **14**/14 (C/JS grep; uncursed cloud + TIMEOUT 250..449 + `rn2(200)`; blessed 125..324; cursed 375..574; already-blind peculiar no cloud + timeout add; EBlinded blindfold peculiar; BBlinded+H Eyes still seeing + peculiar; sighted dknown makeknown; sleeping / gain ability still not-implemented; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD (score rewrite at end of this review iter). Fortress PASS is not a blindness quaff.

## Actionable C-wrongs

None for Must-fix on **this** SHA. `:1073–1080` call order, `potion_nothing` predicate, `rn1`/`bcsign` duration, talk snapshot, and `-1` useup match C. Callee is live.

Named omits (map / Open, not Must-fix):

1. `peffect_sleeping` / gain ability / hallucination (later SHAs in this audit)
2. potionhit / potionbreathe / mix / dipsink POT_BLINDNESS
3. `make_blinded` Eyes-dim/brighten, Hallu talk, Unaware, Punished `set_bc`, `Sting_effects` / Blind_telepat `see_monsters`
4. `Blind()` `uroleplay.blind` extra vs C `PermaBlind` = `HBlinded & FROMOUTSIDE`

Do not Must-fix “already-blind should skip `make_blinded`” (C always calls). Do not Must-fix “Eyes should skip timeout” (C extends). Do not Must-fix “dispatch is a stub.”

## Callers / RNG ledger

C callers: `dopotion` → `peffects`. New RNG: one `rn2(200)` per quaff. Public fortress does not quaff this.

Verdict: **ACCEPT-WITH-DEBT**
