# Review 77 — `5a6d38f4` — mon_poly monster-defender + newcham null-mdat

## Métadonnées
- Hash complet / court : `5a6d38f458b0c2e954a57c545649397d2e8a5e56` / `5a6d38f4`
- Parent : `d00166394e4e2bf4d7f49405e77f8ac066a78a28`
- Auteur, date : Raphaël Hervier, 2026-07-22 05:50:52 +0200
- D-id : D-1006
- Stats : 12 files, +259/−45
- JS : `makemon.js` (`newcham` / `mbirth_limit`), `mhitm.js` (gros), `mhitu.js` (commentaire), `were.js` (commentaire)

## Intention vs livrable
Compléter AD_POLY sur **défenseur monstre** et autoriser `newcham(mtmp, NULL)` pour les non-cham (wands). Le diff porte `mon_poly` else-branch + `mhitm_ad_poly` m-vs-m / you-vs-mon + élargit `newcham`. Le bras **mhitu** D-1004 (héros défenseur) n’est **pas** réparé.

`newcham` vit dans `makemon.js` alors que C est `mon.c` — préexistant ; ce peel y ajoute `mbirth_limit` (C `makemon.c` : OK pour cette helper).

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/mhitm.js` | `mon_poly` defender ; `resist_poly` ; `resists_magm` local ; `mhitm_ad_poly` ; wire `mdamagem` AD_POLY |
| `js/makemon.js` | `newcham` accepte mdat null pour non-cham ; Nazgul/Erinys |
| `js/mhitu.js` | Commentaire seulement — **bug RNG D-1004 intact** |
| D-log / map | fixed + deferrals uhitm damageum, shieldeff, ANTIMAGIC, uncancel |

## Fidélité C ↔ JS

### `newcham` — `mon.c:5278+`

C si `cham == NON_PM` : riders immune ; `mbirth_limit(monsndx) < MAXMONNO` immune (Nazgul 9, Erinys 3) ; **puis** cancelled → uncancel via `pm_to_cham` si pas Protection_from_shape_changers.

Ensuite `mdat == 0` : boucle `tryct=20` `select_newcham_form` / `accept_newcham_form` ; sur Rogue, `tryct>15` exige `isupper(monsym)` sinon retry.

**Avant D-1006** JS : non-cham + `!mdat` → `return false` (rejetait toute forme aléatoire). C’est le bug nommé. **Après** : riders + mbirth_limit, puis boucle 20. **Cancelled→uncancel toujours sauté** (nommé). **Biais Rogue uppercase sauté** (nommé) : sur niveau Rogue C peut rappeler `select_newcham_form` jusqu’à 5 fois de plus → **RNG extra**.

`mbirth_limit` JS : lookup `PM_NAZGUL`/`PM_ERINYS` à chaque appel (`indexOf`) — sémantique OK, inélégant.

`newcham` JS reste **mince** après succès : `data`/`mnum`/`newmonhp` fraction HP ; C `set_mon_data`, wormgone, mimic, **leash** `m_unleash` si nouvelle forme non leashable, light, invent. Préexistant + D-1005 laisse non branchée ici. Un poly en grenouille laisse la laisse C tomber ; JS peut laisser `mleashed`.

### `resist` vs `resist_poly`

C `resist(mdef, WAND_CLASS, 0, TELL)` : alev=12 ; dlev = m_lev clamp 1..50 **sauf** `m_lev<1 && is_mplayer` → `u.ulevel` ; `rn2(100+alev-dlev) < mr` ; si resisted && tell → `shieldeff_mon` ; damage=0 donc pas de HP.

JS `resist_poly` : alev 12, dlev&lt;1 **toujours 1** (rate mplayer), `rn2` identique, TELL pline/shieldeff **sautés**. RNG du jet : presque C, **sauf** mplayer level 0.

Réimplémentation locale au lieu de `zap.js` — duplication.

### `resists_magm` local

C : `dmgtype(AD_MAGM)` / baby gray / `AD_RBRE` **puis** scan arme artefact + invent ANTIMAGIC. JS : les trois types, **pas** le scan gear (nommé). Un monstre avec cloak of magic resistance C résiste sans `rn2` ; JS tombe dans `resist_poly` → **`rn2` extra**.

`dmgtype(ptr, 1)` : AD_MAGM==1. `function dmgtype` plus bas dans le module : hoist OK.

### `mon_poly` defender — ordre C

```
resists_magm → resist(WAND,0,TELL) → !rn2(25) && cham==NON_PM && (mcan || pm_to_cham!=NON_PM) system shock
  → newcham(NULL) succès (messages + maybe tele/rloc)
  → else nothing_happens si vis && verbose
