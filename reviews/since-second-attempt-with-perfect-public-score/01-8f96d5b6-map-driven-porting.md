# Review 01 — `8f96d5b67b1c1103ecf1b541bd1a1635f3c32f1a` — bascule map-driven post-PASS

## Métadonnées
- Hash complet / court : `8f96d5b67b1c1103ecf1b541bd1a1635f3c32f1a` / `8f96d5b6`
- Parent : `1a8b120d757437c3ad0c3a3e4cae2d5d6ffc4f95` (`origin/second-attempt-with-perfect-public-score`, ancrage exclu)
- Auteur, date : Raphaël Hervier `<richie3366@gmail.com>`, 2026-07-21 21:37:11 +0200
- D-id : **aucun** (commit de politique, pas un peel)
- Stats : 11 files, +177/−26
- Fichiers JS / map / cadence : **aucun JS**. Docs d’autorité + règles Cursor + prompt de boucle + journal. Pas de `c-js-map/*.md`.

## Intention vs livrable
Le message promet : après 44/44, traiter la suite publique locale comme **forteresse de régression** et piloter le travail depuis `c-js-map` (clusters plus denses), y compris prompt de boucle et constitution, pour que l’agent suivant n’invente pas de FAIL peels.

Le diff le fait vraiment — et plus que ça : il réécrit simultanément `CONSTITUTION.md`, `GROK-PLAYBOOK.md` §2a–2b, `PORTING-RUNBOOK.md`, `PORTING-STRATEGY.md` (phase 12), `docs/AGENT-PORT-LOOP.md`, `scripts/agent-port-loop.prompt.md`, `.cursor/rules/teleport-constitution.mdc`, `.cursor/rules/agent-notes.mdc`, `CURRENT.md`, `NOTES.md`, plus une entrée journal.

Écart : ce n’est pas « documenter un mode ». C’est un **changement d’autorité architecturale** commité `Co-authored-by: Cursor`. Le playbook **parent** (`1a8b120d`) dit déjà :

> Loop agents may **not** edit Constitution, runbook, **this playbook**, strategy.

Le livrable viole cette règle pour installer la règle suivante. Le contenu politique est le bon pivot ; le véhicule (porter/loop qui retouche les docs gelés) est le problème.

## Inventaire

| Fichier | Rôle |
|---------|------|
| `docs/CONSTITUTION.md` | Autorité — métrique post-PASS + cluster vs peel |
| `docs/GROK-PLAYBOOK.md` | Autorité — §2a forteresse, §2b densité 50–300 LOC |
| `docs/PORTING-RUNBOOK.md` | Autorité — target selection si suite PASS |
| `docs/PORTING-STRATEGY.md` | Autorité — phase 12 map-driven |
| `docs/AGENT-PORT-LOOP.md` | Ops boucle — falsifier map-driven |
| `scripts/agent-port-loop.prompt.md` | Prompt agent — mode map-driven |
| `.cursor/rules/teleport-constitution.mdc` | Règle always-on « When public suite is PASS » |
| `.cursor/rules/agent-notes.mdc` | NOTES : rappeler map-driven si PASS |
| `docs/CURRENT.md` | Objectif primaire + work picker |
| `docs/NOTES.md` | Mode + densité (51 lignes) |
| `docs/AGENT-LOOP-JOURNAL.md` | Cadence docs-only, verification n/a |

## Fidélité C ↔ JS
Sans JS. Pas de locus C. Rien à comparer à `nethack-c/upstream/src/`.

Confirmation de processus, pas de branches : le commit ne porte aucune fonction. Toute affirmation « fidèle au C » serait hors sujet.

## Constitution / playbook
Grep JS : N/A (pas de `js/`).

**Édition des docs d’autorité — non justifiée comme geste de loop-porter.** Le parent interdisait déjà à la boucle de retoucher Constitution / playbook / runbook / strategy. Ici la boucle (co-auteur Cursor) le fait quand même, en un seul commit, sur **cinq** documents d’architecture plus le prompt et deux règles Cursor.

