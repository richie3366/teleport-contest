# Review 1897 — 17ee8fa4f — append_honorific (D-2938)

- SHA: `17ee8fa4f` (coverage; `shk.c` `append_honorific`)
- Files: `js/shk.js` adds the vampire and elf suffixes. The title `rn2` was already there.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` diff. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (C is `staticfn`; the new names are imports):

```
append_honorific NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/shk.js:4231
is_vampire       js/monsters.js:801   sync
is_elf           js/monsters.js:598   sync
is_human         js/monsters.js:593   sync
Upolyd           js/const.js:3190   sync
```

`imports.mjs --can js/shk.js js/monsters.js is_vampire` → `ALREADY`. `maybe_polyd` and `Race_if` are macros, inlined here. No new `Race_if` clone.

## Intent vs deliverable

Subject promises the five titles, then vampire, else elf (poly form or elf race), else creature / lady / sir. The diff is that. One `rn2(4)` plus `udemigod`.

## Inventory

| JS | Class | C |
|----|-------|---|
| `append_honorific` | file-local `shk.js:4231` | `shk.c:3602–3620` |
| `is_vampire` | live `monsters.js:801` | `mondata.h:213` `mlet == S_VAMPIRE` |
| `is_elf` / `is_human` | live `:598` / `:593` | `mondata.h` `M2_ELF` / `M2_HUMAN` |
| `Upolyd` | live `const.js:3190` | `you.h:554` |
| `Race_if(PM_ELF)` | inlined | `you.h:297` |
| `maybe_polyd` | inlined ternary | `youprop.h:22` |

## C ↔ JS fidelity

`shk.c:3606–3618`: `honored[]` is five strings. `Strcat` of `honored[rn2(SIZE(honored) - 1) + u.uevent.udemigod]`. `SIZE - 1` is 4, so `rn2(4)` is 0..3. `udemigod` is a 1-bit field (`you.h:52`), so the index is `[0]..[3]` or `[1]..[4]`. Then `is_vampire` appends `" dark lady"` or `" dark lord"`. Else `maybe_polyd(is_elf(youmonst.data), Race_if(PM_ELF))` appends `" hiril"` or `" hir"`. Else `!is_human` appends `" creature"`, else `" lady"` or `" sir"`. `flags.female` chooses the gendered word.

JS is that order. `Upolyd ? is_elf(ptr) : urace.mnum === PM_ELF` is the macro: the elf-monster test runs only while polymorphed. `bufRef.s +=` is `Strcat`. `female` is read once into a local. C reads `flags.female` in the arm that runs and does not change it between the reads. Same word.

A null `youmonst.data` is not a vampire, elf, or human (`mlet` / `mflags2` read 0), so the else arm says `" creature"`. C would dereference. Named. A missing `uevent` throws on `udemigod`. Named.

Caller: `shk.c:65` prototype. `shk.c:3573` is the in-inventory quote, after a space and before `"; only"`, and only when the shopkeeper is not angry and has no surcharge → `shk.js:4325` inside `addtobill`. No other C call.

## Hallucinations / overclaim

The subject says no arm is omitted. The title draw, vampire, elf, creature, lady, and sir arms are present. It does not claim a second caller.

## Density

The coverage row asked for `append_honorific`. The whole static body shipped, and the one caller already built the `"For you,"` buffer. Not an arm peel.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify append_honorific --base 17ee8fa4f~1 --reach-all`.

```
verify append_honorific: baseline 17ee8fa4f~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify append_honorific: no corpus session is blocked on it at 17ee8fa4f~1 — a vacuous verify is NOT a corpus PASS. …
smoke append_honorific: no RNG-tagged reach; fixed smoke spread (12 run, 3.2s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort, and the skipped full suite, are the port's own verify line (one file, `shk.js`).

## Actionable C-wrongs

None. A vampire is "dark lord" or "dark lady", and an elf is "hir" or "hiril".

Verdict: **ACCEPT**
