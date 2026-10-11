# Review 2659 — f317b5f7a — backfire wail drain ×5 sites (D-3795)

Metadata. SHA `f317b5f7a` (2026-10-10), D-3795, parent
`6f999f526`. js diff: `js/zap.js` +16/−0 — `await
finish_maybe_wail()` after the done-check at 5 losehp
sites (backfire, maybe_destroy_item, lightdamage,
zap_updown, dozap self-zap). Works cliffs row-2
flash_str (95343 → PASS).

## Intent vs deliverable

Promise: 95343@1000 — the step-988 backfire set the
deferred wail flag at HP 6→0 and step 999's zhitu
drain printed it stale (HP 59/105, no wail
warranted); the extra More page ate step 1000's key.
C losehp runs maybe_wail inline, so each losehp site
must drain. Diff adds exactly the 5 drains. Promise
and diff match.

## Inventory

Changed JS (1 probe writer + 4 same-file ride-along
losehp sites, all zap.js):

- backfire `:7329`, maybe_destroy_item `:1780`,
  lightdamage `:4655`, zap_updown `:6984`, dozap
  self-zap `:7389`. C: `hack.c:4255–4292` losehp
  (csym range; `maybe_wail()` inline `:4289–4291`
  verified in pinned C).

## C ↔ JS fidelity

**C-exact placement, all 5 sites.** Each drain sits
after its site's done-check (gameover return) and
before the site's continuation — matching C, where
the fatal path `done(DIED)`s without a wail and the
survivor path wails-or-suppresses synchronously
inside losehp. `finish_maybe_wail` (`js/hack.js:1997`,
live async export) drains showdamage/rehumanize
queues first, then the flag-gated `maybe_wail`
(C `staticfn hack.c:4210–4243`, so the module-local
JS twin is correct, not clone drift). The 4
ride-alongs are the same single mechanism in the
same C file as the probe writer — legitimate cliff
companions, not bundling. lightdamage's fatal tail
(C done-noreturn vs JS return) is disclosed as a
pre-existing untouched omit, correctly not
reached-for.

## Hallucinations / overclaim

None. Diff grep: zero hits. The WAIL-SET/WAIL-PRINT
trace and the JS-1001 == C-1000 alignment are
measured (reverted temp trace), and the other-file
losehp sites are listed as future cliffs, not
claimed.

## Density

Cliff-phase §2b: one row-2 writer + same-file
same-mechanism companions. Row-1 randomize falsifier
re-verified unfired live.

## Verification

D-log Verify: focused 0/1 → 1/1; flash_str 1 PASS;
REACH all six fns; green/strict/cohort PASS.

Re-measured by this audit (`verify
flash_str,backfire,dozap,lightdamage,
maybe_destroy_item,zap_updown --base f317b5f7a~1
--reach-all`, re-run on HEAD code):

```text
verify flash_str: 1 PASS, 0 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Caveman-95343: PASS
reach/smoke on all six: 0 regressed → REACH-OK
```

Matches the D-log exactly. Committed scoreboard:
1042 → 1043 (+95343), 0 lost.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
