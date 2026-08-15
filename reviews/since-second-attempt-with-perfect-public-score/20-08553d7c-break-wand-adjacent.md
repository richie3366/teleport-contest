# Review 20 — `08553d7c` — D-0952 break-wand adjacent `bhitm` / cancel / `zapyourself`

## Métadonnées
- Hash complet / court : `08553d7c8fa2bd6908a06366bbecdddd9a0779ac` / `08553d7c`
- Parent : `1b8508938ccfea9b4ae9f9514bcccae37bc952c9`
- Auteur, date : Raphaël Hervier, 2026-07-21 23:37:24 +0200
- D-id : **D-0952**
- Stats : 10 files, **+713 / −91**
- Fichiers JS / map / cadence : `js/zap.js` (+582), `js/apply.js` (+76), `js/teleport.js` (+73), `js/read.js` (+2 export) ; map debt ; journal #1221

## Intention vs livrable
Promesse : retirer le stub explode-only strike/cancel/poly/tele/undead en branchant la boucle C via `bhitm`/`bhito`/`zapyourself`, plus `WAN_LIGHT` `litroom`.

Livrable : la boucle adjacent **est** dans l’ordre C (monstre puis pile hors héros ; pile puis self sur la case héros). `bhitm` n’implémente qu’un **sous-ensemble** des `case` C. `cancel_item` omet ABON (D-0955). `unturn_dead` stub. `litroom` = export d’une fonction `read.js` déjà partielle, pas un port `read.c` nouveau. +713 : trop pour « adjacent loop only ».

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/zap.js` | Port : cancel helpers, `bhitm` subset, `bhito`, `bhitpile`, `zapyourself` arms, `zapsetup`/`zapwrapup` |
| `js/apply.js` | Wiring boucle + wall-of-force + `litroom` |
| `js/teleport.js` | Port thin : `u_teleport_mon`, `rloco` |
| `js/read.js` | Wiring : `export litroom` |
| map / D-log | D-0952 ; omit unturn / hero_breaks / ABON / flash_hits |

## Fidélité C ↔ JS

### `do_break_wand` — C `apply.c:4008–4144` / JS après D-0952
C WAN_STRIKING : `pline("A wall of force…")` ; `dmg = d(1+spe, 6)` ; FALLTHROUGH cancel/poly/tele/undead `affects_objects=TRUE`. Puis explode `rnd(dmg)` ; `zapsetup` ; boucle.

JS D-0950 **return** après explode sur ces otyp. D-0952 **enlève** ce return, pose `affects_objects`, explode, `zapsetup()`, boucle avec `_bhitpos`, `zapwrapup()`, `litroom` si WAN_LIGHT. **Caller fidèle.**

Ordre adjacent C : `bhitm` puis `bhitpile` si objects (undead : monstre **avant** pile pour ne pas raise puis frapper le zombie). Self : pile **avant** `zapyourself` (bones / poly gear). JS :
```
if (x !== ux || y !== uy) {
    if (mon) await bhitm(mon, obj);
    if (affects_objects && objects_at(x,y)) await bhitpile(...);
} else {
    if (affects_objects && objects_at) await bhitpile(...);
    damage = await zapyourself(obj, false);
    if (damage) losehp(maybe_half_phys(damage), "killed him/herself…", NO_KILLER_PREFIX);
}
```
Match. `uhim()` C = `flags.female` ; JS `game.flags?.female` — pas `u.female`. Commentaire zap death ray déjà présent ; ici identique.

### `bhitm` — C `zap.c:160` / JS
**Switch C (extrait)** : STRIKING, SLOW, SPEED, UNDEAD, POLY, CANCEL, TELE, MAKE_INVISIBLE, LOCKING, PROBING, OPENING, HEALING, LIGHT, SLEEP, STONE_TO_FLESH, DRAIN, NOTHING, default.

**Switch JS** : STRIKING, UNDEAD (sans `unturn_dead`), POLY, CANCEL, TELE, LIGHT **break vide**, default.

Pour break-wand, les otyp de la boucle hors dig/create sont strike/cancel/poly/tele/undead (+ light après). **SLEEP** n’est pas `affects_objects` mais n’est pas dans le fallthrough striking non plus — une baguette sleep cassée passe `default` C puis explode + boucle + `bhitm` SLEEP (`sleep_monst(d(1+spe,12))`). JS `bhitm` default no-op : **SLEEP adjacent mort** si on casse une sleep wand (hors titre D-0952, pas nommé dans le header `bhitm`).

WAN_LIGHT C : `flash_hits_mon` dans `bhitm` **et** `litroom` après boucle. JS : `litroom` oui, flash **non** (nommé).

STRIKING :
- C resist magm : `disguised_mimic && !disguised_as_mon` → `seemimic` ; `shieldeff` ; Boing.
- JS : `if (disguised_mimic) seemimic` **sans** `!disguised_as_mon` ; pas de `shieldeff` (pas de RNG).
- Hit : `rnd(20) < 10 + find_mac` — match. `d(2,12)` ; Knight `dbldam` omis ; `spell_damage_bonus` omis.
- `learn_it = cansee(bhitpos)` puis false on miss — structure C.

UNDEAD : C `unturn_dead(mtmp)` peut `wake=TRUE` **avant** dégâts. JS commentaire « invent revive deferred » : pas d’appel. Puis `rnd(8)` + `bypasses` + resist + `monflee`. Match partiel.

POLY : `!rn2(25)` shock `xkilled(NOCORPSE)` ; sinon `newcham`. Long worm `mcorpsenm` : C skip si déjà poly par ce zap. JS : « still allow first hit » — **re-poly possible** sur segments. `bypass_obj` minvent si `polyspot` : porté.

CANCEL : `cancel_monst(mtmp, otmp, TRUE, TRUE, FALSE)` — `self_cancel` false comme C. Mimic `seemimic` avant.

TELE : `reveal_invis = !u_teleport_mon(mtmp, TRUE)` — match.

Wake final : `wakeup(mtmp, !helpful_gesture)`. SPEED C pose `helpful_gesture` ; JS n’a pas SPEED → toujours angry wakeup. Hors envelope break-wand.

### `cancel_monst` / `cancel_item` — C `zap.c:3150` / `1239`
`cancel_item` : spe -1 wands/crystal ; blank scroll/book ; potion→water/fruit ; unbless/uncurse. **Pas** le `switch` worn ABON (D-0955). Corpses revive→rot timer omis.

`cancel_monst` resist : héros `!youattack && Antimagic` ; monstre `resist(oclass,0,NOTELL)`. `self_cancel` :
```
const chain = youdefend ? game.invent : mdef.minvent;
for (let otmp = chain; otmp; otmp = otmp.nobj)
    await cancel_item(otmp);
