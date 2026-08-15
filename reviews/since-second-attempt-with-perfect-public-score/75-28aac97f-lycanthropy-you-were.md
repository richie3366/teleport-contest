# Review 75 — `28aac97f` — lycanthropy you_were + cadence #1275

## Métadonnées
- Hash complet / court : `28aac97f648e6b68f0e72ad0c1c0fb53dce1352e` / `28aac97f`
- Parent : `c84a1f6232554f17d8e617a8aa7623966f7533c4`
- Auteur, date : Raphaël Hervier, 2026-07-22 05:32:28 +0200
- D-id : D-1004 **+ cadence #1275**
- Stats : 14 files, +282/−60
- Fichiers JS : `mhitm.js`, `mhitu.js`, `monsters.js`, `potion.js`, `pray.js`, `were.js`

## Intention vs livrable
Le sujet git **mélange** deux jobs : « Wire lycanthropy you_were paths **and refresh #1275 suite score** ». Le journal titre `#1275 cadence + D-1004`. Playbook : un commit cadence qui porte du C en plus **doit être flaggé**.

Livrable port réel : `TROUBLE_LYCANTHROPE`, `peffect_water` + vapeur `POT_WATER`, `mon_poly` bras héros, `mhitm_ad_poly_u`, `hates_blessings`. Ce n’est pas un peel docs-only.

**Forteresse : 43/44 inchangée.** CURRENT passe #1270 → #1275 avec les **mêmes** Scr 11404/11405, RNG 100%, seed0009 toujours FAIL. La cadence **n’a pas** récupéré 44/44.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/pray.js` | `TROUBLE_LYCANTHROPE` dans `in_trouble` / `fix_worst_trouble` |
| `js/potion.js` | `peffect_water` + `potionbreathe` POT_WATER |
| `js/mhitm.js` | `mon_poly` youmonst (mon-defender **stub** return dmg) |
| `js/mhitu.js` | `mhitm_ad_poly_u` + case AD_POLY |
| `js/monsters.js` | `hates_blessings` / `mon_hates_blessings` (C : `mondata.c`) |
| `js/were.js` | Commentaires callers |
| CURRENT / journal | Score #1275 43/44 |

## Fidélité C ↔ JS

### 1. `pray.c` `in_trouble` / `fix_worst_trouble`

C majors **avant** HIT : Stoned, Slimed, Strangled, Lava, Sick, Starving, Region ; puis HIT ; puis `ismnum(u.ulycn)` → `TROUBLE_LYCANTHROPE` (valeur **6**, HIT = **7**). JS constantes 7 puis 6 : numériques OK.

JS `in_trouble` : seulement HIT puis lycan. Commentaire : « majors above HIT deferred — when those flags are unset, HIT matches C ». Vrai **si** Stoned/Sick/… ne sont jamais posés. Le jour où `Sick` vit, une prière lycan partirait **avant** la maladie C. Omission nommée, ordre futur piégé.

`fix_worst_trouble(TROUBLE_LYCANTHROPE)` → C `you_unwere(TRUE)` ; JS `await you_unwere(true)`. Bras conforme. Autres TROUBLE_* toujours `default: break`.

### 2. `potion.c:peffect_water`

Structure C : uncursed → goût eau + `rnd(10)` hunger + `newuhs` return ; sinon `potion_unkn++` ; `mon_hates_blessings(youmonst) || chaotic` vs else (lawful/neutral).

Sous-bras lycan :
- holy + hates + `ismnum(ulycn)` : pline affinity, `you_unwere(FALSE)` si `youmonst.data == &mons[ulycn]`, `set_ulycn(NON_PM)`, puis `losehp(Maybe_Half_Phys(d(2,6)))`.
- unholy hates : healup + `you_were` si lycan && !Upolyd.
- holy non-hates : `make_sick(0)` , exercises, `you_unwere(TRUE)`.
- unholy non-hates : lawful burn / dread ; `you_were` si lycan && !Upolyd.

