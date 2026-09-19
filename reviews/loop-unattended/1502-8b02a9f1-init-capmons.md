# Review 1502 — 8b02a9f1 — rumors.c init_CapMons (D-2543)

## Metadata

- SHA: `8b02a9f1`
- D-id: D-2543. Next index: 1502.
- Files: `js/objnam.js` (+134/−, restart).
- C locus: `nethack-c/upstream/src/rumors.c:825–935`
  (`init_CapMons`, 111 L), `:938–953` (`free_CapMons`, 16 L),
  `:806` (`CapitalMon` loop bound).

## Intent vs deliverable

Subject promises: whole `init_CapMons` in C order (THIN → live),
two-pass + counts + new `free_CapMons`, C caller wired. Diff
actually adds: the two-pass restart with `CapMonstCnt/BogonCnt/
Siz` module counters, exported `free_CapMons`, and the
`CapMonSiz - 1` CapitalMon bound. Promise matches deliverable.
RNG 0; none added.

## Inventory

- Changed: `init_CapMons` file-local restart (`js/objnam.js:1523`
  — `sym.mjs` reports it as the single local; C declares it
  `staticfn`, so file-local is correct, not a clone).
- New: `free_CapMons` exported sync (`js/objnam.js:1508`,
  single hit).
- Changed: `CapitalMon` loop bound only.
- No deleted or re-pointed symbols → no clone→import audit needed.

## C ↔ JS fidelity

C `:825–935` vs JS, in order: `:833` dlb_fopen → embed-as-lines
with missing-embed ≡ NULL handle (D-0477 adaptation, disclosed);
`:834–836` sanity `free_CapMons()`; `:841` pass loop with `:849`
count reset each pass; `:852–866` mons gather (G_UNIQ +
the_unique_pm gate, mgend loop, `*nam != lowc(*nam)` ≡
`nam[0] !== toLowerCase()`); `:871–897` bogus gather (rewind
folded into re-iteration — equivalent on a static embed; header
skip folded into the extractor; newline-strip folded into the
split; code split `:885–888`; capitalized + `!bogon_is_pname`
gate `:890`; dupstr folded — JS strings immutable);
`:899–908` pass finish (CapMonSiz+alloc, null terminator,
fclose no-op); `:913–932` DEBUG dump named compiled out.
`free_CapMons` matches C `:938–953` (release linkage,
CapMonSiz=0, counts keep stale values per C `:952`). Confirm.

Embed equivalence verified here, not trusted: makedefs
`do_rnd_access_file` (util/makedefs.c:1108–1133) writes
Dont_Edit_Data + default entry + non-`#`/non-blank xcrypt+pad
lines — exactly what the extractor builds (extract-bogusmon.py:
default first, `#`/`\n` skipped), so C's skip-line-1 and JS's
header-free buffer process the same sequence, default entry
included on both sides. Two-pass determinism holds (static
embed, no inter-pass mutation). `CapitalMon` bound `i <
CapMonSiz - 1` matches C `:806` (verified by direct read);
the trailing null is skipped, no holes (counts deterministic).
Pre-existing helpers (`xcrypt_objnam`, `unpadline_objnam`,
`bogon_is_pname_objnam`, `BOGON_CODES`) untouched — review-319
debt stands, no new edge. Nit (comment-only, not a C-wrong):
the `free_CapMons` JSDoc header cites `:938–954` but csym ends
the body at `:953`.

Callee closure: everything file-local or const; omits (save.c
freedynamicdata caller, DEBUG dump, dlb_ folded into the embed)
each named with locus/reason. No STUB in any live arm.
Caller: C's caller CapitalMon (`:802`) → JS `CapitalMon`
still lazily inits. Confirm.

## Hallucinations / overclaim

None. The one place the port differs structurally (embed vs
dlb handle) is disclosed with the D-0477 pointer, and the
equivalence was re-verified above.

## Density

One 111-line C function + 16-line sibling + one loop-bound fix,
one file. Right-sized per §2b.

## Verification

- D-log: syntax (1 changed) · rule2 · hidden note (0 blocked) ·
  smoke 24/24 · green 2/2 · strict ×2 · cohort 7/7 · full skipped
  → VERIFY: PASS.
- Re-run here: `hidden-proxy.mjs verify init_CapMons --base
  8b02a9f1~1 --reach-all` → 0 blocked both trees (vacuous note,
  honestly reported) + smoke 24 PASS, 0 regressed → REACH-OK.
  Matches.
- `imports.mjs --rulecheck`: clean. Diff grep: 0 hits for
  FORCE/DIAG/getRngLog/fastforward.

## Actionable C-wrongs

None. No Must-fix, no CURRENT change.

Verdict: **ACCEPT**
