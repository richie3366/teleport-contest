#!/usr/bin/env node
/**
 * Human extract and approval-denial scan over an iteration `.raw`.
 * Understands Cursor stream-json and Muse exec --json (via loop-raw.mjs).
 *
 *   node scripts/extract-agent-log.mjs <raw> <out-log>
 *   node scripts/extract-agent-log.mjs --denials <raw>
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { extractHumanLog, scanToolDenials } from "./loop-raw.mjs";

const args = process.argv.slice(2);
if (args[0] === "--denials") {
  const path = args[1];
  if (!path || !existsSync(path)) process.exit(0);
  const { denials, stats } = scanToolDenials(readFileSync(path, "utf8"));
  console.error(`tools ok=${stats.ok} err=${stats.err} completed=${stats.completed}/${stats.started}`);
  if (denials.length) {
    console.log(denials.join("\n"));
    process.exit(2);
  }
  process.exit(0);
}

const [rawPath, outPath] = args;
if (!rawPath || !outPath) {
  console.error("usage: node scripts/extract-agent-log.mjs <raw> <out-log>");
  process.exit(2);
}
const raw = existsSync(rawPath) ? readFileSync(rawPath, "utf8") : "";
writeFileSync(outPath, extractHumanLog(raw));
