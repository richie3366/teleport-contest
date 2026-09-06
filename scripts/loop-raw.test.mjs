import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  extractUsageFromRaw,
  parseRawText,
  extractHumanLog,
  isMuseRecord,
} from "./loop-raw.mjs";
import { createTranscript, applyNdjsonChunk } from "../loop-observer/parse.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const fixture = readFileSync(join(here, "../loop-observer/fixtures/muse-iter.jsonl"), "utf8");

describe("loop-raw Muse fixture", () => {
  it("detects Muse records", () => {
    const first = JSON.parse(fixture.split("\n")[0]);
    assert.equal(isMuseRecord(first), true);
  });

  it("extracts cumulative token usage", () => {
    const u = extractUsageFromRaw(fixture);
    assert.equal(u.found, true);
    assert.equal(u.total, 1200);
    assert.equal(u.breakdown.totalTokens, 1200);
    assert.equal(u.breakdown.promptTokens, 1000);
  });

  it("normalizes user, assistant, shell tool, result", () => {
    const { events } = parseRawText(fixture);
    assert.ok(events.some((e) => e.type === "user"));
    assert.ok(events.some((e) => e.type === "assistant"));
    const started = events.find((e) => e.type === "tool_call" && e.subtype === "started");
    assert.ok(started);
    assert.ok(started.tool_call.shellToolCall);
    assert.match(started.tool_call.shellToolCall.args.command, /ps_test_runner/);
    const done = events.find((e) => e.type === "tool_call" && e.subtype === "completed");
    assert.ok(done);
    const result = events.find((e) => e.type === "result");
    assert.ok(result);
    assert.equal(result.is_error, false);
  });

  it("feeds the observer transcript cards", () => {
    const t = createTranscript();
    applyNdjsonChunk(t, fixture);
    const kinds = t.messages.map((m) => m.kind);
    assert.ok(kinds.includes("user"));
    assert.ok(kinds.includes("assistant"));
    assert.ok(kinds.includes("tool"));
    assert.ok(kinds.includes("result"));
    assert.equal(t.meta.model, "muse-spark-1.3-contributor");
    assert.equal(t.meta.usage?.total, 1250);
    const tool = t.messages.find((m) => m.kind === "tool");
    assert.equal(tool.name, "Shell");
    const asst = t.messages.find((m) => m.kind === "assistant");
    assert.match(asst.text, /fill_zoo/);
  });

  it("human extract includes assistant text and tool markers", () => {
    const log = extractHumanLog(fixture);
    assert.match(log, /fill_zoo/);
    assert.match(log, /\[tool\] shell/);
  });
});

const sessionFixture = readFileSync(join(here, "../loop-observer/fixtures/muse-session.jsonl"), "utf8");
const thinFixture = readFileSync(join(here, "../loop-observer/fixtures/muse-stdout-thin.jsonl"), "utf8");

