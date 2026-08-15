# Review 35 — `3f9081eb` — Ring_on/off + `float_down` (D-0966)

## Métadonnées
- Hash complet / court : `3f9081eb2a0e6740aec03a2aa6367f494b80426d` / `3f9081eb`
- Parent : `526eb273c9dc292a528ca0c005c3615cc69ca878`
- Auteur, date : Raphaël Hervier, 2026-07-22T00:41:37+02:00
- D-id : **D-0966**
- Stats : 13 files, +458/−77
- Fichiers JS / map / cadence : `js/do_wear.js` (+204), `js/trap.js` (+166), `js/attrib.js` (+24), `js/steed.js` (+13), `js/eat.js` (+6) ; `docs/c-js-map/debt.md`, `turns.md` ; pas de cadence

## Intention vs livrable
Promet `learnring`/`adjust_attrib` sur Ring_on/off, `float_down`, et dismount `float_down(0, W_SADDLE)` au lieu d’un `pickup(1)` inliné.

Le diff le fait. Paire avec **D-0956** (`Ring_gone` / `float_up` / `rescham` / choke) : le pipeline anneau devient `setworn` → `Ring_on` ; `Ring_off_or_gone` → `float_down`/`learnring`/`adjust_attrib`. **RIN_STEALTH / `toggle_stealth` reste named omit** (D-0970). Pas de mélange cadence. D-id présent. Titre aligné.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/do_wear.js` | Port C : `learnring`, `adjust_attrib`, `Ring_on`, expansion `Ring_off_or_gone` ; wiring `set_wear` / `accessory_or_armor_on` |
| `js/trap.js` | Port C : `float_down` |
| `js/attrib.js` | Port C : `extremeattr` |
| `js/steed.js` | Wiring : dismount → `float_down(0, W_SADDLE)` |
| `js/eat.js` | Wiring mince (Ring_gone callers / comments) |
| map / D-log / journal | D-0966 + deferrals stealth/sink/Punished |

## Fidélité C ↔ JS

### `extremeattr` — `attrib.c:1268` → `js/attrib.js`
C : lolimit=3, hilimit=25 ; STR `hilimit=STR19(25)=125`, gauntlets power `lolimit=hilimit` ; CON `u_wield_art(ART_OGRESMASHER)` idem ; INT/WIS dunce cap 6. Return `curval==lo || curval==hi`.

JS : STR + gauntlets + dunce **identiques**. CON Ogresmasher **deferred** (commentaire + `acurr` aussi). **Confirmation** STR/dunce ; **écart nommé** CON art.

### `learnring` — `do_wear.c:1193`
C : si `observed` : `oc_name_known` → `observe_object` ; else `dknown` → `makeknown`. Puis si `dknown && oc_name_known` **et `oc_charged`** → `ring->known=1` ; `update_inventory()`.

JS : même bras observed. Puis :

```js
if (ring.dknown && oc?.oc_name_known) {
    if (otyp_is_charged(ringtype) || oc.oc_charged) ring.known = 1;
    // update_inventory deferred
}
```

**Écart concret :** C teste **uniquement** `objects[ringtype].oc_charged`. JS ajoute `otyp_is_charged(ringtype)` (OR). Chemin `known=1` extra si le helper JS et `oc_charged` divergent. `update_inventory` sauté (perm invent) — nommé, pas de RNG.

### `adjust_attrib` — `do_wear.c:1223`
C : `old=ACURR` ; `ABON+=val` ; `observable=(old!=ACURR)` ; si `observable || !extremeattr` → `learnring(obj, observable)` ; `botl`.

JS : `acurr` / `u.abon.a[which]+=val` — même ordre, **pas de RNG**. **Confirmation.** Caller Ring_on : `+obj.spe` STR/CON/CHA ; Ring_off : `-obj.spe`.

### `Ring_on` — `do_wear.c:1242` → `js/do_wear.js`
**Porté, ordre C :**
1. Unwield si `uwep`/`uswapwep`/`uquiver` **avant** le switch.
2. `oldprop` : ne strip `W_RING` que si `(oldprop & W_RING) != W_RING` (deux anneaux même type).
3. SEE_INVIS : `set_mimic_blocking` + `see_monsters` ; msg + `learnring` si `Invis && !oldprop && !HSee_invisible && !Blind`.
4. INVIS : `learnring` **avant** `newsym`/`self_invis_message` — **ordre C**.
5. LEVITATION : `float_up` + `learnring` + `spoteffects(FALSE)` si encore Levit ; else `float_vs_flight`.
6. STR/CON/CHA `adjust_attrib` ; accuracy/damage `uhitinc`/`udaminc` ; PfSC `rescham` ; PROTECTION `learnring` si `spe!=0` + `find_ac`.
7. WARNING `see_monsters`. No-op types (teleport, regen, …) via `default`.

**Sauté :** `RIN_STEALTH` → `toggle_stealth(obj, oldprop, TRUE)` — `break` commenté. Sink-fall death au-delà de `spoteffects(false)` nommé.

**Callers branchés :** `set_wear` appelle `Ring_on` pour `uright`/`uleft` (C `set_wear` idem). `accessory_or_armor_on` : `setworn` puis `Ring_on` puis `on_msg` seulement si encore porté (C : anneau peut tomber dans un sink). **Confirmation** du contrat put-on.

### `Ring_off_or_gone` — `do_wear.c:1347`
**Porté :** takeoff mask ; `setworn(null)` slots ; SEE_INVIS/INVIS msgs + `learnring` ; LEVITATION `float_down(0,0)` + `learnring` si `!Levitation` ; accuracy/damage ; PROTECTION ; PfSC `restartcham` si plus PfSC ; `adjust_attrib` négatif.

**Écart `gone` :** C `gone` → `setnotworn(obj)` ; `!gone` → `setworn(NULL, owornmask)`. JS `void gone` puis toujours `setworn(null, RINGL/R)`. Si `setnotworn` fait plus que clear slot (flags objet détruit/mangé), le chemin eat/Ring_gone D-0956 peut diverger. À relier à D-0956 : ce commit ne distingue toujours pas gone vs off au niveau C.

**STEALTH** toujours stub. C off : `toggle_stealth(obj, (EStealth & ~mask), FALSE)` — oldprop **après** clear, mask strip. D-0970 devra coller cet ordre.

### `float_down` — `trap.c:4024` → `js/trap.js`
**Porté :**
- `HLevitation &= ~hmask` ; `ELevitation &= ~emask` ; encore Levit → return 0.
- `BLevitation` : `trapped = (B==I_SPECIAL)` ; `float_vs_flight` ; pline jaws/web/chain/lava/ground ; `encumber_msg` ; return 0.
- `botl` ; `nomul(0)`.
- `BFlying` → maybe Flying regain msg + return 1.
- `uswallow` → float down still swallowed/engulfed + return 1.
- `!Flying` : pool `drown` ; lava `lava_effects`.
- Messages come-down **sauf** `(emask & W_SADDLE)` — C idem (dismount silencieux sur le « float gently »).
- Sokoban + trap : hallu crash / « You fall over. » ; `losehp(rnd(2), "dangerous winds")` ; `dismount_steed(DISMOUNT_FELL)`.
- Steed floater/flyer : « settle more firmly ».
- `dotrap` : skip STATUE_TRAP ; HOLE/TRAPDOOR seulement si `Can_fall_thru && !ustuck` ; sinon true ; skip si déjà `utrap`.
- `pickup(1)` si même `dnum`/`dlevel` et pas air/water/swallow.

**RNG :** `rnd(2)` Sokoban — **présent**, clang LTR après le message. Un seul `rn2`/`rnd` dans cette fonction côté C pour ce bras.

**Sauté (nommé) :**
- Punished : relocate hero to `uball` si pool/pit/hole et boule pas portée.
- ustuck : C `sticks()` / `digests()` msgs puis `set_ustuck(0)` ; JS `ustuck=null` **sans** pline. Swallow : JS `is_animal` vs C `digests()` — **écart de prédicat**.
- `selftouch` Sokoban.
- `surface()` C (ice/air/water/…) ; JS `floor`/`ground` seulement.

**Callers :** Ring_off LEVITATION ; steed dismount `float_down(0, W_SADDLE)` — C `dismount_steed` appelle `float_down(0L, W_SADDLE)` pour le même skip message. **Confirmation** du wiring D-0956→D-0966.

### Pipeline D-0956 vs D-0966
D-0956 : `Ring_gone` / `float_up` / `rescham`. D-0966 : `Ring_on` miroir + `float_down` + `learnring`/`adjust_attrib`. Les deux bouts du même switch `do_wear.c`. STEALTH volontairement laissé pour D-0970 — cohérence de cluster, pas un trou oublié dans le D-log.

### `set_wear` / `accessory_or_armor_on` — callers
C `set_wear` : si déjà `uright`/`uleft`, appelle `Ring_on` (gi.initial_don pour skip stealth). JS pose `game._initial_don = all` puis `Ring_on` uright/uleft puis clear. **STEALTH skip via `_initial_don` n’existe pas encore** (toggle stub) — le flag est posé pour D-0970. Pas un mensonge : D-0966 nomme stealth omit.

C `accessory_or_armor_on` anneau : `setworn` dans le slot **puis** `Ring_on` **puis** `on_msg` seulement si l’objet est encore `owornmask` (sink-fall peut l’avoir enlevé). JS : même ordre `setworn` → `Ring_on` → `on_msg` si still worn. **Confirmation.** `spoteffects(false)` dans Ring_on LEVITATION est le bras sink ; la **mort** sink-fall reste omit (D-log). Un anneau de lévitation mis au-dessus d’un sink peut lever puis `spoteffects` sans le death path C complet.

### `Ring_off_or_gone` `gone` vs `setnotworn`
C :

```c
    if (gone)
        setnotworn(obj);
    else
        setworn((struct obj *) 0, obj->owornmask);
