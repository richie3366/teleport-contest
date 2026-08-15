# Review 62 — `85b2ab4b` — flooreffects fire_damage / doaltarobj / hot potion

## Métadonnées
- Hash complet / court : `85b2ab4b28afd2bd146d3b975f9fd417c9e6229f` / `85b2ab4b`
- Parent : `82dec1c82a1eb58c24f014d29bd00797df01ae4b`
- Auteur, date : Raphaël Hervier, 2026-07-22 04:00:09 +0200
- D-id : D-0992
- Stats : 9 files, +392/−145
- Fichiers JS / map / cadence : `js/do.js` (gros), `js/dothrow.js` (export `breakobj`) ; map turns ; pas de cadence

## Intention vs livrable
Message : « Complete remaining named flooreffects arms » — lava → `fire_damage`, autel `doaltarobj`/bknown, potion sol chaud. Le journal est plus honnête : « Globby pudding_merge still deferred ».

Le +392/−145 n’est **pas** une réécriture de D-0987 : `boulder_hits_pool` est **déplacé** sous `flooreffects` (même corps, mêmes named omit) pour insérer `fire_damage`/`doaltarobj` avant. `lava_damage` cesse de `return false` et appelle `fire_damage(true, x, y)` — c’est exactement le fallthrough C manquant depuis D-0987.

