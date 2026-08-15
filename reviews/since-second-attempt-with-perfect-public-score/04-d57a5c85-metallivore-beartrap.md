# Review 04 — `d57a5c852c61d1f64030fe76e0746ec4b561e3b7` — metallivore beartrap/bars + `still_chewing`

## Métadonnées
- Hash complet / court : `d57a5c852c61d1f64030fe76e0746ec4b561e3b7` / `d57a5c85`
- Parent : `1ccadb23e1384dc7f49575283d2076b69b0bdc8a`
- Auteur, date : Raphaël Hervier `<richie3366@gmail.com>`, 2026-07-21 22:00:50 +0200
- D-id : **D-0937**
- Stats : 9 files, +371/−47 (JS : 3 files, +320/−26)
- Fichiers JS / map / cadence : `js/eat.js`, `js/hack.js`, `js/trap.js` ; `debt.md` ; journal **« #1205 score + D-0937 »** — **mélange cadence + port**.

## Intention vs livrable
Promet : bras floorfood beartrap/IRONBARS + `still_chewing`/`dissolve_bars` ; cadence #1205 reste 44/44.

Livrable : `floorfood_eat` porte beartrap puis bars puis or (ordre C) ; `doeat` `&hands_obj` ; `hack.js` `still_chewing` + `dissolve_bars` ; `reset_utrap` exporté.

Mélange : le même commit rafraîchit Score/CURRENT @#1205 **et** porte ~220 lignes de `hack.c`. Le playbook de 01 dit d’amortir `sessions` sur cadence **ou** de porter — pas les deux comme une seule « vérification du port ». Flag processus.

## Inventaire

| Fichier | Rôle |
|---------|------|
| `js/eat.js` | Port `floorfood` metallivore trap/bars ; `doeat` `hands_obj` |
| `js/hack.js` | Port `still_chewing` (C `hack.c`) + `dissolve_bars` (**C `monmove.c`** — mauvais module) |
| `js/trap.js` | Wiring : `export reset_utrap` |
| `docs/CURRENT.md` | Cadence 44/44 @#1205 (vitesse 32+0.27) |
| `debt.md`, D-log, NOTES, journal | D-0937 + suite |

## Fidélité C ↔ JS

### `floorfood` metallivore — C `eat.c:3602` / JS `floorfood_eat`

Ordre C : `t_at` BEAR_TRAP `tseen` → ynq holding/armed → `deltrap` ; si utrap beartrap `reset_utrap(TRUE)` ; `mksobj(BEARTRAP, TRUE, FALSE)` ; `check_capacity(qbuf)` → dropy + NULL ; sinon return objet. `'q'` abort ; `'n'` `getobj_else++`. Puis IRONBARS : `wall_info & W_NONDIGGABLE` ou `uhunger>1500` pline cannot/too full ; sinon ynq eat/resume via `digging.chew`+pos+`on_level` ; `'y'` → `&hands_obj`. Puis or si `!= RUST_MONSTER`.

JS : même ordre trap → bars → or. `mksobj(BEARTRAP, true, false)`. Encumber : `near_capacity() >= EXT_ENCUMBER` + `pline(msg)` au lieu de `check_capacity(qbuf)` (C imprime `qbuf` = « You only manage to … the bear trap. »). Seuil EXT_ENCUMBER probablement le même ; **pas** le texte C exact si `check_capacity` a un fallback « won't be able to carry ».

Écarts :
- `getobj_else++` C sur `'n'` pour les trois bras. JS commente `'n' → getobj_else++` sur le trap **sans incrémenter** (et sans `getobj_else`). Invent dira « anything to eat » vs « anything else ». Nommé « else wording ».
- IRONBARS nodig : C `wall_info & W_NONDIGGABLE`. JS `(wall_info|flags) & W_NONDIGGABLE` — `flags` porte parfois un doormask ; **faux positif nodig** possible.
- Pool/lava skipfloor : toujours absent (nommé).

RNG : aucun sur ces bras (ynq seulement). `mksobj(..., TRUE, FALSE)` peut tirer du RNG d’init objet — C aussi, même call.

### `doeat` `hands_obj` — C `eat.c:2848` / JS `doeat`
`still_chewing(ux,uy) && typ==IRONBARS` → « You pause to swallow. » ; `return ECMD_TIME`. JS `await still_chewing` + même pline + `return 1`. **Fidèle.** Caller branché.

### `still_chewing` — C `hack.c:647` / JS `hack.js:still_chewing`

