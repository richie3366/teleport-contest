# Review 28 — `68c2f595cfd125430e01b09e971e35b74629999b` — destroy_drawbridge + wires dig

## Métadonnées
- Hash complet / court : `68c2f595cfd125430e01b09e971e35b74629999b` / `68c2f595`
- Parent : `17e7755f274047180af24241a0fb10d12d5665fe`
- Auteur, date : Raphaël Hervier, 2026-07-22 00:10 +0200 (Co-authored-by Cursor)
- D-id : D-0959
- Stats : 10 files, +311/−42
- Fichiers JS / map / cadence : **nouveau** `js/dbridge.js` ; wiring `js/dig.js` ; map debt/turns. Pas de cadence.

## Intention vs livrable
Promesse : porter `destroy_drawbridge` et les helpers find/is_wall, brancher `furniture_handled` / `dighole`, au lieu de skip destroy.

Livrable : module 1:1 `dbridge.js` (~215 lignes) + deux wires. D-id présent. Titre = diff. Crush/scatter explicitement omis (pas vendus comme le corps complet).

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/dbridge.js` | Port C : `is_drawbridge_wall` / `find_drawbridge` / `get_wall_for_db` / `destroy_drawbridge` (sans entity/scatter) |
| `js/dig.js` | Wiring `furniture_handled` + `dighole` DRAWBRIDGE_DOWN/wall |
| map debt/turns | D-0959 ; crush/scatter restent nommés |
| CURRENT / NOTES / D-log / journal | Docs ; green+dig 16/16 |

## Fidélité C ↔ JS

### `is_drawbridge_wall` / `find_drawbridge` / `get_wall_for_db`
- Locus C : `dbridge.c` ~137 / 180 / 210
- Locus JS : mêmes noms dans `dbridge.js`
- Wall : `typ` DOOR ou DBWALL ; adjacents DRAWBRIDGE avec `drawbridgemask & DB_DIR` opposé (WEST/EAST/SOUTH/NORTH). Ordre des quatre tests identique.
- `find_drawbridge` : si déjà pont, true ; sinon dir≥0 puis incrément `xy` selon dir. Match (JS mute `{x,y}` au lieu de `coordxy*`).
- `get_wall_for_db` : inverse NORTH/SOUTH/EAST/WEST. Match.

### `destroy_drawbridge`
- Locus C : `dbridge.c:destroy_drawbridge` (888)
- Locus JS : `dbridge.js:destroy_drawbridge`
- Garde `!IS_DRAWBRIDGE` return. Wall via `get_wall_for_db`.
- Sous-sol moat/lava (`DB_UNDER == DB_MOAT \|\| == DB_LAVA`, DB_MOAT=0) : messages portcullis vs span, `cansee`/`u_at`, sinon `You_hear *SPLASH*` ; `typ` LAVAPOOL/MOAT ; mask 0 ; boulder → C `flooreffects(..., "fall")`, JS `delobj` (nommé).
- Else : disintegrate / `*CRASH*` ; ICE+ICED_MOAT vs ROOM. Match des bits `DB_ICE`.
- `wake_nearto(x,y,500)` ; wall → DOOR/`D_NODOOR` ; `deltrap` aux deux cellules ; `del_engr_at` ; **pas** la boucle `for (i = rn2(6); i > 0; --i) mksobj_at(IRON_CHAIN)+scatter` — nommé « no partial RNG » (bon réflexe : ne pas brûler un préfixe de `rn2`).
- Vision : C `if (!does_block) unblock_point` ; JS `recalc_block_point` + `vision_recalc(0)`. Approximation.
- Stronghold : C `uopened_dbridge=TRUE` **avant** entity, `uheard_tune=3` **après**. JS pose les deux à la fin. Même flags, ordre différent (sans entity, peu d’effet).
- `set_entity` / `e_died` / `e_missed` / `do_entity` / `nokiller` : omis, nommés. Un héros/monstre sur le pont n’est pas crush.

### `wake_nearto` local
C `wake_nearto` (`mon.c`) : `wake_msg`, clear `msleeping`, si `!(geno & G_UNIQ)` alors `mstrategy &= ~STRAT_WAITMASK` (`STRAT_CLOSE|STRAT_WAITFORU` = `0x30000000` en JS).

JS local :

```javascript
if (distance === 0 || dx * dx + dy * dy < distance) {
    mtmp.msleeping = 0;
    if (mtmp.mstrategy != null) mtmp.mstrategy &= ~0x01;
}
```

`~0x01` ne touche pas `STRAT_WAITMASK`. Pas de skip mort, pas de `wake_msg`, pas de garde G_UNIQ. Non nommé. Le réveil « sleep » marche ; la méditation/wait non.

### Wiring `dig.js`
- `furniture_handled` : C `DRAWBRIDGE_DOWN || is_drawbridge_wall>=0` → find + destroy, return TRUE. JS identique (remplace l’ancien « return true without destroy »).
- `dighole` : même garde ; `pit_only` → too hard, return false ; sinon find+destroy, return true. C ne `return` pas : enchaîne `spot_checks` puis `return retval`. JS skip `spot_checks` (déjà omis nommé sur `dighole`).

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/fs/fastforward. Nouveau module `dbridge.js` = mapping 1:1 souhaité. `You_hear` local Deaf-aware. RAS constitutionnel. Omettre le scatter entier plutôt qu’un `rn2(6)` partiel est conforme au playbook RNG.

## Densité (§2b)
**Right size.** Petit fichier C redémarré + callers dig qui étaient le stub. Pas too small (helpers+corps+2 wires). Pas too big.

## Documentation
- D-0959 fixed. Deferred crush/entity, scatter, flooreffects boulder, et backlog dig. Honnête sur le gros trou entity.
- Ne nomme pas le `wake_nearto` `& ~0x01`.
- Map : D-0959 en gras ; crush/scatter restent. Journal green+dig 16/16, pas de full sessions.

## Vérification
Affirmation. Un pont de fort n’est probablement pas dans la fortress publique. Preuve de non-régression, pas de crush/scatter. CURRENT reste 44/44 par héritage #1225/#1229 green+dig, pas par un seed drawbridge.

## Preuves C (extraits)

Helpers — `is_drawbridge_wall` teste DOOR/DBWALL puis quatre voisins. Exemple EST :

```c
if (isok(x - 1, y) && IS_DRAWBRIDGE(levl[x - 1][y].typ)
    && (levl[x - 1][y].drawbridgemask & DB_DIR) == DB_EAST)
    return DB_EAST;
