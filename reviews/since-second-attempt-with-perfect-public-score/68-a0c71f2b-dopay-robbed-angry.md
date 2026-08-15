# Review 68 — `a0c71f2b` — D-0998 dopay robbed / angry / debit

## Métadonnées
- Hash complet / court : `a0c71f2bd773a65fc3be030dec1770d587567c2e` / `a0c71f2b`
- Parent : `ccba6ff57057f21d15a0461643d9d4ca2b20fa29`
- Auteur, date : Raphaël Hervier, mercredi 22 juillet 2026 04:50:36 +0200
- D-id : **D-0998**
- Stats : 7 files, **+244 / −25**
- Fichiers JS / map / cadence : **`js/shk.js` seul** parmi le JS ; `absent.md` ; pas de cadence

## Intention vs livrable
Promet le `proceed` C : settle robbed (non-résident paisible), appease robbed/angry sans bill, débit loan/credit **avant** la facture itemisée. Le diff JS est exactement ces bras dans `dopay`, plus helpers `hidden_gold` / `NOTANGRY` / `plur` / `noit_mhe|him|his`. Titre = livrable. Shop pay est high-stakes (or, `make_happy_shk`, `rn2`). Pas de mélange cadence.

## Inventaire

| Fichier | Rôle |
|---------|------|
| `js/shk.js` | Port C : `dopay` proceed robbed/angry/debit + helpers |
| `docs/c-js-map/absent.md` | Docs : dopay appease marqué D-0998, reste used-up/getpos |
| CURRENT / NOTES / D-INDEX/LOG / journal | Cadence non ; D-0998 |

`git show --stat` : 7 files, **un seul JS**. Densité §2b exemplaire. +208/−25 dans shk.js.

## Fidélité C ↔ JS

### `dopay` proceed
- Locus C : `shk.c:dopay` `proceed:` ~1855–1993+
- Locus JS : `js/shk.js:dopay`

C après choix du shk :
1. `ltmp = eshkp->robbed`
2. si robbed|billct|debit → `rouse_shk(shkp, TRUE)`
3. si `helpless` → pline napping/`doesn't respond` **`rn2(2)`** → `ECMD_OK`
4. si `shkp != resident && NOTANGRY` → settle robbed only, `ECMD_TIME`
5. si `!billct && !debit` → owe-nothing / robbed compensate / angry 1000-gold, `ECMD_TIME`
6. si `shkp != resident` → `impossible` + `setpaid(resident)` `ECMD_OK`
7. si `debit` → credit/money2mon, `paid=true`
8. si `billct` → itemize (préexistant)

JS insère 1–7 **avant** l’ancien bill menu. `stashed_gold = hidden_gold(true) > 0` en tête, comme C `hidden_gold(TRUE) > 0L`.

**Branche-par-branche (settle non-résident paisible) :** `!ltmp` → owe nothing ; `!umoney` → no gold + maybe stashed pline ; else `umoney > ltmp` → give ltmp `pay(ltmp)` else give all `pay(umoney)` + hidden gold ; puis `(umoney < ltmp/2) || (umoney < ltmp && stashed)` → unsatisfied **sinon** `make_happy_shk(..., false)`. JS `(ltmp / 2) | 0` = division entière C `ltmp/2L`. **Match.** Callers `pay` / `make_happy_shk` déjà dans shk.js (pas des stubs).

**Bras `!bill && !debit` :**
- `!ltmp && NOTANGRY` : owe nothing ; si `!umoney` moreover no gold (stashed « seem to »).
- `ltmp` : « after blood, not gold! » ; si pas assez (`< ltmp/2` ou `<ltmp && stashed`) return `ECMD_TIME` **sans** `pay` ; sinon compensate `pay(min(umoney,ltmp))` + `make_happy_shk`.
- else (angry, not robbed) : hide not gold ; `umoney < 1000` → return TIME ; else pay **1000** + …

**RNG appease angry :**

```1938:1941:nethack-c/upstream/src/shk.c
            if (strncmp(eshkp->customer, svp.plname, PL_NSIZ) || rn2(3))
                make_happy_shk(shkp, FALSE);
            else
                pline("But %s is as angry as ever.", shkname(shkp));
```

JS :

