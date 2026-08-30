# Porting NetHack 5.0 C → JavaScript — Strategy Notes

Living brainstorm for this fork. Written after reading the contest
docs, surveying the JS skeleton (~8k LOC), checking out
`nethack-c/upstream` at `NetHack-5.0.0_Release`, and reviewing David
Bau's announcement field report. Not a schedule — a map of approaches,
risks, and context-window tactics for many prompting iterations.

> **Operational note (2026-07-12):** this document preserves strategy and the
> initial skeleton survey; many "today" status statements below are historical.
> Agents execute `PORTING-RUNBOOK.md`, take the current objective/score from
> `PROGRESS.md`, and take structural status from `C-JS-MAP.md`.

## Decision (locked)

**Category: `agentic`.** LLM-driven faithful port of C → readable JS.
**No transpiling** — no Emscripten, no C-heap-in-JS, no AST dump of
the whole engine as the scored artifact. The C recorder stays a
*reference and debugger*; the submission is hand/agent-written modules
mirroring NetHack’s structure.

Phase 2 insurance is a **reproducible porter workflow** (prompts,
packets, constitution), not a re-transpile button.

---

## 1. What we are actually optimizing for

**Objective.** A plain ES6 JavaScript NetHack 5.0 whose external
behavior is indistinguishable from the patched C recorder:

- Same ISAAC64 PRNG call sequence (two streams: core and display; Lua
  `nh.rn2` calls use core with Lua caller provenance).
- Same 24×80 terminal (char + color + attrs + cursor) at every
  `tty_nhgetch` boundary.
- Runnable in Node 22+ and Chrome with **no build step, no WASM, no
  network, no native addons**.

**Scoring (what points are).** Count of matched screens across
~22k steps (44 public + 44 held-out). PRNG match is advisory but
structurally required — one off-by-one RNG call cascades forever.
Partial credit is per-step: diverge at step 50 and you still keep 50.

**Public corpus snapshot (this checkout).**

| Metric | Value |
|--------|------:|
| Public sessions | 44 |
| Steps (screens) | 11,405 |
| Recorded RNG leaf calls | ~793k |
| Hardest by size | `seed4500` (~1814 steps), `seed0030` (10 segments / deaths), `seed0360` (wizard tour / ~121k RNG) |

Sessions exercise chargen, combat, shops, hallucination, save/restore +
bones, quest tours, wizmode `#levelchange`, custom keybinds, Friday the
13th / moon phase, and multi-role coverage — not just “walk around
Dlvl 1.”

**Phase 2 (Dec 2026) changes the game.** Score is parity ÷ diff size
against your Phase 1 freeze. For an agentic entry, that means: clean
module boundaries, C-aligned naming, and a porter workflow that can
re-absorb a 5.1 delta without rewriting the world. Phase 1
architecture is a Phase 2 bet.

**Contest hypothesis.** *The magic is in the LLM methods, not the
code.* Public forks by design. Best-Method award exists separately
from ranking.

---

## 2. Constraints that shape every approach

| Constraint | Implication |
|------------|-------------|
| Plain JS modules only | No TypeScript emit, no bundler required, no WASM. Agents write ES modules directly. |
| Agentic only (this fork) | No shipping transpiled C. Optional *local* C recorder for diffs is fine; it is not the port. |
| Frozen `isaac64.js` / `terminal.js` / `storage.js` | Engine must speak these contracts. Don't invent a parallel PRNG or screen format. |
| Sandbox | No FS writes, no net, no `child_process`, no workers. Save/bones/topten only via `storage` VFS. |
| Clang left-to-right arg eval | Match C call order as clang sees it. Nested `d(rn2(a), rn2(b))` is a classic footgun; JS evaluates L→R like clang. |
| Stable qsort (patch 002) | Port must use a **stable** sort wherever C uses `qsort`. |
| Pinned datetime + seed | Moon phase, hire dates, Friday-13 luck, shopkeeper lines — all from `NETHACK_FIXED_DATETIME`. |
| Dual RNG + Lua provenance | Core gameplay and Lua `nh.*` draws share core; display/hallucination has its own stream. |
| Cursor now matters | May 2026 scorer change: cursor position is part of screen match. |
| 900s wall clock / session | Pathological slow JS loses. |

