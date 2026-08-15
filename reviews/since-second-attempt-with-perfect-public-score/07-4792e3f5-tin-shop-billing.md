# Review 07 — `4792e3f5889e7a59f957a0a52a74db30ad02a726` — tin shop billing + `use_tin_opener`

## Métadonnées
- Hash complet / court : `4792e3f5889e7a59f957a0a52a74db30ad02a726` / `4792e3f5`
- Parent : `58e6d5fa5a1ed07d158229975697011140b4959f`
- Auteur, date : Raphaël Hervier `<richie3366@gmail.com>`, 2026-07-21 22:23:28 +0200
- D-id : **D-0940**
- Stats : 9 files, +353/−31 (JS : 3 files, +312/−21)
- Fichiers JS / map / cadence : `js/eat.js`, `js/shk.js`, `js/apply.js` ; `debt.md` ; journal #1208.

## Intention vs livrable
Promet : remplacer `costly_tin` identité par `costly_alteration`/`bill_dummy`, câbler apply `TIN_OPENER`.

Livrable : `costly_tin` async split+bill ; helpers shop `sub_one_frombill` / `subfrombill` / `alter_cost` / `bill_dummy_object` / `costly_alteration` ; `use_tin_opener` + `getobj_tinopen` ; `doapply` case TIN_OPENER. `consume_tin` passe `COST_DSTROY` / `COST_OPEN` au lieu de `0`.

Pas un port `is_edible`. Suite logique de D-0935 (dette nommée).

## Inventaire

| Fichier | Rôle |
|---------|------|
| `js/eat.js` | Port `costly_tin` réel ; `use_tin_opener` / `tinopen_ok` / `getobj_tinopen` ; awaits COST_* |
| `js/shk.js` | Port `sub_*` / `alter_cost` (C `shk.c`) + `bill_dummy_object` / `costly_alteration` (**C `mkobj.c`**) |
| `js/apply.js` | Wire `TIN_OPENER` → `use_tin_opener` |
| `debt.md`, D-log, CURRENT, NOTES, journal | D-0940 |

## Fidélité C ↔ JS

### `costly_tin` — C `eat.c:1389` / JS `eat.js:costly_tin`

```1389:1401:nethack-c/upstream/src/eat.c
costly_tin(int alter_type)
{
    struct obj *tin = svc.context.tin.tin;
    if (carried(tin) ? tin->unpaid
                     : (costly_spot(tin->ox, tin->oy) && !tin->no_charge)) {
        if (tin->quan > 1L) {
            tin = svc.context.tin.tin = splitobj(tin, 1L);
            svc.context.tin.o_id = tin->o_id;
        }
        costly_alteration(tin, alter_type);
    }
    return tin;
}
```

JS : `unpaidCarried \|\| unpaidFloor` (`costly_spot(ox,oy) && !no_charge`) ; split `quan>1` + update context `o_id` ; `await costly_alteration(tin, alter_type)`. **Fidèle.** Callers `consume_tin` : piège `COST_DSTROY` ; discard/empty/eat/spinach `COST_OPEN` — **mêmes** constantes C. Plus d’identité D-0935.

### `costly_alteration` — C `mkobj.c:752` / JS `shk.js:costly_alteration`
C : clamp `alter_type` ; carried/OBJ_FREE unpaid only ; sinon `get_obj_location(..., CONTAINED_TOO)` + `costly_spot` + `billable` ; verbe `alteration_verbs[]` ; INVENT/FREE verbalize + `bill_dummy` ; FLOOR même shop verbalize + dummy ; **else `stolen_value`**.

JS : `ALTERATION_VERBS` 20 verbes — à vérifier vs `COST_xxx` order (commentaire « must match »). Carried via `carried_shop` **ou** `where INVENT/FREE`. Floor : `ushops[0] === objroom` puis verbalize ; **stolen_value différé (nommé)**. `SetVoice` sauté (nommé). `get_obj_location(obj, 0x1)` — suppose `0x1 === CONTAINED_TOO`.

Écart : C `if (shkp) SetVoice` avant verbalize invent — JS verbalize sans shopkeeper voice. Contained : switch C n’a pas `OBJ_CONTAINED` (tombe dans le vide) ; JS non plus. OK.

Callers : `costly_tin` seulement ici. Autres C `costly_alteration` (cancel, rust, …) **non branchés** — helper disponible, dette shop plus large.

### `bill_dummy_object` — C `mkobj.c:712`
C : `unpaid_cost(COST_SINGLEOBJ)` ; `subfrombill(..., shop_keeper(*u.ushops))` ; `newobj` copie ; `oextra` 0 puis `copy_oextra` ; `o_id = nextoid(otmp, dummy)` ; candle `lamplit=0` ; `addtobill(..., FALSE, TRUE, TRUE)` ; `alter_cost(dummy, -cost)` ; `no_charge` floor/contained.

