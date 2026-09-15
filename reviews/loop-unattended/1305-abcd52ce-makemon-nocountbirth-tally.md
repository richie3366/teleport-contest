# Review 1305 — abcd52ce — makemon.c makemon MM_NOCOUNTBIRTH born tally (D-2339)

Metadata: SHA `abcd52ce`, D-2339, C-fidelity residual (queue row cited 0 blocks). Method: `git show` full `js/` hunk (`js/makemon.js` +10/−1); C `makemon :1150-1160` (countbirth) + `:1204-1233` (ptr/random arms + propagate site) + `propagate :957-982` full body (via `csym.mjs`); `sym.mjs` on `propagate` (same-file sync) + `MM_NOCOUNTBIRTH` (const 0x4 ≡ `hack.h:1149`); JS `makemon :3040-3116` region + JS `propagate :1477-1501` body read; Medusa explicit-tally pair (`mklev.js:3012-3013`) confirmed pre-existing; `imports.mjs --rulecheck`; added-lines banned grep (0 hits); `hidden-proxy verify makemon --base abcd52ce~1` re-run (stronger than the D-log's `--fn mongone`).

## Intent vs deliverable

Subject promises `countbirth` + `propagate(mndx, countbirth, FALSE)` at C `:1233`, restoring born tallies / unique extinction / mbirth_limit auto-extinguish and making NOCOUNTBIRTH births distinguishable. Diff delivers the const + call, nothing else. Promise kept exactly.

## Inventory

- `MM_NOCOUNTBIRTH` joins the const.js import (value 0x4 ≡ C).
- `const countbirth = (mmflags & MM_NOCOUNTBIRTH) === 0` at the other mmflags locals (C `:1160` position among `anymon/byyou/allow_minvent/allowtail`).
- `propagate(ptr.mndx, countbirth, false)` after the random arm closes, before newmonst (C `:1233` position).

## C ↔ JS fidelity

`countbirth` ≡ C `:1160` char-for-char ✓. Call site ≡ `:1233`: both arms converge with mndx known (`ptr.mndx` is the file's index invariant, cf. `mons(mndx)` usage), every early `null` above (rndmongen, goodpos, occupied, rndmonst-fail) returns before the tally exactly as C's failures never reach `:1233` ✓. Named omit `:1204-1212` (G_GENOD veto + wizard debugpline) is genuine and named with its own-row trigger ✓.

`propagate` (same-file, pre-existing) verified arm-for-arm vs `:957-982`: gone/result, UNIQ-minus-HIGH_CLERIC extinct, `born<255 && tally && (!ghostly||result)` increment, lim/NOGEN/EXTINCT gate ✓. RNG-free both sides (C's only extra is a wizard debugpline) → "RNG-neutral" true, not asserted. The Medusa accept-loop explicit `propagate(wastyp,TRUE,FALSE)` + reject-loop born-neutrality now form exactly C's skip-plus-explicit pair ✓.

Cited C loci (`makemon.c`, via `csym.mjs`):

```c
/* :1156-1161 locals */
boolean femaleok, maleok,
        anymon = !ptr,
        byyou = u_at(x, y),
        allow_minvent = ((mmflags & NO_MINVENT) == 0),
        countbirth = ((mmflags & MM_NOCOUNTBIRTH) == 0),
        allowtail = ((mmflags & MM_NOTAIL) == 0);
/* :1203-1212 ptr arm (named omit — NOT ported here) */
if (ptr) {
    mndx = monsndx(ptr);
    if (svm.mvitals[mndx].mvflags & G_GENOD)
        return (struct monst *) 0;
    if (wizard && (svm.mvitals[mndx].mvflags & G_EXTINCT)) {
        debugpline1("Explicitly creating extinct monster %s.", ...);
    }
} else {
    /* ... rndmonst()/goodpos loop, NULL early-return ... */
    mndx = monsndx(ptr);
}
/* :1233 the shipped line */
(void) propagate(mndx, countbirth, FALSE);
mtmp = newmonst();
```

JS (`makemon.js:3040-3116`, read in full): `countbirth` sits among the same locals in the same relative order (anymon/byyou/allow_minvent/countbirth/allowtail — gpflags interleaved per file convention) ✓; the rndmongen/goodpos/occupied early `null`s all precede the call (C's debug_mongen/rndmongen guard `:1165` likewise precedes `:1233`) ✓; random arm `if (!ptr) return null` mirrors C's rndmonst-NULL return ✓; `ptr.mndx` is the file's index invariant (used with `mons()`/`mvitals[]` throughout, e.g. `:1482-1483` inside `propagate` itself) so it ≡ `monsndx(ptr)` ✓; call lands after the arm closes and before `*mtmp = zeromonst` ✓.

Medusa pair verified live: `mklev.js:3012-3013` (accept loop tallies explicitly) + `:3288` area comment + reject-loop `mongone(was)` born-neutral — exactly C's makemon-skip-plus-explicit-tally design ✓. `MM_NOCOUNTBIRTH = 0x00000004` in `const.js:2380` ≡ `hack.h:1149` ✓ (import line only gains the name; `sym.mjs` confirms export).

Semantic consequence (why this matters despite 0 corpus blocks): before this commit every birth skipped the tally, so `mvitals[].born` undercounted game-wide, uniques never took G_EXTINCT at creation (re-creatable), and species never auto-extinguished at `mbirth_limit` — all silent state drift with no screen/RNG surface until a limit/genocide path reads it. The D-log's session proof (seed0373 byte-identical, the reached STATUE_TRAP arm) plus my stronger `verify makemon` re-run cover both the changed and unchanged paths.

## Hallucinations / overclaim

None. "No `--can` owed" correct (same-file callee + existing const edge). `verify --fn mongone` choice explained (reached arm); my stronger `verify makemon` re-run below agrees.

## Density

+10/−1, one C statement, one falsifier. Minimal and complete.

## Verification

D-log tail PASS (`--fn mongone`, syntax/rule2/green 2/2/strict ×2/cohort 7/7/full 44/44) + seed0373 STATUE_TRAP session byte-identical before/after (RNG 35386/35386, Screen 124/124 — the reached-arm proof). Re-measured:

```text
verify makemon: baseline abcd52ce~1 (scoreboard at 0e191fab) — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
```

Matches. Added-lines grep: 0 banned-pattern hits. `imports.mjs --rulecheck`: clean.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
