# Review 555 — dc1d6d94 — mon.c normal_shape await newcham NC_SHOW_MSG (D-1594)

## Metadata
- Full / short hash: `dc1d6d94d78ae3a1363d438e270dc877eacf5ced` / `dc1d6d94`
- Parent: `80b4dace` (reviews 546–554). This file audits **this SHA only** (first of nine `js/` commits since review **554**). Archive **Addressed:** D-1594 `dc1d6d94`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 21:41:43 +0200
- D-id: **D-1594**
- Stats: `js/mon.js` +13/−10, `js/makemon.js` +6/−5, `js/zap.js` +5/−5, plus one-line awaits in `do_wear.js` / `eat.js` / `dog.js` / `trap.js`. Band **150–350** (js/ insertions **28**).
- Claims to close: Must-fix review **547** (`normal_shape` dropped the SHOW_MSG Promise). Not `new_were`. Not getlev `restore_cham`. `reviews/loop-2026-08-15/` has no unpaid normal_shape Must-fix.
- JS / map: `mon.js` `normal_shape`/`rescham`/`restore_cham`; `zap.js` `cancel_monst`/`montraits`; Ring_on / eataccessory / `mon_arrive_after_you`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **547** Actionable #1 (QUALITY-RISK). Review file already stamped `**Addressed:** D-1594 dc1d6d94`.

## Intent vs deliverable

Git subject promises: the NC_SHOW_MSG shapeshift pline finishes before `cham=NON_PM` and clay-golem cancel.

Pinned C `mon.c` `normal_shape` `:4430–4462`. Cham arm `:4435–4443`. `rescham` `:4618–4624` `iter_mons(normal_shape)`. `restore_cham` `:4646–4658`. `zap.c` `cancel_monst` `:3197–3203` (`mcan=1` then `normal_shape` then clay pline). `montraits` `:824` `restore_cham(mtmp2)`. `do_wear.c` `Ring_on` `:1331–1332`. `eat.c` `:2311–2312`. `dog.c` `:464`. `restore.c` `getlev` `:1217`. `wizcmds.c` `:1083–1084`. `youprop.h:359–360` PfSC = H\|\|E. `--callers normal_shape`: restore_cham `:4653`; zap `:3199`. `--callers rescham`: Ring_on, eat, wiz_intrinsic. `--callers restore_cham`: dog `:464`; restore `:1217`; zap `:824`. `--callers montraits`: trap `animate_statue` `:764`; zap `revive` `:1003`.

```4435:4443:nethack-c/upstream/src/mon.c
    if (ismnum(mcham)) {
        unsigned mcan = mon->mcan;

        (void) newcham(mon, &mons[mcham], NC_SHOW_MSG);
        mon->cham = NON_PM;
        /* newcham() may uncancel a polymorphing monster; override that */
        if (mcan)
            mon->mcan = 1;
        newsym(mon->mx, mon->my);
    }
```

Old JS: D-1586 live SHOW_MSG inside `newcham`; `normal_shape` stayed sync and fired the Promise (review **547**).

The diff **does** make `normal_shape`/`rescham`/`restore_cham`/`montraits` async and await `newcham(..., NC_SHOW_MSG)` before `cham=NON_PM`. It awaits at `cancel_monst`, Ring_on, eataccessory, `mon_arrive_after_you`, and both C `montraits` sites. It **does not** call `new_were` / `finish_meating`. It **does not** wire getlev `restore_cham` or `#wizintrinsic` `rescham`. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `normal_shape` cham arm | C `:4435–4443`, **LIVE this SHA** | await SHOW_MSG |
| `newcham` SHOW_MSG | C `:5276–5535`, **LIVE** | already D-1586 |
| `rescham` | C `:4621–4624`, **LIVE this SHA** | fmon loop vs `iter_mons` |
| `restore_cham` | C `:4646–4658`, **LIVE this SHA** | PfSC H\|\|E + extra JS flag |
| `cancel_monst` clay order | C `:3197–3203`, **LIVE this SHA** | await then clay pline |
| `montraits` → `restore_cham` | C `:824`, **LIVE this SHA** | both C callers await |
| `seemimic` | C `:4408–4427`, **LIVE** | mimic AP arm |
| `new_were` | C `:95–138`, **OMIT named** | export exists; call skipped |
| `finish_meating` | C `:1447–1457`, **OMIT named** | `dogmove.js` partial |
| getlev `restore_cham` | C `:1217`, **OMIT named** | `do.js` comment |
| `#wizintrinsic` `rescham` | C `:1083–1084`, **OMIT named** | no dropped Promise |
| `m_unleash` / break-armor | **OMIT named** | inside `newcham` |