```

`setnotworn` n’est pas un alias de `setworn(NULL)` : il peut nettoyer `owornmask` sans passer par tous les `confer_oc_oprop` off, selon l’implémentation. JS `void gone` + `setworn(null, RINGL/R)` **unifie** eat/destroy et take-off. D-0956 `Ring_gone` appelle déjà `Ring_off_or_gone(obj, true)`. Si `setnotworn` JS n’existe pas, le chemin eat est le chemin off — risque de double `float_down` / `adjust_attrib` si `setworn` re-confère. À vérifier contre `setworn` : si mask déjà 0, `setworn(null, RINGL)` no-op. **Écart de contrat gone**, pas forcément un double RNG.

### `float_down` come-down — C suite
Après drown/lava, C teste `t_at`, airlevel tumble, waterlevel `You_feel("heavier.")`, puis messages sauf `emask & W_SADDLE`. Sokoban :

```c
                    losehp(rnd(2), "dangerous winds", KILLED_BY);
                    if (u.usteed)
                        dismount_steed(DISMOUNT_FELL);
                    selftouch("You slam into the ground as you fall.");
```

JS : `rnd(2)` + dismount ; **pas** `selftouch`. Un héros Sokoban avec cimier cockatrice au cou n’est pas touché. Nommé.

`pickup(1)` C si même niveau. JS importe `pickup` dynamiquement — await déjà dans le pipeline input. Pas de nouvel nhgetch.

Steed.js : remplacement d’un `pickup(1)` inliné par `float_down(0, W_SADDLE)`. C `dismount_steed` fait exactement ça. **Confirmation caller.** Sans W_SADDLE, le dismount imprimerait « You float gently to the floor » en trop.

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/fastforward/seeds. Frozen non touchés. Rule #2 OK. `float_down`/`Ring_on` async via pline/`drown` — await gameplay déjà établi. `float_down` dans `trap.js` comme C `trap.c`. `extremeattr` dans `attrib.js` comme C. **RAS** après grep.

## Densité (§2b)
Right size. Famille anneau + chute levitation + dismount caller. 204+166+24 lignes. Pas un `if` isolé. Pas mêlé à ice/explode/pray.

## Documentation
D-0966 « fixed » pour learnring/adjust_attrib/Ring_on/float_down/dismount — **vrai**. Deferrals : toggle_stealth, Punished, ustuck wording, selftouch, sink-fall, update_inventory. `debt.md` nomme stealth (prochain). Pas d’overclaim « wear complete ».

## Vérification
Journal : green+strict ; wear/steed/shared **20/20** (seed0116 wear-shop, seed0103/0104 ride, seed0004 pony). Cohorte **pertinente** (anneaux + steed). Pas de cadence — « fortress held » sans 44/44 dans ce hash. #1270 plus tard n’est pas ce commit.

Cohorte ride exerce `float_down(W_SADDLE)` ; wear-shop exerce put-on anneau (`Ring_on` + maybe sink `spoteffects`). Stealth msgs **non** exercés (stub) — D-0970 les testers. `rnd(2)` Sokoban : peu de seeds Sokoban dans 20/20 ; le bras peut rester vert sans le `selftouch` cockatrice.

## `float_down` vs `float_up` (D-0956)
`float_up` (déjà porté) pose H/E levitation et messages rise. `float_down` est l’inverse : clear masks, drown, trap, pickup. Les deux doivent partager `float_vs_flight` / `Levitation()` reader. Si `Levitation_fd()` JS diverge de `Levitation_dw()` (deux copies do_wear vs trap), un anneau off peut `return 0` trop tôt (encore Levit) ou tomber alors qu’un second anneau tient. **Smell duplication** de readers youprop — pas un seed hardcodé, mais un risque d’ordre.

`encumber_msg` appelé plusieurs fois (BLevitation, Flying, swallow, fin) comme C. Chaque appel peut pline. Skip un `encumber_msg` = moins de messages, pas de RNG.

## Risques / dette
1. `learnring` : `otyp_is_charged || oc_charged` vs C `oc_charged` only.
2. `toggle_stealth` absent (D-0970).
3. `void gone` vs `setnotworn`.
4. Punished ball relocate.
5. ustuck msgs + `digests` vs `is_animal`.
6. `surface()` simplifié ; Ogresmasher CON.


## Ring_on types no-op
C liste TELEPORTATION/REGEN/SEARCHING/HUNGER/AGGRAVATE/POISON/FIRE/COLD/SHOCK/CONFLICT/TELEPORT_CONTROL/POLY/POLY_CONTROL/FREE_ACTION/SLOW_DIGESTION/SUSTAIN_ABILITY/MEAT_RING en `break`. JS `default: break`. **Équivalent** tant qu’aucun de ces types n’a d’effet hors `setworn` (confer oprop). MEAT_RING vegan conduct : C commente « does not affect vegan » — JS default idem.

PROTECTION `observable = (spe != 0)` puis `learnring` même si +0 une fois le type connu (`learnring` interne `oc_charged`). C même chose. **Confirmation.**

SEE_INVIS on : `set_mimic_blocking` **toujours**, puis maybe message. Off : mimic seulement si `!See_invisible`. JS copie. Un anneau SEE_INVIS retiré pendant See_invisible intrinsèque ne doit pas `see_monsters` C — JS `if (!See_invisible_dw())`. **Confirmation d’asymétrie on/off.**

`uhitinc`/`udaminc` : addition/soustraction `spe` sans clamp. Deux anneaux accuracy : C oldprop W_RING mask empêche de strip l’autre ; les incs s’empilent via deux Ring_on. JS `u.uhitinc += spe` par Ring_on. **OK** si set_wear n’appelle Ring_on deux fois sur le même objet.

## Dismount W_SADDLE
C `float_down(0L, W_SADDLE)` : `emask` clear ELevit bit selle **et** skip come-down msgs. JS `float_down(0, W_SADDLE)`. Si W_SADDLE JS n’est pas le même bit que C `W_SADDLE`, le skip msg échoue (dismount « float gently ») **ou** ELevit clear trop. Const import `W_SADDLE` — vérifier 1:1 `const.js`. Hors diff, préexistant.



## `accessory_or_armor_on` on_msg
C n’affiche `on_msg` que si l’objet est encore porté après `Ring_on` (sink). JS idem. Si `on_msg` JS s’exécute **avant** Ring_on, le joueur verrait « you are now wearing » puis chute sink — ordre C inverse. Le diff `setworn` puis `Ring_on` puis on_msg. **Confirmation.**

`extremeattr` STR 125 : `STR19(25)` macro C = 118+7? En 3.7 STR19(25)=125. JS commentaire 125. Gauntlets of power : lolimit=hilimit ⇒ +0 ring n’apprend pas si déjà 125. **Confirmation** du +0 vs ceiling.

eat.js +6 : commentaires / Ring_gone caller. Densité : pas un port eat ; wiring cluster anneau. OK.


## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **8/10**
- Si je ne devais retenir qu’une critique : le pipeline Ring_on/off + `float_down(W_SADDLE)` est le bon cluster D-0956→D-0966 (ordre INVIS learnring, Sokoban `rnd(2)`), mais `learnring` élargit `oc_charged` et STEALTH reste un trou nommé, pas un oubli docs.
