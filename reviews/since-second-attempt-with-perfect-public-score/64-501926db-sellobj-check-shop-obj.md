# Review 64 — `501926db` — sellobj / check_shop_obj

## Métadonnées
- Hash complet / court : `501926dbc432297c675c1271201dc8f421cac221` / `501926db`
- Parent : `da4c886c3ea56f945f6a7e3e3ba3eb527ca59cba`
- Auteur, date : Raphaël Hervier, 2026-07-22 04:18:43 +0200
- D-id : D-0994
- Stats : 12 files, +666/−62
- Fichiers JS / map / cadence : `js/shk.js` (gros port), `js/shknam.js` (`saleable`/`veggy_item`), `js/do.js` (`dropz`/`dodrop`), `js/dothrow.js` (`throwit`/`breakobj`) ; map absent/debt ; pas de cadence

## Intention vs livrable
Promet que drop/throw en magasin suivent vente/`no_charge`/unpaid C au lieu du silence.

Livrable : `sellobj` + helpers (`set_cost`, `contained_cost`, `dropped_container`, `special_stock`, `shk_names_obj`, `money2u`, `sellobj_state`) + `check_shop_obj` + wires. +666 est un vrai cluster shop, pas un stub. Écarts graves : **fallbacks inventés** sur l’état `sell_response` et sur `eshkp->robbed -= offer < 0L` (précédence C). Le billing magasin est historiquement divergence-heavy ; c’est exactement ici.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/shk.js` | Port C : sellobj family + check_shop_obj + pay/money2u + billable contents |
| `js/shknam.js` | Port C : `veggy_item` obj-path ; `saleable` |
| `js/do.js` | Wiring : `dropz` sellobj ; `dodrop` sellobj_state |
| `js/dothrow.js` | Wiring : `check_shop_obj` throw land + `breakobj` hero_caused |
| map / CURRENT / NOTES / D-log / journal | Docs |

## Fidélité C ↔ JS

### `saleable` / `veggy_item`
- Locus C : `shknam.c:saleable` / `veggy_item`
- JS : `js/shknam.js`

`saleable` : index `shoptype - SHOPBASE` ; `RANDOM_CLASS` → true ; loop `iprobs` : VEGETARIAN_CLASS → `veggy_item` ; `itype<0` → match `-otyp` ; sinon match `oclass`. Pas de RNG. `veggy_item` obj-path : TIN spinach `spe==1`, TIN/CORPSE `vegetarian(mons(corpsenm))` — D-log antérieur disait type-only ; ici le path obj est porté. OK.

### `set_cost`
- Locus C : `shk.c:set_cost` (~3148)
- JS : `js/shk.js:set_cost`

**Pas de `rn2`.** Prix = `getprice` × units ; divisor 3 dunce/tourist/shirt sinon 2 ; gemme inconnue : `(otyp - FIRST_REAL_GEM) % (6 - m_id%3)` puis `(tmp+3)*quan` ; sinon `!(m_id%4)` → ×3/4. Arrondi `*10/div+5/10`. JS recopie. Shop « RNG » ici = **`m_id` modulo**, pas le keystream — fidèle. Named omit glass-gem table polish.

C’est le bon primitive (C `ltmp = set_cost` à la vente, **pas** `get_cost` achat).

### `sellobj_state` / `ensure_sell_state`
C `sellobj_state` : `sell_response = (deliberate != SELL_NORMAL) ? '\0' : 'a'` ; `sell_how = deliberate` ; `auto_credit = FALSE`.

JS : `null` pour `\0` ; `'a'` pour SELL_NORMAL. OK **quand on passe par `dodrop`**.

**Fallback inventé** :

```javascript
function ensure_sell_state() {
  if (game.sell_response === undefined) game.sell_response = 'a';
  if (game.sell_how === undefined) game.sell_how = SELL_NORMAL;
}
```

C global zero-init : `sell_response == '\0'` (falsy → **query**), `sell_how == 0 == SELL_NORMAL`. Premier `sellobj` (throw land, poly drop, `dropz` hors `dodrop`) : C **demande** ynq ; JS default `'a'` est truthy → **auto-vend** dans le `switch`. `sellobj` appelle `ensure_sell_state()` en tête. C’est un changement de contrat magasin, pas du polish.

### `sellobj` — robbed et or
C unpaid non-container non-gold → `sub_one_frombill` return. Container : `contained_cost` + `contained_gold`. `saleable` → `set_cost`. `rouse_shk`. ANGRY → scum, `subfrombill`. Offer 0 / DONTSELL → no_charge + uninterested. Puis :

```c
if (eshkp->robbed) {
  if (isgold) offer = quan;
  else if (cgold) offer += cgold;  /* bool → +1, PAS gltmp */
  if ((eshkp->robbed -= offer < 0L))
    eshkp->robbed = 0L;
  ...
}
```

Précédence C : `robbed -= (offer < 0)` puis si robbed ≠ 0 → `robbed = 0`. L’`offer` **n’est pas soustrait**. Effet : drop dans un shop robbed **clear `robbed`**.

JS :

```javascript
else if (cgold) offer += 1; // C: offer += cgold (boolean → 1)
eshkp.robbed = (eshkp.robbed | 0) - offer;
if ((eshkp.robbed | 0) < 0) eshkp.robbed = 0;
```

Copie le `+1` booléen **et « répare »** la soustraction. Ni C-bug-compatible ni C-intent clair (`robbed -= offer` était l’intention probable). Fallback inventé, commenté, donc conscient — **interdit** de « fixer » C dans un port 1:1.

Bras gold : `donate_gold(gltmp, shkp, TRUE)` comme C. Query crédit `tmpcr = offer*9/10 + (offer<=1)` — arithmétique C, pas de RNG. `yn_function('ynaq','n')` vs C `ynaq(safe_qbuf(...))` — wording simplifié (named safe_qbuf).

`pay(-offer)` async + `money2u` : C `pay` appelle `money2u` si tmp<0. Invent-full `dropy` nommé omit. `shk_names_obj` observe/makeknown porté (C le fait) — D-0991 le listait encore deferred, D-0994 le fait pour le sell path.

### `check_shop_obj`
- Locus C : `dothrow.c:check_shop_obj` (~1181)
- JS : `js/shk.js:check_shop_obj` (mauvais fichier vs 1:1, mais évite un cycle throw↔shk déjà là)

Arbre C : `shop_keeper(*ushops)` ; si broken || !costly || autre shop → unpaid `stolen_value(ux,uy)` ; broken → `no_charge=1` ; else if même shop/`ushops0` : unpaid → `subfrombill` + donate contents gold ; else if pas sur la case shk → `sellobj`. JS identique. Pas de RNG propre.

### Wires `dropz` / `dodrop` / `throwit` / `breakobj`
C `dropz` : `place_object` ; `if (has_shop) sellobj` ; `stackobj`. JS même ordre — **critique** (sell avant stack). C `dodrop` : `if (*ushops) sellobj_state(DELIBERATE)` ; `drop(getobj)` ; restore NORMAL. JS : seulement si `inshop`, cancel restore NORMAL. Hors shop JS skip `sellobj_state` — C aussi (`if (*ushops)`).

C `throwit` après `place_object` : `check_shop_obj` si ushops||unpaid. JS ajouté, skip `uball`. C `breakobj` hero_caused billing. JS : `from_invent || unpaid` → `check_shop_obj(..., true)` ; else `!no_charge && costly_spot` → `stolen_value` + maybe `make_angry_shk`. Collé à C `breakobj`. `void ESHK` import mort.

`billable` : `no_charge` + contents gold/cost → encore billable ; `picked_container` si reset. C rapproché. `contained_cost` usell utilise `set_cost` — OK.

### `set_cost` gemme — pas du `rn2` mais du `m_id`
`tmp = ((otyp - FIRST_REAL_GEM) % (6 - m_id % 3))` puis `(tmp+3)*quan`. `m_id % 3` = 0,1,2 → modulo 6,5,4. JS `FIRST_REAL_GEM` import objects. Si la constante JS ≠ C `FIRST_REAL_GEM`, tout shop gemme vend mal **sans** toucher le keystream (stable par seed via `m_id`). C’est du shop-price historique. `get_pricing_units` : stacks vs globby units. Non relu ; si units=quan pour gemme, OK.

Tourist `ulevel < MAXULEV/2` : C `MAXULEV/2` int. JS `Math.trunc(MAXULEV / 2)`. Shirt visible `uarmu && !uarm && !uarmc`. OK.

### `dodrop` vs C `getobj ALLOWCNT`
C `GETOBJ_PROMPT | GETOBJ_ALLOWCNT` : split count. JS named « count-split deferred ». Vendre une partie d’un stack : C split puis sellobj sur le split ; JS drop le stack entier ou refuse. Divergence magasin **quantité**.

C `reset_occupations` si result. JS omit.

### `breakobj` shop
C après effets de classe, si `hero_caused` : invent/unpaid → `check_shop_obj(..., TRUE)` ; else if !no_charge && costly → `stolen_value` + angry si autre shop. JS même split `from_invent || unpaid`. Hot-potion D-0992 appelait `breakobj(..., false, false)` : **hero_caused false** → pas ce bras. Shatter sol chaud en magasin : C aussi FALSE,FALSE — pas de bill. OK.

Throw break (potion against wall) `hero_caused` true : nouveau billing. Peut `make_angry_shk` (`addupbill=0`, D-0989). Angry « gratuit » (pas de robbed fold).

### `sellobj` switch `'a'`
C `case 'a': gs.sell_response = 'y'; /* fallthrough */ case 'y':`. JS identique. Default `'a'` ensure_sell_state **entre** dans `'a'` sans passer par `if (!sell_response) query`. C `\0` est falsy → query. Preuve par les valeurs, pas par intention.

## Constitution / playbook
Grep : pas FORCE/DIAG/fs/fastforward. `yn_function` = input existant (C `ynaq`), pas un await hors `nhgetch` nouveau. Frozen RAS.

Fallbacks `ensure_sell_state` + arithmétique `robbed` : pas des traces, mais **anti-pattern « aligner »** le billing au lieu de copier C. Playbook : shop price / bill est un locus de divergence ; inventer un default `'a'` est plus dangereux qu’un stub nommé.

## Densité (§2b)
Right size / dense : saleable + set_cost + sellobj + check_shop_obj + wires drop/throw/break. Un cluster. +666 justifié. Pas too-big : pas de dopay appease (next CURRENT).

## Documentation
D-0994 Deferred : Izchak, SetVoice, safe_qbuf, money2u invent-full, break_seq. **Ne nomme pas** `sell_response` default `'a'` ni la « fix » robbed. Status « fixed » survend. Journal #1264 : shop/throw 11/12. Map shops « remaining dopay/appease » — OK.

## Vérification
11/12 shop/throw. Pertinent. N’exerce probablement pas shop robbed + container gold (`offer += 1`). Green non-régression. Cadence encore #1260. Premier drop/throw magasin en session peut auto-vendre en JS vs query C — **invisible** si le cohort n’a pas de shop sale interactive.

## Risques / dette
1. **`ensure_sell_state` default `'a'`** — auto-sale vs query C.
2. **`robbed -= offer` inventé** vs précédence C `-= (offer<0)` puis clear.
3. `offer += cgold` (+1) copié : OK vs C, piège si on « corrige » plus tard.
4. `check_shop_obj` dans `shk.js` pas `dothrow.js`.
5. `addupbill=0` (D-0989) + `bill_box` (D-0991) toujours là : pickup/angry toujours faux pendant que sellobj a l’air complet.
6. `safe_qbuf` wording ; Izchak candle.
7. `pay` devenu async : tous les callers dopay doivent await — un oublié = facture sync/async.
8. `money2u` `findgold_minvent` : si le shk n’a pas assez d’or, C peut quand même `offer = shkmoney` en amont ; JS `if (quan < amt) return` silent — vente cash sans transfert.
9. `record_price_quote` sur credit/cash query : C avant ynaq. JS aussi. Quote table objects[] side channel, pas RNG.
10. `rouse_shk(shkp, TRUE)` : JS `rouse_shk` thin (wake only, verbose pline deferred). C peut parler. Écran, pas keystream.

## Questions ouvertes
- `game.sell_response` est-il persisté dans le save VFS ? Si oui, default `'a'` vs `\0` survit un restore.
- Le 11/12 a-t-il un ynq « Sell it? » ? Si aucune session n’entre en magasin pour drop, D-0994 est du code mort fortress et les fallbacks ne se voient pas.
- `contained_cost` usell `set_cost` récursif : un sac de 20 items = 20× set_cost, zéro `rn2` mais beaucoup de `m_id%`. Stable.

### Citation C — précédence `robbed`
```3999:4006:nethack-c/upstream/src/shk.c
    if (eshkp->robbed) { /* bones; shop robbed by previous customer */
        if (isgold)
            offer = obj->quan;
        else if (cgold)
            offer += cgold;
        if ((eshkp->robbed -= offer < 0L))
            eshkp->robbed = 0L;
```

`<` avant `-=`. `offer < 0` est 0 pour un drop normal. `robbed -= 0` puis si robbed≠0 → 0. JS soustrait `offer` (quan gold ou 1 si cgold). Bones shop : C clear robbed ; JS robbed peut rester >0 si offer < robbed. **Pas le même état eshk après un drop**.

### Citation C — `sellobj_state`
```3913:3924:nethack-c/upstream/src/shk.c
void
sellobj_state(int deliberate)
{
    gs.sell_response = (deliberate != SELL_NORMAL) ? '\0' : 'a';
    gs.sell_how = deliberate;
    ga.auto_credit = FALSE;
}
```

Pas d’`ensure` C. Première vente de la partie : `\0`. JS `undefined → 'a'`.

### Citation C — `dropz` ordre
```829:837:nethack-c/upstream/src/do.c
        place_object(obj, u.ux, u.uy);
        if (with_impact)
            container_impact_dmg(obj, u.ux, u.uy);
        impact_disturbs_zombies(obj, with_impact);
        if (obj == uball)
            drop_ball(u.ux, u.uy);
        else if (svl.level.flags.has_shop)
            sellobj(obj, u.ux, u.uy);
        stackobj(obj);
```

JS D-0994 : place ; `if (has_shop) sellobj` ; stack. Saute encore impact_drop/zombies (named). **sellobj avant stack** : C identique. Si stack merge avant sell, le shk verrait l’objet fusionné ; C évite ça. JS aussi.

## Verdict
- Verdict : QUALITY-RISK
- Note : 5/10
- Si je ne devais retenir qu’une critique : `set_cost`/`saleable`/`check_shop_obj` sont C, puis `ensure_sell_state()` force `'a'` et `robbed -= offer` « répare » un quirk de précédence — exactement les fallbacks magasin qu’il ne fallait pas inventer.
