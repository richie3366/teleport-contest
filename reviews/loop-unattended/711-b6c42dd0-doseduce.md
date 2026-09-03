# Review 711 — b6c42dd0 — mhitu.c doseduce / mayberem / ld AD_SSEX (D-1750)

## Metadata
- Full / short hash: `b6c42dd0edea141cebd5c5d690f0664d82846155` / `b6c42dd0`
- Parent: `d17e4f35` (D-1749). This file audits **this SHA only** (second of nine `js/` commits since review **709**). Archive **Addressed:** D-1750 `b6c42dd0`.
- Author, date: Raphaël Hervier (Co-authored-by Cursor), 2026-09-03 01:42:00 +0200
- D-id: **D-1750**
- Stats: `js/mhitu.js` +432/−17; invent +24; steal +21; sounds +11; mhitm +5; calendar/do_wear/zap/generated ±1. Total `js/` insertions **497** >250. Band **150–450**.
- Claims to close: Open `doseduce` after D-1742 / D-1749 / review **703** (`getyear` live; `ld()`/`doseduce` named). Not uhitm hero-as-seducer. Not mhitm mon-mon AD_SSEX. `reviews/loop-2026-08-15/` has no unpaid doseduce Must-fix.
- JS / map: `mhitu.js` `doseduce`/`mayberem`/`ld`; `sounds.js` MS_SEDUCE; `steal.js` `unresponsive`; `invent.js` `u_carried_gloves`; extractor YES. `c-js-map/turns.md`.
- Prior: **703** named `ld()`/`doseduce` as the sole `getyear` caller.

## Intent vs deliverable

Git subject promises: SYSOPT succubus/incubus seduction (`mayberem`, `ld` leap-day, AD_SSEX) and extracted `SEDUCTION_ATTACKS_YES` mattk run instead of dropping SSEX to damage 0 with empty amorous-demon attacks after D-1749.

`node scripts/csym.mjs doseduce` → `mhitu.c:1984–2305`. `--callers doseduce`: `sounds.c:1112`; `uhitm.c:4763` (`mhitm_ad_ssex` mhitu arm). `mayberem` `:2308–2352` (callers `:2027`/`:2058`/`:2119–2128`). `ld()` `mhitu.c:25`. `unresponsive` `steal.c:131–142` (callers `:1999`; `steal.c:517` monkey_business). `u_carried_gloves` `invent.c:1556–1571`. `mhitm_ad_ssex` `uhitm.c:4750–4779`. `could_seduce` `mhitu.c:1933–1981`. `SYSOPT_SEDUCE` `sys.h:65`. `Mgender` `monst.h:268`. `Deaf` `youprop.h:125`. `SetVoice` `sndprocs.h:276` empty without SND_LIB. `SEDUCTION_ATTACKS_YES` `monsters.h:2922–2924`. `money_cnt` `hack.c:4513–4522`. `cloak_simple_name` `objnam.c:5491–5509`. `stop_donning` `do_wear.c:1687–1727`.

```1984:2003:nethack-c/upstream/src/mhitu.c
int
doseduce(struct monst *mon)
{
    boolean fem = (mon->data == &mons[PM_AMOROUS_DEMON]
                   && Mgender(mon) == FEMALE); /* otherwise incubus */
    ...
    if (mon->mcan || mon->mspec_used) {
        pline_mon(mon, "%s acts as though %s has got a %sheadache.",
                  Monnam(mon), mhe(mon), mon->mcan ? "severe " : "");
        return 0;
    }
    if (unresponsive()) {
        pline_mon(mon, "%s seems dismayed at your lack of response.",
                  Monnam(mon));
        return 0;
    }
```

```2322:2351:nethack-c/upstream/src/mhitu.c
    if (Deaf) {
        pline("%s takes off your %s.", seducer, str);
    } else if (rn2(20) < ACURR(A_CHA)) {
        SetVoice(mon, 0, 80, 0);
        ...
        if (y_n(qbuf) == 'n')
            return;
    } else {
        ...
        verbalize("Take off your %s; %s.", str, ...);
    }
    remove_worn_item(obj, TRUE);
```

