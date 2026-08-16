# Review 63 — ebe1f041 — `goodpos_onscary` Elbereth / scare / altar-vamp (D-1102)

## Metadata
- Full / short hash: `ebe1f041eb21c785d599f3779441cff019d03c5c` / `ebe1f041`
- Parent: `a7302142` (D-1101). This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 20:01:28 +0200
- D-id: **D-1102**
- Stats: 10 files, +152 / −52 — `js/teleport.js` +58 / −6 (`goodpos_onscary` body + `engr_at` / `sengr_at` / `unique_corpstat`).
- Claims to close: Open queue `teleport.c` `goodpos_onscary` Elbereth / SCR_SCARE_MONSTER / altar-vampire (named). Not `is_pool`. Stamped **Addressed:** D-1102 `ebe1f041` on the archive row (filled by D-1103). Filled D-1101 hash `a7302142`. Review **61** named omit 2 (first half). `reviews/loop-2026-08-15/` has no open Elbereth-goodpos Must-fix.
- JS / map: `teleport.js` `goodpos_onscary`. `c-js-map/turns.md` teleport row. live-mon `onscary` when `m_id != 0` still named (live Open).
- Prior reviews this SHA claims to close: **61** item 2 Elbereth/scare/altar-vamp (not the `m_id` ternary).

## Intent vs deliverable

Git subject promises: “Match C teleport.c goodpos_onscary so fakemon placement rejects Elbereth, scare-monster scrolls, and altar-vampire cells.”

Old JS `goodpos_onscary` returned false after `S_HUMAN`/`S_ANGEL` (and those also returned false), so `GP_CHECKSCARY` never rejected anything. C `teleport.c:49–76` is the fakemon (`m_id==0`) scare approx: rider/unique immunity, altar `S_VAMPIRE`, scare-scroll (no Gehennom skip), then Inhell/endgame Elbereth skip, minotaur/`!haseyes`, then strict `sengr_at("Elbereth")`.

The diff **does** that helper. Local `engr_at`/`sengr_at` (engrave.js cycle). Altar is mlet `S_VAMPIRE` only. Scare before Inhell. HEADSTONE and future `engr_time` skipped.

It does **not** change `goodpos` to C’s `mtmp->m_id ? onscary : goodpos_onscary` (`teleport.c:168–169`). JS still always calls `goodpos_onscary`. Named, already Open. It does **not** pull vampshifter altar (C comment: `onscary` does that, this helper does not).

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `goodpos_onscary` | C body, **rewritten** | `teleport.c:53–76`; was a always-false stub |
| `engr_at` | C callee, **clone** | `engrave.c:231–240`; `engrave.js` exports the real one (cycle) |
| `sengr_at` | C callee, **clone** | `engrave.c:251–260`; strict `strcmpi` / else substring |
| `unique_corpstat` | C macro, **clone** | `mondata.h:174` `geno & G_UNIQ`; local (trap.js cycle) |
| `G_UNIQ` | C flag, **imported** | `monsters.js` `0x1000` ≡ `monflag.h:194` |
| `haseyes` | C callee, **imported** | `monsters.js` `M1_NOEYES` ≡ `mondata.h` |
| `is_rider` | C callee, **imported** | `monsters.js` |
| `sobj_at(SCR_SCARE_MONSTER)` | C callee, **local** | pre-existing floor walk |
| `Inhell` | C macro, **clone** | `dungeon.h:140` `In_hell(&u.uz)` → hellish flag |
| `In_endgame` | C macro, **imported** | `const.js` ≡ `dungeon.h:141` |
| `IS_ALTAR` | C macro, **imported** | `const.js` `typ === ALTAR` ≡ `rm.h:135` |
| `HEADSTONE` | C enum, **imported** | `const.js` `6` ≡ `engrave.h:31` |
| `onscary` | C live-mon path, **named omit** | `mon.js` has a partial; `goodpos` never calls it |
| `goodpos` checkscary | C ternary, **untouched** | still always `goodpos_onscary` |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. **No RNG** in the helper.

## Constitution / playbook

Grep of the `js/teleport.js` hunk: no trace-index gates, no recorded coordinates. `"Elbereth"` is C’s string, not a seed-shaped name. `S_VAMPIRE` is the established JS mlet token (`monsters.js` `mlets[]`), not a glyph stand-in. Contest Rule #2: no Node builtins.

## C ↔ JS fidelity

### Branch order — immunity, altar, scare, hell, minotaur/eyes, Elbereth

C `teleport.c:57–75`:

