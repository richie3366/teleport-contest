# Review 66 — `312a4b05` — D-0996 selftouch / minstapetrify / monstone

## Métadonnées
- Hash complet / court : `312a4b05f4b535795c4f3919236db39ff44c6f5f` / `312a4b05`
- Parent : `edf9147043a532df4f8aaa92bdce56525aadeab0`
- Auteur, date : Raphaël Hervier, mercredi 22 juillet 2026 04:36:39 +0200
- D-id : **D-0996**
- Stats : 16 files, **+378 / −79**
- Fichiers JS / map / cadence : `js/{do,do_wear,hack,makemon,mhitm,music,trap,uhitm,weapon}.js` (9 JS) ; `docs/c-js-map/absent.md`, `data.md` ; pas de cadence

## Intention vs livrable
Le message promet de retirer le named omit post-D-0995 : `selftouch` / `mselftouch` / `minstapetrify`, statue via `xkilled` quand `context.stoned`. Le diff **fait ça**, plus `mon_to_stone` / `vamp_stone` / `monstone` / `mwepgone` / un trou `newcham` pour mdat forcé. Le titre n’est pas trop large sémantiquement ; le **périmètre fichier** l’est (§2b). D-id présent, pas de mélange cadence.

## Inventaire

| Fichier | Rôle |
|---------|------|
| `js/trap.js` | Port C : `selftouch`, `mselftouch`, `minstapetrify`, `obj_pmname` thin ; wire pit/`float_down` |
| `js/mhitm.js` | Port C **déplacé** : `mon_to_stone`, `vamp_stone`, `monstone`, `obj_resists_00` (C = `mon.c` / `zap.c`) |
| `js/uhitm.js` | Port C : `xkilled` bras `gs.stoned` (C = `mon.c:xkilled`) |
| `js/weapon.js` | Port C : `mwepgone` |
| `js/makemon.js` | Port C : `newcham` non-cham + mdat forcé |
| `js/do.js`, `hack.js`, `do_wear.js`, `music.js` | Wiring : remplacer no-ops `selftouch_*` / locaux |
| map absent/data, CURRENT, NOTES, D-log | Docs |

`git show --stat` : 16 files, JS 9. `mhitm.js` +172 (monstone). `trap.js` +125. Le reste = `await selftouch` / imports.

## Fidélité C ↔ JS

### `selftouch`
- Locus C : `trap.c:selftouch` (~3883)
- Locus JS : `js/trap.js:selftouch`

C : uwep CORPSE + `touch_petrifies` + `!Stone_resistance` → pline → `instapetrify(an(corpse_pmname) corpse)` → si life-save `!uarmg && !Stone_resistance` → `uwepgone`. Puis bras twoweapon `uswapwep` identique. JS : mêmes gardes, `obj_pmname` pour le nom, `an(corpse_pm)` dans le killer. **Branche-par-branche : match.**

**Écart :** `obj_pmname` JS ignore le remap clerc aligné et `omonst` (nommé). Après `await instapetrify`, JS exécute `uwepgone` **même si le jeu est fini** (C `done` ne revient pas). Mort-state.