puis si data changé && magr pas you : magr.mspec_used += rnd(2)
```

JS : même cascade. System shock : `dmg += (mhpmax+1)/2` ; `mhp -= dmg` ; dmg=0 ; si mort `xkilled` / `monkilled(..., AD_RBRE)`. `Math.trunc` ≡ C int div.

`!rn2(25)` **seulement si** resists_magm et resist ont échoué — short-circuit identique.

`vis` : `_mm_vis || is_youmonst(magr) || (canspotmon && cansee)`. C `gv.vis`. Approximation. Messages `strcmpi("It", Before)` vs `Before.toLowerCase() !== 'it'` : proche.

`can_teleport(magr.data)` puis you→`tele()` else `!tele_restrict` → `rloc(RLOC_MSG)`. Ordre C.

### `mhitm_ad_poly` (nouveau) vs mhitu (ancien)

Nouveau : `negated = await mhitm_mgc_atk_negated(...) || mspec_used` **en tête** — **C**. uhitm : `!uwep && dmg < mhp`. mhitm : `dmg < mhp && !negated`. mhitu : commentaire « lives in mhitu.js ».

`mdamagem` : si AD_POLY, construit `mhm`, appelle `mhitm_ad_poly`, knockback, done/hp. Wire m-vs-m OK.

**uhitm `damageum` poly’d hero** : nommé omit. Héros en forme AD_POLY sans arme n’emprunte pas ce chemin.

**mhitu `mhitm_ad_poly_u`** : toujours `rn2(10)` **sous** le if HP, toujours **sans** `mspec_used`. D-1006 **aurait dû** le fusionner. Le commentaire mhitu retire même « uhitm/mhitm arms » des omissions — **docs qui nient le bug restant**.

### `mdamagem` AD_POLY vs C `mhitm_adtyping`
C dispatch `mattk->adtyp` vers `mhitm_ad_poly` **avant** le dégât physique générique. JS `mdamagem` : `d(damn,damd)` d’abord, puis if AD_POLY. Si C `mhitm_ad_poly` s’attend à `mhm->damage` déjà calculé, OK. Si C calcule damage **dans** adtyping seulement, double `d()` possible. `mdamagem` JS préexistait à tirer `d()` pour PHYS ; pour AD_POLY C `mhitm_ad_poly` n’ajoute pas un second `d()`. Un genetic engineer ATTK AD_POLY : damage = `d(n,d)` une fois puis poly — JS identique **si** C mdamagem fait pareil. C `mdamagem` appelle `mhitm_adtyping` après avoir posé damage. Aligné.

Knockback : JS appelle `mhitm_knockback` (qui brûle `rn2(3)`+`rn2(6)` même stub) après `mhitm_ad_poly`. C aussi knockback depuis mdamagem. Ordre : poly (resist `rn2`, maybe `rn2(25)`, maybe `newcham` RNG, maybe `rnd(2)` mspec) **puis** knockback. Si C knockback **avant** ad_poly, divergence. `uhitm.c` mhitm_ad_poly ne fait pas knockback lui-même. Risque à confirmer sur `mdamagem` C — non bloquant si le stub knockback a toujours brûlé au même endroit.

### `nothing_happens`
C `pline1(nothing_happens)` si vis && verbose && newcham fail. JS `await pline(nothing_happens)` import const. Chaîne doit matcher C « Nothing happens. » (point). Si const JS sans point, écran.

## Constitution / playbook
Grep RAS. Rule #2 OK. `newcham` élargi = changement RNG **global** (wands, autres callers), pas seulement AD_POLY — c’est **voulu** (C). Danger : Rogue retry omis. Pas de FORCE. Dynamic import `uhitm.js` `xkilled` depuis `mon_poly` : cycle mhitm↔uhitm déjà chronique.

## Densité (§2b)
**Right size.** `mon_poly` defender + `newcham` null-mdat sont le même obstacle (D-1004 deferral). `mbirth_limit` est le garde C du non-cham. Pas too-small. `resists_magm`/`resist` locaux alourdissent.

## Documentation
Sujet git : « Complete AD_POLY metamorphosis on monster defenders ». D-log plus prudent : deferred uhitm damageum, shieldeff, ANTIMAGIC gear, TELL pline, cancelled→uncancel, magic_negation monster-defender.

**Silence** sur mhitu `mhitm_ad_poly_u` (RNG). were.js : « mon_poly monster-defender via mhitm (D-1006) » — vrai pour m-vs-m, pas pour le leftover héros.

Journal #1277 green + poly/combat 15/16 ; seed0398 wandpoly PASS : exerce surtout `newcham(null)` wand, pas AD_POLY melee genetic engineer. CURRENT next whistle/saddle. NOTES Latest D-1006. Suite 43/44 @#1275.

`c-js-map/debt.md` + `turns.md` +1/−1 : trop court pour garantir que « newcham random form rejected » a disparu.

## Vérification
Green + poly/combat 15/16 ; seed0398 cité. Pas de preuve system-shock `rn2(25)`.

## Risques / dette
1. **mhitu AD_POLY RNG toujours faux** (D-1004).
2. `resists_magm` sans ANTIMAGIC → `rn2` resist en trop.
3. Rogue `select_newcham_form` retries manquants.
4. cancelled→uncancel sauté (cham cancelled reste cancelled).
5. `newcham` ne drop pas la laisse.
6. `resist_poly` mplayer `dlev`.

## Complément — `newcham` tryct et system-shock

C `newcham` mdat NULL :

```c
        tryct = 20;
        do {
            mndx = select_newcham_form(mtmp);
            mdat = accept_newcham_form(mtmp, mndx);
            if (tryct > 15 && Is_rogue_level(&u.uz)
                && mdat && !isupper(monsym(mdat)))
                mdat = 0;
            if (mdat)
                break;
        } while (--tryct > 0);
        if (!tryct)
            return 0;
