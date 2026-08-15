# Reviews — loop 2026-08-15 (D-1016 … D-1036)

Périmètre : commits **après** la série
`reviews/since-second-attempt-with-perfect-public-score/`
(`8bba5965` … HEAD `2ae43a8b`).

Pas un fichier par SHA (bar des 86). Reviews **pleines** seulement
quand dump / RNG / timer / getlin. Le reste : triage.

Même grille que `../since-second-attempt-with-perfect-public-score/00-RUBRIQUE.md` :
diff vs `nethack-c/upstream`, pas vs le journal de la loop.

## Verdicts (liasse pleine)

| Fichier | Commit | D-id | Verdict |
|---------|--------|------|---------|
| [D-1022-7f952620-whip-grapple-pole.md](./D-1022-7f952620-whip-grapple-pole.md) | `7f952620` | D-1022 whip/grapple/pole +1041 | **QUALITY-RISK** 5/10 |
| [D-1023-aaac3f9d-lamp-trap-bot.md](./D-1023-aaac3f9d-lamp-trap-bot.md) | `aaac3f9d` | D-1023 lamp+cocktail+trap+BoT | **QUALITY-RISK** 4.5/10 |
| [D-1033-a59caac8-vlad-throne.md](./D-1033-a59caac8-vlad-throne.md) | `a59caac8` | D-1033 Vlad special + dosit | **ACCEPT-WITH-DEBT** 6.5/10 |
| [D-1034-63e86f5a-ordinary-throne.md](./D-1034-63e86f5a-ordinary-throne.md) | `63e86f5a` | D-1034 ordinary 1–13 + genocide | **QUALITY-RISK** 5.5/10 |
| [D-1036-2ae43a8b-hatch-egg.md](./D-1036-2ae43a8b-hatch-egg.md) | `2ae43a8b` | D-1036 hatch_egg **sans** wire | **ACCEPT-WITH-DEBT** 7.5/10 |

## Transversal

- Fortress **44/44** tenue (cadence #1290 / #1295 / #1300 / #1305).
- Sujets git « Match C » = **dispatch `doapply`/`dosit`**, pas le callee (`thitmonst`, `makemon(NULL)`, `begin_burn`, `dotrap`).
- Public **unhit** sur apply/sit/hatch. Green/cohort ≠ preuve de corps.
- Densité : D-1022/1023 trop gros ; 1296–1301 plus sages (1 C) ; D-1034 recolle sit+read.
- **Ne pas relancer la loop** pour « finir » HATCH_EGG : D-1037 l’a
  fait hors loop (save_timers + dispatch). Le 42/44 de D-1036 était
  des timers hors niveau, pas un body faux.

## Triage (pas de fichier 180 lignes)

| SHA | D-id | Note |
|-----|------|------|
| `24ce754a` | D-1016 shopdig | Peel C-wrong `um_dist` ; session humaine |
| `afd40c3d` | — | Docs loop model Extra High |
| `18d9bb17` | — | 86 reviews |
| `708cf948`…`2423fafc` | D-1017…1020 | Peels ciblés cancel/cmdq/sellobj/setnotworn |
| `68e513ca` | D-1021 jelly + cadence | `obfree` C vs `quan=0` JS ; PROCESS-SMELL mixte |
| `060cbf77` | D-1024 flip book/coin | Petit ; oclass dispatch ; unhit |
| `a525cb29` | D-1025 candle/candelabrum | 2 C ; `use_lamp` callee |
| `d1765108` | D-1026 grease + #1295 | Mixte cadence ; `grease_ok` COIN |
| `bba90455` | D-1027 tinning kit | 1 C + eat.js floorfood |
| `8ea8dbcb` | D-1028 bell | 1 C + detect `openit` |
| `6f1f4ad5` | D-1029 figurine | 1 C + `make_familiar` |
| `1942e9ac` | D-1030 unicorn horn | Bonne taille ; `shuffle_int_array` ; `#monster` |
| `8f0aef90` | D-1031 horn + #1300 | Mixte cadence |
| `31c0489f` | D-1032 fig_transform | Timer 15 fichiers ; cousin D-1036 |
| `7b1251f3` | D-1035 nhl_gamestate | Snapshot `you` skip worn ptrs ; leave unhit ; **prochain peel code** si pas hatch |

## Après cette liasse (ordre)

1. **D-1037 (fait, hors loop) :** dump JS `HATCH_DROP` = off-level
   `where=FLOOR` `on_fobj=0` ; C `save_timers(RANGE_LEVEL)` ; hatch
   **dispatché** ; suite 44/44.
2. Code utile restant : D-1022 `getdir` réel (pas `getdir_whip`) ;
   `hurtle` via `walk_path` déjà importé ; `dosit` `else if (trap)`
   avant trône.
3. Prochaine liasse review : au plus tard ~8–10 iters, ou dès un SHA
   ≥2 fonctions C / ≳300 LOC JS.
