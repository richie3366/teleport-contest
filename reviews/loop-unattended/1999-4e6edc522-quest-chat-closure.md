# Review 1999 — 4e6edc522 — quest_chat whole + nemesis/guardian staticfns

Metadata: SHA `4e6edc522`, D-3039, js/quest.js only (+75/−~28). Next index 1999.

## Intent vs deliverable

Subject promises "`quest.c` quest_chat whole + nemesis/guardian staticfns".
Diff actually adds: file-local `chat_with_nemesis`, `chat_with_guardian`,
restarted exported `quest_chat`; `MS_GUARDIAN=38` const; `setmangry` +
`mon_nam` folded into existing imports. No new cross-module edges. Matches
promise. Header omission lines retired.

## Inventory

- `chat_with_nemesis` (new, file-local) — C staticfn quest.c:393–400.
- `chat_with_guardian` (new, file-local) — C staticfn quest.c:440–448.
- `quest_chat` (restarted export) — C quest.c:472–492.

## C ↔ JS fidelity

`quest_chat` (C `:472–492`, via `node scripts/csym.mjs quest_chat`):
leader arm bare `m_id == leader_m_id` ✓ (old `&& qs.leader_m_id` guard
removed — correct, C has none); `chat_with_leader` :476 ✓;
`pissed_off → setmangry(mtmp, FALSE)` :477–479 ✓ (`await`, correct —
`setmangry` is async js/mon.js:1428); switch on `msound` :482 with
MS_NEMESIS :483–485 / MS_GUARDIAN :486–488 / `impossible(... mon_nam)`
default :490 ✓ (`mon_nam` live sync js/do_name.js:1177). Caller
sounds.c:731 wired per D-log at js/sounds.js:1293 (pre-existing edge,
not re-verified here — caller table unchanged by this diff).

`chat_with_nemesis` (C `:393–400`): `qt_pager("discourage")` :397 ✓
(live import from questpgr.js); `if (!met_nemesis) met_nemesis++` :398–399
→ `if (!qs.met_nemesis) qs.met_nemesis = ((qs.met_nemesis|0)+1)` ✓ —
equivalent under the guard (0/absent → 1).

`chat_with_guardian` (C `:440–448`): `uhave.questart && killed_nemesis`
→ after/before pager :444–447 ✓ (`u.uhave?.questart` optional-chain is a
safe JS-absent-state guard, same truthiness).

No RNG calls in any of the three; branch order is C order with per-arm
`:line` cites. Callee closure: `chat_with_leader` (pre-existing live),
`setmangry` LIVE, `qt_pager` LIVE, `impossible` LIVE, `mon_nam` LIVE —
no clones, no stubs, no omits. The `qt_pager` "miss no-op deliver"
comment refers to unextracted pager *texts*, not a stubbed callee —
the call is still made.

## Hallucinations / overclaim

None. "Every arm ported, every callee live" is accurate; Named: none.

## Density

Breadth-phase cluster: 3 functions, one C file, callee closure —
within §2b (≤10 fns, whole bodies). Each has its own Ledger entry per
commit message. Not bundled with unrelated files. OK.

## Verification

D-log Verify bullet cites `verify.mjs --fn quest_chat,chat_with_nemesis,
chat_with_guardian` → PASS + REACH-OK (smoke spread, no RNG reach) +
green/strict/cohort. Re-measured:
`hidden-proxy.mjs verify quest_chat,chat_with_nemesis,chat_with_guardian
--base 4e6edc522~1 --reach-all` → 0 blocked at baseline (vacuous, expected
for a coverage row — D-log says so explicitly, not presented as PASS),
smoke 24/24 PASS each → REACH-OK ×3. No REGRESSED sessions. Rule #2 clean
(global run). Diff grep: no FORCE/DIAG/RNG-log/seed/coordinate reads.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
