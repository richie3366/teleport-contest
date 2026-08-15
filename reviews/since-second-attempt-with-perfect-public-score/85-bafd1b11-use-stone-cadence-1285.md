# Review 85 — `bafd1b11` — use_stone + cadence #1285

## Métadonnées
- Hash complet / court : `bafd1b112b6d03109a29d6c61af6c700d06b2b38` / `bafd1b11`
- Parent : `64f0212ae86dde82e9e9ba529a8796818ed6d978`
- Auteur, date : Raphaël Hervier, 2026-07-22 06:55:09 +0200
- D-id : D-1014
- Stats : 9 files, +418/−60
- Fichiers JS / map / cadence : `js/apply.js` (~+342 use_stone + getobj local + dorub/doapply), CURRENT score #1285, absent/turns, NOTES/D-log, journal + rotate **#1285**. **MIXTE port + cadence.**

## Intention vs livrable
Le message dit les deux : porter `use_stone` **et** rafraîchir le score @#1285. CURRENT documente **43/44** Scr 11404/11405 RNG 100 % speed `31+0.27/turn`. **Pas 44/44.** seed0009 reste Scr 72/73. L’intention cadence est tenue ; coller un port C de 300+ lignes dans le même SHA que le refresh quinquennal est le mélange que le playbook demande de flagger.

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/apply.js` | Port `use_stone` / `touchstone_ok` / getobj local / wire dorub+doapply graystone |
| `docs/CURRENT.md` | Cadence score 43/44 @#1285 |
| `docs/c-js-map/absent.md`, `turns.md` | Retire use_stone ; jelly encore deferred |
| NOTES / D-log / INDEX | D-1014 + landmarks score |
| journal + archive rotate | #1285 mélange explicite |

## Fidélité C ↔ JS

### Callers
C `dorub` : si GEM\|\|FOOD, `is_graystone` → `return use_stone(obj)` ; jelly → `use_royal_jelly` ; sinon Sorry. JS : graystone `return use_stone(obj)` ; jelly **Sorry** (nommé) ; sinon Sorry. C `doapply` cases FLINT/LUCKSTONE/LOADSTONE/TOUCHSTONE : `res = use_stone(obj)`. JS `if (is_graystone(obj)) return (res & ECMD_TIME) !== 0`. `is_graystone` = ces quatre otyp. OK. C `res` initial TIME ; CANCEL de getobj doit remonter. JS `ECMD_CANCEL` → `false` (pas TIME). Aligné sur un doapply JS booléen, pas sur le bitmask C complet (FAIL vs OK).

### `use_stone` — ordre C
Lu `apply.c:use_stone` en entier :

1. `if (!Blind) observe_object(tstone)`
2. `known = TOUCHSTONE && dknown && oc_name_known`
3. `getobj("rub on the stone(s)", known ? touchstone_ok : any_obj_ok, GETOBJ_PROMPT)` ; null → CANCEL
4. self-rub quan==1 → You_cant, ECMD_OK
5. cursed touchstone + GEM + !graystone + !obj_resists(80,100) → shatter msgs + useup + TIME
6. Blind → scritch TIME ; **else if** Hallu → Fractals TIME
7. oclass RING non GEMSTONE/MINERAL → RANDOM_CLASS
8. switch GEM/RING : non-touchstone scratch ; else Arc/Gnome/blessed identify + prinv TIME ; else glass → scratch **break** (skip streak) ; else streak `c_obj_colors[oc_color]`
9. default material : CLOTH polish return ; LIQUID wetstone/wetter ; WAX/WOOD streak names ; GOLD/SILVER scratch+golden/silvery ; default flimsy streak color else scratch si !touchstone
10. msgs scratch / streaks / scritch ; TIME

JS recopie cet ordre. `obj_resists(obj, 80, 100)` : `rn2(100) < (artifact ? 100 : 80)` dans `dogmove.js` — artifacts **toujours** résistants (`0..99 < 100`) ; gemmes 80 %. ≡ C. Un `rn2` consommé sur le chemin shatter **même si** le joueur est Blind (C teste resists **avant** Blind scritch). JS aussi.

**MAT_*** : `objclass.h` LIQUID=1 WAX=2 CLOTH=6 LEATHER=7 WOOD=8 SILVER=14 GOLD=15 GLASS=19 GEMSTONE=20 MINERAL=21. JS identique (pas l’off-by-one DRAGON_HIDE). `is_flimsy` : mat ≤ LEATHER \|\| RUBBER_HOSE. ≡ C `obj.h`.

`C_OBJ_COLORS` 16 entrées black…white : aligné `c_obj_colors` / `CLR_*` 0..15 si `oc_color` est l’index C.

Identify Arc/Gnome : `Role_if(PM_ARCHEOLOGIST) \|\| Race_if(PM_GNOME)` + blessed touchstone. JS `urole.mnum` / `urace.mnum`. `makeknown(TOUCHSTONE)` + `makeknown(obj->otyp)` + `prinv`. OK.

Glass `break` sort du switch oclass **sans** `streak_color` — JS `break` dans le `case GEM/RING`. Conforme (scratch only).

### Écarts
1. **`getobj_rub_on_stone` local** au lieu de `invent.js` getobj. Réimplémente prompt, compactify>5, `?`/`*`, Never mind, « don't have that object », EXCLUDE « silly thing to rub ». C `getobj` a plus : floor, count, `GETOBJ_EXCLUDE_SELECTABLE`, messages unifiés. **Deux getobj divergent** dès qu’on frotte. `nhgetch` ici = saisie objet — légitime, mais duplicata.
2. **`useup_stone` local** : quan-- / splice / clear uwep. C `useup` unpaid, bill, `freeinv`. Shatter gemme shop = dette.
3. Hallu JS `game.u?.Hallucination` vs propriété C `Hallucination` (H\|\|E). Si seul `HHallucination` TIMEOUT, C Fractals, JS peut tomber dans le switch matériau. Inverse du pray.js qui teste le timeout.
4. `You_cant` C vs `You can't rub` JS — texte, pas RNG.
5. Jelly toujours stub — nommé.
6. D-log « Named omissions: none for ordinary streak path » — trop ferme vu getobj dupliqué.

