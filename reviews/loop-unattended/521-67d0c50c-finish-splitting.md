# Review 521 — 67d0c50c — wield.c finish_splitting / unsplitobj (D-1560)

## Metadata
- Full / short hash: `67d0c50cdfb05118c1033612cfc8d54714b16482` / `67d0c50c`
- Parent: `30c83eb9` (D-1559). This file audits **this SHA only** (third of nine `js/` commits since review **518**). Archive **Addressed:** D-1560 `67d0c50c`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-28 04:42:49 +0200
- D-id: **D-1560**
- Stats: `js/wield.js` +193 / −55, `js/mkobj.js` +115 / −3, `js/invent.js` +23 / −0. Band **200–450** (js/ insertions **331**).
- Claims to close: Open `finish_splitting` / `unsplitobj` after D-1559. Not CMDQ_INT. Not stash. `reviews/loop-2026-08-15/` has no unpaid split-invlet Must-fix.
- JS / map: `wield.js` local `finish_splitting`; `mkobj.js` `unsplitobj` / `clear_splitobjs`; `invent.js` `freeinv`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: **491** / **512** / **520** named finish/unsplit.

## Intent vs deliverable

Git subject promises: a counted wield/ready split gets its own invlet and unsplits on welded / already / gold instead of sharing the parent letter.

Pinned C `wield.c` `finish_splitting` `:345–351` (static; `csym` body). Callers `:400`/`:421` `dowield`; `:560`/`:587`/`:625` `doquiver_core`. `mkobj.c` `unsplitobj` `:554–622`, `clear_splitobjs` `:625–629`. `invent.c` `freeinv` `:1402–1409`; `addinv_nomerge` `:1169`. `dowield` `:372–421`; `doquiver_core` `:529–625`. Other `unsplitobj` callers: apply `:3633`; dothrow `:290`/`:1870`/`:2667`; invent `:2503`; pickup `:3183`/`:3384`. `clear_splitobjs` also allmain `:443`; invent `:5283`; mon `:1264`/`:1337`.

```345:351:nethack-c/upstream/src/wield.c
staticfn void
finish_splitting(struct obj *obj)
{
    /* obj was split off from something; give it its own invlet */
    freeinv(obj);
    addinv_nomerge(obj);
}
```

```387:401:nethack-c/upstream/src/wield.c
        if (wep->o_id && wep->o_id == svc.context.objsplit.child_oid)
            unsplitobj(wep);
        return ECMD_FAIL;
    } else if (wep->o_id && wep->o_id == svc.context.objsplit.child_oid) {
        if (uwep && uwep->o_id == svc.context.objsplit.parent_oid) {
            unsplitobj(wep);
            wep = uwep;
            goto already_wielded;
        }
        finish_splitting(wep);
        goto wielding;
```

Old JS: split child shared invlet (off `invent[]` with copied letter); no unsplit / finish; ynq confirmed whole stack only.

The diff **does** port local `finish_splitting`, export `freeinv`, port `unsplitobj`/`clear_splitobjs`, wire `dowield`/`doquiver_core` (welded/already/gold + ynq split-one/rest). It **does not** port `Shk_Your` decline, other `unsplitobj` callers, allmain/mon `clear_splitobjs`, stash ALLOWCNT, `cantwield`, `reset_remarm`. Named. JS `mergable` still rejects `owornmask` (C does not) — mask dance around `merged`. **No RNG** in finish/unsplit/clear.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `finish_splitting` | C `:345–351` static, **CLONE local this SHA** | C home is wield.c; one local |
| `freeinv` | C `invent.c:1402–1409`, **LIVE this SHA** | export at invent home |
| `addinv_nomerge` | C `invent.c:1169`, **LIVE** | `u_init.js` (pre-existing home) |
| `unsplitobj` | C `:554–622`, **LIVE this SHA** | mkobj.js |
| `clear_splitobjs` | C `:625–629`, **LIVE this SHA** | |
| `splitobj` | C mkobj, **LIVE** | child not spliced into `invent[]` (D-0924) |
| `merged` | C invent.c, **CLONE** | one local in mkobj.js |
| `is_split_child` / `_parent` | C `o_id && == oid`, **CLONE** | 0 never matches |
| owornmask dance | JS-only around `merged` | compensates `mergable` reject |
| `Shk_Your` decline | C `:602–605` / `:641–644`, **OMIT named** | `Your` + remain |
| dothrow/apply/pickup/invent unsplit | C callers, **OMIT named** | |
| allmain/mon `clear_splitobjs` | C, **OMIT named** | wield callers live |
| stash ALLOWCNT | **OMIT named** | next Open |
| `cantwield` / `reset_remarm` | C `:363` / `:385`, **OMIT named** | pre-existing |

