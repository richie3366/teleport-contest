# Review 14 — `9fc68ca2` — kick_door shop / town watch + cadence #1215

## Métadonnées
- Hash complet / court : `9fc68ca2be157a4087f64eb660a21a9a9561c448` / `9fc68ca2`
- Parent : `0138ada278b3a8051dd09dd17ed5608cdbcf295f`
- Auteur, date : Raphaël Hervier, 2026-07-21 22:56:12 +0200
- D-id (ou absence) : **D-0947 dans le corps / D-log**. Sujet : **pas de D-id**.
- Stats : 7 files, +138 / −33
- Fichiers JS / map / cadence : `js/dokick.js` +96 ; CURRENT score **#1215** 44/44 ; NOTES cadence next #1220

## Intention vs livrable
Sujet : port `kick_door` shop bill / town watch **et** refresh #1215. Corps : D-0947, `in_rooms` + `add_damage`/`pay_for_damage("break")` + watch arrest/warn. Livrable = ce mélange. Même pattern que D-0942/#1210.

## Inventaire

| Fichier | Rôle |
|---|---|
| `js/dokick.js` | Port : shopdoor live + watch helpers + `get_iter_mons*` locaux |
| `docs/c-js-map/debt.md` | Nouvelle ligne `dokick.js` D-0947 ; eat.js retire dokick des pay sites |
| D-log / INDEX | D-0947 fixed ; suite 44/44 @#1215 |
| CURRENT / NOTES | Score #1215, speed `31+0.29/turn` |

## Fidélité C ↔ JS

### `kick_door` — C `dokick.c:910` / JS `dokick.js:351`
Avant : `const shopdoor = false` (dette nommée). Après : `!!in_rooms(x, y, SHOPBASE)` = C `*in_rooms(x,y,SHOPBASE)`.

Succès (doorbuster / `rnl(35) < chance`) :
- trap / shatter `A_STR>18 && !rn2(5) && !shopdoor` / crash `D_BROKEN` — **préexistant**, pas relus ici ligne à ligne.
- C `feel_newsym` ; JS `newsym` (préexistant ?).
- **Nouveau** : `if (shopdoor) { add_damage(x,y,SHOP_DOOR_COST); pay_for_damage("break", false); }` — C `dokick.c:953-955`. Coût 400 = `hack.h` `SHOP_DOOR_COST`.
- **Nouveau** : `if (in_town(x,y)) get_iter_mons(watchman_thief_arrest)`.

Échec : C `Blind` → `feel_location` (JS omis, nommé) ; `exercise STR` ; Thwack/Whammm `Deaf \|\| !rn2(3)` (préexistant) ; `in_town` → `get_iter_mons_xy(watchman_door_damage, x, y)`.

**Callers :** `kick_door` déjà appelé depuis `dokick` hero kick. Pas de nouveau entrypoint. `pay_for_damage` existait (D-0942) — ce commit **branche le call site C manquant**, ce n’est pas un second port de shk.

### Watch helpers — C `dokick.c:834-860`
`watchman_thief_arrest` : `is_watch && couldsee && mpeaceful` → yell + `angry_guards(FALSE)`.
`watchman_door_damage` : même vision ; si `looted & D_WARNED` arrest else warn + `looted |= D_WARNED`.

JS : `verbalize` au lieu de `mon_yells` (SetVoice/Deaf nommés). `couldsee` importé de `vision.js`. `D_WARNED` sur `loc.looted`. **Branche warn-then-arrest OK.**

### `get_iter_mons` — C `mon.c:4544` / JS local `dokick.js`
C : `fmon`, skip `DEADMONSTER` **et** `mon_offmap`, stop au premier `bfunc` true.
JS : skip `mhp<=0` ou `mx<=0`. `mon_offmap` ≠ seulement `mx<=0` (migrating, etc.). Approximation. Helpers **locaux** : pas un port `mon.c` réutilisable (explode/fountain ont d’autres watch).

`async bfunc` : C est synchrone. `verbalize`/`angry_guards` async force le wrapper. Pas de RNG dans l’itérateur lui-même.

## Constitution / playbook
Grep JS : RAS FORCE/fs/fastforward. `await import('./shk.js')` / `mon.js` — OK. Pas de seed dans le contrôle.

## Densité (§2b)
**Right size** (côté JS : 96 lignes, un locus `kick_door`). Le problème n’est pas la densité, c’est le **mélange cadence**.

