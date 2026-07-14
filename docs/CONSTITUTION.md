# Constitution — agentic NetHack JS port

Non-negotiable rules for this fork. Agents and humans obey these.
If a “clever” fix violates them, the fix is wrong — delete it.

Category: **agentic**. No shipping a transpiled C engine.

---

## 1. Ground truth

1. **Target C wins.** Behavior comes from pinned `nethack-c/upstream`
   **plus the complete contest patch set** (seed, datetime, stable sort, RNG
   logging/provenance, capture behavior, and any other observable delta).
   Do not rank unpatched C above a deliberate patch or “improve” NetHack.
2. **Sessions are acceptance tests**, not specifications to memorize.
   Never hardcode public traces, screens, or RNG sequences into `js/`
   except while deleting existing `fastforward.js` chunks.
3. **Held-out generalization matters.** Prefer real ports over
   seed-specific scaffolding.
4. A session trace is an **observation**, not a missing C specification.
   When docs, comments, or hypotheses disagree with pinned C + observable
   contest patches, C wins.

---

## 2. Game loop and async

1. **One async boundary: input.** `await` belongs at `nhgetch` (and
   at optional `animationFrame`). Game physics, RNG, and most display
   updates are synchronous relative to that.
2. **Capture before read.** Screens / RNG slices / cursors are taken
   in `_preNhgetchHook`, matching C blocking in `tty_nhgetch`.
3. **Forbidden religions** (Bau):
   - “Sparse boundary frames”
   - Deferred action queues to *align* tests
   - Reordering work across `nhgetch` boundaries to make RNG match
   - Inventing replay middleware when the bug is wrong call order
4. If JS RNG order ≠ C, **fix the port** (or the hook timing) —
   do not invent alignment machinery.
5. `animationFrame` is optional / supplemental. Do not warp the main
   loop for Anim%.
6. `async` may propagate up a call chain only because that chain can reach
   `nhgetch` (for example `pline` → `more`) or `animationFrame`. It must not
   defer, queue, or reorder game physics.

---

## 3. Module and naming layout

1. Prefer **1:1 files**: `nethack-c/upstream/src/foo.c` → `js/foo.js`.
2. Prefer **C names** for functions, struct fields, and flags so agents
   can cross-read `decl.h` / `you.h` without a glossary.
3. Global state lives on the mutable `game` object from `gstate.js`
   for now. Evolve toward C’s `u` / transient / saved groupings
   **without** inventing a parallel Redux store.
4. Keep the DAG acyclic. Generated data under `js/generated/` is fine.
5. Frozen files (`isaac64.js`, `terminal.js`, `storage.js`) are
   untouchable for scoring — do not fork their contracts.
6. A partial module must name semantic omissions in the relevant
   `docs/c-js-map/*.md` section.
   Passing one session is not proof that a C function is complete.

---

## 4. RNG

1. All gameplay randomness goes through `js/rng.js` → frozen ISAAC64.
2. Log format must stay judge-compatible (`rn2(N)=M`, etc.).
3. Match the **two ISAAC64 streams** in `rnd.c`: core gameplay and
   display/hallucination. NetHack Lua `nh.rn2`/`nh.random` calls consume the
   core stream; patch 004 adds Lua caller provenance, not a third ISAAC stream.
   Preserve Lua VM initialization/load order in case its built-in PRNG is
   observable before the `nhlib.lua` override.
4. Match **clang** left-to-right argument evaluation for nested RNG
   calls.
5. Use a **stable sort** wherever C uses `qsort`.
6. Integer ops that must match C should use explicit helpers
   (`i32` trunc, etc.) — do not assume JS `Number` ≡ C `int`.

---

## 5. Fastforward policy

1. `fastforward.js` is **delete-only**. No new seed-specific burn
   lists. No extending it to “almost pass” another session.
2. Progress is measured by:
   - C semantic units advanced and omissions retired (`c-js-map/*.md`);
   - sessions/scenarios reaching real ported code (not throws/fakes);
   - verified focused, green, and cohort evidence;
   - `fastforward.js` bytes/LOC removed (now mostly empty-hook deletion).
   Do not optimize only public session pass count or one Tourist trace.
3. Temporary RNG-consuming stubs inside a real function (matching C’s
   call sites while the body is incomplete) are allowed; wholesale
   session replay is not.
