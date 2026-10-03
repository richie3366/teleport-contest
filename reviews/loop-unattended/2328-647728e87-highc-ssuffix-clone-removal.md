# Review 2328 — 647728e87 — highc/s_suffix 4-clone removal

Metadata: SHA `647728e87`, D-3373, 4 coverage rows +
set_corpsenm stale pop. C `hacklib.c:75–79` +
`:344–359` (csym ranges). Stat: 5 js files (4 rewires
+ whitespace-only mkobj de-indent) + test header.

Intent vs deliverable: subject promises
"highc/s_suffix 4-clone removal (dokeylist/eat/zap/
mhitm → live exports) + set_corpsenm stale pop". Diff
actually: 2 import extensions + 4 clone deletions +
16 site renames + whitespace-only de-indent. Matches
promise.

Inventory: 4 clones deleted (dokeylist numeric `highc`,
`s_suffix_eat/_zap/_mm`) → 2 live **C callee** imports
(highc hacklib.js:455, s_suffix do_name.js:418); only
marker comments name the old clones now (grep: 3
marker lines, 0 definitions). No stub. mkobj hunk is
0 non-whitespace lines (`git show -w` count = 0) ✓.

C ↔ JS fidelity (highc): C `c&~040` on a–z else c.
Live export does exactly this on the first char,
returning a char. Deleted clone was numeric-domain
(`c-0x20` ≡ `c&~0x20` on a–z; `c&0xff` else). Site
adaptation `highc(di).charCodeAt(0)`: di is an sdir
ASCII code; a–z → di−0x20 both sides ✓; else di
both sides ✓. Equivalent at the single site.

C ↔ JS fidelity (s_suffix): live export is
line-equivalent to all three deleted clones
(strcmpi it→+s, you→+r, lowercase-'s'→+' else +'s),
which themselves mirror C :344–359 ✓. All 16
renamed sites (eat 4, zap 3, mhitm 9+) resolve to the
import — zap/mhitm imports pre-exist (:279/:134),
eat extended in-commit. No shadowing (clones had
distinct names).

C ↔ JS fidelity (set_corpsenm stale): sym.mjs now
resolves js/mkobj.js:2297 ✓; body covers the C
:1318–1367 shape (timers/oeaten/id/restart per the
in-file doc); callers wired (mhitm + 7 mklev sites
sampled). Stale pop legitimate; whitespace-only edit
changes no behavior.

Hallucinations / overclaim: none. "ALREADY ×4"
re-measured below as ALREADY ×4 ✓.

Density: 4-function clone-removal cluster + 1 stale
pop (same-iteration stale handling is the prescribed
shape ✓). Below the ~80 bar but the head's file held
exactly these 4 Open rows (D-3350–D-3360 precedent
cited) — the §2b exception as written. Each function
has D-log C-locus/Verify/Named + `Ledger:` ✓.

Verification: re-measured — `verify highc,s_suffix
--base 647728e87~1 --reach-all` → both "0 blocked" +
"smoke 24/24 → REACH-OK". Matches the D-log. Test
12/12 (CLONES 13→10). Diff grep: 0 banned hits.
`sym.mjs` + `--can` (required paste):

```text
highc            js/hacklib.js:455   sync
s_suffix         js/do_name.js:418   sync
--can dokeylist→hacklib, eat/zap/mhitm→do_name: ALREADY ×4
```

Actionable C-wrongs: none.

Verdict: **ACCEPT**
