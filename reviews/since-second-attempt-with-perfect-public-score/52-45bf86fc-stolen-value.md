# Review 52 — `45bf86fc` — shop `stolen_value` + callers revive/kick/dig/lock

## Métadonnées
- Hash complet / court : `45bf86fc79bb4bda0f7ef4e69def0ce85085fee1` / `45bf86fc`
- Parent : `7ca18b5d9060f593f2987edeeb5befc66dcc81d5`
- Auteur, date : Raphaël Hervier, 2026-07-22 02:44:42 +0200
- D-id : **D-0983**
- Stats : 11 files, +410/−44
- Fichiers JS / map / cadence : `js/shk.js`, `js/zap.js`, `js/dokick.js`, `js/dig.js`, `js/lock.js` ; `docs/c-js-map/debt.md` ; journal #1253 (pas de cadence)

## Intention vs livrable
Retirer la dette facture boutique nommée après D-0982 : `stolen_value` + callers revive / `impact_drop` / `bury_objs` / `breakchestlock` / `costly_alteration` remote. Le diff porte l’enveloppe `stolen_value` (+ helpers) et branche ces cinq sites. `ship_object` reste next — cohérent. Titre exact. Pas de cadence mixte.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/shk.js` | Port `stolen_value` / `stolen_container` / `find_objowner` / `picked_container` / `contained_gold` / `onshopbill` ; wire `costly_alteration` remote |
| `js/zap.js` | Wiring `revive` shop charge |
| `js/dokick.js` | Wiring `impact_drop` bill + debit/robbed chase |
| `js/dig.js` | Wiring `bury_objs` merchandise owe |
| `js/lock.js` | Wiring `breakchestlock` shatter bill |
| `docs/c-js-map/debt.md` | D-0983 ; `ship_object` encore nommé |

## Fidélité C ↔ JS

### `stolen_value`
**C :** `shk.c:3754-3872`. **JS :** `js/shk.js` export async.

Branches portées, dans l’ordre C :
1. `find_objowner` sinon `*in_rooms` → `roomno`
2. snapshot `was_unpaid`, `count_contents` (c_count unpaid-ish, u_count)
3. `shkp = 0` puis `billable` ; si non billable : `onbill` → `billamt` + `sub_one_frombill` ; `!bp && !u_count` → 0
4. COIN → `gvalue += quan` ; sinon `billamt` ou `!no_charge` → `get_pricing_units * get_cost` ; contents `stolen_container` + `contained_gold` si pas invent/free
5. `gvalue+value==0` → 0 ; `value += gvalue`
6. peaceful : `check_credit` ; ANGRY → robbed sinon debit ; messages owe / credit remaining
7. else : robbed += value ; Norep thief / scream ; `hot_pursuit` ; `angry_guards`

**Confirmation branch-par-branch :** le `shkp = null` après le snapshot, puis `billable(holder)` qui **réécrit** shkp, copie C. JS ajoute `if (!shkp) return 0` après billable — filet si `billable` true sans shk ; C assume shk.

**Écart 1 — `check_credit` toujours bavard.** JS inline « The price is deducted/partially covered » **même si `silent`**. C `check_credit` pline aussi sans regarder `silent` de `stolen_value`. Aligné, donc bury/impact (`silent=true`) peuvent quand même parler crédit — c’est C.

**Écart 2 — `currency` / Hallu.** Named omit Hallu. `currency` local « zorkmid(s) » dupliqué dans bury/lock/impact au lieu du helper shk.

**Écart 3 — `find_objowner` OBJ_ONBILL.** JS scan `next_shkp`. Dépend de `next_shkp` déjà porté. `onshopbill` = alias `onbill` — C a parfois un wrapper distinct ; ici tautologie.

`stolen_container` : skip COIN ; `billable` + onbill billamt ; sinon `ininv ? unpaid : !no_charge` ; récursion. Fidèle. `picked_container` : clear `no_charge` nested. Fidèle.

RNG : `stolen_value` n’en a pas. `angry_guards` peut en consommer — appelé seulement bras non-peaceful, comme C.

### Callers

**`revive` (zap.js).** C : si `by_hero` et `costly_spot` et (carried unpaid / `!no_charge`) → shkp ; cansee glow sinon « A corpse is resuscitated » si shkp ; `stolen_value` sauf si `mtmp == shkp`. JS : même garde `carried` via `where===OBJ_INVENT` **ou** `invent.includes` (filet tableau). `silent=false`. Ne pas facturer le cadavre du shk qu’on vient de ranimer : C.

**`impact_drop` (dokick.js).** C : snapshot debit/robbed/angry ; par objet `stolen_value(..., peaceful, TRUE)` + `picked_container` + `no_charge=0` (sauf coin) ; après boucle, si robbed a augmenté → thief plines + `hot_pursuit`/`angry_guards` **return** ; sinon si debit a augmenté → owe lost goods. JS copie ça. **Écart :** `peaceful` JS = `costly_spot(u) && u.urooms includes shop char` — approximation C `strchr(u.urooms, *in_rooms(...))`. `no_charge = 0` vs bury `no_charge = 1` : C impact met 0, bury 1. JS respecte les deux.

**`bury_objs` (dig.js).** C : `stolen_value(..., silent TRUE)` puis `no_charge=1` non-coin ; pline owe burying si loss. JS : **`await import('./shk.js')` dynamique** dans la fonction. Sémantique OK ; style cycle-import. `currency` local.

**`breakchestlock` destroy (lock.js).** C : shatter `stolen_value` par contenu cassé + box ; pline owe objects destroyed. JS : même somme ; `costly_alteration COST_BRKLCK` reste named omit (unlock-sans-destroy). Import dynamique encore.

**`costly_alteration` remote.** C floor hors-shop → `stolen_value(obj, ox, oy, FALSE, FALSE)` (peaceful false). JS `stolen_value(..., false, false)`. Aligné.

### Citation C — enveloppe (`shk.c:3754`)

```3754:3814:nethack-c/upstream/src/shk.c
stolen_value(struct obj *obj, coordxy x, coordxy y,
             boolean peaceful, boolean silent)
{
    ...
    if ((shkp = find_objowner(obj, x, y)) != 0)
        roomno = ESHK(shkp)->shoproom;
    else
        roomno = *in_rooms(x, y, SHOPBASE);

    was_unpaid = obj->unpaid ? TRUE : FALSE;
    ...
    shkp = 0;
    if (!billable(&shkp, obj, roomno, TRUE)) {
        if ((bp = onbill(obj, shkp, FALSE)) != 0) {
            billamt = bp->bquan * bp->price;
            sub_one_frombill(obj, shkp);
        }
        if (!bp && !u_count)
            return 0L;
    }
    if (obj->oclass == COIN_CLASS)
        gvalue += obj->quan;
    else {
        if (billamt) value += billamt;
        else if (!obj->no_charge)
            value += get_pricing_units(obj) * get_cost(obj, shkp);
        ...
    }
    if (gvalue + value == 0L)
        return 0L;
```

JS recopie **ce** `shkp = null` après snapshot — c’est le piège classique (oublier de nuller → facturer le mauvais shk). **Confirmation.** Suite C : peaceful `check_credit` + debit/robbed ; else robbed + `hot_pursuit`. JS idem.

`revive` C (`zap.c` après makemon) :

```c
    if (by_hero && costly_spot(x, y)
        && (corpse->unpaid || (carried && !corpse->no_charge))) {
        ...
        if (mtmp != shkp)
            (void) stolen_value(corpse, x, y, peaceful, FALSE);
    }
```

JS : `silent=false` ; skip si `mtmp === shkp`. **Callers branchés :** revive, impact_drop, bury_objs, breakchestlock shatter, costly_alteration remote. **Non branchés (nommés ailleurs) :** `ship_object` (D-0984), `kick_object`, `mdrop_obj` selle D-0981.

RNG : aucun dans `stolen_value` lui-même. `hot_pursuit` / `angry_guards` peuvent tirer — seulement bras non-peaceful, comme C.


### Callers C `stolen_value` vs ce commit

| Caller C | JS D-0983 |
|---|---|
| `revive` (`zap.c`) | branché |
| `impact_drop` (`dokick.c`) | branché + chase debit/robbed |
| `bury_objs` (`dig.c`) | branché, `silent=true`, import dynamique |
| `breakchestlock` shatter (`lock.c`) | branché, import dynamique |
| `costly_alteration` remote floor | branché |
| `ship_object` | **non** (D-0984) |
| `kick_object` | **non** |
| `mdrop_obj` / selle D-0981 | **non** |

`stolen_container` : récursion contents, skip COIN, `ininv` unpaid vs `!no_charge`. Fidèle d’après l’ordre C. Pas de RNG.

`contained_gold` / `picked_container` : clear `no_charge` nested. Callers : `stolen_value` + `impact_drop` `picked_container` après facture — C. JS copie.

`onshopbill` alias `onbill` : si C a un wrapper distinct (shk hors pièce), JS tautologie peut rater un bill. Named omit `next_shkp` dans `find_objowner`.

`check_credit` pline malgré `silent` : **C**, pas un bug JS. bury/impact `silent=true` parlent encore crédit — fortress peut montrer des plines extra vs un reviewer qui croirait `silent` muet.

Early-return non-C : `if (!shkp) return 0` après `billable`. Filet. C `assert` shk si `onbill`. Sur `billable` true sans shk, JS 0 vs C dereference — défensif.

## Constitution / playbook
Grep `git show 45bf86fc -- js/` : pas de `FORCE`/`DIAG`/`getRngLog`/`readFileSync`/`from 'fs'`/`node:`/`fastforward`. Pas de seed en contrôle. Frozen intacts. Pas d’entrée `fastforward.js`.

`await import('./shk.js')` dans `dig.js` / `lock.js` : ESM dynamique, **pas** filesystem Node — Rule #2 RAS. Ce n’est pas de l’ESM statique 1:1 lisible (cycles, double init possible). `await` = pline/billing, pas `nhgetch`.

1:1 : `stolen_value` C `shk.c` → `shk.js`. Callers C `zap.c`/`dokick.c`/`dig.c`/`lock.c`/`shk.c` branchés aux mêmes modules JS.

## Densité (§2b)
**Right size.** Une fonction C + les callers déjà identifiés sur la map après D-0982. +410. Pas de 2e sous-système : `ship_object` et `kick_object` volontairement hors scope.

## Documentation
D-0983 « fixed » + deferrals `ship_object`, kick object/SDOOR, SetVoice, unpaid `splitbill`. Map eat/zap/dig/dokick mises à jour. CURRENT next = `ship_object`. **Pas** d’overclaim « shop billing complete ».

Journal #1253 : green+strict ; dig/zap **19**/20. Cohorte mixte pertinente (revive + bury). Pas de full suite.

## Vérification
Preuve journal, pas de transcript. Aucun seed boutique+revive/kick/dig cité nommément (seed0009 = FAIL écran préexistant). Held-out OK. Pas de test `silent` vs pline crédit (`check_credit` bavard même si `silent` — c’est C).

#1270 43/44 n’est pas ce hash.

## Risques / dette
1. Imports dynamiques `shk.js` depuis dig/lock : cycles, lisibilité.
2. `splitbill` unpaid encore omit (map eat.js).
3. `ship_object` callers (D-0984) — facture trou/escalier.
4. `mdrop_obj` selle (D-0981) toujours sans `stolen_value`.
5. `find_objowner` / `next_shkp` named omit.
6. Messages `currency` / SetVoice / Norep vs pline.
7. Filet JS `if (!shkp) return 0` après `billable` — C assume shk.


## Synthèse callers
Enveloppe billable/onbill/crédit/robbed : **C** (`shkp=null` après snapshot). Cinq callers map branchés. `ship_object` annoncé next. Imports dynamiques = style, pas fs. ACCEPT : omissions restantes nommées, pas de stub caché dans `stolen_value`.


## Questions ouvertes (revue)
1. L’import dynamique `shk.js` depuis `dig.js` s’exécute-t-il avant `init` shk (ESH K vide) ?
2. `check_credit` JS duplique-t-il les plines C mot pour mot sous `silent` ?
3. `invent.includes(corpse)` dans revive est-il encore nécessaire après D-0964 tagging `where` ?

## Verdict
- Verdict : **ACCEPT**
- Note : **8/10**
- Si je ne devais retenir qu’une critique : l’enveloppe `stolen_value` suit l’ordre billable/onbill/crédit/robbed du C et les callers map sont vraiment branchés — la dette restante est `ship_object` (annoncé), pas un stub caché.
