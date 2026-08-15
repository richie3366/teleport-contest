# Review 82 — `cd503837` — pray in_trouble majors Stoned…Region

## Métadonnées
- Hash complet / court : `cd503837f6a7f12357ff0029196323df0adfd8cd` / `cd503837`
- Parent : `1a66e5dadaa8c9493a58301282d7a87840dbb8c8`
- Auteur, date : Raphaël Hervier, 2026-07-22 06:32:51 +0200
- D-id : D-1011
- Stats : 11 files, +343/−81
- Fichiers JS / map / cadence : `js/pray.js`, `js/potion.js` (`make_sick`), `js/region.js` (`region_danger`/`region_safety`), `js/trap.js` (`rescued_from_terrain`), map `debt.md`, CURRENT/NOTES/D-log, journal + archive rotate. Pas de port mêlé à une cadence score.

## Intention vs livrable
Promet les majors **au-dessus de TROUBLE_HIT** (Stoned…Region) avec bras `fix_worst_trouble` et helpers `make_sick` / `region_danger` / `region_safety` / `rescued_from_terrain`.

Livrable conforme : `in_trouble` insère exactement ces tests **avant** HIT/LYCANTHROPE, et le switch de fix gagne les cases correspondantes. Collapsing…cursed_blindfold et tous les minors restent à 0 — nommé. Pas de D-id manquant. Split D-1011/D-1012 est un cluster sémantique (même fonction C, tranche haute de la liste de priorité), pas un peel d’un `if`.

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/pray.js` | Port : constantes TROUBLE_STONED…REGION, checks `in_trouble`, cases `fix_worst_trouble`, `useup_strangle_amulet` local |
| `js/potion.js` | Port `make_sick` |
| `js/region.js` | Port `region_danger` / `region_safety` |
| `js/trap.js` | Port thin `rescued_from_terrain` / `back_on_ground` |
| `docs/c-js-map/debt.md` | Majors D-1011 ; collapsing+minors encore deferred |
| CURRENT / NOTES / D-log / INDEX | Keep + next collapsing |
| journal + archive rotate | #1282 |

## Fidélité C ↔ JS

### `in_trouble` — l’ordre **est** la spécification
C `pray.c` le dit : la priorité n’est pas la magnitude des `#define`, c’est l’ordre des `if`. Tranche portée ici, collée sur C :

1. `Stoned` → TROUBLE_STONED (14)
2. `Slimed` → SLIMED (13)
3. `Strangled` → STRANGLED (12)
4. `u.utrap && utraptype == TT_LAVA` → LAVA (11)
5. `Sick` → SICK (10)
6. `u.uhs >= WEAK` → STARVING (9)
7. `region_danger()` → REGION (8)
8. (préexistant) HIT puis LYCANTHROPE
9. `return 0` — collapsing et la suite absents, **comme annoncé**

**Écart Strangled :** C `if (Strangled)` (propriété timeout). JS `u.Strangled \|\| HStrangled \|\| EStrangled`. Plus large : un bit H/E orphelin sans `u.Strangled` déclenche le major. Risque de boucle « fix all troubles » si le fix met `Strangled=0` mais laisse un extrinsèque.

Stoned/Slimed/Sick/WEAK/LAVA : tests directs, pas de RNG. `critically_low_hp` inchangé (D-0920). LYCANTHROPE inchangé (D-1004). **Pas de `rn2` inséré au milieu de la liste** — correct : C n’en a pas ici.

### `fix_worst_trouble` majors
- **STONED** : `make_stoned(0, "You feel more limber.", 0, '')` ≡ C `make_stoned(0L, "You feel more limber.", 0, (char *)0)`.
- **SLIMED** : `make_slimed(0, "The slime disappears.")` ≡ C.
- **STRANGLED** : si `uamul` AMULET_OF_STRANGULATION → « Your amulet vanishes! » + useup ; puis « You can breathe again. » ; `Strangled=0` ; botl. JS ajoute `HStrangled=EStrangled=0` (hygiène, pas C). **`useup_strangle_amulet` local** : `setworn(null, W_AMUL)` + splice invent. C `useup(uamul)` fait unpaid, `freeinv`, timers. Shop / `quan>1` amulette : JS `quan--` sans `setworn` si ce n’est pas `u.uamul` — chemin tordu.
- **LAVA** : `if (!safe_teleds(TELEDS_NO_FLAGS)) reset_utrap(TRUE); rescued_from_terrain(DISSOLVED)`. Ordre identique.
- **STARVING** : C FALLTHROUGH dans HUNGRY → `Your %s feels content` + `init_uhunger`. JS **hardcode `'stomach'`** au lieu de `body_part(STOMACH)`. D-1012 corrige. Poly forme sans estomac : écran faux. `talk` N/A.
- **SICK** : `You_feel("better."); make_sick(0L, (char*)0, FALSE, SICK_ALL)`. JS `make_sick(0, '', false, SICK_ALL)`. `talk=false` : pas de « cured. What a relief! ».
- **REGION** : `region_safety()`. OK.
- HIT / LYCANTHROPE : non réécrits (hors le déplacement du switch).

