# Review 17 — `86cc8a89` — D-0950 `dig_check` / `digactualhole` + break-wand dig/create

## Métadonnées
- Hash complet / court : `86cc8a89944a60c8196b3f16a01e5ec0da1505ed` / `86cc8a89`
- Parent : `bc50d6c089cb5ce565de8a1f818a86edc76e6302`
- Auteur, date : Raphaël Hervier, 2026-07-21 23:21:46 +0200
- D-id : **D-0950**
- Stats : 10 files, **+470 / −32** (JS seul : 3 files, +419 / −19)
- Fichiers JS / map / cadence : `js/dig.js` (+326), `js/apply.js` (+108), `js/trap.js` (2 exports) ; `docs/c-js-map/debt.md` + `turns.md` ; journal #1218 (pas de cadence)

## Intention vs livrable
Le message promet : casser une baguette de creusement / création creuse le terrain adjacent, spawn des monstres, facture le shop (`pay_for_damage("dig into")`) au lieu d’exploser seulement.

Le diff le fait **pour ces deux otyp**, en portant le socle C `dig_check` / `fillholetyp` / `liquid_flow` / `digactualhole` et en branchant la boucle `i <= N_DIRS` de `do_break_wand`. Les bras strike/cancel/poly/tele/undead restent un early-return explode+discard. C’est cohérent avec l’enveloppe nommée dans le header `do_break_wand`, pas avec une surface « hole-digging » complète : `dighole`, occupation `dig`, `furniture_handled` et le bras HOLE de `digactualhole` restent hors scope.

