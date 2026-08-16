# Review 28 — 2e50b318 — `dosit` steed `You` + `mon_nam(usteed)` (D-1067)

## Metadata
- Full / short hash: `2e50b318c2a7b55552680c5f45560829cc2a6cff` / `2e50b318`
- Parent: `7e330128` (D-1066 ACCEPT this review iter; Must-fix empty; popped Open `dosit` steed `mon_nam`)
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 07:13:36 +0200
- D-id: **D-1067**
- Stats: 11 files, +104 / −56 — `js/sit.js` +15 / −8 (header + one `pline` + `mon_nam` import). Live JS change is the early-return string.
- Claims to close: Open queue `dosit` steed message (D-1033 risk 4, named then, not a Must-fix). Stamped **Addressed:** D-1067 on the archive row **and** on `reviews/loop-2026-08-15/D-1033-a59caac8-vlad-throne.md` **without** the short hash (chicken-egg). This review commit fills `2e50b318`. Also filled D-1066 hash `7e330128` on the archive row (already present from the fix SHA).
- JS / map: `sit.js` `dosit`; `c-js-map/data.md` still names hider / `can_reach_floor` / ustuck / `uteetering` / wizard getlin / `lay_an_egg`.
- JS-touching since last `reviews/loop-unattended/` file: `7e330128` (review **27**) and this SHA.
- Prior reviews this SHA claims to close: **26** ACCEPT next was nhcore (done as D-1066); D-1033 risk 4 “Steed `"your steed"` ≠ `mon_nam(usteed)`” (named, not Must-fix). `reviews/loop-unattended/09-e395bb74` left risk 4 named. No live Must-fix on this string.

## Intent vs deliverable

Git subject promises: “Match C dosit so sitting while mounted names the steed with mon_nam, not your steed.” Body is empty beyond Co-authored-by. D-log: `#sit` while mounted printed `"You are already sitting on your steed."` C uses `You("are already sitting on %s.", mon_nam(u.usteed))`.

C `sit.c:406–409` is the first `dosit` gate: if `u.usteed`, that `You`+`mon_nam`, `return ECMD_OK`. C `do_name.c:1042–1046` is `mon_nam`: `x_monnam(..., ARTICLE_THE, NULL, named ? SUPPRESS_SADDLE : 0, FALSE)`. C `do_name.c:1117–1128` is `y_monnam`: `ARTICLE_YOUR` if `mtame`, and **also** `SUPPRESS_SADDLE` when `mtmp == u.usteed` (“saddled is redundant when mounted”). C `pline.c:366–374` is `You`: prefix `"You "` then `vpline`. C `do_name.c:863–865` `do_it` excludes `u.usteed` (mounted steed is never `"it"`). C `do_name.c:943–945` adds `"saddled "` when `W_SADDLE && !Blind && !Hallucination`. C `do_name.c:1000–1004`: `name_at_start && (ARTICLE_YOUR || !has_adjectives)` → `ARTICLE_NONE` (bare given name), except Wizard of Yendor.

The queue line was exactly that message. The diff replaces the hardcoded `"your steed"` interpolating `mon_nam(u.usteed)` and imports the existing helper. Header deferred-list drops “steed name”.

It does **not** port hider / `can_reach_floor` / ustuck. Named, and not this Open line. It does **not** switch `cmd.c` `"Dismount your steed"` menu text (D-log). It does **not** call `y_monnam`. Correct: that would be `"your pony"` with saddle suppressed, not C `dosit`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dosit` usteed arm | C call site, retouched | `sit.c:406–409`; first gate, `ECMD_OK` |
| `mon_nam` | imported C callee | `do_name.c:1042–1046`; `do_name.js:515–523` |
| `x_monnam` | imported C callee, **not this SHA** | `do_name.c:827–1031`; `do_name.js:409–508` |
| `y_monnam` | C sibling, **not used** | `do_name.c:1117–1128`; would be the wrong article |
| `You` | C callee, inlined | `pline.c:366–374` `"You "` + format; JS one `pline` |
| `has_mgivenname` / `SUPPRESS_SADDLE` | imported C | named → no `"saddled "` |
| `Hallucination` `rndmonnam` | inside `mon_nam`, unhit | display RNG only if Hallu |
| hider / `can_reach_floor` / ustuck | C later gates, **not this SHA** | `sit.c:410–429` |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names in control flow / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the `js/sit.js` hunk: no trace-index gates, no recorded coordinates, no `fastforward` burns. The string is C’s `You` format, not a seed-shaped mount name. Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### Call site — first gate, `ECMD_OK`, `You` prefix

C `sit.c:406–409`:

```
    if (u.usteed) {
        You("are already sitting on %s.", mon_nam(u.usteed));
        return ECMD_OK;
    }
