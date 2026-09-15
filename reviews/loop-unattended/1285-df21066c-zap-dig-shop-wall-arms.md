# Review 1285 — df21066c — dig.c zap_dig shop-wall arms: add_damage + maze watch_dig removal (D-2319)

Metadata: SHA `df21066c`, D-2319, C-fidelity residuals (row cited 0 blocks). Method: `git show` full `js/` hunk (`js/dig.js` +7/−1); C `zap_dig dig.c:1547-1754` (`csym.mjs` full body; ranges cited: maze wall `:1686-1698`, ordinary wall/SDOOR `:1712-1729`, door `:1664-1683`, tail `:1751-1752`); `sym.mjs add_damage`; `imports.mjs --rulecheck` + `--can dig.js shk.js add_damage`; added-lines banned-pattern grep; `hidden-proxy verify watch_dig --base df21066c~1` re-run.

## Intent vs deliverable

Subject promises: missing `add_damage(SHOP_WALL_COST)` in both wall arms + extra maze `watch_dig` removal. Diff delivers exactly that: static `SHOP_WALL_COST` join, two per-arm dynamic-import `add_damage` calls in C order, maze `watch_dig` deleted with C-cite comment. Promise kept.

## Inventory

- Maze wall arm: `add_damage(zx, zy, SHOP_WALL_COST)` added before `shopwall = true`; `await watch_dig(null, zx, zy, true)` deleted.
- Ordinary IS_OBSTRUCTED wall/SDOOR arm: `add_damage(zx, zy, SHOP_WALL_COST)` added before `shopwall = true`; `watch_dig` kept.
- One static import join: `SHOP_WALL_COST` from `const.js` (already exported).

## C ↔ JS fidelity

Maze arm vs C `:1686-1698` (`in_rooms SHOPBASE → add_damage(SHOP_WALL_COST) + shopwall=TRUE`, then `typ=ROOM, flags=0`, `unblock_point`, NO `watch_dig`): JS now schedules-then-converts with no watch call ✓. The deleted `watch_dig` was added by D-0941 and wrongly blessed by review 08 — D-log names the mis-blessing explicitly (self-correction, not concealment) ✓.

Ordinary arm vs C `:1712-1729` (`add_damage(SHOP_WALL_COST) + shopwall=TRUE`, then `watch_dig(0,zx,zy,TRUE)`, then cavernous→CORR else DOOR/D_NODOOR): JS order is add_damage → shopwall → watch_dig → cavernous branch ✓; the cavernous/CORR-vs-DOOR shape predates this SHA and is untouched ✓.

Callee closure: `add_damage` LIVE (`js/shk.js:1048` sync, called un-awaited — correct); per-arm dynamic `import('./shk.js')` is the file's own convention (door arm at pre-existing `js/dig.js:1170` + cost-0 call sites `:998/1042` + dighole `:734`), so no new static module edge and no TDZ risk (`--can`: IN-SCC, already one 90-module SCC — cycle alone not a defect; call is post-`await import`, not a top-level read). No STUB in a live arm. `recalc_block_point` for C `unblock_point` is the file's standing convention, pre-existing. Named omits (SetVoice, do_break_wand ICE polish, swallowed-pierce/pitdig families, add_damage flags shape) each name an owning row.

Tail flow: both arms set only the `shopwall` flag while `add_damage` schedules the cost — the pre-existing tail (`pay_for_damage('dig into')`, `js/dig.js:1254-1257` per D-log) now bills a nonzero `damagelist` where before it billed 0 on these arms. That is the user-visible fix (shop repair + billing), and it rides the D-0941 tail without touching it.

D-log honesty note: the entry names review 08's maze-`watch_dig` blessing as wrong with the exact pinned-C range that refutes it (`:1686–1698` has no call) — a prior review's error corrected on the record, not silently absorbed. The hand probe's pre-fix 4 FAIL (conversion without `damagelist`) is the falsifier that would have caught a no-op port.

Subject's "`add_damage` draws no RNG on either side" verified against C `:4398-4437` (pure damagelist walk/alloc/memset, zero draws) and the JS sync body — the RNG-stream-untouched claim is measured, not assumed.

RNG walk: no `rn2/rnd/rn1/d` in any added line; `add_damage` draws no RNG on either side (C `:4398-4437` pure damagelist walk/alloc). Stream untouched ✓.

## Hallucinations / overclaim

None. "No corpus divergence" + vacuous-explicit hidden note, no `--base` owed (row cited 0 — confirmed by this review's re-run), probe honesty (hand probe disclosed as deleted `/tmp`, not a committed test; sessions-are-the-suite disclosure per skill).

## Density

+7/−1 for two one-line C arms — C is that small, so §2b's density floor is met, not evaded. One envelope, one falsifier family. Good.

## Verification

D-log: `verify --fn watch_dig` syntax/rule2/green 2/2/strict ×2/cohort 7/7 PASS with vacuous-honest hidden note, final verify after last `js/` edit; full 44/44 on ship tree. Re-measured by this review:

```text
verify watch_dig: baseline df21066c~1 (scoreboard at 775e5959) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches — no regression laundered through a baseline rewrite. Added-lines grep: no FORCE/DIAG/`getRngLog`/`fastforward`/seed-gates/coords. `imports.mjs --rulecheck`: clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
