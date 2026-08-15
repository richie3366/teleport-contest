# Review 47 — `ef29ee55` — `ignite_items` / `catch_lit` / `begin_burn` / `burn_away_slime`

## Métadonnées
- Hash complet / court : `ef29ee55a1403d4d1bac8d140881ae5f75ba3e43` / `ef29ee55`
- Parent : `10b05acba460b956e2f8e65e193d7c20243e3ec1`
- Auteur, date : Raphaël Hervier, 2026-07-22 01:58:52 +0200
- D-id : D-0978
- Stats : 15 files, +707/−85 (JS : `timeout.js` +481, plus apply /
  explode / light / mkobj / trap / zap)
- Fichiers JS / map / cadence : **trop de modules** pour §2b ;
  rotation journal #1248 ; pas de cadence

## Intention vs livrable
Porter le pipeline feu→lumière : `ignite_items` → `catch_lit` →
`begin_burn` + timer `BURN_OBJECT` + `LS_OBJECT`, et `burn_away_slime`.
Le diff le fait **et** câble explode/zhitm/zhitu/zapyourself/fire-trap/
`burn_floor_objects`. C’est un vrai cluster sémantique (timeout burn),
mais 15 fichiers / +707 LOC dépassent la cible playbook **50–300**.
Question « TOO BIG ? » : **oui**, même si les pièces s’appellent.

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/timeout.js` | `burn_away_slime`, `begin_burn`, `end_burn`, `burn_object`, helpers light/age |
| `js/apply.js` | `catch_lit` |
| `js/trap.js` | `ignite_items` + wire fire-trap |
| `js/explode.js` | await ignite + `burn_away_slime` hero FIRE |
| `js/zap.js` | ignite réel ; slime zhitu/zapyourself ; `burn_floor` ignite |
| `js/light.js` | `LS_OBJECT` dans `do_light_sources` (carré, pas `circle_ptr`) |
| `js/mkobj.js` | `BURN_OBJECT` `run_timers` + `stop_timer` cleanup_burn |
| docs | D-0978 |

## Fidélité C ↔ JS

### `burn_away_slime` (C `timeout.c` 448–453)
C : `if (Slimed) make_slimed(0L, "The slime…burned away!");`
JS : `u.Slimed` + `make_slimed(0, même texte)`. Pas de RNG. Callers
branchés : explode FIRE, `dofiretrap`, `zhitu` ZT_FIRE, `zapyourself`
FIRE_HORN. C a d’autres callers (mhitu, potion, mcastu, read, muse,
trap lava…) **non** tous câblés — envelope « fire hits already in
JS ». Nommé partiellement (pas la liste callers manquants).

### `ignite_items` (C `trap.c` 7161–7172)
C : `bynexthere = (objchn && where==OBJ_FLOOR)` ; boucle
`nexthere` vs `nobj` ; si `!lamplit && !in_use` → `catch_lit`.
JS : si `Array.isArray` (invent héro) copie et itère ; sinon même
bynexthere. Nécessaire (JS invent = array). `catch_lit` async : ordre
des `rn2(2)` cursed lamp = ordre de chaîne. C synchrone. OK si pas
d’entrelacement.

### `catch_lit` (C `apply.c` 1577–1624)
Gardes C : `!lamplit && ignitable && get_obj_location(..., 0)` ;
reject MAGIC_LAMP/candelabrum `spe==0`, `age_is_relative && age==0`,
`BRASS_LANTERN` ; candelabrum cursed ; OIL/MAGIC lamp cursed `!rn2(2)`
**RNG**. Pline `Yname2` + otense feel/catch ; POT_OIL `makeknown` ;
shop unpaid/verbalize/bill **sautés** (nommés) ; `begin_burn(FALSE)`.
JS : mêmes gardes + `rn2(2)` ; nom invent « Your » maison vs C
`Yname2` ; `set_msg_xy` différé. `ignitable` JS exige MAGIC_LAMP
`spe>0` **et** catch_lit reteste spe==0 — double porte, OK.

### `begin_burn` (C 1712–1797)
Early return `age==0 && otyp!=MAGIC_LAMP && !artifact_light`.
Switch C timeout.c 1743–1794 : MAGIC_LAMP no timer ; POT_OIL

```
turns = obj->age;
if (obj->odiluted)
    turns = (3L * turns + 2L) / 4L;
