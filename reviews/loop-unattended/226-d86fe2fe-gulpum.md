# Review 226 — d86fe2fe — uhitm.c AT_ENGL gulpum (D-1264)

## Metadata
- Full / short hash: `d86fe2fe0efa29684d591c0d624f370753d88560` / `d86fe2fe`
- Parent: `6a950d81` (D-1263). This file audits **this SHA only**. Archive row **Addressed:** D-1264 `d86fe2fe` already has the short hash.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-08-20 09:02:25 +0200
- D-id: **D-1264**
- Stats: 12 files, +489 / −67 — `js/uhitm.js` +410 / −40; `js/eat.js` +14 (export `eating_conducts` / `Finish_digestion` / `newuhs` already present).
- Claims to close: Open `uhitm.c` AT_ENGL `gulpum` (named from D-1251 / reviews **213**/**214**). Not fight_empty. `reviews/loop-2026-08-15/` has no unpaid gulpum Must-fix.
- JS / map: `uhitm.js` `gulpum` / `start_engulf` / `hmonas` AT_ENGL; `eat.js` exports; `c-js-map/data.md`. fight_empty `explum` / altwep still named at this SHA (later SHAs in this batch).
- Prior reviews this SHA claims to close: **213** named omit AT_ENGL `gulpum` (still `continue`).

## Intent vs deliverable

Git subject promises: “Match C uhitm.c gulpum so a poly'd hero AT_ENGL swallows or engulfs the defender, instead of continue-skipping the attack with AT_NONE.”

C `gulpum` (`uhitm.c:4958–5194`): `d(damn,damd)` then `engulf_target(&youmonst,mdef)` then stuffed-digest/`uswallow` gate; `!flaming` `snuff_lit` minvent; vampshifter `newcham`; petrify / Rider `done`; AD_DGST `xkilled` NOCORPSE + nutrition/`nomul`/`afternmv`; PHYS/ACID/BLND/ELEC/COLD/FIRE/DREN; expel. `start_engulf` `:4931–4946` / `end_engulf` `:4949–4955`. `hmonas` AT_ENGL `:5769–5794`: `rnd(20+i)`, shade surround, `failed_grab`, zombie/mummy `Sick`.

Old JS: AT_ENGL in the AT_NONE `continue` set.

The diff **does** the body + `hmonas` arm. It does **not** wire fight_empty or altwep. Named: visor `can_blnd`; gulpmu invent snuff; golem MSLOW.

## Inventory

| Symbol | Kind | Notes |
|--------|------|--------|
| `gulpum` | C `:4958–5194`, **new** | |
| `start_engulf` / `end_engulf` | C `:4931–4955`, **new** | |
| `hmonas` AT_ENGL | C `:5769–5794`, **wired** | not `continue` |
| `d()` / `rnd(20+i)` | C, **imported** | |
| `engulf_target_you` | C `mhitm.c:807–845`, **local clone** | you-as-magr |
| `snuff_lit` | C `apply.c`, **imported live** | |
| `newcham` / `xkilled` / `killed` / `done` | C, **imported live** | |
| `eating_conducts` / `Finish_digestion` | C `eat.c`, **imported live** | |
| `newuhs` | C `eat.c`, **imported partial** | uhs from hunger; messages named |
| `mlifesaver_you` / `m_useup_you` | C `mon.c`/`mthrowu.c`, **local clones** | bits match; `obfree` polish |
| `engl_ad` | C `digests`/`enfolds`, **local clone** | AT_ENGL+AD_DGST/WRAP |
| `resists_elem_mon` | C `Resists_Elem` bits, **clone** | worn/arti named port-wide |
| `golemeffects_you` | C `mon.c:5680`, **clone** | heal yes; MSLOW named |
| `xdrainenergym` | C `mhitm.c`, **local clone** | |
| `failed_grab_you` | C `mhitm.c:597`, **local clone** | `some_mon_nam` named |
| `mon_glyph` / `tmp_at` | C `display.c`, **imported live** | Hallu `rn2_on_display_rng` |
| fight_empty / altwep | **named omit** this SHA | |

No `FORCE` / `DIAG` / `getRngLog(` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` writes / seed names / recorded coordinates. Rule #2 clean. **New RNG:** `d` always; AT_ENGL `rnd(20+i)`; maybe `rn2(5)`+`rnd(8)` Sick; ELEC/COLD/FIRE `rn2(2)`; DREN `rn2(4)`; `corpse_chance`; Hallu glyph in `start_engulf`.

## C ↔ JS fidelity

Pinned C AT_ENGL (`uhitm.c:5769–5794`): `find_roll_to_hit` then `dhit = (tmp > rnd(20+i))`; hit → `wakeup`; shade harmless; `failed_grab` empty arm; else `gulpum` then zombie/mummy `rn2(5)` Sick + `mdamageu(rnd(8))`; miss → `missum(..., FALSE)`.

JS: same `rnd(20+i)` (not `rnd(20)`), shade before grab, `!(await failed_grab_you)` then `gulpum`, Sick bits. `missum(..., false)`. Match the claimed slot.

`gulpum`: `d()` **before** `engulf_target` (C same — huge miss still burns dice). Stuffed `u_digest && uhunger>=1500` or `uswallow` → MISS after the roll. `snuff_lit` walks `minvent`. Vampshifter `newcham(..., 0)` (`NO_NC_FLAGS` is `0U`). Petrify `fatal_gulp && !is_rider` → `instapetrify` then MISS. Rider AD_DGST: `done(DIED)` then MISS if lifesaved.

AD_DGST: Slow_digestion → `dam=0` break then expel; else ALS `m_useup`, `newuhs(false)`, `mswallower=youmonst`, `xkilled(GIVEMSG|NOCORPSE)`; live → regurgitate; dead → `cwt>>8` + `corpse_chance` nutrition / `nomul` / `afternmv=Finish_digestion`; green slime `make_slimed(5)` + **overwrite `nomovemsg`** (C static `msgbuf` alias; JS copies that). Always `return DEF_DIED` even if lifesaved — C same.

PHYS fog moisture / enfold squash / debris; ACID goo + bits resist; BLND `can_blnd` then `dam=0`; ELEC/COLD/FIRE `if (rn2(2))` effects else `dam=0` (JS `if (!rn2(2)) { dam=0; break; }` is the same polarity); DREN `!rn2(4)`. Then `end_engulf`, `mhp-=dam`, `killed`, expel, optional “didn’t like taste.” Match branch order.

`engulf_target_you` vs C you-as-magr: size/whirly, both `mtrapped`, defender cell `passes_walls(mdef)` + bars vs magr whirly, hero cell `Passes_walls` + bars vs mdef whirly. Match `:815–842` for this caller.

`start_engulf`: C `!Invisible` then `mon_to_glyph(..., rn2_on_display_rng)`. JS `Invisible_you` (`Invis && !See_invisible`) + live `mon_glyph` (Hallu display RNG). Not a skipped glyph roll.

This is **not** “Match C dispatch, callee is a stub”: `xkilled` kills; `snuff_lit` snuffs; `newcham` changes form; `engulf_target` can MISS huge.

## Hallucinations / overclaim

Subject + D-1264 say AT_ENGL swallows instead of AT_NONE-skip. **`gulpum` + live `xkilled`/`snuff_lit`/`newcham` + `rnd(20+i)` are the hunk.** Stamping **Addressed:** D-1264 is fair. Do **not** stamp “Match C fight_empty `explum(null)`” or “Match C `Resists_Elem` worn/arti” or “Match C golem MSLOW.” `newuhs` updates `uhs` from hunger; faint/messages stay named in `eat.js`. Helper comment “C resists_* = bits” is the port-wide `mon_resistancebits` subset (`dogmove.js` already names `Resists_Elem` unported), not a fake digest.

## Density

One C function plus `start_engulf`/`end_engulf` and the `hmonas` case C ties to it. ~350 JS lines of body + small clones. Upper end of §2b (one function, not half of `mon.c`). Did not glue fight_empty or altwep.

## Branch-by-branch confirm

1. Fog cloud AT_ENGL AD_PHYS, small foe, hit: `d`, target ok, start_engulf, moisture, expel. Match.
2. Huge / non-whirly smaller magr: `d` then MISS. Match.
3. Stuffed digest `uhunger>=1500`: MISS after `d`. Match.
4. Purple worm AD_DGST, corpse ok: `xkilled` NOCORPSE, nutrition, `nomul`, `Finish_digestion`. Match.
5. AD_DGST lifesave: regurgitate, still DEF_DIED. Match C.
6. Cockatrice digest, no Stone_res: `instapetrify`, no start_engulf. Match.
7. Shade: surround harmless, no `gulpum`. Match.
8. `rnd(20+i)` miss: `missum` FALSE. Match.
9. Zombie DEF_DIED, `rn2(5)`: Sick + `rnd(8)`. Match.
10. ELEC `rn2(2)==0`: `dam=0`, still expel. Match.

## Anti-pattern / Rule #2 (this SHA `js/`)

No FORCE / fs / seed-named gates. `(20+i)` is C’s slot index, not a trace. Plain ESM.

## Verification

Journal: private canary **16**/16 (C order; JS `d`-then-gate; huge MISS; stuffed; uswallow; fog PHYS; shade); green+strict seed8000/0900; cohort **7**/7 + strict 1500/1800/0012/0004/0007/2200/0383. **Public-unhit** unless a poly'd hero uses AT_ENGL. Cadence this audit: full `sessions` at HEAD `42d50a53` **44**/44. Canary is not a public engulf.

## Actionable C-wrongs

None for Must-fix. Dispatch through live `xkilled` / `snuff_lit` / `newcham`. Bits-only `resists_*` and golem MSLOW are the same named clone debt as the rest of combat, not a `continue` that skips swallow.

Named omits (map, not Must-fix):

1. fight_empty `explum(null)`; altwep (later SHAs this batch)
2. `Resists_Elem` worn/arti; golem MSLOW (`mon_adjust_speed`)
3. visor `can_blnd`; gulpmu invent snuff; `newuhs` messages/faint; `m_useup` `obfree`

Do not Must-fix “JS `Invisible_you` also reads sticky `u.Invis`.” Do not Must-fix “AD_DGST returns DEF_DIED after lifesave” — C does.

## Callers / RNG ledger

C: only `hmonas` AT_ENGL. JS same. RNG: `d` + `rnd(20+i)` + maybe Sick / elem `rn2(2)` / DREN `rn2(4)` / `corpse_chance` / Hallu glyph. Public fortress is not evidence a worm swallowed.

## Verdict

- Verdict: **ACCEPT-WITH-DEBT**
- One sentence: poly AT_ENGL now rolls `rnd(20+i)` and runs live `gulpum` (swallow/digest/expel) instead of `continue`; fight_empty and altwep stay named at this SHA.
- Must-fix stays empty for this SHA; archive already has **Addressed:** D-1264 `d86fe2fe`.