### `mselftouch`
C utilise `corpse_xname(mwep, NULL, CXN_PFX_THE)` ; JS ``the ${pmname(mwep.corpsenm, NEUTRAL)}``. Genre statue / Hallu / « chickatrice corpse » vs nom neutre : **écart d’article**. C `DEADMONSTER` après `minstapetrify` puis `mwepgone` ; JS `(mon.mhp|0) > 0`. Équivalent seulement si toute mort pierre met `mhp<=0` (monstone le fait ; life-save C `lifesaved_monster` est **omis** — un monstre qui aurait dû vivre reste à 0 et skip `mwepgone` à l’envers… wait: life-save omitted means they stay dead, so mhp=0, no mwepgone. C life-save: mhp>0, maybe mwepgone. JS never life-saves here → no mwepgone on a living petrify-survivor because there is no survivor. **Dette death-state nommée** `lifesaved_monster`.

`MON_WEP` : trap.js supprime un local `which_armor(W_WEP)` et importe `weapon.js` `mon.mw`. C `MON_WEP` = `mw`. **Plus fidèle** que l’ancien helper.

### Table branches `selftouch` / `mselftouch`

| Garde | C | JS | Verdict |
|-------|---|-----|---------|
| uwep CORPSE | `uwep->otyp == CORPSE` | `(u.uwep.otyp\|0)===CORPSE` | match |
| petrify corpse | `touch_petrifies(&mons[corpsenm])` | `touch_petrifies(mons(corpsenm))` | match |
| résistance héros | `!Stone_resistance` | H/E/flat | match plat |
| killer | `an(obj_pmname) corpse` | `` `${an(corpse_pm)} corpse` `` | match forme |
| post-done uwepgone | `!uarmg && !Stone_resistance` | idem | match si done revient |
| twoweap | `u.twoweap && uswapwep` | idem | match ; C dit hypothetique |
| mon mwep | `MON_WEP` | `MON_WEP` import | match après fix mw |
| mon msg | `corpse_xname CXN_PFX_THE` | `the ${pmname NEUTRAL}` | **écart** |
| post minsta drop | `DEADMONSTER` | `mhp>0` | match sans lifesave |

C twoweapon : commentaire « we don't allow two-weapon combat when either weapon is a corpse ». JS porte le bras quand même — **C aussi** (code mort défensif). Pas un surplus.

### `minstapetrify` × `monstone` × `xkilled`
Appel `byplayer=true` (music `do_pit`, pas le pit trap `false`) :
1. `minstapetrify` → `vamp_stone` ; si continue, `gs.stoned=TRUE` ; `xkilled(NOMSG)`
2. `xkilled` → `monstone` (parce que stoned) → **`vamp_stone` encore**
3. `monstone` statue/rock + `mondead` ; `xkilled` skip corpse/`rn2(6)`

JS : `game.context.stoned = true` ; snapshot `was_stoned` **avant** monstone (qui ne clear pas stoned) ; après mort, `if (was_stoned) { context.stoned=false } else if (!nocorpse)`. C `if (gs.stoned) { gs.stoned=FALSE; goto cleanup; }`. **Même skip treasure.**

Si `byplayer=false` (pit `mselftouch(..., false)`) : C `monstone` direct **sans** `gs.stoned` / **sans** `xkilled` (pas de conduct killer). JS `await monstone(mon)`. **Match.** Music passait `true` même en no-op — maintenant le conduct `u.uconduct.killer` peut incrémenter sur un pit musical. **C music.c `mselftouch(..., TRUE)`** — voulu.

### `obj_resists_00` vs C `obj_resists(obj,0,0)`

```1458:1472:nethack-c/upstream/src/zap.c
obj_resists(struct obj *obj,
            int ochance, int achance)
{
    if (obj->otyp == AMULET_OF_YENDOR
        || obj->otyp == SPE_BOOK_OF_THE_DEAD
        || obj->otyp == CANDELABRUM_OF_INVOCATION
        || obj->otyp == BELL_OF_OPENING
        || (obj->otyp == CORPSE && is_rider(&mons[obj->corpsenm]))) {
        return TRUE;
    } else {
        int chance = rn2(100);
        return (boolean) (chance < (obj->oartifact ? achance : ochance));
    }
}
```

JS teste les **noms** `objectNames[obj.otyp]` pas les index. Fragile si rename, fidèle si la table est 1:1. Artefact `oartifact` + `achance=0` : C `rn2(100) < 0` false. JS **ne distingue pas artefact** : `rn2(100); return false`. Même résultat, **même un `rn2`**. Invocation tools skip `rn2` — C aussi.

### `newcham` : preuve du trou golem
Parent : `if (cham === NON_PM \|\| cham == null) return false;` — **interdisait** `mon_to_stone` → `newcham(golem, stone_golem)`. Sans ce hunk, D-0996 petrify golem était mort. Le `if (!mdat) return false` est un **garde-fou JS** contre poly aléatoire de non-cham (C irait dans `select_newcham_form`). Pour ce cluster, nécessaire. Pour le reste de `newcham`, c’est un changement de contrat.

C `mbirth_limit(monsndx(olddata)) < MAXMONNO return 0` **bloque** Nazgul/erinyes même mdat forcé. JS non. Hors golems. Named.

### `mwepgone` vs C `setmnotwielded`
C `setmnotwielded` peut éteindre `artifact_light`, clear `owornmask`, `unweapon` side-effects. JS : `mw=null`, `owornmask &= ~W_WEP`, `NEED_WEAPON`. Cadavre cockatrice non-art : suffisant. Artefact wielded light : named omit.

### `obj_pmname`
C `do_name.c obj_pmname` : CORPSE/STATUE/FIGURINE + gender `spe` + remap clerc. JS : `spe & 0x03` → MALE/FEMALE/NEUTRAL `pmname`. FIGURINE inclus. Clerc aligné omis. Appelé seulement selftouch héros ; mselftouch n’utilise **pas** `obj_pmname` (écart vs C `corpse_xname`).

### `minstapetrify`
C (~3858) : `resists_ston` return ; `poly_when_stoned` → `mon_to_stone` return ; `!vamp_stone` return ; `mon_adjust_speed(-3)` ; cansee pline ; `byplayer` → `gs.stoned=TRUE` + `xkilled(XKILL_NOMSG)` sinon `monstone`. JS : même ordre, `game.context.stoned`, import dynamique `uhitm.xkilled`. **Pas de RNG dans cette fonction (C non plus).** Callers branchés : pit `trapeffect_pit`, `mselftouch`, music `do_pit`.

### `monstone` / `mon_to_stone` / `vamp_stone`
- Locus C : `mon.c` ~3287 / 3748 / 3766
- Locus JS : **`js/mhitm.js`** (pas `mon.js`)

`mon_to_stone` : garde `is_golem` (C `mlet == S_GOLEM`) ; pline solidifies ; `newcham(..., PM_STONE_GOLEM)` ; succès « Now it's » / échec « returns to normal ». C `impossible` si non-golem ; JS return silencieux. OK si l’invariant `poly_when_stoned` est tenu.

`vamp_stone` : bras vampshifter (cham ≠ forme courante, `!G_GENOD`) restore hp/`mcanmove`/`newcham` return false ; bras cham `MR_STONE` idem. **Sautés (nommés) :** `expels`, `closed_door`+`enexto`/`rloc`, plines lapidify/`display_nhwindow`, `set_mon_min_mhpmax` (JS clamp `mhpmax<10` au lieu de max(m_lev+1,10)), `NC_SHOW_MSG` sur sandestin. `void amorphous; void is_flyer;` = reliquat d’un port inachevé — odeur qualité, pas un shim de trace.

`monstone` : `vamp_stone` **une deuxième fois** (C aussi, via `xkilled`→`monstone` ou appel direct). `mhp=0` ; **pas** `lifesaved_monster` (nommé) ; statue si `msize > MZ_TINY || !rn2(2+((geno&G_FREQ)>2))` — **RNG et ordre clang identiques à C**. `obj_resists(obj,0,0)` : C tire **toujours** `rn2(100)` pour l’ordinaire puis `chance < 0` → false. JS `obj_resists_00` : outils d’invocation / rider corpse true **sans** `rn2` (C non plus sur ces otyp) ; sinon `rn2(100); return false`. **Fidèle.**

**Écart inventaire :** C `extract_from_minvent(..., TRUE, TRUE)` (worn, lumières) ; JS unlink `minvent`/`nobj`/`owornmask=0`. Boulder/`obj_resists` : C `flooreffects` puis `place_object` ; JS `place_object` direct (nommé). `mkcorpstat` flags FEMALE/MALE/HISTORIC : match. `engulfing_u` pline omis (nommé).

### `xkilled` stoned
- Locus C : `mon.c:xkilled` ~3546–3572
- Locus JS : `js/uhitm.js:xkilled`

C : `if (gs.stoned) monstone; else mondead;` puis si vivant `gs.stoned=FALSE` return ; plus tard `if (gs.stoned) { gs.stoned=FALSE; goto cleanup; }` — **pas** de `rn2(6)` treasure ni `make_corpse`. JS : `was_stoned` snapshot, même split, skip `!nocorpse` treasure/corpse. **Branche-par-branche : match** sur le bras pierre. C `mtmp->mhp=0` en tête de `xkilled` ; le hunk JS ne l’ajoute pas (préexistant). Double `vamp_stone` (minstapetrify puis monstone) = C.

### `newcham` non-cham
C `cham == NON_PM` : rider return 0 ; **`mbirth_limit < MAXMONNO` return 0** (Nazgul/erinyes) **même avec mdat forcé** ; puis uncancel cancelled. JS : rider return ; **`if (!mdat) return false`** (C continuerait vers un poly aléatoire) ; `mbirth_limit` / uncancel **nommés deferred**. Pour golem→pierre, mdat est fourni et les golems ne sont pas birth-limited : le trou visé est correct. **Écart :** JS **plus permissif** que C pour Nazgul/erinyes + mdat forcé ; **plus strict** que C pour `newcham(non-cham, null)`.

### `mwepgone`
C `setmnotwielded` + `NEED_WEAPON`. JS : `mon.mw=null`, clear `W_WEP`, `NEED_WEAPON`. Named omit `artifact_light`. Suffisant pour lâcher un cadavre cockatrice.

### Callers
`do.js` `goto_level` : no-op `selftouch_stair_fall` → `selftouch('Falling, you')` (C). `hack.js` `dosinkfall` idem. `do_wear.js` `disintegrate_arm` : `if (losing_gloves) selftouch('You')` (C). `music.js` `do_pit` : `mselftouch(..., true)` / `selftouch` (C `byplayer` true pour musique — **C music passe true**, JS maintenant `await` le vrai). `float_down` pit : `selftouch('Falling, you')`. Cluster caller/callee **justifié**, pas du wiring cosmétique.

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/fs/fastforward/seed dans le contrôle (`FORCETRAP` constante). Rule #2 RAS. Frozen RAS. `await` sur petrify/`done`/`xkilled` : input seulement si `done` ou pline More. Modules : **`monstone`/`vamp_stone`/`mon_to_stone` dans `mhitm.js` alors que C est `mon.c`** — violation douce du 1:1 (make_corpse vivait déjà dans mhitm). Pas de traces hardcodées.

## Densité (§2b)
**Too big, d’un cran.** Une famille sémantique (wield-petrify + disposition statue) : §2b autorise caller/callee. 9 modules JS + `newcham` (poly général) + `obj_resists` local + `obj_pmname` : **deux sous-systèmes collatéraux** (poly forme, death drop). 16 fichiers au total. Pas « finish potions », mais plus large qu’« une fonction ou deux modules qui s’appellent déjà ». `newcham` aurait pu être un commit frère.

## Documentation
D-log **fixed**, deferred list **honnête** (lifesave, flooreffects boulder, vamp plines, mbirth_limit, twoweapon polish). N’écrit pas « complete ». Map `absent.md` / `data.md` retirent l’omit selftouch. CURRENT next-cluster avance. Index 15/16 seed0009 : même mantra « pre-existing » que toute la fourchette.

`data.md` trap.c row : hunk trop dense pour vérifier si `selftouch` est réellement ajouté à la cellule ou seulement un wrap de ligne. `absent.md` : 3 lignes. CURRENT « Do not re-stub selftouch/mselftouch/minstapetrify/monstone ». Protection vs overclaim « complete trap.c ».

Journal #1266 : « xkilled honors context.stoned (D-0996) » — **vrai** pour le bras porté. Ne mentionne pas `newcham` ni le déplacement mon.c→mhitm.js.

## Vérification
Journal : green+strict ; cohort **15/16** (seed0009). Pas de full `sessions` (pas une itération %5). Preuve affirmée. Cohort large « shared change » — cohérent avec 9 JS, mais on n’a pas le détail des sessions. Fortress 43/44 **non re-mesurée** ici.

Un cohort 15/16 après `xkilled`+`newcham` est le **minimum** playbook (« cohort after shared change »). Green seed8000 n’exerce pas cockatrice wield. Aucun canary C `selftouch("Falling, you")`. La preuve est « on n’a pas cassé le public », pas « petrify est C ».

`music.js` `mselftouch(..., true)` maintenant réel : une session musique/earthquake (seed ?) dans le 15/16. Non listé.

## Risques / dette
1. **`lifesaved_monster` absent** dans `monstone` : statue/rock + `mondead` sans chance amulette — death-state faux. Un unique / rider / amulette de vie C survit ; JS statue + mort.
2. **`extract_from_minvent` vs unlink** : lumières / worn / `mw` stale ; contenu statue sans `end_burn`.
3. **`newcham`** : mbirth_limit sauté ; `!mdat` early-return non-C ; tout caller `newcham` du port (poly wand, etc.) change de contrat.
4. **Module 1:1** : petrify monstre habite `mhitm.js` ; prochains ports `mon.c` risquent un **second** `monstone`.
5. **`obj_pmname` / `corpse_xname`** : écrans « touches the X corpse ».
6. Largeur : régression `newcham` hors petrify difficile à bisecter.
7. `void amorphous` / `void is_flyer` : port vamp inachevé laissé dans le produit.
8. **`context.stoned` vs `gs.stoned` :** si un autre chemin JS pose `context.stoned` sans minstapetrify, `xkilled` fera statue. Inverse : C `gs.stoned` global ; JS oublie de clear sur certains returns (ils clear lifesave + bras stoned).
9. `poly_when_stoned(ptr, mvitals)` : `minstapetrify` **passe** `game.mvitals` (vérifié au hunk). `instapetrify` héros aussi. RAS sur G_GENOD. Callers `poly_when_stoned(youData)` ailleurs restent à default null.

## Questions ouvertes
- `xkilled` JS met-il `mhp=0` en tête comme C ? Hunk silencieux → si non, `mondead` vs `monstone` sur monstre encore vivant.
- `make_corpse` dans mhitm vs `monstone` statue : double cadavre si un caller oublie `stoned` ?


Grep `git show 312a4b05 -- js/` : `FORCETRAP` import trap ; pas FORCE shim, pas fs, pas seed dans le contrôle. `context.stoned` n’est pas un index RNG. Frozen non touchés.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **6.5/10**
- Si je ne devais retenir qu’une critique : le cluster petrify est C-ordonné (stoned → monstone, pas de `rn2(6)`), mais 16 fichiers + `newcham` + monstone hors `mon.js` + life-save omise, c’est trop large pour un seul falsifier death-state.

## Annexe — TOO WIDE ?

§2b « two modules that already call each other » vs 9 JS. **Défense :** chaque fichier (sauf `makemon.js`/`weapon.js`) avait un **no-op** `selftouch`/`mselftouch` à remplacer — ce n’est pas un port shop+poly+musique inventé, c’est retirer les shims du même omit. **Accusation :** `newcham` + `monstone` (200 LOC mhitm) + `obj_resists_00` sont un **deuxième** cluster death/poly. Verdict densité : too big d’un cran, pas « finish potions ». Split naturel : (1) selftouch+minsta+callers (2) monstone+xkilled+newcham.

`disintegrate_arm` `losing_gloves` : C selftouch après destruction gants, héros peut tenir cadavre. JS `if (losing_gloves) await selftouch('You')`. **Match string** `"You"` vs C `"You"`. Stair `"Falling, you"` C identique. Music `"Falling, you"` / `"Shaken, you"` / `"Falling down, you"` : hunk `await selftouch(msg)` avec les mêmes msg C.

Callers C `selftouch` encore absents ce hash (ex. d’autres falls) : float_down/stair/sink/gloves/music = le named omit annoncé. `minstapetrify` callers C nombreux (uhitm cockatrice hit) — **non** tous branchés ; seulement mselftouch + export. Hit cockatrice monstre→héros reste un autre cluster.
