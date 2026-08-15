# Review 73 — `6245f20d` — allmain Teleportation / Polymorph / ulycn once-per-turn

## Métadonnées
- Hash complet / court : `6245f20d16a4d7197e54a945662de79b03cd9f38` / `6245f20d`
- Parent : `fba5e8caa8a75dbba162bc9a8a89f1dc08d6f5b5`
- Auteur, date : Raphaël Hervier, 2026-07-22 05:17:59 +0200
- D-id : D-1002
- Stats : 8 files, +121/−21
- Fichiers JS / map / cadence : `js/allmain.js`, `js/were.js` (commentaire) ; `docs/c-js-map/turns.md` ; journal #1273 (pas une cadence full-suite)

## Intention vs livrable
Le message promet de **brancher** les bras C `allmain.c` moveloop après `regen_pw` : Teleportation `!rn2(85)` → `tele()` ; Polymorph / `ulycn` via `mvl_change` → `polyself` / `you_were`. C’est exactement ce que fait le diff : une fonction `maybe_tele_poly_were` + `await` au locus EOT, plus trois helpers de props.

Écarts honnêtes dans le code (moins dans le D-log « fixed ») :
- `next_to_u` / `check_leash` **sautés** (commentaire « always next_to_u ») — or C `next_to_u` refuse aussi un destrier porteur de l’Amulette, même sans laisse.
- `cmdq_clear(CQ_CANNED|CQ_REPEAT)` approximé par vidage de `_cmdq_canned` / `_cmdq_repeat` s’ils existent.
- `were.js` : uniquement le bandeau d’omissions, zéro logique.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/allmain.js` | Port C : helpers Teleportation/Polymorph/Unchanging, `mvl_change`, `maybe_tele_poly_were`, câble moveloop |
| `js/were.js` | Docs de module (callers) |
| `docs/c-js-map/turns.md` | Retire « Teleport/Poly still deferred » ; nomme leash/CQ_REPEAT |
| `docs/DIVERGENCE-LOG.md` / INDEX | D-1002 « fixed » |
| `docs/CURRENT.md` / `NOTES.md` | Next → warnreveal/overexert/eel |
| `docs/AGENT-LOOP-JOURNAL.md` | #1273 green + cohort 36/37 |

## Fidélité C ↔ JS

### Locus
- C : `nethack-c/upstream/src/allmain.c` moveloop, après `regen_pw(mvl_wtcap)`, bloc `if (!u.uinvulnerable)` (~L307–339). `static int mvl_change` ~L174.
- JS : `js/allmain.js` `maybe_tele_poly_were` + `let mvl_change = 0` (équivalent `static`).

C (ordre exact, extraits) :

```307:339:nethack-c/upstream/src/allmain.c
                if (!u.uinvulnerable) {
                    if (Teleportation && !rn2(85)) {
                        coordxy old_ux = u.ux, old_uy = u.uy;
                        tele();
                        if (u.ux != old_ux || u.uy != old_uy) {
                            if (!next_to_u()) {
                                check_leash(old_ux, old_uy);
                            }
                            cmdq_clear(CQ_CANNED);
                            cmdq_clear(CQ_REPEAT);
                        }
                    }
                    if ((mvl_change == 1 && !Polymorph)
                        || (mvl_change == 2 && u.ulycn == NON_PM))
                        mvl_change = 0;
                    if (Polymorph && !rn2(100))
                        mvl_change = 1;
                    else if (ismnum(u.ulycn) && !Upolyd
                             && !rn2(80 - (20 * night())))
                        mvl_change = 2;
                    if (mvl_change && !Unchanging) {
                        if (gm.multi >= 0) {
                            stop_occupation();
                            if (mvl_change == 1)
                                polyself(POLY_NOFLAGS);
                            else
                                you_were();
                            mvl_change = 0;
                        }
                    }
                }
