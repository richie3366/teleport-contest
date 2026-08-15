# Review — `aaac3f9d` — D-1023 lamp / cocktail / trap / BoT

## Métadonnées
- Hash complet / court : `aaac3f9dea463fdfaf34ed9f23b253893c1eac9a` / `aaac3f9d`
- Parent : `7f9526207431d5661fce6967e3e8aa7aa74fbee8`
- Auteur, date : Raphaël Hervier (Co-authored-by Cursor), 2026-08-15 14:57:29 +0200
- D-id : **D-1023**
- Stats : 9 files, **+499 / −39** — `js/apply.js` **+428**
- Fichiers JS / map / cadence : `js/apply.js`, `js/do.js` (`reset_trapset` au `goto_level`) ; debt ; pas de cadence

## Intention vs livrable
Promesse : « Match C `use_lamp`, `light_cocktail`, `use_trap`, and `bagotricks` doapply dispatch ».

Livrable : **quatre** fonctions C sans lien caller/callee (lampe, flasque d’huile, occupation piège, sac à malice) + helpers (`Shk_Your`, `fingers_or_gloves`, `set_trap` occupation). C’est le cluster CURRENT « oil / trap / BoT » avalé d’un coup, exactement le dump prévu après D-1022.

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/apply.js` | `use_lamp` / `light_cocktail` / `use_trap` / `set_trap` / `bagotricks` + wiring `doapply` |
| `js/do.js` | `reset_trapset()` avant `keepdogs` au `goto_level` (C `reset_trapset` on leave) |
| map / D-log | Keep D-1023 ; next flip book/coin |

## Fidélité C ↔ JS

### `doapply` — dispatch : fidèle, TIME trop généreux
C `apply.c:4344` `OIL_LAMP`/`MAGIC_LAMP`/`BRASS_LANTERN` → `use_lamp` (void) ; `POT_OIL` → `light_cocktail(&obj)` ; `4388` `LAND_MINE`/`BEARTRAP` → `use_trap` puis **si** `occupation == set_trap` alors `obj = NULL` (pas `arti_speak`) ; `4279` `BAG_OF_TRICKS` → `bagotricks(obj, FALSE, NULL)`. `res` démarre à `ECMD_TIME`.

JS : mêmes cases, `return true` systématique. Pas de `obj = null` si occupation. `doapply` JS n’a de toute façon pas `arti_speak` en sortie — écart inerte tant que ce bras n’existe pas.

### `use_lamp` — graphe C copié
C `apply.c:1628–1700`. JS `apply.js:5219`.

Ordre : `lamplit` → `end_burn` snuff ; Underwater diving/candle mix ; `age==0` / magic `spe==0` lantern vs « no oil » ; `cursed && !rn2(2)` puis `!rn2(3)` spill `make_glib((Glib&TIMEOUT)+d(2,10))` sinon flicker/nothing ; **else** light `begin_burn`.

JS met un `return` après la branche cursed-fail : équivalent au `if/else` C (le fail ne `begin_burn` pas). RNG `rn2(2)` puis éventuellement `rn2(3)` puis `d(2,10)` : même ordre.

**Écarts :** `check_unpaid` / bill bougie SetVoice nommés. `Shk_Your_apply` / `yname` local `your ${xname}` (déjà faux pour shop). `Glib` JS : `(game.u?.Glib\|0) & TIMEOUT` — si `Glib` n’est pas le mot C `HGlib\|EGlib`, le timeout glib est faux. `begin_burn` (`timeout.js`) est un port antérieur still-named-omit `update_inventory`.

### `light_cocktail` — presque ; `**optr` ignoré
C `apply.c:1703` prend `struct obj **` et écrit `*optr = obj` après split/hold/snuff-merge.

JS `light_cocktail(obj0)` : swallow `no_elbow_room` ; snuff + `freeinv`/`addinv` si `!owornmask` ; Underwater oxygen ; `splitobj(1)` ; light + dim ; unpaid `bill_dummy` (sans SetVoice « in addition ») ; `makeknown` ; `begin_burn` **après** bill (match) ; split → extract + `nomerge` + `hold_another_object`.

`doapply` JS n’utilise plus `obj` après l’await → le `*optr` C est sans effet ici. Si un caller futur (rub / tip) attend le pointeur mis à jour, il cassera.

### `use_trap` / `set_trap` — occupation câblée ; helpers shop minces
C `apply.c:2821–2951`. Gardes `what` dans le **même ordre** (nohands, Stunned, swallow digest/engulf, Underwater, Lev, pool, lava, stairs/ladder, furniture/obstructed/door/trap, air/cloud). DEX/STR `time_needed`, Blind ×2, riding `rnl(10)>3` cursed/Fumble vs `>5`, landmine `force_bungle` vs beartrap `dropx`. Occupation `set_trap`.

JS : `set_occupation(set_trap, …)` import `engrave.js` — le tick occupation est le contrat déjà vu D-0951 (`await occupation()`). `goto_level` appelle `reset_trapset` (C leave).

**Écarts :** `You_cant` C vs `You can't` JS (apostrophe, match visuel). `use_unpaid_trapobj` = `bill_dummy` seul (SetVoice omis). `On_stairs` C vs `stairway_at` JS comme garde — OK si la table stairs est complète. `maketrap` / `dotrap` / `feeltrap` sont des ports trap.js **partial** : un piège armé n’est pas le `dotrap` C.