```

JS (`sit.js:992–998`): `if (u.usteed)` → `` pline(`You are already sitting on ${mon_nam(u.usteed)}.`) `` → `return ECMD_OK`. `You` (`pline.c:366–374`) is `"You "` + the format string; JS inlines that prefix the same way `You_sit_message` already does for furniture. `ECMD_OK` is `0x00` (`const.js:1727`); no time. Match.

C then does hider (`sit.c:410–412`), then `can_reach_floor(FALSE)` including Levitation tumble (`414–421`), then ustuck (`422–429`). JS still jumps to Levitation after this arm (`sit.js:1000–1003`) and still names hider / full `can_reach_floor` / ustuck deferred. For a mounted hero both return before those gates. This SHA does not change that order. Match for the mounted envelope.

C `can_reach_floor` is not “if Levitation”: swallow has no seats, Levitation tumbles, otherwise sit-on-air (`sit.c:414–421`). JS only implements the Levitation tumble. Unmounted paths remain a named `dosit` omit. They are the right next cluster, not a Must-fix from this string.

### `mon_nam` vs `"your steed"` vs `y_monnam`

C `mon_nam` is ARTICLE_THE, not a literal `"your steed"`, and not `y_monnam`. A typical unnamed saddled pony steed is tame; `y_monnam` would use ARTICLE_YOUR **and** suppress saddle because `mtmp == u.usteed`, yielding `"your pony"`. `mon_nam` does **not** special-case usteed for saddle, so the same monster is `"the saddled pony"`. Named pet: `has_mgivenname` → `SUPPRESS_SADDLE`, `name_at_start` → ARTICLE_NONE → `"Lightning"`. Unnamed unsaddled: `"the pony"`.

JS imports `mon_nam` (`do_name.js:515–523`): same `ARTICLE_THE` + named `SUPPRESS_SADDLE` + `called=false`. `x_monnam` (`do_name.js:427–431`) keeps C’s `mtmp !== u.usteed` in `do_it`. `saddle_adj` (`do_name.js:353–358`) checks `W_SADDLE && !Blind && !Hallucination()`. Private node claimed those three strings. The callee is the shared function, not a sit.js clone.

`x_monnam` still names priest/minion, mappear, invis adjective, AUGMENT_IT, is_mplayer `" the "` split as deferred. A riding hero’s steed is not those arms. Invis `"invisible "` on a mounted steed is a named `x_monnam` omit, not this Open line.

### RNG

No `rn2`/`rnd`/`rn1`/`d` at the `dosit` site. `mon_nam` → `rndmonnam` only when `Hallucination()` (`do_name.c:861` / `950–952`). C same. Public `#sit` while mounted+hallu is unhit. Not a new consumption on the fortress path.

### Three names — C `x_monnam` arms this SHA relies on

Unnamed saddled pony, can-spot, not Blind/Hallu (`do_name.c:938–946`, `996–1004`, `1015–1016`):

```
    if (do_saddle && (mtmp->misc_worn_check & W_SADDLE) && !Blind
        && !Hallucination)
        Strcat(buf, "saddled ");
    has_adjectives = (buf[0] != '\0');
    /* … not named → pm_name … */
    name_at_start = type_is_pname(mdat);  /* pony: false */
    /* name_at_start && !has_adjectives is false */
    case ARTICLE_THE: Strcpy(buf2, "the ");
```

Result `"the saddled pony"`. JS `saddle_adj` + `ARTICLE_THE` + `mon_pmname`. Match.

Named `"Lightning"`, `has_mgivenname` (`do_name.c:1044–1045` passes `SUPPRESS_SADDLE`; `956–983` `Strcat(buf, name); name_at_start = TRUE`; `1000–1004` clears article because `name_at_start && !has_adjectives`):

Result `"Lightning"` (bare). Not `"the Lightning"`, not `"the saddled Lightning"`. JS `has_mgivenname ? SUPPRESS_SADDLE : 0` then `name_at_start` → `ARTICLE_NONE`. Match.

Unnamed unsaddled: no `"saddled "`, `has_adjectives` false, still ARTICLE_THE → `"the pony"`. Match.

`y_monnam` (`do_name.c:1117–1128`) is the trap: tame → `"your "`, and `mtmp == u.usteed` forces `SUPPRESS_SADDLE`, so the same saddled pony would be `"your pony"`. D-log and the sit.js comment refuse that helper. The import list does not include `y_monnam`. Match.