4. Public seed names, trace indices, recorded coordinates/values, and
   expected screens must not drive production control flow. They belong in
   diagnostics/docs/tests. Production comments should describe C semantics,
   not "enough for seedXXXX."

---

## 6. Macros and data

1. Property macros (`youprop.h`, `mondata.h`, …) → JS **functions**
   with single evaluation of arguments.
2. X-macro tables (`objects.h`, `monsters.h`, artifacts) →
   **generated** JS data (script re-runnable for Phase 2).
3. Do not whole-program-inline the engine.
4. Generated files must identify their pinned C source and extractor.
   Extractors must be deterministic; generated tables are not hand-edited.

---

## 7. Lua (decision)

**Production path:** execute upstream `dat/*.lua` through a **pure-JS
Lua VM** with `nh.*` bindings ported from `nhlua.c` / friends. RNG
inside scripts must hit the contest Lua/core wiring the same way C
does (`nhlib.lua` → `nh.rn2`, etc.).

**Constraints:**

- NetHack 5.0 vendors **Lua 5.4.8**. A 5.3-only VM (classic Fengari)
  is a spike candidate only — verify script compatibility or replace
  with a 5.4-capable pure-JS VM / agentic port of the Lua submodule.
- No WASM. VM source must be plain JS loadable in the sandbox.
- Read scripts from the fork tree (`nethack-c/upstream/dat/…`); do not
  depend on network.

**Forbidden as the long-term path:** prebaking special levels to JSON
for scoring. Prebake is allowed only as a temporary local scaffold
while the VM spike is in flight, and must not ship as the only way
tour/quest sessions work.

**Near term:** keep the skeleton’s minimal `l_nhcore_init` shuffle
until the VM + bindings exist; do not fake entire `dungeon.lua`
graphs with ad-hoc JS that will be thrown away *unless* that JS is
clearly marked temporary and scheduled for deletion.

---

## 8. Display and I/O

1. Drive the frozen `Terminal` / `GameDisplay`; judge reads
   `serialize()`.
2. Implement NetHack’s **window_procs** semantics in JS — do not port
   `win/tty` curses.
3. Cursor position is part of screen match — keep it honest.
4. Persist save/bones/record only via frozen `storage.js` VFS.

---

## 9. Datetime and options

1. Honor `input.datetime` (`YYYYMMDDHHMMSS`) for moon phase, Friday
   the 13th, hire dates, shopkeeper lines, etc. (skeleton stores it
   but does not apply it yet — that is a real gap).
2. Honor `nethackrc` / OPTIONS for chargen and flags; no hardcoded
   Tourist-only success path once chargen is ported.

---

## 10. Agent workflow

1. Follow `PORTING-RUNBOOK.md`; it owns the operational protocol.
2. **Vertical slices:** one function or tight cluster per task, with
   focused, green-gate, and subsystem-cohort acceptance commands.
   Small scope does not excuse porting only an observed seed branch.
3. **Cite C** in the change (file + function). Fixes that cannot point
   at C are suspect.
4. **Auditor > Porter** on architecture. Porters do not redefine the
   game loop.
5. After a clever non-C theory appears, **stop and delete** — then
   re-read C.
6. Remove all temporary diagnostics, raw-index gates, and debug prints
   before handing off.
7. Preserve the green gate and test a distinct scenario when shared
   behavior changes.
8. Put facts in their owning durable docs: unresolved theories in Notes,
   root causes in the divergence log, structural omissions in the C↔JS map,
   and measured objectives/scores in Progress.
9. Subsystem restart (delete + re-port a file) is normal and preferred
   over stacking shims.
10. Unattended loop agents read `GROK-PLAYBOOK.md` first; objective priority
    and anti-patterns live there. They do not edit that playbook in-loop.
11. After a verified loop iteration, **commit and push** stageable work to
    `origin` (see `scripts/agent-port-loop.prompt.md` and
    `docs/AGENT-PORT-LOOP.md`). No force-push, reset, or history rewrite.

---

## 11. Phase 2 posture

Ship Phase 1 as something a porter can regenerate: clear modules,
generated tables, Lua scripts unchanged from upstream, constitution
still true. Optimize for **small diffs when C changes**, not for
maximum opacity.

---

*When in doubt: delete the workaround, read the C, port the C.*
