# Review 2110 — 5fd602958 — sounds automap filename pair + generated table

- SHA: `5fd602958c72e397c2082dfcb2146933a3cb2133` (D-3150)
- Date: 2026-09-30. `js/` delta: +128 sounds.js / +201 generated table;
  +12 extractor, +92 test (6/6, re-ran myself).
- Cluster: `get_sound_effect_filename` + Open callee
  `initialize_semap_basenames` + 2 stale-pops (`may_generate_eroded`,
  `status_hilite_menu_fld`).
- Prior-review closure claimed: none.

## Intent vs deliverable

Subject promises: "sound-effect filename automap". Diff actually adds:
the generated `se_mappings_init` (198 rows), module state, and both
functions in C order. Promise matches deliverable. The port is a live
source-level body of `#ifdef`'d-out C (D-2776 USER_SOUNDS precedent),
deliberately unwired.

## Inventory (per function)

| JS function | Change | Class |
|---|---|---|
| `get_sound_effect_filename` (sounds.js:450, sync export — C extern) | new, C order | whole |
| `initialize_semap_basenames` (sounds.js:429, local — C `staticfn`) | new, C order | whole |
| `may_generate_eroded` (mkobj.js:899, stale-pop) | none | whole (verified) |
| `status_hilite_menu_fld` (botl.js:3459, stale-pop) | none | whole modulo by-design omit (verified) |

Callee closure: no C function callees — pure computation over module
state + generated table + `sff_*`/`sounddir` consts (verified: enum order
0/1/2/3 = `sndprocs.h:297–300`; `sounddir` null-init = C `:1552`). No
clones, no stubs. Named: the `:2043–2059` `#if 0` Strcat block
(compiled out — correctly not ported).

`sym.mjs` (required — nothing deleted/re-pointed):

```text
get_sound_effect_filename js/sounds.js:450   sync
initialize_semap_basenames NOT EXPORTED — 1 LOCAL: js/sounds.js:429
```

No import edge added (names into the pre-existing generated-data
import) → no `--can`/TDZ question.

## C ↔ JS fidelity (per function)

**`initialize_semap_basenames`** — C `sounds.c:1980–1992` (`csym`
caller check: prototype `:1962` + sole call `:2012`, wired at JS `:470`).
Loop `i=1..SIZE-1`, `seid>0 && seid<SIZE` guard, indexed assign — exact.
Confirm.

**`get_sound_effect_filename`** — C `sounds.c:1994–2080` (`csym` range
cited). Verified arm-by-arm against the C text: null/dir guard (`:2008`,
`""` non-null on both sides), lazy init (`:2011–2014`), baselen
(`:2016–2017`; JS bounds-guards the read — C UB there, same NULL via the
gate), consumes per approach (`:2019–2036` incl. the commented-out
`:2023` line and cp-folded slash test), `+1` NUL (`:2037`), the triple
gate (`:2040`, `!baselen` ≡ `baselen<=0` on size_t), and the three
Snprintf arms (`:2060–2077`) as exact concatenations — I rechecked the
arithmetic: each arm's `consumes` equals result length + 1, so the gate
provably excludes truncation. `sff_baseknown_add_rest`/else → null
(`:2078–2079`). The `#if 0` Strcat block is compiled out, not ported.
No RNG either side. Unwired correctly: sole C reference is the decl
(`--callers` shows only `extern.h:3026`), and the decl itself sits
inside `#ifdef SND_SOUNDEFFECTS_AUTOMAP` — only mac/win backends and
non-contest makefiles define it; the unix contest build compiles none
of it. (Minor D-log imprecision: it says "only the decl", when the decl
too is compiled out here — substance holds.) Confirm.

**Table** — 198 `seid:` rows; index 0 `{0,''}` per `:1972`; 1..197 in
enum order; `number_of_se_entries=198`. Extractor emits from `seffects.h`
in enum order. Confirm.

**Stale-pops:** `may_generate_eroded` = C `mkobj.c:176–192` guard-for-guard
(caller `mkobj_erosions` wired `:908`). `status_hilite_menu_fld` = C
`botl.c:4356–4453` row-for-row (count-gated loop, separator, `if(count)`
Remove row, SCORE-gated Add row, PICK_ANY mode bits, delete arm, acted
return); the only gap is `status_hilite_menu_add`, ledger `by-design`
(seed) and named at both use sites — the "No current hilites" else and
the `if(count)` gate are unreachable in JS's count>0 domain. Both
stale-ported claims hold; ledger rows present.

Diff grep: no `FORCE`/`DIAG`/`getRngLog`/seed/step/coordinate reads,
`fastforward`, or hardcoded coordinates. Rule #2 clean (run this iteration).

## Hallucinations / overclaim

None material. The extern.h-decl wording is slightly imprecise (see
above) but the "no callers in this build" substance is verified, not
assumed.

## Density

- Whole-function verdicts: both new functions whole; both stale-pops
  whole (one modulo a ledger-by-design omit).
- Cluster: one C file + its generated table, 4 functions ≤ 10, no
  Must-fix bundled. One `Ledger:` entry + one Verify sub-bullet per
  function — present.
- Size (+128/+201) is in the breadth band; the /tmp 20/20 C-string probe
  corroborates the arithmetic I rechecked by hand.

## Verification

Re-measured myself (`--base 5fd602958~1 --reach-all`, both fns):

```text
verify get_sound_effect_filename: baseline 5fd602958~1 — 0 session(s) blocked on it
smoke get_sound_effect_filename: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
verify initialize_semap_basenames: baseline 5fd602958~1 — 0 session(s) blocked on it
smoke initialize_semap_basenames: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

Zero `REGRESSED`; D-log claims match. `seffects-automap.test.mjs` → 6
pass, 0 fail (re-ran). No seed/step/coordinate read.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