`node scripts/csym.mjs normal_shape` → `:4430-4462`. `rescham` → `:4618-4624`. `restore_cham` → `:4646-4658`. `cancel_monst` → `:3149-3215`. `montraits` → `:712-827`. `newcham` → `:5276-5535`. `iter_mons` → `:4526-4538` (`DEADMONSTER` / `mon_offmap` skip).

RNG: SHOW_MSG `x_monnam` / Hallu `rndmonnam` is D-1586, consumed **before** `cham=NON_PM` once awaited. No seed gate. `newcham` long-worm `rn2(5)` / Elbereth `rn1(9,2)` still named inside the callee.

`node scripts/sym.mjs` on new / re-pointed names (sync → async):

```
normal_shape     js/mon.js:901   ASYNC — await required
rescham          js/mon.js:924   ASYNC — await required
restore_cham     js/mon.js:2641   ASYNC — await required
newcham          js/makemon.js:1323   sync
montraits        js/zap.js:2690   ASYNC — await required
cancel_monst     js/zap.js:3331   ASYNC — await required
revive           js/zap.js:2881   ASYNC — await required
Ring_on          js/do_wear.js:1905   ASYNC — await required
eataccessory     NOT EXPORTED — 1 LOCAL CLONE in eat.js (do NOT write #2)
animate_statue   js/trap.js:288   ASYNC — await required
pm_to_cham       js/makemon.js:872   sync
new_were         js/were.js:127   sync
finish_meating   js/dogmove.js:1029   sync
```

`--can mon.js makemon.js newcham`: ALREADY. `--can zap.js mon.js normal_shape`: ALREADY. `--can do_wear.js mon.js rescham`: ALREADY. `--can eat.js mon.js rescham`: ALREADY. `--can dog.js mon.js restore_cham`: ALREADY. `--can trap.js zap.js montraits`: IN-SCC, `montraits` hoisted, **VERDICT SAFE**. A cycle alone is **not** a blocker. Do **not** stamp “cycle-forced clone.” Do **not** add `newcham` #2 in `mon.js`.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Cham arm order. Capture `mcham`/`mcan`; `ismnum`; `await newcham(..., NC_SHOW_MSG)`; `cham=NON_PM`; restore `mcan`; `newsym`. **Match `:4435–4443`.** That is the **547** C-wrong. Clay-golem `cancel_monst` now prints writing **after** the shapeshift More. **Match `:3197–3203`.**

`rescham`. C `iter_mons(normal_shape)` skips `DEADMONSTER` and `mon_offmap`. JS `for (game.fmon)` skips `mhp<=0` only. Pre-existing loop shape; this SHA only added await. Off-map cham on `fmon` could still see `normal_shape` — not a new Must-fix; not `iter_mons`. **Match dead skip; offmap skip still missing.**

`restore_cham`. PfSC or `mcan` → `normal_shape`; else `cham==NON_PM` → `pm_to_cham`. **Match `:4651–4656`.** JS PfSC is H\|\|E plus `u.Protection_from_shape_changers` dual-store. Macro is H\|\|E only (`youprop.h:359–360`). Extra flag is pre-existing dual-store, not a new clone.

Live C callers of `rescham`/`restore_cham`/`montraits` that JS already had: Ring_on, eataccessory, dog arrive, zap `montraits`/`revive`, trap `animate_statue`. All await. **Match those sites.** getlev `:1217` and wiz `:1084` still omitted and **do not** call the now-async exports (no dropped Promise). Named.

