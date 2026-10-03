# Review 2344 — d6a4a5312 — bones/recover quartet (recover is compiled-out)

**SHA:** `d6a4a5312` — "`files.c` bones/recover quartet: compress_bonesfile + nh_sfconvert + doconvert_file + recover_savefile (D-3389)."
**Scope:** js/files.js +363/−7, js/bones.js +13/−4, js/end.js +16/−5, js/save.js +3/−1. Cluster commit — per-function blocks below.
**Prior reviews closed:** none.

## Intent vs deliverable

Promise: whole C bodies for 4 MISSING files.c functions, compress wired at all 5 bones sites. Delivered for three of them; the fourth — recover_savefile, ~140 of the ~363 insertions — is `#ifdef SELF_RECOVER` code compiled OUT of the contest binary, ported live and flipped to ported instead of marked by-design (see Actionable 1). The trio is exact; the quartet's verdict is its worst member.

## Inventory (per function)

| # | JS symbol | C locus (csym range) | Shape |
|---|-----------|----------------------|-------|
| 1 | compress_bonesfile :1156 | files.c:1005–1010 | whole body, 5/5 callers wired |
| 2 | nh_sfconvert :2631 | files.c:2071–2075 | whole body, save.c pair named |
| 3 | doconvert_file :2614 (local) | files.c:2061–2068 | whole stub, ships-with named |
| 4 | recover_savefile :1438 (+sfo_int :1923, sfvalue_int :2168) | files.c:2864–3082 | **compiled out — should be by-design** |

No deletion/re-point; no re-point sym owed. Callee sweep: nh_sfconvert/nh_compress in-file LIVE; set_bonesfile_name (re-derivation verified at all 5 sites below); open/create/close/delete/store_version/set_*_name/fqname/raw_printf all live; sfo_int/sfvalue_int new but recover-only (sole use :1556). No stubs, no new clones.

## C ↔ JS fidelity (per function)

**1. compress — Confirm.** `nh_sfconvert(fqname)+nh_compress(fqname)` in C order ✓. gb.bones re-derivation via `set_bonesfile_name(game.u.uz)` proven correct: gb.bones writers are only files.c:844/:920/:948/:997 (create/commit/open/delete), all fed &u.uz at these flows, and the most recent write before each of the 5 sites used &u.uz (:430←:417 open; :624←:623 commit; :673/:688/:741←:652 open, nothing re-writes between). All 5 wirings context-verified: :430's single fall-through compress correctly fans to 3 JS early returns (wizard-yes+delete-fail pline path, wizard-no/ESC else, non-wizard — JS `==='y'`/else matches C `=='y'`/fall-through, ESC included ✓; goto-make_bones path takes no compress on both sides ✓); :624 tail after write (close/commit named ✓); :673/:688/:741 with reading_bonesfile/ToDo/return shapes matching C :670–675/:686–691/:740–743.

**2. nh_sfconvert — Confirm.** `doconvert_file(filename,0,false)` ≡ :2073. save.c:119/:224 named in the save.js dosave0 doc (pair ships with the compress arm) ✓.

**3. doconvert — Confirm.** Three `void` ≡ nhUse ×3 + `return 1` ≡ :2064–2067; module-local ≡ C staticfn. :2081 nh_sfunconvert ships-with named — and that row is live in the queue ✓.

**4. recover — SCOPE-FAIL (Actionable 1), structure careful.** `/* #define SELF_RECOVER */` (unixconf.h:126, commented) gates files.c:2858–3082; the sole caller sys/unix/unixunix.c:219 sits inside the same `#ifdef` (:216). Callee and caller are both absent from the contest binary — "no scored analogue" (RUNBOOK §4), i.e. by-design, with four direct precedents (Placebc `#else BREADCRUMBS` family — "Optional JS export is not scored C coverage"; adjust_prefix NOCWD-only; CHANGE_COLOR pair). The D-log cites unixconf.h:126 itself, so this was knowing scope error, not a stale-row accident: the playbook's 3-call by-design detour would have kept the iteration for a real row. The port is structurally careful (reachable head :2889–2952 verified arm-for-arm and string-verbatim against C; sfo helpers match the SF_A macro :119–133 and sfvalue %d :558–563), but fidelity to compiled-out C is unverifiable by construction (recorder never executes it — the D-log's own "no RNG-tagged reach" admits it), the tail past :2952 is unreachable even in-JS (all reads yield 0 bytes), and the live export is a mis-wiring magnet (writes `ps.in_self_recover`, clears the level stash — resurrecting it from any live path would invent behavior). The ported flip buries all of this.

```c
/* unixconf.h:126 */ /* #define SELF_RECOVER */
/* unixunix.c:216–219 */ #ifdef SELF_RECOVER
        if (c == 'r' || ...) { if (recover_savefile() && ...) ...
```

## Hallucinations / overclaim

One, by omission: the D-log's "whole C bodies" + ported flips present recover as scored coverage while the "compiled out" fact sits only in prose. The "VFS-analogue skeleton" framing normalizes 140 lines of dead code as a real port. Saying so explicitly per the Method. (Process note for the supervisor, not a port item: the coverage generator emits compiled-out rows — loop agents may not edit the scripts.)

## Density

Breadth §2b: 4 functions, one C file, one closure, no Must-fix bundled — but ~75% of the insertions are dead code, a density failure on top of the classification failure. The trio alone would be unanimous-whole; per-function verdicts: compress/nh_sfconvert/doconvert whole ✓, recover ✗. SHA verdict is the worst.

## Verification

Re-measured all 4 in one call (`verify … --base d6a4a5312~1 --reach-all`): 0 blocked + vacuous-note each, 4× smoke 24/24 REACH-OK — matches the D-log, 0 regressed. (REACH is vacuous for recover by construction — nothing can reach compiled-out code.) D-log Verify also shows green 2/2 + strict ×2 + cohort 7/7 → VERIFY: PASS. Diff grep: no FORCE/DIAG/RNG-log/fastforward/coordinate hits. Rule #2: clean (iteration-wide run, cited in 2338).

## Actionable C-wrongs

1. **recover_savefile is compiled-out code shipped as a live port (scope/classification C-wrong).** C files.c:2864–3082 sits under `#ifdef SELF_RECOVER` (files.c:2858; unixconf.h:126 leaves it undefined) with its sole caller inside the same ifdef (sys/unix/unixunix.c:216–219) — absent from the contest binary, hence by-design per RUNBOOK §4 and the Placebc/adjust_prefix/CHANGE_COLOR precedents. Fix in one iter: `ledger.mjs set recover_savefile by-design --note "compiled out: …"` + delete the dead JS (recover_savefile + recover-only sfo_int/sfvalue_int — no callers; git retains the text) + `verify.mjs --fn recover_savefile` incl. full (shared file). Do NOT re-port or rewire it. Source: reviews/loop-unattended/2344-d6a4a5312-… (Must-fix — prepended).
2. **savebones ledger omit still claims compress unwired (stale clause, caused by this SHA).** Row still reads "compress_bonesfile on all three return paths (VFS has no post compression)" after this SHA wired all three + the tail (end.js:1664/:1669/:1673/:1895; end.js doc updated, row not). Fix with the planned ledger pass (now six rows with 2333.1/2336.1/2343.1): refresh the row dropping the compress clause (close/create/commit clauses stay). Docs-only; zero behavioral impact. Source: reviews/loop-unattended/2344-d6a4a5312-… (debt, not Must-fix).

Verdict: **QUALITY-RISK**
