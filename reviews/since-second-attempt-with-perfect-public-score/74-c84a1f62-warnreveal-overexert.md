# Review 74 — `c84a1f62` — warnreveal, overexert_hp, Upolyd eel regen_hp

## Métadonnées
- Hash complet / court : `c84a1f6232554f17d8e617a8aa7623966f7533c4` / `c84a1f62`
- Parent : `6245f20d16a4d7197e54a945662de79b03cd9f38`
- Auteur, date : Raphaël Hervier, 2026-07-22 05:23:07 +0200
- D-id : D-1003
- Stats : 12 files, +180/−50 (dont archive journal)
- Fichiers JS : `allmain.js`, `detect.js`, `hack.js`, `dokick.js`, `uhitm.js`

## Intention vs livrable
Promesse : porter `warnreveal`, `overexert_hp`, et le bras anguille de `regen_hp`, sous forteresse, sans gates seed-shaped. Le diff fait **trois** câblages consecutifs du moveloop C après D-1002, plus le callee melee `overexertion`.

Ce ne sont **pas** « trois trucs HP/tour » homogènes : `warnreveal` est un scan Warning 3×3 (`detect.c`), pas de HP. Le vrai lien est **la suite linéaire de `allmain.c`** : `regen_hp` (porte eel) → `overexert_hp` encumber → … Searching → `warnreveal`.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/allmain.js` | Gate eel sur l’entrée `regen_hp` ; bras eel ; `overexert_hp` encumber ; `Warning` → `warnreveal` ; helpers Regeneration/Breathless/Half_physical/Warning |
| `js/detect.js` | Port `warnreveal` |
| `js/hack.js` | Port `overexert_hp` + corps manquant de `overexertion` (HVY + moves%3) ; `overexertion` devient async |
| `js/dokick.js` / `js/uhitm.js` | `await overexertion()` (signature) |
| map `turns.md` + D-1003 | Docs |

## Fidélité C ↔ JS

### 1. `regen_hp` anguille — `allmain.c:regen_hp` / `js/allmain.js:regen_hp`

C moveloop **entre dans** `regen_hp` si `!Upolyd ? uhp<uhpmax : (mh<mhmax || youmonst.data->mlet == S_EEL)`. JS ajoute `|| mlet === 'S_EEL'`. Sans ça, une anguille à mh plein **ne perdrait jamais** de HP hors eau. Conforme.

C à l’intérieur :

```631:641:nethack-c/upstream/src/allmain.c
    if (Upolyd) {
        if (u.mh < 1) {
            rehumanize();
        } else if (gy.youmonst.data->mlet == S_EEL
                   && !is_pool(u.ux, u.uy) && !Is_waterlevel(&u.uz)
                   && !Breathless) {
            if (u.mh > 1 && !Regeneration && rn2(u.mh) > rn2(8)
                && (!Half_physical_damage || !(svm.moves % 2L)))
                heal = -1;
```

JS : `mlet === 'S_EEL'` — **correct** dans ce port (`mlets[]` sont des chaînes `"S_EEL"`, pas le char C). `is_pool` importé de `hack.js`. `Is_waterlevel(u.uz)`. `Breathless` / `Regeneration` / `Half_physical_damage` extraits en helpers.

RNG : `rn2(u.mh) > rn2(8)` — les deux `rn2` **toujours** évalués (opérateur `>`, pas `&&`). JS `rn2(u.mh|0) > rn2(8)` LTR : identique clang. `moves % 2` n’est **pas** du RNG ; short-circuit si `!Half_physical_damage` — identique.

**Saut :** `u.mh < 1` → C `rehumanize()` ; JS no-op commenté. Nommé. Un héros poly à mh 0 **reste coincé** au lieu de rehumanize.

Après `heal = -1`, C fait `u.mh += heal` + botl. JS `if (heal) { u.mh += heal }` — `heal === -1` est truthy : OK.

### 2. `overexert_hp` / `overexertion` — `hack.c:3035–3060`

C `overexert_hp` : pointeur `Upolyd ? &mh : &uhp` ; si `*hp > 1` décrémente + botl ; sinon pline pass-out, `exercise(A_CON, FALSE)`, `fall_asleep(-10, FALSE)`. **Zéro RNG.**

JS : copie fidèle, `await pline`, `fall_asleep` déjà dans `hack.js`.

C `overexertion` : `gethungry()` ; si `(moves % 3) != 0 && near_capacity() >= HVY_ENCUMBER` → `overexert_hp()` ; return `multi < 0`.

JS **avant** ce commit : `gethungry()` + return multi seulement (commentaire « no RNG when not heavily encumbered » — le bras HVY n’a d’ailleurs **pas** de RNG, seulement `moves%3`). Le trou était sémantique HP, pas RNG. Maintenant câblé.

Callers C : `do_attack` / kick. JS : `uhitm.js do_attack` et `dokick.js maybe_kick_monster` passés en `await`. Grep au commit : **pas d’autre** `overexertion(`. Court-circuit `attack_checks() || overexertion()` : si checks vrai, pas d’overexert — C et JS identiques.

### 3. Moveloop encumber — `allmain.c:297–302`

C : **après** `regen_hp`, **avant** `regen_pw` :
`if (mvl_wtcap > MOD_ENCUMBER && u.umoved)` puis `!(wtcap < EXT ? moves%30 : moves%10)` → `overexert_hp()`.

JS inséré au même endroit. Modulo 0 → appel (C `!(expr)` sur le reste). Fidèle.

### 4. `warnreveal` — `detect.c:2107–2119`

C : double boucle `ux±1, uy±1`, skip `!isok` et `u_at`, `m_at` && `warning_of` && `mundetected` → `mfind0(mtmp, 1)`.

JS : mêmes bornes, `x===ux && y===uy` pour self, `await mfind0(mtmp, 1)`. `warning_of` déjà dans `display.js`. Omission nommée : `set_msg_xy` / `display_nhwindow` flush dans `mfind0`.

C `if (Warning) warnreveal()` **après** Searching, **avant** `were_changes` / `mkot_trap_warn` / `dosounds`. JS : après Searching, avant `dosounds`. `mkot_trap_warn` reste absent (préexistant). Ordre Warning vs Searching : conforme.

Helper `Warning()` : H/E/uprops **et** `u.Warning` plat — même risque de booléen orphelin que D-1002.

### 5. `Breathless` / `Regeneration` / `Half_physical_damage` / `Warning`

C `youprop.h` :
- `Regeneration` = H\|\|E `REGENERATION`
- `Breathless` = Magical_breathing \|\| `breathless(youmonst.data)`
- `Half_physical_damage` = H\|\|E `HALF_PHDAM`
- `Warning` = H\|\|E `WARNING`

JS `Breathless` : uprops MAGICAL_BREATHING + H/E plats puis `breathless(youmonst.data)`. `breathless` import `monsters.js`. Si `youmonst.data` null (poly incomplet), Breathless JS false → l’anguille **perd** HP alors que C pourrait la considérer amphibie. `Half_physical_damage` : pas de `u.Half_physical_damage` plat (contrairement à Warning qui OR `u.Warning`). Incohérence interne au même peel.

`u_can_regen` refactorisé pour appeler `Regeneration(u)` — pas un changement de formule, juste DRY. Sleepy reste H\|\|E plats sans uprops dans `u_can_regen` — préexistant.

### 6. `fall_asleep(-10, FALSE)`
C overexert pass-out. JS `fall_asleep` dans `hack.js` (déjà là). Si l’impl JS de `fall_asleep` ne pose pas `multi < 0` comme C, le `return (multi < 0)` d’`overexertion` raterait le faint melee. Non relu ligne à ligne ici ; le contrat C est « might have fainted (forced to sleep) ».

### 7. `mfind0(..., via_warning=1)`
C `mfind0` early-out si `via_warning && !warning_of(mtmp)` — `warnreveal` a déjà testé `warning_of`, donc redondant. JS `mfind0` existait (via_warning wired d’après le bandeau detect.js). Risque : `mfind0` JS async `await` dans une double boucle 8 cases — 8 awaits max/tour si 8 hiders Warning. C synchrone. Pas un écart RNG si `mfind0` via_warning ne tire pas de `rn2` ; si `mfind0` en tire, l’ordre x puis y (C : x outer, y inner) est respecté.

## Constitution / playbook
Grep JS : RAS (`FORCE`/`DIAG`/`fs`/`fastforward`). `overexertion` async : await uniquement aux deux callers C, pas d’await orphelin. Rule #2 OK. Pas de coordonnées / seeds dans le contrôle. Frozen intacts. `Is_waterlevel` import const — pas un hardcode de niveau public.

## Densité (§2b)
**Right size, légèrement hétérogène.** Pas trop petit. Pas « too big » au sens sous-systèmes sans lien : c’est la **tranche moveloop** que CURRENT avait listée après D-1002. Mais coller `warnreveal` (detect/Warning) dans un titre « HP » est un packaging mensonger. Un peel `warnreveal` seul aurait été trop mince ; le regrouper avec les deux bras HP du **même** `if (!uinvulnerable)` / EOT est défendable.

`overexertion` melee n’est pas EOT : c’est le **même** `overexert_hp`. Caller/callee family OK §2b.

## Documentation
D-1003 Status fixed. Symptom : les trois omits nommément after D-1002. C locus cite `detect.c` `warnreveal`, `hack.c` overexert*, `allmain.c` S_EEL + wires. Deferred : mfind0 set_msg_xy / display_nhwindow flush ; rehumanize mh&lt;1 ; potion/mhitm you_were ; next_to_u/check_leash.

Honnête sur rehumanize. Moins honnête sur le titre « HP/turn » (warnreveal). CURRENT next → you_were wires / leash. Journal #1274 green + allmain 36/37. NOTES suite @#1270 **43**/44. Archive journal rotatée dans le même commit (#1274) — bruit docs, pas du port.

`turns.md` (diff tronqué dans git show mais touché) : doit retirer « warnreveal ; Upolyd eel hp-loss rolls » de la ligne allmain. Si une de ces phrases reste, la map ment.

INDEX : « warnreveal + overexert_hp + Upolyd eel regen_hp | map-driven; green+allmain cohort 36/37 ». Pas de « complete HP subsystem ».

## Vérification
Même cohorte allmain 36/37 que D-1002, cinq minutes plus tard. Aucune session n’exerce anguille poly + Warning mundetected + HVY encumber. Preuve = non-régression green, pas un exercice des bras. Affirmation, pas log de commande.

Green gate CURRENT (inchangé) : seed1500/1800/0060/… — aucun n’est un poly eel. `overexertion` melee HVY n’est pas le chemin public Tourist. `warnreveal` nécessite Warning + adjacent mundetected : rare en public. Le peel est **map-driven** au bon sens : on porte du C non exercé. La cohorte allmain ne peut que dire « on n’a pas cassé Searching/dosounds ».

## Tableau branches (D-1003)

| Site | RNG / gate C | JS commit |
|---|---|---|
| moveloop entre dans regen_hp si eel | `mlet==S_EEL` même mh full | `mlet==='S_EEL'` |
| eel hors eau | `rn2(mh)>rn2(8)` | identique LTR |
| Half_phys eel | `!HPD \|\| !(moves%2)` | identique |
| rehumanize mh&lt;1 | oui | **non** |
| encumber EOT | `wtcap>MOD && umoved` puis %30/%10 | identique |
| overexert_hp hp&gt;1 | −1 botl | identique |
| overexert_hp hp≤1 | pass-out CON sleep | identique |
| overexertion melee | gethungry ; moves%3 && HVY | identique, async |
| warnreveal | 3×3 warning_of mundetected mfind0(1) | identique |

## Risques / dette
1. **`rehumanize` sauté** si mh&lt;1 dans `regen_hp` — C le fait ; JS laisse un poly cadavre.
2. `warnreveal` sans flush `mfind0` : monstre mundetected peut rester invisible à l’écran tout en n’étant plus `mundetected`.
3. `Breathless` / `Half_physical_damage` locaux à allmain — divergence possible vs autres fichiers.
4. `overexertion` async : tout nouveau caller synchrone casserait.
5. Anguille : dépend de `youmonst.data` réellement `S_EEL` après poly (si `mlet` manquant, le bras ne vit jamais).

## Complément — ordre EOT C vs JS après D-1002

C `allmain.c` une fois `regen_pw` passé (D-1002) :

```
Searching && !noautosearch && multi>=0 → dosearch0(1)
if (Warning) warnreveal()
if (were_changes) set_uasmon()
mkot_trap_warn()
dosounds(); do_storms(); gethungry(); …
```

JS au commit D-1003 : Searching → `if (Warning(g.u)) await warnreveal()` → `dosounds`. **Toujours pas** `were_changes`/`set_uasmon` ni `mkot_trap_warn`. D-1002 pose `were_changes++` via `you_were` ; sans `set_uasmon` EOT, Drain_resistance lycan peut rester faux. Ce n’est pas le peel D-1003, mais D-1003 **s’insère** juste avant un trou préexistant. Un lycan allmain (D-1002) + Warning (D-1003) le même tour : C `set_uasmon` après warnreveal ; JS ni l’un ni l’autre wait — warnreveal JS n’a pas besoin de set_uasmon. OK isolément.

`overexert_hp` C **n’est pas** dans `!uinvulnerable` : le héros en prière uinvulnerable skip regen_hp eel **et** tele/poly, mais C fait quand même :

```
if (uinvulnerable) wtcap = UNENCUMBERED;
else if (need hp) regen_hp;
if (wtcap > MOD && umoved) maybe overexert_hp;  // PAS gardé par uinvulnerable !
regen_pw;
if (!uinvulnerable) tele/poly;
```

JS D-1003 : overexert encumber **hors** du `if (uinvulnerable)` wtcap=UNENCUMBERED. Si uinvulnerable, `mvl_wtcap = UNENCUMBERED` qui n’est **pas** `> MOD_ENCUMBER` → overexert EOT skip. C identique (UNENCUMBERED ≰ MOD). Melee `overexertion` n’a pas de gate uinvulnerable en C non plus.

`near_capacity() >= HVY_ENCUMBER` melee vs `mvl_wtcap > MOD` EOT : **deux seuils C différents**. JS copie les deux. Un héros SLT encumber : EOT pas d’overexert (besoin > MOD), melee HVY seulement. Conforme.

`gethungry()` en tête d’`overexertion` melee : peut poser faint **avant** overexert_hp. C identique. Si `gethungry` consomme RNG, l’ordre vs `moves%3` est : d’abord faim, ensuite modulo (pas du RNG). OK.

C `overexert_hp` / `overexertion` (`hack.c`) :

```3035:3060:nethack-c/upstream/src/hack.c
void overexert_hp(void) {
    int *hp = (!Upolyd ? &u.uhp : &u.mh);
    if (*hp > 1) { *hp -= 1; disp.botl = TRUE; }
    else { You("pass out from exertion!");
           exercise(A_CON, FALSE); fall_asleep(-10, FALSE); }
}
boolean overexertion(void) {
    gethungry();
    if ((svm.moves % 3L) != 0L && near_capacity() >= HVY_ENCUMBER)
        overexert_hp();
    return (boolean) (gm.multi < 0);
}
```

Zéro `rn2` dans ces deux fonctions. Un peel qui les « aligne » ne peut pas inventer un jet. Le seul RNG collatéral est celui de `gethungry` (faim) — déjà appelé avant D-1003 dans `overexertion` JS. Le peel **n’ajoute pas** de consommation RNG melee ; il ajoute −1 HP / faint. C’est pourquoi le titre « HP/turn » collait à overexert+eel, pas à warnreveal.

C `warnreveal` (`detect.c`) :

```2107:2119:nethack-c/upstream/src/detect.c
void warnreveal(void) {
    for (x = u.ux - 1; x <= u.ux + 1; x++)
        for (y = u.uy - 1; y <= u.uy + 1; y++) {
            if (!isok(x, y) || u_at(x, y)) continue;
            if ((mtmp = m_at(x, y)) != 0
                && warning_of(mtmp) && mtmp->mundetected)
                (void) mfind0(mtmp, 1);
        }
}
```

Boucle x outer, y inner, self skip, `mfind0(..., 1)`. JS au commit : mêmes bornes, `await mfind0(mtmp, 1)`. Pas de `rn2` ici. La dette est **affichage** (`set_msg_xy` / `display_nhwindow` dans `mfind0`), pas un décalage de keystream allmain.

`Breathless` C pour l’anguille : `Magical_breathing || breathless(youmonst.data)`. Un héros poly anguille **avec** Magical_breathing ne perd **pas** de HP hors eau. JS helper OR Magical_breathing — conforme **si** le flag plat / uprops est posé comme C. Un poly `S_EEL` sans ce flag : les deux `rn2` partent.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7.5/10**
- Si je ne devais retenir qu’une critique : **le C EOT est respecté (gate S_EEL, `rn2(mh)>rn2(8)`, overexert encumber puis melee HVY, `warnreveal` 3×3)** ; ce n’est pas un cluster « HP », et vendre `fixed` sans `rehumanize` est un deferral qui peut laisser un état illégal.
