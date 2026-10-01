# Review 2163 — 3476ed37a — roguename ROGUEOPTS arm + 2 stales

SHA `3476ed37a`, D-3203; 2026-10-01; `js/do_name.js` (+19/−3) +
`js/mail.js` (+14/−4). 3-function cluster: roguename ported,
mon_nam_too + docallcmd stale-ported. Closes no prior review.

## Metadata

- Subject: "`do_name.c` roguename ROGUEOPTS arm + mon_nam_too/
  docallcmd stale (3-function cluster)".
- Promises: roguename restarted with the live-nh_getenv `name=` scan
  + unchanged rn2 fallback; nh_getenv exported with the C length
  gate; no second clone.

## Intent vs deliverable

Kept. Diff adds the env arm (per-position scan, first-comma slice,
fallback untouched), exports mail.js nh_getenv with the
`strlen <= BUFSZ/2` gate, and imports it live into do_name.js. No
clone added; the two stales are ledger-only with cited evidence.

## Inventory — roguename + nh_getenv

Changed: `roguename` (js/do_name.js:622, env arm + fallback),
`nh_getenv` (js/mail.js:490, local→export + gate), one new import
line + BUFSZ const import. Deleted/re-pointed: none.

```text
nh_getenv        js/mail.js:490   sync (single home — "no clone #2" ✓)
```

New do_name→mail import closes a do_name↔mail cycle (mail.js:42
imports oname from do_name), but both directions are hoisted function
declarations used at call time only, inside the existing SCC — no
top-level read, no TDZ; the tree loads (syntax + green + full suite
green in-iteration). `--can` now reports ALREADY for the in-tree edge.

## C ↔ JS fidelity — roguename

C `do_name.c:1423–1439` (csym range). Loop `for (i = opts; *i; i++)` ≡
positions 0..len−1 ✓; `strncmp("name=", i, 5)` ≡ `startsWith('name=',
i)` ✓ (ASCII needle — byte vs code-unit positions find the same
occurrence and slice the same value; a 0x2C byte is always a real
comma in UTF-8, so the truncate point matches too); first-`,` slice ≡
NUL-write + return ✓; sole-reader proof: `ROGUEOPTS` appears only at
C do_name.c:1428, so the C-side env mutation has no later reader and
the slice is the same prefix ✓. Fallback `rn2(3) ? (rn2(2) ? …)`
unchanged in C order, and the env path draws no RNG like C ✓.
Callers: do_name.c:738 → js/do_name.js:1754 ✓, extralev.c:303 →
js/extralev.js:307 ✓; reverse-checked, no others. Verdict: ACCEPT.

## C ↔ JS fidelity — nh_getenv

C `options.c:6847–6856`: `getev && strlen(getev) <= BUFSZ/2 ? getev :
NULL`. JS: missing env/name → null ✓; `String()` + `length >
BUFSZ/2 → null` ✓; empty string returns "" (non-null) exactly like C
(strlen 0 ≤ 128) ✓ — and roguename on "" falls to the fallback in
both ✓. BUFSZ 256 both sides ✓. `globalThis.process.env` follows the
c_getenv precedent (no `node:` import; Chrome → unset → null →
fallback, deterministic per platform) ✓. Nit (unqueued): JS measures
UTF-16 code units where C measures bytes, so a non-ASCII env value
between 65–128 chars is accepted where C rejects — unreachable in
practice (contest env is ASCII); same shape as the c_getenv
precedent. Verdict: ACCEPT.

## Stale audits — mon_nam_too + docallcmd

mon_nam_too (C do_name.c:1191–1216): full-body re-read — JS
js/do_name.js:1225 matches C exactly (identity branch, all four
pronoun cases incl. the `default:`/`case 2:` shared arm and the
hallucination comment) ✓; cited callers confirmed live
(js/mhitm.js:2079/:4184/:5763+). Stale-ported VALID.
docallcmd (C do_name.c:499–601): 0 C references confirmed via csym
✓; JS js/do_name.js:1640 + menu helper :1592 structurally match the C
head (cmdq_pop, KEY→ch, menu fallback, switch) at comparable size.
Stale claim carries C range + JS lines + the 0-ref fact; accepted
without a line-by-line re-audit (no JS changed). Verdicts: ACCEPT.

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate gates.
Rule #2 clean (iteration-wide rulecheck; the `globalThis.process`
read is the sanctioned no-import idiom).

## Hallucinations / overclaim

None. "No clone #2", "sole reader" (NUL-write), and the edge-safety
reasoning all corroborated. "Small diff by exhaustion" carries a
`rows 200` citation for the same-file closure.

## Density

One whole C function ported + two documented stales (one fully
re-verified here), ~33 js insertions on an exhausted closure — the
~80-floor exception with evidence. Per-function Ledger (all three
ported) and Verify lines present.

- Ledger: roguename ported — ACCEPT.
- Ledger: mon_nam_too ported (stale) — ACCEPT.
- Ledger: docallcmd ported (stale) — ACCEPT.

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
reach roguename: 21 baseline-PASS session(s) reach it (21 run, 25.5s): 21 PASS, 0 regressed → REACH-OK
smoke mon_nam_too: no RNG-tagged reach; fixed smoke spread (24 run, 10.7s): 24 PASS, 0 regressed → REACH-OK
smoke docallcmd: no RNG-tagged reach; fixed smoke spread (24 run, 10.7s): 24 PASS, 0 regressed → REACH-OK
```

(All three: 0 blocked at baseline.) Matches the D-log exactly,
including the genuine 21-session reach on roguename. Note: corpus
reach executes the fallback path (ROGUEOPTS unset everywhere); the
new env arm is covered by the C-reading above, not by sessions —
inherent to env-gated code, not an overclaim. No REGRESSED session.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
