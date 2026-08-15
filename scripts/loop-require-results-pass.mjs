#!/usr/bin/env node
// Fail-closed parser for frozen/ps_test_runner.mjs output.
// The runner prints PASS/FAIL lines and __RESULTS_JSON__ but exits 0 even
// when sessions fail. The supervisor must not trust process.exitCode.
//
// Usage: node scripts/loop-require-results-pass.mjs <logfile-or-->
// Reads the last __RESULTS_JSON__ object. Exits 0 only if every
// results[].passed is true and the array is non-empty.

import { readFileSync } from 'node:fs';

const src = process.argv[2] && process.argv[2] !== '-'
    ? readFileSync(process.argv[2], 'utf8')
    : readFileSync(0, 'utf8');

const marker = '__RESULTS_JSON__';
const idx = src.lastIndexOf(marker);
if (idx < 0) {
    console.error('loop-require-results-pass: no __RESULTS_JSON__ in output');
    process.exit(1);
}

const rest = src.slice(idx + marker.length).trim();
const line = rest.split(/\r?\n/).find((l) => l.trim().startsWith('{'));
if (!line) {
    console.error('loop-require-results-pass: no JSON object after marker');
    process.exit(1);
}

let bundle;
try {
    bundle = JSON.parse(line);
} catch (e) {
    console.error(`loop-require-results-pass: JSON parse failed: ${e.message}`);
    process.exit(1);
}

const results = bundle?.results;
if (!Array.isArray(results) || results.length === 0) {
    console.error('loop-require-results-pass: empty results[]');
    process.exit(1);
}

const failed = results.filter((r) => !r?.passed);
if (failed.length) {
    const names = failed.map((r) => r.session || '?').join(', ');
    console.error(
        `loop-require-results-pass: ${failed.length}/${results.length} failed (${names})`,
    );
    process.exit(1);
}

process.stderr.write(
    `loop-require-results-pass: ${results.length}/${results.length} passed\n`,
);
process.exit(0);
