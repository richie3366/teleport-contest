# Review 1900 — e2b2ded6d — You_hear (D-2941)

- SHA: `e2b2ded6d` (coverage; `pline.c` `You_hear`, and the same-named clones that dropped arms)
- Files: `js/hack.js` adds the underwater prefix and passes the format plus rest arguments to `vpline`. Fourteen modules drop a local `You_hear` / `You_hear_meat` / `You_hear_apply` and import this export. Valley groans, the floating-eye freeze, the sink suck, the two trap clicks, the gush, and the thief scream call it.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` diff. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (the diff deletes the local copies and re-points the calls at the export):

```
You_hear         js/hack.js:177   ASYNC — await required
You_hear_yell    NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/monmove.js:1149
You_hear_meat    NOT FOUND in js/**
You_hear_apply   NOT FOUND in js/**
```

`imports.mjs --can js/hack.js js/display.js vpline` → `ALREADY`.

## Intent vs deliverable

Subject promises one `You_hear` in C order: deaf-and-awake or acoustics-off returns, then barely-hear, dream, or hear. The diff is that function. The same-named clones are gone. `You_hear_yell` stays, and the commit lists the inlined `pline("You hear …")` callers it did not switch.

## Inventory

| JS | Class | C |
|----|-------|---|
| `You_hear` | live async `hack.js:177` | `pline.c:435–452` |
| prefix + format | inlined `YouPrefix` then `strcat` | `pline.c:359–360`, then `:450` |
| `vpline` | live `display.js:7881` | `pline.c:152–291` |
| `unconscious` | `teleport.js:1704` | `trap.c:6775–6786` |
| `is_fainted` | `eat.js:481` | `eat.c:3346–3350` |

## C ↔ JS fidelity

`pline.c:441`: return when `(Deaf && !Unaware) || !flags.acoustics`. `Deaf` is `youprop.h:125` (`HDeaf || EDeaf || u.uroleplay.deaf`). JS uses those three and not sticky `u.Deaf`. `Unaware` is `youprop.h:399` (`multi < 0 && (unconscious() || is_fainted())`). `unconscious` (`trap.c:6779–6784`) is false when `multi >= 0`, else `usleep` or a `nomovemsg` that starts `You awake` / `You regain con` / `You are consci`. `is_fainted` is `u.uhs == FAINTED`. `FAINTED` is 5 (`hack.h:570`, `const.js`). `Underwater` is `youprop.h:279` (`u.uinwater`).

Prefix order matches `:444–449`: underwater, else unaware, else `You hear `. Both underwater and unaware uses barely-hear, because the underwater test is first. No `rn2`.

`YouPrefix` copies the prefix into a buffer sized for the prefix plus the format. `strcat` appends the format. `vpline` prints that string with the `va_list`. JS passes `` `${prefix}${line}` `` and `...the_args`. `vpline_expand` (`display.js:7826`) leaves a string with no `%` alone, takes a format that is exactly `%s` as the first argument verbatim, and otherwise replaces `%s` / `%d` and the other verbs. `You_hear("%s", hear_txt)` (`zap.c` `You_hear1`, `hack.h:1030`) becomes `You hear %s`, so the argument is substituted and is not used as the whole line. `optlist.h:143–145` defaults acoustics On. The options writer stores `!negated` (`options.js:7354`) and the init value `true` (`:8439`). `=== false` is that off bit. An unset field stays audible, which is the On default.

`You_hear_yell` (`monmove.js:1149`) still returns on `hero_Deaf()` and always prints `You hear `. The commit names it as the `monmove.c:124` caller left outside this function. `dokick.js` still requires `!(u.Deaf || u.HDeaf)` before the gush (`dokick.c:1214`). `apply.js` `flip_through_book` still uses `Deaf_hero()`, which also ORs sticky `u.Deaf`, around the Book of the Dead call. C `apply.c:4483` is `if (!Deaf)` with the macro. That outer test was already there. The sound, when the test passes, now goes through this export, including the `%s` page noise.

## Hallucinations / overclaim

The subject says no arm of `You_hear` is omitted. The return, the three prefixes, and the `vpline` call are present. It says the twelve same-named clones, `You_hear_meat`, and `You_hear_apply` are gone. `sym.mjs` shows one `You_hear`. The inlined callers it lists are still inlined: `dig.js:1081` is `pline('You hear crashing rock.')`, and `trap.js:2614` is still the deferred rumble comment. `You_buf` is not allocated. A null `line` is interpolated by the template. Named.

## Density

The coverage row asked for `You_hear`. The whole body shipped. The modules whose local function dropped an arm now call this export. The commit names the C callers that stay on a prefixed `pline` or on `You_hear_yell`. Not an arm peel of `pline.c:435–452`.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify You_hear --base e2b2ded6d~1 --reach-all`.

```
verify You_hear: baseline e2b2ded6d~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify You_hear: no corpus session is blocked on it at e2b2ded6d~1 — a vacuous verify is NOT a corpus PASS. …
smoke You_hear: no RNG-tagged reach; fixed smoke spread (12 run, 3.3s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44/44 are the port's own verify line (`hack.js` is shared).

## Actionable C-wrongs

None in `You_hear`. `You_hear_yell` and the named `pline("You hear …")` callers are the sites the commit left outside this function.

Verdict: **ACCEPT**