Parent: no `doseduce`; `mhitm_adtyping_u` AD_SSEX → damage 0; MS_SEDUCE sailor/cajoles only; `SYSOPT_SEDUCE` unset treated off; extractor left YES as empty `mattk[]`. The diff **does** ship `doseduce`/`mayberem`/`ld`, mhitu `mhitm_ad_ssex`, MS_SEDUCE non-nymph `doseduce` then `ECMD_TIME`, SYSOPT null→on, extractor YES (bite AD_SSEX + 2×claw 1d3), `unresponsive`, `u_carried_gloves`, export `suit_simple_name`/`resists_drli`. It **does not** port uhitm hero-as-seducer or mhitm mon-mon AD_SSEX. Named. It **does not** substitute `c_sa_no` in `get_mattk`. Named. It **does not** wire `steal.c:517` `unresponsive`. Named. It **does not** emit `SetVoice` calls (contest empty macro — Match the compiled C; D-1752 adds the no-op source calls). It **does** add `hero_Deaf()` as `u.Deaf || u.HDeaf` only.

## Inventory

| Symbol | Class | Notes |
|---|---|---|
| `doseduce` `:1984–2305` | LIVE new | body ports C; Deaf clone wrong |
| `mayberem` `:2308–2352` | LIVE new (local) | only doseduce; same Deaf clone |
| `ld()` `:25` | LIVE new | `yyyymmdd(0)-getyear()*10000==0xe5` |
| `mhitm_ad_ssex` mhitu arm `:4759–4768` | LIVE new | SYSOPT → doseduce; else `mhitm_ad_sedu` |
| `mhitm_ad_ssex` uhitm / mhitm arms | OMIT named | |
| MS_SEDUCE `:1106–1128` | LIVE repaired | non-nymph `could_seduce==1` → doseduce → ECMD_TIME |
| `unresponsive` | LIVE new | steal.js; monkey_business site named |
| `u_carried_gloves` | LIVE new | invent.js; `oc_skill` ≡ `oc_armcat` |
| `SYSOPT_SEDUCE` | LIVE repaired | null/unset → true (sys.c default 1) |
| `could_seduce` | LIVE (export list) | mhitm.js; already existed |
| `SEDUCTION_ATTACKS_YES` | LIVE extractor | matches `monsters.h:2922–2924` |
| `suit_simple_name` | LIVE import | this SHA **exported** do_wear |
| `stop_donning` / `Ring_on` / `Ring_gone` / `remove_worn_item` | LIVE import | |
| `resists_drli` | LIVE import | this SHA **exported** zap |
| `SetVoice` | OMIT named (contest empty) | no JS call at this SHA; C `#define` empty |
| `hero_Deaf` | CLONE diverges | drops `EDeaf` + `uroleplay.deaf` |
| `cloak_simple_name` / `helm_simple_name` | CLONE verified | objnam not exported; mhitu matches C |
| `money_cnt_invent` | CLONE #7 | sums; C returns first gold `quan` |
| `c_sa_no` / SEDUCE=0 `get_mattk` | OMIT named | |
| steal `unresponsive` `:517` | OMIT named | |

`node scripts/sym.mjs`:

```
doseduce         js/mhitu.js:982   ASYNC
mayberem         NOT EXPORTED — 1 LOCAL  js/mhitu.js:948  => Do NOT write #2
ld               js/mhitu.js:914   sync
unresponsive     js/steal.js:62   sync
u_carried_gloves js/invent.js:2579   sync
SYSOPT_SEDUCE    js/mhitm.js:1059   sync
could_seduce     mhitm.js export { could_seduce } (line 560) + function :1079
SetVoice         js/sndprocs.js:47   sync   — NOT in this SHA (D-1752)
hero_Deaf        NOT EXPORTED — 3 LOCAL  invent.js:4367 (full youprop),
                 mhitu.js:918 (HDeaf||u.Deaf only), monmove.js:813
                 => Do NOT write #4. invent.js clone matches C; this SHA’s does not.
money_cnt        NOT EXPORTED — 6 LOCAL  => Do NOT write #7. This SHA wrote money_cnt_invent.
cloak_simple_name NOT EXPORTED — 3 LOCAL  mhitu.js:877 trap.js:2930 uhitm.js:1024
suit_simple_name js/do_wear.js:936   sync  (this SHA exported; trap.js still clones)
stop_donning     js/do_wear.js:2530   ASYNC
Deaf             NOT EXPORTED — 11 LOCAL  (do.js:394 matches C)
body_part        js/polyself.js:352   sync  (pre-existing mhitu import)
noit_mhim        NOT EXPORTED — 1 LOCAL  js/shk.js:210
```

