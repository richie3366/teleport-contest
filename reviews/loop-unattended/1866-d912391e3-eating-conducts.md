# Review 1866 — d912391e3 — eating_conducts (D-2907)

- SHA: `d912391e3` (coverage; `eat.c` `eating_conducts`)
- Files: `js/eat.js` (body + `violated_vegetarian` + three callers), `js/uhitm.js` (`gulpum` await)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck` (this tree): "Rule #2 clean: no bare/node specifiers or fs calls in js/." `--can js/uhitm.js js/eat.js eating_conducts` is ALREADY (static edge exists; `gulpum` still dynamic-imports).
- `sym.mjs`:

```
eating_conducts  js/eat.js:3295   ASYNC — await required
violated_vegetarian NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/eat.js:1030
vegan            js/monsters.js:1005   sync
vegetarian       js/monsters.js:1020   sync
livelog_printf   js/pline.js:23   sync
adjalign         js/attrib.js:738   sync
```

`violated_vegetarian` is the one in-file function (`eat.c:1375`). There is no second copy.

## Intent vs deliverable

Subject promises one async `eating_conducts` with both post-increment tests and all three `livelog_printf` calls, and `violated_vegetarian` as `You_feel("guilty.")` then `adjalign(-1)`. The diff does that. Callers that used to ignore the old boolean now `await` it.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `eating_conducts` | async export `eat.js:3295` | `eat.c:575–599` |
| `violated_vegetarian` | file-local `eat.js:1030` | `eat.c:1375–1384` |
| `vegan` / `vegetarian` | live `monsters.js:1005` / `:1020` | `mondata.h:232–241` |
| `noncorporeal` | live `monsters.js:935` | `mondata.h:31` (`mlet == S_GHOST`) |
| `livelog_printf` | live `pline.js:23` | formats `%s` into `gamelog_add` |
| `adjalign` | live `attrib.js:738` | record + abuse clamp |
| `You_feel` | live `display.js:7693` | `"You feel "` + text |
| `eat_brains` | await `eat.js:3422` | `eat.c:663` |
| `consume_tin` | await `eat.js:3735` | `eat.c:1603` |
| `gulpum` | await `uhitm.js:3831` | `uhitm.c:5017` |

## C ↔ JS fidelity

`csym` body is `eat.c:575–599`. No RNG.

`ll_conduct` starts at 0. `!u.uconduct.food++` tests the old value and always increments. On zero, `livelog_printf(LL_CONDUCT, "ate for the first time - %s", pd->pmnames[NEUTRAL])` and `ll_conduct++`. JS saves `food | 0`, stores `+ 1`, and logs only when the saved value is 0. `LL_CONDUCT` is `0x0020` (`global.h:499`, `const.js:985`).

`!vegan(pd)` then `!u.uconduct.unvegan++ && !ll_conduct`. The increment is the left operand, so it is not skipped when `ll_conduct` is already set. JS increments first, then logs `"consumed animal products (%s) for the first time"` only when both the old counter and `ll_conduct` are 0, and then bumps `ll_conduct`.

`!vegetarian(pd)` then `!u.uconduct.unvegetarian && !ll_conduct` logs `"tasted meat (%s) for the first time"` and does not increment that counter. `violated_vegetarian()` always runs on this arm and does the increment. JS matches: the meat `if` only logs; the await is outside it.

`NEUTRAL` is the third gender (`monflag.h` enum `MALE, FEMALE, NEUTRAL`; JS `FEMALE + 1` = 2). `pmnames[mndx]` rows are `[null, null, "name"]`. The noun is `pmnames[mndx][NEUTRAL]`, with `mndx` then `mnum`. An empty string is the missing-row fallback; C's argument is `NONNULL`.

`vegan` matches the macro on this port's string `mlet` (`"S_BLOB"` … `"S_LIGHT"`, elemental except stalker, golem except flesh and leather, else `noncorporeal`). `vegetarian` is that, or pudding except black pudding.

`violated_vegetarian`: `unvegetarian++`, then `Role_if(PM_MONK)` (`you.h:247`, `urole.mnum == PM_MONK`) does `You_feel("guilty.")` then `adjalign(-1)`. The old body subtracted `ualign.record` and returned a flag so `doeat` / `eatcorpse` could `pline` the guilt line. That flag is gone. `You_feel` is the plain prefix; its Unaware dream wording is already named on `display.js`, not a second guilt string.

`eat_brains` calls it only for `magr == &youmonst`, before `mindless`. `consume_tin` calls it after the consume pline, on `&mons[mnum]` (`mons(mnum)`). `gulpum` calls it when `adtyp == AD_DGST && (!Slow_digestion || fatal_gulp)`. `extern.h:968` only declares it.

## Hallucinations / overclaim

The subject says `doeat`, `eatcorpse`, and `doeat_nonfood` still own their first-time livelog lines. Those `livelog_printf` calls are not in the JS (`doeat` still says the lines are deferred; `doeat_nonfood`'s header still says "Named omissions: livelog first-time conduct"). That is the pre-existing named omit (`turns.md` D-2183), not an arm of `eating_conducts`. The three lines inside `eating_conducts` are present. The subject does not claim the sibling functions gained those prints.

## Density

One function plus its same-file callee. All three C callers await the export. `vegan`, `vegetarian`, `livelog_printf`, `You_feel`, and `adjalign` are live exports. No stub in the body.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify eating_conducts --base d912391e3~1 --reach-all`.

```
verify eating_conducts: baseline d912391e3~1 (scoreboard at 92dff7be1, 2026-09-26T23:07:03.511Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify eating_conducts: no corpus session is blocked on it at d912391e3~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
smoke eating_conducts: no RNG-tagged reach; fixed smoke spread (12 run, 3.4s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line. Full suite was skipped (script: no shared file).

## Actionable C-wrongs

None. Food and unvegan post-increments, the meat test without an increment, the three livelog strings, and `violated_vegetarian`'s monk `You_feel` + `adjalign(-1)` match `eat.c:580–597` and `eat.c:1378–1382`.

Verdict: **ACCEPT**
