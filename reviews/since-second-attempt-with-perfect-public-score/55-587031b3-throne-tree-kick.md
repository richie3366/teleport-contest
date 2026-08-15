# Review 55 — `587031b3` — throne/tree kick + `fall_through` + thin `scatter`

## Métadonnées
- Hash complet / court : `587031b318187b5b9975bc1a97d8150f6d5b880c` / `587031b3`
- Parent : `34c147f55113fbd0ac9b82d88cb9a530709c012b`
- Auteur, date : Raphaël Hervier, 2026-07-22 03:10:25 +0200
- D-id : **D-0986**
- Stats : 11 files, +491/−43
- Fichiers JS / map / cadence : `js/dokick.js`, `js/explode.js`, `js/trap.js` ; `docs/c-js-map/absent.md` / `debt.md` / `turns.md` ; journal #1256 (pas de cadence)

## Intention vs livrable
« Finish the kick_nondoor furniture envelope » : throne destroy/loot/shaft, tree fruit+abeilles, plus `fall_through` héros (trous). Livrable : ces bras + `scatter` MAY_HIT thin + wire `trapeffect_hole` héros → `fall_through`. Titre exact. Suite naturelle de D-0985 (qui avait laissé throne/tree en ouch). Pas de cadence mixte.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/dokick.js` | Port throne + tree dans `kick_nondoor` ; `rnd_treefruit_at` local |
| `js/explode.js` | Port thin `scatter` (MAY_HIT) |
| `js/trap.js` | Port `fall_through` ; wire `trapeffect_hole` héros |
| map absent/debt/turns | Throne/tree retirés des omits kick_nondoor |

## Fidélité C ↔ JS

### Throne `kick_nondoor`
**C :** `dokick.c:1016-1063`. JS :
1. Lev → `kick_dumb`
2. `(Luck<0 || looted) && !rn2(3)` → typ ROOM, `mkgold(rnd(200))`, CRASH, DEX
3. `Luck>0 && !rn2(3) && !looted` → `mkgold(rn1(201,300))` ; `i=min(Luck+1,6)` × `mksobj_at(rnd_class(DILITHIUM, LUCKSTONE-1), FALSE, TRUE)` ; `looted=T_LOOTED`
4. `!rn2(4)` → si `dunlev < dunlevs_in_dungeon` `fall_through(FALSE,0)` sinon ouch
5. sinon ouch

**Confirmation RNG :** les `rn2(3)` / `rn2(4)` sont dans des `if` successifs (pas else-if C… **C est else-if**). C :

```
if ((Luck < 0 || looted) && !rn2(3)) { destroy; return; }
else if (Luck > 0 && !rn2(3) && !looted) { loot; return; }
else if (!rn2(4)) { shaft or ouch; return; }
kick_ouch; return;
```

JS : `if` destroy return ; `if` loot return ; `if` shaft return ; ouch. **Pas de `else`.** Si destroy échoue (`rn2(3)` vrai mais condition Luck/looted fausse), C ne tire **pas** le second `rn2(3)` (else-if). JS **tire** le loot `rn2(3)` puis éventuellement `rn2(4)`. **Désync RNG** sur trône non looted Luck≥0 : C un seul `rn2(3)` (loot) puis éventuellement `rn2(4)` ; wait:

Cas Luck>0 !looted :
- C : skip 1er if (Luck<0||looted faux) **sans** tirer rn2(3) ; 2e else-if tire rn2(3)
- JS : 1er if `(Luck()<0 || loc.looted) && !rn2(3)` — Luck≥0 et !looted → **court-circuit, pas de rn2**. Identique.

Cas Luck<0 :
- C : 1er if tire rn2(3) ; si fail, else-if Luck>0 faux **sans** 2e rn2(3) ; else-if rn2(4)
- JS : 1er if tire rn2(3) ; si fail, 2e if Luck>0 faux **sans** rn2 ; 3e rn2(4). Identique.

Court-circuit JS `&&` sauve l’ordre. OK.

`Luck()` = `uluck+moreluck` sans `LUCKADD` stone ? C `Luck` macro plus riche (luckstone). **Écart possible.**

`dunlev` / `dunlevs_in_dungeon` JS via `game.dungeons[dnum].num_dunlevs`. Fragile si table incomplète (défaut 1 → shaft jamais).

### Tree
**C :** `dokick.c:1135-1192`. 75/23.5/1.5 via `rn2(3)` ouch (+ `!rn2(6)` buzzing) ; sinon `rn2(15) && !TREE_LOOTED && rnd_treefruit_at` → quan `8-rnl(7)`, scatter MAY_HIT, leftover message + `dealloc_obj` ; sinon `!TREE_SWARM` → `rnl(4)+2` killer bees `enexto`+`makemon MM_ANGRY|MM_NOMSG`.

JS : `TREEFRUITS` hardcodé 5 otyps + `rn2`. C `rnd_treefruit_at` table plus large (parfois slime mold etc.). **Écart table fruit.**

**Écart leftover :** C `mksobj` + message + `dealloc_obj`. JS `mksobj` sans dealloc — objet **orphelin** (OBJ_FREE jamais libéré). Fuite, pas un place au sol.

Buzzing : JS `You_hear` local (Deaf). C `You_hear`. OK.

### `scatter` thin
**C :** `explode.c:721+` (long). JS envelope : split `rnd(quan-1)` ; dir `rn2(N_DIRS)` ; range `rnd(max(1, blastforce-owt/40))` — **clamp puis rnd, comme C** ; vol ; stop !isok / !ZAP_POS / closed_door / sink ; `MAY_HITMON` `ohitmon` ; `MAY_HITYOU` `thitu` ; place+stack.

Tree passe `MAY_HIT` (= HITMON|HITYOU). Les deux bits JS matchent.

Omits nommés : MAY_FRACTURE/DESTROY ; shop credit/`stolen_value` ; **flooreffects always place** ; VIS_EFFECTS ; uball shatter ; hideunder. Pour un fruit d’arbre, FRACTURE ne s’applique pas. Shop fruit kick in boutique : pas de bill — dette réelle.

C `credit_report` en tête si shop_origin — JS skip (RNG/msgs shop).

### `fall_through`
**C :** `trap.c:602+`. JS : early Blind+Lev+!Sokoban ; msgs td vs surface ; dont_fall Lev/ustuck/!Can_fall_thru/Flying/clinger/ceiling_hider/MZ_HUGE ; **`next_to_u` named always-true** ; impact_drop si dont_fall ; TOOKPLUNGE swoop ; `shopdig(1)` ; stronghold `find_hell` ; shaft depth pline ; `schedule_goto` FALLING.

Thin vs C : pas de dégâts de chute détaillés ici (dans `goto_level` ?) ; Lev sticky ; `feeltrap` réduit ; `display_nhwindow` ≈ `flush_topl_more`.

Wire : `trapeffect_hole` héros appelle `fall_through(true, trflags & TOOKPLUNGE)` au lieu du defer. C passe plus de `ftflags`. Si d’autres bits que TOOKPLUNGE comptent, perte.

### Citation C — throne else-if (`dokick.c:1016`)

```c
    if (IS_THRONE(gm.maploc->typ)) {
        if (Levitation) { kick_dumb(x, y); return ECMD_TIME; }
        if ((Luck < 0 || gm.maploc->looted) && !rn2(3)) {
            gm.maploc->typ = ROOM;
            (void) mkgold((long) rnd(200), x, y);
            ...
            return ECMD_TIME;
        } else if (Luck > 0 && !rn2(3) && !gm.maploc->looted) {
            (void) mkgold((long) rn1(201, 300), x, y);
            i = Luck + 1;
            if (i > 6) i = 6;
            while (i--)
                (void) mksobj_at(rnd_class(DILITHIUM_CRYSTAL, LUCKSTONE - 1),
                                 x, y, FALSE, TRUE);
            gm.maploc->looted = T_LOOTED;
            return ECMD_TIME;
        } else if (!rn2(4)) {
            if (dunlev(&u.uz) < dunlevs_in_dungeon(&u.uz)) {
                fall_through(FALSE, 0);
            } else kick_ouch(x, y, "");
            return ECMD_TIME;
        }
        kick_ouch(x, y, "");
        return ECMD_TIME;
    }
