#!/usr/bin/env node
/**
 * Terminal view of the unattended port loop. Same transcript parser as
 * the browser observer (loop-observer/parse.mjs). Does not start, stop,
 * or supervise scripts/agent-port-loop.sh.
 *
 *   npm run observe-loop-cli
 *   node loop-observer/cli.mjs [--once] [--list] [--iter N] [--file PATH]
 *
 * Default: follow the live iter (iteration-count, else newest .raw).
 * --once prints the current transcript and exits.
 * --list prints the last 10 iter logs and exits.
 * --iter N pins that global iteration (still follows if the file grows).
 * --file PATH reads one log (repo-relative, or under /tmp).
 * --no-think skips thought lines. --verbose prints assistant text in full
 * and the last lines of shell output.
 */
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createTranscript, resetTranscript, applyNdjsonChunk } from "./parse.mjs";
import { findMuseSessionLog, peekMuseSessionId } from "../scripts/loop-raw.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const LOG_DIR = path.join(ROOT, ".agent-port-loop-logs");
const ITER_COUNT = path.join(LOG_DIR, "iteration-count");
const HALT_FILE = path.join(LOG_DIR, "last-halt-reason.txt");

const args = process.argv.slice(2);
const once = args.includes("--once");
const listOnly = args.includes("--list");
const noThink = args.includes("--no-think");
const verbose = args.includes("--verbose");
const help = args.includes("-h") || args.includes("--help");

function opt(name) {
  const i = args.indexOf(name);
  if (i < 0) return null;
  const v = args[i + 1];
  if (!v || v.startsWith("--")) {
    console.error(`error: ${name} needs a value`);
    process.exit(2);
  }
  return v;
}

const iterPin = opt("--iter");
const fileArg = opt("--file");

if (help) {
  console.log(`Usage: node loop-observer/cli.mjs [options]

Follow the live port-loop iteration in the terminal.

Options:
  --once           Print the current transcript and exit
  --list           Print the last 10 iter logs and exit
  --iter <n>       Pin global iteration n
  --file <path>    Read one .raw or .jsonl (repo-relative, or under /tmp)
  --no-think       Hide thought lines
  --verbose        Full assistant text and a shell-output tail
  -h, --help       Show this help
`);
  process.exit(0);
}

const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code, s) => (useColor ? `\x1b[${code}m${s}\x1b[0m` : s);
const dim = (s) => paint("2", s);
const cyan = (s) => paint("36", s);
const green = (s) => paint("32", s);
const red = (s) => paint("31", s);
const yellow = (s) => paint("33", s);

function rel(p) {
  if (!p) return "";
  const s = String(p);
  const abs = path.isAbsolute(s) ? s : path.resolve(ROOT, s);
  if (abs === "/tmp" || abs.startsWith("/tmp/")) return abs;
  if (abs.startsWith(ROOT + path.sep) || abs === ROOT) return path.relative(ROOT, abs);
  return path.relative(ROOT, abs);
}

function oneLine(s, n = 160) {
  const t = String(s ?? "").replace(/\s+/g, " ").trim();
  if (t.length <= n) return t;
  return t.slice(0, n - 1) + "…";
}

