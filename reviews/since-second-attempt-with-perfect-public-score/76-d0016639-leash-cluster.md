# Review 76 — `d0016639` — leash use_leash / next_to_u / check_leash

## Métadonnées
- Hash complet / court : `d00166394e4e2bf4d7f49405e77f8ac066a78a28` / `d0016639`
- Parent : `28aac97f648e6b68f0e72ad0c1c0fb53dce1352e`
- Auteur, date : Raphaël Hervier, 2026-07-22 05:43:42 +0200
- D-id : D-1005
- Stats : 18 files, +601/−82
- JS : `apply.js` (+394), `allmain.js`, `cmd.js`, `dig.js`, `do.js`, `dog.js`, `eat.js`, `monsters.js`, `sounds.js`, `teleport.js`, `trap.js`

## Intention vs livrable
Retirer les gates `next_to_u` always-true et porter `use_leash` + stretch/choke/snap + callers stairs/tele/dig/trap/move/pet. Le diff **fait** cette famille C, pas un titre fourre-tout.

**Trop large ?** 18 fichiers / +601 impressionne. Playbook §2b : too-big = **sous-systèmes sans lien**. Ici le fan-out **est** la liste des callers C (`allmain` tele, `hack`/`cmd` `check_leash`, `do` stairs, `dig` hole, `trap` fall_through, `teleport` `teleport_pet`, `dog` unleash). Graisse réelle : `s_suffix` local faux, `mon_has_amulet` (C `wizard.c`) dans `apply.js`, `whimper` sounds, `eat.js` qui ne fait que réparer une itération `fmon`, `has_head`/`M1_NOHEAD`. Cluster **right-size sprawling**, pas un mélange potion+vault.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/apply.js` | Port : helpers + `use_leash` / `use_leash_core` / `next_to_u` / `check_leash` ; doapply LEASH |
| `js/cmd.js` | `check_leash(ux0,uy0)` après place (C `hack.c` `domove`) |
| `js/allmain.js` | Dynamic import `next_to_u`/`check_leash` post-tele |
| `js/do.js` `dig.js` `trap.js` `teleport.js` | Gates `next_to_u` / `teleport_pet` async |
| `js/dog.js` | `m_unleash` vrai |
| `js/sounds.js` | `whimper` (check_leash rn2(3)) |
| `js/monsters.js` | `has_head` |
| `js/eat.js` | `o_unleash` local : `fmon` array (pas d’unification) |

## Fidélité C ↔ JS

### `use_leash` / `use_leash_core` — `apply.c:769–876`

Ordre C : uswallow → MAXLEASHED=2 → `get_adjacent_loc` → self/steed dz&gt;0 → `m_at` / « no creature » + `unmap_invisible` ECMD_TIME → core.

Core : !spotmon && !glyph_invisible → fail leash + `map_invisible` ; !mtame ; attach (déjà mleashed / unsolid / nolimbs!head / !leashable / success `mleashed=1` `leashmon=m_id` `msleeping=0`) ; detach (mauvais id / cursed `bknown` / success).

JS : même cascade. `get_adjacent_loc_leash` via `getdir_self_ok` — D-log nomme `&lt;`/`&gt;` steed-dz self-cell encore thin. `glyph_is_invisible(loc)` JS prend un objet case, C le glyph : dépend du shape `level.at`.

`leashable` : !long worm, !unsolid, `!nolimbs \|\| has_head`. JS `mnum ?? data.mndx` vs C `mtmp->mnum`. Fragile si `mnum` non sync.

### `next_to_u` / `mleashed_next2u`

C : `get_iter_mons(mleashed_next2u)` puis `usteed && mon_has_amulet`. Callback : si mleashed et pas `m_next2u` → `mnexto(RLOC_NOMSG)` ; si toujours loin : cursed → **TRUE** (bloque) ; sinon drop laisse + You_feel slack.

JS itère `game.fmon` (pas migrate/mydogs — `find_mid` nomme déjà FM_FMON only). Puis destrier+AoY. `m_next2u` : dx²+dy² ≤ 2 ≡ C `distu <= 2`.

`mon_has_amulet` : scan `minvent` AMULET_OF_YENDOR. C `wizard.c`. 1:1 cassé, logique OK.

### `check_leash` — RNG choke / snap / growl

C invent nobj, `find_mid(leashmon, FM_FMON)`. JS `find_mid(id, 0)` : l’impl **ignore** les flags et scanne `fmon` — équivalent FM_FMON.

Si distance au héros **augmente** :
- `!um_dist(...,3)` : no-op (assez près) ;
- else cursed && !breathless : `um_dist(...,5) \|\| (mhp -= rnd(2)) <= 0` → choke death `xkilled` ; **short-circuit** : `rnd(2)` **seulement** si um_dist(5) est faux. JS : `((mtmp.mhp = mhp - rnd(2)) <= 0)` dans le `||` — même court-circuit clang LTR.
- else um_dist 5 → snap `m_unleash(FALSE)` ;
- else « You pull » + si `data->msound != MS_SILENT` `switch(rn2(3))` growl/yelp/whimper.

JS : `mon_msound(mtmp) !== MS_SILENT` puis `rn2(3)`. **Écart :** `mon_msound` **infère** S_DOG→bark si `ptr.msound` absent. C lit `data->msound` brut. Une inférence non-silent → **`rn2(3)` extra** + son. Inverse : msound C silent, JS infère → jets en trop.

### `s_suffix` **faux**

C `hacklib.c` : `it`→`its`, `you`→`your`, finit par `s` → `s'`, **sinon `s's`**. Pas de cas x/z/ch/sh.

JS `s_suffix_leash` : x/z/ch/sh → `'` seulement. « fox » C : `fox's` ; JS : `fox'`. Pline snap divergente. Copié-collé anglais scolaire, pas le C.

