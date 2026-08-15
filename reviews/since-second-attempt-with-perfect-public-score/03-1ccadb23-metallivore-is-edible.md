# Review 03 — `1ccadb23e1384dc7f49575283d2076b69b0bdc8a` — metallivore `is_edible` + `doeat_nonfood`

## Métadonnées
- Hash complet / court : `1ccadb23e1384dc7f49575283d2076b69b0bdc8a` / `1ccadb23`
- Parent : `f4d7632bcf74769163f1297cd9bc6102f71a0385`
- Auteur, date : Raphaël Hervier `<richie3366@gmail.com>`, 2026-07-21 21:52:38 +0200
- D-id : **D-0936**
- Stats : 8 files, +300/−32 (JS : 2 files, +257/−23)
- Fichiers JS / map / cadence : `js/eat.js`, `js/mkobj.js` ; `debt.md` ; journal #1204 ; pas de full suite.

## Intention vs livrable
Promet : régimes poly dans `is_edible`, repas non-FOOD, or au sol, pour que les chemins metallivore held-out matchent C.

Livrable : `is_edible` élargi (ordre C) ; `foodword` ; `doeat_nonfood` ; `eatspecial` **cœur** (faim + useup) ; `floorfood` bras or ; export `g_at` / `is_metallic` / `is_organic`. `doeat` câble worn / `RIN_SLOW_DIGESTION` / non-FOOD.

Ce n’est **pas** encore beartrap/bars/`still_chewing` (D-0937). Le header `eat.js` le dit. Cluster tin/ration de D-0935 non retouché dans `is_edible` — séparation correcte.

Écart : `eatspecial` est un **squelette**. Le D-log dit « core eatspecial » et liste PAPER/potion/ring/… — honnête. En revanche `doeat` C entre `is_edible` et `doeat_nonfood` a un bras **rust monster + `oerodeproof`** (`eat.c:2876`) **absent et non nommé**.

## Inventaire

| Fichier | Rôle |
|---------|------|
| `js/eat.js` | Port `is_edible` / `foodword` / `doeat_nonfood` / `eatspecial` partiel ; `floorfood` or ; `useupall`/`useupf` locaux ; wire `doeat` |
| `js/mkobj.js` | Export `g_at` ; port macros `is_metallic` / `is_organic` |
| `docs/c-js-map/debt.md` | Or retiré ; beartrap/bars/`still_chewing`/eatspecial spéciaux encore deferred |
| D-INDEX/LOG, CURRENT, NOTES, journal | D-0936 |

## Fidélité C ↔ JS

### `is_edible` — C `eat.c:91` / JS `eat.js:is_edible`

```91:121:nethack-c/upstream/src/eat.c
is_edible(struct obj *obj)
{
    if (objects[obj->otyp].oc_unique)
        return FALSE;
    if (gy.youmonst.data == &mons[PM_FIRE_ELEMENTAL]
        && is_flammable(obj))
        return TRUE;
    if (metallivorous(gy.youmonst.data) && is_metallic(obj)
        && (gy.youmonst.data != &mons[PM_RUST_MONSTER] || is_rustprone(obj)))
        return TRUE;
    if (u.umonnum == PM_GHOUL)
        return (boolean)((obj->otyp == CORPSE
                          && !vegan(&mons[obj->corpsenm]))
                         || (obj->otyp == EGG));
    if (u.umonnum == PM_GELATINOUS_CUBE && is_organic(obj)
        && !Has_contents(obj))
        return TRUE;
    return (boolean) (obj->oclass == FOOD_CLASS);
}
```

JS : `oc_unique` ; `fmndx === PM_FIRE_ELEMENTAL && is_flammable` ; `metallivorous && is_metallic && (fmndx !== PM_RUST_MONSTER \|\| is_rustprone)` ; ghoul corpse non-vegan / EGG via `umon` ; gel cube `is_organic && !Has_contents` ; sinon `FOOD_CLASS`.

