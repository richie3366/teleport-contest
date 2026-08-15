# Review 10 — `77e5fcec` — cpostfx specials + stun/hallu

## Métadonnées
- Hash complet / court : `77e5fcec75dc98e07266f80ca46eef97be6754a9` / `77e5fcec`
- Parent : `2bfa043bc422197a992b1d46cac70bc931060314`
- Auteur, date : Raphaël Hervier, 2026-07-21 22:39:15 +0200
- D-id (ou absence) : **D-0943 dans le corps / D-log**. Sujet git : **pas de D-id**.
- Stats : 9 files, +257 / −35
- Fichiers JS / map / cadence : `js/eat.js` (+229), `js/do_wear.js` (export `toggle_displacement`), `js/trap.js` (export `self_invis_message`) ; map `debt.md` ; pas de refresh suite (cadence reste #1215)

## Intention vs livrable
Le sujet dit « Port cpostfx corpse specials and stun/hallu intrinsics from C » sans D-id. Le corps et D-0943 précisent le périmètre : specials **nommés** + AD_STUN/AD_HALU, **were / mimic / givit différés**.

Le diff fait ça : le `switch (pm)` C est posé, trois `case` restent des `break` vides (were*, mimic, disenchanter). Hallu + newt buzz passent dans `check_intrinsics`. Pas de mélange cadence.

Écart : D-id manquant au sujet — flag process mineur, pas un hybride score+port.

## Inventaire

| Fichier | Rôle |
|---|---|
| `js/eat.js` | Port C `cpostfx` switch + `dmgtype` + `set_itimeout`/`incr_itimeout` |
| `js/do_wear.js` | Wiring : export `toggle_displacement` (déjà porté, cloak) |
| `js/trap.js` | Wiring : export `self_invis_message` (locus C = `potion.c`) |
| `docs/c-js-map/debt.md` | D-0943 marqué ; were/mimic/`attrcurse`/`mconveys` restent |
| D-log / INDEX / CURRENT / NOTES | D-0943 fixed, cohort eat/role, pas de score # |

## Fidélité C ↔ JS

### `cpostfx` — C `eat.c:1129` / JS `js/eat.js` (au commit : switch nouveau)

C commence par `if (ge.eatmbuf) eatmdone();`. **JS de ce commit ne le fait pas.** Nommé (`eatmbuf cleanup`). Fuite / mimicry orpheline si un gold-pile précédent n’a pas fini — D-0945 le répare.

Constantes locales `AD_STUN = 12`, `AD_HALU = 36` : match `monattk.h`. Pas des magics inventés.

#### Wraith / nurse / lizard / quantum / riders
- `PM_WRAITH` → `pluslvl(false)` : ordre C.
- `PM_NURSE` : `Upolyd ? mh=mhmax : uhp=uhpmax` puis `make_blinded(0, !ucreamed)` puis `botl` puis `check_intrinsics=true`. JS copie. **OK.**
- `PM_LIZARD` : stun/conf > 2 → clamp 2, puis `check_intrinsics`. **OK.**
- `PM_QUANTUM_MECHANIC` : message, puis `HFast & INTRINSIC` clear vs `FROMOUTSIDE` set. Pas de RNG. **OK.**
- Riders : `break` sans intrinsics. **OK** (C : life-saved, ne pas confer).

#### Stalker / yellow light / bats — FALLTHROUGH
C :

```1162:1183:nethack-c/upstream/src/eat.c
    case PM_STALKER:
        if (!Invis) {
            set_itimeout(&HInvis, (long) rn1(100, 50));
            if (!Blind && !BInvis)
                self_invis_message();
        } else {
            if (!(HInvis & INTRINSIC))
                You_feel("hidden!");
            HInvis |= FROMOUTSIDE;
            HSee_invisible |= FROMOUTSIDE;
        }
        newsym(u.ux, u.uy);
        FALLTHROUGH;
        /*FALLTHRU*/
    case PM_YELLOW_LIGHT:
    case PM_GIANT_BAT:
        make_stunned((HStun & TIMEOUT) + 30L, FALSE);
        FALLTHROUGH;
        /*FALLTHRU*/
    case PM_BAT:
        make_stunned((HStun & TIMEOUT) + 30L, FALSE);
        break;
```

Stalker : +30 (bras yellow/giant) +30 (bat) = **+60**, pas un troisième +30 dans le `case STALKER` lui-même. JS reproduit les `falls through` commentés. RNG : `rn1(100, 50)` seulement si `!Invis`. **Ordre et compte d’appels stun corrects.**

`Invis` JS = `u.Invis \|\| HInvis \|\| EInvis` — approximation de la macro C ; risque si `u.Invis` n’est pas synchro avec les bits.

#### Chameleon / doppel / sandestin / genetic
C : `Unchanging` → feel momentarily ; sinon tin `use_up_tin` + `lesshungry(200 + metallivorous?5:0)` **avant** `polyself` (fatal possible). JS : même ordre tin puis messages puis `polyself(POLY_NOFLAGS)`. **OK.**

#### Displacer
C : `if (!Displaced) toggle_displacement(NULL, 0, true)` **puis** `incr_itimeout(&HDisplaced, d(6,6))`. JS appelle l’export `do_wear.js` puis `incr_itimeout_prop(..., d(6,6))`. RNG `d(6,6)` après le message : **ordre C.** `Displaced` JS or-égalise `uprops[DISPLACED]` — rustine double stockage, pas un skip de branche.

#### Mind flayer INT
C : `ABASE(A_INT) < ATTRMAX(A_INT)` puis `!rn2(2)` → yum + `adjattrib(A_INT,1,FALSE)` + **`break`** (pas de telepathy). `ATTRMAX(INT)` = `urace.attrmax` (`attrib.h`, le bras `uasmon_maxStr` est STR-only).

JS : `u.acurr?.a?.[A_INT]` = `ABASE`. `game.urace?.attrmax?.[A_INT] ?? 18`. **Match.** `!rn2(2)` puis `break` vs fallthrough default : **OK.**

#### `check_intrinsics` hallu + newt
C : `dmgtype(AD_STUN) \|\| dmgtype(AD_HALU) \|\| PM_VIOLET_FUNGUS` → pline + `make_hallucinated((HHallucination&TIMEOUT)+200, FALSE, 0)` **puis** `AT_MAGC \|\| PM_NEWT` → `eye_of_newt_buzz` **puis** `corpse_intrinsic` (encore stub JS).

JS `dmgtype` itère `ptr.mattk[].adtyp` — équivalent `mondata` si `mattk` généré. Hallu **avant** newt : ordre C. `corpse_intrinsic` commenté « deferred (no mconveys) ». **Pas de RNG givit fantôme.**

#### Stubs assumés complets par le sujet ? Non.
```
case HUMAN_WERE* : break;   // set_ulycn deferred
case *MIMIC      : break;   // eatmdone deferred
case DISENCHANTER: break;   // attrcurse deferred
```
Le corps le dit. Ces `case` empêchent le `default` `check_intrinsics=true` — **correct** : C were/mimic/disenchanter ne tombent pas dans default. Un `default` prématuré aurait donné hallu/newt/givit en trop. Les `break` vides sont la bonne omission.

### Helpers
`do_wear.js` : `toggle_displacement` existait ; export seulement. Pas un port cloaks.
`trap.js` : `self_invis_message` existait (C `potion.c`) ; export. Locus module ≠ 1:1 `potion.c`, préexistant.

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/fs/fastforward/seed dans le contrôle. `await` = messages / `pluslvl` / `polyself` / `make_*`. Rule #2 RAS. AD_* en littéraux locaux plutôt que `const.js` — pas un hardcode de seed, mais duplication fragile.

## Densité (§2b)
**Right size.** Un `switch` C, ~230 LOC `eat.js`, deux exports. Pas docs-only. Were/mimic/givit volontairement hors cluster — densité correcte, pas un peel d’un seul `if`.

## Documentation
D-0943 « fixed » + deferrals were/`eatmdone`/`attrcurse`/`mconveys`. Map les répète. CURRENT élargit « do not re-break … D-0943 » sans prétendre givit. Sujet sans D-id : trou process.

Pas d’overclaim « cpostfx complete ».

## Vérification
Journal : green+strict ; eat/role cohort 12/12. **Pas** de full `sessions` (cadence #1215 plus tard). Affirmation, pas de log runner. Le cohort eat/role n’exerce probablement pas wraith/mind flayer/stalker FALLTHROUGH. Fortress non re-mesurée ici.

## `eye_of_newt_buzz` déjà là (D-0492)

Ce commit ne retouche pas `eye_of_newt_buzz` (RNG `rn2(3)`, `rnd(3)`, `rn2(3)` uenmax). Il le **déplace** sous `if (check_intrinsics)`. Avant D-0943, JS appelait newt pour **tout** cadavre `AT_MAGC \|\| PM_NEWT` **sans** switch, donc wraith/nurse/quantum ne devaient **pas** buzz. Si le vieux code buzzait les newts via default implicite, le nouveau switch **empêche** wraith (`pluslvl` only, pas check_intrinsics) de buzz — **C**. Nurse **a** check_intrinsics (poison resist plus tard D-0944, hallu si AD_STUN). Quantum **n’a pas** check_intrinsics — pas de newt, pas de givit. **Correct.**

Régression possible : un cadavre qui n’est ni special ni default? Tous les `pm` tombent dans un `case` ou `default`. OK.

## `pluslvl` / `make_blinded` / `make_stunned`

Non portés ici : ce sont des callees déjà présentes. Si `pluslvl(false)` JS n’est pas le `pluslvl(FALSE)` C (xp vs HP), wraith est faux **sans** que ce commit le montre. Hors périmètre, mais le cluster **dépend** d’eux. `make_stunned(timeout+30, false)` : le second arg `FALSE` = pas de message? C `make_stunned(long, boolean)`. Vérifier que JS ne tire pas un `rn2` extra dans `make_stunned` vs C — préexistant.

## `polyself` tin

C insiste : `use_up_tin` **avant** `polyself` pour garder le tin hors bones si fatal. JS `game.context?.tin?.tin`. Si le tin n’est pas dans `context.tin` (cadavre chameleon, pas tin), C skip ce bras — JS aussi. Genetic engineer message vs « feel a change » : C `You("%s.", pm==GENETIC ? "undergo…" : "feel a change coming over you")`. JS deux `pline` complets. **String match.**

## `dmgtype` vs `attacktype`

Hallu utilise `dmgtype(AD_STUN/AD_HALU)` ; newt `attacktype(AT_MAGC)`. Ce n’est pas interchangeable : un monstre magique sans AD_STUN ne hallu pas. JS a les deux helpers. `PM_VIOLET_FUNGUS` forcé hallu même sans AD_HALU — C aussi.

`AD_STUN=12` / `AD_HALU=36` en dur dans `eat.js` : si `mattk.adtyp` du générateur utilise les mêmes valeurs `monattk.h`, OK. Si un extracteur remap, hallu meurt silencieusement.

## Exports `do_wear` / `trap`

`toggle_displacement` : C `do_wear.c`, déjà utilisé au don cloak. Corps `obj==null` timed displacement — le commentaire do_wear disait « Timed-displacement (obj null) … deferred when not needed for extrinsic cloak ». Appeler avec `null, 0, true` depuis eat **exerce** ce bras deferred. Si l’implémentation cloak-only ignore `obj==null`, **pas de message Displaced** sur cadavre. À flagger comme dette d’un callee « déjà porté » trop étroit.

`self_invis_message` : C `potion.c`. Strings « Far out, man!  You » / « Gee!  All of a sudden, you ». Export only.

## Journal

12 lignes ajoutées. Verification green+eat/role 12/12. CURRENT ne touche pas le tableau Score (reste #1210). Honnête : pas de 44/44 recollé. NOTES « next : eatspecial ; corpse_intrinsic ; were ; mimic ». Ordre réel du loop : givit **avant** were (D-0944 puis D-0945) — NOTES de ce commit mettait encore givit après eatspecial. Petit drift NOTES vs travail suivant.

## Risques / dette
1. **`eatmdone` en tête de `cpostfx` absent** jusqu’à D-0945 — mimicry orpheline.
2. Were / mimic / `attrcurse` / `givit` : `break` vides ; le default ne doit pas être « réparé » à la hâte.
3. `AD_STUN`/`AD_HALU` dupliqués localement.
4. `Invis`/`Displaced` via flags plats + uprops.
5. Sujet sans D-id.
6. `toggle_displacement(null,…)` peut rester no-op si le port cloak ignore l’obj nul.
7. Wraith = `pluslvl` préexistant, non relu.

## Extraots C (switch cpostfx)

Wraith / were (JS D-0943 laisse were en `break` vide) :

```1141:1146:nethack-c/upstream/src/eat.c
    case PM_WRAITH:
        pluslvl(FALSE);
        break;
    case PM_HUMAN_WERERAT:
        catch_lycanthropy = PM_WERERAT;
        break;
```

FALLTHROUGH stun :

```1176:1183:nethack-c/upstream/src/eat.c
    case PM_YELLOW_LIGHT:
    case PM_GIANT_BAT:
        make_stunned((HStun & TIMEOUT) + 30L, FALSE);
        FALLTHROUGH;
        /*FALLTHRU*/
    case PM_BAT:
        make_stunned((HStun & TIMEOUT) + 30L, FALSE);
        break;
```

Au commit 10, JS `HUMAN_WERE*` est `break` vide — **pas** `catch_lycanthropy`. C pose déjà la variable ; JS D-0943 l’ignore. D-0945 aligne. Reviewer : ne pas juger D-0943 sur le HEAD actuel où were est rempli.

Hallu C dans `check_intrinsics` seulement :

```1299:1312:nethack-c/upstream/src/eat.c
    if (check_intrinsics) {
        struct permonst *ptr = &mons[pm];
        if (dmgtype(ptr, AD_STUN) || dmgtype(ptr, AD_HALU)
            || pm == PM_VIOLET_FUNGUS) {
            pline("Oh wow!  Great stuff!");
            (void) make_hallucinated((HHallucination & TIMEOUT) + 200L, FALSE,
                                     0L);
        }
        if (attacktype(ptr, AT_MAGC) || pm == PM_NEWT)
            eye_of_newt_buzz();
```

Mind flayer C `break` après INT+1 :

```1283:1291:nethack-c/upstream/src/eat.c
        if (ABASE(A_INT) < ATTRMAX(A_INT)) {
            if (!rn2(2)) {
                pline("Yum!  That was real brain food!");
                (void) adjattrib(A_INT, 1, FALSE);
                break; /* don't give them telepathy, too */
            }
        } else {
            pline("For some reason, that tasted bland.");
        }
```

`ATTRMAX` C (`attrib.h`) : STR polyd seulement via `uasmon_maxStr` ; INT = `urace.attrmax`. JS `?? 18` si race sans table — 18 est le max humain typique, faux pour orc INT max plus bas.

Disenchanter / mimic / were : `break` sans `check_intrinsics`. Un `default` mal placé avant ces cases (pas le cas) aurait hallu+newt en trop.

`PM_DEATH/PESTILENCE/FAMINE` : `break` explicite pour ne **pas** default. JS D-0943 les a. **OK.**

## Verdict
- Verdict : **ACCEPT**
- Note /10 : **8**
- Une phrase : le `switch` C est copié branche par branche (FALLTHROUGH stun +60, mind flayer `break` anti-telepathy, riders sans intrinsics) et les omissions were/mimic/givit sont de vrais `break` plutôt qu’un default menteur — le sujet git oublie seulement le D-id.
