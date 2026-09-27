# Review 1887 — 167e8ab44 — worn_item_removal (D-2928)

- SHA: `167e8ab44` (coverage; `steal.c` `worn_item_removal`)
- Files: `js/steal.js` only. File-local `worn_item_removal` rewritten. The `uball` caller now passes `u.uchain` with no fallback.
- Queue row: Open coverage, 0 corpus blocks cited
- Banned grep: no `FORCE`, `DIAG`, `getRngLog`, `fastforward`, or seed names in the `js/` diff. `imports.mjs --rulecheck`: "Rule #2 clean: no bare/node specifiers or fs calls in js/."
- `sym.mjs` (prefix and hand edits go through the `hacklib.js` exports, not new locals):

```
strsubst         js/hacklib.js:438   sync
strstri          js/hacklib.js:387   sync
copynchars       js/hacklib.js:230   sync
             !! ALSO 1 LOCAL CLONE(S) in 1 files
               js/topten.js:55
doname           js/objnam.js:3127   sync
remove_worn_item js/steal.js:300   ASYNC — await required
```

`imports.mjs --can js/steal.js js/hacklib.js strsubst` → `ALREADY`. `steal.js` does not add a `copynchars` clone.

## Intent vs deliverable

Subject promises the chain stays "the", the article walk is `copynchars` plus `strsubst`, and " (on left/right …)" becomes "from" only through `strstri` and `strsubst` on `p+2`. The diff is that body. No RNG.

## Inventory

| JS | Class | C |
|----|-------|---|
| `worn_item_removal` | file-local async `steal.js:246` | `steal.c:293–334` static |
| `doname` | live sync | `steal.c:302` |
| `copynchars` | live `hacklib.js:230` | `hacklib.c:286–297` |
| `strsubst` | live `hacklib.js:438` | `hacklib.c:534–551` |
| `strstri` | live `hacklib.js:387` | `hacklib.c:739–779` |
| `remove_worn_item` | live async `steal.js:300` | `steal.c:333` |
| ten `steal.js` callers | already present | `steal.c:382` through `:756` |

## C ↔ JS fidelity

`steal.c:302–313`: `Strcpy` of `doname`. `strncmp` of `"the "` (4), `"an "` (3), `"a "` (2), in that order. If a prefix matches, `copynchars` that many characters and `strsubst` the article to `"the "` when `obj == uchain`, else `"your "`. JS uses `startsWith` for the same three prefixes (case-sensitive, same as `strncmp`) and `copynchars(objbuf, strip_art)`. `hacklib.js:438` replaces the first case-sensitive hit, which is what `strstr` does. `uchain` is `game.u.uchain`.

`steal.c:315–317`: `strsubst` away `" (being worn)"` and `" (alternate weapon; not wielded)"`. JS does both, unguarded, as the C comment says.

`steal.c:319–321`: `strstri(objbuf, " (on ")`. If that tail's `p+5` is `"left "` (5) or `"right "` (6), `strsubst(p+2, "on", "from")`. `strstri` returns the original-case tail (`hacklib.js:424`). `slice(5, 10)` / `slice(5, 11)` are the `strncmp` lengths. The rebuild keeps `live` through the `" ("` and substitutes only `onTail.slice(2)`, so an earlier `"on"` is not touched. A missing match leaves `objbuf` alone.

`steal.c:326–333`: `W_WEAPONS` → `"disarms"`, `W_ACCESSORY` → `"removes"`, else `"takes off"`. Then `pline`, `last_msg = PLNMSG_MON_TAKES_OFF_ITEM`, `remove_worn_item(obj, TRUE)`. JS awaits both. `remove_worn_item` is the live body (`Armor_off` and the other `*_off` calls), not a stub. A missing `game.iflags` is created so the assignment has a target. A null `obj` is not returned before `doname`. Named.

`steal.c:575` passes `uchain` when the stolen object is `uball`. `steal.js:675` now assigns `u.uchain` with no `|| otmp`. The other nine call sites already awaited this function (`steal.c:382`, `:511`, `:523`, `:740`, `:742`, `:747`, `:748`, `:752`, `:756`).

## Hallucinations / overclaim

The subject says no arm of `worn_item_removal` is omitted. The article arm, both suffix strips, the hand `from` arm, the verb, and `remove_worn_item` are present. `strncmp` is not a missing callee: the prefix tests are the same byte compares, and `copynchars` / `strsubst` / `strstri` are the live exports. Lev/Fly text is inside `remove_worn_item`'s `*_off` calls, which is where C puts it.

## Density

The coverage row asked for the whole function. C is 42 lines. The whole body shipped. Callers were already in `steal.js`.

## Verification

Re-run: `node scripts/hidden-proxy.mjs verify worn_item_removal --base 167e8ab44~1 --reach-all`.

```
verify worn_item_removal: baseline 167e8ab44~1 (scoreboard at b88b8599f, 2026-09-27T02:19:54.792Z) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
verify worn_item_removal: no corpus session is blocked on it at 167e8ab44~1 — a vacuous verify is NOT a corpus PASS. …
smoke worn_item_removal: no RNG-tagged reach; fixed smoke spread (12 run, 3.6s): 12 PASS, 0 regressed → REACH-OK
```

The queue row cited 0 blocks, so the empty verify is the vacuous note. No `REGRESSED` session. The D-log's green, strict, and cohort are the port's own verify line (one `js/` file, full suite skipped).

## Actionable C-wrongs

None. A stolen chain is "the iron chain", and a ring on a hand is taken "from" that hand.

Verdict: **ACCEPT**
