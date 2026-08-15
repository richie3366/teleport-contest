# Review 63 — `da4c886c` — globby pudding_merge / obj_meld

## Métadonnées
- Hash complet / court : `da4c886c3ea56f945f6a7e3e3ba3eb527ca59cba` / `da4c886c`
- Parent : `85b2ab4b28afd2bd146d3b975f9fd417c9e6229f`
- Auteur, date : Raphaël Hervier, 2026-07-22 04:09:08 +0200
- D-id : D-0993
- Stats : 12 files, +392/−51
- Fichiers JS / map / cadence : `js/mkobj.js` (port), `js/do.js` (wire flooreffects), `js/mhitm.js` (`make_corpse`) ; map absent/data/debt ; pas de cadence

## Intention vs livrable
Promet coalesce globby sous fortress : `Is_pudding` mksobj, absorb/meld/nexto/message, mort pudding → GLOB.

Livrable : les primitives `mkobj.c` + `invent.c` mergable/merged + wire `flooreffects` + `make_corpse` quatre pudding. Écart : `globby_bill_fixup` no-op ; `shrink_glob` thin ; `pudding_merge_message` **fire-and-forget** depuis `make_corpse`/`merged`/`obj_meld` (pline C est sync) ; `make_corpse` vit dans `mhitm.js` pas `mon.c` (préexistant).

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/mkobj.js` | Port C : `Is_pudding`, `mksobj_init` globby, `weight` early-out, `obj_nexto_xy`/`obj_nexto`/`nxtobj`, `obj_absorb`/`obj_meld`, `pudding_merge_message`, `start_glob_timeout`, `shrink_glob` thin, `mergable`/`merged` |
| `js/do.js` | Wiring : bras `obj.globby` de `flooreffects` |
| `js/mhitm.js` | Port C (mauvais fichier) : mort pudding → GLOB + meld |
| map data/absent/debt, CURRENT, NOTES, D-log, journal | Docs |

## Fidélité C ↔ JS

### `Is_pudding` + `mksobj_init`
C `mkobj.c` ~955 : GLOB_* → `globby=1`, `quan=1`, `owt=oc_weight`, known/dknown, `corpsenm = PM_GRAY_OOZE + (otyp - GLOB_OF_GRAY_OOZE)`, `start_glob_timeout(0)`. JS identique, **avant** le `!rn2(6) quan=2` des autres FOOD — le `else if` JS empêche le roll quan=2 sur pudding. C aussi (Is_pudding dans le bras FOOD, pas le roll). OK.

`weight()` : C globby retourne `owt` tel quel. JS ajouté. Sans ça, `oc_weight * quan` casserait le meld.

`start_glob_timeout` : `when<1 → 25 + rn2(5) - 2` (23..27). JS `25 + rn2(5) - 2`. RNG identique.

### `obj_nexto_xy` / `obj_nexto`
C 3661–3694 : `sobj_at` puis `nxtobj` mergable ; si `recurs`, `dx=rn2(2)?-1:1`, `dy=rn2(2)?-1:1`, scan 3×3. **Deux `rn2(2)` toujours** si recurs, même si under-feet a déjà match — non : C return early under-feet **avant** les `rn2`. JS pareil : return in-cell puis seulement alors `rn2(2)`×2.

JS `objects_at` + filtre otyp vs C `sobj_at(otyp)` : équivalent si `nxtobj(..., true)` suit `nexthere`.

### `obj_absorb` / `obj_meld`
Absorb : `globby_bill_fixup` ; bknown/rknown/greased mismatch → 0 ; orotten OR ; âge pondéré `(moves-age)*wt` ; `owt += o2wt` ; oeaten sum ; quan=1 ; timers SHRINK moyenne `(tm1||25 + tm2||25 + 1)/2` ; extract/free obj2.

JS : `/(o1wt + o2wt || 1)` — **div0 fallback** inventé (C divise par `o1wt+o2wt`). `globby_bill_fixup` vide nommé « no-op when neither unpaid ».

`obj_meld` : `unless (obj2 FLOOR && obj1 FREE), prefer heavier obj1 or `owt== && rn2(2)``. **Un `rn2(2)`** sur égalité. JS identique. `newsym` C si `ox && cansee` ; JS `if (ox) import().then(newsym)` **sans cansee**, async fire-and-forget. `maybe_unhide_at` sauté (nommé). `if (ox)` : x=0 impossible en NetHack (colonne 0 invalide) — même test C.

### `mergable` / `merged`
C globby → mergable TRUE skip attrs. JS `if (obj.globby) return true` après coin. `merged` : `void pudding_merge_message` + `obj_absorb`. Message non await — `stackobj` est sync. C `pline` sync avant absorb. En JS le pline peut s’intercaler **après** d’autres messages du caller.

### `flooreffects` globby
C 303–314 : `while (globbyobj && (otmp = obj_nexto_xy(..., TRUE))) { pudding_merge_message; obj_meld(&globbyobj, &otmp); } res = !globbyobj`.

JS await le message (seul caller correct) puis meld par refs `{obj}`. `res = !globbyobj` si tout a été absorbé (objet free/null). Ordre identique. C’est le bras qui **tient** le cluster.

### `make_corpse` pudding
- Locus C : `mon.c:make_corpse` (~716)
- JS : `js/mhitm.js:make_corpse` (module déjà faux)

```c
obj = mksobj_at(GLOB_OF_BLACK_PUDDING - (PM_BLACK_PUDDING - mndx), x, y, TRUE, FALSE);
while (obj && (otmp = obj_nexto(obj))) {
  pudding_merge_message(obj, otmp);
  obj = obj_meld(&obj, &otmp);
}
free_mgivenname; newsym; return obj;
```

JS : même formule otyp ; `void pudding_merge_message` (make_corpse **sync**) ; `free_mgivenname` deferred. Les quatre `mndx` gray/brown/green/black. **`mksobj_at(..., true, false)` déclenche `start_glob_timeout` → `rn2(5)`**. Puis `obj_nexto` → jusqu’à deux `rn2(2)` search + éventuellement `rn2(2)` meld. Ordre C respecté **si** le message async ne tire pas de RNG (il n’en tire pas). Le danger est l’**ordre d’écran**, pas le keystream.

### `shrink_glob`
C : ice, invent, catch-up `expire_time`, messages. JS : `owt -= 1` ; 0 → `delobj` ; re-schedule. Named thin. `run_timers` branche `SHRINK_GLOB`. Un glob posé durera ~owt×25 tours vs C plus complexe sur glace — divergence longue, hors suite publique probable.

### `pudding_merge_message` texte
C `You_see("parts of the floor melting!")` hallu onfloor ; pack grab ; else `The %s%s coalesce%s` avec `adjacent ` si les deux globes ≠ hero cell. JS `pline('You see parts...')` — `You_see` C peut être « You see » / « You see » according to vis. Aveugle + inpack : C entre dans le if `inpack` même Blind. JS `(!Blind && visible) || inpack` identique. Else `You hear a faint sloshing sound.` — C pareil, **sans** test Deaf dans ce bras (C `pline` hear quand même). JS identique (pas de Deaf). OK.

`makeplural(obj_typename(otmp.otyp))` : si `obj_typename` JS diffère, le message coalesce diverge sans RNG.

### `mksobj_init` vs `clear_dknown`
Commentaire JS : dknown=1 set in init **after** `clear_dknown`. C ordre mkobj : clear puis Is_pudding force dknown=1. Si JS `clear_dknown` tourne **après** init pudding, le dknown retombe à 0. Le commit dit « after clear_dknown ». À prendre au mot ; non vérifié par lecture du `mksobj()` wrapper complet. Risque dknown glob = 0 → `mergable` / messages.

### `nxtobj`
C `invent.c nxtobj` : walk `nobj`/`nexthere` jusqu’au même otyp. JS copie. `by_nexthere=true` pour floor pile. Si `nexthere` JS n’est pas maintenu comme C, `obj_nexto_xy` rate le second glob sous les pieds et tombe dans le scan 3×3 (deux `rn2(2)` **en trop** vs C qui aurait return earlier). Keystream sensible.

## Constitution / playbook
Grep : pas FORCE/DIAG/fs. `pudding_merge_message` réimplémente Blind/Hallucination locaux au lieu d’importer — duplication, pas hardcode seed. `void import('./display.js').then(newsym)` : async hors `nhgetch`, mais c’est un display post-hoc, pas un input. Frozen RAS.

1:1 : meld dans `mkobj.js` (C `mkobj.c`) OK ; `make_corpse` pas dans un `mon.js`.

## Densité (§2b)
Right size / dense : init + nexto + absorb/meld + message + flooreffects + corpse + mergable. Related deferrals (bill_fixup, shrink ice, unhide) nommés. Pas un peel `if (globby)`. Bon cluster fortress.

## Documentation
D-0993 Deferred : bill_fixup, shrink ice/eat, maybe_unhide, sellobj. **Ne nomme pas** le `void` async message ni le `|| 1` div0. CURRENT next → sellobj. Map data.md : ligne mkobj globby (touchée). Journal #1263 : drop/throw 20/21. « Retire named flooreffects globby omission » : vrai pour `flooreffects` ; `make_corpse` est un extra légitime (sans GLOB, `globby` jamais set à la mort).

## Vérification
Cohort drop/throw 20/21 : exerce `flooreffects` si un glob atterrit, **peu probable** en public. `mksobj` GLOB et `make_corpse` pudding : encore moins. Green = non-régression. Pas de mon-death cohort. Le `rn2(5)` timeout + `rn2(2)` nexto ne sont pas confrontés à une trace.

## Risques / dette
1. **`void pudding_merge_message` / `newsym.then`** — courses d’écran.
2. **`globby_bill_fixup` no-op** — merge en magasin.
3. **`shrink_glob` thin** vs catch-up C.
4. `|| 1` dans l’âge absorb.
5. `make_corpse` dans `mhitm.js` : autres morts pudding hors ce caller ?
6. `mergable` globby TRUE ignore cursed/blessed mismatch que C ignore aussi pour globby — OK, mais `merged` fire-and-forget message.
7. `start_glob_timeout` si `obj.timed` : `stop_timer` puis re-start. Double glob create mid-turn : C `impossible` si !globby. JS return silencieux `if (!obj?.globby)`.
8. `obj_meld` `if (ox)` newsym : C `cansee` gate. JS always schedule — extra newsym hors vue, pas de RNG.
9. `make_corpse` n’attend pas `mksobj` artif `FALSE` : artifacts glob n’existent pas. OK.

## Questions ouvertes
- Un pudding public meurt-il dans le 20/21 drop/throw ? Très peu probable — D-0993 est surtout de la surface pour held-out.
- `merged()` globby via `stackobj` après `place_object` : flooreffects a déjà meld via `obj_nexto_xy`. Double meld ? C flooreffects meld **avant** place ; caller ne place pas si `res`. JS `res = !globbyobj`. Si un glob survit, `place`+`stackobj` peut re-merger (C `merged` globby aussi). Possible double message. C : flooreffects while nexto ; place leftover ; stackobj peut encore merger. Deux messages possible en C aussi.
- `SHRINK_GLOB` dans `run_timers` au début de tour : insert un `rn2` via `start_glob_timeout` re-schedule (`when=0` → `rn2(5)`). **Nouveau keystream périodique** dès qu’un glob existe. Fortress sans glob = inert.

### Citation C — `flooreffects` globby
```303:314:nethack-c/upstream/src/do.c
    } else if (obj->globby) {
        struct obj *globbyobj = obj;

        while (globbyobj
               && (otmp = obj_nexto_xy(globbyobj, x, y, TRUE)) != 0) {
            pudding_merge_message(globbyobj, otmp);
            (void) obj_meld(&globbyobj, &otmp);
        }
        res = (boolean) !globbyobj;
    }
