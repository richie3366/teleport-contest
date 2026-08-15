# Review 05 — `ad8c5cc615117701affa7ded0fb6a65548a8523b` — `b_trapped` + `make_stunned`

## Métadonnées
- Hash complet / court : `ad8c5cc615117701affa7ded0fb6a65548a8523b` / `ad8c5cc6`
- Parent : `d57a5c852c61d1f64030fe76e0746ec4b561e3b7`
- Auteur, date : Raphaël Hervier `<richie3366@gmail.com>`, 2026-07-21 22:10:25 +0200
- D-id : **D-0938**
- Stats : 13 files, +181/−78 (JS : 6 files, +104/−31)
- Fichiers JS / map / cadence : `trap.js`, `potion.js`, `eat.js`, `hack.js`, `lock.js`, `dokick.js` ; `debt.md` ; journal #1206 ; archive journal rotaté (bruit).

## Intention vs livrable
Promet : remplacer les kaboom/stubs tin/door/chew/kick par `b_trapped` + `make_stunned` (wake/stun/exercise).

Livrable : une fonction C `b_trapped` + helper `make_stunned` + **cinq** call sites déjà identifiés en dette D-0935/D-0937 (tin, SDOOR/door chew, picklock, `doopen_indir`, `kick_door`). Pas un rewrite trap.js. Le D-log nomme Soundeffect / stagger / shop.

Question densité : 6 fichiers JS, ~104 LOC net. Est-ce trop large ? Non : une famille caller/callee, un falsifier. §2b « usually one JS module (or two) » est une préférence, pas une interdiction des wires. Too small non plus (ce n’est pas un `if` isolé). **Right size.**

## Inventaire

| Fichier | Rôle |
|---------|------|
| `js/trap.js` | Port `b_trapped` + `wake_nearby` **local** (C `mon.c`) |
| `js/potion.js` | Port `make_stunned` |
| `js/eat.js` | Wire `consume_tin` : stub kaboom → `b_trapped('tin', NO_PART)` |
| `js/hack.js` | Wire `still_chewing` SDOOR/door |
| `js/lock.js` | Wire `picklock` / `doopen_indir` `FINGER` |
| `js/dokick.js` | Wire `kick_door` `FOOT` |
| `debt.md`, D-log, NOTES, journal, archive | D-0938 + rotation journal |

## Fidélité C ↔ JS

### `b_trapped` — C `trap.c:6694` / JS `trap.js:b_trapped`

```6694:6707:nethack-c/upstream/src/trap.c
b_trapped(const char *item, int bodypart)
{
    int lvl = level_difficulty(),
        dmg = rnd(5 + (lvl < 5 ? lvl : 2 + lvl / 2));
    Soundeffect(se_kaboom, 80);
    pline("KABOOM!!  %s was booby-trapped!", The(item));
    wake_nearby(FALSE);
    losehp(Maybe_Half_Phys(dmg), "explosion", KILLED_BY_AN);
    exercise(A_STR, FALSE);
    if (bodypart != NO_PART)
        exercise(A_CON, FALSE);
    make_stunned((HStun & TIMEOUT) + (long) dmg, TRUE);
}
```

JS : `level_difficulty(u.uz) || 1` — si C renvoie 0, JS force 1 (**dmg shift** aux niveaux 0). Formule `rnd(5+(lvl<5?lvl:2+trunc(lvl/2)))` : division entière C vs `Math.trunc` — OK. `The(item)` via `objnam.The`. `wake_nearby(false)`. `losehp(maybe_half_phys(dmg), ...)`. `exercise(A_STR,false)` ; CON si `bodypart !== NO_PART`. `make_stunned((HStun&TIMEOUT)+dmg, true)`.

**Confirmation ordre** : dmg → pline → wake → losehp → STR → CON? → stun. Identique. RNG : un `rnd` de dégâts ; `maybe_half_phys` ne tire pas. `Soundeffect` sauté (nommé).

`maybe_half_phys` JS teste `HHalf_physical_damage \|\| EHalf_physical_damage`, pas le macro C `Half_physical_damage` (worn/extrinsic combinés). Sous-half possible. Préexistant, pas introduit ici — mais `b_trapped` en hérite maintenant sur **tous** les kaboom.

