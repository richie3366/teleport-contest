import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, copyFileSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const here = dirname(fileURLToPath(import.meta.url));
const sh = join(here, "agent-port-loop.sh");
const invoke = (cmd, args, options = {}) => {
  const r = spawnSync(cmd, args, { encoding: "utf8", timeout: 15000, ...options });
  assert.equal(r.error, undefined, r.error?.message);
  return r;
};

describe("port-loop Codex selection", () => {
  it("documents Codex and rejects conflicting CLI/environment selectors before launch", () => {
    const help = invoke("bash", [sh, "--help"]).stdout;
    assert.match(help, /--codex/);
    assert.match(help, /CODEX_REASONING_EFFORT.*max/);
    for (const [args, env] of [
      [["--codex", "--muse"], {}], [["--codex", "--claude"], {}],
      [["--codex"], { LOOP_MUSE: "1" }], [["--claude"], { LOOP_CODEX: "1" }],
    ]) {
      const r = invoke("bash", [sh, ...args], { env: { ...process.env, LOOP_MUSE: "0", LOOP_CLAUDE: "0", LOOP_CODEX: "0", ...env } });
      assert.equal(r.status, 2);
      assert.match(r.stderr, /mutually exclusive/);
    }
  });
});

function sandboxRepo() {
  const root = mkdtempSync(join(tmpdir(), "port-loop-codex-"));
  const put = (name, body, mode) => {
    mkdirSync(dirname(join(root, name)), { recursive: true });
    writeFileSync(join(root, name), body, mode ? { mode } : undefined);
  };
  const files = ["agent-port-loop.sh", "loop-raw.mjs", "codex-loop-stream.mjs", "codex-plan-usage.mjs",
    "extract-agent-usage.mjs", "extract-agent-log.mjs", "loop-resume-brief.mjs", "loop-require-results-pass.mjs"];
  mkdirSync(join(root, "scripts"));
  for (const f of files) copyFileSync(join(here, f), join(root, "scripts", f));
  for (const type of ["", ".continue", ".review", ".cadence"]) put(`scripts/agent-port-loop${type}.prompt.md`, `${type || "port"} test prompt`);
  for (const f of ["strict-output-check.mjs", "archive-loop-queue-done.mjs", "rotate-journal.mjs", "check-hot-docs.mjs"]) put(`scripts/${f}`, "// test gate: no work\n");
  put("scripts/port-did-park.mjs", "process.exit(1);\n");
  put("frozen/ps_test_runner.mjs", 'console.log(\'__RESULTS_JSON__ {"results":[{"passed":true}]}\');\n');
  put("docs/LOOP-QUEUE.md", "## Open\n- [ ] Port fill_zoo\n");
  put("js/fill.js", "export const fill = 0;\n");
  put(".gitignore", ".agent-port-loop-logs/\nSTOP_AGENT_LOOP.md\n");
  put("mock-codex.cjs", `#!${process.execPath}
    const fs = require('node:fs');
    const {spawnSync} = require('node:child_process');
    const args = process.argv.slice(2);
    const logs = '.agent-port-loop-logs';
    fs.mkdirSync(logs, {recursive:true});
    if (args[0] === 'app-server') {
      const readline = require('node:readline');
      const countFile = logs + '/probes';
      const count = fs.existsSync(countFile) ? Number(fs.readFileSync(countFile, 'utf8')) : 0;
      fs.writeFileSync(countFile, String(count + 1));
      readline.createInterface({input:process.stdin}).on('line', line => {
        const m = JSON.parse(line);
        if (m.id === 1) console.log(JSON.stringify({id:1,result:{}}));
        if (m.id === 2) console.log(JSON.stringify({id:2,result:{rateLimits:{primary:{usedPercent:count === 0 ? 100 : 0},secondary:null}}}));
      });
      return;
    }
    const counter = logs + '/mock-count';
    const count = fs.existsSync(counter) ? Number(fs.readFileSync(counter, 'utf8')) : 0;
    fs.writeFileSync(counter, String(count + 1));
    const prompt = fs.readFileSync(0, 'utf8');
    fs.writeFileSync(logs + '/invocation-' + count + '.json', JSON.stringify({args,prompt}));
    const emit = event => console.log(JSON.stringify(event));
    emit({type:'thread.started',thread_id:'mock-session'});
    emit({type:'turn.started'});
    if ((process.env.MOCK_RETRY === '1' || process.env.MOCK_TIMEOUT === '1') && count === 0) {
      fs.writeFileSync('js/fill.js', 'export const fill = 1;\\n');
      if (process.env.MOCK_TIMEOUT === '1') {
        setTimeout(() => process.exit(1), 3000);
        return;
      }
      console.error('recoverable CLI crash');
      emit({type:'turn.failed',error:{message:'recoverable CLI crash'}});
      // Make the retry artifact's second-resolution stamp distinct.
      setTimeout(() => process.exit(1), 1100);
      return;
    }
    const audit = process.env.MOCK_AUDIT === '1';
    if (audit) {
      fs.mkdirSync('reviews/loop-unattended', {recursive:true});
      fs.writeFileSync('reviews/loop-unattended/test.md', 'Verdict: **ACCEPT**\\n');
      fs.mkdirSync('hidden-corpus', {recursive:true});
      fs.writeFileSync('hidden-corpus/scoreboard.json', JSON.stringify({full:true,fullAt:new Date().toISOString(),entries:0,unrecorded:0,sessions:{}}));
    } else fs.writeFileSync('js/fill.js', 'export const fill = ' + (count + 1) + ';\\n');
    for (const gitArgs of [['add','.'],['commit','-qm','test iteration']]) {
      const r = spawnSync('git', gitArgs, {encoding:'utf8'});
      if (r.error || r.status) throw new Error(r.error?.message || r.stderr);
    }
    emit({type:'item.completed',item:{id:'message',type:'agent_message',text:'Done'}});
    emit({type:'turn.completed',usage:{input_tokens:1000,cached_input_tokens:800,output_tokens:200}});
    if (process.env.MOCK_STOP === '1') fs.writeFileSync('STOP_AGENT_LOOP.md','1\\n');
  `, 0o755);
  for (const args of [["init", "-q"], ["config", "user.name", "Loop Test"], ["config", "user.email", "loop-test@example.invalid"], ["add", "."], ["commit", "-qm", "fixture"]]) {
    const r = invoke("git", args, { cwd: root });
    assert.equal(r.status, 0, r.stderr);
  }
  return root;
}

