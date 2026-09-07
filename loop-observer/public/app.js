const thread = document.getElementById("thread");
let col = document.createElement("div");
col.className = "col";
thread.appendChild(col);

const els = {
  file: document.getElementById("file-label"),
  pick: document.getElementById("iter-pick"),
  mode: document.getElementById("mode-pill"),
  live: document.getElementById("live-btn"),
  liveLabel: document.getElementById("live-label"),
  timing: document.getElementById("timing-btn"),
  meta: document.getElementById("meta-bar"),
  jump: document.getElementById("jump"),
  jumpBtn: document.getElementById("jump-btn"),
};

const nodes = new Map();
let scrollFollow = true;
let following = true;
let liveHint = {};
let recent = [];
let meta = {};
let picking = false;
let pickerKey = "";
let viewEpoch = -1;
let lastTokShown = null;
let ws;

let jumping = false;
thread.addEventListener("scroll", () => {
  if (jumping) return;
  const gap = thread.scrollHeight - thread.scrollTop - thread.clientHeight;
  scrollFollow = gap < 80;
  els.jump.hidden = scrollFollow;
});
function jumpToBottom() {
  scrollFollow = true;
  jumping = true;
  thread.scrollTop = thread.scrollHeight;
  els.jump.hidden = true;
  requestAnimationFrame(() => {
    thread.scrollTop = thread.scrollHeight;
    jumping = false;
    const gap = thread.scrollHeight - thread.scrollTop - thread.clientHeight;
    scrollFollow = gap < 80;
    els.jump.hidden = scrollFollow;
  });
}
els.jumpBtn.addEventListener("click", jumpToBottom);

function sendOp(obj) {
  if (ws && ws.readyState === 1) ws.send(JSON.stringify(obj));
}