Re-points this SHA: `suit_simple_name` local→export (do_wear); `resists_drli` local→export (zap); `SYSOPT_SEDUCE` local→export + default-on. New: `unresponsive`, `u_carried_gloves`, `ld`, `doseduce`, `mayberem`. `node scripts/imports.mjs --can mhitu.js steal.js unresponsive` / `invent.js u_carried_gloves` / `do_wear.js suit_simple_name`: **ALREADY**. `--can mhitu.js objnam.js cloak_simple_name`: module already imported; **name not exported** (clone justified). FORCE/DIAG/`getRngLog`/`fastforward`/seed names: **none**. `node scripts/imports.mjs --rulecheck`: **Rule #2 clean**.

## C ↔ JS fidelity

**Headache / unresponsive (`:1994–2003`).** C `mcan || mspec_used` then `unresponsive()`. JS the same, then LIVE `steal.js` `unresponsive`: `multi>=0` → false; else `unconscious` (usleep / nomovemsg `"You awake"` / `"You regain con"` / `"You are consci"`) or `uhs==FAINTED` or `multi_reason` starts with `frozen`/`paralyzed`. C `unconscious` `trap.c:6775–6786` and `is_fainted` `eat.c:3346–3350` are that predicate. **Match.** `:517` monkey_business still unnamed in steal. Named.

**See / Who (`:2004–2010`).** `canseemon` → caress vs attracted; Who = She/He vs `Monnam`. `fem` = `PM_AMOROUS_DEMON && Mgender==FEMALE`. JS `mndx === PM_AMOROUS_DEMON && (female?FEMALE:MALE)===FEMALE`. `Mgender` is `(mon)->female ? FEMALE : MALE`. **Match.**

**`stop_donning(NULL)` + welded gloves (`:2014–2017`).** JS `await stop_donning(null)`; `tried_gloves = welded(uwep) ? 1 : 0`. LIVE import. **Match.**

**Adornment walk (`:2019–2110`).** C `nobj` save then filter `RIN_ADORNMENT`. Succubus: worn+gloves → `mayberem` gloves once; still gloves → `continue`; `!Deaf && rn2(20)<Cha` → qbuf/makeknown/SetVoice/`y_n`; else take pline; makeknown; worn → `remove_worn_item(FALSE)`; `freeinv`; `mpickobj`. Incubus: both slots adornment → `break`; worn adornment → `continue`; gloves `mayberem` then `break` if still gloves; same Cha prompt (wear wording); empty right/left `setworn`; else replace `Ring_gone` + `utotype||!m_next2u` return 1; `Ring_on`; `prinv`. JS `invent_snapshot()` then the same branches. Snapshot ≡ save-`nobj` for a walk that `freeinv`s. SetVoice omitted (contest empty). **Match except Deaf** (below).

**Undress (`:2113–2137`).** naked = !cloak/boots/gloves/shield/helm/shirt. `urgent_pline` murmur (Deaf / naked / helping undress). `mayberem` cloak; if !cloak suit; boots; gloves if `!tried_gloves`; shield; helm; shirt if !cloak && !suit. Then `utotype || !m_next2u` return 1. JS the same order. `suit_simple_name` LIVE import; `cloak_simple_name` / `helm_simple_name` local clones **match** `objnam.c:5491–5528` (robe/wrapping/smock|apron; hat vs `hard_helmet`). **Match the sequence.**

