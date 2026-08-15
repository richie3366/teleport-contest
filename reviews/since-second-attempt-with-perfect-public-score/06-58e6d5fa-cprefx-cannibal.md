# Review 06 — `58e6d5fa5a1ed07d158229975697011140b4959f` — `cprefx` cannibal / stone / slime

## Métadonnées
- Hash complet / court : `58e6d5fa5a1ed07d158229975697011140b4959f` / `58e6d5fa`
- Parent : `ad8c5cc615117701affa7ded0fb6a65548a8523b`
- Auteur, date : Raphaël Hervier `<richie3366@gmail.com>`, 2026-07-21 22:17:19 +0200
- D-id : **D-0939**
- Stats : 12 files, +458/−23 (JS : 6 files, +418/−14)
- Fichiers JS / map / cadence : `eat.js`, `end.js`, `mondata.js`, `monsters.js`, `potion.js`, `were.js` ; `debt.md` ; journal #1207.

## Intention vs livrable
Promet : retirer le no-op `cprefx` pour que `start_eating` et la viande de tin suivent `eat.c`.

Livrable : `maybe_cannibal` / `fix_petrification` / `cprefx` dans `eat.js` ; macros petrify/slime/`your_race` dans `monsters.js` ; `same_race` dans `mondata.js` ; `were_beastie` ; `make_stoned`/`make_slimed` ; `delayed_killer` chain dans `end.js` ; wire `start_eating` (et tin via `consume_tin` déjà appelant).

Le journal dit « full `cprefx` ». C `cprefx` a encore `revive_corpse` après Rider lifesave — **sauté, nommé**. « Full » est un overclaim de message, pas du D-log (qui liste revive).

## Inventaire

| Fichier | Rôle |
|---------|------|
| `js/eat.js` | Port `maybe_cannibal` / `fix_petrification` / `cprefx` ; wire `start_eating` |
| `js/monsters.js` | Macros `touch_petrifies` / `flesh_petrifies` / `slimeproof` / `flaming` / `your_race` / `is_unicorn` / `is_longworm` |
| `js/mondata.js` | Port `same_race` (C `mondata.c`) |
| `js/were.js` | Port `were_beastie` |
| `js/potion.js` | Port `make_stoned` / `make_slimed` |
| `js/end.js` | Port `delayed_killer` / `find_delayed_killer` / `dealloc_killer` |
| `debt.md`, D-log, CURRENT, NOTES, journal | D-0939 |

## Fidélité C ↔ JS

### `maybe_cannibal` — C `eat.c:758` / JS `eat.js:maybe_cannibal`
C : static `ate_brains` ; si `moves == ate_brains` return FALSE ; **puis** `ate_brains = moves` (même sans cannibal — commentaire « ate_anything ») ; si `!CANNIBAL_ALLOWED() && (your_race \|\| (Upolyd && same_race(youmonst.data,fptr)) \|\| lycanthrope)` : msgs, `HAggravate_monster \|= FROMOUTSIDE`, `change_luck(-rn1(4,2))`.

JS : `game.context.eat_ate_brains === moves` ; set **avant** le test — **fidèle** (y compris le piège « un penalty par tour même si ce n’était pas du cerveau »). `CANNIBAL_ALLOWED` : C `#define … (Role_if(PM_CAVE_DWELLER) \|\| Race_if(PM_ORC))`. JS `urole.mnum === PM_CAVE_DWELLER \|\| urace.mnum === PM_ORC`. Équivalent si `mnum` est bien le Role/Race_if.

RNG : `rn1(4,2)` → 2..5, luck −2..−5. Un appel, pas d’imbriquement.

Callers : `cprefx(..., TRUE)` ; C a aussi `maybe_cannibal(pm, FALSE)` ailleurs (digest tentacle) — **non branché**, hors cluster.

### `cprefx` — C `eat.c:791` / JS `eat.js:cprefx`