Enveloppe C (else-if) :
1. `digging.down` → memset dig info.
2. Nondiggable stone/tree/bars → teeth + `nomul(0)` return 1.
3. Bars + metallivore + `uhunger>1500` → too full return 1.
4. Nouveau spot : effort 30 (obstructed !tree) ou 60 + `udaminc` ; start chewing ; **`watch_dig(NULL,x,y,FALSE)`** ; return 1.
5. `effort += 30+udaminc` ; si `<=100` continue + **watch_dig** ; return 1.
6. Fin : conduct food++ ; `uhunger += rnd(20)` ; boulder `delobj` / wall shop `add_damage(SHOP_WALL_DMG)` / tree / bars `morehungry(-oc_weight(HEAVY_IRON_BALL))` + `dissolve_bars` / SDOOR `b_trapped` / door shop `add_damage(SHOP_DOOR_COST)` + `b_trapped` / rock CORR ; `recalc_block_point` ; `pay_for_damage`.

JS porte 1–3, effort, messages start/continue, boulder, maze/cavern/`in_town` wall typ, tree, bars nutrition, SDOOR/door **sans** trap, rock. RNG `rnd(20)` à la fin — **même place** que C (après conduct, avant terrain).

**Sauté (nommé)** : `watch_dig` start **et** continue ; `add_damage` mur/porte ; `b_trapped` SDOOR/door ; `pay_for_damage` ; livelog ; `switch_terrain` après bars.

Écarts non (ou mal) nommés :
- Continue verbose : C `if (flags.verbose)`. JS `flags.verbose !== false` — `undefined` ⇒ message (C default TRUE, OK en pratique).
- Boulder restant : C `block_point` après `delobj` (qui unblock). JS `recalc_block_point` — voisin, pas identique.
- `youData` : `youmonst.data || mons(umonnum ?? urole.mnum)` vs `hero_form_data()` dans `eat.js` — deux sources de forme.
- `may_dig_local` dupliqué pour éviter le cycle `dig.js` — dérive si `may_dig` JS diverge.

Callers : `doeat` hands_obj seulement. C `still_chewing` est aussi sur le chemin dig/chew hors eat selon les callers ; ici le chew bars eat est branché. Chew **mur/porte** depuis eat ne passe que si `hands_obj` et typ bars — mâcher un mur n’est pas un `#eat` C non plus (c’est le move bump). OK pour l’enveloppe eat.

### `dissolve_bars` — C `monmove.c:2170` / JS `hack.js:dissolve_bars`
C : `edge==1` → DOOR ; `Is_special(&u.uz) \|\| *in_rooms(x,y,0)` → ROOM ; sinon CORR ; flags 0 ; `newsym` ; **`switch_terrain()` si hero sur la case**.
JS : même typ ; `Is_special_local` via `sp_levchn` ; `switch_terrain` **différé (nommé)**. Module : **hack.js au lieu de monmove.js** — 1:1 cassé pour cycle `dig.js`/`in_rooms`.

### `reset_utrap` — C `trap.c`
Export only. Corps inchangé (`set_utrap(0,0)` ; msgs Lev/Fly toujours deferred). Wiring minimal correct.

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/`fs`/fastforward. Frozen RAS.
`await still_chewing` / `pline` / `yn_function` — pas d’await hors input.
1:1 : `dissolve_bars` mal logé ; `on_level_dig` / `assign_level_dig` locaux au lieu de `dungeon.js`.

## Densité (§2b)
Right size **du port** (~320 LOC, famille floorfood metallivore + `still_chewing`). Too big **du commit** : cadence full `sessions` + port C dans le même SHA. §2b « Multiple independent hypotheses » — ici « le score tient » et « les bars se mâchent » sont deux stories. Un falsifier déclaré (eat cohort + sessions) amalgames.

## Documentation
D-0937 **fixed** + deferred pool/lava, `watch_dig`, shop, `b_trapped`, `switch_terrain`, livelog. Liste **honnête** et longue — le « fixed » veut dire « cluster eat bars ouvert », pas « `still_chewing` complet ». CURRENT Keep + suite 44/44 @#1205. NOTES 59 lignes.
Journal titre `#1205 score + D-0937` : le mélange est **documenté**, pas caché.

## Vérification
« green + eat cohort + full sessions 44/44 @#1205 ». La cadence **prouve la forteresse**, pas le chew held-out (public set sans poly metallivore / bars). Deux preuves collées. Green+cohort eat = minimum du port ; full sessions = cadence, pas un test `still_chewing`.

## `still_chewing` : effort et messages

C start : `effort = (IS_OBSTRUCTED && !IS_TREE ? 30 : 60) + u.udaminc`. JS identique. Continue : `effort += 30 + udaminc` ; seuil `<= 100` encore occupé. C incrémente **dans** la condition `else if ((effort += …) <= 100)`. JS incrémente puis teste. Même valeur post-inc.

