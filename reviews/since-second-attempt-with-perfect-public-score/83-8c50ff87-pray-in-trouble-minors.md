# Review 83 — `8c50ff87` — pray in_trouble collapsing…minors

## Métadonnées
- Hash complet / court : `8c50ff87671b605a1508a298fa364422a590eb78` / `8c50ff87`
- Parent : `cd503837f6a7f12357ff0029196323df0adfd8cd`
- Auteur, date : Raphaël Hervier, 2026-07-22 06:42:32 +0200
- D-id : D-1012
- Stats : 12 files, +680/−72
- Fichiers JS / map / cadence : `js/pray.js` (gros), `js/do_wear.js` (`stuck_ring`/`unchanger`), `js/potion.js` (`make_deaf`), `js/dig.js` (`buried_ball_to_freedom`), `js/artifact.js` (`confers_luck` + `SPFX_LUCK`), map `debt.md`, CURRENT/NOTES/D-log, journal + rotate. Pas de cadence.

## Intention vs livrable
Promet de **compléter** `in_trouble` : majors restants collapsing…cursed_blindfold **et** tous les minors, plus helpers. Le diff ajoute bien toutes les constantes TROUBLE_* C, tous les `if` restants, et toutes les `case` de `fix_worst_trouble` jusqu’à SADDLE. `in_trouble` C après HALLUCINATION `return 0` — JS aussi. **Il ne reste pas d’arm C non porté dans `in_trouble` elle-même.** Les deferrals sont des *gates internes* (swallow Blind, blocked_boulder pool) et `pleased` pat_on_head, pas des codes TROUBLE oubliés. Titre large mais tenu. STARVING gagne `body_part(STOMACH)` (corrige D-1011).

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/pray.js` | Port reste `in_trouble` + `fix_worst_trouble` + `stuck_in_wall`/`worst_cursed_item`/`fix_curse_trouble`/`blocked_boulder` |
| `js/do_wear.js` | Export `stuck_ring` / `unchanger` |
| `js/potion.js` | Port `make_deaf` |
| `js/dig.js` | Port `buried_ball_to_freedom` |
| `js/artifact.js` | `SPFX_LUCK=0x00080000` + `confers_luck` |
| `docs/c-js-map/debt.md` | in_trouble « all minors » ; peffect/gifts deferred |
| CURRENT/NOTES/D-log | Next = apply tools / gifts |
| journal | #1283 |

## Fidélité C ↔ JS

### `in_trouble` — suite de la liste, ordre C
Après LYCANTHROPE, C :

```
near_capacity() >= EXT_ENCUMBER && AMAX(STR)-ABASE(STR) > 3  → COLLAPSING
stuck_in_wall() → STUCK_IN_WALL
Cursed_obj(uarmf, LEVITATION_BOOTS) || stuck_ring(left/right, RIN_LEVITATION)
  → CURSED_LEVITATION
nohands || !freehand : welded(uwep) ou (Upolyd && nohands && (!Unchanging || cursed unchanger))
  → UNUSEABLE_HANDS
Blindfolded && ublindf->cursed → CURSED_BLINDFOLD
Punished || TT_BURIEDBALL → PUNISHED
Cursed_obj gauntlets fumble || fumble boots → FUMBLING
worst_cursed_item() → CURSED_ITEMS
usteed cursed saddle → SADDLE
BlindedTimeout>1 && !(HBlinded & ~TIMEOUT) && (!uswallow || !attacktype_fordmg ENGL AD_BLND)
  → BLIND
