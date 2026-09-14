# Review 1236 — 04af89bd — stinky_nemesis gas arm + killed_nemesis texts

- SHA: `04af89bd` — "`questpgr.c` `stinky_nemesis` gas arm + all-13-role `killed_nemesis` texts (D-2270)"
- D-log: D-2270. Queue row: `questpgr.c` stinky_nemesis (mondead-tail D-2231
  named omit). No corpus session reaches a nemesis death.
- Character: data table + predicate + caller wiring; omission fix, no corpus
  divergence.

## Intent vs deliverable

Subject promises: the `killed_nemesis` text table, the `stinky_nemesis` export,
and the `m_detach` MS_NEMESIS wiring to the live `nemesis_stinks`. Diff
actually adds: 13-role `QUEST_KILLED_NEMESIS` + 11-role META + registry entry,
`stinky_nemesis`, the two-line `m_detach` call, two import tokens, and retires
the stale omit comments. Promise matches diff exactly.

## Inventory

- New JS: `QUEST_KILLED_NEMESIS`, META `killed_nemesis`, `stinky_nemesis`
  (`js/questpgr.js`); wiring lines in `m_detach` (`js/mhitm.js:3050-3051`).
- Callees: `com_pager_core` rawtext arm (pre-existing, LIVE — returns text with
  no display, single lookup, no common retry: `js/questpgr.js:941-956`);
  `strstri` (canonical `hacklib.js:261` export, already imported — pointer
  semantics `s.slice(i)` confirmed, so the remainder-search `strstri(p, …)`
  is C-exact); `nemesis_stinks` (`js/quest.js:506`, async export, LIVE, rode
  the existing `quest.js` import).
- Required `--can` output: `ALREADY: mhitm.js already statically imports
  questpgr.js. No new edge needed.` — pasted, confirmed (the D-log's "new
  edge" phrasing is overcautious in the safe direction; there is no new module
  edge at all). Call-time use only, no TDZ risk.

## C ↔ JS fidelity

C loci (via `csym.mjs`): `stinky_nemesis`, `questpgr.c:148-194` (47 lines);
`m_detach`, `mon.c:2733-2803` (MS_NEMESIS arm `:2768-2773`).

- C uses the `#else` hero-filecode path (`gu.urole.filecode`, no common retry,
  `nhUse(mon)`); JS `void mtmp` + single `com_pager_core(filecode,
  'killed_nemesis', false, rawOut)` ✓. The `#if 0` neminum scan is dead C —
  correctly not ported.
- `strNsubst(mesg, "\n", " ", 0)` (all) → JS `split('\n').join(' ')` ✓.
  Short-circuit `strstri` chain + remainder match on `p` ✓ (pointer semantics
  verified, not boolean). Miss/NULL → 0 ✓.
- Wiring: C `nemdead(); if (stinky_nemesis(mtmp)) nemesis_stinks(mx, my);`
  with the Arc/Cav/Pri comment; JS identical order with the same comment ✓.
- Table: spot-checked Arc, Bar, Cav, Hea, Kni byte-for-byte against
  `nethack-c/upstream/dat/quest.lua` (`:317`, `:554`, `:780`, `:998`, `:1233`)
  — exact, including Cav/Arc having no synopsis/output (META omits them,
  matching lua). Predicate consequence verified on the lua texts: only
  Arc/Cav ("noxious fumes") and Pri ("noxious gas") match; Wiz "choking dust"
  and the rest correctly miss. (D-log's throwaway probe claimed ALL-OK on all
  13 + the live-module role sweep; my 5-role sample agrees.)
- `nemdead`'s `qt_pager('killed_nemesis')` previously paged nothing for every
  role (table missing) — this commit fixes that display path as a side effect;
  consistent with C, not scope creep.

No C-wrong. Remaining deferrals (thiefdead/shkgone/vamprises, `com_pager_core`
array-rn2) are separate rows, correctly untouched.

## Hallucinations / overclaim

None. No PASS claimed; the vacuous verify is disclosed as such.

## Density

~130 insertions across 2 files — the table is load-bearing data (C reads lua at
runtime; JS must embed all 13 for the hero-filecode lookup), one C family, one
falsifier. Right-sized.

## Verification

- Re-measured: `node scripts/hidden-proxy.mjs verify stinky_nemesis` → "0
  session(s) blocked on it (0 at baseline, 0 in the working scoreboard)".
  Matches the D-log's vacuous note; row cited 0 blocks so no `--base` owed.
- `imports.mjs --rulecheck` clean (re-run this review, review 1232). D-log
  cites green 2/2 + strict ×2 + cohort 7/7 plus a hand-run full `sessions`
  44/44 (justified: `m_detach` is shared-adjacent). The end-of-iteration
  cadence run re-covers the fortress.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
