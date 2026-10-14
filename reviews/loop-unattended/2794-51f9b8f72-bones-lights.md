# Review 2794 — 51f9b8f72 — bones load installs RANGE_LEVEL lights

- **SHA:** `51f9b8f72` (Wed 2026-10-14) — welcome-remainder writer (D-3942).
- **D-entry:** D-3942. **Ledger:** `bones.c` row (getlev lights un-named).
- **Diff size:** `js/bones.js` +13/−4 (1 call + import name + cites),
  `js/save.js` comment-only, new 1-it test.
- **Method:** cliff commit (≤10 fns) — whole Method on the one call.

## Intent vs deliverable (promise vs diff)

The subject promises: chain-Ranger-49950026 seg4 step 0 blanks two
unlit-CORR `#` cells because getlev_bones never installed the blob's
RANGE_LEVEL lights; one `restore_light_sources(info.lights)` call in
C order (after restore_timers) moves it to FULL PASS.

The diff adds exactly that call plus cites, un-names the omission in
two comments, and ships a focused test. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | `restore_light_sources(info.lights)` (bones.js:751) | restore.c getlev :1045–1311, `:1145` after `:1144` | whole arm vs C |
| 2 | save.js comment (stale-note fix) | — | docs only |
| 3 | `scripts/bones-lights-load.test.mjs` (new, 1 it) | — | passes 1/1 (ran) |

`sym.mjs restore_light_sources`: live sync export (mkobj.js:1347),
no clones. The import name joins the pre-existing bones→mkobj line —
no new edge (ALREADY evident in the diff). No symbol deleted or
re-pointed. Callee is a pure installer (pushes onto
`game.light_base`); no RNG.

## C ↔ JS fidelity

C order verified in pinned restore.c: `restore_timers` (:1144) →
`restore_light_sources` (:1145) → … → `relink_timers`/`relink_light_sources`
(ghostly, :1299–1300) → `reset_oattached_mids` (:1301). JS places the
install identically; the skipped ghostly relink is sound: deserLevel
hydrates lights as `{type,x,y,range,id}` with **no** flags field and
`relinkLevelTimersLights` resolves ids to live blob pointers before
`getlev_bones` runs (bones.js:659, no skipRelink), so a
`relink_light_sources` call would hit the `LSF_NEEDS_FIXUP` skip on
every entry — a strict no-op, exactly as claimed. Missing-id loudness
is preserved (deserLevel throws the same `relink_light_sources: no
…` errors). Timers precedent (D-3864) mirrors this shape. ✓

Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. Rule #2:
clean (iteration-wide, SHA 2790).

## Hallucinations / overclaim

None. The "2 REGRESSED proven pre-existing" handling is exemplary:
the commit names both sessions with steps and shapes, proves
inertness (single-segment — I confirmed both sessions have exactly 1
segment, so no bones load runs), does the stash test, and files the
Must-fix row in the same commit (the row D-3943 popped). D-3943's
later analysis independently confirms the cause (D-3941's loaded
arm). The `owner=js-throw` tooling note matches the format fallback I
verified (hidden-proxy.mjs:676/722).

## Density

Cliff phase (§10.18): parent head was welcome 21/2815 (verified in
`51f9b8f72~1:docs/LOOP-QUEUE.md`), Must-fix empty. The row's one
movable session (chain-814; the other 20 are the parked UTF8
artifact) moved to FULL PASS. Own Ledger update. ✓

## Verification

Re-measured myself (`--base 51f9b8f72~1 --reach-all --jobs 8`, current code):

```
verify welcome: 1 PASS, 0 moved past, 20 unchanged, 0 worse → PROGRESS
smoke welcome: 24 PASS, 0 regressed → REACH-OK
reach getbones: 2347 baseline-PASS session(s) reach it (2347 run, 1801.9s): 2347 PASS, 0 regressed → REACH-OK
```

The D-log's "1 PASS, 20 unchanged" reproduces exactly; the 2
LADDER REGRESSED it saw are gone (healed by D-3943), consistent with
the pre-existing verdict. No REGRESSED session.

## Actionable C-wrongs

None. One call, C-ordered, skipped relink proven a no-op, movement
and full reach reproduce clean.

Verdict: **ACCEPT**