C `doapply` après `use_trap` : même « You can't set » **prend un tour** (`res` reste TIME). JS `return true` : match.

### `bagotricks` — RNG fidèle ; charge / seencount minces
C `makemon.c:2554`. `spe<1` empty vs `nothing_happens` + `cknown` si dknown+name_known ; sinon `consume_obj_charge(bag, !tipping)` ; `!rn2(23)` → `creatcnt += rnd(7)` ; `makemon(NULL, ux, uy, NO_MM_FLAGS)` ; seecount canspot/sensemon ; makeknown si vu.

JS : même RNG, même boucle. `consume_obj_charge` local = `spe--` **sans** unpaid (`_maybe_unpaid` void). `seencount` C est `int*` ; JS attend `{n:}` — `doapply` passe `null` (match). Un tip C incrémente `*seencount` ; un tip JS qui passerait un entier casserait. `impossible("bad bag")` C vs `return 0` JS.

`makemon(null, …)` dépend du générateur aléatoire de monstre JS — un BoT n’est pas le bestiaire C.

## Constitution / playbook
Grep diff : pas de FORCE/DIAG/fs/fastforward/seed-gate. Rule #2 RAS. `await` occupation/`nhgetch` via `yn_function` riding. `reset_trapset` au `goto_level` n’est pas un await hors contrat.

## Densité (§2b)
**Too big.** Quatre familles C (apply lumière ×2, occupation trap, makemon BoT). Playbook : une famille. Replay D-1022 / D-0951.

## Documentation
D-log nomme unpaid / SetVoice / consume_obj_charge. Sous-vend `begin_burn` / `maketrap` / `makemon(NULL)` comme surface réelle. CURRENT a ensuite cassé le cluster (flip, puis candle, …) — le dump n’a pas enseigné la densité.

## Vérification
Green + cohort apply. Public **unhit**. Private node journal (non relu ici) : empty / begin — ne falsifie pas `set_trap` multi-tour, spill glib, BoT `rn2(23)`.

## Risques / dette
1. Densité : quatre C Keep’d sans review de corps jusqu’ici.
2. `makemon(NULL)` / `dotrap` / `begin_burn` : le « Match C » est le **dispatch**, pas l’effet.
3. `consume_obj_charge` sans shop.
4. `light_cocktail` sans `**optr`.
5. Occupation trap : premier chemin occupation apply hors pickaxe — à canarier en privé (beartrap au sol, 2–5 tours).

## Verdict
- Verdict : **QUALITY-RISK**
- Note : **4.5 / 10**
- Une phrase : le **squelette** (ordre des gardes, RNG lamp/trap/BoT, occupation `set_trap`, TIME même sur échec trap) est une copie C ; en coller quatre dans le même SHA, plus des callees encore partials, c’est le même overclaim que D-1022.
