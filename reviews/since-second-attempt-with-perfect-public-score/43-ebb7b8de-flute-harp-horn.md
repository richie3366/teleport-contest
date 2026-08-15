# Review 43 — `ebb7b8de` — flute / harp / horn / BUGLE

## Métadonnées
- Hash complet / court : `ebb7b8de0f8871eee3ece59f9714cb864946f3dd` / `ebb7b8de`
- Parent : `af35f8fcae6f2c576f4e27ace76aa3d47de801a3`
- Auteur, date : Raphaël Hervier, 2026-07-22 01:28:50 +0200
- D-id : D-0974
- Stats : 9 files, +412/−41 (JS : `music.js` +339, `zap.js` +48)
- Fichiers JS / map / cadence : `js/music.js`, `js/zap.js` ; debt/turns ;
  pas de cadence

## Intention vs livrable
Retirer la dette music flute/harp/horn + BUGLE `awaken_soldiers` +
FIRE/FROST `ubuzz`/`zapyourself`. Le switch `do_improvisation` C a dix
bras ; ce commit en remplit six qui étaient stubbés « You play… »
(MAGIC/WOODEN flute, MAGIC/WOODEN harp, FIRE/FROST horn) et remplace
le BUGLE `awaken_monsters` par `awaken_soldiers`. TOOLED_HORN et les
drums étaient déjà là (D-0454/D-0972). Passtune reste hors envelope —
correctement nommé, porté au D-0977.

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/music.js` | Helpers sleep/snake/nymph/charm/soldiers + bras improvisation |
| `js/zap.js` | Export `ubuzz`/`flash_str` ; `zapyourself` WAN_FIRE/FIRE_HORN + COLD/FROST |
| map debt/turns | D-0974 ; passtune encore ouvert |
| D-LOG / CURRENT / NOTES / journal | Standard |

## Fidélité C ↔ JS

### Helpers `music.c` (85–217)
- `put_monsters_to_sleep` : `mdistu < distance && sleep_monst(..., d(10,10), TOOL_CLASS)` puis `msleeping=1` + `slept_monst`. JS copie. RNG : un `d(10,10)` **par** monstre dans le rayon, seulement si on entre dans `sleep_monst` — C évalue `sleep_monst` après `mdistu < distance` (court-circuit). JS `&& sleep_monst_music(...)` : même court-circuit.
- `sleep_monst_music` vs C `mhitm.c:sleep_monst` : mimic unhide si `how>=0` ; `MR_SLEEP` ou `resist(TOOL)` → 0 ; sinon freeze/`msleeping`. **Sauté :** `defended(AD_SLEE)` / `shieldeff`. Nommé. Un monstre avec shield sleep résiste en C, pas en JS.

C `sleep_monst` (mhitm.c 1231–1233) :

```
if (resists_sleep(mon) || defended(mon, AD_SLEE)
    || (how >= 0 && resist(mon, (char) how, 0, NOTELL))) {
    shieldeff(mon->mx, mon->my);
```

JS `sleep_monst_music` teste `resists_sleep` + `resist(TOOL)` mais **pas**
`defended`. `how` est `TOOL_CLASS` (≥0) donc le `resist` C **est**
évalué — le trou n’est que le shield AD_SLEE. MAGIC_FLUTE dans un
rayon `ulevel*5` endort donc des monstres que C laisserait debout.
- `slept_monst` : relâche `ustuck` si helpless && !swallowed. JS `sticks(youmonst)` différé → traite comme non-collant. C peut garder le hold si le héro `sticks`.
- `charm_snakes` / `calm_nymphs` : filtres `S_SNAKE`/`S_NYMPH` + `mcanmove` + distance ; plines `could_see_mon` vs sway. **Pas de taming.** Fidèle. Pas de RNG.
- `awaken_soldiers` : C distance =
  `(bugler==youmonst ? u.ulevel : bugler->data->mlevel)*30`. JS
  `_bugler` ignoré, toujours `ulevel*30` (« monster bugler deferred »).
  Pour le héro (seul caller actuel) c’est C. Mercenaires sauf
  `PM_GUARD` : hostile si !tame, wake, pline ou `Norep` rattle.
  Sinon `awaken_scare` si `distm < distance` avec seuil `distance/3`.
  C `Norep("%s the rattle…", "You hear")` Deaf-aware ; JS
  `Norep('You hear the rattle…')` derrière `!Deaf()` — proche.
- `charm_monsters` : `uswallow` → dist 0 ; `mdistu <= dist` ;
  `!resist(TOOL) || isshk` → `tamedog(NULL, TRUE)`. JS copie la
  liste `[...fmon]` (C `mtmp2=nmon`). `tamedog` givemsg pline nommé
  omit.

### `do_improvisation` bras (C 588–687)

**MAGIC_FLUTE** — charge, pline Deaf/Hallu/familiar, notes vol 50,
`put_monsters_to_sleep(ulevel*5)`, `exercise(DEX,true)`. JS : même
texte `You ${!Deaf?'':'seem to '}produce ${Hallu?'piped':'soft'}${familiar} music.`

**WOODEN_FLUTE / WOODEN_HARP — RNG critique.**
C music.c 600 / harp analogue :

```
do_spec &= (rn2(ACURR(A_DEX)) + u.ulevel > 25);
```

`&=` évalue **toujours** le RHS (pas de court-circuit).
JS : `do_spec = !!(do_spec & (rn2(acurr(A_DEX)) + (ulevel|0) > 25));`
Précédence `+` > `>` : `(rn2+ulevel)>25` comme C. `&` bit-à-bit :
si stun/conf a déjà mis `do_spec` à 0, le `rn2` **brûle quand même**.
NOTES le capitalise. C’est la bonne lecture C, pas un `&&` JS.

**FIRE_HORN / FROST_HORN** — `consume_obj_charge` **puis** `getdir`.
Échec getdir : vibrate + `break` (**saute** `makeknown`) — JS identique.
Self : `zapyourself` puis `losehp` si damage, notes entre les deux.
Sinon `BZ_OFS_AD(COLD|FIRE)`, pline `flash_str` si !Blind, `ubuzz`.
C : `ubuzz(BZ_U_WAND(type), rn1(6,6))`. `BZ_U_WAND` est `#define
(0+(bztyp))` — identité. JS `ubuzz(type, rn1(6,6))` ≡ C. `flash_str`
C a un 2e arg Hallu ; JS un arg (Hallu suppress différé, déjà noté
zap).

**MAGIC_HARP** — charge, pline attractive / Deaf soothing,
`charm_monsters((ulevel-1)/3+1)` avec `Math.trunc`. Fidèle.

**BUGLE** — `awaken_soldiers(null)` au lieu de `awaken_monsters(ulevel*30)`.
Les mercenaires du niveau entier se réveillent (C) ; avant, seul un
rayon ulevel*30. Changement sémantique voulu.

### Instruments **sautés** / encore partiels
| Bras C | État après D-0974 |
|--------|-------------------|
| LEATHER_DRUM / DRUM_OF_EARTHQUAKE | déjà D-0454 / D-0972 |
| TOOLED_HORN | déjà `awaken_monsters` (D-0454) — pas touché |
| MAGIC/WOODEN FLUTE/HARP, FIRE/FROST, BUGLE | **ce commit** |
| `do_play_instrument` passtune / getlin / drawbridge | **sauté** (D-0977) |
| `Hero_playnotes` audio | no-op |
| `can_blow` poly | nommé |
| `sleep_monst` defended/shieldeff | nommé |
| mundane drum `ROLL_FROM(beats)` | déjà D-0454 |
| `consume_obj_charge` unpaid | nommé |

### `zapyourself` WAN_FIRE / FIRE_HORN / WAN_COLD / FROST
C (2752–2788) : `d(12,6)` ; resist → You_feel (+ `shieldeff` /
`monstseesu` / `ugolemeffects`) sinon pline + damage ; FIRE :
`burn_away_slime` **puis** `burnarmor` **puis** `destroy_items`
**puis** `ignite_items`. JS D-0974 : slime/ignite encore stubs /
comment « deferred ». Ordre burnarmor/destroy présent. COLD : pas de
burnarmor, `destroy_items(AD_COLD)` seulement — JS copie.
Callers horn self-zap maintenant branchés ; WAN_FIRE self aussi
(côté-effet hors music, même bras C).

C bois `do_spec &= (rn2(DEX)+ulevel > 25)` est un **int** 0/1. JS
`!!(do_spec & boolean)` : si `do_spec` est déjà `true` (boolean),
`true & 1 === 1`. Si stun a mis `do_spec = !(Stunned||Confusion)` à
`false`, `false & x === 0`. Équivalent. Le piège serait `do_spec &&
rn2(...)` qui **sauterait** le `rn2` sous stun — ils l’ont évité.

`TOOLED_HORN` C (639–647) : frightful grave sound, `awaken_monsters
(ulevel*30)`, `exercise(WIS,false)`. Pas dans ce diff — déjà D-0454.
Un reviewer qui lit « tous les instruments » doit le compter comme
**déjà porté**, pas sauté.

`put_monsters_to_sleep` force `msleeping=1` **après** `sleep_monst`
qui a pu poser `mfrozen`. C identique (commentaire « 10d10 turns +
wake_nearby to rouse »). Un monstre frozen devient aussi sleeping.

Prefix `do_improvisation` : si `!do_spec || spe<=0`, C décrémente
`itmp.otyp` tant que `oc_magic`. Une MAGIC_FLUTE vide joue le bras
WOODEN_FLUTE (charm snakes, **pas** sleep, **pas** de charge). JS
préfixe D-0454 — hors diff, mais le nouveau bras MAGIC_FLUTE ne s’exécute
que si `itmp.otyp` est encore MAGIC. Correct si le mundane loop existe.

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/fs/node/fastforward/hardcode seed.
Rule #2 RAS. Export `ubuzz`/`flash_str` : API interne, pas frozen.
`getdir` = input déjà sur le chemin apply. Pas de nouvel await hors
`nhgetch`/`getdir`/`pline`.

## Densité (§2b)
Right size / légèrement dense. Un switch C `do_improvisation` +
callees music + le `zapyourself` que les horns **doivent** appeler.
Playbook : « whole practical switch ». TOOLED_HORN déjà fait, passtune
volontairement sorti. ~339 LOC music + 48 zap : haut de la fourchette
50–300, acceptable pour un switch entier.

## Documentation
D-0974 liste passtune, `Hero_playnotes`, flees_light, can_blow,
selftouch, sleep defended, tamedog givemsg. turns.md met à jour
l’envelope apply/music. debt apply : « flute/harp/horn … D-0974 ;
passtune still deferred ». Pas « complete music.c ». `awaken_soldiers`
héros-only n’est nommé que dans le commentaire JS, pas dans le D-log.

## Vérification
green+strict ; apply cohort **35/36** (seed0009 Scr 72/73 préexistant).
Pas de seed « magic flute » cité. Le `do_spec &= rn2` n’a de preuve
que si un wooden flute stun/conf a été dans la cohorte — non dit.
Fortress « held » sans cadence.

## Risques / dette
1. `sleep_monst` sans `defended(AD_SLEE)` — taming/sleep trop efficace.
2. `awaken_soldiers` monstre bugler non porté (muse / apply monstre).
3. `zapyourself` FIRE sans `burn_away_slime` / `ignite_items` réels
   jusqu’au D-0978.
4. Passtune encore stub (joueur Castle).
5. `charm_monsters` + `tamedog` givemsg.
6. `getdir` cancel saute `makeknown` (C aussi) — charge déjà consommée.
7. `zapyourself` WAN_FIRE est un caller **hors** music : tout self-zap
   feu hérite du slime/ignite encore stub.
8. `awaken_soldiers` `Norep` vs C format `%s the rattle` + `"You hear"`
   (Deaf-aware interne Norep).

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7.5/10**
- Si je ne devais retenir qu’une critique : le `do_spec &= rn2(DEX)`
  est lu comme C (RHS toujours évalué) et les bras flute/harp/horn
  suivent le switch, mais `sleep_monst` est une copie TOOL sans
  `defended`, et passtune/drawbridge restent le trou Castle.
