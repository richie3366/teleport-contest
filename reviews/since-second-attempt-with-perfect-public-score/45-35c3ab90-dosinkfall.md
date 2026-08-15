# Review 45 — `35c3ab90` — `dosinkfall`

## Métadonnées
- Hash complet / court : `35c3ab90795bcad23ba05271b9d0d6ee8647124e` / `35c3ab90`
- Parent : `d8ec1a673d70e60dc5cedfca292f45afb5091a40`
- Auteur, date : Raphaël Hervier, 2026-07-22 01:41:50 +0200
- D-id : D-0976
- Stats : 11 files, +321/−44 (JS : `hack.js` +123, `do_wear.js` +119,
  `pickup.js` +31)
- Fichiers JS / map / cadence : trois modules ; debt/turns ; archive
  journal ; pas de cadence

## Intention vs livrable
Porter `hack.c:dosinkfall` pour les atterrissages lévitation sur
évier, brancher `spoteffects`, miroir `ELevitation`, exporter
`stop_donning`. Le livrable match. Ce n’est **pas** `sit.c` (s’asseoir
sur sink) ni `do.c:dosinkring` (bague dans l’évier). Le C est bien
`hack.c` + caller `spoteffects`. Titre exact.

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/hack.js` | `dosinkfall` + helpers `is_weptool` / `selftouch` no-op |
| `js/pickup.js` | `spoteffects` : `IS_SINK && Levitation` → `dosinkfall` |
| `js/do_wear.js` | `ELevitation` confer ; `Ring_off` ; `stop_donning` / `donning` / `cancel_don` |
| map / D-LOG / CURRENT / NOTES | D-0976 ; sink-fall retiré du next |

## Fidélité C ↔ JS

### Caller `spoteffects`
- C `hack.c:spoteffects` (3311+) : recursion guard ; **`switch_terrain`**
  si typ a changé ; `pooleffects` ; `check_special_room` ; **puis**
  `if (IS_SINK && Levitation) dosinkfall()` ; **puis** si
  `!in_steed_dismounting` : éventuellement `rn2(2)` pour timeout
  lévitation d’1 tour, pickup/dotrap.
- JS `pickup.js:spoteffects` : `pooleffects` → `check_special_room` →
  sink+Lev → `in_steed_dismounting` return → traps. **Pas** de
  `switch_terrain`. **Pas** d’ajustement `HLevitation & TIMEOUT == 1`.
  Les deux sont nommés. Un ice→pool sous les pieds avant l’évier ne
  toggle pas Lev/Fly comme C.
- `Levitation_pe` : `(H\|\|E) && !B`, plus `u.Levitation` stale flag.
  C macro `Levitation` est uprops. Si `ELevitation` n’était pas
  mirroir (avant ce commit), le caller ne déclenchait jamais : d’où
  `confer_oc_oprop` LEVITATION.

### `dosinkfall` (C 836–919 / JS export)
Branches `ufall` :
C : `!innate_lev && !blockd_lev && !(HFlying || EFlying)` — **pas**
`BFlying`, **pas** la macro `Flying`.
JS : ajoute `|| u.Flying`. Si `u.Flying` est un cache de
`(H\|\|E)&&!B`, c’est redondant quand H/E sont set. S’il est stale
true sans H/E, JS **empêche** une chute que C ferait. Écart concret
sur le prédicat.

`!ufall` : wobble si innate|blocked, sinon « gain control of your
flight. » Fidèle.

`ufall` C (hack.c 859–886) :

```
ELevitation = HLevitation = 0L;
You("crash to the floor!");
dmg = rn1(8, 25 - (int) ACURR(A_CON));
losehp(Maybe_Half_Phys(dmg), fell_on_sink, NO_KILLER_PREFIX);
exercise(A_DEX, FALSE);
selftouch("Falling, you");
for (obj = svl.level.objects[u.ux][u.uy]; obj; obj = obj->nexthere)
    if (obj->oclass == WEAPON_CLASS || is_weptool(obj)) {
        You("fell on %s.", doname(obj));
        losehp(Maybe_Half_Phys(rnd(3)), ...);
        exercise(A_CON, FALSE);
    }
