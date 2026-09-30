import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isqrt } from "../js/hacklib.js";

// C ref: hacklib.c isqrt `:681–700` — odd-subtraction integer square
// root, no floating point. Vectors: exact squares, in-betweens, 0/1,
// the live call-site magnitudes (polearm_range_max 4/5/8 → rt 2;
// spell.c 900*difficulty+2000 scale), and a large square. No RNG.
describe("isqrt port (hacklib.c)", () => {
  it("matches floor(sqrt(n)) for 0..40", () => {
    for (let n = 0; n <= 40; n++) {
      assert.equal(isqrt(n), Math.floor(Math.sqrt(n)), `n=${n}`);
    }
  });

  it("matches floor(sqrt(n)) at larger magnitudes", () => {
    for (const n of [49, 50, 99, 100, 101, 2000, 2900, 11000, 1000000]) {
      assert.equal(isqrt(n), Math.floor(Math.sqrt(n)), `n=${n}`);
    }
  });

  it("polearm range maxima give rt 2 (C apply.c :3293)", () => {
    for (const max of [4, 5, 8]) assert.equal(isqrt(max), 2);
  });
});
