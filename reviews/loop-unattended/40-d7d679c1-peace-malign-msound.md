# Review 40 — d7d679c1 — `peace_minded` / `set_malign` `ptr.msound` (D-1079)

## Metadata
- Full / short hash: `d7d679c18e97555843e4108743a1c9b0d3b51a28` / `d7d679c1`
- Parent: `c7dcd80a` (D-1078; review **39**). JS-touching since last `reviews/loop-unattended/` file: D-1078, **this SHA**, D-1080. This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 13:26:01 +0200
- D-id: **D-1079**
- Stats: 11 files, +121 / −53 — `js/makemon.js` +21 / −10 (`peace_minded` + `set_malign` + local `MS_*`). Live JS is those two functions, not a new module.
- Claims to close: Open queue `makemon.c` `peace_minded` / `set_malign` read `ptr.msound` (`msounds[]` exists, D-1053). Review **14** named omit. Stamped **Addressed:** D-1079 on the archive row with hash `d7d679c1` (filled by D-1080). `reviews/loop-2026-08-15/` has no open msound-malign Must-fix.
- JS / map: `makemon.js` `peace_minded` / `set_malign`. `c-js-map/data.md` names D-1079; `m_initweap` still mndx (live Open); `dogmove.js` string `'MS_LEADER'` still Open.
- Prior reviews this SHA claims to close: **14** named unread `peace_minded`/`set_malign`. Review **38** did not name this.

## Intent vs deliverable

Git subject promises: “Match C peace_minded and set_malign so they read ptr.msound now that msounds[] exists.” Body: quest leaders were taking always_peaceful malign instead of C MS_LEADER −20; guardians/nemeses skipped the post-always_* short-circuit.

The queue line was those two functions reading `ptr->msound` after D-1053 filled `msounds[]`. Not `m_initweap` MS_GUARDIAN/MS_PRIEST (still mndx). Not `dogmove.js` string compares.

The diff **does** that envelope: after `always_peaceful`/`always_hostile`, `peace_minded` returns true for `MS_LEADER`/`MS_GUARDIAN` and false for `MS_NEMESIS` before `PM_ERINYS`. `set_malign` sets −20 when `data.msound == MS_LEADER` before `A_NONE` / `always_peaceful`. Local `MS_LEADER=36` / `NEMESIS=37` / `GUARDIAN=38` match `monflag.h:51–53` and `sounds.js`.

It does **not** retouch `m_initweap` (comments still say “tables omit msound; gate by mndx” — stale comment, live mndx gates remain). Named, and already an Open row. It does **not** fix `dogmove.js` `msound === 'MS_LEADER'`. Named, already Open.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `peace_minded` | C body, **retouched** | `makemon.c:2268–2308`; three msound returns inserted |
| `set_malign` | C body, **retouched** | `makemon.c:2321–2366`; MS_LEADER −20 before A_NONE |
| `MS_LEADER` / `MS_NEMESIS` / `MS_GUARDIAN` | **clone** of `monflag.h` enum | 36/37/38; same numbers as `sounds.js` / extracted `msounds[]` |
| `always_peaceful` / `always_hostile` | C macros, **imported** | `mondata.h` `M2_PEACEFUL` / `M2_HOSTILE` |
| `m_initweap` MS_GUARDIAN / MS_PRIEST | C other arms, **named omit** | still mndx / `quest_mon_represents_role` |
| `dogmove.js` pal/target | pre-existing **diverging clone** | string vs numeric; not this SHA |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. No RNG inside the new arms (they return before `rn2(16+record)` / `rn2(2+abs(mal))`).

## Constitution / playbook

Grep of the `js/makemon.js` hunk: no trace-index gates, no recorded coordinates, no `fastforward` burns. `MS_LEADER=36` is `monflag.h`, not a seed-shaped quest table. Contest Rule #2: no Node builtins.

## C ↔ JS fidelity

### `peace_minded` — branch order, then RNG

C `makemon.c:2268–2308`:

```
    if (always_peaceful(ptr)) return TRUE;
    if (always_hostile(ptr)) return FALSE;
    if (ptr->msound == MS_LEADER || ptr->msound == MS_GUARDIAN)
        return TRUE;
    if (ptr->msound == MS_NEMESIS)
        return FALSE;
    if (ptr == &mons[PM_ERINYS])
        return !u.ualign.abuse;
    if (race_peaceful(ptr)) return TRUE;
    if (race_hostile(ptr)) return FALSE;
    if (sgn(mal) != sgn(ual)) return FALSE;
    if (mal < A_NEUTRAL && u.uhave.amulet) return FALSE;
    if (is_minion(ptr)) return (u.ualign.record >= 0);
    return !!rn2(16 + clamp) && !!rn2(2 + abs(mal));
```

JS `makemon.js:1022–1043`: same order. `ptr.msound | 0` after D-1053 is the extracted `SIZ` third argument (`monsters.js` copies `msounds[mndx]`). Missing field → 0 (`MS_SILENT`) → fall through, not a false leader. `PM_ERINYS` still `!ualign.abuse` (D-0905). `mal < 0` for `A_NEUTRAL=0`. Two `rn2` only on the last arm. Match.

