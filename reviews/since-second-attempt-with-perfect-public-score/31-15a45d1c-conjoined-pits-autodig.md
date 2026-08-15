# Review 31 — `15a45d1c354368ff03bd9848982101e61a8a6453` — conjoined_pits / autodig / boulder-fill

## Métadonnées
- Hash complet / court : `15a45d1c354368ff03bd9848982101e61a8a6453` / `15a45d1c`
- Parent : `a86cd8088059be5731b19b0a50d85a0e07266443`
- Auteur, date : Raphaël Hervier, 2026-07-22 00:21 +0200 (Co-authored-by Cursor)
- D-id : D-0962
- Stats : 10 files, +188/−55
- Fichiers JS / map / cadence : `js/const.js` (`xytodir`), `js/trap.js` (`conjoined_pits`/`delfloortrap`), `js/dig.js` (wires). Pas de cadence.

## Intention vs livrable
Promesse : porter `conjoined_pits`, autodig quiet, et `dighole` boulder-fill (settle / KADOOM).

Livrable : les trois, plus `delfloortrap` (nécessaire au KADOOM) et `xytodir` (nécessaire aux bits `conjoined`). D-id présent. Titre = cluster. Bonus utile : réordonnancement throne/altar **après** grave/drawbridge pour coller au else-if C (pas annoncé, mais c’est de la fidélité).

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/const.js` | Port C `cmd.c xytodir` |
| `js/trap.js` | Port C `conjoined_pits` + `delfloortrap` |
| `js/dig.js` | Wiring `pick_can_reach` / `use_pick_axe2` debris+autodig / `dighole` boulder |
| map debt/turns | D-0962 ; `clear_conjoined_pits` nommé restant |
| CURRENT / NOTES / D-log / journal | Docs ; green+dig 16/16 |

## Fidélité C ↔ JS

### `xytodir`
- Locus C : `cmd.c` (table `xdir`/`ydir`, `DIR_ERR`)
- Locus JS : `const.js:xytodir` — boucle `dd < N_DIRS` sur `xdir`/`ydir` déjà exportés, return `-1`. `DIR_ERR` existait déjà plus bas dans le fichier (`export const DIR_ERR = -1`). Match.

### `conjoined_pits`
- Locus C : `trap.c:conjoined_pits` (6552)
- Locus JS : `trap.js:conjoined_pits`
- Null traps ; `isok` des `tx,ty` ; `is_pit` des deux ; si `u_entering_trap2` alors `utrap && TT_PIT` ; `dx,dy = sgn(t2-t1)` ; `diridx = xytodir` ; `adjidx = DIR_180` ; bits `(1<<diridx)` / `(1<<adjidx)`. Pas de RNG. **Branch-par-branch identique.**

### `delfloortrap`
- Locus C : `trap.c:delfloortrap` (6668)
- Locus JS : `trap.js:delfloortrap`
- Même liste de `ttyp` (SQKY_BOARD, BEAR_TRAP, LANDMINE, FIRE_TRAP, pit/hole, TELEP, LEVEL_TELEP, WEB, MAGIC_TRAP, ANTI_MAGIC). Hero cell : `reset_utrap(true)` sauf `TT_BURIEDBALL`. Sinon `m_at` → `mtrapped=0`. `deltrap`. Match.

### `pick_can_reach`
- C : héros `TT_PIT` + cible pit tseen → `conjoined_pits(t, t_at(ux,uy), FALSE)` ; sinon `bimanual`. JS remplaçait ça par `return false`. Désormais l’appel C. Match.

### `use_pick_axe2` debris + autodig
- C (1255+) : si UNDIGGABLE + héros pit + trap pit adjacent + `!conjoined_pits` → `xytodir(dx,dy)`, set bits, « clear some debris » ; else if still pit → rubble no place ; else thin air.
- JS ajoute ces deux `else if` dans le même bras. `yobjnam_dig` stand-in de `yobjnam` — wording, pas RNG.
- Autodig quiet (C 1288) : `flags.autodig && DIGTYP_ROCK && !down && u_at(old pos) && moves in [lastdigtime, lastdigtime+2]` → `did_dig_msg=true`, `quiet=true`. JS identique, **avant** le reset pos/effort. Confirmation : le silence de start répété est le C.

### `dighole` boulder
- C else-if après DRAWBRIDGE_DOWN, avant IS_GRAVE : boulder + pit + `rn2(2)` → settle, `ttyp=PIT` (écrase spikes) ; else KADOOM, `wake_nearby`, `delfloortrap` ; `delobj(boulder)` ; **ne set pas retval** (reste false).
- JS : même structure, `return false` (équivalent retval, **sans** `spot_checks` — déjà omis nommé).
- RNG : un `rn2(2)` seulement si `ttmp && is_pit`. Short-circuit = C.
- Ce commit **déplace** throne/altar from *before* drawbridge to *after* grave, ce qui aligne l’else-if C : db-down → boulder → grave → (db-up omis) → throne → altar → fillhole. `DRAWBRIDGE_UP` fluid reste nommé omis.

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/fs/fastforward. Frozen OK. `await` = pline. RAS.

## Densité (§2b)
**Right size.** Trois dettes nommées du même fichier `dig.c` + helpers `trap.c`/`cmd.c` strictement requis. Cluster, pas peel. Pas too big (pas de shop/altar/bridge).

## Documentation
- D-0962 fixed. Named omissions : desecrate/god_zaps, magical-trap explode, DRAWBRIDGE_UP, zap_dig pitdig, `clear_conjoined_pits` / adj callers. Honnête : `conjoined_pits` n’est pas tout le graphe pit.
- Map : D-0962 en gras. Journal green+dig 16/16. Pas d’overclaim « complete pit system ».

## Vérification
Affirmation. Autodig/boulder/conjoined sont peu couverts par la suite publique. Fortress tenue n’éprouve pas `rn2(2)` settle. Le journal ne cite pas de seed pit-pair. `xytodir` + `DIR_180` sont du déterministe : un bug de table `xdir` se verrait en debris join (bits `conjoined` faux) plus tard dans `dotrap`.

## Preuves C (extraits)

`conjoined_pits` C, corps entier (court, donc citons-le) :

```c
dx = sgn(trap2->tx - trap1->tx);
dy = sgn(trap2->ty - trap1->ty);
diridx = xytodir(dx, dy);
if (diridx != DIR_ERR) {
    adjidx = DIR_180(diridx);
    if ((trap1->conjoined & (1 << diridx))
        && (trap2->conjoined & (1 << adjidx)))
        return TRUE;
}
return FALSE;
```

JS : mêmes `sgn` / `xytodir` / `DIR_180` / bits. Diagonale : `xytodir` accepte les 8 dirs (`N_DIRS=8`). Deux pits en cheval ne joignent que si les bits ont été posés (bras debris). `u_entering_trap2` : exige `utrap && TT_PIT` — le 3ᵉ arg `true` est pour `dotrap`, pas pour `pick_can_reach` (`false`). JS exporte la fonction ; ce commit ne wire pas `dotrap`. Un héros qui **entre** dans un pit adjacent n’utilise pas encore les bits. Nommé via « clear_conjoined / adj callers ».

Debris C :

```c
int idx = xytodir(u.dx, u.dy);
if (idx != DIR_ERR) {
    int adjidx = DIR_180(idx);
    trap_with_u->conjoined |= (1 << idx);
    trap->conjoined |= (1 << adjidx);
    You("clear some debris from between the pits.");
}
```

JS identique. `xytodir(0,0)` → `DIR_ERR` (pas dans `xdir`/`ydir` walk) : pas de bits, pas de message — comme C.

Autodig quiet : fenêtre `moves ∈ [lastdigtime, lastdigtime+2]` **et** `u_at(digging.pos)` — le héros n’a pas bougé. JS `game.did_dig_msg` stand-in de `gd.did_dig_msg`. Si `game.did_dig_msg` n’est pas lu par `dig()` occupation, `quiet` seul compte (`if (digtxt && !digging.quiet) pline`). C set les deux. JS aussi.

Boulder C `rn2(2)` seulement si pit existant. JS `if (ttmp && is_pit(ttmp.ttyp) && rn2(2))`. Short-circuit : pas de pit → pas de roll, KADOOM. Match. `ttmp.ttyp = PIT` écrase SPIKED_PIT. `delfloortrap` sur KADOOM peut `reset_utrap` si héros sur la case.

Ordre `dighole` après ce commit vs C :

| # | C | JS D-0962 |
|---|---|---|
| 1 | hard / magic trap / pool | (magic trap encore omis) |
| 2 | DRAWBRIDGE_DOWN / wall | DRAWBRIDGE_DOWN / wall |
| 3 | boulder settle/KADOOM | boulder |
| 4 | IS_GRAVE | IS_GRAVE |
| 5 | DRAWBRIDGE_UP fluid | **omis** (nommé) |
| 6 | THRONE too hard | THRONE |
| 7 | ALTAR too hard | ALTAR |
| 8 | fillhole / digactualhole | fillhole |

Le déplacement throne/altar (retirés d’avant le pont, remis après grave) n’est pas dans le message de commit. C’est une correction d’ordre silencieuse, dans le bon sens.

`DIR_ERR` : déjà `export const DIR_ERR = -1` ligne ~1490. `xytodir` retourne `-1` en dur. Import `DIR_ERR` dans `dig.js`/`trap.js` fonctionne. Commentaire « DIR_ERR lives with other error sentinels below » : vrai, pas un oubli d’export.

## Questions ouvertes
1. `sgn` existe déjà dans `trap.js` (l.134 au hash) — pas un trou.
2. `dotrap` `conjoined_pits(..., TRUE)` : sans wire, les bits posés par debris ne servent qu’à `pick_can_reach`.
3. `zap_dig` pitdig nommé omis : un zap entre deux pits ne pose pas les bits.

## Risques / dette
1. `clear_conjoined_pits` absent : détruire un pit ne nettoie pas le bit voisin (nommé).
2. `DRAWBRIDGE_UP` encore dans le default fillhole JS vs bras C dédié.
3. Magical-trap explode dans `dighole` toujours omis (RNG `d(3,6)`).
4. Callers `conjoined_pits` dans `dotrap` (`u_entering_trap2=TRUE`) : la fonction est exportée, le wire dotrap n’est pas dans ce commit.
5. `yobjnam_dig` vs `yobjnam` : cosmétique.

## Cohérence D-log / map
D-0962 fixed. Symptom : pit reach always failed, autodig always re-announced, boulder skipped settle/KADOOM. Les trois symptômes correspondent aux trois wires. Named omissions n’incluent pas « conjoined in dotrap » explicitement, mais « clear_conjoined_pits / adj callers » couvre le graphe restant. `debt.md` retire autodig/boulder/conjoined du still-deferred. CURRENT next-cluster passe à desecrate/god_zaps. Journal #1232, pas de cadence. Process propre.

`delfloortrap` export : C n’est pas que dighole (autres callers trap.c). Export sans wire extra = OK, fonction complète. Mieux que le `wake_nearto` local de D-0959.

Le réordonnancement throne/altar n’a pas de ligne D-log. Un bisect « who moved altar too-hard » tombe sur D-0962. Cosmétique docs.

## Diff JS — hors port
`const.js` : `xytodir` collé près de `DIR_180` / `N_DIRS`, pas à côté de `DIR_ERR` (ligne ~1490). Un grep `DIR_ERR` près de `xytodir` trouve un commentaire, pas le const. Style, pas un bug (l’export existe).

`trap.js` : import `xytodir`/`DIR_180`/`DIR_ERR`. `conjoined_pits` + `delfloortrap` avant `is_youmonst`. `sgn` préexistant l.134. Pas de RNG dans ces deux fonctions.

`dig.js` : import `delfloortrap`/`conjoined_pits`/`xytodir`/`DIR_180`/`DIR_ERR`. `pick_can_reach` : 3 lignes au lieu de `return false`. `use_pick_axe2` : ~20 lignes debris + ~10 autodig. `dighole` : boulder + move throne/altar. `sobj_at(BOULDER)` : helper local déjà là (ou via objects_at). `delobj` préexistant.

Pas de touche `const.js` frozen. `xdir`/`ydir` déjà alignés sur C `cmd.c` (utilisés par le mouvement). `xytodir` n’invente pas une 2ᵉ table.

## Synthèse
Trois dettes dig, trois wires, helpers `xytodir`/`conjoined_pits`/`delfloortrap` 1:1. `rn2(2)` boulder short-circuit C. Autodig fenêtre `lastdigtime+2`. Bits `conjoined` DIR_180. Ordre `dighole` aligné (sauf DRAWBRIDGE_UP nommé). `clear_conjoined_pits` / `dotrap` restants nommés. Seul ACCEPT franc de la série : pas d’inversion de garde, pas de mélange cadence, pas d’overclaim « pits complete ».

## RNG et callers — rappel
`xytodir`/`conjoined_pits`/`delfloortrap` : 0 RNG. Autodig quiet : 0 RNG. Debris join : 0 RNG. Boulder : `rn2(2)` ssi pit. `pick_can_reach` 0 RNG (délègue conjoined). Callers `conjoined_pits` C : `pick_can_reach`, `use_pick_axe2`, `dotrap` (2 sites). Ce commit : les deux dig, pas dotrap. `delfloortrap` export complet, wire dighole KADOOM seulement.

## Ce que je ne pénalise pas
Je ne demande pas `clear_conjoined_pits` dans ce hash (nommé). Je ne demande pas `dotrap` dans ce hash (adj callers nommés). Je ne traite pas le move throne/altar comme scope creep : c’est de l’ordre C. Je n’invente pas un FAIL peel autodig. ACCEPT parce que les trois fonctions portées sont branch-par-branch le C, RNG boulder inclus, docs sans « complete ».

## CURRENT au hash
Next-cluster : desecrate / god_zaps_you seulement (autodig/boulder/conjoined sortis). Keep D-0962. NOTES @#1232, cadence @#1235. `turns.md` ajoute conjoined/xytodir/autodig/boulder/delfloortrap, omet encore desecrate. Journal : « boulder settle-or-KADOOM (retval false) » — le reviewer a vérifié : C ne set pas retval, JS `return false`. Match documenté.

`xdir`/`ydir` déjà utilisés par le mouvement : `xytodir` ne peut pas diverger de `u.dx/u.dy` walk sans casser aussi le déplacement. Risque table : bas.

## Annexe — ordre de lecture C
1. `trap.c:conjoined_pits` 6552–6576 (corps entier cité plus haut).
2. `trap.c:delfloortrap` 6668–6689.
3. `cmd.c:xytodir` (table xdir/ydir, DIR_ERR).
4. `dig.c:pick_can_reach` 150–152 ; `use_pick_axe2` 1255–1297 ; `dighole` boulder 942–958.
Le reviewer a collé C et JS sur 1, 2, 4. `DIR_180` déjà en JS. `clear_conjoined_pits` lu, non porté, nommé.

`use_pick_axe2` UNDIGGABLE chain : WEB reveal → statue/boulder reach fail → conjoined debris → rubble → thin air. JS insère debris/rubble **dans** cette chaîne, pas à la fin. Un `else if` mal placé après thin air n’aurait jamais tourné. Le diff le met avant thin air. Correct.

Autodig quiet est **dans** le `if (pos changed \|\| down)` qui reset effort, pas dans le bras « continue digging ». Un autodig répété *exactement* au même spot dans la fenêtre 2 turns silence le *start*, pas le continue. C identique. `game.flags.autodig` vs C `flags.autodig` : si le flag JS n’est pas posé par les options, le bras est mort (pas de faux silence).

`pick_can_reach` Flying/bimanual inchangés. Seul le `return false` conjoined est remplacé par l’appel C. Pas de régression reach hors pits.

## Verdict
- Verdict : **ACCEPT**
- Note : **8/10**
- Si je ne devais retenir qu’une critique : c’est le commit de cette série où l’ordre des `else if` C (`rn2(2)` boulder, bits `conjoined`, autodig quiet) est lu et recopié, et où les omissions restantes sont nommées sans « complete pits ».
