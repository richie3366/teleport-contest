# Review 49 — `835f5ad9` — Restore timeout `objects_at` + cadence #1250

## Métadonnées
- Hash complet / court : `835f5ad93860daf834d440dff479992b62d002ad` / `835f5ad9`
- Parent : `dbd0f7d099f93b3dd1ea7496b63a21cb663b0433`
- Auteur, date : Raphaël Hervier, 2026-07-22 02:12:32 +0200
- D-id : **D-0980**
- Stats : 8 files, +74/−39
- Fichiers JS / map / cadence : `js/timeout.js` (1 ligne d’import) ; `docs/c-js-map/turns.md` ; CURRENT / NOTES / D-INDEX / D-LOG ; journal + rotation #1250
- Mixte cadence+JS : cible 180–350 (pas 80–160 cadence pur)
- Parent JS : D-0978 `ef29ee55` (ignite/burn) a réécrit l’import `mkobj.js`
- Green gate peut passer sans FUMBLING : le throw n’apparaît qu’en `sessions` (seed0014)

## Intention vs livrable
Le message promet deux choses collées : **restaurer** l’import `objects_at` dans `timeout.js` (chute D-0978 → `ReferenceError` seed0014) **et** rafraîchir le score cadence #1250.

Le diff JS est exactement ça : une virgule et un identifiant sur l’import `mkobj.js`. Le reste est docs + rotation journal. Oui, c’est un **bugfix de retombée D-0978**, pas un cluster map-driven. Le D-log le dit honnêtement (« fortress regression from D-0978 »). Le process, lui, mélange cadence obligatoire et rustine 1-ligne dans le même commit.

