# Review 50 — `652a6627` — Opening-trap unlock + SPE_KNOCK hurtle/saddle

## Métadonnées
- Hash complet / court : `652a66274c27c9b9d78de5cbd9fa176b31d09c8c` / `652a6627`
- Parent : `835f5ad93860daf834d440dff479992b62d002ad`
- Auteur, date : Raphaël Hervier, 2026-07-22 02:23:17 +0200
- D-id : **D-0981**
- Stats : 12 files, +638/−68
- Fichiers JS / map / cadence : `js/trap.js`, `js/lock.js`, `js/dothrow.js`, `js/uhitm.js`, `js/zap.js` ; `docs/c-js-map/debt.md` ; CURRENT / NOTES / D-log ; journal #1251 (pas de cadence)

## Intention vs livrable
Le message retire le deferral D-0979 : `openholdingtrap` / `openfallingtrap`, `boxlock` inventaire, Punished `unpunish`, `mhurtle` SPE_KNOCK, drop de selle WAN_OPENING. Le diff **fait** ces cinq bras, plus `reward_untrap` et `m_is_steadfast`. Titre un peu large (« opening-trap unlock ») mais le corps liste le cluster. Pas de D-id manquant. Pas de cadence mélangée.

Largeur : cinq modules (trap, lock, zap, dothrow, uhitm). C’est la famille caller/callee WAN_OPENING/SPE_KNOCK, pas trois sous-systèmes sans lien. **Large mais lié.**

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/trap.js` | Port C `reward_untrap` / `openholdingtrap` / `openfallingtrap` |
| `js/lock.js` | Port C `boxlock` + `boxlock_invent` (C : `zap.c`) |
| `js/dothrow.js` | Port C `will_hurtle` / `mhurtle_step` / `mhurtle` |
| `js/uhitm.js` | Port C `m_is_steadfast` |
| `js/zap.js` | Wiring `bhitm` / `zapyourself` WAN_OPENING/SPE_KNOCK |
| `docs/c-js-map/debt.md` | D-0981 porté ; reste montraits / stolen_value |

## Fidélité C ↔ JS

### `openholdingtrap` / `openfallingtrap` / `reward_untrap`
**C :** `trap.c:6101`, `6252`, `5530`. **JS :** `js/trap.js` (exports async, `{happened,noticed}` au lieu de `boolean *noticed`).

Branches portées : dummy trap si `utrap` sans `t_at` ; switch `TT_LAVA`/`INFLOOR`/`BURIEDBALL`/`BEARTRAP`/`PIT`/`WEB` ; article `the`/`your`/`a`/`an` ; reset_utrap + vision_recalc ; mon `mtrapped=0` ; `rn2(2) && m_next2u` → `reward_untrap`. `openfallingtrap` : filtre TRAPDOOR/ROCKTRAP vs HOLE/pit selon `trapdoor_only` ; héros `dotrap(FORCETRAP)` ; mon `wakeup` + `mintrap(FORCETRAP)`.

**Écart concret 1 — `canspotmon` vs `canseemon`.** C, bras monstre :

```6188:6191:nethack-c/upstream/src/trap.c
        if (canspotmon(mon)) {
            *noticed = TRUE;
            pline("%s is released from %s%s.", Monnam(mon), which,
                  trapdescr);
```

JS utilise `canseemon(mon)`. Un monstre détecté sans être vu (`canspotmon` et non `canseemon`) ne déclenche pas le pline ni `noticed` → `learnwand` peut manquer. Même écart sur `openfallingtrap` (`noticed = cansee || canseemon` vs C `cansee || canspotmon`).

**Écart 2 — `reward_untrap` `unique_corpstat`.** C appelle `unique_corpstat(mtmp->data)` (macro = `G_UNIQ`). JS teste `G_UNIQ` directement. Équivalent. Le commentaire JS « long-worm-tail » est un faux named-omit.

RNG `reward_untrap` : `rnl(10)<8` puis `!rn2(3) && !rnl(8)` — ordre C respecté.

### `boxlock` / `boxlock_invent`
**C :** `lock.c:1056` ; `zap.c:2687`. JS `boxlock` est **fidèle** branche par branche (LOCKING Klunk + olocked/obroken/lknown wizard ; OPENING Klick ou `obroken=0` silencieux ; POLY `reset_pick`). `boxlock_invent` omet `update_inventory` — nommé. Module : helper C de `zap.c` logé dans `lock.js` (1:1 relâché, pas un ban).

### `zapyourself` WAN_OPENING
**C :** `zap.c:2929-2946` — `ustuck` → `release_hold` ; `Punished` → `unpunish` ; `if (!u.utrap || !openholdingtrap(...)) { boxlock_invent; openfallingtrap(..., TRUE); }`.

JS reproduit le court-circuit : n’appelle `openholdingtrap` que si `utrap`, puis boxlock+falling ssi `!utrap || !hold.happened`. Punished ≡ `uball` — correct pour ce port. **Callers :** `zapyourself` branché. `bhito` floor boxlock reste nommé omit (map zap.js).

### `bhitm` WAN_OPENING / SPE_KNOCK
**C :** `zap.c:382-431`. Ordre : mimic `that_is_a_mimic` (JS omit nommé) ; `wake = FALSE` ; ustuck `release_hold` ; else holding ; else falling `trapdoor_only=TRUE` ; else SPE_KNOCK `wake=TRUE; ret=1; mhurtle(..., rnd(2))` + `wakeup`/`abuse_dog` ; else selle `mdrop_obj`.

**Écart concret 3 — `wake = FALSE` absent.** JS `bhitm` initialise `wake = true` comme C, mais le case OPENING **ne force jamais** `wake = false`. Conséquence : WAN_OPENING (sans knock) réveille et (C) `m_respond`/`hot_pursuit` en fin de `bhitm`. JS a un `wakeup` terminal si `wake` — extra wakeup sur wand of opening. SPE_KNOCK : C remet `wake = TRUE` (double wakeup branche + fin) ; JS aussi `wake = true` + wakeup dans la branche.

**Écart concret 4 — `ret = 1` manquant.** C SPE_KNOCK : `ret = 1` (le rayon s’arrête). JS documente `@returns 0 (non-stopping)` et `return 0` inconditionnel. Un knock spell traverse le monstre.

Selle : JS `obj_extract_self` + `owornmask=0` + `place_object`/`stackobj` au lieu de `mdrop_obj` (shop, timers, `owt`). Thin, non nommé comme `mdrop_obj`.

RNG knock : `rnd(2)` après le test taille/`m_is_steadfast` — ordre C (le `rnd` n’est appelé que si knockback). OK.

### `mhurtle` / `will_hurtle` / `mhurtle_step`
**C :** `dothrow.c:977-1177`. JS porte size/stuck/trapped + `goodpos(..., MM_IGNOREWATER|MM_IGNORELAVA)` ; stun/movement=0 ; `sgn` ; mundetected/seemimic ; boucle pas-à-pas (async, pas `walk_path`) ; bump pline ; `mintrap(HURTLING)` ; post-path `mintrap(FORCEBUNGLE)`.

Omits nommés : NODIAG grid-bug ; `minliquid` ; petrify ; steed `u_on_newpos` (JS `rloc_to` y compris usteed — le héros ne suit pas). `m_in_out_region` sauté (C le teste **dans** `will_hurtle` path). Bump : C `a_monnam` / `Some_Monnam` vs JS `mon_nam` / `Monnam`.

Steed : le commentaire JS dit « thin: rloc steed only named omit » puis fait `rloc_to` dans les deux branches — le `if (mon !== usteed)` est mort.

### `m_is_steadfast`
**C :** `uhitm.c:5218`. Fly/Lev/airlevel/water-bubble → false ; Giantslayer ; `m_carrying(LOADSTONE)` (youmonst-aware) ; steed + `carrying(LOADSTONE)`.

JS duplique Levitation/Flying locaux (sticky `u.Levitation` **ou** H/E) au lieu d’importer `attrib.js`. C `m_carrying` pour le héros ; JS `carrying_otyp` sur `game.invent` (tableau, pas chaîne `nobj`) — risque si invent n’est pas plat. `MON_WEP` approximé par premier `owornmask & W_WEP`. Named omit MON_WEP partiel.

### Citations C — `bhitm` WAN_OPENING / SPE_KNOCK (`zap.c:382`)

```382:431:nethack-c/upstream/src/zap.c
    case WAN_OPENING:
    case SPE_KNOCK:
        if (disguised_mimic && box_or_door(mtmp))
            that_is_a_mimic(mtmp, MIM_REVEAL);
        wake = FALSE; /* don't want immediate counterattack */
        if (mtmp == u.ustuck) {
            release_hold();
            learn_it = TRUE;
        } else if (openholdingtrap(mtmp, &learn_it)) {
            break;
        } else if (openfallingtrap(mtmp, TRUE, &learn_it)) {
            break;
        } else if (otyp == SPE_KNOCK) {
            wake = TRUE;
            ret = 1;
            if (mtmp->data->msize < MZ_HUMAN && !m_is_steadfast(mtmp)) {
                mhurtle(mtmp, mtmp->mx - u.ux, mtmp->my - u.uy, rnd(2));
            }
            ...
        } else if ((obj = which_armor(mtmp, W_SADDLE)) != 0) {
            mdrop_obj(mtmp, obj, FALSE);
        }
```

JS `bhitm` reprend holding → falling → knock → saddle, **sans** les deux assignations critiques `wake = FALSE` et `ret = 1`. Le `break` C après holding/falling empêche le knock/selle ; JS `happened` + `return` / skip équivalent — **confirmation** de l’ordre else-if. Le mimic `that_is_a_mimic` reste named omit.

`zapyourself` C (`zap.c` ~2929) : `ustuck` `release_hold` ; Punished `unpunish` ; `if (!u.utrap || !openholdingtrap(&youmonst, &learn_it)) { boxlock_invent(obj); (void) openfallingtrap(&youmonst, TRUE, &learn_it); }`. JS : `uball` pour Punished ; `hold.happened` pour le court-circuit. **Callers branchés :** `zapyourself`. **Non branché :** `bhito` boxlock sol (map).

### `mhurtle` C (`dothrow.c`)

C `mhurtle` : early size/stuck/trapped ; `will_hurtle` (goodpos + `m_in_out_region`) ; stun ; `walk_path` + `mhurtle_step` (newsym, `mintrap(HURTLING)`, bump, petrify iron bars, `minliquid`) ; post `mintrap(FORCEBUNGLE)` ; steed `u_on_newpos`.

JS simule `walk_path` en boucle `await mhurtle_step`. **RNG :** aucun dans `mhurtle` lui-même ; `rnd(2)` est dans `bhitm` **avant** l’appel — JS aussi. NODIAG : C `will_hurtle` refuse diag pour grid bug ; JS named omit → un xorn/grid-bug knocké en diag peut prendre une case C interdite.

`openholdingtrap` dummy trap : C `memset` + `ntrap=NULL` si `utrap` sans `t_at` (buried ball). JS objet `{ ttyp:0, tseen:0, madeby_u:0 }`. Suffisant pour `the_your`. Steed C : `mon == u.usteed` ⇒ `ishero = TRUE` (dételle le héros, pas le monstre). JS : même garde `mon === u.usteed` → traiter comme héros. **Confirmation.**


### Callers C immédiats (WAN_OPENING / SPE_KNOCK)

| Caller C | Branché JS ? |
|---|---|
| `bhitm` monstre | oui (`zap.js`) |
| `zapyourself` héros | oui |
| `bhito` objet au sol (boxlock) | **non** (named map) |
| `bhitm` WAN_LOCKING `closeholdingtrap` | **non** |
| `mhitm_knockback` / kick hurtle | **non** (`mhurtle` exporté, callers hors cluster) |

`openholdingtrap` / `openfallingtrap` : callers C = `bhitm` + `zapyourself` (+ éventuellement d’autres zaps). JS : ces deux. Dummy trap buried-ball : exercé seulement si `utrap` sans `t_at`.

RNG `mhurtle` : aucun dans le path lui-même. `rnd(2)` est dans `bhitm` **après** les tests taille/`m_is_steadfast` — JS identique (pas de `rnd` si steadfast). `reward_untrap` : `rnl(10)<8` puis `!rn2(3) && !rnl(8)` — clang LTR N/A (appels séparés).

`boxlock` POLY : `reset_pick` — pas de RNG. OPENING locked : Klick, `olocked=0`. LOCKING : Klunk. JS fidèle d’après le diff ; wizard `lknown` porté.

Stub / early-return non-C : `mhurtle` steed `if (mon !== usteed) rloc_to; else rloc_to` — branche morte, toujours `rloc_to`. C `u_on_newpos` pour le héros monté. Named thin, **implémentation plus thin que le commentaire**.

## Constitution / playbook
Grep `git show 652a6627 -- js/` : `FORCETRAP` / `FORCEBUNGLE` / `HURTLING` = flags C `trap.h`, **pas** `FORCE` de trace. Aucun `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward`. Aucun nom de seed / coordonnée brute dans le contrôle JS. Frozen intacts. Pas d’entrée `fastforward.js`.

`await nh_delay_output` dans `mhurtle_step` : delay d’affichage, **pas** `nhgetch`. Une seule frontière d’input gameplay. Rule #2 RAS.

1:1 modules : `boxlock_invent` vit en C dans `zap.c`, logé JS dans `lock.js` (caller boxlock). `s_suffix` / `surface` recopiés dans `zap.js` (doublons, pas un ban). `mhurtle` dans `dothrow.js` comme C `dothrow.c`. Colocation justifiable.

Pas de filet d’alignement / sparse frames / traces hardcodées.

## Densité (§2b)
**Right size, bord trop gros.** +638, cinq fichiers JS, une famille WAN_OPENING/SPE_KNOCK (holding trap → falling trap → knock hurtle → saddle). `mhurtle` est un mini-moteur ; le porter ici est justifié par SPE_KNOCK, pas par knockback combat (`mhitm_knockback` non branché). Trop gros si on comptait kick/throw knockback ; ce n’est pas le cas.

## Documentation
D-0981 « fixed » + deferrals : petrify/steed/`minliquid`/NODIAG ; `closeholdingtrap` ; floor `bhito` boxlock ; montraits/stolen_value. Map `debt.md` / zap.js aligne. Pas d’overclaim « complete opening ».

**Non nommés (dette doc) :** `wake = FALSE` absent ; `ret = 1` absent ; `canspotmon` vs `canseemon` ; selle `mdrop_obj` vs extract+place.

Journal #1251 : green+strict ; zap **20**/21 (seed0009). Pas de full suite (cadence @#1255). Fortress « held » par cohorte, pas par `sessions`.

## Vérification
Commandes citées : green+strict + zap 20/21. Preuve journal, pas de transcript. Cohorte zap pertinente (`bhitm`/`zapyourself`). Aucun seed public n’exerce `mhurtle`/selle : `ret=1` et `wake=FALSE` restent silencieux sous fortress. Held-out hardening, pas un FAIL peel. OK playbook §2a, preuve faible sur les écarts beam.

Fortress ultérieure #1270 43/44 n’est pas imputable à ce hash.

## Risques / dette
1. SPE_KNOCK `ret=0` : le rayon continue (QUALITY, non nommé).
2. WAN_OPENING `wake` reste true : wakeup extra / `m_respond`.
3. `canseemon` vs `canspotmon` : `learnwand` / messages.
4. Selle `mdrop_obj` vs extract+place : facture boutique, timers.
5. `mhurtle` steed / NODIAG / `minliquid` / petrify (nommés).
6. `closeholdingtrap` WAN_LOCKING toujours absent.
7. `bhito` boxlock sol non branché.


## Synthèse fidélité
Ordre holding → falling → knock/selle : **C**. `rnd(2)` après steadfast : **C**. Dummy trap buried-ball : **C**. Écarts QUALITY non nommés : `wake=FALSE`, `ret=1`, `canspotmon`. Écarts nommés : mhurtle NODIAG/minliquid/petrify/steed. Largeur : une famille magique, cinq modules. Constitution : RAS après grep. Densité : right size au plafond +638.


## Questions ouvertes (revue)
1. Un seed held-out knock traverse-t-il un second monstre (`ret=1` manquant) ?
2. `canspotmon` est-il déjà un alias JS de `canseemon` ailleurs (alors l’écart #1 s’annule) ?
3. `mdrop_obj` existe-t-il déjà en JS (selle devrait l’appeler) ?

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **6.5/10**
- Si je ne devais retenir qu’une critique : cluster WAN_OPENING/SPE_KNOCK réellement branché (ordre holding→falling→knock/selle), mais `bhitm` oublie `wake=FALSE` et `ret=1` du C — le knock ne stoppe pas le rayon et l’opening réveille trop.