**Justifiée comme geste humain unique ?** Oui, *si* on accepte une exception explicite « lock-in post-44/44 ». Sans cette exception écrite dans le commit, c’est un précédent : le prochain agent peut « clarifier » encore la Constitution. Le journal dit « human — document post-44/44 strategy » mais le `Co-authored-by: Cursor` et le volume (playbook +47, runbook +56) sentent l’agent qui a écrit la politique qu’il devra suivre.

**CURRENT et la chasse au leaderboard.** Le work picker est corrigé : « Do **not** chase public leaderboard / cron / `data.json` / hub CDN ». Le primary objective nomme la forteresse et `debt.md`/`absent.md`. Fuite résiduelle :

- le bloc **Score** reste le cadre visuel du fichier (44/44, 11405 écrans, liste PASS complète) — mesure de forteresse, pas un peel, mais toujours le trophée en haut de page ;
- la section rejects mentionne encore « peel “for leaderboard” » comme anti-pattern (correct, dissuasif) ;
- pas de commande `data.json` / hub dans l’objectif. **Pas de chasse active.** Fuite cosmétique, pas opérationnelle.

**NOTES ≤ 100.** 51 lignes. Caps Don’t-recheck / Landmarks respectés. Ajout utile : mode map-driven + densité + LB hors scope.

Rule #2 / frozen / fastforward / FORCE / async : RAS (pas de JS).

## Densité (§2b)
Docs-only. Pour un port JS ce serait « too small ». Ici c’est le **commit de bascule** : trop gros *en autorité* (cinq specs d’archi), trop petit *en C porté* (zéro). §2b « Docs-only then code next iter » est exactement ce que le playbook *nouveau* déconseille — ce commit l’incarne, puis dit aux suivants de ne plus le faire.

## Documentation
CURRENT : objectif unique clair (hold + map-driven). Cohérent avec NOTES.
Pas de D-id, pas de map row — correct pour une politique.
Journal : « Verification: n/a (docs only) » — honnête.
Pas d’overclaim « complete » d’un port.

Le playbook §2b installe une cible 50–300 LOC que les commits 02–08 vont tester tout de suite.

## Vérification
Aucune commande de suite. Affirmation journal seulement. Acceptable pour docs-only **si** on ne le compte pas comme itération de port. La boucle qui commit ça sous `#1201` implicite (journal 21:32, pas de numéro d’itération) mélange « human policy » et « agent iteration ».

## Risques / dette
1. **Précédent d’auto-amendement** : Constitution/playbook/runbook/strategy/prompt/rules ont bougé ensemble. Les porters suivants peuvent s’autoriser la même chose.
2. **CURRENT reste score-first visuellement** : un agent pressé lit 44/44 avant `debt.md`.
3. **Pas de garde mécanique** : le prompt dit « do not invent FAIL peels » mais rien n’empêche un peel si `CURRENT` est mal lu.
4. **§2b densité** : la consigne « denser clusters » sans garde-fou d’un reviewer pousse les commits 05/06/08 vers trop de modules.

Le runbook « After local public suite PASS » réordonne la target selection : items 1–6 (crash, scaffold, …) ne s’appliquent plus comme excuses pour chasser un delta d’écran public. C’est la pièce **opérationnelle** utile. La duplication de ce paragraphe dans Constitution + playbook + strategy + prompt + deux `.mdc` est du bruit d’autorité : une seule source (playbook §2a + CURRENT primary) suffisait ; le reste est de la gravure pour que l’agent « lise le fichier qu’il ouvre en premier ».

`NOTES.md` à 51 lignes reste sous le cap 100. Les landmarks D-0930…D-0934 et les don’t-recheck d’affichage (D-0480/D-0931) n’ont pas été purgés — ce n’est pas de la chronologie de peel, c’est encore du live. Acceptable. Le bullet « Older don't-rechecks: D-0928/NOTES archive » est un fourre-tout qui devrait déjà être dans l’archive, pas dans NOTES.

Pas de D-0942/D-0943 ici : ce commit n’ouvre pas de chaîne D. Les IDs du lot suivant commencent à D-0935.

## Verdict
- Verdict : **PROCESS-SMELL**
- Note : **6/10**
- Si je ne devais retenir qu’une critique : la bascule map-driven est la bonne politique, mais elle a été gravée en violant l’interdit parent « les agents de boucle ne réécrivent pas Constitution / playbook / runbook / strategy ».
