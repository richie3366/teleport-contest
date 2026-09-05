/**
 * Cursor stream-json and Muse exec --json share one .raw NDJSON file per
 * iteration. This module detects Muse records and folds them into the
 * Cursor-shaped events the observer, usage meter, resume brief, and
 * nav report already understand. Cursor lines pass through unchanged.
 *
 * Muse `exec --json` stdout is a thin task-lifecycle view: tool names,
 * not thoughts or args. The on-disk session log
 * (`~/.local/share/muse/sessions/YYYY/MM/DD/<id>/session.jsonl`) holds
 * `reasoning_summary_*`, `assistant_tool_calls_committed`, and
 * `assistant_message_committed`. The observer tails that file when it
 * can; stdout `.raw` remains the fallback (and the supervisor log).
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
const TOOL_KIND = {
  read_file: "read",
  read: "read",
  grep: "grep",
  glob: "glob",
  bash: "shell",
  shell: "shell",
  exec_command: "shell",
  unified_exec: "shell",
  write_file: "write",
  write: "write",
  edit_file: "edit",
  apply_patch: "edit",
  str_replace: "edit",
  strreplace: "edit",
  delete_file: "delete",
  delete: "delete",
  web_search: "webSearch",
  web_fetch: "webFetch",
  websearch: "webSearch",
  webfetch: "webFetch",
};

const USAGE_KEYS = [
  "inputTokens",
  "outputTokens",
  "promptTokens",
  "totalTokens",
  "cacheReadTokens",
  "cacheWriteTokens",
  "cachedTokens",
  "reasoningTokens",
];

export function isMuseRecord(ev) {
  if (!ev || typeof ev !== "object") return false;
  if (typeof ev.payload_type === "string") return true;
  return ev.schema_version === 1 && ev.payload != null && typeof ev.payload === "object" && ev.type == null;
}

export function museTimestampMs(ev) {
  const raw = ev?.recorded_at ?? ev?.timestamp_ms;
  const n = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isFinite(n) || n <= 0) return undefined;
  // Muse recorded_at is microseconds; Cursor uses milliseconds.
  return n > 1e15 ? Math.floor(n / 1000) : n;
}

const sessionLogCache = new Map();

export function museSessionsRoot() {
  const base = process.env.XDG_DATA_HOME || join(homedir(), ".local/share");
  return join(base, "muse", "sessions");
}

export function peekMuseSessionId(text) {
  for (const line of String(text).split(/\r?\n/)) {
    const s = line.trim();
    if (!s.startsWith("{")) continue;
    let ev;
    try {
      ev = JSON.parse(s);
    } catch {
      continue;
    }
    if (!isMuseRecord(ev)) continue;
    const id = ev.stream?.id || ev.payload?.run_stream?.id || ev.payload?.session_id;
    if (typeof id === "string" && id) return id;
  }
  return null;
}

export function findMuseSessionLog(sessionId) {
  if (typeof sessionId !== "string" || !/^[A-Za-z0-9._-]{8,80}$/.test(sessionId)) return null;
  const cached = sessionLogCache.get(sessionId);
  if (cached && existsSync(cached)) return cached;
  const root = museSessionsRoot();
  const tryAt = (yyyy, mm, dd) => join(root, String(yyyy), mm, dd, sessionId, "session.jsonl");
  const now = new Date();
  for (const delta of [0, -1, 1]) {
    const t = new Date(now.getTime() + delta * 86_400_000);
    const p = tryAt(
      t.getFullYear(),
      String(t.getMonth() + 1).padStart(2, "0"),
      String(t.getDate()).padStart(2, "0"),
    );
    if (existsSync(p)) {
      sessionLogCache.set(sessionId, p);
      return p;
    }
  }
  try {
    for (const year of readdirSync(root, { withFileTypes: true })) {
      if (!year.isDirectory() || !/^\d{4}$/.test(year.name)) continue;
      const ydir = join(root, year.name);
      for (const month of readdirSync(ydir, { withFileTypes: true })) {
        if (!month.isDirectory() || !/^\d{2}$/.test(month.name)) continue;
        const mdir = join(ydir, month.name);
        for (const day of readdirSync(mdir, { withFileTypes: true })) {
          if (!day.isDirectory() || !/^\d{2}$/.test(day.name)) continue;
          const p = join(mdir, day.name, sessionId, "session.jsonl");
          if (existsSync(p)) {
            sessionLogCache.set(sessionId, p);
            return p;
          }
        }
      }
    }
  } catch {
    /* no Muse session store */
  }
  return null;
}

