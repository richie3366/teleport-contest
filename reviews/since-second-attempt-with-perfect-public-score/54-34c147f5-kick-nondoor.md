# Review 54 — `34c147f5` — `kick_nondoor` SDOOR/furniture + cadence #1255

## Métadonnées
- Hash complet / court : `34c147f55113fbd0ac9b82d88cb9a530709c012b` / `34c147f5`
- Parent : `9dfb22d6da8686d103a0facdc6dac4829e62cc4b`
- Auteur, date : Raphaël Hervier, 2026-07-22 02:59:58 +0200
- D-id : **D-0985** — **absent du sujet git**, présent dans le corps, l’index et le D-log
- Stats : 13 files, +363/−81
- Fichiers JS / map / cadence : `js/dokick.js`, `js/engrave.js`, `js/fountain.js`, `js/pray.js` ; `docs/c-js-map/debt.md` / `absent.md` / `turns.md` ; **cadence #1255** + port
- Mixte cadence+port : le score 43/44 ne mesure **pas** HEAD+D-0985
- Sujet git sans `(D-0985)` ; l’index et le D-log l’ont
- Kick cohort 19/20 = preuve du port ; full suite post-port **absente**

## Intention vs livrable
Sujet : « Port kick_nondoor SDOOR/furniture **and refresh #1255 suite score**. » Corps : helpers `altar_wrath` / `disturb_grave` / `sink_backs_up` **(D-0985)** ; cadence 43/44.

Livrable : SDOOR/SCORR + autel/fontaine/tombe/IRONBARS/évier ; throne/tree **ouch stub** (defer D-0986) ; helpers exportés ; **et** refresh CURRENT #1255.

Réponse à la question de mission : D-0985 n’est **pas** manquant dans la plage D-0984…D-0986 — seulement dans le **sujet**. Le mélange cadence+port est le vrai PROCESS-SMELL. Le C SDOOR/furniture (moins throne/tree) est un cluster §2b légitime **s’il était seul**.

**Trou D-0985 :** ce n’est pas un gap de numérotation (D-0984 puis D-0986 avec D-0985 au milieu dans l’index). C’est un **sujet sans D-id** alors que le playbook numérote les ports. Le D-id existe. Flag process, pas un ID perdu.

**Mélange cadence+port :** CURRENT écrit « Cadence reconfirm on HEAD **before** D-0985 `kick_nondoor` furniture ». Le D-log : « Cadence full sessions @#1255 **43/44 before patch** ». La suite mesurée **n’inclut pas** le port. Journal : cadence 43/44 **et** kick cohort 19/20 dans la même entrée. C’est le cas d’école « cadence commit qui porte du C en plus ».

