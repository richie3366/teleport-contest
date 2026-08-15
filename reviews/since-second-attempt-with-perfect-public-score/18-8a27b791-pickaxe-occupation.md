# Review 18 — `8a27b791` — D-0951 pickaxe occupation / `use_pick_axe`

## Métadonnées
- Hash complet / court : `8a27b79133816e4a9a460184227e9caa4072f799` / `8a27b791`
- Parent : `86cc8a89944a60c8196b3f16a01e5ec0da1505ed`
- Auteur, date : Raphaël Hervier, 2026-07-21 23:27:57 +0200
- D-id : **D-0951**
- Stats : 12 files, **+997 / −55** — plus gros diff de la série (JS `dig.js` **+918**)
- Fichiers JS / map / cadence : `js/dig.js`, `js/apply.js` (+12), `js/shk.js` (+10), `js/monmove.js` (commentaire) ; map debt/turns ; journal #1219 + rotation archive

## Intention vs livrable
Promesse : apply pick/axe pose l’occupation `dig`, `is_digging` match C, `holetime` shop voit le progrès, sans inventer de FAIL peel.

Livrable réel : **tout le cluster** `dig_typ` / `pick_can_reach` / `dig` / `use_pick_axe` / `use_pick_axe2` / `dighole` thin / `fracture_rock` / `break_statue` / `holetime` / `digcheck_fail_message` / getdir maison / cmdq maison / copies de macros (`is_pick`, `is_axe`, `bimanual`, `greatest_erosion`, `abon`, `Race_if`, `Role_if`, `Flying`, `Levitation`, `on_level`, `assign_level`). Ce n’est plus « un occupation tick » : c’est finish-pickaxe en une iter.