```
if (mptr->mlet == S_HUMAN || mptr->mlet == S_ANGEL
    || is_rider(mptr) || unique_corpstat(mptr))
    return FALSE;
if (IS_ALTAR(levl[x][y].typ) && mptr->mlet == S_VAMPIRE)
    return TRUE;
if (sobj_at(SCR_SCARE_MONSTER, x, y))
    return TRUE;
if (Inhell || In_endgame(&u.uz))
    return FALSE;
if (mptr == &mons[PM_MINOTAUR] || !haseyes(mptr))
    return FALSE;
return sengr_at("Elbereth", x, y, TRUE) ? TRUE : FALSE;
```

JS `150–163`: same six tests, same order. Human/angel/rider/uniq still **not** scared (including on an altar or scare scroll — C returns before those). Vampire bat (`S_BAT`) on altar is **not** scary here; C comment says vampshift is `onscary`, not this helper. Scare scroll in Gehennom still returns true (before the Inhell skip). Elbereth in Gehennom / endgame returns false. Minotaur and eyeless (gelatinous cube) ignore Elbereth but **not** a scare scroll (those return earlier). Match.

JS `mptr.mlet === 'S_HUMAN'` is the port’s mlet encoding (`mondata.js` `'@'` → `'S_HUMAN'`), not C’s character `'@'`. Same encoding as `makemon.js` / `monsters.js` `is_vampire`. Not a string-vs-char C-wrong.

JS `(mptr.mndx ?? -1) === PM_MINOTAUR` vs C `mptr == &mons[PM_MINOTAUR]`. Fakemon `data` is the `mons[]` object with `mndx` set (`monsters.js:217`). Same identity test D-1099 used for `PM_FLOATING_EYE`. Match for makemon fakemon.

`unique_corpstat`: `(ptr.geno | 0) & G_UNIQ` ≡ `mondata.h:174`. `G_UNIQ = 0x1000`. Quest nemeses / unique demons are immune here. Match.

`Inhell()` JS `1258–1260`: `game.dungeons[u.uz.dnum].flags.hellish` ≡ C `In_hell` (`dungeon.c:1942–1945`). `In_endgame(uz)` is astral `dnum`. Match.

### `sengr_at` clone vs `engrave.c`

C `engrave.c:251–260`:

```
ep = engr_at(x, y);
if (ep && ep->engr_type != HEADSTONE && ep->engr_time <= svm.moves) {
    if (strict ? !strcmpi(ep->engr_txt[actual_text], s)
               : (strstri(ep->engr_txt[actual_text], s) != 0))
        return ep;
}
```

JS `133–142`: HEADSTONE skip; `engr_time > game.moves` skip (`>` is the complement of C `<=`); `actual_text` then whole-string lowercased equality when `strict`, else `includes`. `engrave.js:498` stores `{ actual_text, remembered_text, pristine_text }`. Fallback `ep.engr_txt` covers a string-shaped save. `engr_at` walk of `game.head_engr` / `nxt_engr` matches `engrave.js:103–107` byte-for-byte.

`strcmpi` / `strstri` are case-insensitive. JS `toLowerCase` on ASCII `"Elbereth"` matches. This SHA always passes `true` (C `TRUE`), so the substring arm is unused for `goodpos_onscary`. HEADSTONE skip is C’s “player named Elbereth” grave. Future `engr_time` is C’s delayed engraving. Match.

Local copy vs `import` from `engrave.js`: `engrave.js` imports `trap.js` / paths that import `teleport.js`. Cycle. Clone is justified. Classify as **clone of C callee**. `mon.js` `onscary` still uses `String(ep.engr_txt || '') === 'Elbereth'`, which stringifies the object — that is the **live-mon** helper, not this SHA, and is why the Open `onscary` row still matters.

### `goodpos` still always `goodpos_onscary`

C `teleport.c:168–169`:

```
if (checkscary && (mtmp->m_id ? onscary(x, y, mtmp)
                              : goodpos_onscary(x, y, mdat)))
    return FALSE;
```

JS `357`: `if (checkscary && goodpos_onscary(x, y, mdat)) return false;`

Makemon fakemon `{ data: ptr }` has no `m_id` (0 / undefined). C takes the `goodpos_onscary` arm. JS same. **Fakemon placement is the claimed subject and matches.**

`rloc_pos_ok` (`teleport.c:1581` / JS `688`) passes a **live** `mtmp` with `GP_CHECKSCARY`. C uses `onscary`: Elbereth typically needs the hero (or displacement image) on the square; vampshifters scare on altars. JS now runs the fakemon approx: any strict `"Elbereth"` engraving rejects the cell even with the hero elsewhere. That is a **live-mon over-reject vs C**, introduced because the stub used to return false for everyone.