export function createNormalizer() {
  const assistantByRun = new Map();
  const tools = new Map();
  const userByRun = new Set();
  const thinkingByRun = new Map();
  const taskKind = new Map();
  let sessionId = null;
  let model = null;
  let emittedInit = false;
  let emittedModel = null;

  function sessionOf(ev) {
    const id = ev?.stream?.id || ev?.stream?.session_id || null;
    if (id) sessionId = id;
    return sessionId;
  }

  function runIdOf(ev, payload, event) {
    return (
      payload?.run_stream?.id ||
      payload?.run_id ||
      event?.run_id ||
      payload?.command_id ||
      event?.command_id ||
      "run"
    );
  }

  function ensureInit(ev, out) {
    sessionOf(ev);
    if (!emittedInit) {
      emittedInit = true;
      emittedModel = model || null;
      out.push({
        type: "system",
        subtype: "init",
        model: model || undefined,
        session_id: sessionId,
        timestamp_ms: museTimestampMs(ev),
      });
      return;
    }
    if (model && model !== emittedModel) {
      emittedModel = model;
      out.push({
        type: "system",
        subtype: "init",
        model,
        session_id: sessionId,
        timestamp_ms: museTimestampMs(ev),
      });
    }
  }

  function emitUser(ev, prompt, runId, out) {
    const text = String(prompt ?? "").trim();
    if (!text) return;
    if (userByRun.has(runId)) return;
    userByRun.add(runId);
    ensureInit(ev, out);
    out.push({
      type: "user",
      message: { content: [{ type: "text", text }] },
      timestamp_ms: museTimestampMs(ev),
    });
  }

  function emitAssistantDelta(ev, piece, runId, out) {
    if (!piece) return;
    const rec = assistantByRun.get(runId) || { text: "", id: runId };
    rec.text += piece;
    assistantByRun.set(runId, rec);
    ensureInit(ev, out);
    out.push({
      type: "assistant",
      subtype: "delta",
      model_call_id: rec.id,
      message: { content: [{ type: "text", text: piece }] },
      timestamp_ms: museTimestampMs(ev),
    });
  }

  function emitAssistantFinal(ev, text, runId, out) {
    const rec = assistantByRun.get(runId) || { text: "", id: runId };
    const body = text != null && String(text) ? String(text) : rec.text;
    if (!body) return;
    if (rec.text === body) return;
    rec.text = body;
    assistantByRun.set(runId, rec);
    ensureInit(ev, out);
    out.push({
      type: "assistant",
      model_call_id: rec.id,
      message: { content: [{ type: "text", text: body }] },
      timestamp_ms: museTimestampMs(ev),
    });
  }

  function emitThinkingDelta(ev, piece, runId, out) {
    if (!piece) return;
    const rec = thinkingByRun.get(runId) || { text: "" };
    const add =
      rec.text && !rec.text.endsWith("\n") && !String(piece).startsWith("\n") ? `\n${piece}` : piece;
    rec.text += add;
    thinkingByRun.set(runId, rec);
    ensureInit(ev, out);
    out.push({
      type: "thinking",
      subtype: "delta",
      text: add,
      timestamp_ms: museTimestampMs(ev),
    });
  }

  function emitThinkingDone(ev, out) {
    out.push({
      type: "thinking",
      subtype: "completed",
      timestamp_ms: museTimestampMs(ev),
    });
  }

  function aliasTool(a, b) {
    if (!a || !b || a === b) return;
    const rec = tools.get(a) || tools.get(b);
    if (rec) {
      tools.set(String(a), rec);
      tools.set(String(b), rec);
    }
  }

  function rememberTool(id, kind, args, name) {
    if (!id) return { kind, args: {}, name, stdout: "", cardId: "" };
    const prev = tools.get(id) || { kind, args: {}, name, stdout: "", cardId: String(id) };
    prev.kind = kind || prev.kind;
    prev.name = name || prev.name;
    if (args && typeof args === "object") prev.args = { ...prev.args, ...args };
    prev.cardId = prev.cardId || String(id);
    tools.set(id, prev);
    return prev;
  }

  function emitTool(ev, id, kind, args, result, subtype, out) {
    if (!id) return;
    const rec = rememberTool(id, kind, args || {}, "");
    const callId = rec.cardId || String(id);
    const key = `${kind}ToolCall`;
    ensureInit(ev, out);
    out.push({
      type: "tool_call",
      subtype,
      call_id: String(callId),
      timestamp_ms: museTimestampMs(ev),
      tool_call: {
        [key]: {
          args: mapArgs(kind, args || rec.args || {}),
          ...(result != null ? { result } : {}),
        },
      },
    });
  }

  function emitToolStarted(ev, id, rawName, args, out) {
    if (!id || isModelTask(rawName)) return;
    const kind = canonicalToolKind(rawName);
    const mapped = mapArgs(kind, { ...parseArgs(args), ...inferArgsFromText(kind, typeof args === "string" ? args : "") });
    rememberTool(id, kind, mapped, rawName);
    emitTool(ev, id, kind, mapped, null, "started", out);
  }

  function emitToolCompleted(ev, id, resultObj, out) {
    if (!id) return;
    const rec = tools.get(id) || { kind: "shell", args: {}, stdout: "" };
    const inferred = inferArgsFromText(rec.kind, resultObj?.text || resultObj?.output || resultObj?.chunk || rec.stdout);
    if (inferred.path && !rec.args?.path) rec.args = { ...rec.args, ...inferred };
    const result = mapResult(rec.kind, resultObj, rec);
    emitTool(ev, id, rec.kind, rec.args, result, "completed", out);
  }

  function emitToolDelta(ev, id, piece, out) {
    if (!id || !piece) return;
    const rec = tools.get(id) || rememberTool(id, "shell", {}, "");
    rec.stdout = (rec.stdout || "") + piece;
    const inferred = inferArgsFromText(rec.kind, rec.stdout);
    if (inferred.path && !rec.args?.path) rec.args = { ...rec.args, ...inferred };
    const result = mapResult(rec.kind, { stdout: rec.stdout, exitCode: rec.exitCode }, rec);
    emitTool(ev, id, rec.kind, rec.args, result, "started", out);
  }

  function handleCommittedTools(ev, event, payload, out) {
    const calls = event?.tool_calls || payload?.tool_calls || [];
    if (!Array.isArray(calls)) return false;
    let any = false;
    for (const call of calls) {
      if (!call || typeof call !== "object") continue;
      const name = call.name || call.tool || call.tool_name;
      const id = call.call_id || call.id || call.tool_call_id;
      if (!id || isModelTask(name)) continue;
      emitToolStarted(ev, id, name, call.args ?? call.arguments, out);
      any = true;
    }
    return any;
  }

  function handleToolResults(ev, event, payload, out) {
    if (payload?.kind === "tool_result" || (!event?.results && payload?.call_id && payload?.text != null)) {
      const id = payload.call_id || event?.call_id;
      if (id) {
        const name = payload.correlation_facts?.tool_name;
        if (name && !isModelTask(name)) {
          const kind = canonicalToolKind(name);
          if (!tools.has(id)) rememberTool(id, kind, inferArgsFromText(kindOfStored(id, kind), payload.text), name);
        }
        emitToolCompleted(ev, id, payload, out);
        return true;
      }
    }
    let results = event?.results ?? payload?.results;
    if (!Array.isArray(results)) {
      const one = event?.result ?? payload?.result;
      if (one && typeof one === "object") results = [one];
      else results = [];
    }
    let any = false;
    for (const result of results) {
      if (!result || typeof result !== "object") continue;
      const id = result.tool_call_id || result.call_id || result.id || result.task_id;
      if (!id) continue;
      emitToolCompleted(ev, id, result, out);
      any = true;
    }
    return any;
  }

  function kindOfStored(id, fallback) {
    return tools.get(id)?.kind || fallback;
  }

  function handleTaskLifecycle(ev, payload, event, ptype, out) {
    const taskId = payload?.task_id || event?.task_id || payload?.task_stream?.id;
    const rawName =
      event?.task_kind ||
      payload?.task_kind ||
      event?.operation ||
      event?.tool ||
      event?.name ||
      taskKind.get(taskId) ||
      "";
    if (rawName) taskKind.set(taskId, rawName);
    const ek = String(event?.kind || ptype.split(".").pop() || "");
    const args = event?.args ?? payload?.args ?? event?.raw_args;
    const key = event?.idempotency_key || payload?.idempotency_key;
    if (typeof key === "string" && key.startsWith("tool:")) aliasTool(taskId, key.slice(5));

    if (ek === "accepted" || ek === "scheduled" || ek === "status") return true;
    if (ek === "side_effect_intent") return true;
    if (ek === "proposed" || ek === "started") {
      if (taskId && !isModelTask(rawName) && !tools.has(taskId)) {
        emitToolStarted(ev, taskId, rawName, args, out);
      }
      return true;
    }
    if (ek === "output" || ek === "tool_delta" || ek === "delta") {
      const piece = event?.chunk || event?.delta || event?.text || event?.output || payload?.text || "";
      if (taskId && !tools.has(taskId) && !isModelTask(rawName) && rawName) {
        emitToolStarted(ev, taskId, rawName, args, out);
      }
      emitToolDelta(ev, taskId, typeof piece === "string" ? piece : "", out);
      return true;
    }
    if (ek === "completed" || ek === "cancelled" || ek === "timed_out" || ek === "rejected" || ek === "failed") {
      if (isModelTask(rawName) && !tools.has(taskId)) return true;
      if (taskId && !isModelTask(rawName) && !tools.has(taskId) && rawName) {
        emitToolStarted(ev, taskId, rawName, args, out);
      }
      const result = ek === "failed" ? { error: event?.reason || payload?.reason || "failed", text: event?.reason } : event;
      if (taskId && tools.has(taskId)) emitToolCompleted(ev, taskId, result, out);
      return true;
    }
    return false;
  }

  function maybeModel(payload, event) {
    const m =
      payload?.model_id ||
      payload?.modelId ||
      payload?.model ||
      event?.model_id ||
      event?.modelId ||
      payload?.record?.model_id;
    if (typeof m === "string" && m) model = m;
  }

  function normalize(ev) {
    const out = [];
    if (!isMuseRecord(ev)) return out;
    const payload = ev.payload && typeof ev.payload === "object" ? ev.payload : {};
    const event = payload.event && typeof payload.event === "object" ? payload.event : {};
    const ptype = String(ev.payload_type || "");
    const runId = runIdOf(ev, payload, event);
    sessionOf(ev);
    maybeModel(payload, event);

    if (ptype === "turn.input.user" || payload.kind === "turn_input_user") {
      emitUser(ev, payload.prompt ?? event.prompt, runId, out);
      return out;
    }
    if (ptype === "run.lifecycle.started" || (event.kind === "started" && payload.kind === "run")) {
      emitUser(ev, payload.prompt ?? event.prompt, runId, out);
      ensureInit(ev, out);
      return out;
    }
    if (ptype === "run.model.configured") {
      maybeModel(payload, event);
      ensureInit(ev, out);
      return out;
    }
    if (ptype === "run.output.delta" || payload.kind === "run_output_delta") {
      const field = String(payload.field || event.field || "");
      const piece = payload.text ?? event.text ?? payload.delta ?? "";
      if (/reason/i.test(field) || payload.channel === "reasoning") {
        emitThinkingDelta(ev, String(piece || ""), runId, out);
      } else if (piece) {
        emitAssistantDelta(ev, String(piece), runId, out);
      }
      return out;
    }
    const ekind = String(event.kind || "");
    if (ekind === "reasoning_summary_delta" || ekind === "reasoning_delta") {
      emitThinkingDelta(ev, String(event.text ?? payload.text ?? event.delta ?? ""), runId, out);
      return out;
    }
    if (ekind === "reasoning_summary_committed") {
      const rec = thinkingByRun.get(runId);
      const body = event.text ?? payload.text;
      if (body && !rec?.text) emitThinkingDelta(ev, String(body), runId, out);
      emitThinkingDone(ev, out);
      return out;
    }
    if (ekind === "reasoning_committed") {
      const piece = event.text ?? payload.text ?? "";
      if (String(piece).trim()) emitThinkingDelta(ev, String(piece), runId, out);
      return out;
    }
    if (ekind === "model_completed") {
      maybeModel(payload, event);
      ensureInit(ev, out);
      const u = camelUsage(event.usage || payload.usage);
      if (u) out.push({ type: "usage", usage: u, timestamp_ms: museTimestampMs(ev) });
      return out;
    }
    if (ekind === "goal_usage_attribution") {
      const q = event.record?.quantity || payload.record?.quantity;
      const u = camelUsage(q);
      if (u) out.push({ type: "usage", usage: u, timestamp_ms: museTimestampMs(ev) });
      return out;
    }
    if (ptype.startsWith("task.lifecycle.") || payload.kind === "task_lifecycle") {
      handleTaskLifecycle(ev, payload, event, ptype, out);
      return out;
    }
    if (event.kind === "assistant_message_committed") {
      emitThinkingDone(ev, out);
      emitAssistantFinal(ev, event.text, runId, out);
      return out;
    }
    if (event.kind === "assistant_tool_calls_committed") {
      emitThinkingDone(ev, out);
      handleCommittedTools(ev, event, payload, out);
      return out;
    }
    if (
      event.kind === "tool_result" ||
      event.kind === "tool_result_batch_committed" ||
      event.kind === "tool_results_committed" ||
      event.kind === "tool_result_committed" ||
      ptype === "tool.result" ||
      payload.kind === "tool_result"
    ) {
      handleToolResults(ev, event, payload, out);
      return out;
    }
    const isRunTerminal =
      ptype.startsWith("run.terminal.") ||
      payload.kind === "run_terminal" ||
      (payload.kind === "run" && event.kind === "terminal");
    if (isRunTerminal) {
      emitThinkingDone(ev, out);
      const terminal = payload.terminal || event.terminal || ptype.split(".").pop();
      const failed = terminal === "failed" || terminal === "cancelled" || ptype.endsWith("failed") || ptype.endsWith("cancelled");
      const text = payload.text ?? event.text;
      if (text) emitAssistantFinal(ev, text, runId, out);
      const usage = camelUsage(payload.usage || event.usage) || payload.usage || event.usage;
      out.push({
        type: "result",
        subtype: failed ? "error" : "success",
        is_error: failed,
        result: payload.reason || event.reason || "",
        error: failed ? payload.reason || event.reason || "" : undefined,
        duration_ms: payload.duration_ms ?? payload.durationMs ?? event.duration_ms ?? event.turn_duration_ms,
        usage: usage && typeof usage === "object" ? usage : undefined,
        timestamp_ms: museTimestampMs(ev),
      });
      return out;
    }
    if (ptype === "session.end.resource_usage") {
      return out;
    }
    return out;
  }

  return { normalize, sessionId: () => sessionId, model: () => model };
}