```

JS : `game.level.at(x-1,y)` + mêmes masques. `find_drawbridge` / `get_wall_for_db` sont des switch dir mécaniques, 1:1. C’est la partie **ACCEPT** du commit.

`destroy_drawbridge` terrain moat/lava :

```c
if ((lev1->drawbridgemask & DB_UNDER) == DB_MOAT
    || (lev1->drawbridgemask & DB_UNDER) == DB_LAVA) {
    ...
    lev1->typ = lava ? LAVAPOOL : MOAT;
    lev1->drawbridgemask = 0;
    if ((otmp2 = sobj_at(BOULDER, x, y)) != 0) {
        obj_extract_self(otmp2);
        (void) flooreffects(otmp2, x, y, "fall");
    }
}
```

JS : mêmes tests (y compris DB_MOAT=0), mêmes messages SPLASH, boulder → `delobj` au lieu de `flooreffects`. Nommé. `flooreffects` C peut noyer le boulder **et** enchaîner d’autres objets ; `delobj` est un raccourci.

Scatter C (RNG, volontairement absent JS) :

```c
for (i = rn2(6); i > 0; --i) {
    otmp = mksobj_at(IRON_CHAIN, rn2(2) ? x : x2, rn2(2) ? y : y2, TRUE, FALSE);
    (void) scatter(otmp->ox, otmp->oy, 1, MAY_HIT, otmp);
}
```

Minimum 1×`rn2(6)` ; si i>0, 2×`rn2(2)` + `mksobj_at` (beaucoup de RNG) + `scatter` (MAY_HIT). Omettre la boucle entière = 0 rolls. Commentaire JS « no partial RNG » : **correct**. Conséquence : le premier destroy sous un live seed diverge au `rn2(6)` suivant dans C. Dettes assumée.

Entity C après vision/stronghold `uopened_dbridge` :

```c
set_entity(x2, y2, etmp2);
if (etmp2->edata) {
    if (!automiss(etmp2)) {
        ... e_died(..., CRUSHING);
    }
}
set_entity(x, y, etmp1);
if (etmp1->edata) {
    if (e_missed(etmp1, TRUE)) { spoteffects / minliquid; }
    else { ... e_died(..., CRUSHING); if (MOAT) do_entity(etmp1); }
}
nokiller();
if (Is_stronghold(&u.uz))
    u.uevent.uheard_tune = 3;
