# Review 13 — `0138ada2` — eatspecial PAPER / potion / eataccessory (D-0946)

## Métadonnées
- Hash complet / court : `0138ada278b3a8051dd09dd17ed5608cdbcf295f` / `0138ada2`
- Parent : `df991a17947baa81769447d35d5b62d0d9c6341b`
- Auteur, date : Raphaël Hervier, 2026-07-21 22:53:28 +0200
- D-id : **D-0946**
- Stats : 10 files, +498 / −31
- Fichiers JS / map / cadence : `js/eat.js` **+421**, `js/wield.js` (trio `uwepgone`), `js/read.js` (`unpunish`), `js/polyself.js` (export `change_sex`) ; pas de cadence suite

## Intention vs livrable
Promet le cluster finish non-food : PAPER, potion, `eataccessory`, leash, trident/flint, `uwepgone`, `unpunish`. Le diff **est** `eatspecial` C + callees nécessaires. CURRENT liste aussi leash/trident/flint/`uwepgone`/`unpunish` — pas du titre marketing vide.

Question densité : trop large ? C’est **une** fonction C (`eatspecial`) plus `eataccessory` / `bounded_increase` / trois gone / `unpunish` / `change_sex`. Pas zap+eat+kick. Large, pas hétérogène.

## Inventaire

| Fichier | Rôle |
|---|---|
| `js/eat.js` | Port `eatspecial` / `eataccessory` / `bounded_increase` / `o_unleash` local / `objdescr_is` |
| `js/wield.js` | Port `uwepgone` / `uswapwepgone` / `uqwepgone` |
| `js/read.js` | Port `unpunish` (C `read.c`) |
| `js/polyself.js` | Wiring : export `change_sex` |
| map / D-log | D-0946 ; `vault_gd_watching` / `Ring_gone` full / `float_up` / `rescham` / `choke` nommés |

## Fidélité C ↔ JS

### `eatspecial` — C `eat.c:2414` / JS `eat.js:2365`
Ordre C après `lesshungry` / clear victual :
1. COIN → useupall/useupf + **`vault_gd_watching(GD_EATGOLD)`** + return
2. `oc_material == PAPER` messages (MAIL ifdef, scare, YUM YUM, else salt)
3. POTION `quan++` + `dopotion` **else if** RING/AMULET `eataccessory` **else if** LEASH `o_unleash`
4. TRIDENT / FLINT exercise
5. uwep/uquiver/uswapwep gone si `quan==1`
6. `uball` `unpunish` ; `uchain` `unpunish` **sans** useup ; else carried `useup` else `useupf(1)`

JS : gold `vault_gd_watching` **omis** (nommé). PAPER : `MAT_PAPER = 5` (objclass C PAPER=5). `SCR_MAIL` ifdef omis. `objdescr_is(..., 'YUM YUM')`. Potion `quan+1` + import `dopotion`. Leash `o_unleash` local. Trident hallu / flint messages. Slot gone + `unpunish`. **Ordre des `if` C respecté**, y compris `else if` potion vs ring (pas les deux).

Chaîne `uchain` : C `if (otmp==uball) unpunish(); if (otmp==uchain) unpunish(); else useup…` — le `else` se rattache au **second** `if`. Manger la **boule** : unpunish **et** useup (sauf si c’est aussi chain). Manger la **chaîne** : unpunish, pas useup. JS reproduit ce `else`. **Piège C copié — bon.**

### `eataccessory` — C `eat.c:2265` / JS `eat.js:2177`
C : `Ring_gone` si worn left/right (sink death possible) ; `observe_object` ; `known=1` ; **`if (!rn2(ring?3:5))`** entre dans le switch (1/3 anneaux, 1/5 amulettes).

JS : `if (rn2(chance)) return;` — effet seulement si `rn2==0`. **Équivalent.** `Ring_gone_subset` au lieu de `Ring_gone` (nommé ; pas de chute sink).

`bounded_increase` : C retranche `uright`/`uleft->spe` si même `otyp` (sauf `RIN_PROTECTION`), caps 10/20/40 avec `rnd`/`rn2`, remet les spe. JS copie. RNG : `rnd(absinc)` puis éventuellement `rn2(absinc)` — **ordre C.**

Default `oc_oprop` : `FROMOUTSIDE` + bras SEE_INVIS / INVIS / PROT_SHAPE / LEVITATION. JS : `set_mimic_blocking` omis ; `perceives` omis ; `rescham` omis ; LEVITATION : C `float_up()` puis timeout `d(10,20)` ; JS **skip `float_up`**, pose quand même `incr_itimeout HLevitation` + uprops. Lévitation sans message/float — nommé.

Anneaux CHA/STR/CON/accuracy/damage/protection + amulette guarding : C. FREE_ACTION → sleep res. CHANGE → `change_sex` exporté. UNCHANGING : C `!Unchanging && Upolyd` ; JS ajoute `!((HUnchanging)&FROMOUTSIDE)` — **garde en trop** si `u.Unchanging` est déjà la macro complète.