### `do_it` never turns the steed into `"it"`

C `do_name.c:863–865`:

```
    do_it = !canspotmon(mtmp) && article != ARTICLE_YOUR
            && !program_state.gameover && mtmp != u.usteed
            && !engulfing_u(mtmp) && !(suppress & SUPPRESS_IT);
```

Mounted, `mtmp == u.usteed` → `do_it` false even if `canspotmon` is false. JS `do_name.js:427–431` has `mtmp !== game.u?.usteed`. Pre-existing; this SHA needs it. Match.

### What the public cohort does **not** prove

seed0103/0104 are Knight **ride** (`u.usteed` set) but the captured keys are not `#sit`. seed0004 feeds a pony. None of the journal’s 7/7 sessions is a scored mounted-`#sit` screen. Cadence **#1350** still 44/44 does not newly paint `"the saddled pony"` on a public frame. The private node is the only name check. Fair.

`cmd.c` dismount / ride menu `"Dismount your steed"` is a different C string (D-log). Not this arm. `do_name.js` `x_monnam` still omits invis `"invisible "` / priest / mappear; a riding hero’s steed does not take those arms. Hallu `rndmonnam` would burn display RNG on mounted `#sit`; C same; public-unhit.

## Hallucinations / overclaim

“Match C dosit so sitting while mounted names the steed with mon_nam” is **true for the first `dosit` gate, `You`+`mon_nam` ARTICLE_THE, `ECMD_OK`, and not `y_monnam`.** It is **not** true that `dosit` is now C for hider / `can_reach_floor` / ustuck, that every `x_monnam` adjective is ported, or that `cmd.c` dismount text changed. The D-log deferred list says those.

This is **not** “Match C dispatch, callee is a stub.” `mon_nam` / `x_monnam` are the C functions already in `do_name.js`. The old string was the C-wrong; this SHA deletes it.

Stamping the Open item **Addressed:** D-1067 is fair for the mounted early-return. Fill hash `2e50b318` in this commit (archive row + D-1033 risk 4).

## Density (§2b)

Too small: one `pline` (plus import/comment). Playbook §2b “one deferred if alone” / one-bullet peel. The live Open after D-1066 was this string; remaining `dosit` hider / `can_reach_floor` / ustuck are the sibling gates immediately under it in C (`sit.c:410–429`) and could have been one cluster. The C match for **this** line is still exact. Density is a process miss, not a C-wrong: do not enqueue “make the peel bigger.” Next port should take the remaining `dosit` early gates together (or a `debt.md` cluster), not another one-line sit peel.

## Verification

Journal: private node saddled unnamed `"the saddled pony"`; named `"Lightning"`; unsaddled `"the pony"`; `ECMD_OK`; never `"your steed"`. green+strict PASS; cohort **7**/7 (0106/0107/4500/1500/1800/0060/2200). Path **public-unhit** (no scored `#sit` while mounted). Fair: the journal says so.

seed0103/0104 set `u.usteed` via ride; their keys never take this `dosit` arm, so that cohort is a regression check, not a name proof.

This review iter ran cadence **#1350** full `sessions` (same iteration): **44**/44 Scr **11405**/11405 RNG **100%** speed `31+0.26/turn` (R² 0.87). That does not newly prove mounted `#sit`. C read of `sit.c:398–429`, `do_name.c:827–875`/`943–946`/`1000–1031`/`1042–1046`/`1117–1128`, `pline.c:366–374`, JS `sit.js:87–90`/`992–1003`, `do_name.js:353–358`/`409–523`. Grep of the JS hunk: no `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / seed names in control flow.

## Actionable C-wrongs

None in the mounted `dosit` early-return this SHA shipped.

Named omits (map, not queue): hider undetected; `can_reach_floor` (uswallow / sit-on-air / full Levitation vs JS Levitation-only); ustuck lap; `uteetering` / `uescaped_shaft`; wizard getlin; `lay_an_egg`; `x_monnam` invis adjective / priest / mappear; `cmd.c` `"Dismount your steed"`.

Do not restore `"your steed"` vs `mon_nam(usteed)`. Do not swap in `y_monnam`.

Do not put trailing `confdir` inside shared `getdir`.

## Verdict

- Verdict: **ACCEPT**
- Score: **7 / 10**
- One sentence: the mounted `#sit` line now interpolates shared `mon_nam` (ARTICLE_THE, saddle unless named), which is C `sit.c:406–408`, but the iteration was a one-pline peel under a still-gappy `dosit`.