---

## 3. Initial terrain survey (historical skeleton snapshot)

### C reference (`nethack-c/upstream`)

- **`src/`:** ~130 `.c` files, ~250k LOC. Real port surface ~90–95
  gameplay files after discarding `win/` + `sys/` + sound.
- **`include/`:** ~88 headers; X-macro tables (`objects.h`,
  `monsters.h`), property macros (`youprop.h`), god-object globals
  (`decl.h` → `u`, `ga*`…`gz*`, `sv*` save blobs).
- **`dat/*.lua`:** 131 scripts — dungeon graph, quests, special
  levels, `nhcore.lua` callbacks. NetHack 5.0 **replaced** the old
  des/yacc level compilers with runtime Lua.
- **Largest files:** `options.c`, `trap.c`, `sp_lev.c`, `zap.c`,
  `uhitm.c`, `shk.c`, `mon.c`, `cmd.c`, `objnam.c`, `invent.c`.
- **Clean UI seam:** `struct window_procs` (`winprocs.h`). JS should
  implement that vtable against frozen `terminal.js`, not reimplement
  tty/curses.

### JS skeleton (`js/`)

~8k LOC across 23 files. Intentionally incomplete.

| Area | Status |
|------|--------|
| Terrain mklev | Substantial (rooms/corridors/stairs); fill/mineralize skipped |
| Vision / display | Partial (Algorithm C stripped; terrain + `@` only) |
| RNG + replay harness | Real (`runSegment`, `nhgetch` capture) |
| Commands | Movement only (`hjklyubn`) |
| Objects / monsters / combat | Missing (stubs that burn RNG) |
| Chargen / u_init / o_init | Hardcoded Tourist + `fastforward.js` |
| Save / bones / Lua | Missing |

**`fastforward.js` is a trap with a purpose.** It burns the seed8000
RNG leaf sequence so the skeleton can render a few screens. It will
never generalize. Progress = delete chunks of it as real ports land
and keep the RNG log aligned.

### Bau’s hard-won lessons (from the announcement)

1. **Be skeptical of agent religions.** Agents invented “sparse
   boundary frames” and a whole `replay_core.js` theology to explain
   away async bugs. Confident wrong theories stick in comments and
   names.
2. **Strategy over vanity metrics.** Agents prefer easy new tests
   over hard stuck sessions. Dashboard goes up; fundamentals don’t.
3. **Invest in human–AI tooling.** Session viewer, board analysis,
   code analysis — expand shared understanding.
4. **Contaminated codebases may need a restart.** 200k LOC of wrong
   async meme was cheaper to discard than to purge. Capture lessons
   into prompts/docs before restarting.
5. **Get the game loop / async input model right on day one.**

These are not folklore — they are the reason the contest skeleton
looks the way it does.

---

## 4. Chosen approach: agentic faithful port

**What we do.** Keep C module boundaries (`mklev.js` ↔ `mklev.c`).
LLM agents port function-by-function (or tight clusters), guided by
session RNG/screen divergence. Humans own strategy, constitution, and
killing agent religions.

**What we do not do.**

- Ship Emscripten / simulated-C-heap / whole-program transpile as
  `js/`.
- Grow `fastforward.js` to fake new seeds.
- Invent deferred frame-alignment queues to paper over async bugs.

**Allowed supporting pieces (not “transpiling the game”):**

