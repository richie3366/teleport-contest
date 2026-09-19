# Review 1557 — 6e42a59a — `mhitm.c` failed_grab whole-body restart (D-2598)

- Commit: `6e42a59a` (2026-09-20) — "`mhitm.c` failed_grab whole-body restart (live some_mon_nam tail, clone consolidation) (D-2598)."
- Queue row: coverage gap (3 divergent JS bodies for C's one function).
- JS touched: `js/mhitm.js` (+27/-), `js/mhitu.js` (clone deleted, 3 call sites re-pointed), `js/uhitm.js` (inline body → delegate).

## Intent vs deliverable

Subject promises canonical restart + clone consolidation. Diff actually delivers: `mhitm.js failed_grab` restarted in C order (entry gate, message gate, tailmiss snapshot, verb, magrnam via live `s_suffix`, mdefnam via live `some_mon_nam`), mhitu 2-arg clone deleted → canonical import with `(mtmp, game.youmonst, mattk)` at all 3 call sites, `failed_grab_you` → 1-line delegate. Promise matches diff.

## Inventory

Restarted: `failed_grab` (mhitm.js). Deleted: mhitu local clone. Re-pointed: 3 mhitu call sites (local clone → import), `failed_grab_you` body (inline → delegate). `sym.mjs failed_grab` output (required, pasted): `NOT EXPORTED — 1 LOCAL CLONE js/mhitm.js:5109` — that verdict is a sym-index limitation: the export is via the `export { … could_seduce, failed_grab }` list at `js/mhitm.js:754–762` (confirmed by grep), which sym does not parse. Runtime linkage is proven: `mhitu.js:93` and `uhitm.js:56` import it from `./mhitm.js`, and every in-verify green/cohort run links those modules (an unresolvable import would fail the whole suite, not one session).

## C ↔ JS fidelity

C locus: `nethack-c/upstream/src/mhitm.c:595–640` (csym; body `:597–640`). Callers: mhitm `:451/:485/:529`, mhitu `:808/:827/:1305` (all `mdef = &youmonst`), uhitm `:5652/:5735/:5779` (all `magr = &youmonst`).

Branch-by-branch confirm:

- Entry gate (`:605–611`): `(unsolid(mdef) || notonhead) && (HUGS||WRAP||STCK||DGST)` — unchanged lines, exact.
- Message gate (`:612–613`): `(vis && canspotmon(mdef)) || magr==you || mdef==you` — exact (`_mm_vis` is the pre-existing gv.vis mirror).
- tailmiss snapshot (`:616`), verb (`:617–619`) — exact.
- magrnam (`:624–625`): `"Your"` vs `s_suffix(Monnam)` — the old `s_suffix_mm` replaced by the live `s_suffix` import (`js/do_name.js:386`); the two bodies are logic-identical (it/you/s-endings), so output is unchanged and C now cited directly. Import-the-export, correct.
- mdefnam (`:626–632`): `you/mon_nam` vs `s_suffix(some_mon_nam)+" tail"` — the old `s_suffix(mon_nam)` stand-in replaced by live `some_mon_nam` (`js/do_name.js:1113` sync) — exactly the C call the old named omit apologized for. The omit is genuinely retired.
- pline (`:636–637`): `%.99s` has no JS convention (no `slice(0,99)` anywhere) — full names print, codebase-wide behavior; disclosed, acceptable.
- TRUE/FALSE (`:639–640`) ✓. No RNG in body ✓.

Re-point equivalence: mhitu call sites pass `mdef = youmonst` exactly like C `:808/:827/:1305`, so entry gate (`unsolid(youmonst.data)`) and message gate (always true) behave identically to the deleted clone — while additionally gaining the message gate the clone dropped and the `some_mon_nam` tail. `failed_grab_you` delegates with `magr = youmonst` exactly like C `:5652/:5735/:5779` (gate always true, magrnam always "Your"); its 2 live call sites (`:3098`, `:3691`) plus the direct canonical call at `:3652` cover all three C sites. The old uhitm inline used `mon_nam`-based possessive for the tail where C wants `some_mon_nam` — the delegate fixes that too.

Callee closure: `unsolid/canspotmon/s_suffix/Monnam/mon_nam/some_mon_nam/pline` — all LIVE imports already in mhitm.js. No stubs, no omits ("none" accurate).

## Hallucinations / overclaim

None. The "identical behavior" claim for the re-points is verified above (same fixed args C itself passes).

## Density

Clone consolidation + restart, 3 files, net −26 lines — right-sized.

## Verification

- Banned-pattern grep: 0. No RNG/seed/coordinate logic.
- Re-ran here: `hidden-proxy.mjs verify failed_grab --base 6e42a59a~1 --reach-all` → 0 blocked at parent (vacuous note, pre-stated) + smoke 24/24 REACH-OK. Matches D-log.

## Cited evidence

C message block (`mhitm.c:612–640`, verified against `js/mhitm.js:5109+`):

```c
if ((gv.vis && canspotmon(mdef)) /* mon-vs-mon */
    || magr == &gy.youmonst || mdef == &gy.youmonst) {
    char magrnam[BUFSZ], mdefnam[BUFSZ];
    boolean tailmiss = gn.notonhead;
    const char *verb = (mattk->adtyp == AD_DGST) ? "gulp"
                       : (mattk->adtyp == AD_STCK) ? "adhere"
                         : "grab";

    /* beware of "Foo's grab passes through Bar's ghost";
       mon_nam(x_monnam) calls s_suffix() for named ghosts and
       s_suffix() uses a single static buffer; make copies of both
       names to overcome that [note: comment predates 'tailmiss'] */
    Strcpy(magrnam, (magr == &gy.youmonst) ? "Your"
                                           : s_suffix(Monnam(magr)));
    if (!tailmiss) {
        Strcpy(mdefnam, (mdef == &gy.youmonst) ? "you"
                                               : mon_nam(mdef));
    } else {
        /* hero poly'd into long worm can't grow tail
           so no 'youmonst' handling is needed here */
        Sprintf(mdefnam, "%s tail", s_suffix(some_mon_nam(mdef)));
    }
    /* unsolid grab misses are actually somewhat iffy--how come
       ordinary attacks don't also pass right through? */
    pline("%.99s %s attempt %s %.99s!", magrnam, verb,
          !tailmiss ? "passes right through" : "fails to hold",
          mdefnam);
```

Re-point equivalence (C passes the same fixed args): mhitu `:808/:827/:1305` all call `failed_grab(mtmp, &gy.youmonst, mattk)` — JS now passes `(mtmp, game.youmonst, mattk)` at `js/mhitu.js:1857/:4276/:4299`. uhitm `:5652/:5735/:5779` all call `failed_grab(&gy.youmonst, mon, mattk)` — JS covers them via `failed_grab_you` (`:3098`, `:3691`) plus the direct canonical call at `:3652`. With the fixed arg, entry gate and message gate evaluate identically to the deleted bodies, which additionally dropped the message gate (mhitu clone) and used `mon_nam` for the tail (uhitm inline) — both fixed by consolidation.

`s_suffix_mm` (`js/mhitm.js:5017`) vs live `s_suffix` (`js/do_name.js:386`): logic-identical (it/you/s-endings), so the magrnam swap is output-neutral and C-cited. `s_suffix_mm` stays for its other users.

Tool outputs pasted (required — deletion audit):

```
$ node scripts/sym.mjs failed_grab
failed_grab      NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mhitm.js:5109
```

`sym.mjs` does not parse `export { … }` lists: the canonical IS exported via `export { … could_seduce, failed_grab }` at `js/mhitm.js:754–762` (confirmed by grep), imported by `mhitu.js:93` and `uhitm.js:56` from `./mhitm.js`. Linkage proven by every green/cohort run linking those modules.

```
$ node scripts/sym.mjs some_mon_nam
some_mon_nam     js/do_name.js:1113   sync
$ node scripts/hidden-proxy.mjs verify failed_grab --base 6e42a59a~1 --reach-all
verify failed_grab: baseline 6e42a59a~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke failed_grab: no RNG-tagged reach; fixed smoke spread (24 run, 3.5s): 24 PASS, 0 regressed → REACH-OK
```

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
