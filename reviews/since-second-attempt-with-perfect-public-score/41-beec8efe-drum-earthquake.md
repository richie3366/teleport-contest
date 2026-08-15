# Review 41 — `beec8efe` — drum-of-earthquake `do_pit` / `do_earthquake`

## Métadonnées
- Hash complet / court : `beec8efe0c8a2208264768a8118739a0c594f48e` / `beec8efe`
- Parent : `788ffdbef2dc7b1c341caa952cfc15a5521b8f3f`
- Auteur, date : Raphaël Hervier, 2026-07-22 01:15:19 +0200
- D-id : D-0972
- Stats : 9 files, +466/−36 (JS : `js/music.js` +418)
- Fichiers JS / map / cadence : `js/music.js` ; `docs/c-js-map/{turns,debt,absent}.md` ; pas de cadence

## Intention vs livrable
Le message promet de retirer la dette nommée `DRUM_OF_EARTHQUAKE` pour que
l’improvisation exécute les sémantiques C de fosse / séisme au lieu d’un
« You play… ». Le diff fait exactement ça : `generic_lvl_desc`, `do_pit`,
`do_earthquake`, et le bras `DRUM_OF_EARTHQUAKE` de `do_improvisation`.
Écart : le morph terrain PIT (`IS_ROOM`→`ROOM`) n’est **pas** poussé dans
`maketrap` partagé — copie locale dans `do_pit`, assumée pour ne pas
casser la suite. Ce n’est pas un overclaim de titre ; c’est un split
géométrique conscient.

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/music.js` | Port C `do_pit` / `do_earthquake` / `generic_lvl_desc` + wiring drum |
| `docs/c-js-map/turns.md` | Envelope music : D-0972 + omissions nommées |
| `docs/c-js-map/debt.md` | apply/music row : drum porté, flute/harp/passtune encore ouverts |
| `docs/c-js-map/absent.md` | `desecrate_altar` quake retiré de la liste absente |
| `docs/DIVERGENCE-LOG.md` / INDEX | D-0972 « fixed » avec deferred list |
| `docs/CURRENT.md` / `NOTES.md` / journal | Next cluster ; seed0009 noté préexistant |

## Fidélité C ↔ JS

### `generic_lvl_desc`
- Locus C : `nethack-c/upstream/src/music.c:generic_lvl_desc` (~478)
- Locus JS : `js/music.js:generic_lvl_desc`
- Branches portées : `Is_astralevel` → « astral plane » ; `In_endgame` →
  « plane » ; Sokoban « puzzle » ; V_tower « tower » ; défaut « dungeon ».
- Sautée : `Is_sanctum` → « sanctum » (commentée « deferred → rare sanctum
  wording »). Un drum sur sanctum dira « dungeon » au lieu de « sanctum ».
- RNG : aucun. Callers : uniquement le bras drum.

### `do_pit`
- Locus C : `music.c:do_pit` (221–338)
- Locus JS : `js/music.js:do_pit`
- Ordre C confirmé : `maketrap(PIT)` → `tseen=1` → boulder `sobj_at` →
  `flooreffects` → sinon `fillholetyp` / `liquid_flow` → mon flyer/clinger
  vs chute `rnd(4|6)` → hero buried-ball / Lev|Fly|clinger / chute
  `rn1(6,2)+rnd(6)` / jostle `Fumbling&&rn2(5)` puis `rnl(3|9)` puis
  `DEX>7 && rn2(5)`.
- RNG (clang LTR) : `rnd` dégâts monstre **après** `mselftouch` ; hero
  `set_utrap(rn1(6,2))` **avant** `losehp(rnd(6))` ; jostle `keepfooting`
  consume `rn2`/`rnl` **avant** le second `rn1`/`rnd`. JS respecte cet
  ordre.
- Écarts concrets :
  1. **Morph PIT inline.** C `trap.c:maketrap` PIT convertit aussi
     `DRAWBRIDGE_UP` (masque DB_FLOOR + ice timers), murs/`SDOOR`→DOOR
     ou ROOM/CORR maze, `set_levltyp` (comptages fontaine/sink),
     `add_damage` shop-hole. JS ne morph que `IS_ROOM`→`ROOM` et
     `STONE|SCORR`→`CORR`, plus unearth/engr/`recalc_block_point`. Un
     pit de drum sur pont-levis fermé ou mur **n’est pas** C. Documenté,
     mais c’est de la géométrie.
  2. **`flooreffects` thin.** C appelle `flooreffects(otmp,x,y,"")`. JS
     `deltrap` si pit + `delobj` boulder. Pas de shop/`stolen_value`,
     pas d’autres objets au sol.
  3. **`mselftouch` / `selftouch` no-op.** C peut pétrifier (cockatrice
     wield). Aucun RNG ici donc la suite publique ne dérive pas — mais
     le cadavre / instadeath est faux.
  4. **`set_levltyp` vs `lev.typ = filltype`.** `liquid_flow` voit le
     bon typ ; les compteurs de features niveau ne bougent pas
     (`count_level_features` nommé).
  5. **`You_hear` async** + pas de `Soundeffect` : pas d’input, pas de
     RNG.

### `do_earthquake`
- Locus C : `music.c:do_earthquake` (344–475)
- Locus JS : `js/music.js:do_earthquake`
- Force clamp `>13 → 13` ; bounding box `force*2` clampée
  `max(1,0)` / `min(COLNO-1,ROWNO-1)` — identique C.
- Par cellule : `wakeup(TRUE)` **puis** unhide ceiling-hider **puis**
  `seemimic` **puis** `if (rn2(14-force)) continue`. Le RNG de fosse
  est **après** le réveil : JS le copie. Un `&&` court-circuité ici
  casserait le keystream.
- `switch(typ)` : FOUNTAIN/SINK/ALTAR(`AM_SANCTUM` preserve +
  `desecrate_altar` puis `do_pit`)/GRAVE/THRONE/SCORR FALLTHRU
  CORR|ROOM / SDOOR FALLTHRU DOOR (`D_NODOOR` → pit sinon collapse +
  `add_damage` shop). En JS le fallthrough est réel (pas de `break`
  sur SCORR/SDOOR) — correct, contrairement à un port Python.
- Écarts : `Soundeffect` absent ; `desecrate_altar` via
  `await import('./pray.js')` **dans** la boucle (coût, pas d’ordre
  RNG) ; `unblock_point` C SCORR vs JS `recalc_block_point` (même
  famille vision déjà utilisée ailleurs).

### `do_improvisation` bras `DRUM_OF_EARTHQUAKE`
- C (688–702) : `consume_obj_charge` → pline rolling → `Hero_playnotes("C",100)`
  → `generic_lvl_desc` → `do_earthquake((ulevel-1)/3+1)` →
  `awaken_monsters(ROWNO*COLNO)` → `makeknown`.
- JS : même ordre ; `Math.trunc` ≡ division entière C. `Hero_playnotes`
  reste no-op (nommé). `consume_obj_charge` local : `spe--` seulement
  (unpaid / `update_inventory` différés — nommé).
- C : pas de surdité tant que le drum est magiquement fonctionnel.
  JS n’ajoute pas `HDeaf` sur ce bras. Correct.
- Callers : `do_play_instrument` → `do_improvisation` déjà branché
  (D-0454). Pas de nouveau caller manquant.

**Au moins un écart branch-par-branch :** le morph PIT n’est pas
`maketrap` C ; un fountain/sink/altar devient fosse **sans**
`set_levltyp` ni bras DRAWBRIDGE_UP/mur.

C `maketrap` PIT (trap.c ~514–565) après `FALLTHROUGH` HOLE/TRAPDOOR :

```514:561:nethack-c/upstream/src/trap.c
    case PIT:
    case SPIKED_PIT:
        ttmp->conjoined = 0;
        FALLTHROUGH;
    case HOLE:
    case TRAPDOOR:
        if (*in_rooms(x, y, SHOPBASE)
            && (is_hole(typ) || IS_DOOR(lev->typ) || IS_WALL(lev->typ)))
            add_damage(x, y, ...);
        if (lev->typ == DRAWBRIDGE_UP) { /* keep drawbridgemask */
            ...
        } else if (IS_ROOM(lev->typ)) {
            (void) set_levltyp(x, y, ROOM);
        } else if (lev->typ == STONE || lev->typ == SCORR) {
            (void) set_levltyp(x, y, CORR);
        } else if (IS_WALL(lev->typ) || lev->typ == SDOOR) {
            (void) set_levltyp(x, y, maze ? ROOM : cavernous ? CORR : DOOR);
        }