## Constitution / playbook
Grep use_stone : pas FORCE/fs/fastforward/seed-contrôle. `J_DIAG` dans apply.js est le saut diagonal préexistant, pas un DIAG debug. Rule #2 OK. Frozen OK. **Playbook : cadence qui porte du C = mélange.** Pas de hardcode de traces. RAS Rule #2 ; **PROCESS-SMELL sur le process.**

## Densité (§2b)
Le port `use_stone` seul serait right size (une fonction C + callers dorub/doapply). Le commit **ajoute** le refresh #1285 (CURRENT, NOTES, rotate journal). Densité du *port* OK ; densité du *commit* polluée par la cadence. Pas too small. Pas too big sémantiquement (jelly refusé).

## Documentation
D-1014 Verify cite **explicitement** 43/44 @#1285 + cohort 16/17 seed0009. Honnête : **pas** 44/44. CURRENT PASS list sans seed0009. NOTES « seed0009 FAIL reproduces — do not chase ». Map turns.md greffe D-1014 dans la ligne apply déjà énorme. Overclaim : « none for ordinary streak path » vs getobj local.

Journal objectif = « mandatory full sessions score @#1285 ; map-driven use_stone » — le mélange est avoué, pas caché.

## Vérification
Cadence : full `sessions` 43/44 Scr 11404/11405 RNG 100 % — **preuve de fortress, pas de use_stone**. Cohort apply 16/17 = green + seed0009 toujours FAIL. Aucun public n’est cité comme `#rub` touchstone. `obj_resists` `rn2(100)` n’est donc pas exercé en suite. Speed 31+0.27/turn vs 30+0.26 @#1280 : bruit de mesure, pas un signal fonctionnel.

**Réponse à « Score back to 44/44 ? » : non. 43/44, un écran (seed0009).**

