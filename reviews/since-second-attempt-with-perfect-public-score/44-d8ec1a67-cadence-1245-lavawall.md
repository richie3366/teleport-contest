# Review 44 — `d8ec1a67` — cadence #1245 **et** lavawall / burn D-0975

## Métadonnées
- Hash complet / court : `d8ec1a673d70e60dc5cedfca292f45afb5091a40` / `d8ec1a67`
- Parent : `ebb7b8de0f8871eee3ece59f9714cb864946f3dd`
- Auteur, date : Raphaël Hervier, 2026-07-22 01:34:43 +0200
- D-id : D-0975 **plus** refresh score #1245
- Stats : 10 files, +138/−55 (JS : `zap.js` +50, `trap.js` +25, `mklev.js` +3)
- Fichiers JS / map / cadence : **mélange** CURRENT score 44/44→43/44
  **et** port lavawall/`burn_floor` feedback

## Intention vs livrable
Le sujet dit les deux : « Refresh #1245 suite score **and** port
lavawall spines/burn feedback ». Gabarit : *un cadence commit qui
porte du C en plus est un mélange — le flaguer.* C’est le cas.
Le port lui-même est petit et map-driven (CURRENT next cluster).
Le score cadence est honnête (seed0009 Scr 72/73, RNG 100 %). On ne
peut pas traiter ça comme un docs-only, ni comme un port pur.

## Inventaire
| Fichier | Rôle |
|---------|------|
| `docs/CURRENT.md` | Cadence : 43/44, Scr 11404/11405, seed0009 non-PASS |
| `docs/NOTES.md` | Suite landmark #1245 ; don’t-chase seed0009 |
| `js/mklev.js` | `export` `fix_wall_spines` (corps inchangé) |
| `js/zap.js` | Appel spines sur freeze lavawall ; `burn_floor_objects` async + plines |
| `js/trap.js` | `dofiretrap` / `trapeffect_fire_trap` → burn_floor + smell + `melt_ice` |
| D-LOG / debt / turns | D-0975 |
| journal | Une entrée « cadence + D-0975 » |

## Fidélité C ↔ JS

### `zap_over_floor` lavawall freeze
- Locus C : `zap.c` ~5265–5272 : si `lavawall`, VWALL si mur N/S
  adjacent sinon HWALL, **puis**
  `fix_wall_spines(max(0,x-1), max(0,y-1), min(COLNO-1,x+1), min(ROWNO-1,y+1))`.
- JS : déjà choisissait VWALL/HWALL ; ce commit ajoute l’appel
  `fix_wall_spines` avec les **mêmes** bornes. Pas de RNG. Géométrie
  de glyphes murs : sans spines, un mur de lave figé restait un
  segment orphelin. C’est le polish nommé depuis D-0965.
- `fix_wall_spines` JS existait (mkmaze/mklev) ; seul l’export est
  nouveau. Pas de relecture du corps spine dans ce commit — on
  **assume** que la fonction mklev est déjà C. Risque : si mklev JS
  est un subset, le freeze hérite des trous.

### `burn_floor_objects` `give_feedback`
- C `zap.c:burn_floor_objects` : si `give_feedback`, sauve le nom
  (`quan=1` / `quan=2` pour pluriel) **avant** `delobj`/`useupf`,
  puis pline `An(buf1) burns.` / `"%d %s burn."`.
- JS était synchrone et faisait `void give_feedback`. Devient
  `async` ; sauve `buf1`/`buf2` avec le même trick `quan` ; pline
  après destruction. `zap_over_floor` continue d’appeler
  `give_feedback=false` + puff of smoke — C aussi sur le chemin zap.
- Callers trap : `dofiretrap` C `burn_floor_objects(ux,uy,see_it,TRUE)`
  puis smell « paper burning » si `!see_it` ; `trapeffect_fire_trap`
  C `give_feedback=FALSE` + smell smoke si `!see_it && dist2<=9`.
  JS : mêmes flags (`true` hero, `false` monstre) + `melt_ice` si
  `is_ice`. `is_ice` exporté.
- Écarts nommés : `ignite_items` encore stub (D-0978) ; `surface()` ;
  Underwater/utrap lava ; box fire contents. `dofiretrap` n’appelle
  toujours pas `burn_away_slime` ici (C le fait **avant** burnarmor —
  D-0978).

### Async
`burn_floor_objects` async change la signature. Les callers du commit
`await`. Un oubli hors diff casserait (promesse vs count). Le diff
met à jour zap_over_floor + traps. Grep hors commit non exigé, mais
c’est le risque de « rendre async une fonction count ».

**Écart concret :** C `burn_floor_objects` est `int` synchrone et
finit par `ignite_items(level.objects[x][y])`. JS D-0975 ne branche
pas encore ignite (stub). Feedback plines ≠ pipeline feu complet.

C freeze lavawall (zap.c ~5265–5272) :

```
if (lavawall) {
    if ((isok(x, y-1) && IS_WALL(levl[x][y-1].typ))
        || (isok(x, y+1) && IS_WALL(levl[x][y+1].typ)))
        lev->typ = VWALL;
    else
        lev->typ = HWALL;
    fix_wall_spines(max(0,x-1), max(0,y-1),
                    min(COLNO-1,x+1), min(ROWNO-1,y+1));
}
```

JS avait déjà le test N/S → VWALL. L’appel spines est le seul ajout.
Bornes `max(0,…)` : en C `coordxy` 0 est valide pour x=0 (colonne
inutilisée NetHack). JS `Math.max(0, x-1)` identique. Pas `max(1,x-1)`.

