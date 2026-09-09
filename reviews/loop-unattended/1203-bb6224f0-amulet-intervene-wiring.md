# Review 1203 — bb6224f0 — wizard amulet + intervene + moveloop wiring

Metadata: SHA `bb6224f0` (D-2237). Queue row `wizard.c` intervene, no
corpus block. js/ wizard.js +105/−4 (two bodies + three locals), allmain.js
+15/−2 (two arms + import).

## Intent vs deliverable

Subject promises `amulet()` + `intervene()` bodies with once-per-turn
wiring (the Wizard-killed doom clock `udemigod/udg_cnt` and the
Amulet-carry hook had no JS body). Diff delivers exactly that; all import
names join pre-existing edges except wizard→sit (`rndcurse`, `--can`
SAFE) and allmain→wizard. Promise kept.

## Inventory

New exports: `amulet()`, `intervene()`. Changed: `moveloop_core` two
arms. Callees all LIVE and await-correct: `rndcurse` (async, awaited),
`aggravate` (same-file sync, called sync — verified at wizard.js:177),
`nasty` (async, awaited with null caster), `resurrect` (async, awaited),
`Tobjnam`/`hcolor`/`You_feel` (imports extended on existing edges),
`dist2` (already in scope). `sym.mjs` clone report adjudicated: local
`Blind()` (30th copy in js/; canonical export invent.js:320) and local
`m_next2u()` (7th copy; no export exists) — both verified against C here
(see below), house-conventional duplication, debt not C-wrong. `NH_BLACK`
trivial const matching `do_name.c`.

## C ↔ JS fidelity

amulet vs `wizard.c:61–103`: the `#if 0` caller-gate is honored by the
allmain `uhave.amulet` call-site check, matching C. uamul-then-uwep
Amulet test with `!rn2(15)` short-circuit ≡ C's `||` chain (uwep
unevaluated when uamul hits; null-normalization outcome-equal).
First-MAGIC_PORTAL walk over `ftrap` with `distu` 9/64/144 thresholds and
break-after-first — exact, including the dual array/linked-list shape
handling (JS supports both trap-store shapes; C walks the list).
`no_of_wizards` gate on `game.context` ≡ `svc.context`. Fmon scan skips
DEADMONSTER (`mhp<=0` both sides), wakes on `iswiz && msleeping &&
!rn2(40)`, `!m_next2u` creepy-feeling, return after the first — exact.
`You(...)` ≡ `pline('You …')` textually; `m_next2u` ≡ `distu ≤ 2`
(`you.h`). RNG order preserved: `rn2(15)` only when held, `rn2(40)` per
sleeping wizard in fmon order.

intervene vs `wizard.c:785–810`: `Is_astralevel ? rnd(4) : rn2(6)` — so
cases 0/5 never run on Astral, as the C comment states. Cases 0/1
nervous; case 2 Blind-gated `You notice a black glow surrounding you.`
(hcolor(NH_BLACK)) with *unconditional* `rndcurse()` — the gate placement
is the load-bearing detail and it matches; case 3 `aggravate()`; case 4
`nasty(null)`; case 5 `resurrect()`. Exact.

Wiring vs `allmain.c:359–368`: `uhave.amulet → amulet()` before wipe;
`udemigod && !uinvulnerable` countdown (`if (udg_cnt) udg_cnt--`) +
`intervene()` + `rn1(200,50)` reschedule after wipe, before fumaroles —
exact position (359/362–368) and order. The decrement is draw-free.

## Hallucinations / overclaim

None. Vacuous hidden note stated with reason. No "new edge" overclaim
that matters: both new static edges verified SAFE/ALREADY-class, and the
full suite passing rules out a TDZ blowup.

## Density

Two bodies + wiring, one family, one handoff. Right-sized.

## Verification

Audit re-ran the corpus claim itself:

```text
verify intervene: baseline bb6224f0~1 — 0 session(s) blocked on it
(0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed, exactly as labeled. Full 44/44 auto-ran (shared
file changed) + green/strict/cohort pasted. Diff grep: no FORCE/DIAG/
`getRngLog`/seed/fastforward/coordinates. Rule #2 clean (re-run here).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
