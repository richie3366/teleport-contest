# Satellite plan: Harness, RNG, and time

Parent: global plan **NetHack JS port roadmap** (Workstream A — harness, RNG, time).

## Goals

- **P channel:** `getRngLog()` entries match C order and values (judge strips `@ caller` suffix from C lines).
- **Three RNG contexts:** Core gameplay, Lua special levels, display (hallucination) — align with [README.md](../../README.md) and [nethack-c/patches/README.md](../../nethack-c/patches/README.md). Today [js/rng.js](../../js/rng.js) documents “only core”; extend with separate ISAAC instances or upstream-equivalent split when porting Lua/display code paths.
- **Wall clock:** Moon phase, shop greetings, Friday 13th luck, hire dates — all derive from `NETHACK_FIXED_DATETIME` on C side; JS must consume `input.datetime` consistently once ported.

## C-first moveloop / search

P-channel parity must come from porting C control flow, not from hand-maintained session call lists. Replace `fastforward_step` and any ad-hoc RNG with real `allmain.c` / `monmove.c` / `detect.c` work. See **10-moveloop-detect-c-map.md**.

## Checklist

### 1. Map wrappers to C macros

- [ ] Enumerate every RNG helper the judge recognizes ([docs/API.md](../../docs/API.md) — `rn2`, `rnd`, `rn1`, `rnl`, `rne`, `rnz`, `d`).
- [ ] For each export in [js/rng.js](../../js/rng.js), confirm C macro semantics (edge cases for `x <= 0`, etc.).
- [x] `rnl` in [js/rng.js](../../js/rng.js) (see `rnd.c`; log format `rnl(N)=M`, inner `rn2` when Luck adjustment applies).

### 2. Logging and `rne` / `rnz`

- [ ] `rne` / `rnz`: internal `rn2` calls must appear in the log when logging is enabled (per API); verify one-line summary lines match C session traces for those macros.
- [ ] `d(n,x)`: confirm each `rnd` inside the loop is logged individually like C.

### 3. Clang left-to-right evaluation

- [ ] Audit **all** JS for single expressions that call RNG more than once (`d(rn2(a), rn2(b))`, compound conditions, etc.).
- [ ] Split into ordered statements so consumption matches **clang** (not gcc). Cross-check suspicious sites against C source for the same line.

### 4. `runSegment` / `NethackGame` contract

- [ ] Pass **`input.datetime`** into game init when implementing time-dependent behavior (currently [js/jsmain.js](../../js/jsmain.js) `runSegment` destructuring omits it — wire when needed).
- [ ] `input.storage`: same object across segments of a session; verify save/restore tests when persistence exists ([docs/API.md](../../docs/API.md)).
- [ ] `prevGame`: roadmap harness uses `runSegment(input)` only; if you add carryover beyond `storage`, match API.

### 5. Capture hook alignment

- [ ] [js/jsmain.js](../../js/jsmain.js) `_preNhgetchHook`: screens and RNG slices align one-to-one with `nhgetch` boundaries as C `tty_nhgetch` does.
- [ ] First screen is pre-first-key state; each subsequent screen after one key consumed.

### 6. `animationFrame()` (supplemental)

- [ ] Identify C `nh_delay_output` / animation paths relevant to your milestone sessions.
- [ ] Call `await game.animationFrame()` in the same logical order; verify Anim% column without breaking P/S.

### 7. Frozen PRNG

- [ ] Do not edit [js/isaac64.js](../../js/isaac64.js); all fixes go through [js/rng.js](../../js/rng.js) or call ordering in gameplay code.

## Reference files

| JS | C (upstream, illustrative) |
|----|----------------------------|
| [js/rng.js](../../js/rng.js) | `include/rng.h`, `src/rng.c` |
| [js/jsmain.js](../../js/jsmain.js) | `sys/unix/unixmain.c` entry |
| [js/isaac64.js](../../js/isaac64.js) | ISAAC64 in upstream |

## Exit criteria

- No intentional RNG calls outside logged wrappers for core channel.
- Documented decision for Lua/display channel implementation before special levels / hallucination ship.
