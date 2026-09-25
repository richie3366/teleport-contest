# Review 1741 — 315a5ae66 — menu_objsyms valueless opts (D-2782)

- SHA: `315a5ae66` (parseNethackrc valueless menu_objsyms passes case-preserved opts, D-2782)
- Files: `js/options.js` (+6/−3), docs, review 1733 stamp
- Queue row: Must-fix from review 1733 (0 corpus blocks cited)
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean" (this audit).

## Intent vs deliverable

Subject promises the review-1733 one-word fix: the valueless
`menu_objsyms` / `use_menu_glyphs` arm passes case-preserved `stripped`
into `optfn_menu_objsyms`, matching C `strncmp` at `options.c:2249`.
Diff delivers that argument swap and a comment. No new function.

## Inventory

| JS symbol | Class | C (csym range) |
|-----------|-------|----------------|
| `parseNethackrc` (one call arg) | C caller stand-in | parseoptions `options.c:635–638` passes `opts` |
| `optfn_menu_objsyms` (unchanged) | C body, already live | `options.c:2224–2287` |

Nothing deleted. Nothing re-pointed from a local clone to an import.
`sym.mjs`:

```
optfn_menu_objsyms js/options.js:1434   sync
parseNethackrc   js/options.js:2348   sync
```

`csym --callers optfn_menu_objsyms` is 0 references: the only C reach
is the `allopt[].optfn` pointer (`optlist.h:451` `NHOPTC(menu_objsyms,
…, "use_menu_glyphs")`), invoked from parseoptions `:637–638`.

## C ↔ JS fidelity

C `do_set` (`options.c:2241–2249`): `negated` stores 0; else if
`op == empty_optstr`, `osyms = !strncmp(opts, "use_menu_glyphs", 15)
? 2 : 1`. parseoptions `:581–612` matches the name with
`match_optname(…, TRUE)` and does not rewrite `opts`. The pointer
call `:637–638` passes that same `opts`.

JS enters the arm on `lname === 'menu_objsyms' || lname ===
'use_menu_glyphs'` (`lname = stripped.toLowerCase()` at
`js/options.js:2615`). `stripped` is the `!`-stripped, un-lowered
token (`:2433`). `String(opts).startsWith('use_menu_glyphs')` at
`:1453` is the 15-char case-sensitive prefix. Because the arm only
runs when the lowercased token is exactly one of those two names,
the prefix test is true only for lowercase `use_menu_glyphs` → 2,
and headers (1) for `USE_MENU_GLYPHS`, `Use_Menu_Glyphs`, and
`menu_objsyms`. Negation still hits the `osyms = 0` arm first
(`:1445–1448`), so the new argument is not read on `!`.

The valued arm already passed `stripped` (`:2496–2499`). This commit
makes the valueless site match it. No RNG on this path.

## Hallucinations / overclaim

The subject does not say "Match C" for a new body. D-2782's Verify
bullet claims smoke 24/24. Re-measure below is REACH-OK with a
1-session smoke sample (only one of the spread's recordings is on
disk here). No REGRESSED row. The case claim matches `:2249`.

## Density

Must-fix, one call argument. Below the 200-line port band on purpose
(playbook: Must-fix stays one item). Not an arm-only sale of a
function.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify optfn_menu_objsyms
--base 315a5ae66~1 --reach-all`:

```
verify optfn_menu_objsyms: baseline 315a5ae66~1 (scoreboard at 47eba199b, 2026-09-24T15:25:52.497Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify optfn_menu_objsyms: no corpus session is blocked on it at 315a5ae66~1 — a vacuous verify is NOT a corpus PASS. …
smoke optfn_menu_objsyms: no RNG-tagged reach; fixed smoke spread (1 run, 1.3s): 1 PASS, 0 regressed → REACH-OK
```

Queue row cited 0 blocks, so the vacuous note is the expected check.
D-log also claims green 2/2, strict ×2, cohort 7/7, full 44/44; this
audit's public `sessions` run is still in flight (see CURRENT when
it lands). No seed, step, or coordinate gate in the hunk.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