Écart titre / livrable : « dig_check/digactualhole » laisse croire que `digactualhole` est le C entier (`dig.c:640–829`). Le JS porte surtout le bras **PIT**. Le D-log le dit en « Deferred » ; le titre de commit ne le dit pas.

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/dig.js` | Port C : helpers + `digactualhole` PIT (HOLE stub) |
| `js/apply.js` | Wiring `do_break_wand` WAN_DIGGING / WAN_CREATE_MONSTER + shop pay |
| `js/trap.js` | Wiring : `export feeltrap` / `export set_utrap` (corps inchangés) |
| `docs/c-js-map/debt.md`, `turns.md` | Docs : omissions HOLE / furniture / pickaxe |
| `docs/DIVERGENCE-LOG.md` + INDEX | Docs D-0950 « fixed (map-driven debt retirement) » |
| `docs/CURRENT.md`, `NOTES.md`, journal | Score inchangé ; crumb #1218 |

## Fidélité C ↔ JS

### Helpers locaux (pas 1:1 fichier)
- `m_at` recopié dans `dig.js` « pour éviter le cycle mon.js ». C utilise le vrai `m_at`. Filtre JS : `mhp > 0` seulement — pas `mx>=0` / worm tails. Suffisant pour adjacent break-wand, pas pour vers.
- `undestroyable_trap` : MAGIC_PORTAL / VIBRATING_SQUARE. C `trap.h` a le même couple pour ce predicat.
- `surface` : fontaine/autel/mur/porte/floor/ground. C `dungeon.c` `surface()` a aussi grave, stairs, drawbridge, etc. Messages « crumbles into » peuvent dire `ground` là où C dirait autre chose. Pas de RNG.

### `dig_check` — C `nethack-c/upstream/src/dig.c:207` / JS `dig_check`
Ordre des gardes **aligné** sur C :

| # | C | JS | Écart |
|---|---|---|--------|
| 1 | `On_stairs` → ladder vs stairs | `stairway_at` truthy | `On_stairs` macro non lue ; équivalence non prouvée |
| 2 | throne && `madeby != BY_OBJECT` | idem `!== null` | OK |
| 3 | altar && (not object \|\| AM_SANCTUM) | `lev.altarmask` | C `altarmask_at` |
| 4–5 | airlevel / waterlevel | `Is_airlevel(game.u?.uz)` | OK si `uz` posé |
| 6 | obstructed && != SDOOR && W_NONDIGGABLE | `rm_wall_info(lev)` | OK si alias flags (D-0865) |
| 7 | trap undestroyable | idem | OK |
| 8 | !Can_dig_down && !candig | PITONLY / DESTROY_TRAP / CANTDIG | ordre if/else C respecté |
| 9 | boulder | `sobj_at(BOULDER)` | OK |
| 10 | BY_OBJECT && (ttmp \|\| pool/lava) | idem | OK |
| — | — | `!lev → TOOHARD` | **hors C** |

`BY_OBJECT` JS = `null` ≡ C `((struct monst *) 0)`. Comparaison `madeby === BY_OBJECT` correcte pour break-wand (`dig_check(BY_OBJECT, x, y)`).

Callers C non branchés ici : `dig()` occupation, `dighole`. Seul caller JS nouveau : `do_break_wand`.

### `fillholetyp` — C `dig.c:606` / JS
Boucle `lo_x = max(1,x-1)` … `hi_y = min(y+1, ROWNO-1)` : bornes C. `is_moat` **avant** `is_pool` (commentaire C : moat ⊂ pool). `if (!fill_if_any) pool_cnt /= 3` — JS `(pool_cnt / 3) | 0` ≡ division entière vers 0.

RNG, ordre clang LTR :
1. `lava_cnt > moat+pool && rn2(lava_cnt+1)` **ou** `(lava_cnt && fill_if_any)`
2. sinon moat `rn2(moat_cnt+1)`
3. sinon pool `rn2(pool_cnt+1)`

JS : mêmes `if` successifs (pas `else if` après lava, mais `return` — équivalent). `is_moat` omet drawbridge-under (nommé). `fill_if_any=false` pour break-wand : match C `fillholetyp(x,y,FALSE)`.

### `liquid_flow` — C `dig.c:838` / JS
C, ordre strict :
1. sanity `is_pool_or_lava` sinon `impossible`
2. `delfloortrap(ttmp)` — untrap le monstre
3. `obj_ice_effects(x,y,TRUE)`
4. `unearth_objs`
5. `pline(fillmsg, hliquid(...))`
6. `fire_damage_chain` / `water_damage_chain` sur `level.objects[x][y]`
7. héros `pooleffects(FALSE)` / monstre `minliquid`

JS : `deltrap` (pas untrap) ; 3–4 et 6 **sautés** ; 7 héros **corps vide** ; 7 monstre `minliquid` via `import('./mon.js')`. `fillmsg` JS : `String.replace('%s', liq)` — OK pour `"Some holes are quickly filled with %s!"`. Si `fillmsg` est déjà interpolé ailleurs, divergence ; ici non.

Conséquence RNG : toute chaîne fire/water/ice de C est **non consommée**. Un break-wand au-dessus d’objets gelés / potions au sol ne matchera pas C.

### `digactualhole` — C `dig.c:640` / JS
Porté (PIT) :
- `maketrap` ; `madeby_u` / `madeby_obj` / `heros_fault` (BY_OBJECT blâme le héros, comme C)
- `tseen=0` ; `seetrap` / `feeltrap` si `madeby_u`
- messages adjacent vs underfoot vs `Monnam` vs verbose STWALL
- PIT : shopdoor+fault → `pay_for_damage("ruin")` else `add_damage(..., SHOP_PIT_COST|0)`
- `set_utrap(rn1(4,2), TT_PIT)` ; `vision.full_recalc = 1`
- flyer/floater pline ; `mintrap` si `mtmp !== madeby`

**Sauté**, C les a **avant** ou **dans** HOLE :
- `furniture_handled` **avant** `maketrap` — fontaine/évier/pont deviennent une fosse.
- `buried_ball_to_punishment` / `reset_utrap(FALSE)` TT_INFLOOR.
- `IS_FURNITURE` « falls into » + `desecrate_altar`.
- `wake_nearby(FALSE)` si `madeby_u` (PIT).
- `switch_terrain()` (lévitation bloquée dans la roche).
- `pickup(1)` si `oldobjs != newobjs`.
- **Bras HOLE** C `753–827` : leash `next_to_u`, `impact_drop`, `shopdig(1)`, `pay_for_damage("dig into", TRUE)`, `You fall through...`, `goto_level(&newlevel, FALSE, TRUE, FALSE)`, `spoteffects`, migrate `teleport_pet` / `migrate_to_level`.

JS HOLE :
```
if (shopdoor && heros_fault) pay ruin;
if (atHero && (ustuck || wont_fall || Lev || Fly)) { /* impact deferred */ }
else if (atHero) { /* goto_level deferred — HOLE remains under hero */ }
else { /* teleport_pet deferred */ }
```
Pour break-wand, C :
```
digactualhole(..., (rn2(obj->spe) < 3 || (!Can_dig_down && !candig)) ? PIT : HOLE)
```
JS identique. Donc **un HOLE C-choisi reste un piège sous le héros sans chute**. C’est le plus gros écart de surface du commit.

`is_digging()` **reste `return false`** avec commentaire « dig fn not yet an occupation export ». Correct pour D-0950 ; `watch_on_duty` ne voit toujours pas de creusement héros.

### `fill_pit` — C `trap.c:4010` / JS
C : boulder + pit/hole → `obj_extract_self` ; `flooreffects(otmp, x, y, "settle")`.
JS : extract + `deltrap` + `delobj` + `newsym`. Pas de messages settle, pas de RNG `flooreffects`. Commentaire « thin » honnête ; sémantique « le boulder disparaît et le pit aussi » souvent vraie, pas toujours (C peut transformer le trap).

### `maybe_dunk_boulders` — C `apply.c:3897` / JS
C : `while (pool/lava && boulder) { extract; boulder_hits_pool(..., FALSE); }`.
JS : extract+`delobj` dans le while. Pas de splash, pas de remplissage, pas de `rn2` interne de `boulder_hits_pool`.

### `do_break_wand` — C `apply.c:3909` / JS `apply.js`
C après le `switch` explode-types : explode magique `rnd(dmg)` ; `zapsetup` ; boucle 9 directions.

JS D-0950 :
- WAN_STRIKING…UNDEAD : explode+`discard`+**return** (pas de wall-of-force C, pas de boucle). Enveloppe OK, pas C.
- default (dig/create/light) : explode puis boucle **sans** `zapsetup`.
- WAN_DIGGING : `dcres < DIGCHECK_FAILED || dcres === DIGCHECK_FAIL_BOULDER` — C identique (`DIGCHECK_FAILED = 10` dans `js/const.js`).
- ICE : C `spot_stop_timers(x,y,MELT_ICE_AWAY)` ; JS `void ICE`.
- CREATE : `makemon(null, u.ux, u.uy, NO_MM_FLAGS)` **dans** la boucle → 9 spawns comme C. Commentaire « x,y might be rock » recopié. RNG `makemon` ×9 : ordre identique si `makemon` est fidèle.
- Shop : `pay_for_damage("dig into", false)` après la boucle, seulement si mur/porte vus. Match C. (Si le héros tombe dans un HOLE, C dit que cet appel est no-op — JS ne tombe pas.)

`await import('./dig.js')` au milieu de `do_break_wand` : pas un `nhgetch` ; OK. Cycle évité au load.

## Constitution / playbook
Grep du diff JS : pas de `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `from 'fs'` / `node:` / `fastforward` / coordonnées / noms de seeds. Frozen (`isaac64`/`terminal`/`storage`) non touchés. `await` = `pline` / `explode` / `import()` / `watch_dig` / `liquid_flow` / `digactualhole` / `pay_for_damage` / `minliquid` / `mintrap` — pas de nouvelle frontière input. RAS constitutionnel après grep.