```

JS `do_pit` n’a ni `conjoined=0`, ni shop-hole `add_damage`, ni
DRAWBRIDGE_UP, ni mur. L’unearth buried + `del_engr_at` + `newsym`
sont là. Pour une case `ROOM` simple, le résultat visuel est proche ;
pour une fontaine (souvent `IS_ROOM` selon `rm.h`) C passe par
`set_levltyp` (décrémente `nfountains`) et JS fait `typ=ROOM; flags=0`.

Hero jostle C (318–321) :

```
keepfooting = (!(Fumbling && rn2(5))
               && (!(rnl(Role_if(PM_ARCHEOLOGIST) ? 3 : 9))
                   || ((ACURR(A_DEX) > 7) && rn2(5))));
```

JS : mêmes appels, mêmes `&&` / `||` (court-circuit : si Fumbling
échoue le `rn2(5)`, **pas** de `rnl` — C identique). Archéologue
`rnl(3)` vs `rnl(9)` : JS `Role_if(PM_ARCHEOLOGIST)` via
`urole.mnum`. Si `urole` n’est pas hydraté, tout le monde est `rnl(9)`.

`ceiling_hider` JS : `is_hider && ((is_clinger && mlet!==S_MIMIC) ||
is_flyer)` — C `mondata.h` equivalent. Mimic au plafond : pas le
message « shaken loose ».

## Constitution / playbook
Grep du diff JS : pas de `FORCE`, `DIAG`, `getRngLog`, `readFileSync`,
`from 'fs'`, `node:`, `fastforward`, coordonnées / noms de seeds dans
le contrôle. Rule #2 RAS. Frozen non touchés. `await` = plines /
`desecrate_altar` / `You_hear` — pas un second `nhgetch`. 1:1
`music.c`→`music.js`. Omissions nommées en tête de fichier et dans
turns/debt. Import dynamique `pray.js` : cycle, pas filesystem.

## Densité (§2b)
Right size. Une famille C (`do_earthquake` + callee `do_pit` +
`generic_lvl_desc` + un bras de switch). ~300 LOC JS utiles, dans la
cible 50–300. Pas un `if` isolé ; pas un second sous-système
(flute/passtune restés dehors).

## Documentation
D-0972 « fixed » + liste Deferred honnête (passtune, flute/harp/horn,
selftouch, flooreffects full, maketrap shop-hole/drawbridge/wall,
`Hero_playnotes`, `awaken_soldiers`, `Is_sanctum`). Ce n’est pas
« complete music.c ». CURRENT / NOTES avancent le next cluster.
turns.md nomme encore le morph local « keep in music `do_pit` ».
Pas d’overclaim « complete maketrap ».

## Vérification
Journal : green+strict PASS ; cohort apply/shared **36/36** (seed0002
drummer, seed0015 pit, seed2200/0360/0030). seed0009 Scr 72/73 « on
clean HEAD ». Pas de cadence (#1245 plus tard). Preuve citée, pas de
logs collés — affirmation de loop, pas de transcript. Cohorte
géométrie (pit/drum) pertinente. Pas de preuve qu’un drum sur
DRAWBRIDGE_UP ait été exercé.

**Signal forteresse :** c’est le premier commit de cette plage où
NOTES grave « seed0009 Scr 72/73 FAIL on clean HEAD — do not chase as
D-0972 regression ». Le journal D-0972 revendique pourtant un cohort
**36/36** qui liste seed0002 drummer. Si 0009 est dans la cohorte
apply et FAIL au screen, « 36/36 PASS » et « seed0009 FAIL » ne
peuvent pas être vrais ensemble sans une exclusion silencieuse.
CURRENT reste **44/44 @#1240** jusqu’au cadence #1245 : le FAIL vit
dans NOTES seulement. À traiter comme une affirmation de loop, pas
comme une preuve que le drum n’a pas touché 0009.

## Risques / dette
1. **Géométrie `maketrap` fendue** — pits drum ≠ pits dig/trap pour
   pont, mur, shop-hole, compteurs de features. NOTES dit de ne pas
   pousser le morph partagé sans full suite : correct, mais la dette
   reste chaude.
2. `flooreffects` boulder thin — KADOOM sans le reste du C.
3. `selftouch` no-op — instadeath cockatrice sous séisme absent.
4. `Is_sanctum` wording.
5. `consume_obj_charge` unpaid.
6. Dynamic import dans la double boucle x/y (perf, pas RNG).
7. `Role_if` via `urole.mnum` — jostle archéologue si rôle mal calé.
8. `awaken_monsters(ROWNO*COLNO)` après le séisme : chaque monstre
   du niveau peut `resist(TOOL)` (RNG) — C identique, mais le stub
   `awaken_scare` hérité D-0454 borne encore wiz/angel/rider.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7.5/10**
- Si je ne devais retenir qu’une critique : le séisme est branch-fidèle
  (ordre `wakeup` puis `rn2(14-force)`, fallthrough SCORR/SDOOR) mais
  le terrain PIT est une copie locale incomplète de `maketrap`, donc
  la géométrie drum ≠ géométrie C dès qu’on quitte une case `ROOM`.
