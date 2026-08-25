# Review 454 — 8669b5b8 — allmain.c see_monsters Hallu / Warn_of_mon (D-1493)

## Metadata
- Full / short hash: `8669b5b85e23e8a0957159dc0feb7cf1a6b18d2f` / `8669b5b8`
- Parent: `b303c111` (D-1492). This file audits **this SHA only** (ninth of nine `js/` commits since review **445**). Archive **Addressed:** D-1493 was missing the short hash; this audit fills `8669b5b8`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-25 18:44:44 +0200
- D-id: **D-1493**
- Stats: 11 files, +228 / −120 — `js/allmain.js` +23 / −8; `js/artifact.js` +61; `js/display.js` +56. HEAD of this audit window.
- Claims to close: Open `allmain.c` `see_monsters` Hallu / Warn_of_mon (named from D-0672 once-per-input / D-0667 / D-1347 / review **309** doname glow). Not DETECT_MONSTERS expiry (D-1418). `reviews/loop-2026-08-15/` has no unpaid Hallu-resist Must-fix.
- JS / map: `allmain.js` once-per-input; `display.js` `Hallucination` / `Warn_of_mon` / `see_monsters`; `artifact.js` `Sting_effects`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **309** named `see_monsters` / `Sting_effects` `warn_obj_cnt` never written and SPFX_WARN conferral.

## Intent vs deliverable

Git subject promises: once-per-input uses C `Hallucination` (timeout and not resist) and `Warn_of_mon`, and `see_monsters` counts `warntype.obj` then `Sting_effects` instead of ignoring resist and skipping the glow count.

Pinned C `allmain.c` `:453–468`: `if (!context.mv || Blind)` then `Hallucination` → `see_monsters` / `see_objects` / `see_traps` / `swallowed(0)`; else if `Unblind_telepat || Warning || Warn_of_mon || any_visible_region()` → `see_monsters`. Macros `youprop.h` `:119–120` `:157` `:165` `:170`. Callee `display.c` `see_monsters` `:1487–1529`: `newsym` each live mon; `see_wsegs`; count `Warn_of_mon && (warntype.obj & mflags2)`; if count changed `Sting_effects` then store. `artifact.c` `Sting_effects` `:2466–2501`. Producer of `warntype.obj` is `set_artifact_intrinsic` SPFX_WARN `:824–833`.

Old JS: sticky `u.Hallucination || HHallucination` (fires under resist); else only Unblind_telepat / Warning; callee `newsym` only.

The diff **does** export C-shaped `Hallucination()` / `Warn_of_mon()`, add Warn_of_mon to the else-if, count `warntype.obj`, late-bind `Sting_effects`. It **does not** confer SPFX_WARN / write `warntype.obj`. Named. It **does not** port `any_visible_region`, `see_wsegs`, `MON_STILL_ARRIVING`, MATCH_WARN overlay, `make_blinded(-1)`. Named. `warntype.obj` is **never assigned** anywhere in `js/` (grep: read-only in this callee).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `Hallucination()` | C `youprop.h:120`, **wired** | H && !resist; not sticky `u.Hallucination` |
| `Warn_of_mon()` | C `:170`, **wired** | H \|\| E + uprops |
| `Warning(u)` | C `:165`, **already live** | |
| Unblind_telepat | C `:157` `ETelepat`, **wired** | flat + uprops extrinsic |
| `see_monsters` count + Sting | C `:1513–1524`, **wired** | producer still named |
| `see_objects` / `see_traps` / `swallowed` | C, **already live** | Hallu arm only |
| `Sting_effects` | C `:2466–2501`, **wired** | late-bind; not a stub |
| `glow_strength` / `glow_verb` / `bare_artifactname` | C, **already live** | |
| `glow_color` | C `:2427–2433`, **clone minus `hcolor`** | Hallu named |
| `maybe_lvltport_feedback` | C `do.c:2032–2039`, **clone** | prefix 15, materialize only |
| `set_sting_effects` | JS bind, **not C** | cycle break |
| `u_wield_art` | C `obj.h`, **clone** | `is_art(uwep)` |
| SPFX_WARN → `EWarn_of_mon` + `warntype.obj` | C `:824–833`, **named omit** | **no writer in `js/`** |
| `any_visible_region` / `see_wsegs` | C, **named omit** | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates. Rule #2 clean. **No new gameplay RNG** (`hcolor` still named). Public fortress: seed0383 Hallu is in the cohort; Sting glow and `warntype.obj` remain **public-unhit**.

