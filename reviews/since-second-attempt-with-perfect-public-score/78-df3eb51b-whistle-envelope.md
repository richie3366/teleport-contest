# Review 78 — `df3eb51b` — apply whistle tin / magic / eucalyptus

## Métadonnées
- Hash complet / court : `df3eb51bd6faad29ae2f93988d80cbd0f794eb74` / `df3eb51b`
- Parent : `5a6d38f458b0c2e954a57c545649397d2e8a5e56`
- Auteur, date : Raphaël Hervier, 2026-07-22 05:59:17 +0200
- D-id : D-1007
- Stats : 13 files, +410/−38
- JS : `apply.js`, `const.js` (`PLNMSG_enum`), `mon.js` (`wake_nearby` petcall), `mondata.js` (`can_blow`), `teleport.js` (`tele_to_rnd_pet`), `vault.js` (`vault_summon_gd`)

## Intention vs livrable
Retirer l’omit TIN/MAGIC whistle + `can_blow`, `wake_nearby` whistletime, `vault_summon_gd`, `tele_to_rnd_pet`. Le doapply ne tombe plus sur « don't know how to use ». Envelope C `apply.c` cases MAGIC/TIN/EUCALYPTUS portée, avec les callees listés. Pas de cadence collée.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/apply.js` | `use_whistle` / `use_magic_whistle` / `magic_whistled` / eucalyptus ; helpers HowMany/upstart/Yobjnam2/Deaf |
| `js/mon.js` | `wake_nearto_core(..., petcall)` ; export `wake_nearby` |
| `js/mondata.js` | `can_blow` |
| `js/teleport.js` | `tele_to_rnd_pet` reservoir sample |
| `js/vault.js` | `vault_summon_gd` |
| `js/const.js` | `PLNMSG_enum` sentinelle last_msg |

## Fidélité C ↔ JS

### `can_blow` — `mondata.c:567`

C : `(is_silent(ptr) \|\| msound==MS_BUZZ) && (breathless \|\| verysmall \|\| !has_head \|\| mlet==S_EEL)` ; you + `Strangled` → false.

`is_silent` = `msound == MS_SILENT` (`mondata.h`). JS utilise `mon_msound(mtmp)` (inférence S_DOG etc.). Un poly silent table vs inférence bark : C refuse le sifflet ; JS l’autorise (ou l’inverse). D-log nomme « full is_silent tables ». `Strangled` : JS `u.Strangled \|\| EStrangled` vs macro C.

### `use_whistle` — `apply.c:476`

C :
- !can_blow → incapable (pas wake) ;
- else Underwater → bulles (pas wake) ;
- else Deaf tickle / « high|shrill whistling » ; `wake_nearby(TRUE)` ; cursed → `vault_summon_gd`.

JS : mêmes early-return ; pitch cursed `shrill` else `high` ; `await wake_nearby(true)` ; cursed `vault_summon_gd()`. **Soundeffect sauté** (nommé, pas RNG). `yname` local déjà dans apply.js.

### `use_magic_whistle` — RNG cursed

C : !can_blow ; **else if `cursed && !rn2(2)`** : pline `very ` si Underwater + Deaf vibration vs humming ; `wake_nearby(TRUE)` ; **`if (!rn2(2) && !noteleport_level) tele_to_rnd_pet()`** ; else magie : adj Hallu/Underwater/strange + `magic_whistled`.

JS : même `cursed && !rn2(2)` ; second `!rn2(2) && !noteleport_level` ; adj hallu / `strange, high-pitched` / `strange`. Deaf non-cursed : C `You(alt_whistle_str, adj)` = `produce a %s, sharp vibration.` JS : `produce a ${adj}, sharp vibration.` **Conforme.**

Court-circuit : `rn2(2)` cursed **toujours** si cursed (pas derrière can_blow fail — C : can_blow fail **skip** le rn2). JS : can_blow return **avant** le `rn2` — identique.

### `magic_whistled`

C : stasis_until ≥ moves return ; copie `fmon` via `nextmon` (trap peut tuer) ; tame && !steed ; clear mtrapped + `fill_pit` ; oseen/`y_monnam` ; seemimic ; `mnexto(already ? RLOC_NONE : RLOC_MSG)` ; si bougé : mundetected clear ; `last_msg = PLNMSG_enum` ; `mintrap` luck-1 si kill ; si last_msg changé → trapped++ continue ; compteurs shift/appear/disappear ; discover si !already && shift+appear+trapped&gt;0 ; sinon HowMany cumulative.

