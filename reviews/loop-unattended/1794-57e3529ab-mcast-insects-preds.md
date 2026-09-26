# Review 1794 — 57e3529ab — mcast_insects predicates (D-2835)

- SHA: `57e3529ab` (Must-fix from review 1787; `mcastu.c` `mcast_insects` plus `You_hear`)
- Files: `js/mcastu.js` four predicates; `js/hack.js` `You_hear` deaf gate
- Queue row: Must-fix review 1787, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, seed, or `fastforward` in the hunk. `imports.mjs --rulecheck`: "Rule #2 clean".

## Intent vs deliverable

Subject promises the three C-wrongs from review 1787 are the macros: `insects_Deaf` and `You_hear` drop sticky `u.Deaf`, file `Detect_monsters` drops sticky `u.Detect_monsters`, `insects_BInvis` is the blocked bit, `insects_Displaced` is H/E. The diff is those predicate edits and the dropped mummy-wrapping / displacement-cloak reads. The summon loop is unchanged.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `insects_Deaf` | CLONE of the macro | `youprop.h:123–125` |
| `You_hear` | LIVE `hack.js:175` | `pline.c:435–452` |
| `Detect_monsters` | file clone `mcastu.js:140` | `youprop.h:188–190` |
| `insects_BInvis` | CLONE | `youprop.h:197` |
| `insects_Invis` | CLONE, unchanged body | `youprop.h:198` |
| `insects_Displaced` | CLONE | `youprop.h:202–204` |
| `mcast_insects` | `mcastu.js:679` | `mcastu.c:644–726` |

The diff deletes the `CLOAK_OF_DISPLACEMENT` / `objectNames` import and the local `MUMMY_WRAPPING` index. `sym.mjs`:

```
You_hear         js/hack.js:175   ASYNC — await required
             !! ALSO 12 LOCAL CLONE(S) in 12 files — IMPORT the export; do NOT add another
CLOAK_OF_DISPLACEMENT js/generated/objects_data.js:6   sync   export const
objectNames      js/generated/objects_data.js:48   sync   export const
MUMMY_WRAPPING   NOT FOUND in js/** (no export, no local function/const).
insects_Deaf     NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mcastu.js:633
```

`imports.mjs --can hack.js teleport.js unconscious` and `hack.js eat.js is_fainted`: `ALREADY`. No new edge. The deleted names are not re-pointed; the worn-item reads are gone.

## C ↔ JS fidelity

`csym` `You_hear` is `pline.c:435–452`. The gate is `(Deaf && !Unaware) || !flags.acoustics` then return. `Deaf` is `HDeaf || EDeaf || u.uroleplay.deaf` (`youprop.h:123–125`). JS `hack.js:178` is `(u.HDeaf | 0) || (u.EDeaf | 0) || u.uroleplay?.deaf`, then the same early return, then the dream prefix, else `You hear `. Sticky `u.Deaf` is gone. Underwater still skips `You barely hear ` (`pline.c:444–445`). That omit is named and was already the callee gap.

`insects_Deaf` (`mcastu.js:633–638`) is the same three terms plus `uprops[DEAF]` intrinsic and extrinsic. `HDeaf` / `EDeaf` are those `uprops` fields (`youprop.h:123–124`). Writers that set `u.HDeaf` also copy `uprops[DEAF].intrinsic` (`eat.js`). The extra read is the same store, not a fourth term.

`Detect_monsters` (`youprop.h:188–190`) is `H || E` only. `mcastu.js:140–144` is flats or `uprops[DETECT_MONSTERS]` intrinsic/extrinsic. Sticky `u.Detect_monsters` is gone. `seecaster` (`mcastu.c:677`) still calls this helper (`mcastu.js:712`).

`BInvis` is `u.uprops[INVIS].blocked` (`youprop.h:197`). `insects_BInvis` is `u.BInvis` or that blocked bit. The mummy-wrapping `otyp` test is gone. `Invis` (`youprop.h:198`) is `(H || E) && !BInvis`. `insects_Invis` still computes that and calls `insects_BInvis`. `Displaced` (`youprop.h:202–204`) is `H || E`. `insects_Displaced` is flats or `uprops[DISPLACED]`. The cloak `otyp` test is gone.

Message order in `mcast_insects` is unchanged and still matches `:681–724`: unseen short `You_hear`, else deaf visual `pline` vs `Soundeffect` + `You_hear`, else sticks / snakes / invis spot / displaced image / plain `pline_mon`. `rnd` only when `m_lev >= 2`. Caller `mcastu.c:872` is `mcastu.js:858` (`await`, then `dmg = 0`). `:53` is the declaration.

File-level `Deaf()` (`mcastu.js:146`) still ORs sticky `u.Deaf`. The insects arm does not call it. `Deaf_mr` (`hack.js:229`) still ORs it for moverock. Both are named and sit outside this function.

## Hallucinations / overclaim

The subject says the predicates are the macros. The four insects helpers and the `You_hear` deaf gate match those macros. It does not claim `You_hear` gained the underwater prefix, and the named line says that prefix is still absent. It does not claim file-level `Deaf()` changed.

## Density

Must-fix only: the three predicate families from review 1787, plus the `You_hear` gate those predicates had been copied from. The summon body was already the C function.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify mcast_insects --base 57e3529ab~1 --reach-all`.

```
verify mcast_insects: baseline 57e3529ab~1 (scoreboard at 236be808b) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke mcast_insects: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. D-2835's green, strict, cohort, and full 44 were not re-run here.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