The SHA **names** this (`Named: onscary when m_id != 0`). Live Open already queues `teleport.c` `goodpos` live-mon `onscary` when `m_id != 0`. That is a named omit of the ternary, not an unlisted C-wrong of the helper body. Do not Must-fix a duplicate of that Open row. Do not pretend `rloc` Elbereth now matches C `onscary`.

Wallwalk still returns **before** checkscary (`teleport.c:163–164`). A xorn on Elbereth still places. D-log “xorn wallwalk before scary.” Match. `GP_CHECKSCARY` off still accepts Elbereth cells. Match.

## Hallucinations / overclaim

“Match C so fakemon placement rejects Elbereth, scare-monster scrolls, and altar-vampire cells” is **true for `goodpos_onscary` itself: immunity, altar mlet only, scare-before-hell, minotaur/eyeless, strict sengr_at, HEADSTONE/future skip.** It is **not** true that live `rloc_pos_ok` now calls `onscary`, that vampshifted bats scare on altars here, or that lawful minions beyond `S_HUMAN`/`S_ANGEL`/rider/uniq are distinguished (C comment: this oversimplifies; JS copies that).

This is **not** “Match C dispatch, callee is a stub” for the **fakemon** path: `sengr_at` / `sobj_at` / `haseyes` / `unique_corpstat` are real clones or imports. The **live-mon** `goodpos` dispatch remains the fakemon helper — named Open, not a silent stub of this subject.

Stamping **Addressed:** D-1102 is fair for the Open `goodpos_onscary` line. Hash `ebe1f041` is on the archive row (filled by D-1103). It is **not** fair as a close of live-mon `onscary`.

## Density (§2b)

One Open cluster: C’s one static helper plus the two callees it reads (`sengr_at`, `unique_corpstat`). ~50 executable lines. Sibling `onscary` ternary correctly left Open (different function, live `struct monst` fields). Not “finish teleport.c.” Right size.

## Verification

Journal: private canary **48**/48 (immune human/angel/rider/uniq; altar vamp vs bat; scare in hell; Elbereth strcmpi / substring / HEADSTONE / future time / Inhell / endgame; minotaur+cube Elbereth vs scare; xorn wallwalk before scary; no-flag still accepts); green+strict seed8000/0900; cohort **14**/14 + strict 0014/4500/0360/2200/0367/0009. Path **public-unhit** (no public Elbereth / `GP_CHECKSCARY` miss). Cadence fortress is not an Elbereth proof.

C read of `teleport.c:49–76` / `168–169` / `1581`, `engrave.c:231–260`, `mondata.h:174`, `dungeon.h:140–141`, `dungeon.c:1942–1945`, `rm.h:135`, `engrave.h:31`; JS `teleport.js:115–163` / `357` / `688` / `1258–1260`, `engrave.js:103–107` / `495–498`, `mon.js:198–233`; hunk grepped FORCE/fs/seed.

| Case | C fakemon | JS after |
|------|-----------|----------|
| jackal + strict Elbereth | scary | **same** |
| jackal + `elbereth` case-fold | scary (`strcmpi`) | **same** |
| jackal + `foo Elbereth` (strict) | not scary | **same** |
| HEADSTONE `Elbereth` | not scary | **same** |
| future `engr_time` | not scary | **same** |
| scare scroll in Gehennom | scary | **same** |
| Elbereth in Gehennom | not scary | **same** |
| vampire on altar | scary | **same** |
| vampire bat on altar | not scary here | **same** |
| human / rider / G_UNIQ | never scary | **same** |
| minotaur + Elbereth | not scary | **same** |
| minotaur + scare scroll | scary | **same** |
| live `rloc` + hero-less Elbereth | `onscary` usually false | **`goodpos_onscary` true** (named) |

## Actionable C-wrongs

None that Must-fix this next iter (would duplicate live Open).

Named omits / do-nots (map / Open, not Must-fix):

1. `teleport.c` `goodpos` live-mon `onscary` when `m_id != 0` (`teleport.c:168–169`). Live Open. `rloc_pos_ok` over-rejects hero-less Elbereth until that ternary ships. Not `goodpos_onscary`.
2. `sp_lev.c` `lspo_exclusion` populate — still Open. Not this helper.
3. Do not import `engrave.js` `engr_at` (cycle). Do not treat vampshifter altar as this helper. Do not restore the always-false stub.

Do not skip scare-before-Inhell. Do not let minotaur ignore scare scrolls. Do not use youprop `Passes_walls` here.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- Score: **7 / 10**
- One sentence: fakemon `goodpos_onscary` now follows C’s altar / scare / strict Elbereth envelope with real `sengr_at` and `unique_corpstat` clones, while live `goodpos` still always calls that helper instead of `onscary`.
- Must-fix stays empty for this SHA; the `m_id` ternary is already the live Open row, not a new family.
