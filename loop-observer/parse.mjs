/**
 * Incremental Cursor stream-json → conversation messages.
 * Muse `exec --json` records are normalized first (scripts/loop-raw.mjs).
 * Thinking deltas are coalesced; tool started/completed share one card.
 */
import { isMuseRecord, createNormalizer } from "../scripts/loop-raw.mjs";

const PREVIEW = 1200;
const SHELL_CAP = 48000;
const MATCH_CAP = 24;
const DIFF_LINE_CAP = 180;

export function createTranscript() {
  return {
    meta: emptyMeta(),
    messages: [],
    byId: new Map(),
    openThinkingId: null,
    seq: 0,
    muse: createNormalizer(),
  };
}

function emptyMeta() {
  return {
    iter: null,
    stamp: null,
    file: null,
    relFile: null,
    model: null,
    sessionId: null,
    mode: null,
    running: true,
    bytes: 0,
    startedAtMs: null,
    endedAtMs: null,
    durationMs: null,
    usage: null,
    resultOk: null,
    eventCount: 0,
    parseErrors: 0,
  };
}

export function resetTranscript(state, metaPatch = {}) {
  if (state.byId) state.byId.clear();
  if (Array.isArray(state.messages)) state.messages.length = 0;
  state.meta = { ...emptyMeta(), ...metaPatch };
  state.messages = [];
  state.byId = new Map();
  state.openThinkingId = null;
  state.seq = 0;
  state.muse = createNormalizer();
}

export function applyNdjsonChunk(state, text) {
  const changed = [];
  const raw = String(text);
  for (const line of raw.split(/\r?\n/)) {
    const s = line.trim();
    if (!s) continue;
    let ev;
    try {
      ev = JSON.parse(s);
    } catch {
      state.meta.parseErrors += 1;
      continue;
    }
    if (!ev || typeof ev !== "object") continue;
    state.meta.eventCount += 1;
    const batch = isMuseRecord(ev)
      ? (state.muse || (state.muse = createNormalizer())).normalize(ev)
      : [ev];
    for (const one of batch) {
      const touched = applyEvent(state, one);
      if (touched) {
        if (Array.isArray(touched)) changed.push(...touched);
        else changed.push(touched);
      }
    }
  }
  return dedupeMessages(changed);
}

function dedupeMessages(list) {
  const seen = new Set();
  const out = [];
  for (const m of list) {
    if (!m || seen.has(m.id)) continue;
    seen.add(m.id);
    out.push(m);
  }
  return out;
}

function applyEvent(state, ev) {
  const t = ev.type || ev.event || "";
  const st = ev.subtype || "";
  stampTime(state, ev);

  if (t === "system" && st === "init") {
    state.meta.model = ev.model || state.meta.model;
    state.meta.sessionId = ev.session_id || state.meta.sessionId;
    return null;
  }
  if (t === "usage" && ev.usage && typeof ev.usage === "object") {
    state.meta.usage = summarizeUsage(ev.usage);
    return null;
  }
  if (t === "system" && st === "task_notification") {
    return upsert(state, {
      id: `sys-${ev.task_id || state.seq}`,
      kind: "system",
      title: ev.title || "Task",
      status: ev.status || "",
      ts: num(ev.timestamp_ms),
    });
  }
  if (t === "user") {
    const text = messageText(ev.message);
    return upsert(state, {
      id: "user",
      kind: "user",
      text,
      ts: num(ev.timestamp_ms),
    });
  }
  if (t === "thinking") {
    if (st === "delta") {
      const piece = typeof ev.text === "string" ? ev.text : "";
      if (!piece) return null;
      if (state.openThinkingId) {
        const cur = state.byId.get(state.openThinkingId);
        if (cur) {
          cur.text = (cur.text || "") + piece;
          cur.status = "running";
          cur.ts = num(ev.timestamp_ms) ?? cur.ts;
          return cur;
        }
      }
      const id = `thinking-${++state.seq}`;
      state.openThinkingId = id;
      return upsert(state, {
        id,
        kind: "thinking",
        text: piece,
        status: "running",
        ts: num(ev.timestamp_ms),
      });
    }
    if (st === "completed" && state.openThinkingId) {
      const cur = state.byId.get(state.openThinkingId);
      state.openThinkingId = null;
      if (cur) {
        cur.status = "done";
        cur.tsEnd = num(ev.timestamp_ms);
        return cur;
      }
    }
    return null;
  }
  if (t === "assistant") {
    if (state.openThinkingId) {
      const th = state.byId.get(state.openThinkingId);
      if (th) th.status = "done";
      state.openThinkingId = null;
    }
    const text = messageText(ev.message);
    if (!text) return null;
    const id = `asst-${ev.model_call_id || ++state.seq}`;
    if (st === "delta") {
      const cur = state.byId.get(id);
      if (cur) {
        cur.text = (cur.text || "") + text;
        cur.ts = num(ev.timestamp_ms) ?? cur.ts;
        return cur;
      }
      return upsert(state, {
        id,
        kind: "assistant",
        text,
        ts: num(ev.timestamp_ms),
      });
    }
    return upsert(state, {
      id,
      kind: "assistant",
      text,
      ts: num(ev.timestamp_ms),
    });
  }
  if (t === "tool_call") {
    return applyTool(state, ev);
  }
  if (t === "result") {
    state.meta.running = false;
    state.meta.resultOk = ev.is_error === false || ev.subtype === "success";
    state.meta.durationMs =
      typeof ev.duration_ms === "number" ? ev.duration_ms : state.meta.durationMs;
    state.meta.endedAtMs = num(ev.timestamp_ms) ?? Date.now();
    if (ev.usage && typeof ev.usage === "object") {
      state.meta.usage = summarizeUsage(ev.usage);
    }
    return upsert(state, {
      id: "result",
      kind: "result",
      ok: state.meta.resultOk,
      durationMs: state.meta.durationMs,
      usage: state.meta.usage,
      ts: num(ev.timestamp_ms),
    });
  }
  return null;
}

