# Review 36 — `4a95b850` — bury / unearth / `obj_ice_effects` (D-0967)

## Métadonnées
- Hash complet / court : `4a95b850b381512e4f6f234092f6bde8065dcbf2` / `4a95b850`
- Parent : `3f9081eb2a0e6740aec03a2aa6367f494b80426d`
- Auteur, date : Raphaël Hervier, 2026-07-22T00:46:18+02:00
- D-id : **D-0967**
- Stats : 9 files, +311/−55
- Fichiers JS / map / cadence : `js/dig.js` (+146), `js/mkobj.js` (+108), `js/zap.js` (+35) ; `docs/c-js-map/debt.md` ; pas de cadence

## Intention vs livrable
Promet de câbler l’enterrement C `dig.c`/`mkobj.c` dans `melt_ice`, cold `zap_over_floor`, et `liquid_flow` — timers cadavre glacé + piles buried.

C’est le **follow-on nommé de D-0965** (omit bury/unearth/obj_ice). Le diff porte `obj_timer_checks` / `obj_ice_effects` / `peek_at_iced_corpse_age`, hooks `place_object`/`obj_extract_self` FLOOR, `bury_an_obj`/`bury_objs`/`unearth_objs`/`rot_organic`, et le wiring zap/dig. Pas de cadence mêlée. D-id présent. Titre aligné.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/dig.js` | Port C : `bury_an_obj`, `bury_objs`, `unearth_objs`, `rot_organic` ; wiring `liquid_flow` |
| `js/mkobj.js` | Port C : `obj_timer_checks`, `obj_ice_effects`, `peek_at_iced_corpse_age` ; `ROT_ORGANIC` dans `run_timers` ; hooks place/extract |
| `js/zap.js` | Wiring : `melt_ice` ice-off + unearth ; COLD freeze `bury_objs` + `obj_ice_effects(..., true)` |
| map / D-log | Retire bury/unearth/obj_ice de D-0965 ; deferrals shop/ball/`end_burn` |

## Fidélité C ↔ JS

### `obj_timer_checks` — `mkobj.c:2440` → `js/mkobj.js`
C `ROT_ICE_ADJUSTMENT=2`. Bras on-ice : `stop_timer(ROT_CORPSE)` puis si 0 `REVIVE_MON` ; si `tleft` : `on_ice=1`, `tleft*=2`, `age=moves-otmp->age`, `otmp->age=moves-(age*2)`, restart. Bras off-ice (`force<0` ou `on_ice` et plus sur glace) : stop même ordre, `on_ice=0`, `tleft/=2`, `age+=(age*(2-1)/2)`.

JS : `ROT_ICE_ADJUSTMENT=2` ; même stop ROT puis REVIVE ; on-ice `tleft*=2` et `age=moves-(age*2)` ; off-ice `tleft=(tleft/2)|0` et `age += ((age*1)/2)|0`. Division entière C vs `|0` JS — **même arithmétique** pour positifs. **Confirmation** des deux bras + ordre des `stop_timer` (RNG-free mais ordre de queue).

`on_floor = where==OBJ_FLOOR` ; `buried = where==OBJ_BURIED`. Après extract FLOOR, `where` est FREE donc le bras off-ice se déclenche — C `remove_object` appelle `obj_timer_checks` **après** extract (where déjà FREE). JS `wasTimed` puis checks : **même timing**.

### `obj_ice_effects` / `peek_at_iced_corpse_age` — `mkobj.c:2397` / `2423`
C : floor `nexthere` timed → checks ; si `do_buried`, buriedobjlist `ox/oy` match. Peek : `age += age*(2-1)/2` si CORPSE `on_ice`.

JS identique, peek `|0`. **Confirmation.** Callers : `melt_ice(..., false)` ; freeze `(..., true)` ; `liquid_flow`.

### `place_object` / extract FLOOR
C `place_object` : si timed, `obj_timer_checks(otmp,x,y,0)` (on-ice stretch). C `remove_object` : extract puis checks. JS câble les deux. **Callers branchés** pour tout drop/pickup floor, pas seulement melt — densité réelle.

### `bury_an_obj` — `dig.c:1984` → `js/dig.js`
**Porté, ordre C :**
1. `uball` : `unpunish` ; `set_utrap(rn1(50,20), TT_BURIEDBALL)` ; pline. **RNG `rn1(50,20)` au même point.**
2. Sauve `nexthere` **après** unpunish (C commentaire chain dealloc).
3. `uchain` **ou** `obj_resists(otmp,0,0)` → return (Rider/Amulet). **RNG resists(0,0)** présent.
4. LEASH : C `o_unleash` ; JS inlined `mleashed=0` / `leashmon=0` — plus mince (pas de `unleash_all` side).
5. lamplit && !POT_OIL : C `end_burn(otmp,TRUE)` ; JS `lamplit=0` seulement — **named omit**.
6. `obj_extract_self`.
7. ROCK (!ice) ou BOULDER → merge/obfree, `dealloced=TRUE`. JS `quan=0`/`where=FREE` sans `obfree` contents — OK pour rock/boulder typiques.
8. CORPSE : no-op (C TODO cancel timer under ice — JS recopie le TODO C).
9. sinon `(under_ice ? POTION : is_organic) && !obj_resists(5,95)` → `start_timer((ice?0:250)+rnd(250), ROT_ORGANIC)`. **RNG `rnd(250)` + `obj_resists(5,95)` ordre C.**
10. `add_to_buried`.

**Confirmation branch-par-branch** hors `end_burn` / `o_unleash`.

### `bury_objs` — `dig.c:2050`
C : si shop `costly_spot` et `!mon_moving`, `stolen_value` + `no_charge` **avant** `bury_an_obj` ; `del_engr` ; `newsym` ; `maybe_unhide_at` ; pline owe.

JS : boucle `bury_an_obj` seulement ; skip stolen_value / maybe_unhide. **RNG shop sauté** si bury en boutique (hero). Nommé. Hors boutique, identique.

### `unearth_objs` — `dig.c:2086`
C : `buried_ball` + si `utrap==TT_BURIEDBALL` → `buried_ball_to_punishment` ; sinon extract, `stop_timer(ROT_ORGANIC)`, `place_object`, `stackobj`.

JS : skip ball arm (nommé) ; extract + stop ROT_ORGANIC + place + stack. **Confirmation** du chemin pile. Melt ice n’applique donc pas encore buried-ball punishment.

### `rot_organic` — `dig.c:2125`
C : while contents → bury child ; extract+obfree container. JS : while `cobj` → `bury_an_obj` ; extract + free flags. **Callers :** `run_timers` ROT_ORGANIC (mkobj). **Confirmation** re-bury contents (peut `rn1`/`rnd`/`resists` via `bury_an_obj`).

### Wiring `melt_ice` / COLD / `liquid_flow`
C `melt_ice` : `obj_ice_effects(x,y,FALSE)` puis `unearth_objs`. JS D-0965 les sautait ; D-0967 les ajoute **dans cet ordre**. COLD freeze : C `bury_objs` puis plus loin `obj_ice_effects(..., TRUE)`. JS `await bury_objs` puis `obj_ice_effects(..., true)`. C `liquid_flow` : ice effects + unearth. JS header : même ordre. **Confirmation callers.** `trap_ice_effects` toujours sauté (D-log).

### `obj_timer_checks` — formules
C on-ice :

```c
            tleft *= ROT_ICE_ADJUSTMENT;
            age = svm.moves - otmp->age;
            otmp->age = svm.moves - (age * ROT_ICE_ADJUSTMENT);