## C ↔ JS fidelity

Once-per-input. C `:454–468` nested `Hallucination` then else-if four or-terms. JS Blind local still ORs sticky `u.Blind` (pre-existing). Hallu arm: four callees including `swallowed(0)`. **Match.** Else: Unblind_telepat / Warning / Warn_of_mon; **not** `any_visible_region`. Named. `vision_recalc` after the block is unchanged (pre-existing).

`Hallucination`. C `:120` is `HHallucination && !Halluc_resistance` with H = `uprops[HALLUC].intrinsic` (timeout word) and resist = H\|\|E of HALLUC_RES. JS display export: H flat or `uprops[HALLUC].intrinsic`; resist sticky / H / E / uprops. Does **not** treat sticky `u.Hallucination` as sufficient. **Match the macro.** Extra sticky `u.Halluc_resistance` can only over-resist (same as conferral flats). Under resist with H still set, C takes the **else** arm (telepat/Warning/Warn_of_mon), not objects/traps. Old JS took the Hallu arm. **This SHA matches C.**

Unblind_telepat. C is `ETelepat` only. JS `ETelepat || uprops[TELEPAT].extrinsic`. **Match** if the flat is the mask.

`see_monsters`. defer return; steed/ustuck `meverseen`; skip `!mx` and dead. C also skips `MON_STILL_ARRIVING`. Named. No `see_wsegs`. Named. Count only when `Warn_of_mon()` and `warntype.obj & mflags2`. Then if count ≠ stored, call Sting then assign. **Match `:1521–1524` order.** `newsym` hero if !steed. **Match.**

`Sting_effects`. Wield Sting / Orcrist / Grimtooth else return. `oldstr`/`newstr` from `glow_strength`. `-1` + old count > 0 continue-glow; else `newstr>0 && != oldstr` maybe materialize then start-glow (sighted) or quiver-slightly if `oldstr==0`; else `orc_count==0 && old>0` stop. Excalibur skip. **Match `:2470–2500`.** `glow_strength` C last arm is `(count > 0)` as 0/1; JS `? 1 : 0`. **Match `:2447`.** `glow_color` skips `hcolor`. Named. Local `Blind()` is H\|\|E and !B plus `uroleplay.blind`, not sticky. **Match youprop Blind** better than allmain’s sticky Blind.

`maybe_lvltport_feedback`. C `strncmpi(..., "You materialize", 15)` then `pline` and free. JS prefix lower-case 15 chars, `pline`, clear. Other `dfr_post_msg` left for `goto_level`. **Match `:2034–2039`.**

Hallucination check: subject “Sting counts `warntype.obj`” is **true of the loop**. Production count is **always 0** until SPFX_WARN writes `context.warntype.obj` and `EWarn_of_mon`. `Sting_effects` is **not** a stub; it is an **unreached** live callee. D-log “so doname glow `warn_obj_cnt` stayed 0” as a **fixed** symptom **overclaims**: doname still sees 0. Review **309** said both bits must ship; this SHA shipped the **counter**, not the **writer**.

`see_monsters` does not `await` the async `Sting_effects`. Because an `async` function runs **synchronously until the first `await`**, `oldstr` is read **before** `warn_obj_cnt` is assigned. That matches C. Later `pline` is fire-and-forget vs `bot`/`flush`. Latent until conferral.

## Hallucinations / overclaim

