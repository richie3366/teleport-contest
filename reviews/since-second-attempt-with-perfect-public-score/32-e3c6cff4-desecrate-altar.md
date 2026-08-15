# Review 32 — `e3c6cff4e55fa380ef92a89f438f7b9a10eca25c` — desecrate_altar / god_zaps_you

## Métadonnées
- Hash complet / court : `e3c6cff4e55fa380ef92a89f438f7b9a10eca25c` / `e3c6cff4`
- Parent : `15a45d1c354368ff03bd9848982101e61a8a6453`
- Auteur, date : Raphaël Hervier, 2026-07-22 00:28 +0200 (Co-authored-by Cursor)
- D-id : D-0963
- Stats : 12 files, +538/−87
- Fichiers JS / map / cadence : `js/pray.js`, `js/do_wear.js`, `js/minion.js`, `js/dig.js` ; map debt/turns. Pas de cadence. **Wrath = RNG high-stakes.**

## Intention vs livrable
Promesse : porter `desecrate_altar` → `god_zaps_you` (avec `disintegrate_arm` / `summon_minion`) et brancher le creusement d’autel, au lieu de skip foudre/désintégration.

Livrable : cluster wrath + wire `digactualhole` après le message furniture. D-id présent. `angrygods` cases 4–8 **explicitement pas branchés** (D-0969 le fera). Le titre ne dit pas « angrygods complete ». C’est le bon niveau de promesse — à vérifier dans le D-log et dans le `return` après `fry_by_god`.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/pray.js` | Port `desecrate_altar` / `god_zaps_you` / `fry_by_god` ; `angrygods` inchangé (0–3) |
| `js/do_wear.js` | Port `disintegrate_arm` + `maybe_destroy_armor` / `wornarm_destroyed` |
| `js/minion.js` | Port `lminion` / `summon_minion` |
| `js/dig.js` | Wiring `heros_fault && IS_ALTAR(old_typ)` → `desecrate_altar(false, old_aligntyp)` |
| map debt/turns | D-0963 ; angrygods 4–8 + music.c restants |
| CURRENT / NOTES / D-log / journal | Docs ; green+dig/pray 16/16 (seed0017 cité) |

## Fidélité C ↔ JS

### `desecrate_altar`
- Locus C : `pray.c:desecrate_altar` (1501)
- Locus JS : `pray.js:desecrate_altar` (export)
- Si `altaralign == ualign.type` : `adjalign(-20)`, `ugangr += 5`. Air charged ; notice `align_gname` ; `godvoice` High Temple vs altar ; `god_zaps_you(altaralign)`. Pas de RNG propre. Match. Callers C hors dig (`a_convert`, offer, music) non branchés — music nommé.

### `god_zaps_you` — foudre
- Locus C : `pray.c:god_zaps_you` (610)
- Locus JS : `pray.js:god_zaps_you`
- Swallow : bolt frappe `ustuck` ; `!resists_elec` → fry + `xkilled(NOMSG|NOCONDUCT)` else unaffected. JS ajoute `&& u.ustuck` (défensif).
- Non-swallow : « strikes you » ; `Reflecting` → shieldeff omis, Blind unaffect vs `ureflects`, `monstseesu(M_SEEN_REFL)` ; else `Shock_resistance` → unaffect, `monstseesu(ELEC)` + `monstunseesu(REFL)` ; else `fry_by_god(..., FALSE)` + `monstunseesu(REFL|ELEC)`.
- C `Reflecting` = `H \|\| E` (`youprop.h`). JS ajoute SoR/AoR worn — redondant si `setworn` pose déjà `EReflecting`, pas un manque.
- `ureflects` JS : **bouclier seulement** (nommé). C `muse.c ureflects` couvre d’autres slots.

### `god_zaps_you` — **early `return` après fry (écart)**
C, après le bras foudre, **pas de return** :

```c
        } else {
            fry_by_god(resp_god, FALSE);
            monstunseesu(M_SEEN_REFL | M_SEEN_ELEC);
        }
    }
    pline("%s is not deterred...", align_gname(resp_god));
    /* disintegration + maybe 3× summon_minion on astral/sanctum */
```

`done(DIED)` peut **revenir** (lifesave / explore). C enchaîne désintégration et, sur astral/sanctum, **trois** `summon_minion` même après friture.

JS :

```javascript
        } else {
            await fry_by_god(resp_god, false);
            monstunseesu(M_SEEN_REFL | M_SEEN_ELEC);
            return;
        }
```

Même `return` après fry désintégration, **avant** le test astral/sanctum. C :

```c
        if (!Disint_resistance) {
            fry_by_god(resp_god, TRUE);
            monstunseesu(M_SEEN_DISINT);
        } else { bask; godvoice; monstseesu(DISINT); }
        if (Is_astralevel(&u.uz) || Is_sanctum(&u.uz)) {
            summon_minion × 3;
        }
