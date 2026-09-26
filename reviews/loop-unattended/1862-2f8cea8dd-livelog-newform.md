# Review 1862 — 2f8cea8dd — livelog_newform (D-2903)

- SHA: `2f8cea8dd` (coverage; `polyself.c` `livelog_newform`)
- Files: `js/polyself.js` (new function and the `newman` else arm), `js/do_wear.js` (Amulet of Change call)
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean". No symbol deleted. The new names ride existing imports (`--can` ALREADY for `do_wear.js` → `polyself.js` and `polyself.js` → `roles.js`).
- `sym.mjs`:

```
rank_of          js/roles.js:809   sync
livelog_printf   js/pline.js:23   sync
an               js/objnam.js:2342   sync
Upolyd           js/const.js:3190   sync
genders          js/roles.js:721   sync   export const
```

## Intent vs deliverable

Subject promises a sex-change livelog that is silent while polymorphed, the role/rank/`an()` choice, and the two callers: `newman` when the level does not change, and the Amulet of Change before the amulet is destroyed. The diff adds `livelog_newform` and those two calls. It does not add a second logger.

## Inventory

| JS symbol | Class | C |
|-----------|-------|---|
| `livelog_newform` | export `polyself.js:964` | `polyself.c:306–333` |
| `rank_of` | live `roles.js:809` | `botl.c:331–358` |
| `livelog_printf` | live `pline.js:23` | `LL_MINORAC` `%s into %s` |
| `an` | live `objnam.js:2342` | article on the chosen title |
| `Upolyd` | live `const.js:3190` | `you.h:554` `umonnum != umonster` |
| `genders` | live `roles.js:721` | `role.c` adj, index `flags.female` |
| `newman` else | caller in this diff | `polyself.c:448–452` |
| `Amulet_on` CHANGE | caller in this diff | `do_wear.c:1029` |

## C ↔ JS fidelity

`csym` body is `polyself.c:306–333`. The two callers are `do_wear.c:1029` and `polyself.c:452`. No RNG in this function.

The body is `if (!Upolyd) { if (newgend != oldgend) { … } }`. A polymorphed hero returns without a log. Equal genders return without a log. `Upolyd(u)` is the macro.

Role strings: `(gend && urole.name.f) ? name.f : name.m` for old and new. Gender 2 (neuter) is nonzero, so it takes `name.f`, same as C. Rank is `rank_of(u.ulevel, urole.mnum, gend)`. `Role_switch` is `you.h:248` `urole.mnum`. C `rank_of` takes `boolean female`, so any nonzero gender selects the female title. The imported `rank_of` does `if (female && ent.f)`.

The fallback buffer is `Sprintf("%.10s %.30s", genders[flags.female].adj, newrank)`. JS slices `adj` to 10 and `newrank` to 30 and joins them with a space. `flags.female` is the sex after `change_sex`, used as index 0 or 1. `genders[0].adj` is `"male"` and `[1].adj` is `"female"`.

The `an()` argument is `newrole` when it differs from `oldrole`, else `newrank` when that differs, else the buffer. JS `!==` on those strings is `strcmp != 0`. The log is `livelog_printf(LL_MINORAC, "%s into %s", viapoly ? "polymorphed" : "transformed", an(which))`. `livelog_printf` substitutes `%s` in order and is synchronous, so the callers do not await it.

The comment in C about other logging instead of `newman` is a TODO. It is not a call. The function does not call `newman`.

`newman` (`polyself.c:448–452`): if the level changed, the existing level line; else `livelog_newform(TRUE, oldgend, newgend)`. `oldgend` is `poly_gender()` before the `rn2(10)` sex roll (`:360`). `newgend` is `poly_gender()` after `polyman` (`:445`). The old `void oldgend; void newgend` discard is gone.

Amulet of Change (`do_wear.c:1029`): after both the changed-sex and the unchanged branches, `livelog_newform(FALSE, orig_sex, new_sex)`, then `pline_The("amulet disintegrates!")`. `orig_sex` / `new_sex` are the `poly_gender()` pair around `change_sex` (`do_wear.c:1002–1010`, `do_wear.js:2821–2823`). Equal sexes hit the function and log nothing.

## Hallucinations / overclaim

The subject says the function matches the 28-line body and both callers. The TODO comment is not implemented as a call. The level-change arm still uses the existing `livelog_printf` and does not also call `livelog_newform`. That is the C `if / else`, not a dropped arm.

## Density

The whole C function is the new export. Both call sites that `csym --callers` lists are wired in this commit. `rank_of`, `an`, and `livelog_printf` are live. No stub in the arm.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify livelog_newform --base 2f8cea8dd~1 --reach-all`.

```
verify livelog_newform: baseline 2f8cea8dd~1 (scoreboard at 9a80efcd8, 2026-09-26T22:08:21.801Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify livelog_newform: no corpus session is blocked on it at 2f8cea8dd~1 — a vacuous verify is NOT a corpus PASS. If the queue row cited N corpus blocks, re-run with --base <the commit that row was queued at>; otherwise ship with the public gates + the reach line below and say so in the D-log.
smoke livelog_newform: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44/44 are the port's own verify line. A sex-change log does not move the public screen or RNG totals.

## Actionable C-wrongs

None. The polymorphed skip, the gender test, the role/rank/buffer choice, and both call sites match `polyself.c:316–330`, `polyself.c:448–452`, and `do_wear.c:1029`.

Verdict: **ACCEPT**
