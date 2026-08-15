# Review 67 — `ccba6ff5` — D-0997 animate_statue / Blind kick feel

## Métadonnées
- Hash complet / court : `ccba6ff57057f21d15a0461643d9d4ca2b20fa29` / `ccba6ff5`
- Parent : `312a4b05f4b535795c4f3919236db39ff44c6f5f`
- Auteur, date : Raphaël Hervier, mercredi 22 juillet 2026 04:45:04 +0200
- D-id : **D-0997**
- Stats : 13 files, **+429 / −106**
- Fichiers JS / map / cadence : `js/{detect,dig,dokick,trap,zap}.js` ; `absent.md`, `debt.md` ; pas de cadence (journal #1267)

## Intention vs livrable
Promet STATUE_TRAP activate (kick / search / break / dotrap) et Blind `feel_location` / `feel_newsym` / `wake_nearto`. Le diff livre `animate_statue` + `activate_statue_trap` dans `trap.js`, le wiring des quatre callers, et les feels kick. Pas de D-id manquant. Pas de mélange cadence. Le titre « Blind kick feel » est le sibling légitime du même cluster dokick (C `kick_dumb`/`kick_ouch`/`kick_door` touchent feel **et** statue).

## Inventaire

| Fichier | Rôle |
|---------|------|
| `js/trap.js` | Port C : `animate_statue`, `activate_statue_trap`, `trapeffect_statue_trap` + helpers thin |
| `js/dokick.js` | Wiring C : STATUE_TRAP avant Fumbling ; Blind feel / `feel_newsym` / `wake_nearto` ; `await losehp` |
| `js/dig.js` | Port C : `break_statue` async + historic Archeologist |
| `js/detect.js` | Wiring : `dosearch0` STATUE_TRAP |
| `js/zap.js` | Export `montraits` / `cant_revive` ; `await break_statue` |
| map / D-log / CURRENT / NOTES | Docs |

`git show --stat` : 13 files, +429/−106. `trap.js` porte le poids (`animate_statue` ~200 LOC). dokick = feels + statue trap. detect/dig/zap = callers.

## Fidélité C ↔ JS

### `animate_statue`
- Locus C : `trap.c:animate_statue` (~726–900)
- Locus JS : `js/trap.js:animate_statue`

Séquençage C : `cant_revive` / golem SPELL→flesh / `has_omonst` traits ; `montraits`+`wary_dog` **ou** `makemon` (doppel+MS_GUARDIAN **ou** mptr) ; fail_reason UNIQUE vs NO_MON ; `christen` si oname ; `seemimic` / `mundetected=0` / `msleeping=0` ; NORMAL/SHATTER → hostile `set_malign` ; messages (u_at|SPELL / Hallu / SHATTER / NORMAL) ; `!mon_moving` stolen_value+guilt / else regret ; transfer `cobj`→`mpickobj` ; `m_dowear` ; `remove_worn_item` ; `delobj` ; hide-under clear ; AS_OK.

JS suit cet ordre. Import **dynamique** `cant_revive`/`montraits` depuis zap (cycle trap↔zap) : légitime.

**Écarts concrets :**
1. **MS_GUARDIAN** `quest_info != mnum` : C force doppel+`MM_ADJACENTOK`. JS : seulement `mnum===PM_DOPPELGANGER && mptr !== doppel` ; **quest guard remap nommé omit**. Un statue de quest guardian d’un **autre** rôle s’anime comme lui-même, pas doppel.
2. **`shk_your` :** C `shk_your(tmpbuf, statue)` (propriétaire shop). JS `shk_your_statue` : invent → « your », sinon « the ». Named « full shk ownership prefixes ».
3. **`set_msg_xy`** sur ANIMATE_NORMAL : omis (nommé) — ancrage message/curseur.
4. **`remove_worn_item` :** JS `owornmask=0` puis `delobj`. C retire vraiment l’arme/armure (stone-to-flesh self). Risque wield statue.
5. **`historic` :** C calculé **une fois** en tête. JS recalcule dans les deux bras `mon_moving` — même prédicat `Role_if(PM_ARCHEOLOGIST) && CORPSTAT_HISTORIC`.
6. **`a_monnam` local :** heuristic « initiale majuscule ⇒ pas de a ». C `a_monnam` réel. Hallu / noms propres.
7. **`carried_obj` :** `where===OBJ_INVENT || invent.includes`. C `carried()`. Listes invent JS vs `where` : double test défensif.

Pas de RNG dans `animate_statue` elle-même (C non plus) ; `rndmonnam` Hallu peut en consommer — JS appelle `rndmonnam(null)` comme C `rndmonnam((char*)0)`.

**Messages C vs JS (ordre) :**
1. `u_at \|\| ANIMATE_SPELL` : `upstart(shk_your+statue|xname) comes_to_life!` — JS `upstart(statuename)`. `comes_to_life` : disappears / turns into flesh / moves / comes to life selon `canspotmon` / `golem_xform` / `nonliving|vampshifter`. **Match.**
2. Hallu : `The %s suddenly seems more animated.` + `rndmonnam`. **Match.**
3. SHATTER : `Instead of shattering, %s suddenly %s!` — **Match.**
4. NORMAL : C `set_msg_xy` puis `You find %s posing as a statue.` JS **sans** set_msg_xy. `stop_occupation` + `map_invisible` si Blind && !canspotmon. **Match sauf set_msg_xy.**

`stolen_value(statue, x, y, shkp.mpeaceful, FALSE)` seulement `cause != ANIMATE_NORMAL && costly_spot && (carried? unpaid : !no_charge) && mon != shkp`. Kick/search = ANIMATE_NORMAL → **pas** de facture (C : le piège « trouve » la statue, ce n’est pas un shatter payant). Break wand/pick = SHATTER → facture. JS `cause !== ANIMATE_NORMAL`. **Match.** High-stakes shop : un kick de statue trap **ne doit pas** `stolen_value`. Bien.

`NO_MINVENT | MM_NOMSG` + gender flags : C. JS `NO_MINVENT | MM_NOMSG | MM_MALE/FEMALE`. `ANIMATE_SPELL` ajoute `MM_ADJACENTOK`. Spell n’est **pas** le caller de ce commit (zap stone-to-flesh) — le code est là pour SHATTER/NORMAL. Mort du bras SPELL non exercé.

`has_omonst` / `montraits(..., cause==SPELL)` : third arg `adjacentok`. JS `montraits(statue, {x,y}, cause===ANIMATE_SPELL)`. Export zap. Si `montraits` JS est partial (named omit worm/light dans zap), animate traits est **aussi** partial. Dette transférée, pas inventée.

### `activate_statue_trap`
C (~907) : `deltrap` d’abord ; boucle `sobj_at` STATUE ; `animate_statue` SHATTER vs NORMAL ; break si mon **ou** fail ≠ UNIQUE ; `nxtobj` ; `feel_newsym` ; return mtmp. JS : `fail_reason = {value: AS_OK}` objet (C `int*`). **Match.** `deltrap` avant animate : un échec laisse le piège déjà détruit — C identique.

### `trapeffect_statue_trap`
C : si youmonst `activate_statue_trap(trap, ux, uy, FALSE)` ; monstres no-op ; `Trap_Effect_Finished`. JS : `is_youmonst` même chose. **Match.** Wired dans `trapeffect_selector` case STATUE_TRAP.

### `really_kick_object` STATUE_TRAP
C **avant** Fumbling, après pit/web, `activate(..., FALSE); return 1`. JS D-0997 :

```1114:1117:js/dokick.js
        if ((trap.ttyp | 0) === STATUE_TRAP) {
            await activate_statue_trap(trap, x, y, false);
            return 1;
        }
```

**Ordre C respecté** (D-0995 l’avait laissé en commentaire). `find_trap` sur pit/web kick refuse toujours deferred (D-log).

### Blind feel / `kick_ouch` / `kick_door`
- Locus C : `dokick.c:kick_dumb` ~864, `kick_ouch` ~881, `kick_door` feel_newsym ~951
- Locus JS : `js/dokick.js`

C `kick_dumb` : succès martial/DEX/`rn2(3)` → pline empty space + `if (Blind) feel_location`. JS : `if (Blind()) feel_location(x,y)`. **Match.**

C `kick_ouch` : feel si Blind ; **drawbridge unaffected + remap x,y** ; `wake_nearto(x,y,5*5)` ; `!rn2(3)` wounded legs ; `rnd` CON dmg ; `losehp(kickstr(...))` ; airlevel/Levitation `hurtle(rn1(2,4))`. JS : feel + wake **5*5** (bon) ; drawbridge **omis** (wake sur les coords d’origine si pont-levis) ; `await losehp` (si `losehp` peut `done`, l’await est la frontière death) ; hurtle toujours deferred. RNG wounded `!rn2(3)` + `rnd(5)` inchangé, **avant** losehp comme C.

C `kick_door` break : `feel_newsym` pas `newsym`. JS remplace `newsym` par `feel_newsym` sur D_NODOOR / D_BROKEN. Hit fail : `if (Blind()) feel_location`. **Match** sur le bras porté. `kickstr` killer vs `kickobjnam || 'a wall'` : préexistant, pas ce hunk.

### `break_statue` / `dosearch0`
C `break_statue` (zap.c, JS dans `dig.js`) : si trap STATUE_TRAP et `activate(..., TRUE)` return FALSE (pas shatter) ; sinon dump contents ; si hero Archeologist historic → guilt `adjalign(-1)` ; `spe=0` ; `fracture_rock`. JS : `by_you = !context.mon_moving` ; même activate shatter ; historic. **Match** du bras porté. Devient `async` ; `dig`/`bhito` `await` — callers branchés.

C `dosearch0` : `!tseen && !rnl(8)` puis STATUE_TRAP → `if (activate) exercise(A_WIS)` ; **return 1 dans tous les cas statue**. JS D-0995 marquait `tseen` sans animer ; D-0997 : `if (await activate) exercise; return 1`. **Plus de `tseen=true` forcé** : C `deltrap` dans activate. `rnl(8)` inchangé (clang).

Parent detect.js : `trap.tseen=true; exercise; newsym; return 1` **sans** animer — un search infini évité en marquant vu. Nouveau : si `activate` échoue (AS_NO_MON, pas de statue au sol), C `deltrap` quand même, return 1, **pas** tseen. JS pareil. Piège orphelin disparu, statue unique skip via loop `nxtobj`. **C.**

`break_statue` historic : C `Role_if(PM_ARCHEOLOGIST) && (spe & CORPSTAT_HISTORIC)` **et** `by_you`. JS `!context.mon_moving`. Un monstre qui fracture (rare) : C `mon_moving` skip guilt. JS idem. `adjalign(-1)` : RNG-less. Double guilt si animate_statue **et** break_statue ? C `break_statue` activate SHATTER **return FALSE** avant historic si animate réussit — le guilt historic est dans **animate_statue**, pas break. JS `if (activate) return false` puis historic seulement si on fracture vraiment. **Pas de double adjalign.** Bien.

`feel_newsym` vs `newsym` sur porte : C aveugle met à jour la connaissance tactile. JS `feel_newsym` (display.js préexistant). Si `feel_newsym` = `newsym` quand !Blind, RAS visuel.

`wake_nearto(x,y,25)` : C `5*5` = dist². JS `5*5`. Import `mon.js`. Si `wake_nearto` JS est un stub no-op, le wire est cosmétique. Non relu dans ce commit — risque caller mort.

`await losehp` : si `losehp` était sync et le devient async ici seulement, tous les `kick_ouch` attendent la mort. C `losehp` peut `done()`. **Correct** d’attendre. Pre-existing `kickstr` vs `'a wall'` inchangé.

### Helpers dupliqués dans `trap.js`
`unique_corpstat` = `geno & G_UNIQ`. C macro. `Role_if` local vs `game.urole.mnum`. `has_oname` / `ONAME` / `christen_monst` : préexistants importés ? Hunk montre `christen_monst`. `upstart` : C capitalise. JS `upstart` import ou local ? Si local thin, « The statue » vs « the statue ».

`ANIMATE_*` / `AS_*` constantes : doivent matcher `trap.h`. Non vérifié dans le hunk (nombres magiques vs import const). Si `ANIMATE_SHATTER` JS ≠ 1 C, break_statue animate mal.

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/fs/fastforward/seed-gate. Rule #2 RAS. Frozen RAS. `await` : activate/animate/pline/stolen_value/losehp — pas de nouvel `nhgetch` hors pile existante. 1:1 : `animate_statue` dans `trap.js` (C trap.c). Helpers `Role_if` / `a_monnam` / `shk_your_statue` **dupliqués** dans trap.js au lieu de shk/do_name : dette module, pas un ban. Omissions nommées dans le header et le D-log.

## Densité (§2b)
**Right size.** Une fonction C (`animate_statue`) + son activate + les callers qui étaient le named omit (kick/search/break/dotrap) + Blind feel du **même** fichier dokick. ~200+ LOC trap.js = le corps C. Pas un if isolé. Zap n’est que export + await. Cohérent §2b « tight caller/callee ».

## Documentation
D-log fixed, deferred honnête (drawbridge/hurtle, set_msg_xy, MS_GUARDIAN, shk_your, remove_worn_item, find_trap). Index : cohort **10/10 incl. seed0060** — **seul commit de la fourchette qui n’invoque pas seed0009 comme 11e FAIL**, ce qui est soit un cohort sans 0009, soit un oubli. CURRENT retire STATUE_TRAP/Blind de next. Map absent/debt mis à jour. Pas « complete » sur shk_your.

## Vérification
Journal : green+strict ; kick/search **10/10** (seed0060). Pas de full sessions. Preuve affirmée. 10/10 sans seed0009 est **possible** (cohort ciblé) mais non listé. Fortress 43/44 non re-mesurée.

## Risques / dette
1. **MS_GUARDIAN** non remap → unique/quest statue fausse.
2. **`remove_worn_item` skip** : statue wielded + shatter/stone-to-flesh.
3. **`shk_your` thin** : dette shop (stolen_value s’appuie sur le message « it »).
4. **drawbridge** sauté dans `kick_ouch` avant `wake_nearto`.
5. **`set_msg_xy`** : écran search-found statue.
6. Helpers locaux `a_monnam` / `Role_if` divergents des canoniques.

`break_statue` async : callers oubliés = Promise jetée. Hunk : zap `bhito` + dig `dig()`. `wake_nearto` non relu. `ANIMATE_*` vs `trap.h` non figé dans la review. Cohort 10/10 sans seed0009 : liste absente.

## Lecture C complémentaire (`trap.c` 726–936, `dokick.c` 521–534)

C `cant_revive(&mnum, TRUE, statue)` : `TRUE` = revival-from-statue. JS `cant_revive(box, true, statue)` avec `box.mtype = mnum` mutable. Si `cant_revive` JS mute `box.mtype` comme C `*mnum`, le doppel path s’enclenche. Export D-0997 : on **suppose** que le cant_revive zap est déjà C-fidèle (D antérieur). Un écart cant_revive devient un écart animate. Non relu zap au-delà de l’export.

C `makemon(mptr, x, y, mmflags)` peut fail (génocide, plus de place). fail_reason UNIQUE si `unique_corpstat(original corpsenm)` pas la forme doppel. JS : `unique_corpstat(mons(statue.corpsenm))` — **corpsenm statue**, pas mnum déjà muté. C `&mons[statue->corpsenm]` idem. **Match.**

C `wary_dog(mon, TRUE)` si traits + mtame + !isminion. JS `await wary_dog(mon, true)`. Si `wary_dog` JS no-op, pet statue trop docile. Hors hunk.

`mpickobj(mon, item)` dans le while cobj : C peut fusionner stacks / fail (invent full) et drop. JS `mpickobj` préexistant. Contenu statue trop gros : dette mkobj, pas animate.

`m_dowear(mon, TRUE)` : C équipe ce qui vient d’être ramassé. JS `m_dowear` — si stub, statue guerrier nu. Named « remove_worn_item polish » ne couvre **pas** m_dowear fail.

`u_at(x,y) && Upolyd && hides_under && !OBJ_AT` → `u.uundetected=0`. JS `objects_at` vs C `OBJ_AT`. Si `objects_at` rate le pile, hide-under reste. Mince.

Kick STATUE_TRAP return 1 **consomme le tour** sans `really_kick` range. C. Un kick statue n’envoie pas l’objet. JS return 1. **Match.**

Search `rnl(8)` : clang. Si activate échoue, return 1 quand même (C) — le tour search est pris. JS. Un search spam statue unique skip via nxtobj jusqu’à non-unique ou null.

Blind `kick_dumb` : feel seulement sur le bras « empty space » (martial/DEX/rn2(3)), pas sur « strain a muscle ». C :

```
    if (martial() || ACURR(A_DEX) >= 16 || rn2(3)) {
        You("kick at empty space.");
        if (Blind) feel_location(x, y);
    } else {
        pline("Dumb move!  You strain a muscle.");
        ...
    }
```

JS hunk : feel dans le bras empty space seulement. **Match.** RNG `rn2(3)` inchangé.

`kick_door` `Deaf || !rn2(3)` Thwack/Whammm : préexistant, hunk ne le touche pas. feel_location seulement sur le bras **fail** (pas break). C `else { if (Blind) feel_location; Thwack/Whammm }`. JS hunk : `if (Blind()) feel_location` dans ce else. **Match.**

`feel_newsym` sur succès break : C même si !Blind (feel_newsym ≡ newsym when seeing). JS. Un aveugle qui casse une porte **connaît** la case. C.

`kick_ouch` `rnd(ACURR(A_CON)>15 ? 3 : 5)` : hunk ne change que `await losehp`. RNG dmg identique. `Maybe_Half_Phys` JS `maybe_half_phys` préexistant. drawbridge omit : `wake_nearto` sur coords kick pas coords pont — C remap `find_drawbridge(&x,&y)` **avant** wake. Un kick mur de pont réveille la mauvaise case.


Grep `git show ccba6ff5 -- js/` : pas DIAG/FORCE/fs/fastforward. Dynamic `import('./zap.js')` ESM, pas `node:`. Frozen non touchés. `trapeffect_selector` default omit inchangé — un case STATUE_TRAP n’est pas dotrap complete.


`dosearch0` `return 1` statue même si activate null : tour consommé, C. JS. `exercise(A_WIS)` seulement si mtmp truthy. Un unique skip puis succès : WIS une fois. C.


`nxtobj(otmp, STATUE, true)` : C skip same-chain. JS `nxtobj` préexistant. Unique fail loop : statue suivante même case. Match si nxtobj fidèle.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7.5/10**
- Si je ne devais retenir qu’une critique : `activate_statue_trap` + ordre kick (statue avant Fumbling) est du C lisible, mais `shk_your`/`MS_GUARDIAN`/`remove_worn_item` sont des bras shop/quest/wield encore faux tout en retirant l’omit « STATUE_TRAP ».
