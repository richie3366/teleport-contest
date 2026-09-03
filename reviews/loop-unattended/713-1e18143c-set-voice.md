# Review 713 — 1e18143c — sounds.c set_voice / sndprocs.h SetVoice (D-1752)

## Metadata
- Full / short hash: `1e18143c311d6f705afb41fa976f3d730dc19139` / `1e18143c`
- Parent: `97f49d11` (D-1751). This file audits **this SHA only** (fourth of nine `js/` commits since review **709**). Archive **Addressed:** D-1752 `1e18143c`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 02:14:27 +0200
- D-id: **D-1752**
- Stats: `js/sndprocs.js` +33/−4; `js/sounds.js` +20/−2; `js/shk.js` +20/−12; `js/dokick.js` +17/−9; `js/mhitu.js` +14/−4. Total `js/` insertions **104** <250. Band **150–350** (id >454 ⇒ 200-floor).
- Claims to close: Open `set_voice` / SetVoice after D-1750 / D-1751 (comments deferred the empty macros). Not `sound_speak`. Not `beg`/`maybe_gasp`. `reviews/loop-2026-08-15/` has no unpaid SetVoice Must-fix.
- JS / map: `sounds.js` `set_voice`; `sndprocs.js` `SetVoice` + `voice_*`; live sites mhitu/dokick/shk/domonnoise. `c-js-map/data.md` / `turns.md`.
- Prior: **711** named contest-empty SetVoice (no JS calls yet); **712** named ghitm SetVoice.

## Intent vs deliverable

Git subject promises: contest `!SND_LIB` / `!SND_SPEECH` no-ops exist and live verbalize sites call them, instead of omitting the symbols after D-1751.

`node scripts/csym.mjs set_voice` → `sounds.c:2160–2182`. `--callers set_voice`: `shk.c:843` welcome; `:3577`/`:3589` addtobill; `sndprocs.h:251` (SND_LIB `SetVoice` wrapper). `SetVoice` macros `:249–252` (calls `set_voice`) and `:276` (empty, no SND_LIB). `enum voice_moreinfo` `:159–167`. `domonnoise` epilogue `sounds.c:1222–1241` (`SetVoice` `:1234` Death / `:1237` else; `sound_speak` `:1235`).

```2160:2182:nethack-c/upstream/src/sounds.c
void
set_voice(...)
{
#ifdef SND_SPEECH
    ... gv.voice.* ...
    gp.pline_flags |= PLINE_SPEECH;
#endif
}
```

```276:276:nethack-c/upstream/include/sndprocs.h
#define SetVoice(mon, tone, vol, moreinfo)
```

Parent: no `set_voice` / `SetVoice`; ghitm/doseduce/mayberem/shop comments said “named”. The diff **does** add empty `set_voice` and empty `SetVoice` + voice bits (same shape as `Soundeffect`), wire ghitm shk/priest/gd/merc, doseduce/mayberem Cha/`y_n`/verbalize (not leap-day gloves), shop enter/leave/addtobill/dopay, Death `SetVoice(null,0,80,voice_death)` after `ucase`. It **does not** implement the `#ifdef SND_SPEECH` body (contest has no SND_SPEECH — Match compiled C). It **does not** add `sound_speak`. Named. It **does not** wire remaining shk pick_pick/kops/pay-bill, vault/priest/sit, `beg`/`maybe_gasp`/MS_ARREST. Named. Leap-day gloves verbalize still has **no** SetVoice — that **matches C** (`mhitu.c:2145–2156`).

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `set_voice` `:2160–2182` | LIVE no-op | body is `#ifdef SND_SPEECH`; contest compiled out |
| `SetVoice` `:276` | LIVE no-op | empty macro; does **not** call `set_voice` without SND_LIB |
| `voice_*` bits `:159–167` | LIVE consts | match enum values |
| `SetVoice` SND_LIB `:249–252` | N/A contest | would call `set_voice`; this build has no SND_LIB |
| ghitm SetVoice sites | LIVE wired | shk credit/scum, priest, gd, merc ×3 |
| doseduce/mayberem SetVoice | LIVE wired | Cha `y_n` + verbalize; **not** leap-day gloves |
| `u_entered_shop` welcome | LIVE `set_voice` | C `:843` is `set_voice` not SetVoice |
| `u_entered_shop` other verbalize | LIVE SetVoice | Invis/angry/surcharge/tools/steed |
| `u_left_shop` unpaid | LIVE SetVoice | |
| `addtobill` quotes | LIVE `set_voice` | C `:3577`/`:3589` |
| `dopay` thank-you | LIVE SetVoice | |
| Death epilogue | LIVE SetVoice | `sound_speak` OMIT named |
| `verbl_msg_mcan` arm | OMIT named | C `:1224–1226` |
| `sound_speak` | OMIT named | NOT FOUND in js/ |
| remaining shk/vault/priest/sit | OMIT named | |
| `beg` / `maybe_gasp` / MS_ARREST | OMIT named | |

`node scripts/sym.mjs`:

```
set_voice        js/sounds.js:48   sync
SetVoice         js/sndprocs.js:47   sync
voice_death      js/sndprocs.js:24   sync  export const
sound_speak      NOT FOUND
```

No clone→import of a prior local SetVoice (parent had none). `node scripts/imports.mjs --can shk.js sounds.js set_voice` / `shk.js sndprocs.js SetVoice`: **ALREADY**. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**`set_voice` body.** C entire implementation is `#ifdef SND_SPEECH`. Contest `SPEECHONLY UNUSED`; the function exists and returns without touching `gv.voice`. JS `void` all four args. **Match compiled C.** Direct C callers still type-check the symbol; JS exports it for those sites.

