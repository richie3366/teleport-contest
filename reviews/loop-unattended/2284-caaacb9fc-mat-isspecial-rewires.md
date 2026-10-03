# Review 2284 — caaacb9fc — m_at shknam + Is_special end/quest rewires

- SHA: `caaacb9fc` (D-3328)
- Files: `js/end.js`, `js/quest.js`, `js/shknam.js` (+ 2 rewire test scripts)
- Insertions: small; live-export clone-removal pair

## Intent vs deliverable

Subject promises: "`rm.h` m_at shknam rewire + `dungeon.c` Is_special
end/quest rewire (live-export clone removals)". The diff delivers exactly
that: 3 clones deleted, 3 existing static edges extended, one C-cite
comment per site, site expressions unchanged. No DIAG/FORCE/seed; Rule #2
clean (iteration-wide rulecheck).

## Inventory

- `m_at`: deleted shknam fmon-only clone → live mon.js:1745 import.
- `Is_special`: deleted end.js + quest.js clones → live dungeon.js:2871
  import. Kept `on_level` clones disclosed as still-used-elsewhere,
  out-of-cluster.
- `scripts/mat-rewire.test.mjs` (6 subtests) +
  `scripts/isspecial-rewire.test.mjs` (4 subtests), amonnam precedent.

## C ↔ JS fidelity

C `m_at` (rm.h:510–511): `(MON_AT(x,y) ? monsters[x][y] : 0)` — grid
lookup, null iff unoccupied. Live JS (mon.js:1745): `level_mon_at` seg
check, then fmon scan skipping steed (remove_monster'd while mounted),
dead (`mhp<=0`, off-grid in C), and MON_OFFMAP — the documented grid
semantics. The deleted clone returned dead/steed monsters from a bare
fmon scan: genuine C-wrong (e.g. a corpse-square suppressing the
shknam.c:470 mimic roll), now fixed. Site expression unchanged, so RNG
order (`rn2(100) < dep` first) is untouched. C `Is_special`
(dungeon.c:1447–1457): sp_levchn walk, `on_level` match, NULL
fallthrough. Live JS (dungeon.js:2871): identical shape over canonical
`on_level` — C-exact; both sites pass non-null levels (end.js:629
bones.c:25, quest.js:210 quest.c:94), so the local→canonical `on_level`
swap inside is behavior-safe. Required `sym.mjs` output:

```
m_at             js/mon.js:1745   sync
             !! ALSO 3 LOCAL CLONE(S) in 3 files — IMPORT the export; do NOT add another
               js/dig.js:224  js/teleport.js:137  js/uhitm.js:465
Is_special       js/dungeon.js:2871   sync
```

`Is_special` is clone-free. The 3 remaining `m_at` clones are pre-
existing (uhitm/dig have queued rows; teleport.js:137 is refill business
for a port iter, not this SHA's debt).

## Hallucinations / overclaim

None. "Null iff the square is unoccupied at stock time" matches the live
body (grid + skip arms). The no-JS-MON_AT note is honest about the macro
gap.

## Density

Two-function rewire; below-bar insertions defended (2 real C-wrongs
fixed, whole bodies verified, closure holds nothing more Open).
`Ledger:` m_at + Is_special entries. Per-function Verify lines present.

## Verification

Re-measured (`hidden-proxy.mjs verify m_at,Is_special --base
caaacb9fc~1 --reach-all`): both 0 blocked (vacuous; rows cited 0 blocks,
honestly noted) + smoke 24/24 each, 0 regressed → REACH-OK — the D-log
tail verbatim.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
