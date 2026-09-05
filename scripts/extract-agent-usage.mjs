#!/usr/bin/env node
/**
 * Sum token usage from a Cursor agent stream-json / json raw log,
 * or a Muse `exec --json` session log.
 * Cursor: every numeric field on the last `type:result` usage object.
 * Muse: last `cumulative.totalTokens`, else last TokenUsage-shaped object.
 *
 * Usage: node scripts/extract-agent-usage.mjs <raw-or-jsonl-path>
 * Prints: {"found":bool,"total":number,"breakdown":{...}}
 */
import { readFileSync, existsSync } from "node:fs";
import { extractUsageFromRaw } from "./loop-raw.mjs";

const path = process.argv[2];
if (!path || !existsSync(path)) {
  process.stdout.write(JSON.stringify({ found: false, total: 0, breakdown: {} }));
  process.exit(0);
}

process.stdout.write(JSON.stringify(extractUsageFromRaw(readFileSync(path, "utf8"))));