| Piece | OK? | Why |
|-------|-----|-----|
| Header/X-macro **codegen** → data tables / accessors | Yes | Data extract, not engine transpile |
| Pure-JS **Lua VM** (e.g. Fengari) running upstream `.lua` | Yes | Runtime embed; scripts stay source |
| Local **C recorder** diffs / custom sessions | Yes | Oracle for debugging only |
| Batch LLM “translate this `.c` file” prompts | Yes | Still agentic generation into readable JS |
| AST tools that *assist* a human/agent edit | Yes | Aid, not the scored artifact |

**Success depends on harness discipline** (sections 6–8): C as ground
truth, sessions as acceptance tests, constitution before mass
generation, auditors that refuse clever non-C fixes.

### Rejected alternatives (kept for context)

- **Full transpile (serteal-style):** wins Phase 1 speed; fights our
  Phase 2 / Best-Method goals; explicitly out of scope.
- **Mechanical whole-repo AST dump as product:** too close to
  transpile; ugly; hard to shepherd. Selective codegen for *tables*
  only is fine.
- **Data-only thin engine:** NetHack isn’t data-driven enough; still
  need ~200k LOC of behavior. Tables are a component, not a strategy.

---

## 5. Make-or-break early decisions

Resolve these before mass-porting. Wrong answers become religions.

### 5.1 Game loop and async

C blocks in `nhgetch`. JS must **await** at the same logical points
and capture screens in `_preNhgetchHook` (skeleton already does this).

Rules of thumb:

- One async boundary: input. Don’t sprinkle `await` through physics.
- Never invent deferred “boundary alignment” queues to make tests
  pass. If RNG order disagrees, the port is wrong or the hook fires
  at the wrong time.
- Animation frames (`await game.animationFrame()`) are optional
  supplemental scoring — wire later, don’t warp the main loop for them.

### 5.2 Global state model

Mirror NetHack 5.0’s explicit layout rather than inventing Redux:

- `u` (you), equipment pointers, `ga*`–`gz*` transient, `sv*` saved.
- Single mutable `game` (skeleton) or a structured `instance` object
  with the same field names as C for greppability.
- Prefer **C field names** in JS so agents can cross-read
  `decl.h` / `you.h` without a translation glossary.

### 5.3 Macros

Hundreds of `#define`s (`Fire_resistance`, `is_flyer(ptr)`, `levl`,
`OBJ_AT`, …). Policies (pick one and enforce):

1. **Expand to functions** with zero double-evaluation surprises.
2. **Codegen** from headers into `js/generated/` (tables + accessors).

Prefer (2) for X-macro data dumps and (1) for property macros agents
touch often. Do **not** rely on a whole-program macro inliner that
emits the engine.

### 5.4 Lua strategy (critical fork in the road)

Special levels and dungeon topology are Lua. Options:

| Option | Phase 1 | Phase 2 | Notes |
|--------|---------|---------|-------|
| **Embed Lua in JS** (e.g. Fengari — pure JS Lua VM) | High fidelity | Re-run scripts on 5.1 | Sandbox-friendly if pure JS; must hook `nh.rn2` → contest RNG |
| **Port `nhlua`/`sp_lev` + run same `.lua` files** | Same | Same | Need VFS read of `dat/*.lua` from repo (read-only allowlist includes fork tree) |
| **Prebake levels to JSON** offline | Faster early | Bad for 5.1 / held-out novelty | Overfit risk; held-out may use paths you didn’t bake |
| **Reimplement des semantics in JS** | Huge effort | Fragile | Don’t |

**Recommendation:** ship the `.lua` files and a pure-JS Lua VM (or a
minimal interpreter for the NetHack Lua dialect subset), with RNG
wired to the frozen isaac64 wrappers. Prebaking is a temporary
scaffold only.

### 5.5 Save / bones format

Sessions include save/restore and bones (`seed0013-friday13-…`,
`seed0030-ten-diverse-deaths`). Options:

- Port `exportascii`-style or the typed `sf*` layer into JS objects
  serialized through `storage.js`.