JS : spread `{...otmp}` ; `oextra=null` ; `o_id=next_ident()` **pas** `nextoid` (nommé) ; pas `copy_oextra` / `free_omid` / `Is_candle` (nommé). `shop_keeper(ushops[0])` — `shop_keeper` accepte string **ou** charCode. `addtobill` déjà porté ? Si stub, toute la facture s’écroule — non revu ici ; on suppose l’existant D-0460+.

### `sub_one_frombill` / `subfrombill` / `alter_cost` — C `shk.c`
`sub_one_frombill` : shrink `bquan` + `useup` si bill qty > obj qty (**pas** l’objet résiduel `billobjs` C — nommé) ; sinon swap-last + `billct--`. `subfrombill` : récursion contents, skip coins. `alter_cost` : premier shk vivant avec `onbill` ; `amt==0` → `get_cost` ; `amt<0` force prix. Enveloppe utile pour dummy. `billobjs` residual nommé.

### `use_tin_opener` — C `eat.c:3098` / JS `eat.js:use_tin_opener`
Pas de tin → « You have no tin to open. » `ECMD_OK`. Si `obj != uwep` : cursed `bknown` → `ynq` wield ; `wield_tool(obj, "use")` ; `res=ECMD_TIME`. `getobj("open", tinopen_ok)` ; cancel → `res|ECMD_CANCEL` ; `start_tin` ; `ECMD_TIME`.

JS : `carrying_otyp(TIN)` ; même cursed yn ; `wield_tool` ; `getobj_tinopen` ; `start_tin`. **Fidèle** sur le squelette.

Écarts `getobj_tinopen` :
- C `getobj` menu `?/*`. JS `?`/`*` → « Never mind. » (comme `getobj_eat`). Nommé dans eat.js comme « safe_qbuf polish » — **sous-nommé** : c’est un stub menu, pas du polish.
- `tinopen_ok` : SUGGEST TIN only, sinon EXCLUDE — C-fidèle.
- `apply.js` : `return (res & ECMD_TIME) !== 0` — wield puis cancel garde le bit TIME. C `return res|ECMD_CANCEL` avec TIME déjà dans res. OK.