### `mhis` / Hallu RNG

C `mhis` = `genders[pronoun_gender(mtmp, PRONOUN_HALLU)].his`. Si Hallucination, `pronoun_gender` fait **`rn2(4)`**. JS `mhis_leash` : female→her else his, **Hallu nommé omit**. Un `m_unleash(true)` visible sous hallu : C consomme `rn2(4)` ; JS non.

### Callers
- `cmd.js` `check_leash` après placement : analogie `hack.c:2962` `check_leash(u.ux0,u.uy0)`. Tout mouvement qui **n’emprunte pas** `cmd.js:domove` skip le check (travel ?).
- Dynamic `import('./apply.js')` partout : cycles, pas du C.
- `teleport_pet` : cursed + !force → `yelp` + false ; sinon `m_unleash(false)`. C conforme. Devient async ; `mtele_trap` / `mlevel_tele_trap` / dig `await` — grep du commit semble complet.
- `eat.js` garde un **`o_unleash` local** (seulement fix `for...of fmon`). Deux unsync : apply exporte, eat duplique.

### `um_dist` / `m_next2u`
C `um_dist(x,y,n)` : Chebyshev &gt; n. JS `abs(ux-x)>n \|\| abs(uy-y)>n` : identique (max-norm). Utilisé à 3 et 5 dans check_leash. Pas de RNG.

### `number_leashed` / invent array
C `for (obj = invent; obj; obj = nobj)` LEASH && leashmon≠0. JS `for (const obj of game.invent \|\| [])`. Si invent JS n’est pas une liste chaînée nobj mais un array, l’ordre d’itération de `check_leash` (qui **peut** `rnd(2)` / `rn2(mtame)` / `rn2(3)` **par laisse**) dépend de l’ordre array ≡ nobj. Un sort d’invent casserait l’ordre des jets multi-laisses (MAXLEASHED=2 : au plus deux).

### `xkilled` choke
C : `save_pacifism = u.uconduct.killer` ; pline choke death ; `xkilled(NOMSG)` ; si !DEADMONSTER restore killer. JS : `save_pacifism = uconduct.killer|0` ; même pline ; `await xkilled` ; restore si `mhp>0`. C `DEADMONSTER` vs JS `mhp>0` : un monstre lifesavé avec mh affichée 0 le temps d’un frame ? Fragile. `rn2(mtame)` tameness drop seulement dans le bras **non mortel** (else du um_dist5\|\|hp). JS identique.