JS suit cet arbre. Écarts concrets :
- C `youmonst.data == &mons[ulycn]` vs JS `umonnum === ulycn` — équivalent si `umonnum` track la forme.
- C `make_sick(0L, NULL, TRUE, SICK_ALL)` vs JS `u.Sick = 0`. Nommé. Pas les messages / side-effects de `make_sick`.
- `Maybe_Half_Phys` = halve si Half_physical, **sans RNG**. JS `maybe_half_phys(d(2,6))` : `d(2,6)` LTR puis maybe — OK.
- `losehp` JS synchrone : pas d’await manquant.
- `hates_blessings` dans `monsters.js` pas `mondata.js` (1:1 cassé, petit).

`peffects` JS `return -1` pour POT_WATER comme les autres potions implémentées (convention JS « consumed ») ; C `break` dans le switch void. Cohérent avec le fichier, pas un early-return inventé.

### 3. `potionbreathe` POT_WATER — **bras gremlin sauté**

C :

```2080:2090:nethack-c/upstream/src/potion.c
    case POT_WATER:
        if (u.umonnum == PM_GREMLIN) {
            (void) split_mon(&gy.youmonst, (struct monst *) 0);
        } else if (ismnum(u.ulycn)) {
            if (obj->blessed && gy.youmonst.data == &mons[u.ulycn])
                you_unwere(FALSE);
            else if (obj->cursed && !Upolyd)
                you_were();
        }
```

JS : uniquement le `else if` lycan. **`split_mon` gremlin absent.** Si le héros est gremlin, C consomme le RNG de split ; JS ne fait rien. Le D-log ne le nomme pas (il parle make_sick / mon_poly defender). Omission **non nommée**.

Bras lycan vapeur : béni + forme were → `you_unwere(false)` ; maudit + !Upolyd → `you_were`. Ne **guérit** pas (`set_ulycn` absent) — conforme au commentaire C.

### 4. `mhitm.c:mon_poly` héros

C : Antimagic → `shieldeff` (dmg **non** zéro) ; Unchanging → dmg inchangé ; sinon ulycn NON_PM → `polyself` dmg=0 ; `umonnum != ulycn` → `you_were` dmg=0 ; else `you_unwere(FALSE)` dmg=0.

JS : mêmes trois branches lycan/poly, `shieldeff` nommé omit, dmg=0 seulement après morph. Antimagic/Unchanging **sans uprops** (seulement flags plats) — plus pauvre que les helpers allmain D-1002.

Mon-defender : `return dmg` inchangé. Nommé. D-1006 le portera.

### 5. `uhitm.c:mhitm_ad_poly` bras mhitu — **RNG déplacé**

C calcule **en tête** :

```
boolean negated = (mhitm_mgc_atk_negated(magr, mdef, FALSE) || magr->mspec_used);
```

puis hitmsg ; puis `Maybe_Half_Phys(dmg) < (Upolyd ? mh : uhp)` ; puis si negated / sinon `mon_poly`.

JS `mhitm_ad_poly_u` :
- hitmsg d’abord (OK pour mhitu) ;
- **`mhitm_mgc_atk_negated` seulement si** `maybe_half_phys(dmg) < curhp` ;
- **pas** de `|| magr.mspec_used`.

Or `mhitm_mgc_atk_negated` **brûle `rn2(10)`** sauf `mcan` (commentaire dans `mhitm.js`). Donc un AD_POLY qui **tuerait** (dmg ≥ HP) : C tire `rn2(10)` quand même ; JS **ne le tire pas**. Divergence de flux RNG positionnel. D-1006 corrige l’ordre pour mhitm/uhitm **mais laisse ce bras mhitu**.

`Maybe_Half_Phys` sans RNG : OK.

### 6. `hates_blessings` / `mon_hates_blessings`
C `mondata.c` : `hates_blessings(ptr)` = undead \|\| demon ; `mon_hates_blessings(mon)` = `is_vampshifter(mon) \|\| hates_blessings(mon->data)`. JS copie dans `monsters.js`. `peffect_water` : `mon_hates_blessings(youmonst) \|\| ualign==CHAOTIC` — C identique. Un héros vampshifter en forme humaine C hates holy water ; JS aussi si `is_vampshifter(youmonst)` est vrai. Si `youmonst` JS n’a pas `cham` vamp, holy water « proud » / healup / `you_were` (bras chaotic-hates) ne part pas.