```

JS au commit (hors leash, câblé D-1005) :

```91:125:js/allmain.js
async function maybe_tele_poly_were() {
    const u = game.u || (game.u = {});
    if (u.uinvulnerable) return;
    if (Teleportation(u) && !rn2(85)) { /* tele + cmdq */ }
    if ((mvl_change === 1 && !Polymorph(u))
        || (mvl_change === 2 && (u.ulycn | 0) === NON_PM)) {
        mvl_change = 0;
    }
    if (Polymorph(u) && !rn2(100)) {
        mvl_change = 1;
    } else if (ismnum(u.ulycn) && !Upolyd(u) && !rn2(80 - (20 * night()))) {
        mvl_change = 2;
    }
    if (mvl_change && !Unchanging(u)) {
        if ((game.multi == null || game.multi >= 0)) {
            await stop_occupation();
            if (mvl_change === 1) await polyself(POLY_NOFLAGS);
            else await you_were();
            mvl_change = 0;
        }
    }
}
```

### Branches portées / sautées
**Ordre des `if` et des `rn2` : conforme à C.** C’est le point critique de ce peel.

1. `uinvulnerable` : C enveloppe le bloc ; JS `return` en tête de la fonction extraite. Équivalent **pour ce bloc**. Searching / dosounds restent hors de la fonction — correct.
2. `Teleportation && !rn2(85)` : short-circuit identique — **pas de `rn2(85)` si la prop est fausse**.
3. Invalidation `mvl_change` **avant** les jets Polymorph/ulycn — même commentaire C « delayed change may not be valid anymore ».
4. `Polymorph && !rn2(100)` puis **`else if`** lycan : le `rn2(80-20*night())` n’est **pas** appelé si Polymorph a déjà gagné. Court-circuit `ismnum && !Upolyd` avant le `rn2` : identique.
5. Application : `mvl_change && !Unchanging` puis `multi >= 0` puis `stop_occupation` puis `polyself(POLY_NOFLAGS)` **ou** `you_were` puis `mvl_change = 0`. Si `multi < 0`, C **conserve** `mvl_change` pour un tour ultérieur ; JS aussi.

Sauts :
- `next_to_u` / `check_leash` après téléport réussi.
- `cmdq_clear` réel (queues C) vs tableaux JS optionnels.

### RNG
| Appel | Condition C | JS au commit |
|---|---|---|
| `rn2(85)` | `Teleportation` | idem |
| `rn2(100)` | `Polymorph` | idem |
| `rn2(80-20*night())` | `else if ismnum(ulycn) && !Upolyd` | idem |
| `night()` | `calendar.c` hour&lt;6 \|\| &gt;21 | `js/calendar.js` identique ; booléen JS : `20*true===20` |

`polyself` / `tele` / `you_were` consomment leur propre RNG **après** ces jets, comme C.

`POLY_NOFLAGS = 0x00` (`hack.h` / `const.js`) : correct, pas `POLY_CONTROLLED`.

### Helpers de props
C `youprop.h` : `Teleportation (HTeleportation \|\| ETeleportation)` via `u.uprops[TELEPORT].intrinsic/extrinsic`.

JS OR-additionne `u.Teleportation`, `H*`, `E*` **et** `uprops`. Pattern JS déjà répandu. Risque : un booléen plat `u.Teleportation` orphelin rendrait `Teleportation()` vrai → **`rn2(85)` chaque tour** alors que C ne le ferait pas. Pas introduit ici, mais ce peel **active** ce prédicat sur le chemin chaud EOT.

`Unchanging` / `Polymorph` : même schéma.

### `Upolyd` — écart de prédicat
C `you.h:554` : `#define Upolyd (u.umonnum != u.umonster)`.
JS `const.js` : `Upolyd` ≡ `mtimedone > 0` (commentaire C **faux**).

Conséquence sur le bras lycan : si `umonnum == ulycn` mais `mtimedone == 0`, C **ne tire pas** `rn2(80-…)` (`!Upolyd` faux) ; JS **tire**. `you_were` early-return si déjà were (`umonnum == ulycn`), donc pas de double morph — mais **un `rn2` de trop** tant que `mtimedone` n’est pas posé. `polymon` pose en général `mtimedone` ; dette de prédicat, pas une invention de ce commit, **première fois qu’elle gate un jet once-per-turn**.

`ismnum` : C `x >= LOW_PM && x < NUMMONS` ; JS `Number.isInteger(pm) && pm >= LOW_PM` — pas de plafond `NUMMONS`. Ulcycn hors table pourrait passer `ismnum` JS.

### Callers
Un seul : EOT après `regen_pw`, avant Searching — **le** caller C. Pas de second câblage fantôme (pas dans `nh_timeout`, pas par input).

`mvl_change` module-level : C `static` vit aussi pour la durée du process ; une nouvelle partie sans reload garderait la valeur. Fidèle, pas un bug JS isolé.

### Stubs
Pas de `TODO` / `not yet` dans le JS. Omission leash **nommée** dans le commentaire de fonction et `turns.md`.

### Placement dans `moveloop_core`
C enchaîne, dans le bras EOT une fois que le héros a « pris du temps » : Glib → `nh_timeout` → `run_regions` → `ublesscnt--` → `regen_hp` (si blessé / eel) → **overexert encumber (encore deferred)** → `regen_pw` → **ce bloc** → Searching → **warnreveal (deferred)** → dosounds…

JS au commit appelle `maybe_tele_poly_were` immédiatement après `regen_pw(mvl_wtcap)`. Pas d’insertion dans le chemin `nhgetch` / once-per-input. Pas de second appel si `multi` occupation. C n’appelle ce bloc qu’une fois par tour de `moves++` (pas par point de mouvement). Si JS `moveloop_core` incrémentait `moves` plus souvent, les `rn2(85/100/80)` se multiplieraient — hors scope, mais c’est **pourquoi** coller le bloc au mauvais await casserait la forteresse RNG.

