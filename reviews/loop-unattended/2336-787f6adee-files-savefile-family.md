# Review 2336 — 787f6adee — files.c savefile/NHFILE family (10 fns, 3 wirings)

**SHA:** `787f6adee` — "`files.c` savefile/NHFILE family (close_nhfile head + 9, 3 close wirings) (D-3381)."
**Scope:** js/files.js +319/−7, js/do.js +2/−1, js/save.js +4/−2. Cluster commit — per-function Inventory + fidelity below. No clone deleted; sym sweep pasted in §Inventory.
**Prior reviews closed:** none.

## Intent vs deliverable

Promise: whole C bodies for the 10-function savefile/NHFILE family at C-home with Rule #2 analogues, plus 3 close_nhfile wirings. Diff delivers that: 10 exports (9 exported + problematic_savefile local-static), SF2MSG table, 2 import extensions (vfsDeleteFile; set_savefile_name on the ALREADY files→save edge), 3 one-line wirings. D-log carries per-function C-locus/JS/Callers/Verify/Named + per-function `Ledger:` entries. The `js/` is faithful throughout; the defect is 3 ledger rows carrying the head function's bullet (see Actionable 1 — same finish-iteration bug as review 2333).

## Inventory (per function)

| # | JS symbol | C locus (csym range) | Shape |
|---|-----------|----------------------|-------|
| 1 | close_nhfile js/files.js:706 | files.c:517–531 | whole body, sinks named |
| 2 | nhclose js/files.js:779 | files.c:582–594 | gate+retval live, sinks named → partial |
| 3 | create_savefile js/files.js:958 | files.c:1158–1213 | whole body, platform arms named |
| 4 | open_savefile js/files.js:1007 | files.c:1216–1255 | whole body, platform arms named |
| 5 | delete_savefile js/files.js:1046 | files.c:1258–1266 | whole body, unlink→VFS |
| 6 | nh_compress js/files.js:1061 | files.c:1786–1792 | gate+sink named → partial (by-design) |
| 7 | nh_uncompress js/files.js:1072 | files.c:1795–1801 | gate+sink named → partial (by-design) |
| 8 | problematic_savefile js/files.js:1110 (local) | files.c:2014–2046 (+sf2msg :1997–2011) | whole body + table |
| 9 | get_freeing_nhfile js/files.js:1150 | files.c:1298–1308 | whole body |
| 10 | restore_saved_game js/files.js:1169 (async) | files.c:1269–1287 | whole body, validate awaited |

