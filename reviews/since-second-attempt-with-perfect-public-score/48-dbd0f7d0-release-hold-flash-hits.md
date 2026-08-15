# Review 48 — `dbd0f7d0` — `release_hold` + `flash_hits_mon`

## Métadonnées
- Hash complet / court : `dbd0f7d099f93b3dd1ea7496b63a21cb663b0433` / `dbd0f7d0`
- Parent : `ef29ee55a1403d4d1bac8d140881ae5f75ba3e43`
- Auteur, date : Raphaël Hervier, 2026-07-22 02:08:17 +0200
- D-id : D-0979
- Stats : 13 files, +308/−130 (JS : `uhitm.js` +132, `zap.js` +94,
  `apply.js` −net via extraction)
- Fichiers JS / map / cadence : **deux familles C** (zap.c hold,
  uhitm.c flash) dans un SHA ; rotation #1249

## Intention vs livrable
CURRENT next après D-0978 listait les deux : `release_hold WAN_OPENING`
**et** `flash_hits`. Le commit les porte ensemble. Question « Two
clusters ? » : **oui.** `release_hold` = grab/swallow/sticks.
`flash_hits_mon` = caméra / WAN_LIGHT / FLASHED_LIGHT. Liés seulement
par la row debt `apply.js` et par `do_break_wand`. Ce n’est **pas**
wand of lightning (buzz AD_ELEC) — c’est lumière. Titre exact sur
les noms C, trompeur si on lit « lightning ».

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/zap.js` | `release_hold` ; `bhitm` WAN_OPENING/LIGHT ; `zapyourself` OPENING |
| `js/uhitm.js` | `flash_hits_mon` + `light_hits_gremlin` + `resists_blnd` mince |
| `js/apply.js` | break-wand `release_hold` ; `bhit_flashed_light` minvis await flash ; **supprime** la copie locale flash |
| `js/mhitu.js` | export `digests` / `set_ustuck` / `unstuck` / `expels` |
| `js/mon.js` / `monmove.js` | export `wake_nearto` / `sticks` |
| docs | D-0979 |

## Fidélité C ↔ JS

### `release_hold` (C `zap.c` 578–609)
Trois bras :
1. `!u.ustuck` → `impossible` ; JS return silencieux.
2. `uswallow` : si `digests(data)` pline mouth / rush of air ; **toujours**
   `expels(..., TRUE)` (même non-digest). JS copie.
3. `sticks(youmonst.data)` : `set_ustuck(NULL)` **puis** « You release ».
   Ordre C commenté (botl UHold). JS `set_ustuck(null)` puis You.
4. sinon : `unstuck(ustuck)` ; relbuf `from X's grasp` vs `by X` si
   `nohands`. JS approx `s_suffix` (it→its, sibilant `'` vs `'s`).

Callers branchés :
- `do_break_wand` WAN_OPENING si `u.ustuck` (C `apply.c` ~3977)
- `bhitm` WAN_OPENING/SPE_KNOCK si `mtmp==ustuck` ; `wake=false` ;
  mimic `seemimic` sans `box_or_door`/`that_is_a_mimic` (C plus
  précis)
- `zapyourself` WAN_OPENING/SPE_KNOCK si ustuck

**Sautés vs C `zapyourself` (zap.c 2929–2946) :**

```
if (u.ustuck) {
    release_hold();
    learn_it = TRUE;
}
if (Punished) {
    learn_it = TRUE;
    unpunish();
}
if (!u.utrap || !openholdingtrap(&gy.youmonst, &learn_it)) {
    boxlock_invent(obj);
    (void) openfallingtrap(&gy.youmonst, TRUE, &learn_it);
}
```

JS câble le `if (ustuck) release_hold()` seulement. Un héro enchaîné
qui se zappe OPENING **reste** puni. `bhitm` saute `openholdingtrap`
/ `openfallingtrap` / SPE_KNOCK `mhurtle`. Nommé. Callers branchés :
break-wand, `bhitm` OPENING, self. C a d’autres sites `release_hold`
(commentaire zap.c:390) — hors envelope si non câblés.

### `flash_hits_mon` (C `uhitm.c` 6341–6421)
C uhitm.c 6356–6373 : `notonhead` → 0. Mimic :

```
if (M_AP_TYPE(mtmp) != M_AP_NOTHING) {
    int oldglyph = glyph_at(mx, my);
    mhidden_description(mtmp, MHID_ALTMON, whatbuf);
    wakeup(mtmp, FALSE);
    if (glyph_at(mx, my) != oldglyph) {
        pline("That %s is really %s%c", ...);
        res = 1;
    }
}
```

JS : `wakeup(false)` **sans** glyphe / `mhidden_description` → **pas**
de `res=1` mimic. Nommé. Un mimic flashé peut ne pas « apprendre »
la baguette (`learn_it` côté caller WAN_LIGHT). Le `wakeup` C appelle
`seemimic` → `newsym` ; JS wakeup mince peut ne pas démasquer.