```

JS met le `if (astral \|\| sanctum)` **dans** le else Disint, et `return` dans le if fry. Conséquences :
1. Lifesave foudre : pas de beam, pas de minions.
2. Lifesave désintégration sur astral/sanctum : pas de 3 minions (C les invoque quand même).

Non nommé dans le D-log. High-stakes.

### Désintégration / armure
Ordre C : `uarms` puis `uarmc` puis `uarm` si `!uarmc` puis `uarmu` si `!uarm && !uarmc`, gardes `EReflecting`/`EDisint` par slot. JS identique. `disintegrate_arm` → `obj_resists(armor, 0, 90)` dans `maybe_destroy_armor` (assignment dans la condition, comme C). Chaîne else-if cloak→suit→shirt→helm→gloves→boots→shield. Match. `end_burn` / `selftouch` / `cancel_don` nommés omis. `invent_useup` local ≠ `useup` C (quan/invent splice seulement).

### `summon_minion` / `lminion`
- Locus C : `minion.c:summon_minion` (198) / `lminion` (429)
- Lawful `lminion` : 20× `mkclass(S_ANGEL)` skip lords. JS `mkclass('S_ANGEL', 0)` + `is_lord`. Match de structure (RNG `mkclass` interne).
- Neutral : C `ROLL_FROM(elementals)` (4) ; JS `ELEMENTALS[rn2(4)]`. Match.
- Chaotic/A_NONE : `ndemon(alignment)`. Default C `impossible` puis `ndemon(A_NONE)` ; JS skip impossible.
- `makemon` MM_EMIN vs MM_NOMSG pour shop/guard/cleric. `isminion` + EMIN align/renegade. `talk` path : voice / Deaf You_feel / verbalize / Amonnam (helper local présent dans le fichier). `mpeaceful=false`, pas `set_malign`. `SetVoice` omis, nommé.

### `angrygods`
Toujours cases 0–3 + tail `rnz(300)` dans ce commit. Commentaire JS : « Cases 4+ named omitted — god_zaps_you available for dig desecrate_altar but not yet wired into this switch. » **Honnête.** C `default:` appelle `god_zaps_you` ; JS ne le fait pas encore → D-0969.

### Wiring `digactualhole`
C : après furniture-fall, `if (heros_fault && old_typ == ALTAR) desecrate_altar(FALSE, old_aligntyp)`. JS `IS_ALTAR(old_typ)` (`=== ALTAR`). `dighole` garde encore « altar too hard » — comme C : le wrath n’est pas le pick-down sur autel, c’est `digactualhole` quand `old_typ` était ALTAR (wand/autre).

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/fs/fastforward. Frozen OK. `await` = pline/verbalize/`done`/`disintegrate_arm`/`summon_minion`. RAS Rule #2. Densité haute mais un seul thème (wrath).

## Densité (§2b)
**Right size, bord haut** (+538). Famille caller/callee : desecrate → zap → fry/disintegrate/summon. Pas too small. 12 fichiers dont docs : acceptable pour un cluster wrath. Pas de mix cadence.

## Documentation
- D-0963 **fixed**. Deferred listé : **angrygods cases 4–8** ; music.c ; shieldeff ; SetVoice ; ureflects non-shield ; selftouch ; cancel_don.
- **Honnêteté angrygods : oui.** Le D-log ne vend pas cases 4–8. CURRENT next-cluster les met en file. D-0969 confirmera plus tard.
- **Trou :** le `return` post-`fry_by_god` (lifesave / 3 minions astral) n’est pas dans Deferred. C’est un overclaim partiel de « `god_zaps_you` porté ».
- Journal : green+dig/pray 16/16 « incl. seed0017 altar-pray » — prie, ne **creuse** pas un autel. La fortress ne falsifie pas `god_zaps_you`.

## Vérification
Affirmation + seed0017 (pray, pas dig-desecrate). Pas de full sessions. Preuve : non-régression, pas wrath. seed0361 « arch tour » dans le D-log n’est pas un creusement d’autel. Le cohort dig/pray 16/16 peut passer `angrygods` 0–3 (déjà là) sans jamais entrer dans `god_zaps_you`. D-0969 portera cases 4–8 : ce commit a raison de ne pas les vendre.

## Preuves C (extraits)

`desecrate_altar` — zéro RNG, grudge puis zap :

```c
if (altaralign == u.ualign.type) {
    adjalign(-20);
    u.ugangr += 5;
}
You_feel("the air around you grow charged...");
pline("Suddenly, you realize that %s has noticed you...",
      align_gname(altaralign));
Sprintf(gvbuf, "So, mortal!  You dare desecrate my %s!",
        highaltar ? "High Temple" : "altar");