```javascript
if (cust.toLowerCase() !== pln.toLowerCase() || rn2(3)) {
    await make_happy_shk(shkp, false);
} else {
    await pline(`But ${shkname(shkp)} is as angry as ever.`);
}
```

**Écart concret (short-circuit RNG) :** C `strncmp` est **sensible à la casse**. Noms égaux hors casse (`Foo` vs `foo`) : C `strncmp != 0` → `make_happy` **sans** `rn2(3)`. JS égalité case-insensitive → **consomme `rn2(3)`**. C’est un drift ISAAC possible sur #pay angry. `pln.slice(0, 32)` ≈ `PL_NSIZ` : bon. Le `|| rn2(3)` LTR est sinon correct (si noms diffèrent, pas de `rn2`).

**Débit :** C `umoney + credit < dtmp` → pas assez, TIME (or **non** débité). Puis `credit >= dtmp` → soustraire credit, zéro debit/loan ; `!credit` → `money2mon(dtmp)` ; else crédit partiel + `money2mon` reste. JS : mêmes trois bras, `paid = true`, `flags.botl`. **Match.** `loan` n’affecte que le texte (loan==dtmp vs mixte vs merchandise only) — JS concatène les mêmes phrases. Pas de `pay()` ici : C `money2mon` (or du héros → monstre), pas `pay()` qui gère aussi `robbed`. **Correct.**

Table débit (C = JS) :

| Condition | Or héros | credit | debit/loan après | Message |
|-----------|----------|--------|------------------|---------|
| umoney+credit < dtmp | inchangé | inchangé | inchangé | not enough (+ seem to / or credit) |
| credit >= dtmp | inchangé | −dtmp | 0/0 | covered by credit |
| credit == 0 | money2mon(dtmp) | 0 | 0/0 | You pay that debt |
| 0 < credit < dtmp | money2mon(dtmp-credit) | 0 | 0/0 | partially offset + remainder |

C `else { if (credit>=dtmp) … else if (!credit) … else … }` après le early return not-enough. JS `if / else if / else` plat. **Même exclusivité.** `currency(dtmp)` JS vs C : si `currency` est un helper shk déjà porté, match ; sinon « zorkmids » vs « gold pieces » écran.

`pay(ltmp, shkp)` robbed settle : C `pay` décrémente `eshkp->robbed` et transfère l’or. Si JS `pay` ne touche **pas** `robbed`, le settle affiche mais `ltmp` reste → re-pay infini. `pay` n’est pas dans le hunk — **hypothèse à tenir** : D-log cite `pay`/`make_happy_shk` comme déjà là. Reviewer : `async function pay(tmp, shkp)` existe ligne ~3068. Non relu ici ; c’est le single point of failure shop.

`make_happy_shk(shkp, false)` : second arg C `silent` / `forgive` ? C `make_happy_shk(struct monst *, boolean)` — typically `silent`. `false` = messages. Angry 1000-gold : C `strncmp \|\| rn2(3)` puis happy **ou** « as angry as ever » **après** `pay(1000)` — l’or est **parti** même si toujours angry. JS identique. Pas un bug, piège design C.

`x_monnam(shkp, ARTICLE_THE, 'angry', 0, false)` : C canspotmon. JS `ARTICLE_THE` import. Si `x_monnam` JS ignore l’adjectif, l’écran « the angry Foo » rate.

`helpless` + `rn2(2)` : déjà présent avant ; JS ne le déplace pas après rouse — C rouse **puis** helpless (shk peut se réveiller). JS : `rouse_shk` puis `helpless` comme C.

**Callers non portés (nommés) :** multi-shk `getpos` ; used-up/container bill ; itemize traditionnel ; mute/Deaf nod. Le chemin « un shk, bill itemisé » préexistant reste après debit (`paid = paid || paidRef.paid`).

### Helpers
`hidden_gold(even_if_unknown)` : boucle `game.invent` `Has_contents` + `cknown || even_if_unknown` → `contained_gold`. C `hidden_gold` (invent.c/vault) peut être plus large (conteneurs imbriqués via `contained_gold` récursif). Si `contained_gold` JS est déjà récursif, match ; sinon or « stashed » sous-compté → mauvais bras « seem to have no gold ». Non vérifié dans `contained_gold` ici — dette.