- Or bit-faithful historical binary — painful across languages.

Prefer a **structured JS save** that round-trips identically to C’s
observable game state, verified by multi-segment sessions — not by
matching raw C bytes unless necessary.

### 5.6 Window procs

Implement a thin `window_procs` in JS → `terminal.js`. Port
`display.c` / `botl.c` / `pline.c` / menus against that API. Ignore
`win/tty`, X11, Qt, curses.

### 5.7 Sort stability and integer widths

- Stable sort everywhere C `qsort`s.
- Be explicit about `int` truncation, `schar`, boolean, unsigned
  wrap — JS Number is not C `int`. Consider helpers
  `i32`, `u32`, `schar` for parity-sensitive math.

---

## 6. Porting order (dependency-aware, score-aware)

### Principle: peel `fastforward`, don’t grow it

Work **bottom-up along the RNG call graph** revealed by session logs
(`rn2(N)=M @ func(file:line)`), not by “what seems fun.”

Suggested phases:

1. **Constitution + harness**
   - Document async rules, naming, macro policy, Lua choice.
   - Set category (`agentic` / `transpiled` / `other`).
   - Micro-harness: single-session scorer, RNG-first divergence
     printer, screen diff (session viewer already helps).

2. **Startup chain (unlocks every session)**
   - `o_init` (shuffles — top RNG consumer early)
   - `init_dungeons` / dungeon.lua load
   - `role` / `u_init` / `attrib` (kill Tourist hardcode)
   - Options / nethackrc (chargen prompts!)
   - Replace `fastforward_pre_mklev` and `fastforward_post_mklev`

3. **Mklev completeness**
   - `fill_ordinary_room`, `mineralize`, traps, objects, monsters
   - Replace `fastforward_fill_mineralize`
   - Real `mksobj` / `makemon` / `place_object`

4. **Display + messages**
   - Glyphs for mon/obj/trap, `pline`, `--More--`, status (`botl`)
   - Inventory / menus (many early screen fails are “pressed `i`”)

5. **Command surface by session demand**
   - Rank missing commands from public session keystreams
   - Port `cmd.c` dispatch + each action file as touched

6. **Monster turn + combat**
   - `monmove`, `uhitm`/`mhitu`, dogs, shops (`shk`)

7. **Magic / items**
   - `zap`, `potion`, `read`, `apply`, `eat`, `trap`, `pray`, `spell`

8. **Lua specials + quest + branches**
   - Needed for tour sessions (`seed0360`, quest tours, mines, etc.)

9. **Save / restore / bones / topten**
   - Multi-segment sessions

10. **Hallucination / display RNG + animation frames**
    - Third PRNG context; supplemental Anim%

11. **Held-out hardening**
    - Record *extra* local sessions with the C recorder covering
      thin spots; never memorize public traces.

12. **After local public suite PASS (map-driven mode)**
    - Treat full public PASS as a **regression fortress**, not a
      FAIL-driven work picker.
    - Retire named omissions / constitutional debt (`c-js-map/debt.md`
      scenario-shaped code first, then `absent.md` thin systems).
    - Iteration unit = one **semantic cluster** (C function or tight
      caller/callee family; related deferrals OK), denser than
      one-bullet peels (~50–300 LOC or small-file restart) but not an
      unrelated multi-subsystem rewrite — one falsifier / verify story.
    - Optional private canary bundles for thin spots; do not chase
      public leaderboard / CDN drift in-loop.
    - Prefer delete-wrong-JS + re-port over shim stacks (Phase 2).
    - Operational detail: `GROK-PLAYBOOK.md` §2a–2b,
      `PORTING-RUNBOOK.md` §3, `CONSTITUTION.md` §5 / §10 / §11.

### Session-driven prioritization

Use the public set as a **coverage map**, not a checklist to overfit:

