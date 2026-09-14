# Review 1234 — 1f904287 — s_suffix clone retired onto canonical import

- SHA: `1f904287` — "`hacklib.c` `s_suffix` uhitm clone retired onto the canonical `do_name.js` import (D-2268)"
- D-log: D-2268. Queue row: `hacklib.c` s_suffix (D-2261 Next). No corpus session.
- Character: clone deletion + import re-point, no new logic.

## Intent vs deliverable

Subject promises: delete the divergent local `s_suffix` in `js/uhitm.js`, import
the canonical `js/do_name.js:383` export. Diff actually does: −12/+1 import
token, all 8 call sites (`:543,936,999,1337,1379,1438,1771,2870`) now resolve to
the import. Promise matches diff exactly.

## Inventory

- Deleted: local `function s_suffix` (was `js/uhitm.js:261-270`).
- Re-pointed: `s_suffix` local → `do_name.js` export. Required `sym.mjs` output:
  `s_suffix  js/do_name.js:383  sync` + 6 remaining local clones in 6 files
  (`explode.js:114`, `minion.js:84`, `mthrowu.js:177`, `questpgr.js:626`,
  `shk.js:224`, `trap.js:2602`) — matching the 6 files the D-log names.
- Required `--can` output: `ALREADY: uhitm.js already statically imports
  do_name.js. No new edge needed.` — pasted, confirmed. No TDZ risk.

## C ↔ JS fidelity

C locus: `nethack-c/upstream/src/hacklib.c:344-359` (via `csym.mjs`).
C arms: `strcmpi "it"` → +"s"; `strcmpi "you"` → +"r"; last char `== 's'`
→ +"'"; else +"’s".

- The deleted clone was a genuine C-wrong, as the D-log claims: it mapped
  trailing z/x/ch/sh → `"'"` where C appends `"'s"` (C tests only trailing
  `'s'`), and it matched only `It`/`You` where C `strcmpi` matches any case.
  Confirmed by reading the deleted body against C — deletion is the correct
  fix (no behavior to preserve).
- Canonical target (`js/do_name.js:383-390`): `toLowerCase` it/you, trailing
  `s` → `'`, else `'s`. Arm-for-arm vs C with one micro-deviation I measured
  myself: JS also maps trailing uppercase `'S'` → `"'"` while C's
  `*(eos(buf)-1) == 's'` is lowercase-only (e.g. all-caps name "CHRIS":
  C "CHRIS's", JS "CHRIS'"). Pre-existing in the canonical export, zero corpus
  reach (no possessive-of-all-caps-name path in any session), unshippable alone
  under density §2b — recorded here, not queued.
- The 6 remaining clones are explicitly named as staying as-was with the reason
  (different owners, separate rows on rescore). Correct per the one-item rule —
  widening this row to 6 files would violate Must-fix singularity.

## Hallucinations / overclaim

None. No "Match C" claim over a stub; the D-log discloses the vacuous verify
rather than calling it a PASS.

## Density

−12/+1 for a 16-line C function, one C locus, clone removal. Right-sized
(C is that small).

## Verification

- Re-measured: `node scripts/hidden-proxy.mjs verify s_suffix` → "0 session(s)
  blocked on it (0 at baseline, 0 in the working scoreboard) … a vacuous verify
  is NOT a corpus PASS". Matches the D-log's explicit "vacuous: 0 blocked …
  NOT a corpus PASS" note. Compliant with the density-§2b path (no corpus
  session blocked → public gates decide).
- `imports.mjs --rulecheck` clean (re-run this review, review 1232). D-log
  cites green 2/2 + strict ×2 + cohort 7/7; the diff cannot move RNG (pure
  message formatting, no draws) and only `js/uhitm.js` changed.

## Actionable C-wrongs

None (the one C-wrong in scope was deleted by this commit; the uppercase-`S`
micro-edge is recorded above, not queued).

Verdict: **ACCEPT**
