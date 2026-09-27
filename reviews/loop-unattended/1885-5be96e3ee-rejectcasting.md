# Review 1885 — 5be96e3ee — rejectcasting (D-2926)

- SHA: `5be96e3ee` (coverage; `spell.c` `rejectcasting`, callee `mondata.c` `can_chant`)
- Files: `js/spell.js` (`rejectcasting`, `can_chant`, deleted local `freehand`). `js/pray.js` and `js/read.js` are comment-only; both already import `can_chant`.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` diff. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (local `freehand` deleted; the call is the `engrave.js` export. `has_head` is the `monsters.js` export):

```
can_chant        js/spell.js:1398   sync
freehand         js/engrave.js:649   sync
             !! ALSO 3 LOCAL CLONE(S) in 3 files — IMPORT the export; do NOT add another
               js/pickup.js:3323  js/pray.js:379  js/steed.js:190
has_head         js/monsters.js:367   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files
               js/shk.js:4696
```

`imports.mjs --can js/spell.js js/engrave.js freehand` → `ALREADY`. `--can js/spell.js js/monsters.js has_head` → `ALREADY`. This SHA did not add a fourth `freehand`.

## Intent vs deliverable

Subject promises `rejectcasting` prints the three lines itself, uses `engrave.c` `freehand`, and replaces the hero-only `can_chant` with the `mondata.c` predicate. The diff does that. `pray.js` / `read.js` keep `can_chant()` with no argument; a null `mtmp` is the hero. No RNG.

## Inventory

| JS | Class | C |
|----|-------|---|
| `rejectcasting` | file-local async `spell.js:1422` | `spell.c:685–708` static |
| `can_chant` | live sync `spell.js:1398` | `mondata.c:579–587` |
| `freehand` | live `engrave.js:649` | `engrave.c:472–477` |
| `has_head` | live `monsters.js:367` | `mondata.h:55` |
| `hero_Stunned` / `hero_Strangled` | local mirrors | `youprop.h` `HStun` / `Strangled` |
| `getspell` | caller `spell.js:1852` | `spell.c:726` |
| `spelleffects_check` | caller `spell.js:1957` | `spell.c:1236` |
| `doturn` | `pray.js:2951` `can_chant()` | `pray.c:2432` |
| `doread` | `read.js:2267` `can_chant()` | `read.c:613` |

## C ↔ JS fidelity

`spell.c:690–707`: if `Stunned`, `You("are too impaired…")` and true. Else if `!can_chant(&youmonst)`, `You("are unable to chant…")` and true. Else if `!freehand() && !(uwep && uwep->otyp == QUARTERSTAFF)`, `Your("arms are not free…")` and true. Else false. JS is that order. `freehand` runs before the quarterstaff test, so `welded` still sets `bknown`. The `makeplural(body_part(ARM))` text is a comment in C (`spell.c:697–703`), not a call.

`engrave.c:472–477`: `!uwep || !welded(uwep) || (!bimanual(uwep) && (!uarms || !uarms->cursed))`. `engrave.js:649–654` is that expression. The deleted `spell.js` helper treated any non-`oc_big` weapon as a free hand. It is gone from this file.

`youprop.h`: `Stunned` is `HStun`, which is `u.uprops[STUNNED].intrinsic`. `Strangled` is `u.uprops[STRANGLED].intrinsic`. JS ORs the flat (`u.HStun` / `u.Strangled`) with the intrinsic. `make_stunned` writes `u.HStun` and copies it to `u.Stunned` (`potion.js:944–945`). The timeout writes the intrinsic and the flat together (`timeout.js:1185–1193`). Named. No `EStun`.

`mondata.c:582–586`: false when the hero is strangled, or `is_silent(data)` (`mondata.h:62`, `msound == MS_SILENT`), or `!has_head(data)`, or `MS_BUZZ`, or `MS_BURBLE`. Otherwise true. JS matches for a resolved `data`. `MS_SILENT` / `MS_BUZZ` / `MS_BURBLE` are 0 / 10 / 16, the same `monflag.h` enum `sounds.js:839–855` already uses. `has_head` is `!(mflags1 & M1_NOHEAD)` (`monsters.js:367`), matching `mondata.h:55`.

A missing hero `data` is filled from `u.umonnum`, else `urole.mnum`. If that lookup is still null, silent / buzz / burble / headless are all false, so the hero can chant unless strangled. C would read `mtmp->data`. Named (`set_uasmon` deferred). `can_chant()` with no argument is the hero, so `pray.c:2432` and `read.c:613` hit this body.

## Hallucinations / overclaim

The subject says no arm of `rejectcasting` or `can_chant` is omitted. The three reject arms and the five chant predicates are present. `freehand` is the live export, not the old `oc_big` clone. The remaining `freehand` clones are in other files and are not callers of `rejectcasting`. `getspell`'s `CQ_REPEAT` path is outside this function and stays named.

## Density

The coverage row asked for the whole function. Both C callers of `rejectcasting` await it. `can_chant`'s three C callers all reach the new body. No stub arm.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify rejectcasting --base 5be96e3ee~1 --reach-all`.

```
verify rejectcasting: baseline 5be96e3ee~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify rejectcasting: no corpus session is blocked on it at 5be96e3ee~1 — a vacuous verify is NOT a corpus PASS. …
smoke rejectcasting: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line (three `js/` files, full suite skipped).

## Actionable C-wrongs

None. A stunned, silent, headless, buzzing, burbling, strangled, or welded caster is rejected with the C line.

Verdict: **ACCEPT**
