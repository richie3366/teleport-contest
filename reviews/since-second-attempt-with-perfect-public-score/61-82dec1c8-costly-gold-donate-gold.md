# Review 61 — `82dec1c8` — costly_gold / donate_gold

## Métadonnées
- Hash complet / court : `82dec1c82a1eb58c24f014d29bd00797df01ae4b` / `82dec1c8`
- Parent : `82da3437e1530483035b35e9a27f15b319b00bdc`
- Auteur, date : Raphaël Hervier, 2026-07-22 03:52:55 +0200
- D-id : D-0991
- Stats : 10 files, +188/−42
- Fichiers JS / map / cadence : `js/shk.js` (port), `js/dokick.js` (wire kick) ; map absent/debt ; pas de cadence

## Intention vs livrable
Promet crédit/débit/loan quand l’or quitte un magasin, plus refund d’or contenu à l’atterrissage kick, plus `addtobill` coin/container gold.

Livrable : `costly_gold` / `donate_gold` collent à C ; kick-out et kick-land contents sont branchés ; `addtobill` COIN et `gltmp` aussi. Écart : `addtobill` appelle `picked_container` **sans** `contained_cost` / `bill_box_content` (`cltmp` reste 0). D-log nomme ce deferral. Le titre ne survend pas `sellobj`.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/shk.js` | Port C : `costly_gold`, `donate_gold` ; wire `addtobill` ; export `contained_gold` |
| `js/dokick.js` | Wiring : kick-out gold ; donate contents on land |
| map / CURRENT / NOTES / D-log / journal | Docs |

## Fidélité C ↔ JS

### `costly_gold`
- Locus C : `shk.c:costly_gold` (~5745)
- Locus JS : `js/shk.js:costly_gold`

C : `if (!costly_spot) return` ; `shop_keeper(*in_rooms)` ; si `credit >= amount` : message reduce/erase puis `credit -= amount` ; sinon `delta = amount - credit` ; messages erase + debt increase / owe ; `debit += delta` ; `loan += delta` ; `credit = 0`.

JS : même arbre. Extra : `amt <= 0` early return — garde inventée, **pas de RNG**. `silent` coupe les plines comme C.

Pas de `rn2`. Shop price n’entre pas ici (montant = `quan` gold).

Callers C : pickup `addtobill` coin ; kick gold hors shop. JS : les deux branchés. Autres callers C (`stolen_value` gold paths, etc.) non audités dans le journal.

### `donate_gold`
- Locus C : `shk.c:donate_gold` (~3877)
- JS : `js/shk.js:donate_gold`

C : si `debit >= gltmp` : trim `loan`, `debit -=`, « debt is (partially )paid off » ; sinon `delta = gltmp - debit`, `credit += delta`, clear debit/loan si besoin, « re-established » vs « added back » selon `!selling`.

JS recopie messages et flags `selling`. Extra `amount <= 0 \|\| !shkp` return. Pas de RNG.

Callers : kick-land `donate_gold(gtg, shkp, false)` comme C `FALSE` (kicked, not dropped). `addtobill` ne donate pas (C non plus : `costly_gold` à la prise).

### Kick wire `really_kick_object`
C 760–783 :

```
if (costly && (!costly_spot(bhitpos) || srcRoom != bhitroom)) {
  if (isgold) costly_gold(x, y, quan, FALSE);
  else stolen_value(...);
  costly = FALSE;
}
flooreffects...
if (costly) {
  if (unpaid) subfrombill;
  if (Has_contents && (gtg = contained_gold(..., TRUE)) > 0)
    donate_gold(gtg, shkp, FALSE);
}
```

JS D-0991 remplace les commentaires « deferred » par ces appels. Coords : `costly_gold(x,y,...)` = **case de départ** (C identique), pas `bhitpos`. `contained_gold(kicked, true)` even_if_unknown — C `TRUE`. Ordre : stolen/costly_gold **avant** flooreffects **avant** donate — OK.

### `addtobill` coin + container gold
C 3504–3546 : COIN → `costly_gold(ox,oy,quan,silent)` return. Container : `cltmp = contained_cost(...)` ; `gltmp = contained_gold` ; `if (ltmp) add_one_tobill` ; `if (cltmp) bill_box_content` ; **`picked_container`** ; `ltmp += cltmp` ; `if (gltmp) costly_gold ; if (!ltmp) return`.

JS :

```javascript
gltmp = contained_gold(obj, true);
if (ltmp) add_one_tobill(obj, dummy, shkp);
// bill_box_content deferred
picked_container(obj);
ltmp += cltmp; // cltmp toujours 0
if (gltmp) { await costly_gold(...); if (!ltmp) return; }
contentscount = count_unpaid(obj.cobj);
```

**Écart concret** : `picked_container` C tourne **après** facturation des contenus. JS clear `no_charge` des contenus **sans les bill**. Ramasser un coffre payant en magasin : l’or contenu passe dans `costly_gold` (OK) ; les objets contenus deviennent « pas no_charge » sans ligne de bill. Nommé `bill_box_content / contained_cost` dans D-0991. C’est de la dette shop réelle, pas du polish.

`cltmp` déclaré, jamais assigné depuis `contained_cost` — dead code qui mime C visuellement.

Header `shk.js` : retire `costly_gold` des omissions, ajoute « sellobj / check_shop_obj full throw-land bill (donate_gold wired on kick) » — next cluster honnête.

### Messages `costly_gold` / `donate_gold`
Pas de RNG, mais des strings judge-visibles. C `Your("credit is reduced by %ld %s.", amount, currency(amount))`. JS template + `currency()`. Si `currency` JS n’est pas le helper shk déjà porté (zorkmid/zorkmids), écart d’écran. `shkname(shkp)` dans « You owe %s %ld » : C `shkname`, JS `shkname` import. 

`donate_gold` « re-established » quand `!selling && credit==delta` : kick-land contents gold, `selling=false` → « re-established ». Drop (plus tard D-0994) `selling=true` → « established » sans `re-`. JS ternaire `!selling ? 're-' : ''` identique.

C n’a pas de garde `amount<=0` sur donate. JS return early. Un `contained_gold` 0 n’appelle déjà pas donate (kick `gtg > 0`). Garde morte sur ce caller.

### `contained_gold` export
C somme COIN `quan` + recurse si `even_if_unknown || cknown`. JS déjà là, seulement exporté. Kick passe `true` → compte l’or même `!cknown`. C `TRUE`. Si l’impl JS skip nested `Has_contents` incorrectement, le refund kick est faux — non relu ligne à ligne ici ; le D-0988 comment disait que la fonction existait déjà.

### `addtobill` après gltmp
C `if (gltmp) { costly_gold; if (!ltmp) return; }` : coffre **gratuit** (no_charge outer, ltmp=0) qui ne contient que de l’or : facture l’or puis return **sans** honorific « For you, ». JS identique une fois `cltmp=0`. Caisse avec objets + or : C `ltmp += cltmp` (prix contenus) puis continue vers verbalize. JS `ltmp += 0` : si outer a un prix, verbalize le outer only ; si outer 0 et gltmp>0, return après costly_gold. **Manque la facture contenus** (nommé) ; le message « For you » peut se tromper sur le total.

## Constitution / playbook
Grep JS : pas FORCE/DIAG/fs/fastforward. `costly_gold`/`donate_gold` async uniquement pour `pline` — modèle existant. Frozen RAS. 1:1 : fonctions dans `shk.js` comme `shk.c`. RAS constitution.

## Densité (§2b)
Right size. Une famille C : gold bill kick + le caller `addtobill` qui était le stub nommé. Pas de `sellobj` dans ce peel (résisté à l’élargissement). Pas too-small : deux fonctions + trois wires.

## Documentation
D-0991 Deferred liste sellobj/check_shop_obj **et** bill_box/contained_cost. CURRENT next → flooreffects fire/globby. Map absent : costly_gold via D-0991, petrify/tmp_at restent. Journal #1261 : green + shop/kick cohort **11/12**. Honnête. « fixed » OK si on lit Deferred.

## Vérification
Cohort 11/12 shop/kick. Plus pertinent que le 19/20 kick générique : le changement est billing. Pas de preuve que `addtobill` container+gold a été exercé (le 11/12 peut être du kick d’or au sol). Pas de full suite (hors cadence). seed0009 toujours préexistant.

## Risques / dette
1. **`picked_container` sans `bill_box_content`** — pickup coffre magasin.
2. Autres callers C `costly_gold` (hors addtobill/kick) éventuellement encore stubs.
3. `donate_gold` kick-land seulement ; drop/throw gold attend `sellobj` (D-0994).
4. `addupbill=0` de D-0989 non réparé : angry shk après gold damage toujours faux.
5. Garde `amt<=0` : bénigne.
6. Kick gold **dans** le même shop (`costly` reste true) : C ne `costly_gold` pas (bras `if (costly && (!costly_spot(dest) || room mismatch))`). JS identique. Or kické plus loin dans la boutique : pas de débit, puis donate contents seulement. OK.
7. `loan` double-count C : `debit += delta; loan += delta` — JS copie. Ne « corrige » pas. Bien.
8. `find_objowner` vs `shop_keeper(*in_rooms)` pour kick costly flag (D-0988) vs `costly_gold` qui re-fait `shop_keeper(*in_rooms(x,y))` sur la case **source**. Si owner ≠ shop de la case, C `costly_gold` peut no-op (`!costly_spot` ou shk null) alors que `stolen_value` non-gold utilisait `shkp` du owner. Or seulement.

## Questions ouvertes
- `addtobill` container pickup est-il exercé par le 11/12 ? Si le cohort n’est que kick d’or au sol, `picked_container` sans bill_box n’est pas testé.
- `currency()` hallu `ROLL_FROM` encore named omit header shk : les messages gold peuvent diverger en hallu sans RNG si ROLL_FROM n’est pas appelé.
- Un kick d’or hors shop **sans** `costly_spot` source : C `costly_gold` return immédiat. JS aussi. Pas de faux débit.

### Citation C — `costly_gold`
```5764:5785:nethack-c/upstream/src/shk.c
    if (eshkp->credit >= amount) {
        if (!silent) {
            if (eshkp->credit > amount)
                Your("credit is reduced by %ld %s.", amount, currency(amount));
            else
                Your("credit is erased.");
        }
        eshkp->credit -= amount;
    } else {
        delta = amount - eshkp->credit;
        /* ... debit/loan += delta; credit = 0 ... */
        eshkp->debit += delta;
        eshkp->loan += delta;
        eshkp->credit = 0L;
    }