Callers branchés avec les **bons** `bodypart` C : tin/chew `NO_PART` (pas de CON) ; lock/open `FINGER` ; kick `FOOT`. D-0935 perdait wake/stun/half-phys — **corrigé**.

### `wake_nearby` local — C `mon.c:4367` `wake_nearto_core`
C : `dist2 < u.ulevel*20` ; skip `DEADMONSTER` ; `wake_msg` ; `msleeping=0` ; `!(G_UNIQ)` clear `STRAT_WAITMASK` ; si `!mon_moving && petcall` whistletime / `mon_track_clear` ; `disturb_buried_zombies`.
JS : boucle `fmon` ; skip `mx==null` (**pas** `mhp<=0`) ; `dx²+dy² < distance` ; `msleeping=0` ; `G_UNIQ` garde WAITMASK ; `void _petcall`.

Écarts : pas `wake_msg` ; pas zombies ; pas pets ; monstres morts encore sur la carte réveillés. D-log dit « `b_trapped` + local `wake_nearby` » et nomme wake_msg/zombies/petcall dans le **commentaire JS**, pas comme deferral D-0938 principal. Overclaim léger : « wake » n’est pas `mon.c`.

Duplication : si `mon.js` porte `wake_nearby` plus tard, deux copies.

### `make_stunned` — C `potion.c:107` / JS `potion.js:make_stunned`
`Unaware` coupe talk ; clear → « less wobbly » / « a bit steadier » ; set → steed « wobble in the saddle » sinon `You("%s...", stagger(..., "stagger"))`. JS : `'You stagger...'` fixe. Nommé. `botl` sur transition 0↔nonzero. `HStun` timeout + miroir `u.Stunned` (C : `Stun ≡ HStun`). Pas de RNG. Callers : `b_trapped` seulement ici ; autres `make_stunned` C (rust spit, etc.) toujours absents.

### Wires
- `consume_tin` : remplace le kaboom maison D-0935. `rn2(8)` du curse trap **reste** avant l’appel — C-fidèle.
- `still_chewing` SDOOR/door : C appelle `b_trapped` **sans** `add_damage` sur SDOOR (shop seulement porte visible). JS pareil à ce stade (shop toujours deferred).
- `picklock` / `doopen` : `D_NODOOR` **puis** `b_trapped` — ordre C (mask clear before explosion).
- `kick_door` : `FOOT` — CON exercise. Correct.

Callers C **non** portés (hors cluster, OK) : autres `b_trapped("chest")` / coffre, etc. Non listés dans `debt.md` eat — dette trap plus large non nommée ici.

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/`fs`/fastforward/seeds. Frozen RAS. `await b_trapped` / `make_stunned` / `losehp` (losehp **sync** — await inerte). Rule #2 RAS.

1:1 : `b_trapped` dans `trap.js` correct ; `wake_nearby` **pas** dans `mon.js`.

## Densité (§2b)
Right size. Six fichiers mais **un** locus C + wires déjà en dette named. Pas « finish traps ». Pas un `if` isolé dans `eat.js` seulement (ça aurait laissé lock/kick stub). §2b « tight caller/callee family » — c’est le cas. ~104 LOC un peu sous 50–300 si on compte net, mais le travail est le câblage, pas le volume.

## Documentation
D-0938 **fixed** + Soundeffect, stagger, shop/`watch_dig`, `costly_tin(COST_DSTROY)`. `debt.md` retire `otrapped b_trapped` de eat. CURRENT Keep. NOTES 60 lignes.
D-0937 deferred mis à jour : door `b_trapped` → D-0938. Chaîne D honnête.
Overclaim : « match wake/stun/exercise semantics » — stun/exercise oui ; wake = sous-ensemble.

Journal : green + eat/kick cohort 12/12. Kick cohort justifie `dokick.js`. Cadence @#1210 pas encore.

## Vérification
Affirmation journal. Le remplacement tin kaboom **change** RNG/HP (half-phys + stun timeout) vs D-0935 : un cohort eat qui ne déclenche pas de tin piégé ne voit rien. Preuve faible sur le cœur `b_trapped`. Green = forteresse, pas le piège.

## Largeur du cluster — décompte

