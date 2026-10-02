# Review 2252 — 70dc5c4d5 — dropp guard + 11 break_armor rewirings

Metadata: SHA `70dc5c4d5fa78ed1ac3de09a9a7fe8bb68756b81` (D-3291,
2026-10-02). `js/polyself.js` only (new
module-local + 11 one-line rewires + doc).
One function whole: `dropp` (C
polyself.c:1122–1154, staticfn) + its full
caller closure.

Intent vs deliverable: subject promises the
invent-scan guard + all 11 rewirings. The
diff adds `dropp`, rewires 11 arms, retires
the "dropx is the dropp equivalent" doc
line, and deliberately leaves `drop_weapon`
untouched. Delivers what it promises.

Inventory:

- `async function dropp(obj)` (:1357):
  `game.invent` scan, `===` identity,
  `await dropx(obj)` + break. Same-file,
  no imports touched.
- 11 `dropx(` → `dropp(` rewires (:1408–
  1518: cloak×2, uarm, sliparm cloak,
  sliparm shirt, hornhelm, gloves, shield,
  helm, boots, blindf) — counted in the
  tree, all inside `break_armor` ✓.
- `sym.mjs dropp`: NOT EXPORTED, 1 local —
  correct for a C staticfn (not drift) ✓;
  `dropx js/do.js:2760 ASYNC`, awaited ✓.
  No symbol deleted or re-pointed.

**C ↔ JS fidelity**: body ≡ C :1122–1154:
`gi.invent` scan → array idiom (cf. mon.js
m_carrying), pointer `==` → `===`, dropx +
break, with the C re-link rationale (dropx→
dropy→dropz→place_object moves nobj onto
fobj) carried in the doc ✓. Async is forced
(dropx async in JS), single await ✓. No RNG
✓. Caller closure complete: C has exactly
11 `dropp(otmp)` sites, all in break_armor
(:1187–1299) ↔ the 11 JS rewires ✓. The
`drop_weapon` exclusion is C-faithful: C
:1343/:1350 call `dropx` directly with the
:1351–1354 note (levitation loss happens at
the drop, unlike Boots_off pre-dropx
disrobe) — confirmed at the cited lines;
JS :1329/:1336 correctly untouched ✓. The
guard fixes a real latent C-wrong (post-
disrobe piece taking the raw dropx path).

Hallucinations / overclaim: none. "No corpus
divergence — C-fidelity residual" disclosed;
no corpus PASS claimed.

Density: one whole 33-line C staticfn + its
11-call closure, one file ✓. `Ledger: dropp`
ported (per message; Verify sub-bullet ✓).

Verification: D-log Verify shows hidden-vacuous
+ smoke 24/24 + green/strict/cohort. Re-
measured (`verify dropp --base 70dc5c4d5~1
--reach-all`): `0 blocked` + vacuous note +
`smoke 24 PASS, 0 regressed → REACH-OK`.
Exact match; zero REGRESSED. Banned-pattern
grep: clean. Rule #2 clean (iteration-wide).

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