`NOTANGRY` = `mpeaceful` : C macro. `noit_mhe/him/his` : female she/her sinon he/his — C you.h ; neuter « it » volontairement exclu (nom de fonction `noit_*`).

## Constitution / playbook
Grep JS : **aucun** FORCE/DIAG/fs/node/fastforward/seed. Rule #2 RAS. Frozen RAS. `await pay` / pline / `make_happy_shk` : pas de nouvel `nhgetch` (pas de yn sur ces bras C). 1:1 : tout dans `shk.js`. Header `dopay` met à jour l’enveloppe et nomme les omits restants. Pas de traces.

## Densité (§2b)
**Right size.** Un fichier, une fonction, le trou named omit. ~150 LOC C-fidèles dans la fourchette 50–300. Pas de sous-système unrelated. C’est le contre-exemple de D-0996.

## Documentation
D-log fixed, deferred getpos/used-up/itemize/SetVoice — **honnête**. `absent.md` ne prétend pas shop complete. Index cohort **11/12** seed0009. CURRENT next → apply camera. Pas « complete dopay ».

Header `shk.js` : « dopay: debit/robbed/angry appease (D-0998) ; used-up/container bill arms » encore dans la liste d’omissions du fichier — **honnête**. `stashed_gold` msgs : D-log dit portés ; header retire « hidden_gold stashed msgs » de deferred. Cohérent.

`no_money` / `not_enough_money` C sont des format strings partagées. JS inline « Moreover, you seem to have no gold. » — doit matcher **exactement** pour un écran #pay. Si C `no_money` = `"Moreover, you%s have no gold."` avec `" seem to"` insert, JS `` `Moreover, you${stashed_gold ? ' seem to' : ''} have no gold.` ``. **Match** de construction.

