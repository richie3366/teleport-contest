# Review 42 — `af35f8fc` — explode AD_MAGM/DISN/DRST/ACID

## Métadonnées
- Hash complet / court : `af35f8fcae6f2c576f4e27ace76aa3d47de801a3` / `af35f8fc`
- Parent : `beec8efe0c8a2208264768a8118739a0c594f48e`
- Auteur, date : Raphaël Hervier, 2026-07-22 01:20:57 +0200
- D-id : D-0973
- Stats : 10 files, +206/−82 (JS : `explode.js` +144, `zap.js` +3)
- Fichiers JS / map / cadence : `js/explode.js`, `js/zap.js` (note) ;
  debt/turns ; rotation journal #1243 ; pas de cadence

## Intention vs livrable
Promet d’ouvrir le combat explode MAGM/DISN/DRST/ACID après COLD/ELEC
(D-0971) : masks Antimagic/Disint/Poison/Acid, `combat_ok`,
`mon_explodes` AD_MAGM..AD_SPC2. Le diff le fait, sans inventer un
nouveau moteur. Écart de titre : « remaining explode types vs C
`explode.c` » n’est **pas** clos — `engulfer_explosion_msg`,
`ignite_items` (encore stub), `ugolemeffects`, Invulnerable, hallu,
sparkle restent. Le D-log les nomme. Le gate `combat_ok` **existe
encore** (C n’en a pas).

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/explode.js` | Port masks + ouverture combat + `mon_explodes` + `adtyp_to_expltype` |
| `js/zap.js` | Commentaire omit seulement |
| `docs/c-js-map/debt.md` / `turns.md` | D-0973 ; lavawall/burn encore ouverts |
| D-LOG / INDEX / CURRENT / NOTES / journal | Standard loop |

## Fidélité C ↔ JS

### `explosionmask`
- Locus C : `explode.c:explosionmask` (26–115)
- Locus JS : `js/explode.js:explosionmask`
- Hero, branch-par-branch :
  - `AD_PHYS` → `EXPL_NONE`
  - `AD_MAGM` → `Antimagic` → `EXPL_HERO`
  - `AD_FIRE`/`COLD`/`ELEC` inchangés
  - `AD_DISN` : si `olet === WAND_CLASS` alors
    `nonliving(data) || is_demon(data)` sinon `Disint_resistance`
  - `AD_DRST` / `AD_ACID` → Poison / Acid
  - `default` → `EXPL_NONE` (C : `impossible` puis NONE)
- Monstre : `resists_magm` / fire / cold ; DISN wand =
  `nonliving || is_demon || is_vampshifter` (C ajoute vamp **seulement**
  côté monstre, pas hero — JS aussi) ; sinon `resists_disint` ;
  poison / acid.
- Écart hero DISN wand : C utilise `m->data` avec `m == &youmonst`.
  JS reconstruit `data` via `(m === youmonst ? m.data : null) ||
  youmonst.data`. Équivalent si `m` est bien youmonst. Fragile si un
  caller passe un proxy `_youmonst`.
- RNG : aucun dans le mask.

### `resists_magm`
- C `mondata.c` : `dmgtype(AD_MAGM)` / baby gray / `AD_RBRE` **plus**
  scan invent worn/wield ANTIMAGIC artifact.
- JS : les trois premiers seulement. Nommé. Un monstre dont la seule
  MAGM-res est un artifact porté prendra le blast comme non-résistant
  (dégâts + pas de shield). C’est le trou de mask le plus concret.

### `adtyp_to_expltype`
- C (987–1011) : ELEC/SPEL/DREN/ENCH → MAGICAL ; FIRE → FIERY ;
  COLD → FROSTY ; DRST/DRDX/DRCO/DISE/PEST/PHYS → NOXIOUS ; default
  `impossible` + FIERY.
- JS : FIRE/COLD/ELEC inchangés ; DRST|PHYS → NOXIOUS ; **sinon FIERY**.
- MAGM/DISN/ACID → FIERY comme le default C (sans `impossible`). OK
  pour ce cluster. Manquent DRDX/DRCO/DISE/PEST/SPEL (hors envelope).

### `explode` combat
- Locus C : `explode.c:explode` boucle `if (dam)` (456–588) puis hero
  (590–679) puis shop `pay_for_damage` (DISN → `"disintegrate"`).
- JS : `combat_ok = PHYS || (MAGM..ACID)` puis `if (!combat_ok)
  continue` dans le 3×3. C applique **toujours** `zap_over_floor` +
  combat pour tout `adtyp`. Ouvrir MAGM..ACID aligne les types
  demandés ; le **gate lui-même** n’est pas C.
- Conséquence : un `AT_BOOM` `AD_SPC2` (mon_explodes l’accepte, type
  `-((ad-1)+20)`) explosera **sans** `zap_over_floor` ni HP. Rare, mais
  c’est la non-complétude vs C.
- Combat générique déjà là (D-0968/0971) : `destroy_items(adtyp)`,
  `resist` half, cold×2↔fire, Half_phys PHYS/ACID, `xkilled`/`monkilled`.
  MAGM/DISN/DRST n’ont pas de bras C extra hors mask + `destroy_items`
  + shop string DISN — déjà `'disintegrate'` dans JS.
- FIRE-only C : `burnarmor` + `ignite_items` + `burn_away_slime` hero.
  JS `ignite_items` est **encore un stub** `function ignite_items() {}`
  (corps au D-0978). Le D-log D-0973 le liste. Pas un mensonge, mais le
  combat FIRE n’est pas plus complet qu’avant.
- Sautés (nommés) : `engulfer_explosion_msg` ; grabbing/engulf double
  damage ; `ugolemeffects` ; Invulnerable ; hallu `rndmonnam` ; sparkle.

### `mon_explodes`
- C (1019–1067) : dégâts `damn`/`damd`/`0` ; PHYS → `PHYS_EXPL_TYPE` ;
  `AD_MAGM..AD_SPC2` → `-((adtyp-1)+20)` ; sinon `impossible` return ;
  `mondead` si vivant ; `explode(..., adtyp_to_expltype)`.
- JS : même formule type ; envelope élargie de FIRE/COLD/ELEC à
  MAGM..SPC2. Formule C copiée. Callers `corpse_chance` AT_BOOM déjà
  branchés (D-0273).

**Confirmation branch-par-branch :** DISN wand hero **sans**
`is_vampshifter`, DISN wand monstre **avec** — conforme C lignes 50–54
vs 91–94.

C hero DISN (explode.c 50–54) :

```
case AD_DISN:
    if ((olet == WAND_CLASS)
        ? (nonliving(m->data) || is_demon(m->data))
        : Disint_resistance)
        res = EXPL_HERO;
