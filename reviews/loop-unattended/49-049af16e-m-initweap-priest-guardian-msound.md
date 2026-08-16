# Review 49 — 049af16e — `m_initweap` priest/guardian `ptr.msound` (D-1088)

## Metadata
- Full / short hash: `049af16eeb74023bdaa57c917d76407f25cec343` / `049af16e`
- Parent: `d5038ac7` (D-1087; review **48**). JS-touching since last `reviews/loop-unattended/` file: D-1085–D-1087, **this SHA**. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 16:26:27 +0200
- D-id: **D-1088**
- Stats: 10 files, +104 / −62 — `js/makemon.js` +31 / −11 (gates + `quest_mon_represents_role` + `MS_PRIEST`). Live JS is those predicates, not a new kit body.
- Claims to close: Open queue `makemon.c` `m_initweap` `ptr.msound` for MS_GUARDIAN / MS_PRIEST (still mndx after D-1079). Not `peace_minded`. Review **40** named omit 1. Stamped **Addressed:** D-1088 on the archive row **without** the short hash (chicken-egg). This review commit fills `049af16e`. `reviews/loop-2026-08-15/` has no open priest-mace Must-fix.
- JS / map: `makemon.js` `m_initweap` / `m_initinv` / `quest_mon_represents_role`. `c-js-map/data.md` names D-1088; PM_NINJA weap + MS_NEMESIS mitem still named (live Open for mitem).
- Prior reviews this SHA claims to close: **40** item 1 and stale “tables omit msound” comment. Review **14** named `m_initweap` still mndx after `msounds[]`.

## Intent vs deliverable

Git subject promises: “Match C makemon.c m_initweap so priest and guardian kits follow ptr.msound, not mndx lists.”

The queue line was those two gates after D-1079 extracted `msounds[]`. Not `peace_minded` (already D-1079). Not PM_NINJA (between priest and guardian in C). Not MS_NEMESIS mitem.

The diff **does** that envelope: priest weap/inv is `(ptr.msound|0) === MS_PRIEST || quest_mon_represents_role(ptr, PM_CLERIC)`; guardian weap is `ptr.msound === MS_GUARDIAN` then the existing `switch(mm)`. `quest_mon_represents_role` is C’s macro: `S_HUMAN` + `Role_if` (`urole.mnum`) + `MS_LEADER || MS_NEMESIS`, not `ldrnum`/`neminum`. Local `MS_PRIEST = 41` matches `monflag.h:56`.

It does **not** insert `mm == PM_NINJA` between priest and guardian. Named. It does **not** retouch MS_NEMESIS mitem (`makemon.js:2237–2239` still `urole.neminum`). Named, already Open.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `m_initweap` priest / guardian `else if` | C body, **retouched** | `makemon.c:263–327`; kit **bodies** unchanged |
| `m_initinv` priest `else if` | C body, **retouched** | `makemon.c:721–727`; same predicate |
| `quest_mon_represents_role` | **clone** of `makemon.c:11–13` | now msound, not ldrnum |
| `MS_PRIEST` / `MS_GUARDIAN` / `MS_LEADER` / `MS_NEMESIS` | **clone** of `monflag.h:51–56` | 41 / 38 / 36 / 37 |
| `mksobj` / `mpickobj` / `mongets` / `curse` / `m_initthrow` / `mkmonmoney` | C callees, **imported** | real |
| `pm('CLERIC')` | C `PM_CLERIC` | generated `PM_CLERIC = 337` |
| PM_NINJA weap arm | C sibling, **named omit** | `makemon.c:270–272` |
| MS_NEMESIS mitem | C other site, **named omit** | still `neminum` |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the `js/makemon.js` hunk: no trace-index gates, no recorded coordinates, no `fastforward` burns. `MS_PRIEST=41` is `monflag.h`, not a seed cleric mndx. Contest Rule #2: no Node builtins.

## C ↔ JS fidelity

### `quest_mon_represents_role` — no RNG

C `makemon.c:11–13`:

```
#define quest_mon_represents_role(mptr, role_pm) \
    (mptr->mlet == S_HUMAN && Role_if(role_pm)   \
     && (mptr->msound == MS_LEADER || mptr->msound == MS_NEMESIS))
```