## Documentation
D-0947 nomme Blind `feel_location`, `mon_yells`, explode/apply/`dig` occupation encore ouverts. Sujet sans D-id. CURRENT post-D-0947 reconfirm @#1215. Map ajoute `dokick.js` plutôt que de tout laisser dans eat.js — mieux.

## Vérification
Journal : full sessions 44/44 Scr 11405 RNG 100% speed `31+0.29/turn` ; green ; kick/shop cohort 12/12. Comme #1210 : affirmation collée au port. R² speed 0.883 vs 0.875 — cosmétique. Rien n’indique que le cohort **casse une porte de boutique** (shopdoor true). Fortress tenue ≠ `pay_for_damage("break")` exercé.

## `kick_door` succès : shop vs shatter

C : `ACURR(A_STR) > 18 && !rn2(5) && !shopdoor` → shatter `D_NODOOR` ; sinon crash `D_BROKEN`. **`!shopdoor` empêche le shatter en boutique** (la porte boutique devient broken, pas nodoor). JS préexistait. Ce commit ne doit **pas** avoir cassé ce `!shopdoor`. Une fois `shopdoor` vrai, on ne shatter plus — **C**, et `add_damage(SHOP_DOOR_COST)` suit.

Trap : `D_TRAPPED` → `D_NODOOR` + `b_trapped("door", FOOT)` **avant** add_damage. C aussi. Shop trap door : toujours billed. OK.

`SHOP_DOOR_COST = 400` JS const.js / C `hack.h`. Match.

## `in_town` / `in_rooms`

JS importe `in_rooms`, `in_town` depuis `hack.js`. Si `in_town` est un stub true/false, watch **toujours** ou **jamais**. Non relu dans ce diff. `in_rooms(x,y,SHOPBASE)` : D-0942 s’en sert déjà dans `pay_for_damage` — plus fiable.

Watch **après** pay. C aussi (`add_damage`/`pay` puis `in_town` arrest). Un yn mollify dans `pay_for_damage` **avant** « Halt, thief! ». Ordre C. Si le héros paie, C arrête quand même (pas de garde). JS aussi.

Échec kick : **pas** de `pay_for_damage` ; seulement warn/arrest. C. `D_WARNED` sur `looted` : premier échec warn, second arrest. Persistent sur la case. OK.

## `get_iter_mons` premier match

C s’arrête au **premier** watchman `bfunc` true (ordre `fmon`). Un second watchman ne crie pas. JS `return mtmp` au premier. **OK.** Ordre `fmon` JS vs C `nmon` : si JS `fmon` est un array d’insertion différent de la liste C, **quel** watchman crie change (écran). Préexistant représentation `fmon`.

`async` : `bfunc` await verbalize. Pas de RNG dans yell. `angry_guards(false)` : import dynamique `mon.js` (D-0941).

## Cadence collée

CURRENT : #1210 → #1215, mêmes 11405/11405 et 792838 RNG, speed `31+0.26` → `31+0.29`, R² 0.875 → 0.883. **Aucun écran n’a bougé.** Le port n’est pas censé changer la suite publique (kick boutique hors seeds). Cadence = reconfirm fortress. La coller au port D-0947 rend le D-id « suite 44/44 » alors que le port n’est pas ce qui a été mesuré. Même smell D-0942.

Sujet sans D-id : le corps en a un. Flag.

## Map

Nouvelle row `js/dokick.js` plutôt que d’allonger eat.js. Blind `feel_location`, `mon_yells`, giant doorbuster, SDOOR/`kick_nondoor` nommés. eat.js retire « dokick » des pay sites restants (explode/apply/dig occupation restent). **Map honnête.**

## Risques / dette
1. Commit **hybride** port + cadence — même smell que D-0942.
2. `get_iter_mons` local ≠ `mon_offmap` C ; duplication vs `mon.c`.
3. `mon_yells` → `verbalize` (Deaf/SetVoice).
4. `feel_location` Blind omis.
5. Giant doorbuster / SDOOR / `kick_nondoor` toujours deferred (map).
6. Autres `pay_for_damage` C (explode/apply/pickaxe/`bhit`) toujours morts à ce hash.
7. `in_town` stub possible ; ordre `fmon` vs `nmon`.
8. Cohort kick/shop peut n’avoir aucune porte `SHOPBASE`.

## Extraots C `kick_door` / watch

