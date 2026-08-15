# Review 86 — `8bba5965` — tutorial invent stash extrinsics

## Métadonnées
- Hash complet / court : `8bba5965abcc89a4c9b18c5217be4fdd2c24f6ae` / `8bba5965`
- Parent : `bafd1b112b6d03109a29d6c61af6c700d06b2b38`
- Auteur, date : Raphaël Hervier, 2026-07-23 17:50:36 +0200
- D-id : D-1015
- Stats : 7 files, +92/−55 (JS `do.js` +51/−46)
- Fichiers JS / map / cadence : `js/do.js` seul côté code ; `docs/c-js-map/startup.md` ; CURRENT **44/44** ; NOTES/D-log ; journal. **Bugfix FAIL (seed0009), pas un cluster map apply/pray.**

## Intention vs livrable
Promet : `setnotworn` via `setworn` pour que ELVEN_CLOAK STEALTH ne fuie pas `EStealth` après stash `nhl_gamestate` — restaure seed0009 Scr 73/73 et suite 44/44.

Livrable : `tutorial_enter_gamestate` n’annule plus les slots à la main ; il appelle `setnotworn` puis restaure `owornmask` comme flag. `setnotworn` lui-même passe par `setworn(null, propMask)` pour les bits armor/accessory. CURRENT passe à 44/44 Scr 11405/11405. Pas de mélange cadence quinquennal : c’est un peel du dernier FAIL public, ~24 h après #1285.

