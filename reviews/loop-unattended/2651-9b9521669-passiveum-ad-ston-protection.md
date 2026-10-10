# Review 2651 — 9b9521669 — passiveum AD_STON attk_protection (D-3787)

Metadata. SHA `9b9521669` (2026-10-10), D-3787, parent
`6301e5617` (HEAD). js diff: `js/mhitu.js`
+16/−6 — AD_STON arm rewritten C-whole +
`attk_protection`/`mon_to_stone` added to the
mhitm.js import; focused test (2 its). Works
cliffs row-2 mattacku (95346).

## Intent vs deliverable

Promise: 95346@751 — C dierolls the elf's
AT_WEAP swing while JS runs monstone over the
elf's invent: the elf's own sword-swing stoned
it on the poly'd-cockatrice hero because
passiveum skipped the attk_protection check
(a wielded weapon protects like gloves).

Diff delivers the arm in C order with both
callees imported live. Promise and diff match.

## Inventory

Changed JS (1 writer arm + 2 imports):

- passiveum AD_STON — `js/mhitu.js:3040–3060`.
  C: `mhitu.c:2483–2507` (whole arm read).
- attk_protection — `js/mhitm.js:4613` sync,
  live. C: `mhitm.c:1473–1512` (whole read).
- mon_to_stone — `js/mhitm.js:3360` async,
  live. poly_when_stoned (`js/monsters.js:710`)
  + MON_WEP (`js/weapon.js:91`) already in
  scope. No clone, no re-point (new imports of
  live exports), so the sym lines above are the
  required paste.

## C ↔ JS fidelity

**Arm C-whole in C order.** protector/wornitems
init → MON_WEP `|= W_ARMG` → the full
resists+protector gate (`protector == 0 ||
(protector != ~0 && (wornitems & protector) !=
protector)`, `~0` NO_TOUCH shape) →
poly_when_stoned → mon_to_stone + M_ATTK_HIT →
pline_mon (was pline — fixed) + stoned +
xkilled → `!DEADMONSTER ? HIT : AGR_DIED`
(`mhp > 0` read) → fall-through HIT. Every C
statement has its JS line in order. Imported
attk_protection is case-exact vs C (AT_WEAP →
W_ARMG with the caller-checks-weapon comment).
Prior AD_STON omit clause removed from the doc;
remaining omits (AD_ACID/AD_ENCH bodies, AT_BOOM
rehumanize, golemeffects et al.) stand named.

## Hallucinations / overclaim

None. Diff grep: zero hits. The monstone stack
was env-gated and removed (not shipped), and
the evaporated pre-fix missing-dieroll read is
disclosed rather than silently dropped.

## Density

Cliff-phase §2b: one row-2 writer arm, no
bundling. 95346 751 → 778 (+27). mhitu.js not
shared — full suite correctly skipped.

## Verification

D-log Verify: mattacku 1 moved; REACH-OK both
fns (mattacku 80/80, passiveum 44/44); gates +
cohort PASS.

Re-measured by this audit (`verify mattacku
--base 9b9521669~1 --reach-all`):

```text
verify mattacku: 0 PASS, 1 moved past, 0 unchanged, 0 worse → PROGRESS
  scen-sweep-Healer-95346: moved → polymon at step 778 (was 751)
reach mattacku: 571 PASS, 0 regressed → REACH-OK
```

Matches the D-log; `--reach-all` ran the full
571-session reach (vs the D-log's 80 spread),
0 regressed.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