**Confirmation branch-par-branch** : même ordre, mêmes prédicats. Écart d’indirection : C `gy.youmonst.data` vs JS `hero_form_data()` / `game.u.umonnum`. Si `hero_form_data()` ≠ `youmonst.data` après poly, le bras fire/metal diverge. Pas de RNG (prédicat pur).

Callers : `edible_lets` / `floorfood_eat` / `doeat` — branchés. `eat_ok` C est un wrap `is_edible` ; JS `edible_lets` filtre pareil pour SUGGEST, mais `getobj_eat` **ne re-vérifie pas** `is_edible` sur la lettre tapée (préexistant : objet hors liste quand même renvoyé, `doeat` refuse ensuite).

### `is_metallic` / `is_organic` — C `objclass.h` / JS `mkobj.js`
`IRON..MITHRIL` inclus ; organic `<= WOOD`. `MITHRIL = 17` ajouté. `is_flammable` / `is_rustprone` déjà exportés — pas réinventés. Fidèle aux macros.

### `foodword` — C `eat.c:2498`
C : FOOD_CLASS → `"food"` ; gem verre `dknown` → `makeknown` ; sinon `foodwords[oc_material]`.
JS : COIN_CLASS → `"gold"` ; sinon `foodwords[mat]`.
Écarts : pas de court-circuit FOOD_CLASS (inutile sur le chemin non-FOOD) ; **pas** `makeknown` gem verre (gel cube qui mange du verre) ; COIN→gold ≈ `foodwords[GOLD]` C. Table `foodwords[]` ordre matériaux — alignée.

### `doeat_nonfood` — C `eat.c:2734`
Nutrition : coins `quan>200000 ? 2000 : quan/100` (`Math.trunc`) ; BALL/CHAIN `weight` ; sinon `oc_nutrition`. Conduct food++ ; leather/bone/dragon_hide/wax → unvegan, non-wax → `violated_vegetarian`. Cursed → `rottenfood` ; PAPER → `nodelicious`. Arme `opoisoned` → poison.

RNG poison : C `poison_strdmg(rnd(4), rnd(15), xname(otmp), KILLED_BY_AN)` — **quatre** args. JS `poison_strdmg(rnd(4), rnd(15))` — helper local **deux** args, killer/xname ignorés. Mort par arme empoisonnée : message/format faux. Non nommé.

`SCR_MAIL` basenutrit=0 : nommé.
Livelog first-food : nommé.
Delicious : `obj_is_pname && oartifact < ART_ORB_OF_DETECTION` — même garde C.

### `eatspecial` — C `eat.c:2414`
Porté : `set_occupation(eatfood)` pour choke `lesshungry` ; `lesshungry(nmod)` ; clear occupation/victual ; coins `useupall`/`useupf` ; sinon `useup`/`useupf(1)`.
**Sauté (nommé)** : PAPER messages, `dopotion`, `eataccessory`, leash, trident/flint + `exercise`, `uwepgone`/`uqwepgone`/`uswapwepgone`, `unpunish` ball/chain, `vault_gd_watching(GD_EATGOLD)`.
`useupall` : splice invent, **pas** `setnotworn`. Nommé dans le commentaire fonction.

Callers : `doeat_nonfood` → `eatspecial` branché. Manger une potion en cube : nutrition + destruction, **sans** effet potion.

### `doeat` inserts — C `eat.c:2864–2920`
Porté : worn `W_ARMOR|W_TOOL|W_AMUL|W_SADDLE` ; `RIN_SLOW_DIGESTION` + `rottenfood` ; non-FOOD → `doeat_nonfood`. Message or `You cannot eat that!` (plus le JS-only « gold ») — **aligné C**.

**Sauté, non nommé dans D-0936 :**
- `retouch_object` / `touch_artifact` (tour si blast).
- Bras rust monster `is_metallic && u.umonnum==PM_RUST_MONSTER && oerodeproof` : spit, `make_stunned(HStun+rn2(10))`, drop. C’est le sibling immédiat de `doeat_nonfood`. Omission map : silence.

### `floorfood` or — C `eat.c:3658`
`metallivorous && uptr != RUST_MONSTER && g_at` ; ynq 1 vs N gold. JS identique, **après** D-0936 seulement l’or (beartrap/bars encore deferred). `getobj_else++` C sur `'n'` : JS ne compte pas — nommé « else wording ».

