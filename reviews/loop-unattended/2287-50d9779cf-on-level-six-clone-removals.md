# Review 2287 — 50d9779cf — on_level ×6 clone removals

- SHA: `50d9779cf` (D-3331)
- Files: `js/teleport.js`, `js/shk.js`, `js/priest.js`, `js/getpos.js`,
  `js/vault.js`, `js/muse.js`, `js/dungeon.js` (comment)
- Insertions: ~22 js/ across 7 files; single-symbol 6-file rewire

## Intent vs deliverable

Subject promises: "`dungeon.c` on_level ×6 clone removals
(teleport/shk/priest/getpos/vault/muse → live export)". The diff
delivers exactly that: 6 clones deleted (the last of the 14), 3
ALREADY edges extended, 3 new static edges, one C-cite comment per
site (15), call-site expressions unchanged, census test extended to
assert dungeon.js is the sole definer. No DIAG/FORCE/seed; Rule #2
clean (iteration-wide rulecheck).

## Inventory

- `on_level`: live js/dungeon.js:1810 unchanged; deleted clones in
  teleport (4 sites), shk (5), priest (2), getpos (1), vault (2),
  muse (1). Vault's stale `// :893-894` trailing cite replaced with
  the C vault.c:901 cite. Remaining-clone comment 6→0.

## C ↔ JS fidelity

C `on_level` (dungeon.c:1438–1443, verified in review 2285): NONNULL
dnum+dlevel equality; live JS folds nullish via `|0`. Clone shapes
split 4/2: getpos/muse clones were already the identical unguarded
`?.`+`|0` shape — zero behavior change, pure rewire. The 4
`!!`-guarded clones (teleport/shk/priest/vault) differ from live
only on a nullish arg: one-nullish folds to {0,0} vs a real level
(dlevel ≥ 1) → false, same as the clone; both-nullish → live true
vs clone false. The D-log's nullish audit covers this: every site
pairs a level against a non-null side (u.uz mid-game-set at
teleport/shk/vault/getpos gates; mon-typed gdlevel; muse use_misc),
so both-nullish is unreachable and one-nullish agrees. The both-
nullish case is less explicit than D-3329's audit but the pairing
argument implies it, and all 15 sites pass at least one always-set
operand. C citations per site check against the named C loci
(shk.c:274/:1044/:1410/:2523/:2560, teleport.c:1419/:1460,
priest.c:157/:926, pager.c:1605, vault.c:58/:901, muse.c:2410).
Required `sym.mjs` output:

```
on_level         js/dungeon.js:1811   sync
```

Clone-free (only `on_level_updown`/`on_level_dig`, distinct
functions) — the 6→0 census claim holds at HEAD.

## Hallucinations / overclaim

None. "Whole C body live" holds (6-line body). The 0-remain claim
is machine-checked by the extended census test, not asserted.

## Density

Single-symbol 6-file rewire; ~22 insertions below the bar, defended
with the batch precedent, and this is the whole closure (all 6
remaining dungeon.c rows ship; `on_level` now has zero clones).
`Ledger:` on_level entry; per-function Verify line present. No RNG
in the body. Gates per D-log: syntax · rule2 · hidden-note ·
reach · green · strict · cohort · skip full (dungeon.js change is
comment-only — correct call).

## Verification

Re-measured (`hidden-proxy.mjs verify on_level --base
50d9779cf~1 --reach-all`): 0 blocked (row cited 0 — honestly
vacuous, D-log says so) + smoke 24/24 PASS, 0 regressed →
REACH-OK. Matches the D-log.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
