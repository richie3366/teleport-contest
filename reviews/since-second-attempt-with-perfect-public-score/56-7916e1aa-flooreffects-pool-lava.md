# Review 56 — `7916e1aa` — `flooreffects` pool/lava/pit/shaft + drop/throw

## Métadonnées
- Hash complet / court : `7916e1aa76767e305f96c5791fe13afc93ce2303` / `7916e1aa`
- Parent : `587031b318187b5b9975bc1a97d8150f6d5b880c`
- Auteur, date : Raphaël Hervier, 2026-07-22 03:19:47 +0200
- D-id : **D-0987**
- Stats : 13 files, +440/−56
- Fichiers JS / map / cadence : `js/do.js` (cœur), `js/dokick.js` (commentaire), `js/dothrow.js`, `js/mthrowu.js` ; `docs/c-js-map/absent.md` / `debt.md` / `turns.md` ; journal #1257 (pas de cadence)

## Intention vs livrable
Porter le **cœur** `flooreffects` (pool/lava/pit/shaft + boulder) et brancher drop/throw pour débloquer `kick_object`. Le message ne dit pas « flooreffects complet ». CURRENT next liste explicitement `fire_damage` / globby / altar / hot potion.

**Honnêteté D-log vs plus tard D-0992/D-0993 :** D-0987 Deferred = `fire_damage` ; globby meld ; altar `doaltarobj` ; hot potion ; boulder+pit `hmon` ; `kick_object`.  
D-0992 (plus tard) : « named omission **after D-0987** — hard lava skipped `fire_damage` ; altar `doaltarobj` ; hot-ground potion ».  
D-0993 : globby `pudding_merge` après D-0992.  
Le partial est **par design** et le D-log de *ce* commit le dit. Pas d’overclaim « complete flooreffects ». Les bras restants sont nommés, pas oubliés.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/do.js` | Port `flooreffects` / `boulder_hits_pool` / `lava_damage` thin / helpers pit/shaft |
| `js/dothrow.js` | Wiring throwit Splash + `flooreffects` **avant** `ship_object` |
| `js/mthrowu.js` | Wiring `drop_throw` : ship puis `flooreffects` (ordre C) |
| `js/dokick.js` | Commentaire kick_object encore defer |
| map turns/debt/absent | D-0987 + bras restants |

## Fidélité C ↔ JS

### `flooreffects`
**C :** `do.c:162-350+`. Enveloppe portée :
1. `where != OBJ_FREE` → C **panic**. JS : coerce `where=OBJ_FREE` (« port resilience »). **Écart :** masque un bug caller au lieu de le faire exploser.
2. clear nobj/nexthere ; save/restore `bhitpos`
3. BOULDER `boulder_hits_pool` → res
4. BOULDER + pit/hole : msgs ; **hmon/mondied named omit** (JS clear `mtrapped` only) ; héros `losehp(rnd(15))` ou `reset_utrap` ; plug msgs ; `delfloortrap` ; `useupf` ≈ `delobj` (JS note resists rn2) ; `bury_objs`
5. lava → `lava_damage`
6. pool → Splash/Plop si Blind∥Lev∥Fly && !Deaf && u_at ; `water_damage == ER_DESTROYED`
7. u_at + (uteetering pit ∥ uescaped shaft) : pit tumble msgs (objet **reste**) ; else `ship_object` → res

**Non portés (nommés) :** globby `obj_meld` ; `mon_moving && IS_ALTAR` `doaltarobj` ; potion hot ROOM/CORR.

**Confirmation pit tumble :** C ne détruit pas l’objet dans le bras pit (pas de `res=TRUE` là) ; JS commentaire identique puis tombe dans place caller. OK.

**Écart boulder+monstre piégé :** C peut tuer via `hmon`/`mondied` et `res=FALSE` si vivant. JS ne fait **aucun** dégât, clear `mtrapped`. Named. Conséquence : boulder plug + monstre intact.

`uteetering_at_seen_pit` / `uescaped_shaft` : copies trap.c (seen pit not utrap TT_PIT ; seen hole). Fidèles.

### `lava_damage`
**C :** `trap.c` — soft burn puis **fallthrough `fire_damage`**. JS : `obj_resists` + mat < DRAGON_HIDE + pas scroll/book + pas FIRE_RES/WAN_FIRE/FIRE_HORN + !oerodeproof + !contents → delobj. Sinon **return false** (« fire_damage deferred »). Les parchemins/potions **survie lava** jusqu’à D-0992. Honnête.

### `boulder_hits_pool`
**C :** chance `rn2(10)` : waterlevel never fill ; waterwall `<5` ; lava `==0` ; pool `!=0`. Morph ROOM ; bury ; splash ; `wake_nearto` ; lava adjacent dmg ; obfree si !pushing.

JS porte ces chances. **Écarts nommés :** DRAWBRIDGE_UP mask → treat as ROOM ; mondied → clear trapped only ; Fire_resistance dmg via sticky `u.Fire_resistance` **ou** H/E ; `try/catch` autour `import('./dig.js') bury_objs` **avale les erreurs**. Dmg lava : C `d(3,6)` / `d(1,6)` ; JS boucle `1+rn2(6)` × N = `d(N,6)`. OK.

Toujours `return true` (boulder consommé) même si fills_up faux — C aussi consomme le boulder qui coule.

### Callers — ordre C

**`dropz` C `do.c:827` :** `flooreffects` then place. JS : même chose + `encumber_msg` si gone. `dropx` reste ship puis dropy (C `doaltarobj` toujours omit). Chaîne dropx→dropy→dropz : flooreffects **après** ship, comme C.

**`throwit` C `dothrow.c:1794-1821` :** Splash si pool ou (lava && **!is_flammable**) ; `flooreffects` ; puis `ship_object` si !mon.

JS D-0984 avait ship seul. D-0987 insère Splash + flooreffects **avant** ship. **Corrige l’ordre.**  
**Écart Splash :** JS lava **sans** `!is_flammable` (commentaire deferred). Un objet inflammable en lave fait Splash/Plop en trop (C silence).

**`drop_throw` C `mthrowu.c:180-191` :** `ship_object` si gate ; puis `flooreffects` ; `passive_obj` encore omit. JS même ordre. Fidèle.

`kick_object` **non** branché (préreq bhit KICKED_WEAPON) — D-0988 plus tard. Honnête.

### Citation C — panic + boulder pit (`do.c:162`)

```174:226:nethack-c/upstream/src/do.c
    if (obj->where != OBJ_FREE)
        panic("flooreffects: obj not free");
    obj->nobj = obj->nexthere = (struct obj *) 0;
    save_bhitpos = gb.bhitpos;
    gb.bhitpos.x = x, gb.bhitpos.y = y;

    if (obj->otyp == BOULDER && boulder_hits_pool(obj, x, y, FALSE)) {
        res = TRUE;
    } else if (obj->otyp == BOULDER && (t = t_at(x, y)) != 0
               && (is_pit(t->ttyp) || is_hole(t->ttyp))) {
        ...
                    if (svc.context.mon_moving) {
                        damage = dmgval(obj, mtmp);
                        mtmp->mhp -= damage;
                        if (DEADMONSTER(mtmp))
                            mondied(mtmp);
                    } else {
                        (void) hmon(mtmp, obj, HMON_THROWN, dieroll);
                    }
                    if (!DEADMONSTER(mtmp) && !is_whirly(mtmp->data))
                        res = FALSE;
```

JS coerce `where` au lieu de panic — **écart qualité**. Boulder+monstre : JS `mtrapped=0` only — **named**. Un géant qui drop un boulder sur un monstre piégé ne tue plus (held-out).

Pool C ensuite : `water_damage` ; lava : `lava_damage` (qui **tombe dans** `fire_damage`). JS `lava_damage` s’arrête avant `fire_damage` — D-0992.

Callers C de `flooreffects` (échantillon) : `dropz`, `throwit`, `drop_throw`, `rloco`, `kick_object`, `scatter`, `impact` paths. JS D-0987 : **dropz / throwit / drop_throw seulement**. `scatter` (D-0986) place encore sans flooreffects. `rloco` / `kick_object` named.

**Ordre throwit C** (`dothrow.c` ~1794) : Splash si pool **ou** (lava && !is_flammable) ; flooreffects ; ship si !mon. JS Splash lava **sans** `!is_flammable` ; flooreffects avant ship — **corrige D-0984**, Splash trop large.

**Ordre drop_throw C** (`mthrowu.c:180`) : ship si `down_gate != -1` ; **puis** flooreffects. JS ship puis floor — **pas** l’ordre throwit. Les deux callers C sont **volontairement** dans des ordres différents. JS les distingue. **Confirmation.**

Bras restants **par design** (D-log ce commit) :

| Bras C | Ce commit | Payé plus tard |
|---|---|---|
| `fire_damage` lava | omit | D-0992 |
| globby `obj_meld` | omit | D-0993 |
| `doaltarobj` mon_moving | omit | (encore dette) |
| hot potion ROOM/CORR | omit | D-0992 |
| boulder pit `hmon` | omit | (dette) |
| `kick_object` | omit | D-0988 |


### Callers C `flooreffects` restants

Branchés ici : `dropz`, `throwit`, `drop_throw`.  
Non branchés : `kick_object`, `scatter` (D-0986 place encore), `rloco`, éventuellement `impact` paths.

Ordre **volontairement différent** selon le caller C — JS le respecte :

- `throwit` : floor **puis** ship (corrigé vs D-0984)
- `drop_throw` : ship **puis** floor
- `dropz` : floor puis place (après `dropx` ship)

RNG `boulder_hits_pool` : un `rn2(10)` ; seuils waterwall `<5`, lava `==0`, pool `!=0`. JS porté. Dmg lava adjacent : C `d(3,6)` ; JS `1+rn2(6)` ×3. Identique en distribution si boucle indépendante.

`lava_damage` JS : `obj_resists` peut tirer `rn2` **avant** le return false « fire_damage deferred ». C `lava_damage` tombe dans `fire_damage` qui tire davantage. Parchemins : C souvent détruits ; JS survivent — **pas** un skip RNG silencieux si `obj_resists` a déjà consommé, mais le **reste** de `fire_damage` n’est pas brûlé. Désync sur lava+scroll. D-0992.

`flooreffects` pit tumble (héros teeter) : objet **reste**, `res` false. JS commentaire + même sémantique. Shaft `uescaped` : `ship_object`. Callers drop/throw voient hole billing **et** floor dans le même tour — D-0984+D-0987.

Panic C `where != OBJ_FREE` : zéro RNG, abort. JS coerce : continue, peut `water_damage` / `rn2` sur un objet encore lié. Filet qui **invente** un chemin C n’a pas.

## Constitution / playbook
Grep `git show 7916e1aa -- js/` : pas de `FORCE`/`DIAG`/`getRngLog`/`readFileSync`/`from 'fs'`/`node:`/`fastforward`. Pas de seed en contrôle. Frozen intacts.

`await import` do↔dokick↔dig : ESM, pas fs. Rule #2 RAS. Panic C remplacé par coerce `where=OBJ_FREE` — **qualité**, pas constitution (masque un caller bug). `try/catch` autour `bury_objs` avale les erreurs — même famille.

`drop_throw` déjà async (D-0984). Throwit `flooreffects` avant ship : pas une 2e frontière `nhgetch`.

1:1 : `flooreffects` / `boulder_hits_pool` C `do.c` → `do.js` ; `lava_damage` C `trap.c` logé dans `do.js` (caller unique ici) — colocation justifiable, à noter.

Pas d’entrée `fastforward.js`. Pas de filet d’alignement.

## Densité (§2b)
**Right size.** Cluster landings objet : `flooreffects` + `boulder_hits_pool` + 3 callers drop/throw. +440. Ne tire **pas** `kick_object` ni globby dans le même commit — §2b respecté. Partial **par design**.

## Documentation
D-0987 status **fixed** pour le *cœur* nommé. Deferred listé : `fire_damage` ; globby ; altar `doaltarobj` ; hot potion ; boulder+pit `hmon` ; `kick_object`. CURRENT next = kick_object **ou** remaining flooreffects arms. Map turns annote pool/lava/pit.

**Honnêteté vs D-0992/D-0993 :** plus tard D-0992 dit « named omission **after D-0987** — hard lava skipped `fire_damage` ; altar ; hot-ground potion ». D-0993 : globby `pudding_merge` après D-0992. Le découpage de *ce* commit est **confirmé**, pas un overclaim « complete flooreffects ». « Retire the named kick_object prerequisite » est un peu large : kick_object a encore besoin de `bhit` KICKED_WEAPON (le D-log le dit).

Journal #1257 : green+strict ; drop/throw **20**/21.

## Vérification
Cohorte drop/throw pertinente. Preuve journal. Pas de full suite depuis #1255-before-D-0985. Les bras `fire_damage`/altar/hot **ne doivent pas** matcher C encore — ne pas les « vérifier » via fortress. `scatter` (D-0986) n’emprunte pas `dropz` : fruit/tree lava toujours hors ce wire.

## Risques / dette
1. Bras restants **par design** : `fire_damage` (D-0992), globby (D-0993), `doaltarobj`, hot potion, boulder `hmon`.
2. Splash throwit lava sans `!is_flammable`.
3. Panic C → coerce JS.
4. `try/catch` `bury_objs` silencieux.
5. `kick_object` / `bhit` KICKED encore absents (D-0988).
6. `scatter` place encore sans flooreffects.
7. `lava_damage` return false trop tôt : parchemins/potions survivent la lave jusqu’à D-0992.


## Synthèse partial flooreffects
Cœur pool/lava/pit/shaft + boulder_hits_pool + wire drop/throw : **fait**. D-log Deferred = fire_damage / globby / altar / hot / hmon / kick_object. D-0992/0993 confirment. Panic→coerce et Splash `!is_flammable` = QUALITY. Honnêteté doc : bonne. ACCEPT-WITH-DEBT.


## Questions ouvertes (revue)
1. `scatter` sera-t-il recablé vers `flooreffects` (fruit lave) ou restera-t-il named omit ?
2. `lava_damage` JS appelle-t-il `obj_resists` (RNG) avant le return false fire_damage ?
3. Un caller passe-t-il encore un objet non-FREE dans `flooreffects` (coerce silencieux) ?

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7.5/10**
- Si je ne devais retenir qu’une critique : D-0987 est un partial **avoué** (pool/lava/pit/shaft + wire drop/throw) ; D-0992/0993 le prouvent — le D-log de ce commit est honnête, la dette réelle est `lava_damage` sans `fire_damage` et le boulder-pit sans `hmon`.
