# Review 66 — b4930cb9 — `watchman_warn_fountain` Deaf shake/wave (D-1105)

## Metadata
- Full / short hash: `b4930cb90150d4d276d101dc7b937e59c652e610` / `b4930cb9`
- Parent: `94d93f4e` (review **62–65** + cadence **#1405**). This file audits **this SHA only**.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 20:53:01 +0200
- D-id: **D-1105**
- Stats: 10 files, +146 / −64 — `js/fountain.js` +53 / −17 (Deaf else-arm + `pronoun_gender` / `mhe` / `mhis` rewrite).
- Claims to close: Open queue `fountain.c` `watchman_warn_fountain` Deaf shake/wave (named). Not dryup yn. Stamped **Addressed:** D-1105 `b4930cb9` on the archive row (filled by D-1106). Review **65** named omit 1. `reviews/loop-2026-08-15/` has no open Deaf-shake Must-fix.
- JS / map: `fountain.js` `watchman_warn_fountain`. `c-js-map/data.md` fountain row. Cloud-glyph skip was still named (shipped D-1106).
- Prior reviews this SHA claims to close: **65** item 1 (Deaf shake/wave).

## Intent vs deliverable

Git subject promises: “Match C fountain.c so a Deaf watchman warns with shake/wave, not silence.” Body: `nolimbs` shakes HEAD; otherwise waves `makeplural(ARM)` plus `mhis`. Hearing heroes still get the yell. Cloud-glyph skip stays named.

Old JS yelled when `!Deaf`, then fell off the end with **no pline** when Deaf (comment: shake/wave deferred) but still returned true so `get_iter_mons` stopped. C `fountain.c:187–193` always prints a visual on that arm.

The diff **does** that else-arm. It also rewrites local `mhe`/`mhis` through a new `pronoun_gender` so `mhis` can `rn2(4)` under Hallucination, matching `you.h` `PRONOUN_HALLU`.

It does **not** skip the dryup pline on `S_cloud`. Named, already the next Open row at the time. It does **not** pull Excalibur or `wash_hands`.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `watchman_warn_fountain` Deaf arm | C body, **retouched** | `fountain.c:183–193` |
| `Amonnam` | C callee, **clone** | local highc of `x_monnam(ARTICLE_A)`; pre-existing D-0894 |
| `nolimbs` | C callee, **imported** | `monsters.js` ≡ `mondata.h` |
| `mbodypart` | C callee, **imported** | `polyself.js` `polyself.c` |
| `makeplural` | C callee, **imported** | `objnam.js` |
| `mhis` / `mhe` | C macros, **clone** | rewritten this SHA via `pronoun_gender` |
| `pronoun_gender` | C callee, **clone** | `mondata.c:1191–1207` `PRONOUN_HALLU` path only |
| `Hallucination` | C macro, **imported** | `do_name.js` |
| `canspotmon` | C callee, **imported** | `display.js` |
| `humanoid` / `is_neuter` / `G_UNIQ` | C, **imported** | `monsters.js` |
| `type_is_pname` | C macro, **imported** | `do_name.js` `M2_PNAME` |
| `Deaf` | C macro, **clone** | `HDeaf\|\|EDeaf\|\|uroleplay.deaf` + leftover `u.Deaf` |
| cloud-glyph skip | C `fountain.c:223–227` | named omit of this SHA |

No `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names / hardcoded coordinates. Rule #2 clean. Frozen contracts untouched. **New RNG:** `pronoun_gender` `rn2(4)` when Hallucinating, on Deaf warn **and** on the pre-existing water-demon wish `mhis`/`mhe` pair (`fountain.c:79–80`).

## Constitution / playbook

Grep of the `js/fountain.js` hunk: no trace-index gates, no recorded coordinates. `"shakes"` / `"waves"` / HEAD / ARM are C tokens, not seed-shaped strings. Contest Rule #2: no Node builtins. One await at `nhgetch` still owns input; the new `pline` is display-only.

## C ↔ JS fidelity

### Deaf vs yell — same outer gate

C `fountain.c:181–196`:

```
if (is_watch(mtmp->data) && couldsee(mtmp->mx, mtmp->my)
    && mtmp->mpeaceful) {
    if (!Deaf) {
        pline("%s yells:", Amonnam(mtmp));
        verbalize("Hey, stop using that fountain!");
    } else {
        pline("%s earnestly %s %s %s!",
              Amonnam(mtmp),
              nolimbs(mtmp->data) ? "shakes" : "waves",
              mhis(mtmp),
              nolimbs(mtmp->data)
              ? mbodypart(mtmp, HEAD)
              : makeplural(mbodypart(mtmp, ARM)));
    }
    return TRUE;
}
```

JS `163–186`: same `is_watch` / `couldsee` / `mpeaceful` gate. `!Deaf` yell + verbalize unchanged (D-0894). Else-arm evaluates left-to-right `Amonnam`, verb, `mhis`, then HEAD vs `makeplural(ARM)` — clang LTR matches the playbook rule for nested RNG. Watchmen are humanoid with limbs, so the live path is **waves** + `makeplural(ARM)` → `"arms"`. `nolimbs` HEAD is the poly/unusual arm C also has. Both arms still `return true` so `get_iter_mons` stops on the first peaceful visible watchman. Match.

`Deaf` clone: C `youprop.h:125` `HDeaf || EDeaf || u.uroleplay.deaf`. JS ORs leftover `u.Deaf` as well. `make_deaf` writes `HDeaf`. Same leftover shape as `angry_guards` (review **65**): confer-uprops `DEAF` without those flats is pre-existing analog, not invented here. Extra leftover can only **take** the visual arm, not skip a warn that C would print.

`get_iter_mons` is the pre-existing D-0894 clone (`fountain.js:192–199`): first living on-map `fmon` for which the callback returns true. C `mon.c` `get_iter_mons` walks `fmon`/`nmon` the same way. Deaf vs yell does not change who is selected — only the message. Hostile / dead / off-map / `!couldsee` still return false and continue. No watchman → trickle pline, then `dryup` **returns** without drying. Match.

### `pronoun_gender` / `mhis` vs `you.h` + `mondata.c`

C `you.h:320–324`: `mhis(mtmp)` → `genders[pronoun_gender(mtmp, PRONOUN_HALLU)].his`. `PRONOUN_HALLU` is 2.

C `mondata.c:1196–1206`:

```
if (hallu_rand && Hallucination)
    return rn2(4); /* 0..3 */
if (!override_vis && !canspotmon(mtmp))
    return 2;
if (is_neuter(mtmp->data))
    return 2;
return (humanoid(mtmp->data) || (mtmp->data->geno & G_UNIQ)
        || type_is_pname(mtmp->data)) ? (int) mtmp->female : 2;
```

JS `470–486`: always the hallu path (correct for `mhis`). `Hallucination()` then `rn2(4)`. Unseen / neuter → 2 (`it`/`its`). humanoid / `G_UNIQ` / pname → `female ? 1 : 0`. Else 2. Tables `['he','she','it','they']` / `['his','her','its','their']` match `role.c:688–693` genders[]. `PRONOUN_NO_IT` is not implemented; `mhis` never sets that bit. Match for every fountain `mhis`/`mhe` site.

This rewrite also hits `dowaterdemon` (`fountain.c:79–80` / JS `554–556`): C evaluates `mhis` then `mhe` (two `pronoun_gender` calls, two possible `rn2(4)` under hallu). JS template is the same order. Old JS skipped that RNG. New JS matches C. Cadence **#1410** seed0383/0399 still PASS, so the extra hallu rolls are not a public-trace break.

`Hallucination()` still ORs sticky `u.Hallucination` before `HHallucination && !resist`. Pre-existing helper. Sticky true without H would burn `rn2(4)` C would not. Same confer-debt class as other `Hallucination()` clones. Not Must-fix of this SHA.

### `Amonnam` clone

C `do_name.c:1152–1164`: `a_monnam` = `x_monnam(ARTICLE_A, …, has_mgivenname ? SUPPRESS_SADDLE : 0, FALSE)` then `highc`. JS local `Amonnam` highc’s `x_monnam(ARTICLE_A, null, 0, false)` and **drops** `SUPPRESS_SADDLE`. Pre-existing D-0894 clone, also used on the yell arm. Watchmen are not saddled. Not a new C-wrong of the Deaf pline.

`mbodypart` / `makeplural` / `nolimbs` are imported real functions, not stand-ins. `HEAD` / `ARM` are `const.js` body-part enums matching `you.h`. A watchman `mbodypart(..., ARM)` is `"arm"`; `makeplural` → `"arms"`. C same. `nolimbs` is `M1_NOLIMBS` on `data`, not a youprop clone.

`verbalize('Hey, stop using that fountain!')` on the hearing arm is unchanged D-0894. Deaf does **not** verbalize — C same. Returning true after the visual still counts as “you can see or hear this effect” so the trickle pline does not also fire. Match.

## Hallucinations / overclaim

“Match C so a Deaf watchman warns with shake/wave, not silence” is **true for the else-arm string, `nolimbs` verb/part split, `mhis`, and the unchanged `!Deaf` yell.** It is **not** true that cloud glyphs suppress dryup, or that `Amonnam` gained `SUPPRESS_SADDLE`.

This is **not** “Match C dispatch, callee is a stub.” The visual `pline` runs. `mbodypart` / `makeplural` / `nolimbs` are real. `mhis` is a clone that follows C `PRONOUN_HALLU`. Stamping **Addressed:** D-1105 is fair for the Open line.

## Density (§2b)

One Open cluster: the Deaf else-arm C writes next to the yell. ~25 executable lines in the warn function, plus the `pronoun_gender` rewrite the `mhis` call needs. Playbook “one deferred `if`” is the too-small column for the pline alone; pairing it with the pronoun clone C actually calls is the right envelope, not a second subsystem. Did not pull cloud-glyph / Excalibur / `wash_hands`.

## Verification

Journal: private canary **34**/34 (Deaf waves arms; !Deaf yell; uroleplay/EDeaf/`u.Deaf`; nolimbs shakes head; captain; jackal/hostile/dead/unseen trickle; out-of-town / `!isyou` / already-warned skip); green+strict seed8000/0900; cohort **15**/15 (0014 fountain + wizard/role) + strict 0014/0006/2200/0360/4500 + isolated 0009. Path **public-unhit** (public seats are !Deaf). Cadence **#1410** (this audit) **44**/44 Scr **11405**/11405 RNG **100%** — fortress, not a Deaf-watchman proof.

C read of `fountain.c:179–198` / `:79–80`, `mondata.c:1191–1207`, `you.h:318–324`, `youprop.h:125`, `do_name.c:1152–1164`, `role.c:688–693`; JS `fountain.js:152–186` / `465–486` / `554–556`. Hunk grepped FORCE/fs/seed.

| Case | C | JS after |
|------|---|---------|
| !Deaf, peaceful visible watch | yell + verbalize | **same** |
| Deaf, humanoid watch | waves his/her/its arms | **same** |
| Deaf, nolimbs | shakes HEAD | **same** |
| Hallu `mhis` | `rn2(4)` they/their | **same** (new vs old JS) |
| water-demon wish hallu | two pronoun rolls | **same** (new vs old JS) |
| cloud glyph + cansee | maybe no dryup pline | **still pline** (named this SHA) |

## Actionable C-wrongs

None that Must-fix this next iter. The Deaf pline sits where `fountain.c` puts it and the part/pronoun callees are real or C-faithful clones.

Named omits / do-nots (map / Open, not Must-fix):

1. `dryup` cansee cloud-glyph skip (`fountain.c:223–227`). Was live Open; shipped D-1106.
2. `Amonnam` still omits `SUPPRESS_SADDLE` when `has_mgivenname` (`do_name.c:1154–1155`). Pre-existing D-0894 clone. Not this queue line.
3. Do not restore the Deaf no-pline. Do not put trailing `confdir` into `getdir`. Do not pull Excalibur / `wash_hands` into this SHA’s subject.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: a Deaf town warn now prints C’s shake/wave line with real `mbodypart`/`makeplural`/`mhis`, while hearing heroes still get the yell and the cloud-glyph skip stayed the next named row.
- Must-fix stays empty for this SHA; next port after this cluster popped Open cloud-glyph skip (D-1106).
