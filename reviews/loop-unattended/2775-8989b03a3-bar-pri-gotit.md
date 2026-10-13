# Review 2775 — 8989b03a3 — Bar+Pri gotit quest data

- **SHA:** `8989b03a3` (Tue 2026-10-13) — cliffs-head `invent.c` look_here writer (D-3922).
- **D-entry:** D-3922. **Ledger:** `com_pager_core` ported (re-stamp).
- **Diff size:** `js/questpgr.js` +13 datum/meta lines; 2 new tests (Bar/Pri wish-grant prefixes).
- **Method:** cliff commit, data-only — whole Method on the 2 new bodies + 2 meta rows.

## Intent vs deliverable (promise vs diff)

The subject promises: two worldtour wish-grant steps (Barb-587116 s118,
Priest-587309 s807) where C shows the role `gotit` text window and JS
skipped straight to the pickup listing, because `QUEST_GOTIT` had no
Bar/Pri body (role miss + common-retry miss, plus a second shuffle); the
fix adds both bodies verbatim + meta; both probes go 118→PASS / 807→PASS.

The diff actually adds: `QUEST_GOTIT.Bar` / `.Pri` bodies, two
`QUEST_MSG_META.gotit` rows (`output:'text'` + synopsis), one table-doc
touch, two prefix tests. No code, no imports. Promise and diff agree.

## Inventory

| # | JS change | C source | Status |
|---|-----------|----------|--------|
| 1 | `QUEST_GOTIT.Bar` (questpgr.js:698-700) | quest.lua Bar gotit :508-514 | verbatim datum |
| 2 | `QUEST_GOTIT.Pri` (questpgr.js:702-709) | quest.lua Pri gotit :1622-1633 | verbatim datum |
| 3 | `QUEST_MSG_META.gotit` Bar/Pri (questpgr.js:938-945) | same stanzas' synopsis/output | verbatim meta |
| 4 | 2 tests (Bar/Pri wish-grant prefixes) | s118 / s807 | new, in scripts/ |

No JS function added, changed, deleted, or re-pointed; no `sym.mjs`
re-point output is required.

## C ↔ JS fidelity

Pinned lua read directly (`awk` with line numbers):

- **Bar text:** `As you pick up %o, you feel the power of it /
  flowing through your hands.  It seems to be in two or more places /
  at once, even though you are holding it.` — JS byte-identical,
  including the double space after `hands.`. Synopsis `[You feel the
  power of %o flowing through your hands.]` + `output = "text"` — JS
  meta identical.
- **Pri text:** 7-line body with mid-text blank line, double spaces after
  `soul.` and `%d.`, conversions `%o/%d/%n/%H/%ca/%l` — JS byte-identical
  on every line. Synopsis `[You feel %d as you pick up %o; return %oh to
  %l.]` + `output = "text"` — JS meta identical.
- **`%oh` conversion:** the D-log's conversion list omits `%oh`, but no
  gap exists — `%oh` (like the other `%Xh` pronouns) renders via
  `convert_line` + `qtext_pronoun` (D-1634; questpgr.js:730 comment) and
  is already exercised by a live synopsis (questpgr.js:804). The Priest
  session PASSES through this synopsis, proving the render path.
- **Cite nit (comment-only, not a C-wrong):** the JS comments cite
  `quest.lua:508-513` and `:1622-1631`, but the stanzas close at `:514`
  and `:1633` (the cites stop at the last text line, unlike the Arc
  precedent `:283-289` which includes the close). Content is exact; the
  range endpoints are short by the stanza closer. Not queueable.
- **No RNG / branch order:** data rows; the RNG effect (removing the
  retry shuffle) is structural, confirmed by the corpus re-measure.

## Hallucinations / overclaim

- "TEXT/SYN/OUT EQUAL true ×6" — consistent with my independent line-by-line
  read of both stanzas (text + synopsis + output × 2 roles).
- No "Match C" is claimed for any stubbed callee; the consuming pager path
  (`qt_pager` → `com_pager_core` → `deliver_by_window`) is exercised live
  by both PASSes. None found.

## Density

Cliff phase (§10.18): the parent's generated cliffs head was `invent.c`
look_here blocking exactly these 2 sessions (verified in
`8989b03a3~1:docs/LOOP-QUEUE.md`, top row, RNG lost 22657). Owner stands
whole per D-2193 (read once per tag); both blocked sessions named the same
writer family (role gotit data), so shipping both bodies in the one cliff
commit is correct — not bundled unrelated work. Own Ledger row re-stamped.
One cliff, code + ledger + verify in one handoff.

Anti-pattern grep on the `js/` hunks: only the commit message's own "no
DIAG/FORCE/seed gates" sentence. Rule #2: `imports.mjs --rulecheck` →
clean (run this iteration, cited for all 9 SHAs).

## Verification

Re-measured myself:

```
verify look_here: baseline 8989b03a3~1 — 2 session(s) blocked on it
  scen-worldtour-Barbarian-587116: PASS
  scen-worldtour-Priest-587309: PASS
verify look_here: 2 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
smoke look_here: no RNG-tagged reach; fixed smoke spread: 24 PASS, 0 regressed → REACH-OK
```

D-log's "2 PASS" reproduced exactly; smoke spread 24/24 (look_here draws
no RNG, so the fixed smoke spread is the correct REACH instrument — no
vacuous check). No REGRESSED session. Movement + REACH-OK: satisfied. New
tests 0/1+0/1 pre → 1/1+1/1 post per the D-log (authentic red on the gotit
head lines).

## Actionable C-wrongs

None. Both bodies and both meta rows are byte-exact vs pinned lua; both
corpus claims re-measure clean.

Verdict: **ACCEPT**