Réponse à la question de mission : **oui**, bugfix D-0978 fallout. Axe dominant : **PROCESS** (mélange cadence + D-id de cluster), pas QUALITY (le C n’est pas mal lu). CONSTITUTION : RAS après grep JS.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/timeout.js` | Port C : non. Wiring : re-export manquant (`objects_at`). |
| `docs/c-js-map/turns.md` | Docs (note slip_or_trip / objects_at) |
| `docs/CURRENT.md` | Score #1250 + keep D-0980 + consigne import |
| `docs/NOTES.md` | Hypothèse fermée (throw seed0014) |
| `docs/DIVERGENCE-INDEX.md` | D-0980 row |
| `docs/DIVERGENCE-LOG.md` | Cause D-0978, 42/44 → 43/44 |
| `docs/AGENT-LOOP-JOURNAL.md` + archive iter1250 | Cadence + récit du throw |

Stats docs ≫ JS : signature d’un commit cadence qui a avalé une rustine. Le journal rotate `iter1250` n’est pas de l’autorité de port ; il ne prouve pas l’import isolément.

## Fidélité C ↔ JS
**Locus C :** `nethack-c/upstream/src/timeout.c` `slip_or_trip` — parcours `level.objects[u.ux][u.uy]` (pile d’objets au pied du héros).

**Locus JS :** `js/timeout.js` `slip_or_trip` — `objects_at(u.ux, u.uy)` déjà appelé ; l’identifiant n’était plus importé.

```117:121:js/timeout.js
async function slip_or_trip() {
    const u = game.u || {};
    const on_foot = !u.usteed;
    let otmp = objects_at(u.ux | 0, u.uy | 0);
```

Sans l’import, tout appel FUMBLING → `slip_or_trip` lève `ReferenceError` (seed0014 Scr 0/714 d’après le D-log). Le correctif rétablit le binding ; **aucun** corps C n’est porté ici. Pas de RNG, pas de branche, pas de caller nouveau. Un `ReferenceError` n’est pas une divergence d’écran : RNG log 0/59178 confirme l’abort avant le premier `rn2` du bras ice/`rn2(4)`.

Écart concret : D-0978 a réécrit l’import `mkobj.js` pour `ignite_items` / `catch_lit` / `begin_burn` et a **lâché** `objects_at` alors que `slip_or_trip` (D-0692) s’en sert toujours. Ce n’est pas une divergence C↔JS de sémantique ; c’est une régression d’hygiène d’import. Le C n’a jamais cessé d’accéder à la pile d’objets. ESM n’a pas de `ReferenceError` à l’import-time pour un identifiant utilisé plus bas — seulement à l’exécution de `slip_or_trip`.

Confirmation branch-par-branch : N/A — zéro branche ajoutée. La fonction JS existante reste celle d’avant ; seul le module scope redevient valide. Un test `typeof objects_at === 'function'` n’existe pas ; la preuve est seed0014 PASS après restore.

**Locus C pile d’objets** (`timeout.c` `slip_or_trip`, juste avant le trip-over) :

```c
    otmp = svl.level.objects[u.ux][u.uy];
    if (otmp && on_foot && !u.uinwater
        /* There's no need to check for lava since it only burns flying and
           levitating objects, not those on the ground. */
        && is_pool(u.ux, u.uy))
        otmp = 0;
```

JS mappe ça sur `objects_at(u.ux, u.uy)` puis le même filtre pool. C’est **le** binding cassé. Après restauration, le bras trip-over C (pronoun / `doname` / rocks / Hallu bite / corpse petrify) reste celui déjà porté (ou partiel) — **hors** ce commit.

Bras ice C (`timeout.c:1262`) :

```c
    } else if ((HFumbling & FROMOUTSIDE) || (is_ice(u.ux, u.uy) && !rn2(3))) {
        ...
        vtense(..., rn2(2) ? "slip" : "slide"),
        ...
        if (!on_foot && ... && (!ice_only || !rn2(3)))
            dismount_steed(DISMOUNT_FELL);
        else if (!rn2(10 + ACURR(A_DEX))) {
            if (!NODIAG(u.umonnum)) confdir(TRUE);
            if (u.ux + u.dx != u.ux0 || u.uy + u.dy != u.uy0)
                hurtle(u.dx, u.dy, 1, FALSE);
        }
```

Ce commit **n’y touche pas**. Si JS omet `hurtle`/`dismount`, ce n’est pas D-0980. D-0980 = uniquement « `objects_at` existe dans le scope ».

Callers C de `slip_or_trip` : uniquement `nh_timeout` propriété FUMBLING. Callers JS : identique. `objects_at` est aussi importé par `zap.js` / `dokick.js` — leurs imports n’ont pas été cassés par D-0978.


### Cadence #1250 collée (preuve)

CURRENT de ce hash affirme 43/44 Scr 11404/11405 après restore. Le D-log dit aussi 42/44 *pendant* le trou D-0978. Deux mesures, un seul commit : on ne peut pas extraire le delta « cadence reconfirm seule » vs « +import ». Le journal archive `iter1250` tourne avec le JS déjà patché.

Green gate : `slip_or_trip` n’est touché que si FUMBLING expire. Un green 16/16 peut passer **sans** jamais appeler `objects_at` dans `timeout.js`. D’où le throw seulement en full `sessions` (seed0014). Process : le green n’est pas un filet d’imports.

### Ce que D-0978 a réellement cassé

Diff d’import `timeout.js` parent vs ce hash : une virgule + `objects_at`. Les autres symboles D-0978 (`start_timer`, `LS_OBJECT`, `BURN_OBJECT`, `obj_extract_self`, `delobj`) restent. Pas d’autre `ReferenceError` documenté. L’audit « autres fichiers D-0978 » n’est pas dans ce commit — NOTES/CURRENT ajoutent seulement la consigne timeout.

RNG : zéro appel ajouté ou déplacé. Un throw avant `rn2` n’est pas une divergence de flux ; après fix, le flux `slip_or_trip` redevient celui d’avant D-0978 (partiel ice/mount déjà nommé).

## Constitution / playbook
Grep `git show 835f5ad9 -- js/` : aucune occurrence de `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `from 'fs'`, `node:`, `fastforward`. Aucune coordonnée ni nom de seed dans le JS (seed0014 n’apparaît que dans docs/journal). Frozen `isaac64.js` / `terminal.js` / `storage.js` intacts. Pas d’entrée `js/fastforward.js`. Pas de filet d’alignement / sparse frames. Rule #2 : l’import `objects_at` vient de `mkobj.js` ESM, pas d’un builtin Node.

Anti-pattern playbook : peel « hold green » ? Non — seed0014 était un throw réel. Anti-pattern réel : **cadence collée à un hotfix 1-ligne**. Le score #1250 n’est pas la preuve du binding (le focused seed0014 l’est). Un `eslint no-undef` aurait rendu D-0980 inutile.

Pas de nouvel `await`. Modules 1:1 : N/A (pas de fonction portée).

## Densité (§2b)
**Too small.** Une ligne d’import n’est pas un cluster map-driven. Acceptable comme hotfix fortress **séparé**. Inacceptable comme itération « D-0980 » fusionnée à #1250. Le volume docs (CURRENT keep-list, NOTES, journal, rotation iter1250) dépasse largement le JS — signature d’un commit cadence qui a absorbé une rustine.

## Documentation
D-0980 est **honnête** sur la cause (drop d’import D-0978) et le symptôme (throw seed0014, suite 42/44 → 43/44). Map `turns.md` annote `objects_at` pour `slip_or_trip`. CURRENT ajoute « do not drop `objects_at` from timeout mkobj import » — pansement process, pas une garde outillage.

Overclaim : aucun « complete ». Sous-claim : pas d’audit des *autres* identifiants D-0978. Journal : green+strict + full suite 43/44 ; seed0009 Scr 72/73 préexistant. CURRENT « Cadence reconfirm + D-0980 restore » fusionne deux preuves. Ambigu si la suite a tourné *après* l’import seul.

## Vérification
Cités : green+strict PASS ; `sessions` **43**/44 Scr **11404**/11405 RNG 100 % ; seed0014 PASS. Preuve **affirmée** journal, pas de transcript de commande. Pour un `ReferenceError`, seed0014 + green suffisent ; la cadence était due @#1250 de toute façon. Fortress ultérieure #1270 = 43/44 (seed0009) — **pas** une régression D-0980.

## PROCESS vs QUALITY (question de mission)
- **QUALITY du JS :** le fix est correct, 1:1 avec le besoin C, zéro branche inventée.
- **PROCESS :** (1) D-0978 n’a pas greppé les identifiants restants ; (2) D-0980 numérote une rustine comme un cluster ; (3) cadence #1250 et hotfix partagent le hash.
Verdict PROCESS-SMELL plutôt que QUALITY-RISK : le C n’est pas mal lu.

## Callers
`slip_or_trip` ← `nh_timeout` FUMBLING (D-0692). Aucun nouveau caller. `objects_at` ailleurs (`zap`, `dokick`) via leurs propres imports — seul `timeout.js` était cassé.

## Risques / dette
1. Toute réécriture d’import « pour un helper C » peut re-casser un caller déjà porté. `eslint no-undef` aurait suffi.
2. Score #1250 indissociable du fix. CURRENT « Cadence reconfirm + D-0980 » dans la même phrase.
3. Autres fichiers D-0978 non audités ici.
4. Corps `slip_or_trip` toujours partiel (dismount / `hurtle` / `confdir`) — hors scope.
5. Suite map D-0981 opening/SPE_KNOCK — NEXT journal cohérent.

## Questions ouvertes
- Le `ReferenceError` seed0014 a-t-il sauté le green gate (timeout rarement touché) ?
- Combien d’imports D-09xx ont été « nettoyés » à l’aveugle ?

## Détail `slip_or_trip` (pourquoi l’import n’est pas cosmétique)
**C** `timeout.c` `slip_or_trip` : si le héros est à pied, le premier objet de `level.objects[u.ux][u.uy]` sert au message « You trip over … » ; un pool sous les pieds annule la pile ; ice / `FROMOUTSIDE` tirent `rn2(3)` puis `rn2(2)` slip/slide ; à pied un `rn2(4)` switch. JS :

```117:153:js/timeout.js
async function slip_or_trip() {
    const u = game.u || {};
    const on_foot = !u.usteed;
    let otmp = objects_at(u.ux | 0, u.uy | 0);
    if (otmp && on_foot && !u.uinwater && is_pool(u.ux | 0, u.uy | 0)) {
        otmp = null;
    }
    // ... trip-over / ice / rn2(4) ...
```

`objects_at` **est** le `level.objects[][]` C. Sans binding, FUMBLING (`nh_timeout` → `slip_or_trip`) explose avant tout `rn2`. D-log : seed0014 Scr 0/714 RNG 0/59178 — un throw, pas un mismatch d’écran. Fortress 43/44 → 42/44 le temps du trou.

Parent `dbd0f7d0` / D-0978 :

```js
import { run_timers, start_timer, stop_timer, weight,
    obj_extract_self, delobj } from './mkobj.js';
```

D-0978 a ajouté burn/light (`start_timer`, `LS_OBJECT`, …) et a **réécrit** la liste d’import. `objects_at` n’était plus « unused » au linter ESM (utilisé plus bas dans le même fichier). Aucun test unitaire n’importe `timeout.js` isolément assez tôt pour voir le `ReferenceError` avant la cadence.

Ce commit ne touche **pas** le corps `slip_or_trip`. Les omits ice/mount/hurtle (commentaires JS) restent. Ce n’est pas un port C ; c’est une restauration de lien.


## Synthèse PROCESS vs QUALITY
Le JS est une restauration de binding, pas un port de `slip_or_trip`. C `level.objects[u.ux][u.uy]` ↔ JS `objects_at` : une fois l’import revenu, le caller FUMBLING recompile. Aucune branche, aucun RNG, aucun stub `TODO`. QUALITY : 9/10 sur le delta d’une ligne.

PROCESS : D-id de cluster pour une rustine ; cadence #1250 dans le même hash ; CURRENT keep-list « do not drop objects_at » à la place d’un linter. Le D-log est honnête sur la cause D-0978. Le titre « Restore … and refresh #1250 » avoue le mélange. Flaguer PROCESS-SMELL, pas QUALITY-RISK, pas CONSTITUTION-RISK (grep JS vide de bans).

Longueur cible 180 : ce commit est mixte cadence+1 ligne JS — le gabarit 80–160 « cadence pur » ne s’applique pas strictement, d’où le développement process ici.


## Questions ouvertes (revue)
1. Le green gate a-t-il jamais exécuté `nh_timeout` FUMBLING entre D-0978 et D-0980 ?
2. Un `no-undef` ESM CI existe-t-il, ou seulement le keep-list CURRENT ?
3. D-0978 a-t-il droppé d’autres imports ailleurs que `timeout.js` ?
4. La suite 43/44 #1250 a-t-elle tourné sur un arbre *sans* l’import (impossible à extraire de ce hash) ?

## Verdict
- Verdict : **PROCESS-SMELL**
- Note : **5/10**
- Si je ne devais retenir qu’une critique : oui c’est le bugfix D-0978 (import `objects_at` pour `slip_or_trip`), et il est C-juste — mais le coller à la cadence #1250 et lui coller un D-id « cluster » transforme une rustine d’une ligne en itération de port.
