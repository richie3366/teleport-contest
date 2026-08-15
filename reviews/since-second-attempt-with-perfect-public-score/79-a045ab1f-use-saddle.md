# Review 79 — `a045ab1f` — use_saddle (steed.c)

## Métadonnées
- Hash complet / court : `a045ab1f04725f778895c2c19f299c9b608229ca` / `a045ab1f`
- Parent : `df3eb51bd6faad29ae2f93988d80cbd0f794eb74`
- Auteur, date : Raphaël Hervier, 2026-07-22 06:05:32 +0200
- D-id : D-1008
- Stats : 10 files, +259/−40
- JS : `apply.js` (case SADDLE, +11), `steed.js` (+202)

## Intention vs livrable
`doapply` SADDLE ne doit plus tomber sur « don't know how to use » ; porter `use_saddle` chance/petrify/special. C’est **le** peel steed historiquement mince : un callee `steed.c` + un case `apply.c`. Pas de cadence. Titre = livrable.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/steed.js` | `use_saddle` ; `can_saddle` whirly/unsolid ; `u_handsy`/`freehand`/`objdescr_is`/`freeinv`/`remove_worn_item` **locaux** |
| `js/apply.js` | `await import('./steed.js').use_saddle` |
| map absent.md / turns.md | Retire omit SADDLE |
| D-1008 | fixed ; defer `update_mon_extrinsics`, body_part HAND |

## Fidélité C ↔ JS

### `can_saddle` — `steed.c:26`

C : `strchr(steeds, mlet) && msize>=MZ_MEDIUM && (!humanoid \|\| centaur) && !amorphous && !noncorporeal && !is_whirly && !unsolid`.

JS avant : `M1_AMORPHOUS` brut + noncorporeal, **pas** whirly/unsolid (commentaire « always false for steeds »). Après : `amorphous \|\| noncorporeal \|\| is_whirly \|\| unsolid`. STEED_MLETS Set vs `steeds[]` C : doit matcher la table ; non revu caractère par caractère ici, mais le tightening est le C manquant.

### `use_saddle` — `steed.c:36–139`

Ordre C (et JS) :

1. `u_handsy()` → ECMD_OK
2. `uswallow \|\| Underwater \|\| !getdir(NULL)` → Never_mind ECMD_CANCEL — **short-circuit** : `getdir` pas appelé si swallow/water
3. `!dx && !dy` → saddle yourself ECMD_OK (pas dz-only : C identique)
4. `!isok \|\| !m_at \|\| !canspotmon` → nobody ECMD_TIME
5. déjà `W_SADDLE` / `which_armor` → another one TIME
6. `touch_petrifies && !uarmg && !Stone_resistance` → You touch ; **C : `if (!(poly_when_stoned(data) && polymon(STONE_GOLEM))) instapetrify`** ; JS : **`instapetrify` direct**, pas de poly-golem
7. `PM_AMOROUS_DEMON` Shame + `exercise(WIS,false)` TIME
8. minion/shk/priest/gd/wiz mind TIME
9. `!can_saddle` TIME
10. **chance** (voir ci-dessous)
11. `maybewakesteed` (**peut `rn2`**)
12. `rn2(100) < chance` → put saddle `remove_worn_item`+`freeinv`+`put_saddle_on_mon` else resists
13. ECMD_TIME

### Chance — branche par branche

C :
```
DEX + CHA/2 + 2*mtame
+ ulevel * (mtame ? 20 : 5)
!mtame → −10*m_lev
Knight +20
P_RIDING : restricted/unskilled/default −20 ; basic 0 ; skilled +15 ; expert +30
Confusion||Fumbling||Glib → −20
else if riding gloves +10
else if riding boots +10
cursed −50
```

JS : `acurr(DEX)+trunc(acurr(CHA)/2)+2*mtame` ; Knight `Role_if(PM_KNIGHT)` **déjà** dans steed.js ; `P_SKILL(P_RIDING)` import `weapon.js` ; `Fumbling()` attrib (H\|\|E, D-0691) ; Glib `u.Glib|0` ; `objdescr_is(..., 'riding gloves'|'riding boots')`.

**Ordre RNG après chance :** `maybewakesteed` **avant** `rn2(100)`. C `maybewakesteed` : `msleeping=0` ; si mfrozen : frozen=(frozen+1)/2 ; `!rn2(frozen)` wake. JS fonction préexistante même formule. Donc : **éventuel `rn2(frozen)` puis `rn2(100)`** — ordre C.

`objdescr_is` via `objectDescrs[oc_descr_idx ?? otyp]` : si l’index descr JS ≠ appearance C, le +10 riding never hits. Dette data, pas le contrôle de flux.

### Petrify — écart concret

C tente **stone golem poly** avant instapetrify. JS saute. Un héros `poly_when_stoned` survit en C, meurt/pétri en JS. **Non nommé** dans D-1008 (deferrals = extrinsics / HAND phrasing). `instapetrify` async import trap.js.

