# Review 26 — `8cc67794cb544460fdab93b9355fcf0e78e6c172` — dig_up_grave + dighole IS_GRAVE

## Métadonnées
- Hash complet / court : `8cc67794cb544460fdab93b9355fcf0e78e6c172` / `8cc67794`
- Parent : `4ad939c99322d5a37d998b461a774b5f245caa04`
- Auteur, date : Raphaël Hervier, 2026-07-22 00:03 +0200 (Co-authored-by Cursor)
- D-id : D-0957
- Stats : 9 files, +205/−55
- Fichiers JS / map / cadence : `js/dig.js` seul côté JS ; `docs/c-js-map/debt.md` + `turns.md` ; journal rotaté ; CURRENT/NOTES/D-log. Pas de port mêlé à une cadence score.

## Intention vs livrable
Promesse : porter `dig_up_grave` et brancher `dighole` sur `IS_GRAVE`, pour que le pickaxe-down sur tombe suive align/WIS et les issues cadavre/undead.

Livrable : une fonction `dig_up_grave` + un `mk_tt_object` local + un `if (IS_GRAVE)` dans `dighole` qui fait `digactualhole(..., PIT)` puis `dig_up_grave`. D-id présent. Titre = diff. Pas de mélange cadence.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/dig.js` | Port C `dig_up_grave` + stub local `mk_tt_object` + wiring `dighole` |
| `docs/c-js-map/debt.md` / `turns.md` | Map : D-0957, dettes dig restantes |
| CURRENT / NOTES / D-INDEX/LOG / journal | Docs cluster ; journal affirme green+dig 16/16 |
| archive journal rotaté | Bruit cadence (ignoré sauf overclaim) |

## Fidélité C ↔ JS

### `dig_up_grave`
- Locus C : `nethack-c/upstream/src/dig.c:dig_up_grave` (~1027)
- Locus JS : `js/dig.js:dig_up_grave`
- Coords : `!cc` → `(ux,uy)` sinon `cc` + `isok` early-return. Identique.
- Ordre : `exercise(A_WIS, false)` ; Archeologist `adjalign(-sgn*3)` + despicable ; else Samurai `adjalign(-sgn)` + honorable dead ; else lawful `record > -10` alors `adjalign(-1)` + sanctity. Pas de RNG ici. Match.
- `what_happens = emptygrave ? -1 : rn2(5)` : JS `(lev.flags | 0) ? -1 : rn2(5)` sous l’hypothèse « emptygrave ≡ flags ». Si `lev.flags` sert à autre chose qu’emptygrave, le default « unoccupied » se déclenche trop souvent. Hypothèse structurante, pas prouvée dans ce commit.
- `switch` : 0/1 cadavre `mk_tt_object(CORPSE)` + `age -= TAINT_AGE+1` ; 2 zombie `makemon(mkclass(S_ZOMBIE,0), …, MM_NOMSG)` + pline hallu ; 3 mummy idem `S_MUMMY` ; default unoccupied. JS `mkclass('S_ZOMBIE')` / `'S_MUMMY'` suit la convention JS (mlet string), pas un char C — cohérent avec `mklev.js`.
- Aftermath : `typ=ROOM`, clear emptygrave/disturbed (`flags`/`horizontal`), `del_engr_at`, `newsym`. Match.
- `Hallucination` / `Blind` / `Role_if` / `sgn` locaux : OK pour ce helper.
- Commentaire JS « Named omit: none in this helper » : vrai pour le corps `dig_up_grave`, faux pour `mk_tt_object` (voir ci-dessous). Overclaim local.

### `mk_tt_object` (local)
- Locus C : `mkobj.c:mk_tt_object` → `tt_oname` → `get_rnd_toptenentry`
- C `get_rnd_toptenentry` : `fopen(RECORD)` ; **si fopen échoue, return NULL sans `rnd`** ; si succès, `rnd(sysopt.tt_oname_maxrank)` puis lecture. Si `tt_oname` échoue, `rn1(PM_WIZARD - PM_ARCHEOLOGIST + 1, PM_ARCHEOLOGIST)` + `set_corpsenm`.
- JS : toujours `rnd(10)` puis `set_corpsenm(..., rn1(...))`. Commentaire : « empty RECORD path burns rnd(10) then rn1 ». C’est le chemin **fopen réussi**, pas le chemin fopen fail (Rule #2 : pas de RECORD côté JS). Extra `rnd(10)` vs un C sans scoreboard.
- Pas d’attache de nom topten (`tt_oname`) — assumé empty, OK si on n’invente pas de noms, pas OK pour le compteur RNG.

### Wiring `dighole`
- C : après DRAWBRIDGE_DOWN et boulder, `IS_GRAVE` → `digactualhole(..., BY_YOU, PIT)` + `dig_up_grave(cc)` + `retval=TRUE`, puis plus tard `spot_checks`.
- JS (ce commit) : `IS_GRAVE` après les « too hard » throne/altar, avant `fillholetyp`. `BY_YOU` ≡ `game.youmonst`. `return true` **sans** `spot_checks` — nommé omis dans l’enveloppe `dighole`.
- À cette date boulder/drawbridge sont encore deferred : un grave sous boulder ne peut pas suivre l’else-if C (boulder gagne). Dette suivante (D-0962), nommée.

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/`getRngLog`/`readFileSync`/`fs`/`node:`/`fastforward`. Frozen non touchés. `await` = `pline` / `You_feel` / `digactualhole`. `mk_tt_object` n’ouvre pas de fichier (Rule #2 respectée) — le prix est un RNG approximé. RAS constitutionnel.

## Densité (§2b)
**Right size.** Une fonction C + son unique caller `dighole` + le helper `mk_tt_object` nécessaire au case 0/1. ~146 lignes JS. Ni peel d’un `if`, ni cluster multi-sous-systèmes.

## Documentation
- D-0957 fixed, locus `dig.c` + `mkobj.c mk_tt_object (topten-empty path)`. Le D-log **nomme** le chemin empty topten mais **ne dit pas** que JS brûle `rnd(10)` même quand C `fopen` échoue.
- Map : D-0957 en gras ; destroy_drawbridge / shopdig / impact_drop / mkcavearea / conjoined / autodig / boulder encore deferred. Honnête.
- Journal : green+strict ; dig/shared 16/16 ; fortress held, pas de full sessions. Affirmation.

## Vérification
Commandes non collées. Preuve = phrase journal. Cohort dig 16/16 plausible (pas de seed public de grave-robbing dans la fortress). Pas d’indice que ce commit casse #1270. Creuser une tombe n’est pas un chemin des 44 seeds ; le `rn2(5)` et le `rnd(10)` topten ne sont pas falsifiés par « fortress held ».

## Preuves C (extraits)

Alignement, avant tout RNG de contenu :

```c
exercise(A_WIS, FALSE);
if (Role_if(PM_ARCHEOLOGIST)) {
    adjalign(-sgn(u.ualign.type) * 3);
    You_feel("like a despicable grave-robber!");
} else if (Role_if(PM_SAMURAI)) {
    adjalign(-sgn(u.ualign.type));
    You("disturb the honorable dead!");
} else if (u.ualign.type == A_LAWFUL) {
    if (u.ualign.record > -10)
        adjalign(-1);
    You("have violated the sanctity of this grave!");
}
```

JS recopie ce triangle Archeologist / Samurai / lawful+record, y compris le `sgn` local. Un Chaotic Archeologist prend `adjalign(+3)` si `ualign.type < 0` — C et JS identiques. Pas de `rn2` ici : un mismatch align se verrait aux messages, pas au log RNG.

Contenu :

```c
what_happens = levl[dig_x][dig_y].emptygrave ? -1 : rn2(5);
```

JS : `(lev.flags | 0) ? -1 : rn2(5)`. Le commentaire C sur `emptygrave = 0 /* clear 'flags' */` et `disturbed = 0 /* clear 'horizontal' */` documente le packing bitfield `struct rm`. Le port JS a historiquement collé ces bits dans `flags`/`horizontal`. Si une tombe neuve a `flags===0`, `rn2(5)` part ; si `flags` a d’autres bits (décor), le default « unoccupied » gagne **sans** `rn2(5)` — extra ou manque d’un roll selon le packing réel.

`mk_tt_object` C :

```c
otmp = mksobj_at(objtype, x, y, initialize_it, FALSE);
if (!tt_oname(otmp)) {
    int pm = rn1(PM_WIZARD - PM_ARCHEOLOGIST + 1, PM_ARCHEOLOGIST);
    set_corpsenm(otmp, pm);
}
```

`tt_oname` → `get_rnd_toptenentry` → `fopen_datafile(RECORD)`. Échec fopen : `return NULL` **sans** `rnd`. Succès : `rnd(sysopt.tt_oname_maxrank)` (souvent 10). JS brûle toujours `rnd(10)` puis `rn1`. Rule #2 interdit l’fopen : le stub empty est légitime **si** on aligne le nombre de rolls sur le C harness. Le harness contest a-t-il un RECORD ? Si non, JS a un `rnd` de trop par cadavre de tombe.

`dighole` C (ordre else-if, ce commit ne porte pas encore boulder/db) :

```c
} else if (IS_GRAVE(old_typ)) {
    digactualhole(dig_x, dig_y, BY_YOU, PIT);
    dig_up_grave(cc);
    retval = TRUE;
}
spot_checks(dig_x, dig_y, old_typ);
return retval;
```

JS `return true` immédiat. `spot_checks` (liquides, objets, vision) sauté. Nommé dans l’enveloppe `dighole`, pas dans le helper.

## Callers
C `dig_up_grave` est `staticfn`, un seul caller : `dighole`. Le wiring JS est donc le graphe C complet pour cette fonction. `mk_tt_object` C a d’autres callers (statues topten, etc.) — le helper **local** à `dig.js` ne les sert pas. Correct pour D-0957, à ne pas réexporter comme `mkobj.js` « complete ».

`makemon(mkclass('S_ZOMBIE'|'S_MUMMY'))` : `mkclass` JS compare `mlet === 'S_ZOMBIE'`. C `mkclass(S_ZOMBIE)` avec `S_ZOMBIE` char. Convention interne JS déjà utilisée (`mklev.js`). Pas un bug de lettre `'Z'` vs string.

## Questions ouvertes
1. `lev.flags` est-il *uniquement* emptygrave sur une case GRAVE, ou un OR de bits ?
2. Le recorder C contest ouvre-t-il RECORD ? Si oui, `rnd(10)` JS est le bon ; si non, c’est un roll fantôme.
3. `digactualhole(..., game.youmonst, PIT)` : `madeby` JS traite-t-il `youmonst` comme C `BY_YOU` (`heros_fault`) ? Si `youmonst` est un objet différent, shop/align du PIT grave peuvent diverger.
4. Hallucination JS locale (`HHallucination \|\| E \|\| u.Hallucination`) vs macro C : même question youprop que D-0956.

## Risques / dette
1. **RNG `mk_tt_object`** : `rnd(10)` inconditionnel vs C `fopen` fail → 0 rolls. Toute tombe `rn2(5)∈{0,1}` décale le flux ensuite.
2. `emptygrave ≡ lev.flags` : si flags n’est pas le bit emptygrave, le default « Strange... » est trop fréquent (et saute `rn2(5)`).
3. `spot_checks` après grave encore omis (nommé).
4. Commentaire « omit: none in this helper » contredit `mk_tt_object`.
5. À cette date, boulder **avant** grave dans C n’est pas porté : un boulder sur tombe JS irait dans le bras grave. D-0962 corrigera l’ordre ; entre 0957 et 0962 c’est une fenêtre de divergence.
6. `Hallucination()` dupliqué dans `dig.js` au lieu d’un youprop partagé.

## Cohérence D-log / map
D-0957 fixed. JS : « port `dig_up_grave` + local `mk_tt_object` ; wire `dighole` IS_GRAVE → `digactualhole(..., PIT)` then `dig_up_grave` ». C’est exactement le diff. Deferred liste destroy_drawbridge, desecrate, shopdig, impact_drop, mkcavearea, conjoined, autodig, boulder-fill — le backlog dig de CURRENT. `turns.md` : une ligne `dig_up_grave` + IS_GRAVE. `debt.md` dig.js passe de « dig_up_grave … still deferred » à D-0957 en gras.

Le journal dit « empty topten path » : l’intention est le stub sans scoreboard. Le code brûle `rnd(10)` « after successful open ». Intention et implémentation ne racontent pas le même C. Un D-log honnête aurait écrit : « `mk_tt_object` JS = `mksobj_at` + `rnd(10)` + `rn1` role ; pas `tt_oname` ; diverges if C RECORD fopen fails ».

`Hallucination` / `sgn` / `Role_if` dupliqués dans `dig.js` : déjà le style du fichier (helpers locaux). Pas un nouveau smell.

Rotation journal `AGENT-LOOP-JOURNAL-rotated-2026-07-21-iter1227.md` : bruit d’archive, pas un overclaim.

## Diff JS — hors port
Imports nouveaux : `set_corpsenm`, `del_engr_at`, `exercise`/`A_WIS`, `IS_GRAVE`/`A_LAWFUL`, `TAINT_AGE`/`MM_NOMSG`, `PM_ARCHEOLOGIST`/`PM_SAMURAI`/`PM_WIZARD`, `CORPSE`. Tous servent le helper. Pas d’import mort.

`Hallucination()` / `sgn()` / `mk_tt_object()` locaux : `sgn` existe dans `attrib.js` ? Dupliquer `hacklib.c sgn` est le style dig.js (déjà `Role_if`, `Flying`). `mk_tt_object` **ne doit pas** être exporté tel quel (RNG topten faux) ; rester local est une mitigation.

`dighole` : un `if (IS_GRAVE)` + `return true`. Le reste du corps (fillholetyp, digactualhole HOLE/PIT) inchangé. Pas de régression silencieuse sur le default room-hole, sauf si une case GRAVE était déjà tombée dans fillholetyp avant (typ GRAVE n’est pas ROOM) — le bras nouveau **empêche** un fillhole sur tombe, ce qui est le C.

Archive journal rotaté : hors scope reviewer (bruit). CURRENT next-cluster retire « grave », garde destroy_drawbridge/shopdig/… Ordre de travail du loop, pas une spec.

## Synthèse
Un fichier JS, une fonction C + un stub topten. Densité §2b idéale. Le `switch` align/`rn2(5)`/makemon est le C. Le seul RNG inventé est `rnd(10)` topten. `emptygrave≡flags` est une hypothèse de packing `struct rm`. Fortress 16/16 ne creuse pas de tombes. ACCEPT-WITH-DEBT : on garde le helper, on refuse de croire `mk_tt_object` « empty path » sans coller le compteur `rnd` au fopen C.

## RNG et callers — rappel
- `exercise`/`adjalign` : pas de RNG.
- `rn2(5)` ssi `!emptygrave` (JS `!flags`).
- Cases 0/1 : `mksobj_at` (RNG objet) + `rnd(10)` JS extra + `rn1(role)`.
- Cases 2/3 : `mkclass` + `makemon` (RNG spawn). Blind skip pline, pas skip makemon — comme C.
- Default : un pline, 0 RNG.
- `dighole` avant ce bras : `dig_check` déjà tiré. Après : `spot_checks` C (omis).
Caller unique `dighole`. Pas de `zap_dig` grave. Une tombe détruite par wand passerait `digactualhole` sans `dig_up_grave` — C aussi (grave est dans `dighole` seulement).

## Ce que je ne pénalise pas
Je ne pénalise pas l’absence de `tt_oname` réel (Rule #2 : pas de RECORD). Je pénalise le `rnd(10)` présenté comme le chemin empty. Je ne pénalise pas `mkclass('S_ZOMBIE')` string vs char C — convention JS déjà partout. Je ne pénalise pas le `return true` vs `retval=TRUE`+spot_checks au-delà du named omit déjà sur `dighole`. Le helper `dig_up_grave` corps (WIS, rôles, switch 0–3, ROOM, engr) est du C lu.

## CURRENT au hash
Next-cluster retire grave, garde destroy_drawbridge / desecrate / shopdig / impact_drop / mkcavearea / conjoined. Keep D-0957 « do not re-stub ». NOTES fortress @#1227 green+dig. Cadence encore @#1230. Le loop sait que ce n’est pas un score refresh. Process propre (contrairement à D-0960).

## Annexe — ordre de lecture C
1. `dig.c:dighole` else-if IS_GRAVE (après boulder C, ici encore avant boulder).
2. `dig.c:dig_up_grave` entier (~60 lignes).
3. `mkobj.c:mk_tt_object` + `topten.c:get_rnd_toptenentry` fopen.
4. `makemon.c:mkclass` déjà porté.
Le reviewer a lu 1–3. 4 est présupposé. `BY_YOU` macro = `&gy.youmonst`.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7/10**
- Si je ne devais retenir qu’une critique : le `switch` align/WIS/`rn2(5)` de `dig_up_grave` est fidèle, mais le `rnd(10)` local de `mk_tt_object` n’est pas le C topten-empty (fopen fail = pas de `rnd`).
