# Review 2843 — 28130c7ea — resurrect Deaf gate reads the full union

## Metadata

- SHA: `28130c7eae1e98494c3b57da28cc2212d3822796` (D-3999)
- Cliff writer: moveloop_core head (Endgame wish-turn taunt), 3 blocks
- js/ diff: `js/wizard.js` 9 lines (gate + omit-doc); new
  `scripts/resurrect-deaf-silence.test.mjs`
- Method: full per-function (≤10-function cliff commit)

## Intent vs deliverable

Promise: resurrect gated Rodney's taunt on the `u.Deaf` flat
alone where C reads `HDeaf||EDeaf||uroleplay.deaf` — a deaf
hero (HDeaf=39 intrinsic timeout, flat unset) heard the voice
in JS, and the queued taunt surfaced on the wish turn. Take the
C-exact union (cuss shape, same file); retire the "Deaf-aware
acoustics polish" omit clause. 3 PASS.

Diff actually: one `const Deaf = …` union + `if (!Deaf)`, one
doc-line omit update. Promise == diff.

## Inventory

- `resurrect` voice gate (`js/wizard.js:693-695`, C
  `wizard.c:714-780` via `csym.mjs`, gate `:773-777`): flat →
  union. Gate-local change.

## C ↔ JS fidelity

- C gate (`wizard.c:773-777` read): `if (!Deaf) {
  pline("A voice booms out..."); SetVoice(mtmp, 0, 80, 0);
  verbalize("So thou thought thou couldst %s me, fool.", verb);
  }` ✓ — JS prints the same pair in the same order; SetVoice
  stays a named omit (voice-render polish, no screen/RNG —
  pre-existing, disclosed, and the 3 PASS corroborate it moves
  no pixel).
- C `Deaf ≡ (HDeaf || EDeaf || u.uroleplay.deaf)`
  (`youprop.h:125` read) ✓ — JS adds the kept `u.Deaf` flat
  as a fourth disjunct, the same shape as same-file `cuss`
  (`wizard.js:741`), `detect.js:144`, and `do.js:483` (all
  three read; term order varies, OR-equal). The flat can only
  widen toward C's value on the measured state (HDeaf=39 set
  it true in C regardless).
- Measured causation, not inferred: the D-log's prefix probe
  (HDeaf=39, flat unset) plus theWish-turn first-RNG-mismatch
  (C `rn2(41)` wish vs JS `rn2(12)`) pin the taunt as the
  diverger; both callers pre-wired (`do.c:1889` arrival,
  `wizard.c:807` intervene).

No RNG in the diff; no branch reorder. Diff grep clean; Rule
#2 iteration-wide clean (review 2838). No symbol
deleted/re-pointed — no `sym.mjs` paste required.

## Hallucinations / overclaim

None. "C-exact union" is exact (modulo the disclosed kept
flat, which matches three shipped precedents). The retired
omit clause is retired because the falsifier fired (3 deaf
sessions), not by fiat. Hearing-path safety is pinned by the
kept-green blind-noappear test, cited in Verify.

## Density

Cliff phase §10.18: one cliff writer, one gate, code + ledger +
verify + focused test. No new omits; the audit note (whole
`:715-780` live) is a stated audit. Right-sized.

## Verification

Re-measured on HEAD, baseline parent:

- `hidden-proxy.mjs verify moveloop_core,resurrect --base 28130c7ea~1 --no-reach`
- `verify moveloop_core: 3 PASS, 0 moved past, 0 unchanged, 0 worse`
  (Archeologist-50055072, Wizard-50056041, Wizard-50350056 — the
  exact ship-time trio)
- `verify resurrect: no corpus session is blocked` — expected
  (writer); D-log says so.

Exact match to ship-time. Ship-time reach 80/80 + 2/2, green,
strict, cohort 7/7 corroborate.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
