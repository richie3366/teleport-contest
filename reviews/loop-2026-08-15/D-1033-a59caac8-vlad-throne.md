# Review — `a59caac8` — D-1033 Vlad `special_throne_effect`

## Métadonnées
- Hash complet / court : `a59caac832949a04d03f9d1b8767063293ff5b81` / `a59caac8`
- Parent : `31c0489f` (D-1032 fig_transform)
- Auteur, date : Raphaël Hervier (Co-authored-by Cursor), 2026-08-15 17:35
- D-id : **D-1033**
- Stats : 12 files, **+405 / −76** — `js/sit.js` **+229**, `js/exper.js` **+76**
- Fichiers JS / map / cadence : `sit.js`, `exper.js` (`losexp`), `read.js` (`seffects` SPE_REMOVE_CURSE) ; data/debt ; pas de cadence (#1300 encore)

## Intention vs livrable
Promesse : Vlad `special_throne_effect` + `dosit` `IS_THRONE`. Ordinary 1–13 **différé** (D-1034 le lendemain) — densité honnête pour **ce** SHA, contrairement à D-1023.

Livrable : switch 1–13 spécial + `throne_sit_effect` envelope `rnd(6)>4` / `rnd(13)` / `In_V_tower` early-return + `dosit` throne après OBJ_AT. `losexp` pour le drain case 5.

## Inventaire
| Fichier | Rôle |
|---------|------|
| `js/sit.js` | `special_throne_effect`, envelope `throne_sit_effect`, `dosit` IS_THRONE |
| `js/exper.js` | `losexp` drain permanent |
| `js/read.js` | `seffects` fake SPE_REMOVE_CURSE (case 10) |
| `js/apply.js` | grease_ok COIN skip comment/wire mince |

## Fidélité C ↔ JS

### Envelope `throne_sit_effect` — fidèle
C `sit.c:39` : `special_throne = In_V_tower` ; `if (rnd(6)>4)` { `effect = rnd(13)` ; wizard getlin ; si special → `special_throne_effect` **return** (pas de puff) ; sinon ordinary }. Else confort prince / out of place. Puis `!special && !rn2(3)` puff ROOM.

JS : même `rnd(6)>4` (commentaire C « = !rn2(3) » non simplifié — **le RNG est `rnd(6)`**, pas `rn2(3)`, match). Wizard getlin nommé omit. Special **return** avant vanish : match.

### `special_throne_effect` 1–13 — graphe copié
C `sit.c:238–354`.

| Case | C | JS |
|------|---|-----|
| 1–4 | `makewish` ; typ=ROOM ; « disintegrates » | même ; `throne_to_room` |
| 5 | pline terrible ; `!Drain_resistance` → `losexp` puis `ulevelmax--` si `> ulevel` | même |
| 6 | grease invent **sauf COIN** ; `make_glib(rn1(101,100))` | même skip COIN (D-log grease_ok) |
| 7 | `attrcurse` ; amused | même |
| 8 | `find_hell` ; `dlevel = num_dunlevs-1` ; amulette → disoriented else `schedule_goto` | même |
| 9 | typo C **seeems** ; `msummon(NULL)` ×3 | typo **conservée** (fidèle, pas un fix) |
| 10 | fake SPE_REMOVE_CURSE blessed ; `HConfusion=1` ; `seffects` ; restore | JS pose **aussi** `u.Confusion=1` en plus de `HConfusion` — le plat C n’y est pas |
| 11 | vampire unworthy else poly | même |
| 12 | acid `rnd(16)` resist else `rnd(80)` ; `exercise CON` | même |
| 13 | warp ; `adjattrib(i, rn2(5)-2, -1)` pour `A_MAX` | même |

**Écart case 10 :** C ne touche que `HConfusion`. JS force le flag plat `Confusion`. Si `seffects` lit l’un ou l’autre, le scroll « confused remove curse » diverge. À vérifier dans `read.js` `seffects` — risque réel, pas cosmétique.

`makewish` / `msummon` / `polyself` / `schedule_goto` / `losexp` : le switch est du C ; **l’effet** est la qualité de ces callees (wish déjà Keep’d ailleurs). Unhit public.

### `dosit` IS_THRONE — branché trop tôt dans un `dosit` encore troué
C `sit.c:398` : steed `mon_nam` ; hider ; `can_reach_floor` ; ustuck ; pool/gremlin ; **OBJ_AT** ; **else if trap** (`dotrap` VIASITTING) ; water/sink/altar/grave/stairs/ladder/lava/ice/drawbridge ; **puis** `IS_THRONE`.

JS `dosit` : steed message **« your steed »** ≠ C `mon_nam(usteed)` ; Levitation early-return tumble (approx `!can_reach_floor`) ; OBJ_AT picnic ; **saute trap/water/sink/…** ; `IS_THRONE`.

Conséquence : **piège sur la case trône** → C `dotrap` sitting, JS effet trône. Nommé « traps deferred » dans l’en-tête sit.js — honnête, mais le Keep D-1033 vend `dosit IS_THRONE` comme si le caller était le C.

OBJ_AT sur trône : les deux s’assoient sur l’objet, pas le trône. Match.

## Constitution / playbook
Grep : bans clean. Typo `seeems` copiée = pas de polish anti-C. Pas de FORCE.

## Densité (§2b)
**Right size** pour l’iter : une famille `special_throne` + le fil `dosit`/`losexp` nécessaire. Ordinary 1–13 **pas** dans ce SHA.

## Documentation
D-log : ordinary 1–13 deferred — vrai (D-1034 suit). `dosit` trap skip sous-vendu comme « IS_THRONE after those » alors que JS n’a pas « those ».

## Vérification
Green ; journal « all 44/44 » + seeds `#sit` 0106/0107/4500. Si ces seeds ne sont pas sur le trône de Vlad, **case 1–13 special est unhit**. Private node grease/Drain.

## Risques / dette
1. `dosit` saute `t_at` / terrains entre objet et trône.
2. Case 10 `Confusion` plat extra.
3. Callees wish/msummon/poly/goto : pas re-audités ici.
4. Message steed.

## Verdict
- Verdict : **ACCEPT-WITH-DEBT**
- Note : **6.5 / 10**
- Une phrase : le switch Vlad est une copie C (typo comprise) ; le Keep `dosit IS_THRONE` est un **raccourci** dans un `#sit` qui n’a pas encore le `else if (trap)` C.
