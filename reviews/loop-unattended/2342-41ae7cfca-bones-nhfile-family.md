# Review 2342 — 41ae7cfca — files.c bones-NHFILE family (5 fns)

**SHA:** `41ae7cfca` — "`files.c` bones-NHFILE family: rewind/set_bonestemp/create/commit/open (D-3387)."
**Scope:** js/files.js +217/−4, js/bones.js +1/−1 (prefix export). Cluster commit — per-function blocks below.
**Prior reviews closed:** none.

## Intent vs deliverable

Promise: whole C bodies for 5 MISSING files.c NHFILE functions at C-home with Rule #2 VFS analogues, following the D-3381 levelfile/savefile precedent. Delivered: 4 exports + 1 module-local, handle fields in C order with `:line` cites, VFS temp→final pipeline, bones.js edge + prefix export. No drift.

## Inventory (per function)

| # | JS symbol | C locus (csym range) | Shape |
|---|-----------|----------------------|-------|
| 1 | rewind_nhfile :785 (export) | files.c:533–545 | branch live, both sinks named |
| 2 | set_bonestemp_name :979 (local) | files.c:817–830 | whole body, VMS named |
| 3 | create_bonesfile :1015 (export) | files.c:832–911 | whole body, platform arms named |
| 4 | commit_bonesfile :1072 (export async) | files.c:914–937 | whole body, SYSV named |
| 5 | open_bonesfile :1111 (export) | files.c:939–990 | whole body, platform arms named |

No deletion/re-point; no re-point sym owed. Sym sweep (all LIVE): `set_bonesfile_name bones.js:375 sync` (returns {filename,bonesid}, no global write — doc claim verified), `BONES_VFS_PREFIX` one-word export (all reads inside bodies — CHECK satisfied), `vfsWriteFile storage.js:36`, `BONESPREFIX`/`NHF_BONESFILE` consts, `FNIDX_HISTORICAL files.js:563`, `new_nhfile`/`fqname` in-file, `nh_uncompress` (D-3381), `ENOENT=2` file-local :569 (sym's index misses file-local consts — verified by grep, second instance after 2340's FROM_FORM_REASON). `wizard_mode` is the pre-existing in-file clone (:63, flags-based) — this SHA calls it, adds none.

## C ↔ JS fidelity (per function)

**1. rewind — Confirm.** structlevel→lseek vs else→rewind(fpdef), branch preserved with both sinks named (fd positionless token; no stdio). Vacuous-by-construction in the VFS world; matches the D-3381 gate-live/sink-named style.

**2. bonestemp — Confirm.** lastIndexOf('.') ≡ strrchr; no-dot append ≡ eos; slice+`.bn` ≡ Sprintf (edge-checked: leading/trailing-dot behave identically); VMS `;1` named; module-local ≡ C staticfn. Both in-cluster callers (:845→create, :922→commit) store back to game.lock ✓.

**3. create — Confirm.** errbuf clear, bonesid holder, lock store-back, fqname(0), new, 10 field sets in C order (:850–859), fpdef-false arm, structlevel creat→VFS stage (fd 0 success token, create_savefile precedent), `fd<0 → failed=ENOENT`, errbuf message verbatim (`Cannot create bones "%s", id %s (errno %d)` with gl.lock≡game.lock ✓), VMS chmod named outside the `if (nhfp)` like C, viable+return. One acknowledged deviation: C's else arm reads stale `errno` into `failed` (:864–866) where JS writes 0 — unobservable (savebones reads whynot only on NULL; on failure both carry the real errno/ENOENT), and stale errno is non-deterministic across builds. No action.

**4. commit — Confirm.** filename re-derived (no gb.bones global — verified: helper returns it), fqname buffnums 0/1 in C order, SYSV link/unlink named (contest build takes rename — the `#if` needs SYSV&&!SVR4/GENIX, absent on Linux ✓), rename→VFS read+write+delete (ret 0 iff temp existed and final landed; temp kept on write-fail), wizard-gated pline verbatim with %s substitution (pline(fmt,...args)→vpline; precedent apply.js:458). Async forced by pline, awaited in C position ✓.

**5. open — Confirm.** bonesid holder, fqname(0), nh_uncompress ("no effect if nonexistent" ✓), new, WIN32+DEBUG impossible named, 10 field sets in C order (:958–967) with style.binary≡true (historical=1≠exportascii=2, hack.h:976–977) and fnidx≡HISTORICAL (bonesformat≡historical verified at sys.c:101 — D-log says :102, de minimis), fpdef-false arm with NO else (C has none here, unlike create ✓), structlevel open→VFS probe (miss≡ENOENT→NULL), setmode named, viable+return.

**Callers** (all `--callers` audited): rewind → restore.c:891 dorecover (unported, ships-with named) + sfctool (unscored tool ✓); bonestemp → both in-cluster, wired ✓; create/commit/open → bones.c:600/:623/:417/:652 savebones/getbones VFS splits — unwired but map-named with owning functions and the "non-C-site call would be C-wrong" guard, exactly the 2336-accepted shape. No JS site calls from a function C never calls from.

## Hallucinations / overclaim

None. "Whole C bodies" holds (all 5 ported rows; omits are platform/compiled-out/Rule #2, each named in doc + map). The /tmp smoke pipeline is uncommitted but its claims (messages, nulls, silent non-wizard miss) are all consistent with the read code.

## Density

Breadth §2b: 5 whole functions, one C file, one closure (bones NHFILE create/commit/open + temp + rewind), no Must-fix bundled, 217 insertions in-band. Per-function C-locus/Callers/Named sub-bullets + own `Ledger:` entries; the combined Verify bullet evidences all 5 (5× smoke lines, re-measured individually below). Ledger flips unknown→ported ×5 are clean — no 2333/2336-family paste error. Unanimous whole.

## Verification

Re-measured all 5 in one call (`verify … --base 41ae7cfca~1 --reach-all`): 0 blocked + vacuous-note each, 5× smoke 24/24 REACH-OK — matches the D-log, 0 regressed. Representative line:

```text
smoke create_bonesfile: no RNG-tagged reach; fixed smoke spread (24 run, 10.9s): 24 PASS, 0 regressed → REACH-OK
``` (rewind/bonestemp/commit/open identical at 24/24.) D-log Verify also shows green 2/2 + strict ×2 + cohort 7/7 → VERIFY: PASS. Diff grep: no FORCE/DIAG/RNG-log/fastforward/coordinate hits. Rule #2: clean (iteration-wide run, cited in 2338).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
