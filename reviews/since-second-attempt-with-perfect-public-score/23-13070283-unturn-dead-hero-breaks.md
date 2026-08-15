# Review 23 — `13070283` — D-0955 `unturn_dead` / `hero_breaks` / ABON cancel

## Métadonnées
- Hash complet / court : `1307028380229debd2c331e5a8a592e0be87adf1` / `13070283`
- Parent : `aa0daecd5ffc1a6265e79aacae412a61add76447`
- Auteur, date : Raphaël Hervier, 2026-07-21 23:52:13 +0200
- D-id : **D-0955**
- Stats : 9 files, **+594 / −76**
- Fichiers JS / map / cadence : `js/zap.js` (+389), `js/dothrow.js` (+206), `js/apply.js` (commentaires) ; map ; journal #1224

## Intention vs livrable
Promesse : revive invent/minvent/floor via `unturn_dead` ; striking `breaktest`/`hero_breaks` ; `cancel_item` ABON **avant** clear `spe`.

Livrable : **trois clusters indépendants** dans un D-id. `unturn_dead` parcourt `game.invent` en tableau (correct). `cancel_monst` **n’est pas corrigé** et itère encore `nobj` sur ce tableau → **ABON héros never fires** sur cancel-self. `hero_breaks` est un port thin dothrow. `apply.js` +4 : commentaires d’omit seulement.

Trois théories de succès : (A) cadavre invent revive, (B) potion/verre floor break, (C) anneau gain-str cancel. Playbook : splitter.

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/zap.js` | Port `revive`/`unturn_*` ; ABON dans `cancel_item` ; wire bhitm/zapyourself/bhito |
| `js/dothrow.js` | Port `breaktest` élargi, `breakmsg`/`breakobj`/`hero_breaks`/`breaks` |
| `js/apply.js` | Docs : retire unturn/hero_breaks des named omit |
| map / D-log | D-0955 « fixed » |

## Fidélité C ↔ JS

### Cluster A — `unturn_dead` / `revive` — C `zap.c:1156` / revive
C : `otmp2 = is_u ? gi.invent : mon->minvent` ; while `nobj` ; `revive_egg` ; CORPSE `revive` ; messages owner/corpse ; `encumber_msg` si héros && res.

JS `unturn_dead` :
```
const items = is_u ? [...(game.invent||[])]
    : (minvent nobj → array);