radius = 1;
```

JS : `Math.trunc((3 * turns + 2) / 4)` — **fidèle**, pas un `* 3/4`
flottant. Lantern/lamp paliers 150/100/50/25 (`age > 150` →
`age-150`, etc.) ; candles 75/15 + `candle_light_range` ; default
artifact `arti_light_radius` sinon `impossible` + `turns = age`.
Timer : `start_timer(turns, TIMER_OBJECT, BURN_OBJECT)` → lamplit,
`age -= turns`. Light : `get_obj_location(CONTAINED_TOO|BURIED_TOO)`
+ `new_light_source`. JS copie les paliers (`>` identiques).
`update_inventory` différé. Pas d’`impossible` sur otyp inattendu →
`turns = age` quand même (même fallback C dans le `else` artifact).

### `burn_object` (C 1383+, ~300 lignes)
JS porte : timeout-away catch-up (age vs how_long, menorah spe=0,
candle/oil extract+delobj) ; paliers lantern/lamp 150/100/50/25/0
messages invent/floor/minvent ; candles 75/15/0 + hallu shriek ;
POT_OIL burn-out. **Sauté vs C :** `maybe_unhide_at` (nommé) ;
`need_invupdate` / `update_inventory` ; certains bras minvent
lantern age==25 ; `obfree` vs `delobj` ; migrating edge cases.
`useupall_burn` splice invent à la main — pas `useupall` C
(timers/where/shop). Risque invent corrompu.

### `end_burn` / `stop_timer` cleanup
C `end_burn` : `!lamplit` → `impossible`. JS return silencieux.
MAGIC_LAMP / artifact → pas de timer. `stop_timer(BURN_OBJECT)` JS
restaure `age += expire-moves`, `del_light_source`, `lamplit=0` —
équivalent `cleanup_burn` mince.

### `do_light_sources` LS_OBJECT
C light.c 213–224 : `limits = circle_ptr(ls->range)` puis
`offset = limits[abs(y - ls->y)]` — un **disque** (moins large aux
coins). JS light.js : `const offset = range` (commentaire
« Approximate circle as square of side 2*range »). Une lampe
éclaire un **carré** trop large aux coins (dx=range, dy=range).
Vision, pas RNG direct, mais glyphes `TEMP_LIT` et donc screens.
C min_x clamp à **1** (colonne 0 inutilisée). JS light.js 127–128 :
`if (min_x < 1) min_x = 1` — **même clamp**. L’écart n’est que le
carré vs disque, pas la colonne 0.

C `catch_lit` shop (apply.c 1606–1618) : `check_unpaid` +
`verbalize` + `bill_dummy_object` **avant** `begin_burn`. JS sauté
(nommé). Pas de `rn2` dans ce bras shop ; le seul RNG catch_lit
est `cursed && !rn2(2)` sur OIL/MAGIC_LAMP — JS **l’a**. Une lampe
maudite dans un shop s’allume (ou pas) avec le bon bit, mais sans
facture.

### Wiring
`burn_floor_objects` finit par `await ignite_items(objects_at)` —
C aussi en fin de fonction. `dofiretrap` : losehp → slime →
`burnarmor||rn2(3)` destroy+ignite → burn_floor. Ordre C 4304–4313
**copié** (slime avant burnarmor). `zhitu` FIRE : slime puis
burnarmor puis `!rn2(3)` destroy **et** `!rn2(3)` ignite séparés —
C zhitm/zhitu ont des `rn2(3)` distincts ; JS les garde. Clang LTR
préservé.

**Écart concret pipeline :** `catch_lit` shop bill absent (RNG unpaid
non consommé si C `check_unpaid` n’en a pas… `check_unpaid` peut
être sans RNG ; `rn2` cursed lamp **est** là). Lumière = carré.

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/fs/node/fastforward. Rule #2 RAS.
Frozen RAS. `catch_lit` dans apply + timeout import dynamique :
cycle apply↔timeout, pas fs. `await` = plines burn_object / catch_lit
— pas un `nhgetch` extra. 1:1 brisé : `catch_lit` vit dans
`apply.js` (C aussi apply.c) ; `ignite_items` dans `trap.js` (C
trap.c) ; `begin_burn` timeout.js (C timeout.c). Acceptable.
`do_light_sources` approximation n’est pas un hardcode de seed.

## Densité (§2b)
**Too big.** Playbook : une famille caller/callee, ~50–300 LOC, un
module ou deux déjà liés. Ici : timeout **et** light **et** mkobj
timers **et** apply catch **et** trap ignite **et** cinq callers zap/
explode. Une théorie (« le feu allume les lampes et brûle le slime »)
mais **deux** sous-systèmes visuels (LS_OBJECT circle) + timer
engine + messages burn_object complets. Ça aurait dû être au moins
(1) begin_burn/timer/light (2) catch_lit/ignite + callers (3)
burn_object messages. +707 = 2× le plafond.

## Documentation
D-0978 « fixed » + named omit : shop catch_lit, `set_msg_xy`,
`update_inventory`, `maybe_unhide_at`, circle_ptr. Honnête sur les
trous **internes**, pas sur la densité. CURRENT next : release_hold /
flash_hits. turns.md timeout/trap/zap mis à jour. Overclaim
« complete burn pipeline » : le D-log dit retirement map, pas
« complete timeout.c ». `burn_object` n’est pas marqué partial dans
l’index.

## Vérification
green+strict ; zap/trap/lamp cohort **25/26** (0009). « lamp » dans
le nom de cohorte — meilleur que les commits voisins, mais 26 seeds
ne prouvent pas un `rn2(2)` cursed oil lamp ni un timer age==150.
Pas de cadence. `run_timers` BURN_OBJECT : besoin d’un objet allumé
qui expire pendant la session — non cité. Wiring `dofiretrap` slime
**avant** burnarmor est le seul ordre RNG feu-trap que la cohorte
trap **pourrait** exercer si un héro marche sur un fire trap Slimed
— non dit. Le +707 rend le bisect d’un FAIL écran (vision carrée)
impossible sans stash partiel.

## Risques / dette
1. **Densité** — bisect / revert / revue impossibles à grain fin.
2. **LS_OBJECT carré ≠ circle_ptr** — screens vision.
3. `useupall_burn` invent splice.
4. Callers C slime/ignite non branchés (combat mhitu, potions, lava).
5. Shop `catch_lit` unpaid.
6. `burn_object` subset messages / migrating.
7. Cycles d’import dynamiques (timeout↔mkobj↔zap↔trap↔apply).

## Verdict
- Verdict : **QUALITY-RISK**
- Note : **6.5/10**
- Si je ne devais retenir qu’une critique : le pipeline
  ignite→catch_lit→begin_burn est C sur les paliers d’âge et le
  `rn2(2)` cursed lamp, mais le commit avale light+timers+tous les
  callers (+707) et éclaire encore au carré — trop gros pour §2b,
  incomplet pour `timeout.c`.
