# Review 2032 — aa12e06ff — release_sound_mappings + 2 stale

Metadata: SHA `aa12e06ff`, D-3072, js/sounds.js (+21). Single function
+ `mcould_eat_tin` / `get_dgn_align` retired stale.

## Intent vs deliverable

Promise: port release_sound_mappings (MISSING, 9 code L) and retire
two stale rows. Diff adds the one export in C order; nothing else.
Kept.

## Inventory

- `release_sound_mappings` (NEW export js/sounds.js:321, sync):
  whole C body. Callee: live `regex_free` (pre-existing options.js
  import — no new edge). State: module `let` soundmap/sounddir.
  No clones, no stubs, no deleted symbols.

## C ↔ JS fidelity

C sounds.c:1675–1690 (csym range): nextsound pre-NULL ✓, while
loop (next :1681, regex_free :1682, filename+struct frees as
GC-unlink :1683–1684, advance :1685) ✓, `if (sounddir) free,
sounddir = 0` ✓ (`free`+null — the comma expression preserved
as the guarded null). Sole C caller save.c:1161 `freedynamicdata`
(save-freeing teardown) — named, deliberately unwired like
add_sound_mapping. No RNG. Confirm.

Region note: the body sits inside `#ifdef USER_SOUNDS`
(:1539–:1691), which the contest build does not define — but
js/sounds.js is an established source-level port of that region
(D-2776, add_sound_mapping precedent), so porting the body is
file-consistent, not scope creep. Confirm.

Stale pair: both present as single file-local defs with the
noted caller counts — mcould_eat_tin js/muse.js:1483 (def + 3
sites ✓) and get_dgn_align js/dungeon.js:474 (def + 2 sites ✓).
Confirm (structural; bodies were pop-time brief-verified).

## Hallucinations / overclaim

None. "None in-body — whole body" holds; the unwired sole caller
is named, not hidden.

## Density

Single whole function, ships alone (0 callees, no other sounds.c
row) — minimal but §2b-shaped. `Ledger:` 3 ported rows (jsonl
in-stat). Verdict ACCEPT.

## Verification

Re-measured `hidden-proxy verify release_sound_mappings --base
aa12e06ff~1 --reach-all`: 0 blocked (correctly labelled vacuous)
+ smoke 24 PASS, 0 regressed → REACH-OK. Ban-grep over the js
diff: the only "seed" hit is the commit message naming the
strict sessions (seed8000/seed0900) — no seed in control flow.
Rulecheck clean (see 2024). Confirm.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
