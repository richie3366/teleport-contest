# Reviews — depuis `second-attempt-with-perfect-public-score`

Ancrage **exclu** (remote) :

| | |
|--|--|
| Branche | `origin/second-attempt-with-perfect-public-score` |
| SHA | `1a8b120d757437c3ad0c3a3e4cae2d5d6ffc4f95` |
| Message | Stop steering the agent loop at the public leaderboard gap. |
| Date | 2026-07-21 |

Périmètre : `1a8b120d..HEAD` (**86 commits**, `8f96d5b6` … `8bba5965`).
Les commits **antérieurs** à l’ancrage ne sont pas reviewés.

HEAD au moment de la review : `8bba5965` (`main` / `origin/main`).

## Méthode

Une review par commit (fichiers `01-…` … `86-…`), grille dans
`00-RUBRIQUE.md` / `00-INSTRUCTIONS.md`.

Chaque review juge le **diff de ce commit** contre le C épinglé
(`nethack-c/upstream/src/`), la Constitution / playbook, la densité
§2b, l’honnêteté CURRENT/NOTES/map/D-log, et la preuve de vérification.

`nethack-c/`, `sessions/`, `frozen/`, `js/fastforward.js` ne sont
**pas** touchés dans cette plage — point positif transversal.

## Synthèse transversale (à lire avant les 86 fichiers)

### 1. Mode map-driven (commit 01)

`8f96d5b6` bascule CURRENT/playbook/Constitution vers « suite PASS =
forteresse ; le travail vient de la map ». C’est le contrat de toute
la plage. Les 85 commits suivants sont presque tous des retraites
d’omissions nommées, pas des peels FAIL. C’est cohérent avec l’ancrage.

### 2. Trous de numérotation D-id dans les *subjects* git

Les D-ids existent dans l’index, mais **absents du sujet git** :

| D-id | Commit | Sujet git |
|------|--------|-----------|
| D-0942 | `2bfa043b` | Port pay_for_damage… **sans D-id** + cadence #1210 |
| D-0943 | `77e5fcec` | Port cpostfx… **sans D-id** |
| D-0947 | `9fc68ca2` | Port kick_door… **sans D-id** + cadence #1215 |
| D-0985 | `34c147f5` | Port kick_nondoor… **sans D-id** + cadence #1255 |

Cadence pures sans D-id : `8f96d5b6`, `1b850893`, `b65a975e`,
`a10c849a`. Follow-up map 1 ligne : `82da3437` (D-0990 déjà porté).

### 3. Mélange cadence + port (anti-pattern récurrent)

Le playbook demande une cadence `sessions` tous les 5 iters, **puis**
mise à jour de CURRENT. Plusieurs commits **portent du C dans le même
commit** que le refresh de score. Impossible de savoir si le 44/44
(ou 43/44) a été mesuré **avant** ou **après** le port.

