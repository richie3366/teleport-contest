# Review 1200 — 920a0a32 — nameshk Izchak minetown arm

Metadata: SHA `920a0a32` (D-2234). Queue row `shk.c` SHOPTYPE/veggy, no
corpus block. js/ shknam.js +7/−2 (one early arm + one import name).

## Intent vs deliverable

Subject promises the Izchak early arm closing the SHOPTYPE/veggy family,
with the row's other two members argued no-code: `veggy_item` obj-path
arm-for-arm live (review 64/D-0994 verified), wizard SHOPTYPE is
`nh_getenv` code unportable under Rule #2 (three in-repo precedent cites:
SPLEVTYPE deferral at mklev.js:1507, WIZKIT at files.js:65, spawn at
mail.js:18). Diff adds exactly the arm plus `In_mines` on a pre-existing
edge, and retires the header omit to wizard-SHOPTYPE-only with the
getenv reason. Promise kept.

## Inventory

Changed: `nameshk` (module-local — correct, C `shknam.c:486` is
staticfn). No new exports. Callees: `In_mines` LIVE (const.js, joins the
pre-existing edge — `--can` ALREADY class, no new module edge, no TDZ
read); `Is_special` already imported.

## C ↔ JS fidelity

Arm vs `shknam.c:495–500`:

```c
if (nlp == shklight && In_mines(&u.uz)
    && (sptr = Is_special(&u.uz)) != 0 && sptr->flags.town) {
    shname = "+Izchak";
    shk->female = FALSE;
}
```

JS condition is exact: `Is_special(uz)?.flags?.town` is falsy exactly
when C's NULL-or-no-town fails, truthy exactly when both hold. The
reference check `nlpIn === shklight` is sound — verified, not assumed:
`shklight` is one module const (shknam.js:139), the lighting-store
shtypes entry holds that same reference (`shknms: shklight`, :249), and
the sole caller passes `shp.shknms` (:680). So `===` fires exactly when
C's pointer comparison fires.

C then falls straight to the `strncpy(…, PL_NSIZ)` tail (:551), skipping
the nseed/clash game (the clash loop lives inside the else). JS assigns
`eshk.shknam = '+Izchak'` + `shk.female = 0` and returns — 7 chars, so
the shared `slice(0,31)` PL_NSIZ store is exact and nothing C would run
is skipped. Draw-free arm; the nseed computation C also skips is skipped
in JS too. No RNG impact by construction.

## Hallucinations / overclaim

None. D-log is explicit that no hand probe was run and why
(module-local, reachable only through minetown lighting-shop generation
which no public or corpus session performs, draw-free) — evidence is the
body match plus per-idiom grounding (`In_mines` const.js:3210,
`sp.flags?.town` mklev.js:1218). No false "verified by probe" claim.

## Density

Minimal diff for a one-arm C locus; family retired in one handoff with
its two no-code members adjudicated, not silently dropped.

## Verification

Audit re-ran the corpus claim itself:

```text
verify nameshk: baseline 920a0a32~1 — 0 session(s) blocked on it
(0 at baseline, 0 in the working scoreboard)
```

Vacuous-0-confirmed, exactly as labeled. Green 2/2 + strict ×2 + cohort
7/7 pasted. Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/
coordinates. Rule #2 clean (re-run here, repo-wide).

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
