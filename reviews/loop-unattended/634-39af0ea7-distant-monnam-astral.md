# Review 634 — 39af0ea7 — do_name.c distant_monnam astral high-cleric (D-1673)

## Metadata
- Full / short hash: `39af0ea7212da65548e7c88314325b76ebdcb6a2` / `39af0ea7`
- Parent: `1e88c3d3` (D-1672). This file audits **this SHA only** (eighth of nine `js/` commits since review **626**). Archive **Addressed:** D-1673 `39af0ea7`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-29 18:21:48 +0200
- D-id: **D-1673**
- Stats: `js/do_name.js` +36/−8. Band **150–350** (`js/` insertions **36** <250; id >454).
- Claims to close: Open `distant_monnam` astral high-cleric conceal after D-1638 always-`x_monnam`. Not `do_mgivenname` body. Not `priestname`. Not `oc_uses_known`. `reviews/loop-2026-08-15/` has no unpaid distant_monnam Must-fix.
- JS / map: `do_name.js` `distant_monnam` / `distant_monnam_none` / `astral_high_cleric_distant_nam`. `c-js-map/turns.md`.
- Prior reviews this SHA claims to close: none unpaid (map Open from D-1672). **633** named this row.

## Intent vs deliverable

Git subject promises: a non-adjacent Astral high cleric is named `the high priest(ess)` instead of always calling `x_monnam` after D-1638.

Pinned C `distant_monnam` `:1168–1186` (`node scripts/csym.mjs distant_monnam`). `--callers`: `do_name.c:251` (`do_mgivenname` ARTICLE_THE); `pager.c:432` (`look_at_monster` ARTICLE_NONE); `priest.c:359` comment only (not a call); `extern.h:710`. Macros: `you.h:560` `m_next2u`; `hack.h:1531` `distu`; `hacklib.c:672–678` `dist2`; `dungeon.h:113` `Is_astralevel`; `youprop.h:120` `Hallucination`.

```1178:1184:nethack-c/upstream/src/do_name.c
    if (mon->data == &mons[PM_HIGH_CLERIC] && !Hallucination
        && Is_astralevel(&u.uz) && !m_next2u(mon)) {
        Strcpy(outbuf, article == ARTICLE_THE ? "the " : "");
        Strcat(outbuf, mon->female ? "high priestess" : "high priest");
    } else {
        Strcpy(outbuf, x_monnam(mon, article, (char *) 0, 0, TRUE));
```

Old JS: `distant_monnam` → `x_monnam(..., true)` only; `distant_monnam_none` skipped the conceal prefix (given-name / `"called"` leak). The diff **does** the C `if` on both ARTICLE_THE and the pager NONE helper. It **does not** rewrite `do_mgivenname`, unify pager onto `x_monnam`, or port `priestname` `" of "` god. Named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `distant_monnam` | C `:1168–1186`, **LIVE this SHA** | conceal then `x_monnam(..., TRUE)` |
| `distant_monnam_none` | JS split of ARTICLE_NONE, **LIVE this SHA** for conceal prefix | pager `look_at_monster`; else still shk/ghost/given-name shortcut |
| `astral_high_cleric_distant_nam` | C `:1178–1182` **CLONE** (one local) | factored `if`; **do not add #2** |
| `PM_HIGH_CLERIC` | C mons index, **LIVE** | `monsterNames.indexOf` → **276** |
| `Is_astralevel` | C `dungeon.h:113`, **LIVE** import `const.js` | `Lcheck` / `on_level` vs JS `In_endgame && dlevel===1` |
| `Hallucination` | C `youprop.h:120`, **CLONE** (module-local) | not `display.js` C-locus; sticky `u.Hallucination` extra |
| `m_next2u` | C `you.h:560` **CLONE** inline | `dx²+dy²<=2`; **do not add clone #6** |
| `x_monnam` | C `:827+`, **LIVE** else of ARTICLE_THE | last arg `TRUE` / `called` |
| `shkname` | C, **LIVE** | pre-existing NONE shortcut |
| `priestname` | C priest.c, **OMIT named** | `" of "` god / `reveal_high_priest` |