### 7. `dopotion` / `potion_unkn`
C `gp.potion_unkn++` seulement si béni ou maudit. JS `potion_unkn++` même endroit. Le trycall `dopotion` JS existant s’appuie sur ce compteur — un ++ en trop ferait un `docall` C-divergent. Bras uncursed return **avant** le ++ : conforme.

### 8. AD_POLY export
`mhitm.js` ajoute `AD_POLY` à l’export (const locale 43). `mhitu.js` l’importe. Si un autre fichier avait `AD_POLY` à une autre valeur, collision. `monattk.h` AD_POLY = polymorph target (genetic engineer).

## Constitution / playbook
Grep JS : RAS. Rule #2 OK. `hates_blessings` mal logé (`monsters.js` vs `mondata.c`). Pas de FORCE. Cadence+port = **process smell** explicite. Pas d’entrée `fastforward.js`. `await you_were` depuis potion/pray/mhitu : gameplay input seulement si paranoid getlin (D-1001), déjà le contrat C.

## Densité (§2b)
Le **port** lycan (pray + potion + mhitu) est un cluster sémantique correct (`you_were` callers). Y coller la cadence full `sessions` gonfle le commit (CURRENT, archive, score) sans densifier le C. Too-big **process**, right-size **code**.

## Documentation
D-1004 Status fixed. Symptom : you_were existait, callers pray/potion/mhitm unwired. Deferred : other in_trouble majors/minors ; `make_sick` body ; `mon_poly` monster-defender ; shieldeff ; next_to_u.

**Ne nomme pas** gremlin `split_mon` ni le `rn2(10)` mhitu déplacé. CURRENT « Score last measured @#1275 **43**/44 » identique #1270 sur Scr/RNG — le « refresh » est un tampon de date. Journal titre explicitement `#1275 cadence + D-1004`. NOTES Latest D-1004 ; suite 43/44.

`c-js-map/debt.md` et `turns.md` touchés (lycan wires). Si turns.md potion dit encore « omit peffect_polymorph » sans mentionner `peffect_water`, la map potion est en retard d’un cran — `peffect_water` n’est pas polymorph mais c’est un `peffect_*` majeur.

INDEX : cadence 43/44 @#1275 **dans la même ligne** que le port — le mélange est documenté, pas caché. Ça n’excuse pas le process.

## Vérification
Green + cohort pray/potion/combat **16**/17 (seed0009). Cadence **43**/44 Scr 11404/11405 RNG 100% speed `31+0.27/turn`. Preuve de non-régression, **pas** de 44e session. seed0009 n’a pas bougé.

## Risques / dette
1. **`mhitm_ad_poly_u` : `rn2(10)` sous le if HP** + `mspec_used` oublié.
2. Vapeur d’eau : **gremlin `split_mon` silencieux**.
3. `in_trouble` lycan trop tôt dès qu’un major C existera.
4. `make_sick` = clear flag.
5. `mon_poly` defender mort (D-1006).
6. Mélange cadence : le score #1275 n’apprend rien.

## Complément — `in_trouble` et `mon_poly` héros

C `in_trouble` après HIT :

```c
    if (ismnum(u.ulycn))
        return TROUBLE_LYCANTHROPE;
    if (near_capacity() >= EXT_ENCUMBER && AMAX(A_STR) - ABASE(A_STR) > 3)
        return TROUBLE_COLLAPSING;
```

JS return lycan puis 0. Une prière « fix worst » avec lycan **et** collapsing C soigne lycan d’abord (6 < wait, HIT is 7, LYCAN is 6, but in_trouble returns the **first** matching in **priority order**, not by numeric magnitude — commentaire C « priority via in_trouble order, not magnitude »). JS qui n’a que HIT puis lycan : un héros lycan + starving C retournerait STARVING **avant** HIT/lycan. JS retournerait HIT ou lycan. **Dès que starving/sick existent comme flags**, D-1004 lycan est un false positive de prière. Nommé « majors above HIT deferred » — correct, mais le câblage lycan **fige** un ordre incomplet.

