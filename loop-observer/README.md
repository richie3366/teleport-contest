# Loop observer

Local browser view of the unattended port loop: Cursor `stream-json`
from `.agent-port-loop-logs/iter-NNNN-STAMP.raw`, rendered as a
conversation (prompt, thoughts, tools, Edit/Write diffs, result).

Zero npm dependencies. Binds **`127.0.0.1`** on an ephemeral port
(OS-assigned first free). Not scored; not imported from `js/`.

## Usage

From the repo root, with or without the supervisor running:

```bash
npm run observe-loop
# or: node loop-observer/server.mjs [--no-open]
```

The process prints `Loop observer: http://127.0.0.1:<port>/` and
opens that URL unless you pass `--no-open`. Ctrl-C stops it.

Needs Node 22+ (same as the contest `package.json` engines field).

## What you see

The header follows **one** `.raw` at a time.

- **Iter** — last 10 logs, newest first. The current file is marked
  `· live`. Choosing a row **pins** that transcript (retrospect): a
  later iteration will not replace the thread. The subtitle becomes
  `Retrospect · iter-NNNN-…`.
- **Go live · #N** — unpin and jump to whatever the supervisor is
  writing now, then auto-follow again. While already following, the
  same control reads **Live** (file still growing) or **Idle**.
- Mode pill (`port` / `audit`) when the master `loop-*.log` has a
  matching `=== iteration N starting … mode=… ===` line.
- Meta bar: model, elapsed time, bytes, tokens, event count.
- **↓ Jump to latest** — scroll-follow only. Separate from live-follow:
  you can pin #1373 and still scroll that thread, or follow live and
  pause the scrollbar.

Selecting the live iter from the dropdown also pins it. That is useful
when you want to finish reading while the next iter starts; **Go live**
resumes auto-follow.

Pin state is **global** for that observer process (shared across tabs).

## Live reset (memory)

The page holds **one** transcript. On every view switch (`switchTo` —
live auto-follow to a new `.raw`, **Go live**, or a picker change) the
server increments `epoch`, `resetTranscript`s, and broadcasts `clear`
**before** it reads the next file. The client then:

- Recreates the thread column and drops the node map (old cards,
  Show-more closures, and diff line arrays can be GC’d)
- Ignores `upsert` / `meta` whose `epoch` is not the current view
- Ignores a delayed `clear` / `snapshot` from an older `epoch`

Thinking cards update in place (text/status) so a long iter does not
rebuild a DOM node on every delta.

Restart the observer process after pulling these protocol changes; a
tab refresh is not enough for `server.mjs`.

## Diffs

Edit/Write cards parse unified diffs. Syntax highlight runs only for
`js` / `mjs` / `cjs` / `jsx` / `ts` / `tsx`. Keywords are applied
**before** any `<span class="…">` injection so `\bclass\b` cannot
rewrite the attribute and leak `class="str">` into markdown (or other)
diffs. Other extensions are escaped text only.

## How “current” is chosen

1. `iteration-count` in `.agent-port-loop-logs/` if a matching
   `iter-NNNN-*.raw` exists.
2. Else the `.raw` with the latest mtime.

While following live, `fs.watch` plus a 250ms poll tails that file and
switches when a new current name appears. While pinned, the chosen file
is still tailed (so a not-yet-finished iter keeps streaming) but the
view does not switch.

Log names accepted from the UI/WS are
`iter-<digits>-<stamp>.raw` only, resolved inside the log directory.

## Layout

| Path | Role |
|------|------|
| `server.mjs` | HTTP + WebSocket, catalog, tail, pin / live |
| `parse.mjs` | NDJSON → coalesced messages; unified-diff parse for Edit/Write |
| `ws.mjs` | Minimal RFC 6455 (text / ping / pong / close) |
| `public/` | Conversation UI (`index.html`, `app.css`, `app.js`) |

## Protocol (local)

WebSocket `ws://127.0.0.1:<port>/ws`.

Server → client:

- `clear` — drop the current thread (sent before loading another iter)
- `snapshot` — full transcript plus `following`, `live`, `recent` (10), `epoch`
- `upsert` — changed messages (ignored if `epoch` does not match)
- `meta` — running flag / catalog without replacing the thread

Client → server:

- `{ "op": "open", "name": "iter-NNNN-STAMP.raw" }` — pin
- `{ "op": "live" }` — follow the current iter

`GET /api/recent` returns the last 40 names plus `current` / `following`
/ `live` (debug; the UI uses the socket).

## Notes

- Does not start, stop, or supervise `scripts/agent-port-loop.sh`.
- Halt reason remains `.agent-port-loop-logs/last-halt-reason.txt`.
- Restart the observer process after pulling `server.mjs` (new port
  each launch). `Cache-Control: no-store` is enough for `public/`
  after a refresh.