**Armor leftover (`:2139–2164`).** If `uarm||uarmc`: `!Deaf` then `!(ld() && mon->female)` → SetVoice + “sweet lady/nice guy”; else `u_carried_gloves` + `observe_object` + gloves verbalize (**no** SetVoice in C). Deaf+seewho → sigh. Then `!tele_restrict` `rloc`. JS `ld() && mon.female` (C uses `mon->female`, not the `fem` local — incubus never takes the gloves line). LIVE `u_carried_gloves` (worn first, else first gloves). **Match that arm except Deaf.**

**`ld()` (`:25`).** `(yyyymmdd(0) - getyear()*10000) == 0xe5`. JS `=== 0xe5`. `getyear` is D-1742 LIVE. **Match call-for-call.** No extra rng.

**Outcome rng (`:2173–2260`).** `attr_tot = Cha+Int`; `rn2(35) > min(32)` → bad `rn2(5)`: drain `rnd(Half_phys?5:10)` (JS `HHalf||EHalf` ≡ `youprop.h:341`); dumps `adjattrib CON-1`; dull WIS; `!resists_drli(youmonst)` `losexp` else curious; exhaust `rn1(10,6)` `Maybe_Half_Phys` `losehp`. Else `mspec_used=rnd(100)` good `rn2(5)`: uenmax `rnd(5)`; CON+1; WIS+1; `pluslvl(FALSE)`; full HP + Upolyd mh. JS the same including `default: break` (C switch is 0–4 only). **Match rng order.**

**Pay (`:2263–2298`).** tame skip; `rn2(20)<Cha` refuse; leprechaun fail; else `money_cnt(invent)`: C **returns the first** `COIN_CLASS` `quan` (`hack.c:4513–4522`); JS **sums** every coin. Gold usually one pile (merge). `rnd` cost, peaceful `/5`, cap, house verbalize vs take `money2mon`. JS `mon.female?'her':'him'` vs C `noit_mhim` (`you.h:328` `pronoun_gender` + `PRONOUN_NO_IT|PRONOUN_HALLU`). Hallu pronoun miss. Then `!rn2(25)` `mcan=1`; `rloc`. **Match except money_cnt sum and noit_mhim.**

**`mayberem` (`:2315–2351`).** `!obj||!owornmask` return; `utotype||!m_next2u` return; **Deaf** take-off pline (no rng); else `rn2(20)<Cha` → SetVoice + `y_n` with `!rn2(2) lover : !rn2(2) dear : sweetheart`; else SetVoice + verbalize why (uarm / cloak|shield / boots / gloves / shirt / hair `body_part(HAIR)`). Then `remove_worn_item(TRUE)`. JS the same rng **behind `hero_Deaf()`**. Clang left-to-right: first `!rn2(2)` lover, else second `!rn2(2)` dear, else sweetheart — JS nested ternary matches. `body_part` LIVE polyself import (pre-existing mhitu edge, not wield/pickup). **Match except Deaf.**

**`could_seduce` (`:1933–1981`) as MS_SEDUCE / ssex callee.** Animal → 0. `adtyp` from mattk or `dmgtype` SSEX/SEDU/PHYS; SSEX && !SYSOPT → SEDU. Invisible agr + !perceive + SEDU → 0. Non-nymph and not AMOROUS_DEMON, or adtyp not SEDU/SSEX/SITM → 0. Opposite gender → 1; same-gender nymph → 2; else 0. JS mhitm.js already had this; this SHA only flipped SYSOPT default. Null mattk (chat) uses dmgtype — extractor YES makes AMOROUS_DEMON dmgtype AD_SSEX so chat can return 1. **Match the callee used here.** Hero-as-seducer `magr==youmonst` arm exists in C/JS `could_seduce` but uhitm `mhitm_ad_ssex` still named.

**`get_mattk` SEDUCE=0 (`mhitm.js:1111`).** C substitutes `c_sa_no` when !SYSOPT. JS `if (adtyp === AD_SSEX && !SYSOPT_SEDUCE()) adtyp = AD_SEDU` in `could_seduce` only — **not** a full `c_sa_no` three-attack swap. Named. Extractor still emits YES into the table. **Not a stub inside doseduce.**

