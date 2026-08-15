# Review 59 — `bb98ff89` — hits_bars/hit_bars + cadence #1260

## Métadonnées
- Hash complet / court : `bb98ff89bfad2de5f233719a038bca976907f08f` / `bb98ff89`
- Parent : `b949418d722a5fe52f0bd17da5813a4a4604b15d`
- Auteur, date : Raphaël Hervier, 2026-07-22 03:47:48 +0200
- D-id : D-0990
- Stats : 14 files, +350/−58
- Fichiers JS / map / cadence : `js/mthrowu.js` (port), `js/zap.js` `bhit`, `js/dothrow.js` `throwit`, `js/trap.js` `launch_obj`, `js/dokick.js` (commentaire omit) ; **cadence #1260 mêlée au port**

## Intention vs livrable
Le titre le dit lui-même : « Port hits_bars/hit_bars **and refresh #1260 suite score** ». Mélange interdit-à-flaguer : score cadence + port C dans le même commit. Le livrable JS est réel (hits/hit_bars + trois wires). Le livrable cadence est un refresh 43/44 Scr 11404/11405 RNG 100%. Dix secondes plus tard, le commit 60 rattrape une ligne de map oubliée — signature d’un commit pressé par le numéro d’itération.

D-log C locus `throwit→bhit` : vrai en C (`dothrow.c` appelle `bhit(THROWN_WEAPON)`). Faux en JS : `throwit` a sa **propre** boucle et n’appelle pas `bhit`. Le wire JS est un duplicata du test barreaux, pas une unification.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/mthrowu.js` | Port C : `hits_bars`, `hit_bars`, `harmless_missile`, `is_flimsy` |
| `js/zap.js` | Port/wiring : `bhit` IRONBARS + `point_blank`/`!rn2(5)` |
| `js/dothrow.js` | Wiring parallèle : même test dans `throwit` (pas `bhit`) |
| `js/trap.js` | Wiring : `launch_obj` `!rn2(20)` whodidit=0 |
| `js/dokick.js` | Docs-in-code : retire hits_bars des named omit kick |
| CURRENT / journal / D-log / map | Cadence + retraite D-0990 |
| archive rotate-1260 | Archive |

## Fidélité C ↔ JS

### `hits_bars`
- Locus C : `mthrowu.c:hits_bars` (~1499)
- Locus JS : `js/mthrowu.js:hits_bars`

`always_hit` puis `switch (oclass)` identique : armes (pas bow/crossbow/dart/shuriken/spear/knife) ; armure sauf `ARM_GLOVES` ; tools (pas key/lockpick/card/candles/lenses/whistles) ; rock statue `msize > MZ_TINY` ; food corpse size / meat stick / enormous meatball ; SPBOOK/WAND/BALL/CHAIN → hit. `default` : traverse.

Si `hits && whodidit !== -1` → `hit_bars(..., whodidit==1 ? BRK_BY_HERO : 0)`. Retourne `hits`.

Écart : `mons(corpsenm)?.msize` optionnel vs C `mons[corpsenm].msize` — fallback inventé si corpsenm pourri. Pas de RNG dans `hits_bars` hors `always_hit` fourni par le caller.

### `hit_bars`
- Locus C : `mthrowu.c:hit_bars` (~1417)
- JS : `js/mthrowu.js:hit_bars`

Ordre C : `hero_breaks` vs `breaks` selon `BRK_BY_HERO` ; si cassé, `*objp=0` ; POT_ACID dissolve sauf `W_NONDIGGABLE` ; sinon sons Whang/Whap/Flapp/Clink/Clonk selon boulder/ball, `harmless_missile`, `is_flimsy`, gold/silver/coin ; `noise = 16` si pas flimsy/harmless ; hammer/ball `chance = (melee?40:60) - acurrstr() - spe` puis `!rn2(max(2,chance))` casse les barreaux ; `wake_nearto`.

JS recopie cet ordre. `obj_type` sauvé **avant** breaks — comme C. `spe` ball = `owt / WT_IRON_BALL_INCR`. RNG : un seul `rn2` sur le bras hammer/ball hero_fault.

`harmless_missile` : liste otyp + `spe<1` hose/tricks + sacks vides + SCROLL + CLOTH. Commentaire JS « Named omission: none for the otyp list » — vérifié contre `dothrow.c:harmless_missile`. Helper **local** à `mthrowu.js` (C est dans `dothrow.c`) pour éviter un cycle trap↔dothrow : écart de module 1:1, pas de sémantique.

`is_flimsy` : `oc_material <= LEATHER || RUBBER_HOSE` — macro `obj.h`. OK.

Soundeffect sauté (nommé). Blind feel nommé.

### Wire `bhit` (kick)
C après WATERWALL :

```c
if (typ == IRONBARS && hits_bars(pobj, x-ddx, y-ddy, x, y,
                                 point_blank ? 0 : !rn2(5), 1)) {
    bhitpos -= dir; break;
}
```

JS identique, `whodidit=1` (héros). `point_blank` init `true`, mis `false` **en fin** de boucle — comme C. Premier pas de vol (pour un kick : la case **après** l’objet, vu l’offset D-0988) : `always_hit=0` donc le `switch` classe. Ensuite `!rn2(5)` force un hit 1/5 même pour une dague.

IRONBARS est `ZAP_POS` : sans ce test, l’objet traverse. Le D-log le dit. Correct.

`show_transient_light` toujours sauté (nommé depuis D-0988).

### Wire `throwit` (pas bhit)
JS teste IRONBARS sur `(nx,ny)` **avant** `ZAP_POS` / advance. Si hit, land sur `(x,y)` précédent. `point_blank ? 0 : !rn2(5)`, `whodidit=1`. Même contrat RNG que C-`bhit`.

Écart d’architecture : C throw passe par `bhit` (WEB, shade, waterwall, tmp_at, shkcatch). JS `throwit` n’hérite **pas** de ces bras en câblant les barreaux ici. Un throw JS vs kick JS n’empruntent pas le même moteur — préexistant, mais D-0990 **fige** le duplicata au lieu d’ouvrir `bhit(THROWN_WEAPON)`.

### Wire `launch_obj`
C `trap.c` ~3548 : `fx,fy = x+dx,y+dy` ; si IRONBARS, stop at `(x,y)` ; `hits_bars(&singleobj, x2, y2, fx, fy, !rn2(20), 0)`. JS : mêmes coords, `!rn2(20)`, `whodidit=0`. Si objet détruit : `used_up` ; C appelle aussi `launch_drop_spot` (déjà named omit bones).

Le `else if (IS_STWALL \|\| IS_TREE \|\| IS_OBSTRUCTED)` JS conserve un `IS_OBSTRUCTED` extra vs C (`STWALL|TREE` only après le bras bars). Préexistant ; IRONBARS est maintenant special-casé **avant**, donc plus avalé par `IS_OBSTRUCTED`. C’est le bon ordre.

### `point_blank` kick vs throw
Kick `bhit` : start `ux+dx`, `range--`, loop `+= dir`. Premier test barreaux = **2 cases** devant le héros (1 = objet, 2 = vol). `point_blank` encore true. Throw `throwit` : premier `(nx,ny)` adjacent, `point_blank` true. C throw via `bhit` part de `ux,uy` puis incrémente → premier test = adjacent, `point_blank` true. **Aligné throw**. Kick C/JS : premier *flight* square n’est pas la case de l’objet — `always_hit=0` sur la première barre possible après l’objet. Si on kick un objet **contre** des barreaux adjacents à l’objet (objet case 1, bars case 2), `point_blank` force le `switch` classe, pas `!rn2(5)`. C identique.

`always_hit` JS `point_blank ? 0 : !rn2(5)` : `0` est falsy, `!rn2(5)` est 0 ou 1. C `int always_hit`. OK.

### `harmless_missile` duplication
C vit dans `dothrow.c`. JS copie dans `mthrowu.js` pour `hit_bars`. Si `dothrow.js` a déjà (ou aura) la même fonction, deux listes otyp à faire dériver. Au commit 59, grep du diff : ajout local only. BAG_OF_TRICKS `spe<1` : un bag chargé n’est pas « harmless » → Clonk + noise 16. C identique.

## Constitution / playbook
Grep : hit `FORCEBUNGLE` uniquement comme import inchangé + ajout `IRONBARS` — pas un FORCE de trace. Pas de fs/DIAG/fastforward. `await import('./dothrow.js')` depuis `hit_bars` pour casser le cycle mthrowu→dothrow→trap→mthrowu : mécanique, pas Rule #2.

Playbook : **mélange cadence + port**. Instruction reviewer : le flaguer.

## Densité (§2b)
Le port seul est right size (hits/hit_bars + callers vol). Le commit n’est pas too-small. Il est **too mixed** : objectif cadence #1260 + cluster map-driven. §2b veut un cluster sémantique par itération ; la cadence est un autre objectif. Deux jobs, un hash.

## Documentation
CURRENT : score @#1260 43/44, next cadence #1265, next cluster costly_gold. D-0990 Deferred : melee `hit_bars` (hack.c), `m_throw` si thin — honnête. Overclaim : `throwit→bhit` décrit C, pas JS. `turns.md` dokick laisse encore « hits_bars deferred » d’où le commit 60. Journal #1260 avoue les deux objectifs dans le même bloc — au moins pas caché.

## Vérification
Cité : green+strict ; kick/throw cohort **7/8** (maigre pour un primitive partagée) ; cadence 43/44 Scr 11404/11405 RNG 100% speed `32+0.27/turn`. La cadence est une **preuve réelle** de non-régression suite (seed0009 toujours FAIL). Le 7/8 throw/kick ne couvre pas `launch_obj` rolling boulder ni un zap à travers des barreaux. `bhit` ZAPPED_WAND inchangé fonctionnellement pour les barreaux (bras thrown/kicked only) — OK.

## Risques / dette
1. Process : cadence+port ; map dokick incomplète (commit 60).
2. `throwit` ≠ `bhit` : WEB/shade skip restent sur kick-`bhit` seulement ; throw a encore sa boucle divergente.
3. `m_throw` monstre / melee wielded `hit_bars` non branchés (nommé).
4. `mons(corpsenm)?.msize` fallback.
5. Deux copies du test IRONBARS (`bhit` vs `throwit`) à faire dériver plus tard.
6. `hit_bars` `game.flags?.acoustics === false` OR `u.Deaf` vs C `Deaf` macro — possible double condition.
7. `dissolve_bars` export `hack.js` : si thin, acide/hammer « cassent » sans changer le `typ`.
8. `wake_nearto(barsx, barsy, noise)` avec `noise = 16` ou 32 : si JS `wake_nearto` ignore le rayon, les réveils divergent sans RNG.
9. `hero_breaks`/`breaks` dynamiques : cassent l’objet **avant** le son ; si `hero_breaks` JS consomme `rn2` breaktest, l’ordre vs C `hero_breaks` puis son est le bon.
10. Cadence 43/44 **identique** à #1255 : le port barreaux n’a touché aucune session publique — soit aucune ne frappe des barreaux, soit le skip D-0988 n’était pas exercé non plus.

## Questions ouvertes
- `m_throw` monstre vs barreaux : le D-log dit « if still thin ». `mthrowu.js` a-t-il déjà un vol monstre qui traverse IRONBARS ?
- Display rng `tmp_at` toujours absent sur `bhit` kick : la cadence RNG 100% suggère que soit display ≠ game rng, soit aucun kick de vol n’atteint une case flash-comptée.
- Le 7/8 cohort : quelle session FAIL (hors seed0009) ? Si c’est un throw barreaux, D-0990 n’est pas vert.

### Citation C — `hits_bars` armes
```1512:1521:nethack-c/upstream/src/mthrowu.c
        case WEAPON_CLASS: {
            int oskill = objects[obj_type].oc_skill;

            hits = (oskill != -P_BOW && oskill != -P_CROSSBOW
                    && oskill != -P_DART && oskill != -P_SHURIKEN
                    && oskill != P_SPEAR
                    && oskill != P_KNIFE); /* but not dagger */
            break;
        }