function applyTool(state, ev) {
  const callId = String(ev.call_id || ++state.seq).replace(/\s+/g, "_");
  const id = `tool-${callId}`;
  const parsed = parseToolBody(ev.tool_call);
  const prev = state.byId.get(id);
  const msg = prev || {
    id,
    kind: "tool",
    name: parsed.name,
    title: parsed.title,
    detail: parsed.detail,
    status: "running",
    ts: num(ev.timestamp_ms),
  };
  msg.name = parsed.name || msg.name;
  if (parsed.title) msg.title = parsed.title;
  if (parsed.detail) msg.detail = parsed.detail;
  if (parsed.file) msg.file = parsed.file;
  if (parsed.path) msg.path = parsed.path;
  if (parsed.ext) msg.ext = parsed.ext;
  msg.ts = msg.ts ?? num(ev.timestamp_ms);

  if (ev.subtype === "started") {
    msg.status = "running";
    if (parsed.result) msg.result = parsed.result;
  } else if (ev.subtype === "completed") {
    const badExit = parsed.result?.exitCode != null && Number(parsed.result.exitCode) !== 0;
    msg.status = parsed.error || badExit ? "error" : "done";
    msg.error = parsed.error || null;
    msg.result = parsed.result;
    msg.tsEnd = num(ev.timestamp_ms);
  }
  return upsert(state, msg);
}

function parseToolBody(toolCall) {
  const empty = { name: "Tool", title: "Tool", detail: "", result: null, error: null };
  if (!toolCall || typeof toolCall !== "object") return empty;
  let key = null;
  let body = null;
  for (const [k, v] of Object.entries(toolCall)) {
    if (k.endsWith("ToolCall") && v && typeof v === "object") {
      key = k;
      body = v;
      break;
    }
  }
  if (!body) return empty;
  const camel = key.replace(/ToolCall$/, "");
  const name = TOOL_LABEL[camel] || cap(camel);
  const args = body.args && typeof body.args === "object" ? body.args : {};
  const { title, detail } = summarizeArgs(camel, args);
  let { result, error } = summarizeResult(camel, body.result);
  if (!result && (camel === "edit" || camel === "write") && args.streamContent) {
    result = fileToDiff(args.streamContent, args.path);
  }
  return {
    name,
    title,
    detail,
    result,
    error,
    file: args.path ? base(args.path) : "",
    path: args.path ? shortPath(args.path) : "",
    ext: extOf(args.path),
  };
}

const TOOL_LABEL = {
  read: "Read",
  grep: "Grep",
  shell: "Shell",
  glob: "Glob",
  edit: "Edit",
  write: "Write",
  delete: "Delete",
  readLints: "Lints",
  updateTodos: "Todos",
  webSearch: "Search",
  webFetch: "Fetch",
  task: "Task",
  awaitShell: "Await",
  generateImage: "Image",
  callMcp: "MCP",
};