els.pick.addEventListener("change", () => {
  if (picking) return;
  const name = els.pick.value;
  if (!name) return;
  sendOp({ op: "open", name });
});
els.live.addEventListener("click", () => {
  sendOp({ op: "live" });
});

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderMd(src) {
  const raw = String(src ?? "");
  const chunks = raw.split(/```/);
  let html = "";
  for (let i = 0; i < chunks.length; i++) {
    if (i % 2 === 1) {
      const body = chunks[i];
      const nl = body.indexOf("\n");
      const code = nl >= 0 ? body.slice(nl + 1).replace(/\n$/, "") : body;
      html += `<pre><code>${esc(code)}</code></pre>`;
    } else {
      html += renderBlocks(chunks[i]);
    }
  }
  return html;
}

function renderBlocks(text) {
  const lines = text.split("\n");
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^\s*\|.+\|\s*$/.test(line) && i + 1 < lines.length && /^\s*\|?\s*-+/.test(lines[i + 1])) {
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) {
        rows.push(lines[i]);
        i++;
      }
      out.push(renderTable(rows));
      continue;
    }
    if (/^#{1,3}\s+/.test(line)) {
      const n = line.match(/^#+/)[0].length;
      out.push(`<h${n}>${inline(line.replace(/^#{1,3}\s+/, ""))}</h${n}>`);
      i++;
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^\s*[-*]\s+/, ""))}</li>`);
        i++;
      }
      out.push(`<ul>${items.join("")}</ul>`);
      continue;
    }
    if (line.trim() === "") {
      i++;
      continue;
    }
    const para = [];
    while (i < lines.length && lines[i].trim() !== "" && !/^#{1,3}\s+/.test(lines[i]) && !/^\s*[-*]\s+/.test(lines[i])) {
      para.push(lines[i]);
      i++;
    }
    out.push(`<p>${inline(para.join("\n")).replace(/\n/g, "<br>")}</p>`);
  }
  return out.join("");
}

function renderTable(rows) {
  const cells = (row) =>
    row
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim());
  const head = cells(rows[0]);
  const body = rows.slice(2).filter((r) => !/^\s*\|?\s*-+/.test(r));
  const th = head.map((c) => `<th>${inline(c)}</th>`).join("");
  const tr = body
    .map((r) => `<tr>${cells(r).map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`)
    .join("");
  return `<table><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>`;
}

function inline(s) {
  let t = esc(s);
  t = t.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/(^|[^\*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>");
  return t;
}

function fmtDur(ms) {
  if (ms == null || !Number.isFinite(ms)) return "—";
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m < 60) return `${m}m ${r}s`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

const PREFS_KEY = "loop-observer.show-timings";
/** Muse exec --json stdout uses this frozen recorded_at; session.jsonl is wall-clock. */
const MUSE_STDOUT_SENTINEL_MS = 1_780_531_400_000;

function readLocalShowTimings() {
  try {
    return localStorage.getItem(PREFS_KEY) === "1";
  } catch {
    return false;
  }
}

let showTimings = readLocalShowTimings();

function pad2(n) {
  return String(n).padStart(2, "0");
}

function displayableTs(ms) {
  const n = typeof ms === "number" ? ms : Number(ms);
  if (!Number.isFinite(n) || n <= 0) return null;
  if (Math.abs(n - MUSE_STDOUT_SENTINEL_MS) < 60_000) return null;
  return n;
}

function stampToMs(stamp) {
  const m = String(stamp || "").match(/^(\d{4})(\d{2})(\d{2})-(\d{2})(\d{2})(\d{2})$/);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), Number(m[4]), Number(m[5]), Number(m[6])).getTime();
}

function originMs() {
  return displayableTs(meta.startedAtMs) ?? stampToMs(meta.stamp);
}

/** Offset from iteration start: "00:05", "12:34". Minutes are not wrapped at 60. */
function fmtMmSs(ms) {
  const n = Math.max(0, Math.round(ms / 1000));
  return `${pad2(Math.floor(n / 60))}:${pad2(n % 60)}`;
}

/** How long the card ran: "12s", "12m34s", "1h02m03s". */
function fmtTook(ms) {
  if (ms == null || !Number.isFinite(ms) || ms < 0) return "";
  const s = Math.round(ms / 1000);
  const sec = s % 60;
  const mTotal = Math.floor(s / 60);
  const min = mTotal % 60;
  const h = Math.floor(mTotal / 60);
  if (h) return `${h}h${pad2(min)}m${pad2(sec)}s`;
  if (mTotal) return `${mTotal}m${pad2(sec)}s`;
  return `${s}s`;
}

function timingText(msg, now = Date.now()) {
  const start = displayableTs(msg.ts);
  const origin = originMs();
  if (start == null || origin == null) return "";
  const clock = fmtMmSs(start - origin);
  let end = displayableTs(msg.tsEnd);
  if (end == null && msg.status === "running") end = now;
  if (end == null) return clock;
  const took = fmtTook(Math.max(0, end - start));
  return took ? `${clock} for ${took}` : clock;
}

function timingTitle(msg, now = Date.now()) {
  const start = displayableTs(msg.ts);
  const origin = originMs();
  if (start == null || origin == null) return "";
  const clock = fmtMmSs(start - origin);
  let end = displayableTs(msg.tsEnd);
  if (end == null && msg.status === "running") end = now;
  if (end == null) return `${clock} after this iteration started`;
  const took = fmtTook(Math.max(0, end - start));
  return took ? `${clock} after this iteration started, ran ${took}` : `${clock} after this iteration started`;
}

function bindWhen(el, msg) {
  if (!el) return;
  el.dataset.ts = msg.ts != null ? String(msg.ts) : "";
  el.dataset.tsEnd = msg.tsEnd != null ? String(msg.tsEnd) : "";
  el.dataset.status = msg.status || "";
  el.textContent = timingText(msg);
  el.title = timingTitle(msg);
}

function makeWhen(msg) {
  const el = document.createElement("span");
  el.className = "when";
  bindWhen(el, msg);
  return el;
}

function refreshTimings() {
  const now = Date.now();
  for (const row of nodes.values()) {
    const el = row.querySelector(".when");
    if (!el) continue;
    const msg = {
      ts: el.dataset.ts ? Number(el.dataset.ts) : null,
      tsEnd: el.dataset.tsEnd ? Number(el.dataset.tsEnd) : null,
      status: el.dataset.status,
    };
    el.textContent = timingText(msg, now);
    el.title = timingTitle(msg, now);
  }
}

function setShowTimings(on, { notify = true } = {}) {
  showTimings = !!on;
  document.body.classList.toggle("show-timings", showTimings);
  if (els.timing) {
    els.timing.textContent = showTimings ? "Hide timings" : "Show timings";
    els.timing.setAttribute("aria-pressed", showTimings ? "true" : "false");
    els.timing.classList.toggle("on", showTimings);
  }
  try {
    localStorage.setItem(PREFS_KEY, showTimings ? "1" : "0");
  } catch {
    /* ignore */
  }
  if (notify) sendOp({ op: "prefs", showTimings });
  refreshTimings();
}

function adoptPrefs(data) {
  const v = data?.prefs?.showTimings;
  if (typeof v === "boolean") setShowTimings(v, { notify: false });
}

setShowTimings(showTimings, { notify: false });
els.timing.addEventListener("click", () => {
  setShowTimings(!showTimings);
});

function fmtTokens(n) {
  if (n == null) return "—";
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}k`;
  return String(n);
}

function elapsed() {
  if (!meta.startedAtMs) return null;
  const end = meta.running ? Date.now() : meta.endedAtMs || meta.durationMs + meta.startedAtMs;
  if (meta.durationMs != null && !meta.running) return meta.durationMs;
  return Math.max(0, end - meta.startedAtMs);
}

function renderPicker() {
  const cur = meta.relFile || "";
  const items = [...recent];
  if (cur && !items.some((r) => r.name === cur)) {
    items.unshift({ iter: meta.iter, stamp: meta.stamp, name: cur });
  }
  const key = `${following}|${cur}|${liveHint.name || ""}|${items.map((r) => r.name).join("|")}`;
  if (key === pickerKey) return;
  pickerKey = key;
  picking = true;
  els.pick.replaceChildren();
  if (!items.length) {
    const o = document.createElement("option");
    o.value = "";
    o.textContent = "—";
    els.pick.appendChild(o);
    els.pick.disabled = true;
  } else {
    els.pick.disabled = false;
    for (const r of items) {
      const o = document.createElement("option");
      o.value = r.name;
      const liveMark = r.name === liveHint.name ? " · live" : "";
      o.textContent = r.iter != null ? `#${r.iter}${liveMark}` : r.name;
      o.title = r.stamp ? `${r.name}` : r.name;
      els.pick.appendChild(o);
    }
    els.pick.value = cur && items.some((r) => r.name === cur) ? cur : items[0].name;
  }
  picking = false;
}

function applyView(data, { scroll = true } = {}) {
  const wasFollowing = following;
  if (data.following != null) following = data.following;
  if (data.live) liveHint = data.live;
  if (data.recent) recent = data.recent;
  if (scroll && following && !wasFollowing) jumpToBottom();
}

function renderMeta() {
  const liveRun = !!meta.running;
  els.live.classList.toggle("on", following && liveRun);
  els.live.classList.toggle("off", !following || !liveRun);
  els.live.classList.toggle("pinned", !following);
  if (!following) {
    const n = liveHint.iter != null ? `#${liveHint.iter}` : "current";
    els.liveLabel.textContent = `Go live · ${n}`;
    els.live.title = "Resume following the current iteration";
  } else {
    els.liveLabel.textContent = liveRun ? "Live" : "Idle";
    els.live.title = liveRun
      ? "Following the current iteration"
      : "Waiting for the next iteration";
  }
  if (meta.mode) {
    els.mode.hidden = false;
    els.mode.textContent = meta.mode;
  } else {
    els.mode.hidden = true;
  }
  const name = meta.relFile || (meta.file ? meta.file.split("/").pop() : "waiting for logs…");
  els.file.textContent = following || name === "waiting for logs…" ? name : `Retrospect · ${name}`;
  document.title = meta.iter != null ? `Loop #${meta.iter}` : "Loop observer";
  const parts = [];
  const push = (text, className) => {
    if (parts.length) parts.push(document.createTextNode("  ·  "));
    if (className) {
      const s = document.createElement("span");
      s.className = className;
      s.textContent = text;
      parts.push(s);
    } else {
      parts.push(document.createTextNode(text));
    }
  };
  if (meta.model) push(meta.model);
  const el = elapsed();
  if (el != null) push(fmtDur(el));
  if (meta.bytes) push(`${(meta.bytes / 1024).toFixed(0)} KB`);
  if (meta.usage?.total) {
    const n = meta.usage.total;
    const bumped = lastTokShown != null && lastTokShown !== n;
    lastTokShown = n;
    push(
      `${fmtTokens(n)} tokens`,
      "tok" + (liveRun ? " live" : "") + (bumped ? " bump" : ""),
    );
    const b = meta.usage.breakdown || {};
    const bd = Object.entries(b)
      .filter(([, v]) => typeof v === "number")
      .map(([k, v]) => `${k}=${v}`)
      .join(" ");
    els.meta.title = bd ? `tokens: +${n} (${bd})` : `tokens: +${n}`;
  } else {
    lastTokShown = null;
    els.meta.title = "";
  }
  if (meta.eventCount) push(`${meta.eventCount} events`);
  els.meta.replaceChildren(...parts);
  if (showTimings) refreshTimings();
}

function ensureEmpty() {
  if ([...col.children].some((n) => n.dataset.id)) {
    const empty = col.querySelector(".empty");
    if (empty) empty.remove();
    return;
  }
  if (!col.querySelector(".empty")) {
    const d = document.createElement("div");
    d.className = "empty";
    d.textContent = "No iteration log yet. Start the port loop, or pick a recent iter from the header.";
    col.appendChild(d);
  }
}

function rowShell(id, kind, { avatar = true } = {}) {
  const row = document.createElement("div");
  row.className = "msg" + (avatar ? "" : " indent");
  row.dataset.id = id;
  row.dataset.kind = kind;
  const av = document.createElement("div");
  av.className = "av " + (kind === "user" ? "user" : "agent");
  av.textContent = kind === "user" ? "U" : "G";
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  if (avatar) row.appendChild(av);
  row.appendChild(bubble);
  return { row, bubble, av };
}

function renderUser(msg) {
  const { row, bubble, av } = rowShell(msg.id, "user");
  av.textContent = "U";
  const who = document.createElement("div");
  who.className = "who";
  who.textContent = "User";
  const card = document.createElement("div");
  card.className = "user-card";
  const pre = document.createElement("div");
  pre.className = "prompt";
  pre.textContent = msg.text || "";
  card.appendChild(pre);
  const long = (msg.text || "").length > 900 || (msg.text || "").split("\n").length > 12;
  if (long) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "toggle";
    btn.textContent = "Show full prompt";
    btn.addEventListener("click", () => {
      const open = card.classList.toggle("open");
      btn.textContent = open ? "Collapse prompt" : "Show full prompt";
    });
    card.appendChild(btn);
  }
  bubble.append(who, card);
  return row;
}

function renderAssistant(msg) {
  const { row, bubble } = rowShell(msg.id, "assistant");
  const who = document.createElement("div");
  who.className = "who";
  who.textContent = "Agent";
  const md = document.createElement("div");
  md.className = "md";
  md.innerHTML = renderMd(msg.text || "");
  bubble.append(who, md);
  return row;
}

function thinkLabel(msg) {
  if (msg.status === "running") return "Thinking";
  const n = (msg.text || "").trim().split(/\s+/).filter(Boolean).length;
  return n <= 48 ? "Thought briefly" : "Thought";
}

function renderThink(msg) {
  const { row, bubble } = rowShell(msg.id, "thinking", { avatar: false });
  const d = document.createElement("details");
  d.className = "think" + (msg.status === "running" ? " running" : "");
  d.open = msg.status === "running";
  const sum = document.createElement("summary");
  const lab = document.createElement("span");
  lab.className = "think-lab";
  lab.textContent = thinkLabel(msg);
  sum.append(lab, makeWhen(msg));
  const body = document.createElement("div");
  body.className = "body";
  body.textContent = msg.text || "";
  d.append(sum, body);
  bubble.appendChild(d);
  return row;
}

function toolBodyText(msg) {
  const bits = [];
  if (msg.detail) bits.push(msg.detail);
  if (msg.error) bits.push(msg.error);
  const r = msg.result;
  if (r) {
    if (r.lines != null) bits.push(`${r.lines} lines`);
    if (r.matches != null) bits.push(`${r.matches} matches`);
    if (r.files != null) bits.push(`${r.files} files`);
    if (r.added != null || r.removed != null) bits.push(`+${r.added ?? 0} −${r.removed ?? 0}`);
    if (r.exitCode != null) bits.push(`exit ${r.exitCode}`);
    if (r.preview) bits.push(r.preview);
    if (r.rows?.length) {
      bits.push(r.rows.map((x) => `${x.file}:${x.line}: ${x.text}`).join("\n"));
    }
    if (r.stderr) bits.push(r.stderr);
  }
  return bits.filter(Boolean).join("\n\n");
}

const DIFF_PREVIEW = 14;

function extLabel(ext) {
  const e = (ext || "").toLowerCase();
  if (e === "mjs" || e === "cjs" || e === "js" || e === "jsx" || e === "ts") return "JS";
  if (e === "css") return "CSS";
  if (e === "html" || e === "htm") return "HTML";
  if (e === "md") return "MD";
  if (e === "json") return "JSON";
  if (e === "py") return "PY";
  if (e === "sh") return "SH";
  return (e || "FILE").slice(0, 4).toUpperCase();
}

function highlight(code, ext) {
  let s = esc(code);
  const e = (ext || "").toLowerCase();
  if (!/^(js|mjs|cjs|jsx|ts|tsx)$/.test(e)) return s;
  // Keywords before any <span class="…"> injection: a later \bclass\b
  // pass would rewrite the attribute and leak `class="str">` into the text.
  s = s.replace(
    /\b(const|let|var|function|return|import|export|from|async|await|if|else|for|while|class|new|try|catch|throw|typeof|in|of|default|null|undefined|true|false)\b/g,
    '<span class="kw">$1</span>',
  );
  s = s.replace(/(\/\/.*$)/gm, '<span class="cmt">$1</span>');
  s = s.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="cmt">$1</span>');
  s = s.replace(
    /(&quot;(?:\\.|[^&])*?&quot;|&#39;(?:\\.|[^&])*?&#39;|`(?:\\.|[^`])*?`)/g,
    '<span class="str">$1</span>',
  );
  return s;
}

function appendDiffLines(body, lines, ext) {
  for (const line of lines) {
    if (line.kind === "hunk") continue;
    const dl = document.createElement("div");
    dl.className = "dl " + (line.kind || "ctx");
    const g = document.createElement("span");
    g.className = "gutter";
    g.textContent = line.no != null ? String(line.no) : "";
    const sign = document.createElement("span");
    sign.className = "sign";
    sign.textContent = line.kind === "add" ? "+" : line.kind === "del" ? "−" : "";
    const code = document.createElement("code");
    code.innerHTML = highlight(line.text ?? "", ext);
    dl.append(g, sign, code);
    body.appendChild(dl);
  }
}

function renderDiff(msg) {
  const { row, bubble } = rowShell(msg.id, "diff", { avatar: false });
  const r = msg.result || {};
  const file = msg.file || (r.path && r.path.split("/").pop()) || "file";
  const ext = msg.ext || (file.includes(".") ? file.split(".").pop() : "");
  const card = document.createElement("div");
  card.className = "diff-card" + (msg.status === "running" ? " running" : "");
  const head = document.createElement("div");
  head.className = "diff-head";
  const icon = document.createElement("span");
  icon.className = "ftype " + (ext === "mjs" || ext === "cjs" ? "js" : ext || "file");
  icon.textContent = extLabel(ext);
  const name = document.createElement("span");
  name.className = "diff-name";
  name.textContent = file;
  head.append(icon, name);
  const added = r.added ?? 0;
  const removed = r.removed ?? 0;
  if (added) {
    const p = document.createElement("span");
    p.className = "stat plus";
    p.textContent = `+${added}`;
    head.appendChild(p);
  }
  if (removed) {
    const m = document.createElement("span");
    m.className = "stat minus";
    m.textContent = `-${removed}`;
    head.appendChild(m);
  }
  head.appendChild(makeWhen(msg));
  if (msg.status === "running") {
    const sp = document.createElement("span");
    sp.className = "spin";
    head.appendChild(sp);
  }
  const body = document.createElement("div");
  body.className = "diff-body";
  const lines = r.lines || [];
  const collapsed = lines.length > DIFF_PREVIEW;
  appendDiffLines(body, collapsed ? lines.slice(0, DIFF_PREVIEW) : lines, ext);
  if (!lines.length && msg.detail) {
    const dl = document.createElement("div");
    dl.className = "dl ctx";
    dl.textContent = msg.detail;
    body.appendChild(dl);
  }
  card.append(head, body);
  if (collapsed && !r.truncated) {
    const more = document.createElement("button");
    more.type = "button";
    more.className = "diff-more";
    more.textContent = "Show more";
    more.addEventListener("click", () => {
      body.replaceChildren();
      body.classList.add("open");
      appendDiffLines(body, lines, ext);
      more.remove();
    });
    card.appendChild(more);
  }
  bubble.appendChild(card);
  return row;
}

const SHELL_PREVIEW_LINES = 24;

function shellOutputText(msg) {
  const r = msg.result || {};
  return r.stdout || r.preview || "";
}

function appendTermBlock(parent, text, className) {
  const pre = document.createElement("pre");
  pre.className = className;
  pre.textContent = text;
  parent.appendChild(pre);
}

function fillTermBody(body, msg, { full = false } = {}) {
  body.replaceChildren();
  const r = msg.result || {};
  const stdout = shellOutputText(msg);
  const stderr = r.stderr || "";
  const combined = [stdout, stderr].filter(Boolean).join("\n");
  const lines = combined ? combined.split("\n") : [];
  const collapsed = !full && lines.length > SHELL_PREVIEW_LINES;
  if (collapsed) body.classList.remove("open");
  else body.classList.add("open");
  if (collapsed) {
    const slice = lines.slice(0, SHELL_PREVIEW_LINES).join("\n");
    appendTermBlock(body, slice, stdout ? "term-out" : "term-err");
    return true;
  }
  if (stdout) appendTermBlock(body, stdout, "term-out");
  if (stderr) appendTermBlock(body, stderr, "term-err");
  if (!stdout && !stderr) {
    const empty = document.createElement("div");
    empty.className = "term-empty";
    empty.textContent = msg.status === "running" ? "" : msg.error || "(no output)";
    if (empty.textContent) body.appendChild(empty);
  }
  return false;
}

function renderShell(msg) {
  const { row, bubble } = rowShell(msg.id, "tool", { avatar: false });
  const r = msg.result || {};
  const d = document.createElement("details");
  d.className = "tool term" + (msg.status === "running" ? " running" : "") + (msg.status === "error" ? " err" : "");
  const sum = document.createElement("summary");
  const name = document.createElement("span");
  name.className = "tool-name";
  name.textContent = "Shell";
  const title = document.createElement("span");
  title.className = "tool-title";
  title.textContent = msg.title && msg.title !== "Shell" ? msg.title.replace(/^Shell\s+/, "") : "";
  sum.append(name, title, makeWhen(msg));
  if (msg.status === "running") {
    const sp = document.createElement("span");
    sp.className = "spin";
    sum.appendChild(sp);
  } else if (r.exitCode != null) {
    const badge = document.createElement("span");
    badge.className = "term-exit" + (Number(r.exitCode) === 0 ? " ok" : " err");
    badge.textContent = `exit ${r.exitCode}`;
    sum.appendChild(badge);
  } else if (msg.status === "error") {
    const badge = document.createElement("span");
    badge.className = "term-exit err";
    badge.textContent = "error";
    sum.appendChild(badge);
  } else {
    const badge = document.createElement("span");
    badge.className = "badge ok";
    badge.textContent = "done";
    sum.appendChild(badge);
  }
  if (r.ms != null && msg.status !== "running") {
    const ms = document.createElement("span");
    ms.className = "term-ms";
    ms.textContent = Number(r.ms) >= 1000 ? `${(Number(r.ms) / 1000).toFixed(1)}s` : `${Math.round(Number(r.ms))}ms`;
    sum.appendChild(ms);
  }
  d.appendChild(sum);

  const inner = document.createElement("div");
  inner.className = "term-inner";
  const cmd = msg.detail || "";
  if (cmd) {
    const cmdEl = document.createElement("div");
    cmdEl.className = "term-cmd";
    const prompt = document.createElement("span");
    prompt.className = "term-prompt";
    prompt.textContent = "$";
    const code = document.createElement("code");
    code.textContent = cmd;
    cmdEl.append(prompt, code);
    inner.appendChild(cmdEl);
  }

  const body = document.createElement("div");
  body.className = "term-body";
  const stdout = shellOutputText(msg);
  const stderr = r.stderr || "";
  const lineCount = [stdout, stderr].filter(Boolean).join("\n").split("\n").length;
  const needMore = fillTermBody(body, msg, { full: false });
  inner.appendChild(body);
  if (r.truncated) {
    const note = document.createElement("div");
    note.className = "term-trunc";
    const bytes = r.originalBytes != null ? ` · ${r.originalBytes} bytes originally` : "";
    note.textContent = `output truncated${bytes}`;
    inner.appendChild(note);
  }
  if (needMore) {
    const more = document.createElement("button");
    more.type = "button";
    more.className = "diff-more";
    more.textContent = `Show more (${lineCount} lines)`;
    more.addEventListener("click", () => {
      fillTermBody(body, msg, { full: true });
      more.remove();
    });
    inner.appendChild(more);
  }
  d.appendChild(inner);
  bubble.appendChild(d);
  return row;
}

function renderTool(msg) {
  if (msg.name === "Edit" || msg.name === "Write") return renderDiff(msg);
  if (msg.name === "Shell") return renderShell(msg);
  const { row, bubble } = rowShell(msg.id, "tool", { avatar: false });
  const d = document.createElement("details");
  d.className = "tool";
  const sum = document.createElement("summary");
  const name = document.createElement("span");
  name.className = "tool-name";
  name.textContent = msg.name || "Tool";
  const title = document.createElement("span");
  title.className = "tool-title";
  title.textContent = msg.title && msg.title !== msg.name ? msg.title : "";
  const badge = document.createElement("span");
  badge.className = "badge";
  if (msg.status === "running") {
    badge.classList.add("run");
    const sp = document.createElement("span");
    sp.className = "spin";
    badge.appendChild(sp);
  } else if (msg.status === "error") {
    badge.classList.add("err");
    badge.textContent = "error";
  } else {
    badge.classList.add("ok");
    badge.textContent = "done";
  }
  sum.append(name, title, makeWhen(msg), badge);
  const body = document.createElement("div");
  body.className = "body";
  body.textContent = toolBodyText(msg);
  d.append(sum, body);
  bubble.appendChild(d);
  return row;
}

function renderSystem(msg) {
  const row = document.createElement("div");
  row.className = "sys";
  row.dataset.id = msg.id;
  row.textContent = `${msg.title}${msg.status ? " · " + msg.status : ""}`;
  return row;
}

function renderResult(msg) {
  const { row, bubble } = rowShell(msg.id, "result", { avatar: false });
  const box = document.createElement("div");
  box.className = "result " + (msg.ok === false ? "bad" : "ok");
  const parts = [msg.ok === false ? "Iteration failed" : "Iteration finished"];
  if (msg.durationMs != null) parts.push(fmtDur(msg.durationMs));
  if (msg.usage?.total) parts.push(`${fmtTokens(msg.usage.total)} tokens`);
  box.textContent = parts.join("  ·  ");
  bubble.appendChild(box);
  return row;
}

function build(msg) {
  switch (msg.kind) {
    case "user":
      return renderUser(msg);
    case "assistant":
      return renderAssistant(msg);
    case "thinking":
      return renderThink(msg);
    case "tool":
      return renderTool(msg);
    case "system":
      return renderSystem(msg);
    case "result":
      return renderResult(msg);
    default:
      return renderSystem({ id: msg.id, title: msg.kind || "event" });
  }
}

function resetThread() {
  nodes.clear();
  const fresh = document.createElement("div");
  fresh.className = "col";
  col.replaceWith(fresh);
  col = fresh;
}

function patchThinking(row, msg) {
  const d = row.querySelector("details.think");
  const body = row.querySelector(".body");
  const sum = row.querySelector("summary");
  if (!d || !body || !sum) return false;
  body.textContent = msg.text || "";
  const lab = row.querySelector(".think-lab");
  if (lab) lab.textContent = thinkLabel(msg);
  else sum.insertBefore(document.createTextNode(thinkLabel(msg)), sum.firstChild);
  let when = row.querySelector(".when");
  if (!when) {
    when = makeWhen(msg);
    sum.appendChild(when);
  } else {
    bindWhen(when, msg);
  }
  d.classList.toggle("running", msg.status === "running");
  if (msg.status === "running") d.open = true;
  return true;
}

function upsert(msg) {
  const prev = nodes.get(msg.id);
  if (prev && msg.kind === "thinking" && patchThinking(prev, msg)) {
    if (scrollFollow) thread.scrollTop = thread.scrollHeight;
    return;
  }
  const wasOpen = prev?.querySelector("details")?.open;
  const next = build(msg);
  const details = next.querySelector("details");
  if (details && wasOpen != null) {
    const keepRunningOpen = msg.status === "running" && msg.name !== "Shell";
    details.open = wasOpen || keepRunningOpen;
  }
  if (prev && prev.parentNode) prev.replaceWith(next);
  else col.appendChild(next);
  nodes.set(msg.id, next);
  ensureEmpty();
  if (scrollFollow) thread.scrollTop = thread.scrollHeight;
}

function replaceAll(messages) {
  resetThread();
  for (const msg of messages || []) upsert(msg);
  ensureEmpty();
  if (scrollFollow) thread.scrollTop = thread.scrollHeight;
}

function adoptEpoch(data) {
  if (data.epoch != null) viewEpoch = data.epoch;
}

function olderThanView(data) {
  return data.epoch != null && viewEpoch >= 0 && data.epoch < viewEpoch;
}

function wrongView(data) {
  return data.epoch != null && viewEpoch >= 0 && data.epoch !== viewEpoch;
}

function applyClear(data) {
  if (olderThanView(data)) return;
  applyView(data, { scroll: false });
  adoptEpoch(data);
  adoptPrefs(data);
  if (data.meta) meta = data.meta;
  resetThread();
  ensureEmpty();
  renderPicker();
  renderMeta();
}

function applySnapshot(data) {
  if (olderThanView(data)) return;
  applyView(data, { scroll: false });
  adoptEpoch(data);
  adoptPrefs(data);
  meta = data.meta || {};
  renderPicker();
  renderMeta();
  scrollFollow = true;
  replaceAll(data.messages);
  if (Array.isArray(data.messages)) data.messages.length = 0;
  jumpToBottom();
}

function applyUpsert(data) {
  if (wrongView(data)) return;
  applyView(data);
  adoptEpoch(data);
  if (data.meta) meta = data.meta;
  renderPicker();
  renderMeta();
  for (const msg of data.messages || []) upsert(msg);
  if (Array.isArray(data.messages)) data.messages.length = 0;
}

function applyMeta(data) {
  if (wrongView(data)) return;
  applyView(data);
  adoptEpoch(data);
  adoptPrefs(data);
  if (data.meta) meta = data.meta;
  renderPicker();
  renderMeta();
}

let retry = 0;
function connect() {
  const proto = location.protocol === "https:" ? "wss" : "ws";
  ws = new WebSocket(`${proto}://${location.host}/ws`);
  ws.addEventListener("open", () => {
    retry = 0;
  });
  ws.addEventListener("message", (ev) => {
    let data;
    try {
      data = JSON.parse(ev.data);
    } catch {
      return;
    }
    if (data.op === "clear") applyClear(data);
    else if (data.op === "snapshot") applySnapshot(data);
    else if (data.op === "upsert") applyUpsert(data);
    else if (data.op === "meta") applyMeta(data);
  });
  ws.addEventListener("close", () => {
    els.live.classList.remove("on", "pinned");
    els.live.classList.add("off");
    const wait = Math.min(8000, 400 * 2 ** retry++);
    setTimeout(connect, wait);
  });
}

connect();
setInterval(() => {
  if (meta.running) renderMeta();
  else if (showTimings) refreshTimings();
}, 1000);
ensureEmpty();
