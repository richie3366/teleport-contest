# Review 3062 — 29a956c8f — four poly_gender clones deleted for the live export

- SHA: `29a956c8f` (cliffs head at the parent: `do_name.c`
  do_mgivenname, scen-extcmd-Healer-53250042 step 1103, @a1646cc4c)
- D-entry: D-4222; Ledger: beautiful ported; poly_gender ported
- `js/` diff: apply.js +1 −9, detect.js +1 −6, dokick.js +1 −6,
  sounds.js +1 −10

## Intent vs deliverable

Promise: polyself.c poly_gender returns 2 while the hero is in a neuter
or non-humanoid form (`:2148–2157`), and apply.c beautiful picks
«handsome» for anything but 1. JS beautiful called a local clone that
returned `flags.female ? 1 : 0`, so a polymorphed female hero refusing
to rename herself read «This beautiful creature…» where C says «This
handsome creature…». All four clones (apply, detect, dokick, sounds)
are deleted for the polyself.js export.

Diff: exactly that. Four `function poly_gender()` bodies are removed
(two of them carried a "neuter → 2 deferred" named omission), and four
import lines gain `poly_gender` from `./polyself.js`. Every one of these
files already imported polyself.js. No call site changed. The promise
matches the diff.

## Inventory

- poly_gender — js/polyself.js:890 (the export, unchanged); C
  polyself.c `:2148–2157`.
- beautiful — js/apply.js:670–680 (unchanged body); C apply.c
  `:995–1013`.
- Re-pointed call sites: apply.js:674–675 (beautiful), detect.js:2710
  (crystal-ball hallucination «babe»/«dude»), dokick.js:738 (sink kick
  `gend`), sounds.js:1685 / :1687 (MS_SEDUCE swval).
- Deleted symbols: the local `poly_gender` in apply.js, detect.js,
  dokick.js, sounds.js.

```text
$ node scripts/sym.mjs poly_gender
poly_gender      js/polyself.js:890   sync
$ grep -anE 'function poly_gender|poly_gender\s*=' js/*.js
js/polyself.js:890:export function poly_gender() {
```

No clone remains (sym prints no `ALSO … LOCAL CLONE(S)` line). The
export is sync, like the clones, so no `await` is needed at any site.

"Every C caller is live" claim: `csym --callers poly_gender` lists 13
sites. apply.c:1005/1006 → apply.js:674/675; detect.c:1275 →
detect.js:2710; do_wear.c:1002/1010 → do_wear.js:3171/3173;
dokick.c:1195 → dokick.js:738; mhitu.c:1948/1956 → mhitm.js:2184/2195;
polyself.c:360/445 → polyself.js:1138/1199; shk.c:5913 → shk.js:1922;
sounds.c:1115/1117 → sounds.js:1685/1687. Each of these JS files
imports poly_gender from polyself.js (checked with `grep -anw`).

## C ↔ JS fidelity

C polyself.c `:2148–2157`:

```c
if (is_neuter(gy.youmonst.data) || !humanoid(gy.youmonst.data))
    return 2;
return flags.female;
```

JS polyself.js:890–894:
`if (is_neuter(ptr) || !humanoid(ptr)) return 2; return flags.female ? 1 : 0;`
with `ptr = game.youmonst?.data`. The predicates are monsters.js
`is_neuter` (M2_NEUTER) and `humanoid` (M1_HUMANOID). Branch order is
identical.

beautiful: the CHA ladder (25 sublime, 19 splendorous, 16
beautiful/handsome on `== 1`, 14 winsome/amiable on `== 1`, 11 cute, 9
plain, 6 homely, 4 ugly, else hideous) matches C `:1003–1011` rung for
rung.

Call-site checks:

- sounds.c `:1115` `swval = (poly_gender() != mtmp->female) ? rn2(3) : 0`.
  JS compares against `mtmp.female | 0`. With the export, a neuter-form
  hero now gets 2 ≠ 0/1 and draws `rn2(3)` on the non-nymph seduction
  path, as in C. The clone could skip that draw: it is an RNG path, and
  this commit fixes it.
- sounds.c `:1117` `poly_gender() == 0`: a neuter form is now 2 and
  draws nothing, as in C.
- dokick.c `:1195` `gend` feeds the sink «dish washer» foocubus pick
  `(gend == 1 || (gend == 2 && rn2(2)))` (`:1229–1230`, JS
  dokick.js:775). The clone could never return 2, so it skipped that
  `rn2(2)` for a neuter-form hero: a second RNG path this commit fixes.
- detect.c `:1275` `== 1 ? "babe" : "dude"` now behaves as in C for
  neuter forms.

Residual risk, not a C-wrong: monsters.js `is_neuter(ptr)` dereferences
`ptr.mflags2` without `?.`. The clones never touched `youmonst.data`,
but the export throws if it is unset. u_init_misc sets it through
set_uasmon (u_init.js:1988–1994, C `:991–993`) before any of these
play-time callers can run, and mhitm/shk/do_wear
already called the export. Acceptable.

## Hallucinations / overclaim

None. The D-log's "four clones" matches the diff. "sounds.js's on an RNG
path" is true (the rn2(3) above). It undercounts: dokick's sink arm is
a second RNG path (rn2(2)), and the commit fixes that too. The commit closes the two clones'
self-declared named omissions ("neuter → 2 deferred") by deleting
them; it does not leave them as omissions.

## Density

A clone-for-export swap across every remaining clone of one C function,
driven by a measured row. That is the D-1849 remedy ("IMPORT the
export") applied fully. Right-sized.

## Verification

```text
$ node scripts/hidden-proxy.mjs verify do_mgivenname,beautiful,poly_gender --base 29a956c8f~1 --no-reach
verify do_mgivenname: baseline 29a956c8f~1 (scoreboard at a1646cc4c) — 1 session(s) blocked on it
  scen-extcmd-Healer-53250042: PASS
verify do_mgivenname: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
verify beautiful: 0 blocked (vacuous: not an owner)
verify poly_gender: 0 blocked (vacuous: not an owner)
```

D-log: frozen runner PASS (RNG 12921/12921, Screen 1113/1113), REACH-OK
×3, green 2/2, strict ×2, cohort 7/7, full 44/44, sweep 714
baseline-PASS 0 regressed (this covers the sounds.js RNG-path change).
The end-of-audit rescore re-checks the window.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