```

C off-ice :

```c
            tleft /= ROT_ICE_ADJUSTMENT;
            age = svm.moves - otmp->age;
            otmp->age += age * (ROT_ICE_ADJUSTMENT - 1) / ROT_ICE_ADJUSTMENT;
```

JS off-ice utilise `|0` après `/`. Pour `tleft` pair (toujours après ×2 on-ice) la division est exacte. Peek :

```c
        retval += age * (ROT_ICE_ADJUSTMENT - 1) / ROT_ICE_ADJUSTMENT;
```

JS `|0` analogue. **Pas de `rn2` ici** — fidélité = arithmétique entière + ordre stop ROT puis REVIVE. Si REVIVE_MON n’est pas encore un callback réel (`run_timers` no-op drop sauf ROT_ORGANIC/MELT), un cadavre troll sur glace peut avoir son timer stretché puis **silencieusement droppé** à l’échéance. Dette timer préexistante, pas introduite par les formules.

### `liquid_flow` — `dig.c:861`
C après terrain pool/moat/lava : `delfloortrap` ; `obj_ice_effects` + `unearth_objs` ; fillmsg ; `fire_damage_chain` / `water_damage_chain` sur les objets relâchés ; hero `pooleffects` ; mon `minliquid`.

JS D-0967 header : delfloortrap ; ice + unearth ; fillmsg ; minliquid. **Sauté :** damage_chain (feu/eau sur loot déterré) — named. Un melt qui déterre une potion dans de la lave ne la fait pas exploser. Ordre ice **puis** unearth = C `melt_ice` / `liquid_flow`. **Confirmation d’ordre**, pas de completeness loot.

### `place_object` timed
Tout drop au sol passe maintenant `obj_timer_checks`. Un cadavre posé sur ICE stretch ×2 même hors zap. C `place_object` idem. Ce n’est pas un wiring « melt only » — densité caller réelle. Extract FLOOR inverse (off-ice). Buried extract D-0964 n’appelle **pas** les ice checks (C non plus : buried ice va via `obj_ice_effects(..., TRUE)`).

### `is_ice` dupliqué
`zap.js` (D-0965), `dig.js`/`mkobj.js` (D-0967) recopient `is_ice`. Si l’un oublie DRAWBRIDGE `DB_ICE`, bury et melt divergent. Au hash, DRAWBRIDGE est dans zap `is_ice` ; vérifier que dig/mkobj ont le même bras. Smell 1:1 modules, pas un seed hardcodé.

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/traces/fs/node:/fastforward. Frozen non touchés. Rule #2 OK. `bury_an_obj` async via pline ball — await déjà gameplay. `is_ice` dupliqué zap/dig/mkobj — smell structurel, pas un hardcode seed. **RAS** constitution.

## Densité (§2b)
Right size. Follow-on D-0965 : une famille ice burial + timers + 3 callers. 146+108+35. Pas too-small (pas un seul `if bury`). Pas too-big (pas explode/pray).

## Documentation
D-0967 « fixed » pour bury/unearth/obj_ice wiring — **vrai**. Deferrals shop bill, buried_ball, trap_ice, end_burn, fire/water_damage_chain, lavawall, explode AD_FIRE. `debt.md` retire le bullet D-0965. CURRENT/NOTES next explode FIRE. Honnête.

## Vérification
Journal : green+strict ; dig/zap **16/16**. Cohorte pertinente (dig + zap ice). Pas de cadence 44/44 dans ce hash. Fortress affirmation. #1270 plus tard hors scope.

Les 16 sessions dig/zap touchent-elles `bury_objs` boutique ? Probablement non — `stolen_value` sauté reste invisible. `rn1(50,20)` uball bury : besoin d’un héros Punished sur glace qui fond. Rare. Vert ≠ bury complete.

## `run_timers` ROT_ORGANIC
D-0965 : MELT_ICE_AWAY. D-0967 : `else if ROT_ORGANIC → rot_organic`. Un timer organique buried qui venait à échéance était **droppé** (no-op) entre 0965 et 0967 ; maintenant il détruit + re-bury contents. **Changement keystream** si un freeze avait déjà queue `rnd(250)` pendant D-0965 (freeze sans bury — pas de timer) vs D-0967 (freeze avec bury+timer). Ordre des peels correct : freeze sans bury n’avait pas ces timers ; les ajouter ensemble évite une fenêtre « timer sans bury ».

`obj_resists(5,95)` : deux seuils C. Si JS `obj_resists` ignore les args, plus ou moins d’organics rot. Préexistant mkobj, pas introduit ici — mais **nouveau caller** donc nouveau RNG.

## Risques / dette
1. Shop `stolen_value` sauté — RNG/or si bury en boutique.
2. `buried_ball_to_punishment` sauté.
3. `end_burn` → `lamplit=0`.
4. `trap_ice_effects` encore omit.
5. `o_unleash` inlined mince.
6. ROCK/BOULDER sans `obfree` profond.
7. `maybe_unhide_at` / damage_chain liquid_flow.


## `add_to_buried` / `buriedobjlist`
C `add_to_buried` pose `where=OBJ_BURIED`, chain `nobj` sur `buriedobjlist`, garde `ox,oy`. JS doit matcher sinon `unearth_objs` filtre `ox==x && oy==y` rate. Si `add_to_buried` JS oublie `where`, extract buried D-0964 et unearth se marchent dessus. Caller `bury_an_obj` fin — **branche obligatoire**. Non relu `add_to_buried` corps (préexistant ?) : si D-0967 l’introduit, c’est du port ; si stub, bury no-op.

`del_engr_at` bury et unearth : C toujours. JS appelé. Gravure sur glace qui fond disparaît comme C.

`stackobj` après `place_object` unearth : fusion piles. C idem. `place_object` déclenche `obj_timer_checks` (off-ice stretch inverse) **puis** stack. Un cadavre déterré reprend un timer ROT court. **Ordre C.**

## ROCK merge
C `obfree` rock/boulder burying material. JS `quan=0; where=FREE; timed=0` sans libérer `cobj`. Un boulder statue-like avec contents (rare) fuirait. Wizard `#wizbury` C commente boulder removal. Acceptable named-thin.