Ordre C :
1. `maybe_cannibal(pm, TRUE)` toujours.
2. `flesh_petrifies` : si `!Stone_resistance && !(poly_when_stoned && polymon(STONE_GOLEM))` → `use_up_tin` si tin, killer, `done(STONING)`, `victual.eating=0`, return.
3. `switch(pm)` : chiens/chats aggravate si `!CANNIBAL_ALLOWED` ; lizard `fix_petrification` ; Riders `done(DIED)` + exercise WIS + **`revive_corpse` si CORPSE** ; green slime `make_slimed(10)` + `delayed_killer` **FALLTHROUGH** ; default `acidic && Stoned` → unstone.

JS : même cannibal ; petrify via `polyed = await polymon(...)` puis `!Stone_resistance && !polyed` — **équivalent au `&&` C** (polymon non appelé si déjà résistant ; non appelé si `!poly_when_stoned`). Riders : `done(DIED)` + WIS ; **pas** `revive_corpse` (nommé). Slime : `!Slimed && !Unchanging && !slimeproof` ; `make_slimed(10,null)` ; `delayed_killer(SLIMED, KILLED_BY_AN, '')` ; **FALLTHROUGH** commenté vers `acidic` unstone — **fidèle**.

`Stone_resistance` JS or-chain `H/E/Stone_resistance` vs macro C. Risque de double-comptage mais pas d’ordre RNG.

`pmnames[pm][NEUTRAL]` : D-0935 tin usait `[2]` ; ici `NEUTRAL` importé (`FEMALE+1` = 2). Cohérent.

### `fix_petrification` — C `eat.c:867`
Hallu + CHA>15 « fine art » ; sinon « You feel limber! » ; `make_stoned(0, buf, 0, "")`. JS `acurr(A_CHA)>15`. Fidèle. Pas de RNG.

### `make_stoned` / `make_slimed` — C `potion.c:222` / `195`
Timeout ; botl + msg sur transition ; clear → `dealloc_killer` ; stoned start → `delayed_killer`. Slime : apparence fake green-slime **deferred** (nommé). C slime n’appelle **pas** `delayed_killer` lui-même — `cprefx` le fait. JS pareil. Fidèle.

### `delayed_killer` — C `end.c` / JS `end.js`
Liste chaînée sur `killer.next` ; replace by id ; clear `killer.name`. `dealloc_killer` unlink. Pas de RNG. Callers `cprefx` / `make_*` branchés. Autres delayed killers (sick, etc.) hors scope.

### `were_beastie` — C `were.c:70`
Switch rat/jackal/wolf identique (wererat/sewer/giant/rabid ; werejackal/jackal/fox/coyote ; werewolf/wolf/warg/winter cub). `default NON_PM`. **Fidèle.** Pas de RNG.

### `same_race` — C `mondata.c:771` / JS `mondata.js:same_race`
C compare `mlet` caractères `S_KOBOLD`. JS compare `'S_KOBOLD'` — **convention du port** (`ptr.mlet` est le symbole string, voir `insight.js`). Pas un bug.

Enveloppe : exact / races joueur / giant/golem/mind flayer / kobold+zombie+mummy / ogre/nymph/centaur/unicorn/dragon/naga / rider/minion / tengu false / imp / demon / undead letters / little↔big / gargoyle / bee / longworm.

C `is_undead(pm1)` sans `return false` final dans le bloc lettres (tombe ensuite) ; `else if (is_undead(pm2)) return FALSE`. JS `is_undead(pm1) { … return false }` **puis** `if (is_undead(pm2)) return false`. Pour deux undead de lettres différentes, C sort du `if (is_undead(pm1))` sans return et continue little/big ; JS `return false` **trop tôt**. Écart cannibal/poly : deux morts-vivants de familles distinctes. Non nommé.

`big_to_little` / `little_to_big` : JS doit déjà les exporter — non vérifié ici comme nouveaux. Si no-op, le bras growth est mort.

Callers : `maybe_cannibal` seulement dans ce commit. Autres C `same_race` (peace) bénéficient du port si déjà importé plus tard — ici export neuf.

### Wire `start_eating`
C `cprefx(victual.piece->corpsenm)` puis abort si plus de piece/eating. JS `await cprefx(...)` ; `if (!piece \|\| !eating) return`. **Câblé.** Tin : `consume_tin` appelait déjà le no-op — devient réel **sans** changer l’ordre costly_tin/cprefx (costly encore identité jusqu’à D-0940).

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/`fs`/fastforward. Frozen RAS. `await polymon` / `done` / `make_*` — chemins mort/poly existants.

