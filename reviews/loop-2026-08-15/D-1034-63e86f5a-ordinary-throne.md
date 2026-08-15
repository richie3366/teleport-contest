# Review — `63e86f5a` — D-1034 ordinary throne 1–13 + genocide

## Métadonnées
- Hash complet / court : `63e86f5a28696d8848415cc0c16fade11e12fba3` / `63e86f5a`
- Parent : `a59caac8` (D-1033)
- Auteur, date : Raphaël Hervier (Co-authored-by Cursor), 2026-08-15 17:56
- D-id : **D-1034**
- Stats : 13 files, **+570 / −73** — `js/sit.js` **+259**, `js/read.js` **+247**
- Fichiers JS / map / cadence : `sit.js` ordinary switch ; `read.js` `do_genocide` ; `mon.js` `kill_genocided_monsters` ; `mklev.js` `courtmon` export ; pas de cadence

## Intention vs livrable
Promesse : ordinary `throne_sit_effect` cases 1–13 + `take_gold` + `do_genocide`.

Livrable : le switch C **et** un port `do_genocide(how)` getlin (caller case 8 `how=5` = REALLY\|ONTHRONE). Deux familles (sit + read genocide). Plus gros SHA du run post-D-1022.

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/sit.js` | cases 1–13 + vanish déjà D-1033 |
| `js/read.js` | `do_genocide` REALLY/PLAYER/ONTHRONE |
| `js/mon.js` | `kill_genocided_monsters` |
| `js/mklev.js` | export `courtmon` |
| `js/spell.js` | `take_gold` import (cursed_book) |

## Fidélité C ↔ JS

### Ordinary switch — branche par branche
C `sit.c:68–209` après `rnd(6)>4` et `!In_V_tower`. JS `sit.js:567–732`. Wizard getlin omit (même RNG `rnd(13)` live).

| Case | Preuve |
|------|--------|
| 1 | C `adjattrib(rn2(A_MAX), -rn1(4,3), FALSE)` puis `losehp(rnd(10), "cursed throne")`. JS `adjattrib(..., 0)` : `attrib.js` `msgflg<=0` → You_feel ≡ C FALSE. RNG `rn2` puis `rn1` puis `rnd` : LTR match. |
| 2 | `adjattrib(rn2(A_MAX), 1, FALSE)` / JS `0`. Match. |
| 3 | « A%s electric shock » Shock → `"n"` else `" massive"` ; `rnd(6)` vs `rnd(30)` ; `exercise CON`. Match. |
| 4 | heal max+4, cream, `make_blinded(0,TRUE)`, `make_sick(0,…,SICK_ALL)`, `heal_legs(0)`, botl. Match d’enveloppe ; qualité = ces `make_*`. |
| 5 | `take_gold` : C `remove_worn_item`+`delobj` COIN. JS splice invent + `delobj`, **pas** `remove_worn_item` (nommé). Message strange sensation / no gold : match. |
| 6 | `uluck + rn2(5) < 0` → luck+1 else `makewish`. Match. |
| 7 | `rnd(10)` courtmon `makemon` à (tx,ty) ; voice Dame/Sire. SetVoice omit. |
| 8 | `do_genocide(5)`. Voir ci-dessous. |
| 9 | Luck>0 → `make_blinded(BlindedTimeout+rn1(100,250))` + `change_luck(-rnd(2) ou -1)` else `rndcurse`. Match. |
| 10 | Luck<0 **ou** `HSee_invisible & INTRINSIC` → nommap confuse `HConfusion&TIMEOUT+rnd(30)` else `do_mapping` ; sinon vision/tingle + `HSee_invisible \|= FROMOUTSIDE`. JS `eyecount`/`vtense` fallthrough 2→1 : match. |
| 11 | Luck<0 `aggravate` else `tele()`. Match d’enveloppe. |
| 12 | insight ; `invent` → `identify_pack(rn2(5), FALSE)`. JS `invent.length` : pile vide C `gi.invent` NULL vs JS `[]` — les deux skip. |
| 13 | pretzel `make_confused((HConfusion&TIMEOUT)+rn1(7,16))`. Match. |

Vanish : `!special && !rn2(3) && (!wizard \|\| y_n Analyze=='y')`. JS `wizard_mode()` + `yn_function`. En non-wizard le `yn` n’est pas évalué (short-circuit) : **pas de RNG extra**. Match.

### `do_genocide(5)` — nouveau sous-système, pas un stub de une ligne
C `read.c` `do_genocide` : getlin type, `G_GENO` refus, self-geno ONTHRONE killer « imperious order », `kill_genocided_monsters`.

JS `read.js:1021` : `GENO_REALLY=1`, `GENO_ONTHRONE=4`, `how=5` les deux bits. Killer ONTHRONE `KILLED_BY_AN` / `imperious order` : match C. `getlin` nom de monstre ; 5 essais ; `G_GENO` thunderous No mortal.

**Risques :** `name_to_mon` / livelog / Hallu / `kill_eggs` / cham `newcham` nommés. Un `#sit` trône case 8 **interactif** n’est dans aucune trace publique. Le getlin peut désync I/O sans toucher le RNG prefix si le joueur ne s’assoit pas.

`G_GENO 0x0020` dans ce commit (monsters.js) : à traiter comme un **const C** (obj.h/monflag), pas une constante de trace.

### `courtmon`
Export mklev. Non relu ligne à ligne ici ; si `courtmon` JS est encore un sous-ensemble de `mkroom.c`, case 7 spawn le **mauvais** monstre de cour (RNG `makemon` ensuite).

## Constitution / playbook
Bans clean. `getlin` = input `nhgetch` chain existante. Pas de seed-gate. Cadence non mêlée (bon).

## Densité (§2b)
**Too big** si on compte `do_genocide` comme famille read.c à part (c’en est une). Justifiable comme callee immédiat de case 8 — mais +247 `read.js` + kill_genocided + courtmon, c’est un cluster sit **et** un mini-port genocide. Qualité : le switch sit est meilleur que D-1023 ; le genocide est un second roman.

## Documentation
D-log honnête sur wizard getlin / kill_eggs. CURRENT Keep 1–13. NOTES unhit : vrai.

## Vérification
Cohort 9/9 dont seeds `#sit`. Ces seeds **PASS déjà avant** le switch (forteresse). Ils ne prouvent pas case 1–13. Private node journal mince vs 13 bras.

## Risques / dette
1. `do_genocide` getlin / `name_to_mon` unhit.
2. `courtmon` / `identify_pack` / `tele` / `aggravate` / `do_mapping` = callees partials.
3. `take_gold` sans `remove_worn_item`.
4. `dosit` trap skip (D-1033) s’applique encore : on n’atteint le switch que si la case n’a pas d’objet **et** JS ignore le trap.

## Verdict
- Verdict : **QUALITY-RISK**
- Note : **5.5 / 10**
- Une phrase : les **13 cases** et le puff `!rn2(3)` sont une copie C soigneuse (RNG, `adjattrib` msgflg, bits genocide 5) ; coller `do_genocide` complet dans le même SHA, sans trace qui s’assoie, c’est un Keep de switch + un port read.c non exercé.