**`mhitm.js` SYSOPT default.** Parent `!!(game.sysopt?.seduce)` treated missing as off. C `sys.c` initializes seduce to 1. This SHA `v==null → true`. Contest recorder has no explicit 0. **Match C default.** Explicit 0 still off.

**`u_carried_gloves` (`:1556–1571`).** C `uarmg` else first `is_gloves` on `gi.invent` (`oclass==ARMOR && oc_armcat==ARM_GLOVES`). JS worn first; `oc_skill===3` (objects.js stores `oc_armcat` in `oc_skill`). Array or nobj walk. **Match.**

**`stop_donning(NULL)` (`:1687–1701`).** Walk invent for armor `donning`; none → 0. JS LIVE async import. **Not a stub.**

**Incubus `Ring_gone` (`:2092–2104`).** After replace, `u.utotype || !m_next2u` return 1 (levitation drop / teleport). JS the same before `setworn` of the new ring. **Match.**

**Bad case 0 Half_phys (`:2184–2186`).** C `rnd(Half_physical_damage ? 5 : 10)`. JS `HHalf_physical_damage || EHalf_physical_damage` — **Match** `youprop.h:341`. Not the Deaf clone.

**Good case 0 uen (`:2229–2233`).** C `u.uen = (u.uenmax += rnd(5))` then peak. JS `uenmax += rnd(5); uen = uenmax; peak`. **Match.**

**`rloc` (`:2162–2163`, `:2302–2303`).** C `if (!tele_restrict(mon)) rloc(mon, RLOC_MSG)`. JS `if (!(await tele_restrict(mon))) await rloc(mon, RLOC_MSG)`. LIVE teleport.js. **Match.**

**Generated `mattk`.** `js/generated/monsters_data.js` ±1 this SHA (AMOROUS_DEMON slot). Bite AD_SSEX=35 with 0d0 is what `mhitm_adtyping_u` `case AD_SSEX` now reaches. Parent empty array never hit 35. **Match the extractor claim.**

**`mayberem` why-arms (`:2337–2349`).** C: uarm “let's get a little closer”; uarmc||uarms “it's in the way”; uarmf feet; uarmg clumsy; uarmu massage; else hairbuf `body_part(HAIR)`. JS the same if/else. **Match.** Adjacency test at entry uses `m_next2u` LIVE (pre-existing).

**Deaf vs Cha rng (call-for-call).** C `mayberem`: Deaf → 0 rng; else `rn2(20)` then maybe two `rn2(2)` in the qbuf. Ring loops: Deaf skips `rn2(20)`/`y_n` and takes the “decides she'd like / puts it on” pline. JS those `rn2` sit behind `!hero_Deaf()`. When `EDeaf` is set and `HDeaf` is 0, C burns **zero** of those; JS burns them. That is the Keep’d C-wrong.

**`verbalize` / `y_n`.** LIVE `display.js` / `getline.js`. Contest `SetVoice` empty means C does not change voice before them; omitting the JS call **matches compiled C**. D-1752 later inserts the no-op so the source shape matches. Not a stub that drops yn.

**`mpickobj` / `freeinv`.** LIVE makemon/invent. Succubus takes the ring into monster inventory after `remove_worn_item(FALSE)`. **Match.**

**Chaotic align (`:2166–2167`).** C `u.ualign.type == A_CHAOTIC` then `adjalign(1)` only on the successful-undress path (after leftover-armor return). JS the same, after the `uarm||uarmc` return. **Match — no align bump when still dressed.**

**RNG inventory (doseduce + mayberem).** `rn2(20)` vs Cha (ring × N, mayberem × pieces, pay once) all behind Deaf; mayberem qbuf up to two `rn2(2)`; `ld` none; `rn2(35)` vs min(Cha+Int,32); bad `rn2(5)` then `rnd`/`rn1` per case; good `rnd(100)` then `rn2(5)` then `rnd(5)` on case 0; pay `rn2(20)`; gold `rnd`; `!rn2(25)` mcan; `tele_restrict`/`rloc` as those functions. **Order matches C when Deaf matches C.** The Keep’d miss is extra `rn2`/`y_n` when only `EDeaf`/`uroleplay.deaf` is set.