Messages start : C `You("start chewing %s %s.", (boulder\|TREE\|IRONBARS) ? "on a" : "a hole in the", … boulder/tree/rock/bar/door)`. JS template équivalent. Continue : C `You("%s chewing on the %s.", chew ? "continue" : "begin", … "bars" pluriel)`. JS pareil. Au start, IRONBARS mot = **"bar"** (singulier) ; au continue **"bars"**. JS copie cette bizarrerie — fidèle, pas un bug.

Fin bars : C `morehungry(-nut)` avec `nut = objects[HEAVY_IRON_BALL].oc_weight` — nutrition lump, pas `lesshungry` (évite choke). JS `morehungry(-nut)`. Import `morehungry` depuis `eat.js`. Cycle eat↔hack : `hack.js` importait déjà `gethungry` ; OK.

Fin boulder : si la case bloque encore (mur / closed door / autre boulder), C `block_point` + memset digging return **1** (pas fini de creuser le reste). JS `recalc_block_point` + `digging={}` return 1. `recalc` peut laisser la vision ouverte si `delobj` a unblock. Écart vision, pas RNG.

## `floorfood` beartrap vs `check_capacity`

C `check_capacity(qbuf)` : si `near_capacity() >= EXT_ENCUMBER`, `pline("%s", qbuf)` où qbuf est déjà « You only manage to disarm/free … the bear trap. » puis dropy. JS teste `near_capacity() >= EXT_ENCUMBER` et `pline(msg)` avec le même texte. **Proche.** `check_capacity(NULL)` ailleurs a un autre message ; ici qbuf non vide. `mksobj(BEARTRAP, TRUE, FALSE)` peut init spe/trap RNG — C et JS même signature. Si `mksobj` JS ignore `TRUE` init, l’objet beartrap eatable est un stub d’objet — non vérifié dans ce commit (préexistant).

`reset_utrap(true)` : C peut parler Lev/Fly restore. JS export ignore `_msg`. Hero libéré du piège sans message de lévitation — nommé depuis plus longtemps sur `reset_utrap`.

## Cadence #1205 collée au port

