# Review 46 — `10b05acb` — passtune + open/close drawbridge

## Métadonnées
- Hash complet / court : `10b05acba460b956e2f8e65e193d7c20243e3ec1` / `10b05acb`
- Parent : `35c3ab90795bcad23ba05271b9d0d6ee8647124e`
- Auteur, date : Raphaël Hervier, 2026-07-22 01:48:43 +0200
- D-id : D-0977
- Stats : 10 files, +377/−50 (JS : `dbridge.js` +170, `music.js` +164)
- Fichiers JS / map / cadence : music + dbridge ; debt/turns ; pas de
  cadence

## Intention vs livrable
Porter passtune (`getlin` / ynq) et open/close drawbridge pour le
Castle. Livrable : `do_play_instrument` après improvisation `n` ;
Mastermind gears/tumblers ; `open_drawbridge` / `close_drawbridge`
terrain+messages+`delallobj`. Crush `set_entity`/`do_entity` et
`revive_nasty` **sautés** (nommés). Ce n’est pas `destroy_drawbridge`
(D-0959). Titre un peu large (« open/close ») : oui pour le terrain,
non pour l’écrasement.

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/music.js` | Passtune, getlin, 3×3 `find_drawbridge`, hints Mastermind |
| `js/dbridge.js` | `open_drawbridge` / `close_drawbridge` / `delallobj` local |
| map / D-LOG | D-0977 ; crush named omit |

## Fidélité C ↔ JS

### `do_play_instrument` passtune (C 759–898)
Ordre C après `c != 'n'` improvisation :
1. si `uheard_tune==2` : `ynq("Play the passtune?")`
2. `q` → Never_mind, `ECMD_OK`
3. `y` → `strcpy(buf, tune)` **sans** retester `uheard_tune`
4. sinon `getlin` 5 notes, `mungspaces`, ESC → nevermind, `highc` +
   H→B
5. pline strange sound / vibrations ; `Hero_playnotes`
6. **seulement** `Is_stronghold` : `exercise(WIS,true)` ; si
   `strcmp(buf,tune)==0` scan 3×3 `find_drawbridge` (mute x,y) ;
   `uheard_tune=2` ; `ACH_TUNE` ; DOWN → close sinon open ; return
   TIME
7. sinon si !Deaf : `uheard_tune` min 1 ; si pont adjacent,
   Mastermind `matched[5]`, gears (note exacte) puis tumblers
   (note ailleurs, `buf[y]!=tune[y]`) ; plines ; gears==5 → tune
   connue

JS : `c==='y' && uheard_tune===2` pour coller le tune — plus strict
que C `c=='y'`, mais on n’arrive ici que si improvisation a renvoyé
`n`, donc `c` est `n` sauf après ynq passtune. Équivalent en
pratique.

C getlin (music.c 793–796) :

```
getlin("What tune are you playing? [5 notes, A-G]", buf);
(void) mungspaces(buf);
if (*buf == '\033')
    goto nevermind;