```

JS `&&` court-circuit : Luck≥0 !looted **ne tire pas** le 1er `rn2(3)` — comme C skip du 1er if. **Confirmation RNG** déjà détaillée. `rnd_class(DILITHIUM, LUCKSTONE-1)` : JS doit tirer la même étendue d’otyp. Si `LUCKSTONE-1` JS ≠ C, loot gemme faux.

Tree leftover C :

```c
            otmp = rnd_treefruit_at(x, y);
            if (otmp) {
                otmp->quan = 8 - rnl(7);
                ...
                scatter(..., MAY_HIT, otmp);
                if (otmp->quan) {
                    pline("You produced some leftover %s.", ...);
                    dealloc_obj(otmp); /* leftover not placed */
                }
```

JS `mksobj` leftover **sans** `dealloc_obj` : l’objet reste dans le heap JS (`OBJ_FREE`). Pas de place_object, donc pas de fortress screen — **fuite**, pas un FAIL d’écran.

`fall_through` callers C : throne kick ; `trapeffect_hole` ; quelques dig. JS : throne + `trapeffect_hole` héros. Dig `fall_through` si déjà branché ailleurs — hors ce commit.

`scatter` callers C : tree, explode, wand, etc. JS n’exporte que le thin MAY_HIT pour tree. Un explode futur ne doit pas réutiliser ce thin comme « scatter complete ».


### RNG throne — relecture court-circuit

JS `if ((Luck()<0 || loc.looted) && !rn2(3))`. Opérateur `&&` : si Luck≥0 et !looted, **pas** de `rn2(3)`. C 1er `if` idem. 2e `if (Luck>0 && !rn2(3) && !looted)` : C else-if donc le 2e `rn2(3)` seulement si le 1er if est faux. JS 2e `if` indépendant mais le 1er n’a pas tiré — même compteur.

Cas Luck==0 !looted : C skip 1er (pas de rn2), skip 2e (Luck>0 faux, pas de rn2), tire `rn2(4)` shaft. JS identique. **Confirmation.**

`rnd(200)` destroy gold ; loot `rn1(201,300)` = `201+rn2(300)` C. JS `rn1` doit matcher. `rnd_class(DILITHIUM, LUCKSTONE-1)` : N appels dans un `while (i--)`.

Tree : `rn2(3)` ouch (75 %) ; dans ouch `!rn2(6)` buzzing ; else `rn2(15)` fruit gate ; `rnl(7)` quan ; scatter dirs `rn2(N_DIRS)` + `rnd` range ; swarm `rnl(4)+2` bees. JS table fruit plus courte change **quel** otyp, pas le **nombre** de `rn2` du gate `rn2(15)` — sauf si `rnd_treefruit_at` C tire dans la table. C `rnd_treefruit_at` = `mksobj` d’un otyp tiré : **un RNG de plus** (choix d’otyp). JS `rn2(TREEFRUITS.length)` : un RNG aussi. Cardinal OK, distribution **non**.

`fall_through` : peu de RNG dans le helper (msgs, `schedule_goto`). `next_to_u` always-true saute un échec leash C (peut tirer ailleurs). Named.

`scatter` MAY_HIT : `ohitmon` / `thitu` peuvent tirer. Tree fruit léger : `owt/40` petit, range `rnd(max(1, blastforce-...))`. Clamp-then-rnd comme C.

## Constitution / playbook
Grep `git show 587031b3 -- js/` : `FORCETRAP` existant = flag C, pas FORCE trace. Pas de `DIAG`/`getRngLog`/`readFileSync`/`from 'fs'`/`node:`/`fastforward`. Pas de seed en contrôle. Frozen intacts.

`await import` `shopdig` / `schedule_goto` : ESM, pas fs. Rule #2 RAS. `fall_through` async via `schedule_goto` — pas une 2e frontière `nhgetch`.

1:1 : throne/tree dans `dokick.js` comme C `dokick.c` ; `scatter` C `explode.c` → `explode.js` ; `fall_through` C `trap.c` → `trap.js`. `rnd_treefruit_at` local JS (table réduite) au lieu du helper C `mkobj.c`.

Pas de filet d’alignement. Pas d’entrée `fastforward.js`.

## Densité (§2b)
**Right size.** Finir `kick_nondoor` + callees `fall_through`/`scatter` nécessaires au throne/tree. +491 au plafond. `scatter` pourrait être un commit suivant ; ici c’est le callee tree, pas explode combat. Pas un 2e sous-système inventé.

## Documentation
D-0986 « fixed » + scatter MAY_* / shop / flooreffects / `kick_object` nommés. Map absent.md retire « kicking beyond… throne fall_through, tree scatter ». **Pas** d’overclaim scatter complet. Leftover `dealloc_obj` **non nommé**. Table fruit réduite **peu nommée**.

Journal #1256 : green + kick 19/20. Pas de cadence (la #1255 était *before* D-0985).

## Vérification
Cohorte kick pertinente. `fall_through` héros trou : pas forcément dans les 19 seeds (held-out). Fortress publique non re-cadencée depuis le mix #1255. Preuve journal.

`scatter` MAY_HIT tree : fruit kick n’est pas un seed public typique.

## Risques / dette
1. `dealloc_obj` leftover fruit manquant — fuite `OBJ_FREE`.
2. Table `rnd_treefruit_at` réduite (5 otyps).
3. `scatter` sans flooreffects/shop (nommé) — fruit en lave se place.
4. `Luck()` / `dunlevs_in_dungeon` approximatifs.
5. `next_to_u` always-true (leash).
6. `kick_object` toujours omit.
7. `mksobj_at` gems throne : étendue `rnd_class` à vérifier vs C `LUCKSTONE-1`.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7/10**
- Si je ne devais retenir qu’une critique : throne/tree suivent l’enveloppe C (dont l’ordre des `rn2` grâce au court-circuit), mais `scatter` « thin » et le `mksobj` leftover sans `dealloc_obj` laissent une fuite et des landings hors C.
