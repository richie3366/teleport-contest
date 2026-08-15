# Review 81 — `1a66e5da` — crystal ball gazing

## Métadonnées
- Hash complet / court : `1a66e5dadaa8c9493a58301282d7a87840dbb8c8` / `1a66e5da`
- Parent : `3590a650856e0c797a539e0477cd6abef2f95a26`
- Auteur, date : Raphaël Hervier, 2026-07-22 06:23:55 +0200
- D-id : D-1010
- Stats : 10 files, +598/−29
- Fichiers JS / map / cadence : `js/detect.js` (gros port), `js/apply.js` + `js/artifact.js` (wiring), `docs/c-js-map/absent.md` + `debt.md`, CURRENT/NOTES/D-log/index, journal. Pas de cadence score.

## Intention vs livrable
Le message promet de retirer l’omission nommée CRYSTAL_BALL apply/invoke avec `use_crystal_ball` **plus** des callees detect « thin » sous la fortress.

Le diff fait exactement ça : enveloppe Blind / fail / hallu / uncharged / charged dans `detect.js`, câblage `doapply` et `arti_invoke`, et trois callees object/trap/furniture volontairement amaigris. Pas de D-id manquant. Pas de mélange cadence. Le titre n’est pas trop large — « thin » est dans le message, et le D-log le répète. Le risque n’est pas l’overclaim du titre, c’est de vendre un `object_detect` squelettique comme callee de production.

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/detect.js` | Port C : `use_crystal_ball`, `level_distance`, thin `object_detect`/`trap_detect`/`furniture_detect`, `def_char_to_*` locaux |
| `js/apply.js` | Wiring `doapply` case CRYSTAL_BALL |
| `js/artifact.js` | Wiring `arti_invoke` non-arti ball |
| `docs/c-js-map/absent.md`, `debt.md` | Retrait crystal ball ; reste blindfold/containers |
| `docs/CURRENT.md`, `NOTES.md` | Next cluster + keep D-1010 |
| `docs/DIVERGENCE-LOG.md` / INDEX | D-1010 « fixed » + deferred listés |
| `docs/AGENT-LOOP-JOURNAL.md` | #1281 green+cohort 15/16 |

## Fidélité C ↔ JS

### `use_crystal_ball` — enveloppe principale
- Locus C : `nethack-c/upstream/src/detect.c:use_crystal_ball` (pointeur `struct obj **optr`)
- Locus JS : `js/detect.js:use_crystal_ball` (retourne `obj` éventuellement null)

Ordre C lu en entier : Blind return → oops INT fail (charged && (cursed \|\| rnd(oops) > ACURR(INT))) → switch rnd(4 ou 5) → Hallucination Magic 8-Ball → verbose + yn_function → peer + nomul → uncharged unclear/implode → charged makeknown/consume + furniture/obj/mon/boulder/trap/level_detects → ret ? Wizard 1/100 : unclear.

**Confirmation branch-par-branch (enveloppe) :**
- Blind early : C `if (Blind)` / JS `if (Blind())`. Le `Blind()` local de `detect.js` est H\|\|E && !B plus `uroleplay.blind` et `u.ublind`, pas le test `ublindf && otyp != LENSES` de `Blindfolded`. Ça passe si `Blindf_on` a déjà posé `EBlinded` via `oc_oprop` ; ce n’est pas le macro C.
- `oops` : quest arti 8 / blessed 16 / sinon 20. Identique.
- Fail gate : `charged && (cursed \|\| rnd(oops) > acurr(A_INT))`. Identique, clang LTR.
- `impair = rnd(100 - 3 * INT)` puis `switch (rnd(n))` avec n=4 si artifact\|\|blessed sinon 5. Identique. Cases 1–5 (comprehend / confuse+make_confused / damage vision+make_blinded / zap mind+make_hallucinated / explode+useup+losehp rnd(30) Maybe_Half_Phys) dans le même ordre. Consume charge si `obj` survit, puis return. OK.
- Hallu : `nomul(-rnd(charged ? 4 : 2))`, raison Magic 8-Ball, uncharged haze+implode spe<0, charged `switch(rnd(6))` six textes puis consume. OK. **`poly_gender()` JS = `flags.female ? 1 : 0`** : C `polyself.c` distingue forme poly 0/1/2 (none). Écart d’affichage « babe/dude », pas de RNG.
- Prompt : C `yn_function(..., (char *)0, '\0', TRUE)` (4e argument). JS trois arguments. Possible écart d’écho / confirmation.
- Quitchars : C `(ch != def_monsyms[S_GHOST].sym) && strchr(quitchars, ch)`. JS `ch !== ' '` hardcodé. Fidèle au défaut `' '` ; faux si le joueur remap le glyphe fantôme.
- Charged dispatch **ordre C commenté** : furniture **avant** objclass pour que `'_'` soit autel et non chaîne. JS : `def_char_is_furniture` → `object_detect` → `monster_detect` → boulder showsyms → `'^'` trap → `rn2(4)` level_detects. Ordre correct.
- Wizard `!rn2(100)` si `ret` truthy. Identique.

**Écarts concrets dans l’enveloppe :**
1. Signature C `**optr` : explode/implode fait `*optr = 0`. `doapply` JS ignore la valeur de retour ; `arti_invoke` aussi. Après explosion, C saute `arti_speak` (`if (obj && obj->oartifact)`). Le `doapply` JS n’a de toute façon pas ce `arti_speak` post-switch (dette apply préexistante), mais le pointeur mort n’est pas propagé.
2. `hcolor(NULL)` C consomme le RNG de la table hallu. JS `detect.js` tire `rn2(11)` sur une liste maison de 11 noms. **Longueur de table ≠ C → divergence RNG** dès qu’on gaze hallu uncharged (haze) ou case 3 charged.
3. `resists_blnd` local : Blind/Unaware seulement. C `mondata.c` ajoute noeyes / Unaware / etc. Case 3 fail peut `make_blinded` là où C dirait unaffected.
4. `consume_obj_charge` / `useup` **locaux** : pas de unpaid shop, pas d’`invent.js:useup`. Nommé « unpaid consume ».
5. `makeknown(CRYSTAL_BALL)` seulement sur le chemin charged, comme C.

### Callees « thin » — trop thin pour un gaze chargé utile
**`object_detect`** C (detect.c) compte fobj + buried + minvent + mimic maudit + gold, `clear_stale_map`, boulder dual-class, `observe_recursively` potions/spbooks bénies, `strange_feeling` si rien. JS : double boucle `objects_at` sol seulement, `map_object` du premier match, message toujours `"objects"`, pas de `def_oc_syms[class].name`, pas de Hallucination→`something`. Si la seule correspondance est dans un inventaire monstre, C retourne 0 (affiche) ; JS retourne 1 → « vision is unclear » + 1 % Wizard. **C’est un faux négatif de détection**, pas du polish.

**`trap_detect`** C : ftrap puis `detect_obj_traps` (fobj/buried/minvent/invent) puis portes `D_TRAPPED`. JS : `game.ftrap` seulement. Chest/door OTRAP nommés. Sous les pieds : C `Your toes itch` ; JS `body_part(TOE)` → `'toe'` hardcodé, `makeplural` → « toes ». OK pour humain.

**`furniture_detect`** C : `IS_FURNITURE(typ)` **ou** `is_cmap_furniture` + mimic `M_AP_FURNITURE`/`seemimic`. JS : `IS_FURNITURE` seul. **`def_char_is_furniture`** C scanne `defsyms[]` de `"stair"` à `"fountain"`. JS : `'<>_{|\\'.includes(ch)` — **manque `}` (fontaine)**. Gaze `'}`` tombe dans objclass/monclass/level_detects au lieu de furniture. Nommés « full defsyms furniture scan » : oui, mais c’est un caractère ASCII par défaut, pas un remap.

