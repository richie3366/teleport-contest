# Review 11 — `81c74930` — corpse_intrinsic / givit / mconveys (D-0944)

## Métadonnées
- Hash complet / court : `81c74930b9396758d17b7020a2aa449fbb0de9d1` / `81c74930`
- Parent : `77e5fcec75dc98e07266f80ca46eef97be6754a9`
- Auteur, date : Raphaël Hervier, 2026-07-21 22:43:58 +0200
- D-id : **D-0944** (sujet + corps + D-log)
- Stats : 10 files, +273 / −23
- Fichiers JS / map / cadence : `js/eat.js` (+212), `js/monsters.js`, `js/generated/monsters_data.js` (`mconveys[]`), `scripts/extract-monsters.py` ; map eat.js ; pas de cadence suite

## Intention vs livrable
Promet : corpses finished confer resist/teleport/telepathy/giant STR une fois `permonst.mconveys` (mr2) extrait. Livrable : extracteur `parts[7]` → tableau, `mons().mconveys`, cluster `intrinsic_possible`/`should_givit`/`temp_givit`/`givit`/`corpse_intrinsic` branché dans `cpostfx` `check_intrinsics`. Aligné. Pas de mélange cadence.

## Inventaire

| Fichier | Rôle |
|---|---|
| `scripts/extract-monsters.py` | Port données : `MON(..., mr1, mr2, ...)` |
| `js/generated/monsters_data.js` | `export const mconveys = [...]` |
| `js/monsters.js` | `mons().mconveys` + `control_teleport` + `telepathic` |
| `js/eat.js` | Port C eat.c intrinsic cluster |
| map / D-log / NOTES | D-0944 ; were/mimic/`attrcurse` encore ouverts |

## Fidélité C ↔ JS

### Générateur vs C `MON(..., mr1, mr2, ...)`
C `monst.c:20` :

```
#define MON(nam, sym, lvl, gen, atk, siz, mr1, mr2, \
            flg1, flg2, flg3, d, col, bn)
```

Extracteur (après commit) : `parts[6]=mr1` (mresists, déjà là), **`parts[7]=mr2` (mconveys, nouveau)**, `parts[8..10]=flg*`. Avant, mr2 était **sauté** (index 7 inutilisé) — les flags n’ont pas glissé. C’est le bon patch.

Spot-check tableau généré vs attente C (`MR_FIRE=0x01`, `MR_POISON=0x20`) :
- `PM_KILLER_BEE` mconveys **32 (0x20)** — poison conveyé
- `PM_RED_DRAGON` mconveys **1 (0x01)** — feu
- `PM_GIANT_ANT` / `PM_NEWT` / `PM_GIANT` mconveys **0**
- `PM_FLOATING_EYE` / `PM_MIND_FLAYER` mconveys **0** (télépathie via `telepathic()`, pas mr2)

**Générateur fidèle.** Pas de décalage d’index visible sur ces PM.

### `telepathic` / `control_teleport` — C `mondata.h:83-86` / JS `monsters.js:834`
C : `M1_TPORT_CNTRL` ; télépathie = floating eye **ou** mind flayer **ou** master. JS : mêmes trois `mndx`. `PM_MIND_FLAYER` déjà défini plus haut dans `monsters.js` (pas un `ReferenceError`). **OK.**

### `intrinsic_possible` — C `eat.c:890` / JS `eat.js:1167`
Switch identique : FIRE/SLEEP/COLD/DISINT/SHOCK/POISON/ACID/STONE via `mconveys & MR_*` ; TELEPORT `can_teleport` ; TELEPORT_CONTROL `control_teleport` ; TELEPAT `telepathic` ; default 0. Pas de RNG. `LAST_PROP` JS = `LIFESAVED` = **68** = C `prop.h`. Les IDs `FIRE_RES=1` … `TELEPORT=46` matchent `enum prop_types`. **Boucle `for (i=1; i<=LAST_PROP)` consomme le même schéma de `rn2` que C.**

### `should_givit` / `temp_givit` — C `eat.c:961-997`
POISON_RES : killer bee/scorpion `!rn2(4)` → chance 1 else 15 ; TELEPORT 10 ; TPORT_CNTRL 12 ; TELEPAT 1 ; default 15 ; return `mlevel > rn2(chance)`.

`temp_givit` : STONE 6, ACID 3, sinon 0.

JS : `ptr?.mndx === PM_KILLER_BEE` vs C `ptr == &mons[PM_KILLER_BEE]` — OK si `mons()` pose `mndx`. Ordre `rn2(4)` **avant** le `rn2(chance)` poison : **LTR C.**

### `givit` — C `eat.c:1003` / JS `eat.js:1229`
Garde : `if (!should_givit && !temp_givit) return` — **deux** tests RNG toujours évalués (pas de `||` short-circuit qui sauterait `temp_givit` : C utilise `&&` de négations, donc les deux s’exécutent). JS identique.