JS : `[...fmon]` copie (bon réflexe). HowMany C macro copiée (`sqrt(-1)` / two / three / four / several / many). `PLNMSG_enum` JS = dernier+1 de **leur** chaîne PLNMSG — valeur numérique ≠ C possible, mais set/compare **local** : OK tant que mintrap écrit `iflags.last_msg`. D-log : « last_msg detection when pline does not set iflags » — si mintrap pline sans toucher last_msg, C et JS divergeraient de la même façon… sauf si C pline pose last_msg et JS non (dette display).

### `wake_nearby(TRUE)` — `mon.c:4367`

C : `wake_nearto_core(ux, uy, ulevel*20, petcall)` ; dans le rayon : `wake_msg` ; `msleeping=0` ; WAITMASK ; si `mon_moving \|\| !petcall` continue ; sinon tame → `EDOG.whistletime = moves` + `mon_track_clear` ; **puis** `disturb_buried_zombies`.

JS : rayon `ulevel*20` ; **pas** `wake_msg` (nommé) ; whistletime + clear `mtrack` ; **pas** buried zombies. Si `wake_msg` a du RNG, miss. `wake_nearto(x,y,d)` public inchangé (petcall false) — callers existants OK.

### `tele_to_rnd_pet` — `teleport.c:814`

C : noteleport → `impossible` return ; reservoir `!rn2(cnt)` sur tame !DEAD !offmap ; si pet && !m_next2u : `tx = mx+rn2(3)-1` (idem y) ; teleok → `teleds(TELEDS_TELEPORT)`. **Un seul** essai 3×3.

JS : noteleport return silencieux ; `mstate !== MON_FLOOR` ≡ `mon_offmap` ; même `rn2(cnt)` puis **deux** `rn2(3)`. Ordre LTR mx puis my : C `tx = ... rn2(3)-1, ty = ... rn2(3)-1` virgule — clang LTR **tx puis ty**. Identique.

### Eucalyptus — `apply.c:4309`

C : blessed → `use_magic_whistle` **puis** `!rn2(49)` → si !Blind `Yobjnam2(glow)` + **`hcolor("brown")`** + bknown ; `unbless`. Sinon tin whistle.

JS : même `!rn2(49)` après magic. Glow : `` `${Yobjnam2_apply(obj,'glow')} brown.` `` — **pas `hcolor`**. D-log nomme « Hallu hcolor ». Sous Hallucination C `hcolor` tire du RNG (souvent display stream) ; JS texte fixe `brown`.

doapply : MAGIC puis TIN puis EUCALYPTUS (C switch, ordre if JS sans collision otyp). Retour `true` (ECMD_TIME) même si can_blow fail — C `use_*` void, `doapply` res reste TIME pour ces cases. À vérifier vs C `res` initial : souvent TIME après getobj. Acceptable.

### `vault_summon_gd`
C : `if (vault_occupied(u.urooms) && !findgd()) u.uinvault = VAULT_GUARD_TIME-1`. JS identique `|0`. `VAULT_GUARD_TIME` doit exister dans vault.js. Si `urooms` JS n’est pas une string C-like, `vault_occupied` préexistant peut déjà être faux — alors le sifflet maudit en vault ne spawn jamais, **sans RNG** (pas de jet ici).

### `mnexto` already discovered
C `mnexto(mtmp, !already_discovered ? RLOC_MSG : RLOC_NONE)`. JS `already ? RLOC_NONE : RLOC_MSG`. Identique. `already = objects[otyp].oc_name_known`. JS `game.objects?.[obj.otyp]?.oc_name_known`. Si `makeknown` pose un autre champ, discover path vs cumulative path se trompe — **RLOC_MSG consomme des plines/RNG rloc** quand undiscovered.

### Eucalyptus `unbless` / Blind
C `if (!Blind)` glow puis `unbless` **toujours** si `!rn2(49)` (unbless hors du if Blind). JS : if !Blind pline+bknown ; `unbless(obj)` hors du if — conforme. `rn2(49)` **après** `use_magic_whistle` qui a déjà pu tirer beaucoup (mnexto × pets). Ordre C.

`Yobjnam2_apply` : `Your ${xname} glows` vs C `Yobjnam2(obj,"glow")` qui gère pluriel/stack. Une feuille unique : OK.