**`urgent_pline` murmur (`:2114–2118`).** C Deaf / naked / else+undress suffix. JS `hero_Deaf()` for the Deaf wording. Same extra-rng class as mayberem (wording only here, no `rn2` on this line).

**`You_feel` / `pline_mon` / `Monnam`.** LIVE display/do_name. Headache uses `mhe(mon)` LIVE fountain. **Match.**

**Incubus both-slots break (`:2050–2052`).** C `uleft && uright && both RIN_ADORNMENT` → `break` (stop giving more rings). JS the same `break`. Worn adornment `continue` (do not re-wear). **Match.**

**`makeknown(RIN_ADORNMENT)`.** C before `y_n` and again after take/wear. JS the same two calls. **Match.** No rng.

**`prinv` after incubus `Ring_on`.** C `prinv((char *) 0, ring, 0L)`. JS `await prinv(null, ring, 0)`. LIVE invent. **Match.**

**`pluslvl(FALSE)` good case 3.** C `:2248–2250`. JS `await pluslvl(false)`. LIVE exper.js. **Match.** No extra rng beyond pluslvl itself.

**Deaf (`youprop.h:125`).** C `HDeaf || EDeaf || u.uroleplay.deaf`. `js/do.js:394` clone matches (plus `u.Deaf`). `js/invent.js:4367` `hero_Deaf` matches. This SHA’s `hero_Deaf` is `u.Deaf || u.HDeaf` only. **EDeaf and roleplay deaf miss.** Consequence in **live** arms: C Deaf → no `rn2(20)`, no `y_n`, murmur uses “seems to murmur”, leftover armor skips verbalize, house line is “No charge.” JS with only `EDeaf` set takes the Cha rng / `y_n` / verbalize path. **C-wrong, RNG.** Not a named omit.

**`mhitm_ad_ssex` (`:4750–4779`).** C three arms: `magr==you` uhitm `mhitm_ad_sedu`; `mdef==you` mhitu SYSOPT `could_seduce==1 && !mcan` `doseduce` → `AGR_DONE` then **always return** (no sedu fallback); else mhitm `mhitm_ad_sedu`. JS mhitu-only: SYSOPT then doseduce then return; else `mhitm_ad_sedu`. **Match the mhitu arm.** uhitm/mhitm named.

**MS_SEDUCE (`:1106–1128`).** SYSOPT && `mlet!=S_NYMPH` && `could_seduce==1` → `doseduce` `break`. After the giant switch, unset `pline_msg`/`verbl_msg` → `return ECMD_TIME` (`:1222–1241`). JS `return ECMD_TIME` immediately. **Match the break.** SYSOPT this SHA is null→true (parent treated unset as off — that **was** the empty-mattk bug’s partner). `could_seduce` LIVE (export list `:560`).

**Extractor.** C `SEDUCTION_ATTACKS_YES` = bite AD_SSEX 0d0 + 2×claw 1d3. Python replace matches that string. `SEDUCTION_ATTACKS_NO` also expanded (named unused while `get_mattk` does not subst `c_sa_no`). **Match YES.**

**Callee closure (`doseduce` + mhitu ssex + MS_SEDUCE).** LIVE: `unresponsive`, `u_carried_gloves`, `stop_donning`, `welded`, `mayberem` (body ports C), `ld`, `remove_worn_item`, `freeinv`, `mpickobj`, `setworn`, `Ring_gone`, `Ring_on`, `prinv`, `makeknown`, `y_n`, `verbalize`, `observe_object`, `tele_restrict`, `rloc`, `adjalign`, `exercise`, `adjattrib`, `resists_drli`, `losexp`, `pluslvl`, `losehp`, `money2mon`, `currency`, `could_seduce`, `SYSOPT_SEDUCE`, `mhitm_ad_sedu`. CLONE verified: `cloak_simple_name`, `helm_simple_name`, `unconscious`/`is_fainted` inlined in `unresponsive`. CLONE diverges: `hero_Deaf`. OMIT named: SetVoice source calls (contest empty ≡ no-op); uhitm/mhitm ssex; `c_sa_no`; steal `:517`. STUB in these arms: **none** for combat callees. Not “dispatch ported, callee stubbed” for `doseduce` itself. **Deaf is a wrong clone in a live arm**, not a stub.