`dofiretrap` C après losehp : `burn_away_slime()` **puis**
`burnarmor||rn2(3)` destroy+ignite **puis** burn_floor(see_it, TRUE).
JS D-0975 ajoute burn_floor+melt **sans** slime/ignite (D-0978). Le
`rn2(3)` burnarmor n’est pas déplacé. Smell « paper burning » seulement
si `!see_it` — JS `Blind()` pour `see_it` hero. C `see_it = !Blind`.
Monstre : smell si `dist2<=9` — JS `dist2(...) <= 3*3`. Fidèle.

Cadence CURRENT : PASS list retire seed0009 ; Scr 11405→11404 ; R²
0.871→0.874. RNG **inchangé** 792838/792838. Le FAIL est écran, pas
keystream — cohérent avec un extra line / attributes, pas un `rn2`
lavawall (freeze n’a pas de RNG spines).

C `burn_floor_objects` (zap.c 4622–4648) sauve le nom **avant**
destruction en forçant `quan` :

```
if (give_feedback) {
    obj->quan = 1L;
    Strcpy(buf1, u_at(x, y) ? xname(obj) : distant_name(obj, xname));
    obj->quan = 2L;
    Strcpy(buf2, u_at(x, y) ? xname(obj) : distant_name(obj, xname));
    obj->quan = scrquan;
}
```

puis `useupf`/`delobj`, puis `"%ld %s burn."` / `"%s burns." An(buf1)`.
Le `!rn2(3)` **par** unité (4620) n’est pas nouveau dans D-0975 —
c’était déjà le RNG du burn floor. JS D-0975 copie le trick
`quan=1`/`quan=2`. L’`ignite_items` C en **fin** de fonction reste
un stub JS jusqu’au D-0978 : un parchemin qui brûle affiche le pline
mais n’allume pas la lampe voisine.

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/fs/node/fastforward. Le message de commit
mentionne `seed0009` — **dans le message git**, pas dans le contrôle
JS. CURRENT liste seed0009 en non-PASS : documentation de score, pas
un gate. Rule #2 RAS. Frozen RAS.

## Densité (§2b)
**Mélange process.** Le port seul est *too small-to-right* : export
d’une fonction existante + un appel spines + plines burn + deux
callers trap. Ça aurait tenu comme D-0975 pur. Y coller le refresh
#1245 (CURRENT tables, PASS list, R²) viole « one C locus family »
**et** « cadence score refreshes every 5 are expected » en les
fusionnant. Playbook : unrelated theories → split. Ici : une théorie
score + une théorie C.

## Documentation
CURRENT : 44/44 @#1240 → **43/44 @#1245**, Scr −1, seed0009 retiré
des PASS, objectif fortress reformulé (« hold green, don’t chase
0009 »). Honnête sur la régression d’agrégat. D-0975 « fixed » pour
spines+feedback, pas « complete fire traps ». NOTES landmark cadence
mis à jour. Le journal une seule entrée pour deux jobs.

Overclaim : aucun « complete burn ». Sous-claim possible : attribuer
le 43/44 au port plutôt qu’à HEAD seed0009 — le texte dit
préexistant. Pas de preuve dans le commit (pas de `git stash` run).

## Vérification
Cadence chiffrée : **43/44** Scr **11404/11405** RNG **792838/792838**
speed `31+0.26/turn`. Green+strict ; zap/trap cohort **24/24**.
Deux preuves collées : suite pleine (cadence) + cohorte du port.
Si #1270 casse plus tard 43/44, ce commit est le moment où CURRENT a
**accepté** 43/44 comme baseline. seed0009 n’est pas un FAIL inventé
pour peler.

Le port n’a **pas** de `rn2` nouveau (spines déterministes ; burn
feedback = plines après `delobj`). Un FAIL écran 0009 **ne peut pas**
venir de ce SHA via keystream. Attribuer 43/44 au lavawall serait
donc une erreur de lecture.

**Cause réelle (D-1015, plus tard) :** extra « You were stealthy. » sur
death attributes, `EStealth` laissé par le stash tutoriel, **rendu
visible par D-0970** `confer_oc_oprop`. NOTES D-0972 avait déjà le
FAIL (cohort 36) en le collant sur HEAD/D-0972. Ici CURRENT **verrouille**
le mantra « do not chase as recent-port regression » — vrai pour le
lavawall, **faux** pour la plage post-`EStealth`. #1240 44/44 dans le
même SHA que D-0970 reste le maillon faible (review 39).

Gabarit reviewer : *un cadence commit qui porte du C en plus est un
mélange*. Longueur : ce n’est **pas** docs-only (80–160) ; le port
JS impose 180–350. Le SHA a deux métiers et devrait avoir été deux
commits (cadence #1245 puis D-0975, ou l’inverse).

## Risques / dette
1. **Process :** cadence+port dans un SHA — bisect / revert / review
   ne séparent pas le score du C.
2. Baseline fortress abaissée à 43/44 « don’t chase 0009 » — peut
   masquer une régression **nouvelle** sur 0009.
3. `fix_wall_spines` mklev non relu.
4. `burn_floor` async : callers oubliés hors diff.
5. `ignite_items` / slime / box fire encore ouverts.
6. `surface()` / Underwater lava arms toujours omit.

## Verdict
- Verdict : **PROCESS-SMELL**
- Note : **6/10**
- Si je ne devais retenir qu’une critique : le C lavawall/burn est un
  cluster mince et plutôt fidèle, mais il est collé à un refresh de
  score qui entérine 43/44 — un SHA, deux métiers, interdits par le
  gabarit cadence.
