# Review 2063 — 5b7eef822 — makemon.c mongen/furies/mextra cluster

- SHA: `5b7eef822` (D-3103)
- Subject: "makemon.c breadth cluster: mongen-order comparator/dump + furies whole, 5 verified-complete declarations (coverage)"
- js/ insertions: ~120 (makemon.js +87, restore.js +21, attrib/earlyarg arms)
- Prior index: 2062; queue Must-fix at review time: empty

## Intent vs deliverable

Promise: port the MISSING makemon.c head `check_mongen_order` (or
declare it), port same-file `cmp_init_mongen_order` / `dump_mongen` /
`summon_furies` / `init_mextra` with live C users wired, restart THIN
`newmextra`, and verify-complete `m_initgrp` / `m_initthrow` /
`temperature_shift`.

Diff actually adds: whole-function by-design for the head, extracted
comparator wired into the sort, `dump_mongen` + `summon_furies`
exports with earlyarg/attrib arms wired live, init/newmextra
alloc+init pair, cite-only comments on the verified trio. Matches the
promise; no extra scope.

## Inventory

Per-function (cluster of 9, all makemon.c):

- `check_mongen_order` — no JS symbol. C makemon.c:1782–1802, whole def
  inside `#if (NH_DEVEL_STATUS != NH_STATUS_RELEASED)` (:1779–1803).
- `cmp_init_mongen_order` (makemon.js:834, file-local ≡ staticfn) —
  C :1759–1777. Whole body; wired at the :859 sort call site.
- `dump_mongen` (makemon.js:879, export) — C :1834–1866. Whole body;
  wired at earlyarg.js:285 (ARG_DUMPMONGEN).
- `summon_furies` (makemon.js:907, export) — C :2604–2612. Whole body;
  wired at attrib.js:815 (helm-on arm).
- `init_mextra` (restore.js:38, file-local ≡ staticfn) — C :1058–1063.
  Whole body; sole caller newmextra.
- `newmextra` (restore.js:46, export) — C :1065–1073. Restarted as
  alloc+init+return.
- `m_initgrp` (makemon.js:3251) — C :78–145. Comment-only; body verified.
- `m_initthrow` (makemon.js:2304) — C :147–158. Comment-only; verified.
- `temperature_shift` (makemon.js:536) — C :1640–1648. Comment-only.

Helpers: all LIVE — mons/monsym/raw_printf (display edge extended, no
new edge), mk_gen_ok, makemon, pm(), MLET_ORD (frozen table),
peace_minded/enexto_gpflags/set_malign, mksobj/rn1/weight/mpickobj,
pm_resistance. No clones, no stubs, no deleted symbols (`sym.mjs`
re-point check not triggered).

## C ↔ JS fidelity

`check_mongen_order`: decl+def guarded at :1779 (`#endif` :1803), both
call sites (:1822, :1826) likewise gated, patchlevel.h:33 sets
NH_DEVEL_STATUS=RELEASED. Never compiled in either tree — by-design
with zero JS is the only correct port. Ledger `by-design`. Confirmed.

`cmp_init_mongen_order`: `#if 0` +99 arm cited compiled-out, live
offsets 0; key `(difficulty+0)|(mlet<<8)` → JS
`(p?.difficulty ?? 0) | ((MLET_ORD[p?.mlet] ?? 0) << 8)`. Proved exact:
C `mlet` is the class *index* (`char mlet`, S_ANT=1/S_ANGEL=27/S_HUMAN=53
per defsym.h:270) and MLET_ORD holds the identical indices — not char
codes, so no lowercase/uppercase inversion. `|| i1 - i2` tiebreak is
pre-existing at the call site (C qsort ties are implementation order;
port pins ascending mndx, fortress-held, full 44/44 exact). Extraction
is verbatim from the old closure — zero behavior delta by construction.