`node scripts/csym.mjs finish_splitting` → `wield.c:345-351`. `--callers`: proto `:59`; dowield `:400`/`:421`; doquiver `:560`/`:587`/`:625`. `csym.mjs unsplitobj` → `mkobj.c:554-622`. `--callers`: apply, dothrow×3, invent, pickup×2, wield `:388`/`:395`/`:552`/`:557`. `csym.mjs clear_splitobjs` → `:625-629`. `--callers`: allmain `:443`; invent `:5283`; wield `:372`/`:530`; mon `:1264`/`:1337`. No `rn2`/`rnd` in these three.

`node scripts/sym.mjs` on new / exported / local names:

```
finish_splitting NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/wield.js:89
             => Do NOT write clone #2.
unsplitobj       js/mkobj.js:418   sync
clear_splitobjs  js/mkobj.js:385   sync
freeinv          js/invent.js:3671   sync
             !! ALSO 3 LOCAL CLONE(S) in 3 files — IMPORT the export; do NOT add another
               js/dothrow.js:400  js/steal.js:182  js/steed.js:200
addinv_nomerge   js/u_init.js:970   ASYNC — await required
splitobj         js/mkobj.js:332   sync
merged           NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/mkobj.js:1875
is_split_child   NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/wield.js:71
weldmsg          js/wield.js:179   ASYNC — await required
```

C `finish_splitting` is static in wield.c — the local is the C home, not a cycle dodge. Do **not** add clone #2. Do **not** add `freeinv` #4 (dothrow/steal/steed still local; Keep). `node scripts/imports.mjs --can` wield → invent `freeinv`, mkobj `unsplitobj`, u_init `addinv_nomerge`: ALREADY. No new TDZ.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / recorded coordinates in this SHA’s `js/`. `node scripts/imports.mjs --rulecheck`: Rule #2 clean. **No RNG.**

## C ↔ JS fidelity

`clear_splitobjs`. Zeros both oids before getobj. **Match `:625–629` and wield `:372`/`:530`.** After clear, `is_split_child` is false (`id !== 0 && id === 0`). C `doquiver` compares `newquiver->o_id == child_oid` without the `&& o_id` guard; real `o_id` is never 0 (`next_ident`). Equivalent.

`finish_splitting`. `freeinv` then `addinv_nomerge`. JS `freeinv` splices `invent[]`, unlinks `nobj`, `pickup_prev=0`, `where=OBJ_FREE`, `freeinv_core`, `update_inventory`. Child is **not** in `invent[]` (splitobj D-0924); splice no-ops, nobj unlink + `addinv_nomerge` still assigns a letter. **Match `:345–351` for the invlet purpose.** `addinv_nomerge` is async because JS `addinv` is; C is sync. Not a branch skip.

`unsplitobj`. `where` switch: FREE/FLOOR/ONBILL/MIGRATING/BURIED/default → null; INVENT/MINVENT/CONTAINED walk `nobj`. Adjacent `nobj` oid fast path then list scan. `merged(&oparent,&ochild)`. **Match `:569–621` except invent scan:** JS `find_oid_in_invent` walks `invent[]` **and** `nobj` so the unspliced child is found. Required because JS invent is an array plus a shadow nobj chain. Not a second algorithm.

owornmask dance. C `mergable` does not reject worn; JS `:1866` does. Zero both, `merged`, restore `pmask|cmask` on kept (child mask is 0 from `splitobj`). Failure restores both. Documented workaround, not “Match C `mergable`.” Do not “fix” by deleting the worn reject without a C citation for floor stacks.

