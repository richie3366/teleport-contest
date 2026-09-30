#!/usr/bin/env node
/** Add receive times and prompt metadata missing from codex exec JSONL. */
import { readFileSync } from "node:fs";
import { createInterface } from "node:readline";

const emit = (event) => process.stdout.write(JSON.stringify({ timestamp_ms: Date.now(), ...event }) + "\n");
emit({ type: "system", subtype: "init", model: process.argv[2] || "Codex configured default" });
emit({ type: "user", message: { content: [{ type: "text", text: readFileSync(process.argv[3], "utf8") }] } });
for await (const line of createInterface({ input: process.stdin, crlfDelay: Infinity })) {
  try {
    const event = JSON.parse(line);
    if (event && typeof event === "object" && !Array.isArray(event)) emit(event);
    else process.stdout.write(line + "\n");
  } catch {
    process.stdout.write(line + "\n");
  }
}