CURRENT : Score 44/44, 11405/11405, RNG 100%, vitesse `32+0.27/turn` (était `31+0.27` @#1200). Le port `still_chewing` n’explique pas un changement de **speed label**. Soit bruit de mesure, soit le chew n’y est pour rien et la cadence a juste re-run. Mélanger ça dans le même SHA empêche de dire « le port n’a pas régressé la vitesse » vs « la machine était plus chaude ».

Journal « Verification: green+strict; eat cohort; full sessions post-fix » — trois commandes **citées sans argv**. Pas de `ps_test_runner` dans le tree du commit. Fortress held = affirmation. Un cohort eat (1800/0016/0105) n’a aucune raison d’être poly metallivore sur IRONBARS : il régresse `doeat` food, pas `still_chewing`. Full `sessions` @#1205 mesure la forteresse **malgré** le port, pas **grâce** au port. C’est la bonne discipline post-PASS, mais ça ne falsifie pas l’hypothèse « les barreaux se dissolvent comme `monmove.c` ».

`trap.js` +2/−1 : `export` sur `reset_utrap`. Densité de ce fichier : docs-only déguisé si on le comptait seul ; dans le cluster c’est du wiring légitime. `Is_special_local` parcourt `game.sp_levchn` : si la chaîne spéciale JS est incomplète, `dissolve_bars` choisit CORR au lieu de ROOM dans un niveau spécial — divergence de typ, pas de RNG.

## Risques / dette
1. `still_chewing` sans `watch_dig` / shop / `b_trapped` : mâcher en ville/shop/porte piégée ≠ C (D-0938/D-0941).
2. `dissolve_bars` sans `switch_terrain` : terrain sous les pieds (eau/glace/lave).
3. `wall_info|flags` nodig bars — faux « cannot eat them ».
4. Cadence mêlée : un FAIL suite serait attribué au chew sans disentanglement.
5. `may_dig_local` fork vs `dig.js` `may_dig`.
6. `youData` vs `hero_form_data()` : metallivore too-full bars peut se tromper de forme.
7. `getobj_else` jamais incrémenté : « else » invent faux.

## Extrait C — `still_chewing` watch/shop (coupé dans ce SHA)

```675:718:nethack-c/upstream/src/hack.c
    } else if (!svc.context.digging.chew
               || svc.context.digging.pos.x != x
               || svc.context.digging.pos.y != y
               || !on_level(&svc.context.digging.level, &u.uz)) {
        /* ... effort, You start chewing ... */
        watch_dig((struct monst *) 0, x, y, FALSE);
        return 1;
    } else if ((svc.context.digging.effort += (30 + u.udaminc)) <= 100) {
        /* ... continue chewing ... */
        watch_dig((struct monst *) 0, x, y, FALSE);
        return 1;
    }
```

JS D-0937 : mêmes tests `chew`/pos/`on_level_dig`, **sans** les deux `watch_dig`. Un watchman en ville ne crie pas. Reporté D-0941 — le D-log D-0937 le nomme. Honnête.

```752:756:nethack-c/upstream/src/hack.c
        if (*in_rooms(x, y, SHOPBASE)) {
            add_damage(x, y, SHOP_WALL_DMG);
            dmgtxt = "damage";
        }
```

JS : commentaire `// shop add_damage deferred`. Mur de shop mâché : pas de `damagelist`, pas d’amende (et `pay_for_damage` plus tard de toute façon). Le cluster « retire still_chewing » est un **ouvreur de fonction**, pas une fermeture.

`dissolve_bars` C `monmove.c:2170` : `switch_terrain()` si `u_at`. JS skip. Hero metallivore sur des barreaux qui deviennent CORR au-dessus d’un pool sous-jacent : C change le terrain sous les pieds ; JS laisse le hero « sur » un typ ROOM/CORR sans `switch_terrain` (eau/lave/ice). Held-out dangereux, nommé.

## Occupation `still_chewing` vs move bump

C n’appelle pas `still_chewing` depuis `#eat` sauf `&hands_obj` (barreaux). Mâcher un **mur** se fait en marchant dans l’obstacle. Callers C `hack.c` `test_move`/`umove` :

- `hack.c:1024` IRONBARS + rust/corr/metallivore + `mode==DO_MOVE` → `still_chewing` puis `return FALSE` (le tour est consommé par le chew, pas un pas).
- `hack.c:1037` `tunnels && !needspick` (rock mole) sur `IS_OBSTRUCTED`.
- `hack.c:1087` même garde sur **porte** fermée (« Eat the door »).
- `hack.c:1225` boulder : tunnels mâchent **avant** `moverock`, hors Sokoban.

JS D-0937 exporte `still_chewing` mais ne câble **aucun** de ces quatre sites. `git show` du SHA : `still_chewing` n’apparaît dans `hack.js` que comme définition en fin de fichier ; `eat.js` est le seul import. Un poly rust monster qui **marche** dans des barreaux JS : message C « cannot pass » / chew, JS bump générique. Un rock mole contre un mur : C effort 30+udaminc, JS rien. D-log « retire still_chewing » survend : seul `#eat` bars est live. Les quatre callers move restent une omission **structurelle**, pas un deferral named du D-log (qui cite watch/shop/trap, pas umove).

`hands_obj` : sentinelle `weapon.js`. C `&hands_obj` objet statique. JS `otmp0 === hands_obj`. OK.

`dissolve_bars` C `monmove.c:2170` : `levl[x][y].typ` puis `levl[x][y].flags = 0`. JS remet `flags` et `doormask=D_NODOOR`. Si `flags` JS mélange wall_info et doormask (déjà vu nodig), zéroer les deux est plus large que C — peut effacer un bit de vision/secret. Non nommé.

Nondiggable C (`hack.c:657`) n’OR **pas** `flags` :

```
if (!boulder
    && ((IS_OBSTRUCTED(lev->typ) && !may_dig(x, y))
        || (lev->typ == IRONBARS && (lev->wall_info & W_NONDIGGABLE)))) {
    You("hurt your teeth on the %s.", ...);
    nomul(0);
    return 1;
}
```

JS `wi = wall_info | flags`. Un doormask avec le bit `W_NONDIGGABLE` coincidant → dents blessées à tort, **zéro** `rnd` consommé (pas de chew). Divergence silencieuse hors suite publique. `may_dig` C ignore les barreaux (commentaire C ligne 659) ; le second bras bars est **obligatoire**. JS `may_dig_local` dupliqué : si le vrai `may_dig` de `dig.js` évolue (quest, shop walls), le chew restera sur la copie.

`digging.level` JS `{dnum:0,dlevel:0}` puis `assign_level_dig(..., u.uz)`. Si `assign` no-op, `on_level_dig` au tour suivant voit 0,0 vs uz réel → **re-start** chew chaque pas (effort jamais >100). À falsifier avec un dump `context.digging` ; le journal n’en a pas.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7/10**
- Si je ne devais retenir qu’une critique : le bras floorfood+`hands_obj` suit `eat.c`, mais `still_chewing` est un demi-`hack.c` (watch/shop/trap coupés) livré dans un commit de cadence #1205 — mélange processus + partial vendu « cluster retired ».