Stock quest **leaders** and **guardians** are `M2_PEACEFUL` (`monsters.h` Lord Carnarvon / student / …). They return at `always_peaceful` and **never reach** the new msound lines. Stock **nemeses** are `M2_HOSTILE` (Minion of Huhetotl / Thoth Amon / Chromatic Dragon / …) and return at `always_hostile` before `MS_NEMESIS`. The new arms are live for: a `ptr` that is MS_LEADER/GUARDIAN/NEMESIS **without** those mflags2 bits (poly form that dropped `M2_PEACEFUL`/`M2_HOSTILE`, or a synth canary). That is C. The subject’s “guardians/nemeses skipped the post-always_* short-circuit” is **true of the old JS** (which had no msound arms at all) and **true of C for poly/synth**, not of stock spawn (C also hits `always_*` first). Code matches C; the prose over-states stock.

`msounds[]` sample: the generated table ends in a run of 36 (leaders), 37 (nemeses), 38 (guardians) matching `monsters.h` `SIZ(..., MS_LEADER|NEMESIS|GUARDIAN, ...)`. Local enum 36/37/38 matches. Not a second numbering like the old growl `MS_ROAR=6` bug.

### `set_malign` — MS_LEADER before always_peaceful; no RNG

C `makemon.c:2338–2346`: after priest/minion individual align ×5 and `coaligned`, **first** `if (mtmp->data->msound == MS_LEADER) mtmp->malign = -20;` else `A_NONE` 0/20 else `always_peaceful` −3×max(5,abs) / renegade +3×…

JS `makemon.js:472–481`: same. Twoflower (tourist leader): `always_peaceful` **and** `msound==36`. Old JS took always_peaceful → −3×max(5, |mal|). For mal 0 that is −15. C MS_LEADER wins → **−20**. That is the live public-adjacent fix (quest tours spawn leaders; kill-malign still public-unhit). `A_NONE` hostile 20, always_hostile coaligned 0, coaligned peaceful −3×max(3,abs) unchanged.

Priest/minion EPRI/EMIN ×5 still only when those mextra fields exist (pre-existing named omit). Not this queue line.

Call-for-call: `set_malign` has zero `rn2`/`rnd`/`rn1`/`d`. `peace_minded` msound returns add **zero** RNG; they prevent the two trailing `rn2` for matching ptrs. Synth LEADER/GUARDIAN with `always_*` false and no `rn2` is the right private falsifier (journal). Match.

### `set_malign` remaining arms (untouched, still C)

After the new MS_LEADER test, JS still does C’s chain: `A_NONE` peaceful 0 / hostile 20; `always_peaceful` −3×max(5,abs) or renegade +3×; `always_hostile` coaligned 0 else max(5,abs); coaligned peaceful −3×max(3,abs) else max(3,abs); else `abs(mal)`. `sgn` is the local `makemon.js` helper (same as before this SHA). `coaligned` is still computed even for MS_LEADER (C computes it too, then ignores it on that arm). No extra `mal *= 5` on leaders who are not priest/minion.

A quest leader that is also `always_peaceful` (all stock leaders) must **not** take the −15 arm. The `else if` chain is what enforces that. Restoring “MS_LEADER after always_peaceful” would re-break Twoflower. Do not.

### `peace_minded` trailing RNG (untouched)

The last return is still `!!rn2(16+recClamp) && !!rn2(2+Math.abs(mal))` with `recClamp = record < -15 ? -15 : record`. C `u.ualign.record < -15 ? -15 : u.ualign.record`. Short-circuit: if the first `rn2` is 0, the second is not called — JS `&&` matches C `&&`. MS_LEADER/GUARDIAN/NEMESIS returns sit **before** Erinys, so a synth leader does not consume Erinys-or-later RNG. Stock Erinys is not MS_LEADER (msound is not 36). D-0905 stays.

`ptr.msound | 0` on a stub `data` without the field is 0, not `'MS_LEADER'`. `dogmove.js` still compares the **string** `'MS_LEADER'` to the numeric field — dead for live `mons()`. Pre-existing; already Open. This SHA must not be blamed for leaving it, and must not be credited for fixing it.

### `m_initweap` left unread on purpose

JS `makemon.js:1375–1389` still gates MS_PRIEST by mndx (`ALIGNED_CLERIC` / `HIGH_CLERIC` / `quest_mon_represents_role(..., CLERIC)`) and MS_GUARDIAN by student/attendant/… names. C uses `ptr->msound == MS_PRIEST` / `MS_GUARDIAN`. Named; live Open `m_initweap` `ptr.msound` for MS_GUARDIAN / MS_PRIEST. Stale comment “tables omit msound” is documentation drift, not a C-wrong in the functions this SHA claimed.

## Hallucinations / overclaim

