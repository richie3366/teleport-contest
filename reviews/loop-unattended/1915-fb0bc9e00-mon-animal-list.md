# Review 1915 — fb0bc9e00 — mon_animal_list (D-2956)

- SHA: `fb0bc9e00` (coverage; `mon.c` `mon_animal_list`, and `pick_animal` which is its only gameplay caller)
- Files: `js/makemon.js` stores the list on `game` and retries once on the rogue level.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` hunk. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- Nothing was deleted or re-pointed from a clone to an import. `sym.mjs`:

```
mon_animal_list  js/makemon.js:1184   sync
is_animal        js/monsters.js:648   sync
monsym           js/display.js:524   sync
```

## Intent vs deliverable

Subject promises one exported `mon_animal_list`: construct walks `LOW_PM .. SPECIAL_PM-1`, keeps animals, stores the array and the count; release nulls the list and zeroes the count. `pick_animal` builds on first use, indexes `rn2(animal_list_count)`, and retries once on the rogue level when the symbol is not uppercase. The diff is those two functions. The module-level cache is gone.

## Inventory

| JS | Class | C |
|----|-------|---|
| `mon_animal_list` | live sync `makemon.js:1184` | `mon.c:4828–4852` |
| `pick_animal` | file-local (C `staticfn`) `:1204` | `mon.c:4854–4869` |
| `is_animal` | live `monsters.js:648` | `mondata.h:66` |
| `monsym` | live `display.js:524` | `mondata.h` `def_monsyms[].sym` |
| `monsym_isupper` | file-local `:1245` | `isupper` on that character |
| `free_animals` | not called | `save.c:1102` macro |

## C ↔ JS fidelity

`mon.c:4831–4850`. Construct: the `impossible` re-entry check is a comment. The loop is `n = 0`, `i` from `LOW_PM` while `i < SPECIAL_PM`, and `is_animal(&mons[i])` stores `animal_temp[n++]`. The `n == 0` `NON_PM` store is a comment. Then `alloc` of `n` shorts, `memcpy` of `n` shorts, `animal_list_count = n`. Release: if the pointer is non-null, `free` and store null; the count is zeroed either way. JS `:1185–1196` is that order. The array is the allocation. A second construct replaces the array; C would leak the old block because the impossible check is commented in both.

`is_animal` is `(mflags1 & M1_ANIMAL) != 0`. JS uses optional access, so a null row is not an animal (named). `mondata.h:66` would dereference.

`pick_animal` (`:4857–4867`). Null list calls `mon_animal_list(TRUE)`. `res = animal_list[rn2(animal_list_count)]`. Then `Is_rogue_level(&u.uz) && !isupper(monsym(&mons[res]))` draws a second index and does not loop. JS `:1205–1209` is that. `monsym` returns `MLET_CH[mlet]` or `'?'`. `monsym_isupper` is `charCode` 65–90. The second `rn2` is not drawn when the level is not rogue or the symbol is already uppercase. No other roll.

Caller: prototype `mon.c:33`. `mon.c:5189–5190` `PM_CHAMELEON` under `!rn2(3)` → `makemon.js:1418`. `save.c:1102` is `#define free_animals() mon_animal_list(FALSE)`. Nothing in `js/` calls the release arm. The commit names that with the rest of `freedynamicdata`. The list is not in the save payload; a fresh `game` has a null list and rebuilds.

## Hallucinations / overclaim

The subject says no arm of `mon_animal_list` is omitted. Construct and release are both in the function. The commented `impossible` and `NON_PM` lines are comments in C. It also says `free_animals` stays unwired. That matches: the release body exists and has no caller. It does not claim a save write.

## Density

The coverage row asked for `mon_animal_list`. The 25-line body shipped, and `pick_animal` is the caller that uses the count and the rogue retry. Not an arm peel. The save-time free stays the named `freedynamicdata` omit.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify mon_animal_list --base fb0bc9e00~1 --reach-all`.

```
verify mon_animal_list: baseline fb0bc9e00~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify mon_animal_list: no corpus session is blocked on it at fb0bc9e00~1 — a vacuous verify is NOT a corpus PASS. …
smoke mon_animal_list: no RNG-tagged reach; fixed smoke spread (12 run, 3.5s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty blocked-line is the vacuous note. No `REGRESSED` session. The D-log's green, strict, cohort, and full 44/44 are the port's own verify line (`makemon.js` is shared).

## Actionable C-wrongs

None. The unwired `free_animals` is the named save-teardown omit, and the release arm is in the function.

Verdict: **ACCEPT**
