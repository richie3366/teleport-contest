# Review 1485 — dec0bcad — exper.c losexp whole body + trap wire (D-2526)

## Metadata

- SHA: `dec0bcad`
- D-id: D-2526. Next index: 1485.
- Files: `js/exper.js` (118-line restart), `js/trap.js` (+16 caller wire).
- C locus: `nethack-c/upstream/src/exper.c:206–291` (`losexp`, 86 L).

## Intent vs deliverable

Subject promises: whole `losexp` in C order (PARTIAL → live) + the
`trap.c:4294` caller wire. Diff actually adds: restarted `losexp` with
`:line` cites, deletion of the divergent local clone, four live imports,
and the trap floor-path gate. Promise matches deliverable.

## Inventory

- Changed: `losexp` (restart, exported async — `sym.mjs: js/exper.js:295
  ASYNC`; trap site awaits it).
- Deleted: local clone `resists_drli_you` from `exper.js` (re-pointed to
  the live import — `sym.mjs` pastes below, as required).
- Changed: `dofiretrap` floor path (`js/trap.js:4700`).
- Removed import words: `is_undead/is_demon/is_were/is_vampshifter/ismnum`
  (clone-only); added: `minuhpmax` (attrib), `resists_drli` (zap),
  `monhp_per_lvl` (makemon), `rehumanize` (polyself), `losexp`/`setuhpmax`/
  `minuhpmax`/`Drain_resistance` (trap side).

Required `sym.mjs` pastes (deleted clone → import):

- `resists_drli` → `js/zap.js:3715 sync` (LIVE; D-2518 closed its
  `defended(AD_DRLI)` gap, review 1477 ACCEPT).
- `resists_drli_you` → `NOT EXPORTED — 1 LOCAL CLONE in js/polyself.js:681`
  (a *different* function: takes `mdat`, serves `set_uasmon` fromform
  propsetting with its own C-ref and named `defended` omit — pre-existing,
  out of this row; noted, not queued).
- `minuhpmax` → `js/attrib.js:317 sync`; `monhp_per_lvl` →
  `js/makemon.js:964 sync`; `rehumanize` → `js/polyself.js:961 ASYNC`
  (awaited); `setuhpmax` → `js/exper.js:105 sync` (same-file);
  `Drain_resistance` → `js/zap.js:599 sync`.

## C ↔ JS fidelity

`csym.mjs` body `:206–291` printed above. Walk:

- `:212–217` `#levelchange` null vs `resists_drli(&gy.youmonst)` return:
  clone replaced by the live import — the clone's documented gap
  (no `defended(AD_DRLI)` walk) is gone at this site. Real fix. Confirm.
- `:219–224` Goodbye message with the level-1/drainer suppression shape:
  re-cited, unchanged semantics. Confirm.
- `:226–231` level loss + `adjabil` + livelog (SoundAchievement named —
  no SND_LIB, same as pluslvl). Confirm.
- `:232–245` level-1 fatal (`KILLED_BY` + drainer, `done(DIED)`,
  Lifesaved-returns-continue per D-1894) else `uexp = 0` + chronicle;
  `:240–243` fuzz early-return kept with the pointer-vs-value note
  (C `killer.name != drainer` is a pointer check; JS string compare is
  its value equivalent). Confirm.
- `:249–261` tail: `olduhpmax`, `minuhpmax(10)` LIVE (`attrib.c:1145–1152`
  ≡ `max(ulevel, max(altmin,1))` — the old `Math.max(ulevel,10)` happened
  to match for n=10; the import is exact for all n), `uhpinc` strip, both
  `setuhpmax(...,true)` clamps (old code assigned directly — real fix;
  the no-rise rationale comment carried). Confirm.
- `:263–280` uhp/uen clamps + `newuexp(ulevel)-1`: unchanged arithmetic,
  re-cited. Confirm.
- `:282–288` Upolyd `monhp_per_lvl` strip + `rehumanize` (was a named
  omit — now live; `Upolyd(u)` is the `:3183` const.js form). Confirm.
- `:290` botl → `flags.botl + disp.botl` (`:364–366`). Confirm.
- No RNG in C body; none added.
- Trap wire vs `trap.c:4285–4297`: `minuhpmax(1)` (old hardcoded 1 —
  real fix for high-level heroes), `olduhpmax`, `d(2,4)`/rn2 burn lines
  untouched (pre-existing, order kept), `setuhpmax(min(olduhpmax,uhpmin),
  false)` + `!Drain_resistance()` → `await losexp(null)`, uhp clamp +
  botl after. Matches C arm for arm. Confirm.

Callee closure: all new words LIVE, `--can exper.js zap.js resists_drli`
and `--can trap.js exper.js losexp` both ALREADY (same 95-module SCC,
hoisted functions). No STUB in any live arm. Callers: the D-log accounts
all 9 C sites (artifact/attrib-`#if 0`/mhitu/pray/sit/trap/uhitm/wizcmds/
zap) — pre-existing wires kept, `attrib.c:261` correctly unwired (C never
compiles it), trap newly wired. No wiring from a site C never calls from.

## Hallucinations / overclaim

None. The "local clone + now-unused import words removed" claim verified
in the diff (`-function resists_drli_you`, `-is_undead/is_demon/…`).
The SAFE/ALREADY edge claim re-verified here.

## Density

One 86-line C function + its one missing caller gate, two files that
already import each other. Right-sized per §2b.

## Verification

- D-log: syntax (2 changed) · rule2 · hidden note (0 blocked) · smoke
  24/24 · green 2/2 · strict ×2 · cohort 7/7 → VERIFY: PASS.
- Re-run here: `hidden-proxy.mjs verify losexp --base dec0bcad~1
  --reach-all` → 0 blocked at baseline and working tree (vacuous note,
  honestly reported — the row cited no blocks) + smoke 24 PASS,
  0 regressed → REACH-OK. Matches.
- Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate logic.

## Actionable C-wrongs

None. No Must-fix, no CURRENT change.

Verdict: **ACCEPT**
