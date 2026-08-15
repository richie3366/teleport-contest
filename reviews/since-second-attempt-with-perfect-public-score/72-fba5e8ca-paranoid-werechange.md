# Review 72 — `fba5e8ca` — D-1001 ParanoidWerechange/Hit + you_were/unwere

## Métadonnées
- Hash complet / court : `fba5e8caa8a75dbba162bc9a8a89f1dc08d6f5b5` / `fba5e8ca`
- Parent : `c301e764f3bc29f3f992b0a6a5f03d56381eb4e7`
- Auteur, date : Raphaël Hervier, mercredi 22 juillet 2026 05:12:48 +0200
- D-id : **D-1001**
- Stats : 12 files, **+238 / −66**
- Fichiers JS / map / cadence : `js/{were,eat,jsmain,timeout,uhitm}.js` ; `debt.md` ; journal rotate #1272 (pas une cadence %5)

## Intention vs livrable
Promet confirms lycanthrope, confirm attaque paisible, `mtimedone` `you_unwere`, wolfsbane. Livrable : `you_were`/`you_unwere` dans `were.js` ; `attack_checks` bras `flags.confirm`+ParanoidHit+Stormbringer ; `timeout` were → `you_unwere(false)` ; `eat` `fpostfx` wolfsbane ; `jsmain` `flags.confirm=true`. **`you_were` n’a aucun caller dans ce commit** (allmain/potion/mhitm n’apparaissent pas dans le diff). D-log le nomme. Titre « you_were/you_unwere » survend le **wire** you_were ; le **corps** est porté.

## Inventaire

| Fichier | Rôle |
|---------|------|
| `js/were.js` | Port C : `you_were`, `you_unwere` + props thin |
| `js/uhitm.js` | Port C : `attack_checks` peaceful / ParanoidHit |
| `js/timeout.js` | Wiring : `mtimedone` `you_unwere(FALSE)` |
| `js/eat.js` | Wiring : wolfsbane `you_unwere(TRUE)` |
| `js/jsmain.js` | Wiring : `flags.confirm` défaut On |
| map debt + D-log + rotate journal | Docs |

`git show --stat` : 12 files, +238/−66. `were.js` +99. `uhitm.js` +53. `eat.js` +17. `timeout.js` +7. `jsmain.js` +3. Rotate journal #1272 (pas %5).

Graphe async :
- `nh_timeout` mtimedone were → `await you_unwere(false)` → peut `await paranoid_query` **si** Poly control. Défaut sessions : pas Poly control → pas de prompt. `rehumanize` await déjà là.
- `done_eating` wolfsbane → `await you_unwere(true)` → purify sans query puis maybe rehumanize / `rn1(200,200)`.
- `do_attack` → `await attack_checks(uwep)` → **nouveau** `await paranoid_query(ParanoidHit=false)` = **yn** si confirm On && peaceful && canspotmon. **Delta public possible.**
- `you_were()` : zéro caller ce hash.

`kick` `attack_checks(mon)` wep=null : pas Stormbringer override. C kick idem.

## Fidélité C ↔ JS

### `you_were`
- Locus C : `were.c:you_were` ~192–210
- Locus JS : `js/were.js:you_were`

C : `controllable_poly = Polymorph_control && !(Stunned||Unaware)` ; return si Unchanging ou `umonnum==ulycn` ; si controllable : prompt `an(pmnames[NEUTRAL]+4)` (skip « were ») + `paranoid_query(ParanoidWerechange)` ; else if `monster_nearby()` return ; `were_changes++` ; `polymon(ulycn)`.

JS : mêmes gardes Unchanging/ulycn ; props `Polymorph_control`/`Unchanging`/`Unaware`/`Stunned` via flat+uprops (sous-ensemble). Beast name : `startsWith('were') ? slice(4)` au lieu de `+4` aveugle — **plus sûr** si pmname sans préfixe. `paranoid_query(ParanoidWerechange(), qbuf)`. `game.were_changes++`. `await polymon`.

**Callers à ce hash : aucun.** Fonction morte. C allmain/potion/mhitm/pray TROUBLE — D-log deferred. **Pas un stub `not yet` :** le corps est C, le graphe d’appels non.

### `you_unwere`
C (~213–228) : si purify → You_feel purified + `set_ulycn(NON_PM)` ; si `!Unchanging && is_were(you) && !monster_nearby() && (!controllable \|\| !paranoid_query(Remain in beast form?))` → `rehumanize` ; **else if** `is_were && !mtimedone` → `mtimedone = rn1(200,200)`.