function runLoop(root, args = [], env = {}) {
  return invoke("bash", [join(root, "scripts/agent-port-loop.sh"), ...args], {
    cwd: root, timeout: 20000,
    env: { ...process.env, PATH: `${dirname(process.execPath)}:${process.env.PATH}`,
      LOOP_MUSE: "0", LOOP_CLAUDE: "0", LOOP_CODEX: "0", CODEX_BIN: join(root, "mock-codex.cjs"),
      AGENT_FORCE: "0", CODEX_PLAN_USAGE_SKIP: "1", LOOP_PROGRESS: "0", LOOP_PUSH: "0",
      LOOP_SLEEP_SEC: "0", LOOP_QUEUE_MIN: "0", LOOP_NAV_GATE_OFF: "1", SHORT_ITER_SEC: "0",
      ITERATION_TIMEOUT_SEC: "10", GIT_FETCH_TIMEOUT_SEC: "0", ...env },
  });
}

describe("port-loop Codex supervisor in an isolated fixture repo", () => {
  it("passes model/effort/profile/sandbox options and enforces token budget", () => {
    const root = sandboxRepo();
    try {
      const r = runLoop(root, ["--codex", "--token-budget-m", "0.001"], { MODEL: "chosen-model", CODEX_REASONING_EFFORT: "xhigh", CODEX_PROFILE: "test-profile", CODEX_SANDBOX: "read-only", CODEX_NO_SESSION_LOG: "1", AGENT_OUTPUT_FORMAT: "text" });
      assert.equal(r.status, 0, r.stdout + r.stderr);
      assert.match(r.stdout, /tokens: \+1200/);
      assert.match(r.stdout, /TOKEN BUDGET/);
      assert.doesNotMatch(r.stdout, /overriding AGENT_OUTPUT_FORMAT/);
      const call = JSON.parse(readFileSync(join(root, ".agent-port-loop-logs/invocation-0.json")));
      assert.deepEqual(call.args.slice(0, 3), ["exec", "--json", "--color"]);
      assert.ok(call.args.includes('model_reasoning_effort="xhigh"'));
      assert.ok(call.args.includes('approval_policy="never"'));
      for (const value of ["chosen-model", "test-profile", "read-only", "--ephemeral", "-"]) assert.ok(call.args.includes(value));
      assert.doesNotMatch(call.args.join(" "), /dangerously/);
      const raws = readdirSync(join(root, ".agent-port-loop-logs")).filter((f) => f.endsWith(".raw"));
      const raw = readFileSync(join(root, ".agent-port-loop-logs", raws[0]), "utf8");
      assert.match(raw, /chosen-model/);
      assert.match(raw, /timestamp_ms/);
      assert.match(call.prompt, /port test prompt/);
    } finally { rmSync(root, { recursive: true, force: true }); }
  });

  it("selects via LOOP_CODEX and applies force while retaining the configured model", () => {
    const root = sandboxRepo();
    try {
      const r = runLoop(root, [], { LOOP_CODEX: "1", AGENT_FORCE: "1", MODEL: "", MOCK_STOP: "1" });
      assert.equal(r.status, 0, r.stdout + r.stderr);
      const call = JSON.parse(readFileSync(join(root, ".agent-port-loop-logs/invocation-0.json")));
      assert.ok(call.args.includes("--dangerously-bypass-approvals-and-sandbox"));
      assert.ok(!call.args.includes("--model"));
      assert.ok(!call.args.includes("--sandbox"));
      assert.match(r.stdout, /STOP: .*exiting after iteration 1/);
      const raws = readdirSync(join(root, ".agent-port-loop-logs")).filter((f) => f.endsWith(".raw"));
      const raw = readFileSync(join(root, ".agent-port-loop-logs", raws[0]), "utf8");
      assert.match(raw, /Codex configured default/);
    } finally { rmSync(root, { recursive: true, force: true }); }
  });

  it("rejects invalid reasoning effort and sandbox values before launch", () => {
    for (const env of [{ CODEX_REASONING_EFFORT: "ultra" }, { CODEX_SANDBOX: "full" }]) {
      const root = sandboxRepo();
      try {
        const r = runLoop(root, ["--codex"], env);
        assert.equal(r.status, 2, r.stdout + r.stderr);
        assert.match(r.stderr, /CODEX_(REASONING_EFFORT|SANDBOX) must be/);
      } finally { rmSync(root, { recursive: true, force: true }); }
    }
  });

  it("accepts max reasoning effort", () => {
    const root = sandboxRepo();
    try {
      const r = runLoop(root, ["--codex", "--token-budget-m", "0.001"], { CODEX_REASONING_EFFORT: "max" });
      assert.equal(r.status, 0, r.stdout + r.stderr);
      const call = JSON.parse(readFileSync(join(root, ".agent-port-loop-logs/invocation-0.json")));
      assert.ok(call.args.includes('model_reasoning_effort="max"'));
    } finally { rmSync(root, { recursive: true, force: true }); }
  });

  it("retries a crash with leftover edits, stderr, extra prompt, and forced continue mode", () => {
    const root = sandboxRepo();
    try {
      const extra = join(root, ".agent-port-loop-logs/extra.md");
      mkdirSync(dirname(extra), { recursive: true });
      writeFileSync(extra, "standing orders for this turn");
      const r = runLoop(root, ["--codex", "--token-budget-m", "0.001", "--next-prompt", extra], { MOCK_RETRY: "1" });
      assert.equal(r.status, 0, r.stdout + r.stderr);
      const first = JSON.parse(readFileSync(join(root, ".agent-port-loop-logs/invocation-0.json")));
      const next = JSON.parse(readFileSync(join(root, ".agent-port-loop-logs/invocation-1.json")));
      assert.match(first.prompt, /standing orders/);
      assert.match(next.prompt, /\.continue test prompt/);
      assert.match(next.prompt, /Forced mode.*port/);
      assert.match(next.prompt, /Resume brief/);
      assert.match(next.prompt, /recoverable CLI crash/);
      assert.match(r.stdout, /counter rewound to 0; retrying #1/);
      const rawFiles = readdirSync(join(root, ".agent-port-loop-logs")).filter((f) => f.endsWith(".raw"));
      assert.equal(rawFiles.length, 2);
      assert.equal(readFileSync(join(root, "js/fill.js"), "utf8"), "export const fill = 2;\n");
    } finally { rmSync(root, { recursive: true, force: true }); }
  });

  it("honors audit cadence and last-completed with Codex", () => {
    const root = sandboxRepo();
    try {
      const r = runLoop(root, ["--codex", "--last-completed", "9", "--token-budget-m", "0.001"], { MOCK_AUDIT: "1" });
      assert.equal(r.status, 0, r.stdout + r.stderr);
      const call = JSON.parse(readFileSync(join(root, ".agent-port-loop-logs/invocation-0.json")));
      assert.match(call.prompt, /\.review test prompt/);
      assert.match(r.stdout, /global #10 mode=audit/);
      assert.match(r.stdout, /full rescore committed by the audit/);
    } finally { rmSync(root, { recursive: true, force: true }); }
  });

  it("preserves timeout status through the event stamping pipeline and retries", () => {
    const root = sandboxRepo();
    try {
      const r = runLoop(root, ["--codex", "--token-budget-m", "0.001"], { MOCK_TIMEOUT: "1", ITERATION_TIMEOUT_SEC: "1" });
      assert.equal(r.status, 0, r.stdout + r.stderr);
      assert.match(r.stdout, /exit 124 timeout before commit/);
      const next = JSON.parse(readFileSync(join(root, ".agent-port-loop-logs/invocation-1.json")));
      assert.match(next.prompt, /\.continue test prompt/);
      assert.match(next.prompt, /timeout/);
    } finally { rmSync(root, { recursive: true, force: true }); }
  });

  it("honors explicit continue-unfinished mode and one-shot prompt options", () => {
    const root = sandboxRepo();
    try {
      const extra = join(root, ".agent-port-loop-logs/extra.md");
      mkdirSync(dirname(extra), { recursive: true });
      writeFileSync(extra, "finish this audit");
      const r = runLoop(root, ["--codex", "--continue-unfinished", "--next-mode", "audit", "--next-prompt", extra, "--token-budget-m", "0.001"], { MOCK_AUDIT: "1" });
      assert.equal(r.status, 0, r.stdout + r.stderr);
      const call = JSON.parse(readFileSync(join(root, ".agent-port-loop-logs/invocation-0.json")));
      assert.match(call.prompt, /\.continue test prompt/);
      assert.match(call.prompt, /Forced mode.*audit/);
      assert.match(call.prompt, /finish this audit/);
      assert.match(r.stdout, /global #1 mode=audit continue-unfinished/);
    } finally { rmSync(root, { recursive: true, force: true }); }
  });

  it("waits and re-probes Codex quota before continuing", () => {
    const root = sandboxRepo();
    try {
      const r = runLoop(root, ["--codex", "--token-budget-m", "0.002"], { CODEX_PLAN_USAGE_SKIP: "0", LOOP_QUOTA_POLL_SEC: "1", LOOP_QUOTA_WAIT_MAX_SEC: "5" });
      assert.equal(r.status, 0, r.stdout + r.stderr);
      assert.match(r.stdout, /CODEX PLAN QUOTA/);
      assert.match(r.stdout, /QUOTA WAIT: plan usage back under threshold/);
      assert.equal(readFileSync(join(root, ".agent-port-loop-logs/probes"), "utf8"), "2");
    } finally { rmSync(root, { recursive: true, force: true }); }
  });
});
