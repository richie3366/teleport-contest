# Review 375 — 081c5c6a — uhitm.c mhitm_ad_phys artifact_hit leftover (D-1415)

## Metadata
- Full / short hash: `081c5c6a69e3b4d4c00b772c139cd055d32e0d70` / `081c5c6a`
- Parent: `f968904d` (D-1414). This file audits **this SHA only** (second of nine `js/` commits since review **373**). Archive **Addressed:** D-1415 `081c5c6a` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-22 18:25:55 +0200
- D-id: **D-1415**
- Stats: 9 files, +140 / −47 — `js/mhitm.js` +63 / −19 (`mhitm_ad_phys` artifact arm + `hitmm` skip + `mdamagem` dieroll).
- Claims to close: Open `uhitm.c` `mhitm_ad_phys` artifact_hit leftover (named from D-1403 / reviews **363** / **373**). Not rustm. `reviews/loop-2026-08-15/` has no unpaid artifact leftover Must-fix.
- JS / map: `mhitm.js` `mhitm_ad_phys` / `hitmm` / `mdamagem`. Callee `artifact.js` `artifact_hit` (D-0613). `c-js-map/turns.md`. rustm / `mhitm_really_poison` / purple-worm cap / youmonst still named.
- Prior reviews this SHA claims to close: **363** named artifact_hit after kick-thick.

## Intent vs deliverable

Git subject promises: “Match C uhitm.c mhitm_ad_phys artifact_hit leftover so a monster artifact weapon applies spec_dbon and delayed hits, instead of leftover dmgval only.”

C `uhitm.c` `mhitm_ad_phys` mhitm arm `:4158–4180` after D-1402 `dmgval` / GOP / min-1:

```
            if (mwep->oartifact) {
                if (!artifact_hit(magr, mdef, mwep, &mhm->damage,
                                  mhm->dieroll)) {
                    if (gv.vis)
                        pline_mon(magr, "%s hits %s.", Monnam(magr),
                              mon_nam_too(mdef, magr));
                    mhm->hitflags |= M_ATTK_HIT;
                }
                if (DEADMONSTER(mdef)) {
                    mhm->hitflags = (M_ATTK_DEF_DIED
                                     | (grow_up(magr, mdef) ? 0
                                        : M_ATTK_AGR_DIED));
                    mhm->done = TRUE;
                    return;
                }
            }
            if (mhm->damage)
                rustm(mdef, mwep);
```

Caller `mhitm.c` `hitmm` `:698–701`: default `"%s hits"` skipped when `weaponhit && mwep && oartifact`. `mdamagem` `:1059` `mhitm_adtyping` AD_PHYS. Callee `artifact.c` `artifact_hit` `:1447–1720` (D-0613): always `*dmgptr += spec_dbon`; elemental/Magicbane/behead/drain follow.

Old JS: mwep `dmgval` live; artifact still leftover-only; `hitmm` always printed `"hits"`. `dieroll` was `void` in `mdamagem`.

