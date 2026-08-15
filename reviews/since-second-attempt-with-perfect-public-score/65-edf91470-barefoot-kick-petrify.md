# Review 65 — `edf91470` — D-0995 barefoot kick petrify + bhit DISP_FLASH

## Métadonnées
- Hash complet / court : `edf9147043a532df4f8aaa92bdce56525aadeab0` / `edf91470`
- Parent : `501926dbc432297c675c1271201dc8f421cac221`
- Auteur, date : Raphaël Hervier, mercredi 22 juillet 2026 04:25:37 +0200
- D-id : **D-0995**
- Stats : 11 files, **+260 / −141**
- Fichiers JS / map / cadence : `js/dokick.js`, `js/trap.js`, `js/zap.js` ; `docs/c-js-map/absent.md`, `docs/c-js-map/debt.md` ; **cadence #1265 mêlée au port** (CURRENT/NOTES/journal)

## Intention vs livrable
Le message promet un cluster map-driven (`instapetrify`, kick pieds nus cockatrice, `bhit` flash) **et** un refresh cadence #1265 à 43/44. Le diff JS fait bien ces trois locus. L’écart process est le mélange score+port dans le même commit (playbook : cadence tous les 5 **ou** cluster, pas les deux collés). Le titre ne survend pas un « complete petrify » : `selftouch` / `minstapetrify` restent hors scope (D-0996).

Les −141 ne sont pas une amputation silencieuse de C : quasi tout est le re-retrait de `bhit` dans un `try/finally` + `DISP_FLASH`. Le corps WATERWALL / `hits_bars` / mon-stop / `ship_object` / `ZAP_POS` est le même qu’au parent, avec flash et `nh_delay_output` **ajoutés**.

## Inventaire

| Fichier | Rôle |
|---------|------|
| `js/trap.js` | Port C : `instapetrify` |
| `js/dokick.js` | Port C : bras barefoot de `really_kick_object` + stub `body_part` |
| `js/zap.js` | Port C : `bhit` trail `DISP_FLASH` / `DISP_END` |
| `docs/c-js-map/absent.md`, `debt.md` | Docs : retraite partielle du named omit |
| `docs/CURRENT.md`, `NOTES.md`, D-INDEX/LOG, journal | Cadence 43/44 + D-0995 |
| `docs/archive/…iter1265.md` | Archive journal |

`git show --stat` : 11 files. JS net +255−141 sur 3 modules. Docs = le reste (journal rotate inclus). Le −141 est **zap.js** (re-indent), pas trap/dokick.

## Fidélité C ↔ JS

### `instapetrify`
- Locus C : `nethack-c/upstream/src/trap.c:instapetrify` (~3844)
- Locus JS : `js/trap.js:instapetrify`

C, ordre strict :

```3844:3855:nethack-c/upstream/src/trap.c
instapetrify(const char *str)
{
    if (Stone_resistance)
        return;
    if (poly_when_stoned(gy.youmonst.data) && polymon(PM_STONE_GOLEM))
        return;
    urgent_pline("You turn to stone...");
    svk.killer.format = KILLED_BY;
    if (str != svk.killer.name)
        Strcpy(svk.killer.name, str ? str : "");
    done(STONING);
}
```

JS reproduit les trois sorties : résistance → return ; `poly_when_stoned` && `polymon(PM_STONE_GOLEM)` → return ; sinon `urgent_pline` + `killer.format = KILLED_BY` + `done(STONING)`. Pas de RNG ici (C non plus). `Stone_resistance` est reconstruit `u.Stone_resistance \|\| H \|\| E` au lieu de la macro youprop — même sémantique plate, pas les wards artefact. `poly_when_stoned(youData, game.mvitals)` passe `mvitals` pour le gate `G_GENOD` du golem de pierre (C lit `svm.mvitals` en interne) : correct.

**Écart concret :** après `done(STONING)`, C ne revient que si life-save ; JS `await done(STONING)` revient toujours. Le caller kick **continue** le coup (poids, `bhit`, etc.) même si le héros est mort, sauf si `done` pose `gameover` et que les callers le testent — `really_kick_object` ne le teste pas. Chemin mort-state sensible, non nommé dans le D-log.

### `really_kick_object` bras barefoot
- Locus C : `dokick.c:really_kick_object` (~542–556)
- Locus JS : `js/dokick.js:really_kick_object`

C : `!uarmf && CORPSE && touch_petrifies && !Stone_resistance` **après** pit/web refuse et **après** Fumbling `!rn2(3)`, **avant** le calcul de range. JS : même place (STATUE_TRAP encore commenté « deferred » — honnête). RNG Fumbling inchangé.