Commits mixtes notables : `d57a5c85` (#1205+D-0937), `2bfa043b`
(#1210), `9fc68ca2` (#1215), `b0d774ef` (#1230+D-0960), `526eb273`
(#1235+D-0965), `81f0f153` (#1240+D-0970), `d8ec1a67` (#1245+D-0975),
`835f5ad9` (#1250+D-0980), `34c147f5` (#1255+D-0985), `bb98ff89`
(#1260+D-0990), `edf91470` (#1265+D-0995), `28aac97f` (#1275+D-1004),
`3590a650` (#1280+D-1009), `bafd1b11` (#1285+D-1014).

### 4. Régression seed0009 (43/44) mal diagnostiquée

Chronologie CURRENT :

| Cadence | Commit | Score | seed0009 |
|---------|--------|------:|----------|
| #1220–#1240 | … `81f0f153` D-0970 toggle_stealth | 44/44 | PASS (déclaré) |
| #1245 | `d8ec1a67` D-0975 | **43/44** | Scr 72/73 |
| #1250–#1285 | … | 43/44 | « pre-existing, do not chase » |
| D-1015 | `8bba5965` | **44/44** | fixé |

D-1015 (log) : fuite `EStealth` après stash tutoriel ; **rendue
visible par D-0970** `confer_oc_oprop` STEALTH (cape elfe Ranger).

Donc le mantra « seed0009 Scr 72/73 reproduces on clean HEAD — do not
chase as recent-port regression » est **faux** : c’est une régression
de la plage post-ancrage, masquée ~40 commits. #1240 44/44 + D-0970
dans le **même** commit rend le 44/44 de #1240 suspect (mesure avant
le port stealth, ou latence jusqu’à D-0972/D-0974).

### 5. Densité §2b

Trop gros (fichiers / sujets sans lien) : D-0951 pickaxe (+997),
D-0952 break-wand (+713), D-0956 Ring_gone+float+rescham+choke+mimic
(14 fichiers), D-0978 ignite/burn (15 fichiers), D-0996 selftouch
(16 fichiers), D-1005 leash (18 fichiers).

Trop petit : `82da3437` (1 ligne map), cadences pures, D-1013
Blindf_on/off (+83) — ce dernier peut être un reliquat légitime.

### 6. Constitution (plage entière, `js/`)

- Pas d’ajout `fastforward.js`
- Pas d’édition frozen / sessions / upstream C
- Pas d’import `fs`/`path`/`node:*` / `readFileSync` dans le diff `js/`
- Les hits `FORCE`/`ALIGN` du diff sont des constantes C
  (`SPE_FORCE_BOLT`, `PM_ALIGNED_CLERIC`), pas des shims

Le risque constitutionnel de la plage n’est pas le trace-hardcode ;
c’est l’**overclaim** « complete » + la **décision de ne pas chasser**
seed0009.

## Table des 86 commits

Une review par commit. Abréviations de verdict : table ci-dessous.

| NN | Hash | Sujet | ± | Verdict | /10 | Fichier |
|----|------|-------|---|--------:|----:|---------|
| 01 | `8f96d5b6` | Document map-driven porting after public suite PASS | +177/−26 | **PROCESS** | 6 | [01](01-8f96d5b6-map-driven-porting.md) |
| 02 | `f4d7632b` | Port TIN open/consume and multi-turn rations (D-0935) | +599/−79 | **DEBT** | 7 | [02](02-f4d7632b-tin-open-consume.md) |
| 03 | `1ccadb23` | Port metallivore is_edible and doeat_nonfood (D-0936) | +300/−32 | **DEBT** | 7 | [03](03-1ccadb23-metallivore-is-edible.md) |
| 04 | `d57a5c85` | Port metallivore beartrap/bars chew (D-0937) | +371/−47 | **DEBT** | 7 | [04](04-d57a5c85-metallivore-beartrap.md) |
| 05 | `ad8c5cc6` | Port b_trapped and make_stunned (D-0938) | +181/−78 | **DEBT** | 7.5 | [05](05-ad8c5cc6-b-trapped-make-stunned.md) |
| 06 | `58e6d5fa` | Port cprefx and cannibal/stone/slime (D-0939) | +458/−23 | **DEBT** | 8 | [06](06-58e6d5fa-cprefx-cannibal.md) |
| 07 | `4792e3f5` | Port tin shop billing and use_tin_opener (D-0940) | +353/−31 | **DEBT** | 7.5 | [07](07-4792e3f5-tin-shop-billing.md) |
| 08 | `62659f73` | Port still_chewing shop damage and town watch_dig (D-0941) | +312/−47 | **DEBT** | 7 | [08](08-62659f73-still-chewing-watch-dig.md) |
| 09 | `2bfa043b` | Port pay_for_damage/getcad/hot_pursuit + #1210 | +461/−75 | **PROCESS** | 6.5 | [09](09-2bfa043b-pay-for-damage.md) |
| 10 | `77e5fcec` | Port cpostfx corpse specials and stun/hallu | +257/−35 | **ACCEPT** | 8 | [10](10-77e5fcec-cpostfx-corpse-specials.md) |
| 11 | `81c74930` | Port corpse_intrinsic/givit via mconveys (D-0944) | +273/−23 | **ACCEPT** | 8.5 | [11](11-81c74930-corpse-intrinsic-givit.md) |
| 12 | `df991a17` | Port cpostfx were*/mimic/attrcurse (D-0945) | +356/−94 | **DEBT** | 7.5 | [12](12-df991a17-cpostfx-were-mimic.md) |
| 13 | `0138ada2` | Port eatspecial PAPER/potion/eataccessory (D-0946) | +498/−31 | **DEBT** | 7 | [13](13-0138ada2-eatspecial-paper-potion.md) |
| 14 | `9fc68ca2` | Port kick_door shop bill/town watch + #1215 | +138/−33 | **PROCESS** | 6.5 | [14](14-9fc68ca2-kick-door-shop.md) |
| 15 | `3b2f75a4` | Port zap_over_floor shop door/bars (D-0948) | +264/−48 | **DEBT** | 7.5 | [15](15-3b2f75a4-zap-over-floor.md) |
| 16 | `bc50d6c0` | Port explode shop billing and do_break_wand (D-0949) | +381/−45 | **DEBT** | 7 | [16](16-bc50d6c0-explode-shop-billing.md) |
| 17 | `86cc8a89` | Port dig_check/digactualhole (D-0950) | +470/−32 | **DEBT** | 7 | [17](17-86cc8a89-dig-check-digactualhole.md) |
| 18 | `8a27b791` | Port pickaxe dig occupation (D-0951) | +997/−55 | **QUALITY** | 4 | [18](18-8a27b791-pickaxe-occupation.md) |
| 19 | `1b850893` | Refresh #1220 public suite score | +108/−85 | **PROCESS** | 5 | [19](19-1b850893-cadence-1220.md) |
| 20 | `08553d7c` | Port break-wand adjacent bhitm/cancel (D-0952) | +713/−91 | **QUALITY** | 5 | [20](20-08553d7c-break-wand-adjacent.md) |
| 21 | `d9c9f0a1` | Port floorfood pool/lava + vault_gd (D-0953) | +159/−35 | **DEBT** | 7 | [21](21-d9c9f0a1-floorfood-vault-gd.md) |
| 22 | `aa0daecd` | Port dig furniture_handled + HOLE goto_level (D-0954) | +244/−59 | **QUALITY** | 5 | [22](22-aa0daecd-dig-furniture-hole.md) |
| 23 | `13070283` | Port unturn_dead / hero_breaks / ABON cancel (D-0955) | +594/−76 | **QUALITY** | 4 | [23](23-13070283-unturn-dead-hero-breaks.md) |
| 24 | `b65a975e` | Refresh #1225 public suite score | +21/−10 | **PROCESS** | 5 | [24](24-b65a975e-cadence-1225.md) |
| 25 | `4ad939c9` | Port Ring_gone, float_up, rescham, choke (D-0956) | +440/−73 | **DEBT** | 7 | [25](25-4ad939c9-ring-gone-float-up.md) |
| 26 | `8cc67794` | Port dig_up_grave (D-0957) | +205/−55 | **DEBT** | 7 | [26](26-8cc67794-dig-up-grave.md) |
| 27 | `17e7755f` | Port shopdig warn/snatch (D-0958) | +251/−39 | **QUALITY** | 4 | [27](27-17e7755f-shopdig-warn-snatch.md) |
| 28 | `68c2f595` | Port destroy_drawbridge (D-0959) | +311/−42 | **DEBT** | 7 | [28](28-68c2f595-destroy-drawbridge.md) |
| 29 | `b0d774ef` | Refresh #1230 + mkcavearea (D-0960) | +220/−55 | **PROCESS** | 6 | [29](29-b0d774ef-cadence-1230-mkcavearea.md) |
| 30 | `a86cd808` | Port impact_drop (D-0961) | +258/−30 | **DEBT** | 8 | [30](30-a86cd808-impact-drop.md) |
| 31 | `15a45d1c` | Port conjoined_pits, autodig, boulder-fill (D-0962) | +188/−55 | **ACCEPT** | 8 | [31](31-15a45d1c-conjoined-pits-autodig.md) |
| 32 | `e3c6cff4` | Port desecrate_altar / god_zaps_you (D-0963) | +538/−87 | **DEBT** | 6.5 | [32](32-e3c6cff4-desecrate-altar.md) |
| 33 | `abc0302c` | Port revive container/buried (D-0964) | +350/−77 | **DEBT** | 7.5 | [33](33-abc0302c-revive-container-buried.md) |
| 34 | `526eb273` | Refresh #1235 + ice melt/burn/fireball (D-0965) | +483/−95 | **PROCESS** | 7 | [34](34-526eb273-cadence-1235-ice-melt.md) |
| 35 | `3f9081eb` | Port Ring_on/off learnring/float_down (D-0966) | +458/−77 | **DEBT** | 8 | [35](35-3f9081eb-ring-on-off-float-down.md) |
| 36 | `4a95b850` | Port bury/unearth and obj_ice_effects (D-0967) | +311/−55 | **DEBT** | 8 | [36](36-4a95b850-bury-unearth-ice.md) |
| 37 | `64327f07` | Port explode AD_FIRE (D-0968) | +245/−75 | **DEBT** | 7.5 | [37](37-64327f07-explode-ad-fire.md) |
| 38 | `4e4ac06b` | Port angrygods cases 4–8 and rndcurse (D-0969) | +295/−65 | **DEBT** | 7 | [38](38-4e4ac06b-angrygods-rndcurse.md) |
| 39 | `81f0f153` | Refresh #1240 + toggle_stealth (D-0970) | +211/−66 | **QUALITY** | 5 | [39](39-81f0f153-cadence-1240-toggle-stealth.md) |
| 40 | `788ffdbe` | Port explode AD_COLD/ELEC (D-0971) | +131/−67 | **DEBT** | 7.5 | [40](40-788ffdbe-explode-ad-cold-elec.md) |
| 41 | `beec8efe` | Port drum-of-earthquake (D-0972) | +466/−36 | **DEBT** | 7.5 | [41](41-beec8efe-drum-earthquake.md) |
| 42 | `af35f8fc` | Port explode AD_MAGM/DISN/DRST/ACID (D-0973) | +206/−82 | **DEBT** | 7 | [42](42-af35f8fc-explode-ad-magm-disn.md) |
| 43 | `ebb7b8de` | Port flute/harp/horn music (D-0974) | +412/−41 | **DEBT** | 7.5 | [43](43-ebb7b8de-flute-harp-horn.md) |
| 44 | `d8ec1a67` | Refresh #1245 + lavawall (D-0975) | +138/−55 | **PROCESS** | 6 | [44](44-d8ec1a67-cadence-1245-lavawall.md) |
| 45 | `35c3ab90` | Port dosinkfall (D-0976) | +321/−44 | **DEBT** | 7.5 | [45](45-35c3ab90-dosinkfall.md) |
| 46 | `10b05acb` | Port passtune and open/close drawbridge (D-0977) | +377/−50 | **DEBT** | 7 | [46](46-10b05acb-passtune-drawbridge.md) |
| 47 | `ef29ee55` | Port ignite_items/catch_lit/begin_burn (D-0978) | +707/−85 | **QUALITY** | 6.5 | [47](47-ef29ee55-ignite-items-begin-burn.md) |
| 48 | `dbd0f7d0` | Port release_hold and flash_hits_mon (D-0979) | +308/−130 | **DEBT** | 7 | [48](48-dbd0f7d0-release-hold-flash-hits.md) |
| 49 | `835f5ad9` | Restore timeout objects_at + #1250 (D-0980) | +74/−39 | **PROCESS** | 5 | [49](49-835f5ad9-timeout-objects-at-cadence-1250.md) |
| 50 | `652a6627` | Port opening-trap unlock + SPE_KNOCK (D-0981) | +638/−68 | **DEBT** | 6.5 | [50](50-652a6627-opening-trap-knock.md) |
| 51 | `7ca18b5d` | Port montraits/omonst revive + ghost (D-0982) | +653/−99 | **DEBT** | 6.5 | [51](51-7ca18b5d-montraits-ghost-recorporealize.md) |
| 52 | `45bf86fc` | Port shop stolen_value (D-0983) | +410/−44 | **ACCEPT** | 8 | [52](52-45bf86fc-stolen-value.md) |
| 53 | `9dfb22d6` | Port ship_object hole-fall billing (D-0984) | +289/−34 | **ACCEPT** | 7.5 | [53](53-9dfb22d6-ship-object.md) |
| 54 | `34c147f5` | Port kick_nondoor SDOOR/furniture + #1255 | +363/−81 | **PROCESS** | 5.5 | [54](54-34c147f5-kick-nondoor.md) |
| 55 | `587031b3` | Port throne/tree kick (D-0986) | +491/−43 | **DEBT** | 7 | [55](55-587031b3-throne-tree-kick.md) |
| 56 | `7916e1aa` | Port flooreffects pool/lava/pit/shaft (D-0987) | +440/−56 | **DEBT** | 7.5 | [56](56-7916e1aa-flooreffects-pool-lava.md) |
| 57 | `35988b38` | Port kick_object and bhit KICKED_WEAPON (D-0988) | +467/−71 | **DEBT** | 7 | [57](57-35988b38-kick-object-bhit.md) |
| 58 | `b949418d` | Port Is_box kick impact/chest_trap (D-0989) | +621/−64 | **DEBT** | 6 | [58](58-b949418d-is-box-chest-trap.md) |
| 59 | `bb98ff89` | Port hits_bars/hit_bars + #1260 (D-0990) | +350/−58 | **PROCESS** | 6 | [59](59-bb98ff89-hits-bars.md) |
| 60 | `82da3437` | Note D-0990 hits_bars retirement on map | +1/−1 | **PROCESS** | 3 | [60](60-82da3437-hits-bars-map-note.md) |
| 61 | `82dec1c8` | Port costly_gold/donate_gold (D-0991) | +188/−42 | **DEBT** | 7 | [61](61-82dec1c8-costly-gold-donate-gold.md) |
| 62 | `85b2ab4b` | Port flooreffects fire_damage/doaltarobj (D-0992) | +392/−145 | **DEBT** | 7 | [62](62-85b2ab4b-flooreffects-fire-altar.md) |
| 63 | `da4c886c` | Port pudding_merge/obj_meld (D-0993) | +392/−51 | **DEBT** | 7 | [63](63-da4c886c-pudding-merge-obj-meld.md) |
| 64 | `501926db` | Port sellobj/check_shop_obj (D-0994) | +666/−62 | **QUALITY** | 5 | [64](64-501926db-sellobj-check-shop-obj.md) |
| 65 | `edf91470` | Port barefoot kick petrify + DISP_FLASH (D-0995) | +260/−141 | **DEBT** | 7 | [65](65-edf91470-barefoot-kick-petrify.md) |
| 66 | `312a4b05` | Port selftouch/minstapetrify/monstone (D-0996) | +378/−79 | **DEBT** | 6.5 | [66](66-312a4b05-selftouch-monstone.md) |
| 67 | `ccba6ff5` | Port animate_statue/activate_statue_trap (D-0997) | +429/−106 | **DEBT** | 7.5 | [67](67-ccba6ff5-animate-statue.md) |
| 68 | `a0c71f2b` | Port dopay robbed/angry appease (D-0998) | +244/−25 | **DEBT** | 8 | [68](68-a0c71f2b-dopay-robbed-angry.md) |
| 69 | `856d7f50` | Port ParanoidBreakwand getlin (D-0999) | +250/−54 | **DEBT** | 8 | [69](69-856d7f50-paranoid-breakwand.md) |
| 70 | `a10c849a` | Record #1270 cadence (43/44) | +46/−49 | **PROCESS** | 6 | [70](70-a10c849a-cadence-1270.md) |
| 71 | `c301e764` | Port ParanoidPray Confirm (D-1000) | +111/−29 | **DEBT** | 7.5 | [71](71-c301e764-paranoid-pray.md) |
| 72 | `fba5e8ca` | Port ParanoidWerechange/Hit (D-1001) | +238/−66 | **DEBT** | 7 | [72](72-fba5e8ca-paranoid-werechange.md) |
| 73 | `6245f20d` | Wire allmain Teleportation/Polymorph/ulycn (D-1002) | +121/−21 | **DEBT** | 8 | [73](73-6245f20d-allmain-teleport-poly-ulycn.md) |
| 74 | `c84a1f62` | Port warnreveal, overexert_hp, eel regen (D-1003) | +180/−50 | **DEBT** | 7.5 | [74](74-c84a1f62-warnreveal-overexert.md) |
| 75 | `28aac97f` | Wire lycanthropy you_were + #1275 (D-1004) | +282/−60 | **PROCESS** | 6 | [75](75-28aac97f-lycanthropy-you-were.md) |
| 76 | `d0016639` | Port leash cluster (D-1005) | +601/−82 | **DEBT** | 7 | [76](76-d0016639-leash-cluster.md) |
| 77 | `5a6d38f4` | Port mon_poly + newcham null-mdat (D-1006) | +259/−45 | **DEBT** | 7 | [77](77-5a6d38f4-mon-poly-newcham.md) |
| 78 | `df3eb51b` | Port apply whistle envelope (D-1007) | +410/−38 | **DEBT** | 8 | [78](78-df3eb51b-whistle-envelope.md) |
| 79 | `a045ab1f` | Port apply use_saddle (D-1008) | +259/−40 | **DEBT** | 7.5 | [79](79-a045ab1f-use-saddle.md) |
| 80 | `3590a650` | Port apply use_towel (D-1009) | +349/−66 | **PROCESS** | 6.5 | [80](80-3590a650-use-towel.md) |
| 81 | `1a66e5da` | Port apply crystal ball gazing (D-1010) | +598/−29 | **DEBT** | 7 | [81](81-1a66e5da-crystal-ball.md) |
| 82 | `cd503837` | Port pray in_trouble majors (D-1011) | +343/−81 | **DEBT** | 7.5 | [82](82-cd503837-pray-in-trouble-majors.md) |
| 83 | `8c50ff87` | Port pray in_trouble collapsing…minors (D-1012) | +680/−72 | **DEBT** | 7.5 | [83](83-8c50ff87-pray-in-trouble-minors.md) |
| 84 | `64f0212a` | Port apply BLINDFOLD/LENSES (D-1013) | +83/−18 | **ACCEPT** | 8 | [84](84-64f0212a-blindfold-lenses.md) |
| 85 | `bafd1b11` | Port apply use_stone + #1285 (D-1014) | +418/−60 | **PROCESS** | 6.5 | [85](85-bafd1b11-use-stone-cadence-1285.md) |
| 86 | `8bba5965` | Fix tutorial invent stash worn extrinsics (D-1015) | +92/−55 | **DEBT** | 8 | [86](86-8bba5965-tutorial-invent-stash.md) |

## Dépouillement

| Verdict | N |
|---------|--:|
| ACCEPT | 6 |
| ACCEPT-WITH-DEBT | 56 |
| PROCESS-SMELL | 16 |
| QUALITY-RISK | 8 |
| CONSTITUTION-RISK | 0 |
| **Total** | **86** |

### Lire en premier (signal)

1. [39 — D-0970 stealth / EStealth](39-81f0f153-cadence-1240-toggle-stealth.md) — cause racine seed0009
2. [41 — D-0972 earthquake](41-beec8efe-drum-earthquake.md) — premier NOTES « do not chase seed0009 »
3. [44 — #1245 + lavawall](44-d8ec1a67-cadence-1245-lavawall.md) — 43/44 institutionnalisé
4. [70 — #1270](70-a10c849a-cadence-1270.md) — cinquième publication du mantra
5. [86 — D-1015 setnotworn](86-8bba5965-tutorial-invent-stash.md) — le fix C, 40 commits trop tard
6. [18 — D-0951 pickaxe +997](18-8a27b791-pickaxe-occupation.md) — densité §2b
7. [49 — D-0980 objects_at](49-835f5ad9-timeout-objects-at-cadence-1250.md) — régression d’import D-0978
8. [01 — map-driven](01-8f96d5b6-map-driven-porting.md) — contrat de la plage

### QUALITY-RISK (8)

18 pickaxe, 20 break-wand, 22 furniture/HOLE, 23 unturn_dead, 27 shopdig, 39 toggle_stealth, 47 ignite/burn, 64 sellobj.

## Verdicts (légende)

| Verdict | Abrév. | Sens |
|---------|--------|------|
| ACCEPT | ACCEPT | Fidèle C, docs honnêtes, forteresse / preuve OK |
| ACCEPT-WITH-DEBT | DEBT | Utile, mais omissions / overclaim / stubs |
| PROCESS-SMELL | PROCESS | Cadence, docs, mélange score+port, peel 1 ligne |
| QUALITY-RISK | QUALITY | Partial vendu complet, cluster trop large, C mal lu |
| CONSTITUTION-RISK | CONST | Trace-hardcode, FORCE, Rule #2, fastforward, frozen |

**Aucun CONSTITUTION-RISK** dans la plage (grep `js/` : pas de `fs`, pas de fastforward, pas de frozen).
