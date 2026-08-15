# Review 08 — `62659f73286030a08d398a18d1a47dd3b7e9fdf6` — `still_chewing` shop + `watch_dig`

## Métadonnées
- Hash complet / court : `62659f73286030a08d398a18d1a47dd3b7e9fdf6` / `62659f73`
- Parent : `4792e3f5889e7a59f957a0a52a74db30ad02a726`
- Auteur, date : Raphaël Hervier `<richie3366@gmail.com>`, 2026-07-21 22:30:12 +0200
- D-id : **D-0941**
- Stats : 11 files, +312/−47 (JS : 5 files, +269/−35)
- Fichiers JS / map / cadence : `js/dig.js`, `js/hack.js`, `js/mon.js`, `js/monmove.js`, `js/shk.js` ; `debt.md` ; journal #1209 ; **pas** D-0942/D-0943 dans ce SHA.

## Intention vs livrable
Promet : `add_damage` mur/porte shop, `watch_dig` / `angry_guards`, wires chew / `zap_dig` / `mdig_tunnel` / `watch_on_duty`.

Livrable : tout ça, **sans** `pay_for_damage` (liste `damagelist` seulement). Le D-log Next explicite `pay_for_damage`/`getcad`/`hot_pursuit` — ce sera **D-0942**, pas un ID sauté dans *ce* lot.

Note mission : D-0942/D-0943 absents des sujets 01–08. **Ce batch est D-0935…D-0941 contigu.** Pas de trou numérique. D-0941 ne survend pas D-0942 (deferred nommé). Ne pas confondre « pas dans la revue » et « skip d’index ».

## Inventaire

| Fichier | Rôle |
|---------|------|
| `js/shk.js` | Port `add_damage` / `shop_wall_dmg` |
| `js/dig.js` | Port `watch_dig` / `watchman_canseeu` / `is_digging` **stub false** ; wires `mdig_tunnel` / `zap_dig` |
| `js/hack.js` | Wire `still_chewing` : `watch_dig` start/continue ; `add_damage` wall/door |
| `js/mon.js` | Port `angry_guards` |
| `js/monmove.js` | Wire `watch_on_duty` arrest + bras `is_digging` |
| `debt.md`, D-log, CURRENT, NOTES, journal | D-0941 |

## Fidélité C ↔ JS

### `add_damage` — C `shk.c:4399` / JS `shk.js:add_damage`
Porte : si `IS_DOOR`, ne schedule que si `(x,y) == ESHK(shk).shd` (vraie entrée) ; sinon return. Accumulate `cost`/`when` si déjà dans `damagelist`. Nouveau nœud `when/place/cost/typ/flags/next`. `cansee` → `seenv=SVALL`.

C `flags = levl[x][y].flags`. JS `flags | doormask | wall_info` — **sur-copie** possible vs C un champ. `shop_keeper(shops.charCodeAt(i))` : `shop_keeper` accepte number — OK.

Pas de RNG. `shk_fixes_damage` body **absent** (nommé) : la liste ne répare rien toute seule.

Callers branchés : `still_chewing` wall `shop_wall_dmg()` (= `10*ACURRSTR`, macro C `SHOP_WALL_DMG`) ; door `SHOP_DOOR_COST` ; `mdig_tunnel` door/wall `cost=0` ; `zap_dig` door `SHOP_DOOR_COST`. **Aligné C** sur les montants. `pay_for_damage` après chew : JS `void dmgtxt` — **pas** d’amende immédiate (C l’appelle). Nommé.

### `watch_dig` — C `dig.c:1377` / JS `dig.js:watch_dig`
Garde : `in_town` + (closed_door / SDOOR / WALL / FOUNTAIN / TREE). Pas IRONBARS — mâcher des barreaux en ville **ne prévient pas** (C-fidèle). Trouve watch via `get_iter_mons(watchman_canseeu)` si `mtmp==null`. `zap \|\| digging.warned` → « Halt, vandal! » + `angry_guards(!!Deaf)` ; sinon verbalize door/tree/wall/fountain + `warned=true`. `is_digging()` → `stop_occupation`.

JS : même filtre terrain ; `SetVoice` sauté (nommé) ; `await import('./mon.js')` pour `angry_guards` (cycle). `is_digging()` **toujours false** (occupation `dig` absente) — `stop_occupation` mort. Nommé. Pendant `still_chewing`, C `is_digging()` est aussi false (occupation ≠ `dig`) : **ne pas** arrêter le chew après warning est fidèle.

