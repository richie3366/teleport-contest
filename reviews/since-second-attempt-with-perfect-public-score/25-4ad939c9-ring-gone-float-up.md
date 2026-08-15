# Review 25 — `4ad939c99322d5a37d998b461a774b5f245caa04` — Ring_gone / float_up / rescham / choke / set_mimic_blocking

## Métadonnées
- Hash complet / court : `4ad939c99322d5a37d998b461a774b5f245caa04` / `4ad939c9`
- Parent : `b65a975e6952d0585d567a34b5ab3cc6b7a9b427`
- Auteur, date : Raphaël Hervier, 2026-07-21 23:59 +0200 (Co-authored-by Cursor)
- D-id : D-0956
- Stats : 14 files, +440/−73
- Fichiers JS / map / cadence : `js/do_wear.js`, `js/eat.js`, `js/makemon.js`, `js/mon.js`, `js/sit.js`, `js/trap.js`, `js/vision.js`, `js/zap.js` ; map `docs/c-js-map/debt.md` ; CURRENT/NOTES/D-log/journal. Pas de cadence.

## Intention vs livrable
Le message promet un cluster eataccessory : `Ring_gone`, `float_up`, `rescham`, `choke`, `set_mimic_blocking`, pour que la digestion d’accessoires suive le C.