function isModelTask(name) {
  const n = String(name || "");
  return !n || /^model\./.test(n) || n.includes("unknown.response");
}

export function canonicalToolKind(name) {
  let n = String(name || "");
  for (const sep of ["__", "/", "."]) {
    if (n.includes(sep)) n = n.split(sep).pop();
  }
  n = n.replace(/ToolCall$/i, "");
  const snake = n.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase().replace(/-/g, "_");
  return TOOL_KIND[n] || TOOL_KIND[n.toLowerCase()] || TOOL_KIND[snake] || (n || "tool");
}

function inferArgsFromText(kind, text) {
  const t = String(text || "");
  if (!t) return {};
  const first = t.split(/\r?\n/, 1)[0];
  const tick = first.match(/`([^`]+)`/);
  if (tick && (kind === "read" || kind === "write" || kind === "edit" || kind === "delete")) {
    return { path: tick[1] };
  }
  const read = first.match(/^Read(?: text)? file [`']([^`']+)[`']/i);
  if (read) return { path: read[1] };
  return {};
}

function camelUsage(u) {
  if (!u || typeof u !== "object" || Array.isArray(u)) return null;
  const map = {
    input_tokens: "inputTokens",
    output_tokens: "outputTokens",
    cached_tokens: "cachedTokens",
    cache_read_tokens: "cacheReadTokens",
    cache_write_tokens: "cacheWriteTokens",
    reasoning_tokens: "reasoningTokens",
    prompt_tokens: "promptTokens",
    total_tokens: "totalTokens",
  };
  const out = {};
  for (const [k, v] of Object.entries(u)) {
    if (typeof v !== "number" || !Number.isFinite(v)) continue;
    out[map[k] || k] = v;
  }
  return Object.keys(out).length ? out : null;
}

function parseArgs(value) {
  if (value == null) return {};
  if (typeof value === "object" && !Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : { raw: value };
    } catch {
      return { raw: value };
    }
  }
  return {};
}

function mapArgs(kind, args) {
  const a = { ...args };
  if (!a.path) {
    if (typeof a.file_path === "string") a.path = a.file_path;
    else if (typeof a.target_path === "string") a.path = a.target_path;
    else if (typeof a.targetFile === "string") a.path = a.targetFile;
    else if (typeof a.filename === "string") a.path = a.filename;
    else if (typeof a.file === "string") a.path = a.file;
  }
  if (!a.command) {
    if (typeof a.cmd === "string") a.command = a.cmd;
    else if (typeof a.commandText === "string") a.command = a.commandText;
  }
  if (a.pattern == null && typeof a.query === "string") a.pattern = a.query;
  if (kind === "shell" && !a.command && typeof a.raw === "string") a.command = a.raw;
  return a;
}

function mapResult(kind, result, rec) {
  if (result == null) return rec?.stdout ? { success: { stdout: rec.stdout } } : null;
  if (typeof result !== "object") {
    return { success: { preview: String(result), stdout: String(result) } };
  }
  if (result.success || result.failure || result.error) {
    if (typeof result.error === "object" || result.failure) return result;
    if (typeof result.error === "string") return { failure: { message: result.error } };
  }
  const err =
    result.failure_kind ||
    result.failureKind ||
    (typeof result.error === "string" ? result.error : result.error?.message) ||
    result.failure_reason ||
    result.failureReason;
  const exit = result.exitCode ?? result.exit_code;
  const stdout =
    result.stdout ??
    result.text ??
    result.output ??
    result.preview ??
    rec?.stdout ??
    "";
  const stderr = result.stderr || "";
  if (err && kind !== "shell") {
    return { failure: { message: String(err) } };
  }
  if (kind === "read") {
    return {
      success: {
        content: result.content ?? stdout,
        path: result.path,
        totalLines: result.totalLines ?? result.total_lines,
      },
    };
  }
  if (kind === "edit" || kind === "write") {
    return {
      success: {
        diffString: result.diffString ?? result.diff ?? result.diff_string,
        path: result.path,
        afterFullFileContent: result.content ?? result.afterFullFileContent,
        linesAdded: result.linesAdded ?? result.lines_added,
        linesRemoved: result.linesRemoved ?? result.lines_removed,
      },
    };
  }
  if (kind === "shell") {
    const success = {
      exitCode: exit ?? (err ? 1 : 0),
      stdout,
      stderr,
      interleavedOutput: result.interleavedOutput,
    };
    return { success };
  }
  if (kind === "grep" || kind === "glob") {
    return { success: { preview: stdout || JSON.stringify(result).slice(0, 400) } };
  }
  return { success: result };
}

function isUsageShape(o) {
  if (!o || typeof o !== "object" || Array.isArray(o)) return false;
  if (USAGE_KEYS.some((k) => typeof o[k] === "number")) return true;
  return (
    typeof o.input_tokens === "number" ||
    typeof o.output_tokens === "number" ||
    typeof o.total_tokens === "number" ||
    typeof o.prompt_tokens === "number"
  );
}

function harvestUsageFrom(ev, acc) {
  visitForUsage(ev, acc, 0);
}

function visitForUsage(obj, acc, depth) {
  if (!obj || typeof obj !== "object" || depth > 8) return;
  if (Array.isArray(obj)) {
    for (const x of obj) visitForUsage(x, acc, depth + 1);
    return;
  }
  if (obj.cumulative && typeof obj.cumulative === "object" && typeof obj.cumulative.totalTokens === "number") {
    acc.cumulative = camelUsage(obj.cumulative) || obj.cumulative;
  }
  if (obj.usage && isUsageShape(obj.usage)) acc.usage = camelUsage(obj.usage) || obj.usage;
  if (isUsageShape(obj) && obj.payload == null && obj.payload_type == null && obj.type !== "result") {
    const tokenFields = USAGE_KEYS.filter((k) => typeof obj[k] === "number").length;
    const snakeFields = ["input_tokens", "output_tokens", "total_tokens", "prompt_tokens"].filter(
      (k) => typeof obj[k] === "number",
    ).length;
    const keys = Object.keys(obj);
    if (tokenFields + snakeFields >= 1 && keys.length <= 12) acc.usage = camelUsage(obj) || obj;
  }
  for (const [k, v] of Object.entries(obj)) {
    if (k === "usage" || k === "cumulative") continue;
    if (v && typeof v === "object") visitForUsage(v, acc, depth + 1);
  }
}

function filterNumeric(obj) {
  const breakdown = {};
  if (!obj || typeof obj !== "object") return breakdown;
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === "number" && Number.isFinite(v)) breakdown[k] = v;
  }
  return breakdown;
}

function museTotal(usage) {
  if (!usage) return 0;
  if (typeof usage.totalTokens === "number") return usage.totalTokens;
  const prompt = usage.promptTokens ?? usage.inputTokens ?? 0;
  const output = usage.outputTokens ?? 0;
  const reason = usage.reasoningTokens ?? 0;
  return prompt + output + reason;
}

function sumMuseSteps(steps) {
  const breakdown = {};
  for (const s of steps) {
    for (const [k, v] of Object.entries(s)) {
      if (typeof v === "number" && Number.isFinite(v)) breakdown[k] = (breakdown[k] || 0) + v;
    }
  }
  // input already includes cached tokens; do not add cacheRead/cached again.
  const total =
    (breakdown.inputTokens || 0) +
    (breakdown.promptTokens || 0) +
    (breakdown.outputTokens || 0) +
    (breakdown.reasoningTokens || 0);
  return { found: true, total, breakdown };
}

export function extractUsageFromRaw(text) {
  let cursorUsage = null;
  const museAcc = { cumulative: null, usage: null, completed: [], attributions: [] };
  for (const line of String(text).split(/\r?\n/)) {
    const s = line.trim();
    if (!s.startsWith("{")) continue;
    let ev;
    try {
      ev = JSON.parse(s);
    } catch {
      continue;
    }
    if (ev?.type === "result" && ev.usage && typeof ev.usage === "object") {
      cursorUsage = ev.usage;
    }
    if (!isMuseRecord(ev)) continue;
    harvestUsageFrom(ev, museAcc);
    const payload = ev.payload && typeof ev.payload === "object" ? ev.payload : {};
    const event = payload.event && typeof payload.event === "object" ? payload.event : {};
    if (event.kind === "model_completed") {
      const u = camelUsage(event.usage || payload.usage);
      if (u) museAcc.completed.push(u);
    } else if (event.kind === "goal_usage_attribution") {
      const rec = event.record || {};
      if (rec.usage_family === "tool") continue;
      const u = camelUsage(rec.quantity);
      if (u) museAcc.attributions.push(u);
    }
  }
  if (cursorUsage) {
    const breakdown = filterNumeric(cursorUsage);
    const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
    return { found: true, total, breakdown };
  }
  if (museAcc.cumulative && typeof museAcc.cumulative.totalTokens === "number") {
    const breakdown = {
      ...filterNumeric(camelUsage(museAcc.cumulative) || museAcc.cumulative),
      ...filterNumeric(camelUsage(museAcc.usage) || museAcc.usage),
    };
    return { found: true, total: museAcc.cumulative.totalTokens, breakdown };
  }
  const steps = museAcc.completed.length ? museAcc.completed : museAcc.attributions;
  if (steps.length) return sumMuseSteps(steps);
  if (museAcc.usage) {
    const camel = camelUsage(museAcc.usage) || museAcc.usage;
    const breakdown = filterNumeric(camel);
    return { found: true, total: museTotal(camel), breakdown };
  }
  return { found: false, total: 0, breakdown: {} };
}

/** Supervisor entry: Muse stdout `.raw` has no usage; follow session.jsonl. */
export function extractUsageFromPath(filePath) {
  if (!filePath || !existsSync(filePath)) return { found: false, total: 0, breakdown: {} };
  const text = readFileSync(filePath, "utf8");
  const sid = peekMuseSessionId(text);
  const sess = sid && findMuseSessionLog(sid);
  if (sess) {
    const fromSess = extractUsageFromRaw(readFileSync(sess, "utf8"));
    if (fromSess.found) return fromSess;
  }
  return extractUsageFromRaw(text);
}

export function parseRawText(text) {
  const normalizer = createNormalizer();
  const events = [];
  const stray = [];
  for (const line of String(text).split(/\r?\n/)) {
    if (!line.trim()) continue;
    let ev;
    try {
      ev = JSON.parse(line);
    } catch {
      stray.push(line.trim());
      continue;
    }
    if (!ev || typeof ev !== "object") continue;
    if (isMuseRecord(ev)) events.push(...normalizer.normalize(ev));
    else events.push(ev);
  }
  return { events, stray };
}

const APPROVAL_RE =
  /rejected by user|requires approval|not approved|tool call was rejected|Shell call was rejected|approval required|tools? were rejected/i;

export function scanToolDenials(text) {
  const { events } = parseRawText(text);
  const denials = [];
  const stats = { started: 0, completed: 0, ok: 0, err: 0 };
  for (const ev of events) {
    if (ev.type !== "tool_call") continue;
    if (ev.subtype === "started") {
      stats.started++;
      continue;
    }
    if (ev.subtype !== "completed") continue;
    stats.completed++;
    const tc = ev.tool_call || {};
    const key = Object.keys(tc).find((k) => k.endsWith("ToolCall")) || "unknown";
    const result = tc[key]?.result;
    if (!result) continue;
    if (result.success) {
      stats.ok++;
      continue;
    }
    stats.err++;
    const errObj = result.error ?? result.failure ?? result;
    if (errObj && typeof errObj === "object" && ("exitCode" in errObj || "signal" in errObj)) {
      continue;
    }
    const errBlob = JSON.stringify(errObj);
    if (APPROVAL_RE.test(errBlob)) denials.push(`${key}: ${errBlob.slice(0, 180)}`);
  }
  return { denials, stats };
}

export function extractHumanLog(text) {
  const { events } = parseRawText(text);
  const chunks = [];
  let asst = "";
  const flushAsst = () => {
    if (asst) {
      chunks.push(asst);
      asst = "";
    }
  };
  for (const ev of events) {
    const t = ev.type || ev.event || "";
    if (t === "thinking") continue;
    if (t === "assistant" || t === "message" || t === "text" || t === "agent_message") {
      const piece = messageText(ev.message) || (typeof ev.text === "string" ? ev.text : "");
      if (!piece) continue;
      if (ev.subtype === "delta") asst += piece;
      else {
        asst = piece;
        flushAsst();
      }
      continue;
    }
    flushAsst();
    if (t === "result") {
      if (typeof ev.result === "string" && ev.result && !chunks.includes(ev.result)) {
        chunks.push(ev.result);
      }
      continue;
    }
    if (t === "tool_call" || ev.subtype === "tool_call" || String(t).includes("tool")) {
      const tc = ev.tool_call || {};
      const key = Object.keys(tc).find((k) => k.endsWith("ToolCall"));
      const name = key ? key.replace(/ToolCall$/, "") : ev.toolName || ev.name || ev.tool || "tool";
      const status = ev.status || ev.subtype || t;
      const err = ev.error || ev.rejection || ev.reason || "";
      chunks.push(`[tool] ${name} ${status}${err ? `: ${err}` : ""}`);
    }
  }
  flushAsst();
  return chunks.length ? chunks.join("\n") + "\n" : text.endsWith("\n") ? text : text + "\n";
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