```

**Écarts :**
- JS : `buf.charCodeAt(0) === 0x1b || buf === ''` → nevermind. C :
  seule ESC abort. Une ligne vide **joue** en C (échec de tune,
  Mastermind si pont adjacent). JS ne brûle pas `exercise(WIS)` ni
  les hints sur ce chemin — moins de RNG que C si le joueur valide
  une ligne vide.
- `Hero_playnotes` no-op (audio).
- `game.tune` vs C `svt.tune` — si le tune n’est pas hydraté au
  même moment que le recorder, Castle entier dérive. Hors diff ;
  à vérifier à l’init.
- `find_drawbridge(xy)` mute `xy` comme C `find_drawbridge(&x,&y)`
  (si IS_DRAWBRIDGE ou wall → décale vers le span). Dépend du
  D-0959. Ce commit ne reteste pas les dir DB_NORTH/SOUTH.

Mastermind : boucles `xi < buf.length` avec `xi < 5` ; gears puis
nested tumblers. Copie C. **Pas de RNG** dans les hints (C non plus :
pas de `rn2` ici). `exercise(WIS)` uniquement stronghold — fidèle
(essayer la fausse tune **coûte** un WIS roll C `exercise` qui peut
RNG). C `exercise(A_WIS, TRUE)` **a** un RNG interne. JS aussi si
`exercise` est porté. Ordre : exercise **avant** strcmp — JS identique.

### `close_drawbridge` (C 775–834)
Typ doit être `DRAWBRIDGE_DOWN`. Wall via `get_wall_for_db`. Message
coming/going : C
`((u.ux==x || u.uy==y) && !Underwater) || distu(x2,y2)<distu(x,y)`.
JS copie. Terrain : span → `DRAWBRIDGE_UP`, wall → `DBWALL`,
horizontal selon NS vs EW. C dbridge.c 768 :

```
lev2->wall_info = W_NONDIGGABLE;
```

**JS :** `lev2.wall_info = (lev2.wall_info | 0) | W_NONDIGGABLE`.
Si d’autres bits étaient présents (W_NONPASSWALL, etc.), JS les
**garde** ; C les **écrase**. Écart géométrique (dig/passwall).
Un mur de pont qui héritait un flag « passable » resterait passable
en JS après close.

Puis C (dbridge.c 770–791) : `set_entity`/`do_entity` **deux fois**
(worm tail : second `set_entity(x2,y2)` après le premier `do_entity`)
; smash You_hear si OBJ_AT ; `revive_nasty` x **et** x2 ; `delallobj`
x et x2 ; deltrap ; engr ; newsym ; `block_point(x2,y2)` ; `nokiller`.
JS saute entity/revive/nokiller ; `delallobj` local (uball `unpunish`,
skip uchain, `delobj`) ; `recalc_block_point` + `vision_recalc(0)`.
Un héro/monstre sur le span **n’est pas** tué. Nommé, mais c’est le
risque Castle : un mercenaire sur la travée survit au close, puis
le terrain devient `DRAWBRIDGE_UP` sous ses pieds.

Mastermind C (music.c 854–868) : gears = note exacte `buf[x]==tune[x]`
marque `matched[x]` ; tumblers = note ailleurs **et** `buf[y]!=tune[y]`
(une note déjà bien placée n’est pas re-comptée comme tumbler). JS
copie les deux boucles. **Pas de `rn2`.** Le seul RNG du chemin
stronghold est `exercise(A_WIS, TRUE)` **avant** `strcmp` — C
« just for trying », même sur une fausse tune. JS identique. Un
`exercise` après open décalerait tout le suffixe Castle.

### `open_drawbridge` (C 840+)
Symétrique : UP → DOWN, wall → DOOR `D_NODOOR`, messages gears vs
coming/going (`distu(x2)<distu(x)` → going). C `unblock_point` ;
JS `recalc_block_point`. `uopened_dbridge` si stronghold. C
`delallobj` **seulement** sur (x,y) pas (x2,y2) à l’ouverture —
JS aussi (pas de delallobj x2). Fidèle vs C `open_drawbridge` :
les objets sur le **mur** (x2,y2) restent ; seuls ceux de la travée
sont détruits. Crush/revive encore omis — un monstre sur (x,y) à
l’ouverture n’est pas `do_entity`. `uopened_dbridge` C est un flag
d’événement Castle ; JS le pose si `Is_stronghold` — hors RNG.

**Tune/RNG :** pas de `rn2` dans open/close. Le seul RNG voisin est
`exercise(WIS)` à l’essai stronghold. Ordre : pline sound → notes
noop → Is_stronghold → exercise → strcmp. Un `exercise` **après**
open casserait le préfixe. `ynq("Play the passtune?")` n’a **pas**
de `rn2` ; ESC/`q` → nevermind **sans** `ECMD_TIME`. JS identique.

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/fs/node/fastforward. Rule #2 RAS.
`getlin` = input déjà sur le contrat getline. Frozen RAS.
`delallobj` dupliqué (invent.c C) au lieu d’un 1:1 `invent.js` —
odeur de copie locale, pas un ban.

## Densité (§2b)
Right size. Caller music + callees dbridge open/close. Une envelope
Castle. ~330 LOC. `destroy_drawbridge` non retouché. Pas deux
hypothèses (open/close sont les callees du même passtune). Crush
`do_entity` volontairement hors envelope — densité correcte, dette
géométrique ailleurs.

## Documentation
D-0977 : crush/entity, revive_nasty, Blind/Unaware You_see polish.
turns/debt : passtune retiré de « still deferred ». Honnête sur
l’écrasement. `wall_info =` vs `|=` **non nommé**. Empty-tune
nevermind **non nommé**.

## Vérification
green+strict ; apply/music cohort **36/37** (0009). Aucun seed Castle
/ tune cité. La cohorte ne **prouve pas** gears/tumblers ni close
sous le héro. Fortress sans cadence. `game.tune` hydratation n’est
pas un test de session : si le recorder hydrate `svt.tune` avant
le premier play et que JS le fait au `mklev` Castle, l’ordre
`exercise` vs strcmp reste le même **à condition** que la chaîne
de cinq notes soit identique. Un mismatch de tune se verrait en
écran (pont qui ne bouge pas) plus qu’en keystream, sauf
`exercise(WIS)` toujours brûlé sur stronghold.

## Risques / dette
1. **Pas de crush** — lever/baisser le pont sous un monstre/héros
   laisse l’occupant (géométrie + combat).
2. `wall_info |=` vs C assignation.
3. `getlin` vide abort JS ≠ C.
4. `Hero_playnotes` / Soundeffect.
5. `game.tune` hydratation.
6. `delallobj` local vs invent unpaid/resist.
7. `Soundeffect` / chains rattling omit — screens Castle sourds,
   pas de RNG.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7/10**
- Si je ne devais retenir qu’une critique : Mastermind et l’ordre
  exercise→strcmp→find_drawbridge sont C, mais open/close sans
  `do_entity` font un pont décoratif — la géométrie Castle n’est
  fidèle que si la travée est vide.
