# Review 2809 — 1d6305025 — g_pututf8 capture fidelity + canonical re-record

- **SHA:** `1d6305025` (Wed 2026-10-14) — human-authored capture correction (D-3963).
- **D-entry:** D-3963. **Ledger:** `tty_print_glyph` unknown→partial (omit: topline col-0 residual).
- **Diff size:** `js/display.js` +12/−4; `scripts/hidden-proxy.mjs` `--rerecord`; test flip; process docs.
- **Method:** cliff-equivalent (1 capture rule) — whole Method + state re-measure.

## Intent vs deliverable (promise vs diff)

The subject promises: patch 006 hooks `g_putch` but not `g_pututf8`,
so Enhanced-symset map cells are never written to the scored capture;
D-3944..D-3958 wrongly treated that as a recorder artifact, painted
UTF-8 in JS, and re-recorded with a temp hook. This SHA ports the
capture (drop `g_pututf8` cells like C0), restores canonical
recordings via a new `record --rerecord`, and writes the rule into
Constitution §1.1 / cursor rule / playbook. 42 Enhanced re-recorded:
0→4 PASS, 0 worse; full rescore queued the D-3962 AmigaFont Must-fix.

The diff is exactly that. Promise and diff agree. The
Constitution/cursor-rule/playbook/loop-script edits are authorized
here: the commit is human-authored (Raphaël Hervier), and the playbook
ban on editing those binds loop agents, not the human.

## Inventory

| # | Change | C source | Status |
|---|--------|----------|--------|
| 1 | utf8 arm keeps C value in gbuf + sets `loc.disp_capture_drop` | tty_print_glyph utf8 arm → g_pututf8 wintty.c :3792–3803 (bare putchar loop, no nomux call) | C-exact |
| 2 | both grid writers skip `disp_capture_drop` | patch 006: no `g_pututf8` hook anywhere (grep: 0 hits) vs `g_putch` hook at patch :685–688 | C-exact |
| 3 | `hidden-proxy.mjs record --rerecord <regex>` | tooling (restore canonical recordings) | straightforward |
| 4 | `symset-loader.test.mjs`: 50059006 asserts no `─`, no ASCII fallback, hero `@` captured | hero via plain (hooked) `g_putch` | oracle corrected |
| 5 | Constitution §1.1 + cursor rule + playbook anti-pattern row | process (human-authorized) | as claimed |

No symbol deleted or re-pointed (`sym.mjs` not required). Diff grep:
no FORCE, DIAG, getRngLog, seed names, fastforward, or coordinates in
production. Rule #2 clean (review 2808, same iteration).

## C ↔ JS fidelity

**Unhooked `g_pututf8` (confirmed).** `csym g_pututf8`:
wintty.c :3792–3803, a bare `while (*utf8str) putchar(*utf8str)` loop
with no nomux call ✓. Patch 006 greps 0 hits for `pututf8` while
hooking `g_putch` (:685–688) ✓ — the "hooks g_putch but not
g_pututf8" claim is verified, and `tty_curs` before every
glyph (tty_print_glyph body) means the unrecorded cell keeps its
previous capture content, same rule as the D-3962 C0 drop ✓.

**JS arm condition (unchanged, matches C).** The pre-existing gate —
`WC2_U_UTF8STR` && `H_UTF8` handling && `u->utf8str != null` —
mirrors C's utf8 arm exactly; this SHA only adds the drop mark inside
it ✓. `loc.disp_capture_drop` is stamped unconditionally alongside
the other `disp_*` fields (default false), so no stale-flag leak on
non-utf8 paints ✓. Both grid writers apply the identical skip ✓.

**Citation drift (mechanism true).** The D-log cites
"tty_print_glyph `:4008–4011` → g_pututf8 `:3856`", but upstream is
tty_print_glyph :3854–3977 and g_pututf8 :3792–3803 — both cites land
outside the named functions (possibly patched-tree numbers; unverifiable
here). The JS comment cite (`:3797–3800` putchar loop) is correct.
Cite-only; code unaffected (2801/2805 precedent).

## Hallucinations / overclaim

None. The "supersedes D-3944..D-3958" framing is accurate (those
iterations painted judge-invisible UTF-8 and re-recorded with a temp
hook — the exact behavior now banned). The 7th PASS→FAIL
(Tourist-50059018: PASS only on its hooked recording, canonical moves
11→527) is disclosed, not hidden. "Reproduced without this change"
for the 6 AmigaFont rows is corroborated by D-3964's 6/6 repair
(review 2810).

## Density

Not a standard cliff port — a human-directed ground-truth correction:
`js/` + recordings + the rule that prevents recurrence, with the
D-3962 regression Must-fix queued in the same commit. No bundled
unrelated work; the ledger entry carries the named omit (topline
col-0). The deliverable is movement-class (0→4 PASS, 42 improved, 0
worse on the re-record), not ledger text.

## Verification

`verify g_pututf8 --base 1d6305025~1 --reach-all` is **vacuous by
construction** — no session was ever "blocked on g_pututf8" as an
owner; the SHA's unit is the re-record, which a `--base` verify
cannot replay (recordings changed under it):

```
verify g_pututf8: 0 session(s) blocked on it — vacuous, NOT a corpus PASS
smoke g_pututf8: fixed smoke spread (24 run, 22.3s): 24 PASS, 0 regressed → REACH-OK
```

I re-measured the durable claim instead, from the committed HEAD
board: the 52 `symset:Enhanced` recipes now read **11 PASS, screens
31,132/34,769 (89.5%)** — up from the SHA's 4/42 and 79.3% — and no
FAIL owner is a utf8-capture divergence (all downstream: getdir,
show_gamelog, dfeature_at, … at later steps). Direction holds, 0
worse stands.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