```

JS : tryct 20, break si target, pas de Rogue. `if (!target) return false` vs C `if (!tryct) return 0` : si la 20e itération **réussit**, C `break` avec tryct encore &gt;0 ; JS `target` truthy break. Si 20 échecs, les deux return 0. Équivalent hors Rogue.

`select_newcham_form` / `accept_newcham_form` préexistants : D-1006 **démultiplie** leurs appels (tous les `newcham(null)` non-cham). C’est le point du peel. Un `select_newcham_form` buggé (mauvais `rn2`) était masqué par `if (!mdat) return false` JS ; maintenant il **vit** sur wands. seed0398 PASS suggère que le sélecteur est déjà assez C pour ce seed.

System-shock C : `!rn2(25) && cham==NON_PM && (mcan || pm_to_cham(data)!=NON_PM)`. JS `(mdef.cham ?? NON_PM) === NON_PM`. `cham == null` JS traité NON_PM. Un cham 0 vs LOW_PM : si 0 n’est pas NON_PM (-1), divergence. `pm_to_cham` import makemon.

Après shock : `dmg += (mhpmax+1)/2 ; mhp -= dmg ; dmg=0`. C int. JS `Math.trunc`. mhpmax impair : (n+1)/2 C trunc vers 0 pour positif. OK. `rnd(2)` mspec **après** tout le if/else, si `mdef.data !== oldform` && magr pas you. JS `mdef?.data !== oldform` référence objet. Si `newcham` remplace `data` par un nouvel objet même mndx, `!==` true — C compare pointers `mdef->data` après `set_mon_data`. JS assigne `mtmp.data = target` : nouvel objet table → toujours !== oldform si newcham success. Si newcham return true sans changer data (ne devrait pas), mspec skip. OK.

## Tableau branches (D-1006)

| Étape `mon_poly` defender | C | JS |
|---|---|---|
| resists_magm types | AD_MAGM / baby gray / AD_RBRE | identique |
| resists_magm gear ANTIMAGIC | scan invent | **omit** → resist rn2 extra |
| resist WAND_CLASS | rn2(100+12-dlev)&lt;mr | dlev mplayer faux |
| system shock | !rn2(25) && !cham && (mcan\|pm_to_cham) | identique |
| newcham NULL | 20 essais + Rogue upper | 20 essais, **pas Rogue** |
| mbirth_limit | Nazgul 9 Erinys 3 | identique |
| cancelled uncancel | oui | **omit** |
| tele follow-up | can_teleport magr | identique |
| mspec_used | rnd(2) si forme change | identique |
| mhitm_ad_poly negated | tête + mspec_used | **mhitm/uhitm oui ; mhitu non** |

`newcham` dans makemon.js reste 1:1 cassé (C `mon.c`). Préexistant.

C `newcham` tête non-cham (`mon.c:5293`) :

```5293:5306:nethack-c/upstream/src/mon.c
    if (mtmp->cham == NON_PM) {
        if (is_rider(olddata)) return 0;
        if (mbirth_limit(monsndx(olddata)) < MAXMONNO) return 0;
        if (mtmp->mcan && !Protection_from_shape_changers) {
            mtmp->cham = pm_to_cham(monsndx(mtmp->data));
            if (mtmp->cham != NON_PM) mtmp->mcan = 0;
        }
    }