### `make_sick` (`potion.c`)
C lu : onset `xtime>0` → Sick_resistance return ; `!old` « deathly sick » **même si !talk** ; already-sick + talk → much/even worse selon `xtime <= Sick/2` ; `set_itimeout` ; `usick_type |= type`. Cure `xtime==0 && old && (type & usick_type)` : partiel → somewhat better + `Sick*2` ; full → cured msg si talk, `Sick=0`. Puis delayed_killer / dealloc / exercise CON.

JS onset : `You_feel('deathly sick.')` sans tester `talk` — **conforme C**. Already-sick : `xtime <= ((old & TIMEOUT)/2)` — C compare à `Sick` (timeout inclus). À peu près.

**Écart cure :** C `(type & u.usick_type)`. JS `(type | 0) & ((u.usick_type | 0) \|\| SICK_ALL)`. Si `usick_type==0` mais `Sick` encore set, JS entre quand même (OR SICK_ALL). C refuse. Prière passe `SICK_ALL` avec type normalement déjà set : chemin heureux. `#wizintrinsic` KILLED_BY vs KILLED_BY_AN nommé. Unaware talk suppress nommé (`#if 0` en C 5.0 de toute façon).

### `region_danger` / `region_safety`
C `region.c` : pour chaque région, `hero_inside`, `inside_f == INSIDE_GAS_CLOUD`, skip `nonliving \|\| Breathless`, skip `Poison_resistance`, `++n`. JS : `inside_region` + mêmes skips. **Pas de RNG.** Breathless JS = Magical_breathing H/E/flag \|\| `breathless(data)`. Aligné youprop.

`region_safety` C : compte n, mémorise `r` si premier et `ttl >= 0` ; `n>1 \|\| (n==1 && !r)` → `safe_teleds` puis si encore danger `set_itimeout(&HMagical_breathing, d(4,4)+4)` + You_feel breathe ; else if r remove + dissipates ; else already dissipated ; **puis** `if (BlindedTimeout==1) make_blinded(0, TRUE)`. JS : même structure, `d(4,4)+4`, BlindedTimeout **deferred** (cycle do.js). Nommés. `HMagical_breathing` clamp `xt >= TIMEOUT ? TIMEOUT : xt` au lieu de `set_itimeout` bits — pour 8..20, identique.

### `rescued_from_terrain` / `back_on_ground`
C `trap.c` : matrice DROWNING pool/air-bubble, BURNING/DISSOLVED pool/lava/waterwall, sinon `back_on_ground(TRUE)` avec ice/surface/Lev/Fly. JS : DROWNING pool ; BURNING\|\|DISSOLVED pool/lava ; sinon « on solid ground ». D-log nomme waterlevel bubble, IS_WATERWALL, lastseentyp. LAVA pray n’envoie que DISSOLVED : OK si le téléport atterrit hors lave ; si encore lava, JS a le bras « on top of molten lava ».

## Constitution / playbook
Grep JS du commit : pas FORCE/DIAG/getRngLog/fs/node:/fastforward/seed dans le contrôle. Rule #2 OK. Frozen OK. `await safe_teleds` / `make_*` : pas une saisie joueur hors nhgetch. `useup_strangle_amulet` duplique `invent.js:useup` — colle anti-cycle, pas un fake d’inventaire. RAS constitutionnel.

