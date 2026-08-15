# Rubrique — review commit par commit

Ancrage exclu : `origin/second-attempt-with-perfect-public-score`
(`1a8b120d757437c3ad0c3a3e4cae2d5d6ffc4f95`).
Périmètre : `1a8b120d..HEAD` (86 commits). Les commits antérieurs à
l’ancrage ne sont **pas** reviewés.

## Fichiers

Un fichier `NN-HASH-slug.md` par commit (NN = 01…86, HASH = 8 hex).
Ce document est la grille commune.

## Verdicts

| Verdict | Sens |
|---------|------|
| **ACCEPT** | Fidèle C, docs honnêtes, fortress tenue, cluster de bonne densité |
| **ACCEPT-WITH-DEBT** | Livrable utile mais omissions mal nommées, stubs, ou overclaim |
| **PROCESS-SMELL** | Docs/cadence/process ; peu de JS, ou mélange score+port |
| **QUALITY-RISK** | Partial vendu comme cluster, C mal lu, densité hors §2b |
| **CONSTITUTION-RISK** | Trace-hardcode, FORCE/DIAG, Rule #2, fastforward add, frozen, async hors nhgetch |

## Grille (chaque review doit remplir)

1. Métadonnées (hash, parent, auteur, date, D-id, stats)
2. Intention déclarée vs livrable réel
3. Inventaire des fichiers (js / map / divergence / cadence)
4. Fidélité C↔JS : fonctions, ordre des `if`, RNG, callers, stubs
5. Constitution / playbook (bans, Rule #2, fastforward, traces)
6. Densité du cluster (playbook §2b)
7. Documentation (CURRENT, NOTES, map, D-log, journal)
8. Vérification citée vs preuve (focused / green / cohort / cadence)
9. Risques et dettes laissées
10. Verdict + note /10 + questions ouvertes
