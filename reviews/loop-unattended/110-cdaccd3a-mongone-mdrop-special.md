# Review 110 — cdaccd3a — mongone mdrop_special_objs then discard (D-1149)

## Metadata
- Full / short hash: `cdaccd3a0e3512d63a8bc2dec51f10f314aaa188` / `cdaccd3a`
- Parent: `7b9aac47` (review **106–109** + cadence #1460). This file audits **this SHA only**. Archive row **Addressed:** D-1149 `cdaccd3a` was filled by D-1150.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-17 09:05:25 +0200
- D-id: **D-1149**
- Stats: 15 files, +150 / −71 — `js/mon.js` +45 / −17 (`mongone` async + `discard_minvent`); `js/potion.js` / `js/read.js` / `js/zap.js` await the export.
- Claims to close: Must-fix `mon.c` `mongone` `mdrop_special_objs` then discard (elemental_clog victim). Not worn extract. Source: reviews/loop-unattended/109-27274b3b-overcrowding.md. `reviews/loop-2026-08-15/` has no open mongone Must-fix.
- JS / map: `mon.js` `mongone` / `discard_minvent` / existing `mdrop_special_objs`. `c-js-map/turns.md` `mnexto` clog victim; `data.md` fountain gush overcrowding. `isgd`/`grddead`, `m_detach` wiz/shk/worm/`MON_DETACH`/`dismount_steed`, worn `extract_from_minvent`, `mongrantswish` D-0472 clone still named.
- Prior reviews this SHA claims to close: **109** QUALITY-RISK actionable #1 (clog victim `minvent=null`).

## Intent vs deliverable

Git subject promises: “Match C mon.c mongone so a disappearing monster drops Amulet, invocation items, Rider corpses, and quest artifacts before discard, instead of vanishing them with minvent=null.”

Old JS `mongone` set `minvent=null`, spliced `fmon`, nulled ustuck/usteed pointers, zeroed `mx`/`my`, `newsym`. Review **109** showed C `mon.c:3275–3282` is `unstuck`; `mdrop_special_objs`; `discard_minvent(FALSE)`; `m_detach(..., FALSE)`. Clog pick already skips Amulet *holders*; Bell/Book/Candelabrum/Rider/quest arti on the **victim** still had to hit the floor.

The diff **does** that order on the shared export: `mhp=0`; `unstuck` when grabbing; reuse D-1148 `mdrop_special_objs`; new `discard_minvent` unlink loop; then the prior fmon-splice / usteed-null / coord-zero / `newsym` stand-in for `m_detach`. `elemental_clog` awaits the now-async export. Djinni vanish, wizard `*` genocide, and revive-ghost recorporealize await it too. It does **not** port `isgd && !grddead`, `m_detach` wizdead/shkgone/wormgone/`MON_DETACH`/`dismount_steed`, or worn `extract_from_minvent`. Named. It does **not** replace the `mongrantswish` D-0472 subset. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mongone` | C callee, **rewritten** | `mon.c:3267–3282`; now async |
| `discard_minvent` | C callee, **new clone** | `mkobj.c:2525–2536`; `uncreate_artifacts` unused (mongone passes FALSE) |
| `mdrop_special_objs` | C callee, **imported** | D-1148; `steal.c:852–870` |
| `mdrop_obj_overcrowd` | C `mdrop_obj`, **clone** | still skips `extract_from_minvent` / saddle / extrinsics — **named** |
| `obj_resists_00` | C `obj_resists(0,0)`, **clone** | invocation/Rider TRUE; else burn `rn2(100)` |
| `unstuck` | C callee, **imported** | `mhitu.js` ≡ `mon.c:3438–3466`; gated `ustuck===mtmp` like C |
| `elemental_clog` victim | C caller, **awaited** | `mon.c:3932–3936` |
| `djinni_from_bottle` vanish | C caller, **awaited** | `potion.c` |
| `do_class_genocide` `*` | C caller, **awaited** | `read.c` wizard |
| `revive` ghost | C caller, **awaited** | `zap.c` recorporealize |
| `m_detach` | C callee, **splice subset** | **named** — fmon splice + usteed=null + mx=my=0 |
| `isgd`/`grddead` | C early return, **named omit** | vault guard kept at 0,0 |
| `mongrantswish` | C `mongone`, **named clone** | fountain.js D-0472 still fmon+newsym only |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Dynamic `import('./mhitu.js')` is cycle-breaking, not a filesystem. Rule #2 clean. Frozen contracts untouched.

**New RNG on this path:** ordinary invent still burns `obj_resists(0,0)` `rn2(100)` then fails (ochance/achance 0) before discard. Grab `unstuck` may `rnd(2)` `mspec_used`. Path **public-unhit** on endgame clog; djinni vanish (seed0006 cohort) now goes through the shared drop.

## Constitution / playbook

Grep of the four JS hunks: no trace-index gates. Do not restore `minvent=null`. Do not skip `rn2(100)` on ordinary gear. Do not pull worn `extract_from_minvent` / `mnearto` overcrowding / `mongrantswish` into this Must-fix. Do not `#else` steed overcrowding. C `unstuck` is a no-op unless `u.ustuck==mtmp`; JS gating the call is the same predicate.

## C ↔ JS fidelity

### `mongone` envelope

C `mon.c:3267–3282`:

```
mdef->mhp = 0;
if (mdef->isgd && !grddead(mdef))
    return;
unstuck(mdef);
mdrop_special_objs(mdef);
discard_minvent(mdef, FALSE);
m_detach(mdef, mdef->data, FALSE);
```

JS after this SHA (`mon.js:1894–1914`): `mhp=0`; skip `isgd` (named); `if (ustuck===mtmp) await unstuck`; `mdrop_special_objs`; `discard_minvent(false)`; splice `fmon`; `usteed=null`; `mx=my=0`; `newsym`.

C `unstuck` (`mon.c:3438–3466`) returns immediately when `u.ustuck != mtmp`. JS `mhitu.js:686–688` same. Calling only when grabbing matches. Swallowed `placebc` on that helper stays named (clog `ok_to_obliterate` already skips `ustuck`).

`mhp=0` before the drop matches C’s “skip some inventory bookkeeping” comment. `m_at` already treats `mhp<=0` as `DEADMONSTER`.

### Specials then discard

C `steal.c:856–870`: walk `minvent`; `obj_resists(obj,0,0) || is_quest_artifact` → on-map `mdrop_obj` else `extract_from_minvent` + `rloco`. Clog victim is on the map (`mx` snapshot taken **before** `mongone`). JS `mdrop_special_objs` uses the same test and the on-map `mdrop_obj_overcrowd` arm. `obj_resists_00`: five TRUE otyps with **no** `rn2`; else `rn2(100); return false`. Match, including the burned fail on ordinary gear.

C `mkobj.c:2529–2535` `discard_minvent`: while minvent, `extract_from_minvent(..., TRUE, TRUE)`, optional `artifact_exists` when `uncreate_artifacts`, `obfree`. mongone passes FALSE so the artifact arm is dead. JS unlinks and drops JS references (GC ≡ `obfree` for objects with no other owner). It does **not** call `extract_from_minvent` (worn extrinsics / saddle shop). **Named.** On this Must-fix path the monster is leaving the game; leftover ordinary worn gear is discarded either way. Specials already left via `mdrop_special_objs`.

### Clog caller

C `mon.c:3929–3936`: snapshot `mx,my`; `MON_OBLITERATE`; `mongone(victim)`; `rloc_to(mon, mx, my)` — **not** the victim. JS `elemental_clog` now `await mongone(victim)` then `rloc_to`. C comments that callers may still read `mtmp->mx`; they do **not** zero coords (`/* mtmp->mx = mtmp->my = 0; */`). JS still zeros after splice (pre-existing occupancy stand-in: `m_at` is an fmon scan). Clog uses the snapshot, so dest placement matches. C `m_detach` leaves the struct on `fmon` until `dmonsfree` with `MON_DETACH`; JS splices immediately. **Named** `m_detach` subset. Occupancy of the victim cell is empty either way (`DEADMONSTER` skip vs splice).

`ok_to_obliterate` still skips Wizard / rider / emin / epri / eshk / ustuck / usteed. Amulet holders skipped in the clog scan. Victim Bell/Book/Candelabrum/Rider/quest arti now hit `mdrop_special_objs` instead of vanishing. That is the Must-fix.

### Other live callers

C `djinni_from_bottle` vanish arm calls `mongone`. JS now awaits the shared export (was the stub). C wizard `*` genocide and ghost recorporealize same. No leftover `mongone(` without await in scored `js/` except named clones (`mongone_guard`, `mongone_statue_donor`, `mongone_nonlocal`, `mongrantswish`).

## Hallucinations / overclaim

D-log / CURRENT / subject say a disappearing monster drops Amulet / invocation / Rider / quest arti before discard instead of `minvent=null`. **That is the hunk:** shared `mongone` now calls the real D-1148 `mdrop_special_objs` then discard. Stamping **Addressed:** D-1149 is fair for review **109**’s Must-fix. Hash `cdaccd3a` is on the archive row (filled by D-1150). Do **not** stamp it as “Match C `m_detach`” or “Match C `mongrantswish` mongone.” This is **not** “Match C dispatch, callee is a stub”: `mdrop_special_objs` is the D-1148 function; `unstuck` is real; `discard_minvent` is a thin but live unlink, not `minvent=null`.

## Density

One C function (`mongone`) plus the discard helper it always calls, plus await at the four live JS call sites. ~45 JS lines. Review **109** forbade pulling worn `extract_from_minvent` into the same iter. Right-size §2b. Not “finish `m_detach`.”

## Verification

Journal: private canary **26**/26 (Bell/Book/Candelabrum/Amulet/Rider/quest arti floor drop; ordinary `rn2(100)` then discard; unstuck grab vs no-op; clog victim Bell + `rloc_to`; clog skips Amulet holder); green+strict seed8000/0900; cohort **26**/26 (0014 gush + 0360 lava + 0006 djinni vanish + 4500/2200/0030/0004/0002/0012/0007/0009/0106/0108/0116/0367/0373/0383/0398/1500/1800/0060/0102/0700/0017) + strict 8000/0900/0014/0360/4500/2200/0004/0030/0002/0006/0106/0108. Path **public-unhit** on endgame clog. Cadence #1460 fortress is not a clog proof; seed0006 now exercises vanish-through-shared-`mongone`.

C read of `mon.c:3267–3282`, `:3438–3466`, `:3929–3936`, `steal.c:852–870`, `mkobj.c:2525–2536`; JS SHA `mongone` / `discard_minvent` / clog await. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| clog victim Bell/Book/Candelabrum | `mdrop_special_objs` then discard | **same** |
| clog Amulet holder | pick skips | **same** |
| ordinary invent | `rn2(100)` then discard | **same** |
| grabber victim | `unstuck` then drop | **same** |
| `isgd && !grddead` | early return | **named skip** |
| `mongrantswish` | full `mongone` | **named D-0472 subset** |

## Actionable C-wrongs

None that Must-fix this next iter. Review **109**’s victim-specials family is this SHA.

Named omits / do-nots (map / Open, not Must-fix):

1. `isgd && !grddead` keep-at-origin (`mon.c:3271–3274`).
2. `m_detach` wizdead / shkgone / wormgone / `MON_DETACH` / `dismount_steed` / light / leash (`mon.c:2734–2802`).
3. `discard_minvent` / `mdrop_obj` `extract_from_minvent` worn extrinsics / saddle shop (`mkobj.c:2531`, `steal.c:825–845`).
4. `mongrantswish` still D-0472 fmon+newsym (`potion.c` / fountain.js).
5. `mnearto` overcrowding (`mon.c:4067`, `:4081`).
6. Do not restore `minvent=null`. Do not skip `obj_resists(0,0)` `rn2(100)`. Do not pull walk `invocation_message` into this SHA — **Addressed:** D-1150 `505df513`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: clog (and other shared `mongone` callers) now `unstuck` + `mdrop_special_objs` + discard before the fmon splice, so victim Bell/Book/Candelabrum/Rider/quest arti hit the floor instead of vanishing with `minvent=null`.
- Must-fix stays empty for this SHA; next port popped Open `domove` `invocation_message`. **Addressed:** D-1150 `505df513`. Not `m_detach` / `mongrantswish`.