## Densité (§2b)
Right size. Tranche haute d’**une** fonction C + callees nécessaires pour que les nouveaux codes de trouble ne soient pas des no-op (make_sick, region_*, lava rescue). Pas trop petit (ce n’est pas « if Stoned return 14 » sans fix). Pas trop gros (minors reportés à D-1012, annoncé CURRENT).

## Documentation
D-1011 fixed, deferred collapsing…blindfold + minors + BlindedTimeout region + back_on_ground matrix. Honnête. CURRENT next = collapsing. `debt.md` aligné. Journal #1282 green+cohort 15/16 seed0009 préexistant. Score suite toujours 43/44 @#1280 (pas rafraîchi ici — correct, pas une cadence).

Trous non nommés : élargissement Strangled H/E ; `useup` local ; STARVING `'stomach'` (corrigé 10 minutes plus tard en D-1012).

## Vérification
Même pattern loop : green+strict + cohort 15/16. Aucune session publique n’est citée comme prière sous Stoned/nuage. Preuve = non-régression. Un `in_trouble` réordonné **peut** changer l’action `pleased` (fix_worst vs pat_on_head) dès qu’un major existait déjà en JS à 0 et qu’un flag C-équivalent est set. HIT/LYCANTHROPE restent après Region, donc un héros juste « low HP » n’est pas masqué par des majors absents — **sauf** si JS a `u.Strangled` collant. Cohort pray/shared 15/16 : seed0009 toujours FAIL, pas attribué à ce commit.

### Callers : `pleased` relit `in_trouble()` — l’ordre n’est pas cosmétique
C `pleased` (pray.c) :

- `trouble = in_trouble()` **au moment du résultat**, pas `p_trouble` du début de prière (le pire peut changer pendant `nomul`)
- `!trouble && record >= DEVOUT && p_trouble==0` → `pat_on_head` (cadeaux, encore stub JS)
- sinon `action = rn1(luck + (altar?3+shrine:2), 1)` clampé STRIDENT, puis :
  - action haute : `do { fix_worst_trouble(trouble); } while ((trouble = in_trouble()) != 0)` — **tous** les troubles
  - milieu : majors only `while (in_trouble() > 0 && tryct < 10)`
  - bas : un seul `fix_worst_trouble` si `trouble > 0` (un major)

JS `pleased` a déjà ces boucles (D-0920). **Ajouter des majors au-dessus de HIT change quel bras `fix_*` tourne et si `pat_on_head` est interdit.** Un héros Sick+low HP : avant D-1011, `in_trouble` renvoyait HIT (7) et soignait les PV ; maintenant SICK (10) et `make_sick(0)` **sans** le `rnd(5)` uhpmax de HIT. C est ça qu’on veut. Si JS a un `u.Sick` sticky que C n’aurait pas, on **skip** le HIT C-équivalent. Pas de RNG dans `in_trouble` lui-même ; le `rn1` de `pleased` est **en aval** et ne dépend que du signe/magnitude via les seuils `trouble > 0` vs `!= 0`.

`gp.p_trouble = in_trouble()` au **début** de `#pray` (JS ligne ~803) : sert à bloquer pat_on_head si on était en trouble. Nouveau major au start → pas de gift. Conforme C.

### Citations `in_trouble` C (majors portés)

```205:218:nethack-c/upstream/src/pray.c
 if (Stoned) return TROUBLE_STONED;
 if (Slimed) return TROUBLE_SLIMED;
 if (Strangled) return TROUBLE_STRANGLED;
 if (u.utrap && u.utraptype == TT_LAVA) return TROUBLE_LAVA;
 if (Sick) return TROUBLE_SICK;
 if (u.uhs >= WEAK) return TROUBLE_STARVING;
 if (region_danger()) return TROUBLE_REGION;
```

JS Strangled élargi :

```javascript
if (u.Strangled || (u.HStrangled | 0) || (u.EStrangled | 0)) {
    return TROUBLE_STRANGLED;
}
```

C `youprop.h` : `Strangled` est typiquement le timeout / amulette, pas un OU de trois champs JS. Si `setworn` amulette pose `EStrangled` **et** `u.Strangled`, le fix met les trois à 0 — chanceux. Si seul `EStrangled` reste après `useup` raté, `in_trouble` reboucle STRANGLED, `fix` ne voit plus `uamul`, clear flags, sort. Une itération de trop, messages « breathe again » **sans** amulette : écran.