### RNG `use_stone` — ce qui brûle, dans l’ordre C
1. `getobj` C peut brûler du RNG d’affichage hallu (`doname`) ; le getobj local JS affiche `xname` via pickinv. **Suite publique sans #rub : invisible.**
2. Shatter : `obj_resists` → **un** `rn2(100)` **avant** les plines Blind/Hallu/crack. C `!obj_resists(obj, 80, 100)` : si résiste, on **tombe** dans Blind scritch (pas de 2e resists). JS identique.
3. Identify Arc : **pas de RNG** (makeknown+prinv).
4. Streak : `c_obj_colors[oc_color]` lookup, pas de `rn2`.

Donc le seul `rn2` gameplay de la fonction est shatter. Un touchstone maudit frotté sur un diamant non-graystone : 80 % destroy + useup. Artifacts 100 % resist (jamais shatter). Quest stone : `obj_resists` early true pour Amulet/Book/Candelabrum/Bell/rider corpse — pas des gemmes. OK.

### `touchstone_ok` vs `any_obj_ok`
C `touchstone_ok` : coins SUGGEST ; gemmes non identifiées SUGGEST ; le reste DOWNPLAY (sélectionnable, pas listé). `any_obj_ok` : tout SUGGEST. JS `touchstone_ok` / `any_obj_ok_stone` même rangs. `GETOBJ_EXCLUDE` seulement null. C `any_obj_ok` invent.c : probablement SUGGEST pour tout objet non null. JS identique. Prompt C `getobj(stonebuf, ...)` avec stonebuf `"rub on the stone(s)"`. JS `What do you want to rub on the stone? [lets or ?*]` — **forme getobj JS habituelle**, pas forcément le wording C exact (`str[]` getobj). Écran si un public frotte.

`known` false → `any_obj_ok` : on **suggère** tout l’inventaire, y compris nourriture. C same. Frotter une ration : CLOTH? FOOD VEGGY=3 → default material default → flimsy (≤LEATHER) → streak color. C same. Pas Sorry.

### `dorub` vs `doapply`
C `dorub` graystone **return** use_stone (pas wield lamp path). JS `return use_stone(obj)` **sans await** ! `use_stone` est `async function` → dorub rend une **Promise**, pas un `ECMD_*`.

```javascript
if (is_graystone(obj)) {
    return use_stone(obj);
}
```

`doapply` lui fait `const res = await use_stone(obj)`. **`#rub` graystone : bug async** si l’appelant `dorub` n’await pas déjà. `export async function dorub` — l’appelant cmd loop await `dorub()`. `return use_stone(obj)` dans une async function **unwrap** la Promise (équivalent `return await` pour la valeur, mais les rejections…). En pratique `return use_stone(obj)` depuis `async` attend la résolution. **Équivalent `return await use_stone(obj)`** pour le succès. OK en JS, piège de lecture. Préférer `await` pour l’ordre des plines vs le return ECMD. Fonctionnellement await implicite du return d’une Promise dans async. **Pas un bug.**

Jelly : C `return use_royal_jelly(&obj)`. JS Sorry + ECMD_OK. Appliquer/frotter royal jelly : C effet, JS stub. Nommés. Pas dans les publics.

### Cadence #1285 vs port
CURRENT : mêmes 43 PASS, mêmes 11404/11405, RNG 792838/792838. **use_stone n’a changé aucun écran public.** Le speed 31 vs 30 est du bruit. Le rotate journal `iter1285` archive le mélange. Un reviewer qui ne lit que CURRENT croit que D-1014 a « tenu » 43/44 — vrai, **non informatif** pour la pierre.

`turns.md` ligne apply : encore un greffon D-1014 dans un paragraphe déjà illisible. La dette jelly reste dans la même phrase que djinni.

