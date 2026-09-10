import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parsePlanUsageFromPrint, normalizePlanUsage } from "./claude-plan-usage.mjs";

const printMode = `You are currently using your subscription to power your Claude Code usage

Current session: 0% used · resets Sep 10 at 1:20pm (Europe/Paris)
Current week (all models): 0% used · resets Sep 15 at 6pm (Europe/Paris)

What's contributing to your limits usage?
Approximate, based on local sessions on this machine — does not include other devices or claude.ai. Behaviors are independent characteristics, not a breakdown.

Last 7d · 870 requests · 9 sessions
  89% of your usage was at >150k context
`;

describe("claude-plan-usage print-mode parse", () => {
  it("reads Current session / Current week from claude -p /usage", () => {
    const snap = parsePlanUsageFromPrint(printMode);
    assert.equal(snap.window.used_percent, 0);
    assert.equal(snap.weekly.used_percent, 0);
    assert.match(snap.windowResetsLabel, /Sep 10 at 1:20pm/);
    assert.match(snap.weeklyResetsLabel, /Sep 15 at 6pm/);
  });

  it("does not treat the >150k context share as a plan percent", () => {
    const snap = parsePlanUsageFromPrint(printMode);
    assert.equal(snap.window.used_percent, 0);
    assert.equal(snap.weekly.used_percent, 0);
  });

  it("takes the higher Current week row when Opus is listed separately", () => {
    const snap = parsePlanUsageFromPrint(
      [
        "Current session: 12% used · resets Sep 10 at 1:20pm (Europe/Paris)",
        "Current week (all models): 40% used · resets Sep 15 at 6pm (Europe/Paris)",
        "Current week (Opus): 88% used · resets Sep 15 at 6pm (Europe/Paris)",
      ].join("\n"),
    );
    assert.equal(snap.window.used_percent, 12);
    assert.equal(snap.weekly.used_percent, 88);
  });

  it("still reads a legacy Weekly N% used line", () => {
    const snap = parsePlanUsageFromPrint("Current session: 23% used\nWeekly 41% used · resets Mon 12:00am\n");
    assert.equal(snap.window.used_percent, 23);
    assert.equal(snap.weekly.used_percent, 41);
    assert.match(snap.weeklyResetsLabel, /Mon 12:00am/);
  });

  it("returns null without both plan rows", () => {
    assert.equal(parsePlanUsageFromPrint("Current session: 10% used\n"), null);
    assert.equal(parsePlanUsageFromPrint("  89% of your usage was at >150k context\n"), null);
    assert.equal(parsePlanUsageFromPrint(""), null);
  });
});

describe("claude-plan-usage thresholds", () => {
  const snap = parsePlanUsageFromPrint(printMode);

  it("does not stop at 0% / 0% with default 90 / 95", () => {
    const u = normalizePlanUsage(snap, { windowStop: 90, weeklyStop: 95 });
    assert.equal(u.ok, true);
    assert.equal(u.shouldStop, false);
    assert.match(u.summary, /window 0%/);
    assert.match(u.summary, /weekly 0%/);
    assert.match(u.summary, /1:20pm/);
  });

  it("stops when window >= 90", () => {
    const u = normalizePlanUsage(
      { window: { used_percent: 90 }, weekly: { used_percent: 10 } },
      { windowStop: 90, weeklyStop: 95 },
    );
    assert.equal(u.shouldStop, true);
    assert.equal(u.overWindow, true);
    assert.equal(u.stopReason, "window 90% >= 90%");
  });

  it("stops when weekly >= 95", () => {
    const u = normalizePlanUsage(
      { window: { used_percent: 1 }, weekly: { used_percent: 95 } },
      { windowStop: 90, weeklyStop: 95 },
    );
    assert.equal(u.shouldStop, true);
    assert.equal(u.overWeekly, true);
  });

  it("stops if either threshold is hit", () => {
    const u = normalizePlanUsage(
      { window: { used_percent: 90 }, weekly: { used_percent: 95 } },
      { windowStop: 90, weeklyStop: 95 },
    );
    assert.equal(u.shouldStop, true);
    assert.match(u.stopReason, /window 90%/);
    assert.match(u.stopReason, /weekly 95%/);
  });
});