CORPSE sous glace : C `; /* should cancel timer if under_ice */` — TODO **dans le C amont**. JS recopie le TODO. Ne pas blâmer le port pour un C inachevé. `obj_ice_effects` stretch gère le timer si `timed` déjà.

## `liquid_flow` fillmsg
Hors RNG. `pooleffects` hero deferred — héros qui creuse vers une pool peut ne pas se noyer au même tick. D-log fire/water_damage_chain. Qualité : drowning caller, pas ice timer.



## `peek_at_iced_corpse_age` callers
C utilisé par revive/age checks sans stop/restart timer. JS export. Callers JS `revive` / `obj_age` ? Si D-0967 exporte sans caller, peek est mort jusqu’au prochain peel. `git show` mkobj : fonction + place/extract hooks. Peek peut attendre un caller revive oeaten. Densité : bundle ice helpers C `mkobj.c` collés — acceptable même si peek 0 caller immédiat.

`force` arg `obj_timer_checks` : C `<0` force off ice, `>0` force on. JS default 0. Callers melt/place passent 0. Un force≠0 C (rare) non branché. Named-thin.

## `is_ice` DRAWBRIDGE
Si dig.js `is_ice` ignore DB_ICE, `bury_an_obj` `under_ice` faux sur pont glacé → ROCK merge au lieu de bury, potion rot 250+rnd au lieu de 0+rnd. zap.js `is_ice` a le bras DB. **Écart inter-modules** possible. À unifier.