**`monster_detect`** (préexistant) : C `mtmp->data->mlet == mclass` avec `mclass = def_char_to_monclass(ch)` (index). JS passe `'S_ANT'` et compare à `data.mlet` string. **Cohérent dans le modèle JS.** Manque le cas C `PM_LONG_WORM` + `S_WORM_TAIL`. Filtre classe : si `mlet` match, OK ; le `mcnt` C compte n’importe quel vivant puis filtre à l’affichage — JS aussi compte d’abord puis filtre au map. Si des monstres existent mais pas de la classe demandée, les deux affichent quand même « presence of monsters » (C mappe seulement la classe). JS identique sur ce point.

**`level_distance`** : `rn2(3)` dans les tests `ll < 0` et `ll > 0` (évalué même si le seuil n’est pas « far »). JS pareil. **Mais** `if (!where) return 'in the distance'` **avant** tout `rn2`. C passe toujours `&oracle_level` etc. Si `game.oracle_level` est unset, JS saute le RNG. Les clés existent via `dungeon.js` (`oracle`/`medusa`/`castle`/`wizard1`) — OK une fois `init_dungeons` fait.

### Callers
- `apply.c` case CRYSTAL_BALL → `use_crystal_ball(&obj)` ; `res` défaut `ECMD_TIME`. JS `return true`. Blind coûte un tour des deux côtés.
- `artifact.c` `arti_invoke` : C appelle aussi `use_crystal_ball` pour boule sans `inv_prop`. JS retire le stub `nothing_happens`. Correct.

