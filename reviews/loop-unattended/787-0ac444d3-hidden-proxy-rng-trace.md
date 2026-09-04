# Review 787 — 0ac444d3 — hidden-score proxy; rng.js optional caller tag

## Metadata
- Full / short hash: `0ac444d3312745addb4abd7a90c62b39ca071c8d` / `0ac444d3`
- Parent: `bac0ae69` (D-1817). Human-requested process take (journal: aim at held-out, not public 44).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-04 19:27:08 +0200
- D-id: none (no D-log peel). No prior review on this SHA.
- Stats: scored `js/` is **`js/rng.js` +35/−6** only. Insertions **35** ≤250. Band **80–350**. Rest is scripts, `hidden-corpus/` recipes, playbook/runbook/prompts, `HIDDEN-PROXY.md`.
- Claims to close: nothing in Must-fix. Promises a C-recorded corpus with per-function attribution and one-call orient/verify/finish. Promises the JS tag is **off in scored play** and that comparators strip ` @ …`.
- JS / map: `js/rng.js` `logRng` / `rngCaller`. Not a map peel.

## Intent vs deliverable

Git subject promises: aim the loop at the held-out score via a hidden-score proxy, attribution, and cheaper iteration tools.

`node scripts/csym.mjs rn2` → `rnd.c:94–107`. `rnd` `:154–165`. C does not log inside these functions; the recorder patches `__func__/__FILE__/__LINE__` onto the log line. This peel does **not** change `RND` / return values.

The `js/` diff **does** wrap existing `_rngLog.push` in `logRng`: when `_rngLogEnabled` and `globalThis.__NH_RNG_TRACE` (set only in `scripts/lib/hidden-worker.mjs`), append ` @ jsfn(file.js:line)`. Default TRACE unset → **byte-identical log strings to parent**. `rn2`/`rnd`/`rnl`/`d`/`rne`/`rnz` still return the same integers. No new gameplay helpers.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `rn2` / `rnd` / `rnl` / `d` / `rne` / `rnz` | LIVE unchanged values | log wrapper only |
| `logRng` / `rngCaller` | harness-only | not C; off unless TRACE |
| `getRngLog` / `enableRngLog` | LIVE unchanged | no new production reads |
| corpus recipes / scoreboard | not scored `js/` | |
| playbook / runbook / loop prompts | process | CURRENT already called this a one-shot |

`node scripts/sym.mjs`:

```
rn2              js/rng.js:89   sync
rnd              js/rng.js:97   sync
rnl              js/rng.js:…   sync
d                js/rng.js:…   sync
rne              js/rng.js:…   ASYNC? sync — calls rn2
rnz              js/rng.js:…   sync
logRng           NOT EXPORTED — 1 LOCAL in rng.js
rngCaller        NOT EXPORTED — 1 LOCAL in rng.js
```

No clone→import. FORCE/DIAG/`fastforward`/seed-in-control-flow in `js/`: **none**. TRACE is a log suffix, not a branch on seed/step/coord. `getRngLog()` is not consulted for gameplay.

## C ↔ JS fidelity

**Return path (`rnd.c:94–107` / `:154–165`).** `x <= 0` → 0; else `RND(x)` / `RND(x)+1`. JS still does that then logs. **Match.**

**Log strings in scored play.** TRACE default false. `logRng` pushes the same `rn2(x)=val` (etc.) as parent. Frozen `ps_test_runner.mjs:62–63` already strips `\s*@\s.*$` (C recorder tags). `fuzz-compare.mjs:25–27` and `rng-diff.mjs:24–26` do the same. So even if a harness left TRACE on, positional compare still uses the call/value. **The tag is not a session-pass gate.**

**Not a gameplay port.** No C callee stubbed. No dispatch. `__NH_RNG_TRACE` lives on `globalThis` (Node and Chrome). No `fs`/`path`/`node:*` in `js/rng.js`.

**REJECT test (playbook anti-patterns / review prompt).** A seed, step, recorded coordinate, or RNG **index** used to make a corpus or public session pass → REJECT. This SHA tags **caller identity for attribution** after the draw, and only when a non-scored worker sets the flag. Values and control flow are unchanged. **Not REJECT.**

## Hallucinations / overclaim

“Every comparator strips” is true of the frozen runner, `fuzz-compare`, `rng-diff`, and the hidden worker (`normalizeRng`). `strict-output-check.mjs` has no `@` strip — it compares screens, not RNG lines. Do **not** stamp a D-id. Do **not** treat `hidden-proxy score` as a public-suite substitute. Playbook/runbook edits are the allowed one-shot; later iters must not rewrite them.

## Density

§2b: instrumentation + process, not a C function cluster. +35 in scored `js/`. Right size for a harness tag. The corpus/docs bulk is outside `js/`.

## Verification

Journal: green + strict + full 44/44 re-run at D-1817; proxy 157/265 at this SHA. No `hidden-proxy verify <fn>` — **no corpus session is blocked on `rngCaller`**; it is not a C function. This audit: `csym` `rn2`/`rnd` vs HEAD `js/rng.js` `logRng` (TRACE off ⇒ parent log). Rule #2 at end-of-iter.

## Actionable C-wrongs

None. Named (not Must-fix): `rne`/`rnz` inner `rn2` also tagged when TRACE is on (harness attribution noise); ordinary loop iters must not edit playbook/runbook/prompts again.

Verdict: **ACCEPT**
