# Review 69 — `856d7f50` — D-0999 ParanoidBreakwand getlin + see_monster_closeup

## Métadonnées
- Hash complet / court : `856d7f506bf76c4f0b318ab2874ea74057661b4d` / `856d7f50`
- Parent : `a0c71f2bd773a65fc3be030dec1770d587567c2e`
- Auteur, date : Raphaël Hervier, mercredi 22 juillet 2026 04:58:46 +0200
- D-id : **D-0999**
- Stats : 13 files, **+250 / −54**
- Fichiers JS / map / cadence : `js/{getline,apply,allmain,dog,end,mon,uhitm}.js` ; `debt.md` ; pas de cadence (#1269)

## Intention vs livrable
Promet `paranoid_ynq` chemin getlin « yes », photo caméra + EXP Tourist, `makedog` `seen_close`. Livrable réel : port `paranoid_ynq`/`paranoid_query` dans `getline.js` ; `do_break_wand` et **aussi** `done2` Quit ; déplacement du stub `end.js` qui ignorait `be_paranoid` (donc Die/Bones, déjà callers, deviennent de vrais getlin si bits on). `see_monster_closeup` + camera + makedog. Titre un peu étroit vs Quit/Die/Bones, mais **même frontière input** (cmd.c paranoid). Pas de cadence mêlée.

## Inventaire

| Fichier | Rôle |
|---------|------|
| `js/getline.js` | Port C : `paranoid_ynq` / `paranoid_query` / `mungspaces` |
| `js/apply.js` | Wiring : `do_break_wand` + camera `see_monster_closeup` |
| `js/mon.js` | Port C : `see_monster_closeup` |
| `js/dog.js` | Wiring : `makedog` async + closeup + `carrying(CAMERA)` |
| `js/end.js` | Wiring : `done2` ParanoidQuit ; suppression stub |
| `js/allmain.js` | Wiring : `await makedog()` |
| `js/uhitm.js` | Commentaire flash_hits only |
| `debt.md` + D-log | Docs |

`git show --stat` : 13 files, +250/−54. `getline.js` +70 (`paranoid_ynq`). `mon.js` +87 (closeup). `apply.js` +38. `dog.js` +23. `end.js` −net (stub out). `allmain.js` 2 lignes. `uhitm.js` commentaire.

Graphe async newgame : `newgame` → `await makedog` → `await see_monster_closeup(photo=carrying camera)`. Photo starting pet : EXP skip. Aucun `getlin` au boot. `do_break_wand` : `await paranoid_query` → `yn_function` défaut → `nhgetch` **déjà** sur le yn parent. Delta input public : **nul**. Bit Breakwand on : `getlin` au lieu de yn — hors traces défaut.

`end.js` Die/Bones : wizard. seed8000 Tourist : pas Die paranoid.

## Fidélité C ↔ JS

### `paranoid_ynq` / `paranoid_query`
- Locus C : `cmd.c` ~5588–5658
- Locus JS : `js/getline.js`

C : default `c='n'` ; si `be_paranoid` : prefix vide, responsetype selon `ParanoidConfirm` et `accept_q`, `trylimit=6`, loop getlin → `mungspaces` → `strcmpi yes` → y ; `quit` **ou** `*ans==ESC` → q ; prefix `"Yes" or "No": ` ; `while (ParanoidConfirm && strcmpi(ans,"no") && --trylimit)`. Sinon `yn_function` ynq/yn def `n`. Puis `if (c!='y' && (c!='q'||!accept_q)) c='n'`.

JS : même responsetype, `QBUFSZ` trunc `...?`, `mungspaces` collapse whitespace. **Écart ESC :** JS teste `ans === '\x1b'` **avant** `mungspaces` ; C après. `getlin` JS documente `"\033"` / `'\x1b'` sur ESC buffer vide — **équivalent** pour le cas réel. `paranoid_query` = ynq sans accept_q === 'y'. **Match.**

`await getlin` / `yn_function` : tous deux finissent sur **`nhgetch`**. Une frontière input, pas un second canal. Constitution async : OK.

Boucle C vs JS (be_paranoid) :

| Étape | C | JS |
|-------|---|-----|
| trunc prompt | `pbuf+(QBUFSZ-1)-k-4` = `...?` | `pbuf.slice(0, keep)+'...?'` |
| getlin | `getlin(qbuf, ans)` | `await getlin(qbuf)` |
| mungspaces | après getlin | après test ESC |
| yes | `strcmpi == "yes"` | `toLowerCase()==='yes'` |
| quit | `strcmpi=="quit" \|\| *ans==ESC` | `'quit'` après mung ; ESC avant |
| no (Confirm) | `strcmpi=="no"` sort du while | idem |
| empty | c reste `'n'` ; Confirm reboucle | idem |
| trylimit | 6 | 6 |
| post | q→n si !accept_q | idem |

`getlin` JS : « Returns … `"\033"` on ESC with empty buf ». `'\x1b' === '\033'`. **Match ESC.** `mungspaces` JS `replace(/\s+/g,' ').trim()` vs C `hacklib.c mungspaces` (collapse, trim). Tabulations : OK.

`yn_function(prompt, 'yn', 'n')` : C `ynchars, 'n', FALSE` (pas de `ynq`). JS même. `accept_q` unused par `paranoid_query` (toujours false) — Breakwand/Quit/Pray n’acceptent pas q comme succès. Die/Bones non plus via `paranoid_query`.

**Ne pas** confondre `ParanoidConfirm` (bit 0x0001, exige yes **et** no) avec `flags.confirm` (boolean attaque paisible, D-1001). Ici seul le bit. Défaut off → une frappe `n` ou Enter = no, `y` = yes. C `paranoid_query(0, prompt)` = yn. Public Breakwand : inchangé vs parent `yn_function`.

Bits : `ParanoidConfirm = flags.paranoia_bits & PARANOID_CONFIRM`. Défaut C **et** JS `jsmain` : `PARANOID_PRAY | PARANOID_SWIM | PARANOID_TRAP` — **Confirm off**. Donc Breakwand/Quit/Die/Bones avec bit unset → `yn_function`, **traces publiques inchangées** si les sessions n’allument pas ces bits.

### `do_break_wand`
C : `if (!paranoid_query(ParanoidBreakwand, safe_qbuf(...))) return ECMD_OK`. JS : `be_paranoid = bits & PARANOID_BREAKWAND` ; `paranoid_query(be_paranoid, \`Are you really sure you want to break ${yname(obj)}?\`)`. **Écart :** C `safe_qbuf` (fallback `ysimple_name` si overflow). JS `yname` seul — named omit check_unpaid ailleurs, pas safe_qbuf. Prompt trop long : C tronque ; JS peut dépasser QBUFSZ (paranoid_ynq tronque **ensuite** le prompt+responsetype). Acceptable.

Défaut Breakwand **off** → yn `n` comme l’ancien `yn_function(..., 'yn', 'n')`. Comportement public identique ; le getlin « yes » n’est vivant que si l’option est on.

### `see_monster_closeup`
- Locus C : `mon.c` ~5971
- Locus JS : `js/mon.js`

C : return si Hallu ou (Blind && !Blind_telepat) ; mndx = monsndx, AP_MONSTER sans `sensemon` → mappearance ; long worm + `notonhead` → TAIL ; `seen_close` + `total_seen_upclose++` ; photo si `!minvis && !mundetected && (AP_NOTHING|AP_MONSTER)` ; AP_MONSTER → mndx mappearance ; premier photo → `photographed` + total++ ; Tourist EXP si `m_id != startingpet_mid || mndx != startingpet_typ` **et** `mndx == monsndx(data)` ; `more_experienced` + `newexplevel`.

JS : helpers `closeup_Blind/_telepat/_Hallucination` (sous-ensemble youprop, pas Blindfold objet seul si seulement `uarmh`… Blind JS = H/E Blinded ou uroleplay.blind). **Écart possible** vs macro C `Blind` (inclut crème, etc.) si le port Blind est déjà incomplet ailleurs.

Tourist : `rolePm === PM_TOURIST` vs C `Role_if`. `experience(mtmp,0)` puis `await newexplevel()` — C `newexplevel()` peut être synchrone ; JS await si level-up messages. Photo=false : pas d’EXP. **Branche photo : match** sur startingpet suppress et worm tail sans EXP (`mndx === trueNdx` échoue pour TAIL).

Init slot `seen_close:0, photographed:0` dans `record_mvitals_died` : évite undefined vs C zero-init `mvitals[]`.

C photo skip `minvis` / `mundetected` / AP_FURNITURE|OBJECT : JS `!minvis && !mundetected && (NOTHING \|\| MONSTER)`. Mimic-as-object photographié : C non, JS non. **Match.**

`more_experienced(experience(mtmp,0), 0)` : second 0 = score bonus 0 (C EXP but not final score). JS. `newexplevel` peut poser un prompt wizard — au newgame starting pet **skip EXP**. Camera combat : premier cliché type → possible level-up mid-apply. C identique. Frontière `newexplevel` préexistante.

`closeup_Blind` : `uroleplay.blind` (permablind) + H/E Blinded && !BBlinded. C `Blind` inclut aussi crème (`u.ucreamed`), leftover `uarmf`? Macro youprop `Blind` = `(HBlinded || u.uroleplay.blind || …) && !BBlinded` plus cream. Si JS `Blind()` global est plus complet que `closeup_Blind`, **incohérence interne** : nearby (D-1000) et camera n’utilisent pas `Blind()`. Dette D-0999.

### `makedog`
C (~260–274) : si `!startingpet_mid` : set mid ; saddle pony sauf pauper ; `bhitpos` = mx,my ; `notonhead=FALSE` ; `see_monster_closeup(mtmp, carrying(CAMERA))`. JS : même, `await see_monster_closeup(..., !!carrying(EXPENSIVE_CAMERA))`. `carrying` local : premier `invent` otyp — C `carrying` invent.c. **Match** pour une caméra top-level.

`makedog` devient async ; `newgame` `await makedog()`. **Nécessaire.** Au start Tourist, EXP starting pet **supprimé** par le test mid/typ — pas de `newexplevel` au newgame. `seen_close=1` dès le chien : plus tard `see_nearby` (D-1000) skip. C identique.

C `put_saddle_on_mon` **avant** closeup ; JS idem. `impossible("makedog() when startingpet_mid already non-zero")` : JS n’ajoute pas l’impossible (pas dans le hunk). Second makedog (bones?) skip closeup si mid déjà set — C aussi (else impossible). JS silence.

`carrying` créé dans dog.js au lieu d’invent.js : copie. Un `carrying` invent plus tard divergera.

### `done2` / Die / Bones
Stub `end.js` `void be_paranoid; return yn==='y'` **supprimé**. Tous les `paranoid_query(bit, ...)` d’end.js (Quit **et** Die/Bones préexistants) passent par getlin si bit on. D-log dit « wire … Quit / Die / Bones » : Die/Bones n’étaient pas le sujet apply, mais le stub les rendait yn **même bit on**. C’est un fix 1:1 cmd.c, pas du hors-sujet toxique. Défaut bits : Die/Bones/Quit **off** → yn. Public : pas de nouveau getlin.

## Constitution / playbook
Grep : `NODIAG` grid bug, pas DIAG shim. Pas de FORCE/fs/fastforward/seed-gate. Rule #2 RAS. Frozen RAS. Async : getlin → nhgetch **uniquement**. `await newexplevel` camera : pas nhgetch. 1:1 : paranoid dans getline (C cmd.c — déjà le module des prompts JS). `see_monster_closeup` dans `mon.js`. Named omit : `see_nearby_monsters` (D-1000), transient_light.

`allmain` `await makedog()` : si `makedog` throw, newgame casse. C ignore le return. JS idem. `carrying` local dog.js vs invent.js : copie qui peut diverger.

## Densité (§2b)
**Right size** (frontière input + closeup camera/makedog). 7 JS : getline + apply + mon + dog + allmain await + end stub + commentaire uhitm. `end.js` Quit est le sibling du déplacement de fonction, pas un second cluster potions. Pas too small.

## Documentation
D-log fixed ; deferred Pray getlin + see_nearby — vrai au hash. CURRENT latest D-0999. `debt.md` apply. Index 10/11 seed0009. Ne dit pas « complete paranoid ». Overclaim léger : « wire Die/Bones » alors que le hunk `done2` est le seul **nouveau** bit ; Die/Bones bénéficient du déplacement de stub.

## Vérification
Journal : green+strict ; startup/apply **10/11** seed0009. newgame/makedog + camera justifient startup. Preuve affirmée. Full suite absente (#1269). Un getlin mal câblé casserait seed8000 (newgame) : green gate **pertinent**.

## Risques / dette
1. **`closeup_Blind` incomplet** vs macro C → photo/seen_close à tort sous aveuglement partiel.
2. **`carrying` non récursif** (caméra dans sac) : C `carrying` non plus pour nested ? C invent `carrying` = chaîne `invent` seulement — OK.
3. **safe_qbuf** absent sur break wand.
4. **ParanoidConfirm on** + Breakwand on : loop 6 essais — sessions recorder avec Confirm allumé divergeraient ; défaut off.
5. `see_nearby` encore absent : closeup caméra/makedog seulement, pas l’adjacent tour (D-1000).
6. `mvitals[].photographed` : état nouveau jamais dans les traces écran sauf EXP Tourist (skipped starting pet).

## Lecture C complémentaire (`cmd.c` 5588, `mon.c` 5971, `apply.c` 3934, `dog.c` 260)

C `do_break_wand` `safe_qbuf(confirm, "Are you really sure you want to break ", "?", obj, yname, ysimple_name, "the wand")` : si `yname` trop long, C retombe sur `ysimple_name` puis `"the wand"`. JS template `yname` seul. Un wand nommé 80 chars : C prompt court ; JS tronqué plus tard par paranoid_ynq QBUFSZ. **Écran** breakwand named. Défaut public yn : le prompt `yn_function` affiche aussi `yname` — même risque préexistant. getlin path seulement si bit on.

C `see_monster_closeup` n’est **pas** async. JS `async` à cause de `newexplevel`. makedog `await` : au start photo=true si camera, mais EXP skip starting pet → `newexplevel` non appelé. `await` reste une microtâche vide. OK.

C `svm.mvitals[mndx].seen_close = 1` : char/uchar 1. JS `= 1`. `total_seen_upclose++` unbounded C vs JS `| 0` wrap 32-bit. Cosmétique.

Camera `do_blinding_ray` : `see_monster_closeup(mtmp, TRUE)` **après** `flash_hits_mon`. C apply.c order : flash puis closeup ? Hunk JS : flash_hits puis if CAMERA closeup. Relire C `use_camera` / flash path. Si C closeup **avant** flash, un mimic révélé change mndx. Non vérifié ligne à ligne apply.c au-delà de `do_blinding_ray` hunk. **Risque d’ordre** camera+mimic.

`flash_hits_mon` named omit closeup retiré dans uhitm commentaire : le **caller** camera wire, pas flash_hits interne. C `flash_hits_mon` ne closeup pas ; c’est apply. **Correct.**

`done2` prompt `"Really quit without saving?"` C. JS identique. ParanoidQuit off → yn. Bit on → getlin yes. Public : yn. Stub removal Die `"Die?"` / Bones `"Save bones?"` : wizard/explore only. Hors traces Tourist seed8000.


## Callers C `paranoid_query` / `see_monster_closeup`

C `paranoid_query` sert Pray, Hit, Werechange, Breakwand, Quit, Die, Bones, Eating, etc. Ce commit **implémente** la primitive et branche Breakwand + Quit (+ Die/Bones via stub). Pray/Hit/Were = D-1000/1001. Eating non. Un `paranoid_query` futur sans passer par getline importerait un second stub — le move vers getline **ferme** cette classe de bugs.

C `see_monster_closeup` callers : makedog, camera, `see_nearby_monsters`, peut-être vision. Ici makedog+camera. nearby = D-1000. Vision polish named omit.

C `use_camera` : getdir, charge, zapyourself cursed, `bhit` FLASHED_LIGHT, `flash_hits_mon`, closeup. JS `do_blinding_ray` closeup si `EXPENSIVE_CAMERA`. Si `use_camera` JS a un autre ray path sans `do_blinding_ray`, photo manquée. Header apply : swallow/dz photos encore omis.

`newexplevel` Tourist photo : peut ouvrir un écran level-up (More). Session publique Tourist+camera+premier type : **nouveau More** vs parent. seed8000 starter a une caméra. Starting pet photo skip EXP. Un cliché plus tard dans seed8000/0900 : si la session photographie un monstre, D-0999 ajoute EXP/More. Green gate **seed8000+0900** est la bonne preuve. Journal « startup/apply 10/11 » : si 8000/0900 y sont, le risque camera est testé. Non listé.

`mvitals` slot champs `seen_close`/`photographed` : C struct toujours là. JS les crée à la volée. Un code qui itère `mvitals` et attend seulement mvflags/born/died : OK. Un dump disclosure lifelist : D-0999 commence à remplir total_seen_upclose. Écran end-of-game hors traces courtes.


Grep `git show 856d7f50 -- js/` : `NODIAG` grid bug préexistant (hunk mon.js proche). Pas de FORCE/fs. `await getlin` → `nhgetch` uniquement. Frozen non touchés. `PARANOID_BREAKWAND` bit, pas un seed name.

`getlin` ESC `\x1b` documenté dans getline.js header (préexistant). paranoid_ynq s’aligne sur ce contrat, pas sur un inventaire de traces.


`do_break_wand` gates nohands/freehand/STR **avant** paranoid_query, comme C. Un fail STR n’ouvre pas de prompt. JS parent. Hunk ne les réordonne pas.

`makedog` `preferred_pet === 'n'` early return **avant** closeup. C. Pas de seen_close si pas de pet. `startingpet_typ = NON_PM`. JS parent. Hunk closeup seulement dans `!startingpet_mid`.

`see_monster_closeup` Hallu return : makedog au newgame Hallu? Chargen pas Hallu. Camera sous Hallu : pas de photo (C). JS closeup_Hallucination. Match si Hallu flag plat.


`QBUFSZ` trunc : C `Strcpy(pbuf + (QBUFSZ-1)-k-4, "...?")` écrase la fin. JS slice keep. Prompts courts (break wand yname) : pas de trunc. RAS traces.

`trylimit=6` : 1 essai + 5 « Yes or No ». C commentaire. JS `--trylimit` dans while. Confirm off : pas de loop (while ParanoidConfirm). Match.


`record_mvitals_died` init `seen_close:0, photographed:0` : évite undefined sur un mndx seulement « died ». C zero-init toute la table au boot. JS sparse. nearby `slot?.seen_close` : pas de slot ⇒ pas skip ⇒ closeup crée le slot. Match sémantique first-seen.

`PM_LONG_WORM_TAIL` index : `monsterNames.indexOf`. Si -1, mndx=-1 slot bizarre. Tables générées : index OK.


`uhitm.js` hunk : commentaire seulement (`see_monster_closeup` retiré des named omit flash_hits). Zéro logique combat. Densité OK (pas un 8e sous-système).


`apply.js` `PARANOID_BREAKWAND` import const : bit mask C `flag.h` 0x… Vérifié via usage `& PARANOID_BREAKWAND`, pas un magic number local.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **8/10**
- Si je ne devais retenir qu’une critique : `paranoid_ynq` est un port cmd.c lisible (yes/no/quit/ESC, Confirm loop, mapping q→n), et le défaut bits garde les traces en yn — la dette réelle est Blind/youprop closeup, pas un second `nhgetch` pirate.
