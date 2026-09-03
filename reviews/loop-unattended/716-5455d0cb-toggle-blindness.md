# Review 716 — 5455d0cb — potion.c toggle_blindness Sting_effects(-1) (D-1755)

## Metadata
- Full / short hash: `5455d0cb35986c124461a132b89e966a8dd1e4a0` / `5455d0cb`
- Parent: `7d76ad12` (D-1754). This file audits **this SHA only** (seventh of nine `js/` commits since review **709**). Archive **Addressed:** D-1755 `5455d0cb`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 03:00:25 +0200
- D-id: **D-1755**
- Stats: `js/do.js` +94/−17; apply −35 net; mhitu −18; spell −15; trap −17; do_wear +8/−11; detect/artifact ±1. Total `js/` insertions **121** <250. Band **150–350**.
- Claims to close: Open `toggle_blindness` / `Sting_effects(-1)` after D-1746. Not Unaware `talk=FALSE`. Not Punished `set_bc`. `reviews/loop-2026-08-15/` has no unpaid Sting Must-fix.
- JS / map: `do.js` `toggle_blindness` / `make_blinded`; `do_wear.js` Blindf_*; clones retired. `c-js-map/turns.md`.
- Prior: **707** `see_monsters` MON_STILL_ARRIVING; this SHA is the Sting `-1` continue-glow.

## Intent vs deliverable

Git subject promises: Blind XOR calls `Sting_effects(-1)` (and Hallu/Eyes talk) instead of inlining botl+`vision_recalc` after D-1746.

`node scripts/csym.mjs toggle_blindness` → `potion.c:334–364`. `--callers`: `do_wear.c:1490` Blindf_on; `:1532` Blindf_off; `potion.c:329` from `make_blinded`. `make_blinded` `:260–331` (41 callers). `Sting_effects` `artifact.c:2465–2502` (`orc_count == -1` `:2474–2478`). `Blind_telepat` `youprop.h:156`; `Infravision` `:186`; `PermaBlind` `:94`; `Blindfolded` `:96`. `eyemsg`/`vismsg` `potion.c:257–258`.

```334:364:nethack-c/upstream/src/potion.c
void toggle_blindness(void) {
    boolean Stinging = (uwep && (EWarn_of_mon & W_WEP) != 0L);
    disp.botl = TRUE;
    gv.vision_full_recalc = 1;
    vision_recalc(0);
    if (Blind_telepat || Infravision || Stinging)
        see_monsters();
    if (Stinging)
        Sting_effects(-1);
    if (!Blind)
        learn_unseen_invent();
}
```

Parent: `do.js` `make_blinded` botl+`vision_recalc`+`learn_unseen_invent` only; Blindf_* the same; four local `make_blinded` clones (apply/mhitu/spell/trap) skipped Sting/`see_monsters`/talk. The diff **does** export `toggle_blindness` (Stinging `EWarn_of_mon & W_WEP`, `see_monsters`, `Sting_effects(-1)`, `learn_unseen_invent`), expand `make_blinded` Hallu/Eyes/itch/twitch/`strange_feeling` notoggle arms, Blindf_* `await toggle_blindness()`, retire the four clones, export `strange_feeling`. It **does not** set `talk=FALSE` when `Unaware`. Named. It **does not** `set_bc(0)` when `Punished` lose-sight. Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `toggle_blindness` `:334–364` | LIVE | all three C callers wired |
| `make_blinded` `:260–331` | LIVE repaired | XOR → toggle; Hallu/Eyes talk |
| `make_blinded_notoggle_talk` | JS helper | `Your(eyemsg)` / `Your(vismsg)` / `strange_feeling(NULL,NULL)` |
| `Sting_effects(-1)` | LIVE | artifact.js; `-1` arm already existed, now reached |
| `see_monsters` | LIVE | display.js D-1746 |
| `learn_unseen_invent` | LIVE | invent.js |
| `strange_feeling` | LIVE import | detect.js export this SHA |
| `haseyes` / `eyecount` | LIVE | monsters.js |
| apply/mhitu/spell/trap `make_blinded` | deleted clones | only `do.js` remains |
| `Unaware` talk=FALSE | OMIT named | |
| `Punished` `set_bc(0)` | OMIT named | |

`node scripts/sym.mjs`:

```
toggle_blindness js/do.js:2691   ASYNC
make_blinded     js/do.js:2747   ASYNC
Sting_effects    js/artifact.js:570   ASYNC
learn_unseen_invent js/invent.js:2603   sync
see_monsters     js/display.js:3997   sync
strange_feeling  js/detect.js:203   ASYNC
```

Grep `function make_blinded`: **only** `js/do.js:2747`. Clones NOT FOUND. Re-point: apply `potion_make_blinded` alias → `make_blinded`; mhitu/spell/trap locals → import. `node scripts/imports.mjs --can do.js artifact.js Sting_effects` / `do_wear.js do.js toggle_blindness` / `apply.js do.js make_blinded`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**`toggle_blindness` order.** C: Stinging probe; botl; `vision_full_recalc=1`; `vision_recalc(0)`; if telepat/infra/Stinging `see_monsters`; if Stinging `Sting_effects(-1)`; if `!Blind` `learn_unseen_invent`. JS the same. **Match call-for-call.** No rng. **Match.**

