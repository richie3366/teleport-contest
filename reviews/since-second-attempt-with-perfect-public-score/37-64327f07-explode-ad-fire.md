# Review 37 — `64327f07` — explode AD_FIRE combat (D-0968)

## Métadonnées
- Hash complet / court : `64327f077ee2718fc49385dcce6bb6a73f5ee40a` / `64327f07`
- Parent : `4a95b850b381512e4f6f234092f6bde8065dcbf2`
- Auteur, date : Raphaël Hervier, 2026-07-22T00:49:55+02:00
- D-id : **D-0968**
- Stats : 9 files, +245/−75
- Fichiers JS / map / cadence : `js/explode.js` (+247), `js/zap.js` (omit note) ; `docs/c-js-map/debt.md`, `turns.md` ; pas de cadence

## Intention vs livrable
Promet le combat **AD_FIRE** mon/hero dans `explode` / `mon_explodes` : mask Fire_resistance, `destroy_items`/`burnarmor`, resist + cold×2, `xkilled`/`completelyburns`, `done(BURNING)`.

Le diff fait **exactement ça**. Titre et D-log disent AD_FIRE, **pas** « explode complete ». Deferrals COLD/ELEC, golem, ignite body, slime, Invulnerable, grabbing, sparkle, hallu. **Pas d’overclaim de type.** D-0965 avait déjà le fireball terrain ; ici le HP. Pas de cadence mêlée.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/explode.js` | Port C : `explosionmask` FIRE, combat 3×3 AD_FIRE, `mon_explodes` type breath, stub `ignite_items` |
| `js/zap.js` | Docs : retire « explode AD_FIRE combat » de l’omit zap ; pointe D-0968 |
| map / D-log | Envelope FIRE ; next COLD/ELEC |

## Fidélité C ↔ JS

### `explosionmask` — `explode.c:26`
C hero : MAGM Antimagic, FIRE Fire_resistance, COLD, DISN, ELEC, DRST, ACID ; default `impossible`. Mon : `resists_*` analogue.

JS **ce commit** : PHYS → NONE ; FIRE hero `Fire_resistance` → EXPL_HERO ; FIRE mon `resists_fire` → EXPL_MON ; **sinon NONE**. COLD/ELEC/MAGM… **pas** masqués.

Conséquence : un fireball AD_FIRE est masqué ; un blast MAGM/COLD qui passerait `combat_ok` (il ne passe pas) n’aurait pas de shield. Envelope volontaire. Default C `impossible` vs JS NONE — named via envelope, pas un `impossible` porté.

`olet` ignoré (DISN wand nonliving) — hors FIRE, OK.

### `combat_ok` — **pas dans C**
```js
const combat_ok = adtyp === AD_PHYS || adtyp === AD_FIRE;
...
if (!combat_ok) continue;
```

C applique destroy/HP pour **tous** les adtyp. JS **saute** MAGM/COLD/ELEC/DISN/DRST/ACID. `zap_over_floor` 3×3 tourne encore (terrain). C’est le palier D-0968, pas un explode complet. **À juger comme FIRE-only.** D-0971 ouvrira COLD/ELEC.

### Combat mon — `explode.c:454–586`
**Porté :**
- Skip `EXPL_SKIP` ; `uhurt` = `(mask & EXPL_HERO) ? 1 : 2` (1 = items only / shield).
- `zap_over_floor` sauf swallow hero-caused.
- `destroy_items(mtmp, adtyp, dam)` — **plus** le stub PHYS qui brûlait `rn2` puis return 0 (pré-D-0968). Import zap réel.
- AD_FIRE : `burnarmor` + `ignite_items` (stub local no-op, **nommé**, pas de RNG perdu si le C ignite n’en a pas au top-level — C `ignite_items` a son propre RNG plus tard).
- Shield `EXPL_MON` : C `golemeffects` + `mhp -= itemdmg` ; JS **skip golem**, `mhp -= itemdmg`.
- Unshielded : `resist(..., 0, FALSE)` → msg + `mdam=(dam+1)/2` ; `resists_cold && AD_FIRE` ×2 ; `resists_fire && AD_COLD` ×2 déjà écrit (mort pour COLD jusqu’à D-0971).
- Mort : `xkflg` FIRE+`completelyburns` → XKILL_NOCORPSE ; `!mon_moving` → `xkilled` else `monkilled(..., AD_RBRE=242)`.

**Sauté :** hallu `rndmonnam` tryct ; `engulfer_explosion_msg` ; grabbing `mdam*=2` ; `seemimic` ; golemeffects.

**RNG :** `resist` (déjà zap) + `destroy_items` (rn2 interne zap) au même point relatif que C. Pas de `rn2` inventé dans explode.

### Combat hero — `explode.c:590+`
C : verbose caught-in ; `Half_phys` seulement PHYS/ACID ; `burnarmor`/`ignite`/`destroy_items` ; `ugolemeffects` si shield ; HP si `uhurt==2` ; Invulnerable skip ; slime `burn_away_slime` ; fatal `done(BURNING)` vs DIED ; Upolyd `rehumanize()` **avant** death.

JS : Half_phys PHYS only (ACID hors envelope) ; burnarmor+ignite stub+destroy_items ; fatal `done(adtyp===AD_FIRE ? BURNING : DIED)` ; **Upolyd rehumanize deferred** — poly’d hero meurt comme non-poly. Invulnerable sauté. **Écart concret** sur poly/Invulnerable, nommé dans le code plus que dans le D-log (D-log dit Invulnerable, pas rehumanize).

### `destroy_items` — `zap.c`
Le stub explode local qui consommait du RNG puis return 0 est **remplacé** par l’import zap. C’est le vrai gain vs D-0965 fireball : les items brûlent. Si le stub restait, fireball divergerait sur `rn2` **et** sur le loot. **Callers :** explode 3×3 seulement (zhitu ailleurs déjà zap).

### `mon_explodes` — `explode.c:1019`
C : AD_PHYS → PHYS_EXPL_TYPE ; `AD_MAGM..AD_SPC2` → `type=-((ad-1)+20)` ; sinon impossible return.

JS : PHYS + **FIRE seulement** ; `type=-((ad-1)+20)` ; autres return early. `adtyp_to_expltype` FIRE → EXPL_FIERY else NOXIOUS (visuel `_expltype` souvent void). **Confirmation** formule breath. COLD/ELEC boom monsters still no-op.

### Type unknown `abs(type)%10`
C default `impossible` + return. JS préexistant default MAGM. Hors envelope FIRE (`ZT_FIRE` %10 = 1). Pas introduit ici.

### Combat hero — `explode.c:590+`
C (après la boucle mon) : `uhurt` 1 vs 2 ; caught-in verbose ; `Half_physical_damage` seulement si adtyp PHYS ou ACID ; `destroy_items(&youmonst, ...)` ; FIRE `burnarmor`+`ignite_items` ; shield → `ugolemeffects` sans HP ; `uhurt==2` → soustraire `damu` (Role_switch déjà appliqué pour WAND) ; Invulnerable return ; `burn_away_slime` ; si fatal, Upolyd `rehumanize()` puis éventuellement `done(BURNING)`.

JS : `uhurt===2` soustrait ; Half_phys PHYS only (ACID hors `combat_ok`) ; `done(BURNING)` si FIRE. **Pas** Invulnerable. **Pas** rehumanize. Un poly fire-resistant golem n’a pas `ugolemeffects`. Nommé partiellement (Invulnerable dans D-log ; rehumanize surtout dans le commentaire JS).

`you_exploding` : C `uhurt=0` si hero-caused boom poly. JS doit garder ce early (préexistant PHYS). Si D-0968 l’a cassé, fireball auto-hit. Le diff conserve le test `!mon_moving && you_exploding`. **Confirmation** vs un oubli poly-boom.

### `destroy_items` — fin du stub RNG
Pré-D-0968, explode.js `destroy_items` brûlait `rn2` puis `return 0` (alignement de compteur sans effet). D-0968 **supprime** ce shim et importe zap. C’est la différence observable fireball : scrolls dans le 3×3 meurent. Si le stub était resté, `rn2` exploserait le keystream **sans** détruire. Le remplacement est anti-playbook-correct (plus de RNG fantôme).

### Mask 3×3
C : hero cell `explosionmask(&youmonst)` ; mon cell `|= explosionmask(mtmp)`. SKIP oob. JS identique pour FIRE. Cellule hero+mon (steed) : C `mtmp = usteed` si `u_at && !m_at`. JS doit copier ce fallback. Si steed absent du bras, le destrier ne brûle pas. Vérifier le diff : `if (!mtmp && u_at) mtmp = u.usteed` — **porté**.

## Constitution / playbook
Grep JS : pas FORCE/DIAG/traces/fs/node:/fastforward/seeds. Frozen non touchés. Rule #2 OK. explode déjà async. Module `explode.js` ↔ `explode.c`. **RAS** constitution. **Pas** de claim « complete explode » dans le D-log.

## Densité (§2b)
Right size. Un palier typé (FIRE) sur l’envelope explode déjà PHYS+terrain. 247 lignes. Pas un `if AD_FIRE` isolé : mask + destroy + burn + resist + death + mon_explodes. Pas too-big (pas COLD dans le même hash — D-0971).

## Documentation
D-0968 titre AD_FIRE, deferrals COLD/ELEC listés. `debt.md` / `turns.md` mettent MAGM/COLD/… en next. **Pas d’overclaim.** `zap.js` header cesse de lister AD_FIRE combat comme omit. CURRENT next COLD/ELEC. Honnête.

## Vérification
Journal : green+strict ; zap/wizard/shared **20/20** (seed2200/0360/0006/0398/5002). Cohorte wizard/zap pertinente (fireball). Pas de cadence 44/44. #1270 plus tard hors scope.

Fireball SPE_FIREBALL : D-0965 explode terrain ; D-0968 HP+items. Les seeds wizard lancent-ils fireball au hero/mon ? 20/20 vert **n’implique pas** Invulnerable/poly/ignite. `destroy_items` FIRE a son propre `rn2` — si un seed fireball existait déjà au D-0965, le keystream **change** ici (stub rn2→vrai destroy). Vert après coup = le port a suivi C, ou aucun fireball dans la cohorte.

## Overclaim explode ?
D-log titre : « explode AD_FIRE mon/hero combat ». Status fixed. Deferred COLD/ELEC explicit. Map turns : remaining MAGM/…. **Verdict lecture :** ce n’est pas « complete explode ». Un reviewer qui arrête au mot « explode » dans CURRENT se trompe. Le code `combat_ok` est la preuve anti-overclaim.

`mon_explodes` FIRE type `-((2-1)+20) = -21` : C `ZT_BREATH` encoding. Si JS `abs(type)%10` pour adtyp utilise ce -21, adtyp FIRE doit sortir 1 (ZT_FIRE). `abs(-21)%10 = 1` → FIRE. **Confirmation** du round-trip mon boom → explode adtyp.

## Risques / dette
1. `combat_ok` coupe COLD/ELEC/MAGM — voulu, à ne pas lire comme explode done.
2. `ignite_items` no-op (C allume lampes/potions — RNG possible dans le vrai helper).
3. Upolyd `rehumanize` sauté → death poly.
4. Invulnerable / `burn_away_slime` / golem / grabbing.
5. Mask default NONE vs C MAGM/DISN cases.
6. Sparkle glyphs (affichage, pas RNG).


## `uhurt` sémantique
C : `uhurt = ((explmask[i][j] & EXPL_HERO) != 0) ? 1 : 2`. EXPL_HERO **set** = résisté (shield) = items only (1). EXPL_HERO **clear** = 2 you+items. Contre-intuitif. JS copie. Un Fire_resistance hero : mask EXPL_HERO, `uhurt=1`, pas de `losehp`, mais `destroy_items` quand même (scrolls brûlent sous résistance feu — C idem, destroy n’est pas skip par mask hero). **Confirmation.**

`damu` Role_switch : C WAND_CLASS cleric/monk/wizard `/=5`, healer/knight `/=2`. Préexistant explode olet preamble. D-0968 ne doit pas le casser. FIRE fireball olet 0 (dobuzz) : pas de Role_switch. Sphere MON_EXPLODE : pas wand. **OK.**

## `xkilled` vs `monkilled`
C `!mon_moving` → `xkilled(..., XKILL_GIVEMSG|xkflg)` ; else si mdef self-kill slime path ; else `monkilled(..., AD_RBRE)`. JS `AD_RBRE=242` (C `monattk.h` 242). **Pas** un magic number inventé. `completelyburns` paper/straw golem : XKILL_NOCORPSE FIRE only. COLD D-0971 ne doit pas hériter NOCORPSE — le `adtyp==AD_FIRE` garde. D-0968 l’écrit correctement.

## `resist(mtmp, olet, 0, FALSE)`
Le 0 = pas de dmg inside resist (manuel ensuite). FALSE = pas de maxhp msg path. JS `resist(mtmp, olet, 0, false)`. Si JS resist ignore olet, les chances MAGM vs FIRE divergent. Préexistant zap. Nouveau caller explode FIRE — **nouveau RNG resist** vs D-0965 terrain-only.

`burnarmor` trap.js import. Si stub, pas de `rn2` armor ; C `burnarmor` a des jets. Named via ignite ; burnarmor D-0741 commentaire zap dit déjà porté. Hors revue trap.js.

## Hero `exercise(A_STR, FALSE)`
C après dégâts. JS `exercise(A_STR, false)`. Pas de RNG. Skip = moins de STR gain, pas keystream.

Invulnerable : C return avant HP. JS sauté → héros Invulnerable prend le fireball. Rare suite publique. Named D-log.



## Preamble `explode` olet
WAND_CLASS / BURNING_OIL / SCROLL / TRAP_EXPLODE : préexistant D-0949. D-0968 combat s’insère **après** mask 3×3. Ne pas régresser shop `pay_for_damage`. zap.js header retire AD_FIRE omit, garde shop D-0948.

`inside_engulfer` : C skip autres cellules. JS préexistant. FIRE engulf : seul hero+engulfer. Grabbing double deferred — fireball adjacent ustuck pas ×2.

`str` blast name : C adstr « fiery blast » etc. JS préexistant. Hallu rndmonnam skip — named.

## `ignite_items` local vs trap
D-0968 ajoute stub **local** explode.js. Plus tard D-? importe trap.js `ignite_items`. Au hash 64327f07 le stub garantit pas de throw. C `ignite_items` allume `lamplit` (RNG timeout burn). Items au sol fireball ne s’allument pas encore. Named. `burn_floor_objects` D-0965 appelle aussi ignite stub zap.js — **deux stubs**. Smell duplication, pas FORCE.

PHYS gas spore : `combat_ok` true (PHYS|FIRE). D-0968 ne doit pas casser AD_PHYS. Mask PHYS NONE. **Régression test** : spore HP inchangé vs parent. 20/20 wizard plus fireball que spore.

unknown `abs(type)%10` default MAGM : fireball type ZT_SPELL+FIRE = 11, 11%10=1 FIRE. OK. type 0 MAGM hors combat_ok jusqu’à D-0973.



## `destroy_items` remplacement stub
Le stub pré-D-0968 dans explode.js consommait du RNG pour « rester aligné » **sans** détruire — anti-pattern playbook (RNG fantôme). D-0968 le **supprime**. C’est un plus constitutionnel : plus de rn2 jeté pour un compteur. Le vrai zap `destroy_items` a une limite `MAX_ITEMS_DESTROYED` / `rn2` par item. Fireball 3×3 peut jeter **plus** de rn2 qu’avant. Vert 20/20 ⇒ soit pas de fireball loot, soit le C match.

Import dynamique zap depuis explode : cycle explode↔zap (zap appelle explode fireball). JS dynamic import évite le cycle ESM. C n’a pas ce problème (link unique). Smell async import, pas filesystem.

## Hero caught-in verbose
C `if (verbose)` caught in the blast. JS préexistant / étendu FIRE. `Half_physical_damage` PHYS only dans JS (ACID hors ok). FIRE n’est pas PHYS — full dam avant resist mask. C `Half_physical_damage` seulement PHYS/ACID. **Confirmation** FIRE full.

`nomul(0)` / `stop_occupation` C boom. JS préexistant. D-0968 ne doit pas skip.

`wake_nearto` : C après. JS maybe msleeping only. Named header explode.

## `golemeffects` shield
Bras EXPL_MON : C golem absorbe. JS itemdmg only. Clay golem fireball : C peut figer/d’autre ; JS HP-item seulement. Named. Rare suite.

Upolyd rehumanize : D-log omet le mot ; commentaire JS l’a. **Trous docs mineur.** Qualité : poly death. ACCEPT-WITH-DEBT pas QUALITY-RISK (named in code, envelope FIRE).



`shopdamage` / `pay_for_damage` après explode : C burn away si FIRE. JS D-0949. D-0968 ne doit pas skip le pay en fin de `explode`. Fireball boutique : facture + HP.

`explmask` SKIP oob : `!isok` continue. JS identique. Cellule coin carte : pas de crash `level.at`.

PHYS gas spore reste `combat_ok`. D-0968 ne casse pas AD_PHYS. Mask PHYS NONE. Spore HP vs parent = test de non-régression. `you_exploding` uhurt=0 conservé.

`wake_nearto` C après le 3×3 : JS peut se limiter à `msleeping` (header explode). Pas de RNG. Sparkle glyphs toujours deferred — affichage, pas keystream.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7.5/10**
- Si je ne devais retenir qu’une critique : D-0968 **ne vend pas** explode complete — FIRE mask/`destroy_items`/cold×2/`BURNING` sont C-shaped ; `combat_ok` et ignite stub sont le palier, pas un mensonge de D-log.