`watchman_canseeu` : `is_watch && mcansee && m_canseeu && mpeaceful`. Fidèle.

### `is_digging` — C `dig.c`
C : `occupation == dig`. JS `return false` + commentaire. **Stub assumé**, pas un mensonge silencieux. Conséquence : bras `watch_on_duty` `else if (is_digging()) watch_dig(...)` est **du code mort** jusqu’au port pickaxe. Le wire est cosmétique.

### `angry_guards` — C `mon.c:5711` / JS `mon.js:angry_guards`
Boucle fmon : watch paisibles → `ct++` ; `canspotmon && mcanmove` → adjacent `m_next2u` `nct` sinon `sct` ; sleep/frozen → `slct++`, clear ; `mpeaceful=0`. Msgs wake / get angry / approaching / whistle. Return `ct!=0`.

JS : `mhp<=0` skip ; `m_next2u_angry` dist²≤2 ; Deaf : C `You_hear` (souvent no-op si sourd) ; JS `pline('You hear…')` **gardé par `if (!Deaf)`**. `Soundeffect` sauté. `vtense`/`plur` locaux. **Enveloppe fidèle.** Pas de RNG.

Callers : `watch_dig` ; `watch_on_duty` lock 2ᵉ offense. C `angry_guards` a d’autres callers (kops, etc.) — non branchés.

### `still_chewing` wires — C `hack.c:701,717,753,797,817`
Start **et** continue : `watch_dig(NULL,x,y,FALSE)`. Wall shop : `add_damage(x,y,SHOP_WALL_DMG)` `dmgtxt="damage"`. Door shop : `add_damage(..., SHOP_DOOR_COST)` `dmgtxt="break"`. Fin : `pay_for_damage(dmgtxt,FALSE)`.