godvoice(altaralign, gvbuf);
god_zaps_you(altaralign);
```

JS await les plines, même `highaltar` string, `god_zaps_you(altaralign)` pas `u.ualign`. Match. `align_gname(game.urole, altaralign)` : signature JS à deux args vs C un arg — préexistant `roles.js`.

Foudre C **sans return** après `fry_by_god` : `done(DIED)` lifesave revient dans `god_zaps_you`, enchaîne « is not deterred » + beam. JS `return` après fry foudre **et** après fry disint. Sur astral/sanctum C :

```c
if (Is_astralevel(&u.uz) || Is_sanctum(&u.uz)) {
    verbalize("Thou cannot escape my wrath, mortal!");
    summon_minion(resp_god, FALSE);
    summon_minion(resp_god, FALSE);
    summon_minion(resp_god, FALSE);
    verbalize("Destroy %s, my servants!", uhim());
}
```

Ce bloc est **hors** du `if (!Disint_resistance)` C (après le if/else bask). JS le range dans le else Disint (survie). Donc :
- C + Disint : bask + 3 minions si astral.
- C − Disint + lifesave : fry + 3 minions si astral.
- JS + Disint : bask + 3 minions si astral (OK).
- JS − Disint : fry + `return` — **0 minion** même lifesave astral.

`obj_resists(armor, 0, 90)` : 90% destroy chance (C `maybe_destroy_armor`). Chaîne else-if : un seul slot détruit par appel, mais `god_zaps_you` appelle `disintegrate_arm` **jusqu’à 4 fois** (shield, cloak, suit, shirt) avec gardes E-bits. Chaque appel peut tirer `obj_resists`. JS même structure. High-stakes : un mismatch `obj_resists` décale tout le reste du zap.

`lminion` : 20 essais `mkclass(S_ANGEL)`. Chaque essai = RNG mkclass. Neutral `rn2(4)` sur elementals. `summon_minion` ×3 sur astral = 3× (lminion|rn2|ndemon + makemon). Couper ce chemin après fry n’est pas cosmétique.

`angrygods` C `switch (rn2(maxanger))` cases 4–5 rndcurse, 6 punish, 7–8 minion, default `god_zaps_you`. JS ce commit : encore 0–3 seulement. Commentaire fonction + D-log + CURRENT next-cluster : **trois fois** « cases 4–8 omitted ». C’est de l’honnêteté, pas un oubli. Ne pas confondre avec `god_zaps_you` lui-même (porté, wire dig seulement).

## `disintegrate_arm` détails
C `urgent_pline` + `cloak_simple_name` / `suit_simple_name` / `shirt_simple_name` / `helm_simple_name` / `gloves_simple_name` / `boots_simple_name` / `shield_simple_name`. JS `armor_doff_simple_name` générique + shirt en dur « shirt ». Suit : C `vtense` + `surface(u.ux,u.uy)` ; JS `vtense` + « ground » (pas `surface`). Nommé « name polish ». `losing_gloves` → C `selftouch("You")` ; JS `void losing_gloves`. Un grotton/cockatrice en main après gants désintégrés : C touche, JS non.

## Questions ouvertes
1. `done(DIED)` JS revient-il après lifesave comme C ? Si JS `done` ne revient jamais, le `return` est mort et l’écart lifesave est théorique. Si `done` revient, l’écart est réel.
2. `Is_sanctum` JS compare `game.sanctum_level` — ce champ est-il posé ?
3. `Reflecting()` JS extra SoR/AoR : si `EReflecting` n’est pas à jour, JS est plus généreux (survie foudre) → **skip fry** → pas de `return` → continue beam. Ça peut masquer un bug setworn **ou** sauver le héros que C frite.
4. `music.c` desecrate (instrument) : nommé, pas ce cluster.

## Risques / dette
1. **`return` après fry** : lifesave + astral/sanctum ≠ C (3 `summon_minion` manquants). Non nommé. RNG/minion high-stakes.
2. `angrygods` default ne call pas encore `god_zaps_you` — **nommé**, D-0969.
3. `ureflects` shield-only ; `shieldeff` absent (nommés, moins graves).
4. `obj_resists(0,90)` : si `disintegrate_arm` JS n’est pas 1:1 sur le roll, chaque autel décale le flux. À recoller sur `dogmove.js` (hors ce diff).
5. Callers music.c / convert encore deferred.
6. `invent_useup` local vs `useup` : stacks d’armure (rare) mal consommés.

## Cohérence D-log / map (angrygods)
Consigne de mission : « Check angrygods completeness (later D-0969 continues cases 4–8 — so this commit's god_zaps_you may be partial ; D-log honesty). »

Constat : **angrygods n’est pas vendu complete**. D-0963 Deferred ouvre par « angrygods cases 4–8 ». CURRENT next-cluster : « angrygods cases 4–8 / music desecrate caller ». Commentaire JS `angrygods` : « god_zaps_you available for dig desecrate_altar (D-0963) but not yet wired into this switch ». Trois couches, même message. Index D-0963 : « desecrate_altar / god_zaps_you dig wrath » — le mot **dig** borne le claim.

`god_zaps_you` est vendu porté. Le `return` post-fry n’est pas dans Deferred. C’est le seul overclaim : fonction exportée comme envelope C, control-flow lifesave/astral différent. Pas un mensonge angrygods.

`do_wear.js` dans ce commit n’est pas un 2ᵉ cluster wear : c’est le callee `disintegrate_arm` de `god_zaps_you`. Densité §2b : famille, pas too wide. 12 files / +538 : haut de fourchette, un thème.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **6.5/10**
- Si je ne devais retenir qu’une critique : angrygods 4–8 est honnêtement laissé à D-0969, mais `god_zaps_you` n’est pas le C dès qu’on survit à `fry_by_god` — le `return` JS coupe beam et minions que C enchaîne.