```

JS : mêmes six inégalités. Dague (`P_DAGGER`) n’est pas `P_KNIFE` → traverse, sauf `always_hit`. Commentaire C « but not dagger » recopié sémantiquement.

### Citation C — `bhit` barreaux
```3900:3913:nethack-c/upstream/src/zap.c
        if (weapon == THROWN_WEAPON || weapon == KICKED_WEAPON) {
            if (obj->lamplit && !Blind)
                show_transient_light(obj, x, y);
            if (typ == IRONBARS
                && hits_bars(pobj, x - ddx, y - ddy, x, y,
                             point_blank ? 0 : !rn2(5), 1)) {
                obj = *pobj;
                gb.bhitpos.x -= ddx;
                gb.bhitpos.y -= ddy;
                break;
            }
        }
```

JS D-0990 : `show_transient_light` toujours sauté ; coords `x-ddx,y-ddy` / `x,y` ; `point_blank ? 0 : !rn2(5)` ; `whodidit=1` ; `bhitpos -= dir`. Fidèle hors light.

### Cadence mêlée — ce que CURRENT écrit
Score last measured @#1260 43/44, Scr 11404/11405, RNG 792838/792838, speed `32+0.27/turn` (était `30+0.27` @#1255). Le port n’a changé **aucun** total d’écran. Next cadence #1265. Le journal #1260 a un seul bloc « mandatory full sessions » + « map-driven hits_bars ». C’est le mélange.

`dokick.js` dans ce commit : **une ligne de commentaire** named omit (retire hits_bars). Le kick path n’appelle pas `hits_bars` directement — il passe par `bhit`. Wire réel = `zap.js`. Mentionner `dokick` dans les fichiers touchés est du bruit de commentaire.

Hammer/ball : `chance = (melee_attk ? 40 : 60) - acurrstr() - spe` puis `!rn2(max(2, chance))`. Throw/kick : melee=0 (breakflags sans BRK_MELEE) → 60 - str - spe. Str 18, spe 0 → `rn2(42)`. JS `Math.max(2, chance)` comme C `max(2,chance)`. Si chance négative (str 25 + spe 20), C `max(2, négatif)=2` → `rn2(2)`. JS identique. Pas de division par zéro.

`whodidit=-1` : C check-only, pas de `hit_bars`. Aucun caller JS de ce commit ne passe -1. Dead arm, fidèle.

IRONBARS + `ZAP_POS` : sans hits_bars, `throwit` JS faisait `if (!ZAP_POS || closed) break` — IRONBARS est ZAP_POS donc **advance into bars** puis continue. D-0990 intercepte **avant** ce test. C `bhit` idem (bars avant ZAP_POS stop). Le D-log « throwit flew through bars because IRONBARS is ZAP_POS » est la bonne diagnose.

`launch_obj` `!rn2(20)` vs vol `!rn2(5)` : C rolling boulder force-hit 5% ; missile héros 20% hors point-blank. JS copie. Un rocher de trap vs une dague kické n’ont pas le même always_hit. Pas une unification abusive.

Melee `hit_bars` depuis `hack.c` (casser des barreaux à la masse en main) : named omit. `dokick` IRONBARS furniture (D-0985) n’appelle pas `hit_bars` — autre chemin (thump). Pas un oubli D-0990.

`harmless_missile` SCROLL_CLASS : tout scroll traverse (sauf always_hit). C identique. Un scroll kické à bout portant (`point_blank`) traverse les barreaux ; au-delà, 1/5 `!rn2(5)` force le hit et `hit_bars` → `hero_breaks` peut détruire le scroll. Keystream : `rn2(5)` puis éventuellement breaktest dans `hero_breaks`. JS même ordre.

POT_ACID : `hero_breaks` true → dissolve bars sauf W_NONDIGGABLE. `dissolve_bars` déjà dans hack.js (D-0985 vicinity). Si thin, acide « dissout » en message only.

`whodidit=0` launch : `hit_bars` sans BRK_BY_HERO → `breaks` pas `hero_breaks`, pas de hammer bar-break (your_fault false). C identique. Un boulder de trap ne casse les barreaux que si `breaks()` détruit le boulder (rare) ou acid. Whang + wake.

Cohort 7/8 : trop étroit pour `bhit` partagé. Un seed throw+bars dans le 7 aurait dû être nommé. Journal : « kick/throw cohort 7/8 (seed0009 Scr 72/73) » — le FAIL est seed0009, donc 7 PASS + seed0009. Le port barreaux n’a **aucun** FAIL nouveau. Soit aucune session ne frappe IRONBARS, soit le duplicata throwit/bhit n’a pas divergé sur le public. Cadence 43/44 inchangée vs #1255 : le mélange n’a même pas « servi » à observer un delta d’écran.

`m_throw` omit : si un monstre lance à travers des barreaux en public, le missile traverse encore. Named. Hors 43/44 apparent.

FORCEBUNGLE : import préexistant, pas un gate de ce peel.

## Verdict
- Verdict : PROCESS-SMELL
- Note : 6/10
- Si je ne devais retenir qu’une critique : le port `hits_bars` est C-fidèle (classe, `point_blank?!rn2(5)`, launch `!rn2(20)`), mais il est collé à un refresh #1260 — et `throwit→bhit` dans le D-log décrit un moteur que JS n’a pas.
