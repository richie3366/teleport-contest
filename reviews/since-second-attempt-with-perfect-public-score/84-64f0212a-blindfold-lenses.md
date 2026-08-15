# Review 84 — `64f0212a` — apply BLINDFOLD/LENSES

## Métadonnées
- Hash complet / court : `64f0212ae86dde82e9e9ba529a8796818ed6d978` / `64f0212a`
- Parent : `8c50ff87671b605a1508a298fa364422a590eb78`
- Auteur, date : Raphaël Hervier, 2026-07-22 06:48:31 +0200
- D-id : D-1013
- Stats : 9 files, +83/−18 (JS +35/−3 apply, +5/−2 do_wear)
- Fichiers JS / map / cadence : `js/apply.js` wiring, `js/do_wear.js` export, absent/debt, CURRENT/NOTES/D-log, journal. Pas de cadence.

## Intention vs livrable
Promet de câbler `doapply` BLINDFOLD/LENSES sur `Blindf_on`/`Blindf_off` **déjà portés**, pour ne plus tomber sur « don't know how to use ». C’est exactement le diff : un bras à trois voies, export de `Blindf_on` + `cursed_check`. Pas de re-port des helpers. Titre juste. Pas de D-id manquant.

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/apply.js` | Port du `switch` C `case BLINDFOLD`/`LENSES` |
| `js/do_wear.js` | Export `Blindf_on`, `cursed_check` (corps inchangé sauf export) |
| `docs/c-js-map/absent.md`, `debt.md` | Retire blindfold-as-tool ; reste whip/grapple/jelly/use_stone |
| CURRENT/NOTES/D-log | D-1013 |
| journal | #1284 |

## Fidélité C ↔ JS

C `apply.c:doapply` (`res = ECMD_TIME` par défaut) :

```
case BLINDFOLD:
case LENSES:
  if (obj == ublindf) {
    if (!cursed(obj)) Blindf_off(obj);
  } else if (!ublindf) {
    Blindf_on(obj);
  } else {
    You("are already %s.",
      towel ? "covered by a towel"
      : blindfold ? "wearing a blindfold"
      : "wearing lenses");
  }
  break;
```

JS : mêmes trois voies, `return true` (TIME) y compris cursed / already-wearing. **Conforme au défaut C** (pas de `res = ECMD_OK` sur ces cases). TOWEL n’est **pas** dans ce `case` C — `use_towel` est ailleurs ; JS ne mélange pas. Message already : towel / blindfold / else lenses. Identique.

**`cursed` vs `cursed_check` :** C `do_wear.c:cursed` imprime tout de suite `You("can't. %s cursed.", They are|It is)` (une espace après le point) et gère `welded(uwep)` si `otmp==uwep`, plus Glib retry. Pour un bandeau, `otmp==uwep` est faux → seulement `otmp->cursed`. Le welded/Glib **deferred** du D-log ne s’applique pas à cet arm apply. JS : `cursed_check` pose `_cursed_takeoff_msg` (deux espaces « can't.  It ») puis apply `pline` le stash. Un message, pas deux. Écart d’espace vs C `You("can't. %s"`. Préexistant armoroff, maintenant visible sur `a` bandeau maudit.

`Blindf_on`/`Blindf_off` : pas réécrits. Omissions déjà dans do_wear (Punished `set_bc`, toggle_blindness see_monsters/Sting). D-1013 les re-liste en Deferred — honnête mais ce n’est pas de la dette **nouvelle**.

Pas de RNG dans ce bras C. JS n’en ajoute pas.

## Constitution / playbook
Grep apply/do_wear du commit : pas FORCE/DIAG/fs/fastforward/seed-contrôle. `_cursed_takeoff_msg` est un stash de chaîne, pas une trace de session. Rule #2 OK. `await Blindf_on/off` : messages + `vision_recalc`, pas un 2e nhgetch. RAS.

## Densité (§2b)
Right-sized leftover, pas too small. Playbook §2b vise le peel d’un `if` isolé **sans** famille C. Ici : omission map nommée, `switch` C complet (3 branches), helpers déjà là. +35 lignes apply. Docs-only ? Non, le stub « Sorry » disparaît pour deux otyp. Too big ? Non.

## Documentation
D-1013 fixed ; Deferred welded/Glib (peu pertinents ici) + Blindf_* préexistants + next use_stone. CURRENT next whip/grapple/jelly/use_stone. `absent.md` dit containers déjà wired — hors sujet, pas faux pour ce commit. Journal green+cohort 15/16 seed0009. Score 43/44 hérité.

## Vérification
Green+cohort. Aucun public n’applique bandeau/lentilles (sinon le stub « Sorry » aurait déjà divergé). Preuve = non-régression. Si un held-out `a` un bandeau, le TIME même si already-wearing est la chose à vérifier — C le fait.

### `cursed()` C vs export JS — textes
C `You("can't. %s cursed.", use_plural ? "They are" : "It is")` → « You can't. It is cursed. » (une espace). Lentilles : `otyp==LENSES` → pluriel « They are ». JS `use_plural = is_boots || is_gloves || otyp===LENSES || quan>1` — même critère. Bandeau singulier. `bknown=1` des deux côtés (`set_bknown` C vs assignation). Pas de RNG.

`Blindf_on` (déjà exporté ici) : `remove_worn_item` puis `setworn(W_TOOL)` puis `on_msg` puis toggle vision. Appliquer des lentilles alors qu’on est aveugle timed peut **clairer** si C `Blind()` tombe (lentilles ≠ Blindfolded). JS `Blind()` do_wear vs detect : à garder cohérent. Hors delta de ce commit (juste export).

`doapply` JS insère le bras **avant** le stub Sorry, **après** crystal ball. Ordre otyp du `switch` C n’importe pas (cases disjoints). TIME même si `cursed_check` empêche `Blindf_off` : C `break` sans changer `res=ECMD_TIME`. Un `a` sur bandeau maudit **consomme le tour** des deux côtés.

TOWEL déjà `use_towel` plus haut dans `doapply` JS (D-1009). On ne peut pas atteindre le message « covered by a towel » en appliquant un bandeau **sauf** si `ublindf` est une towel posée autrement (Blindf_on towel via autre chemin, ou wear). C same : apply TOWEL n’entre pas dans case BLINDFOLD. Le message already towel est pour `a` **lenses/blindfold** pendant qu’une towel couvre déjà. OK.

## Risques / dette
1. Message cursed deux espaces vs C une — écran si `a` bandeau cursed.
2. `Blindf_*` toggle_blindness incomplet — préexistant, maintenant joignable via apply.
3. Pas de `arti_speak` post-apply (préexistant doapply JS).
4. Suite : use_stone (D-1014) ; ne pas recâbler TOWEL ici.

## Verdict
- Verdict : ACCEPT
- Note : 8/10
- Si je ne devais retenir qu’une critique : c’est le bon « leftover » (bras C entier, pas un if orphelin) ; la seule scorie est le texte cursed à deux espaces héritée de `cursed_check`, pas une erreur d’ordre de branches.
