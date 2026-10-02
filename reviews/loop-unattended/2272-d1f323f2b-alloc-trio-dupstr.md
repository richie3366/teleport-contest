# Review 2272 — d1f323f2b — alloc trio (dupstr guard)

Metadata: SHA `d1f323f2b8c309e633d8ac3870d904d650d784e6`
(D-3316, 2026-10-02). `js/dungeon.js` (+14/−5: `dupstr` guard
arm + doc). `dupstr_n` by-design (no symbol), `fmt_ptr`
stale-complete (no `js/` delta). Cluster of 3, one C file.

Intent vs deliverable: subject promises the head by-design +
stale-complete + guard arm. The diff adds the C-ordered guard
(len → guard → copy) with single-coercion cleanup and C-cited
doc. Delivers what it promises.

Inventory (per function):

- `dupstr_n` — no symbol (C `#if 0`'d out). Correct non-port.
- `fmt_ptr` — no `js/` change; live export js/mkobj.js:1959
  (D-2574), callers in 8 `js/` files at SHA (alloc, botl,
  do_name, light, mkobj, mon, timeout, worn).
- `dupstr` — js/dungeon.js:267–281: same export/signature,
  added overflow guard :276–277. All live JS call sites keep
  working trivially.
- Nothing deleted or re-pointed; no re-point `sym.mjs` owed.

**C ↔ JS fidelity** (per function):

- `dupstr_n` (alloc.c:252–261): the whole body sits inside
  `#if 0 /* suppress this … */` (:249–262, read directly) —
  nothing is compiled, so no symbol is the faithful port.
  By-design booking correct. Confirm.
- `fmt_ptr` (alloc.c:124–135): rotating ptrbuf + `Sprintf(buf,
  %p)`. JS renders `0x`-hex of the port's stable identity
  (`o_id ?? m_id ?? 0`). The %p→identity substitution is
  inherent (JS has no heap pointers) and follows the
  documented D-2574/timeout.js idiom; callers consume the
  string synchronously (impossible/debug payloads), so the
  rotating-buffer fold is safe. Stale-complete verified by
  reading the body, not by trusting the D-number. Confirm.
- `dupstr` (alloc.c:235–247): C `len = strlen`, guard
  `len > (unsigned)(~0U - 1U)` → `panic("dupstr: string
  length overflow")`, then alloc+strcpy. JS: `len` from
  NUL-truncate-or-length ≡ strlen ✓, `len > 0xfffffffe`
  (0xFFFFFFFE ≡ ~0U−1U exactly) ✓, identical message via
  throw ≡ panic (insert_branch idiom for unreachable
  guards) ✓, copy after the guard ✓ — C order throughout.
  Live-body check: the `dupstr→nhdupstr` macro
  (global.h:339) sits in the `#ifdef MONITOR_HEAP` branch
  and no `define MONITOR_HEAP` exists anywhere in upstream,
  so alloc.c:235 is the live game body ✓. The single
  `String(s)` coercion is behavior-identical on reachable
  inputs (old code coerced the same value up to 3×). The
  2^32−1 threshold is unreachable in JS (engine strings cap
  far below), same class as the 1951 nhdupstr debt. No RNG ✓.
  Confirm.

Hallucinations / overclaim: none. The review-1951 mention is
framed as corroborating evidence with its debt explicitly left
unqueued — correct handling of ACCEPT-WITH-DEBT review-debt
(map, not Must-fix), no stamp owed. "C-identical panic message"
verified character-for-character above.

Density: 3 functions, one C file, whole remaining alloc.c Open
set (12/12 declared) — within §10.17. ~10 insertions below ~80
and defended on that ground. Each function has its own `Ledger:`
entry (by-design / ported / ported — correct granularity) and
its own Verify sub-bullet. All three confirm.

Verification: D-log claims 3× vacuous note + smoke REACH-OK +
cluster gates. Re-measured in one call:
`hidden-proxy.mjs verify dupstr_n,fmt_ptr,dupstr --base
d1f323f2b~1 --reach-all` → every function "0 session(s) blocked
(0 at baseline, 0 in working)" + explicit vacuous note + "smoke
(24 run): 24 PASS, 0 regressed → REACH-OK". Queue cited 0 —
vacuous legitimate. Diff grep: no FORCE/DIAG/getRngLog/seed/
fastforward/coordinates. Rule #2 covered iteration-wide.

**Actionable C-wrongs**: none.

Verdict: **ACCEPT**
