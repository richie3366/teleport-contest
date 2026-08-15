# Review — `7f952620` — D-1022 whip / grapple / `use_pole`

## Métadonnées
- Hash complet / court : `7f9526207431d5661fce6967e3e8aa7aa74fbee8` / `7f952620`
- Parent : `68e513ca44fa1fc40293b8312871467e4c38e7d5`
- Auteur, date : Raphaël Hervier (Co-authored-by Cursor), 2026-08-15 14:34:03 +0200
- D-id : **D-1022**
- Stats : 11 files, **+1106 / −73** — `js/apply.js` **+1041**
- Fichiers JS / map / cadence : `js/apply.js`, `js/wield.js` (`is_pole` Snickersnee), `js/uhitm.js` (`force_attack` export) ; debt/absent ; **pas** de cadence (score toujours #1290)

## Intention vs livrable
Promesse git : « Match C `use_whip`, `use_grapple`, and `use_pole` doapply dispatch ».

Livrable réel : les **trois** fonctions C **et** un essaim de helpers locaux (`getdir_whip`, `kick_steed_apply`, `hurtle_apply`, `glyph_is_poleable_at`, `Amonnam_apply`, `mbodypart_apply`, `surface_apply`, `ceiling_apply`, `u_wipe_engr_apply` no-op, `display_*_positions` no-op). Ce n’est plus un dispatch `doapply` : c’est finish-whip+pole+grapple en une iter, plus un mini-`steed.c` / mini-`dothrow.c hurtle`.

Le wiring `doapply` (BULLWHIP → GRAPPLING_HOOK → `is_pole`) est la seule partie que les traces publiques pourraient un jour toucher ; le corps ne l’est pas.

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/apply.js` | Port massif + helpers maison + wiring `doapply` |
| `js/wield.js` | `is_pole` : oclass + `ART_SNICKERSNEE` (C `obj.h`) |
| `js/uhitm.js` | Export `stumble_onto_mimic` ; **nouveau** `force_attack` |
| map / D-log / journal | D-1022 Keep’d ; next oil/trap/BoT |

## Fidélité C ↔ JS

### `doapply` — ordre des cases : fidèle
C `apply.c:4265` : `BULLWHIP` → `use_whip` ; `GRAPPLING_HOOK` → `use_grapple` ; `default` `is_pole` → `use_pole(obj, FALSE)` (avant pick/axe).

JS `doapply` : même ordre, `use_pole(obj, false)`, puis « Sorry ». `is_pole` n’englobe pas le whip (skill P_WHIP) ni le hook. **Pas d’hallucination de dispatch.**

JS réduit le retour à `(res & ECMD_TIME) !== 0` (booléen historique de `doapply`). C propage `ECMD_FAIL` / `ECMD_CANCEL`. Pour « Too far » pole (`ECMD_FAIL`) les deux ne consomment pas le tour. OK tant que `rhack` ne distingue pas FAIL de OK.

### `is_pole` / `force_attack` — fidèles
C `obj.h:228` : WEAPON/TOOL + (`P_POLEARMS` \| `P_LANCE` \| `ART_SNICKERSNEE`).

JS `wield.js:94` : même garde oclass (ajoutée dans ce commit) + `is_art(..., ART_SNICKERSNEE)`.

C `uhitm.c:432` `force_attack` : sauve `forcefight`, pose true si `pets_too || !mtame`, `do_attack`, restore, return.

JS `uhitm.js:1319` : copie. Whip passe `false`. **Un des rares ajouts 1:1.**

### `use_whip` — graphe C copié ; RNG copié ; helpers non
C `apply.c:2955–3271`. JS `use_whip` + `whip_attack`.

**Branches dans le même ordre :** `obj != uwep` wield+cmdq → `getdir` → swallow coords / sinon `confdir(FALSE)` + `isok` miss → proficient (archéologue, DEX&lt;6 / ≥14, Fumbling, clamp 0..3) → swallow room → Underwater → `dz<0` ceiling bug → water/lavawall splash+`fire_damage` → self/`dz>0` (steed `!rn2(proficient+2)`, pool splash, lev/steed/fly snag `rnl(6)\|\|pickup<1`, sinon `rnd(2)+dbon+spe` pied) → `(Fumbling\|\|Glib)&&!rn2(5)` dropx → pit yank → `mtmp` whipattack → air/waterlevel → Snap.

**Goto C `whipattack` :** extrait en `whip_attack` ; le `return ECMD_TIME` C **avant** `wakeup` si `force_attack` réussit est reproduit (`whip_attack` return avant wakeup ; `use_whip` rend quand même `ECMD_TIME`). Swallow / ceiling **tombent** sur `return ECMD_TIME` (pas d’early `ECMD_OK`) — match C.

**cmdq :** `cmdq_add_ec(doapply)` pousse la **fonction** + `{typ:'key', key: invlet}` — shape D-1018, pas le `{typ:'ec'}` cassé de D-0951.

**Écarts concrets (pas du polish nommé) :**

1. **`getdir_whip` n’est pas `getdir`.** C `cmd.c:3958` : cmdq DIR/KEY, `yn_function`, `Cmd.dirchars` (numpad), `^R` retry, `CQ_REPEAT`, self keys, souris `_`. JS : `nhgetch` + `DIR_DX` **hjkl/yubn seulement** + `.`/`s` + `<>`. C’est un clone de `getdir_self_ok` déjà dans le même fichier (stéthoscope), pas le C. Un apply whip au pavé numérique **annule** en JS et marche en C.

2. **`yname` C vs `the(xname)` JS** sur wrap/snatch/yank d’arme de monstre (`apply.c:3166, 3209, 3182`). C `objnam.c yname` pour un objet en minvent : possessif du monstre. JS `the(xname(otmp))`. Le `yname` **déjà** dans `apply.js:1073` (`your ${xname}`) est faux pour une arme adverse ; ils l’ont évité et ont substitué autre chose. D-log nomme l’omit — **écran faux** dès qu’un désarmement est visible.

3. **`Amonnam_apply`** capitalise `mon_nam`. C `Amonnam` = `highc(a_monnam(...))` (article indéfini). Message reveal : pas le C.

4. **`mbodypart_apply` ignore le monstre** (`return body_part(part)` du héros). C `mbodypart(mtmp, HAND)` : patte / tentacule / etc. Message « welded to his hands » faux pour un chien.

5. **`glyph_is_invisible(loc)`** JS (`display.js`) = `remembered_glyph.invisible`. C : `glyph_is_invisible(levl[rx][ry].glyph)` sur le glyph affiché. Même nom, **pas le même prédicat** — bras reveal.

6. **`kick_steed_apply` :** C `steed.c:405` `He = highc(mhe(steed))` puis `monverbself(..., "rouse")`. JS `const He = 'It'` toujours ; `"It rouses!"` au lieu de `"He rouses himself!"`. RNG `!rn2(2)` / `mtame--` / `rnd(MAXULEV/2+5)` / `rn1(20,30)` gallop **sont** dans le bon ordre — le port n’est pas du bruit, les chaînes sont hallucinées.

7. **`pickup_object(..., telekinesis)`** : C whip `TRUE`, grapple `FALSE`. JS `pickup.js` fait `void telekinesis` — le booléen C est **ignoré**.

### `use_pole` / `could_pole_mon` — squelette C ; glyph ≠ glyph
C `apply.c:3370–3563`. `calc_pole_range` 4 / 4 / 5 / 8 + `gp.polearm_range_*` : match.

`could_pole_mon` : `!uwep \|\| !is_pole` → calc → `find_poleable_mon` sinon `hitmon` vivant `sensemon` dans `[min,max]`. JS `mhp>0` ≈ `!DEADMONSTER`. Structure OK.

`find_poleable_mon` C saute les tame/peaceful **seulement si** `glyph_is_monster(glyph) && m_at`. JS saute tout `m_at` tame/peaceful (`confirm !== false`). C `glyph_is_poleable` = monster **glyph** \| invisible glyph \| statue glyph. JS = `m_at` live \| `glyph_is_invisible(loc)` \| `sobj_at(STATUE)`. **Cible getpos / autohit peut diverger** (mémoire de carte vs monde live).

`display_polearm_positions` : C `tmp_at(DISP_BEAM, S_goodpos)` dx,dy −3..3. JS no-op (nommé). `getpos_sethilite` est appelé mais ne peint pas.

Hit : `attack_checks` → `overexertion` → Snickersnee one-shot/`Shkinng!` (Soundeffect omis, nommé) → `thitmonst`. Statue trap `activate_statue_trap`. Meuble : C `defsyms[glyph_to_cmap].explanation` ; JS **toujours** `"an unknown obstacle"` hors STONE/SCORR (nommé). Boulder : C `glyph_to_obj==BOULDER && sobj_at` ; JS `sobj_at` seul.

`u_wipe_engr(2)` → `u_wipe_engr_apply` **no-op**. Commentaire « no RNG » : vrai pour l’absence de wipe, faux dès qu’une gravure existe (C l’efface).

`thitmonst` vient de `dothrow.js` encore partial — D-log honnête. Un coup de hallebarde n’est **pas** le combat C.

### `use_grapple` — RNG menu fidèle ; hurtle non
C `apply.c:3729–3873`. Swallow / wield `"cast"` / `where_to_hit` / getpos / range sans min / Too far→`res` (ECMD_OK, **pas** FAIL contrairement à pole) : match.

**Menu skilled :** C `tohit = rn2(5)` **puis** dans le `if` `tohit = rn2(4)` **puis** `select_menu` et `a_int - 1`. Identifiers C : `any.a_int=1` puis `++` **avant** le premier `add_menu` → items 2,3,4 → tohit 1,2,3. JS items `tohit: 1,2,3` + même double `rn2`. **Le stream RNG du choix est copié, pas inventé.** ESC → tohit reste `rn2(4)` des deux côtés.

JS `select_menu_pick_one` : pas de titre C `"Aim for what?"` ; menu coin overlay vs `NHW_MENU`. Écran faux, RNG OK.

`tohit==2 \|\| !rn2(2)` puis `u_wipe_engr(rnd(2))` : appel présent, corps no-op.

Pull-in : `verysmall && !rn2(4) && enexto(..., u.ux, u.uy, NULL)` puis `rloc_to`. JS `pullcc` séparé pour ne pas écraser `cc` — correct (C écrase `cc` mais return avant fallthrough).

**`hurtle_apply` n’est pas `hurtle`.** C `dothrow.c:1078` : Punished `!carried(uball)` ; trap message web/lava/floor/ball/`trap` ; `nomul(-range)` ; `endmultishot` ; **`walk_path(..., hurtle_step)`**. JS : message unique `"the trap"` ; **`teleds(nx,ny)` d’un pas**. `walk_path` est **déjà importé** dans `apply.js` (pré-D-1022) et n’est pas branché. Range 1 : si la case cible est un mur / monstre, C s’arrête dans `hurtle_step` ; JS téléporte si `isok`. **Bug de physique, pas un omit cosmétique.** D-log dit `hurtle_step walk_path` — le mot est là ; le code a quand même un mouvement **autre**.

## Constitution / playbook
Grep diff JS : pas de `FORCE` / `DIAG` / `getRngLog` / `fs` / `node:` / `fastforward` / seed dans le contrôle. Rule #2 RAS. Frozen intacts. `await` : `nhgetch` (getdir/getpos/menu) + `pline` existants. Un await boundary respecté.

Pas de trace publique hardcodée. Le commentaire `u_wipe_engr` « public traces have no engraving here » est un **raisonnement seed**, pas un gate — smell léger, pas CONSTITUTION-RISK.

## Densité (§2b)
**Too big.** Trois familles C (whip ~320 LOC, pole ~140, grapple ~140) + steed + hurtle + getdir maison + ~25 helpers. Playbook : une famille caller/callee. C’est D-0951 replay. Un iter `use_whip` seul (getdir partagé, pas kick_steed complet) aurait été §2b.

## Documentation
D-log **ne dit pas** « complete ». Deferred : `thitmonst` hit-vs-miss, S_goodpos, `hurtle_step`, `wipe_engr_at`, untrap non-adjacent, `#if 0` thitu, `artifact_light`, yname possessif. **Honnête sur les omits nommés.** Sous-vend les helpers faux (`Amonnam`, `mbodypart`, `getdir`, `glyph_is_poleable` live vs glyph).

CURRENT : cluster Keep’d, next oil/trap/BoT. NOTES : falsifier **held** (whip direction, pole getpos, `is_pole` Snickersnee, `could_pole_mon` false). Le falsifier privé cité ne couvre **pas** pit / disarm / hurtle / menu grapple.

## Vérification
Journal : green+strict PASS ; cohort apply/combat/ride **18/18** (seed0361 Scr 366/366) ; « private node » partisan/Snickersnee `is_pole` ; whip/hook not pole ; `could_pole_mon` false without uwep ; **public unhit**.

Preuve réelle : fortress **non régressée** + macro `is_pole`. **Aucune** preuve que `use_whip` / `use_grapple` / `use_pole` se comportent comme C sous input. Affirmer « Match C » dans le sujet git est un overclaim de dispatch, pas de corps.

## Risques / dette (priorisé)
1. `getdir_whip` vs C `getdir` — premier input réel cassera numpad / cmdq / repeat.
2. `hurtle_apply` = `teleds` ≠ `walk_path`+`hurtle_step` — yank grapple.
3. `glyph_is_poleable_at` / `find_poleable_mon` sur objets live vs glyphs — cible pole.
4. `thitmonst` partial — un hit pole n’est pas un hit C (RNG combat).
5. Messages : `yname`, `Amonnam`, `mbodypart`, `surface`/`ceiling`, `kick_steed` `He`.
6. `pickup_object` ignore `telekinesis`.
7. `u_wipe_engr` / `tmp_at` no-op — gravure / hilite.
8. Densité : 1292 oil/trap/BoT risque le même dump.

## Verdict
- Verdict : **QUALITY-RISK**
- Note : **5 / 10**
- Une phrase : le **squelette** des trois fonctions (ordre des `if`, RNG `rn2`/`rnl`/`rnd`, cmdq D-1018, `is_pole` Snickersnee, `force_attack`) est une copie C, pas une hallucination de contrôle ; la **surface jouable** (getdir, glyphs, hurtle, noms, `thitmonst`) est un réseau de helpers faux ou stub, et la suite publique ne l’a pas vu.

## Si on ne devait retenir qu’un re-port
Garder `doapply` + `is_pole` + `force_attack`. Reprendre `getdir` C (un seul, partagé stéthoscope/whip). Remplacer `hurtle_apply` par `hurtle` C via `walk_path` déjà importé. Ne pas toucher oil/trap/BoT tant que whip n’a pas un canary privé (bullwhip + direction ; pole `getpos` ; hook menu skilled).
