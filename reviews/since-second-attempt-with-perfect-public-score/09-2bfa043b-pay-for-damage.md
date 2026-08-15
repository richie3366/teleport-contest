# Review 09 — `2bfa043b` — pay_for_damage / getcad / hot_pursuit + cadence #1210

## Métadonnées
- Hash complet / court : `2bfa043bc422197a992b1d46cac70bc931060314` / `2bfa043b`
- Parent : `62659f73286030a08d398a18d1a47dd3b7e9fdf6`
- Auteur, date : Raphaël Hervier, 2026-07-21 22:34:35 +0200
- D-id (ou absence) : **D-0942 dans le corps / D-log uniquement**. Le sujet git ne porte **aucun** D-id.
- Stats : 11 files, +461 / −75
- Fichiers JS / map / cadence : `js/shk.js` (+355), `js/dig.js`, `js/hack.js`, `js/mon.js` ; `docs/c-js-map/debt.md` ; CURRENT/NOTES score **#1210** 44/44 ; journal + rotation i1210

## Intention vs livrable
Le sujet promet deux choses collées : **porter** `pay_for_damage`/`getcad`/`hot_pursuit` **et** rafraîchir le score cadence #1210. Le corps cite D-0942 et les wires chew/`zap_dig`/`wakeup`.