C message : `corpse_xname(..., CXN_PFX_THE)` + `makeplural(body_part(FOOT))`. JS : ``the(cxname(kicked))`` + `makeplural(body_part(FOOT))`. Puis C `poly_when_stoned && polymon` → kick continues ; sinon `killer_xname` dans `svk.killer.name` puis `instapetrify`. JS : `instapetrify(\`kicking ${cxname(kicked)} barefoot\`)`. **Écart nommé** : `killer_xname` vs `cxname` (articles / stack / Hallu). Stub local `body_part` : FOOT→foot, LEG→leg, sinon `body` — table poly C absente (commentaire « full poly table deferred »).

Callers : un seul, `kick_object` → `really_kick_object`. Pas de stub `TODO`. Pas d’early-return non-C sur ce bras : après poly le kick **continue**, comme C (`; /* hero has been transformed but kick continues */`).

### `bhit` DISP_FLASH
- Locus C : `zap.c:bhit` (~3846–4127)
- Locus JS : `js/zap.js:bhit`

C allume le trail ainsi : FLASHED_LIGHT → `DISP_BEAM` ; tethered → `DISP_TETHER` + `obj_to_glyph(..., rn2_on_display_rng)` ; sinon si `!= ZAPPED_WAND && != INVIS_BEAM` → `tmp_at(DISP_FLASH, obj_to_glyph(obj, rn2_on_display_rng))`. JS : `do_flash = weapon !== ZAPPED_WAND && weapon !== INVIS_BEAM && !!obj` puis `tmp_at(DISP_FLASH, obj_glyph(obj))`.

**Écarts concrets :**
1. **RNG display :** C consomme `rn2_on_display_rng` dans `obj_to_glyph`. JS `obj_glyph` sans ce tirage. Nommé (`Hallucination rn2_on_display_rng`). Ce n’est **pas** le log positionnel ISAAC — cohérent avec RNG 100 % public si le display RNG est hors trace.
2. **FLASHED_LIGHT :** C ne passe pas par `DISP_FLASH`. JS `do_flash` serait vrai si un caller FLASHED_LIGHT fournit `obj`. Named omit : callers FLASHED_LIGHT / INVIS_BEAM. Risque si un caller existant réutilise `bhit` avec ces armes.
3. **FINALLY vs gotos C :** C `tmp_at(DISP_END)` sur hit mon, `ship_object`, et en sortie de boucle. JS `try/finally` si `do_flash`. Pour KICKED_WEAPON avec `obj`, équivalent. `!!obj` est plus défensif que C (qui suppose `obj`).

Le déplacement pool/lava/sink **dans** le bras `do_flash` (après `tmp_at(x,y)` + `nh_delay_output`) matche C (~4081–4093). La copie `else if (weapon !== ZAPPED_WAND && !== INVIS_BEAM)` pour le cas non-flash est redondante, pas une perte de C.

`hits_bars(..., point_blank ? 0 : !rn2(5), 1)` : clang LTR inchangé (déjà D-0990).

### Ce que les −141 ne sont pas
Parent `bhit` : `while (r-- > 0) { ... point_blank = false; } return result;`
Nouveau : même `while`, indenté sous `try`, plus `do_flash` init, `tmp_at(DISP_FLASH)` avant boucle, `finally { tmp_at(DISP_END, 0) }`. Aucune branche WATERWALL / bars / `fhitm` / `bhitpile` / coin pile / `ship_object` / `ZAP_POS` / sink n’est **supprimée**. Le seul réordonnancement sémantique est pool/lava/sink **après** `tmp_at(x,y)+delay` dans le bras flash — c’est **C** (~4081–4093), pas une perte.

C après la boucle :

```4125:4127:nethack-c/upstream/src/zap.c
    if ((weapon != ZAPPED_WAND && weapon != INVIS_BEAM && !tethered_weapon)
        || (was_returning && was_returning != iflags.returning_missile))
        tmp_at(DISP_END, 0);
```

JS n’a pas tethered / returning_missile (named omit). `finally` si `do_flash` couvre kicked/thrown avec obj. Un `break` mid-loop (monstre, pool, bars) exécute quand même `DISP_END` — C aussi via goto/`tmp_at` avant `bhit_done` sur hit mon et `ship_object`.

C `THROWN_WEAPON && ROCK` : `skiprange` + `allow_skip = !rn2(3)` **avant** le trail. JS ne porte pas THROWN skip (header named omit THROWN_WEAPON callers). **Pas un `rn2` sauté sur le chemin KICKED** de ce cluster.