`dowield`. Welded: unsplit child. **Match `:387–388`.** Already parent: unsplit, `wep=uwep`, already message. **Match `:394–398`.** Else finish, skip uswap/quiver (JS `if` not `else if` after child). **Match `goto wielding`.** Quiver ynq: `splitobj(q,1)` + finish. **Match `:419–421`.** `n` → “Wield all of them instead?” **Match.** Decline uses `Your`+remain, not `Shk_Your`. **Named.** This SHA has no `weldmsg` (that export is D-1561); the welded arm keeps the pre-existing hardcoded “Your weapon is welded…” pline. `reset_remarm` absent (pre-existing; no JS symbol).

`doquiver_core`. Child + parent is uquiver → unsplit + already. Gold → pline + unsplit. Else finish, skip uwep/uswap (`go_quivering`). **Match `:547–560`.** ynq split rest `quan-1` + finish `goto quivering`. **Match `:585–587`/`:624–625`.** Ready: `setuqwep` then print; fire: print then `setuqwep`. **Match `:652–662` order.** `prinv` vs `xprname` is pre-existing display, not this envelope.

Callee closure (wield/ready split arms). LIVE: `splitobj`, `unsplitobj`, `clear_splitobjs`, `freeinv`, `addinv_nomerge`, `splittable`, `getobj_*`. CLONE: local `finish_splitting` (C static; body matches), `is_split_*`, `merged` + mask dance. OMIT named: `Shk_Your`, other unsplit callers, allmain/mon clear, stash, `cantwield`, `reset_remarm`. STUB: **none** in the split arms. Arm may ship. Not “dispatch ported, callee stubbed.”

## Hallucinations / overclaim

Subject own invlet + unsplit welded/already/gold: **true** on wield/ready. D-log mask dance: **honest**, not Match C `mergable`. Do **not** stamp “Match C `Shk_Your`.” Do **not** stamp “Match C dothrow `unsplitobj`.” Do **not** stamp “Match C `dowield` `weldmsg`/`reset_remarm`” (`weldmsg` is D-1561). Do **not** stamp “Match C allmain `clear_splitobjs`.” This is **not** “dispatch ported, callee stubbed.”

## Density

One C static plus its two callers plus the mkobj pair they need. +331 JS (unsplit list walk). Did not glue stash. §2b OK; large because JS invent is not a C nobj list.

## Branch-by-branch confirm

1. Counted wield of a non-uwep stack: finish → new invlet. **Match.**
2. Counted wield of uwep parent: unsplit, already wielding. **Match.**
3. Welded uwep + counted other: unsplit child, fail. **Match unsplit; weld text is the pre-existing stub.**
4. Quiver ynq `y`: split 1 + finish + wield. **Match.**
5. Ready counted gold: can’t + unsplit. **Match.**
6. Ready counted already-quivered parent: unsplit + already. **Match.**
7. Ready ynq rest of uwep: `splitobj(quan-1)` + finish + quiver. **Match.**
8. Decline ynq: `Your` remain, not shopkeeper prefix. **Named.**
9. Floor `unsplitobj`: null. **Match.**
10. dothrow refuse-unsplit: still not called. **Named.**

## Callers / RNG ledger

C wield `:372`/`:530` clear then getobj. Public-unhit for counted wield/ready. No seed gate. **No core RNG.**

## Anti-pattern / Rule #2 (this SHA `js/`)

Plain ESM. No FORCE. `invlet_basic` 52 is C, not a recorded coordinate.

## Verification

D-log canary **52**/52 (clear; split oids; getobj splice finish own invlet; welded/already/gold unsplit restores quan; ynq split-one/rest; floor/free refuse; worn mask dance); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** Admit it.

## Actionable C-wrongs

None for Must-fix. Named: `Shk_Your` decline; dothrow/apply/pickup/invent `unsplitobj`; allmain/mon `clear_splitobjs`; stash ALLOWCNT; `cantwield`; `reset_remarm`; `dowield` welded pline (C `weldmsg` is D-1561). Do not add `finish_splitting` #2 or `freeinv` #4. Do not splice split children into `invent[]` (D-0924).

Verdict: **ACCEPT-WITH-DEBT**