`node scripts/csym.mjs distant_monnam` → `:1168-1186`. `--callers distant_monnam`: `:251` / `pager.c:432` / priest comment `:359`. `node scripts/csym.mjs dist2` → `hacklib.c:672-678`. `node scripts/csym.mjs Hallucination` → `youprop.h:120`.

RNG: none in the conceal arm. No seed gate.

`node scripts/sym.mjs` on new / re-pointed names (no clone deleted; new local helper + import):

```
distant_monnam   js/do_name.js:752   sync
distant_monnam_none js/do_name.js:733   sync
astral_high_cleric_distant_nam NOT EXPORTED — but 1 LOCAL CLONE(S) in 1 file(s):
               js/do_name.js:715
             => Do NOT write clone #2. Check pinned C; if C has one
                function, this is clone drift (map debt / Open row).
Is_astralevel    js/const.js:3032   sync
Hallucination    js/display.js:344   sync
                 js/do_name.js:295   sync
             !! multiple exports — import the C-locus one; do NOT add another
             !! ALSO 8 LOCAL CLONE(S) in 8 files
m_next2u         NOT EXPORTED — but 5 LOCAL CLONE(S) in 5 file(s):
               js/apply.js:1366  js/mhitu.js:171  js/mon.js:2687  js/muse.js:124  js/shk.js:3384
             => Do NOT write clone #6.
```

`--can do_name.js const.js Is_astralevel`: **ALREADY**. `--can do_name.js display.js Hallucination` is also an existing `display.js` import edge; this SHA did **not** add `Hallucination` to that import (uses module-local). Do **not** stamp “cycle-forced clone.” Do **not** add `m_next2u` #6. Do **not** add `astral_high_cleric_distant_nam` #2.

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / seed names / coordinates in this SHA’s `js/` hunks. `node scripts/imports.mjs --rulecheck`: Rule #2 clean.

## C ↔ JS fidelity

Species. C `mon->data == &mons[PM_HIGH_CLERIC]` (permonst identity). JS `mons()` returns a **fresh** object (`monsters.js:201–205` always stamps `mndx`), so pointer equality would never fire. `(mon.data?.mndx | 0) !== PM_HIGH_CLERIC` is the analogue. `PM_HIGH_CLERIC === 276` (`monsterNames.indexOf`). Extra `PM_HIGH_CLERIC < 0` is dead. **Match the species test**, not Match a C pointer.

Hallucination. C `:1179` `!Hallucination` with `youprop.h:116–120`: `HHallucination && !Halluc_resistance` (`Halluc_resistance` is H\|\|E). JS helper uses `do_name.js:295–304`: sticky `u.Hallucination` **or** `HHallucination && !resist`. Sticky true without H skips conceal (C would hide). `display.js:344` is the timeout-only C-locus (D-1493). Pre-existing confer-debt; same class as review **66**. Not Must-fix of this SHA. H-timeout path **matches C**.

Astral. C `Is_astralevel(&u.uz)` = `Lcheck` = `Lassigned && on_level` vs `astral_level` (`dungeon.h:111–113`; `In_endgame` is `dnum == astral_level.dnum`). JS import `Is_astralevel(game.u?.uz)` = `In_endgame && dlevel===1` (`const.js:3031–3032`). Topology stores astral as endgame dlevel 1. **Match the live predicate** used elsewhere; not a new `Lcheck` clone.

Adjacent. C `!m_next2u(mon)` with `m_next2u` = `distu(mx,my) <= 2` and `distu` = `dist2` = `dx*dx+dy*dy` (`you.h:560`, `hack.h:1531`, `hacklib.c:672–678`). JS expands the same squared test at the site (shk.js clone is `dx²+dy²<=2`). Orthogonal 1, diagonal 2, knight 5. **Match `:1180` without clone #6.**

Article + sex. C `article == ARTICLE_THE ? "the " : ""` then `female ? "high priestess" : "high priest"`. JS `ARTICLE_THE` / `ARTICLE_NONE` are `const.js:371–372` (`0`/`1`). **Match `:1181–1182`.**