The diff **does** call live `artifact_hit` with a `{ dmg }` box and `mhm.dieroll`, delay `pline_mon` `"hits"` when the callee returns false and `_mm_vis`, `DEADMONSTER` → `grow_up` + `done`, and skip `hitmm` default hits for artifact wep. It **does not** port rustm / poison / purple-worm cap. Named. It **does not** finish D-0613 `destroy_items` / `Mb_hit` / `SPFX_BEHEAD` / `SPFX_DRLI` / realizes_damage brand plines. Named on the callee, not this SHA’s envelope.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `mhitm_ad_phys` oartifact arm | C `:4158–4180`, **wired** | after min-1, before rustm |
| `artifact_hit` | C `artifact.c:1447`, **C callee live, partial D-0613** | `spec_dbon` live; brand bodies deferred |
| `spec_dbon` | C, **imported live** | via callee first line |
| delayed `pline_mon` hits | C `:4166–4169`, **wired** | `_mm_vis` ≡ `gv.vis` for m-vs-m |
| `M_ATTK_HIT` | C `hitflags`, **wired** | only if callee false |
| `DEADMONSTER` / `grow_up` | C `:4174–4179`, **wired** | done before rustm |
| `hitmm` skip default hits | C `:698–701`, **wired** | `verb==='hits' && weaponhit && oartifact` |
| `mdamagem` dieroll | C `mhm->dieroll`, **wired** | was discarded |
| `dmgval` / GOP `rn1(4,3)` | C `:4152–4157`, **unchanged live** | D-1402 |
| `rustm` | C `:4182–4183`, **named omit** | after artifact, if damage |
| `mhitm_really_poison` | C `:4184–4189`, **named omit** | `!rn2(4)` |
| purple worm vs shrieker | C `:4191+`, **named omit** | |
| `destroy_items` / `Mb_hit` / behead / drain | C callee, **named omit D-0613** | elemental still `rn2`s |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** `artifact_hit` elemental `rn2(4)`/`rn2(5)` (already in D-0613; this SHA newly **calls** it from m-vs-m PHYS). `spec_dbon` may `rn2`. rustm/poison still uncalled.

## C ↔ JS fidelity

Order matches `:4152–4180`: corpse stone → `dmgval` → GOP `rn1` → min 1 → `if (oartifact)` `artifact_hit(&damage, dieroll)` → delayed hits iff false → `DEADMONSTER` `grow_up` return. Bite/kick never enter: `mwep` already nulled unless AT_WEAP/AT_CLAW (`:4133–4134`). Match. `hitmm` skip is only the default `"hits"` verb, not bite/sting/butt/touch. C `default:` skips Snprintf when artifact wep; bite is its own case. Match.

`artifact_hit` is **not** a dispatch stub: `spec_dbon` adds to the box; Fire Brand / Frost Brand / Mjollnir `attacks(AD_*)` return true (suppress delayed `"hits"`) and still burn C’s `rn2(4)`/`rn2(5)` even though `destroy_items`/`ignite_items`/`wake_nearto` bodies are empty. Grayswandir double vs silver-haters is `spec_dbon` (live). Orcrist vs orc/gnome is `spec_dbon`. That is the leftover this SHA promised.

C elemental returns `realizes_damage` (vis / youdefend / stuck). JS elemental always `return true`. Unseen m-vs-m: C false then delayed hits gated on `gv.vis` (also false) — **no extra pline**. Seen: C true suppresses delayed hits and prints `"The fiery blade…"`. JS true suppresses delayed hits and **omits** the brand pline. Named D-0613, not a leftover-dmg lie. Magicbane `dieroll<=8`: JS `return false` (Mb_hit deferred) → delayed `"hits"`; C `Mb_hit` usually returns true and suppresses it. Named callee omit; this SHA’s `if (!artifact_hit)` is C-shaped given the return.

`DEADMONSTER` after the callee: C comment is carried-item destruction, which JS does not yet inflict. The `if (deadmonster)` arm is still the right C shape if a later D-0613 peel actually kills. Harmless no-op today.

Hallucination check: “Match C leftover `artifact_hit` / `spec_dbon` / delayed hits” while **`artifact_hit` is the live D-0613 export that adds `spec_dbon`** is not a dispatch-stub lie. “Match C Fire Brand `destroy_items` / Magicbane `Mb_hit` / Stormbringer drain” **would** be a lie. The D-log names those. Do **not** stamp “Match C `rustm`.” Do **not** stamp “Match C `mhitm_really_poison`.”

## Hallucinations / overclaim

