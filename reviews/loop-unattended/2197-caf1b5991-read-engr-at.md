# Review 2197 — caf1b5991 — read_engr_at blind feel + pristine off + resume caller

Metadata: SHA `caf1b5991`, D-3236, js/engrave.js + js/allmain.js,
single-function corpus-residual fix. Parent baseline `a308a919b`.

## Intent vs deliverable

Subject promises: blind ENGRAVE/HEADSTONE/BURN feel arms +
impossible default + pristine off + resume caller. The diff delivers
all four plus `engr_off` save/load plumbing. The commit message's
triage essays (tutorial-9 misattribution, wipeout_text simulation)
are evidence, not scope — the body edits stay inside `read_engr_at`
and its record. No drift.

## Inventory

- `read_engr_at`: ENGRAVE/HEADSTONE/BURN gates `!blind` →
  `!blind || can_reach_floor(true)`; default `pline` → live
  `impossible('%s …', Something)`; endpunct `pristine[elen-1]` →
  `pristine[off + elen - 1]` with `off = ep.engr_off | 0`.
- `wipe_engr_at`: head-skip accumulates `ep.engr_off`.
- `make_engr_at`: inits `engr_off: 0`.
- `save_engravings` / `rest_engravings`: persist the count; rest
  re-slices leading blanks and adds them (legacy-save compatible,
  D-3238-unskip forward-compatible).
- `moveloop_preamble` (allmain.js): resume branch awaits
  `read_engr_at(u.ux, u.uy)`; `fix_shop_damage` stays deferred.

## C ↔ JS fidelity

`read_engr_at` — C engrave.c:317–405, walked arm by arm. DUST/MARK/
ENGR_BLOOD stay `!Blind`-only (:330, :350, :360) with exact texts;
ENGRAVE/HEADSTONE (:338) and BURN (:344) are now
`!Blind || can_reach_floor(TRUE)` — the old sighted-only gate was
the reported C-wrong, and the fix matches C byte-for-byte including
the frost/dust and melted/burned ternaries. Default (:366–368):
`impossible("%s is written in a very strange way.", Something)` +
sensed — JS calls the live `impossible(s, ...args)` (display.js:8580
printf-style) then sensed; order swap vs C is unobservable (local
flag). Truncation: `maxelen = BUFSZ − sizeof("You feel the words:
\"\".")` rendered as `BUFSZ − (len+1)` — exact. Endpunct (:388–395):
`pristine[off+elen−1]==last && strchr(".!?",last)` — exact, with
`off` = the :378 `actual − engr_text_space` head-wipe count now
tracked instead of assumed 0. Tail (:396–402): `You('%s: "%s"%s',
Blind?"feel the words":"read",…)` keeps the format+args shape so
engraved `%` prints literally; remembered stamp, eread/erevealed,
`run>0 → nomul(0)` all live. No RNG in C, none in JS. Verdict: whole
body exact.

`engr_off` plumbing vs C :284–285 (wipe head-skip), :1565–1570
(save from slot start — blanks persist), :1610–1613 (load re-skip):
JS accumulates the skip at the wipe site, saves sliced text + count,
restores count + re-sliced blanks. Round-trips at this SHA; legacy
saves (no field, sliced text) yield off=0 — unrecoverable, harmless,
disclosed shape. Verdict: faithful adaptation of pointer arithmetic
to a counted record.

Resume caller — C allmain.c:86–88: `if (resuming) {
read_engr_at(u.ux,u.uy); fix_shop_damage(); }`. JS wires the first,
names the second (shop.c, out of cluster). The other 7 C sites
(invent.c ×4, pickup.c ×3) verified wired (invent.js :8981/:8994/
:9031/:9077, pickup.js :1110 + both pickup arms per D-log). 8/8.

Helpers: `can_reach_floor` = same-module live sync export
(engrave.js:597); `impossible`/`You`/`You_see`/`pline`/`surface`/
`engr_at`/`nomul` live; `is_ice` file-local = declared partial
(drawbridge-under-ice stays zap.js). No new clones, no stubs. New
edge: none (allmain→engrave import extended on an existing edge).

## Hallucinations / overclaim

None. "2 PASS, 9 unchanged-identical-topline → PROGRESS" is exactly
what the re-run prints. The tutorial-9 and wipeout_text triages name
other writers with probe/simulation evidence and explicitly leave
rows Open — the opposite of overclaim.

## Density

Single whole C function + record plumbing + one C caller: the right
size for a corpus-residual fix with measured movement (2 sessions
PASS). Own C-locus, Callers, Verify, Named-omissions bullets and own
`Ledger:` entry. No Must-fix bundled, no second file beyond the
caller wire.

## Verification

- Banned-pattern grep on the js diff: clean.
- Re-measured: `hidden-proxy.mjs verify read_engr_at --base
  caf1b5991~1 --reach-all` → "2 PASS, 0 moved past, 9 unchanged, 0
  worse → PROGRESS"; all 9 unchanged print identical C/J toplines;
  smoke 24/24 REACH-OK. Matches the D-log line-for-line; no
  REGRESSED, no vacuous-PASS relabel.
- off=0 ⟹ bit-identical claim holds by construction (index reduces
  to the old expression; blind=false keeps old gates on valid
  types). No seed/step/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
