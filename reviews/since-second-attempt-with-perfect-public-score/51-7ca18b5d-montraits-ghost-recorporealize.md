# Review 51 — `7ca18b5d` — montraits / omonst revive + ghost recorporealize

## Métadonnées
- Hash complet / court : `7ca18b5d9060f593f2987edeeb5befc66dcc81d5` / `7ca18b5d`
- Parent : `652a66274c27c9b9d78de5cbd9fa176b31d09c8c`
- Auteur, date : Raphaël Hervier, 2026-07-22 02:35:07 +0200
- D-id : **D-0982**
- Stats : 14 files, +653/−99
- Fichiers JS / map / cadence : `js/const.js`, `js/dog.js`, `js/makemon.js`, `js/mhitm.js`, `js/mkobj.js`, `js/mon.js`, `js/zap.js` ; `docs/c-js-map/debt.md` ; journal #1252 (pas de cadence)

## Intention vs livrable
Le message : brancher `save_mtraits` dans `mkcorpstat` et restaurer les cadavres `omonst` via `montraits` pour que `revive` suive C (traits / ghost join) au lieu d’un `makemon` nu.

Livrable réel : helpers oextra (`has_omonst`/`OMID`/`save_mtraits`/`get_mtraits`/`free_*`) ; `mkcorpstat` n’ignore plus `mtmp` ; `montraits` + `replmon`/`copy_mextra`/`find_mid`/`mongone`/`restore_cham` ; `revive` bras omonst + `wary_dog` + ghost `OMID` ; `KEEPTRAITS` élargi dans `mhitm.js` `make_corpse` ; `monhp_per_lvl`.

