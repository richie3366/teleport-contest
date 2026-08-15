# Review 71 — `c301e764` — D-1000 ParanoidPray Confirm + see_nearby_monsters

## Métadonnées
- Hash complet / court : `c301e764f3bc29f3f992b0a6a5f03d56381eb4e7` / `c301e764`
- Parent : `a10c849abfafc055f7259f518938578481f66a26`
- Auteur, date : Raphaël Hervier, mercredi 22 juillet 2026 05:05:07 +0200
- D-id : **D-1000**
- Stats : 9 files, **+111 / −29**
- Fichiers JS / map / cadence : `js/{pray,allmain,mon}.js` ; `debt.md` ; pas de cadence (#1271)

## Intention vs livrable
Promet `dopray` via `paranoid_query(ParanoidConfirm)` et `see_nearby_monsters` une fois par temps-héros. Diff : remplacement `yn_function` → `paranoid_query(ParanoidConfirm)` dans `dopray` ; port boucle 3×3 dans `mon.js` ; appel `allmain` en fin de `context.move`. Deux locus C liés par D-0999 (omit named see_nearby + Pray getlin). Pas un faux cluster. Pas de mélange cadence.

## Inventaire

| Fichier | Rôle |
|---------|------|
| `js/pray.js` | Wiring C : `dopray` Confirm |
| `js/mon.js` | Port C : `see_nearby_monsters` |
| `js/allmain.js` | Wiring : appel time-passed |
| `debt.md` + D-log | Docs |

`git show --stat` : 9 files, +111/−29. JS 3 fichiers seulement. `pray.js` ~34 lignes nettes (swap yn→paranoid_query). `mon.js` +41 (`see_nearby`). `allmain.js` +7.

Graphe async moveloop : `context.move` → … seer_turn `rn1(31,15)` → `await see_nearby_monsters` → 9× `m_at` → éventuellement `await see_monster_closeup(false)`. Pas de getlin. `#pray` : `await paranoid_query(Confirm=false)` → yn → nhgetch **déjà là**. Delta public pray : **nul**.

Chaque tour héros : closeup adjacent. Coût CPU, zéro ISAAC si `canseemon` sans `rn2`. Hallu early-return : pas de closeup, pas de `seen_close` sous Hallu (C).

## Fidélité C ↔ JS

### `dopray` confirmation
- Locus C : `pray.c:dopray` ~2199–2218
- Locus JS : `js/pray.js:dopray`

C :

```2208:2218:nethack-c/upstream/src/pray.c
    if (ParanoidPray) {
        ok = paranoid_query(ParanoidConfirm,
                            "Are you sure you want to pray?");
        if (!ok)
            return ECMD_OK;
    }
```

JS (après D-1000) : `paranoidPray = bits==null ? true : (bits & PARANOID_PRAY)` (défaut on, comme C `PARANOID_PRAY` dans `initoptions`) ; puis `ParanoidConfirm = bits & PARANOID_CONFIRM` (défaut **off**, C `options.c:7173` idem) ; `paranoid_query(ParanoidConfirm, 'Are you sure you want to pray?')`.

**Branche-par-branche :** Pray on + Confirm off → `yn_function` yn def n — **identique à l’ancien JS et à C défaut**. Confirm on → getlin « yes » via D-0999. **Pas de nouveau prompt sur les traces publiques défaut.** Le commentaire retiré « Confirm→getlin deferred » est vrai.

`bits == null ? true` pour Pray : si `paranoia_bits` absent, force la question — C bits toujours initialisés. Défensif, pas un skip.

Wizard « Force the gods » plus bas inchangé (yn séparé). Pas de RNG dans la confirm (C non plus).

Prompt string **exact** `"Are you sure you want to pray?"` — C identique. Défaut Confirm off : yn `[yn] (n)` comme le parent JS. **Delta public nul** sur #pray défaut. `paranoidPray` bits==null → true : overlay sans bits pose la question (C Pray on).

Hallu : see_nearby return early — un adjacent Hallu n’est jamais `seen_close` (C). Lifelist sous Hallu : pas de closeup. **Match.**

### `see_nearby_monsters`
- Locus C : `mon.c` ~6025–6053
- Locus JS : `js/mon.js:see_nearby_monsters`

C : Hallu ou (Blind && !Blind_telepat) return ; `for x=ux-1..+1` `for y=uy-1..+1` ; `isok` ; `m_at` ; mndx data, si AP_MONSTER → mappearance ; **skip si `mvitals[mndx].seen_close`** ; si `canseemon || (mundetected && sensemon)` : `bhitpos=x,y` ; `notonhead = (x!=mx||y!=my)` ; `see_monster_closeup(mtmp, FALSE)`.

JS : mêmes gardes `closeup_*` ; `isok_xy` ; `slot?.seen_close` continue (pas de slot ⇒ on n’skip pas — C zero-init seen_close=0, même effet) ; `canseemon \|\| (mundetected && sensemon)` ; `photo=false`. **Match.** Pas de RNG. `await see_monster_closeup` : photo false ⇒ pas `newexplevel`.

**Écart :** C `M_AP_TYPE==MONSTER` ajuste mndx **sans** `sensemon` ici (le test sensemon est dans closeup pour le **premier** mndx). JS pareil pour le skip seen_close. Mimic déguisé déjà `seen_close` sur l’apparence : skip closeup du vrai type — C identique.

Worm : `notonhead` si la case n’est pas `mx,my` (queue). C identique.

### Placement `allmain`
C `moveloop_core` bloc « actual time passed », **après** `seer_turn`, `sink_into_lava` / `pooleffects` / `under_water` / `under_ground`, **avant** « once-per-player-input ». JS : lava/pool/under **déjà deferred** ; insertion après `seer_turn`, commentaire explicite. **Parmi les bras JS existants, c’est la bonne place.** Si lava/pool étaient portés plus tard **après** see_nearby, l’ordre redeviendrait faux — le D-log nomme ces omits.

C `encumber_msg` / `do_vicinity_map` clairvoyance sont **avant** see_nearby. JS encumber est plus haut dans la boucle ; `do_vicinity_map` omis (nommé). Pas d’input nouveau : closeup photo=false.

Placement JS (hunk) :

```
        if ((g.moves || 0) >= (g.context.seer_turn || 0)) {
            g.context.seer_turn = g.moves + rn1(31, 15);
        }
        // C: sink_into_lava / pooleffects / under_water|ground deferred;
        // see_nearby_monsters at end of actual-time-passed (D-1000).
        await see_nearby_monsters();
```

C `seer_turn` : **si** `moves >= seer_turn` alors éventuellement `do_vicinity_map` **puis** `seer_turn = moves + rn1(31,15)`. JS hunk ne montre que le refresh `rn1(31,15)` — `do_vicinity_map` déjà absent. `rn1(31,15)` **15..45** comme C. Closeup **après** ce `rn1` : C closeup est **après** vicinity **et** lava. Un monstre adjacent vu après un sink lava C pourrait être mort avant closeup ; JS closeup trop tôt **quand** lava sera porté. Commentaire = piège conscient.

Boucle 3×3 inclut `(ux,uy)` : C aussi. Engulf / steed ? `m_at(u.x,u.y)` normally null (hero). Mimic sous le héros : rare.

`isok_xy` vs `isok` : bords carte. Match.

## Constitution / playbook
Grep JS : NODIAG existant, pas de FORCE/fs/fastforward/seed. Rule #2 RAS. Frozen RAS. `await paranoid_query` → getlin/yn → **nhgetch** (même frontière que #pray déjà). `await see_nearby_monsters` : pas nhgetch. 1:1 : `see_nearby` dans `mon.js` ; pray dans `pray.js` ; call `allmain.js` comme C. Omissions nommées (under_water, lava, vicinity).

Risque traces : `seen_close` se remplit chaque tour adjacent → lifelist / messages futurs. Pas d’écran direct sauf si un prompt dépend de seen_close (non dans ce hunk).

## Densité (§2b)
**Right size.** Un omit D-0999 (Pray getlin) + callee closeup déjà porté + **un** caller allmain C. 3 JS, +111. Pas too small (pas un if isolé : boucle + wire). Pas too big.

## Documentation
D-log : « call from allmain after seer_turn » — **exact**. Deferred lava/pool/under/vicinity. Index 10/11 seed0009. CURRENT next-cluster retirait déjà Pray/see_nearby comme option ; D-1000 le coche. debt.md. Pas « complete vision ». Overclaim : « matching mon.c/allmain.c » alors que lava/pool avant closeup sont absents — le D-log le dit, le message git un peu moins.

## Vérification
Journal : green+strict ; pray/allmain **10/11** seed0009. Green seed8000/#pray pertinent pour Confirm (yn inchangé). allmain closeup : startup/adjacent — cohort « allmain » justifié. Full suite absente (#1271, cadence #1275). Preuve affirmée. #1270 vient de figer 43/44 : ce port n’a pas de mesure publique.

## Risques / dette
1. **Ordre time-passed** incomplet (lava/pool/under) : quand ils arriveront, see_nearby est déjà « en bout de bloc » — il faudra l’**insérer avant** closeup, pas après.
2. **`closeup_Blind`** (D-0999) partagé : adjacent seen_close sous mauvais Blind.
3. **`seen_close` skip** : un monstre adjacent jamais closeup si mndx apparence déjà vu (C identique — pas un bug).
4. Pray + Confirm on (non défaut) : getlin « yes » vs recorder yn — hors traces défaut.
5. Pas de full sessions après un hook **chaque tour** : sous-vérifié vs densité playbook « cohort after shared change ».

## Lecture C complémentaire (`pray.c` 2208, `allmain.c` 409–437, `mon.c` 6025)

C `ParanoidPray` est un **ajout** de prompt (bit on par défaut), pas un remplacement de `flags.confirm`. Sans le bit, C #pray **sans** « are you sure ». JS `bits==null ? true` **force** le prompt si bits absents — plus paranoïaque que C zero-bits. jsmain pose PRAY|SWIM|TRAP : bits jamais null en newgame. Overlay session qui wipe flags : JS pose la question, C non. Bord.

`cmdq` C `#if 0` autour du clear do-again : JS n’a pas CQ_REPEAT. RAS.

see_nearby **n’inclut pas** le héros comme cible closeup (pas de m_at self). Worm segment adjacent : `notonhead` true → closeup enregistre TAIL. C. Première vue queue vs tête : deux slots mvitals. **Match.**

`sensemon` JS vs C : télépathie. Si `sensemon` JS est large, closeup sur cachés extra. Dette mondata, pas ce hunk.

allmain : C `see_nearby_monsters()` **sync**. JS await. photo false → closeup sans newexplevel → await no-op. Coût : 9 `m_at` par tour héros. Pas de RNG. Un `canseemon` JS qui tire du RNG (Hallu?) serait un drift **chaque tour**. `canseemon` ne doit pas `rn2`. Préexistant.

Cohort « pray/allmain 10/11 » : seed8000 #pray ? Tourist starter peut ne jamais prier. Preuve Confirm = green n’a pas cassé yn. Preuve see_nearby = 10 sessions n’ont pas dérivé d’écran à cause de seen_close. Faible mais non nulle.


## Callers C `dopray` / `see_nearby_monsters`

`dopray` = cmd `#pray` uniquement. Pas d’autre entry. `prayer_done` / `can_pray` / `angrygods` non touchés. Le hunk ne réordonne pas `uconduct.gnostic++` (après confirm C). JS : confirm **puis** le reste du dopray parent. **Match** (C confirm avant conduct). Un #pray cancel (`!ok`) : C return ECMD_OK **sans** casser athéisme. JS `if (!ok) return ECMD_OK` avant conduct. **Match.**

`see_nearby_monsters` C : **un** caller `allmain.c` time-passed (plus éventuellement vision — D-log dit allmain). JS un caller. Pas de double closeup par tour sauf si un autre port appelle closeup (camera). Camera photo=true vs nearby photo=false : nearby ne photographie pas. Un monstre adjacent vu puis photographié : seen_close déjà 1, closeup camera fait quand même le bras photo (C see_monster_closeup ne skip pas photo si seen_close). JS closeup : seen_close set, **puis** photo block séparé. **Match.** Nearby skip si seen_close **avant** d’appeler closeup : camera plus tard appelle closeup directement (pas nearby). Photo possible. C identique.

`rn1(31,15)` seer : **avant** nearby. C vicinity map (omis) serait aussi avant. Si vicinity tirait du RNG display, pas ISAAC. `rn1` positionnel : inchangé.

Hook chaque tour : un `canseemon` bugué qui `rn2` Hallu casserait **toutes** les sessions dès D-1000. Cadence #1270 est **avant** ce commit. Prochaine cadence #1275 (hors fourchette). Ce hash n’a pas de full suite post-hook. Cohort 10/11 = unique filet. Process : un hook allmain **aurait dû** amortir une cadence ; playbook « full sessions on shared/startup/display ». see_nearby est display-adjacent. **Sous-cadencé.**


Grep `git show c301e764 -- js/` : `NODIAG` contexte mon.js ; pas FORCE/fs/fastforward. Frozen non touchés. Prompt pray string identique C. `PARANOID_CONFIRM` bit défaut off = pas de getlin public.

Playbook « full sessions on shared/startup/display » : see_nearby est display-adjacent et **chaque tour**. L’absence de cadence #1271 (pas %5) est permise, mais le cohort 10/11 est mince pour un hook allmain. Flag process, pas constitution.


`dopray` wizard Force-the-gods : hunk ne le touche pas. Confirm cancel n’atteint pas wizard yn. C.

`see_nearby` `isok_xy` : bords. C `isok`. Un héros en (1,1) : 4-5 cells valides pas 9. Match.

`m_at` sur case héros : null. Steed : C `u.usteed` n’est pas `m_at(u.x,u.y)` classique (steed extra). JS `m_at` peut rater le steed. Named ? Non. **Dette** closeup steed adjacent-occupé. C `m_at` non plus le steed sous le héros (usteed séparé). RAS si JS pareil.

`notonhead` worm : `x !== mtmp.mx`. Queue worm sur case adjacente. C. Photo false. seen_close TAIL.

Cohort 10/11 : probablement green + quelques seeds dont 0009 fail. see_nearby chaque tour sur seed8000 : si PASS, closeup n’a pas cassé l’écran starter. Preuve **minimale** acceptable pour Confirm (delta nul) ; **mince** pour le hook.


`closeup_Hallucination` / Blind : **dupliqués** de D-0999, pas un troisième Blind. Divergence youprop se partage nearby+camera.

`game.bhitpos` init `{x:0,y:0}` si absent. C `gb.bhitpos` toujours vivant. JS défensif. `notonhead` worm s’appuie dessus pour TAIL dans closeup. Nearby set bhitpos **avant** closeup. C identique.


`PARANOID_CONFIRM` import pray.js : utilisé. Bits null → Confirm false. Pray bits null → paranoidPray true. Asymétrie volontaire (Pray défaut on, Confirm défaut off). C initoptions : PRAY on, CONFIRM off. Match newgame. Overlay wipe bits : JS plus prompt-pray que C (C zero bits = pas ParanoidPray). Bord session.

`see_nearby` n’appelle pas `transient_light_cleanup` (named). Un flash caméra D-0999 + nearby même tour : lumières transitoires C cleanup elsewhere. JS omit. Dette display.


`moveloop_core` `if (g.context.move)` : nearby seulement si le tour avance. C « actual time passed ». Un cancel move (`context.move=0`, D-1001 Hit) **ne** closeup **pas** ce tour. C identique (move false skip le bloc). Interaction D-1001 : refuse attack → pas de time-passed → pas de nearby. Match C.

`seer_turn` refresh **même sans** Clairvoyant (C maintient le compteur). JS hunk refresh inconditionnel dans le `if moves >= seer_turn`. C aussi incrémente toujours. `rn1` chaque ~30 tours. Nearby **chaque** time-passed, pas seulement seer. C closeup hors du `if seer`. JS hunk : nearby **après** le if seer, toujours dans time-passed. **Match.**


`pray.js` header envelope mis à jour : « ParanoidConfirm "yes" » retiré des named omit. Honnête. `pleased pat_on_head` etc. restent omis. Pas un « dopray complete ».

Index D-1000 « after seer_turn » : le code est après le **bloc** seer, pas dedans. Lecture correcte.


`allmain.js` import `see_nearby_monsters` depuis `mon.js` : 1:1 C `allmain.c` includes/extern. Pas de cycle nouveau.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7.5/10**
- Si je ne devais retenir qu’une critique : Confirm défaut off laisse #pray en yn C-fidèle, et la boucle 3×3 est du C, mais accrocher `see_nearby_monsters` « en fin de time-passed » **avant** d’avoir lava/pool, c’est poser un piège d’ordre pour le prochain cluster allmain.
