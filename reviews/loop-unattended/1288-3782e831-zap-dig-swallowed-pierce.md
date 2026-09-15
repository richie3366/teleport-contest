# Review 1288 — 3782e831 — dig.c zap_dig swallowed-pierce arm (D-2322)

Metadata: SHA `3782e831`, D-2322, Open queue head (row cited 0 blocks). Method: `git show` full `js/` hunk (`js/dig.js` +30/−4); C `zap_dig dig.c:1547-1754`, swallowed arm `:1569-1582` (via `csym.mjs` full body + `--callers`); `sym.mjs` on `digests`/`expels`/`mbodypart`/`is_whirly`/`s_suffix`/`mon_nam`/`STOMACH`/`G_UNIQ`; `imports.mjs --can` ×2 + `--rulecheck`; added-lines banned-pattern grep (0 hits); `hidden-proxy verify zap_dig --base 3782e831~1` re-run.

## Intent vs deliverable

Subject promises: a dig beam zapped while swallowed pierces the swallower (digests-only pline), halves a unique's hp else floors it to 1, and expels the hero — replacing a silent early return. Diff delivers exactly that: the `u.uswallow` arm reads `u.ustuck`, gates on live `is_whirly`, prints the conditional pierce pline, applies the halve/floor, awaits live `expels`, then returns. Promise kept.

## Inventory

- `zap_dig` swallowed arm only (was `// pierce / expels deferred` + bare return).
- Import joins only, both ALREADY (verified): `is_whirly` + `G_UNIQ` join the existing `monsters.js` import; `STOMACH` joins the existing `const.js` import.
- `digests`/`expels` (mhitu.js) + `mbodypart` (polyself.js) via in-arm dynamic `import()` — the file's convention for caller-side modules.
- Docstring omit retired to the Hallucination draft only.

## C ↔ JS fidelity

Arm-for-arm vs C `:1569-1582`: `u.uswallow → mtmp = u.ustuck` ✓; `!is_whirly` gate skipping the whole arm including the return-bypass ✓; `digests → You("pierce %s %s wall!", s_suffix(mon_nam), mbodypart(STOMACH))` ✓ (JS `"You pierce …"` template ≡ C `You()` prefix); `unique_corpstat → (mhp+1)/2` else `mhp = 1` ✓; `expels(mtmp, data, !digests(…))` ✓; unconditional `return` after the `if (u.uswallow)` block ✓.

Three equivalences verified, not assumed: (1) `unique_corpstat` is `#define unique_corpstat(ptr) (((ptr)->geno & G_UNIQ) != 0)` (`mondata.h:174`, measured) — the JS `((geno|0) & G_UNIQ) !== 0` is exact. (2) C calls `digests()` twice (pline gate + expels arg); JS evaluates once into `digesting` — `digests` (`mhitu.js:1103`) is a pure `mattk` AT_ENGL/AD_DGST scan with no RNG and no writes, so single-evaluation is identical. (3) `(((mhp|0)+1)/2)|0` ≡ C `(mhp+1)/2` for the non-negative mhp of a live swallower.

Callee closure: `is_whirly`/`digests`/`expels`/`mbodypart`/`s_suffix`/`mon_nam` all LIVE exports; `expels` is ASYNC and awaited ✓, the three sync callees called without await ✓. The commit imports the live `digests` rather than adding a seventh clone (sym.mjs flags the pre-existing `mhitm.js:4441` clone — untouched here, not this commit's debt). No STUB in the live arm. The `mtmp &&` null guard is dead in practice (C dereferences unconditionally; uswallow implies ustuck) and is disclosed as throw-avoidance in both comment and D-log — a throw would be the worse forfeit class, so this is the right side to err on.

RNG walk: no `rn2/rnd/rn1/d` in any added line; `expels` draws fire in C order through the live callee.

Branch detail: C `You("pierce %s %s wall!", …)` ≡ JS `` `You pierce … wall!` `` via `pline` (`You()` only prepends "You "). `digests` (`mhitu.js:1103`) is a pure `mattk` AT_ENGL/AD_DGST scan — no RNG, no writes — so caching C's two calls into `digesting` is exact. `expels` is ASYNC (`mhitu.js:1697`) and awaited; `mbodypart` (`polyself.js:464`), `is_whirly` (`monsters.js:499`), `s_suffix`/`mon_nam` (`do_name.js:383/1025`) are sync and called bare. `s_suffix`/`mon_nam` were already imported (`dig.js:52`) — no seventh clone. The `mtmp &&` guard is dead in practice (C dereferences unconditionally; `uswallow` implies `ustuck`) and disclosed as throw-avoidance in comment and D-log; a throw would be the worse forfeit class. The halve formula only ever sees the live swallower's non-negative mhp, where `(((mhp|0)+1)/2)|0` ≡ C `(mhp+1)/2` (spot: mhp=1 → 1 both sides).

## Hallucinations / overclaim

None. "No corpus divergence — C-fidelity residual" is accurate (verify shows 0 blocked at baseline). The D-log's `is_whirly` gloss (vortex letter, air elemental — mondata.h:57) matches the imported predicate's domain, and the `monsters.js`/`const.js` joins were confirmed ALREADY (no new edge), so the no-TDZ-risk claim checks out rather than being asserted. The vacuous hidden note is explicitly labeled NOT a corpus PASS with the no-`--base`-owed reason stated (row cited 0 — confirmed by this review's re-run). Probe honesty holds (10/10 hand probe disclosed as deleted scratch, expels tail honestly noted as resting on the shipped callee).

## Density

+30/−4 for one 14-line C arm — small but C is that small (the whole arm is `:1569-1582`), so this clears the §2b small-C exception. One locus, one falsifier. Good.

## Verification

D-log: preflight clean-tree PASS, `verify --fn zap_dig` tail PASS (syntax/rule2/green 2/2/strict ×2/cohort 7/7) after the last `js/` edit with no D-1831 gap. Re-measured by this review:

```text
verify zap_dig: baseline 3782e831~1 (scoreboard at 775e5959) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches. Added-lines grep: 0 banned-pattern hits. `imports.mjs --rulecheck`: clean.

sym.mjs (this SHA — no deleted/re-pointed symbols, all joins verified LIVE):
`digests js/mhitu.js:1103 sync` (1 pre-existing clone elsewhere untouched),
`expels js/mhitu.js:1697 ASYNC` (awaited),
`mbodypart js/polyself.js:464 sync`, `is_whirly js/monsters.js:499 sync`,
`s_suffix js/do_name.js:383` / `mon_nam js/do_name.js:1025` (already imported).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
