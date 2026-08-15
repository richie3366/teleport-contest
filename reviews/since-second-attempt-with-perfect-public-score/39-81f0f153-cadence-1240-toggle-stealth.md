# Review 39 — `81f0f153` — cadence #1240 **et** `toggle_stealth` (D-0970)

## Métadonnées
- Hash complet / court : `81f0f153380294f52020c064bd7f6125c36899a9` / `81f0f153`
- Parent : `4e4ac06b59c3a3a44dcd6f574b12f24d4b646804`
- Auteur, date : Raphaël Hervier, 2026-07-22T01:00:31+02:00
- D-id : **D-0970** (cadence **#1240** dans le même commit)
- Stats : 11 files, +211/−66
- Fichiers JS / map / cadence : `js/do_wear.js` (+156), `js/eat.js` (+4), `js/polyself.js` (`await Boots_off`) ; `docs/c-js-map/debt.md`, `turns.md` ; CURRENT 44/44 @#1240, Scr 11405, RNG 100%, `31+0.26/turn`

## Intention vs livrable
Titre : « Refresh #1240 suite score **and** port toggle_stealth (D-0970) ». Même mélange cadence+port que D-0965/#1235. Playbook / `00-INSTRUCTIONS.md` : **flagger**.

Le port lui-même est le follow-on **nommé** de D-0966 (STEALTH omit) : `toggle_stealth`, Ring_on/off `RIN_STEALTH`, Cloak/Boots ELVEN, `Cloak_off` DISPLACEMENT, `confer_oc_oprop` STEALTH→`EStealth`, Cloak_off/Boots_off async. D-id présent. Titre large mais honnête sur le mix.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/do_wear.js` | Port C : `toggle_stealth`, `toggle_displacement` ; wiring Ring/Cloak/Boots ; miroir `EStealth` |
| `js/polyself.js` | Wiring : `await Boots_off` (break_armor) |
| `js/eat.js` | Docs : retire « toggle_stealth deferred » |
| CURRENT | Cadence #1240 44/44 |
| map / D-log | D-0970 ; Boots_off SPEED/water/lev encore omit |

## Fidélité C ↔ JS

### `toggle_stealth` — `do_wear.c:107` → `js/do_wear.js`
C :

```c
    if (on ? gi.initial_don : svc.context.takeoff.cancelled_don)
        return;
    if (!oldprop && !HStealth && !BStealth) {
        if (obj->otyp == RIN_STEALTH)
            learnring(obj, TRUE);
        else
            makeknown(obj->otyp);
        if (on) {
            if (!is_boots(obj))
                You("move very quietly.");
            else if (Levitation || Flying)
                You("float imperceptibly.");
            else
                You("walk very quietly.");
        } else {
            boolean riding = (u.usteed != NULL);
            You("%s%s are noisy.", riding ? "and " : "sure",
                riding ? x_monnam(...) : "");
        }
    }
```

JS : skip `on ? game._initial_don : takeoff.cancelled_don` ; gate `!oldprop && !hStealth && !bStealth` (H via `HStealth|uprops.intrinsic`, B via `BStealth|uprops.blocked`) ; ring `learnring` else `makeknown` ; on : `!is_boots` quiet / boots+Lev|Fly float / walk ; off : `You and <steed> are noisy.` / `You sure are noisy.`

**Confirmation branch-par-branch.** Pas de RNG dans C ni JS. Format `%s%s` : « and » + nom sans espace parasite ; « sure » + "" → « You sure are noisy. » JS template équivalent.

`x_monnam(..., SUPPRESS_SADDLE|SUPPRESS_HALLUCINATION)` — JS passe les mêmes flags. Si `x_monnam` JS ignore SUPPRESS, le off-msg peut hallu/selle. Dépendance caller, pas un skip.

### `gi.initial_don` / `set_wear`
C `set_wear` pose `gi.initial_don` pendant le don initial (pas de « you move quietly » au start). JS `game._initial_don = all` dans `set_wear` puis clear. **Callers branchés.** Ring_on pendant `set_wear` skip stealth msgs — comme C.

`cancelled_don` : takeoff annulé ne doit pas noisy-off. JS lit `game.context.takeoff.cancelled_don`. **Confirmation** si le flag est posé par le même chemin cancel (préexistant).

### Ring_on / Ring_off — `do_wear.c:1282` / `1379`
C on : `toggle_stealth(obj, oldprop, TRUE)` avec `oldprop` déjà masqué si pas les deux anneaux. JS `await toggle_stealth(obj, oldprop, true)` — **plus le stub D-0966**.

C off : **après** `setworn` : `toggle_stealth(obj, (EStealth & ~mask), FALSE)`. JS :

```js
await toggle_stealth(obj, (u.EStealth | 0) & ~mask, false);
```

Si `setworn` a déjà strip `EStealth` via `confer_oc_oprop`, `(EStealth & ~mask) === EStealth` (mask déjà parti). C calcule `EStealth & ~mask` **après** setworn aussi — `EStealth` C est l’extrinsic à jour. **Équivalent** ssi le miroir `EStealth` JS est à jour (voir `confer_oc_oprop`). **Confirmation d’ordre** vs un appel **avant** setworn qui verrait encore le bit.

### Cloak_on/off ELVEN / DISPLACEMENT
C Cloak_on ELVEN : `toggle_stealth(uarmc, oldprop, TRUE)` avec `oldprop = extrinsic & ~WORN_CLOAK` **avant** effets. JS Cloak_on : `oldprop = extr & ~WORN_CLOAK` puis `toggle_stealth(..., true)`. **Confirmation.**

C Cloak_off : calcule `oldprop` **avant** `setworn(NULL, W_ARMC)`, puis ELVEN `toggle_stealth(otmp, oldprop, FALSE)` ; DISPLACEMENT `toggle_displacement`. JS Cloak_off devient **async**, oldprop strip WORN_CLOAK, ELVEN + DISPLACEMENT off. Mummy/invis/alchemy **toujours deferred** (D-log).

### Boots_on/off ELVEN
C Boots_on ELVEN `toggle_stealth(uarmf, oldprop, TRUE)`. JS Boots_on ELVEN analog. C Boots_off ELVEN après setworn. JS `oldprop = extr & ~WORN_BOOTS` puis toggle false.

C Boots_off fait **aussi** SPEED slow-down, water-walking `spoteffects`, FUMBLE clear, LEVITATION `float_down`. JS Boots_off reste **ELVEN-centric** — SPEED/water/lev **named omit**. Un hero qui retire des speed boots n’a pas encore « you slow down ». Hors cluster stealth, honnête.

### `confer_oc_oprop` STEALTH → `EStealth`
C `EStealth` ≡ `u.uprops[STEALTH].extrinsic`. Lecteurs `Stealth` combinent H/E/B. JS `setworn` n’écrivait pas le flat `u.EStealth`. D-0970 :

```js
if (on) u.EStealth = (u.EStealth | 0) | mask;
else u.EStealth = (u.EStealth | 0) & ~mask;
```

sans ça, `toggle_stealth` off `(EStealth & ~mask)` et les lecteurs `Stealth()` divergent. **Wiring nécessaire**, pas du cosmétique. Autres props (Blind/Fast/Telepat) déjà miroir — STEALTH aligné.

### Cloak_off / Boots_off async
`armoroff` / `remove_worn_item` / polyself `break_armor` `await Boots_off`. Pas de nouvel await hors pline. **Callers branchés** (polyself +1). Oublier un caller sync casserait un take-off cloak.

## Constitution / playbook
Grep JS : pas FORCE/DIAG/traces/fs/node:/fastforward/seeds. Frozen non touchés. Rule #2 OK. `toggle_stealth` async via pline seulement. Module `do_wear.js` ↔ `do_wear.c`. **RAS** constitution JS. **PROCESS** : mélange cadence #1240 + port.

## Densité (§2b)
Right size **pour le port** (famille stealth D-0966 omit + EStealth). 156 lignes do_wear. Pas too-small. Too mixed **process** (CURRENT dans le même hash). Pas too-big (pas Boots SPEED dans ce commit — bon split).

## Documentation
D-0970 « fixed » pour toggle_stealth + EStealth — **vrai**. Deferrals sink-fall, Boots_off SPEED/water/lev, cloak mummy/invis/alchemy, music earthquake. `debt.md` retire stealth. CURRENT #1240 chiffres. Pas d’overclaim « wear complete ».

## Vérification
Journal : green+strict ; wear/steed **20/20** (seed0116/0103/0104/0004/0360) ; **full sessions 44/44 @#1240** Scr 11405 RNG 100% `31+0.26/turn`. Cohorte wear **sans seed0009**. D-1015 (log) : fuite `EStealth` après stash tutoriel, **rendue visible par ce miroir** `confer_oc_oprop` STEALTH. Ranger cape elfe → death attributes « You were stealthy. » (Scr 72/73, RNG plein). Le 44/44 dans le **même** SHA que le port n’est donc pas une preuve post-`EStealth` (mesure avant le port, ou latence jusqu’au cohort D-0972). Dire « ne pas attribuer la fuite à D-0970 sans D-log » est **faux** : le D-log D-1015 **est** ce D-log causal.

Même smell que #1235 : CURRENT et C dans un hash. Ici le port est **plus petit** (156 lignes) que ice/burn (409) — tentation « cadence + petit wiring ». Contre-argument : STEALTH était **named omit D-0966** ; EStealth mirror change les lecteurs `Stealth()` (déplacement discret, D-check). Pas un comment-only. La cadence 44/44 **valide** le wiring sous suite, ce qui n’excuse pas le mix.

## Cloak_off / Boots_off async — callers
C `Cloak_off`/`Boots_off` sont `int` sync (plines). JS async. Callers patchés : `armoroff`, `remove_worn_item`, polyself `break_armor`. Un caller oublié (ex. `cancel_don`, lava_effects Boots_off récursif) resterait sync→Promise ignored. C lava_effects appelle `Boots_off` sous `in_lava_effects`. JS Boots_off ELVEN-only n’a pas encore le bras lava — **omit nommé**, pas un await oublié sur ce bras.

`toggle_displacement` porté « au passage » avec stealth cloak. Densité : même fichier `do_wear.c` cloak switch. Acceptable. Pas un second sous-système.

## Risques / dette
1. **Mélange cadence+port** — 44/44 non distinguishable du pré-port.
2. **seed0009 / EStealth** — cause racine de la brèche 43/44 (D-1015).
3. Boots_off SPEED/water/lev/`float_down` encore omit.
3. Cloak mummy/invis/alchemy.
4. `x_monnam` flags SUPPRESS.
5. Displacement timed (obj null) partiel.
6. sink-fall (D-0966) toujours ouvert.


## `oldprop` cloak/boots
C Cloak_off :

```c
    long oldprop = u.uprops[objects[otyp].oc_oprop].extrinsic & ~WORN_CLOAK;
    setworn((struct obj *) 0, W_ARMC);
    switch (otyp) {
    case ELVEN_CLOAK:
        toggle_stealth(otmp, oldprop, FALSE);
```

`oldprop` **pré-setworn** strip WORN_CLOAK : si un anneau STEALTH reste, oldprop ≠ 0 → **pas** de msg noisy (extrinsic encore là). JS `extrinsic & ~WORN_CLOAK` avant clear. **Confirmation.** Inverser (après setworn sans strip) ferait oldprop 0 trop souvent (double noisy) ou jamais.

Ring_off utilise `EStealth & ~mask` **post** setworn. Deux conventions C selon caller — JS les copie toutes les deux. **Ne pas** unifier.

## Feedback gate
Msgs seulement si `!oldprop && !HStealth && !BStealth`. Intrinsic stealth (race elf) : **pas** de « you move quietly » en mettant l’anneau. JS `hStealth` OR uprops. Si elf HStealth n’est pas dans `u.HStealth` mais seulement `uprops[STEALTH].intrinsic`, le OR JS est **nécessaire**. C `HStealth` macro = intrinsic. **Confirmation** de la lecture double.

BStealth (riding blocks stealth) : C quand même off-msg « you and steed are noisy » si gate passed — commentaire JS « Riding blocks stealth via BStealth elsewhere; message still names steed ». Si BStealth set, gate **échoue**, **pas** de noisy. C identique (`!BStealth` dans le if). Le « still names steed » s’applique quand BStealth est **clair** mais usteed non-null (possible ?). Fidélité C, pas un bug JS.

## `makeknown` vs `learnring`
Anneau → learnring (peut known+observe). Cloak/boots → `makeknown(otyp)` seulement. JS identique. Pas de `learnring` sur ELVEN_CLOAK.

## Process
Deuxième mix cadence+port de cette plage (#1235 puis #1240). Pattern loop-agent : « tant qu’à lancer sessions, porter le named omit ». Flag répété. Qualité stealth : ACCEPT-WITH-DEBT si split ; PROCESS-SMELL **parce que** non split.



## `confer_oc_oprop` mask bits
`EStealth |= mask` on, `&= ~mask` off. `mask` est W_RINGL / W_ARMC / W_ARMF selon slot. Deux sources stealth : anneau + cloak, EStealth a deux bits. `toggle_stealth` oldprop non-zéro → pas de msg. JS miroir **nécessaire** pour ce test Ring_off. Sans D-0970, `u.EStealth` 0 toujours → noisy à chaque anneau même avec cloak. **Bugfix lecteur**, pas cosmétique.

Stealth() readers (hack.js stealth checks) : s’ils lisent `u.EStealth` flat et pas uprops, D-0970 **change le gameplay** discret (chien, D-check). Si readers lisent seulement uprops.extrinsic, le flat est redondant sauf toggle_stealth off. Vérifier un reader. Densité justifiée dans les deux lectures.

## eat.js / polyself
eat +4 commentaires. polyself `await Boots_off`. break_armor poly : retirer elven boots doit noisy-off. Caller réel. OK cluster.

CURRENT speed `31+0.26/turn` vs #1235 `30+0.27`. Cadence mesure après stealth. Mix : on ne sait pas si le +1 speed est noise. PROCESS.



## Cloak DISPLACEMENT off
C Cloak_off case CLOAK_OF_DISPLACEMENT `toggle_displacement(otmp, oldprop, FALSE)`. JS async toggle. On path Cloak_on déjà DISPLACEMENT (préexistant / ce hash). Cluster cloak switch, pas un peel displacement isolé.

MUMMY_WRAPPING / INVIS / ALCHEMY encore `break`/omit. C a des plines See_invisible. Named. Un mummy wrap off sans msg « you can see yourself » — visible suite si seed mummy. 20/20 wear peut ne pas l’avoir.

## Boots SPEED omit
C Boots_off SPEED : `You_feel("yourself slow down%s.", Fast ? " a bit" : "")` si `!Very_fast && !cancelled_don`. JS skip. Retirer speed boots : pas de msg, maybe Fast leftover si EFast pas clear par setworn. **setworn confer FAST** probablement déjà (D-0744). Msg only omit. Water boots `spoteffects` omit : drown risk. Named D-log « Boots_off SPEED/water/levitation ».

Levitation boots off C `float_down(0,0)` sauf `in_lava_effects`. JS omit — héros lévitation boots off **reste en l’air** si Ring n’est pas le seul ELevit. Bug réel si seul uarmf. Rare si D-0966 Ring_off float_down existe mais Boots_off non. **Dette wear** post-D-0970.

## `is_boots(obj)`
C `is_boots` macro oclass/otyp. JS helper. Elven cloak on-msg « move very quietly » (`!is_boots`). Elven boots « walk » / « float ». Mauvais `is_boots` → cloak dirait walk. Vérifier obj.class. Probablement OK (otyp ELVEN_BOOTS).

`_initial_don` : si `set_wear` oublie clear, plus aucun stealth msg forever. Diff clear après. **Confirmation.**


## Verdict
- Verdict : **QUALITY-RISK**
- Note : **5/10** (port stealth ~8 ; preuve forteresse 44/44 non crédible)
- Si je ne devais retenir qu’une critique : le miroir `EStealth` est la bonne lecture de C/`youprop.h`, mais coller « suite 44/44 » dans le même commit sans seed0009 dans le cohort a **enterré une régression de forteresse pendant ~40 commits**.