(HDeaf & TIMEOUT)>1 → BLIND
ABASE(i)<AMAX(i) any i → POISONED
Wounded_legs && !usteed → WOUNDED_LEGS
uhs >= HUNGRY → HUNGRY
HStun & TIMEOUT → STUNNED
HConfusion & TIMEOUT → CONFUSED
HHallucination & TIMEOUT → HALLUCINATION
return 0
```

JS recopie cette cascade. **ABASE/AMAX = `u.acurr.a` / `u.amax.a`** : conforme au modèle JS (`attrib.js` : bonuses dans `abon`/`atemp`, pas fusionnés dans acurr). `near_capacity` import invent. `Blindfolded()` + `ublindf.cursed`. `Punished()` ≡ `uball`. `HStun`/`HConfusion`/`HHallucination` TIMEOUT seulement — **pas** le flag sticky `u.Hallucination` : conforme C (`HHallucination & TIMEOUT`).

**Écart Blind avalé (le seul arm restant « pas C ») :**
C : si avalé, TROUBLE_BLIND **sauf** si le monstre a AT_ENGL/AD_BLND.
JS : `&& (!u.uswallow /* attacktype_fordmg deferred */)` → **tout swallow inhibe TROUBLE_BLIND**. Le commentaire dit « treat as not blind » : c’est l’inverse conservateur (on sous-répare). Nommés « polish ». Ce n’est pas polish : un héros timed-blind avalé par un non-aveuglant **ne sera pas soigné** par la prière alors que C le soigne. Pas de RNG.

`stuck_in_wall` : `Passes_walls` early false ; 8 voisins ; `!isok \|\| (IS_OBSTRUCTED && typ!=SDOOR && !=SCORR) \|\| (blocked_boulder && !throws_rocks)`. Identique. `blocked_boulder` : count boulders, ≥2 bloqué (C peut laisser pousser dans pool — nommé), diagonale Sokoban, `isok` dest, obstruct, boulder dest. Thin assumé.

### `worst_cursed_item`
Ordre C : loadstone si HVY_ENCUMBER ; welded uwep si uright\|\|bimanual ; gloves ; shield ; cloak ; suit ; helm **sauf HELM_OF_OPPOSITE_ALIGNMENT** ; boots ; shirt ; amulet ; left ; right ; ublindf ; welded uwep ; twoweap swap cursed ; sinon premier invent cursed LOADSTONE\|\|confers_luck. JS : même ordre, `break` luck/loadstone. Si rien, `otmp` finit NULL. **Pas d’uncurse d’un objet pack aléatoire.** `confers_luck` : LUCKSTONE otyp **ou** `arti.spfx & SPFX_LUCK`. `SPFX_LUCK` C `artifact.h` = `0x00080000L`. JS identique.

### `fix_worst_trouble` bras nouveaux
- COLLAPSING : You_feel much/'' stronger selon AMAX-ABASE>6 ; ABASE=AMAX STR ; si Fixed_abil stuck_ring SUSTAIN_ABILITY left puis right + `fix_curse_trouble`. C `stuck_ring(uleft)` puis else `stuck_ring(uright)` — JS `if (otmp) leftglow; else right`. **Si left retourne l’amulette unchanging (nolimbs)**, C ne teste pas right. JS non plus. OK.
- STUCK_IN_WALL : safe_teleds → surroundings change ; sinon `HPasses_walls = d(4,4)+4` + slimmer. RNG `d(4,4)` LTR. JS `xt & TIMEOUT` vs `set_itimeout` — OK pour 8..20.
- CURSED_LEVITATION / FUMBLING / CURSED_ITEMS / CURSED_BLINDFOLD : `fix_curse_trouble`. Glow : C `Yobjnam2` / leftglow/rightglow + `hcolor(NH_AMBER)`. JS `hcolor('amber')` **local pray** = `colorword \|\| 'odd'` — **zéro RNG hallu**. C `hcolor` sous Hallucination tire `rn2` sur la table. **Divergence RNG** dès qu’une prière uncurses pendant hallu.
- UNUSEABLE_HANDS : welded → uncurse uwep ; else Upolyd nohands → rehumanize ou uncurse unchanger. C `impossible` si encore coincé ; JS omit (nommé).
- PUNISHED : chain disappears ; TT_BURIEDBALL → `buried_ball_to_freedom` else `unpunish`.
- POISONED : hallu tiger / else good health ; restore all ABASE<AMAX ; `encumber_msg`. C ignore Fixed_abil items. JS aussi (pas de stuck_ring ici).
- BLIND : Blinded → eyes feel better + make_blinded(0) ; si HDeaf TIMEOUT make_deaf(0) + « can hear again ». JS `BlindedProp() \|\| BlindedTimeout()` vs C `Blinded`. `eyecount` JS = 2 toujours (poly 1 œil nommé via body_part seulement).
- WOUNDED_LEGS / STUNNED / CONFUSED / HALLUCINATION : heal_legs / make_stunned(0,TRUE) / make_confused(0,TRUE) / Kansas + make_hallucinated(0,FALSE,0).
- SADDLE : which_armor W_SADDLE ; si !Blind Yobjnam2 glow amber + bknown ; uncurse. JS `Your ${xname} softly glows` — pas `Yobjnam2`. Possible « Your your saddle ».
- HUNGRY désormais case séparée (D-1011 fusionnait seulement STARVING). Conforme FALLTHROUGH C.

### Helpers
**`stuck_ring` (do_wear.c)** : impossible si ni left ni right → JS `return null`. Puis otyp match : cursed unchanging amulet si nolimbs ; welded uwep si RING_ON_PRIMARY \|\| bimanual ; cursed gloves ; cursed ring ; Glib gloves. **Ordre identique à C.** JS `ring_bimanual` vs C `bimanual` — à traiter comme équivalent déclaré, pas revérifié ici contre `oc_bimanual`.

**`unchanger`** : `uamul` AMULET_OF_UNCHANGING. ≡ C.

**`make_deaf`** : Unaware coupe talk ; `set_itimeout` ; XOR xtime/old → botl + You can hear / unable. JS `!!xtime !== !!old`. Prière BLIND appelle `make_deaf(0,false)` — pas de pline. OK.

**`buried_ball_to_freedom`** : buried_ball, extract, place_object, stack, reset_utrap, del_engr, newsym. C `#if 0` RUST_METAL nommé. Pas d’`unpunish` ici — C non plus sur ce chemin (le case PUNISHED choisit l’un ou l’autre).