`mon_poly` héros Antimagic : C `shieldeff` puis **tombe** (pas de else unique qui zéro dmg). JS `if (Antimagic) { /* shieldeff deferred */ } else if (Unchanging) {} else { morph; dmg=0 }`. Antimagic JS : dmg **non** zéro, pas de morph — C identique. Unchanging JS : dmg non zéro — C identique. Seul le `else` morph zéro dmg. Conforme malgré shieldeff manquant (flash, pas RNG core typique).

`You_feel('an unnatural urge')` vs C `You_feel("an unnatural urge coming on.")` — JS a « coming on » dans le diff D-1004. Vérifié : `await You_feel('an unnatural urge coming on.')`. Ponctuation C. OK.

Cadence : CURRENT liste PASS 43 seeds identique #1270. Speed 30→31, R² 0.876→0.873 : bruit de machine, pas un signal de port. Flag process : on a payé un full `sessions` pour écrire un tableau déjà connu.

## Tableau branches (D-1004)

| Fonction | Porté | Écart |
|---|---|---|
| `in_trouble` lycan après HIT | oui | majors C avant HIT absents |
| `fix_worst_trouble` lycan | `you_unwere(true)` | — |
| `peffect_water` uncursed | `rnd(10)` hunger | — |
| holy hates lycan | unwere + set_ulycn NON_PM + losehp d(2,6) | make_sick stub sur l’autre bras |
| unholy hates | healup + you_were | — |
| `potionbreathe` WATER lycan | béni unwere / maudit you_were | **gremlin split_mon sauté** |
| `mon_poly` you | 3 bras ulycn/poly | shieldeff ; Antimagic plats |
| `mon_poly` mon | return dmg | D-1006 |
| `mhitm_ad_poly_u` | hitmsg + maybe_half_phys | **`rn2(10)` sous if HP ; pas mspec_used** |

C `mhitm_ad_poly` (`uhitm.c`) calcule `negated` **avant** les trois bras (you→mon / mon→you / m-vs-m) :

```3729:3763:nethack-c/upstream/src/uhitm.c
void mhitm_ad_poly(...) {
    boolean negated = (mhitm_mgc_atk_negated(magr, mdef, FALSE)
                       || magr->mspec_used);
    if (magr == &gy.youmonst) { /* uhitm: !uwep && dmg < mhp */ }
    else if (mdef == &gy.youmonst) {
        hitmsg(magr, mattk);
        if (Maybe_Half_Phys(mhm->damage) < (Upolyd ? u.mh : u.uhp)) {
            if (negated) { /* mcan message */ }
            else { mhm->damage = mon_poly(magr, &gy.youmonst, ...); }
        }
    } else { /* mhitm: dmg < mhp && !negated */ }
}
```

`mhitm_mgc_atk_negated` (`uhitm.c:75`) : si `magr->mcan` return TRUE **sans** `rn2` ; sinon `magic_negation(mdef)` puis `negated = !(rn2(10) >= 3 * armpro)`. Le `rn2(10)` part **toujours** pour un attaquant non-cancelled, **y compris** si le coup tue (bras mhitu : le test HP vient **après**). JS D-1004 `mhitm_ad_poly_u` inverse : hitmsg → test HP → **alors** `mhitm_mgc_atk_negated`. Un genetic engineer qui one-shot : C brûle `rn2(10)` ; JS non. C’est un décalage de keystream combat, pas un message.

`mspec_used` C est dans le `||` **avant** `mhitm_mgc_atk_negated` ? Non : C `(mhitm_mgc_atk_negated(...) || magr->mspec_used)` — **`rn2(10)` d’abord**, puis court-circuit `mspec_used` seulement si negated déjà true. Un monstre avec `mspec_used` non-zero **tire quand même** `rn2(10)` sauf `mcan`. JS D-1004 omet `mspec_used` **et** déplace le `rn2`. Double écart.

`peffect_water` uncursed : C `lesshungry(rnd(10))` puis return. JS `rnd(10)` au même endroit. Bras béni/maudit **après** : le `rnd(10)` n’est **pas** appelé. Court-circuit identique.

## Verdict
- Verdict : **PROCESS-SMELL**
- Note : **6/10**
- Si je ne devais retenir qu’une critique : **la forteresse reste 43/44** (cadence cosmétique collée au port) **et** le bras mhitu AD_POLY déplace un `rn2(10)` derrière le test de HP, ce que C ne fait pas.