**Question constitutionnelle :** fake d’inventaire shapé seed, ou fidélité C tutorial/stash ?

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/do.js` | Fix `setnotworn` + `tutorial_enter_gamestate` |
| `docs/c-js-map/startup.md` | Rang tutorial : D-1015 setnotworn extrinsics |
| CURRENT | 44/44 ; retire seed0009 des non-PASS |
| NOTES / D-log | Cause EStealth / Ranger cloak |
| journal | D-1015 seed0009 + full sessions |

## Fidélité C ↔ JS

### Ce que C fait vraiment (tutorial n’est pas dans `u_init.c`)
Pas un leftover `u_init` « vider l’inventaire Ranger ». C’est **Lua tutorial** :

- `dat/nhlib.lua` `tutorial_enter()` → `nh.gamestate()` (save)
- `tutorial_leave()` → `nh.gamestate(true)` (restore)

`nhlua.c:nhl_gamestate` **save** (`!reststate && !gmst_stored`) :

```
wornmask = otmp->owornmask;
setnotworn(otmp);
freeinv(otmp);
otmp->owornmask = wornmask; /* flag for later restore */
/* chain gmst_invent */
```

Puis backup `u` / disco / mvitals / spl_book. JS `tutorial_enter_gamestate` : même ordre sur `game.invent` (shift = freeinv), restore `owornmask`, stash array. **Toujours omis** (déjà nommé D-0350) : memcpy `u`, disco, mvitals, spellbook, `lastinvnr=51`. Le commit ne prétend pas fermer restore `tutorial_leave`.

**Restore C** (`reststate && gmst_stored`) : `useupall` invent tutorial, `addinv_nomerge` + `setworn(otmp, wornmask)` si flag, memcpy `u` par-dessus. JS **n’a toujours pas** ce chemin. seed0009 meurt **dans** le tutorial : restore inutile pour *cette* session. Un héros qui sort du portal reprendrait JS sans ré-équiper — dette préexistante, pas introduite ici.

### `setnotworn` C vs JS
C `worn.c:setnotworn` **ne appelle pas `setworn`**. Il parcourt `worn[]` :

- match **pointeur** `obj == *(wp->w_obj)`
- `cancel_doff`
- slot = NULL
- `u.uprops[oc_oprop].extrinsic &= ~wp->w_mask`  ← **c’est le clear STEALTH**
- `monstunseesu_prop`
- `owornmask &= ~mask`
- artifact `set_artifact_intrinsic(obj, 0, mask)`
- `w_blocks` blocked bits
- `update_inventory` ; `recalc_telepat_range` ; pas de `find_ac`

JS avant D-1015 : nuller `uarmc` etc. **sans** toucher `uprops`/`EStealth`. D-0970 `confer_oc_oprop` STEALTH a rendu la fuite visible (Ranger cape elfique). Cause C-citée, pas un écran magique.

JS après : `propMask = owornmask & (W_ARMOR|W_ACCESSORY|W_SADDLE|W_BALL|W_CHAIN)` ; si non nul `setworn(null, propMask)` sinon fallback pointeurs. `setworn(null, W_ARMC)` → `confer_oc_oprop(old, W_ARMC, false)` qui doit faire `EStealth &= ~W_ARMC`. **Même effet pour une cape réellement portée.** `find_ac` skip (commentaire D-0810). `recalc_telepat_range` oui.

**Écarts concrets (pas un fake, une approximation) :**
1. C est **pointeur-égal** ; JS est **masque**. Si `owornmask` est déjà le flag de restore (objet plus dans le slot) et qu’on rappelle `setnotworn`, C no-op sur les slots courants ; JS `setworn(null, W_ARMC)` **déshabille qui porte W_ARMC maintenant**. Sur le chemin tutorial enter (objets encore portés), les deux coïncident.
2. C `cancel_doff` / `set_artifact_intrinsic` / `w_blocks` / `monstunseesu` absents.
3. C `set_twoweap` si obj est uwep/uswapwep ; JS `setuwep(null)` d’abord — plus large.
4. Commentaire JS cite **seed0009**. Constitution : pas de nom de seed dans le **contrôle**. Un commentaire n’est pas un `if (seed===9)`. Odeur, pas CONSTITUTION-RISK.
5. `setnotworn` est aussi appelé depuis `fire_damage` dans `do.js` (destroy armor). Le fix **globalise** le clear extrinsèque — plus C-fidèle sur ces chemins aussi, pas un special tutorial.

### Est-ce un « seed-shaped inventory fake » ?
Non. On ne force pas un inventaire Ranger vide, on ne hardcode pas « pas stealthy » à la mort seed0009, on ne clone pas un écran Attributes. On aligne le stash tutorial sur `nhl_gamestate`+`setnotworn` pour que `EStealth` suive `W_ARMC`. Le *déclencheur* est seed0009 ; le *mécanisme* est C. `u_init` n’est pas touché. Map startup nomme encore leave-tutorial invent restore.

## Constitution / playbook
Grep `do.js` du commit : pas FORCE/DIAG/fs/fastforward. Pas de coordonnées. Rule #2 OK. Frozen OK. Pas de `await` nouveau. Suite était **43/44** : un FAIL peel du dernier public est licite (ce n’est pas « suite PASS donc on invente un peel »). Mode NOTES « map-driven » vs journal « seed0009 user-reported » : tension process, pas un fake d’inventaire.

## Densité (§2b)
Petit et justifié : un bug C-cité, ~20 lignes nettes. Too small pour un *cluster map* ; right size pour un *fix worn*. Ce n’est pas le cluster « tutorial Lua complet ». Playbook post-PASS dirait de ne plus chasser les FAIL — ici la fortress n’était pas 44/44. Exception légitime.

## Documentation
D-1015 status « fixed (seed0009 Scr 72/73) » — avoue le peel. Cause/extrinsic/Ranger cloak. Verify : seed0009 73/73, **44/44**, green, cohort tutorial/wear 9/9. `startup.md` greffe D-1015 dans la ligne tutorial, **garde** « leave-tutorial invent restore » en omit. CURRENT retire « do not chase seed0009 ». Honnête. Overclaim : « setnotworn via setworn » n’est pas le C littéral (`setnotworn` ≠ `setworn`) — le D-log devrait dire « JS approxime setnotworn par setworn(null) + confer_oc_oprop ».

## Vérification
Journal : seed0009 PASS ; green+strict ; cohort 9/9 ; full sessions **44/44** Scr **11405**/11405 RNG 100 % speed `33+0.27/turn`. C’est la première preuve suite complète de cette série 81–86. Le +1 écran est exactement l’Attributes « You were stealthy » en trop. RNG déjà 100 % avant : cohérent (pas de `rn2` dans setnotworn).

### `nhl_gamestate` save — citation C
```1779:1788:nethack-c/upstream/src/nhlua.c
 } else if (!reststate && !gmst_stored) {
 /* store game state */
 gg.gmst_moves = svm.moves;
 while ((otmp = gi.invent) != NULL) {
 wornmask = otmp->owornmask;
 setnotworn(otmp);
 freeinv(otmp);
 otmp->owornmask = wornmask; /* flag for later restore */
```

JS après D-1015 :

```javascript
while (inv.length) {
    const otmp = inv[0];
    const wornmask = otmp.owornmask || 0;
    setnotworn(otmp);
    inv.shift();
    otmp.owornmask = wornmask;
    stash.push(otmp);
}
```

`inv.shift()` ≈ `freeinv` tête. C `gi.invent` est la tête `nobj` ; JS tableau. Si `invent[0]` n’est pas la tête C, l’**ordre** du stash s’inverse vs `gmst_invent` empilé en tête (`otmp->nobj = gmst_invent; gmst_invent = otmp`) — C **renverse** la liste en stashant. JS `stash.push` **préserve** l’ordre du tableau. Restore C ré-injecte depuis `gmst_invent` tête = **dernier** objet stashé = **ancien premier** invent… En fait C while invent : chaque objet est **prépendu** à gmst_invent → stash = invent inversé. Restore while gmst : extraie tête (dernier stashé = premier invent original si une seule passe… Premier `otmp=invent` original head, prepend gmst → gmst=head. Deuxième objet = ancien nobj, prepend → gmst=second, second.nobj=head. Stash = invent **inversé**. Restore prepend via addinv_nomerge : dépend de addinv. JS push puis (restore omis) : si un jour restore itère `stash` dans l’ordre, **lettres d’inventaire** peuvent ne pas matcher C. D-0350 omit restore : **dette d’ordre** à noter avant de porter `gamestate(true)`.

### `setnotworn` C — clear extrinsèque sans `setworn`
```150:184:nethack-c/upstream/src/worn.c
 for (wp = worn; wp->w_mask; wp++)
 if (obj == *(wp->w_obj)) {
 cancel_doff(obj, wp->w_mask);
 *(wp->w_obj) = 0;
 p = objects[obj->otyp].oc_oprop;
 u.uprops[p].extrinsic &= ~wp->w_mask;
 /* artifact, w_blocks, owornmask */
 }
```

JS `setworn(null, W_ARMC)` appelle `confer_oc_oprop(uarmc, W_ARMC, false)`. Si `uarmc === cloak` stashée, EStealth bit W_ARMC tombe. **C’est le fix seed0009.** Ranger start : `u_init` cape elfique `oc_oprop=STEALTH`, D-0970 a fait `EStealth|=W_ARMC`. Stash tutorial sans clear → Attributes mort « You were stealthy » alors que invent vide / `uarmc` null. C `setnotworn` évitait ça depuis toujours. JS inventait un « stealthy nu ».

`W_ACCESSORY` inclut W_AMUL/W_RING/W_TOOL. Cape = `W_ARMC` ⊂ `W_ARMOR`. `propMask` non nul → pas le fallback pointeur. OK.

Arme `setuwep(null)` **avant** le masque : C worn[] contient W_WEP. JS armes hors `propMask` (W_WEAPONS n’est pas dans le AND). `setuwep(null)` doit clear extrinsèques arme (D-0966ish). Hors ELVEN_CLOAK.

### Pourquoi ce n’est pas `u_init` shapé
On ne touche pas au kit Ranger. On ne teste pas `plname`/`seed`. `enlightenment` n’a pas de branche seed0009. Le +1 écran est la **conséquence** d’un extrinsèque C-absent. Constitution « no seed-shaped inventory fakes » vise les `if (seed===9) invent=[]` / FORCE appear. **Absent ici.**

Le journal « user-reported » + CURRENT 44/44 : preuve suite collée dans le même SHA que le fix. Mieux que 81–85 (green only). Cohort 9/9 tutorial/wear : seed0009 plus d’autres wear — si `setnotworn` casse un drop-feu, le cohort wear le verrait. Non listé quelles 9 sessions.

### `fire_damage` + `setnotworn`
`do.js` détruit armure par le feu : `setnotworn` puis `delobj`. Avant : slot null, **EStealth pouvait rester** après cape brûlée (même classe de bug que le tutorial). Après : clear via setworn. **Plus C** (`setnotworn` C sur destroy). Effet de bord **bénéfique** hors tutorial. Pas un special.

### Restore C (non porté) — pour ne pas le confondre avec le stash
```1740:1758:nethack-c/upstream/src/nhlua.c
 if (reststate && gg.gmst_stored) {
 svm.moves = gg.gmst_moves;
 while (gi.invent) useupall(gi.invent);
 while ((otmp = gg.gmst_invent) != NULL) {
 wornmask = otmp->owornmask;
 otmp->owornmask = 0L;
 extract_nobj(otmp, &gg.gmst_invent);
 addinv_nomerge(otmp);
 if (wornmask) setworn(otmp, wornmask);
 }
 memcpy u / disco / mvitals ;
 init_uhunger();
 free_tutorial();
```

C restore **setworn** les objets stashés **puis** memcpy `u` qui **écrase** les pointeurs `uarmc` etc. par le backup **pré-tutorial**. Les extrinsèques re-posés par `setworn` puis `u` restauré : l’ordre C est subtil (memcpy `u` après setworn peut **remettre** `u.uprops` du backup, donc EStealth revient avec la cape). JS n’implémente pas restore : **pas de régression leave**. Le stash enter doit quand même clear, parce que le héros **joue le tutorial sans inventaire** : C `find_ac` base 10, pas de cape, pas de stealth. JS avant D-1015 : pas de cape **affichée**, stealth **encore on** → mort tut Attributes. C’est exactement seed0009 écran 72/73 (disclose).

`gmst_moves` JS : `game.gmst_moves = game.moves`. C restaure `svm.moves` au leave. Enter-only : moves continue. OK.

`lastinvnr = 51` C après stash (prochaine lettre `a`). JS **non vu** dans le diff. Lettres d’objets ramassés **pendant** le tut peuvent partir de l’ancienne lettre (kit Ranger `i`/`j`…). Si seed0009 ramasse dans tut, une lettre off-by vs C. RNG 100 % avant le fix ⇒ soit pas de getobj invent letter dans la divergence d’écran, soit les lettres matchaient déjà. L’écran raté était Attributes stealth, pas un `What do you want to`. Dette `lastinvnr` pour plus tard, pas la cause D-1015.

### `startup.md` vs Constitution peel
La map nomme D-1015 **et** seed0009 dans la même cellule. C’est le ledger « evidence », pas du contrôle JS. Acceptable. « no seed names in production control flow » : le commentaire `do.js` « seed0009 death attrs » est la zone grise. Une phrase de reviewer : l’enlever au prochain passage `do.js`.

## Risques / dette
1. **`setnotworn` masque vs pointeur** — dangereux si réutilisé sur objets stashés au flag `owornmask`.
2. **Leave-tutorial restore toujours absent** — portal hors tut : inventaire/extrinsèques C vs JS.
3. **memcpy `u` / spells / disco** toujours stub — GMST incomplet.
4. **`set_artifact_intrinsic` off** manquant si un artefact est stashé.
5. Commentaire seed0009 à expurger du JS un jour.
6. Suite : porter `nhl_gamestate(true)` ; aligner `setnotworn` sur la boucle `worn[]` C (pointer + uprops) au lieu de `setworn(null)`.

`update_inventory` C en fin de `nhl_gamestate` (save **et** restore). JS stash : pas d’`update_inventory` dans le diff. Inventaire vide doit quand même redessiner perm_invent / botl AC. `find_ac` allmain plus tard (D-0810 delay). seed0009 écran stealth était Attributes **fin de partie**, après des tours tut : AC a eu le temps. Perm_invent mid-tut : possible 1 ligne d’écart non scorée si le session ne dump pas. Hors 72/73.

## Verdict
- Verdict : ACCEPT-WITH-DEBT
- Note : 8/10
- Si je ne devais retenir qu’une critique : ce n’est **pas** un fake d’inventaire seed-shaped — c’est le stash C `setnotworn`+`owornmask` flag — mais JS passe par `setworn(null, mask)` (égalité de masque, pas de pointeur), et le restore `gamestate(true)` reste un trou nommé depuis D-0350.
