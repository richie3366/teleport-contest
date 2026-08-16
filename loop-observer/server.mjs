#!/usr/bin/env node
/**
 * Local loop-iter observer: HTTP UI + WebSocket, watches .agent-port-loop-logs/*.raw
 * Bind 127.0.0.1 on an ephemeral port (OS-assigned first free).
 *
 *   npm run observe-loop
 *   node loop-observer/server.mjs [--no-open]
 */
import http from "node:http";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { createTranscript, resetTranscript, applyNdjsonChunk, publicSnapshot } from "./parse.mjs";
import { upgradeWebSocket } from "./ws.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");
const PUBLIC = path.join(HERE, "public");
const LOG_DIR = path.join(ROOT, ".agent-port-loop-logs");
const ITER_COUNT = path.join(LOG_DIR, "iteration-count");
const NO_OPEN = process.argv.includes("--no-open");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json; charset=utf-8",
};

const clients = new Set();
const transcript = createTranscript();
let leftover = "";
let fileOffset = 0;
let currentRel = null;
let currentAbs = null;
let followLive = true;
let liveHint = { iter: null, name: null };
let recent = [];
let pollTimer = null;
let dirWatcher = null;

function send(conn, obj) {
  conn.send(JSON.stringify(obj));
}

function broadcast(obj) {
  const json = JSON.stringify(obj);
  for (const c of clients) {
    if (c.alive) c.send(json);
    else clients.delete(c);
  }
}

function viewState() {
  return {
    following: followLive,
    live: liveHint,
    recent,
  };
}

function snapshotPayload() {
  return { op: "snapshot", ...publicSnapshot(transcript), ...viewState() };
}

function resolveNamed(name) {
  if (!name || typeof name !== "string") return null;
  if (!/^iter-\d{4,}-[0-9A-Za-z._-]+\.raw$/.test(name)) return null;
  const abs = path.resolve(LOG_DIR, name);
  const root = path.resolve(LOG_DIR);
  if (abs !== path.join(root, name)) return null;
  if (!fs.existsSync(abs)) return null;
  const m = name.match(/^iter-(\d+)-(.+)\.raw$/);
  return { name, iter: Number(m[1]), stamp: m[2], abs };
}

async function refreshCatalog() {
  const raws = await listRaws();
  recent = raws.slice(-10).reverse().map((r) => ({
    iter: r.iter,
    stamp: r.stamp,
    name: r.name,
  }));
  const live = await pickCurrentRaw(raws);
  liveHint = live
    ? { iter: live.iter, name: live.name }
    : { iter: null, name: null };
  return live;
}

async function listRaws() {
  try {
    const names = await fsp.readdir(LOG_DIR);
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
  } catch {
    return [];
  }
}

