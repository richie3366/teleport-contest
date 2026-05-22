import fs from 'fs';
import { fileURLToPath } from 'url';

/** C: global.h MD_PAD_RUMORS — makedefs padline for rumors.tru/fal. */
const MD_PAD_RUMORS = 60;

const root = fileURLToPath(new URL('..', import.meta.url));

const readLines = (rel) =>
    fs
        .readFileSync(new URL(rel, import.meta.url), 'utf8')
        .split('\n')
        .map((l) => l.replace(/\r$/, ''))
        .filter((l) => l.length > 0);

/** C: makedefs.c padline — pad short lines to MD_PAD_RUMORS before newline. */
function padline(line, padlength = MD_PAD_RUMORS) {
    let buf = line.endsWith('\n') ? line : `${line}\n`;
    let len = buf.length;
    if (len <= padlength) {
        const nlIdx = buf.indexOf('\n');
        let before = buf.slice(0, nlIdx);
        while (len < padlength) {
            before += '_';
            len++;
        }
        buf = `${before}\n`;
    }
    return buf;
}

function buildBody(lines) {
    return lines.map((l) => padline(l)).join('');
}

const tru = readLines('../nethack-c/upstream/dat/rumors.tru');
const fal = readLines('../nethack-c/upstream/dat/rumors.fal');
const trueBody = buildBody(tru);
const falseBody = buildBody(fal);

const outPath = new URL('../js/rumor_data.js', import.meta.url);
const out = `// rumor_data.js — plaintext from nethack-c/upstream/dat/rumors.{tru,fal}
// rumors.c getrumor() + get_rnd_line (MD_PAD_RUMORS). Bodies use makedefs padline (global.h 60).

/** @type {readonly string[]} */
export const RUMORS_TRUE_LINES = Object.freeze(${JSON.stringify(tru, null, 4)});

/** @type {readonly string[]} */
export const RUMORS_FALSE_LINES = Object.freeze(${JSON.stringify(fal, null, 4)});

/** C: DLB rumors.tru chunk byte size (makedefs padline + newline per line). */
export const RUMORS_TRUE_CHUNK_SIZE = ${trueBody.length};

/** C: DLB rumors.fal chunk byte size. */
export const RUMORS_FALSE_CHUNK_SIZE = ${falseBody.length};

export const RUMORS_TRUE_BODY = ${JSON.stringify(trueBody)};
export const RUMORS_FALSE_BODY = ${JSON.stringify(falseBody)};
`;
fs.writeFileSync(outPath, out);
console.log('wrote', outPath.pathname, 'tru', tru.length, 'fal', fal.length,
    'trueBytes', trueBody.length, 'falseBytes', falseBody.length);
