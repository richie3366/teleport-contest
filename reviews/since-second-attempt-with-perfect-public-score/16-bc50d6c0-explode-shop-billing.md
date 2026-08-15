# Review 16 — `bc50d6c0` — explode shop billing + do_break_wand explode-types (D-0949)

## Métadonnées
- Hash complet / court : `bc50d6c089cb5ce565de8a1f818a86edc76e6302` / `bc50d6c0`
- Parent : `3b2f75a4a08d868057aca477595b035d4f06820b`
- Auteur, date : Raphaël Hervier, 2026-07-21 23:06:46 +0200
- D-id : **D-0949**
- Stats : 9 files, +381 / −45
- Fichiers JS / map / cadence : `js/explode.js` +156, `js/apply.js` +210 (`do_break_wand`), `js/zap.js` export `zap_over_floor` ; pas de cadence suite (#1220)

## Intention vs livrable
Promet : `zap_over_floor` + `pay_for_damage` dans `explode` ; apply-break wands explode/inert pour facturer portes/barreaux. Livrable : préambule `olet` WAND/OIL/SCROLL/TRAP, `adtyp` %10, grille 3×3 `zap_over_floor`, pay trailing ; `doapply` WAND_CLASS → `do_break_wand`. Les types **adjacents** C (dig/create/strike/cancel/poly/tele/undead) sont volontairement skippés après un explode générique. Le sujet dit « explode-types », pas « tout `do_break_wand` ».

## Inventaire

| Fichier | Rôle |
|---|---|
| `js/explode.js` | Port C préambule + floor shop ; **dégâts non-PHYS skippés** |
| `js/zap.js` | Wiring : export `zap_over_floor` |
| `js/apply.js` | Port `do_break_wand` / `broken_wand_explode` / `discard_broken_wand` + wire `doapply` |
| map apply.js / zap.js | D-0949 ; adjacent + pickaxe encore ouverts |
| D-log | green+wizard/zap/shop 12/12 |

## Fidélité C ↔ JS

### `explode` préambule — C `explode.c:199-352` / JS `explode.js:301`
WAND_CLASS `type<0` : `type=-type`, `exploding_wand_typ=type` ; si `oc_dir==RAY` et **pas** DIGGING/SLEEP → `type -= WAN_MAGIC_MISSILE`, clamp 0..9 ; sinon `type=0`. JS copie. **WAN_SLEEP / DIGGING → blast magique générique (type 0), pas un case 3 sleep.** Correct vs C.

Role : C `Role_switch` cleric/monk/wizard `damu/=5` ; healer/knight `/=2`. JS `Role_if` + `Math.trunc`. **OK.** OIL→`POT_OIL`, SCROLL→`SCR_FIRE`, TRAP_EXPLODE `type=0`.

`adtyp` `abs(type)%10` : 0 MAGM, 1 FIRE (oil/scroll/fireball strings), 2 COLD, 4 DISN, 5 ELEC, 6 DRST, 7 ACID. **C `default`: `impossible` + `return` (pas d’explosion).** JS `default`: MAGM + continue. Case 3 (sleep zap) / 8 / 9 : C abort ; JS explose quand même puis skip dégâts (adtyp≠PHYS). **Diverge sur types impossibles / mal convertis.**

PHYS_EXPL_TYPE : `adtyp=AD_PHYS`. Gaz spore path historique préservé.

### Grille 3×3 et shop — C vs JS
C appelle `zap_over_floor` sur chaque case (sauf swallowed hero-caused). JS :

```
if (!(u.uswallow && !mon_moving))
    await zap_over_floor(xx, yy, type, shopdamage, false, exploding_wand_typ);
if (adtyp !== AD_PHYS) continue;  // combat skip
```

**Facture boutique (portes/barreaux) : oui**, via D-0948, y compris pour FIRE/COLD/DISN. **Dégâts monstre/héros fire/cold/death/lightning : non.** C les applique (résists, shield, `destroy_items`). D-log : « Deferred: non-PHYS mon/hero damage ». Honnête. Gameplay : casser une wand of fire **ne brûle pas** le héros en JS, mais peut facturer une porte.

C `uhurt` damage **quel que soit** `adtyp` (après resists). JS `if (uhurt && adtyp === AD_PHYS)`. Catch-in-explosion message skippé pour FIRE.

Pay C `explode.c:681-686` : FIRE burn away / COLD shatter / DISN disintegrate / else destroy. JS identique. **Pas de bras ACID « damage »** — C explode non plus (contrairement à `dobuzz`). **OK.**

`wake_nearto` : C `i=dam*dam` min 50 ; swallowed `i=(i+3)/4`. JS ajoute le bras engulfer. **OK.** Grabbed/grabbing double-damage C : omis (nommé dans le bandeau explode).

### `do_break_wand` — C `apply.c:3909` / JS `apply.js:1100`
Gardes : nohands, `freehand`, STR 5/10 fragile balsa/glass, paranoid yn, message snap/break. JS `yn_function(..., 'n')` vs C `paranoid_query(ParanoidBreakwand, ...)` — si le flag paranoid est on, C peut exiger un getlin ; JS reste yn. Nommé.

Unpaid : C `check_unpaid` **puis** `costly_alteration(COST_DSTROY)`. JS **skip `check_unpaid`**, alteration seule. Facture use-charge manquante.

`zappable` fail → nothing else + discard. Succès : `spe++` ; si `spe==0` `spe=rnd(3)`. JS copie. **RNG wrest.**

Switch explode-types C **return** après `broken_wand_explode` : DEATH/LIGHTNING `dmg*4` MAGICAL ; FIRE `*2` FIERY ; COLD `*2` FROSTY ; MISSILE `dmg` MAGICAL. JS identique via `explode(-(otyp), ...)`.

Inert : WISHING/NOTHING/LOCKING/PROBING/ENLIGHTENMENT/SECRET_DOOR/STASIS + OPENING sans ustuck → nothing else. OPENING **avec** ustuck : C `release_hold` ; JS **skip** (nommé) mais makeknown+discard quand même — héros **reste stuck**, wand partie.

**Types skippés (default JS vs C post-switch) :**
C STRIKING (message wall of force + `d(1+spe,6)` puis FALLTHROUGH), CANCELLATION, POLY, TELEPORT, UNDEAD_TURNING, DIGGING, CREATE_MONSTER, LIGHT, default : tombent **après** le switch sur `explode(..., rnd(dmg), WAND_CLASS, MAGICAL)` **puis** boucle adjacente (dig holes + `pay_for_damage("dig into")`, `makemon`, bhit cancel/poly/tele, `litroom`, etc.).

JS `default` : `explode(..., rnd(dmg), ...)` + discard, **pas** de boucle 8 directions. D-log le nomme. Conséquence :
- Wand of striking : explode magique **sans** « wall of force » ni `d(1+spe,6)` C.
- Wand of digging : explode (peut facturer une porte sous le héros) **sans** trous adjacents ni `pay_for_damage("dig into")`.
- Create monster / light : explode générique, pas `makemon` / `litroom`.

Ce n’est pas « types explode oubliés dans le switch DEATH/FIRE/… » — ces-là sont là. Ce sont les **autres** otyps C qui explosent **et** font un effet terrain.

`doapply` : WAND_CLASS avant tools. C `return do_break_wand(obj)` depuis apply wand. JS branche. Sans ça, apply wand restait « Sorry ».

## Constitution / playbook
Grep JS : RAS FORCE/fs/fastforward. Export `zap_over_floor` pour explode : 1:1 callers C. `freeinv_pie` : nom local bizarre, à vérifier = `freeinv` C (masquer la wand de `destroy_items`). `await yn_function` = input apply, pas un second nhgetch mouvement.

## Densité (§2b)
**Right size.** `explode` shop + le caller apply qui crée ces explose-wands. Adjacent dig/poly volontairement hors cluster. +210 apply +156 explode : dans la fourchette haute, un thème.

## Documentation
D-0949 « explode shop pay + do_break_wand explode-types » : le mot **explode-types** sauve du mensonge « full do_break_wand ». Deferrals adjacent + non-PHYS listés. Map `apply.js` nouvelle ligne. Overclaim faible sur « billed like C » : facture **porte/barreaux via zap_over_floor** oui ; facture **dig into** apply non ; HP explosion non-PHYS non.

CURRENT saute D-0948 dans le « do not re-break … D-0949 » (range 0660…0949) — OK.

## Vérification
Journal : green+wizard/zap/shop 12/12 ; fortress held sans cadence. Wizard-zap cohort peut casser une wand **inerte** ou missile ; peu probable fire-wand shop door + HP. Pas de preuve `Role_if` damu/5.

## `broken_wand_explode` / `discard_broken_wand`

C : `explode(u.ux,u.uy,-(obj->otyp), dmg, WAND_CLASS, expltype)` ; `makeknown` ; `discard_broken_wand`. JS même ordre. `discard` C : `delobj(current_wand)` + `nomul(0)`. JS comment « delobj current_wand + nomul(0) ». Si `freeinv_pie` a déjà retiré l’objet, `delobj` doit tolérer. C `freeinv` avant le switch, discard à la fin. Double extract = bug classique. Non montré dans le diff reviewé ligne à ligne ; à tester.

`gc.current_wand = obj` pour `destroy_items`. JS `game.current_wand`. Si `destroy_items` JS ignore ce champ (encore stub `explode.js`), RAS. C s’en sert pour ne pas détruire deux fois la wand.

## `doapply` position

C WAND_CLASS après getobj, avant beaucoup d’outils. JS commentaire « before tool cases ». Si un `otyp` wand tombait dans un `case` tool plus haut, never break. `getobj` filtre `WAND_CLASS` ? Non relu. Risque : apply wand jamais atteint vs « Sorry » d’avant.

## PHYS vs FIRE dans la même fonction

`mon_explodes` (gaz spore) reste PHYS : dégâts HP JS **vivent**. Break wand FIRE : même `explode()`, bras `adtyp!==PHYS continue`. Deux callers, deux fidélités. Un test « explode works » sur spore **ne prouve pas** fire wand.

`explmask` C : `explosionmask` resists. JS PHYS laisse 0 (EXPL_NONE). Non-PHYS : continue avant resist — **pas** de shield sparkle (nommé). Écrans « the blast » / sparkle absents.

## `inside_engulfer`

C skip les cases hors héros/engulfer. JS `else if (inside_engulfer) continue` **après** uhurt=2 sur u_at, **avant** zap_over_floor? Lire l’ordre JS : `u_at` → uhurt=2 ; `else if (inside_engulfer) continue` — **continue saute zap_over_floor** pour les cases non-héros. C : zap_over_floor unless `uswallow && !mon_moving` (toute la grille?). Commentaire JS « unless swallowed hero-caused blast » autour de zap : `if (!(uswallow && !mon_moving)) zap`. Swallowed : **aucune** case zappée. C `inside_engulfer` restreint les **cibles**, pas forcément zap. Divergence avaleur : portes boutique non billed pendant swallow (rare).

## Types explode **dans** le switch vs default

Portés (return after explode) : DEATH, LIGHTNING, FIRE, COLD, MAGIC_MISSILE, plus inerts NOTHING-like.

Default explode+discard : DIGGING, CREATE_MONSTER, STRIKING, CANCELLATION, POLYMORPH, TELEPORTATION, UNDEAD_TURNING, LIGHT, OPENING-unstuck déjà return inert, **et** tout otyp inconnu.

C STRIKING **ne return pas** dans le case FIRE-like ; il FALLTHROUGH vers affects_objects puis explode `rnd(dmg)` (pas `dmg*2`). JS default `rnd(dmg)` — **même formule explode** que C post-switch, **sans** le pline wall of force ni `dmg = d(1+spe,6)` qui **remplace** `spe*4` avant explode. C striking : `dmg` redevient `d(1+spe,6)` puis explode `rnd(dmg)`. JS striking : explode `rnd(spe*4)`. **RNG et amplitude faux** pour STRIKING.

## CURRENT range D-0949

`Do not re-break D-0660…D-0949` saute visuellement D-0948 dans un keep list mais le range l’inclut. OK.

## Risques / dette
1. **Non-PHYS : 0 dégât héro/monstre** alors que FIRE/COLD/DEATH explode-types sont « portés ».
2. **Adjacent skip** : digging `pay_for_damage("dig into")` C `apply.c:4138` toujours mort.
3. STRIKING sans wall-of-force / `d(1+spe,6)` — **et** `rnd(spe*4)` ≠ C `rnd(d(1+spe,6))`.
4. OPENING + ustuck sans `release_hold`.
5. `check_unpaid` omis ; paranoid_query → yn.
6. C `default` explode abort vs JS MAGM.
7. `bhit` shopdoor pay (D-0948) toujours mort.
8. `freeinv_pie` / `current_wand` double-delete.
9. Spore PHYS ≠ fire wand pour les tests.

## Extraots C explode / do_break_wand

Préambule wand C :

```224:241:nethack-c/upstream/src/explode.c
    if (olet == WAND_CLASS) {
        if (type < 0) {
            type = -type;
            exploding_wand_typ = (short) type;
            if (objects[type].oc_dir == RAY
                && type != WAN_DIGGING && type != WAN_SLEEP) {
                type -= WAN_MAGIC_MISSILE;
                if (type < 0 || type > 9) {
                    impossible("explode: wand has bad zap type (%d).", type);
                    type = 0;
                }
            } else
                type = 0;
        }
```

C `default` adtyp **abort** :

```346:348:nethack-c/upstream/src/explode.c
        default:
            impossible("explosion base type %d?", type);
            return;
```

Pay explode C (pas d’ACID « damage ») :

```681:686:nethack-c/upstream/src/explode.c
    if (shopdamage) {
        pay_for_damage((adtyp == AD_FIRE) ? "burn away"
                          : (adtyp == AD_COLD) ? "shatter"
                             : (adtyp == AD_DISN) ? "disintegrate"
                                : "destroy",
                       FALSE);
```

`do_break_wand` explode-types C :

```3995:4007:nethack-c/upstream/src/apply.c
    case WAN_DEATH:
    case WAN_LIGHTNING:
        broken_wand_explode(obj, dmg * 4, EXPL_MAGICAL);
        return ECMD_TIME;
    case WAN_FIRE:
        broken_wand_explode(obj, dmg * 2, EXPL_FIERY);
        return ECMD_TIME;
    case WAN_COLD:
        broken_wand_explode(obj, dmg * 2, EXPL_FROSTY);
        return ECMD_TIME;
    case WAN_MAGIC_MISSILE:
        broken_wand_explode(obj, dmg, EXPL_MAGICAL);
        return ECMD_TIME;
```

STRIKING C **avant** explode générique :

```4008:4023:nethack-c/upstream/src/apply.c
    case WAN_STRIKING:
        /* we want this before the explosion instead of at the very end */
        Soundeffect(se_wall_of_force, 65);
        pline("A wall of force smashes down around you!");
        dmg = d(1 + obj->spe, 6); /* normally 2d12 */
        FALLTHROUGH;
        /*FALLTHRU*/
    case WAN_CANCELLATION:
    case WAN_POLYMORPH:
    case WAN_TELEPORTATION:
    case WAN_UNDEAD_TURNING:
        affects_objects = TRUE;
        break;
    default:
        break;
    }
```

Au hash **16**, JS mettait STRIKING dans `default` : `explode(..., rnd(dmg), ...)` avec `dmg=spe*4`, **sans** wall of force. (HEAD plus tard a pu FALLTHROUGH STRIKING — hors périmètre de **ce** commit.)

Dig pay C après la boucle adjacente :

```4138:4138:nethack-c/upstream/src/apply.c
        pay_for_damage("dig into", FALSE);
```

JS D-0949 : non. `zap_over_floor` 3×3 peut quand même `add_damage` une **porte** sous/à côté du héros pendant l’explode magique default, puis `pay_for_damage("destroy")` via adtyp MAGM → string « destroy », **pas** « dig into ».

JS @bc50d6c0, après `zap_over_floor` : `if (adtyp !== AD_PHYS) continue` (HEAD a depuis élargi `combat_ok` — hors revue). Spore PHYS : HP. Fire wand au hash : floor bill, 0 HP.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note /10 : **7**
- Une phrase : le préambule wand→zaptype et le `zap_over_floor` 3×3 facturent enfin les portes, mais appeler ça « explode-types » pendant que `adtyp!==PHYS` `continue` avant tout HP, c’est une boutique branchée sur une explosion inoffensive.
