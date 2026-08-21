# Review 309 — 1651816e — objnam.c doname W_WEP warn_obj / artifact_light (D-1347)

## Metadata
- Full / short hash: `1651816e397432bfe18bc1ac9d99e8bf5f223916` / `1651816e`
- Parent: `15b20ab4` (D-1346). This file audits **this SHA only**. Archive **Addressed:** D-1347 `1651816e` already has the short hash (filled by D-1348).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 07:44:00 +0200
- D-id: **D-1347**
- Stats: 12 files, +277 / −62 — `js/objnam.js` +84 / −2; `js/artifact.js` +52; `js/generated/artifacts_data.js` acolor; `scripts/extract-artifacts.py` +26.
- Claims to close: Open `objnam.c` warn_obj glow (named from D-1322 / review **284**). Not killer_xname. `reviews/loop-2026-08-15/` has no unpaid doname-glow Must-fix.
- JS / map: `objnam.js` `doname` W_WEP else; inlined `glow_verb`/`glow_color`/`artifact_light`/`arti_light_description`; `artifact.js` exports of the same; `c-js-map/turns.md`. `see_monsters` `warn_obj_cnt` / `Sting_effects` / SPFX_WARN / ARMOR `:1412` / Hallu `hcolor` still named.
- Prior reviews this SHA claims to close: **284** named warn_obj after W_WEP `!mrg_to_wielded`; **307** / D-1346 follow-up queued this Open row.

## Intent vs deliverable

Git subject promises: “Match C objnam.c doname so a wielded warning artifact glows (or a lit Sunsword shows lit) by overwriting the W_WEP closing paren, instead of leaving a bare (weapon in right hand).”

C `doname_base` (`objnam.c:1561–1610`); overwrite `:1597–1610`:

```
            if (!Blind && bpspaceleft && bp_eos[-1] == ')') {
                if (gw.warn_obj_cnt && obj == uwep
                    && (EWarn_of_mon & W_WEP) != 0L)
                    ConcatF2(bp, 1, ", %s %s)",
                             glow_verb(gw.warn_obj_cnt, TRUE),
                             glow_color(obj->oartifact));
                else if (obj->lamplit && artifact_light(obj))
                    ConcatF1(bp, 1, ", %s lit)",
                             arti_light_description(obj));
            }
```

Callees: `glow_verb`/`glow_color` `artifact.c:2427–2462`; `artifact_light` `:2264–2275`; `arti_light_description` `light.c:916–931` via `arti_light_radius` `:881–910`. C `set_artifact_intrinsic` `:824–839` confers `SPFX_WARN` into `EWarn_of_mon` and `see_monsters` updates `warn_obj_cnt` — **not this SHA**.

Old JS: Concat how-string only (D-1322). Named omit of the overwrite.

The diff **does** overwrite the last `)` with `, VERBing COLOR)` or `, ADVERB lit)`, extract `artilist.acolor`, and add first-match `clr2colorname` + glow-verb table. doname **inlines** those helpers (cannot import `artifact.js`: artifact→invent→shk TDZ). It does **not** confer SPFX_WARN or write `warn_obj_cnt`. Named. ARMOR gloves `:1412` still named.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `doname` W_WEP overwrite | C `:1599–1609`, **wired** | `!Blind && endsWith(')')`; JS `bpspaceleft` always true (named) |
| `glow_verb` / `glow_strength` | C `:2436–2462`, **clone** (doname inline + `artifact.js` export) | `quiver/flicker/glimmer/gleam` + `"ing"`; bypasses `ing_suffix` |
| `glow_color` / `clr2colorname` | C `:2427–2433` / `coloratt.c`, **clone** | index-by-`CLR_*` of **first-match** names; skips aliases after NULL |
| `acolor` extract | C `artilist.h` A() last color, **wired** | Sting/Orcrist `12` `CLR_BRIGHT_BLUE`; Grimtooth `1` `CLR_RED`; Excalibur `8` `NO_COLOR` |
| `EWarn_of_mon` | C `youprop.h:169`, **clone** | `uprops[WARN_OF_MON].extrinsic` (`WARN_OF_MON=32`) |
| `doname_artifact_light` | C `artifact_light` `:2264–2275`, **clone** | gold DSM/scales `W_ARM` else `oartifact===ART_SUNSWORD` |
| `arti_light_description` | C `light.c:916–931`, **clone** | blessed 3 / uncursed 2 / cursed 1; uskin=1; gold DSM ++ |
| `hcolor` in `glow_color` | C `:2432`, **named omit** | identity unless Hallu |
| `see_monsters` / `Sting_effects` `warn_obj_cnt` | C, **named omit** | **never written** in `js/` |
| `set_artifact_intrinsic` SPFX_WARN | C `:824–839`, **named omit** | HALRES+REFLECT only (D-1342) |
| ARMOR gloves `:1412` | C `doname_base`, **named omit** | different `owornmask` arm |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Extractor is `scripts/`, not scored `js/`. Rule #2 clean. **New gameplay RNG:** none. Hallu `hcolor` would be display-rng — omitted.

## C ↔ JS fidelity

W_WEP else of `(wielded)`: after Concat how+hand, `!Blind` and last char `)`. Match `:1599`. Glow if `warn_obj_cnt && obj===uwep && (EWarn_of_mon & W_WEP)`; else lamplit `artifact_light`. Match `:1600–1609`. Glow **beats** lit (else-if). Match. Stack/ammo `(wielded)` path still skips overwrite. Match `:1571–1576`.