Fichiers JS touchés : 6. LOC net ~+73. Fonctions **nouvelles** : `b_trapped`, `wake_nearby` (locale), `make_stunned`. Le reste est 5 substitutions de commentaires `// b_trapped deferred`.

§2b « Too small » = un `if` isolé. Ici les cinq wires sont le **produit** : laisser lock/kick en stub après avoir porté `b_trapped` aurait été trop petit. « Too big » = potions + mon.c + eat sans lien. Ici tous les diffs citent `b_trapped`/`make_stunned`. **Right size.** L’inquiétude « trop large » du brief est infondée sur le graphe d’appels ; elle serait fondée si `wake_nearby` avait entraîné un port `disturb_buried_zombies` + pets dans le même SHA.

Rotation journal `docs/archive/AGENT-LOOP-JOURNAL-2026-07-21b.md` : +38 lignes d’archive dans le même commit que le port. Bruit cadence. Pas un second port.

## `consume_tin` avant/après

D-0935 :
```
const dmg = rnd(5 + (lvl < 5 ? lvl : 2 + Math.trunc(lvl / 2)));
await pline('KABOOM!!  The tin was booby-trapped!');
losehp(dmg, 'explosion', KILLED_BY_AN);
```
D-0938 : `await b_trapped('tin', NO_PART)` puis `costly_tin` + `use_up_tin` inchangés. Le `rn2(8)` du curse **reste devant**. C `The("tin")` vs ancien JS « The tin » hardcodé — maintenant `The(item)` ; hallu/article peuvent différer. `NO_PART` : pas d’`exercise(A_CON)` — C tin pareil. Kick `FOOT` **a** CON — c’est pour ça que `dokick.js` est dans le cluster.

`lock.js` : deux sites (`picklock` occupation, `doopen_indir`). C `b_trapped("door", FINGER)` puis unblock. JS `doormask=D_NODOOR` puis `b_trapped` puis `recalc_block_point`/`vision_recalc` (picklock). `doopen` n’ajoute pas `newsym` dans le hunk montré — à vérifier vs C `doopen` qui `newsym` après. Possible oubli d’affichage, pas RNG.

## `make_stunned` vs `make_confused` déjà là

Le fichier `potion.js` avait `make_confused` / `make_vomiting` / `make_glib`. `make_stunned` copie le pattern timeout + talk + botl. C stagger : `You("%s...", stagger(youmonst.data, "stagger"))` → « stagger » / « flounder » selon forme. JS toujours « You stagger... ». Un hero en blob « stagger » est faux. Nommé. `usteed` branch porté (saddle). `u.Stunned = u.HStun` : les gates JS qui lisent `.Stunned` et pas `HStun` voient l’update — rustine d’état, pas C.

## Risques / dette
1. `wake_nearby` local incomplet (DEADMONSTER, msgs, zombies, pets).
2. `level_difficulty()||1` vs 0 C — dmg `rnd` shift.
3. `maybe_half_phys` extrinsèques incomplets vs macro `Half_physical_damage`.
4. Autres callers `b_trapped` (chests, boxes) hors map eat — silence `debt.md`.
5. `make_stunned` stagger poly : verbe faux held-out.
6. Cohort eat/kick 12/12 sans tin `otrapped` ne mesure pas le cœur.
7. Double `wake_nearby` futur si `mon.js` porte l’officiel.

## Extrait C — `wake_nearto_core` vs copie locale

```4374:4398:nethack-c/upstream/src/mon.c
    for (mtmp = fmon; mtmp; mtmp = mtmp->nmon) {
        if (DEADMONSTER(mtmp))
            continue;
        if (distance == 0 || dist2(mtmp->mx, mtmp->my, x, y) < distance) {
            wake_msg(mtmp, FALSE);
            mtmp->msleeping = 0;
            if (!(mtmp->data->geno & G_UNIQ))
                mtmp->mstrategy &= ~STRAT_WAITMASK;
            if (svc.context.mon_moving || !petcall)
                continue;
            if (mtmp->mtame) {
                if (!mtmp->isminion)
                    EDOG(mtmp)->whistletime = svm.moves;
                mon_track_clear(mtmp);
            }
        }
    }
    disturb_buried_zombies(x, y);
```