```

JS D-1006 : riders + `mbirth_limit` (Nazgul/Erinys). **Pas** le bloc `mcan` → `pm_to_cham` → `mcan=0`. Un doppelgänger cancelled : C redevient cham vivant **puis** prend une forme ; JS reste cancelled et peut quand même tirer `select_newcham_form` 20 fois — ou échouer plus tôt selon d’autres gates. D-log nomme uncancel. OK.

Le `rn2(10)` mhitu D-1004 : D-1006 **corrige** le bras m-vs-m / you-vs-mon (`negated` en tête + `mspec_used`) et laisse le bras héros-défenseur dans `mhitu.js`. C n’a **qu’une** fonction `mhitm_ad_poly`. Split JS = piège : on « complete » deux bras, on oublie le troisième. Le commentaire mhitu qui retire « uhitm/mhitm arms » des omissions **efface** le leftover.

`magic_negation(mdef)` C entre dans `mhitm_mgc_atk_negated` **avant** `rn2(10)`. JS `mhitm_mgc_atk_negated` préexistant. Si `magic_negation` JS ignore l’armure du monstre, `armpro` 0 → `rn2(10) >= 0` toujours vrai → `negated` false plus souvent. D-log D-1006 nomme « magic_negation monster-defender ». Lié : `resists_magm` sans ANTIMAGIC gear pousse dans `resist_poly` (`rn2` extra) **avant** même `mhitm_ad_poly` negated.

`uhitm damageum` AD_POLY héros poly’d sans arme : C `magr == &youmonst` bras `!uwep && dmg < mhp`. JS nommé omit. Un héros genetic-engineer forme n’exerce pas `mon_poly` defender. Rare en public.

seed0398 wandpoly PASS : exerce `newcham(null)` **wand**, donc le `if (!mdat) return false` levé. N’exerce pas AD_POLY melee ni Rogue uppercase retry. La cohorte 15/16 ne couvre pas le `rn2(25)` system-shock.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7/10**
- Si je ne devais retenir qu’une critique : **lever le `if (!mdat) return` non-cham est le vrai fix C** ; laisser mhitu avec `rn2(10)` derrière le test de HP tout en titrant « complete » est un leftover D-1004 non refermé.
