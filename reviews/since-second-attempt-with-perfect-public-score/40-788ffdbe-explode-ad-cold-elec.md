# Review 40 — `788ffdbe` — explode AD_COLD / AD_ELEC (D-0971)

## Métadonnées
- Hash complet / court : `788ffdbef2dc7b1c341caa952cfc15a5521b8f3f` / `788ffdbe`
- Parent : `81f0f153380294f52020c064bd7f6125c36899a9`
- Auteur, date : Raphaël Hervier, 2026-07-22T01:05:13+02:00
- D-id : **D-0971**
- Stats : 10 files, +131/−67 (JS `explode.js` +74)
- Fichiers JS / map / cadence : `js/explode.js`, `js/zap.js` (omit note) ; `docs/c-js-map/debt.md`, `turns.md` ; pas de cadence (next #1245)

## Intention vs livrable
Promet de **continuer** l’envelope D-0968 : Cold/Shock `explosionmask` + combat COLD/ELEC + `mon_explodes` type breath pour freezing/shocking spheres.

+131/−67, dont beaucoup de docs. Question de mission : **shim mince sur D-0968 ?** Non. Les bits C qui manquaient après FIRE sont exactement : ouvrir `combat_ok`, ajouter 4 bras mask (hero+mon × COLD/ELEC), élargir `mon_explodes`, `adtyp_to_expltype` FROSTY/MAGICAL. C n’a **pas** de fonction séparée « explode_cold » — c’est le même `explode()` avec `adtyp` discriminant. Un peel 400 lignes aurait dupliqué D-0968. **Continuation légitime**, pas un fake peel.

Titre AD_COLD/ELEC, **pas** explode complete. D-log : « Continue the D-0968 explode envelope ». Honnête. Pas de cadence mêlée.

## Inventaire
| Fichier | Rôle |
|---|---|
| `js/explode.js` | Port C : mask COLD/ELEC ; `combat_ok` += COLD/ELEC ; `mon_explodes` ; `adtyp_to_expltype` |
| `js/zap.js` | Docs : omit MAGM/… au lieu de COLD/ELEC |
| map / D-log | Next MAGM/DISN/DRST/ACID |

## Fidélité C ↔ JS

### Ce que C fait déjà (et JS D-0968 non)
C `explosionmask` a FIRE **et** COLD/ELEC/MAGM/DISN/DRST/ACID dès le jour 1. C `explode` combat **ne gate pas** sur adtyp. D-0968 a introduit `combat_ok = PHYS||FIRE` — **garde JS**, pas C. D-0971 élargit la garde. Le ×2 `resists_fire && AD_COLD` était **déjà** dans D-0968 (mort jusqu’ici). `destroy_items` zap gère déjà COLD/ELEC si appelé — D-0968 ne l’appelait pas hors FIRE.

Donc D-0971 n’est pas « 74 lignes de nouvelle math » ; c’est **brancher** des bras C déjà écrits côté zap/resist. Juger la densité là-dessus, pas au LOC.

### `explosionmask` — `explode.c:26`
C hero COLD → `Cold_resistance` EXPL_HERO ; ELEC → `Shock_resistance`. Mon : `resists_cold` / `resists_elec` EXPL_MON.

JS D-0971 ajoute :

```js
        case AD_COLD: if (Cold_resistance()) res = EXPL_HERO; break;
        case AD_ELEC: if (Shock_resistance()) res = EXPL_HERO; break;
    ...
    case AD_COLD: if (resists_cold(m)) res = EXPL_MON; break;
    case AD_ELEC: if (resists_elec(m)) res = EXPL_MON; break;
```

**Confirmation** des 4 bras. MAGM/DISN/DRST/ACID restent NONE (C les a). Envelope nommé.

### `combat_ok`
```js
const combat_ok = adtyp === AD_PHYS || adtyp === AD_FIRE
    || adtyp === AD_COLD || adtyp === AD_ELEC;
```

Sans ça, mask COLD ne servirait à rien : la boucle `continue` sautait destroy/HP. **C’est le changement sémantique.** MAGM/DISN/DRST/ACID toujours skip combat (terrain `zap_over_floor` 3×3 continue). **Pas** explode complete.

### Combat mon/hero — réutilisation D-0968
Unshielded : `resist` → `(dam+1)/2` ; `resists_cold && FIRE` ×2 ; `resists_fire && COLD` ×2. COLD combat **active** enfin le second ×2. ELEC : pas de ×2 opposé dans C (seulement fire↔cold). JS n’invente pas un ×2 shock. **Confirmation.**

Hero Half_phys : C PHYS **ou ACID** seulement — COLD/ELEC full dam, JS idem (Half_phys pas appliqué). FIRE `burnarmor`/`ignite` **seulement** si `adtyp==AD_FIRE` — COLD ne doit pas brûler l’armure. Le `if (adtyp === AD_FIRE)` D-0968 reste. **Confirmation** vs un copier-coller FIRE sur COLD.

`destroy_items(mtmp, adtyp, dam)` avec adtyp COLD/ELEC : zap détruit potions/anneaux selon tables C. D-0968 import réel — plus de stub rn2. **Callers :** même 3×3, types de plus.

Fatal hero : JS `done(adtyp === AD_FIRE ? BURNING : DIED)`. COLD/ELEC fatal → DIED, pas BURNING. C : BURNING seulement feu. **Confirmation.**

### `mon_explodes` — `explode.c:1019`
C : tout `AD_MAGM..AD_SPC2` → `type = -((adtyp-1)+20)`. JS D-0968 : FIRE only. D-0971 :

```js
} else if (ad === AD_FIRE || ad === AD_COLD || ad === AD_ELEC) {
    type = -((ad - 1) + 20);
}
```

**Confirmation formule.** MAGM/DISN spheres encore `return` early — named. Dégâts `d(damn,damd)` / `d(mlevel+1,damd)` inchangés.

### `adtyp_to_expltype` — `explode.c:987`
C : ELEC/SPEL/DREN/ENCH → EXPL_MAGICAL ; FIRE FIERY ; COLD FROSTY ; DRST/PHYS NOXIOUS.

JS : COLD FROSTY ; ELEC MAGICAL ; FIRE FIERY ; else NOXIOUS. Visuel `_expltype` souvent ignoré (sparkle deferred). Petit, mais **pas un no-op** si un caller affiche expltype. Densité OK comme ligne du cluster typé.

### Ce qui n’est toujours pas C
- MAGM/DISN/DRST/ACID mask + combat (`combat_ok`)
- golemeffects / ugolemeffects / Invulnerable / grabbing ×2 / slime / ignite body / hallu / sparkle
- Upolyd rehumanize (D-0968)
- unknown zap type JS MAGM vs C `impossible`+return

D-log les liste. **Pas d’overclaim complete explode.** Plus tard D-0973 MAGM/DISN/… — hors revue.

## Constitution / playbook
Grep JS : pas FORCE/DIAG/traces/fs/node:/fastforward/seeds. Frozen non touchés. Rule #2 OK. Pas de nouvel await. Module explode 1:1. **RAS** constitution.

## Densité (§2b)
Right size **comme suite typée**. Too-small **si** on comptait seulement +74 sans voir que C n’a pas de second `explode_cold`. Playbook §2b : cluster lié, pas un `if` isolé — ici 4 bras mask + gate + mon_explodes. **Pas un shim :** `combat_ok` change le HP COLD/ELEC ; un commentaire-only n’aurait pas ouvert destroy_items. Pas too-big (MAGM laissé à plus tard).

Comparer à un peel docs-only : ici les AT_BOOM freezing/shocking spheres **cassent** enfin comme C. C’est le critère.

## Documentation
D-0971 « fixed » pour COLD/ELEC combat — **vrai**. « Continue D-0968 » — **vrai**. Deferrals MAGM/… honnêtes. `debt.md`/`turns.md` next MAGM. `zap.js` header : plus « COLD/ELEC omit », MAGM remaining. Pas « explode complete ».

## Vérification
Journal : green+strict ; zap/wizard/shared **20/20** (seed2200/0360/0006/0398/5002/0016/0030). Cohorte wizard pertinente (spheres). Pas de cadence (next #1245). #1270 plus tard hors scope.

Si aucun seed n’explose une freezing sphere, 20/20 ne teste pas `combat_ok` COLD. D-0971 est alors « structurellement correct, empiriquement peu vu ». Ce n’est pas un argument contre le port (C-shaped) ; c’est un argument contre « fortress held ⇒ COLD boom done ».

## Thin shim ? Lecture LOC
Diff explode.js : mask +4 cases, `combat_ok` +2 types, `mon_explodes` +2 types, `adtyp_to_expltype` +2 returns, headers. **Zéro** nouvelle fonction. Playbook anti-peel : « un if isolé ». Ici l’if **ouvre** destroy_items/resist/HP pour deux adtyp C déjà dans `explode.c` depuis toujours. Critère : un freezing sphere `mon_explodes` D-0968 `return` early ; D-0971 appelle `explode` avec type breath. Observable. **Pas thin.**

Un vrai shim aurait : comment « COLD later », ou `adtyp_to_expltype` seul sans `combat_ok`. Ce n’est pas le cas.

MAGM reste gated — D-0973. Reviewer 37+40 : **FIRE puis COLD/ELEC, jamais « explode complete ».**

## Risques / dette
1. MAGM/DISN/DRST/ACID toujours `combat_ok` false — ne pas lire 44/44 comme explode done.
2. Dette D-0968 inchangée : ignite, golem, Invulnerable, rehumanize, grabbing.
3. Visuel expltype / sparkle.
4. `resists_elec` / `Shock_resistance` helpers doivent matcher C (préexistants zap).
5. Thin-LOC critique : injustifiée — le gate **est** le port.


## `destroy_items` COLD vs FIRE
C `destroy_items` switch dmgtyp : FIRE scrolls/spbooks/potions ; COLD potions ; ELEC rings/wands ; etc. JS zap déjà. Ouvrir `combat_ok` COLD **active** ces tables dans le 3×3. Un freezing sphere au-dessus d’une pile de potions : D-0968 ignore HP **et** destroy ; D-0971 destroy+HP. **Keystream + loot.** Ce n’est pas visuel expltype.

ELEC `Shock_resistance` mask : hero shield uhurt=1, items still `destroy_items` (anneaux) — C destroy n’est pas skip par mask. JS même boucle que FIRE. **Confirmation.**

## `mon_explodes` early return
D-0968 `else return` pour non-FIRE. Sphere AD_COLD : **pas d’explode du tout** (pas même terrain). D-0971 : explode complet 3×3 zap_over_floor COLD (freeze pools D-0965) **plus** combat. Double gain terrain+HP. Un palier « mask only » sans `mon_explodes` aurait laissé les spheres inertes. **Donc pas thin.**

## `adtyp_to_expltype` ELEC MAGICAL
C commentaire : electricity isn’t magical but no electric expl type. JS EXPL_MAGICAL. FROSTY COLD. Sparkle glyphs deferred : ces returns peuvent être morts. Les garder dans le cluster évite un third peel « expltype only ». Densité OK.

## Suite D-0973
MAGM/DISN/DRST/ACID : même pattern (ouvrir combat_ok + mask). Review 40 ne doit **pas** les exiger. Envelope nommé. Score 7.5 = dette golem/ignite héritée D-0968, pas un reproche LOC.

Hero fatal COLD : `done(DIED)` pas BURNING. Si JS utilisait BURNING pour tout combat_ok, bones/tombstone faux. Le ternaire FIRE?BURNING:DIED D-0968 **reste correct** pour COLD/ELEC.



## Résistance croisée fire↔cold
C : un monstre resists_cold prend ×2 FIRE ; resists_fire prend ×2 COLD ; **jamais les deux** (si résiste le type courant, on est dans le bras shield `EXPL_MON`, golem+itemdmg only, pas le ×2). JS `if (explmask & EXPL_MON)` skip ×2. D-0971 n’y touche pas. **Confirmation** héritage D-0968.

ELEC pas de croisé. JS n’ajoute pas `resists_disint && ELEC` inventé. **Pas de creative damage.**

## `zap.js` omit note
Trois lignes header : AD_COLD/ELEC combat « done », MAGM remaining. Map turns idem. Docs 1:1 avec `combat_ok`. Honnête.

Journal rotate 1241. Pas de CURRENT 44/44 dans ce hash (next #1245). Preuve = cohort 20/20 only. Suffisant pour un typed follow-on ; plus faible qu’un cadence mix (ironie : 40 a **meilleure** hygiène process que 34/39).

Seed 0016 healer / 0030 ajoutés vs D-0968 cohort — légèrement plus large. Toujours pas une sphere COLD garantie.

## `EXPL_FROSTY` import
const.js déjà. Si glyph explode ignore _expltype, import mort. Coût 0 RNG.

DISN wand `olet` dans mask : hors envelope. Ne pas l’exiger.



## Comparaison D-0968 vs D-0971 (table)

| Pièce | D-0968 | D-0971 |
|---|---|---|
| combat_ok | PHYS+FIRE | +COLD+ELEC |
| mask hero/mon | FIRE | +COLD +ELEC |
| ×2 fire↔cold | écrit, COLD mort | COLD **vivant** |
| burnarmor/ignite | FIRE only | inchangé (correct) |
| done() | BURNING si FIRE | DIED pour COLD/ELEC |
| mon_explodes | PHYS+FIRE | +COLD+ELEC |
| adtyp_to_expltype | FIERY | +FROSTY+MAGICAL |
| MAGM/DISN/ACID | gated | gated |

Rien n’est « comment only ». La colonne D-0971 est le minimum C pour spheres frost/shock.

## `resists_elec` / Cold_resistance
Helpers zap/youprop préexistants. Si Shock_resistance JS ne lit pas `u.EShock_resistance`, mask hero ELEC faux (full HP + maybe destroy). Même classe de bug que FIRE D-0968. Cohort 20/20.

`olet` MON_EXPLODE pour spheres : resist() uses olet pour chance. C `resist(mtmp, MON_EXPLODE, 0, FALSE)`. JS passe olet explode. **Confirmation** vs passer WAND par erreur.

## Process
Hygiène : un D-id, pas de CURRENT mix, map next MAGM. Mieux que 34/39. Densité petite **parce que** le travail est un discriminant, pas un nouveau fichier. ACCEPT-WITH-DEBT.

Hero Invulnerable COLD : toujours sauté (héritage). Ice sphere vs Invulnerable hero — rare.

sparkle : visuel, judge screens maybe glyphs. Named depuis D-0968. Ne pas bloquer 40 là-dessus.


## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7.5/10**
- Si je ne devais retenir qu’une critique : ce n’est **pas** un shim sur D-0968 — ouvrir `combat_ok` + 4 bras mask + `mon_explodes` COLD/ELEC **est** le C ; ce n’est **pas** non plus explode complete (MAGM/DISN/… restent).
