# Review 1205 — b95a28db — polymon egg-knowledge block

Metadata: SHA `b95a28db` (D-2239). Queue row `mon.c` egg_type_from_parent,
no corpus block. js/ polyself.js +14/−2 (one gated block + two import
names on ALREADY edges).

## Intent vs deliverable

Subject promises the C egg-knowledge block in `polymon` (JS `newman`),
which ran `newsym` after a form change and deferred everything down to
the verbose tips — so egg-layers never learned their own egg type. Both
callees were already live and C-faithful (`egg_type_from_parent`
mon.js:590/D-1075, `learn_egg_type` timeout.js:1893; sit `#sit` FALSE arm
wired at sit.js:1128–1129). Diff adds exactly the block in C position.
Promise kept.

## Inventory

Changed: `polymon` only. No new functions. Callees verified LIVE (not
re-verified from scratch — both landed with their own D-logs — but their
contract points re-checked here): `egg_type_from_parent(mnum,
force_ordinary)`; `learn_egg_type(mnum)` sync (timeout.js:1893), called
sync — no missing await. `lays_eggs` already imported (:90); gate uses
the file's established `game.youmonst?.data` idiom (same as the live
`#sit` tip at :1258). Both imports `--can` ALREADY — no new edges, no
top-level reads.

## C ↔ JS fidelity

Block vs `polyself.c:905–911`:

```c
if (lays_eggs(gy.youmonst.data)) {
    learn_egg_type(u.umonnum);
    /* make queen bees recognize killer bee eggs */
    learn_egg_type(egg_type_from_parent(u.umonnum, TRUE));
}
```

Position immediately after `newsym` (before the deferred
uswallow/ustuck/usteed arms) — exact, including the moved-up comment
rationale (expels→spoteffects egg-drop ordering) carried in the JS
comment. Gate, call order, and queen-bee comment all match.

`TRUE` short-circuits the breeder roll: C `force_ordinary ||
!BREEDER_EGG` with `BREEDER_EGG` = `(!rn2(77))` (mon.c:5538); JS
`force_ordinary || rn2(77)` — `!(!rn2(77))` ≡ nonzero-test, exact, and
the `||` short-circuit means zero draws on the TRUE path. Draw-free by
construction: `learn_egg_type` draws nothing either — so no fortress RNG
movement is possible from this block on any path.

## Hallucinations / overclaim

None. Probe numbers pasted with method (seeded `initRng(12345)`: TRUE
maps queen→killer-bee and winged-gargoyle→gargoyle 400/400 with 0 RNG
draws; FALSE keeps the queen 9/770 ≈ 1/77 so the roll provably runs;
`learn_egg_type(KILLER_BEE)` sets mvflags MV_KNOWS_EGG). /tmp probe kept
out of tree, reported as probe not proof.

## Density

Minimal diff for a 7-line C block; family closed in one handoff with the
map lines retired. In-band (C is that small).

## Verification

Audit re-ran the corpus claim itself:

```text
verify egg_type_from_parent: baseline b95a28db~1 — 0 blocked
(0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed, exactly as labeled. Green 2/2 + strict ×2 + cohort
7/7 pasted. Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/
coordinates. Rule #2 clean (re-run here, repo-wide).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