Le diff le fait : helpers extraits, bras `eataccessory` dé-stubés, `attrcurse` SEE_INVIS branché, `normal_shape` déplacé `zap.js` → `mon.js`. Ce n’est pas un peel FAIL. Écart : le titre liste cinq fonctions C, le livrable en touche huit modules JS (dont un export `pm_to_cham` et un relocation). Le D-id est présent. Pas de mélange cadence.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/do_wear.js` | Port C : `Ring_off_or_gone` / `Ring_gone` |
| `js/eat.js` | Wiring `eataccessory` + port `choke` / `perceives` / `Strangled` |
| `js/trap.js` | Port C : `float_up` |
| `js/mon.js` | Port C : `normal_shape` / `rescham` / `restartcham` / `m_restartcham` |
| `js/vision.js` | Port C : `set_mimic_blocking` / `mimic_light_blocking` |
| `js/sit.js` | Wiring : `attrcurse` SEE_INVIS → `set_mimic_blocking` |
| `js/zap.js` | Relocation : `normal_shape` retiré (import depuis `mon.js`) |
| `js/makemon.js` | Wiring : `pm_to_cham` exporté pour `restartcham` |
| `docs/c-js-map/debt.md` | Map : D-0956 marqué, polish restant nommé |
| CURRENT / NOTES / D-INDEX/LOG / journal | Cadence docs de cluster |

## Fidélité C ↔ JS

### `Ring_off_or_gone` / `Ring_gone`
- Locus C : `nethack-c/upstream/src/do_wear.c:Ring_off_or_gone` / `Ring_gone`
- Locus JS : `js/do_wear.js:Ring_off_or_gone` / `Ring_gone`
- C distingue `gone` : `setnotworn(obj)` vs `setworn(NULL, obj->owornmask)`. JS fait `void gone` puis `setworn(null, W_RINGL/R)` dans les deux cas. Pour le chemin eat (`gone===true`) ce n’est pas `setnotworn`.
- C `RIN_LEVITATION` : `float_down(0,0)` sauf `BLevitation & FROMOUTSIDE`, sinon `float_vs_flight()`. JS appelle toujours `float_vs_flight()` (import dynamique `polyself.js`) — `float_down` nommé omis.
- C `toggle_stealth`, `learnring`, `adjust_attrib` STR/CON/CHA : omis, nommés dans le commentaire de fonction.
- C `RIN_PROTECTION` : `learnring` puis `find_ac` si `spe`. JS : seulement `find_ac` si `spe`.
- Callers C hors eat : `mhitu.c`, `steal.c`, `zap.c`, `read.c`. Seul `eataccessory` est branché ici. D-log réduit ça à « sink-fall death ».
- Confirmation utile : `RIN_WARNING` → `see_monsters` ; `RIN_SEE_INVISIBLE` → `set_mimic_blocking`+`see_monsters` si `!See_invisible` ; PfSC → `restartcham` si plus protégé. Ces bras matchent l’ordre C.

### `choke`
- Locus C : `eat.c:choke`
- Locus JS : `eat.js:choke` (local, pas exporté)
- Branches : `uhs != SATIATED` + garde AoS ; Knight lawful `adjalign(-1)` + glutton ; `exercise(A_CON, false)` ; `Breathless \|\| Hunger \|\| (!Strangled && !rn2(20))` vomit vs `done(CHOKING)`. Ordre et `rn2(20)` identiques.
- Écart : C `killer_xname(food)` vs JS `xname(food)` — nommé. `vomit()` JS est synchrone : pas de `await` manquant.
- Callers : seul `eataccessory` AoS. C `lesshungry` / nourriture multi-tour nommé omis.

### `float_up`
- Locus C : `trap.c:float_up`
- Locus JS : `trap.js:float_up`
- Ordre des `if` : `utrap` PIT / LAVA|INFLOOR / BURIEDBALL / WEB / else(bear) ; puis `uinwater` → `spoteffects` ; swallow ; Hallucination ; airlevel ; default. Puis steed, Flying, `float_vs_flight`, `encumber_msg`. C’est l’enveloppe C.
- Écart concret : C teste `u.utraptype == WEB` (`trap.h` WEB=18) alors que `utraptype` est `TT_WEB=3`. La branche toile C est morte. JS utilise `TT_WEB` (sémantiquement juste, pas 1:1 avec le C littéral).
- Swallow animal : C `surface(u.ux,u.uy)` vs JS `'floor'` — nommé.
- Steed : C `Lev_at_will` float vs dismount. JS dismount toujours — nommé.
- `Flying` C inclut le steed flyer (`youprop.h`). `Flying_fu()` JS ne le fait pas. Non nommé dans les omissions `float_up`.

### `rescham` / `normal_shape` / `restartcham`
- Locus C : `mon.c:normal_shape` / `rescham` / `m_restartcham` / `restartcham`
- Locus JS : `mon.js` (mêmes noms) ; `pm_to_cham` exporté depuis `makemon.js`
- `rescham` = iter `normal_shape` : JS saute `mhp<=0`, C `iter_mons` saute `DEADMONSTER` / offmap. OK.
- `normal_shape` : cham `newcham` + restore `mcan` + `newsym` — présent. C `is_were` → `new_were` : omis, nommé dans le commentaire JS (« were/meating deferred »), **absent** de la liste Deferred du D-log.
- `finish_meating` si `meating` : omis, nommé.
- `restartcham` / `m_restartcham` : `cham = pm_to_cham` si `!mcan` ; mimic endormi `set_mimic_sym`+`newsym`. Fidèle.

### `set_mimic_blocking`
- Locus C : `display.c:mimic_light_blocking` / `set_mimic_blocking`
- Locus JS : `vision.js` (fichier 1:1 imparfait : C est `display.c`)
- C : si `minvis && is_lightblocker_mappear` alors `See_invisible ? block_point : unblock_point`. JS : `recalc_block_point` seulement. Approximation vision, pas le toggle C.
- Callers branchés : `eataccessory` SEE_INVIS + `sit.js attrcurse`. C aussi `potion.c`, `timeout.c`, `do_wear.c` Ring_on, `polyself.c`. Potion nommé dans le D-log.

### `eataccessory` wiring
- `Ring_gone` await + `uhp<=0` return : comme C.
- SEE_INVIS : `set_mimic_blocking` ; garde `perceives(hero_form_data())` au lieu du stub. C `perceives(gy.youmonst.data)`.
- PfSC → `rescham()` ; LEVITATION → `float_up` puis `d(10,20)` ; AoS → `choke(otmp)`. Ordre du `switch` interne conservé.

## Constitution / playbook
Grep du diff JS : pas de `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `fs`/`node:`, `fastforward`, coordonnées/seeds dans le contrôle. Frozen non touchés. `await` = `pline` / `float_up` / `Ring_gone` / `dismount` / `done` — pas d’I/O hors `nhgetch`. Imports dynamiques `polyself.js` / `dig.js` / `steed.js` : anti-cycle, pas une 2ᵉ frontière input. Helpers `See_invisible_dw` dupliqués au lieu de partager `youprop` — odeur, pas ban. RAS constitutionnel après grep.

## Densité (§2b)
**Right size, bord haut.** Pas « too wide » au sens sous-systèmes sans lien : c’est une famille caller/callee autour d’`eataccessory` (playbook §2b). `sit.js` est le même bras SEE_INVIS. `zap.js` est un relocation. `makemon.js` est un export de helper. 8 fichiers JS / 14 total, c’est le plafond d’un cluster, pas un inventaire de dettes unrelated. Ce n’est pas too small.

