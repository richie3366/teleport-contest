# Review 58 — `b949418d` — Is_box kick + chest_trap + ghitm

## Métadonnées
- Hash complet / court : `b949418d722a5fe52f0bd17da5813a4a4604b15d` / `b949418d`
- Parent : `35988b3891b42143454cc5f01e9158cfca6d4f40`
- Auteur, date : Raphaël Hervier, 2026-07-22 03:40:13 +0200
- D-id : D-0989
- Stats : 13 files, +621/−64
- Fichiers JS / map / cadence : `js/dokick.js`, `js/trap.js` (`chest_trap`), `js/shk.js` (helpers), `js/lock.js` (export) ; map turns/absent/debt ; pas de cadence

## Intention vs livrable
Promet de retirer la dette kick nommée : `container_impact_dmg`, casse de serrure/couvercle + `chest_trap`, catch d’or `ghitm`, plus des helpers shk « thin ».

Livrable réel : les quatre morceaux sont dans le diff, callers kick branchés. Écart : `make_angry_shk` est *thin* jusqu’à `addupbill ≡ 0` ; `chest_trap` saute `rndcolor`/`ROLL_FROM(blindgas)` (RNG) ; D-log « fixed » ne nomme pas ce skip. `breakchestlock` n’est qu’un export, pas un port.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/dokick.js` | Port C : `container_impact_dmg`, `ghitm`, bras Is_box de `really_kick_object` |
| `js/trap.js` | Port C : `chest_trap` (gros) |
| `js/shk.js` | Stub/thin : `make_angry_shk` / `make_happy_shk` |
| `js/lock.js` | Wiring : `export breakchestlock` |
| map / CURRENT / NOTES / D-log / journal | Docs |

## Fidélité C ↔ JS

### `container_impact_dmg`
- Locus C : `dokick.c:container_impact_dmg` (~412)
- Locus JS : `js/dokick.js:container_impact_dmg`

Porté : `Is_container && Has_contents && !Is_mbag` ; shop `costly_spot` ; `frominv = obj !== kickedobj` ; boucle `cobj` :
verre non-gemme + `!obj_resists(otmp, 33, 100)` → shatter ; **else if** egg `!rn2(3)` → cracking. Miroir `change_luck(-2)` ; œuf `spe && ismnum` `change_luck(-1)` ; `You_hear` muffled ; shop `stolen_value` ; `cknown=0`.

RNG : `obj_resists(33,100)` **avant** le `rn2(3)` egg — même ordre C. Un verre qui résiste ne tire pas le `rn2` œuf (objets distincts, donc OK).

Écart : C `useup` si `quan>1` sinon `obfree` ; JS `quan--` + `weight` sinon extract/`OBJ_FREE`. `useup` a des bras worn/bill que `quan--` n’a pas. Contenu au sol kické : probablement équivalent. `Soundeffect` nommé omit. `insider` C = `inside_shop(ux,uy) && rooms==ushops` ; JS compare seulement `ushops[0]===rooms[0]` sans `inside_shop`.

### Is_box dans `really_kick_object`
C 649–676 vs JS. Ordre :

```
if (Is_box) {
  otrp = otrapped;
  if (range < 2) THUD!;
  container_impact_dmg(...);
  if (olocked) { if (!rn2(5) || (martial && !rn2(2))) break lock; chest_trap; return 1; }
  else        { if (!rn2(3) || (martial && !rn2(2))) lid slam; chest_trap; return 1; }
  if (range < 2) return 1;
}
```

JS recopie cet ordre, y compris le court-circuit `||` : `rn2(5)` toujours ; `rn2(2)` seulement si martial et premier test faux. Clang LTR respecté. `chest_trap(obj, LEG, false)` comme C. Fall-through vers `hero_breaks` si le coffre survit et `range>=2` : OK.

### `ghitm`
- Locus C : `dokick.c:ghitm` (~295)
- Locus JS : `js/dokick.js:ghitm`

Porté : `!likes_gold && !isshk && !priest && !gd && !merc` → `wakeup` ; `!mcanmove` → hit inoffensif ; else sleep clear, `finish_meating`, `!isgd && !rn2(4)` `setmangry`, catch visible, `mpickobj`, bras shk/priest/gd/merc, `return TRUE`. Miss → `return FALSE`.

RNG mercenaire : `goldreqd && rn2(3)` puis `goldreqd += (umoney + ulevel * rn2(5)) / ACURR(A_CHA)` — JS tire les deux `rn2` dans le même ordre. Écart : JS `/ (acurr(A_CHA) || 1)` — **fallback inventé** si CHA=0 (C divise par ACURR, jamais 0 en pratique).

Écart miss : C `miss(xname(gold), mtmp)` ; JS invente `The(xname) misses mon_nam/it`. Pas le même message, pas de RNG `miss()` interne.

Écart shk : C `mhis(mtmp)` ; JS `mtmp.female ? her : his`. C `SetVoice` sauté (nommé). `hidden_gold_kick` est un walk inventaire 1 niveau, pas le `hidden_gold` C (conteneurs imbriqués). Nommé « invent-container detail ».

Callers : bras gold de `really_kick_object` maintenant `await ghitm` au lieu du fall-through D-0988. **Ça réintroduit les `rn2` manqués au peel précédent** — correct.

### `chest_trap`
- Locus C : `trap.c:chest_trap` (~6294)
- Locus JS : `js/trap.js:chest_trap` (export)

Luck gate : `Luck > -13 && rn2(13+Luck) > 7` puis `switch(rn2(13))` messages dud — **identique**. Else :

```
rn2(20) ? ((Luck >= 13) ? 0 : rn2(13 - Luck)) : rn2(26)
```

JS :

```javascript
const roll = rn2(20)
    ? ((luck >= 13) ? 0 : rn2(13 - luck))
    : rn2(26);