Mimic arm. `M_AP_TYPE != NOTHING`; `!meating` → sleep unless `M_AP_MONSTER`, then `seemimic`. **Match `:4448–4455`.** `meating` → `finish_meating` skipped. Named. Were arm `is_were && mlet != S_HUMAN` → `new_were` skipped. Named. `new_were` / `finish_meating` are **LIVE exports**, not stubs; the **calls** from `normal_shape` are the omit.

Callee closure (cham SHOW_MSG arm). LIVE: `newcham`, `ismnum`, `newsym`. OMIT named: were / `finish_meating` (later arms, not this one). STUB: **none** in the cham arm. Combined-arm may ship. Not “dispatch ported, callee stubbed.” `newcham` remaining `export function` (sync) that returns a Promise iff SHOW_MSG is still the footgun for **other** sites; this SHA’s `normal_shape` path awaits.

Vampire cham + `check_gear` still run inside `newcham` **before** awaiting More (D-1586). C prints first `:5458` then vamp `:5478`. `normal_shape` then sets `cham=NON_PM` either way. Review **547** left that out of Must-fix; this SHA does not reopen it.

## Hallucinations / overclaim

Subject shapeshift pline finishes before `cham=NON_PM` / clay: **true for `rescham`, `restore_cham` (dog/montraits), and `cancel_monst`.** D-log “await at Ring_on / eataccessory / mon_arrive / montraits”: **true.** Do **not** stamp “Match C `new_were` / `finish_meating`.” Do **not** stamp “Match C getlev `restore_cham`.” Do **not** stamp “Match C `#wizintrinsic` `rescham`.” Do **not** stamp “Match C `iter_mons` `mon_offmap` skip.” Do **not** stamp “retired `newcham` sync-Promise footgun.” Do **not** stamp “Match C stone-cham / genocide SHOW_MSG.” Public suite has no PfSC ring-on chameleon.

## Density

Must-fix one item: await the live SHOW_MSG caller plus the C callers that were already ported. +28 JS. Playbook §2b “unless C is that small” / Must-fix stays alone. Did not glue `new_were`. OK.

## Branch-by-branch confirm

1. `ismnum(cham)`: await SHOW_MSG, then `cham=NON_PM` / `mcan` / `newsym`. **Match.**
2. `cancel_monst` clay pline after that await. **Match.**
3. `rescham` every live `fmon` with hp. **Match dead skip; not offmap.**
4. `restore_cham` PfSC/`mcan` vs `pm_to_cham`. **Match** at dog/montraits.
5. Ring_on / eataccessory await `rescham`. **Match `:1332` / `:2312`.**
6. `new_were` / `finish_meating`. **Named.**
7. getlev / `#wizintrinsic`. **Named.**

## Callers / RNG ledger

Awaited SHOW_MSG: `mon.js:767` decide, `:906` this SHA, `mhitm.js:2232`, `zap.js:3778`. Flags 0 still: makemon vlad, trap, mklev, uhitm vamp, mhitm stone (comment), zap figurine. Extra Hallu `x_monnam` for `l_oldname` **is C**. No seed gate.

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. Await the Promise; do not pass flags 0 on this site. Do not wrap `wildmiss` as `pline_mon`. Do not import `were.js` solely to “finish” density. Do not add `finish_meating` clone #2 in `mon.js`.

## Verification

D-log private canary **17**/17; green+strict seed8000/0900; cohort **7**/7 + strict. **Public-unhit** for PfSC revert text / clay-after-shapeshift. A canary that never hits `cancel_monst` on a cham clay-golem does not falsify clay order; the await still sequences the Promise. getlev / `#wizintrinsic` unhit.

## Actionable C-wrongs

None for Must-fix. Named: `normal_shape` `is_were`/`new_were` (`were.c:95`; C `:4446`); `finish_meating` when `meating` (`dogmove.c:1447`; C `:4459`); getlev `restore_cham` (`restore.c:1217`); `#wizintrinsic` `rescham` (`wizcmds.c:1084`); `rescham` `mon_offmap` skip (`iter_mons` `:4533`); stone-cham / genocide SHOW_MSG flags; `m_unleash`. Do not pass `NC_SHOW_MSG` 0 here. Do not drop the Promise again.

Verdict: **ACCEPT-WITH-DEBT**
