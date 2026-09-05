import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { didPark } from './port-did-park.mjs';

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
