import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isCodexRecord, parseRawText, extractUsageFromRaw, extractHumanLog, scanToolDenials } from "./loop-raw.mjs";
import { createTranscript, applyNdjsonChunk, resetTranscript } from "../loop-observer/parse.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const fixture = readFileSync(join(here, "../loop-observer/fixtures/codex-iter.jsonl"), "utf8");
const jsonl = (events) => events.map((e) => JSON.stringify(e)).join("\n") + "\n";
const run = (script, args = [], options = {}) => {
  const result = spawnSync(process.execPath, [join(here, script), ...args], { encoding: "utf8", ...options });
  assert.equal(result.error, undefined, result.error?.message);
  return result;
};

describe("Codex exec raw and observer", () => {
  it("detects Codex events while leaving other providers alone", () => {
    assert.equal(isCodexRecord({ type: "thread.started", thread_id: "abc" }), true);
    assert.equal(isCodexRecord({ type: "tool_call", subtype: "started" }), false);
    assert.equal(isCodexRecord({ type: "error", message: "bad", uuid: "claude-uuid" }), false);
  });

  it("counts input/output once, including cached input and reasoning subsets", () => {
    const u = extractUsageFromRaw(fixture);
    assert.equal(u.found, true);
    assert.equal(u.total, 1200);
    assert.equal(u.breakdown.cachedInputTokens, 800);
    assert.equal(u.breakdown.cacheWriteTokens, 50);
    assert.equal(u.breakdown.reasoningOutputTokens, 100);
    const extraTurn = jsonl([{ type: "turn.completed", usage: { input_tokens: 50, output_tokens: 10 } }]);
    assert.equal(extractUsageFromRaw(fixture + extraTurn).total, 1260);
    assert.equal(extractUsageFromRaw('{"type":"turn.failed"}\n').found, false);
    assert.equal(extractUsageFromRaw(extraTurn.replace('50', '0').replace('10', '0')).found, true);
    const withCacheWrite = jsonl([{ type: "turn.completed", usage: { input_tokens: 100, output_tokens: 20, cache_write_input_tokens: 30 } }]);
    const w = extractUsageFromRaw(withCacheWrite);
    assert.equal(w.total, 120);
    assert.equal(w.breakdown.cacheWriteTokens, 30);
  });

  it("coalesces streamed snapshots and tools and keeps every changed file", () => {
    const t = createTranscript();
    for (const line of fixture.trim().split("\n")) applyNdjsonChunk(t, line);
    assert.equal(t.meta.sessionId, "sess-codex");
    assert.equal(t.meta.model, "test-codex-model");
    assert.equal(t.meta.resultOk, true);
    assert.equal(t.meta.running, false);
    assert.equal(t.meta.usage.total, 1200);
    assert.equal(t.meta.durationMs, 780);
    assert.equal(t.messages.filter((m) => m.kind === "assistant").length, 1);
    assert.equal(t.messages.find((m) => m.kind === "assistant").text, "fill_zoo is ported.");
    const tools = t.messages.filter((m) => m.kind === "tool");
    assert.equal(tools.length, 5);
    assert.ok(tools.every((m) => m.status === "done"));
    assert.equal(tools.find((m) => m.id === "tool-cmd_1").result.stdout, "# Current\nNext cluster: fill_zoo");
    assert.equal(tools.find((m) => m.id === "tool-cmd_1").ts, 1200);
    assert.equal(tools.find((m) => m.id === "tool-cmd_1").tsEnd, 1300);
    assert.equal(tools.find((m) => m.id === "tool-patch_1-0").path, "js/mklev.js");
    assert.match(tools.find((m) => m.id === "tool-patch_1-0").result.preview, /update/);
    assert.equal(tools.find((m) => m.id === "tool-patch_1-1").name, "Write");
    resetTranscript(t);
    applyNdjsonChunk(t, fixture);
    assert.equal(t.meta.usage.total, 1200);
    assert.equal(t.messages.filter((m) => m.kind === "tool").length, 5);
  });

  it("marks failed commands as errors, but distinguishes shell exits from approval denials", () => {
    const raw = jsonl([
      { type: "item.completed", item: { id: "cmd_bad", type: "command_execution", command: "false", exit_code: 1, aggregated_output: "permission denied", status: "completed" } },
      { type: "item.completed", item: { id: "cmd_denied", type: "command_execution", command: "cat file", status: "declined", aggregated_output: "requires approval" } },
      { type: "turn.failed", error: { message: "You've hit your usage limit" } },
    ]);
    const t = createTranscript();
    applyNdjsonChunk(t, raw);
    assert.equal(t.meta.resultOk, false);
    assert.ok(t.messages.filter((m) => m.kind === "tool").every((m) => m.status === "error"));
    const { denials, stats } = scanToolDenials(raw);
    assert.equal(denials.length, 1);
    assert.equal(stats.completed, 2);
    assert.match(extractHumanLog(raw), /usage limit/);
  });

  it("keeps reconnect errors visible without prematurely ending the observer", () => {
    const t = createTranscript();
    applyNdjsonChunk(t, '{"type":"error","message":"reconnecting"}\n');
    assert.equal(t.meta.running, true);
    assert.match(t.messages[0].text, /reconnecting/);
    applyNdjsonChunk(t, '{"type":"turn.completed","usage":{"input_tokens":1,"output_tokens":1}}\n');
    assert.equal(t.meta.resultOk, true);
  });

  it("renders MCP/search tools and edits with supplied diffs", () => {
    const raw = jsonl([
      { type: "item.completed", item: { id: "mcp", type: "mcp_tool_call", server: "repo", tool: "lookup", arguments: { query: "zoo" }, result: { content: [{ type: "text", text: "found" }] }, status: "completed" } },
      { type: "item.completed", item: { id: "search", type: "web_search", query: "zoo" } },
      { type: "item.completed", item: { id: "patch", type: "file_change", changes: [{ path: "js/zoo.js", kind: "update", diff: "@@ -1 +1 @@\n-old\n+new" }], status: "completed" } },
    ]);
    const t = createTranscript();
    applyNdjsonChunk(t, raw);
    assert.deepEqual(t.messages.map((m) => m.name), ["MCP", "Search", "Edit"]);
    assert.ok(t.messages[2].result.lines.length);
    assert.match(t.messages[0].result.preview, /found/);
  });

  it("feeds extract, navigation report, resume brief, and stderr recovery", () => {
    const dir = mkdtempSync(join(tmpdir(), "codex-raw-test-"));
    try {
      const raw = join(dir, "iter-0001-test.raw");
      writeFileSync(raw, fixture);
      writeFileSync(raw.replace(/\.raw$/, ".err"), "stderr: rate limit reached\n");
      const log = extractHumanLog(fixture);
      assert.match(log, /fill_zoo is ported/);
      assert.match(log, /\[tool\] shell completed/);
      const brief = run("loop-resume-brief.mjs", [raw]);
      assert.equal(brief.status, 0, brief.stderr);
      assert.match(brief.stdout, /js\/mklev.js/);
      assert.match(brief.stdout, /verification complete/);
      assert.match(brief.stdout, /stderr: rate limit reached/);
      assert.match(brief.stdout, /PROVIDER QUOTA/);
      const report = run("loop-nav-report.mjs", [raw, "--json"]);
      assert.equal(report.status, 0, report.stderr);
      assert.match(report.stdout, /"calls":\s*5/);
      assert.match(report.stdout, /"tokens":\s*1200/);
      const { events } = parseRawText(fixture);
      assert.equal(events.filter((e) => e.type === "tool_call" && e.subtype === "started").length, 5);
    } finally { rmSync(dir, { recursive: true, force: true }); }
  });

  it("preserves JSON events and records prompt and receive times", () => {
    const dir = mkdtempSync(join(tmpdir(), "codex-stamp-test-"));
    try {
      const prompt = join(dir, "prompt.md");
      writeFileSync(prompt, "line 1\nline 2");
      const result = run("codex-loop-stream.mjs", ["model-name", prompt], { input: '{"type":"thread.started","thread_id":"test"}\n' });
      assert.equal(result.status, 0, result.stderr);
      const lines = result.stdout.trim().split("\n").map(JSON.parse);
      assert.equal(lines[0].model, "model-name");
      assert.equal(lines[1].message.content[0].text, "line 1\nline 2");
      assert.equal(lines[2].thread_id, "test");
      assert.ok(lines.every((e) => Number.isFinite(e.timestamp_ms)));
    } finally { rmSync(dir, { recursive: true, force: true }); }
  });

  it("accepts app-server file_change spellings (type/unified_diff)", () => {
    const raw = jsonl([
      { type: "item.completed", item: { id: "patch", type: "file_change", changes: [{ path: "js/a.js", type: "update", unified_diff: "@@ -1 +1 @@\n-old\n+new" }], status: "completed" } },
      { type: "item.completed", item: { id: "del", type: "file_change", changes: [{ path: "js/gone.js", kind: "delete" }], status: "completed" } },
    ]);
    const t = createTranscript();
    applyNdjsonChunk(t, raw);
    const edit = t.messages.find((m) => m.id === "tool-patch-0");
    assert.equal(edit.name, "Edit");
    assert.ok(edit.result.lines.length);
    const gone = t.messages.find((m) => m.id === "tool-del-0");
    assert.equal(gone.name, "Delete");
    assert.match(gone.result.preview, /delete/);
  });

  it("renders collab tool calls as Task cards", () => {
    const raw = jsonl([
      { type: "item.completed", item: { id: "collab", type: "collab_tool_call", tool: "spawnAgent", prompt: "help", agents: ["a1"], status: "completed" } },
    ]);
    const t = createTranscript();
    applyNdjsonChunk(t, raw);
    assert.equal(t.messages[0].name, "Task");
    assert.match(t.messages[0].result.preview, /a1/);
  });

  it("coalesces multi-chunk reasoning deltas", () => {
    const t = createTranscript();
    applyNdjsonChunk(t, jsonl([
      { type: "item.started", item: { id: "r1", type: "reasoning", text: "Read " } },
      { type: "item.updated", item: { id: "r1", type: "reasoning", text: "Read CURRENT.md " } },
      { type: "item.updated", item: { id: "r1", type: "reasoning", text: "Read CURRENT.md first." } },
      { type: "item.completed", item: { id: "r1", type: "reasoning", text: "Read CURRENT.md first." } },
    ]));
    const thoughts = t.messages.filter((m) => m.kind === "thinking");
    assert.equal(thoughts.length, 1);
    assert.equal(thoughts[0].text, "Read CURRENT.md first.");
    assert.equal(thoughts[0].status, "done");
  });

  it("reads reasoning summary/content arrays when text is absent", () => {
    const t = createTranscript();
    applyNdjsonChunk(t, jsonl([
      { type: "item.completed", item: { id: "r2", type: "reasoning", summary: ["Plan ", "the port"] } },
      { type: "item.completed", item: { id: "r3", type: "reasoning", content: [{ text: "Check " }, { text: "callers" }] } },
    ]));
    const thoughts = t.messages.filter((m) => m.kind === "thinking");
    assert.equal(thoughts.length, 2);
    assert.match(thoughts[0].text, /Plan/);
    assert.match(thoughts[1].text, /callers/);
  });

  it("keeps unknown item types visible instead of dropping them", () => {
    const raw = jsonl([
      { type: "item.completed", item: { id: "future", type: "plan", text: "step 1", status: "completed" } },
    ]);
    const t = createTranscript();
    applyNdjsonChunk(t, raw);
    const tools = t.messages.filter((m) => m.kind === "tool");
    assert.equal(tools.length, 1);
    assert.equal(tools[0].name, "Tool");
    assert.match(tools[0].result.preview, /plan/);
    const { events } = parseRawText(raw);
    assert.ok(events.some((e) => e.type === "tool_call"));
  });

  it("prefers native event timestamps over receive time", () => {
    const dir = mkdtempSync(join(tmpdir(), "codex-stamp-native-"));
    try {
      const prompt = join(dir, "prompt.md");
      writeFileSync(prompt, "hi");
      const input = '{"type":"turn.started","timestamp_ms":1234567}\nnot-json\n42\n';
      const result = run("codex-loop-stream.mjs", ["m", prompt], { input });
      assert.equal(result.status, 0, result.stderr);
      const lines = result.stdout.trim().split("\n");
      assert.equal(JSON.parse(lines[2]).timestamp_ms, 1234567);
      assert.equal(lines[3], "not-json");
      assert.equal(lines[4], "42");
    } finally { rmSync(dir, { recursive: true, force: true }); }
  });
});
