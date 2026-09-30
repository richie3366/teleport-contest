#!/usr/bin/env node
/** Read ChatGPT plan limits over Codex app-server stdio, without a model turn.
 * https://developers.openai.com/codex/app-server#account-endpoints
 */
import { spawn } from "node:child_process";
import { createInterface } from "node:readline";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const DEFAULT_WINDOW_STOP_PCT = 90;
export const DEFAULT_WEEKLY_STOP_PCT = 95;

export function normalizePlanUsage(result, opts = {}) {
  // Prefer the Codex bucket, not unrelated model-specific buckets.
  const snap = result?.rateLimitsByLimitId?.codex || result?.rateLimits;
  const percent = (window) => typeof window?.usedPercent === "number" && Number.isFinite(window.usedPercent)
    ? window.usedPercent : null;
  const mins = (window) => typeof window?.windowDurationMins === "number" && Number.isFinite(window.windowDurationMins)
    ? window.windowDurationMins : null;
  const windowPct = percent(snap?.primary);
  const weeklyPct = percent(snap?.secondary);
  if (windowPct == null && weeklyPct == null) {
    return { ok: false, error: "Codex account returned no plan usage windows (ChatGPT login required)" };
  }
  const windowStop = Number(opts.windowStop ?? process.env.CODEX_PLAN_WINDOW_STOP_PCT ?? DEFAULT_WINDOW_STOP_PCT);
  const weeklyStop = Number(opts.weeklyStop ?? process.env.CODEX_PLAN_WEEKLY_STOP_PCT ?? DEFAULT_WEEKLY_STOP_PCT);
  if (![windowStop, weeklyStop].every((n) => Number.isFinite(n) && n >= 0 && n <= 100)) {
    return { ok: false, error: "Codex plan thresholds must be percentages from 0 to 100" };
  }
  const overWindow = windowPct != null && windowPct >= windowStop;
  const overWeekly = weeklyPct != null && weeklyPct >= weeklyStop;
  const why = [];
  if (overWindow) why.push(`window ${windowPct}% >= ${windowStop}%`);
  if (overWeekly) why.push(`weekly ${weeklyPct}% >= ${weeklyStop}%`);
  return {
    ok: true,
    windowUsedPercent: windowPct,
    weeklyUsedPercent: weeklyPct,
    windowResetsAt: snap.primary?.resetsAt ?? null,
    weeklyResetsAt: snap.secondary?.resetsAt ?? null,
    windowDurationMins: mins(snap?.primary),
    weeklyDurationMins: mins(snap?.secondary),
    windowStopPct: windowStop,
    weeklyStopPct: weeklyStop,
    overWindow,
    overWeekly,
    shouldStop: overWindow || overWeekly,
    stopReason: why.join(" or ") || null,
    summary: `codex plan: window ${windowPct == null ? "unavailable" : `${windowPct}%`}; weekly ${weeklyPct == null ? "unavailable" : `${weeklyPct}%`}`,
  };
}

export function probePlanUsage(opts = {}) {
  const bin = opts.bin || process.env.CODEX_BIN || "codex";
  const timeoutMs = opts.timeoutMs ?? Number(process.env.CODEX_PLAN_USAGE_TIMEOUT_SEC || 30) * 1000;
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    return Promise.resolve({ ok: false, error: "CODEX_PLAN_USAGE_TIMEOUT_SEC must be positive" });
  }
  return new Promise((resolveResult) => {
    const args = ["app-server"];
    const child = spawn(bin, args, { stdio: ["pipe", "pipe", "pipe"] });
    const lines = createInterface({ input: child.stdout });
    let finished = false;
    let killTimer;
    const finish = (value) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      lines.close();
      child.stdin.end();
      child.kill("SIGTERM");
      killTimer = setTimeout(() => child.kill("SIGKILL"), 1000);
      killTimer.unref();
      resolveResult(value);
    };
    const timer = setTimeout(() => finish({ ok: false, error: "Codex plan-usage probe timed out" }), timeoutMs);
    const send = (message) => {
      try {
        if (!finished) child.stdin.write(JSON.stringify(message) + "\n");
      } catch {
        // Spawn failure surfaces via child 'error'; stdin write may also throw.
      }
    };
    child.stderr.resume();
    child.stdin.on("error", (err) => finish({ ok: false, error: `Codex app-server stdin failed: ${err.message}` }));
    child.on("error", (err) => finish({ ok: false, error: `Codex app-server failed: ${err.message}` }));
    child.on("close", (code) => {
      clearTimeout(killTimer);
      finish({ ok: false, error: `Codex app-server exited before returning plan usage (exit ${code})` });
    });
    lines.on("line", (line) => {
      if (finished) return;
      let message;
      try { message = JSON.parse(line); } catch { return; }
      if (message.id !== 1 && message.id !== 2) return;
      if (message.error) {
        finish({ ok: false, error: `Codex account probe failed: ${message.error.message || "RPC error"}` });
      } else if (message.id === 1 && message.result) {
        send({ method: "initialized", params: {} });
        send({ id: 2, method: "account/rateLimits/read", params: {} });
      } else if (message.id === 2 && message.result) {
        finish(normalizePlanUsage(message.result, opts));
      }
    });
    send({ id: 1, method: "initialize", params: {
      clientInfo: { name: "agent_port_loop_usage", title: "Port loop usage", version: "1.0.0" },
    } });
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await probePlanUsage();
  process.stdout.write(JSON.stringify(result) + "\n");
  process.exitCode = result.ok ? 0 : 2;
}
