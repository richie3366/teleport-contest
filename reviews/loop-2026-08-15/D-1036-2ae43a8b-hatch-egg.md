# Review — `2ae43a8b` — D-1036 `hatch_egg` body, dispatch **non** branché

## Métadonnées
- Hash complet / court : `2ae43a8b9a3116097d7c57f54857ad9dfd59f31a` / `2ae43a8b`
- Parent : `7b1251f3` (D-1035 nhl_gamestate)
- Auteur, date : Raphaël Hervier (Co-authored-by Cursor), 2026-08-15 18:45
- D-id : **D-1036**
- Stats : 12 files, **+442 / −76** — `js/timeout.js` **+280**, `js/sounds.js` **+41** ; **cadence #1305 mêlée**
- Fichiers JS / map / cadence : `timeout.js` `hatch_egg`/`learn_egg_type` ; `sounds.js` `cry_sound` ; `mkobj.js` `run_timers` **drop** HATCH_EGG ; cadence 44/44 dans le même SHA

## Intention vs livrable
Promesse git (rarement aussi honnête) : porter le callback **et** garder `run_timers` qui **drop** HATCH_EGG jusqu’à parité `where`.

Livrable réel : body porté ; dispatch **volontairement** omis après un essai qui a mis la fortress à **42/44** (seed0014 / seed4500). Cadence #1305 mesurée **après** unwind. C’est le seul SHA du run où un FAIL public a servi de **falsifier**, pas de peel à « aligner ».

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/timeout.js` | `hatch_egg` / `learn_egg_type` |
| `js/sounds.js` | `cry_sound` (constantes `monflag.h`) |
| `js/mkobj.js` | commentaire + **pas** de `case HATCH_EGG` dans `run_timers` |
| cadence CURRENT | 44/44 Scr 11405 RNG 100% `31+0.27/turn` |

## Fidélité C ↔ JS

### `hatch_egg` — enveloppe C copiée
C `timeout.c:1017–1189`. JS `timeout.js:1007–1152`.

- `corpsenm == NON_PM` return (stérilisé).
- `mnum = big_to_little(corpsenm)`.
- `yours = spe \|\| (!female && carried && !rn2(2))` — **short-circuit** : `spe` vrai ⇒ pas de `rn2` (match clang LTR).
- `silent = timeout != moves`.
- `get_obj_location(egg, 0)` : INVENT/FLOOR/MINVENT only.
- `hatchcount = rnd(quan)` **avant** le skip geno (C aussi : `rnd` même si ensuite G_UNIQ/GENOD/EXTINCT skip le spawn — **le RNG est consommé**). JS : `rnd` seulement `if (loc)` puis skip spawn dans le `if (ptr && !UNIQ && !GENOD)` — si loc existe mais geno skip, C a déjà fait `rnd(quan)` **et** `cansee_hatchspot` ; JS aussi `hatchcount = rnd` avant le if geno. Match.
- boucle `enexto`+`makemon(NO_MINVENT\|MM_NOMSG)` ; tame `yours&&!silent` ou dragon porté ; `mtame=20` non-dragon invent ; EXTINCT break ; `hatchcount -= i` ; `quan -=`.
- messages INVENT/FLOOR/MINVENT ; `learn_egg_type` si cansee && knows_egg.
- leftover `attach_egg_hatch_timeout(rnd(12))` ; invent `useup` ; floor extract+`obfree`+`hideunder`.

`#if 0` migrating : les deux omettent. `impossible(where)` C vs JS default break.

### `learn_egg_type` / `cry_sound`
C : `little_to_big` puis `MV_KNOWS_EGG` + `update_inventory`. JS : flags, **pas** `update_inventory` (nommé).

`cry_sound` : JS constantes locales `MS_SILENT=0 … MS_MUMBLE=21` = `monflag.h` (vérifié). Default chitter / eel gurgle. D-log : `ptr.msound` JS souvent vide → tout tombe en default. **Pas une hallucination de numéros** ; une table monstre incomplète.

### Dispatch — le point qui compte
C `run_timers` appelle `hatch_egg` quand l’action est HATCH_EGG.

JS `mkobj.js:844–876` : ROT_CORPSE / ORGANIC / MELT / BURN / SHRINK / FIG_TRANSFORM. **Pas** HATCH_EGG. Le timer est **retiré de la liste** (while pop) **sans** callback : le compteur `timed--` a lieu, l’œuf ne hatch **pas**, **aucun** `rnd`/`enexto`/`makemon` de hatch.

C’est **volontaire**. Essai branché : seed0014 RNG 45430/59178 Scr 635/714 ; seed4500 100939/108275 Scr 1572/1814. Hypothèse NOTES : JS attache/fire des HATCH_EGG sur des œufs floor typés (giant spider attach OBJ_FREE, fire OBJ_FLOOR) alors que le C correspondant est no-op (NON_PM ou pas floor). **Ne pas re-wirer sans dump C `where`/`corpsenm`.**

Le drop n’est pas le C. C’est un **shim de parité de suite** le temps que les timers œufs existent aux mêmes endroits. Constitutionnellement : pas FORCE, pas de coord hardcodée. Process : correct. Fidélité runtime : **les timers HATCH_EGG JS sont avalés sans effet** — divergence C jusqu’à parité d’attache.

### Cadence mêlée
#1305 full sessions dans le même SHA que le port. PROCESS-SMELL récurrent, ici **moins grave** : la cadence **prouve l’unwind**, ce n’est pas un score collé à un dump inerte.

## Constitution / playbook
Bans clean. Hypothesis « public traces » dans le commentaire `run_timers` : raisonnement seed0014/4500, **pas** un `if (seed)`. Acceptable. Interdit de re-branchér pour « finir D-1036 ».

## Densité (§2b)
**Right size** : callback + `cry_sound` + le non-wire. Pas hatch+revive+zombi.

## Documentation
Meilleure du run : CURRENT next = dump C **before** wire ; NOTES hypothesis + falsifier ; D-log 42/44 chiffré. Overclaim « fixed » dans le D-log status est trop fort (**partial** est dans le titre — OK).

## Vérification
Private node hatch (NON_PM, cry, leftover) ≠ dispatch. Cadence 44/44 **après** drop. Preuve réelle du danger du wire : les deux seeds FAIL cités.

## Risques / dette
1. **Ne pas dispatcher** tant que `attach_egg_hatch_timeout` / `where` ≠ C.
2. Œufs JS : timers pop sans hatch → œufs qui **n’écloront jamais** même hors traces (gameplay hors suite).
3. `msound` vide → cry toujours chitter.
4. `get_obj_location` JS flags `0` : si l’implémentation accepte CONTAINED, C non.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **7.5 / 10**
- Une phrase : le body est une copie C (RNG `yours`/`rnd(quan)`/`rnd(12)`) ; **ne pas relancer la loop pour le brancher** — le 42/44 est le falsifier, le drop est la bonne décision, pas un TODO.

## Suite (humaine, pas loop)
Temp C dump : pour un œuf qui timer-out sur seed0014/4500, `where`, `corpsenm`, `spe`, carried. Puis aligner **l’attache** JS, ensuite une ligne `run_timers` → `hatch_egg`.
