# Review 1504 — 23cb328e — objnam.c readobjnam_preparse (D-2545)

## Metadata

- SHA: `23cb328e`
- D-id: D-2545. Next index: 1504.
- Files: `js/readobjnam.js` (+359/−109: restart).
- C locus: `nethack-c/upstream/src/objnam.c:3964–4175`
  (`readobjnam_preparse`, staticfn, 212 L); caller gate
  `:4928` (`goto any`).

## Intent vs deliverable

Subject promises: whole body in C order (MISSING → live), thin
inline loop restarted, every arm + caller wired. Diff actually
adds: file-local `readobjnam_preparse` with all ~40 arms, the 11
init defaults, the `goto any` rewire, `strsubst`/`NEUTRAL`
imports on pre-existing edges. Promise matches deliverable.
RNG 2 (`wet` → `3 + rn2(3)`, `moist` → `rnd(2)`) — call-for-call
with C `:4025/:4027`.

## Inventory

- New: `readobjnam_preparse(d)` file-local (`js/readobjnam.js:718`
  — `sym.mjs` single local; C is `staticfn`, so file-local is
  correct).
- Changed: `readobjnam` body — inline loop replaced by
  `if (readobjnam_preparse(d)) return readobjnam_any(d)` ≡ C
  `:4928` `if (…) goto any;` (verified by direct read).
- Changed: 11 init defaults (`very`…`gsize`) per
  `readobjnam_init :3936–3956`; three stale comments refreshed.
- No deleted or re-pointed symbols → no clone→import audit needed.

## C ↔ JS fidelity

Walked the full C body against the port, arm by arm. Check
order preserved throughout (an/a/the, count, spe, bless
family, all 8 erodeproof words as separate branches with
per-word `l`, lit family, moist-before-wet split, unlabeled
family, poisoned, trapped/wizard, lock-state family with C's
asymmetric resets — open/closed leave `unlocked` untouched on
both sides — looted/disturbed overload, greased, zombifying,
very/thoroughly, eroded/eroded2 (`1 + very`, very reset, large
keeps very with `(very !== 1) ? 3 : 4`), halfeaten, historic,
diluted, empty→TIN_EMPTY, glob-guarded small/medium/large,
real/fake, gender trio, corpse/statue/figurine backtrack, else
break). Confirm on every arm; details that earned it:

- moist/wet: C checks "moist " first with the inner wet-test;
  JS splits into moist-first/wet-second branches with
  `rnd(2)` / `3 + rn2(3)` — same partition, same draws. Confirm.
- Gender + save_bp: C edits the shared buffer in place via
  case-sensitive first-occurrence `strsubst`; JS emulates as
  prefix + edited-tail. Traced "statue of a female gnome
  ruler" → "statue of a gnome ruler" both sides; `strsubst`
  (hacklib.js:278) verified case-sensitive-first-occurrence ≡
  C `:534–551`, so capitalized `Female ` sets mgend but stays,
  exactly as C. Confirm.
- Corpse arm: the `(match && (l = N)) || …` chain assigns the
  matched length in all three outcomes; a/an/the `more_l`
  handling ≡ C. Confirm.
- `strncmpi_start` verified case-insensitive (no regression vs
  the old `/i` regexes); `strstri` miss → null (glob guard
  `=== null` correct, case-insensitive ≡ C); `!d.bp` covers
  C's null-or-empty; `s !== '0'` ≡ `strcmp(…, "0")`; `l = 0`
  arms fall to the uniform slice tail ≡ C `bp += 0`. Confirm.

Downstream honesty (stated, not flagged): the newly parsed
fields the body does not yet apply (eroded/eroded2 zeroed at
the `:1535` tail, greased/unlabeled/diluted/very/gsize/islit
gaps, zombify timer, spinach/ftype) are each named in the
D-log + map + refreshed comments as future readobjnam/
postparse rows — the tin-D-2084 parse-now/apply-later split.
Old-covered prefixes are byte-identical preparse-level per the
/tmp 82-input probe (kept in /tmp); new arms move toward C
(wetness/ishistoric/mgend applications verified live at
:1391/:1423/:1109). Wishes never execute in the fortress (no
RNG-tagged reach both trees), so the probe + arm walk above is
the evidence, and it is cited as such.

Callee closure: `strsubst`/`strstri` live (hacklib.js);
`wizardMode`, `TIN_EMPTY`, `NEUTRAL`, `rn2/rnd` all live on
pre-existing edges. No clones, no stubs. Caller wired.

## Hallucinations / overclaim

None. "Every arm + caller wired" verified; the named
not-yet-applied fields are disclosed three times (D-log, map,
code comments), not sold as live.

## Density

One 212-line C function restarted + caller rewire, one file.
Right-sized per §2b (over the 250-insertion ceiling note, but
a restart of one function — density-correct, no padding).

## Verification

- D-log: syntax (1 file) · rule2 · hidden 0 blocked · smoke
  24/24 REACH-OK · green 2/2 + strict ×2 · cohort 7/7 →
  VERIFY: PASS, plus the /tmp 82-input preparse diff probe.
- Re-run here: `hidden-proxy.mjs verify readobjnam_preparse
  --base 23cb328e~1 --reach-all` → 0 blocked both trees
  (vacuous, honestly reported) + smoke 24 PASS, 0 regressed →
  REACH-OK. Matches.
- `imports.mjs --rulecheck`: clean. Diff grep: 0 hits for
  FORCE/DIAG/getRngLog/fastforward/seed names.

## Actionable C-wrongs

None. No Must-fix, no CURRENT change.

Verdict: **ACCEPT**
