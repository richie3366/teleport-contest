# Review 22 — `aa0daecd` — D-0954 `furniture_handled` + HOLE `goto_level`

## Métadonnées
- Hash complet / court : `aa0daecd5ffc1a6265e79aacae412a61add76447` / `aa0daecd`
- Parent : `d9c9f0a1f2628dc76c321638914ac3355f558e8d`
- Auteur, date : Raphaël Hervier, 2026-07-21 23:46:08 +0200
- D-id : **D-0954**
- Stats : 9 files, **+244 / −59**
- Fichiers JS / map / cadence : `js/dig.js` (+221), `js/fountain.js` (exports) ; map debt/turns ; journal #1223

## Intention vs livrable
Promesse : détruire fontaine/évier au creusement ; chute héros HOLE via `goto_level` ; migrate monstre ; fortress verte.

Livrable : `furniture_handled` fontaine/sink **oui** ; pont **`return true` sans `destroy_drawbridge`** ; HOLE héros **appelle** `goto_level` existant (`do.js:929`) avec les 4 flags C ; migrate thin ; `shopdig` **corps vide**. Ce n’est pas un shim d’alignement d’écran : c’est le vrai `goto_level`. Le risque est **d’ouvrir** `falling=true` (objets, chiens, ball&chain, bones) depuis un trou, avec des gardes C sautées.

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/dig.js` | Port `furniture_handled` ; réécriture `digactualhole` HOLE/PIT ; `dighole` fill |
| `js/fountain.js` | Wiring export `SET_FOUNTAIN_WARNED` / `dogushforth` |
| map / D-log | D-0954 + destroy_drawbridge / shopdig / desecrate_altar |

## Fidélité C ↔ JS

### `furniture_handled` — C `dig.c:571–592` / JS
C :
1. `IS_FOUNTAIN` → `dogushforth(FALSE)` ; `SET_FOUNTAIN_WARNED` ; `dryup(x,y,madeby_u)`
2. `IS_SINK` → `breaksink`
3. `DRAWBRIDGE_DOWN || is_drawbridge_wall(x,y) >= 0` → `find_drawbridge(&bx,&by)` ; `destroy_drawbridge(bx,by)`
4. sinon `FALSE` ; après 1–3 `TRUE`

JS 1–2 : **même ordre async** (gush RNG **avant** dryup, comme C). `dogushforth` exporté : déjà portait « await each gush so pline/water_damage RNG stay in C order » — bon réemploi.

JS 3 : `if (lev.typ === DRAWBRIDGE_DOWN) return true;` **sans** destroy, **sans** `is_drawbridge_wall`. Conséquences :
- Pont baissé : C détruit le pont (moat, messages, RNG). JS : **ni pont cassé ni `maketrap`** (early return de `digactualhole`).
- Case mur de pont-levis : C handled ; JS `FALSE` → tente PIT/HOLE sur du mur de pont.

C’est un stub **actif** : il change le graphe de contrôle en prétendant « meuble traité ».

### Tête `digactualhole` — C `dig.c:654–662`
C : si `at_u && utrap` : BURIEDBALL → `buried_ball_to_punishment` ; INFLOOR → `reset_utrap(FALSE)`. Puis `furniture_handled` return.

JS : INFLOOR `reset_utrap(false)` ; BURIEDBALL **commentaire vide**. Puis `if (await furniture_handled) return` — **avant** PIT/HOLE, bon locus.

Messages `IS_FURNITURE` « falls into the %s » portés. `desecrate_altar(FALSE, old_aligntyp)` : `void old_aligntyp` — **pas d’appel** (nommé). Autel creusé : fosse + message, **pas** de colère divine.

### PIT (compléments D-0950)
`wake_nearby` si `madeby_u` — **ajouté** (C `729`). `switch_terrain` toujours omis. `pickup(1)` si `oldobjs !== newobjs`.

`objects_at(x,y)` = tête Map `nexthere` (référence objet), pas un array frais. Comparaison **pointeur** ≡ C `svl.level.objects[x][y]` si `maketrap` relie/délie la tête. OK.

`wont_fall` recalc Lev/Fly **après** `switch_terrain` C ; JS recalc sans `switch_terrain` — lévitation encore bloquée par terrain encastré peut mentir.

### HOLE héros — C `dig.c:754–794` / JS — **haut risque**
C :
1. `switch_terrain` ; recalc Lev/Fly → `wont_fall`
2. `!ustuck && !wont_fall && !next_to_u()` → « jerked back by your pet » ; `wont_fall = TRUE`
3. si `ustuck || wont_fall` : `impact_drop(NULL,x,y,0)` ; pickup si pile changée ; shopdoor `pay ruin`
4. sinon :
   - `*u.ushops && heros_fault` → **`shopdig(1)`** (shk snatch pack)
   - else `pay_for_damage("dig into", TRUE)`
   - `You fall through...`
   - `newlevel.dnum = u.uz.dnum` ; `dlevel = u.uz.dlevel+1`
   - `goto_level(&newlevel, FALSE, TRUE, FALSE)`  /* at_stairs=F, falling=T, portal=F */
   - `spoteffects(FALSE)`

JS :
- `next_to_u` « always true » — **jamais** de jerk laisse.
- `impact_drop` omis.
- Shop : `if (ushops && heros_fault) { /* shopdig deferred */ } else { pay_for_damage('dig into', true) }`. En boutique, C **shopdig** ; JS **ni shopdig ni pay**. Chute shop **sans** vol pack et **sans** facture.
- `goto_level({dnum, dlevel: uz.dlevel+1}, false, true, false)` — **flags identiques**.
- `spoteffects(false)` après — match.

`js/do.js:goto_level` : `keepdogs`, `check_special_room(true)`, `recalc_mapseen`, `unplacebc` si Punished, `vision_recalc(2)`, `savelev`, load/mklev, `deferred_goto` ailleurs. Brancher `falling=true` active des bras (chute d’objets au niveau suivant, messages) **jamais** dans les 44 seeds. Un bug latent de `goto_level` (D-0915 ball, D-0852 hallu) devient un bug de creusement.

Garde d’existence du niveau : C s’appuie sur `Can_dig_down` / `dig_check` PITONLY pour ne pas HOLE en fond de donjon. JS D-0950 force PIT si `ttyp!==PIT && !Can_dig_down && !candig`. Reste `lev.candig` / earth : HOLE possible vers `dlevel+1` ; `goto_level` `new_ledger <= 0` return early (C `done(ESCAPED)` omis). **Falling into nowhere** = return silencieux après « You fall through... » possible si ledger pourri.

### HOLE monstre — C `dig.c:795–826`
Gardes : `!grounded || (wormno && count_wsegs>5) || msize>=MZ_HUGE` return ; `mtmp==u.ustuck` return ; `teleport_pet` puis stronghold→`valley_level` / botlevel avoid pline / `get_level(depth+1)` ; `isshk` → `make_angry_shk` **omis JS** ; `migrate_to_level(ledger_no(&tolevel), MIGR_RANDOM, NULL)`.

JS suit le squelette. `ledger_no` **copie locale** (cycle dig↔do). `valley_level` absent → **return** sans migrate (C assignerait). `migrate_to_level` déjà dans `teleport.js` — réemploi, pas un nouveau moteur.

### `dighole` fill — C `dig.c:996`
```
if (typ != ROOM) {
    if (!furniture_handled(dig_x, dig_y, TRUE)) {
        lev->typ = typ;
        liquid_flow(...);
    }
    retval = TRUE;
}
```
D-0951 remplissait **toujours**. D-0954 ajoute l’`if (!furniture_handled)`. Creuser une fontaine qui se remplit d’eau : C gush+dryup **sans** transformer en POOL d’abord ; JS aussi. Correct.

## Constitution / playbook
Pas FORCE/DIAG/fs/fastforward. `goto_level` déjà async. Pas de nouvel `nhgetch`. RAS Rule #2. Pas de coordonnées de seed dans le contrôle.

## Densité (§2b)
**Right size** (~221 LOC) : callee `furniture_handled` + bras HOLE du même `digactualhole`. Une famille. Le danger n’est pas la largeur §2b, c’est **l’effet de bord niveau**.

## Documentation
Map nomme destroy_drawbridge, desecrate_altar, shopdig, impact_drop, grave. D-log « fixed » alors que DRAWBRIDGE `return true` est un **mensonge de contrôle**, pas une omission passive. Sous-nommé : « skip maketrap » sans « pont intact ». `shopdig` « deferred » = no-op **sur le chemin chute shop**, pas un polish.

## Vérification
green+cohort. Aucun seed public ne tombe dans un HOLE auto-creusé ni ne `destroy_drawbridge`. `goto_level(..., falling=true)` n’est pas une path fortress. Preuve = non-régression. Journal « suite fortress held » ne dit **rien** sur savelev mid-hole.

## Side effects `goto_level` (pourquoi c’est risqué)
`do.js:goto_level` n’est pas un stub. Il fait déjà, entre autres :
- `keepdogs(false)` — pets suivent ou sont laissés
- `check_special_room(true)` en partant
- `unplacebc` si Punished (D-0915)
- `vision_recalc(2)` + Hallu `vision_off_newsym_gbuf` (D-0852)
- `savelev` stash + flags VISITED
- load / `mklev` du niveau cible
- `u_on_newpos` / temperature / tutorial branch

C `falling=TRUE` change le placement (pas un escalier) et le sort des objets (une partie est dans `goto_level`, une partie dans `impact_drop` **avant** l’appel — JS saute `impact_drop`). Brancher ce chemin depuis `digactualhole` **sans** `shopdig` / laisse / pont est un demi-port : le héros **peut** changer de `uz` alors que le C aurait :
- resté (jerk pet, lev, pont destroy sans hole),
- ou chuté **après** snatch shop.

`fountain.js` : `dogushforth` déjà async et RNG-ordonné. Réexport = bon 1:1. `breaksink` / `dryup` non relus dans ce commit (préexistants). Si `dryup` est thin, `furniture_handled` hérite de cette thinness.

`SET_FOUNTAIN_WARNED` force le bit `F_WARNED` pour que `dryup` ne early-return pas (commentaire C « force dryup »). Export nécessaire : avant, la fonction était locale. Vérifier que `looted |= F_WARNED` match `rm.h`. Si `F_WARNED` JS ≠ C, gush sans dryup (fontaine éternelle) ou dryup sans gush.

`migrate_to_level` : si JS est thin (monstre disparaît sans `MIGR_RANDOM` fidèle), un monstre adjacent HOLE est un désync de population, pas d’écran héros immédiat. `make_angry_shk` omis : shopkeeper qui tombe reste paisible — facture/hot_pursuit plus tard faux.

`count_wsegs > 5` : `count_wsegs` import `worm.js`. Si worm.js stub rend 0, un long worm **tombe** alors que C le refuse. Inverse : stub 99, jamais de chute. Non relu.

### `next_to_u` / `shopdig` / `impact_drop` — les trois gardes sautées
C `next_to_u` (`dog.c`) : FALSE si un pet **en laisse** n’est pas adjacent (le héros est tiré en arrière, `wont_fall=TRUE`, **pas** de `goto_level`). JS commentaire « always true » : **jamais** de jerk. Un héros laissé + HOLE **change de niveau** en JS ; C reste. RNG `goto_level` (mklev, keepdogs, …) **en trop**. Écran « jerked back » absent.

C `shopdig(1)` (`shk.c`) : le shk **vole le pack** (ou une partie) **avant** la chute, pose unpaid, peut `hot_pursuit`. JS `{ /* shopdig deferred */ }` dans le `if (*ushops && heros_fault)` : branche **prise** (pas de fallthrough vers `pay_for_damage("dig into")`). Donc : chute shop **sans** snatch **et sans** pay. Pire que « shopdig thin » : c’est un **trou de contrôle** — le `else` C pay n’est pas un fallback JS.

C `impact_drop(NULL,x,y,0)` seulement si `ustuck || wont_fall` (héros **reste**, objets peuvent tomber). JS omet : objets restent sur le HOLE sous un héros volant/lévitant. Moins de RNG `flooreffects` / `rloco`. Inverse : héros qui **chute**, C délègue aux objets dans `goto_level` ; JS aussi via `goto_level` existant — `impact_drop` n’est pas sur ce bras. Omission = bras « reste ».

### Signature `goto_level`
C `do.c` : `goto_level(newlevel, at_stairs, falling, portal)`. JS `goto_level(newlevel, false, true, false)` — **les trois booléens C**. `falling=true` sélectionne placement chute (pas `u_on_sstairs`) et messages d’arrivée. Si JS `goto_level` ignore le 3ᵉ argument (beaucoup de ports early ignoraient des flags), **tout** ce commit HOLE est un no-op de placement. Le review assume que `do.js` **lit** `falling` (D-0915 / commentaires). À falsifier : breakpoint / dump `falling` dans `goto_level` sur un HOLE forcé.

`newlevel.dlevel = uz.dlevel+1` **même `dnum`**. Pas de `dungeon` change. `get_level` C pour monstres peut viser valley ; héros **toujours** +1. JS héros +1 : match. Si `dlevel+1` n’existe pas (`Can_dig_down` aurait dû empêcher), C ne devrait pas arriver ici ; JS D-0950 `PITONLY` si `!Can_dig_down`. Reste `candig` / quest : HOLE vers un ledger mort → `goto_level` early return **après** « You fall through... ».

`spoteffects(FALSE)` après : C messages salles spéciales. JS `spoteffects(false)` — si thin, salle zoo silencieuse en arrivant par trou. Préexistant.

### `shopdig(1)` C `shk.c:5019` — ce que le no-op saute
`fall=1` (chute) :
1. pas de shk / `!inhishop` → Knight `adjalign` possible puis return (JS : **rien**, même pas Knight thief)
2. sinon `!um_dist(shk, 5) && !helpless && (billct||debit)` :
   - `mnexto` si pas adjacent ; échec → curse/growl + `rile_shk` **sans** voler
   - succès : « grabs your backpack »
   - boucle `gi.invent` : saute worn (sauf swap/quiver) et laisse ; `do_take` le reste
JS : commentaire vide. Héros chute **avec** tout le pack. Facture shop / `hot_pursuit` plus tard fausse. RNG `mnexto` / `rloc` **sautés**.

`shopdig(0)` (creusement PIT, pas chute) : verbalize « do not damage the floor ». Pas ce bras HOLE. D-0951 occupation pourrait l’appeler ; hors D-0954.

### Pont `DRAWBRIDGE_DOWN` (état **de ce commit**, pas HEAD)
```
if (lev.typ === DRAWBRIDGE_DOWN) return true;
```
Pas `is_drawbridge_wall`, pas `find_drawbridge`, pas `destroy_drawbridge`. `digactualhole` **return** avant `maketrap`. C : destroy (moat, RNG, messages, peut tuer). JS : pont intact, **pas** de fosse. Un joueur qui creuse un pont « réussit » (temps consommé) sans effet. Map dit « skip maketrap » : vrai mécaniquement, **faux** sémantiquement (C ne skip pas : il **détruit**).

HEAD ultérieur (D-0959) a pu brancher `destroy_drawbridge` — **hors** cette review. Ici le contrôle ment.

`dighole` fill : `if (!furniture_handled) { typ=POOL/MOAT; liquid_flow }`. Fontaine : handled → **pas** de POOL par-dessus le dryup. Correct vs C `dig.c:996`. Si `furniture_handled` pont `return true` sans destroy, `dighole` **ne** remplis **pas** non plus — pont sec éternel.

HOLE monstre `valley_level` : C stronghold → migrate vers Valley. JS **return** sans migrate si `valley_level` absent. Un démon sur fort qui tombe **disparaît** du graphe (ou reste) selon le stub `migrate_to_level`. Population, pas écran héros immédiat.

`teleport_pet` avant migrate : si JS no-op true, un pet laissé tombe ; C peut refuser. Non relu.

`u_on_newpos` après falling : placement **pas** sur un escalier. Si JS `goto_level` ignore `falling` et pose le héros sur des stairs du niveau+1, écran + traps. À falsifier en dump `ux,uy,uz` post-HOLE.

## Risques / dette
1. **`DRAWBRIDGE_DOWN` handled sans destroy** — ni fosse ni pont.
2. **`shopdig(1)` vide** — chute shop sans snatch / sans pay `dig into`.
3. **`goto_level` falling** — surface savelev/chiens/boulet ; bugs existants réveillés.
4. `next_to_u` / `impact_drop` / `desecrate_altar` / `buried_ball_to_punishment` / `make_angry_shk`.
5. `is_drawbridge_wall` absent.
6. « You fall through... » puis `goto_level` no-op si ledger invalide.

## Verdict
- Verdict : **QUALITY-RISK**
- Note : **5/10**
- Si je ne devais retenir qu’une critique : appeler `goto_level(..., falling=true)` est le bon locus C, mais le pont « handled » sans destroy et le `shopdig` no-op font que les deux side-effects les plus dangereux du bras HOLE sont soit menti, soit sautés.