C `you.h:247`: `#define Role_if(X) (gu.urole.mnum == (X))`.

JS `makemon.js:1186–1191`: `ptr.mlet !== 'S_HUMAN'` (generated string table, same as D-1082 `S_MIMIC`); `urole.mnum === role_pm`; `ms === MS_LEADER || MS_NEMESIS`. Old JS used `ldrnum`/`neminum`. Tourist Arch Priest is `MS_LEADER` not `MS_PRIEST` and `Role_if(PM_CLERIC)` is false → **no** priest mace (C). Priest-role Arch Priest / Twoflower: `Role_if(PM_CLERIC)` + `MS_LEADER` → mace. Match. Comment in C: tourist is not an archetype; priests and monks are. Monk `m_initinv` already called this helper; it now uses msound too — same C macro.

S_HUMAN chain before the new gates: `is_mercenary` then `is_elf` then priest (`makemon.c:187–263` / JS `1297–1373`). An elven priest never reaches `MS_PRIEST` in C. JS same. Do not invert that. Mercenary watchman/soldier polearm `rn1` loop is untouched.

### Priest weap — RNG call-for-call

C `makemon.c:263–269`: after `is_elf`, `ptr->msound == MS_PRIEST || quest_mon_represents_role(ptr, PM_CLERIC)` then `mksobj(MACE, FALSE, FALSE)`; `spe = rnd(3)`; `if (!rn2(2)) curse`; `mpickobj`.

JS `makemon.js:1373–1382`: same predicate; same three RNG sites (`mksobj` internals + `rnd(3)` + `rn2(2)`). `curse` / `mpickobj` imported. Match.

Old JS `mm === ALIGNED_CLERIC || HIGH_CLERIC` missed a synth HUMAN+`MS_PRIEST` that is not those mndx, and **hit** those mndx even if msound were silent. Generated `msounds[]` stores 41 for the two stock priests (D-log canary). Stock path RNG unchanged; silent-mndx / synth-msound is the C fix.

### Guardian weap — gate only; kit RNG unchanged

C `makemon.c:273–326`: `else if (ptr->msound == MS_GUARDIAN)` then `switch(mm)` student…neanderthal. Nested `rn2` order in the cases is unchanged in JS (`makemon.js:1383–1446`). Short-circuit: `if (rn2(2)) mongets(..., rn2(3) ? DAGGER : KNIFE)` evaluates outer then inner like C.

A stock chieftain is `MS_GUARDIAN=38` → same kit as the old mndx list. A silent chieftain (`msound==0`) no longer gets the sword kit — C neither. Journal canary. Match.

No `default` in C’s switch: unknown `mm` with `MS_GUARDIAN` no-ops. JS `default: break`. Match.

### `m_initinv` priest — RNG call-for-call

C `makemon.c:721–727`: same priest predicate; `mongets(rn2(7) ? ROBE : rn2(3) ? CLOAK_OF_PROTECTION : CLOAK_OF_MAGIC_RESISTANCE)`; `SMALL_SHIELD`; `mkmonmoney(rn1(10, 20))`.

JS `makemon.js:1848–1858`: same. Ternary short-circuit: `rn2(7)` always; `rn2(3)` only when first is 0. clang left-to-right. Match. Monk invent arm already used `quest_mon_represents_role(PM_MONK)` (`makemon.c:728–729`); helper retouch makes that C-correct too. Related envelope, not a second hypothesis.

### PM_NINJA — named omit between two ported arms

C `makemon.c:270–272` sits **between** priest and guardian: `mongets(rn2(4) ? SHURIKEN : DART)` then `mongets(rn2(4) ? SHORT_SWORD : AXE)`. JS jumps priest → guardian. A `PM_NINJA` is not on the old mndx guardian list, so this SHA is **not** a regression vs prior JS; it is still a named omit vs C. §2b would have preferred the sibling arm in the same `S_HUMAN` else-if chain (too-small: “separate iters for sibling switch arms”). The queue line forbade pulling extra. Map / later Open, not Must-fix on this SHA.

