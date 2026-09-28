# Review 2011 — 6f36d2ab4 — pay + check_credit + reject_purchase closure

Metadata: SHA `6f36d2ab4`, D-3051, js/shk.js only (+110/−70).

## Intent vs deliverable

Subject promises "shop-billing closure (credit-message arms)". Diff
actually restarts `check_credit` whole (both `pline_The` arms), re-points
`stolen_value`'s 14-line inline clone at the live export, awaits it in
`pay`/`pay_for_damage`, and cites `reject_purchase` per-arm plus a live
`SetVoice` no-op. Matches promise. Three-function same-file closure.

## Inventory

- `check_credit` (restarted, file-local js/shk.js:5335) — C shk.c:1277–1294.
- `pay` (restarted, file-local js/shk.js:5359) — C shk.c:1296–1313.
- `reject_purchase` (cited + SetVoice wired, file-local js/shk.js:5613)
  — C shk.c:2417–2451.
- Re-points: `stolen_value` :3821, `pay_for_damage` :5312; import adds
  `pline_The` to the existing display.js import (no new edge).

## C ↔ JS fidelity

`check_credit` vs C `:1277–1294` (csym range): `credit == 0` kept as the
`;` fallthrough shape :1283 ✓; `credit >= tmp → pline_The deducted,
credit -= tmp, tmp = 0` :1284–1287 ✓; else `pline_The partial,
credit = 0, tmp -= credit` :1288–1292 ✓; single `return tmp` ✓. The
fixed gap is real: both `pline_The` arms were dropped as "silent", and
the `stolen_value` inline clone used `pline('The …')` instead of C's
`pline_The("price is …")` call — now folded to the live export. Async
only via `pline_The` (async live js/display.js:7872, awaited at all
three call sites ✓).

`pay` vs C `:1296–1313`: `robbed` snapshot :1301 ✓; `tmp <= 0 ? tmp :
await check_credit` :1302 ✓; money2mon/money2u arms :1304–1307 ✓;
botl :1308 ✓; `Math.max(0, robbed - tmp)` ≡ `robbed -= tmp; if <0 →0`
:1309–1313 ✓. One named omit (invent-full dropy on money2u, pre-existing).

`reject_purchase` vs C `:2417–2451`: quan temp-swap :2423–2426 ✓;
`!Deaf && !muteshk` :2427 ✓; contained/which arms :2430–2434 ✓;
`SetVoice(shkp,0,80,0)` :2437 wired to the live no-op export
(js/sndprocs.js:52, already imported at shk.js:125 — no new edge) ✓;
verbalize/pline arms :2438–2447 ✓; quan restore :2449 ✓. The :2424
assert is dropped with a documented reason — both JS callers guard
`quan < bquan` (js/shk.js:5679, :5744, verified), so it holds by
construction. Legitimate.

Caller closure: all 6 C `pay` sites wired in JS (3096←:4181,
5687←:1881, 6080←:2288, 6085←:1885, 6127←:1919, 6150←:1937); both
`reject_purchase` sites wired (5680←:2280, 5745←:2355); `stolen_value`
re-point reads the same object (`eshkp = ESHK(shkp)` null-guarded at
:3247, `check_credit` re-derives it — identical). All three ported fns
are C staticfns, so file-local (sym "NOT EXPORTED") is correct, not drift.
No STUB in a live arm.

Ledger: `pay`/`reject_purchase` ported-partial context, `check_credit`
now whole — per-function entries present in the D-log. Holds.

## Hallucinations / overclaim

None. "imports.mjs --can ALREADY" checks out (display.js import
pre-existed; only a name was added to it).

## Density

3-function same-C-file closure, ~110 insertions — inside the 200–800
band's lower half but a genuine callee closure (head + unknown-status
callee carrying the real gap). OK.

## Verification

D-log cites verify.mjs `--fn pay,check_credit,reject_purchase` → PASS +
hidden note ×3 + REACH-OK ×3 + green/strict/cohort. Re-measured in one
call with all three functions: 0 blocked at baseline and now for each
(vacuous, as stated — coverage rows); smoke 24/24 PASS each → REACH-OK,
no regressions. Diff grep: no FORCE/DIAG/RNG-log reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