Messages hallu FIRE/DISINT/SHOCK/POISON/TELE/TCTRL/TELEPAT : recopient C (`You be chillin'.`, `health currently feels amplified!`, etc.). ACID/STONE : message seulement si pas déjà résistant, **puis toujours** `incr_itimeout(..., d(3,6))` — C aussi. TELEPAT + Blind → `see_monsters()`. **Pas de `debugpline` (ifdef C).**

### `corpse_intrinsic` — C `eat.c:1339` / JS `eat.js:1330`
`is_giant` → count=1, prop=-1 ; puis reservoir `if (!rn2(count)) prop=i` pour chaque `intrinsic_possible` ; si STR seul `count===1 && !rn2(2)` → prop=0.

JS copie. Giant sans mr2 (spot-check mconveys 0) : 50 % STR, 50 % rien — **C.** Giant + resists : reservoir mélange -1 et props.

### Branchement `cpostfx`
Après hallu + newt :

```
tmp = corpse_intrinsic(ptr);
if (tmp == -1) gainstr(NULL, 0, TRUE);
else if (tmp > 0) givit(tmp, ptr);
```

JS au commit : `tmp === -1` → `gainstr(null, 0, true)` ; `tmp > 0` → `givit`. `tmp===0` no-op. **Callers : uniquement `check_intrinsics`. Were/mimic/disenchanter restent hors default — pas de givit volé.**

## Constitution / playbook
Grep JS : RAS FORCE/DIAG/fs/fastforward. `generated/` via extracteur, pas de `readFileSync` runtime dans `js/`. `extract-monsters.py` est hors scored `js/` — OK. `await` seulement dans `givit` messages.

## Densité (§2b)
**Right size.** Donnée manquante + le cluster eat.c qui en dépend. ~212 LOC eat + 18 monsters + extracteur. Un thème.

## Documentation
D-0944 « finished corpses can now convey… » est vrai **sur le chemin `check_intrinsics`**, pas pour were/mimic. Deferrals nommés. Map retire `needs mconveys`. CURRENT keep D-0944. Pas d’overclaim « every corpse always confers ».

## Vérification
Journal : green+strict ; eat/role 12/12. Pas de suite complète. Le cohort ne prouve pas `rn2(count)` multi-prop ni killer bee `rn2(4)`. Affirmation fortress, pas un dump RNG givit.

## Extracteur : ce qui n’a pas bougé (et doit rester)

`split_top_commas` + `LVL()` + `SIZ()` inchangés. `mresists` reste `parts[6]`. Si quelqu’un « corrige » en lisant mr2 comme parts[6], **mresists et mconveys s’inversent**. Commentaire Python : `MON(..., mr1, mr2, ...)` — garder.

Terminator `MON(NAM(""), … 0, 0, …)` : extracteur pose `mconveys: 0` sur le fallback. C terminator `mr1, mr2` = `0, 0`. OK.

`eval_flags(mr2, MR_FLAGS)` : mêmes bits que mresists (`MR_FIRE…MR_STONE`). C `mconveys` est un `uchar` des mêmes `MR_*`. Pas de `MR2_*` séparé. **OK.**

Le commit `monsters_data.js` est **+1 ligne** (`export const mconveys = […];`) : le tableau a été régénéré, pas édité à la main. Bon signe.

## `givit` ACID/STONE vs permanents

Permanents : `H* |= FROMOUTSIDE` seulement si le bit n’y est pas encore (pas de re-message). Temporaires ACID/STONE : **toujours** `d(3,6)` même si déjà résistant (C `incr_itimeout` inconditionnel après le maybe-message). JS `incr_itimeout_prop`. Si `incr_itimeout_prop` n’est pas `incr_itimeout` C (TIMEOUT bits vs uprops), la durée diverge. Helper ajouté en D-0943. Dépendance croisée.

POISON_RES message `Poison_resistance ? "especially healthy." : "healthy."` : C macro (H|E|intrinsèque). JS `u.Poison_resistance \|\| H \|\| E`. Si le cache `u.Poison_resistance` est stale, mauvais adjectif — pas de RNG.

## `corpse_intrinsic` et `LAST_PROP`

Boucle `i = 1 … 68`. `intrinsic_possible` est 0 pour DRAIN_RES, STUNNED, etc. **Aucun `rn2` sur ces i.** Seulement quand `mconveys`/flags matchent. Un dragon feu : une itération FIRE_RES + éventuellement autres mr2. Giant : d’abord prop=-1 count=1, puis resists ajoutés au reservoir (remplacent -1 avec proba 1/count).

Clang LTR : `!rn2(count)` après `++count`. JS `++count; if (!rn2(count))`. **OK.**

`gainstr(null, 0, true)` : C `gainstr((struct obj *)0, 0, TRUE)`. Le `TRUE` = force / from corpse. Si JS `gainstr` ignore le 3e arg, STR giant cassée. Préexistant `attrib.js`.

