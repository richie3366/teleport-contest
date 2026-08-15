# Review 27 — `17e7755f274047180af24241a0fb10d12d5665fe` — shopdig warn / snatch

## Métadonnées
- Hash complet / court : `17e7755f274047180af24241a0fb10d12d5665fe` / `17e7755f`
- Parent : `8cc67794cb544460fdab93b9355fcf0e78e6c172`
- Auteur, date : Raphaël Hervier, 2026-07-22 00:07 +0200 (Co-authored-by Cursor)
- D-id : D-0958
- Stats : 10 files, +251/−39
- Fichiers JS / map / cadence : `js/shk.js` (port), `js/dig.js` (wiring) ; map debt/turns ; docs. Pas de cadence.

## Intention vs livrable
Promesse : porter `shopdig` warn/snatch et brancher les callers trou de `dig.c`, pour que le creusement en magasin avertisse et que la chute puisse voler le pack comme `shk.c`.

Livrable : `shopdig` ~175 lignes dans `shk.js` + deux wires `digactualhole` (`shopdig(1)`) et `use_pick_axe2` start-down (`shopdig(0)`). D-id présent. Titre exact. Le commentaire JS dit « snatch pack when close + owed » — le garde `um_dist` fait l’inverse (voir fidélité).

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/shk.js` | Port C `shopdig` + helpers locaux (`locomotion_shk`, `setnotworn_shopdig`, `freeinv_shopdig`) |
| `js/dig.js` | Wiring : `digactualhole` HOLE fall + `use_pick_axe2` start downward |
| map debt/turns | D-0958 marqué |
| CURRENT / NOTES / D-log / journal | Docs ; journal green+dig/shop 16/16 |

## Fidélité C ↔ JS

### `shopdig`
- Locus C : `nethack-c/upstream/src/shk.c:shopdig` (5019)
- Locus JS : `js/shk.js:shopdig`
- Entrée : C `shop_keeper(*u.ushops)` ; JS `ushops[0]` + `charCodeAt` (le `shop_keeper` JS accepte déjà un code). Garde `!shkp` OK. Extra JS `if (!ushop) return` ≈ `*ushops==0`.
- `!inhishop` : Knight « common thief » + `adjalign(-sgn(ualign.type))`. JS reconstruit `sgn` à la main. Match.
- `lang` : helpless/silent → 0 ; `msound <= MS_ANIMAL` → 1 ; `>= MS_HUMANOID` → 2. JS a un fallback `isshk ? MS_SELL : 0` si `msound` absent — pas dans C, défensif.
- `fall==0` : verbalize madam/sir PIT vs floor ; Knight encore. `SetVoice` omis, nommé. `return` JS après le bras warn : équivalent au `else if` C.
- **Écart bloquant — garde snatch `fall==1`.**

C entre dans le snatch ssi **proche** (Chebyshev ≤ 5), pas helpless, et bill/debit :

```c
} else if (!um_dist(shkp->mx, shkp->my, 5)
           && !helpless(shkp)
           && (ESHK(shkp)->billct || ESHK(shkp)->debit)) {
```

`um_dist` (`apply.c`) est vrai si distance **>** n (loin). Donc `!um_dist` = proche.

JS :

```javascript
if (!um_dist(shkp.mx | 0, shkp.my | 0, 5)
    || helpless(shkp)
    || !((eshk?.billct | 0) || (eshk?.debit | 0))) {
    return;
}
```

`um_dist` JS est le même prédicat (« true if Chebyshev > n », commentaire dans `shk.js`). Le `return` si `!um_dist` saute le snatch **quand le héros est proche**. Le snatch ne tourne que si le shk est **loin**. C’est De Morgan inversé : le `!um_dist` du `if` C a été copié dans un early-return. Le commentaire au-dessus dit pourtant « when close + owed ».

Conséquence : `shopdig(1)` sur chute en magasin (héros adjacent ou à ≤5) **ne vole jamais le pack** ; un shk à distance >5 le ferait, ce que C refuse.

- Suite du corps (si on passait la garde) : `nolimbs` → « knocks off » ; `#if0` curse/rile omis, nommé ; `mnexto` si pas `m_next2u` ; growl/rile si toujours loin ; pline leap+grabs ; boucle invent : skip worn sauf SWAPWEP/QUIVER, skip twoweap swap, skip LEASH+leashmon, skip `current_wand` ; `setnotworn` / `freeinv` / `subfrombill` / `add_to_minv`.
- `setnotworn_shopdig` / `freeinv_shopdig` : copies locales. C `setnotworn` fait plus (invent update, lumières, etc.). Pas nommé comme stub ; le D-log dit « via setnotworn/freeinv ».

### Wiring `dig.js`
- `digactualhole` HOLE + `u.ushops && heros_fault` → `shopdig(1)` else `pay_for_damage('dig into')`. C : `if (*u.ushops && heros_fault) shopdig(1); else pay_for_damage("dig into", TRUE);`. Match du caller.
- `use_pick_axe2` start downward + `u.ushops` → `shopdig(0)` puis `add_damage(..., SHOP_PIT_COST)`. C est dans le même bras de `use_pick_axe2` (journal dit `use_pick_axe` — imprécis, pas faux fonctionnellement).

### RNG
Aucun `rn2` dans `shopdig` C. JS non plus. `mnexto` peut en consommer : seulement sur le chemin snatch, donc **aussi** inversé.

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/fs/fastforward/traces. Frozen OK. `await` = verbalize/pline/`mnexto`. RAS constitutionnel. Le bug est de fidélité, pas de Rule #2.

## Densité (§2b)
**Right size.** Une fonction C + ses deux callers dig nommés. Helpers locomotion/setnotworn sont du support du même envelope. Pas too small.

## Documentation
- D-0958 **fixed**. Deferred : SetVoice, nolimbs `#if0`, et le reste du backlog dig. **Ne nomme pas** l’inversion `um_dist`.
- Map : shopdig en gras. CURRENT avance. Journal : green+dig/shop 16/16 — la fortress ne creuse probablement pas un trou de magasin avec facture, donc le bug ne casse pas 44/44. Ce n’est pas une preuve de fidélité.

## Vérification
Affirmation journal seulement. Cohort 16/16 ne falsifie pas le snatch (chemin rare). Pas de commande. Un seed public qui ne creuse pas le sol d’un magasin avec `billct|debit` et un shk à ≤5 cases laissera 44/44 vert avec un snatch à l’envers. C’est exactement le genre de « fortress held » qui n’éprouve pas le cluster.

## Preuves C (extraits)

`um_dist` C (`apply.c`) :

```c
boolean
um_dist(coordxy x, coordxy y, xint16 n)
{
    return (boolean) (abs(u.ux - x) > n || abs(u.uy - y) > n);
}
```

JS `shk.js` (préexistant, commentaire : « true if Chebyshev distance to hero > n ») : même prédicat. Donc dans `shopdig` C, `!um_dist(..., 5)` = Chebyshev ≤ 5.

De Morgan. Soit P = proche = `!um_dist`. C snatch ssi `P && !helpless && bill`.
JS return (skip) ssi `P || helpless || !bill` ≡ skip ssi proche ou helpless ou pas de facture.
JS snatch ssi `!P && !helpless && bill` = **loin** et facture.

Le commentaire JS au-dessus du bloc : « fall === 1 — snatch pack when close + owed ». L’auteur a lu le C, a écrit le commentaire juste, a inversé le `if`. Ce n’est pas une lecture C manquante, c’est une traduction `if (cond) { body }` → `if (cond) return; body` sans nier `cond`.

Boucle invent C :

```c
for (obj = gi.invent; obj; obj = obj2) {
    obj2 = obj->nobj;
    if ((obj->owornmask & ~(W_SWAPWEP | W_QUIVER)) != 0
        || (obj == uswapwep && u.twoweap)
        || (obj->otyp == LEASH && obj->leashmon))
        continue;
    if (obj == gc.current_wand)
        continue;
    setnotworn(obj);
    freeinv(obj);
    subfrombill(obj, shkp);
    (void) add_to_minv(shkp, obj);
}
```

JS copie le graphe avec `[...invent]` (snapshot — bon, C avance `nobj` avant mutation). `LEASH >= 0` extra-garde si otyp introuvable. `setnotworn_shopdig` : null les slots `u.*` + `owornmask=0`. C `setnotworn` (`worn.c`) touche aussi `update_inventory`, artifacts, lumières, `uwepgone` semantics. Un snatch réel (quand la garde sera corrigée) peut laisser un `uwep` fantôme ou un poids d’invent faux.

`lang` C n’a pas de fallback `MS_SELL` si `msound` null : un shk JS sans `data.msound` parle (lang=2) via `isshk ? MS_SELL`. C lirait `msound==0` → silent. Divergence messages warn, pas RNG.

## Wiring callers — table
| Site C | Site JS ce commit | `fall` |
|---|---|---|
| `digactualhole` HOLE `*u.ushops && heros_fault` | `dig.js` même garde | 1 |
| `use_pick_axe2` start downward `*u.ushops` | `use_pick_axe2` | 0 |
| Autres ? | non | — |

Journal dit `use_pick_axe` ; le C du `shopdig(0)+add_damage` est dans `use_pick_axe2` après « You start digging downward ». Impécision de docs, wire correct.

`shopdig(0)` Knight `adjalign` se produit **même** si le shk est inhishop (bras warn). JS aussi. Ce `adjalign` n’est pas dans le bras snatch C (`fall==1` else-if, pas de Knight). JS `return` après warn : pas de double adjalign. Match.

## Questions ouvertes
1. `shop_keeper(ushop.charCodeAt(0))` : `u.ushops` JS est-il une string de room-chars comme C `char u.ushops[]` ? Si c’est déjà des codes numériques, `charCodeAt` double-encode.
2. `mnexto(shkp, RLOC_MSG)` JS est-il fidèle (RNG place) ? Sur le chemin snatch inversé, ce RNG ne se tire que loin — encore plus faux.
3. Existe-t-il un `setnotworn` / `freeinv` exporté que ce commit a dupliqué pour éviter un cycle ? Dette de copie.

## Risques / dette
1. **Garde `um_dist` inversée** : snatch C (proche+dette) vs JS (loin+dette). Priorité 1, RNG/`mnexto` inclus. Un shk adjacent **ne vole pas** ; un shk à 6+ **vole** (si bill).
2. `setnotworn`/`freeinv` locaux incomplets si la garde est un jour corrigée.
3. `SetVoice` / `#if0` nommés (secondaires).
4. Autres callers C de `shopdig` hors ces deux wires : grep C ne montre que dig hole + start-down — graphe callers probablement complet.
5. Docs « fixed » + commentaire « when close » vs code loin : le D-log ne peut pas être utilisé comme spec.

## Cohérence D-log / map
D-0958 **fixed**. Symptom : « skipped C shopkeeper warn (`shopdig(0)`) and fall-through pack snatch (`shopdig(1)`) ». Après ce commit, `shopdig(0)` warn est probablement juste (pas de `um_dist` dans ce bras). `shopdig(1)` est branché **et faux**. Le D-log ne peut pas dire « pack snatch » fixed. Status devrait être partial ou le Deferred devrait citer « snatch distance guard (`um_dist`) polarity ».

`debt.md` : shopdig en gras. Un iter suivant lira « do not re-stub shopdig » et n’osera pas corriger la garde. C’est le coût d’un QUALITY-RISK sous Keep.

`locomotion_shk` / `is_silent_shk` : copies locales de `mondata.c` / `mondata.h`. Capitalisation leap/Leap via `makeplural(locomotion(..., "leap"))` — C `makeplural(locomotion(shkp->data, "leap"))`. JS `makeplural(locomotion_shk(...))` : si `makeplural` JS attend un nom, pas un verbe, le pline « leaps » peut casser. Secondaire vs `um_dist`.

## Diff JS — hors port
`shk.js` imports : `W_SWAPWEP`/`W_QUIVER`/`TT_PIT`, `PM_KNIGHT`, `makeplural`, `nolimbs`/`is_floater`/`is_flyer`/`amorphous`/`M1_SLITHY`, `LEASH`. `MS_SILENT`/`MS_HUMANOID` locaux (MS_ANIMAL existait). `MS_SELL=39` préexistant. Constantes sound : si les tables monstres JS ont `msound` déjà numérique C, OK ; si absent, fallback `MS_SELL` (déjà noté).

`dig.js` : deux sites, chacun un `await shopdig`. `add_damage` reste après `shopdig(0)` comme C. Pas d’autre churn.

`freeinv_shopdig` met à jour `game._goldCount` pour COIN_CLASS. C `freeinv` fait plus (timer, bill, invlet). Un pack snatch de gold (si la garde était juste) pourrait désynchroniser le botl gold. Secondaire.

`inhishop` / `shop_keeper` / `helpless` / `muteshk` / `rile_shk` / `subfrombill` / `add_to_minv` / `verbalize` : préexistants. Le commit n’invente pas une 2ᵉ politique shop — il branche une fonction manquante sur des primitives déjà là. La primitive `um_dist` était déjà correcte ; c’est l’usage qui est faux.

## Synthèse
`shopdig(0)` warn + Knight : probablement juste. `shopdig(1)` snatch : garde `um_dist` à l’envers, commentaire « close » vs code « loin ». QUALITY-RISK parce que ce n’est pas une omission nommée, c’est une traduction `if (cond) body` → `if (cond) return`. La fortress ne le voit pas. Keep D-0958 va figer le bug. Corriger = inverser `!um_dist` en `um_dist` dans le return (ou écrire `if (um_dist || helpless || !bill) return`).

## RNG et callers — rappel
`shopdig` C : 0 `rn2`. Warn : 0 RNG. Snatch : `mnexto` peut RNG si shk pas adjacent. JS tire `mnexto` sur le chemin **loin** (faux), pas sur le chemin **proche** (C). Inversion = inversion de *quand* le RNG place se tire. `growl` si lang==1 : sounds, peut-être 0 RNG. `add_to_minv` : 0 dans C shopdig. Callers : 2 wires, graphe C couvert. `shopdig(0)` avant `add_damage(SHOP_PIT_COST)` : ordre C. Knight `adjalign` warn seulement, une fois.

## Ce que je ne pénalise pas
Je ne pénalise pas `SetVoice` omis (0 RNG, nommé). Je ne pénalise pas `#if0` nolimbs (C mort). Je ne pénalise pas `setnotworn` local comme QUALITY-RISK — seulement comme dette si on corrige la garde. Le QUALITY-RISK tient **uniquement** à `um_dist` : une ligne, un De Morgan, un snatch à l’envers. Le warn `fall==0` n’est pas mis en cause.

## CURRENT au hash
Next-cluster retire shopdig. Keep D-0958. NOTES @#1228 green+dig/shop. Un cohort « shop » 16/16 n’est pas `shopdig(1)` : c’est probablement pay_for_damage / watch déjà verts. Ne pas lire 16/16 comme « snatch testé ».

## Annexe — ordre de lecture C
1. `shk.c:shopdig` 5019–5110 (tout le corps).
2. `apply.c:um_dist` 692–695.
3. `dig.c:digactualhole` shopdig(1) ; `use_pick_axe2` shopdig(0)+add_damage.
4. `worn.c:setnotworn` / `invent.c:freeinv` (pour juger les copies locales).
Le reviewer a lu 1–3 en entier. 4 en surface.

## Verdict
- Verdict : **QUALITY-RISK**
- Note : **4/10**
- Si je ne devais retenir qu’une critique : le port recopie `!um_dist` dans un `return`, donc le snatch C (shk à ≤5) est exactement le chemin que JS abandonne.