Subject says a monster artifact weapon applies `spec_dbon` and delayed hits instead of leftover `dmgval` only. **True for Grayswandir/Orcrist double (spec_dbon) and for a silent artifact (`artifact_hit` false → delayed `"hits"` + `M_ATTK_HIT`).** **True that Fire Brand skips the delayed `"hits"`** (callee returns true). **False until named for brand destroy/ignite plines, Mb_hit, behead, drain, rustm, poison.** Stamping **Addressed:** D-1415 for `:4158–4180` + `hitmm` skip is fair. It is **not** fair for “Match C `artifact.c` brand bodies.” Do **not** treat fortress PASS as mon-vs-mon artifact combat.

## Density

One C leftover arm plus the `hitmm` skip the C comment says must move with it, plus threading `dieroll` the callee already required. ~50 lines of JS. Playbook §2b caller/callee cluster. Did not glue rustm/poison (next named). Right size. Did not rewrite `spec_dbon`.

## Branch-by-branch confirm

1. Non-artifact mwep: `dmgval` only; `hitmm` still `"hits"`. Match D-1402.
2. Artifact, `artifact_hit` false (no AD_FIRE/COLD/ELEC/MAGM): skip `hitmm` hits; delayed `pline_mon` iff `_mm_vis`; `M_ATTK_HIT`; HP uses boxed dmg (includes `spec_dbon`). Match `:4158–4170`.
3. Fire Brand: `spec_dbon`; `rn2(4)` burned; no delayed hits; brand pline / `destroy_items` named D-0613. Keep-path leftover **not** “dmgval only.”
4. AT_BITE while holding an artifact: `mwep` nulled; no `artifact_hit`; bite verb still prints. Match `:4133–4134`.
5. Shade miss / AT_KICK thick: unchanged D-1394 / D-1403. Match.
6. `DEADMONSTER` after callee: `grow_up` + done; skip rustm. Shape match; kill needs D-0613 items.
7. rustm / poison / purple worm. Named.
8. **Public-unhit** unless a session has mon-vs-mon artifact wep through `mdamagem`.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. No recorded overlay. Plain ESM. `_mm_vis` for delayed hits is C `gv.vis`, not a trace index. `dmgBox` is the C `int *dmgptr` idiom, not ALIGN.

## Verification

Journal: private canary **16**/16 (C/JS grep; club dmgval-only; Grayswandir double; Orcrist gnome none / orc double; Fire Brand double + skip delayed; bite nulls mwep; shade; club hits pline; Grayswandir delayed hits; Rule #2). green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit.** I did not re-run the private canary. This audit cadence: full `sessions` at HEAD (score rewrite at end of this review iter). Fortress PASS is not a monster swinging Grayswandir at another monster.

## Actionable C-wrongs

None for Must-fix on **this** SHA. The leftover arm matches `:4158–4180` given live `spec_dbon`; brand/Mb/behead/drain remain D-0613 named omits, not this dispatch.

Named omits (map / Open, not Must-fix):

1. `uhitm.c` `rustm` after artifact (`:4182–4183`)
2. `mhitm_really_poison` `!rn2(4)` (`:4184–4189`)
3. purple worm vs shrieker cap (`:4191+`)
4. D-0613 `destroy_items` / `ignite_items` / `wake_nearto` / realizes_damage brand plines / `Mb_hit` / `SPFX_BEHEAD` / `SPFX_DRLI`
5. youmonst `damageum_ad_phys` / mhitu `mhitm_ad_phys_u` (other arms)

Do not Must-fix “Fire Brand should still print delayed hits” (C suppresses when `artifact_hit` true). Do not Must-fix “bite should artifact_hit the wielded wep” (C nulls mwep). Do not Must-fix “dispatch is a stub” (`spec_dbon` is live).

## Callers / RNG ledger

C callers: `mhitm.c` `hitmm` → `mdamagem` → `mhitm_adtyping` AD_PHYS. `dieroll` is the already-rolled to-hit d20 (`mhm->dieroll`). New RNG only inside `artifact_hit` (`spec_dbon` / elemental `rn2`). Public fortress does not need mon-vs-mon artifact wep.

Verdict: **ACCEPT-WITH-DEBT**