`sym.mjs`: all 9 exports resolve sync except `restore_saved_game ASYNC` (forced by async `validate`, awaited in C order ✓); `problematic_savefile` local-only (correct — C staticfn); callees all LIVE — `delete_convertedfile` files.js:2070, `raw_printf` display.js:8371 sync, `validate` files.js:1954 async, `set_savefile_name` save.js:110, `fqname`/`new_nhfile`/`free_nhfile` in-file, `vfsReadFile`/`vfsDeleteFile` storage.js (Rule #2-clean VFS).

## C ↔ JS fidelity (per function)

**1. close_nhfile** — C `:519–530`: structlevel&&fd!=-1 → nhclose+fd=-1; elif fpdef → fclose+NULL; fplog fprintf; fplog fclose; fpdebug fclose; free_nhfile. JS mirrors every arm in order with identical predicates; the three sinks are named omits (pseudo-fd/stdio/fs-log have no Rule #2 counterpart) while both resets + free are live. **Confirm.**

**2. nhclose** — C `:585–593`: retval=0; fd>=0 → close_check?bclose:close. JS keeps gate + retval live, names close_check/bclose (by-design sfstruct registry) + POSIX close. Always-0 return is the only VFS-meaningful value. **Confirm.**

**3. create_savefile** — C `:1163–1212`: fqname → new → ftype/mode → do_historical gate (kept unfolded, always-true exactly like C) → 8 field sets → SAVEFILE_DEBUGGING compiled-out note → creat arm → setmode note → VMS chown note → viable return. JS field order and `:line` cites match; creat→VFS-ensure always-succeeds with fd success token 0 (dosave0 convention, same token as the inline handle at save.js:634–637). (Nit, no action: the util/recover.c tool-build homonym isn't named here the way the sfctool delete_savefile stub is — but util/ is unscored and ledger-untracked.) **Confirm.**

**4. open_savefile** — C `:1221–1254` incl. the `:1227` "force it" line and the open arm OUTSIDE the do_historical if (`:1242–1246`); JS preserves both structural subtleties, with the VFS read probe (miss≡ENOENT→fd -1→viable NULL, fopen_wizkit_file precedent) feeding the fd branch. **Confirm.**

**5. delete_savefile** — C `:1261–1265`: fqname → unlink → delete_convertedfile (LIVE) → return 0. JS exact with vfsDeleteFile; sfctool stub named, not ported. **Confirm.**

**6–7. nh_compress/nh_uncompress** — C: COMPRESS-gated docompress_file (COMPRESS is defined, config.h:390, so the C call is live). JS `void filename` with the sink named by-design (external compressor; docompress_file is ledger by-design). Only Rule #2-compliant choice. Wording nit (no action): "the gate is live" — no runtime gate exists in JS; the compile-time gate collapses to always-skip, which is what the no-op does. **Confirm.**

**8. problematic_savefile** — C `:2020–2044`: UPTODATE break; the six DM cases in C order falling through; MISMATCH/OUTDATED/CRITICAL/default arm; sf2msg scan; `raw_printf("\n%s is %s %s\n", … an/a …)`; break; return NULL. JS is line-faithful; I compared SF2MSG row-for-row with C sf2msg — 10/10 identical messages in identical order. **Confirm.**

**9. get_freeing_nhfile** — C `:1301–1307` incl. the `let nhfp = null` then assign shape and the "also sets fd to -1" comment. Exact. **Confirm.**

**10. restore_saved_game** — C `:1276–1286`: set_savefile_name(TRUE) → fqname → nh_uncompress → open_savefile → validate gate → close + problematic → return. JS exact; async is forced by `validate` and the await sits in C position. **Confirm.**

**Callers** (all `--callers` output audited): close_nhfile's 49 refs resolve to wired (do.c:1712, save.c:211/:216, files.c:1282 in-cluster) or by-arm named (bones VFS splits; do.c:1389 doc; do.c:1652 goto_level leave path — verified inside goto_level; recover_savefile region :2911–3073; dorecover/restlevelfile; savestateinlock incl. :388/:420 — verified owners; free_dungeons :1068; freedynamicdata :1182 — verified owners; HUP arms :115/:204 via their named :112/:113 and !onhfp arms). nhclose's 8 non-cluster sites, open_savefile :1378/:113, delete_savefile's 10, get_freeing's 4, compress pair's bones/panic/HUP/unixmain sites, problematic's sole :1283 — each wired in-cluster or named with its owning function. No JS site calls from a function C never calls from. The 3 wiring contexts verified: do.c:1712 after getlev (oinit :1713 absent on the JS stash arm — I confirmed oinit() is called only in makelevel, so the "pre-existing" comment is accurate); save.c:211 after getlev(onhfp); save.c:216 dosave0 tail (nhfp in scope :634). free_nhfile re-inits the handle; nothing reads any handle after the 3 close sites — behavior-neutral holds by inspection.

## Hallucinations / overclaim

None material. Two wording nits recorded above (recover.c homonym unnamed; "live gate") — neither affects behavior or queue state. "Whole C bodies" holds for the 7 ported rows; the 3 partial rows' D-log Named bullets are correct (the corruption is only in the ledger rows — below).

## Density

Breadth phase, §2b: 10 whole-C-function/bodies, one C file, one caller/callee closure (savefile open/create/close/delete/restore + NHFILE primitives + the validate/problematic tail), no Must-fix bundled — exactly the 10-function ceiling, 319 js/ insertions inside the 200–800 band. Each function has its own C-locus/Callers/Verify/Named sub-bullets and its own `Ledger:` entry. Per-function verdicts: all 10 whole-or-named-partial; SHA verdict is their unanimous best modulo the recording debt.

## Verification

Re-measured all 10 in one call (`verify … --base 787f6adee~1 --reach-all`): 0 blocked + vacuous-note for every function; 9/10 smoke 24/24 REACH-OK. The tenth, close_nhfile, printed `23 PASS, 1 regressed → REACH-REGRESSION` in that 10-way batch — but the follow-up isolated `verify close_nhfile --base 787f6adee~1 --reach-all` prints `24 PASS, 0 regressed → REACH-OK`, matching the D-log's contemporaneous 24/24. The batch ran 10 parallel smoke spreads (9.6 s vs 11.1 s isolated — the fast time suggests a worker dying early under load); the isolated re-run is clean, the D-log claim is clean, and the wiring-neutrality argument above leaves no plausible deterministic mechanism. I record the blip here rather than silently: with no session/owner captured and two clean observations, a Must-fix row would be fabrication. The mandatory end-of-iteration full rescore is the independent oracle — any real loss surfaces there with a name. Diff grep: no FORCE/DIAG/RNG-log/fastforward/seed hits. (Note: this SHA carries no scoreboard hunk — the verify rewrites were evidently not staged; header-only either way.)

## Actionable C-wrongs

1. **Three ledger rows carry close_nhfile's bullet as their omit (finish-iteration bug, same family as 2333.1).** `nhclose`, `nh_compress`, `nh_uncompress` all read `omit:"- \`close_nhfile\`: nhclose/fclose/fplog-fprintf sinks (Rule #2; resets live)."` — wrong function, and it erased each row's real omit (the D-log Named bullets have the correct texts: close_check/bclose + POSIX close; docompress_file(FALSE)/(TRUE) by-design sinks). Fix in one iter with 2333.1: `ledger.mjs set` each row's omit to its D-3381 Named text (statuses stay partial — correct). Docs-only; zero behavioral impact. Source: reviews/loop-unattended/2336-787f6adee-… (debt, not Must-fix).

Verdict: **ACCEPT-WITH-DEBT**