## Constitution / playbook
Grep : pas FORCE/DIAG/fs/node:/fastforward/seed-contrôle. `SPFX_LUCK` n’est pas une constante de session. Rule #2 OK. `await rehumanize` / `make_*` : pas un 2e canal input. RAS après grep.

## Densité (§2b)
Right size, dense. C’est le reste d’**une** fonction + callees C cités (stuck_ring, make_deaf, buried_ball, confers_luck). +680, pas un mega-port zap+pray+apply. Le split 1011/1012 évite un commit illisible tout en fermant `in_trouble`.

## Documentation
D-1012 « all minor TROUBLE_* » + deferred swallow Blind, update_inventory, blocked_boulder pool, pat_on_head, peffect_*. **Overclaim léger :** « all minors » est vrai pour les `case`/`if`, faux pour la sémantique Blind-swallow. Status `fixed` acceptable si on lit Deferred. CURRENT retire in_trouble du next cluster. Journal green+cohort 15/16. Score 43/44 inchangé.

`hcolor` hallu RNG **pas** dans Deferred (seulement « Hallucination synonym deferred » dans un commentaire `hcolor` pray). C’est un trou RNG, pas un synonyme cosmétique.

## Vérification
Encore green+cohort, pas un seed qui prie sous collapsing. `worst_cursed_item` + `confers_luck` peuvent toucher `fix_worst` dès qu’un cursed luckstone est porté — peu probable dans les publics. Fortress held n’est pas une preuve que l’ordre minors est exercé.

### `pleased` après D-1012 — majors **et** minors dans les boucles
C `while ((trouble = in_trouble()) != 0)` répare aussi les **négatifs** (minors). Avant ce commit, `in_trouble` renvoyait 0 dès qu’HIT/LYCAN étaient faux → un FUMBLING/HUNGRY n’était jamais vu. Maintenant un `action` « fix all » peut enchaîner COLLAPSING → items → hungry → hallu, chacun avec ses `make_*` / `uncurse` / `encumber_msg`. **Ça peut émettre des plines et du RNG (`hcolor`, `d(4,4)` STUCK_IN_WALL, `safe_teleds`) absents des traces publiques** si un jour un seed prie chargé. Les publics #1283 restent 43/44 : ces bras n’ont **pas** été exercés en suite.