C `is_pick(obj) && inside_shop && shkcatch` : omis. Kick d’une pioche en boutique : C peut `DISP_END` + return shk. JS continue. Named omit `shkcatch`. Hors kick cadavre.

### `kick_object` vs `really_kick_object`
C jacket `kick_object` appelle `really_kick_object` ; le bras petrify est **dans** really, pas dans le jacket. JS idem. Pas de double `instapetrify`. `kickedobj` C global `gk.kickedobj` ; JS `game.kickedobj`. Préexistant.

### `polymon` / `done`
`await polymon(PM_STONE_GOLEM)` : C `polymon` retourne booléen (succès forme). JS async — `polymon` peut `nhgetch` si messages More. Court-circuit `&& (await polymon(...))` : si `poly_when_stoned` false, **pas** d’appel polymon (C `&&` identique). Si poly échoue, chute dans `instapetrify` — C identique.

`done(STONING)` : C `end.c` peut poser bones/explore. JS `await done(STONING)` — frontière death déjà là pour d’autres how. Killer `format=KILLED_BY` + `name=str` avant. C `if (str != svk.killer.name) Strcpy` évite copie alias ; JS assigne toujours `String(str)`. Pas d’alias buffer JS. RAS.

### `body_part` local dokick
Deux stubs : `trap.js` (préexistant) et **nouveau** dans dokick. C `mondata.c body_part` table poly (sabot, etc.). Un golem/centaure kick pieds nus dirait encore « feet ». Commentaire « full poly table deferred ». Doublon = risque de diverger plus tard.

## Constitution / playbook
Grep du diff JS : pas de `FORCE` / `DIAG` / `getRngLog` / `readFileSync` / `fs` / `node:` / `fastforward` add / coordonnées / noms de seeds dans le contrôle. `FORCETRAP` est une constante piège, pas un shim. Frozen non touchés.

`await nh_delay_output()` dans `bhit` : pas un `nhgetch` ; c’est le délai d’affichage C. Pattern déjà présent ailleurs dans zap. `await instapetrify` / `await polymon` / `await done` : `done` peut ouvrir des prompts death/explore — **frontière input** héritée de `done`, pas inventée ici.

1:1 modules : `instapetrify` dans `trap.js` (C `trap.c`) ; `bhit` dans `zap.js` ; kick dans `dokick.js`. RAS. Omissions nommées dans le header `bhit` et le D-log (pas « complete »).

## Densité (§2b)
**Right size**, avec **mélange cadence**. Trois fonctions d’une même famille kick/projectile (caller `really_kick_object` → `bhit` KICKED ; callee `instapetrify`). ~50–300 LOC JS utiles. Pas un `if` isolé. Le refresh #1265 dans le même commit est trop large **process** (deux hypothèses : score + petrify), pas trop large **sémantique**.

## Documentation
D-log **fixed**, pas « complete ». Deferred list honnête : `minstapetrify`, `selftouch`, STATUE_TRAP, Blind feel, `killer_xname`, display RNG. CURRENT passe #1260→#1265 **43/44** seed0009 Scr 72/73 — chiffres cohérents avec le parent (déjà 43/44 @#1260). NOTES « do not chase as recent-port » : ce commit ne **crée** pas le 43/44, mais le mélange cadence+port empêche de séparer un éventuel drift écran du port.

Index : « green+kick/throw cohort 11/12 (seed0009 pre-existing) ; cadence 43/44 @#1265 ». Overclaim : aucun sur le C porté ; underclaim mort-state `done` qui continue.

`absent.md` / `debt.md` : le hunk retire barefoot/tmp_at de la liste de planning. STATUE_TRAP / Blind restent (D-0997). Cohérent. CURRENT « Do not re-stub instapetrify/barefoot/bhit flash (D-0995) » : protection de régression, pas une claim de couverture totale.

Journal #1265 titre « cadence + D-0995 » : **avoue le mélange**. Playbook : « Un cadence commit qui porte du C en plus est un mélange — le flaguer. »

