# Review 2385 — bb85bd866 — D-3445 mattackm notice arms + resists/can_blnd switches

Metadata: SHA `bb85bd866`, D-3445, Open head ×4. js/ +128/−146 (5 files).
Parent `b1a16ef03`. Review of the js/ hunks against pinned C.

## Intent vs deliverable

Subject promises: (a) mattackm mundetected notice gains Unaware-dream +
HIDE_UNDER/last_hider arms; (b) resists_blnd_mm → live resists_blnd;
(c) gulpmu_can_blnd → live can_blnd; (d) resists_blnd_mon → live
resists_blnd. The diff delivers exactly that: notice if/else chain in
js/mhitm.js:6228–6243, three subset deletions (stubs left), four
call-site switches (gazemm, zhitm, gulpmu, explum, flash loop — five
sites over four rows). No scope drift.

## Inventory

| JS change | C locus |
|---|---|
| mhitm.js mattackm notice chain (new) | mhitm.c:327–352 |
| resists_blnd_mm deleted; gazemm + zhitm → resists_blnd | mondata.c:247–272 |
| gulpmu_can_blnd + visored_helmet_worn deleted; gulpmu → can_blnd | mondata.c:304–398; caller mhitu.c:1471–1484 |
| resists_blnd_mon deleted; explum + flash_hits_mon → resists_blnd | uhitm.c:4897, uhitm.c:6384 |
| imports: Unaware (eat.js), noname_monnam, ARTICLE consts, resists_blnd | — |

## C ↔ JS fidelity

matattackm notice: C `mhitm.c:327–352` (csym range :292–592) reads
mundetected→0, newsym, `canseemon && !sensemon`, then Unaware dream
(justone=G_UNIQ → ARTICLE_THE else ARTICLE_NONE + makeplural) else
HIDE_UNDER emerges (pline_mon + Monnam) / last_hider notice (You +
mon_nam) / generic Suddenly (pline + a_monnam). JS matches branch for
branch, callee for callee, in C order. Wiring verified live:
`ARTICLE_NONE` (mhitm.js:61), `G_UNIQ` (:110), `noname_monnam(mtmp,
article)` (do_name.js:1121), `Unaware()` (eat.js:502), `game.last_hider`
(mon.js:4011, written under C mon.c:4795–4796's exact `undetected &&
seenmon && seenobj` condition), `game.iflags.last_msg`. No RNG in C —
none added.

resists_blnd (live, js/mondata.js:454–481): walked against C
mondata.c:247–272 — is_you Blind||Unaware / monster
mblinded||!mcansee||!haseyes||msleeping, EXPL/GAZE dmgtype, Sunsword
by_arti, Blnd_resist catchall + impossible(). Whole. All four switched
C call sites (mhitm.c:759, zap.c:4352, uhitm.c:4897, uhitm.c:6384) call
the whole C function, so the switch is exact by construction.

can_blnd (live, js/uhitm.js:359–442): walked against C
mondata.c:304–398 — no-eyes, perma-blind (monst.h:253 inline),
raven-vs-raven, light arm (magr mcan + !resists_blnd), WEAP/SPIT/NONE
obj arm (pie/venom/potion + swallowed gate), ENGL arm (you:
EBlinded||Unaware||ucreamed; monster: sleeping), CLAW (ublindf +
swallowed + visor), TUCH/STNG (mcan), visor tail (hero invent + uarmh
alias, monster minvent). Whole; the deleted clone's doc claim ("live
lacks ENGL gate") was indeed stale. C caller mhitu.c:1472 passes
(mtmp, &youmonst, aatyp, NULL) — the JS call shape is identical.

Delta audit (old clone → live, from parent tree): gulpmu light arm
moved from `resists_blnd_you` (lacked Sunsword + Blnd_resist arms) to
whole `resists_blnd(you)` — strictly C-ward. All other gulpmu shapes
(ENGL/CLAW/TUCH/obj-NULL/visor) were already identical. The dropped
null guards match C (which derefs `mon->data` unconditionally); every
switched caller provably passes non-null (explum `mdef &&`, flash loop
reads `mtmp.data` first).

sym.mjs on every deleted symbol (required paste):

```text
resists_blnd_mm  NOT FOUND in js/** (no export, no local function/const).
gulpmu_can_blnd  NOT FOUND in js/** (no export, no local function/const).
visored_helmet_worn NOT FOUND in js/** (no export, no local function/const).
resists_blnd_mon NOT FOUND in js/** (no export, no local function/const).
```

`imports.mjs --can mhitm.js eat.js Unaware` → ALREADY (edge pre-existed;
hoisted fn, no TDZ risk). `--rulecheck`: clean. Diff grep: no FORCE /
DIAG / getRngLog / fastforward / seed reads / hardcoded coords.

## Hallucinations / overclaim

None. "Live export whole" claims verified arm-by-arm above. The D-log
callers table (mhitm.c:759 → mhitm.js:6077, zap.c:4352 → zap.js:2043,
mhitu.c:1473 → mhitu.js:1882, uhitm.c:4897/6384 → uhitm.js:3859/4694)
matches both trees.

## Density

≤10-function SHA, whole Method per function (4 rows + 2 live exports
audited). Each row has its Ledger entry (matattackm ported,
resists_blnd/can_blnd audited) and Verify line. No batch manifest
applies. No Left-open. No Must-fix bundled (Must-fix head deferred by
operator override, still queued — disclosed, D-3443 precedent).

## Verification

Re-measured (one call, `--base bb85bd866~1 --reach-all`):
matattackm → PROGRESS (scen-quest-Archeologist-94276 246→259, new
owner mlevel_tele_trap) + REACH-OK 229/229 (full, stronger than the
D-log's 80-spread); resists_blnd + can_blnd → vacuous (none blocked,
as the D-log disclosed: "rows cited none") + smoke REACH-OK 24/24
each. Zero regressed. Claim true.

## Actionable C-wrongs

None.

Verdict: **ACCEPT**