`tryct < 10` sur majors only : UNUSEABLE_HANDS sans `impossible` JS → si nohands persiste, 10× rehumanize/uncurse no-op puis sort. C `impossible` debug. JS silencieux : **fix-all peut s’arrêter avec nohands encore true** et `in_trouble` encore >0. Prochaine prière re-tente. Pas de boucle infinie grâce à tryct. OK fonctionnel, pas C.

### `fix_curse_trouble` vs C
C : Glib+gants `make_glib(0)` + gloves_simple_name ; si plus cursed return. Glow si `!Blind || (otmp==ublindf && Blindfolded_only)` ; `hcolor(NH_AMBER)` ; `bknown = !Hallucination` ; `uncurse` ; `update_inventory`. JS : `make_glib(0)` + « Your gloves are no longer slippery » (pas `gloves_simple_name`). Glow `Your ${xname} softly glows ${hcolor('amber')}`. **Pas `update_inventory`** (nommé). `PLNMSG_OBJ_GLOWS` omis. Hallu : C `hcolor` RNG, JS `'amber'` fixe ; `bknown = !Hallucination()` JS teste le flag sticky pas `HHallucination & TIMEOUT`.

Left/right glow strings C `Your left ring softly glows` passées en `what` : JS `pline(\`${glow} ${hcolor('amber')}.\`)` → « Your left ring softly glows amber. » C `pline("%s %s.", what, hcolor(NH_AMBER))` → « Your left ring softly glows amber. » (hcolor peut être « purple » hallu). Structure OK, RNG non.

### `stuck_in_wall` + `blocked_boulder`
C `blocked_boulder` : si 1 boulder, teste si on peut le pousser (dest pool-sink parfois OK). JS ≥2 ⇒ bloqué toujours (nommé). Un couloir 8-voisin avec 2 boulders dont un poussable dans l’eau : C peut dire pas stuck ; JS TROUBLE_STUCK_IN_WALL → teleds ou `HPasses_walls d(4,4)+4`. **RNG de prière** que C n’aurait pas. Sokoban diagonale : JS bloque si flags.sokoban — C aussi pour dx&&dy.

`IS_OBSTRUCTED` JS vs C : si le port terrain n’a pas le même macro (IRONBARS, etc.), le count 8 diverge. Non relu ici fichier par fichier ; c’est la dette `const.js` préexistante.

### `confers_luck` / `worst_cursed_item` pack
C `artifact.c:confers_luck` : luckstone otyp **or** carried/worn artifact SPFX_LUCK. JS `get_artifact` + `spfx & 0x00080000`. Si `artilist` JS n’a pas le bit sur Luck Blade / etc., `worst_cursed_item` rate l’uncurse d’un artefact luck maudit au pack (seulement loadstone+luckstone). À greper `artifacts_data` hors commit — le **bit** C est juste.

Boucle invent JS `for (const o of game.invent || [])` : ordre tableau vs `nobj` C. Si `invent` JS est maintenu tête=dernier ramassé comme C, OK. Sinon le « premier » luckstone cursed change. Pas de RNG.

### `make_deaf` XOR
C `(xtime != 0) ^ (old != 0)` : passer de 5 à 3 **ne** re-pline pas. JS `!!xtime !== !!old` : 5→3 les deux truthy, pas de msg. 5→0 : msg. Prière `make_deaf(0,false)` : talk false, XOR peut botl. C `disp.botl` si XOR. JS botl si XOR. OK.

### HUNGRY vs STARVING dans le switch
D-1011 n’avait que STARVING (texte identique FALLTHROUGH). D-1012 ajoute `case TROUBLE_HUNGRY` séparé — nécessaire parce que `in_trouble` peut maintenant renvoyer -8 sans passer par WEAK. C un seul corps FALLTHROUGH. JS duplication du pline+`init_uhunger`. Comportement identique. `init_uhunger` préexistant eat.js.