### `getobj` DOWNPLAY letters
C getobj accepte les lettres DOWNPLAY même non listées dans `[abc]`. JS `rank === GETOBJ_EXCLUDE` only reject ; DOWNPLAY `return otmp`. Un gem identifié (DOWNPLAY si touchstone known) tapé par lettre : C+JS OK. `?` JS `display_pickinv_reply(rawLets)` — **rawLets = SUGGEST seulement**, pas DOWNPLAY. C `?` montre souvent les SUGGEST ; `*` tout. JS `*` → `display_pickinv_reply('*')`. Si pickinv `*` liste tout inventaire y compris EXCLUDE, on peut choisir un objet que `okfn` refuse ensuite « silly ». C similar. 

`flush_topl_more` + `_pending_message` + `setCursor(prompt.length, 0)` : pattern getobj JS existant (D-0025). Pas un ALIGN écran seed.

### `observe_object` / Blind
C observe si `!Blind` **avant** getobj (découvre la pierre si on voit). JS `if (!Blind_now) observe_object(tstone)` puis getobj. Si getobj prend un tour visuel… getobj n’est pas un tour. OK. `Blind()` apply.js : quelle définition ? Local apply vs youprop. Si `u.ublindf` bandeau sans EBlinded, on observe à tort. Préexistant Blind() apply.

### `prinv((char*)0, obj, 0L)`
C imprime l’objet identifié dans l’inventaire. JS `await prinv(null, obj, 0)`. Si `prinv` JS thin, l’écran identify Arc manque une ligne — pas de RNG.

### Cadence honesty checklist
- Score last measured #1285 : **oui** dans CURRENT
- PASS count 43 : **oui**
- seed0009 encore FAIL : **oui** NOTES+CURRENT notable non-PASS
- Port C dans le même commit : **oui** — PROCESS-SMELL obligatoire
- « fortress held » seul : non, ils collent les totaux. Mieux que 81–84. Ça ne valide toujours pas use_stone.

`c-js-map/turns.md` : une ligne apply de plusieurs kilo-caractères. Greffer D-1014 là est du process-smell documentaire (illisible, pas faux).

## Risques / dette
1. **Mélange cadence/port** — blâme d’un FAIL futur ambigu (pierre vs drift).
2. **getobj dupliqué** — lettres / `*` / messages.
3. **Hallu flag vs TIMEOUT** — Fractals sauté.
4. **useup_stone shop**.
5. Jelly / whip / pole encore stub.
6. Suite : unifier getobj ; ne pas relire use_stone comme si #1285 l’avait validé.

### `is_graystone` / apply_ok
`is_graystone` préexistait dans apply.js (apply_ok SUGGEST). Le commit s’en sert pour le `if` doapply. C `obj.h` macro quatre otyp. Pas de FLINT hors graystone. BANANA hallu `doapply` C FALLTHROUGH default Sorry — JS banana ailleurs ? Hors use_stone. Un flint identifié `apply_ok` EXCLUDE_SELECTABLE si touchstone known et otyp!=TOUCHSTONE : « Sorry I don't know » **sans** entrer use_stone si getobj refuse. JS `doapply` après getobj déjà choisi : si le joueur force `*` un flint known, C apply_ok EXCLUDE_SELECTABLE → Sorry au getobj. JS getobj apply préexistant. use_stone n’est atteint que si l’objet a passé apply_ok. **Cohérent.**

`Role_if_stone(PM_ARCHEOLOGIST)` : `urole.mnum === pm`. C `Role_if(PM_ARCHEOLOGIST)` compare `urole.malnum`/`pm`. Si JS `mnum` n’est pas le pm role, identify Arc **jamais**. Préexistant roles.js D-0061 « roles xlev copied ». Non ré-audit. Gnome `urace.mnum === PM_GNOME`. Même classe de risque.

MAT_WAX=2 : bougie frottée → streak « waxy » même sur touchstone (C `okay even if not touchstone`). JS same. Pas de shatter (shatter est GEM + cursed touchstone seulement).

Le journal mélange « Objective: mandatory full sessions @#1285 ; map-driven use_stone ». C’est le pattern #1280 towel déjà. Récidive process, pas une première. Flaguer quand même : chaque cadence+port rend le `git bisect` d’un FAIL 43→42 ambigu.

