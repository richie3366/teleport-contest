# Review 1647 — ea9e272a — `nhmd4.c` nhmd4_body whole-family port (D-2688)

Metadata: commit `ea9e272a`, D-2688, `js/` = one new file `js/nhmd4.js`
(272 insertions). No prior review claimed closed. Pops the brief-verified
`nhmd4_body` MISSING coverage row (removed from the queue in this commit,
observed in the queue diff).

## Intent vs deliverable

Subject promises: whole-family port of `nhmd4.c` behind `CRASHREPORT`
into a new C-home `js/nhmd4.js`. Diff actually adds: context factory
`new_nhmd4_context`, locals `md4F/md4G/md4H/rotl32/md4Step/md4Set/md4Get`,
exports `nhmd4_body/nhmd4_init/nhmd4_update/nhmd4_final`. Matches the
promise; no other `js/` touched.

## Inventory

New JS: `nhmd4_body` (js/nhmd4.js:75), `nhmd4_init` (:169),
`nhmd4_update` (:185), `nhmd4_final` (:218) — all sync exports
(`sym.mjs`: one line each, no clones elsewhere). No deleted or
re-pointed symbols, so no local-clone→import check applies.

## C ↔ JS fidelity

C locus: `nhmd4_body` `nhmd4.c:82–180` (csym, 99 L — whole body read),
`nhmd4_init` `:182–193`, `nhmd4_update` `:195–232`, `nhmd4_final`
`:234–287` (read upstream in-session), macros `F/G/H` `:43–45`,
`STEP` `:53–55`, `SET/GET` `:65–76`. Callers: all 4 intra-file sites
(`:223`, `:227`, `:250`, `:267`) wired same-file. No RNG in C — no
`rn2` walk needed.

Branch-by-branch confirm:

- `STEP`: C `:53–55` is `a += f(b,c,d) + x; a = ROTL(a,s)` with
  quint32 wrap. JS `md4Step` wraps the triple sum (`< 2^34`, exact)
  with `>>> 0` then rotates — identical. `F/G/H` are bitwise
  bijections mod 2^32; JS int32 intermediaries with `>>> 0` restore
  are exact.
- All 48 STEPs in C order with matching round constants
  (`0x5a827999` round 2, `0x6ed9eba1` round 3), matching `s`
  values, and matching round-3 `GET` index order
  (0,8,4,12 / 2,10,6,14 / 1,9,5,13 / 3,11,7,15). Confirm.
- `SET`: portable `#else` arm (`:69–75`) — JS `md4Set` replicates
  the LE assembly with `>>> 0` fixing the `<< 24` sign bit.
  Values equal the x86_64 direct-read arm for every input; `block`
  is unread after the body. The `#undef G` Lua note is correctly
  dropped (no Lua here). Confirm.
- Loop: C `do … while (size -= 64)` → JS `do … while ((left -= 64)
  !== 0)` with `return data.subarray(size)` for the C `return ptr`
  advance. Identical on the documented precondition (nonzero
  multiple of 64); both sides degenerate on `size = 0`, which no
  caller passes (`update` guards `>= 64`, `final` passes 64).
- `update`: lo mask `0x1fffffff` + carry (`:206–207`), `size >> 29`
  as `Math.floor(size / 0x20000000)` (`:208`), `used/free` arms,
  early-return copy, bulk `size & ~0x3f` call, tail copy (`:212–231`)
  — all in C order. Confirm.
- `final`: `0x80` pad, `free < 8` two-block arm, `free - 8` zero
  fill, `lo <<= 3` bit-length LE at `[56..63]`, LE result words,
  `memset(ctx,0)` tail (`:242–286`) — all in C order. Confirm.
  (`ctx.lo` is `< 2^29` at `:257`, so the quint32 shift never
  wraps; JS `<< 3 >>> 0` is exact.)
- `init` zeroes buffer/block though C leaves them uninitialized —
  unobservable (`update` writes before reading, body SETs before
  GETs) and deterministic. Not a divergence.

Diff grep: no FORCE/DIAG/seed/coordinate/fastforward. Module is
import-free (no imports at all) — Rule #2 clean by construction.
External consumer `report.c crashreport_init` (file/binary I/O:
`/proc/self/exe`, `readlink`, `execve`) is a named omission in the
D-log — legitimate Rule #2 class, own future row.

## Hallucinations / overclaim

None. The D-log's "values equal the x86_64 direct-read arm" is
true (LE assembly ≡ direct read on LE host). The bit-for-bit
standalone-C + RFC-1320 probes are cited as the independent
evidence with exact counts (25/25) — this is a no-RNG,
no-corpus-coverage function, so off-corpus differential testing
is the right oracle, not trace shaping.

## Density

272 insertions for one whole C file (body + init/update/final +
struct): within the 200–800 breadth-phase band. Not padded.

## Verification

D-log Verify pattern per siblings. Re-ran
`hidden-proxy.mjs verify nhmd4_body --base ea9e272a~1 --reach-all`:
"0 blocked (0 at baseline…)" — the vacuous note is properly
stated as such — plus "24 PASS, 0 regressed → REACH-OK". No
REGRESSED. Queue row cited 0 blocks, so the vacuous check is
honest, not a D-1831 case.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