Le diff fait exactement ce mélange : ~355 lignes de port `shk.js` + 3 call sites + réécriture CURRENT (Scr/RNG/speed @#1210). Ce n’est pas un commit cadence pur, ce n’est pas un commit port pur.

Écarts process :
- D-id **absent du sujet** (présent ailleurs) — à flaguer.
- Port C **mêlé** à un refresh de suite. Playbook : un cadence commit qui porte du C en plus est un mélange.

## Inventaire

| Fichier | Rôle |
|---|---|
| `js/shk.js` | Port C : `cad`, `hot_pursuit`, `getcad`, `pay_for_damage`, `clear_no_charge*` |
| `js/hack.js` | Wiring : `still_chewing` → `pay_for_damage(dmgtxt, false)` |
| `js/dig.js` | Wiring : `zap_dig` shopdoor/shopwall |
| `js/mon.js` | Wiring : `wakeup` → `hot_pursuit` si shk hors boutique |
| `docs/c-js-map/debt.md` | Marque D-0942 porté ; laisse dokick/explode/apply/`dig` occupation |
| `docs/DIVERGENCE-LOG.md` / INDEX | D-0942 « fixed » avec deferrals nommés |
| `docs/CURRENT.md` / `NOTES.md` | Score #1210 44/44, speed `31+0.26/turn` |
| Journal + archive i1210 | Cadence + claim green/cohort/sessions |

## Fidélité C ↔ JS

### `hot_pursuit` — C `shk.c:1449` / JS `js/shk.js:706`
C : `isshk` → `rile_shk` → `strncpy(customer, plname, PL_NSIZ)` → `following=1` → `clear_no_charge(NULL, fobj)` → `clear_no_charge_pets`.

JS : même ordre. `slice(0, 32)` ≈ `PL_NSIZ`. Callers : `getcad`, branche déjà-en-colère de `pay_for_damage`, `wakeup`. **Branche-par-branche OK.**

### `clear_no_charge_obj` — C `shk.c:329` / JS `js/shk.js:626`
C recurse `Has_contents` → `cobj` **avant** le test `no_charge`, puis si `!shkp` **ou** `where` ∉ {FLOOR, CONTAINED, **BURIED**} **ou** localisation boutique / resident == shkp → clear.

JS recurse `cobj` d’abord (correct, y compris pour `hot_pursuit` où `shkp===null`). Omission : **`OBJ_BURIED` absent** du test `where`. Sans impact sur `hot_pursuit` (C ne marche que `fobj` + pets, pas `buriedobjlist`). D-log dit « subset » — honnête.

### `getcad` — C `shk.c:5138` / JS `js/shk.js:761`
Ordre des gardes C : `muteshk` → (`pursue \|\| uinshp \|\| !um_dist(x,y,1)`) → else shout. RNG : `ROLL_FROM(angrytexts)` = `rn2(3)` sur `{quite upset, ticked off, furious}`. JS `ANGRYTEXTS` identique.

Écarts :
- `SetVoice` omis (nommé).
- `noit_mhis` → `'his'` hardcodé (nommé).
- Chemin muteshk animal : C `yelp` ; JS `await yelp` via import dynamique — OK.

### `pay_for_damage` — C `shk.c:5174` / JS `js/shk.js:812`
Boucle `damagelist` (`when==moves && cost`), tie-break `rn2(++picks)` clang-LTR : JS copie l’ordre `inhishop` → `mdistu` → `rn2(++picks)`. **RNG de sélection de shk fidèle.**

Garde C : `if (!cost_of_damage \|\| !shkp) return;` — JS ajoute `\|\| !appear_here` (défensif ; si `shkp` est set, C a forcément set `appear_here`).

Écarts concrets :

1. **`canspotmon` vs `canseemon`.** C, après paiement :

```5322:5329:nethack-c/upstream/src/shk.c
        if (shkp->mx != sx || shkp->my != sy) {
            if (was_outside && canspotmon(shkp))
                pline("%s returns to %s shop.", Shknam(shkp),
                      noit_mhis(shkp));
            else if ((is_seen = canseemon(shkp)) == TRUE || was_seen)
                pline("%s %s.", Shknam(shkp), !was_seen ? "appears"
                                              : is_seen ? "shifts location"
                                                : "disappears");
```

JS utilise `canseemon` pour **les deux** bras. Télépathie / extrasensory : C peut dire « returns to his shop » ; JS tombe sur appears/shifts ou silence. Predicate faux, pas juste un message.

2. **Porte occupée.** C `You_hear("an angry voice:")` + `sleep(1)` + `mnearto(..., TRUE, RLOC_MSG)` (yank). JS `pline('You hear an angry voice:')` (string probablement identique) mais **`mnearto_shk_door`** = `enexto`/`rloc_to_flag` sans yank. Nommé. `sleep(1)` omis (nommé, pas de RNG).

3. Mollify : C `y_n(qbuf)` ; JS `yn_function(qbuf, 'yn', 'n')`. Défaut `'n'` peut diverger de `y_n` 3.7 si le prompt C n’injecte pas ce défaut. Suite publique peu susceptible de payer un shk.

4. Refus : C `mbodypart(HAND)` / `body_part(NECK)` ; JS `'hand'`/`'neck'` hardcodés. Nommé.

5. `adjalign(-sgn(u.ualign.type))` : JS `-(atyp>0?1:atyp<0?-1:0)` — équivalent.

Fallback `msound == null → MS_SELL` : rustine données JS, pas du C.

### Callers C vs JS

C appelle `pay_for_damage` depuis `hack.c` (chew), `dig.c` (`zap_dig` + occupation pickaxe `ruin`/`dig into`), `dokick.c`, `explode.c`, `apply.c` (break-wand dig), `zap.c` (`dobuzz` **et** `bhit` shopdoor).

Ce commit branche **chew + zap_dig + wakeup/`hot_pursuit` seulement**. D-log les nomme. Reste mort : pickaxe `is_digging`, dokick, explode, apply, `bhit`.

`still_chewing` : JS `if (dmgtxt) await pay_for_damage(...)` — si C passe une chaîne vide alors que `damagelist` a un coût, JS skip. Peu probable si `dmgtxt` n’est set que sur dégât boutique.

`wakeup` : garde C `isshk && !*u.ushops` reproduite. `ghod_hitsu` / `finish_meating` restent omis (préexistant + nommé).

## Constitution / playbook
Grep JS du commit : pas de `FORCE`/`DIAG`/`getRngLog`/`readFileSync`/`fs`/`node:`/`fastforward`. Frozen intacts. `await` = `pline`/`verbalize`/`yn_function`/`yelp`/`mnexto` — pas un deuxième `nhgetch` de gameplay. Imports dynamiques `shk.js` depuis hack/dig/mon : acycliques, OK.

Rule #2 RAS. Traces / seeds dans le contrôle : RAS.

## Densité (§2b)
**Right size.** Un cluster sémantique (facturation / poursuite après `add_damage`) ~350 LOC `shk.js` + wires des sites déjà touchés par D-0941. Pas un `if` isolé. Pas de sous-systèmes sans lien (eat/zap/kick restent dehors, correctement).

Le mélange **cadence + port** n’est pas un problème de densité, c’est un problème de process.

## Documentation
D-0942 « fixed » avec deferrals explicites (`mnearto` yank, SetVoice, sleep, dokick/explode/apply/`dig` occupation, `is_digging`). Pas « complete » au sens d’un `pay_for_damage` universel. Map `debt.md` retire le bullet et laisse les autres call sites. CURRENT/NOTES alignés sur #1210.

Overclaim léger : « Retire shop-damage pursuit debt » alors que la poursuite n’est branchée que sur chew/zap_dig/wakeup. Le D-log est plus honnête que le sujet.

## Vérification
Journal : « green+strict PASS ; shop/zap cohort 12/12 ; full sessions **44**/44 post-port ». CURRENT recopie Scr 11405 / RNG 100% / speed `31+0.26/turn`. Pas de log de commandes dans le commit — affirmation d’agent, pas un artefact de runner. Cohérent avec une cadence %5==0 collée au port.

Pas de preuve que le cohort shop/zap **exerce** `pay_for_damage` (yn mollify, `rn2(50)`, tie-break multi-shk). Fortress tenue n’implique pas que le nouveau C a été stressé.

## Callers C encore morts (preuve)

Au hash, grep C `pay_for_damage(` :

| Locus C | String | JS @2bfa043b |
|---|---|---|
| `hack.c:818` `still_chewing` | `dmgtxt` | **branché** |
| `dig.c:1752` `zap_dig` | destroy / dig into | **branché** |
| `mon.c:4359` `wakeup` | `hot_pursuit` only | **branché** |
| `dig.c:526,726,777,784,797` occupation pickaxe | ruin / dig into | **mort** (`is_digging` false) |
| `dokick.c:955` | `"break"` | mort (D-0947) |
| `explode.c:682` | burn/shatter/disintegrate/destroy | mort (D-0949) |
| `apply.c:4138` | `"dig into"` | mort |
| `zap.c:5029` `dobuzz` | burn away / … | mort (D-0948) |
| `zap.c:4130` `bhit` | `"destroy"` | mort, **toujours** après D-0949 |

Le D-log D-0942 liste « dokick/explode/apply/`dig` occupation ». Il **oublie** `bhit`. Overclaim silencieux sur le périmètre des call sites.

## `cad` / `poly_gender` / muteshk

C `cad(altusage)` : démon → `"fiend"` ; sinon `poly_gender()` 0 cad / 1 minx / 2 beast / default thing ; `altusage` → `"Cad!  "` avec majuscule. JS `cad()` + `poly_gender_shk()` local. Si `poly_gender_shk` n’est pas le `poly_gender` de `polyself.c`, le préfixe du yn « Pay? » diverge (écran). D-log : « impossible unknown gender ; mon_nam buffer reuse » — autre omission, pas celle-ci.

`getcad` muteshk + animal + `!helpless` → `yelp`. JS import `sounds.js`. Chemin rare (shk polymorphe animal). Pas de RNG hors `angrytexts`.

## `hot_pursuit` et le réseau `no_charge`

C comment : clear **tout** le sol du niveau, y compris contenants, **y compris les boutiques rivales**, parce que `shkp` est NULL. JS `clear_no_charge(null, game.fobj)` : bras `!shkp` clear immédiat après recurse `cobj`. **Correct pour fobj.** Pets : `mtame && minvent`. C `fmon` skip pas explicitement `DEADMONSTER` dans `clear_no_charge_pets` — JS `game.fmon` idem. Buried list : autre fonction C (`shk.c:421`), pas `hot_pursuit`. RAS pour ce caller.

## `uinshp` / `ushops`

C `*u.ushops != '\0'` (premier caractère). JS `u.ushops && String(u.ushops).length > 0`. Chaîne `"\0..."` impossible en JS string ; `"0"` room index serait truthy des deux côtés. OK.

Bras `uinshp` : C `um_dist(shk,1) && !um_dist(shk,3)` → leap pline + `mnexto(RLOC_NOMSG)` ; `pursue = um_dist(...,1)` ; si pursue, `getcad` return (pas de yn). JS `await mnexto`. Distance 2 tiles : leap sans pursue. **Ordre C.**

## Journal vs CURRENT

CURRENT @#1210 : 44/44, 11405 screens, 792838 RNG, speed `31+0.26/turn` R² 0.875. Journal répète. Le parent #1205 avait speed `32+0.27/turn` — le port n’est pas censé changer le score public ; un drift de label speed sans drift Scr/RNG est cosmétique. Si le runner n’a pas été relancé et que les chiffres sont recopiés, c’est une **affirmation de cadence**, pas une mesure. Rien dans le diff n’attache un log `ps_test_runner`.

## Risques / dette
1. **Callers non branchés** : `dokick` / `explode` / `apply` / pickaxe `dig` / `zap.c` `bhit` — C les a ; JS non. (Suivis en D-0947…D-0949 pour une partie ; `bhit` jamais.)
2. **`canspotmon` ≠ `canseemon`** sur le retour en boutique.
3. **`mnearto` yank** : monstre dans l’embrasure, shk mal placé, messages « Out of my way » sans déplacement C.
4. `OBJ_BURIED` / `noit_mhis` / `SetVoice` / lunge `mbodypart`.
5. Sujet sans D-id + commit hybride cadence/port : le loop confond « score refresh » et « cluster ».
6. `cad`/`poly_gender_shk` local vs `poly_gender` canonique.
7. `yn_function` défaut `'n'` vs C `y_n`.

## Extraots C / JS (sélection)

Tie-break multi-shk, identique LTR :

```5212:5221:nethack-c/upstream/src/shk.c
            if (!inhishop(tmp_shk))
                continue;
            shk_distance = mdistu(tmp_shk);
            if (shk_distance > nearest_shk)
                continue;
            if ((shk_distance == nearest_shk) && picks) {
                if (rn2(++picks))
                    continue;
            } else
                picks = 1;
```

`wakeup` C (seul bras `hot_pursuit` ajouté) :

```4356:4361:nethack-c/upstream/src/mon.c
        if (was_peaceful) {
            if (mtmp->ispriest && *in_rooms(mtmp->mx, mtmp->my, TEMPLE))
                ghod_hitsu(mtmp);
            if (mtmp->isshk && !*u.ushops)
                hot_pursuit(mtmp);
        }
```

`angrytexts` C = JS `ANGRYTEXTS` :

```139:141:nethack-c/upstream/src/shk.c
static const char *const angrytexts[] = {
    "quite upset", "ticked off", "furious"
};
```

`getcad` Deaf vs `SetVoice` (omis JS) :

```5148:5157:nethack-c/upstream/src/shk.c
    } else if (pursue || uinshp || !um_dist(x, y, 1)) {
        if (!Deaf) {
            SetVoice(shkp, 0, 80, 0);
            verbalize("How dare you %s my %s?", dmgstr,
                        dugwall ? "shop" : "door");
        } else {
            pline("%s is %s that you decided to %s %s %s!",
                    Shknam(shkp), ROLL_FROM(angrytexts),
                    dmgstr, noit_mhis(shkp), dugwall ? "shop" : "door");
```

JS `pay_for_damage` garde extra `appear_here` (C n’a que cost/shkp) : défensif. Mollify `home_shk` + `pacify_shk` : callees préexistants, non relus. `money2mon` / `check_credit` : si `check_credit` JS est incomplet, le yn « Pay? » débitera mal sans casser le RNG du `rn2(50)` précédent.

`still_chewing` wire : `if (dmgtxt) await shkMod.pay_for_damage(dmgtxt, false)` — `shkMod` déjà importé pour `add_damage` D-0941. Pas de nouvel import cycle.

`zap_dig` : `pay_for_damage(shopdoor ? 'destroy' : 'dig into', false)` après le trail — **après** `add_damage` D-0941, comme C `dig.c:1752`.

## Verdict
- Verdict : **PROCESS-SMELL**
- Note /10 : **6.5**
- Une phrase : le port `pay_for_damage` est un vrai cluster C (boucle damagelist + `rn2(++picks)`), mais le sujet sans D-id colle ça à la cadence #1210 et le JS substitue `canseemon` à `canspotmon` tout en laissant la majorité des call sites C morts.
