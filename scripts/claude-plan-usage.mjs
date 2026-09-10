#!/usr/bin/env node
/**
 * Read Claude Pro/Max plan usage (current session window + weekly %),
 * the same snapshot `claude -p "/usage"` prints.
 *
 * Spawns `claude -p "/usage"` in a throwaway directory (no session
 * persistence). Fail-open if the probe cannot parse percents.
 *
 * Usage:
 *   node scripts/claude-plan-usage.mjs
 * Prints one JSON object on stdout.
 *
 * Env:
 *   CLAUDE_BIN                     default claude
 *   CLAUDE_PLAN_WINDOW_STOP_PCT   default 90
 *   CLAUDE_PLAN_WEEKLY_STOP_PCT    default 95
 *   CLAUDE_PLAN_USAGE_TIMEOUT_SEC default 30
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const DEFAULT_WINDOW_STOP_PCT = 90;
export const DEFAULT_WEEKLY_STOP_PCT = 95;

function stripAnsi(text) {
  if (typeof text !== "string") return "";
  return text
    .replace(/\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)/g, "")
    .replace(/\x1b\[[0-9;?=]*[A-Za-z]/g, "")
    .replace(/\x1b[PX^_][\s\S]*?\x1b\\/g, "")
    .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, "");
}

function resetFromRest(rest) {
  if (typeof rest !== "string") return null;
  const m = rest.match(/resets?\s+(.+?)\s*$/i);
  return m ? m[1].replace(/\s+/g, " ").trim() : null;
}

/**
 * Parse `claude -p "/usage"` print-mode text.
 *
 *   Current session: 0% used · resets Sep 10 at 1:20pm (Europe/Paris)
 *   Current week (all models): 0% used · resets Sep 15 at 6pm (Europe/Paris)
 *
 * Extra `Current week (Opus):` rows take the higher weekly percent.
 * Does not treat "89% of your usage was at >150k context" as a plan bar.
 */
export function parsePlanUsageFromPrint(text) {
  if (typeof text !== "string" || !text) return null;
  const plain = stripAnsi(text);
  let windowPct = null;
  let weeklyPct = null;
  let windowResetsLabel = null;
  let weeklyResetsLabel = null;
  for (const line of plain.split(/\r?\n/)) {
    const session = line.match(
      /^\s*Current\s+session:\s*(\d+(?:\.\d+)?)\s*%\s*used\s*(.*)$/i,
    );
    if (session) {
      windowPct = Number(session[1]);
      windowResetsLabel = resetFromRest(session[2]);
      continue;
    }
    const week = line.match(
      /^\s*Current\s+week(?:\s*\([^)]+\))?:\s*(\d+(?:\.\d+)?)\s*%\s*used\s*(.*)$/i,
    );
    if (week) {
      const n = Number(week[1]);
      if (weeklyPct == null || n > weeklyPct) {
        weeklyPct = n;
        weeklyResetsLabel = resetFromRest(week[2]);
      }
      continue;
    }
    const legacySession = line.match(/^\s*Current\s+(\d+(?:\.\d+)?)\s*%\s*used\b(.*)$/i);
    if (legacySession && windowPct == null && !/week/i.test(line)) {
      windowPct = Number(legacySession[1]);
      windowResetsLabel = resetFromRest(legacySession[2]);
      continue;
    }
    const legacyWeekly = line.match(/^\s*Weekly\s+(\d+(?:\.\d+)?)\s*%\s*used\b(.*)$/i);
    if (legacyWeekly && weeklyPct == null) {
      weeklyPct = Number(legacyWeekly[1]);
      weeklyResetsLabel = resetFromRest(legacyWeekly[2]);
    }
  }
  if (windowPct == null || weeklyPct == null) return null;
  return {
    window: { used_percent: windowPct },
    weekly: { used_percent: weeklyPct },
    windowResetsLabel,
    weeklyResetsLabel,
  };
}

/** @deprecated alias — print-mode is the live source. */
export const parsePlanUsageFromTui = parsePlanUsageFromPrint;

