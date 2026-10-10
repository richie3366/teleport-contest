import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { game } from '../js/gstate.js';
import { initRng, enableRngLog, getRngLog } from '../js/rng.js';
import { mdrop_special_objs } from '../js/mon.js';
import { objectNames, objects_globals_init } from '../js/objects.js';

// C ref: sp_lev.c create_object Medusa arm `:2356–2389` — the reject loop
// (`:2374`) and the accept tail (`:2387`) both dispose via mongone(was),
// whose mdrop_special_objs draws obj_resists(0,0) rn2(100) per invent item.
// JS inlined a draw-free fmon splice at both reached copies of the arm
// (medusa_empty_statue_at, load_medusa_1's inline loop), so C's per-item
// dice had no JS counterpart (corpus: scen-sweep-Ranger-95333 step 345,
// C 2× rn2(100)@obj_resists vs JS straight into the next rndmonst scan).
// Fix: both sites call the live mongone; the medusa loaders go async
// (load_special_proto_body already awaits thenables). The generic
// create_object copy keeps the splice: it is statically unreached (no
// caller passes STATUE with NON_PM corpsenm on a Medusa level — see the
// arm comment in js/mklev.js), so wiring it would drag l_create_object
// (47 callers) async for no session.
//
// Part A pins the wiring in source (lspo loaderBody precedent — both sites
// are module-local, like the lspo loaders). Part B pins the writer
// contract behaviorally: mdrop draws one rn2(100) per ordinary item.

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(ROOT, 'js', 'mklev.js');

function loaderBody(src, name) {
    const m = src.match(new RegExp(`^(?:export\\s+)?(?:async\\s+)?function ${name}\\(`, 'm'));
    assert.ok(m && m.index !== undefined, `${name} def missing in js/mklev.js`);
    const rest = src.slice(m.index + m[0].length);
    const next = rest.search(/^(?:export\s+)?(?:async\s+)?function [A-Za-z_0-9]+\(/m);
    assert.ok(next > 0, `next def must follow ${name} in js/mklev.js`);
    return rest.slice(0, next);
}

function countCalls(body, snippet) {
    return body.split(snippet).length - 1;
}

describe('Medusa statue arm calls live mongone (sp_lev.c:2374/:2387)', () => {
    it('medusa_empty_statue_at: reject + accept tails await mongone', () => {
        const body = loaderBody(readFileSync(SRC, 'utf8'), 'medusa_empty_statue_at');
        assert.equal(countCalls(body, 'await mongone(was)'), 2);
        assert.ok(!body.includes('list.splice'), 'draw-free fmon splice must go');
    });

    it('load_medusa_1 inline loop: reject + accept tails await mongone', () => {
        const body = loaderBody(readFileSync(SRC, 'utf8'), 'load_medusa_1');
        assert.equal(countCalls(body, 'await mongone(was)'), 2);
    });
});

describe('mdrop_special_objs draws obj_resists per item (steal.c:852-872)', () => {
    let saved;
    beforeEach(() => {
        saved = { urole: game.urole, coreCtx: game.coreCtx, dispCtx: game.dispCtx, seed: game.currentSeed };
        game.urole = {};
    });
    afterEach(() => {
        game.urole = saved.urole;
        game.coreCtx = saved.coreCtx;
        game.dispCtx = saved.dispCtx;
        game.currentSeed = saved.seed;
    });

    it('two ordinary items draw two rn2(100) and stay put', async () => {
        objects_globals_init();
        initRng(95333);
        enableRngLog();
        const SWORD = objectNames.indexOf('LONG_SWORD');
        const POTION = objectNames.indexOf('POT_WATER');
        assert.ok(SWORD >= 0 && POTION >= 0);
        const item2 = { otyp: POTION, oartifact: 0, nobj: null };
        const item1 = { otyp: SWORD, oartifact: 0, nobj: item2 };
        const mon = { mx: 10, my: 10, minvent: item1 };
        await mdrop_special_objs(mon);
        const log = getRngLog();
        assert.equal(log.length, 2);
        assert.ok(log.every((e) => /^rn2\(100\)=\d+$/.test(e), `not two rn2(100): ${log}`));
        assert.equal(mon.minvent, item1);
        assert.equal(item1.nobj, item2);
    });
});
