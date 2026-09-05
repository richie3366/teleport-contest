#!/usr/bin/env node
/**
 * Sum token usage from a Cursor agent stream-json / json raw log,
 * or a Muse `exec --json` session log.
 * Cursor: every numeric field on the last `type:result` usage object.
 * Muse: on-disk session.jsonl, summed `model_completed` input+output+reasoning
 * (stdout `.raw` has no usage events).
 *
 * Usage: node scripts/extract-agent-usage.mjs <raw-or-jsonl-path>
 * Prints: {"found":bool,"total":number,"breakdown":{...}}
 */
import { existsSync } from "node:fs";
import { extractUsageFromPath } from "./loop-raw.mjs";

const path = process.argv[2];
if (!path || !existsSync(path)) {
  process.stdout.write(JSON.stringify({ found: false, total: 0, breakdown: {} }));
  process.exit(0);
}

process.stdout.write(JSON.stringify(extractUsageFromPath(path)));