## Densité (§2b)
**Right size** sémantique : une famille `dig.c` helpers + les **deux** `case` break-wand qui les appellent. ~326 LOC `dig.js` dépasse le guide 50–300 ; ce n’est pas « finish potions » ni eat+vault. Les bras bhit restent dehors (D-0952). Trop petit aurait été `fillholetyp` seul.

## Documentation
`turns.md` : « D-0950 ; HOLE fall / furniture_handled / boulder_hits_pool thin » ; occupation `is_digging` encore deferred. `debt.md` apply : strike/cancel/… + WAN_LIGHT. D-log Status **fixed** = retraite de dette nommée, pas « complete C ». Journal #1218 : green+strict ; wizard/dig/shop 12/12 ; pas de full `sessions`. Honnête sur les omit ; le mot « fixed » reste un overclaim léger pour un `digactualhole` HOLE vide.

## Vérification
Journal affirme green+cohort **sans** commande dans le commit (`ps_test_runner`, session names). Fortress « held » = non-régression des 44, pas une preuve que break-wand dig a été joué. Les stubs HOLE/`furniture` ne peuvent pas échouer un seed qui ne les touche pas. Preuve **faible** (affirmation de loop agent).

## Catalogue d’omissions (surface hole-digging)
À nommer explicitement — la map en couvre une partie, pas la liste opérationnelle :