```953:968:nethack-c/upstream/src/dokick.c
        if (shopdoor) {
            add_damage(x, y, SHOP_DOOR_COST);
            pay_for_damage("break", FALSE);
        }
        if (in_town(x, y))
            (void) get_iter_mons(watchman_thief_arrest);
    } else {
        if (Blind)
            feel_location(x, y);
        exercise(A_STR, TRUE);
        pline("%s!!", (Deaf || !rn2(3)) ? "Thwack" : "Whammm");
        if (in_town(x, y))
            (void) get_iter_mons_xy(watchman_door_damage, x, y);
    }
```

Watch C :

```834:843:nethack-c/upstream/src/dokick.c
watchman_thief_arrest(struct monst *mtmp)
{
    if (is_watch(mtmp->data) && couldsee(mtmp->mx, mtmp->my)
        && mtmp->mpeaceful) {
        mon_yells(mtmp, "Halt, thief!  You're under arrest!");
        (void) angry_guards(FALSE);
        return TRUE;
    }
    return FALSE;
}
```

```846:861:nethack-c/upstream/src/dokick.c
watchman_door_damage(struct monst *mtmp, coordxy x, coordxy y)
{
    if (is_watch(mtmp->data) && mtmp->mpeaceful
        && couldsee(mtmp->mx, mtmp->my)) {
        if (levl[x][y].looted & D_WARNED) {
            mon_yells(mtmp,
                      "Halt, vandal!  You're under arrest!");
            (void) angry_guards(FALSE);
        } else {
            mon_yells(mtmp, "Hey, stop damaging that door!");
            levl[x][y].looted |= D_WARNED;
        }
        return TRUE;
    }
    return FALSE;
}
```

`get_iter_mons` C skip `mon_offmap` :

```4544:4556:nethack-c/upstream/src/mon.c
get_iter_mons(boolean (*bfunc)(struct monst *))
{
    struct monst *mtmp, *mtmp2;

    for (mtmp = fmon; mtmp; mtmp = mtmp2) {
        mtmp2 = mtmp->nmon;
        if (DEADMONSTER(mtmp) || mon_offmap(mtmp))
            continue;
        if ((*bfunc)(mtmp))
            break;
    }
    return mtmp;
}
```

JS au commit : `shopdoor = !!in_rooms(x, y, SHOPBASE)` ; `verbalize` pas `mon_yells` ; `get_iter_mons` local `mx<=0`. `kick_nondoor` / SDOOR **non** touchés (reste deferred map). `feel_location` Blind : `kick_dumb` JS l’a déjà ; `kick_door` fail path ne l’ajoute pas — C si.

`rnl(35)` succès : préexistant, RNG inchangé par ce commit **sauf** si `shopdoor` vrai change shatter (`!shopdoor` dans `!rn2(5)`). Activer shopdoor **supprime** un `rn2(5)` shatter en boutique — **C**, et **consomme un RNG de moins** qu’un faux `shopdoor=false` qui shatterait. Si un seed kick une porte boutique, le log RNG **bouge**. Cadence 792838 inchangé ⇒ soit aucun seed n’emprunte ce bras, soit le runner n’a pas été relancé, soit shopdoor reste faux en pratique (pas de SHOPBASE sous le kick).

`kick_ouch` / `kick_dumb` : non touchés. Levitation fail path C `kick_ouch` early return avant shop — JS préexistant. Pas de bill en lévitation (pas de leverage) — C.

`doorbuster = Upolyd && is_giant` : C skip `rnl(35)` entier (pas de ce `rnl` si géant). JS préexistant. Ce commit n’ajoute pas le géant ; map le nomme encore « giant doorbuster poly completeness ». Si JS `is_giant` est faux pour le poly, un géant consomme `rnl(35)` extra vs C.

Town watch sur **échec** n’appelle pas `pay_for_damage`. Un warn `D_WARNED` sans shk. Deuxième échec : arrest `angry_guards`. Pas de `rn2` dans les helpers watch (C `mon_yells` non plus). Seul drift RNG possible vs pre-commit : le `rn2(5)` shatter évité en boutique.

`is_watch` import `monsters.js`. Si le predicat JS ≠ watchman C, silence. Préexistant D-0941 `angry_guards`.

## Verdict
- Verdict : **PROCESS-SMELL**
- Note /10 : **6.5**
- Une phrase : `shopdoor=false` → `in_rooms` + bill `"break"` est le bon call site C, mais le sujet sans D-id recoud ça à la cadence #1215 et les watchmen sont un `verbalize` local, pas `mon_yells`/`get_iter_mons` de `mon.c`.
