# Review 1759 — 24d4c0ac1 — dodown Flying steed (D-2800)

- SHA: `24d4c0ac1` (Must-fix from review 1752; `do.js` local `Flying` dropped the steed)
- Files: `js/do.js` (import `Flying`, delete the local; comment on `u_locomotion`)
- Queue row: review 1752 Must-fix, 0 corpus blocks cited
- Banned grep: 0 hits in the hunk. `imports.mjs --rulecheck` on this SHA: "Rule #2 clean".
- `imports.mjs --can do.js mhitu.js Flying` → `ALREADY: do.js already statically imports mhitu.js.`

## Intent vs deliverable

Subject promises the `youprop.h` `Flying` predicate, including a flying steed, on the ceiling-hider test, the local `u_locomotion`, the pool splash, and the climb " along" test, by importing `mhitu.js` `Flying` and deleting the local. The diff is that import, the deletion, and the comment. Call sites that already said `Flying()` now resolve to the export. `goto_level`'s descend test is not in the diff.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `Flying` | imported from `mhitu.js:711` | `youprop.h:253–255` |
| local `Flying` | deleted | was the divergent clone |
| `u_locomotion` in `do.js` | local, now calls the import | `hack.c:1817–1829` |
| `is_flyer` | imported by `mhitu.js` | `mondata.h:19` `M1_FLY` |

`sym.mjs` after the delete (`do.js` is not in the clone list):

```
Flying           js/mhitu.js:711   sync
             !! ALSO 7 LOCAL CLONE(S) in 7 files — IMPORT the export; do NOT add another
               js/dig.js:1563  js/eat.js:1149  js/engrave.js:322  js/music.js:129  js/polyself.js:2343  js/sit.js:522  …and 1 more
```

Those seven are not this diff. `do.js` no longer defines `Flying`.

## C ↔ JS fidelity

`youprop.h:253–255`:

```c
#define Flying \
    ((HFlying || EFlying || (u.usteed && is_flyer(u.usteed->data))) \
     && !BFlying)
```

`mhitu.js` `Flying`: sticky `u.Flying` returns true immediately; otherwise `(HFlying || EFlying || (usteed && is_flyer(usteed.data))) && !BFlying`. `is_flyer` is `(mflags1 & M1_FLY)`. The steed arm matches the macro. The sticky early return is not in the macro and ignores `BFlying` when the field is set. The deleted local had the same early return and no steed arm. No `u.Flying =` writer exists in `js/`, so the live result is the macro. The subject states the early return rather than hiding it.

Sites that now call that function, at this SHA:

- Ceiling hider `do.c:1206` → `do.js:3043` `if (Flying())`.
- Hole verb `do.c:1258` `u_locomotion("jump")` → `do.js:3100`, and `hack.c:1827` `Flying` → `do.js:555`.
- Pool splash `do.c:276` and `:280` → `do.js:829` and `:833`. Precedence matches: `Blind || (Levitation || Flying)`.
- Ladder " along" `do.c:1763` → `do.js:1863` `Flying() && atLadder`.

`do.js` `u_locomotion` still returns `defWord` instead of `locomotion(youmonst.data, def)`, and it does not capitalize. Callers here pass `"jump"` and `"climb"`, so the flying word is `"fly"` either way. Both gaps are named in the function comment. They were already named in review 1752.

`do.c:1776` `else if (Flying)` is still `u.Flying` at `do.js:1887`. A flying steed with no hero flying intrinsic does not take "fly down". The D-log names that site. `hack.js:2058` `u_locomotion` still reads sticky `u.Levitation` / `u.Flying` and is not what `dodown` calls.

## Hallucinations / overclaim

The subject does not say the descend arm or `hack.js` `u_locomotion` moved. The map line for `dodown` and the climb "along" test names the export. No dispatch sold as matching C while its callee is a stub. The imported body is the macro plus a dead sticky short-circuit, not a no-op.

## Density

About thirteen lines. The Must-fix was one predicate swap. Right size.

## Verification

Re-ran `node scripts/hidden-proxy.mjs verify dodown --base 24d4c0ac1~1 --reach-all` on this SHA:

```
verify dodown: baseline 24d4c0ac1~1 (scoreboard at 68a6a22da, 2026-09-25T20:36:38.866Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify dodown: no corpus session is blocked on it at 24d4c0ac1~1 — a vacuous verify is NOT a corpus PASS. …
smoke dodown: no RNG-tagged reach; fixed smoke spread (12 run, 3.0s): 12 PASS, 0 regressed → REACH-OK
```

The Must-fix cited 0 blocks. D-log "smoke 12/12, 0 regressed" matches. No `REGRESSED` session. `dodown` does draw `rn2` / `rnd` on the huge-squeeze arm; no baseline-PASS recording tags `@ dodown(`, so the reach line is the smoke spread.

## Actionable C-wrongs

None. The descend `u.Flying` test and `hack.js` `u_locomotion` stay named omits, not a silent stub of the sites this Must-fix named.

Verdict: **ACCEPT**
