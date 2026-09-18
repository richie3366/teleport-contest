# Review 1447 — c46e4014 — quickmimic whole-body port (D-2488)

Metadata: SHA `c46e4014`, `js/dogmove.js` +139, `js/mon.js` +24/−, `js/monmove.js` +6 (async propagation). C `dogmove.c:1429–1541` (`qm[]` + `quickmimic`) + caller `mon.c:1407–1447`. D-log: D-2488.

## Intent vs deliverable

Promise: whole `quickmimic` in C order + `qm[]` verbatim + `m_consume_obj` deadmimic arm + caller wired. Diff delivers it: 9-row table, full body, deadmimic computation, all 5 `m_consume_obj` call sites awaited (`dog_eat`, `meatmetal/obj/corpse`, `gelcube_digests`→`dochug`). Promise = deliverable.

## Inventory

- Added: `qm[]`, `export async function quickmimic` (dogmove.js:1471); deadmimic + `await quickmimic` in `m_consume_obj` (now async); `gelcube_digests` async with its sole caller `dochug` awaiting.
- `sym.mjs` (required): `quickmimic → js/dogmove.js:1471 ASYNC`, single definition, no clones. `defsym_explanation → js/uhitm.js:3711 sync` (live import, correct direction — no new clone). No deleted symbols.
- Import widenings all verified live: `DISMOUNT_POLY`, `S_sink` (const.js:133), `something` (const.js:540), `M_AP_*`, `defsym_explanation`, `an` (objnam, live export despite lock.js clone), `pmname`/`Mgender`, `monsndx` (mondata.js:124), `objectDescrs`/`objectNameStrs`, `You`/`Your`/`more` (display async, awaited), `dismount_steed` (steed.js:805 async, awaited), `m_unleash`, `y_monnam` (sync), `TRIPE_RATION` (dogmove.js:93, resolves).

## C ↔ JS fidelity

`qm[]` row-for-row ≡ C `:1429–1445`:

```c
{ PM_LITTLE_DOG, 0, PM_KITTEN, M_AP_MONSTER },
...
{ PM_HOUSECAT, 0, PM_GIANT_RAT, M_AP_MONSTER },
{ 0, S_DOG, S_sink, M_AP_FURNITURE }, /* sorry, no fire hydrants */
{ 0, 0, TRIPE_RATION, M_AP_OBJECT }, /* leave this at end */
```

(7 pet rows, `S_DOG`/sink furniture row, tripe end row; JS `mlet: 0` any-rows vs `'S_DOG'` string row matches the JS string-mlet convention — `dog.js` compares `mlet === 'S_DOG'`). Body ≡ C `:1471–1541` in order:

```c
if (Protection_from_shape_changers || !mtmp->meating)
    return;
...
if (mtmp == u.usteed)
    dismount_steed(DISMOUNT_POLY);
do {
    idx = rn2(SIZE(qm));
    if (qm[idx].mndx != 0 && monsndx(mtmp->data) == qm[idx].mndx)
        break;
    ...
} while (--trycnt > 0);
if (trycnt == 0)
    idx = SIZE(qm) - 1;
```

JS matches: H/E/intrinsic guard reads (`!mtmp` null-guard is safe extra — C has NONNULLARG1), pre-change dismount, single `rn2` draw per iteration with the three breaks in C order and tripe fallback on exhaustion (RNG order exact). `y_monnam`/spotted/seeloc captured before the `m_ap_type` change; what-chain (furniture explanation via live `defsym_explanation`, descr-then-name via aligned tables — TRIPE_RATION descr null → name `"tripe ration"`, same chain outcome as C — `pmname(mndx, Mgender)`, else `something`); `newsym`, leash-slack (`Your` + `m_unleash(FALSE)`), glyph-change-gated appear/sense `You`, `more()` ≡ `display_nhwindow(WIN_MAP,TRUE)` (detect.js:374 idiom, named in code). `(what !== something)` value-compare is safe: probed descrs, names, pmnames, and the explanation table — no candidate text equals `"something"` (C's pointer-compare can therefore never disagree with the value compare on real inputs).

Caller ≡ C `mon.c:1407–1447` (`deadmimic = otyp == CORPSE && corpsenm SMALL/LARGE/GIANT`, pre-delobj otmp fields; `if (ispet && deadmimic) quickmimic(mtmp)` after the poly/grow/stone/heal/eyes arms — all named omits in JS, so relative order is moot). Callee closure: all LIVE; `m_consume_obj` tail + pyrolisk/mon_givit named. All 5 `m_consume_obj` call sites await (grep):

```text
js/monmove.js:2178:    await m_consume_obj(mtmp, otmp);   (gelcube_digests, sole caller dochug awaits)
js/dogmove.js:437:    await m_consume_obj(mtmp, obj);      (dog_eat)
js/mon.js:2312/2431/2503  (meatmetal/meatobj/meatcorpse)
```

Required pastes:

```text
quickmimic       js/dogmove.js:1471   ASYNC — await required
defsym_explanation js/uhitm.js:3711   sync
dismount_steed   js/steed.js:805   ASYNC — await required
monsndx          js/mondata.js:124   sync
ALREADY: dogmove.js already statically imports uhitm.js. No new edge needed.
```

## Hallucinations / overclaim

None. Async-only-for-async-callees claim holds (every awaited callee is async; every sync callee called plain). The 5-call-site await claim verified by grep — no floating promises.

## Density

Right-sized: one C function + table + caller arm, 3 files.

## Verification

`hidden-proxy verify quickmimic --base c46e4014~1 --reach-all` (re-run here):

```text
verify quickmimic: baseline c46e4014~1 — 0 session(s) blocked on it (0 at baseline, 0 in the working scoreboard)
smoke quickmimic: no RNG-tagged reach; fixed smoke spread (24 run): 24 PASS, 0 regressed → REACH-OK
```

0 blocked both sides (vacuous, as stated). Matches. `imports.mjs --rulecheck` (whole scored `js/`): Rule #2 clean. Diff grep: no FORCE/DIAG/`getRngLog`/seed/fastforward/coords. Async-propagation audit: `m_consume_obj` sync→async touches 5 call sites (all awaited, verified above) plus `gelcube_digests` sync→async with its sole caller `dochug` awaiting (async fn) — no floating promises introduced anywhere in the window.

## Actionable C-wrongs

None. No Must-fix.

Verdict: **ACCEPT**
