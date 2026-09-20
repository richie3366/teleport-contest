# Review 1561 — 6a6edff6 — insight.c fmt_elapsed_time whole-body port (D-2602)

**Metadata:** SHA `6a6edff6`, `insight.c` `fmt_elapsed_time`, D-2602.
JS: `js/insight.js` (+58, new export), `js/invent.js` (2 call sites);
test `scripts/fmt-elapsed-time.test.mjs` (+71, committed).

## Intent vs deliverable

Subject promises: whole-body port with the elapsed line wired on both
enlightenment builders, resolving review-77 omit #1 (overlay `"none"`).
Diff actually adds: exported `fmt_elapsed_time(final)` in C order with
`:line` cites; both `enlightenment` (final disclosure) and
`doattributes` (^X overlay) call it; unit test. Matches the promise.

## Inventory

- `fmt_elapsed_time(final)` (new export, `js/insight.js:182`) — etim,
  field split, fieldcnt, day/hour/minute/seconds arms.
- `enlightenment` elapsed line: `' none'` → `fmt_elapsed_time(final)`.
- `doattributes` elapsed line: `' none'` →
  `fmt_elapsed_time(ENL_GAMEINPROGRESS)`.
- File-local `plur` reused (C `hack.h:1520` idiom).

## C ↔ JS fidelity

C locus `insight.c:313–358` (46 lines, `staticfn`, via `csym.mjs`).
Arm-by-arm confirm:

- `:322–325` etim + `timet_delta(getnow(), start_timing)` iff `!final`:
  live (`etim += timet_delta(getnow(), start_timing)` under `if (!final)`).
  Game-over fold already in really_done/end.js — consistent with the C
  comment that reallydone() updates `.realtime` first.
- `:328–331` field split in C order (`% 60`, trunc-divide, `% 60`,
  `% 24`, `/ 24`): live with `Math.trunc` ≡ C `long` `/`.
- `:332` fieldcnt, `:334` `" none"`: live.
- `:335–354` day/hour/minute/seconds arms with the C `--fieldcnt`
  order kept, including the minutes-arm quirk (adds `" and"`, no
  decrement, per the C comment): live verbatim.
- `eos()` appends as concat, `Sprintf/Strcpy` as string ops: idiom-correct.

Caller closure: sole C caller `:448` (`enlightenment`) — wired in JS
`enlightenment`. The second JS site is justified, not scope creep: C
`doattributes` (`:2009–2018`, read here) is `enlightenment(mode,
ENL_GAMEINPROGRESS)`, so the overlay elapsed line flows through the
same `:448` arm; JS duplicates the builder inline and passes
`ENL_GAMEINPROGRESS` (= 0, falsy → live-delta arm, matching C
`if (!final)`). Correct.
Callee closure: `getnow` LIVE (js/calendar.js:41, sync), `timet_delta`
LIVE (js/allmain.js:1317, sync) — `sym.mjs` outputs pasted in notes.
No clone, no stub, no omit.

## Hallucinations / overclaim

None. "Named: none new" accurate — every arm and callee is live or
inlined-literal. No dispatch/stub split (leaf formatter).

## Density

Small C function (46 L) fully ported + 2 callers wired + committed
test. Right-sized for a small-file whole-body port.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean.
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed reads.
- D-log Verify claims PASS + smoke REACH-OK. Re-measured:
  `hidden-proxy.mjs verify fmt_elapsed_time --base 6a6edff6~1
  --reach-all` → 0 blocked at baseline and working tree (vacuous-note
  path, correctly framed as smoke evidence) + `smoke 24/24 PASS,
  0 regressed → REACH-OK`. Confirmed.
- Committed test re-run here: `node --test
  scripts/fmt-elapsed-time.test.mjs` → 0 fail (4 pass claimed, fail 0
  observed).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
