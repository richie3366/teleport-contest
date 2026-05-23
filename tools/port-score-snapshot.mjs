#!/usr/bin/env node
/**
 * Maintainer tool: run `bash frozen/score.sh`, parse __RESULTS_JSON__, write
 * `frozen/port-score-snapshot.json`, and optionally splice a markdown table into
 * `.cursor/reports/c-to-js-port-dashboard.md` between PORT_SCORE_SNAPSHOT markers.
 *
 * Usage:
 *   node tools/port-score-snapshot.mjs
 *   node tools/port-score-snapshot.mjs --update-dashboard
 *
 * No contest `js/` behavior changes — scoring only.
 */

import { execFileSync, execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");
const SCORE_SH = join(PROJECT_ROOT, "frozen", "score.sh");
const SNAPSHOT_JSON = join(PROJECT_ROOT, "frozen", "port-score-snapshot.json");
const DASHBOARD = join(PROJECT_ROOT, ".cursor", "reports", "c-to-js-port-dashboard.md");

const MARK_START = "<!-- PORT_SCORE_SNAPSHOT_START -->";
const MARK_END = "<!-- PORT_SCORE_SNAPSHOT_END -->";

function runScore() {
    const out = execFileSync("bash", [SCORE_SH], {
        cwd: PROJECT_ROOT,
        encoding: "utf8",
        maxBuffer: 32 * 1024 * 1024,
    });
    const marker = "__RESULTS_JSON__\n";
    const i = out.indexOf(marker);
    if (i < 0) {
        throw new Error("score stdout missing __RESULTS_JSON__ line");
    }
    const jsonText = out.slice(i + marker.length).trim();
    return JSON.parse(jsonText);
}

function gitShortSha() {
    try {
        return execSync("git rev-parse --short HEAD", {
            cwd: PROJECT_ROOT,
            encoding: "utf8",
        }).trim();
    } catch {
        return "unknown";
    }
}

/** @param {{ matched: number, total: number }} m */
function ratio(m) {
    if (!m || m.total <= 0) return 0;
    return m.matched / m.total;
}

function bucketsFor(r) {
    const tags = [];
    const rng = r.metrics?.rngCalls || { matched: 0, total: 0 };
    const scr = r.metrics?.screens || { matched: 0, total: 0 };

    if (r.passed) {
        tags.push("full-pass");
        return tags;
    }
    if (rng.matched < 500 && rng.total > 0) tags.push("early-diverge");
    if (ratio(rng) >= 0.5) tags.push("rng>50%");
    if (scr.matched > 0) tags.push("screens>0");
    return tags;
}

function enrichBundle(bundle) {
    const commit = bundle.commit || gitShortSha();
    const results = (bundle.results || []).map((r) => ({
        ...r,
        buckets: bucketsFor(r),
        rngRatio: ratio(r.metrics?.rngCalls || { matched: 0, total: 0 }),
        screenRatio: ratio(r.metrics?.screens || { matched: 0, total: 0 }),
    }));
    return {
        timestamp: bundle.timestamp || new Date().toISOString(),
        commit,
        passCount: results.filter((r) => r.passed).length,
        totalSessions: results.length,
        results,
    };
}

function markdownTable(enriched) {
    const lines = [
        "",
        "| Session | P | RNG matched/total | Screen matched/total | Buckets |",
        "|---------|---|-------------------|------------------------|---------|",
    ];
    const sorted = [...enriched.results].sort((a, b) => a.session.localeCompare(b.session));
    for (const r of sorted) {
        const rng = r.metrics?.rngCalls || { matched: 0, total: 0 };
        const scr = r.metrics?.screens || { matched: 0, total: 0 };
        const p = r.passed ? "Y" : "N";
        const b = (r.buckets || []).join(", ") || "—";
        lines.push(
            `| \`${r.session}\` | ${p} | ${rng.matched}/${rng.total} | ${scr.matched}/${scr.total} | ${b} |`,
        );
    }
    lines.push("");
    lines.push(
        `**Summary:** ${enriched.passCount}/${enriched.totalSessions} passing · commit \`${enriched.commit}\` · \`${enriched.timestamp}\``,
    );
    lines.push("");
    return lines.join("\n");
}

function spliceDashboard(markdownBlock) {
    let text = readFileSync(DASHBOARD, "utf8");
    if (!text.includes(MARK_START) || !text.includes(MARK_END)) {
        throw new Error(`Dashboard missing ${MARK_START} / ${MARK_END} markers`);
    }
    const before = text.slice(0, text.indexOf(MARK_START) + MARK_START.length);
    const after = text.slice(text.indexOf(MARK_END));
    const next = `${before}\n\n${markdownBlock.trim()}\n\n${after}`;
    writeFileSync(DASHBOARD, next, "utf8");
}

function main() {
    const updateDashboard = process.argv.includes("--update-dashboard");
    const bundle = runScore();
    const enriched = enrichBundle(bundle);

    writeFileSync(SNAPSHOT_JSON, JSON.stringify(enriched, null, 2), "utf8");
    process.stderr.write(`Wrote ${SNAPSHOT_JSON}\n`);

    const md = markdownTable(enriched);
    if (updateDashboard) {
        spliceDashboard(md);
        process.stderr.write(`Updated dashboard markers in ${DASHBOARD}\n`);
    } else {
        process.stdout.write(md);
        process.stdout.write("\n");
        process.stderr.write("(pass --update-dashboard to splice table into c-to-js-port-dashboard.md)\n");
    }
}

main();