`Has_contents` rot_organic : C `while (Has_contents(obj))` bury `cobj`. JS `child = obj.cobj` loop. Si `cobj` n’est pas extrait du container par `bury_an_obj` (`obj_extract_self`), boucle infinie. `bury_an_obj` extract_self — **doit** détacher. Test : sac buried qui rot. Vert 16/16 peut ne pas l’exercer.



## Wiring zap trois points
1. `melt_ice` : `obj_ice_effects(x,y,false)` puis `unearth_objs` — C `zap.c:5057-5058`.
2. COLD freeze : `await bury_objs` puis `obj_ice_effects(..., true)` — C `zap.c:5277` bury, ice effects plus bas ~5320.
3. `liquid_flow` : ice + unearth — C `dig.c:861-862`.

Trois callers, une famille. **Pas** un melt-only. `trap_ice_effects` quatrième caller C `melt_ice` toujours sauté — traps on ice (ice trap?) ne se convertissent pas. Named.

`spot_stop_timers` avant ice effects : C melt stop timer **puis** obj_ice **puis** unearth. JS D-0965 avait stop+terrain ; D-0967 insère ice/unearth après stop. **Ordre C restauré.**

## `obj_extract_self` FLOOR `wasTimed`
JS sauve `timed` avant extract (where FREE). C `remove_object` checks après extract. Bras off-ice : `on_ice && !(floor||buried && is_ice)`. where FREE ⇒ pas floor ⇒ off-ice branch si `on_ice`. Cadavre ramassé depuis glace : age catch-up. **Confirmation.** Buried extract D-0964 **sans** checks — C buried n’utilise pas `remove_object`. OK.

`start_timer` ROT_ORGANIC kind TIMER_OBJECT. Duplicate abort même obj+action. Re-bury contents rot_organic peut reposer un timer. C idem.


## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **8/10**
- Si je ne devais retenir qu’une critique : c’est le bon palier D-0965→D-0967 (`rn1(50,20)`, `rnd(250)`, `obj_resists(5,95)`, stretch ×2), pas un melt « complete » — shop bill et buried-ball restent des trous RNG/sémantiques nommés.