JS : même ordre de `if` / `else if`. **RNG :** `rn1(200,200)` seulement dans le else-if (C identique). clang LTR N/A (un seul tirage). `set_ulycn` existant (Drain_resistance via `set_uasmon`).

**Écart :** `monster_nearby()` JS (hack.js) vs C — si le helper est partial, purify+rehumanize se trompe. Non relu ici ; c’est un caller préexistant.

### `timeout` mtimedone
C `timeout.c` ~641–647 : `if (mtimedone && !--mtimedone) { Unchanging → rnd(100*mlvl+1) ; else if is_were → you_unwere(FALSE) ; else rehumanize }`. JS remplace `rehumanize` were par `you_unwere(false)`. **Match.** Frontière input : si Poly control, **prompt au milieu de `nh_timeout`** — C aussi (`polycontrl, asks whether to rehumanize`). Défaut `ParanoidWerechange` **off** → yn pas getlin. Sessions publiques sans Poly control : pas de prompt. `uinvulnerable` early-return timeout (D-0928) inchangé, **avant** ce bras comme C.

### `eat` wolfsbane
C `fpostfx` : `SPRIG_OF_WOLFSBANE` → `if (ismnum(ulycn) || is_were(you)) you_unwere(TRUE)`. JS dans `done_eating` else-if après cookie : même garde, `you_unwere(true)`. **Match.** Carotte / jelly / etc. toujours omis (header). Cookie `outrumor` inchangé. Pas de RNG wolfsbane (C non plus).

### `attack_checks` peaceful
- Locus C : `uhitm.c:attack_checks` ~189–327
- Locus JS : `js/uhitm.js:attack_checks`

C **après** Wait-invisible, mimic stumble, **mundetected hide/eel**, wakeup-if-sensemon : `if (flags.confirm && mpeaceful && !Confusion && !Hallucination && !Stunned) { Stormbringer → override_confirmation=TRUE return FALSE ; if canspotmon → paranoid_query(ParanoidHit, Really attack X?) ; if no → context.move=0 return TRUE }`.

JS : mimic inchangé (Protection_from_shape_changers / glyph_invisible **toujours deferred**) ; commentaire mundetected deferred ; **puis** confirm. `confirm = flags?.confirm !== false` (opt_out défaut On). Stormbringer `is_art(wep, ART_STORMBRINGER)` ; `do_attack` passe `uwep` ; **kick** `dokick` appelle encore `attack_checks(mon)` → `wep=null` — C `kick_monster` passe NULL. **Match kick.**

**Écarts concrets :**
1. **Hide arms sautés :** un paisible caché, C peut `return TRUE` (tour consommé, pas de coup) **avant** confirm ; JS peut poser « Really attack? ». Named omit. **Input-stream** si une session frappe un hide.
2. **`flags.confirm` :** C `optlist.h` `confirm` **On**. JS `jsmain` `confirm: true` + `if (g.flags.confirm == null) true`. **Avant ce commit, le bras n’existait pas** : toute attaque paisible **visible** dans une session publique n’avait **pas** de yn. Ajouter le prompt **décalerait** les touches → FAIL écran. Ils citent combat cohort **11/12**. Soit aucune session cohort n’attaque un paisible `canspotmon`, soit le FAIL serait seed0009 (déjà 72/73) — **risque sous-testé hors full suite**.
3. Elbereth / warning-glyph : named omit (C wakeup même sans coup).
4. `Hallucination` / `Confusion` : flags plats JS vs macros C — même classe de dette youprop que closeup.

ParanoidHit défaut **off** → `yn_function` pas getlin. Le yn **lui-même** est nouveau vs JS parent.

C `attack_checks` tête : `mstrategy &= ~STRAT_WAITMASK` ; engulf return FALSE ; `forcefight` return FALSE. JS préexistant (hunk ne les retire pas). Confirm est **après** mimic. `wep` default null : kick. Stormbringer kick n’override pas — C `is_art(NULL, STORMBRINGER)` false.

```308:324:nethack-c/upstream/src/uhitm.c
    if (flags.confirm && mtmp->mpeaceful
        && !Confusion && !Hallucination && !Stunned) {
        if (is_art(wep, ART_STORMBRINGER)) {
            go.override_confirmation = TRUE;
            return FALSE;
        }
        if (canspotmon(mtmp)) {
            char qbuf[QBUFSZ];
            Sprintf(qbuf, "Really attack %s?", mon_nam(mtmp));
            if (!paranoid_query(ParanoidHit, qbuf)) {
                svc.context.move = 0;
                return TRUE;
            }
        }
    }
    return FALSE;
```