`AMULET_OF_STRANGULATION` : C **`choke(otmp)`**. JS `break` vide. D-log le nomme. Manger l’amulette de strangulation : **pas de choke**. Ce n’est pas « no permanent effect » : choke est l’effet.

RESTFUL_SLEEP : `rnd(100)` vs old TIMEOUT — JS copie. LIFE_SAVING / FLYING / REFLECTION / SUSTAIN : no-op C et JS.

### `uwepgone` trio — C `wield.c:873+` / JS `wield.js:272`
C `uwepgone` : artifact_light `end_burn`, `setuwep(0)`, `unweapon=TRUE`, `update_inventory`. JS : skip light, `setuwep(null)`, `gu.unweapon=true`. Swap/quiver : `set* (null)`. Callers : `eatspecial` seulement ici. Autres C (`uwepgone` avant destroy) non audités.

### `unpunish` — C `read.c:3066` / JS `read.js:722`
C : chaîne détruite, boule libérée (pas détruite). JS : `setworn(null, W_CHAIN)` ; `delobj(savechain)` ; `setworn(null, W_BALL)`. Omis : `newsym` / monstre sous chaîne (nommé). Risque : boule pas reposée au sol comme C `placebc` inverse.

## Constitution / playbook
Grep JS : RAS FORCE/fs/fastforward. `dopotion` dynamique. `await` = pline / dopotion / adjattrib. Rule #2 RAS. `o_unleash` dupliqué localement dans `eat.js` (apply.js en a un export) — évite un cycle, pas un 1:1 file.

## Densité (§2b)
**Right size, trop gros d’un cran.** Playbook ~50–300 LOC ; **+421 `eat.js`** dépasse. Mais un seul locus C `eatspecial` + callees **appelés par cette fonction**. Pas too-wide au sens zap+shop+eat. Pas too-small. Helper wield/read/polyself justifiés (sans eux le finish useup casse les slots).

Ce n’est pas QUALITY-RISK « sous-systèmes sans lien ». C’est un cluster dense, limite supérieur §2b.

## Documentation
D-0946 « full eatspecial » dans l’esprit CURRENT, D-log plus honnête (choke/float_up/rescham/vault). Map retire PAPER/potion. Overclaim : « without stubs » dans le sujet alors que choke/float_up/`vault_gd` **sont** des stubs. Status « fixed » + liste de not-yet = dette assumée, pas « complete » naïf.

## Vérification
Journal : green+eat/role 12/12. Poly diets PAPER/potion/ring hors seeds publics typiques. `rn2(3/5)` eataccessory non prouvé par le cohort. Fortress non recadencée.

## PAPER / `objdescr_is`

C `objects[otmp->otyp].oc_material == PAPER`. JS `game.objects?.[otmp.otyp]?.oc_material ?? 0` vs `MAT_PAPER=5`. Si `generated/objects` omet `oc_material`, tout est 0 → jamais « Needs salt... ». Préexistant extract objets.

`objdescr_is` ajouté dans eat.js : compare `OBJ_DESCR`. C `objdescr_is(otmp, "YUM YUM")` après le test scare (ordre : scare **avant** descr, pour qu’un scare dont le descr serait YUM YUM reste « Yuck »). JS : scare d’abord, puis scroll+YUM YUM, else salt. **OK.**

MAIL ifdef : C message junk mail. JS skip — scroll mail (s’il existe) → « Needs salt... ». Nommé.

## Potion `quan++`

C `otmp->quan++` parce que `dopotion` fait `useup`. Si JS `dopotion` **ne** useup **pas**, l’objet reste avec quan+1 (pile fantôme). Si JS `dopotion` useup **deux** fois, potion disparaît trop tôt. Le commentaire JS copie C. Non relu `potion.js` dans ce commit. Risque d’invariant.

`else if` RING/AMULET : une potion n’est jamais `eataccessory`. OK.

## `o_unleash`

C `apply.c`. JS fonction **locale** eat.js (apply.js a déjà un export, utilisé par `dig.js`). Deux copies. Si elles divergent (mleashed vs leashmon), leash mangée vs volée se comportent différemment. Densité : duplication pour cycle import.

## `change_sex`

Export only. C `polyself.c` : flip `flags.female` / `mfemale`. Eat AMULET_OF_CHANGE : `accessory_has_effect` + `makeknown` + `change_sex` + « You are suddenly very feminine/masculine! ». JS `game.flags?.female` **après** le flip — C `flags.female` après `change_sex`. Ordre OK **si** `change_sex` mute `flags.female` synchrone (pas async). C n’est pas async. JS `change_sex()` sync. **OK.**

Omission C `change_sex` : rename `pl_character` / amorous demon `set_uasmon` — déjà dans le commentaire polyself.

## `uwepgone` callers C