1:1 : macros dans `monsters.js` (souvent `mondata.h`) ; `same_race` bien dans `mondata.js` ; `were_beastie` dans `were.js` ; killers dans `end.js`. Cluster 6 fichiers = helpers **requis**, pas des sous-systèmes sans lien.

## Densité (§2b)
Right size, dense (~418 LOC). Famille `cprefx` + prédicats. Pas « finish eat.c » (`cpostfx` restant nommé). Six modules : limite haute §2b mais un falsifier. Pas too small.

## Documentation
D-0939 **fixed** + revive_corpse, tin shop, `watch_dig`. `debt.md` retire « full cprefx ». Journal « full cprefx » vs D-log revive : **overclaim journal**.
NOTES 61 lignes. CURRENT Keep D-0939 « do not re-stub ».
`same_race` undead early-return **pas** dans la map.

## Vérification
Journal : green + eat/role cohort 12/12. Role cohort justifie cannibal race (orc/cave). Toujours pas de canary cockatrice-tin / Rider. Affirmation. `cprefx` no-op → réel peut changer la **mort** held-out sans toucher 44/44.

## Petrify : court-circuit C vs JS

C :
```
if (!Stone_resistance
    && !(poly_when_stoned(gy.youmonst.data) && polymon(PM_STONE_GOLEM))) {
```
`polymon` n’est évalué que si `poly_when_stoned` est vrai (clang `&&`). JS :
```
if (!Stone_resistance && poly_when_stoned(youData)) {
    polyed = !!(await polymon(PM_STONE_GOLEM));
}
if (!Stone_resistance && !polyed) { … done(STONING) }
```
Cas : résistant → pas de polymon, pas de mort. `poly_when_stoned` faux → pas de polymon, mort. `poly_when_stoned` vrai et polymon réussit → pas de mort. polymon échoue → mort. **Même table de vérité.** `await polymon` si le helper JS tire du RNG d’échec de forme : même call site que C.

Après `done(STONING)` lifesave : C `victual.eating=0` return. JS pareil. Tin : `use_up_tin` **avant** `done` pour garder le tin hors bones — JS aussi. D-0935 `use_up_tin` déjà là.

## Riders et slime

Riders : C `done(DIED)` ; si vie sauve, `exercise(A_WIS, FALSE)` puis `revive_corpse` si `victual.piece` CORPSE. JS s’arrête après WIS. Un wizard qui wish un cadavre de Death, le mange, et survit : en C le cadavre se relève ; en JS il reste nourriture / contexte victual. Nommé. Tin de Death (wizard wish) : C `victual.piece` NULL → pas de revive ; JS return pareil. Le trou est **cadavre**, pas tin.

Slime : C `if (!Slimed && !Unchanging && !slimeproof) { You don't feel very well; make_slimed(10); delayed_killer(SLIMED, KILLED_BY_AN, ""); }` puis FALLTHROUGH default acidic. JS `Slimed = !!(u.Slimed & TIMEOUT)` — C `Slimed` est le timeout intrinsic. Si JS stocke Slimed hors TIMEOUT bits, le test diverge. `make_slimed(10, null)` : C `(char*)0` pas de msg de transition (xtime 0→10 déclenche botl ; msg NULL skip). JS `if (msg) pline` — OK. `delayed_killer` **après** make_slimed : C et JS. `make_slimed` clear dealloc SLIMED killer ; ici on **set**, pas clear.

## `same_race` undead — contre-exemple

C : zombie vs mummy. `is_undead(pm1)` vrai, `let1==S_ZOMBIE`, `let2==S_MUMMY` → les if lettres échouent, **pas de return**, on sort du bloc undead, `else if (is_undead(pm2))` n’est pas pris (c’est else du `if (is_undead(pm1))`). Suite : little/big si même lettre (non), gargoyle (non), … `return FALSE` final. Donc zombie ≟ mummy est FALSE en C aussi par le return final, **sauf** si little/big ou autre match plus bas s’applique (non pour ces lettres).