`g_at` : premier `COIN_CLASS` du pile — C `invent.c`. Export depuis `mkobj.js` (déjà là, non exporté) — wiring, pas un 1:1 invent.c.

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/`fs`/`node:`/fastforward/seeds. Frozen RAS. Async : `yn_function`/`pline` seulement.

1:1 : `is_metallic` dans `mkobj.js` au lieu d’un header — acceptable (macros objclass). `useupall`/`useupf` **locaux** à `eat.js` alors que C est `invent.c` — duplication vs `useup` déjà hybride.

## Densité (§2b)
Right size. ~257 LOC JS, famille `is_edible` → `doeat` → `doeat_nonfood` → `eatspecial` + or floorfood. Un falsifier (eat cohort). Pas potions « finish ». `eatspecial` volontairement partiel dans l’enveloppe — OK si nommé ; le bras rust monster aurait dû rentrer dans le même cluster ou la map.

## Documentation
D-0936 **fixed** + deferrals beartrap/bars/`still_chewing`, eatspecial spéciaux, tin shop, `cprefx`. **Manque** rust-`oerodeproof` et `retouch_object` dans le D-log et `debt.md`.
NOTES 58 lignes. CURRENT Keep D-0936. Journal green + eat 8/8 — affirmation.

Overclaim léger : « held-out metallivore paths match C » alors que `eatspecial` ne match pas un repas potion/anneau et que le spit rustproof est absent.

## Vérification
Journal : green+strict ; cohort 8/8 (1800/0016/0105/0014/1500/0360). Pas de canary C-recorder metallivore. La suite publique n’exerce probablement pas le cube/rust form — forteresse PASS ne **prouve pas** `is_edible` poly. Falsifier réel = held-out / lecture C, pas 44/44.

## Tableau des branches `doeat` entre `is_edible` et `doeat_nonfood`

| Branche C `eat.c` | JS D-0936 | Verdict |
|-------------------|-----------|---------|
| `!is_edible` → cannot eat that | porté (or n’a plus un message JS-only) | OK |
| worn armor/tool/amulet/saddle | `owornmask & (W_ARMOR\|W_TOOL\|W_AMUL\|W_SADDLE)` | OK |
| `retouch_object` / `touch_artifact` | absent | **trou, non nommé** |
| rust monster + metallic + `oerodeproof` : rknown, split, Ulch, clear rustproof, `make_stunned(HStun+rn2(10))`, spit/drop | absent | **trou RNG, non nommé** |
| `RIN_SLOW_DIGESTION` : indigestible + `rottenfood` + `trycall` si dknown | pline + `rottenfood` ; **pas** `trycall` | partiel |
| `oclass != FOOD` → `doeat_nonfood` | porté | OK |
| TIN `start_tin` | déjà D-0935, reste après ces inserts | OK |

Le bras rustproof est **dans** l’enveloppe « metallivore eat ». Un hero `PM_RUST_MONSTER` qui mange du fer `oerodeproof` en C : `rn2(10)` stun + objet au sol. En JS : `doeat_nonfood` → délicieux + `eatspecial` useup. **Mauvais objet, mauvais RNG, mauvais faim.** Ce n’est pas un deferral « eatspecial PAPER ».

## `eatspecial` ligne à ligne vs C

C après `lesshungry` :
1. COIN → useupall/useupf + `vault_gd_watching(GD_EATGOLD)`
2. PAPER → mail / scare / YUM YUM / « Needs salt... »
3. POTION → `quan++` puis `dopotion` (useup interne)
4. RING/AMULET → `eataccessory`
5. LEASH + `leashmon` → `o_unleash`
6. TRIDENT !cursed → pline + `exercise(A_WIS)`
7. FLINT !cursed → pline + `exercise(A_CON)`
8. `otmp==uwep && quan==1` → `uwepgone` (idem quiver/swap)
9. `uball`/`uchain` → `unpunish`
10. sinon useup/useupf(1)