export function normalizePlanUsage(snap, opts = {}) {
  if (!snap || typeof snap !== "object") return { ok: false, error: "no subscription snapshot" };
  const windowPct = Number(snap.window?.used_percent);
  const weeklyPct = Number(snap.weekly?.used_percent);
  if (!Number.isFinite(windowPct) || !Number.isFinite(weeklyPct)) {
    return { ok: false, error: "subscription snapshot missing used_percent" };
  }
  const windowStop = Number(
    opts.windowStop ?? process.env.CLAUDE_PLAN_WINDOW_STOP_PCT ?? DEFAULT_WINDOW_STOP_PCT,
  );
  const weeklyStop = Number(
    opts.weeklyStop ?? process.env.CLAUDE_PLAN_WEEKLY_STOP_PCT ?? DEFAULT_WEEKLY_STOP_PCT,
  );
  const overWindow = windowPct >= windowStop;
  const overWeekly = weeklyPct >= weeklyStop;
  const windowResetText =
    typeof snap.windowResetsLabel === "string" && snap.windowResetsLabel
      ? snap.windowResetsLabel
      : null;
  const weeklyResetText =
    typeof snap.weeklyResetsLabel === "string" && snap.weeklyResetsLabel
      ? snap.weeklyResetsLabel
      : null;
  const shouldStop = overWindow || overWeekly;
  const why = [];
  if (overWindow) why.push(`window ${windowPct}% >= ${windowStop}%`);
  if (overWeekly) why.push(`weekly ${weeklyPct}% >= ${weeklyStop}%`);
  const summary =
    `claude plan: window ${windowPct}%` +
    (windowResetText ? ` (resets ${windowResetText})` : "") +
    `; weekly ${weeklyPct}%` +
    (weeklyResetText ? ` (resets ${weeklyResetText})` : "");
  return {
    ok: true,
    windowUsedPercent: windowPct,
    weeklyUsedPercent: weeklyPct,
    windowResetsLabel: windowResetText,
    weeklyResetsLabel: weeklyResetText,
    windowStopPct: windowStop,
    weeklyStopPct: weeklyStop,
    overWindow,
    overWeekly,
    shouldStop,
    stopReason: why.join(" or ") || null,
    summary,
  };
}

function runPrintUsage() {
  const bin = process.env.CLAUDE_BIN || "claude";
  const timeoutMs = Number(process.env.CLAUDE_PLAN_USAGE_TIMEOUT_SEC || 30) * 1000;
  const workdir = mkdtempSync(join(tmpdir(), "claude-plan-usage-"));
  try {
    return execFileSync(
      bin,
      [
        "-p",
        "--output-format",
        "text",
        "--no-session-persistence",
        "--permission-prompts",
        "none",
        "--",
        "/usage",
      ],
      {
        cwd: workdir,
        encoding: "utf8",
        timeout: timeoutMs,
        stdio: ["ignore", "pipe", "pipe"],
      },
    );
  } finally {
    rmSync(workdir, { recursive: true, force: true });
  }
}

export function probePlanUsage() {
  let stdout = "";
  try {
    stdout = runPrintUsage();
  } catch (err) {
    const extra = err?.stderr ? String(err.stderr).trim().split("\n").at(-1) : "";
    return {
      ok: false,
      error: `claude -p /usage failed: ${err.message || err}${extra ? `: ${extra}` : ""}`,
    };
  }
  const snap = parsePlanUsageFromPrint(stdout);
  if (!snap) {
    return { ok: false, error: "claude -p /usage ran but Current session/week percents were not parsed" };
  }
  return normalizePlanUsage(snap);
}

function main() {
  const result = probePlanUsage();
  process.stdout.write(JSON.stringify(result) + "\n");
  process.exit(result.ok ? 0 : 2);
}

const thisFile = fileURLToPath(import.meta.url);
const invoked = process.argv[1] ? resolve(process.argv[1]) : "";
if (invoked && thisFile === invoked) {
  main();
}