## Vérification
Journal : green+strict PASS ; cohort kick/throw **11/12** ; full sessions **43/44** Scr 11404/11405 RNG 100 %. Preuve **affirmée** dans le journal, pas de log runner dans le commit. Green gate non collé en output. La 12ᵉ session du cohort est seed0009 (FAIL écran pré-existant depuis #1245, pas depuis ce hash). Mélange cadence+port : on ne peut pas attribuer le 43/44 à D-0995.

Commandes **citées** (CURRENT green gate, inchangées) :

```
node frozen/ps_test_runner.mjs sessions/seed8000-... sessions/seed0900-...
node scripts/strict-output-check.mjs <same>
node frozen/ps_test_runner.mjs sessions   # cadence #1265
```

Aucune de ces sorties n’est dans le tree du commit. On a le **résumé** 43/44 / 11/12. Un kick cockatrice n’est probablement **dans aucune** session publique — le cohort « kick/throw » teste surtout D-0988…D-0990, pas `instapetrify`. Held-out hardening sans canary C nommé.

`nh_delay_output` sur chaque case de vol kicked : si une session kick un objet à travers plusieurs cases, **timing d’écran** (pas RNG positionnel). Cadence RNG 100 % ne le voit pas ; Scr 11404/11405 = seed0009 seul, donc pas de nouvel écran cassé **mesuré**.

## Risques / dette
1. **Mort-state :** `really_kick_object` continue après `await instapetrify` même si `done(STONING)` a tué le héros (life-save vs gameover JS). Range/`bhit`/flooreffects après un STONING fatal = objets qui volent sur un cadavre.
2. **`killer_xname` / `corpse_xname`** : killer string et topline peuvent diverger (écran death / replay). C `kicking %s barefoot` avec `killer_xname` (souvent « a cockatrice corpse ») vs JS `cxname`.
3. **`body_part` stub** local à dokick (doublon trap.js) : poly forme ≠ pied.
4. **STATUE_TRAP** encore no-op ici (corrigé D-0997) — ordre C statue **avant** Fumbling, donc un kick statue+fumbling n’était toujours pas C.
5. **FLASHED_LIGHT** + `do_flash` si obj présent : mauvais glyph trail vs `DISP_BEAM` C.
6. Process : cadence collée → attribution score impossible.
7. **`obj_glyph` vs `obj_to_glyph(..., rn2_on_display_rng)`** : Hallu glyph. Hors log positionnel ; peut quand même peindre un glyphe Hallu faux si un écran capture le missile.
8. **`shkcatch` / `show_transient_light` / `map_invisible`** dans `bhit` : named, mais kicked weapon en shop/fer reste incomplet.
9. `urgent_pline` import : bon vs `pline` (C `urgent_pline` pour stone). Vérifier que `urgent_pline` JS force le More comme C — sinon l’écran death rate.

## Questions ouvertes
- `done(STONING)` JS pose-t-il `program_state.gameover` de façon à casser `really_kick_object` ? Non vu dans le hunk.
- Le cohort 11/12 inclut-il un kick d’objet (D-0988) qui **exerce** maintenant `DISP_FLASH`+delay ? Si oui, PASS 11/12 est une vraie preuve trail ; si non, le flash est du code mort public.


Grep `git show edf91470 -- js/` : `FORCETRAP` constante uniquement ; pas `getRngLog`, pas `readFileSync`, pas `fastforward` add. Frozen `isaac64.js`/`terminal.js`/`storage.js` absents du stat.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7/10**
- Si je ne devais retenir qu’une critique : les −141 de `zap.js` sont un reformat `try/finally` fidèle au trail C, mais coller la cadence #1265 au port empêche de prouver que `instapetrify`/`done(STONING)` n’a pas touché l’écran, et le killer `cxname` n’est pas `killer_xname`.

Le `urgent_pline('You turn to stone...')` est la string C byte-for-byte. RAS écran de petrify sur ce message-là.

## Annexe — ordre C `really_kick_object` (rappel)

1. boulder/uball/uchain → 0
2. trap pit/web → refuse (find_trap C ; JS find_trap encore omis)
3. STATUE_TRAP → activate return 1 (**pas dans D-0995**)
4. Fumbling `!rn2(3)` → miss
5. barefoot petrify (**ce commit**)
6. range / martial `rnd(3)` / pool / air `rnd(3)` / …

Le petrify est **après** le `rn2` Fumbling : un kick fumbling ne pétrifie pas. JS : Fumbling block **avant** le bras stone. **Match.** Un test held-out qui kick pieds nus sans fumbling est le seul falsifier ; il n’est pas dans le journal.

`urgent_pline` string C exacte `"You turn to stone..."`. `done(STONING)` how constant importée `STONING`. RAS sur le how.

Callers C `instapetrify` hors kick (mhitu, eat egg, etc.) : **non branchés** ce commit — seule l’export + kick. D-0996 brancherait selftouch. Pas de caller orphelin créé.