```

JS pose `uheard_tune=3` sans entity. Un héros sur le span ne meurt pas, ne tombe pas dans le moat via `do_entity`. Nommé « crush/entity ». Gravité gameplay maximale, hors suite publique.

`wake_nearto` C (via `wake_nearto_core`) : `mstrategy &= ~STRAT_WAITMASK` si `!(geno & G_UNIQ)`. JS `const.js` : `STRAT_CLOSE=0x10000000`, `STRAT_WAITFORU=0x20000000`. `&= ~0x01` est un no-op sur ces bits. Seul `msleeping=0` travaille.

## Wiring
`furniture_handled` C/JS : DRAWBRIDGE_DOWN **ou** wall → find + destroy → TRUE (skip `maketrap`). C’est le bug nommé avant D-0959 (TRUE sans destroy). Corrigé.

`dighole` : `pit_only` too hard (C ne set pas retval, tombe dans spot_checks+return false). JS `return false` skip spot_checks. Même retval, pas les checks.

Callers C hors ce commit : `dokick.c` kick pont, `lock.c` portcullis, `detect.c`, `invent.c`, zap. `dbridge.js` exporte `destroy_drawbridge` : les autres sites restent à brancher. Map ne liste que dig wires — honnête pour D-0959, pas pour « dbridge.c complete ».

## Questions ouvertes
1. `You_hear` JS skip si `flags.acoustics === false` en plus de Deaf. C `You_hear` est Deaf-aware ; acoustics flag ?
2. `wake_nearto` distance C `dist2 < 500` vs JS `dx*dx+dy*dy < distance` — `dist2` C est le même carré. OK. Skip `DEADMONSTER` manquant : un cadavre dans `fmon` se fait `msleeping=0` inerte.
3. `open_drawbridge` / `close_drawbridge` toujours absents (commentaire dbridge.js). Dig destroy sans open/close = pont figé hors dig.

## Risques / dette
1. **Pas de crush** : héros/monstre sur le pont survit (nommé). Haute gravité gameplay, hors fortress.
2. **Scatter IRON_CHAIN** : 0×`rn2` vs C `rn2(6)` + 2×`rn2(2)` par débris + `scatter`. Correctement non partiel ; le premier destroy sous RNG live divergera.
3. `wake_nearto` `& ~0x01` ≠ `STRAT_WAITMASK` — non nommé.
4. `spot_checks` / callers hors dig (`dokick`, `lock`, zap) non branchés.
5. `flooreffects` boulder → `delobj` : pas de noyade animée, pas de RNG flooreffects.

## Cohérence D-log / map
D-0959 fixed. JS blurb : « terrain+message+wake+trap/engr+vision body ; wire dig furniture + dighole ». Exact. Deferred : set_entity/do_entity crush ; revive_nasty ; iron-chain scatter ; flooreffects boulder. `revive_nasty` n’apparaît pas dans le C `destroy_drawbridge` lu (888–1019) — peut-être un copier-coller de backlog dbridge (create/close). Bruit, pas un mensonge sur crush/scatter.

Nouveau fichier `js/dbridge.js` : mapping 1:1 `dbridge.c` commencé. Le header JS nomme open/close « beyond dig ». Correct : ce n’est pas un module dbridge complet.

`furniture_handled` avant D-0959 : `if (typ === DRAWBRIDGE_DOWN) return true` sans destroy (skip maketrap). Après : destroy réel. C’est le cœur du D-id. `dighole` n’avait même pas le bras. Deux wires, un helper file : densité §2b respectée.

## Diff JS — hors port
`dbridge.js` est **new file**. Imports : `isok`/`u_at`/`IS_DRAWBRIDGE`/`DRAWBRIDGE_UP`/`DB_*`/`DOOR`/`D_NODOOR`/`DBWALL`/`MOAT`/`LAVAPOOL`/`ROOM`/`ICE`/`ICED_MOAT`/`Is_stronghold`. `BOULDER` via `objectNames`. Pas de `rn2` dans le fichier — cohérent avec scatter omis.

`You_hear` / `wake_nearto` / `sobj_at` locaux. `sobj_at` existe peut-être dans `mkobj.js` ; copie évite un import. `wake_nearto` **aurait dû** importer celui de `mon.js` (D-0956 a touché mon.js ; un `wake_nearto` export fidèle ?) — le local `& ~0x01` suggère que l’auteur n’a pas trouvé/osè l’export et a réimplémenté trop court.

`dig.js` : import nommé `find_drawbridge, is_drawbridge_wall, destroy_drawbridge`. `furniture_handled` : une condition élargie (DOWN **ou** wall). `dighole` : un bras avant grave. Commentaires d’enveloppe mis à jour (omit destroy retiré). Pas de touche à `digactualhole` omit (impact_drop encore).

## Synthèse
Nouveau `dbridge.js` 1:1 pour find/is_wall/get_wall : ACCEPT. `destroy_drawbridge` terrain+messages : ACCEPT. Scatter entier sauté (0 RNG) : dette nommée, bon réflexe. Crush entity sauté : dette nommée, gravité gameplay. `wake_nearto ~0x01` : dette non nommée, bits wait inchangés. Wires dig : le stub « return true without destroy » disparaît. Note 7 : module bien né, corps volontairement tronqué, un helper local trop court.

## RNG et callers — rappel
Helpers find/is_wall : 0 RNG. Terrain destroy : 0 RNG (messages). C scatter : `rn2(6)` + 2×`rn2(2)`×i + `mksobj_at` + `scatter`. JS 0. Entity : `e_missed`/`automiss` peuvent RNG ; JS 0. `wake_nearto` C 0 RNG (sauf `wake_msg` ?). Callers ce commit : `furniture_handled`, `dighole`. Autres C : dokick/lock/detect — non branchés, export prêt.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7/10**
- Si je ne devais retenir qu’une critique : find/is_wall et la conversion de terrain sont fidèles, mais `destroy_drawbridge` s’arrête avant le C qui tue (entity) et avant le C qui tire du RNG (scatter) — c’est nommé, sauf le `wake_nearto` cassé (`~0x01`).
