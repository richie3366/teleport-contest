import fs from 'fs';
import { fileURLToPath } from 'url';

const root = fileURLToPath(new URL('..', import.meta.url));
const readLines = (rel) =>
    fs
        .readFileSync(new URL(rel, import.meta.url), 'utf8')
        .split('\n')
        .map((l) => l.replace(/\r$/, ''))
        .filter((l) => l.length > 0);

const tru = readLines('../nethack-c/upstream/dat/rumors.tru');
const fal = readLines('../nethack-c/upstream/dat/rumors.fal');
const outPath = new URL('../js/rumor_data.js', import.meta.url);
const out = `// rumor_data.js — plaintext from nethack-c/upstream/dat/rumors.{tru,fal}
// rumors.c getrumor() + get_rnd_line (MD_PAD_RUMORS).

/** @type {readonly string[]} */
export const RUMORS_TRUE_LINES = Object.freeze(${JSON.stringify(tru, null, 4)});

/** @type {readonly string[]} */
export const RUMORS_FALSE_LINES = Object.freeze(${JSON.stringify(fal, null, 4)});

export const RUMORS_TRUE_BODY = ${JSON.stringify(tru.join('\n') + '\n')};
export const RUMORS_FALSE_BODY = ${JSON.stringify(fal.join('\n') + '\n')};
`;
fs.writeFileSync(outPath, out);
console.log('wrote', outPath.pathname, 'tru', tru.length, 'fal', fal.length);
