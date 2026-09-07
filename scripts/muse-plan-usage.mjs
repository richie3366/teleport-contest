#!/usr/bin/env node
/**
 * Read Meta Muse plan usage (current window + weekly %), the same
 * panel interactive TUI `/usage` shows.
 *
 * Spawns `muse` in a throwaway PTY, types `/usage`, reads the pane,
 * then Ctrl-C. Does not POST to api.meta.ai from this repo.
 *
 * Usage:
 *   node scripts/muse-plan-usage.mjs
 * Prints one JSON object on stdout.
 *
 * Env:
 *   MUSE_BIN                      default muse
 *   MUSE_PLAN_WINDOW_STOP_PCT     default 97
 *   MUSE_PLAN_WEEKLY_STOP_PCT     default 99
 *   MUSE_PLAN_USAGE_TIMEOUT_SEC   default 50 (TUI helper)
 */
import { spawn } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const DEFAULT_WINDOW_STOP_PCT = 97;
export const DEFAULT_WEEKLY_STOP_PCT = 99;

const here = dirname(fileURLToPath(import.meta.url));
export const TUI_HELPER = join(here, "muse-plan-usage-tui.py");

export function stripAnsi(text) {
  if (typeof text !== "string") return "";
  return text
    .replace(/\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)/g, "")
    .replace(/\x1b\[[0-9;?=]*[A-Za-z]/g, "")
    .replace(/\x1b[PX^_][\s\S]*?\x1b\\/g, "")
    .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, "");
}

/** Parse the TUI `/usage` panel (spaces optional: ratatui may collapse). */
export function parsePlanUsageFromTui(text) {
  if (typeof text !== "string" || !text) return null;
  const plain = stripAnsi(text);
  const current = plain.match(/Current\s*(\d+(?:\.\d+)?)%\s*used/i);
  const weekly = plain.match(/Weekly\s*(\d+(?:\.\d+)?)%\s*used/i);
  if (!current || !weekly) return null;
  const windowReset = plain.match(
    /Current\s*\d+(?:\.\d+)?%\s*used[\s·•.\-]*Resets\s*([^\n]*?)(?=\s*Weekly|\s*as\s*of|$)/i,
  );
  const weeklyReset = plain.match(
    /Weekly\s*\d+(?:\.\d+)?%\s*used[\s·•.\-]*Resets\s*([^\n]*?)(?=\s*as\s*of|\s*Session\s*usage|$)/i,
  );
  const trimLabel = (m) => (m ? m[1].replace(/\s+/g, " ").trim() : null);
  return {
    window: { used_percent: Number(current[1]) },
    weekly: { used_percent: Number(weekly[1]) },
    windowResetsLabel: trimLabel(windowReset),
    weeklyResetsLabel: trimLabel(weeklyReset),
  };
}

export function normalizePlanUsage(snap, opts = {}) {
  if (!snap || typeof snap !== "object") return { ok: false, error: "no subscription snapshot" };
  const windowPct = Number(snap.window?.used_percent);
  const weeklyPct = Number(snap.weekly?.used_percent);
  if (!Number.isFinite(windowPct) || !Number.isFinite(weeklyPct)) {
    return { ok: false, error: "subscription snapshot missing used_percent" };
  }
  const windowStop = Number(opts.windowStop ?? process.env.MUSE_PLAN_WINDOW_STOP_PCT ?? DEFAULT_WINDOW_STOP_PCT);
  const weeklyStop = Number(opts.weeklyStop ?? process.env.MUSE_PLAN_WEEKLY_STOP_PCT ?? DEFAULT_WEEKLY_STOP_PCT);
  const overWindow = windowPct >= windowStop;
  const overWeekly = weeklyPct >= weeklyStop;
  const windowResetsAt = Number(snap.window?.resets_at);
  const weeklyResetsAt = Number(snap.weekly?.resets_at);
  const windowDurationMins = Number(snap.window?.window_duration_mins);
  const iso = (sec) =>
    Number.isFinite(sec) ? new Date(sec * 1000).toISOString() : null;
  const windowResetText =
    iso(windowResetsAt) || (typeof snap.windowResetsLabel === "string" ? snap.windowResetsLabel : null);
  const weeklyResetText =
    iso(weeklyResetsAt) || (typeof snap.weeklyResetsLabel === "string" ? snap.weeklyResetsLabel : null);
  const shouldStop = overWindow || overWeekly;
  const why = [];
  if (overWindow) why.push(`window ${windowPct}% >= ${windowStop}%`);
  if (overWeekly) why.push(`weekly ${weeklyPct}% >= ${weeklyStop}%`);
  const summary =
    `muse plan: window ${windowPct}%` +
    (windowResetText ? ` (resets ${windowResetText}` : "") +
    (Number.isFinite(windowDurationMins) ? `, ${windowDurationMins}m window` : "") +
    (windowResetText ? ")" : "") +
    `; weekly ${weeklyPct}%` +
    (weeklyResetText ? ` (resets ${weeklyResetText})` : "");
  return {
    ok: true,
    windowUsedPercent: windowPct,
    weeklyUsedPercent: weeklyPct,
    windowDurationMins: Number.isFinite(windowDurationMins) ? windowDurationMins : null,
    windowResetsAt: Number.isFinite(windowResetsAt) ? windowResetsAt : null,
    weeklyResetsAt: Number.isFinite(weeklyResetsAt) ? weeklyResetsAt : null,
    windowResetsAtIso: iso(windowResetsAt),
    weeklyResetsAtIso: iso(weeklyResetsAt),
    windowResetsLabel: snap.windowResetsLabel ?? null,
    weeklyResetsLabel: snap.weeklyResetsLabel ?? null,
    windowStopPct: windowStop,
    weeklyStopPct: weeklyStop,
    overWindow,
    overWeekly,
    shouldStop,
    stopReason: why.join(" or ") || null,
    summary,
  };
}

function runTuiHelper() {
  return new Promise((resolvePromise) => {
    const child = spawn("python3", [TUI_HELPER], {
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env,
    });
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", (err) => {
      resolvePromise({ ok: false, error: `TUI helper spawn failed: ${err.message}`, stdout, stderr });
    });
    child.on("close", (code) => {
      resolvePromise({ code, stdout, stderr });
    });
  });
}

export async function probePlanUsage() {
  const ran = await runTuiHelper();
  if (ran.error && !ran.stdout) return { ok: false, error: ran.error };
  const snap = parsePlanUsageFromTui(ran.stdout || "");
  if (!snap) {
    return {
      ok: false,
      error:
        ran.code === 0
          ? "TUI /usage ran but Current/Weekly percents were not parsed"
          : `TUI /usage helper exit ${ran.code ?? "?"}${ran.stderr ? `: ${ran.stderr.trim().split("\n").at(-1)}` : ""}`,
    };
  }
  return normalizePlanUsage(snap);
}

async function main() {
  const result = await probePlanUsage();
  process.stdout.write(JSON.stringify(result) + "\n");
  process.exit(result.ok ? 0 : 2);
}

const thisFile = fileURLToPath(import.meta.url);
const invoked = process.argv[1] ? resolve(process.argv[1]) : "";
if (invoked && thisFile === invoked) {
  main();
}
