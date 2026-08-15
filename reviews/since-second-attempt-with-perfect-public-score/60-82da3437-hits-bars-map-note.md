# Review 60 — `82da3437` — note map hits_bars sur la ligne dokick

## Métadonnées
- Hash complet / court : `82da3437e1530483035b35e9a27f15b319b00bdc` / `82da3437`
- Parent : `bb98ff89bfad2de5f233719a038bca976907f08f`
- Auteur, date : Raphaël Hervier, 2026-07-22 03:47:58 +0200
- D-id : aucun (note D-0990 déjà ouvert au parent)
- Stats : 1 file, +1/−1
- Fichiers JS / map / cadence : `docs/c-js-map/turns.md` uniquement ; pas de JS ; 10 secondes après #1260

## Intention vs livrable
Message : « Note D-0990 hits_bars retirement on dokick turns map row. » Le diff est **une ligne** dans le tableau `src/dokick.c` : l’omission `hits_bars` est retirée de la parenthèse D-0989 et absorbée dans le récit D-0990.

C’est exactement le reliquat du commit 59, qui avait déjà touché `turns.md` (+4/−) sans corriger cette phrase. Pas de port, pas de test, pas de D-id nouveau.

## Inventaire
| Fichier | Rôle |
|---|---|
| `docs/c-js-map/turns.md` | Docs : une substitution dans la row dokick |

Pas de JS, pas de D-INDEX, pas de CURRENT, pas de journal.

## Fidélité C ↔ JS
Aucune fonction JS ajoutée ou modifiée. Rien à comparer à `nethack-c/upstream/src/`.

Le texte résultant (extrait) affirme que `kick_object`+`bhit` (D-0988), Is_box/`ghitm` (D-0989) sont portés, et que `hits_bars` l’est via D-0990, avec petrify/tmp_at/costly_gold encore deferred. C’est cohérent avec l’état **après** 59, pas une information nouvelle. Pas d’omission restante nouvellement nommée : costly_gold attendait déjà D-0991.

## Constitution / playbook
Pas de JS donc pas de Rule #2 / FORCE / frozen. Playbook §2b : un commit docs-only d’une ligne après un cluster **n’est pas** une itération. C’est du bruit git pour rattraper une map mal éditée sous pression cadence.

Interdit de « empty hold-green-only iters » dans NOTES — ici ce n’est même pas un hold-green : c’est un typo-fix de documentation éclaté hors du hash qui aurait dû le porter.

## Densité (§2b)
**Too small.** Un `if` isolé / docs-only déguisé. Pire : ce n’est pas déguisé, c’est avoué. La retraite `hits_bars` appartenait au commit 59 (`bb98ff89`). La séparer 10 secondes plus tard (`03:47:48` → `03:47:58`) gaspille un slot d’itération agentique et un numéro de review.

## Documentation
CURRENT / NOTES / D-log / journal : **non mis à jour** (correct : rien n’a changé). La map seule bouge. Honnêteté du contenu : OK. Processus : la map du 59 était incomplète ; ce commit le prouve.

Pas de D-id : bon (pas d’overclaim « D-0990b complete »).

Le parent `bb98ff89` a déjà modifié `docs/c-js-map/turns.md` (+4/−1 sur la row, plus d’autres lignes). La row `src/dokick.c` y disait encore, après D-0990 :

`Is_box … + ghitm` (D-0989 ; costly_gold, hits_bars, barefoot petrify, tmp_at flash deferred)

Le 60 remplace ça par une formulation où `hits_bars` est retiré de la parenthèse deferred et attribué à D-0990. `costly_gold` reste deferred (vrai jusqu’à D-0991). Donc le 60 n’invente pas de retraite : il **aligne** le texte sur le JS déjà mergé.

Pourquoi un hash séparé ? Horodatage `03:47:48` (59) vs `03:47:58` (60). Boucle agent : le port+cadence a été commité, puis un re-read de la map a trouvé la phrase stale, second `git commit` sans JS. Playbook §2b + NOTES « empty hold-green → stop » : ce n’est même pas un hold-green, c’est un **fixup docs hors cluster**.

Comparer aux autres commits de cette série : 57–59, 61–64 touchent JS+D-log+CURRENT+NOTES+journal. 60 ne touche **que** `turns.md`. Incohérence documentaire : un reviewer qui ne lit que D-INDEX croit que D-0990 s’arrête à 59 ; la map dokick mentait 10 secondes.

## Vérification
Aucune commande. Aucune preuve. Fortress non concernée. Si #1270 casse plus tard à 43/44, ce hash est hors-cause.

## Risques / dette
1. Culture peel : encourage les commits « une ligne de map » après cluster.
2. Historique git : `git log -S hits_bars -- docs/c-js-map/turns.md` split 59/60 pour une même retraite.
3. Aucune dette C. `costly_gold` reste le next cluster réel (D-0991).
4. Si un agent ultérieur « re-retire » hits_bars sur cette row, blame 60 vs 59 — friction.
5. Pas de test : impossible de casser la fortress, impossible de la prouver.

## Questions ouvertes
- La row `turns.md` dokick après 59 avait-elle d’autres stale (ghitm/hits_bars/costly_gold) déjà corrigés dans `absent.md`/`debt.md` du 59 ? Si `debt.md` 59 disait déjà hits_bars porté, la row turns était le **seul** oubli — encore moins justifié comme commit solo.
- Politique repo : les fixups map 1-ligne doivent-ils être `--amend` du cluster (interdit à l’agent s’il a déjà continué) ou squash humain ?

### Contenu exact du delta
Une substitution dans une cellule markdown déjà longue (objnam/invent/dokick partagent le fichier). Le hunk ne touche pas les rows `objnam`/`invent`/`hack` — uniquement la row `src/dokick.c`. Pas de changement de statut `partial`. Pas de nouvelle omission nommée (petrify/tmp_at/costly_gold déjà là).

Co-authored-by Cursor : même signature que les peels JS. Un humain n’aurait pas isolé ça. L’agent loop a traité « map stale » comme une itération.

Si on appliquait §2b strictement, ce hash devrait être squashé dans `bb98ff89`. Reviewer : PROCESS-SMELL, pas QUALITY-RISK (zéro JS).

Verdict de densité playbook : **too-small peel**, docs-only, 10 s après le cluster. Note volontairement basse pour décourager le pattern. Pas CONSTITUTION-RISK.

Le fichier `00-RUBRIQUE.md` : PROCESS-SMELL = « Docs/cadence/process ; peu de JS, ou mélange score+port ». Cas d’école « peu de JS ».

Pas de questions C↔JS : zéro fonction. La seule question process est close : trop petit, squash manquant.

## Verdict
- Verdict : PROCESS-SMELL
- Note : 3/10
- Si je ne devais retenir qu’une critique : une ligne de `turns.md` n’est pas un peel — c’est le reste mal rangé du mélange cadence+port `bb98ff89`.
