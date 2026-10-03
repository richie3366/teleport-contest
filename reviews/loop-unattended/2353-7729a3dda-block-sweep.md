# Review 2353 — 7729a3dda — missing-arm block sweep (8 fns, 5 files)

**SHA:** `7729a3dda` — "missing-arm block sweep: mdamagem tail, kick pit/web reveal, converter teardown, sfbase stubs (D-3399)."
**Scope:** js/ +80/−8 across 5 files (1 new C-home) + 2 headless tests. Eight functions, five C files. Per-function blocks below.
**Prior reviews closed:** none.

## Intent vs deliverable

Promise: drain the whole 8-row missing-arm block (head by-design + 2 return/message arms + 1 teardown + 4 stubs) under an operator overlay, with per-function Verify lines. Delivered exactly; each arm in C order with citations; 5/5 headless pins for the two testable units. No drift.

## Inventory (per function)

| Fn | JS change | Kind | C locus (csym range) |
|---|---|---|---|
| sasc_bug | none (by-design) | no code | shk.c:5945–5948 (`#ifdef __SASC` :5943) |
| mdamagem | tail `:5653–5655` → `return hitflags` | return-code fix | mhitm.c:1070–1071 (fn :1016–1119) |
| really_kick_object | pit/web arm `:1271–1283` + 3 import syms | missing arm | dokick.c:521–529 |
| free_convert_filenames | export `:2324` + `cvtinit` state | whole body, 0 callees | files.c:2168–2175 |
| norm_ptrs_any/align/arti_info/attribs | 4 exports, new js/sfbase.js | whole empty bodies | sfbase.c:747–764 (4×4 lines) |
| find_trap | `async function` → `export async` :342 | export (body untouched) | detect.c:1936–1962 |

No deletion/re-point; no re-point sym owed. Callee sym: `find_trap :342 ASYNC` awaited ✓ (edge pre-exists — parent already imports cvt_sdoor_to_door from detect; diff-context proof, no --can needed); `You_cant :8011 async (fmt,...args)` ✓ awaited; `Hallucination :1119` canonical reader ✓; `something` module const :167 ✓ in scope. `free_convert_filenames :2324`, `norm_ptrs_any :12` live ✓. No new file edges (all import *extensions*); no clones.

## C ↔ JS fidelity (per function)

**sasc_bug — Confirm (by-design).** Def fenced by `#ifdef __SASC` (:5943–5949, verified); 0 C refs (csym). `__SASC` is the Amiga SAS/C compiler's predefined macro — gcc/Linux never defines it, so decl + body are absent from the scored binary. No-code verdict correct (D-3398/D-3391 class) ✓.

**mdamagem — Confirm.** C `:1070–1071` `if (!mhm.damage) return mhm.hitflags;` ≡ JS `if (!damage) return hitflags;` ✓. Old code's HIT-default was the C-wrong (MISS when unset, e.g. negated AD_STCK fall-through). Safety: `let hitflags = M_ATTK_MISS;` at fn head (:4610, verified) — never undefined at the tail ✓. 4/4 call sites (:731/:802/:910/:989, csym) pre-wired; shared-tail fix reaches all ✓. (D-log's "AD_POLY sibling :4675" is file-ambiguous — C file has 1514 lines; resolves to js/mhitm.js:4675, same `if (!damage) return hitflags;` pattern — confirmed match.) No RNG.

**really_kick_object — Confirm.** C `:523–528` ≡ JS line-for-line: `if (!tseen) find_trap` (C sync → JS awaited async ✓) then `You_cant("kick %s that's in a %s!", something, Hallu ? "tizzy" : WEB ? "web" : "pit")` — format string, arg order, ternary nesting all exact ✓. Sole C caller :500 pre-wired (:1245) ✓. find_trap body untouched (same-file callers safe) ✓. No RNG (exercise/feel/message/pure-read).

**free_convert_filenames — Confirm.** C `:2170–2174` double-guard free+null + `cvtinit = FALSE` ≡ JS nulls + `= false` (GC, no arena — correct analogue) ✓. `cvtinit` verified write-only (exactly 2 hits port-wide: decl :2053 + write :2174) ✓. Sole C caller save.c:1168 is live (FREE_ALL_MEMORY defined, config.h:632 — verified) but exit-teardown-only; unwired-but-named per the scored-JS no-teardown position (free_dungeons precedent; CURRENT bans savelev-freeing) — legitimate named omit on a whole ported body ✓.

**norm_ptrs ×4 — Confirm.** csym bodies: 4 lines each, `UNUSED`-annotated param, empty braces — JS `void d_*;` mirrors exactly (doconvert_file nhUse precedent) ✓. No live callers (decl-only sfbase.c:672–675 + unscored sftags generator text — verified for _any; siblings same shape per queue briefs) ✓; zero JS refs outside sfbase.js (grep) so no table registration owed (JSON saves, §1.6) ✓. C-home file + signatures correct per csym (:747–764; D-log cites +1 starts — the `void`-line triviality again).

## Hallucinations / overclaim

None. "200/200", "1/1", "write-only", "ALREADY imports", and the 4-call-site map all re-verified. The "no headless precedent in 170 tests" rationale for skipping staticfn-local tests is honest scoping, and REACH covers both (200 + 1 real sessions).

## Density

Eight functions is within the 10-cap, but five C files breaks the one-file/closure letter — covered here by the documented operator overlay whose premises I verified from the parent tree (exactly these 8 unchecked rows; generated block empty). Splitting micro-rows (1–16 lines each, +80 js/ total, 5 files — far under the 1500/15 caps) into five iterations would be the waste §2b exists to prevent. Each function is whole with its own `Ledger:` entry and Verify lines; no Must-fix bundled. Shape exception legitimate. Per-function verdicts: sasc_bug ACCEPT · mdamagem ACCEPT · really_kick_object ACCEPT · free_convert_filenames ACCEPT · norm_ptrs_any ACCEPT · norm_ptrs_align ACCEPT · norm_ptrs_arti_info ACCEPT · norm_ptrs_attribs ACCEPT.

## Verification

Re-measured (all eight, one `--reach-all` call + sasc confirm): 0 blocked ×8, 0 regressed everywhere — matches the D-log (its 80-sample + separate 200 reach-all reproduced in one run). Verbatim reach lines:

```text
reach mdamagem: 200 baseline-PASS session(s) reach it (200 run, 123.9s): 200 PASS, 0 regressed → REACH-OK
reach really_kick_object: 1 baseline-PASS session(s) reach it (1 run, 1.2s): 1 PASS, 0 regressed → REACH-OK
smoke sasc_bug: no RNG-tagged reach; fixed smoke spread (24 run, 10.7s): 24 PASS, 0 regressed → REACH-OK
```

(+ 24/24 smokes for free_convert_filenames and all four norm_ptrs.) Headless tests re-run: 5/5 PASS. Guard proofs: `config.h:632 #define FREE_ALL_MEMORY` (save.c:1168 caller live-but-teardown-only); cvtinit exactly 2 port-wide hits (decl :2053 + write :2174, write-only ✓). D-log shows green/strict/cohort gates. Diff grep: no FORCE/DIAG/RNG-log/fastforward/seed/coordinate hits. Rule #2: clean (iteration-wide run).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