## Hallucinations / overclaim

Subject “SYSOPT succubus/incubus `mayberem`/`ld`/AD_SSEX and extracted YES”: **true** for the dispatch and the mattk table. Subject “Match C” for the **Deaf** gates: **false** — `hero_Deaf` is not `youprop.h:125`. D-log “SetVoice remains empty without SND_LIB”: **true** at this SHA (no calls; contest macro empty). Do **not** stamp “Match C `mhitm_ad_ssex` uhitm/mhitm arms.” Do **not** stamp “Match C `get_mattk` `c_sa_no`.” Do **not** stamp “Match C steal.c `:517` `unresponsive`.” Do **not** stamp “Match C `SetVoice` source calls” (those are D-1752). Do **not** stamp “Match C `noit_mhim` Hallu.” Journal “fortress held” is not a public succubus screen. **Public-unhit**; canary was node 21/21 (SYSOPT default/0, leap `0xe5`, unresponsive, `could_seduce` 1 vs same-gender 0, mcan/mspec return 0, extracted AD_SSEX bite). Node canary does **not** include `EDeaf` skipping Cha `rn2`.

## Density

§2b: one C function (`doseduce`) + static `mayberem` + `ld` + the two C callers (mhitu ssex, MS_SEDUCE) + extractor YES so AD_SSEX exists. +497. Related `unresponsive` / `u_carried_gloves` / SYSOPT default. Did **not** glue uhitm seducer / mhitm mon-mon / `c_sa_no`. Large but one envelope. Not “finish mhitu.”

## Verification

D-log: save-oracle skip (untagged `mhitu.c:doseduce`); node 21/21; green+strict seed8000/0900; CURRENT cohort **9**/9 + strict. Rule #2 clean. Seduction **public-unhit**. Admit that. No canary for `EDeaf` vs Cha `rn2`.

## Actionable C-wrongs

1. **`doseduce` / `mayberem` `hero_Deaf` drops `EDeaf` and `uroleplay.deaf`.** C `youprop.h:125` `Deaf` is `HDeaf || EDeaf || u.uroleplay.deaf`. This SHA’s `hero_Deaf` (`mhitu.js:918`) is `u.Deaf || u.HDeaf`. Same name as `invent.js:4367`, which **does** match C. Gates: `mayberem` Deaf take-off vs `rn2(20)`/`y_n`; succubus/incubus ring Cha prompts; murmur wording; leftover-armor verbalize vs sigh; house “It’s on the house!” vs “No charge.” Queueable in one port: make `hero_Deaf` match `invent.js:4367` / `do.js:394`. Do **not** add `Deaf` clone #12. Do **not** import `do.js` for this (use the local, fix the predicate).

2. **Pay line uses `mon.female ? 'her' : 'him'` instead of `noit_mhim`.** C `:2266–2267` `noit_mhim(mon)` (`you.h:328` Hallu + `PRONOUN_NO_IT`). `shk.js:210` already has a no-Hallu clone; mhitu already imports shk. Wording/Hallu, not the Cha rng. Fix with item 1 or name it; do **not** write `noit_mhim` #2 that still drops Hallu.

Named (map, not Must-fix): uhitm hero-as-seducer; mhitm mon-mon AD_SSEX; `c_sa_no`; steal `:517`; SetVoice source calls (D-1752). `money_cnt_invent` sums like `end.js:369` (C first gold `quan`; merge makes them equal). Do **not** add `mayberem` #2. Do **not** add `cloak_simple_name` #4. Do **not** treat unset SYSOPT as off again. Do **not** re-port D-1742 `getyear`. Do **not** wrap `doseduce` as `pline_mon`.

Verdict: **QUALITY-RISK**
