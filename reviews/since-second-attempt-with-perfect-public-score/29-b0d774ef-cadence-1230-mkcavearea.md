# Review 29 — `b0d774ef42abe04d44a8fb2ec310556f6abf98e8` — cadence #1230 + mkcavearea

## Métadonnées
- Hash complet / court : `b0d774ef42abe04d44a8fb2ec310556f6abf98e8` / `b0d774ef`
- Parent : `68c2f595cfd125430e01b09e971e35b74629999b`
- Auteur, date : Raphaël Hervier, 2026-07-22 00:13 +0200 (Co-authored-by Cursor)
- D-id : D-0960 **et** cadence #1230
- Stats : 8 files, +220/−55
- Fichiers JS / map / cadence : `js/dig.js` (port) ; CURRENT score 44/44 @#1230 ; journal archive ; map debt. **Mélange explicite.**

## Intention vs livrable
Le sujet le dit : « Refresh #1230 public suite score **and** port mkcavearea earth dig (D-0960) ». Deux jobs dans un commit : (1) cadence full `sessions` 44/44, (2) port `rm_waslit` / `mkcavepos` / `mkcavearea` + wire `dig()` earth-level.

Livrable = les deux. Playbook : un cadence commit qui porte du C en plus est un mélange. À flaguer même si le JS n’est pas vide. D-id présent pour la partie port.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/dig.js` | Port C earth cave + wiring `dig()` finish STONE/SCORR/TREE |
| `docs/CURRENT.md` | Cadence : 44/44 @#1230, speed `31+0.27/turn` |
| `docs/AGENT-LOOP-JOURNAL.md` + archive | Entrée mixte cadence+port |
| D-INDEX/LOG / NOTES / `debt.md` | D-0960 |

## Fidélité C ↔ JS

### `rm_waslit`
- Locus C : `dig.c:rm_waslit` (30)
- Locus JS : `dig.js:rm_waslit`
- ROOM+waslit sous le héros, sinon fenêtre `x=ux-2..ux+2`, `y=uy-1..uy+1`. Boucles identiques (`x < ux+3`, `y < uy+2`). Pas de RNG. Match.

### `mkcavepos`
- Locus C : `dig.c:mkcavepos` (48)
- Locus JS : `dig.js:mkcavepos` (async à cause de `rloc`)
- `rockit` : skip `IS_OBSTRUCTED` ; skip `t_at` (portal) ; `m_at` sans `passes_walls` → `rloc(..., RLOC_NOMSG)`. Else si `typ==ROOM` return.
- C `unblock_point` ; JS `recalc_block_point` — même approximation vision que d’autres ports, ici le commentaire le dit.
- Reset `seenv`/`doormask` ; `lit`/`waslit` si `dist<3` / `waslit` ; `horizontal=false` ; `viz_array[y][x] = dist<3 ? IN_SIGHT|COULD_SEE : COULD_SEE` ; `typ` STONE vs ROOM ; `feel_newsym`.
- C `impossible` si `dist>=3` ; JS no-op « keep soft for held-out ». Pas de RNG dans `mkcavepos` hors `rloc`.
- `await rloc` par cellule : si `rloc` tire du RNG, l’ordre d’évaluation suit la double boucle C (même séquence xmin/xmax/ymin/ymax). OK si `rloc` JS est fidèle.

### `mkcavearea`
- Locus C : `dig.c:mkcavearea` (88)
- Locus JS : `dig.js:mkcavearea`
- Messages crash vs mysterious force CORR/extends ; C `display_nhwindow(WIN_MESSAGE, TRUE)` vs JS `flush_topl_more`. Approximation `--More--`.
- `for dist=1..2` : xmin-- xmax++ ; si `dist<2` ymin-- ymax++ puis top/bottom `i=xmin+1..xmax-1` ; puis left/right `i=ymin..ymax`. `flush_screen(1)` + `nh_delay_output`. Structure identique.
- Fin : si `!rockit && typ==CORR` → ROOM + waslit + `newsym`. `vision_full_recalc=1`.
- `Soundeffect` omis, nommé (pas de RNG).

### Wiring `dig()` earth
C, dans le bras `STONE \|\| SCORR \|\| IS_TREE`, **avant** le typ change rock/tree :

```c
if (Is_earthlevel(&u.uz)) {
    if (uwep->blessed && !rn2(3)) {
        mkcavearea(FALSE);
        goto cleanup;
    } else if ((uwep->cursed && !rn2(4))
               || (!uwep->blessed && !rn2(6))) {
        mkcavearea(TRUE);
        goto cleanup;
    }
}
```

JS recopie les gardes et le short-circuit clang : blessed → éventuellement `rn2(3)` seulement ; sinon cursed → `rn2(4)` ; uncursed → `rn2(6)`. Puis reset `lastdigtime` / `quiet` / `level.dnum=0` / `dlevel=-1` / `return 0` ≡ label `cleanup`.

Confirmation branch-par-branch : l’ordre RNG earth est le C. `earth elemental debris` (`Is_earthlevel && !rn2(3)` **après** le typ change, plus bas) reste omis, nommé.

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/fs/fastforward. Frozen OK. `await` = pline / rloc / delay / flush. RAS Rule #2. Le ban cassé est **process** : cadence + port dans le même commit (instructions reviewer §7 / playbook cadence).

## Densité (§2b)
La partie port est **right size** (trois static C + un wire). Le commit entier est **too big au sens process** : score refresh + cluster sémantique collés. Ce n’est pas too small.

## Documentation
- Journal titre « #1230 cadence score + D-0960 mkcavearea » : **honnête sur le mélange**.
- CURRENT : 44/44 @#1230, speed mis à jour, D-0960 dans Keep, mkcavearea retiré du next-cluster.
- D-0960 fixed ; Deferred Soundeffect, earth elemental, et backlog. Pas d’overclaim « complete earth dig ».
- Index mentionne « cadence 44/44 @#1230 » **et** le port — le mélange est documenté, pas caché.

## Vérification
Journal : full sessions **44/44** Scr 11405 RNG 100% `31+0.27/turn` ; green+strict ; dig cohort 16/16. La cadence a une preuve chiffrée (score CURRENT). Le port earth n’est pas isolé : on ne sait pas si mkcavearea a été exercé (earth level rare dans la suite publique). Fortress tenue, pas un 43/44. Speed label change `32+0.26` → `31+0.27` : le port n’explique pas un ralentissement (delay_output / flush) ; plus probablement variance de mesure collée dans le même commit — encore un effet du mélange.

## Preuves C (extraits)

`rm_waslit` — fenêtre asymétrique (2 ouest/est, 1 nord/sud) :

```c
if (levl[u.ux][u.uy].typ == ROOM && levl[u.ux][u.uy].waslit)
    return TRUE;