### `make_sick` cure vs prière
Prière : `make_sick(0L, (char*)0, FALSE, SICK_ALL)`. `talk=false` → pas de « better/cured ». JS `You_feel('cured.  What a relief!')` a deux espaces, **non émis** ici. L’écart texte ne pèse que si un potion/spell appelle `talk=true` (hors cluster, mais `make_sick` est exporté).

C delayed_killer : `cause && !strcmp(cause, "#wizintrinsic")` → KILLED_BY. JS toujours `KILLED_BY_AN` + `cause || ''`. Prière cause `''`. Wizard debug seulement. Nommés.

`exercise(A_CON, false)` si `Sick` encore. Cure complète : `dealloc_killer`. JS a `find_delayed_killer` / `delayed_killer` — préexistants potion. Si stubs no-op, la mort maladie peut diverger **plus tard**, pas dans `fix_worst`.

### `region_danger` vs `hero_inside`
C `hero_inside(reg)` vs JS `inside_region(reg, ux, uy)`. Si `hero_inside` C utilise un bit `hero_inside` mis à jour par `in_out_region` et que JS recalcule géométriquement, un nuage dont le bit est stale diverge. Hors lecture de `inside_region` JS : le commit ne change pas `inside_region`. Risque si le port region géométrique ≠ bit C.

`Poison_resistance` skip : C « not harmful enough to be prayer-level trouble ». Un héros poison-res dans un nuage : `in_trouble` tombe sur HIT/STARVING au lieu de REGION. JS identique. **Pas de `d()` dans danger** ; le `d(4,4)+4` est seulement `region_safety` teleds-fail.

### `rescued_from_terrain(DISSOLVED)`
C LAVA : teleds puis rescued même si teleds a réussi (feedback « solid ground » / encore lave). JS `await rescued_from_terrain(DISSOLVED)` inconditionnel après le if/else reset_utrap. OK. `hliquid('molten lava')` import `do_name.js` — hallu liquide peut RNG. C `hliquid` aussi. À tracer si un public tombe en lave et prie (aucun cité).

STARVING D-1011 : `pline('Your stomach feels content.')` sans `body_part`. C `Your %s feels content., body_part(STOMACH)`. Forme poly puddle : C « Your oozing protoplasm » (table) vs JS « stomach ». D-1012 corrige le helper, pas la table poly (`body_part` JS n’a que EYE/STOMACH).

### `region_safety` ttl et overlapping
C `if (!n++ && ttl >= 0) r = reg` : le **premier** nuage englobant à ttl≥0 est `r`. Si ce premier a ttl<0 (permanent) `r` reste 0, `n==1 && !r` → teleds (nuage non-expiring). JS identique. Deux nuages : n>1 teleds même si les deux expirent. OK. `remove_region` JS vs C : si `remove_region` ne décale pas `game.regions` comme C, un 2e `in_trouble` dans fix-all peut revoir le nuage. Lecture `remove_region` hors delta — risque si le helper préexistait buggy.

`INSIDE_GAS_CLOUD = 1` JS comment « callback index stand-in ». C est un index de table de callbacks. Si d’autres `inside_f` existent (future), danger les ignore — C aussi « only gas_cloud ».

### STARVING vs SICK vs HIT — pas de RNG dans les checks
Aucun `rn2` dans cette tranche `in_trouble`. Le premier RNG d’un fix STONED/SLIMED est dans `make_stoned`/`make_slimed` (souvent 0L clear, pas de roll). HIT plus bas : `rnd(5)` uhpmax **inchangé**. Brancher SICK **au-dessus** de HIT veut dire : héros sick+critique n’obtient **pas** le `rnd(5)` de HIT tant que Sick>0. C identique. Si `make_sick(0)` laisse un `u.Sick` non nul (bug masque usick_type), HIT jamais atteint dans la boucle fix-all (tryct majors). Le quirk JS `usick_type || SICK_ALL` rend la cure **plus** susceptible de marcher, pas moins — inverse d’un sticky Sick. Le risque Strangled H/E est le vrai sticky.