## Constitution / playbook
Grep du diff JS : pas de `FORCE`, `DIAG` debug, `getRngLog`, `readFileSync`, `fs`/`node:`, `fastforward`, nom de seed dans le contrôle. Rule #2 OK. Frozen non touchés. `await yn_function` = saisie gaze ; pattern déjà établi (getline → nhgetch), pas un second canal. Helpers locaux `useup`/`hcolor`/`poly_gender` dans `detect.js` : 1:1 modules violé pour de la colle, pas pour un moteur transpilé. Omissions nommées dans le header `detect.js` + D-log. RAS constitutionnel après grep.

## Densité (§2b)
Right size. Une famille C : `use_crystal_ball` + callees directs + `def_char_*` + deux callers. ~540 lignes dans `detect.js`, pas un `if` isolé. Le « thin » est un choix de cluster, pas un peel docs-only. Trop gros ? Non : object_detect complet aurait été un second cluster (buried/minvent/mimic).

## Documentation
D-1010 **status fixed** avec **Deferred** explicite (buried/minvent/cursed-mimic/gold/clear_stale_map ; chest/door OTRAP ; M_AP_FURNITURE ; full defsyms). Pas « complete object_detect ». CURRENT retire crystal ball du next cluster, keep jusqu’à D-1010. Map `absent.md`/`debt.md` alignées. Journal #1281 : green+strict + cohort 15/16 (seed0009 préexistant) — pas seulement « fortress held ». Pas de suite cadence dans ce commit (score toujours 43/44 @#1280, hérité).

Sous-claim : `poly_gender`, `hcolor` RNG, `resists_blnd`, 4e arg `yn_function`, `}` fontaine ne sont **pas** dans la liste Deferred. Ce sont des trous de l’enveloppe, pas seulement des callees.

## Vérification
Journal : « Verified: green+strict PASS ; apply/detect cohort 15/16 (seed0009 Scr 72/73 pre-existing) ». Commandes non collées ; affirmation de loop. Aucun public session n’exerce un gaze de boule chargé (sinon le thin object_detect aurait déjà cassé des écrans). Preuve = non-régression fortress, **pas** parité du gaze. Acceptable pour un cluster map-driven jamais hit, à condition de ne pas croire que les callees sont jouables.

### RNG, clang LTR — séquence fail charged
C (detect.c) sur boule chargée maudite ou `rnd(oops) > INT` :

