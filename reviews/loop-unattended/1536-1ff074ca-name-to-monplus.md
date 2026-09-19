# Review 1536 — 1ff074ca — mondata.c name_to_monplus (D-2577)

## Metadata

- SHA: `1ff074ca`
- D-id: D-2577. Next index: 1536.
- Files:
  - `js/mondata.js` (+165/−82: restarted `name_to_monplus`, 55-entry
    `ALT_NAMES` with `:line` group cites).
  - `js/botl.js` (+36/−3: new exported `title_to_mon`).
  - `js/readobjnam.js` (+5/−1: gender box passthrough at the `:4408`
    caller).
- C locus:
  - `nethack-c/upstream/src/mondata.c:893–1085` (`name_to_monplus`).
  - `nethack-c/upstream/src/botl.c:366–399` (`title_to_mon`).
  - Caller `nethack-c/upstream/src/objnam.c:4406–4409`.
  - All via `node scripts/csym.mjs` / direct reads (ranges above).

## Intent vs deliverable

Subject promises:

> `mondata.c` name_to_monplus whole-body port (60-entry alt table,
> plural pre-fixes, title_to_mon) + 3 stale parks (D-2577).

Diff delivers all of it (table count nit below). Promise matches
deliverable.

## Inventory

- Restarted: `name_to_monplus` (mondata.js, export retained).
- New: `title_to_mon(str, rankBox, lenBox)` — exported,
  `js/botl.js:803`. `sym.mjs` single export. Correct C home (botl.c).
- Callees: `title_to_mon`, `str_start_is` (hacklib.js:125, live),
  `monsterNames`/`pmnames`/`NUMMONS` (existing imports).
- Both import joins extend existing static imports; no new edge.
- No deleted symbols. No STUB in any live arm.
- The 3 stale parks in the same commit were checked at the queue, not
  re-audited here.

## C ↔ JS fidelity

Walked the full C body here:

- Remainder init (`:915–916`). Match.
- House null-guard for NONNULLARG1. Match (extension, benign).
- Article strip now case-sensitive `strncmp` — the old code lowercased
  first, a real C-wrong fixed here. Match.
- Plural pre-fixes, exact:
  - vortices via lowercased `indexOf` (= `strstri`) with
    `slice(0, vort+4) + 'ex'`, reproducing C's truncating
    `Strcpy(s+4, "ex")` (tail cut both sides). Match.
  - ies guard De Morgan-equivalent (`len < 7 || !endsWith('zombies')`)
    with the zombies exclusion. Match.
  - ves → f. Match.
  - `slen` recomputed (`:942`). Match.
- Alt table verified mechanically here:
  - C `alt_spl` list holds 55 names; JS holds 55 `{ name:` entries
    (`grep -c` both sides) — complete and ordered with `:line` group
    cites (grey/gray, priests, masters, outdated, weres, hyphenates,
    irregular plurals).
  - Scan semantics exact: `strncmpi` → lowercased `startsWith`,
    boundary `(!str[len] || ' ' || '\'')`. Match.
  - Immediate return with `inStr.slice(skip + len)`, reproducing C's
    `in_str + (&str[len] - buf)` pointer arithmetic (skip + len —
    mutation never moves the base), including the documented
    "wolves" → rest-`"es"` quirk. Match.
  - genderhint written unconditionally (`:1011–1012`). Match.
- pmnames scan:
  - `LOW_PM..NUMMONS`, MALE-first, strictly-longer replace
    (`mLen <= len` skip), exact-break of both loops. Match.
  - All 9 C boundary alternatives (`' '`, `s`, `s␣`, `'`, `'␣`,
    `'s`, `'s␣`, `es`, `es␣`) present against the lowercased tail.
    Match.
- Title fallback gated on `mntmp == NON_PM` with null rankBox. Match.
- `len && remainder` gate. Match.
- Neuter no-override rule verbatim (`:1078–1083`); title path leaves
  matchgend −1 per the C FIXME. Match.
- `title_to_mon` vs `botl.c:366–399`, read in full here: sentinel
  loop, 9 slots, male-then-female, caseblind `str_start_is`, optional
  boxes, len 0 + NON_PM on miss. Match on every line.
- Caller gate `mntmp < LOW_PM && len > 2` with the gender box threaded
  per `:4408` (`js/readobjnam.js:1224–1232`, read here). Match.

## Hallucinations / overclaim

One nit, not a C-wrong: subject and D-log say "60-entry" table — both
sides actually hold 55 (`grep -c '{ name:'` = 55; C initializers = 55;
the extra `{ "…` hits past `erinyes` are the locomotion table). Table
complete; count overstated by ~9 %.

## Density

~206 `js/` insertions for a 197-line C function + a 34-line callee +
caller wiring — one function family, right size (§2b).

## Verification

- D-log claims VERIFY PASS (coverage row, 0 blocked at baseline).
- Re-ran here (required):
  - `hidden-proxy verify name_to_monplus --base 1ff074ca~1
    --reach-all`
  - → 0 blocked both sides (vacuous note, expected)
  - → smoke 24/24 REACH-OK.
- Claim confirmed. No RNG in the function.
- Diff grep: no FORCE/DIAG/seed/coordinate/`fastforward` content.

## Actionable C-wrongs

1. **D-2577 regresses scen-wish-Priest-92163 (step 234) + scen-wish-Rogue-92221 (step 92), owner next_ident mkobj.c:521.** Audit full re-score (494/540 vs 497/540 at window start) plus worktree bisection: both PASS with js@a90eb521 (7598/7598 RNG, 427/427 screens) and FAIL with js@1ff074ca; reverting `js/readobjnam.js` alone does not fix, so the trigger is the matcher, not the gender write-back. Mechanism (measured in a scratch worktree): the wish `cursed the Master Key of Thievery` reaches the :1230 corpse block with `d.bp = "Master Key of Thievery"`, where the NEW `title_to_mon` fallback matches the Monk rank-8 title "Master" (roles[5], len 6 → mntmp 336, rest `" Key of Thievery"`). Old code returned NON_PM so the block never fired and the full-string artifact wish resolved + blasted. C's matcher agrees with the match (same role.c:243 table), and C grants + blasts — so the (correct) match exposes a latent downstream wish-path gap: from mntmp=Monk + truncated bp the JS never reaches `artifact_name("Master Key of Thievery")` (→ `touch_artifact` blast) and dies with `Nothing fitting that description exists in the game.` Fix in the postparse1→postparse3 wish flow (actualn/dn derivation vs the truncation, per C `:4431–4435` + `:4872–4878`), not in the matcher. **Addressed:** D-2584 `c50782ea`

## Audit re-score correction (2026-09-19, post-review)

Same staleness story as review 1533: neither session executes
`name_to_monplus` under an RNG tag the reach set tracks (their
divergence surfaces rounds later under `next_ident`), so every
committed scoreboard in the window carried stale PASSes. The audit
full `score` exposed both flips.

Verdict: **QUALITY-RISK**