```
**Bonne** adaptation tableau (snapshot : revive qui `useup` ne casse pas l’itération — C avance `otmp2 = nobj` **avant** revive, même idée).

`revive` :
- where INVENT / MINVENT / FLOOR ; contained/buried → `return null` (nommé)
- `norevive` / eel hors pool → twitch feebly
- `enexto` si `m_at` occupé
- `makemon(..., NO_MINVENT|MM_NOWAIT|MM_NOMSG|MM_NOCOUNTBIRTH)`
- **pas** `cant_revive` / `montraits` (C peut revive en zombie / ghost) — named
- `splitobj` si quan>1
- glow `PLNMSG_OBJ_GLOWS` si `by_hero && cansee`
- `stolen_value` shop omis
- useup_invent / delobj / m_useup

`unturn_you` C `1225` : `unturn_dead(&youmonst)` puis undead `make_stunned(HStun+rnd(30))` / shudder. JS identique. Wire `zapyourself` WAN_UNDEAD → `unturn_you` (remplace shudder-only D-0952). Wire `bhitm` : `if (await unturn_dead(mtmp)) wake=true` **avant** dégâts — ordre C `243–247`.

`revive_egg` JS : thin (C a plus). RNG `makemon` vs C `cant_revive` : moins de branches, **moins ou plus** de RNG selon cadavre.

### Cluster B — `hero_breaks` / `breaktest` — C `dothrow.c:2417` / `2582`
`breaktest` JS :
```
nonbreakchance = armor glass ? 90 : 1;
if (obj_resists(obj, nonbreakchance, 99)) return false;
if (material==GLASS && !oartifact && oclass!=GEM) return true;
switch (potion ? POT_WATER : otyp) camera/potion/egg/pie/melon/venom → true
```
**Match** C. `obj_resists` consomme RNG **toujours** (même si ensuite false) — C aussi. Bon.

`hero_breaks` : `BRK_FROM_INV` ; `in_view = Blind ? false : (from_invent || cansee)` ; si pas `BRK_KNOWN_OUTCOME`, `breaktest` → KNOWN2BREAK/NOT ; `breakmsg` ; `breakobj(..., TRUE, from_invent)`. Match.

`breaks` : `breaktest` ; msg ; `breakobj(..., FALSE, FALSE)`.

`breakobj` : crackable → `delobj` **immédiat** (C `erode_obj` 4 coups, peut **ne pas** détruire). Mirror `change_luck(-2)` si hero_caused. Potion : `potionbreathe` si `next2u` ; `explode_oil` omis. Camera : `release_camera_demon` omis — C `!rn2(3) && makemon(rn2(3)?HOMUNCULUS:IMP)` **deux RNG sautés**. Shop bill omis. Fracture boulder/statue : flags locaux.

Wire `bhito` striking : `hero_breaks` vs `breaks` selon by-hero. C’était le stub D-0952 « hero_breaks deferred ».

### Cluster C — ABON `cancel_item` — C `zap.c:1243–1293`
C `if (carried(obj))` switch **avant** spe=0 :
- RIN_GAIN_STRENGTH / CON / ADORNMENT : `ABON(A_*) -= spe` si `W_RING`
- INCREASE_ACCURACY / DAMAGE : `uhitinc` / `udaminc`
- RIN_PROTECTION : botl
- GAUNTLETS_OF_DEXTERITY : `ABON(A_DEX)` si `W_ARMG`
- HELM_OF_BRILLIANCE : INT+WIS si `W_ARMH`
- default armor : botl AC

JS : `carried = where===OBJ_INVENT || invent.includes(obj)` ; `u.abon.a[A_*] -= spe`. `acurr` lit `u.abon.a` (`attrib.js:87`) — **bon champ**. Helm INT+WIS porté. **Corps fidèle.**

**Caller mort.** `cancel_monst` (D-0952, **non modifié** dans ce diff pour la boucle) :
```
const chain = youdefend ? game.invent : mdef.minvent;
for (let otmp = chain; otmp; otmp = otmp.nobj)
    await cancel_item(otmp);
