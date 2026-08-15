# Review 21 — `d9c9f0a1` — D-0953 `floorfood` pool/lava + `vault_gd_watching`

## Métadonnées
- Hash complet / court : `d9c9f0a1f2628dc76c321638914ac3355f558e8d` / `d9c9f0a1`
- Parent : `08553d7c8fa2bd6908a06366bbecdddd9a0779ac`
- Auteur, date : Raphaël Hervier, 2026-07-21 23:41:43 +0200
- D-id : **D-0953**
- Stats : 8 files, **+159 / −35**
- Fichiers JS / map / cadence : `js/eat.js` (+91), `js/vault.js` (+36) ; map debt ; journal #1222

## Intention vs livrable
Promesse : water-walk / clinger / flying skip la nourriture au sol sur pool/lava ; manger de l’or marque un garde vault qui voit le héros.

Livrable : **ces deux prédicats**, plus le bras `gd_move` witness (verbalize + hostile) — caller C de `witness`, pas dans le titre. Pas de troisième sous-système (pas de `gd_move` pathfinding, pas de `floorfood` sacrifice/tin).

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/eat.js` | Port skipfloor pool/lava ; `vault_gd_watching(GD_EATGOLD)` dans `eatspecial` |
| `js/vault.js` | Port `vault_gd_watching` + `gd_move` witness |
| map / D-log / CURRENT / NOTES | D-0953 |

## Fidélité C ↔ JS

### `floorfood` skip — C `eat.c:3594–3600` / JS `floorfood_eat`
C :
```
if (iflags.menu_requested
    || !can_reach_floor(TRUE) || (feeding && u.usteed)
    || (is_pool_or_lava(u.ux, u.uy)
        && (Wwalking || is_clinger(uptr) || (Flying && !Breathless))))
    goto skipfloor;
```
JS :
```
const skip_floor = !!(flags.menu_requested
    || !can_reach_floor(true)
    || u.usteed
    || (is_pool_or_lava(ux, uy)
        && (Wwalking() || is_clinger(form)
            || (Flying() && !Breathless()))));
