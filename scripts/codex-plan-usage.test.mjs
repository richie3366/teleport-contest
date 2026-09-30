import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { normalizePlanUsage, probePlanUsage } from "./codex-plan-usage.mjs";

const snapshot = (windowPct, weeklyPct, windowMins = 300, weeklyMins = 10080) => ({ rateLimits: {
  primary: windowPct == null ? null : { usedPercent: windowPct, resetsAt: 12345, windowDurationMins: windowMins },
  secondary: weeklyPct == null ? null : { usedPercent: weeklyPct, resetsAt: 54321, windowDurationMins: weeklyMins },
} });

describe("Codex plan usage", () => {
  it("uses configurable window/weekly thresholds and reset times", () => {
    const u = normalizePlanUsage(snapshot(90, 94), { windowStop: 90, weeklyStop: 95 });
    assert.equal(u.ok, true);
    assert.equal(u.shouldStop, true);
    assert.equal(u.windowResetsAt, 12345);
    assert.equal(u.weeklyResetsAt, 54321);
    assert.equal(u.windowDurationMins, 300);
    assert.equal(u.weeklyDurationMins, 10080);
    assert.equal(u.overWeekly, false);
    assert.equal(normalizePlanUsage(snapshot(89, 95)).overWeekly, true);
    assert.equal(normalizePlanUsage(snapshot(89, 94)).shouldStop, false);
    assert.equal(normalizePlanUsage(snapshot(50, 60), { windowStop: 50, weeklyStop: 80 }).shouldStop, true);
  });

  it("accepts a missing secondary window without treating null as zero", () => {
    const u = normalizePlanUsage(snapshot(25, null));
    assert.equal(u.ok, true);
    assert.equal(u.weeklyUsedPercent, null);
    assert.equal(u.weeklyDurationMins, null);
    assert.equal(u.shouldStop, false);
    assert.equal(normalizePlanUsage(snapshot(null, 99)).shouldStop, true);
    assert.equal(normalizePlanUsage(snapshot(null, null)).ok, false);
    assert.equal(normalizePlanUsage(snapshot(20, 30), { windowStop: NaN }).ok, false);
    assert.equal(normalizePlanUsage(snapshot(20, 30), { windowStop: 101 }).ok, false);
    assert.equal(normalizePlanUsage(snapshot(20, 30), { weeklyStop: -1 }).ok, false);
    assert.equal(normalizePlanUsage(snapshot(20, 30), { windowStop: 0, weeklyStop: 100 }).ok, true);
  });

  it("prefers the Codex bucket to unrelated exhausted buckets", () => {
    const result = { ...snapshot(100, 100), rateLimitsByLimitId: {
      codex: snapshot(25, 30).rateLimits, other: snapshot(100, 100).rateLimits,
    } };
    assert.equal(normalizePlanUsage(result).shouldStop, false);
    assert.equal(normalizePlanUsage(result).windowUsedPercent, 25);
  });

  async function mockProbe(source, opts = {}) {
    const dir = mkdtempSync(join(tmpdir(), "codex-usage-test-"));
    const bin = join(dir, "codex");
    writeFileSync(bin, `#!${process.execPath}\n${source}`, { mode: 0o755 });
    try { return await probePlanUsage({ bin, timeoutMs: 2000, ...opts }); }
    finally { rmSync(dir, { recursive: true, force: true }); }
  }

  it("performs initialize/initialized/read over stdio without a model turn", async () => {
    const u = await mockProbe(`
      const readline = require('node:readline');
      if (process.argv.slice(2).join(' ') !== 'app-server') process.exit(3);
      let initialized = false;
      const send = o => process.stdout.write(JSON.stringify(o) + '\\n');
      readline.createInterface({input:process.stdin}).on('line', line => {
        const m = JSON.parse(line);
        if (m.method === 'initialize') send({id:m.id,result:{userAgent:'test'}});
        else if (m.method === 'initialized') initialized = true;
        else if (m.method === 'account/rateLimits/read' && initialized) {
          send({method:'account/rateLimits/updated',params:{}});
          send({id:m.id,result:${JSON.stringify(snapshot(42, 99))}});
        } else process.exit(4);
      });
    `);
    assert.equal(u.ok, true, u.error);
    assert.equal(u.windowUsedPercent, 42);
    assert.equal(u.shouldStop, true);
  });

  it("fails open on RPC errors, missing binary, early exit, or timeout", async () => {
    const rpc = await mockProbe(`process.stdin.on('data', () => console.log(JSON.stringify({id:1,error:{message:'not signed in'}})));`);
    assert.equal(rpc.ok, false);
    assert.match(rpc.error, /not signed in/);
    const missing = await probePlanUsage({ bin: "/tmp/codex-missing-binary", timeoutMs: 1000 });
    assert.equal(missing.ok, false);
    const exit = await mockProbe("process.exit(3);");
    assert.equal(exit.ok, false);
    assert.match(exit.error, /exit 3/);
    const timeout = await mockProbe("setInterval(() => {}, 1000);", { timeoutMs: 100 });
    assert.equal(timeout.ok, false);
    assert.match(timeout.error, /timed out/);
    assert.equal((await probePlanUsage({ timeoutMs: NaN })).ok, false);
  });
});