`glow_strength`: `(n>12)?3:(n>4)?2:(n>0)` — C’s last term is boolean 0/1. JS uses `n>0?1:0`. Match. Verbs + `"ing"` without `ing_suffix`. Match `:2457–2460`. `clr2colorname`: C loops `colornames[]` first match, skipping aliases after NULL. JS dense table: `12` → `"light blue"` not `"bright blue"`; `8` → `"no color"`. Match `coloratt.c:12–28`. Extracted acolor matches `artilist.h` (Sting/Orcrist `CLR_BRIGHT_BLUE`, Grimtooth `CLR_RED`).

`artifact_light`: gold DSM/scales **and** `owornmask & W_ARM`, else Sunsword. JS uses `oartifact===ART_SUNSWORD` instead of `get_artifact && is_art` — equivalent for this otyp. `arti_light_radius` bless/curse/uskin/gold-DSM++ then adverb switch. Match `:899–930`. doname already gated lamplit; extra `'strangely'` if the clone is called ungated is C’s `default`.

Clones: doname inline vs `artifact.js` exports use the same verb table, same strength ternary, same acolor source (`artilistRaw` vs `artilist()` copy). They **do not diverge** from each other. They **do** skip `hcolor`. Named.

Hallucination check: “Match C doname so a wielded warning artifact **glows**” while **`warn_obj_cnt` is never written** and **SPFX_WARN never sets `EWarn_of_mon`** is an overclaim on **runtime** Sting glow. The **overwrite formula** matches `:1599–1609`. Callees `glow_verb`/`glow_color` are real tables, not stubs. Lit Sunsword **can** fire from `obj.lamplit && artifact_light` without those two bits — if something sets `lamplit` on Sunsword. Do **not** stamp “Match C `see_monsters` / `Sting_effects` / SPFX_WARN.” Do **not** stamp “Match C ARMOR `:1412`.”

## Hallucinations / overclaim

Subject says a wielded warning artifact glows by overwriting the paren. **True of the string math when `warn_obj_cnt` and `EWarn_of_mon&W_WEP` are already set.** **False in production today** until those two named omits ship — both predicates stay 0, so doname never takes the glow arm. Lit-Sunsword overwrite is the arm that can fire without `warn_obj_cnt`. D-1347 **Not this iter** names the bits. Stamping **Addressed:** D-1347 for the W_WEP `)` rewrite is fair. Do **not** treat fortress PASS as a `glimmering light blue` inventory line.

## Density

One C overwrite plus its callees and the acolor field those callees read. ~80 lines of JS + extractor. Playbook §2b right size (not “finish doname”). ARMOR `:1412` is a different worn-armor arm, not a sibling W_WEP case — leaving it named is correct. Did not glue `the()` / SPFX_WARN conferral into this SHA. Acceptable.

## Branch-by-branch confirm

1. Blind: skip overwrite. Match `:1599`.
2. `warn_obj_cnt==0` or `obj!==uwep` or `!(EWarn&W_WEP)`: no glow; may still lit-overwrite. Match.
3. Glow + lit: glow wins. Match else-if.
4. `(wielded)` ammo/stack: no overwrite. Match.
5. Sting acolor 12 → `"light blue"`; Grimtooth 1 → `"red"`; Excalibur 8 → `"no color"`. Match extract.
6. cnt 1 / 5 / 13: flicker / glimmer / gleam + `ing`. Match strength.
7. Sunsword blessed/uncursed/cursed: brilliantly / brightly / dimly. Match radius 3/2/1.
8. `see_monsters` / SPFX_WARN: still omit. Named.
9. **Public-unhit** unless a session `doname`s a glowing Sting or lit Sunsword.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `CLR2COLORNAME` is the C first-match table, not a seed-shaped string. Plain ESM. Generated data from extractor, not a runtime `readFileSync`.

## Verification

Journal: private canary **35**/35; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on glow/lit doname. This audit cadence: full `sessions` at HEAD `533e732f` **44**/44 Scr **11,405** RNG 100% speed `37+0.30/turn`. I did not re-run the private canary. Fortress PASS is not a Sting line with `, glimmering light blue)`.

## Actionable C-wrongs

None for Must-fix. The overwrite matches C `:1599–1609`. Unwired `warn_obj_cnt` / SPFX_WARN are named omit **callers/conferrals** of a live formula, not a clone that prints the wrong verb/color when the bits are set. Hallu `hcolor` is a named omit of `glow_color`, not a wrong first-match name.

Named omits (map, not Must-fix):

1. `see_monsters` / `Sting_effects` `warn_obj_cnt`
2. `set_artifact_intrinsic` SPFX_WARN → `EWarn_of_mon`
3. `hcolor` inside `glow_color`
4. ARMOR gloves `:1412` lit overwrite
5. Keep doname inline clones in sync with `artifact.js` if either changes

Do not Must-fix “use alias `bright blue`” (C first-match is `light blue`). Do not Must-fix “glow on `(wielded)` stacks” (C skips).

## Callers / RNG ledger

C: `doname_base` → `glow_verb` (no RNG) / `glow_color`→`hcolor` (Hallu rng, omitted) / `arti_light_description` (no RNG). JS: same minus `hcolor`. Public fortress is not that path.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: W_WEP `)` overwrite matches C; production Sting glow still needs `warn_obj_cnt` + SPFX_WARN (named).
- Must-fix stays empty for this SHA.