| Cluster | Example sessions | Unlocks |
|---------|------------------|---------|
| Starter | `seed8000` | Escape fastforward |
| Chargen | `seed0077` | Prompts / role |
| Movement / search | `seed0200`, `seed1500` | Basic loop |
| Items / eat / throw | `seed1800`, `seed2200` | Object use |
| Combat / pets | `seed0004`, `seed0104`, `seed0013-rogue-friday13` | mon + dog |
| Shops | `seed0116` | `shk` |
| Hallu | `seed0383`, `seed0399` | display RNG |
| Save/bones | `seed0013-friday13-save…`, `seed0030` | persistence |
| Deep tours | `seed0360`–`0373`, `seed4500` | Lua levels, breadth |

**Anti-pattern:** recording only easy sessions that already pass to
inflate dashboards (Bau’s Tip Two).

---

## 7. Working around limited context (prompting at scale)

This is the real problem. NetHack does not fit in one context window.
Strategies that compound:

### 7.1 Externalized memory (write it down)

Keep a small set of durable docs, but load only what an iteration needs:

| Doc | Purpose |
|-----|---------|
| `docs/CONSTITUTION.md` | Non-negotiable architecture (async, naming, macros, Lua) |
| `docs/PORTING-RUNBOOK.md` | Operational protocol and verification gates |
| `docs/PROGRESS.md` | What passes and the active objective |
| `docs/NOTES.md` | Tiny unresolved hypothesis/dead-end scratchpad |
| `docs/DIVERGENCE-LOG.md` | Session → first bad RNG/screen → root cause → fix |
| `docs/C-JS-MAP.md` | C↔JS status and named omissions |
| `docs/PORTING-STRATEGY.md` | This long-range rationale; read selectively |

Fresh agents read Constitution, runbook, Progress, Notes, and only relevant map
rows. They consult the longer history/reference files as needed and update the
owning docs at handoff.
**Lessons must leave chat** or they die with the context.

### 7.2 Vertical slices, not horizontal rewrites

One agent task = **one C function or one tightly coupled cluster**
(e.g. `mineralize` + callers), with:

- Exact C source attached (or path + line range)
- Observed RNG subsequence (evidence, not specification)
- Current JS stub
- Focused + green + subsystem-cohort commands
- Practical C branch envelope and explicitly deferred dependencies

Avoid “port all of combat.”

### 7.3 RNG-annotated work packets

Pre-extract from sessions:

```text
@ mineralize(mklev.c:N)  → 1082 calls in seed8000
@ shuffle(o_init.c:…)
```

Generate **per-function fixtures**: input state sketch + expected RNG
leaf list + expected side effects. Agents don’t need the whole
session.

### 7.4 Two-repo / two-graph navigation (graphify)

Graphify can help **navigation**, not generation.

Recommended setup (when you want it):

1. **`graphify-out-c/`** — run on `nethack-c/upstream/src` +
   `include` (+ maybe `dat/*.lua`). Expect large corpus → **narrow
   by subsystem** (`src` alone may exceed comfort; start with
   clusters: `mk*.c`, `mon*.c`, `*hit*.c`, etc.) or use
   `--no-cluster` / incremental `--update`.
2. **`graphify-out-js/`** — run on `js/` (small; rebuild often).
3. Optional later: merge for cross-repo “what JS node corresponds to
   C node” questions.

Use graphify when asking *“what calls mineralize?”* or *“community
around zap”* — not when implementing a 20-line function.

AST-only extraction (skip semantic LLM extract) is enough for C call
graphs and cheaper.

### 7.5 Subagent patterns

| Pattern | Use |
|---------|-----|
| **Explorer** (readonly) | Locate C defs, summarize a file, map callers |
| **Porter** | Write JS for one unit; run one session |
| **Auditor** | Diff RNG logs; ban known bad patterns; no new features |
| **Recorder assistant** | Drive local C recorder / interpret session diffs (not a JS oracle port) |
| **Doc gardener** | Update PROGRESS / DIVERGENCE-LOG only |

