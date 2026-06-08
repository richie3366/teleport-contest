#!/usr/bin/env node
/**
 * Parse NETHACK_RNGLOG lines from the patched C recorder.
 * Format: "N rn2(args) = result @ caller(file:line)" (see nethack-c/patches/003-rng-log-core.patch).
 */

/**
 * @param {string} line
 * @returns {{ kind: 'rng', index: number, fn: string, args: string, result: number, callerFunc: string|null, file: string|null, line: number|null, raw: string } | { kind: 'ctx', raw: string } | null}
 */
export function parseC_rngLogLine(line) {
    const raw = line.trimEnd();
    if (!raw) return null;
    const c0 = raw[0];
    if (c0 === '>' || c0 === '<' || c0 === '^') {
        return { kind: 'ctx', raw };
    }
    const atIdx = raw.indexOf(' @ ');
    let callerPart = '';
    let main = raw;
    if (atIdx >= 0) {
        main = raw.slice(0, atIdx);
        callerPart = raw.slice(atIdx + 3).trim();
    }
    const mm = main.match(/^(\d+)\s+(\w+)\(([^)]*)\)\s*=\s*(-?\d+)$/);
    if (!mm) return null;
    let callerFunc = null;
    let file = null;
    let lineNo = null;
    if (callerPart) {
        const withFunc = callerPart.match(/^(\w+)\(([^:]+):(\d+)\)$/);
        const bare = callerPart.match(/^([^:]+):(\d+)$/);
        if (withFunc) {
            callerFunc = withFunc[1];
            file = withFunc[2];
            lineNo = parseInt(withFunc[3], 10);
        } else if (bare) {
            file = bare[1];
            lineNo = parseInt(bare[2], 10);
        }
    }
    return {
        kind: 'rng',
        index: parseInt(mm[1], 10) - 1,
        fn: mm[2],
        args: mm[3],
        result: parseInt(mm[4], 10),
        callerFunc,
        file,
        line: lineNo,
        raw,
    };
}

/**
 * @param {string} text
 * @returns {Array<ReturnType<typeof parseC_rngLogLine> & {}>}
 */
export function parseC_rngLogText(text) {
    const out = [];
    for (const line of text.split('\n')) {
        const e = parseC_rngLogLine(line);
        if (e) out.push(e);
    }
    return out;
}

/**
 * @param {string} path
 * @returns {Promise<ReturnType<typeof parseC_rngLogText>>}
 */
export async function readC_rngLogFile(path) {
    const { readFile } = await import('fs/promises');
    return parseC_rngLogText(await readFile(path, 'utf8'));
}