JS : `await import('./dig.js')` / `shk.js` **à chaque tick chew** (odeur perf, pas Rule #2). `watch_dig` start+continue. `add_damage` wall/door. `pay_for_damage` toujours différé — `damagelist` s’accumule **sans** facture/kops. Un hero qui mâche le mur d’un shop et s’en va n’est pas poursuivi. D-0942.

`in_town` cavernous wall : déjà porté D-0937.

### `zap_dig` / `mdig_tunnel` / `watch_on_duty`
`zap_dig` : `watch_dig(null,zx,zy,true)` sur door razed **et** maze/ordinary wall ; `add_damage` door `SHOP_DOOR_COST` ; cavernous `&& !in_town`. `zap=true` → arrest immédiat — C-fidèle.
`mdig_tunnel` : `add_damage(..., 0)` door+wall shop ; `!in_town` cavernous. `pay_for_damage` toujours nommé omit.
`watch_on_duty` : lock 2ᵉ fois `angry_guards` ; else `is_digging()` → `watch_dig` (**mort**). `mon_yells` toujours pline (nommé).

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/`fs`/`readFileSync`/fastforward. Frozen RAS.
`import('./mon.js')` dynamique : ESM local, pas un builtin Node — Rule #2 OK pour Node **et** Chrome module. Odeur de cycle, pas une violation.

1:1 : `watch_dig` dans `dig.js`, `angry_guards` dans `mon.js`, `add_damage` dans `shk.js` — correct. Wires multi-fichiers = callees C.

Async : `await import` + `verbalize` + `angry_guards`. Pas d’await gameplay hors `nhgetch`.

## Densité (§2b)
Right size **limite haute**. Famille dégâts shop + watch : chew + zap + mdig + watch_on_duty partagent `add_damage`/`watch_dig`. §2b « unrelated subsystems » : zap_dig n’est pas eat, mais c’est le **même** C `watch_dig` que `still_chewing` appelle. Un falsifier (dig/role cohort). Too big si on exige un module ; acceptable comme envelope watch/shop.

`is_digging` stub + wire mort : densité un peu **théâtrale** (code qui ne peut pas s’exécuter).

## Documentation
D-0941 **fixed** + `pay_for_damage`/`getcad`/`hot_pursuit` ; `is_digging` false jusqu’à pickaxe. **Honnête.** `debt.md` retire shop/`watch_dig` ; nomme pay_for_damage. NOTES 66 lignes, cadence @#1210.
CURRENT `Do not re-break D-0660…D-0941` **inclut D-0940** (pas de skip).
Index : D-0935…D-0941 consécutifs. D-0942/D-0943 naissent **après** ce range — pas un trou dans le lot.

Overclaim : « town watch_dig » alors que le bras occupation dig de `watch_on_duty` est mort. Chew/zap vivent.

## Vérification
Journal : green + dig/role 12/12. Dig cohort justifie `zap_dig`/`mdig`. Full sessions @#1210 **pas** dans ce commit. Affirmation. `add_damage` sans `pay_for_damage` : un shop wall chew public ne divergera pas sur l’amende (jamais facturée des deux côtés si le seed ne mâche pas). Held-out shop vandal : JS plus permissif que C.

## D-0942 / D-0943 — pas un skip dans ce lot

Chaîne de **ce** range (sujets 01–08) :

| ID | Commit | Sujet |
|----|--------|--------|
| (politique) | `8f96d5b6` | map-driven, pas de D |
| D-0935 | `f4d7632b` | TIN |
| D-0936 | `1ccadb23` | `is_edible` |
| D-0937 | `d57a5c85` | bars/`still_chewing` |
| D-0938 | `ad8c5cc6` | `b_trapped` |
| D-0939 | `58e6d5fa` | `cprefx` |
| D-0940 | `4792e3f5` | tin shop |
| D-0941 | `62659f73` | shop/`watch_dig` |

Pas de trou. CURRENT D-0941 : `Do not re-break D-0660…D-0941` — intervalle fermé, D-0940 inclus. NOTES Next : `pay_for_damage`/`getcad`/`hot_pursuit` = **D-0942 à venir**. D-0943 sera `cpostfx` specials (hors chew). Ce commit **n’overclaim pas** ces IDs. Ne pas les exiger dans le SHA.

Ce que D-0941 **overclaim** : le wire `watch_on_duty` dig alors que `is_digging()` est false. Le D-log le dit ; le message de commit « wire related … watch_on_duty call sites » sonne plus vivant que le code.

## `still_chewing` + import dynamique

```javascript
const digMod = await import('./dig.js');
const shkMod = await import('./shk.js');
```
Chaque tick d’occupation chew (effort 30–100, plusieurs tours) re-résout les modules. En ESM une fois caché, le coût est surtout de rendre `still_chewing` async (déjà l’était). Cycle `hack.js`↔`dig.js` (`dig.js` importe `in_rooms`/`in_town`/`stop_occupation` de hack) : le lazy import est la soupape. Pas Rule #2. Odeur : un cycle devrait se casser par un `dungeon.js`/`hacklib` `in_town`, pas par `import()`.

`watch_dig(null,x,y,false)` sur start **et** continue : C aussi. Premier tour : warn. Second : `digging.warned` déjà true → arrest `angry_guards`. JS porte cet escalier. IRONBARS : `watch_dig` return immédiat (pas wall/door) — mâcher des barreaux en Minetown **sans** watch, C-fidèle.

## `add_damage` porte d’entrée

C : `for (shops = in_rooms(..., SHOPBASE); *shops; shops++)` shop_keeper + `x==shd.x && y==shd.y`. JS `shops.charCodeAt(i)` — `in_rooms` JS renvoie une **string** de lettres de room (comme C `char *`). Si `in_rooms` JS renvoie déjà des codes, double charCode. À surveiller. Porte intérieure d’un shop (pas `shd`) : C **ne** schedule **pas**. JS `if (!ok) return`. Fidèle. Mur intérieur : pas `IS_DOOR`, schedule toujours si `in_rooms` a matché côté caller (`still_chewing` teste `in_rooms(..., SHOPBASE)` avant d’appeler). C pareil (`if (*in_rooms(x,y,SHOPBASE)) add_damage`).

`shop_wall_dmg = 10 * acurrstr()` : C `10L * ACURRSTR`. `acurrstr` vs `ACURR(A_STR)` — `acurrstr` est le helper force 18/50 etc. Macro C `ACURRSTR` = `acurrstr()`. OK.

## `angry_guards` msgs

C `You_hear` whistle seulement dans le else (aucun guard vu). JS `pline('You hear the shrill sound…')` si `!Deaf`. `You_hear` C est typiquement sourd-aware ; JS duplique Deaf. Hero sourd + guards invisibles : C silence, JS silence. Hero non sourd : même phrase. `vtense(buf, "are")` sur « guards » / « guard » — dépend de `vtense` JS. Préexistant `objnam.js`.

Lockpicking `watch_on_duty` : 2ᵉ fois Halt thief + `angry_guards`. C `mon_yells` + angry. JS pline + angry. Watch **voit** le lockpick sans `rn2(3)` déjà plus haut dans la fonction (préexistant). Ce commit n’ajoute que angry_guards.

## Risques / dette
1. **`pay_for_damage` absent** : `damagelist` orpheline (D-0942 — pas un skip, une suite).
2. `is_digging()===false` : `watch_on_duty` dig mort ; pickaxe vandales non arrêtés.
3. `import()` à chaque `still_chewing` tick.
4. `add_damage` flags OR wall_info/doormask vs C `flags`.
5. Cluster zap+mdig+chew : régression zap plus difficile à isoler.
6. `in_rooms` string vs charCode : shop_keeper null → pas de schedule porte.
7. Forteresse 44/44 ne mâche pas de mur de shop — amende absente invisible.

## Extrait C — `watch_dig` + `is_digging`

```1377:1409:nethack-c/upstream/src/dig.c
watch_dig(struct monst *mtmp, coordxy x, coordxy y, boolean zap)
{
    struct rm *lev = &levl[x][y];
    if (in_town(x, y)
        && (closed_door(x, y) || lev->typ == SDOOR || IS_WALL(lev->typ)
            || IS_FOUNTAIN(lev->typ) || IS_TREE(lev->typ))) {
        if (!mtmp)
            mtmp = get_iter_mons(watchman_canseeu);
        if (mtmp) {
            SetVoice(mtmp, 0, 80, 0);
            if (zap || svc.context.digging.warned) {
                verbalize("Halt, vandal!  You're under arrest!");
                (void) angry_guards(!!Deaf);
            } else {
                /* Hey, stop damaging that door/tree/wall/fountain */
                svc.context.digging.warned = TRUE;
            }
            if (is_digging())
                stop_occupation();
        }
    }
}
```

JS : même garde `in_town` + terrains (pas IRONBARS). Pas `SetVoice`. `is_digging()` JS `return false` → jamais `stop_occupation` depuis `watch_dig`. Pour **chew**, C `is_digging()` est aussi false (occupation `opentin`/`eatfood`/`still_chewing` ≠ `dig`). Pour **pickaxe** occupation `dig`, C arrête ; JS n’aura jamais l’occupation. Le stub est juste **jusqu’au** port pickaxe ; le wire `watch_on_duty` else-bras est mort.

`zap_dig` passe `zap=true` : skip warn, arrest immédiat si watch voit. JS `await watch_dig(null, zx, zy, true)`. Fidèle. `mdig_tunnel` `add_damage(..., 0L)` : cost 0, mais **schedule** repair. JS `add_damage(..., 0)`. Un monstre qui perce la porte d’un shop : liste damage, pas d’amende hero (`pay_for_damage` C après zap hero, pas après mdig). D-0941 nomme `pay_for_damage` encore deferred — correct pour zap hero.

`pay_for_damage` C après `newsym` + pline chew : kops / `hot_pursuit` / `getcad`. JS accumule `damagelist` et s’arrête. Un shk peut plus tard lire la liste si `shk_fixes_damage` est porté — aujourd’hui cette fonction est elle-même named omit. Donc la liste est un **pré-requis** D-0942, pas un effet observable D-0941. Vendre « shop damage » sans amende est un vocabulaire trop large : c’est « shop damage **scheduled** ». Le cohort « dig/role 12/12 » peut exercer `zap_dig` (wands) plus que le chew eat ; c’est le bon cohort pour watch/zap, pas pour `still_chewing` shop. Deux histoires dans un SHA, un seul falsifier déclaré.

`is_digging()` C `dig.c` : vrai si occupation `dig` **ou** `context.digging` actif (pick / chew). JS D-0941 stub **toujours false**. Conséquence : `watch_on_duty` ne déclenche `watch_dig` que si le watch voit un trou en cours — chemin mort. Le wire `watch_on_duty` → `watch_dig` est du théâtre jusqu’à ce que `is_digging` lise `context.digging.chew` / occupation. C `watch_dig` ignore IRONBARS (`typ != IRONBARS` avant warn) : mâcher des barreaux **en boutique** n’alerte pas le watch — JS fidèle sur ce skip. Town `in_town` pour murs : si `in_town` JS est trop large, `angry_guards` part trop tôt ; trop étroit, le watch ne voit jamais le chew. Non falsifié par le cohort dig (souvent hors ville).

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7/10**
- Si je ne devais retenir qu’une critique : `watch_dig`/`add_damage`/`angry_guards` suivent les gardes C (entrée de shop, `zap`⇒arrest, pas de watch sur IRONBARS), mais facturer n’existe pas encore et le wire `watch_on_duty`/dig est du théâtre tant que `is_digging` est false — D-0942 n’est pas un numéro sauté, c’est la dette avouée.