Never let the Porter also redefine architecture. Auditors exist to
kill religions.

### 7.6 Context diets for porters

Minimum packet:

1. Constitution excerpt (async + naming)
2. C function (+ helpers ≤ N lines)
3. Existing JS module
4. Failing RNG snippet / screen diff
5. Acceptance command

Maximum: do **not** paste all of `mon.c`. Point to paths; let the
agent Read tool pull slices.

### 7.7 Mechanical aids that shrink LLM load

Invest early (Bau Tip Three):

- **Macro/header codegen** → fewer tokens explaining `youprop.h`
- **RNG divergence CLI** → `first mismatch at index i: expected rn2(5)=2 @ foo, got …`
- **State dumps** at `nhgetch` (hash of level, u.ux/uy, invent count)
  for local debugging (not needed for judge)
- **Session viewer** (shipped) as primary screen debugger
- **Board reachability / FOV explain** tool for agents that “can’t see”
  the map
- **Banned-pattern linter** (grep for `sparse boundary`, ad-hoc RNG
  burn outside tests, etc.)

### 7.8 When to restart a subsystem

If a module accumulates contradictory comments and shims, **delete
that module** and re-port from C + constitution — don’t “patch the
meme.” Full-repo restarts are last resort; **subsystem restarts**
should be normal and cheap.

### 7.9 Prompt iteration hygiene

- One goal per chat thread; link prior threads in PROGRESS.md
- Prefer fresh agents with a good packet over long contaminated threads
- After any “clever” fix that doesn’t cite C, require an Auditor pass
- Periodically re-score **all** public sessions; watch for regressions
  masked by working on one seed

---

## 8. Tooling wishlist (build in roughly this order)

1. Category set + baseline `score.sh` numbers checked in PROGRESS
2. `scripts/rng-diff.mjs` — first-divergence with C caller annotation
3. `scripts/extract-rng-by-caller.mjs` — coverage heat map from sessions
4. `scripts/c-slice.sh` — pack a function + includes for a porter
5. Macro/X-macro codegen from `objects.h` / `monsters.h` / `youprop.h`
6. Local session recorder wrapper around `nethack-c/build-recorder.sh`
7. Optional graphify corpora (C subsystems + JS)
8. Mid-turn state hash dumps (debug builds)
9. Religion linter + CI job on PR
10. Phase-2 dry run: apply a fake tiny C patch and measure JS diff cost

---

## 9. Phase 2 insurance without a transpiler

We will lose the “re-transpile in one command” shortcut. Replace it
with:

1. **Constitution** that stays true through Phase 1 (async, naming,
   macros, Lua).
2. **1:1 file map** `foo.c` → `js/foo.js` so a 5.1 diff maps to a
   small set of porter tasks.
3. **Stored porter packets** (prompt + C slice + fixture) that can be
   re-run when upstream lines change.
4. **Header codegen** that can be re-run on 5.1 headers without
   rewriting gameplay.
5. **No sacred spaghetti** — subsystem restarts are normal; the freeze
   tag should still look like NetHack, not like a novel.

Document the method as we go (Best Method award + our own memory).
The writeup *is* part of the product.

---

## 10. Risks register

| Risk | Symptom | Mitigation |
|------|---------|------------|
| Async religion returns | Queues, “align frames”, hidden buffering | Constitution + auditor; delete on sight |
| Fastforward addiction | New seeds fail instantly | Ban new fastforward entries; only delete |
| Overfit public sessions | Great public, cliff on held-out | Extra local recordings; no hardcoded traces |
| Integer/semantics drift | Late RNG diverge in combat math | `i32` helpers; compare against C recorder traces |
| Lua postponed too long | Tour sessions forever red | Decide embed strategy in week 1 |
| Mega-files | Agents can’t edit safely | Split like C; one concern per file |
| Comment contamination | Old wrong theory in names | Subsystem restart |
| Easy-test farming | Metrics↑ hard bugs stagnate | Progress = hard sessions + LOC of fastforward deleted |
| Phase 2 blind | Freeze is unmaintainable | Freeze only what porters can regenerate from C |
| Transpile temptation | “Just compile it once…” | Category is agentic; refuse scored transpile artifacts |