1. `rnd(oops)` déjà dans le `if` (oops 8/16/20)
2. `impair = rnd(100 - 3*INT)` — si INT≥34, argument ≤0 : `rnd` C est `rn2(x)+1` avec x≤0 = UB/clamp ; JS `rng.js` à vérifier hors de ce commit, mais l’appel est au même endroit
3. `rnd(4)` ou `rnd(5)` pour le switch
4. Case 5 seulement : `Maybe_Half_Phys(rnd(30))` → encore un `rnd` après explode

JS : même ordre d’appels dans `use_crystal_ball`. Pas d’inversion clang. **Hallu charged** : `nomul(-rnd(4))` puis `rnd(6)` puis éventuellement `hcolor` dans case 3 (`rn2(11)` JS vs table C). **Charged succès, symbole inconnu** : `rn2(SIZE(level_detects))` = `rn2(4)` puis, dans `level_distance`, `rn2(3)` si `ll != 0`. JS `LEVEL_DETECTS.length` = 4. OK. Si `ret` : `!rn2(100)`.

**Chemin uncharged hallu :** `nomul(-rnd(2))` + `hcolor(null)` — c’est **le** chemin RNG le plus fragile (table 11).

### Citations (enveloppe fail + dispatch)

```1217:1256:nethack-c/upstream/src/detect.c
 oops = is_quest_artifact(obj) ? 8 : obj->blessed ? 16 : 20;
 if (charged && (obj->cursed || rnd(oops) > ACURR(A_INT))) {
 long impair = (long) rnd(100 - 3 * ACURR(A_INT));
 switch (rnd((obj->oartifact || obj->blessed) ? 4 : 5)) {
 /* cases 1–5 confuse / blind / hallu / explode */
 if (obj) consume_obj_charge(obj, TRUE);
 return;
```

```1340:1365:nethack-c/upstream/src/detect.c
 if (def_char_is_furniture(ch) >= 0)
 ret = furniture_detect();
 else if ((class = def_char_to_objclass(ch)) != MAXOCLASSES)
 ret = object_detect((struct obj *) 0, class);
 else if ((class = def_char_to_monclass(ch)) != MAXMCLASSES)
 ret = monster_detect((struct obj *) 0, class);
 /* boulder showsyms, '^' trap, else rn2(level_detects) */
 if (ret) {
 if (!rn2(100)) You_see("the Wizard of Yendor gazing out at you.");
 else pline_The("vision is unclear.");
 }
```

JS dispatch (même ordre, `mlet` string au lieu de l’index C) :

```javascript
if (def_char_is_furniture(ch) >= 0) {
    ret = await furniture_detect();
} else if (oclass !== MAXOCLASSES) {
    ret = await object_detect(null, oclass);
} else if (mlet) {
    ret = await monster_detect(null, mlet);
} else if (boulderSym && ch === boulderSym) {
    ret = await object_detect(null, ROCK_CLASS);
} else if (ch === '^') {
    ret = await trap_detect(null);
} else {
    const i = rn2(LEVEL_DETECTS.length);
    /* ... */
}
```

`doapply` JS ignore `*optr` :

```javascript
if (CRYSTAL_BALL >= 0 && obj.otyp === CRYSTAL_BALL) {
    const { use_crystal_ball } = await import('./detect.js');
    await use_crystal_ball(obj);
    return true; // ECMD_TIME
}
```

C `doapply` : `use_crystal_ball(&obj); break;` puis éventuellement `arti_speak` si `obj` non nul. Explosion JS : `useup` local splice `game.invent` — l’objet disparaît, mais `arti_speak` n’existe pas dans ce `doapply` JS de toute façon.

### `object_detect` — ce que « thin » cache
C compte trois chaînes avant le `cls()` : `fobj`, `buriedobjlist`, `fmon->minvent` (+ mimic maudit / gold). Le `ct` de JS n’est que le sol `objects_at`. Conséquence sur `use_crystal_ball` : `ret` truthy trop souvent → `rn2(100)` Wizard **consommé** alors que C aurait `ret=0` (browse_map, pas de Wizard). **Ce n’est pas seulement un écran manquant : c’est un RNG en trop ou en moins** selon que le sol est vide.

