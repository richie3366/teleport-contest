import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parsePlanUsageFromTui, normalizePlanUsage } from "./muse-plan-usage.mjs";

const pretty = `
Session usage
Cached     0
Output     0
Total      0
Turns         0
Subagents  none
Subscription · Muse Code Power Usage
Current        2% used · Resets at 4:08 AM
Weekly         45% used · Resets Sep 7 at 2:00 AM
as of 1:51 AM
`;

const collapsed =
  "SubagentsnoneSubscription·MuseCodePowerUsageCurrent2%used·Resetsat4:08AMWeekly45%used·ResetsSep7at2:00AMasof1:51AM";

describe("muse-plan-usage TUI parse", () => {
  it("reads Current/Weekly percents from the spaced /usage panel", () => {
    const snap = parsePlanUsageFromTui(pretty);
    assert.equal(snap.window.used_percent, 2);
    assert.equal(snap.weekly.used_percent, 45);
    assert.match(snap.windowResetsLabel, /4:08/);
    assert.match(snap.weeklyResetsLabel, /2:00/);
  });

  it("reads percents when ratatui collapses spaces", () => {
    const snap = parsePlanUsageFromTui(collapsed);
    assert.equal(snap.window.used_percent, 2);
    assert.equal(snap.weekly.used_percent, 45);
    assert.match(snap.windowResetsLabel, /4:08/);
    assert.match(snap.weeklyResetsLabel, /2:00/);
    assert.doesNotMatch(snap.weeklyResetsLabel, /as of|Session|Current/i);
  });

  it("returns null without both plan rows", () => {
    assert.equal(parsePlanUsageFromTui("Session usage\nTotal 0\n"), null);
    assert.equal(parsePlanUsageFromTui(""), null);
  });
});

describe("muse-plan-usage thresholds", () => {
  const snap = parsePlanUsageFromTui(pretty);

  it("does not stop at 2% / 45% with default 97 / 99", () => {
    const u = normalizePlanUsage(snap, { windowStop: 97, weeklyStop: 99 });
    assert.equal(u.ok, true);
    assert.equal(u.shouldStop, false);
    assert.match(u.summary, /window 2%/);
    assert.match(u.summary, /weekly 45%/);
    assert.match(u.summary, /4:08/);
  });

  it("stops when window >= 97", () => {
    const u = normalizePlanUsage(
      { window: { used_percent: 97 }, weekly: { used_percent: 10 } },
      { windowStop: 97, weeklyStop: 99 },
    );
    assert.equal(u.shouldStop, true);
    assert.equal(u.overWindow, true);
    assert.equal(u.stopReason, "window 97% >= 97%");
  });

  it("stops when weekly >= 99", () => {
    const u = normalizePlanUsage(
      { window: { used_percent: 1 }, weekly: { used_percent: 99 } },
      { windowStop: 97, weeklyStop: 99 },
    );
    assert.equal(u.shouldStop, true);
    assert.equal(u.overWeekly, true);
  });

  it("stops if either threshold is hit", () => {
    const u = normalizePlanUsage(
      { window: { used_percent: 97 }, weekly: { used_percent: 99 } },
      { windowStop: 97, weeklyStop: 99 },
    );
    assert.equal(u.shouldStop, true);
    assert.match(u.stopReason, /window 97%/);
    assert.match(u.stopReason, /weekly 99%/);
  });
});
