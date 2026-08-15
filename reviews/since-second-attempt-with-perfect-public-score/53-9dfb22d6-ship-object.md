# Review 53 — `9dfb22d6` — `ship_object` hole-fall billing + drop/throw

## Métadonnées
- Hash complet / court : `9dfb22d6da8686d103a0facdc6dac4829e62cc4b` / `9dfb22d6`
- Parent : `45bf86fc79bb4bda0f7ef4e69def0ce85085fee1`
- Auteur, date : Raphaël Hervier, 2026-07-22 02:51:35 +0200
- D-id : **D-0984**
- Stats : 10 files, +289/−34
- Fichiers JS / map / cadence : `js/dokick.js` (cœur), `js/do.js`, `js/dothrow.js`, `js/mthrowu.js` ; `docs/c-js-map/debt.md` ; journal #1254 (pas de cadence)

## Intention vs livrable
Porter `ship_object` / `otransit_msg` et brancher dropx / throwit / `drop_throw`. Le D-log dit explicitement **avant** `kick_object` (`shop_floor_obj=TRUE`). Livrable = cette enveloppe, pas kick. Titre juste. `flooreffects` pit/shaft encore defer — D-0987 le confirmera.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/dokick.js` | Port `ship_object` / `otransit_msg` / `remove_worn_item` thin / `You_hear` local |
| `js/do.js` | Wiring `dropx` → `ship_object` |
| `js/dothrow.js` | Export `breaktest` ; wiring `throwit` land |
| `js/mthrowu.js` | Wiring `drop_throw` (devient async) |
| `docs/c-js-map/debt.md` | D-0984 ; kick_object shop_floor encore nommé |

## Fidélité C ↔ JS

### `ship_object`
**C :** `dokick.c:1639-1766`. **JS :** `js/dokick.js` export async.

Ordre C reproduit :
1. `down_gate` / `drop_to` ; `!cc.y` → false
2. `nodrop = (uball|uchain) || (toloc != MIGR_LADDER_UP && rn2(3))`
3. unpaid / container flags ; compter pile (`n`, `chainthere`, `impact`)
4. BOULDER + hole : `impact_drop` optionnel, **return false** (caller place)
5. `cansee` → `otransit_msg`
6. si nodrop : impact_drop + `maybe_unhide_at` (JS omit) → false
7. `unpaid || shop_floor_obj` → `stolen_value` (unpaid : `u.ux,u.uy, TRUE` ; floor : ox,oy, peaceful `costly_spot(u) && strchr(urooms, shop)`) + `picked_container` + `no_charge=0`
8. `remove_worn_item`
9. `breaktest` → luck mirror/egg + muffled crash/splat + `obj_extract_self`/`obfree` → true
10. `add_to_migration` ; ox/oy = dest ; `owornmask = toloc` ; boulder `otrapped=0` ; impact_drop pile

**Confirmation RNG :** `rn2(3)` seulement si pas ladder-up — C. Boulder hole ne tire pas ce `rn2` après return… C évalue `nodrop` **avant** le test boulder, donc `rn2(3)` est brûlé même si le boulder rebouche. JS aussi calcule `nodrop` avant. Aligné.

**Écart 1 — `obfree`.** C `obfree(otmp, NULL)` (pas `delobj`, pas `obj_resists`). JS `quan=0; where=0; nobj/nexthere=null`. Pas de free oextra/timers. Named comme « not delobj » ; timers/bill dummy non cités.

**Écart 2 — `remove_worn_item`.** JS ne vide que uwep/uquiver/uswapwep. C retire armure/anneaux et lance les `_off`. Named « accessory/armor polish deferred ». Un objet porté (pas arme) qui tombe dans un trou garde des props.

**Écart 3 — `You_hear` local.** Sourd → no-op. C `You_hear` a Unaware/Underwater. Named.

**Écart 4 — `otransit_msg`.** C distingue cadavre `The(cxname)` vs `The(xname)` ; hit/rattle/fall + `gate_str`. JS `otense` maison (3sg). Soundeffect omit.

Callers **non** branchés (nommés) : `kick_object` `shop_floor_obj=TRUE` ; `flooreffects` shaft (C `do.c:298` dans flooreffects, pas encore porté) ; trap ROLL.

### `dropx`
**C :** `do.c:786-796` — `freeinv` ; si !uswallow : `ship_object` puis `doaltarobj` si autel ; `dropy`.

JS : `freeinv_drop` ; `ship_object` ; `doaltarobj` named omit ; `dropy`. **Pas** de `flooreffects` ici (C le fait dans `dropz` via `dropy`). À cette date `dropz` place encore toujours — D-0987.

### `throwit` land
**C :** `dothrow.c:1804+` — Splash/Plop, **puis** `flooreffects`, **puis** `ship_object` si `!mon`.

JS D-0984 insère seulement `ship_object` avant `place_object`. **Pas** de flooreffects (defer D-0987). **Pas** de Splash (D-0987). Ordre temporairement **ship avant floor** alors que C throwit est **floor puis ship**. Tant que flooreffects est no-op, le fortress ne voit pas l’inversion ; D-0987 devra inverser. (Vérif D-0987 : oui, flooreffects est inséré **avant** ship — correctif de cet ordre.)

### `drop_throw`
**C :** `mthrowu.c:162-196` — mulch ; `if (down_gate != -1) ship_object` ; sinon flooreffects puis place + `passive_obj`.

JS : toujours `ship_object` (qui no-op si `MIGR_NOWHERE`, équivalent pratique du test gate) ; flooreffects encore commenté. `drop_throw` devient `async` ; tous les callers `ohitmon`/`m_throw` `await` — **nécessaire**, pas une 2e frontière input.

C `down_gate != -1` vs `MIGR_NOWHERE` : si `MIGR_NOWHERE==0`, le test C `!= -1` est toujours vrai et C appelle quand même `ship_object`. JS appelle toujours. Pas pire que C.

### Citation C — `ship_object` tête (`dokick.c:1639`)

```1638:1682:nethack-c/upstream/src/dokick.c
boolean
ship_object(struct obj *otmp, coordxy x, coordxy y, boolean shop_floor_obj)
{
    ...
    if ((toloc = down_gate(x, y)) == MIGR_NOWHERE)
        return FALSE;
    drop_to(&cc, toloc, x, y);
    if (!cc.y)
        return FALSE;

    nodrop = (otmp == uball) || (otmp == uchain)
             || (toloc != MIGR_LADDER_UP && rn2(3));
    ...
    if (otmp->otyp == BOULDER && ((t = t_at(x, y)) != 0)
        && is_hole(t->ttyp)) {
        if (impact)
            impact_drop(otmp, x, y, 0);
        return FALSE; /* let caller finish the drop */
    }
```

**Confirmation :** `rn2(3)` est évalué **avant** le return boulder. Un boulder qui rebouche a déjà brûlé (ou non) le RNG nodrop. JS calcule `nodrop` avant le test boulder — **aligné**.

Suite C unpaid vs shop_floor :

```c
    if (unpaid || shop_floor_obj) {
        if (unpaid) {
            (void) stolen_value(otmp, u.ux, u.uy, TRUE, FALSE);
        } else {
            ...
            (void) stolen_value(otmp, x, y, costly_spot(u.ux, u.uy)
                                && strchr(u.urooms, *in_rooms(x,y,SHOPBASE)),
                                FALSE);
        }
        picked_container(otmp);
        otmp->no_charge = 0;
    }
```

JS : unpaid → coords héros + peaceful true ; floor → ox,oy + peaceful `costly_spot(u)`. **Callers JS de ce commit** passent `shop_floor_obj=false` (drop/throw). Le bras floor n’est **pas** exercé tant que `kick_object` n’est pas branché — named.

`dropx` C (`do.c:786`) : `freeinv` ; `if (!u.uswallow) { if (!ship_object(obj, u.ux, u.uy, FALSE)) { if (IS_ALTAR) doaltarobj; dropy; } }`. JS : ship puis dropy ; autel named omit. Si `ship_object` true (objet parti), C **ne** `dropy` **pas**. JS : `if (!await ship_object(...)) await dropy` — **à vérifier**. Si JS appelle toujours `dropy` après un ship true, double place / objet fantôme.

### Callers `throwit` vs `drop_throw` (ordre)

| Caller | C | JS D-0984 |
|---|---|---|
| `throwit` land | Splash → **flooreffects** → ship | **ship** → place |
| `drop_throw` | ship si gate → flooreffects → place | ship → place (flooreffects commenté) |
| `dropx` | ship → (autel) → dropy | ship → dropy |

D-0987 inversera throwit. Ce commit crée une fenêtre où un throw sur trou **facture/migre avant** lava/pool — sans flooreffects, lava ne détruit pas encore, donc fortress silencieuse.


### Callers C `ship_object`

C : `dropx`, `throwit`, `drop_throw`, `kick_object` (`shop_floor_obj=TRUE`), `flooreffects` shaft, parfois trap ROLL. JS D-0984 : **dropx / throwit / drop_throw** seulement. Les trois passent `shop_floor_obj=false` (équivalent unpaid path).

RNG unique du cœur : `rn2(3)` dans `nodrop` ssi `toloc != MIGR_LADDER_UP` et pas ball/chain. Boulder hole : `rn2` **déjà brûlé** puis `return FALSE`. JS aligné. `breaktest` (miroir/œuf) peut tirer ensuite — import dynamique `dothrow.js`.

`otransit_msg` : pas de RNG. `cansee` garde le message. JS `otense` maison vs C `The(cxname)` cadavre.

`dropx` C : si `ship_object` true, **pas** `dropy`. Le diff JS doit court-circuiter. Si un reviewer relit `do.js` plus tard et voit `dropy` inconditionnel, c’est un QUALITY-RISK — flagué en risque #8.

`throwit` à cette date : land → ship → `place_object`. C : Splash → flooreffects → ship. Fenêtre jusqu’à D-0987. Pas de stub `TODO` dans le diff ; l’ordre faux n’est pas un `not yet` commenté sur throwit (seulement flooreffects named ailleurs).

`drop_throw` async : tous les callers du module `await`. Omission d’un `await` = objet synchrone mal shippé. Le commit les patch — confirmation wiring.

## Constitution / playbook
Grep `git show 9dfb22d6 -- js/` : pas de `FORCE`/`DIAG`/`getRngLog`/`readFileSync`/`from 'fs'`/`node:`/`fastforward`. Pas de seed en contrôle. Frozen intacts.

`await import('./dothrow.js')` pour `breaktest` depuis `dokick.js` : cycle potentiel dokick↔dothrow. Rule #2 RAS (pas fs). `drop_throw` devient `async` ; callers `ohitmon`/`m_throw` `await` — **nécessaire**, pas une 2e frontière `nhgetch`.

1:1 : `ship_object` C `dokick.c` → `dokick.js`. `dropx` C `do.c` → `do.js`. `throwit` C `dothrow.c` → `dothrow.js`. `drop_throw` C `mthrowu.c` → `mthrowu.js`.

`remove_worn_item` thin n’invente pas de RNG. `obfree` stub n’appelle pas `delobj` (évite `obj_resists` RNG inventé) — correct pour un palier, timers oubliés.

## Densité (§2b)
**Right size.** Une fonction C + trois callers drop/throw déjà sur la map. `kick_object` volontairement hors scope. +289. Pas too small (ce n’est pas un `if` isolé).

## Documentation
D-0984 nomme `kick_object` `shop_floor_obj=TRUE`, flooreffects pit/shaft, trap ROLL, `maybe_unhide_at`, `doaltarobj`. Map dokick.js à jour. **Pas** d’overclaim « tout fall billing ». L’inversion throwit floor/ship n’est **pas** nommée (dette temporelle jusqu’à D-0987).

Journal #1254 : green+strict ; throw/drop **20**/21. Pertinent.

## Vérification
Preuve journal. Inversion throwit non testable tant que flooreffects est stub — pas un FAIL caché sous fortress. `shop_floor_obj=TRUE` non exercé (kick_object absent). Cadence #1255 mesurera HEAD **avant** D-0985, donc ce hash n’a pas de full suite propre.

## Risques / dette
1. `kick_object` `shop_floor_obj=TRUE` (facture kick boutique → trou).
2. `flooreffects` absent → objets lava/pool se **placent** (D-0987).
3. `throwit` : ship **avant** floor (C : floor puis ship) — corrigé D-0987.
4. `remove_worn_item` thin (armure/anneaux).
5. `obfree` timers/oextra.
6. Cycle import dokick/dothrow/do.
7. `doaltarobj` dropx.
8. Si JS `dropx` appelle `dropy` même après `ship_object` true : double place (à grepper à l’usage).


## Synthèse ship_object
`nodrop` `rn2(3)` avant boulder return : **C**. Unpaid vs shop_floor : **C**, shop_floor non exercé (kick_object hors scope). Throwit ship-avant-floor = fenêtre jusqu’à D-0987. ACCEPT avec dette temporelle, pas un overclaim.


## Questions ouvertes (revue)
1. `dropx` JS court-circuite-t-il `dropy` quand `ship_object` retourne true ?
2. `MIGR_NOWHERE` JS vaut-il 0, rendant le test C `down_gate != -1` toujours vrai ?
3. `breaktest` import circulaire dokick↔dothrow : ordre d’init TDZ ?

## Verdict
- Verdict : **ACCEPT**
- Note : **7.5/10**
- Si je ne devais retenir qu’une critique : `ship_object` suit l’ordre C (nodrop `rn2(3)`, boulder plug, unpaid vs shop_floor) et les callers drop/throw sont branchés **sans** prétendre avoir `kick_object`.