function summarizeArgs(camel, args) {
  switch (camel) {
    case "read":
      return {
        title: `Read ${base(args.path)}`,
        detail: rangeSuffix(args.path, args.offset, args.limit),
      };
    case "grep":
      return {
        title: `Grep ${clip(args.pattern, 80)}`,
        detail: [args.glob, args.path && shortPath(args.path)].filter(Boolean).join(" · "),
      };
    case "shell":
      return {
        title: args.description || `Shell ${clip(firstLine(args.command), 72)}`,
        detail: args.command || "",
      };
    case "glob":
      return {
        title: `Glob ${args.globPattern || args.glob || ""}`,
        detail: args.targetDirectory ? shortPath(args.targetDirectory) : "",
      };
    case "edit":
    case "write":
    case "delete":
      return {
        title: `${cap(camel)} ${base(args.path)}`,
        detail: args.path ? shortPath(args.path) : "",
      };
    case "webSearch":
      return { title: `Search ${clip(args.search_term || args.query, 80)}`, detail: "" };
    case "webFetch":
      return { title: `Fetch ${clip(args.url, 80)}`, detail: args.url || "" };
    case "updateTodos":
      return { title: "Update todos", detail: "" };
    case "readLints":
      return { title: "Read lints", detail: Array.isArray(args.paths) ? args.paths.map(base).join(", ") : "" };
    default:
      return { title: cap(camel), detail: clip(JSON.stringify(args), 240) };
  }
}

function summarizeResult(camel, result) {
  if (result == null) return { result: null, error: null };
  if (typeof result !== "object") {
    return { result: { preview: clip(String(result), PREVIEW) }, error: null };
  }
  if (result.failure || result.error) {
    const err =
      result.failure?.message ||
      result.error?.message ||
      (typeof result.error === "string" ? result.error : null) ||
      "failed";
    return { result: null, error: String(err) };
  }
  const ok = result.success;
  if (!ok || typeof ok !== "object") {
    if (result.isError || result.is_error) {
      return { result: null, error: clip(String(result.message || "error"), 400) };
    }
    return { result: { preview: clip(JSON.stringify(result), PREVIEW) }, error: null };
  }
  switch (camel) {
    case "read": {
      const content = ok.content || "";
      const lines =
        ok.totalLines ??
        (ok.readRange ? ok.readRange.endLine - ok.readRange.startLine + 1 : null) ??
        (typeof content === "string" ? content.split("\n").length : null);
      return {
        result: {
          lines,
          path: ok.path && shortPath(ok.path),
          preview: clip(typeof content === "string" ? content : "", PREVIEW),
        },
        error: null,
      };
    }
    case "grep": {
      const wr = ok.workspaceResults || {};
      let n = 0;
      const rows = [];
      for (const block of Object.values(wr)) {
        const c = block?.content || {};
        n += Number(c.totalMatchedLines || 0);
        for (const file of c.matches || []) {
          for (const m of file.matches || []) {
            if (rows.length >= MATCH_CAP) break;
            rows.push({
              file: file.file,
              line: m.lineNumber,
              text: clip(m.content || "", 200),
            });
          }
        }
      }
      return { result: { matches: n || rows.length, rows }, error: null };
    }
    case "shell": {
      const stdout = String(ok.stdout || ok.interleavedOutput || "");
      const stderr = String(ok.stderr || "");
      return {
        result: {
          exitCode: ok.exitCode,
          stdout: clip(stdout, SHELL_CAP),
          stderr: clip(stderr, 8000),
          truncated: !!ok.truncated || stdout.length > SHELL_CAP,
          originalBytes: ok.originalBytes,
          ms: ok.executionTime ?? ok.localExecutionTimeMs,
        },
        error: null,
      };
    }
    case "glob":
      return {
        result: {
          files: ok.totalFiles ?? (ok.files || []).length,
          preview: (ok.files || []).slice(0, 20).map((p) => shortPath(p)).join("\n"),
        },
        error: null,
      };
    case "edit":
    case "write": {
      const diff = ok.diffString
        ? parseUnifiedDiff(ok.diffString)
        : ok.afterFullFileContent
          ? fileToDiff(ok.afterFullFileContent, ok.path)
          : { lines: [], added: 0, removed: 0, truncated: false };
      return {
        result: {
          added: ok.linesAdded ?? diff.added,
          removed: ok.linesRemoved ?? diff.removed,
          lines: diff.lines,
          truncated: diff.truncated,
          path: ok.path && shortPath(ok.path),
        },
        error: null,
      };
    }
    default:
      return { result: { preview: clip(JSON.stringify(ok), PREVIEW) }, error: null };
  }
}