```

JS : mêmes tests `credit >= amt` / `credit > amt` / `debit` déjà non-nul vs « You owe ». Pas de `rn2`. `silent` coupe les plines (addtobill coin pickup silencieux possible).

### Citation C — `addtobill` container
```3526:3541:nethack-c/upstream/src/shk.c
    if (container) {
        cltmp = contained_cost(obj, shkp, cltmp, FALSE, FALSE);
        gltmp = contained_gold(obj, TRUE);

        if (ltmp)
            add_one_tobill(obj, dummy, shkp);
        if (cltmp)
            bill_box_content(obj, ininv, dummy, shkp);
        picked_container(obj); /* reset contained obj->no_charge */

        ltmp += cltmp;

        if (gltmp) {
            costly_gold(obj->ox, obj->oy, gltmp, silent);
```

JS saute `contained_cost` et `bill_box_content`, garde `picked_container` + `costly_gold(gltmp)`. C’est le trou nommé.

### Kick-land refund
C `donate_gold(gtg, shkp, FALSE)` après `flooreffects` si `costly` encore vrai (land **dans** le shop). Si flooreffects détruit l’objet (lava), C return 1 **avant** donate — JS aussi (`if (await fe(...)) return 1`). Or contenu d’un coffre kické dans la lave : pas de refund. C identique.

`costly = false` après kick-out : le bras donate contents ne tourne **pas** si on a déjà `costly_gold`/`stolen_value` (objet sorti du shop). C `costly = FALSE; /* already billed */` puis flooreffects puis `if (costly) donate`. Un coffre kické **hors** boutique : or outer via `costly_gold` (si gold) ou `stolen_value` (si pas gold) ; or **contenu** n’est pas donate (déjà hors shop). C identique. Un coffre kické **dans** la boutique : pas de costly_gold outer, puis donate contents. OK.

`loan` n’est diminué que dans `donate_gold` (bras debit>=amount). `costly_gold` n’augmente loan que sur le bras crédit insuffisant. Kick or out puis kick-land contents : débit puis refund partiel. Pas de RNG. État eshk testable, non exercé par le 11/12 probable.

Silent `costly_gold` depuis `addtobill(..., silent=true)` : pas de pline crédit. C identique. Kick passe `false` → messages visibles.

## Verdict
- Verdict : ACCEPT-WITH-DEBT
- Note : 7/10
- Si je ne devais retenir qu’une critique : `costly_gold`/`donate_gold` sont des copies d’arbre de messages sans RNG, mais `addtobill` fait `picked_container` comme si les contenus avaient été facturés — le deferral `bill_box` n’est pas cosmétique.
