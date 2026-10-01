# Review 2160 — 6e06fa8e7 — s_suffix completion (6 homes, 5 missed)

SHA `6e06fa8e7`, D-3200; 2026-10-01; 6 js files, ~30 insertions
(do_name/explode/minion/mthrowu/questpgr/shk). One-function cluster
(s_suffix) + pickup/use_container STALE-SPLIT retirement. Closes no
prior review.

**Addressed:** D-3210

## Metadata

- Subject: "`hacklib.c` s_suffix completion (lowercase-S arm +
  strcmpi it/you + mthrowu z/x/ch/sh removal; 6 C-exact homes)".
- Promises: all six s_suffix bodies become the C-exact 4-arm sequence
  (case-insensitive it/you, lowercase-'s'-only, `String(s ?? '')`).

## Intent vs deliverable

Kept for the six touched homes; the sweep missed five more. Diff fixes
do_name (canonical export) + explode/minion/mthrowu/questpgr/shk
locals exactly as promised, no import changes, no new edges. But five
suffixed `s_suffix_*` locals — each documented "C ref: hacklib.c
s_suffix" and called at genuine s_suffix call sites — keep the
identical C-wrong (zap keeps the full pre-fix shape), unmentioned in
the D-log, while the commit closes the ledger row as `split` on the 6
plain homes. The "completion" label buries them.

## Inventory — s_suffix (6 touched homes)

Changed in place, same 4-arm body modulo var names: `js/do_name.js:411`
(export), `js/explode.js:146`, `js/minion.js:84`, `js/mthrowu.js:188`,
`js/questpgr.js:673`, `js/shk.js:242` (locals). Deleted/re-pointed:
none — no symbol output required beyond the home census:

```text
s_suffix         js/do_name.js:411   sync
             !! ALSO 5 LOCAL CLONE(S) in 5 files — IMPORT the export; do NOT add another
               js/explode.js:146  js/minion.js:84  js/mthrowu.js:188  js/questpgr.js:673  js/shk.js:242
```

Fix-in-place (zero new edges) is reasoned and acceptable; every caller
keeps its callee.

## C ↔ JS fidelity — s_suffix

C `hacklib.c:344–359` (csym range): Strcpy; `strcmpi it`→+s;
`strcmpi you`→+r; `*(eos(buf)-1) == 's'`→+`; else →+'s. All six new
bodies match arm-for-arm in C order: `toLowerCase` comparison ≡ ASCII
strcmpi (locale-invariant; no Unicode fold maps onto it/you
asymmetrically); case preserved in the output (`It`→`Its`, like C
Strcat onto the original buffer) ✓; `endsWith('s')` ≡ the
lowercase-only predicate (`CHRIS`→`CHRIS's`) ✓; empty input → `'s`
(C reads buf[-1], practically ≠ 's') ✓; mthrowu z/x/ch/sh correctly
gone (no such C arm) ✓; invented `"its"` falsy default gone ✓.
No RNG in C; none added. The six homes are C-exact. Verdict on the
diff: ACCEPT.

The five missed homes (current tree = still divergent at HEAD):

- `s_suffix_eat` js/eat.js:3392 — `|| endsWith('S')` kept; called at
  eat.c:622/625/630 brain plines (verified call sites).
- `s_suffix_mm` js/mhitm.js:5814 — `|| endsWith('S')` kept.
- `s_suffix_throw_gold` js/dothrow.js:872 — `|| endsWith('S')` kept.
- `s_suffix_pot` js/potion.js:3010 — `|| endsWith('S')` kept.
- `s_suffix_zap` js/zap.js:2688 — full pre-fix shape: `if (!s) return
  s`, It-only case, **no you arm at all**, z/x/ch/sh arm kept.

Each is doc'd "C ref: hacklib.c s_suffix" — CLONE by the method's
taxonomy, and each diverges from C, so each is a C-wrong, not a named
omit. D-3200's "JS was" census and the ledger `split` list name only
the 6 plain homes; grep confirms zero D-log mentions of the suffixed
five. Observable whenever a name ending in uppercase S flows through
(e.g. an all-caps pet name in the eat brain pline: C `XERXES's`,
JS `XERXES'`).

Diff grep: no FORCE/DIAG/getRngLog/fastforward/seed/coordinate gates.
Rule #2 clean (iteration-wide rulecheck).

## Hallucinations / overclaim

"6 C-exact homes" is literally true but "completion" + "Named: none
in the body" + ledger `split` closure jointly claim s_suffix done
while five documented clones keep the fixed bug (and zap keeps four
more). The sweep was name-exact (`s_suffix`) and missed the suffixed
aliases — the overclaim is the miss, not the six bodies.

## Density

One 16-line C function, ~30 js insertions — below the ~80 floor for a
non-Must-fix port — and the in-scope remainder (the five suffixed
siblings, same fix) was left in the tree while the ledger row closed.
Per-function Ledger (s_suffix split) and Verify lines present, but the
split list is incomplete.

- Ledger: s_suffix split (6 homes) — ACCEPT on the diff; the function
  is QUALITY-RISK via the five unlisted divergent homes.

## Verification

Re-measured (one call, current tree incl. this SHA):

```text
verify s_suffix: baseline 6e06fa8e7~1 (scoreboard at acf56d4dd) — 0 session(s) blocked on it (0 at baseline, 0 working)
smoke s_suffix: no RNG-tagged reach; fixed smoke spread (24 run, 11.0s): 24 PASS, 0 regressed → REACH-OK
```

Matches the D-log (0 blocked, smoke 24/24, green 2/2, strict ×2,
cohort 7/7, full 44/44). No REGRESSED session; vacuity stated
plainly. Verification does not cover the missed homes (same vacuous
class — message-text, no RNG tag).

## Actionable C-wrongs

1. s_suffix suffixed-clone family (5 homes): drop the `|| endsWith('S')`
   disjunct in s_suffix_eat/mm/throw_gold/pot; rewrite s_suffix_zap to
   the 4-arm body (add the you arm, drop z/x/ch/sh + falsy passthrough).
   One port iter: 4 one-line edits + zap body + full gates. Queueable
   below.

Verdict: **QUALITY-RISK**