Dégât collatéral : le gabarit journal devient `` ```text## YYYY-MM-DD `` (fusion de lignes). Bruit process, pas un ban constitution, mais ça montre que la rotation cadence a été collée à la hâte sur le même arbre que le port furniture.

Le port **sans** la cadence aurait été un ACCEPT-WITH-DEBT (throne/tree ouch). La cadence **sans** le port aurait été un commit docs 80–160. Ensemble : PROCESS-SMELL. CURRENT « before D-0985 » est la phrase qui sauve l’honnêteté du score, pas le sujet git.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/dokick.js` | Port `kick_nondoor` SDOOR/SCORR/autel/fontaine/grave/bars/sink |
| `js/pray.js` | Port `altar_wrath` |
| `js/engrave.js` | Port `disturb_grave` |
| `js/fountain.js` | Port `sink_backs_up` |
| `docs/CURRENT.md` | Score #1255 **avant** patch (43/44) |
| `docs/NOTES.md` | Next throne/tree ; keep D-0985 |
| `docs/c-js-map/debt.md` / `absent.md` / `turns.md` | D-0985 ; throne/tree encore nommés |
| `docs/DIVERGENCE-INDEX.md` / `DIVERGENCE-LOG.md` | D-0985 **présent** (contrairement au sujet git) |
| journal + rotation iter1255 | Cadence **mélangée** au port ; gabarit `` ```text## `` cassé |

Le D-id n’est pas « missing from range » : il est partout sauf la première ligne du `git log --oneline`. Flaguer le sujet, pas l’index.

## Fidélité C ↔ JS

### `kick_nondoor` SDOOR / SCORR
**C :** `dokick.c:974-1015`. JS : `!Levitation && rn2(30) < avrg_attrib` → `cvt_sdoor_to_door` ; message uncover vs kick open si `(D_LOCKED|D_TRAPPED)==D_LOCKED` ; trap `b_trapped` ; sinon `D_ISOPEN` si pas locked ; `feel_newsym` ; `unblock_point` ≈ `recalc_block_point`. Échec → `kick_ouch`. SCORR → `CORR` + unblock.

**Écart Levitation :** JS `!!u.Levitation` sticky. C macro H∥E et !B. Un héros I_SPECIAL-only peut diverger.

RNG : `rn2(30)` comparé à `avrg_attrib` — un tir, comme C. Si `avrg_attrib` JS n’est pas `(ACURR(A_STR)+ACURR(A_DEX))/2`, le seuil SDOOR/SCORR diverge sans que le `rn2` soit mal placé.

### Autel / fontaine / tombe / bars
Autel : Lev → `kick_dumb` ; pline kick ; `altar_wrath` ; `!rn2(3)` ouch sinon `exercise(DEX)`. C.

Fontaine : même ouch `rn2(3)` ; `uarmf && rn2(3)` → `water_damage(..., "metal boots", TRUE)` ; ER_NOTHING → boots wet. JS importe `water_damage` depuis `trap.js` (C trap.c) — bon module.

Tombe : Lev dumb ; `rn2(4)` ouch ; sinon `!disturbed && !rn2(2)` → `disturb_grave` ; sinon briser headstone (WIS, align archéologue/samouraï/lawful, ROCK, `del_engr_at`). JS `!loc.horizontal` pour undisturbed — C documente `disturbed` = champ `horizontal`. OK.

**Écart emptygrave :** C `emptygrave=0` (flags) + `disturbed=0`. JS `loc.flags=0` + `horizontal=0`. Si JS range `emptygrave` ailleurs que `flags`, perte.

IRONBARS : ouch only. C.

### Évier
C `dokick.c:1194+` : `poly_gender` ; Lev dumb ; `rn2(5)` Klunk ; pudding `S_LPUDDING` `!rn2(3)` + G_GONE ; washer `S_LDWASHER` + sexe `MM_MALE/FEMALE` selon gend ; `!rn2(3)` `sink_backs_up` ; sinon ouch.

JS porte ces bras. `poly_gender` : 0/1 via `flags.female` ; **neuter→2 named omit** — washer sex faux si poly neutre. Pudding msg : C `hcolor(NH_BLACK)` ; JS « black » fixe (Hallu omit). `You_hear` Blind pudding : JS `!u.HDeaf` seulement, pas `EDeaf`/`Deaf` sticky — **inconsistant** avec le Klunk qui teste les trois.

Throne/tree : **toujours ouch** (comment D-0986). C a destroy/loot/shaft et fruit/swarm. Map le nomme. Honest split, mais `kick_nondoor` n’est pas « furniture complete ».

### Citation C — SDOOR (`dokick.c:974`)

```974:1000:nethack-c/upstream/src/dokick.c
kick_nondoor(coordxy x, coordxy y, int avrg_attrib)
{
    if (gm.maploc->typ == SDOOR) {
        if (!Levitation && rn2(30) < avrg_attrib) {
            cvt_sdoor_to_door(gm.maploc);
            pline("Crash!  %s a secret door!",
                  ((gm.maploc->doormask & (D_LOCKED | D_TRAPPED))
                   == D_LOCKED) ? "Your kick uncovers" : "You kick open");
            ...
            if (gm.maploc->doormask & D_TRAPPED) {
                gm.maploc->doormask = D_NODOOR;
                b_trapped("door", FOOT);
            } else if (gm.maploc->doormask != D_NODOOR
                       && !(gm.maploc->doormask & D_LOCKED))
                gm.maploc->doormask = D_ISOPEN;
            return ECMD_TIME;
        } else {
            kick_ouch(x, y, "");
            return ECMD_TIME;
        }
    }
```

JS : même `rn2(30) < avrg_attrib` ; uncover ssi locked **sans** trapped (masque `== D_LOCKED`) — **confirmation**. `b_trapped` déjà porté. Échec → `kick_ouch`. **Callers :** chemin `dokick` non-porte uniquement.

C ordre terrain : SDOOR, SCORR, **THRONE**, fountain, grave, tree, bars, sink. JS D-0985 : throne/tree en stub `kick_ouch` **à leur place** (sans les `rn2` loot/shaft/fruit). Un kick throne **ne tire pas** les `rn2(3)`/`rn2(4)` C — palier D-0985→D-0986, fortress kick sans trône silencieuse.

Fontaine C : `water_damage(uarmf, "metal boots", TRUE)` si `uarmf && rn2(3)`. JS importe `water_damage` depuis `trap.js`. **RNG :** `rn2(3)` ouch **puis** éventuellement `rn2(3)` boots — deux tirs, comme C.

`altar_wrath` RNG : `record > -rn2(4)` **toujours** évalue `rn2(4)`. JS identique. `Luck>-5 && rn2(Luck+6)` court-circuit : Luck≤-5 ⇒ pas de `rn2` — C et JS.

### Helpers
**`altar_wrath` C `pray.c:2652` :** own altar `record > -rn2(4)` → godvoice + `adjattrib(WIS,-1)` + record-- ; else Deaf whisper + verbalize + `Luck>-5 && rn2(Luck+6)` → `change_luck(rn2(20)?-1:-2)`. JS fidèle RNG (le `-rn2(4)` est dans la comparaison, donc toujours tiré). SetVoice named omit. `align_gname(game.urole, …)` vs C `align_gname(altaralign)` — API JS, à surveiller.

**`disturb_grave` C `engrave.c:1707` :** impossible si pas grave / déjà disturbed ; sinon pline, `disturbed=1`, `makemon(GHOUL)`, `exercise(WIS,FALSE)`. JS early-return silencieux (named). `MM_NOMSG` vs C `NO_MM_FLAGS`.

**`sink_backs_up` C `fountain.c:805` :** msgs Blind/Deaf ; Flupp prefix ; `S_LRING` once → You_see ring + `mkobj_at(RING_CLASS)` + DEX/WIS. JS `body_part(FACE)` → « face » named. `You_see` → `You see` pline.


### Callers et ordre `kick_nondoor`

Caller C unique : `dokick` quand la case n’est pas une porte. JS : même site (le `kick_nondoor` existant s’enrichit). Pas de nouveau export vers trap/dig.

Ordre C des `if typ` : SDOOR, SCORR, THRONE, fountain, grave, tree, IRONBARS, sink, (altar?). JS D-0985 porte SDOOR/SCORR/autel/fontaine/grave/bars/sink et **stub ouch** throne/tree. Si le stub est un `if IS_THRONE { kick_ouch; return }` **avant** fountain, l’ordre des types suivants reste C. Les `rn2` throne/tree C ne sont **pas** tirés — palier RNG vers D-0986.

RNG par bras porté :

- SDOOR/SCORR : un `rn2(30)` vs `avrg_attrib`
- autel : `altar_wrath` (`-rn2(4)` toujours ; `rn2(Luck+6)` court-circuit ; `rn2(20)` luck) + `!rn2(3)` ouch
- fontaine : `rn2(3)` ouch ; éventuellement `rn2(3)` boots
- tombe : `rn2(4)` ouch ; `!rn2(2)` disturb
- évier : `rn2(5)` Klunk ; pudding `!rn2(3)` ; `!rn2(3)` backs_up

Pas de RNG inventé sur IRONBARS (ouch only, C).

`cvt_sdoor_to_door` : déjà porté (vision/doormask). `b_trapped("door", FOOT)` déjà porté. Ce commit **branche** ces helpers, il ne les invente pas.

Helper `poly_gender` neuter→2 omit : washer `MM_MALE/FEMALE` faux si héros neutre. Rare sous fortress.

## Constitution / playbook
Grep `git show 34c147f5 -- js/` : pas de `FORCE`/`DIAG`/`getRngLog`/`readFileSync`/`from 'fs'`/`node:`/`fastforward`. Pas de seed en contrôle. Frozen intacts. Blind/Lev sticky locaux = qualité, pas constitution.

Playbook : **mélange score+port** explicite. Cadence tous les 5 iters est attendue ; coller un cluster ~220 LOC JS dans le même commit brouille la preuve fortress-après-port. CURRENT/D-log avouent « 43/44 **before** patch » — honnêtes, mais le hash unique lie les deux.

Rule #2 RAS. `await` helpers = pline/`makemon`, pas `nhgetch`. 1:1 : `altar_wrath` C `pray.c` → `pray.js` ; `disturb_grave` C `engrave.c` → `engrave.js` ; `sink_backs_up` C `fountain.c` → `fountain.js` ; `kick_nondoor` C `dokick.c` → `dokick.js`.

Gabarit journal corrompu : `` ```text## YYYY-MM-DD `` (fusion de lignes). Bruit process, pas un ban.

## Densité (§2b)
Port seul : **right size** (SDOOR+furniture moins throne/tree + 3 helpers). Commit entier : **too big process** (cadence docs + port). Pas too small.

## Documentation
**Trou D-0985 :** ce n’est **pas** un gap de numérotation (D-0984 → D-0985 → D-0986 dans l’index et le D-log). C’est un **sujet git sans D-id** alors que le corps porte `(D-0985)`. Flag process.

D-0985 nomme throne `fall_through` / tree scatter / `kick_object`. CURRENT next cluster aligne. Overclaim corps « Retire dokick map debt » alors que throne/tree/kick_object restent — la map est plus honnête.

**Honnêteté cadence :** CURRENT/D-log « before patch » — bien. Journal mélange cadence 43/44 **et** kick 19/20 dans la même entrée.

## Vérification
Cadence **43**/44 **avant** le JS. Kick cohort 19/20 = preuve du port (journal). Green+strict. **Pas** de full suite post-`kick_nondoor`. seed0009 préexistant. On ne peut pas dire que le port furniture a tenu la fortress publique.

#1270 43/44 plus tard n’éclaire pas ce mélange.

## Risques / dette
1. Process : fortress #1255 ≠ HEAD+D-0985.
2. Sujet sans D-id (D-0985 existe ailleurs).
3. Throne/tree encore ouch (D-0986) — stub sans les `rn2` C.
4. Levitation/Blind sticky vs macros C.
5. `poly_gender` neuter omit ; pudding Deaf incomplet.
6. Gabarit journal cassé.
7. `kick_object` toujours absent.


## Synthèse D-0985 / cadence
D-0985 **existe** (corps, index, D-log). Le « trou » est le **sujet git** sans D-id + **mélange** cadence #1255 mesurée *before patch* et port SDOOR/furniture. Port lui-même : SDOOR `rn2(30)` / uncover `== D_LOCKED` **C** ; throne/tree ouch stub **honnête** (D-0986). PROCESS-SMELL sur le commit, pas QUALITY-RISK sur le C lu. Green+kick 19/20 ≠ fortress post-port.


## Questions ouvertes (revue)
1. Le stub throne est-il un `if IS_THRONE kick_ouch return` (skip rn2) ou un fallthrough default ?
2. `avrg_attrib` JS est-il la moyenne C (Str+Dex)/2 ?
3. Le gabarit journal cassé a-t-il été réparé dans un commit docs suivant ?
4. Pourquoi le sujet omet D-0985 alors que le corps le porte ?

## Verdict
- Verdict : **PROCESS-SMELL**
- Note : **5.5/10**
- Si je ne devais retenir qu’une critique : D-0985 n’est pas un trou d’ID (il est dans le corps), mais le commit **mélange** cadence #1255 mesurée *avant* le port et un `kick_nondoor` partiel — le sujet sans D-id n’aide pas.
