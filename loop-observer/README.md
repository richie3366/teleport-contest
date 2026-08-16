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

- `snapshot` — full transcript plus `following`, `live`, `recent` (10)
- `upsert` — changed messages
- `meta` — running flag / catalog without replacing the thread

Client → server:

- `{ "op": "open", "name": "iter-NNNN-STAMP.raw" }` — pin
- `{ "op": "live" }` — follow the current iter

`GET /api/recent` returns the last 40 names plus `current` / `following`
/ `live` (debug; the UI uses the socket).

## Notes

- Does not start, stop, or supervise `scripts/agent-port-loop.sh`.
- Halt reason remains `.agent-port-loop-logs/last-halt-reason.txt`.
- Restart the observer after pulling UI changes; the bound port is new
  each launch.