## Documentation
- D-0956 **Status: fixed** avec Deferred listé : sink-fall, float_down/learnring/adjust_attrib, buried_ball, Lev_at_will, choke multi-tour, potion set_mimic. Honnête pour ces items.
- Trou : `new_were` dans `normal_shape` n’est **pas** dans le Deferred D-log (seulement le commentaire JS). Callers `Ring_gone` hors eat réduits à « sink-fall ».
- Map `debt.md` : D-0956 en gras, polish restant nommé. CURRENT next-cluster avance. Journal : green+eat 17/17, pas de commande collée.

## Vérification
Journal : « green+strict PASS ; eat/shared cohort 17/17 PASS ». Affirmation, pas de transcript. Pas de full `sessions` (cadence #1230 encore à venir). Fortress déclarée tenue @#1226. Rien dans ce commit qui explique un 43/44 ultérieur. Un cohort eat/shared 17/17 n’exerce presque certainement pas AoS `choke` mortel, ni `float_up` hors pit, ni `rescham` sur une horde de cham — c’est une forteresse, pas un test des bras portés.

## Preuves C (extraits)

`Ring_off_or_gone` distingue destruction et retrait :

```c
if (gone)
    setnotworn(obj);
else
    setworn((struct obj *) 0, obj->owornmask);
```

JS ignore `gone` et force `setworn(null, W_RING*)`. C `RIN_LEVITATION` :

```c
if (!(BLevitation & FROMOUTSIDE)) {
    (void) float_down(0L, 0L);
    if (!Levitation) learnring(obj, TRUE);
} else {
    float_vs_flight();
}
```

JS : uniquement `float_vs_flight()`. `choke` C vs JS : même `rn2(20)` court-circuité après `!Strangled`. `float_up` C teste `u.utraptype == WEB` (valeur 18) ; l’enum `TT_WEB` vaut 3 — branche morte côté C, vivante côté JS.

`set_mimic_blocking` C :

```c
if (mtmp->minvis && is_lightblocker_mappear(mtmp)) {
    if (See_invisible) block_point(mtmp->mx, mtmp->my);
    else unblock_point(mtmp->mx, mtmp->my);
}
```

JS : `recalc_block_point` inconditionnel si minvis+blocker.

## Callers C non branchés (inventaire)
- `Ring_gone` : `eat.c` (branché), `mhitu.c` (deux mains), `steal.c`, `zap.c`, `read.c`.
- `float_up` : `eat.c` (branché), `do_wear.c` Ring_on, `potion.c`, `artifact.c`, `hack.c`, `trap.c` (autre site).
- `set_mimic_blocking` : eat + sit (branchés) ; `potion.c`, `timeout.c`, `do_wear.c` Ring_on, `polyself.c`.
- `choke` : eataccessory (branché) ; `lesshungry` / occupation food C.

Le cluster « eataccessory » est donc réel, mais les helpers sont des armes chargées pour d’autres modules. Les laisser exportés sans callers est OK si nommé ; le D-log sous-nomme.

## Helpers youprop dupliqués
`do_wear.js` invente `See_invisible_dw` / `Invis_dw` / `Invisible_dw` / `Blind_dw` / `Protection_from_shape_changers_dw` qui OR-ent `H*`/`E*`/`u.See_invisible`/`uprops[]`. C `See_invisible` est `H \|\| E` seulement. JS est plus large (défensif) — peut masquer un `uprops` mal synchronisé plutôt que de le révéler. `eat.js` a déjà ses propres prédicats. Deux politiques youprop dans le même cluster.

`Ring_off_or_gone` importe dynamiquement `./polyself.js` au case LEVITATION. Ce n’est pas un `await` gameplay ; c’est un anti-cycle. Coût : le premier eat d’anneau de lévitation charge un module entier au milieu d’un `switch` C synchrone.

## `eataccessory` RNG
Le commit ne touche pas la porte `rn2(3)`/`rn2(5)`. C : `if (!rn2(ring?3:5)) { switch }`. JS préexistant : `if (rn2(chance)) return` puis switch — équivalent (effet ssi 0). Les bras nouvellement branchés (SEE_INVIS / PfSC / LEV / choke) ne tirent du RNG **que** si cette porte s’ouvre, plus `float_up`/`choke` internes (`rn2(20)`, `d(10,20)` lev). Ordre : `Ring_gone` d’abord (peut tirer via `float_vs_flight` plus tard, pas ici), puis `observe`, puis `rn2`. Identique au C.

## Questions ouvertes
1. `setnotworn` vs `setworn(null)` sur le chemin `gone` : est-ce que `setnotworn` JS existe déjà et aurait dû être appelé ?
2. `normal_shape` `new_were` : omission volontaire ou oubli de liste Deferred ?
3. `float_up` `TT_WEB` : divergence volontaire « C bugfix » ou accident ? Un reviewer 1:1 devrait coller le C mort (`WEB=18`) ou documenter le fix sémantique.
4. Pourquoi exporter `Ring_gone` si les callers mhitu/steal/zap/read restent stubs ?

## Risques / dette
1. `Ring_off_or_gone` : `gone` ignoré ; `float_down` absent — porter un anneau de lévitation retiré autrement que par eat diverge.
2. `new_were` absent de `rescham` : lycanthropes sous PfSC. Nommé dans le commentaire JS, pas dans le D-log.
3. `set_mimic_blocking` via `recalc_block_point` ≠ `block_point`/`unblock_point`.
4. Callers C `Ring_gone` / `float_up` / `set_mimic_blocking` non branchés (mhitu, steal, potion, timeout).
5. `Flying_fu` sans steed flyer — message « no longer able to control your flight » saute à cheval volant.
6. `learnring` / `adjust_attrib` / `toggle_stealth` : polish Ring_off, impact identification et STR/CON/CHA.
7. Densité : 8 JS files. Si un iter ultérieur touche `sit.js` sans re-lire D-0956, le lien SEE_INVIS se perd.

## Cohérence D-log / map
D-0956 Status **fixed (map-driven debt retirement)**. Le mot « fixed » dans ce dépôt veut dire « la dette nommée est retirée », pas « le C est entier ». Ici la dette eataccessory *est* retirée (bras plus stub). Les polish Ring_off restent dans `debt.md` eat.js : « sink-fall death / float_down / learnring / adjust_attrib polish ». Map honnête. D-log Deferred omet `new_were` et les callers mhitu/steal. CURRENT Keep ajoute D-0956 « do not re-stub » — un re-stub des bras eataccessory serait une régression ; un re-stub de `float_down` n’est pas protégé (il n’a jamais été porté).

Journal #1226 date 22:00 vs AuthorDate 23:59 : le tampon journal n’est pas l’heure du commit. Cosmétique.

`is_lightblocker_mappear` passe de `function` à `export` : callers futurs display/vision. Pas un port nouveau, un élargissement de visibilité. `zap.js` perd `normal_shape` local : `cancel_monst` importe depuis `mon.js`. Un seul corps — bien.

## Diff JS — hors port
Imports : `SEE_INVIS` déjà là ; ajout `PROT_FROM_SHAPE_CHANGERS` était déjà dans eat, `CHOKING`/`STRANGLED`/`A_LAWFUL`/`M1_SEE_INVIS`/`adjalign`/`PM_KNIGHT` pour choke. `Ring_gone` import `do_wear.js` : cycle potentiel eat↔do_wear (do_wear n’importe pas eat). `float_up` depuis trap : trap n’importe pas eat. `rescham` depuis mon. `set_mimic_blocking` depuis vision.

`makemon.js` : `export` sur `pm_to_cham` seulement. Pas de changement d’algo.

`sit.js` : un appel, un import. Commentaire header D-0956. Densité minimale mais le bras C `attrcurse` SEE_INVIS est `set_mimic_blocking(); see_monsters(); newsym`. JS avait déjà see_monsters+newsym ; n’ajoute que blocking. C `sit.c:709`.

`zap.js` : suppression sèche de `normal_shape` local + import. `cancel_monst` continue d’appeler `normal_shape` — même symbole, autre module. Pas de changement de branches zap.

Header `eat.js` : retire la ligne « Ring_gone sink-fall / float_up / … polish » des omissions, la pose en D-0956. C’est le contrat map du fichier, pas du bruit.

## Synthèse
Cluster eataccessory : cinq fonctions C, huit fichiers JS, une famille caller/callee. Pas too wide. Constitution RAS (grep). Preuve de suite = affirmation 17/17, pas les bras mortels. Dette réelle = `Ring_off_or_gone` non-C (`gone`/`float_down`) et `new_were` hors D-log. Helpers exportés utiles plus tard, dangereux si un caller mhitu les prend pour complete. Note 7 : le travail est le bon cluster au bon moment (forteresse, map-driven) ; la lecture C de `Ring_off_or_gone` est paresseuse.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7/10**
- Si je ne devais retenir qu’une critique : le cluster eataccessory est légitime (pas trop large), mais `Ring_off_or_gone` n’est pas le C — `void gone` + jamais `float_down` — alors que le D-log vend un `Ring_gone` « fixed ».