---

## 11. Original near-term plan (historical; completed/ superseded)

1. Category is set (`agentic`). Baseline `score.sh`; record numbers in
   `docs/PROGRESS.md`.
2. Write `docs/CONSTITUTION.md` (1–2 pages, ruthless).
3. Finish recorder build locally; confirm clang; record one tiny custom
   session for toolchain proof.
4. RNG-diff tool + caller heat map on `seed8000`.
5. Port `o_init.js` for real; delete matching fastforward block;
   confirm RNG prefix matches.
6. Port real fill/mineralize path; delete `fastforward_fill_mineralize`.
7. Only then expand commands / objects / monsters along session demand.
8. Parallel track: Lua VM spike (Fengari or similar) loading
   `dungeon.lua` with stub `nh` API — kill uncertainty early.
9. Keep a short method log (prompts that worked, religions killed) for
   Best Method / Phase 2.

---

## 12. Graphify decision (for this fork)

**Use it, but narrowly.**

- **Yes:** C subsystem graphs when lost in call networks; JS graph as
  the port grows to keep architecture honest.
- **No:** Full-repo semantic LLM extract of all NetHack on day one
  (costly, noisy, exceeds practical file budgets).
- **Maybe:** Two graphs (C + JS) once both are mature enough that
  cross-links help audits (“is `zap.js` connected like `zap.c`?”).

Navigation aid ≠ porting engine.

**Save-prefixed private oracles** (procedure in playbook §2a / runbook):
`scripts/save-oracle.mjs` plus `scripts/data/save-oracle-prefixes.json`.
Do not duplicate that workflow here. Never copy C NHFILE into JS VFS.

---

## 13. What “done” looks like

- Public + held-out screen match competitive with top agentic entries
- `fastforward.js` gone or reduced to empty exports
- Three RNG contexts correct
- Multi-segment save/bones sessions green
- `dat/*.lua` executed, not prebaked for production path
- Constitution still true (async model intact)
- Phase 1 freeze is something you would willingly re-generate from C
  with your pipeline in December

---

## 14. Open questions to revisit

- Pure-JS **Lua 5.4** VM choice (Fengari is 5.3 — spike only; see
  Constitution §7)
- How closely to mirror `sv*` / `ga*` namespaces vs flatter `game.*`?
- TypedArrays for `levl[x][y]` vs object cells (speed vs clarity)?
- How much local C-recorder instrumentation beyond stock patches?
- Animation frames: chase Anim% before or after Phase 1 freeze?
- When to write the public method writeup (ongoing vs end of Phase 1)?

---

## Appendix A — Key paths

```
js/jsmain.js          runSegment entry
js/fastforward.js     delete-me scaffolding
js/rng.js             wrappers over frozen isaac64
nethack-c/upstream/   NetHack 5.0.0_Release
nethack-c/patches/    determinism + logging + capture
sessions/*.session.json
frozen/ps_test_runner.mjs
docs/API.md           contract
docs/PHASES.md        Phase 1/2 rules
```

## Appendix B — Size reality check

| Chunk | Approx |
|-------|--------|
| C `src/` gameplay | ~200–250k LOC |
| Headers / tables | ~31k LOC |
| Lua dat | ~17k LOC |
| JS skeleton today | ~8k LOC |
| Public RNG events to match | ~793k leaf calls |

This is a **systems** port. Treat method, harness, and memory as
first-class artifacts equal to the JS itself.

---

*You feel informed for a moment. Your context window, however, remains
finite — write things down.*