### `you_were` déjà paranoid
D-1001 a câblé `paranoid_query(ParanoidWerechange)`. Donc le bras allmain `you_were()` peut ouvrir un getlin **au milieu de l’EOT**, comme C. Pas un await inventé. Si `monster_nearby()` est true, C `you_were` return sans morph **après** que allmain a déjà consommé `rn2(80-…)` et posé `mvl_change=2` puis `stop_occupation` : JS identique (le `rn2` est dans allmain, pas dans were.c).

### Macros C exactes
- `Teleportation` : `youprop.h` H\|\|E `TELEPORT`.
- `Polymorph` : H\|\|E `POLYMORPH` (pas `Polymorph_control` — **correct** de ne pas gater le jet allmain sur le contrôle ; le contrôle vit dans `you_were` / `polyself`).
- `Unchanging` : empêche l’**application**, pas le jet qui pose `mvl_change`. Un anneau d’unchanging : C tire quand même `rn2(100)` si Polymorph, pose `mvl_change=1`, puis le `if (mvl_change && !Unchanging)` échoue et **conserve** mvl_change jusqu’à retrait de l’anneau. JS identique.

## Constitution / playbook
Grep JS du commit : pas de `FORCE`, `DIAG`, `getRngLog`, `readFileSync`, `node:`, `fastforward`. Rule #2 RAS. Frozen intacts. `await tele` / `polyself` / `you_were` / `stop_occupation` sous le moveloop déjà async — pas un nouvel await hors `nhgetch`. 1:1 `allmain.c` → `allmain.js`. Helpers props locaux (pas `youprop.js`) : déjà le style du fichier.

Traces / seeds dans le contrôle : aucun.

## Densité (§2b)
**Right size.** Un bloc C contigu, un caller, les callees (`tele` / `polyself` / `you_were`) existaient (D-1001 / téléport déjà là). Pas un `if` isolé. Pas trois sous-systèmes sans lien. Le peel suivant (D-1003) reprend volontairement la suite du moveloop.

## Documentation
D-1002 (extrait d’intention) :

- Symptom : `you_were`/`polyself`/`tele` existaient, allmain **sautait** les bras after `regen_pw`.
- Fix : `maybe_tele_poly_were` + static `mvl_change` ; helpers props ; clear `_cmdq_canned` on successful tele.
- Deferred : next_to_u/check_leash body ; CQ_REPEAT queue ; potion/mhitm you_were ; overexert/eel.

Le mot « body » pour leash laisse entendre que `next_to_u()` serait appelé et retournerait true. Au commit, **l’appel est absent**. Un destrier avec AoY : C `next_to_u` false après téléport réussi → `check_leash` ; JS ignore. Ce n’est pas « body deferred », c’est **caller sauté**.

- D-log **Status: fixed** alors que `next_to_u` n’est pas le no-op « toujours adjacent » : destrier+AoY. Overclaim léger sur la sémantique du deferral, pas sur « complete cluster ».
- `turns.md` nomme leash + CQ_REPEAT : mieux que le D-log.
- CURRENT / NOTES : next warnreveal/overexert/eel — cohérent avec la suite C (D-1003).
- Journal #1273 : green+strict + allmain 36/37 seed0009 préexistant. **Pas** de rafraîchissement 44/44 (NOTES reste #1270 **43**/44). Cohorte allmain citée, pas la full suite — acceptable hors cadence.
- INDEX : « map-driven; green+allmain cohort 36/37 (seed0009 pre-existing) » — pas de overclaim 44/44.

## Questions ouvertes
- `tele()` JS est-il un no-op sur noteleport **avant** de bouger ux/uy, comme C, de sorte que le `rn2(85)` soit le seul jet allmain ? (présupposé D-1002, non revérifié ici.)
- `stop_occupation` JS vide-t-il `CQ_CANNED` comme C `stop_occupation` → `cmdq_clear` ? Double clear possible vs C.

## Vérification
Cités : green+strict PASS ; allmain cohort **36**/37 (seed0009 Scr 72/73). Pas de transcript de commande dans le commit. Affirmation de loop, pas une preuve embarquée. Fortress **43**/44 inchangée (mesure #1270).

## Risques / dette
1. **`next_to_u` pas seulement la laisse** — AoY sur destrier peut faire échouer un téléport C ; JS D-1002 laisse passer.
2. **`Upolyd` mtimedone vs `umonnum != umonster`** — jet lycan extra possible.
3. Helpers props à triple représentation (`u.Teleportation` plat).
4. `ismnum` sans `&lt; NUMMONS`.
5. `game.multi == null` traité comme `>= 0` : OK si défaut C = 0 ; dangereux si `multi` absent veut dire « pas initialisé » ailleurs.
6. Suite obligatoire : D-1005 leash (fait) ; CQ_REPEAT réel.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **8/10**
- Si je ne devais retenir qu’une critique : **l’ordre Teleportation → invalidation `mvl_change` → Polymorph `else` ulycn → Unchanging/multi/`polyself`|`you_were` est le C**, y compris les short-circuits RNG ; le D-log « fixed » oublie que `next_to_u` n’est pas un no-op hors laisse.
