# NetHack C→JS port — **agent playbook**

Short reference for **how to work** in this repo. **Methodology:** [`c-to-js-port-strategy.md`](c-to-js-port-strategy.md). **Next batch:** [`c-to-js-port-current.md`](c-to-js-port-current.md). **C memory:** [`c-oracles/`](c-oracles/).

---

## Where to write notes

| Write here | Not here |
|------------|----------|
| [`c-to-js-port-current.md`](c-to-js-port-current.md) — last slice, next step, first fail index | `AGENTS.md` (stable router only) |
| [`c-oracles/<file>.md`](c-oracles/) — C call order, peels-to-delete, wrong hypotheses | Re-deriving C in chat each session |
| [`c-to-js-port-harness-debt.md`](c-to-js-port-harness-debt.md) — peel counts, moratorium | Ad-hoc peel without ledger |
| [`c-to-js-port-function-checklist.md`](c-to-js-port-function-checklist.md) — row status | Long debug narrative in rules |
| [`c-to-js-port-changelog-archive.md`](c-to-js-port-changelog-archive.md) — one row per batch | Duplicating `c-to-js-port-progress.md` |
| Strategy — [`c-to-js-port-strategy.md`](c-to-js-port-strategy.md) | New `notes-*.md` or per-session agent files |

---

## Tool picker

| Question | Tool | Example |
|----------|------|---------|
| **Which batch / where is X ported?** | **graphify** `query` / `path` | `graphify path "movemon" "movemon" --graph graphify-out/graph.json` |
| **RNG diverged at index N?** | **`diag_rng_window.mjs`** | `node tools/diag_rng_window.mjs sessions/seed0102-ranger-name-cancel.session.json 4440 4485` |
| **Which keystroke owns index N?** | **`diag_rng_step_map.mjs`** (C steps) | `node tools/diag_rng_step_map.mjs sessions/seed0102….json 4440` |
| **When did JS first draw after key K?** | **`diag_prefix_rng.mjs`** | `node tools/diag_prefix_rng.mjs sessions/seed0102….json 22` |
| **Regression from last batch?** | **`git stash`** isolate + `seed8000` window | stash `js/monmove.js`, diag 2900–3129 |
| **C call order / flags** | **Read C** in `nethack-c/upstream/` | `rg` with explicit path (IDE search may skip submodule) |

**Graphify:** best at **batch pick** and C↔JS symbol mapping. **`npm run graphify:js`** after `js/` edits is cache hygiene; value is **`query` / `path` / `explain`**, not the rebuild alone.

**Not graphify:** moveloop peel order, harness flags (`_*LikeC`), “why `rn2(7)` before `rn2(5)`” — use **C source + diag_rng_window + prefix replay**.

---

## Moveloop / RNG debug loop

1. **Read oracle** — [`c-oracles/monmove.c.md`](c-oracles/monmove.c.md) (or `dogmove.c.md`).
2. **Locate** — `diag_rng_window` on locator session (20–40 indices).
3. **Read C** — named function in upstream `.c` **before** editing `monmove.js`.
4. **Port or delete** — general call order **or** remove a peel band; **do not** add PostTwentyFifth+.
5. **Gate + canaries** — `bash tools/port-batch-gate.sh`; three canaries if moveloop touched.
6. **Persist** — oracle + harness debt + `current.md`.

---

## Known pitfalls (institutional)

| Trap | Fix |
|------|-----|
| **`urole.mnum === 8` for “rogueLike”** | Rogue is **7**, Ranger is **8** (`js/roles.js`) — wrong check routes Ranger through rogue `#search` peel |
| **`dofire` moveloop timing** | C runs post on invent **ESC** after `getdir`, not on first `f`/`l` key |
| **First `#search` on high `moves`** | `effectiveMovemonStepNumLikeC` — first pass still peel at step **11** |
| **Ranger first `#search`** | Pet-only `fmon`, twin `dog_move` before `mcalcmove` — not tourist distant→east peel |
| **Submodule invisible to IDE** | `read_file` or `rg path nethack-c/upstream/…` |

---

## Canary commands (copy-paste)

```bash
# Regression after moveloop / monmove batch
node tools/diag_rng_window.mjs sessions/seed8000-tourist-starter.session.json 2900 3129

# Prefix replay (n = char count through keystroke under test)
node tools/diag_prefix_rng.mjs sessions/seed0102-ranger-name-cancel.session.json 22

# Isolate which files broke tourist
git stash push -m 'isolate' -- js/monmove.js js/m_move_mon.js && \
  node tools/diag_rng_window.mjs sessions/seed8000-tourist-starter.session.json 2900 3129; \
  git stash pop
```

---

## Related

- [Batch workflow](c-to-js-port-batch-workflow.md)
- [Graphify](../docs/graphify.md)
- [Continue-port prompt](../prompts/continue-nethack-port.md)
