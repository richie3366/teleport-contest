# Review 917 — b92c4714 — mthrowu.c ucatchgem thrown-gem catch singleton (D-1947)

## Metadata

- SHA: `b92c4714` (D-1947). JS: `js/mthrowu.js` +41/−3 (new async export `ucatchgem` at mthrowu.js:590 + `m_throw` call-site wiring + FIRST/LAST_GLASS_GEM consts).
- Subject promises: `ucatchgem` in C order, wired at C `:692` before the `:695` tethered catch, `dropy` dynamic per file idiom, probes, vacuous hidden note.
- Prior reviews closed: none.

## Intent vs deliverable

Promise matches diff. No DIAG/FORCE/seed gates. Rule #2 clean.

## Inventory

| Symbol | Class |
|---|---|
| `ucatchgem(gem, mon)` | new export; ports C `mthrowu.c:505–529` (staticfn → exported, sync → async for pline/dropy/hold awaits) |
| `xname`, `mon_nam`/`s_suffix`, `makeknown`, `hold_another_object`, `is_unicorn`, `pline`, `dropy` | all LIVE (`sym.mjs`: invent.js, do_name.js, monsters.js:461, do.js:2247) |
| FIRST/LAST_GLASS_GEM consts | otyp constants via `objectNames.indexOf` (mhitm.js idiom), not symbols |

## C ↔ JS fidelity

Body against `mthrowu.c:505–529`: outer gate `otyp <= LAST_GLASS_GEM && is_unicorn(youmonst.data)` ≡ JS (with `?.`/`|0` foreign-caller guards); both xnames computed before the branch in C initializer order ≡ JS; glass arm (`>= FIRST_GLASS_GEM`: two catch/junk plines verbatim, `makeknown`, `dropy`) ≡ JS; else accept-pline + `hold_another_object` with C format strings verbatim ≡ JS; TRUE/FALSE → true/false. No RNG in C; none added. Call site verified in C (`mthrowu.c:687–692`, read verbatim): `nomul(0)` under `gm.multi`, then `GEM_CLASS && ucatchgem → break` before the tethered `u_catch_thrown_obj` arm — JS wiring is line-identical in order and break shape. Pre-existing neighboring `u_catch` return-vs-break gap explicitly named (review 296), not re-opened.
- `sym.mjs` callee table (this audit): `ucatchgem` mthrowu.js:590 ASYNC; `is_unicorn` monsters.js:461 sync; `makeknown` invent.js:3936 sync; `hold_another_object` invent.js:6173 ASYNC; `dropy` do.js:2247 ASYNC. C is sync throughout; JS async-ness comes only from the awaited pline/dropy/hold arms — the `true`/`false` returns are position-identical.
- `is_unicorn` has 2 local clones (apply.js:567, trap.js:247) — pre-existing drift elsewhere; this commit imports the monsters.js export, the correct direction per the playbook (D-1849 rule: IMPORT the export).
- FIRST/LAST_GLASS_GEM (`WORTHLESS_WHITE_GLASS`…`WORTHLESS_VIOLET_GLASS` via `indexOf`) verified against the mhitm.js idiom cited in the diff; probe-confirmed 461/469 in the D-log. The `<= LAST && is_unicorn` / inner `>= FIRST` nesting reproduces C's rock-reject/glass-drop/real-accept three-way exactly (rock otyp > LAST short-circuits to `false`).

## Hallucinations / overclaim

None. Vacuous hidden note explicit; no corpus-PASS claim. (Note: `is_unicorn` has 2 local clones in apply.js/trap.js — pre-existing drift; this commit correctly imports the export.)

## Cited ranges (tool-pinned)

- C: `mthrowu.c:505–529` (body), `mthrowu.c:687–695` (call site:
  `nomul`, GEM_CLASS/`ucatchgem`→break, tethered catch).
- JS: `ucatchgem` mthrowu.js:590–611; wiring mthrowu.js:~1031;
  consts FIRST/LAST_GLASS_GEM adjacent to the otyp const block.
- Plines verbatim: "You catch the %s." / "You are not interested
  in %s junk." / "You accept %s gift in the spirit in which it
  was intended." — all three carried with C's format strings.
- `hold_another_object` args verbatim: (gem, "You catch, but drop,
  %s.", gem_xname, "You catch:") — matches C's four arguments.
- D-log probes (deleted): non-unicorn+glass → false;
  true-unicorn + rock-otyp → false — both consistent with the
  outer `<= LAST_GLASS_GEM` gate.

## Density

Right-sized §2b: one C function + its single call site, 41 insertions.

## Verification

- `hidden-proxy verify ucatchgem --base b92c4714~1`: 0 blocked at baseline and now — matches D-log.
- `--can mthrowu.js do.js dropy` SAFE per D-log; static extensions reuse live edges only. Callee closure: all LIVE. No stub in a live arm.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