MS_NEMESIS mitem still `neminum` (`makemon.js:2237–2239` vs C `ptr->msound == MS_NEMESIS`). Live Open. Not this subject.

## Hallucinations / overclaim

“Match C makemon.c m_initweap so priest and guardian kits follow ptr.msound” is **true for those two gates and for `quest_mon_represents_role`.** The kit **bodies** were already C. Callees `mksobj` / `mongets` / `mpickobj` are real. This is **not** “Match C dispatch, callee is a stub.”

It is **not** true that `S_HUMAN` weapon init is complete (ninja still missing). The comments say so.

Stamping **Addressed:** D-1088 is fair for the Open line. Fill hash `049af16e` in this commit.

## Density (§2b)

One Open cluster: priest+guardian msound gates plus the helper those predicates share, plus the matching `m_initinv` priest line. ~30 executable lines. Kit switches left untouched. Right size. Ninja left named — density smell (sibling arm), not a shipped C-wrong of the claimed gates.

## Verification

Journal: private canary (ALIGNED/HIGH msound 41; 13 guardian types 38; synth HUMAN+MS_PRIEST mace; silent chieftain no sword; Tourist Arch Priest no mace; Priest-role Arch Priest + Twoflower mace via LEADER); green+strict seed8000/0900; cohort **16**/16 incl. 0361/0367/0373 quest + strict 0367/0361/0373/0014/4500/0360/2200. Quest tours hit acolyte/chieftain/Arch Priest kits; synth **public-unhit**. Cadence **#1385** **44**/44 (quest sessions still full RNG+screen).

C read of `makemon.c:11–13`/`187–327`/`721–729`, `monflag.h:51–56`, `you.h:247`; JS `makemon.js:449–453`/`1186–1191`/`1294–1449`/`1848–1863`/`2237–2239`; `generated/monsters_data.js` `msounds[]` / `PM_CLERIC`. Hunk grepped FORCE/fs/seed.

Call-for-call priest weap (stock `MS_PRIEST`, not elf/merc):

| Call | C | JS |
|------|---|-----|
| gate | `ptr->msound == 41` \| quest CLERIC | **same** |
| `mksobj(MACE, F, F)` | yes | **yes** |
| `rnd(3)` spe | yes | **yes** |
| `rn2(2)` curse | yes | **yes** |
| `mpickobj` | yes | **yes** |

Guardian student arm (stock `MS_GUARDIAN=38`): `rn2(2)` knife/dagger; `rn2(5)` jacket/cloak; `rn2(3)` boots; `rn2(3)` healing — bodies unchanged, gate now msound. Silent chieftain: **no** `rn2(3)` long-sword (C). Tourist Arch Priest weap: not `MS_PRIEST`, `Role_if(PM_CLERIC)` false → no mace (C). Priest-role Twoflower: LEADER + Role_if → mace.

## Actionable C-wrongs

None that Must-fix this next iter. The claimed msound gates match `makemon.c`.

Named omits / do-nots (map / Open, not Must-fix):

1. `PM_NINJA` weap between priest and guardian (`makemon.c:270–272`). Do not pull into `is_pool` / sit Antimagic.
2. MS_NEMESIS mitem `ptr.msound` not `urole.neminum`. **Addressed:** D-1094
3. `dogmove.js` string `'MS_LEADER'` **Addressed:** D-1093 `e0b68f1d`. S_ORC/S_ELF/unicorn peace **Addressed:** D-1092 `c3f28bfd`.
4. Local `MS_*` duplicates `sounds.js` — values match `monflag.h` today (review **40** clone hazard).

Do not restore ALIGNED/HIGH_CLERIC / student…neanderthal **mndx** gates. Do not skip `is_elf` before priest. Do not treat Tourist Arch Priest as `MS_PRIEST`. Do not import `peace_minded` into this kit.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: priest and guardian kits now gate on `ptr.msound` and `quest_mon_represents_role` uses LEADER/NEMESIS like `makemon.c`, while PM_NINJA weap and nemesis mitem stay named omits.
- Must-fix stays empty for this SHA; next port pops review **48** sit `Antimagic` uprops, not another makemon peel.