### `TROUBLE_BLIND` double entrée (yeux + sourds)
C n’a **pas** TROUBLE_DEAF : `(HDeaf & TIMEOUT) > 1` retourne **BLIND**. `fix` soigne les deux. JS deux `if` séparés vers la même constante. Un héros sourd non aveugle : `in_trouble` = -5, `fix` `cure_deaf` true, `Blinded` false → msg seulement « You can hear again ». C `msgbuf` vide puis `You can hear again` via `!*msgbuf ? "You"`. JS `msgbuf += ... : 'You can hear again'` puis `pline(msgbuf + '.')`. OK. `make_deaf(0,false)` : pas de You() interne (talk false) ; le pline est dans fix. C `make_deaf(0L, FALSE)` same + pline concat. 

`BlindedTimeout() > 1` : C `> 1L` — timeout == 1 **n’est pas** un trouble (region_safety soigne le 1 à part, deferred D-1011). JS `> 1` identique. Un aveugle à 1 tour : prière ignore BLIND, C aussi.

### `Wounded_legs` et steed
C `Wounded_legs && !u.usteed` : à cheval les jambes blessées ne sont pas un trouble (le cheval porte). JS `Wounded_legs() && !u.usteed`. `Wounded_legs()` JS OUs H/E/flag. Plus large. `heal_legs(0)` dans le fix : préexistant trap/do_wear ? Import pray. Si stub, TROUBLE_WOUNDED_LEGS se répète. Non relu `heal_legs` dans ce commit (appel nouveau). Dette : vérifier que `heal_legs` clear HWounded_legs sinon boucle fix-all minors (`while != 0` sans tryct !). **C `while (in_trouble() != 0)` sans compteur pour fix-all.** Si `heal_legs` no-op, **boucle infinie** `await` — crash agent, pas un `impossible`. Risque réel si `heal_legs` JS est thin. À greper hors review : si D-antérieur a porté `heal_legs` complet, OK.

### `TROUBLE_POISONED` ABASE
Poison C baisse ABASE. Restaurer `ABASE=AMAX` pour tout i. JS `acurr.a[i]=amax.a[i]`. N’efface pas `abon` négatif. C non plus (Fixed_abil items ignorés, ABASE brut). `encumber_msg` peut pline si STR change le cap. Pas de RNG.

### Constants TROUBLE_* 
C 14..1 majors, -1..-11 minors. JS mêmes nombres. `pleased` teste `trouble > 0` (major) vs `!= 0`. **Ne pas « optimiser » en comparant 14>13** : C insiste que l’ordre des if prime. JS respecte.

## Risques / dette
1. **Swallow Blind inversé** — sous-réparation nommée « polish ».
2. **`hcolor('amber')` sans `rn2` hallu** — RNG prière + hallu + uncurse.
3. **SADDLE / fix_curse glow via `xname`** — écran vs `Yobjnam2`.
4. **`blocked_boulder` ≥2 toujours bloqué** — STUCK_IN_WALL faux positif près d’un stack poussable dans l’eau.
5. **`impossible` UNUSEABLE_HANDS omis** — fix-all peut boucler si nohands persiste (C crash/debug ; JS silent retry).
6. **`eyecount` = 2** — message yeux.
7. Suite : `attacktype_fordmg` swallow ; `hcolor` réel ; pat_on_head gifts (next map) ; ne plus toucher l’ordre `in_trouble`.

`fix_worst_trouble` default JS `break` : un code inconnu no-op. C switch sans default (warning compilateur). Tous les `#define` TROUBLE_* ont une case JS après D-1012. **Complétude du switch : oui.**

`stuck_ring` export depuis `do_wear.js` : callers C aussi `select_off` / take-off. JS `select_off` non relu — si take-off anneau n’appelait pas `stuck_ring` avant, l’export ne change rien tant que pray seul importe. Pas de double-use accidentel dans le diff (seulement export + pray import).

