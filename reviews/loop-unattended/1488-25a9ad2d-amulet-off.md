# Review 1488 — 25a9ad2d — do_wear.c Amulet_off (D-2529)

## Metadata

- SHA: `25a9ad2d`
- D-id: D-2529. Next index: 1488.
- Files: `js/do_wear.js` (122-line restart), `js/steal.js` (+10 wire).
- C locus: `nethack-c/upstream/src/do_wear.c:1089–1189` (`Amulet_off`,
  101 L).

## Intent vs deliverable

Subject promises: whole `Amulet_off` in C order (PARTIAL → live) + the
`steal.c:264–265` caller wire. Diff actually adds: restarted `Amulet_off`
(`js/do_wear.js:2644`), a one-line `is_pool_or_lava`, import words, and
the steal wire (retiring that omit). Promise matches deliverable.

## Inventory

- Changed: `Amulet_off` (restart, exported async — `await`ed at both
  in-file call sites `:1574/:1923` and the new steal site).
- New: `is_pool_or_lava` (file-local one-liner ≡ C `dbridge.c`
  `is_pool||is_lava`; 4th same-shaped file-local after dig/eat/trap —
  named, trivial predicate, no JS export exists).
- Changed: steal `W_AMUL` arm (`js/steal.js:265`) — stand-in
  `setworn(null, W_AMUL)` replaced by `await Amulet_off()`.
- No symbol deleted or re-pointed; no clone→import paste owed.

## C ↔ JS fidelity

`csym.mjs` body `:1089–1189` printed above. Walk:

- `:1092–1095` amul save + `takeoff.mask &= ~W_AMUL` (via file-local
  `takeoff_info`). `if (!amul) return;` is extra defensive JS (C would
  dereference) — unreachable via real callers, prevents a throw. Noted,
  not a divergence. Confirm.
- `:1098–1105` ESP: early setworn + off_msg + `see_monsters`
  (all sync except `off_msg`, awaited). Confirm.
- `:1106–1112` six no-op amulets: bare `break`s. Confirm.
- `:1113–1133` BREATHING: early off + message order, `Underwater` ≡
  `u.uinwater`, `!cant_drown(data) && !hero_Swimming()` (`cant_drown`
  LIVE `js/mon.js:2273`; `hero_Swimming` LIVE `js/dbridge.js:344` ≡
  `youprop.h:266` H||E||steed-swimmer plus uprops mirrors), `mkn`,
  `await drown()` (LIVE async `js/trap.js:6127`, C `(void)` discard),
  `region_danger()` LIVE (`js/region.js:1090`). Confirm.
- `:1134–1148` STRANGULATION: early off; `Strangled` ≡
  `uprops[STRANGLED].intrinsic` (`youprop.h:110`); the extra
  `u.Strangled` disjunct/clear mirrors this file's `Amulet_on`
  convention (`:2542/:2547` set both; botl/display/do/apply read both —
  repo-wide), so test-and-clear of both is the consistent choice.
  Breathless-gated constricted/easier messages (`hero_Breathless`
  LIVE), botl pair, `mkn`. Confirm.
- `:1149–1154` RESTFUL_SLEEP: early setworn, FROMOUTSIDE-safe TIMEOUT
  clear gated on `!(ESleepy-mirror || uprops[SLEEPY].extrinsic)` and
  `!(HSleepy & ~TIMEOUT)` — exact shape (mirrors per the file's
  convention; `TIMEOUT` LIVE const). Confirm.
- `:1155–1175` FLYING: `was_flying` captured before removal via
  pre-existing `amulet_flight_now()` (`:2614`, the documented Flying OR —
  reused, not a new clone), early off, `float_vs_flight()` (LIVE sync),
  land/stop-flying select via `is_pool_or_lava`/`Is_waterlevel`/
  `Is_airlevel`, `mkn`, `await spoteffects(true)` (LIVE async). Confirm.
- `:1176–1180` GUARDING `find_ac()` (LIVE `js/u_init.js:1336`) / YENDOR
  no-op (+ harmless JS `default: break`). Confirm.
- `:1183–1188` trailing setworn + conditional off_msg + `makeknown`
  (LIVE `js/invent.js:4012`). Confirm.
- Async audit: every call matches its signature (sync: setworn,
  see_monsters, find_ac, makeknown, float_vs_flight, region_danger,
  cant_drown, hero_*; async+awaited: off_msg, drown, spoteffects). No
  missing await, no fire-and-forget. No RNG in C; none in JS.
- Caller: C `steal.c:264–265` (`W_AMUL → Amulet_off()`) → JS identical
  guard + `await Amulet_off()`; edge ALREADY. Confirm.

Callee closure: all new words LIVE (`Your`/`NECK`/consts,
`hliquid`, `body_part`, `drown`, `cant_drown`, `hero_Swimming`,
`hero_Breathless`, `is_pool`/`is_lava`); `--can do_wear.js dbridge.js`
and `--can steal.js do_wear.js`: ALREADY. No STUB in any live arm;
omits: none in this body.

## Hallucinations / overclaim

None. The "SAFE dbridge edge" claim re-verified as ALREADY (pre-existing
static import). The `u.Strangled` mirror could read as scope creep, but
the on-arm at `:2542–2550` proves it is this file's convention, and the
off-arm is symmetric with it.

## Density

One 101-line C function + its one missing caller wire, two files that
already import each other. Right-sized per §2b.

## Verification

- D-log: syntax (2 changed) · rule2 · hidden note (0 blocked) · smoke
  24/24 · green 2/2 · strict ×2 · cohort 7/7 · full skipped (no shared
  file changed) → VERIFY: PASS.
- Re-run here: `hidden-proxy.mjs verify Amulet_off --base 25a9ad2d~1
  --reach-all` → 0 blocked at baseline and working tree (vacuous note,
  honestly reported — the row cited no blocks) + smoke 24 PASS,
  0 regressed → REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate logic.

## Actionable C-wrongs

None. No Must-fix, no CURRENT change.

Verdict: **ACCEPT**