describe("loop-raw Muse session.jsonl (runtime.session)", () => {
  it("surfaces thinking, tool path, assistant text, and snake_case usage", () => {
    const { events } = parseRawText(sessionFixture);
    assert.ok(events.some((e) => e.type === "user"));
    const think = events.find((e) => e.type === "thinking" && e.subtype === "delta");
    assert.ok(think);
    assert.match(think.text, /CURRENT\.md/);
    const started = events.find((e) => e.type === "tool_call" && e.subtype === "started");
    assert.equal(started.tool_call.readToolCall.args.path, "docs/CURRENT.md");
    const done = events.find((e) => e.type === "tool_call" && e.subtype === "completed");
    assert.match(String(done.tool_call.readToolCall.result.success.content), /# Current/);
    const asst = events.find((e) => e.type === "assistant" && e.subtype !== "delta");
    assert.match(asst.message.content[0].text, /fill_zoo/);
    const usage = events.find((e) => e.type === "usage");
    assert.equal(usage.usage.inputTokens, 1000);
  });

  it("observer cards include thinking title path and assistant", () => {
    const t = createTranscript();
    applyNdjsonChunk(t, sessionFixture);
    assert.ok(t.messages.some((m) => m.kind === "thinking"));
    const tool = t.messages.find((m) => m.kind === "tool");
    assert.equal(tool.name, "Read");
    assert.match(tool.title, /CURRENT\.md/);
    assert.ok(t.messages.some((m) => m.kind === "assistant"));
    assert.equal(t.meta.usage.breakdown.inputTokens, 1000);
  });
});

describe("loop-raw Muse exec --json stdout (no thoughts)", () => {
  it("infers Read path from output/result and keeps one tool card", () => {
    const { events } = parseRawText(thinFixture);
    const tools = events.filter((e) => e.type === "tool_call");
    const ids = new Set(tools.map((e) => e.call_id));
    assert.equal(ids.size, 1);
    const started = tools.find((e) => e.subtype === "started" && e.tool_call.readToolCall?.args?.path);
    assert.ok(started);
    assert.equal(started.tool_call.readToolCall.args.path, "docs/CURRENT.md");
  });

  it("observer still shows a Read card when session.jsonl is absent", () => {
    const t = createTranscript();
    applyNdjsonChunk(t, thinFixture);
    const tool = t.messages.find((m) => m.kind === "tool");
    assert.equal(tool.name, "Read");
    assert.match(tool.title, /CURRENT.md/);
    assert.ok(tool.result?.preview);
  });

  it("does not treat tool_batch.effect.terminal as the run result", () => {
    const line = JSON.stringify({
      schema_version: 1,
      stream: { kind: "session", id: "s" },
      recorded_at: 1788599595000000,
      payload_type: "tool_batch.effect.terminal",
      payload: {
        kind: "tool_batch_effect",
        record: { kind: "terminal", call_id: "call_1", tool_name: "bash" },
      },
    });
    const { events } = parseRawText(line);
    assert.equal(events.some((e) => e.type === "result"), false);
  });
});

describe("loop-raw Cursor stream-json", () => {
  const cursor = [
    '{"type":"system","subtype":"init","model":"cursor-grok-4.6-xhigh","session_id":"s1"}',
    '{"type":"user","message":{"content":[{"type":"text","text":"hi"}]}}',
    '{"type":"assistant","message":{"content":[{"type":"text","text":"hello"}]}}',
    '{"type":"tool_call","subtype":"started","call_id":"c1","tool_call":{"shellToolCall":{"args":{"command":"echo 1"}}}}',
    '{"type":"tool_call","subtype":"completed","call_id":"c1","tool_call":{"shellToolCall":{"args":{"command":"echo 1"},"result":{"success":{"exitCode":0,"stdout":"1"}}}}}',
    '{"type":"result","subtype":"success","is_error":false,"usage":{"input":10,"output":5,"cacheRead":2}}',
  ].join("\n");

  it("sums all numeric result.usage fields", () => {
    const u = extractUsageFromRaw(cursor);
    assert.equal(u.found, true);
    assert.equal(u.total, 17);
    assert.equal(u.breakdown.input, 10);
    assert.equal(u.breakdown.cacheRead, 2);
  });

  it("passes Cursor events through unchanged", () => {
    const { events } = parseRawText(cursor);
    assert.equal(events.filter((e) => e.type === "assistant").length, 1);
    assert.equal(events[0].type, "system");
  });

  it("observer still parses Cursor stream-json", () => {
    const t = createTranscript();
    applyNdjsonChunk(t, cursor);
    assert.equal(t.meta.model, "cursor-grok-4.6-xhigh");
    assert.ok(t.messages.some((m) => m.kind === "user"));
    assert.ok(t.messages.some((m) => m.kind === "assistant"));
    assert.ok(t.messages.some((m) => m.kind === "tool"));
    assert.equal(t.meta.usage.total, 17);
  });
});

describe("loop-raw Muse bash JSON envelope", () => {
  it("unwraps output/exit_code instead of dumping the JSON blob", () => {
    const envelope = {
      chunk_id: "exec-1-1",
      command: "node scripts/brief.mjs do_statusline2",
      description: "Queue row for do_statusline2",
      exit_code: 0,
      terminal_status: "completed",
      truncated: false,
      original_output_bytes: 80,
      output: "QUEUE ROW for do_statusline2\nlive in js/\n",
    };
    const text = [
      JSON.stringify({
        schema_version: 1,
        stream: { kind: "session", id: "sess-bash" },
        recorded_at: 1788599595000000,
        payload_type: "runtime.session",
        payload: {
          kind: "run",
          run_id: "run-1",
          event: {
            kind: "assistant_tool_calls_committed",
            tool_calls: [
              {
                call_id: "call_bash1",
                name: "bash",
                args: JSON.stringify({
                  command: envelope.command,
                  description: envelope.description,
                }),
              },
            ],
          },
        },
      }),
      JSON.stringify({
        schema_version: 1,
        stream: { kind: "session", id: "sess-bash" },
        recorded_at: 1788599595100000,
        payload_type: "runtime.session",
        payload: {
          kind: "run",
          run_id: "run-1",
          event: {
            kind: "tool_result_batch_committed",
            results: [{ tool_call_id: "call_bash1", text: JSON.stringify(envelope) }],
          },
        },
      }),
    ].join("\n");
    const { events } = parseRawText(text);
    const done = events.find((e) => e.type === "tool_call" && e.subtype === "completed");
    assert.ok(done);
    const ok = done.tool_call.shellToolCall.result.success;
    assert.equal(ok.exitCode, 0);
    assert.equal(ok.stdout, envelope.output);
    assert.equal(ok.truncated, false);
    assert.doesNotMatch(ok.stdout, /chunk_id/);
    const t = createTranscript();
    applyNdjsonChunk(t, text);
    const tool = t.messages.find((m) => m.kind === "tool");
    assert.equal(tool.name, "Shell");
    assert.match(tool.title, /do_statusline2/);
    assert.equal(tool.detail, envelope.command);
    assert.equal(tool.result.stdout, envelope.output);
    assert.equal(tool.result.exitCode, 0);
    assert.equal(tool.status, "done");
  });
});

describe("loop-raw Muse token budget metering", () => {
  it("finds no usage in thin exec --json stdout", () => {
    const u = extractUsageFromRaw(thinFixture);
    assert.equal(u.found, false);
  });

  it("sums model_completed input+output+reasoning across steps", () => {
    const rec = (seq, usage) =>
      JSON.stringify({
        schema_version: 1,
        stream: { kind: "session", id: "sess-usage" },
        sequence: seq,
        recorded_at: 1788599595000000,
        payload_type: "runtime.session",
        payload: {
          kind: "run",
          run_id: "run-1",
          event: { kind: "model_completed", usage },
        },
      });
    const text = [
      rec(1, { input_tokens: 100, output_tokens: 10, reasoning_tokens: 5, cached_tokens: 80, cache_read_tokens: 80 }),
      rec(2, { input_tokens: 200, output_tokens: 20, reasoning_tokens: 1, cached_tokens: 150, cache_read_tokens: 150 }),
    ].join("\n");
    const u = extractUsageFromRaw(text);
    assert.equal(u.found, true);
    assert.equal(u.total, 336);
    assert.equal(u.breakdown.inputTokens, 300);
    assert.equal(u.breakdown.cachedTokens, 230);
  });
});