### Locaux vs C 1:1
- `freehand` / `u_handsy` : copies engrave/pickup. `oc_big` pour bimanual — approximation `oc_bimanual`.
- `freeinv` : splice invent, **pas** unpaid/shop.
- `remove_worn_item` : clear W_WEP/SWAPWEP/QUIVER only ; C `remove_worn_item(otmp, FALSE)` fait props/artefacts. Nommé partiellement (`update_mon_extrinsics` côté monstre).

`put_saddle_on_mon` préexistant ; C refuse si !can_saddle \|\| already saddle. JS success path après `can_saddle` check.

### `u_handsy` / `freehand`
C `pickup.c` `u_handsy` : nohands « You have no hands! » ; !freehand « You have no free hand. ». JS plines identiques. `freehand` C : welded uwep bimanual ou shield cursed. JS `oc_big` comme bimanual — **pas** `objects[].oc_bimanual`. Un mattock `oc_big` sans être two-hand C : JS refuse de seller. Inverse possible.

`getdir(null)` : C `(char*)0`. JS `getdir(null)` lock.js. Swallow/Underwater short-circuit **avant** getdir : pas de prompt, Never_mind. C `pline1(Never_mind)` ; JS `pline(Never_mind)` import const.

### `maybewakesteed` préexistant
Non modifié dans ce peel sauf qu’il est **appelé** depuis `use_saddle` (C aussi). Commentaire JS « wake pline when wasimmobile && !helpless deferred (async) » : C peut pline wake. Sous-notification, pas un jet manqué (le `rn2(frozen)` est là).

### `put_saddle_on_mon`
C après succès : `remove_worn_item(otmp, FALSE)` ; `freeinv` ; `put_saddle_on_mon`. Si `put_saddle_on_mon` refuse (already saddle race), C `impossible` orphan. JS success seulement après checks. `saddle.leashmon = m_id` dans put JS préexistant — C use_saddle n’utilise pas leashmon pour la selle (`owornmask W_SADDLE`). Champ JS recyclé : piège conceptuel, pas D-1008.

## Constitution / playbook
Grep RAS. Dynamic import steed depuis apply : cycle. Rule #2 OK. Pas de traces. Historiquement thin : **un** C function envelope, densité §2b textbook. `Never_mind` / `P_RIDING` constants — pas des seeds.

## Densité (§2b)
**Right size.** Trop petit aurait été « case SADDLE return TIME » sans chance. Ici formule + gates. Pas too-big. Helpers recopiés (freeinv) = dette, pas un second sous-système.

## Documentation
D-1008 Status fixed. Symptom : doapply SADDLE fell through. Fix : chance envelope DEX/CHA/tame/level/Knight/riding/impair/gloves·boots/cursed + petrify/amorous/special ; tighten can_saddle whirly/unsolid/amorphous. Deferred : `update_mon_extrinsics` ; poly `body_part(HAND)` in u_handsy.

**Omet** `poly_when_stoned`. `absent.md` / `turns.md` +3/−1 / +4/−1 : retire l’omit SADDLE. CURRENT next crystal/towel. Journal #1279 15/16 + seed0103/0104 ride PASS — exerce **doride/mount** déjà portés, pas `a`pply saddle. Preuve faible que `rn2(100)` a été vu en public.

Archive `AGENT-LOOP-JOURNAL-2026-07-22-d1008.md` dans le commit : rotation, pas du C.

## Vérification
Green + apply/steed 15/16 ; 0103/0104 ride. apply SADDLE peut rester mort dans le public set.

## Risques / dette
1. **`poly_when_stoned` / `polymon(STONE_GOLEM)` absent** — petrify trop létal.
2. `freeinv` / `remove_worn_item` minces (shop, props).
3. `objdescr_is` appearance strings.
4. `getdir` self-cell : C ne selle pas le destrier sous soi (seulement dx/dy) — JS identique ; steed sous le héros : « Very funny » même si u.usteed. C aussi (pas dz). OK.
5. `can_saddle` STEED_MLETS vs `steeds[]`.

## Complément — petrify et skill riding

C petrify :

```c
        You("touch %s.", mon_nam(mtmp));
        if (!(poly_when_stoned(gy.youmonst.data) && polymon(PM_STONE_GOLEM))) {
            Sprintf(kbuf, "attempting to saddle %s",
                    an(pmname(mtmp->data, Mgender(mtmp))));
            instapetrify(kbuf);
        }
```

`polymon` **consomme RNG** (HP, messages) si poly_when_stoned. JS skip tout le if → **pas** ces jets, **pas** la survie golem. Ensuite C continue amorous/special **même après** instapetrify si lifesave. JS `await instapetrify` puis continue amorous — si instapetrify JS noreturn/endgame, les lignes suivantes mortes comme C `noreturn` de facto. Si instapetrify JS return, suite identique.