## Constitution / playbook
Grep RAS. Rule #2 OK. `PLNMSG_enum` n’est pas un hardcode de seed. Helpers HowMany/upstart dupliqués (C macros locales apply.c : OK). `wake_nearby` nouvel export : callers whistle seulement au commit. Signature `wake_nearto(x,y,d)` préservée.

## Densité (§2b)
**Right size.** Envelope apply + callees C listés dans CURRENT (saddle/whistle). Pas de vault « polish » hors `vault_summon_gd`. +410 = corps `magic_whistled` (messages) plus helpers. Correct.

## Documentation
D-1007 Status fixed. Symptom : TIN/MAGIC/blessed EUCALYPTUS fell through to don't-know. Deferred : Soundeffect ; **Hallu hcolor on eucalyptus brown glow** ; mintrap last_msg si pline ne set pas iflags ; full is_silent pour poly can_blow.

hcolor **nommé** — rare honnêteté. CURRENT next `use_saddle`. Journal #1278 apply/pet 15/16. `turns.md` +2/−1. Pas de cadence. INDEX sans 44/44 fantaisiste.

`const.js` `PLNMSG_enum = PLNMSG_MON_TAKES_OFF_ITEM + 1` : doit rester **dernier** de l’enum JS. Ajouter un PLNMSG après sans déplacer enum cassera le sentinelle (self-consistent tant que set=check).

## Vérification
Green + apply/pet 15/16. Sifflet magique / eucalyptus probablement hors sessions publiques. Non-régression.

## Risques / dette
1. `hcolor("brown")` sauté — Hallu eucalyptus.
2. `can_blow` via `mon_msound` inféré.
3. `wake_msg` / buried zombies.
4. `PLNMSG_enum` numérique local vs C si un autre code compare des codes C.
5. `Yobjnam2` / vtense simplifiés (`glow`→`glows`).

## Complément — `magic_whistled` messages et `HowMany`

C HowMany n’est utilisé que pour n&gt;1 dans les buffers cumulatifs. JS identique (`if (shift > 1) HowMany`). n=1 garde le `y_monnam` du premier. C `upstart(shiftbuf)` capitalise. JS `upstart` charAt 0 toUpperCase — ASCII only ; un nom UTF8 OK. Virgules « shifters, appearers and disappearers » : JS `shift && appear ? ',' : ''` + `and` — recopié du C `disappear ? "," : " and"`. Risque off-by-one anglais, pas RNG.

`iflags.last_msg = PLNMSG_enum` **avant** mintrap : sentinelle. Si mintrap JS n’écrit jamais `last_msg`, trapped++ jamais, luck-1 quand même si `Trap_Killed_Mon`. C luck-1 sur kill **indépendamment** du last_msg ; last_msg ne fait que skip le comptage appear/shift. JS :

```
if ((await mintrap(...)) === Trap_Killed_Mon) change_luck(-1);
if (last_msg !== PLNMSG_enum) { trapped++; continue; }
```

Ordre identique. `Trap_Killed_Mon` import trap.js : valeur doit matcher C.

`stasis_until >= moves` : magic whistle no-op **sans RNG** (return avant la boucle pets). C identique. Un niveau stasis : apply TIME quand même (doapply return true). C doapply MAGIC_WHISTLE `use_magic_whistle` void, res probablement déjà TIME.

`can_blow` false : JS pline + return **sans** `rn2` cursed. C `if (!can_blow) You(...); else if (cursed && !rn2(2))`. Identique : pas de jet si incapable.

## Tableau branches (D-1007)

| Bras | RNG C | JS |
|---|---|---|
| tin can_blow fail | aucun | aucun |
| tin Underwater | aucun | aucun |
| tin wake_nearby | wake_msg ? | **wake_msg omit** |
| tin cursed vault | aucun | identique |
| magic cursed | !rn2(2) puis maybe !rn2(2) tele | identique |
| tele_to_rnd_pet | rn2(cnt) puis rn2(3)×2 | identique LTR |
| magic_whistled stasis | aucun | identique |
| mnexto × pets | rloc interne | identique flags RLOC |
| eucalyptus | !rn2(49) puis hcolor | **hcolor omit** |
| HowMany | macro locale | copie |

`wake_nearby(true)` whistletime = `game.moves` : C `svm.moves`. Si JS moves retardé d’un tick vs C EOT, les pets réagissent un tour à côté — préexistant clock.

C `use_magic_whistle` (`apply.c:495`) :