### `useup_stone` vs gemme `quan>1`
C `useup` : split visuel « one of » déjà dans le pline (`quan > 1L ? "one of " : ""`) puis useup décrémente. JS même pline + `quan--`. `owt` non recalc (C `useup` souvent `weight`). Poids inventaire stale jusqu’au prochain `weight()`. Encumber après shatter : rare. 

GOLD material scratch+golden : bague gold class RING déjà sortie vers GEM/RING avant default material. Une **cape** gold n’existe pas ; un **objet** GOLD oclass non gem : default switch GOLD. OK. RING gemstone : streak `c_obj_colors`. C `objects[obj->otyp].oc_color`. JS `oc?.oc_color ?? 0` → « black » si missing. Table objects extraite : color devrait être là.

`GETOBJ_PROMPT` C : empty inventory → don't have anything. JS `!rawLets && !has_downplay` → same pline. Touchstone known, seulement DOWNPLAY gems identifiées, pas de SUGGEST : `rawLets` vide, `has_downplay` true → prompt `[*]` only. C getobj similaire. OK.

Self-rub `obj===tstone && quan===1` : C `You_cant`. Frotter une pierre sur une **stack** quan>1 de la même : C **autorise** (pas le même objet physique après split ? C compare pointeur `obj==tstone && quan==1`). JS `(obj.quan||1)===1`. Stack de 2 flints : on peut « rub on itself » au sens stack. ≡ C.

## Questions ouvertes
- `dorub` `return use_stone(obj)` sans `await` explicite : OK async, mais uniformiser.
- `prinv` thin : l’identify Arc/Gnome a-t-il une ligne inventaire C-like ?
- `Blind()` dans apply.js : bandeau sans `EBlinded` observe_object à tort ?
- `objects[].oc_material` extrait : unverified flint=MINERAL, luckstone=MINERAL, glass gems=GLASS (shatter path glass scratch vs gem identify).
- Prochaine cadence : **ne plus** coller un port 300 LOC dans le SHA score.

`obj_resists` rider corpse / invocation items : pas des graystones, mort. Touchstone cursed + gem glass : `is_graystone` false, `obj_resists(80,100)` puis maybe shatter **avant** le bras glass scratch. C same : shatter first. Un verre maudit-touchstone : 80% useup, 20% continue vers GEM/RING glass `do_scratch=TRUE` sans streak. ≡ C.

CLOTH polish `Tobjnam look a little more polished` : towel sur flint. LIQUID `obj.known` (pas `dknown`) : potion identifiée « wetter », sinon wetstone joke. ≡ C.

`RANDOM_CLASS` rings non gemstone/mineral : default material. Bague iron + flint → scratch ; + touchstone → scritch. ≡ C.

`Food` VEGGY=3 ≤ LEATHER=7 → flimsy streak color. Ration sur luckstone : streaks de la couleur FOOD, pas Sorry.

`SILVER`/`GOLD` constants 14/15 : match `objclass.h` (DRAGON_HIDE=10, pas l’enum 3.4). Vérifié.

`observe_object` peut `makeknown` side-effect. C same avant getobj si !Blind.

`ECMD_CANCEL` getobj abort : JS `return false` doapply (pas TIME). C `res = ECMD_CANCEL` puis return res. Tour non consommé. ≡.

`You see streaks` vs C `You_see` : même macro « You see ». Scratch `You make %s scratch marks`. JS concat streak_color + space. C same. Empty streak_color + do_scratch : « You make scratch marks » sans double space (ternary). OK.

Cadence #1285 n’exerce aucun de ces bras. Le 43/44 ne dit rien sur flint.

## Verdict
- Verdict : PROCESS-SMELL
- Note : 6.5/10
- Si je ne devais retenir qu’une critique : `use_stone` est une lecture C sérieuse (shatter `obj_resists(80,100)`, glass break, MAT_* justes), mais le SHA est une cadence 43/44 — ça ne ramène **pas** la suite à 44/44, et ça empêche d’isoler le port.