`trap_detect` C sort dès le premier piège distant via `display_trap_map`. JS `break` sur `remote` puis remap tous les `ftrap`. Même idée, sans coffres. Si le seul piège est un `chest_trap` au sol, C `OTRAP_THERE` → carte ; JS `found=false` → return 1 → unclear + Wizard 1 %.

### Callers non branchés
`object_detect` / `trap_detect` C sont aussi scroll/potion/fountain. Ce commit les **exporte** depuis `detect.js`. Grep hors crystal ball : si `read.js`/`potion.js` n’appellent pas encore, le thin n’est mortel que pour la boule (detector null → `is_cursed=0`, donc le bras mimic maudit C est déjà inerte pour la boule). Le minvent **sans** curseur reste actif en C pour le *count*. Donc même detector=null, JS sous-compte.

`furniture_detect` est `static` en C — seulement crystal ball. JS `async function` non exporté. OK.

### `def_char_to_objclass`
C : boucle `i=1..MAXOCLASSES-1`, premier `def_oc_syms[i].sym == ch`, sinon MAXOCLASSES. JS table `DEF_OC_SYMS` indexée par classe. Ordre de première coincée : C est l’ordre des classes 1..n ; JS `for i=1; i<MAXOCLASSES`. Si deux classes partageaient un glyphe (non en défaut), C prend la plus petite. JS aussi. GOLD et GEM : C défaut `$` vs `*`. OK.

## Risques / dette
1. **`object_detect` faux négatif minvent/buried** — gaze chargé `'?'`/`')'` etc. peut dire unclear alors que C montre la carte. **Plus : `ret` change le `rn2(100)` Wizard.** Prioritaire si un seed applique la boule.
2. **`hcolor(null)` longueur de table** — RNG hallu (11 vs table C).
3. **`def_char_is_furniture` sans `}`** — fontaines → mauvais bras + RNG `level_detects`.
4. **`poly_gender` / `resists_blnd` / yn 4e arg** — affichage / case 3 fail / input.
5. **`useup`/`consume_obj_charge` locaux** — shop unpaid, invent unique.
6. **`**optr` non propagé** — explode vs `arti_speak` / callers.
7. Suite : object_detect buried+minvent (pour `ct`/`ret`, pas pour le polish) ; trap chest/door ; furniture defsyms+mimic ; brancher `invent.js:useup` ; table `hcolor` unique.

Le `consume_obj_charge` C facture le unpaid ; le local JS ne fait que `spe--`. Une boule de magasin n’émet pas le message d’addition. Nommés unpaid. Pas de RNG.

Le `consume_obj_charge` C facture le unpaid ; le local JS ne fait que `spe--`. Une boule de magasin n’émet pas le message d’addition. Nommés unpaid. Pas de RNG.

`arti_invoke` : import dynamique `detect.js` seulement si `otyp === CRYSTAL_BALL` et pas d’`inv_prop`. Les Eyes of the Overworld sont LENSES, pas cette arme. L’Orb of Detection (quest) est une boule : `is_quest_artifact` → oops=8, fail plus fréquent, explode case 5 **exclu** (n=4). JS `ncases = (oartifact || blessed) ? 4 : 5` — quest arti a `oartifact` set → 4 cases, **pas d’explode**. ≡ C `obj->oartifact || obj->blessed`.

## Verdict
- Verdict : ACCEPT-WITH-DEBT
- Note : 7/10
- Si je ne devais retenir qu’une critique : l’enveloppe `use_crystal_ball` (fail rnd 4/5, hallu, ordre furniture→obj→mon→trap) est lue dans C, mais un gaze chargé s’appuie sur un `object_detect` qui ignore buried/minvent — faux « rien détecté » que le D-log nomme « thin » sans dire que ça inverse `ret` et donc le Wizard 1/100.
