# Review 57 — `35988b38` — kick_object + bhit KICKED_WEAPON

## Métadonnées
- Hash complet / court : `35988b3891b42143454cc5f01e9158cfca6d4f40` / `35988b38`
- Parent : `7916e1aa76767e305f96c5791fe13afc93ce2303`
- Auteur, date : Raphaël Hervier, 2026-07-22 03:29:17 +0200
- D-id : D-0988
- Stats : 13 files, +467/−71
- Fichiers JS / map / cadence : `js/dokick.js`, `js/zap.js`, `js/dothrow.js` (export `thitmonst`), `js/shk.js` (export `costly_adjacent`) ; map `turns.md`/`absent.md`/`debt.md` ; pas de cadence suite

## Intention vs livrable
Le message promet un port C-fidèle de `kick_object` / `really_kick_object` plus le bras `KICKED_WEAPON` de `bhit`, pour que le kick d’objet au sol cesse d’être un `kick_ouch` systématique.

Le diff le fait : `dokick` branche `objects_at` vers `kick_object` ; `really_kick_object` porte l’enveloppe range/flight/land ; `bhit` n’est plus un tunnel `ZAPPED_WAND` only. Écart : le D-log dit « fixed » alors que gold-sur-monstre (`ghitm`), `hits_bars`, WEB `rn2`, `shade_miss` et `snuff_candle` restent des no-op nommés. Ce n’est pas un mensonge de titre, mais « flight via bhit » vend un `bhit` encore latéral.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/dokick.js` | Port C : `kick_object`, `really_kick_object`, helpers `is_ice`/`closed_door`/`surface`/`Doname2` ; wire `dokick` |
| `js/zap.js` | Port C : bras `KICKED_WEAPON` de `bhit` ; export `bhit` |
| `js/dothrow.js` | Wiring : export `thitmonst` |
| `js/shk.js` | Wiring : export `costly_adjacent` |
| `docs/c-js-map/{turns,absent,debt}.md` | Docs : retraite de l’omission kick objet |
| `docs/CURRENT.md`, `NOTES.md`, `DIVERGENCE-*`, journal | Docs / archive |

## Fidélité C ↔ JS

### `kick_object`
- Locus C : `nethack-c/upstream/src/dokick.c:kick_object` (~489)
- Locus JS : `js/dokick.js:kick_object`
- Branches portées : `kickedobj = objects_at` ; nom ; `really_kick_object` ; clear.
- RNG : aucun.
- Callers : `dokick` si `objects_at(x,y)` — branché. Si `kicked` falsy, `kick_ouch(..., kickobjnam.value)` comme C `kickstr`.
- Stub : `killer_xname` remplacé par `xname` (commenté). Pas le même killer string si l’objet tue le héros.

### `really_kick_object` — ordre des `if`
C (508–789) vs JS. Ordre porté :

1. boulder / ball / chain → 0
2. pit+!Passes_walls / WEB → refuse (return 1)
3. `Fumbling && !rn2(3)` → miss
4. *(petrify pieds nus sauté)*
5. poids : `quan>1 && !gold` → `quan=1` temporaire puis `weight`
6. `range = ACURRSTR/2 - k_owt/40` ; `martial()` → `rnd(3)`
7. pool `/3+1` **sinon** air/water `rnd(3)` **sinon** ice `rnd(3)` puis grease `rnd(3)`
8. Mjollnir → range=1
9. `!isok || !ZAP_POS || closed_door` cellule suivante → range=1
10. `find_objowner` + `costly_spot || (costly_adjacent && unpaid)`
11. `Norep("You kick %s.")` — `singular(doname)` sauf gold
12. obstructed/door : `!martial && rn2(20) > DEX` **ou** hero obstructed → pas loose + `!rn2(3) \|\| martial` ; sinon extract, bill, `flooreffects` aux pieds
13. *(Is_box lock/lid/impact sauté — THUD si range<2 seulement)*
14. `hero_breaks`
15. range<2 → Thump + même `rn2(3)` martial
16. split / gold `rn2(20)` scatter `rnd(3)` / quan>300 Thump
17. slide message
18. extract ; *(snuff_candle sauté)* ; `bhit(KICKED_WEAPON)`
19. shk catch minvent ; `thitmonst` si !gold ; *(ghitm sauté)*
20. `OBJ_MIGRATING` ; stolen_value si sortie shop *(costly_gold sauté)* ; `flooreffects` ; unpaid `subfrombill` ; place+stack

Confirmation branch-par-branch : le `rn2` martial/pool/ice/grease est dans le **même ordre clang** que C. Écart concret #1 : C calcule `k_owt` initial via `kickedobj->owt` puis `weight()` seulement si stack ; JS appelle `weight()` d’emblée. Si `owt` est stale, le range diverge.

Écart #2 — pit/web : C `find_trap` si `!tseen` puis `Hallucination ? "tizzy"`. JS refuse sans révéler le piège et sans `tizzy`. Pas de RNG ici, mais un `tseen` C-only.

Écart #3 — gold vs monstre : C `isgold ? ghitm : thitmonst`. JS tombe au sol à `bhitpos` (souvent la case du monstre). Ça saute `ghitm`’s `!rn2(4)` `setmangry` et le `rn2(3)`/`rn2(5)` mercenaire — **skip RNG** dès qu’on kick de l’or sur un monstre qui aime l’or. Nommé, donc pas un oubli silencieux, mais le chemin n’est pas « land C-fidèle » pour l’or.

Is_box au commit 57 : THUD si `range<2` puis fall-through `hero_breaks`/move, **sans** `container_impact_dmg` ni `rn2(5)` lock. C consomme ces `rn2` avant `hero_breaks`. Kick d’un coffre = skip RNG lock/lid. Nommé.

Scatter gold : `You("%s!", ROLL_FROM(flyingcoinmsg))` ≡ `msgs[rn2(3)]` — OK.

### `bhit` KICKED_WEAPON (haut risque)
- Locus C : `nethack-c/upstream/src/zap.c:bhit` (~3827)
- Locus JS : `js/zap.js:bhit`

Porté, et **dans le bon ordre relatif** :
- `KICKED_WEAPON` : `bhitpos = ux+ddx` puis `range--` **avant** la boucle qui ré-incrémente — l’objet n’est pas re-testé sur sa case de départ (C identique).
- WATERWALL/LAVAWALL : stop thrown/kicked **avant** les barreaux (barreaux encore deferred ici).
- monstre : `ZAPPED_WAND` inchangé (`fhitm`/`bhitm`, `r -= 3`) ; sinon stop et `result = mtmp`.
- `fhito` null + kicked : `COIN_CLASS && OBJ_AT` **puis** `ship_object(..., costly_spot)` — C est un `||` court-circuit ; JS `if (coinPile) break` puis `ship_object`. Même skip de `ship_object` sur pile d’or.
- pool/lava kicked et sink : après `ZAP_POS`, comme C (`is_pool_or_lava` / `IS_SINK`).

Écarts concrets dans le **chemin partagé** (donc zap **et** kick) :

1. **WEB stick** C : `!mtmp && ttyp==WEB && (THROWN\|KICKED) && !rn2(3)` — consomme un `rn2` par case web sans monstre. JS sauté. Nommé « WEB stick rn2 ». Dès qu’un kick survole une toile, le keystream se décale.
2. **`shade_miss` / mimic-as-object** : C peut nuller `mtmp` (et `shade_miss` a son propre RNG). JS stoppe sur le shade. Nommé.
3. **`tmp_at` / `nh_delay_output`** : pas de flash ; pas de RNG display (`obj_to_glyph(..., rn2_on_display_rng)`). Nommé.
4. **`shkcatch`** pick en shop : sauté.
5. C `if (fhito) bhitpile; else { kicked coin/ship }` ; JS `else if (weapon === KICKED_WEAPON)`. Équivalent tant que `ZAPPED_WAND` passe un `fhito`. Fragile si un caller zap appelle `bhit` avec `fhito` null.
6. C `fhitm` returning true arrête le zap (`goto bhit_done`). JS ignore la valeur de retour — **préexistant**, pas introduit, mais le commit touche ce `if (mtmp)`.

C ZAPPED_WAND `zap_map` / `doorlock` : JS laisse un commentaire « doorlock deferred » avec `IS_DOOR || STONE` au lieu de C `IS_DOOR || SDOOR`. Préexistant. Le nouveau code insère WATERWALL **avant** ce bras : un zap dans un WATERWALL C continue (le `break` n’est que thrown/kicked) ; JS aussi. Pas de régression zap sur ce point.

`point_blank` n’existe pas encore dans ce commit (ajouté D-0990 avec hits_bars). Ici, pas de `rn2(5)` barreaux — l’objet kické **traverse IRONBARS** parce que `ZAP_POS(IRONBARS)` est vrai. C `bhit` les arrête. Nommé « hits_bars deferred ». Kick vers des barreaux = vol trop long + skip du `!rn2(5)` et de `hero_breaks` à l’impact. Keystream **et** physique.

Le getter/setter `pref.obj` ↔ `game.kickedobj` mime `struct obj **pobj`. Correct pour destruction mid-flight. Si `hero_breaks` ou `ship_object` null `kickedobj`, `pobj.obj` suit.

C `tmp_at(DISP_FLASH, obj_to_glyph(obj, rn2_on_display_rng))` **avant** la boucle pour tout sauf ZAPPED/INVIS. Ça peut brûler du **display RNG**, pas le keystream `rn2` de jeu — selon que le port JS sépare les deux Isaac. Si display rng == game rng dans le harness (souvent le cas), skip `tmp_at` = skip RNG par case de vol. Nommé tmp_at flash. Gravité haute si les deux flux sont le même compteur.

### Callers `dokick` et `kick_ouch`
C `dokick` ~1456 : `if (kick_object(...)) return ECMD_TIME;` sinon continue vers ouch. JS : `if (kicked) return true;` puis `kick_ouch(x, y, kickobjnam.value)`. Si `really_kick_object` rend 0 (boulder/ball/chain ou « doesn't come loose » avec `rn2(3)||martial` faux), le héros prend l’ouch **et** a déjà pu consommer des `rn2` (Fumbling, DEX obstructed). C identique : res==0 mène à `kickstr`/`losehp`.

Le `return (!rn2(3) || martial()) ? 1 : 0` JS sur « doesn't come loose » : C `return (!rn2(3) || martial());` (bool → 0/1). Si 0, ouch après un kick qui n’a rien bougé. Keystream : ce `rn2(3)` est **après** le `rn2(20)` DEX. Ordre C respecté.

### Gold scatter `ROLL_FROM`
C `static const char *const flyingcoinmsg[]` taille 3, `ROLL_FROM` = `rn2(SIZE)`. JS tableau local + `rn2(msgs.length)`. Puis `scatter(..., rnd(3), VIS_EFFECTS|MAY_HIT, ...)`. Deux RNG, même ordre. `Deaf` JS reconstruit HDeaf/EDeaf/uroleplay — C macro `Deaf`. Possible faux négatif acoustics vs C `flags.acoustics`.

### `thitmonst` export
Pas de changement de corps. Le kick devient un caller de plus d’une fonction qui fait `dieroll = rnd(20)` **avant** les bras de classe. Un monstre touché par un objet kické brûle ce `rnd(20)` comme un jet. C `thitmonst(mon, kickedobj)` identique. Si `thitmonst` JS est encore un subset, le kick hérite de ces omissions (leader catch, etc.) — dette `dothrow`, pas créée ici, mais nouvellement **exercée**.

### Helpers locaux vs C
`is_ice` : `typ === ICE` only ; C `dbridge.c is_ice` peut voir drawbridge-under ICE. Nommé. `surface()` : ice/fountain/altar/floor/ground — subset de `dungeon.c surface` (suffisant pour le Whee slide). `Doname2` = capitalize `doname` ; C `Doname2` passe par `doname` + case. `closed_door` : `D_LOCKED|D_CLOSED` sur `IS_DOOR`. C `hack.c closed_door` identique en substance.

`k_owt` : C part de `owt` caché. Un objet dont `owt` n’a pas été `weight()`-sync (conteneur après shatter, glob) aurait un range C ≠ JS. Kick d’un coffre plein : `owt` C vs `weight()` JS — à surveiller après D-0989 impact qui change `owt`.

## Constitution / playbook
Grep diff JS : pas de `FORCE`/`DIAG`/`getRngLog`/`readFileSync`/`node:`/`fastforward`. `FORCEBUNGLE` n’apparaît pas dans ce commit. Frozen non touchés. Pas d’`await` hors modèle pline/`nhgetch` déjà en vigueur. Rule #2 RAS.

Anti-pattern : helpers locaux `Passes_walls` / `closed_door` / `Doname2` recopiés dans `dokick.js` au lieu du module 1:1 (`hack.c` / `objnam.c`). Pas un hardcode de seed.

`bhit` exporté : surface partagée élargie sans tests de régression zap dédiés dans le journal (cohort « kick » seulement).

## Densité (§2b)
Right size. Un cluster caller/callee : `kick_object` + le bras `bhit` sans lequel le vol n’existe pas. Related deferrals (box, ghitm, bars) listés pour la peel suivante. Pas un `if` isolé ; pas un fourre-tout potion/vault.

## Documentation
CURRENT / NOTES avancent le next cluster vers Is_box/ghitm/hits_bars. Map `turns.md` nomme encore petrify, box, ghitm, costly_gold, hits_bars. D-0988 « fixed » + liste Deferred : honnête sur les noms, survend le mot **fixed** pour un `bhit` qui skip WEB/shade/bars.

Journal #1258 : green+strict + kick 19/20 (seed0009 préexistant) + seed0060. Pas de full `sessions`. Acceptable hors cadence ; pas une affirmation « fortress re-mesurée ». D-INDEX : « map-driven; green+kick cohort 19/20 (seed0009 pre-existing) » — même formule stéréotypée que D-0985–D-0987. Ne prouve pas que **ce** cluster a bougé un écran.

`absent.md` kicking : ajoute `kick_object`+bhit D-0988 ; garde box/ghitm/costly_gold/hits_bars/petrify. Cohérent. `debt.md` dokick row parallèle.

Overclaim léger du message : « so held-out kicks hit real code ». Vrai pour pierre/arme/gold-sans-monstre. Faux pour coffre (THUD only), or-sur-monstre (pas ghitm), barreaux (traverse).

## Vérification
Cité : green+strict PASS ; kick cohort 19/20 ; seed0060 PASS. Preuve = journal, pas de log de commandes dans le commit. Cohort kick après mutation de `bhit` (zap) : **insuffisant**. Un zap/shared cohort était le minimum playbook après changement du projectile engine. seed0009 Scr 72/73 recalé comme préexistant — pas investigué ici.

## Risques / dette
1. **`bhit` WEB/`shade_miss` skip RNG** sur vol kick (et throw dès que `THROWN_WEAPON` empruntera ce `bhit`).
2. **Or kické sur monstre** : pas de `ghitm` → skip `rn2(4)`/`rn2(3)`/`rn2(5)`.
3. **Coffre** : skip `rn2(5)`/`rn2(2)` lock/lid jusqu’à D-0989.
4. Zap : `fhitm` return ignoré ; `STONE` vs C `SDOOR` dans le bras doorlock (préexistant, mais le fichier bouge).
5. `killer_xname` ≠ `xname` pour `kick_ouch`.
6. Callers C de `bhit(THROWN_WEAPON)` toujours hors JS (`throwit` a sa propre boucle).
7. `snuff_candle` sauté : bougie kické reste allumée en vol (C l’éteint avant `bhit`).
8. `impact_disturbs_zombies` sauté aux deux lands (pieds obstructed + bhitpos).
9. `STATUE_TRAP` : C `activate_statue_trap` return 1 ; JS ignore le trap et continue range/Fumbling — **skip éventuel d’autres RNG de statue**.
10. Alias `game.bhitpos = game._bhitpos` : si un caller zap lisait l’un et pas l’autre, désormais liés. À vérifier.

## Questions ouvertes
- Un zap `WAN_OPENING` à travers une case WEB a-t-il changé de keystream ? (le `rn2(3)` WEB n’est tiré que thrown/kicked en C, donc zap C ne le tire pas non plus — OK.)
- Le cohort 19/20 kick contient-il un kick d’or / coffre / barreaux ? Si non, D-0988 n’est exercé que sur le path pierre/arme générique.
- `ship_object` mid-`bhit` avec `costly_spot` : facture-t-il deux fois avec le `stolen_value` post-loop si `OBJ_MIGRATING` n’est pas set assez tôt ? C return 1 sur `where==OBJ_MIGRATING` avant stolen_value — JS aussi.

### Citation C — offset kicked
```3846:3854:nethack-c/upstream/src/zap.c
    if (weapon == KICKED_WEAPON) {
        /* object starts one square in front of player */
        gb.bhitpos.x = u.ux + ddx;
        gb.bhitpos.y = u.uy + ddy;
        range--;
    } else {
        gb.bhitpos.x = u.ux;
        gb.bhitpos.y = u.uy;
    }
```

JS au commit : même offset + `r--`, puis `while (r-- > 0) { bhitpos += ddx }`. Premier test = 2e case. Confirmé.

### Citation C — gold vs thitmonst
```747:749:nethack-c/upstream/src/dokick.c
        if (isgold ? ghitm(mon, gk.kickedobj)      /* caught? */
                   : thitmonst(mon, gk.kickedobj)) /* hit && used up? */
            return 1;
```

JS D-0988 : `if (isgold) { /* ghitm deferred */ } else if (await thitmonst(...)) return 1`. L’or continue vers `flooreffects`/`place_object` sur la case du monstre.

## Verdict
- Verdict : ACCEPT-WITH-DEBT
- Note : 7/10
- Si je ne devais retenir qu’une critique : le bras `KICKED_WEAPON` de `bhit` est dans le bon ordre (offset, coin/ship, pool/sink) mais le même `while` saute des `rn2` WEB/shade sur un primitive partagée — trop risqué pour un « fixed » sans cohort zap.