Le vrai écart : `is_undead(pm1)` vrai, lettres **égales** (deux zombies différentes espèces). C échoue les if S_ZOMBIE match `let2==S_ZOMBIE` → **return TRUE** dans le bloc. JS pareil (`if (let1==='S_ZOMBIE') return let2==='S_ZOMBIE'`). OK.

Écart réel : C bloc undead **sans** `return false` terminal interne ; après les lettres, C **tombe** dans little/big avec `let1==let2`. JS `return false` après les lettres undead **empêche** little/big pour les undead de même `mlet` qui grandissent. Existe-t-il des undead little/big ? Si oui (ex. familles), JS refuse cannibal/same_race à tort. À nommer. Risque réel mais étroit.

Tengu : C `if (pm1==TENGU \|\| pm2==TENGU) return FALSE` après minion, avant imp. JS `m1===PM_TENGU \|\| m2===PM_TENGU`. OK.

## Macros `monsters.js`

`touch_petrifies` : cockatrice / chickatrice. `flesh_petrifies` : + Medusa. `slimeproof` : green slime / `flaming` / `noncorporeal`. `flaming` : vortex / sphere / elemental / salamander. `your_race` : `mflags2 & urace.selfmask`. C macros `mondata.h`. Pas de RNG. `is_unicorn` / `is_longworm` pour `same_race` seulement.

## Risques / dette
1. `revive_corpse` Rider : cadavre pas réanimé après lifesave (nommé).
2. `same_race` undead : `return false` trop tôt vs chute little/big C.
3. `polymon` failure polish nommé.
4. `ate_brains` sur `context` vs static C : save/restore / nouvelle partie.
5. `cpostfx` toujours partiel — tin meat post-effects (wraith, etc.).
6. Journal « full cprefx » vs D-log : discipline de wording.
7. Six modules : revue plus chère ; un bug `delayed_killer` touche slime **et** stone.

## Extrait C — `cprefx` Riders + slime FALLTHROUGH

```831:863:nethack-c/upstream/src/eat.c
    case PM_DEATH:
    case PM_PESTILENCE:
    case PM_FAMINE: {
        pline("Eating that is instantly fatal.");
        /* killer, done(DIED) */
        exercise(A_WIS, FALSE);
        if (svc.context.victual.piece
            && svc.context.victual.piece->otyp == CORPSE
            && revive_corpse(svc.context.victual.piece))
            svc.context.victual = zero_victual;
        return;
    }
    case PM_GREEN_SLIME:
        if (!Slimed && !Unchanging && !slimeproof(gy.youmonst.data)) {
            You("don't feel very well.");
            make_slimed(10L, (char *) 0);
            delayed_killer(SLIMED, KILLED_BY_AN, "");
        }
        FALLTHROUGH;
    default:
        if (acidic(&mons[pm]) && Stoned)
            fix_petrification();
        break;
    }
```

JS : Riders sans `revive_corpse` (nommé). Slime + FALLTHROUGH acidic **porté**. Un tin de slime acide + hero Stoned : unstone via default — JS `ptr && acidic(ptr) && Stoned`. Fidèle sur ce chemin.

`maybe_cannibal` C `change_luck(-rn1(4, 2)); /* -5..-2 */`. JS `change_luck(-rn1(4, 2)); // -5..-2`. Un `rn1`, pas `rn2` imbriqué. `FROMOUTSIDE` or-égal sur `HAggravate_monster`. OK.

`CANNIBAL_ALLOWED` cave dweller **role** ou orc **race**. Un orc wizard cannibale : autorisé. Un human cave dweller : autorisé. Un poly orc forme : `Race_if(PM_ORC)` est la race innée, pas la forme. JS `urace.mnum` — innée. Fidèle. `your_race(fptr)` pour le cadavre de sa propre race : `mflags2 & selfmask`. Si `selfmask` JS non copié depuis `urace`, cannibal never fires. Préexistant `u_init`/roles.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **8/10**
- Si je ne devais retenir qu’une critique : `cprefx` porte enfin l’ordre cannibal → petrify → switch → slime FALLTHROUGH avec le bon `rn1` de luck, mais le journal crie « full » alors que `revive_corpse` manque et que `same_race` raccourcit les undead.
