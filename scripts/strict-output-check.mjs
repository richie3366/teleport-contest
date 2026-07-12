#!/usr/bin/env node
// strict-output-check.mjs — complement the frozen runner with exact scored
// output length checks. The frozen runner compares canonical-length prefixes,
// so a session can report PASS while JS emits trailing RNG/screens/cursors.
// Animation is supplemental: missing canonical frames are allowed by default,
// but trailing frames are rejected. Set STRICT_ANIMATION=1 for exact counts.
//
// Usage:
//   node scripts/strict-output-check.mjs sessions/foo.session.json [...]

import { readFileSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { pathToFileURL } from 'node:url';
import { normalizeSession } from '../frozen/session_loader.mjs';

const ROOT = resolve(new URL('..', import.meta.url).pathname);

function isRngCall(entry) {
    return typeof entry === 'string'
        && /^(?:rn2|rnd|rn1|rnl|rne|rnz|d)\(/.test(entry.replace(/^\d+\s+/, ''));
}

function storageHandle() {
    const data = new Map();
    return {
        getItem(k) { return data.has(k) ? data.get(k) : null; },
        setItem(k, v) { data.set(k, String(v)); },
        removeItem(k) { data.delete(k); },
        get length() { return data.size; },
        key(i) {
            let n = 0;
            for (const k of data.keys()) {
                if (n++ === i) return k;
            }
            return null;
        },
    };
}

function expectedFor(seg) {
    const steps = (seg.steps || []).filter((step) => step.screen);
    return {
        rng: (seg.steps || []).reduce(
            (n, step) => n + (step.rng || []).filter(isRngCall).length, 0),
        screens: steps.length,
        cursors: steps.length,
        animByStep: steps.map((step) => (step.animation_frames || []).length),
    };
}

function actualFor(game) {
    const rng = (game.getRngLog?.() || []).filter(isRngCall).length;
    const screens = game.getScreens?.() || [];
    const cursors = game.getCursors?.() || [];
    const anim = game.getAnimationFramesByStep?.() || [];
    return {
        rng,
        screens: screens.length,
        cursors: cursors.length,
        animByStep: anim.map((frames) => (frames || []).length),
    };
}

function compare(expected, actual) {
    const errors = [];
    for (const key of ['rng', 'screens', 'cursors']) {
        if (expected[key] !== actual[key])
            errors.push(`${key} expected ${expected[key]}, got ${actual[key]}`);
    }
    if (expected.animByStep.length !== actual.animByStep.length) {
        errors.push(
            `animation step slots expected ${expected.animByStep.length}, `
            + `got ${actual.animByStep.length}`);
    }
    const n = Math.max(expected.animByStep.length, actual.animByStep.length);
    const exactAnimation = process.env.STRICT_ANIMATION === '1';
    for (let i = 0; i < n; i++) {
        const e = expected.animByStep[i] ?? 0;
        const a = actual.animByStep[i] ?? 0;
        if ((exactAnimation && e !== a) || (!exactAnimation && a > e))
            errors.push(`step ${i} animation frames expected ${e}, got ${a}`);
    }
    return errors;
}

const files = process.argv.slice(2);
if (!files.length) {
    console.error('usage: node scripts/strict-output-check.mjs <session.json> [...]');
    process.exit(2);
}

const { runSegment } = await import(
    pathToFileURL(resolve(ROOT, 'js/jsmain.js')).href);
let failures = 0;

for (const arg of files) {
    const path = resolve(arg);
    const session = normalizeSession(JSON.parse(readFileSync(path, 'utf8')));
    const storage = storageHandle();
    const errors = [];

    for (let i = 0; i < session.segments.length; i++) {
        const seg = session.segments[i];
        try {
            const game = await runSegment({
                seed: seg.seed,
                datetime: seg.datetime,
                nethackrc: seg.nethackrc,
                moves: seg.moves || '',
                storage,
            });
            for (const error of compare(expectedFor(seg), actualFor(game)))
                errors.push(`segment ${i}: ${error}`);
        } catch (error) {
            errors.push(`segment ${i}: threw ${error.message}`);
        }
    }

    if (errors.length) {
        failures++;
        console.error(`FAIL ${basename(path)}`);
        for (const error of errors) console.error(`  ${error}`);
    } else {
        console.log(`PASS ${basename(path)} (exact scored-output lengths)`);
    }
}

process.exit(failures ? 1 : 0);
