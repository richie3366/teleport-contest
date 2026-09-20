# Review 1582 — 868f140c — quest.c chat_with_leader whole-body restart (D-2623)

**Metadata:** SHA `868f140c`, `quest.c` `chat_with_leader`, D-2623.
JS: `js/quest.js` only (+100/−40).

## Intent vs deliverable

Subject promises: the missing Rule 0 (cheater never latched), Rules
1–3 (got_thanks never checked, questart never scanned), the re-gated
banished arm (`com_pager` + livelog, `!pissed_off` gate), and the
assignquest livelog. Diff delivers all of them plus `livelog_printf` /
`noit_mon_nam` / `LL_ACHIEVE` joins. Promise matches deliverable.

## Inventory

- `chat_with_leader(mtmp)` — restarted module-local body.
- `livelog_printf` (pline.js — imports.mjs SAFE, no cycle) +
  `noit_mon_nam` / `LL_ACHIEVE` joined to existing edges.
- No deleted symbol, no local→import re-point.

## C ↔ JS fidelity

C locus `quest.c:281–368` (88 L, via `csym.mjs chat_with_leader`;
callers `:390` leader_speaks, `:476` quest_chat). Full C body read
here. Rule-by-rule confirm:

- Entry guard (`:284`) — exact.
- Rule 0 latch-only cheater (`:287–289`): `u.uhave?.questart` per the
  zap.js/trap.js precedent; new `qs.met_nemesis` / `qs.cheater` keys
  with undefined ≡ C zero-init; sets true only, never resets — exact.
- Rule 1 `finish_quest(null)` on amulet / Rule 2 `qt_pager('posthanks')`
  (`:294–301`) — exact.
- Rule 3 array scan for the first `is_quest_artifact` hit, null when
  absent, `finish_quest(otmp)` (`:304–312`): C's `gi.invent` walk ≡ the
  JS array walk, loop-exhausted NULL ≡ null — exact.
- Rule 4 encourage (`:315–316`) — exact.
- Rule 5 first/next + met_leader/not_ready (`:322–327`), qstart portal
  gate (`:332`), badlevel (`:334–337`) — exact.
- Banished arm re-gated on `!pissed_off` with com_pager + expulsion +
  `LL_ACHIEVE` "expelled" livelog (`:339–347`) — exact, message text
  verbatim; an already-pissed leader now does nothing, per C (the old
  unconditional-fire C-wrong fixed).
- badalign (`:349–353`), assignquest + got_quest + "granted access"
  livelog (`:354–365`, text verbatim) — exact.
- `is_pure` stays awaited (async wizard-yn variant — established);
  `purity` is `let` for the C assignment-in-condition (`:338`) — exact.

RNG: none in C, none in JS. Rule 1 reads `u.uhave?.amulet ||
u.uhave_amulet` — an additive shape fallback following the file's own
line-341 precedent; fires only where the hero shape splits possession.
Not a C-wrong (noted, not queued).

Callee closure (`sym.mjs`): `noit_mon_nam js/do_name.js:1260 sync`,
`livelog_printf js/pline.js:23 sync`, `qt_pager js/questpgr.js:1022
ASYNC`, `com_pager js/questpgr.js:1012 ASYNC` (both awaited),
`finish_quest` live in-file, `is_quest_artifact` resolves to the
in-file C-cited twin (`quest.js:277`, identical to `dogmove.js:145` —
pre-existing duplication with a documented `want!==0` guard, not added
here), `expulsion` pre-existing file-local clone (call kind unchanged).
Pager-text bodies OMIT — named in-commit + map with the questpgr
extractor pointer; the calls stay live and burn the shuffle.

Caller wiring (both checked in context): `leader_speaks` keeps the C
`:390` `!pissed_off` guard (quest.js:480); `quest_chat` checks
`leader_m_id` (C `:476`; setmangry tail stays named) — exact.

## Hallucinations / overclaim

None. "Resolves when it lands" is not claimed anywhere here —
everything queued is live.

## Density

Single-function restart (88 L C), one module. Right-sized.

## Verification

- `node scripts/imports.mjs --rulecheck` → Rule #2 clean (whole `js/`).
- Diff grep: 0 `FORCE`/`DIAG`/`getRngLog`/`fastforward`/RNG/seed/
  coordinate reads in added lines.
- Re-measured: `hidden-proxy.mjs verify chat_with_leader --base
  868f140c~1 --reach-all` → `0 session(s) blocked` at baseline and
  working tree (vacuous-note path, honestly labeled) + `smoke 24/24
  PASS, 0 regressed → REACH-OK`. Both summary lines cited;
  green/strict/cohort + 10/10 scratch probe per D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