**`SetVoice` without SND_LIB.** C `#define SetVoice(...)` empty at `:276` — the call becomes a no-op and does **not** invoke `set_voice`. JS `SetVoice` voids args and does **not** call `set_voice`. **Match.** SND_LIB wrapper `:249–252` is not this build.

**`voice_moreinfo`.** C enum: nothing=0, audioassistant=1, artifact=2, deity=4, oracle=8, throne=0x10, death=0x20. JS the same hex. Unused in contest except Death `voice_death`. **Match the bits.**

**ghitm (`:338`, `:347`, `:359`, `:387`, `:393`, `:396`).** C SetVoice then credit/scum, priest, guard verbalize, merc three arms. Parent **712** named these. This SHA inserts `SetVoice(mtmp,0,80,0)` in those exact arms (robbed shop path still has **no** SetVoice — C robbed arm has none). **Match.**

**mayberem (`:2326`, `:2336`).** C SetVoice before `y_n` and before verbalize; **not** on Deaf take-off pline. JS the same. **Match.** Does not fix **711** `hero_Deaf`.

**doseduce.** C SetVoice: succubus Cha `y_n` `:2037`; incubus Cha `y_n` `:2068`; leftover-armor “I wish” `:2142` (`!(ld()&&female)`); house `:2288`. **Not** leap-day gloves verbalize `:2152`. JS this SHA adds those four and leaves leap-day without SetVoice. **Match C, not an over-wire.**

**`u_entered_shop` welcome (`:842–843`).** C `set_voice` then Hello welcome. JS `set_voice(shkp,0,80,0)` on that arm only. Other enter verbalizes use `SetVoice` like C `:609`/`:802`/`:815`/`:825`/`:883`/`:897`. **Match set_voice vs SetVoice split.**

**`addtobill` (`:3577`, `:3589`).** C `set_voice` before the quoted price plines. JS `set_voice` on both quote arms. **Match.** Silent remote still named.

**`u_left_shop` unpaid / `dopay` thank-you.** C SetVoice then verbalize. JS the same. **Match.**

**`domonnoise` epilogue (`:1222–1241`).** C: `pline_msg` pline; else `mcan && verbl_msg_mcan` SetVoice + `verbalize1`; else `verbl_msg`: Death `pline1(ucase)` then `SetVoice(NULL,0,80,voice_death)` then `sound_speak`; else SetVoice + `verbalize1`. JS: pline_msg; skip mcan arm (named); Death `pline(ucase)` + `SetVoice(null,0,80,voice_death)` + **no** `sound_speak` (named); else SetVoice + `verbalize`. **Match the wired arms.** `sound_speak` NOT FOUND — named omit, not a stub inside `set_voice`.

**No rng.** `set_voice` / SetVoice burn none. Wiring them does not add `rn2`. **Match.**

**Callee closure (this SHA’s new symbols + wired sites).** LIVE: `set_voice` (empty body = compiled C), `SetVoice` (empty macro = compiled C), `verbalize`/`y_n`/`pline` already LIVE. OMIT named: `sound_speak`; `verbl_msg_mcan`; remaining shk/vault/priest/sit SetVoice; `beg`/`maybe_gasp`/MS_ARREST. STUB: **none** — empty functions are C’s contest semantics, not TODO stubs. Not “dispatch ported, callee stubbed.” Do **not** treat empty SetVoice as a Must-fix to invent SND_LIB.

## Hallucinations / overclaim

Subject “contest `!SND_LIB` / `!SND_SPEECH` no-ops exist and live verbalize sites call them”: **true**. Do **not** stamp “Match C `#ifdef SND_SPEECH` `gv.voice` assignment.” Do **not** stamp “Match C `sound_speak`.” Do **not** stamp “Match C `verbl_msg_mcan`.” Do **not** stamp “Match C remaining pick_pick/kops/pay-bill SetVoice.” Do **not** stamp “Match C leap-day gloves SetVoice” — C has none. Do **not** stamp “Match C `hero_Deaf`” (still **711**). Journal “fortress held” is not a Death `voice_death` screen. Empty no-ops are **public-unhit** by construction; canary was node 11/11 (exports, bits, no-throw). Admit that.

## Density

§2b: the two C symbols (`set_voice` + `SetVoice`) plus the live sites that already verbalize. +104. Related voice bits and Death `voice_death`. Did **not** glue `sound_speak` / `beg` / MS_ARREST. Did **not** reopen D-1751 `hidden_gold`. Did **not** “fix” **711** Deaf.

## Verification

D-log: save-oracle skip (untagged `sounds.c:set_voice`); node 11/11; green+strict seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean. No-ops **public-unhit**. Admit that.

## Actionable C-wrongs

None for Must-fix (contest-empty functions match compiled C; remaining sites are named). Named: `sound_speak`; `verbl_msg_mcan`; shk pick_pick/kops/pay-bill; vault/priest/sit/apply/pray SetVoice; heaven `u_left_shop` caller; `beg`/`maybe_gasp`/MS_ARREST. Do **not** make `SetVoice` call `set_voice` on this build (C empty macro does not). Do **not** add `sound_speak` that `fopen`s. Do **not** SetVoice the leap-day gloves line. Do **not** re-port D-1750/D-1751. **711** `hero_Deaf` remains Must-fix from review **711**, not this SHA.

Verdict: **ACCEPT-WITH-DEBT**
