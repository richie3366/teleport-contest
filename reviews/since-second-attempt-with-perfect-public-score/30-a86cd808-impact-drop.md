# Review 30 — `a86cd8088059be5731b19b0a50d85a0e07266443` — impact_drop + HOLE falls

## Métadonnées
- Hash complet / court : `a86cd8088059be5731b19b0a50d85a0e07266443` / `a86cd808`
- Parent : `b0d774ef42abe04d44a8fb2ec310556f6abf98e8`
- Auteur, date : Raphaël Hervier, 2026-07-22 00:17 +0200 (Co-authored-by Cursor)
- D-id : D-0961
- Stats : 10 files, +258/−30
- Fichiers JS / map / cadence : `js/dokick.js` (port), `js/dig.js` (wire), `js/mkobj.js` (`add_to_migration`) ; map debt/turns. Pas de cadence.

## Intention vs livrable
Promesse : porter `impact_drop` et brancher `digactualhole` HOLE pour que les objets au sol migrent via `down_gate`/`drop_to`/`add_to_migration` quand le héros reste en l’air ou qu’un monstre tombe.

Livrable : les trois helpers + deux `await impact_drop(null, x, y, 0)` dans les bras HOLE stay/mon. D-id présent. `stolen_value` shop **nommé omis**, pas vendu comme billing complet. Titre un peu large (« floor falls ») mais le wire est bien les deux bras C `newobjs`.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/dokick.js` | Port C `down_gate` / `drop_to` / `impact_drop` |
| `js/mkobj.js` | Port C `add_to_migration` |
| `js/dig.js` | Wiring `digactualhole` HOLE (héros aloft + monstre) |
| map debt/turns | D-0961 ; stolen_value / `ship_object` restants |
| CURRENT / NOTES / D-log / journal | Docs ; green+dig 16/16 |

## Fidélité C ↔ JS

### `down_gate`
- Locus C : `dokick.c:down_gate` (1943)
- Locus JS : `dokick.js:down_gate`
- `gate_str = 0/null` ; quest start `!ok_to_quest` → `MIGR_NOWHERE` ; stairs down → `MIGR_STAIRS_UP` vs `MIGR_SSTAIRS` selon `tolev.dnum==uz.dnum` ; ladder down → `MIGR_LADDER_UP` ; trap `tseen && is_hole` → `MIGR_RANDOM` + trap door vs hole string. Pas de RNG. Match.

### `drop_to`
- Locus C : `dokick.c:drop_to` (1473)
- Locus JS : `dokick.js:drop_to`
- `MIGR_RANDOM` : stronghold → valley ; endgame/botlevel → `(0,0)` ; FALLTHROUGH stairs/ladder/sstairs. Dest : C `if (stway) cc = stway->tolev` else `uz.dlevel+1`. JS `stway?.tolev` else `uz+1`. Si `stway` existe sans `tolev`, JS prend le fallback, C écrirait des champs tolev. Coin étroit.
- `y==0` = nowhere. Match de la convention.

### `impact_drop`
- Locus C : `dokick.c:impact_drop` (1511)
- Locus JS : `dokick.js:impact_drop`
- Early : `!OBJ_AT` / `!objects_at` return ; `down_gate`+`drop_to` ; `!cc.y` return ; `dlev` → `MIGR_WITH_HERO` + `cc.y=dlev`.
- C enregistre `costly_spot` / shk debit/robbed/angry **avant** la boucle, puis `stolen_value` par objet. JS saute tout le bloc shop — nommé.
- Boucle : skip missile, `oct += quan`, skip uball/uchain, skip `(isrock && BOULDER) \|\| rn2(BOULDER ? 30 : 3)`, extract, migrate, `ox/oy=cc`, `owornmask=toloc`, `dct += quan`.
- RNG : `rn2(obj->otyp == BOULDER ? 30 : 3)` — ternaire **avant** `rn2` (même en C). JS identique. clang LTR non pertinent (un seul call).
- Messages `cansee` : impact « the/an/ other » ; all vs some. `gate_str`. Fidèle aux formats C.
- C après messages : si costly && price, thief / `hot_pursuit` / `angry_guards` ou « you owe ». JS omis, nommé.

### `add_to_migration`
- Locus C : `mkobj.c:add_to_migration` (2698)
- Locus JS : `mkobj.js:add_to_migration`
- C **panic** si `where != OBJ_FREE` ; `impossible` si unpaid ; `no_charge=0` ; `maybe_reset_pick` si container ; chain `migrating_objs` + `omigr_from_*`.
- JS **force** `where=OBJ_FREE` au lieu de panic ; `no_charge=0` ; `maybe_reset_pick` omis, nommé ; unpaid non signalé. Plus mou que C, pas un extra RNG.

### Wiring `digactualhole`
C HOLE :

```c
if (u.ustuck || wont_fall) {
    if (newobjs) impact_drop((struct obj *) 0, x, y, 0);
    ...
} else { /* hero falls — impact in goto_level, not here */ }
/* mon path: */
if (newobjs) impact_drop((struct obj *) 0, x, y, 0);
```

JS : les deux `if (newobjs) await impact_drop(null, x, y, 0)` au même endroit (stay + mon). Ne branche **pas** `ship_object` / `do.c` / `trap.c` — nommé.

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/fs/fastforward. Frozen OK. `await` = pline seulement dans `impact_drop`. RAS.

## Densité (§2b)
**Right size.** Famille `down_gate`/`drop_to`/`impact_drop`/`add_to_migration` + callers `digactualhole` qui étaient le stub. Un cran au-dessus d’un `if`, pas un fourre-tout.

## Documentation
- D-0961 fixed. Named omissions : stolen_value/picked_container, ship_object/do/trap, maybe_reset_pick. Honnête.
- Map dokick + dig mises à jour. Journal green+dig 16/16, pas de full sessions (cadence #1235).

## Vérification
Affirmation. La fortress ne crée probablement pas un HOLE avec pile d’objets. Preuve de non-régression, pas du `rn2(3)/rn2(30)`. Le journal ne cite pas de seed hole. `ship_object` (kick/throw dans un trou) n’est pas dans le cohort.

## Preuves C (extraits)

Porte `down_gate` + `drop_to` : zéro RNG. `impact_drop` early-out si `!OBJ_AT` ou `!cc.y` (nowhere). JS `if (!objects_at(x,y)) return` puis `if (!cc.y) return`. Si `objects_at` JS retourne un objet unique sans `nexthere`, `oct/dct` sous-comptent et la boucle ne voit qu’une tête de pile.

RNG de chute, C :

```c
if ((isrock && obj->otyp == BOULDER)
    || rn2(obj->otyp == BOULDER ? 30 : 3))
    continue;