async function readIterCount() {
  try {
    const t = (await fsp.readFile(ITER_COUNT, "utf8")).trim();
    const n = Number(t);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

async function latestMasterMode(iter) {
  try {
    const names = (await fsp.readdir(LOG_DIR)).filter((n) => /^loop-.+\.log$/.test(n));
    if (!names.length) return null;
    names.sort();
    const abs = path.join(LOG_DIR, names[names.length - 1]);
    const st = await fsp.stat(abs);
    const size = st.size;
    const fh = await fsp.open(abs, "r");
    const take = Math.min(size, 256_000);
    const buf = Buffer.alloc(take);
    await fh.read(buf, 0, take, Math.max(0, size - take));
    await fh.close();
    const text = buf.toString("utf8");
    if (iter != null) {
      const re = new RegExp(
        String.raw`=== iteration ${iter} starting \(global #${iter} mode=(\w+)\) ===`,
      );
      const m = text.match(re);
      if (m) return m[1];
    }
    const all = [...text.matchAll(/=== iteration (\d+) starting \(global #\d+ mode=(\w+)\) ===/g)];
    const hit =
      (iter != null && all.findLast?.((x) => Number(x[1]) === iter)) ||
      all.filter((x) => Number(x[1]) === iter).pop() ||
      all[all.length - 1];
    return hit ? hit[2] : null;
  } catch {
    return null;
  }
}

async function pickCurrentRaw(raws) {
  raws = raws || (await listRaws());
  if (!raws.length) return null;
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

async function switchTo(file) {
  leftover = "";
  fileOffset = 0;
  currentRel = file?.name ?? null;
  currentAbs = file?.abs ?? null;
  resetTranscript(transcript, {
    iter: file?.iter ?? null,
    stamp: file?.stamp ?? null,
    file: currentAbs,
    relFile: currentRel,
    running: true,
  });
  if (file) {
    transcript.meta.mode = await latestMasterMode(file.iter);
    await ingestFromOffset(true);
  } else {
    broadcast(snapshotPayload());
  }
}

async function ingestFromOffset(isReset) {
  if (!currentAbs) return;
  let st;
  try {
    st = await fs.promises.stat(currentAbs);
  } catch {
    return;
  }
  transcript.meta.bytes = st.size;
  if (st.size < fileOffset) {
    leftover = "";
    fileOffset = 0;
    resetTranscript(transcript, {
      ...transcript.meta,
      eventCount: 0,
      parseErrors: 0,
      running: true,
    });
    isReset = true;
  }
  if (st.size === fileOffset) {
    maybeFinishIdle(st);
    return;
  }
  const fh = await fsp.open(currentAbs, "r");
  const need = st.size - fileOffset;
  const buf = Buffer.alloc(need);
  await fh.read(buf, 0, need, fileOffset);
  await fh.close();
  fileOffset = st.size;
  const text = leftover + buf.toString("utf8");
  const lastNl = text.lastIndexOf("\n");
  if (lastNl < 0) {
    leftover = text;
    maybeFinishIdle(st);
    if (isReset) broadcast(snapshotPayload());
    return;
  }
  leftover = text.slice(lastNl + 1);
  const chunk = text.slice(0, lastNl + 1);
  const changed = applyNdjsonChunk(transcript, chunk);
  transcript.meta.bytes = st.size;
  if (transcript.meta.resultOk == null && !transcript.messages.some((m) => m.kind === "result")) {
    transcript.meta.running = true;
  }
  if (isReset) {
    broadcast(snapshotPayload());
  } else if (changed.length) {
    broadcast({ op: "upsert", meta: transcript.meta, messages: changed, ...viewState() });
  }
}

function maybeFinishIdle(st) {
  const hasResult = transcript.messages.some((m) => m.kind === "result");
  if (hasResult) transcript.meta.running = false;
  else if (Date.now() - st.mtimeMs > 120_000) transcript.meta.running = false;
}

let ticking = false;
let lastViewSent = "";
function viewFingerprint() {
  return [
    followLive ? "1" : "0",
    liveHint.name || "",
    transcript.meta.running ? "1" : "0",
    recent.map((r) => r.name).join(","),
  ].join("|");
}

function broadcastMeta() {
  lastViewSent = viewFingerprint();
  broadcast({ op: "meta", meta: transcript.meta, ...viewState() });
}

async function tick() {
  if (ticking) return;
  ticking = true;
  try {
    const live = await refreshCatalog();
    if (followLive) {
      if (!live) {
        if (currentAbs) await switchTo(null);
        else if (lastViewSent !== viewFingerprint()) broadcastMeta();
        return;
      }
      if (live.abs !== currentAbs) {
        await switchTo(live);
        lastViewSent = viewFingerprint();
        return;
      }
    } else if (!currentAbs) {
      if (lastViewSent !== viewFingerprint()) broadcastMeta();
      return;
    }
    await ingestFromOffset(false);
    if (transcript.meta.mode == null && transcript.meta.iter) {
      transcript.meta.mode = await latestMasterMode(transcript.meta.iter);
    }
    if (lastViewSent !== viewFingerprint()) broadcastMeta();
  } finally {
    ticking = false;
  }
}

async function handleClientOp(data) {
  while (ticking) await new Promise((r) => setTimeout(r, 15));
  ticking = true;
  try {
    if (data?.op === "live") {
      followLive = true;
      const live = await refreshCatalog();
      if (!live) {
        await switchTo(null);
        return;
      }
      if (live.abs !== currentAbs) await switchTo(live);
      else broadcastMeta();
      lastViewSent = viewFingerprint();
      return;
    }
    if (data?.op === "open") {
      const file = resolveNamed(data.name);
      if (!file) return;
      followLive = false;
      await refreshCatalog();
      if (file.abs !== currentAbs) await switchTo(file);
      else broadcastMeta();
      lastViewSent = viewFingerprint();
    }
  } finally {
    ticking = false;
  }
}

function watchLogs() {
  const arm = () => {
    if (dirWatcher) {
      try {
        dirWatcher.close();
      } catch {
        /* ignore */
      }
      dirWatcher = null;
    }
    if (!fs.existsSync(LOG_DIR)) return;
    try {
      dirWatcher = fs.watch(LOG_DIR, { persistent: true }, () => {
        tick().catch(() => {});
      });
    } catch {
      /* poll fallback */
    }
  };
  arm();
  if (!pollTimer) {
    pollTimer = setInterval(() => {
      if (!dirWatcher && fs.existsSync(LOG_DIR)) arm();
      tick().catch(() => {});
    }, 250);
  }
}

function servePublic(req, res) {
  const url = new URL(req.url || "/", "http://127.0.0.1");
  let rel = decodeURIComponent(url.pathname);
  if (rel === "/") rel = "/index.html";
  if (rel.includes("..")) {
    res.writeHead(400);
    res.end("bad path");
    return;
  }
  const abs = path.join(PUBLIC, rel.replace(/^\//, ""));
  if (!abs.startsWith(PUBLIC)) {
    res.writeHead(403);
    res.end("forbidden");
    return;
  }
  fs.readFile(abs, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("not found");
      return;
    }
    const ext = path.extname(abs);
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(data);
  });
}

async function listRecentForApi() {
  const raws = await listRaws();
  return raws.slice(-40).reverse().map((r) => ({
    iter: r.iter,
    stamp: r.stamp,
    name: r.name,
  }));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", "http://127.0.0.1");
  if (url.pathname === "/api/recent") {
    listRecentForApi()
      .then((items) => {
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
        res.end(JSON.stringify({ items, current: currentRel, following: followLive, live: liveHint }));
      })
      .catch(() => {
        res.writeHead(500);
        res.end("{}");
      });
    return;
  }
  servePublic(req, res);
});

server.on("upgrade", (req, socket, head) => {
  const url = new URL(req.url || "/", "http://127.0.0.1");
  if (url.pathname !== "/ws") {
    socket.destroy();
    return;
  }
  const conn = upgradeWebSocket(req, socket, head);
  if (!conn) return;
  clients.add(conn);
  conn.onClose = () => clients.delete(conn);
  conn.onMessage = (text) => {
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return;
    }
    handleClientOp(data).catch(() => {});
  };
  send(conn, snapshotPayload());
});

setInterval(() => {
  for (const c of clients) {
    if (c.alive) c.ping();
    else clients.delete(c);
  }
}, 20000).unref();

server.listen(0, "127.0.0.1", () => {
  const { port } = server.address();
  const href = `http://127.0.0.1:${port}/`;
  console.log(`Loop observer: ${href}`);
  console.log(`Watching ${LOG_DIR}`);
  watchLogs();
  tick().catch((err) => console.error(err));
  if (!NO_OPEN) openBrowser(href);
});

function openBrowser(href) {
  const plat = process.platform;
  try {
    if (plat === "darwin") spawn("open", [href], { stdio: "ignore", detached: true }).unref();
    else if (plat === "win32") spawn("cmd", ["/c", "start", "", href], { stdio: "ignore", detached: true }).unref();
    else spawn("xdg-open", [href], { stdio: "ignore", detached: true }).unref();
  } catch {
    /* ignore */
  }
}

function shutdown() {
  if (pollTimer) clearInterval(pollTimer);
  if (dirWatcher) {
    try {
      dirWatcher.close();
    } catch {
      /* ignore */
    }
  }
  for (const c of clients) c.close();
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 500).unref();
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