C `uwepgone` aussi hors eat (destroy wielded, etc.). Ce commit **n’ajoute pas** ces callers. Seulement `eatspecial`. Si un autre chemin JS détruisait `uwep` sans gone, préexistant. Trio quiver/swap : même périmètre.

`artifact_light` : C éteint la lumière d’artéfact avant `setuwep(0)`. JS : lampe artéfact mangée peut rester « allumée » dans le moteur lumière. Nommé.

## Densité : décompte

`eat.js` +421 n’est pas que `eatspecial` : `Ring_gone_subset`, `bounded_increase`, `accessory_has_effect`, `eataccessory` switch (~150 LOC C), `objdescr_is`, `o_unleash`, plus le finish. C `eataccessory` seul fait ~145 lignes. Le cluster **est** large parce que C l’est. Playbook §2b « small-file restart » ne s’applique pas. Verdict densité : acceptable **si** on refuse un peel PAPER-only la veille. Trop gros pour un reviewer loop unique — d’où ACCEPT-WITH-DEBT plutôt que QUALITY-RISK.

## Risques / dette
1. **`choke(otmp)` absent** — amulette de strangulation ingérée.
2. **`float_up` / `rescham` / `set_mimic_blocking` / `Ring_gone` sink.**
3. **`vault_gd_watching(GD_EATGOLD)`.**
4. `unpunish` placement boule ; `uwepgone` artifact_light.
5. Densité : relecture plus coûteuse ; un bug `else` chain/ball serait noyé dans 400 lignes.
6. Garde UNCHANGING extra FROMOUTSIDE.
7. `dopotion` useup vs `quan++` non relu.
8. Double `o_unleash` eat vs apply.

## Extraots C `eatspecial` / `eataccessory`

```2424:2453:nethack-c/upstream/src/eat.c
    if (otmp->oclass == COIN_CLASS) {
        if (carried(otmp))
            useupall(otmp);
        else
            useupf(otmp, otmp->quan);
        vault_gd_watching(GD_EATGOLD);
        return;
    }
    if (objects[otmp->otyp].oc_material == PAPER) {
#ifdef MAIL_STRUCTURES
        if (otmp->otyp == SCR_MAIL)
            /* no nutrition */
            pline("This junk mail is less than satisfying.");
        else
#endif
        if (otmp->otyp == SCR_SCARE_MONSTER)
            /* to eat scroll, hero is currently polymorphed into a monster */
            pline("Yuck%c", otmp->blessed ? '!' : '.');
        else if (otmp->oclass == SCROLL_CLASS
                 /* check description after checking for specific scrolls */
                 && objdescr_is(otmp, "YUM YUM"))
            pline("Yum%c", otmp->blessed ? '!' : '.');
        else
            pline("Needs salt...");
    }
    if (otmp->oclass == POTION_CLASS) {
        otmp->quan++; /* dopotion() does a useup() */
        (void) dopotion(otmp);
    } else if (otmp->oclass == RING_CLASS || otmp->oclass == AMULET_CLASS) {
        eataccessory(otmp);
```

RNG accessory :

```2280:2281:nethack-c/upstream/src/eat.c
    if (!rn2(otmp->oclass == RING_CLASS ? 3 : 5)) {
        switch (otmp->otyp) {
```

`bounded_increase` caps C :

```2234:2248:nethack-c/upstream/src/eat.c
    if (absinc == 0 || sgnold != sgninc || absold + absinc < 10) {
        ; /* use inc as-is */
    } else if (absold + absinc < 20) {
        absinc = rnd(absinc); /* 1..n */
        if (absold + absinc < 10)
            absinc = 10 - absold;
        inc = sgninc * absinc;
    } else if (absold + absinc < 40) {
        absinc = rn2(absinc) ? 1 : 0;
        if (absold + absinc < 20)
            absinc = rnd(20 - absold);
        inc = sgninc * absinc;
    } else {
        inc = 0; /* no further increase allowed via this method */
    }
```

JS `eat.js:2074` retranche `uright`/`uleft` spe comme C, **sauf** `RIN_PROTECTION`. `AMULET_OF_GUARDING` bump fixe 2.

Chain/ball C :

```2478:2485:nethack-c/upstream/src/eat.c
    if (otmp == uball)
        unpunish();
    if (otmp == uchain)
        unpunish(); /* but no useup() */
    else if (carried(otmp))
        useup(otmp);
    else
        useupf(otmp, 1L);
```

`choke` C sur strangulation — JS `break` vide. `float_up` C sur lévitation — JS timeout seul.

`uwepgone` C `wield.c:873` : artifact_light puis `setuwep((struct obj *)0)`. JS skip light.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note /10 : **7**
- Une phrase : `eatspecial` suit l’ordre C (y compris le `else` chain vs useup et `!rn2(3/5)`), mais +421 LOC + choke/float_up stubbés sous un sujet « without stubs » : cluster légitime, trop large pour être vendu comme fini.