`dump_mongen`: header, LOW_PM..SPECIAL_PM loop, MONSi≡monSi, special
mask, class-change guard (raw_print sink dropped, named), `PM_%s%s`
name with last-row comma rule, C-exact widths (`%*s`/-27 → padEnd(27),
`%c`' '/'.', `%3d`/`%2d` → padStart, `%d` maxf, 4-way special suffix).
Name source proved: monsdump nm is `#bn` (monsters.h:12, e.g.
"GIANT_ANT") and JS prints `PM_` + monsterNames slice(3) — identical
strings from the same enum. monsym ≡ MLET_CH default sym
(def_monsyms[].sym). Named omits (monst_globals_init, 3 raw_print
sinks, freedynamicdata) each cited with reason; ledger `partial`.

`summon_furies`: `pm('ERINYS')` ≡ PM_ERINYS (indexOf `PM_ERINYS`);
`mk_gen_ok(erinys, G_GONE, 0) && (i < limit || !limit)` loop with
makemon at u.ux/u.uy MM_ADJACENTOK|MM_NOWAIT + i++ — verbatim.
Callers: sole C caller attrib.c:1348 → JS attrib.js:815 with C's arg
expression `Is_astralevel(u.uz) ? 0 : 1`. Exact.

`init_mextra`/`newmextra`: `*mex = zeromextra` (all-NULL) ≡ `{}` under
absent-keys-are-NULL; corpsenm=NON_PM live; alloc+init+return shape
exact. 9 cross-file C callers keep the pre-existing `{}` idiom —
named (ledger `partial`), not silent; unifying them is 9 new edges,
correctly out of cluster.

`m_initgrp` (verified, body read in full): rnd(n), Math.trunc tuning
divide (C integer division, exact for positive), `!cnt→1`, peace_minded
continue, enexto_gpflags→makemon(mmflags|MM_NOGRP), mpeaceful=0 /
mavenge=0 / set_malign — exact. HPUX/DGUX blocks (:87–104/:107–112/
:115–120) compiled out — the `#if` conjunction needs predefined
HPUX/DGUX macros, never defined on contest builds. Correct.

`m_initthrow` (verified): mksobj(otyp,TRUE,FALSE), quan=rn1(oquan,3),
owt=weight, ORCISH_ARROW→opoisoned, mpickobj — exact. 13 C sites in
m_initweap → 14 `m_initthrow(` hits in makemon.js incl. the definition
(counted). Exact.

`temperature_shift` (verified): `!temp→0` else pm_resistance(ptr,
temp>0 ? MR_FIRE : MR_COLD) ? 3 : 0 — exact.

New edges: commit claims `imports.mjs --can` hung and substitutes
manual analysis — my re-check returns instantly for both: `ALREADY:
attrib.js already statically imports makemon.js` and `ALREADY:
earlyarg.js already statically imports makemon.js`. No new module
edge exists; no cycle question at all. The hang story is moot.

Diff grep: no FORCE/DIAG/getRngLog/seed/fastforward/coordinates.

## Hallucinations / overclaim

None material. "Whole body" claims hold per function above; the manual
cycle analysis is unnecessary rather than wrong (both edges pre-exist).

## Density

Breadth-phase cluster: 9 functions ≤ 10, one C file (makemon.c),
~120 js/ insertions. Each function has its own Inventory block, its
own `Ledger:` entry (by-design/ported×6/partial×2 — all 9 confirmed in
makemon.c.jsonl), and its own Verify line. No bundled Must-fix.
Per-function verdicts: check_mongen_order ACCEPT (by-design);
cmp_init_mongen_order ACCEPT; dump_mongen ACCEPT; summon_furies
ACCEPT; init_mextra ACCEPT; newmextra ACCEPT; m_initgrp ACCEPT;
m_initthrow ACCEPT; temperature_shift ACCEPT.

## Verification

Re-measured at this SHA (`--base 5b7eef822~1 --reach-all`, one call,
all 9): 0 blocked at baseline and working tree for every function,
vacuous notes printed; smoke 24/24 REACH-OK for the 7 cold functions;
`m_initgrp` 147/147 and `m_initthrow` 153/153 baseline-PASS reach →
REACH-OK — stronger than the D-log's 80-run spread (comment-only
diffs, regression definitionally impossible, but now proved anyway).
No REGRESSED session. Shared gates per D-log: syntax, rule2, green
2/2, strict ×2, cohort 7/7, full 44/44 exact (auto: shared file).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