### Dynamic import et cycles
`allmain` / `teleport` / `dig` / `do` / `trap` / `dog` importent `apply.js` à la volée. Évite un cycle ESM apply↔teleport. Coût : première laisse / premier téléport charge apply. Pas un écart C. Risque : deux copies de module si un jour le bundler split (interdit Rule #2 de toute façon — pas de bundler).

## Constitution / playbook
Grep : `FORCETRAP` dans trap.js = flag C, pas FORCE de constitution. RAS Rule #2 / frozen / fastforward. Pas de seed dans le contrôle. `MAXLEASHED = 2` copié de `#define MAXLEASHED 2` apply.c (undef après next_to_u). `MS_SILENT = 0` local apply vs sounds.js : duplication de constante, collision si C change.

## Densité (§2b)
**Right size** (famille laisse) **à la limite too-big** par volume et helpers recopiés (`s_suffix`, `l_monnam`, `HowMany` n’est pas là mais `um_dist`/`m_next2u` locaux). Un peel `use_leash` sans callers aurait été too-small (gates always-true). Le choix « tout le cluster callers » est le bon ; +601 est le coût C, pas un mélange.

## Documentation
D-1005 Status fixed. Symptom : next_to_u/check_leash always-true ; LEASH apply unwired ; m_unleash thin clear. Fix liste les callers. Deferred : getdir `&lt;`/`&gt;` steed-dz ; invent `update_inventory` ; `artifact.c` `next_to_u` ; `end.js` `unleash_all` bones ; saddle/whistle apply.

**Ne nomme pas** `s_suffix` faux, Hallu `rn2(4)` `mhis`, `mon_msound` inféré, `o_unleash` dup eat. `artifact.c` next_to_u : si un artefact téléporte le héros sans passer par `teleport.js:dotele`, le gate manque — deferral réel.

Journal #1276 green + apply/move/pet 15/16. Pas de cadence full suite (la #1275 vient d’être faite). CURRENT next absent.md / mon_poly mon / saddle-whistle — cohérent D-1006/1007/1008.

`turns.md` : « next_to_u/check_leash body + CQ_REPEAT still thin » D-1002 doit être retiré. Si le diff map ne fait que +4 lignes, vérifier que la phrase always-true a bien disparu des lignes tele/do/dig.

## Vérification
Cohorte 15/16 seed0009. Les sessions publiques n’attachent probablement jamais une laisse. Non-régression ≠ exercice choke `rnd(2)`.

## Risques / dette
1. `s_suffix` non-C → écrans leash snap.
2. Hallu `mhis` : `rn2(4)` manquant.
3. `mon_msound` vs `data.msound` : `rn2(3)` de trop ou de moins.
4. `eat.js` `o_unleash` parallèle.
5. `check_leash` seulement sur `cmd.js:domove`.
6. `find_mid` flags ignorés (OK leash, piège migrate).

## Complément — callers `next_to_u` C vs JS

C `next_to_u` (false = bloqué) apparaît notamment :
- `allmain.c` après tele réussi → `check_leash`
- `hack.c` `domove` → `check_leash(ux0,uy0)` **toujours** après move (pas un gate)
- `do.c` `dodown`/`doup` : « held back by your pet »
- `dig.c` `digactualhole` : jerk back, `wont_fall = TRUE`
- `trap.c` `fall_through` : `dont_fall = "are jerked back by your pet!"`
- `teleport.c` `dotele` / `level_tele` / `tele_trap` : shudder return
- `teleport.c` `(void) next_to_u()` **après** `tele()` dans dotele — JS `await next_to_u()` post-tele sans tester le booléen, comme C `(void)`
- `artifact.c` : **non câblé** (D-log)

`check_leash` n’est **pas** un gate : C l’appelle après le déplacement pour stretch. JS `cmd.js` après place, before newsym. Si `domove` JS abort avant place, pas de check — C non plus (le call est après succès de move).

`teleport_pet` C : steed return false (ne migrate pas) ; mleashed cursed !force → yelp false ; sinon unleash puis true. JS D-1005 : même chose, async yelp. Dig hole / trap level tele `await teleport_pet`. Un oubli `await` ferait passer une Promise truthy **toujours** (bug async classique). Grep du commit : dig, trap, teleport attendent. `eat.js` n’appelle pas teleport_pet.

`unleash_all` exporté, **pas** câblé bones/end (nommé). Une mort JS laisse `mleashed` sur les monstres du niveau persisté.

`use_leash` return ECMD_OK vs TIME : swallow/maxleash/getdir fail OK ; no creature TIME ; attach TIME. C identique. doapply `res = await use_leash` `(res & ECMD_TIME) !== 0` — si `use_leash` return `ECMD_OK` (0), doapply return false (pas de tour). Conforme.

## Tableau branches (D-1005)

| C | JS | RNG |
|---|---|---|
| MAXLEASHED 2 | 2 | — |
| mleashed_next2u mnexto | await mnexto RLOC_NOMSG | rloc interne |
| cursed leash blocks next_to_u | return true | — |
| check_leash um_dist 5 \|\| hp-=rnd(2) | court-circuit LTR | `rnd(2)` si !um_dist5 |
| rn2(mtame) tameness | identique | oui |
| rn2(3) growl/yelp/whimper | via mon_msound inféré | **peut différer** |
| mhis Hallu rn2(4) | omit | **manquant** |
| s_suffix it/you/s | x/z/ch/sh inventés | pline seule |
| teleport_pet yelp | await yelp | sons |

18 fichiers : apply (corps) + 10 callers/helpers. Pas potion, pas vault hors leash. **Pas too-wide sémantique.**

C `m_unleash` feedback (`apply.c:726`) : `canseemon` → `"%s pulls free of %s leash!"` avec `mhis(mtmp)` ; sinon `"Your leash falls slack."`. JS D-1005 : même split. Le `rn2(4)` Hallu est **dans** `mhis` / `pronoun_gender`, pas dans `m_unleash` lui-même. Un snap visible sous Hallucination : C consomme le jet ; JS `mhis_leash` female/his fixe.

C `o_unleash` : scan `fmon` par `m_id == otmp->leashmon`, clear `mleashed`, `leashmon=0`, `update_inventory()`. JS apply exporte ça. `eat.js` recopie un scan `for...of fmon` **sans** `update_inventory` — si un digest détruit une laisse, l’inventaire visuel JS peut rester « en laisse » un tour. Pas de RNG dans `o_unleash`.

C `number_leashed` : compte LEASH avec `leashmon != 0` sur `invent`. Gate `use_leash` : `>= MAXLEASHED` (2) → ECMD_OK, pas de `getdir`. JS identique. Le troisième apply laisse **ne tire pas** de direction — conforme.

`cmdq_clear(CQ_REPEAT)` D-1002 restait thin ; D-1005 **ne le porte pas**. Un téléport allmain + laisse : JS appelle enfin `next_to_u`/`check_leash` (dynamic import), mais le doagain queue reste le stub D-1002. Hors cluster laisse — le D-log D-1005 le liste encore en deferred via saddle/whistle, pas CQ_REPEAT. `turns.md` D-1002 « CQ_REPEAT still thin » doit rester vrai.

`get_adjacent_loc` C pour leash autorise self-cell et, pour un destrier, `dz` ? D-log nomme `&lt;`/`&gt;` steed-dz encore thin. JS `getdir_self_ok`. Un joueur qui selle/laisse « vers le haut » depuis le destrier : C et JS peuvent diverger **sans** RNG (early ECMD_OK). Acceptable nommé.

`artifact.c` `next_to_u` : téléport artefact (AoY / Wizard) sans passer par `teleport.js:dotele`. JS D-1005 ne greffe pas ce caller. Un héros laissé + artefact tele : C peut « held back by pet » ; JS part. Pas exercé en public.

Volume +601 : `use_leash_core` + messages attach/detach + `check_leash` stretch + wrappers async. Le graphe callers C **oblige** 10 fichiers JS. Ce n’est pas un peel « apply + potion + vault ». Too-wide **comptable**, right-size **sémantique**.

C `check_leash` stretch (distance **augmente**) : `um_dist(3)` no-op ; cursed + !breathless + (`um_dist(5)` **ou** `mhp -= rnd(2)` ≤ 0) choke ; sinon `um_dist(5)` snap ; sinon pull + `rn2(3)` son. Si la distance **diminue** ou reste égale, C ne rentre pas dans ce `if (dist2 new > dist2 old)` : zéro `rnd(2)` / `rn2(mtame)` / `rn2(3)`. JS compare dist old vs new pareil. Un pas **vers** le pet : pas de jet. Conforme.

`rn2(mtame)` tameness : seulement dans le else du choke **non mortel** (hp après `rnd(2)` encore > 0). Court-circuit `um_dist(5) || (hp-=rnd(2))<=0` : si um_dist(5) vrai, **pas** de `rnd(2)` et mort choke (xkilled). JS LTR identique. `s_suffix(Monnam)` sur snap : pline seule, **après** les jets choke éventuels d’**autres** laisses déjà itérées (invent order). Deux laisses : l’ordre `nobj` fixe l’ordre des `rnd(2)`.

C `use_leash` attach success : `mtmp->mleashed = 1`, `otmp->leashmon = mtmp->m_id`, `mtmp->msleeping = 0`. **Pas** `maybewakesteed` (c’est saddle). JS pose les mêmes champs. Un pet endormi attaché se réveille **sans** `rn2(frozen)`. Identique.

Detach cursed : C `if (otmp->cursed)` `bknown`, pline stuck, ECMD_TIME (le tour est consommé). JS identique. Pas de jet. Unattempt de détacher une laisse maudite **brûle un tour** sans RNG — conforme.

`sounds.js` `whimper` : C `yelp`/`growl` existaient déjà JS ; D-1005 ajoute whimper pour le `rn2(3)` case 2. Si `whimper` JS no-op (pas de pline), le jet `rn2(3)` est quand même tiré — l’écran manque, pas le keystream. Dette message.

`has_head` / `M1_NOHEAD` dans `monsters.js` : `leashable` C `!nolimbs(ptr) || has_head(ptr)`. Un slime (nolimbs, no head) refuse. JS après D-1005 : même formule. Pas de RNG. Un worm long : C `!leashable` (long worm exclu). JS `mnum` worm — si `mnum` faux, attach illégal.

`update_inventory` C après attach/detach / o_unleash : JS sauté (D-log). L’écran inventaire peut mentir un tour ; pas de `rn2`.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7/10**
- Si je ne devais retenir qu’une critique : **ce n’est pas trop large au sens §2b** (c’est la famille C) ; la fidélité RNG/pline casse sur `s_suffix` inventé et sur `mon_msound` inféré, pas sur l’arbre attach/choke.