ELevitation = save_ELev;
HLevitation = save_HLev;
```

JS : même RNG `rn1` puis armes `rnd(3)` (Clang LTR : crash d’abord,
puis une `rnd(3)` par arme). Extra JS : `finish_maybe_wail` +
`finish_losehp_done` (contrat D-0255). Si mort au crash, JS return
**sans** restore E/H — C `done()` avec Lev fake-removed : même
intention disclosure. Un dague au sol **après** une mort crash n’est
pas évalué (C non plus : `done` ne revient pas).

`selftouch_sink` no-op (comme music). Nommé. Pas de RNG.

Puis : si `ufall \|\| lev_boots` → `stop_donning(lev_boots?uarmf:NULL)`
puis recalc `lev_boots`. Strip : `ELev &= ~W_ARTI` ; `HLev &=
~(I_SPECIAL|TIMEOUT)` ; `HLevitation++` ; Ring_off left/right
`RIN_LEVITATION` + `off_msg` ; `Boots_off` + `off_msg` ; `HLev--` ;
`float_vs_flight()`. Ordre C copié. Le `++` empêche `float_down`
mid-strip — comment JS explicite.

### `stop_donning` (C `do_wear.c` 1688–1727)
Scan invent `W_ARMOR && donning` ; `putting_on = !doffing` ;
`cancel_don` ; clear `afternmv` ; message ou silencieux ;
`unmul` ; si putting_on `remove_worn_item`. JS : `setworn(null, mask)`
au lieu de `remove_worn_item` (props via setworn). Accessory
`takeoff.what` arms différés — nommé. `result = -multi` **après**
`cancel_don` qui met `multi=0` → toujours 0 ; C a le même ordre
(`cancel_don` avant la lecture de `multi`). Pas un bug JS vs C.

`donning`/`doffing` : armor slots + `afternmv` `*_on`/`*_off` /
`takeoff.what`. Pas d’accessoires. Suffisant pour boots lévitation.

### `ELevitation` confer
Sans ça, porter une bague/bottes de lévitation ne set pas le champ
plat lu par `Levitation_pe`. C `youprop.h` ELevitation **est**
`uprops[LEVITATION].extrinsic`. Wiring nécessaire, pas du cosmétique.

**Écart concret :** C `spoteffects` (hack.c 3353–3373) **après**
`dosinkfall` :

```
if (trap && (HLevitation & TIMEOUT) == 1L
    && !(ELevitation || (HLevitation & ~(I_SPECIAL | TIMEOUT)))) {
    if (rn2(2)) { /* defer timeout */
        incr_itimeout(&HLevitation, 1L);
    } else { /* timeout early */
        if (float_down(I_SPECIAL | TIMEOUT, 0L)) {
            trap = 0;
            pick = FALSE;
        }
    }
}
```

JS `pickup.js:spoteffects` enchaîne sink → `in_steed_dismounting` →
traps **sans** ce `rn2(2)`. Keystream si un piège est sur l’évier
le tour où `HLevitation&TIMEOUT==1`. Ce n’est pas dans `dosinkfall`
lui-même — c’est le voisin immédiat du caller, le seul RNG du
voisinage. `switch_terrain` (hack.c 3345–3347) est l’autre omission
du même caller : ice→pool sous les pieds avant l’évier ne toggle
pas Lev/Fly.

`ufall` C **exclut** explicitement `BFlying` (commentaire « BFlying »
ligne 850) : seuls `HFlying || EFlying` bloquent la chute. JS
`|| u.Flying` est un cache extra. Si `u.Flying` reste true après
un `BFlying` set, JS **empêche** une chute que C ferait. Inversement,
si le cache est false alors que H/E Flying sont set, JS chute et C
non — moins probable si confer Flying est mirroir comme Lev.

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/fs/node/fastforward/coords. Rule #2 RAS.
`await import` do_wear/end/objnam/polyself : cycles, pas fs.
`stop_donning` n’introduit pas d’input. Frozen RAS.

## Densité (§2b)
Right size. Une fonction C + caller `spoteffects` + callees wear
(`stop_donning`, `Ring_off`, confer). Trois fichiers qui
s’appellent déjà. ~270 LOC JS. Pas un peel `if (IS_SINK)` orphelin.

## Documentation
D-0976 deferred : selftouch petrify ; Boots_off float_down side-effect
(le bracket HLev++ est censé le masquer) ; `switch_terrain` / timeout
Lev dans spoteffects. turns.md : sink dans le blob hack/pickup.
debt eat.js « sink-fall death » n’est **pas** retiré (ligne eat
encore « sink-fall death ») — petite incohérence map : le cluster
est dans hack, la row eat traîne.

## Vérification
green+strict ; move/wear cohort **36/37** (seed0009). Pas de seed
« lev boots onto sink » cité. Preuve anti-régression, pas de canary
évier. `rn2` timeout Lev non exercé (absent). Le cohort wear exerce
`Ring_off` / `Boots_off` génériques, pas forcément `RIN_LEVITATION`
sur un `IS_SINK`. `confer_oc_oprop` LEVITATION est le vrai prérequis
pour que le caller fire — sans lui, `Levitation_pe` restait faux
même avec bagues portées.

## Risques / dette
1. **`rn2(2)` timeout Lev sauté** dans `spoteffects` — RNG si trap+sink
   le dernier tour de lévitation.
2. `switch_terrain` absent.
3. `selftouch` no-op.
4. Prédicat `u.Flying` extra.
5. `remove_worn_item` vs `setworn` — props annexes boots.
6. debt `eat.js` « sink-fall death » stale.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7.5/10**
- Si je ne devais retenir qu’une critique : `dosinkfall` lui-même
  suit C (save Lev, `rn1` crash, armes `rnd(3)`, bracket `HLev++`,
  Ring/Boots_off), mais le caller `spoteffects` omet le `rn2`
  d’ajustement de timeout — le seul RNG du voisinage immédiat.