function upsert(state, msg) {
  const prev = state.byId.get(msg.id);
  if (prev) {
    Object.assign(prev, msg);
    return prev;
  }
  state.byId.set(msg.id, msg);
  state.messages.push(msg);
  return msg;
}

function messageText(message) {
  if (!message) return "";
  if (typeof message === "string") return message;
  const content = message.content;
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  const parts = [];
  for (const part of content) {
    if (typeof part === "string") parts.push(part);
    else if (part && typeof part.text === "string") parts.push(part.text);
  }
  return parts.join("\n");
}

function summarizeUsage(usage) {
  const breakdown = {};
  let total = 0;
  for (const [k, v] of Object.entries(usage)) {
    if (typeof v === "number" && Number.isFinite(v)) {
      breakdown[k] = v;
      total += v;
    }
  }
  return { total, breakdown };
}

function stampTime(state, ev) {
  const ts = num(ev.timestamp_ms);
  if (ts == null) return;
  if (state.meta.startedAtMs == null) state.meta.startedAtMs = ts;
  state.meta.endedAtMs = ts;
}

function num(v) {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim()) {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function cap(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function base(p) {
  if (!p) return "";
  const s = String(p).replace(/\\/g, "/");
  const i = s.lastIndexOf("/");
  return i >= 0 ? s.slice(i + 1) : s;
}

function shortPath(p) {
  const s = String(p);
  const marker = "/teleport-contest-revisited/";
  const i = s.lastIndexOf(marker);
  if (i >= 0) return s.slice(i + marker.length);
  const home = process.env.HOME;
  if (home && s.startsWith(home)) return "~" + s.slice(home.length);
  return s;
}

function rangeSuffix(path, offset, limit) {
  const p = path ? shortPath(path) : "";
  if (offset || limit) return `${p}:${offset || 1}–${limit ? (offset || 1) + limit - 1 : ""}`;
  return p;
}

function firstLine(s) {
  return String(s || "").split(/\r?\n/)[0] || "";
}

function clip(s, n) {
  const t = String(s ?? "");
  if (t.length <= n) return t;
  return t.slice(0, n) + "…";
}

function extOf(p) {
  if (!p) return "";
  const b = base(p);
  const i = b.lastIndexOf(".");
  return i >= 0 ? b.slice(i + 1).toLowerCase() : "";
}

function fileToDiff(content, _path) {
  const parts = String(content ?? "").split("\n");
  if (parts.length && parts[parts.length - 1] === "") parts.pop();
  const truncated = parts.length > DIFF_LINE_CAP;
  const slice = parts.slice(0, DIFF_LINE_CAP);
  return {
    lines: slice.map((text, i) => ({ kind: "add", text, no: i + 1 })),
    added: parts.length,
    removed: 0,
    truncated,
  };
}

function parseUnifiedDiff(src) {
  const lines = [];
  let added = 0;
  let removed = 0;
  let oldNo = 0;
  let newNo = 0;
  let truncated = false;
  let body = 0;
  for (const line of String(src ?? "").split("\n")) {
    if (
      line.startsWith("diff ") ||
      line.startsWith("index ") ||
      line.startsWith("--- ") ||
      line.startsWith("+++ ")
    ) {
      continue;
    }
    if (line.startsWith("@@")) {
      const m = line.match(/@@ -(\d+)(?:,\d+)? \+(\d+)/);
      if (m) {
        oldNo = Number(m[1]);
        newNo = Number(m[2]);
      }
      continue;
    }
    if (body >= DIFF_LINE_CAP) {
      truncated = true;
      if (line.startsWith("+")) added += 1;
      else if (line.startsWith("-") && !line.startsWith("---")) removed += 1;
      continue;
    }
    if (line.startsWith("+")) {
      added += 1;
      body += 1;
      lines.push({ kind: "add", text: line.slice(1), no: newNo++ });
    } else if (line.startsWith("-")) {
      removed += 1;
      body += 1;
      lines.push({ kind: "del", text: line.slice(1), no: oldNo++ });
    } else if (line.startsWith("\\")) {
      continue;
    } else {
      const text = line.startsWith(" ") ? line.slice(1) : line;
      body += 1;
      lines.push({ kind: "ctx", text, no: newNo });
      oldNo += 1;
      newNo += 1;
    }
  }
  return { lines, added, removed, truncated };
}

export function publicSnapshot(state) {
  return {
    meta: { ...state.meta },
    messages: state.messages,
  };
}