function fmtTokens(n) {
  if (n == null || !Number.isFinite(n)) return "";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M tok`;
  if (n >= 1000) return `${Math.round(n / 1000)}k tok`;
  return `${n} tok`;
}

function fmtDur(ms) {
  if (ms == null || !Number.isFinite(ms)) return "";
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  return `${m}m${String(s % 60).padStart(2, "0")}s`;
}

async function listRaws() {
  let names;
  try {
    names = await fsp.readdir(LOG_DIR);
  } catch {
    return [];
  }
  return names
    .filter((n) => /^iter-\d{4,}-.+\.raw$/.test(n))
    .map((n) => {
      const m = n.match(/^iter-(\d+)-(.+)\.raw$/);
      return {
        name: n,
        iter: m ? Number(m[1]) : 0,
        stamp: m ? m[2] : "",
        abs: path.join(LOG_DIR, n),
      };
    })
    .sort((a, b) => a.iter - b.iter || a.stamp.localeCompare(b.stamp));
}

async function readIterCount() {
  try {
    const n = Number((await fsp.readFile(ITER_COUNT, "utf8")).trim());
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

async function latestMasterMode(iter) {
  try {
    const names = (await fsp.readdir(LOG_DIR)).filter((n) => /^loop-.+\.log$/.test(n)).sort();
    if (!names.length) return null;
    const abs = path.join(LOG_DIR, names[names.length - 1]);
    const st = await fsp.stat(abs);
    const take = Math.min(st.size, 256_000);
    const fh = await fsp.open(abs, "r");
    const buf = Buffer.alloc(take);
    await fh.read(buf, 0, take, Math.max(0, st.size - take));
    await fh.close();
    const text = buf.toString("utf8");
    const all = [...text.matchAll(/=== iteration (\d+) starting \(global #\d+ mode=(\w+)\) ===/g)];
    const hit = all.filter((x) => Number(x[1]) === iter).pop() || (iter == null ? all[all.length - 1] : null);
    return hit ? hit[2] : null;
  } catch {
    return null;
  }
}

async function pickCurrent(raws) {
  if (!raws.length) return null;
  if (iterPin != null) {
    const n = Number(iterPin);
    if (!Number.isInteger(n) || n < 0) {
      console.error("error: --iter must be a non-negative integer");
      process.exit(2);
    }
    const matches = raws.filter((r) => r.iter === n);
    return matches.length ? matches[matches.length - 1] : null;
  }
  const count = await readIterCount();
  if (count != null) {
    const matches = raws.filter((r) => r.iter === count);
    if (matches.length) return matches[matches.length - 1];
  }
  let best = raws[raws.length - 1];
  let bestM = 0;
  for (const r of raws) {
    try {
      const st = await fsp.stat(r.abs);
      if (st.mtimeMs >= bestM) {
        bestM = st.mtimeMs;
        best = r;
      }
    } catch {
      /* skip */
    }
  }
  return best;
}

function resolveFileArg(p) {
  const abs = path.resolve(process.cwd(), p);
  const ok =
    abs === "/tmp" ||
    abs.startsWith("/tmp/") ||
    abs === ROOT ||
    abs.startsWith(ROOT + path.sep);
  if (!ok) {
    console.error("error: --file must be inside the repo or under /tmp");
    process.exit(2);
  }
  return abs;
}

const transcript = createTranscript();
const announced = new Map();
let assistantPrinted = new Map();

function toolWhere(msg) {
  const bits = [];
  if (msg.name === "Shell") {
    if (msg.title && !String(msg.title).startsWith("Shell ")) bits.push(msg.title);
    if (msg.detail) bits.push(msg.detail);
  } else if (msg.path) {
    bits.push(msg.path);
  } else if (msg.title && msg.title !== msg.name) {
    bits.push(msg.title);
  }
  const r = msg.result || {};
  if (r.exitCode != null) bits.push(`exit ${r.exitCode}`);
  if (r.added != null || r.removed != null) bits.push(`+${r.added || 0} −${r.removed || 0}`);
  if (r.matches != null) bits.push(`${r.matches} matches`);
  if (r.files != null) bits.push(`${r.files} files`);
  if (r.lines != null && msg.name === "Read") bits.push(`${r.lines} lines`);
  return oneLine(bits.filter(Boolean).join("  "), 200);
}

function emitTool(msg) {
  const key = `${msg.id}:${msg.status}:${toolWhere(msg)}`;
  if (announced.get(msg.id) === key) return;
  const prev = announced.get(msg.id) || "";
  announced.set(msg.id, key);
  const where = toolWhere(msg);
  const name = (msg.name || "Tool").padEnd(7);
  if (msg.status === "error") {
    console.log(`${red("✗")} ${red(name)} ${where}${msg.error ? "  " + oneLine(msg.error, 120) : ""}`);
    return;
  }
  if (msg.status === "done") {
    if (prev.includes(":running") && rQuiet(msg)) return;
    console.log(`${green("✓")} ${cyan(name)} ${where}`);
    if (verbose && msg.name === "Shell") {
      const out = String(msg.result?.stdout || msg.result?.stderr || "").trim();
      if (out) {
        const lines = out.split("\n").slice(-8);
        for (const line of lines) console.log(dim("    " + oneLine(line, 200)));
      }
    }
    return;
  }
  if (prev.includes(":running")) return;
  console.log(`${dim("·")} ${cyan(name)} ${where}`);
}

function rQuiet(msg) {
  const r = msg.result || {};
  return r.exitCode == null && r.added == null && r.removed == null && r.matches == null;
}

function emitThinking(msg) {
  if (noThink) return;
  if (msg.status !== "done") return;
  if (announced.has(msg.id)) return;
  announced.set(msg.id, "done");
  const line = oneLine(msg.text, 200);
  if (line) console.log(`${dim("…")} ${dim(line)}`);
}

function flushAssistant(msg, { forceFull = false } = {}) {
  const text = String(msg.text || "");
  const prev = assistantPrinted.get(msg.id) || 0;
  if (text.length <= prev) return;
  const slice = text.slice(prev);
  assistantPrinted.set(msg.id, text.length);
  const cap = verbose || forceFull ? 80 : 8;
  const lines = slice.split("\n").map((l) => l.trimEnd()).filter((l, i, a) => l.trim() || (i > 0 && i < a.length - 1));
  const show = lines.slice(0, cap);
  for (const line of show) console.log(`  ${oneLine(line, 200)}`);
  if (lines.length > show.length) console.log(dim(`  … ${lines.length - show.length} more lines`));
}

function emitChanged(changed, { finishing = false } = {}) {
  for (const msg of changed) {
    if (!msg) continue;
    if (msg.kind === "user") {
      if (announced.has(msg.id)) continue;
      announced.set(msg.id, "1");
      console.log(dim(`prompt  ${oneLine(msg.text, 140)}`));
    } else if (msg.kind === "thinking") {
      emitThinking(msg);
    } else if (msg.kind === "assistant") {
      if (finishing) flushAssistant(msg);
    } else if (msg.kind === "tool") {
      for (const m of transcript.messages) {
        if (m.kind === "assistant") flushAssistant(m);
      }
      emitTool(msg);
    } else if (msg.kind === "system") {
      if (announced.has(msg.id)) continue;
      announced.set(msg.id, "1");
      console.log(dim(`${msg.title || "task"}${msg.status ? "  " + msg.status : ""}`));
    } else if (msg.kind === "result") {
      for (const m of transcript.messages) {
        if (m.kind === "assistant") flushAssistant(m);
        if (m.kind === "thinking") emitThinking(m);
        if (m.kind === "tool") emitTool(m);
      }
      if (announced.has("result")) continue;
      announced.set("result", "1");
      const parts = [msg.ok === false ? red("iteration failed") : green("iteration finished")];
      const dur = fmtDur(msg.durationMs);
      const tok = fmtTokens(msg.usage?.total);
      if (dur) parts.push(dur);
      if (tok) parts.push(tok);
      console.log(parts.join("  "));
    }
  }
}

function printHeader(file, mode) {
  const bits = [`iter ${file.iter}`];
  if (mode) bits.push(mode);
  if (transcript.meta.model) bits.push(transcript.meta.model);
  bits.push(transcript.meta.running ? "live" : "idle");
  bits.push(rel(file.abs || file.name));
  console.log(cyan(bits.join("  ")));
}

async function peekSession(abs) {
  try {
    const st = await fsp.stat(abs);
    const take = Math.min(st.size, 256_000);
    if (!take) return null;
    const fh = await fsp.open(abs, "r");
    const buf = Buffer.alloc(take);
    await fh.read(buf, 0, take, 0);
    await fh.close();
    const sid = peekMuseSessionId(buf.toString("utf8"));
    return sid ? findMuseSessionLog(sid) : null;
  } catch {
    return null;
  }
}

async function readHalt() {
  try {
    const t = (await fsp.readFile(HALT_FILE, "utf8")).trim();
    return t || null;
  } catch {
    return null;
  }
}

async function openSource(file) {
  announced.clear();
  assistantPrinted = new Map();
  const mode = file.iter != null ? await latestMasterMode(file.iter) : null;
  resetTranscript(transcript, {
    iter: file.iter ?? null,
    stamp: file.stamp ?? null,
    file: file.abs,
    relFile: rel(file.abs),
    running: true,
  });
  let sourceAbs = file.abs;
  if (String(file.abs).endsWith(".raw")) {
    const sess = await peekSession(file.abs);
    if (sess) sourceAbs = sess;
  }
  const source = { abs: sourceAbs, offset: 0, leftover: "" };
  source.mode = mode;
  source.file = file;
  source.headed = false;
  return source;
}

async function ingest(source) {
  let st;
  try {
    st = await fsp.stat(source.abs);
  } catch {
    return false;
  }
  transcript.meta.bytes = st.size;
  if (st.size < source.offset) {
    source.offset = 0;
    source.leftover = "";
  }
  if (st.size === source.offset) {
    const hasResult = transcript.messages.some((m) => m.kind === "result");
    if (hasResult || Date.now() - st.mtimeMs > 120_000) transcript.meta.running = false;
    return false;
  }
  const fh = await fsp.open(source.abs, "r");
  const need = st.size - source.offset;
  const buf = Buffer.alloc(need);
  await fh.read(buf, 0, need, source.offset);
  await fh.close();
  source.offset = st.size;
  const text = source.leftover + buf.toString("utf8");
  const lastNl = text.lastIndexOf("\n");
  if (lastNl < 0) {
    source.leftover = text;
    return false;
  }
  source.leftover = text.slice(lastNl + 1);
  const changed = applyNdjsonChunk(transcript, text.slice(0, lastNl + 1));
  const finishing = transcript.messages.some((m) => m.kind === "result");
  if (finishing) transcript.meta.running = false;
  if (!source.headed && source.file) {
    source.headed = true;
    printHeader(source.file, source.mode);
  }
  emitChanged(changed, { finishing });
  if (!finishing) transcript.meta.running = true;
  return changed.length > 0;
}

async function main() {
  if (listOnly) {
    const raws = await listRaws();
    const count = await readIterCount();
    const last = raws.slice(-10);
    if (!last.length) {
      console.log("no iter logs in .agent-port-loop-logs/");
      return;
    }
    for (const r of last) {
      const mark = count != null && r.iter === count ? "  live" : "";
      console.log(`${String(r.iter).padStart(5)}  ${r.stamp}  ${rel(r.abs)}${mark}`);
    }
    return;
  }

  let file;
  if (fileArg) {
    const abs = resolveFileArg(fileArg);
    if (!fs.existsSync(abs)) {
      console.error(`error: not found: ${rel(abs)}`);
      process.exit(1);
    }
    const base = path.basename(abs);
    const m = base.match(/^iter-(\d+)-(.+)\.raw$/);
    file = { abs, name: base, iter: m ? Number(m[1]) : null, stamp: m ? m[2] : null };
  }

  let source = null;
  let currentAbs = null;
  let toldWaiting = false;

  const tick = async () => {
    if (!fileArg) {
      const raws = await listRaws();
      const next = await pickCurrent(raws);
      if (!next) {
        if (!toldWaiting) {
          toldWaiting = true;
          const count = await readIterCount();
          const halt = await readHalt();
          const bits = ["waiting for .agent-port-loop-logs/iter-*.raw"];
          if (count != null) bits.push(`iteration-count ${count}`);
          console.log(dim(bits.join("  ")));
          if (halt) console.log(yellow(`halt: ${oneLine(halt, 200)}`));
        }
        return;
      }
      toldWaiting = false;
      if (next.abs !== currentAbs) {
        if (currentAbs) console.log("");
        currentAbs = next.abs;
        file = next;
        source = await openSource(file);
      }
    } else if (!source) {
      currentAbs = file.abs;
      source = await openSource(file);
    }
    if (source) await ingest(source);
  };

  await tick();
  if (once) {
    for (const m of transcript.messages) {
      if (m.kind === "assistant") flushAssistant(m);
      if (m.kind === "thinking") emitThinking(m);
      if (m.kind === "tool") emitTool(m);
    }
    return;
  }

  const timer = setInterval(() => {
    tick().catch((err) => {
      console.error(err?.message || err);
    });
  }, 400);
  const stop = () => {
    clearInterval(timer);
    process.exit(0);
  };
  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);
}

main().catch((err) => {
  console.error(err?.stack || err?.message || err);
  process.exit(1);
});