Callers : `doapply` TIN_OPENER **branché** (sort du « don't know how to use that »). Autres apply otyp toujours stub.

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/`fs`/fastforward. Frozen RAS. `await costly_alteration` / `verbalize` / `yn_function` / `start_tin`.

1:1 : `costly_alteration`/`bill_dummy` dans `shk.js` **pas** `mkobj.js` — cycle probable. Commentaire le dit. Même classe que `dissolve_bars` dans `hack.js`.

## Densité (§2b)
Right size. ~312 LOC, famille tin unpaid + opener. `subfrombill` est un callee nécessaire, pas un rewrite dopay. Trois modules qui s’appellent déjà (eat↔shk, apply→eat).

## Documentation
D-0940 **fixed** + stolen_value, nextoid, billobjs, `still_chewing` shop, cpostfx. Honnête.
`debt.md` retire costly_tin/use_tin_opener. NOTES 63 lignes.
Menu `?/*` **pas** dans le D-log (seulement safe_qbuf dans le JS). Overclaim léger « opener use match eat.c ».

## Vérification
Journal : green + eat/role 12/12. Aucun seed public n’ouvre un tin unpaid en boutique avec opener. Forteresse ≠ facture. Affirmation.

## `consume_tin` : tous les `costly_tin`

| Site C | alter_type | JS D-0940 |
|--------|------------|-----------|
| après `b_trapped` | `COST_DSTROY` | `await costly_tin(COST_DSTROY)` |
| empty tin | `COST_OPEN` | OPEN |
| discard smell n | `COST_OPEN` | OPEN |
| après conducts, avant cprefx | `COST_OPEN` + write `context.tin.tin` | OPEN |
| discard spinach n | `COST_OPEN` | OPEN |
| avant nutrition spinach | `COST_OPEN` + write context | OPEN |

Plus de `costly_tin(0)`. D-0938 deferred « `costly_tin(COST_DSTROY)` » est **retiré** par ce commit — cohérent.

Split `quan>1` : une pile de 5 tins unpaid, on en ouvre un : C `splitobj(tin,1)` le context pointe sur le singleton facturé. JS pareil + `o_id`. Si `splitobj` JS ne copie pas `unpaid`, `costly_alteration` early-return. Dépend de `splitobj` préexistant (non dans ce diff).

## `bill_dummy` vs C `nextoid`

C `nextoid(otmp, dummy)` choisit un `o_id` qui **ne collisionne pas** et peut coller le prix shop. JS `next_ident()` monotone. Un dummy avec un oid neuf : `onbill` / `alter_cost` marchent sur l’objet dummy, pas sur l’oid original. C’est le but (l’original est `subfrombill`). Écart : `copy_oextra` manquant — noms/omid du dummy. Pour un tin, oextra rare. `Is_candle lamplit` N/A tin.

`addtobill(dummy, false, true, true)` : si `addtobill` JS ignore le 4ᵉ flag `usedup`/`silent`, le dummy n’apparaît pas sur la facture. Hors diff ; risque héritée.

## `apply.js` TIN_OPENER

S’insère **avant** « Sorry, I don't know how to use that. » Autres otyp apply inchangés. `res & ECMD_TIME` : `doapply` historique retourne booléen « took time », pas le bitmask C. Perte de `ECMD_CANCEL` vers le caller cmd — le tour est quand même consommé si wield. Aligné sur le contrat JS de `doapply`, pas sur `apply.c` `ECMD_*` intégral.

`wield_tool` : si stub ou refuse welded, `use_tin_opener` return OK — C pareil.

## `getobj_tinopen` vs `getobj`

C `GETOBJ_NOFLAGS` : prompt, `?` menu, `*` tous, lettres SUGGEST. JS boucle `yn_function` ; vide → « don't have anything to open » ; quitchars Never mind ; `?/*` Never mind ; mauvaise lettre « don't have that object » continue ; EXCLUDE « cannot open that » return null. Un hero qui tape `?` en C voit l’inventaire des tins ; en JS abandonne. **Comportement held-out.** Le D-log « match eat.c » est faux sur ce point. `getobj_eat` a le même stub depuis plus longtemps — D-0940 le **réplique** au lieu de factoriser un vrai `getobj`.

## Risques / dette
1. Floor tin hors shop hero → pas `stolen_value` (nommé) : vol non facturé.
2. `next_ident` vs `nextoid` : oid/prix dummy.
3. `getobj` menu absent : apply opener held-out.
4. `costly_alteration` non réutilisé ailleurs (cancel/rust) — callers unwired.
5. `addtobill` existant : si partial, D-0940 hérite.
6. `sub_one_frombill` sans résidu `billobjs` : pile unpaid partiellement ouverte.
7. `ALTERATION_VERBS` désaligné d’un `COST_xxx` cassera « you open/destroy ».

## Extrait C — `costly_alteration` FLOOR else stolen_value

```811:824:nethack-c/upstream/src/mkobj.c
    case OBJ_FLOOR:
        if (learn_bknown)
            obj->bknown = 1;
        if (costly_spot(u.ux, u.uy) && objroom == *u.ushops) {
            verbalize("You %s %s, you pay for %s!",
                      alteration_verbs[alter_type], those, them);
            bill_dummy_object(obj);
        } else {
            (void) stolen_value(obj, ox, oy, FALSE, FALSE);
        }
        break;
```

JS : même `if (costly_spot(hero) && objroom === ushop)` verbalize + dummy ; **pas** de `else stolen_value`. Ouvrir un tin au sol **d’une autre boutique** que `u.ushops[0]`, ou hors shop alors que l’objet est billable : C vole/facture `stolen_value` ; JS gratuit. Nommé. C’est le trou shop le plus net après l’identité D-0935.

`use_tin_opener` C `getobj("open", tinopen_ok, GETOBJ_NOFLAGS)`. `tinopen_ok` SUGGEST seulement `TIN`. JS `GETOBJ_SUGGEST=2` / `EXCLUDE=-3` — rangs invent C. Lettre d’une pomme : « You cannot open that! » return null (pas continue). C `getobj` EXCLUDE refuse aussi. OK. `?` C menu ; JS Never mind — **le** écart apply.

`doapply` : `return (res & ECMD_TIME) !== 0`. Si `use_tin_opener` return `ECMD_OK` (pas de tin), JS `false` — pas de tour. C `ECMD_OK`. Aligné.

## `shop_keeper(*u.ushops)` vs JS

C `bill_dummy` : `subfrombill(otmp, shop_keeper(*u.ushops))`. `*u.ushops` est un `char` room. JS `(game.u?.ushops || '')[0]` string 1 char → `shop_keeper` fait `charCodeAt(0)`. Si `ushops` est vide, C `shop_keeper('\0')` null ; JS `ushop !== ''` skip. Hero qui ouvre un tin unpaid **hors** `ushops` (objet encore marqué unpaid après avoir quitté) : C tente shop_keeper NUL ; JS saute `subfrombill` si pas de ushop mais `unpaid_cost` a pu quand même calculer `cost`. Dummy `addtobill` sans avoir retiré l’original → **double facture** possible. Cas limite, non nommé.

`costly_tin` floor : `tin.ox`/`oy`. Si tin floor sans coords JS (split mal placé), `costly_spot(0,0)` peut matcher une boutique à l’origine de carte. Préexistant object model.

`verbalize` invent : C `You %s %s %s, you pay for %s!` avec `simpleonames(obj)`. JS `simpleonames` importé. Floor : C omet le nom (`You open those, you pay for them!`) ; JS pareil dans le bras `objroom === ushop`. Fidèle. `COST_DSTROY` verbe « destroy » : tin piégé unpaid → dummy destroy sur facture. Sans `stolen_value`, le bras floor-autre-shop reste le trou.

`use_tin_opener` C `apply.c` : si `uwep` est déjà TIN_OPENER, skip `wield` ; sinon `wield_tool`. JS même garde. Occupation `opentin` ensuite via `start_tin`. Si `getobj` JS convertit `?`/`*` en cancel, un joueur qui ouvre le menu d’aide C (`?`) obtient Never mind JS — **pas** un menu d’objets. Held-out apply/tin n’exerce presque jamais `?`. Le D-log parle de `safe_qbuf` (message d’invite) et sous-vend ce stub `getobj`. `tinopen_ok` C n’accepte que TIN ; JS `GETOBJ_SUGGEST` + EXCLUDE : une lettre hors invent cancel vs C « You cannot open that! » — à vérifier si `getobj` JS EXCLUDE pline ou silent return.

`costly_alteration` C `mkobj.c:752` (pas `shk.c`) : `bill_dummy` + `costly_spot` + unpaid. JS dans `shk.js` — 1:1 cassé pour cycle mkobj↔shk, acceptable si le corps est le même. `alter_cost` / `sub_one_frombill` : callers tin seulement dans ce SHA ; d’autres `costly_alteration` C (eat rust, dip) restent à câbler plus tard — le cluster D-0940 est tin-shop, pas tout `mkobj.c`.

C `costly_tin` (`eat.c:1389`) est minuscule : `carried ? unpaid : costly_spot && !no_charge` → `splitobj(1)` si `quan>1` → `costly_alteration`. JS même garde. Le trou n’est pas `costly_tin` ; c’est le `else stolen_value` **dans** `costly_alteration` FLOOR (`mkobj.c:821`). Ouvrir un tin au sol **de la boutique d’à côté** (hero dans ushop A, tin dans shop B) : C facture vol ; JS no-op après le `if (objroom === ushop)` faux. Invent unpaid : C/JS `bill_dummy` — OK.

`bill_dummy` C `nextoid` pour le dummy. JS `next_ident`. Si `o_id` du dummy entre dans une map bill indexée par id, un `o_id` JS monotone vs C `nextoid` shop-local peut **rater** `subfrombill` plus tard. Named « next_ident vs nextoid » dans le D-log — vérifier que c’est bien là ; sinon overclaim « billing complete ».

`no_charge` : C `costly_tin` refuse le floor `no_charge`. Un tin ramassé puis reposé « already paid » ne re-facture pas. JS doit copier `no_charge` sur l’objet ; si le champ n’existe pas, tout tin floor en boutique est billable — **sur-facturation** held-out. `unpaid_cost(COST_SINGLEOBJ)` C avant dummy : le prix unique. JS `unpaid_cost` si stub 0 → dummy à 0 or (facture fantôme). Non dans ce diff ; prérequis D-0460.

Sites `costly_tin` C : DESTROY (trap) une fois ; OPEN aux bras spinach/homemade/empty/variety. Omettre un OPEN laisse un tin unpaid « ouvert gratuit ». Le tableau plus haut dit que JS les a tous — c’est le critère d’ACCEPT-WITH-DEBT plutôt que QUALITY-RISK. Un tin `quan==1` unpaid sans split : `costly_alteration` voit l’objet original ; `subfrombill` doit le retirer avant dummy, sinon double ligne.

`no_charge` floor déjà traité plus haut : le risque restant est un champ JS absent, pas un `if` sauté dans ce SHA.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7.5/10**
- Si je ne devais retenir qu’une critique : `costly_tin` n’est plus une identité et les `COST_OPEN/DSTROY` sont aux bons sites, mais `getobj_tinopen` transforme `?/*` en « Never mind » et `stolen_value` manque — le D-log sous-vend le stub menu.