```
`game.invent` est un **Array**. `cancel_item(array)` : `otyp|0 === 0`, no-op ; `array.nobj` undefined ; stop. **`zapyourself` CANCEL** (`self_cancel=true`) **ne cancel aucun objet héros**. Clay golem / `rehumanize` bras héros encore atteints (poly form). Invent/ABON non.

Minvent `nobj` : OK pour monstres si un jour `self_cancel` true.

### `zapyourself` — C `zap.c:2705`
Bras break-wand : STRIKING ordinary? **false** → `d(1+spe,6)` vs Antimagic Boing ; CANCEL → `cancel_monst(you, …, TRUE, TRUE, TRUE)` ; TELE `tele()` + learn si contrôle/distance ; UNDEAD shudder/stun `rnd(30)` **sans** unturn invent ; LIGHT damage 0.

Healing/sleep/death déjà dans le fichier (zap normal). Default : no-op pour FIRE/COLD/etc. si appelés depuis break-wand — ces otyp **return** avant la boucle via `broken_wand_explode`. OK.

### `bhito` / `bhitpile`
Cancel / striking (hero_breaks **deferred** → D-0955) / tele `rloco` / undead revive floor **deferred**. `bhitpile` : scan `objects_at` + callback. C `bypass` pour poly drops : `zapsetup`/`zapwrapup` existent ; qualité du bypass JS non auditée ligne à ligne ici.

### `u_teleport_mon` — C `teleport.c:2263`
```
stasis_until >= moves → fail
else if priest && temple → fail
else if engulfing && noteleport → unstuck; rloc || limbo
else if (rider || control_teleport) && rn2(13) && enexto → rloc_to
else rloc || return FALSE
return TRUE
```
JS : stasis ; priest ; engulfing **omis** (`void engulfing_u`) ; rider `rn2(13)` puis `enexto` else fallthrough `rloc`. Si rider && `rn2(13)` && !enexto, C else `rloc` ; JS aussi fallthrough. Swallow : C unstuck ; JS ferait rloc du gouffre encore attached.

`rn2(13)` seulement si rider/control : clang LTR, JS `&& rn2(13)` après le or — match.

### `rloco` — C `teleport.c:2102`
C : rider corpse `revive_corpse` **avant** extract (peut return FALSE, **zéro** `rn1`/`rn2`). JS : skip revive, toujours extract + boucle `rn1(COLNO-3,2)` / `rn2(ROWNO)` / `goodpos` / `try_limit=4000`. **Plus de RNG** si cadavre rider ; **moins** si W-tower / `restricted_fall` (conditions extra C dans le `while`).

C `flooreffects` peut détruire l’objet (pas de `place_object`). JS `place_object` toujours. Shop `stolen_value` omis.

### `litroom`
`read.js` déjà portait un `litroom` interne ; +2 lignes = `export`. Déferrals snuff_lit / gremlin / Punished inchangés. Suffisant pour l’appel unique C après boucle.

## Constitution / playbook
Grep : pas FORCE/DIAG/fs/fastforward/seeds. `await` bhit/pline/import. RAS Rule #2. `SPE_FORCE_BOLT` dans le grep `await` du diff est le **nom d’objet** C, pas un `FORCE` de trace.

## Densité (§2b)
**Too big.** +713, quatre JS. Familles : (1) boucle apply, (2) `bhitm`/`cancel_*`/`zapyourself`, (3) `rloco`/`u_teleport_mon`. Guide 50–300. Un `bhitm` « subset break-wand » tenait dans apply+zap sans recopier healing/sleep/death déjà là. SLEEP adjacent oublié montre que le switch n’a pas été lu jusqu’au `default` C.

## Documentation
Map nomme unturn, hero_breaks, ABON, flash_hits. **Pas** l’itération `nobj`×Array. D-log « fixed » overclaim cancel-self. Header `bhitm` « envelope IMMEDIATE » sous-entend plus que strike-set.

## Vérification
green+strict ; wizard/shared 14/14. Pas de cadence. Break-wand cancel/poly n’est pas dans les 44 seeds. Fortress ≠ `cancel_monst(self)`.

## Complétude `bhitm` (question de mission)
Pour **break-wand** C, après explode, chaque direction appelle `bhitm` pour **tout** otyp qui n’est pas DIG/CREATE. Le `switch (obj->otyp)` initial met `affects_objects` seulement pour striking/cancel/poly/tele/undead, mais `bhitm` tourne quand même pour LIGHT (et pour SLEEP/etc. si on casse ces baguettes : elles tombent dans `default: break` du premier switch, donc explode + boucle).

| `case` C `bhitm` | JS D-0952 | Besoin break-wand ? |
|------------------|-----------|---------------------|
| WAN_STRIKING / SPE_FORCE_BOLT | porté (sans dbldam/shieldeff) | **oui** |
| WAN_UNDEAD / SPE_TURN | dégâts, **pas** `unturn_dead` | **oui** (invent D-0955) |
| WAN_POLY / SPE / POT | porté, long-worm thin | **oui** |
| WAN_CANCEL / SPE | `cancel_monst` self=false | **oui** |
| WAN_TELE / SPE | `u_teleport_mon` | **oui** |
| WAN_LIGHT | no-op (`flash_hits` named) | **oui** (flash) |
| WAN_SLEEP | **absent** | si on casse sleep wand |
| SLOW / SPEED / INVIS / LOCK / PROBE / OPEN / HEAL / STONE / DRAIN | **absents** | hors titre ; zap ray autre chemin |
| default | no-op | |

Conclusion : les cinq otyp du titre sont **présents**, LIGHT flash **manque**, SLEEP adjacent **manque** (hors titre, hors map). Ce n’est pas un `bhitm` C ; c’est un extract IMMEDIATE incomplet.

`bhito` : probing/opening/locking/stone-to-flesh **absents**. Break-wand `affects_objects` n’a besoin que de cancel/striking/tele/undead (poly objets via `bhito` POLY). Striking floor → `hero_breaks` encore stub.

### Premier `switch` C `do_break_wand` (apply.c:3974)
WAN_SLEEP / WAN_SLOW / WAN_SPEED / WAN_MAKE_INVISIBLE / WAN_HEALING / WAN_DRAIN : **`default: break`**. Donc explode `rnd(dmg)` avec `dmg = spe*4` **puis** boucle `bhitm`. JS D-0952 pose `affects_objects` seulement sur strike/cancel/poly/tele/undead — correct pour ce bit. La boucle JS appelle `bhitm` pour **tout** otyp restant (y compris SLEEP). Le trou n’est pas le caller apply : c’est le `switch` `bhitm` qui n’a pas SLEEP.

WAN_LIGHT : C `default` aussi (pas `affects_objects`) ; après boucle `if (otyp==WAN_LIGHT) litroom(TRUE,obj)`. JS `litroom` après wrapup : match. `bhitm` LIGHT C `flash_hits_mon` : JS `break` vide.

`explode(..., rnd(dmg), WAND_CLASS, EXPL_MAGICAL)` **avant** `zapsetup` **avant** la boucle : JS D-0952 conserve cet ordre (D-0950 avait déjà explode). `dmg` striking écrasé par `d(1+spe,6)` **avant** explode — JS aussi. Clang LTR `rnd(dmg)` : un appel.

### `zapsetup` / `zapwrapup`
C : `context.bypasses = TRUE` pour que `bhito` ignore les drops poly (`obj->bypass`). JS `zapsetup`/`zapwrapup` existent dans ce commit. Qualité : si `bypass_obj` ne pose pas le même bit que `obj.bypass && context.bypasses`, un objet poly **re-hit** (double `poly_obj` / double cancel). Non relu ligne à ligne — dette nommée trop faiblement (« non relu ») alors que c’est le **seul** mécanisme anti-rehit C pour POLY.

`N_DIRS` C : `i = 0..N_DIRS` inclut la case héros **en dernier** (`xdir[N_DIRS]==0`). JS doit itérer 9 cases dans le **même** ordre cardinal. Si JS utilise un autre ordre (N,E,S,W vs C `xdir[]`), les `bhitm` RNG (`rnd(20)`, `rn2(25)` poly, `rn2(13)` tele) se décalent **même** si chaque bras est fidèle. Non vérifié contre `js/const.js` `xdir` vs C `hack.h`. À falsifier en premier sur un FAIL break-wand.

### `zapyourself` STRIKING `ordinary=false`
C : si `ordinary` (ray) Antimagic Boing / dmg réduit ; break-wand passe `FALSE` → `d(1+spe,6)` brut puis `maybe_half_phys` au `losehp`. JS `zapyourself(obj, false)` puis `losehp(maybe_half_phys(damage), "killed him/herself…")` — structure C. Si `maybe_half_phys` JS ignore Half_physical_damage, le self-hit striking ment (HP, pas forcément écran).

C STRIKING self : **Antimagic d’abord** (`shieldeff` + Boing, damage=0) **même** si `ordinary==FALSE`. JS doit Boing avant `d(1+spe,6)`. Si JS inverse (dmg puis Antimagic) : HP + écran. `exercise(A_STR, FALSE)` C sur hit — omis JS (pas de RNG).

C WAN_SLEEP `bhitm` : `sleep_monst(mtmp, d(1+spe,12), WAND_CLASS)` puis `slept_monst` ; `!Blind` → `learn_it`. **Deux** appels dégâts-sommeil + reveal. JS default no-op : zéro `d()`, zéro sleep. Un break-wand sleep **public** divergerait au premier monstre adjacent — hors 44 seeds.

C `zapsetup` = `go.obj_zapped = FALSE` seulement. JS match (`_obj_zapped=false`). Le bit `context.bypasses` n’est **pas** posé par `zapsetup` C : il l’est dans POLY/UNDEAD `bhitm` (`bypasses=TRUE` pour `make_corpse` / poly drops). JS POLY pose `context.bypasses=true` + `bypass_obj` minvent. La dette bypass est **bhito** `obj.bypass && context.bypasses`, pas zapsetup.

`litroom(TRUE, obj)` C une fois **après** wrapup, pas par case. JS idem. Si `litroom` JS allume sans `snuff_lit` / gremlin, WAN_LIGHT break-wand est un demi-port d’éclairage (map déjà).

## Risques / dette
1. **`cancel_monst` ne parcourt pas `game.invent`** — cancel self no-op objets.
2. `bhitm` WAN_LIGHT sans `flash_hits_mon` ; WAN_SLEEP adjacent no-op.
3. `rloco` sans `flooreffects` / rider revive / shop.
4. POLY long-worm re-hit ; `unturn_dead` / `hero_breaks` stubs.
5. `u_teleport_mon` swallow.
6. `zapsetup`/`bypass` poly-drops : non relu contre C `obj->bypass`.

`resist()` JS : `rn2(100+alev-dlev) < mr` puis half damage ; `tell` unused (`void tell` — shieldeff sauté, pas de RNG extra). `find_mac` pour striking : si JS `find_mac` diverge, le seuil `rnd(20)` ment. `bhitpile` ignore `_zz` — OK pour break-wand (`zz=0`).

`cancel_item` parcourt `game.objects[otyp].oc_magic` via `game.objects?.[otyp]` : si la table n’est pas peuplée comme `objects[]` C, le predicat magic/speMatter saute des items. Non relu ici ; dette data.

## Verdict
- Verdict : **QUALITY-RISK**
- Note : **5/10**
- Si je ne devais retenir qu’une critique : la boucle adjacent est dans le bon ordre C, mais `bhitm` est un switch incomplet et `cancel_monst(self_cancel)` ne visite pas l’inventaire tableau — le cancel héros promis n’a pas lieu.