```
`zapyourself` WAN_CANCELLATION : `cancel_monst(youmonst, obj, true, true, true)` — C `zap.c:2812` `self_cancel` TRUE. JS : `chain` = Array ; une itération no-op. **Aucun anneau porté n’est vu.** `find_ac` / botl encore appelés ; ABON non.

`bhitm` CANCEL : `self_cancel=false` comme C — minvent monstre non parcouru. Pas le bug. Le bug est **self-cancel héros**, exactement le chemin break-wand / zap self que D-0952+D-0955 prétendent porter.

`unturn_dead` a **appris** à copier `invent[]`. `cancel_monst` non. Le commit a touché `cancel_item` sans relire le caller. Symptôme du batch trois clusters.

## Constitution / playbook
Pas FORCE/DIAG/fs/fastforward. `await` pline/revive/breaks. RAS Rule #2. `apply.js` ne câble rien de nouveau (omit comments).

## Densité (§2b)
**Too big / trois clusters.** +594. Aucun n’est callee de l’autre (sauf « restes D-0952 »). Playbook : deux théories sans lien → splitter. Ici trois. L’ABON mort-né est le coût qualité.

## Documentation
Map nomme container/buried/cant_revive/erode/shop/camera demon. **Silence** sur `cancel_monst`×Array. `apply.js` retire unturn/hero_breaks des omit — vrai pour A/B. D-log « worn ABON before spe clear » décrit le **corps** `cancel_item`, pas un chemin vivant. Status **fixed** = overclaim cluster C.

## Vérification
zap/shared 16/16 ; pas de cadence (@#1225). Aucun seed public ne casse une baguette cancel avec RIN_GAIN_STRENGTH. ABON mort **n’échoue pas** la fortress. 16/16 ne prouve pas invent cancel.

## Trois clusters ? (question de mission)
Oui.

| Cluster | Fichiers | Caller break-wand | Indépendance |
|---------|----------|-------------------|--------------|
| A `unturn_dead`/`revive` | `zap.js` | `bhitm` undead ; `zapyourself` → `unturn_you` | cadavres / œufs |
| B `hero_breaks`/`breaktest` | `dothrow.js` | `bhito` striking | verre / potions floor |
| C ABON `cancel_item` | `zap.js` | `zapyourself` cancel → `cancel_monst` | stats portées |

A n’appelle pas B. B n’appelle pas C. C n’a pas besoin de revive. Le seul lien est « D-0952 les avait listés en omit ». §2b : une iter, une famille. Ici trois familles, deux fichiers C (`zap.c` **et** `dothrow.c`).

`apply.js` ne branche rien : le wire est déjà dans `zap.js` `bhitm`/`bhito`/`zapyourself`. Le +4 apply est cosmétique.

Preuve que le batch a trop de théories : `unturn_dead` a été adapté au tableau `invent` ; `cancel_monst` (même fichier, même commit) **non**. Relecture caller oubliée.

`revive` `by_hero = !game.context?.mon_moving` : C `!svc.context.mon_moving`. Si `mon_moving` JS n’est pas posé pendant un zap monstre, glow « your corpse » à tort (écran). `ismnum(montype)` early return : cadavre `corpsenm` pourri no-op vs C `impossible` possible.

`breaktest` `obj_resists(obj, 1, 99)` : artefacts quasi-incassables. Si `obj_resists` JS ignore `oartifact`, trop de breaks (RNG + écran). Préexistant `dogmove.js` export — ce commit s’y fie.

`hero_breaks(..., 0)` depuis `bhito` : `breakflags=0` → `from_invent=false`, `brk` via `breaktest`. C striking floor object : `hero_breaks` avec flags selon thrown vs zap. Zap floor n’est pas `BRK_FROM_INV` — match `0`. Invent striking (self pile) : C peut passer FROM_INV ; JS `0` → `in_view` seulement `cansee`, pas « from_invent || cansee » élargi. Aveugle + pile sous les pieds : C `from_invent` true verrait quand même ? `in_view = Blind ? FALSE : (from_invent || cansee)` — si Blind, **toujours** false. Flags FROM_INV ne sauvent pas l’aveugle. OK.

### `revive` / `norevive` — C `zap.c:1188–1192`
C `unturn_dead` : sauve `norevive`, le met à 0, appelle `revive` ; si revive échoue, **restaure**. JS `unturn_dead` **fait** ce restore (`otmp.norevive = save_norevive ? 1 : 0` si `!mtmp2`). `bhito` undead floor aussi. Match. La dette n’est pas ce bit : c’est `cant_revive` / `montraits` **dans** `revive` (zombie/ghost, moins de `makemon`, moins de RNG).

C `contained` / `buried` : `revive` refuse. JS `return null` nommé. `unturn_dead` itère la chaîne invent / minvent, **pas** `cobj`. JS snapshot `invent[]` idem. Map « container » = `revive` where CONTAINED, pas un oubli d’`unturn_dead`.

### Messages owner
C `Shk_Your` / `shk_your` (shop « The priest's » / « your »). JS `'Your '` / `'One of your '` — **perd** le possessif shop. Écran seulement. Cadavre unpaid : C nomme le shk.

`encumber_msg` si `is_u && res` après la boucle — C aussi. JS `is_u` via `mon===youmonst || mon._youmonst`.

### `cancel_item` après ABON
C après le `switch` worn : blank magic ; wands `spe=-1` ; scrolls → SCR_BLANK_PAPER ; potions → water (sauf oil/sickness/acid) ; unbless/uncurse. JS D-0952 portait déjà ce bas. D-0955 **insère** ABON **avant**. Ordre C respecté **si** `cancel_item` est appelé. Il ne l’est pas pour l’inventaire héros (cluster C). Objet **sol** (`bhito` CANCEL) : `carried` false → pas ABON (correct) ; blank quand même. Bras sol **marche**. Self-cancel invent **non**.

`carried(obj)` C = `obj->where==OBJ_INVENT`. JS `where===OBJ_INVENT || invent.includes(obj)`. `owornmask` sauve un includes parasite. `SPE_NOVEL` `blank_novel` omis (nommé).

`costly_alteration` avant spe=0 : shop bill cancel **sol** peut vivre ; shop bill invent self **mort** avec le nobj bug.

### `breakobj` crackable
C `is_crackable` → `erode_obj(..., ERODE_CRACK, EF_DESTROY|EF_VERBOSE)` : ER_NOTHING / DAMAGED / DESTROYED. JS `delobj` immédiat : **un** coup. RNG erode sauté. Camera : `release_camera_demon` `!rn2(3)` + `makemon(rn2(3)?HOMUNCULUS:IMP)` + `mpeaceful=!cursed` + `set_malign` — **deux** RNG + un monstre. Striking floor camera = divergence RNG **garantie**.

Egg `change_luck(-min(quan,5))` si `hero_caused && spe && ismnum(corpsenm)` — porté JS. Pyrolisk explode omis.

`breakmsg` : C silencieux pour crackable (erode parle). JS `hero_breaks` appelle `breakmsg` **avant** `breakobj` ; `breakmsg` early-return si crackable. Match d’intention. Si `breakmsg` JS **n’a pas** ce guard, double message verre.

`breaks` vs `hero_breaks` : `bhito` striking choisit selon `context.mon_moving`. Break-wand héros : `mon_moving` false → `hero_breaks`. Match C `hero_breaks` pour zap héros. Un monstre qui casse une wand n’est pas ce chemin.

`revive` `makemon(..., NO_MINVENT|MM_NOWAIT|MM_NOMSG|MM_NOCOUNTBIRTH)` : si JS omet `NO_MINVENT`, le monstre spawn **avec** invent — RNG `mksobj` extra. Si omet `MM_NOCOUNTBIRTH`, compteur births / extinction ment. Non relu flags vs C `revive`.

`splitobj` si `quan>1` : une seule unité revive. JS porté (commentaire D-0955). Si `splitobj` thin (nobj vs array), le reste du stack invent peut disparaître. `useup` invent vs `delobj` floor : deux chemins C ; JS `useup_invent` / `delobj` / `m_useup` selon where.

`unturn_you` : `unturn_dead(youmonst)` puis si héros undead `make_stunned(HStun+rnd(30))` / shudder. JS D-0955 remplace le shudder-only D-0952. `rnd(30)` **après** revive invent — ordre C (`zap.c:1227` puis `1231`). Match. `You_feel` vs `You shudder` : C `You("shudder in dread.")` ; JS `pline('You shudder in dread.')` — même texte.

`HStun & TIMEOUT` : JS `(u.HStun|0) & TIMEOUT`. Si `TIMEOUT` JS ≠ masque C, « even more stunned » faux (écran).

`apply.js` +4 : retire unturn/hero_breaks des commentaires d’omit. **Aucun** appel nouveau. Le wire est `bhitm` / `zapyourself` / `bhito` dans zap/dothrow. Cosmétique. Ne pas le compter comme 3ᵉ module porté.

`make_stunned(..., FALSE)` : 2ᵉ arg C `usual` / msg. JS `false` — pas de message double (You_feel déjà). Match.

`TIMEOUT` : si le masque JS est 0, « even more » jamais. Écran.

`revive` glow `PLNMSG_OBJ_GLOWS` : C peut remplacer le nom cadavre par « It » si last_msg glow. JS `iflags.last_msg === PLNMSG_OBJ_GLOWS` — porté. Si `last_msg` jamais posé, message « Your corpse comes alive » au lieu de « It ».

## Risques / dette
1. **`cancel_monst` n’itère pas `game.invent`** — ABON + blank scrolls héros inerte (self-cancel).
2. `revive` sans `cant_revive` / traits / conteneurs / buried / ghost.
3. `breakobj` crackable = destroy 1 coup ; `release_camera_demon` `rn2`×2 sauté.
4. Trois dettes : un FAIL futur n’a pas de locus unique.
5. `blank_novel` / corpse revive→rot timer toujours omis dans `cancel_item`.
6. `encumber_msg` seulement si `is_u && res` — match C ; `is_u` via `_youmonst` flag extra JS.

## Verdict
- Verdict : **QUALITY-RISK**
- Note : **4/10**
- Si je ne devais retenir qu’une critique : trois clusters zap collés, et le seul travail ABON est mort-né tant que `cancel_monst` parcourt `nobj` sur un tableau d’inventaire.