JS `override_confirmation` sur `game`. C `go.override_confirmation` (hitum skip knight caitiff?). Si JS `hitum` ne lit pas `override_confirmation`, Stormbringer pose un flag **mort**. Named ? Non. **Dette** si `hitum` JS ignore le flag — Stormbringer vs paisible irait au yn **sauf** return FALSE avant yn. Flag pour **plus tard** dans le coup (messages). Relire `hitum` hors hunk : risque.

`context.move = 0` : C annule le tour. JS `game.context.move = 0`. Si le caller `do_attack` return true (consumed) **et** le moveloop respecte `move=0`, match. Parent `do_attack` : `if (attack_checks) return true`. **Match.**

`canspotmon` false (invisible paisible déjà passé Wait!) : C **pas** de prompt, return FALSE → le coup part. JS idem. Invisible : bras Wait plus haut.

### `jsmain` confirm
Aligné C `NHOPTB(confirm, ..., On, ..., &flags.confirm)`. Sans ça, `!== false` sauverait encore undefined. Belt-and-suspenders.

Sessions overlay `flags` sans `confirm` : `== null` → true. Un overlay `confirm: false` (joueur !confirm) : JS respecte. C opt_out On sauf nethackrc. Recorder contest : confirm On.

`you_were` +4 C : `pmnames[NEUTRAL]+4` **assume** le préfixe « were » (werewolf→wolf). JS `startsWith('were')`. Forme `werejackal` → jackal. RAS. Forme sans were : C lirait 4 chars dans le tas ; JS garde le nom. Défensif.

`gw.were_changes++` C compteur ; JS `game.were_changes`. Disclosure / score ? Si un écran affiche le compteur, callers absents → 0. OK à ce hash.

## Constitution / playbook
Grep JS : pas FORCE/DIAG/fs/fastforward/seed-gate. Rule #2 RAS. Frozen RAS. Async : `paranoid_query` → nhgetch (C query). `you_were` mort n’ajoute pas de prompt. 1:1 : were.c → were.js. Timeout/eat/uhitm = callers C. Named omits dans header were.js et D-log (allmain ulycn, potion/mhitm, mundetected, were_summon).

## Densité (§2b)
**Right size / limite haute.** Une famille lycanthrope+confirm combat (flags.confirm vit à côté de ParanoidHit en C `attack_checks`). 5 JS. `you_were` sans caller est du **stockage** amorti, pas un second sous-système potions. Pas too small. Un peu large (Hit + Were + eat + timeout + jsmain) mais un falsifier : prompts opt_out.

## Documentation
D-log **honnête** sur you_were callers deferred et hide/Elbereth. Index 11/12 seed0009. CURRENT next hors were. `debt.md`. Journal rotate #1272 (bruit archive, pas cadence). Pas « complete were.c ». Overclaim message git « wire lycanthrope confirm » : you_were non branché — le D-log corrige.