Le wiring `doapply` `is_pick || is_axe` est le seul changement `apply.js` fonctionnel. `monmove.js` ne change pas `watch_on_duty` — seulement le commentaire « is_digging via dig.js ».

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/dig.js` | Port C massif occupation + dighole + naming stubs |
| `js/apply.js` | Wiring `doapply` → `use_pick_axe` |
| `js/shk.js` | Stub : **second** `holetime` par `occtxt` |
| `js/monmove.js` | Docs uniquement |
| map / D-log / journal | D-0951 ; archive rotation |

## Fidélité C ↔ JS

### Occupation / async — le point demandé
C `allmain.c` : si `occupation`, l’appeler **avant** `rhack` ; continuer tant que le callback rend non-zéro.

JS `allmain.js:949` :
```
if (multi >= 0 && typeof occupation === 'function') {
    const cont = await g.occupation();
    if (!cont) g.occupation = null;
    if (monster_nearby()) await stop_occupation();
    return;
}
```
`set_occupation(dig, verbing, 0)` pose `game.occupation = dig` (`engrave.js`). `dig` est `async function` : `await occupation()` est le bon contrat (déjà utilisé par `eatfood` / `picklock`). **Le tick occupation lui-même est câblé.** Frontière input : seulement `dig_getdir` → `nhgetch`. Pas d’`await` hors `nhgetch`/`animationFrame` dans le tick `dig` au-delà des `pline` existants.

`is_digging` : `game.occupation === dig` ≡ C `go.occupation == dig`. Vrai après `set_occupation`. Faux si une autre occupation tourne. `watch_on_duty` (`monmove.js`) lisait déjà `is_digging()` — D-0950 renvoyait false ; maintenant ça peut arrêter le creusement (`!rn2(3)` C) quand un watch voit le héros.

### `use_pick_axe` cmdq — **cassé**
C `dig.c:1101` :
```
if (obj != uwep) {
    if (wield_tool(obj, "swing")) {
        cmdq_add_ec(CQ_CANNED, doapply);
        cmdq_add_key(CQ_CANNED, obj->invlet);
        return ECMD_TIME;
    }
    return ECMD_OK;
}
```
Tour suivant : `rhack` pop `doapply` ; `getobj` pop la lettre.

JS `dig.js` :
```
function cmdq_add_ec(fn) {
    game._cmdq_canned.push({ typ: 'ec', fn });
}
function cmdq_add_key(ch) {
    game._cmdq_canned.push({ typ: 'key', key: ch }); // ch = invlet STRING
}
```
`js/cmd.js` `rhack` :
```
const canned = cmdq_pop();
if (canned) { const res = await canned(); ... }
```
`dorub` pousse **la fonction** puis `{typ:'key', key: charCode}`. Pickaxe pousse un **objet** `{typ:'ec', fn}`. `canned()` n’est pas une fonction.

Même en corrigeant le shape : `getobj_apply` **ne lit pas** `_cmdq_canned` (seul `getobj_rub` le fait). La lettre resterait en tête de queue et casserait la commande suivante, ou serait ignorée.

**Le chemin C « wield ce tour, apply canned le suivant » est mort.** L’occupation ne démarre que si la pioche **est déjà** `uwep`.

`dig_getdir` : hjkl/yubn, `.`, `<>`, ESC. Pas numpad, pas `cmdassist`, pas filtre NODIAG C `dxdy_moveok`. `confdir` est dans `use_pick_axe2`, pas dans getdir — match C (getdir puis axe2 appelle `confdir(FALSE)`).

### `use_pick_axe2` — C `dig.c:1162`
Porté : swallow `do_attack` ; `dz<0` leverage/ceiling ; self-hit `rnd(2)+dbon+spe` ; Clash OOB ; `do_attack` monstre ; WEB `nomul(-d(2,2))` ; IRONBARS Clang ; axe-vs-boulder `!rn2(3)` vibrate + `losehp(2)` ; start/continue occupation ; down `add_damage(SHOP_PIT_COST)`.

Sauts nommés ou silencieux :
- `Underwater` (C turbulence) — JS tombe dans d’autres bras.
- `fire_damage(uwep)` LAVAWALL.
- `conjoined_pits` (deux fosses adjacentes).
- `uteetering_at_seen_pit` / `uescaped_shaft` / `dotrap(FORCEBUNGLE)`.
- `shopdig(0)` au **start** downward (C prévient le shopkeeper **avant** occupation). JS : seulement `add_damage`.
- autodig quiet : C `flags.autodig && DIGTYP_ROCK && moves in [lastdigtime, lastdigtime+2]` force `did_dig_msg` / `quiet`. JS n’a pas ce bras — messages extra, pas forcément RNG.

Self-hit killer string C : `"%s own %s", uhis(), OBJ_NAME`. JS : `'own pick-axe'` fixe — écran, pas RNG.

### `dig` occupation — C `dig.c:300`
Gates : swallow / !uwep / !pick&&!axe / `on_level(digging.level, uz)` / down ? même case : `next2u`. JS `ensure_digging()` + mêmes tests.

Fumbling : `Fumbling && !rn2(3)` puis `switch(rn2(3))` drop / bang+`wake_nearby` / miss. JS : `Fumbling()` import attrib — **fonction**, OK si c’est le même predicat youprop. Bras steed C (`Yobjnam2 bounce hit mon_nam(usteed)`) **omis** → toujours le bras « hit you » + `set_wounded_legs(RIGHT_SIDE, 5+rnd(5))`.

Effort : `10 + rn2(5) + abon() + spe - greatest_erosion + udaminc` ; nain ×2. `abon()` local lit `u.abon` ? La copie `function abon()` D-0951 doit matcher `attrib` sinon effort diverge. Non relu ligne à ligne ici : risque de doublon faux.

Down, effort>250 ou HOLE déjà là → `dighole(FALSE)` puis memset digging. JS : `game.context.digging = {}`. `ensure_digging` : `if (!game.context.digging)` — `{}` est truthy, donc **ne recrée pas** les defaults ; `pos`/`level` rajoutés si manquants ; `effort|0 === 0`. Coincidence, pas memset.

**Bear-trap occupé** C `392–413` :
```
if (rnl(7) > (Fumbling ? 1 : 4)) {
    dmg = dmgval(uwep, youmonst) + dbon();
    if (dmg < 1) dmg = 1;
    else if (uarmf) dmg = (dmg+1)/2;
    losehp(Maybe_Half_Phys(dmg), ...);
} else {
    destroy trap; reset_utrap(TRUE);
}
effort = 0; return 0;
```
JS : **toujours** destroy + `reset_utrap`. **`rnl(7)` non consommé.** Premier désync RNG dès qu’on creuse un bear trap en étant pris. `dmgval` RNG interne aussi sauté.

`DIGCHECK_PASSED_DESTROY_TRAP` : destroy trap, effort=0, pick message. Match structure.

`altar_wrath` / `angry_priest` : omis (nommé).

Latéral effort>100 : statue `break_statue` ; boulder `fracture_rock` + restack ; earth `mkcavearea` **omis** (`blessed !rn2(3)` / `cursed !rn2(4)` / `!blessed !rn2(6)` **sautés** sur earthlevel) ; tree `rn2(5)` fruit + elf/ranger `adjalign(-1)` ; wall maze/cavernous/DOOR ; SDOOR `cvt_sdoor_to_door` ? à vérifier si JS a cvt ou `typ=DOOR` brut ; shop pay ; earth debris `!rn2(3)` + `rn2(2)` elemental **omis** ; door trapped `b_trapped`.

Mid-effort shop wall too-hard `return 0` : C l’a ; JS aussi dans le bras `effort<=100`.

### `dighole` — C `dig.c:885` / JS `dighole(pit_only, _by_magic, cc)`
`_by_magic` **droppé**. C trap magique :
```
explode(dig_x, dig_y, 0, 20 + d(3,6), TRAP_EXPLODE, EXPL_MAGICAL);
deltrap; newsym;
```
JS : ce `else if` **absent** → tombe dans fillholetyp/digactualhole. **`d(3,6)` sauté**, et le trap n’explose pas.

Aussi absents : boulder fill (`rn2(2)` pit crush), grave `dig_up_grave` (`rn2(5)` + mkclass), drawbridge, `spot_checks`, `by_magic` landmine→buried object.

### `holetime` — deux corps
C unique : `occupation != dig || !*u.ushops` → -1 ; `(250-effort)/20`.

`dig.js` export : identité `occupation !== dig`. **Correct.**

`shk.js` (utilisé par le shopkeeper, cycle d’import invoqué) :
```
if (typeof occupation !== 'function') return -1;
if (occtxt !== 'digging' && occtxt !== 'chopping') return -1;
if (!ushops) return -1;
return ((250 - effort) / 20) | 0;
```
Proxy texte. Une occupation `chopping` non-dig ment. C compare le **pointeur de fonction**. Deux sources de vérité.

### `dig_typ` / `pick_can_reach`
`dig_typ` ordre C : axe door/tree ; pick statue/boulder via `pick_can_reach` ; door ; tree undiggable ; obstructed+(!arboreal||wall) ROCK. JS match.

`pick_can_reach` : pit+utrap → `return false` « conjoined deferred » au lieu de `conjoined_pits`. C peut autoriser deux fosses jointes. JS refuse tout statue/boulder depuis une fosse si la cible est aussi une fosse vue.

## Constitution / playbook
Pas de FORCE/DIAG/fs/fastforward/frozen. `dig_getdir` = `nhgetch` légitime. RAS Rule #2. Densité et cmdq sont des pannes **qualité**, pas constitution.

## Densité (§2b)
**Too big.** Guide 50–300 LOC, une fonction ou caller/callee serré. +918 `dig.js` + getdir + cmdq + dighole + fracture + une douzaine de macros locales = « finish pickaxe ». Le cmdq non relu contre `rhack` est le symptôme exact du batch trop large.

## Documentation
D-log « fixed » ; map nomme furniture/HOLE/mkcavearea/grave/conjoined/autodig/shopdig. **Silence** sur `{typ:'ec'}` et sur `rnl(7)`. Overclaim « apply on pick sets occupation » pour le cas wield-then-reapply.

## Vérification
Journal : green+strict ; cohort 12/12 ; arch/wizard 5/5. Pas de full sessions (suivantes @#1220). Aucun des 44 seeds n’applique une pioche : fortress **ne peut pas** voir cmdq, `rnl(7)`, `dighole` magique. Preuve = non-régression, pas le chemin porté.

## Timing occupation vs input (async)
Un tick `dig` **ne** doit **pas** appeler `nhgetch`. Vérifié : `dig()` n’en a pas. `use_pick_axe` en a un (`dig_getdir`) **avant** `set_occupation`, donc hors tick — légitime (C `getdir` bloquant).

Piège : si `cmdq` cassé lève, `rhack` abort → `context.move` indéfini, occupation jamais posée, et une exception peut casser `moveloop`. Ce n’est pas un `await` illégal, c’est un contrat de queue violé.

`set_occupation(dig, "digging"|"chopping", 0)` : `xtime=0` → pas `timed_occupation`. C `set_occupation(dig, verbing, 0)` identique. Count prefix n’enveloppe pas le creusement (C non plus pour pickaxe).

## Risques / dette
1. **`cmdq` incompatible `rhack`** — re-apply après wield : exception ou no-op.
2. **`rnl(7)` bear-trap sauté** + `dmgval` sauté.
3. `dighole` sans `20+d(3,6)` magique.
4. Double `holetime` texte vs pointeur.
5. `mkcavearea` / elemental / autodig / `shopdig(0)` / `conjoined_pits` / steed fumble.
6. Macros locales `Flying`/`abon` vs attrib — drift.
7. `dig_getdir` incomplet vs `getdir` C (numpad / cmdassist / NODIAG).

## Verdict
- Verdict : **QUALITY-RISK**
- Note : **4/10**
- Si je ne devais retenir qu’une critique : +997 lignes d’occupation pickaxe dont le re-queue `cmdq` n’est pas appelable par `rhack`, et un bras bear-trap qui jette le `rnl(7)` C.