## Risques / dette
1. **`Strangled` H/E extra** — faux positif major, possible boucle fix-all.
2. **`useup_strangle_amulet` ≠ `useup`** — shop / timers / oextra.
3. **`make_sick` `(usick_type \|\| SICK_ALL)`** — cure trop permissive.
4. **`back_on_ground` « solid ground »** — écran si ice/eau après teleds.
5. **`region_safety` BlindedTimeout==1** nommé — C consume un `make_blinded` (messages / vision).
6. Suite : D-1012 (fait dans le commit suivant) ; aligner Strangled sur la propriété C ; `invent.js:useup` pour l’amulette.

`critically_low_hp` / LYCANTHROPE non touchés : le `return 0` après lycan (D-1011) **masque** collapsing même si EXT_ENCUMBER. C à ce stade du port JS : volontaire. Un héros collapsing+HIT : HIT gagne (HIT est **avant** collapsing en C aussi). Collapsing est **sous** HIT. D-1011 ne change pas ce ranking. STARVING (`uhs>=WEAK`) **est au-dessus** de HIT : starving+low HP → init_uhunger, pas rnd(5) HP, jusqu’à ce que uhs < WEAK. C identique.

`make_stoned(0)` / `make_slimed(0)` : si les helpers JS n’appellent pas `dealloc_killer`, delayed stone death peut rester. Préexistant D-0939, pas inventé ici. Le cluster **câble** le caller pray, il ne re-porte pas make_stoned.

`safe_teleds(TELEDS_NO_FLAGS)` LAVA : C « teleport should always succeed, but if not, just untrap ». JS `if (!(await safe_teleds(...))) reset_utrap(true)`. `safe_teleds` préexistant teleport.js — RNG **beaucoup** (place_hero). Si teleds JS brûle plus/moins de `rn2` que C, une prière en lave casse la suite **entière**. Aucun public cité en lave. Le cluster **expose** ce helper à un nouveau caller. Cohort 15/16 ne contient probablement pas de TT_LAVA.

`init_uhunger` STARVING : remet Nutrition / uhs. C comment « temporarily lost strength recovery now handled by init_uhunger ». JS appelle le même nom. Si JS `init_uhunger` ne restore pas ATEMP STR lost to hunger, C 5.0 le fait dans init. Non relu eat.js. Dette collatérale.

`You_feel('better.')` SICK vs C `You_feel("better.")` : identique. `make_sick` `cause ''` vs NULL : delayed_killer string vide vs null. Disclose killer « killed by a » + empty. Prière `talk=false` et cure : `Sick=0` dealloc. Pas d’écran killer si on survit.

## Questions ouvertes
- `Strangled` youprop C 5.0 : timeout seul, ou H/E aussi ? Si C = timeout uniquement, retirer le OU JS.
- `inside_region` ≡ `hero_inside` bit ?
- `make_stoned(0)` dealloc_killer déjà vrai dans potion.js ?
- Cohort 15/16 : lesquelles ? aucune ne prie sous nuage/lave/stone, donc majors non exécutés.
- `useup(uamul)` C vs `setworn(null,W_AMUL)` : `quan>1` amulette de strangulation n’existe pas en C (unique worn). Le `quan--` JS est mort.
- `rescued_from_terrain` `hliquid` : un `rn2` hallu liquide possible au retour de lave ; tracer `hliquid` si un held-out prie dans la lave.
- `Sick_resistance` JS : flag OU H OU E. C macro youprop. Un extrinsèque stale skip le major SICK.
- `WEAK` seuil `uhs` : constante eat.js vs C `uhs >= WEAK`. Si JS `WEAK` mal numéroté, STARVING trop tôt/tard. Non relu ce commit (import WEAK const).
- `DISSOLVED` const import trap : si la valeur ≠ C `how`, le bras lava feedback tombe dans `back_on_ground`.
- `nonliving(data)` null `youmonst.data` : JS ne skip pas, C déréférence `youmonst.data` toujours (hero form).
- `TELEDS_NO_FLAGS` : 0 C. Si JS a un autre bit, teleds lave change de sémantique.

## Verdict
- Verdict : ACCEPT-WITH-DEBT
- Note : 7.5/10
- Si je ne devais retenir qu’une critique : l’ordre des `if` Stoned→…→Region→HIT est une copie fidèle de `pray.c` (c’est le contrat), mais `Strangled` JS est un OU de trois champs alors que C n’a qu’une propriété — c’est le seul endroit où ce commit peut **inventer** un major que C n’aurait pas classé ainsi.