JS `trap.js` `wake_nearby` : skip `mx==null` seulement ; pas `DEADMONSTER`/`mhp` ; pas `wake_msg` ; pas pets ; pas zombies. `b_trapped` C passe `petcall=FALSE` donc le bloc tame C est **sauté** de toute façon (`!petcall` → continue). L’écart **utile** pour ce caller : `wake_msg`, morts encore listés, `disturb_buried_zombies`. Un nécropole sous un tin piégé : C réveille des zombies enterrés ; JS non. Rare, non dans le D-log principal.

`make_stunned` C `potion.c:119-125` : `You("%s...", stagger(gy.youmonst.data, "stagger"))`. JS `'You stagger...'`. Formes sans jambes : C conjugue ; JS non.

`dokick.js` : `await b_trapped('door', FOOT)` après `doormask=D_NODOOR`. C kick_door même ordre. `FOOT !== NO_PART` → `exercise(A_CON,false)` en plus de STR. C’est la **seule** raison d’inclure kick dans le cluster : un tin `NO_PART` ne teste pas CON.

## `losehp` sync vs `await`

`hack.js` `export function losehp` (pas async). D-0938 `await losehp(...)` est inerte. Pas de frontière `nhgetch` nouvelle. `make_stunned` est async à cause de `You_feel`/`pline` — légitime (messages). `b_trapped` async pour la même raison. Un tin piégé pendant `opentin` occupation : `consume_tin` await `b_trapped` await `make_stunned` — pile d’await messages, capture écran via `_preNhgetchHook` si un `--More--` apparaît. Pas d’await hors input.

Cohort « eat/kick 12/12 » : kick_door piégé n’est pas dans les seeds publics typiques. Le wire `dokick` est de la **dette named** retirée sur papier, pas une preuve runtime. Green gate tourist n’ouvre pas de porte `D_TRAPPED`. La forteresse ne dit rien sur CON exercise. Un focused session avec un tin `otrapped` (wizard wish) serait le seul falsifier sérieux ; le journal n’en cite pas. `lock.js` `doopen_indir` sans `newsym` après kaboom : la case peut rester glyph porte jusqu’au prochain `vision_recalc` caller. C `doopen` `newsym` après `b_trapped`. Écart affichage held-out, pas RNG.

Formule C réelle (`trap.c:6696`) — **pas** `rnd(5)+(lvl+1)/2` :

```
int lvl = level_difficulty(),
    dmg = rnd(5 + (lvl < 5 ? lvl : 2 + lvl / 2));
Soundeffect(se_kaboom, 80);
pline("KABOOM!!  %s was booby-trapped!", The(item));
wake_nearby(FALSE);
losehp(Maybe_Half_Phys(dmg), "explosion", KILLED_BY_AN);
```

JS copie `rnd(5 + (lvl < 5 ? lvl : 2 + trunc(lvl/2)))`. **Branch-fidèle.** Écart RNG : `level_difficulty(uz) || 1`. Si C `lvl==0`, `rnd(5+0)=rnd(5)` ; JS `||1` → `rnd(6)`. Un dlvl 0 / calice bizarre. Faible mais réel, non nommé.

`bodypart` des wires D-0938 vs C : tin `NO_PART` (`eat.c:1538`) ; SDOOR/door chew `NO_PART` (`hack.c:788/802`) ; lock `FINGER` (`lock.c:141/908`) ; kick `FOOT` (`dokick.c:939/988`). JS **même tokens**. Pas HAND/ARM. `make_stunned` n’utilise pas `bodypart` ; seul `exercise(A_CON)` en dépend.

Callers C **hors** cluster : `trap.c:6076` (autre porte), `dig.c:536` (creuser une porte piégée), `detect.c:1753`. **Pas** `apply.c` bag. `mb_trapped` monstre (`monmove.c`) est une autre fonction. Le cluster n’est pas trop large ; il est **incomplet vers le haut** (dig/detect) plutôt que trop large vers le côté.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7.5/10**
- Si je ne devais retenir qu’une critique : `b_trapped` suit l’ordre C (dmg, The, half-phys, exercise, stun) et les `bodypart` des wires sont justes, mais « wake » est une copie locale amputée de `mon.c` et le cluster n’est pas trop large — il est sous-testé (cohort sans tin/door piégés).