## Vérification
Journal : green+strict ; combat/timeout **11/12**. Combat justifie Hit ; timeout justifie mtimedone. **Manque une session qui attaque un paisible** nommée. Full suite absente (#1272). Preuve affirmée. Après #1270 43/44, ce prompt est le plus dangereux de la fourchette pour un 42/44 futur.

## Risques / dette
1. **Nouveau yn « Really attack? »** sur paisible visible + confirm On : rupture recorder si une trace frappe un pet/peaceful.
2. **`you_were` mort** : allmain `mvl_change` / potion / mhitm toujours C-omis — lycanthropie héros incomplète.
3. **mundetected skip** : confirm au mauvais moment.
4. **`monster_nearby` / youprop** : mauvais refuse de change.
5. **`rn1(200,200)`** seulement si on reste were : si `monster_nearby` JS false-négatif, rehumanize saute le RNG (ou l’inverse).
6. pray TROUBLE_LYCANTHROPE / potion purify encore absents (eat wolfsbane seul).

## Lecture C complémentaire (`were.c` 192–228, `timeout.c` 641, `eat.c` 2513, `uhitm.c` 308)

C `you_unwere` : `!monster_nearby()` est **dans** le if rehumanize, pas un early return global. Purify + nearby monster : You_feel purified + set_ulycn(NON_PM) **quand même**, puis on **ne** rehumanize **pas** si nearby ; else-if `is_were && !mtimedone` → `rn1(200,200)`. Un héros were qui mange wolfsbane **à côté d’un monstre** : plus lycanthrope (ulycn NON_PM) mais **reste** en forme bête, timer 200–399. JS même structure. **Match.** Piège C, pas un oubli JS.

C `you_were` `monster_nearby()` abort **sans** increment `were_changes`. JS return avant ++. **Match.**

timeout `!--u.mtimedone` : post-decrement, fire at 0. JS parent avait déjà ce test (hunk remplace seulement le bras were). `rnd(100*mlvl+1)` Unchanging inchangé.

eat : wolfsbane dans `done_eating` else-if **après** corpse `cpostfx` et cookie. C `fpostfx` switch séparé de `cpostfx`. Un wolfsbane globby? `piece.globby` va dans cpostfx. Otyp SPRIG only. **Match.** `useup(piece)` **après** you_unwere — C fpostfx avant useup dans done_eating. Si you_unwere prompt (polycontrl) le sprig est encore « en cours » ? C aussi prompt pendant fpostfx avant useup. **Match.**

`attack_checks` `!u.Stunned && !(u.HStun|0)` : double. C `Stunned` macro. Si `u.Stunned` bool désync de HStun, JS plus strict (skip confirm si l’un des deux). Paisible frappé sans yn sous stun plat seul. Bord.

`do_attack` passe `uwep` ; un coup pieds `attack_checks(mon)` wep null. Artefact aux pieds : N/A.

Journal rotate `iter1272` : **pas** une cadence %5. Bruit archive. Process mineur.


## Callers C `you_were` / `you_unwere` / `attack_checks`

C `you_were` : allmain `mvl_change` (Teleportation/Polymorph/ulycn), potion, mhitm, parfois pray. **Aucun** dans le diff D-1001. La fonction est un stock. Un allmain qui `await you_were()` **plus tard** (vu à HEAD actuel, pas ce hash) n’est pas dans le livrable reviewé.

C `you_unwere` : timeout mtimedone, eat wolfsbane, pray TROUBLE, potion, mhitm. Ici timeout+eat. pray/potion/mhitm named omit. Un #pray lycanthrope trouble C purify ; JS encore autre chemin.

C `attack_checks` : `do_attack` (uwep) et `kick_monster` (wep NULL). JS `do_attack` passe uwep ; dokick `attack_checks(mon)` NULL. **Match.** `forcefight` early FALSE : pas de confirm (C). JS parent. Un `F` forcefight sur paisible : pas de yn. C.

`flags.confirm` On : **toute** attaque paisible visible non-confus. Pets : `mpeaceful` tame. Frapper le chien starter : **nouveau yn**. seed8000 a un pet. Si la session frappe le chien, D-1001 casse le replay. Green seed8000 PASS ⇒ cette session **ne frappe pas** un paisible canspotmon, ou le yn a été consommé par une touche qui était déjà `y`. Non inspecté. Risque **réel** pour d’autres seeds du 11/12.

`override_confirmation` Stormbringer : si `hitum` JS ignore le flag, seul l’effet est « pas de yn » (return FALSE). Le flag sert C à des messages « bloodthirsty » plus loin. Dette message, pas input.

`were_change` monstre (déjà dans were.js) non touché. howl omit reste.


Grep `git show fba5e8ca -- js/` : pas FORCE/DIAG/fs/fastforward/seed-gate. Frozen non touchés. `ART_STORMBRINGER` artefact, pas une coordonnée. `flags.confirm` boolean C opt_out.

`you_were` export sans caller : pas un `not yet` stub qui return ; c’est du C en attente de wire. D-log le dit. ACCEPT-WITH-DEBT plutôt que QUALITY-RISK « complete were ».


`eat.js` `ismnum(u.ulycn)` : C `ismnum`. Forme humaine ulycn set : purify. Forme were `is_were(data)` même ulycn déjà NON_PM? C or. JS or. Match.

`timeout` Unchanging bras `rnd(100*mlvl+1)` : hunk ne le touche pas. Were + Unchanging : pas you_unwere (C if Unchanging first). JS parent. RAS.


`Polymorph_control` JS : flat `u.Polymorph_control` + H/E + `uprops[POLYMORPH_CONTROL]`. C macro. Un anneau de poly control mal plié dans uprops : prompt manqué ou extra. Dette youprop récurrente, pas unique à were.

`Unaware` : `multi<0 && usleep`. C. Occupation sleep. Match si `usleep` porté.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7/10**
- Si je ne devais retenir qu’une critique : `you_unwere`+`rn1(200,200)` et wolfsbane sont du C, mais activer `flags.confirm` + yn d’attaque paisible **sans** full suite après une fortress déjà 43/44, c’est une frontière input plus risquée que le lycanthrope mort `you_were`.