Subject Hallu resist + Warn_of_mon refresh: **true** of the once-per-input predicate. Subject Sting **count**: **true of the C loop**, **false as a production glow** (no `warntype.obj` writer). Stamping **Addressed:** D-1493 for Hallu resist + the count envelope is fair. Do **not** stamp “Match C SPFX_WARN conferral.” Do **not** stamp “Match C Sting `glimmering` doname.” Do **not** stamp “Match C `any_visible_region`.” Do **not** treat fortress PASS as a Sting glow. seed0383 Hallu exercises resist **display**, not `warntype.obj`.

## Density

One once-per-input predicate plus its callee count plus the glow helper C already used for doname. Named conferral left for a follow-up. Playbook §2b. Acceptable. Did not glue DETECT_MONSTERS (D-1418).

## Branch-by-branch confirm

1. H Hallu, no resist, `!mv`: monsters+objects+traps (+ swallow). **Match `:456–461`.**
2. H Hallu **and** resist: not that arm; else telepat/Warning/Warn_of_mon. **Match.** Old JS would still Hallu-refresh. **Fixed.**
3. Sticky `u.Hallucination` only, H==0: no Hallu arm. **Match macro.**
4. Warn_of_mon true: extra `see_monsters` even without telepat. **Match `:462`** *if* conferral sets the flag (named).
5. Two orcs, `warntype.obj & M2_ORC`, count 2→3→0: Sting start/stop **if** writer exists. Loop **matches `:1513–1524`.** Writer named.
6. Wield Excalibur: no Sting messages. **Match `:2470–2472`.**
7. `defer_see_monsters`: return, no count. **Match `:1492–1493`.**
8. `any_visible_region` still omitted. Named.
9. **Public-unhit** for Sting glow; Hallu resist **can** hit seed0383.

## Callers / RNG ledger

C once-per-input `:453–468` after `find_ac`. JS same place in `moveloop_core`. `see_monsters` also runs from `docrt`, `goto_level`, artifact conferral, blindness, and many display paths — those already called the `newsym`-only JS; they now also count if `Warn_of_mon` and `warntype.obj` are set.

C macros:

```119:120:nethack-c/upstream/include/youprop.h
#define Halluc_resistance (HHalluc_resistance || EHalluc_resistance)
#define Hallucination (HHallucination && !Halluc_resistance)
```

```170:170:nethack-c/upstream/include/youprop.h
#define Warn_of_mon (HWarn_of_mon || EWarn_of_mon)
```

Producer still named:

```824:833:nethack-c/upstream/src/artifact.c
    if (spfx & SPFX_WARN) {
        if (spec_m2(otmp)) {
            if (on) {
                EWarn_of_mon |= wp_mask;
                svc.context.warntype.obj |= spec_m2(otmp);
            } else {
                EWarn_of_mon &= ~wp_mask;
                svc.context.warntype.obj &= ~spec_m2(otmp);
            }
            see_monsters();
```

No new `rn2`/`rnd`. `glow_color` still skips `hcolor` (Hallu display-rng named). seed0383 can hit the resist predicate; Sting glow remains public-unhit.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No fs. No FORCE/DIAG. Late-bind is cycle avoidance, not a glyph stand-in. Prefix `"you materialize"` is C’s `strncmpi` 15, not a seed screen.

## Verification

D-log: private canary **43**/43 (Hallu resist/sticky/uprops; Warn_of_mon H/E; orc count 2→3→0; defer; glow_strength; materialize dfr; Sting/Orcrist/Grimtooth; Excalibur skip; Rule #2); green+strict seed8000/0900; cohort **7**/7 + strict including seed0383. Focused+green+**Hallu** cohort is relevant for the resist predicate. Orc-count canary is **private**; `warntype.obj` is not set in production — **public-unhit** for glow.

## Actionable C-wrongs

None that belong on Must-fix. The missing SPFX_WARN conferral / `warntype.obj` writer is a **named omit** (map / Open), not a clone that contradicts C at this locus. Named with conferral: `any_visible_region`, `see_wsegs`, MATCH_WARN, `make_blinded(-1)`, `hcolor`, await-Sting when conferral ships.

Verdict: **ACCEPT-WITH-DEBT**