`buried_ball` helper : `buried_ball(cc)` préexistant dig.js ? Le commit ajoute `to_freedom`. Si `buried_ball` JS ne trouve pas la balle (coord vs `u.utrap`), `to_freedom` no-op, `in_trouble` reste PUNISHED (`utraptype` encore BURIEDBALL) → **while != 0 infini** sur fix-all. Même classe de risque que `heal_legs`. À valider que `reset_utrap(true)` court même si `ball` null… JS `if (ball) { ... reset_utrap }`. **Si pas de balle, utrap reste.** C `buried_ball_to_freedom` reset anyway? Lu dig.c hors fichier fetch : le D-log ne le dit pas. Risque boucle si trap type set sans objet.

Helm `HELM_OF_OPPOSITE_ALIGNMENT` : C refuse d’uncurse le casque qui te fait adhérer au dieu courant. JS skip `otyp !== HELM_OF_OPPOSITE_ALIGNMENT`. Si le casque est le worst, `worst_cursed_item` tombe au slot suivant (boots…). Conforme. Pas de RNG.

`TROUBLE_SADDLE` `which_armor(usteed, W_SADDLE)` : si `usteed` sans selle mais `in_trouble` a testé `Cursed_obj(sad, SADDLE)` avec sad null : `Cursed_obj` JS `obj && cursed && otyp` probablement false. Fix SADDLE `otmp` null : JS `if (otmp && !Blind)` ; `if (otmp) uncurse`. C assume otmp non null (in_trouble a garanti). OK.

`rehumanize` UNUSEABLE_HANDS : « Your shape becomes uncertain. » puis rehumanize message forme. RNG poly-off ? `rehumanize` peut `rn2`. Nouveau caller pray. Même remarque que teleds : helper préexistant, nouveau site.

`encumber_msg` après POISONED : C toujours. JS `await encumber_msg()`. Si encumber_msg compare near_capacity et pline, écran possible. Pas dans les publics.

## Questions ouvertes
- `heal_legs(0)` clear complet de `HWounded_legs` ? Sinon `while (in_trouble()!=0)` infini sur fix-all.
- `buried_ball_to_freedom` si `buried_ball()` null : `reset_utrap` sauté → même infini sur PUNISHED.
- `hcolor` pray : brancher le `hcolor` potion réel (rn2 hallu) au lieu du stub `'amber'`.
- `attacktype_fordmg(ustuck, AT_ENGL, AD_BLND)` : un helper mondata existe déjà ?
- `confers_luck` artefacts : greper `spfx` dans `artifacts_data` pour Luck Blade / Vorpal / etc. Si le bit n’est pas extrait, worst_cursed_item pack rate l’artefact.
- `Fixed_abil` COLLAPSING : stuck_ring SUSTAIN_ABILITY left **puis** right. Un anneau gauche non-sustain + droit sustain : C else-if, JS else. OK.
- `body_part(STOMACH)` poly : toujours `'stomach'` JS — STARVING/HUNGRY écran poly.
- `Punished()` ≡ `uball` : C `Punished` macro. Chaîne sans balle : pas PUNISHED. TT_BURIEDBALL sans uball : quand même PUNISHED (C `Punished || buried`). JS same.
- `Hallucination()` sticky dans POISONED tiger vs `HHallucination & TIMEOUT` pour le trouble : deux définitions dans le même fichier.
- `welded(uwep)` UNUSEABLE_HANDS : `u.uwep && welded` JS vs C `welded(uwep)` (uwep null false). OK.
- `tryct < 10` seulement majors : un minor no-op (`heal_legs`) n’a **pas** de tryct — infini possible.

## Verdict
- Verdict : ACCEPT-WITH-DEBT
- Note : 7.5/10
- Si je ne devais retenir qu’une critique : `in_trouble` n’a plus d’arm C manquant (la liste de priorité est complète), mais le gate Blind avalé est **inversé** par rapport à C, et `hcolor` local avale le `rn2` hallu des glows d’uncurse — deux dettes qui peuvent mordre dès qu’une prière n’est plus du HIT/lycan de seed.
