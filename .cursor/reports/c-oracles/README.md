# C oracle cards

**Purpose:** Durable **Layer 1 → Layer 2** knowledge so agents do not re-read 5k lines of peel code or re-discover the same C ordering every session.

**Strategy:** [`.cursor/reports/c-to-js-port-strategy.md`](../c-to-js-port-strategy.md) §4.

## When to read / write

| When | Action |
|------|--------|
| **Start** batch on `monmove.c` | Read `monmove.c.md` |
| **Learn** C call order (from C or from a peel) | Append to oracle — **before** adding peel code |
| **Delete** a peel band | Remove row from “Peels to delete”; note which C path replaced it |
| **Kill** a hypothesis | Add one line under “Wrong hypotheses” |

## File naming

`c-oracles/<upstream-filename>.md` — e.g. `monmove.c.md`, `dogmove.c.md`, `mkobj.c.md`.

## Template (copy for new C file)

```markdown
# C oracle: <file>.c

**JS modules:** …
**Phase:** P1|P2|…
**C path:** `nethack-c/upstream/src/<file>.c`
**Last C read:** YYYY-MM-DD — `<function>` ~L…

## Call order (ground truth)

1. …

## RNG sites (locator-tested)

| Locator session | Index | C site | Draw shape |
|-----------------|-------|--------|------------|

## Peels to DELETE (replace with general code)

| JS flag / band | C equivalent | Locator window | Status |
|----------------|--------------|----------------|--------|

## Open gaps vs C

- …

## Wrong hypotheses (do not retry)

- …
```

## Rules

- Oracles describe **C behavior**, not session JSON bytes.
- Keep each card **< 200 lines** — archive stale rows to changelog one-liner.
- Do **not** duplicate the function checklist; link checklist row IDs instead.
