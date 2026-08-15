# Review 34 — `526eb273` — cadence #1235 **et** ice melt / burn / fireball

## Métadonnées
- Hash complet / court : `526eb273c9dc292a528ca0c005c3615cc69ca878` / `526eb273`
- Parent : `abc0302c0b01867d377a37fbaa01bbb95bfed1e9`
- Auteur, date : Raphaël Hervier, 2026-07-22T00:36:46+02:00
- D-id : **D-0965** (cadence **#1235** dans le même commit)
- Stats : 8 files, +483/−95
- Fichiers JS / map / cadence : `js/zap.js` (+409), `js/mkobj.js` (+81) ; `docs/c-js-map/debt.md` ; `docs/CURRENT.md` (44/44 @#1235, Scr 11405, RNG 100%, `30+0.27/turn`)

## Intention vs livrable
Le titre est explicite : « Refresh #1235 suite score **and** port ice melt / burn / fireball (D-0965) ». Le playbook et `00-INSTRUCTIONS.md` demandent de flagger un cadence commit qui **porte du C en plus**. C’est exactement ça : CURRENT/score **et** ~490 lignes de port zap/timer.

Le port lui-même est dense et C-shaped : `melt_ice` / `start_melt_ice_timeout` / `melt_ice_away`, TIMER_LEVEL, `burn_floor_objects`, bras ZT_FIRE/ZT_COLD de `zap_over_floor`, `dobuzz` SPE_FIREBALL skip-trail + `explode(d(12,6))`. D-id présent. Titre large mais honnête (ice+burn+fireball = une famille `zap.c`). Le mélange process est le défaut, pas un overclaim « explode combat complete ».

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/zap.js` | Port C : `is_ice`/`is_moat`, `burn_floor_objects`, `melt_ice`, `start_melt_ice_timeout`, `melt_ice_away`, expansion `zap_over_floor` FIRE/COLD, `dobuzz` fireball |
| `js/mkobj.js` | Wiring timers : `start_timer` TIMER_LEVEL, `spot_time_left`, `spot_stop_timers`, `run_timers` → `melt_ice_away` |
| `docs/CURRENT.md` | Cadence #1235 44/44 / Scr / RNG / speed |
| `docs/c-js-map/debt.md` | Retire ice/WEB/POOL/fountain/cold/burn/fireball ; laisse bury/unearth/obj_ice |
| D-LOG / INDEX / NOTES / journal | D-0965 + deferrals ; preuve green+cohort **et** full sessions |

## Fidélité C ↔ JS

### `is_ice` / `is_moat` — `dbridge.c` / `zap.c`
C `is_ice` : `typ==ICE` ou DRAWBRIDGE_UP + `DB_ICE`. JS identique (`DB_UNDER === DB_ICE`). C `is_moat` : plus large (juiblex swamp). JS : `typ===MOAT` seulement, **nommé** « juiblex swamp deferred ». Écart de couverture, pas d’invention.

### `start_melt_ice_timeout` — `zap.c:5088` → `js/zap.js`
C :

```c
    when = (int) min_time;
    if (when < MIN_ICE_TIME - 1)
        when = MIN_ICE_TIME - 1;
    while (++when <= MAX_ICE_TIME)
        if (!rn2((MAX_ICE_TIME - when) + MIN_ICE_TIME))
            break;
    if (when <= MAX_ICE_TIME) {
        where = ((long) x << 16) | (long) y;
        (void) start_timer((long) when, TIMER_LEVEL, MELT_ICE_AWAY,
                           long_to_any(where));
    }
```

JS : `MIN=50`, `MAX=2000`, même clamp, même `while (++when <= MAX)`, même `!rn2((MAX-when)+MIN)`, pack `(x<<16)|y`. **RNG ordre identique** (une conso par itération, clang LTR). Si `when > MAX`, ice permanente — comme C. **Confirmation branch-par-branch.**

### `spot_*` / `start_timer` TIMER_LEVEL — `timeout.c` → `js/mkobj.js`
C `start_timer` accepte TIMER_OBJECT et TIMER_LEVEL. JS élargit l’objet-only : `arg` number/`a_long`, duplicate abort sur `(kind, action, a_long)`. `spot_time_left` / `spot_stop_timers` pack 16+16 comme C. `run_timers` : `MELT_ICE_AWAY` + TIMER_LEVEL → dynamic import `melt_ice_away`. REVIVE_MON/ZOMBIFY/BURN restent no-op drop — nommé. **Callers branchés :** `start_melt_ice_timeout`, `melt_ice` (`spot_stop_timers`).

### `melt_ice_away` — `zap.c:5118`
C : sauve `mon_moving`, force TRUE, unpack y=`where&0xFFFF`, x=`(where>>16)&0xFFFF`, `melt_ice(..., "Some ice melts away.")`, restore. JS identique. **Confirmation.** Crédit hero évité.

### `melt_ice` — `zap.c:5040`
**Porté :** DB_ICE mask clear vs ICE→POOL/MOAT via `icedpool` ; `spot_stop_timers` ; `newsym` ; `Norep` si `cansee||u_at` ; `minliquid` si pool et mon (pas hero).

**Sauté (nommé D-0965, payé en partie D-0967) :**
- `trap_ice_effects(x,y,TRUE)` si `t_at`
- `obj_ice_effects(x,y,FALSE)`
- `unearth_objs(x,y)`
- `Underwater` → `vision_recalc(1)`
- boucle boulder `sobj_at` + `boulder_hits_pool`
- `u_at` → `spoteffects(TRUE)` (noyade / notice objects)

Conséquence : un melt timer peut convertir le terrain **sans** déterrer ni retimer les cadavres glacés. D-0967 le nommera et le câblera. Ici c’est un palier terrain+timer, pas melt complet.

### `burn_floor_objects` — `zap.c:4598`
C : SCROLL/SPBOOK/GLOB_GREEN_SLIME ; skip SCR_FIRE/SPE_FIREBALL/`obj_resists(2,100)` ; `for i=quan; i>0; i--` `!rn2(3)` → `delquan` ; `u_caused` → `useupf` else partial `quan`/`weight` else `delobj` ; `give_feedback` plines ; `ignite_items` ; return cnt.

JS : mêmes classes, mêmes skips, **même boucle `!rn2(3)` par unité** (RNG ordre). `useupf`/`delobj` identiques. `void give_feedback` — bras pline **sauté** (zap_over_floor passe FALSE + smoke, donc le caller principal n’en a pas besoin). `ignite_items` existe déjà comme stub local dans `zap.js` (no-op) — pas un throw. **Écart :** feedback visuel seulement, pas le compteur ni le RNG.

### `zap_over_floor` ZT_FIRE — `zap.c:5163`
**Porté :**
- WEB : `Norep` + `delfloortrap` + `newsym` si `see_it`
- `is_ice` → `melt_ice(x,y,null)` (msg défaut C)
- `is_pool` : `create_gas_cloud(x,y,rnd(5),0)` hors waterlevel ; POOL→ROOM+`maketrap(PIT)` + `rangemod-=3` ; `dotrap`/`mintrap` si ROOM ; messages hissing/evaporate
- fountain : `create_gas_cloud(..., rnd(3), 0)` + steam pline + `rangemod-=1` + `dryup(x,y,type>0)`

**RNG :** `rnd(5)` vapeur pool, `rnd(3)` fontaine — mêmes points C. Waterlevel skip cloud : porté (commentaire C). **Sauté :** `iflags.last_msg == PLNMSG_ENVELOPED_IN_GAS` (msggiven) — peut double-Norep vs C. Mineur.

### `zap_over_floor` ZT_COLD — `zap.c:5238`
**Porté :** `chance = max(2, 5+temperature*10)` ; WATERWALL **ou** `(lavawall && rn2(chance))` → freeze-moment + `rangemod-=1000` ; sinon icedpool / ICE vs ROOM lava, `rangemod-=3`, messages freeze/bridge/cool.

**Sauté (nommé) :** `bury_objs` ; `obj_ice_effects(..., true)` (C après freeze) ; `fix_wall_spines` lavawall ; `uinwater`/`utrap` TT_LAVA (`rn1(50,20)` TT_INFLOOR) ; DRAWBRIDGE mask ice/floor partiel selon le diff. **RNG lavawall `rn2(chance)` présent.** `bury_objs` absent ⇒ freeze ne enterre pas encore (D-0967).

### `dobuzz` SPE_FIREBALL — `zap.c` ~4865–5027
C : `fireball = (type == ZT_SPELL(ZT_FIRE))` ; skip `zap_over_floor` sur le trail ; hit mon → `break` ; bounce airlevel `type=ZT_WAND(ZT_FIRE)` puis explode quand même ; obstacle `sx=lsx; sy=lsy; break` ; fin `explode(sx,sy,type,d(12,6),0,EXPL_FIERY)`.

JS : `fireball = (type|0)===(ZT_SPELL_0+ZT_FIRE)` ; skip trail ; `fireball_break` ; `fireball_type` (airlevel → `ZT_FIRE`) ; explode `d(12,6)` olet 0. **Confirmation** skip-trail + dégâts reportés à l’explode. **Écart préexistant :** `bchance` JS 10 vs 75, **sans** `In_mines && IS_WALL → 20`. Fireball casse avant bounce, donc mines bounce moins critique ici.

`explode` à ce hash n’a pas encore le combat AD_FIRE (D-0968) — D-log le dit. Fireball **terrain** via `zap_over_floor` dans explode, pas HP mon/hero typed.

### `zap_over_floor` FIRE — citations C
C (`zap.c:5163`) :

```c
        t = t_at(x, y);
        if (t && t->ttyp == WEB) {
            if (see_it)
                Norep("A web bursts into flames!");
            (void) delfloortrap(t), t = (struct trap *) 0;
            ...
        }
        if (is_ice(x, y)) {
            melt_ice(x, y, (char *) 0);
        } else if (is_pool(x, y)) {
            ...
                create_gas_cloud(x, y, rnd(5), 0);
            ...
            } else { /* POOL */
                rangemod -= 3;
                lev->typ = ROOM, lev->flags = 0;
                t = maketrap(x, y, PIT);
```

JS reprend WEB → ice → pool → fountain **dans cet ordre** (pas pool avant ice). Fountain C : `create_gas_cloud(..., rnd(3), 0)` puis `dryup(x,y,type>0)`. JS identique. **Confirmation d’ordre.** Écart `PLNMSG_ENVELOPED_IN_GAS` : C peut supprimer le Norep hissing si le cloud a déjà parlé ; JS peut double-message. Pas de RNG déplacé.

### `zap_over_floor` COLD — citations C
C chance `max(2, 5 + temperature*10)` ; WATERWALL **ou** `(lavawall && rn2(chance))` arrête le rayon (`rangemod -= 1000`). Sinon `bury_objs` **puis** icedpool/ICE. JS a le `rn2(chance)` et le freeze-moment, **pas** `bury_objs` (commentaire `// bury_objs deferred`). Un zap froid sur une pile enterre en C, laisse les objets au sol en JS jusqu’à D-0967. **Écart caller**, nommé.

Lavawall C : VWALL/HWALL + `fix_wall_spines`. JS skip spines — named. `uinwater`/`utrap` TT_LAVA (`rn1(50,20)` TT_INFLOOR) sauté : **RNG manquant** si le héros est dans la lave qui gèle. Rare en suite publique, réel vs C.

### `dobuzz` fireball — bounce vs explode
C après obstacle :

```c
                } else if (fireball) {
                    sx = lsx;
                    sy = lsy;
                    break; /* fireballs explode before the obstacle */
                }
    ...
    if (fireball)
        explode(sx, sy, type, d(12, 6), 0, EXPL_FIERY);
```

JS `fireball_type` + `sx=lsx` analogue. Airlevel : C `type = ZT_WAND(ZT_FIRE)` **sans** clear du flag fireball, donc explode quand même avec type wand-fire. JS `fireball_type = ZT_FIRE`. Si `ZT_WAND(ZT_FIRE)` ≠ `ZT_FIRE` numérique, adtyp explode peut diverger (souvent 1 vs 1+offset wand). À noter ; pas un skip explode.

Hit mon : C `if (fireball) break;` **avant** `zap_hit`. JS `fireball_break`. Trail sans `zap_over_floor` : les cases traversées ne brûlent pas les scrolls jusqu’à l’explode 3×3. **Confirmation** vs un port naïf qui zapperait chaque case.

### `ignite_items` dans `burn_floor_objects`
C appelle `ignite_items(level.objects[x][y])` après la boucle. JS aussi. Au hash 526eb273, `ignite_items` dans `zap.js` est un stub no-op (commentaire D-0965). Pas de throw. C allume potions/lampes (RNG interne du vrai helper) — **dette**, pas un crash.

## Constitution / playbook
Grep JS : pas de `FORCE`/`DIAG`/`getRngLog`/`readFileSync`/`fs`/`node:`/`fastforward`/seeds en contrôle. Frozen non touchés. Rule #2 OK. `melt_ice`/`zap_over_floor`/`dobuzz` déjà async via pline — pas de nouvel await hors input. Dynamic import `melt_ice_away` depuis `run_timers` : cycle mkobj↔zap, pas un filesystem. Timers dans `mkobj.js` (pas `timeout.js`) — dette structurelle préexistante, pas introduite ici. **RAS** constitution du JS. **PROCESS** : mélange cadence+port.

## Densité (§2b)
Right size **pour le port** (famille ice/burn/fireball `zap.c` + TIMER_LEVEL). Too mixed **pour le process** : CURRENT 44/44 dans le même hash. Playbook : un commit cadence ne devrait pas porter du C. Pas too-small : 409 lignes zap + timers réels.

## Documentation
D-0965 « fixed » pour WEB/ice/POOL/fountain/cold/burn/fireball trail — **vrai**. Deferrals bury/unearth/obj_ice, lavawall spines, burn feedback, explode AD_FIRE combat — honnêtes (D-0967/D-0968). `debt.md` retire le bullet ice et garde bury. CURRENT chiffres #1235. Pas d’overclaim « melt complete » ni « explode complete ».

## Vérification
Journal : green+strict ; zap/shared 16/16 ; **full sessions 44/44 @#1235** Scr 11405 RNG 100% `30+0.27/turn`. Preuve cadence **réelle**, pas seulement « fortress held ». Cohorte zap pertinente. #1270=43/44 plus tard n’est pas ce hash.

Le mix cadence+port signifie : on ne peut pas bisect « est-ce le refresh CURRENT ou le melt_ice qui a touché le keystream ? » sans relire le diff. C’est exactement le smell playbook. La preuve 44/44 **couvre** le port (sessions ont tourné **après** le C), donc ce n’est pas un cadence-only déguisé — c’est pire pour la revue : deux intentions, une preuve unique.

## Callers non branchés / RNG restant
- `start_melt_ice_timeout` n’est appelé que depuis les bras ice-firm / freeze de `zap_over_floor` (et éventuellement mklev ice — hors diff). Si mklev pose de la glace sans timer, C a d’autres callers (`mkice` etc.) non portés ici.
- `burn_floor_objects` callers : `zap_over_floor` FIRE (give_feedback FALSE) ; explode 3×3 via zap_over_floor. Un caller C `give_feedback TRUE` (vision) n’a pas les plines.
- `d(12,6)` fireball : un seul jet en fin de `dobuzz`, clang LTR 12 puis 6. JS `d(12, 6)` identique. Pas de `d` sur le trail.
- `create_gas_cloud(rnd(5))` / `rnd(3)` : si `create_gas_cloud` JS ignore le count, le RNG est consommé (rnd avant l’appel) — **ordre OK** même si le cloud est stub.

## Risques / dette
1. **Mélange cadence+port** — historique CURRENT mêlé au C ; bisect/revue plus dure.
2. `melt_ice` sans `unearth_objs`/`obj_ice_effects`/`spoteffects` — palier (D-0967).
3. COLD sans `bury_objs` — freeze terrain only.
4. `give_feedback` no-op ; `ignite_items` stub.
5. Bounce mines `bchance=20` toujours absent.
6. `is_moat` juiblex.


## Lecture terrain vs timer
`melt_ice` change `typ` **avant** `spot_stop_timers`. Si un second timer MELT est posé sur la même case (duplicate abort `start_timer` TIMER_LEVEL), `spot_stop_timers` enlève **tous** les MELT_ICE_AWAY (x,y). C `spot_stop_timers` idem. **Confirmation.**

`melt_ice_away` force `mon_moving=true` pour que `minliquid` → `mondead` ne crédite pas le héros. JS pose `game.context.mon_moving = true` puis restore. Si `context` absent, JS l’alloue — C a toujours `svc.context`. OK.

WEB `delfloortrap` : C `(void) delfloortrap(t), t = NULL`. JS doit nullifier pour ne pas `dotrap` un WEB déjà brûlé dans le même `zap_over_floor`. Si JS garde `t`, un bras plus bas pourrait retrigger. Vérifier le patch FIRE : WEB puis ice/pool — WEB n’est pas une pool. **Ordre sûr.**

Fountain `dryup(x,y,type>0)` : `type>0` distingue zap héroïque vs monstre. JS `type>0` identique. RNG `dryup` interne (hors revue) consommé au même point.

Ice permanente : `when > MAX_ICE_TIME` n’installe pas de timer. C commentaire « sometimes the ice will become permanent ». JS identique. Un freeze sans timeout n’appelle jamais `melt_ice_away`. Pas un leak timer.

## Process vs qualité
PROCESS-SMELL ici **n’est pas** « le C est mauvais ». C’est « deux livrables ». Un split aurait été : commit cadence CURRENT-only, commit D-0965 zap. Le playbook le demande. La note 7/10 reflète un port 8 et un process 5, pas un 5 global sur melt_ice.


## Verdict
- Verdict : **PROCESS-SMELL**
- Note : **7/10** (port ~8, process ~5)
- Si je ne devais retenir qu’une critique : le C ice/burn/fireball est un vrai cluster RNG-fidèle (`while !rn2`, `rnd(5)`/`rnd(3)`, `d(12,6)`), mais le commit **mélange** refresh #1235 et D-0965 — flag playbook, pas un shim.