| Locus C | Statut JS D-0950 | Effet |
|---------|------------------|--------|
| `furniture_handled` fontaine/sink/bridge | absent | meuble → PIT |
| HOLE `goto_level` / `spoteffects` | stub commentaire | pas de chute |
| HOLE `shopdig(1)` / `impact_drop` | absent | shop/objets |
| HOLE `teleport_pet` / `migrate_to_level` | absent | monstre reste |
| `wake_nearby` PIT | absent (D-0954 l’ajoute) | sleep inchangé |
| `switch_terrain` / `pickup` unearthed | absent | lev/objets |
| `desecrate_altar` | absent | pas de wrath |
| `liquid_flow` ice/unearth/damage/`pooleffects` | thin | RNG objets/héros |
| `fill_pit` `flooreffects("settle")` | deltrap+delobj | pas settle |
| `maybe_dunk` `boulder_hits_pool` | delobj | pas splash |
| ICE `spot_stop_timers` | `void ICE` | fonte |
| `dighole` / occupation `dig` / `is_digging` | pas ce commit | callers morts |
| `do_earthquake` `liquid_flow` | pas branché | musique |
| strike/cancel/poly/tele/undead/`litroom` | explode+return | D-0952 |

`is_digging()` reste `return false` : `watch_on_duty` et shop `holetime` (encore stub -1 dans `shk.js` à cet instant) ne voient aucun creusement héros. D-0951 corrigera l’identité `occupation === dig`, pas la surface HOLE.

Callers C de `dig_check` encore morts après ce commit : `dig()` occupation, `dighole`. Seul caller JS nouveau : `do_break_wand`. Un cohort wizard/dig 12/12 n’exerce probablement **pas** `do_break_wand`.

## Risques / dette
1. **HOLE sans `goto_level`** — `rn2(spe)<3` faux + `Can_dig_down` : piège HOLE, pas de chute ni migrate.
2. **`furniture_handled` absent** — fontaine/évier/pont → PIT.
3. `liquid_flow` sans ice/unearth/fire/water/`pooleffects` — RNG objets/héros.
4. `fill_pit` / `maybe_dunk` sans `flooreffects` / `boulder_hits_pool`.
5. ICE `spot_stop_timers` sauté (timers de fonte).
6. Callers C encore morts : `dighole`, `dig` occupation, earthquake `do_earthquake`.
7. `is_digging()` toujours false.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7/10**
- Si je ne devais retenir qu’une critique : `dig_check`/`fillholetyp` sont branch-fidèles, mais `digactualhole` HOLE est un no-op de chute — la surface hole-digging n’existe que pour PIT + fill liquide.
