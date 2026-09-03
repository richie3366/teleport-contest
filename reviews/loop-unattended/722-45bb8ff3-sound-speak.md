# Review 722 — 45bb8ff3 — sounds.c sound_speak / sndprocs.h SoundSpeak (D-1761)

## Metadata
- Full / short hash: `45bb8ff3df07d512d45945cc3caa10a799f9396b` / `45bb8ff3`
- Parent: `a23a8ec8` (D-1760). This file audits **this SHA only** (fourth of nine `js/` commits since review **718**). Archive **Addressed:** D-1761 `45bb8ff3`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 04:56:52 +0200
- D-id: **D-1761**
- Stats: `js/sounds.js` +20/−2; `js/sndprocs.js` +24/−4; `js/display.js` +3. Total `js/` insertions **47** <250. Band **150–350**.
- Claims to close: Open `sound_speak` after D-1760 / review **713** (named `sound_speak`; SetVoice LIVE). Not `beg`/`maybe_gasp`. `reviews/loop-2026-08-15/` has no unpaid sound_speak Must-fix.
- JS / map: `sounds.js` `sound_speak` / Death epilogue; `sndprocs.js` `SoundSpeak`; `display.js` `putmesg`. `c-js-map/data.md`.
- Prior: **713** named `sound_speak`; Death already had SetVoice after `ucase`.

## Intent vs deliverable

Git subject promises: contest `!SND_SPEECH` no-op, Death `sound_speak(tmpbuf)` after SetVoice, and `SoundSpeak` empty without SND_LIB instead of omitting the symbols after D-1760.

`node scripts/csym.mjs sound_speak` → `sounds.c:2184–2220`. `--callers sound_speak`: `sounds.c:1235` Death; `cmd.c:5534` yn (`#ifdef SND_SPEECH`); `sndprocs.h:245` SND_LIB `SoundSpeak`. `SoundSpeak` `:240–246` (calls `sound_speak`) and `:275` (empty). `putmesg` `pline.c:64–80` (`:79` `SoundSpeak(line)`). `ucase` `hacklib.c:101–110`. `pline1` `hack.h:1026`. `set_voice` D-1752. `SND_SPEECH`: **NOT FOUND** (contest off).

```1228:1239:nethack-c/upstream/src/sounds.c
        if (ptr == &mons[PM_DEATH]) {
            char tmpbuf[BUFSZ];
            pline1(ucase(strcpy(tmpbuf, verbl_msg)));
            SetVoice((struct monst *) 0, 0, 80, voice_death);
            sound_speak(tmpbuf);
        } else {
            SetVoice(mtmp, 0, 80, 0);
            verbalize1(verbl_msg);
        }
```

```2184:2220:nethack-c/upstream/src/sounds.c
void
sound_speak(const char *text SPEECHONLY)
{
#ifdef SND_SPEECH
    ... soundprocs.sound_verbal ...
#endif
}
```

Parent: Death `pline(ucase)` + SetVoice; comment “sound_speak named omit”; no `SoundSpeak` on pline. The diff **does** empty `sound_speak`, Death `tmpbuf=ucase` then `pline` / SetVoice / `sound_speak(tmpbuf)`, empty `SoundSpeak` (does **not** call `sound_speak`), `pline_after_consume` `SoundSpeak(line)` after flush like `putmesg`. It **does not** implement the SND_SPEECH / `sound_verbal` body. Named. It **does not** wire yn_function (`#ifdef SND_SPEECH` compiled out). Named.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `sound_speak` `:2184–2220` | LIVE no-op | `#ifdef SND_SPEECH` compiled out |
| Death `:1229–1235` | LIVE repaired | tmpbuf + SetVoice + sound_speak |
| `SoundSpeak` `:275` | LIVE no-op | contest empty; SND_LIB arm not used |
| `putmesg` `:79` | LIVE repaired | SoundSpeak after putstr analogue |
| `set_voice` / `SetVoice` | LIVE kept | D-1752 |
| `ucase` | LIVE import | hacklib.js |
| SND_SPEECH body | OMIT named | |
| yn `sound_speak` `:5534` | OMIT named | compiled out |

`node scripts/sym.mjs`:

```
sound_speak      js/sounds.js:69   sync
SoundSpeak       js/sndprocs.js:65   sync
set_voice        js/sounds.js:54   sync
SetVoice         js/sndprocs.js:50   sync
voice_death      js/sndprocs.js:27   sync
ucase            js/hacklib.js:107   sync
pline_after_consume NOT EXPORTED — 1 LOCAL  display.js  => Do NOT write #2
```