`P_SKILL(P_RIDING)` : `weapon.js` table. Restricted/unskilled/default −20. Un héros sans skill riding initialisé (`undefined`) JS `switch` default −20 — C `P_ISRESTRICTED` souvent 0. Si JS `P_SKILL` return `undefined`, default −20 ≡ unskilled. OK. Expert +30 puis impair −20 **else if** gloves : C `if (Confusion||Fumbling||Glib) -20; else if gloves; else if boots`. Pas de cumul gloves+boots. JS identique.

`otmp.cursed −50` **après** impair/gloves, **avant** maybewakesteed. Un saddle cursed + Glib : −20−50, puis `rn2(frozen)` wake, puis `rn2(100)`. Ordre C.

`Role_if(PM_KNIGHT)` : function locale steed.js L57 (préexistante). Pas un identifiant magique.

## Tableau branches (D-1008)

| Gate | Return C | JS |
|---|---|---|
| !u_handsy | ECMD_OK | identique |
| swallow/water/!getdir | CANCEL Never_mind | identique short-circuit |
| self cell | OK funny | identique (pas dz steed) |
| !spot | TIME nobody | identique |
| already saddle | TIME | identique |
| cockatrice touch | poly golem **ou** instapetrify | **instapetrify seul** |
| succubus | TIME Shame WIS | identique |
| special mon | TIME mind | identique |
| !can_saddle | TIME | identique + whirly/unsolid |
| maybewakesteed | rn2(frozen) possible | identique, **avant** rn2(100) |
| rn2(100)&lt;chance | put vs resists | identique |
| cursed chance | −50 | identique |

Steed historiquement thin : `can_saddle` existait ; `use_saddle` non. D-1008 est le trou apply. Right size.

C chance + wake + jet (`steed.c:92–129`) :

```92:129:nethack-c/upstream/src/steed.c
    chance = ACURR(A_DEX) + ACURR(A_CHA) / 2 + 2 * mtmp->mtame;
    chance += u.ulevel * (mtmp->mtame ? 20 : 5);
    if (!mtmp->mtame) chance -= 10 * mtmp->m_lev;
    if (Role_if(PM_KNIGHT)) chance += 20;
    switch (P_SKILL(P_RIDING)) { restricted/unskilled/default -20;
        basic 0; skilled +15; expert +30; }
    if (Confusion || Fumbling || Glib) chance -= 20;
    else if (uarmg && objdescr_is(uarmg, "riding gloves")) chance += 10;
    else if (uarmf && objdescr_is(uarmf, "riding boots")) chance += 10;
    if (otmp->cursed) chance -= 50;
    maybewakesteed(mtmp);
    if (rn2(100) < chance) { put saddle } else { resists }
```

JS recopie les termes **dans cet ordre**. Division CHA : C integer `/ 2` ; JS `Math.trunc(acurr(CHA)/2)`. Positif : identique. Knight **avant** skill riding **avant** impair **avant** cursed. Un Knight expert Glib + selle maudite : +20+30−20−50, puis `maybewakesteed` (`rn2(frozen)` possible), puis `rn2(100)`. JS identique.

`Confusion || Fumbling || Glib` C macros. JS `Confusion` / `Fumbling()` / `u.Glib|0`. Si `Confusion` JS n’OR pas l’extrinsic comme C `HConfusion||EConfusion`, le −20 rate. Préexistant attrib, **activé** ici sur le chemin apply.

Petrify **avant** chance : C `You("touch %s")` puis `poly_when_stoned && polymon(STONE_GOLEM)` sinon `instapetrify`. **Aucun** `rn2(100)` si on pétri — on n’atteint pas chance. JS `instapetrify` direct : même skip du jet selle si la mort/pétrification abort. Écart : héros `poly_when_stoned` C **survit** (RNG `polymon`) puis **continue** amorous/special/chance ; JS meurt ou pétri. Branche **non nommée**.

`freeinv` local : splice array, pas `bill_dummy_object` / unpaid. Seller une selle en magasin : C facture ; JS peut dupliquer ou drop silencieusement. Hors RNG apply, dette shop. `remove_worn_item` local ne clear que W_WEP/SWAPWEP/QUIVER — une selle déjà `owornmask` autre (improbable) resterait « portée » côté héros.

seed0103/0104 ride PASS : `doride` / mount, **pas** `a`pply SADDLE. Le `rn2(100)` de ce peel n’est probablement **pas** dans ces traces. Green+cohort = non-régression `can_saddle` tightening (whirly/unsolid) sur des montures déjà sallées.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7.5/10**
- Si je ne devais retenir qu’une critique : **la formule `rn2(100)<chance` et `maybewakesteed` avant le jet sont le C** ; le petrify sans `poly_when_stoned` est un écart de branche non avoué.
