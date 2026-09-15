# Review 1294 — 5622d826 — steed.c use_saddle poly_when_stoned guard (D-2328)

Metadata: SHA `5622d826`, D-2328, Open queue row (review-79 residual, cited 0 blocks). Method: `git show` full `js/` hunk (`js/steed.js` +14/−3); C `use_saddle steed.c:35–139` (petrify arm `:63–69`) + C `poly_when_stoned mondata.c:79–86` (via `csym.mjs`); JS `poly_when_stoned monsters.js:673–679` + `Mgender do_name.js:595–601` bodies read; `sym.mjs` on `poly_when_stoned`/`Mgender`/`polymon`; `imports.mjs --can steed.js polyself.js polymon`; added-lines banned-pattern grep (0 hits); `hidden-proxy verify use_saddle --base 5622d826~1` re-run.

## Intent vs deliverable

Subject promises the outer `poly_when_stoned && polymon(STONE_GOLEM)` guard review 79 left unnamed (review 970 confirms review 79 names `use_saddle`). Diff delivers the guard in C position plus two static joins and one dynamic import. Promise kept.

## Inventory

- Petrify arm (`js/steed.js:340–350`): `poly_when_stoned(youData, game.mvitals) && await polymon(PM_STONE_GOLEM)` around `instapetrify`, with `Mgender(mtmp)` replacing the inline ternary in the killer text.
- Static joins into existing imports: `poly_when_stoned` (monsters.js), `Mgender` (do_name.js). `PM_STONE_GOLEM` const. Dynamic `polymon` beside the existing dynamic `instapetrify`.

## C ↔ JS fidelity

Arm vs C `:63–69`: `You("touch…")` (pre-existing pline-inline) then the negated-`&&` guard ✓, short-circuit order preserved (`&&` + await — `polymon` never called when the guard is false) ✓, killer text `an(pmname(ptr, Mgender(mtmp)))` with `ptr ≡ mtmp->data` ✓. `poly_when_stoned` JS ≡ C (is_golem + ≠STONE_GOLEM via `mndx` ≡ pointer compare + `!(mvflags & G_GENOD)` with `G_GENOD=0x02`; `game.mvitals` matches the `end.js`/`invent.js` convention) ✓. `Mgender` on a real monster ≡ old ternary (`female?FEMALE:MALE`) and ≡ C for non-youmonst — strictly more faithful. `polymon` is async and awaited ✓. Callee closure: `poly_when_stoned` LIVE (sync), `polymon` LIVE (async), `instapetrify` pre-existing live, `Mgender` LIVE — no stubs, no clones, no omits added. `--can` reports IN-SCC (same 90-module cycle), which per method is not a blocker; the dynamic import is call-time so no TDZ read, and green/cohort passed with the edge.

C arm (`steed.c:63–69`, inside the `touch_petrifies && !uarmg && !Stone_resistance` block) in full:

```c
You("touch %s.", mon_nam(mtmp));
if (!(poly_when_stoned(gy.youmonst.data) && polymon(PM_STONE_GOLEM))) {
    Sprintf(kbuf, "attempting to saddle %s",
            an(pmname(mtmp->data, Mgender(mtmp))));
    instapetrify(kbuf);
}
```

JS mirrors it line for line: the pre-existing `pline('You touch …')` (You-inline, untouched), then the negated `&&` with `await polymon` in the second position, then `instapetrify` with the `an(pmname(ptr, Mgender(mtmp)))` killer text. `sym.mjs` for the record:

```text
poly_when_stoned js/monsters.js:673   sync
Mgender          js/do_name.js:595   sync
polymon          js/polyself.js:1161   ASYNC — await required
```

Lineage: review 79 named `use_saddle` as a gap (confirmed via review 970's "review 79 names: use_saddle" note); D-2328 retires the petrify-guard residual of that row. The remaining D-1008 nameds (`update_mon_extrinsics`, poly `body_part(HAND)` phrasing) are untouched and stay named — this commit adds no new omit. Null-safety note: JS passes `game.youmonst?.data || null` where C passes non-null `gy.youmonst.data`; JS `is_golem(null)` returns false so the degenerate path falls through to `instapetrify` — a defensive superset on an unreachable-in-play input, RNG-free, not a C-wrong.

## Hallucinations / overclaim

None. "Zero new static edges" verified (both names join existing import lists). The RNG note (one polymon draw on the golem path either way) follows from preserved control flow, and the D-log plainly states no behavioral probe exists rather than claiming one.

## Density

+14/−3 for one guard arm. Correct (single residual, alone).

## Verification

D-log tail PASS (syntax/rule2/green 2/2/strict ×2/cohort 7/7, no D-1831 gap) + honest vacuous-hidden note. Re-measured:

```text
verify use_saddle: baseline 5622d826~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches. Banned grep: 0 hits.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