Re-points: Death omit comment → `sound_speak` call; new `SoundSpeak` + display import. `node scripts/imports.mjs --can display.js sndprocs.js SoundSpeak`: **ALREADY**. sndprocs is a leaf (generated seffects only) — no TDZ into display. FORCE/DIAG/`getRngLog`/`fastforward`/seed names: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**`sound_speak` body.** Entire function is `#ifdef SND_SPEECH`. Contest C has no SND_SPEECH → compiled empty. JS `void text`. **Match compiled C.** Implementing `sound_verbal` would be the SND_LIB port, not this Open.

**Death (`:1229–1235`).** `strcpy` into tmpbuf, `ucase`, `pline1`, `SetVoice(NULL,0,80,voice_death)`, `sound_speak(tmpbuf)`. JS `tmpbuf = ucase(verbl_msg)` (LIVE `ucase` returns the uppercased string; C mutates a copy — same characters), `pline(tmpbuf)`, SetVoice, `sound_speak(tmpbuf)`. Parent skipped the last call. **Match source shape.** Contest `sound_speak` still no-ops — no extra RNG. `voice_death` is `0x20` (sndprocs.h enum). LIVE.

**`SoundSpeak` contest (`:275`).** `#define SoundSpeak(text)` empty after `SND_LIB_INTEGRATED` is undefined. JS `void text`. Does **not** call `sound_speak`. SND_LIB arm `:240–246` would: `PLINE_VERBALIZE|PLINE_SPEECH` && `sound_verbal` && `iflags.voices` && trigger → `sound_speak(text)`. Named: that body. **Match compiled C.**

**`putmesg` (`:79`).** `putstr` then `SoundSpeak(line)`. JS `pline_after_consume`: `const line = String(msg)`; dumplog; vision_recalc; `flush_screen` if `u.ux`; then `SoundSpeak(line)` then more-state. C flush is before putmesg in vpline; SoundSpeak is inside putmesg after putstr. JS SoundSpeak after flush, before more — **same relative to the painted line.** Empty macro: no behavior change. **Match compiled C.**

**yn `cmd.c:5534`.** `#ifdef SND_SPEECH` around `sound_speak(query)`. Compiled out. Not wired. Named.

**RNG.** No-ops burn none. Death `ucase` is string-only. **Match.**

**Callee closure (Death + putmesg).** LIVE: `ucase`, `pline`/`pline1`, `SetVoice`, `sound_speak` (empty ≡ compiled C), `SoundSpeak` (empty ≡ compiled C). OMIT named: SND_SPEECH body; yn site. STUB: **none** — empty functions are the compiled bodies, not stubs of live SND_LIB. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject “!SND_SPEECH no-op, Death `sound_speak(tmpbuf)`, SoundSpeak empty”: **true**. D-log “SoundSpeak does not call sound_speak”: **true**. Do **not** stamp “Match C SND_SPEECH `sound_verbal` body.” Do **not** stamp “Match C yn_function `sound_speak`.” Do **not** stamp “Match C SND_LIB `SoundSpeak` → `sound_speak`.” Journal “fortress held” is not a Death tribute screen. **Public-unhit** for MS_RIDER Death. Admit that.

## Density

§2b: one C function (`sound_speak`) + its Death caller + the `SoundSpeak` putmesg site that C uses when SND_LIB is on (empty here). +47. Did **not** glue `beg`/`maybe_gasp`. Did **not** implement SND_SPEECH.

## Verification

D-log: save-oracle skip (untagged `sounds.c:sound_speak`); node canary (null/empty/ucase tmpbuf; no RNG; `voice_death` 0x20); green+strict seed8000/0900; CURRENT cohort **7**/7 + strict. Rule #2 clean. Death tribute **public-unhit**. Admit that. This SHA’s no-ops cannot explain a later public RNG FAIL.

## Actionable C-wrongs

None for Must-fix (empty `sound_speak`/`SoundSpeak` match compiled C; Death call order matches). Named: SND_SPEECH / `sound_verbal` body; yn `sound_speak`; remaining vault/priest/sit SetVoice; `beg`/`maybe_gasp`. Do **not** make `SoundSpeak` call `sound_speak` without SND_LIB. Do **not** add `sound_speak` #2. Do **not** re-port D-1752 `set_voice`. Do **not** skip Death `sound_speak` again.

Verdict: **ACCEPT-WITH-DEBT**