```495:514:nethack-c/upstream/src/apply.c
    if (!can_blow(&gy.youmonst)) {
        You("are incapable of using the whistle.");
    } else if (obj->cursed && !rn2(2)) {
        You("produce a %shigh-%s.", Underwater ? "very " : "",
            Deaf ? "frequency vibration" : "pitched humming noise");
        wake_nearby(TRUE);
        if (!rn2(2) && !noteleport_level(&gy.youmonst))
            tele_to_rnd_pet();
    } else {
        You(Deaf ? alt_whistle_str : whistle_str, ...);
        magic_whistled(obj);
    }
```

Trois issues RNG : (1) `can_blow` false → zéro jet ; (2) cursed et premier `rn2(2)==0` → wake + éventuellement second `rn2(2)` + `tele_to_rnd_pet` (`rn2(cnt)` + deux `rn2(3)`) **sans** `magic_whistled` ; (3) sinon `magic_whistled` (mnexto × pets, pas les jets cursed). JS recopie cet arbre. Un sifflet **non** cursed n’appelle **jamais** `rn2(2)` — court-circuit `obj->cursed &&`. Identique.

`tele_to_rnd_pet` C : reservoir sampling `if (!rn2(cnt++)) pet = mtmp` sur les tame floor. `cnt` commence à 0 ; premier pet `!rn2(1)` toujours pris ; ensuite `rn2(2)`, `rn2(3)`, … JS identique. **Puis** si pet et `!m_next2u` : un seul essai `mx+rn2(3)-1`, `my+rn2(3)-1`, `teleok` sinon abandon. Pas de retry. JS identique LTR.

Tin cursed : **pas** de `rn2`. Seulement `vault_summon_gd` si `vault_occupied && !findgd` — pose `uinvault = VAULT_GUARD_TIME-1`. Zéro jet. JS identique. Le sifflet étain maudit en vault n’est pas un événement RNG ; c’est un timer.

Eucalyptus C : `use_magic_whistle` **d’abord** (tous les jets ci-dessus) **puis** `!rn2(49)` glow. JS identique. Hallu : C `hcolor("brown")` peut tirer dans la table couleurs ; JS `"brown"` fixe. D-log le nomme. Sous Hallucination, **un** `rn2` display manquant **après** toute la séquence magic whistle — décalage tardif, pas un skip au milieu de `magic_whistled`.

`can_blow` C `mondata.c` : silent/buzz **et** (breathless | verysmall | !has_head | S_EEL) ; you + Strangled → false. JS `mon_msound` inféré (même dette D-1005). Un héros poly chien : table `MS_BARK` C peut souffler ; inférence JS aussi bark. Un poly silent-table que JS infère bark : C incapable (pas de `rn2` cursed) ; JS capable (**jets extra**). Inverse : C souffle, JS refuse (jets manquants). C’est le vrai risque RNG du peel, pas l’enveloppe cursed.

`wake_nearby(TRUE)` pose `EDOG.whistletime = moves` seulement si `petcall && !mon_moving`. JS : `whistletime = game.moves` + clear `mtrack`. Les pets sifflés suivent. **Sans** `wake_msg` : un dormant adjacent peut se réveiller **silencieusement** (pas de « The foo wakes! »). Si `wake_msg` C n’a pas de RNG (pline only), keystream OK. Buried zombies C après la boucle : JS sauté — un sifflet au-dessus d’une tombe C peut réveiller ; JS non. Rare public.

`const.js` `PLNMSG_enum` : sentinelle `last_msg` **avant** `mintrap`. Si un autre peel ajoute un `PLNMSG_*` **après** `PLNMSG_MON_TAKES_OFF_ITEM` sans bouger enum, `magic_whistled` croit à un trapped++ faux. Contrat local documenté.

Tin `use_whistle` : C `wake_nearby(TRUE)` **toujours** si can_blow && !Underwater, cursed ou non. Le cursed tin n’ajoute que `vault_summon_gd`. JS identique. Pas de `rn2` tin. Magic cursed est le **seul** bras whistle avec `rn2(2)` envelope.

`HowMany` JS copie le macro C (`sqrt(-1)` → « a strange number of »). n=0 ne devrait pas l’appeler. n=1 hors HowMany. OK.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **8/10**
- Si je ne devais retenir qu’une critique : **l’enveloppe cursed `!rn2(2)` / second `!rn2(2)` / eucalyptus `!rn2(49)` / reservoir `rn2(cnt)` est le C** ; la dette utile est `hcolor` + `can_blow` inféré, déjà partiellement avouée.