Else ARTICLE_THE. C `x_monnam(mon, article, NULL, 0, TRUE)`. JS `distant_monnam` else is `x_monnam(mtmp, article, null, 0, true)`. The `TRUE` is C’s `called` (given name as `"type called N"`). **Match `:1183`.** `do_mgivenname` already called `distant_monnam(mtmp, ARTICLE_THE)` (`js/do_name.js:570` ≡ C `:251`); this SHA makes that prompt conceal without rewriting the getlin body.

Else ARTICLE_NONE / pager. C one function: conceal else `x_monnam(..., ARTICLE_NONE, TRUE)`. JS pager still calls `distant_monnam_none` (`pager.js:305`). After conceal miss: `isshk` → `shkname`, ghost, `MGIVENNAME` bare, else saddle+plain — **not** `x_monnam(..., TRUE)`. Pre-existing D-0330/D-0390 split. Conceal **hit** now returns bare `"high priest"` / `"high priestess"` (no `"called"` leak). Conceal **miss** (adjacent) still the shortcut. Named: hallu / mappear / invis suffix / full `x_monnam` NONE.

`priestname` `:359–365` is a **separate** `" of "` god arm (`do_hallu || !high_priest || reveal_high_priest || !Is_astralevel || m_next2u || gameover`). Not a `distant_monnam` caller. Named omit.

Callee closure (this SHA). LIVE: `Is_astralevel` import, `x_monnam` else, `shkname` NONE miss, `PM_HIGH_CLERIC`. CLONE: conceal `if` (matched here, one local); `m_next2u` inline; module `Hallucination`. OMIT named: `priestname`; pager NONE → full `x_monnam`; `x_monnam` priest/minion/mappear. STUB: **none** in the conceal arm. Combined-arm: every C callee of `:1178–1182` is LIVE, OMIT, or a verified CLONE. “Dispatch ported, callee stubbed” is **false**.

## Hallucinations / overclaim

Subject “non-adjacent Astral high cleric named the high priest(ess)”: **true** for `distant_monnam` and for pager conceal-hit. D-log “same `if` order; `data.mndx`; expand `distu<=2`; no `m_next2u` #6”: **true**. Do **not** stamp “Match C `look_at_monster` always `x_monnam` ARTICLE_NONE.” Do **not** stamp “Match C `priestname` ` of ` god.” Do **not** stamp “Match C `Hallucination` timeout-only” for `do_name.js` (sticky extra). Do **not** stamp “Match C `do_mgivenname` body.” Fortress 44/44 does not prove Astral farlook. Public-unhit.

## Density

+36: C body is 19 lines (`:1168–1186`). Playbook §2b: below ~40 insertions is a failed Open handoff **unless C is that small**. It is. One function family. Did not glue `oc_uses_known`. Did not add `m_next2u` #6.

## Verification

Wired: species `mndx`; `!Hallucination` (H-timeout); `Is_astralevel`; `!m_next2u`; THE `"the "` / NONE bare; `female` priestess; ARTICLE_THE else `x_monnam` `called`. Unwired C: `priestname`; pager NONE else-`x_monnam`; sticky hallu. Conf: no RNG. No seed gate.

D-log private canary (far THE/NONE/female, given-name leak, adjacent, non-astral, hallu); green+strict seed8000/0900; cohort **9**/9 + strict. **Public-unhit** for Astral Plane.

## Actionable C-wrongs

None for Must-fix. Named (map, not Must-fix): `priestname` `" of "` god / `reveal_high_priest`; pager `look_at_monster` else still not `x_monnam(..., TRUE)`; `x_monnam` priest/minion/`mappear`/invis adj; sticky `do_name.js` `Hallucination` (import `display.js` C-locus is a confer cluster, not this Open). Do **not** add `m_next2u` clone #6. Do **not** add `astral_high_cleric_distant_nam` #2. Do **not** re-port `docall` (D-1672). Do **not** re-port `x_monnam` `called` (D-1638).

Verdict: **ACCEPT-WITH-DEBT**
