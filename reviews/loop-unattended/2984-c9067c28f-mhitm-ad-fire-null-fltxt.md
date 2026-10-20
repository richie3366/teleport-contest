# Review 2984 — c9067c28f — mhitm_ad_fire burns a golem with `monkilled(…, null, …)`

- SHA: `c9067c28f` (cliff; owner mhitm_ad_fire, 1 row; +8 stale reserve
  rows rescored to PASS, bundled in the Status line)
- D-entry: D-4144; Ledger: mhitm_ad_fire ported
- `js/` diff: js/mhitm.js +1/−1

## Intent vs deliverable

Promise: uhitm.c mhitm_ad_fire's completelyburns arm calls
`monkilled(mdef, (char *) 0, AD_FIRE)` (`:2602`). JS passed `''`, which
C treats as non-NULL, so JS printed an extra «The <golem> is destroyed!»
and shifted a `--More--`. Diff: `''` → `null`. The promise matches the
diff.

## Inventory

- `mhitm_ad_fire` — mhitm.js:1250–…; C uhitm.c mhitm_ad_fire mhitm arm
  `:2588–2621`.
- Callee `monkilled` — mhitm.js:4037 (same file, the one JS body); C
  mon.c:3376–3418.

## C ↔ JS fidelity

C monkilled (mon.c:3384–3388):

```c
if (fltxt && (mdef->wormno ? worm_known(mdef) : cansee(mdef->mx, mdef->my)))
    pline_mon(mdef, "%s is %s%s%s!", Monnam(mdef), …, *fltxt ? " by the " : "", fltxt);
else
    iflags.sad_feeling = mdef->mtame ? TRUE : FALSE;
```

With `fltxt == NULL`, C takes the else arm and sets `sad_feeling` for a
tame golem. JS monkilled (mhitm.js:4042) tests `fltxt != null`, and its
else arm sets `game.iflags.sad_feeling`, so `null` now takes C's path. Before the fix, `''`
also skipped the sad_feeling assignment, a second silent divergence the
fix closes. The completelyburns arm in mhitm.js keeps C's order:
`pline_mon(«%s burns completely!»)` when seen, then monkilled, then
`if (!DEADMONSTER) → MM_MISS` (life-saved).

The D-log names the other `(char *) 0` monkilled callers in uhitm.c
(`:2320`, `:2400`, `:6439`). It says they already pass `null`
(mhitm.js:1006, :4451; uhitm.js:4664). I checked all three: each
passes `null`.

## Hallucinations / overclaim

None. The 8 bundled reserve flips are earlier fixes that a stale board
had not re-scored. The Status line says so and does not claim them.

## Density

A one-token fix on the owner's own arm. It is what the owner needed.

## Verification

```text
verify mhitm_ad_fire (--base c9067c28f~1): scen-sweep-Monk-610013 PASS → PROGRESS
```

Exact match with the D-log (1360/1360).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
