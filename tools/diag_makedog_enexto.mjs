#!/usr/bin/env node
/** Trace enexto/goodpos at makedog for seed0102 pet placement. */
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { goodposMakemonLikeC } = await import(join(ROOT, 'js/walkable.js'));
const { collectCoordsLikeC, CC_NO_FLAGS } = await import(join(ROOT, 'js/collect_coords.js'));
const { normalizeSession } = await import(join(ROOT, 'frozen/session_loader.mjs'));
const { runSegment } = await import(join(ROOT, 'js/jsmain.js'));
const { getRngLog } = await import(join(ROOT, 'js/rng.js'));

globalThis.__diagEnextoCandyLikeC = (candy, n, hx, hy, flags, fakemon, g) => {
    if ((hx | 0) !== 28 || (hy | 0) !== 7 || (fakemon?.mnum | 0) !== 16) return;
    console.log('candy[0..11]', candy.slice(0, 12).map((c, i) => `[${i}](${c.x},${c.y})`).join(' '));
    for (let i = 0; i < Math.min(n, 16); i++) {
        const c = candy[i];
        const ok = goodposMakemonLikeC(c.x, c.y, fakemon, flags, g);
        if (ok) {
            console.log(`first good in candy scan: [${i}] (${c.x},${c.y}) flags=0x${(flags >>> 0).toString(16)}`);
            break;
        }
    }
};

globalThis.__diagPreMakedogLikeC = (g) => {
    const u = g.u;
    const blocker = g.level?.monsters?.find(
        (m) => (m.mx | 0) === (u?.ux | 0) && (m.my | 0) === (u?.uy | 0),
    );
    console.log('pre-makedog hero', u?.ux, u?.uy, 'upstair', g.level?.upstair, 'stairs', g.stairs);
    console.log('blocker', blocker ? [blocker.mx, blocker.my, blocker.mnum] : null);
    console.log('all mons', (g.level?.monsters || []).map((m) => [m.mx, m.my, m.mnum]));
    for (let y = 5; y <= 10; y++) {
        let row = `y=${y} `;
        for (let x = 24; x <= 32; x++) {
            const t = g.level?.at(x, y)?.typ | 0;
            row += t === 25 ? '.' : t === 23 ? '#' : t === 24 ? '+' : String(t % 10);
        }
        console.log(row);
    }
};
let enextoLog = [];
let enextoPass = 0;
globalThis.__diagEnextoCandidateLikeC = (g, hx, hy, i, x, y, ok, flags) => {
    if (enextoPass === 0) enextoLog.push({ i, x, y, ok, flags });
};
function cellInfo(g, x, y) {
    const loc = g.level?.at(x, y);
    const mon = g.level?.monsters?.find((m) => (m.mx | 0) === x && (m.my | 0) === y);
    const engr = g.level?.engravings?.filter((e) => (e.engr_x | 0) === x && (e.engr_y | 0) === y);
    return { typ: loc?.typ, mon: mon ? mon.mnum : null, engr };
}

globalThis.__diagMakemonEnextoLikeC = (g, hx, hy, ptr, gpflags, cc) => {
    if (enextoPass++ > 0) return;
    console.log('rng at makedog', getRngLog().length);
    console.log('makedog hero', hx, hy, 'mnum', ptr?.mnum, 'picked', cc.x, cc.y);
    for (const [x, y] of [[27, 8], [28, 8], [29, 8], [27, 7], [29, 7]]) {
        const fobj = [];
        for (let o = g.level?.fobj; o; o = o.nobj) {
            if ((o.ox | 0) === x && (o.oy | 0) === y) fobj.push(o.otyp);
        }
        console.log(`  cell (${x},${y})`, cellInfo(g, x, y), 'fobj', fobj);
    }
    const elb = (g.level?.engravings || []).filter((e) => (e.engr_txt?.[0] || '').includes('Elbereth'));
    console.log('Elbereth engravings', elb.map((e) => [e.engr_x, e.engr_y, e.engr_txt?.[0]]));
    const nearMons = (g.level?.monsters || []).filter(
        (m) => Math.abs((m.mx | 0) - hx) <= 3 && Math.abs((m.my | 0) - hy) <= 3,
    );
    console.log('near monsters', nearMons.map((m) => [m.mx, m.my, m.mnum, m.mtame]));
    const goods = enextoLog.filter((e) => e.ok);
    console.log('good count', goods.length, 'first few goods', goods.slice(0, 8).map((e) => `(${e.x},${e.y})@${e.i}`));
    for (const e of enextoLog.slice(0, 12)) {
        console.log(
            `  [${e.i}] (${e.x},${e.y}) good=${e.ok}${e.ok && e.x === cc.x && e.y === cc.y ? ' <-- picked' : ''}`,
        );
    }
    enextoLog = [];
    enextoPass = 0;
};

const session = JSON.parse(
    readFileSync(join(ROOT, 'sessions/seed0102-ranger-name-cancel.session.json'), 'utf8'),
);
const storage = new Map();
const h = {
    getItem(k) { return storage.get(k) ?? null; },
    setItem(k, v) { storage.set(k, String(v)); },
    removeItem(k) { storage.delete(k); },
    get length() { return storage.size; },
    key(i) { return [...storage.keys()][i] ?? null; },
};
for (const seg of normalizeSession(session).segments) {
    await runSegment({ ...seg, storage: h });
}
