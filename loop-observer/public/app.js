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
let ws;

thread.addEventListener("scroll", () => {
  const gap = thread.scrollHeight - thread.scrollTop - thread.clientHeight;
  scrollFollow = gap < 80;
  els.jump.hidden = scrollFollow;
});
els.jumpBtn.addEventListener("click", () => {
  scrollFollow = true;
  thread.scrollTop = thread.scrollHeight;
  els.jump.hidden = true;
});

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

function fmtTokens(n) {
  if (n == null) return "—";
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
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
  if (scroll && following && !wasFollowing) {
    scrollFollow = true;
    thread.scrollTop = thread.scrollHeight;
    els.jump.hidden = true;
  }
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
  const bits = [];
  if (meta.model) bits.push(meta.model);
  const el = elapsed();
  if (el != null) bits.push(fmtDur(el));
  if (meta.bytes) bits.push(`${(meta.bytes / 1024).toFixed(0)} KB`);
  if (meta.usage?.total) bits.push(`${fmtTokens(meta.usage.total)} tokens`);
  if (meta.eventCount) bits.push(`${meta.eventCount} events`);
  els.meta.textContent = bits.join("  ·  ");
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
  sum.textContent = thinkLabel(msg);
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
    if (r.rows?.length) {
      bits.push(r.rows.map((x) => `${x.file}:${x.line}: ${x.text}`).join("\n"));
    } else if (r.preview) bits.push(r.preview);
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

function renderTool(msg) {
  if (msg.name === "Edit" || msg.name === "Write") return renderDiff(msg);
  const { row, bubble } = rowShell(msg.id, "tool", { avatar: false });
  const d = document.createElement("details");
  d.className = "tool";
  const sum = document.createElement("summary");
  const name = document.createElement("span");
  name.className = "tool-name";
  name.textContent = msg.name || "Tool";
  const title = document.createElement("span");
  title.className = "tool-title";
  title.textContent = msg.title || "";
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
  sum.append(name, title, badge);
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
  sum.textContent = thinkLabel(msg);
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
  if (details && wasOpen != null) details.open = wasOpen || msg.status === "running";
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
  meta = data.meta || {};
  renderPicker();
  renderMeta();
  scrollFollow = following;
  replaceAll(data.messages);
  if (Array.isArray(data.messages)) data.messages.length = 0;
  if (!following) {
    thread.scrollTop = 0;
    els.jump.hidden = true;
  } else {
    thread.scrollTop = thread.scrollHeight;
    els.jump.hidden = true;
  }
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
}, 1000);
ensureEmpty();