```
`floorfood_eat` est le chemin `verb=="eat"` → `feeding` C toujours vrai → `usteed` sans `&& feeding` **équivalent**. Court-circuit : menu / reach / steed **avant** pool — **aucun RNG** dans ce predicat. Ordre C respecté.

Helpers (copies locales, pas `youprop` partagé) :
- `Wwalking` : H/E bits + `!Is_waterlevel(u.uz)` — C macro `Wwalking`.
- `Flying` : `u.Flying` / steed `is_flyer` / H/E / `!BFlying`. **Autre copie** dans `dig.js` D-0951. Si l’une oublie `I_SPECIAL` / steed, eat et dig divergeront.
- `Breathless` : MAGICAL_BREATHING \|\| `breathless(hero_form_data())`.
- `is_pool_or_lava` : `is_pool || is_lava` ; drawbridge-under omis (comme D-0950).

`will_feel_cockatrice` reste omit (nommé). Beartrap/bars/gold **non retouchés** dans ce commit.

Écart mineur : C `gy.youmonst.data` vs JS `hero_form_data()` pour clinger/breathless — si `hero_form_data` est le même contrat que `youmonst.data` (D-0409), OK ; sinon skipfloor poly-forme faux.

### `eatspecial` gold — C `eat.c:2424–2430`
```
if (otmp->oclass == COIN_CLASS) {
    carried ? useupall : useupf;
    vault_gd_watching(GD_EATGOLD);
    return;
}
```
JS : même place, **après** useup, **return**. Pas de RNG. `GD_DESTROYGOLD` : aucun nouvel appel eat (C : autres destroy-gold, pas `eatspecial`). Map ne prétend pas DESTROYGOLD eat.

### `vault_gd_watching` — C `vault.c:1278–1286`
```
guard = findgd();
if (guard && guard->mx && guard->mcansee && m_canseeu(guard)) {
    if (activity == GD_EATGOLD || activity == GD_DESTROYGOLD)
        EGD(guard)->witness = activity;
}
```
JS : `findgd()` ; `(guard.mx|0)` ; `mcansee` ; `m_canseeu(guard)` ; `egd.witness = activity|0` si EATGOLD/DESTROYGOLD. `GD_*` dans `const.js` : `0x01` / `0x02`. Fidèle. Si `EGD(guard)` null, JS no-op ; C dereferencerait — un garde vault sans `egd` est déjà un bug d’init.

`findgd` JS préexistant (partial vault). Si `findgd` rate un garde migrating, witness silence — dette `vault.md` déjà nommée (migrating_mons).

### `gd_move` witness — C `vault.c:933–939`
```
if (egrd->witness) {
    verbalize("How dare you %s that gold, scoundrel!",
              (egrd->witness & GD_EATGOLD) ? "consume" : "destroy");
    egrd->witness = 0;
    grd->mpeaceful = 0;
    return -1;
}
```
JS : `if (!Deaf()) verbalize(… (witness & GD_EATGOLD) ? consume : destroy)` ; `witness=0` ; `mpeaceful=0` ; `return -1`. Bit-and **identique** C (pas `===`). `SetVoice` omis (nommé). Sans ce bras, `witness` serait un champ mort : coller `gd_move` n’est pas un second sous-système gratuit, c’est le **lecteur** du flag.

## Constitution / playbook
Grep JS : pas FORCE/DIAG/fs/fastforward/seeds. `vault_gd_watching` **sync** (C void). `gd_move` déjà async. RAS Rule #2. Pas de nouvel `nhgetch`.

## Densité (§2b)
**Right size**, deux modules **caller/callee**. Playbook : « usually one JS module (or two that already call each other) ». `eatspecial` → `vault_gd_watching` → `egd.witness` → `gd_move`. Une hypothèse. ~127 LOC JS. Trop petit : skipfloor `if` isolé sans pose de `witness`. Trop gros : ça aurait été tout `gd_move` hostile/goldincorridor.

Le risque « two subsystems » existe **en apparence** (eat vs vault). Le graphe d’appel les lie déjà. Verdict densité : OK, avec dette `Flying()` dupliqué.

## Documentation
`debt.md` eat : « floorfood pool/lava reach + vault_gd_watching(GD_EATGOLD) + gd_move witness (D-0953) ». D-log deferred Ring_gone / float_up / choke. Honnête. Pas « complete vault ». CURRENT next cluster avance vers furniture/HOLE.

## Vérification
Journal (pattern loop) : green + cohort. Full sessions non (@#1225). Seeds publics : manger de l’or en vault ou Wwalking sur pool **peu probable**. Fortress ne valide ni skipfloor ni witness. Preuve = non-régression + assertion.

Pas de focused session nommée « vault gold » dans le diff docs (le D-log dit green+cohort générique). Plus faible que D-0950 « wizard/dig/shop 12/12 » explicite.

## Densité : deux sous-systèmes ?
Mission : « Two subsystems — density? »

Graphe :
- `eat.c` `floorfood` skip **n’appelle pas** vault.
- `eat.c` `eatspecial` **appelle** `vault_gd_watching`.
- `vault.c` `gd_move` **lit** `witness`.

Ce n’est **pas** « finish eat + finish vault ». C’est un predicat eat **plus** le flag que ce predicat (or) pose, plus le lecteur du flag. Playbook autorise deux modules qui s’appellent déjà. `floorfood` pool-lava et `GD_EATGOLD` sont **deux bullets map** (`debt.md` les listait ensemble depuis D-0946). Les coller est du §2b « related deferrals in that envelope », pas un mashup mon.c.

Trop gros aurait été : `gd_move` goldincorridor + `mpickgold` + `uleftvault`. Trop petit : skipfloor `if` sans `vault_gd_watching` (or mangé sans colère du garde).

Wwalking C est `(HWwalking || EWwalking) && !Is_waterlevel`. JS ORs aussi `u.HWwalking` / `u.EWwalking` **et** `uprops[WWALKING]` — redondant si les deux sont tenus à jour, dangereux si un seul l’est. Flying JS court-circuite `if (u.Flying) return true` **avant** `BFlying` : un `u.Flying` stale ignore le blocked C. À falsifier : héros Flying bloqué (encastré) sur lave doit **pouvoir** `e` le floor food si C `!Flying` effectif ; JS pourrait skipfloor à tort.

`can_reach_floor(true)` : le `true` C est `down_ok` / pit reach. Si JS `can_reach_floor` est déjà thin (D-0951 `use_pick_axe` s’en sert), skipfloor hérite de cette thinness — pas introduit ici, mais le predicat pool est **en plus** de reach, pas à la place.

`Deaf()` sur witness verbalize : C parle toujours (SetVoice) ; JS silence si sourd. Pas de RNG. Écran seulement.

### Après skipfloor — ce que ce commit **ne** retouche pas
C `eat.c:3602+` : si on **n’a pas** sauté, `feeding && metallivorous` → beartrap / iron bars / gold floor **avant** `sobj_at` food. JS `floorfood_eat` avait déjà ces bras. D-0953 n’y touche pas. Le skip pool **court-circuite** tout ça : un métallivore water-walk sur lave **ne** voit plus le beartrap C non plus (`goto skipfloor` avant). JS `if (!skip_floor) { metallivorous… }` — **équivalent**. Pas de régression introduite ; pas de gain non plus.

`iflags.menu_requested` C vs `game.flags?.menu_requested` JS : si le préfixe `m` pose `iflags` et pas `flags`, skipfloor rate le `m`eat. Non relu ici ; dette input déjà ailleurs.

### `eatspecial` gold — `useupall` vs `useupf`
C : `carried(otmp) ? useupall(otmp) : useupf(otmp, otmp->quan)` **puis** `vault_gd_watching`. JS : même ordre d’après le diff (watching **après** useup, **return**). Si JS `useupf` est thin (or au sol mal débité), le garde voit un vol d’or **sans** que la pile disparaisse — ou l’inverse. Ce n’est pas introduit par D-0953 ; le **nouveau** caller `vault_gd_watching` rend ce thin **observable** (hostile).

`GD_DESTROYGOLD` : C aussi `vault_gd_watching` depuis destroy-gold hors eat (ex. wand fire / sink). JS n’ajoute **aucun** de ces callers. Le flag `0x02` est vivant dans `gd_move` (`witness & GD_EATGOLD` → consume vs destroy) mais **jamais posé** hors EATGOLD. Map honnête là-dessus.

### `gd_move` `return -1`
C : witness hostile **return -1** (garde s’arrête / autre sémantique de move). JS `return -1` dans un `gd_move` déjà async. Si le caller JS traite `-1` comme « pas bougé » vs C `gd_move` callers (`vault.c` autour de 800–950), un garde qui vient de vociférer pourrait **encore** marcher. Non relu le caller `gd_move` entier — hors envelope, mais c’est le **seul** effet de contrôle du flag.

`m_canseeu(guard)` : si JS `m_canseeu` ignore `couldsee` / aveugle héros / `canseemon` inverse, witness **trop** souvent ou **jamais**. Préexistant. D-0953 s’y fie.

`guard.mx` C : `guard->mx` non-zéro = garde **placé** (pas migrating). JS `(guard.mx|0)` : `mx===undefined` → 0, skip. Bon. `mx===0` C est parfois off-map ; COLNO JS 1-based — si un garde légitime a `mx=0`, witness mort. Inhabituel.

### `Flying()` local (eat.js)
```
if (u.Flying) return true;          // avant BFlying
blocked = BFlying || prop.blocked
if (usteed && is_flyer(steed) && !blocked) return true
return (H||E||uprops) && !blocked
```
C `Flying` : `(HFlying || EFlying || (usteed && is_flyer)) && !BFlying`. Un `u.Flying` cache **true** alors que `BFlying` est posé (encastré) : JS skipfloor pool **à tort** (héros C peut `e` le floor food). Inverse : `u.Flying` unset, bits H/E OK : JS encore correct via la 4ᵉ ligne.

`is_pool_or_lava` = `is_pool || is_lava`. C `is_pool_or_lava` inclut parfois drawbridge-under water. Pont baissé sur eau : C skipfloor water-walk ; JS `is_pool` false sur DRAWBRIDGE_DOWN → **mange** le floor food. Même oubli D-0950 `dig_check`.

### `eatspecial` gold vs floorfood gold
`floorfood` métallivore peut proposer l’**or au sol** comme meal **avant** `eatspecial`. `eatspecial` COIN est le **fin** du meal (useup + witness). Deux loci or. D-0953 ne touche que `eatspecial` + skipfloor. Un métallivore qui mange l’or **via** le bras floorfood beartrap/gold (pas `eatspecial`) **ne** pose **pas** `GD_EATGOLD` si ce bras n’appelle pas watching — C `eat.c` gold floor métallivore vs `eatspecial` coins : C `eatspecial` est pour non-FOOD déjà choisi. Si JS floorfood gold return l’objet puis `eatspecial`, witness OK. Si JS floorfood gold `useup` inline **sans** `eatspecial`, witness mort. Non relu le bras gold `floorfood` (l.2145-ish HEAD a COIN dans choke, pas watching). Dette : un seul caller watching.

`eatspecial` après watching **return** : saute papier / `lesshungry` déjà fait **avant** le if coin. C aussi `return` après watching — nutrition déjà via `lesshungry(nmod)` au-dessus. Match.

`gd_move` place le bras witness **avant** `umoney` / `fcend==1` / goldincorridor. Un garde qui a `witness` ne fait **pas** le reste du move ce tour (`return -1`). C identique (vault.c:933 avant les bras or). Ordre fidèle.

`findgd()` : si plusieurs gardes, C prend le premier de la chaîne `fmon`/`migrating`. JS préexistant. Witness sur le **mauvais** garde si deux vaults — hors envelope.

Skipfloor `menu_requested` : préfixe `m` #eat C `iflags.menu_requested`. JS `game.flags?.menu_requested`. Si le préfixe vit dans `iflags` seulement, `m`eat **voit** encore le floor food. Dette input, pas inventée ici, mais le predicat pool est **OU** avec ce bit : un faux `menu_requested` masquerait un bug pool.

`Breathless()` : MAGICAL_BREATHING bits **ou** `breathless(hero_form_data())`. C `Breathless` macro identique. Un poly forme breathless sur lave **skip** même sans Flying — C aussi (`Flying && !Breathless` : si Breathless, le terme Flying est faux, mais Wwalking/clinger peuvent encore skip). Ordre `Wwalking || clinger || (Flying && !Breathless)` : un flyer breathless **mange** le floor food (C : besoin d’air pour picorer ? C skip seulement Flying **sans** Breathless — flyer qui respire skip ; flyer amphibie **ne** skip **pas**). JS match.

`is_clinger(form)` : si `form` est `hero_form_data()` stale vs `youmonst.data`, un héros collé au plafond sur lave mange à tort. D-0409.

`vault_gd_watching` est **sync** (C `void`). Pas d’`await` inventé. `gd_move` déjà async : le verbalize witness est le seul `await` nouveau sur ce bras. Frontière `nhgetch` inchangée. Aucun seed public n’est un vault-gold meal : la fortress ne couvre pas ce couple.

## Risques / dette
1. Deux `Flying()` (`eat.js` vs `dig.js`) — macros youprop divergentes.
2. `GD_DESTROYGOLD` sans caller hors ce flag (C : destroy gold ailleurs).
3. `is_pool_or_lava` sans drawbridge-under — skipfloor faux sur pont.
4. `will_feel_cockatrice` toujours omis.
5. `findgd` migrating : witness silencieux.
6. `hero_form_data()` vs `youmonst.data` pour clinger si poly mal câblé.
7. `iflags.menu_requested` vs `game.flags.menu_requested` — `m`eat peut rater le skip.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7/10**
- Si je ne devais retenir qu’une critique : le predicat skipfloor est dans l’ordre C, et coller eat+vault n’est justifiable que parce que `eatspecial` est déjà l’unique caller — `Flying()` recopié reste de la dette structurelle.