Puis : si `msleeping && haseyes` wake + pline, `res=1`.
`else if mlet != S_LIGHT` : si `!resists_blnd` : dist2(ox,oy,mx,my) ;
pline blinded ; **gremlin** `d(1+spe,4)` si WAN_LIGHT sinon
`rnd(min(mhp,4))` ; `setmangry` ; si `tmp<9 && !isshk && rn2(4)`
`monflee(rn2(4)?rnd(100):0)` — **deux** `rn2(4)` + `rnd(100)`
conditionnels ; `mcansee=0` ; `mblinded = tmp<3 ? 0 : rnd(1+50/tmp)`
division entière. JS : `((50/tmp)|0)` ≡ C. `else` resist + verbose :
shine / illuminated, `res=2`. Si `res` && `!lev->lit` :
`display_nhwindow(WIN_MESSAGE, TRUE)` ; `res &= 1`. JS
`flush_topl_more` pour le More unlit.

`resists_blnd_mon` JS : noeyes / !mcansee / mblinded / **msleeping**.
C `mondata.c:resists_blnd` inclut msleeping **et** AD_BLND expl/gaze
**et** `resists_blnd_by_arti`. JS saute expl/gaze et artifact
(`shieldeff` nommé). L’ordre flash_hits teste sleep **avant**
resists, donc msleeping dans resists ne change pas ce chemin.

### `light_hits_gremlin` (C 6424–6445)
`!Deaf && mdistu<=90` wail/cry selon `dmg > mhp/2` ; sinon canseemon
recoil ; `mhp -= dmg` ; `wake_nearto(30)` ; mort → `monkilled` si
mon_moving sinon `killed`. JS `dx*dx+dy*dy` ≡ `mdistu`. Map_invisible
si !canspotmon : JS le fait (C aussi) — le commentaire JS dit omit
à tort.

### `bhit` FLASHED_LIGHT minvis
C continue après `flash_hits_mon` pour minvis. JS local
`bhit_flashed_light` était un no-op minvis (commentaire « no RNG
when flash deferred » — **faux** : C peut `rn2` flee sur ce path).
Ce commit **appelle** enfin flash. `obj.ox/oy` set au héro avant
l’appel (source du flash). Corriger un trou RNG caméra/wand light.

WAN_LIGHT `bhitm` : `flash_hits_mon` → learn_it + reveal_invis. C
zap.c ~475. Bon caller.

**Écart RNG concret (corrigé) :** minvis FLASHED_LIGHT brûle maintenant
`rn2(4)`/`rnd` gremlin comme C. **Écart restant :** mimic sans
`res=1` → `learnwand` moins souvent ; SPE_KNOCK hurtle absent
(`rnd(2)` sauté dans bhitm).

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/fs/node/fastforward. Rule #2 RAS.
Frozen RAS. Extraction apply→uhitm : 1:1 C `uhitm.c:flash_hits_mon`
enfin au bon fichier (la copie apply était un smell). Exports
mhitu/monmove : wiring, pas de logique parallèle. `AD_BLND` hardcodé
`10` dans `monkilled` — fragile si les constantes divergent, pas un
trace-hardcode.

## Densité (§2b)
**Deux clusters dans un commit.** Playbook : « If success/failure
needs two unrelated theories, split. » Théorie A : zapping OPENING
libère `ustuck`. Théorie B : un flash aveugle/fuit/gremlin.
Callers différents (opening vs light/camera). CURRENT les avait
listés ensemble — le picker a fusionné. +308/−130 dont une
**suppression** de duplicata apply : la moitié est un move, pas un
double port. Borderline too-big, pas le +707 du D-0978.

## Documentation
D-0979 deferred : opening traps, SPE_KNOCK hurtle, saddle,
Punished unpunish, mhidden_description/glyph, shieldeff arti,
see_monster_closeup. Honnête. debt apply retire « release_hold /
flash_hits still deferred ». turns uhitm/zap mis à jour. Le D-log
ne dit pas « complete grab » ni « complete light ». Overclaim
évité. « Two clusters » n’est pas avoué.

## Vérification
green+strict ; zap/apply **34/35** (0009). Caméra / WAN_OPENING /
gremlin non cités. La correction minvis RNG **devrait** se voir
sur un seed caméra si un existait dans la cohorte — non nommé.
Pas de cadence. Extraire flash apply→uhitm **change** qui appelle
`rn2` flee : avant, minvis était un no-op (commentaire « no RNG
when flash deferred » — **faux** vs C). Ce SHA **restaure** des
tirages. Un seed caméra qui était PASS par omission RNG peut
diverger **ici**, pas au D-0978. La cohorte 34/35 ne le dit pas.

## Risques / dette
1. **Deux familles** — revert hold casse flash et inversement.
2. `zapyourself` OPENING sans `unpunish` / traps / `boxlock_invent`.
3. `bhitm` SPE_KNOCK sans `mhurtle` (`rnd(2)`).
4. Mimic flash sans `res` glyphe → learnwand.
5. `resists_blnd` sans AD_BLND expl/gaze / artifact.
6. `impossible` hold manquant (debug only).
7. Confusion lightning vs light dans le narratif loop.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7/10**
- Si je ne devais retenir qu’une critique : `release_hold` est un
  port zap fidèle sur les trois bras swallow/sticks/unstuck, et
  `flash_hits_mon` rétablit enfin le RNG minvis, mais c’est deux
  clusters C collés ; OPENING self-zap sans `unpunish` n’est pas
  le C `zapyourself`.
