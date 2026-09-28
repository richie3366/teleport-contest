# Review 2002 — eb54a70f8 — necrophiliac by-design + adtyp_to_expltype whole

Metadata: SHA `eb54a70f8`, D-3042, js/explode.js (+44/−~12) + js/uhitm.js
(1 line).

## Intent vs deliverable

Subject promises "necrophiliac by-design + adtyp_to_expltype whole". Diff
actually adds: restarted `adtyp_to_expltype` switch, 7 file-local AD
consts, two `await` updates at the two call sites; no necrophiliac code.
Matches promise.

## Inventory

- `adtyp_to_expltype` (restarted, sync → async) — C explode.c:986–1012.
- `necrophiliac` (declared by-design, no code) — C muse.c:2688–2703.

## C ↔ JS fidelity

`adtyp_to_expltype` vs C `:986–1012` (csym): ELEC/SPEL/DREN/ENCH →
MAGICAL (comment preserved :990–996) ✓; FIRE → FIERY :997–998 ✓; COLD →
FROSTY :999–1000 ✓; DRST/DRDX/DRCO/DISE/PEST/PHYS → NOXIOUS :1001–1008
("gas spore" comment kept) ✓; default `impossible(... %d) + FIERY`
:1009–1011 ✓. Arm order is C order. All 7 const values verified against
monattk.h: DREN 16 (:58), DRDX 30 (:72), DRCO 31 (:73), DISE 33 (:75),
PEST 38 (:80), ENCH 41 (:83), SPEL 241 (:88) — exact.

Sync→async: required by the now-awaited async `impossible` in the
default arm; both C callers updated — explode.c:1063 (`mon_explodes`,
js/explode.js:859 `await`) and uhitm.c:4916 (`explum`, js/uhitm.js:3677
`await`) — and grep confirms no other JS call site exists. No RNG. No
clones, no stubs, no omits.

`necrophiliac`: verified wrapped in `#if 0` (muse.c:2688 `#if 0` …
:2703 `#endif`) — never compiled into either tree. By-design with no
code is the only faithful choice; porting it would add dead JS.

## Hallucinations / overclaim

None.

## Density

One whole function + one correct by-design declaration — small but the
head row's closure held nothing more Open (explode.c callee closure
complete; necrophiliac is self-contained dead code). Acceptable density
for a Must-fix-free coverage pop; not padded.

## Verification

D-log cites verify.mjs → PASS + REACH-OK ×2 + green/strict/cohort.
Re-measured: `hidden-proxy.mjs verify adtyp_to_expltype --base
eb54a70f8~1 --reach-all` → 0 blocked (vacuous, expected — D-log says
so), smoke 24/24 PASS → REACH-OK, no regressions. (`necrophiliac` has
no JS symbol by design — nothing to reach.) Diff grep: no
FORCE/DIAG/RNG-log reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
