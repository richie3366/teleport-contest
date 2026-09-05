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