```

JS await message puis `obj_meld(r1, r2); globbyobj = r1.obj`. Si meld absorbe globbyobj dans l’autre, `r1.obj` null, loop stop, `res=true` (caller ne place pas). C `obj_meld` peut nuller `globbyobj`. OK.

### Citation C — `obj_meld` heavier + `rn2(2)`
```3788:3798:nethack-c/upstream/src/mkobj.c
            if (!(otmp2->where == OBJ_FLOOR && otmp1->where == OBJ_FREE)
                && (otmp1->owt > otmp2->owt
                    || (otmp1->owt == otmp2->owt && rn2(2)))) {
                if (otmp2->where == OBJ_FLOOR)
                    ox = otmp2->ox, oy = otmp2->oy;
                result = obj_absorb(obj1, obj2);
            } else {
                /* absorb obj1 into obj2 */
                result = obj_absorb(obj2, obj1);
            }
```

JS même condition. `rn2(2)` **seulement** si owt égaux et pas (floor,free). Drop d’un glob (FREE) sur un glob floor : le `unless` force absorb dans le floor même si le dropped est plus lourd. C FIXME le dit. JS copie le FIXME-behavior. Bien (pas de « fix »).

### `start_glob_timeout` RNG
`25 + rn2(5) - 2` → 23..27, moyenne 25. Appelé à chaque `mksobj` GLOB et à chaque shrink tick (`when=0`). Un glob qui vit 20 ticks = 20× `rn2(5)` de plus que HEAD pré-D-0993. Hors suite tant qu’aucun GLOB n’est créé.

`obj_absorb` timers : `stop_timer` retourne le temps restant. JS `tm1 = stop_timer(...)`. Si `stop_timer` JS rend `undefined`/`0` au lieu du remaining C, la moyenne tombe sur 25+25. Écart de durée shrink, un `rn2(5)` au reschedule `when=0` vs C `when=tm1` **sans** nouveau `rn2` si tm1≥1. **Si stop_timer JS est thin et rend 0, D-0993 ajoute un `rn2(5)` par meld.** Non vérifié sur `stop_timer` dans ce commit (préexistant). Risque keystream glob-merge.

`mhitm.js` `void pudding_merge_message` : `make_corpse` est sync et appelé depuis des chemins parfois sync. Un await interdit. Le fire-and-forget est une contrainte d’architecture JS, pas de la paresse — mais les écrans de mort pudding peuvent s’afficher **après** `newsym` / le message de mort. C pline **avant** meld **avant** newsym.

`Is_pudding` export : callers futurs (eat glob, throw glob) peuvent l’importer. `weight()` early-out globby : sans ça `stackobj`/`encumber` fausserait. Bon réflexe.

`clear_dknown` commentaire « Is_pudding dknown=1 set in mksobj_init after clear_dknown » : si l’ordre `mksobj()` est `mksobj_init` puis `clear_dknown`, le commentaire ment et les GLOB ont dknown=0. Lecture rapide de `mksobj` au parent : `clear_dknown` est une fonction appelée depuis init/post. **À falsifier** : créer un GLOB et lire `dknown`. Si 0, `mergable` / messages / shop known cassés.

Four pudding `mndx` : gray/brown/green/black alignés sur l’ordre des GLOB_* dans `objects[]`. C commente « like dragons, relies on the order remaining consistent ». JS copie la formule `GLOB_OF_BLACK_PUDDING - (PM_BLACK_PUDDING - mndx)`. Si `monsterNames.indexOf` ≠ C `PM_*` numérique, le glob type est faux. Même risque que tout `indexOf` du port — pas nouveau, mais le cluster en dépend.

`obj_nexto` wrapper : `obj_nexto_xy(otmp, otmp.ox, otmp.oy, true)`. C `impossible` si otmp null. JS `if (!otmp) return null`. Fallback.

`pudding_merge_message` Blind local : `HBlinded||EBlinded` sans `BBlinded` invert complet vs C `Blind` macro (inclut creamed, etc.). Un héros creamed « voit » le coalesce JS. Écran. Hallu local skip `Halluc_resistance` partiel (`HHallucination && !Halluc_resistance`) — plus proche C que `u.Hallucination` seul.

`merged` globby `void pudding_merge_message` depuis `stackobj` sync : même contrainte async. Drop de deux globs via `stackobj` sans passer flooreffects (déjà globby handled) : si flooreffects `res=false` (pas de voisin) puis place+stack trouve un voisin que nexto_xy a raté (ordre pile), second meld possible. C même structure.

`globby_bill_fixup` no-op : merge de deux unpaid globs en magasin ne met pas à jour bill_p. D-log le nomme. Un held-out shop+pudding facturerait mal. Fortress publique : pas de pudding shop.

`shrink_glob` `owt -= 1` chaque ~25 tours vs C qui peut faire du catch-up multi-unités après `expire_time` (niveau quitté). Un glob sur un niveau visité puis re-visité : C peut fondre d’un coup ; JS fond 1. Hors suite.

`FOOD_CLASS` `!rn2(6) quan=2` désormais skippé pour pudding via `else if`. Un GLOB ne spawn plus en stack de 2. C Is_pudding avant ce roll. OK. Si `Is_pudding` JS rate un otyp (indexOf -1), le glob prend quan=2 **et** pas globby — catastrophe. `GLOB_OF_*` indexOf doit être ≥0. Non asserté.

`data.md` touché : row mkobj globby. Bon endroit (obj init). `absent.md` kicking liste D-0993 — un glob n’est pas du kick, c’est du land ; la row kicking est un fourre-tout de la chaîne dokick/flooreffects. Map smell mineur.

`mksobj_at(..., true, false)` make_corpse : `TRUE` init lance timers. Un pudding qui meurt crée un glob qui **immédiatement** `obj_nexto` (deux `rn2(2)` si recurs et pas de voisin sous les pieds). Mort pudding isolée : 1× `rn2(5)` timeout + 2× `rn2(2)` search + 0 meld. JS même compte **si** stop_timer n’ajoute rien. `make_corpse` `newsym` après le while : C identique. `free_mgivenname` sauté : un pudding nommé laisse le nom sur le glob ? C le libère sur le monstre, pas sur l’objet. Omission surtout leak/name sur le mtmp déjà mort — faible.

Cluster §2b : init + nexto + absorb/meld + flooreffects + corpse. Right size. La dette async n’est pas de la sous-densité.

Pas de FORCE/DIAG. `rn2(5)` glob timeout est du gameplay RNG une fois un glob posé — held-out pudding possible.

## Verdict
- Verdict : ACCEPT-WITH-DEBT
- Note : 7/10
- Si je ne devais retenir qu’une critique : `obj_nexto_xy`/`obj_meld` copient les `rn2(2)` C, mais `make_corpse` (sync) jette le message async et un `globby_bill_fixup` vide — le land `flooreffects` est le seul chemin vraiment await.