## Vérification
Journal : green+strict ; shop/shared **11/12** seed0009. Pas de full suite (itération #1268, pas %5). High-stakes shop : un cohort 11/12 **sans** lister les seeds ne prouve pas un #pay robbed/debit (peu de sessions publiques paient un shk angry). Preuve **affirmée**. Fortress 43/44 non rejouée.

## Risques / dette
1. **`strncmp` vs `toLowerCase`** : `rn2(3)` en trop ou en moins → drift or/`make_happy_shk`.
2. **`hidden_gold` / `contained_gold`** : mauvais stashed → mauvais messages et le test `umoney < ltmp && stashed` (mollify).
3. **getpos multi-shk** toujours absent : `dopay` distant incomplet.
4. **`pay(1000)` angry** si `umoney>=1000` même si 1000 est tout l’or — C identique ; pas un bug, mais irréversible.
5. Shop + `make_happy_shk` : malédiction / `robbed=0` / peace — une erreur de bras est une régression économie silencieuse (RNG 100 % ne la voit pas si #pay n’est pas dans la trace).

`pay()` (préexistant, lu hors hunk) **décrémente** `eshkp.robbed` :

```3068:3078:js/shk.js
async function pay(tmp, shkp) {
    const eshkp = ESHK(shkp);
    const robbed = eshkp?.robbed | 0;
    const balance = tmp <= 0 ? tmp : check_credit(tmp, shkp);
    if (balance > 0) money2mon(shkp, balance);
    else if (balance < 0) await money2u(shkp, -balance);
    if (game.flags) game.flags.botl = true;
    if (robbed && eshkp) {
        eshkp.robbed = Math.max(0, robbed - tmp);
    }
}
```

C `pay` fait credit + money2mon + robbed-=tmp. JS `check_credit` puis robbed. **Le settle robbed n’est pas un no-op or.** `Math.max(0, robbed-tmp)` : overpay clamp. C `robbed -= tmp` peut-il aller négatif ? Si C clamp aussi, match ; sinon JS plus défensif.

`Shknam` vs `shkname` : hunk hide→Shknam, blood→shkname comme C. `hidden_gold(true)` : `cknown || even_if_unknown` = C. `money2mon` pose `botl` ; crédit-only non — C `disp.botl` idem. `rouse_shk` no-op → `rn2(2)` extra.

## Lecture C complémentaire (`shk.c` 1855–1993)

`rouse_shk(shkp, TRUE)` : C réveille msleeping (peut-être `mcanmove`). JS `rouse_shk` préexistant. Si c’est un no-op, le bras helpless juste après (« napping ») reste pris à tort. D-log cite rouse comme porté **ici** — le hunk **appelle** `rouse_shk`, ne le définit pas. Preuve = existence antérieure.

`money_cnt(gi.invent)` vs JS `money_cnt(game.invent)` : or visible, pas stashed. C. `pay` vs `money2mon` : robbed uses `pay` (compte robbed) ; debit uses `money2mon` (pas robbed). Inverser les deux = boutique cassée. JS respecte.

Non-résident paisible **return ECMD_TIME même si !ltmp** (owe nothing). C consomme un tour pour dire « you do not owe ». JS. Un #pay spam hors boutique coûte des tours. **C.** Pas un bug.

`shkp !== resident` après le bras !bill : `impossible` + `setpaid(resident)`. JS skip `impossible` (pas de panic JS) mais `setpaid(resident)` si resident. Un pay distant angry-with-bill tomberait ici. Rare. Named getpos.

`paid = paid || paidRef.paid` : si débit payé et bill cancel, `paid` reste true → thank-you verbalize possible. C `paid = TRUE` au débit puis bill peut ajouter. C `if (pay_done && !ANGRY && paid) thank`. JS inchangé sauf `paid ||`. **Match.**

`helpless` après rouse : C `rn2(2)` message. Si rouse réussit, helpless false, pas de `rn2`. JS. **Short-circuit RNG** dépend de rouse. Si JS rouse no-op, **un `rn2(2)` extra** vs C éveillé. Drift boutique.

`NOTANGRY` = peaceful. Un shk `mpeaceful==1` mais `robbed>0` (vol sans angry?) : settle non-résident. C. JS.

`ltmp` n’est **pas** re-lu après pay : C commentaire « ltmp is still eshkp->robbed here » pour le bras !bill — **après** le return du non-résident. Dans le bras !bill, `ltmp` est la valeur **initiale** robbed, même si… on n’a pas encore pay dans ce bras avant les tests. OK.


## Callers C `dopay` non concernés
`dopay` est le cmd `#pay` / `p`. Pas d’autre caller. Le proceed est le cœur. `paybill` (mort/croak) est une **autre** fonction — non touchée. `hot_pursuit` / `make_angry_shk` non touchés. Un settle robbed **paisible** n’appelle pas `make_angry`. `check_credit` dans `pay()` : or en trop → crédit shop. C `pay` aussi. Un overpay robbed crée du crédit : C-fidèle si `check_credit` l’est.

`ECMD_TIME` vs `ECMD_OK` : les bras « napping » / « not to shopkeeper » restent OK (pas de tour) comme C. Settle et appease et debit-not-enough : TIME. Un joueur qui #pay sans or en boutique débit : **tourne** (C). JS. RAS.

`resident` vs `nxtm` : le hunk ne retouche pas la sélection shk (nexttosk / seensk). Un bug getpos reste le named omit. Le proceed suppose `shkp` déjà choisi — comme C `goto proceed`.


Grep `git show a0c71f2b -- js/` : **zéro** hit FORCE/DIAG/fs/node/fastforward/seed. Un des diffs JS les plus propres de la fourchette. Frozen non touchés. `ARTICLE_THE` constante, pas un glyphe hardcodé.


`check_credit` dans `pay()` : overpay robbed → crédit. Hors hunk mais sur le chemin settle. Si `check_credit` JS faux, le settle est faux — préexistant, pas D-0998.


`plur(ltmp)` JS local : n===1 ? '' : 's'. C `plur`. « 1 gold piece » vs « 2 gold pieces ». Match anglais C.


`cust.slice` : `String(game.plname||'').slice(0,32)` vs C `PL_NSIZ` strncmp. Noms >32 : C compare 32 chars. JS slice 32. Match longueur.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **8/10**
- Si je ne devais retenir qu’une critique : le proceed C est porté serré (rouse → helpless → non-résident → !bill → debit avant facture), mais `strncmp` case-sensitive vs `toLowerCase` casse le short-circuit `rn2(3)` sur le mollify angry — inacceptable à sous-estimer en boutique.