Écart de titre : « remaining arms » au pluriel alors que globby reste. D-log D-0992 Deferred le nomme.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/do.js` | Port C : `fire_damage` (mais module `do.js` ≠ `trap.c`), `doaltarobj`, bras hot potion ; move `boulder_hits_pool` ; wire `dropx`/`drop` |
| `js/dothrow.js` | Wiring : `export breakobj` |
| map turns / CURRENT / NOTES / D-log / journal | Docs |

## Fidélité C ↔ JS

### `fire_damage`
- Locus C : `trap.c:fire_damage` (~4455)
- Locus JS : `js/do.js:fire_damage` — **pas** `trap.js`. 1:1 cassé pour éviter un cycle `do↔trap` déjà chargé. `chest_trap` est dans `trap.js` ; `fire_damage` aurait dû le rejoindre.

Ordre C : `catch_lit` → return false si allumé contrôlé ; container/statue : ICE_BOX/STATUE immune ; CHEST 40 / LARGE_BOX 30 / default 20 ; `!force && (Luck+5) > rn2(chance)` survive ; sinon dump contents via `flooreffects` puis `delobj` ; non-container : `!force && (Luck+5) > rn2(20)` ; SCR/SPE (sauf FIRE/FIREBALL, Book smoke) destroy_strings 3/4 ; potion destroy_strings 1/2 (oil vs other) ; sinon `erode_obj(..., ERODE_BURN, EF_DESTROY)`.

JS recopie chances, `Luck+5 > rn2(...)`, dump `obj_extract_self` + `flooreffects` + `place_object`. `FIRE_DESTROY_STRINGS` index 1–4 aligné sur `destroy_strings` C.

RNG : `rn2(chance)` container puis, si non-container, `rn2(20)` — **pas les deux** (return early). Clang OK.

**Écart** :

```javascript
try {
  const { catch_lit } = await import('./apply.js');
  if (await catch_lit(obj)) return false;
} catch { /* catch_lit optional */ }
```

`catch_lit` existe depuis D-0978. Le `try/catch` **avale** un throw d’import/runtime et continue comme si l’objet n’avait pas pris feu — fallback inventé. C n’a pas d’« optional ».

`setnotworn` local (slots uarm* + armes) vs C `setnotworn` complet — named « polish beyond setnotworn ». Unpaid bill sauté (nommé).

### `lava_damage`
D-0987 s’arrêtait après le bras soft-material `delobj`. C : si pas brûlé tout de suite → `return fire_damage(obj, TRUE, x, y)`. JS maintenant identique. C’est la **complétion** D-0987, pas un rewrite du splash/fill boulder.

### `doaltarobj`
- Locus C : `do.c:doaltarobj` (~363)
- JS : `js/do.js:doaltarobj`

C : `if (Blind) return` ; non-coin : `!mon_moving && !gnostic++` livelog ; coin : clear bless/cursed ; bless/cursed → `There is an(hcolor) flash` + `bknown=1` si !Hallu ; else land + `bknown=1` si !coin.

JS : Blind return ; gnostic ; flash/land. `hcolor` local = identité (`Hallucination synonym deferred`) — **skip RNG** `hcolor` hallu. Nommé dans le helper, pas dans D-0992 Deferred (qui liste globby, pas hcolor).

**Écart conduct** : C `!u.uconduct.gnostic++` post-incrémente **toujours** (livelog si ancienne valeur 0). JS :

```javascript
if (uc && !(uc.gnostic | 0)) uc.gnostic = (uc.gnostic | 0) + 1;
```

N’incrémente **que** le premier drop. Deuxième objet sur autel : C `gnostic==2`, JS reste 1. Livelog nommé omit ; le compteur n’est pas un livelog.

`There()` helper préfixe `There ` — C `There("is %s flash...")` → « There is … ». OK.

### Hot-ground potion (`flooreffects`)
C 318–354 : `POTION && temperature>0 && (ROOM||CORR)` ; message heat si `cansee` ; `survival = blessed?70:50` ; `if (invlet) += Luck*2` ; oil → 100 ; `!obj_resists(obj, survival, 100)` → shatter `breakobj(..., FALSE, FALSE)`.

JS identique, y compris oil 100 et `invlet` luck. `obj_resists` consomme le RNG. Call `breakobj` exporté. Commentaire C « 50%/30% » est **faux vs le code 50/70 survival** ; JS a copié le **code**, pas le commentaire. Bon.

Globby : branche vide commentée — pas un rewrite, un trou nommé.

### `boulder_hits_pool` move
Le corps déplacé conserve `rn2(10)` fills_up, DRAWBRIDGE_UP traité comme ROOM (omit mask), `bury_objs` dans `try/catch { optional }` — fallback inventé **préexistant** D-0987, pas introduit. Named omit liste encore « Fire_resistance lava dmg » alors que le code **fait** le `rn2(6)` lava adjacent — commentaire stale, pas une régression D-0987.

### `dropx` / `drop`
C `dropx` : `ship_object` puis `IS_ALTAR → doaltarobj` puis `dropy`. JS ajouté. `drop` saute le verbose « You drop » sur autel — C identique. `flooreffects` `mon_moving && IS_ALTAR && cansee` → `doaltarobj` (drop monstre), pas le drop héros (`dropx` s’en charge). OK.

`flooreffects` coerce `where = OBJ_FREE` au lieu du `panic` C — préexistant D-0987, toujours un fallback.

### `fire_damage` vs `erode_obj`
Dernier bras C `erode_obj(obj, NULL, ERODE_BURN, EF_DESTROY) == ER_DESTROYED`. JS `await erode_obj(..., ERODE_BURN, EF_DESTROY)`. Si `erode_obj` JS ignore `EF_DESTROY` ou ne brûle pas le wood/leather, les armes en lava « hard » survivent trop. D-0987 lava soft-path (`oc_material < DRAGON_HIDE`) reste en amont ; `fire_damage(true)` force le skip luck (`force=true` → pas de `rn2(20)`). C `TRUE`. Un scroll en lava : soft-path C exclut SCROLL (`ocls != SCROLL`) puis `fire_damage` qui peut brûler le scroll. JS lava_damage même filtre puis fire_damage. OK.

Luck gate non-force : `(Luck+5) > rn2(20)` — Luck 13 → 18 > rn2(20) souvent survive ; Luck -5 → 0 > rn2 jamais. JS `Luck()` = `uluck+moreluck` comme C `Luck` macro. Pas `Luck_chest` de trap.js — troisième copie du helper.

### Hot potion `obj_resists(survival, 100)`
`obj_resists(obj, lo, hi)` C tire du RNG (souvent `rn2(100)` / artifact). Oil survival 100 → `obj_resists(obj, 100, 100)` ne casse presque jamais (C comment whale oil). JS POT_OIL force 100 **après** le +Luck — comme C (oil écrase). Blessed 70 + Luck*2 si `invlet` : un objet never-inventorié (`invlet==0`) n’a pas le luck adjust. C `if (obj->invlet)`. JS identique.

`breakobj(obj, x, y, false, false)` : hero_caused false → pas de shop billing D-0994 encore (ce commit exporte seulement). Shatter magasin silencieux jusqu’à 64.

### `doaltarobj` Blind
Early return : drop aveugle **pas** de bknown. C identique. Un drop autel Blind puis unidentify : bknown reste 0. `Hallucination()` JS pour skip bknown sur flash : C `if (!Hallucination) bknown=1`. OK. Bras non-blessé land : C set bknown même hallu. JS aussi (`if (!Hallucination)` seulement sur le bras flash).

## Constitution / playbook
Grep : pas FORCE/DIAG/fs. `fire_damage` dans `do.js` : 1:1 `trap.c` violé. `try/catch` catch_lit / bury_objs : fallbacks. Pas de seed hardcodé. `export breakobj` OK.

## Densité (§2b)
Right size : les trois bras flooreffects nommés après D-0987, plus le wire `dropx`. Globby volontairement hors cluster (next D-0993). Le déplacement `boulder_hits_pool` gonfle le diff (−145) sans changer la sémantique — lisible, pas un rewrite caché.

## Documentation
D-0992 Deferred globby/hmon/sellobj — pas `hcolor`, pas gnostic, pas try/catch. Message commit « Complete remaining » vs journal « globby still deferred » : le journal gagne. Map turns : fire/altar/hot via D-0992. CURRENT next → globby. Vérif journal : altar/throw cohort 20/21.

## Vérification
20/21 drop/throw (seed0009). Pertinent pour `dropx` autel et hot potion si une session a `temperature>0` (peu probable en public). `fire_damage` lava : dépend d’un land lava. Pas de trap/zap cohort alors que `fire_damage` est un callee `trap.c` (ignite, fire trap). Preuve green = non-régression, pas une preuve des nouveaux bras.

## Risques / dette
1. **`try/catch catch_lit`** — silencieux si apply.js casse.
2. **`gnostic` one-shot** vs post-increment C.
3. **`hcolor` identité** — skip RNG hallu autel.
4. Module : `fire_damage` dans `do.js`.
5. Globby encore vide (D-0993).
6. Commentaire omit `boulder_hits_pool` stale (Fire_resistance).
7. `FIRE_DESTROY_STRINGS[dindx]` si dindx hors 1–4 : C `destroy_strings` table plus large ; JS array sparse index 0 null. SCR=3 SPE=4 POT=1/2 — OK.
8. `drop` skip verbose autel : double message évité (doaltarobj parle). Si Blind, doaltarobj return et **aucun** « You drop » — C identique (verbose skip is altar typ, pas !Blind). Aveugle sur autel : silence total. C aussi.
9. `mon_moving` altar : seulement `cansee`. Drop monstre hors vue : pas de bknown. C identique.

## Questions ouvertes
- Le move `boulder_hits_pool` a-t-il changé un caractère ? Diff `-` puis `+` du même bloc : à juger identique au review ; le named omit Fire_resistance stale existe **des deux côtés**.
- `temperature > 0` : quel niveau public l’a ? Si aucun, hot potion est du code mort fortress.
- `catch_lit` try/catch a-t-il déjà fire dans D-0978 sans try ? Si oui, D-0992 **ajoute** un swallow.

### Citation C — `lava_damage` fallthrough
```4574:4614:nethack-c/upstream/src/trap.c
boolean
lava_damage(struct obj *obj, coordxy x, coordxy y)
{
    /* ... obj_resists Book exception ... */
    if (objects[otyp].oc_material < DRAGON_HIDE
        && ocls != SCROLL_CLASS && ocls != SPBOOK_CLASS
        /* ... FIRE_RES, WAN_FIRE, FIRE_HORN, !oerodeproof, !Has_contents */) {
        /* burn up + delobj */
        return TRUE;
    }
    return fire_damage(obj, TRUE, x, y);
}
```

D-0987 JS s’arrêtait au `return false` après le bras soft. D-0992 : `return fire_damage(obj, true, x, y)`. `force=true` saute les deux luck `rn2`. Un scroll en lave : pas soft-burn (oclass exclu) puis `fire_damage` luck-skip (force) puis destroy_strings. C identique.

### Citation C — hot potion
```339:354:nethack-c/upstream/src/do.c
        int survival_chance = obj->blessed ? 70 : 50;
        if (obj->invlet)
            survival_chance += Luck * 2;
        if (obj->otyp == POT_OIL)
            survival_chance = 100;

        if (!obj_resists(obj, survival_chance, 100)) {
            /* shatter messages + breakobj(obj, x, y, FALSE, FALSE) */
            res = TRUE;
        }
