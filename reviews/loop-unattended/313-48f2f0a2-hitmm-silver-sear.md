# Review 313 — 48f2f0a2 — mhitm.c hitmm silver sear (D-1351)

## Metadata
- Full / short hash: `48f2f0a2de600ea39e083fc1cd865e4f842f5833` / `48f2f0a2`
- Parent: `35dfdd85` (review **312** + cadence **#1715**). This file audits **this SHA only**. Archive **Addressed:** D-1351 `48f2f0a2` already has the short hash (filled by D-1352).
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-21 09:46:18 +0200
- D-id: **D-1351**
- Stats: 10 files, +137 / −51 — `js/mhitm.js` +83 / −41 (imports + `weaponhit`/`silverhit` + sear after the vis hit pline).
- Claims to close: Open `mhitm.c` hitmm silver sear (named from D-0887 / reviews **303** / **312**). Not shade_miss. `reviews/loop-2026-08-15/` has no unpaid sear Must-fix.
- JS / map: `mhitm.js` `hitmm`; callees `mon_hates_silver` (D-1254), `simpleonames`, `noncorporeal`, `amorphous`; `c-js-map/turns.md` + `debt.md`. Artifact wep skip of default `"hits"` still named. `dmgval` shade was still named here (D-1354 is a later SHA).
- Prior reviews this SHA claims to close: **312** ordered silver sear as the next Open after martial knockback; **303** / D-1341 named it after `shade_miss`.

## Intent vs deliverable

Git subject promises: “Match C mhitm.c hitmm so a monster's silver weapon actually sears a silver-hating defender, instead of skipping the sear pline.”

C `hitmm` (`mhitm.c:644–731`); flags at entry (`:652–655`) then sear after the vis `!compat` hit pline (`:706–726`):

```
    boolean weaponhit = (mattk->aatyp == AT_WEAP
                         || (mattk->aatyp == AT_CLAW && mwep)),
            silverhit = (weaponhit && mwep
                         && objects[mwep->otyp].oc_material == SILVER);
    …
            if (mon_hates_silver(mdef) && silverhit) {
                … s_suffix(magr_name); flesh unless noncorporeal/amorph;
                pline("%s %s sears %s!", magr_name, simpleonames(mwep), mdef_name);
            }
```

`compat` seduce skips the whole `else` (no sear). Default `"hits"` is omitted when `weaponhit && mwep->oartifact` (`:698–701`) — **named**, not this SHA.

Old JS: vis smile/tent/hugs/verb then `mdamagem`. No `weaponhit`. No sear.

The diff **does** compute `weaponhit`/`silverhit` at the C site, reuse one `Monnam` buffer, keep tent/hugs/verb, then sear with `simpleonames` and the himself→his own `strsubst`. It does **not** skip `"hits"` for an artifact wep. Named. No other `js/` files.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `hitmm` `weaponhit`/`silverhit` | C `:652–655`, **wired** | AT_WEAP or AT_CLAW+mwep; `oc_material==SILVER` (14) |
| sear `if` after vis hit | C `:706–726`, **wired** | `!compat` only; after `if (*buf)` pline |
| `mon_hates_silver` | C `mondata.c:517–519`, **imported live** | D-1254; vampshifter or `hates_silver(data)` |
| `simpleonames` | C `objnam.c`, **imported live** | not a local clone (pickup/wield clones are other files) |
| `noncorporeal` | C `mondata.h`, **imported live** | `mlet === 'S_GHOST'` |
| `amorphous` | C `mondata.h`, **imported live** | |
| `s_suffix_mm` | C `hacklib.c` `s_suffix`, **pre-existing clone** | `it`→`its`, `you`→`your`, else `'s` |
| self `strsubst` | C `:717–719`, **wired** | first occurrence only (`String.replace`) |
| artifact wep `"hits"` skip | C `:698–701`, **named omit** | buf stays empty so no first pline; sear still runs in C |
| `shade_miss` | C `:660–661`, **pre-existing live** | D-1341; still before vis pline |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New gameplay RNG:** none. Sear is display-only; `mdamagem` `d()` unchanged after it.

## C ↔ JS fidelity

Short-circuit of the sear matches `:706` left-to-right: vis already true in this block → `!compat` (outer `else`) → `mon_hates_silver(mdef)` → `silverhit`. `silverhit` requires `weaponhit && mwep && oc_material==SILVER`. A bite never sears even if the attacker wields silver. An iron long-sword never sears. Match `:652–655`.

AT_HUGS when `magr === u.ustuck`: C `FALLTHROUGH` into default `"hits"`. JS hugs arm is `&& magr !== ustuck`, so the same hit falls to the verb/`hits` else. Match `:691–698`. Tentacles suffix `magr_name` only in the pline; the buffer itself stays unsuffixed until sear, same as C `s_suffix` in `buf` not in `magr_name`.

Flesh: `!noncorporeal && !amorphous` then other-def `s_suffix(mdef_name)` else self `strsubst` himself/herself/itself → his/her/its own, then `" flesh"`. Shade is `S_GHOST` so skips flesh. Match `:713–722`. `simpleonames(mwep)` is the real function (type appearance, no quan/BUC). Not a stub.

Hallucination check: “Match C `hitmm`” while **artifact wep still prints `"hits"`** is an overclaim on `:698–701`. The **sear `if`** matches `:706–726`. Callees are live, not stubs. Do **not** stamp “Match C artifact wep `hits` skip.” Do **not** stamp “Match C `dmgval` shade” (still named on this SHA).

## Hallucinations / overclaim

Subject says a silver weapon sears a silver-hating defender instead of skipping the pline. **True for vis `!compat` silver `weaponhit` when `mon_hates_silver`.** False for an artifact wep’s missing `"hits"` skip until that `if`. False for `!vis` (C `noises` only — JS same). D-1351 **Not this iter** names the artifact buf. Stamping **Addressed:** D-1351 for the sear is fair. Do **not** treat fortress PASS as a `"sears … flesh!"` line.

## Density

One C `if` plus already-live callees, plus the two booleans C computes at function entry. ~50 lines of JS in the body. Playbook §2b right size: review **312** ordered this Open, not another `kickdmg` peel. Did not glue AD_STON leftover. Acceptable.

## Branch-by-branch confirm

1. `compat` seduce: smile/talk, no sear. Match `:667–671`.
2. `!vis`: `noises`, no sear. Match `:728–729`.
3. Iron wep / AT_BITE: `silverhit` false, no sear. Match `:654–655`.
4. Silver AT_WEAP vs vampire, vis: Magr’s silver saber sears defender’s flesh. Match `:706–725`.
5. Same vs shade (`S_GHOST`): sear, no `" flesh"`. Match `:713`.
6. Self (`mdef==magr`): himself→his own flesh. Match `:716–721`.
7. AT_HUGS holding the hero: falls to `"hits"`, then maybe sear. Match FALLTHROUGH.
8. Artifact wep: JS still `"hits"` then sear. C skips `"hits"`, still sears. Named.
9. `shade_miss` true: return before vis/sear. Match `:660–661`.
10. **Public-unhit** unless a session has vis mon-vs-mon silver.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `SILVER=14` is `objclass.h`, not a recorded coordinate. Plain ESM.

## Verification

Journal: private canary **16**/16; green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** on vis silver sear. This audit cadence: full `sessions` at HEAD `6570ddba` **44**/44 Scr **11,405**/11,405 RNG **792,838**/792,838 (100%) speed `37+0.31/turn` (R² 0.85). I did not re-run the private canary. Fortress PASS is not a silver sear pline.

## Actionable C-wrongs

None for Must-fix. The sear `if` matches C `:706–726` call-for-call (`weaponhit`/`silverhit` at `:652–655`; vis `!compat`; flesh unless ghost/amorph; first-occurrence `strsubst`). `simpleonames` / `mon_hates_silver` are C callees, not diverging clones. Artifact `"hits"` skip is a named omit of a **different** `if` in the same `switch`, not a sear that prints the wrong noun.

Named omits (map / later SHAs, not Must-fix):

1. Artifact wep skips default `"hits"` buf (`:698–701`)
2. `dmgval` shade/`shade_glare` (this SHA still named; D-1354 later)
3. mthrowu / zap `bhit` / hmon `shade_miss` callers
4. mdamagem AD_STON leftover (this SHA still named; D-1352 later)

Do not Must-fix “sear on AT_BITE if mwep is silver” (C `weaponhit` forbids it). Do not Must-fix “print flesh on shades” (C `noncorporeal`). Do not Must-fix “sear when `compat`” (C `else` of seduce).

## Callers / RNG ledger

C: `hitmm` vis pline (no RNG) → sear (no RNG) → `mdamagem` `d(damn,damd)`. JS: same. Public fortress is not that path unless a session shows vis mon-vs-mon silver.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: vis silver `weaponhit` now sears in C order; artifact wep still prints `"hits"`.
- Must-fix stays empty for this SHA.
