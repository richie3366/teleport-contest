import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { didPark, didMeasure, didStaleOnlyPark, openRowKey } from './port-did-park.mjs';

const header = `# Loop work queue

## Must-fix (from reviews) — pop first

## Open (map-driven, after Must-fix is empty)

`;

const parkedHdr = `
## Parked (do not pop)

`;

const dogOpen =
  '- [ ] `dogmove.c` dog_invent — 2 corpus blocks; C pickup vs JS.';
const physOpen =
  '- [ ] `uhitm.c` mhitm_ad_phys knockback — 2 corpus blocks.';
const parkedD0006 = '- D-0006 seed1800 pet movement — needs C state/candidate capture.';
const parkedDog =
  '- `dogmove.c` dog_invent — misattributed corpus owner; both hits are `mon.c` mpickstuff.';

const before = `${header}${dogOpen}
${physOpen}
${parkedHdr}${parkedD0006}
`;

describe('didPark', () => {
  it('is true when an Open row moves to Parked', () => {
    const after = `${header}${physOpen}
${parkedHdr}${parkedD0006}
${parkedDog}
`;
    assert.equal(didPark(before, after), true);
  });

  it('is false when nothing moved', () => {
    assert.equal(didPark(before, before), false);
  });

  it('is false when an Open row is marked [x] but Parked is unchanged', () => {
    const after = `${header}- [x] \`dogmove.c\` dog_invent — 2 corpus blocks; C pickup vs JS.
${physOpen}
${parkedHdr}${parkedD0006}
`;
    assert.equal(didPark(before, after), false);
  });

  it('is false when Parked grows but the Open row is still live', () => {
    const after = `${header}${dogOpen}
${physOpen}
${parkedHdr}${parkedD0006}
${parkedDog}
`;
    assert.equal(didPark(before, after), false);
  });

  it('is false when Parked gained an unrelated line', () => {
    const after = `${header}${physOpen}
${parkedHdr}${parkedD0006}
- leftover note with no function name
`;
    assert.equal(didPark(before, after), false);
  });
});

describe('openRowKey', () => {
  it('strips backticks around the function token (#3119)', () => {
    assert.deepEqual(
      openRowKey('- [ ] `mkobj.c` `mkbox_cnts` BoH weight factor (data.md:302)'),
      { file: 'mkobj.c', fn: 'mkbox_cnts' },
    );
    assert.deepEqual(
      openRowKey('- [ ] `vision.c` vision_recalc (TOP30 #30 345/180)'),
      { file: 'vision.c', fn: 'vision_recalc' },
    );
  });
});

describe('didStaleOnlyPark', () => {
  const staleOpen = '- [ ] `mkobj.c` `mkbox_cnts` BoH weight factor — unverified at enqueue.';
  const beforeS = `${header}${staleOpen}
${physOpen}
${parkedHdr}${parkedD0006}
`;

  it('is true when every new Parked line is a STALE retirement (backticked fn row)', () => {
    const after = `${header}${physOpen}
${parkedHdr}${parkedD0006}
- \`mkobj.c\` mkbox_cnts BoH weight — STALE 2026-09-16: body live js/mkobj.js:791, 0 blocked.
`;
    assert.equal(didPark(beforeS, after), true);
    assert.equal(didStaleOnlyPark(beforeS, after), true);
  });

  it('is false when the park is diagnostic (writer named)', () => {
    const after = `${header}${physOpen}
- [ ] \`polyself.c\` polymon find_ac order — blocks 1/553 (Tourist-92095).
${parkedHdr}${parkedD0006}
- \`mkobj.c\` mkbox_cnts — SYMPTOM 2026-09-16. Falsifier: verify polymon.
`;
    assert.equal(didPark(beforeS, after), true);
    assert.equal(didStaleOnlyPark(beforeS, after), false);
  });

  it('is false when nothing was parked', () => {
    assert.equal(didStaleOnlyPark(beforeS, beforeS), false);
  });
});

describe('didMeasure', () => {
  const measureOpen =
    '- [ ] `mon.c` can_carry strong-flat cap + Knight worker spin `[measure]` — blocks 1/553.';
  const beforeM = `${header}${measureOpen}
${physOpen}
${parkedHdr}${parkedD0006}
`;

  it('is true when a [measure] row left the live list', () => {
    const after = `${header}${physOpen}
- [ ] \`allmain.c\` moveloop_core sync spin — blocks 1/553 (from the can_carry measurement).
${parkedHdr}${parkedD0006}
`;
    assert.equal(didMeasure(beforeM, after), true);
  });

  it('is false when the popped row was not a [measure] row', () => {
    const after = `${header}${measureOpen}
${parkedHdr}${parkedD0006}
`;
    assert.equal(didMeasure(beforeM, after), false);
  });

  it('is false when nothing moved', () => {
    assert.equal(didMeasure(beforeM, beforeM), false);
  });
});