for (x = u.ux - 2; x < u.ux + 3; x++)
    for (y = u.uy - 1; y < u.uy + 2; y++)
        if (isok(x, y) && levl[x][y].waslit)
            return TRUE;
```

JS identique, y compris `x < ux+3` (5 colonnes) et `y < uy+2` (3 lignes). Un off-by-one ici aurait allumé `waslit` faux sur `mkcavepos`. Match.

`mkcavearea` géométrie : dist=1 élargit en losange 3×5 (ymin/ymax bougent) ; dist=2 n’élargit plus en Y, seulement X. C comment : « the area is wider than it is high ». JS recopie. `mkcavepos` appelé dans cet ordre : top/bottom inner, puis colonnes gauche/droite. Si `rloc` RNG, l’ordre des monstres déplacés = C.

Wiring earth, short-circuit :

```c
if (uwep->blessed && !rn2(3)) { mkcavearea(FALSE); goto cleanup; }
else if ((uwep->cursed && !rn2(4)) || (!uwep->blessed && !rn2(6))) {
    mkcavearea(TRUE); goto cleanup;
}
```

Table des rolls (uwep) :
| état | rn2(3) | rn2(4) | rn2(6) |
|---|---|---|---|
| blessed | oui | non (short-circuit else) | non |
| cursed | non (`blessed` false) | oui | non (`!blessed` false avant `rn2(6)` grâce à `\|\|` : wait)

Attention `\|\|` : `(cursed && !rn2(4)) || (!blessed && !rn2(6))`.
- cursed (implies !blessed) : évalue `rn2(4)` ; si vrai (collapse), **ne pas** évaluer `rn2(6)` ; si `rn2(4)` échoue (cursed&&false), alors `!blessed` true → **évalue `rn2(6)`**. Un cursed qui rate `rn2(4)` tire quand même `rn2(6)`. C et JS identiques.
- uncursed : pas `rn2(3)`, pas `rn2(4)`, oui `rn2(6)`.
- blessed qui rate `rn2(3)` : else-if `cursed` false, `!blessed` false → **zéro** `rn2(4)`/`rn2(6)`.

C’est le genre de clang LTR que le playbook exige. Ici, c’est bon.

`cleanup` C reset `lastdigtime=moves`, `quiet=FALSE`, `level.dnum=0`, `dlevel=-1`, `return 0`. JS pareil. Ne tombe **pas** dans le `typ=CORR/ROOM` ni dans `earth elemental !rn2(3)` plus bas — correct, `goto cleanup` saute ça.

## Mélange cadence — pourquoi PROCESS-SMELL
Instructions reviewer : « Un cadence commit qui **porte du C en plus** est un mélange — le flaguer. » Rubrique PROCESS-SMELL : « Docs/cadence/process ; peu de JS, **ou mélange score+port** ».

Ce n’est pas « peu de JS » (140 lignes dig.js). C’est le second bras de la définition. Un revert du score docs écraserait le port, et inversement. Le journal mixte « cadence score + D-0960 » documente le péché au lieu de le séparer en deux hashes. CURRENT met à jour le tableau PASS @#1230 **dans le même diff** que `mkcavearea`. Impossible de dire, plus tard, si 44/44 est antérieur ou postérieur au port earth sans relire le diff.

Comparaison : #1215 (kick_door) avait déjà ce pattern cadence+port. Répéter n’absout pas.

## Questions ouvertes
1. `game.viz_array?.[y]` : si viz_array n’existe pas, C écrit quand même `gv.viz_array[y][x]`. JS no-op. Vision short-circuit earth inerte ?
2. `flush_topl_more` vs `display_nhwindow(WIN_MESSAGE, TRUE)` : un `--More--` extra ou manquant sur earth ?
3. `Is_earthlevel` JS est-il le même prédicat que C (`dungeon.h`) ? Si faux négatif, le cluster entier est mort ; si faux positif, `rn2(3/4/6)` se tire hors earth.

## Risques / dette
1. Process : historiser un port dans un commit de score empêche un revert/cherry-pick propre.
2. `earth elemental` `rn2(3)` encore absent — prochain finish earth (après un mkcavearea *non* pris) diverge.
3. `recalc_block_point` vs `unblock_point` ; `viz_array` JS peut être absent (`?.`).
4. `flush_topl_more` ≠ `display_nhwindow(..., TRUE)`.
5. `Soundeffect` omis : pas RNG, OK. `nh_delay_output` await : pas de 2ᵉ input boundary.

## Cohérence D-log / map
D-0960 fixed ; index : « cadence 44/44 @#1230 » collé à la ligne du port. CURRENT Score last measured passe #1225 → #1230 **et** next-cluster retire mkcavearea. Le document de score devient indissociable du port. NOTES « Cadence reconfirm + D-0960 under fortress » : même mélange.

Le port lui-même : `debt.md` mkcavearea en gras, earth elemental encore deferred. Pas d’overclaim « earth dig complete ». Si on ignorait la cadence, le verdict JS serait ACCEPT-WITH-DEBT (elemental + vision). Le PROCESS-SMELL l’emporte parce que la consigne reviewer le range ainsi, pas parce que `mkcavepos` est faux.

`mkcavepos` async : C synchrone. Un `rloc` qui `await nhgetch` (improbable) casserait l’occupation dig. `rloc` typiquement RNG+place, pas input. Frontière async OK.

## Diff JS — hors port
Imports : `flush_topl_more`, `passes_walls`, `IN_SIGHT`/`COULD_SEE`/`RLOC_NOMSG`. `t_at`/`m_at` déjà dans dig.js. `feel_newsym` déjà. `nh_delay_output` déjà (tmp_at pick).

`mkcavepos` `lev.flags = 0` si `!== undefined` : C `doormask=0` « flags set via doormask ». JS a parfois `flags` séparé. Clear extra : peut tuer emptygrave/autre si mkcavepos tombe sur une tombe (peu probable, earth STONE/ROOM).

Boucles `await mkcavepos` :  pour dist=1, top/bottom ~3+3, left/right ~3+3 = 12 awaits ; dist=2 sans ymax extra, xmin/xmax colonnes plus hautes. C `flush_screen` **après** chaque dist, pas après chaque cellule. JS aussi (`flush_screen` hors de la double boucle interne). Match.

CURRENT liste PASS 44 seeds recopiée (#1230). Reviewer n’a pas rejoué. On croit le chiffre du journal, on ne le confond pas avec une preuve mkcavearea.

## Synthèse
Le C earth (`rn2(3/4/6)` short-circuit, géométrie mkcavearea, cleanup) est lu. Le process ne l’est pas : #1230 cadence 44/44 et D-0960 dans le même hash, journal et CURRENT mêlés. Verdict PROCESS-SMELL même si un split aurait donné ACCEPT-WITH-DEBT (elemental debris restant). Ne pas relire ce commit comme « docs only » ni comme « port only ».

## RNG et callers — rappel
`rm_waslit` 0 RNG. `mkcavepos` 0 sauf `rloc`. `mkcavearea` 0 hors cellules. Caller unique : `dig()` finish STONE/SCORR/TREE sous `Is_earthlevel`. Table short-circuit blessed/cursed/uncursed ci-dessus. `goto cleanup` saute `earth elemental !rn2(3)` — correct. Cadence 44/44 dans CURRENT est une mesure de suite, pas une mesure earth.

## Ce que je ne pénalise pas
Je ne transforme pas le mélange en QUALITY-RISK : le C earth est bon. Je ne transforme pas 44/44 @#1230 en preuve mkcavearea. Je ne demande pas deux hashes au reviewer passé — je flagge pour que le suivant ne cherry-pick pas « le score » sans le port. `Soundeffect` omis : pas RNG. `nh_delay_output` await : pas input.

## CURRENT au hash
Score @#1230 44/44 11405/11405 RNG 100% speed 31+0.27/turn. Next cadence @#1235. Next-cluster retire mkcavearea, ajoute autodig/boulder. Keep D-0960. La ligne Score et la ligne D-0960 sont le même paragraphe CURRENT — illustration du mélange.

## Annexe — ordre de lecture C
1. `dig.c:rm_waslit` / `mkcavepos` / `mkcavearea` (30–137).
2. `dig.c` earth `Is_earthlevel` avant typ change (467–475) + label `cleanup` (540).
3. CURRENT/journal pour le mélange #1230.
Le reviewer a lu 1–2 branch-par-branch (table blessed/cursed/uncursed). 3 justifie PROCESS-SMELL.

## Verdict
- Verdict : **PROCESS-SMELL**
- Note : **6/10**
- Si je ne devais retenir qu’une critique : le RNG earth `rn2(3)/rn2(4)/rn2(6)` est collé juste, mais coller ça à la cadence #1230 viole la règle « un job » — flag mélange, pas un échec de lecture C.