JS : (1) coins sans vault_gd ; (10) useup générique. 2–9 **sautés**. Manger une potion en cube : pas d’effet potion, objet détruit. Manger l’arme wielded : pas `uwepgone` — arme fantôme possible. C’est le « core » annoncé ; ce n’est pas un repas C.

`set_occupation(eatfood)` avant `lesshungry` : C le fait pour que choke voie l’occupation. JS aussi, puis `occupation=null`. Fidèle sur ce micro-ordre.

## `foodword` / matériaux

`foodwords[]` JS 22 entrées, ordre `objclass.h`. `MAT_WAX=2` … `MAT_DRAGON_HIDE=10` hardcodés dans `eat.js` au lieu d’importer les enums `mkobj.js` (`WOOD=8`, `DRAGON_HIDE=10`). Duplication de constantes — drift si un header bouge.

C `foodword` gem verre `makeknown` : gel cube + gem dknown identifie le type. JS non. Rare, non nommé.

## `getobj_eat` vs `eat_ok`

`edible_lets` utilise `is_edible` — les métaux apparaissent dans `[abc…]` une fois poly. C `eat_ok` SUGGEST si `is_edible`, EXCLUDE or non edible. JS : lettre hors liste mais dans invent → objet renvoyé → `doeat` « cannot eat that ». C refuse plus tôt dans `getobj`. Écart de **prompt/More**, pas de logique eat. Préexistant, plus visible maintenant que plus d’objets sont SUGGEST.

## Risques / dette
1. `doeat` rust monster `oerodeproof` + `rn2(10)` stun **absent, non nommé** — divergence RNG si un hero rust form mange du rustproof.
2. `eatspecial` creux : potion/anneau/artefact/weapon-wield.
3. `poison_strdmg` sans killer (`attrib.c` 4 args vs JS 2).
4. `getobj_eat` accepte une lettre non SUGGEST.
5. `useupall` sans `setnotworn`.
6. Constantes `MAT_*` dupliquées vs `mkobj.js`.
7. Vérif 44/44 n’exerce pas le cube/rust — le D-log « match C » n’est pas mesuré.

## Extrait C — rust monster sauté (le trou nommé ici, pas dans le D-log)

```2876:2910:nethack-c/upstream/src/eat.c
    if (is_metallic(otmp) && u.umonnum == PM_RUST_MONSTER
        && otmp->oerodeproof) {
        otmp->rknown = TRUE;
        /* split, Ulch, clear oerodeproof */
        make_stunned((HStun & TIMEOUT) + (long) rn2(10), TRUE);
        /* spit / dropy */
        return ECMD_TIME;
    }
```

Ce `rn2(10)` n’existe pas en JS après D-0936. `is_edible` accepte l’objet rustprone ; `doeat` enchaîne `doeat_nonfood` au lieu du spit. Un canary poly rust-monster + `oerodeproof` ferait diverger l’index RNG **et** l’inventaire. Le D-log liste beartrap/bars et PAPER, **pas** cette ligne. C’est un oubli de map, pas un deferral conscient.

`poison_strdmg` C `attrib.c:274` : `void poison_strdmg(int strloss, int dmg, const char *knam, schar k_format)` puis `losestr`/`losehp` avec killer. JS `eat.js` 2 args, `uhp -= dmg`, `gameover` sans `done()`. Mort par dague empoisonnée en cube : écran de mort JS pauvre. Préexistant, **réutilisé** ici comme si c’était le C.

`is_metallic` : `mat >= IRON && mat <= MITHRIL`. C macro identique. `MITHRIL=17` ajouté dans `mkobj.js` ; `PLASTIC=18` `GLASS=19` déjà là. Ordre matériaux : IRON 11 … MITHRIL 17 inclus (silver/gold/platinum/mithril). Un objet SILVER est metallic — C aussi. OK.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7/10**
- Si je ne devais retenir qu’une critique : `is_edible` est l’un des ports les plus branch-fidèles de ce lot, mais le cluster `doeat_nonfood` laisse un trou RNG (`oerodeproof` rust monster) hors map tout en vendant les chemins metallivore comme alignés C.