“Match C peace_minded and set_malign so they read ptr.msound” is **true**: both functions now test `data.msound` with C numbers at C’s position in the `if` chain. This is **not** “Match C dispatch, callee is a stub.” `always_peaceful` / `mons().msound` are real.

“Quest leaders were taking always_peaceful malign instead of C MS_LEADER −20” is **true for `set_malign`**. “Guardians/nemeses skipped the post-always_* short-circuit” is true of **old JS** and of **C poly/synth**, overstated for **stock** `M2_PEACEFUL`/`M2_HOSTILE` (C also short-circuits on `always_*`). Do not treat stock student spawn as a new `peace_minded` RNG skip — there was no `rn2` on that path before either.

Stamping **Addressed:** D-1079 `d7d679c1` is fair for the two functions. Hash is on the archive row (filled by `0a4a5df3`).

## Density (§2b)

One Open cluster: the two C functions the queue named, msound arms only. ~15 executable lines. Small, but it **is** the whole remaining gap in those functions (the rest was already D-0056/D-0172/D-0905/D-0251). Not “finish `m_initweap`.” Not a sit one-bullet peel. Sibling `m_initweap` / `dogmove` left named on purpose (already Open rows).

## Verification

Journal: private canary (Twoflower/Carnarvon/Arch Priest msound 36; Minion 37; student 38; leader malign −20 vs always_peaceful −15; synth LEADER/GUARDIAN true and NEMESIS false with no `rn2`; Erinys D-0905; A_NONE hostile 20); green+strict seed8000/0900; cohort **18**/18 including 0361/0367/0373 quest + strict 0014/4500/0360/0361/0367/0373/2200. Quest tours spawn leaders; public **kill-malign unhit**. Cadence **#1375** **44**/44 after this SHA.

C read of `makemon.c:2268–2366`, `monflag.h:51–53`, `mondata.h:116–117`, `monsters.h` leader/guardian/nemesis `M2_*`; JS `makemon.js:448–493` / `1022–1043` / `1375–1389`, `monsters.js:195`, `generated/monsters_data.js` `msounds[]`; hunk grepped FORCE/fs/seed.

Private canary vs C (journal):

| `ptr` | `peace_minded` | `set_malign` (peaceful) |
|-------|----------------|-------------------------|
| Twoflower / Carnarvon (`MS_LEADER` + `M2_PEACEFUL`) | true via `always_peaceful` (msound unread) | **−20** (msound wins) |
| student (`MS_GUARDIAN` + `M2_PEACEFUL`) | true via `always_peaceful` | always_peaceful formula (not −20) |
| Minion of Huhetotl (`MS_NEMESIS` + `M2_HOSTILE`) | false via `always_hostile` | always_hostile arm |
| synth LEADER, `always_*` false | true, **no `rn2`** | −20 |
| synth NEMESIS, `always_*` false | false, **no `rn2`** | not −20 |
| Erinys | `!ualign.abuse` (D-0905) | unchanged |

Kill-malign is public-unhit; quest tours only prove spawn-time `peace_minded`/`set_malign` on `M2_PEACEFUL` leaders (the −20 write). Adequate for the Open line.

`m_initweap` comment at `makemon.js:1386` still says “tables omit msound; gate by mndx”. After D-1053 the tables do **not** omit msound. Leaving the mndx gate is the named Open row; leaving the comment is docs drift inside scored JS. A later `m_initweap` port should delete that sentence when it switches to `ptr.msound`. Not Must-fix on this SHA.

Local `MS_*` in `makemon.js` duplicate `sounds.js`. Values match `monflag.h` today. A future enum drift would be a clone hazard; prefer importing a shared `const.js` table when `m_initweap` is ported. Not this SHA.

`MS_PRIEST` is 41 (`monflag.h:56`). This SHA does not mention it. Do not treat D-1079 as having finished priest mace `m_initweap`. Open already names that row.

## Actionable C-wrongs

None that Must-fix this next iter. The two functions read `ptr.msound` at C’s branch position with C’s enum values.

Named omits / do-nots (map / Open, not Must-fix):

1. `makemon.c` `m_initweap` `ptr.msound` for MS_GUARDIAN / MS_PRIEST **Addressed:** D-1088 `049af16e`. Do not steal eat.c `cprefx` for it.
2. `dogmove.c` pal/target numeric `ptr.msound` not string `'MS_LEADER'` (live Open).
3. Stale `m_initweap` comments still say tables omit msound.

Do not restore unread `ptr.msound` in peace/malign. Do not skip `always_peaceful` before MS_LEADER in `peace_minded`. Do not put MS_LEADER −20 after always_peaceful in `set_malign`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: `set_malign` now gives quest leaders C’s MS_LEADER −20 instead of always_peaceful −15, and `peace_minded` tests `ptr.msound` after `always_*` like `makemon.c`, while `m_initweap` stays mndx.
- Must-fix stays empty for this SHA; next Open after D-1080 is still eat.c `cprefx`. Do not pop `m_initweap` msound before that Open line.
