# Review 33 — 55906000 — `dosit` ustuck `!sticks` lap (`Monnam` / `mhis`) (D-1072)

## Metadata
- Full / short hash: `5590600029a45facabb4a5f26a4cc7510015a6ea` / `55906000`
- Parent: `4ee4c056` (cadence **#1360** docs-only; Must-fix empty; popped Open lap). JS-touching since last `reviews/loop-unattended/` file (`32-aa96e08c-…`, written in `0b836721`): **this SHA only**. Docs-only in the same window: `4ee4c056` cadence **#1360** (see below; not a JS audit).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-16 10:45:55 +0200
- D-id: **D-1072**
- Stats: 14 files, +154 / −57 — `js/sit.js` +55 / −8 (header + local `mhis` + lap `if` after the reach-floor return + imports); `js/engrave.js` +7 / −3 (header + `export` on existing `sticks`). Live JS is the `dosit` lap gate and the `mhis` clone, not a new helper file.
- Claims to close: Open queue `sit.c` `dosit` ustuck `!sticks` lap (`Monnam` / `mhis`). Not swallow combat. Stamped **Addressed:** D-1072 on the archive row **without** the short hash (chicken-egg). This review commit fills `55906000`. Also fills review **32** named omit and review **30** named omit.
- JS / map: `sit.js` `dosit`; `engrave.js` `sticks` export. `c-js-map/data.md` names D-1072 and still omits picnic `uteetering` / meager hoard / `lay_an_egg` / `split_mon`. Helper `ceiling_hider` / `MZ_HUGE` still named on `turns.md`.
- Prior reviews this SHA claims to close: **32** ACCEPT named omit “ship lap next, use engrave `sticks` not `monmove.js`”. Review **31** ACCEPT left Must-fix empty. `reviews/loop-2026-08-15/` has no open lap Must-fix.

## Intent vs deliverable

Git subject promises: “Match C dosit so a grabbed hero who can still reach the floor is refused a lap instead of sitting.” Body is empty beyond Co-authored-by. D-log: after `can_reach_floor(FALSE)` succeeded, JS `#sit` still sat (pool/OBJ_AT/having-fun). C `else if (u.ustuck && !sticks(youmonst.data))` plines `Monnam`/`mhis` lap and returns `ECMD_OK`. Hugs never reach this arm (helper FALSE → sit-on-air, D-1071). Eel `AD_WRAP`, mimic `AD_STCK`, and trapper-not-swallow do.

Review 32’s Open line was exactly that arm, with those “do not”s: use **this** `sticks` (C `monattk.h` 7/11/19/28); do **not** `import { sticks } from './monmove.js'`; do not pull swallow combat / `ceiling_hider` / `MZ_HUGE` / pit teeter.

The diff **does** that envelope: after the helper succeeds, `ustuck && !sticks(hero)` using the engrave export; humanoid grabber → `"%s won't offer %s lap."`; else `"%s has no lap."`; `ECMD_OK`. Local `mhis` walks C `pronoun_gender` order. Did not import `monmove.js`. Sit still dynamically imports engrave (existing `sit←engrave←hack←eat←sit` cycle).

It does **not** port picnic `uteetering` / `uescaped_shaft`, dragon meager hoard, `lay_an_egg`, helper `ceiling_hider` / `MZ_HUGE`, or swallow combat. Named, and excluded. It does **not** rewrite `monmove.js` `sticks`. Correct.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `dosit` ustuck lap arm | C call site, **new** | `sit.c:422–429`; after reach-floor, before pool `goto` |
| `sticks` | **clone** of `mondata.c:654–658`, **exported** this SHA | same body as D-1071; C AT 7/11/19/28 |
| `mhis` | **clone** of `you.h:324` → `pronoun_gender(..., PRONOUN_HALLU)` | local; sit cannot import `mhitu.js` (`zap←mhitu` cycle) |
| `Monnam` | imported C callee | `do_name.c:1074–1079`; `do_name.js:548–550` `highc(mon_nam)` |
| `humanoid` | imported C callee | `mondata.h:65` `M1_HUMANOID`; `monsters.js:323–325` |
| `canspotmon` | imported C callee | `display.h:129` `canseemon \|\| sensemon`; `display.js:357–359` |
| `is_neuter` / `type_is_pname` / `G_UNIQ` | imported C | `mondata.h:114`/`135`; `monflag.h:194` `0x1000` |
| `Hallucination()` | **clone**, **pre-existing** sit.js | used by new `mhis`; TIMEOUT\|sticky, not full `youprop.h` |
| `monmove.js` `sticks` | imported C callee, **not used** | still AT 6/7; `sticks(python)` false vs C true |
| picnic / `lay_an_egg` / `ceiling_hider` | C later/other arms, **named omit** | next Open is picnic gate |

No new `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` / seed names in control flow / hardcoded coordinates. Dynamic `import('./engrave.js')` is ESM cycle avoidance, not filesystem. Rule #2 clean. Frozen contracts untouched.

## Constitution / playbook

Grep of the `js/sit.js` and `js/engrave.js` hunks: no trace-index gates, no recorded coordinates, no `fastforward` burns. Strings are C `pline` formats, not a seed-shaped grabber table. Constants in `sticks` remain `monattk.h`, not a seed hug table. Contest Rule #2: no Node builtins in scored code.

## C ↔ JS fidelity

### Call site — after helper TRUE, `ECMD_OK`, two strings, no RNG at the `if`

C `sit.c:414–429`:

```
    if (!can_reach_floor(FALSE)) {
        ...
        return ECMD_OK;
    } else if (u.ustuck && !sticks(gy.youmonst.data)) {
        if (humanoid(u.ustuck->data))
            pline("%s won't offer %s lap.", Monnam(u.ustuck), mhis(u.ustuck));
        else
            pline("%s has no lap.", Monnam(u.ustuck));
        return ECMD_OK;
```

JS `sit.js:1057–1082`: helper FALSE → three messages + `return ECMD_OK` (D-1069). Then a **separate** `if (u.ustuck && !sticks(game.youmonst?.data))` — not `else if`. Equivalent: the first arm always returns. C’s `else if` then pool `goto` (`sit.c:430–431`) is JS’s later `if (is_pool && !Underwater())`. Lap return skips picnic/trap/water, same as C.

`sticks` is on **hero** `youmonst.data`, not the grabber. C `gy.youmonst.data`. Missing `youmonst.data` makes engrave `sticks` false (no slots) — same as an unpoly’d human (`AT_WEAP`, no STCK/WRAP/HUGS), so `!sticks` is true and lap can fire. `u_init` / `set_uasmon` point `youmonst.data` at `mons[umonnum]`. `humanoid(u.ustuck.data)` is C `ustuck->data` (`monsters.js` `M1_HUMANOID` `0x00020000`). `ECMD_OK` is `0x00`. No `newsym`. No `rn2`/`rnd`/`rn1`/`d` at the `if` itself.

C evaluates `trap = t_at` / `typ` at `dosit` entry (`sit.c:403–404`). JS still does that **after** the lap return. `t_at` has no side effects. On the lap path both return before trap/OBJ_AT. Match.

### Hugs never reach this arm — C order, call-for-call with D-1071

C `engrave.c:191–199` returns FALSE on swallow, then `ustuck && !sticks(hero) && attacktype(ustuck->data, AT_HUGS)`, then dungeon `Levitation`. JS helper already has that `||` order. A python/owlbear/couatl/kraken grab (`AT_HUGS=7`) is sit-on-air (or tumble if also `Levitation()`), **not** lap. Review 32 required hugs-before-lap so this SHA would not steal hugged heroes. The diff does not reopen the helper `if`. Match.

Live lap grabbers (helper TRUE, hero `!sticks`):

| Grabber | Why helper TRUE | `humanoid` | C / JS string |
|---------|-----------------|------------|----------------|
| giant/electric eel `AT_TUCH`+`AD_WRAP` | not `AT_HUGS` | false (`M1` eel, not HUMANOID) | `"The giant eel has no lap."` |
| large/giant mimic `AD_STCK` | not hugs | false (`NOLIMBS`/`AMORPHOUS`) | `"The large mimic has no lap."` |
| lichen / violet fungus `AD_STCK` | not hugs | false; also `M2_NEUTER` | `"has no lap."` (mhis unused) |
| barbed devil `AD_STCK` | not hugs | false (`M1_POIS`/`THICK_HIDE`, no HUMANOID) | `"has no lap."` |
| trapper/lurker `AT_ENGL`+`AD_WRAP` not swallowed | not hugs; WRAP&&ENGL so `sticks(trapper)` is false | false | `"has no lap."` |
| python/owlbear **hero** grabbed | `sticks(hero)` true (`AT_HUGS`) | — | **skip lap, sit** |
| swallow | helper FALSE first | — | `"no seats"` (D-1069) |

Stock `monsters.h` has **no** `M1_HUMANOID` + `AD_STCK` and no humanoid `AD_WRAP` without `AT_HUGS`. The humanoid `"won't offer … lap"` arm is still C (poly / cham / private hobbit `ustuck`). JS ships both arms. Private node hobbit tests that string; eel/mimic/trapper test the else. Match.

### `sticks` export — same clone as D-1071, not `monmove.js`

C `mondata.c:654–658`: `dmgtype(AD_STCK) || (dmgtype(AD_WRAP) && !attacktype(AT_ENGL)) || attacktype(AT_HUGS)`. Engrave local clone (D-1071) already matched that short-circuit and `monattk.h` `AT_HUGS=7` / `AT_ENGL=11` / `AD_STCK=19` / `AD_WRAP=28`. This SHA only adds `export`. Sit dynamic-imports that export. `monmove.js:1315–1328` still comments `AT_HUGS` as 6 and `AT_ENGL` as 7, so `sticks(python)` is false vs C true. Unused here. Do not “simplify” later peels by importing it.

### `Monnam` — imported C callee, clang LTR same as JS template

C `do_name.c:1074–1079`: `Monnam` = `highc(*mon_nam())`. JS `do_name.js:548–550` `highc_name(mon_nam(mtmp))`. `mon_nam` is `x_monnam(..., ARTICLE_THE, ...)` (`do_name.c:1042–1046`; review **28**). C `pline("%s won't offer %s lap.", Monnam(u.ustuck), mhis(u.ustuck))` evaluates `Monnam` then `mhis` (clang left-to-right). JS template `${Monnam(u.ustuck)} won't offer ${mhis(u.ustuck)} lap.` same order. Unnamed spotted eel: `"the giant eel"` → `"The giant eel has no lap."`. Unseen: `mon_nam` `"it"` → `"It has no lap."` / humanoid `"It won't offer its lap."`. `You`/`There` are not used at this site (C `pline`). Match.

Hallu `rndmonnam` inside `mon_nam` is pre-existing `x_monnam` behavior, unhit on public `#sit`. Not a new sit.js consumption.

### `mhis` clone — non-hallu arms match C `pronoun_gender`; hallu uses sit’s existing `Hallucination()`

C `you.h:324`: `mhis(mtmp)` = `genders[pronoun_gender(mtmp, PRONOUN_HALLU)].his`. C `mondata.c:1191–1207` with `PRONOUN_HALLU` (bit 2), `PRONOUN_NO_IT` off:

1. `Hallucination` → `return rn2(4)` (0..3)
2. `!canspotmon(mtmp)` → 2
3. `is_neuter(mtmp->data)` → 2
4. `(humanoid \|\| (geno & G_UNIQ) \|\| type_is_pname) ? (int)mtmp->female : 2`

C `role.c:688–694` `genders[].his`: `his` / `her` / `its` / `their`. JS array is that order. `mtmp.female` is 0/1 from `makemon.js` (`is_male`→0, `is_female`→1, else `rn2(2)`). `G_UNIQ` is `0x1000` on `ptr.geno`. `type_is_pname` is `M2_PNAME`. `canspotmon` is `canseemon || sensemon` (`display.h:129`). Sit cannot import `mhitu.js` `mhis` — that clone is **worse** (skips `canspotmon`/neuter/uniq; hallu on sticky `u.Hallucination` only). Local clone of C is the right call.

Non-hallu: spotted male hobbit → `"his"`; female → `"her"`; unseen → `"its"`; eel unused (not humanoid). `!ptr` → `"its"` is defensive; C always has `data`. Match for sober.

Hallu: C `youprop.h:116–120` `Hallucination` ≡ `HHallucination && !Halluc_resistance` with `Halluc_resistance` ≡ `H\|\|E`. Sit’s **pre-existing** `Hallucination()` (`sit.js:155–160`) is `!u.Halluc_resistance` then `u.Hallucination || (HHallucination & TIMEOUT)`. `timeout.js` / `potion.js` already mirror sticky from TIMEOUT, so potion hallu takes `rn2(4)` like C. `EHalluc_resistance` without sticky (`artifact.js`) can still hallu in this clone while C would not — **pre-existing sit.js `Hallucination()`, also used by `attrcurse`**. Not a new sit-only gate. Do not rewrite every `Hallucination()` clone this next iter. Named, not Must-fix against the lap `if`.

`mhitu.js` `mhis` and `apply.js` `mhis_apply` remain incomplete clones. Unused here.

## Hallucinations / overclaim

“Match C dosit so a grabbed hero who can still reach the floor is refused a lap instead of sitting” is **true for the `ustuck && !sticks(hero)` gate and both `pline`s**. It is **not** true that `dosit` is complete C (picnic pit gates, meager hoard, `lay_an_egg` still named), or that `can_reach_floor` is complete (`ceiling_hider` / `MZ_HUGE` / teeter still named).

This is **not** “Match C dispatch, callee is a stub.” `sticks` is the D-1071 clone of `mondata.c` with C numbers, now exported. `Monnam` is the shared `do_name.js` function. `humanoid` / `canspotmon` / `is_neuter` / `type_is_pname` are imported C predicates. `mhis` is a local clone of `pronoun_gender` whose non-hallu arms match; hallu inherits sit’s TIMEOUT\|sticky `Hallucination()`, which the D-log overstates as full `youprop.h`. Classify: **clones that match C on the sober path**; hallu-resist is named sit.js debt, not a diverging AT-number clone like `monmove.js` `sticks`.

Stamping the Open item **Addressed:** D-1072 is fair for the lap gate. Fill hash `55906000` in this commit (archive row + reviews 32 and 30 named omits).

## Density (§2b)

One Open cluster: C `sit.c:422–429` plus the `sticks` export and `mhis`/`Monnam` callees that arm needs. Review 32 asked for this, not another one-line sit peel and not “finish `mondata.c` / swallow combat.” ~40 executable lines + comments. Engrave is export-only. Right size. Not picnic/`lay_an_egg` in the same commit (unrelated later `else if`s).

## Verification

Journal: private node eel/mimic/trapper `"has no lap."` `ECMD_OK`; hobbit `"won't offer … lap."`; owlbear hug still air; python hero `sticks` sits (no lap); swallow still no seats. green+strict PASS; cohort **14**/14 (8000/0900/1500/1800/0060/0102/0700/0106/0107/0101/0116/2200/4500/0009). Path **public-unhit**. Green+cohort is regression cover, not a public eel-grab `#sit`. Cadence **#1360** **44**/44 ran **before** this SHA (`4ee4c056`) — fortress, not lap-sit proof.

This review iter did not re-run sessions (not a cadence slot; Must-fix empty). The audit is C `sit.c:422–429` vs the new `if` and clones.

C read of `sit.c:400–435`, `engrave.c:191–199`, `mondata.c:654–658`/`1191–1207`, `you.h:317–324`, `youprop.h:116–120`, `do_name.c:1074–1079`, `role.c:688–694`, `mondata.h:65`/`114`/`135`, `monflag.h:194`, `display.h:129`, `monsters.h` eel/mimic/lichen/barbed-devil/trapper ATTK lines, `uhitm.c:3314–3328`/`6286–6289`; JS `sit.js:155–181`/`1054–1085`, `engrave.js:233–274`, `monmove.js:1315–1328`, `do_name.js:335–338`/`515–550`, `makemon.js` `female`, hunk grepped FORCE/fs/seed.

## Docs-only in window — `4ee4c056` cadence #1360

Subject: “Refresh cadence #1360 full-suite score so CURRENT.md matches the measured 44/44 fortress.” Stats: 4 files, +38 / −21 — `CURRENT.md` / `NOTES.md` / journal + rotation. **No `js/`.** Score line **44**/44 Scr **11405**/11405 RNG **100%** speed `31+0.27/turn` (R² 0.87) matches `CURRENT.md` as of this review. Next cadence @**#1365**. Not a port claim. No FORCE/fs. Not a substitute for auditing `55906000`.

## Actionable C-wrongs

None from this SHA. The lap `if`, engrave `sticks` export, `Monnam` import, and non-hallu `mhis` match C.

Named omits / do-nots (map / Open, not Must-fix):

1. **`dosit` OBJ_AT picnic gate** (`sit.c:437–439`): skip picnic when `uteetering_at_seen_pit(trap)` or `uescaped_shaft(trap)`. Live Open line. Do not pull dragon meager hoard / `lay_an_egg` / `ceiling_hider` this next iter. **Addressed:** D-1073 `1f21183f` (meager follow-up **Addressed:** D-1074 `962e07a9`)
2. Helper `ceiling_hider` / `MZ_HUGE` / pit teeter; `Flying` sticky vs `youprop.h` (not live at `dosit`+`FALSE`).
3. Sit.js `Hallucination()` remains TIMEOUT\|sticky (also `attrcurse`); `EHalluc_resistance` without sticky can still `rn2(4)` in `mhis` while C would not. Do not rewrite every `Hallucination()` clone as part of picnic.
4. `monmove.js` `sticks` still uses AT 6/7. Do not import it for later sit/engrave peels.

Do not skip dosit lap / treat eel WRAP as hugs / import `monmove.js` `sticks`. Do not restore Levitation-only `dosit`. Do not add `newsym` at the hider clear. Do not put trailing `confdir` inside shared `getdir`.

## Verdict

- Verdict: **ACCEPT**
- Score: **8 / 10**
- One sentence: after the helper succeeds, `ustuck && !sticks(hero)` uses C-numbered engrave `sticks` and C `Monnam`/`mhis` strings, so an eel/mimic grab returns `ECMD_OK` instead of sitting, and hugs still air as D-1071 requires.
- Must-fix stays empty; next port pops Open `dosit` OBJ_AT `uteetering`/`uescaped_shaft`.