```

Clang LTR : `rn2(20)` toujours ; second `rn2` seulement sur le bras. Confirmé.

Cases 25–21 explode (stolen_value, `delete_contents`, unpunish, delobj pile, `d(6,6)`, angry) ; 20–17 gas `rn2(3)` poison vs `create_gas_cloud(1,8)` ; 16–13 needle ; 12–9 `dofiretrap` ; 8–6 elec `d(4,4)` + `destroy_items` AD_ELEC ; 5–3 freeze `d(5,6)` ; 2–0 hallu `rn1(7,16)` / `rn1(5,16)`. Structure fidèle.

**Écart RNG non négociable** — case 2–0 C :

```c
Blind ? ROLL_FROM(blindgas) : rndcolor()
```

Les deux appellent le RNG. JS : `Blind() ? 'strange' : 'colorful'` — **zéro `rn2`**. Le D-log omit dit « Blind gas rndcolor table (uses strange) » : confond le bras Blind (`ROLL_FROM`) et le bras voyant (`rndcolor`). Le skip du bras **voyant** n’est pas nommé comme skip keystream. Tout coffre-piège hallu/gas coloré décale le RNG vs C.

Autres : `shieldeff` sauté (nommé) ; `stagger()` C vs verbe hardcodé « stagger » ; `bot()` polish nommé ; `Luck_chest` / `Tobjnam_chest` / `currency_chest` / `delete_contents_chest` dupliqués localement dans `trap.js`.

`insider` explode : même approximation `ushops[0]` que l’impact.

### `make_angry_shk` / `make_happy_shk`
- Locus C : `shk.c:make_angry_shk` (~1470)
- JS : thin. C `robbed += addupbill+debit+loan - credit` puis `setpaid`. JS appelle `addupbill(shkp)` qui **`return 0`**. Facture magasin jamais pliée dans `robbed` à l’explosion/impact shop. Commentaire « stub 0 until bill walk » — nommé dans le code, **pas** dans le Deferred D-0989 (seulement home_shk/kops pour happy).

`make_happy_shk` : pacify + clear robbed/following + pline calm. C fait home/migrate/kops — nommé.

### `breakchestlock`
Export only. Corps inchangé. Caller kick branché : OK pour D-0989.

### RNG lock/lid — table de vérité
`olocked` :
| martial | rn2(5)==0 | rn2(2) appelé ? | lock break |
|---|---|---|---|
| non | oui | non (short-circuit) | oui |
| non | non | non (`martial()` faux) | non |
| oui | oui | non | oui |
| oui | non | oui | si rn2(2)==0 |

C et JS identiques. Unport D-0988 sautait **toute** cette table : un kick coffre avant D-0989 n’alignait pas le keystream ; après D-0989, un coffre kické **réintroduit** 1 ou 2 `rn2` avant `hero_breaks`. Toute session publique qui kick un coffre change de stream entre 57 et 58 — c’est voulu.

`container_impact_dmg` **avant** lock RNG : chaque verre `obj_resists(33,100)` (souvent 1 `rn2`) ; chaque œuf `rn2(3)`. Un coffre de potions peut brûler N résistances **puis** `rn2(5)`. Ordre C : impact loop complète, **ensuite** lock. JS `await` dans la boucle n’insère pas de RNG extra.

### `chest_trap` explode et `d(6,6)`
`losehp(maybe_half_phys(d(6,6)), ...)` : `d(6,6)` = six `rn2(6)+1`. JS doit appeler `d` du même module que C `rnd.c`. Si `maybe_half_phys` est encore l’identité (prop Half_physical deferred), le HP match C sans le talent. `wake_nearby(false)` C vs JS — si JS `wake_nearby` est thin, pas de RNG manqué ici (C `wake_nearby` peut en avoir). Non vérifié en profondeur ; dette trap.

`delete_contents_chest` : extract recursive, pas `obfree`/`obj_resists`. C `delete_contents` libère vraiment. Un Amulet dans le coffre : C `delobj` sur la pile **après** contents, `obj_resists` dans `delobj` peut sauver l’Amulet. JS `delobj` existant — dépend de ce `delobj`. Hors revue si `delobj` est déjà C-fidèle.

### `ghitm` shk credit
C `ESHK->credit += value` avec `value = quan * objects[otyp].oc_cost`. JS `(oc?.oc_cost || 1)` : si table objects incomplète, **×1 inventé**. Gold standard `oc_cost==1` donc OK. `make_happy_shk` si robbed tombe à 0 — thin helper (pas de kops gone).

## Constitution / playbook
Grep : pas de FORCE/DIAG/fs/fastforward. `chest_trap` utilise `await import('./zap.js')` pour `destroy_items` — cycle, pas Rule #2. Helpers `Luck`/`Tobjnam` recopiés (1:1 `you.h`/`objnam.c` non respecté, déjà endemic). RAS constitution hard.

## Densité (§2b)
Right size / légèrement gros : impact + lock/lid + `chest_trap` entier + `ghitm` + shk thin. C’est un **cluster kick-conteneur** légitime (tous les callees Is_box). `chest_trap` est un port de fonction C complète, pas un peel d’un `case`. Acceptable §2b ; le coût c’est la fidélité gas/color RNG bâclée dans le même commit.

## Documentation
D-0989 « fixed » + Deferred hits_bars/costly_gold/petrify/tmp_at/SetVoice/home_shk. **Ne nomme pas** `rndcolor`/`blindgas` ni `addupbill=0`. Map turns : « Is_box container_impact/lock/lid/chest_trap + ghitm » et reporte costly_gold/hits_bars — OK. Journal #1259 : green + kick 19/20 + seed0060. CURRENT next → hits_bars.

Overclaim : « gold catch via ghitm » est vrai pour likes_gold ; le miss path n’est pas `miss()`. « thin make_angry » est le seul aveu, trop poli pour un `addupbill` stub.

## Vérification
Même cohort kick 19/20 que D-0988. `chest_trap` est aussi un callee de `lock.c` force/open : **aucun lock/untrap cohort**. Un piège de coffre hors kick n’est pas exercé. Preuve = journal seulement.

## Risques / dette
1. **`rndcolor` / `ROLL_FROM(blindgas)` skip** — keystream chest_trap case 0–2.
2. **`addupbill` = 0** — explosion magasin sous-compte `robbed`.
3. `useup` vs `quan--` dans l’impact.
4. `ghitm` miss / `hidden_gold` / `|| 1` CHA.
5. `inside_shop` vs lettre de room.
6. Callers C `chest_trap` hors kick (force lock, untrap) maintenant exportés : comportement nouveau non cohorte.
7. `You_hear` local vs C acoustics pour muffled shatter.
8. `poisoned('gas cloud', A_STR, ...)` et `poisoned('needle', A_CON, ...)` : si `attrib.js poisoned` est partial, le trap « porté » dévie dans le callee.
9. `create_gas_cloud(ox,oy,1,8)` — region.js ; non relu ici.
10. `nomul(-d(5,6))` freeze : RNG `d` + `multi_reason` string C-fidèle.

## Questions ouvertes
- `rndcolor()` C : display rng ou `rn2` jeu ? Si display, le skip JS est un écart d’écran plus qu’un keystream. Si `rn2`, D-0989 est un QUALITY-RISK déguisé en omit Blind.
- `addupbill` stub : une explosion de caisse en magasin public existe-t-elle dans le 19/20 ? Si non, la dette est latente.
- `breakchestlock` `costly_alteration(COST_BRKLCK)` toujours deferred : kick-open d’un coffre unpaid ne facture pas la serrure.

### Citation C — luck gate + dégâts trap
```6312:6346:nethack-c/upstream/src/trap.c
    if (Luck > -13 && rn2(13 + Luck) > 7) { /* saved by luck */
        switch (rn2(13)) {
        case 12:
        case 11:
            msg = "explosive charge is a dud";
            break;
        /* ... */
        }
    } else {
        switch (rn2(20) ? ((Luck >= 13) ? 0 : rn2(13 - Luck)) : rn2(26)) {
```

JS `Luck_chest` + le même ternaire `rn2(20) ? … : rn2(26)`. Le bras *sauvée par luck* tire **toujours** un second `rn2(13)` pour le message. JS aussi. Le trou RNG est plus bas (gas coloré), pas ici.

### Citation C — gas coloré
```6474:6476:nethack-c/upstream/src/trap.c
            pline("A cloud of %s gas billows from %s.",
                  Blind ? ROLL_FROM(blindgas) : rndcolor(),
                  the(xname(obj)));
```

JS : `` const gas = Blind() ? 'strange' : 'colorful' ``. Deux RNG C absents.

## Verdict
- Verdict : ACCEPT-WITH-DEBT
- Note : 6/10
- Si je ne devais retenir qu’une critique : le `switch (rn2(20)?…)` de `chest_trap` est copié juste, puis le bras gas coloré jette deux appels RNG C (`rndcolor`/`ROLL_FROM`) pour des constantes — un « complete » qui ment sur le keystream.