## `check_intrinsics` seulement

Mind flayer qui `break` après INT+1 : **pas** de `corpse_intrinsic` (C `break` avant fallthrough). JS au D-0943 avait déjà ce break ; D-0944 insère givit **dans** le `if (check_intrinsics)` existant. Flayer yum : toujours pas de télépathie. **OK.**

Nurse : check_intrinsics true → hallu? Nurse AD_HEAL pas AD_STUN → pas hallu ; givit poison possible via mconveys. C comment « might also convey poison resistance ».

## `monsters.js` `mons()`

Champ ajouté à côté de `mresists`. Callers `mons(pm)` dans eat voient `ptr.mconveys`. `ptr` passé à `can_teleport(ptr)` utilise `mflags1`, pas mconveys — C aussi (`can_teleport` = M1_TPORT, **pas** mr2). Un monstre peut tporter sans conveyer TELEPORT si flags/mr2 divergent dans `monsters.h`. On fait confiance à l’upstream.

## Journal / NOTES

NOTES « next : eatspecial ; were ; mimic » — givit vient d’être fait, were encore ouvert. CURRENT keep D-0944. Index « green+eat cohort 12/12 » sans 44/44. Cohérent.

## Risques / dette
1. `mons()` sans `mndx` → bee/scorpion chance spéciale morte (`ptr.mndx` undefined).
2. Double vérité intrinsèques : `HFire_resistance` vs `uprops[FIRE_RES]` — `givit` ne tape que les `H*`.
3. Were/mimic/`attrcurse` toujours stub (cluster suivant).
4. Régénérer `monsters_data.js` sans ce `parts[7]` recasserait silencieusement mconveys.
5. `incr_itimeout_prop` / `gainstr` 3e arg : callees non relus.
6. Table `mconveys` non testée unitaire dans le commit (spot-check reviewer seulement).

## Extraots C `givit` / `corpse_intrinsic`

```1007:1016:nethack-c/upstream/src/eat.c
    if (!should_givit(type, ptr) && !temp_givit(type, ptr))
        return;
    switch (type) {
    case FIRE_RES:
        debugpline0("Trying to give fire resistance");
        if (!(HFire_resistance & FROMOUTSIDE)) {
            You(Hallucination ? "be chillin'." : "feel a momentary chill.");
            HFire_resistance |= FROMOUTSIDE;
        }
```

Les deux appels `should_givit` et `temp_givit` **avant** le return : ACID/STONE ont `should_givit` chance 15 **et** `temp_givit` chance 3/6. Un cadavre acide peut rater le permanent **et** réussir le timed (ou l’inverse). JS `if (!should && !temp) return` évalue les deux. **Pas de short-circuit `should \|\| temp` qui sauterait un `rn2`.**

```1368:1371:nethack-c/upstream/src/eat.c
    if (conveys_STR && count == 1 && !rn2(2))
        prop = 0;
    return prop;
```

JS `eat.js` (post-commit, inchangé) :

```1330:1345:js/eat.js
function corpse_intrinsic(ptr) {
    const conveys_STR = is_giant(ptr);
    let count = 0;
    let prop = 0;
    if (conveys_STR) {
        count = 1;
        prop = -1;
    }
    for (let i = 1; i <= LAST_PROP; i++) {
        if (!intrinsic_possible(i, ptr)) continue;
        ++count;
        if (!rn2(count)) prop = i;
    }
    // if strength is the only candidate, give it 50% chance
    if (conveys_STR && count === 1 && !rn2(2)) prop = 0;
    return prop;
}
```

`telepathic` C :

```84:86:nethack-c/upstream/include/mondata.h
#define telepathic(ptr)                                                \
    ((ptr) == &mons[PM_FLOATING_EYE] || (ptr) == &mons[PM_MIND_FLAYER] \
     || (ptr) == &mons[PM_MASTER_MIND_FLAYER])
```

Extracteur `parts[6..13]` :

```330:341:scripts/extract-monsters.py
        lvl, gen, mr1, mr2, flg1, flg2, flg3, diff, col, bn = (
            parts[2],
            parts[3],
            parts[6],
            parts[7],
            parts[8],
            parts[9],
            parts[10],
            parts[11],
            parts[12].strip(),
            parts[13].strip(),
        )
```

`LAST_PROP = LIFESAVED = 68` JS `const.js` / C `prop.h`. FIRE_RES=1 … TELEPORT=46 match. Un off-by-one `i < LAST_PROP` aurait sauté LIFESAVED (jamais conveyé de toute façon) mais **pas** TELEPORT=46. La boucle `<=` est la bonne.

## Verdict
- Verdict : **ACCEPT**
- Note /10 : **8.5**
- Une phrase : mr2 est lu au bon index `MON`, les props 1…68 et le reservoir `rn2(count)` + `gainstr(-1)` collent à `eat.c`, et le spot-check bee/dragon/ant ne montre pas de table décalée.