```

Monstre (90–95) ajoute `|| is_vampshifter(m)` **uniquement** dans le
ternaire wand. JS recopie ce déséquilibre. Un héro poly vampire zappé
par une wand de disintegration n’est **pas** masqué via vampshifter
(C non plus) ; un monstre shifter l’est.

Shop pay déjà dans JS avant ce commit :

```
adtyp === AD_FIRE ? 'burn away'
  : adtyp === AD_COLD ? 'shatter'
  : adtyp === AD_DISN ? 'disintegrate'
  : 'destroy'
```

Ouvrir `combat_ok` jusqu’à DISN fait enfin emprunter ce bras (avant,
DISN `continue` avant `pay_for_damage`). MAGM/DRST/ACID tombent sur
`'destroy'` comme le default C.

`uhurt` : C 1 = shield (items only), 2 = full HP. JS inchangé. Half_phys
déjà sur PHYS|ACID. MAGM/DISN/DRST full damu — C aussi (pas Half_phys).

Le stub `ignite_items` dans explode.js à ce SHA est encore
`function ignite_items(_objchn) {}` : un boom FIRE dans le même
`explode()` (déjà « porté » D-0968) **n’allume toujours pas** les
lampes. D-0973 ne le casse pas ; il ne le finit pas.

## Constitution / playbook
Grep JS : pas de FORCE/DIAG/fs/node/fastforward/seed-gates. Rule #2
RAS. Frozen RAS. Async = plines existants. 1:1 `explode.c`. Zap.js
n’est qu’un commentaire — pas de wiring `dobuzz` nouveau (les types
passent déjà par `explode()`).

## Densité (§2b)
Right size. Suite logique des bras `explosionmask` / `combat_ok` /
`mon_explodes` après D-0971. Un module. ~144 LOC. Pas trop petit
(quatre adtyps + masks + boom range). Pas trop gros.

## Documentation
D-0973 « fixed » + Deferred : lavawall, burn feedback, engulfer,
hallu/sparkle/golem/ignite/Invulnerable/slime, `resists_magm` worn.
Honnête. turns.md retire « MAGM/DISN/DRST/ACID boom deferred ».
CURRENT enlève ce cluster du next. Le mot « complete explode.c » n’est
pas écrit — bien. `combat_ok` comme dette structurelle n’est **pas**
nommé (seulement les types ouverts).

## Vérification
Journal : green+strict ; zap/shared **24/24** (2200/0360/0006/0398/
5002/0016/0030/0002). Pas de cadence. Preuve de non-régression, pas
qu’un gas spore MAGM ou une baguette de disintegration ait exercé le
nouveau mask. `ignite_items` stub : aucun test ne peut valider
l’allumage.

## Risques / dette
1. **`combat_ok` survit** — types hors MAGM..ACID (SPC1/SPC2) sautent
   sol + HP.
2. **`resists_magm` sans scan artifact** — shield / demi-dégâts faux.
3. `ignite_items` / `burn_away_slime` encore vides (D-0978 les porte).
4. `engulfer_explosion_msg` absent (swallowed boom).
5. Hero DISN wand : poly nonliving/demon seulement via `youmonst.data`.
6. `adtyp_to_expltype` sans DRDX/DRCO/DISE/PEST/SPEL — glyphes
   d’explosion faux pour ces adtyps s’ils passent par `mon_explodes`.
7. `combat_ok` non nommé dans le D-log (dette structurelle invisible).

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7/10**
- Si je ne devais retenir qu’une critique : les masks MAGM/DISN/DRST/ACID
  sont copiés if-par-if depuis C, mais `explode()` n’est toujours pas le
  C « tout adtyp » — c’est un élargissement de gate, pas la fin de
  `explode.c`.