```

JS recopié. Le commentaire C au-dessus (« 30% blessed ») **contredit** le 70 survival. Le port a eu raison de suivre le code.

### `dropx` autel vs `flooreffects` autel
Deux callers `doaltarobj` : héros `dropx` (pas de `cansee` — Blind already return) ; monstre `flooreffects` si `mon_moving && IS_ALTAR && cansee`. Un throw héros sur autel distant passe par `flooreffects` **sans** `mon_moving` → **pas** de `doaltarobj` en C non plus (seul le drop aux pieds / land monstre). Throw sur autel : pas de flash bknown. C identique. Pas un bug JS.

`fire_damage` dump contents : `flooreffects(otmp, x, y, "")` verbe vide. C `""`. Recursion lava : contents d’un coffre brûlé retombent dans lava_damage/fire_damage. JS même recursion (flooreffects dans do.js appelle fire_damage dans do.js). Cycle fonctionnel voulu. `try/catch catch_lit` sur chaque content : N swallows possibles.

`Yname2` local : `the(xname)` capitalisé. C `Yname2` plus riche (possessive). Messages « The chest catches fire » vs « A chest… » : écart d’écran possible, pas de RNG.

`erode_obj` ERODE_BURN : si JS erode ne détruit pas, `fire_damage` return false et l’objet survive lava hard-path. D-0987 lava soft-path couvre cloth/wood ; le hard-path est le vrai ajout D-0992 (scroll/potion/armor erode). Cohort 20/21 drop/throw : lava land rare.

`doaltarobj` gnostic : hors scoring écran si le judge n’affiche pas le compteur. Divergence conduct quand même, pour un held-out `#conduct`.

`hcolor('amber'|'black')` stub : hors hallu, C `hcolor(NH_AMBER)` rend « amber ». JS `'amber'`. Match. En hallu C tire un synonyme (RNG). JS garde amber/black. Skip nommé dans le helper, pas dans D-0992 Deferred — dette mal indexée.

Le +392/−145 : `boulder_hits_pool` ~90 lignes coupées puis recollées = inflation. Le port net est fire_damage + doaltarobj + hot + dropx wire. Pas un rewrite D-0987 du fills_up `rn2(10)`. Confirmé : le named omit DRAWBRIDGE_UP/useupf/steed du bloc déplacé est inchangé. `try/catch bury_objs` préexistant, pas introduit.

`dropx` await `doaltarobj` : un objet posé sur autel consomme le flash avant le next nhgetch. C `pline` synchrone. Ordre écran OK si `_preNhgetchHook` capture après.

## Verdict
- Verdict : ACCEPT-WITH-DEBT
- Note : 7/10
- Si je ne devais retenir qu’une critique : ce n’est pas un rewrite D-0987 — `lava_damage→fire_damage(TRUE)` et le hot-potion `obj_resists` sont C — mais « complete remaining arms » + `catch { optional }` + `gnostic` one-shot empêchent un ACCEPT.