```

JS identique. Un boulder a 1/30 de tomber (`rn2(30)==0`) ; le reste 1/3. Un missile ROCK ne fait jamais tomber un boulder (`isrock && BOULDER` avant `rn2` — **short-circuit, pas de roll**). Fidèle.

Messages C :

```c
if (missile)
    pline("From the impact, %sother %s.",
          dct == oct ? "the " : dct == 1L ? "an" : "", what);
else if (oct == dct)
    pline("%s adjacent %s %s.", dct == 1L ? "The" : "All the", what,
          gg.gate_str);
```

JS : `'an'`+`other` → `another` ; `'the '`+`other` → `the other`. Match. `game.gate_str` stand-in de `gg.gate_str`.

Shop C (omis JS) **consomme** `stolen_value` par objet tombé si `costly_spot`. `stolen_value` tire souvent du RNG (prix, messages). Nommer l’omit est honnête **et** signifie : dans une boutique, C et JS divergent au premier objet costly, pas seulement aux messages.

`add_to_migration` C :

```c
if (obj->where != OBJ_FREE)
    panic("add_to_migration: obj where=%d, not free", obj->where);
if (obj->unpaid)
    impossible("unpaid object migrating...");
obj->no_charge = 0;
if (Is_container(obj)) maybe_reset_pick(obj);
obj->where = OBJ_MIGRATING;
obj->nobj = gm.migrating_objs;
...
gm.migrating_objs = obj;
```

JS force `where=OBJ_FREE` si besoin. Un objet encore `OBJ_FLOOR` migre sans `obj_extract_self` complet si le caller a oublié — double présence sol+migrating. `digactualhole` fait `obj_extract_self` avant (dans `impact_drop`). OK pour ce caller ; dangereux pour un futur `ship_object` mal câblé.

## Wiring `digactualhole` — deux sites, pas trois
C commente : si le héros **tombe**, les objets sont traités dans `goto_level`, pas ici. JS ne pose pas `impact_drop` sur le bras `goto_level` — correct. Les deux sites JS (ustuck/wont_fall + bras monstre) collent au C. `impact_drop(null, …)` ≡ `(struct obj *) 0`.

`newobjs` JS : doit compter la pile après `maketrap`. Si `newobjs` est un booléen « il y a des objets » vs C pointeur/`OBJ_AT`, les gardes `if (newobjs)` restent équivalentes. Si c’est un compte mal mis à jour, on skip l’impact à tort.

## Questions ouvertes
1. `objects_at` + `nexthere` : la Map `_objects_at` retourne-t-elle toujours une chaîne `nexthere` ?
2. `game.migrating_objs` est-il consommé par `obj_delivery` / `goto_level` JS comme C `migrating_objs` ? Porter `add_to_migration` sans delivery = objets disparus.
3. `MIGR_*` constantes JS vs C : `owornmask = toloc` est le hack C pour stocker le dest. JS le recopie. `obj_delivery` JS lit-il `owornmask` ainsi ?
4. `valley_level` / `Is_stronghold` / `Is_botlevel` JS : un hole au château → valley, comme C ?

## Risques / dette
1. Shop `stolen_value` : objets unpaid tombent sans facture/poursuite (nommé, mais c’est le vrai trou métier **et** RNG).
2. `add_to_migration` silencieux si `where≠FREE` : peut migrer un objet encore au sol/invent.
3. Autres callers C (`ship_object` kick/throw) non branchés — kick d’objet dans un trou ≠ dig hole.
4. `objects_at` JS doit exposer `nexthere` comme C `level.objects[x][y]` ; si c’est une Map get sans chaîne, la boucle ne voit qu’un objet.
5. Delivery : sans `obj_delivery` fidèle, la migration est un puits.

## Cohérence D-log / map
D-0961 fixed. Named omissions dans le D-log **et** dans `debt.md` dokick (stolen_value + ship_object). Double nommage : on ne peut pas accuser d’overclaim « complete impact_drop ». On peut accuser le mot **fixed** d’englober un helper dont le bras costly est vide. ACCEPT-WITH-DEBT, pas QUALITY-RISK : le wire dig HOLE non-shop est le C, et le shop est déclaré absent.

`turns.md` ajoute impact_drop HOLE floor fall. `digactualhole` named omit retire impact_drop, garde stolen_value. Cohérent.

`down_gate` / `drop_to` exportés : futurs `ship_object` pourront les réutiliser. Bon 1:1 `dokick.c`. `on_level` local dupliqué (déjà ailleurs dans le port) : smell mineur.

## Diff JS — hors port
`dokick.js` header : « + object fall-through (impact_drop) ». Imports `cansee`, `obj_extract_self`/`add_to_migration`, `t_at`, `stairway_at`, `ok_to_quest`, `MIGR_*`/`TRAPDOOR`/`is_hole`/`Is_stronghold`/`Is_botlevel`/`In_endgame`. `BOULDER`/`ROCK` locaux (dokick n’avait peut-être que KICKING_BOOTS). `on_level` local 4 lignes.

`mkobj.js` : import `OBJ_MIGRATING`. `add_to_migration` après `add_to_buried`. Pas d’autre churn mkobj.

`dig.js` : deux `await import('./dokick.js')` dynamiques — anti-cycle dig↔dokick (dokick n’importe pas dig). Pattern déjà vu (shopdig, dbridge). Pas une 2ᵉ frontière input.

`impact_drop` `for (let obj = objects_at(x,y); obj; ) { const obj2 = obj.nexthere; ... obj = obj2; }` : idiom C `obj2 = nexthere` avant extract. Si `nexthere` undefined, un seul objet. Critique déjà posée.

## Synthèse
`down_gate`/`drop_to` déterministes, `impact_drop` boucle `rn2(30|3)` + extract + migrate + messages : le C non-shop. `stolen_value` déclaré absent. Wires HOLE stay/mon, pas le bras `goto_level` (C non plus). Dette : billing shop, `add_to_migration` mou, delivery non vérifiée ici. Note 8 : parmi les huit, c’est le plus proche d’un port « lu puis recopié » après D-0962.

## RNG et callers — rappel
`down_gate`/`drop_to` : 0 RNG. `impact_drop` : 1×`rn2(30|3)` par objet éligible, skip missile/uball/uchain, skip boulder-vs-rock sans roll. Shop `stolen_value` C : RNG par objet costly — JS 0. Callers JS : 2 bras `digactualhole` HOLE. C aussi `ship_object` (kick/throw) — omis nommé. `add_to_migration` 0 RNG. `dlev!=0` (MIGR_WITH_HERO) non utilisé par le wire dig (0 passé) — comme C `impact_drop(..., 0)`.

## Ce que je ne pénalise pas
Je ne pénalise pas l’absence de `stolen_value` comme QUALITY-RISK : c’est nommé trois fois (fonction, D-log, map). Je ne pénalise pas `panic`→coerce sur `where` au-delà d’ACCEPT-WITH-DEBT. Je ne suppose pas que `obj_delivery` est cassé — je le pose en question ouverte. La boucle pile + `rn2` + messages est la raison de la note 8.

## CURRENT au hash
Next-cluster retire impact_drop. Keep D-0961. NOTES latest port down_gate/drop_to/add_to_migration. Cadence next @#1235 (pas ce hash). Process propre. `debt.md` dokick porte D-0961 **et** stolen_value still deferred — la map est plus précise que le mot « fixed ».

## Annexe — ordre de lecture C
1. `dokick.c:down_gate` 1943 / `drop_to` 1473 / `impact_drop` 1511–1632.
2. `mkobj.c:add_to_migration` 2698.
3. `dig.c:digactualhole` HOLE `if (newobjs) impact_drop(NULL,...)` stay + mon.
Le reviewer a lu la boucle `rn2` et le bloc costly omis. Delivery `obj_delivery` non relue (question ouverte).

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **8/10**
- Si je ne devais retenir qu’une critique : la boucle `rn2(30|3)` + migration est le C, mais vendre `impact_drop` « fixed » sans `stolen_value` laisse le chemin magasin (le seul qui tire du billing RNG/messages) volontairement creux.