**Honnêteté « complete revive » :** le sujet ne dit pas « complete ». Le D-log dit « fixed » pour *ce* deferral (omonst/ghost), et nomme encore `stolen_value`, `animate_statue`, `cant_finish_meal`, `forget_temple_entry`, replshk/worm/light. La map zap.js retire montraits de la liste d’omission et **garde** stolen_value / animate_statue / cant_finish_meal. Ce n’est pas un overclaim « revive complet ». C’est un cluster D-0964 suite. Le risque est plutôt de lire « revive matches C » trop large : `cant_finish_meal` C tourne **toujours** en tête de `revive` ; JS l’omet encore.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/mkobj.js` | Port `save_mtraits`/`get_mtraits`/`newomonst`/`mkcorpstat` traits |
| `js/zap.js` | Port `montraits` + wire `revive` omonst/ghost |
| `js/mon.js` | Port thin `copy_mextra`/`replmon`/`find_mid`/`mongone`/`restore_cham` |
| `js/dog.js` | Port `wary_dog` |
| `js/makemon.js` | Port `monhp_per_lvl` |
| `js/mhitm.js` | `KEEPTRAITS` dans `make_corpse` |
| `js/const.js` | `has_omonst`/`OMID`/`has_omid` |
| `docs/c-js-map/debt.md` | Omissions restantes nommées |

## Fidélité C ↔ JS

### `mkcorpstat` / `save_mtraits`
**C :** `mkobj.c:2067`, `2157`. JS : `mtmp` n’est plus `_mtmp` ignoré ; `norevive` depuis `game.mkcorpstat_norevive` ; si `mtmp` : `save_mtraits`, `ptr` défaut, cancelled non-rider → `norevive`. Fidèle à l’enveloppe.

`save_mtraits` : C `*mtmp2 = *mtmp` puis invalide pointeurs. JS copie `Object.keys` en sautant `mextra`/`nmon`/`data`/`minvent`/`mw`/`edog` puis `copy_mextra`. **Écart :** champs JS-only ou getters non énumérés peuvent manquer ; `forget_temple_entry` ispriest nommé omit. HP floor `mhpmax <= baselevel` + clamp mhp : C.

`get_mtraits(copyof)` : copie superficielle + `copy_mextra` ; `data = mons(mnum)`. C `newmonst()` + struct copy. Assez pour revive.

### `montraits`
**C :** `zap.c:713-826`. JS : `get_mtraits(..., true)` ; `makemon` flags `NO_MINVENT|MM_NOWAIT|MM_NOCOUNTBIRTH|MM_NOTAIL|MM_NOMSG` (+ `MM_ADJACENTOK`) ; heal drain `rnd(mlevel+1)` + boucle `monhp_per_lvl` ; copie mx/my/m_id/quest leader ; flags mrevived/mcan/seduce ; `isshk` `neweshk`+`Object.assign` (C `bill_p` rebase nommé omit) ; `replmon` ; `restore_cham`.

Ordre des champs copiés depuis `mtmp` vers `mtmp2` : aligné sur C. RNG drain : `rnd` puis éventuellement N× `monhp_per_lvl`.

### `monhp_per_lvl` — écart RNG
**C :** `makemon.c:986-1007` :

```986:1006:nethack-c/upstream/src/makemon.c
monhp_per_lvl(struct monst *mon)
{
    struct permonst *ptr = mon->data;
    int hp = rnd(8); /* default is d8 */

    if (is_golem(ptr)) {
        hp = golemhp(monsndx(ptr)) / (int) ptr->mlevel;
    } else if (ptr->mlevel > 49) {
        hp = 4 + rnd(4);
    } else if (ptr->mlet == S_DRAGON && monsndx(ptr) >= PM_GRAY_DRAGON) {
        hp = 4 + rn2(5);
    } else if (!mon->m_lev) {
        hp = rnd(4);
    }
    return hp;
}
```

C **consomme toujours** un `rnd(8)` puis l’écrase. JS ne tire `rnd(8)` que sur le fallback (pas de ptr, ou monstre ordinaire). Golem / mlevel>49 / dragon / m_lev==0 : **un appel RNG de moins** par niveau restauré dans `montraits`. Le commentaire JS prétend omettre golem/dragon alors que le corps les porte — commentaire faux, bug RNG vrai.

### `revive` omonst / ghost
**C :** `zap.c:1000-1094`. JS : `has_omonst` → `montraits` + `wary_dog(mtmp, true)` si tame non-minion ; `has_omid` → `find_mid` (FM_FMON only, omit migrate/mydogs) ; invent ghost → `add_to_minv` ; `tamedog` ; `mconf=1` ; `mongone` ; `free_omid`. Stolen_value encore commenté (D-0983). `cant_finish_meal` toujours omit (C l.909, **avant** makemon).

`mongone` JS : splice `fmon`, clear ustuck/usteed, `minvent=null`, newsym. C `mongone` : timers, worm, shop, light, invent drop. Named thin. Ici l’inventaire ghost est transféré **avant** `mongone` — OK si `minvent` est une chaîne `nobj`. Si JS stocke un tableau, `while (ghost.minvent)` peut boucler ou no-op.

### `wary_dog`
**C :** `dog.c:1292`. JS porte mhpmax_penalty, abuse/`killed_by_u` → untame + `rn2(abuse+1)` peaceful, `rn2(mtame+1)` wild, messages, edog slate. Omits nommés : `m_unleash`, `dismount_steed`. `finish_meating` réduit à `meating=0`. `pline_mon`/`body_part(EYE)` → « eye » fixe. RNG : `rn2(mtame+1)` puis éventuellement `rn2(2)` — ordre C.

### `KEEPTRAITS` / `make_corpse`
**C :** `mon.c:549` macro : isshk / mtame / `unique_corpstat` (=G_UNIQ) / `is_reviver` (rider∥S_TROLL) / leader_m_id / AD_SEDU/SSEX. JS `mhitm.js` `make_corpse` aligne. **Risque caller :** C est dans `mon.c` `make_corpse` ; seul `mhitm.js` est patché. Si `js/mon.js` a un autre `make_corpse`, les traits unique/troll n’y passent pas.

### `revive` C — bras omonst / omid (`zap.c` ~1000)

C, après `makemon` « plat » pour le cas sans omonst :

```c
    } else if (has_omonst(corpse)) {
        /* save_mtraits() produced saved monster from a living one */
        mtmp = montraits(corpse, &cc, (mmflags & MM_ADJACENTOK) != 0);
        if (mtmp && mtmp->mtame && !mtmp->isminion)
            wary_dog(mtmp, TRUE);
    } else {
        mtmp = makemon(mptr, x, y, mmflags | MM_NOCOUNTBIRTH);
    }
    if (mtmp) {
        if (mtmp->mhpmax > mtmp->m_lev * 8)
            mtmp->mhpmax = mtmp->m_lev * 8;
        ...
        if (has_omid(corpse)) {
            unsigned m_id = OMID(corpse);
            struct monst *ghost = find_mid(m_id, FM_FMON);
            if (ghost && ghost->data == &mons[PM_GHOST]) {
                if (ghost->minvent)
                    ... transfer to mtmp ...
                if (ghost->mtame && !ghost->isminion)
                    (void) tamedog(mtmp, (struct obj *) 0);
                mtmp->mconf = 1;
                mongone(ghost);
            }
            free_omid(corpse);
        }
```

JS : `has_omonst` → `montraits` + `wary_dog` ; `OMID` → `find_mid(..., FM_FMON)` seulement. **Confirmation** de l’enveloppe. C `find_mid` peut chercher migrate/mydogs (`FM_EVERYWHERE` ailleurs) ; ici C passe `FM_FMON` — JS aligné, named omit migrate n’est **pas** un écart sur ce caller.

`cant_finish_meal(corpse)` C **ligne 909**, avant localisation. JS toujours absent. Un occupation eat sur ce cadavre survit un revive (même réussi). Pas de RNG dans le helper, sémantique occupation.

### `replmon` / `copy_mextra` / `restore_cham`

C `replmon` : relink `fmon`, `if (u.ustuck==mtmp) u.ustuck=mtmp2`, shop `bill_p`, worm segs, light source, `newsym`. JS : splice tableau `fmon`, ustuck/usteed, `copy_mextra`, newsym. **Thin nommé.** Un shk restored via `montraits` peut perdre `bill_p` (D-log `replshk` named).

`restore_cham` C : si cham, `newcham` selon shape. JS : pose `cham` / `newcham` thin. Un cadavre de cham revived via traits peut rester la forme sauvée (voulu) ou rater le rehumanize — hors seeds fortress.

### Callers `save_mtraits`

C : `mkcorpstat` si `mtmp`. JS : même site + `KEEPTRAITS` dans `mhitm.js` `make_corpse` (qui appelle `mkcorpstat`). Autres makers de cadavres (`mon.js` `make_corpse` s’il existe, statue, tin) non greppés dans ce commit. **Risque caller.**


### Callers C `montraits` / `save_mtraits`

C `montraits` : essentiellement `revive` (cadavre `has_omonst`). C `save_mtraits` : `mkcorpstat` si `mtmp` et KEEPTRAITS. JS : `revive` + `mkcorpstat` + `KEEPTRAITS` dans `mhitm.js` seulement.

`animate_statue` C peut poser omonst / appeler un chemin traits — **non branché**, nommé map. `create_particular` hors cluster.

RNG `montraits` drain : C `while (mtmp->mhpmax > mtmp->m_lev * 8) mtmp->mhpmax -= monhp_per_lvl(mtmp)` (formule exacte à vérifier vs `rnd(mlevel+1)` d’abord). Chaque itération JS saute le `rnd(8)` C sur golem/dragon/`m_lev==0`. Un troll drainé de N niveaux = **N appels RNG de moins** sur ces bras. Commentaire JS « omitted golem/dragon » contredit le `if (is_golem)` porté — **doc interne fausse**.

`wary_dog` callers C : `revive` (TRUE) + dog.c autres. JS : revive seulement dans ce commit. Autres `wary_dog` C (niveau change, etc.) non greppés.

`find_mid(..., FM_FMON)` : C revive identique. Ghost migrate = named omit **sans écart** sur ce caller.

`mongone` thin : si `minvent` JS est un tableau, `while (ghost.minvent)` peut no-op ou mal transférer. Si chaîne `nobj`, OK. Risque structurel du port, pas un `if` sauté.

## Constitution / playbook
Grep `git show 7ca18b5d -- js/` : pas de `FORCE`/`DIAG`/`getRngLog`/`readFileSync`/`from 'fs'`/`node:`/`fastforward`. Pas de seed/coordonnée en contrôle. Frozen intacts.

`await` dans `wary_dog` / `revive` / `montraits` : pline/`makemon`, **pas** une 2e frontière `nhgetch`. Rule #2 RAS. Pas de traces hardcodées. Pas d’entrée `fastforward.js`.

1:1 : `montraits` C `zap.c` → `zap.js` ; `save_mtraits` C `mkobj.c` → `mkobj.js` ; `monhp_per_lvl` C `makemon.c` → `makemon.js` ; `wary_dog` C `dog.c` → `dog.js`. `KEEPTRAITS` C `mon.c` patché seulement dans `mhitm.js` — colocation caller, **trou** si un autre `make_corpse` existe.

## Densité (§2b)
**Right size.** Cluster revive-traits : snapshot cadavre → restore → ghost join → pet wary. Sept fichiers, une sémantique. +653 au plafond §2b ; `mongone`/`replmon` sont des prérequis du ghost, pas un 2e sous-système (shop/worm/light restent thin nommés).

## Documentation
**Honnêteté « complete revive » :** le sujet / D-log **ne disent pas** complete. D-log « fixed » = deferral omonst/ghost après D-0964. Restent nommés : `stolen_value`, `animate_statue`, `cant_finish_meal`, `forget_temple_entry`, replshk/worm/light. Map zap.js retire montraits, **garde** stolen_value / animate_statue / meal. CURRENT next = stolen_value — cohérent.

**Non nommé :** skip `rnd(8)` inconditionnel dans `monhp_per_lvl` ; commentaire JS « omit golem/dragon » **faux** (le corps les porte) ; duplication possible `make_corpse`.

Journal #1252 : green+strict ; zap **19**/20. Fortress non re-mesurée (cadence #1250).

## Vérification
Cohorte zap pertinente (`unturn_dead`/`revive`). Aucun seed public n’oblige un troll drainé + omonst : le bug RNG `monhp_per_lvl` peut rester silencieux. Preuve = affirmation journal, pas de transcript. Held-out OK playbook ; la dette RNG n’est pas « fortress-prouvée absente ».

#1270 43/44 n’est pas ce hash.

## Risques / dette
1. **RNG `monhp_per_lvl` :** C brûle toujours `rnd(8)` puis overwrite — QUALITY réelle sur restore de niveaux.
2. `cant_finish_meal` toujours absent (occupation eat, C avant localisation).
3. `animate_statue` n’appelle pas `montraits`.
4. `stolen_value` revive (D-0983 immédiat).
5. `replmon`/`mongone` thin (shop `bill_p`, light, worm).
6. `KEEPTRAITS` seulement `mhitm.js` `make_corpse`.
7. Commentaire JS mensonger sur les bras golem/dragon.


## Synthèse honnêteté revive
Sujet/D-log/map **ne vendent pas** un revive complet. Cluster D-0964 suite (omonst + ghost). QUALITY réelle : `monhp_per_lvl` saute le `rnd(8)` inconditionnel C — commentaire JS faux. `cant_finish_meal` toujours omit. Constitution RAS. Densité right size +653.


## Questions ouvertes (revue)
1. `js/mon.js` expose-t-il un second `make_corpse` sans KEEPTRAITS ?
2. Combien de `monhp_per_lvl` par revive drainé sur un troll omonst (N niveaux) ?
3. `minvent` ghost est-il une chaîne `nobj` ou un tableau ?

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **6.5/10**
- Si je ne devais retenir qu’une critique : ce n’est pas un « revive complet » (et les docs ne le vendent pas ainsi), mais `monhp_per_lvl` saute le `rnd(8)` inconditionnel du C — tout restore de niveaux dans `montraits` désynchronise le flux RNG.