**Stinging.** C `uwep && (EWarn_of_mon & W_WEP)`. JS `u.uwep && (ewarn & W_WEP)` with `uprops[WARN_OF_MON].extrinsic \|\| EWarn_of_mon`. **Match youprop.** Not `uwep.oartifact === Sting` — C uses the warn bit (Orcrist/Grimtooth too). `Sting_effects` then gates the three artifacts. **Match.**

**`Blind_telepat` / `Infravision`.** C `HTelepat \|\| ETelepat` and `HInfravision \|\| EInfravision` (`youprop.h:156/:186`) — **not** gated on Blind. JS H/E plus uprops mirrors. **Match the macros.** `see_monsters` LIVE (arriving skip is D-1746, not this SHA).

**`Sting_effects(-1)` (`:2474–2478`).** If wielding Sting/Orcrist/Grimtooth and `warn_obj_cnt > 0`: `"%s is %s."` with `glow_verb(Blind ? 0 : warn_obj_cnt, TRUE)` so later “stops quivering/glowing” matches. Parent never passed `-1`. This SHA reaches it from toggle. **Match C.** Canary sighted glimmering / blind quivering.

**`make_blinded` probe (`:267–272`).** Save old timeout; `set_itimeout(HBlinded, xtime?1:0)`; probe `Blind`; restore old. JS `set_itimeout_HBlinded`. **Match.** Then talk arms; then commit `set_itimeout(HBlinded, xtime)`; then XOR toggle. JS `!==` ≡ C `^` on booleans. **Match.** Extra `u.Blind = Blind(); u.ublind = false` sticky mirrors — not a C `if`.

**Regain sight talk (`:277–283`).** Hallu “Far out!…cosmic”; else “You can see again.” JS `Hallucination()` youprop. **Match.**

**Clear timeout without toggle (`:284–297`).** `old && !xtime`: no-eyes/`PermaBlind` → `strange_feeling(NULL,NULL)`; `Blindfolded` (`EBlinded`) → `Your(eyemsg, eyes, itch)`; else Eyes `Your(vismsg, "brighten", Hallu?sadder:normal)`. JS helper. `PermaBlind` = `HBlinded & FROMOUTSIDE`. **Match.** `eyemsg` `"%s momentarily %s."` after `Your` → “Your eyes momentarily itch.” JS template. **Match.** `vismsg` `"vision seems to %s…"`. **Match.**

**Lose sight (`:300–308`).** Hallu bummer / cloud of darkness; **`if (Punished) set_bc(0)` named omit.** JS talk **Match**; no `set_bc`.

**Set timeout without toggle (`:310–323`).** twitch / dim / happier. **Match.**

**`Unaware` (`:274–275`).** C `talk = FALSE`. JS does not. Named. Unconscious/fainted still talks. Debt, not a stub inside `toggle_blindness`.

**Blindf_on/off (`:1490/:1532`).** C `toggle_blindness()` when changed. Parent botl+`vision_recalc` only (no Sting/`see_monsters`). This SHA `await toggle_blindness()`. **Match C.** gulp_blnd_check / birth-blind Eyes still named on Blindf_off/on comments.

**Clone retirement.** apply cream/towel/horn, mhitu AD_BLND/gaze/expl, spell cursed_book case 2, trap `domagictrap` now `await make_blinded(...)` LIVE. Parent clones skipped toggle. **That is the subject.** Do **not** restore them.

**Callee closure (`toggle_blindness` + `make_blinded` XOR).** LIVE: `vision_recalc`, `see_monsters`, `Sting_effects`, `learn_unseen_invent`, `Hallucination()`, `haseyes`, `eyecount`, `strange_feeling`, `body_part_latebound`, `Blind()`. OMIT named: `Unaware`, `set_bc`. STUB: **none**. Not “dispatch ported, callee stubbed.” `-1` is a real call into LIVE `Sting_effects`.

## Hallucinations / overclaim

Subject “Blind XOR calls `Sting_effects(-1)` and Hallu/Eyes talk”: **true**. D-log “four clones skipped”: **true** (only `do.js` remains). Do **not** stamp “Match C `Unaware` talk=FALSE.” Do **not** stamp “Match C `Punished` `set_bc`.” Do **not** stamp “Match C gulp_blnd_check.” Journal “fortress held” is not a Sting-wield go-blind screen. Cohort **7**/7. Sting `-1` **public-unhit**. Admit that.

## Density

§2b: `toggle_blindness` + the XOR caller `make_blinded` talk arms + the four clones that bypassed it. +121. Related Blindf_*. Did **not** glue `set_bc` / Unaware. Did **not** reopen D-1754 keepdogs. Did **not** rewrite `see_monsters`.

## Verification

D-log: save-oracle skip (untagged `potion.c:make_blinded`); node 13/13 (sighted glimmering / blind quivering / not-Stinging; go-blind; Hallu cosmic; Eyes dim; Blindfolded itch; no-eyes strange_feeling); green+strict seed8000/0900; CURRENT cohort **7**/7 + strict. Rule #2 clean. Sting `-1` **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (`Sting_effects(-1)` / `see_monsters` / Hallu talk match C; Unaware/`set_bc` named). Named: Unaware `talk=FALSE`; Punished `set_bc`; gulp_blnd_check. Do **not** restore apply/mhitu/spell/trap `make_blinded` clones. Do **not** call `Sting_effects(-1)` when `!Stinging`. Do **not** skip `vision_recalc(0)` (C comment: deferred-to-moveloop was a bug). Do **not** re-port D-1746 `see_monsters`. Do **not** add `Blind` clone #30.

Verdict: **ACCEPT-WITH-DEBT**
